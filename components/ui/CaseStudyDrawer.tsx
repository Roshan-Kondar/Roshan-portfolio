"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

interface CaseStudyDetails {
  challenge: string;
  approach: { step: string; detail: string }[];
  impactMetric: {
    before: string;
    after: string;
    summary: string;
  };
}

interface CaseStudyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  role: string;
  ownership: string;
  stack: string[];
  details?: CaseStudyDetails;
}

export function CaseStudyDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  role,
  ownership,
  stack,
  details,
}: CaseStudyDrawerProps) {
  if (!details) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden col-span-1 md:col-span-2 w-full mt-4"
        >
          <div className="bg-[#FFFFFF] dark:bg-[#17181A] rounded-2xl md:rounded-3xl border border-[#111213]/10 dark:border-white/10 p-6 md:p-10 shadow-xl relative">
            {/* Header / Close banner */}
            <div className="flex items-center justify-between pb-6 border-b border-[#111213]/10 dark:border-white/10 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E25C34] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Case Study Deep Dive
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-[#111213] dark:text-[#F5F5F5]">
                  {title}
                </h3>
                <p className="text-sm text-[#5C5F66] dark:text-[#9CA3AF] mt-0.5">{subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[#F3EFE6] dark:bg-[#232529] text-[#111213] dark:text-white hover:opacity-80 transition cursor-pointer"
              >
                <span>Close</span>
                <ChevronDown className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Metadata */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#5C5F66] dark:text-[#9CA3AF] mb-1">
                    Role & Scope
                  </h4>
                  <p className="text-base font-semibold text-[#111213] dark:text-[#F5F5F5]">{role}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#5C5F66] dark:text-[#9CA3AF] mb-1">
                    Ownership
                  </h4>
                  <p className="text-sm text-[#111213] dark:text-[#F5F5F5]">{ownership}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#5C5F66] dark:text-[#9CA3AF] mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#F3EFE6] dark:bg-[#232529] font-mono text-[#111213] dark:text-gray-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact Highlight Card */}
                <div className="p-5 rounded-2xl bg-[#F3EFE6] dark:bg-[#232529] border border-[#111213]/10 dark:border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#E25C34] font-semibold">
                    Measurable Result
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <div className="text-xs text-[#5C5F66] dark:text-[#9CA3AF]">Before</div>
                      <div className="text-lg font-bold line-through text-[#9B9EA5]">
                        {details.impactMetric.before}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#E25C34] rotate-45" />
                    <div>
                      <div className="text-xs text-[#5C5F66] dark:text-[#9CA3AF]">After</div>
                      <div className="text-xl font-extrabold text-[#111213] dark:text-[#F5F5F5]">
                        {details.impactMetric.after}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#5C5F66] dark:text-[#9CA3AF] leading-relaxed pt-2 border-t border-[#111213]/10 dark:border-white/10">
                    {details.impactMetric.summary}
                  </p>
                </div>
              </div>

              {/* Right Column: Challenge & Approach */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-[#111213] dark:text-[#F5F5F5] mb-2">
                    The Challenge
                  </h4>
                  <p className="text-base text-[#5C5F66] dark:text-[#9CA3AF] leading-relaxed">
                    {details.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#111213] dark:text-[#F5F5F5] mb-4">
                    Architectural Approach
                  </h4>
                  <div className="space-y-4">
                    {details.approach.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F3EFE6]/50 dark:bg-[#232529]/40 border border-[#111213]/5 dark:border-white/5"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#111213] dark:text-[#E25C34] mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-[#111213] dark:text-[#F5F5F5]">
                            {item.step}
                          </div>
                          <div className="text-sm text-[#5C5F66] dark:text-[#9CA3AF] mt-0.5 leading-relaxed">
                            {item.detail}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
