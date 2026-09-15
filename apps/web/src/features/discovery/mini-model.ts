// Captured Mini identities shared by discovery and recently viewed surfaces.
export const miniCatalog = {
  sol: {
    name: "Sol: Browse by Voice",
    description: "Your AI shopping companion you can talk to.",
    available: true,
  },
  skin: {
    name: "Skincare AI",
    description: "Analyze your skin instantly with advanced AI. Detect vi…",
    available: true,
  },
  look: {
    name: "Get the Look",
    description: "Find every piece from any outfit",
    available: true,
  },
  gift: {
    name: "Gift Sense",
    description: "A new way to find the perfect gift",
    available: true,
  },
  room: {
    name: "Get that room",
    description: "Snap your inspiration, and discover items direc…",
    available: false,
  },
  color: {
    name: "Infinite Color Search",
    description: "Shop your favorite color. Powered by Hoppn.",
    available: false,
  },
  decor: {
    name: "Help Me Decor",
    description: "AI-powered interior styling Shop Mini that help…",
    available: false,
  },
  homescape: {
    name: "Homescape AI",
    description: "Home décor ideas with arts, plants & renovation",
    available: false,
  },
} as const;
export type MiniId = keyof typeof miniCatalog;
export const featuredMiniIds = ["sol", "skin", "look", "gift"] as const;
export function findMini(id: string) {
  return Object.hasOwn(miniCatalog, id) ? miniCatalog[id as MiniId] : undefined;
}
export function miniHref(id: string): string {
  return findMini(id)?.available
    ? `/minis/${id}`
    : `/minis?notice=${encodeURIComponent(id)}`;
}
