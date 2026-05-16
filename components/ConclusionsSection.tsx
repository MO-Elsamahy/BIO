"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const conclusions = [
  { index: "01", finding: "Median drought duration is 12 years", stat: "95% CI: 8 to 33 years — reflects structural elite dominance." },
  { index: "02", finding: "Managerial instability is the primary risk", stat: "Each additional manager extends drought by 24% (TR = 1.24)." },
  { index: "03", finding: "Talent loss doubles expected duration", stat: "TR = 2.03, p = 0.015 — no amount of spending replicates a core talent." },
  { index: "04", finding: "Domestic league quality is structural", stat: "Top-league clubs resolve droughts 58% faster (HR = 1.583)." },
  { index: "05", finding: "Ownership has no significant effect", stat: "State-backed or billionaire funding adds little predictive power." },
  { index: "06", finding: "Log-Normal AFT provides best fit", stat: "AIC = 188.25 — 82% discriminative accuracy in ranking clubs." },
];

export default function ConclusionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="conclusions" ref={ref} style={{ background: "#ffffff", padding: "15rem 2rem 10rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: "10rem", textAlign: "center" }}>
          <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 3rem" }}>
             <Image src="/ucl-logo.png" alt="UCL" fill style={{ objectFit: "contain" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 5.5rem)", fontWeight: 300, color: "var(--color-primary)", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "3rem" }}>Principal Conclusions.</h2>
          <div style={{ width: "120px", height: "4px", background: "var(--color-accent)", margin: "0 auto" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6rem", marginBottom: "12rem" }} className="grid-cols-1 lg:grid-cols-2">
          {conclusions.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "4rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-primary)", letterSpacing: "0.4em", marginBottom: "2rem", fontWeight: 800 }}>CONCLUSION &mdash; {c.index}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", lineHeight: 1.2, color: "var(--color-primary)", marginBottom: "1.5rem" }}>{c.finding}</h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-muted)", letterSpacing: "0.05em" }}>{c.stat}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.2, delay: 0.8 }} style={{ background: "#f8fafc", border: "1px solid var(--color-border)", padding: "8rem 5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "2.2rem", lineHeight: 1.3, color: "var(--color-primary)", maxWidth: "900px", margin: "0 auto" }}>
            &ldquo;In the ecosystem of elite competition, structural continuity remains the single most consequential variable for institutional longevity.&rdquo;
          </p>
        </motion.div>

        <footer style={{ marginTop: "15rem", paddingTop: "6rem", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 900, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>Official Research Publication &middot; 2026</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#64748b", maxWidth: "500px", lineHeight: 1.6 }}>Survival Analysis of UEFA Champions League Trophy Droughts: A Parametric Investigation.</p>
          </div>
          <div style={{ textAlign: "right" }} className="text-left md:text-right">
             <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 800, marginBottom: "1rem" }}>SUPERVISOR: DR. WAFAA IBRAHIM</p>
             <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#94a3b8" }}>DATA: UCL HISTORICAL RECORDS &middot; R SURVIVAL</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
