import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

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

function CourseRow({ c }) {
  const [activeInfo, setActiveInfo] = useState(null);
  const INFO_TABS = [
    { key: "duration", label: "Duration", value: c.duration, color: "#4f46e5", bg: "#ede9fe" },
    { key: "mode",     label: "Mode",     value: c.mode,     color: "#0891b2", bg: "#e0f2fe" },
    { key: "fee",      label: "Fee",      value: c.fee,      color: "#059669", bg: "#d1fae5" },
  ];
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6", opacity: c.available ? 1 : 0.62, transition: "background .12s" }}
      onMouseEnter={e => e.currentTarget.style.background="#f9fafb"}
      onMouseLeave={e => e.currentTarget.style.background="transparent"}
    >
      {/* Top row: thumbnail + label + Register/Closed */}
      <div style={{ display:"flex", alignItems:"center", gap:".5rem", padding:".35rem .875rem .2rem" }}>
        <a href={c.href} style={{ display:"flex", alignItems:"center", gap:".5rem", flex:1, textDecoration:"none", minWidth:0 }}>
          <img src={c.img} alt={c.label} style={{ width:"22px", height:"22px", borderRadius:".25rem", objectFit:"cover", flexShrink:0 }} />
          <span style={{ flex:1, fontSize:".775rem", fontWeight:600, color:"#1f2937", lineHeight:1.3 }}>{c.label}</span>
        </a>
        {!c.available
          ? <span style={{ fontSize:".55rem", fontWeight:700, background:"#e5e7eb", color:"#6b7280", padding:".1rem .3rem", borderRadius:999, flexShrink:0 }}>Closed</span>
          : <Link
              to={`/register?course=${encodeURIComponent(c.label)}`}
              style={{ fontSize:".55rem", fontWeight:700, background:"#dcfce7", color:"#15803d", padding:".1rem .38rem", borderRadius:999, flexShrink:0, textDecoration:"none", whiteSpace:"nowrap" }}
            >Register</Link>
        }
      </div>
      {/* Info tabs row */}
      <div style={{ display:"flex", alignItems:"center", gap:".25rem", padding:"0 .875rem .35rem 2.875rem" }}>
        {INFO_TABS.map(t => (
          <button key={t.key}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveInfo(activeInfo === t.key ? null : t.key); }}
            style={{
              fontSize:".57rem", fontWeight:700, padding:".1rem .38rem", borderRadius:999,
              border: activeInfo === t.key ? `1px solid ${t.color}` : "1px solid #e5e7eb",
              background: activeInfo === t.key ? t.bg : "#f9fafb",
              color: activeInfo === t.key ? t.color : "#6b7280",
              cursor:"pointer", transition:"all .15s", whiteSpace:"nowrap",
            }}
          >{t.label}</button>
        ))}
        {activeInfo && (() => {
          const t = INFO_TABS.find(x => x.key === activeInfo);
          return <span style={{ fontSize:".62rem", fontWeight:700, color:t.color, background:t.bg, padding:".12rem .5rem", borderRadius:999, marginLeft:".1rem" }}>{t.value}</span>;
        })()}
      </div>
    </div>
  );
}

function Pill({ children, bg, color }) {
  return (
    <span style={{ fontSize:".56rem", background:bg, borderRadius:3, padding:"1px 5px", color:color, fontWeight:600, whiteSpace:"nowrap" }}>
      {children}
    </span>
  );
}

