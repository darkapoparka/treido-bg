"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import { IconButton, SaveButton, Sheet } from "./components";
import { Icon } from "./icons";
import { KitschWordmark } from "./kitsch-wordmark";
import { useDiscovery } from "./state";
import "./home-campaigns.css";

type Campaign = {
  id: string;
  store?: string;
  title?: string;
  rating: string;
  tone: string;
  tall?: boolean;
  photo?: string;
  partialPhoto?: boolean;
  products: string[];
  partialProducts?: boolean;
  trailingPrice?: string;
  offer?: string;
  threshold?: string;
};
// Each composition is a frozen Home capture. Missing photo regions are not fabricated.
const campaigns: Campaign[] = [
  {
    id: "princess",
    store: "princess-polly",
    title: "PRINCESS POLLY",
    rating: "4.5 ★ (414.7K)",
    tone: "princess",
    products: ["home-princess-top", "home-princess-dress"],
    partialProducts: true,
    trailingPrice: "$35.00",
  },
  {
    id: "drmtlgy",
    store: "drmtlgy",
    title: "DRMTLGY",
    rating: "4.5 ★ (78.1K)",
    tone: "drmtlgy",
    products: [
      "home-drmtlgy-eye",
      "home-drmtlgy-retinol",
      "home-drmtlgy-tinted",
      "home-drmtlgy-needleless",
    ],
    offer: "Save $30",
    threshold: "$50",
  },
  {
    id: "mountain",
    store: "mountain-goat",
    rating: "4.9 ★ (2K)",
    tone: "mountain",
    products: ["home-mountain-pink", "home-mountain-black"],
    partialProducts: true,
    trailingPrice: "$14.00",
  },
  {
    id: "tea",
    store: "loaded-tea",
    rating: "4.8 ★ (101.8K)",
    tone: "tea",
    products: ["home-tea-blue", "home-tea-orange"],
    partialProducts: true,
    trailingPrice: "$4.00",
    offer: "Save $10",
    threshold: "$20",
  },
  {
    id: "accessories",
    rating: "4.3 ★ (1.6K)",
    tone: "accessories",
    products: [],
    offer: "Save $35",
    threshold: "$140",
  },
  {
    id: "kitsch",
    store: "kitsch",
    title: "/kit·sch/",
    rating: "4.5 ★ (194.9K)",
    tone: "kitsch",
    tall: true,
    photo: "home-kitsch-photo",
    partialPhoto: true,
    products: ["home-air-dry-cream", "home-curl-cream", "rice-bundle"],
    offer: "Save $15",
    threshold: "$50",
  },
  {
    id: "pura",
    store: "pura",
    title: "pura.",
    rating: "4.6 ★ (1.1M)",
    tone: "pura",
    tall: true,
    photo: "home-pura-photo",
    partialPhoto: true,
    products: [],
  },
];

