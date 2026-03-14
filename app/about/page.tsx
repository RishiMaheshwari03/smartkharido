import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | SmartKharido",
  description: "SmartKharido is an independent product review site built for Indian buyers. Honest buying guides for Amazon India and Flipkart.",
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 8 }}>About SmartKharido</p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#1C1C1E", letterSpacing: "-0.5px" }}>We Help Indians Buy Smarter</h1>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Founder story — E-E-A-T */}
        <div style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2a2a2d 100%)", borderRadius: 20, padding: "28px", marginBottom: 24, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" as const }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #0d9488, #0f766e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", flexShrink: 0 }}>SK</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0d9488", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: 1 }}>Founded by</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>A Software Developer from Chennai</div>
            <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.75, margin: 0 }}>
              SmartKharido was started by a software developer in Chennai who got tired of reading tech reviews that were either copied from international sources, clearly written for commissions, or completely irrelevant to Indian buyers. After spending hours researching products only to find outdated prices, unavailable models, and specs that didn't account for Indian conditions — he decided to build the resource he always wished existed.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>Why We Started This</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 14 }}>
            Most product review websites in India either copy content from international sources without checking local availability, or are clearly written just to earn affiliate commissions — not to genuinely help readers.
          </p>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>
            We started SmartKharido to change that. Every guide we publish is researched specifically for Indian buyers — checking real prices on Amazon India and Flipkart, verifying local availability, and considering Indian use cases like voltage compatibility, warranty support, monsoon conditions, and after-sales service.
          </p>
        </div>

        {/* What we cover */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 20, letterSpacing: "-0.3px" }}>What We Cover</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {[
              { icon: "💻", label: "Laptops", sub: "For every budget" },
              { icon: "📱", label: "Smartphones", sub: "India-specific picks" },
              { icon: "⌚", label: "Smartwatches", sub: "Budget to premium" },
              { icon: "🎧", label: "Headphones", sub: "Sound & value" },
              { icon: "🍳", label: "Kitchen Appliances", sub: "Indian kitchen needs" },
              { icon: "🏠", label: "Home Electronics", sub: "Smart home products" },
            ].map(item => (
              <div key={item.label} style={{ background: "#F7F6F3", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1E" }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial standards */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>Our Editorial Standards</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 16 }}>
            We only recommend products that are genuinely available on Amazon India or Flipkart at the time of publishing. We check user reviews, compare specifications honestly, and flag known issues with products — even if those products have affiliate links on our page.
          </p>
          <div style={{ background: "#F0FDF9", borderRadius: 12, border: "1px solid #bbf7d0", padding: "16px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>Our content is</div>
            {[
              "Never sponsored — brands cannot pay us to feature or positively review their products",
              "Always India-specific — prices, availability and service centres verified before publishing",
              "Honestly critical — we flag product issues even when affiliate links are present",
              "Regularly updated — guides are revisited when products or prices change significantly",
            ].map((point, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
                <span style={{ color: "#16a34a", fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontSize: 14, color: "#166534", lineHeight: 1.65 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>Affiliate Disclosure</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>
            SmartKharido participates in affiliate programs including Amazon India Associates and the Flipkart Affiliate Program. When you click our links and make a purchase, we may earn a small commission — at absolutely no extra cost to you. This income helps us keep the website running and free for everyone. Our editorial opinions are never influenced by affiliate relationships. We recommend products based on their merit, not their commission rate.
          </p>
          <Link href="/affiliate-disclosure" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, fontWeight: 700, color: "#0d9488", textDecoration: "none" }}>
            Read our full Affiliate Disclosure →
          </Link>
        </div>

        {/* Get in touch */}
        <div style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", borderRadius: 16, padding: "28px", textAlign: "center" as const, color: "#fff" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📬</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Get in Touch</h2>
          <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, marginBottom: 20 }}>
            Have a question, suggestion, or found an error in one of our guides? We'd love to hear from you.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0d9488", fontWeight: 800, fontSize: 14, padding: "12px 24px", borderRadius: 10, textDecoration: "none" }}>
            Contact Us →
          </Link>
        </div>

      </div>
    </div>
  );
}