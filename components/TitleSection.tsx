"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TitleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section
      id="title-break"
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Ruled lines — editorial feel */}
      <div style={{ position: "absolute", top: "10%", left: "6%", right: "6%", height: "1px", background: "var(--color-border)" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "6%", right: "6%", height: "1px", background: "var(--color-border)" }} />

      {/* Corner markers */}
      <div style={{ position: "absolute", top: "10%", left: "6%", width: "12px", height: "12px", borderTop: "2px solid var(--color-primary)", borderLeft: "2px solid var(--color-primary)" }} />
      <div style={{ position: "absolute", top: "10%", right: "6%", width: "12px", height: "12px", borderTop: "2px solid var(--color-primary)", borderRight: "2px solid var(--color-primary)" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "6%", width: "12px", height: "12px", borderBottom: "2px solid var(--color-primary)", borderLeft: "2px solid var(--color-primary)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "6%", width: "12px", height: "12px", borderBottom: "2px solid var(--color-primary)", borderRight: "2px solid var(--color-primary)" }} />

      <motion.div style={{ y, opacity, textAlign: "center", zIndex: 10, padding: "0 2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.55em",
              color: "var(--color-primary)",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Survival Analysis &middot; 1992&ndash;2025
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.8rem, 11vw, 9rem)",
              fontWeight: 300,
              lineHeight: 0.88,
              color: "var(--color-primary)",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
            }}
          >
            Trophy
            <br />
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>Drought</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              letterSpacing: "0.35em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
              marginTop: "1rem",
            }}
          >
            UEFA Champions League &middot; 23 Clubs &middot; 56 Spells
          </p>

          <motion.button
            onClick={() => document.getElementById("barcelona")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              marginTop: "4rem",
              background: "var(--color-primary)",
              border: "none",
              padding: "1.2rem 3.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.4em",
              color: "#ffffff",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            whileHover={{ background: "#c8a951" }}
            transition={{ duration: 0.25 }}
          >
            Begin Exploration
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
