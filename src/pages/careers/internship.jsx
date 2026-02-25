import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Briefcase } from "lucide-react";

const tracks = [
  {
    icon: "🤖",
    title: "AI & FinTech",
    description: "Get placed at FinTech startups, NBFCs, and AI-first companies working on real financial technology challenges.",
    roles: ["AI Product Intern", "FinTech Analyst", "ML Research Intern"],
    accent: "#22d3ee",
  },
  {
    icon: "📊",
    title: "Data Analytics & GenAI",
    description: "We match you with companies that need sharp data and GenAI talent for BI, reporting, and automation projects.",
    roles: ["Data Analyst Intern", "BI Intern", "GenAI Intern"],
    accent: "#818cf8",
  },
  {
    icon: "🚀",
    title: "Product & Strategy",
    description: "Placed at B2B SaaS and EdTech companies to assist product teams with roadmaps, user research, and GTM.",
    roles: ["Product Intern", "Strategy Intern", "Growth Intern"],
    accent: "#a78bfa",
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    description: "Facilitated placements at IT security firms and enterprises for VAPT, compliance, and SOC roles.",
    roles: ["Security Analyst Intern", "VAPT Intern", "GRC Intern"],
    accent: "#34d399",
  },
  {
    icon: "💼",
    title: "Business Consulting",
    description: "We arrange internships at consulting firms and enterprise clients for strategy, operations, and BD roles.",
    roles: ["Consulting Intern", "Business Analyst Intern", "BD Intern"],
    accent: "#60a5fa",
  },
  {
    icon: "💻",
    title: "Technology & Digital Transformation",
    description: "Placed at companies undergoing digital transformation — cloud migration, DevOps, and process re-engineering.",
    roles: ["Tech Intern", "Cloud Ops Intern", "Digital Transformation Intern"],
    accent: "#f472b6",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: "📝",
    title: "You Apply to Upskillize",
    desc: "Submit your profile, preferred domain, and availability. No internship is guaranteed at this stage — we evaluate fit first.",
    grad: "from-cyan-500 to-blue-500",
  },
  {
    step: "02",
    icon: "🔍",
    title: "We Assess & Course Completed",
    desc: "Our team reviews and conducts a brief screening to understand your strengths and career goals.",
    grad: "from-indigo-500 to-purple-500",
  },
  {
    step: "03",
    icon: "🤝",
    title: "We Match You with Partners",
    desc: "Based on your profile, we reach out to our network of partner companies and facilitate introductions on your behalf.",
    grad: "from-purple-500 to-pink-500",
  },
  {
    step: "04",
    icon: "🏢",
    title: "Company Interview & Selection",
    desc: "The partner company conducts their own interview. Selection is at the company's discretion — we support but don't guarantee.",
    grad: "from-pink-500 to-rose-500",
  },
  {
    step: "05",
    icon: "🚀",
    title: "Onboarding & Support",
    desc: "Once selected, we continue to provide mentorship, check-ins, and skill support throughout your internship tenure.",
    grad: "from-emerald-500 to-teal-500",
  },
];

const whatWeProvide = [
  { icon: "🔗", title: "Partner Network Access", desc: "We connect you to our curated network of 50+ partner companies across BFSI, Tech, and Consulting.", accent: "#22d3ee" },
  { icon: "📋", title: "Profile Building Support", desc: "We help you craft a strong resume and LinkedIn profile before presenting you to companies.", accent: "#818cf8" },
  { icon: "🧑‍🏫", title: "Interview Preparation", desc: "Domain-specific mock interviews and briefings conducted by our mentors before your company interview.", accent: "#34d399" },
  { icon: "📞", title: "Facilitation & Follow-ups", desc: "We actively follow up with partner companies and keep you informed throughout the placement process.", accent: "#f59e0b" },
  { icon: "📜", title: "Upskillize Certificate", desc: "Upon completion, you receive an Upskillize program certificate regardless of company-specific credentials.", accent: "#f472b6" },
  { icon: "📈", title: "Ongoing Mentorship", desc: "Our mentors stay connected during your internship for guidance, feedback, and career advice.", accent: "#60a5fa" },
];

