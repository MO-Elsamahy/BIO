"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Image from "next/image";

const barcaSimulationData = [
  { t: 0, current: 1.00, alvarez: 1.00 },
  { t: 2, current: 0.94, alvarez: 0.93 },
  { t: 4, current: 0.86, alvarez: 0.84 },
  { t: 6, current: 0.75, alvarez: 0.72 },
  { t: 8, current: 0.62, alvarez: 0.58 },
  { t: 9.1, current: 0.54, alvarez: 0.50 }, // Alvarez Median
  { t: 9.6, current: 0.50, alvarez: 0.46 }, // Current Median
  { t: 11, current: 0.42, alvarez: 0.38 }, // Present
  { t: 14, current: 0.30, alvarez: 0.26 },
  { t: 16, current: 0.22, alvarez: 0.18 },
  { t: 20, current: 0.12, alvarez: 0.08 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#ffffff", border: "2px solid #edbb00", padding: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#000", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
        <div style={{ color: "#a50044", marginBottom: "0.5rem", fontWeight: 800 }}>YEAR {label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            <span style={{ color: "#666" }}>{p.name}:</span>
            <span style={{ fontWeight: 800, color: p.stroke }}>{(p.value * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BarcelonaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  const chartRef = useRef<HTMLDivElement>(null);
  const isChartInView = useInView(chartRef, { once: true, margin: "-100px" });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const barca = document.getElementById("barcelona");
        if (!barca) return;
        const rect = barca.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Only switch when section is substantially visible (60% in)
        const isDeepVisible = rect.top < windowHeight * 0.4 && rect.bottom > windowHeight * 0.3;
        if (isDeepVisible) {
          document.documentElement.setAttribute("data-theme", "barca");
        } else {
          document.documentElement.setAttribute("data-theme", "ucl");
        }
      }, 80); // 80ms debounce prevents flicker
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); clearTimeout(timer); };
  }, []);

  return (
    <section id="barcelona" ref={ref} style={{ background: "var(--color-bg)", paddingBottom: "15rem", transition: "all 1s ease" }}>
      {/* Cinematic Blaugrana Header */}
      <div style={{ height: "60vh", background: "#004d98", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "-20%", display: "flex", width: "140%" }}>
           {[...Array(12)].map((_, i) => (
             <motion.div 
               key={i} 
               animate={{ x: [0, -100, 0] }} 
               transition={{ repeat: Infinity, duration: 20 + i * 2, ease: "linear" }}
               style={{ flex: 1, background: i % 2 === 0 ? "#a50044" : "#004d98", opacity: 0.8 }} 
             />
           ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #a50044)" }} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={inView ? { opacity: 1, scale: 1 } : {}} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          style={{ position: "relative", width: "350px", height: "350px", zIndex: 10 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Image src="/barca-crest.png" alt="FCB" fill style={{ objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }} />
          </motion.div>
        </motion.div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "-80px auto 0", padding: "0 2rem", position: "relative", zIndex: 20 }}>
        <motion.div initial={{ opacity: 0, y: 100 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ background: "#ffffff", border: "4px solid #edbb00", padding: "6rem", boxShadow: "0 50px 100px rgba(0,0,0,0.3)" }}>
          <div style={{ textAlign: "center", marginBottom: "8rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#a50044", letterSpacing: "0.5em", textTransform: "uppercase", fontWeight: 900, display: "block", marginBottom: "2rem" }}>Case Study &mdash; FC Barcelona</span>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 
                initial={{ y: "100%" }} 
                animate={inView ? { y: 0 } : {}} 
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#004d98", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "3rem" }}
              >
                Més Que <br /> Un Club.
              </motion.h2>
            </div>
            <p style={{ color: "#666", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>A Log-Normal AFT application to the post-2015 institutional drought.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", marginBottom: "6rem" }} className="grid-cols-1 md:grid-cols-2">
            <div>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#a50044", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1.5rem", fontWeight: 800 }}>Profile Parameters</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Drought Duration", val: "11 Years (Current)" },
                  { label: "Managers Used", val: "6 (Enrique to Flick)" },
                  { label: "Talent Departure", val: "1 (Messi, 2021)" },
                  { label: "Avg UEFA League Rank", val: "1 (La Liga)" }
                ].map(item => (
                  <li key={item.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>{item.label}</span>
                    <span style={{ color: "#000", fontWeight: 700, fontSize: "0.9rem" }}>{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ borderLeft: "8px solid #004d98", paddingLeft: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#004d98", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1.5rem", fontWeight: 800 }}>Current Trajectory</h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "#333", lineHeight: 1.8 }}
              >
                Because Barcelona is coded as having experienced a Generational Talent Departure (HR=0.210), the predicted survival curve never falls below the 50% survival threshold during the observable time horizon.
              </motion.p>
            </div>
          </div>

          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "4rem", display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap", borderRadius: "12px", marginBottom: "6rem" }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ 
                width: "280px", 
                height: "360px", 
                position: "relative", 
                flexShrink: 0, 
                borderRadius: "12px",
                overflow: "hidden",
                border: "4px solid #a50044", 
                boxShadow: "0 30px 60px rgba(0, 77, 152, 0.2)",
                background: "linear-gradient(135deg, #004d98 0%, #002244 100%)",
              }}
            >
              {/* Gold Accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#edbb00", zIndex: 10 }} />
              
              <Image src="/Julian Alvarez.png" alt="Julian Alvarez" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              
              {/* Gradient Overlay for Text Visibility */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,77,152,0.95) 0%, transparent 50%)", zIndex: 5 }} />
              
              {/* Player Info */}
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", zIndex: 10 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#edbb00", letterSpacing: "0.2em", marginBottom: "0.2rem", fontWeight: 800 }}>TRANSFER TARGET</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#ffffff", lineHeight: 1 }}>J. Álvarez</div>
              </div>
            </motion.div>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#a50044", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1.5rem", fontWeight: 800 }}>Financial Simulation Scenario</h3>
              <motion.h4 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "#004d98", marginBottom: "1.5rem", lineHeight: 1.1 }}>The Alvarez Signing.</motion.h4>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "#475569", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "600px" }}>
                The financial simulation of signing Julian Alvarez for an additional net expenditure of EUR 100M produces only a marginal improvement. The model estimates that the median predicted drought decreases by only 0.5 years (from 9.6 to 9.1).
              </motion.p>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ borderLeft: "4px solid #edbb00", paddingLeft: "1.5rem" }}>
                 <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#004d98", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>Finding: Spending alone cannot resolve the structural loss of Lionel Messi.</p>
              </motion.div>
            </div>
          </div>

          <div ref={chartRef} style={{ height: "500px", padding: "2rem", border: "1px solid #eee" }}>
            {isChartInView && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={barcaSimulationData} margin={{ top: 20, right: 40, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="t" label={{ value: "Drought Years", position: "bottom", offset: 0, fontFamily: "var(--font-mono)", fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} label={{ value: "Survival Prob.", angle: -90, position: "left", fontFamily: "var(--font-mono)", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={80} wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase" }} />
                  <Line name="Current Profile" type="monotone" dataKey="current" stroke="#a50044" strokeWidth={5} dot={false} animationDuration={5000} />
                  <Line name="+ Alvarez Scenario" type="monotone" dataKey="alvarez" stroke="#004d98" strokeWidth={3} strokeDasharray="8 8" dot={false} animationDuration={5000} />
                  <ReferenceLine x={11} stroke="#edbb00" strokeWidth={3} label={{ value: "PRESENT", position: "top", fill: "#a50044", fontWeight: 900, fontFamily: "var(--font-mono)" }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
