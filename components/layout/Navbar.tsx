"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, MoreHorizontal } from "lucide-react";
import { NavMenuModal } from "./NavMenuModal";
import { PORTFOLIO_DATA } from "@/lib/data";

const emptySubscribe = () => () => {};

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const tiltRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      // Calculate responsive tilt between -3 and 3 degrees
      const targetTilt = Math.max(-3.5, Math.min(3.5, delta * 0.15));
      tiltRef.current = targetTilt;

      if (navRef.current) {
        navRef.current.style.transform = `translateX(-50%) rotate(${targetTilt}deg)`;
      }

      lastScrollY.current = currentScrollY;

      // Settle back to 0deg after scrolling stops
      const timeout = setTimeout(() => {
        if (navRef.current) {
          navRef.current.style.transform = `translateX(-50%) rotate(0deg)`;
        }
      }, 150);

      return () => clearTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-40 pointer-events-none flex justify-center">
        <div
          ref={navRef}
          style={{ transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="pointer-events-auto fixed left-1/2 -translate-x-1/2 h-12 px-4 md:px-5 rounded-full bg-[#111213] text-white dark:bg-[#17181A] dark:text-white border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.25)] flex items-center gap-4 select-none"
        >
          {/* Brand Name */}
          <a
            href="#about"
            className="font-bold text-sm tracking-tight hover:text-[#E25C34] transition-colors pr-1"
          >
            {PORTFOLIO_DATA.shortName}
          </a>

          <div className="w-[1px] h-4 bg-white/20" />

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-90 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
              )
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Navigation Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="h-7 px-2 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Open menu"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Nav Menu Overlay Modal */}
      <NavMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
