import { readCatalog } from "@/features/catalog/queries.server";
import { Explore } from "@/features/discovery/explore";
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const catalog = await readCatalog();
  return <Explore catalog={catalog} category={(await params).category} />;
}
