import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Linkedin, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { PROFILE } from "../data/portfolio";
import AnimeHero from "./AnimeHero";

export default function Hero({ onOpenContact }) {
  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 min-h-[92vh]"
    >
      {/* Anime animated canvas background */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimeHero />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 mb-8"
          data-testid="hero-status-badge"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 pulse-dot" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-300">
            {PROFILE.status}
          </span>
        </motion.div>

        {/* Tagline label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-6"
          data-testid="hero-role-label"
        >
          {PROFILE.role}
        </motion.p>

        {/* Big name — animated reveal */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[8rem] font-black leading-[0.95] tracking-tighter mb-6"
          data-testid="hero-name"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
            }}
            className="block text-white"
          >
            Kartik
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
            }}
            className="block text-gradient"
          >
            Pal.
          </motion.span>
        </motion.h1>

        {/* Summary headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="max-w-3xl text-[15px] sm:text-base text-slate-300 leading-[1.75] mb-6"
          data-testid="hero-tagline"
        >
          {PROFILE.tagline.split(/(₹95 Lakh|RAG|LangGraph|MLOps|2\+ years|AWS and GCP|Published researcher)/g).map((chunk, i) => {
            const accents = ["₹95 Lakh", "RAG", "LangGraph", "MLOps", "2+ years", "AWS and GCP", "Published researcher"];
            if (accents.includes(chunk)) {
              return (
                <span key={i} className="text-cyan-300 font-semibold">
                  {chunk}
                </span>
              );
            }
            return <React.Fragment key={i}>{chunk}</React.Fragment>;
          })}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-mono text-sm text-slate-500 mb-10"
          data-testid="hero-sub-role"
        >
          {PROFILE.subRole}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button
            data-testid="hero-cta-hire"
            onClick={onOpenContact}
            className="group h-12 px-6 bg-cyan-400 text-black hover:bg-cyan-300 font-semibold rounded-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            Hire me
            <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>

          <a
            href={PROFILE.cvUrl}
            download
            data-testid="hero-cta-download-cv"
            className="inline-flex items-center gap-2 h-12 px-6 border border-white/20 bg-transparent text-white hover:bg-white/5 rounded-full font-medium"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-linkedin"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
