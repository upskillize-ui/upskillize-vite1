import { useState, useEffect, useRef } from "react";

// ─── CSS Variables injected as a global style ────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

    :root {
      --v: #6C11FF; --v2: #8B3FFF; --v3: rgba(108,17,255,.15);
      --c: #00FFD1; --c2: #00CCA8; --c3: rgba(0,255,209,.12);
      --o: #FF5C00; --o2: #FF7A2B; --o3: rgba(255,92,0,.12);
      --y: #FFD600; --y3: rgba(255,214,0,.12);
      --dark: #06000F; --dark2: #0E0520; --dark3: #160A2A;
      --w: #FFFFFF; --w70: #FFFFFF; --w40: rgba(255,255,255,.75); --w15: rgba(255,255,255,.08);
      --border: rgba(255,255,255,.2);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--dark); color: #FFFFFF; overflow-x: hidden; line-height: 1.6; }
    h1, h2, h3, h4, h5, h6, p, span, div, a, li { color: inherit; }
    section h2, section h3, section h4, section p { color: #FFFFFF; }

    /* NAV */
    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 99; display: flex; justify-content: space-between; align-items: center; padding: 16px 5%; background: rgba(6,0,15,.88); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-mark { width: 34px; height: 34px; border-radius: 9px; background: linear-gradient(135deg,var(--v),var(--c)); display: flex; align-items: center; justify-content: center; font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 15px; color: var(--dark); }
    .logo-text { font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 16px; }
    .logo-text span { background: linear-gradient(90deg,var(--c),var(--v)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .nav-right { display: flex; align-items: center; gap: 20px; }
    .nav-right a { text-decoration: none; color: #FFFFFF; font-size: 13px; font-weight: 500; transition: .2s; }
    .nav-right a:hover { color: var(--c); }
    .nav-btn { background: linear-gradient(90deg,var(--v),var(--c)); color: var(--dark); padding: 9px 22px; border-radius: 50px; font-weight: 700; font-size: 13px; text-decoration: none; transition: .2s; white-space: nowrap; }
    .nav-btn:hover { opacity: .85; transform: translateY(-1px); }

    /* HERO */
    .hero { min-height: 100vh; padding: 120px 5% 80px; position: relative; overflow: hidden; display: flex; align-items: center; }
    .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 90% 70% at 50% -10%,rgba(108,17,255,.35) 0%,transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%,rgba(0,255,209,.12) 0%,transparent 50%), var(--dark); }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); animation: orb-float 8s ease-in-out infinite; }
    .orb1 { width: 500px; height: 500px; background: rgba(108,17,255,.3); top: -100px; left: -100px; animation-delay: 0s; }
    .orb2 { width: 400px; height: 400px; background: rgba(0,255,209,.15); bottom: -50px; right: -50px; animation-delay: 3s; }
    .orb3 { width: 300px; height: 300px; background: rgba(255,92,0,.12); top: 50%; right: 20%; animation-delay: 5s; }
    @keyframes orb-float { 0%,100%{ transform:translate(0,0); } 50%{ transform:translate(30px,-30px); } }
    .hero-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--v3); border: 1px solid rgba(108,17,255,.4); border-radius: 50px; padding: 8px 18px; margin-bottom: 24px; }
    .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c); animation: blink 2s ease-in-out infinite; }
    @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
    .badge-text { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--c); }
    h1 { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: clamp(36px,4.5vw,58px); line-height: 1.05; margin-bottom: 22px; color: #FFFFFF; }
    .vc { background: linear-gradient(90deg,var(--c),var(--v)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .oc { color: var(--o); }
    .hero-sub { font-size: 17px; color: #FFFFFF; line-height: 1.75; margin-bottom: 36px; font-weight: 300; }
    .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
    .btn-grad { background: linear-gradient(90deg,var(--v),var(--c)); color: var(--dark); padding: 14px 30px; border-radius: 50px; font-weight: 800; font-size: 15px; text-decoration: none; transition: .25s; display: inline-flex; align-items: center; gap: 8px; }
    .btn-grad:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(108,17,255,.4); }
    .btn-ghost { border: 2px solid var(--border); color: var(--w); padding: 14px 30px; border-radius: 50px; font-weight: 600; font-size: 15px; text-decoration: none; transition: .25s; }
    .btn-ghost:hover { border-color: var(--c); color: var(--c); }
    .hero-stats { display: flex; gap: 32px; flex-wrap: wrap; }
    .hstat { text-align: left; }
    .hstat-n { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 34px; line-height: 1; background: linear-gradient(135deg,var(--c),var(--v)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hstat-l { font-size: 12px; color: #FFFFFF; margin-top: 2px; font-weight: 500; }
    .hero-visual { display: flex; justify-content: center; align-items: center; }

    /* SECTION COMMONS */
    section { padding: 88px 5%; position: relative; z-index: 1; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: var(--c); margin-bottom: 12px; }
    .ttl { font-family: 'Outfit',sans-serif; font-weight: 800; font-size: clamp(28px,3.5vw,44px); line-height: 1.1; margin-bottom: 16px; color: #FFFFFF; }
    .sub { font-size: 16px; color: #FFFFFF; max-width: 560px; line-height: 1.75; font-weight: 300; }
    .tc { text-align: center; }
    .tc .sub { margin: 0 auto; }

    /* WHY STRIP */
    .why-strip { background: linear-gradient(90deg,var(--v3),var(--c3),var(--o3)); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 36px 5%; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px; }
    .ws { text-align: center; }
    .ws-n { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 46px; line-height: 1; background: linear-gradient(135deg,var(--c),var(--v)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .ws-l { font-size: 12px; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

    /* TRIMESTER SECTION */
    .tri-section { background: var(--dark2); }
    .tri-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 56px; }
    .tri-card { background: var(--w15); border: 1px solid var(--border); border-radius: 20px; padding: 26px; position: relative; overflow: hidden; transition: .3s; cursor: default; }
    .tri-card:hover { transform: translateY(-5px); border-color: var(--v); background: rgba(108,17,255,.12); }
    .tri-num { position: absolute; top: 18px; right: 20px; font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 52px; line-height: 1; opacity: .08; color: var(--c); }
    .tri-tag { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
    .t-v { background: var(--v3); color: var(--c); border: 1px solid rgba(108,17,255,.3); }
    .t-c { background: var(--c3); color: var(--c); border: 1px solid rgba(0,255,209,.25); }
    .t-o { background: var(--o3); color: var(--o); border: 1px solid rgba(255,92,0,.25); }
    .t-y { background: var(--y3); color: var(--y); border: 1px solid rgba(255,214,0,.25); }
    .tri-card h3 { font-family: 'Outfit',sans-serif; font-weight: 700; font-size: 17px; margin-bottom: 8px; color: #FFFFFF; }
    .tri-card p { font-size: 13px; color: #FFFFFF; line-height: 1.65; margin-bottom: 14px; }
    .tri-topics { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
    .topic { font-size: 10.5px; background: var(--w15); border: 1px solid var(--border); border-radius: 4px; padding: 3px 8px; color: #FFFFFF; }
    .cert-badge { display: flex; align-items: center; gap: 6px; background: linear-gradient(90deg,rgba(255,214,0,.12),rgba(255,92,0,.08)); border: 1px solid rgba(255,214,0,.3); border-radius: 8px; padding: 7px 12px; font-size: 11px; color: var(--y); font-weight: 700; margin-top: 4px; }

    /* PROGRAMS */
    .programs-section { background: var(--dark); }
    .prog-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 56px; }
    .prog-card { border-radius: 24px; padding: 36px; position: relative; overflow: hidden; transition: .3s; }
    .prog-card:hover { transform: translateY(-5px); }
    .pc-fintech { background: linear-gradient(135deg,rgba(108,17,255,.3),rgba(0,255,209,.1)); border: 1px solid rgba(108,17,255,.4); }
    .pc-mini { background: linear-gradient(135deg,rgba(255,92,0,.25),rgba(255,214,0,.1)); border: 1px solid rgba(255,92,0,.35); }
    .pc-data { background: linear-gradient(135deg,rgba(0,255,209,.2),rgba(108,17,255,.1)); border: 1px solid rgba(0,255,209,.3); }
    .pc-ai { background: linear-gradient(135deg,rgba(255,214,0,.15),rgba(255,92,0,.1)); border: 1px solid rgba(255,214,0,.25); }
    .pc-icon { font-size: 36px; margin-bottom: 18px; }
    .prog-card h3 { font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 22px; margin-bottom: 10px; color: #FFFFFF; }
    .prog-card > p { font-size: 14px; color: #FFFFFF; line-height: 1.7; margin-bottom: 18px; }
    .prog-modules { display: flex; flex-direction: column; gap: 6px; }
    .pm { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #FFFFFF; }
    .pm::before { content: ''; width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .pm-v::before { background: var(--c); }
    .pm-o::before { background: var(--o); }

    /* SKILLS */
    .skills-section { background: linear-gradient(160deg,var(--dark3),var(--dark2)); }
    .skills-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .skill-bars { display: flex; flex-direction: column; gap: 16px; margin-top: 36px; }
    .skill-bar { display: flex; flex-direction: column; gap: 6px; }
    .sb-top { display: flex; justify-content: space-between; align-items: center; }
    .sb-name { font-size: 14px; font-weight: 600; color: #FFFFFF; }
    .sb-pct { font-size: 13px; font-weight: 700; color: var(--c); }
    .sb-track { height: 8px; background: var(--w15); border-radius: 50px; overflow: hidden; }
    .sb-fill { height: 100%; border-radius: 50px; background: linear-gradient(90deg,var(--v),var(--c)); transition: width 1.5s ease; }

    /* PLACEMENT */
    .placement-section { background: var(--dark); }
    .pl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
    .job-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 32px; }
    .job-card { background: var(--w15); border: 1px solid var(--border); border-radius: 14px; padding: 18px; transition: .3s; }
    .job-card:hover { border-color: var(--c); background: var(--c3); transform: translateY(-3px); }
    .jc-icon { font-size: 22px; margin-bottom: 10px; }
    .jc-title { font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px; }
    .jc-sector { font-size: 11px; color: #FFFFFF; font-weight: 600; background: var(--c3); padding: 2px 8px; border-radius: 4px; display: inline-block; }
    .support-items { display: flex; flex-direction: column; gap: 12px; margin-top: 28px; }
    .si { display: flex; gap: 14px; align-items: flex-start; padding: 18px; background: var(--w15); border: 1px solid var(--border); border-radius: 14px; transition: .3s; }
    .si:hover { border-color: var(--v); background: var(--v3); }
    .si-icon { font-size: 22px; flex-shrink: 0; }
    .si h4 { font-size: 14px; font-weight: 700; margin-bottom: 3px; color: #FFFFFF; }
    .si p { font-size: 12.5px; color: #FFFFFF; line-height: 1.55; }
    .pl-stat-row { display: flex; gap: 16px; margin-top: 28px; flex-wrap: wrap; }
    .pl-stat { flex: 1; min-width: 100px; background: linear-gradient(135deg,var(--v3),var(--c3)); border: 1px solid rgba(108,17,255,.3); border-radius: 14px; padding: 18px; text-align: center; }
    .pls-n { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 32px; background: linear-gradient(90deg,var(--c),var(--v)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 4px; }
    .pls-l { font-size: 11px; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px; }

    /* DIPLOMA */
    .diploma-section { background: linear-gradient(135deg,var(--dark3),var(--dark2)); padding: 80px 5%; text-align: center; }
    .diploma-badge { display: inline-block; border: 2px solid var(--y); border-radius: 20px; padding: 48px 64px; background: linear-gradient(135deg,rgba(255,214,0,.08),rgba(255,92,0,.06)); margin-bottom: 40px; position: relative; }
    .diploma-badge::before { content: '★'; position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background: var(--dark2); padding: 0 12px; color: var(--y); font-size: 20px; }
    .db-title { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: clamp(24px,3vw,38px); color: var(--y); margin-bottom: 8px; line-height: 1.1; }
    .db-sub { font-size: 16px; color: #FFFFFF; margin-bottom: 24px; }
    .db-creds { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
    .db-cred { font-size: 13px; background: var(--w15); border: 1px solid var(--border); border-radius: 8px; padding: 8px 16px; color: #FFFFFF; }

    /* COLLEGES */
    .colleges-section { background: var(--dark3); }
    .col-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
    .benefit-list { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; }
    .benefit { display: flex; gap: 14px; align-items: flex-start; padding: 20px; background: var(--w15); border: 1px solid var(--border); border-radius: 14px; transition: .3s; }
    .benefit:hover { border-color: var(--c); transform: translateX(5px); }
    .b-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; background: var(--c3); border: 1px solid rgba(0,255,209,.2); }
    .b-v { background: var(--v3); border-color: rgba(108,17,255,.2); }
    .b-o { background: var(--o3); border-color: rgba(255,92,0,.2); }
    .benefit h4 { font-size: 14px; font-weight: 700; margin-bottom: 4px; color: #FFFFFF; }
    .benefit p { font-size: 13px; color: #FFFFFF; line-height: 1.6; }

    /* TESTIMONIALS */
    .testi-section { background: var(--dark2); }
    .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 48px; }
    .tcard { background: var(--w15); border: 1px solid var(--border); border-radius: 18px; padding: 26px; transition: .3s; }
    .tcard:hover { border-color: var(--v); background: var(--v3); }
    .tcard-q { font-size: 40px; color: var(--c); opacity: .6; font-family: 'Outfit',sans-serif; font-weight: 900; line-height: .7; margin-bottom: 14px; }
    .tcard-text { font-size: 14px; color: #FFFFFF; line-height: 1.75; font-style: italic; margin-bottom: 20px; }
    .tcard-author { display: flex; align-items: center; gap: 12px; border-top: 1px solid var(--border); padding-top: 16px; }
    .ta-av { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg,var(--v),var(--c)); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: var(--dark); }
    .ta-n { font-size: 14px; font-weight: 700; color: #FFFFFF; }
    .ta-r { font-size: 11px; color: var(--c); }

    /* CTA */
    .cta-section { background: var(--dark); text-align: center; padding: 100px 5%; position: relative; overflow: hidden; }
    .cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 700px; height: 400px; border-radius: 50%; background: radial-gradient(ellipse,rgba(108,17,255,.2),transparent); pointer-events: none; }
    .cta-section h2 { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: clamp(28px,4vw,50px); margin-bottom: 16px; position: relative; z-index: 1; color: #FFFFFF; }
    .cta-section > p { font-size: 17px; color: #FFFFFF; max-width: 500px; margin: 0 auto 40px; line-height: 1.7; position: relative; z-index: 1; }
    .cta-actions { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; position: relative; z-index: 1; }



    /* REVEAL ANIMATION */
    .rv { opacity: 1; transform: translateY(0); transition: opacity .7s ease, transform .7s ease; }
    .rv.pre-reveal { opacity: 0; transform: translateY(32px); }
    .rv.pre-reveal.in { opacity: 1; transform: translateY(0); }
    .d1 { transition-delay: .1s; } .d2 { transition-delay: .2s; } .d3 { transition-delay: .3s; } .d4 { transition-delay: .4s; }

    @media (max-width: 900px) {
      .hero-inner, .skills-inner, .pl-grid, .col-grid, .prog-grid, .tri-grid { grid-template-columns: 1fr !important; }
      .hero-visual { display: none; }
      .testi-grid { grid-template-columns: 1fr; }
      .nav-right a:not(.nav-btn) { display: none; }
    }
  `}</style>
);

// ─── Reveal Hook ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    // First add pre-reveal to all, then observe
    els.forEach((el) => el.classList.add("pre-reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Skill Bar with animated width ───────────────────────────────────────────
function SkillBar({ name, pct }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWidth(pct); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="skill-bar" ref={ref}>
      <div className="sb-top"><span className="sb-name">{name}</span><span className="sb-pct">{pct}%</span></div>
      <div className="sb-track"><div className="sb-fill" style={{ width: `${width}%` }} /></div>
    </div>
  );
}

// ─── Hero SVG ─────────────────────────────────────────────────────────────────
function HeroSVG() {
  return (
    <svg width="460" height="460" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(108,17,255,0.3)" />
          <stop offset="100%" stopColor="rgba(6,0,15,0)" />
        </radialGradient>
        <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C11FF" /><stop offset="100%" stopColor="#00FFD1" />
        </linearGradient>
      </defs>
      <circle cx="230" cy="230" r="200" fill="url(#bg-g)" />
      <path d="M230,230 L430,230 A200,200 0 0,1 418,309 Z" fill="rgba(108,17,255,0.6)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L418,309 A200,200 0 0,1 363,400 Z" fill="rgba(108,17,255,0.45)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L363,400 A200,200 0 0,1 271,428 Z" fill="rgba(0,255,209,0.5)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L271,428 A200,200 0 0,1 150,418 Z" fill="rgba(0,255,209,0.4)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L150,418 A200,200 0 0,1 62,347 Z" fill="rgba(0,200,168,0.5)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L62,347 A200,200 0 0,1 30,230 Z" fill="rgba(255,92,0,0.5)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L30,230 A200,200 0 0,1 62,113 Z" fill="rgba(255,92,0,0.4)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L62,113 A200,200 0 0,1 185,32 Z" fill="rgba(255,214,0,0.5)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <path d="M230,230 L185,32 A200,200 0 0,1 430,230 Z" fill="rgba(255,214,0,0.4)" stroke="rgba(6,0,15,1)" strokeWidth="2" />
      <circle cx="230" cy="230" r="110" fill="#0E0520" stroke="rgba(108,17,255,0.4)" strokeWidth="2" />
      <circle cx="230" cy="230" r="90" fill="none" stroke="rgba(0,255,209,0.2)" strokeWidth="1" strokeDasharray="4,4" />
      <text x="230" y="215" fontFamily="Outfit" fontSize="40" fontWeight="900" fill="#00FFD1" textAnchor="middle">PGDFDB</text>
      <text x="230" y="240" fontFamily="Plus Jakarta Sans" fontSize="11" fill="rgba(255,255,255,0.5)" textAnchor="middle">Post Graduate Diploma</text>
      <text x="230" y="256" fontFamily="Plus Jakarta Sans" fontSize="11" fill="rgba(255,255,255,0.5)" textAnchor="middle">FinTech &amp; Digital Business</text>
      {[["T1","Banking",360,245,258],["T2","",345,338,0],["T3","",280,410,0],["T4","",180,420,0],["T5","",95,375,0],["T6","",60,265,0],["T7","",82,152,0],["T8","",158,65,0],["T9","",310,80,0]].map(([label,,x,y]) => (
        <text key={label} x={x} y={y} fontFamily="Outfit" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">{label}</text>
      ))}
      <circle cx="230" cy="230" r="215" fill="none" stroke="rgba(108,17,255,0.2)" strokeWidth="1" strokeDasharray="3,8">
        <animateTransform attributeName="transform" type="rotate" from="0 230 230" to="360 230 230" dur="30s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ─── College Partnership SVG ──────────────────────────────────────────────────
function CollegeSVG() {
  return (
    <svg width="380" height="440" viewBox="0 0 380 440" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arc1c" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C11FF" /><stop offset="100%" stopColor="#00FFD1" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="340" height="400" rx="20" fill="rgba(14,5,32,0.9)" stroke="rgba(108,17,255,0.4)" strokeWidth="1.5" />
      <rect x="20" y="20" width="340" height="60" rx="20" fill="rgba(108,17,255,0.5)" />
      <rect x="20" y="60" width="340" height="20" fill="rgba(108,17,255,0.5)" />
      <text x="190" y="55" fontFamily="Outfit" fontSize="15" fontWeight="800" fill="white" textAnchor="middle">COLLEGE PARTNERSHIP — AT A GLANCE</text>
      {[
        [102,"Program Duration","3 Years / 9 Trimesters","#00FFD1",true],
        [150,"Credentials Earned","9 Certs + PGDFDB Diploma","#FFD600",false],
        [198,"Faculty Needed","Zero — Upskillize Delivers All","#00FFD1",true],
        [246,"Programs Included","BFSI · MiniCEO · D2D · AI","#FFD600",false],
        [294,"LMS Platform","EcoPro AI · 5 Agents","#00FFD1",true],
        [342,"Upfront Investment","Zero — Revenue Share Model","#FF5C00",false],
      ].map(([y, label, val, col, alt]) => (
        <g key={label}>
          <rect x="40" y={y} width="300" height="38" rx="8" fill={alt ? "rgba(0,255,209,0.06)" : "rgba(0,255,209,0.03)"} stroke={alt ? "rgba(0,255,209,0.15)" : "rgba(255,255,255,0.06)"} strokeWidth="1" />
          <text x="55" y={y + 23} fontFamily="Plus Jakarta Sans" fontSize="12" fill="rgba(255,255,255,0.6)">{label}</text>
          <text x="325" y={y + 23} fontFamily="Outfit" fontSize="13" fontWeight="700" fill={col} textAnchor="end">{val}</text>
        </g>
      ))}
      <rect x="80" y="396" width="220" height="36" rx="18" fill="url(#arc1c)" />
      <text x="190" y="419" fontFamily="Outfit" fontSize="13" fontWeight="800" fill="#06000F" textAnchor="middle">Schedule a Partnership Call →</text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UpskillizeFintechTrack() {
  useReveal();

  const trimesters = [
    { num: 1, tag: "t-v", year: "Year 1 · Trimester 1", title: "Indian Banking & Financial System", desc: "How India's banking architecture works — from RBI to PSBs, private banks, NBFCs and payments infrastructure. The foundation every BFSI employer tests for.", topics: ["RBI & Monetary Policy","CASA & Lending Products","Financial Markets","UPI / NPCI Rails","Core Banking Systems"], cert: "🏅 Cert 1: Certified BFSI Foundation Professional" },
    { num: 2, tag: "t-v", year: "Year 1 · Trimester 2", title: "FinTech Ecosystem & Digital Payments", desc: "The FinTech revolution in India — payments, lending, WealthTech, InsurTech, BaaS, account aggregator and the business models disrupting traditional finance.", topics: ["FinTech Verticals","Digital Lending / BNPL","Embedded Finance","InsurTech & WealthTech","Neo-Banks & BaaS"], cert: "🏅 Cert 2: Certified FinTech Associate" },
    { num: 3, tag: "t-v", year: "Year 1 · Trimester 3", title: "Digital Banking & Financial Products", desc: "Deep dive into digital banking operations — mobile banking security, open banking APIs, regulatory sandboxes, cross-border payments and digital credit infrastructure.", topics: ["Open Banking / AA","KYC & AML Tech","Digital Onboarding","Blockchain / CBDC Basics","RegTech Introduction"], cert: "🏅 Cert 3: Certified Digital Banking Associate" },
    { num: 4, tag: "t-c", year: "Year 2 · Trimester 4", title: "Data to Decisions — Power BI & Analytics", desc: "From raw financial data to board-ready dashboards. Power BI, DAX, financial KPI analytics, Python basics, and data storytelling for BFSI professionals.", topics: ["Power BI & DAX","Financial Dashboards","Data Visualization","Python for Finance","Storytelling with Data"], cert: "🏅 Cert 4: Data to Decisions — Certified" },
    { num: 5, tag: "t-c", year: "Year 2 · Trimester 5", title: "AI & Machine Learning in Finance", desc: "How AI and ML are reshaping every BFSI job — credit scoring models, fraud detection, GenAI customer service, responsible AI and explainable AI for financial products.", topics: ["AI Credit Scoring","Fraud Detection ML","GenAI in Banking","Chatbots & NLP","Responsible AI / XAI"], cert: "🏅 Cert 5: Certified AI in Finance Associate" },
    { num: 6, tag: "t-c", year: "Year 2 · Trimester 6", title: "Risk, Compliance & Regulatory Technology", desc: "Credit risk, market risk, Basel III basics, AML/KYC technology, GRC platforms and DPDPA compliance — the risk and compliance skills that make every candidate stand out.", topics: ["Credit & Market Risk","Basel III Basics","AML / KYC Platforms","GRC Tools","DPDPA 2023"], cert: "🏅 Cert 6: Certified Risk & Compliance Associate" },
    { num: 7, tag: "t-o", year: "Year 3 · Trimester 7", title: "Investment Banking & Capital Markets", desc: "Equity, debt, M&A, capital markets infrastructure, derivatives basics and investment banking workflows — opening career doors into IB, treasury, and capital markets.", topics: ["ECM / DCM / M&A","Derivatives Basics","Capital Markets Tech","WealthTech Products","ESG & Green Finance"], cert: "🏅 Cert 7: Certified Capital Markets Associate" },
    { num: 8, tag: "t-y", year: "Year 3 · Trimester 8", title: "MiniCEO — Product Thinking & FinTech Entrepreneurship", desc: "Think like a founder, build like a product manager. Business model design, FinTech product strategy, startup pitch, and digital business innovation.", topics: ["Business Model Canvas","Product Thinking","FinTech Startup Strategy","Design Thinking","Investor Pitch Skills"], cert: "🏅 Cert 8: MiniCEO FinTech Product Manager" },
    { num: 9, tag: "t-y", year: "Year 3 · Trimester 9", title: "Grand Capstone & Placement Launch Sprint", desc: "Synthesise 3 years into one industry-evaluated Grand Capstone project. Placement sprint with mock interviews, employer connects, and personal brand building — then PGDFDB diploma.", topics: ["Grand FinTech Project","Mock Interviews","Employer Connects","LinkedIn & Brand","PGDFDB Diploma Award"], cert: "🎓 PGDFDB Diploma — Post Graduate Diploma in FinTech & Digital Business", isGold: true },
  ];

  const jobs = [
    { icon: "🏦", title: "Credit Analyst", sector: "NBFC / Bank" },
    { icon: "💳", title: "Digital Banking Analyst", sector: "Neo-Bank / PSB" },
    { icon: "📱", title: "FinTech Product Analyst", sector: "FinTech Startup" },
    { icon: "🤝", title: "Relationship Manager", sector: "Retail / Pvt Bank" },
    { icon: "📊", title: "Data & BI Analyst", sector: "BFSI Analytics" },
    { icon: "⚖️", title: "Compliance Associate", sector: "RegTech / Bank" },
    { icon: "🛡️", title: "AML / KYC Analyst", sector: "Bank / FinCrime" },
    { icon: "🚀", title: "FinTech Founder", sector: "MiniCEO Track" },
    { icon: "🤖", title: "AI Finance Analyst", sector: "AI / BFSI Tech" },
    { icon: "🌿", title: "ESG / Green Finance", sector: "Sustainable Fin" },
  ];

  const support = [
    { icon: "🎯", title: "Dedicated Placement Sprint (Trimester 9)", desc: "Full trimester placement preparation — mock interviews, technical tests, HR rounds, resume coaching and personal brand building." },
    { icon: "🏢", title: "Employer Connect Events", desc: "Campus drives, virtual hiring events, and direct employer introductions from our BFSI and FinTech industry partner network." },
    { icon: "🎙️", title: "50+ CXO Guest Lectures", desc: "Real industry professionals — bankers, FinTech founders, risk leaders, AI specialists — build your professional network across 3 years." },
    { icon: "📋", title: "Industry Capstone Portfolio", desc: "9 evaluated capstone projects across 3 years. Show employers your actual work — not just your exam scores." },
    { icon: "🤝", title: "Alumni Mentoring Network", desc: "Matched with Upskillize alumni in your target sector for 1:1 mentoring, referrals, and inside advice throughout the program." },
    { icon: "♾️", title: "Lifelong EcoPro LMS Access", desc: "Lifetime access to all content, guest lecture recordings, and platform updates — a permanent career reference library." },
  ];

  const testimonials = [
    { initial: "P", text: "The MiniCEO program changed how I think entirely. I went from a BCom student to building my own FinTech idea. The Data to Decisions course got me placed at an analytics firm before my final semester even ended.", name: "Priya M.", role: "BCom → FinTech Analyst, Payments Unicorn" },
    { initial: "R", text: "I had the BFSI Domain Excellence and RM Skills certification from Year 1. By Year 3, I had 7 credentials. My placement interview lasted 20 minutes — they said I knew more than most MBA freshers they'd seen.", name: "Rahul K.", role: "BBA → Relationship Manager, Private Bank" },
    { initial: "S", text: "Never felt like it disrupted my BBA. Sessions were structured around my college timetable. By trimester 5, I was building Power BI dashboards for a bank's analytics team as an intern. Got a PPO.", name: "Sneha R.", role: "BBA → Data Analyst, Leading NBFC (PPO)" },
  ];

  const delays = ["d1","d2","d3"];

  return (
    <>
      <GlobalStyle />

      {/* NAV */}
      <nav className="nav">
        <div className="logo">
          <div className="logo-mark">U</div>
          <div className="logo-text"><span>Upskillize</span> Campus Track</div>
        </div>
        <div className="nav-right">
          <a href="#trimesters">Trimesters</a>
          <a href="#programs">Programs</a>
          <a href="#placement">Placements</a>
          <a href="#colleges">For Colleges</a>
          <a href="#cta" className="nav-btn">Partner Now →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <div className="badge-dot" />
              <span className="badge-text">UG Campus Track · 3 Years · 9 Trimesters</span>
            </div>
            <h1>Launch a <span className="vc">FinTech Career</span><br />from <span className="oc">Year One</span> of College</h1>
            <p className="hero-sub">India's most aggressive UG industry certification program. Run alongside your BBA, BCom or BSc — earn 9 industry credentials, master AI in finance, and walk into placements as a FinTech-ready professional.</p>
            <div className="hero-btns">
              <a href="#cta" className="btn-grad">Enrol Your College →</a>
              <a href="#trimesters" className="btn-ghost">See All 9 Trimesters</a>
            </div>
            <div className="hero-stats">
              {[["9","Trimesters"],["9+","Certifications"],["600+","Industry Hours"],["100%","Practitioner Faculty"]].map(([n,l]) => (
                <div className="hstat" key={l}><div className="hstat-n">{n}</div><div className="hstat-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual"><HeroSVG /></div>
        </div>
      </section>

      {/* WHY STRIP */}
      <div className="why-strip">
        {[["9","Trimesters"],["6+","Key Programs"],["600+","Industry Hours"],["50+","CXO Speakers"],["PGDFDB","Final Diploma"],["Day 1","Placement Ready"]].map(([n,l],i) => (
          <div className={`ws rv ${delays[i % 3]}`} key={l}>
            <div className="ws-n">{n}</div>
            <div className="ws-l">{l}</div>
          </div>
        ))}
      </div>

      {/* 9 TRIMESTERS */}
      <section className="tri-section" id="trimesters">
        <div className="label rv tc">3 Years · 9 Trimesters · One Credential Per Trimester</div>
        <h2 className="ttl rv d1 tc">The Most Aggressive FinTech<br />Curriculum Built for UG Students</h2>
        <p className="sub rv d2 tc">Every trimester = structured learning + live case studies + guest lectures + a capstone project + an industry certificate. You graduate with 9 credentials plus the PGDFDB diploma.</p>
        <div className="tri-grid">
          {trimesters.map((t, i) => (
            <div key={t.num} className={`tri-card rv ${delays[i % 3]}`} style={t.isGold ? { background: "linear-gradient(135deg,rgba(255,214,0,.12),rgba(255,92,0,.08))", borderColor: "rgba(255,214,0,.35)" } : {}}>
              <div className="tri-num" style={t.isGold ? { color: "#FFD600" } : {}}>{t.num}</div>
              <div className={`tri-tag ${t.tag}`}>{t.year}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="tri-topics">{t.topics.map(tp => <span className="topic" key={tp}>{tp}</span>)}</div>
              <div className="cert-badge" style={t.isGold ? { background: "linear-gradient(90deg,rgba(255,214,0,.2),rgba(255,92,0,.12))", borderColor: "rgba(255,214,0,.5)" } : {}}>{t.cert}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS SPOTLIGHT */}
      <section className="programs-section" id="programs">
        <div className="label rv tc">Flagship Programs Embedded in the Track</div>
        <h2 className="ttl rv d1 tc">Four Powerhouse Programs.<br />Woven Into Every Year.</h2>
        <p className="sub rv d2 tc">These aren't optional add-ons — they are structurally embedded modules that every student completes as part of the 3-year journey.</p>
        <div className="prog-grid">
          {[
            { cls:"pc-fintech", icon:"🏦", title:"BFSI Domain Excellence", desc:"The complete banking and financial services landscape — products, regulations, technology, customer segments, and regulatory intelligence. The go-to program for BFSI career readiness.", mods:["Banking products — CASA, loans, trade finance, treasury","Regulatory framework — RBI, SEBI, IRDAI in depth","CBS architecture — Finacle, Temenos, Flexcube","Customer segments and relationship management","FinTech disruption across banking verticals"], mc:"pm-v" },
            { cls:"pc-mini", icon:"🚀", title:"MiniCEO Program", desc:"Think like a CEO from Year 3. Product thinking, business model innovation, FinTech entrepreneurship, and the founder mindset — the program that turns employees into leaders.", mods:["Business Model Canvas for FinTech ventures","Product Management — PRDs, user stories, roadmaps","Startup strategy — funding, GTM, unit economics","Design thinking and customer discovery","Investor pitch deck and demo day preparation"], mc:"pm-o" },
            { cls:"pc-data", icon:"📊", title:"Data to Decisions (Power BI)", desc:"Turn raw financial data into boardroom insights. Power BI, DAX, financial KPI dashboards, and data storytelling — the analytics skill every BFSI team desperately needs.", mods:["Power BI Desktop — data models, DAX, report design","Financial KPI dashboards — NIM, GNPA, ROE, CRAR","Advanced DAX — time intelligence, variance analysis","Python + Power BI integration","Executive dashboard storytelling for boards"], mc:"pm-v" },
            { cls:"pc-ai", icon:"🤖", title:"AI in Finance & GenAI Applications", desc:"From ML credit models to GenAI chatbots — understand how AI is reshaping every BFSI role and how to use these tools professionally from Day One of your career.", mods:["ML credit scoring — from CIBIL to LightGBM","GenAI in banking — LLMs, RAG, prompt engineering","Fraud detection — graph AI, real-time scoring","Responsible AI — bias, fairness, explainability","RBI AI Governance Framework 2024"], mc:"pm-o" },
          ].map((p,i) => (
            <div key={p.title} className={`prog-card ${p.cls} rv ${delays[i % 3]}`}>
              <div className="pc-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="prog-modules">
                {p.mods.map(m => <div key={m} className={`pm ${p.mc}`}>{m}</div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section">
        <div className="skills-inner">
          <div>
            <div className="label rv">Skills You Graduate With</div>
            <h2 className="ttl rv d1">What BFSI Employers<br />Will See on Your Resume</h2>
            <p className="sub rv d2">Every skill below maps to a real job requirement. We built the curriculum from actual hiring data — not from textbooks.</p>
            <div className="skill-bars rv d3">
              {[
                ["FinTech & BFSI Domain Knowledge", 95],
                ["AI & Machine Learning for Finance", 82],
                ["Data Analytics & Power BI", 90],
                ["Risk, Compliance & RegTech", 78],
                ["Product Thinking & Entrepreneurship", 85],
                ["Digital Payments & Open Banking", 88],
              ].map(([name, pct]) => <SkillBar key={name} name={name} pct={pct} />)}
            </div>
          </div>
          <div className="rv d2">
            <svg width="400" height="420" viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C11FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00FFD1" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <g opacity="0.08">
                {[
                  "100,20 140,20 160,55 140,90 100,90 80,55",
                  "160,20 200,20 220,55 200,90 160,90 140,55",
                  "220,20 260,20 280,55 260,90 220,90 200,55",
                  "280,20 320,20 340,55 320,90 280,90 260,55",
                ].map((pts,i) => <polygon key={i} points={pts} fill="none" stroke="#00FFD1" strokeWidth="1" />)}
                {[
                  "70,90 110,90 130,125 110,160 70,160 50,125",
                  "130,90 170,90 190,125 170,160 130,160 110,125",
                  "190,90 230,90 250,125 230,160 190,160 170,125",
                  "250,90 290,90 310,125 290,160 250,160 230,125",
                  "310,90 350,90 370,125 350,160 310,160 290,125",
                ].map((pts,i) => <polygon key={i+10} points={pts} fill="none" stroke="#6C11FF" strokeWidth="1" />)}
              </g>
              <rect x="30" y="180" width="340" height="1" fill="rgba(0,255,209,0.15)" />
              {[
                [20,200,"rgba(108,17,255,0.4)","rgba(108,17,255,0.6)","Credit","Analyst","NBFC / Bank",70],
                [150,200,"rgba(0,255,209,0.2)","rgba(0,255,209,0.5)","FinTech","Analyst","Startup / Bank",200],
                [280,200,"rgba(255,92,0,0.3)","rgba(255,92,0,0.5)","Relationship","Manager","Private Bank",330],
              ].map(([x,y,fill,stroke,l1,l2,l3,cx]) => (
                <g key={l1}>
                  <rect x={x} y={y} width="100" height="60" rx="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
                  <text x={cx} y={y+24} fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">{l1}</text>
                  <text x={cx} y={y+38} fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">{l2}</text>
                  <text x={cx} y={y+52} fontFamily="Plus Jakarta Sans" fontSize="9" fill="rgba(0,255,209,0.8)" textAnchor="middle">{l3}</text>
                </g>
              ))}
              {[
                [20,290,"rgba(255,214,0,0.2)","rgba(255,214,0,0.4)","Data &","Analytics","BFSI Analytics",70],
                [150,290,"rgba(108,17,255,0.3)","rgba(108,17,255,0.5)","Compliance","Associate","RegTech / Bank",200],
                [280,290,"rgba(0,255,209,0.15)","rgba(0,255,209,0.4)","FinTech","Founder","Startup / MiniCEO",330],
              ].map(([x,y,fill,stroke,l1,l2,l3,cx]) => (
                <g key={l1+y}>
                  <rect x={x} y={y} width="100" height="60" rx="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
                  <text x={cx} y={y+24} fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">{l1}</text>
                  <text x={cx} y={y+38} fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">{l2}</text>
                  <text x={cx} y={y+52} fontFamily="Plus Jakarta Sans" fontSize="9" fill="rgba(0,255,209,0.8)" textAnchor="middle">{l3}</text>
                </g>
              ))}
              <text x="200" y="388" fontFamily="Outfit" fontSize="12" fontWeight="700" fill="rgba(0,255,209,0.6)" textAnchor="middle">TARGET CAREER PATHS</text>
              <text x="200" y="405" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(255,255,255,0.35)" textAnchor="middle">Mapped to Trimester Coverage</text>
            </svg>
          </div>
        </div>
      </section>

      {/* PLACEMENTS */}
      <section className="placement-section" id="placement">
        <div className="label rv tc">🎯 Career Outcomes & Placement</div>
        <h2 className="ttl rv d1 tc">Jobs You Were Actually<br />Trained For</h2>
        <p className="sub rv d2 tc">Our curriculum is built backward from real job descriptions. When you graduate, you know exactly what interviewers will ask — because we taught it.</p>
        <div className="pl-grid" style={{ marginTop: 56 }}>
          <div>
            <div className="label rv">Target Job Roles</div>
            <div className="job-grid rv d1">
              {jobs.map(j => (
                <div className="job-card" key={j.title}>
                  <div className="jc-icon">{j.icon}</div>
                  <div className="jc-title">{j.title}</div>
                  <div className="jc-sector">{j.sector}</div>
                </div>
              ))}
            </div>
            <div className="pl-stat-row rv d2">
              {[["9","Credentials"],["Day 1","Interview Ready"],["PGDFDB","Final Diploma"]].map(([n,l]) => (
                <div className="pl-stat" key={l}><div className="pls-n">{n}</div><div className="pls-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div>
            <div className="label rv">Placement Support System</div>
            <div className="support-items">
              {support.map((s,i) => (
                <div className={`si rv ${delays[i % 3]}`} key={s.title}>
                  <div className="si-icon">{s.icon}</div>
                  <div><h4>{s.title}</h4><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIPLOMA */}
      <section className="diploma-section">
        <div className="rv">
          <div className="diploma-badge">
            <div className="db-title">Post Graduate Diploma in FinTech<br />& Digital Business</div>
            <div className="db-sub">PGDFDB · Awarded at end of Year 3 · NSQF Level 6 Aligned</div>
            <div className="db-creds">
              {["9 Trimester Certificates","BFSI Domain Excellence","Data to Decisions","MiniCEO Certificate","AI in Finance","Grand Capstone Project","EcoPro AI Learning Portfolio"].map(c => (
                <span className="db-cred" key={c}>{c}</span>
              ))}
            </div>
          </div>
          <h2 className="ttl tc" style={{ maxWidth: 600, margin: "0 auto 16px" }}>Graduate With More Than a Degree.<br /><span className="vc">Graduate With a Career.</span></h2>
          <p className="sub tc" style={{ margin: "0 auto" }}>The PGDFDB diploma plus 9 industry certifications puts you in a category of one at every campus placement. Not just a degree holder — a FinTech professional.</p>
        </div>
      </section>

      {/* FOR COLLEGES */}
      <section className="colleges-section" id="colleges">
        <div className="col-grid">
          <div>
            <div className="label rv">For Partner Colleges</div>
            <h2 className="ttl rv d1">Give Your Students<br />an Unfair Career<br /><span className="vc">Advantage</span></h2>
            <p className="sub rv d2">Partner with Upskillize — zero curriculum investment, maximum placement uplift. We deliver everything alongside your existing degree structure.</p>
            <div className="benefit-list">
              {[
                { cls:"b-v", icon:"🚀", title:"Zero Curriculum Cost", desc:"Upskillize delivers all content, faculty, LMS, certificates. Your college gets the outcomes, we do the work." },
                { cls:"", icon:"📈", title:"Measurable Placement Uplift", desc:"Students with 9 certifications attract better employers and better packages every placement season." },
                { cls:"b-o", icon:"🏆", title:"Industry CXOs on Your Campus", desc:"50+ guest lectures from BFSI and FinTech leaders — elevating your institution's industry connect." },
                { cls:"b-v", icon:"💰", title:"Revenue-Share Partnership", desc:"Transparent, sustainable revenue sharing. No upfront fee. Program pays for itself through outcomes." },
                { cls:"", icon:"📱", title:"EcoPro Admin Dashboard", desc:"Real-time student progress, attendance, scores — live analytics for college administrators." },
              ].map((b,i) => (
                <div className={`benefit rv ${delays[i % 3]}`} key={b.title}>
                  <div className={`b-icon ${b.cls}`}>{b.icon}</div>
                  <div><h4>{b.title}</h4><p>{b.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rv d3"><CollegeSVG /></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="label rv tc">What Students Say</div>
        <h2 className="ttl rv d1 tc">Real Stories. Real Careers.</h2>
        <div className="testi-grid">
          {testimonials.map((t,i) => (
            <div className={`tcard rv ${delays[i]}`} key={t.name}>
              <div className="tcard-q">"</div>
              <p className="tcard-text">{t.text}</p>
              <div className="tcard-author">
                <div className="ta-av">{t.initial}</div>
                <div><div className="ta-n">{t.name}</div><div className="ta-r">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-glow" />
        <div className="label rv tc">Get Started Today</div>
        <h2 className="rv d1">Your Students Deserve<br />More Than a Degree.</h2>
        <p className="rv d2">Bring Upskillize Campus Track to your college. Zero investment. Nine certifications. One PGDFDB Diploma. Maximum placement impact.</p>
        <div className="cta-actions">
          <a href="mailto:connect@upskillize.com" className="btn-grad rv d3">Partner With Us →</a>
          <a href="https://www.upskillize.com" className="btn-ghost rv d4">Visit Upskillize.com</a>
        </div>
        <div style={{ marginTop: 36, fontSize: 13, color: "rgba(255,255,255,.4)", position: "relative", zIndex: 1 }} className="rv">
          📍 B104, Ushodaya S Square, Ramamurthy Nagar, Bangalore – 560016 &nbsp;·&nbsp; connect@upskillize.com &nbsp;·&nbsp; www.upskillize.com
        </div>
      </section>


    </>
  );
}