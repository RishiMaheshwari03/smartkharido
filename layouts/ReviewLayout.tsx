import Link from "next/link";

type ScoreItem = { label: string; score: number };
type Section = { id: string; title: string; icon: string; score: number; image?: string; content: string };
type ReviewProduct = {
  name: string; price: string; overallRating: number;
  amazon: string; flipkart: string; image?: string; verdict: string;
  pros: string[]; cons: string[]; prosTitle: string;
  scores: ScoreItem[]; specs: { label: string; value: string }[]; sections: Section[];
};

// Circular score meter
function ScoreMeter({ score, size = 88 }: { score: number; size?: number }) {
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const color = score >= 9 ? "#16a34a" : score >= 7 ? "#0d9488" : "#f59e0b";
  const bgColor = score >= 9 ? "#F0FDF4" : score >= 7 ? "#E6F7F5" : "#FFFBEB";

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative" as const, width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={radius} fill={bgColor} stroke="#E5E4E0" strokeWidth={strokeWidth} />
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`} strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute" as const, inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 600 }}>/10</span>
        </div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1 }}>SmartKharido Score</span>
    </div>
  );
}

// Fix 2 — Unique score cards: bold score hero + colored bottom accent bar + verdict badge
function ScoreCards({ scores }: { scores: ScoreItem[] }) {
  const icons: Record<string, string> = {
    display: "🖥️", camera: "📷", battery: "⚡", performance: "🚀",
    "build quality": "🏗️", "value for money": "💰", design: "✨",
    software: "📱", audio: "🎵", gaming: "🎮",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
      {scores.map(({ label, score }) => {
        const color = score >= 9 ? "#16a34a" : score >= 7 ? "#0d9488" : "#f59e0b";
        const bg = score >= 9 ? "#F0FDF4" : score >= 7 ? "#F0FDFB" : "#FFFBEB";
        const verdict = score >= 9 ? "Excellent" : score >= 8 ? "Great" : score >= 7 ? "Good" : score >= 5 ? "Average" : "Poor";
        const icon = icons[label.toLowerCase()] || "⭐";

        return (
          <div key={label} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            {/* Top colored accent */}
            <div style={{ height: 4, background: color }} />
            <div style={{ padding: "14px 12px 12px" }}>
              {/* Icon + label */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", lineHeight: 1.2 }}>{label}</span>
              </div>
              {/* Score hero */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>/10</span>
              </div>
              {/* Verdict badge */}
              <div style={{ display: "inline-flex", alignItems: "center", background: bg, borderRadius: 100, padding: "3px 10px" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color }}>{verdict}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  const paragraphs = section.content.trim().split("\n\n");
  return (
    <div id={section.id} style={{ marginBottom: 40, background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
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
      {section.image && (
        <div style={{ width: "100%", aspectRatio: "16/6", overflow: "hidden" }}>
          <img src={section.image} alt={section.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}
      <div style={{ padding: "20px" }}>
        {paragraphs.map((para, i) => {
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
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 20px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 18 }}>← Back to all guides</Link>

          <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "4px 12px", borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", backgroundColor: "#F5F3FF", padding: "4px 12px", borderRadius: 100 }}>In-Depth Review</span>
            <span style={{ fontSize: 12, color: "#bbb", whiteSpace: "nowrap" as const }}>· {post.readTime} read</span>
            <span style={{ fontSize: 12, color: "#bbb", whiteSpace: "nowrap" as const }}>· {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          <h1 style={{ fontSize: "clamp(20px, 3.2vw, 34px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.25, letterSpacing: "-0.5px", marginBottom: 12 }}>{post.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#fff", flexShrink: 0 }}>SK</div>
            <span style={{ fontSize: 13, color: "#6B7280" }}>By <strong style={{ color: "#374151", fontWeight: 700 }}>SmartKharido Team</strong> · Independently reviewed</span>
          </div>

          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginBottom: 20, maxWidth: 700 }}>{post.excerpt}</p>

          {/* Fix 1 — TOC as pill badges, all same color, wrapping grid */}
          <div style={{ marginBottom: 4 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>Jump to section</p>
            <div className="toc-wrap" style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
              {(rp.sections || []).map(s => (
                <a key={s.id} href={`#${s.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#1C1C1E", background: "#F7F6F3", padding: "9px 16px", borderRadius: 100, textDecoration: "none", border: "1px solid #E5E4E0" }}>
                  <span style={{ fontSize: 15 }}>{s.icon}</span>
                  {s.title}
                </a>
              ))}
              {/* Fix 1 — Final Verdict same style as other pills, no different color */}
              <a href="#verdict" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#1C1C1E", background: "#F7F6F3", padding: "9px 16px", borderRadius: 100, textDecoration: "none", border: "1px solid #E5E4E0" }}>
                <span style={{ fontSize: 15 }}>⚖️</span>
                Final Verdict
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* Overview card */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 40 }}>

          <div style={{ background: "linear-gradient(90deg,#1C1C1E,#2a2a2d)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>{rp.name}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3 }}>Full In-Depth Review</div>
            </div>
            <ScoreMeter score={rp.overallRating} size={88} />
          </div>

          {rp.image && (
            <div style={{ width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
              <img src={rp.image} alt={rp.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}

          <div style={{ padding: "24px 20px" }}>
            {/* Fix 2 — Score cards with top accent bar + big number + verdict badge */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 14 }}>Category Scores</div>
              <ScoreCards scores={rp.scores || []} />
            </div>

            {/* Price + buy */}
            <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "14px 16px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "#6B7280" }}>Current Price</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: "#1C1C1E" }}>{rp.price}</span>
              </div>
              <div className="buy-buttons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <a href={rp.amazon} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#FF9900", color: "#fff", padding: "11px 10px", borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Amazon</a>
                <a href={rp.flipkart} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#2874F0", color: "#fff", padding: "11px 10px", borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Flipkart</a>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div style={{ borderTop: "1px solid #F3F4F6" }}>
            <div style={{ background: "#1C1C1E", padding: "9px 20px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1.2 }}>Full Specifications</span>
            </div>
            {(rp.specs || []).map((spec, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", background: i % 2 === 0 ? "#fff" : "#FAFAF8", borderBottom: "1px solid #F3F4F6", gap: 16 }}>
                <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{spec.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1E", textAlign: "right" as const }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros / Cons */}
        <div className="pros-cons-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
          <div style={{ background: "#F0FDF9", borderRadius: 16, padding: "18px", border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>✓ {rp.prosTitle || "What we love"}</div>
            {(rp.pros || []).map((pro, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 3 }}>✓</span>
                <span style={{ fontSize: 14, color: "#166534", lineHeight: 1.6 }}>{pro}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFF7ED", borderRadius: 16, padding: "18px", border: "1px solid #fed7aa" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>✗ Watch out for</div>
            {(rp.cons || []).map((con, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ color: "#ea580c", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 3 }}>✗</span>
                <span style={{ fontSize: 14, color: "#9a3412", lineHeight: 1.6 }}>{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section deep dives */}
        {(rp.sections || []).map(section => <SectionCard key={section.id} section={section} />)}

        {/* Final Verdict */}
        <div id="verdict" style={{ marginBottom: 40, background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ background: "linear-gradient(90deg,#0d9488,#0f766e)", padding: "14px 20px" }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>⚖️ Final Verdict</span>
          </div>
          <div style={{ padding: "24px 20px" }}>
            <div className="verdict-inner" style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 22 }}>
              <div style={{ flexShrink: 0 }}>
                <ScoreMeter score={rp.overallRating} size={88} />
              </div>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.85, margin: 0 }}>{rp.verdict}</p>
            </div>
            <div className="buy-buttons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <a href={rp.amazon} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#FF9900", color: "#fff", padding: "13px 12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Amazon</a>
              <a href={rp.flipkart} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#2874F0", color: "#fff", padding: "13px 12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Flipkart</a>
            </div>
            <p style={{ fontSize: 11, color: "#C4C4C4", marginTop: 12, textAlign: "center" as const }}>Contains affiliate links — we earn a small commission at no extra cost to you. <Link href="/affiliate-disclosure" style={{ color: "#C4C4C4", textDecoration: "underline" }}>Disclosure</Link></p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "32px 24px", background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", borderRadius: 20, textAlign: "center" as const, color: "#fff" }}>
          <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Looking for more options?</p>
          <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 22 }}>Browse all our honest buying guides for Indian buyers</p>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#fff", color: "#0d9488", fontWeight: 800, fontSize: 14, padding: "13px 28px", borderRadius: 12, textDecoration: "none" }}>Browse All Guides →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pros-cons-grid { grid-template-columns: 1fr !important; }
          .buy-buttons { grid-template-columns: 1fr !important; }
          .verdict-inner { flex-direction: column !important; align-items: center !important; }
          .score-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}