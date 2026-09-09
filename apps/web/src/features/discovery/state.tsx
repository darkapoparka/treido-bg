"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
export type Collection = {
  id: string;
  name: string;
  visibility: "Private" | "Public";
  productIds: string[];
};
type CartLine = { productId: string; variantId: string; quantity: number };
type State = {
  reportedProducts: string[];
  reportProduct: (id: string) => void;
  saved: string[];
  viewedProducts: string[];
  viewProduct: (id: string) => void;
  visitedMinis: string[];
  visitMini: (id: string) => void;
  followed: string[];
  cart: CartLine[];
  collections: Collection[];
  toggleSaved: (id: string) => void;
  toggleFollow: (id: string) => void;
  add: (line: CartLine) => void;
  remove: (id: string, variantId: string) => void;
  setQuantity: (id: string, variantId: string, quantity: number) => void;
  saveForLater: (id: string, variantId: string) => void;
  createCollection: (name: string, productIds?: string[]) => string;
  updateCollection: (id: string, value: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
};
const Context = createContext<State | null>(null);
export function DiscoveryProvider({ children }: { children: ReactNode }) {
  // Frozen Home017 already contains these prior visits; subsequent visits use the same state.
  const [viewedProducts, setViewedProducts] = useState<string[]>([
    "cleo",
    "round-sunglasses",
    "u-see-me",
  ]);
  const viewProduct = useCallback(
    (id: string) =>
      setViewedProducts((v) => [id, ...v.filter((x) => x !== id)].slice(0, 12)),
    [],
  );
  const [visitedMinis, setVisitedMinis] = useState<string[]>([]);
  const [reportedProducts, setReportedProducts] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>(["shea-butter", "rice-bundle"]);
  const [followed, setFollowed] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const toggle = (values: string[], id: string) =>
    values.includes(id) ? values.filter((v) => v !== id) : [...values, id];
  return (
    <Context
      value={{
        reportedProducts,
        reportProduct: (id) =>
          setReportedProducts((v) => (v.includes(id) ? v : [...v, id])),
        saved,
        viewedProducts,
        viewProduct,
        visitedMinis,
        visitMini: (id) =>
          setVisitedMinis((v) => [id, ...v.filter((x) => x !== id)]),
        followed,
        cart,
        collections,
        toggleSaved: (id) => setSaved((v) => toggle(v, id)),
        toggleFollow: (id) => setFollowed((v) => toggle(v, id)),
        add: (line) =>
          setCart((v) => [
            ...v.filter(
              (x) =>
                x.productId !== line.productId ||
                x.variantId !== line.variantId,
            ),
            line,
          ]),
        remove: (id, variantId) =>
          setCart((v) =>
            v.filter((x) => x.productId !== id || x.variantId !== variantId),
          ),
        setQuantity: (id, variantId, quantity) =>
          setCart((v) =>
            v.map((x) =>
              x.productId === id && x.variantId === variantId
                ? { ...x, quantity: Math.max(1, Math.floor(quantity)) }
                : x,
            ),
          ),
        saveForLater: (id, variantId) => {
          setSaved((v) => (v.includes(id) ? v : [...v, id]));
          setCart((v) =>
            v.filter((x) => x.productId !== id || x.variantId !== variantId),
          );
        },
        createCollection: (name, productIds = []) => {
          const id = crypto.randomUUID();
          setCollections((v) => [
            ...v,
            { id, name, visibility: "Private", productIds },
          ]);
          return id;
        },
        updateCollection: (id, value) =>
          setCollections((v) =>
            v.map((c) => (c.id === id ? { ...c, ...value, id } : c)),
          ),
        deleteCollection: (id) =>
          setCollections((v) => v.filter((c) => c.id !== id)),
      }}
    >
      {children}
    </Context>
  );
}
export function useDiscovery() {
  const state = useContext(Context);
  if (!state) throw new Error("DiscoveryProvider is missing");
  return state;
}
