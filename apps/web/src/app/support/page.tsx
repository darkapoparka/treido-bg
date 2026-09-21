import { readCatalog } from "@/features/catalog/queries.server";
import { SupportPage } from "@/features/account/support";
export default async function Page() {
  await readCatalog();
  return <SupportPage />;
}
