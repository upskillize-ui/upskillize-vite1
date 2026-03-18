import { useState, useEffect } from "react";

// ─── CSS Variables & Global Styles ────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

  :root {
    --purple:   #5B4B8A;
    --purple-l: #7A6BA8;
    --purple-d: #3D3060;
    --blue:     #4A90E2;
    --blue-l:   #6AAAF0;
    --gold:     #C9A84C;
    --gold-l:   #E2C070;
    --navy:     #0D1B3E;
    --navy-m:   #152347;
    --teal:     #0D8A8F;
    --green:    #1A8A5A;
    --orange:   #E06830;
    --white:    #FFFFFF;
    --off:      #F7F6FF;
    --light:    #EDE9F7;
    --text:     #1A1530;
    --muted:    #5C5478;
    --border:   rgba(91,75,138,.13);

    --font-display: 'Plus Jakarta Sans', sans-serif;
    --font-body:    'Inter', sans-serif;
    --font-serif:   'DM Serif Display', serif;

    --radius-sm:  6px;
    --radius-md:  10px;
    --radius-lg:  14px;
    --radius-xl:  18px;
    --radius-2xl: 24px;

    --shadow-card:  0 2px 16px rgba(13,27,62,.07), 0 1px 4px rgba(13,27,62,.04);
    --shadow-hover: 0 8px 32px rgba(91,75,138,.14), 0 2px 8px rgba(13,27,62,.06);
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--text);
    overflow-x: hidden;
    font-size: 15px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  ::selection { background:var(--purple); color:var(--white); }

  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .ticker-inner { display:flex; animation:ticker 30s linear infinite; white-space:nowrap; }

  .fade-up { opacity:0; transform:translateY(24px); transition:all .65s cubic-bezier(.22,.61,.36,1); }
  .fade-up.visible { opacity:1; transform:translateY(0); }
  .fade-up-d1 { transition-delay:.12s; }
  .fade-up-d2 { transition-delay:.22s; }
  .fade-up-d3 { transition-delay:.32s; }
  .fade-up-d4 { transition-delay:.42s; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--off); }
  ::-webkit-scrollbar-thumb { background:var(--purple-l); border-radius:3px; }

  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
