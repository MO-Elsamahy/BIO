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

      {/* Corner markers with subtle floating animation */}
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} style={{ position: "absolute", top: "10%", left: "6%", width: "12px", height: "12px", borderTop: "2px solid var(--color-primary)", borderLeft: "2px solid var(--color-primary)" }} />
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} style={{ position: "absolute", top: "10%", right: "6%", width: "12px", height: "12px", borderTop: "2px solid var(--color-primary)", borderRight: "2px solid var(--color-primary)" }} />
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} style={{ position: "absolute", bottom: "10%", left: "6%", width: "12px", height: "12px", borderBottom: "2px solid var(--color-primary)", borderLeft: "2px solid var(--color-primary)" }} />
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} style={{ position: "absolute", bottom: "10%", right: "6%", width: "12px", height: "12px", borderBottom: "2px solid var(--color-primary)", borderRight: "2px solid var(--color-primary)" }} />

      <motion.div style={{ y, opacity, textAlign: "center", zIndex: 10, padding: "0 2rem" }}>
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
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
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
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
            </motion.h1>
          </div>

          <div style={{ overflow: "hidden", marginTop: "1rem" }}>
            <motion.p
              variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                letterSpacing: "0.35em",
                color: "var(--color-muted)",
                textTransform: "uppercase",
              }}
            >
              UEFA Champions League &middot; 23 Clubs &middot; 56 Spells
            </motion.p>
          </div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
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
                boxShadow: "0 15px 35px rgba(0,51,153,0.2)",
              }}
              whileHover={{ background: "#c8a951", scale: 1.05, boxShadow: "0 20px 40px rgba(200,169,81,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              Begin Exploration
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
