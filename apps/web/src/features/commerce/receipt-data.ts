// Isolated captured-order fixtures. They never represent a newly completed checkout.
export type CapturedReceipt = {
  date: string;
  // Net amount: the captured subtotal already includes the discount.
  itemAmount: number;
  // Informational source row; do not subtract it again from the net amount.
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  cardLast4: string;
  shippingMethod: string;
};
const base = {
  date: "July 27, 2026",
  name: "Mira Petkova",
  street: "100 Reference Lane",
  city: "Example City",
  region: "California",
  postalCode: "00000",
  country: "United States",
  phone: "+1 202 555 0100",
  email: "mira@example.test",
  cardLast4: "4242",
  shippingMethod: "Standard Shipping",
};
export const capturedReceipts: Record<string, CapturedReceipt> = {
  "REF-1001": {
    ...base,
    itemAmount: 365,
    discount: 135,
    shipping: 682,
    tax: 35,
    total: 1082,
  },
  "REF-1002": {
    ...base,
    itemAmount: 1400,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 1400,
  },
};
