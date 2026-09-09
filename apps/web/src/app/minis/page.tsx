import { readCatalog } from "@/features/catalog/queries.server";
import { Minis } from "@/features/discovery/minis";
export default async function Page() {
  await readCatalog();
  return <Minis />;
}