const clarityPoints = [
  { icon: "✅", text: "We actively work to get you placed at a relevant company in your chosen domain.", color: "#34d399", type: "do" },
  { icon: "✅", text: "We prepare you, present you, and advocate for you with our partner network.", color: "#34d399", type: "do" },
  { icon: "✅", text: "We provide mentorship and an Upskillize certificate upon program completion.", color: "#34d399", type: "do" },
  { icon: "⚠️", text: "Final selection is at the hiring company's discretion — we facilitate, not guarantee.", color: "#f59e0b", type: "note" },
  { icon: "⚠️", text: "Upskillize is not the employer — internships are with our partner companies.", color: "#f59e0b", type: "note" },
  { icon: "⚠️", text: "Stipend/compensation terms are set by the partner company, not by Upskillize.", color: "#f59e0b", type: "note" },
];

const faqs = [
  {
    q: "Does Upskillize directly employ interns?",
    a: "No. Upskillize is not the employer. We facilitate and arrange internships at partner companies within our network. You will be interning with those companies, not with Upskillize directly.",
  },
  {
    q: "Is an internship placement guaranteed after I apply?",
    a: "We do not guarantee placement. We work hard to match your profile with suitable partner companies and facilitate introductions, but the final selection decision rests with the hiring company after their interview.",
  },
  {
    q: "Who pays the stipend — Upskillize or the partner company?",
    a: "Stipends, if offered, are paid by the partner company you are placed with. Upskillize does not pay stipends. Terms vary by company and role.",
  },
  {
    q: "How long does the placement process take?",
    a: "Typically 2–4 weeks from application to a company offer, depending on your domain, availability, and how quickly our partner companies respond.",
  },
  {
    q: "What certificate do I receive?",
    a: "You receive an Upskillize program certificate acknowledging your participation in the facilitated internship program. Some partner companies may also issue their own internship certificates.",
  },
  {
    q: "Can I choose which company I want to intern at?",
    a: "You can share preferences, but placements depend on company availability and fit. We aim to match you as closely as possible to your preferred domain and role.",
  },
];

export default function Internship() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "", track: "", year: "", linkedin: "" });
const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async () => {
  setLoading(true);
  setError("");
  try {
    const res = await fetch("https://YOUR-BACKEND-URL.com/send-internship-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        college: form.college,
        internshipType: form.track,
        course: form.year,
        linkedin: form.linkedin,
      }),
    });
    const result = await res.json();
    if (result.success) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } catch (err) {
    setError("Network error. Please check your connection.");
  } finally {
    setLoading(false);
  }
};

