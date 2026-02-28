import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Briefcase,
  BarChart3,
  Layers,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const COURSES = [
  {
    title: "AI in FinTech",
    desc: "Python • TensorFlow • Fraud Detection • Risk Modeling",
    icon: <Brain size={32} />,
    accent: "#22d3ee",
    company: "Paytm",
  },
  {
    title: "Product Leadership Program",
    desc: "Product Strategy • Roadmapping • Execution • Go-to-Market",
    icon: <Briefcase size={32} />,
    accent: "#34d399",
    company: "Razorpay",
  },
  {
    title: "Data Analytics, GenAI & BI",
    desc: "Python • Pandas • PowerBI • GenAI • SQL",
    icon: <BarChart3 size={32} />,
    accent: "#818cf8",
    company: "Groww",
  },
  {
    title: "Technology & Digital Transformation",
    desc: "AWS • Kubernetes • Microservices • DevOps",
    icon: <Layers size={32} />,
    accent: "#f472b6",
    company: "Cred",
  },
  {
    title: "Integrated Programs",
    desc: "Full Stack • AI/ML • Cloud • Business • Leadership",
    icon: <TrendingUp size={32} />,
    accent: "#60a5fa",
    company: "PhonePe",
  },
  {
    title: "Cybersecurity Mastery",
    desc: "Ethical Hacking • Threat Detection • Compliance",
    icon: <ShieldCheck size={32} />,
    accent: "#6366f1",
    company: "PayU",
  },
  {
    title: "Corporate Readiness Program",
    desc: "Communication • Leadership • Interview Prep",
    icon: <GraduationCap size={32} />,
    accent: "#a78bfa",
    company: "Zepto",
  },
];

export default function Placement() {
  return (
    <div className="w-full text-white font-sans overflow-x-hidden" style={{ background: "#0a1628" }}>

      {/* ===== HERO ===== */}
<section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 40%, #0d1f3c 70%, #060d1f 100%)" }}>
  <div
    className="absolute inset-0 pointer-events-none opacity-20"
    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
  />
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.12) 0%, transparent 50%)" }}
  />

  <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 text-center relative z-10">

    {/* Badge */}
    <span
      className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold"
      style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.40)", color: "#34d399", letterSpacing: "1px" }}
    >
      <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
      🎓 PLACEMENT ASSISTANCE PROGRAM — NEW BATCH COMING SOON
    </span>

    {/* Headline */}
    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl">
      We Help You Land<br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        Your Dream Job Opportunity
      </span>
    </h1>

    {/* Description */}
    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
      Upskillize's <span className="text-cyan-400 font-semibold">Placement Assistance Program</span> is designed to bridge the gap between your skills and the job market.
      Complete our industry-aligned courses, build a strong profile, and we'll connect you with
      <span className="text-indigo-400 font-semibold"> exclusive interview opportunities</span> at our partner companies across Tech, FinTech, Data, and Consulting.
    </p>

    <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
      Our team actively prepares you — from resume building and mock interviews to direct introductions with hiring managers — so you walk into every opportunity fully ready.
    </p>

    {/* Disclaimer */}
    <div
      className="inline-flex items-center gap-2 mb-10 px-5 py-3 rounded-xl text-sm"
      style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: "#fbbf24" }}
    >
      <span>⚠️</span>
      <span>Upskillize facilitates placements — final hiring decisions rest with our partner companies.</span>
    </div>

    {/* Process Steps */}
    <div
      className="rounded-2xl p-8 max-w-3xl mx-auto mb-12 border"
      style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}
    >
      <h3 className="text-xl font-bold mb-8 text-center text-white">How the Program Works</h3>
      <div className="flex items-start justify-between gap-2">
        {[
          { num: "01", label: "REGISTER", desc: "Enroll in courses & build your profile", color: "#22d3ee", emoji: "📋", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.25)" },
          { num: "02", label: "COMPLETE", desc: "Finish all course modules (1-3 months)", color: "#818cf8", emoji: "📚", bg: "rgba(129,140,248,0.08)", border: "rgba(129,140,248,0.25)" },
          { num: "03", label: "PREPARE", desc: "Resume, mock interviews & mentorship", color: "#34d399", emoji: "🧑‍🏫", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)" },
          { num: "04", label: "GET PLACED", desc: "Introductions to partner companies", color: "#f59e0b", emoji: "🎯", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
        ].map((step, idx, arr) => (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center text-center flex-1">
              <div
                className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center mb-3 shadow-lg"
                style={{
                  background: step.bg,
                  border: `1.5px solid ${step.border}`,
                  boxShadow: `0 4px 20px ${step.color}25`,
                }}
              >
                <span className="text-2xl leading-none">{step.emoji}</span>
                <span className="text-[10px] font-extrabold mt-0.5" style={{ color: step.color }}>{step.num}</span>
              </div>
              <p className="text-xs font-extrabold tracking-widest mb-1" style={{ color: step.color }}>{step.label}</p>
              <p className="text-gray-400 text-xs leading-snug">{step.desc}</p>
            </div>
            {idx < arr.length - 1 && (
              <div className="flex items-center justify-center px-1 mb-8">
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6 H18 M14 1 L20 6 L14 11" stroke={`${step.color}80`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
        style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 6px 24px rgba(99,102,241,0.40)" }}
      >
        Explore Our Courses <ArrowRight className="w-5 h-5" />
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl"
      >
        Contact Us
      </Link>
    </div>

    {/* Stats */}
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {[
        { val: "12+", label: "Partner Companies", color: "#22d3ee" },
        { val: "7", label: "Course Tracks", color: "#818cf8" },
        { val: "1-3 month", label: "Program Duration", color: "#34d399" },
        { val: "FREE", label: "Registartion", color: "#f59e0b" },
      ].map(({ val, label, color }) => (
        <div
          key={label}
          className="rounded-2xl p-5 border text-center"
          style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}
        >
          <div className="text-3xl font-extrabold mb-1" style={{ color }}>{val}</div>
          <div className="text-sm text-gray-400">{label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ===== PARTNER COMPANIES ===== */}
      <section id="partners" className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4"
              style={{ background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.20)" }}>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-indigo-400 font-semibold tracking-wider uppercase">Placement Domains</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Exclusive Interview Opportunities
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              First batch students get <strong className="text-white">exclusive access</strong> to interviews with our partner companies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(30,45,74,0.9), rgba(42,63,95,0.9))",
                  borderColor: "rgba(255,255,255,0.08)",
                  borderTopColor: item.accent,
                  borderTopWidth: "2px",
                }}
              >
                <div className="p-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}40`, color: item.accent }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-base font-bold px-4 py-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.10)" }}
                    >
                      {item.company}
                    </span>
                    <Link
                      to="/courses"
                      className="text-white text-sm font-bold px-5 py-2 rounded-lg transition-all hover:opacity-90 hover:scale-105 transform"
                      style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)" }}
                    >
                      Start Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 50%, #0d1f3c 100%)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(34,211,238,0.12) 0%, transparent 50%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl mb-8"
            style={{ background: "rgba(52,211,153,0.12)", border: "2px solid rgba(52,211,153,0.35)" }}
          >
            <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
            <span className="text-xl font-bold text-green-300">LAUNCHING SOON</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Be in Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Next Batch
            </span>
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Register FREE → Complete courses → Get exclusive interview opportunities with top companies
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-white px-14 py-5 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl mb-6"
            style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}
          >
            Register FREE Now <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-base text-gray-400">
            <strong className="text-gray-200">Only a few seats left for the batch</strong> — Register before they fill!
          </p>
        </div>
      </section>
    </div>
  );
}