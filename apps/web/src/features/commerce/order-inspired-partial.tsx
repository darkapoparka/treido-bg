/* eslint-disable @next/next/no-img-element */
import styles from "./orders-parity.module.css";

export function OrderInspiredPartial() {
  return (
    <div
      aria-label="Inspired by your order recommendations"
      className={styles.inspiredPartialRail}
      data-order-inspired-rail
      role="group"
    >
      <div className={styles.inspiredPartialCard} data-order-inspired-card>
        <img
          alt=""
          aria-hidden="true"
          height="100"
          src="/api/reference-media/order-inspired-card-photo"
          width="352"
        />
        <span className={styles.inspiredPartialRating}>★ (11.4K)</span>
      </div>
      <div className={styles.inspiredPartialNext} aria-hidden="true">
        <img
          alt=""
          height="100"
          src="/api/reference-media/order-inspired-next-fragment"
          width="16"
        />
      </div>
    </div>
  );
}
