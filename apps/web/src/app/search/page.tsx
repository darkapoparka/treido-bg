import { readCatalog } from "@/features/catalog/queries.server";
import { Search } from "@/features/discovery/search";
import { type SearchFilters } from "@/features/discovery/filters";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const p = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  const filters: SearchFilters = {
    deals: p.deals === "true" || p.deals === "1",
    following: p.following === "true",
    sort: p.sort ?? "Relevance",
    category: p.category ?? "",
    color: p.color ?? "",
    size: p.size ?? "",
    gender: p.gender ?? "",
    price: p.price ?? "",
    ratings: p.ratings ?? "",
    country: p.country ?? "",
    origin: p.origin ?? "",
  };
  return (
    <Search
      key={p.q ?? ""}
      catalog={await readCatalog()}
      query={p.q}
      filters={filters}
    />
  );
}
