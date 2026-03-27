import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// ── Icon helper ──
function IconBox({ icon, size = 22, bg = "#ede9fe", radius = ".25rem" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: size, height: size, borderRadius: radius,
      background: bg, flexShrink: 0, fontSize: size * 0.55, lineHeight: 1,
    }}>{icon}</span>
  );
}

// ── Course data ──
const CERT_CATEGORIES = [
  {
    label: "AI in FinTech",
    slug: "ai-fintech",
    icon: "🏦",
    courses: [
      { label: "FinTech Domain Excellence",        href: "/courses/bfsi-domain-excellence-program",        icon: "🏦", iconBg: "#dbeafe", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Investment Banking & Wealth Tech",  href: "/courses/investment-banking-wealth-tech",        icon: "📈", iconBg: "#dcfce7", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Risk Management & RegTech",         href: "/courses/risk-management-regtech-program",       icon: "🛡️", iconBg: "#fef3c7", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "FinTech & AI Mastery",              href: "/courses/ai-fintech",                            icon: "🤖", iconBg: "#f3e8ff", available: false, duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Insurance, InsurTech & DPDPA",      href: "/courses/ai-fintech",                            icon: "🔐", iconBg: "#fce7f3", available: false, duration: "3 Months", mode: "Online / Hybrid" },
      { label: "AI in Financial Services",          href: "/courses/ai-fintech",                            icon: "💹", iconBg: "#d1fae5", available: false, duration: "3 Months", mode: "Online / Hybrid" },
    ],
  },
  {
    label: "Product Leadership",
    slug: "product-leadership",
    icon: "🚀",
    courses: [
      { label: "The Mini CEO Program",              href: "/courses/the-mini-ceo-program",                  icon: "👑", iconBg: "#fef9c3", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "AI Product Management Mastery",     href: "/courses/ai-product-management-mastery",         icon: "🎯", iconBg: "#ede9fe", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Product Management for Techies",    href: "/courses/product-leadership",                    icon: "💻", iconBg: "#e0f2fe", available: false, duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Design Thinking & User Solutions",  href: "/courses/product-leadership",                    icon: "🎨", iconBg: "#fce7f3", available: false, duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Business Analysis Foundation",      href: "/courses/product-leadership",                    icon: "📊", iconBg: "#d1fae5", available: false, duration: "3 Months", mode: "Online / Hybrid" },
    ],
  },
  {
    label: "Data & GenAI",
    slug: "data-analytics-genai",
    icon: "📊",
    courses: [
      { label: "Data to Decisions: Power BI & AI",  href: "/courses/data-decisions",                        icon: "📉", iconBg: "#dbeafe", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "AI & ML for Business Leaders",      href: "/courses/ai-ml-business-leaders",                icon: "🧠", iconBg: "#f3e8ff", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Strategic Data Analytics",          href: "/courses/data-analytics-genai",                  icon: "🔍", iconBg: "#fef3c7", available: false, duration: "3 Months", mode: "Online / Hybrid" },
    ],
  },
  {
    label: "Technology & Dx",
    slug: "technology-digital-transformation",
    icon: "⚙️",
    courses: [
      { label: "Digital Business Strategy & Innovation", href: "/courses/digital-business-strategy-innovation", icon: "🌐", iconBg: "#d1fae5", available: true,  duration: "3 Months", mode: "Online / Hybrid" },
      { label: "AI & Digital Project Management",        href: "/courses/technology-digital-transformation",   icon: "⚡", iconBg: "#fef9c3", available: false, duration: "3 Months", mode: "Online / Hybrid" },
      { label: "Emerging Technologies & Industry 4.0",   href: "/courses/technology-digital-transformation",   icon: "🏭", iconBg: "#e0f2fe", available: false, duration: "3 Months", mode: "Online / Hybrid" },
    ],
  },
];

// ── Course row component ──
function CourseRow({ c, onSelect }) {
  const [activeInfo, setActiveInfo] = useState(null);
  const INFO_TABS = [
    { key: "duration", label: "Duration", value: c.duration, color: "#4f46e5", bg: "#ede9fe" },
    { key: "mode",     label: "Mode",     value: c.mode,     color: "#0891b2", bg: "#e0f2fe" },
  ];
  return (
    <div
      style={{ borderBottom: "1px solid #f3f4f6", opacity: c.available ? 1 : 0.62, transition: "background .12s" }}
      onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; onSelect && onSelect(c.label); }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; onSelect && onSelect(null); }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: ".4rem", padding: ".28rem .75rem .15rem" }}>
        <a href={c.href} style={{ display: "flex", alignItems: "center", gap: ".4rem", flex: 1, textDecoration: "none", minWidth: 0 }}>
          <IconBox icon={c.icon} size={19} bg={c.iconBg} />
          <span style={{ flex: 1, fontSize: ".78rem", fontWeight: 600, color: "#1f2937", lineHeight: 1.25 }}>{c.label}</span>
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: ".2rem", padding: "0 .75rem .25rem 2.55rem" }}>
        {INFO_TABS.map(t => (
          <button key={t.key}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveInfo(activeInfo === t.key ? null : t.key); }}
            style={{
              fontSize: ".67rem", fontWeight: 700, padding: ".1rem .38rem", borderRadius: 999,
              border: activeInfo === t.key ? `1px solid ${t.color}` : "1px solid #e5e7eb",
              background: activeInfo === t.key ? t.bg : "#f9fafb",
              color: activeInfo === t.key ? t.color : "#6b7280",
              cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
            }}
          >{t.label}</button>
        ))}
        {activeInfo && (() => {
          const t = INFO_TABS.find(x => x.key === activeInfo);
          return (
            <span style={{ fontSize: ".72rem", fontWeight: 700, color: t.color, background: t.bg, padding: ".12rem .5rem", borderRadius: 999, marginLeft: ".1rem" }}>
              {t.value}
            </span>
          );
        })()}
      </div>
    </div>
  );
}

