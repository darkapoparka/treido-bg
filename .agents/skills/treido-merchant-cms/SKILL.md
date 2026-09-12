---
name: treido-merchant-cms
description: "Build or review Treido seller operations and storefront editing or publishing."
---

# Merchant and CMS workflow

Read [app.md](../../../app.md), [architecture](../../../architecture.md), [decisions](../../../docs/product/decisions.md) and the [Shopify source record](../../../shopify/README.md). Confirm that the requested phase actually authorizes merchant work. Do not infer downloaded references or an implemented backend from a source link.

Implement a complete authorized workflow with empty/populated/restricted/revoked states and persisted results. Keep business context explicit and server-enforced. Phone and desktop need useful task-oriented compositions, not decorative charts or hidden mandatory actions.

For CMS work, use validated sections, tenant-safe media, revision-aware drafts, authorized preview, immutable publication and audited rollback with current validation. Preview and public pages share the renderer; publish invalidates affected public content. Test concurrent edits, rejected publication, draft isolation and the buyer-visible result.

Core operations remain available without Premium/AI. Record measured reference fidelity separately from Treido-specific food requirements and real-service acceptance.
