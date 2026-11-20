"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillBadgeProps {
  label: string;
  variant?: "primary" | "secondary";
}

export function SkillBadge({ label, variant = "secondary" }: SkillBadgeProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-[13px] md:text-[14px] font-medium tracking-tight transition-all duration-200 select-none cursor-default shadow-xs ${
        isPrimary
          ? "bg-[#111213] text-[#FFFFFF] dark:bg-[#F5F5F5] dark:text-[#0F1011] font-semibold border border-transparent shadow-sm"
          : "bg-[#E8E4DB]/80 text-[#111213] dark:bg-[#232529] dark:text-[#E5E7EB] border border-[#111213]/10 dark:border-white/10 hover:border-[#111213]/30 dark:hover:border-white/20"
      }`}
    >
      {label}
    </motion.span>
  );
}
