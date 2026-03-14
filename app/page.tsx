import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "SmartKharido — Best Product Buying Guides for India",
  description: "Honest buying guides for smartphones, laptops, smartwatches and home appliances in India. Research-backed recommendations for Amazon India and Flipkart.",
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6);
  return <HomePageClient latestPosts={latestPosts} />;
}