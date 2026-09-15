"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon } from "./icons";
import { ProductCard } from "./components";
import type { Catalog } from "../catalog/types";
const brands = [
  {
    name: "Athena Club",
    mark: "Athena",
    rating: "4.8",
    count: "7.9K",
    image: "beauty-athena-card-photo",
    artwork: "beauty-athena-header",
    deal: "Save $5",
    color: "#777775",
  },
  {
    name: "Crown Affair",
    mark: "CROWN AFFAIR",
    rating: "4.8",
    count: "11K",
    image: "beauty-crown-card-photo",
    artwork: "beauty-crown-header",
    deal: "",
    color: "#64563d",
  },
  {
    name: "Starface World",
    mark: "STARFACE",
    rating: "4.6",
    count: "21.4K",
    image: "beauty-starface-card-photo",
    artwork: "beauty-starface-header",
    deal: "",
    color: "#c990a4",
  },
  {
    name: "Nécessaire",
    mark: "Nécessaire",
    rating: "4.6",
    count: "20.5K",
    image: "beauty-necessaire-card-photo",
    artwork: "beauty-necessaire-header",
    deal: "Save $20",
    color: "#bcbcb9",
  },
];
function Editorial({
  title,
  copy,
  image,
}: {
  title: string;
  copy: string;
  image: string;
}) {
  return (
    <Link
      className="editorial-hero beauty-editorial"
      href={`/search?q=${encodeURIComponent(title)}`}
    >
      <img src={`/api/reference-media/${image}`} alt="" />
      <div>
        <strong>{title}</strong>
        <p>{copy}</p>
        <Icon name="arrow" />
      </div>
    </Link>
  );
}
export function BeautySections({ catalog }: { catalog: Catalog }) {
  return (
    <>
      <Editorial
        title="Skincare starter set"
        copy="Moisturizers, spot patches, and invisible SPF."
        image="beauty-starter-photo"
      />
      <section className="beauty-section">
        <h2>Scent &amp; body</h2>
        <div className="beauty-category-grid">
          {[
            ["Perfume & cologne", "perfume", "#bebda5"],
            ["Bath & body", "bath", "#8c3b20"],
            ["Shampoo & conditioner", "hair", "#99784d"],
            ["Nail care", "nail", "#b54fb3"],
          ].map(([title, key, color]) => (
            <Link
              key={key}
              style={{ background: color }}
              href={`/search?q=${encodeURIComponent(title)}`}
            >
              <img src={`/api/reference-media/beauty-${key}-photo`} alt="" />
              <strong>
                {key === "hair" ? (
                  <>
                    Shampoo &amp;
                    <br />
                    conditioner
                  </>
                ) : (
                  title
                )}
              </strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="beauty-section">
        <h2>Favorites for a reason</h2>
        <div className="beauty-brand-grid">
          {brands.map((b) => (
            <Link
              href={`/search?q=${encodeURIComponent(b.name)}`}
              key={b.name}
              className="beauty-brand"
              data-brand={b.name}
              style={{ background: b.color }}
            >
              <span className="beauty-brand-mark">
                <img src={`/api/reference-media/${b.artwork}`} alt={b.mark} />
              </span>
              <h3>{b.name}</h3>
              <p>
                {b.rating} ★ ({b.count})
              </p>
              <div className="beauty-brand-product">
                {b.deal && <span className="deal-badge">{b.deal}</span>}
                <img
                  src={`/api/reference-media/${b.image}`}
                  alt={b.name + " featured product"}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="beauty-section">
        <h2>Bestsellers ›</h2>
        <div className="product-rail beauty-bestsellers">
          {catalog.products
            .filter((p) => ["beauty-fenty", "beauty-juvia"].includes(p.id))
            .map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                storeName={catalog.stores.find((s) => s.id === p.storeId)?.name}
              />
            ))}
        </div>
      </section>
      <section className="beauty-section">
        <h2>Sweet deals</h2>
        <div className="product-rail beauty-deals">
          {[brands[0], brands[3]].map((b) => (
            <Link
              href={`/search?q=${encodeURIComponent(b.name)}&deals=1`}
              key={b.name}
              data-brand={b.name}
              style={{
                background: b.name === "Nécessaire" ? "#d6d3d0" : b.color,
              }}
            >
              <div>
                <img
                  src={`/api/reference-media/${b.name === "Athena Club" ? "beauty-athena-deal" : "beauty-necessaire-deal"}`}
                  alt={b.mark}
                />
              </div>
              <span className="deal-badge">{b.deal}</span>
              <h3>{b.name}</h3>
              <p>
                {b.rating} ★ ({b.count})
              </p>
            </Link>
          ))}
        </div>
      </section>
      <div className="beauty-editorial-rail">
        <Editorial
          title="Vacation-ready nails"
          copy="Shop quick-dry polish, gel-like top coats, press-…"
          image="beauty-nails-upper"
        />
        <span className="beauty-editorial-continuation" aria-hidden="true" />
      </div>
    </>
  );
}
