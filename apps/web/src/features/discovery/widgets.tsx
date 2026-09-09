"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { Sheet } from "./components";
function OrderWidget({ size }: { size: "large" | "medium" | "small" }) {
  return (
    <div className={`order-widget widget-${size}`}>
      <header>
        <img src="/api/reference-media/kitsch-logo" alt="" />
        {size !== "small" && <b>KITSCH</b>}
        <img
          className="widget-shop-mark"
          src="/api/reference-media/auth-loop"
          alt="Shop"
        />
      </header>
      <div className="widget-order-status">
        {size === "small" && <span>KITSCH</span>}
        <b>Order placed</b>
        <p>Standard Shipping</p>
        {size !== "small" && (
          <>
            <progress value="20" max="100" />
            <img src="/api/reference-media/shampoo-bag" alt="Shampoo bar bag" />
          </>
        )}
      </div>
      {size === "large" && (
        <div className="widget-delivery">
          <header>
            <span>DHL</span>
            <b>Loose Fit Printed T-Shirt</b>
          </header>
          <div>
            <b>Delivered</b>
            <p>Delivered today</p>
          </div>
        </div>
      )}
    </div>
  );
}
export function Widgets() {
  const [instructions, setInstructions] = useState(false);
  return (
    <main className="widget-page">
      <OrderWidget size="large" />
      <OrderWidget size="medium" />
      <OrderWidget size="small" />
      <button className="pill" onClick={() => setInstructions(true)}>
        About these widgets
      </button>
      <Link href="/orders">Back to orders</Link>
      <Sheet
        open={instructions}
        title="Order widgets"
        onClose={() => setInstructions(false)}
      >
        <p className="sheet-copy">
          These are browser previews of the captured Shop widgets. Installing an
          iOS home-screen widget is not available from this website. The order
          examples are local reference fixtures.
        </p>
      </Sheet>
    </main>
  );
}
