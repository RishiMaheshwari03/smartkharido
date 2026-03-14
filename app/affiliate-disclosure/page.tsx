import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | SmartKharido",
  description: "SmartKharido's full affiliate disclosure — how we earn commissions and how it affects our editorial content.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 8 }}>Transparency</p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#1C1C1E", letterSpacing: "-0.5px", marginBottom: 8 }}>Affiliate Disclosure</h1>
          {/* Updated date */}
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>Last updated: March 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Short version banner */}
        <div style={{ background: "#F0FDF9", border: "1px solid #b2ddd8", borderRadius: 14, padding: "18px 20px", marginBottom: 36, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>✅</span>
          <p style={{ margin: 0, fontSize: 15, color: "#065F46", lineHeight: 1.7 }}>
            <strong style={{ fontWeight: 700 }}>Short version:</strong> SmartKharido earns affiliate commissions when you buy products through links on our site. This costs you nothing extra. Our editorial opinions are never influenced by these relationships.
          </p>
        </div>

        {/* Full disclosure */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>Full Disclosure</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 14 }}>
            SmartKharido ("we", "us", or "our") is a participant in affiliate marketing programs. This means that when you click certain links on our website and make a qualifying purchase, we may earn a commission from the retailer — at no additional cost to you.
          </p>
          {/* ASCI + FTC reference — updated */}
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>
            This disclosure is provided in accordance with the guidelines of the <strong style={{ fontWeight: 700 }}>Advertising Standards Council of India (ASCI)</strong> and the <strong style={{ fontWeight: 700 }}>Federal Trade Commission (FTC)</strong> regarding endorsements and testimonials in advertising.
          </p>
        </div>

        {/* Affiliate programs */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 20, letterSpacing: "-0.3px" }}>Affiliate Programs We Participate In</h2>
          {[
            { icon: "🛒", title: "Amazon India Associates Program", desc: "We are a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.in." },
            { icon: "🛍️", title: "Flipkart Affiliate Program", desc: "We participate in the Flipkart Affiliate Program. When you click our Flipkart links and make eligible purchases, we may earn a commission." },
            { icon: "🏪", title: "VCommission & Other Networks", desc: "We may also use affiliate links from VCommission and other affiliate networks for brands like Myntra, Nykaa, and others. The same disclosure applies to all such links." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < 2 ? 20 : 0, paddingBottom: i < 2 ? 20 : 0, borderBottom: i < 2 ? "1px solid #F3F4F6" : "none" }}>
              <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1E", marginBottom: 6 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How we identify */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>How We Identify Affiliate Links</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>
            Affiliate links on SmartKharido typically appear as "Buy on Amazon" or "Check Price on Flipkart" buttons within our articles. They may also appear as product links within the body of our guides.
          </p>
        </div>

        {/* Editorial independence */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>Our Editorial Independence</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 16 }}>
            Affiliate commissions do not influence which products we recommend or how we review them. We are committed to honest, unbiased content. We may recommend a product with a lower commission rate over one with a higher rate if we genuinely believe it is better for the reader.
          </p>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {[
              "We do not accept payment from brands to feature their products",
              "We do not write fake or misleading reviews",
              "We flag known issues with products even when they have affiliate links",
              "All product recommendations are based on genuine research",
            ].map((point, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#0d9488", fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AdSense */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "28px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px" }}>Google AdSense</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85 }}>
            We may also display advertisements through Google AdSense. These are paid advertisements and are separate from our affiliate links and editorial content.
          </p>
        </div>

        {/* Questions */}
        <div style={{ background: "#F8FAFC", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px 28px" }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1C1C1E", marginBottom: 10 }}>Questions?</h2>
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>
            If you have any questions about our affiliate relationships or how we earn income, please contact us at{" "}
            <a href="mailto:hello@smartkharido.in" style={{ color: "#0d9488", fontWeight: 600 }}>hello@smartkharido.in</a>.
            {" "}We believe in full transparency with our readers.
          </p>
        </div>
      </div>
    </div>
  );
}