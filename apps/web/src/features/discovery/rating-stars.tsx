function StarRow() {
  return Array.from({ length: 5 }, (_, index) => (
    <svg key={index} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 1.5 15.1 8.7 23 9.4 17 14.6 18.8 22.3 12 18.2 5.2 22.3 7 14.6 1 9.4 8.9 8.7Z"
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
