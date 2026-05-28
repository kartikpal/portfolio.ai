import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiDocker,
  SiGooglecloud,
  SiKubernetes,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithubactions,
  SiOpenai,
  SiHuggingface,
  SiLangchain,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiGraphql,
  SiRedis,
  SiMlflow,
  SiNeo4J,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Brain, Database, Cloud, Sparkles, Workflow, Shield, ServerCog } from "lucide-react";
import { TECH_MARQUEE } from "../data/portfolio";

/* Custom AWS-services dont have brand icons → use lucide fallback + label */
const skillGroups = [
  {
    id: "genai",
    title: "LLM & GenAI",
    blurb: "Building production agentic AI, RAG pipelines, and LLM-powered backends.",
    Icon: Sparkles,
    accent: "#00F0FF",
    skills: [
      { name: "OpenAI", Icon: SiOpenai },
      { name: "LangChain", Icon: SiLangchain },
      { name: "LangGraph", Icon: SiLangchain },
      { name: "Hugging Face", Icon: SiHuggingface },
      { name: "Gemini", Icon: Brain, custom: true },
      { name: "RAG", Icon: Database, custom: true },
      { name: "Agentic AI", Icon: Workflow, custom: true },
    ],
  },
  {
    id: "ml",
    title: "ML / Deep Learning",
    blurb: "End-to-end ML — from feature engineering to GNNs and transformers.",
    Icon: Brain,
    accent: "#00FF66",
    skills: [
      { name: "Python", Icon: SiPython },
      { name: "PyTorch", Icon: SiPytorch },
      { name: "PyTorch Geometric", Icon: SiPytorch },
      { name: "TensorFlow", Icon: SiTensorflow },
      { name: "scikit-learn", Icon: SiScikitlearn },
      { name: "NumPy", Icon: SiNumpy },
      { name: "Pandas", Icon: SiPandas },
      { name: "XGBoost", Icon: Brain, custom: true },
    ],
  },
  {
    id: "mlops",
    title: "MLOps",
    blurb: "CI/CD, model registries, automated retraining, serverless deployment.",
    Icon: Workflow,
    accent: "#00F0FF",
    skills: [
      { name: "Docker", Icon: SiDocker },
      { name: "MLflow", Icon: SiMlflow },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "Git", Icon: SiGit },
      { name: "Kubernetes", Icon: SiKubernetes },
      { name: "Serverless", Icon: ServerCog, custom: true },
      { name: "Automated Retraining", Icon: Workflow, custom: true },
    ],
  },
  {
    id: "aws",
    title: "Cloud · AWS",
    blurb: "Lambda, Batch, Athena, S3 pipelines secured for clinical-grade workloads.",
    Icon: Cloud,
    accent: "#00FF66",
    skills: [
      { name: "AWS Lambda", Icon: FaAws },
      { name: "S3", Icon: FaAws },
      { name: "AWS Batch", Icon: FaAws },
      { name: "Athena", Icon: FaAws },
      { name: "ECS / ECR", Icon: FaAws },
      { name: "API Gateway", Icon: FaAws },
      { name: "CloudWatch", Icon: FaAws },
      { name: "GuardDuty", Icon: FaAws },
    ],
  },
  {
    id: "gcp",
    title: "Cloud · GCP",
    blurb: "Cloud Run, Cloud Functions, Artifact Registry, Cloud SQL.",
    Icon: Cloud,
    accent: "#00F0FF",
    skills: [
      { name: "Cloud Run", Icon: SiGooglecloud },
      { name: "Cloud Functions", Icon: SiGooglecloud },
      { name: "Cloud Storage", Icon: SiGooglecloud },
      { name: "Artifact Registry", Icon: SiGooglecloud },
      { name: "Cloud SQL", Icon: SiGooglecloud },
      { name: "Cloud Scheduler", Icon: SiGooglecloud },
    ],
  },
  {
    id: "data",
    title: "Backend & Data",
    blurb: "REST/GraphQL APIs, transactional & analytical data layers.",
    Icon: Database,
    accent: "#00FF66",
    skills: [
      { name: "FastAPI", Icon: SiFastapi },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
      { name: "Neo4j", Icon: SiNeo4J },
    ],
  },
  {
    id: "domain",
    title: "Domain & Compliance",
    blurb: "HIPAA-aware engineering, healthcare data formats, knowledge graphs.",
    Icon: Shield,
    accent: "#00F0FF",
    skills: [
      { name: "HIPAA", Icon: Shield, custom: true },
      { name: "HL7 / FHIR", Icon: Database, custom: true },
      { name: "EHR Processing", Icon: Database, custom: true },
      { name: "Knowledge Graphs", Icon: Workflow, custom: true },
      { name: "Vector DBs", Icon: Database, custom: true },
    ],
  },
];

