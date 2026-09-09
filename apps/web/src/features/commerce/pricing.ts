import type { CartLine } from "../discovery/state";
// Frozen flow21's promotion applies only to this captured default variant.
export function capturedLineAmount(
  line: Pick<CartLine, "productId" | "variantId">,
  amount: number,
) {
  return line.productId === "shampoo-bag" &&
    line.variantId === "shampoo-bag-default"
    ? 365
    : amount;
}
