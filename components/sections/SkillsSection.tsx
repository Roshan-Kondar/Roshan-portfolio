"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillColumn {
  id: string;
  title: string;
  note: string;
  skills: string[];
}

const SKILL_COLUMNS: SkillColumn[] = [
  {
    id: "ai-engineering",
    title: "AI & Machine Learning",
    note: "RAG Pipelines, Embeddings & Semantic Search, Evaluation",
    skills: [
      "LLMs",
      "Generative AI",
      "RAG",
      "Agentic Workflows",
      "LangChain",
      "LangGraph",
      "Prompt Engineering",
      "Sentence Transformers",
      "PyTorch",
      "FastAPI",
      "Python",
      "ChromaDB",
    ],
  },
  {
    id: "fullstack-development",
    title: "Languages & Frameworks",
    note: "REST API Design, LLM Integration, Full-Stack Builds",
    skills: [
      "Python",
      "TypeScript",
      "FastAPI",
      "React",
      "Next.js",
      "Tailwind CSS",
      "RESTful APIs",
      "Node.js",
      "GraphQL",
      "WebSockets",
      "PostgreSQL",
      "shadcn/ui",
    ],
  },
  {
    id: "data-infrastructure",
    title: "Tools, Databases & Cloud",
    note: "Predictive Modeling, Data Processing, Deployment",
    skills: [
      "PostgreSQL",
      "SQL",
      "Docker",
      "Git & GitHub",
      "Qdrant",
      "ChromaDB",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Celery",
      "Redis",
      "Vercel",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section section-pad">
      <div className="wrap max-w-7xl mx-auto w-full">
        <div className="skills-heading">
          <h2>Tech Stack</h2>
          <p>
            The tools behind
            <br />
            my work.
          </p>
        </div>

        <div className="skills-specimens">
          {SKILL_COLUMNS.map((specimen, index) => (
            <motion.article
              key={specimen.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="skills-specimen"
              aria-labelledby={`skills-${specimen.id}`}
            >
              <h3 id={`skills-${specimen.id}`}>{specimen.title}</h3>
              <p className="skills-specimen-note">{specimen.note}</p>
              <ul className="skills-type-mosaic" aria-label={`${specimen.title} skills`}>
                {specimen.skills.map((skill, sIdx) => (
                  <li
                    key={skill}
                    className="skills-chip"
                    data-inverted={sIdx % 4 === 0 ? "true" : "false"}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
