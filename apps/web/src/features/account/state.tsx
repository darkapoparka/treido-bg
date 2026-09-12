"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  apartment: string;
  company: string;
  phone: string;
  city: string;
  region: string;
  postalCode: string;
  isDefault: boolean;
};
export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
  shoeSize: string;
  shirtSize: string;
  pantsSize: string;
  skin: string;
  avatar: string;
};
export type Person = {
  id: string;
  name: string;
  relation: string;
  birthday: string;
  gender: string;
};
export type ReferenceOrder = {
  id: string;
  productId: string;
  name: string;
  carrier: string;
  tracking: string;
  status: "Ordered" | "In transit" | "Delivered";
  archived: boolean;
  rating: number;
  review: string;
};
const initialProfile: Profile = {
  firstName: "",
  lastName: "",
  email: "alexsmith.mobbin+3@gmail.com",
  phone: "",
  gender: "",
  birthday: "",
  shoeSize: "",
  shirtSize: "",
  pantsSize: "",
  skin: "",
  avatar: "",
};
const initialAddresses: Address[] = [
  {
    id: "address-source-alex",
    firstName: "Alex",
    lastName: "Smith",
    country: "United States",
    street: "1226 University Dr",
    apartment: "",
    company: "",
    phone: "+16502137552",
    city: "Menlo Park",
    region: "CA",
    postalCode: "94025",
    isDefault: true,
  },
  {
    id: "address-source-sam",
    firstName: "Sam",
    lastName: "Lee",
    country: "Singapore",
    street: "75 Ayer Rajah Crescent",
    apartment: "",
    company: "ASMOBBIN",
    phone: "",
    city: "Singapore",
    region: "SG",
    postalCode: "139953",
    isDefault: false,
  },
];
const initialOrders: ReferenceOrder[] = [
  {
    id: "REF-1001",
    productId: "shampoo-bag",
    name: "Shampoo Bar Bag",
    carrier: "Amazon Logistics",
    tracking: "TBA333200762603",
    status: "In transit",
    archived: false,
    rating: 0,
    review: "",
  },
  {
    id: "REF-1002",
    productId: "shea-butter",
    name: "Shea Butter Exfoliating Body Wash",
    carrier: "USPS",
    tracking: "REFERENCE-0200",
    status: "Delivered",
    archived: true,
    rating: 0,
    review: "",
  },
];
type AccountState = {
  profile: Profile;
  updateProfile: (value: Partial<Profile>) => void;
  addresses: Address[];
  saveAddress: (value: Address) => void;
  deleteAddress: (id: string) => void;
  orders: ReferenceOrder[];
  saveOrder: (value: ReferenceOrder) => void;
  people: Person[];
  savePerson: (person: Person) => void;
  deletePerson: (id: string) => void;
  preferences: Record<string, string[]>;
  setPreferences: (value: Record<string, string[]>) => void;
  paymentCards: { id: string; last4: string; expiry: string }[];
  paymentAvailable: boolean;
  receiptPreferences: Record<string, boolean>;
  setReceiptPreference: (id: string, enabled: boolean) => void;
  hasPaymentProfile: boolean;
  savePayment: (value: { id: string; last4: string; expiry: string }) => void;
  removePayment: (id?: string) => void;
  notifications: Record<string, boolean>;
  toggleNotification: (name: string) => void;
  reset: () => void;
};
export type AccountSeed = {
  hasPaymentProfile?: boolean;
  profile?: Partial<Profile>;
  addresses?: Address[];
  orders?: ReferenceOrder[];
  people?: Person[];
  preferences?: Record<string, string[]>;
  paymentCards?: { id: string; last4: string; expiry: string }[];
  notifications?: Record<string, boolean>;
};
const Context = createContext<AccountState | null>(null);
// Memory-only fixture state: no personal entries or payment fields are persisted.
export function AccountProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: AccountSeed;
}) {
  const [profile, setProfile] = useState<Profile>(() => ({
    ...initialProfile,
    ...initial?.profile,
  }));
  const [addresses, setAddresses] = useState<Address[]>(
    () => initial?.addresses ?? initialAddresses,
  );
  const [orders, setOrders] = useState<ReferenceOrder[]>(
    () => initial?.orders ?? initialOrders,
  );
  const [people, setPeople] = useState<Person[]>(() => initial?.people ?? []);
  const [preferences, setPreferences] = useState<Record<string, string[]>>(
    () => initial?.preferences ?? {},
  );
  const [paymentCards, setPaymentCards] = useState(
    () =>
      initial?.paymentCards ?? [
        {
          id: "card-source-4263",
          last4: "4263",
          expiry: "\u2022\u2022/\u2022\u2022",
        },
      ],
  );
  const [hasPaymentProfile, setHasPaymentProfile] = useState(
    initial?.hasPaymentProfile ?? true,
  );
  const [receiptPreferences, setReceiptPreferences] = useState<
    Record<string, boolean>
  >({});
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    () => initial?.notifications ?? {},
  );
  return (
    <Context
      value={{
        profile,
        updateProfile: (v) => setProfile((p) => ({ ...p, ...v })),
        addresses,
        saveAddress: (v) =>
          setAddresses((a) => [
            ...a
              .filter((x) => x.id !== v.id)
              .map((x) => (v.isDefault ? { ...x, isDefault: false } : x)),
            v,
          ]),
        deleteAddress: (id) =>
          setAddresses((a) => {
            const remaining = a.filter((x) => x.id !== id);
            return remaining.some((x) => x.isDefault)
              ? remaining
              : remaining.map((x, i) => ({ ...x, isDefault: i === 0 }));
          }),
        orders,
        saveOrder: (v) =>
          setOrders((a) => [...a.filter((x) => x.id !== v.id), v]),
        people,
        savePerson: (person) =>
          setPeople((p) => [...p.filter((x) => x.id !== person.id), person]),
        deletePerson: (id) => setPeople((p) => p.filter((x) => x.id !== id)),
        preferences,
        setPreferences,
        paymentCards,
        paymentAvailable: paymentCards.length > 0,
        receiptPreferences,
        setReceiptPreference: (id, enabled) =>
          setReceiptPreferences((previous) => ({ ...previous, [id]: enabled })),
        hasPaymentProfile,
        savePayment: (value) => {
          setHasPaymentProfile(true);
          setPaymentCards((cards) => [
            ...cards.filter((card) => card.id !== value.id),
            value,
          ]);
        },
        removePayment: (id) =>
          setPaymentCards((cards) =>
            cards.filter((card) => card.id !== (id ?? cards[0]?.id)),
          ),
        notifications,
        toggleNotification: (name) =>
          setNotifications((n) => ({ ...n, [name]: !(n[name] ?? true) })),
        reset: () => {
          setHasPaymentProfile(true);
          setProfile(initialProfile);
          setAddresses(initialAddresses);
          setOrders(initialOrders);
          setPeople([]);
          setPreferences({});
          setPaymentCards([
            {
              id: "card-source-4263",
              last4: "4263",
              expiry: "\u2022\u2022/\u2022\u2022",
            },
          ]);
          setNotifications({});
          setReceiptPreferences({});
        },
      }}
    >
      {children}
    </Context>
  );
}
export function useAccount() {
  const value = useContext(Context);
  if (!value) throw new Error("AccountProvider missing");
  return value;
}
export const blankAddress = (): Address => ({
  id: crypto.randomUUID(),
  firstName: "",
  lastName: "",
  country: "United States",
  street: "",
  apartment: "",
  company: "",
  phone: "",
  city: "",
  region: "",
  postalCode: "",
  isDefault: false,
});
