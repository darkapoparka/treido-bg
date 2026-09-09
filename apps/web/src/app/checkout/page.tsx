import { readCatalog } from "@/features/catalog/queries.server";
import { Checkout } from "@/features/commerce/checkout";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ store?: string }>;
}) {
  const catalog = await readCatalog();
  const { store } = await searchParams;
  return <Checkout catalog={catalog} storeId={store} />;
}
