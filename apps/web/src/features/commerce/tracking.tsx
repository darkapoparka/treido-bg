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
const events = [
  ["Jul 31, 6:04pm", "Successfully delivered"],
  ["Jul 31, 10:56am", "Out for delivery"],
  ["Jul 31, 1:45am", "Arrival at transport hub"],
  ["Jul 30, 8:36pm", "Departure from transport hub"],
  ["Jul 30, 2:44pm", "Arrival at transport hub"],
  ["Jul 30, 2:21am", "Departure from transport hub"],
  ["Jul 29, 4:26pm", "Arrival at transport hub"],
  ["Jul 29, 4:26pm", "Pick-up successful"],
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
  const { saveOrder, addresses } = useAccount(),
    router = useRouter(),
    params = useSearchParams();
  const [activity, setActivity] = useState(false),
    [boundary, setBoundary] = useState(""),
    [copied, setCopied] = useState(false);
  const product = catalog.products.find((p) => p.id === order.productId),
    delivered = order.status === "Delivered",
    map = params.get("map") === "1";
  const visible =
    order.status === "Ordered"
      ? [events.at(-1)!]
      : delivered
        ? [events[0], events[1], events.at(-1)!]
        : [events[2], events.at(-1)!];
  const all =
    order.status === "Ordered"
      ? [events.at(-1)!]
      : delivered
        ? events
        : events.slice(2);
  const address = addresses.find((a) => a.isDefault) ?? addresses[0];
  const mark = () =>
    saveOrder({ ...order, status: delivered ? "In transit" : "Delivered" });
  return (
    <AccountPage
      className={`tracking-detail ${map ? "tracking-map-view" : ""}`}
      onBack={() => router.back()}
    >
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
          <small>Example City</small>
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
            {order.name}
            {product ? " KITSCH" : ""}
          </small>
          <h1>
            {delivered
              ? "Delivered Aug 1"
              : order.status === "Ordered"
                ? "Label created"
                : "Arrives Jul 31–Aug 1"}
          </h1>
          <p>
            {delivered
              ? "Arrived at 8:04 AM"
              : order.status === "Ordered"
                ? "Waiting for details"
                : "In transit"}
          </p>
          <div className={`tracking-progress ${delivered ? "delivered" : ""}`}>
            <span />
          </div>
        </button>
        <section className="tracking-carrier">
          <strong className="carrier-wordmark">{order.carrier}</strong>
          <p>
            {order.carrier === "Amazon Logistics"
              ? "Amazon Logistics"
              : order.carrier}
          </p>
          <small>Tracking no.</small>
          <div>
            <span>{order.tracking}</span>
            <button
              aria-label="Copy tracking number"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(order.tracking);
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
        {order.status === "Ordered" && (
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
            <strong>Order #{order.id}</strong>
            <p>Jul 27, 2026</p>
            <div className="order-item">
              <img src={product.images[0]} alt="" />
              <span>{order.name}</span>
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
        <section className="delivery-preview">
          <h2>Delivery progress</h2>
          <div className="delivery-destination">
            <small>Delivery to</small>
            <strong>
              {address
                ? `${address.street}, ${address.city}, ${address.postalCode}`
                : "Add a delivery address"}
            </strong>
          </div>
          <Activity rows={visible} />
          {all.length > 1 && (
            <button className="muted-button" onClick={() => setActivity(true)}>
              View all activity
            </button>
          )}
        </section>
        <div className="tracking-action-panel">
          <Row
            label={delivered ? "Unmark as delivered" : "Mark as delivered"}
            onClick={mark}
          />
          <Row label="Edit tracking details" onClick={onEdit} />
          <Row
            label="Report incorrect information"
            onClick={() => setBoundary("Tracking report")}
          />
        </div>
        <h2>{product ? "Popular at KITSCH" : "Your deals"} ›</h2>
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
            <small>Example City, CA, 00000, US · {time}</small>
            <strong>{label}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}
