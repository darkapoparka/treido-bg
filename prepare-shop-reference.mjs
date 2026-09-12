import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import process from "node:process";

const root = dirname(fileURLToPath(import.meta.url));
const targetRoot = resolve(root, "reference-assets/shop/products");
const reviewRoot = resolve(root, ".qa/shop-parity/media-review");
const { assets } = JSON.parse(
  await readFile(
    resolve(root, "references/shop/product-media-provenance.json"),
    "utf8",
  ),
);
const verifyOnly = process.argv.includes("--verify");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const sharp = createRequire(resolve(root, "apps/web/package.json"))("sharp");
const matches = async (bytes, asset) => {
  if (hash(bytes) === asset.sha256) return true;
  // PNG encoders can differ while preserving every decoded pixel.
  return (
    Boolean(asset.pixelSha256) &&
    hash(await sharp(bytes).ensureAlpha().raw().toBuffer()) ===
      asset.pixelSha256
  );
};
const failures = [];
const reviews = [];

for (const asset of assets) {
  try {
    const destination = resolve(root, asset.localFile);
    const child = relative(targetRoot, destination);
    if (!child || child.startsWith("..") || isAbsolute(child))
      throw new Error(`Invalid asset destination: ${asset.id}`);
    let bytes;
    let sourceSha256;
    let downloaded = false;
    try {
      bytes = await readFile(destination);
    } catch (error) {
      if (error.code !== "ENOENT" || verifyOnly) throw error;
    }
    if (!bytes) {
      const url = new URL(asset.sourceUrl);
      if (url.protocol !== "https:" || url.username || url.password)
        throw new Error(`Invalid source: ${asset.id}`);
      const response = await globalThis.fetch(url, {
        signal: globalThis.AbortSignal.timeout(60_000),
      });
      if (!response.ok)
        throw new Error(`${asset.id}: download returned ${response.status}`);
      bytes = Buffer.from(await response.arrayBuffer());
      sourceSha256 = hash(bytes);
      downloaded = true;
      await mkdir(targetRoot, { recursive: true });
      if (asset.frameSeconds !== undefined) {
        const video = `${destination}.source.mp4`;
        const frame = `${destination}.frame.png`;
        await writeFile(video, bytes, { flag: "wx" });
        try {
          await promisify(execFile)(
            process.env.FFMPEG_PATH || "ffmpeg",
            [
              "-nostdin",
              "-v",
              "error",
              "-ss",
              String(asset.frameSeconds),
              "-i",
              video,
              "-frames:v",
              "1",
              frame,
            ],
            { windowsHide: true },
          );
          bytes = await readFile(frame);
        } finally {
          await unlink(video);
          await unlink(frame).catch((error) => {
            if (error.code !== "ENOENT") throw error;
          });
        }
      } else if (asset.cropPixels) {
        const [left, top, width, height] = asset.cropPixels;
        bytes = await sharp(bytes)
          .extract({ left, top, width, height })
          .png()
          .toBuffer();
      }
    }
    const metadata = await sharp(bytes).metadata();
    if (!(await matches(bytes, asset))) {
      // Failed candidates are inspection evidence, never served as verified assets.
      // Keep only screenshot-sized images, not full-resolution product originals.
      await mkdir(reviewRoot, { recursive: true });
      const review = {
        id: asset.id,
        sourceSha256,
        sha256: hash(bytes),
        pixelSha256: hash(await sharp(bytes).ensureAlpha().raw().toBuffer()),
        expectedSha256: asset.sha256,
        expectedPixelSha256: asset.pixelSha256,
        width: metadata.width,
        height: metadata.height,
      };
      reviews.push(review);
      const name = asset.id.replace(/[^a-z0-9-]/gi, "_");
      await sharp(bytes)
        .resize({ width: 393, height: 480, fit: "inside", withoutEnlargement: true })
        .png()
        .toFile(resolve(reviewRoot, `${name}.png`));
      process.stderr.write(`${JSON.stringify(review)}\n`);
      throw new Error(
        `${asset.id}: checksum mismatch; candidate retained for inspection only. Existing files were preserved.`,
      );
    }
    if (metadata.width !== asset.width || metadata.height !== asset.height)
      throw new Error(`${asset.id}: dimensions changed`);
    if (downloaded) await writeFile(destination, bytes, { flag: "wx" });
    process.stdout.write(`${asset.id}: verified\n`);
  } catch (error) {
    failures.push(`${asset.id}: ${error.message}`);
    process.stderr.write(`${asset.id}: ${error.message}\n`);
  }
}
if (reviews.length) {
  await writeFile(
    resolve(reviewRoot, "report.json"),
    JSON.stringify({ commit: process.env.GITHUB_SHA ?? null, reviews }, null, 2),
  );
}
if (failures.length) {
  throw new Error(`Reference media preparation failed:\n${failures.join("\n")}`);
}
