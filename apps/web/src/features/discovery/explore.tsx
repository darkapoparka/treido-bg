"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { FloatingNav, ProductCard } from "./components";
import { Icon } from "./icons";
import { Beauty } from "./beauty";
import { CartOverlay } from "../commerce/checkout";
import { featuredMiniIds, miniCatalog, miniHref } from "./mini-model";
import { useDiscovery } from "./state";
import styles from "./explore.module.css";

const departments = [
  ["Deals", "#594acf", "deals-art", ""],
  ["Beauty", "#5363c9", "explore-beauty1", "explore-beauty2"],
  ["Womenswear", "#974a17", "explore-women1", "explore-women2"],
  ["Menswear", "#be3336", "explore-men1", "explore-men2"],
  ["Home", "#694e8b", "explore-home1", "explore-home2"],
  ["Top rated", "#1e614d", "explore-top-art", ""],
] as const;
const sourceShelves = [
  ["New in beauty", ["bubble-sunrise", "bare-liquid"], "/explore/Beauty?view=new"],
  ["New in menswear", ["carbon-crew", "jordan-legend"], "/explore/Menswear"],
  ["Trending in home", ["buffy-breeze", "citizenry-linen"], "/explore/Home"],
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
  if (category === "Beauty") return <Beauty catalog={catalog} />;
  const shelves = category
    ? [
        {
          title: category,
          href: `/search?category=${encodeURIComponent(category)}`,
          products: catalog.products.filter((product) => product.category === category),
        },
      ]
    : sourceShelves.map(([title, ids, href]) => ({
        title,
        href,
        // "New in beauty" is the captured Bubble/bareMinerals shelf, not all
        // products whose broad category happens to be Beauty.
        products: ids.flatMap((id) => {
          const product = catalog.products.find((value) => value.id === id);
          return product ? [product] : [];
        }),
      }));
  return (
    <ShopSurface className={`shop-page explore-page ${styles.page}`}>
      <h1>{category || "Explore"}</h1>
      {!category && (
        <>
          <Link className="editorial-hero" href="/deals">
            <img src="/api/reference-media/explore-deals" alt="" />
            <div>
              <strong>Days of the best deals</strong>
              <p>Get discounts on your favorite brands</p>
              <Icon name="chevron" />
            </div>
          </Link>
          <h2>Browse</h2>
          <div className="explore-categories">
            {departments.map(([name, color, first, second]) => (
              <Link
                key={name}
                style={{ background: color }}
                href={
                  name === "Deals"
                    ? "/deals"
                    : name === "Top rated"
                      ? "/search?ratings=4.5%20stars%20and%20up"
                      : `/explore/${name}`
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
              <h2>Try Shop Minis</h2>
              <Icon name="chevron" />
            </Link>
            <p>Smarter ways to find what you love</p>
            {featuredMiniIds.map((id) => (
              <Link
                key={id}
                className={styles.miniRow}
                href={miniHref(id)}
                onClick={() => visitMini(id)}
              >
                <img src={`/api/reference-media/mini-${id}`} alt="" />
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
          {!category && (
            <Link href={href}>
              <h2>{title} ›</h2>
            </Link>
          )}
          {products.length ? (
            <div className="product-rail">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showPromotion
                  storeName={
                    catalog.stores.find((store) => store.id === product.storeId)?.name ??
                    (product.id === "citizenry-linen" ? "The Citizenry" : undefined)
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
      <FloatingNav back cart={() => setCart(true)} showCartWhenEmpty />
      <CartOverlay catalog={catalog} open={cart} onClose={() => setCart(false)} />
    </ShopSurface>
  );
}
