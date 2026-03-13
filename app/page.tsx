import Link from "next/link";

const categories = [
  { name: "Laptops", icon: "💻", href: "/category/tech", desc: "Best for every budget" },
  { name: "Smartphones", icon: "📱", href: "/category/tech", desc: "Top picks for India" },
  { name: "Smartwatches", icon: "⌚", href: "/category/tech", desc: "Budget to premium" },
  { name: "Headphones", icon: "🎧", href: "/category/tech", desc: "Sound & value" },
  { name: "Kitchen Appliances", icon: "🍳", href: "/category/home-kitchen", desc: "For Indian kitchens" },
  { name: "Home Electronics", icon: "🏠", href: "/category/home-kitchen", desc: "Upgrade your home" },
];

const posts = [
  { title: "Best Laptops Under ₹50,000 in India (2025)", category: "Laptops", slug: "best-laptops-under-50000-india-2025", time: "8 min", excerpt: "Honest recommendations for students, developers and professionals.", badge: "Most Read", badgeColor: "#0d9488" },
  { title: "Top 5 Smartwatches Under ₹10,000 in India", category: "Smartwatches", slug: "best-smartwatches-under-10000-india-2025", time: "6 min", excerpt: "Which budget smartwatch is actually worth buying in India?", badge: "Popular", badgeColor: "#7C3AED" },
  { title: "Best Air Fryers in India: Honest Buying Guide", category: "Kitchen", slug: "best-air-fryers-india-2025", time: "7 min", excerpt: "Best air fryers on Amazon India and Flipkart with real specs.", badge: "New", badgeColor: "#D97706" },
];

