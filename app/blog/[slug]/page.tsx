import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh", padding: "48px 24px 80px" } as React.CSSProperties,
  wrap: { maxWidth: 720, margin: "0 auto" } as React.CSSProperties,
  back: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600, marginBottom: 32 } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "5px 12px", borderRadius: 100, marginBottom: 16 } as React.CSSProperties,
  h1: { fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.2, letterSpacing: "-1px", marginBottom: 16 } as React.CSSProperties,
  meta: { display: "flex", gap: 16, alignItems: "center", fontSize: 13, color: "#aaa", marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid #E5E4E0", flexWrap: "wrap" as const } as React.CSSProperties,
  disclosure: { backgroundColor: "#E6F7F5", border: "1px solid #b2ddd8", borderRadius: 12, padding: "14px 18px", marginBottom: 40, fontSize: 13, color: "#0a7a70", lineHeight: 1.6 } as React.CSSProperties,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <Link href="/blog" style={s.back}>← Back to all guides</Link>

        <span style={s.tag}>{post.category}</span>
        <h1 style={s.h1}>{post.title}</h1>

        <div style={s.meta}>
          <span>📅 {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>⏱ {post.readTime} read</span>
        </div>

        <div style={s.disclosure}>
          <strong>Affiliate Disclosure:</strong> SmartKharido earns a small commission when you buy through our links — at no extra cost to you. This helps us keep our content free. <Link href="/affiliate-disclosure" style={{ color: "#0d9488" }}>Learn more</Link>
        </div>

        <div className="prose">
          <MDXRemote source={post.content} />
        </div>
      </div>

      <style>{`
        .prose h2 { font-size: 22px; font-weight: 700; color: #1C1C1E; margin: 36px 0 12px; letter-spacing: -0.3px; }
        .prose h3 { font-size: 18px; font-weight: 700; color: #1C1C1E; margin: 28px 0 10px; }
        .prose p { font-size: 16px; color: #444; line-height: 1.8; margin-bottom: 18px; }
        .prose ul, .prose ol { padding-left: 24px; margin-bottom: 18px; }
        .prose li { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 6px; }
        .prose strong { color: #1C1C1E; font-weight: 700; }
        .prose a { color: #0d9488; text-decoration: none; font-weight: 600; }
        .prose a:hover { text-decoration: underline; }
        .prose blockquote { border-left: 3px solid #0d9488; padding-left: 16px; margin: 24px 0; color: #666; font-style: italic; }
        .prose table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
        .prose th { background: #F7F6F3; padding: 10px 14px; text-align: left; font-weight: 700; color: #1C1C1E; border: 1px solid #E5E4E0; }
        .prose td { padding: 10px 14px; border: 1px solid #E5E4E0; color: #555; }
        .prose tr:nth-child(even) td { background: #FAFAF8; }
      `}</style>
    </div>
  );
}