const isFormValid = form.name && form.email && form.phone && form.college && form.track && form.year;

  return (
    <div className="w-full text-white font-sans overflow-x-hidden" style={{ background: "#0a1628" }}>

      <style>{`
        .intern-input {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
          background: rgba(255,255,255,0.05);
          color: white;
          outline: none;
          transition: all 0.2s;
        }
        .intern-input::placeholder { color: rgba(255,255,255,0.30); }
        .intern-input:focus { border-color: rgba(99,102,241,0.60); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .intern-input option { background: #1e2d4a; color: white; }
        .intern-label { display: block; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 6px; }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 40%, #0d1f3c 70%, #060d1f 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.12) 0%, transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 text-center relative z-10">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.40)", color: "#818cf8", letterSpacing: "1px" }}>
            🎓 Internship Facilitation Program — Cohort 2025
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl">
            We Connect You to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Real Internship Opportunities
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            Upskillize <span className="text-cyan-400 font-semibold">facilitates and arranges</span> internships at our partner companies —
            we provide courses and certificate after complete course, match you with the right companies, and support you through the entire process.
          </p>

          {/* Honest disclaimer */}
          <div className="inline-flex items-center gap-2 mb-10 px-5 py-3 rounded-xl text-sm"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: "#fbbf24" }}>
            <span>⚠️</span>
            <span>Upskillize is not the employer. Final selection is at the partner company's discretion.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 6px 24px rgba(99,102,241,0.40)" }}>
              Apply for Placement <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-lg text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl">
              How It Works
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { val: "50+", label: "Partner Companies", color: "#22d3ee" },
              { val: "6", label: "Internship Domains", color: "#818cf8" },
              { val: "22+", label: "Industry Mentors", color: "#34d399" },
              { val: "50+", label: "Students Facilitated", color: "#f59e0b" },
            ].map(({ val, label, color }) => (
              <div key={label} className="rounded-2xl p-5 border text-center"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl font-extrabold mb-1" style={{ color }}>{val}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENCY SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee" }}>
                Full Transparency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">What Upskillize Does & Doesn't Do</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">We believe in being completely upfront about our role in your internship journey.</p>
          </div>
          <div className="rounded-2xl border overflow-hidden"
            style={{ background: "rgba(30,45,74,0.70)", borderColor: "rgba(255,255,255,0.10)" }}>
            <div className="grid md:grid-cols-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="p-8" style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.30)" }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "#34d399" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">What We Do</h3>
                </div>
                <div className="space-y-4">
                  {clarityPoints.filter(p => p.type === "do").map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5 flex-shrink-0" style={{ color: p.color }}>{p.icon}</span>
                      <p className="text-gray-300 text-sm leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.30)" }}>
                    <Briefcase className="w-5 h-5" style={{ color: "#f59e0b" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Important to Know</h3>
                </div>
                <div className="space-y-4">
                  {clarityPoints.filter(p => p.type === "note").map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5 flex-shrink-0">{p.icon}</span>
                      <p className="text-gray-300 text-sm leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{ background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.20)" }}>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-indigo-400 font-semibold tracking-wider uppercase">The Process</p>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">How the Facilitation Works</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">A transparent, step-by-step look at what happens after you apply.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-8 h-0.5 opacity-30"
              style={{ left: "10%", right: "10%", background: "linear-gradient(to right, #22d3ee, #6366f1, #a78bfa, #f472b6, #34d399)" }} />
            {howItWorks.map((s) => (
              <div key={s.step} className="relative text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${s.grad} rounded-2xl flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-4 shadow-lg`}>
                  {s.step}
                </div>
                <div className="text-2xl mb-2">{s.icon}</div>
                <h4 className="font-bold text-white mb-2 text-sm">{s.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE PROVIDE ===== */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">What Upskillize Provides</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Beyond just the connection — here's the full support we offer throughout your journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeProvide.map((p) => (
              <div key={p.title}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,45,74,0.9), rgba(42,63,95,0.9))",
                  borderColor: "rgba(255,255,255,0.08)",
                  borderTopColor: p.accent,
                  borderTopWidth: "2px",
                }}>
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOMAINS ===== */}
      <section id="tracks" className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.20)" }}>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-cyan-400 font-semibold tracking-wider uppercase">Placement Domains</p>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Internship Domains We Facilitate</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We have partner companies across these domains actively looking for interns.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((t) => (
              <div key={t.title}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(30,45,74,0.9), rgba(42,63,95,0.9))",
                  borderColor: "rgba(255,255,255,0.08)",
                  borderTopColor: t.accent,
                  borderTopWidth: "2px",
                }}>
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.description}</p>
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: t.accent }}>Typical Roles Facilitated:</p>
                  <div className="flex flex-wrap gap-2">
                    {t.roles.map(r => (
                      <span key={r} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ELIGIBILITY ===== */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 50%, #0d1f3c 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(34,211,238,0.12) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee" }}>
              Who Can Apply
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Eligibility to Apply</h2>
          <p className="text-gray-300 text-lg mb-10">We accept applications from students and fresh graduates across all disciplines.</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: "🎓", title: "Academic Standing", desc: "2nd year or above (UG/PG) or recent graduates within 1 year of completion.", accent: "#22d3ee" },
              { icon: "🌐", title: "Any Discipline", desc: "Engineering, Commerce, Arts, Science — partner companies look for diverse profiles.", accent: "#818cf8" },
              { icon: "⏰", title: "Time Commitment", desc: "Minimum 3–4 hours/day. Partner company requirements will be communicated during matching.", accent: "#34d399" },
            ].map(e => (
              <div key={e.title}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)", borderTopColor: e.accent, borderTopWidth: "2px" }}>
                <div className="text-4xl mb-4">{e.icon}</div>
                <h4 className="font-bold text-white text-lg mb-2">{e.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300">Honest answers to important questions before you apply.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i}
                className="rounded-2xl overflow-hidden border transition-all duration-300"
                style={{ borderColor: openFaq === i ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 transition-colors"
                  style={{ background: openFaq === i ? "rgba(99,102,241,0.10)" : "rgba(30,45,74,0.60)" }}>
                  <span className="font-semibold text-white">{faq.q}</span>
                  <span className="text-indigo-400 text-xl font-bold ml-4 flex-shrink-0"
                    style={{ transition: "transform 0.2s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed border-t"
                    style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.20)" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section id="apply" className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.40)", color: "#818cf8" }}>
                Start Your Application
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Apply for Internship Facilitation</h2>
            <p className="text-gray-300 mb-4">Submit your interest and our team will reach out within 48 hours to discuss next steps.</p>
            <div className="inline-flex items-start gap-2 px-4 py-3 rounded-xl text-sm text-left"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24" }}>
              <span className="flex-shrink-0">⚠️</span>
              <span>Submitting this form is an expression of interest — not a confirmed internship placement. We will contact you to discuss fit and next steps.</span>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-3xl shadow-2xl p-12 text-center border"
              style={{ background: "rgba(30,45,74,0.90)", borderColor: "rgba(99,102,241,0.30)" }}>
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Application Received!</h3>
              <p className="text-gray-300 mb-2">Thank you for your interest in the Upskillize Internship Facilitation Program.</p>
              <p className="text-gray-400 text-sm mb-6">Our team will review your profile and reach out within 48 hours. This is not a placement confirmation.</p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)" }}>
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl shadow-2xl p-8 md:p-10 border"
              style={{ background: "rgba(30,45,74,0.90)", borderColor: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)" }}>
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="intern-label">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="intern-input" />
                  </div>
                  <div>
                    <label className="intern-label">Email Address *</label>
                    <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@email.com" className="intern-input" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="intern-label">Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="intern-input" />
                  </div>
                  <div>
                    <label className="intern-label">College / University *</label>
                    <input name="college" value={form.college} onChange={handleChange} placeholder="Your institution name" className="intern-input" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="intern-label">Year of Study *</label>
                    <select name="year" value={form.year} onChange={handleChange} className="intern-input">
                      <option value="">Select year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Postgraduate</option>
                      <option>Recent Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="intern-label">Preferred Domain *</label>
                    <select name="track" value={form.track} onChange={handleChange} className="intern-input">
                      <option value="">Select a domain</option>
                      {tracks.map(t => <option key={t.title}>{t.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="intern-label">LinkedIn Profile URL <span style={{ color: "rgba(255,255,255,0.35)" }}>(optional but recommended)</span></label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" className="intern-input" />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                >
                  {loading ? "Submitting..." : "Submit Expression of Interest →"}
                </button>
                  {error && (
                    <p className="text-center text-sm mt-2" style={{ color: "#f87171" }}>
                      ❌ {error}
                    </p>
                  )}
                <p className="text-center text-xs text-gray-500 mt-2">
                  By submitting, you agree to our{" "}
                  <Link to="/privacy" className="text-indigo-400 underline">Privacy Policy</Link>.
                  Submitting does not guarantee a placement.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Have Questions About the Process?</h2>
          <p className="text-gray-300 text-lg mb-8">Reach out to our team and we'll walk you through exactly how facilitation works.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 6px 24px rgba(99,102,241,0.35)" }}>
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://www.linkedin.com/company/upskillize-excel-beyond"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-lg text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl">
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}