`;

// ─── Shared style helpers ─────────────────────────────────────────────────────
const S = {
  inner: { maxWidth: 1280, margin: '0 auto' },
  sectionLabel: (color='var(--purple)') => ({
    fontSize: 11, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase',
    color, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10
  }),
  labelBar: (color='var(--gold)') => ({
    display: 'block', width: 28, height: 2, background: color, borderRadius: 2
  }),
  h2: (color='var(--text)') => ({
    fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.8vw,50px)', fontWeight: 800,
    color, lineHeight: 1.12, marginBottom: 18
  }),
  h2Dark: () => S.h2('#fff'),
  sub: (color='var(--muted)') => ({
    fontSize: 17, color, lineHeight: 1.78, maxWidth: 680, marginBottom: 56
  }),
  card: (extra={}) => ({
    background: 'var(--white)', borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
    transition: 'box-shadow .3s, transform .3s', ...extra
  }),
  darkCard: (extra={}) => ({
    background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 'var(--radius-xl)', transition: 'all .3s', ...extra
  }),
  pill: (bg, color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: bg, color, fontSize: 11, fontWeight: 700,
    letterSpacing: '.07em', textTransform: 'uppercase',
    padding: '5px 14px', borderRadius: 100,
  }),
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'linear-gradient(135deg,var(--purple),var(--blue))',
    color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
    textDecoration: 'none', letterSpacing: '.02em', transition: 'all .25s',
    boxShadow: '0 4px 20px rgba(91,75,138,.35)',
  },
  btnOutline: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'transparent', border: '1.5px solid rgba(255,255,255,.28)',
    color: '#fff', padding: '14px 32px', borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600,
    textDecoration: 'none', letterSpacing: '.02em', transition: 'all .25s',
  },
  btnGold: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'linear-gradient(135deg,var(--gold),var(--gold-l))',
    color: 'var(--navy)', padding: '14px 32px', borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800,
    textDecoration: 'none', letterSpacing: '.02em', transition: 'all .25s',
  },
};

// ─── FadeUp Hook ──────────────────────────────────────────────────────────────
function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Counter Hook ─────────────────────────────────────────────────────────────
function useCounters() {
  useEffect(() => {
    function animateCounter(el) {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.dataset.count) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
    return () => counterObserver.disconnect();
  }, []);
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['Program|#overview','Credits|#credits','Syllabus|#syllabus','Framework|#rubric','Innovation Lab|#lab','Careers|#careers','Placements|#placements','For Colleges|#colleges'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '10px 48px' : '15px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(13,27,62,.93)', backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(201,168,76,.18)', transition: 'all .3s',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>
        Up<span style={{ color: 'var(--gold)' }}>skillize</span>
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {links.map(item => {
          const [label, href] = item.split('|');
          return (
            <a key={href} href={href} style={{
              color: 'rgba(255,255,255,.68)', textDecoration: 'none', fontSize: 12,
              fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '.05em',
              textTransform: 'uppercase', transition: 'color .2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.68)'}
            >
              {label}
            </a>
          );
        })}
        <a href="#contact" style={{
          background: 'var(--gold)', color: 'var(--navy)', padding: '9px 22px',
          borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-display)',
          fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '.02em',
          transition: 'all .2s', whiteSpace: 'nowrap',
        }}>Enroll Now →</a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D1B3E 0%, #1A1048 40%, #2D1B69 75%, #0D1B3E 100%)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
      padding: '120px 48px 80px',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(91,75,138,.38) 0%, transparent 70%),
                     radial-gradient(ellipse 50% 40% at 20% 80%, rgba(74,144,226,.18) 0%, transparent 60%)`,
      }} />
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72,
        ...S.inner, width: '100%', position: 'relative', zIndex: 1,
      }}>
        {/* LEFT */}
        <div>
          <div style={S.pill('rgba(201,168,76,.15)', 'var(--gold-l)')}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            Flagship Program 2026
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,66px)', fontWeight: 800,
            color: '#fff', lineHeight: 1.06, marginTop: 24, marginBottom: 14,
          }}>
            The Future of Finance<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-l) 50%, #F5D690 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>is Digital &amp; FinTech.</span><br />
            Are You Ready?
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 400, fontStyle: 'italic',
            color: 'rgba(255,255,255,.58)', marginBottom: 28, lineHeight: 1.45,
          }}>Post Graduate Diploma in Digital Finance &amp; FinTech</p>
          <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
            India's only MBA-parallel program that transforms you into a Full-Stack Digital Business Leader in Banking, FinTech, WealthTech, InsurTech, and RegTech — while you are still completing your MBA.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {['NSQF Level 7', 'BFSI SSC Aligned', '24 Months · 4 Semesters', '40 Credits', 'Top 1% Industry Trainers', 'Employment-Linked'].map(p => (
              <span key={p} style={{
                background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)',
                color: 'rgba(255,255,255,.8)', fontSize: 12, fontWeight: 500,
                padding: '6px 14px', borderRadius: 100, letterSpacing: '.03em',
              }}>{p}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#overview" style={S.btnPrimary}>Explore the Program →</a>
            <a href="#colleges" style={S.btnOutline}>For Colleges ↗</a>
          </div>
        </div>

        {/* RIGHT — Program Card */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 280, height: 280, background: 'rgba(91,75,138,.28)', top: -60, right: -80, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 180, height: 180, background: 'rgba(74,144,226,.18)', bottom: -40, left: -60, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{
            background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.11)',
            backdropFilter: 'blur(20px)', borderRadius: 'var(--radius-2xl)', padding: 40, width: '100%', maxWidth: 420,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>PGDDF</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 4 }}>1,200 Hours · 40 Credits</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: 32 }}>10 credits × 4 semesters · NSQF Level 7 · PG Diploma</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
              {[['6', 'Flagship Courses\nin One Program'], ['4', 'Certificates\non the Way'], ['5+', 'Interview\nOpportunities'], ['40', 'Credits\n(10/Semester)']].map(([num, lbl]) => (
                <div key={num} style={{
                  background: 'rgba(255,255,255,.06)', borderRadius: 'var(--radius-md)', padding: 16,
                  border: '1px solid rgba(255,255,255,.08)', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--gold)' }}>{num}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.48)', fontWeight: 500, marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['🏦', 'BFSI Domain Excellence'], ['📈', 'InvestmentTech & WealthTech'], ['🔒', 'RegTech & Compliance'], ['👑', 'MiniCEO Program'], ['📊', 'Data to Decisions']].map(([icon, text]) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,.04)', borderRadius: 'var(--radius-sm)', padding: '10px 14px',
                  border: '1px solid rgba(255,255,255,.07)',
                }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ['🏦 Banking Technology', '💳 PaymentsTech', '📈 WealthTech', '🛡 InsuranceTech', '🔒 RegTech', '🤖 AI in Finance', '📊 Data to Decisions', '⚡ FinTech Disruption', '🌐 Open Banking', '👑 MiniCEO Program', '🚀 Startup Ecosystem', '🏦 Banking Technology', '💳 PaymentsTech', '📈 WealthTech', '🛡 InsuranceTech', '🔒 RegTech', '🤖 AI in Finance', '📊 Data to Decisions'];
  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--purple-d), var(--navy))',
      borderTop: '1px solid rgba(201,168,76,.25)', padding: '13px 0', overflow: 'hidden',
    }}>
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span key={i} style={{
            color: 'rgba(255,255,255,.65)', fontSize: 12, fontWeight: 500,
            padding: '0 36px', display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-body)',
          }}>
            {item} <span style={{ color: 'var(--purple-l)', fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CREDITS SECTION ──────────────────────────────────────────────────────────
function CreditsSection() {
  return (
    <section id="credits" style={{ background: 'linear-gradient(135deg,var(--navy),#1A1048)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="section-label fade-up" style={S.sectionLabel('var(--gold)')}>
          <span style={S.labelBar()} /> NCrF · UGC · NSQF Level 7 Compliant
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2Dark()}>
          40 Credits.<br /><span style={{ color: 'var(--gold)' }}>Fully Stackable. Lifelong Value.</span>
        </h2>
        <p className="fade-up fade-up-d2" style={{ ...S.sub('rgba(255,255,255,.58)'), marginBottom: 48 }}>
          PGDDF earns 40 credits over 24 months — 10 credits per semester — fully compliant with UGC's Curriculum &amp; Credit Framework for Postgraduate Programmes 2023 and NCrF's 1 credit = 30 notional hours standard. Every hour counts toward your credit total and is banked in the UGC Academic Bank of Credits (ABC) via DigiLocker.
        </p>

        {/* 4 semester cards */}
        <div className="fade-up" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2,
          background: 'rgba(255,255,255,.07)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 48,
        }}>
          {[
            { label: 'Semester 1', color: 'var(--blue)', detail: 'Months 1–4\nFoundations + Capstone 1\nCertificate I' },
            { label: 'Semester 2', color: '#7A6BA8', detail: 'Months 6–9\nIntermediate + Capstone 2\nCertificate II' },
            { label: 'Semester 3', color: '#E07070', detail: 'Months 11–14\nAdvanced + Placement Sprint\nCertificate III' },
            { label: 'Semester 4', color: 'var(--gold)', detail: 'Months 16–19\nMiniCEO + Summit\nPGDDF Final Award' },
          ].map(({ label, color, detail }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,.04)', padding: '36px 24px', textAlign: 'center', transition: 'background .3s' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color, marginBottom: 10, fontFamily: 'var(--font-display)' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900, color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>10</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', marginBottom: 12 }}>Credits</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.38)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{detail}</div>
            </div>
          ))}
        </div>

        {/* Credit Breakdown */}
        <div className="fade-up" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ padding: '18px 28px', background: 'rgba(255,255,255,.055)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff' }}>10 Credits Per Semester — How It Breaks Down</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 3 }}>1 Credit = 30 Notional Learning Hours (NCrF 2023)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)' }}>
            {[
              { label: 'Online Classes', hrs: '80 hrs', credits: '≈ 2.7 credits', note: '2 hrs/day Mon–Fri × 8 weeks', color: 'var(--blue)' },
              { label: 'Saturday Class', hrs: '36 hrs', credits: '1.2 credits', note: '3 hrs × 12 Saturdays', color: '#7A6BA8' },
              { label: 'LMS Self-Study', hrs: '60 hrs', credits: '2.0 credits', note: 'Re-watch · quizzes · reading', color: 'var(--teal)' },
              { label: 'Assignments', hrs: '48 hrs', credits: '1.6 credits', note: '4 module assignments × 12 hrs', color: 'var(--orange)' },
              { label: 'Innovation Lab', hrs: '48 hrs', credits: '1.6 credits', note: 'Lab builds + prototypes', color: 'var(--green)' },
              { label: 'Capstone', hrs: '28 hrs', credits: '0.9 credits', note: 'Research · build · present', color: 'var(--gold)' },
            ].map(({ label, hrs, credits, note, color }, i) => (
              <div key={label} style={{
                padding: '20px 14px', borderRight: i < 5 ? '1px solid rgba(255,255,255,.07)' : 'none', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color }}>{hrs}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.38)', marginTop: 4 }}>{credits}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 4 }}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{
            padding: '14px 28px', background: 'rgba(201,168,76,.09)',
            borderTop: '1px solid rgba(201,168,76,.18)', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Total per Semester: 80+36+60+48+48+28 = <strong style={{ color: '#fff' }}>300 notional hours</strong></span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--gold)' }}>= 10 Credits per Semester</span>
          </div>
        </div>

        {/* Credit comparison + ABC */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>PGDDF vs Standard PG Qualifications</div>
            <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['PG Certificate (UGC minimum)', '20 credits', false],
                  ['PG Diploma (UGC standard)', '40 credits', false],
                  ['✦ PGDDF (this program)', '40 credits', true],
                  ["Master's Degree (UGC)", '80 credits', false],
                  ['MBA (2-year)', '80–120 credits', false],
                ].map(([name, credits, highlight]) => (
                  <tr key={name} style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                    <td style={{ padding: '10px 0', color: highlight ? 'var(--gold)' : 'rgba(255,255,255,.48)', fontWeight: highlight ? 700 : 400 }}>{name}</td>
                    <td style={{ textAlign: 'right', color: highlight ? 'var(--gold)' : 'rgba(255,255,255,.48)', fontWeight: highlight ? 800 : 400 }}>{credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(201,168,76,.09)', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>
              PGDDF at 40 credits meets the UGC minimum for a Post Graduate Diploma — the same category as IIM Executive Programs and XLRI PG Diplomas.
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>ABC DigiLocker — Credits Banked Per Part</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, marginBottom: 16 }}>Under NCrF 2023, all 40 PGDDF credits are stored in the UGC Academic Bank of Credits (ABC) via DigiLocker — available for life. Students who exit early can bank partial credits and re-enter within 7 years.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'After Semester 1 (Month 4)', value: '10 credits banked', bg: 'rgba(74,144,226,.1)', color: 'var(--blue)' },
                { label: 'After Semester 2 (Month 9)', value: '20 credits banked', bg: 'rgba(91,75,138,.15)', color: '#9A8FC0' },
                { label: 'After Semester 3 (Month 14)', value: '30 credits banked', bg: 'rgba(192,57,43,.1)', color: '#E07070' },
                { label: 'After Semester 4 — PGDDF', value: '40 credits · Full Award', bg: 'rgba(201,168,76,.12)', color: 'var(--gold)' },
              ].map(({ label, value, bg, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: bg, borderRadius: 8 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.68)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color, fontSize: 13 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MARKET OPPORTUNITY ───────────────────────────────────────────────────────
function MarketSection() {
  return (
    <section id="market" style={{
      background: 'linear-gradient(135deg,var(--navy) 0%,#1A1048 60%,var(--navy-m) 100%)',
      position: 'relative', overflow: 'hidden', padding: '96px 48px',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(91,75,138,.22) 0%, transparent 65%)' }} />
      <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
        <p className="fade-up" style={S.sectionLabel('var(--gold)')}>
          <span style={S.labelBar()} /> The Opportunity is Massive
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2Dark()}>
          The <span style={{ color: 'var(--gold)' }}>FinTech Revolution</span><br />is rewriting every career in BFSI.
        </h2>
        <p className="fade-up fade-up-d2" style={{ ...S.sub('rgba(255,255,255,.55)'), marginBottom: 56 }}>
          India is at the epicentre of the world's most dramatic financial services transformation. The numbers are staggering — and so is the demand for people who understand both finance and technology.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'rgba(255,255,255,.07)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 56 }}>
          {[
            { count: '7.2', suffix: 'M+', label: 'BFSI Professionals\nin India', sub: 'Largest white-collar employer' },
            { count: '450', suffix: 'B+', label: 'India FinTech Market\nby 2025', sub: '3rd largest globally' },
            { count: '30', suffix: '%', label: 'Annual Growth in\nDigital BFSI Roles', sub: 'Demand far outpaces supply' },
            { count: '10', suffix: 'B+', label: 'UPI Transactions\nPer Month', sub: "The world's largest RTP network" },
          ].map(({ count, suffix, label, sub }) => (
            <div key={count} style={{ background: 'rgba(255,255,255,.04)', padding: '40px 28px', textAlign: 'center', transition: 'background .3s' }} className="fade-up">
              <div data-count={count} data-suffix={suffix} style={{
                fontFamily: 'var(--font-display)', fontSize: 50, fontWeight: 800,
                background: 'linear-gradient(135deg,var(--gold),var(--gold-l))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 10,
              }}>{count}{suffix}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,.58)', fontWeight: 500, lineHeight: 1.45, whiteSpace: 'pre-line' }}>{label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.32)', marginTop: 5 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            { icon: '🚀', tag: 'FINTECH DISRUPTION', tagColor: 'var(--blue)', title: "India's FinTech Ecosystem is Exploding", body: "From Razorpay to PhonePe, from Zerodha to CRED — India now hosts 9,000+ FinTech companies and has produced 22 FinTech unicorns. Every one of them needs people who speak the language of both finance and technology.", points: ['3 new FinTech startups launch every day in India', '$6B+ VC investment in Indian FinTech in 2024', 'UPI processes more transactions than Visa globally'] },
            { icon: '🏦', tag: 'DIGITAL BANKING', tagColor: 'var(--gold)', title: 'Traditional Banks are Going Digital — Fast', body: 'HDFC, SBI, ICICI, and Axis are spending billions on digital transformation. The demand for professionals who understand core banking modernisation, open banking, and AI-powered services is at an all-time high.', points: ['₹1.5 trillion BFSI IT spend in FY25', '80% of banking transactions now digital', 'Every bank hiring for AI, data, and product roles'] },
            { icon: '📱', tag: 'PRODUCT MANAGEMENT', tagColor: 'var(--teal)', title: 'Product Thinking is the New Power Skill', body: "The most sought-after professionals in BFSI today are those who understand both the user's need and the financial product's regulatory environment. Product Managers in BFSI earn 40–60% more than peers in other sectors.", points: ['BFSI Product Managers earn ₹25–60 LPA at senior levels', 'Cross-functional skill: works for all MBA specialisations', 'In-demand at banks, FinTechs, and consulting firms'] },
          ].map(({ icon, tag, tagColor, title, body, points }) => (
            <div key={tag} className="fade-up" style={{
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 'var(--radius-lg)', padding: 32, position: 'relative', overflow: 'hidden', transition: 'all .3s',
            }}>
              <span style={{ position: 'absolute', right: 20, top: 20, fontSize: 44, opacity: .1 }}>{icon}</span>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10, color: tagColor, fontFamily: 'var(--font-display)' }}>{tag}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.52)', lineHeight: 1.7 }}>{body}</p>
              <ul style={{ listStyle: 'none', marginTop: 14 }}>
                {points.map(p => (
                  <li key={p} style={{ fontSize: 13, color: 'rgba(255,255,255,.48)', padding: '4px 0', paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 11 }}>→</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINTECH SECTION ──────────────────────────────────────────────────────────
function FintechSection() {
  return (
    <section id="fintech" style={{ background: 'var(--off)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> Why BFSI + Digital = The Winning Combination
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          Digital Business is not a<br /><span style={{ color: 'var(--purple)' }}>specialisation — it's survival.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', marginTop: 56 }}>
          {/* Visual card */}
          <div className="fade-up" style={{ background: 'linear-gradient(135deg,var(--purple-d),var(--navy))', borderRadius: 'var(--radius-2xl)', padding: 48, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle,rgba(201,168,76,.2),transparent)', borderRadius: '50%' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: '#fff', marginBottom: 24, lineHeight: 1.15 }}>
              The World's Most Exciting Industries are All <span style={{ color: 'var(--gold)' }}>Part of BFSI Now</span>
            </div>
            <ul style={{ listStyle: 'none' }}>
              {[
                { icon: '⚡', title: 'Payments Revolution', body: "India's UPI is the world's largest real-time payment system — and the technology layer that powers it is built and managed by professionals like you." },
                { icon: '🤖', title: 'AI & GenAI in Finance', body: 'ChatGPT, Claude, and Gemini are being deployed inside banks for credit analysis, compliance, customer service, and risk monitoring.' },
                { icon: '🌐', title: 'Decentralised Finance', body: "DeFi, blockchain, CBDCs, and tokenised assets are reshaping capital markets. India's e-Rupee is live. The regulatory framework is being written today." },
                { icon: '🛡', title: 'RegTech & Compliance Intelligence', body: "With DPDPA 2023, RBI's AI governance circular, and Basel IV, the demand for compliance technologists has never been higher." },
                { icon: '📊', title: 'Data-Driven Finance', body: 'From real-time NPA dashboards to ESG scoring models, finance is increasingly powered by data. Power BI, Python, and SQL are now professional prerequisites.' },
              ].map(({ icon, title, body }) => (
                <li key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,.07)', color: 'rgba(255,255,255,.7)', fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <strong style={{ color: 'var(--gold)', display: 'block', fontSize: 13, marginBottom: 2, fontWeight: 700 }}>{title}</strong>
                    {body}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Points */}
          <div className="fade-up fade-up-d2" style={{ display: 'grid', gap: 20 }}>
            {[
              { bg: '#EBF4FF', icon: '🏗', title: 'Startup Ecosystem Readiness', body: 'PGDDF prepares you to build in a startup, join a FinTech as a founding team member, or launch your own venture — with domain depth, product skills, and investor pitch capability.' },
              { bg: 'var(--light)', icon: '📦', title: 'Product Management for BFSI', body: 'Learn the PPP model (People, Process, Product), write real PRDs, run Agile sprints, and understand the regulatory constraints that make BFSI product management uniquely complex — and uniquely valuable.' },
              { bg: '#E8F5EE', icon: '🌍', title: 'Global Career Access', body: 'BFSI is the most globally portable career. PGDDF graduates are equipped for roles in DIFC Dubai, Canary Wharf London, Marina Bay Singapore, and Bay Street Toronto.' },
              { bg: '#FFF0F0', icon: '⚖', title: 'The Regulatory Advantage', body: 'Understanding RBI, SEBI, IRDAI, and PFRDA regulations is a rare skill. PGDDF graduates bridge technology, business, and regulation — the most sought-after profile in modern BFSI hiring.' },
              { bg: '#FFF8E1', icon: '💡', title: 'Innovation Lab — Build Real FinTech Products', body: "Unlike any other program, you don't just learn about FinTech — you build one. The BFSI Innovation Lab gives you the tools, mentorship, and space to prototype real digital products." },
            ].map(({ bg, icon, title, body }) => (
              <div key={title} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 18, alignItems: 'start',
                background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: 22,
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', transition: 'all .3s',
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: bg }}>{icon}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROGRAM OVERVIEW ─────────────────────────────────────────────────────────
function OverviewSection() {
  const parts = [
    {
      num: 'Part 1 · Months 1–4', title: 'BFSI Foundations & FinTech World',
      timeline: '3 months teaching + 1 month capstone',
      modules: ['Module 1 · BFSI Domain Foundations — Banking, Insurance, Capital Markets, MF', 'Module 2 · Current Industry & Digital Transformation — AI, GenAI, Open Banking', 'Module 3 · FinTech World & InsurTech — Neo-banks, BNPL, IRDAI sandbox', 'Module 4 · Loan Origination & Credit Technology — LOS, digital underwriting, RBI guidelines'],
      badge: 'Certificate I — BFSI & FinTech Foundations', badgeBg: 'rgba(74,144,226,.1)', badgeColor: 'var(--blue)',
      headerBg: 'linear-gradient(135deg,#EBF4FF,#F0F8FF)', numColor: 'var(--blue)', titleColor: 'var(--navy)', dotColor: 'var(--blue)', footer: '🏦 BFSI-DE Flagship',
    },
    {
      num: 'Part 2 · Months 6–9', title: 'Intermediate Digital BFSI Technologies',
      timeline: '3 months teaching + 1 month capstone · 1-month buffer after Part 1',
      modules: ['Module 5 · Payments Technology — UPI, Cards, CBDC, Cross-border, PG Tech', 'Module 6 · WealthTech & Investment Technology — Robo-advisory, Trading Tech, ESG', 'Module 7 · Supply Chain & Trade Finance — TReDS, OCEN, LC/BG, Agri-Finance', 'Module 8 · Data to Decisions + Agile + ITIL — Power BI, SQL, Six Sigma'],
      badge: 'Certificate II — Digital Finance Technologies', badgeBg: 'rgba(91,75,138,.1)', badgeColor: 'var(--purple)',
      headerBg: 'linear-gradient(135deg,var(--light),#F5F0FF)', numColor: 'var(--purple)', titleColor: 'var(--purple-d)', dotColor: 'var(--purple)', footer: '📈 InvestmentTech + 📊 D2D',
    },
    {
      num: 'Part 3 · Months 11–14 · ⭐ Campus Placement Month', title: 'Advanced BFSI & Placement Readiness',
      timeline: '3 months teaching + 1 month Placement Sprint + Capstone',
      modules: ['Module 9 · RegTech & Compliance — AML/KYC, Basel III, DPDPA, SupTech', 'Module 10 · DeFi, Blockchain & Crypto — Smart contracts, CBDC, NFTs in BFSI', 'Module 11 · ESG, Sustainability & Finance Transformation — BRSR, Ind AS, FP&A', 'Module 12 · AI Product Mgmt + Innovation Lab — PPP model, SDLC, MVP Build', 'Placement Sprint · Personality Dev · 2 Mock Interviews · Portfolio · Campus Drives'],
      badge: 'Certificate in Advanced BFSI & Digital Innovation', badgeBg: 'rgba(192,57,43,.1)', badgeColor: '#C0392B',
      headerBg: 'linear-gradient(135deg,#FFF0F0,#FFF5F5)', numColor: '#C0392B', titleColor: '#8B0000', dotColor: '#C0392B', footer: '🔒 RegTech Flagship',
    },
    {
      num: 'Part 4 · Months 16–19', title: 'Digital Leadership — The MiniCEO Program',
      timeline: '3 months teaching + MiniCEO Summit Capstone · 1-month buffer after Part 3',
      modules: ['Module 13 · The MiniCEO Program — CEO mindset, P&L, board communication, M&A, crisis management', 'Module 14 · Accounting & Finance Transformation — CFO 4.0, Ind AS, RPA, IFRS', 'Module 15 · RM, Cards & InsurTech — Relationship banking, claims tech, distribution', 'Module 16 · Global Pathways — UAE, UK, Singapore, Australia, Canada career mapping'],
      badge: 'MBA++ / PGDDF — NSQF Level 7', badgeBg: 'rgba(201,168,76,.15)', badgeColor: '#8B6914',
      headerBg: 'linear-gradient(135deg,#FFF8E1,#FFFAEC)', numColor: '#B8860B', titleColor: '#8B6914', dotColor: 'var(--gold)', footer: '👑 MiniCEO Flagship',
    },
  ];

  return (
    <section id="overview" style={{ background: 'var(--white)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> 24 Months. 4 Parts. 4 Certificates.
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          A Complete <span style={{ color: 'var(--purple)' }}>Digital BFSI</span><br />Learning Journey
        </h2>
        <p className="fade-up fade-up-d2" style={S.sub()}>
          PGDDF is structured in four progressive parts — each 4 months long, each ending with a capstone project presented to an industry panel, and each earning you a formal certificate milestone you can add to your resume immediately.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
          {parts.map((part, i) => (
            <div key={i} className={`fade-up ${i % 2 === 1 ? 'fade-up-d1' : ''}`} style={{
              borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)', transition: 'all .35s',
            }}>
              <div style={{ padding: '30px 32px 24px', background: part.headerBg }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 7, color: part.numColor }}>{part.num}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 800, marginBottom: 5, color: part.titleColor }}>{part.title}</div>
                <div style={{ fontSize: 12, opacity: .7, fontWeight: 500, color: part.titleColor }}>{part.timeline}</div>
              </div>
              <div style={{ padding: '0 32px 28px' }}>
                <ul style={{ listStyle: 'none', marginTop: 16 }}>
                  {part.modules.map((m, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,.05)', fontSize: 13, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: part.dotColor, display: 'inline-block' }} />{m}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '16px 32px', borderTop: '1px solid rgba(0,0,0,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.05em', padding: '5px 13px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 5, background: part.badgeBg, color: part.badgeColor }}>🏅 {part.badge}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{part.footer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RUBRIC SECTION ───────────────────────────────────────────────────────────
function RubricSection() {
  const rubrics = [
    { letter: 'R', title: 'Rigour', body: "Every module is built on the UGC NHEQF Level 7 framework, AICTE's Outcome-Based Education guidelines, and BFSI SSC qualification standards. PGDDF is not a certificate course dressed up — it's a properly credentialled PG programme with 40 formal academic credits.", example: 'Example: Lesson CO mapping, Bloom\'s Level tracking, CO-PO attainment measured every semester — not just at graduation.' },
    { letter: 'U', title: 'Utility', body: "Every lesson, lab, and assessment is designed with one test: 'Will this make our graduate more employable and effective in a real BFSI role?' If it doesn't, it doesn't make the syllabus. Utility drives everything.", example: 'Example: No filler modules. No theory without application. No case study without an Innovation Lab equivalent that you build yourself.' },
    { letter: 'B', title: 'Build', body: 'PGDDF is built around making, not just learning. The BFSI Innovation Lab runs through all 4 Parts. Every student builds a Power BI dashboard, a Python credit model, a no-code FinTech app, and a full capstone project — a digital portfolio that employers can examine.', example: 'Example: By the end of Part 2, every student has a real, shareable digital portfolio on LinkedIn and EcoPro LMS — visible to hiring managers.' },
    { letter: 'R', title: 'Real-World', body: "Content comes from practitioners — FRM, CFA, PRM, NISM-certified industry professionals with 10–20 years of live BFSI experience. Not textbook-based faculty who haven't worked in a bank. Every module includes real case studies, live product walkthroughs, and actual RBI/SEBI documents.", example: 'Example: Lesson 2.4 — GenAI in Credit Risk includes a live walkthrough of a bank\'s actual AI model deployment framework, not a PowerPoint about AI.' },
    { letter: 'I', title: 'Industry', body: 'PGDDF is built to the BFSI SSC Qualification Pack standard, aligned with the National Skills Qualifications Framework (NSQF) Level 7, and co-created with industry partners from banking, FinTech, insurance, and capital markets. We are an industry programme — delivered through academic infrastructure.', example: "Example: BFSI SSC job role codes embedded in every module's qualification descriptor. Module 9 maps directly to the QP for 'Compliance Officer — BFSI'." },
    { letter: 'C', title: 'Career', body: 'Everything in PGDDF ultimately serves one purpose: getting our students into quality BFSI careers. The Placement Readiness Sprint in Month 14, 2 formal mock interviews, the digital portfolio, and 5+ guaranteed interview opportunities are not add-ons — they are curriculum.', example: "Example: The only program where the placement sprint (personality development, mock interviews, portfolio build) is a formal assessed module — not a 'soft skills' afterthought." },
  ];
  return (
    <section id="rubric" style={{
      background: 'linear-gradient(160deg,var(--navy) 0%,#1A1048 50%,var(--navy-m) 100%)',
      position: 'relative', overflow: 'hidden', padding: '96px 48px',
    }}>
      <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
        <p className="fade-up" style={S.sectionLabel('var(--gold)')}>
          <span style={S.labelBar()} /> Our Teaching & Design Framework
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2Dark()}>
          The <span style={{ color: 'var(--gold)' }}>RUBRIC</span> Framework
        </h2>
        <p className="fade-up fade-up-d2" style={{ ...S.sub('rgba(255,255,255,.52)'), marginBottom: 56 }}>
          Every element of PGDDF is designed, validated, and delivered through the RUBRIC framework — our 6-pillar philosophy that ensures every student gets a programme worthy of a Post Graduate Diploma at NSQF Level 7.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          {rubrics.map((r, i) => (
            <div key={i} className="fade-up" style={{ padding: '40px 32px', transition: 'background .3s', position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 60, fontWeight: 900, lineHeight: 1, marginBottom: 16,
                background: 'linear-gradient(135deg,var(--gold),var(--gold-l))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{r.letter}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.48)', lineHeight: 1.7 }}>{r.body}</div>
              <div style={{ marginTop: 14, fontSize: 12, fontStyle: 'italic', color: 'rgba(201,168,76,.58)', lineHeight: 1.55 }}>{r.example}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INNOVATION LAB ───────────────────────────────────────────────────────────
function LabSection() {
  const labCards = [
    { icon: '⚡', title: 'Power BI & MIS', desc: 'Live bank MIS dashboards, NPA heatmaps, branch performance trackers. Real datasets, not sample files.', tag: 'LAB-A: Analytics' },
    { icon: '🛠', title: 'No-Code App Building', desc: 'Build real FinTech apps on Bubble.io and Glide — digital wallet, loan application, insurance claim tool. No coding required.', tag: 'LAB-B: Build' },
    { icon: '📊', title: 'Financial Modelling', desc: 'Credit risk models, DCF valuation, payment economics calculator, PMS performance tracker. Excel + Python.', tag: 'LAB-C: Models' },
    { icon: '🔌', title: 'API & Integration Lab', desc: 'Connect to Razorpay sandbox, NPCI mock APIs, Open Banking data feeds. Build real payment flows.', tag: 'LAB-D: APIs' },
    { icon: '⚖', title: 'Regulatory Simulation', desc: 'KYC compliance audit, RBI Digital Lending Guidelines review, DPDPA data mapping exercise.', tag: 'LAB-F: Compliance' },
    { icon: '🎨', title: 'Product UX & Design', desc: 'Figma wireframes for digital banking apps. User journey mapping. BFSI UX critique sessions.', tag: 'LAB-G: Product' },
    { icon: '🐍', title: 'Python for Finance', desc: 'Credit scoring models, CIBIL data processing, Sharpe ratio calculation, AML detection basics.', tag: 'LAB-H: Python' },
    { icon: '📝', title: 'Strategy & Policy', desc: 'CBDC policy brief, VC investment thesis, DX roadmap for a real BFSI company.', tag: 'LAB-L: Strategy' },
    { icon: '💬', title: 'Pitch & Communication', desc: 'Capstone presentations to industry jury. LinkedIn portfolio publishing. Mock BFSI GD sessions.', tag: 'LAB-P: Comms' },
  ];
  return (
    <section id="lab" style={{ background: 'var(--off)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> Where Learning Becomes Building
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          The BFSI <span style={{ color: 'var(--purple)' }}>Innovation Lab</span>
        </h2>

        {/* Banner */}
        <div className="fade-up" style={{
          background: 'linear-gradient(135deg,var(--purple-d),#0D3B6E)',
          borderRadius: 'var(--radius-2xl)', padding: '48px 56px', marginBottom: 56, position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 40,
        }}>
          <span style={{ position: 'absolute', right: 120, top: '50%', transform: 'translateY(-50%)', fontSize: 160, opacity: .05 }}>⚗</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              BFSI Innovation Lab — Build. Ship. Prove.
            </div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,.62)', lineHeight: 1.7, maxWidth: 540 }}>
              The Innovation Lab is not a computer room — it's a structured, mentor-led environment where you build real FinTech products using industry-grade tools. Every student graduates with a portfolio of 4+ live projects that demonstrate actual capability to hiring managers.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flexShrink: 0 }}>
            {[['4+', 'Live Projects Built'], ['8', 'Lab Types'], ['100%', 'Portfolio-Linked']].map(([num, lbl]) => (
              <div key={num} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 'var(--radius-md)', padding: '16px 24px', textAlign: 'center', minWidth: 140 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>{num}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.48)', fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {labCards.map(({ icon, title, desc, tag }) => (
            <div key={title} className="fade-up" style={{
              background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: 28,
              border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', transition: 'all .3s',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <span style={{ fontSize: 30 }}>{icon}</span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{title}</h4>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</p>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 4, display: 'inline-block', marginTop: 4,
                background: 'var(--light)', color: 'var(--purple)',
              }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SYLLABUS ────────────────────────────────────────────────────────────────
function SyllabusSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Part 1 — Foundations', 'Part 2 — Intermediate', 'Part 3 — Advanced', 'Part 4 — MiniCEO'];

  const syllabusData = [
    {
      header: 'Part 1 — BFSI Foundations & FinTech World',
      subtitle: 'Months 1–3 (Teaching) + Month 4 (Capstone) · 4 Modules · ~280 Student Hours',
      badges: ['🏦 BFSI-DE Flagship (Full)', '~280 Student Hours'],
      modules: [
        {
          id: 'm1', num: 'M1', title: 'BFSI Domain Foundations', meta: 'Banking, Insurance, Capital Markets, MF · 16+9+21 hrs',
          lessons: [
            ['1.1', 'Banking System Architecture', 'Central Bank, SCBs, RRBs, Co-op Banks, SFBs, PBs — hierarchy, regulations, role; RBI Monetary Policy framework; bank balance sheet structure (CASA, FDs, loans, investments)'],
            ['1.2', 'Insurance Domain Deep Dive', 'Life, General, Health insurance — product types, IRDAI regulation, IBNR provisioning, combined ratio; reinsurance; digital transformation trends'],
            ['1.3', 'Capital Markets Architecture', 'NSE/BSE market microstructure; SEBI regulation; Equity, Debt, Derivatives; IPO/FPO process; mutual funds basics; settlement (T+1)'],
            ['1.4', 'Mutual Funds & Asset Management', 'AMC structure, scheme types, NAV calculation, SIP mechanics, AMFI regulations, distributor vs direct plans; AUM data analysis'],
            ['1.5', 'NBFC & Microfinance Landscape', 'NBFC categories (Base, ML, UL), PCA framework, SRO, MFI regulation, FLDG norms, co-lending guidelines 2022'],
            ['1.6', 'Banking Products Technology Stack', 'CBS architecture (Finacle, TCS BaNCS, Oracle FLEXCUBE), mobile banking APIs, internet banking security, UPI integration, trade finance systems'],
            ['1.7', 'Regulatory Architecture of India', 'RBI, SEBI, IRDAI, PFRDA, FMC — jurisdictions, inspection powers, enforcement tools, FSDC coordination mechanism'],
            ['1.8', 'Consumer Protection & Grievance Redressal', 'RBI Ombudsman, SEBI SCORES, IRDAI Bima Bharosa, RERA crossover, DPDPA 2023 basics, RBI Fair Practices Code'],
          ],
        },
        {
          id: 'm2', num: 'M2', title: 'Current Industry & Digital Transformation', meta: 'AI, GenAI, Open Banking · 16+9+22 hrs',
          lessons: [
            ['2.1', 'Digital Transformation Frameworks', 'Digital maturity models, McKinsey 7S in banking, Gartner Hype Cycle for FinTech 2024, BCG DX index for Indian banks'],
            ['2.2', 'Core Banking Modernisation', 'Legacy monolith to cloud-native migration, API-first CBS, headless banking, micro-services architecture, case: RBL Core Transformation'],
            ['2.3', 'Open Banking & Account Aggregator', 'AA ecosystem (FIP/FIU/AA), DEPA framework, OCEN open credit layer, BRE APIs, ONDC financial services integration'],
            ['2.4', 'AI & GenAI in Banking', "LLM deployment in credit analysis, GenAI for customer service, AI in AML/fraud detection, RBI AI governance circular, hallucination risk in BFSI"],
            ['2.5', 'Cloud & Infrastructure in BFSI', 'RBI cloud outsourcing guidelines, multi-cloud strategy in banks, AWS/Azure BFSI solutions, data localisation norms'],
            ['2.6', 'Embedded Finance & BaaS', 'Banking-as-a-Service models, embedded lending (Slice, Uni), embedded insurance, white-label banking APIs'],
            ['2.7', 'Cybersecurity in BFSI', 'RBI Cyber Security Framework, SWIFT Customer Security Programme, PCI-DSS, DPDPA breach notifications, zero-trust architecture'],
            ['2.8', 'Digital Banking UX & Customer Experience', 'D2C banking design principles, Net Promoter Score for financial products, accessibility in banking apps, voice banking, hyper-personalisation'],
          ],
        },
      ],
      capstone: { title: 'BFSI Domain Discovery Report', desc: '20-page professional document + 15-minute presentation to an industry panel. Students choose one BFSI sub-sector, analyse 3 digital disruptions, and map a personal 24-month career development plan.', cert: 'Certificate I — BFSI & FinTech Foundations' },
    },
    {
      header: 'Part 2 — Intermediate Digital BFSI Technologies',
      subtitle: 'Months 6–8 (Teaching) + Month 9 (Capstone) · 4 Modules · ~280 Student Hours',
      badges: ['📈 InvestmentTech (Full)', '📊 Data to Decisions (Full)', '~280 Student Hours'],
      modules: [
        {
          id: 'm5', num: 'M5', title: 'Payments Technology (PaymentsTech)', meta: '16 Tr + 9 Sat + 21 Lab hrs',
          lessons: [
            ['5.1', 'Global Payments Architecture', 'SWIFT, SEPA, ACH, RTP networks, Fedwire; correspondent banking; nostro/vostro accounts; ISO 20022 migration'],
            ['5.2', "India Payments Ecosystem Deep Dive", 'UPI, IMPS, NEFT, RTGS, NACH, FASTag, BBPS — NPCI architecture, RBI Payment Vision 2025, settlement systems'],
            ['5.3', 'Card Payments Technology', 'Card lifecycle, interchange economics, PCI-DSS standards, EMV chip, tokenisation, Visa/Mastercard authorisation flow'],
            ['5.4', 'Digital Wallets & Prepaid Instruments', 'PPI regulation, wallet categories, interoperability, e-RUPI vouchers, CBDC e-Rupee pilot architecture'],
            ['5.5', 'Cross-border Payments & Remittances', 'Correspondent banking costs, SWIFT gpi, RBI remittance regulations, Project Nexus (BIS), crypto in cross-border context'],
            ['5.6', 'Payment Gateway Technology', 'Gateway vs aggregator vs acquirer; API integration, settlement cycles, chargeback management, fraud scoring'],
            ['5.7', 'Merchant Acquiring & POS Technology', 'Physical vs digital POS, QR payments, softPOS, MDR regulation, acquiring economics'],
            ["5.8", "CBDC Architecture & Design", "Retail vs wholesale CBDC, token vs account-based models, offline payments, programmable money, India's e-Rupee"],
          ],
        },
        {
          id: 'm6', num: 'M6', title: 'WealthTech & Investment Technology', meta: '16 Tr + 9 Sat + 23 Lab hrs · 📈 InvestmentTech Flagship',
          lessons: [
            ['6.1', 'Wealth Management Technology Stack', 'RTA platforms, portfolio accounting systems, fee calculation engines; HNI vs mass-affluent service delivery'],
            ['6.2', 'Mutual Funds Technology', 'AMC technology stack, SIP automation, AMFI data infrastructure, MFU transaction platform, RTA integration'],
            ['6.3', 'Robo-Advisory Platforms', 'Algorithm-based portfolio construction, mean-variance optimisation, auto-rebalancing; Smallcase, ET Money, Fisdom'],
            ['6.4', 'Trading Technology & Market Structure', 'OMS, DMA access, algorithmic trading basics, HFT concepts, co-location, market microstructure'],
            ['6.5', 'PMS & AIF Technology', 'PMS vs MF regulatory comparison, performance reporting, waterfall calculations, SEBI AIF categories'],
            ['6.6', 'Retirement & Pension Technology', 'NPS CRA systems, EPFO digital systems, annuity platforms, PFRDA technology architecture'],
            ['6.7', 'ESG Investing & Technology', 'ESG scores (MSCI, Sustainalytics), BRSR mandatory disclosure, SEBI ESG framework, green bonds, TCFD'],
            ['6.8', 'WealthTech Product Management', 'Designing digital wealth experiences, regulatory compliance in WealthTech, SEBI digital advisory norms'],
          ],
        },
      ],
      capstone: { title: 'Digital Finance Technologies Project', desc: 'Build a live analytical dashboard or credit model. Students complete a full data-driven analysis project using Power BI/Python, with a real BFSI dataset and a 15-minute industry panel presentation.', cert: 'Certificate II — Digital Finance Technologies' },
    },
    {
      header: 'Part 3 — Advanced BFSI & Placement Readiness',
      subtitle: 'Months 11–13 (Teaching) + Month 14 (Placement Sprint + Capstone) · 4 Modules + Placement Sprint',
      badges: ['🔒 RegTech Flagship', '⭐ Placement Sprint Month 14', '~280 Student Hours'],
      modules: [
        {
          id: 'm9', num: 'M9', title: 'RegTech & Compliance', meta: '16+9+22 hrs · 🔒 RegTech Flagship',
          lessons: [
            ['9.1', 'Compliance Architecture in BFSI', 'Three lines of defence, Board Risk Committee, Chief Compliance Officer role, compliance universe mapping'],
            ['9.2', 'AML/KYC Technology', 'KYC CDD/EDD, transaction monitoring systems (NICE Actimize, Hawk AI), STR filing process, FATF recommendations'],
            ['9.3', 'Basel III / IV Capital Framework', 'Capital adequacy ratios (CET1, Tier 1, Tier 2), RWA computation, leverage ratio, LCR, NSFR; digital reporting'],
            ['9.4', 'SEBI Regulatory Technology', 'LODR compliance automation, BRSR reporting tech, SEBI SCORES integration, insider trading surveillance systems'],
            ['9.5', 'DPDPA 2023 & Data Privacy', 'Data Principal / Fiduciary framework, consent architecture, breach notification (72 hours), DPDPA impact on FinTech'],
            ["9.6", "SupTech — RBI's Digital Supervision", 'XBRL regulatory reporting, CRILC, CKYC, CKYCR — how RBI uses technology to supervise banks in real time'],
            ['9.7', 'AI Governance & Responsible Finance', 'RBI AI circular, explainability requirements, model risk management for ML models in credit, SEBI algo trading rules'],
            ['9.8', 'RegTech Product Ecosystem', 'ComplyAdvantage, NICE Actimize, Perfios, Signzy, Bureau.id — vendor landscape, product evaluation framework'],
          ],
        },
        {
          id: 'm10', num: 'M10', title: 'DeFi, Blockchain & Crypto in BFSI', meta: '16+9+20 hrs',
          lessons: [
            ['10.1', 'Blockchain Fundamentals for Finance', 'Distributed ledger basics, consensus mechanisms (PoW/PoS), smart contract architecture, gas fees, Layer 1 vs 2'],
            ['10.2', 'Crypto Assets & Regulation', 'VDA taxation in India (30% + 1% TDS), VASP registration, PMLA applicability to crypto, FSB global framework'],
            ['10.3', 'DeFi Protocols & Financial Applications', 'DEX, lending protocols (Aave, Compound), yield farming, liquidity pools, stablecoin mechanics'],
            ['10.4', 'CBDC Deep Dive', 'Wholesale vs retail CBDC, programmability, offline payment capability, global case studies: e-CNY, e-Naira, e-Rupee'],
            ['10.5', 'NFTs in BFSI Applications', 'Security tokens vs NFTs, tokenised real estate, trade finance NFTs, ISIN equivalents, SEBI consultation paper'],
            ['10.6', 'Blockchain in Trade Finance', 'Letter of Credit on blockchain (Contour, Marco Polo), Essdocs, SWIFT blockchain initiatives, TradeLens'],
            ['10.7', 'Enterprise Blockchain in Banking', "RBI's DLT framework, SEBI T+0 settlement pilot, interbank reconciliation blockchain, India's INX/BSE Ebix"],
            ['10.8', 'Crypto Risk & Due Diligence', 'Exchange due diligence, FTX case study, Proof of Reserves, smart contract audit, rug pull identification'],
          ],
        },
      ],
      capstone: { title: 'Advanced BFSI Digital Innovation Thesis', desc: 'Students select a real BFSI problem and build a full solution — compliance tool, FinTech prototype, or strategic transformation proposal — presented to an external industry jury with live Q&A.', cert: 'Certificate in Advanced BFSI & Digital Innovation' },
    },
    {
      header: 'Part 4 — Digital Leadership: The MiniCEO Program',
      subtitle: 'Months 16–18 (Teaching) + Month 19 (MiniCEO Summit) · 4 Modules + Summit Capstone',
      badges: ['👑 MiniCEO Flagship', '🌍 Global Pathways', '~280 Student Hours'],
      modules: [
        {
          id: 'm13', num: 'M13', title: 'The MiniCEO Program', meta: '16+9+24 hrs · 👑 MiniCEO Flagship',
          lessons: [
            ['13.1', 'CEO Mindset & First Principles Thinking', 'Mental models of BFSI CEOs, first-principles problem decomposition, asymmetric risk thinking, time allocation (Eisenhower matrix)'],
            ['13.2', 'P&L Ownership for Business Leaders', 'Reading and owning a BFSI P&L: NII, NIM, cost-to-income ratio, ROAA, ROAE; how a business unit head thinks about numbers'],
            ['13.3', 'Board Communication & Corporate Governance', 'Board deck structure, BFSI board composition (IDs, RMC, AC), regulator interaction, crisis board communication'],
            ['13.4', 'Strategic Planning & OKR Framework', '3-year strategy development, KRA-KPI cascade, OKR for BFSI organisations, balanced scorecard application'],
            ['13.5', 'Digital Transformation Leadership', 'CDO/CTO role, transformation roadmapping, change management in BFSI, McKinsey 3-horizon model'],
            ['13.6', 'M&A in Financial Services', 'Bank merger mechanics (Kotak-ING, HDFC-HDFC Bank), due diligence for FinTech acquisitions, accretion-dilution model'],
            ['13.7', 'Crisis Management in BFSI', 'PMC Bank collapse case, Yes Bank reconstruction, SVB crisis — learnings and frameworks for crisis response'],
            ['13.8', 'MiniCEO Summit — Annual Capstone', 'Board-format presentation of 3-year DX roadmap + M&A strategy for a real BFSI company. External jury of CXOs.'],
          ],
        },
        {
          id: 'm16', num: 'M16', title: 'Global BFSI Career Pathways', meta: '16+9+18 hrs',
          lessons: [
            ['16.1', 'UAE & Gulf BFSI Careers', 'DIFC, Abu Dhabi Global Market (ADGM), CBUAE regulations, free zone companies, Emirates NBD, FAB, Mashreq career paths'],
            ['16.2', 'UK Financial Services Career Map', 'FCA regulated activities, Canary Wharf ecosystem, HSBC/Barclays/Standard Chartered entry pathways, CFA Level 1 relevance'],
            ['16.3', 'Singapore as BFSI Hub', 'MAS regulatory framework, DBS/OCBC/UOB, APAC FinTech hub, Employment Pass pathway, tech talent attraction schemes'],
            ['16.4', 'Australia & Canada BFSI Markets', 'APRA-regulated system (AU), OSFI (CA), big 4 banks entry, PR pathways for BFSI professionals, IELTS/PTE requirements'],
            ['16.5', 'International Credential Recognition', 'ACCA, CFA, FRM, PRM — how PGDDF knowledge maps to these certifications; credit transfer possibilities'],
            ['16.6', 'Global Interview Preparation', 'Western interview culture vs Indian approach, case study interviews (Bain/McKinsey format for banking), salary negotiation globally'],
            ['16.7', 'LinkedIn & Global Personal Branding', 'Building a globally visible BFSI profile, recommendations strategy, content calendar for BFSI thought leadership'],
            ['16.8', 'Final PGDDF Graduation Framework', 'Programme completion requirements, BFSI Fellow recognition, alumni network activation, lifelong LMS access'],
          ],
        },
      ],
      capstone: { title: 'MiniCEO Summit — 3-Year Digital Transformation Roadmap', desc: 'A board-format presentation of a complete 3-year Digital Transformation roadmap for a real BFSI company, plus an M&A strategy brief. Presented to a jury of CXOs in a live summit format. This is the PGDDF final award project.', cert: 'PGDDF — MBA++ · NSQF Level 7 · Upskillize BFSI Fellow' },
    },
  ];

  const [openModules, setOpenModules] = useState({ m1: true, m5: true, m9: true, m13: true });
  const toggleModule = (id) => setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  const currentData = syllabusData[activeTab];

  return (
    <section id="syllabus" style={{ background: 'var(--white)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> 16 Modules · 128 Lessons · 1,200 Hours
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          Detailed <span style={{ color: 'var(--purple)' }}>Syllabus</span>
        </h2>

        {/* Tabs */}
        <div style={{ display: 'flex', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', margin: '44px 0 0' }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              flex: 1, padding: '16px 20px', cursor: 'pointer', border: 'none',
              background: activeTab === i ? 'var(--purple)' : 'var(--off)',
              fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
              color: activeTab === i ? '#fff' : 'var(--muted)',
              letterSpacing: '.03em', transition: 'all .25s', textAlign: 'center',
              borderRight: i < tabs.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 10, opacity: .68, display: 'block', marginBottom: 2 }}>Part {i + 1}</span>
              {tab.replace(/Part \d+ — /, '')}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg,var(--navy),#1A1048)',
            borderRadius: 'var(--radius-lg)', padding: '32px 36px', margin: '28px 0 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18,
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 5 }}>{currentData.header}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{currentData.subtitle}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {currentData.badges.map(b => (
                <span key={b} style={{
                  fontSize: 11, fontWeight: 700, padding: '5px 13px', borderRadius: 100,
                  background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.78)',
                  border: '1px solid rgba(255,255,255,.14)', whiteSpace: 'nowrap',
                }}>{b}</span>
              ))}
            </div>
          </div>

          {currentData.modules.map((mod) => (
            <div key={mod.id} style={{ marginBottom: 36 }}>
              <div onClick={() => toggleModule(mod.id)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px',
                borderRadius: openModules[mod.id] ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
                cursor: 'pointer', userSelect: 'none', background: 'var(--light)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800,
                  width: 72, padding: '5px 8px', borderRadius: 6, textAlign: 'center',
                  flexShrink: 0, background: 'var(--purple)', color: '#fff',
                }}>{mod.num}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, flex: 1, color: 'var(--purple-d)' }}>{mod.title}</span>
                <span style={{ fontSize: 12, opacity: .68, whiteSpace: 'nowrap', color: 'var(--purple)' }}>{mod.meta}</span>
                <span style={{ fontSize: 13, transition: 'transform .25s', transform: openModules[mod.id] ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              {openModules[mod.id] && (
                <div style={{ border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)', overflow: 'hidden', animation: 'fadeIn .3s ease' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: 'var(--purple)' }}>
                        <th style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', borderBottom: '2px solid rgba(255,255,255,.14)', color: '#fff', width: 64 }}>#</th>
                        <th style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', borderBottom: '2px solid rgba(255,255,255,.14)', color: '#fff' }}>Lesson Title</th>
                        <th style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', borderBottom: '2px solid rgba(255,255,255,.14)', color: '#fff' }}>Key Learning Outcomes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mod.lessons.map(([num, title, outcomes]) => (
                        <tr key={num} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '13px 16px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, color: 'var(--purple)' }}>{num}</td>
                          <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--navy)', verticalAlign: 'top', lineHeight: 1.55 }}>{title}</td>
                          <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--muted)', verticalAlign: 'top', lineHeight: 1.6 }}>{outcomes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {/* Capstone */}
          <div style={{ background: 'linear-gradient(135deg,#E8F5EE,#D4EEE0)', border: '1.5px solid #A8D5BC', borderRadius: 'var(--radius-md)', padding: '26px 30px', margin: '20px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 7, fontFamily: 'var(--font-display)' }}>Capstone Project</div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--navy)', marginBottom: 7 }}>{currentData.capstone.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>{currentData.capstone.desc}</p>
            <span style={{ display: 'inline-block', background: 'rgba(26,138,90,.1)', color: 'var(--green)', fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 6 }}>🏅 Earns: {currentData.capstone.cert}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ASSESSMENT FRAMEWORK ─────────────────────────────────────────────────────
function AssessmentSection() {
  const [activeTab, setActiveTab] = useState('rubric');
  const tabs = [
    { id: 'rubric', label: 'Assessment Overview' },
    { id: 'blooms', label: "Bloom's Taxonomy" },
    { id: 'po-tab', label: 'Programme Outcomes' },
    { id: 'co-tab', label: 'CO-PO Mapping' },
  ];
  return (
    <section id="assessment" style={{ background: 'var(--off)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> AICTE OBE · UGC NHEQF · NSQF Level 7
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          Assessment &amp; Academic <span style={{ color: 'var(--purple)' }}>Framework</span>
        </h2>

        <div style={{ display: 'flex', gap: 4, background: 'var(--light)', borderRadius: 'var(--radius-md)', padding: 5, marginBottom: 40 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flex: 1, padding: '11px 16px', cursor: 'pointer', border: 'none', borderRadius: 8,
              background: activeTab === t.id ? 'var(--purple)' : 'transparent',
              color: activeTab === t.id ? '#fff' : 'var(--muted)',
              fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, transition: 'all .25s',
            }}>{t.label}</button>
          ))}
        </div>

        {activeTab === 'rubric' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 7 }}>Assessment Philosophy</h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 32, maxWidth: 800 }}>PGDDF uses a continuous, multi-modal assessment architecture that goes far beyond MCQ exams. Our model is designed to measure what matters: not what students can memorise, but what they can demonstrate, build, and deliver in a professional environment.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[
                { label: 'Formative (40%)', items: ['Weekly MCQ quizzes (auto-graded via EcoPro LMS)', 'Module assignments (1 per module = 16 total)', 'Peer review sessions — structured BFSI case discussion', 'Class participation assessed via EcoPro engagement score'] },
                { label: 'Summative (30%)', items: ['End-of-part written exam (2 hours, open-reference format)', 'Power BI / SQL practical test (timed, invigilated)', "Case study analysis (written, Bloom's L4–L5 questions)", 'Online proctored exam via Mettl/TCS iON platform'] },
                { label: 'Capstone (30%)', items: ['4 capstone projects (one per Part, presented to industry panel)', 'Innovation Lab portfolio (8 lab types, 4 major builds)', 'Professional portfolio published on EcoPro LMS + LinkedIn', 'External jury evaluation + Upskillize quality moderation'] },
              ].map(({ label, items }) => (
                <div key={label} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28, boxShadow: 'var(--shadow-card)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>{label}</h4>
                  <ul style={{ listStyle: 'none' }}>
                    {items.map(item => (
                      <li key={item} style={{ fontSize: 13, color: 'var(--muted)', padding: '6px 0', paddingLeft: 16, position: 'relative', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontSize: 11 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blooms' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 7 }}>Bloom's Taxonomy Alignment</h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 32, maxWidth: 800 }}>All PGDDF assessments are classified against Bloom's Revised Taxonomy (Anderson &amp; Krathwohl, 2001). AICTE OBE Guidelines §4 require that PG programmes maintain ≥60% of all assessment activities at Bloom's Level 4 (Analyse) or above. PGDDF achieves <strong>68%</strong> — exceeding the threshold by 8 percentage points.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
              {[
                { num: 'L1', name: 'REMEMBER', desc: 'Recall facts, definitions, and foundational concepts from BFSI domain', verbs: 'Define · List · Name · Recall · Identify', bg: '#EBF4FF', border: '#C3D9F5', numColor: 'var(--blue)', nameColor: 'var(--blue)', descColor: '#2C5282', verbColor: '#4A7CBF' },
                { num: 'L2', name: 'UNDERSTAND', desc: 'Explain concepts, classify BFSI instruments, describe regulatory frameworks', verbs: 'Explain · Describe · Classify · Summarise', bg: 'var(--light)', border: '#D0C8EC', numColor: 'var(--purple)', nameColor: 'var(--purple)', descColor: 'var(--purple-d)', verbColor: 'var(--purple-l)' },
                { num: 'L3', name: 'APPLY', desc: 'Use tools (Power BI, SQL, Excel) and frameworks on real BFSI scenarios', verbs: 'Apply · Build · Calculate · Demonstrate', bg: '#FFF8E1', border: '#E8D095', numColor: '#8B6914', nameColor: '#8B6914', descColor: '#5C3D00', verbColor: '#9A7020' },
                { num: 'L4', name: 'ANALYSE', desc: 'Break down BFSI problems, compare approaches, identify patterns in data', verbs: 'Analyse · Compare · Differentiate · Examine', bg: '#E8F5EE', border: '#A8D5BC', numColor: 'var(--green)', nameColor: 'var(--green)', descColor: '#1A4A2A', verbColor: '#2A7A4A' },
                { num: 'L5', name: 'EVALUATE', desc: 'Judge quality of BFSI solutions, assess regulatory compliance, critique business models', verbs: 'Evaluate · Justify · Critique · Assess', bg: '#FDE8DC', border: '#F0B090', numColor: 'var(--orange)', nameColor: 'var(--orange)', descColor: '#8B3A00', verbColor: '#C05020' },
                { num: 'L6', name: 'CREATE', desc: 'Design digital BFSI products, build prototypes, formulate transformation strategies', verbs: 'Design · Build · Propose · Construct · Formulate', bg: '#FAE0E0', border: '#F0A8A8', numColor: '#C0392B', nameColor: '#C0392B', descColor: '#8B0000', verbColor: '#C0392B' },
              ].map(b => (
                <div key={b.num} style={{ padding: 20, borderRadius: 'var(--radius-md)', background: b.bg, border: `1px solid ${b.border}` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 900, color: b.numColor, lineHeight: 1 }}>{b.num}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: b.nameColor, marginTop: 4 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: b.descColor, lineHeight: 1.55, marginTop: 6 }}>{b.desc}</div>
                  <div style={{ fontSize: 11, color: b.verbColor, marginTop: 8, fontStyle: 'italic' }}>{b.verbs}</div>
                </div>
              ))}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: 'var(--white)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <thead style={{ background: 'var(--navy)' }}>
                <tr>
                  {["Programme Part", "Primary Bloom's Levels", "Dominant Assessment Type", "Example Activities", "L4+ %"].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontSize: 12, fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Part 1 — Foundations', 'L1 → L3 with L4 in Modules 3–4', 'MCQ quizzes, structured case study discussions, Excel model builds', 'Build a credit scorecard (L3) · Compare bank vs FinTech business models (L4)', '35%', 'var(--orange)'],
                  ['Part 2 — Intermediate', 'L3 → L5 with growing L4–L5', 'Power BI dashboards, API testing, Agile sprint simulations', 'Build NPA dashboard (L3) · Evaluate MDR impact on merchant economics (L5)', '58%', 'var(--purple)'],
                  ['Part 3 — Advanced', 'L4 → L6 — all assessments at L4+', 'RegTech compliance audits, DeFi research briefs, VC pitch decks', 'Evaluate BRSR disclosures of 5 banks (L5) · Design CBDC wallet UX (L6)', '82%', 'var(--green)'],
                  ['Part 4 — MiniCEO', 'L5 → L6 — exclusively higher-order', 'Board presentations, M&A models, crisis simulations, MiniCEO Summit thesis', 'Formulate 3-yr DX roadmap (L6) · Evaluate M&A accretion/dilution (L5)', '94%', 'var(--green)'],
                ].map(([part, levels, type, examples, pct, color]) => (
                  <tr key={part} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--text)' }}>{part}</td>
                    <td style={{ padding: '13px 16px', color: 'var(--navy)', fontWeight: 600 }}>{levels}</td>
                    <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 12 }}>{type}</td>
                    <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 12 }}>{examples}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 800, color, fontSize: 16 }}>{pct}</td>
                  </tr>
                ))}
                <tr style={{ background: 'var(--light)' }}>
                  <td style={{ padding: '13px 16px', fontWeight: 800, color: 'var(--text)' }}>Programme Total</td>
                  <td style={{ padding: '13px 16px', fontWeight: 700 }}>Balanced L1–L6 progression</td>
                  <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 12 }}>Mix of formative + summative + capstone</td>
                  <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 12 }}>Progressive complexity engineered across 24 months</td>
                  <td style={{ padding: '13px 16px', fontWeight: 800, color: 'var(--purple)', fontSize: 18 }}>68%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'po-tab' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 7 }}>Programme Outcomes (POs)</h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 32, maxWidth: 800 }}>The 8 Programme Outcomes of PGDDF are derived directly from UGC NHEQF Level 7 Graduate Attributes. They define what every student will be able to demonstrate upon successful completion of the programme.</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: 'var(--white)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <thead style={{ background: 'var(--navy)' }}>
                  <tr>
                    {['PO', 'Programme Outcome Title', 'Full Statement — Demonstrated Capability', 'NHEQF L7 Attribute', "Bloom's Target", 'Assessed In'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { po: 'PO1', bg: '#EBF4FF', color: 'var(--blue)', title: 'BFSI Domain Competency', statement: 'Demonstrate comprehensive, integrated knowledge of the Indian BFSI ecosystem — banking, NBFC, insurance, capital markets, payments, FinTech, and regulation — and apply domain knowledge to analyse and resolve sector-specific business problems.', attr: 'Disciplinary Knowledge & Expertise', bloom: 'L4 Analyse', bloomBg: 'var(--green)', assessed: 'M1–M4, M13, Capstones 1 & 4' },
                    { po: 'PO2', bg: 'var(--light)', color: 'var(--purple)', title: 'Digital Technology Proficiency', statement: 'Apply industry-standard digital tools — Power BI, SQL, Python, no-code platforms, Figma, and AI tools — to build functional BFSI solutions, dashboards, financial models, and API-integrated prototypes.', attr: 'Skill Development & Application', bloom: 'L3 Apply', bloomBg: 'var(--blue)', assessed: 'M2, M5–M8, Innovation Lab, all Capstones' },
                    { po: 'PO3', bg: '#FFF8E1', color: '#8B6914', title: 'Regulatory & Compliance Intelligence', statement: 'Evaluate BFSI regulatory frameworks — RBI, SEBI, IRDAI, PFRDA, DPDPA, Basel III/IV, NSQF — and design compliance-aligned processes, reporting systems, and technology solutions.', attr: 'Critical Thinking & Analysis', bloom: 'L5 Evaluate', bloomBg: 'var(--orange)', assessed: 'M1.8, M2.7, M9 (all), M10.3, M11.2' },
                    { po: 'PO4', bg: '#E8F5EE', color: 'var(--green)', title: 'Product & Innovation Thinking', statement: 'Design digital BFSI products and services using structured product management methodologies — PPP model, PRD writing, Agile/Scrum delivery, SDLC — and build functional prototypes using Innovation Lab tools.', attr: 'Problem Solving & Innovation', bloom: 'L6 Create', bloomBg: '#C0392B', assessed: 'M3, M8, M11.8, M12, Capstones 2–4' },
                    { po: 'PO5', bg: '#FDE8DC', color: 'var(--orange)', title: 'Data-Driven Decision Making', statement: 'Analyse BFSI datasets using Power BI, SQL, and Python to produce actionable insights, executive-ready MIS dashboards, credit risk models, ESG scorecards, and FP&A projections.', attr: 'Analytical Reasoning & Quantitative Skills', bloom: 'L4 Analyse', bloomBg: 'var(--green)', assessed: 'M4.7, M8 (all), M11.5–11.7, M14.7' },
                    { po: 'PO6', bg: '#FAE0E0', color: '#C0392B', title: 'Professional Readiness & Employability', statement: 'Demonstrate industry-level professional competencies — BFSI-optimised resume, mock interview performance, GD/PI skills, LinkedIn personal branding, digital portfolio — and successfully transition into a quality BFSI career placement.', attr: 'Communication & Career Development', bloom: 'L3 Apply', bloomBg: 'var(--blue)', assessed: 'M12.8, Placement Sprint (M3, Month 14), M16' },
                    { po: 'PO7', bg: '#EDE9F7', color: 'var(--purple)', title: 'Leadership & Strategic Thinking', statement: 'Evaluate complex BFSI business situations from a senior leadership perspective — P&L management, board communication, digital transformation roadmapping, M&A decisions, and crisis management — applying the MiniCEO Program framework.', attr: 'Leadership, Management & Governance', bloom: 'L5 Evaluate', bloomBg: 'var(--orange)', assessed: 'M13 (all), M14.1, M12.4–12.6, Capstone 4' },
                    { po: 'PO8', bg: '#E0F2F1', color: 'var(--teal)', title: 'Global & Ethical Awareness', statement: 'Assess BFSI career opportunities and regulatory environments across UAE, UK, Singapore, Australia, and Canada; demonstrate ethical decision-making in financial services, ESG sustainability responsibility, and DPDPA/data privacy compliance.', attr: 'Global Citizenship & Ethics', bloom: 'L5 Evaluate', bloomBg: 'var(--orange)', assessed: 'M11.1–11.2, M15.8, M16.1–16.3, M10.3' },
                  ].map(p => (
                    <tr key={p.po} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '13px 16px' }}><span style={{ background: p.bg, color: p.color, fontWeight: 800, padding: '4px 10px', borderRadius: 6, fontSize: 12 }}>{p.po}</span></td>
                      <td style={{ padding: '13px 16px', fontWeight: 700, color: 'var(--navy)' }}>{p.title}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 12, lineHeight: 1.55 }}>{p.statement}</td>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--muted)' }}>{p.attr}</td>
                      <td style={{ padding: '13px 16px' }}><span style={{ background: p.bloomBg, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 4 }}>{p.bloom}</span></td>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--muted)' }}>{p.assessed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'co-tab' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 7 }}>CO-PO Mapping Matrix</h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16, maxWidth: 800 }}>Each lesson's Course Outcomes (COs) are mapped against all 8 Programme Outcomes on a 1–3 scale. This matrix is the primary evidence document for UGC OBE compliance, NAAC accreditation, and BFSI SSC validation.</p>
            <div style={{ background: 'var(--light)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px 22px', marginBottom: 24 }}>
              <strong>Mapping Scale:</strong> <span style={{ color: 'var(--orange)' }}>3 — High</span> (Direct, strong contribution) &nbsp;&nbsp;
              <span style={{ color: 'var(--purple)' }}>2 — Medium</span> (Moderate contribution) &nbsp;&nbsp;
              <span style={{ color: 'var(--muted)' }}>1 — Low</span> (Minor contribution) &nbsp;&nbsp;
              <span style={{ color: '#ccc' }}>— None</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, background: 'var(--white)', border: '1px solid var(--border)' }}>
                <thead>
                  <tr style={{ background: 'var(--navy)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#fff', minWidth: 260 }}>Lesson / Course Outcome</th>
                    {['PO1\nDomain', 'PO2\nDigital', 'PO3\nRegul.', 'PO4\nProduct', 'PO5\nData', 'PO6\nEmploy.', 'PO7\nLeader', 'PO8\nGlobal'].map(h => (
                      <th key={h} style={{ padding: '10px 8px', color: '#fff', textAlign: 'center', whiteSpace: 'pre-line', fontSize: 10 }}>{h}</th>
                    ))}
                    <th style={{ padding: '10px 8px', color: '#fff', textAlign: 'center', background: '#8B6914' }}>Bloom's</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['1.1 — Banking System Architecture', '3', '1', '2', '1', '1', '—', '—', '—', 'L2'],
                    ['1.2 — Insurance Domain Deep Dive', '3', '1', '2', '1', '—', '—', '—', '1', 'L2'],
                    ['1.3 — Capital Markets Architecture', '3', '1', '2', '1', '1', '—', '—', '1', 'L2'],
                    ['1.4 — Mutual Funds & Asset Management', '3', '1', '2', '1', '2', '—', '—', '—', 'L3'],
                    ['1.5 — NBFC & Microfinance Landscape', '3', '1', '3', '1', '1', '—', '—', '—', 'L2'],
                    ['1.6 — Banking Products Technology Stack', '2', '3', '2', '2', '2', '—', '—', '—', 'L3'],
                    ['1.7 — Regulatory Architecture of India', '2', '1', '3', '1', '—', '—', '—', '1', 'L2'],
                    ['1.8 — Consumer Protection & Grievance', '2', '1', '3', '—', '—', '1', '—', '2', 'L3'],
                  ].map(([lesson, ...vals]) => (
                    <tr key={lesson} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--navy)' }}>{lesson}</td>
                      {vals.slice(0, 8).map((v, i) => (
                        <td key={i} style={{ padding: '10px 8px', textAlign: 'center', color: v === '3' ? 'var(--orange)' : v === '2' ? 'var(--purple)' : v === '1' ? 'var(--muted)' : '#ddd', fontWeight: 700 }}>{v}</td>
                      ))}
                      <td style={{ padding: '10px 8px', textAlign: 'center', background: 'rgba(201,168,76,.08)', fontWeight: 700, color: '#8B6914' }}>{vals[8]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── STARTUP & PRODUCT SECTION ────────────────────────────────────────────────
function StartupSection() {
  return (
    <section id="startup" style={{ background: 'var(--white)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> Build, Launch, Lead
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          Startup Readiness &amp; <span style={{ color: 'var(--purple)' }}>Product Management</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start', marginTop: 56 }}>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { bg: '#EBF4FF', icon: '🚀', title: 'FinTech Startup Launchpad', body: 'End-to-end startup bootcamp — idea validation using Jobs-to-be-Done framework, business model canvas for FinTech, regulatory sandbox entry, MVP development, and VC pitch preparation. Real mentorship from founders.' },
              { bg: 'var(--light)', icon: '📦', title: 'Product Management for BFSI', body: 'The PPP Model (People, Process, Product), Agile/Scrum in financial services, PRD writing with regulatory annotations, SDLC and reverse SDLC, API product management, and the full product lifecycle from discovery to delivery.' },
              { bg: '#E8F5EE', icon: '💰', title: 'VC & Investor Relations', body: 'How FinTech investors think — TAM/SAM/SOM, unit economics (CAC, LTV, payback period), due diligence process, term sheet navigation, pitch deck design, and live mock VC pitch with investor feedback.' },
              { bg: '#FFF0F0', icon: '⚖', title: 'Regulatory Compliance as Competitive Advantage', body: 'Understanding RBI, SEBI, IRDAI sandbox frameworks, DPDPA compliance architecture, data privacy by design — taught as strategic assets, not administrative burdens.' },
              { bg: '#FFF8E1', icon: '📊', title: 'Data-Driven Product Decisions', body: 'A/B testing for financial products, cohort analysis for BFSI apps, NPS measurement, funnel analytics, Power BI for product dashboards, and real-time MIS for product managers.' },
              { bg: '#F0EBF9', icon: '🤝', title: 'Co-Founder & Team Dynamics', body: 'How great FinTech teams work — founding team composition, equity splitting, ESOP structures, conflict resolution, communication frameworks, and building a culture of accountability.' },
            ].map(({ bg, icon, title, body }) => (
              <div key={title} className="fade-up" style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'start',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 22,
                boxShadow: 'var(--shadow-card)', transition: 'all .3s',
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, background: bg }}>{icon}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: 'linear-gradient(160deg,var(--navy),#1A1048)', borderRadius: 'var(--radius-xl)', padding: 36 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 18, lineHeight: 1.2 }}>
                Career Roles for <span style={{ color: 'var(--gold)' }}>Product & Startup</span> Track
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { title: 'Product Manager', sub: 'FinTech / Digital Bank', salary: '₹12–35 LPA' },
                  { title: 'FinTech Founder', sub: 'Own Startup', salary: 'Equity Value' },
                  { title: 'Business Analyst', sub: 'BFSI Consulting', salary: '₹8–20 LPA' },
                  { title: 'Innovation Lead', sub: 'Bank / NBFC', salary: '₹15–30 LPA' },
                  { title: 'VC Analyst', sub: 'BFSI Venture Fund', salary: '₹10–25 LPA' },
                  { title: 'CDO Office', sub: 'Digital Banking', salary: '₹20–45 LPA' },
                ].map(({ title, sub, salary }) => (
                  <div key={title} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 'var(--radius-md)', padding: 14, transition: 'all .3s' }}>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{title}</h5>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.42)' }}>{sub}</p>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginTop: 8 }}>{salary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CAREER SECTION ───────────────────────────────────────────────────────────
function CareerSection() {
  const [activeCareer, setActiveCareer] = useState('payments');
  const careerTabs = [
    { id: 'payments', label: '💳 Payments' },
    { id: 'wealthtech', label: '📈 WealthTech' },
    { id: 'regtech', label: '🔒 RegTech' },
    { id: 'insurtech', label: '🛡 InsurTech' },
    { id: 'data', label: '📊 Data' },
    { id: 'global', label: '🌍 Global' },
  ];

  const careerData = {
    payments: [
      { domain: 'PAYMENTS · PRODUCT', domainColor: 'var(--blue)', role: 'Product Manager — Payments / UPI', company: 'PhonePe · Razorpay · PayU · Cashfree · BharatPe', salary: '₹14 – 40 LPA', exp: 'Mid · 2–5 years experience', skills: ['UPI product lifecycle management', 'Payment API design & integration', 'RBI PA/PG regulation compliance', 'Merchant economics & MDR optimisation'], growth: 'Growth → Head of Payments Product · ₹45–70 LPA' },
      { domain: 'PAYMENTS · RISK', domainColor: 'var(--blue)', role: 'Payments Risk & Fraud Analyst', company: 'Visa · Mastercard · NPCI · Worldline · Fiserv', salary: '₹7 – 18 LPA', exp: 'Entry–Mid · 0–3 years', skills: ['Transaction monitoring & fraud rules', 'Card fraud pattern analysis', 'Chargeback management', 'PCI-DSS compliance fundamentals'], growth: 'Growth → Risk Lead / AVP Fraud Management · ₹22–38 LPA' },
      { domain: 'PAYMENTS · ANALYTICS', domainColor: 'var(--blue)', role: 'Payments Data Analyst', company: 'Juspay · Setu · M2P · Cashfree · Razorpay', salary: '₹6 – 15 LPA', exp: 'Entry–Mid · 0–3 years', skills: ['Payments funnel analysis', 'SQL for transaction databases', 'Power BI settlement dashboards', 'Reconciliation automation'], growth: 'Growth → Senior Analyst / BI Lead · ₹18–30 LPA' },
    ],
    wealthtech: [
      { domain: 'WEALTHTECH · RM', domainColor: 'var(--teal)', role: 'Relationship Manager — Wealth / BFSI', company: 'HDFC Bank · Kotak Bank · Axis Bank · ICICI Bank · SBI', salary: '₹6 – 15 LPA + incentives', exp: 'Entry–Mid · 0–3 years experience', skills: ['Investment product knowledge (MF, PMS, Bonds)', 'Client financial planning basics', 'AMFI/NISM certifications', 'CRM platform proficiency'], growth: 'Growth → Senior RM / PMS Manager · ₹15–30 LPA' },
      { domain: 'WEALTHTECH · PRODUCT', domainColor: 'var(--teal)', role: 'Product Manager — WealthTech / Robo-Advisory', company: 'Fisdom · Kuvera · INDmoney · Scripbox', salary: '₹12 – 30 LPA', exp: 'Mid · 2–5 years experience', skills: ['Algorithm-based portfolio construction', 'WealthTech UX design (Figma)', 'SEBI digital advisory compliance', 'ESG investing integration'], growth: 'Growth → Head of Product · ₹35–60 LPA' },
      { domain: 'WEALTHTECH · PRIVATE BANKING', domainColor: 'var(--teal)', role: 'Private Banker / Family Office Analyst', company: 'Kotak Wealth · HDFC Private · IIFL Wealth · 360 ONE', salary: '₹8 – 20 LPA', exp: 'Mid · 1–4 years experience', skills: ['HNI client profiling and advisory', 'Estate planning and succession', 'PMS / AIF structuring knowledge', 'CRM platform proficiency'], growth: 'Growth → Relationship Head · ₹25–50 LPA + performance' },
    ],
    regtech: [
      { domain: 'REGTECH · AML/KYC', domainColor: 'var(--navy)', role: 'AML Analyst / KYC Officer', company: 'HSBC · Deutsche Bank · JP Morgan · Citibank · Standard Chartered', salary: '₹5.5 – 12 LPA', exp: 'Entry–Mid · 0–3 years experience', skills: ['AML/CFT regulation and typologies', 'Transaction monitoring tool experience', 'KYC CDD/EDD procedures', 'PMLA / FEMA knowledge'], growth: 'Growth → AML Manager / AVP Compliance · ₹18–32 LPA' },
      { domain: 'REGTECH · REPORTING', domainColor: 'var(--navy)', role: 'Regulatory Reporting Analyst', company: 'ICICI Bank · Axis Bank · RBI-regulated NBFCs · Consulting firms', salary: '₹5 – 10 LPA', exp: 'Entry–Mid · 0–2 years', skills: ['RBI BSR / CRILC / XBRL reporting', 'SEBI LODR / BRSR compliance', 'Basel III capital computation', 'Excel / Power BI for regulatory data'], growth: 'Growth → Senior Analyst / DGM Regulatory · ₹15–28 LPA' },
      { domain: 'REGTECH · TECHNOLOGY', domainColor: 'var(--navy)', role: 'RegTech Product Manager / Compliance Technologist', company: 'ComplyAdvantage · NICE Actimize · Perfios · Signzy', salary: '₹10 – 28 LPA', exp: 'Mid · 2–5 years experience', skills: ['RegTech vendor landscape knowledge', 'AI/ML for compliance applications', 'DPDPA 2023 implementation', 'Regulatory API design experience'], growth: 'Growth → Head of Compliance Technology · ₹35–55 LPA' },
    ],
    insurtech: [
      { domain: 'INSURTECH · CLAIMS', domainColor: 'var(--green)', role: 'Claims Technology Analyst', company: 'Acko · Digit · PolicyBazaar · Tata AIG · HDFC ERGO', salary: '₹5 – 11 LPA', exp: 'Entry · 0–2 years experience', skills: ['Digital FNOL process design', 'AI-based damage assessment tools', 'Insurance fraud detection basics', 'Claims workflow automation'], growth: 'Growth → Claims Tech Lead / Product Manager · ₹15–28 LPA' },
      { domain: 'INSURTECH · PRODUCT', domainColor: 'var(--green)', role: 'InsurTech Product Manager', company: 'Acko · Digit Insurance · Navi · Riskcovry · Onsurity', salary: '₹12 – 35 LPA', exp: 'Mid · 2–5 years experience', skills: ['InsurTech product lifecycle', 'IRDAI sandbox and regulatory knowledge', 'Bima Sugam platform architecture', 'Embedded insurance design'], growth: 'Growth → Director of Product / CPO · ₹45–70 LPA' },
      { domain: 'INSURTECH · DISTRIBUTION', domainColor: 'var(--green)', role: 'Digital Distribution Analyst / PoSP Manager', company: 'PolicyBazaar · Coverfox · Turtlemint · InsuranceDekho', salary: '₹4.5 – 9 LPA', exp: 'Entry · 0–2 years experience', skills: ['IRDAI PoSP norms and compliance', 'Web aggregator platform operations', 'Insurance CRM and renewals', 'Bancassurance technology models'], growth: 'Growth → Distribution Head / Partnerships Manager · ₹14–25 LPA' },
    ],
    data: [
      { domain: 'DATA · ANALYTICS', domainColor: 'var(--orange)', role: 'Data Analyst — BFSI', company: 'Bajaj Finserv · SBI Cards · Kotak · Deloitte · EY · KPMG', salary: '₹5.5 – 12 LPA', exp: 'Entry–Mid · 0–3 years experience', skills: ['Power BI dashboards and DAX', 'SQL queries on BFSI databases', 'Excel financial modelling', 'Data storytelling for executives'], growth: 'Growth → Senior Analyst / BI Lead · ₹16–28 LPA' },
      { domain: 'DATA · RISK', domainColor: 'var(--orange)', role: 'Credit Risk Analytics Specialist', company: 'HDFC Bank · ICICI Bank · Bajaj Finance · Home Credit', salary: '₹6 – 14 LPA', exp: 'Mid · 1–3 years experience', skills: ['PD/LGD/EAD modelling', 'Python/R for credit analytics', 'Ind AS 109 ECL computation', 'Credit scorecard development'], growth: 'Growth → Risk Model Lead / AVP Risk Analytics · ₹22–40 LPA' },
      { domain: 'DATA · FP&A', domainColor: 'var(--orange)', role: 'FP&A Analyst / Finance Business Partner', company: 'Bajaj Finserv · Aditya Birla Capital · Muthoot Finance', salary: '₹6 – 13 LPA', exp: 'Mid · 1–3 years experience', skills: ['Driver-based P&L modelling', 'Rolling forecast design', 'Power BI for CFO dashboards', 'Scenario analysis and stress testing'], growth: 'Growth → FP&A Manager / Finance Controller · ₹20–38 LPA' },
    ],
    global: [
      { domain: 'GLOBAL · UAE / GULF', domainColor: 'var(--gold)', role: 'BFSI Analyst — UAE / DIFC', company: 'Emirates NBD · FAB · Mashreq · ADCB · ENBD Securities', salary: 'AED 8,000 – 18,000/mo', exp: '≈ ₹18–42 LPA · Tax-free income', skills: ['BFSI domain expertise (PGDDF certified)', 'English proficiency + Arabic advantage', 'CBUAE / DFSA regulatory knowledge', 'Power BI and data analytics'], growth: 'Growth → Senior Manager · AED 25–50K/mo (Golden Visa eligible)' },
      { domain: 'GLOBAL · UK / SINGAPORE', domainColor: 'var(--gold)', role: 'Financial Analyst / FinTech Associate', company: 'HSBC · Barclays · Standard Chartered · DBS · OCBC', salary: 'GBP 35–55K / SGD 55–85K pa', exp: 'Entry–Mid · Visa sponsorship common', skills: ['FCA (UK) / MAS (SG) regulatory knowledge', 'BFSI technology skills', 'ACCA / CFA partial exemptions possible', 'Product and analytics background'], growth: 'Growth → AVP · GBP 65–90K / SGD 100–140K' },
      { domain: 'GLOBAL · AUSTRALIA / CANADA', domainColor: 'var(--gold)', role: 'BFSI Risk / Compliance Analyst', company: 'ANZ · NAB · Commonwealth Bank · TD Bank · RBC · Scotiabank', salary: 'AUD 70–100K / CAD 65–95K pa', exp: 'Mid · PR pathways available', skills: ['APRA (AU) / OSFI (CA) regulatory knowledge', 'Risk and compliance fundamentals', 'Data analytics (Power BI / SQL)', 'BFSI domain certification'], growth: 'Growth → Senior Analyst / PR → Citizenship pathway' },
    ],
  };

  return (
    <section id="careers" style={{ background: 'var(--white)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> 50+ Roles Across 6 Verticals
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          Career <span style={{ color: 'var(--purple)' }}>Pathways</span>
        </h2>
        <p className="fade-up fade-up-d2" style={S.sub()}>
          PGDDF graduates enter BFSI careers across 6 distinct verticals — each with a defined entry salary range, a clear growth trajectory, and a mapped set of skills that the program deliberately builds.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {careerTabs.map(t => (
            <button key={t.id} onClick={() => setActiveCareer(t.id)} style={{
              padding: '10px 20px', cursor: 'pointer',
              border: activeCareer === t.id ? '2px solid var(--purple)' : '2px solid var(--border)',
              background: activeCareer === t.id ? 'var(--purple)' : 'var(--white)',
              color: activeCareer === t.id ? '#fff' : 'var(--text)',
              borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
              transition: 'all .25s',
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {(careerData[activeCareer] || []).map(({ domain, domainColor, role, company, salary, exp, skills, growth }) => (
            <div key={role} className="fade-up" style={{
              background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28,
              boxShadow: 'var(--shadow-card)', transition: 'all .3s',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: domainColor, marginBottom: 8, fontFamily: 'var(--font-display)' }}>{domain}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--navy)', marginBottom: 7, lineHeight: 1.3 }}>{role}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{company}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--green)', marginBottom: 3 }}>{salary}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>{exp}</div>
              <ul style={{ listStyle: 'none', marginBottom: 16 }}>
                {skills.map(s => (
                  <li key={s} style={{ fontSize: 12, color: 'var(--text)', padding: '4px 0', paddingLeft: 14, position: 'relative', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontSize: 10 }}>●</span>{s}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{growth}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CAREER JOURNEY ───────────────────────────────────────────────────────────
function CareerJourneySection() {
  const steps = [
    { circle: 'linear-gradient(135deg,#EBF4FF,#D6E8FF)', icon: '🎓', num: 'MONTHS 1–4', numColor: 'var(--blue)', title: 'BFSI Foundations', body: 'Build rock-solid domain knowledge. Banking, insurance, capital markets, payments. Certificate I earned.' },
    { circle: 'linear-gradient(135deg,var(--light),#EDE9F7)', icon: '⚡', num: 'MONTHS 6–9', numColor: 'var(--purple)', title: 'Digital Tech Stack', body: 'Master the tech layer. UPI, WealthTech, Data Analytics, Agile. Certificate II earned. Internships begin.' },
    { circle: 'linear-gradient(135deg,#FFF0F0,#FFE0DC)', icon: '🔒', num: 'MONTHS 11–14', numColor: '#C0392B', title: 'Advanced Expert + Placement', body: 'RegTech, DeFi, AI Product Management. Placement Sprint. 2 mock interviews. Campus drives. Certificate III.' },
    { circle: 'linear-gradient(135deg,#FFF8E1,#FFF0C0)', icon: '👑', num: 'MONTHS 16–19', numColor: '#8B6914', title: 'Digital Business Leader', body: 'MiniCEO Program. Finance transformation. Global career mapping. MiniCEO Summit. PGDDF — MBA++. BFSI Fellow.' },
  ];
  return (
    <section style={{ background: 'linear-gradient(135deg,var(--light) 0%,#F0EBF9 50%,var(--light) 100%)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> Your 24-Month Transformation
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          The <span style={{ color: 'var(--purple)' }}>Career Journey</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative', marginTop: 56 }}>
          <div style={{
            position: 'absolute', top: 40, left: '10%', right: '10%', height: 2,
            background: 'linear-gradient(90deg,var(--purple),var(--blue))', zIndex: 0,
          }} />
          {steps.map(({ circle, icon, num, numColor, title, body }, i) => (
            <div key={i} className={`fade-up ${i > 0 ? `fade-up-d${i}` : ''}`} style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 16px' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, margin: '0 auto 20px', border: '3px solid var(--white)',
                boxShadow: '0 4px 20px rgba(91,75,138,.18)', background: circle,
              }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: numColor, marginBottom: 8, letterSpacing: '.08em', textTransform: 'uppercase' }}>{num}</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{title}</h4>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLACEMENTS ───────────────────────────────────────────────────────────────
function PlacementsSection() {
  const features = [
    { icon: '🎓', title: 'Campus Placement at End of Semester 3', body: 'Your campus placement interviews are scheduled at the end of Month 14 — after the full Placement Readiness Sprint, 2 mock interviews, personality development, and portfolio build. You arrive at your interview the most prepared student on campus.' },
    { icon: '🎭', title: 'Personality Development Training', body: 'Two full-day professional presence workshops covering communication excellence, business etiquette, Group Discussion practice (3 rounds with evaluator feedback), and interview mindset coaching. Delivered by communication experts — not HR textbooks.' },
    { icon: '🎤', title: '2 Full Mock Interviews Per Student', body: 'Round 1: 30-minute panel interview (mentor + peer evaluator) with detailed 10-criteria feedback report. Round 2: New evaluator panel testing improvement. Role-specific question banks for your target BFSI career path.' },
    { icon: '📂', title: 'Resume & Digital Portfolio', body: '1-to-1 mentor resume review. ATS-optimised BFSI resume template. Full digital portfolio published on LMS and LinkedIn — featuring all 4 capstone projects, lab builds, dashboards, and prototypes.' },
    { icon: '🌍', title: 'Internships from Month 9 Onwards', body: 'Students completing Part 2 are eligible for structured 4–8 week BFSI internships through the Upskillize partner network. Real work experience. Letter of recommendation. In many cases, a pre-placement offer before your final semester.' },
    { icon: '🤝', title: 'Upskillize Alumni Network', body: 'Join a lifetime network of 500+ BFSI professionals. Annual summit. Alumni job board. Pay-it-forward mentoring culture. BFSI Fellows recognition for top performers. A community that has your back for 20 years.' },
  ];
  return (
    <section id="placements" style={{ background: 'var(--white)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={S.sectionLabel()}>
          <span style={S.labelBar()} /> Built Into the Program — Not an Afterthought
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2()}>
          Placements &amp; <span style={{ color: 'var(--purple)' }}>Internships</span>
        </h2>
        <p className="fade-up fade-up-d2" style={S.sub()}>
          Placement is the ultimate metric. We design every element of PGDDF — from the first module to the last capstone — with one question in mind: "Will this help our student get hired and thrive?"
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 14 }}>
            {features.map(({ icon, title, body }) => (
              <div key={title} className="fade-up" style={{
                display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, alignItems: 'start',
                padding: 20, background: 'var(--off)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--purple)',
              }}>
                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="fade-up fade-up-d3" style={{ background: 'linear-gradient(160deg,var(--purple-d),var(--navy))', borderRadius: 'var(--radius-xl)', padding: 36, position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>
              We Don't Just Prepare You.<br />We <span style={{ color: 'var(--gold)' }}>Place</span> You.
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.58)', lineHeight: 1.7, marginBottom: 24 }}>Our placement commitment is not a brochure promise — it is a structured, measurable system built into the curriculum from Month 1.</p>
            {[
              { num: '5+', txt: 'Guaranteed interview opportunities per student, activated through our 20+ BFSI hiring partner network' },
              { num: '2', txt: 'Full mock interviews per student with detailed feedback reports — before your first real interview' },
              { num: '1', txt: 'Dedicated placement coordinator per cohort managing the full process — company outreach to offer support' },
            ].map(({ num, txt }) => (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.07)', borderRadius: 'var(--radius-md)', padding: 14, marginBottom: 10 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--gold)' }}>{num}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.68)' }}>{txt}</div>
              </div>
            ))}
            <div style={{ background: 'linear-gradient(135deg,var(--teal),#0B6B75)', borderRadius: 'var(--radius-md)', padding: 20, marginTop: 20 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>🚀 Internship Pathways Available</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.68)' }}>Eligible after Part 2 (Month 9+). BFSI Analyst, Data Analytics, Product Management, RegTech/Compliance, InsurTech, and WealthTech internships through our partner network — some leading to pre-placement offers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
function CertificatesSection() {
  const certs = [
    { num: 'Part 1 · Month 4', numColor: 'var(--blue)', icon: '🏦', title: 'Certificate I — BFSI & FinTech Foundations', sub: 'Foundational BFSI Professional', badge: 'BFSI-DE Flagship' },
    { num: 'Part 2 · Month 9', numColor: 'var(--purple)', icon: '📈', title: 'Certificate II — Digital Finance Technologies', sub: 'Intermediate Technology Professional', badge: 'InvestmentTech + D2D' },
    { num: 'Part 3 · Month 14', numColor: '#C0392B', icon: '🔒', title: 'Certificate in Advanced BFSI & Digital Innovation', sub: 'Advanced Digital Professional', badge: 'RegTech Flagship' },
    { num: 'Part 4 · Month 19', numColor: 'var(--gold)', icon: '👑', title: 'PGDDF — MBA++', sub: 'Digital Business Leader', badge: 'MiniCEO + NSQF 7' },
  ];
  return (
    <section id="certificates" style={{
      background: 'linear-gradient(135deg,var(--navy),#1A1048)',
      position: 'relative', overflow: 'hidden', padding: '96px 48px',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 70% 50% at 30% 50%,rgba(91,75,138,.28),transparent)' }} />
      <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
        <p className="fade-up" style={S.sectionLabel('var(--gold)')}>
          <span style={S.labelBar()} /> 4 Certificates. One Extraordinary Destination.
        </p>
        <h2 className="fade-up fade-up-d1" style={S.h2Dark()}>
          Every Part. A new<br /><span style={{ color: 'var(--gold)' }}>credential on your resume.</span>
        </h2>
        <p className="fade-up fade-up-d2" style={{ ...S.sub('rgba(255,255,255,.52)'), marginBottom: 56 }}>
          You don't wait 24 months for recognition. With PGDDF, you earn a formal Upskillize certificate at the end of every Part — a progressive credential that builds your professional profile in real-time, even before you graduate.
        </p>
        <div className="fade-up fade-up-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          {certs.map(({ num, numColor, icon, title, sub, badge }) => (
            <div key={num} style={{ padding: '38px 26px', transition: 'background .3s', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: numColor, marginBottom: 12, display: 'block' }}>{num}</span>
              <span style={{ fontSize: 34, marginBottom: 14, display: 'block' }}>{icon}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 7, lineHeight: 1.25 }}>{title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.42)', marginBottom: 14 }}>{sub}</div>
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
                padding: '5px 12px', borderRadius: 100,
                background: 'rgba(201,168,76,.15)', color: 'var(--gold-l)', border: '1px solid rgba(201,168,76,.28)',
              }}>{badge}</span>
            </div>
          ))}
        </div>

        {/* Final Certificate */}
        <div className="fade-up fade-up-d2" style={{
          background: 'linear-gradient(135deg,rgba(201,168,76,.14),rgba(201,168,76,.07))',
          border: '1px solid rgba(201,168,76,.28)', borderRadius: 'var(--radius-xl)', padding: 52, marginTop: 28,
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(201,168,76,.07),transparent)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14, fontFamily: 'var(--font-display)' }}>The Final Destination</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,38px)', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Post Graduate Diploma in Digital Finance &amp; FinTech</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--gold-l)', marginBottom: 20 }}>MBA++ · PGDDF · Digital Business Leader</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {['NSQF Level 7', 'BFSI SSC Aligned', '1,200 Notional Hours', '16 Modules', '4 Capstone Projects', 'Co-branded with Partner College', 'Upskillize BFSI Fellow', 'Lifelong Alumni Access'].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 100,
                  background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.68)',
                  border: '1px solid rgba(255,255,255,.12)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── QUOTE STRIP ──────────────────────────────────────────────────────────────
function QuoteStrip() {
  return (
    <div style={{
      background: 'var(--purple)', padding: '72px 48px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: '4%', top: -20,
        fontFamily: 'var(--font-serif)', fontSize: 220, color: 'rgba(255,255,255,.04)', lineHeight: 1,
      }}>"</div>
      <blockquote style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3.2vw,38px)', fontWeight: 400,
        fontStyle: 'italic', color: '#fff', maxWidth: 900, margin: '0 auto',
        lineHeight: 1.45, position: 'relative', zIndex: 1,
      }}>
        "These 2 years can transform 20 years of your career. We don't teach you about BFSI. We make you part of it."
      </blockquote>
      <cite style={{
        display: 'block', marginTop: 24, fontStyle: 'normal',
        fontSize: 14, fontWeight: 600, letterSpacing: '.05em',
        color: 'rgba(255,255,255,.58)', fontFamily: 'var(--font-body)',
      }}>— Ramesh Gupta, Co-Founder &amp; CPO, Upskillize | FRM · PRM · MBA · SAFe 6 PC · PABF (IIM-B)</cite>
    </div>
  );
}

// ─── COLLEGES CTA ─────────────────────────────────────────────────────────────
function CollegesCTA() {
  return (
    <section id="colleges" style={{ background: 'var(--off)', padding: '96px 48px' }}>
      <div style={S.inner}>
        <p className="fade-up" style={{ ...S.sectionLabel(), justifyContent: 'center' }}>
          <span style={S.labelBar()} /> Join the Movement
        </p>
        <h2 className="fade-up fade-up-d1" style={{ ...S.h2(), textAlign: 'center', marginBottom: 56 }}>
          Ready to Offer India's Best<br /><span style={{ color: 'var(--purple)' }}>BFSI Digital Program?</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {/* For Colleges */}
          <div className="fade-up" style={{
            background: 'linear-gradient(135deg,var(--navy),#1A1048)', border: '1px solid rgba(255,255,255,.07)',
            borderRadius: 'var(--radius-xl)', padding: 44, transition: 'all .35s',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>For Academic Leaders &amp; Placement Heads</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Partner with Upskillize</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 28 }}>Bring PGDDF to your MBA students and transform your placement outcomes, institutional reputation, and industry partnerships — without adding any burden to your faculty or timetable.</p>
            <ul style={{ listStyle: 'none', marginBottom: 32 }}>
              {[
                'Upskillize provides all content, trainers, LMS, and assessments — zero faculty load',
                "BFSI Innovation Lab established on your campus at no cost",
                "Co-branded certificates add to your institution's brand value",
                'Structured 3-year MOU with defined enrollment, placement, and revenue metrics',
                'Joint marketing: your college featured as an Upskillize Certified Partner',
                'Runs on weekday evenings + Saturday mornings — zero timetable conflict',
              ].map(p => (
                <li key={p} style={{ fontSize: 13, color: 'rgba(255,255,255,.58)', padding: '6px 0', paddingLeft: 20, position: 'relative', lineHeight: 1.6 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 12, fontWeight: 700 }}>✓</span>{p}
                </li>
              ))}
            </ul>
            <a href="mailto:partnerships@upskillize.com" style={S.btnGold}>Schedule a Partnership Discussion →</a>
          </div>

          {/* For Students */}
          <div className="fade-up fade-up-d2" style={{
            background: 'linear-gradient(135deg,var(--purple-d),var(--purple))', border: '1px solid rgba(91,75,138,.28)',
            borderRadius: 'var(--radius-xl)', padding: 44, transition: 'all .35s',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>For MBA &amp; PGDM Students</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Start Your BFSI Journey</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: 28 }}>PGDDF runs alongside your MBA — on weekday evenings and Saturday mornings. No career gap, no extra year. Just 24 months of building, learning, and becoming an industry representative.</p>
            <ul style={{ listStyle: 'none', marginBottom: 32 }}>
              {[
                'Earn 4 certificates on the way — each one resume-ready immediately',
                'Build a real project portfolio in the Innovation Lab',
                'Get a personal mentor for 24 months — bookable whenever you need',
                'Graduate with 5+ interview opportunities already activated',
                'Access global BFSI career pathways in UAE, UK, Singapore, and more',
                'Join the Upskillize Alumni network for life',
              ].map(p => (
                <li key={p} style={{ fontSize: 13, color: 'rgba(255,255,255,.58)', padding: '6px 0', paddingLeft: 20, position: 'relative', lineHeight: 1.6 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 12, fontWeight: 700 }}>✓</span>{p}
                </li>
              ))}
            </ul>
            <a href="mailto:admissions@upskillize.com" style={S.btnOutline}>Register Your Interest →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function PgCDFLandingPage() {
  useFadeUp();
  useCounters();

  return (
    <>
      <style>{globalStyles}</style>
      <Hero />
      <Ticker />
      <CreditsSection />
      <MarketSection />
      <FintechSection />
      <OverviewSection />
      <RubricSection />
      <LabSection />
      <SyllabusSection />
      <AssessmentSection />
      <StartupSection />
      <CareerSection />
      <CareerJourneySection />
      <PlacementsSection />
      <CertificatesSection />
      <QuoteStrip />
      <CollegesCTA />
    </>
  );
}