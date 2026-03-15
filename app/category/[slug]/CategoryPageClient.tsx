"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

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
const catPageStyleMap: Record<string, { bg: string; color: string; dot: string }> = {
  smartphones:  { bg: "#EDE9FE", color: "#6D28D9", dot: "#7C3AED" },
  smartwatches: { bg: "#E6F7F5", color: "#0d9488",  dot: "#0d9488" },
  laptops:      { bg: "#FEF3C7", color: "#B45309",  dot: "#F59E0B" },
  kitchen:      { bg: "#FCE7F3", color: "#BE185D",  dot: "#EC4899" },
  headphones:   { bg: "#DBEAFE", color: "#1D4ED8",  dot: "#3B82F6" },
};
function getCatStyle(cat: string) {
  const k = cat.toLowerCase();
  for (const [key, val] of Object.entries(catPageStyleMap)) if (k.includes(key)) return val;
  return { bg: "#F3F4F6", color: "#374151", dot: "#9CA3AF" };
}

type Tab = "category" | "type" | "sort";

function FilterPopover({ open, onClose, anchorRef, categories, hasGuides, hasReviews, activeCategory, activeType, sort, onCategory, onType, onSort }: {
  open: boolean; onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  categories: string[]; hasGuides: boolean; hasReviews: boolean;
  activeCategory: string; activeType: string; sort: string;
  onCategory: (c: string) => void; onType: (t: string) => void; onSort: (s: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("category");
  const [catSearch, setCatSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  useEffect(() => {
    if (open) { setTab("category"); setCatSearch(""); setTypeSearch(""); }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const filteredCats = categories.filter(c => c === "All" || c.toLowerCase().includes(catSearch.toLowerCase()));

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: "category", label: "Category", badge: activeCategory !== "All" ? activeCategory : undefined },
    { id: "type",     label: "Type",     badge: activeType !== "All" ? activeType : undefined },
    { id: "sort",     label: "Sort",     badge: sort !== "newest" ? "Oldest" : undefined },
  ];

  return (
    <div ref={ref} style={{
      position: "absolute" as const, top: "calc(100% + 10px)", right: 0,
      background: "#fff", borderRadius: 18, border: "1px solid #E5E4E0",
      boxShadow: "0 12px 40px rgba(0,0,0,0.14)", zIndex: 300, width: 300, overflow: "hidden",
      animation: "popIn 0.18s cubic-bezier(0.34,1.56,0.64,1)"
    }}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #F3F4F6", padding: "6px 6px 0" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 3, padding: "10px 6px", borderRadius: "10px 10px 0 0", border: "none", cursor: "pointer", background: tab === t.id ? "#F7F6F3" : "transparent", borderBottom: tab === t.id ? "2px solid #0d9488" : "2px solid transparent", transition: "all 0.15s" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: tab === t.id ? "#0d9488" : "#9CA3AF" }}>{t.label}</span>
            {t.badge && <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: "#0d9488", borderRadius: 100, padding: "1px 7px", maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px" }}>
        {/* CATEGORY tab */}
        {tab === "category" && (
          <>
            <div style={{ position: "relative" as const, marginBottom: 10 }}>
              <div style={{ position: "absolute" as const, left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, opacity: 0.4 }}>🔍</div>
              <input type="text" placeholder="Find category..." value={catSearch} onChange={e => setCatSearch(e.target.value)}
                style={{ width: "100%", padding: "8px 10px 8px 30px", borderRadius: 10, border: "1.5px solid #E5E4E0", fontSize: 12, outline: "none", background: "#F7F6F3", color: "#1C1C1E", boxSizing: "border-box" as const }} />
              {catSearch && <button onClick={() => setCatSearch("")} style={{ position: "absolute" as const, right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#9CA3AF", padding: 0 }}>✕</button>}
            </div>
            <div style={{ maxHeight: 200, overflowY: "auto" as const }}>
              {filteredCats.length === 0 ? (
                <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center" as const, padding: "14px 0" }}>No categories found</p>
              ) : filteredCats.map(cat => {
                const s = getCatStyle(cat);
                const active = activeCategory === cat;
                return (
                  <button key={cat} onClick={() => { onCategory(cat); onClose(); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? s.bg : "transparent", textAlign: "left" as const, marginBottom: 2, transition: "background 0.1s" }}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: cat === "All" ? "#D1D5DB" : s.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? s.color : "#374151", flex: 1 }}>{cat}</span>
                    {active && <span style={{ fontSize: 13, color: s.color }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* TYPE tab */}
        {tab === "type" && (
          <div>
            <div style={{ position: "relative" as const, marginBottom: 10 }}>
              <div style={{ position: "absolute" as const, left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, opacity: 0.4 }}>🔍</div>
              <input type="text" placeholder="Find type..." value={typeSearch} onChange={e => setTypeSearch(e.target.value)}
                style={{ width: "100%", padding: "8px 10px 8px 30px", borderRadius: 10, border: "1.5px solid #E5E4E0", fontSize: 12, outline: "none", background: "#F7F6F3", color: "#1C1C1E", boxSizing: "border-box" as const }} />
              {typeSearch && <button onClick={() => setTypeSearch("")} style={{ position: "absolute" as const, right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#9CA3AF", padding: 0 }}>✕</button>}
            </div>
            {[
              { v: "All",    icon: "📋", label: "All Types",        desc: "Show everything" },
              ...(hasGuides  ? [{ v: "Guide",  icon: "🗂", label: "Buying Guide",    desc: "Best-of comparison guides" }] : []),
              ...(hasReviews ? [{ v: "Review", icon: "⭐", label: "In-Depth Review", desc: "Single product deep-dives" }] : []),
            ].filter(t => t.label.toLowerCase().includes(typeSearch.toLowerCase())).map(t => {
              const active = activeType === t.v;
              return (
                <button key={t.v} onClick={() => { onType(t.v); onClose(); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 12, border: active ? "1.5px solid #b2ddd8" : "1.5px solid transparent", cursor: "pointer", background: active ? "#E6F7F5" : "#F7F6F3", textAlign: "left" as const, marginBottom: 6, transition: "all 0.12s" }}>
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: active ? 700 : 600, color: active ? "#0d9488" : "#1C1C1E" }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{t.desc}</div>
                  </div>
                  {active && <span style={{ fontSize: 13, color: "#0d9488" }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* SORT tab */}
        {tab === "sort" && (
          <div>
            {[
              { v: "newest", icon: "🆕", label: "Newest First", desc: "Latest articles at the top" },
              { v: "oldest", icon: "📅", label: "Oldest First", desc: "Earliest articles at the top" },
            ].map(s => {
              const active = sort === s.v;
              return (
                <button key={s.v} onClick={() => { onSort(s.v); onClose(); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 12, border: active ? "1.5px solid #b2ddd8" : "1.5px solid transparent", cursor: "pointer", background: active ? "#E6F7F5" : "#F7F6F3", textAlign: "left" as const, marginBottom: 6, transition: "all 0.12s" }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: active ? 700 : 600, color: active ? "#0d9488" : "#1C1C1E" }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{s.desc}</div>
                  </div>
                  {active && <span style={{ fontSize: 13, color: "#0d9488" }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {(activeCategory !== "All" || activeType !== "All") && (
        <div style={{ padding: "0 12px 12px" }}>
          <button onClick={() => { onCategory("All"); onType("All"); onClose(); }}
            style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1px solid #FECACA", background: "#FEF2F2", color: "#ef4444", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            ✕ Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

type CatInfo = { label: string; description: string; emoji: string; matches: string[] };

export default function CategoryPageClient({ posts, category }: { posts: any[]; category: CatInfo; slug: string }) {
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType]     = useState("All");
  const [sort, setSort]                 = useState("newest");
  const [filterOpen, setFilterOpen]     = useState(false);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

  const categories = useMemo(() =>
    ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))],
    [posts]
  );
  const hasReviews = posts.some(p => p.articleType === "review");
  const hasGuides  = posts.some(p => p.articleType === "comparison");
  const activeCount = [activeCategory !== "All", activeType !== "All", sort !== "newest"].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") result = result.filter(p => p.category === activeCategory);
    if (activeType === "Guide")  result = result.filter(p => p.articleType === "comparison");
    if (activeType === "Review") result = result.filter(p => p.articleType === "review");
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

          {/* Search + Filter button */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 520 }}>
            <div style={{ position: "relative" as const, flex: 1 }}>
              <div style={{ position: "absolute" as const, left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none" as const }}>🔍</div>
              <input type="text" placeholder={`Search in ${category.label}...`} value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "13px 38px 13px 42px", borderRadius: 14, border: "none", fontSize: 14, outline: "none", background: "#fff", color: "#1C1C1E", boxSizing: "border-box" as const, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }} />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute" as const, right: 10, top: "50%", transform: "translateY(-50%)", background: "#E5E4E0", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 10, cursor: "pointer", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
            </div>

            <div style={{ position: "relative" as const, flexShrink: 0 }}>
              <button ref={filterBtnRef} onClick={() => setFilterOpen(v => !v)}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "13px 18px", borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: activeCount > 0 ? "#0d9488" : "#fff", color: activeCount > 0 ? "#fff" : "#374151", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "all 0.15s" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Filters
                {activeCount > 0
                  ? <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 100, padding: "1px 8px", fontSize: 11, fontWeight: 900 }}>{activeCount}</span>
                  : <span style={{ fontSize: 10, opacity: 0.45, marginLeft: 2 }}>{filterOpen ? "▲" : "▼"}</span>
                }
              </button>
              <FilterPopover
                open={filterOpen} onClose={() => setFilterOpen(false)} anchorRef={filterBtnRef}
                categories={categories} hasGuides={hasGuides} hasReviews={hasReviews}
                activeCategory={activeCategory} activeType={activeType} sort={sort}
                onCategory={setActiveCategory} onType={setActiveType} onSort={setSort}
              />
            </div>
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
                  {activeType === "Guide" ? "🗂 Guides" : "⭐ Reviews"}
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
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}