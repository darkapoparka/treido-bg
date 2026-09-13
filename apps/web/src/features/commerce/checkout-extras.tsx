"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import { Icon } from "../discovery/icons";
import { ReviewStars } from "../discovery/review-feedback";
export const checkoutRecommendations = [
  {
    id: "checkout-shea",
    name: "Shea Butter Exfoliating Body Wash",
    amount: 1400,
    image: "/api/reference-media/shea-butter",
    reviews: "2888",
  },
  {
    id: "checkout-rosemary-oil",
    name: "Strengthening Rosemary & Biotin Scalp & Hair Oil - 2fl oz./60mL",
    amount: 1500,
    image: "/api/reference-media/checkout-rosemary-oil",
    reviews: "1094",
  },
];
export function CheckoutExtras({
  catalog,
  onAdd,
  added = [],
  disabled = false,
}: {
  catalog: Catalog;
  onAdd?: (id: string) => void;
  added?: string[];
  disabled?: boolean;
}) {
  const [reverse, setReverse] = useState(false);
  const products = reverse
    ? [...checkoutRecommendations].reverse()
    : checkoutRecommendations;
  return (
    <section className="checkout-recommendations">
      <header>
        <h2>Don’t forget our most loved</h2>
        <button
          aria-label="Previous recommendations"
          disabled={disabled}
          onClick={() => setReverse(!reverse)}
        >
          <Icon name="back" />
        </button>
        <button
          aria-label="Next recommendations"
          disabled={disabled}
          onClick={() => setReverse(!reverse)}
        >
          <Icon name="arrow" />
        </button>
      </header>
      {products.map((p) => (
        <article key={p.id}>
          <img
            src={
              p.id === "checkout-shea"
                ? (catalog.products.find((x) => x.id === "shea-butter")
                    ?.images[0] ?? p.image)
                : p.image
            }
            alt=""
          />
          <div>
            <strong>{p.name}</strong>
            <p className="checkout-recommendation-rating">
              <ReviewStars rating={5} /> <em>{p.reviews} reviews</em>
            </p>
            <span>{formatMoney({ amount: p.amount, currency: "USD" })}</span>
          </div>
          <button
            disabled={disabled || added.includes(p.id)}
            onClick={() => onAdd?.(p.id)}
          >
            {added.includes(p.id) ? "Added" : "Add"}
          </button>
        </article>
      ))}
    </section>
  );
}