export default function Skills() {
  const [active, setActive] = useState("genai");
  const activeGroup = skillGroups.find((g) => g.id === active) || skillGroups[0];

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-24 md:py-32 bg-[#06080f] border-y border-white/10 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08), transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
              // toolkit · {skillGroups.reduce((a, g) => a + g.skills.length, 0)}+ tools
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Built with these.
            </h2>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed">
            A curated stack honed over 2+ years of shipping production AI — pick a category to drill in.
          </p>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-10" data-testid="skills-tabs">
          {skillGroups.map((g) => {
            const isActive = g.id === active;
            const I = g.Icon;
            return (
              <button
                key={g.id}
                data-testid={`skill-tab-${g.id}`}
                onClick={() => setActive(g.id)}
                onMouseEnter={() => setActive(g.id)}
                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-sm ${
                  isActive
                    ? "bg-white/[0.05] text-white"
                    : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: `${g.accent}66`,
                        boxShadow: `0 0 18px ${g.accent}22`,
                      }
                    : {}
                }
              >
                <I
                  className="w-3.5 h-3.5"
                  style={{ color: isActive ? g.accent : "currentColor" }}
                />
                {g.title}
                <span className="font-mono text-[10px] text-slate-500">
                  {g.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active group panel */}
        <motion.div
          key={activeGroup.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl border bg-[#0a1018] p-7 md:p-10"
          style={{
            borderColor: `${activeGroup.accent}33`,
            boxShadow: `0 0 40px ${activeGroup.accent}10`,
          }}
          data-testid="skills-panel"
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${activeGroup.accent}, transparent)`,
            }}
          />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: title + blurb */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: `${activeGroup.accent}12`,
                  border: `1px solid ${activeGroup.accent}44`,
                }}
              >
                <activeGroup.Icon
                  className="w-6 h-6"
                  style={{ color: activeGroup.accent }}
                />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                {activeGroup.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                {activeGroup.blurb}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Coverage
                </span>
                <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: activeGroup.accent }}
                  />
                </div>
                <span
                  className="font-mono text-xs"
                  style={{ color: activeGroup.accent }}
                >
                  92%
                </span>
              </div>
            </div>

            {/* Right: skill cards */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {activeGroup.skills.map((s, i) => {
                  const SI = s.Icon;
                  return (
                    <motion.div
                      key={s.name + i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                      whileHover={{ y: -3 }}
                      className="group relative aspect-square flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/8 bg-black/30 cursor-default transition-all hover:bg-black/50"
                      data-testid={`skill-${s.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      style={{
                        // subtle border tint on hover via inline style + group
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          boxShadow: `inset 0 0 0 1px ${activeGroup.accent}55, 0 0 18px ${activeGroup.accent}22`,
                        }}
                      />
                      <SI
                        className="w-7 h-7 text-slate-300 group-hover:text-white transition-colors"
                        style={{
                          // brand-ish tint on hover
                        }}
                      />
                      <span className="text-[11px] text-center text-slate-400 group-hover:text-white transition-colors leading-tight">
                        {s.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-20 py-6 border-y border-white/10 overflow-hidden bg-[#030712]">
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
