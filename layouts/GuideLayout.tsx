import Link from "next/link";

type QuickAnswer = { question: string; answer: string };
type Section = { id: string; title: string; icon: string; content: string; image?: string };
type GuideData = { summary: string; quickAnswers: QuickAnswer[]; sections: Section[] };

const ACCENT_COLORS = ["#0d9488","#7c3aed","#B45309","#BE185D","#1D4ED8","#16a34a"];

function SectionCard({ section, index }: { section: Section; index: number }) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const paragraphs = section.content.trim().split("\n\n");

  const renderPara = (para: string, i: number) => {
    // Bold tier items like **1.5 to 2 litres** — description
    const boldMatch = para.match(/^\*\*(.+?)\*\*\s*[—–-]?\s*([\s\S]*)/);
    if (boldMatch) {
      return (
        <div key={i} style={{ marginBottom: 10, padding: "14px 16px", background: "#F7F6F3", borderRadius: 12, borderLeft: `4px solid ${accent}` }}>
          <div style={{ display: "inline-block", background: accent, color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 6, marginBottom: 8 }}>{boldMatch[1]}</div>
          <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.75 }}>{boldMatch[2]}</p>
        </div>
      );
    }
    // List items
    if (para.includes("→") || para.match(/^\*/m)) {
      const items = para.split("\n").filter(l => l.trim());
      return (
        <div key={i} style={{ marginBottom: 14, display: "flex", flexDirection: "column" as const, gap: 6 }}>
          {items.map((item, j) => (
            <div key={j} style={{ display: "flex", gap: 10, padding: "8px 14px", background: "#F7F6F3", borderRadius: 10 }}>
              <span style={{ color: accent, fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 1 }}>→</span>
              <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{item.replace(/^[\*\s→]+/, '')}</span>
            </div>
          ))}
        </div>
      );
    }
    return <p key={i} style={{ fontSize: 15, color: "#374151", lineHeight: 1.9, marginBottom: 16 }}>{para}</p>;
  };

  return (
    <div id={section.id} style={{ marginBottom: 36, background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
      {/* Colored top accent bar */}
      <div style={{ height: 4, background: accent }} />

      {/* Header */}
      <div style={{ padding: "20px 24px 18px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{section.icon}</div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.3px", margin: 0 }}>{section.title}</h2>
      </div>

      {/* Section image — constrained, not full bleed */}
      {section.image && (
        <div style={{ margin: "0 24px 0", borderRadius: 0, overflow: "hidden", aspectRatio: "16/7" }}>
          <img src={section.image} alt={section.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}

      <div style={{ padding: "22px 24px" }}>
        {paragraphs.map((para, i) => renderPara(para, i))}
      </div>
    </div>
  );
}

export default function GuideLayout({ post }: { post: any }) {
  const guide: GuideData = post.guide;
  if (!guide) return null;

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Dark hero */}
      <div style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2a2a2d 100%)", padding: "48px 20px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 18 }}>← Back to all guides</Link>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#BE185D", backgroundColor: "#FCE7F3", padding: "4px 12px", borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#0d9488", backgroundColor: "rgba(13,148,136,0.15)", padding: "4px 12px", borderRadius: 100 }}>📖 Buying Guide</span>
            <span style={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" as const }}>· {post.readTime} read · {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.6px", marginBottom: 14 }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#fff", flexShrink: 0 }}>SK</div>
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>By <strong style={{ color: "#fff", fontWeight: 700 }}>SmartKharido Team</strong> · Independently researched</span>
          </div>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.75, marginBottom: 28, maxWidth: 640 }}>{post.excerpt}</p>
          {/* TOC pills on dark */}
          <p style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>Jump to section</p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {(guide.sections || []).map(s => (
              <a key={s.id} href={`#${s.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.08)", padding: "8px 14px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ fontSize: 13 }}>{s.icon}</span>{s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cover image — contained to max-width, not full bleed */}
      {post.coverImage && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 0" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/7" }}>
            <img src={post.coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* Quick Summary */}
        <div style={{ background: "linear-gradient(135deg,#0d9488,#0f766e)", borderRadius: 18, padding: "24px", marginBottom: 36, display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>⚡</div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" as const, letterSpacing: 1.3, marginBottom: 8 }}>Short Answer — Read This First</p>
            <p style={{ fontSize: 15, color: "#fff", lineHeight: 1.8, margin: 0 }}>{guide.summary}</p>
          </div>
        </div>

        {/* Q&A — Magazine-style numbered insight cards */}
        {guide.quickAnswers?.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.4px", marginBottom: 4 }}>Before You Buy</h2>
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>The 4 things most Indian buyers get wrong</p>
            </div>
            <div className="qa-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {guide.quickAnswers.map((qa, i) => {
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    {/* Colored top bar */}
                    <div style={{ height: 3, background: accent }} />
                    <div style={{ padding: "18px" }}>
                      {/* Big number — full accent color, vibrant */}
                      <div style={{ fontSize: 32, fontWeight: 900, color: accent, lineHeight: 1, marginBottom: 8, fontFamily: "monospace" }}>0{i + 1}</div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#1C1C1E", lineHeight: 1.5, marginBottom: 10 }}>{qa.question}</p>
                      <div style={{ height: 1, background: "#F3F4F6", marginBottom: 10 }} />
                      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{qa.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section heading */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.4px", marginBottom: 4 }}>The Complete Guide</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>Everything you need to know before buying</p>
        </div>

        {(guide.sections || []).map((section, i) => (
          <SectionCard key={section.id} section={section} index={i} />
        ))}

        {/* CTA */}
        <div style={{ padding: "36px 28px", background: "linear-gradient(135deg,#1C1C1E 0%,#2a2a2d 100%)", borderRadius: 20, textAlign: "center" as const }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🛒</div>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.3px" }}>Ready to make a decision?</p>
          <p style={{ fontSize: 15, color: "#9CA3AF", marginBottom: 24 }}>Browse our full product comparisons and reviews for Indian buyers</p>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d9488", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 32px", borderRadius: 14, textDecoration: "none" }}>Browse All Guides →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .qa-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}