import { readCatalog } from "@/features/catalog/queries.server";
import { Sol } from "@/features/discovery/minis";
export default async function Page() {
  await readCatalog();
  return <Sol />;
}
