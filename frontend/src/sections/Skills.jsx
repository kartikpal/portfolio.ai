import React from "react";
import { motion } from "framer-motion";
import { SKILLS, TECH_MARQUEE } from "../data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
            // toolkit
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Built with these.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="neon-card rounded-xl p-6"
              data-testid={`skill-group-${i}`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400 mb-4">
                {g.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-slate-200 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 py-6 border-y border-white/10 overflow-hidden bg-[#06080f]">
        <div className="marquee-track">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
            <span
              key={i}
              className="font-mono text-sm uppercase tracking-[0.3em] text-slate-500 mx-8 whitespace-nowrap"
            >
              {t} <span className="text-cyan-400/60 mx-2">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
