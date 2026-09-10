# Lane B — Commerce / orders evidence

Owned flows: `21–31, 60–68, 79`.

Current queue: **21–31** → 60–68/79.

## Evidence blocks

Append; do not rewrite prior blocks.

No family has been accepted under the new evidence ledger yet. Existing cart/checkout/orders reference UI and historical tests are implementation inputs, not automatic acceptance. Begin with source review of every ordered frame in flows 21–31, inspect the current canonical commerce owners, then execute the worker loop in `parallel-execution.md`.