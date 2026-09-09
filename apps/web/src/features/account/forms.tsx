"use client";
import Link from "next/link";
import { AccountIcon } from "./icons";
import { useState, type ReactNode } from "react";
import { FloatingNav, Sheet } from "../discovery/components";
import { useAccount, blankAddress, type Address } from "./state";
export function AccountPage({
  title,
  children,
  action,
  dock = true,
  back = true,
  className = "",
  onBack,
}: {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  dock?: boolean;
  back?: boolean;
  className?: string;
  onBack?: () => void;
}) {
  return (
    <main className={`shop-page account-page ${className}`}>
      <header className="account-heading">
        {title && <h1>{title}</h1>}
        {action}
      </header>
      {children}
      {dock && <FloatingNav back={back} onBack={onBack} />}
    </main>
  );
}
export function Row({
  label,
  value,
  href,
  onClick,
}: {
  label: string;
  value?: string;
  href?: string;
  onClick?: () => void;
}) {
  const glyph = (
    {
      Addresses: "location",
      "Sign in & security": "shield",
      Notifications: "bell",
      Connections: "link",
      Support: "help",
      "Data & privacy": "lock",
    } as const
  )[label as "Addresses"];
  const content = (
    <>
      {glyph && <AccountIcon name={glyph} />}
      <span>
        {label}
        {value && <small>{value}</small>}
      </span>
      <span aria-hidden="true">›</span>
    </>
  );
  return href ? (
    <Link className="account-row" href={href}>
      {content}
    </Link>
  ) : (
    <button className="account-row" onClick={onClick}>
      {content}
    </button>
  );
}
export function Boundary({
  open,
  onClose,
  kind,
}: {
  open: boolean;
  onClose: () => void;
  kind: string;
}) {
  return (
    <Sheet open={open} title={`${kind} unavailable`} onClose={onClose}>
      <p className="form-note">
        This isolated reference preview has no connected {kind.toLowerCase()}{" "}
        service. No request was sent and no live account, payment or order was
        changed.
      </p>
      <button className="primary form-submit" onClick={onClose}>
        Back to preview
      </button>
    </Sheet>
  );
}
export function AddressEditor({
  initialValue,
  onSave,
  onCancel,
  onDelete,
  variant = "account",
  onChange,
}: {
  initialValue: Address;
  onSave: (value: Address) => void;
  onCancel: () => void;
  onDelete?: () => void;
  variant?: "account" | "checkout" | "initial";
  onChange?: (value: Address) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const change = (next: Address) => {
    setValue(next);
    onChange?.(next);
  };
  const baseFields = [
    ["firstName", "First name"],
    ["lastName", "Last name"],
    ["company", "Company (optional)"],
    ["street", "Address"],
    ["apartment", "Apartment, suite, etc (optional)"],
    ["city", "City"],
    ["region", "State"],
    ["postalCode", "ZIP code"],
    ["phone", "Phone (optional)"],
  ] as const;
  const fields =
    variant === "initial"
      ? [
          ...baseFields.slice(0, 2),
          baseFields[3],
          baseFields[4],
          baseFields[2],
          baseFields[8],
          ...baseFields.slice(5, 8),
        ]
      : baseFields;
  const countryField = (
    <label className="form-field">
      Country/region
      <select
        value={value.country}
        onChange={(e) => change({ ...value, country: e.target.value })}
      >
        {["United States", "Bulgaria", "United Kingdom", "Singapore"].map(
          (c) => (
            <option key={c}>{c}</option>
          ),
        )}
      </select>
    </label>
  );
  return (
    <form
      className={`account-form address-editor address-editor-${variant}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSave(value);
      }}
    >
      {variant === "checkout" && countryField}
      {fields.map(([key, label]) => (
        <div className="address-field-row" key={key}>
          <label className="form-field">
            {label}
            {key === "region" && value.country === "United States" ? (
              <select
                aria-label="State"
                value={value.region}
                onChange={(e) => change({ ...value, region: e.target.value })}
              >
                <option value="">State</option>
                {[
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "CA",
                  "CO",
                  "CT",
                  "DE",
                  "FL",
                  "GA",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "ME",
                  "MD",
                  "MA",
                  "MI",
                  "MN",
                  "MS",
                  "MO",
                  "MT",
                  "NE",
                  "NV",
                  "NH",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "UT",
                  "VT",
                  "VA",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                  "DC",
                ].map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            ) : (
              <input
                aria-label={label}
                required={
                  !["apartment", "company", "phone", "region"].includes(key)
                }
                type={key === "phone" ? "tel" : "text"}
                value={value[key]}
                maxLength={160}
                onChange={(e) => change({ ...value, [key]: e.target.value })}
              />
            )}
          </label>
          {key === "lastName" && variant !== "checkout" && countryField}
        </div>
      ))}
      {variant !== "initial" && (
        <>
          <p className="address-phone-help">
            In case we need to contact you about your order
          </p>
          <label className="check-row">
            <input
              type="checkbox"
              checked={value.isDefault}
              onChange={(e) =>
                change({ ...value, isDefault: e.target.checked })
              }
            />
            Set as default address
          </label>
        </>
      )}
      <div className="editor-actions">
        {variant !== "initial" && (
          <button className="form-cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="primary form-submit" type="submit">
          {variant === "initial" ? "Continue to payment details" : "Save"}
        </button>
      </div>
      {onDelete && (
        <button
          className="danger-text form-cancel"
          type="button"
          onClick={onDelete}
        >
          Delete address
        </button>
      )}
    </form>
  );
}
export function PhoneEditor({
  onDone,
  onStageChange,
  controlledStage,
  initialPhone = "",
  onPhoneChange,
}: {
  onDone: (phone: string) => void;
  onStageChange?: (stage: "phone" | "code") => void;
  controlledStage?: "phone" | "code";
  initialPhone?: string;
  onPhoneChange?: (phone: string) => void;
}) {
  const [phone, setPhone] = useState(initialPhone);
  const [country, setCountry] = useState("+1");
  const [localStage, setLocalStage] = useState<"phone" | "code">("phone");
  const stage = controlledStage ?? localStage;
  const setStage = (next: "phone" | "code") => {
    setLocalStage(next);
    onStageChange?.(next);
  };
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  return (
    <form
      className="account-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (stage === "phone") {
          setStage("code");
          onStageChange?.("code");
        } else {
          setMessage(
            "Phone verification is not connected. This number has not been verified.",
          );
        }
      }}
    >
      <div className="checkout-steps">
        <i />
        <i className={stage === "code" ? "active" : ""} />
        <i />
        <i />
      </div>
      {stage === "phone" ? (
        <>
          <p>
            Check out faster and safer. Your mobile number will be used to
            secure your payment information with Shop Pay.
          </p>
          <label className="form-field">
            Phone number
            <div className="phone-input">
              <select
                aria-label="Country calling code"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {["+1", "+44", "+359", "+49", "+33"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                type="tel"
                required
                pattern="[0-9 ()-]{7,20}"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  onPhoneChange?.(e.target.value);
                }}
                placeholder="Phone number"
              />
            </div>
          </label>
          <p className="form-note">
            Reference preview: continue to preview the code screen. No code is
            sent.
          </p>
          <button className="primary form-submit">Continue</button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="checkout-link"
            onClick={() => {
              setStage("phone");
              onStageChange?.("phone");
            }}
          >
            ‹ Back
          </button>

          <p>
            Enter the 6-digit code for {country} {phone}.
          </p>
          <label className="form-field">
            Security code
            <CodeInput
              value={code}
              onChange={(value) => {
                setCode(value);
                if (value.length === 6)
                  setMessage(
                    "Phone verification is not connected. This number has not been verified.",
                  );
              }}
              label="Security code"
            />
          </label>
          <button
            type="button"
            className="checkout-link"
            onClick={() =>
              setMessage(
                "No code was sent. Verification service is not connected.",
              )
            }
          >
            Resend code
          </button>

          {message && (
            <button
              type="button"
              className="form-cancel"
              onClick={() => onDone(`${country} ${phone}`)}
            >
              Use as unverified reference number
            </button>
          )}
          {message && (
            <p role="status" className="form-note">
              {message}
            </p>
          )}
        </>
      )}
    </form>
  );
}
export function PaymentEditor({ checkout = false }: { checkout?: boolean }) {
  const [error, setError] = useState("");
  const [hasNumber, setHasNumber] = useState(false);
  const [cardTail, setCardTail] = useState("");
  const account = useAccount();
  const [billing, setBilling] = useState(
    account.addresses.find((a) => a.isDefault)?.id ?? "",
  );
  const [editBilling, setEditBilling] = useState(false);
  const [method, setMethod] = useState("card");
  return (
    <>
      <form
        className={`account-form card-editor ${checkout ? "card-editor-checkout" : "card-editor-profile"} ${hasNumber ? "has-number" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (method === "apple") {
            setError(
              "Apple Pay is not connected. No payment method was added.",
            );
            return;
          }
          const data = new FormData(e.currentTarget);
          const number = String(data.get("cardNumber") ?? "").replace(
            /\D/g,
            "",
          );
          const expiry = String(data.get("expiry") ?? "");
          const cvc = String(data.get("cvc") ?? "");
          if (number.length < 12 || number.length > 19) {
            setError("Check your card number and try again.");
            return;
          }
          if (
            !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry) ||
            !/^\d{3,4}$/.test(cvc)
          ) {
            setError("Check the expiry date and security code.");
            return;
          }
          setError(
            "Payment service is not connected. Your card was not added.",
          );
        }}
      >
        {!checkout && (
          <div
            className={`payment-illustration ${cardTail.length === 4 ? "entered" : ""}`}
          >
            <svg viewBox="0 0 30 24" aria-hidden="true">
              <rect x="1" y="1" width="28" height="22" rx="4" />
              <path d="M10 1v22m10-22v22M1 8h28M1 16h28" />
            </svg>
            <span>{hasNumber ? `•••• •••• •••• ${cardTail}` : ""}</span>
            {cardTail.length === 4 && <b>VISA</b>}
          </div>
        )}
        {!checkout && (
          <p className="form-note centered">
            Add a card to save for future checkouts
          </p>
        )}
        {checkout && (
          <label className="shipping-option">
            <input
              type="radio"
              name="new-payment"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Credit card <span className="visa-mark">VISA</span>
          </label>
        )}
        <div className="card-inputs">
          <label>
            Card number
            <input
              disabled={method === "apple"}
              name="cardNumber"
              onChange={(e) => {
                setHasNumber(Boolean(e.target.value));
                setCardTail(e.target.value.replace(/\D/g, "").slice(-4));
                setError("");
              }}
              aria-label="Card number"
              inputMode="numeric"
              placeholder="Card number"
              maxLength={19}
              required
              autoComplete="off"
            />
          </label>
          <label>
            Expiry
            <input
              disabled={method === "apple"}
              name="expiry"
              aria-label="Expiry"
              placeholder="MM/YY"
              maxLength={5}
              required
              autoComplete="off"
            />
          </label>
          <label>
            CVC
            <input
              disabled={method === "apple"}
              name="cvc"
              aria-label="CVC"
              inputMode="numeric"
              placeholder="CVC"
              maxLength={4}
              required
              autoComplete="off"
            />
          </label>
        </div>
        <label className="form-field">
          Name on card
          <input
            disabled={method === "apple"}
            required
            autoComplete="off"
            placeholder="Name on card"
          />
        </label>
        {checkout && (
          <>
            <label className="form-field">
              Nickname (optional)
              <input autoComplete="off" />
            </label>
            <label className="shipping-option">
              <input
                type="radio"
                name="new-payment"
                checked={method === "apple"}
                onChange={() => setMethod("apple")}
              />
              Apple Pay
            </label>
          </>
        )}
        <details open>
          <summary>Bill to</summary>
          {account.addresses.map((a) => (
            <label className="shipping-option" key={a.id}>
              <input
                type="radio"
                name="billing"
                checked={billing === a.id}
                onChange={() => setBilling(a.id)}
              />
              <span>
                {a.firstName} {a.lastName}
                <br />
                {a.street}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </span>
            </label>
          ))}
          <button
            type="button"
            className="checkout-link"
            onClick={() => setEditBilling(true)}
          >
            + Use a different address
          </button>
        </details>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="primary form-submit">
          {checkout ? "Save" : "Save card"}
        </button>
      </form>
      <Sheet
        open={editBilling}
        title="Billing address"
        onClose={() => setEditBilling(false)}
      >
        <AddressEditor
          key={String(editBilling)}
          initialValue={blankAddress()}
          onCancel={() => setEditBilling(false)}
          onSave={(a) => {
            account.saveAddress(a);
            setBilling(a.id);
            setEditBilling(false);
          }}
        />
      </Sheet>
    </>
  );
}

