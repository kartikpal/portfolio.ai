import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";

const projectImage =
  "https://static.prod-images.emergentagent.com/jobs/7ca30155-eaa9-4382-82b3-f72896bfba57/images/b0fe6b95c72b4805a44939594151cc7a83a3e048f2c2b86bcacb189d5717d680.png";

function accentClasses(accent) {
  return accent === "green"
    ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/5"
    : "text-cyan-300 border-cyan-400/30 bg-cyan-400/5";
}

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
              // production work
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              Systems I've shipped.
            </h2>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed">
            Production AI systems across LLMs, RAG, agentic AI, GNNs, and
            serverless cloud — each shipped end-to-end and battle-tested.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              data-testid={`project-card-${p.id}`}
              className={`neon-card tracing-border relative rounded-2xl p-7 md:p-8 flex flex-col gap-5 min-h-[280px] ${p.span}`}
            >
              {/* Project visual on featured cards */}
              {(idx === 0 || idx === 3) && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <img
                    src={projectImage}
                    alt=""
                    className="w-full h-full object-cover opacity-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220]/90 via-[#0b1220]/70 to-transparent" />
                </div>
              )}

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-2">
                    0{idx + 1} / 0{PROJECTS.length}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                    {p.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">{p.tagline}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 shrink-0" />
              </div>

              <div className="relative">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-mono ${accentClasses(
                    p.accent
                  )}`}
                  data-testid={`project-highlight-${p.id}`}
                >
                  {p.highlight}
                </span>
              </div>

              <p className="relative text-slate-300 leading-relaxed text-[15px]">
                {p.description}
              </p>

              <div className="relative mt-auto flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] text-slate-400 px-2 py-1 border border-white/10 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
