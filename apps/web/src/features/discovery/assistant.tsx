"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDiscovery } from "./state";
import type { Catalog } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import { Sheet, SaveButton, IconButton } from "./components";
import { Icon } from "./icons";
import styles from "./search-entry.module.css";
import photoStyles from "./search-photo.module.css";

export function Assistant({ catalog }: { catalog: Catalog }) {
  const params = useSearchParams();
  const { viewAnswer } = useDiscovery();
  const photo = params.get("example") === "photo";
  useEffect(() => {
    if (!photo) viewAnswer("jeans");
  }, [photo, viewAnswer]);
  if (photo) return <PhotoAssistant catalog={catalog} />;
  return (
    <ShopSurface className={`shop-page ${styles.assistantStandalone}`}>
      <JeansAnswer catalog={catalog} />
    </ShopSurface>
  );
}
export function JeansAnswer({
  catalog,
  onClose,
}: {
  catalog: Catalog;
  onClose?: () => void;
}) {
  const [feedback, setFeedback] = useState(false),
    [votes, setVotes] = useState<Record<string, boolean>>({}),
    [notes, setNotes] = useState(""),
    [submitted, setSubmitted] = useState(false),
    [sentiment, setSentiment] = useState<"positive" | "negative" | null>(null),
    [feedbackSentiment, setFeedbackSentiment] = useState<
      "positive" | "negative"
    >("positive"),
    [query, setQuery] = useState(""),
    [boundary, setBoundary] = useState("");
  const products = [
    "assistant-signature-straight",
    "assistant-urban-straight",
    "assistant-blue-skinny",
  ].flatMap((id) => {
    const p = catalog.products.find((p) => p.id === id);
    const artwork =
      id === "assistant-signature-straight"
        ? "assistant-white-square"
        : id === "assistant-urban-straight"
          ? "assistant-black-square"
          : null;
    return p
      ? [
          {
            ...p,
            images: artwork ? [`/api/reference-media/${artwork}`] : p.images,
          },
        ]
      : [];
  });
  const cityProduct = catalog.products.find(
    (product) => product.id === "city-duaa-denim",
  );
  const signatureProduct = products.find(
    (product) => product.id === "assistant-signature-straight",
  );
  return (
    <section
      className={`assistant-page ${styles.answerBody} ${onClose ? styles.embeddedAnswer : ""}`}
    >
      <Link
        href="/search?q=jeans"
        className="assistant-edit"
        aria-label="Edit search"
      >
        <Icon name="edit-search" />
      </Link>
      <h1 tabIndex={-1} data-answer-heading>
        Jeans
      </h1>
      <p>
        From everyday straight legs to bold, vintage-inspired streetwear, the
        right pair of jeans is all about the balance of comfort and a silhouette
        that feels like home. I have pulled some versatile styles from{" "}
        <Link href="/stores/jeans-warehouse">Jeans Warehouse</Link> and{" "}
        <Link href="/stores/city-jeans">City Jeans</Link> to help you find your
        next go-to pair.
      </p>
      <h2>Classic and straight leg fits</h2>
      <p className="form-note">
        The foundation of any wardrobe with a comfortable, timeless cut
      </p>
      <div className="assistant-product-rail">
        {products.map((p) => (
          <article key={p.id}>
            <div className="product-media">
              <Link href={`/products/${p.id}`}>
                <img src={p.images[0]} alt={p.title} />
              </Link>
              <SaveButton product={p} />
            </div>
            <span>Jeans Warehouse</span>
            <Link href={`/products/${p.id}`}>
              <strong>{p.title}</strong>
            </Link>
            <b>{formatMoney(p.price)}</b>
          </article>
        ))}
      </div>
      <h2>Wide leg and relaxed silhouettes</h2>
      <p className="form-note">Modern, roomy fits with plenty of movement</p>
      <div className="assistant-product-rail assistant-wide-rail">
        {["assistant-wide-one", "assistant-wide-two"].map((key) => (
          <article key={key}>
            <div className="product-media">
              <img
                src={`/api/reference-media/${key}`}
                alt="Jeans Warehouse wide leg recommendation"
              />
            </div>
            <span>Jeans Warehouse</span>
          </article>
        ))}
      </div>
      <div
        className="assistant-answer-card"
        data-answer-product="city-duaa-denim"
      >
        <div className={`product-media ${styles.answerCardPhoto}`}>
          <Link href="/products/city-duaa-denim">
            <img
              src="/api/reference-media/assistant-city-square"
              alt="Men’s Duaa Neptune Denim"
            />
          </Link>
          {cityProduct && <SaveButton product={cityProduct} />}
          <span className={`price-badge deal ${styles.answerCardDeal}`}>
            Save $10
          </span>
        </div>
        <div>
          <Link className={styles.answerSeller} href="/stores/city-jeans">
            <img src="/api/reference-media/suggestion-city-jeans" alt="" />
            <span>
              City Jeans
              <small>
                4.8 ★ <span>(3.7K)</span>
              </small>
            </span>
          </Link>
          <strong>Men’s Duaa Neptune Denim…</strong>
          <p>$90.00</p>
          <ul>
            <li>Heavy knee distressing</li>
            <li>Authentic vintage blue wash</li>
            <li>Modern streetwear fit</li>
          </ul>
        </div>
      </div>
      <div
        className="assistant-answer-card"
        data-answer-product="assistant-signature-straight"
      >
        <div className={`product-media ${styles.answerCardPhoto}`}>
          <Link href="/products/assistant-signature-straight">
            <img
              src="/api/reference-media/assistant-signature-square"
              alt="Signature straight jeans"
            />
          </Link>
          {signatureProduct && <SaveButton product={signatureProduct} />}
        </div>
        <div>
          <Link className={styles.answerSeller} href="/stores/jeans-warehouse">
            <img src="/api/reference-media/suggestion-jeans-warehouse" alt="" />
            <span>
              Jeans Warehouse
              <small>
                4.7 ★ <span>(294)</span>
              </small>
            </span>
          </Link>
          <strong>SIGNATURE STRAIGHT…</strong>
          <p>$29.99</p>
          <ul>
            <li>Clean straight leg cut</li>
            <li>Comfortable stretch blend</li>
            <li>Versatile daily wash</li>
          </ul>
        </div>
      </div>
      <div className="assistant-preferences">
        <p>Are you shopping for yourself today, or looking for someone else?</p>
        <button
          className="pill"
          onClick={() => setBoundary("Shopping preferences")}
        >
          For myself
        </button>
        <button className="pill" onClick={() => setBoundary("Add someone")}>
          Add someone…
        </button>
      </div>
      <div className="assistant-feedback-actions">
        <IconButton
          icon="thumb-up"
          label="Give positive feedback"
          pressed={sentiment === "positive"}
          onClick={() => {
            setFeedbackSentiment("positive");
            setFeedback(true);
          }}
        />
        <IconButton
          icon="thumb-down"
          label="Give negative feedback"
          pressed={sentiment === "negative"}
          onClick={() => {
            setFeedbackSentiment("negative");
            setFeedback(true);
          }}
        />
      </div>
      <form
        className="assistant-composer"
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) setBoundary("Follow-up");
        }}
      >
        <input
          aria-label="Ask a follow-up"
          placeholder="Ask a follow-up"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {onClose ? (
          <IconButton icon="close" label="Close assistant" onClick={onClose} />
        ) : (
          <Link
            href="/search"
            className="icon-button"
            aria-label="Close assistant"
          >
            <Icon name="close" />
          </Link>
        )}
      </form>
      <Sheet
        open={feedback}
        title="Feedback"
        className={`assistant-feedback-sheet ${styles.feedbackSheet}`}
        onClose={() => setFeedback(false)}
      >
        <p>Let us know which products you preferred</p>
        <div className="feedback-products">
          {products.map((p) => (
            <div key={p.id}>
              <img src={p.images[0]} alt={p.title} />
              <button
                aria-label={`Like ${p.title}`}
                aria-pressed={votes[p.id] === true}
                onClick={() => setVotes((v) => ({ ...v, [p.id]: true }))}
              >
                <Icon name="thumb-up" />
              </button>
              <button
                aria-label={`Dislike ${p.title}`}
                aria-pressed={votes[p.id] === false}
                onClick={() => setVotes((v) => ({ ...v, [p.id]: false }))}
              >
                <Icon name="thumb-down" />
              </button>
            </div>
          ))}
        </div>
        <label>
          Share any thoughts about the entire response
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <div className="sheet-actions">
          <button className="pill" onClick={() => setFeedback(false)}>
            Cancel
          </button>
          <button
            className="primary"
            onClick={() => {
              setFeedback(false);
              setSubmitted(true);
              setSentiment(feedbackSentiment);
            }}
          >
            Submit
          </button>
        </div>
      </Sheet>
      <Sheet open={!!boundary} title={boundary} onClose={() => setBoundary("")}>
        <p className="sheet-copy">
          This recorded answer is available locally. New assistant responses and
          shared shopping profiles are not connected.
        </p>
      </Sheet>
      {submitted && (
        <button
          className={`local-toast ${styles.feedbackToast}`}
          aria-label="Thanks for your feedback — saved in this local example"
          onClick={() => setSubmitted(false)}
        >
          Thanks for your feedback
        </button>
      )}
    </section>
  );
}

