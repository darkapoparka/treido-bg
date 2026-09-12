"use client";
import { ShopSurface } from "../discovery/hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { formatMoney, type Catalog } from "../catalog/types";
import { useDiscovery } from "../discovery/state";
import { Sheet } from "../discovery/components";
import { AccountPage } from "../account/forms";
import type { Address } from "../account/state";
import { CartContents } from "./cart";
export { CartContents } from "./cart";
import { InitialPayment } from "./initial-payment";
import { CheckoutExtras, checkoutRecommendations } from "./checkout-extras";
import { capturedLineAmount, capturedOfferCompareAt } from "./pricing";
import {
  shopSourceAddress,
  shopSourceBuyer,
  shopSourcePayment,
} from "./source-fixtures";

type CheckoutStep =
  "review" | "phone" | "address-search" | "address" | "payment-setup";
type CheckoutSection = "ship" | "shipping" | "plan" | "payment";
type LocalPayment = { id: string; last4: string };

function blankCheckoutAddress(): Address {
  return {
    id: "",
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    apartment: "",
    city: "",
    region: "",
    postalCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  };
}

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
  initialStage = "review",
}: {
  catalog: Catalog;
  storeId?: string;
  initialStage?: CheckoutStep;
}) {
  const state = useDiscovery();
  const [step, setStep] = useState<CheckoutStep>(initialStage);
  const [expanded, setExpanded] = useState<CheckoutSection | "">("");
  const [addresses, setAddresses] = useState<Address[]>(() => [
    { ...shopSourceAddress },
  ]);
  const [addressId, setAddressId] = useState(shopSourceAddress.id);
  const [shipping, setShipping] = useState(0);
  const [payments, setPayments] = useState<LocalPayment[]>(() => [
    { id: shopSourcePayment.id, last4: shopSourcePayment.last4 },
  ]);
  const [paymentChoice, setPaymentChoice] = useState<string>(
    shopSourcePayment.id,
  );
  const [phoneStage, setPhoneStage] = useState<"phone" | "code">("phone");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [summary, setSummary] = useState(false);
  const [code, setCode] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [addressMenu, setAddressMenu] = useState("");
  const [deleteAddressId, setDeleteAddressId] = useState("");
  const [addressModal, setAddressModal] = useState(false);
  const [addressDraft, setAddressDraft] = useState<Address>(() =>
    initialStage === "address"
      ? { ...shopSourceAddress }
      : blankCheckoutAddress(),
  );
  const [editingAddressId, setEditingAddressId] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentMenu, setPaymentMenu] = useState("");
  const [storeOffers, setStoreOffers] = useState(true);
  const [textOffers, setTextOffers] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentBoundary, setPaymentBoundary] = useState(false);

  const lines = state.cart.flatMap((line) => {
    const product = catalog.products.find((p) => p.id === line.productId);
    return product && (!storeId || product.storeId === storeId)
      ? [{ ...line, product }]
      : [];
  });
  const quantity = lines.reduce((n, line) => n + line.quantity, 0);
  const itemSubtotal = lines.reduce(
    (n, line) =>
      n + line.quantity * capturedLineAmount(line, line.product.price.amount),
    0,
  );
  const extrasSubtotal = checkoutRecommendations
    .filter((p) => extraIds.includes(p.id))
    .reduce((n, p) => n + p.amount, 0);
  const subtotal = itemSubtotal + extrasSubtotal;
  const fee = shipping === 0 ? 682 : 1174;
  const tax = lines.some(
    (line) =>
      line.productId === "shampoo-bag" &&
      line.variantId === "shampoo-bag-default",
  )
    ? 35
    : 0;
  const total = subtotal + fee + tax;
  const savings = lines.reduce(
    (n, line) =>
      n +
      (line.product.price.amount -
        capturedLineAmount(line, line.product.price.amount)) *
        line.quantity,
    0,
  );
  const address =
    addresses.find((entry) => entry.id === addressId) ?? addresses[0];
  const selectedPayment = payments.find((card) => card.id === paymentChoice);

  const toggle = (section: CheckoutSection) =>
    setExpanded((current) => (current === section ? "" : section));

  const saveAddress = (next: Address) => {
    const id =
      next.id ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `checkout-address-${Date.now()}`);
    const normalized = { ...next, id };
    setAddresses((current) => {
      const exists = current.some((entry) => entry.id === id);
      if (!exists) return [...current, normalized];
      return current.map((entry) => (entry.id === id ? normalized : entry));
    });
    setAddressId(id);
    return normalized;
  };

  if (!lines.length)
    return (
      <AccountPage title="Checkout">
        <div className="notification-empty order-empty-source">
          <h2>Your cart is empty</h2>
          <p>
            Add products while you shop, so they’ll be ready for checkout later.
          </p>
          <Link href="/search" className="form-cancel">
            Go shopping
          </Link>
        </div>
      </AccountPage>
    );

  const backFromSetup = () => {
    if (step === "phone" && phoneStage === "code") {
      setPhoneStage("phone");
      return;
    }
    if (step === "payment-setup") setStep("address");
    else if (step === "address") setStep("address-search");
    else setStep("review");
  };

  return (
    <ShopSurface
      className={`shop-page checkout-page source-checkout ${processing ? "is-processing" : ""}`}
      aria-busy={processing}
    >
      <header className="checkout-header">
        {step === "review" ? (
          <Link href="/cart" aria-label="Close checkout">
            ×
          </Link>
        ) : (
          <button aria-label="Go back" onClick={backFromSetup}>
            ‹
          </button>
        )}
        <h1>
          {step === "review"
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

      {(step === "address-search" ||
        step === "address" ||
        step === "payment-setup") && (
        <div className={`checkout-steps checkout-steps-${step}`}>
          <i className="active" />
          <i className={step !== "address-search" ? "active" : ""} />
          <i className={step === "payment-setup" ? "active" : ""} />
          <i />
        </div>
      )}

      {step === "phone" ? (
        <SourcePhoneSetup
          stage={phoneStage}
          phone={phoneDraft}
          onPhoneChange={setPhoneDraft}
          onStageChange={setPhoneStage}
          onDone={(phone) => {
            setPhoneDraft(phone);
            setAddressDraft({ ...blankCheckoutAddress(), phone });
            setStep("address-search");
          }}
        />
      ) : step === "address-search" ? (
        <SourceAddressLookup
          onManual={() => {
            setAddressDraft(blankCheckoutAddress());
            setStep("address");
          }}
          onSelect={(next) => {
            setAddressDraft(next);
            setStep("address");
          }}
        />
      ) : step === "address" ? (
        <SourceAddressEditor
          variant="initial"
          initialValue={addressDraft}
          onCancel={() => setStep("address-search")}
          onSave={(next) => {
            const saved = saveAddress(next);
            setAddressDraft(saved);
            setStep("payment-setup");
          }}
        />
      ) : step === "payment-setup" ? (
        <InitialPayment
          address={addressDraft.street ? addressDraft : address}
          onContinue={() => setStep("review")}
        />
      ) : (
        <>
          <div className="checkout-identity">
            <strong>shop</strong>
            <span>{shopSourceBuyer.email}</span>
          </div>

          <div className="checkout-group source-checkout-group">
            <section className="checkout-section">
              <button
                className="checkout-section-toggle"
                aria-expanded={expanded === "ship"}
                onClick={() => toggle("ship")}
              >
                <span className="checkout-section-label">Ship to</span>
                {expanded !== "ship" && address && (
                  <span className="checkout-section-value">
                    <strong>
                      {address.firstName} {address.lastName}
                    </strong>
                    <span>
                      {address.street}, {address.city} {address.region}
                      <br />
                      {address.postalCode}, US
                    </span>
                  </span>
                )}
                <span className="checkout-section-caret">
                  {expanded === "ship" ? "⌃" : "⌄"}
                </span>
              </button>
              {expanded === "ship" && (
                <div className="checkout-section-body checkout-addresses">
                  {addresses.map((entry) => (
                    <div
                      className={`shipping-option address-radio ${address?.id === entry.id ? "selected" : ""}`}
                      key={entry.id}
                    >
                      <label>
                        <input
                          type="radio"
                          name="address"
                          checked={address?.id === entry.id}
                          onChange={() => setAddressId(entry.id)}
                        />
                        <span>
                          <strong>
                            {entry.firstName} {entry.lastName}, {entry.street}
                          </strong>
                          <span>
                            {entry.city} {entry.region} {entry.postalCode}, US
                            {entry.phone
                              ? `, ${entry.phone.replace(/\s/g, "")}`
                              : ""}
                          </span>
                          {entry.isDefault && (
                            <small className="default-pill">Default</small>
                          )}
                        </span>
                      </label>
                      <button
                        className="context-trigger"
                        aria-label={`Address options for ${entry.street}`}
                        onClick={() =>
                          setAddressMenu(
                            addressMenu === entry.id ? "" : entry.id,
                          )
                        }
                      >
                        •••
                      </button>
                      {addressMenu === entry.id && (
                        <div className="checkout-context-menu">
                          <button
                            onClick={() => {
                              setEditingAddressId(entry.id);
                              setAddressDraft({ ...entry });
                              setAddressMenu("");
                              setAddressModal(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="danger-text"
                            onClick={() => {
                              setDeleteAddressId(entry.id);
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
                    className="checkout-link source-checkout-link"
                    onClick={() => {
                      setEditingAddressId("");
                      setAddressDraft(blankCheckoutAddress());
                      setAddressModal(true);
                    }}
                  >
                    <span>＋</span> Use a different address
                  </button>
                </div>
              )}
            </section>

            <section className="checkout-section">
              <button
                className="checkout-section-toggle"
                aria-expanded={expanded === "shipping"}
                onClick={() => toggle("shipping")}
              >
                <span className="checkout-section-label">Shipping</span>
                {expanded !== "shipping" && (
                  <span className="checkout-section-value">
                    <strong>
                      {shipping === 0
                        ? "Standard Shipping"
                        : "Priority Shipping"}{" "}
                      · {formatMoney({ amount: fee, currency: "USD" })}
                    </strong>
                    <span>
                      Ready to ship
                      <br />
                      {shipping === 0 ? "3-5 days" : "1-3 days"}
                    </span>
                  </span>
                )}
                <span className="checkout-section-caret">
                  {expanded === "shipping" ? "⌃" : "⌄"}
                </span>
              </button>
              {expanded === "shipping" && (
                <div className="checkout-section-body">
                  {[
                    [
                      "Standard Shipping",
                      "Estimated delivery Tue, Aug 4",
                      "3-5 days",
                      682,
                    ],
                    [
                      "Priority Shipping",
                      "Estimated delivery Tue, Aug 4",
                      "1-3 days",
                      1174,
                    ],
                  ].map(([name, eta, delivery, price], index) => (
                    <label
                      className={`shipping-option ${shipping === index ? "selected" : ""}`}
                      key={String(name)}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        checked={shipping === index}
                        onChange={() => setShipping(index)}
                      />
                      <span>
                        <strong>{name}</strong>
                        <span>{eta}</span>
                        <span>{delivery}</span>
                      </span>
                      <b>
                        {formatMoney({
                          amount: Number(price),
                          currency: "USD",
                        })}
                      </b>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="checkout-section">
              <button
                className="checkout-section-toggle"
                aria-expanded={expanded === "plan"}
                onClick={() => toggle("plan")}
              >
                <span className="checkout-section-label">Plan</span>
                {expanded !== "plan" && (
                  <span className="checkout-section-value">
                    <strong>Pay now</strong>
                    <span>Pay the entire amount today</span>
                  </span>
                )}
                <span className="checkout-section-caret">
                  {expanded === "plan" ? "⌃" : "⌄"}
                </span>
              </button>
              {expanded === "plan" && (
                <div className="checkout-section-body checkout-plan-body">
                  <div className="installment-unavailable">
                    <strong>
                      <span aria-hidden="true">ⓘ </span>
                      <span>Installments unavailable</span>
                    </strong>
                    <p>
                      Installments can only be used for orders between $35.00
                      and $30,000.00.
                    </p>
                  </div>
                  <label className="shipping-option selected">
                    <input type="radio" checked readOnly />
                    <span>
                      <strong>Pay now</strong>
                      <span>Pay the entire amount today</span>
                    </span>
                  </label>
                  <label className="shipping-option is-disabled">
                    <input type="radio" disabled />
                    <span>
                      <strong>Pay in 2 installments</strong>
                      <span>Pay every 15 days with no interest or fees</span>
                    </span>
                  </label>
                </div>
              )}
            </section>

            <section className="checkout-section">
              <button
                className="checkout-section-toggle"
                aria-expanded={expanded === "payment"}
                onClick={() => toggle("payment")}
              >
                <span className="checkout-section-label">Payment</span>
                {expanded !== "payment" && selectedPayment && (
                  <span className="checkout-section-value payment-summary-value">
                    <strong>Visa ···· {selectedPayment.last4}</strong>
                    <b className="visa-mark">VISA</b>
                  </span>
                )}
                <span className="checkout-section-caret">
                  {expanded === "payment" ? "⌃" : "⌄"}
                </span>
              </button>
              {expanded === "payment" && (
                <div className="checkout-section-body checkout-payments">
                  {payments.map((card) => (
                    <div
                      className={`shipping-option ${paymentChoice === card.id ? "selected" : ""}`}
                      key={card.id}
                    >
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentChoice === card.id}
                          onChange={() => setPaymentChoice(card.id)}
                        />
                        <span>
                          <strong>
                            Visa ···· {card.last4}{" "}
                            <b className="visa-mark">VISA</b>
                          </strong>
                          <span>
                            {address?.firstName} {address?.lastName},{" "}
                            {address?.street}, {address?.city} ...
                          </span>
                        </span>
                      </label>
                      <button
                        className="context-trigger"
                        aria-label={`Payment method options ${card.last4}`}
                        onClick={() =>
                          setPaymentMenu(paymentMenu === card.id ? "" : card.id)
                        }
                      >
                        •••
                      </button>
                      {paymentMenu === card.id && (
                        <div className="checkout-context-menu">
                          <button onClick={() => setPaymentMenu("")}>
                            Edit
                          </button>
                          <button
                            className="danger-text"
                            onClick={() => {
                              setPayments((current) =>
                                current.filter((entry) => entry.id !== card.id),
                              );
                              if (paymentChoice === card.id)
                                setPaymentChoice(
                                  payments.find((entry) => entry.id !== card.id)
                                    ?.id ?? "",
                                );
                              setPaymentMenu("");
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="payment-actions-row">
                    <button
                      className="checkout-link source-checkout-link"
                      onClick={() => setPaymentModal(true)}
                    >
                      <span>＋</span> Pay another way
                    </button>
                    <span className="payment-marks" aria-hidden="true">
                      ▰ Pay
                    </span>
                  </div>
                </div>
              )}
            </section>

            <section className="shop-cash-section">
              <span>Shop Cash</span>
              <div>
                Get $20.00 off on orders over $50.00
                <br />
                <Link href="/search">Keep Shopping</Link>
              </div>
            </section>
          </div>

          <label className="checkout-store-offers">
            <input
              type="checkbox"
              checked={storeOffers}
              disabled={processing}
              onChange={(event) => setStoreOffers(event.target.checked)}
            />
            <span>Sign me up for news and offers from this store</span>
          </label>

          <section className="checkout-text-offers">
            <h2>Text offers</h2>
            <p>
              Sign up to be in the loop on exclusive offers, new products, and
              haircare tips.
            </p>
            <label>
              <input
                type="checkbox"
                checked={textOffers}
                disabled={processing}
                onChange={(event) => setTextOffers(event.target.checked)}
              />
              Text me with news and offers
            </label>
            <p className="checkout-sms-terms">
              By providing your number and clicking the button, you agree to
              receive recurring auto-dialed marketing SMS. Consent is not
              required to purchase. Msg & data rates may apply. Reply HELP for
              help; STOP to opt-out. View{" "}
              <Link href="/account/help">TERMS OF SERVICE</Link> and{" "}
              <Link href="/account/privacy">PRIVACY POLICY</Link>.
            </p>
          </section>

          <CheckoutExtras
            catalog={catalog}
            added={extraIds}
            disabled={processing}
            onAdd={(id) =>
              setExtraIds((current) =>
                current.includes(id) ? current : [...current, id],
              )
            }
          />

          <div className="checkout-summary source-order-summary">
            {!summary && (
              <button
                className="add-discount-pill"
                disabled={processing}
                onClick={() => setSummary(true)}
              >
                ◇ Add discount
              </button>
            )}
            <button
              className="source-total-row"
              disabled={processing}
              aria-expanded={summary}
              onClick={() => setSummary((current) => !current)}
            >
              <span className="source-total-thumbnail">
                {lines[0] && <img src={lines[0].product.images[0]} alt="" />}
              </span>
              <span>
                <strong>{summary ? "Order summary" : "Total"}</strong>
                <small>
                  {quantity} {quantity === 1 ? "item" : "items"}
                </small>
              </span>
              <span className="source-total-value">
                <b>USD</b>
                <strong>
                  {formatMoney({ amount: total, currency: "USD" })}
                </strong>
                <i>{summary ? "⌃" : "⌄"}</i>
                {savings > 0 && (
                  <small>
                    ◇ Total savings{" "}
                    {formatMoney({ amount: savings, currency: "USD" })}
                  </small>
                )}
              </span>
            </button>

            {summary && (
              <div className="inline-order-summary">
                <p className="order-points">
                  Complete this purchase to earn 4 points
                </p>
                {lines.map((line) => {
                  const net = capturedLineAmount(
                    line,
                    line.product.price.amount,
                  );
                  return (
                    <div
                      className="order-item source-summary-item"
                      key={`${line.productId}-${line.variantId}`}
                    >
                      <img src={line.product.images[0]} alt="" />
                      <span>
                        <strong>{line.product.title}</strong>
                        {net !== line.product.price.amount && (
                          <small>27% OFF BACK TO SCHOOL SALE (-$1.35)</small>
                        )}
                        <small>Quantity {line.quantity}</small>
                      </span>
                      <strong>
                        {net !== line.product.price.amount && (
                          <del>{formatMoney(line.product.price)}</del>
                        )}{" "}
                        {formatMoney({
                          amount: net * line.quantity,
                          currency: line.product.price.currency,
                        })}
                      </strong>
                    </div>
                  );
                })}
                {checkoutRecommendations
                  .filter((p) => extraIds.includes(p.id))
                  .map((product) => (
                    <div
                      className="order-item source-summary-item"
                      key={product.id}
                    >
                      <img src={product.image} alt="" />
                      <span>{product.name}</span>
                      <strong>
                        {formatMoney({
                          amount: product.amount,
                          currency: "USD",
                        })}
                      </strong>
                    </div>
                  ))}
                <form
                  className="discount-form source-discount-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setDiscountError(true);
                  }}
                >
                  <input
                    aria-label="Discount code"
                    placeholder="Discount code"
                    disabled={processing}
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      setDiscountError(false);
                    }}
                  />
                  <button type="submit" disabled={processing}>
                    Apply
                  </button>
                </form>
                {discountError && (
                  <p className="form-error" role="alert">
                    Discount codes cannot be validated in this reference
                    preview.
                  </p>
                )}
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
                  <p className="checkout-total-line">
                    <strong>Total</strong>
                    <strong>
                      {formatMoney({ amount: total, currency: "USD" })}
                    </strong>
                  </p>
                  {savings > 0 && (
                    <strong className="checkout-savings">
                      TOTAL SAVINGS{" "}
                      {formatMoney({ amount: savings, currency: "USD" })}
                    </strong>
                  )}
                </div>
              </div>
            )}

            <p className="checkout-terms">
              By clicking ‘Pay Now’ you agree to Kitsch’s{" "}
              <Link href="/stores/kitsch?info=terms">Terms of Service</Link> and{" "}
              <Link href="/stores/kitsch?info=privacy">Privacy Policy</Link>.
            </p>
          </div>

          <div className="checkout-pay">
            <button
              className="primary"
              onClick={() => {
                if (processing) return;
                setProcessing(true);
                window.setTimeout(() => {
                  setProcessing(false);
                  setPaymentBoundary(true);
                }, 900);
              }}
              disabled={!address || !selectedPayment || processing}
            >
              {processing ? (
                <span className="processing-label">
                  <i aria-hidden="true" /> Processing...
                </span>
              ) : (
                <>
                  <span>Pay now</span>
                  <b>{formatMoney({ amount: total, currency: "USD" })}</b>
                </>
              )}
            </button>
          </div>
        </>
      )}

      <Sheet
        open={addressModal}
        title={editingAddressId ? "Edit address" : "Add address"}
        className="source-address-sheet"
        onClose={() => setAddressModal(false)}
      >
        <SourceAddressEditor
          key={`${addressModal}-${editingAddressId}`}
          variant="sheet"
          initialValue={addressDraft}
          onCancel={() => setAddressModal(false)}
          onSave={(next) => {
            const saved = saveAddress(next);
            setEditingAddressId(saved.id);
            setAddressModal(false);
          }}
        />
      </Sheet>

      <Sheet
        open={paymentModal}
        title="Payment methods"
        className="source-payment-sheet"
        onClose={() => setPaymentModal(false)}
      >
        <SourcePaymentEditor
          addresses={addresses}
          selectedAddressId={addressId}
          onCancel={() => setPaymentModal(false)}
          onPreviewSaved={() => {
            const id = "shop-source-masked-card";
            setPayments((current) =>
              current.some((entry) => entry.id === id)
                ? current
                : [...current, { id, last4: "••••" }],
            );
            setPaymentChoice(id);
            setPaymentModal(false);
          }}
        />
      </Sheet>

      <Sheet
        open={Boolean(deleteAddressId)}
        title="Delete address"
        className="delete-address-confirm source-delete-address"
        onClose={() => setDeleteAddressId("")}
      >
        <p>
          Are you sure you want to delete the address{" "}
          {(() => {
            const target = addresses.find(
              (entry) => entry.id === deleteAddressId,
            );
            return target
              ? `${target.firstName} ${target.lastName}, ${target.street} ${target.city} ${target.region} ${target.postalCode}, US?`
              : "?";
          })()}
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
              const remaining = addresses.filter(
                (entry) => entry.id !== deleteAddressId,
              );
              setAddresses(remaining);
              if (addressId === deleteAddressId)
                setAddressId(remaining[0]?.id ?? "");
              setDeleteAddressId("");
            }}
          >
            Delete
          </button>
        </div>
      </Sheet>

      <Sheet
        open={paymentBoundary}
        title="Payment service is not connected"
        className="source-payment-boundary"
        onClose={() => setPaymentBoundary(false)}
      >
        <p>
          No card was charged and no order was created. The confirmation in the
          frozen reference is available below only as a captured source state.
        </p>
        <Link
          className="primary form-submit"
          href="/orders/REF-1001/confirmation"
          onClick={() => setPaymentBoundary(false)}
        >
          View captured source confirmation
        </Link>
        <button
          className="form-cancel"
          onClick={() => setPaymentBoundary(false)}
        >
          Back to checkout
        </button>
      </Sheet>
    </ShopSurface>
  );
}

function SourcePhoneSetup({
  stage,
  phone,
  onPhoneChange,
  onStageChange,
  onDone,
}: {
  stage: "phone" | "code";
  phone: string;
  onPhoneChange: (phone: string) => void;
  onStageChange: (stage: "phone" | "code") => void;
  onDone: (phone: string) => void;
}) {
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [boundary, setBoundary] = useState(false);
  const digits = phone.replace(/\D/g, "");
  const beginBoundary = () => {
    if (processing) return;
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      setBoundary(true);
    }, 650);
  };
  return (
    <>
      <form
        className="source-phone-setup"
        onSubmit={(event) => {
          event.preventDefault();
          if (stage === "phone") onStageChange("code");
          else if (code.length === 6) beginBoundary();
        }}
      >
        <div className="checkout-steps source-phone-steps">
          <i className="active" />
          <i className={stage === "code" ? "active" : ""} />
          <i />
          <i />
        </div>
        {stage === "phone" ? (
          <>
            <p className="source-phone-intro">
              Check out faster and safer. Your mobile number will be used to
              secure your payment information with Shop Pay.
            </p>
            <label className="source-phone-field">
              <span>Phone number</span>
              <div>
                <b>+1</b>
                <input
                  aria-label="Phone number"
                  inputMode="tel"
                  autoFocus
                  value={phone}
                  onChange={(event) =>
                    onPhoneChange(event.target.value.replace(/[^0-9 ()-]/g, ""))
                  }
                  placeholder="Enter your phone number"
                />
                <span aria-hidden="true">🇺🇸⌄</span>
              </div>
            </label>
            <p className="source-phone-note">
              We’ll send you a security code to confirm it’s you.
            </p>
            <button
              className="primary source-phone-next"
              disabled={digits.length < 7}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <p className="source-code-intro">
              Enter the code sent to +1{digits}
            </p>
            <label className="source-code-entry">
              <span className="sr-only">Security code</span>
              <div aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <span key={index}>{code[index] ?? ""}</span>
                ))}
              </div>
              <input
                aria-label="Security code"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={code}
                maxLength={6}
                onChange={(event) => {
                  const next = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);
                  setCode(next);
                  if (next.length === 6) window.setTimeout(beginBoundary, 0);
                }}
              />
            </label>
            {processing && (
              <span
                className="source-code-spinner"
                aria-label="Checking code"
              />
            )}
            <button
              type="button"
              className="checkout-link source-resend-code"
              onClick={() => setBoundary(true)}
            >
              Resend code
            </button>
          </>
        )}
      </form>
      <Sheet
        open={boundary}
        title="Phone verification is not connected"
        className="source-phone-boundary"
        onClose={() => setBoundary(false)}
      >
        <p>
          No security code was sent and this number has not been verified. The
          next screen is available only to continue the frozen reference
          journey.
        </p>
        <button
          className="primary form-submit"
          onClick={() => {
            setBoundary(false);
            onDone(`+1${digits}`);
          }}
        >
          Continue to captured shipping address
        </button>
        <button className="form-cancel" onClick={() => setBoundary(false)}>
          Back to code entry
        </button>
      </Sheet>
    </>
  );
}

function SourceAddressLookup({
  onSelect,
  onManual,
}: {
  onSelect: (address: Address) => void;
  onManual: () => void;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const showSuggestion = focused && query.trim().length > 0;
  return (
    <div className="source-address-lookup">
      {!focused && (
        <label className="form-field">
          Country/Region
          <select defaultValue="United States">
            <option>United States</option>
          </select>
        </label>
      )}
      <label className="form-field source-address-search-field">
        <span>{focused ? "Address" : ""}</span>
        <input
          aria-label="Search address"
          placeholder="Start typing address..."
          value={query}
          autoFocus={false}
          onFocus={() => setFocused(true)}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear address"
            onClick={() => setQuery("")}
          >
            ×
          </button>
        )}
      </label>
      {focused && (
        <button className="checkout-link" onClick={onManual}>
          Enter address manually
        </button>
      )}
      {showSuggestion && (
        <button
          className="source-address-suggestion"
          onClick={() => onSelect({ ...shopSourceAddress, id: "" })}
        >
          <span>⌖</span>
          <span>
            <strong>1226 University Dr</strong>
            <small>Menlo Park, CA 94025, United States</small>
          </span>
        </button>
      )}
      {focused && (
        <p className="source-google-note">Suggestions powered by Google</p>
      )}
      <button className="primary address-lookup-continue" onClick={onManual}>
        Continue to payment details
      </button>
    </div>
  );
}

function SourceAddressEditor({
  initialValue,
  onSave,
  onCancel,
  variant,
}: {
  initialValue: Address;
  onSave: (value: Address) => void;
  onCancel: () => void;
  variant: "initial" | "sheet";
}) {
  const [value, setValue] = useState(initialValue);
  const change = (key: keyof Address, next: string | boolean) =>
    setValue((current) => ({ ...current, [key]: next }));
  const field = (
    key: keyof Pick<
      Address,
      | "firstName"
      | "lastName"
      | "company"
      | "street"
      | "apartment"
      | "city"
      | "postalCode"
      | "phone"
    >,
    label: string,
    required = true,
  ) => (
    <label className="form-field" key={key}>
      {label}
      <input
        aria-label={label}
        value={String(value[key] ?? "")}
        required={required}
        type={key === "phone" ? "tel" : "text"}
        onChange={(event) => change(key, event.target.value)}
      />
    </label>
  );
  return (
    <form
      className={`source-address-editor source-address-editor-${variant}`}
      onSubmit={(event) => {
        event.preventDefault();
        onSave(value);
      }}
    >
      <label className="form-field">
        Country/Region
        <select
          value={value.country}
          onChange={(event) => change("country", event.target.value)}
        >
          <option>United States</option>
        </select>
      </label>
      {field("firstName", "First name")}
      {field("lastName", "Last name")}
      {field("company", "Company (optional)", false)}
      {field("street", "Address")}
      {field("apartment", "Apartment, suite, etc (optional)", false)}
      {field("phone", "Phone (optional)", false)}
      {field("city", "City")}
      <label className="form-field">
        State
        <select
          aria-label="State"
          value={value.region}
          onChange={(event) => change("region", event.target.value)}
          required
        >
          <option value="">State</option>
          <option value="CA">California</option>
        </select>
      </label>
      {field("postalCode", "ZIP code")}
      {variant === "sheet" && (
        <label className="check-row source-default-address">
          <input
            type="checkbox"
            checked={value.isDefault}
            onChange={(event) => change("isDefault", event.target.checked)}
          />
          Set as default address
        </label>
      )}
      <div className="editor-actions">
        {variant === "sheet" && (
          <button type="button" className="form-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary form-submit">
          {variant === "initial"
            ? "Continue to payment details"
            : "Save address"}
        </button>
      </div>
    </form>
  );
}

function SourcePaymentEditor({
  addresses,
  selectedAddressId,
  onCancel,
  onPreviewSaved,
}: {
  addresses: Address[];
  selectedAddressId: string;
  onCancel: () => void;
  onPreviewSaved: () => void;
}) {
  const [method, setMethod] = useState<"card" | "apple">("card");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState(
    `${shopSourceBuyer.firstName} ${shopSourceBuyer.lastName}`,
  );
  const [nickname, setNickname] = useState("");
  const [billing, setBilling] = useState(selectedAddressId);
  const [billOpen, setBillOpen] = useState(false);
  const [billingEditor, setBillingEditor] = useState(false);
  const [addedBillingAddresses, setAddedBillingAddresses] = useState<Address[]>(
    [],
  );
  const billingAddresses = [...addresses, ...addedBillingAddresses];
  const [boundary, setBoundary] = useState(false);
  const validCard =
    /^\d{12,19}$/.test(number.replace(/\D/g, "")) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvc);
  const selectedBilling = billingAddresses.find(
    (entry) => entry.id === billing,
  );
  return (
    <>
      <form
        className="source-payment-editor"
        onSubmit={(event) => {
          event.preventDefault();
          setBoundary(true);
        }}
      >
        <label className="shipping-option selected source-payment-method-choice">
          <input
            type="radio"
            name="new-payment"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <span>
            <strong>Credit card</strong>
            <small>VISA Mastercard AMEX +5</small>
          </span>
        </label>
        <div className="source-card-fields">
          <label className="form-field">
            Card number
            <input
              aria-label="Card number"
              inputMode="numeric"
              autoComplete="off"
              disabled={method !== "card"}
              value={number}
              onChange={(event) =>
                setNumber(event.target.value.replace(/[^0-9 ]/g, ""))
              }
              placeholder="Card number"
            />
          </label>
          <div>
            <label className="form-field">
              Expiration
              <input
                aria-label="Expiration"
                disabled={method !== "card"}
                value={expiry}
                onChange={(event) => setExpiry(event.target.value)}
                placeholder="MM/YY"
              />
            </label>
            <label className="form-field">
              Security code
              <input
                aria-label="Security code"
                inputMode="numeric"
                disabled={method !== "card"}
                value={cvc}
                onChange={(event) =>
                  setCvc(event.target.value.replace(/\D/g, ""))
                }
                placeholder="CVC"
              />
            </label>
          </div>
        </div>
        <label className="form-field">
          Name on card
          <input
            value={name}
            disabled={method !== "card"}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="form-field">
          Nickname (optional)
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </label>
        <label className="shipping-option source-payment-method-choice">
          <input
            type="radio"
            name="new-payment"
            checked={method === "apple"}
            onChange={() => setMethod("apple")}
          />
          <strong>Apple Pay</strong>
        </label>
        <button
          type="button"
          className="source-bill-to"
          aria-expanded={billOpen}
          onClick={() => setBillOpen((current) => !current)}
        >
          <span>Bill to</span>
          {!billOpen && selectedBilling && (
            <span>
              {selectedBilling.firstName} {selectedBilling.lastName},{" "}
              {selectedBilling.street}
            </span>
          )}
          <b>{billOpen ? "⌃" : "⌄"}</b>
        </button>
        {billOpen && (
          <div className="source-billing-options">
            {billingAddresses.map((entry) => (
              <label
                className={`shipping-option ${billing === entry.id ? "selected" : ""}`}
                key={entry.id}
              >
                <input
                  type="radio"
                  name="billing"
                  checked={billing === entry.id}
                  onChange={() => setBilling(entry.id)}
                />
                <span>
                  <strong>
                    {entry.firstName} {entry.lastName}
                  </strong>
                  <span>{entry.street}</span>
                  <span>
                    {entry.city}, {entry.region} {entry.postalCode}
                  </span>
                </span>
              </label>
            ))}
            <button
              type="button"
              className="checkout-link"
              onClick={() => setBillingEditor(true)}
            >
              ＋ Use a different address
            </button>
          </div>
        )}
        {boundary && (
          <div className="payment-preview-boundary" role="status">
            <strong>Payment service is not connected.</strong>
            <p>No payment method was added and no card data was sent.</p>
            {method === "card" && validCard && (
              <button
                type="button"
                className="primary form-submit"
                onClick={onPreviewSaved}
              >
                Preview captured post-save state
              </button>
            )}
            {method === "card" && !validCard && (
              <p className="form-error">
                Check the card fields before previewing the captured state.
              </p>
            )}
            {method === "apple" && (
              <p className="form-error">
                Apple Pay is not connected in this reference preview.
              </p>
            )}
          </div>
        )}
        <div className="editor-actions">
          <button type="button" className="form-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="primary form-submit" type="submit">
            Save
          </button>
        </div>
      </form>
      <Sheet
        open={billingEditor}
        title="Billing address"
        className="source-address-sheet"
        onClose={() => setBillingEditor(false)}
      >
        <SourceAddressEditor
          key={String(billingEditor)}
          variant="sheet"
          initialValue={blankCheckoutAddress()}
          onCancel={() => setBillingEditor(false)}
          onSave={(address) => {
            const added = { ...address, id: crypto.randomUUID() };
            setAddedBillingAddresses((current) => [...current, added]);
            setBilling(added.id);
            setBillingEditor(false);
          }}
        />
      </Sheet>
    </>
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
    const product = catalog.products.find((entry) => entry.id === id);
    return product ? [product] : [];
  });
  const lines = state.cart.filter(
    (line) =>
      catalog.products.find((product) => product.id === line.productId)
        ?.storeId === storeId,
  );
  const subtotal = lines.reduce(
    (n, line) =>
      n +
      capturedLineAmount(
        line,
        catalog.products.find((product) => product.id === line.productId)?.price
          .amount ?? 0,
      ) *
        line.quantity,
    0,
  );
  const comparison =
    lines.length > 0 &&
    lines.every((line) => capturedOfferCompareAt(line) !== undefined)
      ? lines.reduce(
          (amount, line) =>
            amount + (capturedOfferCompareAt(line) ?? 0) * line.quantity,
          0,
        )
      : undefined;
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
        {products.map((product) => (
          <article key={product.id}>
            <Link href={`/products/${product.id}`} onClick={onClose}>
              <img src={product.images[0]} alt="" />
              {product.compareAt && (
                <span className="offer-discount">47% off</span>
              )}
              <strong>{product.title}</strong>
              <span>
                {formatMoney(product.price)}{" "}
                {product.compareAt && (
                  <del>{formatMoney(product.compareAt)}</del>
                )}
              </span>
            </Link>
            <button
              className="offer-heart"
              aria-label={`Save ${product.title}`}
              aria-pressed={state.saved.includes(product.id)}
              onClick={() => state.toggleSaved(product.id)}
            >
              {state.saved.includes(product.id) ? "♥" : "♡"}
            </button>
          </article>
        ))}
      </div>
      <div className="offer-footer">
        <p>
          In your cart{" "}
          <strong>{lines.reduce((n, line) => n + line.quantity, 0)}</strong>
          <span>
            {comparison !== undefined && comparison > subtotal && (
              <del>{formatMoney({ amount: comparison, currency: "USD" })}</del>
            )}{" "}
            {formatMoney({ amount: subtotal, currency: "USD" })}
          </span>
        </p>
        <div className="offer-cart-thumbnails" aria-hidden="true">
          {lines.slice(0, 3).map((line) => {
            const product = catalog.products.find(
              (entry) => entry.id === line.productId,
            );
            return product ? (
              <img
                key={`${line.productId}-${line.variantId}`}
                src={product.images[0]}
                alt=""
              />
            ) : null;
          })}
        </div>
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
