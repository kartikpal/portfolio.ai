import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Zap, GitBranch } from "lucide-react";
import { PROJECTS } from "../data/portfolio";

function accentColor(accent) {
  return accent === "green" ? "#00FF66" : "#00F0FF";
}

const ICONS = [Terminal, Cpu, GitBranch, Zap, Terminal, Cpu];

export default function Projects() {
  const [active, setActive] = useState(0);
  const activeProject = PROJECTS[active];

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Faint diagonal accents */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08), transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,255,102,0.06), transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
              // production work · {PROJECTS.length} systems
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Systems I've shipped.
            </h2>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed">
            Production AI systems across LLMs, RAG, agentic AI, GNNs, and
            serverless cloud — each shipped end-to-end and battle-tested.
          </p>
        </div>

        {/* Interactive split — Index on the left, Detail panel on the right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* INDEX */}
          <div className="lg:col-span-5" data-testid="project-index">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="font-mono text-[11px] text-slate-500 ml-3">
                ~/kartik/production-systems
              </span>
            </div>

            <ul className="space-y-1">
              {PROJECTS.map((p, i) => {
                const Icon = ICONS[i] || Terminal;
                const isActive = i === active;
                return (
                  <li key={p.id}>
                    <button
                      data-testid={`project-tab-${p.id}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`group w-full text-left px-4 py-4 rounded-lg flex items-start gap-4 transition-all duration-300 relative ${
                        isActive
                          ? "bg-white/[0.04] border border-cyan-400/20"
                          : "border border-transparent hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Active vertical bar */}
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r transition-all"
                        style={{
                          background: isActive ? accentColor(p.accent) : "transparent",
                          boxShadow: isActive
                            ? `0 0 12px ${accentColor(p.accent)}`
                            : "none",
                        }}
                      />
                      <span
                        className={`font-mono text-[11px] mt-1 transition-colors ${
                          isActive ? "text-cyan-300" : "text-slate-600"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <Icon
                        className={`w-4 h-4 mt-1 transition-colors shrink-0 ${
                          isActive ? "text-cyan-300" : "text-slate-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-heading font-semibold text-lg transition-colors ${
                            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          {p.name}
                        </div>
                        <div
                          className={`font-mono text-[11px] mt-0.5 transition-colors ${
                            isActive ? "text-cyan-400/80" : "text-slate-600"
                          }`}
                        >
                          {p.tagline}
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 mt-1 transition-all ${
                          isActive
                            ? "text-cyan-300 translate-x-0 opacity-100"
                            : "text-slate-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* DETAIL PANEL */}
          <div className="lg:col-span-7" data-testid="project-detail">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.id}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="relative rounded-2xl overflow-hidden border bg-[#0a1018]"
                style={{
                  borderColor: `${accentColor(activeProject.accent)}33`,
                  boxShadow: `0 0 40px ${accentColor(activeProject.accent)}15, inset 0 0 60px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Window header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="font-mono text-[11px] text-slate-500 ml-3">
                      {activeProject.id}.system
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
                    0{active + 1} / 0{PROJECTS.length}
                  </span>
                </div>

                {/* Body */}
                <div className="p-8 md:p-10">
                  {/* Status row */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="relative flex w-2 h-2">
                      <span
                        className="absolute inline-flex w-full h-full rounded-full pulse-dot"
                        style={{ background: accentColor(activeProject.accent) }}
                      />
                      <span
                        className="relative inline-flex w-2 h-2 rounded-full"
                        style={{ background: accentColor(activeProject.accent) }}
                      />
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: accentColor(activeProject.accent) }}
                    >
                      Production · Live
                    </span>
                  </div>

                  <h3 className="font-heading text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.05] mb-4">
                    {activeProject.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8">
                    {activeProject.tagline}
                  </p>

                  {/* Highlight stat */}
                  <div
                    className="inline-block mb-8 px-5 py-3 rounded-xl border"
                    style={{
                      borderColor: `${accentColor(activeProject.accent)}40`,
                      background: `${accentColor(activeProject.accent)}0d`,
                    }}
                    data-testid={`project-highlight-${activeProject.id}`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-1">
                      Key impact
                    </p>
                    <p
                      className="font-heading text-2xl md:text-3xl font-bold"
                      style={{ color: accentColor(activeProject.accent) }}
                    >
                      {activeProject.highlight}
                    </p>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-[15px] md:text-base mb-8">
                    {activeProject.description}
                  </p>

                  {/* Stack as terminal output */}
                  <div className="bg-black/40 rounded-lg border border-white/5 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 mb-3">
                      $ stack --list
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs px-2.5 py-1 rounded border border-white/10 text-slate-300 bg-white/[0.02] hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated gradient edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor(activeProject.accent)}, transparent)`,
                  }}
                />
              </motion.article>
            </AnimatePresence>

            {/* Hint */}
            <p className="font-mono text-[11px] text-slate-600 mt-5 text-center lg:text-right">
              <span className="text-cyan-400">↑ ↓</span> hover or click to explore each system
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
