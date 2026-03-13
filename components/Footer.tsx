import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #E5E4E0", backgroundColor: "#EFEDE8", marginTop: 80 }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>SK</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.5px" }}>
                Smart<span style={{ color: "#0d9488" }}>Kharido</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, maxWidth: 220 }}>
              Honest buying guides for smart Indian consumers. No fluff, just facts.
            </p>
            <p style={{ fontSize: 11, color: "#aaa", lineHeight: 1.7, marginTop: 16, maxWidth: 240 }}>
              We earn affiliate commissions from Amazon India & Flipkart when you buy through our links — at no extra cost to you.
            </p>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#aaa", marginBottom: 16 }}>Categories</p>
            {["Laptops & Computers", "Smartphones", "Smartwatches", "Home Appliances", "Kitchen Electronics"].map(label => (
              <Link key={label} href="/blog" style={{ display: "block", fontSize: 13, color: "#666", textDecoration: "none", marginBottom: 10, fontWeight: 500 }}>{label}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#aaa", marginBottom: 16 }}>Important</p>
            {[["About Us", "/about"], ["Contact Us", "/contact"], ["Privacy Policy", "/privacy-policy"], ["Affiliate Disclosure", "/affiliate-disclosure"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ display: "block", fontSize: 13, color: "#666", textDecoration: "none", marginBottom: 10, fontWeight: 500 }}>{label}</Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #E5E4E0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#aaa" }}>© 2025 SmartKharido. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "#aaa" }}>Made with ♥ for Indian buyers</p>
        </div>
      </div>
    </footer>
  );
}