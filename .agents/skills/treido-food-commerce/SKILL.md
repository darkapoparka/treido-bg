---
name: treido-food-commerce
description: "Implement or review Treido producer-first discovery, food catalog, quantities, stock, checkout or recovery."
---

# Food commerce workflow

Start with the user journey in [product](../../../product.md) and the relevant [buyer experience](../../../web.md) or [seller workspace](../../../app.md). Read the necessary [detailed requirement](../../../docs/product/requirements.md), [decision](../../../docs/product/decisions.md) and [architecture](../../../architecture.md) section, not the entire documentation library.

Establish the phase: Shop parity retains exact source fixtures; only the approved food-adaptation task replaces them. In Treido, discovery is producer-first: manufacturer container -> that producer's foods -> storefront/product -> valid variant/quantity -> cart/purchase. Build a connected usable flow with loading/empty/error/return states, not another generic ecommerce grid. Keep one published catalog behind seller editing, public stores, eligible homepage shelves and search.

Keep variant/pack/unit semantics and exact quantity/money arithmetic. Preserve unknown food facts and evidence-backed certification/allergen claims. Apply approved policy, not a screenshot example or unapproved fee proposal. Synthetic food examples are not real sellers, availability or service promises.

For server operations, authorize the resource, validate current state, use transactional stock/uniqueness guarantees and durable idempotent provider reconciliation. Keep provider calls outside locked database work. Do not invent payment success, stock or refund allocation.

Verify the actual requested scope: producer/product identity across the connected UI and relevant visual/interaction checks for frontend work; real isolated database/provider tests for implemented service boundaries, including cross-tenant IDs, stale/duplicate input, last-stock competition and interrupted outcomes. UI evidence cannot prove those server invariants. A blocked policy/provider action does not block independent source UI work.
