"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Tech",          href: "/category/tech" },
    { label: "Home & Kitchen",href: "/category/home-kitchen" },
    { label: "Buying Guides", href: "/category/buying-guides" },
    { label: "Blog",          href: "/blog" },
  ];

  return (
    <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #E5E4E0", position: "sticky" as const, top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0d9488, #0f766e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", flexShrink: 0 }}>SK</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.3px" }}>SmartKharido</span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navLinks.map(link => {
            const active = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} style={{ fontSize: 13, fontWeight: 600, color: active ? "#0d9488" : "#374151", padding: "6px 14px", borderRadius: 8, textDecoration: "none", background: active ? "#E6F7F5" : "transparent" }}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6, flexDirection: "column" as const, gap: 5 }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#1C1C1E", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#1C1C1E", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "all 0.2s" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#1C1C1E", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "#fff", borderTop: "1px solid #E5E4E0", padding: "12px 20px 16px" }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#1C1C1E", padding: "12px 0", borderBottom: "1px solid #F3F4F6", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}