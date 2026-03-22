import { useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg:#07091C; --bg2:#0C1130; --bg3:#10163A;
    --lime:#ADFF2F; --lime2:#96E000; --lime3:rgba(173,255,47,.1); --lime4:rgba(173,255,47,.06);
    --coral:#FF3366; --coral2:#E01F55; --coral3:rgba(255,51,102,.12);
    --amber:#FFA500; --amber2:#E89300; --amber3:rgba(255,165,0,.1);
    --ice:#00D4FF; --ice3:rgba(0,212,255,.1);
    --w:#EEEEFF; --w90:rgba(238,238,255,.9); --w70:rgba(238,238,255,.68); --w40:rgba(238,238,255,.38); --w10:rgba(238,238,255,.07);
    --border:rgba(255,255,255,.08);
    --heading:#FFFFFF;
    --subtext:#9AA3C2;
    --muted:#5C6785;
  }
  * { box-sizing:border-box; margin:0; padding:0 }
  html { scroll-behavior:smooth }
  body { font-family:'Inter',sans-serif; background:var(--bg); color:var(--heading); overflow-x:hidden; line-height:1.6 }

  nav { position:fixed; top:0; left:0; right:0; z-index:99; display:flex; justify-content:space-between; align-items:center; padding:16px 5%; background:rgba(5,11,26,.92); backdrop-filter:blur(24px); border-bottom:1px solid var(--border) }
  .logo { display:flex; align-items:center; gap:10px }
  .logo-mark { width:36px; height:36px; border-radius:9px; background:var(--lime); display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:16px; color:var(--bg) }
  .logo-name { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:16px; color:var(--heading) }
  .logo-name span { color:var(--lime) }
  .nav-links { display:flex; align-items:center; gap:24px }
  .nav-links a { text-decoration:none; color:var(--subtext); font-size:13px; font-weight:500; transition:.2s }
  .nav-links a:hover { color:var(--lime) }
  .nav-cta { background:var(--lime); color:var(--bg); padding:9px 22px; border-radius:6px; font-weight:700; font-size:13px; text-decoration:none; transition:.2s; font-family:'Plus Jakarta Sans',sans-serif }
  .nav-cta:hover { background:var(--w); transform:translateY(-1px) }

  .hero { min-height:100vh; padding:120px 5% 80px; position:relative; overflow:hidden; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center }
  .hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 100% 80% at 50% -20%,rgba(196,255,0,.1) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 90%,rgba(255,45,120,.1) 0%,transparent 50%),var(--bg) }
  .hero::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(196,255,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,255,0,.04) 1px,transparent 1px); background-size:80px 80px; mask-image:radial-gradient(ellipse at center,black 20%,transparent 75%); pointer-events:none }
  .hero-content { position:relative; z-index:2 }
  .hero-tag { display:inline-flex; align-items:center; gap:8px; background:var(--lime3); border:1px solid rgba(196,255,0,.3); border-radius:6px; padding:7px 16px; margin-bottom:28px }
  .ht-dot { width:7px; height:7px; border-radius:50%; background:var(--lime); animation:pulse 2s infinite }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  .ht-text { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:2.5px; color:var(--lime) }
  h1 { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:clamp(36px,4.5vw,58px); line-height:1.06; margin-bottom:22px; letter-spacing:-0.5px; color:var(--heading) }
  .lc { color:var(--lime) }
  .cc { color:var(--coral) }
  .ac { color:var(--amber) }
  .hero-sub { font-size:16.5px; color:var(--subtext); line-height:1.8; margin-bottom:36px; font-weight:300; max-width:500px }
  .hero-btns { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:48px }
  .btn-lime { background:var(--lime); color:var(--bg); padding:13px 28px; border-radius:6px; font-weight:700; font-size:15px; text-decoration:none; font-family:'Plus Jakarta Sans',sans-serif; transition:.25s; display:inline-flex; align-items:center; gap:8px }
  .btn-lime:hover { background:var(--w); transform:translateY(-2px); box-shadow:0 14px 36px rgba(196,255,0,.25) }
  .btn-line { border:1.5px solid var(--border); color:var(--heading); padding:13px 28px; border-radius:6px; font-weight:500; font-size:15px; text-decoration:none; transition:.25s }
  .btn-line:hover { border-color:var(--lime); color:var(--lime) }
  .hero-chips { display:flex; gap:10px; flex-wrap:wrap }
  .chip { font-size:12px; padding:6px 14px; border-radius:50px; border:1px solid var(--border); color:var(--w70); font-weight:500 }
  .chip-l { border-color:rgba(196,255,0,.25); color:var(--lime); background:var(--lime3) }
  .chip-c { border-color:rgba(255,45,120,.25); color:var(--coral); background:var(--coral3) }
  .chip-a { border-color:rgba(255,158,0,.25); color:var(--amber); background:var(--amber3) }
  .chip-i { border-color:rgba(0,212,255,.25); color:var(--ice); background:var(--ice3) }
  .hero-right { position:relative; z-index:2; display:flex; justify-content:center }

  .stat-strip { background:linear-gradient(90deg,var(--lime3),var(--coral3),var(--amber3),var(--lime3)); border-top:1px solid rgba(196,255,0,.15); border-bottom:1px solid rgba(196,255,0,.15); padding:32px 5%; display:flex; justify-content:space-around; flex-wrap:wrap; gap:24px }
  .ss { text-align:center }
  .ss-n { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:42px; line-height:1; color:var(--lime); margin-bottom:4px }
  .ss-l { font-size:11px; color:var(--w40); text-transform:uppercase; letter-spacing:1.5px }

  section { padding:88px 5%; position:relative; z-index:1 }
  .lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:3px; color:var(--lime); margin-bottom:12px; display:flex; align-items:center; gap:8px }
  .lbl::before { content:''; width:20px; height:2px; background:var(--lime) }
  .ttl { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:clamp(26px,3.5vw,42px); line-height:1.1; margin-bottom:16px; color:var(--heading) }
  .sdesc { font-size:16px; color:var(--subtext); max-width:560px; line-height:1.75; font-weight:300 }
  .c { text-align:center }
  .c .lbl { justify-content:center }
  .c .lbl::before { display:none }
  .c .sdesc { margin:0 auto }

  .tri-section { background:var(--bg2) }
  .tri-year-label { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:3px; padding:10px 20px; display:inline-block; border-radius:50px; margin-bottom:24px; margin-top:48px }
  .tyl-1 { background:var(--lime3); color:var(--lime); border:1px solid rgba(196,255,0,.25) }
  .tyl-2 { background:var(--coral3); color:var(--coral); border:1px solid rgba(255,45,120,.25) }
  .tri-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px }
  .tc2 { background:var(--w10); border:1px solid var(--border); border-radius:18px; padding:26px; position:relative; overflow:hidden; transition:.35s }
  .tc2:hover { transform:translateY(-5px) }
  .tc2.lime-h:hover { border-color:var(--lime); background:var(--lime4) }
  .tc2.coral-h:hover { border-color:var(--coral); background:var(--coral3) }
  .tc2.amber-h:hover { border-color:var(--amber); background:var(--amber3) }
  .tc2-bg { position:absolute; top:16px; right:16px; font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:56px; opacity:.06; line-height:1 }
  .tri-num-tag { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:5px 12px; border-radius:50px; margin-bottom:14px }
  .nt-lime { background:var(--lime3); color:var(--lime); border:1px solid rgba(196,255,0,.25) }
  .nt-coral { background:var(--coral3); color:var(--coral); border:1px solid rgba(255,45,120,.2) }
  .nt-amber { background:var(--amber3); color:var(--amber); border:1px solid rgba(255,158,0,.2) }
  .nt-ice { background:var(--ice3); color:var(--ice); border:1px solid rgba(0,212,255,.2) }
  .tc2 h3 { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:17px; margin-bottom:8px; line-height:1.25; color:var(--heading) }
  .tc2 p { font-size:13px; color:var(--subtext); line-height:1.65; margin-bottom:14px }
  .tc2-topics { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px }
  .tc2-t { font-size:10.5px; background:var(--w10); border:1px solid var(--border); border-radius:4px; padding:3px 8px; color:var(--w70) }
  .tc2-cert { display:flex; align-items:center; gap:6px; background:rgba(255,158,0,.1); border:1px solid rgba(255,158,0,.3); border-radius:8px; padding:7px 12px; font-size:11px; color:var(--amber); font-weight:700 }

  .prog-section { background:var(--bg) }
  .prog-showcase { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:52px }
  .ps-card { border-radius:20px; padding:30px; position:relative; overflow:hidden; transition:.35s }
  .ps-card:hover { transform:translateY(-6px) }
  .psc-1 { background:linear-gradient(135deg,rgba(196,255,0,.15),rgba(196,255,0,.04)); border:1px solid rgba(196,255,0,.25) }
  .psc-2 { background:linear-gradient(135deg,rgba(255,45,120,.15),rgba(255,45,120,.04)); border:1px solid rgba(255,45,120,.25) }
  .psc-3 { background:linear-gradient(135deg,rgba(255,158,0,.15),rgba(255,158,0,.04)); border:1px solid rgba(255,158,0,.25) }
  .psc-4 { background:linear-gradient(135deg,rgba(0,212,255,.1),rgba(196,255,0,.05)); border:1px solid rgba(0,212,255,.2) }
  .psc-5 { background:linear-gradient(135deg,rgba(196,255,0,.08),rgba(255,45,120,.06)); border:1px solid rgba(196,255,0,.2) }
  .psc-6 { background:linear-gradient(135deg,rgba(255,158,0,.08),rgba(0,212,255,.06)); border:1px solid rgba(255,158,0,.2) }
  .ps-icon { font-size:34px; margin-bottom:16px }
  .ps-card h3 { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:17px; margin-bottom:8px; color:var(--heading) }
  .ps-card p { font-size:13px; color:var(--subtext); line-height:1.65; margin-bottom:14px }
  .ps-topics { display:flex; flex-direction:column; gap:5px }
  .pst { display:flex; align-items:center; gap:7px; font-size:12.5px; color:var(--w70) }
  .pst::before { content:'→'; font-size:10px; color:var(--lime); flex-shrink:0 }
  .pst.co::before { color:var(--coral) }
  .pst.am::before { color:var(--amber) }
  .ps-tag { display:inline-block; font-size:11px; font-weight:700; padding:4px 10px; border-radius:4px; margin-top:12px }
  .pt-l { background:var(--lime3); color:var(--lime); border:1px solid rgba(196,255,0,.25) }
  .pt-c { background:var(--coral3); color:var(--coral); border:1px solid rgba(255,45,120,.2) }
  .pt-a { background:var(--amber3); color:var(--amber); border:1px solid rgba(255,158,0,.2) }

  .placement-section { background:var(--bg3); position:relative; overflow:hidden }
  .pl-glow { position:absolute; top:-100px; right:-100px; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(196,255,0,.06),transparent); pointer-events:none }
  .pl-inner { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; position:relative; z-index:1 }
  .roles-visual { margin-top:36px }
  .rv-category { margin-bottom:28px }
  .rvc-label { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:var(--lime); margin-bottom:12px; display:flex; align-items:center; gap:8px }
  .rvc-label::after { content:''; flex:1; height:1px; background:rgba(196,255,0,.15) }
  .roles-row { display:flex; flex-wrap:wrap; gap:8px }
  .role-pill { background:var(--w10); border:1px solid var(--border); border-radius:8px; padding:8px 14px; font-size:12.5px; color:var(--w70); font-weight:500; transition:.2s }
  .role-pill:hover { border-color:var(--lime); color:var(--lime); background:var(--lime3) }
  .role-pill.coral:hover { border-color:var(--coral); color:var(--coral); background:var(--coral3) }
  .role-pill.amber:hover { border-color:var(--amber); color:var(--amber); background:var(--amber3) }
  .pl-right .lbl { margin-top:0 }
  .pl-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:28px }
  .plsg { background:var(--w10); border:1px solid var(--border); border-radius:14px; padding:20px; text-align:center; transition:.3s }
  .plsg:hover { border-color:var(--lime); background:var(--lime3); transform:translateY(-3px) }
  .plsg-n { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:34px; color:var(--lime); line-height:1; margin-bottom:4px }
  .plsg-l { font-size:11px; color:var(--w40); text-transform:uppercase; letter-spacing:1px; line-height:1.4 }
  .support-blocks { display:flex; flex-direction:column; gap:10px; margin-top:28px }
  .sb2 { display:flex; gap:14px; align-items:flex-start; padding:16px; background:var(--w10); border:1px solid var(--border); border-radius:12px; transition:.3s }
  .sb2:hover { border-color:var(--lime); background:var(--lime3) }
  .sb2-icon { font-size:20px; flex-shrink:0 }
  .sb2 h5 { font-size:14px; font-weight:700; margin-bottom:2px; color:var(--heading) }
  .sb2 p { font-size:12.5px; color:var(--w70); line-height:1.55 }

  .col-section { background:var(--bg) }
  .col-inner { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start }
  .benefits-col { display:flex; flex-direction:column; gap:12px; margin-top:32px }
  .bcol { display:flex; gap:14px; align-items:flex-start; padding:20px; background:var(--w10); border:1px solid var(--border); border-radius:12px; transition:.35s }
  .bcol:hover { border-color:var(--lime); transform:translateX(4px); background:var(--lime4) }
  .bcol:nth-child(even):hover { border-color:var(--coral); background:var(--coral3) }
  .bcol-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; background:var(--lime3); border:1px solid rgba(196,255,0,.2) }
  .bcol h4 { font-size:14px; font-weight:700; margin-bottom:3px; color:var(--heading) }
  .bcol p { font-size:12.5px; color:var(--w70); line-height:1.6 }
  .col-compare { background:var(--bg3); border:1px solid rgba(196,255,0,.2); border-radius:20px; padding:36px; position:sticky; top:90px }
  .cc-title-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid var(--border) }
  .cctr-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:18px; color:var(--lime) }
  .cctr-badge { font-size:11px; background:var(--lime); color:var(--bg); padding:4px 10px; border-radius:4px; font-weight:700 }
  .cc-row2 { display:flex; justify-content:space-between; align-items:center; padding:11px 0; border-bottom:1px solid rgba(255,255,255,.05) }
  .cc-row2:last-of-type { border:none }
  .ccr-lbl { font-size:13px; color:var(--w40) }
  .ccr-val { font-size:13px; font-weight:600 }
  .ccr-l { color:var(--lime) }
  .ccr-c { color:var(--coral) }
  .ccr-a { color:var(--amber) }
  .ccr-w { color:var(--heading) }
  .cc-cta-row { margin-top:24px; padding-top:20px; border-top:1px solid var(--border); text-align:center }

  .diploma-final { background:linear-gradient(135deg,rgba(196,255,0,.06),rgba(255,45,120,.04),rgba(255,158,0,.04)); border-top:1px solid rgba(196,255,0,.15); border-bottom:1px solid rgba(196,255,0,.15); padding:90px 5%; text-align:center }
  .df-award { display:inline-block; border:2px solid var(--lime); border-radius:20px; padding:44px 60px; background:rgba(5,11,26,.8); margin-bottom:40px; position:relative }
  .df-award::before { content:'🎓'; position:absolute; top:-20px; left:50%; transform:translateX(-50%); background:var(--bg); padding:0 12px; font-size:24px }
  .df-pgdfdb { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:clamp(22px,3vw,36px); color:var(--lime); line-height:1.1; margin-bottom:8px }
  .df-full { font-size:16px; color:var(--w70); margin-bottom:24px }
  .df-pills { display:flex; justify-content:center; gap:10px; flex-wrap:wrap }
  .df-pill { font-size:12px; background:var(--w10); border:1px solid var(--border); border-radius:50px; padding:6px 14px; color:var(--w70) }

  .testi-section2 { background:var(--bg2); padding:80px 5% }
  .tg2 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:48px }
  .tcard2 { background:var(--w10); border:1px solid var(--border); border-radius:18px; padding:26px; transition:.3s; position:relative }
  .tcard2:hover { border-color:var(--lime); background:var(--lime4) }
  .tcard2-accent { height:3px; border-radius:2px; margin-bottom:20px }
  .ta2-lime { background:linear-gradient(90deg,var(--lime),var(--ice)) }
  .ta2-coral { background:linear-gradient(90deg,var(--coral),var(--amber)) }
  .ta2-amber { background:linear-gradient(90deg,var(--amber),var(--lime)) }
  .tcard2-text { font-size:14px; color:var(--subtext); line-height:1.75; font-style:italic; margin-bottom:20px }
  .tcard2-author { display:flex; align-items:center; gap:12px; border-top:1px solid var(--border); padding-top:14px }
  .ta2-av { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px; color:var(--bg) }
  .ta2-lime-av { background:var(--lime) }
  .ta2-coral-av { background:var(--coral) }
  .ta2-amber-av { background:var(--amber) }
  .ta2-name { font-size:14px; font-weight:700; color:var(--heading) }
  .ta2-role { font-size:11px; color:var(--lime) }

  .cta2 { background:var(--bg); text-align:center; padding:96px 5%; position:relative; overflow:hidden }
  .cta2::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(196,255,0,.07),transparent); pointer-events:none }
  .cta2 h2 { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:clamp(28px,4vw,50px); margin-bottom:16px; position:relative; z-index:1; line-height:1.1; color:var(--heading) }
  .cta2 p { font-size:17px; color:var(--subtext); max-width:500px; margin:0 auto 40px; line-height:1.75; position:relative; z-index:1; font-weight:300 }
  .cta2-actions { display:flex; justify-content:center; gap:14px; flex-wrap:wrap; position:relative; z-index:1 }

  .rv { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease }
  .rv.in { opacity:1; transform:translateY(0) }
  .d1 { transition-delay:.1s }
  .d2 { transition-delay:.2s }
  .d3 { transition-delay:.3s }
  .d4 { transition-delay:.4s }

  @media(max-width:900px) {
    .hero, .tri-row, .prog-showcase, .pl-inner, .col-inner, .tg2 { grid-template-columns:1fr !important }
    .hero-right { display:none }
    .nav-links a:not(.nav-cta) { display:none }
    .col-compare { position:static }
  }