function PhotoAssistant({ catalog }: { catalog: Catalog }) {
  const [steps, setSteps] = useState(false);
  const [choice, setChoice] = useState("");
  const [boundary, setBoundary] = useState("");
  const [draft, setDraft] = useState("");
  const boundedTrigger = useRef<HTMLButtonElement>(null);
  const cards = [
    {
      id: "assistant-cap",
      imageKey: "assistant-dad-photo",
      productId: "assistant-mobbin-dad-hat",
      seller: "Mobbin",
      title: "Mobbin Dad Hat",
      price: "$19.99",
      details: [
        "Bio-washed chino twill",
        "Relaxed unstructured fit",
        "Pre-curved casual brim",
      ],
    },
    {
      id: "assistant-armor-cap",
      imageKey: "assistant-armor-photo",
      productId: "assistant-mob-armor-snapback",
      seller: "Mob Armor",
      title: "Mob Armor Snapback Hats",
      price: "$19.99",
      details: [
        "Structured 6-panel build",
        "Adjustable snapback fit",
        "Durable daily workhorse",
      ],
    },
  ];
  const recommendations = [
    cards[0]!,
    {
      id: "assistant-mobbin-merch-cap",
      imageKey: "assistant-merch-photo",
      productId: "assistant-mobbin-merch-cap",
      seller: "Mobbin Merch",
      title: "Mobbin Cap",
      price: "$45.00",
    },
  ];
  function productMedia(card: (typeof recommendations)[number]) {
    const product = catalog.products.find((item) => item.id === card.productId);
    const photograph = (
      <img src={`/api/reference-media/${card.imageKey}`} alt={card.title} />
    );
    return (
      <div className={`product-media ${styles.photoCardMedia}`}>
        {product ? (
          <Link href={`/products/${product.id}`}>{photograph}</Link>
        ) : (
          <button
            type="button"
            className={styles.photoProduct}
            aria-label={`View ${card.title}`}
            onClick={() => setBoundary("Product details unavailable")}
          >
            {photograph}
          </button>
        )}
        {product ? (
          <SaveButton product={product} />
        ) : (
          <IconButton
            icon="heart"
            label={`Save ${card.title}`}
            className="save-button"
            onClick={() => setBoundary("Product details unavailable")}
          />
        )}
      </div>
    );
  }
  function closeBoundary() {
    const restoreBoundedTrigger = boundary === "Source-bounded recommendation";
    setBoundary("");
    if (restoreBoundedTrigger)
      requestAnimationFrame(() =>
        boundedTrigger.current?.focus({ preventScroll: true }),
      );
  }
  return (
    <ShopSurface
      className={`shop-page assistant-page photo-assistant ${styles.answerBody} ${styles.photoAnswer}`}
    >
      <Link href="/search" className="assistant-edit" aria-label="Edit search">
        <Icon name="edit-search" />
      </Link>
      <h1>Find me a baseball cap like this</h1>
      <span className="photo-tag">
        <img src="/api/reference-media/assistant-cap" alt="" />
        Photo
      </span>
      <button
        className="assistant-steps"
        onClick={() => setSteps(!steps)}
        aria-expanded={steps}
      >
        Assistant steps <Icon name="chevron" />
      </button>
      {steps && (
        <div className="assistant-step-list">
          <small>Searched for products</small>
          {[
            "Mobbin black baseball cap",
            "Mobbin hat black",
            "Mobbin embroidered baseball cap",
            "black baseball cap white embroidery Mobbin",
          ].map((query) => (
            <p key={query}>
              <Icon name="search" />
              {query}
            </p>
          ))}
          <button
            type="button"
            onClick={() =>
              setBoundary("Additional assistant steps unavailable")
            }
          >
            + 2 more
          </button>
        </div>
      )}
      <p>
        The cap in your photo is the classic <strong>Mobbin dad hat</strong>—a
        relaxed, low-profile staple that prioritizes that broken-in, “lived-in”
        feel right out of the box.
      </p>
      <p>
        I found the exact match you’re looking for, along with a few structured
        alternatives if you’re looking to upgrade the silhouette while keeping
        that same urban aesthetic.
      </p>
      <h2>The Mobbin signature collection</h2>
      <p className="form-note">
        The exact relaxed fit and branding from your photo
      </p>
      <div className="assistant-product-rail">
        {recommendations.map((card) => (
          <article key={card.id} data-photo-recommendation={card.id}>
            {productMedia(card)}
            <span>{card.seller}</span>
            <strong>{card.title}</strong>
            {card.id === "assistant-mobbin-merch-cap" && (
              <span className={styles.photoRating}>
                <span aria-hidden="true">★★★★☆</span> (1)
              </span>
            )}
            <b>{card.price}</b>
          </article>
        ))}
        <article
          className={photoStyles.boundedRecommendation}
          data-photo-recommendation="source-bounded-third"
          data-source-boundary="partial-third"
        >
          <button
            ref={boundedTrigger}
            type="button"
            className={`product-media ${styles.photoCardMedia} ${photoStyles.boundedMedia}`}
            aria-label="View source-bounded recommendation"
            onClick={() => setBoundary("Source-bounded recommendation")}
          >
            <img
              src="/api/reference-media/assistant-bounded-third-photo"
              alt="Source-bounded cap recommendation"
            />
          </button>
          <span>Venice Ru…</span>
          <strong>Mobbin B…</strong>
          <b>$25.00</b>
        </article>
      </div>
      <h2>Structured and snapback alternatives</h2>
      <p className="form-note">
        Higher-profile options with similar monochrome branding
      </p>
      <div className="assistant-product-rail">
        <article data-photo-recommendation={cards[1].id}>
          {productMedia(cards[1])}
          <span>{cards[1].seller}</span>
          <strong>{cards[1].title}</strong>
          <b>{cards[1].price}</b>
        </article>
      </div>
      <p className={styles.photoComparisonCopy}>
        The{" "}
        <button
          type="button"
          onClick={() => setBoundary("Product details unavailable")}
        >
          Mobbin Dad Hat
        </button>{" "}
        is the hero here at just under $20. It&apos;s built from bio-washed
        chino twill, which gives it that soft, unstructured crown that sits
        close to the head for a cleaner, more casual profile. If you want
        something with a bit more &quot;teeth,&quot; the{" "}
        <button
          type="button"
          onClick={() => setBoundary("Product details unavailable")}
        >
          Mob Armor Snapback
        </button>{" "}
        offers a structured crown and a more rigid visor that keeps its shape
        even after heavy use.
      </p>
      {cards.map((card) => (
        <article
          className="assistant-answer-card"
          key={card.id}
          data-photo-comparison={card.id}
        >
          {productMedia(card)}
          <div>
            <div className={styles.photoSeller}>
              <span className={styles.photoSellerLogo} aria-hidden="true">
                {card.seller === "Mobbin" ? "M" : ""}
              </span>
              <div>
                <p>{card.seller}</p>
                {card.seller === "Mob Armor" && (
                  <small>
                    4.8 ★ <span>(1.2K)</span>
                  </small>
                )}
              </div>
            </div>
            <strong>{card.title}</strong>
            <p>{card.price}</p>
            <ul>
              {card.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
      <p>
        Mobbin is a brand rooted in car culture and urban movement, often
        releasing limited &quot;drops&quot; that sell out quickly. Their gear is
        designed to be tough enough for a garage session but clean enough for a
        weekend out.
      </p>
      <p>
        Do you prefer this relaxed &quot;dad hat&quot; fit, or are you looking
        for a more structured snapback style?
      </p>
      <div className="assistant-preferences">
        {["Relaxed dad hats", "Structured snapbacks", "Other Mobbin gear"].map(
          (option) => (
            <button
              className="pill"
              key={option}
              aria-pressed={choice === option}
              onClick={() => {
                setChoice(option);
                setBoundary("Assistant is not connected");
              }}
            >
              {option}
            </button>
          ),
        )}
      </div>
      <div className="assistant-feedback-actions">
        <IconButton
          icon="thumb-up"
          label="Give positive feedback"
          onClick={() => setBoundary("Photo answer feedback unavailable")}
        />
        <IconButton
          icon="thumb-down"
          label="Give negative feedback"
          onClick={() => setBoundary("Photo answer feedback unavailable")}
        />
      </div>
      <form
        className="assistant-composer"
        onSubmit={(event) => {
          event.preventDefault();
          if (draft.trim()) setBoundary("Assistant is not connected");
        }}
      >
        <input
          placeholder="Ask a follow-up"
          aria-label="Ask a follow-up"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <Link
          href="/search"
          className="icon-button"
          aria-label="Close assistant"
        >
          <Icon name="close" />
        </Link>
      </form>
      <Sheet open={!!boundary} title={boundary} onClose={closeBoundary}>
        <p className="sheet-copy">
          {boundary === "Source-bounded recommendation"
            ? "The source exposes only this bounded fragment. Its complete seller, title, destination, variants, and inventory are unavailable, so no unseen product details or destination were invented."
            : boundary === "Product details unavailable"
              ? "This product was shown in the captured answer. Its complete product details are not available here, so it has not been opened, saved, or added to a cart."
              : boundary === "Additional assistant steps unavailable"
                ? "The capture shows two more search steps without their text. No additional search has been run."
                : "Your selection stays local. No photo or message was sent; this is the captured example answer."}
        </p>
      </Sheet>
    </ShopSurface>
  );
}
