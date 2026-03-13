import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  articleType: string;
  content: string;
  products?: object[];
  reviewProduct?: object;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        category: data.category || "",
        excerpt: data.excerpt || "",
        readTime: data.readTime || "5 min",
        articleType: data.articleType || "comparison",
        products: data.products || [],
        reviewProduct: data.reviewProduct || null,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "",
      excerpt: data.excerpt || "",
      readTime: data.readTime || "5 min",
      articleType: data.articleType || "comparison",
      products: data.products || [],
      reviewProduct: data.reviewProduct || null,
      content,
    };
  } catch {
    return null;
  }
}