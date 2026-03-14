import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Map URL slug → display name + which post categories match
const categoryMap: Record<string, { label: string; description: string; matches: string[] }> = {
  tech:           { label: "Tech",            description: "Smartphones, laptops, smartwatches, headphones and all things tech.", matches: ["tech", "smartphones", "smartwatches", "laptops", "headphones", "electronics"] },
  smartphones:    { label: "Smartphones",     description: "Best smartphone buying guides for every Indian budget.", matches: ["smartphones", "smartphone"] },
  smartwatches:   { label: "Smartwatches",    description: "Best smartwatch picks under every budget in India.", matches: ["smartwatches", "smartwatch"] },
  laptops:        { label: "Laptops",         description: "Laptop buying guides for students, professionals and developers.", matches: ["laptops", "laptop"] },
  headphones:     { label: "Headphones",      description: "Best headphones and earphones for Indian buyers.", matches: ["headphones", "earphones", "audio"] },
  "home-kitchen": { label: "Home & Kitchen",  description: "Home appliances and kitchen electronics for Indian homes.", matches: ["kitchen", "home", "appliances", "air fryer"] },
  kitchen:        { label: "Kitchen",         description: "Kitchen appliances and gadgets for Indian cooking.", matches: ["kitchen", "appliances"] },
  home:           { label: "Home Electronics",description: "Home electronics and smart home devices.", matches: ["home", "electronics"] },
  "buying-guides":{ label: "Buying Guides",   description: "All our in-depth buying guides for Indian buyers.", matches: [""] }, // shows all
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryMap[slug];
  if (!cat) return {};
  return { title: `${cat.label} Buying Guides — SmartKharido`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryMap[slug];
  if (!cat) notFound();

  const allPosts = getAllPosts();

  // "buying-guides" shows everything; others filter by category match
  const posts = slug === "buying-guides"
    ? allPosts
    : allPosts.filter(post =>
        cat.matches.some(m => post.category.toLowerCase().includes(m))
      );

  return (
    <div style={{ backgroundColor: "#F7F6F3", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "48px 24px 36px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 20 }}>← Home</Link>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#1C1C1E", letterSpacing: "-0.6px", marginBottom: 10 }}>{cat.label}</h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>{cat.description}</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center" as const, padding: "64px 24px", background: "#fff", borderRadius: 20, border: "1px solid #E5E4E0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", marginBottom: 8 }}>Coming Soon</h2>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 24 }}>We're working on {cat.label} guides. Check back soon!</p>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0d9488", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 10, textDecoration: "none" }}>Browse All Guides →</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", background: "#fff", borderRadius: 16, border: "1px solid #E5E4E0", textDecoration: "none", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ height: 4, background: "#0d9488" }} />
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0d9488", background: "#E6F7F5", padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1C1C1E", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.2px" }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{post.readTime} read</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488" }}>Read guide →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}