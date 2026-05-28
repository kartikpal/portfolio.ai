import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Download, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { PROFILE } from "../data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    setBusy(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      toast.success(res.data.message || "Sent!");
      setDone(true);
      setForm({ name: "", email: "", company: "", role: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — pitch */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
              // let's talk
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] mb-6">
              Hiring for an{" "}
              <span className="text-gradient">AI / ML role?</span>
              <br />
              I'd love to chat.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-10 max-w-md">
              I'm actively exploring senior AI Engineer & ML roles where I can
              ship production systems end-to-end. Drop a note and I'll respond
              within 24 hours.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${PROFILE.email}`}
                data-testid="contact-email-link"
                className="flex items-center gap-4 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="font-mono text-sm">{PROFILE.email}</span>
              </a>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="font-mono text-sm">{PROFILE.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="font-mono text-sm">{PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-4 pt-3">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-linkedin-link"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={PROFILE.cvUrl}
                  download
                  data-testid="contact-cv-download"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="neon-card rounded-2xl p-7 md:p-9"
            data-testid="hire-form"
          >
            {done ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="font-heading text-2xl font-bold mb-2">
                  Message received.
                </h3>
                <p className="text-slate-400 max-w-sm">
                  Thanks for reaching out — Kartik will reply within 24 hours.
                </p>
                <Button
                  onClick={() => setDone(false)}
                  variant="outline"
                  className="mt-6 border-white/20 hover:bg-white/5"
                  data-testid="hire-form-reset"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400 mb-6">
                  → hire-me form
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Your name *
                    </label>
                    <Input
                      data-testid="hire-form-name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Jane Recruiter"
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Email *
                    </label>
                    <Input
                      data-testid="hire-form-email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="jane@company.com"
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Company
                    </label>
                    <Input
                      data-testid="hire-form-company"
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Acme AI"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Role you're hiring for
                    </label>
                    <Input
                      data-testid="hire-form-role"
                      value={form.role}
                      onChange={update("role")}
                      placeholder="Senior ML Engineer"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Pitch me the opportunity *
                    </label>
                    <Textarea
                      data-testid="hire-form-message"
                      value={form.message}
                      onChange={update("message")}
                      rows={5}
                      placeholder="A few lines about the role, team, comp range, and what excites you about it…"
                      className="bg-white/5 border-white/10 text-white resize-none"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  data-testid="hire-form-submit"
                  disabled={busy}
                  className="mt-6 w-full h-12 bg-cyan-400 text-black hover:bg-cyan-300 font-semibold rounded-full"
                >
                  {busy ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send to Kartik
                    </>
                  )}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
