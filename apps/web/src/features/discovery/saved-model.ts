export type Collection = {
  id: string;
  name: string;
  visibility: "Private" | "Public";
  productIds: string[];
};

export type SavedCollectionsState = {
  saved: string[];
  collections: Collection[];
};

export type SavedCollectionsAction =
  | { type: "toggle-saved"; productId: string }
  | { type: "create-collection"; collection: Collection }
  | {
      type: "update-collection";
      id: string;
      value: Partial<Omit<Collection, "id">>;
    }
  | { type: "delete-collection"; id: string };

const unique = (ids: readonly string[]) => Array.from(new Set(ids));

// One local reference-state transition owns Saved and collection membership.
// Adding from More ideas or a product's collection picker must also save the
// item. Removing a membership does not unsave it; deleting a collection keeps
// its products in Saved, as the existing deletion UI promises. No persistence
// or authenticated account mutation is implied by this fixture reducer.
export function savedCollectionsReducer(
  state: SavedCollectionsState,
  action: SavedCollectionsAction,
): SavedCollectionsState {
  switch (action.type) {
    case "toggle-saved": {
      const id = action.productId;
      if (!state.saved.includes(id))
        return { ...state, saved: [...state.saved, id] };
      return {
        saved: state.saved.filter((productId) => productId !== id),
        collections: state.collections.map((collection) =>
          collection.productIds.includes(id)
            ? {
                ...collection,
                productIds: collection.productIds.filter(
                  (productId) => productId !== id,
                ),
              }
            : collection,
        ),
      };
    }
    case "create-collection": {
      if (state.collections.some((c) => c.id === action.collection.id))
        return state;
      const collection = {
        ...action.collection,
        productIds: unique(action.collection.productIds),
      };
      return {
        saved: unique([...state.saved, ...collection.productIds]),
        collections: [...state.collections, collection],
      };
    }
    case "update-collection": {
      const existing = state.collections.find((c) => c.id === action.id);
      if (!existing) return state;
      const collection: Collection = {
        ...existing,
        ...action.value,
        id: existing.id,
        productIds: unique(action.value.productIds ?? existing.productIds),
      };
      return {
        saved: unique([...state.saved, ...collection.productIds]),
        collections: state.collections.map((c) =>
          c.id === action.id ? collection : c,
        ),
      };
    }
    case "delete-collection": {
      const existing = state.collections.find((c) => c.id === action.id);
      if (!existing) return state;
      return {
        saved: unique([...state.saved, ...existing.productIds]),
        collections: state.collections.filter((c) => c.id !== action.id),
      };
    }
  }
}
