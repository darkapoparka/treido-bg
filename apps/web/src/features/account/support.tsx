"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Catalog } from "../catalog/types";
import { AccountIcon } from "./icons";
import { Sheet } from "../discovery/components";
import { AccountPage, Boundary, CodeInput } from "./forms";
export function SupportPage() {
  return (
    <AccountPage title="Support">
      <div className="support-links">
        <Link href="https://help.shop.app/en/shop">
          <AccountIcon name="person" />
          <div>
            Help Center
            <small>
              Learn more about your account, Shop Pay, or order tracking
            </small>
          </div>
        </Link>
        <Link href="/support/chat">
          <AccountIcon name="help" />
          <div>
            Support Chat
            <small>Ask questions, and get support from our AI assistant</small>
          </div>
        </Link>
        <Link href="/about">
          <AccountIcon name="info" />
          <div>
            About
            <small>
              Learn more about Shop, read our privacy policy, and terms and
              conditions
            </small>
          </div>
        </Link>
      </div>
    </AccountPage>
  );
}
export function HelpPage() {
  return (
    <AccountPage title="Help Center">
      <div className="help-topics">
        {[
          [
            "Tracking an order",
            "Visit Orders to view a reference delivery timeline and edit a local tracking entry.",
            "/orders",
          ],
          [
            "Managing your account",
            "Update your reference name, address and shopping preferences.",
            "/account",
          ],
          [
            "Payments and refunds",
            "Payments are not connected in this preview. No purchase or refund can be submitted.",
            "/account/payments",
          ],
        ].map(([title, copy, href]) => (
          <details key={title}>
            <summary>{title}</summary>
            <p>{copy}</p>
            <Link href={href}>View {title.toLowerCase()} ›</Link>
          </details>
        ))}
      </div>
    </AccountPage>
  );
}
export function SupportChat() {
  const [draft, setDraft] = useState("");
  const [attempt, setAttempt] = useState("");
  const [example, setExample] = useState(false);
  return (
    <AccountPage dock={false}>
      <div className="chat-title">
        <Link href="/support" aria-label="Close support">
          ×
        </Link>
        <h2>Support</h2>
      </div>
      <div className="support-conversation">
        <p className="form-note centered">
          You can close this conversation at any time and return to it from your
          account
        </p>
        <p className="chat-bubble">
          Hi, I’m your AI support assistant, what can I help you with today?
        </p>
        {attempt && (
          <>
            <p className="chat-bubble user">{attempt}</p>
            {example ? (
              <>
                <div className="chat-bubble">
                  <p>
                    Yes, it is possible to cancel an order and request a refund,
                    but these actions are typically handled by the store where
                    you made the purchase. The Shop app helps you track your
                    orders, but the store is responsible for processing
                    cancellations and refunds.
                  </p>
                  <p>
                    To proceed, you should contact the store directly to request
                    a cancellation or refund. You can usually find contact
                    options for the store within the Shop app once you locate
                    your order.
                  </p>
                  <p>
                    If you need to check the status of your order or find your
                    order details, you can do so in the Orders tab of the Shop
                    app.
                  </p>
                </div>
                <Link className="pill" href="/orders">
                  Go to orders ›
                </Link>
              </>
            ) : (
              <>
                <p role="status" className="form-error">
                  Support is not connected. Your message was not sent.
                </p>
                <button
                  className="form-cancel"
                  onClick={() => {
                    setExample(true);
                    setAttempt(
                      "Is it possible to cancel an order and request a refund?",
                    );
                  }}
                >
                  View captured example conversation
                </button>
              </>
            )}
          </>
        )}
      </div>
      <form
        className="support-composer"
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) {
            setExample(false);
            setAttempt(draft);
            setDraft("");
          }
        }}
      >
        <textarea
          aria-label="Message support"
          placeholder="Ask a question"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={2000}
        />
        <button
          className="primary"
          aria-label="Send message"
          disabled={!draft.trim()}
        >
          ↑
        </button>
      </form>
    </AccountPage>
  );
}
export function AboutPage() {
  const [document, setDocument] = useState("");
  return (
    <AccountPage className="source-about">
      <div className="about-mark">shop</div>
      <p className="centered">
        Pay better. Track better.
        <br />
        Shop Better.
        <br />
        <a href="https://shop.app">shop.app</a>
      </p>
      <div className="about-links">
        {["Terms and conditions", "Privacy policy", "Licenses"].map(
          (label, i) => (
            <button
              className="account-row"
              key={label}
              onClick={() =>
                label === "Licenses"
                  ? setDocument(label)
                  : window.open(
                      label === "Privacy policy"
                        ? "https://www.shopify.com/legal/privacy/consumers"
                        : "https://shop.app/terms-of-service?locale=en-US",
                      "_blank",
                      "noopener,noreferrer",
                    )
              }
            >
              <span>
                {["▤", "♙", "▧"][i]}　{label}
              </span>
              <span>›</span>
            </button>
          ),
        )}
      </div>
      <div className="about-social">
        <a href="https://twitter.com/shop" aria-label="Shop on Twitter">
          𝕏
        </a>
        <a href="https://www.instagram.com/shop" aria-label="Shop on Instagram">
          ◎
        </a>
      </div>
      <p className="about-legal">
        By using Shop, you agree to the
        <br />
        <button onClick={() => setDocument("Terms and conditions")}>
          Terms and conditions
        </button>{" "}
        and{" "}
        <button onClick={() => setDocument("Privacy policy")}>
          Privacy policy
        </button>
        .
      </p>
      <small className="about-version">VERSION 2.266.0-RELEASE.377556</small>
      <Sheet open={!!document} title={document} onClose={() => setDocument("")}>
        <p>The source capture does not include the app’s license list.</p>
        <button className="form-cancel" onClick={() => setDocument("")}>
          Close
        </button>
      </Sheet>
    </AccountPage>
  );
}
export function NotificationsPage() {
  return (
    <AccountPage title="Notifications">
      <div className="notification-empty">
        <h2>Nothing to see yet</h2>
        <p>You’ll get updates on your account and shopping activity here.</p>
        <Link className="primary notification-shopping" href="/">
          Start shopping
        </Link>
      </div>
    </AccountPage>
  );
}
export function LoginPage() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const screen = params.get("screen") ?? "email";
  const step =
    screen === "track" || screen === "passkey"
      ? screen
      : screen.endsWith("code")
        ? "code"
        : "email";
  const setStep = (next: string) =>
    router.push(`/login?screen=${next === "code" ? "phone-code" : next}`, {
      scroll: false,
    });
  const [code, setCode] = useState("");
  const [boundary, setBoundary] = useState(false);
  const emailCode = screen === "email-code";
  const setEmailCode = (next: boolean) =>
    router.push(`/login?screen=${next ? "email-code" : "phone-code"}`, {
      scroll: false,
    });
  if (step === "track")
    return (
      <AccountPage dock={false} className="returning-login">
        <Link className="onboarding-skip" href="/onboarding?step=tracking">
          Skip
        </Link>
        <h1>Let’s track your recent order</h1>
        <p>Select “Allow paste” to check for order information</p>
        <img src="/api/reference-media/onboarding-package" alt="" />
        <button
          className="primary form-submit"
          onClick={() => {
            setEmail("mira@example.test");
            setStep("code");
          }}
        >
          Track my order
        </button>
      </AccountPage>
    );
  if (step === "passkey")
    return (
      <AccountPage dock={false}>
        <Link className="auth-close" href="/login" aria-label="Close sign in">
          ×
        </Link>
        <div className="auth-content">
          <img
            className="auth-art"
            src="/api/reference-media/auth-passkey"
            alt=""
          />
          <h1>Sign in faster with a passkey</h1>
          <p>
            Fast and secure login. At millions of stores.
            <br />
            Across all your devices.
          </p>
          <button
            className="primary form-submit"
            onClick={() => setBoundary(true)}
          >
            Add passkey
          </button>
        </div>
        <Sheet
          open={boundary}
          title="Passkeys are not connected"
          onClose={() => setBoundary(false)}
        >
          <p>No passkey was created and no account was signed in.</p>
          <Link
            className="primary form-submit"
            href="/onboarding?step=tracking"
          >
            Continue in reference preview
          </Link>
        </Sheet>
      </AccountPage>
    );
  return (
    <AccountPage
      dock={false}
      className={`login-page ${step === "email" ? "auth-email" : "auth-code"}`}
    >
      <Link
        className="auth-close"
        href="/onboarding"
        aria-label="Close sign in"
      >
        ×
      </Link>
      <div className="auth-content">
        <img
          className={`auth-art ${step === "email" ? "auth-loop" : ""}`}
          src={`/api/reference-media/${step === "email" ? "auth-loop" : emailCode ? "auth-email-phone" : "auth-phone"}`}
          alt=""
        />
        <h1>
          {step === "email"
            ? "Sign in to Shop"
            : emailCode
              ? "Verify your email"
              : "Confirm it’s you"}
        </h1>
        <p>
          {step === "email" ? (
            "Or create an account"
          ) : (
            <>
              Enter code sent to
              <br />
              <strong>
                {emailCode ? email || "mira@example.test" : "+1 ••• ••• 0100"}
              </strong>
            </>
          )}
        </p>
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "email")
              router.push("/login?screen=email-code", { scroll: false });
            else setBoundary(true);
          }}
        >
          {step === "email" ? (
            <>
              <input
                className="auth-email-input"
                aria-label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
              <button className="primary auth-continue">Continue</button>
            </>
          ) : (
            <CodeInput
              value={code}
              onChange={(value) => {
                setCode(value);
                if (value.length === 6) setBoundary(true);
              }}
              label="Verification code"
            />
          )}
        </form>
        {step === "code" &&
          (emailCode ? (
            <button
              className="auth-change"
              onClick={() => {
                setStep("email");
                setCode("");
              }}
            >
              Change email address
            </button>
          ) : (
            <div className="auth-phone-alternatives">
              <p>
                Didn’t receive a code?{" "}
                <button onClick={() => setBoundary(true)}>Resend</button>, or
                try another option ↓
              </p>
              <button onClick={() => setEmailCode(true)}>
                Email me code instead
              </button>
              <button
                onClick={() => {
                  setStep("email");
                  setCode("");
                }}
              >
                Use a different account
              </button>
            </div>
          ))}
        {step === "email" && (
          <p className="auth-terms">
            By continuing, you agree to the{" "}
            <Link href="https://shop.app/terms-of-service">terms</Link> and
            acknowledge the{" "}
            <Link href="https://www.shopify.com/legal/privacy/consumers">
              privacy policy
            </Link>
            .
          </p>
        )}
      </div>
      <Sheet
        open={boundary}
        title="Authentication is not connected"
        onClose={() => setBoundary(false)}
      >
        <p>No code was sent and no account was signed in.</p>
        <Link className="form-cancel" href="/login?screen=passkey">
          Preview passkey screen
        </Link>
        <Link
          className="primary form-submit"
          href="/onboarding?step=preferences"
        >
          Continue in reference preview
        </Link>
        <button className="form-cancel" onClick={() => setBoundary(false)}>
          Back
        </button>
      </Sheet>
    </AccountPage>
  );
}

