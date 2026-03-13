import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const layouts: Record<string, React.ComponentType<{ post: any }>> = {
  comparison: dynamic(() => import("@/layouts/ComparisonLayout")),
  review:     dynamic(() => import("@/layouts/ReviewLayout")),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleType = (post as any).articleType || "comparison";
  const Layout = layouts[articleType];

  if (!Layout) {
    console.error(`No layout found for articleType: "${articleType}"`);
    notFound();
  }

  return <Layout post={post} />;
}