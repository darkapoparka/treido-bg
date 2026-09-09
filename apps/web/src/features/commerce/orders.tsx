"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import { Sheet, ProductCard } from "../discovery/components";
import { AccountPage, Row, Boundary } from "../account/forms";
import { useAccount, type ReferenceOrder } from "../account/state";
export function OrdersPage({
  catalog,
  archive = false,
  history = false,
}: {
  catalog: Catalog;
  archive?: boolean;
  history?: boolean;
}) {
  const { orders } = useAccount();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const visible = orders.filter(
    (o) =>
      (history || o.archived === archive) &&
      `${o.name} ${o.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <AccountPage
      title={history ? "Order history" : archive ? "Archived orders" : "Orders"}
      action={
        <div className="order-actions">
          <button aria-label="Search orders" onClick={() => setSearch(!search)}>
            ⌕
          </button>
          <button aria-label="More order options" onClick={() => setMenu(true)}>
            •••
          </button>
        </div>
      }
    >
      {search && (
        <label className="form-field">
          Search orders
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your orders"
          />
        </label>
      )}
      {visible.map((o) => {
        const p = catalog.products.find((p) => p.id === o.productId);
        return (
          <Link
            className="account-panel tracking-card"
            href={`/orders/${o.id}`}
            key={o.id}
          >
            <div>
              <strong>KITSCH</strong>
              <h2>
                {o.status === "Delivered"
                  ? "Delivered Aug 1"
                  : o.status === "Ordered"
                    ? "Order placed"
                    : "Expected by Aug 3"}
              </h2>
              <div className="tracking-line">
                <span
                  style={{ width: o.status === "Delivered" ? "100%" : "35%" }}
                >
                  ▣
                </span>
              </div>
            </div>
            {p && <img src={p.images[0]} alt={o.name} />}
          </Link>
        );
      })}
      {!visible.length && (
        <div className="notification-empty">
          <h2>{query ? "No orders found" : "No orders yet"}</h2>
          <p>
            {query
              ? "Try another name or order number."
              : "Your tracked orders will appear here."}
          </p>
        </div>
      )}
      {(archive || history) && (
        <>
          <h2>Buy again ›</h2>
          <div className="product-rail">
            {catalog.products
              .filter((p) => orders.some((o) => o.productId === p.id))
              .map((p) => (
                <ProductCard product={p} key={p.id} compact />
              ))}
          </div>
        </>
      )}
      <Link className="form-cancel order-archive-link" href="/orders/archived">
        View archived orders
      </Link>
      <Sheet open={menu} title="More options" onClose={() => setMenu(false)}>
        <Row label="View order archive" href="/orders/archived" />
        <Row label="Connect email accounts" href="/account/connections" />
        <Row label="Add order manually" href="/orders/new" />
      </Sheet>
    </AccountPage>
  );
}
export function OrderDetail({ catalog, id }: { catalog: Catalog; id: string }) {
  const { orders, saveOrder } = useAccount();
  const order = orders.find((o) => o.id === id);
  const [menu, setMenu] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [progress, setProgress] = useState(false);
  const [edit, setEdit] = useState(false);
  const [boundary, setBoundary] = useState(false);
  const [copied, setCopied] = useState("");
  if (!order)
    return (
      <AccountPage title="Order not found">
        <p>This reference order is not available in this page session.</p>
        <Link href="/orders">Back to orders</Link>
      </AccountPage>
    );
  const product = catalog.products.find((p) => p.id === order.productId);
  return (
    <AccountPage>
      <section
        className="order-hero"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff88,#ffffffaa),url(/api/reference-media/order-hero)",
        }}
      >
        <button
          className="order-more"
          onClick={() => setMenu(true)}
          aria-label="Order options"
        >
          •••
        </button>
        <span className="order-store-mark">/kit·sch/</span>
        <strong>Order #{order.id}</strong>
        <p>Jul 27, 2026</p>
      </section>
      {order.status === "Delivered" && (
        <Link
          className="account-panel review-invitation"
          href={`/orders/${id}/review`}
        >
          <span>
            <strong>Review your order</strong>
            <small>Tell us about your purchase</small>
          </span>
          <span className="review-stars">★★★★★</span>
        </Link>
      )}
      <button
        className="account-panel order-status"
        onClick={() => setProgress(true)}
      >
        <span>
          <strong>
            {order.status === "Delivered"
              ? "Delivered Aug 1"
              : "Expected by Aug 3"}
          </strong>
          <small>
            {order.status === "Delivered" ? "Arrived at 8:04 AM" : order.status}
          </small>
        </span>
        {product && <img src={product.images[0]} alt="" />}
        <span className="tracking-line status-tracking">
          <span
            style={{ width: order.status === "Delivered" ? "100%" : "35%" }}
          >
            ▣
          </span>
        </span>
      </button>
      <div className="account-panel">
        <div className="order-item">
          {product && <img src={product.images[0]} alt="" />}
          <div>
            <strong>{order.name}</strong>
            <p>{product ? formatMoney(product.price) : "Tracked package"}</p>
          </div>
          {product && order.status === "Delivered" && (
            <Link className="pill" href={`/products/${product.id}`}>
              Buy again
            </Link>
          )}
        </div>
        <button className="muted-button" onClick={() => setBoundary(true)}>
          ↗ Manage your order
        </button>
        <Link className="muted-button" href={`/orders/${id}/receipt`}>
          View receipt
        </Link>
      </div>
      <h2>Popular at KITSCH ›</h2>
      <div className="product-rail">
        {catalog.products
          .filter((p) => p.storeId === "kitsch")
          .slice(0, 4)
          .map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
      </div>
      <Sheet open={menu} title="Manage order" onClose={() => setMenu(false)}>
        <Row
          label="Copy order number"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(order.id);
              setCopied("Order number copied");
            } catch {
              setCopied(`Order number: ${order.id}`);
            }
          }}
        />
        {copied && <p role="status">{copied}</p>}
        <Row
          label="Mark as delivered"
          onClick={() => {
            setMenu(false);
            setDelivered(true);
          }}
        />
        <Row
          label="Update tracking details"
          onClick={() => {
            setMenu(false);
            setEdit(true);
          }}
        />
        <Row
          label={order.archived ? "Unarchive order" : "Archive order"}
          onClick={() => {
            saveOrder({ ...order, archived: !order.archived });
            setMenu(false);
          }}
        />
      </Sheet>
      <Sheet
        open={delivered}
        title="Mark as delivered?"
        onClose={() => setDelivered(false)}
      >
        <p className="form-note">Have you received this package?</p>
        <button
          className="primary form-submit"
          onClick={() => {
            saveOrder({ ...order, status: "Delivered" });
            setDelivered(false);
          }}
        >
          Mark as delivered
        </button>
      </Sheet>
      <Sheet
        open={progress}
        title="Delivery progress"
        onClose={() => setProgress(false)}
      >
        <div className="delivery-timeline">
          {[
            "Order placed",
            "Shipped",
            "In transit",
            "Out for delivery",
            "Delivered",
          ].map((s, i) => (
            <div key={s}>
              <span
                className={
                  i <=
                  (order.status === "Delivered"
                    ? 4
                    : order.status === "In transit"
                      ? 2
                      : 0)
                    ? "complete"
                    : ""
                }
              >
                ●
              </span>
              <div>
                <strong>{s}</strong>
                <p>
                  {i === 0
                    ? "Jul 27"
                    : i === 4 && order.status === "Delivered"
                      ? "Aug 1 · 8:04 AM"
                      : i === 1
                        ? "Package shipped"
                        : i === 2
                          ? "In transit"
                          : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="form-note">
          {order.carrier} · {order.tracking}
        </p>
      </Sheet>
      <Sheet
        open={edit}
        title="Tracking details"
        onClose={() => setEdit(false)}
      >
        <ManualOrderForm
          initial={order}
          onSave={(v) => {
            saveOrder(v);
            setEdit(false);
          }}
        />
      </Sheet>
      <Boundary
        open={boundary}
        onClose={() => setBoundary(false)}
        kind="Order management"
      />
    </AccountPage>
  );
}
function ManualOrderForm({
  initial,
  onSave,
}: {
  initial: ReferenceOrder;
  onSave: (o: ReferenceOrder) => void;
}) {
  const [value, setValue] = useState(initial);
  const [carrierQuery, setCarrierQuery] = useState("");
  const [carrierOpen, setCarrierOpen] = useState(false);
  return (
    <form
      className="account-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(value);
      }}
    >
      <h2>Manually add order</h2>
      <label className="form-field">
        Tracking number
        <input
          required
          maxLength={80}
          value={value.tracking}
          onChange={(e) => setValue({ ...value, tracking: e.target.value })}
        />
      </label>
      <label className="form-field">
        Package name
        <input
          required
          maxLength={100}
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
        />
      </label>
      <button
        type="button"
        className="form-field carrier-selector"
        onClick={() => setCarrierOpen(!carrierOpen)}
      >
        Carrier <strong>{value.carrier || "Select carrier"}</strong>
      </button>
      {carrierOpen && (
        <div className="carrier-search">
          <label className="form-field">
            Search carriers
            <input
              value={carrierQuery}
              onChange={(e) => setCarrierQuery(e.target.value)}
              placeholder="Search carriers"
            />
          </label>
          <h3>Recommended carriers</h3>
          {[
            "DHL Active Tracing",
            "DHL Benelux",
            "DHL 2-Man-Handling",
            "DHL eCommerce",
            "DHL Express",
            "USPS",
            "FedEx",
            "UPS",
            "Other",
          ]
            .filter((c) => c.toLowerCase().includes(carrierQuery.toLowerCase()))
            .map((c) => (
              <button
                type="button"
                className="account-row"
                key={c}
                onClick={() => {
                  setValue({ ...value, carrier: c });
                  setCarrierOpen(false);
                }}
              >
                {c}
                <span className={c.startsWith("DHL") ? "dhl-mark" : ""}>
                  {c.startsWith("DHL") ? "DHL" : "›"}
                </span>
              </button>
            ))}
        </div>
      )}
      <p className="form-note">
        Saves a local tracking entry. It does not contact a carrier.
      </p>
      <button className="primary form-submit">Save order</button>
    </form>
  );
}
export function NewOrder() {
  const { saveOrder } = useAccount();
  const [created, setCreated] = useState("");
  return (
    <AccountPage title="Add order manually">
      {created ? (
        <>
          <p role="status">Order added.</p>
          <Link className="primary form-submit" href={`/orders/${created}`}>
            View order
          </Link>
        </>
      ) : (
        <ManualOrderForm
          initial={{
            id: "",
            productId: "",
            name: "",
            carrier: "DHL",
            tracking: "",
            status: "Ordered",
            archived: false,
            rating: 0,
            review: "",
          }}
          onSave={(o) => {
            const id = `REF-${crypto.randomUUID().slice(0, 8)}`;
            saveOrder({ ...o, id });
            setCreated(id);
          }}
        />
      )}
    </AccountPage>
  );
}
export function OrderReview({ id }: { id: string }) {
  const { orders, saveOrder } = useAccount();
  const order = orders.find((o) => o.id === id);
  const [rating, setRating] = useState(order?.rating ?? 0);
  const [review, setReview] = useState(order?.review ?? "");
  const [saved, setSaved] = useState(false);
  return (
    <AccountPage title="Review your order">
      {order ? (
        <>
          <h2>{order.name}</h2>
          <form
            className="account-form"
            onSubmit={(e) => {
              e.preventDefault();
              saveOrder({ ...order, rating, review });
              setSaved(true);
            }}
          >
            <div className="rating-picker">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  aria-label={`${n} stars`}
                  aria-pressed={rating === n}
                  onClick={() => setRating(n)}
                  key={n}
                  className={n <= rating ? "selected" : ""}
                >
                  ★
                </button>
              ))}
            </div>
            <label className="form-field">
              Tell us about your purchase
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={2000}
              />
            </label>
            <button className="primary form-submit" disabled={!rating}>
              Save review
            </button>
            {saved && (
              <p role="status">
                Review saved in this page session. It has not been published.
              </p>
            )}
          </form>
        </>
      ) : (
        <p>Order not found.</p>
      )}
    </AccountPage>
  );
}
export function Receipt({ catalog, id }: { catalog: Catalog; id: string }) {
  const { orders, addresses } = useAccount();
  const order = orders.find((o) => o.id === id);
  const product = catalog.products.find((p) => p.id === order?.productId);
  const address = addresses.find((a) => a.isDefault) ?? addresses[0];
  const amount = product?.price.amount ?? 0;
  const money = (n: number) => formatMoney({ amount: n, currency: "USD" });
  const [shareMessage, setShareMessage] = useState("");
  return (
    <AccountPage
      title="Receipt"
      className="receipt-page"
      action={
        <button
          className="receipt-share"
          aria-label="Share receipt"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setShareMessage("Receipt link copied");
            } catch {
              setShareMessage("Sharing is not available in this browser.");
            }
          }}
        >
          ↥
        </button>
      }
    >
      {order ? (
        <>
          <p>Order #{order.id}</p>
          <p className="form-note">Jul 27, 2026</p>
          {shareMessage && <p role="status">{shareMessage}</p>}
          <div className="receipt-product">
            {product && <img src={product.images[0]} alt="" />}
            <strong>{order.name}</strong>
            <span>{money(amount)}</span>
          </div>
          <div className="receipt-totals">
            <p>
              <span>Subtotal</span>
              <span>{money(amount)}</span>
            </p>
            <p>
              <span>Shipping</span>
              <span>{money(682)}</span>
            </p>
            <p>
              <span>Taxes</span>
              <span>{money(35)}</span>
            </p>
            <p className="receipt-total">
              <strong>Total</strong>
              <strong>{money(amount + 717)}</strong>
            </p>
          </div>
          <section className="receipt-section">
            <h2>Payment method</h2>
            <p className="receipt-payment">
              <strong>shop Pay</strong>
              <span>{money(amount + 717)}</span>
            </p>
            <p>VISA ···· 4242</p>
          </section>
          <section className="receipt-section">
            <h2>Shipping address</h2>
            {address ? (
              <p>
                {address.firstName} {address.lastName}
                <br />
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
                <br />
                {address.country}
              </p>
            ) : (
              <p>No shipping address in this reference session.</p>
            )}
          </section>
          <p className="form-note"></p>
        </>
      ) : (
        <p>Receipt not found.</p>
      )}
    </AccountPage>
  );
}
