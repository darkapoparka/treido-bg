"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import type { Catalog } from "../catalog/types";
import { FloatingNav, ProductCard } from "./components";
import { Icon } from "./icons";
import { BeautySections } from "./beauty";
import { CartOverlay } from "../commerce/checkout";
import { miniCatalog, miniHref } from "./mini-model";
import { useDiscovery } from "./state";
import { SourceLink } from "./return-navigation";
import styles from "./explore.module.css";

const departments = [
  ["Deals", "#1c1162", "explore-deals-art", ""],
  ["Beauty", "#bb405a", "explore-beauty-lip", "explore-beauty-wash"],
  ["Women", "#9fa5ac", "explore-women-shirt", "explore-women-jeans"],
  ["Men", "#013888", "explore-men-shirt", "explore-men-jeans"],
  ["Home", "#cd6001", "explore-home-lamp", "explore-home-pan"],
  [
    "Fitness & nutrition",
    "#9eb898",
    "explore-fitness-tone",
    "explore-fitness-shorts",
  ],
] as const;
const homeShelves = [
  ["Top rated in home", "Home", ["buffy-breeze", "citizenry-linen"]],
  ["Top rated in menswear", "Menswear", ["carbon-crew", "jordan-legend"]],
  ["New in beauty", "Beauty", ["bubble-sunrise", "bare-liquid"]],
] as const;
const beautyShelves = [
  ["Top rated", ["whip-mousse", "hanacure-cleanser"]],
  ["What’s new", ["bubble-sunrise", "bare-liquid"]],
] as const;
const beautyShelfPhotos: Readonly<Record<string, string>> = {
  "whip-mousse": "beauty-whip-card-photo",
  "hanacure-cleanser": "beauty-hanacure-card-photo",
  "bubble-sunrise": "beauty-bubble-card-photo",
  "bare-liquid": "beauty-bare-card-photo",
};
const homeShelfPhotos: Readonly<Record<string, string>> = {
  "buffy-breeze": "explore-home-buffy-card",
  "citizenry-linen": "explore-home-citizenry-card",
  "carbon-crew": "explore-home-carbon-card",
  "jordan-legend": "explore-home-jordan-card",
  "bubble-sunrise": "explore-home-bubble-card",
  "bare-liquid": "explore-home-bare-card",
};

