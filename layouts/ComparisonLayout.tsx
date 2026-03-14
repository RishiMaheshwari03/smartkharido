import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

type Spec = { label: string; value: string; rating?: number };
type Product = {
  name: string; best: string; display: string; battery: string;
  price: string; amazon: string; flipkart: string;
  overallRating: number; verdict: string; image?: string;
  specs: Spec[]; pros: string[]; cons: string[]; buyerProfile: string;
};

function StarBar({ score }: { score: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ width: 13, height: 5, borderRadius: 3, background: i < score ? "#0d9488" : "#3a3a3c" }} />
        ))}
      </div>
      <span style={{ fontSize: 12, fontWeight: 800, color: "#0d9488" }}>{score}/10</span>
    </div>
  );
}

function DotRating({ rating }: { rating: number }) {
  const filled = Math.round(rating / 2);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i < filled ? "#0d9488" : "#E5E4E0" }} />
      ))}
      <span style={{ fontSize: 10, color: "#aaa", marginLeft: 2 }}>{rating}/10</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const specs = product.specs || [];
  const pros = product.pros || [];
  const cons = product.cons || [];
  return (
    <div className="product-card" style={{ marginBottom: 48, borderRadius: 20, overflow: "hidden", border: "1px solid #E5E4E0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      {/* Card header */}
      <div style={{ background: "linear-gradient(90deg,#1C1C1E,#2a2a2d)", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: "#fff", flexShrink: 0 }}>{index + 1}</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", lineHeight: 1.2 }}>{product.name}</div>
            <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, marginTop: 2 }}>🏆 {product.best}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" as const }}>
          <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 2 }}>Overall Rating</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1, justifyContent: "flex-end", marginBottom: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#0d9488", lineHeight: 1 }}>{product.overallRating}</span>
            <span style={{ fontSize: 13, color: "#666", marginLeft: 2 }}>/10</span>
          </div>
          <StarBar score={product.overallRating} />
        </div>
      </div>

      {/* Card body */}
      <div style={{ background: "#fff", padding: "20px" }}>
        {/* Verdict */}
        <div style={{ background: "#F0FDF9", border: "1px solid #b2ddd8", borderRadius: 12, padding: "13px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>💬</span>
          <p style={{ margin: 0, fontSize: 14, color: "#065F46", lineHeight: 1.7 }}>
            <strong style={{ fontWeight: 700 }}>Our verdict: </strong>{product.verdict}
          </p>
        </div>

        {/* Image + specs: side by side on desktop, stacked on mobile */}
        <div className="image-specs-grid" style={{ display: "grid", gridTemplateColumns: product.image ? "1fr 1fr" : "1fr", gap: 16, marginBottom: 18, alignItems: "stretch" }}>
          {product.image && (
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #E5E4E0", minHeight: 200 }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #E5E4E0" }}>
            <div style={{ background: "#1C1C1E", padding: "9px 14px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase" as const, letterSpacing: 1.2 }}>Specifications</span>
            </div>
            {specs.map((spec, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 14px", background: i % 2 === 0 ? "#fff" : "#FAFAF8", borderBottom: i < specs.length - 1 ? "1px solid #F3F4F6" : "none", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, flexShrink: 0 }}>{spec.label}</span>
                <div style={{ textAlign: "right" as const }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1E" }}>{spec.value}</div>
                  {spec.rating !== undefined && <DotRating rating={spec.rating} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pros / Cons: side by side desktop, stacked mobile */}
        <div className="pros-cons-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#F0FDF9", borderRadius: 12, padding: "14px 16px", border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#15803d", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10 }}>✓ Why we like it</div>
            {pros.map((pro, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 7 }}>
                <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontSize: 13, color: "#166534", lineHeight: 1.55 }}>{pro}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFF7ED", borderRadius: 12, padding: "14px 16px", border: "1px solid #fed7aa" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#c2410c", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10 }}>✗ Where it falls short</div>
            {cons.map((con, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 7 }}>
                <span style={{ color: "#ea580c", fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✗</span>
                <span style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.55 }}>{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who should buy */}
        <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "11px 14px", marginBottom: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>👤 Who should buy this: </span>
          <span style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{product.buyerProfile}</span>
        </div>

        {/* Buy buttons */}
        <div className="buy-buttons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <a href={product.amazon} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "#FF9900", color: "#fff", padding: "13px 16px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Amazon</a>
          <a href={product.flipkart} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "#2874F0", color: "#fff", padding: "13px 16px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none" }}>🛒 Flipkart</a>
        </div>
      </div>
    </div>
  );
}

const mdxComponents = {
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1E", margin: "44px 0 14px", letterSpacing: "-0.4px", display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ display: "inline-block", width: 4, height: 20, background: "#0d9488", borderRadius: 2, flexShrink: 0 }} />{children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0d9488", margin: "18px 0 8px" }}>{children}</h3>,
  p: ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 14 }}>{children}</p>,
  ul: ({ children }: { children: React.ReactNode }) => <ul style={{ listStyle: "none", padding: 0, margin: "4px 0 16px" }}>{children}</ul>,
  li: ({ children }: { children: React.ReactNode }) => (
    <li style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "7px 10px", marginBottom: 4, background: "#fff", borderRadius: 8, border: "1px solid #F3F4F6", fontSize: 14, color: "#4B5563", lineHeight: 1.6 }}>
      <span style={{ color: "#0d9488", fontWeight: 800, fontSize: 11, marginTop: 3, flexShrink: 0 }}>→</span><span>{children}</span>
    </li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => <strong style={{ color: "#1C1C1E", fontWeight: 700 }}>{children}</strong>,
  em: ({ children }: { children: React.ReactNode }) => <em style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}>{children}</em>,
  hr: () => <hr style={{ border: "none", borderTop: "1px solid #E5E4E0", margin: "40px 0" }} />,
  table: () => null, thead: () => null, tbody: () => null, th: () => null, td: () => null, tr: () => null,
};

