# Local Codex setup and sessions

This is the one-time setup and resume guide, not another product plan. The product destination is [product.md](../../product.md): finish the frozen Shop buyer UI/flows first, then adapt that same implementation into the producer-first food marketplace. [web.md](../../web.md) specifies manufacturer containers and their food shelves; [app.md](../../app.md) specifies seller operations/CMS.

## What is already set up

The current documentation and nine selected skills are committed on **astra-pro**. They are not a deployment, an automatic model change, or a claim that another branch/local checkout has been updated. The four upstream skills and five Treido workflows already live in `.agents/skills/`; an ordinary complete checkout needs no skill download or global installation. See [skills.md](skills.md).

The five retired parallel/lane guides have been removed from this branch. Useful historical snapshots remain under `docs/history/`, outside current instructions. [The documentation map](../README.md) identifies the current owners and retirement rules. Do not delete every Markdown file, generated framework guidance, source evidence or licenses.

## One-time local setup

### 1. Synchronize the existing checkout safely

Use the existing `J:\treido-bg` checkout for `darkapoparka/treido-bg`, not a new clone, worktree or legacy repository. Before making changes, inspect:

```sh
git status --short --branch
git remote -v
git log -1 --oneline
git fetch origin
git branch --list astra-pro
git branch --remotes --list origin/astra-pro
```

Verify the remote identity. Preserve uncommitted work and local-only commits. Do not reset, clean, force-push or silently stash. A dirty checkout or divergent history needs inspection before switching or merging; do not treat a branch switch as a safe way to move another session's edits.

For a clean checkout, switch to the existing local `astra-pro`; only if it does not exist, create its tracking checkout from the already-existing `origin/astra-pro`. Then fast-forward only:

```sh
git switch astra-pro
git merge --ff-only origin/astra-pro
git status --short --branch
```

When the local branch does not exist, replace the first command with `git switch --track origin/astra-pro`. Stop the synchronization on any error; inspect rather than forcing it. These commands do not authorize creating a different feature branch or modifying `main`.

Other sessions may have advanced `main` after this branch was created. Compare that history before any separately requested integration; do not assume the documentation branch contains later `main` changes or merge them automatically during setup. Likewise, do not claim the new docs were removed from or applied to `main`.

### 2. Verify the repository files and runtime

Use the repository's current `.node-version`, `package.json` packageManager pin and [techstack.md](../../techstack.md). Run from the repository root; do not upgrade the stack to match an unrelated global executable.

```sh
node --version
pnpm --version
python --version
node scripts/check-agent-docs.mjs
python scripts/agent-skills.py --verify
```

Use the available Python 3 launcher (`python3`, or `py -3` on Windows) if `python` is not that interpreter. Both verification scripts use their runtime standard libraries; they do not require a full application dependency installation. Run `pnpm install --frozen-lockfile` only when application dependencies are missing or inconsistent with the checked-out lockfile and the selected runtime is correct.

The documentation check verifies current file/link structure, the exact selected skill names, stable task/requirement IDs, preserved history and absence of the five retired guides. The upstream check verifies pinned bytes/inventory/licenses. Neither establishes skill discovery inside the running client, a live MCP connection, Shop fidelity or working commerce.

Do not run `--install` as a generic repair. With an existing lock it only verifies; it cannot repair missing managed files. Inspect missing or modified tracked files and recover only the understood missing content from the checked-out Git revision, preserving local edits. Never delete the lock to force a download or overwrite modified upstream skills.

### 3. Verify actual Codex discovery

Open a fresh Codex session rooted in this checkout after branch synchronization so the current instruction chain is loaded. Read `AGENTS.md`, `product.md`, `docs/STATUS.md`, then the selected task and its surface owner. Do not rely on instructions loaded before switching branches.

Confirm the session exposes the nine names in [skills.md](skills.md). The five project workflows are `treido-shop-parity`, `treido-food-commerce`, `treido-merchant-cms`, `treido-ai-quality` and `treido-session`. Check resolved paths point to this checkout. Review same-named user/plugin copies rather than copying these globally or silently deleting another installation. Use the client's skill picker; CLI/IDE users can inspect `/skills` or the `$` selector. These are interactive controls, not shell commands. Restart only if discovery remains stale.

If the client does not expose a needed skill, report that exact runtime limitation. Read the relevant checked-in workflow directly for independent implementation without pretending it was automatically discovered. Do not claim all integrations work merely because directories exist.

