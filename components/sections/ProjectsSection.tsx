"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/lib/data";
import { ProjectFolder } from "@/components/ui/ProjectFolder";
import { CaseStudyDrawer } from "@/components/ui/CaseStudyDrawer";
import { WaveText } from "@/components/ui/WaveText";

export function ProjectsSection() {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  const handleSelectProject = (project: Project) => {
    if (project.isCaseStudy) {
      setActiveCaseStudyId((prev) => (prev === project.id ? null : project.id));
    } else if (project.externalUrl) {
      window.open(project.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  const activeProject = PORTFOLIO_DATA.projects.find((p) => p.id === activeCaseStudyId);

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-[#111213] dark:text-[#F5F5F5]"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-[#5C5F66] dark:text-[#9CA3AF] mt-3 max-w-xl"
          >
            Independent projects and professional work. Open a folder to explore a project or case study.
          </motion.p>
        </div>

        <motion.a
          href={PORTFOLIO_DATA.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold text-[#111213] dark:text-white flex items-center gap-1 group self-start md:self-auto"
        >
          <WaveText text="GitHub" icon={<ArrowUpRight className="w-4 h-4" />} />
        </motion.a>
      </div>

      {/* Projects 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectFolder
              project={project}
              isOpen={activeCaseStudyId === project.id}
              onSelect={() => handleSelectProject(project)}
            />
          </motion.div>
        ))}

        {/* Case Study Deep Dive Drawer (expands across full grid width) */}
        {activeProject && (
          <CaseStudyDrawer
            isOpen={!!activeCaseStudyId}
            onClose={() => setActiveCaseStudyId(null)}
            title={activeProject.title}
            subtitle={activeProject.subtitle}
            role={activeProject.role}
            ownership={activeProject.ownership}
            stack={activeProject.stack}
            details={activeProject.caseStudyDetails}
          />
        )}
      </div>
    </section>
  );
}
