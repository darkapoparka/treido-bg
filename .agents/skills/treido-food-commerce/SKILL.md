---
name: treido-food-commerce
description: "Implement or review Treido food catalog, quantities, stock, checkout or recovery."
---

# Food commerce workflow

Read [product](../../../product.md), [detailed requirements](../../../docs/product/requirements.md), [decisions](../../../docs/product/decisions.md) and relevant [architecture](../../../architecture.md). Identify the exact business operation and its authoritative server owner.

Keep variant/pack/unit semantics and exact quantity/money arithmetic. Preserve unknown food facts and evidence-backed certification/allergen claims. Apply approved policy, not a screenshot example or unapproved fee proposal.

Authorize each resource operation, validate current state, use transactional stock/uniqueness guarantees and durable idempotent provider reconciliation. Keep provider calls outside locked database work. Do not invent payment success, stock or refund allocation.

Test the relevant real isolated database/provider boundary, including cross-tenant IDs, stale/duplicate input, last-stock competition and interrupted/reordered outcomes. UI tests alone do not prove these invariants. A blocked policy/provider action does not block independent source UI work.
