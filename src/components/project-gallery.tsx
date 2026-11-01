"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectPreview } from "./project-preview";
import { AnimatePresence, motion } from "motion/react";
import { useMotionPreferences } from "./motion-provider";

const filters = ["All projects", "SaaS & platforms", "Web experiences"];

export function ProjectGallery() {
  const [filter, setFilter] = useState("All projects");
  const { enabled } = useMotionPreferences();
  const shown = projects.filter(
    (p) =>
      filter === "All projects" ||
      (filter === "Web experiences"
        ? p.theme === "shred"
        : p.theme !== "shred"),
  );
  return (
    <>
      <div className="work-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={filter === f ? "active" : ""}
            >
              {filter === f && (
                <motion.span
                  className="filter-indicator"
                  layoutId="project-filter-indicator"
                  aria-hidden="true"
                  transition={
                    enabled
                      ? { type: "spring", stiffness: 380, damping: 32 }
                      : { duration: 0 }
                  }
                />
              )}
              {f}
              {f === "All projects" && <span>04</span>}
            </button>
          ))}
        </div>
        <span className="work-hint">
          A closer look at the work <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="projects-grid" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((project) => (
            <motion.article
              className="project-card"
              key={project.slug}
              layout={enabled}
              initial={enabled ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: enabled ? 0.97 : 1 }}
              whileHover={enabled ? { y: -5 } : undefined}
              transition={{
                duration: enabled ? 0.32 : 0,
                layout: { type: "spring", stiffness: 270, damping: 30 },
              }}
            >
              <div className="project-image-link">
                <div aria-hidden="true">
                  <ProjectPreview project={project} />
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="project-preview-hitarea"
                  aria-label={`View ${project.name} case study`}
                >
                  <span className="project-image-arrow">
                    <ArrowUpRight size={23} />
                  </span>
                </Link>
              </div>
              <div className="project-meta">
                <span>{project.category}</span>
                <span>/{project.number}</span>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="project-title"
              >
                <h3>{project.name}</h3>
                <ArrowUpRight size={23} />
              </Link>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.stack
                  .slice(0, project.theme === "shred" ? 1 : 4)
                  .map((t) => (
                    <span key={t}>{t}</span>
                  ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
