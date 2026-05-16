"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "data", label: "Data" },
  { id: "kaplan-meier", label: "Kaplan-Meier" },
  { id: "cox", label: "Cox" },
  { id: "aft", label: "AFT" },
  { id: "barcelona", label: "Barcelona" },
  { id: "conclusions", label: "Conclusions" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sectionEls = sections.map((s) => document.getElementById(s.id));
      let current = "";
      sectionEls.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = sections[i].id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.6s ease",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem", height: "90px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ position: "relative", width: "45px", height: "45px", filter: scrolled ? "none" : "brightness(0) invert(1)" }}>
              <Image src="/ucl-logo.png" alt="UCL" fill style={{ objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.4em", color: scrolled ? "var(--color-primary)" : "#ffffff", textTransform: "uppercase", fontWeight: 900 }}>DROUGHT ANALYSIS</span>
          </button>

          <div className="hidden lg:flex" style={{ gap: "3rem", alignItems: "center" }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: activeSection === s.id ? "var(--color-primary)" : (scrolled ? "var(--color-muted)" : "rgba(255,255,255,0.7)"),
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: activeSection === s.id ? 800 : 400,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#000" : "#ffffff" }}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4rem" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", cursor: "pointer", color: "#000" }}>
            <X size={40} />
          </button>
          {sections.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: activeSection === s.id ? "var(--color-primary)" : "#000", background: "none", border: "none", cursor: "pointer" }}>{s.label}</button>
          ))}
        </div>
      )}
    </>
  );
}
