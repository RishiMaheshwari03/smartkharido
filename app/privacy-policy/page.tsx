import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SmartKharido Privacy Policy — how we collect, use, and protect your information.",
};

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh", padding: "64px 24px" } as React.CSSProperties,
  wrap: { maxWidth: 720, margin: "0 auto" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 12, fontWeight: 600, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "6px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: 0.3 } as React.CSSProperties,
  h1: { fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 16 } as React.CSSProperties,
  updated: { fontSize: 13, color: "#aaa", marginBottom: 40, borderBottom: "1px solid #E5E4E0", paddingBottom: 40 } as React.CSSProperties,
  h2: { fontSize: 19, fontWeight: 700, color: "#1C1C1E", letterSpacing: "-0.3px", marginBottom: 10, marginTop: 36 } as React.CSSProperties,
  p: { fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
  ul: { paddingLeft: 20, marginBottom: 14 } as React.CSSProperties,
  li: { fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 6 } as React.CSSProperties,
  highlight: { backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 14, padding: "20px 24px", marginTop: 16, marginBottom: 16 } as React.CSSProperties,
};

export default function PrivacyPolicyPage() {
  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.tag}>Legal</span>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.updated}>Last updated: March 2025</p>

        <p style={s.p}>
          This Privacy Policy explains how SmartKharido ("we", "us", or "our") collects, uses, and protects information when you visit our website at smartkharido.in (the "Site"). By using this Site, you agree to the practices described in this policy.
        </p>

        <h2 style={s.h2}>1. Information We Collect</h2>
        <p style={s.p}>We may collect the following types of information:</p>
        <ul style={s.ul}>
          <li style={s.li}><strong>Usage Data:</strong> Pages visited, time spent on site, browser type, device type, and referring URL — collected automatically via analytics tools.</li>
          <li style={s.li}><strong>Contact Information:</strong> If you email us, we collect your email address and the content of your message.</li>
          <li style={s.li}><strong>Cookies:</strong> We use cookies to understand how visitors use our site and to improve your experience.</li>
        </ul>

        <h2 style={s.h2}>2. How We Use Your Information</h2>
        <p style={s.p}>We use collected information to:</p>
        <ul style={s.ul}>
          <li style={s.li}>Understand how our content is being used and improve it</li>
          <li style={s.li}>Respond to your messages and inquiries</li>
          <li style={s.li}>Monitor and improve website performance</li>
          <li style={s.li}>Comply with legal obligations</li>
        </ul>
        <p style={s.p}>We do not sell, trade, or rent your personal information to third parties.</p>

        <h2 style={s.h2}>3. Google AdSense & Advertising</h2>
        <p style={s.p}>
          We may display advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to our site and other sites on the internet. You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" style={{ color: "#0d9488" }}>Google's Ad Settings</a>.
        </p>

        <h2 style={s.h2}>4. Affiliate Links</h2>
        <div style={s.highlight}>
          <p style={{ ...s.p, marginBottom: 0 }}>
            SmartKharido participates in affiliate programs including the Amazon India Associates Program and Flipkart Affiliate Program. When you click affiliate links on our site and make a purchase, we may earn a small commission. This does not affect the price you pay. Please see our full <a href="/affiliate-disclosure" style={{ color: "#0d9488", fontWeight: 600 }}>Affiliate Disclosure</a> for details.
          </p>
        </div>

        <h2 style={s.h2}>5. Third-Party Links</h2>
        <p style={s.p}>
          Our site contains links to third-party websites including Amazon India and Flipkart. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.
        </p>

        <h2 style={s.h2}>6. Cookies</h2>
        <p style={s.p}>
          We use cookies to analyse website traffic and improve user experience. You can instruct your browser to refuse cookies or alert you when cookies are being sent. However, some parts of our site may not function properly without cookies.
        </p>

        <h2 style={s.h2}>7. Data Security</h2>
        <p style={s.p}>
          We take reasonable measures to protect any information collected. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.
        </p>

        <h2 style={s.h2}>8. Children's Privacy</h2>
        <p style={s.p}>
          Our site is not directed to children under the age of 13. We do not knowingly collect personal information from children.
        </p>

        <h2 style={s.h2}>9. Changes to This Policy</h2>
        <p style={s.p}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy.
        </p>

        <h2 style={s.h2}>10. Contact Us</h2>
        <p style={s.p}>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@smartkharido.in" style={{ color: "#0d9488" }}>hello@smartkharido.in</a>.
        </p>
      </div>
    </div>
  );
}