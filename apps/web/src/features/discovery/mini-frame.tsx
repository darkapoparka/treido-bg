"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, type ReactNode } from "react";
import { useAccount } from "../account/state";
import { AccountIcon } from "../account/icons";
import { Sheet } from "./components";
import { ShopSurface } from "./hydration-boundary";
import { Icon } from "./icons";
import { ContextualCloseLink } from "./return-navigation";

export function MiniShell({
  name,
  children,
  showBack = true,
  onBack,
  onMenu,
  menuLabel = "Sol preview controls",
  className = "",
}: {
  name: string;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  menuLabel?: string;
  className?: string;
}) {
  return (
    <ShopSurface className={`mini-shell ${className}`}>
      <header>
        {showBack ? (
          onBack ? (
            <button aria-label="Go back in Mini" onClick={onBack}>
              <Icon name="back" />
            </button>
          ) : (
            <ContextualCloseLink href="/minis" aria-label="Back to Minis">
              <Icon name="back" />
            </ContextualCloseLink>
          )
        ) : (
          <span aria-hidden="true" />
        )}
        {onMenu ? (
          <button
            className="mini-shell-title"
            aria-label={menuLabel}
            onClick={onMenu}
          >
            <span>{name}</span>
            <Icon name="chevron" />
          </button>
        ) : (
          <span className="mini-shell-title">
            <span>{name}</span>
            <Icon name="chevron" />
          </span>
        )}
        <ContextualCloseLink href="/minis" aria-label={`Close ${name}`}>
          <Icon name="close" />
        </ContextualCloseLink>
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
  accessDescription,
  profileImageSrc,
  profileImageRequiresName = false,
  previewNote,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  name: string;
  accessDescription?: string;
  profileImageSrc?: string;
  profileImageRequiresName?: boolean;
  previewNote?: string;
  className?: string;
}) {
  const account = useAccount();
  const [information, setInformation] = useState("");
  const firstName = account.profile.firstName.trim();
  const title =
    name === "Gift Sense"
      ? firstName
        ? `Continue as ${firstName}?`
        : "Continue to Gift Sense?"
      : "Continue";
  return (
    <>
      <Sheet
        open={open}
        title={title}
        headerless
        className={`mini-access ${className}`}
        onClose={onClose}
      >
        <div className="mini-access-heading">
          <h2 aria-hidden="true">{title}</h2>
          <div>
            <img
              src={`/api/reference-media/mini-${name === "Gift Sense" ? "gift" : "sol"}-icon`}
              alt=""
            />
            <span
              aria-label={firstName ? `${firstName}'s profile` : "Your profile"}
            >
              {profileImageSrc && (!profileImageRequiresName || firstName) ? (
                <img src={profileImageSrc} alt="" />
              ) : firstName ? (
                firstName[0]
              ) : (
                <AccountIcon name="person" />
              )}
            </span>
          </div>
        </div>
        {name !== "Gift Sense" && (
          <p>
            By continuing to use this Mini, you agree to the{" "}
            <button onClick={() => setInformation("Terms")}>terms</button> and{" "}
            <button onClick={() => setInformation("Privacy policy")}>
              privacy policy
            </button>{" "}
            of 9.8.
          </p>
        )}
        <p>
          {accessDescription ?? (
            <>
              By Agreeing, {name} will be able to access your profile and update
              your saved products.
            </>
          )}{" "}
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
