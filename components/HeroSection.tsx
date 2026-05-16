"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(true);

  // Try to start video as soon as component mounts
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {
      // If autoplay fails, try again on first user interaction
      const unlock = () => {
        vid.play();
        document.removeEventListener("click", unlock);
      };
      document.addEventListener("click", unlock, { once: true });
    });
  }, []);

  const handleUnmute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    setIsMuted(false);
    setShowUnmute(false);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const skipIntro = () => {
    const vid = videoRef.current;
    if (vid) vid.pause();
    document.getElementById("title-break")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{ position: "relative", width: "100%", height: "100vh", background: "#000b1a", overflow: "hidden" }}
    >
      {/* Background Video — muted for reliable autoplay */}
      <video
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.62) contrast(1.08)" }}
      >
        <source src="/ucl-intro.mp4" type="video/mp4" />
      </video>

      {/* Cinematic vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />

      {/* UCL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ position: "absolute", top: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, width: "90px", height: "90px" }}
      >
        <Image src="/ucl-logo.png" alt="UCL" fill style={{ objectFit: "contain" }} />
      </motion.div>

      {/* "Tap to unmute" prominent prompt */}
      {showUnmute && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={handleUnmute}
          style={{
            position: "absolute",
            bottom: "8rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            padding: "1.1rem 2.8rem",
            background: "rgba(0,51,153,0.85)",
            border: "1px solid rgba(200,169,81,0.6)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            zIndex: 50,
            boxShadow: "0 20px 60px rgba(0,51,153,0.4)",
          }}
        >
          <Volume2 size={18} />
          Tap to Enable Sound
        </motion.button>
      )}

      {/* HUD — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: "3.5rem", right: "3.5rem", display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "flex-end", zIndex: 50 }}
      >
        {/* Volume toggle (after unmuting) */}
        {!showUnmute && (
          <button
            onClick={toggleMute}
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.9rem", borderRadius: "50%", color: "#fff", cursor: "pointer" }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}

        <button
          onClick={skipIntro}
          style={{ padding: "0.9rem 2rem", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Skip to Report
        </button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.5 }}
        style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 50 }}
      >
        <ChevronDown size={28} className="animate-bounce" color="var(--color-accent)" />
      </motion.div>
    </section>
  );
}
