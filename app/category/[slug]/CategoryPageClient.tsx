"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

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
const categoryStyles: Record<string, { bg: string; color: string }> = {
  smartphones: { bg: "#EDE9FE", color: "#6D28D9" },
  smartwatches: { bg: "#E6F7F5", color: "#0d9488" },
  laptops: { bg: "#FEF3C7", color: "#B45309" },
  kitchen: { bg: "#FCE7F3", color: "#BE185D" },
  headphones: { bg: "#DBEAFE", color: "#1D4ED8" },
};
function getCatStyle(cat: string) {
  const k = cat.toLowerCase();
  for (const [key, val] of Object.entries(categoryStyles)) if (k.includes(key)) return val;
  return { bg: "#F3F4F6", color: "#374151" };
}

type CatInfo = { label: string; description: string; emoji: string; matches: string[] };

export default function CategoryPageClient({ posts, category, slug }: { posts: any[]; category: CatInfo; slug: string }) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [sort, setSort] = useState("newest");

  const hasReviews = posts.some(p => p.articleType === "review");
  const hasGuides = posts.some(p => p.articleType === "comparison");
  const hasFilters = search || activeType !== "All";

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeType === "Guide") result = result.filter(p => p.articleType === "comparison");
    if (activeType === "Review") result = result.filter(p => p.articleType === "review");
    if (sort === "oldest") result.reverse();
    return result;
  }, [posts, search, activeType, sort]);

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2a2a2d 100%)", padding: "48px 20px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 16 }}>← Home</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 36 }}>{category.emoji}</span>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.6px", lineHeight: 1.2 }}>{category.label}</h1>
          </div>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>{category.description}</p>

          {/* Search */}
          <div style={{ position: "relative" as const, maxWidth: 520 }}>
            <div style={{ position: "absolute" as const, left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" as const }}>🔍</div>
            <input type="text" placeholder={`Search in ${category.label}...`} value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "13px 44px 13px 46px", borderRadius: 14, border: "none", fontSize: 14, outline: "none", background: "#fff", color: "#1C1C1E", boxSizing: "border-box" as const, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute" as const, right: 14, top: "50%", transform: "translateY(-50%)", background: "#E5E4E0", border: "none", borderRadius: "50%", width: 22, height: 22, fontSize: 11, cursor: "pointer", color: "#374151" }}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Filter bar — same capsule design as blog page */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E4E0", padding: "14px 20px", position: "sticky" as const, top: 58, zIndex: 10 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const }}>

          {/* Left — type filter capsule */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" as const, flex: 1 }}>
            <div style={{ display: "flex", gap: 4, background: "#F7F6F3", borderRadius: 100, padding: "3px", border: "1px solid #E5E4E0" }}>
              <button onClick={() => setActiveType("All")}
                style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, border: "none", cursor: "pointer", transition: "all 0.15s", background: activeType === "All" ? "#0d9488" : "transparent", color: activeType === "All" ? "#fff" : "#6B7280" }}>
                All
              </button>
              {hasGuides && (
                <button onClick={() => setActiveType("Guide")}
                  style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, border: "none", cursor: "pointer", transition: "all 0.15s", background: activeType === "Guide" ? "#0d9488" : "transparent", color: activeType === "Guide" ? "#fff" : "#6B7280" }}>
                  🗂 Guides
                </button>
              )}
              {hasReviews && (
                <button onClick={() => setActiveType("Review")}
                  style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, border: "none", cursor: "pointer", transition: "all 0.15s", background: activeType === "Review" ? "#0d9488" : "transparent", color: activeType === "Review" ? "#fff" : "#6B7280" }}>
                  ⭐ Reviews
                </button>
              )}
            </div>

            {/* Clear — only when active */}
            {hasFilters && (
              <button onClick={() => { setSearch(""); setActiveType("All"); }}
                style={{ fontSize: 12, fontWeight: 600, color: "#ef4444", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 100, padding: "5px 12px", cursor: "pointer" }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Right — sort always on same row */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 100, border: "1.5px solid #E5E4E0", background: "#F7F6F3", color: "#374151", cursor: "pointer", outline: "none", flexShrink: 0 }}>
            <option value="newest">↓ Newest</option>
            <option value="oldest">↑ Oldest</option>
          </select>

        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px 80px" }}>

        <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 20 }}>
          {filtered.length === 0 ? "No results" : `${filtered.length} guide${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {filtered.length === 0 ? (
          posts.length === 0 ? (
            <div style={{ textAlign: "center" as const, padding: "64px 24px", background: "#fff", borderRadius: 20, border: "1px solid #E5E4E0" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 8 }}>Coming Soon</h2>
              <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>We're working on {category.label} guides. Check back soon!</p>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d9488", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 10, textDecoration: "none" }}>Browse All Guides →</Link>
            </div>
          ) : (
            <div style={{ textAlign: "center" as const, padding: "48px 24px", background: "#fff", borderRadius: 20, border: "1px solid #E5E4E0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1E", marginBottom: 6 }}>No results found</p>
              <button onClick={() => { setSearch(""); setActiveType("All"); }} style={{ background: "#0d9488", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>Clear filters</button>
            </div>
          )
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map(post => {
              const catStyle = getCatStyle(post.category);
              const coverImage = getCoverImage(post.slug, post.products || [], post.reviewProduct);
              const isReview = post.articleType === "review";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "100%", aspectRatio: "16/8", overflow: "hidden", position: "relative" as const }}>
                    <img src={coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute" as const, top: 10, left: 10, display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: catStyle.color, background: catStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: isReview ? "#7c3aed" : "#B45309", background: isReview ? "#F5F3FF" : "#FEF3C7", padding: "3px 10px", borderRadius: 100 }}>{isReview ? "Review" : "Guide"}</span>
                    </div>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6 }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
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
        )}
      </div>
    </div>
  );
}