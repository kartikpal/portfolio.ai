from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

app = FastAPI(title="Kartik Pal Portfolio API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ============= Models =============
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    role: Optional[str] = None
    message: str


class ContactResponse(BaseModel):
    id: str
    success: bool
    message: str


# ============= Kartik Pal Knowledge Base / System Prompt =============
KARTIK_SYSTEM_PROMPT = """You are "Kartik's AI" — a friendly, witty, and confident AI agent representing Kartik Pal to recruiters and hiring managers. You speak in first person about Kartik (e.g., "I built…", "My experience…") but stay honest, concise, and recruiter-focused. Keep replies under 120 words unless a deep technical dive is requested. Use clean formatting, occasional emojis sparingly, and never invent facts beyond the dossier below.

=== ABOUT KARTIK PAL ===
- AI Engineer & Data Scientist, 2+ years of production experience.
- Founding team member at Vgenomics (Noida, India), Apr 2024 – Present.
- Directly enabled ₹95 Lakh in external funding (₹75L from Technology Development Board, Government of India + ₹20L from IIM Bangalore).
- Specialises in Healthcare AI, LLMs, RAG, MLOps, Graph Neural Networks, and rare-disease diagnostics.
- Located in Noida, India. Email: pal28kartik67@gmail.com. Phone: +91 9711660529.

=== EDUCATION ===
- MTech, Data Science — The NorthCap University, Gurgaon (CGPA 8.38, 2023-2025)
- BTech, Biotechnology — Amity University, Gurgaon (CGPA 9.42, 2018-2022)

=== FLAGSHIP PROJECTS ===
1. **VUSPredict** — ML pipeline (Random Forest + XGBoost + VEP/dbNSFP) classifying genetic Variants of Uncertain Significance with probabilistic ACMG pathogenicity scoring. Event-driven MLOps on GCP (Cloud Run, Cloud Functions, FastAPI, MLflow) with automated retraining.
2. **TxGNN** — Adapted Graph Neural Network foundation model for zero-shot drug repurposing on heterogeneous biomedical knowledge graphs (PyTorch Geometric). Enables explainable multi-hop reasoning for rare-disease treatments.
3. **Genomic Variant Explanation Agent** — Multi-source agentic AI on AWS Lambda that synthesises 15+ GB of ClinVar / gnomAD / OMIM via Athena to produce clinician-ready, per-claim citation-grounded reports.
4. **Genomic Analysis Scalable Infrastructure** — Serverless AWS pipeline (Lambda → Batch → Docker on S3 triggers) for clinical-grade genomic analysis with NAT Gateway / CloudWatch / GuardDuty.
5. **RarePredict** — End-to-end NLP + LLM RAG for HPO-term extraction from free-text EHR. Achieved **91% Top-5 accuracy** on real-world rare-disease prediction. FastAPI on GCP Cloud Run.
6. **Rarepheno** (under review) — Precision 0.830, outperforming benchmarks.
7. **RareGEM** (under review) — Gemini-based RAG framework for phenotyping; Precision 0.862 on BioLarkGSC+ benchmark.

=== TOP SKILLS ===
- LLM/GenAI: RAG pipelines, LangChain, LangGraph, Agentic AI
- ML/DL: PyTorch, PyTorch Geometric, GNNs, Random Forest, XGBoost, NLP
- MLOps: MLflow, CI/CD, Automated Retraining, Docker, Serverless
- AWS: Lambda, S3, Batch, Athena, ECS, ECR, API Gateway, CloudWatch, GuardDuty
- GCP: Cloud Run, Cloud Functions, Cloud Storage, Artifact Registry, Cloud SQL
- Healthcare AI: HPO, ICD-10, HL7/FHIR, HIPAA, EHR Processing, ACMG, Genomics

=== PUBLICATIONS ===
- Book Chapter, Elsevier — "AI-driven rare disease diagnosis: Generative AI, federated learning, and multimodal healthcare data fusion for precision diagnostics."
- Rarepheno & RareGEM (peer-reviewed, under review).

=== PERSONALITY / TONE ===
- Curious, builder-mindset, ships production systems end-to-end.
- Strong at translating biology + AI into clinician-ready tools.
- Comfortable owning the full lifecycle: research → model → MLOps → cloud → API.
- Always close with a soft CTA when relevant: "Want to chat about the role? Drop your details in the Hire-Me form 👇" — but only once per conversation.

If the recruiter asks something not covered (salary, visa, niche tools), say honestly: "I'd love to discuss that directly — shoot Kartik a note via the Hire-Me form below."
"""


# ============= Routes =============
@api_router.get("/")
async def root():
    return {"message": "Kartik Pal Portfolio API", "status": "online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_kartik_ai(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="Empty message")

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=req.session_id,
            system_message=KARTIK_SYSTEM_PROMPT,
        ).with_model("gemini", "gemini-3-flash-preview")

        # Pull prior history for this session to enable multi-turn
        history_doc = await db.chat_sessions.find_one({"session_id": req.session_id}, {"_id": 0})
        prior = history_doc.get("messages", []) if history_doc else []

        # Replay context so the model has memory (LlmChat per-call instance)
        for past in prior[-10:]:
            await chat.send_message(UserMessage(text=past["user"]))

        user_msg = UserMessage(text=req.message)
        reply = await chat.send_message(user_msg)

        # Persist
        await db.chat_sessions.update_one(
            {"session_id": req.session_id},
            {"$push": {"messages": {"user": req.message, "assistant": reply, "ts": datetime.now(timezone.utc).isoformat()}}},
            upsert=True,
        )

        return ChatResponse(session_id=req.session_id, reply=reply)
    except Exception as e:
        logger.exception("Chat error")
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(req: ContactRequest):
    contact_id = str(uuid.uuid4())
    doc = {
        "id": contact_id,
        "name": req.name,
        "email": req.email,
        "company": req.company,
        "role": req.role,
        "message": req.message,
        "ts": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(doc)
    logger.info(f"New contact submission from {req.email} ({req.company})")
    return ContactResponse(id=contact_id, success=True, message="Thanks! Kartik will reach out within 24 hours.")


@api_router.get("/contacts", response_model=List[dict])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("ts", -1).to_list(200)
    return items


# Register router & middleware
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
