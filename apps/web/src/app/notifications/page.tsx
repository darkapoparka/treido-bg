import { readCatalog } from "@/features/catalog/queries.server";
import { NotificationsPage } from "@/features/account/support";
export default async function Page() {
  await readCatalog();
  return <NotificationsPage />;
}
