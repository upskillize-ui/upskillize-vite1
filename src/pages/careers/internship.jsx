import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const tracks = [
  {
    icon: "🤖",
    title: "AI & Fintech",
    duration: "3 Months",
    mode: "Remote / Hybrid",
    description:
      "Work on real-world AI and financial technology projects. Gain hands-on experience building intelligent systems for financial services.",
    skills: ["Python", "Machine Learning", "Financial Modeling", "Data Analysis"],
    accent: "#22d3ee",
    grad: "from-cyan-500 to-blue-500",
  },
  {
    icon: "📊",
    title: "Data Analytics & GenAI",
    duration: "3 Months",
    mode: "Remote",
    description:
      "Dive deep into data pipelines, business intelligence dashboards, and generative AI solutions for enterprise use cases.",
    skills: ["SQL", "Power BI", "GenAI Tools", "Python"],
    accent: "#818cf8",
    grad: "from-indigo-500 to-purple-500",
  },
  {
    icon: "🚀",
    title: "Product & Strategy",
    duration: "2 Months",
    mode: "Remote / Hybrid",
    description:
      "Collaborate with product leaders on roadmaps, market research, and go-to-market strategies for EdTech and B2B SaaS products.",
    skills: ["Product Thinking", "Market Research", "Agile", "Figma"],
    accent: "#a78bfa",
    grad: "from-purple-500 to-pink-500",
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    duration: "3 Months",
    mode: "Remote",
    description:
      "Engage in ethical hacking, vulnerability assessment, and security audits under the guidance of industry-certified mentors.",
    skills: ["Network Security", "Ethical Hacking", "VAPT", "SIEM Tools"],
    accent: "#34d399",
    grad: "from-emerald-500 to-teal-500",
  },
  {
    icon: "💼",
    title: "Business Consulting",
    duration: "2 Months",
    mode: "Hybrid",
    description:
      "Shadow senior consultants, build client presentations, and solve live business problems across sectors.",
    skills: ["Business Analysis", "Excel", "Presentation", "Strategy"],
    accent: "#60a5fa",
    grad: "from-blue-500 to-cyan-500",
  },
  {
    icon: "💻",
    title: "Technology & Digital Transformation",
    duration: "3 Months",
    mode: "Remote",
    description:
      "Work on digital transformation projects helping enterprises modernize their tech stack and processes.",
    skills: ["Cloud", "DevOps", "Agile", "System Design"],
    accent: "#f472b6",
    grad: "from-pink-500 to-rose-500",
  },
];

const perks = [
  { icon: "📜", title: "Industry Certificate", desc: "Receive a certificate co-branded with Upskillize & partner companies.", accent: "#22d3ee" },
  { icon: "🧑‍🏫", title: "1:1 Mentorship", desc: "Get dedicated mentorship from CXOs, IIT/IIM alumni, and domain experts.", accent: "#818cf8" },
  { icon: "💡", title: "Live Projects", desc: "Work on real client projects — not dummy assignments.", accent: "#34d399" },
  { icon: "🔗", title: "LinkedIn Endorsements", desc: "Get endorsed by mentors and featured on our alumni network.", accent: "#60a5fa" },
  { icon: "💰", title: "Stipend (Merit-based)", desc: "Top performers are eligible for a monthly stipend.", accent: "#f59e0b" },
  { icon: "🏆", title: "PPO Opportunity", desc: "Outstanding interns get Pre-Placement Offers from our corporate partners.", accent: "#f472b6" },
];

const steps = [
  { step: "01", title: "Apply Online", desc: "Fill out the application form with your details and preferred track.", grad: "from-cyan-500 to-blue-500" },
  { step: "02", title: "Screening Round", desc: "Shortlisted candidates appear for a brief online screening interview.", grad: "from-indigo-500 to-purple-500" },
  { step: "03", title: "Offer Letter", desc: "Selected candidates receive an official offer letter within 3 working days.", grad: "from-purple-500 to-pink-500" },
  { step: "04", title: "Onboarding", desc: "Join the cohort, meet your mentor, and begin your internship journey.", grad: "from-emerald-500 to-teal-500" },
];

const faqs = [
  {
    q: "Who can apply for the Upskillize Internship Program?",
    a: "Any student in their 2nd year or above (undergraduate or postgraduate) from any stream can apply. Recent graduates (within 1 year) are also eligible.",
  },
  {
    q: "Is the internship paid?",
    a: "The internship is primarily a learning opportunity. Merit-based stipends are offered to top performers based on project quality and mentor evaluation.",
  },
  {
    q: "Can I do this internship alongside my college?",
    a: "Yes! Our remote and hybrid options are designed to be flexible. Most interns manage 3–4 hours per day alongside their studies.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. All interns who successfully complete the program receive an industry-recognized certificate from Upskillize.",
  },
  {
    q: "How do I know which track to choose?",
    a: "Choose based on your interest and career goals. Our team is happy to guide you during the screening call if you're unsure.",
  },
];

