import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@treido/contracts"],
  devIndicators: false,
};
export default nextConfig;