const s = {
  page: { backgroundColor: "#F7F6F3", minHeight: "100vh" } as React.CSSProperties,
  wrap: { maxWidth: 1152, margin: "0 auto", padding: "0 24px" } as React.CSSProperties,
  
  hero: { backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", padding: "72px 24px 80px" } as React.CSSProperties,
  heroInner: { maxWidth: 1152, margin: "0 auto" } as React.CSSProperties,
  tag: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#0d9488", backgroundColor: "#E6F7F5", padding: "6px 14px", borderRadius: 100, marginBottom: 24, letterSpacing: 0.3 } as React.CSSProperties,
  h1: { fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#1C1C1E", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 20, maxWidth: 680 } as React.CSSProperties,
  accent: { color: "#0d9488" } as React.CSSProperties,
  sub: { fontSize: 17, color: "#888", lineHeight: 1.7, maxWidth: 520, marginBottom: 32 } as React.CSSProperties,
  
  statsRow: { display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" as const } as React.CSSProperties,
  stat: { display: "flex", flexDirection: "column" as const, gap: 2 } as React.CSSProperties,
  statNum: { fontSize: 22, fontWeight: 800, color: "#0d9488", letterSpacing: "-0.5px" } as React.CSSProperties,
  statLabel: { fontSize: 12, color: "#aaa", fontWeight: 500 } as React.CSSProperties,
  
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#0d9488", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 12, textDecoration: "none", letterSpacing: "-0.2px" } as React.CSSProperties,
  btnSecondary: { display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "transparent", color: "#555", fontWeight: 600, fontSize: 14, padding: "13px 24px", borderRadius: 12, textDecoration: "none", border: "1.5px solid #DDD" } as React.CSSProperties,

  section: { padding: "64px 24px" } as React.CSSProperties,
  sectionWhite: { padding: "64px 24px", backgroundColor: "#fff", borderTop: "1px solid #E5E4E0", borderBottom: "1px solid #E5E4E0" } as React.CSSProperties,
  sectionHead: { marginBottom: 32 } as React.CSSProperties,
  h2: { fontSize: 26, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.5px", marginBottom: 4 } as React.CSSProperties,
  sectionSub: { fontSize: 14, color: "#aaa", fontWeight: 400 } as React.CSSProperties,

  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 } as React.CSSProperties,
  catCard: { padding: "20px 18px", backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 16, textDecoration: "none", display: "block", transition: "all 0.2s" } as React.CSSProperties,
  catIcon: { fontSize: 24, marginBottom: 10, display: "block" } as React.CSSProperties,
  catName: { fontSize: 14, fontWeight: 700, color: "#1C1C1E", marginBottom: 3 } as React.CSSProperties,
  catDesc: { fontSize: 12, color: "#aaa" } as React.CSSProperties,

  postGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 } as React.CSSProperties,
  postCard: { padding: "24px", backgroundColor: "#F7F6F3", border: "1px solid #E5E4E0", borderRadius: 16, textDecoration: "none", display: "block" } as React.CSSProperties,
  postTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } as React.CSSProperties,
  postCat: { fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#0d9488" } as React.CSSProperties,
  postTitle: { fontSize: 16, fontWeight: 700, color: "#1C1C1E", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.2px" } as React.CSSProperties,
  postExcerpt: { fontSize: 13, color: "#888", lineHeight: 1.65, marginBottom: 16 } as React.CSSProperties,
  postTime: { fontSize: 12, color: "#bbb", fontWeight: 500 } as React.CSSProperties,

  trustGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 } as React.CSSProperties,
  trustCard: { padding: "28px 24px", backgroundColor: "#fff", border: "1px solid #E5E4E0", borderRadius: 16 } as React.CSSProperties,
  trustIcon: { fontSize: 28, marginBottom: 14, display: "block" } as React.CSSProperties,
  trustTitle: { fontSize: 15, fontWeight: 700, color: "#1C1C1E", marginBottom: 6 } as React.CSSProperties,
  trustDesc: { fontSize: 13, color: "#888", lineHeight: 1.65 } as React.CSSProperties,
};

export default function HomePage() {
  return (
    <div style={s.page}>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <span style={s.tag}>🇮🇳 Honest Reviews for Indian Buyers</span>
          <h1 style={s.h1}>
            India's Smartest<br />
            <span style={s.accent}>Product Buying Guide</span>
          </h1>
          <p style={s.sub}>
            Research-backed buying guides for tech and home products — written specifically for Indian budgets and availability.
          </p>
          <div style={s.statsRow}>
            {[["50+", "Buying Guides"], ["100%", "Free to Read"], ["₹0", "No Hidden Cost"]].map(([num, label]) => (
              <div key={label} style={s.stat}>
                <span style={s.statNum}>{num}</span>
                <span style={s.statLabel}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/blog" style={s.btnPrimary}>Browse All Guides →</Link>
            <Link href="/category/tech" style={s.btnSecondary}>Explore Tech</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={s.section}>
        <div style={s.wrap}>
          <div style={s.sectionHead}>
            <h2 style={s.h2}>Browse by Category</h2>
            <p style={s.sectionSub}>Find exactly what you're looking for</p>
          </div>
          <div style={s.catGrid}>
            {categories.map(cat => (
              <Link key={cat.name} href={cat.href} style={s.catCard}>
                <span style={s.catIcon}>{cat.icon}</span>
                <p style={s.catName}>{cat.name}</p>
                <p style={s.catDesc}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section style={s.sectionWhite}>
        <div style={s.wrap}>
          <div style={{ ...s.sectionHead, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h2 style={s.h2}>Latest Guides</h2>
              <p style={s.sectionSub}>Researched and written for Indian buyers</p>
            </div>
            <Link href="/blog" style={{ fontSize: 13, color: "#0d9488", textDecoration: "none", fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={s.postGrid}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={s.postCard}>
                <div style={s.postTop}>
                  <span style={s.postCat}>{post.category}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: post.badgeColor, backgroundColor: post.badgeColor + "18", padding: "3px 10px", borderRadius: 100 }}>{post.badge}</span>
                </div>
                <p style={s.postTitle}>{post.title}</p>
                <p style={s.postExcerpt}>{post.excerpt}</p>
                <span style={s.postTime}>{post.time} read</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section style={s.section}>
        <div style={s.wrap}>
          <div style={{ ...s.sectionHead, textAlign: "center" }}>
            <h2 style={s.h2}>Why Trust SmartKharido?</h2>
            <p style={s.sectionSub}>Built for real Indian buyers, not page views</p>
          </div>
          <div style={s.trustGrid}>
            {[
              { icon: "🔍", title: "Deeply Researched", desc: "Every guide is based on real specs and Indian market availability — not copied spec sheets." },
              { icon: "💰", title: "Budget-Aware", desc: "We cover all price points — from ₹500 accessories to ₹1,00,000+ premium products." },
              { icon: "🇮🇳", title: "India-Specific", desc: "Amazon India and Flipkart availability always checked before recommending any product." },
            ].map(item => (
              <div key={item.title} style={s.trustCard}>
                <span style={s.trustIcon}>{item.icon}</span>
                <p style={s.trustTitle}>{item.title}</p>
                <p style={s.trustDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}