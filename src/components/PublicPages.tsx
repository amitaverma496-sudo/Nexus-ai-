import React, { useState } from "react";
import { FAQ_DATA, INTEGRATIONS, JOB_OPENINGS, BLOG_POSTS, TESTIMONIALS, TRUST_BADGES, DOC_SECTIONS } from "../data";
import { 
  Terminal, ShieldCheck, Zap, Sparkles, Code, Cpu, Orbit, ArrowUpRight, 
  HelpCircle, ChevronDown, ChevronRight, Mail, MapPin, DollarSign, Calendar, Clock, Lock, Send
} from "lucide-react";

interface PublicPagesProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onJoinBeta: () => void;
  onLoginMock: (email: string) => void;
}

export default function PublicPages({ currentPage, onNavigate, onJoinBeta, onLoginMock }: PublicPagesProps) {
  switch (currentPage) {
    case "home":
      return <HomeView onNavigate={onNavigate} onJoinBeta={onJoinBeta} />;
    case "features":
      return <FeaturesView onNavigate={onNavigate} />;
    case "pricing":
      return <PricingView onNavigate={onNavigate} onJoinBeta={onJoinBeta} />;
    case "integrations":
      return <IntegrationsView />;
    case "blog":
      return <BlogView onNavigate={onNavigate} />;
    case "careers":
      return <CareersView />;
    case "docs":
      return <DocsView />;
    case "about":
      return <AboutView />;
    case "contact":
      return <ContactView />;
    case "login":
      return <LoginView onLogin={onLoginMock} onNavigate={onNavigate} />;
    case "signup":
      return <SignupView onSignup={onLoginMock} onNavigate={onNavigate} />;
    default:
      return <div className="py-24 text-center text-white/40">Page not found</div>;
  }
}

