"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin, Building2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { WaveText } from "@/components/ui/WaveText";

export function BiographySection() {
  return (
    <section
      id="biography"
      className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 border-t border-[#111213]/8 dark:border-white/8 select-none"
    >
      {/* 3-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ── Left Column: Intro & Current Role (5 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#E8E4DB] dark:bg-[#232529] text-[#111213] dark:text-[#E25C34]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Stack Developer &amp; AWS Certified</span>
          </div>

          {/* Heading: Hi, I'm Roshan. */}
          <h2 className="text-[clamp(3.5rem,6.5vw,5.5rem)] font-black tracking-[-0.04em] text-[#111213] dark:text-[#F5F5F5] leading-[0.95]">
            Hi, I&apos;m
            <br />
            {PORTFOLIO_DATA.shortName}.
          </h2>

          <p className="text-xl md:text-2xl font-bold tracking-tight text-[#111213] dark:text-[#F5F5F5] leading-snug">
            {PORTFOLIO_DATA.roleTitle}.
          </p>

          {/* Currently At Box */}
          <div className="pt-6 border-t border-[#111213]/12 dark:border-white/12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5C5F66] dark:text-[#9CA3AF] block">
              Currently at
            </span>
            <div className="flex items-center gap-2 text-base md:text-lg font-bold text-[#111213] dark:text-[#F5F5F5]">
              <Building2 className="w-4 h-4 text-[#E25C34]" />
              <span>{PORTFOLIO_DATA.company}</span>
            </div>
            <div className="text-sm text-[#5C5F66] dark:text-[#9CA3AF] font-medium">
              {PORTFOLIO_DATA.companyRole}
            </div>
            <div className="text-xs font-mono text-[#9B9EA5] dark:text-[#525866] flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{PORTFOLIO_DATA.location}</span>
            </div>
          </div>
        </motion.div>

        {/* ── Center Column: Large Portrait Visual (4 cols) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex justify-center"
        >
          <div className="relative w-full max-w-[340px] aspect-[1/1.22] rounded-[32px] overflow-hidden border border-[#111213]/10 dark:border-white/10 shadow-[0_24px_48px_rgba(17,18,19,0.12)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.5)] bg-gradient-to-b from-[#FAF7F0] to-[#E2DBD0] dark:from-[#252830] dark:to-[#17191E] group">
            {/* Inner Image Framing: Head & Face fully visible */}
            <div className="absolute inset-0 flex items-start justify-center pt-3 px-3 overflow-hidden">
              <Image
                src="/hero-standing.png"
                alt={PORTFOLIO_DATA.name}
                width={360}
                height={540}
                className="w-full h-auto object-contain object-top group-hover:scale-105 transition-transform duration-500 ease-out filter contrast-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
              />
            </div>

            {/* Bottom Tag Bar */}
            <div className="absolute inset-x-3 bottom-3 p-3 rounded-2xl bg-[#111213]/60 dark:bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between z-10 shadow-sm">
              <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                {PORTFOLIO_DATA.name}
              </span>
              <span className="text-[10px] font-mono text-white/70">
                AI / FULL-STACK
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Right Column: Impact Lead & Action Button (3 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 space-y-6 flex flex-col justify-center"
        >
          <p className="text-lg md:text-xl text-[#5C5F66] dark:text-[#9CA3AF] leading-relaxed">
            I ship{" "}
            <strong className="text-[#111213] dark:text-[#F5F5F5] font-bold">
              real products
            </strong>
            , not just practice projects — a gaming cafe management system{" "}
            <strong className="text-[#111213] dark:text-[#F5F5F5] font-bold">
              in live use
            </strong>
            , a{" "}
            <strong className="text-[#111213] dark:text-[#F5F5F5] font-bold">
              production e-commerce site
            </strong>{" "}
            for a local clothing brand, and{" "}
            <strong className="text-[#111213] dark:text-[#F5F5F5] font-bold">
              KaamDone
            </strong>
            , a cloud SaaS on AWS built in one month that won{" "}
            <strong className="text-[#111213] dark:text-[#F5F5F5] font-bold">
              First Prize
            </strong>{" "}
            at Magic Bus NGO.
          </p>

          <div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111213] text-white dark:bg-[#F5F5F5] dark:text-[#111213] text-sm font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <WaveText text="Explore projects" icon={<ArrowUpRight className="w-4 h-4" />} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
