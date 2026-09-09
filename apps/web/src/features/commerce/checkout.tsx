"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { formatMoney, type Catalog } from "../catalog/types";
import { useDiscovery } from "../discovery/state";
import { Sheet } from "../discovery/components";
import {
  AccountPage,
  AddressEditor,
  AddressLookup,
  PhoneEditor,
  PaymentEditor,
  Boundary,
} from "../account/forms";
import { useAccount, blankAddress } from "../account/state";
import { CartContents } from "./cart";
export { CartContents } from "./cart";
import { InitialPayment } from "./initial-payment";
import { CheckoutExtras, checkoutRecommendations } from "./checkout-extras";
import { capturedLineAmount } from "./pricing";
export function CartPage({ catalog }: { catalog: Catalog }) {
  return (
    <AccountPage title="Your cart">
      <CartContents catalog={catalog} />
    </AccountPage>
  );
}
export function CartOverlay({
  catalog,
  open,
  onClose,
}: {
  catalog: Catalog;
  open: boolean;
  onClose: () => void;
}) {
  const [offer, setOffer] = useState("");
  return (
    <>
      <Sheet
        open={open}
        title="Your cart"
        className="dark-cart-sheet"
        headerless
        onClose={onClose}
      >
        <CartContents
          catalog={catalog}
          onContinue={onClose}
          onOffer={setOffer}
        />
        <button
          className="cart-close"
          aria-label="Close cart"
          onClick={onClose}
        >
          ×
        </button>
      </Sheet>
      <CartOffer
        catalog={catalog}
        storeId={offer}
        open={Boolean(offer)}
        onClose={() => setOffer("")}
      />
    </>
  );
}
export function Checkout({
  catalog,
  storeId,
}: {
  catalog: Catalog;
  storeId?: string;
}) {
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const state = useDiscovery();
  const account = useAccount();
  const [step, setStep] = useState<
    | "review"
    | "phone"
    | "address"
    | "address-search"
    | "payment-setup"
    | "payment"
  >("review");
  const [addressId, setAddressId] = useState(
    account.addresses.find((a) => a.isDefault)?.id ?? "",
  );
  const [shipping, setShipping] = useState(0);
  const [phoneStage, setPhoneStage] = useState<"phone" | "code">("phone");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [boundary, setBoundary] = useState(false);
  const [code, setCode] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [summary, setSummary] = useState(false);
  const [addressMenu, setAddressMenu] = useState("");
  const [deleteAddressId, setDeleteAddressId] = useState("");
  const [paymentMenu, setPaymentMenu] = useState("");
  const [paymentChoice, setPaymentChoice] = useState("card-reference-1");
  const selectedPayment =
    paymentChoice === "apple"
      ? "apple"
      : (account.paymentCards.find((c) => c.id === paymentChoice)?.id ??
        account.paymentCards[0]?.id ??
        "");
  const [textOffers, setTextOffers] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [addressDraft, setAddressDraft] = useState(() => blankAddress());
  const lines = state.cart.flatMap((l) => {
    const p = catalog.products.find((p) => p.id === l.productId);
    return p && (!storeId || p.storeId === storeId)
      ? [{ ...l, product: p }]
      : [];
  });
  const subtotal =
    lines.reduce(
      (n, l) => n + l.quantity * capturedLineAmount(l, l.product.price.amount),
      0,
    ) +
    checkoutRecommendations
      .filter((p) => extraIds.includes(p.id))
      .reduce((n, p) => n + p.amount, 0);
  const fee = shipping === 0 ? 682 : 1174;
  const tax = lines.some(
    (l) =>
      l.productId === "shampoo-bag" && l.variantId === "shampoo-bag-default",
  )
    ? 35
    : 0;
  const total = subtotal + fee + tax;
  const address =
    account.addresses.find((a) => a.id === addressId) ??
    account.addresses.find((a) => a.isDefault) ??
    account.addresses[0];
  if (!lines.length)
    return (
      <AccountPage title="Checkout">
        <div className="notification-empty">
          <h2>Your cart is empty</h2>
          <Link href="/search" className="primary form-submit">
            Go shopping
          </Link>
        </div>
      </AccountPage>
    );
  return (
    <main className="shop-page checkout-page">
      <header className="checkout-header">
        {step === "review" || step === "payment" ? (
          <Link href="/cart" aria-label="Close checkout">
            ×
          </Link>
        ) : (
          <button
            aria-label="Go back"
            onClick={() => {
              if (step === "phone" && phoneStage === "code")
                setPhoneStage("phone");
              else
                setStep(
                  step === "payment-setup"
                    ? "address"
                    : step === "address"
                      ? "address-search"
                      : step === "address-search"
                        ? "phone"
                        : "review",
                );
            }}
          >
            ‹
          </button>
        )}
        <h1>
          {step === "review" || step === "payment"
            ? "Review & Pay"
            : step === "phone"
              ? phoneStage === "code"
                ? "Confirm it’s you"
                : "Add phone number"
              : step === "address" || step === "address-search"
                ? "Shipping address"
                : "Add a card"}
        </h1>
      </header>
      {(step === "address" ||
        step === "address-search" ||
        step === "payment-setup") && (
        <div className="checkout-steps">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
      {step === "phone" ? (
        <PhoneEditor
          controlledStage={phoneStage}
          initialPhone={phoneDraft}
          onPhoneChange={setPhoneDraft}
          onStageChange={setPhoneStage}
          onDone={(phone) => {
            account.updateProfile({ phone });
            setNewAddress(!address);
            setStep("address-search");
          }}
        />
      ) : step === "address-search" ? (
        <AddressLookup
          onManual={() => setStep("address")}
          onSelect={(a) => {
            setAddressDraft(a);
            setStep("address");
          }}
        />
      ) : step === "payment-setup" ? (
        <InitialPayment
          address={address}
          onContinue={() => setStep("review")}
        />
      ) : step === "address" ? (
        <AddressEditor
          variant="initial"
          initialValue={addressDraft}
          onChange={setAddressDraft}
          onSave={(v) => {
            account.saveAddress(v);
            setAddressId(v.id);
            setStep("payment-setup");
          }}
          onCancel={() => setStep("address-search")}
        />
      ) : (
        <>
          <div className="checkout-identity">
            <strong>shop</strong>
            <span>{account.profile.email}</span>
          </div>
          <div className="checkout-group">
            <details open>
              <summary>Ship to</summary>
              {account.addresses.map((a) => (
                <div
                  className={`shipping-option address-radio ${address?.id === a.id ? "selected" : ""}`}
                  key={a.id}
                >
                  <label>
                    <input
                      type="radio"
                      name="address"
                      checked={address?.id === a.id}
                      onChange={() => setAddressId(a.id)}
                    />
                    <span>
                      <strong>
                        {a.firstName} {a.lastName}
                      </strong>
                      <span>
                        {a.street}, {a.city}
                      </span>
                      <span>{a.country}</span>
                    </span>
                  </label>
                  <button
                    aria-label={`Address options for ${a.street}`}
                    onClick={() =>
                      setAddressMenu(addressMenu === a.id ? "" : a.id)
                    }
                  >
                    •••
                  </button>
                  {addressMenu === a.id && (
                    <div className="checkout-context-menu">
                      <button
                        onClick={() => {
                          setAddressId(a.id);
                          setNewAddress(false);
                          setAddressMenu("");
                          setAddressModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteAddressId(a.id);
                          setAddressMenu("");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                className="checkout-link"
                onClick={() => {
                  setNewAddress(true);
                  setAddressModal(true);
                }}
              >
                + Use a different address
              </button>
              <button
                className="checkout-link"
                onClick={() => setStep("phone")}
              >
                {account.profile.phone || "+ Add phone number"}
              </button>
            </details>
            <details open>
              <summary>Shipping</summary>
              {[
                ["Standard Shipping", "3–5 days", 682],
                ["Priority Shipping", "1–3 days", 1174],
              ].map(([name, delivery, price], i) => (
                <label
                  className={`shipping-option ${shipping === i ? "selected" : ""}`}
                  key={name}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === i}
                    onChange={() => setShipping(i)}
                  />
                  <span>
                    <strong>{name}</strong>
                    <span>{delivery}</span>
                  </span>
                  <b>
                    {formatMoney({ amount: Number(price), currency: "USD" })}
                  </b>
                </label>
              ))}
            </details>
            <details>
              <summary>Plan</summary>
              <div className="selected-detail">
                <strong>Installments unavailable</strong>
                <p>
                  Installments can only be used for orders between $35.00 and
                  $30,000.00.
                </p>
              </div>
              <label className="shipping-option selected">
                <input type="radio" readOnly checked />
                Pay now
              </label>
              <label className="shipping-option">
                <input type="radio" disabled name="plan" />2 interest-free
                payments
              </label>
            </details>
            <details open>
              <summary>Payment</summary>
              {account.paymentCards.map((card) => (
                <div
                  className={`shipping-option ${selectedPayment === card.id ? "selected" : ""}`}
                  key={card.id}
                >
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === card.id}
                      onChange={() => setPaymentChoice(card.id)}
                    />
                    Visa •••• {card.last4}
                    <small>
                      {address?.firstName} {address?.lastName},{" "}
                      {address?.street}
                    </small>
                  </label>
                  <button
                    aria-label={`Payment method options ${card.last4}`}
                    onClick={() =>
                      setPaymentMenu(paymentMenu === card.id ? "" : card.id)
                    }
                  >
                    •••
                  </button>
                  {paymentMenu === card.id && (
                    <div className="checkout-context-menu">
                      <Link href="/account/payments">Edit</Link>
                      <button
                        onClick={() => {
                          account.removePayment(card.id);
                          setPaymentMenu("");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <label
                className={`shipping-option ${paymentChoice === "apple" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentChoice === "apple"}
                  onChange={() => setPaymentChoice("apple")}
                />
                Apple Pay
              </label>
              <button
                className="checkout-link"
                onClick={() => setStep("payment")}
              >
                + Pay another way
              </button>
            </details>
          </div>
          <CheckoutExtras
            catalog={catalog}
            added={extraIds}
            onAdd={(id) =>
              setExtraIds((v) => (v.includes(id) ? v : [...v, id]))
            }
          />
          <div className="checkout-summary">
            <button
              className="account-row"
              onClick={() => setSummary(!summary)}
            >
              <span>
                Order summary Â· {lines.reduce((n, l) => n + l.quantity, 0)}{" "}
                items
              </span>
              <strong>
                {formatMoney({ amount: subtotal, currency: "USD" })}
              </strong>
            </button>
            {summary && (
              <div className="inline-order-summary">
                {checkoutRecommendations
                  .filter((p) => extraIds.includes(p.id))
                  .map((p) => (
                    <div className="order-item" key={p.id}>
                      <img src={p.image} alt="" />
                      <span>{p.name}</span>
                      <strong>
                        {formatMoney({ amount: p.amount, currency: "USD" })}
                      </strong>
                    </div>
                  ))}
                <details className="loyalty-details">
                  <summary>Complete this purchase to earn 4 points</summary>
                  <p>
                    Earn points with this store when you complete your purchase.
                  </p>
                </details>{" "}
                {lines.map((l) => (
                  <div
                    className="order-item"
                    key={`${l.productId}-${l.variantId}`}
                  >
                    <img src={l.product.images[0]} alt="" />
                    <span>
                      {l.product.title}
                      <small>
                        {capturedLineAmount(l, l.product.price.amount) !==
                        l.product.price.amount
                          ? "27% OFF BACK TO SCHOOL SALE (-$1.35)"
                          : `Quantity ${l.quantity}`}
                      </small>
                    </span>
                    <strong>
                      {formatMoney({
                        amount:
                          capturedLineAmount(l, l.product.price.amount) *
                          l.quantity,
                        currency: l.product.price.currency,
                      })}
                    </strong>
                  </div>
                ))}
              </div>
            )}
            <form
              className="discount-form"
              onSubmit={(e) => {
                e.preventDefault();
                setDiscountError(true);
              }}
            >
              <input
                aria-label="Discount code"
                placeholder="Discount code or gift card"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setDiscountError(false);
                }}
              />
              <button type="submit">Apply</button>
            </form>
            {discountError && (
              <p className="form-error" role="alert">
                Discount codes cannot be validated in this preview.
              </p>
            )}
            {summary && (
              <div className="checkout-totals">
                <p>
                  Subtotal{" "}
                  <span>
                    {formatMoney({ amount: subtotal, currency: "USD" })}
                  </span>
                </p>
                <p>
                  Shipping{" "}
                  <span>{formatMoney({ amount: fee, currency: "USD" })}</span>
                </p>
                <p>
                  Estimated taxes{" "}
                  <span>{formatMoney({ amount: tax, currency: "USD" })}</span>
                </p>
              </div>
            )}
            <div className="cart-subtotal">
              <strong>Total</strong>
              <strong>{formatMoney({ amount: total, currency: "USD" })}</strong>
            </div>
            {summary && (
              <>
                <strong className="checkout-savings">
                  TOTAL SAVINGS{" "}
                  {formatMoney({
                    amount: lines.reduce(
                      (n, l) =>
                        n +
                        (l.product.price.amount -
                          capturedLineAmount(l, l.product.price.amount)) *
                          l.quantity,
                      0,
                    ),
                    currency: "USD",
                  })}
                </strong>
                <p className="checkout-terms">
                  By clicking “Pay Now” you agree to Kitsch’s{" "}
                  <Link href="/stores/kitsch?info=terms">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/stores/kitsch?info=privacy">Privacy Policy</Link>
                  .
                </p>
              </>
            )}
          </div>
          <label className="text-offers">
            <input
              type="checkbox"
              checked={textOffers}
              onChange={(e) => setTextOffers(e.target.checked)}
            />
            Text me with news and offers
          </label>
          <div className="checkout-pay">
            <button
              className="primary"
              onClick={() => setBoundary(true)}
              disabled={!address || !selectedPayment}
            >
              <span>Pay now</span>
              <b>{formatMoney({ amount: total, currency: "USD" })}</b>
            </button>
          </div>
        </>
      )}
      <Sheet
        open={addressModal}
        title={newAddress ? "Add address" : "Edit address"}
        onClose={() => setAddressModal(false)}
      >
        <AddressEditor
          key={`${addressModal}-${newAddress}-${addressId}`}
          variant="checkout"
          initialValue={
            newAddress ? blankAddress() : (address ?? blankAddress())
          }
          onCancel={() => setAddressModal(false)}
          onSave={(a) => {
            account.saveAddress(a);
            setAddressId(a.id);
            setAddressModal(false);
          }}
        />
      </Sheet>
      <Sheet
        open={step === "payment"}
        title="Payment methods"
        onClose={() => setStep("review")}
      >
        <PaymentEditor checkout />
        <button className="form-cancel" onClick={() => setStep("review")}>
          Cancel
        </button>
      </Sheet>
      <Sheet
        open={Boolean(deleteAddressId)}
        title="Delete address"
        className="delete-address-confirm"
        onClose={() => setDeleteAddressId("")}
      >
        <p>
          Are you sure you want to delete the address{" "}
          {account.addresses.find((a) => a.id === deleteAddressId)?.street}?
        </p>
        <div className="editor-actions">
          <button
            className="form-cancel"
            onClick={() => setDeleteAddressId("")}
          >
            Cancel
          </button>
          <button
            className="danger-button form-submit"
            onClick={() => {
              account.deleteAddress(deleteAddressId);
              setDeleteAddressId("");
            }}
          >
            Delete
          </button>
        </div>
      </Sheet>
      <Boundary
        open={boundary}
        onClose={() => setBoundary(false)}
        kind="Payment"
      />
    </main>
  );
}

export function CartOffer({
  catalog,
  storeId,
  open,
  onClose,
}: {
  catalog: Catalog;
  storeId: string;
  open: boolean;
  onClose: () => void;
}) {
  const state = useDiscovery();
  const offerIds = [
    "black-conditioner-bag",
    "chocolate-body-bag",
    "shower-caddy",
    "solid-shave-butter",
  ];
  const products = offerIds.flatMap((id) => {
    const p = catalog.products.find((p) => p.id === id);
    return p ? [p] : [];
  });
  const lines = state.cart.filter(
    (l) =>
      catalog.products.find((p) => p.id === l.productId)?.storeId === storeId,
  );
  const subtotal = lines.reduce(
    (n, l) =>
      n +
      (catalog.products.find((p) => p.id === l.productId)?.price.amount ?? 0) *
        l.quantity,
    0,
  );
  return (
    <Sheet
      open={open}
      title={`Add ${formatMoney({ amount: Math.max(0, 5000 - subtotal), currency: "USD" })} to save $20 with your exclusive offer`}
      onClose={onClose}
      className="cart-offer"
    >
      <div className="offer-progress">
        <span style={{ width: `${Math.min(100, subtotal / 50)}%` }} />
      </div>
      <div className="offer-products">
        {products.map((p) => (
          <article key={p.id}>
            <Link href={`/products/${p.id}`} onClick={onClose}>
              <img src={p.images[0]} alt="" />
              {p.compareAt && <span className="offer-discount">47% off</span>}
              <strong>{p.title}</strong>
              <span>
                {formatMoney(p.price)}{" "}
                {p.compareAt && <del>{formatMoney(p.compareAt)}</del>}
              </span>
            </Link>
            <button
              className="offer-heart"
              aria-label={`Save ${p.title}`}
              aria-pressed={state.saved.includes(p.id)}
              onClick={() => state.toggleSaved(p.id)}
            >
              {state.saved.includes(p.id) ? "♥" : "♡"}
            </button>
          </article>
        ))}
      </div>
      <div className="offer-footer">
        <p>
          In your cart{" "}
          <strong>{lines.reduce((n, l) => n + l.quantity, 0)}</strong>
          <span>{formatMoney({ amount: subtotal, currency: "USD" })}</span>
        </p>
        <Link
          className="primary form-submit"
          onClick={onClose}
          href={`/checkout?store=${encodeURIComponent(storeId)}`}
        >
          Continue to checkout
        </Link>
      </div>
    </Sheet>
  );
}
