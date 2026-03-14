import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartKharido — Honest Buying Guides for Indian Buyers",
  description: "Research-backed buying guides for tech and home products — written specifically for Indian budgets and availability on Amazon India and Flipkart.",
};

const categoryStyles: Record<string, { bg: string; color: string; label: string }> = {
  smartphones:  { bg: "#EDE9FE", color: "#6D28D9", label: "Smartphones" },
  smartwatches: { bg: "#E6F7F5", color: "#0d9488", label: "Smartwatches" },
  laptops:      { bg: "#FEF3C7", color: "#B45309", label: "Laptops" },
  kitchen:      { bg: "#FCE7F3", color: "#BE185D", label: "Kitchen" },
  headphones:   { bg: "#DBEAFE", color: "#1D4ED8", label: "Headphones" },
};

function getCategoryStyle(category: string) {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(categoryStyles)) {
    if (key.includes(k)) return v;
  }
  return { bg: "#F3F4F6", color: "#374151", label: category };
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6); // show up to 6, auto-updates as you add more

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2a2a2d 100%)", padding: "72px 24px 64px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🇮🇳</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488", letterSpacing: 1, textTransform: "uppercase" as const }}>Honest Reviews for Indian Buyers</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 16 }}>
            India's Smartest<br />Product Buying Guide
          </h1>
          <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.8, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            Research-backed buying guides for tech and home products — written specifically for Indian budgets and availability.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const, marginBottom: 40 }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d9488", color: "#fff", fontWeight: 800, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none" }}>
              Browse All Guides →
            </Link>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none" }}>
              Explore Tech
            </Link>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap" as const }}>
            {[
              { value: "50+", label: "Buying Guides" },
              { value: "100%", label: "Free to Read" },
              { value: "₹0", label: "No Hidden Cost" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "12px 28px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center" as const }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#0d9488" }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Browse by Category */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap" as const, gap: 8 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.4px", marginBottom: 4 }}>Browse by Category</h2>
            <p style={{ fontSize: 14, color: "#9CA3AF" }}>Find exactly what you're looking for</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 64 }}>
          {[
            { icon: "💻", label: "Laptops", sub: "Best for every budget", href: "/category/laptops" },
            { icon: "📱", label: "Smartphones", sub: "Top picks for India", href: "/category/smartphones" },
            { icon: "⌚", label: "Smartwatches", sub: "Budget to premium", href: "/category/smartwatches" },
            { icon: "🎧", label: "Headphones", sub: "Sound & value", href: "/category/headphones" },
            { icon: "🍳", label: "Kitchen", sub: "For Indian kitchens", href: "/category/kitchen" },
            { icon: "🏠", label: "Home Electronics", sub: "Upgrade your home", href: "/category/home" },
          ].map((cat) => (
            <Link key={cat.label} href={cat.href} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, background: "#fff", borderRadius: 16, padding: "20px 12px", border: "1px solid #E5E4E0", textDecoration: "none", transition: "box-shadow 0.2s" }}>
              <span style={{ fontSize: 28 }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#1C1C1E", textAlign: "center" as const }}>{cat.label}</span>
              <span style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" as const, lineHeight: 1.4 }}>{cat.sub}</span>
            </Link>
          ))}
        </div>

        {/* Latest Guides — DYNAMIC from getAllPosts() */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap" as const, gap: 8 }}>
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
                const isFirst = i === 0;
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: isFirst ? "0 4px 20px rgba(0,0,0,0.07)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                    {/* Top accent bar */}
                    <div style={{ height: 4, background: isFirst ? "#0d9488" : "#E5E4E0" }} />
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" as const }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: catStyle.color, background: catStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                        {isFirst && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "#0d9488", padding: "3px 10px", borderRadius: 100 }}>Latest</span>}
                        {i === 1 && <span style={{ fontSize: 11, fontWeight: 700, color: "#B45309", background: "#FEF3C7", padding: "3px 10px", borderRadius: 100 }}>Popular</span>}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1C1C1E", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.2px" }}>{post.title}</h3>
                      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
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
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1E", textAlign: "center" as const, marginBottom: 6, letterSpacing: "-0.3px" }}>Why Trust SmartKharido?</h2>
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

      <style>{`
        @media (max-width: 640px) {
          .hero-buttons { flex-direction: column !important; align-items: stretch !important; }
        }
      `}</style>
    </div>
  );
}