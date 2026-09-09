"use client";
/* eslint-disable @next/next/no-img-element -- Existing allowlisted reference crops. */
import Link from "next/link";
import { useState } from "react";
import { IconButton, Sheet } from "./components";
import { Icon } from "./icons";
import { ReviewHelpful, ReviewReport, ReviewStars } from "./review-feedback";
import {
  selectReviews,
  type ReviewRating,
  type ReviewSearchRecord,
  type ReviewSort,
} from "./review-model";

type StoreReview = ReviewSearchRecord & {
  productTitle: string;
  syntheticAuthor: string;
  source: string;
  dateLabel: string | null;
  rect393: number[];
  cropPath: string;
};
const records: StoreReview[] = [
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

const sorts: ReviewSort[] = [
  "Most recent",
  "Most helpful",
  "Highest rating",
  "Lowest rating",
];
const ratings: ReviewRating[] = [5, 4, 3, 2, 1];
export function StoreReviews() {
  const [q, setQ] = useState("");
  const [panel, setPanel] = useState("");
  const [sort, setSort] = useState<ReviewSort>("Most recent");
  const [rating, setRating] = useState<ReviewRating | null>(null);
  const [helpful, setHelpful] = useState<string[]>([]);
  const [report, setReport] = useState("");
  const [reported, setReported] = useState<Record<string, string>>({});
  const visible = selectReviews(records, { query: q, sort, rating, helpful });
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
          <ReviewStars rating={4.5} />
          <small>194.9K ratings &#9432;</small>
        </div>
      </div>
      <div className="category-rail">
        <IconButton
          icon="filter-circles"
          label="Filter reviews"
          onClick={() => setPanel("Filter")}
        />
        <button className="pill" onClick={() => setPanel("Sort by")}>
          Sort by <Icon name="back" style={{ transform: "rotate(-90deg)" }} />
        </button>
        <button className="pill" onClick={() => setPanel("Rating")}>
          {rating === null ? "Rating" : `${rating} stars`}{" "}
          <Icon name="back" style={{ transform: "rotate(-90deg)" }} />
        </button>
      </div>
      {q.trim() && <p className="store-review-query">Search: {q}</p>}
      {!visible.length && (
        <div className="review-empty" role="status">
          <h2>No matching reviews</h2>
          <p>No captured reviews match these filters.</p>
          <button
            className="pill"
            onClick={() => {
              setQ("");
              setRating(null);
              setSort("Most recent");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="store-review-list">
        {visible.map((review) => (
          <article
            key={review.id}
            className={reported[review.id] ? "review-reported" : ""}
          >
            <div className="store-review-product">
              <img
                src={`/api/reference-media/${review.id}`}
                alt={review.productTitle}
              />
              <div>
                <ReviewStars rating={review.stars} />
                <h2>{review.title}</h2>
                <small>{review.productTitle}</small>
              </div>
            </div>
            <p>{review.body}</p>
            <footer>
              <span className="review-avatar" aria-hidden="true">
                {review.syntheticAuthor[0]}
              </span>
              <span className="review-author">
                {review.syntheticAuthor}
                {review.dateLabel && <> &#183; {review.dateLabel}</>}
              </span>
              <ReviewHelpful
                selected={helpful.includes(review.id)}
                disabled={!!reported[review.id]}
                onToggle={() =>
                  setHelpful((value) =>
                    value.includes(review.id)
                      ? value.filter((id) => id !== review.id)
                      : [...value, review.id],
                  )
                }
              />
              <IconButton
                icon="more"
                label={`More options for ${review.title}`}
                onClick={() => setReport(review.id)}
              />
            </footer>
            {reported[review.id] && (
              <small className="review-reported-label">
                You reported this review &#183; local preview
              </small>
            )}
          </article>
        ))}
      </div>
      {report && (
        <ReviewReport
          key={report}
          onClose={() => setReport("")}
          onReport={(reason) => {
            setReported((value) => ({ ...value, [report]: reason }));
          }}
        />
      )}
      <Sheet open={!!panel} title={panel} onClose={() => setPanel("")}>
        {panel === "Filter" ? (
          <>
            <label className="account-input">
              Search reviews
              <input
                value={q}
                type="search"
                onChange={(event) => setQ(event.target.value)}
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
            {sorts.map((value) => (
              <button
                key={value}
                aria-pressed={sort === value}
                onClick={() => {
                  setSort(value);
                  setPanel("");
                }}
              >
                {value}
                <span
                  className={`radio-outline ${sort === value ? "selected" : ""}`}
                />
              </button>
            ))}
          </div>
        ) : panel === "Rating" ? (
          <div className="filter-options">
            <button
              aria-pressed={rating === null}
              onClick={() => {
                setRating(null);
                setPanel("");
              }}
            >
              All ratings
              <span
                className={`radio-outline ${rating === null ? "selected" : ""}`}
              />
            </button>
            {ratings.map((value) => (
              <button
                key={value}
                aria-pressed={rating === value}
                onClick={() => {
                  setRating(value);
                  setPanel("");
                }}
              >
                {value} {value === 1 ? "star" : "stars"}
                <span
                  className={`radio-outline ${rating === value ? "selected" : ""}`}
                />
              </button>
            ))}
          </div>
        ) : null}
      </Sheet>
    </main>
  );
}
