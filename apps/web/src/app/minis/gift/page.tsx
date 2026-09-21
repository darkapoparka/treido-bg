import { readCatalog } from "@/features/catalog/queries.server";
import { GiftSense } from "@/features/discovery/minis";
export default async function Page() {
  const catalog = await readCatalog();
  return <GiftSense catalog={catalog} />;
}
