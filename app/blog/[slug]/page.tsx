import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ComparisonLayout from "@/layouts/ComparisonLayout";
import ReviewLayout from "@/layouts/ReviewLayout";
import GuideLayout from "@/layouts/GuideLayout";
import BrandLayout from "@/layouts/BrandLayout";

// ── Add new article type? → one line here ──────────────────────────
const layouts: Record<string, React.ComponentType<{ post: any }>> = {
  comparison: ComparisonLayout,
  review:     ReviewLayout,
  guide:      GuideLayout,
  brand:      BrandLayout,
};
// ───────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const coverImage = post.coverImage
    || post.reviewProduct?.image
    || post.products?.[0]?.image
    || "";

  return {
    title: `${post.title} | SmartKharido`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: post.articleType === "review" ? "article" : "website",
      images: coverImage ? [{ url: coverImage, width: 800, height: 450, alt: post.title }] : [],
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Layout = layouts[post.articleType as string];
  if (!Layout) notFound();

  const isReview     = post.articleType === "review";
  const isComparison = post.articleType === "comparison";

  // Schema markup
  const schema = isReview ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": post.title,
    "description": post.excerpt,
    "author": { "@type": "Organization", "name": "SmartKharido" },
    "datePublished": post.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": post.reviewProduct?.overallRating,
      "bestRating": 10,
    },
    "itemReviewed": {
      "@type": "Product",
      "name": post.reviewProduct?.name,
    },
  } : isComparison ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Organization", "name": "SmartKharido" },
    "datePublished": post.date,
  } : {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Organization", "name": "SmartKharido" },
    "datePublished": post.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Layout post={post} />
    </>
  );
}