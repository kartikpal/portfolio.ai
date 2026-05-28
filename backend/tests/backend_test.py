"""Backend tests for Kartik Pal Portfolio API"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://recruiter-magnet-12.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health ---
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "online"
        assert "Kartik" in data.get("message", "")


# --- Contact ---
class TestContact:
    def test_submit_valid_contact_persists(self, session):
        payload = {
            "name": "TEST_Recruiter",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "company": "TEST_Acme AI",
            "role": "Senior ML Engineer",
            "message": "TEST_MESSAGE Interested in chatting about a role.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert data["id"]
        assert "Kartik" in data["message"]

        # Verify persistence via GET /api/contacts
        g = session.get(f"{API}/contacts", timeout=20)
        assert g.status_code == 200
        items = g.json()
        assert any(c.get("id") == data["id"] and c.get("email") == payload["email"] for c in items), \
            "Submitted contact not present in /api/contacts"

    def test_invalid_email_rejected(self, session):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "TEST_invalid email",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422, f"Expected 422 for invalid email, got {r.status_code}: {r.text}"

    def test_missing_required_fields(self, session):
        # No message
        r = session.post(f"{API}/contact", json={"name": "x", "email": "a@b.com"}, timeout=20)
        assert r.status_code == 422

    def test_list_contacts(self, session):
        r = session.get(f"{API}/contacts", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # No _id leaked
        for item in data[:5]:
            assert "_id" not in item


# --- Chat ---
class TestChat:
    def test_empty_message_returns_400(self, session):
        r = session.post(f"{API}/chat", json={"session_id": "test-empty", "message": "   "}, timeout=20)
        assert r.status_code == 400, r.text

    def test_chat_returns_meaningful_reply(self, session):
        sid = f"TEST_sess_{uuid.uuid4().hex[:8]}"
        r = session.post(
            f"{API}/chat",
            json={"session_id": sid, "message": "Tell me about Kartik's top project in one sentence."},
            timeout=90,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["session_id"] == sid
        assert isinstance(data["reply"], str) and len(data["reply"].strip()) > 10
        # Cache sid for next test
        pytest.shared_sid = sid

    def test_chat_multi_turn_context(self, session):
        sid = getattr(pytest, "shared_sid", None)
        if not sid:
            pytest.skip("Prior chat test did not run.")
        # Follow up referencing prior turn implicitly
        r = session.post(
            f"{API}/chat",
            json={"session_id": sid, "message": "What stack did that project use?"},
            timeout=120,
        )
        assert r.status_code == 200, r.text
        reply = r.json()["reply"].lower()
        # Should not say "no project mentioned" — should reference tech stack words
        assert len(reply) > 10
        # Heuristic: reply should contain at least one tech keyword
        keywords = ["python", "pytorch", "fastapi", "aws", "gcp", "cloud", "lambda", "xgboost",
                    "random forest", "graph", "rag", "llm", "mlops", "mlflow", "docker", "gemini"]
        assert any(k in reply for k in keywords), f"Multi-turn reply lacks tech context: {reply[:300]}"


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
