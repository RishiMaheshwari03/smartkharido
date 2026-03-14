import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartKharido — Best Product Buying Guides for India",
  description: "Honest buying guides for smartphones, laptops, smartwatches and home appliances in India. Research-backed recommendations for Amazon India and Flipkart.",
};

const categoryStyles: Record<string, { bg: string; color: string }> = {
  smartphones:  { bg: "#EDE9FE", color: "#6D28D9" },
  smartwatches: { bg: "#E6F7F5", color: "#0d9488" },
  laptops:      { bg: "#FEF3C7", color: "#B45309" },
  kitchen:      { bg: "#FCE7F3", color: "#BE185D" },
  headphones:   { bg: "#DBEAFE", color: "#1D4ED8" },
};

function getCategoryStyle(category: string) {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(categoryStyles)) {
    if (key.includes(k)) return v;
  }
  return { bg: "#F3F4F6", color: "#374151" };
}

// Deterministic cover images per article slug
const coverImages: Record<string, string> = {
  "best-smartwatches-under-10000-india-2025": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format",
  "redmi-note-13-pro-review": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format",
};

function getCoverImage(slug: string, products: any[], reviewProduct: any) {
  if (coverImages[slug]) return coverImages[slug];
  if (reviewProduct?.image) return reviewProduct.image;
  if (products?.[0]?.image) return products[0].image;
  return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format";
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6);

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Hero — SEO 4: keyword-targeted H1 */}
      <div style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2a2a2d 100%)", padding: "64px 20px 56px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🇮🇳</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488", letterSpacing: 1, textTransform: "uppercase" as const }}>Honest Reviews for Indian Buyers</span>
          </div>
          {/* Keyword-rich H1 */}
          <h1 style={{ fontSize: "clamp(26px, 5vw, 46px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.8px", marginBottom: 16 }}>
            Best Product Buying Guides<br />for India (2025)
          </h1>
          <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.8, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            Smartphones, laptops, smartwatches and home appliances — research-backed recommendations for Amazon India and Flipkart.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const, marginBottom: 40 }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d9488", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none" }}>
              Browse All Guides →
            </Link>
            <Link href="/category/tech" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none" }}>
              Explore Tech
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" as const }}>
            {[{ value: "50+", label: "Buying Guides" }, { value: "100%", label: "Free to Read" }, { value: "₹0", label: "No Hidden Cost" }].map((stat, i) => (
              <div key={i} style={{ padding: "12px 28px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center" as const }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#0d9488" }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 20px 0" }}>

        {/* Category grid */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.4px", marginBottom: 4 }}>Browse by Category</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>Find exactly what you're looking for</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {[
              { icon: "💻", label: "Laptops", sub: "Best for every budget", href: "/category/laptops" },
              { icon: "📱", label: "Smartphones", sub: "Top picks for India", href: "/category/smartphones" },
              { icon: "⌚", label: "Smartwatches", sub: "Budget to premium", href: "/category/smartwatches" },
              { icon: "🎧", label: "Headphones", sub: "Sound & value", href: "/category/headphones" },
              { icon: "🍳", label: "Kitchen", sub: "For Indian kitchens", href: "/category/kitchen" },
              { icon: "🏠", label: "Home Electronics", sub: "Upgrade your home", href: "/category/home" },
            ].map((cat) => (
              <Link key={cat.label} href={cat.href} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, background: "#fff", borderRadius: 16, padding: "20px 12px", border: "1px solid #E5E4E0", textDecoration: "none" }}>
                <span style={{ fontSize: 28 }}>{cat.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1C1C1E", textAlign: "center" as const }}>{cat.label}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" as const, lineHeight: 1.4 }}>{cat.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Guides — with cover images (UX 1) */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, flexWrap: "wrap" as const, gap: 8 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.4px", marginBottom: 4 }}>Latest Guides</h2>
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>Researched and written for Indian buyers</p>
            </div>
            <Link href="/blog" style={{ fontSize: 13, fontWeight: 700, color: "#0d9488", textDecoration: "none" }}>View all →</Link>
          </div>

          {latestPosts.length === 0 ? (
            <div style={{ textAlign: "center" as const, padding: "48px 24px", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0" }}>
              <p style={{ color: "#9CA3AF", fontSize: 15 }}>No guides published yet. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {latestPosts.map((post, i) => {
                const catStyle = getCategoryStyle(post.category);
                const coverImage = getCoverImage(post.slug, (post as any).products || [], (post as any).reviewProduct);
                const isFirst = i === 0;
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: isFirst ? "0 4px 20px rgba(0,0,0,0.07)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    {/* Cover image */}
                    <div style={{ width: "100%", aspectRatio: "16/8", overflow: "hidden", position: "relative" as const }}>
                      <img src={coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute" as const, top: 10, left: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: catStyle.color, background: catStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                      </div>
                      {isFirst && (
                        <div style={{ position: "absolute" as const, top: 10, right: 10 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "#0d9488", padding: "3px 10px", borderRadius: 100 }}>Latest</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1C1C1E", lineHeight: 1.4, marginBottom: 8, letterSpacing: "-0.2px" }}>{post.title}</h3>
                      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 14 }}>{post.excerpt}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{post.readTime} read</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488" }}>Read guide →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Trust section */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E5E4E0", padding: "40px 32px", marginBottom: 64 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1E", textAlign: "center" as const, marginBottom: 6 }}>Why Trust SmartKharido?</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center" as const, marginBottom: 32 }}>Built for real Indian buyers, not page views</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { icon: "🔍", title: "Deeply Researched", desc: "Every guide is based on real specs and Indian market availability — not copied spec sheets." },
              { icon: "💰", title: "Budget-Aware", desc: "We cover all price points — from ₹500 accessories to ₹1,00,000+ premium products." },
              { icon: "🇮🇳", title: "India-Specific", desc: "Amazon India and Flipkart availability always checked before recommending any product." },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#1C1C1E", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}