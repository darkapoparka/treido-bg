import { readCatalog } from "@/features/catalog/queries.server";
import { PickupCheckout } from "@/features/commerce/pickup";
import { Checkout } from "@/features/commerce/checkout";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ store?: string; stage?: string }>;
}) {
  const catalog = await readCatalog();
  const { store, stage } = await searchParams;
  if (store === "white-rock") return <PickupCheckout />;
  if (
    stage === "phone" ||
    stage === "address-search" ||
    stage === "address" ||
    stage === "payment-setup"
  )
    return <Checkout catalog={catalog} storeId={store} initialStage={stage} />;
  return <Checkout catalog={catalog} storeId={store} />;
}
