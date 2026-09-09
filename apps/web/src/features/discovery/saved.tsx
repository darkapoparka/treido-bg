"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Catalog, Product } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  Sheet,
  consumeSheetHistory,
} from "./components";
import { Icon } from "./icons";
import { CartOverlay } from "../commerce/checkout";
import { useDiscovery } from "./state";
import { useAccount } from "../account/state";
function SavedCard({
  product,
  seller,
  selected,
  onSelect,
}: {
  product: Product;
  seller?: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const state = useDiscovery();
  return (
    <article className="saved-product">
      <div className="product-media">
        <Link href={`/products/${product.id}`}>
          <img src={product.images[0]} alt={product.title} />
        </Link>
        <IconButton
          className={`save-button ${(onSelect ? selected : state.saved.includes(product.id)) ? "saved-active" : ""}`}
          icon={onSelect ? (selected ? "check" : "plus") : "heart"}
          label={
            onSelect
              ? `${selected ? "Remove" : "Add"} ${product.title}`
              : `Save ${product.title}`
          }
          pressed={onSelect ? selected : state.saved.includes(product.id)}
          onClick={onSelect ?? (() => state.toggleSaved(product.id))}
        />
      </div>
      {seller && <span>{seller}</span>}
      <Link href={`/products/${product.id}`}>
        <strong>{product.title}</strong>
      </Link>
      <b>{formatMoney(product.price)}</b>
    </article>
  );
}
export function Saved({ catalog }: { catalog: Catalog }) {
  const state = useDiscovery();
  const account = useAccount();
  const [cartOpen, setCartOpen] = useState(false);
  const params = useSearchParams(),
    router = useRouter();
  const selected = params.get("collection");
  const [modal, setModal] = useState("");
  const panel =
    params.get("view") === "add"
      ? "Add from saved"
      : params.get("view") === "ideas"
        ? "More ideas"
        : modal;
  function navigate(id: string | null, view = "") {
    const next = new URLSearchParams();
    if (id) next.set("collection", id);
    if (view) next.set("view", view);
    (consumeSheetHistory() ? router.replace : router.push)(
      `/saved${next.size ? `?${next}` : ""}`,
      { scroll: false },
    );
  }
  const setSelected = (id: string | null) => navigate(id);
  function setPanel(value: string) {
    if (value === "Add from saved" || value === "More ideas") {
      setModal("");
      navigate(selected, value === "More ideas" ? "ideas" : "add");
    } else {
      setModal(value);
      if (params.has("view"))
        router.replace(`/saved?collection=${selected}`, { scroll: false });
    }
  }

  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState<"Private" | "Public">("Private");
  const [notice, setNotice] = useState("");
  const collection = state.collections.find((c) => c.id === selected);
  const products = (collection ? collection.productIds : state.saved).flatMap(
    (id) => {
      const product = catalog.products.find((p) => p.id === id);
      return product ? [product] : [];
    },
  );
  const addMode = panel === "Add from saved" || panel === "More ideas";
  const [inviteDismissed, setInviteDismissed] = useState(false);
  const choose = (id: string) => {
    if (!collection) return;
    state.updateCollection(collection.id, {
      productIds: collection.productIds.includes(id)
        ? collection.productIds.filter((x) => x !== id)
        : [...collection.productIds, id],
    });
  };
  return (
    <main
      className={`shop-page saved-page ${addMode ? "saved-selection" : ""}`}
    >
      <header className="section-heading">
        <h1>
          {addMode ? panel : collection ? collection.name : "Saved"}
          {!addMode && collection?.visibility === "Private" && (
            <small>
              <Icon name="lock" />
            </small>
          )}
        </h1>
        {!collection && state.collections.length > 0 && (
          <IconButton
            icon="plus"
            label="Create collection"
            onClick={() => {
              setName("");
              setPanel("Create collection");
            }}
          />
        )}
        {collection && !addMode && (
          <IconButton
            icon="more"
            label="Collection options"
            onClick={() => setPanel("Collection options")}
          />
        )}
      </header>
      {selected && !collection ? (
        <p className="empty-state">
          This local collection is unavailable.{" "}
          <Link href="/saved">Return to Saved</Link>
        </p>
      ) : !collection &&
        (products.length > 0 || state.collections.length > 0) ? (
        <>
          <h2>Collections {state.collections.length > 0 && "›"}</h2>
          <div
            className={`collection-rail ${state.collections.length ? "has-collections" : ""}`}
          >
            {state.collections.map((c) => (
              <button
                className="collection-tile"
                key={c.id}
                onClick={() => setSelected(c.id)}
              >
                <div>
                  {catalog.products
                    .filter((p) => c.productIds.includes(p.id))
                    .slice(0, 4)
                    .map((p) => (
                      <img key={p.id} src={p.images[0]} alt="" />
                    ))}
                </div>
                <span className="collection-tile-copy">
                  <small>
                    <Icon name="lock" />
                    {c.visibility}
                  </small>
                  <b>{c.name}</b>
                </span>
              </button>
            ))}
            <button
              className="create-collection-tile"
              onClick={() => {
                setName("");
                setPanel("Create collection");
              }}
            >
              <span>
                <Icon name="plus" />
                Create collection
              </span>
              <div>
                {products.slice(0, 2).map((p) => (
                  <img key={p.id} src={p.images[0]} alt="" />
                ))}
              </div>
            </button>
          </div>
        </>
      ) : collection && !addMode ? (
        !inviteDismissed ? (
          <section className="collection-invite-callout">
            <IconButton
              icon="close"
              label="Dismiss collaboration suggestion"
              onClick={() => setInviteDismissed(true)}
            />
            <strong>Collaborate with people you know</strong>
            <p>Shop together, plan events, and share gift ideas.</p>
            <button
              className="primary"
              onClick={() => setPanel("Invite collaborators")}
            >
              Invite collaborators
            </button>
          </section>
        ) : (
          <button
            className="invite-collaborators"
            onClick={() => setPanel("Invite collaborators")}
          >
            <span className="review-avatar">
              {account.profile.firstName[0]}
            </span>
            <Icon name="plus" />
            Invite collaborators
          </button>
        )
      ) : null}
      <div className="product-grid saved-grid">
        {(addMode
          ? catalog.products.filter((p) =>
              panel === "More ideas"
                ? [
                    "idea-rice-wash",
                    "idea-rosemary-bar",
                    "idea-rosemary-bundle",
                    "idea-purple-bundle",
                    "idea-rosemary-liquid",
                  ].includes(p.id)
                : state.saved.includes(p.id),
            )
          : products
        ).map((p) => (
          <SavedCard
            key={p.id}
            product={p}
            seller={
              catalog.stores.find((store) => store.id === p.storeId)?.name
            }
            selected={collection?.productIds.includes(p.id)}
            onSelect={addMode ? () => choose(p.id) : undefined}
          />
        ))}
        {panel === "More ideas" && (
          <div className="saved-partial-product">
            <img
              src="/api/reference-media/idea-jojoba"
              alt="Jojoba Bead Exfoliating Body Wash Bar"
            />
            <p>KITSCH</p>
            <strong>Jojoba Bead Exfoliating Body…</strong>
          </div>
        )}
      </div>
      {collection && !addMode && (
        <>
          <h2 className="featured-heading">Featured brands</h2>
          <Link className="featured-brand" href="/stores/kitsch">
            <img src="/api/reference-media/kitsch-logo" alt="KITSCH" />
          </Link>
          <button className="find-ideas" onClick={() => setPanel("More ideas")}>
            <span>
              <Icon name="plus" /> Find more ideas
            </span>
            <div>
              {[
                "idea-rice-wash",
                "idea-rosemary-bar",
                "idea-rosemary-bundle",
                "idea-purple-bundle",
                "idea-rosemary-liquid",
                "idea-jojoba",
              ].map((key) => (
                <img key={key} src={`/api/reference-media/${key}`} alt="" />
              ))}
            </div>
          </button>
        </>
      )}
      {!products.length && !collection && (
        <div className="saved-empty-source">
          <div className="saved-sock-card">
            <img src="/api/reference-media/saved-socks" alt="Socks" />
            <Icon name="heart" filled />
          </div>
          <h2>You haven’t saved any items yet</h2>
          <p>
            Tap the heart icon on any item to save it and get notified if it
            drops in price.
          </p>
          <Link className="primary" href="/">
            Go shopping
          </Link>
        </div>
      )}
      {addMode && (
        <button className="sticky-done" onClick={() => setPanel("")}>
          Done
        </button>
      )}
      <CartOverlay
        catalog={catalog}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      <FloatingNav
        back
        cart={() => setCartOpen(true)}
        onBack={
          collection
            ? () => {
                if (addMode) setPanel("");
                else setSelected(null);
              }
            : undefined
        }
      />
      <Sheet
        open={!!panel && !addMode}
        headerless={["Create collection", "Edit name"].includes(panel)}
        initialFocus={
          panel === "Create collection" ? ".collection-name-input" : undefined
        }
        title={
          panel === "Make public"
            ? "Anyone on Shop will be able to view this collection"
            : panel
        }
        onClose={() => setPanel("")}
      >
        {["Create collection", "Edit name"].includes(panel) ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              if (collection)
                state.updateCollection(collection.id, { name: name.trim() });
              else {
                const id = state.createCollection(name.trim());
                state.updateCollection(id, { visibility });
                setModal("");
                navigate(id, "add");
                return;
              }
              setPanel("");
            }}
          >
            <div className="editor-toolbar">
              <button type="button" onClick={() => setPanel("")}>
                Cancel
              </button>
              <button disabled={!name.trim()} type="submit">
                Save
              </button>
            </div>
            {panel === "Edit name" && (
              <div className="collection-edit-thumbnails">
                {products.map((p) => (
                  <img key={p.id} src={p.images[0]} alt="" />
                ))}
              </div>
            )}
            {panel === "Edit name" && (
              <p className="collection-input-label">Collection name</p>
            )}
            <input
              className="collection-name-input"
              aria-label="Collection name"
              placeholder="Collection name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {panel === "Create collection" && (
              <div className="collection-privacy-row">
                <div className="visibility-options">
                  {(["Private", "Public"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-label={v}
                      aria-pressed={visibility === v}
                      onClick={() => setVisibility(v)}
                    >
                      <Icon name={v === "Private" ? "lock" : "globe"} />
                    </button>
                  ))}
                </div>
                <div>
                  <strong>{visibility}</strong>
                  <p>
                    {visibility === "Private"
                      ? "Visible only to you and collaborators"
                      : "Anyone with a link can view"}
                  </p>
                </div>
              </div>
            )}
          </form>
        ) : panel === "Collection options" && collection ? (
          <div className="filter-options">
            <button
              onClick={() => {
                setName(collection.name);
                setPanel("Edit name");
              }}
            >
              Edit name
              <Icon name="edit" />
            </button>
            <button onClick={() => setPanel("Add from saved")}>
              Add from saved
              <Icon name="plus" />
            </button>
            <button
              onClick={() => {
                if (collection.visibility === "Private") {
                  setPanel("Make public");
                  return;
                }
                state.updateCollection(collection.id, {
                  visibility: "Private",
                });
                setNotice("Collection is now private");
                setPanel("");
              }}
            >
              Make collection{" "}
              {collection.visibility === "Private" ? "public" : "private"}
              <Icon name="share" />
            </button>
            <button
              className="danger-text"
              onClick={() => setPanel("Delete collection")}
            >
              Delete collection
              <Icon name="close" />
            </button>
          </div>
        ) : panel === "Make public" && collection ? (
          <>
            <p className="sheet-copy">
              Your collection will be discoverable by others and may appear on
              the feed.
            </p>
            <div className="sheet-actions">
              <button className="pill" onClick={() => setPanel("")}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={() => {
                  state.updateCollection(collection.id, {
                    visibility: "Public",
                  });
                  setPanel("");
                }}
              >
                Make public
              </button>
            </div>
          </>
        ) : panel === "Delete collection" && collection ? (
          <>
            <p>
              Delete “{collection.name}”? Your saved products will stay in
              Saved.
            </p>
            <div className="sheet-actions">
              <button className="pill" onClick={() => setPanel("")}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={() => {
                  state.deleteCollection(collection.id);
                  setSelected(null);
                  setPanel("");
                }}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="sheet-copy">Collaborate with people you know</p>
            <p>Shop together, plan events, and share gift ideas.</p>
            <button
              className="primary form-submit"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `Local reference collection: ${collection?.name ?? "Collection"}`,
                  );
                  setNotice(
                    "Collection name copied. Sharing is not connected.",
                  );
                } catch {
                  setNotice("Clipboard unavailable. Sharing is not connected.");
                }
                setPanel("");
              }}
            >
              Copy collection name
            </button>
          </>
        )}
      </Sheet>
      {notice && (
        <button
          className="local-toast"
          onClick={() => setNotice("")}
          role="status"
        >
          {notice}
        </button>
      )}
    </main>
  );
}
export function Following({ catalog }: { catalog: Catalog }) {
  const state = useDiscovery(),
    params = useSearchParams(),
    router = useRouter();
  const manage = params.get("manage") === "1";
  const [listIds] = useState(() => state.followed);
  const ids = manage
    ? Array.from(new Set([...listIds, ...state.followed]))
    : state.followed;
  const stores = ids.flatMap((id) => {
    const s = catalog.stores.find((s) => s.id === id);
    return s ? [s] : [];
  });
  const pura = [
    ["pura-amber", "Moroccan Amber", "$20.99"],
    ["pura-mandarin", "Mandarin Coriander", "$21.00"],
    ["pura-cashmere", "White Cashmere & Musk", "$18.99"],
    ["pura-charcoal", "Charcoal", "$18.99"],
  ];
  return (
    <main className="shop-page saved-page">
      <header className="section-heading">
        <h1>{manage ? "Following list" : "Following"}</h1>
        {!manage && stores.length > 0 && (
          <button
            className="pill"
            onClick={() =>
              router.push("/following?manage=1", { scroll: false })
            }
          >
            Manage
          </button>
        )}
      </header>
      {manage ? (
        <div>
          {stores.map((s) => (
            <div className="following-row" key={s.id}>
              <Link href={`/stores/${s.id}`}>
                {s.logo ? (
                  <img src={s.logo} alt="" />
                ) : (
                  <span className="store-logo-fallback" aria-hidden="true">
                    {s.name[0]}
                  </span>
                )}
                {s.name}
              </Link>
              <button
                className="pill"
                aria-pressed={state.followed.includes(s.id)}
                onClick={() => state.toggleFollow(s.id)}
              >
                {state.followed.includes(s.id) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          {!stores.length ? (
            <>
              <section className="following-empty">
                <h2>
                  You’re not following
                  <br />
                  any brands yet
                </h2>
                <p>
                  Here are new products from brands
                  <br />
                  you might like
                </p>
                <Link className="primary" href="/explore">
                  Go shopping
                </Link>
              </section>
              <section className="following-feed">
                <div className="store-row">
                  <img src="/api/reference-media/qbp-logo" alt="" />
                  <span>
                    <strong>Quilting Books Patterns and Notions</strong>
                    <p className="following-feed-meta">
                      1 item added 10 hours ago
                    </p>
                  </span>
                </div>
                <img
                  src="/api/reference-media/following-quilt"
                  alt="Purple and green quilt"
                />
              </section>
            </>
          ) : (
            <>
              <div className="following-avatars">
                {stores.map((s) => (
                  <Link href={`/stores/${s.id}`} key={s.id} aria-label={s.name}>
                    {s.logo ? (
                      <img src={s.logo} alt={s.name} />
                    ) : (
                      <span className="store-logo-fallback" aria-hidden="true">
                        {s.name[0]}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              {[...stores]
                .sort(
                  (a, b) => Number(b.id === "pura") - Number(a.id === "pura"),
                )
                .map((s) => (
                  <section className="following-feed" key={s.id}>
                    <div className="store-row">
                      {s.logo ? (
                        <img src={s.logo} alt="" />
                      ) : (
                        <span
                          className="store-logo-fallback"
                          aria-hidden="true"
                        >
                          {s.name[0]}
                        </span>
                      )}
                      <span>
                        <strong>{s.name}</strong>
                        <p className="following-feed-meta">
                          {s.id === "pura"
                            ? "7 items added 4 hours ago"
                            : "1 item added 2 days ago"}
                        </p>
                      </span>
                    </div>
                    {s.id === "pura" ? (
                      <div className="following-shop-products">
                        {pura.map(([id, title, price]) => (
                          <article key={id}>
                            <Link href="/stores/pura">
                              <img
                                src={`/api/reference-media/${id}`}
                                alt={title}
                              />
                              <strong>{title}</strong>
                            </Link>
                            <p>{price}</p>
                          </article>
                        ))}
                      </div>
                    ) : s.id === "kitsch" ? (
                      <>
                        <img
                          src="/api/reference-media/following-bow"
                          alt="Black Bow Hair Clip"
                        />
                        <p>
                          Black Bow Hair Clip
                          <br />
                          $10.00
                        </p>
                      </>
                    ) : (
                      <div className="product-grid">
                        {catalog.products
                          .filter((p) => p.storeId === s.id)
                          .map((p) => (
                            <SavedCard key={p.id} product={p} />
                          ))}
                      </div>
                    )}
                  </section>
                ))}
            </>
          )}
        </>
      )}
      <FloatingNav back onBack={manage ? () => router.back() : undefined} />
    </main>
  );
}
