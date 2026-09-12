"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon } from "../discovery/icons";
import { useDiscovery } from "../discovery/state";
import { formatMoney, type Catalog } from "../catalog/types";
import { capturedLineAmount } from "./pricing";
function Trash() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
    </svg>
  );
}
export function CartContents({
  catalog,
  onContinue,
  onOffer,
}: {
  catalog: Catalog;
  onContinue?: () => void;
  onOffer?: (id: string) => void;
}) {
  const state = useDiscovery();
  const resolve = (list: typeof state.cart) =>
    list.flatMap((l) => {
      const product = catalog.products.find((p) => p.id === l.productId),
        variant = product?.variants.find((v) => v.id === l.variantId);
      return product && variant ? [{ ...l, product, variant }] : [];
    });
  const resolved = resolve(state.cart),
    later = resolve(state.later);
  const stores = [...new Set(resolved.map((l) => l.product.storeId))];
  return (
    <>
      {!resolved.length ? (
        <div className="notification-empty">
          <h2>Your cart is empty</h2>
          <p>
            Add products while you shop, so they’ll be ready for checkout later.
          </p>
          {!onContinue && (
            <Link className="primary form-submit" href="/search">
              Go shopping
            </Link>
          )}
        </div>
      ) : (
        stores.map((storeId) => {
          const lines = resolved.filter((l) => l.product.storeId === storeId),
            store = catalog.stores.find((s) => s.id === storeId),
            total = lines.reduce(
              (n, l) =>
                n + l.quantity * capturedLineAmount(l, l.product.price.amount),
              0,
            );
          return (
            <section className="seller-cart" key={storeId}>
              <header>
                {store?.logo && <img src={store.logo} alt="" />}
                <div>
                  <strong>{store?.name}</strong>
                  <p>
                    {store?.rating} ★ ({store?.ratingCount})
                  </p>
                </div>
              </header>
              {storeId === "kitsch" &&
                lines.some((l) => l.productId === "shampoo-bag") && (
                  <p className="cart-captured-error" role="status">
                    <span>!</span> The spring20orderdiscountold discount code is
                    not honoured
                  </p>
                )}
              {lines.map((l) => (
                <article
                  className="commerce-line"
                  key={`${l.productId}-${l.variantId}`}
                >
                  <img src={l.product.images[0]} alt="" />
                  <div>
                    <div className="cart-line-title">
                      <Link href={`/products/${l.productId}`}>
                        <strong>{l.product.title}</strong>
                      </Link>
                      <span>
                        {formatMoney({
                          ...l.product.price,
                          amount: l.product.price.amount * l.quantity,
                        })}
                      </span>
                    </div>
                    {l.product.variants.length > 1 && (
                      <p className="cart-variant">{l.variant.label}</p>
                    )}
                    {capturedLineAmount(l, l.product.price.amount) !==
                      l.product.price.amount && (
                      <p className="cart-discount">
                        Discount applied{" "}
                        <span>
                          {formatMoney({
                            amount: -135 * l.quantity,
                            currency: "USD",
                          })}
                        </span>
                      </p>
                    )}
                    <div className="cart-controls">
                      <div className="cart-stepper">
                        <button
                          aria-label={
                            l.quantity === 1
                              ? `Remove ${l.product.title}`
                              : `Decrease ${l.product.title}`
                          }
                          onClick={() =>
                            l.quantity === 1
                              ? state.remove(l.productId, l.variantId)
                              : state.setQuantity(
                                  l.productId,
                                  l.variantId,
                                  l.quantity - 1,
                                )
                          }
                        >
                          {l.quantity === 1 ? <Trash /> : <Icon name="minus" />}
                        </button>
                        <output>{l.quantity}</output>
                        <button
                          aria-label={`Increase ${l.product.title}`}
                          disabled={l.quantity >= l.variant.availableQuantity}
                          onClick={() =>
                            state.setQuantity(
                              l.productId,
                              l.variantId,
                              l.quantity + 1,
                            )
                          }
                        >
                          <Icon name="plus" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          state.saveForLater(l.productId, l.variantId)
                        }
                      >
                        Save for later
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              {onOffer && (
                <button
                  className="cart-offer-link"
                  onClick={() => onOffer(storeId)}
                >
                  <span>
                    Add{" "}
                    {formatMoney({
                      amount: Math.max(0, 5000 - total),
                      currency: "USD",
                    })}{" "}
                    to save $20 with your exclusive offer
                  </span>
                  <strong>Add items</strong>
                </button>
              )}
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>
                  {formatMoney({ amount: total, currency: "USD" })}
                </strong>
              </div>
              <Link
                onClick={onContinue}
                className="primary form-submit"
                href={`/checkout?store=${encodeURIComponent(storeId)}`}
              >
                Continue to checkout
              </Link>
            </section>
          );
        })
      )}
      {later.length > 0 && (
        <section className="cart-later">
          <h2>Saved for later</h2>
          {later.map((l) => (
            <article
              className="commerce-line"
              key={`${l.productId}-${l.variantId}`}
            >
              <img src={l.product.images[0]} alt="" />
              <div>
                <div className="cart-line-title">
                  <strong>{l.product.title}</strong>
                  <span>
                    {formatMoney({
                      ...l.product.price,
                      amount: l.product.price.amount * l.quantity,
                    })}
                  </span>
                </div>
                {l.product.variants.length > 1 && (
                  <p className="cart-variant">{l.variant.label}</p>
                )}
                <div className="cart-controls">
                  <button
                    aria-label={`Remove saved ${l.product.title}`}
                    onClick={() => state.removeLater(l.productId, l.variantId)}
                  >
                    <Trash />
                  </button>
                  <button
                    aria-label={`Save ${l.product.title}`}
                    aria-pressed={state.saved.includes(l.productId)}
                    onClick={() => state.toggleSaved(l.productId)}
                  >
                    <Icon
                      name="heart"
                      filled={state.saved.includes(l.productId)}
                    />
                  </button>
                  <button
                    className="move-to-cart"
                    disabled={l.variant.availableQuantity <= 0}
                    title={
                      l.variant.availableQuantity <= 0
                        ? "Currently unavailable"
                        : undefined
                    }
                    onClick={() =>
                      state.moveToCart(
                        l.productId,
                        l.variantId,
                        l.variant.availableQuantity,
                      )
                    }
                  >
                    Move to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
