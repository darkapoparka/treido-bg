"use client";
import { useState } from "react";
import { Sheet } from "../discovery/components";
import { AddressEditor } from "../account/forms";
import { blankAddress, type Address } from "../account/state";
export function InitialPayment({
  address,
  onContinue,
}: {
  address?: Address;
  onContinue: () => void;
}) {
  const [same, setSame] = useState(true),
    [boundary, setBoundary] = useState(false),
    [billing, setBilling] = useState<Address | undefined>(),
    [editing, setEditing] = useState(false),
    [error, setError] = useState("");
  return (
    <>
      <form
        className="initial-payment"
        onSubmit={(e) => {
          e.preventDefault();
          const number = String(
            new FormData(e.currentTarget).get("cardNumber") ?? "",
          ).replace(/\s/g, "");
          if (!/^\d{12,19}$/.test(number)) {
            setError("Check your card number and try again.");
            return;
          }
          setError("");
          if (!same && !billing) {
            setEditing(true);
            return;
          }
          setBoundary(true);
        }}
      >
        <div className="initial-card-fields">
          <input
            name="cardNumber"
            aria-label="Card number"
            placeholder="Card number"
            inputMode="numeric"
            autoComplete="off"
            required
            pattern="[0-9 ]{12,23}"
            minLength={12}
            maxLength={23}
          />
          <div>
            <input
              aria-label="Expiry (MM/YY)"
              placeholder="Expiry (MM/YY)"
              autoComplete="off"
              pattern="(0[1-9]|1[0-2])/[0-9]{2}"
              required
            />
            <input
              aria-label="CVV"
              placeholder="CVV"
              autoComplete="off"
              inputMode="numeric"
              pattern="[0-9]{3,4}"
              required
            />
          </div>
        </div>
        <input
          className="initial-card-name"
          aria-label="Name on card"
          placeholder="Name on card"
          autoComplete="off"
          required
        />
        <label className="initial-billing">
          <input
            type="checkbox"
            checked={same}
            onChange={(e) => {
              setSame(e.target.checked);
              if (!e.target.checked) setEditing(true);
            }}
          />
          <span>
            Billing address same as shipping
            <small>
              {address
                ? `${address.street}, ${address.city}, ${address.postalCode}, US`
                : "Add a shipping address"}
            </small>
          </span>
        </label>
        {!same && billing && (
          <div className="initial-billing-selection">
            <strong>Billing address</strong>
            <p>
              {billing.firstName} {billing.lastName}
              <br />
              {billing.street}
              <br />
              {billing.city}, {billing.region} {billing.postalCode}
            </p>
            <button
              type="button"
              className="checkout-link"
              onClick={() => setEditing(true)}
            >
              Edit billing address
            </button>
          </div>
        )}
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        {!same && !billing && (
          <button
            type="button"
            className="checkout-link"
            onClick={() => setEditing(true)}
          >
            Add billing address
          </button>
        )}
        <div className="checkout-pay">
          <button className="primary">Continue to review</button>
        </div>
      </form>
      <Sheet
        open={editing}
        title="Billing address"
        onClose={() => setEditing(false)}
      >
        <AddressEditor
          initialValue={billing ?? blankAddress()}
          variant="checkout"
          onSave={(a) => {
            setBilling(a);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </Sheet>
      <Sheet
        open={boundary}
        title="Payment service is not connected"
        onClose={() => setBoundary(false)}
      >
        <p>Your card has not been saved or charged.</p>
        <button
          className="form-cancel"
          onClick={() => {
            setBoundary(false);
            onContinue();
          }}
        >
          Continue with saved payment method
        </button>
      </Sheet>
    </>
  );
}
