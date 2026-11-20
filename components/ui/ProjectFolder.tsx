"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Layers, Terminal } from "lucide-react";
import { WaveText } from "./WaveText";
import { Project } from "@/lib/data";

interface ProjectFolderProps {
  project: Project;
  isOpen?: boolean;
  onSelect: () => void;
}

export function ProjectFolder({ project, isOpen, onSelect }: ProjectFolderProps) {
  // Render distinct mockup paper sticking out based on project id
  const renderPeekingDocument = () => {
    switch (project.id) {
      case "workflow-automation":
        return (
          <div className="absolute -top-7 md:-top-9 left-6 right-6 h-20 md:h-24 bg-[#FAF7F2] dark:bg-[#26282E] rounded-t-xl border border-[#111213]/10 dark:border-white/10 p-3 shadow-md flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-medium text-[#5C5F66] dark:text-[#9CA3AF] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#111213] dark:text-white" /> JAKS & Associates
              </span>
              <span className="text-[10px] font-mono text-[#9B9EA5] bg-[#E8E4DB] dark:bg-[#1A1B1E] px-2 py-0.5 rounded">
                v2.4
              </span>
            </div>
            <div className="w-3/4 h-2 bg-[#E8E4DB] dark:bg-[#34383F] rounded-full" />
          </div>
        );
      case "smartops":
        return (
          <div className="absolute -top-7 md:-top-9 left-6 right-6 h-20 md:h-24 bg-[#111213] text-white rounded-t-xl border border-white/10 p-3 shadow-md flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> SmartOps Engine
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] font-mono text-gray-400 truncate">
              [AGENT] Orchestrating triage pipelines...
            </div>
          </div>
        );
      case "resumelens":
        return (
          <div className="absolute -top-7 md:-top-9 left-6 right-6 h-20 md:h-24 bg-[#FFFFFF] dark:bg-[#26282E] rounded-t-xl border border-[#111213]/10 dark:border-white/10 p-3 shadow-md flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-medium text-[#111213] dark:text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> ResumeLens Vector DB
              </span>
              <span className="text-[10px] font-mono text-[#9B9EA5]">k=4 semantic</span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-[#E8E4DB] dark:bg-[#34383F] rounded-full" />
              <div className="w-2/3 h-1.5 bg-[#E8E4DB] dark:bg-[#34383F] rounded-full" />
            </div>
          </div>
        );
      case "cris":
      default:
        return (
          <div className="absolute -top-7 md:-top-9 left-6 right-6 h-20 md:h-24 bg-[#16181B] text-white rounded-t-xl border border-white/10 p-3 shadow-md flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-orange-400">CRIS ML Pipeline</span>
              <span className="text-[10px] font-mono text-gray-400">AUC: 0.914</span>
            </div>
            <div className="flex gap-1 h-3 items-end">
              <div className="w-2 h-2 bg-orange-400/50 rounded-xs" />
              <div className="w-2 h-3 bg-orange-400 rounded-xs" />
              <div className="w-2 h-1 bg-orange-400/30 rounded-xs" />
              <div className="w-2 h-2.5 bg-orange-400/80 rounded-xs" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col group cursor-pointer" onClick={onSelect}>
      {/* Skeuomorphic Folder Body */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative pt-10"
      >
        {/* Back Folder Flap */}
        <div className="absolute top-0 inset-x-0 h-24 bg-[#E0DCD2] dark:bg-[#1C1E22] rounded-t-2xl border-t border-x border-[#111213]/10 dark:border-white/10" />

        {/* Peeking Document Sheet */}
        {renderPeekingDocument()}

        {/* Front Folder Flap with Tab on Top Left */}
        <div className="relative z-10">
          {/* Tab curve */}
          <div className="flex">
            <div className="h-6 w-32 md:w-36 bg-[#EDE8DE] dark:bg-[#222429] rounded-t-xl border-t border-l border-[#111213]/10 dark:border-white/10 flex items-center px-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5F66] dark:text-[#9CA3AF] font-semibold">
                {project.tag}
              </span>
            </div>
            <div className="h-6 flex-1 border-b border-[#111213]/10 dark:border-white/10" />
          </div>

          {/* Front Flap Body */}
          <div className="bg-[#EDE8DE] dark:bg-[#222429] rounded-b-2xl rounded-tr-2xl border-x border-b border-[#111213]/10 dark:border-white/10 p-6 md:p-8 min-h-[160px] md:min-h-[180px] flex flex-col justify-between shadow-[0_12px_32px_rgba(17,18,19,0.06)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-colors duration-200">
            {/* Title & Action Button */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111213] dark:text-[#F5F5F5] group-hover:text-[#E25C34] transition-colors">
                {project.title}
              </h3>
              <div className="w-10 h-10 rounded-xl bg-[#111213] text-white dark:bg-[#F5F5F5] dark:text-[#111213] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Folder Interior Teaser */}
            <p className="text-sm text-[#5C5F66] dark:text-[#9CA3AF] line-clamp-2 mt-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card Meta Footer */}
      <div className="flex items-center justify-between pt-3 px-1 text-sm">
        <span className="text-[#5C5F66] dark:text-[#9CA3AF] font-medium text-xs md:text-sm">
          {project.subtitle}
        </span>
        <div className="text-[#111213] dark:text-white font-semibold text-xs md:text-sm">
          <WaveText
            text={project.isCaseStudy ? (isOpen ? "Close study" : "Read case study") : "View project"}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          />
        </div>
      </div>
    </div>
  );
}
