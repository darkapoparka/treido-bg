export type Money = Readonly<{ amount: number; currency: "USD" | "EUR" }>;
export type ProductVariant = Readonly<{
  id: string;
  label: string;
  availableQuantity: number;
}>;
export type Product = Readonly<{
  id: string;
  title: string;
  storeId: string;
  category: string;
  color?: string;
  gender?: string;
  country?: string;
  shippingDestinations?: readonly string[];
  referenceNewnessRank?: number;
  images: readonly string[];
  price: Money;
  compareAt?: Money;
  rating?: number;
  ratingCount: string;
  promotion?: string;
  detail?: Readonly<{
    lowStock?: boolean;
    arrivalLabel?: string;
    promotionTerms?: string;
    markdownLabel?: string;
    completeDescription?: boolean;
  }>;
  /** Order in the captured new-products shelf; not a release date. */
  sourceNewestRank?: number;
  description: string;
  saleUnit: "piece" | "package";
  variants: readonly ProductVariant[];
}>;
/** A saved-list projection can retain a captured item whose commerce facts are
 * incomplete. An absent price is unknown, never a free or purchasable product. */
export type SavedListing = Readonly<{
  id: string;
  title: string;
  storeId: string;
  images: readonly string[];
  price?: Money;
  promotion?: string;
  variantLabel?: string;
  detailUnavailable?: string;
  photoLayout?: "milk" | "pink-partial" | "eye";
}>;
export type Store = Readonly<{
  id: string;
  name: string;
  logo: string;
  coverImage?: string;
  rating?: number;
  ratingCount: string;
  description: string;
  categories: readonly string[];
  /** A storefront shelf is a projection; its snapshot ratings need not replace
   * the product-detail snapshot, and following must not rewrite the cart. */
  recommendations?: readonly Readonly<{
    productId: string;
    ratingCount?: string;
  }>[];
  promotionSavings?: number;
}>;
export type Catalog = Readonly<{
  products: readonly Product[];
  stores: readonly Store[];
  savedListings?: readonly SavedListing[];
}>;
export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
  }).format(money.amount / 100);
}
