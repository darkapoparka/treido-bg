import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@treido/contracts"],
  devIndicators: false,
  // A second, isolated build directory lets a replacement preview start while
  // the original 6412 process still holds .next (it cannot be stopped locally).
  ...(process.env.SHOP_PARITY_DIST_DIR
    ? { distDir: process.env.SHOP_PARITY_DIST_DIR }
    : {}),
};
export default nextConfig;
