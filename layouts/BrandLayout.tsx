import Link from "next/link";

type Product = {
  name: string; rating: number; priceRange: string; verdict: string;
  amazon: string; flipkart: string; icon: string; highlight: boolean;
  pros: string[]; cons: string[]; buyIf: string; skipIf: string;
  image?: string;
};
type BrandData = {
  name: string; tagline: string; overallVerdict: string; overallRating: number;
  amazonSearch: string; flipkartSearch: string; serviceNote: string;
  products: Product[];
};

function ScoreMeter({ score, size = 88 }: { score: number; size?: number }) {
  const sw = 7, r = (size - sw) / 2, circ = 2 * Math.PI * r;
  const color = score >= 9 ? "#16a34a" : score >= 7 ? "#0d9488" : "#f59e0b";
  const bg    = score >= 9 ? "#F0FDF4" : score >= 7 ? "#E6F7F5" : "#FFFBEB";
  return (
    <div style={{ position: "relative" as const, width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill={bg} stroke="rgba(255,255,255,0.1)" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={`${(score/10)*circ} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute" as const, inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 9, color: "#9CA3AF" }}>/10</span>
      </div>
    </div>
  );
}

// Fix: use grid with fixed item width so long labels don't break alignment
function ScoreCards({ products }: { products: Product[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
      {products.map((p, i) => {
        const color   = p.rating >= 9 ? "#16a34a" : p.rating >= 7 ? "#0d9488" : "#f59e0b";
        const bg      = p.rating >= 9 ? "#F0FDF4" : p.rating >= 7 ? "#F0FDFB" : "#FFFBEB";
        const verdict = p.rating >= 9 ? "Excellent" : p.rating >= 8 ? "Great" : p.rating >= 7 ? "Good" : "Average";
        // Shorten label so it always fits on 2 lines max
        const shortLabel = p.name.replace("Juicers and Citrus Presses", "Juicers").replace("and Citrus Presses","");
        return (
          <a key={i} href={`#product-${i}`} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E4E0", overflow: "hidden", height: "100%" }}>
              <div style={{ height: 4, background: color }} />
              <div style={{ padding: "14px 10px 12px", textAlign: "center" as const, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 0.5, lineHeight: 1.3, margin: 0, minHeight: 28 }}>{shortLabel}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{p.rating}</span>
                  <span style={{ fontSize: 10, color: "#9CA3AF" }}>/10</span>
                </div>
                <div style={{ background: bg, borderRadius: 100, padding: "2px 10px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color }}>{verdict}</span>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const color   = product.rating >= 9 ? "#16a34a" : product.rating >= 7 ? "#0d9488" : "#f59e0b";
  const bg      = product.rating >= 9 ? "#F0FDF4" : product.rating >= 7 ? "#F0FDFB" : "#FFFBEB";
  const headerBg = product.highlight ? "linear-gradient(135deg,#0d9488,#0f766e)" : "linear-gradient(135deg,#1C1C1E,#2a2a2d)";

  return (
    <div id={`product-${index}`} style={{ marginBottom: 40, background: "#fff", borderRadius: 20, overflow: "hidden", border: product.highlight ? "2px solid #0d9488" : "1px solid #E5E4E0", boxShadow: product.highlight ? "0 6px 32px rgba(13,148,136,0.12)" : "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ background: headerBg, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{product.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" }}>{product.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{product.priceRange}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {product.highlight && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.18)", borderRadius: 100, padding: "5px 12px" }}>⭐ Recommended</span>}
            <ScoreMeter score={product.rating} size={72} />
          </div>
        </div>
      </div>

      {/* Product image — contained with padding, proper ratio */}
      {product.image && (
        <div style={{ padding: "20px 24px 0" }}>
          <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "16/7" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      )}

      <div style={{ padding: "20px 24px 24px" }}>
        {/* Verdict */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: bg, borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: `1px solid ${color}20` }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💬</span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontWeight: 500, color: color === "#16a34a" ? "#166534" : color === "#0d9488" ? "#0f5e57" : "#92400e" }}>{product.verdict}</p>
        </div>

        {/* Pros / Cons */}
        <div className="pc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div style={{ background: "#F0FDF9", borderRadius: 14, padding: "16px" }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>✓ Why buy</p>
            {product.pros.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#16a34a", fontSize: 11, flexShrink: 0, marginTop: 4 }}>✓</span>
                <span style={{ fontSize: 13, color: "#166534", lineHeight: 1.6 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFF7ED", borderRadius: 14, padding: "16px" }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#c2410c", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12 }}>✗ Watch out</p>
            {product.cons.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#ea580c", fontSize: 11, flexShrink: 0, marginTop: 4 }}>✗</span>
                <span style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.6 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buy/Skip */}
        <div className="pc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div style={{ background: "#F0FDF9", borderRadius: 12, padding: "12px 16px", borderLeft: "4px solid #16a34a" }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 6 }}>Buy if</p>
            <p style={{ fontSize: 13, color: "#166534", lineHeight: 1.6, margin: 0 }}>{product.buyIf}</p>
          </div>
          <div style={{ background: "#FFF7ED", borderRadius: 12, padding: "12px 16px", borderLeft: "4px solid #ea580c" }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#c2410c", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 6 }}>Skip if</p>
            <p style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.6, margin: 0 }}>{product.skipIf}</p>
          </div>
        </div>

        {/* Buy buttons */}
        <div className="btn-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <a href={product.amazon} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#FF9900", color: "#fff", padding: "13px 12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Amazon</a>
          <a href={product.flipkart} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#2874F0", color: "#fff", padding: "13px 12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Buy on Flipkart</a>
        </div>
      </div>
    </div>
  );
}

export default function BrandLayout({ post }: { post: any }) {
  const brand: BrandData = post.brand;
  if (!brand) return null;

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Dark hero */}
      <div style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2a2a2d 100%)", padding: "48px 20px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 18 }}>← Back to all guides</Link>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#BE185D", backgroundColor: "#FCE7F3", padding: "4px 12px", borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", backgroundColor: "rgba(124,58,237,0.15)", padding: "4px 12px", borderRadius: 100 }}>🏷️ Brand Spotlight</span>
            <span style={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" as const }}>· {post.readTime} read · {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.6px", marginBottom: 14 }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#fff", flexShrink: 0 }}>SK</div>
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>By <strong style={{ color: "#fff", fontWeight: 700 }}>SmartKharido Team</strong> · Independently reviewed</span>
          </div>

          {/* Brand card in hero */}
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 22px", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{brand.name}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.65, maxWidth: 480 }}>{brand.tagline}</div>
            </div>
            <ScoreMeter score={brand.overallRating} size={80} />
          </div>

          {/* Jump pills */}
          <p style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 10 }}>Jump to product</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {(brand.products || []).map((p, i) => (
              <a key={i} href={`#product-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.08)", padding: "8px 14px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ fontSize: 13 }}>{p.icon}</span>{p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cover image — contained, not full bleed */}
      {post.coverImage && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 0" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/6" }}>
            <img src={post.coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* Verdict */}
        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #E5E4E0", padding: "24px", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 4, height: 20, background: "#0d9488", borderRadius: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 12, fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1, margin: 0 }}>SmartKharido's Verdict on {brand.name}</p>
          </div>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 16 }}>{brand.overallVerdict}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            <a href={brand.amazonSearch} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: "#92400e", background: "#FFF8EE", border: "1px solid #FFD080", padding: "8px 16px", borderRadius: 100, textDecoration: "none" }}>Browse {brand.name} on Amazon →</a>
            <a href={brand.flipkartSearch} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: "#1e40af", background: "#EEF4FF", border: "1px solid #A8C4F8", padding: "8px 16px", borderRadius: 100, textDecoration: "none" }}>Browse {brand.name} on Flipkart →</a>
          </div>
        </div>

        {/* At a Glance — fixed grid so cards always align */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.3px", marginBottom: 4 }}>At a Glance — {brand.name} Ratings</h2>
            <p style={{ fontSize: 14, color: "#9CA3AF" }}>Click any card to jump to the full product breakdown</p>
          </div>
          <ScoreCards products={brand.products || []} />
        </div>

        {/* Service note */}
        <div style={{ background: "#F0FDF9", border: "1px solid #bbf7d0", borderRadius: 14, padding: "16px 20px", marginBottom: 36, display: "flex", gap: 12 }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>🔧</span>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 4 }}>After-Sales Service in India</p>
            <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.75, margin: 0 }}>{brand.serviceNote}</p>
          </div>
        </div>

        {/* Product cards */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.3px", marginBottom: 4 }}>Product-by-Product Breakdown</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>Honest verdict on every {brand.name} kitchen product available in India</p>
        </div>
        {(brand.products || []).map((product, i) => <ProductCard key={i} product={product} index={i} />)}

        {/* CTA */}
        <div style={{ padding: "36px 28px", background: "linear-gradient(135deg,#1C1C1E 0%,#2a2a2d 100%)", borderRadius: 20, textAlign: "center" as const }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.3px" }}>Looking for more guides?</p>
          <p style={{ fontSize: 15, color: "#9CA3AF", marginBottom: 24 }}>Browse all our honest buying guides for Indian buyers</p>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d9488", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 32px", borderRadius: 14, textDecoration: "none" }}>Browse All Guides →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .pc-grid { grid-template-columns: 1fr !important; }
          .btn-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          /* On small screens, score cards go 3 columns */
          .score-card-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}