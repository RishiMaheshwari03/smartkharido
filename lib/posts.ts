import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  articleType: string;
  excerpt: string;
  readTime: string;
  coverImage?: string;
  // comparison
  products?: any[];
  // review
  reviewProduct?: any;
  // guide
  guide?: any;
  // brand
  brand?: any;
};

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));
  return files
    .map(file => {
      const slug = file.replace(".mdx", "");
      const raw  = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title:       data.title       || "",
        date:        data.date        || "",
        category:    data.category    || "",
        articleType: data.articleType || "",
        excerpt:     data.excerpt     || "",
        readTime:    data.readTime    || "5 min",
        coverImage:  data.coverImage,
        products:    data.products,
        reviewProduct: data.reviewProduct,
        guide:       data.guide,
        brand:       data.brand,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const file = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title:       data.title       || "",
    date:        data.date        || "",
    category:    data.category    || "",
    articleType: data.articleType || "",
    excerpt:     data.excerpt     || "",
    readTime:    data.readTime    || "5 min",
    coverImage:  data.coverImage,
    products:    data.products,
    reviewProduct: data.reviewProduct,
    guide:       data.guide,
    brand:       data.brand,
  };
}