"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { formatMoney, type Catalog } from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  ProductCard,
  SaveButton,
  Sheet,
  commitSheetQuery,
} from "./components";
import { Icon } from "./icons";
import { useDiscovery } from "./state";
import { Filters, type SearchFilters } from "./filters";
export function Search({
  catalog,
  query: initialQuery = "",
  filters: initialFilters,
}: {
  catalog: Catalog;
  query?: string;
  filters: SearchFilters;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("q") ?? initialQuery;
  const filters: SearchFilters = {
    ...initialFilters,
    deals: params.get("deals") === "1" || params.get("deals") === "true",
    following: params.get("following") === "true",
    sort: params.get("sort") ?? "Relevance",
    country: params.get("country") ?? "",
    origin: params.get("origin") ?? "",
    category: params.get("category") ?? "",
    color: params.get("color") ?? "",
    size: params.get("size") ?? "",
    gender: params.get("gender") ?? "",
    price: params.get("price") ?? "",
    ratings: params.get("ratings") ?? "",
  };

  const state = useDiscovery();
  const [draft, setDraft] = useState(query);
  const [draftQuery, setDraftQuery] = useState(query);
  if (draftQuery !== query) {
    setDraftQuery(query);
    setDraft(query);
  }
  const [filter, setFilter] = useState(false);
  const [focused, setFocused] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [photo, setPhoto] = useState("");
  const suggestions = focused && !!draft.trim();
  const recent = state.viewedProducts.flatMap((id) => {
    const p = catalog.products.find((p) => p.id === id);
    return p ? [p] : [];
  });
  const history = params.get("view") === "recent";

  function update(next: SearchFilters) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    for (const [key, value] of Object.entries(next)) {
      if (value && value !== "Relevance") params.set(key, String(value));
    }
    commitSheetQuery(params);
  }
  const results = catalog.products
    .filter((p) => {
      const store = catalog.stores.find((s) => s.id === p.storeId);
      return (
        (!query ||
          `${p.title} ${p.category} ${store?.name}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (!filters.deals || p.promotion) &&
        (!filters.following || state.followed.includes(p.storeId)) &&
        (!filters.category || p.category === filters.category) &&
        (!filters.color || p.color === filters.color) &&
        (!filters.size ||
          p.variants.some(
            (v) => v.label === filters.size && v.availableQuantity > 0,
          )) &&
        (!filters.gender || p.gender === filters.gender) &&
        (!filters.country ||
          p.shippingDestinations?.includes(filters.country)) &&
        (!filters.origin || p.country === filters.origin) &&
        (!filters.ratings ||
          (p.rating ?? 0) >= (filters.ratings.startsWith("4.5") ? 4.5 : 4)) &&
        (!filters.price ||
          (filters.price === "$100 and up"
            ? p.price.amount >= 10000
            : p.price.amount < Number(filters.price.replace(/\D/g, "")) * 100))
      );
    })
    .sort((a, b) =>
      filters.sort === "Lowest → Highest Price"
        ? a.price.amount - b.price.amount
        : filters.sort === "Highest → Lowest Price"
          ? b.price.amount - a.price.amount
          : filters.sort === "Newest"
            ? (b.referenceNewnessRank ?? 0) - (a.referenceNewnessRank ?? 0)
            : 0,
    );
  const searchForm = (
    <form
      className={`search-form ${query && !suggestions ? "top-search" : "search-composer"}`}
      onSubmit={(e) => {
        e.preventDefault();
        setFocused(false);
        router.push(
          photo
            ? "/assistant?example=photo"
            : `/search?q=${encodeURIComponent(draft.trim())}`,
        );
      }}
    >
      {query ? (
        <Icon name="search" />
      ) : (
        <IconButton
          icon="plus"
          label="Add photos"
          onClick={() => setPhotos(true)}
        />
      )}
      {photo && (
        <img
          className="search-photo-preview"
          src={photo}
          alt="Selected photo"
        />
      )}
      <input
        aria-label="Search products"
        placeholder="Search or ask anything"
        value={draft}
        onFocus={() => setFocused(true)}
        onChange={(e) => setDraft(e.target.value)}
      />
      {draft && !suggestions && (
        <IconButton
          icon="close"
          label="Clear search"
          onClick={() => {
            setDraft("");
            router.push("/search");
          }}
        />
      )}
      <button className="icon-button" aria-label="Submit search" type="submit">
        <Icon name="arrow" />
      </button>
    </form>
  );
  return (
    <main
      className={`shop-page search-page ${suggestions ? "search-has-suggestions" : ""} ${history ? "search-history" : ""}`}
    >
      {searchForm}
      {suggestions ? (
        <section className="search-suggestions-surface">
          <header>
            <h2>Suggestions</h2>
            <IconButton
              icon="close"
              label="Close suggestions"
              onClick={() => setFocused(false)}
            />
          </header>
          {/jean/i.test(draft) && (
            <>
              {[
                ["jeans-warehouse", "Jeans Warehouse", "4.7", ""],
                ["city-jeans", "City Jeans", "4.8", "Save $10"],
              ].map(([id, name, rating, deal]) => (
                <Link
                  key={id}
                  className="suggestion-store"
                  href={`/stores/${id}`}
                >
                  <img
                    className="suggestion-logo"
                    src={`/api/reference-media/suggestion-${id}`}
                    alt=""
                  />
                  <strong>{name}</strong>
                  <span className="suggestion-rating">{rating} ★</span>
                  {deal && <span className="deal-badge">{deal}</span>}
                </Link>
              ))}
            </>
          )}
          {(/jean/i.test(draft)
            ? [
                "jeans",
                "jeans men",
                "jeans baggy",
                "jeans for men",
                "jeans women",
              ]
            : [draft.trim()]
          ).map((q) => (
            <Link
              className="suggestion-query"
              key={q}
              href={`/search?q=${encodeURIComponent(q)}`}
              onClick={() => setFocused(false)}
            >
              <span>
                <Icon name="search" />
              </span>
              {q}
            </Link>
          ))}
        </section>
      ) : history ? (
        <>
          <h1>Recently viewed</h1>
          <div className="product-grid recent-history-grid">
            {state.viewedItems.map((item) => {
              const product =
                item.kind === "product"
                  ? catalog.products.find((p) => p.id === item.id)
                  : undefined;
              const store =
                item.kind === "store"
                  ? catalog.stores.find((s) => s.id === item.id)
                  : undefined;
              return (
                <div className="recent-history-item" key={item.kind + item.id}>
                  {product ? (
                    <ProductCard product={product} mediaOnly showPromotion />
                  ) : store ? (
                    <Link
                      className="recent-history-store"
                      href={`/stores/${store.id}`}
                    >
                      <strong>{store.name}</strong>
                      {store.logo && <img src={store.logo} alt="" />}
                    </Link>
                  ) : null}
                  <IconButton
                    icon="close"
                    label={`Remove ${product?.title ?? store?.name} from recently viewed`}
                    onClick={() => state.removeViewed(item.kind, item.id)}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : query || filters.deals ? (
        <>
          {query.toLowerCase().includes("jeans") && (
            <Link className="assistant-result-link" href="/assistant">
              Jeans <span>View answer ›</span>
            </Link>
          )}
          <div className="filter-chips">
            <IconButton
              icon="filter"
              label="Filter"
              onClick={() => setFilter(true)}
            />
            <button
              className="pill"
              aria-pressed={!!filters.origin}
              onClick={() =>
                update({
                  ...filters,
                  origin: filters.origin ? "" : "United States",
                })
              }
            >
              Sells from US
            </button>
            <button
              className="pill"
              aria-pressed={filters.deals}
              onClick={() => update({ ...filters, deals: !filters.deals })}
            >
              Your deals
            </button>
            <button
              className="pill"
              aria-pressed={filters.following}
              onClick={() =>
                update({ ...filters, following: !filters.following })
              }
            >
              Following
            </button>
          </div>
          <div className="search-stores">
            <Link href="/stores/fitjeans" className="search-store">
              <img src="/api/reference-media/fitjeans" alt="Jeans" />
              <strong>FITJEANS</strong>
              <span>4.6 ★ (3.4K)</span>
            </Link>
            <Link href="/stores/miss-me" className="search-store plain">
              <span className="store-monogram">MM</span>
              <strong>Miss Me</strong>
              <span>4.7 ★ (11.9K)</span>
            </Link>
          </div>
          <div className="search-results">
            {results.map((p) => (
              <article className="result-row" key={p.id}>
                <div className="product-media">
                  <Link href={`/products/${p.id}`}>
                    <img src={p.images[0]} alt={p.title} />
                  </Link>
                  <SaveButton product={p} />
                </div>
                <div>
                  <Link href={`/products/${p.id}`}>
                    <strong>{p.title}</strong>
                  </Link>
                  <p className="rating">
                    <span>★★★★★</span> ({p.ratingCount})
                  </p>
                  <p>
                    {formatMoney(p.price)}{" "}
                    {p.compareAt && <del>{formatMoney(p.compareAt)}</del>}
                  </p>
                  <Link className="result-store" href={`/stores/${p.storeId}`}>
                    {catalog.stores.find((s) => s.id === p.storeId)?.name}
                  </Link>
                </div>
              </article>
            ))}
            {!results.length && (
              <div className="empty-state">
                <h2>No results found</h2>
                <p>Try another search or clear your filters.</p>
                <button
                  className="pill"
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                  }
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Search</h1>
          <Link className="search-section-heading" href="/search?view=recent">
            <h2>
              Recently viewed <Icon name="back" />
            </h2>
          </Link>
          <div className="product-rail">
            {recent.map((p) => (
              <ProductCard product={p} compact key={p.id} />
            ))}
          </div>
          <section className="keep-shopping">
            <h2>Keep shopping ›</h2>
            <Link href="/assistant">
              <div>
                <img src="/api/reference-media/assistant-white" alt="" />
                <img src="/api/reference-media/assistant-black" alt="" />
              </div>
              <span>
                Finding the right pair of jeans<small>Jul 24</small>
              </span>
            </Link>
          </section>
        </>
      )}
      <Sheet open={photos} title="Add photos" onClose={() => setPhotos(false)}>
        <label className="account-row">
          Choose from library
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhoto(URL.createObjectURL(file));
                setDraft("Find me a baseball cap like this");
                setPhotos(false);
              }
            }}
          />
        </label>
        <label className="account-row">
          Take a photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhoto(URL.createObjectURL(file));
                setDraft("Find me a baseball cap like this");
                setPhotos(false);
              }
            }}
          />
        </label>
        <button
          className="account-row"
          onClick={() => {
            setPhoto("/api/reference-media/assistant-cap");
            setDraft("Find me a baseball cap like this");
            setPhotos(false);
          }}
        >
          Use captured cap example
        </button>
        <p className="form-note">
          Photos stay on this device. The captured answer can be viewed without
          sending a photo.
        </p>
      </Sheet>
      {!suggestions && <FloatingNav back={!!query || history} />}
      <Filters
        open={filter}
        onClose={() => setFilter(false)}
        value={filters}
        onChange={update}
      />
    </main>
  );
}
