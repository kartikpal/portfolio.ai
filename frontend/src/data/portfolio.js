// Static data file for Kartik Pal's portfolio
export const PROFILE = {
  name: "Kartik Pal",
  role: "AI Engineer / Data Scientist",
  subRole: "Healthcare AI · LLMs · MLOps · Genomics",
  location: "Noida, India",
  email: "pal28kartik67@gmail.com",
  phone: "+91 9711660529",
  linkedin: "https://www.linkedin.com/in/kartik-pal/",
  cvUrl: "/Kartik_Pal_CV.pdf",
  tagline:
    "I build production-grade AI systems that move medicine forward — from rare-disease diagnostics to drug repurposing.",
  status: "Open to senior AI / ML Engineer roles",
};

export const STATS = [
  { value: 95, suffix: "L", prefix: "₹", label: "Funding enabled" },
  { value: 91, suffix: "%", prefix: "", label: "Top-5 diagnostic accuracy" },
  { value: 7, suffix: "", prefix: "", label: "Production AI systems" },
  { value: 2, suffix: "+", prefix: "", label: "Years building in prod" },
];

export const EXPERIENCE = [
  {
    role: "Data Scientist — Founding Team",
    company: "Vgenomics",
    location: "Noida, India",
    period: "Apr 2024 — Present",
    bullets: [
      "Founding-team member; directly enabled ₹95 Lakh in external funding (₹75L Technology Development Board, Govt. of India + ₹20L IIM Bangalore).",
      "Built the full AI stack from scratch — research → model → MLOps → cloud → API.",
      "Shipped 5 production AI systems across LLMs, RAG, agentic AI, GNNs, and serverless genomic pipelines.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Vgenomics",
    location: "Noida, India",
    period: "Oct 2023 — Apr 2024",
    bullets: [
      "Developed the foundational rare-disease prediction algorithm from symptom profiles — the core of what became RarePredict.",
      "Built a PubMed literature-mining tool to retrieve and index research papers by keyword.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "rarepredict",
    name: "RarePredict",
    tagline: "AI Rare-Disease Expert System",
    highlight: "91% Top-5 accuracy",
    description:
      "End-to-end NLP + LLM RAG pipeline for HPO term extraction from free-text EHR notes; network-based diagnostic model deployed on GCP Cloud Run.",
    stack: ["LLM RAG", "FastAPI", "GCP Cloud Run", "Docling", "HPO"],
    span: "lg:col-span-8",
    accent: "cyan",
  },
  {
    id: "vuspredict",
    name: "VUSPredict",
    tagline: "ML + MLOps for ACMG variant classification",
    highlight: "Event-driven retraining",
    description:
      "Ensemble (RF + XGBoost + VEP/dbNSFP) classifying Variants of Uncertain Significance with probabilistic ACMG scoring; serverless MLOps on GCP.",
    stack: ["XGBoost", "MLflow", "Cloud Run", "FastAPI"],
    span: "lg:col-span-4",
    accent: "green",
  },
  {
    id: "txgnn",
    name: "TxGNN",
    tagline: "GNN-based drug repurposing",
    highlight: "Zero-shot therapeutic discovery",
    description:
      "Adapted a Graph Neural Network foundation model on heterogeneous disease-gene-drug knowledge graphs for explainable multi-hop reasoning.",
    stack: ["PyTorch Geometric", "GNN", "Knowledge Graphs"],
    span: "lg:col-span-4",
    accent: "cyan",
  },
  {
    id: "variant-agent",
    name: "Genomic Variant Explanation Agent",
    tagline: "Agentic AI · multi-source clinical RAG",
    highlight: "15+ GB evidence base",
    description:
      "Agentic system synthesising ClinVar, gnomAD, OMIM via AWS Athena to produce clinician-ready, per-claim citation-grounded variant reports. Hallucination-resistant.",
    stack: ["AWS Lambda", "Athena", "LangGraph", "Agents"],
    span: "lg:col-span-8",
    accent: "green",
  },
  {
    id: "aws-infra",
    name: "Serverless Genomic Infrastructure",
    tagline: "Clinical-grade AWS pipeline",
    highlight: "Lambda → Batch → Docker",
    description:
      "Dockerised genomic pipelines triggered by S3 uploads, secured with NAT Gateway, CloudWatch, and GuardDuty for HIPAA-grade compliance.",
    stack: ["AWS Lambda", "Batch", "Docker", "GuardDuty"],
    span: "lg:col-span-6",
    accent: "cyan",
  },
  {
    id: "raregem",
    name: "RareGEM",
    tagline: "Gemini RAG framework",
    highlight: "Precision 0.862 · under review",
    description:
      "RAG-based Gemini framework for rare-disease phenotyping; outperforms benchmark on BioLarkGSC+.",
    stack: ["Gemini", "RAG", "Bio-NLP"],
    span: "lg:col-span-6",
    accent: "green",
  },
];

export const SKILLS = [
  {
    group: "LLM & GenAI",
    items: ["RAG Pipelines", "LangChain", "LangGraph", "Agentic AI", "Prompt Engineering"],
  },
  {
    group: "ML / DL",
    items: ["PyTorch", "PyTorch Geometric", "GNNs", "Random Forest", "XGBoost", "NLP"],
  },
  {
    group: "MLOps",
    items: ["MLflow", "CI/CD", "Automated Retraining", "Docker", "Serverless"],
  },
  {
    group: "Cloud · AWS",
    items: ["Lambda", "S3", "Batch", "Athena", "ECS/ECR", "API Gateway", "CloudWatch", "GuardDuty"],
  },
  {
    group: "Cloud · GCP",
    items: ["Cloud Run", "Cloud Functions", "Artifact Registry", "Cloud SQL", "Cloud Scheduler"],
  },
  {
    group: "Healthcare AI",
    items: ["HPO", "ICD-10", "HL7/FHIR", "HIPAA", "EHR Processing", "ACMG", "Genomics"],
  },
];

export const PUBLICATIONS = [
  {
    title:
      "AI-driven rare disease diagnosis — Generative AI, federated learning, and multimodal healthcare data fusion for precision diagnostics",
    venue: "Elsevier — Book Chapter",
    year: "2025",
    status: "Published",
  },
  {
    title: "Rarepheno — AI-driven symptom extraction from clinical narratives",
    venue: "Peer-reviewed journal",
    year: "2025",
    status: "Under review · Precision 0.830",
  },
  {
    title: "RareGEM — Gemini-RAG framework for rare-disease phenotyping",
    venue: "Peer-reviewed journal",
    year: "2025",
    status: "Under review · Precision 0.862 on BioLarkGSC+",
  },
];

export const EDUCATION = [
  {
    degree: "M.Tech, Data Science",
    school: "The NorthCap University, Gurgaon",
    period: "2023 — 2025",
    score: "CGPA 8.38",
  },
  {
    degree: "B.Tech, Biotechnology",
    school: "Amity University, Gurgaon",
    period: "2018 — 2022",
    score: "CGPA 9.42",
  },
];

export const TECH_MARQUEE = [
  "Python",
  "PyTorch",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "MLflow",
  "AWS Lambda",
  "GCP Cloud Run",
  "Docker",
  "XGBoost",
  "PyTorch Geometric",
  "Athena",
  "ClinVar",
  "OMIM",
  "HPO",
  "HL7 / FHIR",
  "Gemini",
  "RAG",
  "Agentic AI",
  "MongoDB",
  "PostgreSQL",
  "GraphQL",
];
