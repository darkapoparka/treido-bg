import type { AccountSeed, Profile, ReferenceOrder } from "../../account/state";
import type { DiscoverySeed } from "../../discovery/state";
import {
  shopSourceAddress,
  shopSourcePayment,
} from "../../commerce/source-fixtures";

// Named, synthetic presentation inputs only. A scenario never represents a login,
// payment, provider response or permission grant. The server must gate selection.
export type ReferenceScenario = {
  account?: AccountSeed;
  discovery?: DiscoverySeed;
  catalog?: { unavailableVariants: readonly string[] };
};
const namedProfile: Partial<Profile> = { firstName: "Alex", lastName: "Smith" };
const completeProfile: Partial<Profile> = {
  ...namedProfile,
  phone: "+1 (650) 213-7552",
  gender: "Female",
  birthday: "1995-02-18",
  shoeSize: "8.5",
  shirtSize: "L",
  pantsSize: "L",
  avatar: "/api/reference-media/auth-reference-avatar",
};
const sourceCard = {
  id: "card-source-4263",
  last4: shopSourcePayment.last4,
  expiry: "••/••",
};
const bagLine = {
  productId: "shampoo-bag",
  variantId: "shampoo-bag-default",
  quantity: 1,
};
const sourceOrder: ReferenceOrder = {
  id: "REF-1001",
  productId: "shampoo-bag",
  name: "Shampoo Bar Bag",
  carrier: "Amazon Logistics",
  tracking: "TBA333200762603",
  status: "In transit",
  archived: false,
  rating: 0,
  review: "",
};
const manualOrder: ReferenceOrder = {
  id: "REF-manual-shirt",
  productId: "",
  name: "Loose Fit Printed T-Shirt",
  carrier: "DHL eCommerce",
  tracking: "68448512123",
  status: "Ordered",
  archived: false,
  rating: 0,
  review: "",
};
const emptyDiscovery: DiscoverySeed = {
  saved: [],
  collections: [],
  viewedProducts: [],
  viewedItems: [],
  followed: [],
  visitedMinis: [],
  cart: [],
  later: [],
  recentActivity: null,
};
const savedPair = ["shea-butter", "rice-bundle"];
const favs = {
  id: "source-favs",
  name: "Favs",
  visibility: "Private" as const,
  productIds: ["rice-bundle", "shea-butter"],
};
const editedFavs = {
  ...favs,
  name: "Favs💕",
  productIds: ["argan-liquid-combo", ...favs.productIds],
};
const preferenceProfile: Partial<Profile> = {
  ...namedProfile,
  gender: "Female",
  birthday: "1995-02-18",
};
const sizedProfile: Partial<Profile> = {
  ...preferenceProfile,
  shoeSize: "8.5",
  shirtSize: "L",
  pantsSize: "L",
};
const skinPreferences = {
  skinType: ["Combination", "With redness", "Sensitive"],
  undertone: ["Pink/Yellow"],
  tone: ["Fair skin"],
};
const skinHairPreferences = {
  ...skinPreferences,
  hairType: ["Normal"],
  hairColor: ["Black"],
};
const profileOrders: ReferenceOrder[] = [
  { ...manualOrder, status: "In transit" },
  { ...sourceOrder, status: "Ordered" },
];
const profileActivity: DiscoverySeed = {
  saved: ["argan-liquid-combo", "shea-butter", "rice-bundle"],
  followed: ["kitsch", "pura"],
  viewedProducts: ["shampoo-bag", "shea-butter", "rice-bundle"],
  viewedItems: [
    { kind: "store", id: "kitsch" },
    { kind: "product", id: "shampoo-bag", promotion: "$15 off order" },
    { kind: "product", id: "shea-butter", promotion: "$15 off order" },
    { kind: "product", id: "rice-bundle", promotion: "$15 off order" },
  ],
};
export const referenceScenarios = {
  "profile-details": {
    account: { profile: { ...completeProfile, avatar: "" } },
  },
  "profile-gender": {
    account: { profile: { ...namedProfile, gender: "Female" } },
  },
  "profile-preferences-base": { account: { profile: preferenceProfile } },
  "profile-shoe-selected": {
    account: { profile: { ...preferenceProfile, shoeSize: "8.5" } },
  },
  "profile-preference-sizes": { account: { profile: sizedProfile } },
  "profile-skin": {
    account: { profile: sizedProfile, preferences: skinPreferences },
  },
  "profile-skin-hair": {
    account: { profile: sizedProfile, preferences: skinHairPreferences },
  },
  "profile-minis": {
    account: { profile: completeProfile, orders: profileOrders },
    discovery: {
      ...profileActivity,
      recentActivity: "minis",
      visitedMinis: ["gift", "look", "skin"],
    },
  },
  "home-welcome": { discovery: emptyDiscovery },
  "profile-named": { account: { profile: namedProfile } },
  "profile-complete": {
    account: { profile: completeProfile, orders: profileOrders },
    discovery: {
      ...profileActivity,
      recentActivity: "minis",
      visitedMinis: ["gift", "look", "skin"],
    },
  },
  "profile-before-payment": {
    account: {
      profile: completeProfile,
      paymentCards: [],
      hasPaymentProfile: false,
      orders: profileOrders,
    },
    discovery: { ...profileActivity, saved: [] },
  },
  "profile-deletion": {
    account: {
      profile: { ...namedProfile, email: "alexsmith.mobbin+2@gmail.com" },
    },
  },
  "saved-empty": { discovery: { ...emptyDiscovery } },
  "saved-pair": { discovery: { ...emptyDiscovery, saved: savedPair } },
  "saved-collection": {
    account: { profile: namedProfile },
    discovery: { ...emptyDiscovery, saved: savedPair, collections: [favs] },
  },
  "saved-collection-edited": {
    account: { profile: namedProfile },
    discovery: {
      ...emptyDiscovery,
      saved: editedFavs.productIds,
      collections: [editedFavs],
    },
  },
  "profile-public": {
    account: { profile: completeProfile },
    discovery: {
      ...emptyDiscovery,
      saved: savedPair,
      collections: [
        {
          ...editedFavs,
          productIds: ["rice-bundle", "argan-liquid-combo", "shea-butter"],
          visibility: "Public" as const,
        },
      ],
    },
  },
  "following-empty": { discovery: { ...emptyDiscovery } },
  "following-pair": {
    discovery: { ...emptyDiscovery, followed: ["kitsch", "pura"] },
  },
  "cart-bag": {
    account: { profile: completeProfile },
    discovery: { ...emptyDiscovery, cart: [bagLine] },
  },
  "cart-later": {
    catalog: { unavailableVariants: ["shampoo-bag-default"] },
    account: { profile: completeProfile },
    discovery: { ...emptyDiscovery, later: [bagLine] },
  },
  checkout: {
    account: {
      profile: completeProfile,
      addresses: [{ ...shopSourceAddress, id: "address-source-alex" }],
      paymentCards: [sourceCard],
      orders: [sourceOrder],
    },
    discovery: { ...emptyDiscovery, cart: [bagLine] },
  },
  "orders-empty": { account: { orders: [] }, discovery: emptyDiscovery },
  "orders-waiting": {
    account: {
      profile: completeProfile,
      orders: [{ ...sourceOrder, status: "Ordered" }],
    },
  },
  "orders-transit": {
    account: { profile: completeProfile, orders: [sourceOrder] },
  },
  "orders-delivered": {
    account: {
      profile: completeProfile,
      orders: [{ ...sourceOrder, status: "Delivered" }],
    },
  },
  "orders-archived": {
    account: {
      profile: completeProfile,
      orders: [{ ...sourceOrder, archived: true }],
    },
  },
  "orders-manual": {
    account: { profile: completeProfile, orders: [sourceOrder, manualOrder] },
  },
  "orders-manual-delivered": {
    account: {
      profile: completeProfile,
      orders: [sourceOrder, { ...manualOrder, status: "Delivered" }],
    },
  },
  "onboarding-new": {
    account: {
      orders: [],
      paymentCards: [],
      addresses: [],
      hasPaymentProfile: false,
    },
    discovery: emptyDiscovery,
  },
  "returning-home": {
    account: { profile: completeProfile, orders: [sourceOrder] },
    discovery: emptyDiscovery,
  },
} satisfies Record<string, ReferenceScenario>;

export type ReferenceScenarioName = keyof typeof referenceScenarios;
export const referenceScenarioCookie = "shop-reference-scenario";
export function resolveReferenceScenario(
  name: string | undefined,
): ReferenceScenario | undefined {
  return name && Object.hasOwn(referenceScenarios, name)
    ? referenceScenarios[name as ReferenceScenarioName]
    : undefined;
}
