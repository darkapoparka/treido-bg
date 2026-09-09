"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDiscovery } from "../discovery/state";
import { Preferences } from "./preferences";
import type { Catalog } from "../catalog/types";
import { Sheet, consumeSheetHistory } from "../discovery/components";
import {
  AccountPage,
  Row,
  Boundary,
  AddressEditor,
  PhoneEditor,
  PaymentEditor,
  DateFields,
  validBirthday,
} from "./forms";
import {
  useAccount,
  blankAddress,
  type Address,
  type Profile,
  type Person,
} from "./state";
export function ProfilePage({ catalog }: { catalog: Catalog }) {
  const { profile, paymentAvailable, orders } = useAccount();
  const discovery = useDiscovery();
  const [logout, setLogout] = useState(false);
  return (
    <AccountPage className="profile-overview">
      <Link className="account-panel identity-row" href="/account">
        <span className="profile-avatar">{profile.firstName.charAt(0)}</span>
        <span>
          <strong>
            {profile.firstName} {profile.lastName}
          </strong>
          <small>{profile.email}</small>
        </span>
        <b>›</b>
      </Link>
      <Link className="account-panel passkey-row" href="/account/security">
        <span>◉</span>
        <strong>
          Add a passkey for fast and secure sign-in on millions of stores
        </strong>
        <b>›</b>
      </Link>
      <div className="profile-tiles">
        <Link className="account-panel" href="/saved">
          <div className="tile-images">
            {catalog.products
              .filter((p) => discovery.saved.includes(p.id))
              .slice(0, 3)
              .map((p) => (
                <img key={p.id} src={p.images[0]} alt="" />
              ))}
          </div>
          <strong>Saved</strong>
        </Link>
        <Link className="account-panel" href="/following">
          <div className="tile-images">
            {catalog.stores
              .filter((store) => discovery.followed.includes(store.id))
              .slice(0, 3)
              .map((store) => (
                <img key={store.id} src={store.logo} alt="" />
              ))}
          </div>
          <strong>Following</strong>
        </Link>
      </div>
      <h2>
        <Link href="/orders/history">Order history ›</Link>
      </h2>
      <div className="account-panel profile-order-panel">
        {orders.slice(0, 2).map((order, i) => {
          const product = catalog.products.find(
            (p) => p.id === order.productId,
          );
          const seller = catalog.stores.find(
            (store) => store.id === product?.storeId,
          );
          return (
            <Link
              className="profile-order-row"
              key={order.id}
              href={`/orders/${order.id}`}
            >
              <span className="profile-order-logo">
                {seller ? <img src={seller.logo} alt="" /> : order.name[0]}
              </span>
              <span>
                <strong>
                  {i === 0 ? order.name : (seller?.name ?? order.name)}
                </strong>
                <small>
                  {order.status === "In transit"
                    ? "On the way"
                    : order.status === "Ordered"
                      ? "Order placed"
                      : "Delivered"}
                </small>
              </span>
              {i === 0 ? (
                <time>Jul 27</time>
              ) : (
                product && (
                  <img
                    className="profile-order-thumb"
                    src={product.images[0]}
                    alt=""
                  />
                )
              )}
            </Link>
          );
        })}
        <EmailConnection />
      </div>
      {!!discovery.viewedProducts.length && (
        <>
          <h2>Recently viewed ›</h2>
          <div className="profile-recent-rail">
            {discovery.viewedProducts.map((id) => {
              const product = catalog.products.find((p) => p.id === id);
              return product ? (
                <Link key={id} href={`/products/${id}`}>
                  <img src={product.images[0]} alt={product.title} />
                </Link>
              ) : null;
            })}
          </div>
        </>
      )}
      <div className="profile-payment-heading">
        <h2>Payment methods</h2>
        <Link className="pill" href="/account/payments">
          Add card
        </Link>
      </div>
      {paymentAvailable && (
        <Link href="/account/payments">
          <PaymentCard />
        </Link>
      )}
      <div className="account-panel">
        <Row label="Addresses" href="/account/addresses" />
      </div>
      <div className="account-panel">
        <Row label="Sign in & security" href="/account/security" />
        <Row label="Notifications" href="/account/notifications" />
        <Row label="Connections" href="/account/connections" />
        <Row label="Support" href="/support" />
      </div>
      <button className="form-cancel" onClick={() => setLogout(true)}>
        Log out
      </button>
      <Link className="form-cancel danger-text" href="/account/delete">
        Delete account
      </Link>
      <Sheet
        open={logout}
        title="Log out of Shop?"
        onClose={() => setLogout(false)}
      >
        <p className="form-note">
          Leave this local reference profile. There is no authenticated session.
        </p>
        <Link href="/login" className="primary form-submit">
          Log out of preview
        </Link>
        <button className="form-cancel" onClick={() => setLogout(false)}>
          Cancel
        </button>
      </Sheet>
    </AccountPage>
  );
}
export function EmailConnection() {
  const [dismissed, setDismissed] = useState(false);
  return (
    !dismissed && (
      <div className="email-connect">
        <strong>Connect email to see more deliveries</strong>
        <p>Track more of your packages with Shop</p>
        <div>
          <button className="pill" onClick={() => setDismissed(true)}>
            Dismiss
          </button>
          <Link className="black-button" href="/account/connections">
            Connect
          </Link>
        </div>
      </div>
    )
  );
}
export function AccountDetails() {
  const { profile, updateProfile, people } = useAccount();
  const [field, setField] = useState<keyof Profile | null>(null);
  const [draft, setDraft] = useState(profile);
  const [draftError, setDraftError] = useState("");
  const [photo, setPhoto] = useState(false);
  const [phoneStage, setPhoneStage] = useState<"phone" | "code">("phone");
  const [photoError, setPhotoError] = useState("");
  const fields = [
    ["firstName", "First name"],
    ["lastName", "Last name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["gender", "Gender"],
    ["birthday", "Birthday"],
  ] as const;
  const edit = (key: keyof Profile) => {
    setField(key);
  };
  return (
    <AccountPage
      className="profile-editor"
      action={
        field && field !== "phone" ? (
          <button
            className="profile-save"
            onClick={() => {
              if (!validBirthday(draft.birthday)) {
                setDraftError(
                  "Enter a valid birthday that is not in the future.",
                );
                return;
              }
              setDraftError("");
              updateProfile(draft);
              setField(null);
            }}
          >
            Save
          </button>
        ) : undefined
      }
    >
      <div className="account-avatar">
        <span className="profile-avatar large">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Your selected profile" />
          ) : (
            profile.firstName.charAt(0)
          )}
        </span>
        <button
          className="avatar-edit"
          aria-label="Edit profile picture"
          onClick={() => setPhoto(true)}
        >
          ✎
        </button>
        <Link className="pill" href="/account/public">
          View public profile
        </Link>
      </div>
      <div className="account-panel field-panel">
        {fields.map(([key, label]) => (
          <div className="profile-field" key={key}>
            <span>{label}</span>
            {field === key && key !== "phone" ? (
              key === "gender" ? (
                <select
                  aria-label="Gender"
                  value={draft[key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [key]: e.target.value })
                  }
                >
                  {["Select gender", "Female", "Male", "Other"].map(
                    (option) => (
                      <option key={option}>{option}</option>
                    ),
                  )}
                </select>
              ) : key === "birthday" ? (
                <DateFields
                  value={draft.birthday}
                  onChange={(birthday) => setDraft({ ...draft, birthday })}
                />
              ) : (
                <input
                  autoFocus
                  aria-label={label}
                  type="text"
                  value={draft[key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [key]: e.target.value })
                  }
                />
              )
            ) : (
              <button disabled={key === "email"} onClick={() => edit(key)}>
                {(key === "birthday" &&
                validBirthday(draft.birthday) &&
                draft.birthday
                  ? `${draft.birthday.slice(5, 7)}/${draft.birthday.slice(8, 10)}/${draft.birthday.slice(0, 4)}`
                  : draft[key]) ||
                  (key === "gender"
                    ? "Select gender"
                    : `Add ${label.toLowerCase()}`)}
              </button>
            )}
            <span>{key === "email" ? "⌑" : "›"}</span>
          </div>
        ))}
      </div>
      {draftError && (
        <p className="form-error" role="alert">
          {draftError}
        </p>
      )}
      <Preferences />
      <div className="account-panel people-preview">
        <h2>Others you shop for</h2>
        {people.map((p) => (
          <Link className="person-chip" href="/account/people" key={p.id}>
            <span className="profile-avatar">{p.name[0]}</span>
            {p.name}
          </Link>
        ))}
        <Link className="add-person-tile" href="/account/people">
          <span>+</span>
          {people.length ? "Add someone new" : "Add someone"}
        </Link>
      </div>
      <Sheet
        open={field === "phone"}
        title={phoneStage === "code" ? "Confirm it’s you" : "Add phone number"}
        onClose={() => setField(null)}
      >
        <PhoneEditor
          controlledStage={phoneStage}
          onStageChange={setPhoneStage}
          onDone={(phone) => {
            updateProfile({ phone });
            setField(null);
          }}
        />
      </Sheet>
      <Sheet
        open={photo}
        title="Profile picture"
        onClose={() => setPhoto(false)}
      >
        <label className="form-field">
          Choose photo
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 3_000_000) {
                setPhotoError("Choose an image smaller than 3 MB.");
                return;
              }
              const reader = new FileReader();
              reader.onload = () => {
                updateProfile({ avatar: String(reader.result) });
                setPhoto(false);
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
        {photoError && <p role="alert">{photoError}</p>}
        <p className="form-note">
          The image stays in this page session and is not uploaded.
        </p>
      </Sheet>
    </AccountPage>
  );
}
export function PublicProfile({ catalog }: { catalog: Catalog }) {
  const { profile } = useAccount();
  const { collections, createCollection, updateCollection } = useDiscovery();
  const publicCollections = collections.filter(
    (c) => c.visibility === "Public",
  );
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  return (
    <AccountPage>
      <div className="public-profile">
        <span className="profile-avatar large">{profile.firstName[0]}</span>
        {!!publicCollections.length && (
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>
        )}
        <Link className="pill" href="/account">
          Edit profile
        </Link>
        {!publicCollections.length && (
          <div className="public-hidden">
            <span aria-hidden="true">◉</span>
            <p>
              Your profile is hidden until you create your first public
              collection.
            </p>
            <button className="primary" onClick={() => setCreating(true)}>
              Create public collection
            </button>
            <Link href="/support/help">Learn more</Link>
          </div>
        )}
      </div>
      <div className="public-collections">
        {publicCollections.map((c) => (
          <Link
            className="account-panel"
            href={`/saved?collection=${c.id}`}
            key={c.id}
          >
            <div className="collection-cover">
              {c.productIds.slice(0, 4).map((id) => {
                const product = catalog.products.find((p) => p.id === id);
                return product ? (
                  <img key={id} src={product.images[0]} alt="" />
                ) : null;
              })}
            </div>
            <strong>{c.name}</strong>
            <small>{c.productIds.length} items</small>
          </Link>
        ))}
      </div>
      <Sheet
        open={creating}
        title="Create collection"
        onClose={() => setCreating(false)}
      >
        <form
          className="account-form"
          onSubmit={(e) => {
            e.preventDefault();
            const id = createCollection(name);
            updateCollection(id, { visibility: "Public" });
            setCreating(false);
          }}
        >
          <label className="form-field">
            Collection name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p>Public · Anyone can view this collection</p>
          <button className="primary form-submit">Create collection</button>
        </form>
      </Sheet>
    </AccountPage>
  );
}
export function PeoplePage() {
  const { people, savePerson, deletePerson } = useAccount();
  const route = useAccountStage();
  const [person, setPerson] = useState<Person | null>(
    () => people.find((p) => p.id === route.id) ?? null,
  );
  const stage = ["profile", "nickname", "birthday"].includes(route.view ?? "")
    ? route.view
    : "list";
  const setStage = (next: "list" | "nickname" | "birthday" | "profile") => {
    if (next === "list") route.back();
    else {
      consumeSheetHistory();
      route.go(next, person?.id);
    }
  };
  const [birthdayError, setBirthdayError] = useState("");
  const relations = [
    "Partner",
    "Child",
    "Friend",
    "Parent",
    "Sibling",
    "Other",
  ];
  const save = (skipBirthday = false) => {
    if (person) {
      const next = { ...person, birthday: skipBirthday ? "" : person.birthday };
      if (!validBirthday(next.birthday)) {
        setBirthdayError("Enter a valid birthday that is not in the future.");
        return;
      }
      setBirthdayError("");
      setPerson(next);
      savePerson(next);
      setStage("profile");
    }
  };
  return (
    <AccountPage
      onBack={stage !== "list" ? () => setStage("list") : undefined}
      title={stage === "profile" ? undefined : "Others you shop for"}
    >
      {stage === "profile" && person ? (
        <>
          <div className="person-profile">
            <span className="profile-avatar large">{person.name[0]}</span>
            <input
              aria-label="Nickname"
              value={person.name}
              onChange={(e) => {
                const next = { ...person, name: e.target.value };
                setPerson(next);
                savePerson(next);
              }}
            />
          </div>
          <div className="account-panel field-panel">
            {(["relation", "gender", "birthday"] as const).map((key) => (
              <label className="profile-field" key={key}>
                <span>
                  {key === "relation"
                    ? "Relation"
                    : key === "gender"
                      ? "Gender"
                      : "Birthday"}
                </span>
                {key === "birthday" ? (
                  <DateFields
                    value={person.birthday}
                    onChange={(birthday) => {
                      const next = { ...person, birthday };
                      setPerson(next);
                      if (validBirthday(birthday)) {
                        savePerson(next);
                        setBirthdayError("");
                      } else
                        setBirthdayError(
                          "Enter a valid birthday that is not in the future.",
                        );
                    }}
                  />
                ) : (
                  <select
                    value={person[key]}
                    onChange={(e) => {
                      const next = { ...person, [key]: e.target.value };
                      setPerson(next);
                      savePerson(next);
                    }}
                  >
                    {(key === "relation"
                      ? relations
                      : ["Select gender", "Female", "Male", "Other"]
                    ).map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                )}
              </label>
            ))}
          </div>

          {birthdayError && (
            <p className="form-error" role="alert">
              {birthdayError}
            </p>
          )}
          <Preferences personId={person.id} />
          <button
            className="danger-text form-submit"
            onClick={() => {
              deletePerson(person.id);
              setStage("list");
            }}
          >
            Delete {person.name}
          </button>
        </>
      ) : (
        <>
          <div className="account-panel">
            {people.map((p) => (
              <button
                className="account-row"
                key={p.id}
                onClick={() => {
                  setPerson(p);
                  route.go("profile", p.id);
                }}
              >
                <span className="profile-avatar">{p.name[0]}</span>
                <strong>{p.name}</strong>
                <span>›</span>
              </button>
            ))}
            <button
              className="account-row"
              onClick={() => {
                setPerson({
                  id: crypto.randomUUID(),
                  name: "",
                  relation: "Friend",
                  birthday: "",
                  gender: "",
                });
                setStage("nickname");
              }}
            >
              + Add someone new
            </button>
          </div>
        </>
      )}
      <Sheet
        open={stage === "nickname" || stage === "birthday"}
        manageHistory={false}
        title={
          stage === "birthday"
            ? `Add ${person?.name ?? ""}’s birthday`
            : "Add a nickname"
        }
        onClose={() => setStage("list")}
      >
        {person && (
          <form
            className="account-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (stage === "nickname") setStage("birthday");
              else save();
            }}
          >
            {stage === "nickname" ? (
              <>
                <input
                  className="nickname-input"
                  aria-label="Nickname"
                  placeholder="Add a nickname"
                  required
                  value={person.name}
                  onChange={(e) =>
                    setPerson({ ...person, name: e.target.value })
                  }
                />
                <div className="relationship-chips">
                  {relations.map((r) => (
                    <button
                      type="button"
                      className={person.relation === r ? "selected" : ""}
                      aria-pressed={person.relation === r}
                      key={r}
                      onClick={() => setPerson({ ...person, relation: r })}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <p className="form-note">
                  Shop will remember sizing and other preferences when you
                  mention their name.
                </p>
              </>
            ) : (
              <label className="form-field">
                Birthday
                <DateFields
                  value={person.birthday}
                  onChange={(birthday) => setPerson({ ...person, birthday })}
                />
              </label>
            )}
            {birthdayError && (
              <p role="alert" className="form-error">
                {birthdayError}
              </p>
            )}
            <div className="editor-actions">
              <button
                type="button"
                className="form-cancel"
                onClick={() =>
                  stage === "birthday" ? save(true) : setStage("list")
                }
              >
                {stage === "birthday" ? "Skip" : "Cancel"}
              </button>
              <button
                className="primary form-submit"
                disabled={!person.name.trim()}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Sheet>
    </AccountPage>
  );
}
export function AddressesPage() {
  const { addresses, saveAddress, deleteAddress } = useAccount();
  const route = useAccountStage();
  const [addressDraft, setAddressDraft] = useState<Address>(
    () => addresses.find((a) => a.id === route.id) ?? blankAddress(),
  );
  const editing = route.view === "edit" ? addressDraft : null;
  const setEditing = (next: Address | null) => {
    if (next) {
      setAddressDraft(next);
      route.go("edit", next.id);
    } else route.back();
  };
  const [deleting, setDeleting] = useState(false);
  return (
    <AccountPage
      title={editing ? "Shipping address" : "Manage addresses"}
      onBack={editing ? () => setEditing(null) : undefined}
    >
      {editing ? (
        <AddressEditor
          key={editing.id}
          initialValue={editing}
          onChange={setAddressDraft}
          onSave={(v) => {
            saveAddress(v);
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
          onDelete={
            addresses.some((a) => a.id === editing.id)
              ? () => setDeleting(true)
              : undefined
          }
        />
      ) : (
        <>
          <div className="address-list">
            {addresses.map((a) => (
              <button key={a.id} onClick={() => setEditing(a)}>
                <span>
                  <strong>
                    {a.firstName} {a.lastName}
                  </strong>
                  <span>{a.street}</span>
                  <span>
                    {a.city}, {a.region}, {a.country}
                  </span>
                </span>
                {a.isDefault && <small>Default</small>}
                <b>›</b>
              </button>
            ))}
          </div>
          <p className="address-help">
            Your default address determines the currency and products you see in
            the app
          </p>
          <div className="account-bottom-action">
            <button
              className="primary"
              onClick={() => setEditing(blankAddress())}
            >
              Add address
            </button>
          </div>
        </>
      )}
      <Sheet
        open={deleting}
        title="Delete address?"
        onClose={() => setDeleting(false)}
      >
        <p className="form-note">
          Are you sure you want to delete this address?
        </p>
        <button
          className="danger-button form-submit"
          onClick={() => {
            if (editing) deleteAddress(editing.id);
            setEditing(null);
            setDeleting(false);
          }}
        >
          Delete address
        </button>
        <button className="form-cancel" onClick={() => setDeleting(false)}>
          Cancel
        </button>
      </Sheet>
    </AccountPage>
  );
}
export function PaymentsPage() {
  const route = useAccountStage();
  const { paymentAvailable, removePayment, addresses, paymentCards } =
    useAccount();
  const [cardId, setCardId] = useState("card-reference-1");
  const card = paymentCards.find((c) => c.id === (route.id ?? cardId));
  const billing = addresses.find((a) => a.isDefault) ?? addresses[0];
  const view =
    route.view === "detail" || route.view === "add" ? route.view : "list";
  const setView = (next: "list" | "detail" | "add") =>
    next === "list" ? route.back() : route.go(next, cardId);
  const [remove, setRemove] = useState(false);
  const [receipts, setReceipts] = useState<Record<string, boolean>>({});
  return (
    <AccountPage
      className={view === "list" ? "payment-overview" : "payment-detail-page"}
      onBack={view !== "list" ? route.back : undefined}
      title={
        view === "add"
          ? "Add card"
          : view === "detail"
            ? `Visa •••• ${card?.last4 ?? ""}`
            : "Payment methods"
      }
    >
      {view === "list" && (
        <button className="payment-add-action" onClick={() => setView("add")}>
          Add card
        </button>
      )}
      {view === "add" ? (
        <>
          <PaymentEditor />
          <button className="form-cancel" onClick={() => setView("list")}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {paymentAvailable && view === "list" && (
            <div
              className={`payment-card-stack ${paymentCards.length > 1 ? "multiple" : ""}`}
            >
              {paymentCards.map((c) => (
                <button
                  className="payment-card-button"
                  key={c.id}
                  onClick={() => {
                    setCardId(c.id);
                    route.go("detail", c.id);
                  }}
                >
                  <PaymentCard last4={c.last4} />
                </button>
              ))}
            </div>
          )}
          {view === "detail" && card ? (
            <>
              <PaymentCard last4={card?.last4} />
              <h2>Card details</h2>
              <div className="account-row">
                <span>Expiration date</span>
                <strong>{card?.expiry}</strong>
              </div>
              <div className="billing-details">
                <h3>Billing address</h3>
                {billing ? (
                  <p>
                    {billing.firstName} {billing.lastName}
                    <br />
                    {billing.street}
                    <br />
                    {billing.city}, {billing.region} {billing.postalCode}
                    <br />
                    {billing.country}
                  </p>
                ) : (
                  <Link href="/account/addresses">Add billing address</Link>
                )}
              </div>
              <label className="account-row">
                <span>
                  In-store receipts
                  <small>Get receipts for purchases made with this card.</small>
                </span>
                <input
                  type="checkbox"
                  checked={receipts[card?.id ?? ""] ?? true}
                  onChange={(e) =>
                    setReceipts({
                      ...receipts,
                      [card?.id ?? ""]: e.target.checked,
                    })
                  }
                />
              </label>
              <button
                className="danger-text form-cancel"
                onClick={() => setRemove(true)}
              >
                Delete card
              </button>
            </>
          ) : null}
        </>
      )}
      <Sheet
        open={remove}
        title="Are you sure you want to delete this card?"
        className="delete-card-confirm"
        onClose={() => setRemove(false)}
      >
        <p>This card will be removed from your Shop account.</p>
        <div className="editor-actions">
          <button className="form-cancel" onClick={() => setRemove(false)}>
            Cancel
          </button>
          <button
            className="danger-button form-submit"
            onClick={() => {
              if (!card) return;
              removePayment(card.id);
              consumeSheetHistory();
              setRemove(false);
              route.overview();
            }}
          >
            Delete
          </button>
        </div>
      </Sheet>
    </AccountPage>
  );
}
export function SecurityPage() {
  const { profile } = useAccount();
  const [open, setOpen] = useState(false);
  const route = useAccountStage();
  const account = route.view === "login";
  const setAccount = (next: boolean) =>
    next ? route.go("login") : route.back();
  const [signout, setSignout] = useState(false);
  return (
    <AccountPage
      title={account ? "Account & login" : "Sign in & security"}
      onBack={account ? () => setAccount(false) : undefined}
    >
      {account ? (
        <div className="account-panel">
          <div className="security-email">
            <small>Email</small>
            <strong>{profile.email}</strong>
          </div>
          <Row
            label="Phone"
            value={profile.phone || "Add phone"}
            href="/account"
          />
          <Row
            label="Name"
            value={`${profile.firstName} ${profile.lastName}`}
            href="/account"
          />
        </div>
      ) : (
        <>
          <div className="account-panel">
            <h3>How you sign in</h3>
            <button className="account-row" onClick={() => setAccount(true)}>
              <span>Text me a code</span>
              <small>{profile.phone || "Add phone"}</small>
            </button>
            <button className="account-row" onClick={() => setAccount(true)}>
              <span>Email me a code</span>
              <small>{profile.email}</small>
            </button>
          </div>
          <div className="account-panel passkey-panel">
            <h3>Sign in faster with a passkey</h3>
            <p>Fast and secure sign-in on millions of stores</p>
            <p>Syncs seamlessly on compatible devices</p>
            <button className="form-cancel" onClick={() => setOpen(true)}>
              Add passkey
            </button>
          </div>
          <button
            className="danger-text form-submit"
            onClick={() => setSignout(true)}
          >
            Sign out of all devices
          </button>
        </>
      )}
      <Boundary open={open} onClose={() => setOpen(false)} kind="Passkey" />
      <Boundary
        open={signout}
        onClose={() => setSignout(false)}
        kind="Sign out of all devices"
      />
    </AccountPage>
  );
}
const notificationOptions = [
  [
    "Order tracking",
    "Stay updated on your order’s journey from shipment to delivery, including delays and exceptions",
  ],
  [
    "Account connections",
    "Notifications to ensure your accounts stay connected",
  ],
  ["Shop Pay", "Get notified about new orders and refunds"],
  [
    "Installments",
    "Notifications for upcoming payments, successful transactions, and payment issues",
  ],
  ["Price drop", "Know when your saved items drop in price"],
  ["Back in stock", "Know when your saved items are back in stock"],
  [
    "Collection activity",
    "Get notified when updates are made to a collection you own or collaborate on",
  ],
];
export function NotificationSettings() {
  const { notifications, toggleNotification } = useAccount();
  return (
    <AccountPage title="Notifications">
      {notificationOptions.map(([title, copy]) => (
        <label className="notification-setting" key={title}>
          <span>
            {title}
            <small>{copy}</small>
          </span>
          <input
            role="switch"
            type="checkbox"
            checked={notifications[title] ?? true}
            onChange={() => toggleNotification(title)}
          />
        </label>
      ))}
    </AccountPage>
  );
}
export function ConnectionsPage() {
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState("");
  return (
    <AccountPage title="Connections">
      <div className="account-panel">
        <h2>Accounts</h2>
        <button className="account-row" onClick={() => setOpen(true)}>
          + Connect an account <span>G</span>
        </button>
      </div>
      <div className="account-panel">
        <h2>Minis</h2>
        <Row label="Sol: Browse by Voice" href="/minis/sol" />
        <Row label="Gift Sense" href="/minis/gift-sense" />
      </div>
      <Sheet
        open={open}
        title="Connect an account"
        onClose={() => setOpen(false)}
      >
        <div className="choice-list">
          {["Google", "Outlook", "Amazon"].map((p) => (
            <button
              key={p}
              onClick={() => {
                setOpen(false);
                setProvider(p);
              }}
            >
              {p} <span>›</span>
            </button>
          ))}
        </div>
        <p className="form-note">
          Connect your shopping email to find deliveries.
        </p>
      </Sheet>
      <Boundary
        open={!!provider}
        onClose={() => setProvider("")}
        kind={`${provider} connection`}
      />
    </AccountPage>
  );
}
export function DeleteAccount() {
  const { profile } = useAccount();
  const [open, setOpen] = useState(false);
  return (
    <AccountPage>
      <h2 className="centered">Delete your Shop account</h2>
      <div className="delete-identity">
        <span className="profile-avatar">{profile.firstName[0]}</span>
        {profile.email}
      </div>
      <div className="delete-copy">
        <p>
          Once deleted, Shop won’t remember the info you might have shared
          including your:
        </p>
        <ul>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Order and delivery history</li>
          <li>Shop Pay information including billing and shipping addresses</li>
        </ul>
        <p>This action can’t be undone.</p>
      </div>
      <button
        className="danger-button form-submit"
        onClick={() => setOpen(true)}
      >
        Delete account
      </button>
      <Link className="form-cancel" href="/profile">
        Cancel
      </Link>
      <Boundary
        open={open}
        onClose={() => setOpen(false)}
        kind="Account deletion"
      />
    </AccountPage>
  );
}

function PaymentCard({ last4 = "4242" }: { last4?: string }) {
  return (
    <div className="source-payment-card">
      <div>
        <b>VISA</b>
        <span>•••• {last4}</span>
      </div>
      <strong>VISA</strong>
    </div>
  );
}

function useAccountStage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const entered = useRef(false);
  const go = (view: string, id?: string) => {
    const query = new URLSearchParams(params.toString());
    query.set("view", view);
    if (id) query.set("id", id);
    entered.current = true;
    router.push(`${pathname}?${query}`, { scroll: false });
  };
  const back = () => {
    if (entered.current) {
      entered.current = false;
      router.back();
    } else router.replace(pathname, { scroll: false });
  };
  return {
    view: params.get("view"),
    id: params.get("id"),
    go,
    back,
    overview: () => router.replace(pathname, { scroll: false }),
  };
}
