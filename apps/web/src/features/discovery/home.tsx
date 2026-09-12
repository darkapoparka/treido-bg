"use client";
import { ShopSurface } from "./hydration-boundary";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatMoney, type Catalog } from "../catalog/types";
import {
  FloatingNav,
  IconButton,
  ProductCard,
  Sheet,
  StoreRow,
} from "./components";
import { HomeCampaigns } from "./home-campaigns";
import { Icon } from "./icons";
import { useDiscovery } from "./state";
import { useAccount } from "../account/state";
export function Home({ catalog }: { catalog: Catalog }) {
  const router = useRouter();
  const params = useSearchParams();
  const state = useDiscovery(),
    { profile } = useAccount();
  // Different recorded journeys share these same feed components; only their data/order changes.
  const returning = params.get("journey") === "returning";
  const requestedFeed = params.get("feed");
  const recentProducts =
    !returning &&
    (requestedFeed === "recent-products" ||
      (!requestedFeed && state.recentActivity === "products"));
  const recentStores =
    !returning &&
    (requestedFeed === "recent-stores" ||
      (!requestedFeed && state.recentActivity === "stores"));
  const tracking =
    returning ||
    requestedFeed === "tracking" ||
    (!!profile.firstName && !!profile.lastName);
  const [shopMenu, setShopMenu] = useState("");
  const [reasonView, setReasonView] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);
  const recent = state.viewedProducts
    .flatMap((id) => {
      const p = catalog.products.find((p) => p.id === id);
      return p ? [p] : [];
    })
    .slice(0, 3);
  return (
    <ShopSurface
      className={`shop-page home-page ${returning ? "home-returning" : ""}`}
      data-feed={
        returning
          ? "returning"
          : recentProducts
            ? "recent-products"
            : recentStores
              ? "recent-stores"
              : tracking
                ? "tracking"
                : "welcome"
      }
    >
      <header className="home-shortcuts">
        <Link href="/profile" aria-label="Profile" className="avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt="" />
          ) : (
            <span>{profile.firstName[0] || "A"}</span>
          )}
        </Link>
        <IconButton
          icon="bell"
          filled
          label="Notifications"
          onClick={() => router.push("/notifications")}
        />
        <Link className="pill" href="/deals">
          <Icon name="tag" filled />
          Deals
        </Link>
        <Link className="pill" href="/following">
          <span className="following-shortcut-icon">
            <Icon name="badge-check" filled />
            <i />
          </span>
          Following
        </Link>
        <Link className="pill" href="/saved">
          <Icon name="heart" filled />
          Saved
        </Link>
        <Link className="pill" href="/minis">
          <Icon name="minis" filled />
          Minis
        </Link>
      </header>
      {tracking && (
        <Link href="/orders" className="delivery-card">
          <img
            src={catalog.stores.find((s) => s.id === "kitsch")!.logo}
            alt=""
          />
          <span>
            <small>KITSCH</small>
            <strong>Ordered Jul 27</strong>
          </span>
          <img src="/api/reference-media/shampoo-bag" alt="Shampoo bar bag" />
        </Link>
      )}
      <button
        className="email-card"
        onClick={() => router.push("/account/connections")}
      >
        <img src="/api/reference-media/parcel" alt="" />
        <span>
          <strong>Connect email to see more deliveries</strong>
          <span>Track more of your packages with Shop</span>
        </span>
        <Icon name="back" />
      </button>
      {recentStores && (
        <section
          className="recent-panel recent-stores-panel"
          aria-label="Recently viewed shops"
        >
          <p>Jump back in</p>
          <div className="recent-store-grid">
            {[
              {
                key: "kitsch-catalog",
                store: "kitsch",
                image: "rice-bundle",
                offer: "Save $20",
              },
              {
                key: "kitsch-care",
                store: "kitsch",
                image: "shea-butter",
                offer: "$20 off order",
              },
              {
                key: "loaded-tea",
                store: "loaded-tea",
                image: "home-loaded-logo",
                offer: "Save $10",
              },
              {
                key: "drmtlgy",
                store: "drmtlgy",
                image: "home-drmtlgy-retinol",
                offer: "Save $30",
              },
            ].map((item) => (
              <Link key={item.key} href={`/stores/${item.store}`}>
                <img
                  src={`/api/reference-media/${item.image}`}
                  alt={
                    catalog.stores.find((store) => store.id === item.store)
                      ?.name || item.store
                  }
                />
                <span>{item.offer}</span>
              </Link>
            ))}
          </div>
          <Link href="/search?view=recent" className="recent-title">
            <h1>Recently viewed</h1>
            <Icon name="arrow" />
          </Link>
        </section>
      )}
      {recentProducts && (
        <section className="recent-panel" aria-label="Recently viewed products">
          <p>Jump back in</p>
          <div className="product-rail">
            {recent.map((p) => (
              <ProductCard
                key={p.id}
                product={
                  p.id === "round-sunglasses"
                    ? { ...p, promotion: "Save $20" }
                    : p
                }
                compact
              />
            ))}
          </div>
          <Link href="/search?view=recent" className="recent-title">
            <h1>Recently viewed</h1>
            <Icon name="arrow" />
          </Link>
        </section>
      )}
      {recentProducts &&
        catalog.stores
          .filter((s) => s.id === "vehla")
          .map((store) => (
            <section className="store-feed" key={store.id}>
              <StoreRow
                store={store}
                onMore={() => {
                  setShopMenu(store.id);
                  setReasonView(false);
                }}
              />
              {hidden.includes(store.id) ? (
                <div className="hidden-shop">
                  <Icon name="eye-off" />
                  <p>We’ll show you less like this</p>
                  <button
                    onClick={() =>
                      setHidden((v) => v.filter((id) => id !== store.id))
                    }
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <div>
                  {catalog.products
                    .filter((p) => p.storeId === store.id)
                    .slice(0, 1)
                    .map((p) => (
                      <div className="home-product-row" key={p.id}>
                        <ProductCard
                          product={
                            p.id === "round-sunglasses"
                              ? { ...p, promotion: "Save $20" }
                              : p
                          }
                          compact
                        />
                        <Link href={`/products/${p.id}`}>
                          <strong>{p.title}</strong>
                          <p className="rating">
                            <span>★★★★★</span> ({p.ratingCount})
                          </p>
                          <p>{formatMoney(p.price)}</p>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </section>
          ))}
      <Sheet
        open={!!shopMenu}
        title={
          reasonView
            ? "Not interested"
            : (catalog.stores.find((s) => s.id === shopMenu)?.name ?? "Shop")
        }
        onClose={() => setShopMenu("")}
      >
        {reasonView ? (
          <>
            <p>Please select a reason</p>
            <div className="filter-options">
              {[
                "I just don’t like it",
                "Products are too expensive",
                "Want to see fewer shops like this",
                `Want to see less of ${catalog.stores.find((s) => s.id === shopMenu)?.name}`,
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    setHidden((v) => [...v, shopMenu]);
                    setShopMenu("");
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="filter-options">
            <Link href={`/stores/${shopMenu}`}>Visit shop</Link>
            <button onClick={() => state.toggleFollow(shopMenu)}>
              {state.followed.includes(shopMenu) ? "Unfollow" : "Follow"}
            </button>
            <button onClick={() => setReasonView(true)}>Not interested</button>
            <Link href={`/stores/${shopMenu}/info`}>Report shop</Link>
          </div>
        )}
      </Sheet>
      <HomeCampaigns
        catalog={catalog}
        first={
          tracking && !recentProducts && !recentStores ? "drmtlgy" : undefined
        }
        productLayout={returning ? "grid" : "rail"}
      />
      <FloatingNav showExplore={!returning} />
    </ShopSurface>
  );
}
