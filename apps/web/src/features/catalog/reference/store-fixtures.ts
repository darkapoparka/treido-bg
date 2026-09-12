import type { Product, Store } from "../types";

// Flow 14/001 and 96/004 expose the left edge, title and $12 of this
// recommendation. The rest of its photograph and its rating count are unknown.
// The allowlisted image preserves only the visible product packaging, not UI.
export const storeProducts: readonly Product[] = [
  {
    id: "sugar-scrub",
    title: "Exfoliating Sugar Body Scrub Bar",
    storeId: "kitsch",
    category: "Cleanse",
    images: ["/api/reference-media/store-sugar-partial"],
    price: { amount: 1200, currency: "USD" },
    ratingCount: "",
    description:
      "The storefront capture shows only the left portion of this product photograph. A complete photograph and further product details were not recorded.",
    saleUnit: "package",
    variants: [
      { id: "sugar-scrub-default", label: "One size", availableQuantity: 12 },
    ],
  },
];

export function storefrontProjection(
  stores: readonly Store[],
  scenario: string | undefined,
): readonly Store[] {
  // The returning source also changes its cart and hero photograph. Do not
  // fabricate those as side effects of pressing Follow: replay this explicitly
  // as the existing following-pair session. The hero mismatch remains open.
  if (scenario !== "following-pair") return stores;
  return stores.map((store) =>
    store.id === "kitsch"
      ? {
          ...store,
          promotionSavings: 15,
          recommendations: [
            { productId: "shea-butter", ratingCount: "3.3K" },
            { productId: "terracotta", ratingCount: "2.1K" },
            { productId: "sugar-scrub" },
          ],
        }
      : store,
  );
}
