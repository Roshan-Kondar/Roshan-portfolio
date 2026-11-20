"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { PORTFOLIO_DATA } from "@/lib/data";
import { WaveText } from "@/components/ui/WaveText";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading, Info, Direct Email & Socials */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono uppercase tracking-widest text-[#5C5F66] dark:text-[#9CA3AF] mb-2"
            >
              {"// Get In Touch"}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-[#111213] dark:text-[#F5F5F5]"
            >
              Let&apos;s talk.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-[#5C5F66] dark:text-[#9CA3AF] mt-4 leading-relaxed"
            >
              Whether it&apos;s a full-time role, consulting, or a freelance collaboration, my inbox is open.
            </motion.p>
          </div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#17181A] border border-[#111213]/8 dark:border-white/8 space-y-2 shadow-xs"
          >
            <div className="text-xs font-mono uppercase text-[#9B9EA5] tracking-wider">
              Direct Email
            </div>
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${PORTFOLIO_DATA.email}`}
                className="text-base md:text-lg font-bold text-[#111213] dark:text-white hover:text-[#E25C34] transition-colors truncate"
              >
                {PORTFOLIO_DATA.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-[#F3EFE6] dark:bg-[#232529] text-[#111213] dark:text-white hover:opacity-80 transition cursor-pointer shrink-0"
                title="Copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] dark:bg-[#17181A] border border-[#111213]/8 dark:border-white/8 text-sm font-medium hover:border-[#111213]/30 dark:hover:border-white/30 transition shadow-xs group"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] dark:bg-[#17181A] border border-[#111213]/8 dark:border-white/8 text-sm font-medium hover:border-[#111213]/30 dark:hover:border-white/30 transition shadow-xs group"
            >
              <LinkedinIcon className="w-4 h-4 text-sky-600" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PORTFOLIO_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] dark:bg-[#17181A] border border-[#111213]/8 dark:border-white/8 text-sm font-medium hover:border-[#111213]/30 dark:hover:border-white/30 transition shadow-xs group"
            >
              <InstagramIcon className="w-4 h-4 text-rose-500" />
              <span>Instagram</span>
            </a>

            <a
              href={PORTFOLIO_DATA.socials.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] dark:bg-[#17181A] border border-[#111213]/8 dark:border-white/8 text-sm font-medium hover:border-[#111213]/30 dark:hover:border-white/30 transition shadow-xs group"
            >
              <span>Upwork</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Underline Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 bg-[#FFFFFF] dark:bg-[#17181A] rounded-3xl p-8 md:p-12 border border-[#111213]/8 dark:border-white/8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Field 1: Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#5C5F66] dark:text-[#9CA3AF]">
                Your name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should I call you?"
                className="w-full pb-3 bg-transparent border-b border-[#111213]/20 dark:border-white/20 text-[#111213] dark:text-white placeholder-[#9B9EA5] focus:outline-hidden focus:border-[#111213] dark:focus:border-white text-base md:text-lg transition-colors"
              />
            </div>

            {/* Field 2: Email */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#5C5F66] dark:text-[#9CA3AF]">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pb-3 bg-transparent border-b border-[#111213]/20 dark:border-white/20 text-[#111213] dark:text-white placeholder-[#9B9EA5] focus:outline-hidden focus:border-[#111213] dark:focus:border-white text-base md:text-lg transition-colors"
              />
            </div>

            {/* Field 3: Message */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#5C5F66] dark:text-[#9CA3AF]">
                What do you have in mind?
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A little about your opportunity or project…"
                className="w-full pb-3 bg-transparent border-b border-[#111213]/20 dark:border-white/20 text-[#111213] dark:text-white placeholder-[#9B9EA5] focus:outline-hidden focus:border-[#111213] dark:focus:border-white text-base md:text-lg resize-none transition-colors"
              />
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#111213] text-white dark:bg-[#F5F5F5] dark:text-[#111213] text-sm md:text-base font-bold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <WaveText text="Create email draft" icon={<ArrowUpRight className="w-4 h-4" />} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