// ── Pill badge ──
function Pill({ children, bg, color }) {
  return (
    <span style={{ fontSize: ".5rem", background: bg, borderRadius: 3, padding: "1px 4px", color, fontWeight: 600, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

// ── Main Navbar ──
export default function Navbar() {
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [industryOpen,   setIndustryOpen]   = useState(false);
  const [activeCertTab,  setActiveCertTab]  = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileIndustry, setMobileIndustry] = useState(false);
  const [mobileCorp,     setMobileCorp]     = useState(false);
  const [mobileProd,     setMobileProd]     = useState(false);
  const [mobileCareer,   setMobileCareer]   = useState(false);
  const [mobileLab,      setMobileLab]      = useState(false);
  const [mobileAbout,    setMobileAbout]    = useState(false);

  const industryTimer = useRef(null);

  const handleTabChange = (i) => { setActiveCertTab(i); setSelectedCourse(null); };

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false); setMobileIndustry(false); setMobileCorp(false);
    setMobileProd(false); setMobileCareer(false); setMobileLab(false);
    setMobileAbout(false); setIndustryOpen(false);
  };

  const onEnter = () => { clearTimeout(industryTimer.current); setIndustryOpen(true); };
  const onLeave = () => { industryTimer.current = setTimeout(() => setIndustryOpen(false), 160); };

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box}
        :root{
          --c-bg:#fff;--c-border:#e5e7eb;--c-text:#1f2937;
          --c-muted:#6b7280;--c-indigo:#4f46e5;--c-cyan:#0891b2;
          --c-hover-bg:#f5f3ff;--c-hover:#4f46e5;
          --shadow:0 8px 32px rgba(0,0,0,.11);
        }

        /* ── NAV BAR ── */
        .nb{position:fixed;top:0;left:0;right:0;z-index:9999}
        .nb-bar{background:var(--c-bg);border-bottom:1px solid transparent;transition:border-color .25s,box-shadow .25s,backdrop-filter: blur(8px);}
        .nb-bar.scrolled{border-color:var(--c-border);box-shadow:0 2px 14px rgba(0,0,0,.07)}
        .nb-inner{ width:100%;margin:0 auto;padding:0 1rem;height:56px;width:100%;display:flex;align-items:center;justify-content:space-between;}
        .nb-logo{display:flex;align-items:center;text-decoration:none;flex-shrink:0;margin-right:1rem}
        .nb-logo img{height:36px;width:auto;display:block}
        .nb-logo-text{font-size:1.1rem;font-weight:800;color:var(--c-indigo);display:none}
        .nb-desk{display:none;flex:1;align-items:center;justify-content:space-between;min-width:0}
        @media(min-width:768px){.nb-desk{display:flex!important}}
        .nb-left{display:flex;align-items:center;gap:0;flex-wrap:nowrap}
        .nb-right{display:flex;align-items:center;gap:.25rem;margin-left:auto;flex-shrink:0}
        .nbb{display:inline-flex;align-items:center;gap:.2rem;padding:.38rem .55rem;border-radius:.4rem;
          font-size:.78rem;font-weight:500;color:var(--c-text);background:none;border:none;
          cursor:pointer;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}
        .nbb:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .nbc{transition:transform .2s;flex-shrink:0;width:13px;height:13px}

        /* Simple dropdowns */
        .nbd{position:relative}
        .nbd-menu{position:absolute;top:calc(100% + 8px);left:0;background:var(--c-bg);
          border:1px solid var(--c-border);border-radius:.75rem;box-shadow:var(--shadow);
          min-width:190px;padding:.375rem 0;opacity:0;visibility:hidden;
          transform:translateY(-6px);transition:all .18s ease;z-index:99999;}
        .nbd-menu.r{left:auto;right:0}
        .nbd:hover .nbd-menu{opacity:1;visibility:visible;transform:translateY(0)}
        .nbd-item{display:block;padding:.6rem 1rem;font-size:.875rem;font-weight:500;
          color:var(--c-text);text-decoration:none;transition:background .12s,color .12s}
        .nbd-item:hover{background:var(--c-hover-bg);color:var(--c-hover)}

        /* ── HIGHER EDUCATION MEGA PANEL ── */
        .nb-ind{position:relative}
        .nb-panel{
          position:absolute;top:calc(100% + 6px);left:0;
          background:transparent;
          width:min(700px, 95vw);
          display:grid;grid-template-columns:192px 1fr;column-gap:8px;
          align-items:stretch;
          opacity:0;visibility:hidden;transform:translateY(-8px);
          transition:all .2s cubic-bezier(.4,0,.2,1);z-index:99999;
        }
        .nb-panel.open{opacity:1;visibility:visible;transform:translateY(0)}

        /* COL 1 – Institutions */
        .nb-left-col{
          display:flex;flex-direction:column;
          background:#fff;border:1px solid #e0e7ff;border-radius:.75rem;overflow:hidden;
          box-shadow:0 4px 18px rgba(79,70,229,.08);
        }
        .nb-col-header{
          font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
          color:#fff;padding:.35rem .65rem .3rem;flex-shrink:0;
          background:linear-gradient(135deg,#4f46e5,#7c3aed);
        }
        .nb-prog-section-label{
          padding:.22rem .65rem .06rem;font-size:.54rem;font-weight:700;
          letter-spacing:.06em;text-transform:uppercase;color:#0891b2;display:block;
          background:linear-gradient(160deg,#f8faff,#f5f3ff);
        }
        .nb-prog-row{
          display:flex;flex-direction:column;padding:0;text-decoration:none;
          transition:background .12s;border-bottom:1px solid #f3f4f6;
        }
        .nb-prog-row:hover{background:#f5f3ff}
        .nb-prog-thumb{
          width:100%;height:48px;overflow:hidden;flex-shrink:0;position:relative;
        }
        .nb-prog-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
        .nb-prog-row:hover .nb-prog-thumb img{transform:scale(1.04)}
        .nb-prog-new{
          position:absolute;bottom:3px;right:4px;font-size:.5rem;font-weight:800;z-index:1;
          background:#FAEEDA;color:#633806;padding:1px 3px;border-radius:2px;
        }
        .nb-prog-info{flex:1;min-width:0;padding:.25rem .65rem .12rem}
        .nb-prog-badge{
          display:inline-block;font-size:.52rem;font-weight:800;
          padding:.04rem .3rem;border-radius:999px;margin-bottom:.08rem;
        }
        .nb-prog-title{font-size:.68rem;font-weight:700;color:#111827;line-height:1.2;margin-bottom:.1rem}
        .nb-prog-pills{display:flex;flex-wrap:wrap;gap:.1rem}
        .nb-prog-divider{height:1px;background:#ede9fe;margin:0}
        .nb-prog-section{display:flex;flex-direction:column;flex:1;min-height:0}
        .nb-prog-footer{flex-shrink:0;margin-top:auto}
        .nb-prog-footer-btn{
          display:flex;align-items:center;justify-content:center;
          gap:.25rem;width:100%;padding:.32rem .65rem;
          font-size:.68rem;font-weight:700;color:#fff;text-decoration:none;
          transition:opacity .15s;white-space:nowrap;
        }
        .nb-prog-footer-btn:hover{opacity:.88}
        .nb-prog-footer-indigo{background:#4f46e5;border-top:2px solid #4338ca}
        .nb-prog-footer-green{background:#059669;border-top:2px solid #047857;border-radius:0 0 .75rem .75rem}

        /* COL 2 – Certifications */
        .nb-certcol{
          display:flex;flex-direction:column;
          background:#fff;border:1px solid #e0e7ff;border-radius:.75rem;overflow:hidden;
          box-shadow:0 4px 18px rgba(124,58,237,.08);
        }
        .nb-certcol-header{
          display:block;padding:.35rem .65rem .3rem;font-size:.6rem;font-weight:700;
          letter-spacing:.06em;text-transform:uppercase;color:#fff;flex-shrink:0;
          background:linear-gradient(135deg,#7c3aed,#4f46e5);
        }
        .nb-cert-tabs{
          display:grid;grid-template-columns:repeat(4,1fr);
          border-bottom:1px solid var(--c-border);background:#fafafa;flex-shrink:0;
        }
        .nb-cert-tab{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:.08rem;padding:.28rem .18rem;font-size:.58rem;font-weight:600;color:#6b7280;
          background:none;border:none;border-right:1px solid #f3f4f6;
          cursor:pointer;transition:all .18s;text-align:center;line-height:1.15;
          border-bottom:2px solid transparent;
        }
        .nb-cert-tab:last-child{border-right:none}
        .nb-cert-tab:hover{background:#f5f3ff;color:#4f46e5}
        .nb-cert-tab.active{background:#fff;color:#4f46e5;font-weight:700;border-bottom:2px solid #4f46e5}
        .nb-cert-tab-icon{font-size:.85rem;line-height:1}
        .nb-cert-courses{flex:1;max-height:300px;overflow-y:auto}
        .nb-cert-list{animation:slideIn .2s cubic-bezier(.4,0,.2,1)}
        @keyframes slideIn{from{opacity:0;transform:translateX(6px)}to{opacity:1;transform:translateX(0)}}
        .nb-cert-footer{flex-shrink:0;width:100%}
        .nb-cert-footer a{
          display:flex;align-items:center;justify-content:center;
          gap:.3rem;width:100%;padding:.38rem .65rem;
          font-size:.72rem;font-weight:700;color:#fff;text-decoration:none;
          background:#4f46e5;border-top:2px solid #4338ca;
          border-radius:0 0 .75rem .75rem;
          transition:background .2s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        }
        .nb-cert-footer a:hover{background:#4338ca}

        /* ── MOBILE ── */
        .nb-ham{display:flex;padding:.5rem;border:none;background:transparent;
          cursor:pointer;color:var(--c-text);border-radius:.375rem;transition:background .15s}
        .nb-ham:hover{background:#f3f4f6}
        .nb-mob{position:fixed;top:0;left:0;right:0;height:100vh;background:#fff;padding-top:56px;
          overflow-y:auto;transform:translateX(100%);
          transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:10000}
        .nb-mob.open{transform:translateX(0)}
        @media(min-width:768px){
          .nb-ham{display:none!important}
          .nb-mob{display:none!important}
          .nb-mob.open{display:none!important}
        }
        .nb-mnav{padding:.75rem 1rem 4rem;display:flex;flex-direction:column;gap:.125rem}
        .ma{display:flex;align-items:center;justify-content:space-between;
          padding:1rem;border-radius:.5rem;font-size:.975rem;font-weight:600;
          color:var(--c-text);background:none;border:none;cursor:pointer;
          width:100%;text-align:left;transition:background .13s}
        .ma:hover{background:#f9fafb}
        .mc{transition:transform .2s}.mc.o{transform:rotate(180deg)}
        .ml{display:block;padding:.875rem;border-radius:.5rem;font-size:.975rem;
          font-weight:600;color:var(--c-text);text-decoration:none;transition:background .13s}
        .ml:hover{background:#f9fafb}
        .mp{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.4,0,.2,1);
          padding-left:.5rem;border-left:3px solid #e0e7ff;margin-left:.875rem;margin-bottom:.25rem}
        .mp.o{max-height:3200px}
        .ms{display:block;padding:.625rem .75rem .35rem;font-size:.67rem;
          font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-cyan)}
        .msl{display:flex;align-items:center;gap:.5rem;padding:.55rem .75rem;
          border-radius:.375rem;font-size:.875rem;font-weight:500;color:#374151;
          text-decoration:none;transition:background .12s,color .12s}
        .msl:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .mdiv{height:1px;background:#f3f4f6;margin:.375rem 0}
        .nb-sp{height:56px}
        @media(min-width:768px){.nb-sp{ height:56px}}
        @media(max-width:767px){.nb-inner{padding:0 .75rem}.nb-logo img{height:32px}}
        @media(max-width:480px){.nb-logo img{height:28px}.nb-inner{padding:0 .5rem}}
        
  .nb-left, .nb-right {
  min-width: 0;
}

.nbb {
  overflow: hidden;
  text-overflow: ellipsis;
}
      `}</style>

      <div className="nb">
        <header className={`nb-bar${isScrolled ? " scrolled" : ""}`}>
          <div className="nb-inner">
            {/* Logo */}
            <Link to="/" className="nb-logo" onClick={closeAll}>
              <img
                src="/images/logo.png"
                alt="Upskillize"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "block";
                }}
              />
              <span className="nb-logo-text">Upskillize</span>
            </Link>

            {/* ── DESKTOP ── */}
            <div className="nb-desk">
              <div className="nb-left">

                {/* Higher Education */}
                <div className="nb-ind" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                  <button className="nbb" aria-haspopup="true" aria-expanded={industryOpen}>
                    Higher Education
                    <ChevronDown
                      size={15}
                      className="nbc"
                      style={{ transform: industryOpen ? "rotate(180deg)" : "rotate(0)" }}
                    />
                  </button>

                  <div className={`nb-panel${industryOpen ? " open" : ""}`}>

                    {/* COL 1: For Institutions */}
                    <div className="nb-left-col">
                      <div className="nb-col-header">For Institutions</div>

                      {/* Two Years */}
                      <div className="nb-prog-section">
                        <span className="nb-prog-section-label">Two Years</span>
                        <Link to="/courses/pgdfdb" className="nb-prog-row" onClick={closeAll}>
                          <div className="nb-prog-thumb">
                            <img src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=200&q=80" alt="PGDFDB" />
                            <span className="nb-prog-new">NEW</span>
                          </div>
                          <div className="nb-prog-info">
                            <span className="nb-prog-badge" style={{ background: "#e8f4f0", color: "#0F6E56" }}>PGDFDB</span>
                            <div className="nb-prog-title">PG Diploma in FinTech &amp; Digital Business</div>
                            <div className="nb-prog-pills">
                              <Pill bg="#fef3c7" color="#92400e">Parallel to MBA/PGDM</Pill>
                              <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                              <Pill bg="#f4f6fb" color="#6b7fa3">4 Semesters</Pill>
                            </div>
                          </div>
                        </Link>
                        <div className="nb-prog-footer">
                          <Link
                            to="/register?course=PG%20Diploma%20in%20FinTech%20%26%20Digital%20Business"
                            onClick={closeAll}
                            className="nb-prog-footer-btn nb-prog-footer-indigo"
                          >
                            ✦ Register for PGDFDB →
                          </Link>
                        </div>
                      </div>

                      <div className="nb-prog-divider" />

                      {/* One Year */}
                      <div className="nb-prog-section">
                        <span className="nb-prog-section-label">One Year</span>
                        <a href="/courses/pgcdf" className="nb-prog-row" onClick={closeAll}>
                          <div className="nb-prog-thumb">
                            <img src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=200&q=80" alt="ADFBA" />
                          </div>
                          <div className="nb-prog-info">
                            <span className="nb-prog-badge" style={{ background: "#dcfce7", color: "#15803d" }}>ADFBA</span>
                            <div className="nb-prog-title">Advanced Diploma in FinTech, Banking &amp; AI</div>
                            <div className="nb-prog-pills">
                              <Pill bg="#fef3c7" color="#92400e">Final Year &amp; Above</Pill>
                              <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                              <Pill bg="#f4f6fb" color="#6b7fa3">6 Bimesters</Pill>
                            </div>
                          </div>
                        </a>
                        <div className="nb-prog-footer">
                          <Link
                            to="/register?course=Advanced%20Diploma%20in%20FinTech%2C%20Banking%20%26%20AI"
                            onClick={closeAll}
                            className="nb-prog-footer-btn nb-prog-footer-green"
                          >
                            ✦ Register for ADFBA →
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* COL 2: Professional Certifications */}
                    <div className="nb-certcol">
                      <span className="nb-certcol-header">Professional Certifications</span>

                      <div className="nb-cert-tabs">
                        {CERT_CATEGORIES.map((cat, i) => (
                          <button
                            key={cat.slug}
                            className={`nb-cert-tab${activeCertTab === i ? " active" : ""}`}
                            onClick={() => handleTabChange(i)}
                          >
                            <span className="nb-cert-tab-icon">{cat.icon}</span>
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="nb-cert-courses">
                        <div key={activeCertTab} className="nb-cert-list">
                          {CERT_CATEGORIES[activeCertTab].courses.map((c, i) => (
                            <CourseRow key={i} c={c} onSelect={setSelectedCourse} />
                          ))}
                        </div>
                      </div>

                      <div className="nb-cert-footer">
                        <Link
                          to={`/register?course=${encodeURIComponent(selectedCourse || CERT_CATEGORIES[activeCertTab].label)}`}
                          onClick={closeAll}
                        >
                          ✦ Register for {selectedCourse || CERT_CATEGORIES[activeCertTab].label} →
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Corporates */}
                <div className="nbd">
                  <button className="nbb">Corporates <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <Link to="/corporate/consulting" className="nbd-item">Business Consulting</Link>
                    <a href="/corporate/training"    className="nbd-item">Corporate Training</a>
                  </div>
                </div>

                {/* AI Products */}
                <div className="nbd">
                  <button className="nbb">AI Products <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <a href="/products/compliize" className="nbd-item">Data Complize</a>
                    <a href="/products/optimize"  className="nbd-item">Cost Optimize</a>
                    <a href="/products/vendorize" className="nbd-item">De-risk Vendorize</a>
                  </div>
                </div>

                {/* BFSI Lab */}
                <div className="nbd">
                  <button className="nbb">BFSI Lab <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <a href="/bfsiinnovationlab"          className="nbd-item">Explore the Lab</a>
                  </div>
                </div>

                {/* Career Accelerator */}
                <div className="nbd">
                  <button className="nbb">Career Accelerator <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <a href="/careers/internship" className="nbd-item">Internship Program</a>
                    <a href="/careers/placement"  className="nbd-item">Placement Assistance</a>
                  </div>
                </div>

              </div>

              <div className="nb-right">
                <div className="nbd">
                  <button className="nbb">About <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu r">
                    <a href="/about"             className="nbd-item">About Us</a>
                    <a href="/about/eco-pro-lms" className="nbd-item">EcoPro LMS</a>
                  </div>
                </div>
                <Link to="/contact" className="nbb">Contact Us</Link>
              </div>
            </div>

            {/* Hamburger */}
            <button
              className="nb-ham"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </header>

        {/* ── MOBILE MENU ── */}
        <nav className={`nb-mob${mobileOpen ? " open" : ""}`}>
          <div className="nb-mnav">

            {/* Higher Education */}
            <button className="ma" onClick={() => setMobileIndustry(v => !v)}>
              Higher Education <ChevronDown size={18} className={`mc${mobileIndustry ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileIndustry ? " o" : ""}`}>
              <span className="ms">For Institutions</span>
              <a href="/about" onClick={closeAll} className="msl">🏛️ Upskillize Institute of FinTech &amp; AI</a>
              <div className="mdiv" />

              <span className="ms">Two Years</span>
              <a href="/courses/pgdfdb" onClick={closeAll} className="msl" style={{ flexDirection: "column", alignItems: "flex-start", gap: ".3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                  <span style={{ background: "#CCFBF1", color: "#065F46", fontSize: ".7rem", fontWeight: 700, padding: ".15rem .45rem", borderRadius: 999 }}>PGDFDB</span>
                  PG Diploma in FinTech &amp; Digital Business
                  <span style={{ fontSize: ".65rem", fontWeight: 700, background: "#FAEEDA", color: "#633806", padding: ".1rem .35rem", borderRadius: 3 }}>NEW</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".22rem" }}>
                  <Pill bg="#fef3c7" color="#92400e">Parallel to MBA/PGDM</Pill>
                  <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                  <Pill bg="#f4f6fb" color="#6b7fa3">4 Semesters</Pill>
                </div>
              </a>
              <Link
                to="/register?course=PG%20Diploma%20in%20FinTech%20%26%20Digital%20Business"
                onClick={closeAll}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem",
                  margin: ".2rem .75rem .35rem", padding: ".45rem", borderRadius: ".375rem",
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff",
                  fontWeight: 700, fontSize: ".8rem", textDecoration: "none",
                }}
              >
                ✦ Register for PGDFDB →
              </Link>
              <div className="mdiv" />

              <span className="ms">One Year</span>
              <a href="/courses/pgcdf" onClick={closeAll} className="msl" style={{ flexDirection: "column", alignItems: "flex-start", gap: ".3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                  <span style={{ background: "#dcfce7", color: "#15803d", fontSize: ".7rem", fontWeight: 700, padding: ".15rem .45rem", borderRadius: 999 }}>ADFBA</span>
                  Advanced Diploma in FinTech, Banking &amp; AI
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".22rem" }}>
                  <Pill bg="#fef3c7" color="#92400e">Final Year &amp; Above</Pill>
                  <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                  <Pill bg="#f4f6fb" color="#6b7fa3">6 Bimesters</Pill>
                </div>
              </a>
              <Link
                to="/register?course=Advanced%20Diploma%20in%20FinTech%2C%20Banking%20%26%20AI"
                onClick={closeAll}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem",
                  margin: ".2rem .75rem .35rem", padding: ".45rem", borderRadius: ".375rem",
                  background: "linear-gradient(135deg,#059669,#047857)", color: "#fff",
                  fontWeight: 700, fontSize: ".8rem", textDecoration: "none",
                }}
              >
                ✦ Register for ADFBA →
              </Link>
              <div className="mdiv" />

              <span className="ms">Professional Certifications</span>
              {CERT_CATEGORIES.map(cat => (
                <div key={cat.slug}>
                  <a href={`/courses/${cat.slug}`} onClick={closeAll} className="msl" style={{ fontWeight: 700, gap: ".4rem" }}>
                    <span>{cat.icon}</span> {cat.label}
                  </a>
                  {cat.courses.map(c => (
                    <div
                      key={c.label}
                      style={{
                        display: "flex", alignItems: "center", gap: ".4rem",
                        padding: ".35rem .75rem .35rem 1.5rem", borderRadius: ".375rem",
                        opacity: c.available ? 1 : 0.6, transition: "background .12s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <a
                        href={c.href}
                        onClick={closeAll}
                        style={{
                          display: "flex", alignItems: "center", gap: ".4rem",
                          flex: 1, textDecoration: "none", color: "#4b5563",
                          fontSize: ".8rem", fontWeight: 400, minWidth: 0,
                        }}
                      >
                        <IconBox icon={c.icon} size={17} bg={c.iconBg} radius=".2rem" />
                        <span style={{ flex: 1 }}>› {c.label}</span>
                      </a>
                      <div style={{ display: "flex", gap: ".2rem", flexShrink: 0 }}>
                        <span style={{ fontSize: ".55rem", background: "#ede9fe", color: "#4f46e5", padding: ".08rem .28rem", borderRadius: 999, fontWeight: 600 }}>3 Months</span>
                        <span style={{ fontSize: ".55rem", background: "#e0f2fe", color: "#0891b2", padding: ".08rem .28rem", borderRadius: 999, fontWeight: 600 }}>Online / Hybrid</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Corporates */}
            <button className="ma" onClick={() => setMobileCorp(v => !v)}>
              Corporates <ChevronDown size={18} className={`mc${mobileCorp ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileCorp ? " o" : ""}`}>
              <a href="/corporate/consulting" onClick={closeAll} className="msl">Business Consulting</a>
              <a href="/corporate/training"   onClick={closeAll} className="msl">Corporate Training</a>
            </div>

            {/* AI Products */}
            <button className="ma" onClick={() => setMobileProd(v => !v)}>
              AI Products <ChevronDown size={18} className={`mc${mobileProd ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileProd ? " o" : ""}`}>
              <a href="/products/compliize" onClick={closeAll} className="msl">Data Complize</a>
              <a href="/products/optimize"  onClick={closeAll} className="msl">Cost Optimize</a>
              <a href="/products/vendorize" onClick={closeAll} className="msl">De-risk Vendorize</a>
            </div>

            {/* BFSI Lab */}
            <button className="ma" onClick={() => setMobileLab(v => !v)}>
              BFSI Lab <ChevronDown size={18} className={`mc${mobileLab ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileLab ? " o" : ""}`}>
              <a href="/bfsiinnovationlab"          onClick={closeAll} className="msl">Explore the Lab</a>
              <a href="/bfsiinnovationlab/projects" onClick={closeAll} className="msl">Lab Projects</a>
              <a href="/bfsiinnovationlab/mentors"  onClick={closeAll} className="msl">Expert Mentors</a>
              <a href="/connect"                    onClick={closeAll} className="msl">Set Up Our Lab</a>
            </div>

            {/* Career Accelerator */}
            <button className="ma" onClick={() => setMobileCareer(v => !v)}>
              Career Accelerator <ChevronDown size={18} className={`mc${mobileCareer ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileCareer ? " o" : ""}`}>
              <a href="/careers/internship" onClick={closeAll} className="msl">Internship Program</a>
              <a href="/careers/placement"  onClick={closeAll} className="msl">Placement Assistance</a>
            </div>

            <div className="mdiv" />

            {/* About */}
            <button className="ma" onClick={() => setMobileAbout(v => !v)}>
              About <ChevronDown size={18} className={`mc${mobileAbout ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileAbout ? " o" : ""}`}>
              <a href="/about"             onClick={closeAll} className="msl">About Us</a>
              <a href="/about/eco-pro-lms" onClick={closeAll} className="msl">EcoPro LMS</a>
            </div>

            <a href="/contact" onClick={closeAll} className="ml">Contact Us</a>

          </div>
        </nav>
      </div>

      {/* Spacer — keeps page content below the fixed navbar */}
      <div className="nb-sp" />
    </>
  );
}