export function Explore({
  catalog,
  category,
}: {
  catalog: Catalog;
  category?: string;
}) {
  const [cart, setCart] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [categoriesPassed, setCategoriesPassed] = useState(false);
  const { visitMini } = useDiscovery();
  const beauty = category === "Beauty";
  useEffect(() => {
    const categories = categoriesRef.current;
    if (!categories) return;
    // The empty cart belongs to the category entry. A populated cart remains
    // available through FloatingNav, including while browsing the lower shelves.
    const observer = new IntersectionObserver(([entry]) => {
      setCategoriesPassed(entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(categories);
    return () => observer.disconnect();
  }, [category]);
  const byIds = (ids: readonly string[]) =>
    ids.flatMap((id) => {
      const product = catalog.products.find((value) => value.id === id);
      if (!product) return [];
      const sourcePhoto = beauty ? beautyShelfPhotos[id] : homeShelfPhotos[id];
      return [
        sourcePhoto
          ? { ...product, images: [`/api/reference-media/${sourcePhoto}`] }
          : product,
      ];
    });
  const shelves = beauty
    ? beautyShelves.map(([title, ids]) => ({
        title,
        products: byIds(ids),
        href:
          title === "Top rated"
            ? "/search?category=Beauty&ratings=4.5%20stars%20and%20up"
            : "/search?category=Beauty&sort=Newest",
      }))
    : category
      ? [
          {
            title: category,
            href: `/search?q=${encodeURIComponent(category)}`,
            products: catalog.products.filter(
              (product) =>
                product.category === category ||
                (category === "Men" && product.category === "Menswear") ||
                (category === "Women" && product.category === "Womenswear"),
            ),
          },
        ]
      : homeShelves.map(([title, department, ids]) => ({
          title,
          href: `/search?category=${encodeURIComponent(department)}&${title === "New in beauty" ? "sort=Newest" : "ratings=4.5%20stars%20and%20up"}`,
          products:
            title === "New in beauty"
              ? byIds(ids)
              : [
                  ...byIds(ids),
                  ...catalog.products.filter(
                    (product) =>
                      product.category === department &&
                      !(ids as readonly string[]).includes(product.id),
                  ),
                ],
        }));
  return (
    <ShopSurface
      className={`shop-page explore-page ${styles.page}`}
      data-category={category}
    >
      <h1>{category ?? "Explore"}</h1>
      {category && (
        <div className="category-rail">
          {(beauty
            ? ["Skin care", "Hair care", "Makeup", "Scent & body"]
            : ["Shop all", "Top rated", "What’s new"]
          ).map((label) => (
            <SourceLink
              className="pill"
              key={label}
              href={`/search?q=${encodeURIComponent(label === "Shop all" ? category : label)}`}
            >
              {beauty && (
                <img
                  className="beauty-category-icon"
                  src={`/api/reference-media/beauty-pill-${label === "Skin care" ? "skin" : label === "Hair care" ? "hair" : label === "Makeup" ? "makeup" : "scent"}`}
                  alt=""
                />
              )}
              {label}
            </SourceLink>
          ))}
        </div>
      )}
      {(!category || beauty) && (
        <div className={beauty ? styles.beautyOpening : styles.openingRail}>
          <SourceLink
            className="editorial-hero"
            href={`/search?q=${beauty ? "Hair" : "Dresses"}`}
          >
            <img
              src={`/api/reference-media/${beauty ? "beauty-curls-photo" : "explore-summer-upper"}`}
              alt={beauty ? "Wavy hair" : "Summer dress"}
            />
            <div>
              <strong>
                {beauty
                  ? "Summer curl routine"
                  : "High-rotation summer dresses"}
              </strong>
              <p>
                {beauty
                  ? "Masks, leave-ins, and shine oils."
                  : "Slip dresses, shirt dresses, and linen midis."}
              </p>
              <Icon name="arrow" />
            </div>
          </SourceLink>
          {!category && (
            <SourceLink
              className={styles.heroContinuation}
              href="/search?category=Womenswear"
              aria-label="More summer styles"
            >
              <img
                src="/api/reference-media/explore-summer-continuation"
                alt=""
              />
            </SourceLink>
          )}
        </div>
      )}
      {!category && (
        <>
          <h2>Browse categories</h2>
          <div className="explore-categories" ref={categoriesRef}>
            {departments.map(([name, color, first, second]) => (
              <SourceLink
                key={name}
                style={{ background: color }}
                href={
                  name === "Deals"
                    ? "/search?deals=1"
                    : `/explore/${encodeURIComponent(name)}`
                }
              >
                <h3>{name}</h3>
                <div>
                  <img src={`/api/reference-media/${first}`} alt="" />
                  {second && (
                    <img src={`/api/reference-media/${second}`} alt="" />
                  )}
                </div>
              </SourceLink>
            ))}
          </div>
          <section className="explore-minis">
            <SourceLink className={styles.miniHeading} href="/minis">
              <h2>Try something new</h2>
              <Icon name="chevron" />
            </SourceLink>
            <p>Discover more ways to shop with Minis</p>
            {(["sol", "skin", "look"] as const).map((id) => (
              <SourceLink
                key={id}
                className={styles.miniRow}
                href={miniHref(id)}
                onClick={() => visitMini(id)}
              >
                <img src={`/api/reference-media/mini-${id}-icon`} alt="" />
                <span>
                  <strong>{miniCatalog[id].name}</strong>
                  <small>{miniCatalog[id].description}</small>
                </span>
              </SourceLink>
            ))}
          </section>
        </>
      )}
      {shelves.map(({ title, href, products }) => (
        <section className="explore-shelf" key={title}>
          <SourceLink href={href}>
            <h2>
              {title}{" "}
              <span className={styles.shelfChevron} aria-hidden="true">
                ›
              </span>
            </h2>
          </SourceLink>
          {products.length ? (
            <div className="product-rail">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showPromotion
                  storeName={
                    product.id === "buffy-breeze" && !category
                      ? "Buffy.co"
                      : (catalog.stores.find(
                          (store) => store.id === product.storeId,
                        )?.name ??
                        (product.id === "citizenry-linen"
                          ? "The Citizenry"
                          : undefined))
                  }
                />
              ))}
              {!category &&
                products.length === 2 &&
                (title === "Top rated in home" ||
                  title === "Top rated in menswear") && (
                  <SourceLink
                    className={styles.photoContinuation}
                    href={href}
                    aria-label={`More ${title.toLowerCase()} products`}
                  >
                    <img
                      src={`/api/reference-media/${title === "Top rated in home" ? "explore-home-continuation" : "explore-menswear-continuation"}`}
                      alt=""
                    />
                  </SourceLink>
                )}
              {(title === "What’s new" || title === "New in beauty") && (
                <SourceLink
                  className={styles.photoContinuation}
                  href={href}
                  aria-label="More new beauty products"
                >
                  <img
                    src={`/api/reference-media/${beauty ? "beauty-new-continuation" : "explore-beauty-continuation"}`}
                    alt=""
                  />
                </SourceLink>
              )}
            </div>
          ) : (
            <p className="empty-state" role="status">
              No products in this reference sample.
            </p>
          )}
        </section>
      ))}
      {beauty && <BeautySections catalog={catalog} />}
      {!category && (
        <section className="explore-shelf">
          <SourceLink href="/search?category=Womenswear&ratings=4.5%20stars%20and%20up">
            <h2>
              Top rated in womenswear{" "}
              <span className={styles.shelfChevron}>›</span>
            </h2>
          </SourceLink>
          <div className="product-rail explore-women-partials">
            <div />
            <div>
              <img
                src="/api/reference-media/explore-womenswear-partial"
                alt="Captured womenswear photograph detail"
              />
            </div>
          </div>
        </section>
      )}
      <FloatingNav
        fade
        back={!!category}
        cart={() => setCart(true)}
        showCartWhenEmpty={!beauty && (!!category || !categoriesPassed)}
      />
      <CartOverlay
        catalog={catalog}
        open={cart}
        onClose={() => setCart(false)}
      />
    </ShopSurface>
  );
}
