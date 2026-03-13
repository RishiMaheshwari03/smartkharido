import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "SmartKharido Affiliate Disclosure — transparency about how we earn income through affiliate links.",
};

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh", padding: "64px 24px" } as React.CSSProperties,
  wrap: { maxWidth: 720, margin: "0 auto" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 12, fontWeight: 600, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "6px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: 0.3 } as React.CSSProperties,
  h1: { fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 16 } as React.CSSProperties,
  updated: { fontSize: 13, color: "#aaa", marginBottom: 40, borderBottom: "1px solid #E5E4E0", paddingBottom: 40 } as React.CSSProperties,
  banner: { backgroundColor: "#E6F7F5", border: "1px solid #0d9488", borderRadius: 14, padding: "20px 24px", marginBottom: 36 } as React.CSSProperties,
  bannerText: { fontSize: 15, color: "#0a7a70", lineHeight: 1.75, fontWeight: 500 } as React.CSSProperties,
  h2: { fontSize: 19, fontWeight: 700, color: "#1C1C1E", letterSpacing: "-0.3px", marginBottom: 10, marginTop: 36 } as React.CSSProperties,
  p: { fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
  ul: { paddingLeft: 20, marginBottom: 14 } as React.CSSProperties,
  li: { fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 8 } as React.CSSProperties,
  programCard: { backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 14, padding: "20px 24px", marginBottom: 12 } as React.CSSProperties,
  programName: { fontSize: 15, fontWeight: 700, color: "#1C1C1E", marginBottom: 4 } as React.CSSProperties,
  programText: { fontSize: 14, color: "#888", lineHeight: 1.7 } as React.CSSProperties,
};

export default function AffiliateDisclosurePage() {
  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.tag}>Transparency</span>
        <h1 style={s.h1}>Affiliate Disclosure</h1>
        <p style={s.updated}>Last updated: March 2025</p>

        <div style={s.banner}>
          <p style={s.bannerText}>
            ✅ <strong>Short version:</strong> SmartKharido earns affiliate commissions when you buy products through links on our site. This costs you nothing extra. Our editorial opinions are never influenced by these relationships.
          </p>
        </div>

        <h2 style={s.h2}>Full Disclosure</h2>
        <p style={s.p}>
          SmartKharido ("we", "us", or "our") is a participant in affiliate marketing programs. This means that when you click certain links on our website and make a qualifying purchase, we may earn a commission from the retailer — at no additional cost to you.
        </p>
        <p style={s.p}>
          This disclosure is provided in accordance with the guidelines of the Federal Trade Commission (FTC) and similar regulations applicable in India regarding endorsements and testimonials.
        </p>

        <h2 style={s.h2}>Affiliate Programs We Participate In</h2>
        {[
          { name: "🛒 Amazon India Associates Program", text: "We are a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.in." },
          { name: "🛍️ Flipkart Affiliate Program", text: "We participate in the Flipkart Affiliate Program. When you click our Flipkart links and make eligible purchases, we may earn a commission." },
          { name: "🏪 VCommission & Other Networks", text: "We may also use affiliate links from VCommission and other affiliate networks for brands like Myntra, Nykaa, and others. The same disclosure applies to all such links." },
        ].map(prog => (
          <div key={prog.name} style={s.programCard}>
            <p style={s.programName}>{prog.name}</p>
            <p style={s.programText}>{prog.text}</p>
          </div>
        ))}

        <h2 style={s.h2}>How We Identify Affiliate Links</h2>
        <p style={s.p}>
          Affiliate links on SmartKharido typically appear as "Buy on Amazon" or "Check Price on Flipkart" buttons within our articles. They may also appear as product links within the body of our guides.
        </p>

        <h2 style={s.h2}>Our Editorial Independence</h2>
        <p style={s.p}>
          Affiliate commissions do not influence which products we recommend or how we review them. We are committed to honest, unbiased content. We may recommend a product with a lower commission rate over one with a higher rate if we genuinely believe it is better for the reader.
        </p>
        <ul style={s.ul}>
          <li style={s.li}>We do not accept payment from brands to feature their products</li>
          <li style={s.li}>We do not write fake or misleading reviews</li>
          <li style={s.li}>We flag known issues with products even when they have affiliate links</li>
          <li style={s.li}>All product recommendations are based on genuine research</li>
        </ul>

        <h2 style={s.h2}>Google AdSense</h2>
        <p style={s.p}>
          We may also display advertisements through Google AdSense. These are paid advertisements and are separate from our affiliate links and editorial content.
        </p>

        <h2 style={s.h2}>Questions?</h2>
        <p style={s.p}>
          If you have any questions about our affiliate relationships or how we earn income, please contact us at <a href="mailto:hello@smartkharido.in" style={{ color: "#0d9488" }}>hello@smartkharido.in</a>. We believe in full transparency with our readers.
        </p>
      </div>
    </div>
  );
}