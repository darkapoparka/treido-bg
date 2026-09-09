import { readCatalog } from "@/features/catalog/queries.server";
import { PickupCheckout } from "@/features/commerce/pickup";
import { Checkout } from "@/features/commerce/checkout";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ store?: string }>;
}) {
  const catalog = await readCatalog();
  const { store } = await searchParams;
  if (store === "white-rock") return <PickupCheckout />;
  return <Checkout catalog={catalog} storeId={store} />;
}
