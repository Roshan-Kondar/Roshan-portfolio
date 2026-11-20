"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { CrowdCanvas } from "@/components/ui/CrowdCanvas";

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#0F1011] text-white pt-16 pb-12 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Upper Footer Navigation & Info */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <span className="text-2xl font-black tracking-tight text-white">
              {PORTFOLIO_DATA.shortName}.
            </span>
            <p className="text-sm text-[#9CA3AF] mt-1 font-mono">
              {PORTFOLIO_DATA.roleTitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#9CA3AF]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* 2.5D Crowd Animation Easter Egg */}
        <CrowdCanvas />

        {/* Bottom Copyright & Back to Top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-xs font-mono text-[#9CA3AF] border-t border-white/10 mt-6">
          <div>
            © {PORTFOLIO_DATA.copyrightYear} {PORTFOLIO_DATA.name} · See you around.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
