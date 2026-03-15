"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FilterDrawer, getTypeStyle, getCatStyle } from "../../FilterDrawer";

const catCoverImages: Record<string, string> = {
  "best-smartwatches-under-10000-india-2025": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format",
  "redmi-note-13-pro-review": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format",
};
function getCoverImage(coverImage: string | undefined, slug: string, products: any[], reviewProduct: any) {
  if (coverImage) return coverImage;
  if (catCoverImages[slug]) return catCoverImages[slug];
  if (reviewProduct?.image) return reviewProduct.image;
  if (products?.[0]?.image) return products[0].image;
  return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format";
}

type CatInfo = { label: string; description: string; emoji: string; matches: string[] };

export default function CategoryPageClient({ posts, category }: { posts: any[]; category: CatInfo; slug: string }) {
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType]     = useState("All");
  const [sort, setSort]                 = useState("newest");
  const [drawerOpen, setDrawerOpen]     = useState(false);

  const categories = useMemo(() =>
    ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))],
    [posts]
  );
  const articleTypes = useMemo(() =>
    Array.from(new Set(posts.map(p => p.articleType).filter(Boolean))),
    [posts]
  );

  const activeCount = [activeCategory !== "All", activeType !== "All", sort !== "newest"].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") result = result.filter(p => p.category === activeCategory);
    if (activeType !== "All")     result = result.filter(p => p.articleType === activeType);
    if (sort === "oldest") result.reverse();
    return result;
  }, [posts, search, activeCategory, activeType, sort]);

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2a2a2d 100%)", padding: "48px 20px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 16 }}>← Home</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 36 }}>{category.emoji}</span>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.6px", lineHeight: 1.2 }}>{category.label}</h1>
          </div>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>{category.description}</p>

          {/* Search + Filter */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 520 }}>
            <div style={{ position: "relative" as const, flex: 1 }}>
              <div style={{ position: "absolute" as const, left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none" as const }}>🔍</div>
              <input type="text" placeholder={`Search in ${category.label}...`} value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "13px 38px 13px 42px", borderRadius: 14, border: "none", fontSize: 14, outline: "none", background: "#fff", color: "#1C1C1E", boxSizing: "border-box" as const, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }} />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute" as const, right: 10, top: "50%", transform: "translateY(-50%)", background: "#E5E4E0", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 10, cursor: "pointer", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
            </div>
            <button onClick={() => setDrawerOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "13px 18px", borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: activeCount > 0 ? "#0d9488" : "#fff", color: activeCount > 0 ? "#fff" : "#374151", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "all 0.15s", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Filters
              {activeCount > 0 && <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 100, padding: "1px 8px", fontSize: 11, fontWeight: 900 }}>{activeCount}</span>}
            </button>
          </div>

          {/* Active pills */}
          {(activeCategory !== "All" || activeType !== "All" || sort !== "newest") && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginTop: 14 }}>
              {activeCategory !== "All" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: 100, padding: "5px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  📂 {activeCategory}
                  <button onClick={() => setActiveCategory("All")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 11, padding: 0, opacity: 0.7 }}>✕</button>
                </span>
              )}
              {activeType !== "All" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: 100, padding: "5px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {getTypeStyle(activeType).icon} {getTypeStyle(activeType).label}
                  <button onClick={() => setActiveType("All")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 11, padding: 0, opacity: 0.7 }}>✕</button>
                </span>
              )}
              {sort !== "newest" && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: 100, padding: "5px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  📅 Oldest first
                  <button onClick={() => setSort("newest")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 11, padding: 0, opacity: 0.7 }}>✕</button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        categories={categories} articleTypes={articleTypes}
        activeCategory={activeCategory} activeType={activeType} sort={sort}
        onCategory={setActiveCategory} onType={setActiveType} onSort={setSort}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px 80px" }}>
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
              <button onClick={() => { setSearch(""); setActiveType("All"); setSort("newest"); }}
                style={{ background: "#0d9488", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>Clear filters</button>
            </div>
          )
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map(post => {
              const catStyle = getCatStyle(post.category);
              const coverImage = getCoverImage(post.coverImage, post.slug, post.products || [], post.reviewProduct);
              const typeStyle = getTypeStyle(post.articleType);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "100%", aspectRatio: "16/8", overflow: "hidden", position: "relative" as const }}>
                    <img src={coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute" as const, top: 10, left: 10, display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: catStyle.color, background: catStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: typeStyle.color, background: typeStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{typeStyle.label}</span>
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