import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── Cert categories — exact mirror of Navbar ─── */
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

/* ─── Two Year programs — exact mirror of Navbar left-col ─── */
const TWO_YEAR = [
  {
    badge: "ADFDB",
    badgeBg: "#CCFBF1",
    badgeColor: "#065F46",
    title: "Advanced Diploma in FinTech & Digital Business",
    desc: "A rigorous advanced diploma across 6 trimesters designed to run alongside your MBA — combining BFSI strategy, AI, WealthTech, and digital transformation with live industry projects.",
    link: "/courses/pgdfdb-2t",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
    isNew: true,
    pills: [
      { label: "Parallel to MBA/PGDM", bg: "#fef3c7", color: "#92400e" },
      { label: "Any Graduation",        bg: "#f4f6fb", color: "#6b7fa3" },
      { label: "Online / Hybrid",       bg: "#e0f2fe", color: "#0369a1" },
      { label: "6 Trimesters",          bg: "#f4f6fb", color: "#6b7fa3" },
    ],
  },
  {
    badge: "PGDFDB",
    badgeBg: "#e8f4f0",
    badgeColor: "#0F6E56",
    title: "PG Diploma in FinTech & Digital Business",
    desc: "A comprehensive post-graduate diploma across 4 semesters bridging digital business strategy with modern financial technology, BFSI, WealthTech, and RegTech.",
    link: "/courses/pgcdb",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    isNew: true,
    pills: [
      { label: "Parallel to MBA/PGDM", bg: "#fef3c7", color: "#92400e" },
      { label: "Any Graduation",        bg: "#f4f6fb", color: "#6b7fa3" },
      { label: "Online / Hybrid",       bg: "#e0f2fe", color: "#0369a1" },
      { label: "4 Semesters",           bg: "#f4f6fb", color: "#6b7fa3" },
    ],
  },
];

/* ─── One Year — exact mirror of Navbar left-col ─── */
const ONE_YEAR = [
  {
    badge: "ADFBA",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    title: "Advanced Diploma in FinTech, Banking & AI",
    desc: "A focused one-year program blending AI, data analytics, and digital strategy for finance professionals — delivered across 6 bimesters, online/hybrid.",
    link: "/courses/pgcdf",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    pills: [
      { label: "Final Year Graduation & Above", bg: "#fef3c7", color: "#92400e" },
      { label: "Online / Hybrid",               bg: "#e0f2fe", color: "#0369a1" },
      { label: "6 Bimesters",                   bg: "#f4f6fb", color: "#6b7fa3" },
    ],
  },
];

