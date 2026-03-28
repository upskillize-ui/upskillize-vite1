import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ── Sub-courses — exact mirror of Navbar CERT_CATEGORIES ── */
const CERT_CATEGORIES = [
  {
    label: "AI in FinTech",
    slug: "ai-fintech",
    icon: "🏦",
    courses: [
      { label: "BFSI Domain Excellence",          href: "/courses/bfsi-domain-excellence-program",   img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=48",  available: true,  duration: "10 Weeks", mode: "Online", fee: "₹18,000" },
      { label: "Investment Banking & Wealth Tech", href: "/courses/investment-banking-wealth-tech",   img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=48",  available: true,  duration: "12 Weeks", mode: "Hybrid", fee: "₹22,000" },
      { label: "Risk Management & RegTech",        href: "/courses/risk-management-regtech-program",  img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=48",  available: true,  duration: "10 Weeks", mode: "Online", fee: "₹20,000" },
      { label: "FinTech & AI Mastery",             href: "/courses/ai-fintech",                       img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=48",  available: false, duration: "12 Weeks", mode: "Online", fee: "₹24,000" },
      { label: "Insurance, InsurTech & DPDPA",     href: "/courses/ai-fintech",                       img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=48",  available: false, duration: "8 Weeks",  mode: "Online", fee: "₹16,000" },
      { label: "AI in Financial Services",         href: "/courses/ai-fintech",                       img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=48",  available: false, duration: "10 Weeks", mode: "Hybrid", fee: "₹21,000" },
    ],
  },
  {
    label: "Product Leadership",
    slug: "product-leadership",
    icon: "🚀",
    courses: [
      { label: "The Mini CEO Program",             href: "/courses/the-mini-ceo-program",             img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48",  available: true,  duration: "12 Weeks", mode: "Online", fee: "₹25,000" },
      { label: "AI Product Management Mastery",    href: "/courses/ai-product-management-mastery",    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=48",  available: true,  duration: "10 Weeks", mode: "Hybrid", fee: "₹22,000" },
      { label: "Product Management for Techies",   href: "/courses/product-leadership",               img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=48",  available: false, duration: "8 Weeks",  mode: "Online", fee: "₹18,000" },
      { label: "Design Thinking & User Solutions", href: "/courses/product-leadership",               img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=48",  available: false, duration: "6 Weeks",  mode: "Online", fee: "₹15,000" },
      { label: "Business Analysis Foundation",     href: "/courses/product-leadership",               img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=48",  available: false, duration: "8 Weeks",  mode: "Hybrid", fee: "₹17,000" },
    ],
  },
  {
    label: "Data & GenAI",
    slug: "data-analytics-genai",
    icon: "📊",
    courses: [
      { label: "Data to Decisions: Power BI & AI", href: "/courses/data-decisions",                  img: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=48",  available: true,  duration: "10 Weeks", mode: "Online", fee: "₹20,000" },
      { label: "AI & ML for Business Leaders",     href: "/courses/ai-ml-business-leaders",           img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=48",  available: true,  duration: "12 Weeks", mode: "Hybrid", fee: "₹23,000" },
      { label: "Strategic Data Analytics",         href: "/courses/data-analytics-genai",             img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=48",  available: false, duration: "10 Weeks", mode: "Online", fee: "₹19,000" },
    ],
  },
  {
    label: "Technology & Dx",
    slug: "technology-digital-transformation",
    icon: "⚙️",
    courses: [
      { label: "Digital Business Strategy & Innovation", href: "/courses/digital-business-strategy-innovation", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=48", available: true,  duration: "10 Weeks", mode: "Online", fee: "₹21,000" },
      { label: "AI & Digital Project Management",        href: "/courses/technology-digital-transformation",   img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=48", available: false, duration: "8 Weeks",  mode: "Hybrid", fee: "₹18,000" },
      { label: "Emerging Technologies & Industry 4.0",   href: "/courses/technology-digital-transformation",   img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=48", available: false, duration: "12 Weeks", mode: "Online", fee: "₹22,000" },
    ],
  },
];

/* ── Single course row — mirrors Navbar CourseRow ── */
function FooterCourseRow({ c }) {
  const [activeInfo, setActiveInfo] = useState(null);
  const INFO_TABS = [
    { key: "duration", label: "Duration", value: c.duration, color: "#4f46e5", bg: "#ede9fe" },
    { key: "mode",     label: "Mode",     value: c.mode,     color: "#0891b2", bg: "#e0f2fe" },
    { key: "fee",      label: "Fee",      value: c.fee,      color: "#059669", bg: "#d1fae5" },
  ];
  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      opacity: c.available ? 1 : 0.62,
      transition: "background .12s",
      borderRadius: "0.375rem",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.5rem 0.15rem" }}>
        <a href={c.href} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, textDecoration: "none", minWidth: 0 }}>
          <img src={c.img} alt={c.label} style={{ width: 22, height: 22, borderRadius: "0.25rem", objectFit: "cover", flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: "0.75rem", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{c.label}</span>
        </a>
        {c.available
          ? <Link to={`/register?course=${encodeURIComponent(c.label)}`} style={{ fontSize: "0.52rem", fontWeight: 700, background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: 999, flexShrink: 0, textDecoration: "none", whiteSpace: "nowrap" }}>Register</Link>
          : <span style={{ fontSize: "0.52rem", fontWeight: 700, background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", padding: "1px 6px", borderRadius: 999, flexShrink: 0 }}>Closed</span>
        }
      </div>
      {/* Info pill row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0 0.5rem 0.35rem 2.75rem" }}>
        {INFO_TABS.map(t => (
          <button key={t.key}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveInfo(activeInfo === t.key ? null : t.key); }}
            style={{
              fontSize: "0.55rem", fontWeight: 700, padding: "0.08rem 0.35rem", borderRadius: 999,
              border: activeInfo === t.key ? `1px solid ${t.color}` : "1px solid rgba(255,255,255,0.15)",
              background: activeInfo === t.key ? t.bg : "rgba(255,255,255,0.06)",
              color: activeInfo === t.key ? t.color : "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
            }}
          >{t.label}</button>
        ))}
        {activeInfo && (() => {
          const t = INFO_TABS.find(x => x.key === activeInfo);
          return <span style={{ fontSize: "0.6rem", fontWeight: 700, color: t.color, background: t.bg, padding: "0.1rem 0.4rem", borderRadius: 999 }}>{t.value}</span>;
        })()}
      </div>
    </div>
  );
}

/* ── Collapsible cert category ── */
function CertGroup({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "0.35rem",
          background: "none", border: "none", cursor: "pointer",
          padding: "0.3rem 0", color: "rgba(255,255,255,0.85)", fontSize: "0.8rem",
          fontWeight: 600, width: "100%", textAlign: "left",
        }}
      >
        <span>{cat.icon}</span>
        <span style={{ flex: 1 }}>{cat.label}</span>
        <span style={{
          fontSize: "0.6rem", transition: "transform .2s", display: "inline-block",
          transform: open ? "rotate(180deg)" : "none", opacity: 0.5,
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          background: "rgba(0,0,0,0.2)", borderRadius: "0.5rem",
          border: "1px solid rgba(255,255,255,0.08)",
          marginTop: "0.25rem", marginBottom: "0.25rem",
          overflow: "hidden",
        }}>
          {cat.courses.map((c, i) => (
            <FooterCourseRow key={i} c={c} />
          ))}
          <Link
            to={`/courses/${cat.slug}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0.4rem", fontSize: "0.68rem", fontWeight: 700,
              color: "#00C9A7", textDecoration: "none",
              background: "rgba(0,201,167,0.06)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            View all {cat.label} courses →
          </Link>
        </div>
      )}
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="w-full text-white">

      {/* ===== MAIN FOOTER ===== */}
      <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold">Upskillize</h3>
            <div className="mt-4 text-sm leading-relaxed text-white/80 space-y-3">
              <div>
                <p className="font-semibold text-white">Regd. Off :</p>
                <p>Ushodaya, Raghavendra Circle, Ramamurthy Nagar, Bangalore – 560016</p>
              </div>
              <div>
                <p className="font-semibold text-white">Training Center :</p>
                <p>3444, Karma Koushalya Bhavan, Service Road, Opp. Attiguppe Metro Station, 2nd Stage, Vijayanagar, Bengaluru - 560040, IN</p>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-base font-semibold mb-3">Social Media</h4>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/upskillize-excel-beyond" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://x.com/upskillize36330" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="X (Twitter)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Programs (with expandable sub-courses) ── */}
          <div>
            <h3 className="text-xl font-bold">Programs</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">

              {/* Higher Education diplomas */}
              <li>
                <Link to="/courses/pgcdb" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <span style={{ fontSize: "0.55rem", background: "#e8f4f0", color: "#0F6E56", padding: "1px 6px", borderRadius: 999, fontWeight: 700 }}>PGDFDB</span>
                  PGDFDB (Two Years)
                </Link>
              </li>
              <li>
                <Link to="/courses/pgcdf" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  <span style={{ fontSize: "0.55rem", background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: 999, fontWeight: 700 }}>ADFBA</span>
                  ADFBA (One Year)
                </Link>
              </li>

              {/* Divider */}
              <li><div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "0.25rem 0" }} /></li>

              {/* Professional Certifications — expandable */}
              <li>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
                  Professional Certifications
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {CERT_CATEGORIES.map(cat => (
                    <CertGroup key={cat.slug} cat={cat} />
                  ))}
                </ul>
              </li>

            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm mt-4">
              <li><Link to="/academic" className="text-white/80 hover:text-white transition-colors">Academic</Link></li>
              <li><Link to="/corporate/consulting" className="text-white/80 hover:text-white transition-colors">Business Consulting</Link></li>
              <li><Link to="/corporate/training" className="text-white/80 hover:text-white transition-colors">Corporate Training</Link></li>
              <li><Link to="/solutions" className="text-white/80 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/register" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                Register
                <span style={{ fontSize: "0.55rem", fontWeight: 700, background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: 999 }}>Enrol</span>
              </Link></li>
            </ul>
            {/* ── Set Up Our Lab CTA ── */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-sm font-semibold text-white mb-3">FinTech &amp; AI Innovation Lab</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg,#00C9A7,#009E85)", boxShadow: "0 4px 14px rgba(0,201,167,.3)" }}
              >
                🚀 Set Up Our Lab →
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="mt-4"><strong className="font-bold text-white/80">Amit Agrawal</strong></p>
            <p className="text-sm">Co-Founder &amp; CGO</p>
            <p className="text-sm text-white/80 mt-2 flex items-center gap-2">📱 +91 98203 97297</p>
            <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              amit@upskillize.com
            </p>

            {/* Partners */}
            <div className="mt-5 pt-4 border-t border-white/20">
              <p className="text-sm font-semibold text-white">Partnerships</p>
              <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                info@upskillize.com
              </p>
              <div className="mt-4 space-y-2">
                <a href="https://www.upskillize.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">www.upskillize.com</span>
                </a>
                <a href="https://lms.upskillize.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">lms.upskillize.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="bg-[#0B1D2A] border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span style={{ fontSize: "0.72rem" }} className="text-white/70 font-medium whitespace-nowrap">
              © {new Date().getFullYear()} Upskillize – Bridging industry &amp; academia
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span style={{ fontSize: "0.65rem" }} className="text-white/50 whitespace-nowrap">Karnataka S&amp;E Reg. No: 36/26/S/0047/2026</span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span style={{ fontSize: "0.65rem" }} className="text-white/50 whitespace-nowrap">Udyam Reg. No: UDYAM-KR-03-0674691</span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span style={{ fontSize: "0.65rem" }} className="text-white/50 whitespace-nowrap">GST Reg. No: 29AAJFU2626F1Z1</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/privacy" style={{ fontSize: "0.72rem" }} className="text-white/70 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" style={{ fontSize: "0.72rem" }} className="text-white/70 hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" style={{ fontSize: "0.72rem" }} className="text-white/70 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}