# Shop frame execution ledger

Generated from the frozen manifest and deterministic replay definitions. This is a frame index, not a second work queue. `shop-parity-checklist.md` owns flow acceptance.

**Corpus:** 97 flows / 424 ordered frames. **Mapped:** 424/424. **Scored in this run:** 424/424. **Numerical candidates:** 57; not automatic visual acceptance.

Evidence run: `20260920-connected-qualified-full`; created 2026-09-20T17:53:50.056Z; source HEAD `b8377ff4ce28942bb8fac6a8a781f7a22abe8322` (the report records the working-tree state). Viewport: 393x793.

Later application **b302d88**, including **fe3d5e6**, **6b89210** and **30f336e**, has scoped evidence in [the implementation map](shop-implementation-map.md#current-source-checkpoint). This complete ledger is not relabeled as qualification of that later source.

A numerical candidate requires MAE <= 1.5% and bad-pixel-12 <= 8%. Direct region inspection, complete UX coverage, sibling regression checks and owner acceptance are still required. Unchecked entries are not complete.

## SF-001 — Onboarding

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-001:001 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/001.webp` | shop-purple-splash | Defined | 0.332 | 0.350 | NUMERICAL CANDIDATE |
| [ ] SF-001:002 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp` | shop-get-started | Defined | 1.314 | 4.036 | NUMERICAL CANDIDATE |
| [ ] SF-001:003 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp` | discover-next-brand | Defined | 1.980 | 4.591 | REFINE |
| [ ] SF-001:004 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/004.webp` | email-sign-in-empty | Defined | 3.351 | 7.968 | REFINE |
| [ ] SF-001:005 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/005.webp` | email-sign-in-filled | Defined | 3.893 | 8.885 | REFINE |
| [ ] SF-001:006 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/006.webp` | email-code-empty | Defined | 1.258 | 3.372 | NUMERICAL CANDIDATE |
| [ ] SF-001:007 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/007.webp` | email-code-pending | Defined | 1.510 | 4.101 | REFINE |
| [ ] SF-001:008 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/008.webp` | captured-home-after-sign-in | Defined | 3.478 | 14.203 | REFINE |
| [ ] SF-001:009 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp` | shopping-preferences-empty | Defined | 1.698 | 5.150 | REFINE |
| [ ] SF-001:010 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/010.webp` | email-code-verified | Defined | 1.006 | 3.166 | NUMERICAL CANDIDATE |
| [ ] SF-001:011 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/011.webp` | tracking-introduction | Defined | 1.525 | 4.114 | REFINE |
| [ ] SF-001:012 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/012.webp` | captured-signing-in | Defined | 0.844 | 1.954 | NUMERICAL CANDIDATE |
| [ ] SF-001:013 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/013.webp` | everything-preference-selected | Defined | 1.956 | 5.138 | REFINE |
| [ ] SF-001:014 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/014.webp` | home-feed-loading | Defined | 0.571 | 0.255 | NUMERICAL CANDIDATE |
| [ ] SF-001:015 | `flows/b778fdce-2c65-4153-aaee-6703098f27d4/015.webp` | tracking-updates-introduction | Defined | 1.495 | 3.934 | NUMERICAL CANDIDATE |

## SF-002 — Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-002:001 | `flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp` | welcome-feed | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-002:002 | `flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/002.webp` | recently-viewed-shops | Defined | 3.173 | 13.304 | REFINE |
| [ ] SF-002:003 | `flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/003.webp` | recently-viewed-products-with-order | Defined | 2.914 | 8.169 | REFINE |
| [ ] SF-002:004 | `flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/004.webp` | tracking-feed-drmtlgy | Defined | 4.480 | 19.153 | REFINE |
| [ ] SF-002:005 | `flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp` | loaded-tea-accessories-feed | Defined | 3.354 | 11.346 | REFINE |
| [ ] SF-002:006 | `flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/006.webp` | kitsch-campaign-feed | Defined | 2.353 | 8.960 | REFINE |

## SF-003 — Notifications from Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-003:001 | `flows/7d658ff4-e530-401f-9ce3-07b9533e913b/001.webp` | welcome-feed | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-003:002 | `flows/7d658ff4-e530-401f-9ce3-07b9533e913b/002.webp` | notifications-empty | Defined | 2.019 | 5.048 | REFINE |

## SF-004 — Deals from Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-004:001 | `flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/001.webp` | welcome-feed | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-004:002 | `flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp` | deals-rinse-syman | Defined | 3.685 | 13.772 | REFINE |
| [ ] SF-004:003 | `flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp` | deals-francesco-solid-hair | Defined | 3.760 | 13.906 | REFINE |

## SF-005 — Following from Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-005:001 | `flows/d0ac7fdc-d174-4a9c-a18d-3136f358c5a7/001.webp` | welcome-feed | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-005:002 | `flows/d0ac7fdc-d174-4a9c-a18d-3136f358c5a7/002.webp` | following-empty-recommendation | Defined | 4.099 | 15.379 | REFINE |
| [ ] SF-005:003 | `flows/d0ac7fdc-d174-4a9c-a18d-3136f358c5a7/003.webp` | following-pura-products | Defined | 2.404 | 7.158 | REFINE |
| [ ] SF-005:004 | `flows/d0ac7fdc-d174-4a9c-a18d-3136f358c5a7/004.webp` | following-kitsch-and-older-pura | Defined | 1.417 | 4.841 | NUMERICAL CANDIDATE |

## SF-006 — Following list from Following

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-006:001 | `flows/86f7d1aa-4b5a-485d-b106-c0bc09983673/001.webp` | following-pura-products | Defined | 2.404 | 7.158 | REFINE |
| [ ] SF-006:002 | `flows/86f7d1aa-4b5a-485d-b106-c0bc09983673/002.webp` | following-manage-list | Defined | 1.053 | 3.079 | NUMERICAL CANDIDATE |

## SF-007 — Saved from Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-007:001 | `flows/75b26fee-826f-4403-9288-be499890cd72/001.webp` | home-before-saved | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-007:002 | `flows/75b26fee-826f-4403-9288-be499890cd72/002.webp` | saved-empty | Defined | 2.109 | 6.262 | REFINE |
| [ ] SF-007:003 | `flows/75b26fee-826f-4403-9288-be499890cd72/003.webp` | saved-two-items | Defined | 2.059 | 6.801 | REFINE |
| [ ] SF-007:004 | `flows/75b26fee-826f-4403-9288-be499890cd72/004.webp` | multi-brand-saved-library | Defined | 3.196 | 11.147 | REFINE |

## SF-008 — Creating a collection from Saved

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-008:001 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/001.webp` | saved-before-creation | Defined | 2.059 | 6.801 | REFINE |
| [ ] SF-008:002 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/002.webp` | collection-name-empty-focused | Defined | 2.216 | 5.344 | REFINE |
| [ ] SF-008:003 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/003.webp` | collection-name-entered-focused | Defined | 2.021 | 4.334 | REFINE |
| [ ] SF-008:004 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/004.webp` | add-saved-unselected | Defined | 1.588 | 6.035 | REFINE |
| [ ] SF-008:005 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/005.webp` | add-saved-two-selected | Defined | 1.404 | 5.161 | NUMERICAL CANDIDATE |
| [ ] SF-008:006 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/006.webp` | created-collection-with-collaboration-callout | Defined | 3.123 | 10.560 | REFINE |
| [ ] SF-008:007 | `flows/b74ee3f5-005d-40d3-9466-f6d080f62b40/007.webp` | multi-brand-saved-library | Defined | 3.196 | 11.147 | REFINE |

## SF-009 — Collection detail (saved) from Saved

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-009:001 | `flows/a3ff00dc-6536-4966-89ae-2af61582d347/001.webp` | multi-brand-saved-library | Defined | 3.196 | 11.147 | REFINE |
| [ ] SF-009:002 | `flows/a3ff00dc-6536-4966-89ae-2af61582d347/002.webp` | private-two-item-collection | Defined | 3.123 | 10.559 | REFINE |
| [ ] SF-009:003 | `flows/a3ff00dc-6536-4966-89ae-2af61582d347/003.webp` | private-collection-scrolled | Defined | 3.602 | 14.910 | REFINE |

## SF-010 — More ideas from Collection detail (saved)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-010:001 | `flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/001.webp` | private-collection-scrolled | Defined | 3.602 | 14.910 | REFINE |
| [ ] SF-010:002 | `flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp` | six-collection-recommendations | Defined | 3.516 | 14.448 | REFINE |

## SF-011 — Editing a collection name from Collection detail (saved)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-011:001 | `flows/c01a7936-24cd-44fb-97fc-a25302b0a2cf/001.webp` | private-collection-scrolled | Defined | 3.602 | 14.910 | REFINE |
| [ ] SF-011:002 | `flows/c01a7936-24cd-44fb-97fc-a25302b0a2cf/002.webp` | expanded-collection-options | Defined | 2.584 | 6.742 | REFINE |
| [ ] SF-011:003 | `flows/c01a7936-24cd-44fb-97fc-a25302b0a2cf/003.webp` | edit-name-focused | Defined | 3.484 | 12.846 | REFINE |
| [ ] SF-011:004 | `flows/c01a7936-24cd-44fb-97fc-a25302b0a2cf/004.webp` | edit-name-with-emoji | Defined | 3.633 | 13.256 | REFINE |
| [ ] SF-011:005 | `flows/c01a7936-24cd-44fb-97fc-a25302b0a2cf/005.webp` | renamed-three-item-collection | Defined | 3.358 | 10.149 | REFINE |

## SF-012 — Changing a collection visibility from Collection detail (saved)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-012:001 | `flows/bd9d1905-9b47-445b-805f-0dcc71b59427/001.webp` | private-collection-options | Defined | 2.584 | 6.742 | REFINE |
| [ ] SF-012:002 | `flows/bd9d1905-9b47-445b-805f-0dcc71b59427/002.webp` | make-public-confirmation | Defined | 3.461 | 8.568 | REFINE |
| [ ] SF-012:003 | `flows/bd9d1905-9b47-445b-805f-0dcc71b59427/003.webp` | public-collection-with-confirmation-toast | Defined | 4.183 | 14.054 | REFINE |

## SF-013 — Deleting a collection from Collection detail (saved)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-013:001 | `flows/bca3a9c6-3340-4b93-881d-ee1a26c2b26a/001.webp` | collection-options-before-delete | Defined | 2.582 | 6.742 | REFINE |
| [ ] SF-013:002 | `flows/bca3a9c6-3340-4b93-881d-ee1a26c2b26a/002.webp` | delete-collection-confirmation | Defined | 3.508 | 8.806 | REFINE |
| [ ] SF-013:003 | `flows/bca3a9c6-3340-4b93-881d-ee1a26c2b26a/003.webp` | saved-items-retained-after-deletion | Defined | 2.059 | 6.801 | REFINE |

## SF-014 — Collection detail (shop detail) from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-014:001 | `flows/e85d0150-4fe9-4ee0-bde4-de17fe6da7df/001.webp` | kitsch-scrolled-collections | Defined | 3.471 | 13.701 | REFINE |
| [ ] SF-014:002 | `flows/e85d0150-4fe9-4ee0-bde4-de17fe6da7df/002.webp` | whats-new-collection | Defined | 3.781 | 16.148 | REFINE |
| [ ] SF-014:003 | `flows/e85d0150-4fe9-4ee0-bde4-de17fe6da7df/003.webp` | best-sellers-first-save-collection-prompt | Defined | 4.315 | 25.768 | REFINE |

## SF-015 — Watching a video from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-015:001 | `flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp` | chemical-guys-products-and-video-rail | Defined | 4.553 | 22.742 | REFINE |
| [ ] SF-015:002 | `flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/002.webp` | chemical-guys-tire-trim-video-frame | Defined | 1.475 | 4.498 | NUMERICAL CANDIDATE |

## SF-016 — Filtering products (shop detail) from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-016:001 | `flows/85a58afb-b3e8-4f69-b274-69762b09ffbf/001.webp` | store-filter-default | Defined | 3.214 | 15.735 | REFINE |
| [ ] SF-016:002 | `flows/85a58afb-b3e8-4f69-b274-69762b09ffbf/002.webp` | store-filter-on-sale-draft | Defined | 3.197 | 15.413 | REFINE |
| [ ] SF-016:003 | `flows/85a58afb-b3e8-4f69-b274-69762b09ffbf/003.webp` | store-price-default-range | Defined | 2.692 | 13.482 | REFINE |
| [ ] SF-016:004 | `flows/85a58afb-b3e8-4f69-b274-69762b09ffbf/004.webp` | store-price-maximum-380-draft | Defined | 2.616 | 13.267 | REFINE |
| [ ] SF-016:005 | `flows/85a58afb-b3e8-4f69-b274-69762b09ffbf/005.webp` | store-products-after-filter-done | Defined | 3.365 | 15.206 | REFINE |

## SF-017 — Product detail from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-017:001 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/001.webp` | store-all-products-before-shea | Defined | 3.229 | 15.261 | REFINE |
| [ ] SF-017:002 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/002.webp` | shea-first-arrival | Defined | 2.583 | 7.399 | REFINE |
| [ ] SF-017:003 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/003.webp` | shea-settled-detail | Defined | 1.943 | 5.783 | REFINE |
| [ ] SF-017:004 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/004.webp` | shea-benefits-photo-in-inline-gallery | Defined | 3.762 | 17.778 | REFINE |
| [ ] SF-017:005 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/005.webp` | captured-midi-shirtdress-variants | Defined | 4.216 | 12.236 | REFINE |
| [ ] SF-017:006 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/006.webp` | shea-purchase-options-description-and-reviews | Defined | 3.899 | 10.740 | REFINE |
| [ ] SF-017:007 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/007.webp` | bag-purchase-description-and-reviews | Defined | 3.290 | 10.035 | REFINE |
| [ ] SF-017:008 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/008.webp` | shea-store-card-and-recommendations | Defined | 3.717 | 15.227 | REFINE |
| [ ] SF-017:009 | `flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/009.webp` | bag-delivery-store-and-recommendations | Defined | 3.318 | 12.755 | REFINE |

## SF-018 — Photos from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-018:001 | `flows/0f9653b4-5412-485a-a3a4-62bfb492a27e/001.webp` | shea-product-detail-top | Defined | 1.956 | 5.804 | REFINE |
| [ ] SF-018:002 | `flows/0f9653b4-5412-485a-a3a4-62bfb492a27e/002.webp` | shea-fullscreen-first-photo | Defined | 0.760 | 3.980 | NUMERICAL CANDIDATE |
| [ ] SF-018:003 | `flows/0f9653b4-5412-485a-a3a4-62bfb492a27e/003.webp` | shea-fullscreen-testimonial-photo | Defined | 1.011 | 4.940 | NUMERICAL CANDIDATE |

## SF-019 — Saving a product to a collection from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-019:001 | `flows/300d3e11-4ba4-4c43-b720-a7132c6eb7f5/001.webp` | shea-product-detail-top | Defined | 1.943 | 5.783 | REFINE |
| [ ] SF-019:002 | `flows/300d3e11-4ba4-4c43-b720-a7132c6eb7f5/002.webp` | shea-saved-collection-picker | Defined | 1.516 | 4.084 | REFINE |
| [ ] SF-019:003 | `flows/300d3e11-4ba4-4c43-b720-a7132c6eb7f5/003.webp` | shea-item-saved-toast | Defined | 2.780 | 8.883 | REFINE |

## SF-020 — Adding a product to cart from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-020:001 | `flows/9211553e-bc3c-45f9-943b-f032766e6799/001.webp` | bag-purchase-controls-description-reviews | Defined | 3.290 | 10.035 | REFINE |
| [ ] SF-020:002 | `flows/9211553e-bc3c-45f9-943b-f032766e6799/002.webp` | bag-added-quantity-and-disabled-buy-now | Defined | 4.364 | 12.126 | REFINE |
| [ ] SF-020:003 | `flows/9211553e-bc3c-45f9-943b-f032766e6799/003.webp` | bag-exclusive-offer-and-cart-summary | Defined | 3.720 | 10.289 | REFINE |

## SF-021 — Purchasing a product from Adding a product to cart

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-021:001 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/001.webp` | bag-after-add-before-cart | Defined | 4.364 | 12.126 | REFINE |
| [ ] SF-021:002 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/002.webp` | bag-cart-discount-and-checkout | Defined | 2.319 | 10.135 | REFINE |
| [ ] SF-021:003 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/003.webp` | checkout-review-collapsed | Defined | 3.358 | 8.062 | REFINE |
| [ ] SF-021:004 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/004.webp` | checkout-address-shipping-plan-expanded | Defined | 3.169 | 7.091 | REFINE |
| [ ] SF-021:005 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/005.webp` | checkout-plan-and-payment-expanded | Defined | 3.143 | 7.905 | REFINE |
| [ ] SF-021:006 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/006.webp` | white-rock-captured-shipping | Defined | 3.092 | 7.207 | REFINE |
| [ ] SF-021:007 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/007.webp` | white-rock-captured-pickup | Defined | 3.883 | 9.314 | REFINE |
| [ ] SF-021:008 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/008.webp` | kitsch-recommendations-and-total | Defined | 4.500 | 11.207 | REFINE |
| [ ] SF-021:009 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/009.webp` | kitsch-pay-processing | Defined | 4.510 | 11.133 | REFINE |
| [ ] SF-021:010 | `flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/010.webp` | captured-order-confirmation | Defined | 2.906 | 7.675 | REFINE |

## SF-022 — Deleting a product from cart from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-022:001 | `flows/c5c9c07b-c093-4221-a2f8-44ca7c29ded0/001.webp` | bag-cart-before-removal | Defined | 2.319 | 10.135 | REFINE |
| [ ] SF-022:002 | `flows/c5c9c07b-c093-4221-a2f8-44ca7c29ded0/002.webp` | cart-empty-after-removal | Defined | 1.230 | 6.693 | NUMERICAL CANDIDATE |

## SF-023 — Saving a product for later from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-023:001 | `flows/07f5c915-d967-4ef4-89f7-e08ac90c974c/001.webp` | captured-unavailable-bag-cart | Defined | 2.319 | 10.134 | REFINE |
| [ ] SF-023:002 | `flows/07f5c915-d967-4ef4-89f7-e08ac90c974c/002.webp` | cart-empty-and-bag-saved-for-later | Defined | 1.633 | 7.709 | REFINE |

## SF-024 — Adding a phone number from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-024:001 | `flows/5d20e36e-e6c5-4561-b42b-b0385bf6ae86/001.webp` | new-buyer-cart-before-phone | Defined | 2.319 | 10.135 | REFINE |
| [ ] SF-024:002 | `flows/5d20e36e-e6c5-4561-b42b-b0385bf6ae86/002.webp` | phone-number-empty | Defined | 3.159 | 7.500 | REFINE |
| [ ] SF-024:003 | `flows/5d20e36e-e6c5-4561-b42b-b0385bf6ae86/003.webp` | phone-number-entered | Defined | 3.305 | 7.545 | REFINE |
| [ ] SF-024:004 | `flows/5d20e36e-e6c5-4561-b42b-b0385bf6ae86/004.webp` | phone-security-code-empty | Defined | 1.206 | 2.762 | NUMERICAL CANDIDATE |
| [ ] SF-024:005 | `flows/5d20e36e-e6c5-4561-b42b-b0385bf6ae86/005.webp` | phone-security-code-processing | Defined | 0.835 | 1.807 | NUMERICAL CANDIDATE |
| [ ] SF-024:006 | `flows/5d20e36e-e6c5-4561-b42b-b0385bf6ae86/006.webp` | captured-shipping-address-after-code | Defined | 1.998 | 5.224 | REFINE |

## SF-025 — Adding an address from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-025:001 | `flows/e116f3b1-f952-4b4d-a0ba-0125bd3e65f7/001.webp` | initial-shipping-address-search-empty | Defined | 1.998 | 5.224 | REFINE |
| [ ] SF-025:002 | `flows/e116f3b1-f952-4b4d-a0ba-0125bd3e65f7/002.webp` | initial-shipping-address-suggestion | Defined | 3.010 | 6.562 | REFINE |
| [ ] SF-025:003 | `flows/e116f3b1-f952-4b4d-a0ba-0125bd3e65f7/003.webp` | initial-selected-address-details-empty | Defined | 2.986 | 8.330 | REFINE |
| [ ] SF-025:004 | `flows/e116f3b1-f952-4b4d-a0ba-0125bd3e65f7/004.webp` | initial-address-edit-form | Defined | 3.190 | 7.916 | REFINE |
| [ ] SF-025:005 | `flows/e116f3b1-f952-4b4d-a0ba-0125bd3e65f7/005.webp` | initial-address-edit-locality | Defined | 3.375 | 8.980 | REFINE |
| [ ] SF-025:006 | `flows/e116f3b1-f952-4b4d-a0ba-0125bd3e65f7/006.webp` | initial-payment-empty-after-address | Defined | 1.290 | 4.284 | NUMERICAL CANDIDATE |

## SF-026 — Adding a card (purchasing a product) from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-026:001 | `flows/d92a8091-56fb-4119-baf8-13c9baaba2ad/001.webp` | initial-card-empty | Defined | 1.290 | 4.284 | NUMERICAL CANDIDATE |
| [ ] SF-026:002 | `flows/d92a8091-56fb-4119-baf8-13c9baaba2ad/002.webp` | initial-card-complete | Defined | 1.963 | 6.722 | REFINE |
| [ ] SF-026:003 | `flows/d92a8091-56fb-4119-baf8-13c9baaba2ad/003.webp` | review-after-captured-card | Defined | 3.358 | 8.062 | REFINE |

## SF-027 — Adding an address (review & pay) from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-027:001 | `flows/8ecf7b0b-df5a-4773-9ac4-c61d62ca4459/001.webp` | review-expanded-before-new-address | Defined | 3.169 | 7.091 | REFINE |
| [ ] SF-027:002 | `flows/8ecf7b0b-df5a-4773-9ac4-c61d62ca4459/002.webp` | review-new-address-empty | Defined | 1.657 | 4.484 | REFINE |
| [ ] SF-027:003 | `flows/8ecf7b0b-df5a-4773-9ac4-c61d62ca4459/003.webp` | review-address-suggestions-and-keyboard | Defined | 3.084 | 8.666 | REFINE |
| [ ] SF-027:004 | `flows/8ecf7b0b-df5a-4773-9ac4-c61d62ca4459/004.webp` | review-new-address-locality-filled | Defined | 2.025 | 7.510 | REFINE |
| [ ] SF-027:005 | `flows/8ecf7b0b-df5a-4773-9ac4-c61d62ca4459/005.webp` | review-new-address-save-visible | Defined | 3.462 | 11.236 | REFINE |
| [ ] SF-027:006 | `flows/8ecf7b0b-df5a-4773-9ac4-c61d62ca4459/006.webp` | review-new-address-selected | Defined | 3.279 | 7.632 | REFINE |

## SF-028 — Deleting an address from Adding an address (review & pay)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-028:001 | `flows/797e33cd-30bd-4d70-b3ef-72aa655394fb/001.webp` | review-two-addresses-before-removal | Defined | 3.279 | 7.632 | REFINE |
| [ ] SF-028:002 | `flows/797e33cd-30bd-4d70-b3ef-72aa655394fb/002.webp` | review-new-address-options | Defined | 3.363 | 7.862 | REFINE |
| [ ] SF-028:003 | `flows/797e33cd-30bd-4d70-b3ef-72aa655394fb/003.webp` | review-delete-address-confirmation | Defined | 3.088 | 5.772 | REFINE |
| [ ] SF-028:004 | `flows/797e33cd-30bd-4d70-b3ef-72aa655394fb/004.webp` | review-address-deleted-original-selected | Defined | 3.169 | 7.091 | REFINE |

## SF-029 — Adding a card (review & pay) from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-029:001 | `flows/604544ec-654f-4358-b33b-ce189f5fd4e4/001.webp` | review-expanded-before-new-payment | Defined | 3.143 | 7.905 | REFINE |
| [ ] SF-029:002 | `flows/604544ec-654f-4358-b33b-ce189f5fd4e4/002.webp` | review-payment-method-editor-empty | Defined | 2.697 | 8.421 | REFINE |
| [ ] SF-029:003 | `flows/604544ec-654f-4358-b33b-ce189f5fd4e4/003.webp` | review-payment-complete-billing-expanded | Defined | 2.916 | 8.550 | REFINE |
| [ ] SF-029:004 | `flows/604544ec-654f-4358-b33b-ce189f5fd4e4/004.webp` | review-payment-billing-and-save | Defined | 4.496 | 11.403 | REFINE |
| [ ] SF-029:005 | `flows/604544ec-654f-4358-b33b-ce189f5fd4e4/005.webp` | review-captured-second-payment-selected | Defined | 3.813 | 9.323 | REFINE |

## SF-030 — Order summary from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-030:001 | `flows/5a094147-42c1-4132-9f3d-b8ac55a25ef4/001.webp` | checkout-total-collapsed | Defined | 4.500 | 11.207 | REFINE |
| [ ] SF-030:002 | `flows/5a094147-42c1-4132-9f3d-b8ac55a25ef4/002.webp` | checkout-order-summary-expanded | Defined | 3.479 | 8.178 | REFINE |

## SF-031 — Order receipt (purchasing a product) from Purchasing a product

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-031:001 | `flows/c61e4d3b-629f-48b5-a322-5472f46e9b1b/001.webp` | captured-confirmed-order-before-receipt | Defined | 2.909 | 7.695 | REFINE |
| [ ] SF-031:002 | `flows/c61e4d3b-629f-48b5-a322-5472f46e9b1b/002.webp` | captured-receipt-top | Defined | 4.485 | 10.254 | REFINE |
| [ ] SF-031:003 | `flows/c61e4d3b-629f-48b5-a322-5472f46e9b1b/003.webp` | captured-receipt-address-and-seller | Defined | 4.203 | 8.714 | REFINE |

## SF-032 — Description from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-032:001 | `flows/1dc39cc8-951e-4207-96a5-296145053e26/001.webp` | bag-description-preview | Defined | 3.290 | 10.035 | REFINE |
| [ ] SF-032:002 | `flows/1dc39cc8-951e-4207-96a5-296145053e26/002.webp` | shea-full-description-and-ingredients | Defined | 5.599 | 19.255 | REFINE |

## SF-033 — Reviews (product detail) from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-033:001 | `flows/4e59dce2-d2a0-4f4e-ae16-54267243df75/001.webp` | bag-purchase-controls-and-review-preview | Defined | 3.290 | 10.035 | REFINE |
| [ ] SF-033:002 | `flows/4e59dce2-d2a0-4f4e-ae16-54267243df75/002.webp` | shea-reviews-summary-and-collapsed-reviews | Defined | 4.760 | 11.229 | REFINE |

## SF-034 — Searching keywords from Reviews (product detail)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-034:001 | `flows/b2a75fc0-0d02-462f-8bb7-65ae38d08840/001.webp` | shea-reviews-summary-and-collapsed-reviews | Defined | 4.760 | 11.229 | REFINE |
| [ ] SF-034:002 | `flows/b2a75fc0-0d02-462f-8bb7-65ae38d08840/002.webp` | shea-reviews-nice-search-results | Defined | 3.284 | 8.216 | REFINE |

## SF-035 — Marking a review as helpful from Reviews (product detail)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-035:001 | `flows/36c23a43-49d3-4932-9595-f122062480b4/001.webp` | shea-reviews-summary-and-collapsed-reviews | Defined | 4.760 | 11.229 | REFINE |
| [ ] SF-035:002 | `flows/36c23a43-49d3-4932-9595-f122062480b4/002.webp` | first-review-expanded-and-marked-helpful | Defined | 4.934 | 11.597 | REFINE |

## SF-036 — Reporting a review from Reviews (product detail)

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-036:001 | `flows/fae1016a-facb-4633-b62b-7ddd809e0fac/001.webp` | shea-reviews-summary-and-collapsed-reviews | Defined | 4.760 | 11.229 | REFINE |
| [ ] SF-036:002 | `flows/fae1016a-facb-4633-b62b-7ddd809e0fac/002.webp` | expanded-helpful-review-more-options | Defined | 3.453 | 10.727 | REFINE |
| [ ] SF-036:003 | `flows/fae1016a-facb-4633-b62b-7ddd809e0fac/003.webp` | review-report-reasons-unselected | Defined | 4.542 | 12.243 | REFINE |
| [ ] SF-036:004 | `flows/fae1016a-facb-4633-b62b-7ddd809e0fac/004.webp` | review-report-spam-selected | Defined | 4.710 | 12.351 | REFINE |
| [ ] SF-036:005 | `flows/fae1016a-facb-4633-b62b-7ddd809e0fac/005.webp` | review-report-local-confirmation | Defined | 4.773 | 13.027 | REFINE |
| [ ] SF-036:006 | `flows/fae1016a-facb-4633-b62b-7ddd809e0fac/006.webp` | reported-review-dimmed-and-marked | Defined | 4.753 | 12.963 | REFINE |

## SF-037 — Contact a shop from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-037:001 | `flows/6b220d0d-825a-477b-b42f-2e2330f6b8bb/001.webp` | shea-product-detail-top | Defined | 1.956 | 5.804 | REFINE |
| [ ] SF-037:002 | `flows/6b220d0d-825a-477b-b42f-2e2330f6b8bb/002.webp` | shea-product-more-options | Defined | 1.563 | 3.706 | REFINE |
| [ ] SF-037:003 | `flows/6b220d0d-825a-477b-b42f-2e2330f6b8bb/003.webp` | kitsch-contact-links-and-address | Defined | 1.853 | 3.839 | REFINE |

## SF-038 — Reporting a product from Product detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-038:001 | `flows/82159116-18bf-4988-9acd-0f1bb1f76a0f/001.webp` | shea-more-options-before-report | Defined | 1.563 | 3.706 | REFINE |
| [ ] SF-038:002 | `flows/82159116-18bf-4988-9acd-0f1bb1f76a0f/002.webp` | product-report-no-reason | Defined | 1.503 | 2.812 | REFINE |
| [ ] SF-038:003 | `flows/82159116-18bf-4988-9acd-0f1bb1f76a0f/003.webp` | product-report-other-selected | Defined | 1.535 | 2.905 | REFINE |
| [ ] SF-038:004 | `flows/82159116-18bf-4988-9acd-0f1bb1f76a0f/004.webp` | product-report-optional-notes-empty | Defined | 1.204 | 2.403 | NUMERICAL CANDIDATE |
| [ ] SF-038:005 | `flows/82159116-18bf-4988-9acd-0f1bb1f76a0f/005.webp` | product-report-optional-notes-testing | Defined | 1.235 | 2.366 | NUMERICAL CANDIDATE |
| [ ] SF-038:006 | `flows/82159116-18bf-4988-9acd-0f1bb1f76a0f/006.webp` | store-reported-product-concealed-and-confirmed | Defined | 3.987 | 16.690 | REFINE |

## SF-039 — Reviews (shop information) from Shop information

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-039:001 | `flows/2d948785-52f0-49dd-985e-4a016ced6ae2/001.webp` | store-information-shop-all-and-review-preview | Defined | 2.265 | 6.801 | REFINE |
| [ ] SF-039:002 | `flows/2d948785-52f0-49dd-985e-4a016ced6ae2/002.webp` | store-review-list-and-rating-filters | Defined | 4.339 | 12.221 | REFINE |

## SF-040 — Searching products from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-040:001 | `flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/001.webp` | kitsch-default-storefront | Defined | 3.103 | 10.619 | REFINE |
| [ ] SF-040:002 | `flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/002.webp` | store-search-empty | Defined | 1.800 | 7.604 | REFINE |
| [ ] SF-040:003 | `flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/003.webp` | store-search-shampoo-suggestions | Defined | 2.681 | 8.307 | REFINE |
| [ ] SF-040:004 | `flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/004.webp` | store-search-shampoo-results | Defined | 3.661 | 14.564 | REFINE |

## SF-041 — Following a shop from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-041:001 | `flows/356a3c6b-0570-47ae-b0c5-949f06a6a6f6/001.webp` | kitsch-default-storefront | Defined | 3.103 | 10.619 | REFINE |
| [ ] SF-041:002 | `flows/356a3c6b-0570-47ae-b0c5-949f06a6a6f6/002.webp` | kitsch-returning-followed-storefront | Defined | 3.374 | 13.973 | REFINE |

## SF-042 — Marking a shop as not interested from Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-042:001 | `flows/5f25f0ee-f19a-49a8-8f9d-ca2f3259c3c6/001.webp` | kitsch-campaign-feed | Defined | 2.353 | 8.960 | REFINE |
| [ ] SF-042:002 | `flows/5f25f0ee-f19a-49a8-8f9d-ca2f3259c3c6/002.webp` | pura-shop-options | Defined | 1.539 | 4.612 | REFINE |
| [ ] SF-042:003 | `flows/5f25f0ee-f19a-49a8-8f9d-ca2f3259c3c6/003.webp` | pura-not-interested-reasons | Defined | 2.847 | 5.756 | REFINE |
| [ ] SF-042:004 | `flows/5f25f0ee-f19a-49a8-8f9d-ca2f3259c3c6/004.webp` | pura-hidden-with-undo | Defined | 4.602 | 24.208 | REFINE |

## SF-043 — Search

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-043:001 | `flows/52c46d53-6d5f-4c10-964a-f9b0c404203c/001.webp` | home-before-search | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-043:002 | `flows/52c46d53-6d5f-4c10-964a-f9b0c404203c/002.webp` | search-with-kitsch-history | Defined | 1.340 | 4.219 | NUMERICAL CANDIDATE |
| [ ] SF-043:003 | `flows/52c46d53-6d5f-4c10-964a-f9b0c404203c/003.webp` | search-with-returning-answer-history | Defined | 1.962 | 5.700 | REFINE |

## SF-044 — Searching Shop from Search

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-044:001 | `flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/001.webp` | search-entry | Defined | 1.340 | 4.219 | NUMERICAL CANDIDATE |
| [ ] SF-044:002 | `flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/002.webp` | jeans-suggestions-with-keyboard | Defined | 2.258 | 5.986 | REFINE |
| [ ] SF-044:003 | `flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/003.webp` | navigation-loading | Defined | 0.721 | 1.316 | NUMERICAL CANDIDATE |
| [ ] SF-044:004 | `flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/004.webp` | products-loaded-before-answer | Defined | 4.026 | 11.899 | REFINE |
| [ ] SF-044:005 | `flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/005.webp` | jeans-results-with-answer-teaser | Defined | 4.095 | 11.882 | REFINE |
| [ ] SF-044:006 | `flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/006.webp` | related-jeans-searches | Defined | 4.272 | 12.753 | REFINE |

## SF-045 — Chatting with AI Assistant from Searching Shop

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-045:001 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/001.webp` | search-before-photo | Defined | 1.340 | 4.219 | NUMERICAL CANDIDATE |
| [ ] SF-045:002 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/002.webp` | add-photo-chooser | Defined | 2.258 | 5.174 | REFINE |
| [ ] SF-045:003 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/003.webp` | captured-photo-selected-empty-draft | Defined | 3.788 | 10.894 | REFINE |
| [ ] SF-045:004 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/004.webp` | captured-photo-with-question | Defined | 1.241 | 3.827 | NUMERICAL CANDIDATE |
| [ ] SF-045:005 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/005.webp` | captured-photo-answer | Defined | 5.597 | 13.277 | REFINE |
| [ ] SF-045:006 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/006.webp` | photo-answer-steps-expanded | Defined | 5.382 | 13.951 | REFINE |
| [ ] SF-045:007 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/007.webp` | photo-answer-comparison-cards | Defined | 5.835 | 14.814 | REFINE |
| [ ] SF-045:008 | `flows/d6910bbb-655d-44ad-842e-11da062a1e66/008.webp` | photo-answer-preferences-and-feedback | Defined | 4.433 | 11.699 | REFINE |

## SF-046 — Answer detail from Searching Shop

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-046:001 | `flows/8b512345-0d92-4125-b037-4c6f05288cee/001.webp` | jeans-results-before-answer | Defined | 4.095 | 11.882 | REFINE |
| [ ] SF-046:002 | `flows/8b512345-0d92-4125-b037-4c6f05288cee/002.webp` | jeans-answer-sheet-top | Defined | 5.235 | 14.624 | REFINE |
| [ ] SF-046:003 | `flows/8b512345-0d92-4125-b037-4c6f05288cee/003.webp` | jeans-answer-sheet-end | Defined | 3.363 | 9.724 | REFINE |

## SF-047 — Giving feedback from Answer detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-047:001 | `flows/2e218159-702e-4708-b9aa-270dbca77f0b/001.webp` | answer-before-feedback | Defined | 3.363 | 9.724 | REFINE |
| [ ] SF-047:002 | `flows/2e218159-702e-4708-b9aa-270dbca77f0b/002.webp` | answer-feedback-open | Defined | 2.712 | 8.915 | REFINE |
| [ ] SF-047:003 | `flows/2e218159-702e-4708-b9aa-270dbca77f0b/003.webp` | answer-product-feedback-selected | Defined | 2.682 | 8.554 | REFINE |
| [ ] SF-047:004 | `flows/2e218159-702e-4708-b9aa-270dbca77f0b/004.webp` | answer-feedback-note-entered | Defined | 2.844 | 8.858 | REFINE |
| [ ] SF-047:005 | `flows/2e218159-702e-4708-b9aa-270dbca77f0b/005.webp` | answer-feedback-confirmed-locally | Defined | 3.858 | 10.630 | REFINE |

## SF-048 — Filtering results from Searching Shop

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-048:001 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/001.webp` | jeans-results-before-filters | Defined | 4.095 | 11.882 | REFINE |
| [ ] SF-048:002 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/002.webp` | root-search-filter | Defined | 2.275 | 5.385 | REFINE |
| [ ] SF-048:003 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/003.webp` | search-filter-deals-selected | Defined | 2.303 | 5.411 | REFINE |
| [ ] SF-048:004 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/004.webp` | search-filter-sort | Defined | 3.206 | 9.349 | REFINE |
| [ ] SF-048:005 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/005.webp` | search-filter-highest-price | Defined | 3.209 | 7.680 | REFINE |
| [ ] SF-048:006 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/006.webp` | search-filter-sort-returned | Defined | 2.420 | 5.692 | REFINE |
| [ ] SF-048:007 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/007.webp` | search-filter-category | Defined | 2.470 | 7.442 | REFINE |
| [ ] SF-048:008 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/008.webp` | search-filter-women-category | Defined | 2.526 | 5.748 | REFINE |
| [ ] SF-048:009 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/009.webp` | search-filter-pants-selected | Defined | 2.580 | 5.864 | REFINE |
| [ ] SF-048:010 | `flows/0344c453-dece-4e8d-bb54-68f6e551b83f/010.webp` | filtered-deal-jeans-highest-price-results | Defined | 4.196 | 13.103 | REFINE |

## SF-049 — Recently viewed from Search

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-049:001 | `flows/1cb8d743-c728-4317-8c60-1cc3c2761f8c/001.webp` | search-before-recent-history | Defined | 1.340 | 4.219 | NUMERICAL CANDIDATE |
| [ ] SF-049:002 | `flows/1cb8d743-c728-4317-8c60-1cc3c2761f8c/002.webp` | expanded-recent-store-product-history | Defined | 3.775 | 14.511 | REFINE |

## SF-050 — Explore

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-050:001 | `flows/5c39eb04-f5fe-43a0-92da-b79b275051e0/001.webp` | home-before-explore | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-050:002 | `flows/5c39eb04-f5fe-43a0-92da-b79b275051e0/002.webp` | explore-categories | Defined | 2.584 | 7.630 | REFINE |
| [ ] SF-050:003 | `flows/5c39eb04-f5fe-43a0-92da-b79b275051e0/003.webp` | explore-minis-and-home-shelf | Defined | 3.450 | 11.413 | REFINE |
| [ ] SF-050:004 | `flows/5c39eb04-f5fe-43a0-92da-b79b275051e0/004.webp` | explore-menswear-beauty-womenswear | Defined | 3.868 | 12.428 | REFINE |

## SF-051 — Category detail from Explore

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-051:001 | `flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/001.webp` | explore-categories | Defined | 2.584 | 7.630 | REFINE |
| [ ] SF-051:002 | `flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp` | beauty-categories-curls-top-rated | Defined | 3.776 | 11.411 | REFINE |
| [ ] SF-051:003 | `flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/003.webp` | beauty-new-starter-set | Defined | 3.530 | 14.045 | REFINE |
| [ ] SF-051:004 | `flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp` | beauty-scent-and-favorites | Defined | 4.219 | 16.016 | REFINE |
| [ ] SF-051:005 | `flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp` | beauty-favorites-grid | Defined | 3.533 | 17.582 | REFINE |
| [ ] SF-051:006 | `flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/006.webp` | beauty-sweet-deals-and-nails | Defined | 4.001 | 13.539 | REFINE |

## SF-052 — Minis from Explore

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-052:001 | `flows/5fc61632-627a-4875-883e-7cfea2bae666/001.webp` | explore-minis-entry | Defined | 3.450 | 11.413 | REFINE |
| [ ] SF-052:002 | `flows/5fc61632-627a-4875-883e-7cfea2bae666/002.webp` | minis-sol-card | Defined | 3.830 | 13.651 | REFINE |
| [ ] SF-052:003 | `flows/5fc61632-627a-4875-883e-7cfea2bae666/003.webp` | minis-sol-recently-viewed | Defined | 3.257 | 12.374 | REFINE |
| [ ] SF-052:004 | `flows/5fc61632-627a-4875-883e-7cfea2bae666/004.webp` | minis-skincare-card | Defined | 2.987 | 11.660 | REFINE |
| [ ] SF-052:005 | `flows/5fc61632-627a-4875-883e-7cfea2bae666/005.webp` | minis-look-card-and-skin-history | Defined | 3.686 | 14.912 | REFINE |
| [ ] SF-052:006 | `flows/5fc61632-627a-4875-883e-7cfea2bae666/006.webp` | minis-gift-card-and-look-history | Defined | 3.348 | 11.877 | REFINE |

## SF-053 — Setting up a minis from Minis

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-053:001 | `flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/001.webp` | minis-sol-entry | Defined | 3.830 | 13.651 | REFINE |
| [ ] SF-053:002 | `flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/002.webp` | sol-mini-access | Defined | 2.717 | 10.359 | REFINE |
| [ ] SF-053:003 | `flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/003.webp` | sol-welcome | Defined | 4.249 | 30.737 | REFINE |
| [ ] SF-053:004 | `flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/004.webp` | sol-microphone-permission-preview | Defined | 3.218 | 13.776 | REFINE |
| [ ] SF-053:005 | `flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/005.webp` | sol-connecting | Defined | 0.647 | 1.910 | NUMERICAL CANDIDATE |
| [ ] SF-053:006 | `flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/006.webp` | sol-greeting | Defined | 1.913 | 2.288 | REFINE |

## SF-054 — Chatting with Sol from Setting up a minis

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-054:001 | `flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/001.webp` | sol-greeting | Defined | 1.913 | 2.287 | REFINE |
| [ ] SF-054:002 | `flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/002.webp` | sol-sunglasses-response | Defined | 1.438 | 2.371 | NUMERICAL CANDIDATE |
| [ ] SF-054:003 | `flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/003.webp` | sol-glasses-choices | Defined | 3.093 | 7.451 | REFINE |
| [ ] SF-054:004 | `flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/004.webp` | sol-gold-glasses-selected | Defined | 2.889 | 8.548 | REFINE |
| [ ] SF-054:005 | `flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/005.webp` | sol-glasses-recommendations | Defined | 2.873 | 8.300 | REFINE |

## SF-055 — Chatting with Sol (text) from Chatting with Sol

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-055:001 | `flows/763ecd50-4acd-4a7c-8323-ad622a6df77f/001.webp` | sol-greeting | Defined | 1.913 | 2.287 | REFINE |
| [ ] SF-055:002 | `flows/763ecd50-4acd-4a7c-8323-ad622a6df77f/002.webp` | sol-text-empty | Defined | 1.111 | 2.776 | NUMERICAL CANDIDATE |
| [ ] SF-055:003 | `flows/763ecd50-4acd-4a7c-8323-ad622a6df77f/003.webp` | sol-text-cap-draft | Defined | 1.202 | 2.863 | NUMERICAL CANDIDATE |
| [ ] SF-055:004 | `flows/763ecd50-4acd-4a7c-8323-ad622a6df77f/004.webp` | sol-cap-choices | Defined | 1.823 | 5.978 | REFINE |

## SF-056 — Turning off microphone from Chatting with Sol

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-056:001 | `flows/ef624475-7198-4d98-8ec1-ec9dc646a19a/001.webp` | sol-microphone-on-preview | Defined | 1.913 | 2.287 | REFINE |
| [ ] SF-056:002 | `flows/ef624475-7198-4d98-8ec1-ec9dc646a19a/002.webp` | sol-microphone-muted-preview | Defined | 2.201 | 2.763 | REFINE |

## SF-057 — Analyzing skin from Minis

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-057:001 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/001.webp` | minis-skincare-entry | Defined | 2.987 | 11.666 | REFINE |
| [ ] SF-057:002 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/002.webp` | skincare-welcome | Defined | 1.892 | 3.902 | REFINE |
| [ ] SF-057:003 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/003.webp` | skincare-camera-permission-preview | Defined | 3.054 | 7.090 | REFINE |
| [ ] SF-057:004 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/004.webp` | skincare-photo-choice-web-adaptation | Defined | 2.549 | 5.322 | REFINE |
| [ ] SF-057:005 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/005.webp` | skincare-recorded-analysis | Defined | 2.041 | 3.653 | REFINE |
| [ ] SF-057:006 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/006.webp` | skincare-recorded-summary | Defined | 3.621 | 9.802 | REFINE |
| [ ] SF-057:007 | `flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/007.webp` | skincare-cleanser-grid | Defined | 4.106 | 13.883 | REFINE |

## SF-058 — Finding similar clothes from Minis

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-058:001 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/001.webp` | minis-get-look-entry | Defined | 3.686 | 14.912 | REFINE |
| [ ] SF-058:002 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/002.webp` | get-look-terms-notice | Defined | 4.486 | 9.536 | REFINE |
| [ ] SF-058:003 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/003.webp` | get-look-welcome | Defined | 3.927 | 7.497 | REFINE |
| [ ] SF-058:004 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/004.webp` | get-look-photo-choice-web-adaptation | Defined | 4.094 | 10.836 | REFINE |
| [ ] SF-058:005 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/005.webp` | get-look-recorded-scan | Defined | 2.563 | 6.411 | REFINE |
| [ ] SF-058:006 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/006.webp` | get-look-outfit-hotspots | Defined | 2.354 | 10.371 | REFINE |
| [ ] SF-058:007 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/007.webp` | get-look-selected-shirt | Defined | 3.090 | 12.339 | REFINE |
| [ ] SF-058:008 | `flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp` | get-look-all-matching-pieces | Defined | 4.346 | 13.472 | REFINE |

## SF-059 — Chatting with Gift Sense from Minis

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-059:001 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/001.webp` | minis-gift-entry | Defined | 3.348 | 11.878 | REFINE |
| [ ] SF-059:002 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/002.webp` | gift-welcome | Defined | 1.800 | 5.091 | REFINE |
| [ ] SF-059:003 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/003.webp` | gift-recipient-question | Defined | 2.152 | 8.219 | REFINE |
| [ ] SF-059:004 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/004.webp` | gift-personality-question | Defined | 2.912 | 10.945 | REFINE |
| [ ] SF-059:005 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/005.webp` | gift-personality-selected | Defined | 3.002 | 11.136 | REFINE |
| [ ] SF-059:006 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/006.webp` | gift-budget-selected-notes-empty | Defined | 2.913 | 10.932 | REFINE |
| [ ] SF-059:007 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/007.webp` | gift-notes-draft | Defined | 3.594 | 11.894 | REFINE |
| [ ] SF-059:008 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/008.webp` | gift-local-profile-consent | Defined | 2.629 | 7.571 | REFINE |
| [ ] SF-059:009 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/009.webp` | gift-recorded-finding | Defined | 2.743 | 7.705 | REFINE |
| [ ] SF-059:010 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/010.webp` | gift-results-loading-artwork | Defined | 3.934 | 10.929 | REFINE |
| [ ] SF-059:011 | `flows/dc8fb947-e214-4d8c-ad6d-e814406e6ef7/011.webp` | gift-results-loaded | Defined | 3.722 | 11.030 | REFINE |

## SF-060 — Orders

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-060:001 | `flows/8f406a69-ad1c-4de8-a699-12aa504efb74/001.webp` | home-before-orders | Defined | 3.493 | 14.257 | REFINE |
| [ ] SF-060:002 | `flows/8f406a69-ad1c-4de8-a699-12aa504efb74/002.webp` | orders-empty | Defined | 2.418 | 6.053 | REFINE |
| [ ] SF-060:003 | `flows/8f406a69-ad1c-4de8-a699-12aa504efb74/003.webp` | orders-waiting | Defined | 1.262 | 3.246 | NUMERICAL CANDIDATE |
| [ ] SF-060:004 | `flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp` | orders-label-created-with-past-package | Defined | 2.842 | 8.596 | REFINE |
| [ ] SF-060:005 | `flows/8f406a69-ad1c-4de8-a699-12aa504efb74/005.webp` | orders-in-transit-with-past-package | Defined | 2.841 | 8.595 | REFINE |
| [ ] SF-060:006 | `flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp` | orders-delivered-review-invitation | Defined | 2.396 | 7.222 | REFINE |

## SF-061 — Order detail from Orders

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-061:001 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/001.webp` | orders-waiting-before-detail | Defined | 1.262 | 3.246 | NUMERICAL CANDIDATE |
| [ ] SF-061:002 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/002.webp` | order-detail-waiting | Defined | 3.593 | 12.502 | REFINE |
| [ ] SF-061:003 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/003.webp` | order-detail-in-transit | Defined | 3.654 | 12.708 | REFINE |
| [ ] SF-061:004 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/004.webp` | order-detail-delivered | Defined | 3.775 | 14.029 | REFINE |
| [ ] SF-061:005 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/005.webp` | order-tracking-waiting | Defined | 3.780 | 12.210 | REFINE |
| [ ] SF-061:006 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/006.webp` | manual-package-label-created | Defined | 3.516 | 11.793 | REFINE |
| [ ] SF-061:007 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/007.webp` | order-tracking-label-created | Defined | 3.487 | 10.949 | REFINE |
| [ ] SF-061:008 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/008.webp` | order-tracking-map-in-transit | Defined | 3.601 | 13.140 | REFINE |
| [ ] SF-061:009 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/009.webp` | order-tracking-map-delivered | Defined | 3.806 | 13.881 | REFINE |
| [ ] SF-061:010 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/010.webp` | order-label-created-delivery-progress | Defined | 4.807 | 13.059 | REFINE |
| [ ] SF-061:011 | `flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/011.webp` | order-in-transit-delivery-progress | Defined | 3.912 | 10.368 | REFINE |

## SF-062 — Copying order number from Order detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-062:001 | `flows/5dacb846-9f3f-4c7f-9378-d6178924867d/001.webp` | order-detail-before-menu | Defined | 3.598 | 12.558 | REFINE |
| [ ] SF-062:002 | `flows/5dacb846-9f3f-4c7f-9378-d6178924867d/002.webp` | order-actions | Defined | 2.256 | 5.866 | REFINE |
| [ ] SF-062:003 | `flows/5dacb846-9f3f-4c7f-9378-d6178924867d/003.webp` | order-number-copied | Defined | 3.889 | 14.135 | REFINE |

## SF-063 — Marking an order as delivered from Order detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-063:001 | `flows/e6c06e9f-26c9-476e-a3e5-d34c968eaa3d/001.webp` | manual-package-before-mark-delivered | Defined | 3.516 | 11.793 | REFINE |
| [ ] SF-063:002 | `flows/e6c06e9f-26c9-476e-a3e5-d34c968eaa3d/002.webp` | manual-package-marked-delivered | Defined | 4.706 | 15.544 | REFINE |
| [ ] SF-063:003 | `flows/e6c06e9f-26c9-476e-a3e5-d34c968eaa3d/003.webp` | manual-package-delivered-later-history | Defined | 3.856 | 10.332 | REFINE |

## SF-064 — Delivery progress from Order detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-064:001 | `flows/10af411e-3523-4f6a-bb2f-ed4355895f4b/001.webp` | order-delivery-progress-preview | Defined | 3.912 | 10.368 | REFINE |
| [ ] SF-064:002 | `flows/10af411e-3523-4f6a-bb2f-ed4355895f4b/002.webp` | delivered-order-full-activity | Defined | 4.116 | 12.022 | REFINE |
| [ ] SF-064:003 | `flows/10af411e-3523-4f6a-bb2f-ed4355895f4b/003.webp` | full-delivery-activity-earliest-events | Defined | 3.760 | 11.028 | REFINE |

## SF-065 — Updating tracking detail from Order detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-065:001 | `flows/db478544-df8f-4e16-9e16-39a4829975f8/001.webp` | order-delivery-preview-before-edit | Defined | 3.912 | 10.368 | REFINE |
| [ ] SF-065:002 | `flows/db478544-df8f-4e16-9e16-39a4829975f8/002.webp` | tracking-editor-unchanged | Defined | 1.611 | 3.397 | REFINE |
| [ ] SF-065:003 | `flows/db478544-df8f-4e16-9e16-39a4829975f8/003.webp` | tracking-editor-name-changed | Defined | 1.746 | 3.600 | REFINE |
| [ ] SF-065:004 | `flows/db478544-df8f-4e16-9e16-39a4829975f8/004.webp` | tracking-details-saved | Defined | 4.216 | 12.004 | REFINE |

## SF-066 — Archived orders from Orders

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-066:001 | `flows/fd0628d8-b28d-4e15-b677-89c328603be6/001.webp` | orders-before-archive | Defined | 1.262 | 3.246 | NUMERICAL CANDIDATE |
| [ ] SF-066:002 | `flows/fd0628d8-b28d-4e15-b677-89c328603be6/002.webp` | order-archive-empty | Defined | 1.403 | 4.659 | NUMERICAL CANDIDATE |
| [ ] SF-066:003 | `flows/fd0628d8-b28d-4e15-b677-89c328603be6/003.webp` | order-archive-one-order | Defined | 0.772 | 3.104 | NUMERICAL CANDIDATE |

## SF-067 — Reviewing an order from Orders

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-067:001 | `flows/7e196d37-7a35-4e2c-a398-eaae5dcf8f26/001.webp` | orders-before-review | Defined | 2.396 | 7.222 | REFINE |
| [ ] SF-067:002 | `flows/7e196d37-7a35-4e2c-a398-eaae5dcf8f26/002.webp` | order-review-five-stars | Defined | 1.298 | 3.522 | NUMERICAL CANDIDATE |
| [ ] SF-067:003 | `flows/7e196d37-7a35-4e2c-a398-eaae5dcf8f26/003.webp` | order-review-written | Defined | 1.239 | 3.200 | NUMERICAL CANDIDATE |
| [ ] SF-067:004 | `flows/7e196d37-7a35-4e2c-a398-eaae5dcf8f26/004.webp` | order-review-saved-locally | Defined | 1.175 | 2.540 | NUMERICAL CANDIDATE |

## SF-068 — Creating an order from Orders

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-068:001 | `flows/bdd3954f-d943-464a-8c57-6621ffba7fa6/001.webp` | orders-before-manual-add | Defined | 2.396 | 7.222 | REFINE |
| [ ] SF-068:002 | `flows/bdd3954f-d943-464a-8c57-6621ffba7fa6/002.webp` | orders-more-options | Defined | 1.823 | 4.165 | REFINE |
| [ ] SF-068:003 | `flows/bdd3954f-d943-464a-8c57-6621ffba7fa6/003.webp` | manual-order-empty | Defined | 3.195 | 6.970 | REFINE |
| [ ] SF-068:004 | `flows/bdd3954f-d943-464a-8c57-6621ffba7fa6/004.webp` | manual-order-carrier-search | Defined | 2.967 | 7.363 | REFINE |
| [ ] SF-068:005 | `flows/bdd3954f-d943-464a-8c57-6621ffba7fa6/005.webp` | manual-order-carrier-selected | Defined | 3.596 | 7.735 | REFINE |
| [ ] SF-068:006 | `flows/bdd3954f-d943-464a-8c57-6621ffba7fa6/006.webp` | manual-order-added-locally | Defined | 2.196 | 6.968 | REFINE |

## SF-069 — Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-069:001 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/001.webp` | home-kitsch-before-profile | Defined | 2.353 | 8.960 | REFINE |
| [ ] SF-069:002 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/002.webp` | starter-profile | Defined | 3.922 | 12.692 | REFINE |
| [ ] SF-069:003 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/003.webp` | complete-profile-overview | Defined | 3.832 | 13.032 | REFINE |
| [ ] SF-069:004 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/004.webp` | recent-products-before-wallet | Defined | 3.926 | 13.181 | REFINE |
| [ ] SF-069:005 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/005.webp` | recent-minis-and-wallet | Defined | 2.956 | 9.938 | REFINE |
| [ ] SF-069:006 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/006.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-069:007 | `flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/007.webp` | profile-signout-footer | Defined | 2.099 | 7.205 | REFINE |

## SF-070 — Account from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-070:001 | `flows/537d6d87-4f1a-4202-a1aa-82fc3bdb934b/001.webp` | starter-profile | Defined | 3.922 | 12.692 | REFINE |
| [ ] SF-070:002 | `flows/537d6d87-4f1a-4202-a1aa-82fc3bdb934b/002.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |

## SF-071 — Uploading profile picture from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-071:001 | `flows/bb30504f-8cba-413a-9d99-ea413dd27406/001.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |
| [ ] SF-071:002 | `flows/bb30504f-8cba-413a-9d99-ea413dd27406/002.webp` | profile-photo-menu | Defined | 2.148 | 7.063 | REFINE |
| [ ] SF-071:003 | `flows/bb30504f-8cba-413a-9d99-ea413dd27406/003.webp` | profile-photo-selected | Defined | 1.823 | 6.276 | REFINE |

## SF-072 — Public profile from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-072:001 | `flows/15438558-fbdc-457c-ac42-903c2ce730d2/001.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |
| [ ] SF-072:002 | `flows/15438558-fbdc-457c-ac42-903c2ce730d2/002.webp` | public-profile-hidden | Defined | 1.890 | 5.399 | REFINE |
| [ ] SF-072:003 | `flows/15438558-fbdc-457c-ac42-903c2ce730d2/003.webp` | public-profile-collection | Defined | 1.012 | 4.801 | NUMERICAL CANDIDATE |

## SF-073 — Adding a name from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-073:001 | `flows/ac3a3958-4d65-4687-91b5-d9489c7a5996/001.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |
| [ ] SF-073:002 | `flows/ac3a3958-4d65-4687-91b5-d9489c7a5996/002.webp` | account-name-editing | Defined | 1.933 | 6.715 | REFINE |
| [ ] SF-073:003 | `flows/ac3a3958-4d65-4687-91b5-d9489c7a5996/003.webp` | account-name-saved | Defined | 1.905 | 6.629 | REFINE |

## SF-074 — Selecting a gender from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-074:001 | `flows/eed20121-4176-4109-8b3b-3eef33911769/001.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |
| [ ] SF-074:002 | `flows/eed20121-4176-4109-8b3b-3eef33911769/002.webp` | account-gender-menu | Defined | 2.461 | 6.402 | REFINE |
| [ ] SF-074:003 | `flows/eed20121-4176-4109-8b3b-3eef33911769/003.webp` | account-gender-female | Defined | 1.912 | 6.522 | REFINE |

## SF-075 — Adding a birthday from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-075:001 | `flows/037b3248-e197-46f1-be66-b1bf2b560990/001.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |
| [ ] SF-075:002 | `flows/037b3248-e197-46f1-be66-b1bf2b560990/002.webp` | account-birthday-editing | Defined | 1.995 | 6.624 | REFINE |
| [ ] SF-075:003 | `flows/037b3248-e197-46f1-be66-b1bf2b560990/003.webp` | account-birthday-saved | Defined | 1.968 | 6.499 | REFINE |

## SF-076 — Adding a shoe size from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-076:001 | `flows/8b113fe6-f2d5-4756-ba1f-82a5e1fb571b/001.webp` | account-empty | Defined | 1.514 | 6.205 | REFINE |
| [ ] SF-076:002 | `flows/8b113fe6-f2d5-4756-ba1f-82a5e1fb571b/002.webp` | shoe-size-open | Defined | 1.854 | 6.528 | REFINE |
| [ ] SF-076:003 | `flows/8b113fe6-f2d5-4756-ba1f-82a5e1fb571b/003.webp` | shoe-size-selected | Defined | 1.957 | 6.604 | REFINE |

## SF-077 — Adding a skin condition from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-077:001 | `flows/232ee098-779e-4cb4-85c4-2a49de1a8a98/001.webp` | shoe-size-selected | Defined | 1.957 | 6.604 | REFINE |
| [ ] SF-077:002 | `flows/232ee098-779e-4cb4-85c4-2a49de1a8a98/002.webp` | skin-type-open | Defined | 2.100 | 8.051 | REFINE |
| [ ] SF-077:003 | `flows/232ee098-779e-4cb4-85c4-2a49de1a8a98/003.webp` | skin-types-selected | Defined | 2.347 | 8.164 | REFINE |
| [ ] SF-077:004 | `flows/232ee098-779e-4cb4-85c4-2a49de1a8a98/004.webp` | skin-undertone-open | Defined | 1.735 | 7.198 | REFINE |
| [ ] SF-077:005 | `flows/232ee098-779e-4cb4-85c4-2a49de1a8a98/005.webp` | skin-tone-open | Defined | 1.821 | 6.101 | REFINE |
| [ ] SF-077:006 | `flows/232ee098-779e-4cb4-85c4-2a49de1a8a98/006.webp` | skin-preferences-collapsed | Defined | 1.857 | 6.919 | REFINE |

## SF-078 — Adding a person to shop from Account

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-078:001 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/001.webp` | account-before-person | Defined | 1.857 | 6.919 | REFINE |
| [ ] SF-078:002 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/002.webp` | nickname-empty | Defined | 2.997 | 8.234 | REFINE |
| [ ] SF-078:003 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/003.webp` | nickname-sam | Defined | 3.144 | 7.050 | REFINE |
| [ ] SF-078:004 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/004.webp` | nickname-friend | Defined | 3.481 | 7.308 | REFINE |
| [ ] SF-078:005 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/005.webp` | person-birthday-empty | Defined | 2.605 | 5.767 | REFINE |
| [ ] SF-078:006 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/006.webp` | person-birthday-entered | Defined | 2.990 | 5.699 | REFINE |
| [ ] SF-078:007 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/007.webp` | person-profile-saved | Defined | 1.441 | 4.960 | NUMERICAL CANDIDATE |
| [ ] SF-078:008 | `flows/e4568c11-f824-4bfe-9d63-ac0d62665a7d/008.webp` | account-with-person | Defined | 1.996 | 6.166 | REFINE |

## SF-079 — Order history from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-079:001 | `flows/36ccec04-834a-4bdb-85e8-8f828c1070be/001.webp` | profile-before-order-history | Defined | 3.832 | 13.032 | REFINE |
| [ ] SF-079:002 | `flows/36ccec04-834a-4bdb-85e8-8f828c1070be/002.webp` | profile-order-history | Defined | 1.512 | 4.566 | REFINE |

## SF-080 — Adding a card (profile) from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-080:001 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-080:002 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/002.webp` | add-card-empty | Defined | 0.937 | 3.086 | NUMERICAL CANDIDATE |
| [ ] SF-080:003 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/003.webp` | add-card-number-valid | Defined | 1.875 | 4.740 | REFINE |
| [ ] SF-080:004 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/004.webp` | add-card-number-error | Defined | 1.453 | 5.170 | NUMERICAL CANDIDATE |
| [ ] SF-080:005 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/005.webp` | add-card-details-complete | Defined | 1.985 | 5.558 | REFINE |
| [ ] SF-080:006 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/006.webp` | add-card-name-and-billing | Defined | 4.213 | 13.289 | REFINE |
| [ ] SF-080:007 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/007.webp` | add-card-save-visible | Defined | 4.502 | 10.635 | REFINE |
| [ ] SF-080:008 | `flows/0b84e516-1c43-4a00-8832-a659bdb587e7/008.webp` | profile-two-cards | Defined | 3.271 | 10.977 | REFINE |

## SF-081 — Card detail from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-081:001 | `flows/78af4bc8-3317-4c8b-9d7f-1cd3c82061ea/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-081:002 | `flows/78af4bc8-3317-4c8b-9d7f-1cd3c82061ea/002.webp` | card-detail | Defined | 3.053 | 6.554 | REFINE |

## SF-082 — Deleting a card from Card detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-082:001 | `flows/57811b67-ea3f-4231-bdc0-1776716034db/001.webp` | card-detail | Defined | 3.053 | 6.554 | REFINE |
| [ ] SF-082:002 | `flows/57811b67-ea3f-4231-bdc0-1776716034db/002.webp` | delete-card-confirm | Defined | 3.990 | 13.253 | REFINE |
| [ ] SF-082:003 | `flows/57811b67-ea3f-4231-bdc0-1776716034db/003.webp` | profile-payment-methods-after-delete-dialog | Defined | 2.036 | 5.641 | REFINE |

## SF-083 — Addresses from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-083:001 | `flows/47a532d7-bcaa-4cc6-9322-48325718f109/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-083:002 | `flows/47a532d7-bcaa-4cc6-9322-48325718f109/002.webp` | manage-addresses | Defined | 1.678 | 5.387 | REFINE |

## SF-084 — Deleting an address (profile) from Addresses

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-084:001 | `flows/7566d104-783f-4762-894a-e1465dfa554b/001.webp` | manage-addresses | Defined | 1.678 | 5.387 | REFINE |
| [ ] SF-084:002 | `flows/7566d104-783f-4762-894a-e1465dfa554b/002.webp` | shipping-address-sam | Defined | 2.887 | 9.018 | REFINE |
| [ ] SF-084:003 | `flows/7566d104-783f-4762-894a-e1465dfa554b/003.webp` | delete-address-confirm | Defined | 2.792 | 7.816 | REFINE |
| [ ] SF-084:004 | `flows/7566d104-783f-4762-894a-e1465dfa554b/004.webp` | manage-addresses-after-delete | Defined | 1.420 | 4.714 | NUMERICAL CANDIDATE |

## SF-085 — Sign in & security from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-085:001 | `flows/ad155bf8-4b64-415c-be6d-43e32d3be745/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-085:002 | `flows/ad155bf8-4b64-415c-be6d-43e32d3be745/002.webp` | account-and-login | Defined | 1.422 | 3.736 | NUMERICAL CANDIDATE |
| [ ] SF-085:003 | `flows/ad155bf8-4b64-415c-be6d-43e32d3be745/003.webp` | sign-in-security | Defined | 2.634 | 6.949 | REFINE |

## SF-086 — Turning off notifications from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-086:001 | `flows/27ee8718-69b7-460f-a26d-96be39cf6ef2/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-086:002 | `flows/27ee8718-69b7-460f-a26d-96be39cf6ef2/002.webp` | notification-preferences-on | Defined | 3.584 | 10.942 | REFINE |
| [ ] SF-086:003 | `flows/27ee8718-69b7-460f-a26d-96be39cf6ef2/003.webp` | notification-tracking-connections-off | Defined | 3.582 | 10.870 | REFINE |

## SF-087 — Connections from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-087:001 | `flows/18dbe0a9-2fa4-4174-887d-41f5272c2fac/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-087:002 | `flows/18dbe0a9-2fa4-4174-887d-41f5272c2fac/002.webp` | connections | Defined | 1.724 | 4.602 | REFINE |

## SF-088 — Connect to a Gmail account from Connections

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-088:001 | `flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/001.webp` | connections | Defined | 1.724 | 4.602 | REFINE |
| [ ] SF-088:002 | `flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/002.webp` | choose-connection-provider | Defined | 2.031 | 5.283 | REFINE |
| [ ] SF-088:003 | `flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/003.webp` | gmail-connection-introduction | Defined | 1.951 | 4.714 | REFINE |

## SF-089 — Deleting an account from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-089:001 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-089:002 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/002.webp` | privacy-options | Defined | 2.783 | 6.850 | REFINE |
| [ ] SF-089:003 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/003.webp` | delete-account-information | Defined | 3.818 | 8.498 | REFINE |
| [ ] SF-089:004 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/004.webp` | delete-account-confirmation | Defined | 3.041 | 6.586 | REFINE |
| [ ] SF-089:005 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/005.webp` | delete-account-verification | Defined | 1.294 | 3.408 | NUMERICAL CANDIDATE |
| [ ] SF-089:006 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/006.webp` | delete-account-captured-processing | Defined | 1.158 | 3.381 | NUMERICAL CANDIDATE |
| [ ] SF-089:007 | `flows/edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7/007.webp` | delete-account-captured-received | Defined | 1.577 | 2.788 | REFINE |

## SF-090 — Support from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-090:001 | `flows/9e7c0890-7d2d-4e20-83eb-bacf3763d443/001.webp` | profile-payment-methods | Defined | 2.036 | 5.641 | REFINE |
| [ ] SF-090:002 | `flows/9e7c0890-7d2d-4e20-83eb-bacf3763d443/002.webp` | support-options | Defined | 1.428 | 3.654 | NUMERICAL CANDIDATE |

## SF-091 — Chatting with AI assistant (support) from Support

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-091:001 | `flows/26a34b32-f094-4805-bdff-4024bb3caf5f/001.webp` | support-options | Defined | 1.428 | 3.654 | NUMERICAL CANDIDATE |
| [ ] SF-091:002 | `flows/26a34b32-f094-4805-bdff-4024bb3caf5f/002.webp` | support-chat-empty | Defined | 1.249 | 2.891 | NUMERICAL CANDIDATE |
| [ ] SF-091:003 | `flows/26a34b32-f094-4805-bdff-4024bb3caf5f/003.webp` | support-chat-draft | Defined | 1.552 | 3.619 | REFINE |
| [ ] SF-091:004 | `flows/26a34b32-f094-4805-bdff-4024bb3caf5f/004.webp` | support-chat-captured-reply-pending | Defined | 2.906 | 10.328 | REFINE |
| [ ] SF-091:005 | `flows/26a34b32-f094-4805-bdff-4024bb3caf5f/005.webp` | support-chat-captured-answer | Defined | 3.488 | 9.320 | REFINE |

## SF-092 — About from Support

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-092:001 | `flows/ccb0b141-1aac-461e-b8ca-2bfac2886e93/001.webp` | support-options | Defined | 1.428 | 3.654 | NUMERICAL CANDIDATE |
| [ ] SF-092:002 | `flows/ccb0b141-1aac-461e-b8ca-2bfac2886e93/002.webp` | about-shop | Defined | 1.944 | 3.538 | REFINE |

## SF-093 — Logging out from Profile

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-093:001 | `flows/9143aaad-196e-459f-bf7d-6482d8c9f330/001.webp` | profile-sign-out-footer | Defined | 2.044 | 6.578 | REFINE |
| [ ] SF-093:002 | `flows/9143aaad-196e-459f-bf7d-6482d8c9f330/002.webp` | sign-out-confirmation | Defined | 2.154 | 5.207 | REFINE |
| [ ] SF-093:003 | `flows/9143aaad-196e-459f-bf7d-6482d8c9f330/003.webp` | signed-out-splash | Defined | 0.411 | 0.934 | NUMERICAL CANDIDATE |
| [ ] SF-093:004 | `flows/9143aaad-196e-459f-bf7d-6482d8c9f330/004.webp` | signed-out-introduction | Defined | 1.314 | 4.036 | NUMERICAL CANDIDATE |

## SF-094 — Logging in

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-094:001 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/001.webp` | returning-introduction | Defined | 1.314 | 4.036 | NUMERICAL CANDIDATE |
| [ ] SF-094:002 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/002.webp` | track-recent-order | Defined | 1.687 | 5.731 | REFINE |
| [ ] SF-094:003 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/003.webp` | phone-code-empty | Defined | 1.366 | 3.356 | NUMERICAL CANDIDATE |
| [ ] SF-094:004 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/004.webp` | captured-code-pending | Defined | 1.152 | 3.411 | NUMERICAL CANDIDATE |
| [ ] SF-094:005 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/005.webp` | captured-code-complete | Defined | 1.645 | 4.401 | REFINE |
| [ ] SF-094:006 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/006.webp` | captured-passkey-introduction | Defined | 1.392 | 3.334 | NUMERICAL CANDIDATE |
| [ ] SF-094:007 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/007.webp` | captured-sign-in-animation | Defined | 0.890 | 2.235 | NUMERICAL CANDIDATE |
| [ ] SF-094:008 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/008.webp` | returning-tracking-introduction | Defined | 1.525 | 4.111 | REFINE |
| [ ] SF-094:009 | `flows/b5716e20-b094-463c-b74b-a5e983dd1651/009.webp` | returning-home | Defined | 2.845 | 11.154 | REFINE |

## SF-095 — Widgets

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-095:001 | `flows/403ffb92-8c6c-4117-8d75-21555bb8db42/001.webp` | large-medium-small-order-widgets | Defined | 1.653 | 5.331 | REFINE |

## SF-096 — Shop detail from Home

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-096:001 | `flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c/001.webp` | home-kitsch-campaign-before-store-visit | Defined | 2.353 | 8.960 | REFINE |
| [ ] SF-096:002 | `flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c/002.webp` | kitsch-store-from-campaign | Defined | 3.104 | 10.618 | REFINE |
| [ ] SF-096:003 | `flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c/003.webp` | kitsch-expanded-promotions | Defined | 4.061 | 17.740 | REFINE |
| [ ] SF-096:004 | `flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c/004.webp` | kitsch-returning-recommendations-and-collections | Defined | 3.471 | 13.699 | REFINE |
| [ ] SF-096:005 | `flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c/005.webp` | chemical-guys-products-and-video-rail | Defined | 4.553 | 22.742 | REFINE |
| [ ] SF-096:006 | `flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c/006.webp` | kitsch-pinned-all-products | Defined | 3.229 | 15.261 | REFINE |

## SF-097 — Shop information from Shop detail

| Frame | Source | State | Replay | MAE % | Bad pixels % | Status |
| --- | --- | --- | --- | ---: | ---: | --- |
| [ ] SF-097:001 | `flows/069d1098-37bd-4600-85ab-28342cf021ad/001.webp` | kitsch-default-storefront | Defined | 3.108 | 10.621 | REFINE |
| [ ] SF-097:002 | `flows/069d1098-37bd-4600-85ab-28342cf021ad/002.webp` | store-information-brand-and-categories | Defined | 4.353 | 20.367 | REFINE |
| [ ] SF-097:003 | `flows/069d1098-37bd-4600-85ab-28342cf021ad/003.webp` | store-information-shop-all-and-reviews | Defined | 2.265 | 6.801 | REFINE |
| [ ] SF-097:004 | `flows/069d1098-37bd-4600-85ab-28342cf021ad/004.webp` | store-information-reviews-and-policies | Defined | 2.900 | 8.512 | REFINE |
| [ ] SF-097:005 | `flows/069d1098-37bd-4600-85ab-28342cf021ad/005.webp` | store-information-policies-contact-and-report | Defined | 1.904 | 5.610 | REFINE |