export function CodeInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className="six-code">
      <div aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span className={value[i] ? "filled" : ""} key={i}>
            {value[i]}
          </span>
        ))}
      </div>
      <input
        aria-label={label}
        inputMode="numeric"
        autoComplete="one-time-code"
        required
        pattern="[0-9]{6}"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      />
    </div>
  );
}
export function DateFields({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [year, setYear] = useState(value.split("-")[0] ?? "");
  const [month, setMonth] = useState(value.split("-")[1] ?? "");
  const [day, setDay] = useState(value.split("-")[2] ?? "");
  return (
    <div className="date-fields">
      {[
        ["Month", month, "MM"],
        ["Day", day, "DD"],
        ["Year", year, "YYYY"],
      ].map(([label, current, placeholder], i) => (
        <input
          key={label}
          aria-label={label}
          inputMode="numeric"
          placeholder={placeholder}
          maxLength={i === 2 ? 4 : 2}
          value={current}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            if (i === 0) setMonth(v);
            if (i === 1) setDay(v);
            if (i === 2) setYear(v);
            const nextYear = i === 2 ? v : year,
              nextMonth = i === 0 ? v : month,
              nextDay = i === 1 ? v : day;
            onChange(
              !nextYear && !nextMonth && !nextDay
                ? ""
                : `${nextYear}-${nextMonth.padStart(2, "0")}-${nextDay.padStart(2, "0")}`,
            );
          }}
        />
      ))}
    </div>
  );
}

