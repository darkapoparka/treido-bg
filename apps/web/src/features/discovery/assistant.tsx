"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { formatMoney } from "../catalog/types";
import { Sheet, SaveButton, IconButton } from "./components";
import { Icon } from "./icons";
export function Assistant({ catalog }: { catalog: Catalog }) {
  const params = useSearchParams();
  if (params.get("example") === "photo") return <PhotoAssistant />;
  return <JeansAssistant catalog={catalog} />;
}
function JeansAssistant({ catalog }: { catalog: Catalog }) {
  const [feedback, setFeedback] = useState(false),
    [votes, setVotes] = useState<Record<string, boolean>>({}),
    [notes, setNotes] = useState(""),
    [submitted, setSubmitted] = useState(false),
    [query, setQuery] = useState(""),
    [boundary, setBoundary] = useState("");
  const products = [
    "assistant-signature-straight",
    "assistant-urban-straight",
    "assistant-blue-skinny",
  ].flatMap((id) => {
    const p = catalog.products.find((p) => p.id === id);
    return p ? [p] : [];
  });
  return (
    <ShopSurface className="shop-page assistant-page">
      <Link
        href="/search?q=jeans"
        className="assistant-edit"
        aria-label="Edit search"
      >
        <Icon name="edit" />
      </Link>
      <h1>Jeans</h1>
      <p>
        From everyday straight legs to bold, vintage-inspired streetwear, the
        right pair of jeans is all about the balance of comfort and a silhouette
        that feels like home. I have pulled some versatile styles from{" "}
        <Link href="/stores/jeans-warehouse">Jeans Warehouse</Link> and City
        Jeans to help you find your next go-to pair.
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
      <div className="assistant-answer-card">
        <Link href="/products/city-duaa-denim">
          <img
            src="/api/reference-media/assistant-city-denim"
            alt="Men’s Duaa Neptune Denim"
          />
        </Link>
        <div>
          <Link href="/stores/city-jeans">City Jeans</Link>
          <p>4.8 ★ (3.7K)</p>
          <strong>Men’s Duaa Neptune Denim…</strong>
          <p>$90.00</p>
          <ul>
            <li>Heavy knee distressing</li>
            <li>Authentic vintage blue wash</li>
            <li>Modern streetwear fit</li>
          </ul>
        </div>
      </div>
      <div className="assistant-answer-card">
        <img
          src="/api/reference-media/assistant-white"
          alt="Signature straight jeans"
        />
        <div>
          <Link href="/stores/jeans-warehouse">Jeans Warehouse</Link>
          <p>4.7 ★ (294)</p>
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
          onClick={() => setFeedback(true)}
        />
        <IconButton
          icon="thumb-down"
          label="Give negative feedback"
          onClick={() => setFeedback(true)}
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
        <Link
          href="/search"
          className="icon-button"
          aria-label="Close assistant"
        >
          <Icon name="close" />
        </Link>
      </form>
      <Sheet
        open={feedback}
        title="Feedback"
        className="assistant-feedback-sheet"
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
        <button className="local-toast" onClick={() => setSubmitted(false)}>
          Thanks for your feedback · saved locally
        </button>
      )}
    </ShopSurface>
  );
}

function PhotoAssistant() {
  const [steps, setSteps] = useState(false),
    [choice, setChoice] = useState(""),
    [boundary, setBoundary] = useState(false),
    [draft, setDraft] = useState("");
  const cards = [
    {
      id: "assistant-cap",
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
  return (
    <ShopSurface className="shop-page assistant-page photo-assistant">
      <Link href="/search" className="assistant-edit" aria-label="Edit search">
        <Icon name="edit" />
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
        Assistant steps {steps ? "⌄" : "›"}
      </button>
      {steps && (
        <div className="assistant-step-list">
          <small>Searched for products</small>
          {[
            "Mobbin black baseball cap",
            "Mobbin Dad Hat",
            "Mobbin embroidered baseball cap",
            "black baseball cap white embroidery Mobbin",
          ].map((q) => (
            <p key={q}>
              <Icon name="search" />
              {q}
            </p>
          ))}
        </div>
      )}
      <p>
        The cap in your photo is the classic Mobbin dad hat—a relaxed,
        low-profile staple that prioritizes that broken-in, “lived-in” feel
        right out of the box.
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
        {cards.map((c) => (
          <article key={c.id}>
            <img src={`/api/reference-media/${c.id}`} alt={c.title} />
            <span>{c.seller}</span>
            <strong>{c.title}</strong>
            <b>{c.price}</b>
          </article>
        ))}
      </div>
      <h2>Structured and snapback alternatives</h2>
      <p className="form-note">
        Higher-profile options with similar monochrome branding
      </p>
      <p>
        The Mobbin Dad Hat is built from bio-washed chino twill, which gives it
        that soft, unstructured crown. The Mob Armor Snapback offers a
        structured crown and a more rigid visor.
      </p>
      {cards.map((c) => (
        <article className="assistant-answer-card" key={c.id}>
          <img src={`/api/reference-media/${c.id}`} alt={c.title} />
          <div>
            <p>{c.seller}</p>
            <strong>{c.title}</strong>
            <p>{c.price}</p>
            <ul>
              {c.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
      <p>
        Do you prefer this relaxed “dad hat” fit, or are you looking for
        something more structured?
      </p>
      <div className="assistant-preferences">
        {["Relaxed dad hat", "Structured snapback", "Show Mobbin gear"].map(
          (c) => (
            <button
              className="pill"
              key={c}
              aria-pressed={choice === c}
              onClick={() => {
                setChoice(c);
                setBoundary(true);
              }}
            >
              {c}
            </button>
          ),
        )}
      </div>
      <form
        className="assistant-composer"
        onSubmit={(e) => {
          e.preventDefault();
          setBoundary(true);
        }}
      >
        <input
          placeholder="Ask a follow-up"
          aria-label="Ask a follow-up"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <Link href="/search" aria-label="Close assistant">
          <Icon name="close" />
        </Link>
      </form>
      <Sheet
        open={boundary}
        title="Assistant is not connected"
        onClose={() => setBoundary(false)}
      >
        <p>
          Your selection stays local. No photo or message was sent; this is the
          captured example answer.
        </p>
      </Sheet>
    </ShopSurface>
  );
}
