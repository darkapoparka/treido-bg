"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { formatMoney, type Catalog } from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  SaveButton,
  Sheet,
  commitSheetQuery,
} from "./components";
import { Icon } from "./icons";
import { useDiscovery } from "./state";
import { Filters, type SearchFilters } from "./filters";
import {
  capturedCapQuestion,
  isCapturedCapQuestion,
  emptyFilters,
  hasSearchFilters,
  isCapturedFilteredJeans,
  readSearchFilters,
  searchParameters,
  searchProducts,
  searchStores,
} from "./search-model";
import { SearchLoading } from "./search-loading";
import { JeansAnswer } from "./assistant";
import { RecentSearchItems } from "./search-recent";
import { CapturedJeansContinuation } from "./search-captured-continuation";
import styles from "./search-entry.module.css";
import photoStyles from "./search-photo.module.css";
import "./search-loading.css";

const capturedCapPhoto = "/api/reference-media/assistant-uploaded-cap";
const filteredStoreDeals: Record<string, string> = {
  "arrow-twenty-two": "Save $5",
  "american-blues": "Save $15",
};

export function Search({
  catalog,
  query: initialQuery = "",
  filters: initialFilters,
}: {
  catalog: Catalog;
  query?: string;
  filters: SearchFilters;
}) {
  const router = useRouter();
  const params = useSearchParams();
  // An absent q after browser navigation means an empty query, not the stale
  // server prop from a previous result page. The prop only seeds the draft.
  const query = params.get("q") ?? "";
  const editCapturedPhoto = params.get("edit") === "photo";
  const draftEntry = JSON.stringify([query, editCapturedPhoto]);
  const filters: SearchFilters = {
    ...initialFilters,
    ...readSearchFilters(params),
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const state = useDiscovery();
  const { viewAnswer } = state;
  const [draft, setDraft] = useState(
    editCapturedPhoto ? capturedCapQuestion : query || initialQuery,
  );
  const [activeDraftEntry, setActiveDraftEntry] = useState(draftEntry);
  const [filter, setFilter] = useState(false);
  const [filterUnderlay, setFilterUnderlay] = useState<SearchFilters | null>(
    null,
  );
  const answerTrigger = useRef<HTMLButtonElement>(null);
  const answerEntry = useRef(false);
  const [focused, setFocused] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [photo, setPhoto] = useState(editCapturedPhoto ? capturedCapPhoto : "");
  const [photoError, setPhotoError] = useState("");
  const [photoUnavailable, setPhotoUnavailable] = useState(false);
  const [pending, startTransition] = useTransition();
  if (activeDraftEntry !== draftEntry) {
    setActiveDraftEntry(draftEntry);
    setDraft(editCapturedPhoto ? capturedCapQuestion : query);
    setPhoto(editCapturedPhoto ? capturedCapPhoto : "");
    setFocused(false);
  }
  useEffect(() => {
    return () => {
      if (photo.startsWith("blob:")) URL.revokeObjectURL(photo);
    };
  }, [photo]);
  useEffect(() => {
    if (!photo) return;
    // Focus after the photo chooser has returned its own trigger focus. The
    // same input remains mounted through both composer layouts.
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [photo]);
  useEffect(() => {
    const viewport = window.visualViewport;
    const form = formRef.current;
    if (!viewport || !form) return;
    const sync = () => {
      const inset = focused
        ? Math.max(0, innerHeight - viewport.height - viewport.offsetTop)
        : 0;
      form.style.setProperty("--search-keyboard-inset", `${inset}px`);
    };
    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, [focused]);

  const suggestions = focused && !!draft.trim() && !photo;
  const photoEditing = !!photo && focused;
  const history = params.get("view") === "recent";
  const visibleFilters = filter && filterUnderlay ? filterUnderlay : filters;
  const filtered = hasSearchFilters(visibleFilters);
  const jeansQuery = query.trim().toLowerCase() === "jeans";
  const capturedFilteredJeans = isCapturedFilteredJeans(query, visibleFilters);
  const answerOpen = params.get("answer") === "jeans";
  useEffect(() => {
    if (answerOpen) viewAnswer("jeans");
  }, [answerOpen, viewAnswer]);
  const showResults = !!query.trim() || filtered;
  const resultsMode = (showResults || pending) && !suggestions && !photo;
  const results = searchProducts(
    catalog,
    query,
    visibleFilters,
    state.followed,
  );
  if (jeansQuery && visibleFilters.sort === "Relevance") {
    const rank = (id: string) =>
      id === "carpenter-jeans" ? 0 : id === "heritage-jeans" ? 1 : 2;
    results.sort((a, b) => rank(a.id) - rank(b.id));
  }
  // The frozen default Jeans history contains two leading rows, Related
  // searches, then the separately captured lower continuation. Assistant-only
  // recommendations must not be stitched into that result history. Faceted
  // searches retain the complete local result set.
  const displayedResults =
    jeansQuery && !filtered
      ? results.filter((product) =>
          ["carpenter-jeans", "heritage-jeans"].includes(product.id),
        )
      : results;
  const stores = searchStores(catalog, query, visibleFilters, results);
  function openAnswer() {
    const next = new URLSearchParams(params);
    next.set("answer", "jeans");
    answerEntry.current = true;
    router.push(`/search?${next}`, { scroll: false });
  }
  function closeAnswer() {
    if (answerEntry.current) router.back();
    else {
      const next = new URLSearchParams(params);
      next.delete("answer");
      router.replace(`/search${next.size ? `?${next}` : ""}`, {
        scroll: false,
      });
    }
    requestAnimationFrame(() =>
      answerTrigger.current?.focus({ preventScroll: true }),
    );
  }

  function update(next: SearchFilters) {
    commitSheetQuery(searchParameters(query, next));
  }
  function closeSuggestions() {
    setFocused(false);
    inputRef.current?.blur();
  }
  function cancelEditing() {
    setDraft(query);
    closeSuggestions();
  }
  function removePhoto() {
    setPhoto("");
    setPhotoError("");
    setPhotoUnavailable(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function submitQuery(value: string) {
    const next = value.trim();
    setDraft(next);
    setPhoto("");
    closeSuggestions();
    startTransition(() => {
      router.push(`/search${next ? `?q=${encodeURIComponent(next)}` : ""}`);
    });
  }
  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file.");
      return;
    }
    setPhotoError("");
    // A user-selected photograph has not been analyzed. Do not label every
    // upload as the frozen baseball cap or reuse that cap's fixture answer.
    if (photo === capturedCapPhoto) setDraft("");
    setPhoto(URL.createObjectURL(file));
    setPhotos(false);
  }
  // Input identity is stable through text/photo entry, suggestions, pending
  // navigation and results. Keyboard focus must not jump to a replacement node.
  const searchForm = (
    <form
      ref={formRef}
      className={`search-form ${resultsMode ? "top-search" : "search-composer"} ${styles.composer} ${photo ? styles.photoComposer : ""} ${resultsMode ? styles.resultComposer : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!draft.trim() && !photo) return;
        closeSuggestions();
        if (
          photo &&
          (photo !== capturedCapPhoto ||
            (draft.trim() && !isCapturedCapQuestion(draft)))
        ) {
          setPhotoUnavailable(true);
          return;
        }
        if (photo === capturedCapPhoto) {
          startTransition(() => router.push("/assistant?example=photo"));
        } else submitQuery(draft);
      }}
    >
      {resultsMode ? (
        <Icon name="search" />
      ) : (
        <IconButton
          icon="plus"
          label="Add photos"
          onClick={() => {
            setPhotoError("");
            setPhotos(true);
          }}
        />
      )}
      <input
        key="query"
        ref={inputRef}
        aria-label="Search products"
        placeholder="Search or ask anything"
        autoComplete="off"
        enterKeyHint="search"
        value={draft}
        onFocus={() => setFocused(true)}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cancelEditing();
          }
        }}
      />
      {photo && (
        <div className={styles.photoChip}>
          <img src={photo} alt="Selected photo" />
          <button
            type="button"
            aria-label="Remove selected photo"
            onClick={removePhoto}
          >
            <Icon name="close" />
          </button>
        </div>
      )}
      {draft && !suggestions && !photo && (
        <IconButton
          icon="close"
          label="Clear search"
          onClick={() => submitQuery("")}
        />
      )}
      <button
        className="icon-button"
        aria-label="Submit search"
        type="submit"
        disabled={!draft.trim() && !photo}
      >
        <Icon name="arrow" />
      </button>
    </form>
  );
  return (
    <ShopSurface
      className={`shop-page search-page ${styles.page} ${suggestions ? "search-has-suggestions" : ""} ${history ? "search-history" : ""} ${photoEditing ? styles.photoEditing : ""} ${focused ? styles.keyboard : ""} ${resultsMode ? styles.resultsPage : ""}`}
    >
      {searchForm}
      {photoEditing && (
        <IconButton
          icon="close"
          label="Cancel photo search"
          className={styles.photoClose}
          onClick={() => {
            setPhoto("");
            cancelEditing();
          }}
        />
      )}
      {photoEditing && draft.trim() ? null : suggestions ? (
        <section className="search-suggestions-surface">
          <header>
            <h2>Suggestions</h2>
            <IconButton
              icon="close"
              label="Close suggestions"
              onClick={cancelEditing}
            />
          </header>
          {/jean/i.test(draft) && (
            <>
              {[
                ["jeans-warehouse", "Jeans Warehouse", "4.7", ""],
                ["city-jeans", "City Jeans", "4.8", "Save $10"],
              ].map(([id, name, rating, deal]) => (
                <Link
                  key={id}
                  className="suggestion-store"
                  href={`/stores/${id}`}
                >
                  <img
                    className="suggestion-logo"
                    src={`/api/reference-media/suggestion-${id}`}
                    alt=""
                  />
                  <strong>{name}</strong>
                  <span className="suggestion-rating">{rating} ★</span>
                  {deal && <span className="deal-badge">{deal}</span>}
                </Link>
              ))}
            </>
          )}
          {(/jean/i.test(draft)
            ? [
                "jeans",
                "jeans men",
                "jeans baggy",
                "jeans for men",
                "jeans women",
              ]
            : [draft.trim()]
          ).map((q) => (
            <Link
              className="suggestion-query"
              key={q}
              href={`/search?q=${encodeURIComponent(q)}`}
              onClick={(event) => {
                if (
                  event.button === 0 &&
                  !event.metaKey &&
                  !event.ctrlKey &&
                  !event.shiftKey &&
                  !event.altKey
                ) {
                  event.preventDefault();
                  submitQuery(q);
                }
              }}
            >
              <span>
                <Icon name="search" />
              </span>
              {q}
            </Link>
          ))}
        </section>
      ) : pending ? (
        <SearchLoading />
      ) : history ? (
        <>
          <h1>Recently viewed</h1>
          <RecentSearchItems
            catalog={catalog}
            expanded
            capturedContinuation={state.capturedSearchHistory}
          />
        </>
      ) : showResults ? (
        <>
          <div className="filter-chips">
            <IconButton
              icon="filter-circles"
              label="Filter"
              pressed={filtered}
              onClick={() => {
                setFilterUnderlay(filters);
                setFilter(true);
              }}
            />
            <button
              className="pill"
              aria-pressed={!!visibleFilters.origin}
              onClick={() =>
                update({
                  ...filters,
                  origin: filters.origin ? "" : "United States",
                })
              }
            >
              Sells from
              <svg
                className={styles.countryFlag}
                role="img"
                aria-label="United States"
                viewBox="0 0 19 12"
              >
                <path fill="#fff" d="M0 0h19v12H0z" />
                <path
                  stroke="#bc4558"
                  strokeWidth="1.1"
                  d="M0 .6h19M0 2.5h19M0 4.3h19M0 6.2h19M0 8h19M0 9.8h19M0 11.6h19"
                />
                <path fill="#52688b" d="M0 0h8v6.6H0z" />
                <path
                  stroke="#fff"
                  strokeWidth=".5"
                  strokeDasharray=".5 1.2"
                  d="M1 1h6M1 2.5h6M1 4h6M1 5.5h6"
                />
              </svg>
            </button>
            <button
              className="pill"
              aria-pressed={visibleFilters.deals}
              onClick={() => update({ ...filters, deals: !filters.deals })}
            >
              Your deals
            </button>
            <button
              className="pill"
              aria-pressed={visibleFilters.following}
              onClick={() =>
                update({ ...filters, following: !filters.following })
              }
            >
              Following
            </button>
          </div>
          {stores.length > 0 && (
            <div className="search-stores">
              {stores.map((store) => {
                const image = capturedFilteredJeans
                  ? store.coverImage || store.logo
                  : store.id === "fitjeans"
                    ? "/api/reference-media/fitjeans"
                    : store.logo;
                const deal = filteredStoreDeals[store.id];
                return (
                  <Link
                    key={store.id}
                    href={`/stores/${store.id}`}
                    className={`search-store ${image ? "" : "plain"} ${capturedFilteredJeans ? styles.capturedFilterStore : ""}`}
                  >
                    {image ? (
                      <img src={image} alt="" />
                    ) : (
                      <span className="store-monogram">
                        {store.id === "miss-me"
                          ? "MM"
                          : store.name
                              .split(/\s+/)
                              .slice(0, 2)
                              .map((word) => word[0])
                              .join("")}
                      </span>
                    )}
                    {(deal || store.id === "fitjeans") && (
                      <span className={styles.storeDeal}>
                        {deal ?? "Save $30"}
                      </span>
                    )}
                    <strong>{store.name}</strong>
                    {store.rating !== undefined && (
                      <span>
                        {store.rating} ★
                        {store.ratingCount ? ` (${store.ratingCount})` : ""}
                      </span>
                    )}
                  </Link>
                );
              })}
              {capturedFilteredJeans && (
                <span
                  className={styles.capturedStoreContinuation}
                  aria-hidden="true"
                >
                  <img
                    src="/api/reference-media/search-filter-store-continuation"
                    alt=""
                  />
                </span>
              )}
            </div>
          )}
          <div className="search-results">
            {displayedResults.map((p) => (
              <article
                className={`result-row ${
                  capturedFilteredJeans ? styles.capturedFilterResult : ""
                } ${
                  capturedFilteredJeans && p.id === "valentino-blue-denim"
                    ? styles.capturedTallResult
                    : ""
                }`}
                key={p.id}
                data-result-id={p.id}
              >
                <div className="product-media">
                  <Link href={`/products/${p.id}`}>
                    <img src={p.images[0]} alt={p.title} />
                  </Link>
                  <SaveButton product={p} />
                </div>
                <div>
                  <Link href={`/products/${p.id}`}>
                    <strong>{p.title}</strong>
                  </Link>
                  {p.ratingCount && (
                    <p className="rating">
                      <span>★★★★★</span> ({p.ratingCount})
                    </p>
                  )}
                  <p>
                    {formatMoney(p.price)}{" "}
                    {p.compareAt && <del>{formatMoney(p.compareAt)}</del>}
                  </p>
                  <div className={styles.resultMerchant}>
                    <Link
                      className="result-store"
                      href={`/stores/${p.storeId}`}
                    >
                      {catalog.stores.find((s) => s.id === p.storeId)?.logo && (
                        <img
                          src={
                            catalog.stores.find((s) => s.id === p.storeId)!.logo
                          }
                          alt=""
                        />
                      )}
                      {catalog.stores.find((s) => s.id === p.storeId)?.name}
                    </Link>
                    {p.storeId === "fashion-nova" && (
                      <span>
                        4.3 ★ <span className={styles.muted}>(428.8K)</span>
                      </span>
                    )}
                    {p.promotion && (
                      <span className={styles.resultDeal}>{p.promotion}</span>
                    )}
                  </div>
                </div>
                {capturedFilteredJeans && p.id === "valentino-blue-denim" && (
                  <Link
                    className={styles.capturedRelatedProducts}
                    href="/search?q=Valentino%20Blue%20Denim"
                  >
                    See related products
                  </Link>
                )}
              </article>
            ))}
            {!displayedResults.length && (
              <div className="empty-state" role="status">
                <h2>No results found</h2>
                <p>Try another search or clear your filters.</p>
                <button
                  className="pill"
                  onClick={() => update({ ...emptyFilters })}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          {jeansQuery && (
            <>
              <section className={styles.relatedSearches}>
                <h2>Related searches</h2>
                <div>
                  {[
                    "light wash jeans",
                    "jeans with pockets",
                    "girl’s ripped jeans",
                    "plus size jeans",
                    "bootcut jeans",
                    "women’s skinny jeans",
                  ].map((suggestion) => (
                    <Link
                      key={suggestion}
                      href={`/search?q=${encodeURIComponent(suggestion)}`}
                    >
                      <Icon name="search" />
                      {suggestion}
                    </Link>
                  ))}
                </div>
              </section>
              {!filtered && <CapturedJeansContinuation />}
              <button
                ref={answerTrigger}
                type="button"
                className={styles.answerTeaser}
                onClick={openAnswer}
                aria-label="View answer for Jeans"
              >
                <span className={styles.answerThumbnails}>
                  <img
                    src="/api/reference-media/assistant-black-square"
                    alt=""
                  />
                  <img
                    src="/api/reference-media/assistant-white-square"
                    alt=""
                  />
                </span>
                <span>
                  From everyday straight legs to bold, vintage-inspired...{" "}
                  <span className={styles.answerMore}>View more ›</span>
                </span>
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Search</h1>
          <Link className="search-section-heading" href="/search?view=recent">
            <h2>
              Recently viewed <Icon name="back" />
            </h2>
          </Link>
          <RecentSearchItems
            catalog={catalog}
            capturedContinuation={state.capturedSearchHistory}
          />
          {state.viewedAnswers.includes("jeans") && (
            <section className={`keep-shopping ${styles.conversations}`}>
              <Link className={styles.conversationHeading} href="/assistant">
                <h2>
                  Keep shopping <Icon name="back" />
                </h2>
              </Link>
              <Link
                className={styles.conversation}
                href="/assistant"
                aria-label="Continue Finding the right pair of jeans"
              >
                <img
                  src="/api/reference-media/recent-jeans-conversation"
                  alt=""
                />
                <span>
                  Finding the right pair of jeans
                  <small>
                    {state.newlyViewedAnswers.includes("jeans")
                      ? "Just now"
                      : "Jul 24"}
                  </small>
                </span>
              </Link>
            </section>
          )}
        </>
      )}
      <Sheet
        open={photos}
        title="Add photos"
        className={`${styles.photoSheet} ${photoStyles.photoSheet}`}
        onClose={() => setPhotos(false)}
      >
        <label className="account-row">
          <Icon name="photo-library" />
          Choose from library
          <input type="file" accept="image/*" onChange={selectPhoto} />
        </label>
        <label className="account-row">
          <Icon name="camera" />
          Take a photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={selectPhoto}
          />
        </label>
        <button
          className="account-row"
          onClick={() => {
            setPhotoError("");
            setPhoto(capturedCapPhoto);
            setDraft("");
            setPhotos(false);
          }}
        >
          Use captured cap example
        </button>
        {photoError && <p role="alert">{photoError}</p>}
        <p className="form-note">
          Photos stay on this device. The captured answer can be viewed without
          sending a photo.
        </p>
      </Sheet>
      <Sheet
        open={photoUnavailable}
        title="Photo search unavailable"
        onClose={() => setPhotoUnavailable(false)}
      >
        <p className="sheet-copy">
          Photo search is not connected. Your photo stays on this device and has
          not been analyzed. The captured cap example is a separate reference
          answer, not a result for another photo or a different question.
        </p>
        <div className="sheet-actions">
          <button className="pill" onClick={removePhoto}>
            Remove photo
          </button>
          <Link className="primary" href="/assistant?example=photo">
            View captured example
          </Link>
        </div>
      </Sheet>
      {!suggestions && !photoEditing && !focused && (
        <FloatingNav back={showResults || history || pending} />
      )}
      <Sheet
        open={answerOpen}
        title="Jeans answer"
        headerless
        dragHandle
        className={styles.answerSheet}
        onClose={closeAnswer}
        manageHistory={false}
        initialFocus="[data-answer-heading]"
      >
        <JeansAnswer catalog={catalog} onClose={closeAnswer} />
      </Sheet>
      <Filters
        open={filter}
        onClose={() => setFilter(false)}
        value={filters}
        onChange={update}
      />
    </ShopSurface>
  );
}
