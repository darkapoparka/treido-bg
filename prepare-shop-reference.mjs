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

for (const asset of assets) {
  const destination = resolve(root, asset.localFile);
  const child = relative(targetRoot, destination);
  if (!child || child.startsWith("..") || isAbsolute(child))
    throw new Error(`Invalid asset destination: ${asset.id}`);
  let bytes;
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
    if (!(await matches(bytes, asset)))
      throw new Error(
        `${asset.id}: source bytes changed; inspect before accepting new media. Existing files were preserved.`,
      );
    await writeFile(destination, bytes, { flag: "wx" });
  }
  if (!(await matches(bytes, asset)))
    throw new Error(`${asset.id}: checksum mismatch`);
  const metadata = await sharp(bytes).metadata();
  if (metadata.width !== asset.width || metadata.height !== asset.height)
    throw new Error(`${asset.id}: dimensions changed`);
  process.stdout.write(`${asset.id}: verified\n`);
}
