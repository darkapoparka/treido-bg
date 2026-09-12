"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { formatMoney, type SavedListing } from "../catalog/types";
import { IconButton, Sheet } from "./components";
import { useDiscovery } from "./state";

export function SavedCard({
  product,
  seller,
  selected,
  onSelect,
}: {
  product: SavedListing;
  seller?: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const state = useDiscovery();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const saved = state.saved.includes(product.id);
  const photo = <img src={product.images[0]} alt={onSelect ? "" : product.title} />;
  const title = <strong>{product.title}</strong>;
  return (
    <article
      className={`saved-product ${onSelect ? "saved-choosing" : ""}`}
      data-product-id={product.id}
      data-photo-layout={product.photoLayout}
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
            {photo}
          </button>
        ) : product.detailUnavailable ? (
          <button
            type="button"
            aria-label={`View captured ${product.title}`}
            onClick={() => setDetailsOpen(true)}
          >
            {photo}
          </button>
        ) : (
          <Link href={`/products/${product.id}`}>{photo}</Link>
        )}
        {product.promotion && (
          <span className="saved-promotion">{product.promotion}</span>
        )}
        <IconButton
          className={`save-button ${(onSelect ? selected : saved) ? "saved-active" : ""}`}
          icon={onSelect ? (selected ? "check" : "plus") : "heart"}
          label={
            onSelect
              ? `${selected ? "Remove" : "Add"} ${product.title}`
              : `${saved ? "Unsave" : "Save"} ${product.title}`
          }
          pressed={onSelect ? selected : saved}
          filled={onSelect ? false : undefined}
          onClick={onSelect ?? (() => state.toggleSaved(product.id))}
        />
      </div>
      {seller && <span>{seller}</span>}
      {product.detailUnavailable ? (
        <button
          type="button"
          className="saved-item-title"
          onClick={() => setDetailsOpen(true)}
        >
          {title}
        </button>
      ) : (
        <Link className="saved-item-title" href={`/products/${product.id}`}>
          {title}
        </Link>
      )}
      {product.price && <b>{formatMoney(product.price)}</b>}
      {product.variantLabel && (
        <small className="saved-variant">{product.variantLabel}</small>
      )}
      {product.detailUnavailable && (
        <Sheet
          open={detailsOpen}
          title="Captured item details"
          onClose={() => setDetailsOpen(false)}
        >
          <p className="sheet-copy">{product.detailUnavailable}</p>
          <button className="primary form-submit" onClick={() => setDetailsOpen(false)}>
            Back to Saved
          </button>
        </Sheet>
      )}
    </article>
  );
}
