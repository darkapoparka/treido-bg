"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { StoreReviews } from "./store-reviews";
import { useDiscovery } from "./state";
import { IconButton, Sheet, consumeSheetHistory } from "./components";
import { Icon } from "./icons";
import {
  ReviewBody,
  ReviewHelpful,
  ReviewReport,
  ReviewStars,
} from "./review-feedback";
import {
  selectReviews,
  type ReviewSearchRecord,
  type ReviewSort,
} from "./review-model";

// Frozen product-review flows 33–36; the extra search records are visible in
// b2a75fc0 frame 002. Only the absolute dates have known cross-record ordering.
// No capture timestamp is inferred from the relative date labels.
const reviews: (ReviewSearchRecord & { author: string; date: string })[] = [
  {
    id: "nice-excellent",
    stars: 5,
    searchOnly: true,
    searchOrder: 1,
    previewNewestOrder: 2,
    title: "Excellent product!",
    body: "I love this bar! It’s very moisturizing and smells heavenly. It’s great to use prior to applying a tanning product. It also makes a nice lather.",
    author: "Avery",
    date: "May 19, 2026",
  },
  {
    id: "nice-scent",
    stars: 4,
    searchOnly: true,
    searchOrder: 2,
    previewNewestOrder: 0,
    title: "",
    variant: "NC / OS",
    body: "This has a very lovely smell and exfoliates nicely",
    author: "Morgan",
    date: "Jun 16, 2026",
  },
  {
    id: "nice-short",
    stars: 5,
    searchOnly: true,
    searchOrder: 3,
    previewNewestOrder: 1,
    title: "",
    body: "Nice",
    author: "Jamie",
    date: "Jun 7, 2026",
  },
  {
    id: "wes",
    stars: 5,
    title: "Girlfriend loves it and I can breathe.",
    body: "I think in the beauty industry the makers think all products need to have a fragrance. Being a man with allergies to perfumes. Thank god someone has finally brought a product to market that works and is fragrance free. I can finally go to bed and not have allergy issues. Thank you",
    author: "Wes",
    date: "13 days ago",
  },
  {
    id: "juanita",
    stars: 5,
    title: "How much I love your product",
    body: "I love the body soap you sent me and I use the liquid shampoo. I love it but it’s just great for my hair and everything I’ve had from you for all my hair products and all my ties and all I have loved everything.",
    author: "Juanita",
    date: "18 days ago",
  },
  {
    id: "tammy",
    stars: 5,
    searchOrder: 0,
    title: "",
    body: "This is truly one of the nicest soaps I have ever used. I have tried a few and I keep coming back to this one. Doesn’t dry out skin and rinses cleanly.",
    author: "Tammy",
    date: "16 days ago",
  },
];

