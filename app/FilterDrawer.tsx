// Shared FilterDrawer component — used by both BlogPageClient and CategoryPageClient
// Fixed overlay, slides in from right, internal scroll per tab section

"use client";
import { useState, useEffect, useRef } from "react";

const typeLabels: Record<string, { label: string; icon: string }> = {
  comparison: { label: "Comparison Guide",  icon: "🏆" },
  review:     { label: "In-Depth Review",   icon: "⭐" },
  guide:      { label: "Buying Guide",      icon: "📖" },
  brand:      { label: "Brand Spotlight",   icon: "🏷️" },
};
export function getTypeStyle(articleType: string) {
  const colors: Record<string, { color: string; bg: string }> = {
    comparison: { color: "#B45309", bg: "#FEF3C7" },
    review:     { color: "#7c3aed", bg: "#F5F3FF" },
    guide:      { color: "#0d9488", bg: "#E6F7F5" },
    brand:      { color: "#BE185D", bg: "#FCE7F3" },
  };
  const t = typeLabels[articleType] || { label: articleType, icon: "📄" };
  const c = colors[articleType]    || { color: "#374151", bg: "#F3F4F6" };
  return { ...t, ...c };
}

const catStyleMap: Record<string, { bg: string; color: string; dot: string }> = {
  smartphones:  { bg: "#EDE9FE", color: "#6D28D9", dot: "#7C3AED" },
  smartwatches: { bg: "#E6F7F5", color: "#0d9488",  dot: "#0d9488" },
  laptops:      { bg: "#FEF3C7", color: "#B45309",  dot: "#F59E0B" },
  kitchen:      { bg: "#FCE7F3", color: "#BE185D",  dot: "#EC4899" },
  headphones:   { bg: "#DBEAFE", color: "#1D4ED8",  dot: "#3B82F6" },
};
export function getCatStyle(cat: string) {
  const k = cat.toLowerCase();
  for (const [key, val] of Object.entries(catStyleMap)) if (k.includes(key)) return val;
  return { bg: "#F3F4F6", color: "#374151", dot: "#9CA3AF" };
}

type Tab = "category" | "type" | "sort";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  articleTypes: string[];
  activeCategory: string;
  activeType: string;
  sort: string;
  onCategory: (c: string) => void;
  onType: (t: string) => void;
  onSort: (s: string) => void;
}

