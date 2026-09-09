import {
  readCatalog,
  referencePreviewEnabled,
} from "@/features/catalog/queries.server";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Home } from "@/features/discovery/home";
import { HomeLoading } from "@/features/discovery/home-loading";
import { Suspense } from "react";
async function HomeContent() {
  return <Home catalog={await readCatalog()} />;
}
export default async function Page() {
  await connection();
  // Preserve the non-preview 404 before the loading boundary can stream.
  if (!referencePreviewEnabled()) notFound();
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