export default function Navbar() {
  const [isScrolled,      setIsScrolled]    = useState(false);
  const [mobileOpen,      setMobileOpen]    = useState(false);
  const [industryOpen,    setIndustryOpen]  = useState(false);
  const [labOpen,         setLabOpen]       = useState(false);
  const [activeCertTab,   setActiveCertTab] = useState(0);
  const [mobileIndustry,  setMobileIndustry]= useState(false);
  const [mobileCorp,      setMobileCorp]    = useState(false);
  const [mobileProd,      setMobileProd]    = useState(false);
  const [mobileCareer,    setMobileCareer]  = useState(false);
  const [mobileLab,       setMobileLab]     = useState(false);
  const [mobileAbout,     setMobileAbout]   = useState(false);

  const industryTimer = useRef(null);
  const labTimer      = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false); setMobileIndustry(false); setMobileCorp(false);
    setMobileProd(false); setMobileCareer(false); setMobileLab(false); setMobileAbout(false);
  };

  const onEnter    = () => { clearTimeout(industryTimer.current); setIndustryOpen(true); };
  const onLeave    = () => { industryTimer.current = setTimeout(() => setIndustryOpen(false), 160); };
  const onLabEnter = () => { clearTimeout(labTimer.current); setLabOpen(true); };
  const onLabLeave = () => { labTimer.current = setTimeout(() => setLabOpen(false), 160); };

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

        .nb{position:fixed;top:0;left:0;right:0;z-index:9999}
        .nb-bar{background:var(--c-bg);border-bottom:1px solid transparent;transition:border-color .25s,box-shadow .25s}
        .nb-bar.scrolled{border-color:var(--c-border);box-shadow:0 2px 14px rgba(0,0,0,.07)}
        .nb-inner{max-width:1280px;margin:0 auto;padding:0 1.25rem;height:64px;display:flex;align-items:center}
        .nb-logo{display:flex;align-items:center;text-decoration:none;flex-shrink:0;margin-right:2rem}
        .nb-logo img{height:42px;width:auto;display:block}
        .nb-logo-text{font-size:1.35rem;font-weight:800;color:var(--c-indigo);display:none}
        .nb-desk{display:none;flex:1;align-items:center;justify-content:space-between}
        @media(min-width:1024px){.nb-desk{display:flex}}
        .nb-left{display:flex;align-items:center;gap:.125rem}
        .nb-right{display:flex;align-items:center;gap:.5rem;margin-left:auto}
        .nbb{display:inline-flex;align-items:center;gap:.3rem;padding:.5rem .875rem;border-radius:.5rem;
          font-size:.9rem;font-weight:500;color:var(--c-text);background:none;border:none;
          cursor:pointer;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}
        .nbb:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .nbc{transition:transform .2s;flex-shrink:0}
        .nbd{position:relative}
        .nbd-menu{position:absolute;top:calc(100% + 8px);left:0;background:var(--c-bg);
          border:1px solid var(--c-border);border-radius:.75rem;box-shadow:var(--shadow);
          min-width:190px;padding:.375rem 0;opacity:0;visibility:hidden;
          transform:translateY(-6px);transition:all .18s ease;z-index:10000}
        .nbd-menu.r{left:auto;right:0}
        .nbd:hover .nbd-menu{opacity:1;visibility:visible;transform:translateY(0)}
        .nbd-item{display:block;padding:.6rem 1rem;font-size:.875rem;font-weight:500;
          color:var(--c-text);text-decoration:none;transition:background .12s,color .12s}
        .nbd-item:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .nb-ind{position:relative}

        /* ── HIGHER EDUCATION PANEL – 2 columns ── */
        .nb-panel{
          position:absolute;top:calc(100% + 8px);left:-60px;
          background:var(--c-bg);border:1px solid var(--c-border);
          border-radius:.875rem;box-shadow:var(--shadow);
          width:700px;
          display:grid;grid-template-columns:240px 1fr;
          opacity:0;visibility:hidden;transform:translateY(-8px);
          transition:all .2s cubic-bezier(.4,0,.2,1);z-index:10001;overflow:hidden
        }
        .nb-panel.register{opacity:1;visibility:visible;transform:translateY(0)}

        /* COL 1 – Institution + Two Years + One Year */
        .nb-left-col{
          border-right:1px solid var(--c-border);
          display:flex;flex-direction:column;
          background:linear-gradient(160deg,#f8faff 0%,#f5f3ff 100%);
        }
        .nb-col-header{
          font-size:.58rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
          color:var(--c-cyan);padding:.6rem .875rem .5rem;
          border-bottom:1px solid var(--c-border);
        }
        .nb-inst-card{
          display:flex;flex-direction:column;gap:.4rem;
          padding:.65rem .875rem .6rem;
          border-bottom:1px solid var(--c-border);
        }
        .nb-inst-name{font-size:.82rem;font-weight:800;color:#111827;line-height:1.3}
        .nb-inst-desc{font-size:.64rem;color:#6b7280;line-height:1.5;margin:0}
        .nb-inst-badges{display:flex;flex-wrap:wrap;gap:.25rem}
        .nb-inst-link{
          display:inline-flex;align-items:center;justify-content:center;gap:.3rem;
          background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;
          font-size:.68rem;font-weight:700;padding:.35rem .7rem;border-radius:.4rem;
          text-decoration:none;box-shadow:0 2px 8px rgba(79,70,229,.25);
          transition:opacity .15s;align-self:flex-start;
        }
        .nb-inst-link:hover{opacity:.88}
        .nb-prog-section{padding:.5rem 0 0}
        .nb-prog-label{
          display:block;padding:0 .875rem .35rem;font-size:.58rem;font-weight:700;
          letter-spacing:.05em;text-transform:uppercase;color:var(--c-cyan);
        }
        .nb-prog-card{
          display:flex;flex-direction:column;gap:.25rem;
          padding:.4rem .875rem .5rem;text-decoration:none;
          transition:background .12s;
        }
        .nb-prog-card:hover{background:#eef2ff}
        .nb-prog-thumb{width:100%;height:42px;border-radius:.35rem;overflow:hidden;position:relative}
        .nb-prog-thumb img{width:100%;height:100%;object-fit:cover;display:block}
        .nb-prog-new{
          position:absolute;bottom:4px;right:5px;font-size:.52rem;font-weight:700;
          background:#FAEEDA;color:#633806;padding:1px 4px;border-radius:2px
        }
        .nb-prog-title{font-size:.72rem;font-weight:700;color:#111827;line-height:1.25}
        .nb-prog-pills{display:flex;flex-wrap:wrap;gap:.22rem;margin-top:.03rem}
        .nb-prog-divider{height:1px;background:var(--c-border);margin:.25rem .875rem 0}

        /* COL 2 – Certifications */
        .nb-certcol{display:flex;flex-direction:column;overflow:hidden}
        .nb-certcol-header{
          display:block;padding:.6rem .875rem;font-size:.58rem;font-weight:700;
          letter-spacing:.05em;text-transform:uppercase;color:#7c3aed;
          border-bottom:1px solid var(--c-border);
        }
        .nb-cert-tabs{
          display:grid;grid-template-columns:repeat(4,1fr);
          border-bottom:1px solid var(--c-border);background:#fafafa;
        }
        .nb-cert-tab{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:.18rem;padding:.45rem .3rem;font-size:.62rem;font-weight:600;color:#6b7280;
          background:none;border:none;border-right:1px solid #f3f4f6;
          cursor:pointer;transition:all .15s;text-align:center;line-height:1.25;
          border-bottom:2px solid transparent;
        }
        .nb-cert-tab:last-child{border-right:none}
        .nb-cert-tab:hover{background:#f5f3ff;color:#4f46e5}
        .nb-cert-tab.active{background:#fff;color:#4f46e5;font-weight:700;border-bottom:2px solid #4f46e5}
        .nb-cert-tab-icon{font-size:.95rem;line-height:1}
        .nb-cert-courses{overflow-y:auto;flex:1}
        .nb-cert-courses::-webkit-scrollbar{width:3px}
        .nb-cert-courses::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:4px}

        /* Innovation Lab panel */
       .nb-lab-panel{
          position:absolute;top:calc(100% + 8px);right:0;
          transform:translateY(-8px);
          background:linear-gradient(160deg,#f0fdf9 0%,#f0f7ff 100%);
          border:1px solid var(--c-border);border-radius:.875rem;box-shadow:var(--shadow);
          width:300px;padding:1.25rem 1.25rem 1rem;
          opacity:0;visibility:hidden;
          transition:all .2s cubic-bezier(.4,0,.2,1);z-index:10001
        }
       .nb-lab-panel.open{opacity:1;visibility:visible;transform:translateY(0)}
        .nbb-lab{
          display:inline-flex;align-items:center;gap:.35rem;padding:.45rem .875rem;
          border-radius:.5rem;font-size:.9rem;font-weight:600;
          background:linear-gradient(135deg,#ccfbf1,#a7f3d0);
          color:#065F46;border:none;cursor:pointer;white-space:nowrap;
          transition:all .18s;box-shadow:0 1px 6px rgba(0,201,167,.15)
        }
        .nbb-lab:hover{background:linear-gradient(135deg,#a7f3d0,#6ee7b7);box-shadow:0 2px 12px rgba(0,201,167,.3)}

        .nb-ham{display:flex;padding:.5rem;border:none;background:transparent;
          cursor:pointer;color:var(--c-text);border-radius:.375rem;transition:background .15s}
        .nb-ham:hover{background:#f3f4f6}
        @media(min-width:1024px){.nb-ham{display:none}}
        .nb-mob{position:fixed;top:64px;left:0;right:0;bottom:0;background:#fff;
          overflow-y:auto;transform:translateX(100%);
          transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:10000}
        .nb-mob.open{transform:translateX(0)}
        @media(min-width:1024px){.nb-mob{display:none!important}}
        .nb-mnav{padding:.75rem 1rem 4rem;display:flex;flex-direction:column;gap:.125rem}
        .ma{display:flex;align-items:center;justify-content:space-between;
          padding:.875rem;border-radius:.5rem;font-size:.975rem;font-weight:600;
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
        .nb-sp{height:64px}
        @media(max-width:1023px){.nb-inner{padding:0 .875rem}.nb-logo img{height:38px}}
        @media(max-width:480px){.nb-logo img{height:34px}.nb-inner{padding:0 .625rem}}
      `}</style>

      <div className="nb">
        <header className={`nb-bar${isScrolled ? " scrolled" : ""}`}>
          <div className="nb-inner">

            {/* Logo */}
            <a href="/" className="nb-logo" onClick={closeAll}>
              <img src="/images/logo.png" alt="Upskillize"
                onError={e => { e.target.style.display="none"; e.target.nextElementSibling.style.display="block"; }} />
              <span className="nb-logo-text">Upskillize</span>
            </a>

            {/* ── DESKTOP ── */}
            <div className="nb-desk">
              <div className="nb-left">

                {/* Higher Education */}
                <div className="nb-ind" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                  <button className="nbb" aria-haspopup="true" aria-expanded={industryOpen}>
                    Higher Education
                    <ChevronDown size={15} className="nbc"
                      style={{ transform: industryOpen ? "rotate(180deg)" : "rotate(0)" }} />
                  </button>

                  <div className={`nb-panel${industryOpen ? " register" : ""}`}>

                    {/* ── COL 1 : Institution + Two Years + One Year ── */}
                    <div className="nb-left-col">

                      {/* Institution header */}
                      <div className="nb-col-header"> For Institutions</div>

                      {/* Two Years */}
                      <div className="nb-prog-section">
                        <span className="nb-prog-label">Two Years</span>
                        <div className="nb-prog-card">
                          <a href="/courses/pgdfdb-2t" style={{ textDecoration:"none" }}>
                          <div className="nb-prog-thumb">
                            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400" alt="PGDFDB" />
                            <span className="nb-prog-new">NEW</span>
                          </div>
                          <span style={{ display:"inline-block", fontSize:".57rem", fontWeight:700, padding:".1rem .38rem", borderRadius:999, background:"#e8f4f0", color:"#0F6E56", alignSelf:"flex-start" }}>
                            PGDFDB
                          </span>
                          <div className="nb-prog-title">PG Diploma in FinTech &amp; Digital Business</div>
                          <div className="nb-prog-pills">
                            <Pill bg="#fef3c7" color="#92400e">Parallel to MBA/PGDM</Pill>
                            <Pill bg="#f4f6fb" color="#6b7fa3">Any Graduation</Pill>
                            <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                            <Pill bg="#f4f6fb" color="#6b7fa3">4 Semesters</Pill>
                          </div>
                          </a>
                          <Link to="/register?course=PG%20Diploma%20in%20Digital%20Business%20%26%20FinTech" style={{ display:"flex", alignItems:"center", justifyContent:"center", marginTop:".4rem", padding:".3rem", borderRadius:".35rem", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", fontSize:".62rem", fontWeight:700, textDecoration:"none", gap:".25rem" }}>
                            ✦ Register Now
                          </Link>
                        </div>
                      </div>

                      <div className="nb-prog-divider" />

                      {/* One Year */}
                      <div className="nb-prog-section">
                        <span className="nb-prog-label">One Year</span>
                        <div className="nb-prog-card">
                          <a href="/courses/pgcdf" style={{ textDecoration:"none" }}>
                          <div className="nb-prog-thumb">
                            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400" alt="ADFBA" />
                          </div>
                          <span style={{ display:"inline-block", fontSize:".57rem", fontWeight:700, padding:".1rem .38rem", borderRadius:999, background:"#dcfce7", color:"#15803d", alignSelf:"flex-start" }}>
                            ADFBA
                          </span>
                          <div className="nb-prog-title">Advanced Diploma in FinTech, Banking &amp; AI</div>
                          <div className="nb-prog-pills">
                            <Pill bg="#fef3c7" color="#92400e">Final Year Graduation &amp; Above</Pill>
                            <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                            <Pill bg="#f4f6fb" color="#6b7fa3">6 Bimesters</Pill>
                          </div>
                          </a>
                          <Link to="/register?course=Advanced%20Diploma%20in%20FinTech%2C%20Banking%20%26%20AI" style={{ display:"flex", alignItems:"center", justifyContent:"center", marginTop:".4rem", padding:".3rem", borderRadius:".35rem", background:"linear-gradient(135deg,#059669,#047857)", color:"#fff", fontSize:".62rem", fontWeight:700, textDecoration:"none", gap:".25rem" }}>
                            ✦ Register Now
                          </Link>
                        </div>
                      </div>

                    </div>{/* end nb-left-col */}

                    {/* ── COL 2 : Professional Certifications ── */}
                    <div className="nb-certcol">
                      <span className="nb-certcol-header">Professional Certifications</span>
                      <div className="nb-cert-tabs">
                        {CERT_CATEGORIES.map((cat, i) => (
                          <button
                            key={cat.slug}
                            className={`nb-cert-tab${activeCertTab === i ? " active" : ""}`}
                            onClick={() => setActiveCertTab(i)}
                          >
                            <span className="nb-cert-tab-icon">{cat.icon}</span>
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="nb-cert-courses">
                        {CERT_CATEGORIES[activeCertTab].courses.map((c, i) => (
                          <CourseRow key={i} c={c} />
                        ))}
                        <a
                          href={`/courses/${CERT_CATEGORIES[activeCertTab].slug}`}
                          style={{
                            display:"flex", alignItems:"center", justifyContent:"center",
                            gap:".3rem", padding:".5rem .875rem",
                            fontSize:".72rem", fontWeight:700, color:"#4f46e5",
                            textDecoration:"none", background:"#f5f3ff",
                            borderTop:"1px solid #ede9fe",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background="#ede9fe"}
                          onMouseLeave={e => e.currentTarget.style.background="#f5f3ff"}
                        >
                          View all {CERT_CATEGORIES[activeCertTab].label} courses →
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Corporates */}
                <div className="nbd">
                  <button className="nbb">Corporates <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <a href="/corporate/consulting" className="nbd-item">Business Consulting</a>
                    <a href="/corporate/training"   className="nbd-item">Corporate Training</a>
                  </div>
                </div>

                {/* Products */}
                <div className="nbd">
                  <button className="nbb">AI Products <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <a href="/products/compliize" className="nbd-item">Data Complize</a>
                    <a href="/products/optimize"  className="nbd-item">Cost Optimize</a>
                    <a href="/products/vendorize" className="nbd-item">De-risk Vendorize</a>
                  </div>
                </div>

                {/* BFSI Lab — now BEFORE Career Accelerator */}
                <a href="/bfsiinnovationlab" className="nbb-lab">
                  🏦 BFSI Lab
                </a>

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
                <a href="/contact" className="nbb">Contact Us</a>
              </div>
            </div>

            {/* Hamburger */}
            <button className="nb-ham" onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu" aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </header>

        {/* ── MOBILE MENU ── */}
        <nav className={`nb-mob${mobileOpen ? " open" : ""}`}>
          <div className="nb-mnav">

            <button className="ma" onClick={() => setMobileIndustry(v => !v)}>
              Higher Education <ChevronDown size={18} className={`mc${mobileIndustry ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileIndustry ? " o" : ""}`}>

              <span className="ms">Institution</span>
              <a href="/about" onClick={closeAll} className="msl">🏛️ Upskillize Institute of FinTech &amp; AI</a>
              <div className="mdiv" />

              <span className="ms">Two Years</span>
              <a href="/courses/pgdfdb-2t" onClick={closeAll} className="msl" style={{ flexDirection:"column", alignItems:"flex-start", gap:".3rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:".4rem" }}>
                  <span style={{ background:"#CCFBF1", color:"#065F46", fontSize:".7rem", fontWeight:700, padding:".15rem .45rem", borderRadius:999 }}>PGDFDB</span>
                  PG Diploma in FinTech &amp; Digital Business
                  <span style={{ fontSize:".65rem", fontWeight:700, background:"#FAEEDA", color:"#633806", padding:".1rem .35rem", borderRadius:3 }}>NEW</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".22rem" }}>
                  <Pill bg="#fef3c7" color="#92400e">Parallel to MBA/PGDM</Pill>
                  <Pill bg="#f4f6fb" color="#6b7fa3">Any Graduation</Pill>
                  <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                  <Pill bg="#f4f6fb" color="#6b7fa3">4 Semesters</Pill>
                </div>
              </a>
              <Link to="/register?course=PG%20Diploma%20in%20Digital%20Business%20%26%20FinTech" onClick={closeAll}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem", margin:".2rem .75rem .35rem", padding:".45rem", borderRadius:".375rem", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"#fff", fontWeight:700, fontSize:".8rem", textDecoration:"none" }}>
                ✦ Register for PGDFDB →
              </Link>
              <div className="mdiv" />

              <span className="ms">One Year</span>
              <a href="/courses/pgcdf" onClick={closeAll} className="msl" style={{ flexDirection:"column", alignItems:"flex-start", gap:".3rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:".4rem" }}>
                  <span style={{ background:"#dcfce7", color:"#15803d", fontSize:".7rem", fontWeight:700, padding:".15rem .45rem", borderRadius:999 }}>ADFBA</span>
                  Advanced Diploma in FinTech, Banking &amp; AI
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".22rem" }}>
                  <Pill bg="#fef3c7" color="#92400e">Final Year Graduate &amp; Above</Pill>
                  <Pill bg="#e0f2fe" color="#0369a1">Online / Hybrid</Pill>
                  <Pill bg="#f4f6fb" color="#6b7fa3">6 Bimesters</Pill>
                </div>
              </a>
              <Link to="/register?course=Advanced%20Diploma%20in%20FinTech%2C%20Banking%20%26%20AI" onClick={closeAll}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem", margin:".2rem .75rem .35rem", padding:".45rem", borderRadius:".375rem", background:"linear-gradient(135deg,#059669,#047857)", color:"#fff", fontWeight:700, fontSize:".8rem", textDecoration:"none" }}>
                ✦ Register for ADFBA →
              </Link>
              <div className="mdiv" />

              <span className="ms">Professional Certifications</span>
              {CERT_CATEGORIES.map(cat => (
                <div key={cat.slug}>
                  <a href={`/courses/${cat.slug}`} onClick={closeAll} className="msl" style={{ fontWeight:700, gap:".4rem" }}>
                    <span>{cat.icon}</span> {cat.label}
                  </a>
                  {cat.courses.map(c => (
                    <div key={c.label} style={{ display:"flex", alignItems:"center", gap:".4rem", padding:".35rem .75rem .35rem 1.5rem", borderRadius:".375rem", opacity: c.available ? 1 : 0.6, transition:"background .12s" }}
                      onMouseEnter={e => e.currentTarget.style.background="#f5f3ff"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}
                    >
                      <a href={c.href} onClick={closeAll} style={{ display:"flex", alignItems:"center", gap:".4rem", flex:1, textDecoration:"none", color:"#4b5563", fontSize:".8rem", fontWeight:400, minWidth:0 }}>
                        <img src={c.img} alt={c.label} style={{ width:"17px", height:"17px", borderRadius:".2rem", objectFit:"cover", flexShrink:0 }} />
                        <span style={{ flex:1 }}>› {c.label}</span>
                      </a>
                      <div style={{ display:"flex", gap:".2rem", flexShrink:0 }}>
                        <span style={{ fontSize:".55rem", background:"#ede9fe", color:"#4f46e5", padding:".08rem .28rem", borderRadius:999, fontWeight:600 }}>{c.duration}</span>
                        {c.available
                          ? <Link to={`/register?course=${encodeURIComponent(c.label)}`} onClick={closeAll} style={{ fontSize:".55rem", background:"#dcfce7", color:"#15803d", padding:".08rem .32rem", borderRadius:999, fontWeight:700, textDecoration:"none" }}>Register</Link>
                          : <span style={{ fontSize:".55rem", background:"#e5e7eb", color:"#6b7280", padding:".08rem .28rem", borderRadius:999, fontWeight:700 }}>Closed</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button className="ma" onClick={() => setMobileCorp(v => !v)}>
              Corporates <ChevronDown size={18} className={`mc${mobileCorp ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileCorp ? " o" : ""}`}>
              <a href="/corporate/consulting" onClick={closeAll} className="msl">Business Consulting</a>
              <a href="/corporate/training"   onClick={closeAll} className="msl">Corporate Training</a>
            </div>

            <button className="ma" onClick={() => setMobileProd(v => !v)}>
              Products <ChevronDown size={18} className={`mc${mobileProd ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileProd ? " o" : ""}`}>
              <a href="/products/compliize" onClick={closeAll} className="msl">Data Complize</a>
              <a href="/products/optimize"  onClick={closeAll} className="msl">Cost Optimize</a>
              <a href="/products/vendorize" onClick={closeAll} className="msl">De-risk Vendorize</a>
            </div>

            {/* BFSI Lab — now BEFORE Career Accelerator in mobile too */}
            <button className="ma" onClick={() => setMobileLab(v => !v)}
              style={{ background:"linear-gradient(135deg,#f0fdf9,#f0f7ff)", color:"#065F46", fontWeight:700 }}>
              🏦 Innovation Lab <ChevronDown size={18} className={`mc${mobileLab ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileLab ? " o" : ""}`}>
              <a href="/bfsiinnovationlab" onClick={closeAll} className="msl">Explore the Lab</a>
              <Link to="/connect" onClick={closeAll} className="msl"
                style={{ display:"flex", alignItems:"center", gap:".5rem", background:"linear-gradient(135deg,#00C9A7,#009E85)", color:"#fff", fontWeight:700, borderRadius:".5rem", margin:".25rem .75rem", padding:".6rem .875rem" }}>
                🚀 Set Up Our Lab →
              </Link>
            </div>

            <button className="ma" onClick={() => setMobileCareer(v => !v)}>
              Career Accelerator <ChevronDown size={18} className={`mc${mobileCareer ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileCareer ? " o" : ""}`}>
              <a href="/careers/internship" onClick={closeAll} className="msl">Internship Program</a>
              <a href="/careers/placement"  onClick={closeAll} className="msl">Placement Assistance</a>
            </div>

            <div className="mdiv" />

            <button className="ma" onClick={() => setMobileAbout(v => !v)}>
              About <ChevronDown size={18} className={`mc${mobileAbout ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileAbout ? " o" : ""}`}>
              <a href="/about"             onClick={closeAll} className="msl">About Us</a>
              <a href="/about/eco-pro-lms" onClick={closeAll} className="msl">EcoPro LMS</a>
            </div>

            <a href="/contact" onClick={closeAll} className="ml">Contact Us</a>

            <Link to="/connect" onClick={closeAll}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", background:"linear-gradient(135deg,#00C9A7,#009E85)", color:"#fff", fontWeight:700, fontSize:"1rem", padding:".875rem", borderRadius:".5rem", textDecoration:"none", margin:".5rem 0", boxShadow:"0 4px 14px rgba(0,201,167,.25)" }}>
              🚀 Set Up Our Lab →
            </Link>

          </div>
        </nav>
      </div>

      <div className="nb-sp" />
    </>
  );
}