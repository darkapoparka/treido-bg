"use client";
/* eslint-disable @next/next/no-img-element -- frozen reference-media crops */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FloatingNav, IconButton } from "./components";
import { Icon } from "./icons";
import "./deals.css";

type DealProduct = {
  id: string;
  title: string;
  price: string;
  reviews: string;
  image: string;
};
type DealStore = {
  id: string;
  name: string;
  offer: string;
  threshold: string;
  logo: string;
  products: DealProduct[];
};

const stores: DealStore[] = [
  {
    id: "rinse-bath-body",
    name: "Rinse Bath & Body",
    offer: "$10",
    threshold: "$35",
    logo: "/api/reference-media/deals-rinse-logo",
    products: [
      {
        id: "rinse-tres",
        title: "Handmade Tres Clay Soap |...",
        price: "$8.00",
        reviews: "(2)",
        image: "/api/reference-media/deals-rinse-tres",
      },
      {
        id: "rinse-rainbow",
        title: "Handmade Rainbow Sherbe...",
        price: "$8.00",
        reviews: "(4)",
        image: "/api/reference-media/deals-rinse-rainbow",
      },
      {
        id: "rinse-third",
        title: "Handmade Soap",
        price: "$8.00",
        reviews: "",
        image: "/api/reference-media/deals-rinse-tres",
      },
    ],
  },
  {
    id: "symansays",
    name: "Syman Says Farms",
    offer: "$20",
    threshold: "$60",
    logo: "/api/reference-media/deals-syman-logo",
    products: [
      {
        id: "syman-fir",
        title: "Frosted Fir LIMITED | Simple...",
        price: "$7.00",
        reviews: "(4)",
        image: "/api/reference-media/deals-syman-fir",
      },
      {
        id: "syman-lilac",
        title: "LILAC | Goat Milk Lotion",
        price: "$7.00",
        reviews: "(1)",
        image: "/api/reference-media/deals-syman-lilac",
      },
      {
        id: "syman-third",
        title: "Patchouli Goat Milk",
        price: "$7.00",
        reviews: "",
        image: "/api/reference-media/deals-syman-lilac",
      },
    ],
  },
  {
    id: "francesco-palmieri",
    name: "Francesco Palmieri",
    offer: "$15",
    threshold: "$70",
    logo: "/api/reference-media/deals-francesco-logo",
    products: [
      {
        id: "francesco-goat",
        title: "SOAP BAR - GOAT MILK",
        price: "$10.00",
        reviews: "(6)",
        image: "/api/reference-media/deals-francesco-goat",
      },
      {
        id: "francesco-lavender",
        title: "SOAP BAR - LAVENDER",
        price: "$10.00",
        reviews: "(4)",
        image: "/api/reference-media/deals-francesco-lavender",
      },
      {
        id: "francesco-third",
        title: "SOAP BAR",
        price: "$10.00",
        reviews: "",
        image: "/api/reference-media/deals-francesco-goat",
      },
    ],
  },
  {
    id: "solid-hair-care",
    name: "Solid Hair Care",
    offer: "$10",
    threshold: "$30",
    logo: "/api/reference-media/deals-solid-logo",
    products: [
      {
        id: "solid-raquels",
        title: "Raquel’s Favorite - Leave in...",
        price: "$32.00",
        reviews: "(1)",
        image: "/api/reference-media/deals-solid-raquels",
      },
      {
        id: "solid-mask",
        title: "Ultra Repair Hair Mask",
        price: "$36.00",
        reviews: "(14)",
        image: "/api/reference-media/deals-solid-mask",
      },
      {
        id: "solid-third",
        title: "Conditioning Treatment",
        price: "$28.00",
        reviews: "",
        image: "/api/reference-media/deals-solid-mask",
      },
    ],
  },
];

const chips = ["Men", "Accessories", "Beauty", "Women"];

export function Deals() {
  const router = useRouter();
  const [saved, setSaved] = useState<string[]>([]);
  const toggleSaved = (id: string) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  return (
    <main className="shop-page deals-page">
      <h1>Deals</h1>
      <div className="deals-filter-rail" aria-label="Deal categories">
        <Link className="deals-search" href="/search" aria-label="Search">
          <Icon name="search" />
        </Link>
        {chips.map((chip) => (
          <Link
            className="deals-chip"
            href={`/search?q=${encodeURIComponent(chip)}`}
            key={chip}
          >
            {chip}
          </Link>
        ))}
      </div>
      <div className="deals-feed">
        {stores.map((store) => (
          <section className="deal-store" key={store.id}>
            <header className="deal-store-header">
              <Link href="/search" className="deal-store-identity">
                <img src={store.logo} alt="" />
                <span>
                  <strong>{store.name}</strong>
                  <small>
                    <b>Save {store.offer}</b> on orders over {store.threshold}
                  </small>
                </span>
              </Link>
              <IconButton icon="more" label={`More options for ${store.name}`} />
            </header>
            <div className="deal-product-rail">
              {store.products.map((product) => (
                <article className="deal-product" key={product.id}>
                  <Link href="/search" className="deal-product-photo">
                    <img src={product.image} alt={product.title} />
                  </Link>
                  <IconButton
                    className="deal-save"
                    icon="heart"
                    label={`${saved.includes(product.id) ? "Unsave" : "Save"} ${product.title}`}
                    pressed={saved.includes(product.id)}
                    onClick={() => toggleSaved(product.id)}
                  />
                  <Link href="/search" className="deal-product-copy">
                    <strong>{product.title}</strong>
                    <span className="deal-rating">
                      <i>★★★★★</i> {product.reviews}
                    </span>
                    <span>{product.price}</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <FloatingNav
        back
        cart={() => router.push("/cart")}
      />
    </main>
  );
}
