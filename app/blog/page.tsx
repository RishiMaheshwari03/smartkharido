import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Buying Guides & Reviews — SmartKharido",
  description: "Browse all our buying guides and product reviews for Indian buyers. Smartphones, smartwatches, laptops, and home appliances.",
};

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "40px 20px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: 1.2, marginBottom: 8 }}>All Guides</p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#1C1C1E", letterSpacing: "-0.6px", marginBottom: 8 }}>Buying Guides & Reviews</h1>
          <p style={{ fontSize: 15, color: "#6B7280" }}>Honest, research-backed guides written for Indian buyers</p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px" }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: "center" as const, color: "#9CA3AF", padding: "64px 0" }}>No guides yet. Check back soon!</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {posts.map((post) => {
              const catStyle = getCategoryStyle(post.category);
              const coverImage = getCoverImage(post.slug, (post as any).products || [], (post as any).reviewProduct);
              const isReview = (post as any).articleType === "review";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  {/* Cover image */}
                  <div style={{ width: "100%", aspectRatio: "16/8", overflow: "hidden", position: "relative" as const }}>
                    <img src={coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute" as const, top: 10, left: 10, display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: catStyle.color, background: catStyle.bg, padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                      {isReview && <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", background: "#F5F3FF", padding: "3px 10px", borderRadius: 100 }}>Review</span>}
                    </div>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6 }}>
                      {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
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
    </div>
  );
}