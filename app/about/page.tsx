import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SmartKharido — India's honest product buying guide for tech and home products.",
};

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh", padding: "64px 24px" } as React.CSSProperties,
  wrap: { maxWidth: 720, margin: "0 auto" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 12, fontWeight: 600, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "6px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: 0.3 } as React.CSSProperties,
  h1: { fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 20 } as React.CSSProperties,
  lead: { fontSize: 17, color: "#555", lineHeight: 1.75, marginBottom: 40, borderBottom: "1px solid #E5E4E0", paddingBottom: 40 } as React.CSSProperties,
  h2: { fontSize: 20, fontWeight: 700, color: "#1C1C1E", letterSpacing: "-0.3px", marginBottom: 12, marginTop: 36 } as React.CSSProperties,
  p: { fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 16 } as React.CSSProperties,
  card: { backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 16, padding: "28px 24px", marginTop: 40 } as React.CSSProperties,
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#1C1C1E", marginBottom: 8 } as React.CSSProperties,
  cardText: { fontSize: 14, color: "#888", lineHeight: 1.75 } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 24 } as React.CSSProperties,
  pill: { backgroundColor: "#F7F6F3", border: "1px solid #E5E4E0", borderRadius: 12, padding: "16px", textAlign: "center" as const } as React.CSSProperties,
  pillIcon: { fontSize: 22, marginBottom: 8, display: "block" } as React.CSSProperties,
  pillText: { fontSize: 13, fontWeight: 600, color: "#1C1C1E" } as React.CSSProperties,
  pillSub: { fontSize: 12, color: "#aaa", marginTop: 2 } as React.CSSProperties,
};

export default function AboutPage() {
  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.tag}>About SmartKharido</span>
        <h1 style={s.h1}>We Help Indians Buy Smarter</h1>
        <p style={s.lead}>
          SmartKharido is an independent product review and buying guide website built specifically for Indian consumers. Our mission is simple — help you make confident purchasing decisions without wasting time or money.
        </p>

        <h2 style={s.h2}>Why We Started This</h2>
        <p style={s.p}>
          Most product review websites in India either copy content from international sources without checking local availability, or are clearly written just to earn affiliate commissions — not to genuinely help readers.
        </p>
        <p style={s.p}>
          We started SmartKharido to change that. Every guide we publish is researched specifically for Indian buyers — checking real prices on Amazon India and Flipkart, verifying local availability, and considering Indian use cases like voltage compatibility, warranty support, and after-sales service.
        </p>

        <h2 style={s.h2}>What We Cover</h2>
        <div style={s.grid}>
          {[
            { icon: "💻", name: "Laptops", sub: "For every budget" },
            { icon: "📱", name: "Smartphones", sub: "India-specific picks" },
            { icon: "⌚", name: "Smartwatches", sub: "Budget to premium" },
            { icon: "🎧", name: "Headphones", sub: "Sound & value" },
            { icon: "🍳", name: "Kitchen Appliances", sub: "Indian kitchen needs" },
            { icon: "🏠", name: "Home Electronics", sub: "Smart home products" },
          ].map(item => (
            <div key={item.name} style={s.pill}>
              <span style={s.pillIcon}>{item.icon}</span>
              <p style={s.pillText}>{item.name}</p>
              <p style={s.pillSub}>{item.sub}</p>
            </div>
          ))}
        </div>

        <h2 style={s.h2}>Our Editorial Standards</h2>
        <p style={s.p}>
          We only recommend products that are genuinely available on Amazon India or Flipkart at the time of publishing. We check user reviews, compare specifications honestly, and flag known issues with products — even if those products have affiliate links on our page.
        </p>
        <p style={s.p}>
          Our content is never sponsored. Brands cannot pay us to feature or positively review their products. If we recommend something, it's because we genuinely believe it offers good value for Indian buyers.
        </p>

        <h2 style={s.h2}>Affiliate Disclosure</h2>
        <p style={s.p}>
          SmartKharido participates in affiliate programs including Amazon India Associates and Flipkart Affiliate Program. When you click our links and make a purchase, we may earn a small commission — at absolutely no extra cost to you. This income helps us keep the website running and free for everyone.
        </p>
        <p style={s.p}>
          Our editorial opinions are never influenced by affiliate relationships. We recommend products based on their merit, not their commission rate.
        </p>

        <div style={s.card}>
          <p style={s.cardTitle}>📬 Get in Touch</p>
          <p style={s.cardText}>
            Have a question, suggestion, or found an error in one of our guides? We'd love to hear from you. Visit our <a href="/contact" style={{ color: "#0d9488", textDecoration: "none", fontWeight: 600 }}>Contact page</a> to reach us directly.
          </p>
        </div>
      </div>
    </div>
  );
}