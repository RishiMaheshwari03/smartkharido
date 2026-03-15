"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const homeCoverImages: Record<string, string> = {
  "best-smartwatches-under-10000-india-2025": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format",
  "redmi-note-13-pro-review": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format",
};
function getHomeCoverImage(coverImage: string | undefined, slug: string, products: any[], reviewProduct: any) {
  if (coverImage) return coverImage;
  if (homeCoverImages[slug]) return homeCoverImages[slug];
  if (reviewProduct?.image) return reviewProduct.image;
  if (products?.[0]?.image) return products[0].image;
  return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format";
}
const homeCategoryStyles: Record<string, { bg: string; color: string }> = {
  smartphones: { bg: "#EDE9FE", color: "#6D28D9" },
  smartwatches: { bg: "#E6F7F5", color: "#0d9488" },
  laptops: { bg: "#FEF3C7", color: "#B45309" },
  kitchen: { bg: "#FCE7F3", color: "#BE185D" },
  headphones: { bg: "#DBEAFE", color: "#1D4ED8" },
};
function getHomeCatStyle(cat: string) {
  const k = cat.toLowerCase();
  for (const [key, val] of Object.entries(homeCategoryStyles)) if (k.includes(key)) return val;
  return { bg: "#F3F4F6", color: "#374151" };
}

export default function HomePageClient({ latestPosts }: { latestPosts: any[] }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/blog?q=${encodeURIComponent(search.trim())}`);
  };

  // Fix 1 — Dynamic quick tags from actual post titles/categories
  const quickTags = latestPosts.slice(0, 3).map(p => ({
    label: p.articleType === "review" ? p.title.split(":")[0].trim() : p.category,
    query: p.articleType === "review" ? p.title.split(":")[0].trim() : p.category,
  }));

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2a2a2d 100%)", padding: "72px 20px 64px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🇮🇳</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488", letterSpacing: 1, textTransform: "uppercase" as const }}>Honest Reviews for Indian Buyers</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 14 }}>
            Best Product Buying Guides<br />for India
          </h1>
          <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Smartphones, laptops, smartwatches — research-backed recommendations for Amazon India and Flipkart.
          </p>

          {/* Fix 2 — Search bar: stacked on mobile so text never cuts off */}
          <form onSubmit={handleSearch} style={{ maxWidth: 520, margin: "0 auto 20px" }}>
            <div className="search-wrap" style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
              <div style={{ position: "relative" as const, flex: 1 }}>
                <div style={{ position: "absolute" as const, left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" as const }}>🔍</div>
                <input type="text" placeholder="Search phones, laptops..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: "100%", padding: "14px 14px 14px 42px", borderRadius: 14, border: "none", fontSize: 15, outline: "none", background: "#fff", color: "#1C1C1E", boxSizing: "border-box" as const, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }} />
              </div>
              <button type="submit"
                style={{ background: "#0d9488", color: "#fff", border: "none", borderRadius: 14, padding: "14px 22px", fontSize: 15, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" as const, flexShrink: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                Search
              </button>
            </div>
          </form>

          {/* Fix 1 — Dynamic quick tags from actual posts */}
          {quickTags.length > 0 && (
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" as const, marginBottom: 40 }}>
              {quickTags.map(tag => (
                <button key={tag.label} onClick={() => router.push(`/blog?q=${encodeURIComponent(tag.query)}`)}
                  style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "6px 14px", cursor: "pointer" }}>
                  {tag.label}
                </button>
              ))}
            </div>
          )}

          {/* Stats */}
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
            ].map(cat => (
              <Link key={cat.label} href={cat.href} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, background: "#fff", borderRadius: 16, padding: "20px 12px", border: "1px solid #E5E4E0", textDecoration: "none" }}>
                <span style={{ fontSize: 28 }}>{cat.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1C1C1E", textAlign: "center" as const }}>{cat.label}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" as const, lineHeight: 1.4 }}>{cat.sub}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest guides */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, flexWrap: "wrap" as const, gap: 8 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.4px", marginBottom: 4 }}>Latest Guides</h2>
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>Researched and written for Indian buyers</p>
            </div>
            <Link href="/blog" style={{ fontSize: 13, fontWeight: 700, color: "#0d9488", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {latestPosts.map((post, i) => {
              const catStyle = getHomeCatStyle(post.category);
              const coverImage = getHomeCoverImage(post.coverImage, post.slug, post.products || [], post.reviewProduct);
              const isFirst = i === 0;
              const isReview = post.articleType === "review";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: isFirst ? "0 4px 20px rgba(0,0,0,0.07)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "100%", aspectRatio: "16/8", overflow: "hidden", position: "relative" as const }}>
                    <img src={coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute" as const, top: 10, left: 10, display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: catStyle.color, background: catStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                      {isFirst && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "#0d9488", padding: "3px 10px", borderRadius: 100 }}>Latest</span>}
                      {!isFirst && <span style={{ fontSize: 11, fontWeight: 700, color: isReview ? "#7c3aed" : "#B45309", background: isReview ? "#F5F3FF" : "#FEF3C7", padding: "3px 10px", borderRadius: 100 }}>{isReview ? "Review" : "Guide"}</span>}
                    </div>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1C1C1E", lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
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
        </div>

        {/* Trust */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E5E4E0", padding: "40px 32px", marginBottom: 64 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1E", textAlign: "center" as const, marginBottom: 6 }}>Why Trust SmartKharido?</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center" as const, marginBottom: 32 }}>Built for real Indian buyers, not page views</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { icon: "🔍", title: "Deeply Researched", desc: "Every guide is based on real specs and Indian market availability — not copied spec sheets." },
              { icon: "💰", title: "Budget-Aware", desc: "We cover all price points — from ₹500 accessories to ₹1,00,000+ premium products." },
              { icon: "🇮🇳", title: "India-Specific", desc: "Amazon India and Flipkart availability always checked before recommending any product." },
            ].map(item => (
              <div key={item.title} style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#1C1C1E", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .search-wrap { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}