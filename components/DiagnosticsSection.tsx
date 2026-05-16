"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const violatingVars = [
  { variable: "Billionaire/State Owned", chisq: "6.181", pval: "0.013", action: "Stratified" },
  { variable: "Managers Used",           chisq: "9.683", pval: "0.002", action: "Excluded" },
  { variable: "Total Net Spend",         chisq: "5.117", pval: "0.024", action: "Excluded" },
];

const aftDistributions = [
  { dist: "Log-Normal",   aic: "188.25", selected: true  },
  { dist: "Weibull",      aic: "189.57", selected: false },
  { dist: "Log-Logistic", aic: "189.59", selected: false },
  { dist: "Exponential",  aic: "214.55", selected: false },
];

export default function DiagnosticsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diagnostics" ref={ref} style={{ background: "var(--color-bg)", padding: "15rem 2rem", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: "8rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent)", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 800, display: "block", marginBottom: "1.5rem" }}>05 &mdash; Model Diagnostics</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--color-primary)" }}>Refinement & Validity.</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "8rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.2 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-accent)", marginBottom: "2.5rem" }}>Schoenfeld Residuals.</h3>
            <div style={{ border: "1px solid var(--color-border)", background: "#ffffff" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid var(--color-border)" }}>
                    {["Variable", "Chi-sq", "p-value", "Remediation"].map((h) => (
                      <th key={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-muted)", padding: "1.5rem", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {violatingVars.map((v, i) => (
                    <tr key={i} style={{ borderBottom: i < 2 ? "1px solid var(--color-border)" : "none" }}>
                      <td style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: 600 }}>{v.variable}</td>
                      <td style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-muted)" }}>{v.chisq}</td>
                      <td style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#c84b4b", fontWeight: 800 }}>{v.pval}</td>
                      <td style={{ padding: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-accent)", fontWeight: 700 }}>{v.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.4 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-primary)", marginBottom: "2.5rem" }}>AIC Optimization.</h3>
            <div style={{ border: "1px solid var(--color-border)", background: "#ffffff" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid var(--color-border)" }}>
                    {["Distribution", "AIC Score"].map((h) => (
                      <th key={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-muted)", padding: "1.5rem", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aftDistributions.map((d, i) => (
                    <tr key={i} style={{ borderBottom: i < 3 ? "1px solid var(--color-border)" : "none", background: d.selected ? "#f1f5f9" : "transparent" }}>
                      <td style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: d.selected ? "var(--color-accent)" : "var(--color-primary)", fontWeight: d.selected ? 800 : 400 }}>
                        {d.dist}
                        {d.selected && <span style={{ marginLeft: "1rem", fontSize: "0.6rem", background: "var(--color-accent)", color: "#fff", padding: "0.3rem 0.6rem", borderRadius: "2px", fontWeight: 900 }}>SELECTED</span>}
                      </td>
                      <td style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: d.selected ? "var(--color-accent)" : "var(--color-muted)", fontWeight: d.selected ? 800 : 400 }}>{d.aic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
