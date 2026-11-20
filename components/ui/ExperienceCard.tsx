"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { ExperienceItem } from "@/lib/data";

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
}

export function ExperienceCard({ item, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-6 md:pl-10 pb-10 border-l border-[#111213]/15 dark:border-white/15 last:border-transparent last:pb-0 group"
    >
      {/* Timeline Node */}
      <div
        className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          item.isCurrent
            ? "bg-[#111213] border-[#111213] dark:bg-[#E25C34] dark:border-[#E25C34] ring-4 ring-[#111213]/10 dark:ring-[#E25C34]/20 scale-110"
            : "bg-[#F3EFE6] dark:bg-[#0F1011] border-[#111213]/40 dark:border-white/40 group-hover:border-[#111213] dark:group-hover:border-white"
        }`}
      />

      {/* Card Body */}
      <div className="bg-[#FFFFFF] dark:bg-[#17181A] rounded-2xl p-6 md:p-8 border border-[#111213]/8 dark:border-white/8 shadow-xs hover:shadow-md transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            {item.isEducation ? (
              <GraduationCap className="w-4 h-4 text-[#5C5F66] dark:text-[#9CA3AF]" />
            ) : (
              <Briefcase className="w-4 h-4 text-[#5C5F66] dark:text-[#9CA3AF]" />
            )}
            <span className="font-semibold text-lg md:text-xl text-[#111213] dark:text-[#F5F5F5]">
              {item.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {item.isCurrent && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#111213] text-white dark:bg-[#E25C34] dark:text-white animate-pulse">
                Current role
              </span>
            )}
            {item.score && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#E8E4DB] dark:bg-[#232529] text-[#111213] dark:text-gray-200">
                {item.score}
              </span>
            )}
          </div>
        </div>

        {/* Company and Period Sub-bar */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs md:text-sm text-[#5C5F66] dark:text-[#9CA3AF] mb-4 font-mono">
          <span className="font-semibold text-[#111213] dark:text-gray-200">
            {item.company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {item.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-[#5C5F66] dark:text-[#9CA3AF] leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
