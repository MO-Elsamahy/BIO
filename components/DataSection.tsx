"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const tableData = [
  { variable: "Duration Years", type: "Numeric", role: "Time Variable", desc: "Years elapsed in drought spell" },
  { variable: "UCL Won", type: "Binary", role: "Event (1/0)", desc: "1 = UCL title won; 0 = right-censored" },
  { variable: "Starting Year", type: "Numeric", role: "Temporal", desc: "Season in which the drought commenced" },
  { variable: "Ending Year", type: "Numeric", role: "Temporal", desc: "Season in which the drought ended" },
  { variable: "Managers Used", type: "Count", role: "Covariate", desc: "Permanent managers during the spell" },
  { variable: "Total Net Spend (ME)", type: "Continuous", role: "Covariate", desc: "Estimated net transfer expenditure" },
  { variable: "Average Squad Age", type: "Continuous", role: "Covariate", desc: "Mean squad age across period" },
  { variable: "Previous UCL Titles", type: "Count", role: "Covariate", desc: "Titles won before spell started" },
  { variable: "Finals Lost", type: "Count", role: "Covariate", desc: "UCL finals lost during specific spell" },
  { variable: "UEFA League Rank", type: "Continuous", role: "Covariate", desc: "Average UEFA rank of domestic league" },
  { variable: "Billionaire/State", type: "Binary", role: "Covariate", desc: "1 = Oligarch/Sovereign wealth funded" },
  { variable: "Talent Departure", type: "Binary", role: "Covariate", desc: "1 = World-class (top-3 global) player lost" },
];

export default function DataSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="data" ref={ref} style={{ background: "#ffffff", padding: "15rem 2rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "6rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-primary)", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 800, display: "block", marginBottom: "1.5rem" }}>Section 02 &mdash; Data Dictionary</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 6vw, 4.5rem)", fontWeight: 400, color: "var(--color-primary)", marginBottom: "2rem" }}>Data Parameters.</h2>
          <div style={{ width: "100px", height: "4px", background: "var(--color-primary)", marginBottom: "3rem" }} />
          <p style={{ color: "var(--color-muted)", maxWidth: "800px", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: "2rem" }}>
            The dataset spans 56 distinct drought spells across 23 unique clubs. A key distinction in this analysis is the use of <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>UEFA League Rank</span> as a proxy for the competitive environment, rather than the club&apos;s individual coefficient.
          </p>
          <p style={{ color: "var(--color-muted)", maxWidth: "800px", lineHeight: 1.8, fontSize: "1.1rem" }}>
            Censoring applies to 23 spells where the drought remains unresolved as of the 2024-25 season. All censored observations are treated as non-informative, following standard survival analysis conventions.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={inView ? { opacity: 1, scale: 1 } : {}} style={{ overflowX: "auto", border: "1px solid var(--color-border)", background: "#ffffff", boxShadow: "0 40px 100px rgba(0,0,0,0.03)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid var(--color-primary)" }}>
                {["Variable", "Type", "Role", "Description"].map((col) => (
                  <th key={col} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.2em", textTransform: "uppercase", padding: "2rem", textAlign: "left", fontWeight: 900 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "transparent" : "#fcfcfd" }}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-primary)", padding: "1.5rem 2rem" }}>{row.variable}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#64748b", padding: "1.5rem 2rem" }}>{row.type}</td>
                  <td style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#475569", padding: "1.5rem 2rem" }}>{row.role}</td>
                  <td style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#64748b", padding: "1.5rem 2rem", opacity: 0.8 }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
