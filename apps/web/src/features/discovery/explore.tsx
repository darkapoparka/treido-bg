"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Catalog } from "../catalog/types";
import { FloatingNav, ProductCard } from "./components";
import { Icon } from "./icons";
import { BeautySections } from "./beauty";
const categories = [
  { name: "Deals", color: "#251168", images: ["explore-deals-art"] },
  {
    name: "Beauty",
    color: "#b83c59",
    images: ["explore-beauty-lip", "explore-beauty-wash"],
  },
  {
    name: "Women",
    color: "#9fa8ad",
    images: ["explore-women-shirt", "explore-women-jeans"],
  },
  {
    name: "Men",
    color: "#084786",
    images: ["explore-men-shirt", "explore-men-jeans"],
  },
  {
    name: "Home",
    color: "#d76c00",
    images: ["explore-home-lamp", "explore-home-pan"],
  },
  {
    name: "Fitness & nutrition",
    color: "#9db995",
    images: ["explore-fitness-tone", "explore-fitness-shorts"],
  },
];
export function Explore({
  catalog,
  category,
}: {
  catalog: Catalog;
  category?: string;
}) {
  const beauty = category === "Beauty";
  return (
    <main className="shop-page explore-page">
      <h1>{category ?? "Explore"}</h1>
      {category && (
        <div className="category-rail">
          {(beauty
            ? ["Skin care", "Hair care", "Makeup", "Scent & body"]
            : ["Shop all", "Top rated", "What’s new"]
          ).map((c) => (
            <Link
              className="pill"
              key={c}
              href={`/search?q=${encodeURIComponent(c)}`}
            >
              {beauty && (
                <img
                  className="beauty-category-icon"
                  src={`/api/reference-media/beauty-pill-${c === "Skin care" ? "skin" : c === "Hair care" ? "hair" : c === "Makeup" ? "makeup" : "scent"}`}
                  alt=""
                />
              )}
              {c}
            </Link>
          ))}
        </div>
      )}
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
      {!category ? (
        <>
          <h2>Browse categories</h2>
          <div className="explore-categories">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={
                  c.name === "Deals"
                    ? "/search?deals=1"
                    : `/explore/${encodeURIComponent(c.name)}`
                }
                style={{ background: c.color }}
              >
                <h3>{c.name}</h3>
                <div>
                  {c.images.map((i) => (
                    <img key={i} src={`/api/reference-media/${i}`} alt="" />
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <section className="explore-minis">
            <h2>Try something new ›</h2>
            <p>Discover more ways to shop with Minis</p>
            {[
              ["sol", "Sol: Browse by Voice"],
              ["skin", "Skincare AI"],
              ["look", "Get the Look"],
            ].map(([id, name]) => (
              <Link key={id} href={`/minis/${id}`}>
                <img src={`/api/reference-media/mini-${id}-icon`} alt="" />
                <span>{name}</span>
                <Icon name="arrow" />
              </Link>
            ))}
            <Link href="/minis">See all Minis ›</Link>
          </section>
        </>
      ) : null}
      {(beauty
        ? ["Top rated", "What’s new"]
        : ["Top rated in home", "Top rated in menswear", "New in beauty"]
      ).map((title) => (
        <section className="explore-shelf" key={title}>
          <Link href={`/search?q=${category ?? ""}`}>
            <h2>{title} ›</h2>
          </Link>
          <div className="product-rail">
            {catalog.products
              .filter((p) =>
                beauty
                  ? title === "Top rated"
                    ? ["whip-mousse", "hanacure-cleanser"].includes(p.id)
                    : ["bubble-sunrise", "bare-liquid"].includes(p.id)
                  : p.category ===
                    (title === "Top rated in home"
                      ? "Home"
                      : title === "Top rated in menswear"
                        ? "Menswear"
                        : "Beauty"),
              )
              .map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  showPromotion
                  storeName={
                    catalog.stores.find((s) => s.id === p.storeId)?.name
                  }
                />
              ))}
          </div>
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
      <FloatingNav back={!!category} />
    </main>
  );
}
