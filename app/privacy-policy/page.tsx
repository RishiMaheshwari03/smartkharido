import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SmartKharido",
  description: "SmartKharido's privacy policy — how we collect, use and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 8 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#1C1C1E", letterSpacing: "-0.5px", marginBottom: 8 }}>Privacy Policy</h1>
          {/* Updated date */}
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>Last updated: March 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 32 }}>
          This Privacy Policy explains how SmartKharido ("we", "us", or "our") collects, uses, and protects information when you visit our website at smartkharido.vercel.app (the "Site"). By using this Site, you agree to the practices described in this policy.
        </p>

        {[
          {
            num: "1", title: "Information We Collect",
            content: null,
            list: [
              { label: "Usage Data", text: "Pages visited, time spent on site, browser type, device type, and referring URL — collected automatically via analytics tools." },
              { label: "Contact Information", text: "If you email us, we collect your email address and the content of your message." },
              { label: "Cookies", text: "We use cookies to understand how visitors use our site and to improve your experience." },
            ]
          },
          {
            num: "2", title: "How We Use Your Information",
            content: "We use collected information to understand how our content is being used and improve it, respond to your messages and inquiries, monitor and improve website performance, and comply with legal obligations. We do not sell, trade, or rent your personal information to third parties.",
            list: null
          },
          {
            num: "3", title: "Google AdSense & Advertising",
            content: "We may display advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to our site and other sites on the internet. You may opt out of personalised advertising by visiting Google's Ad Settings at google.com/settings/ads.",
            list: null
          },
          {
            num: "4", title: "Affiliate Links",
            content: null,
            extra: <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, margin: 0 }}>SmartKharido participates in affiliate programs including the Amazon India Associates Program and Flipkart Affiliate Program. When you click affiliate links on our site and make a purchase, we may earn a small commission. This does not affect the price you pay. Please see our full <Link href="/affiliate-disclosure" style={{ color: "#0d9488", fontWeight: 600 }}>Affiliate Disclosure</Link> for details.</p>
          },
          {
            num: "5", title: "Third-Party Links",
            content: "Our site contains links to third-party websites including Amazon India and Flipkart. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.",
            list: null
          },
          {
            num: "6", title: "Cookies",
            content: "We use cookies to analyse website traffic and improve user experience. You can instruct your browser to refuse cookies or alert you when cookies are being sent. However, some parts of our site may not function properly without cookies.",
            list: null
          },
          {
            num: "7", title: "Data Security",
            content: "We take reasonable measures to protect any information collected. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.",
            list: null
          },
          {
            num: "8", title: "Children's Privacy",
            content: "Our site is not directed to children under the age of 13. We do not knowingly collect personal information from children.",
            list: null
          },
          {
            num: "9", title: "Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy.",
            list: null
          },
          {
            num: "10", title: "Contact Us",
            content: null,
            extra: <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, margin: 0 }}>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@smartkharido.in" style={{ color: "#0d9488", fontWeight: 600 }}>hello@smartkharido.in</a>.</p>
          },
        ].map((section, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", padding: "24px 28px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1C1C1E", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: "#0d9488", color: "#fff", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{section.num}</span>
              {section.title}
            </h2>
            {section.content && <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, margin: 0 }}>{section.content}</p>}
            {section.list && (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {section.list.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#0d9488", fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 3 }}>→</span>
                    <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}><strong style={{ fontWeight: 700 }}>{item.label}:</strong> {item.text}</span>
                  </div>
                ))}
              </div>
            )}
            {(section as any).extra}
          </div>
        ))}
      </div>
    </div>
  );
}