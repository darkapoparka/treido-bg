"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatMoney } from "../catalog/types";
import type { Catalog, Store, Product } from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  ProductCard,
  Sheet,
  commitSheetQuery,
} from "./components";
import { StoreFilter, openStoreFilter } from "./store-filter";
import { Icon } from "./icons";
import { Cart } from "./product";
import { useDiscovery } from "./state";
import {
  readStoreFilters,
  selectStoreProducts,
  matchStoreProducts,
  normalizeStoreQuery,
  hasStoreFilters,
} from "./store-model";
const collectionMedia = [
  { slug: "whats-new", name: "What's New", media: "collection-new" },
  { slug: "best-sellers", name: "Best Sellers", media: "collection-best" },
  {
    slug: "coastal-cottage",
    name: "Coastal Cottage",
    media: "collection-coastal",
  },
];
function StoreActions({
  store,
  close = false,
}: {
  store: Store;
  close?: boolean;
}) {
  const state = useDiscovery();
  const [notice, setNotice] = useState("");
  return (
    <>
      <div className="store-actions">
        <Link
          className="icon-button"
          href={`/stores/${store.id}${close ? "" : "/info"}`}
          aria-label={close ? "Close store information" : "Store information"}
        >
          <Icon name={close ? "close" : "menu"} />
        </Link>
        {!close && (
          <Link
            className="icon-button"
            href={`/stores/${store.id}/search`}
            aria-label="Search store"
          >
            <Icon name="search" />
          </Link>
        )}
        <button
          className="pill follow"
          aria-pressed={state.followed.includes(store.id)}
          onClick={() => state.toggleFollow(store.id)}
        >
          {state.followed.includes(store.id) ? "Following" : "Follow"}
        </button>
        <IconButton
          icon="share"
          label="Share store"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                new URL(`/stores/${store.id}`, window.location.origin).href,
              );
              setNotice("Local preview link copied");
            } catch {
              setNotice("Clipboard unavailable");
            }
          }}
        />
      </div>
      {notice && (
        <button className="local-toast" onClick={() => setNotice("")}>
          {notice}
        </button>
      )}
    </>
  );
}
function StoreNavigation({ store }: { store: Store }) {
  const anchor = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [offers, setOffers] = useState(false);
  useEffect(() => {
    const element = anchor.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setPinned(entry.boundingClientRect.top < 0);
      },
      { threshold: 1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="store-category-anchor" ref={anchor}>
      <div className={`store-category-navigation ${pinned ? "is-pinned" : ""}`}>
        {pinned && (
          <button
            className="store-compact-promotion"
            onClick={() => setOffers(true)}
          >
            20% off your order <span>spring20orde…</span>
            <span aria-hidden="true">⌄</span>
          </button>
        )}
        <div className="category-rail">
          {pinned && (
            <div className="store-compact-actions">
              <Link
                href={`/stores/${store.id}/info`}
                className="store-compact-menu"
                aria-label="Store information"
              >
                <img src={store.logo} alt="" />
                <Icon name="menu" />
              </Link>
              <Link
                href={`/stores/${store.id}/search`}
                className="icon-button"
                aria-label="Search store"
              >
                <Icon name="search" />
              </Link>
            </div>
          )}
          {store.categories.map((category) => (
            <Link
              className="pill"
              key={category}
              href={
                category === "Shop all"
                  ? `/stores/${store.id}#all-products`
                  : `/stores/${store.id}/collections/${category === "What's New" ? "whats-new" : category.toLowerCase().replaceAll(" ", "-")}`
              }
            >
              <img
                src={`/api/reference-media/${category === "Shop all" ? "home-air-dry-cream" : category === "Cleanse" ? "category-cleanse" : "category-heatless"}`}
                alt=""
              />
              {category}
            </Link>
          ))}
        </div>
      </div>
      <Sheet
        open={offers}
        title="Offer details"
        onClose={() => setOffers(false)}
      >
        <p className="sheet-copy">
          20% off your order — the label shown in the captured storefront.
        </p>
        <p className="form-note">
          The captured coupon label is truncated. This preview cannot validate a
          coupon or apply a live discount.
        </p>
      </Sheet>
    </div>
  );
}

function StorePromotion({ savings = 20 }: { savings?: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`promotion-owner ${expanded ? "expanded" : ""}`}>
      <button
        className="store-promotion"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          <b>Save ${expanded ? 15 : savings}</b> on orders over $50 ⌄
        </span>
        {!expanded && <small>+ 1 more promotion</small>}
      </button>
      {expanded && (
        <div className="promotion-offers">
          <div>
            <b>Save $15</b>
            <p>On orders over $50. Eligible products only.</p>
          </div>
          <div>
            <b>20% off your order</b>
            <span> spring20orderdis…</span>
            <p>Automatically applied at checkout</p>
          </div>
        </div>
      )}
    </div>
  );
}
function ordered(catalog: Catalog, ids: string[]) {
  return ids.flatMap((id) => {
    const p = catalog.products.find((p) => p.id === id);
    return p ? [p] : [];
  });
}
function StoreGrid({
  products,
  heading = true,
  promotions = false,
}: {
  products: Product[];
  heading?: boolean;
  promotions?: boolean;
}) {
  const params = useSearchParams();
  const filters = readStoreFilters(params);
  const filtered = selectStoreProducts(products, filters);
  return (
    <>
      {heading && (
        <div className="store-grid-heading">
          <h2>All products</h2>
          <IconButton
            icon="filter-circles"
            label="Filter store products"
            onClick={() => openStoreFilter()}
          />
        </div>
      )}
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} showPromotion={promotions} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state" role="status">
          <p>No matching products in this reference.</p>
          {hasStoreFilters(filters) && (
            <button
              className="pill store-search-recovery"
              onClick={() => {
                const next = new URLSearchParams(params.toString());
                for (const key of ["min", "max", "sale", "stock", "sort"])
                  next.delete(key);
                commitSheetQuery(next);
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}
      <StoreFilter />
    </>
  );
}
export function Storefront({
  store,
  catalog,
}: {
  store: Store;
  catalog: Catalog;
}) {
  const [cart, setCart] = useState(false);
  const { viewStore, reportedProducts } = useDiscovery();
  const params = useSearchParams();
  const reported = params.get("reported");
  const [dismissedReport, setDismissedReport] = useState<string | null>(null);
  useEffect(() => {
    viewStore(store.id);
  }, [store.id, viewStore]);
  const isKitsch = store.id === "kitsch",
    chemical = store.id === "chemical-guys";
  const all = catalog.products.filter((p) => p.storeId === store.id);
  const recommendations =
    store.recommendations ??
    (isKitsch
      ? [
          { productId: "shampoo-bag" },
          { productId: "shea-butter", ratingCount: "2.1K" },
          { productId: "terracotta" },
          { productId: "rice-shampoo" },
        ]
      : all.map((product) => ({ productId: product.id })));
  const products = recommendations.flatMap((item) => {
    const product = all.find((product) => product.id === item.productId);
    return product
      ? [
          {
            ...product,
            ratingCount:
              "ratingCount" in item && item.ratingCount !== undefined
                ? item.ratingCount
                : product.ratingCount,
          },
        ]
      : [];
  });
  return (
    <ShopSurface
      className={`shop-page store-page ${chemical ? "chemical-store" : ""}`}
    >
      {isKitsch && <StorePromotion savings={store.promotionSavings} />}
      <section className={`store-hero${isKitsch ? " store-hero-kitsch" : ""}`}>
        <StoreActions store={store} />
        <div className="store-brand">
          <span>{isKitsch ? "/kit·sch/" : store.name}</span>
          {store.rating && (
            <Link href={`/stores/${store.id}/reviews`}>
              {store.rating} ★ ({store.ratingCount})
            </Link>
          )}
        </div>
        {isKitsch ? (
          <StoreNavigation store={store} />
        ) : (
          <div className="category-rail">
            {store.categories.map((c) => (
              <Link
                className="pill"
                key={c}
                href={
                  c === "Shop all"
                    ? `/stores/${store.id}#all-products`
                    : `/stores/${store.id}/collections/${c === "What's New" ? "whats-new" : c.toLowerCase().replaceAll(" ", "-")}`
                }
              >
                {c}
              </Link>
            ))}
          </div>
        )}
        <section className="store-recommendations">
          <h1>For you</h1>
          <div className="product-rail">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        {chemical && (
          <div className="store-video-rail">
            {[1, 2, 3].map((n) => (
              <Link key={n} href={`/stores/chemical-guys/video`}>
                <img
                  src={`/api/reference-media/chemical-rail${n}`}
                  alt="Chemical Guys product video"
                />
                <span>{n === 1 ? "3d" : "4d"} ago</span>
              </Link>
            ))}
          </div>
        )}
        {isKitsch && (
          <section className="store-recommendations">
            <h2>Collections</h2>
            <div className="store-collection-rail">
              {collectionMedia.map((c) => (
                <Link
                  key={c.slug}
                  href={`/stores/${store.id}/collections/${c.slug}`}
                >
                  <img src={`/api/reference-media/${c.media}`} alt="" />
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        <section id="all-products" className="store-all-products">
          <StoreGrid
            products={
              isKitsch
                ? ordered(catalog, [
                    "rice-shampoo",
                    "rice-conditioner",
                    "rice-bundle",
                    "shea-butter",
                    "shampoo-bag",
                    "terracotta",
                    "summer-mystery-box",
                    "beachy-gelato",
                  ])
                : all
            }
          />
        </section>
      </section>
      {reported &&
        reported !== dismissedReport &&
        reportedProducts.includes(reported) &&
        all.some((product) => product.id === reported) && (
          <button
            className="local-toast"
            role="status"
            onClick={() => setDismissedReport(reported)}
          >
            Item marked · no report sent
          </button>
        )}
      <FloatingNav back cart={() => setCart(true)} />
      <Cart catalog={catalog} open={cart} onClose={() => setCart(false)} />
    </ShopSurface>
  );
}
function StoreCriteria() {
  const params = useSearchParams();
  const filters = readStoreFilters(params);
  function toggle(key: "sale" | "stock") {
    const next = new URLSearchParams(params.toString());
    next.set(key, filters[key] ? "0" : "1");
    commitSheetQuery(next);
  }
  return (
    <div className="category-rail store-criteria">
      <IconButton
        icon="filter-circles"
        label="Filter collection"
        onClick={() => openStoreFilter()}
      />
      <button className="pill" onClick={() => openStoreFilter("sort")}>
        Sort by <span aria-hidden="true">⌄</span>
      </button>
      <button
        className={`pill ${filters.sale ? "selected" : ""}`}
        aria-pressed={filters.sale}
        onClick={() => toggle("sale")}
      >
        On sale
      </button>
      <button
        className={`pill ${filters.stock ? "selected" : ""}`}
        aria-pressed={filters.stock}
        onClick={() => toggle("stock")}
      >
        In-stock
      </button>
      <button className="pill" onClick={() => openStoreFilter("price")}>
        Price <span aria-hidden="true">⌄</span>
      </button>
    </div>
  );
}
export function StoreCollection({
  store,
  catalog,
  slug,
}: {
  store: Store;
  catalog: Catalog;
  slug: string;
}) {
  const collection = collectionMedia.find((c) => c.slug === slug);
  const title = collection?.name ?? slug.replaceAll("-", " ");
  const products =
    slug === "whats-new"
      ? ordered(catalog, ["summer-mystery-box", "beachy-gelato"])
      : slug === "best-sellers"
        ? ordered(catalog, [
            "rice-shampoo",
            "rice-conditioner",
            "rice-bundle",
            "shea-butter",
          ])
        : slug === "cleanse"
          ? catalog.products.filter(
              (p) => p.storeId === store.id && p.category === "Cleanse",
            )
          : slug === "shampoo-conditioner-combo-packs"
            ? ordered(catalog, ["rice-bundle"])
            : [];
  const [notice, setNotice] = useState("");
  return (
    <ShopSurface className="shop-page store-collection-page">
      <div className="collection-promotion">
        <b>Save $15</b> on orders over $50 <span aria-hidden="true">⌄</span>
      </div>
      <div className="store-collection-hero">
        {collection && (
          <img
            src={`/api/reference-media/${slug === "whats-new" ? "collection-new-hero" : collection.media}`}
            alt=""
          />
        )}
        <div>
          <h1>{title}</h1>
          <Link className="collection-store" href={`/stores/${store.id}`}>
            {store.logo && <img src={store.logo} alt="" />}
            {store.name}
          </Link>
        </div>
        <IconButton
          icon="share"
          label="Share collection"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setNotice("Local preview link copied");
            } catch {
              setNotice("Clipboard unavailable");
            }
          }}
        />
      </div>
      <StoreCriteria />
      <StoreGrid products={products} heading={false} promotions />
      {slug === "whats-new" && (
        <div
          className="collection-partial-products"
          aria-label="Additional captured products; details not recorded"
        >
          {["yellow", "coffee"].map((key) => (
            <img
              key={key}
              src={`/api/reference-media/collection-${key}-partial`}
              alt="Additional product, partially captured"
            />
          ))}
        </div>
      )}
      {notice && (
        <button className="local-toast" onClick={() => setNotice("")}>
          {notice}
        </button>
      )}
      <FloatingNav back />
    </ShopSurface>
  );
}
const storeCategories = [
  { name: "Cleanse", media: "category-cleanse", slug: "cleanse" },
  { name: "Heatless Hair", media: "category-heatless", slug: "heatless-hair" },
  { name: "What's New", media: "collection-new", slug: "whats-new" },
  {
    name: "Shower Caps & Hair Towels",
    media: "category-caps",
    slug: "shower-caps",
  },
];
export function StoreInfo({ store }: { store: Store; catalog: Catalog }) {
  const [detail, setDetail] = useState("");
  const [more, setMore] = useState(false);
  const kitsch = store.id === "kitsch";
  const policies = [
    ["Refund policy", "https://www.mykitsch.com/policies/refund-policy"],
    ["Shipping policy", "https://www.mykitsch.com/policies/shipping-policy"],
    ["Privacy policy", "https://www.mykitsch.com/pages/privacy-policy"],
    ["Terms and conditions", "https://www.mykitsch.com/pages/terms-of-service"],
  ];
  const contacts = [
    ["Website", "https://www.mykitsch.com"],
    ["kitsch@mykitsch.com", "mailto:kitsch@mykitsch.com"],
    ["4242405551", "tel:+14242405551"],
    ["Instagram", "https://instagram.com/mykitsch"],
    ["Facebook", "https://facebook.com/mykitsch"],
  ];
  return (
    <ShopSurface className="shop-page store-info-page">
      <StoreActions store={store} close />
      <div className="store-info-brand">
        {store.logo && <img src={store.logo} alt="" />}
        <div>
          <b>{store.name}</b>
          {store.rating && (
            <small>
              {store.rating} ★ ({store.ratingCount})
            </small>
          )}
        </div>
      </div>
      <p className="store-description">
        {kitsch
          ? "Evolving your everyday essentials, KITSCH is a US designed brand worn & loved by your favorite celebrities. Shop online for free shipping on orders"
          : store.description ||
            "No additional brand description was captured."}
        {more && (
          <span>
            {" "}
            —{" "}
            <a href="https://www.mykitsch.com" target="_blank" rel="noreferrer">
              Read the full brand description online
            </a>
          </span>
        )}
      </p>
      {kitsch && (
        <button
          className="store-description-more"
          aria-expanded={more}
          onClick={() => setMore(!more)}
        >
          {more ? "Less" : "More"}
        </button>
      )}
      {kitsch && (
        <>
          <div className="store-info-categories">
            {storeCategories.map((c) => (
              <Link
                href={`/stores/${store.id}/collections/${c.slug}`}
                key={c.slug}
              >
                <img src={`/api/reference-media/${c.media}`} alt="" />
                <span>{c.name}</span>
              </Link>
            ))}
            <Link
              href={`/stores/${store.id}/collections/shampoo-conditioner-combo-packs`}
            >
              <img
                src="/api/reference-media/category-combo-partial"
                alt="Shampoo and conditioner combo packs, partially captured"
              />
              <span>Shampoo &amp; Conditioner Combo Packs</span>
            </Link>
            <div>
              <img
                src="/api/reference-media/category-hair-partial"
                alt="Hair category, partially captured"
              />
              <span>Hair…</span>
            </div>
          </div>
          <Link
            className="store-shop-all"
            href={`/stores/${store.id}#all-products`}
          >
            <img src="/api/reference-media/store-shop-all" alt="" />
            <span>Shop all</span>
          </Link>
        </>
      )}
      <section className="store-info-panel">
        <Link className="detail-row" href={`/stores/${store.id}/reviews`}>
          <h2>Reviews</h2>
          <Icon name="arrow" />
        </Link>
        {store.rating && (
          <>
            <div className="store-info-rating">
              <b>{store.rating}</b>
              <span>★★★★★</span>
            </div>
            <p>{store.ratingCount} ratings</p>
          </>
        )}
        {kitsch && (
          <div className="store-review-previews">
            {[
              ["Best shampoo set ever", "Avery"],
              ["Pleasant Surprise", "Jamie"],
              ["Love Everything Kitsch", "Morgan"],
            ].map(([title, name]) => (
              <Link
                href={`/stores/${store.id}/reviews`}
                className="store-review-preview"
                key={title}
              >
                <span>★★★★★</span>
                <b>{title}</b>
                <small>
                  <i>{name[0]}</i>
                  {name} · Yesterday
                </small>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section className="store-info-panel">
        <h2>Policies</h2>
        {kitsch ? (
          policies.map(([label, href]) => (
            <a
              className="detail-row"
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {label}
              <Icon name="orders" />
            </a>
          ))
        ) : (
          <p>No policies were captured.</p>
        )}
      </section>
      <section className="store-info-panel">
        <h2>Contact</h2>
        {kitsch ? (
          contacts.map(([label, href]) => (
            <a
              className="detail-row"
              key={label}
              href={href}
              target={href.startsWith("https") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {label}
              <Icon name="share" />
            </a>
          ))
        ) : (
          <p>No contact information was captured.</p>
        )}
      </section>
      {kitsch && (
        <a
          className="store-info-panel detail-row"
          href="https://www.mykitsch.com"
          target="_blank"
          rel="noreferrer"
        >
          Visit Online Store <Icon name="arrow" />
        </a>
      )}
      <button
        className="store-info-panel detail-row"
        onClick={() => setDetail("Report")}
      >
        Report <Icon name="more" />
      </button>
      <Sheet open={!!detail} title={detail} onClose={() => setDetail("")}>
        <p className="sheet-copy">
          Reporting a store requires a connected service. No report will be sent
          from this local preview.
        </p>
        <textarea aria-label="Report details" placeholder="Tell us more" />
      </Sheet>
    </ShopSurface>
  );
}
export function StoreSearch({
  store,
  catalog,
}: {
  store: Store;
  catalog: Catalog;
}) {
  const params = useSearchParams(),
    router = useRouter(),
    state = useDiscovery();
  const filters = readStoreFilters(params);
  const q = params.get("q") || "";
  const [draft, setDraft] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const value = draft ?? q,
    editing = draft !== null || !q;
  const query = normalizeStoreQuery(value),
    kitsch = store.id === "kitsch";
  const path = `/stores/${encodeURIComponent(store.id)}/search`;
  useEffect(() => {
    const restore = () => setDraft(null);
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function submit(text: string) {
    const next = new URLSearchParams(params.toString());
    if (text.trim()) next.set("q", text.trim());
    else next.delete("q");
    const url = `${path}${next.size ? `?${next}` : ""}`;
    if (url !== `${window.location.pathname}${window.location.search}`)
      window.history.pushState(null, "", url);
    setDraft(null);
    input.current?.blur();
  }
  function cancel() {
    if (q) {
      setDraft(null);
      input.current?.blur();
    } else router.push(`/stores/${store.id}`);
  }
  function clear() {
    setDraft("");
    input.current?.focus();
  }
  const capturedResults = kitsch && normalizeStoreQuery(q) === "shampoo";
  const products = capturedResults
    ? ordered(catalog, [
        "rice-shampoo",
        "rosemary-liquid",
        "rice-liquid",
        "detox-shampoo",
      ])
    : matchStoreProducts(catalog.products, store.id, q);
  const count = selectStoreProducts(products, filters).length;
  const suggestions = (
    kitsch && query === "shampoo"
      ? ordered(catalog, ["rice-shampoo", "detox-shampoo", "rosemary-bar"])
      : matchStoreProducts(catalog.products, store.id, value)
  ).slice(0, 3);
  const phrases = kitsch
    ? [
        "dry shampoo",
        "shampoo and conditioner bar bags",
        "shampoo bar",
        "rice water shampoo and conditioner",
        "shampoo and conditioner",
        "purple toning biotin shampoo bundle",
        "rosemary and biotin shampoo set",
        "shampoo conditioner for curly hair",
      ]
    : [];
  const recent = ordered(catalog, [
    ...new Set([...state.viewedProducts, ...(kitsch ? ["shea-butter"] : [])]),
  ])
    .filter((product) => product.storeId === store.id)
    .slice(0, 8);
  const best = kitsch
    ? ordered(catalog, ["rice-shampoo", "rice-conditioner", "rice-bundle"])
    : catalog.products
        .filter((product) => product.storeId === store.id)
        .slice(0, 8);
  const categories = kitsch
    ? storeCategories
    : store.categories.map((name) => ({
        name,
        slug: name.toLowerCase().replaceAll(" ", "-"),
      }));
  function phrase(label: string) {
    const index = normalizeStoreQuery(label).indexOf(query);
    return index < 0 ? (
      label
    ) : (
      <>
        {label.slice(0, index)}
        <mark>{label.slice(index, index + query.length)}</mark>
        {label.slice(index + query.length)}
      </>
    );
  }
  return (
    <ShopSurface
      className={`shop-page store-search-page ${editing ? "store-search-editing" : "store-search-results"}`}
    >
      <div className="store-search-toolbar">
        <form
          className="search-form"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            submit(value);
          }}
        >
          <Icon name="search" />
          <input
            ref={input}
            name="q"
            aria-label={`Search ${store.name}`}
            placeholder={`Search ${store.name}...`}
            value={value}
            enterKeyHint="search"
            onFocus={() => setDraft((current) => current ?? q)}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                cancel();
              }
            }}
          />
          {value && (
            <button
              type="button"
              className="sr-only"
              aria-label="Clear search"
              onClick={clear}
            >
              Clear search
            </button>
          )}
        </form>
        {editing && (
          <button
            type="button"
            className="store-search-cancel"
            onClick={cancel}
          >
            Cancel
          </button>
        )}
      </div>
      {editing ? (
        query ? (
          <div className="store-search-suggestions">
            <button type="button" onClick={() => submit(value)}>
              <Icon name="search" />
              <span>{value}</span>
            </button>
            {suggestions.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <img src={product.images[0]} alt="" />
                <span>
                  {product.title}
                  <small>{formatMoney(product.price)}</small>
                </span>
              </Link>
            ))}
            {phrases
              .filter(
                (label) =>
                  label !== query &&
                  query
                    .split(" ")
                    .every((word) => normalizeStoreQuery(label).includes(word)),
              )
              .map((label) => (
                <button type="button" key={label} onClick={() => submit(label)}>
                  <Icon name="search" />
                  <span className="store-suggestion-phrase">
                    {phrase(label)}
                  </span>
                </button>
              ))}
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <>
                <h2>Shop by</h2>
                <div className="store-search-categories">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={
                        category.name === "Shop all"
                          ? `/stores/${store.id}#all-products`
                          : `/stores/${store.id}/collections/${category.slug}`
                      }
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
            {recent.length > 0 && (
              <>
                <h2>Recently viewed</h2>
                <div className="store-search-products">
                  {recent.map((product) => (
                    <ProductCard key={product.id} product={product} mediaOnly />
                  ))}
                </div>
              </>
            )}
            <h2>{kitsch ? "Best sellers" : "Products"}</h2>
            <div className="store-search-products">
              {best.map((product) => (
                <ProductCard key={product.id} product={product} mediaOnly />
              ))}
            </div>
          </>
        )
      ) : (
        <>
          <StoreCriteria />
          <p
            className="store-search-count"
            title={
              capturedResults && !hasStoreFilters(filters)
                ? "Captured count; only the four identified reference products are available in this preview."
                : "Matching products in the local reference sample"
            }
          >
            {capturedResults && !hasStoreFilters(filters) ? "270" : count}{" "}
            results from {store.name}
          </p>
          <StoreGrid products={products} heading={false} />
          {!products.length && (
            <button className="pill store-search-recovery" onClick={clear}>
              Clear search
            </button>
          )}
        </>
      )}
      <FloatingNav
        back
        onBack={() => {
          if (draft !== null && q) cancel();
          else if (window.history.length > 1) router.back();
          else router.push(`/stores/${store.id}`);
        }}
      />
    </ShopSurface>
  );
}

export function StoreVideo() {
  const [notice, setNotice] = useState(false);
  return (
    <ShopSurface className="store-video-page">
      <img
        className="video-poster"
        src="/api/reference-media/chemical-poster"
        alt="Chemical Guys Tire and Trim Gel in front of a GMC tailgate"
      />
      <div className="video-top">
        <Link
          className="icon-button"
          href="/stores/chemical-guys"
          aria-label="Close video"
        >
          <Icon name="close" />
        </Link>
        <IconButton
          icon="more"
          label="Video options"
          onClick={() => setNotice(true)}
        />
      </div>
      <IconButton
        icon="mic"
        label="Video audio unavailable"
        onClick={() => setNotice(true)}
      />
      <div className="video-bottom">
        <Link href="/stores/chemical-guys">
          <b>Chemical Guys</b>
          <small>3d ago</small>
        </Link>
        <button onClick={() => setNotice(true)}>
          Tire+Trim Gel Plastic and Rubber High-Glo…<small>$24.99</small>
        </button>
        <div>
          <IconButton
            icon="arrow"
            label="Play video"
            onClick={() => setNotice(true)}
          />
          <progress value="0" max="100" />
        </div>
      </div>
      <Sheet
        open={notice}
        title="Video preview"
        onClose={() => setNotice(false)}
      >
        <p className="sheet-copy">
          This captured video frame is available. The matching motion and audio
          asset is not available.
        </p>
      </Sheet>
    </ShopSurface>
  );
}
