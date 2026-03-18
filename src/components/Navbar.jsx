import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const SHORT_TERM = [
  { label: "AI in FinTech",                          slug: "ai-fintech",                       icon: "🏦" },
  { label: "Product Leadership",                     slug: "product-leadership",               icon: "🚀" },
  { label: "Data Analytics, GenAI & BI",             slug: "data-analytics-genai",             icon: "📊" },
  { label: "Technology & Digital Transformation",    slug: "technology-digital-transformation", icon: "⚙️" },
  { label: "Integrated Courses",                     slug: "integrated-courses",               icon: "🎓" },
];

const PARTNER = [
  { label: "Cybersecurity",                   slug: "cybersecurity",                  icon: "🔒" },
  { label: "Mental Health & Social Wellness", slug: "mental-health-social-wellness",  icon: "🧠" },
  { label: "Innovation Leadership",           slug: "innovation-leadership",           icon: "💡" },
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
          width:700px;
          display:grid;grid-template-columns:1fr 1fr 1.7fr 1.2fr;
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

        /* short-term row */
        .nb-srow{
          display:flex;align-items:center;gap:.5rem;padding:.5rem 1rem;
          font-size:.825rem;font-weight:500;color:var(--c-text);
          text-decoration:none;transition:background .12s,color .12s
        }
        .nb-srow:hover{background:var(--c-hover-bg);color:var(--c-hover)}
        .nb-si{font-size:.88rem;flex-shrink:0}

        /* partner row */
        .nb-prow{
          display:flex;align-items:center;gap:.5rem;padding:.5rem 1rem;
          font-size:.825rem;font-weight:500;color:var(--c-text);
          text-decoration:none;transition:background .12s,color .12s
        }
        .nb-prow:hover{background:var(--c-hover-bg);color:var(--c-hover)}

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
        .mp.o{max-height:1200px}

        /* mob section label */
        .ms{display:block;padding:.625rem .75rem .35rem;font-size:.67rem;
          font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-cyan)}

        /* mob sub link */
        .msl{display:flex;align-items:center;gap:.5rem;padding:.55rem .75rem;
          border-radius:.375rem;font-size:.875rem;font-weight:500;color:#374151;
          text-decoration:none;transition:background .12s,color .12s}
        .msl:hover{background:var(--c-hover-bg);color:var(--c-hover)}

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

                {/* Industry Oriented */}
                <div className="nb-ind" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                  <button className="nbb" aria-haspopup="true" aria-expanded={industryOpen}>
                    Industry Oriented
                    <ChevronDown size={15} className="nbc" style={{ transform: industryOpen ? "rotate(180deg)" : "rotate(0)" }} />
                  </button>

                  <div className={`nb-panel${industryOpen ? " open" : ""}`}>

                    {/* COL 1 – Long Term */}
                    <div className="nb-col">
                      <span className="nb-clabel">Long Term</span>
                      <a href="/courses/pgcdb" className="nb-crow">
                        <span className="nbp nbp-b">PGCDB</span>
                        Digital Business
                      </a>
                      <p className="nb-desc">Post Graduate Certificate<br />in Digital Business</p>
                    </div>

                    {/* COL 2 – Mid Term */}
                    <div className="nb-col">
                      <span className="nb-clabel">Mid Term</span>
                      <a href="/courses/pgcdf" className="nb-crow">
                        <span className="nbp nbp-g">PGCDF</span>
                        Digital Finance
                      </a>
                      <p className="nb-desc">Post Graduate Certificate<br />in Digital Finance</p>
                    </div>

                    {/* COL 3 – Short Term */}
                    <div className="nb-col">
                      <span className="nb-clabel">Short Term</span>
                      {SHORT_TERM.map(c => (
                        <a key={c.slug} href={`/courses/${c.slug}`} className="nb-srow">
                          <span className="nb-si">{c.icon}</span>
                          {c.label}
                        </a>
                      ))}
                    </div>

                    {/* COL 4 – Partner Courses */}
                    <div className="nb-col">
                      <span className="nb-clabel">Partner Courses</span>
                      {PARTNER.map(c => (
                        <a key={c.slug} href={`/courses/${c.slug}`} className="nb-prow">
                          <span>{c.icon}</span>
                          {c.label}
                        </a>
                      ))}
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

            {/* Industry Oriented */}
            <button className="ma" onClick={() => setMobileIndustry(v => !v)}>
              Industry Oriented
              <ChevronDown size={18} className={`mc${mobileIndustry ? " o" : ""}`} />
            </button>
            <div className={`mp${mobileIndustry ? " o" : ""}`}>

              <span className="ms">Long Term</span>
              <a href="/courses/pgcdb" onClick={closeAll} className="msl">
                <span style={{background:"#dbeafe",color:"#1d4ed8",fontSize:".7rem",fontWeight:700,padding:".15rem .45rem",borderRadius:999}}>PGCDB</span>
                Post Graduate Certificate in Digital Business
              </a>

              <div className="mdiv" />
              <span className="ms">Mid Term</span>
              <a href="/courses/pgcdf" onClick={closeAll} className="msl">
                <span style={{background:"#dcfce7",color:"#15803d",fontSize:".7rem",fontWeight:700,padding:".15rem .45rem",borderRadius:999}}>PGCDF</span>
                Post Graduate Certificate in Digital Finance
              </a>

              <div className="mdiv" />
              <span className="ms">Short Term</span>
              {SHORT_TERM.map(c => (
                <a key={c.slug} href={`/courses/${c.slug}`} onClick={closeAll} className="msl">
                  <span>{c.icon}</span>{c.label}
                </a>
              ))}

              <div className="mdiv" />
              <span className="ms">Partner Courses</span>
              {PARTNER.map(c => (
                <a key={c.slug} href={`/courses/${c.slug}`} onClick={closeAll} className="msl">
                  <span>{c.icon}</span>{c.label}
                </a>
              ))}
            </div>

            <div className="mdiv" />

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