"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundElements() {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 30, damping: 30 });

  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 80]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -80]);
  const y1 = useTransform(smoothProgress, [0, 1], [0, -350]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 350]);
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.1, 0.95]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}>

      {/* LEFT — large glowing starball */}
      <motion.div
        style={{
          position: "absolute",
          top: "8%",
          left: "-8vw",
          width: "48vw",
          height: "48vw",
          rotate: rotate1,
          y: y1,
          scale: scale1,
          opacity: 0.13,
          filter: "drop-shadow(0 0 60px rgba(0,51,153,0.25))",
        }}
      >
        <Image src="/ucl-starball.png" alt="" fill style={{ objectFit: "contain" }} priority />
      </motion.div>

      {/* RIGHT — slightly smaller, counter-rotating */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-12vw",
          width: "56vw",
          height: "56vw",
          rotate: rotate2,
          y: y2,
          opacity: 0.09,
          filter: "drop-shadow(0 0 80px rgba(200,169,81,0.15))",
        }}
      >
        <Image src="/ucl-starball.png" alt="" fill style={{ objectFit: "contain" }} priority />
      </motion.div>

      {/* Subtle blue radial glow mid-right */}
      <div style={{
        position: "absolute",
        top: "35%",
        right: "0",
        width: "38vw",
        height: "38vw",
        background: "radial-gradient(circle, rgba(0,51,153,0.07) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      {/* Dot-grid overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(rgba(0,51,153,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "90px 90px",
        opacity: 0.35,
      }} />
    </div>
  );
}
