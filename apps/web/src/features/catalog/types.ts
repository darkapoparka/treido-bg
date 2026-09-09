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
  /** Order in the captured new-products shelf; not a release date. */
  sourceNewestRank?: number;
  description: string;
  saleUnit: "piece" | "package";
  variants: readonly ProductVariant[];
}>;
export type Store = Readonly<{
  id: string;
  name: string;
  logo: string;
  rating?: number;
  ratingCount: string;
  description: string;
  categories: readonly string[];
}>;
export type Catalog = Readonly<{
  products: readonly Product[];
  stores: readonly Store[];
}>;
export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
  }).format(money.amount / 100);
}
