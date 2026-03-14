import Link from "next/link";

type ScoreItem = { label: string; score: number };
type Section = { id: string; title: string; icon: string; score: number; image?: string; content: string };
type ReviewProduct = {
  name: string; price: string; overallRating: number;
  amazon: string; flipkart: string; image?: string; verdict: string;
  pros: string[]; cons: string[]; prosTitle: string;
  scores: ScoreItem[]; specs: { label: string; value: string }[]; sections: Section[];
};

function ReviewScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 9 ? "#16a34a" : score >= 7 ? "#0d9488" : "#f59e0b";
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color }}>{score}/10</span>
      </div>
      <div style={{ height: 7, background: "#E5E4E0", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score * 10}%`, background: color, borderRadius: 10 }} />
      </div>
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  const paragraphs = section.content.trim().split("\n\n");
  return (
    <div id={section.id} style={{ marginBottom: 40, background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      {/* Section header */}
      <div style={{ background: "linear-gradient(90deg,#1C1C1E,#2a2a2d)", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>{section.icon}</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{section.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(13,148,136,0.2)", padding: "4px 12px", borderRadius: 100, flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: "#0d9488" }}>{section.score}</span>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>/10</span>
        </div>
      </div>

      {/* Image + first paragraph: side by side desktop, stacked mobile */}
      {section.image && (
        <div className="section-image-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ overflow: "hidden", maxHeight: 240 }}>
            <img src={section.image} alt={section.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 180 }} />
          </div>
          <div style={{ padding: "20px", background: "#FAFAF8", display: "flex", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.85 }}>{paragraphs[0].replace(/\*\*(.*?)\*\*/g, "$1")}</p>
          </div>
        </div>
      )}

      {/* Remaining paragraphs */}
      <div style={{ padding: "20px" }}>
        {paragraphs.slice(section.image ? 1 : 0).map((para, i) => {
          if (para.startsWith("**") && para.includes("verdict:**")) {
            return (
              <div key={i} style={{ background: "#F0FDF9", border: "1px solid #b2ddd8", borderRadius: 10, padding: "12px 16px", marginTop: 8 }}>
                <p style={{ margin: 0, fontSize: 14, color: "#065F46", fontWeight: 600, lineHeight: 1.7 }}>✅ {para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
              </div>
            );
          }
          return <p key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
        })}
      </div>
    </div>
  );
}

export default function ReviewLayout({ post }: { post: any }) {
  const rp: ReviewProduct = post.reviewProduct;
  if (!rp) return null;

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 20px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 18 }}>← Back to all guides</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "4px 12px", borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", backgroundColor: "#F5F3FF", padding: "4px 12px", borderRadius: 100 }}>In-Depth Review</span>
            <span style={{ fontSize: 12, color: "#bbb" }}>· {post.readTime} read</span>
          </div>
          <h1 style={{ fontSize: "clamp(20px, 3.2vw, 34px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.25, letterSpacing: "-0.5px", marginBottom: 12 }}>{post.title}</h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginBottom: 0, maxWidth: 700 }}>{post.excerpt}</p>

          {/* TOC — wraps nicely on mobile */}
          <div style={{ display: "flex", gap: 6, marginTop: 20, flexWrap: "wrap" as const, paddingBottom: 0 }}>
            {(rp.sections || []).map(s => (
              <a key={s.id} href={`#${s.id}`} style={{ fontSize: 12, fontWeight: 600, color: "#0d9488", background: "#E6F7F5", padding: "6px 12px", borderRadius: 100, textDecoration: "none" }}>{s.icon} {s.title}</a>
            ))}
            <a href="#verdict" style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: "#0d9488", padding: "6px 12px", borderRadius: 100, textDecoration: "none" }}>⚖️ Verdict ↓</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* Overview card */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 40 }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(90deg,#1C1C1E,#2a2a2d)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{rp.name} <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 400 }}>Full Review</span></span>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase" as const, letterSpacing: 1 }}>SmartKharido Score</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 1, justifyContent: "flex-end" }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: "#0d9488" }}>{rp.overallRating}</span>
                <span style={{ fontSize: 13, color: "#666", marginLeft: 1 }}>/10</span>
              </div>
            </div>
          </div>

          {/* Image + scores: side by side desktop, stacked mobile */}
          <div className="overview-grid" style={{ display: "grid", gridTemplateColumns: rp.image ? "2fr 3fr" : "1fr" }}>
            {rp.image && (
              <div style={{ overflow: "hidden", borderRight: "1px solid #F3F4F6", maxHeight: 320 }}>
                <img src={rp.image} alt={rp.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 200 }} />
              </div>
            )}
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>Category Scores</div>
                {(rp.scores || []).map(s => <ReviewScoreBar key={s.label} label={s.label} score={s.score} />)}
              </div>
              <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "14px 16px", border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Current Price</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: "#1C1C1E" }}>{rp.price}</span>
                </div>
                <div className="buy-buttons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <a href={rp.amazon} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#FF9900", color: "#fff", padding: "11px 10px", borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>🛒 Amazon</a>
                  <a href={rp.flipkart} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#2874F0", color: "#fff", padding: "11px 10px", borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>🛒 Flipkart</a>
                </div>
              </div>
            </div>
          </div>

          {/* Specs — scrollable on mobile */}
          <div style={{ borderTop: "1px solid #F3F4F6" }}>
            <div style={{ background: "#1C1C1E", padding: "9px 20px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1.2 }}>Full Specifications</span>
            </div>
            <div className="specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {(rp.specs || []).map((spec, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: i % 2 === 0 ? "#fff" : "#FAFAF8", borderBottom: "1px solid #F3F4F6", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, flexShrink: 0 }}>{spec.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1E", textAlign: "right" as const }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pros / Cons */}
        <div className="pros-cons-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
          <div style={{ background: "#F0FDF9", borderRadius: 16, padding: "18px", border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>✓ {rp.prosTitle || "What we love"}</div>
            {(rp.pros || []).map((pro, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontSize: 13, color: "#166534", lineHeight: 1.55 }}>{pro}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFF7ED", borderRadius: 16, padding: "18px", border: "1px solid #fed7aa" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>✗ Watch out for</div>
            {(rp.cons || []).map((con, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: "#ea580c", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✗</span>
                <span style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.55 }}>{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep dive sections */}
        {(rp.sections || []).map(section => <SectionCard key={section.id} section={section} />)}

        {/* Final Verdict */}
        <div id="verdict" style={{ marginBottom: 40, background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ background: "linear-gradient(90deg,#0d9488,#0f766e)", padding: "14px 20px" }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>⚖️ Final Verdict</span>
          </div>
          <div style={{ padding: "24px 20px" }}>
            <div className="verdict-inner" style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 22 }}>
              <div style={{ textAlign: "center" as const, background: "#F0FDF9", borderRadius: 14, padding: "14px 20px", border: "1px solid #b2ddd8", flexShrink: 0 }}>
                <div style={{ fontSize: 38, fontWeight: 900, color: "#0d9488", lineHeight: 1 }}>{rp.overallRating}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>out of 10</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0d9488", marginTop: 3 }}>SmartKharido</div>
              </div>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.85, margin: 0 }}>{rp.verdict}</p>
            </div>
            <div className="buy-buttons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <a href={rp.amazon} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#FF9900", color: "#fff", padding: "13px 12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Amazon</a>
              <a href={rp.flipkart} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#2874F0", color: "#fff", padding: "13px 12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Flipkart</a>
            </div>
            <p style={{ fontSize: 11, color: "#C4C4C4", marginTop: 12, textAlign: "center" as const }}>
              Contains affiliate links — we earn a small commission at no extra cost to you. <Link href="/affiliate-disclosure" style={{ color: "#C4C4C4", textDecoration: "underline" }}>Disclosure</Link>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "32px 24px", background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", borderRadius: 20, textAlign: "center" as const, color: "#fff" }}>
          <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Looking for more options?</p>
          <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 22 }}>Browse all our honest buying guides for Indian buyers</p>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#fff", color: "#0d9488", fontWeight: 800, fontSize: 14, padding: "13px 28px", borderRadius: 12, textDecoration: "none" }}>Browse All Guides →</Link>
        </div>
      </div>

      {/* ── Mobile responsive styles ── */}
      <style>{`
        @media (max-width: 640px) {

          /* Overview: image + scores stack vertically */
          .overview-grid {
            grid-template-columns: 1fr !important;
          }

          /* Specs: single column on mobile */
          .specs-grid {
            grid-template-columns: 1fr !important;
          }

          /* Pros/Cons: stack vertically */
          .pros-cons-grid {
            grid-template-columns: 1fr !important;
          }

          /* Section image + text: stack vertically */
          .section-image-grid {
            grid-template-columns: 1fr !important;
          }

          /* Buy buttons: full width stack */
          .buy-buttons {
            grid-template-columns: 1fr !important;
          }

          /* Verdict: score box + text stack vertically */
          .verdict-inner {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .verdict-inner > div:first-child {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 12px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}