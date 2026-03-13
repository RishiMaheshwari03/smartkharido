"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Tech", href: "/category/tech" },
    { label: "Home & Kitchen", href: "/category/home-kitchen" },
    { label: "Buying Guides", href: "/category/buying-guides" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      backgroundColor: "rgba(247,246,243,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #E5E4E0",
    }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 12, fontWeight: 800, letterSpacing: "-0.5px" }}>SK</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.5px" }}>
            Smart<span style={{ color: "#0d9488" }}>Kharido</span>
          </span>
        </Link>

        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: "#6B6B6B", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0d9488")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6B6B6B")}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} className="mobile-btn"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 22, height: 2, backgroundColor: "#1C1C1E", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, backgroundColor: "#1C1C1E", borderRadius: 2, opacity: open ? 0 : 1, transition: "all 0.3s" }} />
          <span style={{ display: "block", width: 22, height: 2, backgroundColor: "#1C1C1E", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid #E5E4E0", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16, backgroundColor: "#F7F6F3" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontSize: 15, fontWeight: 500, color: "#6B6B6B", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}