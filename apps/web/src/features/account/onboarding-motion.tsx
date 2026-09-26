"use client";
/* eslint-disable @next/next/no-img-element -- Inherited decorative artwork. */
import { useEffect, useState, type CSSProperties } from "react";
import { DecorativeVideo } from "../discovery/decorative-video";

const headlines = [
  null,
  <>
    Track your orders
    <br />
    every step of the way
  </>,
  <>
    Discover your next
    <br />
    favorite brand
  </>,
  <>
    Supercharge your
    <br />
    online shopping
  </>,
];

export type IntroPhase = 0 | 1 | 2 | 3;

export function IntroHeadline({
  motion,
  onPhaseChange,
}: {
  motion: boolean;
  onPhaseChange?: (phase: IntroPhase) => void;
}) {
  const [index, setIndex] = useState<IntroPhase>(0);
  useEffect(() => {
    const restart = setTimeout(() => {
      setIndex(0);
      onPhaseChange?.(0);
    }, 0);
    if (!motion) return () => clearTimeout(restart);
    // The current Shop app changes both copy and object composition together.
    const durations = [1000, 1000, 1000, 1000];
    let current: IntroPhase = 0;
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      current = ((current + 1) % headlines.length) as IntroPhase;
      setIndex(current);
      onPhaseChange?.(current);
      timer = setTimeout(advance, durations[current]);
    };
    timer = setTimeout(advance, durations[0]);
    return () => {
      clearTimeout(restart);
      clearTimeout(timer);
    };
  }, [motion, onPhaseChange]);
  const visible = motion ? index : 0;
  return (
    <h1
      className={visible ? "intro-cycle-copy" : undefined}
      data-intro-headline={visible}
    >
      {visible ? (
        <span key={visible}>{headlines[visible]}</span>
      ) : (
        <img
          src="/api/reference-media/shop-wordmark"
          alt="Shop"
          width="123"
          height="51"
        />
      )}
    </h1>
  );
}

const trackingStages = [
  ["Order placed", "Standard delivery", "onboarding-order-parcel", "0%"],
  ["In transit", "ETA: Monday Sep 1", "onboarding-transit-plane", "25%"],
  ["Out for delivery", "Between 2-3 pm", "onboarding-delivery-vehicle", "55%"],
  ["Delivered", "Delivered 2 hours ago", "onboarding-delivered-parcel", "100%"],
] as const;

export function TrackingIllustration({ motion }: { motion: boolean }) {
  const [index, setIndex] = useState(0);
  const [title, caption, art, progress] = trackingStages[motion ? index : 3];
  return (
    <div
      className="tracking-onboarding-card"
      data-motion={motion}
      data-tracking-demo={title}
    >
      <img
        className="tracking-shoe"
        src="/api/reference-media/onboarding-shoe"
        alt=""
      />
      <span>
        <small>Online store</small>
        <strong>{title}</strong>
        <i style={{ "--tracking-progress": progress } as CSSProperties} />
        <small>{caption}</small>
      </span>
      <img
        key={art}
        className="tracking-parcel"
        src={`/api/reference-media/${art}`}
        alt=""
      />
      <DecorativeVideo
        enabled={motion}
        clips={[
          { key: "onboarding-status-motion", className: "tracking-art-video" },
        ]}
        onTimeChange={(seconds) =>
          setIndex(
            seconds >= 7.25 ? 3 : seconds >= 5 ? 2 : seconds >= 3 ? 1 : 0,
          )
        }
      />
    </div>
  );
}
