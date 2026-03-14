import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";

const categoryMap: Record<string, { label: string; description: string; matches: string[]; emoji: string }> = {
  tech:           { label: "Tech",           emoji: "💻", description: "Smartphones, laptops, smartwatches, headphones and all things tech.", matches: ["tech","smartphones","smartwatches","laptops","headphones","electronics"] },
  smartphones:    { label: "Smartphones",    emoji: "📱", description: "Best smartphone buying guides for every Indian budget.", matches: ["smartphones","smartphone"] },
  smartwatches:   { label: "Smartwatches",   emoji: "⌚", description: "Best smartwatch picks under every budget in India.", matches: ["smartwatches","smartwatch"] },
  laptops:        { label: "Laptops",        emoji: "💻", description: "Laptop buying guides for students, professionals and developers.", matches: ["laptops","laptop"] },
  headphones:     { label: "Headphones",     emoji: "🎧", description: "Best headphones and earphones for Indian buyers.", matches: ["headphones","earphones","audio"] },
  "home-kitchen": { label: "Home & Kitchen", emoji: "🏠", description: "Home appliances and kitchen electronics for Indian homes.", matches: ["kitchen","home","appliances","air fryer"] },
  kitchen:        { label: "Kitchen",        emoji: "🍳", description: "Kitchen appliances and gadgets for Indian cooking.", matches: ["kitchen","appliances"] },
  home:           { label: "Home Electronics",emoji: "🏠", description: "Home electronics and smart home devices.", matches: ["home","electronics"] },
  "buying-guides":{ label: "Buying Guides",  emoji: "🗂", description: "All our in-depth buying guides for Indian buyers.", matches: [""] },
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

  // "buying-guides" shows only comparison type
  const posts = slug === "buying-guides"
    ? allPosts.filter(p => (p as any).articleType === "comparison")
    : allPosts.filter(post =>
        cat.matches.some(m => post.category.toLowerCase().includes(m))
      );

  return <CategoryPageClient posts={posts} category={cat} slug={slug} />;
}