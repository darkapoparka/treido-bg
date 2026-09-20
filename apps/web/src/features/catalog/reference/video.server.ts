import "server-only";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

// Closed local allowlist. Neither a request path nor a remote URL reaches fs.
const videos: Record<string, string> = {
  "kitsch-hero":
    "78469e747a3cedae293ef4a09c06286619dbe76ad0035af84d4abdb7fc26dc79",
  "onboarding-status-motion":
    "3065d22953c85c3fa13a08402273bdb834aee448e7dc834e3e306bf027526b48",
  "orders-empty-motion":
    "bcaa850b8e93c277041fca75dc83a8b935d7cee2f4b82c9d8f43bfeddfa13979",
  "sol-welcome-motion":
    "a9febb24941102c7f41a682aad9ea29b58517e1b9b2c197968bcee9ce7bb5a43",
  "sol-welcome-lower-left-motion":
    "cbf2e4b9ac0635adf2da724636c12d34e705f4e5cc3a4020da42a3de0ef32eca",
  "sol-welcome-lower-right-motion":
    "1121a70927eec4a606b1ee72e5f1476f037bf34e63316da39d5edc8e9651670c",
  "sol-connecting-motion":
    "fb4c8ed50c9d9dbb91846ee0cce2d061b9614713317a3771a2472639b41b26eb",
};
const pending = new Map<string, Promise<Buffer>>();

export function readReferenceVideo(key: string) {
  if (!Object.hasOwn(videos, key)) return null;
  if (!pending.has(key)) {
    const job = readFile(
      resolve(process.cwd(), `../../reference-assets/shop/products/${key}.mp4`),
    ).then((bytes) => {
      if (createHash("sha256").update(bytes).digest("hex") !== videos[key])
        throw new Error("Reference video checksum mismatch");
      return bytes;
    });
    pending.set(key, job);
    void job.catch(() => pending.delete(key));
  }
  return pending.get(key)!;
}
