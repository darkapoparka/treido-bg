"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useAccount } from "../account/state";
import { Sheet } from "./components";
import { ShopSurface } from "./hydration-boundary";
import { Icon } from "./icons";

export function MiniShell({
  name,
  children,
  showBack = true,
  onBack,
  onMenu,
}: {
  name: string;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
}) {
  return (
    <ShopSurface className="mini-shell">
      <header>
        {showBack ? (
          onBack ? (
            <button aria-label="Go back in Mini" onClick={onBack}>
              <Icon name="back" />
            </button>
          ) : (
            <Link href="/minis" aria-label="Back to Minis">
              <Icon name="back" />
            </Link>
          )
        ) : (
          <span aria-hidden="true" />
        )}
        {onMenu ? (
          <button aria-label="Sol preview controls" onClick={onMenu}>
            {name}⌄
          </button>
        ) : (
          <span>{name}⌄</span>
        )}
        <Link href="/minis" aria-label={`Close ${name}`}>
          <Icon name="close" />
        </Link>
      </header>
      {children}
    </ShopSurface>
  );
}

export function MiniAccess({
  open,
  onClose,
  onContinue,
  name,
  previewNote,
}: {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  name: string;
  previewNote?: string;
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
          <h2 aria-hidden="true">Continue</h2>
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
        {previewNote && <p role="note">{previewNote}</p>}
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
