import type { Metadata } from "next";
import { localeSchema } from "@treido/contracts";
import "./globals.css";
export const metadata: Metadata = {
  title: "Treido bootstrap",
  description: "Provider-free development foundation.",
  icons: { icon: "data:," },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={localeSchema.parse("en")}>
      <body>{children}</body>
    </html>
  );
}
