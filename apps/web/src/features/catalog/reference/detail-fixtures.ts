import type { Product } from "../types";

// Flow 17 / 005 is a separate product snapshot between two KITSCH captures.
// It supplies neither a seller nor a photograph. Keep both absent rather than
// borrowing the Shea image, merchant, delivery policies or description.
export const detailProducts: readonly Product[] = [
  {
    id: "midi-shirtdress",
    title: "Midi Shirtdress in Ultrasoft Cotton | Estate Blue/Open Air/White",
    storeId: "",
    category: "Womenswear",
    color: "Estate Blue/Open Air/White",
    images: [],
    price: { amount: 11800, currency: "USD" },
    compareAt: { amount: 16800, currency: "USD" },
    rating: 4.5,
    ratingCount: "2",
    promotion: "20% off this item in cart",
    detail: {
      lowStock: true,
      arrivalLabel: "Arrives as soon as Wed, Jul 29",
      promotionTerms: "Applied at checkout. Ends Aug 4",
      markdownLabel: "30% off",
      completeDescription: true,
    },
    description:
      "This midi-length style features classic details like a button front, cuffed sleeves, and a box pleat at the back. Easy to dress up for work or wear casually on the weekend.",
    saleUnit: "piece",
    // Only availability, not inventory counts, is captured. Three is the local
    // preview control limit for available sizes, not an asserted stock count.
    variants: [
      { id: "midi-xxs", label: "XXS", availableQuantity: 3 },
      { id: "midi-xs", label: "XS", availableQuantity: 3 },
      { id: "midi-s", label: "S", availableQuantity: 3 },
      { id: "midi-m", label: "M", availableQuantity: 0 },
      { id: "midi-l", label: "L", availableQuantity: 0 },
      { id: "midi-xl", label: "XL", availableQuantity: 0 },
      { id: "midi-xxl", label: "XXL", availableQuantity: 0 },
    ],
  },
];

// Flow 19/002-003 is a later catalog snapshot, with no captured explanation for
// its changed promotion and delivery label. These presentation fields do not
// grant a discount or change the product price, stock or checkout calculation.
export function productDetailProjection(
  products: readonly Product[],
  scenario: string | undefined,
): readonly Product[] {
  if (scenario !== "kitsch-product-saving-offer") return products;
  return products.map((product) =>
    product.id === "shea-butter"
      ? {
          ...product,
          promotion: "20% off your order",
          detail: {
            ...product.detail,
            arrivalLabel: "Arrives as soon as Sun, Aug 2",
            promotionTerms: "Applied at checkout",
          },
        }
      : product,
  );
}