export function AddressLookup({
  onSelect,
  onManual,
}: {
  onSelect: (address: Address) => void;
  onManual: () => void;
}) {
  const { addresses } = useAccount();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("United States");
  const [search, setSearch] = useState(false);
  return (
    <div className="address-lookup">
      {!search && (
        <label className="form-field">
          Country/region
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {["United States", "Bulgaria", "United Kingdom", "Singapore"].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </label>
      )}
      <label className="form-field">
        <input
          aria-label="Search address"
          placeholder="Start typing address..."
          value={query}
          onFocus={() => setSearch(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {search && (
        <>
          <button className="checkout-link" onClick={onManual}>
            Enter address manually
          </button>
          {addresses
            .filter((a) =>
              `${a.street} ${a.city}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((a) => (
              <button
                key={a.id}
                className="account-row"
                onClick={() =>
                  onSelect({ ...a, id: crypto.randomUUID(), isDefault: false })
                }
              >
                <span>
                  ⌖　{a.street}
                  <small>
                    {a.city}, {a.region} {a.postalCode}, {a.country}
                  </small>
                </span>
              </button>
            ))}
        </>
      )}
      <button className="primary address-lookup-continue" onClick={onManual}>
        Continue to payment details
      </button>
    </div>
  );
}

export function validBirthday(value: string) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    year >= 1000 &&
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    date.getTime() <= Date.now()
  );
}
