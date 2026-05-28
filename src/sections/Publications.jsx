import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText } from "lucide-react";
import { PUBLICATIONS } from "../data/portfolio";

export default function Publications() {
  return (
    <section
      id="publications"
      data-testid="publications-section"
      className="relative py-24 md:py-32 bg-[#06080f] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
            // research
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Publications & Research.
          </h2>
        </div>

        <div className="relative pl-8 border-l border-white/10">
          {PUBLICATIONS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
              data-testid={`pub-item-${i}`}
            >
              <span className="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-emerald-400 cyan-glow" />
              <div className="flex items-start gap-2 mb-2">
                {p.venue.includes("Elsevier") ? (
                  <BookOpen className="w-4 h-4 text-emerald-300 mt-1" />
                ) : (
                  <FileText className="w-4 h-4 text-cyan-300 mt-1" />
                )}
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  {p.year} · {p.venue}
                </p>
              </div>
              <h4 className="font-heading text-lg md:text-xl font-semibold text-white leading-snug">
                {p.title}
              </h4>
              <p className="text-sm text-cyan-300 mt-2">{p.status}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
