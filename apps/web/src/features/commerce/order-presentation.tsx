"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon, type IconName } from "../discovery/icons";
import { ProductCard } from "../discovery/components";
import type { Catalog } from "../catalog/types";
import styles from "./orders-parity.module.css";

const actionIcons: Record<string, IconName> = {
  "View order archive": "orders",
  "Connect email accounts": "link",
  "Add order manually": "plus-circle",
  "Mark order as delivered": "check",
  "Mark as delivered": "check",
  "Unmark as delivered": "close",
  "Contact merchant": "mail",
  "Copy order number": "copy",
  "Archive order": "orders",
  "Unarchive order": "orders",
  "Report an issue with this order": "alert",
  "Report this order as fraudulent": "alert",
  "Report incorrect information": "info",
  "Edit tracking details": "edit",
  Delete: "trash",
};
export function OrderSectionHeading({ label }: { label: string }) {
  return (
    <h2 className="order-section-heading">
      {label}
      <span className="order-section-chevron" aria-hidden="true">
        &rsaquo;
      </span>
    </h2>
  );
}
export function OrderAction({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      {label === "View order archive" ? (
        <svg
          className={styles.archiveActionIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4.5h16v4H4zM5.5 8.5v11h13v-11M9 12h6" />
        </svg>
      ) : label === "Mark as delivered" || label === "Unmark as delivered" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          {label === "Unmark as delivered" ? (
            <path d="m9 9 6 6m0-6-6 6" />
          ) : (
            <path d="m8 12 3 3 5-6" />
          )}
        </svg>
      ) : (
        <Icon name={actionIcons[label] ?? "info"} />
      )}
      <span>{label}</span>
    </>
  );
  const className = `account-row ${styles.action} ${label === "Delete" ? styles.destructive : ""}`;
  return href ? (
    <Link className={className} href={href}>
      {content}
    </Link>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}
export function CarrierMark({ carrier }: { carrier: string }) {
  return carrier === "Amazon Logistics" ? (
    <span className={styles.amazonMark} aria-label="Amazon">
      amazon
      <svg aria-hidden="true" viewBox="0 0 64 18">
        <path d="M3 3c18 13 40 9 54-1m-7-1 9 1-5 8" />
      </svg>
    </span>
  ) : carrier.startsWith("DHL") ? (
    <img
      className={styles.dhlMark}
      src="/api/reference-media/widget-dhl-logo"
      alt="DHL"
    />
  ) : (
    <span className={styles.genericCarrier}>{carrier}</span>
  );
}
export function OrderProgress({
  phase,
  carrier = "Amazon Logistics",
}: {
  phase: "waiting" | "label" | "transit" | "delivered";
  carrier?: string;
}) {
  return (
    <div
      className={styles.progress}
      data-order-phase={phase}
      aria-label={
        phase === "waiting"
          ? "Waiting for carrier details"
          : phase === "label"
            ? "Shipping label created"
            : phase === "transit"
              ? "Package in transit"
              : "Package delivered"
      }
    >
      <span className={styles.progressFill} />
      {phase === "waiting" ? (
        <img
          className={styles.waitingParcel}
          src="/api/reference-media/parcel"
          alt=""
        />
      ) : (
        <>
          <span className={styles.progressCarrier}>
            <CarrierMark carrier={carrier} />
          </span>
          <span className={styles.progressMarker}>
            {phase === "delivered" ? (
              <Icon name="check" />
            ) : phase === "label" ? (
              <svg
                className={styles.shippingLabelMark}
                viewBox="0 0 20 24"
                aria-hidden="true"
              >
                <rect x="0.75" y="0.75" width="18.5" height="22.5" rx="1" />
                <path d="M4 5h7M4 8h10M4 11h5M4 15v5m2-5v5m2-5v5m2-5v5m2-5v5m2-5v5m2-5v5" />
              </svg>
            ) : (
              <img src="/api/reference-media/parcel" alt="" />
            )}
          </span>
        </>
      )}
    </div>
  );
}

export function OrderBrand({
  number,
  tracking = false,
}: {
  number: string;
  tracking?: boolean;
}) {
  return (
    <div
      className={`${styles.orderBrand} ${tracking ? styles.trackingBrand : styles.detailBrand}`}
    >
      <img
        className={styles.orderBrandMark}
        src="/api/reference-media/order-brand-mark"
        alt="KITSCH"
      />
      {tracking ? (
        <p className={styles.orderBrandDate}>#{number} · Jul 27, 2026</p>
      ) : (
        <div className={styles.orderBrandDate}>
          <strong>Order #{number}</strong>
          <p>Jul 27, 2026</p>
        </div>
      )}
    </div>
  );
}

export function ManageOrderIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4h6v6m0-6-9 9m0-8H7a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-4" />
    </svg>
  );
}

export function OrderRecommendations({ catalog }: { catalog: Catalog }) {
  return (
    <>
      <h2 className={styles.recommendationHeading}>
        <Link href="/stores/kitsch">
          Popular at KITSCH <span aria-hidden="true">›</span>
        </Link>
      </h2>
      <div className={`product-rail ${styles.orderRecommendations}`}>
        {[
          ["black-conditioner-bag", "2.8K"],
          ["chocolate-body-bag", "750"],
          ["shower-caddy", ""],
          ["solid-shave-butter", ""],
        ].flatMap(([id, ratingCount]) => {
          const item = catalog.products.find((product) => product.id === id);
          return item
            ? [
                <ProductCard
                  key={id}
                  product={{
                    ...item,
                    ratingCount: ratingCount || item.ratingCount,
                  }}
                />,
              ]
            : [];
        })}
      </div>
    </>
  );
}
