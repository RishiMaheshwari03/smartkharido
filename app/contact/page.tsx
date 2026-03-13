import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the SmartKharido team. We'd love to hear your questions, feedback, or suggestions.",
};

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh", padding: "64px 24px" } as React.CSSProperties,
  wrap: { maxWidth: 720, margin: "0 auto" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 12, fontWeight: 600, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "6px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: 0.3 } as React.CSSProperties,
  h1: { fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 16 } as React.CSSProperties,
  lead: { fontSize: 16, color: "#666", lineHeight: 1.75, marginBottom: 40 } as React.CSSProperties,
  card: { backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 20, padding: "40px 36px", marginBottom: 24 } as React.CSSProperties,
  h2: { fontSize: 18, fontWeight: 700, color: "#1C1C1E", marginBottom: 8 } as React.CSSProperties,
  p: { fontSize: 14, color: "#888", lineHeight: 1.75, marginBottom: 0 } as React.CSSProperties,
  emailLink: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, color: "#0d9488", textDecoration: "none", marginTop: 12 } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 8 } as React.CSSProperties,
  infoCard: { backgroundColor: "#F7F6F3", border: "1px solid #E5E4E0", borderRadius: 14, padding: "20px" } as React.CSSProperties,
  infoIcon: { fontSize: 20, marginBottom: 8, display: "block" } as React.CSSProperties,
  infoTitle: { fontSize: 13, fontWeight: 700, color: "#1C1C1E", marginBottom: 4 } as React.CSSProperties,
  infoText: { fontSize: 13, color: "#999", lineHeight: 1.6 } as React.CSSProperties,
};

export default function ContactPage() {
  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.tag}>Contact Us</span>
        <h1 style={s.h1}>We'd Love to Hear From You</h1>
        <p style={s.lead}>
          Have a question about a product we reviewed? Found outdated information? Want to suggest a product category? Reach out — we read every message.
        </p>

        <div style={s.card}>
          <h2 style={s.h2}>📧 Email Us</h2>
          <p style={s.p}>
            The best way to reach us is by email. We typically respond within 2–3 business days.
          </p>
          <a href="mailto:hello@smartkharido.in" style={s.emailLink}>
            hello@smartkharido.in →
          </a>
        </div>

        <div style={s.grid}>
          {[
            { icon: "🐛", title: "Found an Error?", text: "If any product info, price, or link in our guides is outdated or wrong, please let us know." },
            { icon: "💡", title: "Suggest a Guide", text: "Want us to review a specific product category? We take suggestions seriously." },
            { icon: "🤝", title: "Business Inquiries", text: "For partnerships or collaborations, email us with the subject line: Business Inquiry." },
            { icon: "⚠️", title: "Privacy Concerns", text: "For any concerns related to your data or our Privacy Policy, email us directly." },
          ].map(item => (
            <div key={item.title} style={s.infoCard}>
              <span style={s.infoIcon}>{item.icon}</span>
              <p style={s.infoTitle}>{item.title}</p>
              <p style={s.infoText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: "24px", backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 14 }}>
          <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.75 }}>
            <strong style={{ color: "#888" }}>Please note:</strong> We are a small independent team. We do not accept sponsored posts, paid reviews, or payment to feature products. Our editorial independence is non-negotiable.
          </p>
        </div>
      </div>
    </div>
  );
}