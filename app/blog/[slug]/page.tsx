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
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      siteName: "SmartKharido",
    },
  };
}

const layouts: Record<string, React.ComponentType<{ post: any }>> = {
  comparison: dynamic(() => import("@/layouts/ComparisonLayout")),
  review:     dynamic(() => import("@/layouts/ReviewLayout")),
};

function ArticleSchema({ post }: { post: any }) {
  const baseUrl = "https://smartkharido.vercel.app";
  const rp = post.reviewProduct;
  const isReview = post.articleType === "review" && rp;

  const schema = isReview ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "SmartKharido" },
    "publisher": { "@type": "Organization", "name": "SmartKharido", "url": baseUrl },
    "url": `${baseUrl}/blog/${post.slug}`,
    "itemReviewed": {
      "@type": "Product",
      "name": rp.name,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rp.overallRating,
      "bestRating": 10,
      "worstRating": 1
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "SmartKharido" },
    "publisher": { "@type": "Organization", "name": "SmartKharido", "url": baseUrl },
    "url": `${baseUrl}/blog/${post.slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${baseUrl}/blog/${post.slug}` }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleType = (post as any).articleType || "comparison";
  const Layout = layouts[articleType];
  if (!Layout) notFound();

  return (
    <>
      <ArticleSchema post={post} />
      <Layout post={post} />
    </>
  );
}