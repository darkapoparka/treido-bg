const paths = {
  help: "M12 3a8 8 0 0 0-8 8v6l-2 4 5-2a8 8 0 1 0 5-16Zm-2 5a2 2 0 1 1 3 2c-1 1-1 1-1 3m0 3h.01",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 7v7m0-10h.01",
  location:
    "M12 22S4 14 4 9a8 8 0 1 1 16 0c0 5-8 13-8 13Zm0-16a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  shield: "M12 2 3 6v7c0 5 9 9 9 9s9-4 9-9V6ZM8 12l3 3 5-6",
  link: "m10 7 3-3a5 5 0 0 1 7 7l-3 3M14 17l-3 3a5 5 0 0 1-7-7l3-3M8 16l8-8",
  lock: "M5 10h14v12H5ZM8 10V6a4 4 0 0 1 8 0v4",
  bell: "M5 17h14l-2-4V9A5 5 0 0 0 7 9v4ZM10 21h4",
  person: "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 22v-3a8 8 0 0 1 16 0v3",
  document: "M5 2h10l4 4v16H5ZM14 2v5h5M8 12h8M8 16h8",
} as const;
export function AccountIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      className="account-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
