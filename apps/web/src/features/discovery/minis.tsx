"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Catalog } from "../catalog/types";
import { FloatingNav, IconButton, ProductCard, Sheet } from "./components";
import { Icon } from "./icons";
import { useDiscovery } from "./state";
import { useAccount } from "../account/state";
const minis = [
  {
    id: "sol",
    name: "Sol: Browse by Voice",
    description: "Your AI shopping companion you can talk to.",
  },
  {
    id: "skin",
    name: "Skincare AI",
    description: "Analyze your skin instantly with advanced AI.",
  },
  {
    id: "look",
    name: "Get the Look",
    description: "Find every piece from any outfit",
  },
  {
    id: "gift",
    name: "Gift Sense",
    description: "A new way to find the perfect gift",
  },
];
export function Minis() {
  const state = useDiscovery();
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [unavailable, setUnavailable] = useState("");
  const lists = [
    [
      {
        id: "sol",
        name: "Sol: Browse by Voice",
        description: "Your AI shopping companion you can talk to.",
      },
      {
        id: "room",
        name: "Get that room",
        description: "Snap your inspiration, and discover items direc…",
      },
      {
        id: "color",
        name: "Infinite Color Search",
        description: "Shop your favorite color. Powered by Hoppn.",
      },
    ],
    [
      {
        id: "gift",
        name: "Gift Sense",
        description: "A new way to find the perfect gift",
      },
      {
        id: "look",
        name: "Get the Look",
        description: "Find every piece from any outfit",
      },
    ],
  ];
  const row = (m: { id: string; name: string; description: string }) => {
    const content = (
      <>
        <img src={`/api/reference-media/mini-${m.id}-icon`} alt="" />
        <span>
          <strong>{m.name}</strong>
          <p>{m.description}</p>
        </span>
      </>
    );
    return minis.some((item) => item.id === m.id) ? (
      <Link
        key={m.id}
        href={`/minis/${m.id}`}
        onClick={() => state.visitMini(m.id)}
      >
        {content}
      </Link>
    ) : (
      <button key={m.id} onClick={() => setUnavailable(m.name)}>
        {content}
      </button>
    );
  };
  return (
    <main className="shop-page minis-page">
      <header className="section-heading">
        <h1>Minis</h1>
        <IconButton
          icon="search"
          label="Search Minis"
          onClick={() => setSearching(true)}
        />
      </header>
      <div className="mini-carousel">
        {minis.map((m) => (
          <Link
            className="mini-feature"
            key={m.id}
            href={`/minis/${m.id}`}
            onClick={() => state.visitMini(m.id)}
          >
            <img src={`/api/reference-media/mini-${m.id}-hero`} alt="" />
            <div>
              <img src={`/api/reference-media/mini-${m.id}-icon`} alt="" />
              <span>
                <strong>{m.name}</strong>
                <p>{m.description}</p>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {state.visitedMinis.length > 0 && (
        <>
          <h2>Recently viewed</h2>
          <div className="mini-recent">
            {state.visitedMinis.map((id) => (
              <Link key={id} href={`/minis/${id}`}>
                <img
                  src={`/api/reference-media/mini-${id}-icon`}
                  alt={minis.find((m) => m.id === id)?.name}
                />
              </Link>
            ))}
          </div>
        </>
      )}
      <h2>Snap & Shop</h2>
      <div className="mini-list-pages">
        {lists.map((list, i) => (
          <div className="mini-list" key={i}>
            {list.map(row)}
          </div>
        ))}
      </div>
      <h2>Design Your Space</h2>
      <div className="mini-list">
        {row({
          id: "decor",
          name: "Help Me Decor",
          description: "AI-powered interior styling Shop Mini that help…",
        })}
        <button onClick={() => setUnavailable("Homescape AI")}>
          <img src="/api/reference-media/mini-homescape-icon" alt="" />
          <span>
            <strong>Homescape AI</strong>
            <p>Home décor ideas with arts, plants & renovation</p>
          </span>
        </button>
      </div>
      <Sheet
        open={searching}
        title="Search Minis"
        initialFocus="#mini-search"
        onClose={() => setSearching(false)}
      >
        <input
          id="mini-search"
          className="mini-search"
          aria-label="Search Minis"
          placeholder="Search Minis"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mini-list">
          {minis
            .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
            .map(row)}
        </div>
      </Sheet>
      <Sheet
        open={!!unavailable}
        title={unavailable}
        onClose={() => setUnavailable("")}
      >
        <p className="sheet-copy">
          This Mini has no captured detail flow and is unavailable in this
          reference preview.
        </p>
      </Sheet>
      <FloatingNav back />
    </main>
  );
}
function MiniShell({ name, children }: { name: string; children: ReactNode }) {
  return (
    <main className="mini-shell">
      <header>
        <Link href="/minis" aria-label="Back to Minis">
          <Icon name="back" />
        </Link>
        <span>{name}⌄</span>
        <Link href="/minis" aria-label={`Close ${name}`}>
          <Icon name="close" />
        </Link>
      </header>
      {children}
    </main>
  );
}
function MiniAccess({
  open,
  onClose,
  onContinue,
  name,
}: {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  name: string;
}) {
  const account = useAccount();
  const [information, setInformation] = useState("");
  return (
    <>
      <Sheet
        open={open}
        title="Continue"
        headerless
        className="mini-access"
        onClose={onClose}
      >
        <div className="mini-access-heading">
          <h2>Continue</h2>
          <div>
            <img
              src={`/api/reference-media/mini-${name === "Gift Sense" ? "gift" : "sol"}-icon`}
              alt=""
            />
            <span>{account.profile.firstName[0]}</span>
          </div>
        </div>
        <p>
          By continuing to use this Mini, you agree to the{" "}
          <button onClick={() => setInformation("Terms")}>terms</button> and{" "}
          <button onClick={() => setInformation("Privacy policy")}>
            privacy policy
          </button>{" "}
          of 9.8.
        </p>
        <p>
          By Agreeing, {name} will be able to access your profile and update
          your saved products.{" "}
          <button onClick={() => setInformation("Mini access")}>
            Learn more
          </button>
        </p>
        <button className="mini-agree" onClick={onContinue}>
          Agree
        </button>
        <button className="mini-without" onClick={onContinue}>
          Continue without access
        </button>
      </Sheet>
      <Sheet
        open={!!information}
        title={information}
        onClose={() => setInformation("")}
      >
        <p className="sheet-copy">
          This local preview does not share your profile or saved products with
          a Mini. External terms and privacy services are not connected.
        </p>
      </Sheet>
    </>
  );
}
export function Sol() {
  const [access, setAccess] = useState(true),
    [setup, setSetup] = useState(true),
    [stage, setStage] = useState(0),
    [text, setText] = useState(""),
    [muted, setMuted] = useState(false),
    [typing, setTyping] = useState(false),
    [boundary, setBoundary] = useState("");
  return (
    <MiniShell name="Sol: Browse by Voice">
      {setup ? (
        <section className="sol-welcome">
          <img
            className="sol-welcome-art"
            src="/api/reference-media/sol-welcome-art"
            alt=""
          />
          {["lower-left", "lower-right"].map((position) => (
            <img
              key={position}
              className={`sol-decoration sol-decoration-${position}`}
              src={`/api/reference-media/sol-welcome-${position}`}
              alt=""
            />
          ))}
          <h1>Hi, I’m Sol</h1>
          <p>
            Shop with your voice. Just tell
            <br />
            Sol what you’re looking for.
          </p>
          <div>
            <h2>
              Sol needs microphone access
              <br />
              to hear you speak.
            </h2>
            <button onClick={() => setBoundary("Microphone access")}>
              Allow & Continue ›
            </button>
          </div>
        </section>
      ) : (
        <section
          className={`sol-surface ${stage === 2 ? "sol-choice-stage" : ""}`}
        >
          <img
            className="sol-mark"
            src="/api/reference-media/sol-flower"
            alt="Sol"
          />
          <div className="sol-conversation">
            <h1>
              {stage === 0
                ? "Hey, I am Sol. What are we hunting for today?"
                : stage === 1
                  ? "Nice, sunglasses are a fun pick."
                  : stage === 3
                    ? "Pick the pair that feels more you, then we will line up more in that vibe."
                    : stage === 4
                      ? "Nice choice, let’s lean into that style and pull a few similar options."
                      : stage === 5
                        ? "A soft golden hue, rimless design and clear lenses—find what feels the easiest to wear every day."
                        : "Tap your pick and we will build from it."}
            </h1>
            {stage === 1 && (
              <button className="sol-next" onClick={() => setStage(3)}>
                View captured choices
              </button>
            )}
            {(stage === 3 || stage === 4 || stage === 5) && (
              <div className="sol-picks">
                {(stage === 3
                  ? ["sol-glasses-model", "sol-glasses-dark"]
                  : ["sol-glasses-model"]
                ).map((id) => (
                  <button
                    key={id}
                    onClick={() => setStage(stage === 3 ? 4 : 5)}
                  >
                    <img
                      src={`/api/reference-media/${id}`}
                      alt={
                        id === "sol-glasses-model"
                          ? "Gold rimless glasses"
                          : "Dark sunglasses"
                      }
                    />
                    {stage === 5 && (
                      <span>
                        U SEE ME GLASSES
                        <br />
                        $14.99
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
            {stage === 2 && (
              <>
                <p>Tap one</p>
                <div className="sol-picks">
                  {["sol-tan-cap", "sol-boston-cap"].map((id) => (
                    <button key={id} onClick={() => setBoundary("Your pick")}>
                      <img
                        src={`/api/reference-media/${id}`}
                        alt={
                          id === "sol-tan-cap"
                            ? "Tan embroidered cap"
                            : "Boston baseball cap"
                        }
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <form
            className={`sol-controls ${typing ? "sol-typing" : ""} ${muted ? "sol-muted" : ""}`}
            onSubmit={(e) => {
              e.preventDefault();
              if (/cap|hat/i.test(text)) setStage(2);
              else if (/sunglass/i.test(text)) setStage(1);
              else if (text.trim()) setBoundary("Recorded responses");
              setText("");
            }}
          >
            {typing ? (
              <>
                <input
                  placeholder="Tap to type..."
                  aria-label="Message Sol"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  className="icon-button"
                  type="submit"
                  aria-label="Send local message"
                >
                  <Icon name="arrow" />
                </button>
              </>
            ) : (
              <IconButton
                icon="edit"
                label="Type instead"
                onClick={() => setTyping(true)}
              />
            )}
            <IconButton
              icon="mic"
              label={
                muted ? "Unmute microphone preview" : "Mute microphone preview"
              }
              pressed={muted}
              onClick={() => setMuted(!muted)}
            />
          </form>
        </section>
      )}
      <MiniAccess
        open={access}
        name="Sol: Browse by Voice"
        onClose={() => setAccess(false)}
        onContinue={() => setAccess(false)}
      />
      <Sheet open={!!boundary} title={boundary} onClose={() => setBoundary("")}>
        <p className="sheet-copy">
          This local reference preview does not connect to Sol or send
          microphone audio. Captured text examples include sunglasses and
          baseball caps.
        </p>
        <button
          className="primary form-submit"
          onClick={() => {
            setSetup(false);
            setTyping(true);
            setBoundary("");
          }}
        >
          Continue with text
        </button>
      </Sheet>
    </MiniShell>
  );
}
export function Skin({ catalog }: { catalog: Catalog }) {
  const [stage, setStage] = useState(0);
  const [upload, setUpload] = useState(false);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [localImage, setLocalImage] = useState("");
  return (
    <MiniShell name="Skincare AI">
      <section className={`skin-surface ${stage === 2 ? "skin-results" : ""}`}>
        {stage < 2 ? (
          <>
            <div className="skin-heading">
              <img src="/api/reference-media/skin-symbol" alt="" />
              <h1>
                AI Powered
                <br />
                Skincare
              </h1>
            </div>
            <button
              className="skin-analyze"
              onClick={() => setCameraAccess(true)}
            >
              <Icon name="camera" />
              {stage === 1 ? "AI is analyzing..." : "Analyze My Skin"}
            </button>
            <p>
              Please upload a clear photo of your
              <br />
              face to get better results.
            </p>
            <small>
              AI may make mistakes. Please review recommendations carefully.
            </small>
          </>
        ) : (
          <>
            <h1>Skincare AI</h1>
            <p className="form-note">
              Recorded sample result · no skin analysis was performed
            </p>
            <section className="skin-summary">
              <h2>Overall Skin Summary</h2>
              <p>
                Your skin appears well-hydrated, smooth, and radiant with an
                even tone, indicating excellent overall health.
              </p>
            </section>
            <section className="skin-summary">
              <h2>Recommended Products</h2>
              <p>
                The recorded example recommends a gentle hydrating cleanser and
                moisturizer.
              </p>
            </section>
            <h2>Cleanser</h2>
            <div className="product-grid">
              {catalog.products
                .filter((p) => p.category === "Cleanser")
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
            <button className="pill" onClick={() => setStage(0)}>
              Start again
            </button>
          </>
        )}
      </section>
      <Sheet
        open={cameraAccess}
        title="Allow access to your camera?"
        onClose={() => setCameraAccess(false)}
      >
        <p>
          No camera access is requested by this preview. Choose a photo locally
          or view the captured example.
        </p>
        <div className="editor-actions">
          <button
            className="form-cancel"
            onClick={() => setCameraAccess(false)}
          >
            Cancel
          </button>
          <button
            className="primary"
            onClick={() => {
              setCameraAccess(false);
              setUpload(true);
            }}
          >
            Share
          </button>
        </div>
      </Sheet>
      <Sheet
        open={upload}
        title="Choose a photo"
        onClose={() => setUpload(false)}
      >
        <p className="form-note">
          Use the captured reference result. No photo is uploaded or analyzed.
        </p>
        <button
          className="account-row"
          onClick={() => {
            setUpload(false);
            setStage(1);
            window.setTimeout(() => setStage(2), 800);
          }}
        >
          View reference example
        </button>
        {localImage && (
          <div>
            <img
              src={localImage}
              alt="Selected local image"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
            <p className="form-note">
              Image selected locally. Image recognition is not connected.
            </p>
          </div>
        )}
        <label className="account-row">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setLocalImage(URL.createObjectURL(file));
            }}
          />
        </label>
      </Sheet>
    </MiniShell>
  );
}
export function GetLook({ catalog }: { catalog: Catalog }) {
  const [stage, setStage] = useState(0);
  const [selection, setSelection] = useState("Women’s White Linen Blazer");
  const [choose, setChoose] = useState(false);
  const [localImage, setLocalImage] = useState("");
  return (
    <MiniShell name="Get the Look">
      <section className="look-surface">
        <div className="look-wordmark">
          <img src="/api/reference-media/look-wordmark" alt="Get the Look" />
        </div>
        {stage === 0 ? (
          <>
            <h1>
              Find every piece
              <br />
              from any outfit
            </h1>
            <p>
              Upload an outfit photo and discover
              <br />
              matching pieces from Shopify stores
            </p>
            <button className="look-upload" onClick={() => setChoose(true)}>
              <Icon name="camera" />
              Choose Photo
            </button>
          </>
        ) : stage === 2 ? (
          <>
            <div className="look-photo">
              <img
                src="/api/reference-media/look-outfit-inner"
                alt="Captured outfit"
              />
            </div>
            <p>Scanning outfit…</p>
            <button className="look-upload" onClick={() => setStage(1)}>
              View captured matches
            </button>
          </>
        ) : (
          <>
            <div className="look-photo">
              <img
                src="/api/reference-media/look-outfit-inner"
                alt="Reference outfit: white blazer, black shirt and patterned skirt"
              />
              {[
                "Women’s White Linen Blazer",
                "Women’s Black Crew Neck T-shirt",
                "Women’s Black and White Gingham Mini Skirt",
                "Women’s Gold Embellished Sandals",
              ].map((s, i) => (
                <button
                  key={s}
                  style={{ top: `${32 + i * 15}%` }}
                  aria-pressed={selection === s}
                  onClick={() => setSelection(s)}
                >
                  <span />
                  {s}
                </button>
              ))}
            </div>
            <h2>{selection}</h2>
            <div className="product-rail" data-look-selection={selection}>
              {catalog.products
                .filter((p) =>
                  selection.includes("Blazer")
                    ? ["look-sculpt", "look-aven"].includes(p.id)
                    : selection.includes("T-shirt")
                      ? ["look-black-crew", "look-white-crew"].includes(p.id)
                      : false,
                )
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
            {!selection.includes("Blazer") &&
              !selection.includes("T-shirt") && (
                <p className="form-note">
                  No product cards for this item were visible in the captured
                  example.
                </p>
              )}
            <button className="pill" onClick={() => setStage(0)}>
              Choose another photo
            </button>
          </>
        )}
      </section>
      <Sheet
        open={choose}
        title="Choose Photo"
        onClose={() => setChoose(false)}
      >
        <p className="form-note">
          Reference outfit only. No photo recognition service is connected.
        </p>
        <button
          className="account-row"
          onClick={() => {
            setStage(2);
            setChoose(false);
          }}
        >
          Use reference outfit
        </button>
        {localImage && (
          <div>
            <img
              src={localImage}
              alt="Selected local image"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
            <p className="form-note">
              Image selected locally. Image recognition is not connected.
            </p>
          </div>
        )}
        <label className="account-row">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setLocalImage(URL.createObjectURL(file));
            }}
          />
        </label>
      </Sheet>
    </MiniShell>
  );
}
const traits = [
  "Adventurous",
  "Creative",
  "Thoughtful",
  "Practical",
  "Stylish",
  "Tech-Savvy",
  "Outdoorsy",
  "Homebody",
  "Funny",
  "Outgoing",
];
export function GiftSense({ catalog }: { catalog: Catalog }) {
  const state = useDiscovery();
  const [step, setStep] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [access, setAccess] = useState(false);
  const products = catalog.products.filter((p) => p.category === "Gifts");
  return (
    <MiniShell name="Gift Sense">
      <section className="gift-surface">
        <div className="gift-progress">
          <Icon name="gift" />
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} className={i < step * 2 ? "active" : ""} />
            ))}
          </div>
          <IconButton
            icon="reset"
            label="Restart gift questions"
            onClick={() => {
              setStep(0);
              setSaved(false);
              setRecipient("");
              setSelected([]);
              setBudget("");
              setNotes("");
            }}
          />
        </div>
        <div className="gift-conversation">
          {step === 0 ? (
            <>
              <div className="gift-message">
                Welcome to Gift Sense, your smart guide to finding gifts that
                truly fit.
                <br />
                <br />
                Tell us about the person, answer a few questions, and discover
                gifts tailored perfectly to who they are.
              </div>
              <button className="gift-action" onClick={() => setStep(1)}>
                Let’s Begin ✧
              </button>
            </>
          ) : step === 1 ? (
            <>
              <div className="gift-message">
                Let’s start simple, who are you buying a gift for?
              </div>
              <p>Choose one or type your own.</p>
              <div className="gift-options">
                {["Partner", "Family", "Friend", "Colleague", "Child"].map(
                  (r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRecipient(r);
                        setStep(2);
                      }}
                    >
                      {r}
                    </button>
                  ),
                )}
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="gift-answer">{recipient}</div>
              <div className="gift-message">
                How would you describe their personality?
              </div>
              <p>
                <em>Select all that sound like them.</em>
              </p>
              <div className="gift-options">
                {traits.map((t) => (
                  <button
                    aria-pressed={selected.includes(t)}
                    key={t}
                    onClick={() =>
                      setSelected((v) =>
                        v.includes(t) ? v.filter((x) => x !== t) : [...v, t],
                      )
                    }
                  >
                    <span className="radio-outline" />
                    {t}
                  </button>
                ))}
              </div>
              <button className="gift-action" onClick={() => setStep(3)}>
                {selected.length ? "Continue" : "Skip"}
              </button>
            </>
          ) : step === 3 ? (
            <>
              <div className="gift-message">
                What’s your budget for this gift?
              </div>
              <p>Choose the range that fits.</p>
              <div className="gift-options">
                {[
                  "Under $25",
                  "Under $50",
                  "Under $100",
                  "Under $200",
                  "$200+",
                  "Any Budget",
                ].map((b) => (
                  <button
                    aria-pressed={budget === b}
                    key={b}
                    onClick={() => {
                      setBudget(b);
                      setStep(4);
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </>
          ) : step === 4 ? (
            <>
              <div className="gift-answer">{budget}</div>
              <div className="gift-message">
                Anything else that might help us find the perfect gift?
              </div>
              <p>Optional, type any extra details.</p>
              <textarea
                aria-label="Optional gift notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button className="gift-action" onClick={() => setAccess(true)}>
                {notes ? "Continue" : "Skip"}
              </button>
            </>
          ) : step === 6 ? (
            <div className="gift-message">
              Finding gifts that match your answers…
              <button className="gift-action" onClick={() => setStep(5)}>
                View captured gift ideas
              </button>
            </div>
          ) : (
            <>
              <div className="gift-message">
                Here’s a thoughtful mix inspired by creativity and outdoor fun,
                picked to balance those interests and offer comfort and
                inspiration.
              </div>
              <div className="gift-results">
                {products.map((p) => (
                  <article className="gift-result-row" key={p.id}>
                    <Link href={`/products/${p.id}`}>
                      <img src={p.images[0]} alt={p.title} />
                      <span>
                        {p.title}
                        <strong>${(p.price.amount / 100).toFixed(2)}</strong>
                      </span>
                    </Link>
                    <button
                      aria-label={`Save ${p.title}`}
                      onClick={() => state.toggleSaved(p.id)}
                    >
                      <Icon name="heart" />
                    </button>
                  </article>
                ))}
              </div>
              <div className="gift-result-actions">
                <button onClick={() => setAccess(true)}>
                  Show Similar Gifts
                </button>
                <button
                  onClick={() => {
                    if (saved) return;
                    state.createCollection(
                      "Gift ideas",
                      products.map((p) => p.id),
                    );
                    setSaved(true);
                  }}
                >
                  {saved ? "Saved as Collection" : "Save as Collection"}
                </button>
              </div>
              <button className="gift-action" onClick={() => setStep(1)}>
                Show Me Different Ideas
              </button>
            </>
          )}
        </div>
        <form
          className="gift-composer"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 1 && notes) {
              setRecipient(notes);
              setNotes("");
              setStep(2);
            } else if (step === 4) setAccess(true);
          }}
        >
          <input
            disabled={![1, 4].includes(step)}
            placeholder={
              [1, 4].includes(step)
                ? "Type your answer..."
                : "Please select an option above."
            }
            value={[1, 4].includes(step) ? notes : ""}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            className="icon-button"
            type="submit"
            aria-label="Continue gift questions"
            disabled={![1, 4].includes(step)}
          >
            <Icon name="arrow" />
          </button>
        </form>
        <MiniAccess
          open={access}
          name="Gift Sense"
          onClose={() => setAccess(false)}
          onContinue={() => {
            setAccess(false);
            setStep(6);
          }}
        />
      </section>
    </MiniShell>
  );
}
