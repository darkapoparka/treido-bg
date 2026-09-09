import { readCatalog } from "@/features/catalog/queries.server";
import { Home } from "@/features/discovery/home";
export default async function Page() {
  return <Home catalog={await readCatalog()} />;
}
