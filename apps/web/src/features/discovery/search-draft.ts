"use client";

import { useMemo, useSyncExternalStore } from "react";

const eventName = "shop-search-draft";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(eventName, listener);
  };
}
type Draft = { draft: string; photo: string; editing: boolean };
function decode(raw: string, fallback: Draft): Draft {
  try {
    const value: unknown = JSON.parse(raw);
    if (
      value &&
      typeof value === "object" &&
      "draft" in value &&
      typeof value.draft === "string" &&
      "photo" in value &&
      typeof value.photo === "string"
    )
      return {
        draft: value.draft,
        photo: value.photo,
        editing: "editing" in value && value.editing === true,
      };
  } catch {
    // An unrelated or malformed history entry restores the route seed.
  }
  return fallback;
}
// Drafts belong to the actual navigation entry. They never enter a URL,
// storage, server request or shared account, and a fresh entry starts empty.
export function useSearchDraft(
  kind: "composer" | "photo-answer" | `store-search:${string}`,
  initialDraft = "",
  initialPhoto = "",
) {
  const seed = JSON.stringify({
    draft: initialDraft,
    photo: initialPhoto,
    editing: false,
  });
  function snapshot() {
    const value = window.history.state?.shopSearchDraft;
    return value?.kind === kind && typeof value.raw === "string"
      ? value.raw
      : seed;
  }
  const raw = useSyncExternalStore(subscribe, snapshot, () => seed);
  const value = useMemo(
    () =>
      decode(raw, { draft: initialDraft, photo: initialPhoto, editing: false }),
    [raw, initialDraft, initialPhoto],
  );
  function update(patch: Partial<Draft>) {
    const current = decode(snapshot(), value);
    const next = { ...current, ...patch };
    if (
      patch.photo !== undefined &&
      patch.photo !== current.photo &&
      current.photo.startsWith("blob:")
    )
      URL.revokeObjectURL(current.photo);
    window.history.replaceState(
      {
        ...window.history.state,
        shopSearchDraft: { kind, raw: JSON.stringify(next) },
      },
      "",
      window.location.href,
    );
    window.dispatchEvent(new Event(eventName));
  }
  return { ...value, update };
}
