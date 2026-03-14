import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "All Buying Guides & Reviews — SmartKharido",
  description: "Browse all our buying guides and product reviews for Indian buyers.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" as const }}>Loading...</div>}>
      <BlogPageClient posts={posts} />
    </Suspense>
  );
}