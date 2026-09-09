import type { Metadata } from "next";
import { localeSchema } from "@treido/contracts";
import "./globals.css";
import "@/features/account/account.css";
import { AccountProvider } from "@/features/account/state";
import { DiscoveryProvider } from "@/features/discovery/state";
export const metadata: Metadata = {
  title: "Shop reference preview",
  description:
    "Isolated discovery reference preview. No live commerce services.",
  robots: { index: false, follow: false },
  icons: { icon: "data:," },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={localeSchema.parse("en")}>
      <body>
        <DiscoveryProvider>
          <AccountProvider>{children}</AccountProvider>
        </DiscoveryProvider>
      </body>
    </html>
  );
}