export default function ComparisonLayout({ post }: { post: any }) {
  const products: Product[] = post.products || [];
  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 20px 28px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 18 }}>← Back to all guides</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" as const }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "4px 12px", borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: 12, color: "#bbb" }}>· {post.readTime} read · {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <h1 style={{ fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.25, letterSpacing: "-0.5px", marginBottom: 12 }}>{post.title}</h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginBottom: 16, maxWidth: 680 }}>{post.excerpt}</p>
          <div className="badge-row" style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 10 }}>
            {["✅ Amazon India verified", "✅ Flipkart verified", "✅ Indian service checked"].map(b => (
              <span key={b} style={{ fontSize: 12, color: "#065F46", backgroundColor: "#ECFDF5", padding: "4px 12px", borderRadius: 100, fontWeight: 600 }}>{b}</span>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#C4C4C4", margin: 0 }}>Contains affiliate links — commission at no extra cost to you. <Link href="/affiliate-disclosure" style={{ color: "#C4C4C4", textDecoration: "underline" }}>Disclosure</Link></p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* Quick Comparison Table — scrollable on mobile */}
        {products.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 14, letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 4, height: 20, background: "#0d9488", borderRadius: 2, flexShrink: 0 }} />
              Quick Comparison — All {products.length} Picks
            </h2>
            {/* Wrapper div enables horizontal scroll on mobile only */}
            <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid #E5E4E0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <table style={{ width: "100%", minWidth: 520, borderCollapse: "collapse", fontSize: 13, background: "#fff" }}>
                <thead>
                  <tr style={{ background: "#1C1C1E" }}>
                    {["#", "Product", "Best For", "Rating", "Price", "Buy"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left" as const, fontWeight: 700, color: "#fff", fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.5px", whiteSpace: "nowrap" as const }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.name} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAF8" }}>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6", color: "#9CA3AF", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" as const }}>#{i + 1}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6", minWidth: 130 }}>
                        <a href={p.amazon} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: "#1C1C1E", textDecoration: "none", borderBottom: "1.5px solid #0d948860", fontSize: 12 }}>{p.name}</a>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#0d9488", fontWeight: 600, borderBottom: "1px solid #F3F4F6", fontSize: 12, minWidth: 100 }}>{p.best}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6", whiteSpace: "nowrap" as const }}>
                        <span style={{ fontWeight: 800, color: "#0d9488", fontSize: 14 }}>{p.overallRating}</span>
                        <span style={{ color: "#9CA3AF", fontSize: 11 }}>/10</span>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#374151", borderBottom: "1px solid #F3F4F6", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap" as const }}>{p.price}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6", whiteSpace: "nowrap" as const }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <a href={p.amazon} target="_blank" rel="noopener noreferrer" style={{ background: "#FF9900", color: "#fff", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>Amazon</a>
                          <a href={p.flipkart} target="_blank" rel="noopener noreferrer" style={{ background: "#2874F0", color: "#fff", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>Flipkart</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "#B0B0B0", marginTop: 8 }}>Prices change daily — check both platforms before buying.</p>
          </div>
        )}

        {/* MDX content */}
        <MDXRemote source={post.content} components={mdxComponents} />

        {/* Product cards */}
        {products.map((product, i) => <ProductCard key={product.name} product={product} index={i} />)}

        {/* Final Verdict — scrollable on mobile */}
        <div id="final-verdict" style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 4, letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 4, height: 20, background: "#0d9488", borderRadius: 2, flexShrink: 0 }} />Final Verdict
          </h2>
          <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 14 }}>Click any product name to check the current price on Amazon India.</p>
          <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid #E5E4E0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", minWidth: 340, borderCollapse: "collapse", fontSize: 14, background: "#fff" }}>
              <thead>
                <tr style={{ background: "#1C1C1E" }}>
                  <th style={{ padding: "12px 18px", textAlign: "left" as const, color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, width: "45%" }}>Your Priority</th>
                  <th style={{ padding: "12px 18px", textAlign: "left" as const, color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const }}>Best Pick</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAF8" }}>
                    <td style={{ padding: "13px 18px", color: "#374151", borderBottom: "1px solid #F3F4F6", fontWeight: 500, fontSize: 13 }}>{p.best}</td>
                    <td style={{ padding: "13px 18px", borderBottom: "1px solid #F3F4F6" }}>
                      <a href={p.amazon} target="_blank" rel="noopener noreferrer" style={{ color: "#0d9488", fontWeight: 700, textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4 }}>
                        {p.name} <span style={{ opacity: 0.6 }}>→</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "32px 24px", background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", borderRadius: 20, textAlign: "center" as const, color: "#fff" }}>
          <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.3px" }}>Found this guide helpful?</p>
          <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 22 }}>Browse more honest buying guides for Indian buyers</p>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#fff", color: "#0d9488", fontWeight: 800, fontSize: 14, padding: "13px 28px", borderRadius: 12, textDecoration: "none" }}>Browse All Guides →</Link>
        </div>
      </div>

      {/* ── Mobile responsive styles ── */}
      <style>{`
        @media (max-width: 640px) {

          /* Image + specs: stack vertically on mobile */
          .image-specs-grid {
            grid-template-columns: 1fr !important;
          }

          /* Pros / Cons: stack vertically on mobile */
          .pros-cons-grid {
            grid-template-columns: 1fr !important;
          }

          /* Buy buttons: full width stack on mobile */
          .buy-buttons {
            grid-template-columns: 1fr !important;
          }

          /* Product card header: stack name + rating vertically */
          .product-card > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          /* Star bar on mobile: slightly smaller */
          .product-card > div:first-child > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}