const reviewSorts: ReviewSort[] = [
  "Most relevant",
  "Most recent",
  "Highest rating",
  "Lowest rating",
];
export function Reviews({
  store = false,
  available = true,
  productId = "shea-butter",
}: {
  store?: boolean;
  available?: boolean;
  productId?: string;
}) {
  const [sort, setSort] = useState<ReviewSort>("Most relevant");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const [helpful, setHelpful] = useState<string[]>([]);
  const [reported, setReported] = useState<Record<string, string>>({});
  const [report, setReport] = useState("");
  const [filter, setFilter] = useState(false);
  const visible = selectReviews(reviews, { query: q, sort, helpful });
  if (store && available) return <StoreReviews />;
  if (!available)
    return (
      <main className="shop-page reviews-page">
        <header className="section-heading">
          <h1>Reviews</h1>
        </header>
        <p className="empty-state">
          Review records for this item are not available in this reference
          preview.
        </p>
        <Link href="/">Back to Shop</Link>
      </main>
    );
  return (
    <main className="shop-page reviews-page">
      <header className="section-heading">
        <h1>Reviews</h1>
        <Link
          href={`/products/${productId}`}
          className="icon-button"
          aria-label="Close reviews"
        >
          <Icon name="close" />
        </Link>
      </header>
      <div className="review-summary">
        <div>
          <strong>4.6</strong>
          <ReviewStars rating={4.5} label="4.6 out of 5 stars" />
          <p>3.3K ratings ⓘ</p>
        </div>
        <div className="rating-bars" aria-label="Captured rating distribution">
          {[5, 4, 3, 2, 1].map((n, i) => (
            <div key={n}>
              <span>{n}</span>
              <i>
                <b style={{ width: `${[80, 9, 5, 2, 1][i]}%` }} />
              </i>
            </div>
          ))}
        </div>
      </div>
      <form
        className="review-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          searchRef.current?.blur();
        }}
      >
        <IconButton
          icon="filter-circles"
          label="Filter reviews"
          onClick={() => setFilter(true)}
        />
        <div className="review-search-field">
          <Icon name="search" />
          <input
            ref={searchRef}
            type="search"
            aria-label="Search reviews"
            placeholder="Search"
            enterKeyHint="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && q) {
                event.preventDefault();
                setQ("");
              }
            }}
          />
        </div>
      </form>
      {!visible.length && (
        <div className="review-empty" role="status">
          <h2>No matching reviews</h2>
          <p>No captured reviews match this search.</p>
          <button
            className="pill"
            onClick={() => {
              setQ("");
              setSort("Most relevant");
              searchRef.current?.focus();
            }}
          >
            Clear search
          </button>
        </div>
      )}
      {visible.map((review) => (
        <article
          className={`review-card ${reported[review.id] ? "review-reported" : ""}`}
          key={review.id}
        >
          <ReviewStars rating={review.stars} />
          {review.variant && (
            <small className="review-variant">{review.variant}</small>
          )}
          {review.title && <h2>{review.title}</h2>}
          <ReviewBody
            body={review.body}
            expanded={expanded.includes(review.id)}
            onToggle={() =>
              setExpanded((value) =>
                value.includes(review.id)
                  ? value.filter((id) => id !== review.id)
                  : [...value, review.id],
              )
            }
          />
          <footer>
            <span className="review-avatar" aria-hidden="true">
              {review.author[0]}
            </span>
            <span className="review-author">
              {review.author} · {review.date}
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
              label={`More options for ${review.author}'s review`}
              onClick={() => setReport(review.id)}
            />
          </footer>
          {reported[review.id] && (
            <small className="review-reported-label">
              You reported this review · local preview
            </small>
          )}
        </article>
      ))}
      {report && (
        <ReviewReport
          key={report}
          onClose={() => setReport("")}
          onReport={(reason) => {
            setReported((value) => ({ ...value, [report]: reason }));
          }}
        />
      )}
      <Sheet
        open={filter}
        title="Filter reviews"
        onClose={() => setFilter(false)}
      >
        <div className="filter-options">
          {reviewSorts.map((value) => (
            <button
              key={value}
              aria-pressed={sort === value}
              onClick={() => {
                setSort(value);
                setFilter(false);
              }}
            >
              {value}
              <span
                className={`radio-outline ${sort === value ? "selected" : ""}`}
              />
            </button>
          ))}
        </div>
        <p className="form-note">
          This preview contains a limited captured sample. Relative dates cannot
          be ordered against calendar dates.
        </p>
      </Sheet>
    </main>
  );
}
export function ProductOptions({
  storeId,
  productId,
  open,
  onClose,
}: {
  storeId?: string;
  productId?: string;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter(),
    state = useDiscovery();
  const close = () => {
    setView("More options");
    setReason("");
    setNotes("");
    onClose();
  };
  const [view, setView] = useState("More options");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <Sheet
      open={open}
      title={view === "Tell us more" ? "Report product" : view}
      className="product-options-sheet"
      onClose={close}
    >
      {view === "More options" ? (
        <div className="filter-options">
          {storeId === "kitsch" && (
            <button onClick={() => setView("Contact KITSCH")}>
              <Icon name="chat" />
              Contact KITSCH
            </button>
          )}
          <button
            className="danger-text"
            onClick={() => setView("Report product")}
          >
            <Icon name="alert" />
            Report
          </button>
        </div>
      ) : view === "Contact KITSCH" ? (
        <>
          <div className="filter-options">
            <Link
              className="account-row"
              href="https://www.mykitsch.com"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="globe" />
              Website <span className="contact-trailing">↗</span>
            </Link>
            <button
              onClick={() =>
                navigator.clipboard
                  ?.writeText("kitsch@mykitsch.com")
                  .catch(() => {})
              }
            >
              <Icon name="mail" />
              kitsch@mykitsch.com{" "}
              <span className="contact-trailing">
                <Icon name="copy" />
              </span>
            </button>
            <a className="account-row" href="tel:4242405551">
              <Icon name="phone" />
              4242405551
            </a>
            <a
              className="account-row"
              href="https://www.instagram.com/mykitsch/"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="instagram" />
              Instagram
            </a>
            <a
              className="account-row"
              href="https://www.facebook.com/mykitsch/"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="facebook" />
              Facebook
            </a>
          </div>
          <p className="contact-address">
            137 N Larchmont Blvd, Suite 641, LOS ANGELES, California 90004,
            United States
          </p>
        </>
      ) : view === "Report product" ? (
        <>
          <p className="form-note">Please select a reason</p>
          <div className="filter-options">
            {[
              "Misleading",
              "Inappropriate content",
              "IP Infringement",
              "Other",
            ].map((r) => (
              <label key={r}>
                {r}
                <input
                  type="radio"
                  name="product-reason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                />
              </label>
            ))}
          </div>
          <div className="sheet-actions">
            <button className="pill" onClick={close}>
              Cancel
            </button>
            <button
              className="primary"
              disabled={!reason}
              onClick={() => setView("Tell us more")}
            >
              Next
            </button>
          </div>
        </>
      ) : view === "Tell us more" ? (
        <>
          <p className="form-note">Please select a reason</p>
          <label className="selected-report-reason">
            {reason}
            <input type="radio" checked readOnly aria-label={reason} />
          </label>
          <textarea
            aria-label="Tell us more"
            placeholder="Tell us more"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <p className="form-note">Optional</p>
          <div className="sheet-actions">
            <button className="pill" onClick={() => setView("Report product")}>
              Back
            </button>
            <button
              className="primary"
              onClick={() => {
                if (productId) {
                  state.reportProduct(productId);
                  consumeSheetHistory();
                  close();
                  router.replace(
                    `/stores/${storeId}?reported=${encodeURIComponent(productId)}`,
                  );
                } else setView("Report saved");
              }}
            >
              Report
            </button>
          </div>
        </>
      ) : (
        <p className="sheet-copy">
          This report was recorded locally. No report was sent.
        </p>
      )}
    </Sheet>
  );
}
