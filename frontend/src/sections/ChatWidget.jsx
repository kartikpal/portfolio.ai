import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Sparkles, Send, X, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const QUICK_PROMPTS = [
  "Walk me through your top project.",
  "What's your AWS / GCP experience?",
  "How did you raise ₹95L?",
  "Are you open to remote roles?",
];

function genSessionId() {
  return (
    "sess-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

export default function ChatWidget({ open, onClose }) {
  const [sessionId] = useState(() => {
    try {
      const existing = localStorage.getItem("kartik_chat_session");
      if (existing) return existing;
      const fresh = genSessionId();
      localStorage.setItem("kartik_chat_session", fresh);
      return fresh;
    } catch {
      return genSessionId();
    }
  });
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hey! I'm Kartik's AI 🤖 — ask me about my projects, stack, funding wins, or anything that would help you decide whether to bring me onto your team.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send(text) {
    const message = (text ?? input).trim();
    if (!message || busy) return;
    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setBusy(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message,
      });
      setMessages((m) => [
        ...m,
        { role: "assistant", text: res.data.reply },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            "Hmm, I hit a network hiccup. Try again, or drop your details in the Hire-Me form below and Kartik will follow up directly.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      data-testid="chat-widget"
      className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-end p-0 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full md:w-[440px] h-[88vh] md:h-[640px] bg-[#0b1220] border border-cyan-400/30 rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          boxShadow:
            "0 0 40px rgba(0, 240, 255, 0.15), 0 0 120px rgba(0, 240, 255, 0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#06080f]">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
              <span className="absolute -bottom-0 -right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#06080f] pulse-dot" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-white">
                Kartik's AI
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                Gemini 3 Flash · online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            data-testid="chat-close-btn"
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollerRef}
          className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
          data-testid="chat-messages"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-cyan-400 text-black rounded-br-sm"
                    : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 inline-flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-xs font-mono">thinking…</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && !busy && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                data-testid={`chat-quick-${p.slice(0, 12)}`}
                onClick={() => send(p)}
                className="text-[12px] font-mono text-cyan-300 px-3 py-1.5 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-white/10 p-4 flex gap-2 bg-[#06080f]"
        >
          <input
            data-testid="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Kartik…"
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 transition-colors"
            disabled={busy}
          />
          <Button
            type="submit"
            data-testid="chat-send-btn"
            disabled={busy || !input.trim()}
            className="rounded-full bg-cyan-400 text-black hover:bg-cyan-300 px-4 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
