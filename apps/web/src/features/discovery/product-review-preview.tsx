import Link from "next/link";
import { ReviewStars } from "./review-feedback";

type Preview = {
  title: string;
  rating: number;
  author?: string;
  initial?: string;
  date?: string;
  partial?: boolean;
};

export function ProductReviewPreview({
  productId,
  ratingCount,
  reviews,
}: {
  productId: string;
  ratingCount: string;
  reviews: readonly Preview[];
}) {
  return (
    <section className="pdp-review-preview">
      <h2>Reviews</h2>
      <div className="review-summary">
        <div>
          <strong>4.6</strong>
          <ReviewStars rating={4.5} label="4.6 out of 5 stars" />
          <p>{ratingCount} ratings</p>
        </div>
        <div className="rating-bars" aria-label="Captured rating distribution">
          {[5, 4, 3, 2, 1].map((value, index) => (
            <div key={value}>
              <span>{value}</span>
              <i>
                <b style={{ width: `${[80, 9, 5, 2, 1][index]}%` }} />
              </i>
            </div>
          ))}
        </div>
      </div>
      <div className="pdp-review-rail">
        {reviews.map((review) => (
          <article
            key={review.title}
            title={
              review.partial
                ? "Only this part of the review was captured."
                : undefined
            }
          >
            <ReviewStars rating={review.rating} />
            <p>{review.title}</p>
            {(review.author || review.initial) && (
              <footer className="pdp-preview-reviewer">
                <span aria-hidden="true">
                  {review.initial ?? review.author?.[0]}
                </span>
                {review.author}
                {review.date && <> · {review.date}</>}
                {review.partial && (
                  <span className="sr-only">Partially captured review</span>
                )}
              </footer>
            )}
          </article>
        ))}
      </div>
      <Link href={`/products/${productId}/reviews`}>Read all reviews</Link>
    </section>
  );
}
