import React, { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Stats from "@/sections/Stats";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Publications from "@/sections/Publications";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import ChatWidget from "@/sections/ChatWidget";

function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  const openContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grain-overlay relative" id="top">
      <Navbar onOpenChat={() => setChatOpen(true)} />
      <Hero
        onOpenChat={() => setChatOpen(true)}
        onOpenContact={openContact}
      />
      <Stats />
      <Projects />
      <Experience />
      <Skills />
      <Publications />
      <Contact />
      <Footer />

      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0b1220",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            color: "#f8fafc",
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
