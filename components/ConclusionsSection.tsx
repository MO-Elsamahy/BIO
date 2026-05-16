"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const findings = [
  { index: "01", title: "Structural Elite Dominance", text: "The median drought duration of 12 years (95% CI: 8–33) underscores a structural difficulty that exceeds common sporting intuition." },
  { index: "02", title: "Managerial Project Continuity", text: "Instability is the primary hazard; each additional manager extends the expected drought duration by 24% (TR = 1.24, p < 0.001)." },
  { index: "03", title: "The Irreplaceable Talent Gap", text: "Losing a generational talent more than doubles the expected drought (TR = 2.03), an impact that dwarfs all financial variables combined." },
  { index: "04", title: "League Infrastructure Advantage", text: "Domestic quality acts as a force multiplier; clubs from top-ranked leagues resolve droughts 58% faster per annum (HR = 1.583)." },
  { index: "05", title: "The Financial Neutrality", text: "Ownership structure and net transfer spending show no statistically significant independent effect when coaching and squad continuity are controlled." },
  { index: "06", title: "Statistical Discriminative Power", text: "The Log-Normal AFT model achieves an 82% concordance, successfully ranking the competitive longevity of 4 out of every 5 club pairings." },
];

export default function ConclusionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="conclusions" ref={ref} style={{ background: "#ffffff", padding: "15rem 2rem 10rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: "10rem", textAlign: "center" }}>
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
            style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 3rem" }}
          >
             <Image src="/ucl-logo.png" alt="UCL" fill style={{ objectFit: "contain" }} />
          </motion.div>
          <div style={{ overflow: "hidden", marginBottom: "3rem" }}>
            <motion.h2 
              initial={{ y: "100%" }} 
              animate={inView ? { y: 0 } : {}} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 5.5rem)", fontWeight: 300, color: "var(--color-primary)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              Synthesized Findings.
            </motion.h2>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--color-muted)", maxWidth: "800px", margin: "0 auto" }}>
            This investigation demonstrates that UCL trophy droughts are not merely products of chance, but are systematically predictable from institutional and sporting covariates.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" 
          animate={inView ? "visible" : "hidden"} 
          variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }} 
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6rem", marginBottom: "12rem" }} 
          className="grid-cols-1 lg:grid-cols-2"
        >
          {findings.map((f, i) => (
            <motion.div 
              key={i} 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} 
              whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.2 } }}
              style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "4rem", cursor: "default" }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-primary)", letterSpacing: "0.4em", marginBottom: "2rem", fontWeight: 800 }}>FINDING &mdash; {f.index}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1.2, color: "var(--color-primary)", marginBottom: "1.5rem" }}>{f.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--color-text)", lineHeight: 1.6, opacity: 0.8 }}>{f.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={inView ? { opacity: 1, scale: 1 } : {}} 
          transition={{ duration: 1.2, delay: 0.8 }} 
          whileHover={{ boxShadow: "0 60px 120px rgba(0,51,153,0.08)", y: -5 }}
          style={{ background: "#f8fafc", border: "1px solid var(--color-border)", padding: "8rem 5rem", textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.02)", transition: "all 0.4s ease" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "2.4rem", lineHeight: 1.3, color: "var(--color-primary)", maxWidth: "900px", margin: "0 auto" }}>
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
