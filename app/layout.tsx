import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arya Silver Arts — Handcrafted Silver Treasures from Nepal",
    template: "%s | Arya Silver Arts",
  },
  description:
    "Discover exquisite handcrafted silver cultural pieces — deity statues, gemstone necklaces, and ceremonial artifacts — crafted by master artisans in Patan, Nepal. Inquire for bespoke international orders.",
  keywords: [
    "silver handicrafts",
    "Nepal silver",
    "handcrafted deity statues",
    "gemstone jewelry",
    "silver artifacts",
    "Patan metalwork",
    "cultural silver",
    "gold plated necklace",
    "bespoke silver",
  ],
  openGraph: {
    type: "website",
    title: "Arya Silver Arts — Handcrafted Silver Treasures from Nepal",
    description:
      "Exquisite handcrafted silver deity statues, gemstone necklaces, and ceremonial artifacts from master artisans in Patan, Nepal.",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
