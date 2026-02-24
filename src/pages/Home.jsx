import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cpu, Briefcase, BarChart3, Brain, Layers, ShieldCheck,
  HeartHandshake, ArrowRight, Users, TrendingUp, Award, DollarSign,
} from "lucide-react";
import { courses } from "../data/coursesData";

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const highlightColors = [
    "text-cyan-400","text-blue-400","text-purple-400",
    "text-pink-400","text-green-400","text-yellow-400",
  ];

  const heroBg =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop";

  const iconMap = {
    "AI in FinTech": <Cpu className="w-6 h-6" />,
    "Product Leadership": <Briefcase className="w-6 h-6" />,
    "Data Analytics, GenAI & Business Intelligence": <Brain className="w-6 h-6" />,
    "Technology & Digital Transformation": <Layers className="w-6 h-6" />,
    "Integrated Courses": <BarChart3 className="w-6 h-6" />,
    "Cybersecurity": <ShieldCheck className="w-6 h-6" />,
    "Mental Health & Social Wellness": <HeartHandshake className="w-6 h-6" />,
  };

  useEffect(() => {
    const id = setInterval(() => setColorIndex(p => (p + 1) % highlightColors.length), 2000);
    return () => clearInterval(id);
  }, []);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActiveSlide(p => (p + 1) % 4), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .hero-track {
          display: flex;
          width: 400%;
          height: 100%;
          transition: transform 0.85s cubic-bezier(0.77,0,0.18,1);
        }
        .hero-track.slide-0 { transform: translateX(0%); }
        .hero-track.slide-1 { transform: translateX(-25%); }
        .hero-track.slide-2 { transform: translateX(-50%); }
        .hero-track.slide-3 { transform: translateX(-75%); }
        .hero-panel {
          width: 25%;
          flex-shrink: 0;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .slide-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          cursor: pointer; transition: all 0.3s; border: none;
        }
        .slide-dot.active { background:#fff; width:24px; border-radius:4px; }

        /* Stat cards – match Program card hover style from Panel 0 */
        .stat-card {
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          backdrop-filter: blur(12px);
        }
        .stat-card:hover {
          transform: translateY(-6px);
          background: rgba(255,107,0,0.10);
          border-color: rgba(255,107,0,0.45);
          box-shadow: 0 16px 48px rgba(255,107,0,0.18);
        }

        .pillar-card {
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(12px);
        }
        .pillar-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,169,157,0.15);
          border-color: rgba(0,169,157,0.50);
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.55s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.55s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.55s 0.25s ease both; }
        .fade-up-4 { animation: fadeUp 0.55s 0.35s ease both; }
        .fade-up-5 { animation: fadeUp 0.55s 0.45s ease both; }

        .india-stripe {
          position: absolute;
          top: 0; left: 0;
          width: 5px;
          height: 100%;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }
        .india-stripe div { flex: 1; }

        .badge-label {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,107,0,0.85);
        }

        /* scrolling logos strip */
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-container { animation: scroll-left 28s linear infinite; }
        .scroll-container:hover { animation-play-state: paused; }
      `}</style>

      {/* ── HERO SLIDER ── */}
      <div
        className="relative w-full overflow-hidden text-white"
        style={{ height: "100vh", background: "#0a1628" }}
      >
        <div className={`hero-track slide-${activeSlide}`}>

          {/* ══════════ PANEL 0 — Main Hero ══════════ */}
          <div className="hero-panel">
            {/* Panel 0 own background */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,10,30,0.45) 0%, rgba(10,22,40,0.40) 50%, rgba(5,10,30,0.45) 100%)" }} />
            <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="text-center w-full max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl px-4 mb-6">
                  Transform Your Career with Elite Industry Programs
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-6 drop-shadow-lg">
                  Designed by Seasoned Business Professionals
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-8">
                  Gain real-world skills through{" "}
                  <span className={`font-bold ${highlightColors[colorIndex]} transition-colors duration-500`}>
                    70% hands-on learning
                  </span>{" "}
                  programs crafted by 22+{" "}
                  <span className="font-semibold text-cyan-300">industry veterans</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                  <Link
                    to="/academic"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
                  >
                    Explore Programs <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════ PANEL 1 — India Future Leaders (REDESIGNED) ══════════ */}
          <div className="hero-panel">
            {/* Panel 1 OWN background — solid dark navy, completely independent */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 40%, #0d1f3c 70%, #060d1f 100%)" }} />

            {/* Indian flag stripe */}
            <div className="india-stripe">
              <div style={{ background: "#FF6B00" }} />
              <div style={{ background: "rgba(255,255,255,0.15)" }} />
              <div style={{ background: "#138808" }} />
            </div>

            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 15% 55%, rgba(255,107,0,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 25%, rgba(0,169,157,0.10) 0%, transparent 50%)",
              }}
            />
            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* CONTENT — same vertical centering as Panel 0 */}
            <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <div className="w-full max-w-5xl mx-auto text-center">

                {/* Eye-brow badge */}
                <div className="flex items-center justify-center gap-2 mb-5 fade-up-1">
                  <span className="badge-label">🇮🇳 Upskillize</span>
                  <span
                    className="px-3 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(255,107,0,0.18)",
                      border: "1px solid rgba(255,107,0,0.40)",
                      color: "#FF6B00",
                      letterSpacing: "1px",
                    }}
                  >
                    India-First · NEP 2020 Aligned
                  </span>
                </div>

                {/* Hero headline — same size family as Panel 0 */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl mb-4 fade-up-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Where India's Future Leaders{" "}
                  <em style={{ color: "#FF6B00", fontStyle: "italic" }}>Are Made.</em>
                </h1>

                {/* Sub-headline */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 fade-up-3">
                  Real regulatory knowledge, expert mentors &amp;{" "}
                  <span className="font-semibold text-cyan-300">a community for life</span> —
                  built for the era of{" "}
                  <span className="font-bold text-orange-400">India 3.0</span>
                </p>

                {/* Pillar cards — 4 columns, same card-hover pattern as program cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 fade-up-4">
                  {[
                    {
                      accent: "#FF6B00",
                      icon: "🏦",
                      name: "RBI",
                      tag: "Banking",
                      desc: "DPDPA compliance, cyber frameworks & Innovation Hub",
                    },
                    {
                      accent: "#00A99D",
                      icon: "🛡️",
                      name: "IRDAI",
                      tag: "Insurance",
                      desc: "ML risk pricing & InsurTech sandbox — live",
                    },
                    {
                      accent: "#a78bfa",
                      icon: "📊",
                      name: "SEBI",
                      tag: "Governance",
                      desc: "Algo trading & capital-market risk frameworks",
                    },
                    {
                      accent: "#F5A623",
                      icon: "🚀",
                      name: "India 3.0",
                      tag: "AI & Products",
                      desc: "AI-native product leaders — most sought-after",
                    },
                  ].map(({ accent, icon, name, tag, desc }) => (
                    <div
                      key={name}
                      className="pillar-card p-5 text-left"
                      style={{ borderTopColor: accent, borderTopWidth: "2px" }}
                    >
                      <div className="text-3xl mb-3">{icon}</div>
                      <div
                        className="text-base font-bold mb-0.5"
                        style={{ color: accent }}
                      >
                        {name}
                      </div>
                      <div
                        className="text-xs uppercase mb-2"
                        style={{ color: `${accent}99`, letterSpacing: "1.5px" }}
                      >
                        {tag}
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Stats row + CTAs — same row layout as Panel 0 */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 fade-up-5">
                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/academic"
                      className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
                      style={{
                        background: "linear-gradient(135deg,#FF6B00,#F5A623)",
                        boxShadow: "0 6px 24px rgba(255,107,0,0.40)",
                      }}
                    >
                      Start Your Journey <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/academic"
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl"
                    >
                      Explore Programs
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 sm:gap-8">
                    {[
                      { num: "₹10,372 Cr", lbl: "IndiaAI Budget" },
                      { num: "43.76%",     lbl: "AI CAGR India" },
                      { num: "22+",        lbl: "Industry Mentors" },
                    ].map(({ num, lbl }) => (
                      <div key={lbl} className="text-center">
                        <div
                          className="text-2xl font-extrabold"
                          style={{ color: "#F5A623" }}
                        >
                          {num}
                        </div>
                        <div
                          className="text-xs uppercase mt-0.5"
                          style={{ letterSpacing: "1px", color: "rgba(255,255,255,0.45)" }}
                        >
                          {lbl}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* END PANEL 1 */}

          {/* ══════════ PANEL 2 — Business Consulting ══════════ */}
          <div className="hero-panel">
            {/* Panel 2 own background — business consulting photo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop)` }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,5,40,0.82) 0%, rgba(20,10,60,0.78) 50%, rgba(10,5,40,0.82) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 25%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 25% 75%, rgba(139,92,246,0.14) 0%, transparent 50%)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-15" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

            <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <div className="w-full max-w-5xl mx-auto text-center">

                {/* Badge */}
                <div className="flex items-center justify-center gap-2 mb-5 fade-up-1">
                  <span className="badge-label" style={{ color: "rgba(139,92,246,0.9)" }}>💼 Upskillize</span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.40)", color: "#818cf8", letterSpacing: "1px" }}>
                    Enterprise · Strategy · Growth
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl mb-4 fade-up-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Expert Business{" "}
                  <em style={{ color: "#818cf8", fontStyle: "italic" }}>Consulting</em>{" "}
                  That Drives Results.
                </h1>

                {/* Sub-headline */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 fade-up-3">
                  From <span className="font-semibold text-purple-300">AI strategy</span> to{" "}
                  <span className="font-semibold text-indigo-300">FinTech compliance</span> — we transform your business with proven frameworks and industry veterans.
                </p>

                {/* Service cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 fade-up-4">
                  {[
                    { accent: "#818cf8", icon: "🤖", name: "AI Strategy", desc: "Roadmaps for AI adoption & intelligent automation" },
                    { accent: "#a78bfa", icon: "💳", name: "FinTech", desc: "Digital payments, blockchain & neo-banking" },
                    { accent: "#c084fc", icon: "📊", name: "Product Strategy", desc: "Market-leading products from ideation to launch" },
                    { accent: "#60a5fa", icon: "🛡️", name: "Cybersecurity", desc: "Security frameworks & threat intelligence" },
                    { accent: "#34d399", icon: "📈", name: "Data & BI", desc: "Actionable insights with GenAI integration" },
                    { accent: "#f472b6", icon: "⚙️", name: "Process Ops", desc: "Lean methodologies & intelligent automation" },
                  ].map(({ accent, icon, name, desc }) => (
                    <div key={name} className="pillar-card p-4 text-left" style={{ borderTopColor: accent, borderTopWidth: "2px" }}>
                      <div className="text-2xl mb-2">{icon}</div>
                      <div className="text-sm font-bold mb-1" style={{ color: accent }}>{name}</div>
                      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs + Stats */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 fade-up-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/corporate/consulting" className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 6px 24px rgba(99,102,241,0.40)" }}>
                      Explore Consulting <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl">
                      Book a Call
                    </Link>
                  </div>
                  <div className="flex gap-6 sm:gap-8">
                    {[{ num: "6+", lbl: "Service Areas" }, { num: "22+", lbl: "Consultants" }, { num: "100+", lbl: "Projects Done" }].map(({ num, lbl }) => (
                      <div key={lbl} className="text-center">
                        <div className="text-2xl font-extrabold" style={{ color: "#a78bfa" }}>{num}</div>
                        <div className="text-xs uppercase mt-0.5" style={{ letterSpacing: "1px", color: "rgba(255,255,255,0.45)" }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* END PANEL 2 */}

          {/* ══════════ PANEL 3 — Corporate Training ══════════ */}
          <div className="hero-panel">
            {/* Panel 3 own background — corporate training photo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop)` }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,20,15,0.82) 0%, rgba(5,30,20,0.78) 50%, rgba(5,20,15,0.82) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 25%, rgba(6,182,212,0.15) 0%, transparent 55%), radial-gradient(ellipse at 25% 75%, rgba(16,185,129,0.12) 0%, transparent 50%)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-15" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

            <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <div className="w-full max-w-5xl mx-auto text-center">

                {/* Badge */}
                <div className="flex items-center justify-center gap-2 mb-5 fade-up-1">
                  <span className="badge-label" style={{ color: "rgba(16,185,129,0.9)" }}>🎯 Upskillize</span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(16,185,129,0.18)", border: "1px solid rgba(16,185,129,0.40)", color: "#34d399", letterSpacing: "1px" }}>
                    Workforce · Upskilling · ROI
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl mb-4 fade-up-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Strategic Corporate{" "}
                  <em style={{ color: "#34d399", fontStyle: "italic" }}>Training</em>{" "}
                  Programs.
                </h1>

                {/* Sub-headline */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 fade-up-3">
                  Bridge skill gaps with the proven{" "}
                  <span className="font-semibold text-emerald-300">ADDIE methodology</span> — transforming knowledge into{" "}
                  <span className="font-semibold text-cyan-300">measurable business impact.</span>
                </p>

                {/* Training cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 fade-up-4">
                  {[
                    { accent: "#34d399", icon: "🏦", name: "BFSI", desc: "Banking, FinTech & insurance domain training" },
                    { accent: "#22d3ee", icon: "🤖", name: "AI & GenAI", desc: "AI product management & GenAI for business" },
                    { accent: "#a3e635", icon: "📊", name: "Analytics", desc: "Data analytics & business intelligence" },
                    { accent: "#fb923c", icon: "🚀", name: "Leadership", desc: "Product leadership & management excellence" },
                  ].map(({ accent, icon, name, desc }) => (
                    <div key={name} className="pillar-card p-5 text-left" style={{ borderTopColor: accent, borderTopWidth: "2px" }}>
                      <div className="text-3xl mb-3">{icon}</div>
                      <div className="text-base font-bold mb-1" style={{ color: accent }}>{name}</div>
                      <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs + Stats */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 fade-up-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/corporate/training" className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform" style={{ background: "linear-gradient(135deg,#059669,#0891b2)", boxShadow: "0 6px 24px rgba(16,185,129,0.40)" }}>
                      Explore Training <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl">
                      Get a Demo
                    </Link>
                  </div>
                  <div className="flex gap-6 sm:gap-8">
                    {[{ num: "85%", lbl: "Skill Improvement" }, { num: "90%", lbl: "Satisfaction Rate" }, { num: "70%", lbl: "Retention Rate" }].map(({ num, lbl }) => (
                      <div key={lbl} className="text-center">
                        <div className="text-2xl font-extrabold" style={{ color: "#34d399" }}>{num}</div>
                        <div className="text-xs uppercase mt-0.5" style={{ letterSpacing: "1px", color: "rgba(255,255,255,0.45)" }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* END PANEL 3 */}

        </div>
        {/* END TRACK */}

        {/* Dots — pause on hover */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {[0, 1, 2, 3].map(i => (
            <button
              key={i}
              className={`slide-dot ${activeSlide === i ? "active" : ""}`}
              onClick={() => setActiveSlide(i)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows — hidden, only appear on hero hover */}
        <button
          onClick={() => setActiveSlide(p => (p === 0 ? 3 : p - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all duration-300 opacity-0 hover:bg-white/25"
          style={{ pointerEvents: "none" }}
          aria-label="Previous"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActiveSlide(p => (p === 3 ? 0 : p + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all duration-300 opacity-0 hover:bg-white/25"
          style={{ pointerEvents: "none" }}
          aria-label="Next"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
      {/* END HERO */}

      {/* STATS SECTION */}
      <section className="py-16 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "70%", label: "Hands-On Learning", icon: <TrendingUp className="w-8 h-8" /> },
              { value: "22+", label: "Industry Veterans", icon: <Users className="w-8 h-8" /> },
              { value: "100+", label: "Industry Projects", icon: <BarChart3 className="w-8 h-8" /> },
              { value: "100%", label: "Industry-Validated", icon: <Award className="w-8 h-8" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4 text-cyan-400">{stat.icon}</div>
                <h3 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">{stat.value}</h3>
                <p className="text-gray-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="py-16 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Industry-Focused Programs</h2>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">Specialized programs aligned with real-world industry demands</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((category, index) => {
              const availablePrograms = category.subCourses.filter(course =>
                course.hasDetailPage === true ||
                ['bfsi-domain-excellence-program', 'investment-banking-wealth-tech', 'risk-management-regtech-program',
                 'ai-product-management-mastery', 'the-mini-ceo-program', 'data-decisions',
                 'mba-plus-plus', 'ai-ml-business-leaders', 'digital-business-strategy-innovation'].includes(course.slug)
              );
              const hasContent = availablePrograms.length > 0;
              const isLastItem = index === courses.length - 1;
              const shouldCenter = isLastItem && courses.length % 3 === 1;
              return (
                <div key={category.id} className={`bg-[#1e2d4a] rounded-xl shadow-md overflow-hidden border border-gray-700/50 group transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(96,165,250,0.2)] hover:border-blue-400 ${shouldCenter ? 'lg:col-start-2' : ''}`}>
                  <div className={`p-6 bg-gradient-to-r ${category.color} text-white flex items-center gap-4`}>
                    <div className="flex-shrink-0">{iconMap[category.mainCategory] || <Layers className="w-6 h-6" />}</div>
                    <h3 className="text-xl font-bold">{category.mainCategory}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-4 min-h-[60px]">{category.shortDesc}</p>
                    {hasContent ? (
                      <Link to={`/courses/${category.slug}`} className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 group-hover:gap-3 transition-all">
                        View Programs <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : category.slug === 'mental-health-social-wellness' ? (
                      <Link to="/course/corporate-readiness-program" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 group-hover:gap-3 transition-all">
                        View Programs <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">Coming Soon</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONSULTING SERVICES */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wider uppercase">Enterprise Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Corporate Consulting Services</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Transform your business with expert consulting across digital transformation, FinTech, product strategy, and cybersecurity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: <Cpu className="w-8 h-8" />, title: "AI & Digital Transformation", description: "Accelerate innovation with AI strategy, machine learning, and intelligent automation solutions.", color: "from-indigo-500 to-purple-500", borderColor: "border-indigo-500/30 hover:border-indigo-400/60" },
              { icon: <Briefcase className="w-8 h-8" />, title: "FinTech Consulting", description: "Expert guidance on digital payments, blockchain, neo-banking, and regulatory compliance.", color: "from-purple-500 to-pink-500", borderColor: "border-purple-500/30 hover:border-purple-400/60" },
              { icon: <BarChart3 className="w-8 h-8" />, title: "Product Strategy", description: "Build market-leading products from ideation to launch with proven frameworks.", color: "from-cyan-500 to-blue-500", borderColor: "border-cyan-500/30 hover:border-cyan-400/60" },
              { icon: <Brain className="w-8 h-8" />, title: "Data Analytics & BI", description: "Transform data into actionable insights with advanced analytics and GenAI integration.", color: "from-emerald-500 to-teal-500", borderColor: "border-emerald-500/30 hover:border-emerald-400/60" },
              { icon: <Layers className="w-8 h-8" />, title: "Process Optimization", description: "Streamline operations with lean methodologies and intelligent automation.", color: "from-orange-500 to-red-500", borderColor: "border-orange-500/30 hover:border-orange-400/60" },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Cyber Security", description: "Protect your organization with comprehensive security frameworks and threat intelligence.", color: "from-pink-500 to-rose-500", borderColor: "border-pink-500/30 hover:border-pink-400/60" },
            ].map((service, index) => (
              <div key={index} className={`bg-gradient-to-br from-[#1e2d4a] to-[#2a3f5f] rounded-xl p-6 border ${service.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}>
                <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/corporate-consulting" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform">
              Explore All Consulting Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CORPORATE TRAINING */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wider uppercase">🎯 Workforce Transformation</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">Strategic Corporate Training Programs</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">Bridge critical skill gaps and drive behavioral change through proven ADDIE methodology—transforming knowledge into measurable business impact</p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "📊", text: "70:20:10 learning model with hands-on practice", color: "from-cyan-500 to-blue-500" },
                  { icon: "🎓", text: "22+ industry veterans with 500+ years experience", color: "from-purple-500 to-pink-500" },
                  { icon: "🚀", text: "BFSI, AI Product Management, GenAI & Analytics", color: "from-emerald-500 to-teal-500" },
                  { icon: "📈", text: "Performance tracking with measurable ROI", color: "from-orange-500 to-red-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <p className="text-gray-200 text-lg pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link to="/corporate/training" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform">
                Explore Training Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "85%", label: "Skill Improvement", gradient: "from-cyan-500 to-blue-500" },
                { value: "60%", label: "Productivity Boost", gradient: "from-purple-500 to-pink-500" },
                { value: "90%", label: "Satisfaction Rate", gradient: "from-emerald-500 to-teal-500" },
                { value: "70%", label: "Retention Rate", gradient: "from-orange-500 to-red-500" },
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                  <div className={`text-6xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4`}>{stat.value}</div>
                  <div className="text-gray-300 font-semibold text-lg">{stat.label}</div>
                  <div className={`h-1 w-16 bg-gradient-to-r ${stat.gradient} rounded-full mt-4 group-hover:w-full transition-all duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAAS PRODUCTS */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-blue-400 font-semibold tracking-wider uppercase">Enterprise SaaS Solutions</p>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100 mb-6">AI-Powered Business Platforms</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Transform your operations with intelligent automation, compliance management, and cost optimization</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { to: "/products/optimize", icon: <DollarSign className="w-8 h-8 text-white" />, grad: "from-blue-500 to-cyan-500", border: "border-blue-500/20 hover:border-blue-400/60", glowShadow: "hover:shadow-blue-500/20", badge: "COST OPTIMIZATION", badgeCls: "bg-blue-500/20 text-blue-400", title: "Optimize", hoverTitle: "group-hover:text-blue-300", statCls: "text-blue-400", stat: "20-30%", statLbl: "Cost Reduction", desc: "AI-powered cost allocation platform that identifies unit costs, analyzes inefficiencies, and optimizes vendor selection—delivering 20-30% cost reduction while maintaining quality.", features: [{ icon: "📊", text: "Activity-Based Costing (ABC)" }, { icon: "🤖", text: "Vendor Intelligence Engine" }, { icon: "📈", text: "Real-time Cost Analytics" }] },
              { to: "/products/vendorize", icon: <ShieldCheck className="w-8 h-8 text-white" />, grad: "from-cyan-500 to-blue-500", border: "border-cyan-500/20 hover:border-cyan-400/60", glowShadow: "hover:shadow-cyan-500/20", badge: "RISK MANAGEMENT", badgeCls: "bg-cyan-500/20 text-cyan-400", title: "Vendorize", hoverTitle: "group-hover:text-cyan-300", statCls: "text-cyan-400", stat: "85%", statLbl: "Time Saved", desc: "Comprehensive third-party risk management platform that automates vendor assessment, continuous monitoring, and compliance tracking across your entire ecosystem.", features: [{ icon: "🔍", text: "Automated Risk Assessment" }, { icon: "👁️", text: "24/7 Threat Monitoring" }, { icon: "📋", text: "Compliance Management" }] },
              { to: "/products/compliize", icon: <ShieldCheck className="w-8 h-8 text-white" />, grad: "from-purple-500 to-pink-500", border: "border-purple-500/20 hover:border-purple-400/60", glowShadow: "hover:shadow-purple-500/20", badge: "DATA PRIVACY", badgeCls: "bg-purple-500/20 text-purple-400", title: "Compliize", hoverTitle: "group-hover:text-purple-300", statCls: "text-purple-400", stat: "90%", statLbl: "Workload Reduction", desc: "Enterprise GDPR & DPDPA compliance platform with AI-powered data discovery, automated privacy assessments, and real-time monitoring to eliminate regulatory risk.", features: [{ icon: "🗄️", text: "Automated Data Discovery" }, { icon: "🛡️", text: "GDPR & DPDPA Compliance" }, { icon: "⚡", text: "Real-time Monitoring" }] },
            ].map((p) => (
              <Link key={p.to} to={p.to} className={`group relative bg-gradient-to-br from-[#1e2d4a]/90 to-[#2a3f5f]/90 backdrop-blur-sm rounded-2xl overflow-hidden border ${p.border} transition-all duration-500 hover:scale-105 hover:shadow-2xl ${p.glowShadow}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${p.grad} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>{p.icon}</div>
                    <div className={`${p.badgeCls} px-3 py-1 rounded-full text-xs font-bold`}>{p.badge}</div>
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-3 ${p.hoverTitle} transition-colors`}>{p.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">{p.desc}</p>
                  <div className="space-y-3 mb-6">
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                        <span className="text-xl">{f.icon}</span><span>{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                    <div>
                      <div className={`text-3xl font-bold ${p.statCls}`}>{p.stat}</div>
                      <div className="text-xs text-gray-500">{p.statLbl}</div>
                    </div>
                    <div className={`flex items-center gap-2 ${p.statCls} font-semibold group-hover:gap-3 transition-all`}>Learn More <ArrowRight className="w-4 h-4" /></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Trusted by leading enterprises to drive efficiency, reduce risk, and ensure compliance</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Cloud-Native', 'Enterprise Security', 'ISO 27001 Certified', 'API-First', '99.9% Uptime'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white text-xs font-semibold">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VETERANS / LOGOS SCROLL */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/20">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-cyan-400 font-semibold tracking-wider uppercase">Trusted by Industry Leaders</p>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-100 mb-6">Veterans from Leading Organizations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Learn from professionals who have shaped innovation at the world's most respected companies</p>
          </div>
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex scroll-container">
            {[
              { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", alt: "Google", hoverBorder: "hover:border-cyan-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]", invert: false },
              { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft", hoverBorder: "hover:border-blue-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(96,165,250,0.25)]", invert: false },
              { src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg", alt: "Oracle", hoverBorder: "hover:border-red-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(248,113,113,0.25)]", invert: true },
              { src: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg", alt: "SAP", hoverBorder: "hover:border-blue-500/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]", invert: true },
              { src: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg", alt: "Wipro", hoverBorder: "hover:border-purple-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(192,132,252,0.25)]", invert: false },
              { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", alt: "IBM", hoverBorder: "hover:border-blue-500/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]", invert: true },
              { src: "https://s3-eu-west-1.amazonaws.com/tpd/logos/5531df8c0000ff00057ed682/0x0.png", alt: "Emirates NBD", hoverBorder: "hover:border-green-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(74,222,128,0.25)]", invert: false },
              { src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/EY_Logo_2019.svg", alt: "EY", hoverBorder: "hover:border-yellow-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(250,204,21,0.25)]", invert: true },
              { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", alt: "IBM Bangalore", hoverBorder: "hover:border-indigo-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(129,140,248,0.25)]", invert: true },
              { src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Genpact_logo.svg", alt: "Genpact", hoverBorder: "hover:border-pink-400/70", hoverShadow: "hover:shadow-[0_0_40px_rgba(244,114,182,0.25)]", invert: true },
            ].flatMap((logo, i) => [logo, { ...logo, key: `dup-${i}` }]).map((logo, i) => (
              <div key={i} className="flex-shrink-0 w-64 px-4">
                <div className={`group relative flex flex-col items-center justify-center h-32 w-full px-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 ${logo.hoverBorder} transition-all duration-500 ${logo.hoverShadow} hover:scale-105`}>
                  <img src={logo.src} alt={logo.alt} className={`h-10 w-auto object-contain mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${logo.invert ? "filter brightness-0 invert" : ""}`} />
                  <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors text-center">{logo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-purple-400 font-semibold mb-4 tracking-wider uppercase">SUCCESS STORIES</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Real results from real organizations that trusted Upskillize with their workforce transformation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { quote: "The BFSI domain training seamlessly transformed our team. MBA graduates into industry-ready professionals. The practitioner-led approach stood at the difference—real case studies, real feedback from textbook learning.", name: "Dr. Suresh Kumar", role: "Dean, MBA Program", initials: "SK", gradient: "from-purple-500 to-pink-500", accent: "text-cyan-400" },
              { quote: "Upskillize didn't just teach training—they partnered with us to diagnose our specific capability gaps and designed a custom program that addressed our exact needs. ROI was evident within 3 months.", name: "Priya Mehta", role: "VP, Learning & Development", initials: "PM", gradient: "from-cyan-500 to-blue-500", accent: "text-purple-400" },
              { quote: "The AI Product Management certification exceeded expectations. Our product team met confidently evaluated AI opportunities and builds ML-powered features that actually deliver business value.", name: "Rajesh Gupta", role: "Chief Product Officer", initials: "RG", gradient: "from-green-500 to-teal-500", accent: "text-green-400" },
            ].map((t, i) => (
              <div key={i} className="bg-[#1e2d4a]/60 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-600/30 hover:scale-105 transition-all duration-300">
                <svg className={`w-10 h-10 ${t.accent} mb-4`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1.5-4H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                </svg>
                <p className="text-gray-200 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${t.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl`}>{t.initials}</div>
                  <div>
                    <p className="text-white font-bold text-lg">{t.name}</p>
                    <p className={`${t.accent} text-sm`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4">Ready to Build an Industry-Ready Career?</h2>
            <p className="text-xl text-gray-300">Schedule a Free Expert Consultation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-white">
            {[
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, text: "Colleges seeking meaningful partnerships" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, text: "Students ready to accelerate their careers with real-world insights" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, text: "Industry professionals looking to accelerate their career" },
            ].map((item, i) => (
              <div key={i} className="bg-[#2d4560]/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#2d4560]/80 transition-all border-2 border-gray-600/30 hover:border-gray-500">
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-900">{item.icon}</div>
                <p className="text-lg font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(to right, #FFD700, #FFA500)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#3b82f6'; }}
            >
              Book Your 1:1 Consultation Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}