import type { CSSProperties } from "react";
const paths = {
  lock: "M6 10h12v11H6zM8 10V6a4 4 0 0 1 8 0v4",
  "badge-check":
    "m12 2 3 2 4 1 1 4 2 3-2 3-1 4-4 1-3 2-3-2-4-1-1-4-2-3 2-3 1-4 4-1ZM8 12l3 3 5-6",
  "eye-off":
    "m3 3 18 18M10 5c5-1 9 4 11 7-1 2-2 3-4 4M6 6C4 8 2 10 1 12c3 5 7 8 13 6M9 9a4 4 0 0 0 6 6",
  "thumb-up": "M7 10H3v11h4V10Zm0 10h11l3-10h-8l1-6-2-2-5 8",
  "thumb-down": "M7 14H3V3h4v11Zm0-10h11l3 10h-8l1 6-2 2-5-8",
  edit: "M4 16 16 4l4 4L8 20H4zM14 6l4 4",
  mic: "M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8",
  camera: "M3 7h4l2-3h6l2 3h4v14H3ZM16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  gift: "M3 8h18v5H3zM5 13v8h14v-8M12 8v13M12 8S4 7 6 3s6 5 6 5 8-1 6-5-6 5-6 5",
  reset: "M4 4v6h6M4 10a8 8 0 1 1 0 6",
  home: "M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  explore: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  orders: "M3 8h18v13H3zM8 8V5a4 4 0 0 1 8 0v3",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  back: "m15 4-8 8 8 8",
  close: "m6 6 12 12M6 18 18 6",
  arrow: "M4 12h16m-7-7 7 7-7 7",
  share: "M12 15V2m-5 5 5-5 5 5M6 10H3v11h18V10h-3",
  plus: "M12 4v16M4 12h16",
  minus: "M4 12h16",
  filter: "M3 6h18M3 18h18M8 3v6M16 15v6",
  menu: "M3 5h18M3 12h18M3 19h18",
  bell: "M5 17h14l-2-4V9A5 5 0 0 0 7 9v4ZM10 21h4",
  tag: "M3 3h8l10 10-8 8L3 11ZM7 7h.01",
  check: "m4 12 5 5L20 6",
  more: "M4 12h.01M12 12h.01M20 12h.01",
  cart: "M2 3h3l3 13h11l3-10H6M9 21h.01M18 21h.01",
  star: "m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z",
} as const;
export type IconName = keyof typeof paths;
export function Icon({
  name,
  filled = false,
  style,
}: {
  name: IconName;
  filled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={style}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
