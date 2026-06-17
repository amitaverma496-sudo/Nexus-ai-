import React, { useState } from "react";
import { Activity, ShieldCheck, Mail, Send } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Footer({ onNavigate, currentPage }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4500);
  };

  return (
    <footer className="border-t border-white/10 bg-[#020205] text-[#e0e0e0] font-sans relative z-20 shrink-0">
      {/* Newsletter Panel inside the footer block with glassmorphism */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-white/10">
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md">
          {/* Neon background blur */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#BD00FF]/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#00D1FF]/10 rounded-full blur-[60px]" />

          <div className="flex-1 max-w-xl z-10">
            <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Stay synchronized with the latest intelligence updates</h4>
            <p className="text-white/40 text-xs">Join 42,000+ enterprise architects receiving sub-second vector insights, workflow guides, and system security release logs.</p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 z-10" id="newsletter-form">
            <div className="relative w-full md:w-64">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                placeholder="connor.s@neuralos.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs bg-black/60 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00D1FF] transition-all"
                id="newsletter-email-input"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#00D1FF] text-black text-xs font-bold shadow-[0_0_15px_rgba(0,209,255,0.3)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
              id="newsletter-subscribe-btn"
            >
              <span>{subscribed ? "Synchronized" : "Subscribe"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Column Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand details */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")} id="footer-logo">
            <div className="w-6 h-6 bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] rounded flex items-center justify-center shadow-[0_0_10px_rgba(0,209,255,0.3)]">
              <div className="w-2.5 h-2.5 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-md font-bold tracking-tighter text-white">NEURAL<span className="text-[#00D1FF]">OS</span></span>
          </div>
          <p className="text-white/40 text-xs leading-relaxed max-w-sm">
            NeuralOS is the unified enterprise cognition system of tomorrow. Orchestrate multi-agent grids, secure data flows, and coordinate micro-decisions via deterministic pipeline models.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-green-400 font-mono" id="footer-system-status">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></span>
            <span>ALL SYSTEMS OPERATIONAL (Uptime: 99.9999%)</span>
          </div>
        </div>

        {/* Column 2: Platform */}
        <div>
          <h5 className="text-xs uppercase font-bold text-white tracking-wider mb-4 font-mono">Platform</h5>
          <ul className="space-y-2 text-xs text-white/55">
            <li><button onClick={() => onNavigate("features")} className="hover:text-white transition-colors">Features</button></li>
            <li><button onClick={() => onNavigate("pricing")} className="hover:text-white transition-colors">Pricing</button></li>
            <li><button onClick={() => onNavigate("integrations")} className="hover:text-white transition-colors">Integrations</button></li>
            <li><button onClick={() => onNavigate("docs")} className="hover:text-white transition-colors">Documentation</button></li>
            <li><button onClick={() => onNavigate("dashboard")} className="hover:text-[#00D1FF] text-white/40 font-bold transition-colors">★ Interactive App</button></li>
          </ul>
        </div>

        {/* Column 3: Intelligence */}
        <div>
          <h5 className="text-xs uppercase font-bold text-white tracking-wider mb-4 font-mono">Intelligence</h5>
          <ul className="space-y-2 text-xs text-white/55">
            <li><button onClick={() => onNavigate("dashboard")} className="hover:text-white transition-colors">AI Sandbox</button></li>
            <li><button onClick={() => onNavigate("docs")} className="hover:text-white transition-colors">Workflow Nodes</button></li>
            <li><button onClick={() => onNavigate("features")} className="hover:text-white transition-colors">Cognition Spaces</button></li>
            <li><button onClick={() => onNavigate("dashboard")} className="hover:text-white transition-colors">Real-time Graphs</button></li>
          </ul>
        </div>

        {/* Column 4: Corporation */}
        <div>
          <h5 className="text-xs uppercase font-bold text-white tracking-wider mb-4 font-mono">Corporation</h5>
          <ul className="space-y-2 text-xs text-white/55">
            <li><button onClick={() => onNavigate("about")} className="hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => onNavigate("careers")} className="hover:text-white transition-colors">Careers</button></li>
            <li><button onClick={() => onNavigate("blog")} className="hover:text-white transition-colors">Company Blog</button></li>
            <li><button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors">Contact Expert</button></li>
          </ul>
        </div>
      </div>

      {/* Under Footer */}
      <div className="border-t border-white/5 px-6 py-6 text-[10px] uppercase tracking-widest text-white/40 bg-[#010103]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-white/40" /> SOC2 COMPLIANT</span>
            <span>Region: global-east-1</span>
            <span>API Version: stable-4.5.3</span>
          </div>
          <div className="text-center sm:text-right">
            NeuralOS © 2026. All rights preserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