export function HomeCampaigns({ catalog }: { catalog: Catalog }) {
  const state = useDiscovery();
  const [menu, setMenu] = useState<Campaign | null>(null);
  const [stage, setStage] = useState<"menu" | "reason" | "report" | "reported">(
    "menu",
  );
  const [hidden, setHidden] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [reportReason, setReportReason] = useState("");
  const selectedStore = catalog.stores.find((s) => s.id === menu?.store);
  function close() {
    setMenu(null);
    setStage("menu");
    setReportReason("");
  }
  return (
    <>
      <div className="home-campaigns">
        {campaigns.map((c) => {
          const store = catalog.stores.find((s) => s.id === c.store),
            concealed = hidden.includes(c.id);
          const href = c.store ? `/stores/${c.store}` : "/search";
          return (
            <section
              key={c.id}
              aria-label={`${store?.name ?? "Accessories"} campaign`}
              className={`home-campaign campaign-${c.tone} ${c.tall ? "campaign-tall" : ""} ${concealed ? "campaign-concealed" : ""}`}
            >
              <div
                className="campaign-art"
                inert={concealed}
                aria-hidden={concealed || undefined}
              >
                {c.photo && (
                  <img
                    className={
                      c.partialPhoto
                        ? "campaign-photo-partial"
                        : "campaign-photo"
                    }
                    src={`/api/reference-media/${c.photo}`}
                    alt=""
                  />
                )}
                <header className="campaign-header">
                  <Link
                    href={href}
                    className={`campaign-brand ${c.title ? "campaign-wordmark" : ""}`}
                    aria-label={`Visit ${store?.name ?? "shop"}`}
                  >
                    {c.title ? (
                      c.id === "kitsch" ? (
                        <KitschWordmark />
                      ) : (
                        <span>{c.title}</span>
                      )
                    ) : store ? (
                      <>
                        {store.logo ? (
                          <img src={store.logo} alt="" />
                        ) : (
                          <span
                            className="store-logo-fallback"
                            aria-hidden="true"
                          >
                            {store.name[0]}
                          </span>
                        )}
                        <span>
                          {store.name}
                          <small>{c.rating}</small>
                        </span>
                      </>
                    ) : null}
                  </Link>
                  {(c.title || !store) && (
                    <span className="campaign-rating">{c.rating}</span>
                  )}
                  <IconButton
                    icon="more"
                    label={`More options for ${store?.name ?? "shop"}`}
                    onClick={() => {
                      setMenu(c);
                      setStage("menu");
                      setReportReason("");
                    }}
                  />
                </header>
                <div className="campaign-product-rail">
                  {c.products.map((id) => {
                    const p = catalog.products.find((p) => p.id === id);
                    return p ? (
                      <article
                        className={`campaign-product ${c.partialProducts ? "campaign-partial-product" : ""}`}
                        key={id}
                      >
                        <Link href={`/products/${id}`} aria-label={p.title}>
                          <img src={p.images[0]} alt={p.title} />
                        </Link>
                        <span className="campaign-price">
                          {formatMoney(p.price)}
                          {p.compareAt && (
                            <>
                              {" "}
                              <del>{formatMoney(p.compareAt)}</del>
                            </>
                          )}
                        </span>
                        <SaveButton product={p} />
                      </article>
                    ) : null;
                  })}
                  {c.trailingPrice && (
                    <Link
                      className="campaign-product campaign-uncaptured"
                      href={href}
                      aria-label={`More products from ${store?.name}`}
                    >
                      <span className="campaign-price">{c.trailingPrice}</span>
                    </Link>
                  )}
                  {c.id === "accessories" &&
                    [
                      ["home-accessory-cap", "$38.50", "$99.99"],
                      ["home-accessory-glasses", "$33.50", "$786.00"],
                      ["", "$108.50", ""],
                    ].map(([image, price, was]) => (
                      <Link
                        href="/search"
                        className="campaign-product campaign-partial-product"
                        key={price}
                        aria-label="Browse accessories"
                      >
                        {image && (
                          <img src={`/api/reference-media/${image}`} alt="" />
                        )}
                        <span className="campaign-price">
                          {price} {was && <del>{was}</del>}
                        </span>
                      </Link>
                    ))}
                  {c.id === "pura" &&
                    [0, 1, 2].map((n) => (
                      <Link
                        href={href}
                        key={n}
                        className="campaign-product campaign-uncaptured"
                        aria-label="Explore Pura fragrances"
                      />
                    ))}
                </div>
                {(c.offer || c.id === "princess") && (
                  <Link href={href} className="campaign-cta">
                    <strong>{c.offer ?? "Shop all"}</strong>
                    <Icon name="arrow" />
                  </Link>
                )}
              </div>
              {c.offer && (
                <Link
                  href={href}
                  className="campaign-offer"
                  inert={concealed}
                  aria-hidden={concealed || undefined}
                >
                  <b>{c.offer}</b>
                  <span>on orders over {c.threshold}</span>
                </Link>
              )}
              {concealed && (
                <div className="campaign-hidden-message">
                  <Icon name="eye-off" />
                  <p>We’ll show you less like this</p>
                  <button
                    onClick={() => {
                      setHidden((v) => v.filter((id) => id !== c.id));
                      setNotice("");
                    }}
                  >
                    Undo
                  </button>
                </div>
              )}
              {concealed && notice === c.id && (
                <div className="campaign-hidden-toast" role="status">
                  We’ll show you less like this
                </div>
              )}
            </section>
          );
        })}
      </div>
      <Sheet
        open={!!menu}
        title={
          stage === "reason"
            ? "Not interested"
            : stage === "report"
              ? "Report shop"
              : stage === "reported"
                ? "Report saved"
                : (selectedStore?.name ?? "Shop")
        }
        headerless={stage === "menu"}
        className={`campaign-menu campaign-menu-${stage}`}
        onClose={close}
      >
        {stage === "menu" ? (
          <>
            <header className="campaign-menu-store">
              {selectedStore?.logo && <img src={selectedStore.logo} alt="" />}
              <span>
                <strong>{selectedStore?.name ?? "Shop"}</strong>
                <b>{menu?.rating}</b>
              </span>
              <IconButton
                icon="close"
                label="Close shop options"
                onClick={close}
              />
            </header>
            <div className="campaign-menu-rows">
              <Link href={menu?.store ? `/stores/${menu.store}` : "/search"}>
                <Icon name="storefront" />
                Visit shop
              </Link>
              {menu?.store && (
                <button onClick={() => state.toggleFollow(menu.store!)}>
                  <Icon name="plus-circle" />
                  {state.followed.includes(menu.store) ? "Following" : "Follow"}
                </button>
              )}
              <button onClick={() => setStage("reason")}>
                <Icon name="thumb-down" />
                Not interested
              </button>
              <button
                className="danger-text"
                onClick={() => setStage("report")}
              >
                <Icon name="alert" />
                Report shop
              </button>
            </div>
          </>
        ) : stage === "reason" ? (
          <>
            <p>Please select a reason</p>
            <div className="campaign-reasons">
              {[
                "I just don’t like it",
                "Products are too expensive",
                "Want to see fewer shops like this",
                `Want to see less of ${selectedStore?.name ?? "this shop"}`,
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    if (menu) {
                      setHidden((v) => [...new Set([...v, menu.id])]);
                      setNotice(menu.id);
                    }
                    close();
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
          </>
        ) : stage === "report" ? (
          <>
            <p>Please select a reason</p>
            <div className="filter-options">
              {[
                "Misleading",
                "Inappropriate content",
                "IP Infringement",
                "Other",
              ].map((reason) => (
                <label key={reason}>
                  {reason}
                  <input
                    type="radio"
                    name="campaign-report"
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                  />
                </label>
              ))}
            </div>
            <button
              className="primary form-submit"
              disabled={!reportReason}
              onClick={() => setStage("reported")}
            >
              Report
            </button>
          </>
        ) : (
          <p className="sheet-copy">
            This report was recorded locally. No report was sent.
          </p>
        )}
      </Sheet>
    </>
  );
}
