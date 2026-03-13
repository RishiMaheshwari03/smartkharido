import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — All Buying Guides",
  description: "Browse all product buying guides and reviews on SmartKharido — written specifically for Indian buyers.",
};

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh", padding: "64px 24px" } as React.CSSProperties,
  wrap: { maxWidth: 1152, margin: "0 auto" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 12, fontWeight: 600, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "6px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: 0.3 } as React.CSSProperties,
  h1: { fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 8 } as React.CSSProperties,
  sub: { fontSize: 16, color: "#888", marginBottom: 48 } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 } as React.CSSProperties,
  card: { backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 16, padding: "28px 24px", textDecoration: "none", display: "block" } as React.CSSProperties,
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } as React.CSSProperties,
  category: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#0d9488" } as React.CSSProperties,
  date: { fontSize: 12, color: "#bbb" } as React.CSSProperties,
  title: { fontSize: 17, fontWeight: 700, color: "#1C1C1E", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.3px" } as React.CSSProperties,
  excerpt: { fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 16 } as React.CSSProperties,
  readTime: { fontSize: 12, color: "#bbb", fontWeight: 500 } as React.CSSProperties,
  empty: { textAlign: "center" as const, padding: "80px 24px" } as React.CSSProperties,
  emptyTitle: { fontSize: 20, fontWeight: 700, color: "#1C1C1E", marginBottom: 8 } as React.CSSProperties,
  emptyText: { fontSize: 15, color: "#aaa" } as React.CSSProperties,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <span style={s.tag}>All Guides</span>
        <h1 style={s.h1}>Buying Guides & Reviews</h1>
        <p style={s.sub}>Honest, research-backed guides written for Indian buyers</p>

        {posts.length === 0 ? (
          <div style={s.empty}>
            <p style={s.emptyTitle}>Articles coming soon</p>
            <p style={s.emptyText}>We're working on our first buying guides. Check back shortly.</p>
          </div>
        ) : (
          <div style={s.grid}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={s.card}>
                <div style={s.cardTop}>
                  <span style={s.category}>{post.category}</span>
                  <span style={s.date}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <p style={s.title}>{post.title}</p>
                <p style={s.excerpt}>{post.excerpt}</p>
                <span style={s.readTime}>{post.readTime} read</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}