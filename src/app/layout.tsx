import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyButtons from "@/components/StickyButtons";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://vapedeliverybangalore.com"),
  title: {
    default: "Vape in Bangalore — Buy Vapes Online | 30-45 Min Delivery | VapeDeliveryBangalore.com",
    template: "%s | VapeDeliveryBangalore.com",
  },
  description:
    "Buy vapes in Bangalore with 30-45 min delivery. Elfbar, Caliburn, ZYN & more. Discreet delivery to BTM, HSR, Koramangala, Indiranagar, Whitefield and 50+ areas. Order on WhatsApp.",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-48.png",
    apple: "/favicon-192.png",
  },
  alternates: { canonical: "https://vapedeliverybangalore.com" },
  keywords: [
    "vape in bangalore",
    "vape delivery bangalore",
    "buy vape bangalore",
    "vape near me bangalore",
    "disposable vape bangalore",
    "best vape bangalore",
    "vape shop bangalore",
    "order vape bangalore",
    "elfbar bangalore",
    "vape online bangalore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vapedeliverybangalore.com",
    siteName: "Vape Delivery Bangalore",
    title: "Vape Delivery Bangalore — Buy Vape Online, 30 Min Delivery",
    description: "Fast, discreet vape delivery across all of Bangalore. 30-45 min. 50+ areas covered. Order on WhatsApp.",
    images: [{ url: "/hero-delivery.png", width: 1200, height: 630, alt: "Vape Delivery Bangalore — Fast Delivery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vape Delivery Bangalore — Buy Vape Online, 30 Min Delivery",
    description: "Fast, discreet vape delivery across Bangalore. Order on WhatsApp.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"LocalBusiness","name":"VapeDeliveryBangalore.com","url":"https://vapedeliverybangalore.com","telephone":"+916282878843","address":{"@type":"PostalAddress","addressLocality":"Bangalore","addressRegion":"Karnataka","addressCountry":"IN"},"geo":{"@type":"GeoCoordinates","latitude":12.9716,"longitude":77.5946},"openingHours":"Mo-Su 10:00-22:00","priceRange":"₹₹","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"380","bestRating":"5"}}` }} />
        <meta name="theme-color" content="#f8c105" />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <StickyButtons />
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
