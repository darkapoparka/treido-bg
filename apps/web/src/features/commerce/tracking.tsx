"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AccountPage, Row, Boundary } from "../account/forms";
import { Sheet, ProductCard } from "../discovery/components";
import { Icon } from "../discovery/icons";
import { useAccount, type ReferenceOrder } from "../account/state";
import type { Catalog } from "../catalog/types";
import { capturedReceipts } from "./receipt-data";
import { shopSourceAddress } from "./source-fixtures";
const events = [
  ["Milpitas, CA, 95035, US · Jul 31, 6:04pm", "Successfully delivered"],
  ["Milpitas, CA, 95035, US · Jul 31, 10:56am", "Out for delivery"],
  ["Milpitas, CA, 95035, US · Jul 31, 1:45am", "Arrival at transport hub"],
  ["Oakley, CA, 94561, US · Jul 30, 8:36pm", "Departure from transport hub"],
  ["Oakley, CA, 94561, US · Jul 30, 2:44pm", "Arrival at transport hub"],
  ["Jurupa Valley, CA, US · Jul 30, 2:21am", "Departure from transport hub"],
  ["Jurupa Valley, CA, US · Jul 29, 4:26pm", "Arrival at transport hub"],
  ["Jurupa Valley, CA, US · Jul 29, 4:26pm", "Pick-up successful"],
  ["Jul 28, 4:16am", "Parcel data submitted to carrier"],
];
export function TrackingDetail({
  catalog,
  order,
  onEdit,
}: {
  catalog: Catalog;
  order: ReferenceOrder;
  onEdit: () => void;
}) {
  const { saveOrder } = useAccount(),
    router = useRouter(),
    params = useSearchParams();
  const [activity, setActivity] = useState(false),
    [boundary, setBoundary] = useState(""),
    [copied, setCopied] = useState(false),
    [statusToast, setStatusToast] = useState(""),
    [celebrate, setCelebrate] = useState(false);
  const product = catalog.products.find((p) => p.id === order.productId),
    delivered = order.status === "Delivered",
    waiting = order.status === "Ordered" && Boolean(product),
    manualLabel = order.status === "Ordered" && !product,
    map = params.get("map") === "1";
  const sourceReceipt = capturedReceipts[order.id];
  const displayOrderNumber = sourceReceipt?.displayOrderNumber ?? order.id;
  const sourceCarrier = order.carrier;
  const sourceTracking = order.tracking;
  const visible = waiting
    ? []
    : manualLabel
      ? [events.at(-1)!]
      : delivered
        ? [events[0], events[1], events.at(-1)!]
        : [events[6], events.at(-1)!];
  const all = waiting ? [] : manualLabel ? [events.at(-1)!] : events;
  const mark = () => {
    const next = delivered ? "In transit" : "Delivered";
    saveOrder({ ...order, status: next });
    setStatusToast(
      next === "Delivered" ? "Marked as delivered" : "Unmarked as delivered",
    );
    if (next === "Delivered") {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 1400);
    }
    window.setTimeout(() => setStatusToast(""), 1800);
  };
  return (
    <AccountPage
      className={`tracking-detail ${map ? "tracking-map-view" : ""}`}
      onBack={() => router.back()}
    >
      {celebrate && (
        <div className="delivery-confetti" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      )}
      {map && (
        <div className="tracking-map" aria-label="Illustrative delivery map">
          <img
            className="map-fragment"
            src="/api/reference-media/tracking-map-fragment"
            alt=""
          />
          <svg viewBox="0 0 393 230" aria-hidden="true">
            <path
              d="M244 0 214 106 196 184"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
          {product && (
            <img className="map-product" src={product.images[0]} alt="" />
          )}
          <span className="map-location" />
          <small>{delivered ? "Milpitas" : "Jurupa Valley"}</small>
        </div>
      )}
      <div className="tracking-body">
        <button
          className="tracking-status-card"
          onClick={() => {
            const q = new URLSearchParams(params.toString());
            q.set("map", map ? "0" : "1");
            router.push(`?${q}`, { scroll: false });
          }}
        >
          <small>
            {product
              ? delivered
                ? `${order.name} KITSCH`
                : "KITSCH"
              : order.name}
          </small>
          <h1>
            {delivered
              ? product
                ? "Delivered Aug 1"
                : "Delivered today"
              : waiting
                ? "Expected by Aug 3"
                : manualLabel
                  ? "Label created"
                  : "Arrives Jul 31–Aug 1"}
          </h1>
          {!manualLabel && (
            <p>
              {delivered
                ? product
                  ? "Arrived at 8:04 AM"
                  : "Arrived at 7:34 PM"
                : waiting
                  ? "Waiting for details"
                  : "In transit"}
            </p>
          )}
          <div className={`tracking-progress ${delivered ? "delivered" : ""}`}>
            <span />
          </div>
        </button>
        {!waiting && (
          <section className="tracking-carrier">
            <strong className="carrier-wordmark">
              {sourceCarrier === "Amazon Logistics" ? "amazon" : sourceCarrier}
            </strong>
            <p>{sourceCarrier}</p>
            <small>Tracking no.</small>
            <div>
              <span>{sourceTracking}</span>
              <button
                aria-label="Copy tracking number"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(sourceTracking);
                    setCopied(true);
                  } catch {
                    setBoundary("Clipboard");
                  }
                }}
              >
                <Icon name="copy" />
              </button>
              <button
                aria-label="Open carrier tracking"
                onClick={() => setBoundary("Carrier tracking")}
              >
                <Icon name="share" />
              </button>
            </div>
            {copied && <p role="status">Tracking number copied</p>}
          </section>
        )}
        {manualLabel && (
          <section className="tracking-empty">
            <h2>No delivery updates</h2>
            <p>
              We’re waiting to receive delivery updates from the carrier. Check
              tracking details are correct.
            </p>
            <button className="muted-button" onClick={onEdit}>
              Edit tracking details
            </button>
          </section>
        )}
        {product && (
          <section
            className="tracking-order-card"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff88,#ffffffaa),url(/api/reference-media/order-hero)",
            }}
          >
            <span className="order-store-mark">/kit·sch/</span>
            <strong>Order #{displayOrderNumber}</strong>
            <p>Jul 27, 2026</p>
            <div className="order-item">
              <img src={product.images[0]} alt="" />
              <span>
                {order.name}
                <small>
                  {sourceReceipt
                    ? `$${(sourceReceipt.itemAmount / 100).toFixed(2)}`
                    : ""}
                </small>
              </span>
            </div>
            <button
              className="muted-button"
              onClick={() => setBoundary("Order management")}
            >
              Manage your order
            </button>
            <Link className="muted-button" href="/stores/kitsch">
              Visit store
            </Link>
            <Link className="muted-button" href={`/orders/${order.id}`}>
              View order details
            </Link>
          </section>
        )}
        {!manualLabel && (
          <section className="delivery-preview">
            <h2>Delivery progress</h2>
            <div className="delivery-destination">
              <small>Delivery to</small>
              <strong>
                {shopSourceAddress.street}, {shopSourceAddress.city},{" "}
                {shopSourceAddress.postalCode}
              </strong>
            </div>
            {visible.length > 0 && <Activity rows={visible} />}
            {all.length > visible.length && (
              <button
                className="muted-button"
                onClick={() => setActivity(true)}
              >
                View all activity
              </button>
            )}
          </section>
        )}
        <div className="tracking-action-panel">
          {!waiting && (
            <Row
              label={delivered ? "Unmark as delivered" : "Mark as delivered"}
              onClick={mark}
            />
          )}
          {!waiting && !manualLabel && !delivered && (
            <Row label="Edit tracking details" onClick={onEdit} />
          )}
          <Row
            label="Report incorrect information"
            onClick={() => setBoundary("Tracking report")}
          />
        </div>
        <h2>{product ? "Popular at KITSCH" : "Your deals"} ›</h2>
        {product ? (
          <div className="product-rail">
            {[
              "black-conditioner-bag",
              "chocolate-body-bag",
              "shower-caddy",
              "solid-shave-butter",
            ]
              .map((id) => catalog.products.find((p) => p.id === id))
              .filter((p) => !!p)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        ) : (
          <div className="tracking-deal-rail">
            {[0, 2].map((deal) => (
              <img
                key={deal}
                src={`/api/reference-media/order-deal-${deal}`}
                alt=""
              />
            ))}
          </div>
        )}
        {statusToast && (
          <p className="order-action-toast" role="status">
            {statusToast}
          </p>
        )}
      </div>
      <Sheet
        open={activity}
        title="Delivery progress"
        className="full-activity-sheet"
        onClose={() => setActivity(false)}
      >
        <Activity rows={all} />
      </Sheet>
      <Boundary
        open={!!boundary}
        kind={boundary}
        onClose={() => setBoundary("")}
      />
    </AccountPage>
  );
}
function Activity({ rows }: { rows: string[][] }) {
  return (
    <div className="source-activity">
      {rows.map(([time, label], i) => (
        <div key={`${time}-${label}`}>
          <i>{i === 0 ? "●" : ""}</i>
          <span>
            <small>{time}</small>
            <strong>{label}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}
