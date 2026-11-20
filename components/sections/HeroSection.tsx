"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";

const HERO_ROLES = [
  {
    line1: "FRONTEND",
    line2: "DEVELOPER",
    sizeClass: "text-[clamp(2.6rem,12vw,4.5rem)] md:text-[clamp(3.8rem,11.5vw,10.2rem)]",
  },
  {
    line1: "FULL STACK",
    line2: "ENGINEER",
    sizeClass: "text-[clamp(2.45rem,11.2vw,4.2rem)] md:text-[clamp(3.6rem,10.8vw,9.8rem)]",
  },
  {
    line1: "UI / UX",
    line2: "CRAFTSMAN",
    sizeClass: "text-[clamp(2.6rem,12vw,4.5rem)] md:text-[clamp(3.8rem,11.5vw,10.2rem)]",
  },
  {
    line1: "CLOUD & SYSTEMS",
    line2: "ARCHITECT",
    sizeClass: "text-[clamp(1.65rem,7.4vw,2.9rem)] md:text-[clamp(2.5rem,8vw,7.2rem)]",
  },
];

export function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const currentRole = HERO_ROLES[roleIndex];

  // Mouse tilt physics for the 3D Portrait Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[680px] max-h-[1050px] flex flex-col justify-between overflow-hidden bg-[#F3EFE6] dark:bg-[#0F1011] transition-colors duration-300 select-none"
    >
      {/* ── Ambient Background Canvas / Subtle Code Watermark ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-[0.065] dark:opacity-[0.085] font-mono text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] flex justify-between px-6 md:px-12 pt-20">
        <div className="hidden sm:block max-w-[340px] md:max-w-[420px]">
          <pre>{`const engineer = {
  name: "${PORTFOLIO_DATA.name}",
  role: "AI & Full-Stack",
  company: "${PORTFOLIO_DATA.company}",
  focus: ["RAG", "LLMs", "FastAPI"],
  status: "Ready for deployment"
};`}</pre>
        </div>
        <div className="hidden sm:block max-w-[340px] md:max-w-[420px] text-right">
          <pre>{`async function createAgent() {
  const rag = new RAGPipeline();
  await rag.initialize();
  return rag.streamResponse();
}`}</pre>
        </div>
      </div>

      {/* ── Top Spacer for Floating Navbar (taller on mobile to prevent navbar cutting) ── */}
      <div className="h-20 sm:h-24 md:h-16 w-full shrink-0" />

      {/* ── Centerpiece Hero Composition ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full px-4 z-10">
        {/* Massive Dual-Line Headline with Dynamic Rotating Roles */}
        <div className="flex flex-col items-center leading-[0.88] tracking-[-0.035em] font-extrabold uppercase text-[#111213] dark:text-[#F5F5F5] select-none text-center">
          {/* Row 1: < [LINE 1] */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4 min-h-[clamp(3rem,11.5vw,4.8rem)] md:min-h-[clamp(4.2rem,12.5vw,11.5rem)]">
            {/* Custom 3D Geometric Opening Bracket < */}
            <span className="inline-block w-[clamp(22px,5.5vw,38px)] h-[clamp(34px,8.5vw,54px)] md:w-[clamp(36px,6vw,80px)] md:h-[clamp(48px,8vw,110px)] text-[#111213]/25 dark:text-white/25 shrink-0">
              <svg
                viewBox="20 0 110 160"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="square"
                strokeLinejoin="miter"
                className="w-full h-full"
              >
                <path
                  className="opacity-20"
                  d="M105 30 48 80 105 130"
                  transform="translate(4 5)"
                />
                <path d="M105 30 48 80 105 130" />
              </svg>
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole.line1}
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -35, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`${currentRole.sizeClass} font-black inline-block whitespace-nowrap`}
              >
                {currentRole.line1}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Row 2: [LINE 2] /> */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4 -mt-1 md:-mt-3 min-h-[clamp(3rem,11.5vw,4.8rem)] md:min-h-[clamp(4.2rem,12.5vw,11.5rem)]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole.line2}
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -35, filter: "blur(6px)" }}
                transition={{ duration: 0.55, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`${currentRole.sizeClass} font-black inline-block whitespace-nowrap`}
              >
                {currentRole.line2}
              </motion.span>
            </AnimatePresence>
            {/* Custom 3D Geometric Closing Bracket /> */}
            <span className="inline-block w-[clamp(30px,7vw,50px)] h-[clamp(34px,8.5vw,54px)] md:w-[clamp(50px,8vw,120px)] md:h-[clamp(48px,8vw,110px)] text-[#111213]/25 dark:text-white/25 shrink-0">
              <svg
                viewBox="0 0 180 160"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="square"
                strokeLinejoin="miter"
                className="w-full h-full"
              >
                <path
                  className="opacity-20"
                  d="M65 30 25 130M100 30 157 80 100 130"
                  transform="translate(4 5)"
                />
                <path d="M65 30 25 130M100 30 157 80 100 130" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── Freestanding 3D Character Cutout (Pure PNG without background box) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mt-12 sm:-mt-16 md:-mt-28 z-20"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative cursor-pointer flex flex-col items-center"
          >
            {/* Pure Cutout PNG with 3D Depth Shadow */}
            <div className="relative h-[340px] sm:h-[400px] md:h-[500px] w-auto">
              <Image
                src="/hero-standing.png"
                alt={PORTFOLIO_DATA.name}
                width={380}
                height={570}
                priority
                className="h-full w-auto object-contain select-none filter contrast-105 drop-shadow-[0_24px_40px_rgba(17,18,19,0.22)] dark:drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)] transition-transform duration-300"
              />
            </div>

            {/* Crisp Floating Status Pill Underneath Character (Razor-sharp text without 3D rasterization blur) */}
            <div
              style={{ transform: "translateZ(1px)" }}
              className="mt-1 px-4 py-1.5 rounded-full bg-[#111213] dark:bg-[#18191C] text-white border border-white/20 flex items-center gap-2 shadow-xl select-none subpixel-antialiased"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-[12px] font-sans font-semibold tracking-wide text-white">
                Roshan.
              </span>
              <span className="text-[11.5px] font-sans font-medium text-neutral-300">
                Mumbai, India
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Meta Bar ── */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-5 md:pb-7 flex flex-col md:flex-row md:items-end md:justify-between gap-2.5 md:gap-0 z-20 pointer-events-none">
        {/* Terminal Monospace Ticker with Animated Cursor: single clean unbroken line on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="pointer-events-auto order-1 md:order-2 text-left md:text-right pb-0.5 pr-0 md:pr-32"
        >
          <span className="inline-flex items-center font-mono text-[11px] sm:text-xs md:text-[clamp(0.72rem,1.2vw,0.95rem)] font-semibold text-[#111213]/90 dark:text-white/90 tracking-wider md:tracking-widest uppercase whitespace-nowrap">
            <span className="text-[#E25C34] font-bold">{"{{"}&nbsp;</span>
            <span>/AI &amp; FULL-STACK DEVELOPMENT</span>
            <span className="inline-block w-1.5 h-3.5 bg-[#E25C34] ml-1.5 animate-pulse" />
            <span className="text-[#E25C34] font-bold">&nbsp;{"}}"}</span>
          </span>
        </motion.div>

        {/* Display Year ©2026: on mobile sits below ticker on left, clear of floating chat bubble */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pointer-events-auto order-2 md:order-1"
        >
          <span className="text-[2rem] sm:text-[2.5rem] md:text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold tracking-tight text-[#111213] dark:text-[#F5F5F5] leading-none select-none">
            ©{PORTFOLIO_DATA.copyrightYear}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
