"use client";
/* eslint-disable @next/next/no-img-element -- Existing catalog artwork only. */
import Link from "next/link";
import type { Catalog } from "../catalog/types";
import { IconButton, ProductCard } from "./components";
import { KitschWordmark } from "./kitsch-wordmark";
import { useDiscovery } from "./state";
import styles from "./search-entry.module.css";

const recentCover: Record<string, string> = {
  kitsch: "recent-kitsch-cover",
  pura: "recent-pura-cover",
  drmtlgy: "recent-drmtlgy-photo",
  "loaded-tea": "recent-loaded-logo",
};

export function RecentSearchItems({
  catalog,
  expanded = false,
  limit,
}: {
  catalog: Catalog;
  expanded?: boolean;
  limit?: number;
}) {
  const state = useDiscovery();
  const items = state.viewedItems.flatMap((item) => {
    const product =
      item.kind === "product"
        ? catalog.products.find((value) => value.id === item.id)
        : undefined;
    const store =
      item.kind === "store"
        ? catalog.stores.find((value) => value.id === item.id)
        : undefined;
    // A stale history ID is not an empty card or a "Remove undefined" control.
    return product || store ? [{ item, product, store }] : [];
  });
  if (!items.length)
    return (
      <div className={styles.empty} role="status">
        <p>No recently viewed items</p>
        <Link href="/">Browse products</Link>
      </div>
    );
  return (
    <div
      className={
        expanded
          ? `product-grid recent-history-grid ${styles.history}`
          : `product-rail ${styles.recent}`
      }
    >
      {items.slice(0, limit).map(({ item, product, store }) => (
        <div
          key={`${item.kind}:${item.id}`}
          className={styles.item}
          data-recent-kind={item.kind}
          data-recent-id={item.id}
        >
          {product ? (
            <ProductCard
              product={{
                ...product,
                promotion: item.promotion,
                images:
                  product.id === "terracotta"
                    ? ["/api/reference-media/recent-terracotta-photo"]
                    : product.images,
              }}
              compact
            />
          ) : store ? (
            <Link
              className={`${styles.store} ${recentCover[store.id] ? styles.capturedStore : ""} ${store.id === "loaded-tea" ? styles.logoStore : ""} ${store.id === "drmtlgy" ? styles.partialStore : ""}`}
              data-recent-store={store.id}
              href={`/stores/${store.id}`}
              aria-label={`Visit ${store.name}`}
            >
              {(recentCover[store.id] || store.coverImage || store.logo) && (
                <img
                  src={
                    recentCover[store.id]
                      ? `/api/reference-media/${recentCover[store.id]}`
                      : store.coverImage || store.logo
                  }
                  alt=""
                />
              )}
              {(!recentCover[store.id] || store.id === "drmtlgy") && (
                <span className={styles.wordmark} aria-hidden="true">
                  {store.id === "kitsch" ? <KitschWordmark /> : store.name}
                </span>
              )}
              {!expanded && item.promotion && (
                <span className="price-badge deal">{item.promotion}</span>
              )}
            </Link>
          ) : null}
          {expanded && (
            <IconButton
              icon="close"
              label={`Remove ${product?.title ?? store?.name} from recently viewed`}
              className={styles.remove}
              onClick={() => state.removeViewed(item.kind, item.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
