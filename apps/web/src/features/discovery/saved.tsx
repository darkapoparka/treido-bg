"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./saved.css";
import { KitschWordmark } from "./kitsch-wordmark";
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
    <article
      className={`saved-product ${onSelect ? "saved-choosing" : ""}`}
      data-original-photo={product.id.startsWith("idea-") ? "true" : undefined}
    >
      <div className="product-media">
        {onSelect ? (
          <button
            type="button"
            aria-label={`Select ${product.title}`}
            aria-pressed={selected}
            onClick={onSelect}
          >
            <img src={product.images[0]} alt="" />
          </button>
        ) : (
          <Link href={`/products/${product.id}`}>
            <img src={product.images[0]} alt={product.title} />
          </Link>
        )}
        <IconButton
          className={`save-button ${(onSelect ? selected : state.saved.includes(product.id)) ? "saved-active" : ""}`}
          icon={onSelect ? (selected ? "check" : "plus") : "heart"}
          label={
            onSelect
              ? `${selected ? "Remove" : "Add"} ${product.title}`
              : `${state.saved.includes(product.id) ? "Unsave" : "Save"} ${product.title}`
          }
          pressed={onSelect ? selected : state.saved.includes(product.id)}
          filled={onSelect ? false : undefined}
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
  const state = useDiscovery(),
    account = useAccount(),
    params = useSearchParams(),
    router = useRouter();
  const selected = params.get("collection");
  const collection = state.collections.find((item) => item.id === selected);
  const [modal, setModal] = useState("");
  const view = params.get("view");
  const panel =
    view === "add" ? "Add from saved" : view === "ideas" ? "More ideas" : modal;
  const addMode = panel === "Add from saved" || panel === "More ideas";
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState<"Private" | "Public">("Private");
  const [notice, setNotice] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [dismissedInvites, setDismissedInvites] = useState<string[]>([]);
  const editorRef = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const selectionScroll = useRef<number | null>(null);
  const wasSelecting = useRef(false);
  const returnControl = useRef(".find-ideas");
  const productFor = (id: string) =>
    catalog.products.find((item) => item.id === id);
  const fromIds = (ids: readonly string[]) =>
    ids.flatMap((id) => {
      const item = productFor(id);
      return item ? [item] : [];
    });
  const products = fromIds(collection ? collection.productIds : state.saved);
  const ideas = fromIds([
    "idea-rice-wash",
    "idea-rosemary-bar",
    "idea-rosemary-bundle",
    "idea-purple-bundle",
    "idea-rosemary-liquid",
  ]);
  const selectionProducts =
    panel === "More ideas" ? ideas : fromIds(state.saved);
  const selectedPreview =
    collection &&
    fromIds(collection.productIds).find((item) =>
      selectionProducts.some((option) => option.id === item.id),
    );
  const featured = catalog.stores.filter((store) =>
    products.some((product) => product.storeId === store.id),
  );
  const editing = panel === "Create collection" || panel === "Edit name";
  useEffect(() => {
    const entering = addMode && !wasSelecting.current;
    const leaving = !addMode && wasSelecting.current;
    wasSelecting.current = addMode;
    if (!entering && !leaving) return;
    if (entering && selectionScroll.current === null)
      selectionScroll.current =
        window.history.state?.shopSavedSelection?.returnScroll ?? 0;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({
        top: entering ? 0 : (selectionScroll.current ?? 0),
        behavior: "instant",
      });
      if (leaving) {
        document
          .querySelector<HTMLElement>(returnControl.current)
          ?.focus({ preventScroll: true });
        selectionScroll.current = null;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [addMode]);
  // Same-page selection owns an explicit return entry. Consuming an options
  // sheet replaces that entry; Done/Back must not add a duplicate detail page.
  function navigate(id: string | null, nextView = "", created = false) {
    const next = new URLSearchParams();
    if (id) next.set("collection", id);
    if (nextView) next.set("view", nextView);
    const href = `/saved${next.size ? `?${next}` : ""}`;
    const consumed = consumeSheetHistory();
    if (nextView) {
      selectionScroll.current = created ? 0 : window.scrollY;
      returnControl.current =
        nextView === "ideas"
          ? ".find-ideas"
          : '[aria-label="Collection options"]';
      const historyState = {
        ...window.history.state,
        shopSavedSelection: {
          collection: id,
          created,
          returnScroll: selectionScroll.current,
        },
      };
      delete historyState.__NA;
      delete historyState._N;
      (consumed ? window.history.replaceState : window.history.pushState).call(
        window.history,
        historyState,
        "",
        href,
      );
    } else (consumed ? router.replace : router.push)(href, { scroll: false });
  }
  function finishSelection() {
    const entry = window.history.state?.shopSavedSelection;
    if (entry?.collection === selected && !entry.created) {
      router.back();
      return;
    }
    const next = new URLSearchParams();
    if (collection) next.set("collection", collection.id);
    const historyState = { ...window.history.state };
    delete historyState.shopSavedSelection;
    delete historyState.__NA;
    delete historyState._N;
    window.history.replaceState(
      historyState,
      "",
      `/saved${next.size ? `?${next}` : ""}`,
    );
  }
  function setPanel(value: string) {
    if (value === "Add from saved" || value === "More ideas") {
      if (!collection) return;
      setModal("");
      navigate(collection.id, value === "More ideas" ? "ideas" : "add");
    } else setModal(value);
  }
  function beginCreation() {
    setName("");
    setVisibility("Private");
    submitting.current = false;
    setPanel("Create collection");
  }
  function choose(id: string) {
    if (!collection || !productFor(id)) return;
    state.updateCollection(collection.id, {
      productIds: collection.productIds.includes(id)
        ? collection.productIds.filter((value) => value !== id)
        : [id, ...collection.productIds],
    });
  }
  useEffect(() => {
    if (editing) editorRef.current?.focus({ preventScroll: true });
  }, [editing]);
  return (
    <ShopSurface
      className={`shop-page saved-page saved-library ${collection ? "saved-collection" : ""} ${addMode ? "saved-selection" : ""}`}
    >
      <header className="section-heading saved-heading">
        <h1 className={addMode && selectedPreview ? "sr-only" : undefined}>
          {addMode ? panel : collection ? collection.name : "Saved"}
          {!addMode && collection?.visibility === "Private" && (
            <small>
              <Icon name="lock" />
            </small>
          )}
        </h1>
        {addMode ? (
          <>
            {selectedPreview && (
              <img
                className="saved-selection-preview"
                src={selectedPreview.images[0]}
                alt={`${collection?.productIds.length} selected items`}
              />
            )}
            <button className="saved-selection-done" onClick={finishSelection}>
              Done
            </button>
          </>
        ) : collection ? (
          <div className="saved-heading-actions">
            {collection.visibility === "Public" && (
              <IconButton
                icon="share"
                label="Share collection"
                onClick={() => setPanel("Share collection")}
              />
            )}
            <IconButton
              icon="more"
              label="Collection options"
              onClick={() => setPanel("Collection options")}
            />
          </div>
        ) : state.collections.length > 0 && !selected ? (
          <IconButton
            icon="plus"
            label="Create collection"
            onClick={beginCreation}
          />
        ) : null}
      </header>
      {selected && !collection ? (
        <p className="empty-state">
          This local collection is unavailable.{" "}
          <Link href="/saved">Return to Saved</Link>
        </p>
      ) : (
        <>
          {!collection &&
            !addMode &&
            (products.length > 0 || state.collections.length > 0) && (
              <>
                <h2>
                  Collections{" "}
                  {state.collections.length > 0 && (
                    <span className="saved-heading-arrow" aria-hidden="true">
                      ›
                    </span>
                  )}
                </h2>
                <div
                  className={`collection-rail ${state.collections.length ? "has-collections" : ""}`}
                >
                  {state.collections.map((item) => (
                    <button
                      className="collection-tile"
                      key={item.id}
                      onClick={() => navigate(item.id)}
                    >
                      <div>
                        {fromIds(item.productIds)
                          .slice(0, 6)
                          .map((product) => (
                            <img
                              key={product.id}
                              src={product.images[0]}
                              alt=""
                            />
                          ))}
                      </div>
                      <span className="collection-tile-copy">
                        <small>
                          <Icon
                            name={
                              item.visibility === "Private" ? "lock" : "globe"
                            }
                          />
                          {item.visibility}
                        </small>
                        <b>{item.name}</b>
                      </span>
                    </button>
                  ))}
                  <button
                    className="create-collection-tile"
                    onClick={beginCreation}
                  >
                    <span>
                      <Icon name="plus" />
                      Create collection
                    </span>
                    <div>
                      {products
                        .slice(0, state.collections.length ? 6 : 2)
                        .map((product) => (
                          <img
                            key={product.id}
                            src={product.images[0]}
                            alt=""
                          />
                        ))}
                    </div>
                  </button>
                </div>
              </>
            )}
          {collection &&
            !addMode &&
            (dismissedInvites.includes(collection.id) ? (
              <button
                className="invite-collaborators"
                onClick={() => setPanel("Invite collaborators")}
              >
                <span className="collection-person">
                  <span>{account.profile.firstName[0]}</span>
                  <Icon name="plus" />
                </span>
                Invite collaborators
              </button>
            ) : (
              <section className="collection-invite-callout">
                <IconButton
                  icon="close"
                  label="Dismiss collaboration suggestion"
                  onClick={() =>
                    setDismissedInvites((ids) => [...ids, collection.id])
                  }
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
            ))}
          <div className="product-grid saved-grid">
            {(addMode ? selectionProducts : products).map((product) => (
              <SavedCard
                key={product.id}
                product={product}
                seller={
                  catalog.stores.find((store) => store.id === product.storeId)
                    ?.name
                }
                selected={collection?.productIds.includes(product.id)}
                onSelect={addMode ? () => choose(product.id) : undefined}
              />
            ))}
            {panel === "More ideas" && (
              <article
                className="saved-product saved-partial-product"
                data-original-photo="true"
              >
                <div className="product-media">
                  <img
                    src="/api/reference-media/idea-jojoba"
                    alt="Jojoba Bead Exfoliating Body Wash Bar"
                  />
                  <IconButton
                    icon="plus"
                    label="Jojoba Bar details unavailable"
                    className="save-button"
                    onClick={() => setModal("Product details unavailable")}
                  />
                </div>
                <span>KITSCH</span>
                <strong>Jojoba Bead Exfoliating Body Wash Bar</strong>
              </article>
            )}
          </div>
          {collection && !addMode && (
            <>
              {!products.length && (
                <p className="collection-empty">
                  There are no items in this collection yet.{" "}
                  <button onClick={() => setPanel("Add from saved")}>
                    Add from saved
                  </button>
                </p>
              )}
              {featured.length > 0 && (
                <>
                  <h2 className="featured-heading">
                    Featured brands{" "}
                    <span className="saved-heading-arrow" aria-hidden="true">
                      ›
                    </span>
                  </h2>
                  <div className="featured-brands">
                    {featured.map((store) => (
                      <Link
                        key={store.id}
                        className={`featured-brand ${store.id === "kitsch" ? "featured-kitsch" : ""}`}
                        href={`/stores/${store.id}`}
                        aria-label={`Visit ${store.name}`}
                      >
                        {store.id === "kitsch" ? (
                          <KitschWordmark />
                        ) : store.logo ? (
                          <img src={store.logo} alt={store.name} />
                        ) : (
                          <span>{store.name}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              <button
                className="find-ideas"
                onClick={() => setPanel("More ideas")}
              >
                <span>
                  <Icon name="plus-circle" />
                  Find more ideas
                </span>
                <div>
                  {[
                    ...ideas.map((product) => product.images[0]),
                    "/api/reference-media/idea-jojoba",
                  ].map((src) => (
                    <img key={src} src={src} alt="" />
                  ))}
                </div>
              </button>
            </>
          )}
          {!products.length && !collection && !addMode && (
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
          {addMode && selectionProducts.length === 0 && (
            <p className="collection-empty">
              No saved items are available to add.{" "}
              <Link href="/">Go shopping</Link>
            </p>
          )}
        </>
      )}
      <CartOverlay
        catalog={catalog}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      <FloatingNav
        back
        cart={state.cart.length ? () => setCartOpen(true) : undefined}
        onBack={
          addMode
            ? finishSelection
            : collection
              ? () =>
                  window.history.length > 1
                    ? router.back()
                    : router.replace("/saved")
              : undefined
        }
      />
      <Sheet
        open={!!panel && !addMode}
        headerless={editing}
        initialFocus={editing ? ".collection-name-input" : undefined}
        className={`saved-sheet ${editing ? `collection-editor ${panel === "Edit name" ? "collection-editor-edit" : ""}` : panel === "Collection options" ? "collection-options-sheet" : panel === "Delete collection" ? "collection-delete-sheet" : panel === "Make public" ? "collection-public-sheet" : "collection-sharing-sheet"}`}
        title={
          panel === "Make public"
            ? "Anyone on Shop will be able to view this collection"
            : panel === "Delete collection"
              ? "Are you sure you want to delete this collection?"
              : panel
        }
        onClose={() => setPanel("")}
      >
        {editing ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim() || submitting.current) return;
              submitting.current = true;
              if (panel === "Edit name" && collection) {
                state.updateCollection(collection.id, { name: name.trim() });
                setPanel("");
              } else {
                const id = state.createCollection(name.trim());
                state.updateCollection(id, { visibility });
                setModal("");
                navigate(id, "add", true);
              }
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
              <>
                <div className="collection-edit-thumbnails">
                  {products.map((product) => (
                    <img key={product.id} src={product.images[0]} alt="" />
                  ))}
                </div>
                <p className="collection-input-label">Collection name</p>
              </>
            )}
            <input
              ref={editorRef}
              className="collection-name-input"
              aria-label="Collection name"
              placeholder="Collection name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="off"
              enterKeyHint="done"
              required
            />
            {panel === "Create collection" && (
              <div className="collection-privacy-row">
                <div
                  className="visibility-options"
                  role="group"
                  aria-label="Collection visibility"
                >
                  {(["Private", "Public"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={value}
                      aria-pressed={visibility === value}
                      onClick={() => setVisibility(value)}
                    >
                      <Icon name={value === "Private" ? "lock" : "globe"} />
                    </button>
                  ))}
                </div>
                <div>
                  <strong>{visibility}</strong>
                  <p>
                    {visibility === "Private"
                      ? "Visible only to you and collaborators"
                      : "Anyone on Shop can view"}
                  </p>
                </div>
              </div>
            )}
          </form>
        ) : panel === "Collection options" && collection ? (
          <div className="collection-option-rows">
            <button
              onClick={() => {
                setName(collection.name);
                submitting.current = false;
                setPanel("Edit name");
              }}
            >
              <Icon name="edit" />
              Edit name
            </button>
            <button onClick={() => setPanel("Add from saved")}>
              <Icon name="plus-circle" />
              Add from saved
            </button>
            <button
              onClick={() => {
                if (collection.visibility === "Private")
                  setPanel("Make public");
                else {
                  state.updateCollection(collection.id, {
                    visibility: "Private",
                  });
                  setNotice("Collection is now private · local preview");
                  setPanel("");
                }
              }}
            >
              <Icon
                name={collection.visibility === "Private" ? "globe" : "lock"}
              />
              Make collection{" "}
              {collection.visibility === "Private" ? "public" : "private"}
            </button>
            <button
              className="danger-text"
              onClick={() => setPanel("Delete collection")}
            >
              <Icon name="trash" />
              Delete collection
            </button>
          </div>
        ) : panel === "Make public" && collection ? (
          <>
            <p className="collection-confirm-copy">
              Public is a local preview setting. Nothing is published or shared.
            </p>
            <div className="sheet-actions">
              <button className="pill" onClick={() => setPanel("")}>
                Cancel
              </button>
              <button
                className="primary"
                title="Changes local preview visibility only; nothing is published"
                onClick={() => {
                  state.updateCollection(collection.id, {
                    visibility: "Public",
                  });
                  setPanel("");
                  setNotice("Collection is now public · local preview");
                }}
              >
                Make public
              </button>
            </div>
          </>
        ) : panel === "Delete collection" && collection ? (
          <>
            <p className="collection-confirm-copy">
              The items in this collection will remained saved.
              <br />
              This action can’t be undone.
            </p>
            <div className="sheet-actions">
              <button className="pill" onClick={() => setPanel("")}>
                Cancel
              </button>
              <button
                className="primary collection-delete"
                onClick={() => {
                  state.deleteCollection(collection.id);
                  navigate(null);
                  setPanel("");
                }}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="sheet-copy">
              Sharing and invitations are not connected. This collection exists
              only in your local reference session; no invitation can be sent
              and no public link is available.
            </p>
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
      <Sheet
        open={addMode && modal === "Product details unavailable"}
        title="Product details unavailable"
        onClose={() => setModal("")}
      >
        <p className="sheet-copy">
          This Jojoba Bar is visible in the frozen reference, but its complete
          product record and price are not captured. It cannot be selected in
          this preview.
        </p>
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
    </ShopSurface>
  );
}

export function Following({ catalog }: { catalog: Catalog }) {
  const state = useDiscovery(),
    params = useSearchParams(),
    router = useRouter();
  const manage = params.get("manage") === "1";
  const [listIds] = useState(() => state.followed);
  const [quiltSaved, setQuiltSaved] = useState(false);
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
    <ShopSurface className="shop-page saved-page">
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
                <div className="following-quilt-card">
                  <img
                    src="/api/reference-media/following-quilt"
                    alt="Purple and green quilt"
                  />
                  <span className="following-quilt-deal">Save $3</span>
                  <button
                    type="button"
                    className="following-quilt-save"
                    aria-label={`${quiltSaved ? "Unsave" : "Save"} quilt pattern`}
                    aria-pressed={quiltSaved}
                    onClick={() => setQuiltSaved((value) => !value)}
                  >
                    <Icon name="heart" filled={quiltSaved} />
                  </button>
                </div>
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
      <FloatingNav
        back
        cart={
          !manage && !stores.length ? () => router.push("/cart") : undefined
        }
        showCartWhenEmpty={!manage && !stores.length}
        onBack={manage ? () => router.back() : undefined}
      />
    </ShopSurface>
  );
}