export default function Internship() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "", track: "", year: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full text-white font-sans overflow-x-hidden" style={{ background: "#0a1628" }}>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 40%, #0d1f3c 70%, #060d1f 100%)" }}>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.12) 0%, transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 text-center relative z-10">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.40)", color: "#818cf8", letterSpacing: "1px" }}>
            🎓 Now Accepting Applications — Cohort 2025
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl">
            Launch Your Career with<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Upskillize Internships
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bridge the gap between academia and industry. Work on live projects, learn from CXO mentors,
            and build a career-ready portfolio — all while still in college.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 6px 24px rgba(99,102,241,0.40)" }}>
              Apply Now <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#tracks"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-lg text-lg border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl">
              Explore Tracks
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { val: "500+", label: "Interns Placed", color: "#22d3ee" },
              { val: "50+", label: "Corporate Partners", color: "#818cf8" },
              { val: "95%", label: "Completion Rate", color: "#34d399" },
              { val: "4.8★", label: "Intern Rating", color: "#f59e0b" },
            ].map(({ val, label, color }) => (
              <div key={label}
                className="rounded-2xl p-5 border text-center"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl font-extrabold mb-1" style={{ color }}>{val}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY UPSKILLIZE ===== */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                  style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee" }}>
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Why Upskillize Internships?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Most internships offer coffee runs and shadow work. Upskillize is different.
                We place students at the intersection of <span className="text-cyan-400 font-semibold">real industry challenges</span> and{" "}
                <span className="text-indigo-400 font-semibold">expert-guided learning</span>, so you graduate with both skills and a story to tell.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our programs are designed by IIT/IIM alumni, CXOs, and domain experts who have built careers
                at companies like Goldman Sachs, McKinsey, Google, and leading Indian startups.
              </p>
              <div className="flex flex-wrap gap-3">
                {["IIT/IIM Mentors", "Live Projects", "Flexible Remote", "Co-branded Certificate", "PPO Opportunities"].map(tag => (
                  <span key={tag}
                    className="text-sm font-semibold px-4 py-2 rounded-full"
                    style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.30)", color: "#818cf8" }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {perks.map((p) => (
                <div key={p.title}
                  className="rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    borderTopColor: p.accent,
                    borderTopWidth: "2px",
                  }}>
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <h4 className="font-bold text-white mb-1 text-sm">{p.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRACKS ===== */}
      <section id="tracks" className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{ background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.20)" }}>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-indigo-400 font-semibold tracking-wider uppercase">Choose Your Path</p>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Internship Tracks</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Choose a track aligned with your career aspirations. Each track is structured, mentored, and outcome-focused.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((t) => (
              <div key={t.title}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                style={{
                  background: "linear-gradient(135deg, rgba(30,45,74,0.9), rgba(42,63,95,0.9))",
                  borderColor: "rgba(255,255,255,0.08)",
                  borderTopColor: t.accent,
                  borderTopWidth: "2px",
                }}>
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                <div className="flex gap-3 text-xs font-semibold mb-3">
                  <span className="px-2 py-1 rounded-full" style={{ background: "rgba(34,211,238,0.12)", color: "#22d3ee" }}>⏱ {t.duration}</span>
                  <span className="px-2 py-1 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}>📍 {t.mode}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.description}</p>
                <div className="flex flex-wrap gap-2">
                  {t.skills.map(s => (
                    <span key={s}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">How It Works</h2>
            <p className="text-gray-300 text-lg">Simple, fast, and transparent process from application to onboarding.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 opacity-40"
              style={{ left: "12.5%", right: "12.5%" }} />
            {steps.map((s) => (
              <div key={s.step} className="relative text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${s.grad} rounded-2xl flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-5 shadow-lg`}>
                  {s.step}
                </div>
                <h4 className="font-bold text-white mb-2">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
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

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee" }}>
              Who Can Apply
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Eligibility Criteria</h2>
          <p className="text-gray-300 text-lg mb-10">We welcome students from all disciplines who bring curiosity and commitment.</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: "🎓", title: "Academic Standing", desc: "2nd year or above (UG/PG) or recent graduates within 1 year of completion.", accent: "#22d3ee", grad: "from-cyan-500 to-blue-500" },
              { icon: "🌐", title: "Any Discipline", desc: "Engineering, Commerce, Arts, Science — we value diverse perspectives.", accent: "#818cf8", grad: "from-indigo-500 to-purple-500" },
              { icon: "⏰", title: "Time Commitment", desc: "Minimum 3–4 hours/day. Flexible scheduling for college-going students.", accent: "#34d399", grad: "from-emerald-500 to-teal-500" },
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
            <p className="text-gray-300">Everything you need to know before applying.</p>
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
                  <span className="text-indigo-400 text-xl font-bold transition-transform duration-200 ml-4 flex-shrink-0"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
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
                Join the Cohort
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Apply Now</h2>
            <p className="text-gray-300 text-lg">Fill in your details and our team will reach out within 48 hours.</p>
          </div>

          {submitted ? (
            <div className="rounded-3xl shadow-2xl p-12 text-center border"
              style={{ background: "rgba(30,45,74,0.90)", borderColor: "rgba(99,102,241,0.30)" }}>
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Application Submitted!</h3>
              <p className="text-gray-300 mb-6">Thank you for applying to the Upskillize Internship Program. Our team will contact you within 48 hours at your registered email.</p>
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
                {/* Input helper styles */}
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
                    <label className="intern-label">Preferred Track *</label>
                    <select name="track" value={form.track} onChange={handleChange} className="intern-input">
                      <option value="">Select a track</option>
                      {tracks.map(t => <option key={t.title}>{t.title}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.phone || !form.college || !form.track || !form.year}
                  className="w-full text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:opacity-90 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 6px 24px rgba(99,102,241,0.35)" }}>
                  Submit Application →
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  By submitting, you agree to our{" "}
                  <Link to="/privacy" className="text-indigo-400 underline">Privacy Policy</Link>.
                  We never share your data.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Have Questions?</h2>
          <p className="text-gray-300 text-lg mb-8">Reach out to our team and we'll help you choose the right track.</p>
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