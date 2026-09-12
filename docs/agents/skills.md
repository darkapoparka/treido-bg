# Skill catalogue

Repo discovery root: `.agents/skills/`. Load only the skill relevant to the requested workflow. Nine skills are bundled: four selected upstream OpenAI skills and five small Treido workflows. This is deliberately not an installation of every unrelated framework/deployment skill.

## Pinned upstream skills

Source: `openai/skills` commit `49f948faa9258a0c61caceaf225e179651397431`, selected from `skills/.curated/`. Complete selected directories are retained, including their original scripts, reference material, metadata, assets and licenses. The 34 files were fetched and checked against the upstream Git blob hashes; SHA-256 inventory lives in [upstream-skills.lock.json](upstream-skills.lock.json). No downloaded script is executed by the importer.

| Skill | Use for | Boundary |
| --- | --- | --- |
| `openai-docs` | Current OpenAI documentation, Codex/manual questions, model/prompt migration guidance | Prefer current sources; use its actual repo-local script paths; do not infer account/model access |
| `gh-fix-ci` | Requested GitHub Actions failure diagnosis and focused fixes | Existing connector/CLI authorization required; no weakened tests, branch changes or deployment |
| `security-threat-model` | Explicit repository/feature threat modeling | Scope to the actual product and authorized data; not a mandatory full audit per edit |
| `security-best-practices` | Requested security review or sensitive implementation guidance | Load only relevant language/framework references; installed APIs and Treido authority boundaries still apply |

These are upstream snapshots, not security certification or proof that every external CLI prerequisite is installed. Global/repo copies with identical names may conflict. Preserve the original upstream bytes and license; place project-specific interpretation in this catalogue and the root contract, not untracked edits to vendored files.

## Treido workflows

| Skill | Use for |
| --- | --- |
| `treido-shop-parity` | Frozen source -> canonical implementation -> connected interactions -> measured evidence |
| `treido-food-commerce` | Food facts/variants/quantities, tenant authority, stock, checkout and recovery |
| `treido-merchant-cms` | Real seller operations and draft/preview/publish/version/rollback |
| `treido-ai-quality` | Grounded AI features, permissioned tools and versioned evaluations |
| `treido-session` | Handoff and current-doc/task/evidence reconciliation |

The root agent contract already routes ordinary work; the session skill is not an instruction to conduct another whole-project audit. Skill descriptions are intentionally narrow. Do not invoke all nine for every task.

## Deliberately optional

The upstream `playwright` skill was inspected but is not installed here: it prescribes a separate CLI-first workflow and global-style paths, while Treido already has a working project-owned Playwright capture/journey runner. Adding a second browser pipeline would not improve reference fidelity. Use an available browser tool for ad hoc authorized inspection, without replacing the existing harness.

Deployment/auto-PR skills, Figma-only workflows, unrelated language frameworks, document/PDF/notebook/media tools and third-party ticket/workspace integrations are not blanket prerequisites. Add a specific skill only when a real task benefits, source/license/prerequisites are reviewed and its scope does not conflict.

## Verify or refresh

```sh
python scripts/agent-skills.py --verify
node scripts/check-agent-docs.mjs
```

`--verify` is offline. `--install` is an initial pinned import for a checkout lacking the selected upstream files; it refuses to overwrite unmanaged or modified skills. A clean ordinary checkout already contains them and needs no install/network step.

For an intentional upgrade, review the source commit diff and licenses, stage the new managed files explicitly, update the pin/lock coherently and rerun both checks. Do not silently advance to upstream `main`, modify the global Codex skill directory or execute a downloaded helper without checking its purpose. Python bytecode/cache files are not part of the upstream inventory and must stay out of public source.

[Documentation batch validation](validation.md) records actual checks and boundaries.
