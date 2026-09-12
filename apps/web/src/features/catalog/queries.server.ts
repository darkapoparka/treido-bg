import "server-only";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { cookies } from "next/headers";
import {
  referenceScenarioCookie,
  resolveReferenceScenario,
} from "./reference/scenarios";
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
  const [
    { referenceCatalog },
    { followingProducts },
    { savedProducts, savedStores, savedListings },
    { storeProducts, storefrontProjection },
  ] = await Promise.all([
    import("./reference/catalog"),
    import("./reference/following-fixtures"),
    import("./reference/saved-fixtures"),
    import("./reference/store-fixtures"),
  ]);
  const scenarioName = (await cookies()).get(referenceScenarioCookie)?.value;
  const scenario = resolveReferenceScenario(scenarioName);
  const catalog: Catalog = {
    ...referenceCatalog,
    products: [
      ...referenceCatalog.products,
      ...followingProducts,
      ...savedProducts,
      ...storeProducts,
    ],
    stores: storefrontProjection(
      [...referenceCatalog.stores, ...savedStores],
      scenario ? scenarioName : undefined,
    ),
    savedListings,
  };
  const unavailable = new Set(scenario?.catalog?.unavailableVariants ?? []);
  if (!unavailable.size) return catalog;
  return {
    ...catalog,
    products: catalog.products.map((product) => ({
      ...product,
      variants: product.variants.map((variant) =>
        unavailable.has(variant.id)
          ? { ...variant, availableQuantity: 0 }
          : variant,
      ),
    })),
  };
}
