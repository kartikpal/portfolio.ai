import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { STATS } from "../data/portfolio";

function useCountUp(target, durationMs = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const startTs = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTs) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return value;
}

function StatItem({ stat, start, index }) {
  const value = useCountUp(stat.value, 1400 + index * 150, start);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
      data-testid={`stat-card-${index}`}
    >
      <div className="flex flex-col gap-2 py-8 px-2 border-l border-white/10 group-hover:border-cyan-400/60 transition-colors">
        <div className="font-heading text-5xl md:text-6xl font-black tracking-tighter text-white">
          <span className="text-cyan-300">{stat.prefix}</span>
          {value.toLocaleString()}
          <span className="text-cyan-300">{stat.suffix}</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-testid="stats-section"
      className="relative py-20 md:py-28 border-y border-white/10 bg-[#06080f]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
            // signal
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {STATS.map((s, i) => (
            <StatItem stat={s} start={inView} index={i} key={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
