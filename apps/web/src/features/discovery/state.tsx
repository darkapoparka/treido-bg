"use client";
import {
  createContext,
  useContext,
  useState,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import { savedCollectionsReducer, type Collection } from "./saved-model";
export type { Collection } from "./saved-model";
export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};
export type ViewedItem = {
  kind: "product" | "store";
  id: string;
  promotion?: string;
};
type State = {
  recentActivity: "products" | "stores" | "minis" | null;
  viewedItems: ViewedItem[];
  viewStore: (id: string) => void;
  removeViewed: (kind: ViewedItem["kind"], id: string) => void;
  reportedProducts: string[];
  reportProduct: (id: string) => void;
  saved: string[];
  viewedProducts: string[];
  viewProduct: (id: string) => void;
  visitedMinis: string[];
  visitMini: (id: string) => void;
  followed: string[];
  cart: CartLine[];
  later: CartLine[];
  moveToCart: (id: string, variantId: string, maximum?: number) => void;
  removeLater: (id: string, variantId: string) => void;
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
export type DiscoverySeed = Partial<
  Pick<
    State,
    | "recentActivity"
    | "viewedItems"
    | "viewedProducts"
    | "visitedMinis"
    | "reportedProducts"
    | "saved"
    | "collections"
    | "followed"
    | "cart"
    | "later"
  >
>;
const Context = createContext<State | null>(null);
export function DiscoveryProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: DiscoverySeed;
}) {
  const [recentActivity, setRecentActivity] = useState<
    "products" | "stores" | "minis" | null
  >(initial?.recentActivity ?? null);
  // Frozen Home017 already contains these prior visits; subsequent visits use the same state.
  const [viewedProducts, setViewedProducts] = useState<string[]>(
    () => initial?.viewedProducts ?? ["cleo", "round-sunglasses", "u-see-me"],
  );
  const [viewedItems, setViewedItems] = useState<ViewedItem[]>(
    () =>
      initial?.viewedItems ??
      ["cleo", "round-sunglasses", "u-see-me"].map((id) => ({
        kind: "product" as const,
        id,
      })),
  );
  const viewStore = useCallback((id: string) => {
    setRecentActivity("stores");
    setViewedItems((v) =>
      [
        { kind: "store" as const, id },
        ...v.filter((x) => x.kind !== "store" || x.id !== id),
      ].slice(0, 24),
    );
  }, []);
  const viewProduct = useCallback((id: string) => {
    setRecentActivity("products");
    setViewedProducts((v) => [id, ...v.filter((x) => x !== id)].slice(0, 12));
    setViewedItems((v) =>
      [
        { kind: "product" as const, id },
        ...v.filter((x) => x.kind !== "product" || x.id !== id),
      ].slice(0, 24),
    );
  }, []);
  const [visitedMinis, setVisitedMinis] = useState<string[]>(
    () => initial?.visitedMinis ?? [],
  );
  const [reportedProducts, setReportedProducts] = useState<string[]>(
    () => initial?.reportedProducts ?? [],
  );
  const [{ saved, collections }, dispatchSaved] = useReducer(
    savedCollectionsReducer,
    {
      saved: initial?.saved ?? ["shea-butter", "rice-bundle"],
      collections: initial?.collections ?? [],
    },
  );
  const [followed, setFollowed] = useState<string[]>(
    () => initial?.followed ?? [],
  );
  const [cart, setCart] = useState<CartLine[]>(() => initial?.cart ?? []);
  const [later, setLater] = useState<CartLine[]>(() => initial?.later ?? []);
  const toggle = (values: string[], id: string) =>
    values.includes(id) ? values.filter((v) => v !== id) : [...values, id];
  return (
    <Context
      value={{
        recentActivity,
        reportedProducts,
        reportProduct: (id) =>
          setReportedProducts((v) => (v.includes(id) ? v : [...v, id])),
        saved,
        viewedProducts,
        viewedItems,
        viewStore,
        removeViewed: (kind, id) => {
          setViewedItems((v) =>
            v.filter((x) => x.kind !== kind || x.id !== id),
          );
          if (kind === "product")
            setViewedProducts((v) => v.filter((x) => x !== id));
        },
        viewProduct,
        visitedMinis,
        visitMini: (id) => {
          setRecentActivity("minis");
          setVisitedMinis((v) => [id, ...v.filter((x) => x !== id)]);
        },
        followed,
        cart,
        later,
        removeLater: (id, variantId) =>
          setLater((v) =>
            v.filter((x) => x.productId !== id || x.variantId !== variantId),
          ),
        moveToCart: (id, variantId, maximum = 99) => {
          const line = later.find(
            (x) => x.productId === id && x.variantId === variantId,
          );
          if (!line) return;
          setCart((v) => {
            const existing = v.find(
              (x) => x.productId === id && x.variantId === variantId,
            );
            return [
              ...v.filter(
                (x) => x.productId !== id || x.variantId !== variantId,
              ),
              {
                ...line,
                quantity: Math.min(
                  maximum,
                  line.quantity + (existing?.quantity ?? 0),
                ),
              },
            ];
          });
          setLater((v) =>
            v.filter((x) => x.productId !== id || x.variantId !== variantId),
          );
        },
        collections,
        toggleSaved: (productId) =>
          dispatchSaved({ type: "toggle-saved", productId }),
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
          const line = cart.find(
            (x) => x.productId === id && x.variantId === variantId,
          );
          if (line)
            setLater((v) => [
              ...v.filter(
                (x) => x.productId !== id || x.variantId !== variantId,
              ),
              line,
            ]);
          setCart((v) =>
            v.filter((x) => x.productId !== id || x.variantId !== variantId),
          );
        },
        createCollection: (name, productIds = []) => {
          const id = crypto.randomUUID();
          dispatchSaved({
            type: "create-collection",
            collection: { id, name, visibility: "Private", productIds },
          });
          return id;
        },
        updateCollection: (id, value) =>
          dispatchSaved({ type: "update-collection", id, value }),
        deleteCollection: (id) =>
          dispatchSaved({ type: "delete-collection", id }),
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
