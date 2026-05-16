"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, duration = 2200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { value: 56, label: "Drought Spells Tracked" },
  { value: 23, label: "Unique Elite Clubs" },
  { value: 33, label: "Resolved Events (Wins)" },
];

export default function IntroductionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="introduction" ref={ref} style={{ background: "var(--color-bg)", padding: "15rem 2rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "10rem" }} className="grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "4rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-primary)", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 800 }}>Section 01</span>
            <motion.div initial={{ width: 0 }} animate={inView ? { width: "120px" } : {}} transition={{ duration: 1.8 }} style={{ height: "2px", background: "var(--color-primary)" }} />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400, color: "var(--color-primary)", lineHeight: 0.92, letterSpacing: "-0.04em", marginBottom: "4rem" }}
          >
            Framing the<br /><span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>Survival Problem.</span>
          </motion.h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", lineHeight: 1.85, color: "var(--color-text)" }}
            >
              Since the Champions League&apos;s rebranding in 1992, continental success has become the defining benchmark for club ambition. For most participants, seasons pass — sometimes decades — without a title. These periods constitute what this study calls a{" "}
              <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>trophy drought</span>: a formally defined spell between UCL wins, or from 1992 if no win had yet occurred.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.35 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", lineHeight: 1.85, color: "var(--color-text)" }}
            >
              The structure maps directly onto a survival analysis problem: a clear event of interest, a defined time axis, and incomplete follow-up handled through right-censoring. The dataset covers all UCL finalists from 1992&ndash;93 through 2024&ndash;25.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ borderLeft: "8px solid var(--color-primary)", background: "#f1f5f9", padding: "3.5rem 4rem" }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontStyle: "italic", lineHeight: 1.45, color: "var(--color-primary)" }}>
                &ldquo;Given a set of institutional and sporting covariates, how long does it take for a club to end its UCL drought?&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2rem" }}>Research Question</p>
            </motion.div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              whileHover={{ y: -8, boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              style={{ background: "#ffffff", padding: "3.5rem", border: "1px solid var(--color-border)", borderBottom: "5px solid var(--color-primary)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "4.5rem", fontWeight: 300, color: "var(--color-primary)", lineHeight: 1, marginBottom: "0.8rem" }}>
                <CountUp target={stat.value} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.35em", fontWeight: 800 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
