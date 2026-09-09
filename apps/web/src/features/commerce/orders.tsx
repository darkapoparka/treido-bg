"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TrackingDetail } from "./tracking";
import type { Catalog } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import { Icon } from "../discovery/icons";
import { capturedReceipts } from "./receipt-data";
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
  const [deal, setDeal] = useState<number | null>(null);
  const visible = orders.filter(
    (o) =>
      (history || o.archived === archive) &&
      `${o.name} ${o.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <AccountPage
      back={archive || history}
      title={history ? "Order history" : archive ? "Archived" : "Orders"}
      className={archive ? "archive-page" : "source-orders-page"}
      action={
        !archive && (
          <div className="order-actions">
            <button
              aria-label="Search orders"
              onClick={() => setSearch(!search)}
            >
              ⌕
            </button>
            <button
              aria-label="More order options"
              onClick={() => setMenu(true)}
            >
              •••
            </button>
          </div>
        )
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
        if (archive)
          return (
            <Link
              key={o.id}
              className="archive-order-row"
              href={`/orders/${o.id}`}
            >
              {p && <img src={p.images[0]} alt="" />}
              <span>
                <strong>Ordered Jul 27</strong>
                <small>
                  KITSCH · 1 item ·{" "}
                  {formatMoney({
                    amount:
                      capturedReceipts[o.id]?.total ?? p?.price.amount ?? 0,
                    currency: "USD",
                  })}
                </small>
              </span>
            </Link>
          );
        if (history)
          return (
            <Link
              className="order-history-row"
              key={o.id}
              href={`/orders/${o.id}`}
            >
              {p && <img src={p.images[0]} alt="" />}
              <span>
                <strong>{o.name}</strong>
                <small>
                  {o.status === "Delivered" ? "Delivered" : "Order placed"}
                </small>
              </span>
              <small>Jul 27</small>
            </Link>
          );
        return (
          <Link
            className="account-panel tracking-card"
            href={`/orders/${o.id}`}
            key={o.id}
          >
            <div>
              <strong className="order-seller-label">
                {p && <img src="/api/reference-media/kitsch-logo" alt="" />}
                {p ? "KITSCH" : o.name}
              </strong>
              <h2>
                {o.status === "Delivered"
                  ? "Review your order"
                  : o.status === "Ordered"
                    ? p
                      ? "Order placed"
                      : "Label created"
                    : "Expected by Aug 3"}
              </h2>
              {o.status === "Delivered" ? (
                <span className="review-stars">★★★★★</span>
              ) : (
                <div className="tracking-line">
                  <span
                    style={{ width: o.status === "Ordered" ? "10%" : "35%" }}
                  >
                    <img src="/api/reference-media/parcel" alt="" />
                  </span>
                </div>
              )}
            </div>
            {p && <img src={p.images[0]} alt={o.name} />}
          </Link>
        );
      })}
      {!visible.length && (
        <div
          className={
            archive || query ? "notification-empty" : "order-empty-source"
          }
        >
          {!archive && !query && (
            <img src="/api/reference-media/order-empty-art" alt="" />
          )}
          {archive && !query && (
            <img
              className="archive-empty-package"
              src="/api/reference-media/onboarding-package"
              alt=""
            />
          )}
          <h2>
            {query
              ? "No orders found"
              : archive
                ? "No archived orders yet"
                : "Track all your orders here"}
          </h2>
          <p>
            {query
              ? "Try another name or order number."
              : archive
                ? "Clean up your orders tab, by moving your past orders to the archive."
                : "Connect your account, and Shop will automatically track your orders."}
          </p>
          {!archive && !query && (
            <>
              <Link className="primary form-submit" href="/account/connections">
                Connect account
              </Link>
              <Link className="form-cancel" href="/orders/new">
                Add a package manually
              </Link>
            </>
          )}
        </div>
      )}
      {history && (
        <div className="history-email-link">
          <Link href="/account/connections">
            Connect email to see more deliveries ›
          </Link>
        </div>
      )}
      {!history && !archive && visible.some((o) => o.status !== "Ordered") && (
        <>
          <section className="orders-deals">
            <h2>Deals based on your orders ›</h2>
            <div className="orders-deal-grid">
              {[5, 30, 5, 25, 25, 35].map((amount, i) => (
                <button
                  key={i}
                  aria-label={`View deal ${i + 1}`}
                  onClick={() => setDeal(i)}
                >
                  <img src={`/api/reference-media/order-deal-${i}`} alt="" />
                  <span>Save ${amount}</span>
                  <i>
                    <Icon name="cart" />
                  </i>
                </button>
              ))}
            </div>
          </section>
          <section className="orders-past">
            <h2>Past orders ›</h2>
            {orders
              .filter((o) => o.archived)
              .map((o) => (
                <Link href={`/orders/${o.id}`} key={o.id}>
                  <img src="/api/reference-media/parcel" alt="" />
                  <span>
                    Delivered Jul 28<small>{o.name}</small>
                  </span>
                </Link>
              ))}
          </section>
        </>
      )}
      <Sheet
        open={deal !== null}
        title="Your deal"
        onClose={() => setDeal(null)}
      >
        {deal !== null && (
          <img
            className="deal-preview-image"
            src={`/api/reference-media/order-deal-${deal}`}
            alt="Selected deal"
          />
        )}
        <Link className="primary form-submit" href="/search">
          Shop products
        </Link>
      </Sheet>
      {!archive && !history && !visible.some((o) => o.status !== "Ordered") && (
        <Link
          className="form-cancel order-archive-link"
          href="/orders/archived"
        >
          View archived orders
        </Link>
      )}
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
  const router = useRouter(),
    params = useSearchParams();
  const progress = params.get("view") === "tracking";
  const setProgress = () =>
    router.push(`/orders/${id}?view=tracking`, { scroll: false });
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
  if (progress)
    return (
      <>
        <TrackingDetail
          catalog={catalog}
          order={order}
          onEdit={() => setEdit(true)}
        />
        <Sheet
          open={edit}
          title="Edit tracking details"
          onClose={() => setEdit(false)}
        >
          <ManualOrderForm
            initial={order}
            editing
            onSave={(v) => {
              saveOrder(v);
              setEdit(false);
            }}
          />
        </Sheet>
      </>
    );
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
      <button className="account-panel order-status" onClick={setProgress}>
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
      <Sheet open={menu} title="Your order" onClose={() => setMenu(false)}>
        {capturedReceipts[id] && (
          <Row
            label="View order confirmation"
            href={`/orders/${id}/confirmation`}
          />
        )}
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
          label="Contact merchant"
          onClick={() => {
            setMenu(false);
            setBoundary(true);
          }}
        />
        <Row
          label={
            order.status === "Delivered"
              ? "Unmark as delivered"
              : "Mark order as delivered"
          }
          onClick={() => {
            setMenu(false);
            if (order.status === "Delivered")
              saveOrder({ ...order, status: "In transit" });
            else setDelivered(true);
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
        <Row
          label="Report an issue with this order"
          onClick={() => {
            setMenu(false);
            setBoundary(true);
          }}
        />
        <Row
          label="Report this order as fraudulent"
          onClick={() => {
            setMenu(false);
            setBoundary(true);
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
        open={edit}
        title="Edit tracking details"
        onClose={() => setEdit(false)}
      >
        <ManualOrderForm
          initial={order}
          editing
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
  editing = false,
}: {
  editing?: boolean;
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
      {!editing && <h2>Manually add order</h2>}
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
      <label className="form-field carrier-selector">
        Carrier
        <input
          aria-label="Carrier"
          value={carrierOpen ? carrierQuery : value.carrier}
          onFocus={() => {
            setCarrierQuery(value.carrier);
            setCarrierOpen(true);
          }}
          onChange={(e) => {
            setCarrierQuery(e.target.value);
            setCarrierOpen(true);
          }}
        />
      </label>
      {carrierOpen && (
        <div className="carrier-search">
          <h3>Recommended carriers</h3>
          {[
            "DHL Active Tracing",
            "DHL Benelux",
            "DHL 2-Man-Handling",
            "DHL eCommerce",
            "DHL eCommerce Vietnam",
            "DHL Spain Domestic",
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
      <button
        className="primary form-submit"
        disabled={
          !value.tracking.trim() ||
          !value.name.trim() ||
          !value.carrier.trim() ||
          (editing &&
            value.tracking === initial.tracking &&
            value.name === initial.name &&
            value.carrier === initial.carrier)
        }
      >
        {editing ? "Update tracking details" : "Add order"}
      </button>
      {!editing && (
        <div className="forward-orders">
          <p>or</p>
          <h2>Forward shipping emails</h2>
          <a href="mailto:track-reference@example.test">
            track-reference@example.test
          </a>
          <p>
            Copy your unique address to forward shipping emails and Shop will
            track your orders. Learn more
          </p>
          <a
            className="primary form-submit"
            href="mailto:track-reference@example.test"
          >
            Open email app
          </a>
          <Link href="/account/connections">
            Track orders automatically instead
          </Link>
        </div>
      )}
    </form>
  );
}
export function NewOrder() {
  const { saveOrder } = useAccount();
  const router = useRouter();
  return (
    <AccountPage title="Add order manually">
      <ManualOrderForm
        initial={{
          id: "",
          productId: "",
          name: "",
          carrier: "",
          tracking: "",
          status: "Ordered",
          archived: false,
          rating: 0,
          review: "",
        }}
        onSave={(o) => {
          const id = `REF-${crypto.randomUUID().slice(0, 8)}`;
          saveOrder({ ...o, id });
          router.push("/orders");
        }}
      />
    </AccountPage>
  );
}
export function OrderReview({ id, catalog }: { id: string; catalog: Catalog }) {
  const { orders, saveOrder, profile } = useAccount();
  const order = orders.find((o) => o.id === id);
  const product = catalog.products.find((p) => p.id === order?.productId);
  const [rating, setRating] = useState(order?.rating ?? 0);
  const [review, setReview] = useState(order?.review ?? "");
  const [saved, setSaved] = useState(false);
  const editing = !!order?.rating;
  return (
    <AccountPage dock={false} className="order-review-page">
      <Link
        className="review-close"
        href={`/orders/${id}`}
        aria-label="Close review"
      >
        <Icon name="close" />
      </Link>
      <h1>{editing ? "Edit your review" : "Review your order"}</h1>
      {!editing && <p className="review-count">1 of 1 products</p>}
      {order && product ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveOrder({ ...order, rating, review });
            setSaved(true);
          }}
        >
          <div className="review-product">
            <img src={product.images[0]} alt={order.name} />
            <div>
              <small>KITSCH</small>
              <p>{order.name}</p>
              <span>
                {formatMoney({
                  amount:
                    capturedReceipts[id]?.itemAmount ?? product.price.amount,
                  currency: "USD",
                })}
              </span>
              <div className="rating-picker">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    aria-label={`${n} stars`}
                    aria-pressed={rating >= n}
                    className={rating >= n ? "selected" : ""}
                    onClick={() => setRating(n)}
                    key={n}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
          <label className="review-text">
            <strong>Tell us about the product</strong>
            <textarea
              aria-label="Tell us about the product"
              placeholder="What did you like or dislike?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              maxLength={2000}
            />
          </label>
          <p className="review-identity">
            Reviewing as {profile.firstName}{" "}
            <span title="Your public profile name">?</span>
          </p>
          <button className="primary review-submit" disabled={!rating}>
            {editing ? "Update review" : "Submit"}
          </button>
          {saved && (
            <p role="status" className="form-note">
              Review saved locally. It has not been published.
            </p>
          )}
        </form>
      ) : (
        <p>Order not found.</p>
      )}
    </AccountPage>
  );
}
export function Receipt({ catalog, id }: { catalog: Catalog; id: string }) {
  const { orders } = useAccount();
  const order = orders.find((o) => o.id === id),
    data = capturedReceipts[id];
  const product = catalog.products.find((p) => p.id === order?.productId);
  const money = (amount: number) => formatMoney({ amount, currency: "USD" });
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
          <Icon name="share" />
        </button>
      }
    >
      {order && data ? (
        <>
          <div className="receipt-order-meta">
            <strong>Order #{id}</strong>
            <p>{data.date}</p>
          </div>
          {shareMessage && <p role="status">{shareMessage}</p>}
          <div className="receipt-product">
            {product && <img src={product.images[0]} alt="" />}
            <strong>{order.name}</strong>
            <span>{money(data.itemAmount)}</span>
          </div>
          <div className="receipt-totals">
            <p>
              <span>Subtotal</span>
              <span>{money(data.itemAmount)}</span>
            </p>
            <p>
              <span>Discount</span>
              <span>
                {data.discount ? "-" : ""}
                {money(data.discount)}
              </span>
            </p>
            <p>
              <span>Shipping</span>
              <span>{money(data.shipping)}</span>
            </p>
            <p>
              <span>Tax</span>
              <span>{money(data.tax)}</span>
            </p>
            <p className="receipt-total">
              <strong>Total</strong>
              <strong>{money(data.total)}</strong>
            </p>
          </div>
          <section className="receipt-section receipt-method">
            <h2>Payment method</h2>
            <p className="receipt-payment">
              <strong>Shop Pay</strong>
              <span>{money(data.total)}</span>
            </p>
            <p className="receipt-card-line">
              <b>VISA</b> ···· ···· ···· {data.cardLast4} <span>ⓘ</span>
            </p>
          </section>
          <section className="receipt-section">
            <h2>Shipping address</h2>
            <p>
              {data.name}
              <br />
              {data.street}
              <br />
              {data.city}, {data.region} {data.postalCode}
              <br />
              {data.country}
              <br />
              {data.phone}
            </p>
          </section>
          <section className="receipt-section">
            <h2>Billing address</h2>
            <p>Same as shipping address</p>
          </section>
          <section className="receipt-section">
            <h2>Shipping method</h2>
            <p>{data.shippingMethod}</p>
          </section>
          <section className="receipt-section">
            <h2>Email address</h2>
            <p>{data.email}</p>
          </section>
          <section className="receipt-section">
            <h2>KITSCH</h2>
            <Link className="receipt-seller" href="/stores/kitsch">
              <img src="/api/reference-media/kitsch-logo" alt="" />
              KITSCH
            </Link>
          </section>
        </>
      ) : (
        <p>No receipt is available for this tracked order.</p>
      )}
    </AccountPage>
  );
}
export function OrderConfirmation({
  id,
  catalog,
}: {
  id: string;
  catalog: Catalog;
}) {
  const { orders } = useAccount();
  const order = orders.find((o) => o.id === id),
    data = capturedReceipts[id];
  const product = catalog.products.find((p) => p.id === order?.productId);
  const money = (amount: number) => formatMoney({ amount, currency: "USD" });
  return (
    <AccountPage className="order-confirmation-page">
      <Link
        className="review-close"
        href={`/orders/${id}`}
        aria-label="Close confirmation"
      >
        <Icon name="close" />
      </Link>
      {order && data ? (
        <>
          <header className="confirmation-heading">
            <div>
              <h1>Order confirmed</h1>
              <small>Order No. {id}</small>
            </div>
            <img src="/api/reference-media/kitsch-logo" alt="KITSCH" />
          </header>
          <section className="confirmation-destination">
            <small>Ships to</small>
            <div>
              <strong>
                {data.street}, {data.city}, CA, {data.postalCode}, US
              </strong>
              {product && <img src={product.images[0]} alt="" />}
            </div>
          </section>
          <section className="confirmation-delivery">
            <small>Estimated delivery</small>
            <strong>Expected by Aug 3</strong>
          </section>
          <div className="confirmation-total">
            <p>
              <span>Total</span>
              <span>{money(data.total)}</span>
            </p>
            <p>
              <span>Shop Pay — {data.cardLast4}</span>
              <span>{money(data.total)}</span>
            </p>
          </div>
          <Link className="muted-button" href={`/orders/${id}/receipt`}>
            View order receipt
          </Link>
          <h2>Popular at KITSCH ›</h2>
          <div className="product-rail">
            {["black-conditioner-bag", "chocolate-body-bag", "shower-caddy"]
              .map((id) => catalog.products.find((p) => p.id === id))
              .filter((p) => !!p)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </>
      ) : (
        <p>No confirmation is available for this tracked order.</p>
      )}
    </AccountPage>
  );
}
