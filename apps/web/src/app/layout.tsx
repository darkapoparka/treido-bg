import type { Metadata } from "next";
import { localeSchema } from "@treido/contracts";
import "./globals.css";
import "@/features/account/account.css";
import "@/features/account/profile.css";
import "@/features/account/settings.css";
import "@/features/commerce/continuation.css";
import "@/features/commerce/checkout-parity.css";
import { AccountProvider } from "@/features/account/state";
import { DiscoveryProvider } from "@/features/discovery/state";
import { readReferenceScenario } from "@/features/catalog/reference/scenario.server";
export const metadata: Metadata = {
  title: "Shop reference preview",
  description:
    "Isolated discovery reference preview. No live commerce services.",
  robots: { index: false, follow: false },
  icons: { icon: "data:," },
};
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const scenario = await readReferenceScenario();
  return (
    <html
      lang={localeSchema.parse("en")}
      data-reference-scenario={scenario?.name}
    >
      <body>
        <DiscoveryProvider initial={scenario?.discovery}>
          <AccountProvider initial={scenario?.account}>
            {children}
          </AccountProvider>
        </DiscoveryProvider>
      </body>
    </html>
  );
}
