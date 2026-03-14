import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C1C1E", color: "#9CA3AF", padding: "48px 24px 28px", marginTop: "auto" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40, flexWrap: "wrap" as const }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0d9488, #0f766e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", flexShrink: 0 }}>SK</div>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>SmartKharido</span>
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.75, maxWidth: 280, marginBottom: 12 }}>
              Honest buying guides for smart Indian consumers. No fluff, just facts.
            </p>
            <p style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.7 }}>
              We earn affiliate commissions from Amazon India &amp; Flipkart when you buy through our links — at no extra cost to you.
            </p>
          </div>

          {/* Categories — now with correct individual links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 14 }}>Categories</div>
            {[
              { label: "Laptops",       href: "/category/laptops" },
              { label: "Smartphones",   href: "/category/smartphones" },
              { label: "Smartwatches",  href: "/category/smartwatches" },
              { label: "Home Appliances", href: "/category/home-kitchen" },
              { label: "Kitchen Electronics", href: "/category/kitchen" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: "block", fontSize: 13, color: "#6B7280", textDecoration: "none", marginBottom: 8, transition: "color 0.15s" }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Important links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 14 }}>Important</div>
            {[
              { label: "About Us",            href: "/about" },
              { label: "Contact Us",          href: "/contact" },
              { label: "Privacy Policy",      href: "/privacy-policy" },
              { label: "Affiliate Disclosure",href: "/affiliate-disclosure" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: "block", fontSize: 13, color: "#6B7280", textDecoration: "none", marginBottom: 8 }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #2a2a2d", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 10 }}>
          <span style={{ fontSize: 12, color: "#4B5563" }}>© {new Date().getFullYear()} SmartKharido. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "#4B5563" }}>Made with ♥ for Indian buyers</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}