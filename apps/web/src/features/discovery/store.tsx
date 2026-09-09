"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatMoney } from "../catalog/types";
import type { Catalog, Store, Product } from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  ProductCard,
  Sheet,
  commitSheetQuery,
} from "./components";
import { Icon } from "./icons";
import { Cart } from "./product";
import { useDiscovery } from "./state";
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
function StorePromotion() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`promotion-owner ${expanded ? "expanded" : ""}`}>
      <button
        className="store-promotion"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          <b>{expanded ? "Save $15" : "Save $20"}</b> on orders over $50 ⌄
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
            <span> spring20offall…</span>
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
function StoreFilter({
  open,
  onClose,
  initialSection = "",
}: {
  open: boolean;
  onClose: () => void;
  initialSection?: string;
}) {
  const params = useSearchParams();
  const [section, setSection] = useState(initialSection);
  const min = Number(params.get("min") || 0),
    max = Number(params.get("max") || 2000),
    sale = params.get("sale") === "1",
    stock = params.get("stock") !== "0",
    sort = params.get("sort") || "Best selling";
  function update(values: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(values).forEach(([k, v]) =>
      v ? next.set(k, v) : next.delete(k),
    );
    commitSheetQuery(next);
  }
  return (
    <>
      <Sheet
        open={open}
        title="Filter"
        className={`store-filter-sheet ${section ? "filter-covered" : ""}`}
        onClose={onClose}
      >
        <div className="filter-options">
          <button onClick={() => setSection("Sort by")}>
            Sort by<span>{sort} ›</span>
          </button>
          <button
            aria-pressed={sale}
            onClick={() => update({ sale: sale ? "" : "1" })}
          >
            On sale
            <span
              aria-hidden="true"
              className={`store-checkbox ${sale ? "checked" : ""}`}
            >
              {sale ? "✓" : ""}
            </span>
          </button>
          <button
            aria-pressed={stock}
            onClick={() => update({ stock: stock ? "0" : "1" })}
          >
            In-stock
            <span
              aria-hidden="true"
              className={`store-checkbox ${stock ? "checked" : ""}`}
            >
              {stock ? "✓" : ""}
            </span>
          </button>
          <button onClick={() => setSection("Price")}>
            Price<span>›</span>
          </button>
        </div>
        <div className="sheet-actions">
          <button
            className="pill"
            onClick={() =>
              update({ min: "", max: "", sale: "", stock: "", sort: "" })
            }
          >
            Clear all
          </button>
          <button className="primary" onClick={onClose}>
            Done
          </button>
        </div>
      </Sheet>
      <Sheet
        open={open && !!section}
        title={section || "Filter"}
        className={
          section === "Price" ? "store-price-sheet" : "store-filter-sheet"
        }
        onClose={() => {
          setSection("");
        }}
      >
        <div className="filter-options">
          {section === "Price" ? (
            <div className="dual-price">
              <strong>
                ${min} - ${max.toLocaleString()}
                {max === 2000 ? "+" : ""}
              </strong>
              <div>
                <input
                  aria-label="Minimum price"
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={min}
                  onChange={(e) =>
                    update({
                      min: String(Math.min(Number(e.target.value), max)),
                    })
                  }
                />
                <input
                  aria-label="Maximum price"
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={max}
                  onChange={(e) =>
                    update({
                      max: String(Math.max(Number(e.target.value), min)),
                    })
                  }
                />
              </div>
            </div>
          ) : section === "Sort by" ? (
            [
              "Best selling",
              "Featured",
              "Newest",
              "Price: low to high",
              "Price: high to low",
            ].map((value) => (
              <button
                key={value}
                onClick={() => {
                  update({ sort: value });
                  setSection("");
                }}
              >
                {value}
                <span
                  className={`radio-outline ${sort === value ? "selected" : ""}`}
                />
              </button>
            ))
          ) : (
            <>
              <button onClick={() => setSection("Sort by")}>
                Sort by <span>{sort} ›</span>
              </button>
              <button
                aria-pressed={sale}
                onClick={() => update({ sale: sale ? "" : "1" })}
              >
                On sale{" "}
                <span
                  aria-hidden="true"
                  className={`store-checkbox ${sale ? "checked" : ""}`}
                >
                  {sale ? "✓" : ""}
                </span>
              </button>
              <button
                aria-pressed={stock}
                onClick={() => update({ stock: stock ? "0" : "1" })}
              >
                In-stock{" "}
                <span
                  aria-hidden="true"
                  className={`store-checkbox ${stock ? "checked" : ""}`}
                >
                  {stock ? "✓" : ""}
                </span>
              </button>
              <button onClick={() => setSection("Price")}>
                Price <span>›</span>
              </button>
            </>
          )}
        </div>
        <div className="sheet-actions">
          <button
            className="pill"
            onClick={() =>
              update(
                section === "Price"
                  ? { min: "", max: "" }
                  : { min: "", max: "", sale: "", stock: "", sort: "" },
              )
            }
          >
            {section ? "Reset" : "Clear all"}
          </button>
          <button
            className="primary"
            onClick={() => (section ? setSection("") : onClose())}
          >
            Done
          </button>
        </div>
      </Sheet>
    </>
  );
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
  const [filter, setFilter] = useState(false);
  const filtered = products
    .filter(
      (p) =>
        (params.get("sale") !== "1" || p.compareAt) &&
        (params.get("stock") === "0" ||
          p.variants.some((v) => v.availableQuantity > 0)) &&
        p.price.amount >= Number(params.get("min") || 0) * 100 &&
        p.price.amount <= Number(params.get("max") || 2000) * 100,
    )
    .sort((a, b) =>
      params.get("sort") === "Price: low to high"
        ? a.price.amount - b.price.amount
        : params.get("sort") === "Price: high to low"
          ? b.price.amount - a.price.amount
          : params.get("sort") === "Newest"
            ? (a.sourceNewestRank ?? 999) - (b.sourceNewestRank ?? 999)
            : 0,
    );
  return (
    <>
      {heading && (
        <div className="store-grid-heading">
          <h2>All products</h2>
          <IconButton
            icon="filter"
            label="Filter store products"
            onClick={() => setFilter(true)}
          />
        </div>
      )}
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} showPromotion={promotions} />
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">No matching products in this reference.</p>
      )}
      <StoreFilter open={filter} onClose={() => setFilter(false)} />
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
  const { viewStore } = useDiscovery();
  useEffect(() => {
    viewStore(store.id);
  }, [store.id, viewStore]);
  const isKitsch = store.id === "kitsch",
    chemical = store.id === "chemical-guys";
  const all = catalog.products.filter((p) => p.storeId === store.id);
  const products = isKitsch
    ? ordered(catalog, [
        "shampoo-bag",
        "shea-butter",
        "terracotta",
        "rice-shampoo",
      ])
    : all;
  return (
    <main
      className={`shop-page store-page ${chemical ? "chemical-store" : ""}`}
    >
      {isKitsch && <StorePromotion />}
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
              {isKitsch && (
                <img
                  src={`/api/reference-media/${c === "Shop all" ? "rice-shampoo" : c === "Cleanse" ? "category-cleanse" : "category-heatless"}`}
                  alt=""
                />
              )}
              {c}
            </Link>
          ))}
        </div>
        <section className="store-recommendations">
          <h1>For you</h1>
          <div className="product-rail">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={
                  isKitsch && p.id === "shea-butter"
                    ? { ...p, ratingCount: "2.1K" }
                    : p
                }
              />
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
      <FloatingNav back cart={() => setCart(true)} />
      <Cart catalog={catalog} open={cart} onClose={() => setCart(false)} />
    </main>
  );
}
function StoreCriteria() {
  const params = useSearchParams();
  const [filter, setFilter] = useState<string | null>(null);
  function toggle(key: "sale" | "stock") {
    const next = new URLSearchParams(params.toString());
    next.set(
      key,
      key === "sale"
        ? params.get(key) === "1"
          ? "0"
          : "1"
        : params.get(key) === "0"
          ? "1"
          : "0",
    );
    commitSheetQuery(next);
  }
  return (
    <>
      <div className="category-rail store-criteria">
        <IconButton
          icon="filter"
          label="Filter collection"
          onClick={() => setFilter("")}
        />
        <button className="pill" onClick={() => setFilter("Sort by")}>
          Sort by <span aria-hidden="true">⌄</span>
        </button>
        <button
          className={`pill ${params.get("sale") === "1" ? "selected" : ""}`}
          aria-pressed={params.get("sale") === "1"}
          onClick={() => toggle("sale")}
        >
          On sale
        </button>
        <button
          className={`pill ${params.get("stock") !== "0" ? "selected" : ""}`}
          aria-pressed={params.get("stock") !== "0"}
          onClick={() => toggle("stock")}
        >
          In-stock
        </button>
        <button className="pill" onClick={() => setFilter("Price")}>
          Price <span aria-hidden="true">⌄</span>
        </button>
      </div>
      {filter !== null && (
        <StoreFilter
          open
          initialSection={filter}
          onClose={() => setFilter(null)}
        />
      )}
    </>
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
    <main className="shop-page store-collection-page">
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
    </main>
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
    <main className="shop-page store-info-page">
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
    </main>
  );
}
export function StoreSearch({
  store,
  catalog,
}: {
  store: Store;
  catalog: Catalog;
}) {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [draft, setDraft] = useState<string | null>(null);
  const value = draft ?? q;
  const editing = draft !== null || !q;
  function submit(query: string) {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    commitSheetQuery(next);
    setDraft(null);
  }
  const products = (
    store.id === "kitsch" && q.toLowerCase() === "shampoo"
      ? ordered(catalog, [
          "rice-shampoo",
          "rosemary-liquid",
          "rice-liquid",
          "detox-shampoo",
        ])
      : catalog.products
  ).filter(
    (p) =>
      p.storeId === store.id && p.title.toLowerCase().includes(q.toLowerCase()),
  );
  const suggestions = [
    "shampoo",
    "dry shampoo",
    "shampoo and conditioner bar bags",
    "shampoo bar",
    "rice water shampoo and conditioner",
    "shampoo and conditioner",
    "purple toning biotin shampoo bundle",
    "rosemary and biotin shampoo set",
  ];
  return (
    <main className="shop-page store-search-page">
      <div className="store-search-toolbar">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
        >
          <Icon name="search" />
          <input
            name="q"
            aria-label={`Search ${store.name}`}
            placeholder={`Search ${store.name}`}
            value={value}
            onFocus={() => setDraft(q)}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setDraft("")}
          >
            <Icon name="close" />
          </button>
        </form>
        {editing && <Link href={`/stores/${store.id}`}>Cancel</Link>}
      </div>
      {editing ? (
        value ? (
          <div className="store-search-suggestions">
            <button onClick={() => submit(value)}>
              <Icon name="search" />
              <span>{value}</span>
            </button>
            {ordered(catalog, [
              "rice-shampoo",
              "detox-shampoo",
              "rosemary-bar",
            ]).map((p) => (
              <Link href={`/products/${p.id}`} key={p.id}>
                <img src={p.images[0]} alt="" />
                <span>
                  {p.title}
                  <small>{formatMoney(p.price)}</small>
                </span>
              </Link>
            ))}
            {suggestions
              .filter((s) => s !== value)
              .map((s) => (
                <button key={s} onClick={() => submit(s)}>
                  <Icon name="search" />
                  <span>{s}</span>
                </button>
              ))}
          </div>
        ) : (
          <>
            <h2>Shop by</h2>
            <div className="store-search-categories">
              {storeCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/stores/${store.id}/collections/${c.slug}`}
                >
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
            <h2>Recently viewed</h2>
            <div className="store-search-products">
              {ordered(catalog, ["shea-butter"]).map((p) => (
                <ProductCard key={p.id} product={p} mediaOnly />
              ))}
            </div>
            <h2>Best sellers</h2>
            <div className="store-search-products">
              {ordered(catalog, [
                "rice-shampoo",
                "rice-conditioner",
                "rice-bundle",
              ]).map((p) => (
                <ProductCard key={p.id} product={p} mediaOnly />
              ))}
            </div>
          </>
        )
      ) : (
        <>
          <StoreCriteria />
          <p className="store-search-count">
            {store.id === "kitsch" && q.toLowerCase() === "shampoo"
              ? "270"
              : products.length}{" "}
            results from {store.name}
          </p>
          <StoreGrid products={products} heading={false} />
        </>
      )}
      <FloatingNav
        back
        onBack={() => {
          if (draft !== null) setDraft(null);
          else window.history.back();
        }}
      />
    </main>
  );
}
export function StoreVideo() {
  const [notice, setNotice] = useState(false);
  return (
    <main className="store-video-page">
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
    </main>
  );
}
