import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────
   WHY THIS SHIELD EXISTS
   TwoYearsSemester.jsx (and other page components) inject GLOBAL_CSS which
   sets  p/span/div { color: #1A1530 }  and  h3/h4 { color: #1A1530 }
   — near-black text that overrides Tailwind's text-white/80 classes.
   The FOOTER_SHIELD fights back with !important inside .site-footer.
   It is injected on mount and removed on unmount — zero global pollution.
───────────────────────────────────────────────────────────────────────── */
const FOOTER_SHIELD = `
  .site-footer p,
  .site-footer span,
  .site-footer div,
  .site-footer li  { color: inherit !important; }

  .site-footer h3,
  .site-footer h4,
  .site-footer h5,
  .site-footer h6  {
    color: #ffffff !important;
    font-family: inherit !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
    margin: 0 !important;
  }

  /* FIX: <a>/<Link> inherits body color (#1A1530 near-black) from GLOBAL_CSS.
     Force all footer anchors to white, then specific classes override below. */
  .site-footer a {
    text-decoration: none;
    color: rgba(255,255,255,.70) !important;
  }

  /* Colour utilities */
  .site-footer .ft-white { color: #ffffff               !important; }
  .site-footer .ft-82    { color: rgba(255,255,255,.82)  !important; }
  .site-footer .ft-70    { color: rgba(255,255,255,.70)  !important; }
  .site-footer .ft-55    { color: rgba(255,255,255,.55)  !important; }
  .site-footer .ft-45    { color: rgba(255,255,255,.45)  !important; }
  .site-footer .ft-35    { color: rgba(255,255,255,.35)  !important; }
  .site-footer .ft-25    { color: rgba(255,255,255,.25)  !important; }

  /* Nav links — explicit override keeps them at exactly 70% white */
  .site-footer .ft-link { color:rgba(255,255,255,.70)!important; display:block; padding:.22rem 0; transition:color .18s; }
  .site-footer .ft-link:hover { color:#fff!important; }

  /* Restore coloured special links that need their own colour */
  .site-footer .cert-view-all { color:#00C9A7!important; }
  .site-footer .cert-view-all:hover { color:#5DCAA5!important; }
  .site-footer .lab-btn { color:#ffffff!important; }
  .site-footer .ft-bar-link { color:rgba(255,255,255,.55)!important; }
  .site-footer .ft-bar-link:hover { color:#fff!important; }

  /* Cert toggle */
  .site-footer .cert-toggle {
    display:flex; align-items:center; gap:.35rem;
    background:none; border:none; cursor:pointer; padding:.3rem 0;
    color:rgba(255,255,255,.85)!important; font-size:.8rem; font-weight:600;
    width:100%; text-align:left; font-family:inherit;
  }
  .site-footer .cert-toggle:hover { color:#fff!important; }

  /* Course row */
  .site-footer .course-row { border-bottom:1px solid rgba(255,255,255,.08); border-radius:.375rem; transition:background .12s; }
  .site-footer .course-row:hover { background:rgba(255,255,255,.05); }
  .site-footer .course-label { color:rgba(255,255,255,.88)!important; font-size:.75rem; font-weight:600; line-height:1.3; }

  /* Info pills */
  .site-footer .info-pill {
    font-size:.55rem; font-weight:700; padding:.08rem .35rem; border-radius:999px;
    cursor:pointer; transition:all .15s; white-space:nowrap;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.15);
    color:rgba(255,255,255,.5)!important; font-family:inherit;
  }

  /* Social icon */
  .site-footer .social-icon {
    width:32px; height:32px; border-radius:8px; border:1px solid rgba(255,255,255,.15);
    display:flex; align-items:center; justify-content:center;
    color:rgba(255,255,255,.65)!important; background:rgba(255,255,255,.04); transition:all .2s;
  }
  .site-footer .social-icon:hover { border-color:rgba(255,255,255,.35); color:#fff!important; background:rgba(255,255,255,.08); }
  .site-footer .social-icon svg { width:16px; height:16px; fill:currentColor; }

  /* Cert dropdown container */
  .site-footer .cert-dropdown { background:rgba(0,0,0,.22); border-radius:.5rem; border:1px solid rgba(255,255,255,.08); margin:.25rem 0; overflow:hidden; }
  .site-footer .cert-view-all { display:flex; align-items:center; justify-content:center; padding:.4rem; font-size:.68rem; font-weight:700; background:rgba(0,201,167,.06); border-top:1px solid rgba(255,255,255,.06); transition:background .15s; }
  .site-footer .cert-view-all:hover { background:rgba(0,201,167,.12); }
  .site-footer .partner-link:hover .partner-icon { background:rgba(255,255,255,.18); }
  .site-footer .partner-link:hover .ft-55 { color:#fff!important; }
  .site-footer .lab-btn { display:inline-flex; align-items:center; gap:6px; font-size:.82rem; font-weight:700; padding:8px 16px; border-radius:10px; text-decoration:none; background:linear-gradient(135deg,#00C9A7,#009E85); box-shadow:0 4px 14px rgba(0,201,167,.3); transition:opacity .18s,transform .18s; }
  .site-footer .lab-btn:hover { opacity:.9; transform:translateY(-1px); }
  .site-footer .ft-bar { background:#0B1D2A; border-top:1px solid rgba(255,255,255,.12); }

  /* Responsive */
  @media(max-width:1024px){ .site-footer .ft-grid { grid-template-columns:1fr 1fr!important; } }
  @media(max-width:640px){
    .site-footer .ft-grid { grid-template-columns:1fr!important; }
    .site-footer .ft-bar-inner { flex-direction:column!important; align-items:flex-start!important; }
  }
`;

/* ─── CERT_CATEGORIES — exact mirror of Navbar ──────────────────────────── */
const CERT_CATEGORIES = [
  {
    label: "AI in FinTech", slug: "ai-fintech", icon: "🏦",
    courses: [
      { label: "BFSI Domain Excellence",          href: "/courses/bfsi-domain-excellence-program",  img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=48",  available: true,  duration: "10 Weeks", mode: "Online", fee: "₹18,000" },
      { label: "Investment Banking & Wealth Tech", href: "/courses/investment-banking-wealth-tech",  img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=48", available: true,  duration: "12 Weeks", mode: "Hybrid", fee: "₹22,000" },
      { label: "Risk Management & RegTech",        href: "/courses/risk-management-regtech-program", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=48", available: true,  duration: "10 Weeks", mode: "Online", fee: "₹20,000" },
      { label: "FinTech & AI Mastery",             href: "/courses/ai-fintech",                      img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=48", available: false, duration: "12 Weeks", mode: "Online", fee: "₹24,000" },
      { label: "Insurance, InsurTech & DPDPA",     href: "/courses/ai-fintech",                      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=48", available: false, duration: "8 Weeks",  mode: "Online", fee: "₹16,000" },
      { label: "AI in Financial Services",         href: "/courses/ai-fintech",                      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=48", available: false, duration: "10 Weeks", mode: "Hybrid", fee: "₹21,000" },
    ],
  },
  {
    label: "Product Leadership", slug: "product-leadership", icon: "🚀",
    courses: [
      { label: "The Mini CEO Program",             href: "/courses/the-mini-ceo-program",            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48",  available: true,  duration: "12 Weeks", mode: "Online", fee: "₹25,000" },
      { label: "AI Product Management Mastery",    href: "/courses/ai-product-management-mastery",   img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=48",  available: true,  duration: "10 Weeks", mode: "Hybrid", fee: "₹22,000" },
      { label: "Product Management for Techies",   href: "/courses/product-leadership",              img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=48",  available: false, duration: "8 Weeks",  mode: "Online", fee: "₹18,000" },
      { label: "Design Thinking & User Solutions", href: "/courses/product-leadership",              img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=48",  available: false, duration: "6 Weeks",  mode: "Online", fee: "₹15,000" },
      { label: "Business Analysis Foundation",     href: "/courses/product-leadership",              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=48",  available: false, duration: "8 Weeks",  mode: "Hybrid", fee: "₹17,000" },
    ],
  },
  {
    label: "Data & GenAI", slug: "data-analytics-genai", icon: "📊",
    courses: [
      { label: "Data to Decisions: Power BI & AI", href: "/courses/data-decisions",                  img: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=48",  available: true,  duration: "10 Weeks", mode: "Online", fee: "₹20,000" },
      { label: "AI & ML for Business Leaders",     href: "/courses/ai-ml-business-leaders",           img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=48", available: true,  duration: "12 Weeks", mode: "Hybrid", fee: "₹23,000" },
      { label: "Strategic Data Analytics",         href: "/courses/data-analytics-genai",             img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=48",  available: false, duration: "10 Weeks", mode: "Online", fee: "₹19,000" },
    ],
  },
  {
    label: "Technology & Dx", slug: "technology-digital-transformation", icon: "⚙️",
    courses: [
      { label: "Digital Business Strategy & Innovation", href: "/courses/digital-business-strategy-innovation", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=48", available: true,  duration: "10 Weeks", mode: "Online", fee: "₹21,000" },
      { label: "AI & Digital Project Management",        href: "/courses/technology-digital-transformation",   img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=48", available: false, duration: "8 Weeks",  mode: "Hybrid", fee: "₹18,000" },
      { label: "Emerging Technologies & Industry 4.0",   href: "/courses/technology-digital-transformation",   img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=48", available: false, duration: "12 Weeks", mode: "Online", fee: "₹22,000" },
    ],
  },
];

/* ─── FooterCourseRow ────────────────────────────────────────────────────── */
function FooterCourseRow({ c }) {
  const [activeInfo, setActiveInfo] = useState(null);
  const INFO_TABS = [
    { key: "duration", label: "Duration", value: c.duration, color: "#4f46e5", bg: "#ede9fe" },
    { key: "mode",     label: "Mode",     value: c.mode,     color: "#0891b2", bg: "#e0f2fe" },
    { key: "fee",      label: "Fee",      value: c.fee,      color: "#059669", bg: "#d1fae5" },
  ];
  return (
    <div className="course-row" style={{ opacity: c.available ? 1 : 0.62 }}>
      <div style={{ display:"flex", alignItems:"center", gap:".5rem", padding:".35rem .5rem .15rem" }}>
        <a href={c.href} style={{ display:"flex", alignItems:"center", gap:".5rem", flex:1, textDecoration:"none", minWidth:0 }}>
          <img src={c.img} alt={c.label} style={{ width:22, height:22, borderRadius:".25rem", objectFit:"cover", flexShrink:0 }} />
          <span className="course-label">{c.label}</span>
        </a>
        {c.available
          ? <Link to={`/register?course=${encodeURIComponent(c.label)}`} style={{ fontSize:".52rem", fontWeight:700, background:"#dcfce7", color:"#15803d", padding:"1px 6px", borderRadius:999, flexShrink:0, textDecoration:"none", whiteSpace:"nowrap" }}>Register</Link>
          : <span style={{ fontSize:".52rem", fontWeight:700, background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.5)", padding:"1px 6px", borderRadius:999 }}>Closed</span>
        }
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:".25rem", padding:"0 .5rem .35rem 2.75rem" }}>
        {INFO_TABS.map(t => (
          <button key={t.key}
            onClick={e=>{ e.preventDefault(); e.stopPropagation(); setActiveInfo(activeInfo===t.key?null:t.key); }}
            className="info-pill"
            style={activeInfo===t.key ? { background:t.bg, border:`1px solid ${t.color}`, color:t.color } : {}}
          >{t.label}</button>
        ))}
        {activeInfo && (()=>{
          const t = INFO_TABS.find(x=>x.key===activeInfo);
          return <span style={{ fontSize:".6rem", fontWeight:700, color:t.color, background:t.bg, padding:".1rem .4rem", borderRadius:999 }}>{t.value}</span>;
        })()}
      </div>
    </div>
  );
}

/* ─── CertGroup ──────────────────────────────────────────────────────────── */
function CertGroup({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button className="cert-toggle" onClick={()=>setOpen(v=>!v)}>
        <span>{cat.icon}</span>
        <span style={{ flex:1 }}>{cat.label}</span>
        <span style={{ fontSize:".6rem", transition:"transform .2s", display:"inline-block", transform:open?"rotate(180deg)":"none", opacity:.5 }}>▼</span>
      </button>
      {open && (
        <div className="cert-dropdown">
          {cat.courses.map((c,i)=><FooterCourseRow key={i} c={c}/>)}
          <Link to={`/courses/${cat.slug}`} className="cert-view-all">View all {cat.label} courses →</Link>
        </div>
      )}
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER — drop-in replacement, exact same structure as the original
═══════════════════════════════════════════════════════════════════════════ */
export default function Footer() {

  useLayoutEffect(()=>{
    const id = "upskillize-footer-shield";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = FOOTER_SHIELD;
    document.head.appendChild(el);
    return ()=> document.getElementById(id)?.remove();
  }, []);

  return (
    <footer className="site-footer" style={{ width:"100%", color:"rgba(255,255,255,.82)" }}>

      {/* ═══ MAIN BAND ═══ */}
      <div style={{ background:"linear-gradient(135deg,#0f0c29 0%,#302b63 55%,#24243e 100%)" }}>
        <div className="ft-grid" style={{ maxWidth:1280, margin:"0 auto", padding:"3.5rem 1.5rem", display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"2.5rem" }}>

          {/* ── Brand ── */}
          <div>
            <h3 style={{ fontSize:"1.25rem", fontWeight:700, marginBottom:"1rem" }}>Upskillize</h3>
            <div style={{ fontSize:".82rem", lineHeight:1.75, display:"flex", flexDirection:"column", gap:".75rem" }}>
              <div>
                <p className="ft-white" style={{ fontWeight:600 }}>Regd. Off :</p>
                <p className="ft-55">Ushodaya, Raghavendra Circle, Ramamurthy Nagar,<br/>Bangalore – 560016</p>
              </div>
              <div>
                <p className="ft-white" style={{ fontWeight:600 }}>Training Center :</p>
                <p className="ft-55">3444, Karma Koushalya Bhavan,<br/>Service Road, Opp. Attiguppe Metro Station,<br/>2nd Stage, Vijayanagar,<br/>Bengaluru – 560040, IN</p>
              </div>
            </div>
            <div style={{ marginTop:"1.5rem" }}>
              <p className="ft-white" style={{ fontSize:".82rem", fontWeight:600, marginBottom:".75rem" }}>Social Media</p>
              <div style={{ display:"flex", gap:".75rem" }}>
                <a href="https://www.linkedin.com/company/upskillize-excel-beyond" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://x.com/upskillize36330" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X (Twitter)">
                  <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Programs ── */}
          <div>
            <h3 style={{ fontSize:"1.25rem", fontWeight:700, marginBottom:"1rem" }}>Programs</h3>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:".4rem", fontSize:".85rem" }}>
              <li>
                <Link to="/courses/pgcdb" className="ft-link" style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                  <span style={{ fontSize:".55rem", background:"#FEF3C7", color:"#92400E", padding:"1px 6px", borderRadius:999, fontWeight:700 }}>PGDFDB</span>
                  PGDFDB (Two Years)
                </Link>
              </li>
              <li>
                <Link to="/courses/pgcdf" className="ft-link" style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                  <span style={{ fontSize:".55rem", background:"#EDE9FE", color:"#5B21B6", padding:"1px 6px", borderRadius:999, fontWeight:700 }}>ADFBA</span>
                  ADFBA (One Year)
                </Link>
              </li>
              <li><div style={{ height:1, background:"rgba(255,255,255,.14)", margin:".35rem 0" }}/></li>
              <li>
                <p className="ft-45" style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", marginBottom:".5rem" }}>
                  Professional Certifications
                </p>
                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:".4rem" }}>
                  {CERT_CATEGORIES.map(cat=><CertGroup key={cat.slug} cat={cat}/>)}
                </ul>
              </li>
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 style={{ fontSize:"1.25rem", fontWeight:700, marginBottom:"1rem" }}>Quick Links</h3>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", fontSize:".85rem" }}>
              {[
                { label:"Academic",            to:"/academic"             },
                { label:"Business Consulting", to:"/corporate/consulting" },
                { label:"Corporate Training",  to:"/corporate/training"   },
                { label:"Products",            to:"/solutions"            },
                { label:"About",               to:"/about"                },
                { label:"Contact Us",          to:"/contact"              },
              ].map(({label,to})=>(
                <li key={label}><Link to={to} className="ft-link">{label}</Link></li>
              ))}
              <li>
                <Link to="/register" className="ft-link" style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                  Register
                  <span style={{ fontSize:".55rem", fontWeight:700, background:"#dcfce7", color:"#15803d", padding:"1px 6px", borderRadius:999 }}>Enrol</span>
                </Link>
              </li>
            </ul>
            <div style={{ marginTop:"1.5rem", paddingTop:"1rem", borderTop:"1px solid rgba(255,255,255,.18)" }}>
              <p className="ft-white" style={{ fontSize:".82rem", fontWeight:600, marginBottom:".75rem" }}>FinTech &amp; AI Innovation Lab</p>
              <Link to="/contact" className="lab-btn">🚀 Set Up Our Lab →</Link>
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 style={{ fontSize:"1.25rem", fontWeight:700, marginBottom:"1rem" }}>Contact Us</h3>
            <p className="ft-82" style={{ fontWeight:700, fontSize:".9rem", marginBottom:".1rem" }}>Amit Agrawal</p>
            <p className="ft-55" style={{ fontSize:".82rem", marginBottom:".75rem" }}>Co-Founder &amp; CGO</p>
            <div style={{ display:"flex", flexDirection:"column", gap:".35rem", marginBottom:".75rem" }}>
              <a href="tel:+919820397297" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
                <svg style={{ width:14, height:14, fill:"rgba(255,255,255,.5)", flexShrink:0 }} viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <span className="ft-55" style={{ fontSize:".82rem" }}>+91 98203 97297</span>
              </a>
              <a href="mailto:amit@upskillize.com" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
                <svg style={{ width:14, height:14, fill:"rgba(255,255,255,.5)", flexShrink:0 }} viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span className="ft-55" style={{ fontSize:".82rem" }}>amit@upskillize.com</span>
              </a>
            </div>
            <div style={{ paddingTop:"1rem", borderTop:"1px solid rgba(255,255,255,.18)" }}>
              <p className="ft-white" style={{ fontSize:".82rem", fontWeight:600, marginBottom:".6rem" }}>Partnerships</p>
              <a href="mailto:info@upskillize.com" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none", marginBottom:".35rem" }}>
                <svg style={{ width:14, height:14, fill:"rgba(255,255,255,.5)", flexShrink:0 }} viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span className="ft-55" style={{ fontSize:".82rem" }}>info@upskillize.com</span>
              </a>
              <div style={{ marginTop:".75rem", display:"flex", flexDirection:"column", gap:".5rem" }}>
                {[
                  { href:"https://www.upskillize.com",  label:"www.upskillize.com",  d:<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/> },
                  { href:"https://lms.upskillize.com", label:"lms.upskillize.com", d:<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/> },
                ].map(({href,label,d})=>(
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="partner-link" style={{ display:"flex", alignItems:"center", gap:".5rem", textDecoration:"none" }}>
                    <div className="partner-icon" style={{ width:28, height:28, borderRadius:6, background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .2s" }}>
                      <svg style={{ width:15, height:15, fill:"rgba(255,255,255,.85)" }} viewBox="0 0 24 24">{d}</svg>
                    </div>
                    <span className="ft-55" style={{ fontSize:".82rem" }}>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="ft-bar">
        <div className="ft-bar-inner" style={{ maxWidth:1280, margin:"0 auto", padding:".75rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:".5rem .75rem" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:".5rem .75rem" }}>
            <span className="ft-70" style={{ fontSize:".72rem", fontWeight:500, whiteSpace:"nowrap" }}>
              © {new Date().getFullYear()} Upskillize – Bridging industry &amp; academia
            </span>
            {["Karnataka S&amp;E Reg. No: 36/26/S/0047/2026","Udyam Reg. No: UDYAM-KR-03-0674691","GST Reg. No: 29AAJFU2626F1Z1"].map(r=>(
              <React.Fragment key={r}>
                <span className="ft-25" style={{ fontSize:".65rem" }}>|</span>
                <span className="ft-45" style={{ fontSize:".65rem", whiteSpace:"nowrap" }} dangerouslySetInnerHTML={{__html:r}}/>
              </React.Fragment>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexShrink:0 }}>
            {[{label:"Privacy",to:"/privacy"},{label:"Terms",to:"/terms"},{label:"Contact",to:"/contact"}].map(({label,to})=>(
              <Link key={label} to={to} className="ft-bar-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}