// -------------------------------------------------------------
// 1. HOME VIEW
// -------------------------------------------------------------
function HomeView({ onNavigate, onJoinBeta }: { onNavigate: (page: string) => void; onJoinBeta: () => void }) {
  const [activeFaq, setActiveFaq] = useState<string | null>("q1");
  const [activeTab, setActiveTab] = useState<"agents" | "analytics" | "security">("agents");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="space-y-24 pb-20 relative overflow-hidden" id="home-view-container">
      {/* 3D Immersive Gradient Top */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[#3b11ff15] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-[#bd00ff0a] rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 text-center relative z-10">
        {/* Surprise mini status pill */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white/5 to-white/[0.01] border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-pulse text-xs tracking-wider uppercase text-white/70">
          <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
          <span>NeuralOS v4.5 Alpha Release Stable</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white max-w-5xl mx-auto leading-[1.05] mb-6">
          The Distributed Enterprise <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] via-[#BD00FF] to-[#00FF41]">
            Cognition Engine
          </span>
        </h1>

        <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Supercharge your workspace infrastructure with secure, high-frequency multi-agent graphs, interactive analytic channels, and integrated Gemini reasoning models.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate("dashboard")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-black font-bold shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-102 hover:shadow-[0_0_35px_rgba(189,0,255,0.4)] transition-all cursor-pointer text-sm uppercase tracking-wide"
            id="hero-go-app-btn"
          >
            Launch Interactive App
          </button>
          <button
            onClick={() => onNavigate("docs")} 
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm uppercase tracking-wide"
          >
            Read API Spec
          </button>
        </div>

        {/* Dynamic Interactive AI Core Visualizer SVG */}
        <div className="mt-16 max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00D1FF]/20 to-[#BD00FF]/25 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
          
          <div className="bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-3xl">
            <div className="bg-[#020205]/90 backdrop-blur-2xl rounded-3xl p-6 md:p-8 aspect-video flex flex-col justify-between border border-white/10 relative overflow-hidden" id="hero-interactive-demo">
              {/* Fake header overlay */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-white/40 text-[10px] uppercase font-mono ml-3">NEURAL_MONITOR://core_agent_cluster_v4</span>
                </div>
                <div className="bg-black/50 px-3 py-1 rounded border border-white/10 text-[10px] text-[#00FF41] font-mono">
                  SYNC: SUCCESS (99.8%)
                </div>
              </div>

              {/* Central Dynamic Circle Graphic */}
              <div className="flex-1 flex items-center justify-center py-6 relative">
                {/* Embedded animated graphics representing floating nodes */}
                <svg className="w-48 h-48 md:w-64 md:h-64 animate-spin-slow" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="url(#coreGrad)" strokeWidth="0.5" strokeDasharray="3 6" />
                  <circle cx="100" cy="100" r="65" fill="none" stroke="#00D1FF" strokeWidth="1" strokeDasharray="15 5 2 5" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="#BD00FF" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="15" fill="none" stroke="#00FF41" strokeWidth="1" className="animate-pulse" />
                  <defs>
                    <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00D1FF" />
                      <stop offset="100%" stopColor="#BD00FF" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute text-center">
                  <p className="text-[10px] text-white/40 tracking-widest uppercase font-mono mb-1">Grid Activity</p>
                  <p className="text-2xl font-black text-white font-mono">4.8B</p>
                  <p className="text-[9px] text-[#00D1FF] uppercase font-mono font-bold">Tokens/Sec</p>
                </div>

                {/* Floating tags */}
                <div className="absolute top-10 left-10 md:left-20 bg-white/5 border border-[#00D1FF]/40 rounded-xl p-3 backdrop-blur shadow-[0_0_15px_rgba(0,209,255,0.15)] animate-bounce text-left">
                  <div className="text-[9px] text-[#00D1FF] uppercase font-mono font-bold">Node-A Europe</div>
                  <div className="text-xs font-bold text-white">Active (99.4%)</div>
                </div>
                <div className="absolute bottom-10 right-10 md:right-20 bg-white/5 border border-[#BD00FF]/40 rounded-xl p-3 backdrop-blur shadow-[0_0_15px_rgba(189,0,255,0.15)] animate-pulse text-left">
                  <div className="text-[9px] text-[#BD00FF] uppercase font-mono font-bold">Node-B Zurich</div>
                  <div className="text-xs font-bold text-white">Synthesizing...</div>
                </div>
              </div>

              {/* Dynamic stats footer */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[11px] text-white/50 font-mono">
                <div>Model Context: 1.042M Tokens</div>
                <div className="flex gap-4">
                  <span>Temperature: 0.70</span>
                  <span>Safety: Shielded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="border-y border-white/10 bg-white/[0.01] py-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#00D1FF] font-bold">Verified Production Nodes</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs text-white/40 font-mono">
            {TRUST_BADGES.map((badge, idx) => (
              <span key={idx} className="hover:text-white transition-colors cursor-default">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Statistics Counters Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <p className="text-white/45 text-xs font-mono uppercase tracking-widest">Active Edge Instances</p>
            <p className="text-4xl font-extrabold text-[#00D1FF] mt-2 tracking-tight">8,291</p>
            <p className="text-[10px] text-zinc-500 mt-2">Instances running sub-second queries concurrently.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <p className="text-white/45 text-xs font-mono uppercase tracking-widest">Inference Latency</p>
            <p className="text-4xl font-extrabold text-[#00FF41] mt-2 tracking-tight">2.4ms</p>
            <p className="text-[10px] text-zinc-500 mt-2">Averaged over 4 billion telemetry handshakes.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <p className="text-white/45 text-xs font-mono uppercase tracking-widest">Model Success Rate</p>
            <p className="text-4xl font-extrabold text-white mt-2 tracking-tight">99.42%</p>
            <p className="text-[10px] text-zinc-500 mt-2">Zero prompt injections or bypass anomalies detected.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <p className="text-white/45 text-xs font-mono uppercase tracking-widest">Cost Reduction</p>
            <p className="text-4xl font-extrabold text-[#BD00FF] mt-2 tracking-tight">-73%</p>
            <p className="text-[10px] text-zinc-500 mt-2">Compared to static single-turn enterprise solutions.</p>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase Section with Toggle Button Highlights */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Empower users with high-fidelity control</h2>
          <p className="text-white/50 text-xs">Observe how our integrated layout adapts dynamically between execution layers.</p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("agents")}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "agents" ? "bg-[#00D1FF] text-black shadow-[0_0_15px_rgba(30,209,255,0.3)]" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
          >
            Autonomous Agents
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "analytics" ? "bg-[#BD00FF] text-white shadow-[0_0_15px_rgba(189,0,255,0.3)]" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
          >
            Real-time Analytics
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "security" ? "bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
          >
            Immersive Security
          </button>
        </div>

        {/* Tab Cards Content */}
        <div className="p-1 rounded-3xl bg-white/5 border border-white/10">
          <div className="bg-[#020205] rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {activeTab === "agents" && (
              <>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] text-white flex items-center justify-center font-bold text-xs mb-6 mb-4">
                    <Orbit className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Orchestrate Infinite Cognition Spaces</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    Each room container works dynamically to scale complex agent trees based on task priorities. Run, evaluate, and fine-tune reasoning processes natively inside sandboxed virtual environments with sub-millisecond status logging.
                  </p>
                  <ul className="space-y-3 text-xs text-white/70 font-mono">
                    <li className="flex items-center gap-2"><span className="text-[#00D1FF]">✔</span> Direct Gemini prompt schema mapping</li>
                    <li className="flex items-center gap-2"><span className="text-[#00D1FF]">✔</span> Automatic context-window scaling features</li>
                    <li className="flex items-center gap-2"><span className="text-[#00D1FF]">✔</span> Zero infrastructure configuration needed</li>
                  </ul>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-white/60 space-y-4">
                  <div className="text-[#00FF41]">// Initializing agent node...</div>
                  <div className="bg-black/40 p-3 rounded text-zinc-400">
                    {`{
  "nodeId": "EMEA-ZURICH-8",
  "status": "active",
  "pipeline": "enterprise-cognition-sync",
  "validation": "shielded-strict",
  "tokenVelocity": "4.8B tokens/sec"
}`}
                  </div>
                  <div className="text-yellow-400 animate-pulse">[!] Node successfully converged into Spanner DB clusters.</div>
                </div>
              </>
            )}

            {activeTab === "analytics" && (
              <>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#BD00FF] text-white flex items-center justify-center font-bold text-xs mb-4">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Sub-Second Interactive Revenue Streams</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    Trace enterprise workflows, dynamic account balances, and prompt resource rates seamlessly in beautiful visual graphs. Filter, customize, and export tabular databases in seconds.
                  </p>
                  <ul className="space-y-3 text-xs text-white/70 font-mono">
                    <li className="flex items-center gap-2"><span className="text-[#BD00FF]">✔</span> Real-time D3 SVG rendering algorithms</li>
                    <li className="flex items-center gap-2"><span className="text-[#BD00FF]">✔</span> Integrated cost tracing tools</li>
                    <li className="flex items-center gap-2"><span className="text-[#BD00FF]">✔</span> Fully responsive table exports</li>
                  </ul>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 h-48 flex items-end gap-2 justify-between">
                  <div className="w-1/6 bg-gradient-to-t from-[#BD00FF] to-[#00D1FF] rounded-t" style={{height: "30%"}} />
                  <div className="w-1/6 bg-gradient-to-t from-[#BD00FF] to-[#00D1FF] rounded-t animate-pulse" style={{height: "75%"}} />
                  <div className="w-1/6 bg-gradient-to-t from-[#BD00FF] to-[#00D1FF] rounded-t" style={{height: "45%"}} />
                  <div className="w-1/6 bg-gradient-to-t from-[#BD00FF] to-[#00D1FF] rounded-t animate-bounce" style={{height: "90%"}} />
                  <div className="w-1/6 bg-gradient-to-t from-[#BD00FF] to-[#00D1FF] rounded-t" style={{height: "50%"}} />
                  <div className="w-1/6 bg-gradient-to-t from-[#BD00FF] to-[#00D1FF] rounded-t" style={{height: "65%"}} />
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#00FF41] text-black flex items-center justify-center font-bold text-xs mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Prompt Interception & Anti-Bypass Guard</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    Our multi-layer proxy sanitation system detects anomalous structures dynamically, completely mitigating leakage risks without adding query execution latencies.
                  </p>
                  <ul className="space-y-3 text-xs text-white/70 font-mono">
                    <li className="flex items-center gap-2"><span className="text-[#00FF41]">✔</span> Real-time role checking gates</li>
                    <li className="flex items-center gap-2"><span className="text-[#00FF41]">✔</span> Full automated threat profiling</li>
                    <li className="flex items-center gap-2"><span className="text-[#00FF41]">✔</span> Encrypted authorization payloads</li>
                  </ul>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center bg-black/60 p-3 rounded border-l-2 border-green-500 font-mono text-[10px]">
                    <span className="text-[#00FF41]">✓ INPUT SCANNER DEPLOYED</span>
                    <span className="text-zinc-500">SAFE</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/60 p-3 rounded border-l-2 border-[#00D1FF] font-mono text-[10px] mt-2">
                    <span className="text-[#00D1FF]">✓ VPC CREDENTIALS SECURED</span>
                    <span className="text-zinc-500">AUTHORIZED</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-white/[0.01] border-y border-white/10 py-16 text-center relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xs uppercase font-mono tracking-widest text-[#00D1FF] mb-12 font-bold">Trusted by Technical Visionaries</h2>
          <div className="min-h-40 flex flex-col justify-between" id="testimonials-box">
            <p className="text-xl sm:text-2xl font-light text-white italic leading-relaxed">
              "{TESTIMONIALS[currentTestimonial].text}"
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] flex items-center justify-center font-bold text-xs text-white">
                {TESTIMONIALS[currentTestimonial].avatar}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">{TESTIMONIALS[currentTestimonial].name}</p>
                <p className="text-xs text-white/40">{TESTIMONIALS[currentTestimonial].title}</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${currentTestimonial === idx ? "bg-[#00D1FF] w-6" : "bg-white/10 hover:bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Interactive Accordions */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Got questions? We have insights.</h2>
          <p className="text-white/40 text-xs mt-2 font-mono uppercase tracking-widest">NeuralOS Technical Operations Index</p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq) => (
            <div 
              key={faq.v}
              className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === faq.v ? null : faq.v)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="font-bold text-sm text-white/90">{faq.q}</span>
                {activeFaq === faq.v ? <ChevronDown className="w-5 h-5 text-[#00D1FF]" /> : <ChevronRight className="w-5 h-5 text-white/30" />}
              </button>
              {activeFaq === faq.v && (
                <div className="px-6 pb-5 pt-1 text-xs text-white/60 leading-relaxed border-t border-white/5 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Teaser CTA */}
      <section className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="p-8 md:p-12 bg-gradient-to-tr from-[#BD00FF]/15 to-[#00D1FF]/15 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-[-20%] left-[-20%] w-[30%] h-[30%] rounded-full bg-[#00D1FF]/20 blur-[50px] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Ready to initiate your cognition platform?</h2>
          <p className="text-white/65 text-xs max-w-xl mx-auto mb-8">Deploy NeuralOS in minutes into your existing cluster or test natively inside our premium interactive sandbox.</p>
          <div className="flex flex-wrap lg:nowrap justify-center gap-4">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-6 py-3 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wide cursor-pointer w-full sm:w-auto"
            >
              Start Free Testing Space
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-xs uppercase tracking-wide hover:bg-white/10 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Contact Solutions Executive
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 2. FEATURES VIEW
// -------------------------------------------------------------
function FeaturesView({ onNavigate }: { onNavigate: (page: string) => void }) {
  const list = [
    { id: "f1", title: "Automated Cognition Networks", desc: "Build loops of self-reasoning AI agent grids. Agents write codes, assign calendar events, and update boards autonomously based on goals.", icon: Cpu, col: "#00D1FF" },
    { id: "f2", title: "Advanced Revenue Charts", desc: "Keep dynamic track of subscription revenues, token expenditures, storage usage, and system statistics with sub-second accuracy.", icon: Code, col: "#BD00FF" },
    { id: "f3", title: "Secure Local Persistence", desc: "Ensures peace of mind by backing up all system configurations, blog articles, files, and cards to durable local storage buffers.", icon: ShieldCheck, col: "#00FF41" },
    { id: "f4", title: "Global Command Shortcuts", desc: "Search through pages, change system permissions, trigger operations, and manage files dynamically via our ⌘K terminal search panel.", icon: Terminal, col: "#ff00d9" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20 relative z-10" id="features-view-container">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">Engineered to set a new standard</h1>
        <p className="text-white/50 text-sm">Every capability represents a pristine synthesis of layout, visual rhythm, and speed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all group">
              <span className="p-3 rounded-xl bg-white/5 border border-white/5 text-white inline-block mb-6 group-hover:scale-105 transition-transform" style={{ color: f.col }}>
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-white/55 text-xs leading-relaxed mb-6">{f.desc}</p>
              <button 
                onClick={() => onNavigate("docs")}
                className="text-xs text-[#00D1FF] font-mono flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Examine Code API</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. PRICING VIEW
// -------------------------------------------------------------
function PricingView({ onNavigate, onJoinBeta }: { onNavigate: (page: string) => void; onJoinBeta: () => void }) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter Sandbox",
      price: billingPeriod === "monthly" ? "0" : "0",
      desc: "For technical creators seeking to prototype and automate simple agent workloads.",
      features: [
        "1 Personal Workspace Layer",
        "Up to 5 Synchronized Kanban Tasks",
        "Standard Gemini-3.5-flash prompts",
        "Transient LocalState storage backup",
        "2.4ms System Latency testing"
      ],
      popular: false,
      btn: "Launch Free",
      action: () => onNavigate("dashboard")
    },
    {
      name: "Cognitive Grid Pro",
      price: billingPeriod === "monthly" ? "79" : "64",
      desc: "For rapid growth products scaling real-time calendars, analytics, and automation grids.",
      features: [
        "Unlimited Workspace Layers",
        "Full Real-time Charts & File Management",
        "Advanced Gemini reasoning options",
        "Continuous LocalStorage state persistence",
        "Automated Workspace & Slack updates",
        "Direct API Integration options"
      ],
      popular: true,
      btn: "Initiate Pro Flow",
      action: () => onNavigate("dashboard")
    },
    {
      name: "Enterprise Core",
      price: "Custom",
      desc: "For heavy regulatory security and massive token throughput scaling pipelines.",
      features: [
        "Custom Spanner Clusters & VPC gateways",
        "Dedicated rate-limits with absolute priority",
        "SOC2 direct compliance certificate mapping",
        "99.9999% Service Level Agreements",
        "Custom agent-to-agent compiler hooks",
        "24/7 dedicated solutions engineers"
      ],
      popular: false,
      btn: "Contact Solutions",
      action: () => onNavigate("contact")
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative z-10" id="pricing-view-container">
      {/* Glow Blur points */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">Fair plans for massive ambitions</h1>
        <p className="text-white/50 text-sm mb-8">Choose a flexible rate calculated carefully based on your active grid requirements.</p>

        {/* Pricing Toggle */}
        <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1" id="pricing-billing-toggle">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${billingPeriod === "monthly" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
          >
            Monthly Rate
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${billingPeriod === "yearly" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
          >
            Yearly Rate (-20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((p, idx) => (
          <div 
            key={idx} 
            className={`bg-white/[0.02] border rounded-2xl p-8 flex flex-col justify-between transition-all relative ${p.popular ? "border-[#00D1FF]/50 shadow-[0_0_30px_rgba(30,209,255,0.15)] bg-[#020205] scale-102" : "border-white/10 hover:border-white/20"}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00D1FF] text-black font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                Most Synchronized
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-zinc-500 text-xs mb-6 leading-relaxed">{p.desc}</p>
              
              <div className="flex items-baseline gap-1.5 mb-8">
                {p.price !== "Custom" && <span className="text-sm font-semibold text-white/50">$</span>}
                <span className="text-4xl font-extrabold text-white tracking-tight">{p.price}</span>
                {p.price !== "Custom" && <span className="text-white/40 text-xs text-zinc-500 font-mono">/ {billingPeriod === "monthly" ? "mo" : "yr"}</span>}
              </div>

              <div className="space-y-3.5 mb-8">
                {p.features.map((f, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-white/70">
                    <span className="text-[#00D1FF]" id={`feature-check-${idx}-${fIdx}`}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={p.action}
              className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${p.popular ? "bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-black shadow-[0_0_20px_rgba(30,209,255,0.3)] hover:brightness-110" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}
            >
              {p.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. INTEGRATIONS VIEW
// -------------------------------------------------------------
function IntegrationsView() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", "cloud", "collaboration", "analytics", "security"];

  const filtered = filter === "all" ? INTEGRATIONS : INTEGRATIONS.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 relative z-10" id="integrations-view-container">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-4">Synchronized with your complete stack</h1>
        <p className="text-white/50 text-xs">Instantly bridge cloud platforms, communication engines, and logging pipelines natively.</p>
      </div>

      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${filter === cat ? "bg-white text-black" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((it) => (
          <div key={it.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 rounded-xl flex items-center justify-center font-bold text-white text-sm">
                  {it.avatar}
                </div>
                <span className={`px-2.5 py-1 rounded text-[9px] uppercase font-mono font-bold tracking-wider ${it.connected ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"}`}>
                  {it.connected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <h3 className="text-md font-bold text-white mb-2">{it.name}</h3>
              <p className="text-white/50 text-xs leading-relaxed mb-6">{it.description}</p>
            </div>
            <button className={`w-full py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${it.connected ? "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}>
              {it.connected ? "Disconnect Connector" : "Authorize Scope"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. BLOG VIEW
// -------------------------------------------------------------
function BlogView({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  if (selectedPost) {
    const post = BLOG_POSTS.find(p => p.slug === selectedPost);
    if (!post) return null;
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8 relative z-10">
        <button 
          onClick={() => setSelectedPost(null)}
          className="text-xs text-[#00D1FF] font-mono flex items-center gap-2 hover:underline cursor-pointer"
        >
          <span>← Back to compilation log</span>
        </button>

        <div className="space-y-4">
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#BD00FF] uppercase font-bold tracking-wider font-mono">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-3 pt-4">
            <div className="w-9 h-9 rounded-full bg-[#00D1FF] text-black font-bold flex items-center justify-center text-xs">
              {post.authorAvatar}
            </div>
            <div>
              <p className="text-xs font-bold text-white">{post.author}</p>
              <p className="text-[10px] text-white/40">{post.authorTitle} • {post.publishedAt}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-white/70 text-sm leading-relaxed space-y-6">
          <p>{post.content}</p>
          <p>
            To continue receiving comprehensive architectures on scalable agentic loops, prompt security rules, and clean vector search configurations, consider subscribing to our main newsletter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 relative z-10" id="blog-view-container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-4">The NeuralOS Engineering Journal</h1>
        <p className="text-white/50 text-xs">Deep, rigorous, and technical investigations into decentralized computing structures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div 
            key={post.id} 
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/[0.04] transition-colors group cursor-pointer"
            onClick={() => setSelectedPost(post.slug)}
          >
            <div>
              <span className="text-[9px] font-mono text-[#00D1FF] uppercase font-bold mb-4 block tracking-widest">{post.category} • {post.readTime}</span>
              <h3 className="text-md font-bold text-white group-hover:text-[#00D1FF] transition-colors mb-2 leading-snug">{post.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white">
                {post.authorAvatar}
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">{post.author}</p>
                <p className="text-[9px] text-[#00FF41] font-mono">{post.publishedAt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. CAREERS VIEW
// -------------------------------------------------------------
function CareersView() {
  const [successApply, setSuccessApply] = useState<string | null>(null);

  const handleApplySimulated = (id: string) => {
    setSuccessApply(id);
    setTimeout(() => setSuccessApply(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 relative z-10" id="careers-view-container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-4">Formulate tomorrow's cognitive stack</h1>
        <p className="text-white/50 text-xs">We analyze talent recursively. No trivia, no busywork — only immaculate engineering craft.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {JOB_OPENINGS.map((job) => (
          <div key={job.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="bg-white/5 px-2.5 py-0.5 rounded border border-white/10 text-[#00D1FF] uppercase font-bold">{job.department}</span>
                <span className="bg-white/5 px-2.5 py-0.5 rounded border border-white/10 text-white/50">{job.location}</span>
                <span className="bg-white/5 px-2.5 py-0.5 rounded border border-white/10 text-[#00FF41]">{job.salary}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{job.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{job.description}</p>
            </div>
            
            <button
              onClick={() => handleApplySimulated(job.id)}
              disabled={successApply === job.id}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${successApply === job.id ? "bg-green-500 text-black shadow-[0_0_15px_rgba(30,255,65,0.3)]" : "bg-[#00D1FF] text-black hover:brightness-110 shadow-[0_0_15px_rgba(30,209,255,0.3)]"}`}
            >
              {successApply === job.id ? "Application Sent" : "Process Application"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. DOCS VIEW
// -------------------------------------------------------------
function DocsView() {
  const [activeDoc, setActiveDoc] = useState<string>("doc1");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10" id="docs-view-container">
      {/* Sidebar navigation */}
      <aside className="space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4 px-3 font-bold">API / CORE SCHEMAS</p>
        {DOC_SECTIONS.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setActiveDoc(doc.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${activeDoc === doc.id ? "bg-white/5 border-white/10 text-[#00D1FF]" : "border-transparent text-white/60 hover:text-white"}`}
          >
            {doc.title}
          </button>
        ))}
      </aside>

      {/* Primary reading zone */}
      <section className="lg:col-span-3 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        {(() => {
          const doc = DOC_SECTIONS.find(d => d.id === activeDoc);
          if (!doc) return null;
          return (
            <div className="space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#BD00FF] font-bold">Category: {doc.category.toUpperCase().replace("_", " ")}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{doc.title}</h2>
              <div className="text-xs text-white/70 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                {doc.content}
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// 8. ABOUT VIEW
// -------------------------------------------------------------
function AboutView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 relative z-10" id="about-view-container">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2">Unified Enterprise Cognition</h1>
        <p className="text-[#00D1FF] font-mono text-xs uppercase tracking-widest">ABOUT NEURALOS INC</p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 text-xs text-white/70 leading-relaxed space-y-6">
        <p>
          Founded in the spring of 2026, NeuralOS was chartered to solve a vital bottleneck: Generative systems are highly capable, but integrating them safely into visual user interfaces, workflows, and database layers is complex.
        </p>
        <p>
          Our team, led by Amit Verma, crafts beautiful visual environments and robust Express server runtimes to completely eliminate boilerplate integrations. We maintain strict SOC2 security baselines, zero context overflows, and pristine layouts on any terminal desktop frame.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/10 text-white font-mono text-[11px]">
          <div>
            <p className="text-zinc-500 uppercase tracking-wider mb-1">Corporate HQ</p>
            <p className="text-white">San Francisco, California</p>
          </div>
          <div>
            <p className="text-zinc-500 uppercase tracking-wider mb-1">Audit Status</p>
            <p className="text-[#00FF41]">SUCCESSFULLY COMPLIANT (SOC 2 Type II)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. CONTACT VIEW
// -------------------------------------------------------------
function ContactView() {
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", query: "" });
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16 space-y-10 relative z-10" id="contact-view-container">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2">Contact our intelligence executives</h1>
        <p className="text-white/45 text-xs">Have dynamic custom cluster needs? Let's connect.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4" id="contact-query-form">
        <div>
          <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00D1FF] mb-2 font-bold">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00D1FF] transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00D1FF] mb-2 font-bold">Business Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00D1FF] transition-all"
            placeholder="doe.j@company.io"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00D1FF] mb-2 font-bold">Core Execution Request</label>
          <textarea
            required
            rows={4}
            value={formData.query}
            onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            className="w-full px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00D1FF] transition-all resize-none"
            placeholder="Outline your active VM cluster size or requested custom capabilities..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(30,209,255,0.3)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
          id="contact-query-submit-btn"
        >
          {isSent ? "Query Synced Successfully" : "Send Safe Transmission"}
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 10. LOGIN VIEW
// -------------------------------------------------------------
function LoginView({ onLogin, onNavigate }: { onLogin: (email: string) => void; onNavigate: (page: string) => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 relative z-10" id="login-view-container">
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 text-center">
        <div className="flex items-center justify-center gap-2 justify-center mb-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] rounded-lg flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">NEURAL<span className="text-[#00D1FF]">OS</span></span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Access your intelligence Core</h2>
          <p className="text-white/40 text-xs mt-1">Enter your credentials or authenticate via active services.</p>
        </div>

        {/* Mock OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onLogin("amitaverma496@gmail.com")}
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            id="google-login-btn"
          >
            <span>Google Core</span>
          </button>
          <button
            onClick={() => onLogin("connor.s@neuralos.net")}
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            id="github-login-btn"
          >
            <span>GitHub Core</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-white/20 select-none">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-[10px] font-mono tracking-widest">OR</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-zinc-500 mb-1.5 font-bold">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D1FF] transition-all"
              placeholder="amitaverma496@gmail.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="block text-[9px] uppercase font-mono tracking-wider text-zinc-500 font-bold">Security Token / Password</label>
              <button type="button" className="text-[9px] text-[#00D1FF] hover:underline cursor-pointer">Forgot token?</button>
            </div>
            <input
              type="password"
              className="w-full px-4 py-2.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D1FF] transition-all"
              placeholder="••••••••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#00D1FF] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(30,209,255,0.25)] transition-all cursor-pointer"
            id="email-login-submit-btn"
          >
            Authenticate User
          </button>
        </form>

        <p className="text-xs text-white/40">
          No active clearance profile?{" "}
          <button onClick={() => onNavigate("signup")} className="text-[#00D1FF] font-bold hover:underline cursor-pointer">Sign up here</button>
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. SIGNUP VIEW
// -------------------------------------------------------------
function SignupView({ onSignup, onNavigate }: { onSignup: (email: string) => void; onNavigate: (page: string) => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSignup(email);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 relative z-10" id="signup-view-container">
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 text-center">
        <div className="flex items-center justify-center gap-2 justify-center mb-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#00D1FF] to-[#BD00FF] rounded-lg flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">NEURAL<span className="text-[#00D1FF]">OS</span></span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Register Clearance Profile</h2>
          <p className="text-white/40 text-xs mt-1">Boot up a new enterprise workspace container in seconds.</p>
        </div>

        {/* Mock OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSignup("amitaverma496@gmail.com")}
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Google Link</span>
          </button>
          <button
            onClick={() => onSignup("connor.s@neuralos.net")}
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>GitHub Link</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-white/20 select-none">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-[10px] font-mono tracking-widest">OR REGISTER EMAIL</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-zinc-500 mb-1.5 font-bold">Clearing Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D1FF] transition-all"
              placeholder="doe.j@workspace.net"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-zinc-500 mb-1.5 font-bold">Secure Access Token</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 text-xs bg-black/60 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D1FF] transition-all"
              placeholder="••••••••••••••"
            />
          </div>
          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" required className="mt-1" defaultChecked />
            <span className="text-[10px] text-white/40 leading-normal">
              I authorize the NeuralOS kernel terms, dynamic tracking rules, and SOC2 local storage caches.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#BD00FF] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(30,209,255,0.25)] transition-all cursor-pointer"
            id="email-signup-submit-btn"
          >
            Initiate Profile Register
          </button>
        </form>

        <p className="text-xs text-white/40">
          Already have verified clearance?{" "}
          <button onClick={() => onNavigate("login")} className="text-[#00D1FF] font-bold hover:underline cursor-pointer">Log in here</button>
        </p>
      </div>
    </div>
  );
}
