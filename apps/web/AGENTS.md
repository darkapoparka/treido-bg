<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Treido web scope

Read the root AGENTS.md and task-relevant web.md (buyer), app.md (merchant/CMS), or admin.md. All three are product surfaces within this app, not separate deployments. Current execution is Shop buyer mobile-web parity; the root contract owns the branch and checkout. Do not begin another surface implicitly.

Preserve the generated framework block above. Use its installed-version docs, the existing canonical components and reference runner. Keep server authority and private data out of client UI. Follow the root verification and safe-write boundaries.
