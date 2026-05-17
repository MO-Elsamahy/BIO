"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const aftData = [
  { name: "Managers Used",           tr: 1.24, sig: true,  pval: "<0.001", interp: "Each manager extends drought by 24%" },
  { name: "Talent Departure",        tr: 2.03, sig: true,  pval: "0.015",  interp: "Doubles expected drought duration" },
  { name: "Avg UEFA League Rank",    tr: 0.89, sig: true,  pval: "0.046",  interp: "Top leagues: 11% shorter droughts" },
  { name: "Finals Lost",             tr: 1.32, sig: false, pval: "0.082",  interp: "Borderline: +32% per final lost" },
  { name: "Previous UCL Titles",     tr: 0.95, sig: false, pval: "0.123",  interp: "N.S." },
  { name: "Average Squad Age",       tr: 0.81, sig: false, pval: "0.133",  interp: "N.S." },
  { name: "Total Net Spend (ME)",    tr: 1.00, sig: false, pval: "0.377",  interp: "N.S. — spending does not predict resolution" },
  { name: "Billionaire/State Owned", tr: 0.75, sig: false, pval: "0.594",  interp: "N.S." },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = aftData.find((d) => d.name === label);
    if (!data) return null;
    return (
      <div style={{ background: "#ffffff", border: "2px solid #003399", padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#0f172a", maxWidth: "300px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ color: "#003399", marginBottom: "0.5rem", fontWeight: 800 }}>{data.name}</div>
        <div style={{ fontWeight: 700 }}>TR: {data.tr.toFixed(2)}</div>
        <div style={{ color: "#64748b", fontSize: "0.8rem", fontStyle: "italic", marginTop: "0.5rem" }}>{data.interp}</div>
      </div>
    );
  }
  return null;
};

export default function AFTSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const chartRef = useRef<HTMLDivElement>(null);
  const isChartInView = useInView(chartRef, { once: true, margin: "-100px" });

  const chartData = aftData.map((d) => ({ ...d, trShifted: d.tr - 1 }));

  return (
    <section id="aft" ref={ref} style={{ background: "#ffffff", padding: "15rem 2rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: "8rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-primary)", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 800 }}>Section 05</span>
            <motion.div initial={{ width: 0 }} animate={inView ? { width: "200px" } : {}} transition={{ duration: 1.8 }} style={{ height: "2px", background: "var(--color-primary)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--color-primary)", lineHeight: 1 }}>
            Accelerated Failure Time.
          </h2>
          <p style={{ color: "var(--color-muted)", marginTop: "2rem", fontSize: "1.1rem", maxWidth: "600px" }}>
            Log-Normal AFT — AIC 188.25 (Best Fit). Time Ratio &gt; 1 = drought extended. TR &lt; 1 = shortened.
          </p>
        </motion.div>

        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: "#f8fafc", padding: "5rem", border: "1px solid var(--color-border)", marginBottom: "8rem", minHeight: "580px" }}
        >
          {isChartInView && (
            <ResponsiveContainer width="100%" height={480}>
              <ComposedChart layout="vertical" data={chartData} margin={{ top: 10, right: 60, left: 250, bottom: 40 }}>
                <CartesianGrid horizontal={false} vertical stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  domain={[-0.6, 1.1]}
                  tickFormatter={(v) => (v + 1).toFixed(1)}
                  tick={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" }}
                  label={{ value: "Time Ratio (TR)", position: "insideBottom", offset: -25, style: { fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" } }}
                />
                <YAxis type="category" dataKey="name" tick={{ fontFamily: "var(--font-display)", fontSize: 15, fill: "#0f172a" }} width={240} />
                <ReferenceLine x={0} stroke="#cbd5e1" strokeWidth={2} label={{ value: "TR = 1.0", position: "top", style: { fill: "#94a3b8", fontFamily: "var(--font-mono)", fontSize: 10 } }} />
                <Bar dataKey="trShifted" barSize={14} animationDuration={2200} animationEasing="ease-out" isAnimationActive={true}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.tr > 1 ? "#a50044" : "#003399"} fillOpacity={entry.sig ? 1 : 0.22} />
                  ))}
                </Bar>
                <Tooltip content={<CustomTooltip />} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ background: "#f1f5f9", borderLeft: "10px solid var(--color-primary)", padding: "4rem 5rem" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontStyle: "italic", color: "var(--color-primary)", lineHeight: 1.4 }}>
            &ldquo;Losing a world-class player (TR = 2.03) more than doubles the expected drought duration — exceeding the combined effect of all financial covariates in the model.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
