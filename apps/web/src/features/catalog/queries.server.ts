import "server-only";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import type { Catalog } from "./types";
export function referencePreviewEnabled() {
  return (
    process.env.SHOP_REFERENCE_PREVIEW === "1" &&
    process.env.VERCEL_ENV !== "production"
  );
}
export async function readCatalog(): Promise<Catalog> {
  await connection();
  // No automatic mock fallback: until Task 4, the isolated preview is opt-in.
  if (!referencePreviewEnabled()) notFound();
  const { referenceCatalog } = await import("./reference/catalog");
  return referenceCatalog;
}
