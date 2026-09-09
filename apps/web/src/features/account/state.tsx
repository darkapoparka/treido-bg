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
  firstName: "Mira",
  lastName: "Petkova",
  email: "mira@example.test",
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
    id: "address-reference-1",
    firstName: "Mira",
    lastName: "Petkova",
    country: "United States",
    street: "100 Reference Lane",
    apartment: "",
    company: "",
    phone: "",
    city: "Example City",
    region: "CA",
    postalCode: "00000",
    isDefault: true,
  },
];
const initialOrders: ReferenceOrder[] = [
  {
    id: "REF-1001",
    productId: "shampoo-bag",
    name: "Shampoo Bar Bag",
    carrier: "USPS",
    tracking: "REFERENCE-0100",
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
  removePayment: (id?: string) => void;
  notifications: Record<string, boolean>;
  toggleNotification: (name: string) => void;
  reset: () => void;
};
const Context = createContext<AccountState | null>(null);
// Memory-only fixture state: no personal entries or payment fields are persisted.
export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(initialProfile);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [orders, setOrders] = useState(initialOrders);
  const [people, setPeople] = useState<Person[]>([]);
  const [preferences, setPreferences] = useState<Record<string, string[]>>({});
  const [paymentCards, setPaymentCards] = useState([
    { id: "card-reference-1", last4: "4242", expiry: "12/30" },
    { id: "card-reference-2", last4: "1881", expiry: "11/31" },
  ]);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    {},
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
        removePayment: (id) =>
          setPaymentCards((cards) =>
            cards.filter((card) => card.id !== (id ?? cards[0]?.id)),
          ),
        notifications,
        toggleNotification: (name) =>
          setNotifications((n) => ({ ...n, [name]: !(n[name] ?? true) })),
        reset: () => {
          setProfile(initialProfile);
          setAddresses(initialAddresses);
          setOrders(initialOrders);
          setPeople([]);
          setPreferences({});
          setPaymentCards([
            { id: "card-reference-1", last4: "4242", expiry: "12/30" },
            { id: "card-reference-2", last4: "1881", expiry: "11/31" },
          ]);
          setNotifications({});
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
