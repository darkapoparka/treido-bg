import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const text = (p) => fs.readFileSync(path.join(root, p), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const tracked = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { cwd: root, encoding: "utf8" },
);
const files = [...new Set(tracked.split("\0").filter(Boolean))];
const upstream = JSON.parse(text("docs/agents/upstream-skills.lock.json"));
const isVendor = (p) =>
  upstream.skills.some((name) => p.startsWith(`.agents/skills/${name}/`));
const markdown = files.filter(
  (p) =>
    p.endsWith(".md") &&
    !isVendor(p) &&
    !p.startsWith("docs/history/pre-astra-"),
);
let links = 0;
for (const file of markdown) {
  const content = text(file);
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) continue;
    const name = target.split("#")[0];
    if (!name || /[<>]/.test(name)) continue;
    const resolved = path.resolve(
      root,
      path.dirname(file),
      decodeURIComponent(name),
    );
    assert(
      fs.existsSync(resolved),
      `Broken documentation link: ${file} -> ${target}`,
    );
    links += 1;
  }
}
const skillFiles = files.filter((p) =>
  /^\.agents\/skills\/[^/]+\/SKILL\.md$/.test(p),
);
const names = new Set();
for (const file of skillFiles) {
  const content = text(file);
  const front = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert(front, `Missing skill frontmatter: ${file}`);
  const name = front[1]
    .match(/^name:\s*(.+)$/m)?.[1]
    .replace(/^["']|["']$/g, "")
    .trim();
  const description = front[1].match(/^description:\s*(.+)$/m)?.[1].trim();
  assert(name && /^[a-z0-9-]+$/.test(name), `Invalid skill name: ${file}`);
  assert(
    description && description.length > 10,
    `Missing skill description: ${file}`,
  );
  assert(!names.has(name), `Duplicate repo skill name: ${name}`);
  names.add(name);
}
assert(
  names.size === upstream.skills.length + 5,
  "Review expected selected skill inventory",
);
assert(
  Buffer.byteLength(text("AGENTS.md")) <= 8192,
  "Root AGENTS exceeded the project routing budget; extract task-specific detail",
);
assert(
  text("AGENTS.md").includes("astra-pro"),
  "Missing active-branch contract",
);
for (let task = 1; task <= 14; task += 1) {
  assert(
    new RegExp(`^## Task ${task} - `, "m").test(text("tasks.md")),
    `Missing stable Task ${task}`,
  );
}
const history = "docs/history/pre-astra-2026-09-12/";
const archive = JSON.parse(text(history + "manifest.json"));
for (const [name, expected] of Object.entries(archive.files)) {
  const bytes = fs.readFileSync(path.join(root, history, name + ".txt"));
  assert(
    crypto.createHash("sha256").update(bytes).digest("hex") === expected,
    `Historical snapshot changed: ${name}`,
  );
}
const ids = (content) =>
  new Set(
    content.match(/\b(?:BUY|ACC|MER|COM|ADM|OPS|NAT|QUA)-\d{3}\b/g) || [],
  );
const oldIds = ids(text(history + "product.md.txt"));
const currentIds = ids(
  text("product.md") + text("docs/product/requirements.md"),
);
for (const id of oldIds)
  assert(currentIds.has(id), `Lost product requirement ID: ${id}`);
const shopify = JSON.parse(text("shopify/manifest.json"));
assert(
  shopify.source.version_id === "42a81476-425f-5572-a7bb-bd3b0134c8ec",
  "Shopify source version changed without review",
);
if (shopify.status === "not-acquired")
  assert(shopify.assets.length === 0, "Unreconciled Shopify acquisition state");
console.log(
  `Docs checked: ${markdown.length} Markdown files, ${links} relative links, ${names.size} unique skills, 14 stable tasks, ${oldIds.size} retained requirement IDs, ${Object.keys(archive.files).length} intact historical snapshots.`,
);
console.log(
  "Structural/integrity checks only; not UI, service, source-acceptance or release proof.",
);
