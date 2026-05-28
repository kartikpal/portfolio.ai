import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE, EDUCATION } from "../data/portfolio";
import { GraduationCap, Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative py-24 md:py-32 bg-[#06080f] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
            // trajectory
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Experience & Education.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience timeline */}
          <div>
            <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-slate-400 mb-8 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Work
            </h3>
            <div className="relative pl-8 border-l border-white/10">
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative mb-12 last:mb-0"
                  data-testid={`exp-item-${i}`}
                >
                  <span className="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-cyan-400 cyan-glow" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                    {e.period}
                  </p>
                  <h4 className="font-heading text-xl md:text-2xl font-semibold text-white">
                    {e.role}
                  </h4>
                  <p className="text-cyan-300 text-sm mt-1">
                    {e.company} · {e.location}
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-300 text-[15px] leading-relaxed list-disc list-outside ml-4">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-slate-400 mb-8 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Education
            </h3>
            <div className="space-y-5">
              {EDUCATION.map((ed, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="neon-card rounded-xl p-6"
                  data-testid={`edu-item-${i}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-white">
                        {ed.degree}
                      </h4>
                      <p className="text-slate-400 text-sm mt-1">{ed.school}</p>
                    </div>
                    <span className="font-mono text-xs text-emerald-300 shrink-0">
                      {ed.score}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate-500 mt-3">
                    {ed.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
