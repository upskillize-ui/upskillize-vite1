import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  BarChart3,
  Brain,
  Award,
  Users,
  BookOpen,
  Layers,
  ChevronDown,
} from "lucide-react";

const heroBgs = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
];

export default function EcoProLMS() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [counters, setCounters] = useState({ learners: 0, courses: 0, rating: 0, cert: 0 });
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const statsRef = useRef(null);
  const animatedRef = useRef(false);

  // Auto-rotate hero background every 5 seconds
  useEffect(() => {
    const id = setInterval(() => setHeroBgIndex((p) => (p + 1) % heroBgs.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1800;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounters({
              learners: Math.round(ease * 50),
              courses: Math.round(ease * 48),
              rating: parseFloat((ease * 4.9).toFixed(1)),
              cert: Math.round(ease * 95),
            });
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      emoji: "🤖",
      title: "Agentic AI Engine",
      desc: "AI that ingests PDFs, videos & audio — auto-generates MCQs, T/F, short-answer and fill-in-the-blank questions in seconds.",
      color: "#6366f1",
      bullets: ["PDF & YouTube ingestion", "4 question formats auto-generated", "Semantic grading via Claude API", "Adaptive difficulty per student"],
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      emoji: "📊",
      title: "RUBRIC Assessment",
      desc: "Structured 6-dimension evaluation framework — every assignment graded consistently, transparently, and with actionable feedback.",
      color: "#00c2a8",
      bullets: ["Relevance · Understanding · Breadth", "Reasoning · Insight · Clarity", "AI-assisted rubric calibration", "Faculty override capability"],
    },
    {
      icon: <Award className="w-6 h-6" />,
      emoji: "📜",
      title: "Auto Certificates",
      desc: "On course completion, a professional certificate auto-generates — personalized, verifiable, and LinkedIn-ready instantly.",
      color: "#a78bfa",
      bullets: ["Unique cert ID verification", "LinkedIn shareable format", "Bulk export for institutions", "Lifelong digital record"],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      emoji: "🔐",
      title: "Enterprise Auth & Admin",
      desc: "JWT + Google OAuth 2.0 with a 12-module admin suite — user management, audit logs, revenue analytics and DB health monitoring.",
      color: "#f59e0b",
      bullets: ["Google OAuth sign-in built-in", "Role-based dashboards: admin / faculty / student", "Full audit trail with IP logging", "Revenue & enrollment analytics"],
    },
    {
      icon: <Zap className="w-6 h-6" />,
      emoji: "💳",
      title: "Razorpay Payments",
      desc: "Full payment lifecycle from course selection to certificate issuance — HMAC-SHA256 verified, GST auto-calculated.",
      color: "#ec4899",
      bullets: ["Cards · UPI · Net Banking · Wallets", "18% GST auto-calculation", "30-day refund support", "Free course bypass logic"],
    },
    {
      icon: <Layers className="w-6 h-6" />,
      emoji: "📈",
      title: "Progress Tracking",
      desc: "Real-time SVG circular progress rings per course, topic-level heatmaps, adaptive retesting — continue exactly where you left off.",
      color: "#22d3ee",
      bullets: ["Per-module progress persistence", "Topic accuracy heatmap", "Weak-student auto-alerts to admin", "Spaced repetition retesting"],
    },
  ];

  const audiences = [
    {
      icon: "🎓",
      title: "Students",
      tag: "From ₹0",
      tagColor: "#00c2a8",
      desc: "Upskill at your own pace with industry-relevant courses, AI feedback, and real certificates.",
      benefits: [
        "Browse BFSI, Banking, IT & Corporate courses",
        "AI-graded quizzes with instant feedback",
        "Circular progress tracker per course",
        "Auto-generated completion certificate",
        "Free course auto-detection — no payment needed",
      ],
    },
    {
      icon: "👨‍🏫",
      title: "Faculty & Instructors",
      tag: "Revenue Share",
      tagColor: "#6366f1",
      desc: "Create world-class content, watch students grow, and earn revenue — all from one dashboard.",
      benefits: [
        "Rich course builder with modules & lessons",
        "Upload PDF, video, audio — AI extracts & generates Qs",
        "Student tracking with topic-wise heatmaps",
        "Approval workflow: submit → review → go live",
        "Monthly earnings dashboard & revenue reports",
      ],
    },
    {
      icon: "🏛️",
      title: "Colleges & Universities",
      tag: "Institutional",
      tagColor: "#a78bfa",
      desc: "Deploy a fully branded LMS with admin controls, analytics and compliance tools.",
      benefits: [
        "Multi-role portal: admin, faculty, student",
        "RUBRIC-based assessment framework built-in",
        "Bulk enrollment & cohort management",
        "Completion & certification tracking",
        "Audit logs & compliance export reports",
      ],
    },
    {
      icon: "🏢",
      title: "Corporates & Partners",
      tag: "Enterprise",
      tagColor: "#f59e0b",
      desc: "Train teams at scale with BFSI-domain expertise, agentic AI evaluations, and measurable ROI.",
      benefits: [
        "BFSI Domain Excellence vertical built-in",
        "Custom role permissions & SSO via Google OAuth",
        "Agentic AI for onboarding assessments",
        "Analytics: retention, revenue, top performers",
        "Partner white-labelling available",
      ],
    },
  ];

  const rubric = [
    { letter: "R", word: "Relevance", desc: "Does the response address the actual question?" },
    { letter: "U", word: "Understanding", desc: "Depth of conceptual comprehension demonstrated" },
    { letter: "B", word: "Breadth", desc: "Coverage of key topics and sub-themes" },
    { letter: "R", word: "Reasoning", desc: "Quality of logic, argument structure & evidence" },
    { letter: "I", word: "Insight", desc: "Original thinking beyond the textbook" },
    { letter: "C", word: "Clarity", desc: "Communication quality, structure & conciseness" },
  ];

  const pricing = [
    {
      name: "Explorer",
      for: "For Students",
      price: "₹0",
      period: "forever free",
      color: "#00c2a8",
      featured: false,
      features: ["All free courses", "AI-graded quizzes", "Progress tracker", "Completion certificate", "Google OAuth sign-in", "Mobile-responsive interface"],
      cta: "Get Started Free",
    },
    {
      name: "Pro Learner",
      for: "For Serious Learners",
      price: "₹999",
      period: "per month",
      color: "#6366f1",
      featured: true,
      badge: "Most Popular",
      features: ["Everything in Explorer", "All premium domain courses", "AI case study review (unlimited)", "RUBRIC-scored assignments", "Adaptive learning path", "Weekly AI progress report", "LinkedIn certificate sharing", "Priority email support"],
      cta: "Subscribe Now",
    },
    {
      name: "Enterprise",
      for: "For Colleges & Corporates",
      price: "Custom",
      period: "Starting ₹49,999/year",
      color: "#a78bfa",
      featured: false,
      features: ["Unlimited users & courses", "12-module admin suite", "Bulk enrollment & cohorts", "SSO & custom domain", "Audit logs & compliance export", "Dedicated account manager", "API access for integration", "DB backup & SLA guarantee"],
      cta: "Contact Sales",
    },
  ];

  const faqs = [
    {
      q: "What is EcoPro LMS?",
      a: "EcoPro LMS is Upskillize's next-generation learning management system — combining adaptive AI, automated assessments, RUBRIC-based evaluation, and Razorpay payments into one seamless ecosystem for students, faculty, colleges and corporates.",
    },
    {
      q: "How does the AI question generation work?",
      a: "Faculty upload PDFs, YouTube links, or audio/video files. EcoPro's AI (powered by Claude) extracts structured knowledge and generates exam-ready assessments in 4 formats: MCQ, True/False, Short Answer, and Fill-in-the-Blanks — automatically, in seconds.",
    },
    {
      q: "What is RUBRIC-based assessment?",
      a: "RUBRIC stands for Relevance, Understanding, Breadth, Reasoning, Insight, and Clarity. Every assignment is scored across these 6 dimensions with transparent, consistent, and actionable feedback — far beyond a simple percentage score.",
    },
    {
      q: "Are certificates verifiable?",
      a: "Yes. Every completion certificate has a unique Certificate ID that can be verified online. Certificates are LinkedIn-shareable and designed to be lifelong digital credentials.",
    },
    {
      q: "How does the Razorpay integration work?",
      a: "EcoPro supports Cards, UPI, Net Banking, and Wallets via Razorpay. GST is auto-calculated at 18%, refunds are supported within 30 days, and all transactions are HMAC-SHA256 server-side verified. Free courses bypass the payment flow entirely.",
    },
    {
      q: "Can I white-label EcoPro for my institution?",
      a: "Yes. The Enterprise plan includes custom domain support, institutional branding, multi-role portals, and partner white-labelling. Contact our sales team to discuss your specific requirements.",
    },
  ];

  const testimonials = [
    {
      quote: "The AI case study reviewer gave feedback better than a 1-hour tutorial. It understood my argument, not just my keywords.",
      name: "Priya Rajan",
      role: "BFSI Graduate, Chennai",
      initials: "PR",
      color: "#6366f1",
    },
    {
      quote: "I uploaded lecture notes as a PDF and within minutes, EcoPro generated 40 high-quality MCQs. My students love the adaptive retesting.",
      name: "Suresh Kumar",
      role: "Faculty, Finance Dept., Bengaluru",
      initials: "SK",
      color: "#00c2a8",
    },
    {
      quote: "We deployed EcoPro for 800-employee onboarding. Razorpay integration, role management, and audit logs made it enterprise-ready from day one.",
      name: "Anjali Thomas",
      role: "L&D Head, Leading NBFC",
      initials: "AT",
      color: "#a78bfa",
    },
  ];

  const aiFlow = [
    { icon: "📚", label: "Upload Content", sub: "PDF · Video · YouTube · Audio", color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)" },
    { icon: "🤖", label: "AI Processes", sub: "Extracts · Transcribes · Structures", color: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.4)" },
    { icon: "❓", label: "Generates Qs", sub: "MCQ · T/F · Short · Fill-in", color: "rgba(0,194,168,0.15)", border: "rgba(0,194,168,0.4)" },
    { icon: "🎯", label: "Student Tests", sub: "Adaptive difficulty & retesting", color: "rgba(15,30,60,0.7)", border: "rgba(255,255,255,0.15)" },
    { icon: "📊", label: "AI Scores", sub: "Topic strength heatmap built", color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)" },
    { icon: "💬", label: "Smart Feedback", sub: "Roadmap · Alerts · Reports", color: "rgba(0,194,168,0.15)", border: "rgba(0,194,168,0.4)" },
  ];

  const S = {
    page: { background: "#080f1e", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#e2e8f0", width: "100%", overflowX: "hidden" },
    section: (bg) => ({ padding: "96px 24px", background: bg }),
    inner: { maxWidth: 1140, margin: "0 auto" },
    innerNarrow: { maxWidth: 780, margin: "0 auto" },
    label: { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: 12 },
    h2: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", marginBottom: 14, lineHeight: 1.15 },
    muted: { color: "#94a3b8", lineHeight: 1.75 },
    card: {
      background: "rgba(255,255,255,0.03)",
      border: "1.5px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "30px 26px",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes blink  { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes marquee{ from{transform:translateX(0);} to{transform:translateX(-50%);} }
        @keyframes shimmer{ 0%{background-position:-200% center;} 100%{background-position:200% center;} }

        .eco-a1{animation:fadeUp 0.65s 0.05s ease both;}
        .eco-a2{animation:fadeUp 0.65s 0.15s ease both;}
        .eco-a3{animation:fadeUp 0.65s 0.25s ease both;}
        .eco-a4{animation:fadeUp 0.65s 0.35s ease both;}
        .eco-a5{animation:fadeUp 0.65s 0.45s ease both;}

        .eco-marquee-track { animation: marquee 30s linear infinite; display:flex; white-space:nowrap; }

        .eco-card-hover:hover {
          border-color: rgba(99,102,241,0.45) !important;
          background: rgba(99,102,241,0.06) !important;
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(99,102,241,0.15);
        }

        .eco-tab {
          padding:10px 22px; border-radius:10px; font-size:0.86rem;
          font-weight:600; cursor:pointer; border:1.5px solid rgba(255,255,255,0.10);
          background:transparent; color:#94a3b8; transition:all 0.25s;
          font-family:'DM Sans',system-ui,sans-serif;
        }
        .eco-tab.on { background:rgba(99,102,241,0.18); border-color:rgba(99,102,241,0.55); color:#a5b4fc; }
        .eco-tab:hover:not(.on) { border-color:rgba(255,255,255,0.22); color:#e2e8f0; }

        .eco-btn-p {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#6366f1,#4f46e5);
          color:white; padding:14px 32px; border-radius:10px;
          font-weight:700; font-size:0.95rem; text-decoration:none;
          transition:all 0.3s; box-shadow:0 6px 24px rgba(99,102,241,0.40);
          border:none; cursor:pointer; font-family:'DM Sans',system-ui,sans-serif;
        }
        .eco-btn-p:hover { box-shadow:0 10px 36px rgba(99,102,241,0.60); transform:translateY(-2px); background:linear-gradient(135deg,#818cf8,#6366f1); }

        .eco-btn-s {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.06); border:1.5px solid rgba(255,255,255,0.18);
          color:#e2e8f0; padding:14px 32px; border-radius:10px;
          font-weight:600; font-size:0.95rem; text-decoration:none;
          transition:all 0.3s; cursor:pointer; font-family:'DM Sans',system-ui,sans-serif;
        }
        .eco-btn-s:hover { border-color:rgba(99,102,241,0.55); color:#a5b4fc; background:rgba(99,102,241,0.08); }

        .eco-price-card {
          background:rgba(255,255,255,0.03); border:1.5px solid rgba(255,255,255,0.08);
          border-radius:22px; padding:36px 28px; transition:all 0.35s; position:relative; overflow:hidden;
        }
        .eco-price-card.feat {
          background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(124,58,237,0.08));
          border-color:rgba(99,102,241,0.45); transform:scale(1.04);
        }
        .eco-price-card:hover { transform:translateY(-5px); box-shadow:0 20px 60px rgba(0,0,0,0.3); }
        .eco-price-card.feat:hover { transform:scale(1.04) translateY(-5px); }

        .eco-faq { border:1.5px solid rgba(255,255,255,0.07); border-radius:14px; overflow:hidden; transition:border-color 0.25s; margin-bottom:12px; }
        .eco-faq.open { border-color:rgba(99,102,241,0.40); }
        .eco-faq-btn { width:100%; background:rgba(255,255,255,0.02); border:none; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; color:white; text-align:left; font-size:0.95rem; font-weight:600; font-family:'DM Sans',system-ui,sans-serif; }
        .eco-faq-btn:hover { background:rgba(255,255,255,0.04); }

        .eco-rubric-pill {
          background:rgba(255,255,255,0.03); border:1.5px solid rgba(255,255,255,0.08);
          border-radius:14px; padding:20px 14px; text-align:center; transition:all 0.3s; cursor:default;
        }
        .eco-rubric-pill:hover { border-color:rgba(99,102,241,0.5); transform:translateY(-4px); box-shadow:0 8px 24px rgba(99,102,241,0.15); }

        .eco-hero-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 1.2s ease-in-out;
        }

        .eco-grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 68px 68px;
        }
        .eco-glow-dot { width:6px; height:6px; border-radius:50%; background:#00c2a8; animation:blink 2s infinite; display:inline-block; }

        @media(max-width:768px){
          .eco-tab-grid { flex-wrap:wrap !important; }
          .eco-feature-grid { grid-template-columns:1fr !important; }
          .eco-rubric-grid { grid-template-columns:1fr 1fr !important; }
          .eco-pricing-grid { grid-template-columns:1fr !important; }
          .eco-price-card.feat { transform:scale(1) !important; }
          .eco-stats-row { gap:24px !important; }
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section
        style={{
          minHeight: "100vh",
          background: "#060d1f",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingTop: 110,
          paddingBottom: 80,
        }}
      >
        {/* Background images — crossfade between both */}
        {heroBgs.map((bg, i) => (
          <div
            key={i}
            className="eco-hero-bg"
            style={{
              backgroundImage: `url(${bg})`,
              opacity: heroBgIndex === i ? 1 : 0,
            }}
          />
        ))}
        {/* Dark overlay over image */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,13,31,0.82) 0%, rgba(10,22,40,0.78) 50%, rgba(6,13,31,0.85) 100%)" }} />
        <div className="eco-grid-bg" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "12%", left: "5%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,168,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          {/* Eyebrow badge */}
          <div className="eco-a1" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.30)", borderRadius: 100, padding: "7px 22px", marginBottom: 30 }}>
            <span className="eco-glow-dot" />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a5b4fc" }}>
              Now Live on Upskillize · Powered by Agentic AI
            </span>
          </div>

          {/* Main headline */}
          <h1 className="eco-a2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)", fontWeight: 800, lineHeight: 1.06, marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
            <span style={{ color: "#f1f5f9" }}>The LMS That</span>
            <br />
            <span style={{ color: "#818cf8" }}>Teaches Itself</span>
            <br />
            <span style={{ color: "#00c2a8" }}>To Teach Better</span>
          </h1>

          {/* Sub */}
          <p className="eco-a3" style={{ fontSize: "1.1rem", color: "rgba(226,232,240,0.72)", lineHeight: 1.82, maxWidth: 640, margin: "0 auto 48px", fontWeight: 400 }}>
            <span style={{ color: "yellow", fontWeight: "bold" }}>EcoPro LMS</span> combines adaptive AI, automated assessments, RUBRIC-based evaluation,
            and seamless Razorpay payments into one ecosystem for students, faculty, colleges and corporates.
          </p>

          {/* CTAs */}
          <div className="eco-a4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 68 }}>
            <Link to="/contact" className="eco-btn-p" style={{ fontSize: "1rem", padding: "15px 36px" }}>
              🚀 Get Started Free <ArrowRight size={18} />
            </Link>
            <a href="#features" className="eco-btn-s" style={{ fontSize: "1rem", padding: "15px 36px" }}>
              Explore Features →
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="eco-a5 eco-stats-row" style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { num: counters.learners.toLocaleString() + "+", label: "Active Learners" },
              { num: counters.courses + "+", label: "Courses & Modules" },
              { num: counters.rating.toFixed(1), label: "Avg Rating" },
              { num: counters.cert + "%", label: "Completion Rate" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 800, color: "white", lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6, fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div style={{ background: "linear-gradient(90deg, #4338ca, #6366f1)", padding: "11px 0", overflow: "hidden" }}>
        <div className="eco-marquee-track">
          {[...Array(2)].flatMap((_, ri) =>
            ["🤖 Agentic AI Grading", "📜 Auto Certificate Generation", "📊 RUBRIC Framework", "💳 Razorpay · UPI · Cards", "🏦 BFSI · Banking · Corporate · IT", "🎯 Adaptive Learning Paths", "📁 AI Case Study Review", "📈 Real-Time Progress Tracking"].map((item, i) => (
              <span key={`${ri}-${i}`} style={{ padding: "0 28px", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", flexShrink: 0 }}>
                {item} <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: 28 }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══════════ WHO IT'S FOR ══════════ */}
      <section style={S.section("linear-gradient(180deg,#0a1628 0%,#111e3a 100%)")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={S.label}>Built For Everyone</div>
            <h2 style={S.h2}>One Platform. Every Learner.</h2>
            <p style={{ ...S.muted, maxWidth: 540, margin: "0 auto" }}>
              Whether you're a student, faculty, institution, or enterprise — EcoPro is engineered for you.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {audiences.map((a) => (
              <div key={a.title} className="eco-card-hover" style={{ ...S.card }}>
                <div style={{ fontSize: "2.6rem", marginBottom: 14 }}>{a.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.68, marginBottom: 16 }}>{a.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
                  {a.benefits.map((b) => (
                    <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.82rem", color: "#64748b", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <CheckCircle size={13} style={{ color: "#00c2a8", flexShrink: 0, marginTop: 2 }} /> {b}
                    </li>
                  ))}
                </ul>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: `${a.tagColor}18`, border: `1px solid ${a.tagColor}40`, color: a.tagColor }}>
                  {a.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" style={S.section("linear-gradient(180deg,#111e3a 0%,#0a1628 100%)")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={S.label}>Platform Features</div>
            <h2 style={S.h2}>Everything Extraordinary<br />In One Platform</h2>
          </div>

          {/* Tabs */}
          <div className="eco-tab-grid" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            {features.map((f, i) => (
              <button key={i} className={`eco-tab ${activeTab === i ? "on" : ""}`} onClick={() => setActiveTab(i)}>
                {f.title}
              </button>
            ))}
          </div>

          {/* Content */}
          {features.map((f, i) => (
            <div key={i} className="eco-feature-grid" style={{ display: activeTab === i ? "grid" : "none", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}>
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}18`, border: `1.5px solid ${f.color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: f.color }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 14 }}>{f.title}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem", marginBottom: 26 }}>{f.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {f.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#cbd5e1", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: f.color, flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: `linear-gradient(135deg,${f.color}12,rgba(8,15,30,0.85))`, border: `1.5px solid ${f.color}28`, borderRadius: 24, padding: "50px 36px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, minHeight: 280 }}>
                <div style={{ fontSize: "5.5rem", animation: "float 3s ease-in-out infinite" }}>{f.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "white" }}>{f.title}</div>
                <div style={{ fontSize: "0.84rem", color: "#94a3b8", maxWidth: 260, lineHeight: 1.65 }}>{f.desc.split("—")[0].trim()}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ AI WORKFLOW ══════════ */}
      <section style={S.section("linear-gradient(180deg,#0a1628 0%,#111e3a 100%)")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ ...S.label, color: "#00c2a8" }}>Agentic AI Engine</div>
            <h2 style={S.h2}>The AI That Never<br />Stops Working For You</h2>
            <p style={{ ...S.muted, maxWidth: 520, margin: "0 auto" }}>
              From content upload to personalised feedback — fully automated, running 24/7.
            </p>
          </div>

          {/* Flow diagram */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
            {aiFlow.map((step, i) => (
              <React.Fragment key={i}>
                <div style={{ background: step.color, border: `1px solid ${step.border}`, borderRadius: 14, padding: "18px 20px", textAlign: "center", minWidth: 128, flexShrink: 0 }}>
                  <div style={{ fontSize: "1.9rem", marginBottom: 7 }}>{step.icon}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", marginBottom: 3 }}>{step.label}</div>
                  <div style={{ fontSize: "0.66rem", color: "#94a3b8" }}>{step.sub}</div>
                </div>
                {i < aiFlow.length - 1 && (
                  <span style={{ color: "#6366f1", fontSize: "1.5rem", flexShrink: 0 }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 4 phase cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            {[
              { num: "01", title: "Material Ingestion", color: "#6366f1", desc: "PDF-parse, YouTube Transcript API, OpenAI Whisper for audio, and rich-text input — every format covered automatically." },
              { num: "02", title: "Question Generation", color: "#00c2a8", desc: "Claude API reads extracted content and generates MCQ, T/F, Short Answer, and Fill-in-the-Blanks with smart distractors." },
              { num: "03", title: "Adaptive Tracking", color: "#a78bfa", desc: "Per-topic knowledge profiles with adaptive difficulty, accuracy heatmaps, auto-flagging below-60% topics, and spaced repetition." },
              { num: "04", title: "Feedback Agent", color: "#f59e0b", desc: "Personal improvement roadmaps, admin weak-student alerts, mentor re-teach suggestions, and weekly digest emails via Resend API." },
            ].map((p) => (
              <div
                key={p.num}
                style={{ background: "rgba(255,255,255,0.03)", border: `1.5px solid ${p.color}22`, borderRadius: 18, padding: 26, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${p.color}55`; e.currentTarget.style.boxShadow = `0 8px 32px ${p.color}18`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${p.color}22`; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 800, color: `${p.color}20`, lineHeight: 1, marginBottom: 8 }}>{p.num}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: p.color, marginBottom: 8, letterSpacing: "0.02em" }}>{p.title}</div>
                <div style={{ fontSize: "0.84rem", color: "#94a3b8", lineHeight: 1.72 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Case Study spotlight */}
          <div style={{ marginTop: 40, background: "linear-gradient(135deg,rgba(88,28,135,0.12),rgba(0,169,157,0.06))", border: "1.5px solid rgba(124,58,237,0.25)", borderRadius: 22, padding: "40px 36px" }}>
            <div style={{ ...S.label, color: "#c4b5fd" }}>✨ Spotlight Feature</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 800, color: "white", marginBottom: 12 }}>Automatic Case Study Review via AI</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.93rem", lineHeight: 1.8, maxWidth: 680, marginBottom: 26 }}>
              Students submit written case study responses through the portal. EcoPro's AI agent — powered by Claude — evaluates each response
              using the course's RUBRIC criteria, scores semantically (not keyword-matching), and generates a personalised feedback report
              with strengths, gaps, and a structured improvement plan. Faculty can review, agree, or override.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 14 }}>
              {[
                { icon: "🧠", title: "Semantic Grading", desc: "Understands intent, not just keywords. Rewards critical thinking." },
                { icon: "📋", title: "RUBRIC-Aligned", desc: "Scores mapped to defined rubric criteria with transparent breakdown." },
                { icon: "⚡", title: "Instant Results", desc: "From submission to feedback in under 30 seconds. No waiting." },
                { icon: "👨‍🏫", title: "Faculty Override", desc: "Instructors can review, adjust scores, and add personal comments." },
              ].map((m) => (
                <div key={m.title} style={{ background: "rgba(15,22,45,0.65)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 7 }}>{m.icon}</div>
                  <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "white", marginBottom: 4 }}>{m.title}</div>
                  <div style={{ fontSize: "0.76rem", color: "#94a3b8", lineHeight: 1.55 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ RUBRIC ══════════ */}
      <section style={S.section("linear-gradient(180deg,#111e3a 0%,#0a1628 100%)")}>
        <div style={S.inner}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div style={S.label}>Assessment Philosophy</div>
              <h2 style={{ ...S.h2, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>The RUBRIC<br />Framework</h2>
              <p style={{ ...S.muted, marginBottom: 28 }}>
                Traditional scoring gives you a number. RUBRIC scoring gives you understanding.
                Every criterion is defined, weighted, and evaluated independently — making scores
                meaningful and actionable for both learner and instructor.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/contact" className="eco-btn-p">Deploy EcoPro <ArrowRight size={16} /></Link>
              </div>
            </div>
            <div className="eco-rubric-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {rubric.map((r, i) => (
                <div key={i} className="eco-rubric-pill">
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 800, lineHeight: 1, marginBottom: 4, background: "linear-gradient(135deg,#818cf8,#00c2a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {r.letter}
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "white", marginBottom: 4 }}>{r.word}</div>
                  <div style={{ fontSize: "0.67rem", color: "#64748b", lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section style={S.section("linear-gradient(180deg,#0a1628 0%,#111e3a 100%)")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={S.label}>Simple Onboarding</div>
            <h2 style={S.h2}>Up & Running in Minutes</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 34, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg,#6366f1,#00c2a8)", zIndex: 0, display: window.innerWidth > 600 ? "block" : "none" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, position: "relative", zIndex: 1 }}>
              {[
                { num: "1", title: "Register Your Role", desc: "Sign up as Student, Faculty or Institution. Google OAuth makes it one click." },
                { num: "2", title: "Discover Courses", desc: "Browse by domain, difficulty, and price. Free courses enroll instantly." },
                { num: "3", title: "Pay Securely", desc: "Razorpay checkout with Card, UPI, Net Banking. GST auto-calculated." },
                { num: "4", title: "Learn & Get Graded", desc: "AI tests your knowledge, tracks progress, reviews case studies." },
                { num: "5", title: "Earn Your Certificate", desc: "Auto-generated on completion. Verifiable, LinkedIn-ready, lifelong." },
              ].map((p) => (
                <div key={p.num} style={{ textAlign: "center", padding: "0 14px 28px" }}>
                  <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#080f1e", border: "2px solid #6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 800, color: "#818cf8", margin: "0 auto 16px" }}>
                    {p.num}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "white", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section id="pricing" style={S.section("linear-gradient(180deg,#111e3a 0%,#0a1628 100%)")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={S.label}>Simple Pricing</div>
            <h2 style={S.h2}>Choose Your Plan</h2>
            <p style={{ ...S.muted, maxWidth: 460, margin: "0 auto" }}>
              Transparent pricing. No hidden fees. 30-day money-back guarantee on all paid plans.
            </p>
          </div>
          <div className="eco-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22, alignItems: "start" }}>
            {pricing.map((p) => (
              <div key={p.name} className={`eco-price-card ${p.featured ? "feat" : ""}`}>
                {p.badge && (
                  <div style={{ position: "absolute", top: 18, right: 18, background: "#6366f1", color: "white", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 12px", borderRadius: 100 }}>
                    {p.badge}
                  </div>
                )}
                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: p.color, marginBottom: 8 }}>{p.for}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 800, color: "white", marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 800, color: "white", lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 22 }}>{p.period}</div>
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0 0 20px" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px" }}>
                  {p.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", color: "#cbd5e1", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <CheckCircle size={14} style={{ color: "#00c2a8", flexShrink: 0, marginTop: 2 }} /> {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  style={{
                    display: "block", textAlign: "center", padding: "13px", borderRadius: 10,
                    fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.3s",
                    background: p.featured ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "rgba(255,255,255,0.06)",
                    color: p.featured ? "white" : "#e2e8f0",
                    border: p.featured ? "none" : "1.5px solid rgba(255,255,255,0.12)",
                    boxShadow: p.featured ? "0 6px 22px rgba(99,102,241,0.4)" : "none",
                  }}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section style={S.section("linear-gradient(180deg,#0a1628 0%,#111e3a 100%)")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={S.label}>Social Proof</div>
            <h2 style={S.h2}>What Our Learners Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="eco-card-hover" style={{ ...S.card }}>
                <div style={{ color: "#fbbf24", fontSize: "0.88rem", marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: "0.93rem", color: "#cbd5e1", lineHeight: 1.78, fontStyle: "italic", marginBottom: 22 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},#00c2a8)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.88rem", color: "white", flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section style={S.section("linear-gradient(180deg,#111e3a 0%,#0a1628 100%)")}>
        <div style={S.innerNarrow}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={S.label}>FAQs</div>
            <h2 style={S.h2}>Common Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className={`eco-faq ${openFaq === i ? "open" : ""}`}>
              <button className="eco-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <ChevronDown size={18} style={{ color: "#a5b4fc", flexShrink: 0, marginLeft: 16, transition: "transform 0.25s", transform: openFaq === i ? "rotate(180deg)" : "none" }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: "4px 24px 22px", fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ padding: "110px 24px", background: "linear-gradient(135deg,rgba(99,102,241,0.13),rgba(0,194,168,0.07),#090e1e)", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "18vw", fontWeight: 800, color: "rgba(255,255,255,0.013)", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>
          UPSKILLIZE
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <div style={{ ...S.label, display: "flex", justifyContent: "center", marginBottom: 16 }}>🚀 Join the Revolution</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.6rem)", fontWeight: 800, color: "white", lineHeight: 1.12, marginBottom: 18 }}>
            Your Learning<br />Transformation Starts Today
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: 38 }}>
            Join 10,000+ learners, faculty, and institutions already using EcoPro LMS
            to upskill faster with the power of agentic AI.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
            <Link to="/contact" className="eco-btn-p" style={{ fontSize: "1rem", padding: "15px 38px" }}>
              Get Early Access <ArrowRight size={18} />
            </Link>
            <Link to="/academic" className="eco-btn-s" style={{ fontSize: "1rem", padding: "15px 38px" }}>
              Explore Programs
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, justifyContent: "center" }}>
            {["✓ BFSI Focused", "✓ AI-Powered", "✓ Made in India 🇮🇳", "✓ Razorpay Payments", "✓ Auto Certificates", "✓ 30-Day Guarantee"].map((b) => (
              <span key={b} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", padding: "5px 14px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, color: "#64748b", letterSpacing: "0.05em" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}