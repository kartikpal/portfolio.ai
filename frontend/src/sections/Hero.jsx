import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { PROFILE } from "../data/portfolio";

const heroImage =
  "https://static.prod-images.emergentagent.com/jobs/7ca30155-eaa9-4382-82b3-f72896bfba57/images/bcb0955280bbe21313345d144d9f5c1fbf07a53324081e8a3c2623985a0d57a1.png";

export default function Hero({ onOpenChat, onOpenContact }) {
  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Hero background visual */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroImage}
          alt="AI Genomics visual"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/70 to-[#030712]" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 grid-bg opacity-60" />
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

        {/* Big name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[8rem] font-black leading-[0.95] tracking-tighter mb-6"
          data-testid="hero-name"
        >
          <span className="block text-white">Kartik</span>
          <span className="block text-gradient">Pal.</span>
        </motion.h1>

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed mb-4"
          data-testid="hero-tagline"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="font-mono text-sm text-slate-500 mb-10"
          data-testid="hero-sub-role"
        >
          {PROFILE.subRole}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button
            data-testid="hero-cta-ask-ai"
            onClick={onOpenChat}
            className="group h-12 px-6 bg-cyan-400 text-black hover:bg-cyan-300 font-semibold rounded-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ask Kartik's AI
            <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>

          <Button
            data-testid="hero-cta-hire"
            onClick={onOpenContact}
            variant="outline"
            className="h-12 px-6 border-white/20 bg-transparent text-white hover:bg-white/5 rounded-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            Hire me
          </Button>

          <a
            href={PROFILE.cvUrl}
            download
            data-testid="hero-cta-download-cv"
            className="inline-flex items-center gap-2 h-12 px-5 font-mono text-sm text-slate-300 hover:text-cyan-300 transition-colors"
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
