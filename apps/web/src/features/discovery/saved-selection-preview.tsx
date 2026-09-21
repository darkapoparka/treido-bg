"use client";
/* eslint-disable @next/next/no-img-element -- Reuses the chosen product photographs. */

export type SavedPreviewTransition = {
  id: number;
  previousImage?: string;
};

export function SavedSelectionPreview({
  image,
  count,
  transition,
  onComplete,
}: {
  image: string;
  count: number;
  transition: SavedPreviewTransition | null;
  onComplete: (id: number) => void;
}) {
  return (
    <span className="saved-selection-preview">
      {transition?.previousImage && (
        <img
          key={`previous-${transition.id}`}
          className="saved-preview-outgoing"
          src={transition.previousImage}
          alt=""
          aria-hidden="true"
        />
      )}
      <img
        key={transition?.id ?? "settled"}
        className={transition ? "saved-preview-incoming" : undefined}
        src={image}
        alt={`${count} selected items`}
        onAnimationEnd={() => {
          if (transition) onComplete(transition.id);
        }}
      />
    </span>
  );
}
