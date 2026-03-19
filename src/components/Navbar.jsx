import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
// available: true = has detail page (shown first, no badge)
// available: false = coming soon (shown last, dimmed badge)
const QUARTER_COURSES = [
  {
    label: "AI in FinTech",
    slug: "ai-fintech",
    icon: "🏦",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80",
    subCourses: [
      // available first
      { label: "BFSI Domain Excellence",           href: "/courses/bfsi-domain-excellence-program",      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=48", available: true },
      { label: "Investment Banking & Wealth Tech", href: "/courses/investment-banking-wealth-tech",      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=48", available: true },
      { label: "Risk Management & RegTech",        href: "/courses/risk-management-regtech-program",     img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=48", available: true },
      // coming soon last
      { label: "FinTech & AI Mastery",             href: "/courses/ai-fintech",                          img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=48", available: false },
      { label: "Insurance, InsurTech & DPDPA",     href: "/courses/ai-fintech",                          img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=48", available: false },
      { label: "AI in Financial Services",         href: "/courses/ai-fintech",                          img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=48", available: false },
    ],
  },
  {
    label: "Product Leadership",
    slug: "product-leadership",
    icon: "🚀",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=80",
    subCourses: [
      // available first
      { label: "The Mini CEO Program",             href: "/courses/the-mini-ceo-program",                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48", available: true },
      { label: "AI Product Management Mastery",    href: "/courses/ai-product-management-mastery",       img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=48", available: true },
      // coming soon last
      { label: "Product Management for Techies",   href: "/courses/product-leadership",                  img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=48", available: false },
      { label: "Design Thinking & User Solutions", href: "/courses/product-leadership",                  img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=48", available: false },
      { label: "Business Analysis Foundation",     href: "/courses/product-leadership",                  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=48", available: false },
    ],
  },
  {
    label: "Data Analytics, GenAI & BI",
    slug: "data-analytics-genai",
    icon: "📊",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80",
    subCourses: [
      // available first
      { label: "Data to Decisions: Power BI & AI", href: "/courses/data-decisions",                      img: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=48", available: true },
      { label: "AI & ML for Business Leaders",     href: "/courses/ai-ml-business-leaders",              img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=48", available: true },
      // coming soon last
      { label: "Strategic Data Analytics",         href: "/courses/data-analytics-genai",                img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=48", available: false },
    ],
  },
  {
    label: "Technology & Digital Transformation",
    slug: "technology-digital-transformation",
    icon: "⚙️",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80",
    subCourses: [
      // available first
      { label: "Digital Business Strategy & Innovation", href: "/courses/digital-business-strategy-innovation", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=48", available: true },
      // coming soon last
      { label: "AI & Digital Project Management",        href: "/courses/technology-digital-transformation",   img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=48", available: false },
      { label: "Emerging Technologies & Industry 4.0",   href: "/courses/technology-digital-transformation",   img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=48", available: false },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [industryOpen,   setIndustryOpen]   = useState(false);
  const [mobileIndustry, setMobileIndustry] = useState(false);
  const [mobileCorp,     setMobileCorp]     = useState(false);
  const [mobileProd,     setMobileProd]     = useState(false);
  const [mobileCareer,   setMobileCareer]   = useState(false);
  const [mobileAbout,    setMobileAbout]    = useState(false);
  const [expandedQuarter, setExpandedQuarter] = useState(null);

  const industryTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileIndustry(false);
    setMobileCorp(false);
    setMobileProd(false);
    setMobileCareer(false);
    setMobileAbout(false);
    setExpandedQuarter(null);
  };

  const onEnter = () => { clearTimeout(industryTimer.current); setIndustryOpen(true); };
  const onLeave = () => { industryTimer.current = setTimeout(() => setIndustryOpen(false), 160); };

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box}
        :root{
          --c-bg:#fff; --c-border:#e5e7eb; --c-text:#1f2937;
          --c-muted:#6b7280; --c-indigo:#4f46e5; --c-cyan:#0891b2;
          --c-hover-bg:#f5f3ff; --c-hover:#4f46e5;
          --shadow:0 8px 32px rgba(0,0,0,0.11);
        }

        /* fixed wrapper */
        .nb{position:fixed;top:0;left:0;right:0;z-index:9999}

        /* bar */
        .nb-bar{background:var(--c-bg);border-bottom:1px solid transparent;transition:border-color .25s,box-shadow .25s}
        .nb-bar.scrolled{border-color:var(--c-border);box-shadow:0 2px 14px rgba(0,0,0,0.07)}
        .nb-inner{max-width:1280px;margin:0 auto;padding:0 1.25rem;height:64px;display:flex;align-items:center}

        /* logo */
        .nb-logo{display:flex;align-items:center;text-decoration:none;flex-shrink:0;margin-right:2rem}
        .nb-logo img{height:42px;width:auto;display:block}
        .nb-logo-text{font-size:1.35rem;font-weight:800;color:var(--c-indigo);display:none}

        /* desktop */
        .nb-desk{display:none;flex:1;align-items:center;justify-content:space-between}
        @media(min-width:1024px){.nb-desk{display:flex}}
        .nb-left{display:flex;align-items:center;gap:.125rem}
        .nb-right{display:flex;align-items:center;gap:.5rem;margin-left:auto}

        /* button */
        .nbb{display:inline-flex;align-items:center;gap:.3rem;padding:.5rem .875rem;border-radius:.5rem;
          font-size:.9rem;font-weight:500;color:var(--c-text);background:none;border:none;
          cursor:pointer;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}
        .nbb:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .nbc{transition:transform .2s;flex-shrink:0}
        .nbb:hover .nbc{transform:rotate(180deg)}

        /* simple dropdown */
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

        /* ── industry panel ── */
        .nb-ind{position:relative}
        .nb-panel{
          position:absolute;top:calc(100% + 8px);left:-12px;
          background:var(--c-bg);border:1px solid var(--c-border);
          border-radius:.875rem;box-shadow:var(--shadow);
          width:920px;
          display:grid;grid-template-columns:1fr 1fr 1.8fr 1fr;
          opacity:0;visibility:hidden;transform:translateY(-8px);
          transition:all .2s cubic-bezier(.4,0,.2,1);z-index:10001;overflow:hidden
        }
        .nb-panel.open{opacity:1;visibility:visible;transform:translateY(0)}

        /* column */
        .nb-col{padding:1.125rem 0 1.375rem;border-right:1px solid var(--c-border)}
        .nb-col:last-child{border-right:none}

        /* label */
        .nb-clabel{
          display:block;padding:.0rem 1rem .625rem;
          font-size:.67rem;font-weight:700;letter-spacing:.09em;
          text-transform:uppercase;color:var(--c-cyan);
          border-bottom:1px solid var(--c-border);margin-bottom:.625rem
        }

        /* course row */
        .nb-crow{
          display:flex;align-items:center;gap:.625rem;padding:.6rem 1rem;
          font-size:.875rem;font-weight:600;color:var(--c-text);
          text-decoration:none;transition:background .12s,color .12s
        }
        .nb-crow:hover{background:var(--c-hover-bg);color:var(--c-hover)}

        /* pill */
        .nbp{display:inline-block;font-size:.68rem;font-weight:700;
          padding:.15rem .5rem;border-radius:999px;flex-shrink:0}
        .nbp-b{background:#dbeafe;color:#1d4ed8}
        .nbp-g{background:#dcfce7;color:#15803d}

        /* description */
        .nb-desc{padding:0 1rem .5rem 1rem;font-size:.75rem;color:var(--c-muted);line-height:1.45}

        /* quarter category row */
        .nb-qcat{
          display:flex;align-items:center;justify-content:space-between;
          gap:.5rem;padding:.45rem 1rem;
          font-size:.825rem;font-weight:600;color:var(--c-text);
          text-decoration:none;transition:background .12s,color .12s;
          cursor:pointer;border:none;background:none;width:100%;text-align:left
        }
        .nb-qcat:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .nb-qcat a{text-decoration:none;color:inherit;flex:1}
        .nb-qcat-icon{font-size:.85rem;flex-shrink:0}
        .nb-qcat-chev{flex-shrink:0;transition:transform .2s}
        .nb-qcat-chev.open{transform:rotate(180deg)}

        /* sub-course list under each quarter category */
        .nb-subcol{max-height:0;overflow:hidden;transition:max-height .3s ease;background:#f9fafb;border-left:2px solid #e0e7ff;margin-left:1rem}
        .nb-subcol.open{max-height:400px}
        .nb-subrow{
          display:block;padding:.35rem .875rem;font-size:.78rem;font-weight:500;
          color:#4b5563;text-decoration:none;transition:background .12s,color .12s
        }
        .nb-subrow:hover{background:var(--c-hover-bg);color:var(--c-hover)}

        /* bfsi lab row */
        .nb-lab{
          display:flex;align-items:center;gap:.5rem;padding:.5rem 1rem;
          font-size:.825rem;font-weight:600;color:#1d4ed8;
          text-decoration:none;transition:background .12s
        }
        .nb-lab:hover{background:#eff6ff}

        /* hamburger */
        .nb-ham{display:flex;padding:.5rem;border:none;background:transparent;
          cursor:pointer;color:var(--c-text);border-radius:.375rem;transition:background .15s}
        .nb-ham:hover{background:#f3f4f6}
        @media(min-width:1024px){.nb-ham{display:none}}

        /* mobile menu */
        .nb-mob{position:fixed;top:64px;left:0;right:0;bottom:0;background:#fff;
          overflow-y:auto;transform:translateX(100%);
          transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:10000}
        .nb-mob.open{transform:translateX(0)}
        @media(min-width:1024px){.nb-mob{display:none!important}}

        .nb-mnav{padding:.75rem 1rem 4rem;display:flex;flex-direction:column;gap:.125rem}

        /* mob accordion */
        .ma{display:flex;align-items:center;justify-content:space-between;
          padding:.875rem;border-radius:.5rem;font-size:.975rem;font-weight:600;
          color:var(--c-text);background:none;border:none;cursor:pointer;
          width:100%;text-align:left;transition:background .13s}
        .ma:hover{background:#f9fafb}
        .mc{transition:transform .2s}
        .mc.o{transform:rotate(180deg)}

        /* mob link */
        .ml{display:block;padding:.875rem;border-radius:.5rem;font-size:.975rem;
          font-weight:600;color:var(--c-text);text-decoration:none;transition:background .13s}
        .ml:hover{background:#f9fafb}

        /* mob panel */
        .mp{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1);
          padding-left:.5rem;border-left:3px solid #e0e7ff;margin-left:.875rem;margin-bottom:.25rem}
        .mp.o{max-height:2400px}

        /* mob section label */
        .ms{display:block;padding:.625rem .75rem .35rem;font-size:.67rem;
          font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-cyan)}

        /* mob sub link */
        .msl{display:flex;align-items:center;gap:.5rem;padding:.55rem .75rem;
          border-radius:.375rem;font-size:.875rem;font-weight:500;color:#374151;
          text-decoration:none;transition:background .12s,color .12s}
        .msl:hover{background:var(--c-hover-bg);color:var(--c-hover)}

        /* mob sub-sub link */
        .mssl{display:flex;align-items:center;gap:.5rem;padding:.4rem .75rem .4rem 1.5rem;
          border-radius:.375rem;font-size:.8rem;font-weight:400;color:#6b7280;
          text-decoration:none;transition:background .12s,color .12s}
        .mssl:hover{background:var(--c-hover-bg);color:var(--c-hover)}

        .mdiv{height:1px;background:#f3f4f6;margin:.375rem 0}

        /* spacer */
        .nb-sp{height:64px}

        @media(max-width:1023px){.nb-inner{padding:0 .875rem}.nb-logo img{height:38px}}
        @media(max-width:480px){.nb-logo img{height:34px}.nb-inner{padding:0 .625rem}}
      `}</style>

      <div className="nb">
        {/* ── BAR ── */}
        <header className={`nb-bar${isScrolled ? " scrolled" : ""}`}>
          <div className="nb-inner">

            {/* Logo */}
            <a href="/" className="nb-logo" onClick={closeAll}>
              <img src="/images/logo.png" alt="Upskillize"
                onError={e => { e.target.style.display = "none"; e.target.nextElementSibling.style.display = "block"; }} />
              <span className="nb-logo-text">Upskillize</span>
            </a>

            {/* ── DESKTOP ── */}
            <div className="nb-desk">
              <div className="nb-left">

                {/* Higher Education */}
                <div className="nb-ind" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                  <button className="nbb" aria-haspopup="true" aria-expanded={industryOpen}>
                    Higher Education
                    <ChevronDown size={15} className="nbc" style={{ transform: industryOpen ? "rotate(180deg)" : "rotate(0)" }} />
                  </button>

                  <div className={`nb-panel${industryOpen ? " open" : ""}`}>

                    {/* COL 1 – Two Year */}
                    <div className="nb-col">
                      <span className="nb-clabel">Two Year</span>
                      <a href="/courses/pgcdb" className="nb-crow" style={{flexDirection:"column",alignItems:"flex-start",gap:".5rem",padding:".75rem 1rem"}}>
                        <img
                          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400"
                          alt="PGD-FDB"
                          style={{width:"100%",height:"90px",objectFit:"cover",borderRadius:".5rem",display:"block"}}
                        />
                        <div>
                          <span className="nbp nbp-b" style={{marginBottom:".3rem",display:"inline-block"}}>PGD-FDB</span>
                          <div style={{fontSize:".825rem",fontWeight:600,color:"var(--c-text)",lineHeight:1.35}}>
                            PG Diploma in Fintech and Digital Business
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* COL 2 – One Year */}
                    <div className="nb-col">
                      <span className="nb-clabel">One Year</span>
                      <a href="/courses/pgcdf" className="nb-crow" style={{flexDirection:"column",alignItems:"flex-start",gap:".5rem",padding:".75rem 1rem"}}>
                        <img
                          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
                          alt="PGDFBA"
                          style={{width:"100%",height:"90px",objectFit:"cover",borderRadius:".5rem",display:"block"}}
                        />
                        <div>
                          <span className="nbp nbp-g" style={{marginBottom:".3rem",display:"inline-block"}}>PGDFBA</span>
                          <div style={{fontSize:".825rem",fontWeight:600,color:"var(--c-text)",lineHeight:1.35}}>
                            PG Diploma in FinTech, Banking & AI
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* COL 3 – Quarter with expandable sub-courses + images */}
                    <div className="nb-col">
                      <span className="nb-clabel">Quarterly</span>
                      {QUARTER_COURSES.map((c) => (
                        <div key={c.slug}>
                          <div className="nb-qcat">
                            <a href={`/courses/${c.slug}`} style={{display:"flex",alignItems:"center",gap:".5rem",flex:1,textDecoration:"none",color:"inherit",fontSize:".825rem",fontWeight:600}}>
                              <img src={c.img} alt={c.label} style={{width:"28px",height:"28px",borderRadius:".3rem",objectFit:"cover",flexShrink:0}} />
                              {c.label}
                            </a>
                            {c.subCourses.length > 0 && (
                              <ChevronDown
                                size={13}
                                className={`nb-qcat-chev${expandedQuarter === c.slug ? " open" : ""}`}
                                onClick={(e) => { e.preventDefault(); setExpandedQuarter(expandedQuarter === c.slug ? null : c.slug); }}
                              />
                            )}
                          </div>
                          {c.subCourses.length > 0 && (
                            <div className={`nb-subcol${expandedQuarter === c.slug ? " open" : ""}`}>
                              {c.subCourses.map((s) => (
                                <a key={s.label} href={s.href} className="nb-subrow"
                                  style={{opacity: s.available ? 1 : 0.55, display:"flex", alignItems:"center", gap:".5rem"}}>
                                  <img src={s.img} alt={s.label} style={{width:"22px",height:"22px",borderRadius:".25rem",objectFit:"cover",flexShrink:0}} />
                                  <span style={{flex:1,fontSize:".78rem"}}>{s.label}</span>
                                  {!s.available && (
                                    <span style={{fontSize:".6rem",fontWeight:700,background:"#e5e7eb",color:"#6b7280",padding:".1rem .35rem",borderRadius:999,flexShrink:0}}>Soon</span>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* COL 4 – BFSI Innovation Lab */}
                    <div className="nb-col" style={{background:"#f0f7ff"}}>
                      <span className="nb-clabel" style={{color:"#1d4ed8"}}>BFSI Innovation Lab</span>
                      <div style={{padding:"0 1rem"}}>
                        <div style={{fontSize:"2rem",marginBottom:".5rem"}}>🏦</div>
                        <p style={{fontSize:".78rem",color:"#374151",lineHeight:1.5,marginBottom:".75rem"}}>
                          Innovation-driven, industry-integrated learning for real-world BFSI transformation.
                        </p>
                        <a href="/courses/ai-fintech" className="nb-lab" style={{padding:".5rem 0",fontWeight:700,fontSize:".82rem"}}>
                          Explore BFSI Programs →
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
                  <button className="nbb">Products <ChevronDown size={15} className="nbc" /></button>
                  <div className="nbd-menu">
                    <a href="/products/compliize" className="nbd-item">Data Complize</a>
                    <a href="/products/optimize"  className="nbd-item">Cost Optimize</a>
                    <a href="/products/vendorize" className="nbd-item">De-risk Vendorize</a>
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

            {/* Higher Education */}
            <button className="ma" onClick={() => setMobileIndustry(v => !v)}>
              Higher Education
              <ChevronDown size={18} className={`mc${mobileIndustry ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileIndustry ? " o" : ""}`}>

              <span className="ms">Two Year</span>
              <a href="/courses/pgcdb" onClick={closeAll} className="msl">
                <span style={{background:"#dbeafe",color:"#1d4ed8",fontSize:".7rem",fontWeight:700,padding:".15rem .45rem",borderRadius:999}}>PGD-FDB</span>
                PG Diploma in Fintech and Digital Business
              </a>

              <div className="mdiv" />
              <span className="ms">One Year</span>
              <a href="/courses/pgcdf" onClick={closeAll} className="msl">
                <span style={{background:"#dcfce7",color:"#15803d",fontSize:".7rem",fontWeight:700,padding:".15rem .45rem",borderRadius:999}}>PGDFBA</span>
                PG Diploma in Fintech, Banking & AI
              </a>

              <div className="mdiv" />
              <span className="ms">Quarterly</span>
              {QUARTER_COURSES.map(c => (
                <div key={c.slug}>
                  <a href={`/courses/${c.slug}`} onClick={closeAll} className="msl" style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                    <img src={c.img} alt={c.label} style={{width:"24px",height:"24px",borderRadius:".25rem",objectFit:"cover",flexShrink:0}} />
                    <span>{c.label}</span>
                  </a>
                  {c.subCourses.map(s => (
                    <a key={s.label} href={s.href} onClick={closeAll} className="mssl"
                      style={{opacity: s.available ? 1 : 0.55, display:"flex", alignItems:"center", gap:".4rem"}}>
                      <img src={s.img} alt={s.label} style={{width:"18px",height:"18px",borderRadius:".2rem",objectFit:"cover",flexShrink:0}} />
                      <span style={{flex:1}}>› {s.label}</span>
                      {!s.available && <span style={{fontSize:".58rem",fontWeight:700,background:"#e5e7eb",color:"#6b7280",padding:".1rem .3rem",borderRadius:999}}>Soon</span>}
                    </a>
                  ))}
                </div>
              ))}

              <div className="mdiv" />
              <span className="ms">BFSI Innovation Lab</span>
              <a href="/courses/ai-fintech" onClick={closeAll} className="msl">
                🏦 Explore BFSI Programs
              </a>

            </div>

            {/* Corporates */}
            <button className="ma" onClick={() => setMobileCorp(v => !v)}>
              Corporates <ChevronDown size={18} className={`mc${mobileCorp ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileCorp ? " o" : ""}`}>
              <a href="/corporate/consulting" onClick={closeAll} className="msl">Business Consulting</a>
              <a href="/corporate/training"   onClick={closeAll} className="msl">Corporate Training</a>
            </div>

            {/* Products */}
            <button className="ma" onClick={() => setMobileProd(v => !v)}>
              Products <ChevronDown size={18} className={`mc${mobileProd ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileProd ? " o" : ""}`}>
              <a href="/products/compliize" onClick={closeAll} className="msl">Data Complize</a>
              <a href="/products/optimize"  onClick={closeAll} className="msl">Cost Optimize</a>
              <a href="/products/vendorize" onClick={closeAll} className="msl">De-risk Vendorize</a>
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
    

      <div className="nb-sp" />
    </>
  );
}