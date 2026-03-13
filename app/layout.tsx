import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SmartKharido — Smart Buying Guides for India",
    template: "%s | SmartKharido",
  },
  description: "Honest product reviews, buying guides and tech recommendations for Indian buyers. Make smarter purchasing decisions with SmartKharido.",
  keywords: ["buying guide india", "product reviews india", "best laptops india", "smartwatch india", "kitchen appliances india"],
  openGraph: { siteName: "SmartKharido", locale: "en_IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}