`;

export default function UpskillizePGDFDB() {
  useEffect(() => {
    // Inject styles
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));

    return () => {
      document.head.removeChild(styleEl);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-mark">U</div>
          <div className="logo-name"><span>Upskillize</span> PGDFDB</div>
        </div>
        <div className="nav-links">
          <a href="#trimesters">Trimesters</a>
          <a href="#programs">Programs</a>
          <a href="#placement">Placements</a>
          <a href="#colleges">For Colleges</a>
          <a href="#cta" className="nav-cta">Partner →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content rv">
          <div className="hero-tag">
            <div className="ht-dot"></div>
            <span className="ht-text">PG Parallel Program · 2 Years · 6 Trimesters</span>
          </div>
          <h1>
            Lead FinTech &amp;<br />
            <span className="lc">Digital Business</span><br />
            from Your PG Years
          </h1>
          <p className="hero-sub">
            India's most industry-aggressive PG certification track — PGDFDB runs alongside your MBA, MCom or PGDM and transforms you from a student into a FinTech leader. One certificate per trimester. Final PGDFDB diploma.
          </p>
          <div className="hero-btns">
            <a href="#cta" className="btn-lime">Partner With Us →</a>
            <a href="#trimesters" className="btn-line">See 6 Trimesters</a>
          </div>
          <div className="hero-chips">
            <span className="chip chip-l">6 Trimesters</span>
            <span className="chip chip-c">6+ Certifications</span>
            <span className="chip chip-a">MiniCEO Program</span>
            <span className="chip chip-i">Data to Decisions</span>
            <span className="chip chip-l">PGDFDB Diploma</span>
            <span className="chip">AI in BFSI</span>
          </div>
        </div>
        <div className="hero-right rv d2">
          <svg width="440" height="480" viewBox="0 0 440 480" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lg-lime" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4FF00" /><stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
              <linearGradient id="lg-coral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF2D78" /><stop offset="100%" stopColor="#FF9E00" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <rect x="0" y="0" width="440" height="480" rx="20" fill="rgba(7,15,34,0.95)" stroke="rgba(196,255,0,0.2)" strokeWidth="1" />
            <rect x="0" y="0" width="440" height="56" rx="20" fill="rgba(196,255,0,0.15)" />
            <rect x="0" y="36" width="440" height="20" fill="rgba(196,255,0,0.15)" />
            <text x="220" y="35" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="800" fill="#C4FF00" textAnchor="middle" letterSpacing="1">PGDFDB · 2 YEARS · 6 TRIMESTERS</text>
            {/* T1 */}
            <rect x="24" y="76" width="80" height="64" rx="10" fill="rgba(196,255,0,0.12)" stroke="rgba(196,255,0,0.35)" strokeWidth="1.5" />
            <text x="64" y="97" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="800" fill="#C4FF00" textAnchor="middle">T1</text>
            <text x="64" y="112" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">BFSI &amp;</text>
            <text x="64" y="125" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">FinTech</text>
            {/* T2 */}
            <rect x="116" y="76" width="80" height="64" rx="10" fill="rgba(196,255,0,0.08)" stroke="rgba(196,255,0,0.25)" strokeWidth="1.5" />
            <text x="156" y="97" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="800" fill="#C4FF00" textAnchor="middle">T2</text>
            <text x="156" y="112" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">Digital</text>
            <text x="156" y="125" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">Finance Tech</text>
            {/* T3 */}
            <rect x="208" y="76" width="80" height="64" rx="10" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5" />
            <text x="248" y="97" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="800" fill="#00D4FF" textAnchor="middle">T3</text>
            <text x="248" y="112" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">Data &amp; AI</text>
            <text x="248" y="125" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">Analytics</text>
            {/* T4 */}
            <rect x="300" y="76" width="80" height="64" rx="10" fill="rgba(255,45,120,0.12)" stroke="rgba(255,45,120,0.35)" strokeWidth="1.5" />
            <text x="340" y="97" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="800" fill="#FF2D78" textAnchor="middle">T4</text>
            <text x="340" y="112" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">AI Product</text>
            <text x="340" y="125" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">Management</text>
            {/* T5 */}
            <rect x="70" y="160" width="80" height="64" rx="10" fill="rgba(255,158,0,0.12)" stroke="rgba(255,158,0,0.35)" strokeWidth="1.5" />
            <text x="110" y="181" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="800" fill="#FF9E00" textAnchor="middle">T5</text>
            <text x="110" y="196" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">MiniCEO &amp;</text>
            <text x="110" y="209" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">IB Strategy</text>
            {/* T6 */}
            <rect x="250" y="160" width="80" height="64" rx="10" fill="rgba(196,255,0,0.18)" stroke="rgba(196,255,0,0.5)" strokeWidth="2" />
            <text x="290" y="181" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="800" fill="#C4FF00" textAnchor="middle">T6</text>
            <text x="290" y="196" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.8)" textAnchor="middle">Grand</text>
            <text x="290" y="209" fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.8)" textAnchor="middle">Capstone</text>
            <path d="M 404 108 Q 420 108 420 160 Q 420 186 406 186" stroke="rgba(196,255,0,0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 24 108 Q 10 108 10 160 Q 10 186 24 186" stroke="rgba(255,158,0,0.2)" strokeWidth="1.5" fill="none" />
            <rect x="24" y="244" width="392" height="2" fill="rgba(196,255,0,0.1)" rx="1" />
            <text x="24" y="266" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" fill="rgba(196,255,0,0.6)" letterSpacing="2">EMBEDDED PROGRAMS</text>
            {/* Program badges */}
            <rect x="24" y="278" width="106" height="40" rx="8" fill="rgba(196,255,0,0.08)" stroke="rgba(196,255,0,0.2)" strokeWidth="1" />
            <text x="77" y="295" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#C4FF00" textAnchor="middle">BFSI Domain</text>
            <text x="77" y="307" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Excellence</text>
            <rect x="140" y="278" width="106" height="40" rx="8" fill="rgba(255,45,120,0.08)" stroke="rgba(255,45,120,0.2)" strokeWidth="1" />
            <text x="193" y="295" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#FF2D78" textAnchor="middle">RM Skills</text>
            <text x="193" y="307" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">RM Role Eligible</text>
            <rect x="256" y="278" width="106" height="40" rx="8" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <text x="309" y="295" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#00D4FF" textAnchor="middle">Risk &amp; RegTech</text>
            <text x="309" y="307" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Certified</text>
            <rect x="24" y="328" width="106" height="40" rx="8" fill="rgba(196,255,0,0.06)" stroke="rgba(196,255,0,0.15)" strokeWidth="1" />
            <text x="77" y="345" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#C4FF00" textAnchor="middle">Data to</text>
            <text x="77" y="357" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Decisions</text>
            <rect x="140" y="328" width="106" height="40" rx="8" fill="rgba(255,45,120,0.06)" stroke="rgba(255,45,120,0.15)" strokeWidth="1" />
            <text x="193" y="345" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#FF2D78" textAnchor="middle">AI Product</text>
            <text x="193" y="357" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Management</text>
            <rect x="256" y="328" width="106" height="40" rx="8" fill="rgba(255,158,0,0.06)" stroke="rgba(255,158,0,0.15)" strokeWidth="1" />
            <text x="309" y="345" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#FF9E00" textAnchor="middle">IB Technology</text>
            <text x="309" y="357" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Capital Markets</text>
            {/* PGDFDB Final */}
            <rect x="24" y="386" width="392" height="56" rx="12" fill="rgba(196,255,0,0.15)" stroke="rgba(196,255,0,0.5)" strokeWidth="2" />
            <text x="220" y="413" fontFamily="Plus Jakarta Sans" fontSize="16" fontWeight="800" fill="#C4FF00" textAnchor="middle">🎓 PGDFDB DIPLOMA</text>
            <text x="220" y="432" fontFamily="Inter" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle">Post Graduate Diploma in FinTech and Digital Business · NSQF Level 7</text>
            <circle cx="220" cy="414" r="220" fill="none" stroke="rgba(196,255,0,0.03)" strokeWidth="1">
              <animateTransform attributeName="transform" type="scale" from="1" to="1.02" dur="3s" repeatCount="indefinite" additive="sum" />
            </circle>
          </svg>
        </div>
      </section>

      {/* STAT STRIP */}
      <div className="stat-strip">
        <div className="ss rv"><div className="ss-n">6</div><div className="ss-l">Trimesters</div></div>
        <div className="ss rv d1"><div className="ss-n">8+</div><div className="ss-l">Credentials</div></div>
        <div className="ss rv d2"><div className="ss-n">104</div><div className="ss-l">Guest Lectures</div></div>
        <div className="ss rv d3"><div className="ss-n">1,200+</div><div className="ss-l">Industry Hours</div></div>
        <div className="ss rv d4"><div className="ss-n">NSQF 7</div><div className="ss-l">Qualification</div></div>
        <div className="ss rv"><div className="ss-n">PGDFDB</div><div className="ss-l">Final Award</div></div>
      </div>

      {/* 6 TRIMESTERS */}
      <section className="tri-section" id="trimesters">
        <div className="lbl rv c">2 Years · 6 Trimesters · 1 Certificate Per Trimester</div>
        <h2 className="ttl rv d1 c">The PGDFDB Trimester Journey</h2>
        <p className="sdesc rv d2 c">Each trimester is a focused, industry-intensive block — live sessions, case studies, guest lectures, and a capstone project that earns you a real certificate. No semester dilution. Pure focus.</p>

        <div className="tri-year-label tyl-1 rv">Year 1 — Build Your Foundation</div>
        <div className="tri-row">
          <div className="tc2 lime-h rv d1">
            <div className="tc2-bg" style={{ color: "var(--lime)" }}>1</div>
            <div className="tri-num-tag nt-lime">Trimester 1</div>
            <h3>BFSI Foundations &amp; FinTech Landscape</h3>
            <p>Indian banking architecture, financial markets, digital payments, FinTech ecosystem, NBFCs, InsurTech — the complete landscape every BFSI employer expects you to command.</p>
            <div className="tc2-topics">
              <span className="tc2-t">RBI & Monetary Policy</span><span className="tc2-t">Capital Markets & SEBI</span>
              <span className="tc2-t">UPI / NPCI Infrastructure</span><span className="tc2-t">FinTech Verticals</span>
              <span className="tc2-t">NBFCs & Neo-Banks</span><span className="tc2-t">Digital Lending & BNPL</span>
            </div>
            <div className="tc2-cert">🏅 Cert 1: Certified BFSI &amp; FinTech Associate (CBFA)</div>
          </div>

          <div className="tc2 lime-h rv d2">
            <div className="tc2-bg" style={{ color: "var(--lime)" }}>2</div>
            <div className="tri-num-tag nt-lime">Trimester 2</div>
            <h3>Digital Finance Technologies &amp; RegTech</h3>
            <p>Open banking, Account Aggregator, blockchain/CBDC, AML/KYC tech, core banking cloud migration, cybersecurity, and the regulatory technology redefining compliance.</p>
            <div className="tc2-topics">
              <span className="tc2-t">Open Banking / AA</span><span className="tc2-t">Blockchain & DeFi & CBDC</span>
              <span className="tc2-t">AML / KYC Platforms</span><span className="tc2-t">Core Banking & Cloud</span>
              <span className="tc2-t">Cybersecurity in BFSI</span><span className="tc2-t">Risk & RegTech Certified</span>
            </div>
            <div className="tc2-cert">🏅 Cert 2: Certified Digital Finance Technologist (CDFT)</div>
          </div>

          <div className="tc2 coral-h rv d3">
            <div className="tc2-bg" style={{ color: "var(--coral)" }}>3</div>
            <div className="tri-num-tag nt-coral">Trimester 3</div>
            <h3>Data to Decisions &amp; AI in Finance</h3>
            <p>Power BI financial dashboards, AI/ML credit scoring, alternative data, GenAI applications in BFSI, and the full <strong style={{ color: "var(--lime)" }}>Data to Decisions</strong> Upskillize certification.</p>
            <div className="tc2-topics">
              <span className="tc2-t">Power BI & Advanced DAX</span><span className="tc2-t">AI Credit Models</span>
              <span className="tc2-t">Alternative Data Analytics</span><span className="tc2-t">GenAI & LLMs in BFSI</span>
              <span className="tc2-t">Fraud Detection AI</span><span className="tc2-t">Responsible AI / XAI</span>
            </div>
            <div className="tc2-cert">🏅 Cert 3: Certified BFSI Data &amp; AI Professional (CBDAP)</div>
          </div>
        </div>

        <div className="tri-year-label tyl-2 rv" style={{ marginTop: "40px" }}>Year 2 — Specialise &amp; Lead</div>
        <div className="tri-row">
          <div className="tc2 coral-h rv d1">
            <div className="tc2-bg" style={{ color: "var(--coral)" }}>4</div>
            <div className="tri-num-tag nt-coral">Trimester 4</div>
            <h3>AI Product Management &amp; GenAI Strategy</h3>
            <p>The most in-demand BFSI skill in 2026. AI product lifecycle, GenAI in banking, agentic AI, responsible AI governance, and the full <strong style={{ color: "var(--lime)" }}>AI Product Management</strong> Upskillize certification.</p>
            <div className="tc2-topics">
              <span className="tc2-t">AI Product Lifecycle & PRDs</span><span className="tc2-t">GenAI & LLMs Deep Dive</span>
              <span className="tc2-t">Agentic AI in Banking</span><span className="tc2-t">OKRs & Product Metrics</span>
              <span className="tc2-t">RBI AI Governance 2024</span><span className="tc2-t">AI PM Certified</span>
            </div>
            <div className="tc2-cert">🏅 Cert 4: Certified AI Finance Product Manager (CAFPM)</div>
          </div>

          <div className="tc2 amber-h rv d2">
            <div className="tc2-bg" style={{ color: "var(--amber)" }}>5</div>
            <div className="tri-num-tag nt-amber">Trimester 5</div>
            <h3>MiniCEO + IB Technology + Digital Strategy</h3>
            <p>The <strong style={{ color: "var(--amber)" }}>MiniCEO Program</strong> for product thinking + Investment Banking Technology certification + digital transformation strategy for BFSI. ESG, FRTB/Basel III and sustainable finance.</p>
            <div className="tc2-topics">
              <span className="tc2-t">MiniCEO — Product Thinking</span><span className="tc2-t">IB Technology (FIX, Murex)</span>
              <span className="tc2-t">FRTB & Basel III Final</span><span className="tc2-t">ESG & Green Finance</span>
              <span className="tc2-t">Digital Transformation</span><span className="tc2-t">FinTech Startup Strategy</span>
            </div>
            <div className="tc2-cert">🏅 Cert 5: Certified Digital Finance Strategist (CDFS)</div>
          </div>

          <div className="tc2 lime-h rv d3" style={{ background: "rgba(196,255,0,0.08)", borderColor: "rgba(196,255,0,0.4)" }}>
            <div className="tc2-bg" style={{ color: "var(--lime)" }}>6</div>
            <div className="tri-num-tag nt-lime">Trimester 6</div>
            <h3>Grand Capstone &amp; Career Launch</h3>
            <p>Synthesise 2 years into a Grand FinTech Venture Pitch evaluated by an industry panel. Placement sprint, mock interviews, employer connects, and PGDFDB Diploma award.</p>
            <div className="tc2-topics">
              <span className="tc2-t">Grand FinTech Venture Pitch</span><span className="tc2-t">Financial Modelling</span>
              <span className="tc2-t">Investor Pitch Mastery</span><span className="tc2-t">Mock Interview Sprint</span>
              <span className="tc2-t">Employer Connect Events</span><span className="tc2-t">PGDFDB Diploma</span>
            </div>
            <div className="tc2-cert" style={{ background: "rgba(196,255,0,0.15)", borderColor: "rgba(196,255,0,0.5)", color: "var(--lime)" }}>🎓 PGDFDB Diploma — Post Graduate Diploma in FinTech &amp; Digital Business</div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SHOWCASE */}
      <section className="prog-section" id="programs">
        <div className="lbl rv c">Flagship Programs — All Included</div>
        <h2 className="ttl rv d1 c">Six Industry Programs.<br /><span className="lc">Zero Extra Fee.</span></h2>
        <p className="sdesc rv d2 c">These Upskillize industry certifications are structurally embedded across 6 trimesters — fully assessed, certificated, and delivered by industry practitioners.</p>
        <div className="prog-showcase">
          <div className="ps-card psc-1 rv d1">
            <div className="ps-icon">🏦</div>
            <h3>BFSI Domain Excellence</h3>
            <p>The gold standard BFSI certification — complete banking product knowledge, CBS architecture, regulatory intelligence, and customer segment mastery.</p>
            <div className="ps-topics">
              <div className="pst">Banking products — CASA, loans, trade, treasury</div>
              <div className="pst">Regulatory intelligence — RBI, SEBI, IRDAI deep dive</div>
              <div className="pst">Core Banking Systems — Finacle, Temenos, Flexcube</div>
              <div className="pst">FinTech disruption across all BFSI verticals</div>
            </div>
            <span className="ps-tag pt-l">T1 · 40 Hours</span>
          </div>
          <div className="ps-card psc-2 rv d2">
            <div className="ps-icon">🤝</div>
            <h3>Relationship Management Skills</h3>
            <p>CRM platforms, KYC/AML, cross-selling frameworks — the skills that open doors to RM roles in retail, corporate and private banking.</p>
            <div className="ps-topics">
              <div className="pst co">Salesforce FSC, CRM analytics, client 360</div>
              <div className="pst co">KYC Master Direction, V-CIP, Video KYC</div>
              <div className="pst co">Cross-selling, propensity models, RM scorecards</div>
              <div className="pst co">HNI pitch, corporate loan structuring, deal skills</div>
            </div>
            <span className="ps-tag pt-c">T1 · 24 Hours</span>
          </div>
          <div className="ps-card psc-3 rv d3">
            <div className="ps-icon">⚖️</div>
            <h3>Risk &amp; Regulatory Technology</h3>
            <p>Basel III, FRTB, AML/KYC technology, GRC platforms, DPDPA compliance — the risk depth every BFSI shortlist demands.</p>
            <div className="ps-topics">
              <div className="pst am">Credit risk — PD, LGD, EAD, IRB approach</div>
              <div className="pst am">Market risk — VaR, Expected Shortfall, FRTB basics</div>
              <div className="pst am">AML — TMS, sanctions screening, FATF 40 Recs</div>
              <div className="pst am">GRC tools — MetricStream, ServiceNow, OpenPages</div>
            </div>
            <span className="ps-tag pt-a">T2 · 36 Hours</span>
          </div>
          <div className="ps-card psc-4 rv d1">
            <div className="ps-icon">📊</div>
            <h3>Data to Decisions (Power BI)</h3>
            <p>From raw financial data to executive dashboards. Power BI, DAX, Python integration, KPI analytics — the data skill BFSI teams can't find enough of.</p>
            <div className="ps-topics">
              <div className="pst">Power BI Desktop — data models, DAX, report themes</div>
              <div className="pst">Financial KPIs — NIM, GNPA, CRAR, ROE dashboards</div>
              <div className="pst">Advanced DAX — time intelligence, YTD, variance</div>
              <div className="pst">Board-ready storytelling and executive presentations</div>
            </div>
            <span className="ps-tag pt-l">T3 · 30 Hours</span>
          </div>
          <div className="ps-card psc-5 rv d2">
            <div className="ps-icon">🤖</div>
            <h3>AI Product Management</h3>
            <p>AI product lifecycle, GenAI in BFSI, LLMs, agentic AI, build vs buy, PRD writing, OKRs — the single most in-demand BFSI technology skill in 2026.</p>
            <div className="ps-topics">
              <div className="pst">AI product canvas — feasibility, data strategy, launch</div>
              <div className="pst">GenAI / LLMs / RAG for banking applications</div>
              <div className="pst">Agentic AI workflows — reconciliation, compliance bots</div>
              <div className="pst">Responsible AI — MRM, RBI governance, XAI</div>
            </div>
            <span className="ps-tag pt-c">T4 · 40 Hours</span>
          </div>
          <div className="ps-card psc-6 rv d3">
            <div className="ps-icon">🚀</div>
            <h3>MiniCEO Program</h3>
            <p>Think like a founder, build like a product manager. Business model innovation, FinTech venture strategy, design thinking, and investor pitch mastery.</p>
            <div className="ps-topics">
              <div className="pst am">Business Model Canvas for FinTech ventures</div>
              <div className="pst am">Product Management — PRDs, roadmaps, OKRs</div>
              <div className="pst am">FinTech startup — funding, GTM, unit economics</div>
              <div className="pst am">Investor pitch deck and Demo Day preparation</div>
            </div>
            <span className="ps-tag pt-a">T5 · 30 Hours</span>
          </div>
        </div>
      </section>

      {/* PLACEMENT */}
      <section className="placement-section" id="placement">
        <div className="pl-glow"></div>
        <div className="pl-inner">
          <div>
            <div className="lbl rv">Career Outcomes</div>
            <h2 className="ttl rv d1">Jobs Built on<br />What You <span className="lc">Actually Learned</span></h2>
            <p className="sdesc rv d2">PGDFDB curriculum is reverse-engineered from live BFSI and FinTech job descriptions. Every module maps to a real hiring requirement.</p>
            <div className="roles-visual">
              <div className="rv-category rv d1">
                <div className="rvc-label">FinTech &amp; Product Roles</div>
                <div className="roles-row">
                  <div className="role-pill">FinTech Product Manager</div>
                  <div className="role-pill">AI Finance PM</div>
                  <div className="role-pill">Digital Banking Strategist</div>
                  <div className="role-pill">Open Banking PO</div>
                </div>
              </div>
              <div className="rv-category rv d2">
                <div className="rvc-label" style={{ color: "var(--coral)" }}>Banking &amp; RM Roles</div>
                <div className="roles-row">
                  <div className="role-pill coral">Relationship Manager — Corporate</div>
                  <div className="role-pill coral">Private Banking RM</div>
                  <div className="role-pill coral">Transaction Banker</div>
                  <div className="role-pill coral">Credit Risk Analyst</div>
                </div>
              </div>
              <div className="rv-category rv d3">
                <div className="rvc-label" style={{ color: "var(--amber)" }}>Analytics &amp; Risk Roles</div>
                <div className="roles-row">
                  <div className="role-pill amber">Data Analyst — BFSI</div>
                  <div className="role-pill amber">Risk Analyst (Basel / FRTB)</div>
                  <div className="role-pill amber">RegTech Specialist</div>
                  <div className="role-pill amber">AML / Compliance Analyst</div>
                </div>
              </div>
              <div className="rv-category rv d1">
                <div className="rvc-label" style={{ color: "var(--ice)" }}>Emerging Roles</div>
                <div className="roles-row">
                  <div className="role-pill" style={{ color: "var(--ice)", borderColor: "rgba(0,212,255,.3)" }}>GenAI Solutions Analyst</div>
                  <div className="role-pill" style={{ color: "var(--ice)", borderColor: "rgba(0,212,255,.3)" }}>IB Technology Analyst</div>
                  <div className="role-pill" style={{ color: "var(--ice)", borderColor: "rgba(0,212,255,.3)" }}>ESG Finance Analyst</div>
                  <div className="role-pill" style={{ color: "var(--ice)", borderColor: "rgba(0,212,255,.3)" }}>FinTech Founder</div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-right">
            <div className="lbl rv">Placement Support</div>
            <div className="pl-stat-grid">
              <div className="plsg rv d1"><div className="plsg-n">8+</div><div className="plsg-l">Credentials in portfolio on graduation</div></div>
              <div className="plsg rv d2"><div className="plsg-n">104</div><div className="plsg-l">Guest lecture sessions = 208 hrs access</div></div>
              <div className="plsg rv d3"><div className="plsg-n">6</div><div className="plsg-l">Capstone projects as work portfolio</div></div>
              <div className="plsg rv d4"><div className="plsg-n">Day 1</div><div className="plsg-l">Interview-ready from first session</div></div>
            </div>
            <div className="lbl rv" style={{ marginTop: "28px" }}>What We Deliver for Placement</div>
            <div className="support-blocks">
              <div className="sb2 rv d1"><span className="sb2-icon">🎯</span><div><h5>Placement Sprint — Trimester 6</h5><p>Dedicated placement module: mock interviews (technical + HR), resume deep-dive, employer connects and personal brand audit.</p></div></div>
              <div className="sb2 rv d2"><span className="sb2-icon">🏢</span><div><h5>Employer Connect Events</h5><p>Campus drives, virtual employer panels, and direct company introductions through Upskillize's BFSI partner network.</p></div></div>
              <div className="sb2 rv d3"><span className="sb2-icon">🔗</span><div><h5>Alumni Mentoring Network</h5><p>1:1 matching with PGDFDB alumni in your target role and sector for guidance and referrals throughout the program.</p></div></div>
              <div className="sb2 rv d1"><span className="sb2-icon">📁</span><div><h5>Capstone Portfolio Review</h5><p>6 capstone projects professionally evaluated — give employers actual evidence of your work, not just exam grades.</p></div></div>
              <div className="sb2 rv d2"><span className="sb2-icon">🎙️</span><div><h5>CXO Guest Lecture Network</h5><p>104 live sessions across 2 years build real professional connections with India's BFSI and FinTech leadership.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR COLLEGES */}
      <section className="col-section" id="colleges">
        <div className="col-inner">
          <div>
            <div className="lbl rv">For Partner Institutions</div>
            <h2 className="ttl rv d1">Your MBA Students Deserve<br />More Than an <span className="cc">MBA</span></h2>
            <p className="sdesc rv d2">PGDFDB runs fully alongside your MBA, MCom or PGDM — delivered entirely by Upskillize. Zero curriculum cost. Maximum placement differentiation.</p>
            <div className="benefits-col">
              <div className="bcol rv d1"><div className="bcol-icon">🎓</div><div><h4>NSQF Level 7 — Academic Credibility</h4><p>PGDFDB carries post-graduate diploma equivalence — reinforcing your institution's academic standing in industry rankings.</p></div></div>
              <div className="bcol rv d2"><div className="bcol-icon" style={{ background: "var(--coral3)", borderColor: "rgba(255,45,120,.2)" }}>📈</div><div><h4>Placement Outcomes — Measurably Better</h4><p>Graduates with 8 credentials, capstone portfolios, and IB + AI certifications attract employers your regular MBA can't reach.</p></div></div>
              <div className="bcol rv d3"><div className="bcol-icon">🏛️</div><div><h4>104 Industry Experts Visiting</h4><p>BFSI CXOs, FinTech founders, AI researchers — weekly guest lectures put your campus on India's FinTech map.</p></div></div>
              <div className="bcol rv d1"><div className="bcol-icon" style={{ background: "var(--coral3)", borderColor: "rgba(255,45,120,.2)" }}>💼</div><div><h4>Zero Faculty. Zero Content Work.</h4><p>Upskillize delivers all sessions, content, assessment, and certificates. Your team focuses on student support.</p></div></div>
              <div className="bcol rv d2"><div className="bcol-icon">💰</div><div><h4>Revenue-Share Partnership</h4><p>Transparent revenue sharing. No upfront investment. The programme creates value from the first enrolled cohort.</p></div></div>
              <div className="bcol rv d3"><div className="bcol-icon" style={{ background: "var(--coral3)", borderColor: "rgba(255,45,120,.2)" }}>📊</div><div><h4>EcoPro Admin Analytics</h4><p>Live visibility into student progress, scores, engagement — college-level dashboards accessible by your placement team.</p></div></div>
            </div>
          </div>
          <div className="col-compare rv d3">
            <div className="cc-title-row">
              <div className="cctr-title">Partnership at a Glance</div>
              <div className="cctr-badge">MBA/PGDM Compatible</div>
            </div>
            <div className="cc-row2"><span className="ccr-lbl">Program Duration</span><span className="ccr-val ccr-l">2 Years / 6 Trimesters</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Target Students</span><span className="ccr-val ccr-w">MBA, MCom, PGDM</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Total Credentials</span><span className="ccr-val ccr-a">8 Certificates + Diploma</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Embedded Programs</span><span className="ccr-val ccr-a">6 Upskillize Courses</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Guest Lectures</span><span className="ccr-val ccr-l">104 Sessions · 208 Hours</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Assessment Framework</span><span className="ccr-val ccr-w">AICTE RUBRIC + AI Agent</span></div>
            <div className="cc-row2"><span className="ccr-lbl">NSQF Level</span><span className="ccr-val ccr-l">Level 7</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Faculty Needed</span><span className="ccr-val ccr-l">Zero — Fully Delivered</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Platform</span><span className="ccr-val ccr-w">EcoPro LMS · 5 AI Agents</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Placement Support</span><span className="ccr-val ccr-l">6 Months Post-Grad</span></div>
            <div className="cc-row2"><span className="ccr-lbl">Upfront Cost</span><span className="ccr-val" style={{ color: "var(--coral)" }}>Zero — Revenue Share</span></div>
            <div className="cc-cta-row">
              <a href="mailto:partner@upskillize.com" className="btn-lime" style={{ display: "inline-flex", justifyContent: "center" }}>Schedule a Call →</a>
            </div>
          </div>
        </div>
      </section>

      {/* DIPLOMA FINAL */}
      <section className="diploma-final">
        <div className="rv">
          <div className="df-award">
            <div className="df-pgdfdb">Post Graduate Diploma in<br />FinTech and Digital Business</div>
            <div className="df-full">PGDFDB · Awarded end of Trimester 6 · NSQF Level 7</div>
            <div className="df-pills">
              <span className="df-pill">6 Trimester Certificates</span>
              <span className="df-pill">BFSI Domain Excellence</span>
              <span className="df-pill">RM Skills</span>
              <span className="df-pill">Risk & RegTech</span>
              <span className="df-pill">Data to Decisions</span>
              <span className="df-pill">AI Product Management</span>
              <span className="df-pill">MiniCEO Certificate</span>
              <span className="df-pill">IB Technology</span>
              <span className="df-pill">Grand Capstone Project</span>
              <span className="df-pill">EcoPro AI Portfolio</span>
            </div>
          </div>
          <h2 className="ttl c" style={{ maxWidth: "580px", margin: "0 auto 14px" }}>More Than a PG Degree.<br /><span className="lc">A FinTech Career Blueprint.</span></h2>
          <p className="sdesc c" style={{ margin: "0 auto" }}>The PGDFDB diploma plus 8 credentials puts you in a category of one. Not just a degree holder — a certified FinTech and digital business leader, built for 2026 and beyond.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section2">
        <div className="lbl rv c">Student Stories</div>
        <h2 className="ttl rv d1 c">What PGDFDB Students Say</h2>
        <div className="tg2">
          <div className="tcard2 rv d1">
            <div className="tcard2-accent ta2-lime"></div>
            <p className="tcard2-text">I was doing MBA Finance at a good B-school. PGDFDB ran on weekends and evenings — and by Trimester 3, I knew more about AI credit models than most of my professors. Got placed as AI Finance PM before semester 4 ended.</p>
            <div className="tcard2-author"><div className="ta2-av ta2-lime-av">A</div><div><div className="ta2-name">Arjun V.</div><div className="ta2-role">MBA → AI Finance PM, FinTech Unicorn</div></div></div>
          </div>
          <div className="tcard2 rv d2">
            <div className="tcard2-accent ta2-coral"></div>
            <p className="tcard2-text">The IB Technology certification from Trimester 5 opened a door I didn't know existed. After learning FIX protocol and Murex, I walked into an investment bank technology interview and got selected over IIT graduates.</p>
            <div className="tcard2-author"><div className="ta2-av ta2-coral-av">N</div><div><div className="ta2-name">Nandini S.</div><div className="ta2-role">MCom → IB Technology Analyst, Global Bank</div></div></div>
          </div>
          <div className="tcard2 rv d3">
            <div className="tcard2-accent ta2-amber"></div>
            <p className="tcard2-text">The MiniCEO program genuinely changed my mindset. Combined with Data to Decisions — I walked into every interview with a live Power BI dashboard showcasing real BFSI analysis. My portfolio spoke before I did.</p>
            <div className="tcard2-author"><div className="ta2-av ta2-amber-av">K</div><div><div className="ta2-name">Karthik R.</div><div className="ta2-role">PGDM → Credit & Analytics Lead, NBFC</div></div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta2" id="cta">
        <div className="lbl rv c">Get Started</div>
        <h2 className="rv d1">Ready to Bring PGDFDB<br />to Your Institution?</h2>
        <p className="rv d2">Partner with Upskillize and give your PG students the FinTech credential India's top employers are looking for — delivered entirely by us.</p>
        <div className="cta2-actions">
          <a href="https://www.upskillize.com/contact" className="btn-lime rv d3">Request a Partnership Call →</a>
          <a href="https://www.upskillize.com" className="btn-line rv d4">Visit Upskillize.com</a>
        </div>
      </section>

    </>
  );
}