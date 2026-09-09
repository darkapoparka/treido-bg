"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductOptions } from "./reviews";
import {
  formatMoney,
  type Catalog,
  type Product as ProductType,
} from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  Sheet,
  StoreRow,
  ProductCard,
  consumeSheetHistory,
} from "./components";
import { Icon } from "./icons";
import { CartOverlay as Cart, CartOffer } from "../commerce/checkout";
import { useDiscovery } from "./state";
import "./product.css";
export { CartOverlay as Cart } from "../commerce/checkout";
export function ProductDetail({
  product,
  catalog,
}: {
  product: ProductType;
  catalog: Catalog;
}) {
  const state = useDiscovery(),
    router = useRouter();
  const [quantity, setQuantity] = useState(1),
    [variant, setVariant] = useState(
      product.variants.find((v) => v.availableQuantity > 0)?.id ??
        product.variants[0]?.id ??
        "",
    );
  const [gallery, setGallery] = useState<number | null>(null),
    [cart, setCart] = useState(false),
    [offer, setOffer] = useState(false),
    [added, setAdded] = useState(false),
    [detail, setDetail] = useState(""),
    [options, setOptions] = useState(false),
    [picker, setPicker] = useState(false),
    [creating, setCreating] = useState(false),
    [name, setName] = useState(""),
    [toast, setToast] = useState(false),
    [subscription, setSubscription] = useState(false);
  const [postalCode, setPostalCode] = useState("94025");
  const viewProduct = state.viewProduct;
  useEffect(() => {
    viewProduct(product.id);
  }, [product.id, viewProduct]);
  const store = catalog.stores.find((s) => s.id === product.storeId),
    selected =
      product.variants.find((v) => v.id === variant) ?? product.variants[0];
  const shea = product.id === "shea-butter",
    bag = product.id === "shampoo-bag";
  const photos = shea
    ? [
        "/api/reference-media/shea-gallery-hero",
        "/api/reference-media/shea-gallery-benefits",
        "/api/reference-media/shea-gallery-testimonial",
      ]
    : product.images;
  const price =
    subscription && shea ? { ...product.price, amount: 1050 } : product.price;
  function add() {
    if (!selected?.availableQuantity) return;
    const prior =
      state.cart.find(
        (l) => l.productId === product.id && l.variantId === variant,
      )?.quantity ?? 0;
    state.add({
      productId: product.id,
      variantId: variant,
      quantity: Math.min(selected.availableQuantity, prior + quantity),
    });
    setAdded(true);
  }
  function buy() {
    add();
    consumeSheetHistory();
    router.replace(`/checkout?store=${product.storeId}`);
  }
  function saveTo(id?: string) {
    if (!state.saved.includes(product.id)) state.toggleSaved(product.id);
    if (id) {
      const c = state.collections.find((x) => x.id === id);
      if (c && !c.productIds.includes(product.id))
        state.updateCollection(id, {
          productIds: [...c.productIds, product.id],
        });
    }
    setPicker(false);
    setCreating(false);
    setToast(true);
  }
  const description = shea
    ? "Super-hydrating formula moisturizes your skin (you won’t even need body lotion post-shower!) Small plant-derived exfoliants gently exfoliate to reveal softer skin."
    : bag
      ? "Mesh fabric creates a thick, foamy lather for luxurious washing. Our patented design preserves the life of your bar."
      : product.description;
  const relatedIds = shea
    ? [
        "chocolate-body-bag",
        "sugar-body-scrub",
        "solid-shave-butter",
        "charcoal-body-wash",
      ]
    : bag
      ? ["black-conditioner-bag", "chocolate-body-bag"]
      : undefined;
  const related = relatedIds
    ? relatedIds.flatMap((id) => {
        const item = catalog.products.find((p) => p.id === id);
        if (!item) return [];
        return [
          {
            ...item,
            ...(shea ? { promotion: "$20 off order" } : {}),
            ...(shea && id === "chocolate-body-bag"
              ? { title: "Chocolate Body Wash Bar Bag", ratingCount: "748" }
              : {}),
          },
        ];
      })
    : catalog.products
        .filter((p) => p.storeId === product.storeId && p.id !== product.id)
        .slice(0, 4);
  return (
    <main className={`shop-page product-page ${cart ? "cart-visible" : ""}`}>
      <div className="product-underlay">
        {store && <StoreRow store={store} onMore={() => setOptions(true)} />}
        <div className="product-gallery">
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => setGallery(i)}
              aria-label={`View product image ${i + 1}`}
            >
              <img src={src} alt={`${product.title}, image ${i + 1}`} />
            </button>
          ))}
        </div>
        <section className="product-details">
          <div className="product-heading">
            <h1>{product.title}</h1>
            <IconButton
              icon="heart"
              label="Save product"
              pressed={state.saved.includes(product.id)}
              onClick={() => setPicker(true)}
            />
            <IconButton
              icon="share"
              label="Share product"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setDetail("Link copied");
                } catch {
                  setDetail("Share product");
                }
              }}
            />
          </div>
          {product.rating !== undefined && (
            <button
              className="rating review-link"
              onClick={() => router.push(`/products/${product.id}/reviews`)}
            >
              <span>★★★★★</span> {product.ratingCount} ratings ›
            </button>
          )}
          <p className="product-price">
            {formatMoney(price)}{" "}
            {product.compareAt && <del>{formatMoney(product.compareAt)}</del>}
          </p>
          {(shea || bag || product.promotion) && (
            <button
              className="product-deal"
              onClick={() => setDetail("Offer details")}
            >
              <img src="/api/reference-media/deal-tag" alt="" />
              <span>
                <strong>
                  {shea || bag
                    ? "Save $20 when you spend $50"
                    : product.promotion}
                </strong>
                <span>Exclusive to Shop</span>
              </span>
            </button>
          )}
          {product.variants.length > 1 && (
            <fieldset className="variants">
              <legend>Size</legend>
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  disabled={!v.availableQuantity}
                  className="pill"
                  aria-pressed={variant === v.id}
                  onClick={() => {
                    setVariant(v.id);
                    setQuantity(1);
                  }}
                >
                  {v.label}
                </button>
              ))}
            </fieldset>
          )}
          <div className="quantity">
            <label>Quantity</label>
            <div className="stepper">
              <IconButton
                icon="minus"
                label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              />
              <output>{quantity}</output>
              <IconButton
                icon="plus"
                label="Increase quantity"
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(selected?.availableQuantity ?? 1, q + 1),
                  )
                }
              />
            </div>
          </div>
          {shea ? (
            <div className="purchase-modes">
              <div>
                <label>
                  <span>
                    <strong>One time purchase</strong>
                    <br />
                    {formatMoney(product.price)}
                  </span>
                  <input
                    type="radio"
                    name="purchase"
                    checked={!subscription}
                    onChange={() => setSubscription(false)}
                  />
                </label>
                {!subscription && (
                  <div className="purchase-actions">
                    <button onClick={buy}>Buy now</button>
                    <button
                      className="primary"
                      disabled={!selected?.availableQuantity}
                      onClick={add}
                    >
                      {added ? "Added to cart" : "Add to cart"}
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label>
                  <span>
                    <strong>
                      Subscribe & save <small>Save 25%</small>
                    </strong>
                    <br />
                    $10.50 <del>$14.00</del>
                  </span>
                  <input
                    type="radio"
                    name="purchase"
                    checked={subscription}
                    onChange={() => setSubscription(true)}
                  />
                </label>
                {subscription && (
                  <div className="purchase-actions">
                    <button onClick={() => setDetail("Subscription")}>
                      Buy now
                    </button>
                    <button
                      className="primary"
                      onClick={() => setDetail("Subscription")}
                    >
                      Add to cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="pdp-purchase-buttons">
              <button
                className="primary"
                disabled={!selected?.availableQuantity}
                onClick={add}
              >
                {added ? "Added to cart" : "Add to cart"}
              </button>
              <button onClick={buy} disabled={!selected?.availableQuantity}>
                Buy now
              </button>
            </div>
          )}
          {added && (
            <button className="pdp-offer-link" onClick={() => setOffer(true)}>
              Add items to save $20 with your exclusive offer ›
            </button>
          )}
          <section className="pdp-description">
            <h2>Description</h2>
            <p>
              {description}
              <button onClick={() => setDetail("Description")}>
                Read more
              </button>
            </p>
          </section>
          {(shea || bag) && (
            <section className="pdp-review-preview">
              <h2>Reviews</h2>
              <div className="review-summary">
                <div>
                  <strong>4.6</strong>
                  <div className="rating">
                    <span>★★★★★</span>
                  </div>
                  <p>{shea ? "3.3K" : "3.8K"} ratings</p>
                </div>
                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map((n, i) => (
                    <div key={n}>
                      <span>{n}</span>
                      <i>
                        <b style={{ width: `${[80, 9, 5, 2, 1][i]}%` }} />
                      </i>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pdp-review-rail">
                <article>
                  <span className="rating">★★★★★</span>
                  <p>
                    {shea
                      ? "Girlfriend loves it and I can breathe."
                      : "Curly Hair Shampoo Bar"}
                  </p>
                </article>
                <article>
                  <span className="rating">★★★★★</span>
                  <p>How much I love your product</p>
                </article>
              </div>
              <Link href={`/products/${product.id}/reviews`}>
                Read all reviews
              </Link>
            </section>
          )}
          <section className="pdp-delivery">
            <h2>Delivery & Returns</h2>
            <button onClick={() => setDetail("Ship to")}>
              ⌖ Ship to {postalCode} ›
            </button>
            <p>Shipping calculated at checkout</p>
            {(shea || bag) && <p>Arrives as soon as Sun, Aug 2</p>}
            <div>
              <button onClick={() => setDetail("Return policy")}>
                Return policy
              </button>
              <button onClick={() => setDetail("Shipping policy")}>
                Shipping policy
              </button>
            </div>
            <Link href={`/stores/${product.storeId}`}>
              ↗ Visit {store?.name}
            </Link>
          </section>
          {store && (
            <article
              className={`pdp-store-card ${shea || bag ? "pdp-kitsch-card" : ""}`}
            >
              <Link
                href={`/stores/${store.id}`}
                aria-label={`Visit ${store.name}`}
              >
                <img
                  src={
                    shea || bag
                      ? "/api/reference-media/pdp-kitsch-art"
                      : product.images[0]
                  }
                  alt=""
                />
                <span className="pdp-store-identity">
                  <strong>{store.name}</strong>
                  <span>
                    {store.rating} ★ (
                    {shea ? "195K" : bag ? "195.2K" : store.ratingCount})
                  </span>
                </span>
              </Link>
              <button
                aria-pressed={state.followed.includes(store.id)}
                onClick={() => state.toggleFollow(store.id)}
              >
                {state.followed.includes(store.id) ? "Following" : "Follow"}
              </button>
            </article>
          )}
          <h2 className="pdp-related-heading">You might also like</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                showPromotion={shea}
                storeName={store?.name}
              />
            ))}
          </div>
        </section>
      </div>
      <FloatingNav
        back
        cart={state.cart.length ? () => setCart(true) : undefined}
      />
      <Cart catalog={catalog} open={cart} onClose={() => setCart(false)} />
      <CartOffer
        catalog={catalog}
        storeId={product.storeId}
        open={offer}
        onClose={() => setOffer(false)}
      />
      <ProductOptions
        productId={product.id}
        storeId={product.storeId}
        open={options}
        onClose={() => setOptions(false)}
      />
      <Sheet
        open={gallery !== null}
        title="Product photos"
        headerless
        className="product-lightbox"
        onClose={() => setGallery(null)}
      >
        {gallery !== null && (
          <>
            <IconButton
              icon="close"
              label="Close product photos"
              onClick={() => setGallery(null)}
            />
            <div
              className="lightbox-swipe"
              onTouchStart={(e) => {
                e.currentTarget.dataset.start = String(e.touches[0].clientX);
              }}
              onTouchEnd={(e) => {
                const delta =
                  e.changedTouches[0].clientX -
                  Number(e.currentTarget.dataset.start);
                if (Math.abs(delta) > 30)
                  setGallery(
                    (gallery + (delta < 0 ? 1 : photos.length - 1)) %
                      photos.length,
                  );
              }}
            >
              <img
                src={photos[gallery]}
                alt={`${product.title}, image ${gallery + 1}`}
              />
            </div>
            <div className="photo-dots">
              {photos.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show photo ${i + 1}`}
                  aria-pressed={gallery === i}
                  onClick={() => setGallery(i)}
                />
              ))}
            </div>
          </>
        )}
      </Sheet>
      <Sheet
        open={picker}
        title={creating ? "Create collection" : "Save to collection"}
        headerless={!creating}
        className="product-save-picker"
        onClose={() => {
          setPicker(false);
          setCreating(false);
        }}
      >
        {creating ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const id = state.createCollection(name.trim(), [product.id]);
              saveTo(id);
            }}
          >
            <input
              aria-label="Collection name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className="primary" disabled={!name.trim()}>
              Create collection
            </button>
          </form>
        ) : (
          <>
            <button className="picker-row" onClick={() => saveTo()}>
              <img src={photos[0]} alt="" />
              <span>
                Saved <Icon name="lock" />
              </span>
              <Icon name="heart" filled />
            </button>
            {state.collections.map((c) => (
              <button
                className="picker-row"
                key={c.id}
                onClick={() => saveTo(c.id)}
              >
                <span>{c.name}</span>
                <Icon name="plus" />
              </button>
            ))}
            <button
              className="picker-row"
              onClick={() => {
                setName("");
                setCreating(true);
              }}
            >
              <b aria-hidden="true">+</b>Create collection
            </button>
          </>
        )}
      </Sheet>
      {toast && (
        <div className="product-saved-toast" role="status">
          <img src={photos[0]} alt="" />
          <span>
            <strong>Item saved</strong>
            {product.title}
          </span>
          <button
            onClick={() => {
              setToast(false);
              router.push("/saved");
            }}
          >
            View
          </button>
        </div>
      )}
      <Sheet
        open={!!detail}
        title={detail}
        className={
          detail === "Description" ? "product-description-sheet" : undefined
        }
        onClose={() => setDetail("")}
      >
        <div className="sheet-copy">
          {detail === "Description" ? (
            <>
              {shea ? (
                <>
                  <ul>
                    <li>
                      Super-hydrating formula moisturizes your skin (you won’t
                      even need body lotion post-shower!)
                    </li>
                    <li>
                      Small plant-derived exfoliants gently exfoliate to reveal
                      softer skin.
                    </li>
                    <li>
                      Free of parabens, phthalates, silicones, & sulfates.
                    </li>
                    <li>
                      Made in the USA from Globally Sourced Ingredients, Vegan,
                      Cruelty Free, Leaping Bunny Certified
                    </li>
                  </ul>
                  <p>Ingredients:</p>
                  <p>
                    Sodium Sunflowerate, Sodium Cocoate, Fragrance (Parfum),
                    Butyrospermum Parkii (Shea) Butter, Sodium Chloride (Sea
                    Salt), Prunus Armeniaca (Apricot) Seed Powder, Natural
                    Tocopherol (Vitamin E), Benzaldehyde, Limonene, Citrus
                    Aurantium Amara Peel Oil, Cinnamal, Citrus Limon (Lemon)
                    Peel Oil, Linalool, Linalyl Acetate, Mentha Viridis
                    (Spearmint) Leaf Oil, Carvone, Cananga Odorata Oil/Extract,
                    Pinene, Iron Oxides (CI 77491, 77492, CI 77499).
                  </p>
                  <p>Natural Color</p>
                  <p>Free of parabens, phthalates, silicones, &amp; sulfates</p>
                  <p>Fragrance: Almond & Cherry</p>
                </>
              ) : (
                <p>{description}</p>
              )}
            </>
          ) : detail === "Offer details" ? (
            <p>
              Save $20 when you spend $50. Exclusive to Shop. This is a
              reference offer.
            </p>
          ) : detail === "Ship to" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDetail("");
              }}
            >
              <label>
                Postal code
                <input
                  aria-label="Postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </label>
              <button className="primary">Done</button>
            </form>
          ) : detail === "Subscription" ? (
            <p>
              Subscription selection is available in this preview. Recurring
              checkout is not connected.
            </p>
          ) : detail.includes("policy") ? (
            <Link href={`/stores/${product.storeId}/info`}>
              View {store?.name} policies
            </Link>
          ) : (
            <p>{`/products/${product.id}`}</p>
          )}
        </div>
      </Sheet>
    </main>
  );
}
