"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Sheet } from "./components";
import { Icon } from "./icons";

function StarRow() {
  return Array.from({ length: 5 }, (_, index) => (
    <svg key={index} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="m12 1.8 2.8 6.7 7.2.6-5.5 4.7 1.7 7-6.2-3.8-6.2 3.8 1.7-7L2 9.1l7.2-.6Z"
      />
    </svg>
  ));
}

export function ReviewStars({
  rating,
  label,
}: {
  rating: number;
  label?: string;
}) {
  const fill = Math.max(0, Math.min(5, rating)) * 20;
  return (
    <span
      className="review-rating-stars"
      role="img"
      aria-label={label ?? `${rating} out of 5 stars`}
    >
      <span className="review-rating-stars-empty" aria-hidden="true">
        <StarRow />
      </span>
      <span
        className="review-rating-stars-fill"
        style={{ width: `${fill}%` }}
        aria-hidden="true"
      >
        <span>
          <StarRow />
        </span>
      </span>
    </span>
  );
}

// Whether a review needs expansion depends on rendered lines, not character
// count. Keep its paragraph mounted while measuring and opening other sheets.
export function ReviewBody({
  body,
  expanded,
  onToggle,
}: {
  body: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    if (!element || expanded) return;
    let active = true;
    const measure = () => {
      if (active)
        setOverflows(element.scrollHeight > element.clientHeight + 1);
    };
    const frame = requestAnimationFrame(measure);
    // A clamped paragraph can keep the same box height while font metrics alter
    // its hidden lines. ResizeObserver alone does not cover that transition.
    void document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [body, expanded]);
  if (!body) return null;
  return (
    <>
      <p ref={ref} id={id} className={expanded ? "" : "review-truncated"}>
        {body}
      </p>
      {(expanded || overflows) && (
        <button
          className="read-more"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={onToggle}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
}

export function ReviewHelpful({
  selected,
  onToggle,
  disabled = false,
}: {
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={`review-helpful ${selected ? "helpful-selected" : ""}`}
      aria-label={selected ? "Helpful (1) ✓" : "Helpful"}
      aria-pressed={selected}
      title="Helpful selection is local to this reference preview"
      disabled={disabled}
      onClick={onToggle}
    >
      <Icon name="thumb-up" /> Helpful
      {selected && <b className="helpful-count">1</b>}
    </button>
  );
}

// Frozen flow fae1016a-facb-4633-b62b-7ddd809e0fac, frames 002–006.
// The confirmation deliberately does not repeat the source's service promise.
const reportReasons = [
  [
    "It’s bullying or harassment",
    "It attacks an individual or a group of people.",
  ],
  [
    "It’s a conflict of interest",
    "It’s from someone affiliated with the Shop Store or a competitor’s store.",
  ],
  [
    "It’s offensive",
    "It contains inappropriate, sexually explicit, or violent content.",
  ],
  [
    "It’s fraud or scam",
    "It has allegations about improper store or buyer behavior.",
  ],
  [
    "It’s hate speech",
    "It contains harmful content based on an individual or group identity.",
  ],
  [
    "It’s about illegal activities or regulated goods",
    "It references items that go against Shop Merchant Guidelines.",
  ],
  [
    "It’s an intellectual property infringement",
    "It violates intellectual property laws.",
  ],
  [
    "It’s personal information",
    "It contains information that could identify the reviewer e.g. email, phone number, or credit card details.",
  ],
  ["It’s spam", "It contains ads or promotional content."],
] as const;

export function ReviewReport({
  onClose,
  onReport,
}: {
  onClose: () => void;
  onReport: (reason: string) => void;
}) {
  const [stage, setStage] = useState<"menu" | "reasons" | "thanks">("menu");
  const [reason, setReason] = useState("");
  const group = useId();
  const reasonRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (stage === "reasons") reasonRef.current?.focus({ preventScroll: true });
    if (stage === "thanks") closeRef.current?.focus({ preventScroll: true });
  }, [stage]);
  const title =
    stage === "menu"
      ? "More options"
      : stage === "reasons"
        ? "Why are you reporting this review?"
        : "Thanks for reporting";
  return (
    <Sheet
      open
      title={title}
      onClose={onClose}
      headerless={stage !== "menu"}
      className={`review-report-${stage}`}
    >
      {stage === "menu" ? (
        <button
          className="review-report-entry danger-text"
          onClick={() => setStage("reasons")}
        >
          <Icon name="alert" /> Report this review
        </button>
      ) : stage === "reasons" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!reason) return;
            onReport(reason);
            setStage("thanks");
          }}
        >
          {/* Sheet already supplies the accessible heading in headerless mode. */}
          <p className="review-report-title" aria-hidden="true">
            {title}
          </p>
          <p className="review-report-subtitle">
            This won’t be shared with the reviewer or the store.
          </p>
          <fieldset className="review-reason-options">
            <legend className="sr-only">
              Choose a reason for reporting this review
            </legend>
            {reportReasons.map(([label, description], index) => (
              <label key={label}>
                <span>
                  <strong>{label}</strong>
                  <small id={`${group}-${index}`}>{description}</small>
                </span>
                <input
                  ref={index === 0 ? reasonRef : undefined}
                  type="radio"
                  name={group}
                  value={label}
                  aria-label={label}
                  checked={reason === label}
                  aria-describedby={`${group}-${index}`}
                  onChange={() => setReason(label)}
                />
              </label>
            ))}
          </fieldset>
          <div className="sheet-actions">
            <button type="button" className="pill" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primary"
              disabled={!reason}
              title="Local preview only; no report will be sent"
            >
              Report
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="review-report-title" aria-hidden="true">
            {title}
          </p>
          <p className="review-report-confirmation" role="status">
            Your selection is marked in this browser preview only. No report was
            sent to the reviewer, store or moderation service. Moderation is
            unavailable in this preview; the marked review is a local example.
          </p>
          <button
            ref={closeRef}
            type="button"
            className="review-report-close"
            onClick={onClose}
          >
            Close
          </button>
        </>
      )}
    </Sheet>
  );
}
