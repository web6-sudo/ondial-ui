import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { AppLayoutShell } from "@/components/layout/app-layout-shell";
import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ondial.ai"),
  title: {
    default: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    template: "%s | OnDial",
  },
  description: "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
  keywords: ["AI voice agents", "customer support automation", "AI sales calls", "virtual receptionist", "OnDial"],
  authors: [{ name: "OnDial" }],
  creator: "OnDial",
  publisher: "OnDial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description: "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    url: "https://www.ondial.ai",
    siteName: "OnDial",
    images: [
      {
        url: "/img/logo/og.png",
        width: 1200,
        height: 630,
        alt: "OnDial AI Voice Agents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description: "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    images: ["/img/logo/og.png"],
    creator: "@ondialai",
  },
  icons: {
    icon: "/fav.svg",
    apple: "/fav.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full overflow-hidden", "antialiased", "font-sans", fontSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex h-dvh min-h-0 flex-col overflow-hidden font-sans">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OnDial",
              url: "https://www.ondial.ai",
              logo: "https://www.ondial.ai/img/logo/og.png",
              description: "OnDial provides enterprise-grade AI Voice Agents for inbound and outbound call automation, multilingual customer support, lead qualification, appointment scheduling, and business communication automation.",
              sameAs: [
                "https://twitter.com/ondialai",
                "https://www.linkedin.com/company/ondialai",
                "https://www.facebook.com/ondialai",
                "https://www.instagram.com/ondialai",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-9979620507",
                  contactType: "customer service",
                  areaServed: ["IN", "US"],
                  availableLanguage: ["English", "Hindi"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+91-8160835445",
                  contactType: "sales",
                  areaServed: ["IN", "US"],
                  availableLanguage: ["English", "Hindi"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressRegion: "Gujarat",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OnDial",
              url: "https://www.ondial.ai",
            }),
          }}
        />

        <AppProviders>
          <AppLayoutShell>{children}</AppLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
