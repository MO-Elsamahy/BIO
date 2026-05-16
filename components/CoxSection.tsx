"use client";

import { useRef, useEffect, useState } from "react";
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

const coxData = [
  { name: "Average Squad Age",        hr: 1.728, lo: 0.961, hi: 3.107, sig: false, pval: "0.068" },
  { name: "Previous UCL Titles",      hr: 1.151, lo: 0.990, hi: 1.338, sig: false, pval: "0.067" },
  { name: "Avg UEFA League Rank",     hr: 1.583, lo: 1.184, hi: 2.117, sig: true,  pval: "0.002" },
  { name: "Generational Talent Dep.", hr: 0.210, lo: 0.051, hi: 0.862, sig: true,  pval: "0.030" },
  { name: "Managers Used",            hr: 0.571, lo: 0.452, hi: 0.723, sig: true,  pval: "<0.001" },
  { name: "Finals Lost",              hr: 0.515, lo: 0.240, hi: 1.104, sig: false, pval: "0.088" },
  { name: "Total Net Spend (ME)",     hr: 0.999, lo: 0.997, hi: 1.000, sig: false, pval: "0.079" },
  { name: "Billionaire/State Owned",  hr: 1.485, lo: 0.133, hi: 16.60, sig: false, pval: "0.748" },
];

function CountUpDecimal({ target, decimals = 3, duration = 2500 }: { target: number; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals]);
  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = coxData.find((d) => d.name === label);
    if (!data) return null;
    return (
      <div style={{ background: "#ffffff", border: "2px solid #003399", padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#0f172a", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ color: "#003399", marginBottom: "0.5rem", fontWeight: 800 }}>{data.name}</div>
        <div style={{ fontWeight: 700 }}>HR: {data.hr.toFixed(3)}</div>
        <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.5rem" }}>p = {data.pval}</div>
        <div style={{ fontSize: "0.75rem", marginTop: "0.3rem", color: data.sig ? "#003399" : "#94a3b8", fontWeight: data.sig ? 800 : 400 }}>{data.sig ? "SIGNIFICANT" : "not significant"}</div>
      </div>
    );
  }
  return null;
};

export default function CoxSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const chartData = coxData.map((d) => ({
    ...d,
    hrLog: Math.log10(d.hr),
  }));

  return (
    <section id="cox" ref={ref} style={{ background: "#f8fafc", padding: "15rem 2rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: "8rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-primary)", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 800 }}>Section 04</span>
            <motion.div initial={{ width: 0 }} animate={inView ? { width: "200px" } : {}} transition={{ duration: 1.8 }} style={{ height: "2px", background: "var(--color-primary)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 300, color: "var(--color-primary)", lineHeight: 1 }}>Cox Regression.</h2>
        </motion.div>

        {/* C-Index Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ display: "inline-flex", gap: "4rem", alignItems: "center", background: "#ffffff", padding: "4rem 5rem", borderLeft: "10px solid var(--color-primary)", boxShadow: "0 20px 40px rgba(0,0,0,0.04)", marginBottom: "10rem" }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "4.5rem", color: "var(--color-primary)", lineHeight: 1 }}>
              <CountUpDecimal target={0.923} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-muted)", letterSpacing: "0.25em", marginTop: "0.8rem", fontWeight: 800, textTransform: "uppercase" }}>Concordance Index</div>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--color-text)", lineHeight: 1.6, maxWidth: "320px" }}>
            The full Cox model correctly ranks drought durations in <strong>92.3%</strong> of all two-club comparisons.
          </p>
        </motion.div>

        {/* Forest Plot */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: "#ffffff", padding: "6rem", border: "1px solid var(--color-border)", boxShadow: "0 50px 100px rgba(0,0,0,0.04)" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "3rem" }}>Forest Plot — Full Cox Model (n=56, events=33) — Darker bars = p &lt; 0.05</p>
          <ResponsiveContainer width="100%" height={480}>
            <ComposedChart layout="vertical" data={chartData} margin={{ top: 10, right: 80, left: 250, bottom: 40 }}>
              <CartesianGrid horizontal={false} vertical stroke="#f0f0f0" />
              <XAxis
                type="number"
                domain={[Math.log10(0.05), Math.log10(20)]}
                ticks={[Math.log10(0.1), 0, Math.log10(2), Math.log10(5), Math.log10(10)]}
                tickFormatter={(v) => Math.pow(10, v).toFixed(1)}
                tick={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" }}
                label={{ value: "Hazard Ratio (log scale)", position: "insideBottom", offset: -25, style: { fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" } }}
              />
              <YAxis type="category" dataKey="name" tick={{ fontFamily: "var(--font-display)", fontSize: 15, fill: "#0f172a" }} width={240} />
              <ReferenceLine x={0} stroke="#cbd5e1" strokeWidth={2} label={{ value: "HR = 1.0", position: "top", style: { fill: "#94a3b8", fontFamily: "var(--font-mono)", fontSize: 10 } }} />
              <Bar dataKey="hrLog" barSize={14} animationDuration={2000} animationEasing="ease-out" isAnimationActive={true}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.hr > 1 ? "#003399" : "#a50044"} fillOpacity={entry.sig ? 1 : 0.25} />
                ))}
              </Bar>
              <Tooltip content={<CustomTooltip />} />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
