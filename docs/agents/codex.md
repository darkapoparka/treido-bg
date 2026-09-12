# Local Codex sessions

## Open the right checkout

Use `darkapoparka/treido-bg`, active branch `astra-pro`. The current Windows checkout is `J:\treido-bg`; verify the remote and branch before edits. Do not start a new clone/worktree or import `treido-next` as setup. Preserve dirty work and do not switch branches over it.

```sh
git status --short --branch
git remote -v
git log -1 --oneline
```

A clean checkout on the old branch can fetch and switch to the existing `astra-pro` tracking branch. Never reset or overwrite local work to achieve that. To update an existing clean `astra-pro`, use fast-forward-only pulls. Review divergent history instead of forcing it.

## What the agent loads

The root AGENTS file routes to the current status, task and surface contract. Nested web/native instructions constrain their subtrees. Root product/surface docs provide durable intent; the current task/evidence records provide continuity between accounts and sessions. Conversation memory is not required to reconstruct the project state.

Repository skills are in `.agents/skills/`; the current skill catalogue and official source pin are in [skills.md](skills.md). In the actual Codex session, confirm the expected skills are discovered. A fresh session may be needed after installation. Do not claim discovery solely because a directory exists; check the client actually in use. Existing same-named global copies may conflict and should be reviewed, not silently overwritten.

The project `.codex/config.toml` configures only `openaiDeveloperDocs` at the public OpenAI docs endpoint. Review/trust the repository configuration using the installed client's normal controls. A configured URL does not prove a connected tool, account entitlement, filesystem access or a specific model is available. No global config, permissive sandbox setting or secret is committed.

For broad Codex behavior questions, the vendored openai-docs workflow includes its manual-fetch helper. Use the script from `.agents/skills/openai-docs/scripts/`, not a guessed global path. For library work, use installed-version framework docs. Follow [OpenAI guidance](openai-guidance.md) for current-source lookup, not old model memory.

## Model selection

Select the actual Astra/model option offered by the installed Codex client and account. This repo does not invent a `gpt-6-astra-pro` slug or force a reasoning mode. Use deeper reasoning for ambiguous architecture/security work and a suitable lower-cost/latency mode for routine verified implementation where available. Evaluate outcomes; a model label alone does not guarantee fidelity.

Treido's later runtime AI is a separate reviewed integration with its own model/prompt/tool versions and budgets. Changing the coding agent does not migrate the marketplace's API or provision billing.

## A new-session prompt

```text
Work in the existing darkapoparka/treido-bg checkout on astra-pro.
Read AGENTS.md, docs/STATUS.md and the current Shop task/checkpoint.
Continue the Shop mobile-web parity implementation using current source,
the frozen references and the existing recipes, tests and ledgers.
Finish a coherent connected flow family; inspect source/live pairs and
exercise the real interactions. Preserve all existing work and thresholds.
Do not restart the plan, rebrand early, begin another product surface or
write to main. Commit the verified batch and record the exact next action.
```

For another task, replace only the task/family/outcome. Do not paste every doc or start three competing writers. Built-in skills, connectors and tools are used only when actually available and relevant; missing optional tools do not justify abandoning independent implementation.

## Handoff

At a checkpoint record the exact commit, changed behavior, actual checks, evidence locations, failures/not-run checks and one concrete resume action. Keep source approvals in the existing checklist and product decisions in their register. Never inflate a percentage by confusing routes with frames or review candidates with accepted flows.

Commit/push only reviewed files on the active branch, with no secrets, private screenshots or customer records. A session ending does not authorize an unattended process, production release or an unrequested recurring task.
