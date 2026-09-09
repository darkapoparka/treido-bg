"use client";
import Link from "next/link";
import { StoreReviews } from "./store-reviews";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDiscovery } from "./state";
import { IconButton, Sheet, consumeSheetHistory } from "./components";
import { Icon } from "./icons";
const reviews = [
  {
    id: "nice-excellent",
    title: "Excellent product!",
    body: "I love this bar! It’s very moisturizing and smells heavenly. It’s great to use prior to applying a tanning product. It also makes a nice lather.",
    author: "Avery",
    date: "May 19, 2026",
  },
  {
    id: "nice-scent",
    title: "",
    body: "This has a very lovely smell and exfoliates nicely",
    author: "Morgan",
    date: "Jun 16, 2026",
  },
  {
    id: "nice-short",
    title: "Nice",
    body: "",
    author: "Jamie",
    date: "Jun 7, 2026",
  },
  {
    id: "wes",
    title: "Girlfriend loves it and I can breathe.",
    body: "I think in the beauty industry the makers think all products need to have a fragrance. Being a man with allergies to perfumes. Thank god someone has finally brought a product to market that works.",
    author: "Wes",
    date: "13 days ago",
  },
  {
    id: "juanita",
    title: "How much I love your product",
    body: "I love the body soap you sent me and I use the liquid shampoo. I love it but it’s just great for my hair and everything I’ve had from you for all my hair products and all my ties and all I have loved everything.",
    author: "Juanita",
    date: "18 days ago",
  },
  {
    id: "tammy",
    title: "",
    body: "This is truly one of the nicest soaps I have ever used. I have tried a few and I keep coming back to this one. Doesn’t dry out skin and rinses cleanly.",
    author: "Tammy",
    date: "16 days ago",
  },
];
function reviewTime(date: string) {
  const relative = /^(\d+) days ago$/.exec(date);
  return relative
    ? Date.UTC(2026, 5, 30) - Number(relative[1]) * 86400000
    : Date.parse(date);
}
const reasons = [
  "It’s bullying or harassment",
  "It’s a conflict of interest",
  "It’s offensive",
  "It’s fraud or scam",
  "It’s hate speech",
  "It’s about illegal activities or regulated goods",
  "It’s an intellectual property infringement",
  "It’s personal information",
  "It’s spam",
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
  const [sort, setSort] = useState("Most relevant");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [helpful, setHelpful] = useState<string[]>([]);
  const [reported, setReported] = useState<string[]>([]);
  const [report, setReport] = useState("");
  const [reason, setReason] = useState("");
  const [stage, setStage] = useState(0);
  const [filter, setFilter] = useState(false);
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
    <main className={`shop-page reviews-page ${store ? "store-reviews" : ""}`}>
      <header className="section-heading">
        <h1>Reviews</h1>
        <Link
          href={store ? "/stores/kitsch" : `/products/${productId}`}
          className="icon-button"
          aria-label="Close reviews"
        >
          <Icon name="close" />
        </Link>
      </header>
      <div className="review-summary">
        <div>
          <strong>{store ? "4.5" : "4.6"}</strong>
          <div className="rating">
            <span>★★★★★</span>
          </div>
          <p>{store ? "194.9K" : "3.3K"} ratings ⓘ</p>
        </div>
        {!store && (
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((n, i) => (
              <div key={n}>
                <span>{n}</span>
                <i>
                  <b style={{ width: `${[80, 9, 5, 2, 1][i]}%` }} />
                </i>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="review-search">
        <IconButton
          icon="filter"
          label="Filter reviews"
          onClick={() => setFilter(true)}
        />
        <input
          aria-label="Search reviews"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {reviews
        .filter(
          (r) =>
            `${r.title} ${r.body}`.toLowerCase().includes(q.toLowerCase()) &&
            (q || !r.id.startsWith("nice-")),
        )
        .sort((a, b) =>
          sort === "Most recent" ? reviewTime(b.date) - reviewTime(a.date) : 0,
        )
        .map((r) => (
          <article
            className={`review-card ${reported.includes(r.id) ? "review-reported" : ""}`}
            key={r.id}
          >
            <div className="rating">
              <span>★★★★★</span>
            </div>
            <h2>{r.title}</h2>
            <p className={expanded.includes(r.id) ? "" : "review-truncated"}>
              {r.body}
            </p>
            {r.body.length > 80 && (
              <button
                className="read-more"
                onClick={() =>
                  setExpanded((v) =>
                    v.includes(r.id)
                      ? v.filter((id) => id !== r.id)
                      : [...v, r.id],
                  )
                }
              >
                {expanded.includes(r.id) ? "Read less" : "Read more"}
              </button>
            )}
            <footer>
              <span className="review-avatar">{r.author[0]}</span>
              <span>
                {r.author} · {r.date}
              </span>
              <button
                className={helpful.includes(r.id) ? "helpful-selected" : ""}
                onClick={() =>
                  setHelpful((v) =>
                    v.includes(r.id)
                      ? v.filter((x) => x !== r.id)
                      : [...v, r.id],
                  )
                }
              >
                Helpful{helpful.includes(r.id) ? " (1) ✓" : ""}
              </button>
              <IconButton
                icon="more"
                label={`More options for ${r.author}'s review`}
                onClick={() => {
                  setReport(r.id);
                  setStage(0);
                  setReason("");
                }}
              />
            </footer>
            {reported.includes(r.id) && (
              <small className="danger-text">
                You reported this review · local preview
              </small>
            )}
          </article>
        ))}
      <Sheet
        open={!!report}
        title={
          stage === 0
            ? "More options"
            : stage === 1
              ? "Why are you reporting this review?"
              : "Thanks for reporting"
        }
        onClose={() => setReport("")}
      >
        {stage === 0 ? (
          <button
            className="account-row danger-text"
            onClick={() => setStage(1)}
          >
            Report this review
          </button>
        ) : stage === 1 ? (
          <>
            <p className="form-note">
              This won’t be shared with the reviewer or the store.
            </p>
            <div className="filter-options">
              {reasons.map((r) => (
                <label key={r}>
                  {r}
                  <input
                    type="radio"
                    name="report-reason"
                    checked={reason === r}
                    onChange={() => setReason(r)}
                  />
                </label>
              ))}
            </div>
            <div className="sheet-actions">
              <button className="pill" onClick={() => setReport("")}>
                Cancel
              </button>
              <button
                className="primary"
                disabled={!reason}
                onClick={() => {
                  setReported((v) => [...v, report]);
                  setStage(2);
                }}
              >
                Report
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="sheet-copy">
              Your selection is saved in this reference session. No report was
              sent to a store or moderation service.
            </p>
            <button
              className="primary form-submit"
              onClick={() => setReport("")}
            >
              Close
            </button>
          </>
        )}
      </Sheet>
      <Sheet
        open={filter}
        title="Filter reviews"
        onClose={() => setFilter(false)}
      >
        <div className="filter-options">
          {[
            "Most relevant",
            "Most recent",
            "Highest rating",
            "Lowest rating",
          ].map((x) => (
            <button
              key={x}
              aria-pressed={sort === x}
              onClick={() => {
                setSort(x);
                setFilter(false);
              }}
            >
              {x}
              <span className="radio-outline" />
            </button>
          ))}
        </div>
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
    <Sheet open={open} title={view} onClose={close}>
      {view === "More options" ? (
        <div className="filter-options">
          {storeId === "kitsch" && (
            <button onClick={() => setView("Contact KITSCH")}>
              Contact KITSCH
            </button>
          )}
          <button
            className="danger-text"
            onClick={() => setView("Report product")}
          >
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
              Website ↗
            </Link>
            <button
              onClick={() =>
                navigator.clipboard?.writeText("kitsch@mykitsch.com")
              }
            >
              kitsch@mykitsch.com <Icon name="share" />
            </button>
            <a className="account-row" href="tel:4242405551">
              4242405551
            </a>
            <a
              className="account-row"
              href="https://www.instagram.com/mykitsch/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="account-row"
              href="https://www.facebook.com/mykitsch/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
          <p className="form-note">
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
          <p>{reason}</p>
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