export function OnboardingPage({
  initialStep = 0,
}: {
  catalog: Catalog;
  initialStep?: number;
}) {
  const params = useSearchParams();
  const step = initialStep;
  const setStep = (next: number) =>
    router.push(
      `/onboarding?step=${["intro", "preferences", "tracking", "updates"][next]}`,
      { scroll: false },
    );
  const router = useRouter();
  const [choice, setChoice] = useState("");
  const [permission, setPermission] = useState(false);
  if (params.get("step") === "discover")
    return (
      <AccountPage dock={false} className="source-intro discover-intro">
        <small className="intro-powered">
          Powered by{" "}
          <b>
            <svg aria-hidden="true" viewBox="0 0 20 22">
              <path
                fill="currentColor"
                d="M4 5 15 3l3 17-16 1ZM7 5C7-1 13-1 13 4h-2c0-4-3-3-3 1Z"
              />
              <text x="6" y="16" fill="white" fontSize="11" fontStyle="italic">
                S
              </text>
            </svg>
            shopify
          </b>
        </small>
        <div className="discover-art">
          {[
            ["hat", 46, 174, 105, 122],
            ["basket", 177, 129, 78, 64],
            ["calculator", 320, 149, 47, 51],
            ["watering", 328, 247, 65, 113],
            ["ball", 102, 452, 92, 91],
            ["chair", 6, 446, 51, 79],
            ["candle", 234, 509, 53, 66],
            ["lipstick", 314, 409, 51, 92],
            ["clock", 0, 276, 63, 90],
          ].map(([id, x, y, w, h]) => (
            <img
              key={id}
              src={`/api/reference-media/discover-${id}`}
              alt=""
              style={{
                left: Number(x),
                top: Number(y),
                width: Number(w),
                height: Number(h),
              }}
            />
          ))}
        </div>
        <h1>
          Discover your next
          <br />
          favorite brand
        </h1>
        <div className="intro-actions">
          <Link
            className="primary form-submit"
            href="/login"
            aria-label="Continue to sign in"
          >
            <img
              className="discover-loading-mark"
              src="/api/reference-media/auth-loop"
              alt=""
            />
          </Link>
          <p>
            By proceeding to use Shop, you agree to our
            <br />
            <Link href="/about">terms of service</Link> and{" "}
            <Link href="/about">privacy policy</Link>.
          </p>
        </div>
      </AccountPage>
    );
  if (step === 0)
    return (
      <AccountPage dock={false} className="source-intro">
        <small className="intro-powered">
          Powered by{" "}
          <b>
            <svg aria-hidden="true" viewBox="0 0 20 22">
              <path
                fill="currentColor"
                d="M4 5 15 3l3 17-16 1ZM7 5C7-1 13-1 13 4h-2c0-4-3-3-3 1Z"
              />
              <text x="6" y="16" fill="white" fontSize="11" fontStyle="italic">
                S
              </text>
            </svg>
            shopify
          </b>
        </small>
        <div className="intro-objects">
          {[
            ["chair", 180, 143, 51, 82],
            ["clock", 278, 214, 80, 81],
            ["ball", 58, 247, 93, 92],
            ["candle", 0, 334, 38, 64],
            ["hat", 330, 357, 63, 102],
            ["lipstick", 0, 465, 81, 69],
            ["watering", 84, 532, 127, 115],
            ["basket", 308, 509, 76, 68],
            ["calculator", 246, 606, 49, 52],
          ].map(([name, x, y, w, h]) => (
            <img
              key={name}
              src={`/api/reference-media/intro-${name}`}
              alt=""
              style={{
                left: `${(Number(x) / 393) * 100}%`,
                top: Number(y) - 59,
                width: Number(w),
                height: Number(h),
              }}
            />
          ))}
        </div>
        <h1>
          <img
            src="/api/reference-media/shop-wordmark"
            alt="Shop"
            width="123"
            height="51"
          />
        </h1>
        <div className="intro-actions">
          <Link
            className="primary form-submit"
            href={
              params.get("journey") === "new"
                ? "/onboarding?step=discover"
                : "/login?screen=track"
            }
          >
            Get Started
          </Link>
          <p>
            By proceeding to use Shop, you agree to our
            <br />
            <Link href="/about">terms of service</Link> and{" "}
            <Link href="/about">privacy policy</Link>.
          </p>
        </div>
      </AccountPage>
    );
  return (
    <AccountPage dock={false}>
      <div className={`onboarding-page onboarding-step-${step}`}>
        <button
          className="onboarding-skip"
          onClick={() => (step < 3 ? setStep(step + 1) : router.push("/"))}
        >
          Skip
        </button>
        {step === 0 && <small>Powered by Shopify</small>}
        {step === 1 && (
          <div className="preference-onboarding-art">
            {[
              ["bottle", 0, 107, 51, 111],
              ["vest", 60, 83, 85, 110],
              ["woman", 155, 18, 85, 111],
              ["game", 249, 69, 84, 110],
              ["lotion", 343, 116, 50, 110],
              ["robe", 0, 227, 51, 110],
              ["camera", 60, 204, 85, 110],
              ["man", 155, 139, 85, 110],
              ["coat", 249, 190, 84, 110],
              ["shoe", 155, 259, 85, 110],
              ["bear", 343, 242, 50, 97],
            ].map(([name, x, y, w, h]) => (
              <img
                key={name}
                src={`/api/reference-media/preference-${name}`}
                alt=""
                style={{
                  left: `${(Number(x) / 393) * 100}%`,
                  top: Number(y) - 59,
                  width: Number(w),
                  height: Number(h),
                }}
              />
            ))}
          </div>
        )}
        <h1>
          {step === 0
            ? "shop"
            : step === 1
              ? "What are you shopping for?"
              : step === 2
                ? "Track all of your orders in one place"
                : "Follow your order every step of the way"}
        </h1>
        {step > 0 && step < 3 && (
          <p>
            {step === 1
              ? "We’ll show you brands and products that match your style and interests"
              : step === 2
                ? "Connect the email you use for online shopping to track your orders with Shop."
                : "Get updates about your orders."}
          </p>
        )}
        {step === 1 && (
          <div className="onboarding-choices">
            {["Men’s", "Women’s", "Everything"].map((c) => (
              <button
                className="pill"
                key={c}
                aria-pressed={choice === c}
                onClick={() => setChoice(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="tracking-onboarding-art" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <img
                key={i}
                src={`/api/reference-media/${i === 0 ? "onboarding-shoe" : "onboarding-package"}`}
                alt=""
              />
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="tracking-onboarding-card">
            <img
              className="tracking-shoe"
              src="/api/reference-media/onboarding-shoe"
              alt=""
            />
            <span>
              <small>Online store</small>
              <strong>Delivered</strong>
              <i />
              <small>Delivered 2 hours ago</small>
            </span>
            <img
              className="tracking-parcel"
              src="/api/reference-media/onboarding-delivered-parcel"
              alt=""
            />
          </div>
        )}
        <div className="onboarding-actions">
          {step === 0 ? (
            <>
              <Link className="primary form-submit" href="/login">
                Get Started
              </Link>
              <button className="form-cancel" onClick={() => setStep(1)}>
                Explore the preview
              </button>
            </>
          ) : step === 1 ? (
            <button
              className="primary form-submit"
              disabled={!choice}
              onClick={() => setStep(2)}
            >
              Next
            </button>
          ) : step === 2 ? (
            <>
              <Link className="primary form-submit" href="/account/connections">
                <span className="google-mark" aria-hidden="true">
                  G
                </span>{" "}
                Connect Google
              </Link>
              <small>
                We’ll only use shopping-related emails for order tracking.
              </small>
            </>
          ) : (
            <>
              <button
                className="primary form-submit"
                onClick={() => setPermission(true)}
              >
                Get tracking updates
              </button>
              <small>
                We will also send you updates with information about your
                orders, special offers, and more.
              </small>
            </>
          )}
        </div>
      </div>
      <Boundary
        open={permission}
        onClose={() => setPermission(false)}
        kind="Notifications"
      />
    </AccountPage>
  );
}
