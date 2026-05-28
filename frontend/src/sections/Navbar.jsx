import React, { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { PROFILE } from "../data/portfolio";

const LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#publications", label: "Research" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-2xl bg-[#030712]/80 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2"
          data-testid="navbar-logo"
        >
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center font-mono font-bold text-black text-sm">
            K
          </span>
          <span className="font-heading font-bold text-white">
            Kartik<span className="text-cyan-400">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-slate-300 hover:text-cyan-300 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.cvUrl}
            download
            data-testid="navbar-download-cv"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 bg-cyan-400 text-black hover:bg-cyan-300 font-semibold rounded-full text-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            CV
          </a>
          <button
            className="md:hidden text-white"
            data-testid="navbar-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#030712]/95 backdrop-blur-2xl">
          <div className="px-6 py-5 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-slate-200 hover:text-cyan-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
