"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AccountPage } from "./forms";
import { AccountIcon } from "./icons";
import { Icon } from "../discovery/icons";
import { Sheet } from "../discovery/components";

const capturedQuestion =
  "Is it possible to cancel an order and request a refund?";
const capturedReply = [
  "Yes, it is possible to cancel an order and request a refund, but these actions are typically handled by the store where you made the purchase. The Shop app helps you track your orders, but the store is responsible for processing cancellations and refunds.",
  "To proceed, you should contact the store directly to request a cancellation or refund. You can usually find contact options for the store within the Shop app once you locate your order.",
  "If you need to check the status of your order or find your order details, you can do so in the Orders tab of the Shop app.",
];
type ReplyState = "idle" | "thinking" | "captured" | "unavailable";

// This opt-in reference surface replays only the frozen example. Arbitrary
// questions never claim to contact support or receive a live model response.
export function SupportChat() {
  const [draft, setDraft] = useState("");
  const [attempt, setAttempt] = useState("");
  const [phase, setPhase] = useState<ReplyState>("idle");
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const conversation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (phase !== "thinking") return;
    const timer = window.setTimeout(() => setPhase("captured"), 1400);
    return () => window.clearTimeout(timer);
  }, [phase]);
  useEffect(() => {
    const pane = conversation.current;
    if (pane) pane.scrollTop = pane.scrollHeight;
  }, [phase, attempt]);
  const reset = () => {
    setDraft("");
    setAttempt("");
    setPhase("idle");
  };
  const playExample = () => {
    setAttempt(capturedQuestion);
    setDraft("");
    setPhase("thinking");
  };
  const text = [attempt, ...(phase === "captured" ? capturedReply : [])].filter(
    Boolean,
  );
  return (
    <AccountPage dock={false} className="support-chat-page">
      <header className="support-chat-heading">
        <Link
          className="icon-button"
          href="/support"
          aria-label="Close support"
        >
          <Icon name="close" />
        </Link>
        <h1>Support</h1>
      </header>
      <div
        ref={conversation}
        className="support-chat-scroll"
        aria-label="Support conversation"
      >
        <div className="support-chat-messages">
          <p className="support-chat-notice">
            You can close this conversation at any time and return to it from
            your account
          </p>
          <p className="support-message">
            Hi, I’m your AI support assistant, what can I help you with today?
          </p>
          {attempt && (
            <p
              className={
                "support-message user" +
                (phase === "thinking" ? " pending" : "")
              }
            >
              {attempt}
            </p>
          )}
          {phase === "thinking" && (
            <div
              className="support-typing"
              role="status"
              aria-label="Preparing captured reply"
            >
              <i />
              <i />
              <i />
            </div>
          )}
          {phase === "captured" && (
            <>
              <div
                className="support-message response"
                aria-label="Captured example response"
              >
                {capturedReply.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link className="support-orders-link" href="/orders">
                <span>
                  <AccountIcon name="document" />
                </span>
                Go to orders <Icon name="chevron" />
              </Link>
            </>
          )}
          {phase === "unavailable" && (
            <div className="support-unavailable">
              <p role="status">
                Support is not connected. Your message was not sent.
              </p>
              <button className="form-cancel" onClick={playExample}>
                View captured example conversation
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        className="support-search-fab icon-button"
        aria-label="Search conversation"
        onClick={() => setSearching(true)}
      >
        <Icon name="search" />
      </button>
      <form
        className="support-chat-composer"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          const message = draft.trim();
          setAttempt(message);
          setDraft("");
          setPhase(
            message.toLowerCase() === capturedQuestion.toLowerCase()
              ? "thinking"
              : "unavailable",
          );
        }}
      >
        <textarea
          rows={1}
          aria-label="Message support"
          placeholder="Ask anything..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={2000}
        />
        {phase === "thinking" ? (
          <button
            type="button"
            className="support-stop"
            aria-label="Stop response"
            onClick={() => setPhase("idle")}
          >
            <span />
          </button>
        ) : draft.trim() ? (
          <button
            type="submit"
            className="support-send"
            aria-label="Send message"
          >
            ↑
          </button>
        ) : (
          <button
            type="button"
            className="support-reset"
            aria-label="Start a new conversation"
            onClick={reset}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 4 2 8l4 4M2 8h14a4 4 0 0 1 4 4M18 20l4-4-4-4m4 4H8a4 4 0 0 1-4-4" />
            </svg>
          </button>
        )}
      </form>
      <Sheet
        open={searching}
        title="Search conversation"
        onClose={() => setSearching(false)}
      >
        <label className="form-field">
          Search
          <input
            aria-label="Search messages"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="support-search-results">
          {text
            .filter((p) => p.toLowerCase().includes(query.toLowerCase()))
            .map((p) => (
              <p key={p}>{p}</p>
            ))}
          {query &&
            !text.some((p) =>
              p.toLowerCase().includes(query.toLowerCase()),
            ) && <p>No matching messages</p>}
        </div>
      </Sheet>
    </AccountPage>
  );
}
