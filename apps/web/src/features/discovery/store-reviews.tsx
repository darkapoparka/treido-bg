"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { IconButton, Sheet } from "./components";
import { Icon } from "./icons";
const records = [
  {
    id: "store-review-1",
    syntheticAuthor: "Avery",
    source: "screens/128.webp",
    dateLabel: "Yesterday",
    stars: 5,
    title: "Best shampoo set ever",
    productTitle: "Coconut Oil Shampoo & Conditioner Combo",
    body: "Before I started to use all my hair products I had a scalp problem but since I switched everything I use to",
    rect393: [33, 252, 63, 63],
    cropPath:
      ".local\\shop-build\\asset-audit\\catalog-expansion\\store-review-1.png",
  },
  {
    id: "store-review-2",
    syntheticAuthor: "Jamie",
    source: "screens/128.webp",
    dateLabel: "Yesterday",
    stars: 5,
    title: "Pleasant Surprise",
    productTitle: "Coastal Cottage Hair Perfume Duo",
    body: "I really enjoy these fragrances. Especially beach sorbet, so light and makes me feel happy. I keep in it my purse to apply in the",
    rect393: [33, 489, 63, 63],
    cropPath:
      ".local\\shop-build\\asset-audit\\catalog-expansion\\store-review-2.png",
  },
  {
    id: "store-review-3",
    syntheticAuthor: "Morgan",
    source: "screens/128.webp",
    dateLabel: null,
    stars: 5,
    title: "Love Everything Kitsch",
    productTitle: "Tula Rose Hair & Body Perfume Mist",
    body: "I have a breathing issue and I like to smell good as well I can do that with Kitsch finally.",
    rect393: [33, 726, 63, 63],
    cropPath:
      ".local\\shop-build\\asset-audit\\catalog-expansion\\store-review-3.png",
  },
];
export function StoreReviews() {
  const [q, setQ] = useState("");
  const [panel, setPanel] = useState("");
  const [sort, setSort] = useState("Most recent");
  const [rating, setRating] = useState("All ratings");
  const [helpful, setHelpful] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  return (
    <main className="shop-page store-reviews">
      <header className="section-heading">
        <h1>Reviews</h1>
        <Link
          href="/stores/kitsch/info"
          className="icon-button"
          aria-label="Close reviews"
        >
          <Icon name="close" />
        </Link>
      </header>
      <div className="store-review-summary">
        <b>4.5</b>
        <div>
          <strong>★★★★★</strong>
          <small>194.9K ratings ⓘ</small>
        </div>
      </div>
      <div className="category-rail">
        <IconButton
          icon="filter"
          label="Filter reviews"
          onClick={() => setPanel("Filter")}
        />
        <button className="pill" onClick={() => setPanel("Sort by")}>
          Sort by ⌄
        </button>
        <button className="pill" onClick={() => setPanel("Rating")}>
          Rating ⌄
        </button>
      </div>
      {q && <p>Search: {q}</p>}
      <div className="store-review-list">
        {records
          .filter(
            (r) =>
              (rating === "All ratings" || rating === "5 stars") &&
              `${r.title} ${r.body}`.toLowerCase().includes(q.toLowerCase()),
          )
          .map((r) => (
            <article key={r.id}>
              <div className="store-review-product">
                <img
                  src={`/api/reference-media/${r.id}`}
                  alt={r.productTitle}
                />
                <div>
                  <strong>★★★★★</strong>
                  <h2>{r.title}</h2>
                  <small>{r.productTitle}</small>
                </div>
              </div>
              <p>{r.body}…</p>
              <footer>
                <span>
                  {r.syntheticAuthor} · {r.dateLabel || ""}
                </span>
                <button
                  aria-pressed={helpful.includes(r.id)}
                  onClick={() =>
                    setHelpful((v) =>
                      v.includes(r.id)
                        ? v.filter((id) => id !== r.id)
                        : [...v, r.id],
                    )
                  }
                >
                  <Icon name="thumb-up" /> Helpful
                </button>
                <IconButton
                  icon="more"
                  label={`Report ${r.title}`}
                  onClick={() => setPanel(`Report ${r.id}`)}
                />
              </footer>
            </article>
          ))}
      </div>
      <Sheet
        open={!!panel}
        title={panel.startsWith("Report") ? "Report review" : panel}
        onClose={() => setPanel("")}
      >
        {panel === "Filter" ? (
          <>
            <label className="account-input">
              Search reviews
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search reviews"
              />
            </label>
            <button
              className="primary form-submit"
              onClick={() => setPanel("")}
            >
              Done
            </button>
          </>
        ) : panel === "Sort by" ? (
          <div className="filter-options">
            {[
              "Most recent",
              "Most helpful",
              "Highest rating",
              "Lowest rating",
            ].map((v) => (
              <button
                key={v}
                aria-pressed={sort === v}
                onClick={() => {
                  setSort(v);
                  setPanel("");
                }}
              >
                {v}
                <span
                  className={`radio-outline ${sort === v ? "selected" : ""}`}
                />
              </button>
            ))}
          </div>
        ) : panel === "Rating" ? (
          <div className="filter-options">
            {[
              "All ratings",
              "5 stars",
              "4 stars",
              "3 stars",
              "2 stars",
              "1 star",
            ].map((v) => (
              <button
                key={v}
                onClick={() => {
                  setRating(v);
                  setPanel("");
                }}
              >
                {v}
                <span
                  className={`radio-outline ${rating === v ? "selected" : ""}`}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="filter-options">
            {[
              "It's bullying or harassment",
              "It's offensive",
              "It's fraud or scam",
              "It's spam",
              "Other",
            ].map((reason) => (
              <button
                key={reason}
                onClick={() => {
                  setPanel("");
                  setNotice("Report saved locally. No report was sent.");
                }}
              >
                {reason}
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        )}
      </Sheet>
      {notice && (
        <button className="local-toast" onClick={() => setNotice("")}>
          {notice}
        </button>
      )}
    </main>
  );
}