### 4. Verify the existing docs connection

[The project config](../../.codex/config.toml) contains only the public `openaiDeveloperDocs` MCP configuration. Review the trusted-project prompt using the client's normal controls. Do not edit global trust, approvals or sandbox settings to skip it.

Where the local CLI is installed, inspect `codex mcp list`; use `/mcp` in the interactive CLI or the client's MCP settings for active status. Make one harmless documentation search/fetch through the actual exposed server and report its result. A listed/configured server is not proof of a successful request. Do not print credentials or copy auth/session files to Git.

When connection, restart or user approval is required, record it precisely. This optional documentation service does not block independent Shop UI work with the checked-in references and installed framework docs. Do not install a duplicate global server while the project configuration already exists.

For broad Codex behavior questions, use the checked-in `openai-docs` skill and its actual `.agents/skills/openai-docs/scripts/` helper paths. [OpenAI guidance](openai-guidance.md) owns current-source lookup. External CLI/browser/device prerequisites are verified only for the task that needs them.

## Skill creator: use only for a concrete workflow change

`$skill-creator` authors or improves reusable skills; it is not required to load these files or turn the product docs into instructions. Do not invoke it to rewrite every document, install all upstream skills or restart the roadmap.

When a repeatable failure reveals a specific gap, use the available creator to refine the relevant one of our five Treido workflows. Keep product intent in product/surface docs and link to those owners. Validate frontmatter, invocation scope, real paths/commands and one representative use of the revised workflow. Leave the four pinned upstream directories unchanged. Prefer instruction-only changes when an existing script already does the work.

A missing creator is not a blocker: the existing repository workflows remain usable. A later skill/plugin migration is a reviewed tooling task, not an automatic setup upgrade.

## Model selection

Use the Astra option actually available in the installed client's model picker/account. The repository does not select a model merely by naming the branch `astra-pro`; it does not force an invented model slug or reasoning mode. Treido's eventual runtime AI has separate approved model/prompt/tool versions and budgets. Coding-agent setup does not provision an API service or billing.

## One prompt for local Codex

```text
Use the existing J:\treido-bg checkout for darkapoparka/treido-bg.
Read docs/agents/codex.md from the current origin/astra-pro revision
and execute its one-time setup. Safely synchronize astra-pro while
preserving local edits and commits; do not write to main or force anything.

Read current AGENTS.md, product.md, docs/STATUS.md and the active task.
Verify the checked-in docs and nine skills, confirm actual skill discovery,
and test the existing OpenAI docs MCP connection if available. Install only
missing prerequisites; do not reinstall bundled skills globally or redesign
the documentation. Use skill-creator only for a specific demonstrated gap
in an existing Treido workflow, not a wholesale rewrite.

Then resume Shop mobile-web parity from the current implementation map:
inspect the frozen sources, finish a connected flow family using existing
components/recipes/tests, compare source/live output, and exercise the UX.
The destination is producer-first food commerce, but do not rebrand before
source approval or begin unrelated backend/native/merchant work.

Report actual setup/test results and remaining runtime blockers. Commit
reviewed changes on astra-pro, push when fast-forward safe, and record the
next implementation action. Do not stop at a new plan when work can proceed.
```

For later sessions with setup already verified, use: **Read AGENTS.md, product.md and docs/STATUS.md; continue the current Shop task on astra-pro.** Do not repeat setup/network checks after every edit.

## Setup completion and handoff

Report the branch/source SHA; repository checks; actually discovered skill paths; actual MCP request result or limitation; and the resumed implementation family. Do not call the local client verified from a GitHub workflow result. Keep one concise result in the current session/handoff, not a new report for every tool.

At implementation checkpoints record changed behavior, commands/outcomes, evidence, failures/not-run checks and one resume action. [Verification](../../verification.md) governs the batch. Existing failing application CI remains visible and is not repaired by a docs-only pass. Source approval stays in the existing flow checklist and product decisions in their register.

## Official behavior references

Checked 2026-09-12. [Skills](https://developers.openai.com/codex/skills/) documents repo-scoped discovery and creation; [AGENTS.md](https://developers.openai.com/codex/guides/agents-md/) documents instruction loading; [MCP](https://developers.openai.com/codex/mcp/) documents project trust and connection inspection. These sources may redirect to OpenAI's current documentation site. Repo-specific steps above are Treido's workflow, not a claim of automatic installation on every client.
