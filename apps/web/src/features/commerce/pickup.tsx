"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon } from "../discovery/icons";
import { AccountIcon } from "../account/icons";
import { useState } from "react";
import { useAccount } from "../account/state";
import { Boundary } from "../account/forms";
// Flow21/006–007 captures this seller checkout, but does not reveal the item name.
// The item is intentionally checkout-only and is not linked to an invented PDP.
export function PickupCheckout() {
  const { profile, addresses, paymentCards } = useAccount();
  const paymentCard = paymentCards[0];
  const address = addresses.find((a) => a.isDefault) ?? addresses[0];
  const [pickup, setPickup] = useState(false),
    [offers, setOffers] = useState(true),
    [discount, setDiscount] = useState(false),
    [boundary, setBoundary] = useState(""),
    [summary, setSummary] = useState(false);
  const total = pickup ? "3.80" : "10.83";
  return (
    <main className="shop-page checkout-page pickup-checkout">
      <header className="checkout-header">
        <Link href="/cart" aria-label="Close checkout">
          ×
        </Link>
        <h1>Review & Pay</h1>
      </header>
      <div className="checkout-identity">
        <strong>shop</strong>
        <span>{profile.email}</span>
      </div>
      <div className="fulfillment-tabs" role="tablist" aria-label="Fulfillment">
        <button
          role="tab"
          aria-selected={!pickup}
          onClick={() => setPickup(false)}
        >
          <Icon name="orders" /> Ship
        </button>
        <button
          role="tab"
          aria-selected={pickup}
          onClick={() => setPickup(true)}
        >
          <AccountIcon name="location" /> Pickup
        </button>
      </div>
      {pickup && (
        <>
          <p className="pickup-warning">
            <Icon name="alert" /> The closest location with your item is more
            than 100 mi from <u>00000</u>
          </p>
          <p className="pickup-count">
            1 location with your item{" "}
            <button onClick={() => setBoundary("Location lookup")}>
              <AccountIcon name="location" /> 00000
            </button>
          </p>
        </>
      )}
      <section className="pickup-details">
        {pickup ? (
          <div>
            <small>Location</small>
            <input
              type="radio"
              name="pickup-location"
              aria-label="White Rock Soap Gallery"
              checked
              readOnly
            />
            <p>
              <strong>White Rock Soap Gallery (1,468.9 mi) · Free</strong>
              <br />
              100 Example Avenue, Suite 101, Example City TX
              <br />
              <span>Usually ready in 24 hours</span>
            </p>
          </div>
        ) : (
          <>
            <div>
              <small>Ship to</small>
              <p>
                <strong>
                  {profile.firstName} {profile.lastName}
                </strong>
                <br />
                {address
                  ? `${address.street}, ${address.city}, ${address.region} ${address.postalCode}, US`
                  : "Add shipping address"}
              </p>
              <Link
                href="/account/addresses"
                aria-label="Edit shipping address"
              >
                ⌄
              </Link>
            </div>
            <div>
              <small>Shipping</small>
              <p>
                <strong>Ground Shipping · $7.00</strong>
                <br />
                <a>Fri, Jul 31 Promise</a>
                <br />
                Tracking number provided
              </p>
            </div>
          </>
        )}
        <div>
          <small>Payment</small>
          <strong>
            {paymentCard ? (
              <>
                Visa •••• {paymentCard.last4}{" "}
                <span className="visa-mark">VISA</span>
              </>
            ) : (
              "Add payment method"
            )}
          </strong>
          <Link
            href="/account/payments"
            aria-label={
              paymentCard ? "Edit payment method" : "Add payment method"
            }
          >
            ⌄
          </Link>
        </div>
      </section>
      <label className="pickup-offers">
        <input
          type="checkbox"
          checked={offers}
          onChange={(e) => setOffers(e.target.checked)}
        />
        Sign me up for news and offers from this store
      </label>
      <button className="pill" onClick={() => setDiscount(!discount)}>
        <Icon name="tag" /> Add discount
      </button>
      {discount && (
        <form
          className="discount-form"
          onSubmit={(e) => {
            e.preventDefault();
            setBoundary("Discount validation");
          }}
        >
          <input aria-label="Discount code" placeholder="Discount code" />
          <button>Apply</button>
        </form>
      )}
      <button
        className="pickup-total"
        onClick={() => setSummary(!summary)}
        aria-expanded={summary}
      >
        <img
          src="/api/reference-media/checkout-white-rock-item"
          alt="Captured checkout item"
        />
        <span>
          <strong>Total</strong>
          <small>1 item</small>
        </span>
        <b>
          <small>USD</small> ${total}⌄
        </b>
      </button>
      {summary && (
        <div className="checkout-totals">
          <p>
            1 item · {pickup ? "Pickup" : "Ship"}
            <span>${total}</span>
          </p>
        </div>
      )}
      <div className="checkout-pay">
        <button
          className="primary"
          disabled={!paymentCard || (!pickup && !address)}
          onClick={() => setBoundary("Payment")}
        >
          <span>Pay now</span>
          <b>${total}</b>
        </button>
      </div>
      <Boundary
        open={!!boundary}
        kind={boundary}
        onClose={() => setBoundary("")}
      />
    </main>
  );
}
