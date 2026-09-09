"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
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
import {
  emptyFilters,
  hasSearchFilters,
  readSearchFilters,
  searchParameters,
  searchProducts,
  searchStores,
} from "./search-model";

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
    ...readSearchFilters(params),
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const state = useDiscovery();
  const [draft, setDraft] = useState(query);
  const [draftQuery, setDraftQuery] = useState(query);
  const [filter, setFilter] = useState(false);
  const [focused, setFocused] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");
  if (draftQuery !== query) {
    setDraftQuery(query);
    setDraft(query);
    setFocused(false);
  }
  useEffect(() => {
    return () => {
      if (photo.startsWith("blob:")) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  const suggestions = focused && !!draft.trim();
  const recent = state.viewedProducts.flatMap((id) => {
    const p = catalog.products.find((p) => p.id === id);
    return p ? [p] : [];
  });
  const history = params.get("view") === "recent";
  const filtered = hasSearchFilters(filters);
  const results = searchProducts(catalog, query, filters, state.followed);
  const stores = searchStores(catalog, query, filters, results).slice(0, 2);

  function update(next: SearchFilters) {
    commitSheetQuery(searchParameters(query, next));
  }
  function closeSuggestions() {
    setFocused(false);
    inputRef.current?.blur();
  }
  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file.");
      return;
    }
    setPhotoError("");
    setPhoto(URL.createObjectURL(file));
    setDraft("Find me a baseball cap like this");
    setPhotos(false);
  }
  const searchForm = (
    <form
      className={`search-form ${query && !suggestions ? "top-search" : "search-composer"}`}
      onSubmit={(e) => {
        e.preventDefault();
        closeSuggestions();
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
          onClick={() => {
            setPhotoError("");
            setPhotos(true);
          }}
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
        ref={inputRef}
        aria-label="Search products"
        placeholder="Search or ask anything"
        autoComplete="off"
        enterKeyHint="search"
        value={draft}
        onFocus={() => setFocused(true)}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            closeSuggestions();
          }
        }}
      />
      {draft && !suggestions && (
        <IconButton
          icon="close"
          label="Clear search"
          onClick={() => {
            setDraft("");
            setPhoto("");
            closeSuggestions();
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
              onClick={closeSuggestions}
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
              onClick={() => {
                setPhoto("");
                closeSuggestions();
              }}
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
      ) : query.trim() || filtered ? (
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
          {stores.length > 0 && (
            <div className="search-stores">
              {stores.map((store) => {
                const image =
                  store.id === "fitjeans"
                    ? "/api/reference-media/fitjeans"
                    : store.logo;
                return (
                  <Link
                    key={store.id}
                    href={`/stores/${store.id}`}
                    className={`search-store ${image ? "" : "plain"}`}
                  >
                    {image ? (
                      <img src={image} alt="" />
                    ) : (
                      <span className="store-monogram">
                        {store.id === "miss-me"
                          ? "MM"
                          : store.name
                              .split(/\s+/)
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")}
                      </span>
                    )}
                    <strong>{store.name}</strong>
                    {store.rating !== undefined && (
                      <span>
                        {store.rating} ★
                        {store.ratingCount ? ` (${store.ratingCount})` : ""}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
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
                  {p.ratingCount && (
                    <p className="rating">
                      <span>★★★★★</span> ({p.ratingCount})
                    </p>
                  )}
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
              <div className="empty-state" role="status">
                <h2>No results found</h2>
                <p>Try another search or clear your filters.</p>
                <button
                  className="pill"
                  onClick={() => update({ ...emptyFilters })}
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
          <input type="file" accept="image/*" onChange={selectPhoto} />
        </label>
        <label className="account-row">
          Take a photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={selectPhoto}
          />
        </label>
        <button
          className="account-row"
          onClick={() => {
            setPhotoError("");
            setPhoto("/api/reference-media/assistant-cap");
            setDraft("Find me a baseball cap like this");
            setPhotos(false);
          }}
        >
          Use captured cap example
        </button>
        {photoError && <p role="alert">{photoError}</p>}
        <p className="form-note">
          Photos stay on this device. The captured answer can be viewed without
          sending a photo.
        </p>
      </Sheet>
      {!suggestions && <FloatingNav back={!!query || history || filtered} />}
      <Filters
        open={filter}
        onClose={() => setFilter(false)}
        value={filters}
        onChange={update}
      />
    </main>
  );
}