export function FilterDrawer({ open, onClose, categories, articleTypes, activeCategory, activeType, sort, onCategory, onType, onSort }: FilterDrawerProps) {
  const [tab, setTab] = useState<Tab>("category");
  const [catSearch, setCatSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  // Reset state when opening
  useEffect(() => {
    if (open) { setTab("category"); setCatSearch(""); setTypeSearch(""); }
  }, [open]);

  // Close on backdrop click or Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const filteredCats = categories.filter(c =>
    c === "All" || c.toLowerCase().includes(catSearch.toLowerCase())
  );

  const typeOptions = [
    { v: "All", icon: "📋", label: "All Types", desc: "Show everything" },
    ...articleTypes.map(type => {
      const s = getTypeStyle(type);
      const descs: Record<string, string> = {
        comparison: "Best-of product comparisons",
        review:     "Single product deep-dives",
        guide:      "How to choose the right product",
        brand:      "Full brand range overview",
      };
      return { v: type, icon: s.icon, label: s.label, desc: descs[type] || type };
    }),
  ].filter(t => t.label.toLowerCase().includes(typeSearch.toLowerCase()));

  const activeCount = [activeCategory !== "All", activeType !== "All", sort !== "newest"].filter(Boolean).length;

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "category", label: "Category", count: activeCategory !== "All" ? 1 : undefined },
    { id: "type",     label: "Type",     count: activeType !== "All" ? 1 : undefined },
    { id: "sort",     label: "Sort",     count: sort !== "newest" ? 1 : undefined },
  ];

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 400, backdropFilter: "blur(2px)" }} />

      {/* Drawer panel — fixed, right side, full height */}
      <div style={{
        position: "fixed" as const, top: 0, right: 0, bottom: 0,
        width: "min(400px, 100vw)", background: "#fff", zIndex: 401,
        display: "flex", flexDirection: "column" as const,
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
        animation: "slideIn 0.25s cubic-bezier(0.32,0.72,0,1)"
      }}>

        {/* Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="#1C1C1E" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#1C1C1E" }}>Filters</span>
            {activeCount > 0 && (
              <span style={{ background: "#0d9488", color: "#fff", borderRadius: 100, padding: "2px 10px", fontSize: 11, fontWeight: 800 }}>{activeCount} active</span>
            )}
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "#F7F6F3", border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#374151" }}>✕</button>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", borderBottom: "1px solid #F3F4F6", padding: "0 20px", flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px 8px", border: "none", cursor: "pointer", background: "transparent", borderBottom: tab === t.id ? "2px solid #0d9488" : "2px solid transparent", transition: "all 0.15s" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: tab === t.id ? "#0d9488" : "#9CA3AF" }}>{t.label}</span>
              {t.count && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0d9488", display: "inline-block" }} />}
            </button>
          ))}
        </div>

        {/* Tab content — scrollable */}
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 20px" }}>

          {/* CATEGORY tab */}
          {tab === "category" && (
            <>
              <div style={{ position: "relative" as const, marginBottom: 14 }}>
                <div style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4 }}>🔍</div>
                <input type="text" placeholder="Search categories..." value={catSearch} onChange={e => setCatSearch(e.target.value)}
                  style={{ width: "100%", padding: "11px 12px 11px 36px", borderRadius: 12, border: "1.5px solid #E5E4E0", fontSize: 14, outline: "none", background: "#F7F6F3", color: "#1C1C1E", boxSizing: "border-box" as const }} />
                {catSearch && <button onClick={() => setCatSearch("")} style={{ position: "absolute" as const, right: 10, top: "50%", transform: "translateY(-50%)", background: "#E5E4E0", border: "none", borderRadius: "50%", width: 22, height: 22, fontSize: 11, cursor: "pointer", color: "#374151" }}>✕</button>}
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                {filteredCats.length === 0 ? (
                  <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center" as const, padding: "20px 0" }}>No categories found</p>
                ) : filteredCats.map(cat => {
                  const s = getCatStyle(cat);
                  const active = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => { onCategory(cat); }}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: active ? `1.5px solid ${s.dot}` : "1.5px solid transparent", cursor: "pointer", background: active ? s.bg : "#F7F6F3", textAlign: "left" as const, transition: "all 0.12s" }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: cat === "All" ? "#9CA3AF" : s.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? s.color : "#374151", flex: 1 }}>{cat}</span>
                      {active && <span style={{ fontSize: 14, color: s.color }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* TYPE tab */}
          {tab === "type" && (
            <>
              <div style={{ position: "relative" as const, marginBottom: 14 }}>
                <div style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4 }}>🔍</div>
                <input type="text" placeholder="Search types..." value={typeSearch} onChange={e => setTypeSearch(e.target.value)}
                  style={{ width: "100%", padding: "11px 12px 11px 36px", borderRadius: 12, border: "1.5px solid #E5E4E0", fontSize: 14, outline: "none", background: "#F7F6F3", color: "#1C1C1E", boxSizing: "border-box" as const }} />
                {typeSearch && <button onClick={() => setTypeSearch("")} style={{ position: "absolute" as const, right: 10, top: "50%", transform: "translateY(-50%)", background: "#E5E4E0", border: "none", borderRadius: "50%", width: 22, height: 22, fontSize: 11, cursor: "pointer", color: "#374151" }}>✕</button>}
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                {typeOptions.map(t => {
                  const active = activeType === t.v;
                  return (
                    <button key={t.v} onClick={() => onType(t.v)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: active ? "1.5px solid #b2ddd8" : "1.5px solid transparent", cursor: "pointer", background: active ? "#E6F7F5" : "#F7F6F3", textAlign: "left" as const, transition: "all 0.12s" }}>
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: active ? 700 : 600, color: active ? "#0d9488" : "#1C1C1E" }}>{t.label}</div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{t.desc}</div>
                      </div>
                      {active && <span style={{ fontSize: 16, color: "#0d9488", flexShrink: 0 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* SORT tab */}
          {tab === "sort" && (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
              {[
                { v: "newest", icon: "🆕", label: "Newest First", desc: "Latest articles at the top" },
                { v: "oldest", icon: "📅", label: "Oldest First", desc: "Earliest articles at the top" },
              ].map(s => {
                const active = sort === s.v;
                return (
                  <button key={s.v} onClick={() => onSort(s.v)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: active ? "1.5px solid #b2ddd8" : "1.5px solid transparent", cursor: "pointer", background: active ? "#E6F7F5" : "#F7F6F3", textAlign: "left" as const, transition: "all 0.12s" }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: active ? 700 : 600, color: active ? "#0d9488" : "#1C1C1E" }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{s.desc}</div>
                    </div>
                    {active && <span style={{ fontSize: 16, color: "#0d9488", flexShrink: 0 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — always visible at bottom */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #F3F4F6", flexShrink: 0, display: "flex", gap: 10 }}>
          {activeCount > 0 ? (
            <>
              <button onClick={() => { onCategory("All"); onType("All"); onSort("newest"); }}
                style={{ flex: 1, padding: "13px", borderRadius: 12, border: "1.5px solid #E5E4E0", background: "#F7F6F3", color: "#374151", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Reset all
              </button>
              <button onClick={onClose}
                style={{ flex: 2, padding: "13px", borderRadius: 12, border: "none", background: "#0d9488", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                Show {`results`} →
              </button>
            </>
          ) : (
            <button onClick={onClose}
              style={{ flex: 1, padding: "13px", borderRadius: 12, border: "none", background: "#0d9488", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
              Done
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}