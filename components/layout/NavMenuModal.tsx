"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { PORTFOLIO_DATA } from "@/lib/data";

interface NavMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMenuModal({ isOpen, onClose }: NavMenuModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { label: "PROJECTS", href: "#projects", count: "04" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0F1011]/80 backdrop-blur-xl"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-[#17181A] text-white rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[500px]"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-sm font-mono tracking-widest text-[#9CA3AF] uppercase">
                Navigation
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="py-8 space-y-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between text-3xl md:text-5xl font-black tracking-tight text-white/80 hover:text-white transition-colors"
                  >
                    <span className="group-hover:translate-x-3 transition-transform duration-200">
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/10 text-white group-hover:bg-[#E25C34] transition-colors">
                        {item.count}
                      </span>
                    )}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Modal Footer: Email Copy & Socials */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Copy Email */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${PORTFOLIO_DATA.email}`}
                  className="text-xs md:text-sm font-mono text-gray-300 hover:text-white underline underline-offset-4"
                >
                  {PORTFOLIO_DATA.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.socials.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white flex items-center gap-1 transition"
                  aria-label="Upwork"
                >
                  Upwork <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
