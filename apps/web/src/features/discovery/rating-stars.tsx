function StarRow() {
  return Array.from({ length: 5 }, (_, index) => (
    <svg key={index} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M10.83 2.78a1.3 1.3 0 0 1 2.34 0l2.51 5.38 5.89.76a1.3 1.3 0 0 1 .72 2.24l-4.31 4.08 1.1 5.84a1.3 1.3 0 0 1-1.9 1.38L12 19.61l-5.18 2.85a1.3 1.3 0 0 1-1.9-1.38l1.1-5.84-4.31-4.08a1.3 1.3 0 0 1 .72-2.24l5.89-.76 2.51-5.38Z"
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
