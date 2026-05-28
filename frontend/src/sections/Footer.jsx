import React from "react";
import { Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/portfolio";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/10 py-12 bg-[#06080f]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <p className="font-heading text-lg font-bold">
            Kartik Pal<span className="text-cyan-400">.</span>
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mt-2">
            AI Engineer · Noida, India · 2025
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            data-testid="footer-email"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-linkedin"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8 pt-6 border-t border-white/5">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
          // Designed & built with intent. Recruiters welcome.
        </p>
      </div>
    </footer>
  );
}