/* ─── Pill — exact same as Navbar ─── */
function Pill({ label, bg, color }) {
  return (
    <span style={{
      fontSize: ".6rem", background: bg, borderRadius: 3,
      padding: "2px 6px", color, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

/* ─── Section Label — styled like Navbar's nb-prog-label ─── */
function SectionLabel({ label, color = "#0891b2" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
      <span style={{
        fontSize: ".65rem", fontWeight: 700, letterSpacing: ".06em",
        textTransform: "uppercase", color, whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
    </div>
  );
}

/* ─── Diploma Card — mirrors nb-prog-card layout at full-width ─── */
function DiplomaCard({ item }) {
  return (
    <Link to={item.link} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "0.875rem",
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          transition: "box-shadow .2s, border-color .2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(79,70,229,.12)"; e.currentTarget.style.borderColor = "#c7d2fe"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.05)"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
      >
        {/* Thumbnail */}
        <div style={{ width: 148, flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <img
            src={item.img}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 118 }}
          />
          {item.isNew && (
            <span style={{
              position: "absolute", bottom: 6, right: 6,
              fontSize: ".52rem", fontWeight: 700,
              background: "#FAEEDA", color: "#633806",
              padding: "2px 5px", borderRadius: 2,
            }}>NEW</span>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: "0.875rem 1.25rem", flex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.35rem",
        }}>
          <span style={{
            display: "inline-flex", alignSelf: "flex-start",
            fontSize: ".62rem", fontWeight: 700,
            background: item.badgeBg, color: item.badgeColor,
            padding: "2px 9px", borderRadius: 999,
          }}>
            {item.badge}
          </span>
          <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#111827", lineHeight: 1.35 }}>
            {item.title}
          </div>
          <p style={{ fontSize: ".74rem", color: "#6b7280", lineHeight: 1.55, margin: 0 }}>
            {item.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: "0.15rem" }}>
            {item.pills.map((p, i) => <Pill key={i} {...p} />)}
          </div>
          <span style={{ fontSize: ".74rem", fontWeight: 600, color: "#4f46e5", marginTop: "0.2rem" }}>
            View Program →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Cert course row — exact same interactive row as Navbar ─── */
function CertCourseRow({ c }) {
  const [activeInfo, setActiveInfo] = useState(null);
  const INFO_TABS = [
    { key: "duration", label: "Duration", value: c.duration, color: "#4f46e5", bg: "#ede9fe" },
    { key: "mode",     label: "Mode",     value: c.mode,     color: "#0891b2", bg: "#e0f2fe" },
    { key: "fee",      label: "Fee",      value: c.fee,      color: "#059669", bg: "#d1fae5" },
  ];
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6", opacity: c.available ? 1 : 0.62, transition: "background .12s" }}>
      <a
        href={c.href}
        style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".4rem .875rem .2rem", textDecoration: "none" }}
        onMouseEnter={e => e.currentTarget.parentElement.style.background = "#f9fafb"}
        onMouseLeave={e => e.currentTarget.parentElement.style.background = "transparent"}
      >
        <img src={c.img} alt={c.label} style={{ width: 26, height: 26, borderRadius: ".3rem", objectFit: "cover", flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: ".82rem", fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{c.label}</span>
        {!c.available
          ? <span style={{ fontSize: ".58rem", fontWeight: 700, background: "#e5e7eb", color: "#6b7280", padding: ".1rem .35rem", borderRadius: 999, flexShrink: 0 }}>Closed</span>
          : <span style={{ fontSize: ".58rem", fontWeight: 700, background: "#dcfce7", color: "#15803d", padding: ".1rem .35rem", borderRadius: 999, flexShrink: 0 }}>Register</span>
        }
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: ".3rem", padding: "0 .875rem .4rem 3.5rem" }}>
        {INFO_TABS.map(t => (
          <button
            key={t.key}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveInfo(activeInfo === t.key ? null : t.key); }}
            style={{
              fontSize: ".58rem", fontWeight: 700, padding: ".1rem .4rem", borderRadius: 999,
              border: activeInfo === t.key ? `1px solid ${t.color}` : "1px solid #e5e7eb",
              background: activeInfo === t.key ? t.bg : "#f9fafb",
              color: activeInfo === t.key ? t.color : "#6b7280",
              cursor: "pointer", transition: "all .15s",
            }}
          >{t.label}</button>
        ))}
        {activeInfo && (() => {
          const t = INFO_TABS.find(x => x.key === activeInfo);
          return <span style={{ fontSize: ".65rem", fontWeight: 700, color: t.color, background: t.bg, padding: ".12rem .5rem", borderRadius: 999 }}>{t.value}</span>;
        })()}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function HomeCourses() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section style={{ width: "100%", background: "linear-gradient(135deg, #f8faff 0%, #f5f3ff 50%, #f0fdf9 100%)", padding: "5rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
            color: "#0891b2", background: "#e0f2fe", padding: "4px 14px", borderRadius: 999,
            display: "inline-block", marginBottom: "1rem",
          }}>
            Upskillize Institute of FinTech &amp; AI
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#111827", margin: "0 0 1rem", lineHeight: 1.2 }}>
            Higher Education Programs
          </h2>
          <p style={{ color: "#6b7280", maxWidth: 560, margin: "0 auto", fontSize: ".95rem", lineHeight: 1.7 }}>
            Two years of immersion. Twenty years of strategic and career advantage. We make you part of it.
          </p>
        </div>

        {/* ── Two Years ── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionLabel label="Two Years" color="#0891b2" />
          <div style={{ display: "grid", gap: "0.875rem" }}>
            {TWO_YEAR.map((item, i) => <DiplomaCard key={i} item={item} />)}
          </div>
        </div>

        {/* ── One Year ── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionLabel label="One Year" color="#059669" />
          <div style={{ display: "grid", gap: "0.875rem" }}>
            {ONE_YEAR.map((item, i) => <DiplomaCard key={i} item={item} />)}
          </div>
        </div>

        {/* ── Professional Certifications — tabbed exactly like Navbar ── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionLabel label="Professional Certifications" color="#7c3aed" />
          <div style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.875rem",
            overflow: "hidden",
            boxShadow: "0 2px 14px rgba(0,0,0,.06)",
          }}>
            {/* Tab bar — mirrors nb-cert-tabs */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid #e5e7eb", background: "#fafafa",
            }}>
              {CERT_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveTab(i)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: ".22rem",
                    padding: ".7rem .4rem",
                    fontSize: ".7rem", fontWeight: activeTab === i ? 700 : 600,
                    color: activeTab === i ? "#4f46e5" : "#6b7280",
                    background: activeTab === i ? "#fff" : "transparent",
                    border: "none", borderRight: "1px solid #f3f4f6",
                    borderBottom: activeTab === i ? "2px solid #4f46e5" : "2px solid transparent",
                    cursor: "pointer", transition: "all .15s",
                    lineHeight: 1.25, textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "1.15rem", lineHeight: 1 }}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Course rows */}
            <div>
              {CERT_CATEGORIES[activeTab].courses.map((c, i) => (
                <CertCourseRow key={i} c={c} />
              ))}
            </div>

            {/* Footer link */}
            <a
              href={`/courses/${CERT_CATEGORIES[activeTab].slug}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: ".35rem", padding: ".65rem .875rem",
                fontSize: ".78rem", fontWeight: 700, color: "#4f46e5",
                textDecoration: "none", background: "#f5f3ff",
                borderTop: "1px solid #ede9fe", transition: "background .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#ede9fe"}
              onMouseLeave={e => e.currentTarget.style.background = "#f5f3ff"}
            >
              View all {CERT_CATEGORIES[activeTab].label} courses →
            </a>
          </div>
        </div>

        {/* ── BFSI Innovation Lab — matches nb-lab-panel style ── */}
        <div>
          <SectionLabel label="BFSI Innovation Lab" color="#0891b2" />
          <div style={{
            background: "linear-gradient(160deg, #f0fdf9 0%, #f0f7ff 100%)",
            border: "1px solid #d1fae5",
            borderRadius: "0.875rem",
            padding: "1.75rem 2rem",
            display: "flex", gap: "1.25rem", alignItems: "flex-start",
            boxShadow: "0 2px 14px rgba(0,201,167,.08)",
          }}>
            <div style={{
              flexShrink: 0, width: 52, height: 52,
              background: "linear-gradient(135deg, #00C9A7, #009E85)",
              borderRadius: "0.75rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem", boxShadow: "0 4px 14px rgba(0,201,167,.25)",
            }}>
              🏦
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#111827", marginBottom: ".4rem" }}>
                BFSI Innovation Lab
              </div>
              <p style={{ fontSize: ".8rem", color: "#374151", lineHeight: 1.7, margin: "0 0 1rem", maxWidth: 560 }}>
                Innovation-driven, industry-integrated learning ecosystem for real-world BFSI transformation.
                Collaborate with industry experts, work on live projects, and gain hands-on experience in cutting-edge
                banking, financial services, and insurance technology.
              </p>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <a href="/bfsiinnovationlab" style={{
                  fontSize: ".78rem", fontWeight: 600, color: "#065F46",
                  textDecoration: "none", padding: ".35rem .875rem",
                  background: "#ccfbf1", borderRadius: "0.375rem",
                  transition: "opacity .15s",
                }}>
                  Explore the Lab →
                </a>
                <Link to="/connect" style={{
                  display: "inline-flex", alignItems: "center", gap: ".35rem",
                  background: "linear-gradient(135deg, #00C9A7, #009E85)",
                  color: "#fff", fontWeight: 700, fontSize: ".78rem",
                  padding: ".35rem .875rem", borderRadius: "0.375rem",
                  textDecoration: "none", boxShadow: "0 3px 10px rgba(0,201,167,.25)",
                }}>
                  🚀 Set Up Our Lab →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}