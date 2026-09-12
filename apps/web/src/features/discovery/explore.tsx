"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { FloatingNav, ProductCard } from "./components";
import { Icon } from "./icons";
import { BeautySections } from "./beauty";
import { CartOverlay } from "../commerce/checkout";
import { miniCatalog, miniHref } from "./mini-model";
import { useDiscovery } from "./state";
import styles from "./explore.module.css";

const departments = [
  ["Deals", "#251168", "explore-deals-art", ""],
  ["Beauty", "#b83c59", "explore-beauty-lip", "explore-beauty-wash"],
  ["Women", "#9fa8ad", "explore-women-shirt", "explore-women-jeans"],
  ["Men", "#084786", "explore-men-shirt", "explore-men-jeans"],
  ["Home", "#d76c00", "explore-home-lamp", "explore-home-pan"],
  [
    "Fitness & nutrition",
    "#9db995",
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

export function Explore({
  catalog,
  category,
}: {
  catalog: Catalog;
  category?: string;
}) {
  const [cart, setCart] = useState(false);
  const { visitMini } = useDiscovery();
  const beauty = category === "Beauty";
  const byIds = (ids: readonly string[]) =>
    ids.flatMap((id) => {
      const product = catalog.products.find((value) => value.id === id);
      return product ? [product] : [];
    });
  const shelves = beauty
    ? beautyShelves.map(([title, ids]) => ({
        title,
        products: byIds(ids),
        href:
          title === "Top rated"
            ? "/search?category=Beauty&ratings=4.5%20stars%20and%20up"
            : "/search?category=Beauty&sort=Most%20recent",
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
          href: `/search?category=${encodeURIComponent(department)}&${title === "New in beauty" ? "sort=Most%20recent" : "ratings=4.5%20stars%20and%20up"}`,
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
    <ShopSurface className={`shop-page explore-page ${styles.page}`}>
      <h1>{category ?? "Explore"}</h1>
      {category && (
        <div className="category-rail">
          {(beauty
            ? ["Skin care", "Hair care", "Makeup", "Scent & body"]
            : ["Shop all", "Top rated", "What’s new"]
          ).map((label) => (
            <Link
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
            </Link>
          ))}
        </div>
      )}
      {(!category || beauty) && (
        <Link
          className="editorial-hero"
          href={`/search?q=${beauty ? "Hair" : "Dresses"}`}
        >
          <img
            src={`/api/reference-media/${beauty ? "explore-curls-upper" : "explore-summer-upper"}`}
            alt={beauty ? "Wavy hair" : "Summer dress"}
          />
          <div>
            <strong>
              {beauty ? "Summer curl routine" : "High-rotation summer dresses"}
            </strong>
            <p>
              {beauty
                ? "Masks, leave-ins, and shine oils."
                : "Slip dresses, shirt dresses, and linen midis."}
            </p>
            <Icon name="arrow" />
          </div>
        </Link>
      )}
      {!category && (
        <>
          <h2>Browse categories</h2>
          <div className="explore-categories">
            {departments.map(([name, color, first, second]) => (
              <Link
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
              </Link>
            ))}
          </div>
          <section className="explore-minis">
            <Link className={styles.miniHeading} href="/minis">
              <h2>Try something new</h2>
              <Icon name="chevron" />
            </Link>
            <p>Discover more ways to shop with Minis</p>
            {(["sol", "skin", "look"] as const).map((id) => (
              <Link
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
              </Link>
            ))}
          </section>
        </>
      )}
      {shelves.map(({ title, href, products }) => (
        <section className="explore-shelf" key={title}>
          <Link href={href}>
            <h2>{title} ›</h2>
          </Link>
          {products.length ? (
            <div className="product-rail">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showPromotion
                  storeName={
                    catalog.stores.find((store) => store.id === product.storeId)
                      ?.name ??
                    (product.id === "citizenry-linen"
                      ? "The Citizenry"
                      : undefined)
                  }
                />
              ))}
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
          <h2>Top rated in womenswear ›</h2>
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
        back={!!category}
        cart={() => setCart(true)}
        showCartWhenEmpty
      />
      <CartOverlay
        catalog={catalog}
        open={cart}
        onClose={() => setCart(false)}
      />
    </ShopSurface>
  );
}
