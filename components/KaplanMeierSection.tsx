"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const kmData = [
  { t: 0,  s: 1.000, lo: 1.000, hi: 1.000 },
  { t: 2,  s: 0.964, lo: 0.919, hi: 1.000 },
  { t: 4,  s: 0.911, lo: 0.851, hi: 0.971 },
  { t: 6,  s: 0.857, lo: 0.787, hi: 0.927 },
  { t: 8,  s: 0.821, lo: 0.745, hi: 0.897 },
  { t: 10, s: 0.768, lo: 0.686, hi: 0.850 },
  { t: 12, s: 0.500, lo: 0.396, hi: 0.604 },
  { t: 15, s: 0.440, lo: 0.320, hi: 0.560 },
  { t: 20, s: 0.350, lo: 0.220, hi: 0.480 },
  { t: 28, s: 0.250, lo: 0.120, hi: 0.380 },
  { t: 33, s: 0.150, lo: 0.050, hi: 0.250 },
];

// Custom animated line that draws itself in
const AnimatedLine = ({ animationDuration = 3000, ...props }: any) => (
  <Line {...props} animationDuration={animationDuration} animationEasing="ease-in-out" isAnimationActive={true} />
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const s = payload.find((p: any) => p.dataKey === "s")?.value;
    return (
      <div style={{ background: "#ffffff", border: "2px solid var(--color-primary)", padding: "1rem 1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#0f172a", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
        <div style={{ color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: 800 }}>YEAR {label}</div>
        <div style={{ fontWeight: 600 }}>{s !== undefined ? `${(s * 100).toFixed(1)}%` : ""} SURVIVAL</div>
      </div>
    );
  }
  return null;
};

export default function KaplanMeierSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [chartKey, setChartKey] = useState(0);

  // Retrigger chart animation when section enters view
  const chartRef = useRef<HTMLDivElement>(null);
  const isChartInView = useInView(chartRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section id="kaplan-meier" ref={ref} style={{ background: "#ffffff", padding: "15rem 2rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ marginBottom: "8rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-primary)", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 800 }}>Section 03</span>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "200px" } : {}}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              style={{ height: "2px", background: "var(--color-primary)" }}
            />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 5rem)", fontWeight: 300, color: "var(--color-primary)", lineHeight: 0.9 }}>
            Non-Parametric Estimates.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "10rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", lineHeight: 1.8, color: "var(--color-text)" }}
            >
              The <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>estimated median drought duration is 12 years</span> (95% CI: 8 to 33 years), meaning half of all drought spells lasted at least 12 years before resolution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ border: "1px solid var(--color-accent)", padding: "3.5rem", background: "#fffdf5" }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontStyle: "italic", lineHeight: 1.4, color: "var(--color-primary)" }}>
                &ldquo;After year 10, the conditional probability of ending a drought decays exponentially.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: "flex", gap: "3rem" }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "3.5rem", color: "var(--color-primary)", fontWeight: 300 }}>12</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Median Years</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "3.5rem", color: "var(--color-accent)", fontWeight: 300 }}>33</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Max Observed</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: "#ffffff", padding: "4rem", border: "1px solid var(--color-border)", boxShadow: "0 40px 80px rgba(0,0,0,0.05)", minHeight: "560px" }}
          >
            {isChartInView && (
              <ResponsiveContainer width="100%" height={480}>
                <ComposedChart data={kmData} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid stroke="#eee" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" }} label={{ value: "Years into Drought", position: "insideBottom", offset: -25, style: { fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" } }} />
                  <YAxis domain={[0, 1]} tick={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: "#64748b" }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                  <Area dataKey="hi" fill="rgba(0,51,153,0.06)" stroke="none" type="stepAfter" isAnimationActive={false} />
                  <Area dataKey="lo" fill="#fff" stroke="none" type="stepAfter" isAnimationActive={false} />
                  <AnimatedLine
                    dataKey="s"
                    stroke="#003399"
                    strokeWidth={4}
                    dot={false}
                    type="stepAfter"
                    animationDuration={3500}
                  />
                  <ReferenceLine y={0.5} stroke="#c8a951" strokeDasharray="8 8" strokeWidth={2} label={{ value: "MEDIAN = 12y", position: "right", style: { fill: "#c8a951", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 900 } }} />
                  <Tooltip content={<CustomTooltip />} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
