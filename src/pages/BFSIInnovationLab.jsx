import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   FinTech & AI Innovation Lab — India's First | Upskillize Solutions
   Converted from HTML → JSX
   Changes:
     • Name updated to "FinTech & AI Innovation Lab" throughout
     • Footer removed
     • Google Fonts via JSX <link> tag (Plus Jakarta Sans, DM Sans, JetBrains Mono)
     • All HTML → JSX (class→className, kebab-case SVG attrs→camelCase, inline style→{{}})
     • Partnership Tiers: removed icon, added fee dropdown, removed register button
───────────────────────────────────────────────────────────── */

const TIER_DATA = [
  {
    cls: "base",
    badge: "STANDARD",
    name: "Lab Essentials",
    sub: "Curriculum + LMS — ideal for year-one adoption",
    fee: "₹2,50,000 / year",
    duration: "1 Academic Year",
    feats: [
      "4 core zone activations",
      "lms.upskillize.com cohort access",
      "2 certification tracks (CAIP / CDBL)",
      "Quarterly content updates",
      "RegTech & compliance webinars",
      "Faculty orientation (1 session)",
      "Basic placement dashboard",
    ],
  },
  {
    cls: "feat",
    badge: "PREMIUM",
    popular: true,
    name: "Full Innovation Lab",
    sub: "Complete lab + all 10 zones — flagship partnership",
    fee: "₹5,00,000 / year",
    duration: "1–2 Academic Years",
    feats: [
      "All 10 zone activations",
      "Full LMS + Claude AI agent access",
      "CAIP + CDBL + FRM / PRM cert tracks",
      "Capstone review & co-certification",
      "Monthly RegTech expert sessions",
      "Faculty train-the-trainer program",
      "Internship pipeline integration",
      "Oracle FLEXCUBE + SAP access",
      "Co-branded certification seals",
      "Placement performance analytics",
    ],
  },
  {
    cls: "ent",
    badge: "ENTERPRISE",
    name: "Centre of Excellence",
    sub: "Dedicated CoE — for nationally leading institutions",
    fee: "Contact for Pricing",
    duration: "Multi-Year Partnership",
    feats: [
      "Everything in Full Lab tier",
      "Dedicated Upskillize faculty presence",
      "Physical lab design consultancy",
      "Custom Indian BFSI case study dev.",
      "Bank / NBFC MoU facilitation",
      "ESG reporting framework lab",
      "National hackathon hosting rights",
      "NAAC/NBA documentation support",
      "Research paper publication support",
    ],
  },
];

function PartnershipTiers() {
  const [openFee, setOpenFee] = useState(null);
  return (
    <section className="sec" id="partnership">
      <style>{`
        .pt-fee-btn { cursor:pointer; display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; padding:7px 14px; border-radius:20px; border:none; margin-top:16px; transition:background .2s,transform .15s; }
        .pt.base .pt-fee-btn { background:var(--bg2); color:var(--tx2); }
        .pt.feat .pt-fee-btn { background:var(--tl); color:var(--td); }
        .pt.ent .pt-fee-btn { background:var(--pl); color:var(--pd); }
        .pt-fee-btn:hover { transform:scale(1.04); }
        .pt-fee-drop { overflow:hidden; transition:max-height .35s ease, opacity .3s ease; }
        .pt-fee-drop.open { max-height:120px; opacity:1; }
        .pt-fee-drop.closed { max-height:0; opacity:0; }
        .pt-fee-box { margin-top:10px; border-radius:10px; padding:12px 14px; }
        .pt.base .pt-fee-box { background:var(--bg2); border:1.5px solid var(--bds); }
        .pt.feat .pt-fee-box { background:var(--tl); border:1.5px solid var(--tb); }
        .pt.ent .pt-fee-box { background:var(--pl); border:1.5px solid var(--pb); }
        .pt-fee-label { font-size:10px; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px; }
        .pt.base .pt-fee-label { color:var(--tx3); }
        .pt.feat .pt-fee-label { color:var(--td); }
        .pt.ent .pt-fee-label { color:var(--pd); }
        .pt-fee-amount { font-family:var(--fd); font-size:20px; font-weight:800; }
        .pt.base .pt-fee-amount { color:var(--navy); }
        .pt.feat .pt-fee-amount { color:var(--td); }
        .pt.ent .pt-fee-amount { color:var(--pd); }
        .pt-fee-dur { font-size:11px; margin-top:3px; }
        .pt.base .pt-fee-dur { color:var(--tx3); }
        .pt.feat .pt-fee-dur { color:var(--td); }
        .pt.ent .pt-fee-dur { color:var(--pd); }
      `}</style>
      <div className="sc">
        <div className="sec-label">Engagement Models</div>
        <h2 className="sec-title">Choose Your <span className="ht">Partnership Tier</span></h2>
        <p className="sec-sub">Flexible models for different institution sizes, budgets, and ambitions. All tiers include the full FinTech &amp; AI Innovation Lab framework, Agile standup zone, collaboration workspace, and co-certification rights.</p>
      </div>
      <div className="pt-grid">
        {TIER_DATA.map((tier, i) => (
          <div className={`pt ${tier.cls} reveal${i > 0 ? ` d${i}` : ""}`} key={tier.badge}>
            {tier.popular && <div className="popular">MOST POPULAR</div>}
            <span className="pt-badge">{tier.badge}</span>
            <div className="pt-name">{tier.name}</div>
            <div className="pt-sub">{tier.sub}</div>
            <ul className="pt-feats">
              {tier.feats.map(f => <li key={f}>{f}</li>)}
            </ul>
            {/* Fee Dropdown Button */}
            <button
              className="pt-fee-btn"
              onClick={() => setOpenFee(openFee === i ? null : i)}
              aria-expanded={openFee === i}
            >
              💰 {openFee === i ? "Hide Fee" : "View Fee"}
              <span style={{fontSize:"10px",transition:"transform .25s",display:"inline-block",transform:openFee===i?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
            </button>
            <div className={`pt-fee-drop ${openFee === i ? "open" : "closed"}`}>
              <div className="pt-fee-box">
                <div className="pt-fee-label">Partnership Fee</div>
                <div className="pt-fee-amount">{tier.fee}</div>
                <div className="pt-fee-dur">📅 Duration: {tier.duration}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FintechAIInnovationLab() {

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            e.target.querySelectorAll(".z-bar-fill,.cov-bar-fill").forEach((b) => {
              const w = b.getAttribute("data-w");
              if (w) setTimeout(() => { b.style.width = w + "%"; }, 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("#bfsi-lab .reveal").forEach((el) => io.observe(el));

    const t = setTimeout(() => {
      document.querySelectorAll("#bfsi-lab .z-bar-fill,#bfsi-lab .cov-bar-fill").forEach((b) => {
        const w = b.getAttribute("data-w");
        if (w) b.style.width = w + "%";
      });
    }, 900);

    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    };
    const anchors = document.querySelectorAll("#bfsi-lab a[href^='#']");
    anchors.forEach((a) => a.addEventListener("click", handleClick));

    function animateNum(el, target) {
      let start = 0, dur = 1800, s = null;
      function step(ts) {
        if (!s) s = ts;
        const prog = Math.min((ts - s) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        const cur = Math.floor(ease * target);
        if (target === 9 || target === 36 || target === 20 || target === 5) {
          el.textContent = cur;
        } else if (target >= 100) {
          el.textContent = cur + "+";
        } else {
          el.textContent = cur;
        }
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".infog-num[data-target]").forEach((n) => {
              animateNum(n, parseInt(n.getAttribute("data-target")));
            });
            countIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    const ig = document.querySelector("#bfsi-lab .infog-bar");
    if (ig) countIO.observe(ig);

    return () => {
      clearTimeout(t);
      anchors.forEach((a) => a.removeEventListener("click", handleClick));
      io.disconnect();
      countIO.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Google Fonts: Plus Jakarta Sans + DM Sans + JetBrains Mono ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
/* ═══════════════════════════════════════════════════
   UPSKILLIZE BRAND DESIGN SYSTEM
═══════════════════════════════════════════════════ */
#bfsi-lab {
  --t:#00C9A7;--td:#009E85;--tl:#E6FAF7;--tb:rgba(0,201,167,.22);
  --p:#6B3FA0;--pd:#4E2D7A;--pl:#F0EBF9;--pb:rgba(107,63,160,.2);
  --a:#F5A623;--ad:#C07A10;--al:#FEF6E7;--ab:rgba(245,166,35,.22);
  --r:#E8426A;--rl:#FDE9EF;--rb:rgba(232,66,106,.2);
  --g:#22C55E;--gl:#ECFDF5;--gb:rgba(34,197,94,.2);
  --navy:#07112E;--nm:#0D1E4A;--nl:#1A2D60;
  --bg0:#FFFFFF;--bg1:#F8FAFC;--bg2:#EEF2FA;
  --tx1:#07112E;--tx2:#3D4966;--tx3:#7A8CAB;
  --bdr:#E2E8F4;--bds:#C8D3E8;
  --sh1:0 2px 8px rgba(7,17,46,.07);
  --sh2:0 6px 24px rgba(7,17,46,.10);
  --sh3:0 16px 56px rgba(7,17,46,.13);
  --st:0 8px 32px rgba(0,201,167,.22);
  --sp:0 8px 32px rgba(107,63,160,.18);
  --r4:8px;--r8:12px;--r12:16px;--r16:20px;--r24:26px;
  --fd:'Plus Jakarta Sans',sans-serif;  /* headings & display */
  --fb:'DM Sans',sans-serif;
  --fm:'JetBrains Mono',monospace;
  font-family:var(--fb);font-size:16px;line-height:1.7;color:var(--tx1);
  background:var(--bg0);overflow-x:hidden;
}
#bfsi-lab *,#bfsi-lab *::before,#bfsi-lab *::after{box-sizing:border-box;margin:0;padding:0;}
#bfsi-lab a{text-decoration:none;}
#bfsi-lab img{display:block;max-width:100%;}
#bfsi-lab .ann-bar{background:linear-gradient(90deg,var(--navy),var(--nm));color:#fff;text-align:center;padding:10px 20px;font-family:var(--fm);font-size:11px;letter-spacing:1px;}
#bfsi-lab .ann-bar .ann-badge{background:var(--t);color:var(--navy);font-weight:700;padding:3px 10px;border-radius:20px;margin-right:10px;font-size:10px;}
#bfsi-lab .ann-bar span{opacity:.85;}
#bfsi-lab .hero{background:linear-gradient(135deg,#07112E 0%,#0D1E4A 50%,#1A2D60 100%);padding:80px 60px 70px;position:relative;overflow:hidden;}
#bfsi-lab .hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,201,167,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,.05) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
#bfsi-lab .hero-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
#bfsi-lab .hero-orb.t{width:500px;height:500px;background:rgba(0,201,167,.12);top:-100px;right:-80px;}
#bfsi-lab .hero-orb.p{width:380px;height:380px;background:rgba(107,63,160,.12);bottom:-60px;left:-40px;}
#bfsi-lab .hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;position:relative;z-index:1;}
#bfsi-lab .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,201,167,.15);border:1px solid rgba(0,201,167,.35);padding:6px 16px;border-radius:30px;font-family:var(--fm);font-size:10px;color:var(--t);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;animation:fadeUp .7s ease both;}
#bfsi-lab .hero-badge::before{content:'🏆';font-size:12px;}
#bfsi-lab .hero-h1{font-family:var(--fd);font-size:clamp(40px,5vw,68px);font-weight:800;line-height:1.06;letter-spacing:-1px;color:#fff;margin-bottom:20px;animation:fadeUp .7s .1s ease both;}
#bfsi-lab .hero-h1 .ht{color:var(--t);}
#bfsi-lab .hero-h1 .ha{color:var(--a);}
#bfsi-lab .hero-sub{font-size:17px;color:rgba(255,255,255,.72);line-height:1.78;margin-bottom:28px;animation:fadeUp .7s .2s ease both;}
#bfsi-lab .hero-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;animation:fadeUp .7s .25s ease both;}
#bfsi-lab .hero-tag{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.85);font-size:11px;font-weight:500;padding:5px 12px;border-radius:20px;}
#bfsi-lab .hero-tag.ht-g{background:rgba(0,201,167,.15);border-color:rgba(0,201,167,.3);color:var(--t);}
#bfsi-lab .hero-btns{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .7s .3s ease both;}
#bfsi-lab .btn-primary{background:linear-gradient(135deg,var(--t),var(--td));color:#fff;font-weight:700;font-size:14px;padding:13px 28px;border-radius:10px;box-shadow:var(--st);transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:7px;}
#bfsi-lab .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,201,167,.38);}
#bfsi-lab .btn-outline{background:transparent;border:1.5px solid rgba(255,255,255,.25);color:#fff;font-size:14px;font-weight:500;padding:13px 28px;border-radius:10px;transition:border-color .2s,background .2s;display:inline-flex;align-items:center;gap:7px;}
#bfsi-lab .btn-outline:hover{border-color:var(--t);background:rgba(0,201,167,.1);}
#bfsi-lab .hero-right{display:flex;flex-direction:column;gap:16px;animation:fadeUp .7s .2s ease both;}
#bfsi-lab .hero-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
#bfsi-lab .hstat{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:var(--r12);padding:18px 16px;text-align:center;transition:background .2s;}
#bfsi-lab .hstat:hover{background:rgba(255,255,255,.12);}
#bfsi-lab .hstat-n{font-family:var(--fd);font-size:34px;font-weight:800;line-height:1;margin-bottom:4px;letter-spacing:-.4px;}
#bfsi-lab .hstat-n.ct{color:var(--t);}
#bfsi-lab .hstat-n.cp{color:#b39dff;}
#bfsi-lab .hstat-n.ca{color:var(--a);}
#bfsi-lab .hstat-n.cw{color:#fff;}
#bfsi-lab .hstat-l{font-size:11px;color:rgba(255,255,255,.55);letter-spacing:.4px;}
#bfsi-lab .hero-first-badge{background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(0,201,167,.15));border:1px solid rgba(255,255,255,.15);border-radius:var(--r12);padding:16px 20px;display:flex;align-items:center;gap:14px;}
#bfsi-lab .hero-first-icon{font-size:28px;flex-shrink:0;}
#bfsi-lab .hero-first-text{font-size:13px;color:rgba(255,255,255,.85);line-height:1.6;}
#bfsi-lab .hero-first-text strong{color:var(--t);display:block;font-size:14px;margin-bottom:2px;}
#bfsi-lab .strip{background:linear-gradient(90deg,var(--tl),#fff,var(--pl));border-top:3px solid var(--t);border-bottom:3px solid var(--bdr);padding:16px 60px;display:flex;align-items:center;gap:16px;overflow:hidden;}
#bfsi-lab .strip-icon{font-size:22px;flex-shrink:0;}
#bfsi-lab .strip-text{font-size:13.5px;color:var(--tx2);line-height:1.5;}
#bfsi-lab .strip-text strong{color:var(--navy);font-weight:700;}
#bfsi-lab .strip-dots{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;}
#bfsi-lab .strip-dot{background:var(--tl);border:1px solid var(--tb);color:var(--td);font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;}
#bfsi-lab .sec{padding:72px 60px;}
#bfsi-lab .sec-alt{background:var(--bg1);}
#bfsi-lab .sec-dark{background:linear-gradient(135deg,var(--navy),var(--nm));}
#bfsi-lab .sc{max-width:820px;margin:0 auto;text-align:center;margin-bottom:52px;}
#bfsi-lab .sec-label{font-family:var(--fm);font-size:10px;color:var(--t);letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;}
#bfsi-lab .sec-title{font-family:var(--fd);font-size:clamp(28px,3.8vw,48px);font-weight:700;line-height:1.12;letter-spacing:-.5px;color:var(--navy);margin-bottom:14px;}
#bfsi-lab .sec-title .ht{color:var(--t);}
#bfsi-lab .sec-title .hp{color:var(--p);}
#bfsi-lab .sec-title .ha{color:var(--a);}
#bfsi-lab .sec-sub{color:var(--tx2);font-size:16px;line-height:1.75;}
#bfsi-lab .sec-dark .sec-title{color:#fff;}
#bfsi-lab .sec-dark .sec-label{color:var(--t);}
#bfsi-lab .sec-dark .sec-sub{color:rgba(255,255,255,.65);}
#bfsi-lab .lab3d-wrap{max-width:1080px;margin:0 auto;border-radius:20px;overflow:hidden;border:1px solid var(--bdr);box-shadow:var(--sh3);background:linear-gradient(135deg,#07112E,#0D1E4A);}
#bfsi-lab .lab3d-caption{background:#fff;border-top:1px solid var(--bdr);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;}
#bfsi-lab .lab3d-caption-title{font-family:var(--fd);font-weight:700;font-size:15px;color:var(--navy);}
#bfsi-lab .lab3d-caption-sub{font-size:12px;color:var(--tx3);}
#bfsi-lab .lab3d-pills{display:flex;gap:8px;}
#bfsi-lab .lab3d-pill{font-size:10px;padding:4px 10px;border-radius:20px;font-weight:600;}
#bfsi-lab .lab3d-pill.t{background:var(--tl);color:var(--td);}
#bfsi-lab .lab3d-pill.p{background:var(--pl);color:var(--pd);}
#bfsi-lab .lab3d-pill.a{background:var(--al);color:var(--ad);}
#bfsi-lab .fw-outer{background:#fff;border:2px solid var(--bdr);border-radius:var(--r24);padding:40px 36px 44px;max-width:1100px;margin:0 auto;box-shadow:var(--sh2);position:relative;overflow:hidden;}
#bfsi-lab .fw-outer::before{content:'FRAMEWORK';position:absolute;right:-50px;top:50%;transform:translateY(-50%) rotate(90deg);font-family:var(--fd);font-size:120px;font-weight:800;color:rgba(7,17,46,.025);letter-spacing:14px;pointer-events:none;}
#bfsi-lab .fw-title{font-family:var(--fd);font-size:18px;font-weight:600;text-align:center;color:var(--navy);margin-bottom:4px;letter-spacing:-.1px;}
#bfsi-lab .fw-title span{color:var(--t);}
#bfsi-lab .fw-subtitle{font-family:var(--fm);font-size:10px;color:var(--tx3);text-align:center;letter-spacing:1px;margin-bottom:30px;}
#bfsi-lab .zg{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
#bfsi-lab .zr2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
#bfsi-lab .zone{border-radius:var(--r12);padding:22px 20px 18px;border:1.5px solid var(--bdr);background:#fff;transition:transform .3s,box-shadow .3s,border-color .3s;position:relative;overflow:hidden;cursor:default;}
#bfsi-lab .zone::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:12px 12px 0 0;}
#bfsi-lab .zone:hover{transform:translateY(-4px);}
#bfsi-lab .zone.zt::before{background:linear-gradient(90deg,var(--t),transparent 80%);}
#bfsi-lab .zone.zt{background:linear-gradient(135deg,var(--tl),#fff 70%);}
#bfsi-lab .zone.zt:hover{border-color:var(--tb);box-shadow:0 16px 48px rgba(0,201,167,.14);}
#bfsi-lab .zone.zp::before{background:linear-gradient(90deg,var(--p),transparent 80%);}
#bfsi-lab .zone.zp{background:linear-gradient(135deg,var(--pl),#fff 70%);}
#bfsi-lab .zone.zp:hover{border-color:var(--pb);box-shadow:0 16px 48px rgba(107,63,160,.14);}
#bfsi-lab .zone.za::before{background:linear-gradient(90deg,var(--a),transparent 80%);}
#bfsi-lab .zone.za{background:linear-gradient(135deg,var(--al),#fff 70%);}
#bfsi-lab .zone.za:hover{border-color:var(--ab);box-shadow:0 16px 48px rgba(245,166,35,.12);}
#bfsi-lab .zone.zr::before{background:linear-gradient(90deg,var(--r),transparent 80%);}
#bfsi-lab .zone.zr{background:linear-gradient(135deg,var(--rl),#fff 70%);}
#bfsi-lab .zone.zr:hover{border-color:var(--rb);box-shadow:0 16px 48px rgba(232,66,106,.12);}
#bfsi-lab .zone.zg::before{background:linear-gradient(90deg,var(--g),transparent 80%);}
#bfsi-lab .zone.zg{background:linear-gradient(135deg,var(--gl),#fff 70%);}
#bfsi-lab .zone.zg:hover{border-color:var(--gb);box-shadow:0 16px 48px rgba(34,197,94,.12);}
#bfsi-lab .z-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
#bfsi-lab .z-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
#bfsi-lab .zone.zt .z-icon{background:var(--tl);border:1.5px solid var(--tb);}
#bfsi-lab .zone.zp .z-icon{background:var(--pl);border:1.5px solid var(--pb);}
#bfsi-lab .zone.za .z-icon{background:var(--al);border:1.5px solid var(--ab);}
#bfsi-lab .zone.zr .z-icon{background:var(--rl);border:1.5px solid var(--rb);}
#bfsi-lab .zone.zg .z-icon{background:var(--gl);border:1.5px solid var(--gb);}
#bfsi-lab .z-title{font-family:var(--fd);font-size:15px;font-weight:700;letter-spacing:-.2px;}
#bfsi-lab .zone.zt .z-title{color:var(--td);}
#bfsi-lab .zone.zp .z-title{color:var(--pd);}
#bfsi-lab .zone.za .z-title{color:var(--ad);}
#bfsi-lab .zone.zr .z-title{color:var(--r);}
#bfsi-lab .zone.zg .z-title{color:#15803D;}
#bfsi-lab .mcs{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px;}
#bfsi-lab .mc{background:#fff;border:1px solid var(--bdr);border-radius:8px;padding:9px 11px;transition:border-color .2s;}
#bfsi-lab .mc-n{font-size:12px;font-weight:600;color:var(--tx1);margin-bottom:2px;}
#bfsi-lab .mc-s{font-size:10.5px;color:var(--tx3);line-height:1.4;}
#bfsi-lab .zone.zt .mc:hover{border-color:var(--tb);}
#bfsi-lab .zone.zp .mc:hover{border-color:var(--pb);}
#bfsi-lab .zone.za .mc:hover{border-color:var(--ab);}
#bfsi-lab .zone.zr .mc:hover{border-color:var(--rb);}
#bfsi-lab .zone.zg .mc:hover{border-color:var(--gb);}
#bfsi-lab .z-bar{margin-top:8px;}
#bfsi-lab .z-bar-lbl{display:flex;justify-content:space-between;font-size:10px;color:var(--tx3);margin-bottom:4px;}
#bfsi-lab .z-bar-track{height:4px;background:var(--bdr);border-radius:2px;overflow:hidden;}
#bfsi-lab .z-bar-fill{height:100%;border-radius:2px;width:0;transition:width 1.6s ease;}
#bfsi-lab .zone.zt .z-bar-fill{background:linear-gradient(90deg,var(--td),var(--t));}
#bfsi-lab .zone.zp .z-bar-fill{background:linear-gradient(90deg,var(--pd),var(--p));}
#bfsi-lab .zone.za .z-bar-fill{background:linear-gradient(90deg,var(--ad),var(--a));}
#bfsi-lab .zone.zr .z-bar-fill{background:linear-gradient(90deg,#c0405a,var(--r));}
#bfsi-lab .zone.zg .z-bar-fill{background:linear-gradient(90deg,#15803D,var(--g));}
#bfsi-lab .z-note{font-family:var(--fm);font-size:9.5px;letter-spacing:.6px;border-top:1px solid var(--bdr);padding-top:9px;margin-top:2px;display:flex;align-items:center;gap:5px;}
#bfsi-lab .zone.zt .z-note{color:var(--td);}
#bfsi-lab .zone.zp .z-note{color:var(--pd);}
#bfsi-lab .zone.za .z-note{color:var(--ad);}
#bfsi-lab .zone.zr .z-note{color:var(--r);}
#bfsi-lab .zone.zg .z-note{color:#15803D;}
#bfsi-lab .z-note::before{content:'↗';font-size:11px;}
#bfsi-lab .accent-box{background:var(--bg1);border:1px solid var(--bdr);border-radius:8px;padding:8px 12px;font-size:11.5px;color:var(--tx2);text-align:center;margin-top:8px;}
#bfsi-lab .capstone{background:linear-gradient(135deg,var(--pl),var(--tl));border:2px solid var(--bdr);border-radius:var(--r16);padding:26px 24px;}
#bfsi-lab .cap-head{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
#bfsi-lab .cap-icon{width:40px;height:40px;border-radius:10px;background:var(--pl);border:1.5px solid var(--pb);display:flex;align-items:center;justify-content:center;font-size:19px;}
#bfsi-lab .cap-title{font-family:var(--fd);font-size:16px;font-weight:600;color:var(--pd);}
#bfsi-lab .cap-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;}
#bfsi-lab .cc{background:#fff;border:1px solid var(--bdr);border-radius:10px;padding:14px 12px;box-shadow:var(--sh1);transition:transform .2s;}
#bfsi-lab .cc:hover{transform:translateY(-2px);}
#bfsi-lab .cc-emoji{font-size:20px;margin-bottom:8px;}
#bfsi-lab .cc-t{font-size:12.5px;font-weight:700;margin-bottom:3px;}
#bfsi-lab .cc-s{font-size:11px;color:var(--tx3);line-height:1.4;}
#bfsi-lab .cap-foot{text-align:center;font-size:12.5px;color:var(--tx2);border-top:1px solid var(--bdr);padding-top:12px;}
#bfsi-lab .cap-foot strong{color:var(--pd);}
#bfsi-lab .infog-bar{background:linear-gradient(135deg,var(--navy),var(--nm));padding:52px 60px;}
#bfsi-lab .infog-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(255,255,255,.1);border-radius:var(--r16);overflow:hidden;max-width:1060px;margin:0 auto;}
#bfsi-lab .infog-cell{background:rgba(255,255,255,.04);padding:28px 20px;text-align:center;transition:background .2s;}
#bfsi-lab .infog-cell:hover{background:rgba(255,255,255,.09);}
#bfsi-lab .infog-num{font-family:var(--fd);font-size:46px;font-weight:800;line-height:1;margin-bottom:6px;letter-spacing:-.6px;}
#bfsi-lab .infog-num.ct{color:var(--t);}
#bfsi-lab .infog-num.cp{color:#b39dff;}
#bfsi-lab .infog-num.ca{color:var(--a);}
#bfsi-lab .infog-num.cr{color:#ff9ab5;}
#bfsi-lab .infog-num.cw{color:#fff;}
#bfsi-lab .infog-lbl{font-size:12px;color:rgba(255,255,255,.55);line-height:1.5;}
#bfsi-lab .infog-icon{font-size:22px;margin-bottom:10px;}
#bfsi-lab .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1100px;margin:0 auto;}
#bfsi-lab .why-card{background:#fff;border:1.5px solid var(--bdr);border-radius:var(--r12);padding:24px 20px;text-align:center;box-shadow:var(--sh1);transition:transform .3s,box-shadow .3s,border-color .3s;}
#bfsi-lab .why-card:hover{transform:translateY(-5px);box-shadow:var(--sh3);}
#bfsi-lab .why-card:nth-child(1):hover{border-color:var(--tb);}
#bfsi-lab .why-card:nth-child(2):hover{border-color:var(--pb);}
#bfsi-lab .why-card:nth-child(3):hover{border-color:var(--ab);}
#bfsi-lab .why-card:nth-child(4):hover{border-color:var(--tb);}
#bfsi-lab .why-card:nth-child(5):hover{border-color:var(--pb);}
#bfsi-lab .why-card:nth-child(6):hover{border-color:var(--ab);}
#bfsi-lab .why-card:nth-child(7):hover{border-color:var(--tb);}
#bfsi-lab .why-card:nth-child(8):hover{border-color:var(--pb);}
#bfsi-lab .why-card:nth-child(9):hover{border-color:var(--rb);}
#bfsi-lab .why-card:nth-child(10):hover{border-color:var(--tb);}
#bfsi-lab .why-icon-wrap{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 14px;}
#bfsi-lab .why-card:nth-child(odd) .why-icon-wrap{background:var(--tl);}
#bfsi-lab .why-card:nth-child(even) .why-icon-wrap{background:var(--pl);}
#bfsi-lab .why-title{font-family:var(--fd);font-size:14px;font-weight:600;color:var(--navy);margin-bottom:7px;letter-spacing:0px;}
#bfsi-lab .why-desc{font-size:12px;color:var(--tx3);line-height:1.65;}
#bfsi-lab .ben-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1100px;margin:0 auto;}
#bfsi-lab .bp{background:#fff;border:2px solid var(--bdr);border-radius:var(--r16);padding:36px 32px;box-shadow:var(--sh2);position:relative;overflow:hidden;}
#bfsi-lab .bp::after{content:'';position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;filter:blur(40px);pointer-events:none;}
#bfsi-lab .bp.stu::after{background:rgba(0,201,167,.1);}
#bfsi-lab .bp.col::after{background:rgba(107,63,160,.1);}
#bfsi-lab .bp-head{display:flex;align-items:center;gap:14px;margin-bottom:26px;padding-bottom:18px;border-bottom:2px solid var(--bdr);}
#bfsi-lab .bp-icon{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;}
#bfsi-lab .bp.stu .bp-icon{background:var(--tl);border:2px solid var(--tb);}
#bfsi-lab .bp.col .bp-icon{background:var(--pl);border:2px solid var(--pb);}
#bfsi-lab .bp-lbl{font-family:var(--fm);font-size:9px;letter-spacing:1.5px;margin-bottom:3px;}
#bfsi-lab .bp.stu .bp-lbl{color:var(--td);}
#bfsi-lab .bp.col .bp-lbl{color:var(--pd);}
#bfsi-lab .bp-title{font-family:var(--fd);font-size:24px;font-weight:700;color:var(--navy);letter-spacing:-.3px;}
#bfsi-lab .bp-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
#bfsi-lab .bp-list li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--tx2);line-height:1.55;}
#bfsi-lab .bp-list li::before{content:'✓';flex-shrink:0;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px;}
#bfsi-lab .bp.stu .bp-list li::before{background:var(--tl);color:var(--td);}
#bfsi-lab .bp.col .bp-list li::before{background:var(--pl);color:var(--pd);}
#bfsi-lab .bp-list li strong{color:var(--navy);font-weight:600;}
#bfsi-lab .pt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1060px;margin:40px auto 0;}
#bfsi-lab .pt{border-radius:var(--r16);padding:30px 26px;border:2px solid var(--bdr);transition:transform .3s;position:relative;background:#fff;box-shadow:var(--sh1);}
#bfsi-lab .pt:hover{transform:translateY(-6px);}
#bfsi-lab .pt.feat{border-color:var(--tb);box-shadow:var(--st);}
#bfsi-lab .pt.ent{border-color:var(--pb);box-shadow:var(--sp);}
#bfsi-lab .popular{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--t),var(--td));color:#fff;font-family:var(--fm);font-size:9px;font-weight:700;padding:5px 16px;border-radius:20px;letter-spacing:1px;white-space:nowrap;}
#bfsi-lab .pt-badge{font-family:var(--fm);font-size:9px;letter-spacing:2px;padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:14px;}
#bfsi-lab .pt.base .pt-badge{background:var(--bg1);color:var(--tx3);border:1px solid var(--bdr);}
#bfsi-lab .pt.feat .pt-badge{background:var(--tl);color:var(--td);border:1px solid var(--tb);}
#bfsi-lab .pt.ent .pt-badge{background:var(--pl);color:var(--pd);}
#bfsi-lab .pt-name{font-family:var(--fd);font-size:24px;font-weight:700;color:var(--navy);margin-bottom:5px;letter-spacing:-.2px;}
#bfsi-lab .pt-sub{font-size:12.5px;color:var(--tx3);margin-bottom:20px;line-height:1.5;}
#bfsi-lab .pt-feats{list-style:none;display:flex;flex-direction:column;gap:9px;}
#bfsi-lab .pt-feats li{font-size:12.5px;color:var(--tx2);display:flex;align-items:flex-start;gap:8px;line-height:1.45;}
#bfsi-lab .pt-feats li::before{content:'✓';font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;}
#bfsi-lab .pt.base .pt-feats li::before{color:var(--tx3);}
#bfsi-lab .pt.feat .pt-feats li::before{color:var(--t);}
#bfsi-lab .pt.ent .pt-feats li::before{color:var(--p);}
#bfsi-lab .signup-sec{background:linear-gradient(135deg,var(--navy) 0%,var(--nm) 60%,#1A2D60 100%);padding:80px 60px;text-align:center;position:relative;overflow:hidden;}
#bfsi-lab .signup-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,201,167,.1),transparent);pointer-events:none;}
#bfsi-lab .signup-sec h2{font-family:var(--fd);font-size:clamp(30px,4.2vw,54px);font-weight:800;letter-spacing:-.6px;color:#fff;margin-bottom:14px;}
#bfsi-lab .signup-sec p{color:rgba(255,255,255,.65);font-size:16px;max-width:520px;margin:0 auto 36px;}
#bfsi-lab .signup-form{display:flex;gap:10px;max-width:480px;margin:0 auto 28px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:6px 6px 6px 18px;}
#bfsi-lab .signup-form input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:14px;font-family:var(--fb);}
#bfsi-lab .signup-form input::placeholder{color:rgba(255,255,255,.45);}
#bfsi-lab .signup-form button{background:linear-gradient(135deg,var(--t),var(--td));color:#fff;border:none;font-weight:700;font-size:13px;padding:11px 22px;border-radius:9px;cursor:pointer;font-family:var(--fb);white-space:nowrap;transition:transform .2s;}
#bfsi-lab .signup-form button:hover{transform:scale(1.03);}
#bfsi-lab .signup-trust{display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;}
#bfsi-lab .signup-trust-item{display:flex;align-items:center;gap:7px;font-size:12.5px;color:rgba(255,255,255,.6);}
#bfsi-lab .signup-trust-item span{color:var(--t);font-weight:600;}
@keyframes fadeUp{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
#bfsi-lab .reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
#bfsi-lab .reveal.on{opacity:1;transform:translateY(0);}
#bfsi-lab .d1{transition-delay:.08s}
#bfsi-lab .d2{transition-delay:.16s}
#bfsi-lab .d3{transition-delay:.24s}
#bfsi-lab .d4{transition-delay:.32s}
#bfsi-lab .div{height:1px;background:linear-gradient(90deg,transparent,var(--bdr),transparent);margin:0 60px;}
#bfsi-lab .process-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:0;max-width:1060px;margin:0 auto;position:relative;}
#bfsi-lab .process-steps::before{content:'';position:absolute;top:32px;left:10%;right:10%;height:2px;background:linear-gradient(90deg,var(--t),var(--p),var(--a));border-radius:2px;z-index:0;}
#bfsi-lab .ps{text-align:center;position:relative;z-index:1;padding:0 10px;}
#bfsi-lab .ps-num{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:22px;font-weight:800;margin:0 auto 14px;border:3px solid #fff;box-shadow:var(--sh2);}
#bfsi-lab .ps:nth-child(1) .ps-num{background:linear-gradient(135deg,var(--t),var(--td));color:#fff;}
#bfsi-lab .ps:nth-child(2) .ps-num{background:linear-gradient(135deg,var(--p),var(--pd));color:#fff;}
#bfsi-lab .ps:nth-child(3) .ps-num{background:linear-gradient(135deg,var(--a),var(--ad));color:#fff;}
#bfsi-lab .ps:nth-child(4) .ps-num{background:linear-gradient(135deg,var(--r),#c0405a);color:#fff;}
#bfsi-lab .ps:nth-child(5) .ps-num{background:linear-gradient(135deg,var(--navy),var(--nm));color:#fff;}
#bfsi-lab .ps-title{font-family:var(--fd);font-size:13px;font-weight:700;color:var(--navy);margin-bottom:5px;}
#bfsi-lab .ps-desc{font-size:11.5px;color:var(--tx3);line-height:1.55;}
#bfsi-lab .coverage-sec{background:var(--bg1);}
#bfsi-lab .coverage-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1060px;margin:0 auto;}
#bfsi-lab .cov-list{display:flex;flex-direction:column;gap:14px;}
#bfsi-lab .cov-item{display:flex;align-items:center;gap:14px;}
#bfsi-lab .cov-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0;}
#bfsi-lab .cov-label{font-size:13.5px;color:var(--tx1);font-weight:500;flex:1;}
#bfsi-lab .cov-pct{font-family:var(--fm);font-size:12px;color:var(--tx3);}
#bfsi-lab .cov-bar-wrap{flex:2;}
#bfsi-lab .cov-bar-track{height:6px;background:var(--bdr);border-radius:3px;overflow:hidden;}
#bfsi-lab .cov-bar-fill{height:100%;border-radius:3px;width:0;transition:width 1.8s ease;}
#bfsi-lab .manifesto{background:linear-gradient(135deg,#07112E 0%,#0D1E4A 55%,#1A2D60 100%);padding:80px 60px;position:relative;overflow:hidden;}
#bfsi-lab .manifesto::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,201,167,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,.04) 1px,transparent 1px);background-size:52px 52px;pointer-events:none;}
#bfsi-lab .manifesto-orb1{position:absolute;width:480px;height:480px;border-radius:50%;background:rgba(0,201,167,.09);filter:blur(90px);top:-120px;right:-80px;pointer-events:none;}
#bfsi-lab .manifesto-orb2{position:absolute;width:360px;height:360px;border-radius:50%;background:rgba(107,63,160,.09);filter:blur(80px);bottom:-60px;left:-60px;pointer-events:none;}
#bfsi-lab .manifesto-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1;}
#bfsi-lab .manifesto-eyebrow{font-family:var(--fm);font-size:10px;color:var(--t);letter-spacing:3px;text-transform:uppercase;margin-bottom:18px;}
#bfsi-lab .manifesto-headline{font-family:var(--fd);font-size:clamp(38px,4.8vw,65px);font-weight:800;line-height:1.06;letter-spacing:-.9px;color:#fff;margin-bottom:14px;}
#bfsi-lab .manifesto-headline .ht{color:var(--t);}
#bfsi-lab .manifesto-headline .hp{color:#b39dff;}
#bfsi-lab .manifesto-headline .ha{color:var(--a);}
#bfsi-lab .manifesto-tagline{font-size:16px;color:rgba(255,255,255,.6);max-width:640px;line-height:1.7;margin-bottom:52px;}
#bfsi-lab .manifesto-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:52px;}
#bfsi-lab .mf-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:26px 22px 24px;transition:transform .3s,background .3s,border-color .3s;position:relative;overflow:hidden;}
#bfsi-lab .mf-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;border-radius:16px 16px 0 0;}
#bfsi-lab .mf-card:hover{transform:translateY(-5px);background:rgba(255,255,255,.09);}
#bfsi-lab .mf-card.ct::before{background:linear-gradient(90deg,var(--t),transparent 75%);}
#bfsi-lab .mf-card.ct:hover{border-color:rgba(0,201,167,.3);}
#bfsi-lab .mf-card.cp::before{background:linear-gradient(90deg,#b39dff,transparent 75%);}
#bfsi-lab .mf-card.cp:hover{border-color:rgba(107,63,160,.3);}
#bfsi-lab .mf-card.ca::before{background:linear-gradient(90deg,var(--a),transparent 75%);}
#bfsi-lab .mf-card.ca:hover{border-color:rgba(245,166,35,.3);}
#bfsi-lab .mf-card.cr::before{background:linear-gradient(90deg,var(--r),transparent 75%);}
#bfsi-lab .mf-card.cr:hover{border-color:rgba(232,66,106,.3);}
#bfsi-lab .mf-card.cg::before{background:linear-gradient(90deg,#4ade80,transparent 75%);}
#bfsi-lab .mf-card.cg:hover{border-color:rgba(34,197,94,.3);}
#bfsi-lab .mf-icon{font-size:28px;margin-bottom:14px;}
#bfsi-lab .mf-area{font-family:var(--fm);font-size:9.5px;letter-spacing:1.5px;margin-bottom:7px;text-transform:uppercase;}
#bfsi-lab .mf-card.ct .mf-area{color:var(--t);}
#bfsi-lab .mf-card.cp .mf-area{color:#b39dff;}
#bfsi-lab .mf-card.ca .mf-area{color:var(--a);}
#bfsi-lab .mf-card.cr .mf-area{color:#ff9ab5;}
#bfsi-lab .mf-card.cg .mf-area{color:#4ade80;}
#bfsi-lab .mf-catchy{font-family:var(--fd);font-size:18px;font-weight:700;color:#fff;line-height:1.2;letter-spacing:-.3px;margin-bottom:10px;}
#bfsi-lab .mf-desc{font-size:12px;color:rgba(255,255,255,.55);line-height:1.65;}
#bfsi-lab .mf-tools{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px;}
#bfsi-lab .mf-tool{font-size:9.5px;font-weight:600;padding:3px 9px;border-radius:12px;}
#bfsi-lab .mf-card.ct .mf-tool{background:rgba(0,201,167,.15);color:var(--t);}
#bfsi-lab .mf-card.cp .mf-tool{background:rgba(107,63,160,.18);color:#b39dff;}
#bfsi-lab .mf-card.ca .mf-tool{background:rgba(245,166,35,.15);color:var(--a);}
#bfsi-lab .mf-card.cr .mf-tool{background:rgba(232,66,106,.15);color:#ff9ab5;}
#bfsi-lab .mf-card.cg .mf-tool{background:rgba(34,197,94,.15);color:#4ade80;}
#bfsi-lab .manifesto-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:40px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
#bfsi-lab .mb-quote{padding:20px 22px;background:rgba(255,255,255,.04);border-radius:12px;border-left:3px solid;}
#bfsi-lab .mb-quote.ct{border-color:var(--t);}
#bfsi-lab .mb-quote.cp{border-color:#b39dff;}
#bfsi-lab .mb-quote.ca{border-color:var(--a);}
#bfsi-lab .mb-q{font-family:var(--fd);font-size:15px;font-weight:700;color:#fff;line-height:1.4;margin-bottom:7px;}
#bfsi-lab .mb-attr{font-size:11px;color:rgba(255,255,255,.45);}
#bfsi-lab .tool-wall{background:var(--bg1);padding:56px 60px;}
#bfsi-lab .tool-wall-inner{max-width:1100px;margin:0 auto;}
#bfsi-lab .tw-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;}
#bfsi-lab .tw-card{background:#fff;border:1.5px solid var(--bdr);border-radius:12px;padding:16px 14px;text-align:center;box-shadow:var(--sh1);transition:transform .3s,border-color .3s,box-shadow .3s;}
#bfsi-lab .tw-card:hover{transform:translateY(-4px);}
#bfsi-lab .tw-icon{font-size:26px;margin-bottom:8px;}
#bfsi-lab .tw-name{font-family:var(--fd);font-size:12px;font-weight:700;color:var(--navy);margin-bottom:3px;}
#bfsi-lab .tw-cat{font-size:10px;color:var(--tx3);}
#bfsi-lab .tw-new{font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;display:inline-block;margin-top:5px;}
#bfsi-lab .fa-section{padding:80px 56px;background:linear-gradient(135deg,#07112E 0%,#0D1E4A 60%,#1A2D60 100%);position:relative;overflow:hidden;}
#bfsi-lab .fa-section::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,201,167,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,.045) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
#bfsi-lab .fa-eyebrow{font-family:var(--fm);font-size:10px;color:var(--t);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;}
#bfsi-lab .fa-title{font-family:var(--fd);font-size:clamp(30px,4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.5px;color:#fff;margin-bottom:16px;}
#bfsi-lab .fa-title .ht{color:var(--t);}
#bfsi-lab .fa-subtitle{font-size:16px;color:rgba(255,255,255,.6);max-width:680px;line-height:1.7;margin-bottom:52px;}
#bfsi-lab .fa-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1100px;margin:0 auto;}
#bfsi-lab .fa-card{border-radius:18px;padding:28px 24px 24px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);backdrop-filter:blur(10px);transition:transform .3s,border-color .3s,box-shadow .3s;cursor:default;position:relative;overflow:hidden;}
#bfsi-lab .fa-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;border-radius:18px 18px 0 0;}
#bfsi-lab .fa-card:hover{transform:translateY(-5px);}
#bfsi-lab .fa-card.c1::before{background:linear-gradient(90deg,var(--t),transparent 70%);}
#bfsi-lab .fa-card.c1:hover{border-color:rgba(0,201,167,.3);box-shadow:0 20px 60px rgba(0,201,167,.12);}
#bfsi-lab .fa-card.c2::before{background:linear-gradient(90deg,var(--p),transparent 70%);}
#bfsi-lab .fa-card.c2:hover{border-color:rgba(107,63,160,.3);box-shadow:0 20px 60px rgba(107,63,160,.12);}
#bfsi-lab .fa-card.c3::before{background:linear-gradient(90deg,var(--a),transparent 70%);}
#bfsi-lab .fa-card.c3:hover{border-color:rgba(245,166,35,.3);box-shadow:0 20px 60px rgba(245,166,35,.10);}
#bfsi-lab .fa-card.c4::before{background:linear-gradient(90deg,var(--r),transparent 70%);}
#bfsi-lab .fa-card.c4:hover{border-color:rgba(232,66,106,.3);box-shadow:0 20px 60px rgba(232,66,106,.10);}
#bfsi-lab .fa-card.c5::before{background:linear-gradient(90deg,#22C55E,transparent 70%);}
#bfsi-lab .fa-card.c5:hover{border-color:rgba(34,197,94,.3);box-shadow:0 20px 60px rgba(34,197,94,.10);}
#bfsi-lab .fa-card.c6::before{background:linear-gradient(90deg,#06B6D4,transparent 70%);}
#bfsi-lab .fa-card.c6:hover{border-color:rgba(6,182,212,.3);box-shadow:0 20px 60px rgba(6,182,212,.10);}
#bfsi-lab .fa-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px;}
#bfsi-lab .fa-card.c1 .fa-icon{background:rgba(0,201,167,.15);border:1px solid rgba(0,201,167,.25);}
#bfsi-lab .fa-card.c2 .fa-icon{background:rgba(107,63,160,.15);border:1px solid rgba(107,63,160,.25);}
#bfsi-lab .fa-card.c3 .fa-icon{background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.25);}
#bfsi-lab .fa-card.c4 .fa-icon{background:rgba(232,66,106,.15);border:1px solid rgba(232,66,106,.25);}
#bfsi-lab .fa-card.c5 .fa-icon{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.22);}
#bfsi-lab .fa-card.c6 .fa-icon{background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.22);}
#bfsi-lab .fa-tagline{font-family:var(--fm);font-size:9.5px;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:8px;}
#bfsi-lab .fa-card.c1 .fa-tagline{color:var(--t);}
#bfsi-lab .fa-card.c2 .fa-tagline{color:#b39dff;}
#bfsi-lab .fa-card.c3 .fa-tagline{color:var(--a);}
#bfsi-lab .fa-card.c4 .fa-tagline{color:var(--r);}
#bfsi-lab .fa-card.c5 .fa-tagline{color:#4ade80;}
#bfsi-lab .fa-card.c6 .fa-tagline{color:#22d3ee;}
#bfsi-lab .fa-name{font-family:var(--fd);font-size:19px;font-weight:700;color:#fff;letter-spacing:-.3px;margin-bottom:8px;}
#bfsi-lab .fa-catch{font-size:13px;font-weight:600;color:rgba(255,255,255,.85);margin-bottom:8px;font-style:italic;line-height:1.4;}
#bfsi-lab .fa-desc{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.65;margin-bottom:14px;}
#bfsi-lab .fa-tools{display:flex;flex-wrap:wrap;gap:6px;}
#bfsi-lab .fa-tool{font-size:10px;font-weight:600;padding:3px 10px;border-radius:14px;}
#bfsi-lab .fa-card.c1 .fa-tool{background:rgba(0,201,167,.15);color:var(--t);border:1px solid rgba(0,201,167,.2);}
#bfsi-lab .fa-card.c2 .fa-tool{background:rgba(107,63,160,.15);color:#b39dff;border:1px solid rgba(107,63,160,.2);}
#bfsi-lab .fa-card.c3 .fa-tool{background:rgba(245,166,35,.15);color:var(--a);border:1px solid rgba(245,166,35,.2);}
#bfsi-lab .fa-card.c4 .fa-tool{background:rgba(232,66,106,.15);color:var(--r);border:1px solid rgba(232,66,106,.2);}
#bfsi-lab .fa-card.c5 .fa-tool{background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.18);}
#bfsi-lab .fa-card.c6 .fa-tool{background:rgba(6,182,212,.12);color:#22d3ee;border:1px solid rgba(6,182,212,.18);}
#bfsi-lab .marquee-strip{background:var(--t);padding:11px 0;overflow:hidden;white-space:nowrap;}
#bfsi-lab .marquee-inner{display:inline-block;animation:marquee 28s linear infinite;}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
#bfsi-lab .marquee-item{display:inline-flex;align-items:center;gap:8px;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--navy);padding:0 28px;letter-spacing:.5px;}
#bfsi-lab .marquee-dot{width:5px;height:5px;border-radius:50%;background:var(--navy);opacity:.4;flex-shrink:0;}
#bfsi-lab .perimeter-wrap{max-width:1100px;margin:0 auto;border-radius:20px;overflow:hidden;border:1px solid var(--bdr);box-shadow:0 24px 80px rgba(7,17,46,.13);}
#bfsi-lab .perimeter-header{background:var(--navy);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
#bfsi-lab .ph-title{font-family:var(--fd);font-weight:700;font-size:14px;color:#fff;}
#bfsi-lab .ph-sub{font-size:10px;color:rgba(0,201,167,.7);margin-top:2px;}
#bfsi-lab .naac-sec{padding:72px 60px;background:#fff;}
#bfsi-lab .naac-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#07112E,#0D1E4A);color:#fff;font-family:var(--fm);font-size:9px;letter-spacing:1.5px;padding:6px 16px;border-radius:20px;margin-bottom:18px;}
#bfsi-lab .naac-badge span{background:var(--t);color:var(--navy);font-weight:700;padding:2px 8px;border-radius:10px;font-size:9px;}
#bfsi-lab .naac-intro{font-size:14px;color:var(--tx2);max-width:760px;line-height:1.7;margin-bottom:40px;}
#bfsi-lab .naac-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:40px;}
#bfsi-lab .naac-card{border-radius:14px;padding:22px 20px;border:1.5px solid var(--bdr);background:var(--bg1);transition:transform .25s,box-shadow .25s;}
#bfsi-lab .naac-card:hover{transform:translateY(-4px);box-shadow:var(--sh3);}
#bfsi-lab .naac-card-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;}
#bfsi-lab .naac-crit{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:10px;font-weight:700;flex-shrink:0;}
#bfsi-lab .naac-crit.c2{background:var(--tl);color:var(--td);border:1px solid var(--tb);}
#bfsi-lab .naac-crit.c3{background:var(--pl);color:var(--pd);border:1px solid var(--pb);}
#bfsi-lab .naac-crit.c5{background:var(--al);color:var(--ad);border:1px solid var(--ab);}
#bfsi-lab .naac-crit.c6{background:var(--rl);color:var(--r);border:1px solid var(--rb);}
#bfsi-lab .naac-crit.c7{background:var(--gl);color:#15803D;border:1px solid var(--gb);}
#bfsi-lab .naac-crit.cx{background:var(--bg2);color:var(--tx2);border:1px solid var(--bdr);}
#bfsi-lab .naac-card-title{font-family:var(--fd);font-size:13.5px;font-weight:700;color:var(--navy);margin-bottom:3px;}
#bfsi-lab .naac-card-sub{font-size:10.5px;color:var(--tx3);}
#bfsi-lab .naac-evidence{display:flex;flex-direction:column;gap:6px;}
#bfsi-lab .naac-ev{display:flex;align-items:flex-start;gap:7px;font-size:11.5px;color:var(--tx2);line-height:1.5;}
#bfsi-lab .naac-ev::before{content:"✓";color:var(--t);font-weight:700;font-size:11px;flex-shrink:0;margin-top:1px;}
#bfsi-lab .naac-artefacts{background:linear-gradient(135deg,#07112E,#0D1E4A);border-radius:16px;padding:28px 32px;margin-bottom:32px;}
#bfsi-lab .naac-art-title{font-family:var(--fd);font-size:16px;font-weight:700;color:#fff;margin-bottom:6px;}
#bfsi-lab .naac-art-sub{font-size:13px;color:rgba(255,255,255,.6);margin-bottom:20px;}
#bfsi-lab .naac-art-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
#bfsi-lab .naac-art-item{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px;}
#bfsi-lab .naac-art-icon{font-size:20px;margin-bottom:8px;}
#bfsi-lab .naac-art-name{font-size:11.5px;font-weight:700;color:#fff;margin-bottom:4px;}
#bfsi-lab .naac-art-desc{font-size:10.5px;color:rgba(255,255,255,.5);line-height:1.55;}
#bfsi-lab .naac-metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
#bfsi-lab .naac-metric{background:var(--bg1);border:1.5px solid var(--bdr);border-radius:12px;padding:16px 14px;text-align:center;}
#bfsi-lab .naac-met-n{font-family:var(--fd);font-size:24px;font-weight:800;color:var(--navy);margin-bottom:4px;}
#bfsi-lab .naac-met-n.ct{color:var(--td);}
#bfsi-lab .naac-met-n.cp{color:var(--pd);}
#bfsi-lab .naac-met-n.ca{color:var(--ad);}
#bfsi-lab .naac-met-n.cr{color:var(--r);}
#bfsi-lab .naac-met-n.cg{color:#15803D;}
#bfsi-lab .naac-met-l{font-size:10.5px;color:var(--tx3);line-height:1.45;}
      `}</style>

      <section id="bfsi-lab">

        {/* ── ANNOUNCEMENT BAR ── */}
        <div className="ann-bar">
          <span className="ann-badge">🏆 INDIA'S FIRST</span>
          <span>FinTech &amp; AI Innovation Lab — 500+ Years Expertise · Open Banking · Blockchain · WealthTech · Trading · InsurTech · AI</span>
        </div>

                

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-orb t"></div>
          <div className="hero-orb p"></div>
          <div className="hero-inner">
            <div>
              <div className="hero-badge">India's First FinTech &amp; AI Innovation Lab</div>
              <h1 className="hero-h1">
                Where <span className="ht">FinTech &amp; AI</span><br/>
                Leaders Are<br/>
                <span className="ha">Forged.</span>
              </h1>
              <p className="hero-sub">India's first <strong style={{color:"var(--t)"}}>FinTech &amp; AI Innovation Lab</strong> — a perimeter peer-working war room inside your campus. 6 live focus zones. 12 real tools. Risk simulators, ESG labs, M&amp;A war rooms, AI builders, Agile standups, and Capital Markets desks — all firing at once. 20 students <em>doing</em>, not sitting.</p>
              <div className="hero-tags">
                <span className="hero-tag ht-g">🏦 Fintech &amp; Banking</span>
                <span className="hero-tag ht-g">🤖 AI &amp; GenAI</span>
                <span className="hero-tag ht-g">⚡ Agile Sprints</span>
                <span className="hero-tag ht-g">🔗 Open Banking</span>
                <span className="hero-tag">💎 WealthTech</span>
                <span className="hero-tag">⚖️ RegTech &amp; ESG</span>
                <span className="hero-tag">📊 Capital Markets</span>
                <span className="hero-tag">🏛️ Core Banking</span>
              </div>
              <div className="hero-btns">
                <Link to="/contact" className="btn-primary">Set Up the Lab at Your College →</Link>
                <a href="#framework" className="btn-outline">Explore All Zones</a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-stats-grid">
                <div className="hstat"><div className="hstat-n ct" data-target="9">9</div><div className="hstat-l">Lab Zones</div></div>
                <div className="hstat"><div className="hstat-n cp" data-target="36">36</div><div className="hstat-l">Active Modules</div></div>
                <div className="hstat"><div className="hstat-n ca" data-target="20">20</div><div className="hstat-l">Seats Per Lab</div></div>
                <div className="hstat"><div className="hstat-n cw">500+</div><div className="hstat-l">Years Collective FinTech Experience</div></div>
              </div>
              <div className="hero-first-badge">
                <div className="hero-first-icon">🏆</div>
                <div className="hero-first-text">
                  <strong>First of Its Kind in India</strong>
                  The only EdTech offering a dedicated FinTech &amp; AI Innovation Lab — perimeter peer model, 6 live technology zones, 500+ years collective experience, and mentoring by CROs, CDOs &amp; CPOs from leading banks &amp; fintechs.
                </div>
              </div>
              <div className="hero-first-badge" style={{background:"linear-gradient(135deg,rgba(107,63,160,.12),rgba(0,201,167,.1))"}}>
                <div className="hero-first-icon">🎓</div>
                <div className="hero-first-text">
                  <strong>For MBA / BBA / PGDM / BBA Banking Students</strong>
                  Practical skills, live certifications, and real BFSI tools — all while you study. Graduate job-ready, not job-hopeful.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ANNOUNCEMENT STRIP ── */}
        <div className="strip">
          <div className="strip-icon">🚀</div>
          <div className="strip-text">
            <strong>India's First FinTech &amp; AI Innovation Lab — Peer-Working · 6 Live Technology Zones · Robo Advisory · Blockchain · WealthTech · Open Banking · 500+ Years of Collective Expertise</strong>
            <div className="strip-dots">
              {["⚡ Agile Standup Zone","🔗 Open Banking APIs","⛓️ Blockchain & Stablecoins","🏦 Fintech & Banking","🤖 AI & GenAI","⚖️ RegTech & ESG","📊 Capital Markets","🏛️ Core Banking","🛡️ InsurTech","👥 Peer Working"].map(d=>(
                <span className="strip-dot" key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── INFOGRAPHIC STATS BAR ── */}
        <div className="infog-bar" id="stats">
          <div className="infog-grid">
            <div className="infog-cell reveal"><div className="infog-icon">🏦</div><div className="infog-num ct" data-target="9">9</div><div className="infog-lbl">Dedicated<br/>Lab Zones</div></div>
            <div className="infog-cell reveal d1"><div className="infog-icon">📚</div><div className="infog-num cp" data-target="36">36</div><div className="infog-lbl">Live Industry<br/>Modules</div></div>
            <div className="infog-cell reveal d2"><div className="infog-icon">🎓</div><div className="infog-num ca" data-target="5">5</div><div className="infog-lbl">Certification<br/>Tracks</div></div>
            <div className="infog-cell reveal d3"><div className="infog-icon">🏆</div><div className="infog-num cr">#1</div><div className="infog-lbl">First Lab of<br/>Its Kind in India</div></div>
            <div className="infog-cell reveal d4"><div className="infog-icon">💼</div><div className="infog-num cw">500+</div><div className="infog-lbl">Years Collective<br/>FinTech Experience</div></div>
          </div>
        </div>

        {/* ── MANIFESTO: 8 FOCUS AREAS ── */}
        <section className="manifesto">
          <div className="manifesto-orb1"></div>
          <div className="manifesto-orb2"></div>
          <div className="manifesto-inner">
            <div className="manifesto-eyebrow">What We Stand For</div>
            <h2 className="manifesto-headline">
              This Isn't a Classroom.<br/>
              <span className="ht">This is Your</span> <span className="ha">Launchpad.</span>
            </h2>
            <p className="manifesto-tagline">Eight thriving technology domains. One war room. Zero boredom. Learning isn't a module here — it's a passion that never stops.</p>
            <div className="manifesto-grid">
              <div className="mf-card ct reveal">
                <div className="mf-icon">🔗</div>
                <div className="mf-area">Open Banking &amp; Payments</div>
                <div className="mf-catchy">Move Money.<br/>Move Markets.<br/>Move Careers.</div>
                <div className="mf-desc">UPI rails, OCEN protocols, Account Aggregator consent flows, PSD2 APIs, NACH automation, and BNPL architecture. Payment technology isn't just a feature — it's the new infrastructure of civilization. Build on it.</div>
                <div className="mf-tools"><span className="mf-tool">UPI / NACH Sandbox</span><span className="mf-tool">AA Framework</span><span className="mf-tool">OCEN</span></div>
              </div>
              <div className="mf-card cp reveal d1">
                <div className="mf-icon">🤖</div>
                <div className="mf-area">AI &amp; Robo Advisory</div>
                <div className="mf-catchy">Algorithms That<br/>Advise Better Than<br/>Gut Feel.</div>
                <div className="mf-desc">Build robo-advisory engines from scratch. Portfolio optimisation, goal-based investing, automated rebalancing, and explainable AI for SEBI-regulated recommendations. RiskGPT as your co-pilot.</div>
                <div className="mf-tools"><span className="mf-tool">RiskGPT</span><span className="mf-tool">Robo Engine</span><span className="mf-tool">Portfolio AI</span></div>
              </div>
              <div className="mf-card ca reveal d2">
                <div className="mf-icon">💎</div>
                <div className="mf-area">WealthTech &amp; Lending</div>
                <div className="mf-catchy">Lend Smarter.<br/>Grow Wealth Faster.</div>
                <div className="mf-desc">Digital lending origination, bureau integration, dynamic credit pricing, PMS, AIF structures, and embedded wealth products. WealthTech is the fastest-growing segment in Indian fintech — build it.</div>
                <div className="mf-tools"><span className="mf-tool">Digital Lending</span><span className="mf-tool">PMS / AIF</span><span className="mf-tool">Credit Engine</span></div>
              </div>
              <div className="mf-card cr reveal d3">
                <div className="mf-icon">⛓️</div>
                <div className="mf-area">Blockchain &amp; Stablecoins</div>
                <div className="mf-catchy">Decentralise It.<br/>Tokenise Everything.<br/>Then Regulate It.</div>
                <div className="mf-desc">Smart contract architecture, CBDC frameworks, stablecoin economics, DeFi risk models, and RBI sandbox compliance. Blockchain isn't hype — it's the plumbing of the next financial system.</div>
                <div className="mf-tools"><span className="mf-tool">CBDC Simulation</span><span className="mf-tool">Smart Contracts</span><span className="mf-tool">DeFi Risk</span></div>
              </div>
              <div className="mf-card cg reveal">
                <div className="mf-icon">⚖️</div>
                <div className="mf-area">Risk, RegTech &amp; Reg Reporting</div>
                <div className="mf-catchy">Know the Rules.<br/>Break the Barriers.<br/>Build the Future.</div>
                <div className="mf-desc">Regulatory reporting innovations — XBRL, RBI returns, automated BRSR, AML surveillance AI. Basel IV capital models. Insurance loss modelling with ML. DPDPA data privacy workflows.</div>
                <div className="mf-tools"><span className="mf-tool">RegTech AI</span><span className="mf-tool">Basel IV</span><span className="mf-tool">Loss Modelling</span></div>
              </div>
              <div className="mf-card ct reveal d1">
                <div className="mf-icon">🌿</div>
                <div className="mf-area">ESG &amp; Sustainability Finance</div>
                <div className="mf-catchy">The Planet Is<br/>a Balance Sheet.<br/>Learn to Read It.</div>
                <div className="mf-desc">Scope 1–3 emissions mapping, Cradle-to-Cradle circular finance, BRSR/TCFD disclosures, PPP green infrastructure, and green bond structuring. ESG isn't a checkbox — it's a trillion-rupee opportunity.</div>
                <div className="mf-tools"><span className="mf-tool">Scope 1–3</span><span className="mf-tool">BRSR / TCFD</span><span className="mf-tool">PPP Structures</span></div>
              </div>
              <div className="mf-card cp reveal d2">
                <div className="mf-icon">📈</div>
                <div className="mf-area">Capital Markets &amp; Trading Apps</div>
                <div className="mf-catchy">Price It. Trade It.<br/>Build the App That<br/>Trades It for You.</div>
                <div className="mf-desc">Fixed income pricing, IRS and swap simulations, algorithmic trading app architecture, SEBI-regulated trading platforms, and M&amp;A deal simulator from LOI to close. Bloomberg BMC live.</div>
                <div className="mf-tools"><span className="mf-tool">Trading App Sim</span><span className="mf-tool">M&amp;A Simulator</span><span className="mf-tool">Bloomberg BMC</span></div>
              </div>
              <div className="mf-card ca reveal d3">
                <div className="mf-icon">🛡️</div>
                <div className="mf-area">InsurTech &amp; Loss Modelling</div>
                <div className="mf-catchy">Predict the Loss.<br/>Price the Risk.<br/>Protect Everything.</div>
                <div className="mf-desc">Insurance loss modelling with ML, IRDAI sandbox for embedded insurance, automated claims underwriting, bancassurance architecture, and catastrophe risk simulation.</div>
                <div className="mf-tools"><span className="mf-tool">Loss Modelling ML</span><span className="mf-tool">IRDAI Sandbox</span><span className="mf-tool">Claims AI</span></div>
              </div>
            </div>
            <div className="manifesto-bottom">
              <div className="mb-quote ct">
                <div className="mb-q">"Learning is a passion — not a task. Every student who walks into this lab leaves with a fire that no job description can contain."</div>
                <div className="mb-attr">— Upskillize, Excel Beyond</div>
              </div>
              <div className="mb-quote cp">
                <div className="mb-q">"We built India's first FinTech &amp; AI Innovation Lab with 500+ years of collective experience from CROs, CDOs, CPOs, and practitioners who've lived every market cycle."</div>
                <div className="mb-attr">— Upskillize Faculty &amp; Mentor Network</div>
              </div>
              <div className="mb-quote ca">
                <div className="mb-q">"Open banking, stablecoins, robo-advisory, loss modelling, trading apps — your student will graduate knowing domains that most working professionals haven't even started learning."</div>
                <div className="mb-attr">— Upskillize, Lab Design Philosophy</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOL WALL ── */}
        <div className="tool-wall">
          <div className="tool-wall-inner">
            <div className="sc reveal" style={{marginBottom:"36px"}}>
              <div className="sec-label">12 Live Tools Activated</div>
              <h2 className="sec-title">The <span className="ht">Real Tools.</span> 12 Live Technology Domains.</h2>
              <p className="sec-sub">Every platform in the FinTech &amp; AI Innovation Lab is live and industry-grade — covering payment rails, robo-advisory, blockchain, trading, loss modelling, and core banking. Not textbook screenshots. Never.</p>
            </div>
            <div className="tw-grid reveal">
              {[
                {icon:"🔗",name:"Open Banking / UPI",cat:"Payment rails · AA · OCEN",tag:"Payment Tech",tagStyle:{background:"var(--tl)",color:"var(--td)"},border:"var(--tb)"},
                {icon:"🤖",name:"Robo Advisory Engine",cat:"Portfolio AI · goal-based",tag:"WealthTech",tagStyle:{background:"var(--pl)",color:"var(--pd)"},border:"rgba(107,63,160,.3)"},
                {icon:"💎",name:"Digital Lending Suite",cat:"Origination · bureau · pricing",tag:"LendingTech",tagStyle:{background:"var(--al)",color:"var(--ad)"},border:"rgba(245,166,35,.3)"},
                {icon:"⛓️",name:"Blockchain / CBDC",cat:"Smart contracts · stablecoins",tag:"Web3 Finance",tagStyle:{background:"var(--rl)",color:"var(--r)"},border:"rgba(232,66,106,.3)"},
                {icon:"📈",name:"Trading App Simulator",cat:"Algo trading · SEBI platform",tag:"Capital Markets",tagStyle:{background:"var(--al)",color:"var(--ad)"},border:"rgba(245,166,35,.35)"},
                {icon:"🧠",name:"RiskGPT",cat:"Upskillize AI · risk narration",tag:"Generative AI",tagStyle:{background:"var(--rl)",color:"var(--r)"},border:"rgba(232,66,106,.3)"},
                {icon:"🏛",name:"Oracle FLEXCUBE",cat:"Core banking simulation",tag:"Core Banking",tagStyle:{background:"#DBEAFE",color:"#1D4ED8"},border:"rgba(29,78,216,.3)"},
                {icon:"🌿",name:"ESG / Reg Reporting AI",cat:"Scope 1–3 · BRSR · XBRL",tag:"RegTech",tagStyle:{background:"var(--gl)",color:"#15803D"},border:"rgba(34,197,94,.3)"},
                {icon:"🛡️",name:"Insurance Loss Modelling",cat:"ML · IRDAI sandbox · claims AI",tag:"InsurTech",tagStyle:{background:"var(--pl)",color:"var(--pd)"},border:"rgba(107,63,160,.3)"},
                {icon:"🤝",name:"M&A Simulator",cat:"DCF · synergy · deal structure",tag:"Corporate Finance",tagStyle:{background:"var(--al)",color:"var(--ad)"},border:"rgba(245,166,35,.3)"},
                {icon:"🏦",name:"SAP Banking Core",cat:"Treasury · ALM · FTP",tag:"ERP",tagStyle:{background:"var(--tl)",color:"var(--td)"},border:"rgba(0,201,167,.28)"},
                {icon:"⚡",name:"Agile Sprint Board",cat:"SAFe · PI planning · Kanban",tag:"Agile",tagStyle:{background:"var(--al)",color:"var(--ad)"},border:"rgba(245,166,35,.28)"},
              ].map(t=>(
                <div className="tw-card" key={t.name} style={{borderColor:t.border}}>
                  <div className="tw-icon">{t.icon}</div>
                  <div className="tw-name">{t.name}</div>
                  <div className="tw-cat">{t.cat}</div>
                  <span className="tw-new" style={t.tagStyle}>{t.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3D LAB VISUAL (PERIMETER FLOOR PLAN) ── */}
        <section className="sec" style={{paddingBottom:"0"}}>
          <div className="sc">
            <div className="sec-label">The Physical Lab — Designer's Eye View</div>
            <h2 className="sec-title">Not a Lab. A <span className="ht">FinTech War Room.</span></h2>
            <p className="sec-sub">10 perimeter dual-monitor stations ring all 4 walls. 2 students per station — shoulder to shoulder, like analysts on a trading floor. The open centre explodes with 6 live technology zones. <strong>Zero rows. Zero passive. Zero ordinary.</strong></p>
          </div>
          <div className="lab3d-wrap reveal" style={{borderRadius:"0",borderLeft:"none",borderRight:"none"}}>
    <svg width="100%" viewBox="0 0 1400 820" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
      <defs>
        <linearGradient id="lnavyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0D1E4A"/><stop offset="100%" stopColor="#07112E"/></linearGradient>
        <linearGradient id="lroomDk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#09173A"/><stop offset="100%" stopColor="#060F22"/></linearGradient>
        <linearGradient id="lfloorIso" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0D1E44"/><stop offset="100%" stopColor="#07112E"/></linearGradient>
        <linearGradient id="ldeskNav" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1A2D60"/><stop offset="100%" stopColor="#0E1A44"/></linearGradient>
        <linearGradient id="lscT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C9A7" stopOpacity=".55"/><stop offset="100%" stopColor="#00C9A7" stopOpacity=".03"/></linearGradient>
        <linearGradient id="lscP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6B3FA0" stopOpacity=".5"/><stop offset="100%" stopColor="#6B3FA0" stopOpacity=".03"/></linearGradient>
        <linearGradient id="lscA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5A623" stopOpacity=".45"/><stop offset="100%" stopColor="#F5A623" stopOpacity=".03"/></linearGradient>
        <radialGradient id="lcentG" cx="50%" cy="50%" r="45%"><stop offset="0%" stopColor="#00C9A7" stopOpacity=".07"/><stop offset="100%" stopColor="#00C9A7" stopOpacity="0"/></radialGradient>
        <radialGradient id="lamberGl" cx="25%" cy="25%" r="50%"><stop offset="0%" stopColor="#F5A623" stopOpacity=".12"/><stop offset="100%" stopColor="#F5A623" stopOpacity="0"/></radialGradient>
        <pattern id="lfpTile" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#F8FAFC"/><rect width="24" height="24" fill="none" stroke="#E2E8F4" strokeWidth=".5"/></pattern>
        <pattern id="lagileFlr" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#FFF8E8"/><circle cx="8" cy="8" r=".6" fill="#F5A623" opacity=".3"/></pattern>
        <pattern id="lopenFlr" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#EEF6FF"/><polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="none" stroke="#C8DAFF" strokeWidth=".5"/></pattern>
        <pattern id="lhexIso" width="28" height="24" patternUnits="userSpaceOnUse"><polygon points="14,1 25,6.5 25,17.5 14,23 3,17.5 3,6.5" fill="none" stroke="rgba(0,201,167,.06)" strokeWidth=".6"/></pattern>
        <filter id="lgl4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="lgl2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="lsh"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity=".10"/></filter>
      </defs>

      {/* PANEL DIVIDER */}
      <line x1="700" y1="0" x2="700" y2="820" stroke="#0D1E4A" strokeWidth="2"/>

      {/* ══════════════ LEFT PANEL: FLOOR PLAN ══════════════ */}
      <rect x="0" y="0" width="700" height="820" fill="url(#lnavyG)"/>
      {/* Header */}
      <rect x="0" y="0" width="700" height="44" fill="#060F22"/>
      <text x="14" y="16" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11.5" fontWeight="700" fill="#fff">Fintech &amp; AI Innovation Lab — Floor Plan (Top View)</text>
      <text x="14" y="31" fontFamily="monospace" fontSize="9" fill="#00C9A7" opacity=".8">Perimeter ring · Standup Agile Zone NW · Open innovation floor centre</text>
      <rect x="550" y="7" width="72" height="20" rx="5" fill="rgba(0,201,167,.18)" stroke="#00C9A7" strokeWidth=".8"/>
      <text x="586" y="21" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#00C9A7" textAnchor="middle">~1,200 sq ft</text>
      <rect x="630" y="7" width="60" height="20" rx="5" fill="rgba(107,63,160,.18)" stroke="#b39dff" strokeWidth=".8"/>
      <text x="660" y="21" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#b39dff" textAnchor="middle">10 zones</text>

      {/* Room walls */}
      <rect x="18" y="52" width="664" height="756" rx="8" fill="url(#lfpTile)" stroke="#0D1E4A" strokeWidth="2.5"/>

      {/* NORTH DISPLAY WALL */}
      <rect x="18" y="52" width="664" height="56" fill="#07112E"/>
      <rect x="26" y="56" width="190" height="46" rx="4" fill="rgba(0,201,167,.16)" stroke="#00C9A7" strokeWidth=".8"/>
      <text x="121" y="74" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8.5" fontWeight="700" fill="#00C9A7" textAnchor="middle">FINTECH &amp; AI</text>
      <text x="121" y="88" fontFamily="monospace" fontSize="7" fill="#00C9A7" opacity=".55" textAnchor="middle">UPI · LLM · Open Banking</text>
      <rect x="228" y="56" width="248" height="46" rx="4" fill="rgba(245,166,35,.18)" stroke="#F5A623" strokeWidth="1.2"/>
      <text x="352" y="74" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fontWeight="700" fill="#F5A623" textAnchor="middle">AGILE SPRINT BOARD — LIVE</text>
      <text x="352" y="88" fontFamily="monospace" fontSize="7" fill="#F5A623" opacity=".6" textAnchor="middle">Backlog · In Sprint · Done</text>
      {/* mini kanban */}
      <rect x="240" y="94" width="22" height="14" rx="1" fill="rgba(245,166,35,.25)"/><text x="251" y="104" fontFamily="monospace" fontSize="5.5" fill="#F5A623" textAnchor="middle">Back</text>
      <rect x="266" y="94" width="22" height="14" rx="1" fill="rgba(0,201,167,.2)"/><text x="277" y="104" fontFamily="monospace" fontSize="5.5" fill="#00C9A7" textAnchor="middle">Sprint</text>
      <rect x="292" y="94" width="22" height="14" rx="1" fill="rgba(107,63,160,.2)"/><text x="303" y="104" fontFamily="monospace" fontSize="5.5" fill="#b39dff" textAnchor="middle">Done</text>
      <rect x="488" y="56" width="186" height="46" rx="4" fill="rgba(107,63,160,.15)" stroke="#b39dff" strokeWidth=".8"/>
      <text x="581" y="74" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8.5" fontWeight="700" fill="#b39dff" textAnchor="middle">RISK · ESG · COMPLIANCE</text>
      <text x="581" y="88" fontFamily="monospace" fontSize="7" fill="#b39dff" opacity=".55" textAnchor="middle">Basel IV · Scope 1–3 · BRSR</text>

      {/* STANDUP AGILE ZONE (NW) */}
      <rect x="18" y="116" width="160" height="190" rx="6" fill="url(#lagileFlr)" stroke="#F5A623" strokeWidth="2.2"/>
      <rect x="22" y="120" width="152" height="20" rx="4" fill="#F5A623"/>
      <text x="98" y="134" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="800" fill="#07112E" textAnchor="middle">⚡ STANDUP ZONE</text>
      {/* Kanban board */}
      <rect x="28" y="146" width="146" height="78" rx="4" fill="white" stroke="#F5A623" strokeWidth="1.2"/>
      <text x="101" y="159" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="7.5" fontWeight="700" fill="#C07A10" textAnchor="middle">Physical Kanban Board</text>
      <line x1="72" y1="162" x2="72" y2="220" stroke="#F5A623" strokeWidth=".7" strokeDasharray="3,2"/>
      <line x1="116" y1="162" x2="116" y2="220" stroke="#F5A623" strokeWidth=".7" strokeDasharray="3,2"/>
      <text x="50" y="172" fontFamily="sans-serif" fontSize="7" fill="#C07A10" textAnchor="middle" fontWeight="700">Backlog</text>
      <rect x="32" y="176" width="36" height="9" rx="2" fill="#FEF6E7" stroke="#F5A623" strokeWidth=".5"/><text x="50" y="184" fontFamily="sans-serif" fontSize="6" fill="#C07A10" textAnchor="middle">UPI flow</text>
      <rect x="32" y="189" width="36" height="9" rx="2" fill="#FEF6E7" stroke="#F5A623" strokeWidth=".5"/><text x="50" y="197" fontFamily="sans-serif" fontSize="6" fill="#C07A10" textAnchor="middle">Stablecoin</text>
      <text x="94" y="172" fontFamily="sans-serif" fontSize="7" fill="#009E85" textAnchor="middle" fontWeight="700">In Sprint</text>
      <rect x="76" y="176" width="36" height="9" rx="2" fill="#00C9A7"/><text x="94" y="184" fontFamily="sans-serif" fontSize="6" fill="white" textAnchor="middle">Robo AI</text>
      <rect x="76" y="189" width="36" height="9" rx="2" fill="#00C9A7" opacity=".7"/><text x="94" y="197" fontFamily="sans-serif" fontSize="6" fill="white" textAnchor="middle">ESG map</text>
      <text x="138" y="172" fontFamily="sans-serif" fontSize="7" fill="#4E2D7A" textAnchor="middle" fontWeight="700">Done ✓</text>
      <rect x="120" y="176" width="36" height="9" rx="2" fill="#6B3FA0"/><text x="138" y="184" fontFamily="sans-serif" fontSize="6" fill="white" textAnchor="middle">M&amp;A deck</text>
      <rect x="120" y="189" width="36" height="9" rx="2" fill="#6B3FA0" opacity=".7"/><text x="138" y="197" fontFamily="sans-serif" fontSize="6" fill="white" textAnchor="middle">BRSR rpt</text>
      <text x="101" y="234" fontFamily="monospace" fontSize="7" fill="#C07A10" textAnchor="middle">Agile Sprint Board mirrored live</text>
      {/* 4 standing people (simple, clear) */}
      <circle cx="44" cy="264" r="10" fill="#F5A623" stroke="white" strokeWidth="1.5"/>
      <text x="44" y="268" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="36" y="274" width="16" height="18" rx="4" fill="#F5A623" opacity=".7"/>
      <rect x="39" y="292" width="5" height="10" rx="2" fill="#F5A623" opacity=".6"/>
      <rect x="46" y="292" width="5" height="10" rx="2" fill="#F5A623" opacity=".6"/>
      {/* arm pointing up */}
      <line x1="36" y1="280" x2="24" y2="268" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round"/>

      <circle cx="76" cy="258" r="10" fill="#F5A623" stroke="white" strokeWidth="1.5"/>
      <text x="76" y="262" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="68" y="268" width="16" height="18" rx="4" fill="#F5A623" opacity=".7"/>
      <rect x="71" y="286" width="5" height="10" rx="2" fill="#F5A623" opacity=".6"/>
      <rect x="78" y="286" width="5" height="10" rx="2" fill="#F5A623" opacity=".6"/>

      <circle cx="110" cy="262" r="10" fill="#00C9A7" stroke="white" strokeWidth="1.5"/>
      <text x="110" y="266" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="102" y="272" width="16" height="18" rx="4" fill="#00C9A7" opacity=".7"/>
      <rect x="105" y="290" width="5" height="10" rx="2" fill="#00C9A7" opacity=".6"/>
      <rect x="112" y="290" width="5" height="10" rx="2" fill="#00C9A7" opacity=".6"/>

      <circle cx="143" cy="258" r="10" fill="#6B3FA0" stroke="white" strokeWidth="1.5"/>
      <text x="143" y="262" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="135" y="268" width="16" height="18" rx="4" fill="#6B3FA0" opacity=".7"/>
      <rect x="138" y="286" width="5" height="10" rx="2" fill="#6B3FA0" opacity=".6"/>
      <rect x="145" y="286" width="5" height="10" rx="2" fill="#6B3FA0" opacity=".6"/>

      <text x="98" y="306" fontFamily="monospace" fontSize="6.5" fill="#C07A10" textAnchor="middle">⏱ 15-min daily standup</text>

      {/* NORTH WALL STATIONS (inline helpers for seated student) */}
      {/* Seated student helper: head=filled circle, torso=rect leaning, chair=rounded rect */}
      {/* N1: Open Banking */}
      <rect x="194" y="116" width="155" height="36" rx="5" fill="#E6FAF7" stroke="#00C9A7" strokeWidth="1.3"/>
      <rect x="202" y="121" width="42" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <rect x="252" y="121" width="42" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <rect x="300" y="121" width="38" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      {/* Seated students (chairs face south = facing inward) */}
      <circle cx="220" cy="168" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5"/><text x="220" y="172" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="212" y="177" width="16" height="14" rx="3" fill="#00C9A7" opacity=".7"/><rect x="208" y="191" width="22" height="10" rx="4" fill="#C8D3E8"/>
      <line x1="212" y1="182" x2="202" y2="173" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/><line x1="228" y1="182" x2="238" y2="173" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="267" cy="168" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="267" y="172" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="259" y="177" width="16" height="14" rx="3" fill="#00C9A7" opacity=".65"/><rect x="255" y="191" width="22" height="10" rx="4" fill="#C8D3E8"/>
      <line x1="259" y1="182" x2="249" y2="173" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/><line x1="275" y1="182" x2="285" y2="173" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <text x="271" y="212" fontFamily="monospace" fontSize="7" fill="#009E85" textAnchor="middle">Pair 01 · Open Banking</text>

      {/* FACILITATOR (wide north centre) */}
      <rect x="362" y="116" width="194" height="36" rx="5" fill="#07112E" stroke="#00C9A7" strokeWidth="1.8"/>
      <rect x="372" y="121" width="40" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <rect x="420" y="121" width="40" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <rect x="468" y="121" width="40" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <rect x="516" y="121" width="32" height="22" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <text x="459" y="134" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="7.5" fontWeight="700" fill="#00C9A7" opacity=".8" textAnchor="middle">FACILITATOR · UPSKILLIZE</text>
      {/* Facilitator seated (larger, glowing) */}
      <circle cx="430" cy="172" r="11" fill="#00C9A7" stroke="white" strokeWidth="2" filter="url(#lgl2)"/><text x="430" y="176" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">F</text>
      <rect x="420" y="183" width="20" height="16" rx="3" fill="#00C9A7" opacity=".8"/><rect x="416" y="199" width="26" height="10" rx="4" fill="#C8D3E8"/>
      {/* Pointing gesture */}
      <line x1="420" y1="188" x2="406" y2="178" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="405" cy="177" r="3.5" fill="#00C9A7"/>
      <text x="459" y="216" fontFamily="monospace" fontSize="7" fill="#00C9A7" opacity=".6" textAnchor="middle">Facilitator Station</text>
      <circle cx="500" cy="170" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5" opacity=".75"/><text x="500" y="174" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="492" y="179" width="16" height="14" rx="3" fill="#00C9A7" opacity=".65"/><rect x="488" y="193" width="22" height="10" rx="4" fill="#C8D3E8"/>
      <line x1="492" y1="184" x2="482" y2="175" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/><line x1="508" y1="184" x2="518" y2="175" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>

      {/* N3: WealthTech */}
      <rect x="570" y="116" width="100" height="36" rx="5" fill="#F0EBF9" stroke="#6B3FA0" strokeWidth="1.3"/>
      <rect x="578" y="121" width="36" height="22" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/>
      <rect x="622" y="121" width="36" height="22" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/>
      <circle cx="596" cy="168" r="9" fill="#6B3FA0" stroke="white" strokeWidth="1.5"/><text x="596" y="172" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="588" y="177" width="16" height="14" rx="3" fill="#6B3FA0" opacity=".7"/><rect x="584" y="191" width="22" height="10" rx="4" fill="#C8D3E8"/>
      <line x1="588" y1="182" x2="578" y2="173" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/><line x1="604" y1="182" x2="614" y2="173" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="637" cy="168" r="9" fill="#6B3FA0" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="637" y="172" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="629" y="177" width="16" height="14" rx="3" fill="#6B3FA0" opacity=".65"/><rect x="625" y="191" width="22" height="10" rx="4" fill="#C8D3E8"/>
      <line x1="629" y1="182" x2="619" y2="173" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/><line x1="645" y1="182" x2="655" y2="173" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/>
      <text x="620" y="212" fontFamily="monospace" fontSize="7" fill="#4E2D7A" textAnchor="middle">Pair 02 · WealthTech</text>

      {/* EAST WALL (students face left/inward — chairs face left) */}
      {/* E1 Blockchain */}
      <rect x="634" y="226" width="34" height="114" rx="5" fill="#FDE9EF" stroke="#E8426A" strokeWidth="1.3"/>
      <rect x="639" y="232" width="22" height="32" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      <rect x="639" y="270" width="22" height="32" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      {/* east-facing student: chair on right side */}
      <circle cx="606" cy="255" r="9" fill="#E8426A" stroke="white" strokeWidth="1.5"/><text x="606" y="259" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="616" y="248" width="14" height="16" rx="3" fill="#E8426A" opacity=".7"/><rect x="628" y="246" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="616" y1="253" x2="626" y2="246" stroke="#E8426A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="606" cy="293" r="9" fill="#E8426A" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="606" y="297" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="616" y="286" width="14" height="16" rx="3" fill="#E8426A" opacity=".65"/><rect x="628" y="284" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="616" y1="291" x2="626" y2="284" stroke="#E8426A" strokeWidth="2" strokeLinecap="round"/>
      <text x="596" y="352" fontFamily="monospace" fontSize="6.5" fill="#c0405a" textAnchor="middle" writingMode="vertical-lr">Pair 03 · Blockchain</text>

      {/* E2 Risk Sim */}
      <rect x="634" y="356" width="34" height="114" rx="5" fill="#FEF6E7" stroke="#F5A623" strokeWidth="1.3"/>
      <rect x="639" y="362" width="22" height="32" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/>
      <rect x="639" y="400" width="22" height="32" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/>
      <circle cx="606" cy="385" r="9" fill="#F5A623" stroke="white" strokeWidth="1.5"/><text x="606" y="389" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="616" y="378" width="14" height="16" rx="3" fill="#F5A623" opacity=".7"/><rect x="628" y="376" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="616" y1="383" x2="626" y2="376" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="606" cy="423" r="9" fill="#F5A623" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="606" y="427" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="616" y="416" width="14" height="16" rx="3" fill="#F5A623" opacity=".65"/><rect x="628" y="414" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="616" y1="421" x2="626" y2="414" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"/>
      <text x="596" y="482" fontFamily="monospace" fontSize="6.5" fill="#C07A10" textAnchor="middle" writingMode="vertical-lr">Pair 04 · Risk Sim</text>

      {/* E3 Capital Markets */}
      <rect x="634" y="486" width="34" height="114" rx="5" fill="#E6FAF7" stroke="#00C9A7" strokeWidth="1.3"/>
      <rect x="639" y="492" width="22" height="32" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <rect x="639" y="530" width="22" height="32" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <circle cx="606" cy="515" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5"/><text x="606" y="519" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="616" y="508" width="14" height="16" rx="3" fill="#00C9A7" opacity=".7"/><rect x="628" y="506" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="616" y1="513" x2="626" y2="506" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="606" cy="553" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="606" y="557" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="616" y="546" width="14" height="16" rx="3" fill="#00C9A7" opacity=".65"/><rect x="628" y="544" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="616" y1="551" x2="626" y2="544" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <text x="596" y="612" fontFamily="monospace" fontSize="6.5" fill="#009E85" textAnchor="middle" writingMode="vertical-lr">Pair 05 · Capital Mkts</text>

      {/* SOUTH WALL (students face north = chairs face up) */}
      {/* S1 ESG */}
      <rect x="28" y="618" width="130" height="34" rx="5" fill="#ECFDF5" stroke="#22C55E" strokeWidth="1.3"/>
      <rect x="36" y="623" width="34" height="20" rx="2" fill="#071022" stroke="#22C55E" strokeWidth=".7"/>
      <rect x="78" y="623" width="34" height="20" rx="2" fill="#071022" stroke="#22C55E" strokeWidth=".7"/>
      <rect x="120" y="623" width="30" height="20" rx="2" fill="#071022" stroke="#22C55E" strokeWidth=".7"/>
      {/* South-facing seated: chair on south side, student between chair and desk */}
      <circle cx="53" cy="596" r="9" fill="#22C55E" stroke="white" strokeWidth="1.5"/><text x="53" y="600" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="45" y="605" width="16" height="14" rx="3" fill="#22C55E" opacity=".7"/><rect x="41" y="619" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <line x1="45" y1="610" x2="36" y2="619" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="100" cy="596" r="9" fill="#22C55E" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="100" y="600" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="92" y="605" width="16" height="14" rx="3" fill="#22C55E" opacity=".65"/><rect x="88" y="619" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <line x1="92" y1="610" x2="83" y2="619" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <text x="93" y="670" fontFamily="monospace" fontSize="7" fill="#15803D" textAnchor="middle">Pair 06 · ESG Obs.</text>

      {/* S2 M&A + InsurTech wide */}
      <rect x="174" y="618" width="280" height="34" rx="5" fill="#FDE9EF" stroke="#E8426A" strokeWidth="1.3"/>
      <rect x="182" y="623" width="38" height="20" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      <rect x="228" y="623" width="38" height="20" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      <rect x="280" y="623" width="38" height="20" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/>
      <rect x="326" y="623" width="38" height="20" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/>
      <rect x="378" y="623" width="38" height="20" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      {/* 4 students */}
      <circle cx="201" cy="596" r="9" fill="#E8426A" stroke="white" strokeWidth="1.5"/><text x="201" y="600" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="193" y="605" width="16" height="14" rx="3" fill="#E8426A" opacity=".7"/><rect x="189" y="619" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <circle cx="247" cy="594" r="9" fill="#E8426A" stroke="white" strokeWidth="1.5" opacity=".82"/><text x="247" y="598" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="239" y="603" width="16" height="14" rx="3" fill="#E8426A" opacity=".68"/><rect x="235" y="617" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <circle cx="299" cy="596" r="9" fill="#F5A623" stroke="white" strokeWidth="1.5"/><text x="299" y="600" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="291" y="605" width="16" height="14" rx="3" fill="#F5A623" opacity=".7"/><rect x="287" y="619" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <circle cx="345" cy="594" r="9" fill="#F5A623" stroke="white" strokeWidth="1.5" opacity=".82"/><text x="345" y="598" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="337" y="603" width="16" height="14" rx="3" fill="#F5A623" opacity=".68"/><rect x="333" y="617" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <text x="314" y="670" fontFamily="monospace" fontSize="7" fill="#c0405a" textAnchor="middle">Pair 07+08 · M&amp;A Sim · InsurTech</text>

      {/* S3 Lending Tech */}
      <rect x="470" y="618" width="154" height="34" rx="5" fill="#E6FAF7" stroke="#00C9A7" strokeWidth="1.3"/>
      <rect x="478" y="623" width="36" height="20" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <rect x="522" y="623" width="36" height="20" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <rect x="566" y="623" width="36" height="20" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/>
      <circle cx="496" cy="596" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5"/><text x="496" y="600" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="488" y="605" width="16" height="14" rx="3" fill="#00C9A7" opacity=".7"/><rect x="484" y="619" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <circle cx="548" cy="594" r="9" fill="#00C9A7" stroke="white" strokeWidth="1.5" opacity=".82"/><text x="548" y="598" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="540" y="603" width="16" height="14" rx="3" fill="#00C9A7" opacity=".68"/><rect x="536" y="617" width="22" height="8" rx="3" fill="#C8D3E8"/>
      <text x="547" y="670" fontFamily="monospace" fontSize="7" fill="#009E85" textAnchor="middle">Pair 09 · Lending Tech</text>

      {/* WEST WALL (students face right = chairs face right) */}
      <rect x="18" y="318" width="34" height="110" rx="5" fill="#F0EBF9" stroke="#6B3FA0" strokeWidth="1.3"/>
      <rect x="23" y="324" width="22" height="28" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/>
      <rect x="23" y="358" width="22" height="28" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/>
      {/* west facing: chair on left, student between chair and desk */}
      <circle cx="66" cy="346" r="9" fill="#6B3FA0" stroke="white" strokeWidth="1.5"/><text x="66" y="350" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="52" y="339" width="14" height="16" rx="3" fill="#6B3FA0" opacity=".7"/><rect x="42" y="337" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="52" y1="344" x2="44" y2="338" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="66" cy="384" r="9" fill="#6B3FA0" stroke="white" strokeWidth="1.5" opacity=".8"/><text x="66" y="388" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="52" y="377" width="14" height="16" rx="3" fill="#6B3FA0" opacity=".65"/><rect x="42" y="375" width="10" height="22" rx="4" fill="#C8D3E8"/>
      <line x1="52" y1="382" x2="44" y2="376" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/>
      <text x="58" y="445" fontFamily="monospace" fontSize="6.5" fill="#4E2D7A" textAnchor="middle" writingMode="vertical-lr">Pair 10 · Trading</text>

      {/* OPEN INNOVATION FLOOR */}
      <rect x="172" y="226" width="448" height="380" rx="8" fill="url(#lopenFlr)" stroke="#D1E5FF" strokeWidth="1.2"/>
      <text x="396" y="262" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="12" fontWeight="800" fill="#07112E" textAnchor="middle">OPEN INNOVATION FLOOR</text>
      <text x="396" y="278" fontFamily="sans-serif" fontSize="9.5" fill="#7A8CAB" textAnchor="middle">~380 sq ft · walk · present · sprint · discuss</text>
      {/* Live Collab Board */}
      <rect x="220" y="294" width="352" height="155" rx="7" fill="white" stroke="#06B6D4" strokeWidth="1.5"/>
      <rect x="220" y="294" width="352" height="22" rx="7" fill="#06B6D4"/>
      <rect x="220" y="308" width="352" height="8" fill="#06B6D4"/>
      <text x="396" y="309" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">🎯 LIVE COLLABORATION BOARD</text>
      {/* Sticky notes */}
      <rect x="232" y="328" width="56" height="34" rx="4" fill="#FEF9C3" stroke="#F59E0B" strokeWidth=".8"/>
      <text x="260" y="342" fontFamily="sans-serif" fontSize="7" fill="#92400E" textAnchor="middle" fontWeight="700">UPI flow</text><text x="260" y="354" fontFamily="sans-serif" fontSize="7" fill="#92400E" textAnchor="middle">mapping 🗺</text>
      <rect x="296" y="328" width="56" height="34" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth=".8"/>
      <text x="324" y="342" fontFamily="sans-serif" fontSize="7" fill="#065F46" textAnchor="middle" fontWeight="700">AI lending</text><text x="324" y="354" fontFamily="sans-serif" fontSize="7" fill="#065F46" textAnchor="middle">model 🤖</text>
      <rect x="360" y="328" width="56" height="34" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth=".8"/>
      <text x="388" y="342" fontFamily="sans-serif" fontSize="7" fill="#4C1D95" textAnchor="middle" fontWeight="700">ESG risk</text><text x="388" y="354" fontFamily="sans-serif" fontSize="7" fill="#4C1D95" textAnchor="middle">matrix 🌿</text>
      <rect x="424" y="328" width="56" height="34" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth=".8"/>
      <text x="452" y="342" fontFamily="sans-serif" fontSize="7" fill="#991B1B" textAnchor="middle" fontWeight="700">M&amp;A deal</text><text x="452" y="354" fontFamily="sans-serif" fontSize="7" fill="#991B1B" textAnchor="middle">structure 📊</text>
      <rect x="496" y="328" width="60" height="34" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth=".8"/>
      <text x="526" y="342" fontFamily="sans-serif" fontSize="7" fill="#075985" textAnchor="middle" fontWeight="700">Stablecoin</text><text x="526" y="354" fontFamily="sans-serif" fontSize="7" fill="#075985" textAnchor="middle">design ⛓</text>
      <ellipse cx="396" cy="406" rx="130" ry="11" fill="rgba(6,182,212,.1)" stroke="rgba(6,182,212,.4)" strokeWidth="1"/>
      <text x="396" y="410" fontFamily="sans-serif" fontSize="7.5" fill="#0891B2" textAnchor="middle" fontWeight="700">Fintech Sprint Map · 22 active tickets</text>
      <text x="396" y="434" fontFamily="monospace" fontSize="7.5" fill="#7A8CAB" textAnchor="middle">Backlog: 8 · In Sprint: 9 · Review: 3 · Done: 2</text>
      {/* 2 collab groups standing */}
      <circle cx="244" cy="480" r="11" fill="#00C9A7" stroke="white" strokeWidth="2"/><text x="244" y="484" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="235" y="491" width="18" height="14" rx="3" fill="#00C9A7" opacity=".7"/>
      <rect x="271" y="292" width="55" height="14" rx="5" fill="#07112E" opacity=".65"/>
      <text x="298" y="302" fontFamily="sans-serif" fontSize="7" fill="#00C9A7" textAnchor="middle">💬 Sprint retro</text>
      <circle cx="272" cy="480" r="11" fill="#6B3FA0" stroke="white" strokeWidth="2"/><text x="272" y="484" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="263" y="491" width="18" height="14" rx="3" fill="#6B3FA0" opacity=".7"/>

      <circle cx="492" cy="480" r="11" fill="#F5A623" stroke="white" strokeWidth="2"/><text x="492" y="484" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="483" y="491" width="18" height="14" rx="3" fill="#F5A623" opacity=".7"/>
      <circle cx="520" cy="480" r="11" fill="#E8426A" stroke="white" strokeWidth="2"/><text x="520" y="484" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="511" y="491" width="18" height="14" rx="3" fill="#E8426A" opacity=".7"/>
      <rect x="450" y="292" width="50" height="14" rx="5" fill="#07112E" opacity=".65"/>
      <text x="475" y="302" fontFamily="sans-serif" fontSize="7" fill="#F5A623" textAnchor="middle">⚡ M&amp;A debate</text>
      {/* Capstone presenter */}
      <circle cx="396" cy="516" r="13" fill="#b39dff" stroke="white" strokeWidth="2" filter="url(#lgl2)"/><text x="396" y="520" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">P</text>
      <rect x="383" y="529" width="26" height="18" rx="4" fill="#b39dff" opacity=".75"/>
      <line x1="383" y1="536" x2="364" y2="524" stroke="#b39dff" strokeWidth="3" strokeLinecap="round"/>
      <line x1="409" y1="536" x2="428" y2="524" stroke="#b39dff" strokeWidth="3" strokeLinecap="round"/>
      <text x="396" y="565" fontFamily="sans-serif" fontSize="9" fill="#6B3FA0" textAnchor="middle" fontWeight="700">🎤 Capstone Pitch</text>

      {/* Green wall SW */}
      <rect x="18" y="616" width="24" height="152" rx="4" fill="rgba(34,197,94,.15)" stroke="#22C55E" strokeWidth="1"/>
      <circle cx="30" cy="634" r="8" fill="#22C55E" opacity=".6"/><circle cx="30" cy="658" r="7" fill="#15803D" opacity=".5"/>
      <circle cx="30" cy="682" r="8" fill="#22C55E" opacity=".55"/><circle cx="30" cy="706" r="7" fill="#15803D" opacity=".5"/>
      <circle cx="30" cy="730" r="8" fill="#22C55E" opacity=".6"/><circle cx="30" cy="754" r="6" fill="#15803D" opacity=".5"/>

      {/* Dimension line */}
      <line x1="20" y1="810" x2="678" y2="810" stroke="#C8D3E8" strokeWidth=".7" strokeDasharray="4,3"/>
      <text x="349" y="820" fontFamily="sans-serif" fontSize="8.5" fill="#7A8CAB" textAnchor="middle">~24m × 24m recommended · College provides room · Upskillize delivers everything · 🌬 4 AC zones</text>

      {/* ══════════════ RIGHT PANEL: 3D ISOMETRIC CULTURE VIEW ══════════════ */}
      <rect x="700" y="0" width="700" height="820" fill="url(#lroomDk)"/>
      {/* Header */}
      <rect x="700" y="0" width="700" height="44" fill="#040B1A"/>
      <text x="714" y="16" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11.5" fontWeight="700" fill="white">Fintech &amp; AI Innovation Lab — 3D Culture View</text>
      <text x="714" y="31" fontFamily="sans-serif" fontSize="9" fill="#00C9A7" opacity=".8">Students working · Peers collaborating · Real-time innovation</text>
      {/* Stat chips */}
      <rect x="1020" y="7" width="88" height="20" rx="5" fill="rgba(245,166,35,.2)" stroke="#F5A623" strokeWidth=".8"/>
      <text x="1064" y="20" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#F5A623" textAnchor="middle">War room ⚡</text>
      <rect x="1116" y="7" width="76" height="20" rx="5" fill="rgba(0,201,167,.2)" stroke="#00C9A7" strokeWidth=".8"/>
      <text x="1154" y="20" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#00C9A7" textAnchor="middle">Agile 🏃</text>
      <rect x="1200" y="7" width="84" height="20" rx="5" fill="rgba(107,63,160,.2)" stroke="#b39dff" strokeWidth=".8"/>
      <text x="1242" y="20" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#b39dff" textAnchor="middle">Peer work 👥</text>
      <rect x="1292" y="7" width="98" height="20" rx="5" fill="rgba(34,197,94,.18)" stroke="#22C55E" strokeWidth=".8"/>
      <text x="1341" y="20" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#4ade80" textAnchor="middle">ESG-Aligned 🌿</text>

      {/* FLOOR (isometric) */}
      <polygon points="720,760 1050,555 1380,760 1050,820" fill="#0C1A3E"/>
      <polygon points="720,760 1050,555 1380,760 1050,820" fill="url(#lhexIso)"/>
      {/* Floor glow */}
      <ellipse cx="1050" cy="705" rx="240" ry="65" fill="rgba(0,201,167,.05)"/>
      <ellipse cx="820" cy="730" rx="110" ry="35" fill="rgba(245,166,35,.06)"/>
      {/* Back wall */}
      <polygon points="720,320 1050,175 1380,320 1380,555 1050,410 720,555" fill="#0B1830"/>
      {/* Ceiling LED */}
      <line x1="720" y1="551" x2="1050" y2="406" stroke="#00C9A7" strokeWidth="3" opacity=".65" filter="url(#lgl4)"/>
      <line x1="1050" y1="406" x2="1380" y2="551" stroke="#00C9A7" strokeWidth="3" opacity=".65" filter="url(#lgl4)"/>
      {/* Standup amber ceiling */}
      <line x1="720" y1="553" x2="870" y2="478" stroke="#F5A623" strokeWidth="2.5" opacity=".55" filter="url(#lgl4)"/>

      {/* BACK WALL DISPLAYS */}
      <polygon points="740,334 882,262 882,340 740,412" fill="#071022"/>
      <polygon points="744,338 878,266 878,336 744,407" fill="url(#lscT)"/>
      <text x="811" y="302" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="700" fill="#00C9A7" textAnchor="middle">FINTECH &amp; AI</text>
      <text x="811" y="314" fontFamily="monospace" fontSize="7" fill="#00C9A7" opacity=".55" textAnchor="middle">UPI · LLM · Open Banking</text>
      <polyline points="752,380 768,364 784,370 800,354 816,360 832,344 848,350 864,336 876,340" stroke="#00C9A7" strokeWidth="1.3" fill="none" opacity=".65"/>
      <circle cx="876" cy="340" r="3" fill="#00C9A7"/>

      {/* Centre display: Upskillize branding + Sprint board */}
      <polygon points="930,274 1170,172 1170,274 930,376" fill="#071022" stroke="rgba(245,166,35,.3)" strokeWidth=".8"/>
      <polygon points="934,278 1166,176 1166,270 934,371" fill="rgba(245,166,35,.14)"/>
      <text x="1050" y="216" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9.5" fontWeight="700" fill="#F5A623" textAnchor="middle">FINTECH &amp; AI INNOVATION LAB</text>
      <text x="1050" y="234" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="15" fontWeight="800" fill="white" textAnchor="middle">UPSKILLIZE SOLUTIONS</text>
      <text x="1050" y="250" fontFamily="monospace" fontSize="7" fill="#00C9A7" opacity=".55" textAnchor="middle">500+ YEARS EXPERTISE · CROs · CDOs · CPOs</text>
      {/* Sprint board on screen */}
      <rect x="940" y="260" width="32" height="54" rx="2" fill="rgba(245,166,35,.18)" stroke="rgba(245,166,35,.4)" strokeWidth=".6"/>
      <text x="956" y="274" fontFamily="sans-serif" fontSize="6.5" fill="#F5A623" textAnchor="middle">Backlog</text>
      <rect x="943" y="278" width="26" height="9" rx="1" fill="#F5A623" opacity=".65"/><rect x="943" y="291" width="26" height="9" rx="1" fill="#F5A623" opacity=".45"/>
      <rect x="978" y="260" width="32" height="54" rx="2" fill="rgba(0,201,167,.14)" stroke="rgba(0,201,167,.4)" strokeWidth=".6"/>
      <text x="994" y="274" fontFamily="sans-serif" fontSize="6.5" fill="#00C9A7" textAnchor="middle">Sprint</text>
      <rect x="981" y="278" width="26" height="9" rx="1" fill="#00C9A7" opacity=".7"/>
      <rect x="1016" y="260" width="32" height="54" rx="2" fill="rgba(107,63,160,.14)" stroke="rgba(107,63,160,.4)" strokeWidth=".6"/>
      <text x="1032" y="274" fontFamily="sans-serif" fontSize="6.5" fill="#b39dff" textAnchor="middle">Done ✓</text>
      <rect x="1019" y="278" width="26" height="9" rx="1" fill="#6B3FA0" opacity=".7"/><rect x="1019" y="291" width="26" height="9" rx="1" fill="#6B3FA0" opacity=".5"/>
      <text x="1050" y="338" fontFamily="monospace" fontSize="7.5" fill="rgba(245,166,35,.55)" textAnchor="middle">Live Sprint Board · 22 tickets active</text>
      <text x="1050" y="360" fontFamily="monospace" fontSize="6.5" fill="rgba(255,255,255,.2)" textAnchor="middle">Learning is a Passion · India's First Fintech &amp; AI Innovation Lab</text>

      {/* Right display: Risk + ESG */}
      <polygon points="1208,290 1348,218 1348,296 1208,368" fill="#071022"/>
      <polygon points="1212,294 1344,222 1344,292 1212,363" fill="url(#lscP)"/>
      <text x="1278" y="254" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8.5" fontWeight="700" fill="#b39dff" textAnchor="middle">RISK · ESG</text>
      <circle cx="1278" cy="314" r="22" fill="none" stroke="#6B3FA0" strokeWidth="8" strokeDasharray="44 94" opacity=".7"/>
      <circle cx="1278" cy="314" r="22" fill="none" stroke="#22C55E" strokeWidth="8" strokeDasharray="28 110" strokeDashOffset="-44" opacity=".6"/>
      <circle cx="1278" cy="314" r="11" fill="#071022"/>
      <text x="1278" y="318" fontFamily="sans-serif" fontSize="8" fill="rgba(255,255,255,.6)" textAnchor="middle">ESG</text>

      {/* ══ PERIMETER STATIONS 3D — simplified, clean ══ */}

      {/* STANDUP ZONE NW (3D, amber glow) */}
      <polygon points="720,553 872,473 904,491 752,571" fill="#0C1B28" stroke="#F5A623" strokeWidth="1.5"/>
      <polygon points="720,458 858,386 858,474 720,546" fill="#071822" stroke="#F5A623" strokeWidth="1"/>
      <polygon points="724,462 854,390 854,470 724,541" fill="rgba(245,166,35,.12)"/>
      <text x="787" y="432" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8.5" fontWeight="700" fill="#F5A623" textAnchor="middle">⚡ STANDUP</text>
      {/* Kanban on wall */}
      <rect x="730" y="440" width="28" height="46" rx="2" fill="rgba(245,166,35,.18)" stroke="#F5A623" strokeWidth=".5"/>
      <text x="744" y="453" fontFamily="sans-serif" fontSize="6" fill="#F5A623" textAnchor="middle">Back</text><rect x="732" y="457" width="24" height="8" rx="1" fill="#F5A623" opacity=".6"/>
      <rect x="762" y="440" width="28" height="46" rx="2" fill="rgba(0,201,167,.14)" stroke="#00C9A7" strokeWidth=".5"/>
      <text x="776" y="453" fontFamily="sans-serif" fontSize="6" fill="#00C9A7" textAnchor="middle">Sprint</text><rect x="764" y="457" width="24" height="8" rx="1" fill="#00C9A7" opacity=".65"/>
      <rect x="794" y="440" width="28" height="46" rx="2" fill="rgba(107,63,160,.12)" stroke="#6B3FA0" strokeWidth=".5"/>
      <text x="808" y="453" fontFamily="sans-serif" fontSize="6" fill="#b39dff" textAnchor="middle">Done</text><rect x="796" y="457" width="24" height="8" rx="1" fill="#6B3FA0" opacity=".65"/>

      {/* 4 standing students (CLEAN, CRISP) */}
      <circle cx="768" cy="534" r="11" fill="#F5A623" stroke="white" strokeWidth="2" filter="url(#lgl2)"/><text x="768" y="538" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="758" y="545" width="20" height="18" rx="4" fill="#F5A623" opacity=".8"/>
      <rect x="761" y="563" width="7" height="12" rx="2" fill="#F5A623" opacity=".65"/><rect x="770" y="563" width="7" height="12" rx="2" fill="#F5A623" opacity=".65"/>
      <line x1="758" y1="552" x2="742" y2="540" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="741" cy="539" r="4" fill="#F5A623"/>

      <circle cx="800" cy="520" r="10" fill="#F5A623" stroke="white" strokeWidth="2" opacity=".88"/><text x="800" y="524" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="791" y="530" width="18" height="16" rx="4" fill="#F5A623" opacity=".75"/>
      <rect x="794" y="546" width="6" height="11" rx="2" fill="#F5A623" opacity=".62"/><rect x="802" y="546" width="6" height="11" rx="2" fill="#F5A623" opacity=".62"/>

      <circle cx="834" cy="530" r="10" fill="#00C9A7" stroke="white" strokeWidth="2" opacity=".9"/><text x="834" y="534" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="825" y="540" width="18" height="16" rx="4" fill="#00C9A7" opacity=".78"/>
      <rect x="828" y="556" width="6" height="11" rx="2" fill="#00C9A7" opacity=".65"/><rect x="836" y="556" width="6" height="11" rx="2" fill="#00C9A7" opacity=".65"/>

      <circle cx="866" cy="520" r="10" fill="#6B3FA0" stroke="white" strokeWidth="2" opacity=".85"/><text x="866" y="524" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="857" y="530" width="18" height="16" rx="4" fill="#6B3FA0" opacity=".75"/>
      <rect x="860" y="546" width="6" height="11" rx="2" fill="#6B3FA0" opacity=".62"/><rect x="868" y="546" width="6" height="11" rx="2" fill="#6B3FA0" opacity=".62"/>

      <rect x="832" y="497" width="78" height="14" rx="5" fill="#07112E" opacity=".7"/>
      <text x="871" y="508" fontFamily="sans-serif" fontSize="7" fill="#F5A623" textAnchor="middle">⏱ Daily standup</text>

      {/* NORTH STATIONS (seated pairs) — CLEAN student figures */}
      {/* N1: Open Banking */}
      <polygon points="908,492 1004,444 1026,458 930,506" fill="url(#ldeskNav)" stroke="rgba(0,201,167,.35)" strokeWidth=".9"/>
      <rect x="918" y="434" width="38" height="16" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".8"/>
      <rect x="962" y="428" width="38" height="16" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".8"/>
      {/* Student A: seated, leaning toward screen */}
      <circle cx="948" cy="492" r="10" fill="#00C9A7" stroke="white" strokeWidth="2" filter="url(#lgl2)"/><text x="948" y="496" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="938" y="502" width="20" height="14" rx="3" fill="#00C9A7" opacity=".75"/><rect x="934" y="516" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".7"/>
      <line x1="938" y1="508" x2="926" y2="500" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="958" y1="508" x2="970" y2="500" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Student B */}
      <circle cx="988" cy="480" r="9" fill="#00C9A7" stroke="white" strokeWidth="2" opacity=".8"/><text x="988" y="484" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="979" y="489" width="18" height="13" rx="3" fill="#00C9A7" opacity=".68"/><rect x="975" y="502" width="26" height="9" rx="4" fill="#9CA3AF" opacity=".6"/>
      <line x1="979" y1="495" x2="967" y2="487" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <line x1="997" y1="495" x2="1009" y2="487" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <text x="958" y="538" fontFamily="sans-serif" fontSize="7.5" fill="rgba(0,201,167,.55)" textAnchor="middle">Pair 01 · Open Banking</text>

      {/* FACILITATOR (wide centre) */}
      <polygon points="1042,462 1202,382 1234,398 1074,478" fill="#071022" stroke="#00C9A7" strokeWidth="1.6"/>
      <rect x="1058" y="372" width="44" height="17" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <rect x="1110" y="366" width="44" height="17" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <rect x="1162" y="366" width="44" height="17" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".9"/>
      <text x="1143" y="382" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="7.5" fontWeight="700" fill="rgba(0,201,167,.8)" textAnchor="middle">FACILITATOR · UPSKILLIZE</text>
      {/* Facilitator (upright, prominent) */}
      <circle cx="1144" cy="468" r="13" fill="#00C9A7" stroke="white" strokeWidth="2.5" filter="url(#lgl2)"/><text x="1144" y="472" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">F</text>
      <rect x="1131" y="481" width="26" height="18" rx="4" fill="#00C9A7" opacity=".8"/><rect x="1127" y="499" width="34" height="12" rx="5" fill="#9CA3AF" opacity=".6"/>
      <line x1="1131" y1="490" x2="1113" y2="478" stroke="#00C9A7" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="1112" cy="476" r="4.5" fill="#00C9A7"/>
      {/* Co-seat */}
      <circle cx="1190" cy="450" r="10" fill="#00C9A7" stroke="white" strokeWidth="2" opacity=".75"/><text x="1190" y="454" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1181" y="460" width="18" height="13" rx="3" fill="#00C9A7" opacity=".65"/><rect x="1177" y="473" width="26" height="9" rx="4" fill="#9CA3AF" opacity=".55"/>
      <line x1="1181" y1="466" x2="1169" y2="458" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <line x1="1199" y1="466" x2="1211" y2="458" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round"/>
      <text x="1144" y="524" fontFamily="sans-serif" fontSize="7.5" fill="rgba(0,201,167,.55)" textAnchor="middle">Facilitator Station</text>

      {/* N2: WealthTech */}
      <polygon points="1252,436 1348,388 1368,400 1272,448" fill="url(#ldeskNav)" stroke="rgba(107,63,160,.32)" strokeWidth=".9"/>
      <rect x="1262" y="378" width="36" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".8"/>
      <rect x="1304" y="372" width="36" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".8"/>
      <circle cx="1284" cy="462" r="10" fill="#6B3FA0" stroke="white" strokeWidth="2" opacity=".88"/><text x="1284" y="466" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1275" y="472" width="18" height="13" rx="3" fill="#6B3FA0" opacity=".75"/><rect x="1271" y="485" width="26" height="9" rx="4" fill="#9CA3AF" opacity=".55"/>
      <line x1="1275" y1="478" x2="1263" y2="470" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/>
      <line x1="1293" y1="478" x2="1305" y2="470" stroke="#6B3FA0" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="1320" cy="450" r="9" fill="#6B3FA0" stroke="white" strokeWidth="2" opacity=".78"/><text x="1320" y="454" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1312" y="459" width="16" height="12" rx="3" fill="#6B3FA0" opacity=".65"/><rect x="1308" y="471" width="24" height="9" rx="4" fill="#9CA3AF" opacity=".5"/>
      <text x="1298" y="498" fontFamily="sans-serif" fontSize="7.5" fill="rgba(107,63,160,.55)" textAnchor="middle">Pair 02 · WealthTech</text>

      {/* EAST WALL STATIONS (pairs, facing left) */}
      <polygon points="1356,554 1396,534 1398,614 1358,634" fill="url(#ldeskNav)" stroke="rgba(232,66,106,.3)" strokeWidth=".9"/>
      <rect x="1364" y="542" width="14" height="28" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      <rect x="1364" y="576" width="14" height="28" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/>
      <circle cx="1330" cy="566" r="9" fill="#E8426A" stroke="white" strokeWidth="2"/><text x="1330" y="570" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1338" y="559" width="14" height="14" rx="3" fill="#E8426A" opacity=".7"/><rect x="1350" y="557" width="10" height="20" rx="4" fill="#9CA3AF" opacity=".6"/>
      <circle cx="1330" cy="604" r="9" fill="#E8426A" stroke="white" strokeWidth="2" opacity=".8"/><text x="1330" y="608" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1338" y="597" width="14" height="14" rx="3" fill="#E8426A" opacity=".65"/><rect x="1350" y="595" width="10" height="20" rx="4" fill="#9CA3AF" opacity=".5"/>

      <polygon points="1358,648 1398,628 1400,708 1360,728" fill="url(#ldeskNav)" stroke="rgba(245,166,35,.28)" strokeWidth=".9"/>
      <rect x="1366" y="636" width="14" height="28" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/>
      <rect x="1366" y="670" width="14" height="28" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/>
      <circle cx="1332" cy="660" r="9" fill="#F5A623" stroke="white" strokeWidth="2"/><text x="1332" y="664" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1340" y="653" width="14" height="14" rx="3" fill="#F5A623" opacity=".7"/><rect x="1352" y="651" width="10" height="20" rx="4" fill="#9CA3AF" opacity=".6"/>
      <circle cx="1332" cy="698" r="9" fill="#F5A623" stroke="white" strokeWidth="2" opacity=".8"/><text x="1332" y="702" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1340" y="691" width="14" height="14" rx="3" fill="#F5A623" opacity=".65"/><rect x="1352" y="689" width="10" height="20" rx="4" fill="#9CA3AF" opacity=".5"/>

      {/* SOUTH WALL STATIONS (pairs, backs to viewer) */}
      {/* S1 ESG */}
      <polygon points="748,650 844,604 864,616 768,662" fill="url(#ldeskNav)" stroke="rgba(34,197,94,.3)" strokeWidth=".9"/>
      <rect x="758" y="594" width="36" height="14" rx="2" fill="#071022" stroke="#22C55E" strokeWidth=".8"/>
      <rect x="800" y="588" width="36" height="14" rx="2" fill="#071022" stroke="#22C55E" strokeWidth=".8"/>
      {/* South-facing students: backs to viewer, heads + torso visible */}
      <circle cx="784" cy="640" r="10" fill="#22C55E" stroke="white" strokeWidth="2"/><text x="784" y="644" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="774" y="650" width="20" height="14" rx="3" fill="#22C55E" opacity=".75"/><rect x="770" y="664" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".6"/>
      <line x1="774" y1="656" x2="762" y2="645" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="794" y1="656" x2="806" y2="645" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="814" cy="628" r="9" fill="#22C55E" stroke="white" strokeWidth="2" opacity=".8"/><text x="814" y="632" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="805" y="637" width="18" height="13" rx="3" fill="#22C55E" opacity=".68"/><rect x="801" y="650" width="26" height="9" rx="4" fill="#9CA3AF" opacity=".55"/>
      <line x1="805" y1="643" x2="793" y2="634" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="823" y1="643" x2="835" y2="634" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      <text x="804" y="690" fontFamily="sans-serif" fontSize="7.5" fill="rgba(34,197,94,.55)" textAnchor="middle">Pair 06 · ESG Obs.</text>

      {/* S2 M&A + InsurTech (wide) */}
      <polygon points="900,622 1132,518 1162,534 930,638" fill="url(#ldeskNav)" stroke="rgba(232,66,106,.3)" strokeWidth=".9"/>
      <rect x="914" y="508" width="40" height="15" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".8"/>
      <rect x="964" y="502" width="40" height="15" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".8"/>
      <rect x="1020" y="498" width="40" height="15" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".8"/>
      <rect x="1070" y="492" width="40" height="15" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".8"/>
      {/* 4 seated students, clean */}
      <circle cx="934" cy="656" r="10" fill="#E8426A" stroke="white" strokeWidth="2"/><text x="934" y="660" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="924" y="666" width="20" height="14" rx="3" fill="#E8426A" opacity=".75"/><rect x="920" y="680" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".6"/>
      <line x1="924" y1="672" x2="912" y2="661" stroke="#E8426A" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="944" y1="672" x2="956" y2="661" stroke="#E8426A" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="984" cy="648" r="10" fill="#E8426A" stroke="white" strokeWidth="2" opacity=".82"/><text x="984" y="652" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="974" y="658" width="20" height="14" rx="3" fill="#E8426A" opacity=".7"/><rect x="970" y="672" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".55"/>
      <line x1="974" y1="664" x2="962" y2="653" stroke="#E8426A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="994" y1="664" x2="1006" y2="653" stroke="#E8426A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="1040" cy="642" r="10" fill="#F5A623" stroke="white" strokeWidth="2"/><text x="1040" y="646" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1030" y="652" width="20" height="14" rx="3" fill="#F5A623" opacity=".75"/><rect x="1026" y="666" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".6"/>
      <line x1="1030" y1="658" x2="1018" y2="647" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="1050" y1="658" x2="1062" y2="647" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="1090" cy="634" r="10" fill="#F5A623" stroke="white" strokeWidth="2" opacity=".82"/><text x="1090" y="638" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1080" y="644" width="20" height="14" rx="3" fill="#F5A623" opacity=".7"/><rect x="1076" y="658" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".55"/>
      <text x="1014" y="708" fontFamily="sans-serif" fontSize="7.5" fill="rgba(232,66,106,.55)" textAnchor="middle">Pair 07+08 · M&amp;A Simulator · InsurTech</text>

      {/* S3 Lending */}
      <polygon points="1200,590 1314,538 1334,550 1220,602" fill="url(#ldeskNav)" stroke="rgba(0,201,167,.3)" strokeWidth=".9"/>
      <rect x="1210" y="528" width="36" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".8"/>
      <rect x="1252" y="522" width="36" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".8"/>
      <circle cx="1228" cy="616" r="10" fill="#00C9A7" stroke="white" strokeWidth="2"/><text x="1228" y="620" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1218" y="626" width="20" height="14" rx="3" fill="#00C9A7" opacity=".75"/><rect x="1214" y="640" width="28" height="10" rx="4" fill="#9CA3AF" opacity=".6"/>
      <line x1="1218" y1="632" x2="1206" y2="621" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="1238" y1="632" x2="1250" y2="621" stroke="#00C9A7" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="1274" cy="608" r="9" fill="#00C9A7" stroke="white" strokeWidth="2" opacity=".82"/><text x="1274" y="612" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1265" y="617" width="18" height="13" rx="3" fill="#00C9A7" opacity=".68"/><rect x="1261" y="630" width="26" height="9" rx="4" fill="#9CA3AF" opacity=".55"/>
      <text x="1252" y="660" fontFamily="sans-serif" fontSize="7.5" fill="rgba(0,201,167,.55)" textAnchor="middle">Pair 09 · Lending Tech</text>

      {/* WEST WALL */}
      <polygon points="724,570 760,552 762,632 726,650" fill="url(#ldeskNav)" stroke="rgba(107,63,160,.28)" strokeWidth=".9"/>
      <rect x="730" y="560" width="14" height="26" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/>
      <rect x="730" y="592" width="14" height="26" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/>
      <circle cx="774" cy="590" r="9" fill="#6B3FA0" stroke="white" strokeWidth="2"/><text x="774" y="594" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="760" y="583" width="14" height="14" rx="3" fill="#6B3FA0" opacity=".7"/><rect x="748" y="581" width="10" height="20" rx="4" fill="#9CA3AF" opacity=".6"/>
      <circle cx="774" cy="626" r="9" fill="#6B3FA0" stroke="white" strokeWidth="2" opacity=".8"/><text x="774" y="630" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="760" y="619" width="14" height="14" rx="3" fill="#6B3FA0" opacity=".65"/><rect x="748" y="617" width="10" height="20" rx="4" fill="#9CA3AF" opacity=".5"/>

      {/* OPEN CENTRE ACTIVITIES */}
      {/* Collab group 1 (teal + purple standing) */}
      <circle cx="906" cy="728" r="11" fill="#00C9A7" stroke="white" strokeWidth="2" filter="url(#lgl2)"/><text x="906" y="732" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="896" y="739" width="20" height="15" rx="4" fill="#00C9A7" opacity=".75"/>
      <circle cx="934" cy="718" r="11" fill="#6B3FA0" stroke="white" strokeWidth="2" opacity=".88"/><text x="934" y="722" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="924" y="729" width="20" height="15" rx="4" fill="#6B3FA0" opacity=".75"/>
      <rect x="936" y="700" width="74" height="14" rx="5" fill="#07112E" opacity=".72"/>
      <text x="973" y="711" fontFamily="sans-serif" fontSize="7" fill="#00C9A7" textAnchor="middle">💬 Sprint retro</text>

      {/* Collab group 2 (amber + rose standing) */}
      <circle cx="1136" cy="718" r="11" fill="#F5A623" stroke="white" strokeWidth="2" opacity=".88"/><text x="1136" y="722" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1126" y="729" width="20" height="15" rx="4" fill="#F5A623" opacity=".75"/>
      <circle cx="1164" cy="708" r="11" fill="#E8426A" stroke="white" strokeWidth="2" opacity=".85"/><text x="1164" y="712" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <rect x="1154" y="719" width="20" height="15" rx="4" fill="#E8426A" opacity=".75"/>
      <rect x="1080" y="700" width="60" height="14" rx="5" fill="#07112E" opacity=".72"/>
      <text x="1110" y="711" fontFamily="sans-serif" fontSize="7" fill="#F5A623" textAnchor="middle">⚡ Stablecoin</text>

      {/* MIRO board floating in centre */}
      <polygon points="908,552 1140,448 1164,462 932,566" fill="#071022" stroke="#06B6D4" strokeWidth="1.5"/>
      <polygon points="912,556 1136,452 1160,466 936,570" fill="rgba(6,182,212,.12)"/>
      <text x="1036" y="512" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="700" fill="#06B6D4" textAnchor="middle">🎯 LIVE COLLABORATION BOARD</text>
      <rect x="920" y="524" width="36" height="22" rx="3" fill="#FEF9C3" stroke="#F59E0B" strokeWidth=".8"/><text x="938" y="538" fontFamily="sans-serif" fontSize="6.5" fill="#92400E" textAnchor="middle">UPI map</text>
      <rect x="964" y="518" width="36" height="22" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth=".8"/><text x="982" y="532" fontFamily="sans-serif" fontSize="6.5" fill="#065F46" textAnchor="middle">AI lending</text>
      <rect x="1008" y="514" width="36" height="22" rx="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth=".8"/><text x="1026" y="528" fontFamily="sans-serif" fontSize="6.5" fill="#4C1D95" textAnchor="middle">ESG risk</text>
      <rect x="1052" y="508" width="36" height="22" rx="3" fill="#FEE2E2" stroke="#EF4444" strokeWidth=".8"/><text x="1070" y="522" fontFamily="sans-serif" fontSize="6.5" fill="#991B1B" textAnchor="middle">M&amp;A deal</text>
      <rect x="1096" y="502" width="46" height="22" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth=".8"/><text x="1119" y="516" fontFamily="sans-serif" fontSize="6.5" fill="#075985" textAnchor="middle">Stablecoin ⛓</text>

      {/* CAPSTONE PRESENTER */}
      <circle cx="1052" cy="778" r="14" fill="#b39dff" stroke="white" strokeWidth="2.5" filter="url(#lgl2)"/><text x="1052" y="782" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">P</text>
      <rect x="1038" y="792" width="28" height="18" rx="4" fill="#b39dff" opacity=".75"/>
      <rect x="1042" y="810" width="8" height="10" rx="2" fill="#b39dff" opacity=".6"/><rect x="1054" y="810" width="8" height="10" rx="2" fill="#b39dff" opacity=".6"/>
      <line x1="1038" y1="800" x2="1016" y2="786" stroke="#b39dff" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="1066" y1="800" x2="1088" y2="786" stroke="#b39dff" strokeWidth="3.5" strokeLinecap="round"/>
      <text x="1052" y="826" fontFamily="sans-serif" fontSize="8.5" fill="#6B3FA0" textAnchor="middle" fontWeight="700">🎤 Capstone Demo Day</text>

      {/* Living green wall right */}
      <polygon points="1384,362 1400,370 1400,780 1384,772" fill="rgba(34,197,94,.16)" stroke="#22C55E" strokeWidth="1"/>
      <circle cx="1392" cy="388" r="10" fill="#22C55E" opacity=".62"/><circle cx="1392" cy="420" r="8" fill="#15803D" opacity=".52"/>
      <circle cx="1392" cy="452" r="10" fill="#22C55E" opacity=".57"/><circle cx="1392" cy="484" r="8" fill="#15803D" opacity=".52"/>
      <circle cx="1392" cy="516" r="10" fill="#22C55E" opacity=".62"/><circle cx="1392" cy="548" r="8" fill="#15803D" opacity=".52"/>
      <circle cx="1392" cy="580" r="10" fill="#22C55E" opacity=".57"/><circle cx="1392" cy="612" r="8" fill="#15803D" opacity=".52"/>
      <circle cx="1392" cy="644" r="9" fill="#22C55E" opacity=".62"/><circle cx="1392" cy="676" r="8" fill="#15803D" opacity=".52"/>
      <circle cx="1392" cy="708" r="9" fill="#22C55E" opacity=".57"/><circle cx="1392" cy="740" r="7" fill="#15803D" opacity=".5"/>

      {/* Industry Connect Lounge */}
      <polygon points="1292,568 1384,524 1384,776 1292,820" fill="rgba(107,63,160,.08)" stroke="#6B3FA0" strokeWidth="1.2"/>
      <polygon points="1302,594 1382,554 1382,584 1302,624" fill="#071022" stroke="#6B3FA0" strokeWidth=".8"/>
      <text x="1344" y="572" fontFamily="sans-serif" fontSize="7.5" fill="#b39dff" textAnchor="middle">CXO Mentor</text>
      <text x="1344" y="584" fontFamily="sans-serif" fontSize="7.5" fill="#b39dff" textAnchor="middle">Sessions</text>
      <rect x="1304" y="674" width="70" height="22" rx="8" fill="#6B3FA0" opacity=".4"/>
      <rect x="1304" y="664" width="70" height="14" rx="5" fill="#6B3FA0" opacity=".55"/>
      <circle cx="1322" cy="662" r="9" fill="#b39dff" opacity=".7"/><text x="1322" y="666" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">M</text>
      <circle cx="1358" cy="660" r="9" fill="#b39dff" opacity=".65"/><text x="1358" y="664" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">S</text>
      <text x="1344" y="750" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fontWeight="700" fill="#b39dff" textAnchor="middle">Industry Connect</text>
      <text x="1344" y="762" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fontWeight="700" fill="#b39dff" textAnchor="middle">Lounge</text>

      {/* STAT BADGES top row RIGHT panel */}
      <rect x="706" y="50" width="116" height="36" rx="7" fill="rgba(245,166,35,.14)" stroke="rgba(245,166,35,.3)" strokeWidth="1"/>
      <text x="764" y="65" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="12" fill="#F5A623" textAnchor="middle" fontWeight="800">Standup ⚡</text>
      <text x="764" y="79" fontFamily="sans-serif" fontSize="7" fill="rgba(245,166,35,.65)" textAnchor="middle">Agile Zone</text>

      <rect x="830" y="50" width="116" height="36" rx="7" fill="rgba(0,201,167,.14)" stroke="rgba(0,201,167,.3)" strokeWidth="1"/>
      <text x="888" y="65" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="18" fill="#00C9A7" textAnchor="middle" fontWeight="800">10</text>
      <text x="888" y="79" fontFamily="sans-serif" fontSize="7" fill="rgba(0,201,167,.65)" textAnchor="middle">Perimeter Stations</text>

      <rect x="954" y="50" width="116" height="36" rx="7" fill="rgba(107,63,160,.14)" stroke="rgba(107,63,160,.3)" strokeWidth="1"/>
      <text x="1012" y="65" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="18" fill="#b39dff" textAnchor="middle" fontWeight="800">20</text>
      <text x="1012" y="79" fontFamily="sans-serif" fontSize="7" fill="rgba(155,117,255,.65)" textAnchor="middle">Peer Seats (2 each)</text>

      <rect x="1078" y="50" width="156" height="36" rx="7" fill="rgba(245,166,35,.14)" stroke="rgba(245,166,35,.3)" strokeWidth="1"/>
      <text x="1156" y="64" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="12" fill="#F5A623" textAnchor="middle" fontWeight="800">500+ Years</text>
      <text x="1156" y="79" fontFamily="sans-serif" fontSize="7" fill="rgba(245,166,35,.65)" textAnchor="middle">Collective Fintech Expertise</text>

      <rect x="1242" y="50" width="154" height="36" rx="7" fill="rgba(232,66,106,.14)" stroke="rgba(232,66,106,.3)" strokeWidth="1"/>
      <text x="1319" y="63" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fill="#ff9ab5" textAnchor="middle" fontWeight="800">CROs · CDOs · CPOs</text>
      <text x="1319" y="79" fontFamily="sans-serif" fontSize="7" fill="rgba(255,154,181,.65)" textAnchor="middle">Top Industry Mentors</text>

      {/* Learning is a Passion badge */}
      <rect x="1258" y="738" width="130" height="36" rx="8" fill="rgba(0,201,167,.12)" stroke="rgba(0,201,167,.3)" strokeWidth="1"/>
      <text x="1323" y="754" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill="#00C9A7" textAnchor="middle" fontWeight="800">Learning is a</text>
      <text x="1323" y="768" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill="#00C9A7" textAnchor="middle" fontWeight="800">Passion ❤️</text>

      <text x="1050" y="820" fontFamily="sans-serif" fontSize="9.5" fill="rgba(255,255,255,.2)" textAnchor="middle">Fintech &amp; AI Innovation Lab · Perimeter Peer Model · Upskillize Solutions · India's First</text>
    </svg>
            <div className="perimeter-header">
              <div>
                <div className="ph-title">FinTech &amp; AI Innovation Lab — Floor Plan (Top View)</div>
                <div className="ph-sub">Perimeter ring · Standup Agile Zone NW · Open innovation floor centre</div>
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <span style={{background:"rgba(0,201,167,.18)",border:"1px solid #00C9A7",borderRadius:"5px",padding:"3px 10px",fontFamily:"var(--fm)",fontSize:"9px",fontWeight:"700",color:"#00C9A7"}}>~1,200 sq ft</span>
                <span style={{background:"rgba(107,63,160,.18)",border:"1px solid #b39dff",borderRadius:"5px",padding:"3px 10px",fontFamily:"var(--fm)",fontSize:"9px",fontWeight:"700",color:"#b39dff"}}>10 zones</span>
              </div>
            </div>
            <div className="lab3d-caption">
              <div>
                <div className="lab3d-caption-title">FinTech &amp; AI Innovation Lab — Perimeter Peer Layout</div>
                <div className="lab3d-caption-sub">10 dual-monitor perimeter stations · 6 open-centre zones · Agile Standup · ESG Observatory · Capital Markets Desk</div>
              </div>
              <div className="lab3d-pills">
                <span className="lab3d-pill t">Fintech Zone</span>
                <span className="lab3d-pill p">AI Builder</span>
                <span className="lab3d-pill a">Risk Bay</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div className="marquee-strip">
          <div className="marquee-inner">
            {["AGILE STANDUP ZONE","RISK SIMULATION BAY","AI BUILDER ZONE","ESG OBSERVATORY","CAPITAL MARKETS DESK","OPEN BANKING · PAYMENT RAILS","BLOCKCHAIN & STABLECOINS","ROBO ADVISORY ENGINE","WEALTHTECH · LENDING TECH","INDIA'S FIRST · UPSKILLIZE","TRADING APP SIMULATOR","INSURANCE LOSS MODELLING","ESG OBSERVATORY","RISK SIMULATION BAY","M&A DEAL SIMULATOR","OPEN BANKING · PAYMENT RAILS","BLOCKCHAIN & STABLECOINS","ROBO ADVISORY ENGINE","WEALTHTECH · LENDING TECH","INDIA'S FIRST · UPSKILLIZE"].map((item,i)=>(
              <span className="marquee-item" key={i}><span className="marquee-dot"></span>{item}</span>
            ))}
          </div>
        </div>

        {/* ── 6 LIVE FOCUS ZONES ── */}
        <section className="fa-section" id="focus-zones">
          <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative",zIndex:1}}>
            <div className="fa-eyebrow">6 Live Focus Zones</div>
            <h2 className="fa-title">Every Zone Is a <span className="ht">Different World.</span><br/>Together They Build a <span className="ht">Complete Career.</span></h2>
            <p className="fa-subtitle">The open centre of the FinTech &amp; AI Innovation Lab isn't empty floor space — it's a live, always-on multi-zone innovation engine. 6 distinct zones, each with its own culture, tools, and energy.</p>
            <div className="fa-grid reveal">
              <div className="fa-card c3">
                <div className="fa-icon">⚡</div>
                <div className="fa-tagline">Zone 01 · NW Corner</div>
                <div className="fa-name">Agile Standup Zone</div>
                <div className="fa-catch">"No chairs. No excuses. Ship it."</div>
                <div className="fa-desc">The only place in the lab with no seats. Students stand every morning for a 15-minute sprint standup — exactly like Razorpay, Zerodha, and HDFC Digital do. Physical Kanban wall mirrored live to the display wall. SAFe ceremonies, PI planning, and retrospectives happen here.</div>
                <div className="fa-tools"><span className="fa-tool">Agile Sprint Board</span><span className="fa-tool">SAFe 6.0</span><span className="fa-tool">Kanban Board</span><span className="fa-tool">PI Planning</span></div>
              </div>
              <div className="fa-card c2">
                <div className="fa-icon">🤖</div>
                <div className="fa-tagline">Zone 02 · North-East</div>
                <div className="fa-name">AI Builder Zone</div>
                <div className="fa-catch">"Train it. Deploy it. Break the bank with it."</div>
                <div className="fa-desc">Where credit models get trained, LLMs get queried for compliance summaries, and fraud detection engines get stress-tested. Students build production-grade AI — not toy demos. OpenClaw AI, RiskGPT, Python notebooks, and Emergent AI running side by side.</div>
                <div className="fa-tools"><span className="fa-tool">RiskGPT</span><span className="fa-tool">OpenClaw AI</span><span className="fa-tool">Python · Jupyter</span><span className="fa-tool">Emergent AI</span><span className="fa-tool">Power BI</span></div>
              </div>
              <div className="fa-card c4">
                <div className="fa-icon">⚠️</div>
                <div className="fa-tagline">Zone 03 · East Wall</div>
                <div className="fa-name">Risk Simulation Bay</div>
                <div className="fa-catch">"Stress-test everything. Break it before the market does."</div>
                <div className="fa-desc">A live risk war room — Basel IV capital adequacy models, FRTB market risk simulations, AML alert workflows, and VaR stress-testing all running in real-time. Students see how Yes Bank failed, how IL&amp;FS collapsed, and how to build the guardrails that prevent it.</div>
                <div className="fa-tools"><span className="fa-tool">Basel IV Models</span><span className="fa-tool">FRTB Simulator</span><span className="fa-tool">AML / KYC Engine</span><span className="fa-tool">FRM Case Sets</span><span className="fa-tool">Stress Testing</span></div>
              </div>
              <div className="fa-card c5">
                <div className="fa-icon">🌱</div>
                <div className="fa-tagline">Zone 04 · South-East</div>
                <div className="fa-name">ESG Observatory</div>
                <div className="fa-catch">"The planet is a balance sheet. Learn to read it."</div>
                <div className="fa-desc">India's only student-facing ESG lab in a BFSI context. Scope 1, 2 &amp; 3 emissions mapping. BRSR reporting templates. RBI green taxonomy applied to real loan portfolios. Cradle-to-Cradle circular finance models. Students publish real ESG scorecards for Indian banks.</div>
                <div className="fa-tools"><span className="fa-tool">Scope 1–3 Mapping</span><span className="fa-tool">BRSR Templates</span><span className="fa-tool">RBI Green Taxonomy</span><span className="fa-tool">C2C Finance</span><span className="fa-tool">PPP Structures</span></div>
              </div>
              <div className="fa-card c3">
                <div className="fa-icon">📈</div>
                <div className="fa-tagline">Zone 05 · South Wall</div>
                <div className="fa-name">Capital Markets Desk</div>
                <div className="fa-catch">"Price it. Hedge it. Win it."</div>
                <div className="fa-desc">A Bloomberg-inspired trading desk simulation — fixed income pricing, derivatives modelling, IRS swap valuation, treasury ALM, and M&amp;A deal structuring running simultaneously. The Corporate M&amp;A Simulator puts students through full DCF valuation, synergy modelling, and post-merger integration.</div>
                <div className="fa-tools"><span className="fa-tool">Bloomberg BMC</span><span className="fa-tool">M&amp;A Simulator</span><span className="fa-tool">ALM / FTP Engine</span><span className="fa-tool">Bond Pricing</span><span className="fa-tool">FRTB / VaR</span></div>
              </div>
              <div className="fa-card c6">
                <div className="fa-icon">🎯</div>
                <div className="fa-tagline">Zone 06 · Central Open Floor</div>
                <div className="fa-name">Fintech Innovation Studio</div>
                <div className="fa-catch">"Build it. Break it. Ship it. Repeat."</div>
                <div className="fa-desc">The open centre becomes the birthplace of India's next fintech startups. Students co-build real products: payment apps on UPI rails, robo-advisory prototypes, stablecoin white papers, insurance claim automation demos, and CBDC simulation dashboards. Figma prototypes. Lean Canvas models. VC pitch critiques.</div>
                <div className="fa-tools"><span className="fa-tool">Startup Lab</span><span className="fa-tool">Figma Prototypes</span><span className="fa-tool">VC Pitch Studio</span><span className="fa-tool">Lean Canvas</span><span className="fa-tool">Capstone Demo Day</span></div>
              </div>
            </div>
            <div style={{marginTop:"32px",background:"rgba(0,201,167,.08)",border:"1px solid rgba(0,201,167,.2)",borderRadius:"14px",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"14px",position:"relative",zIndex:1}}>
              <div>
                <div style={{fontFamily:"var(--fd)",fontSize:"15px",fontWeight:"700",color:"#fff",marginBottom:"5px"}}>All 6 zones fire simultaneously. Students rotate freely. Ideas cross-pollinate naturally.</div>
                <div style={{fontSize:"13px",color:"rgba(255,255,255,.55)"}}>This is the FinTech &amp; AI Innovation Lab. India's first. Designed by Upskillize. Built for your campus.</div>
              </div>
              <Link to="/connect" style={{background:"linear-gradient(135deg,var(--t),var(--td))",color:"var(--navy)",fontWeight:"700",fontSize:"13px",padding:"12px 26px",borderRadius:"10px",whiteSpace:"nowrap",textDecoration:"none",boxShadow:"0 0 24px rgba(0,201,167,.28)",flexShrink:0}}>Bring This to Your Campus →</Link>
            </div>
          </div>
        </section>

        {/* ── COVERAGE SPECTRUM ── */}
        <section className="sec sec-alt coverage-sec" id="coverage">
          <div className="sc">
            <div className="sec-label">Complete BFSI Spectrum</div>
            <h2 className="sec-title">Every Vertical. <span className="ht">One War Room.</span></h2>
            <p className="sec-sub">The only innovation lab in India covering the complete BFSI ecosystem — from retail banking to capital markets, InsurTech to RegTech, ESG reporting to Core Banking systems.</p>
          </div>
          <div className="coverage-inner reveal">
            <div className="cov-list">
              {[
                {dot:"#00C9A7",shadow:"rgba(0,201,167,.5)",label:"Banking & Fintech",pct:"95%",w:95,grad:"#009E85,#00C9A7"},
                {dot:"#E8426A",shadow:"rgba(232,66,106,.5)",label:"InsurTech & Wealth",pct:"90%",w:90,grad:"#c0405a,#E8426A"},
                {dot:"#6B3FA0",shadow:"rgba(107,63,160,.5)",label:"AI, GenAI & Emerging Tech",pct:"93%",w:93,grad:"#4E2D7A,#6B3FA0"},
                {dot:"#F5A623",shadow:"rgba(245,166,35,.5)",label:"Capital Markets & Treasury",pct:"88%",w:88,grad:"#C07A10,#F5A623"},
                {dot:"#22C55E",shadow:"rgba(34,197,94,.5)",label:"ESG & Sustainable Finance",pct:"85%",w:85,grad:"#15803D,#22C55E"},
                {dot:"#00C9A7",shadow:"rgba(0,201,167,.4)",label:"Core Banking & ERP",pct:"92%",w:92,grad:"#009E85,#00C9A7"},
                {dot:"#6B3FA0",shadow:"rgba(107,63,160,.4)",label:"RegTech & Compliance",pct:"91%",w:91,grad:"#4E2D7A,#6B3FA0"},
                {dot:"#F5A623",shadow:"none",label:"Risk Management",pct:"94%",w:94,grad:"#C07A10,#F5A623"},
              ].map((item,i)=>(
                <div className={`cov-item reveal${i>0?" d"+Math.min(i,3):""}`} key={item.label}>
                  <div className="cov-dot" style={{background:item.dot,boxShadow:item.shadow!=="none"?`0 0 8px ${item.shadow}`:"none"}}></div>
                  <div className="cov-label">{item.label}</div>
                  <div className="cov-pct">{item.pct}</div>
                  <div className="cov-bar-wrap"><div className="cov-bar-track"><div className="cov-bar-fill" data-w={item.w} style={{background:`linear-gradient(90deg,${item.grad})`}}></div></div></div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <svg viewBox="0 0 320 300" width="320">
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00C9A7" stopOpacity=".3"/>
                    <stop offset="100%" stopColor="#6B3FA0" stopOpacity=".3"/>
                  </linearGradient>
                </defs>
                <polygon points="160,30 240,80 260,165 200,240 120,240 60,165 80,80" fill="none" stroke="#E2E8F4" strokeWidth="1"/>
                <polygon points="160,55 225,95 242,165 192,225 128,225 78,165 95,95" fill="none" stroke="#E2E8F4" strokeWidth="1"/>
                <polygon points="160,80 210,110 224,165 184,210 136,210 96,165 110,110" fill="none" stroke="#E2E8F4" strokeWidth="1"/>
                <polygon points="160,105 195,125 206,165 176,195 144,195 114,165 125,125" fill="none" stroke="#E2E8F4" strokeWidth="1"/>
                <line x1="160" y1="30" x2="160" y2="240" stroke="#E2E8F4" strokeWidth="1"/>
                <line x1="80" y1="80" x2="240" y2="240" stroke="#E2E8F4" strokeWidth="1"/>
                <line x1="240" y1="80" x2="80" y2="240" stroke="#E2E8F4" strokeWidth="1"/>
                <line x1="60" y1="165" x2="260" y2="165" stroke="#E2E8F4" strokeWidth="1"/>
                <polygon points="160,35 237,82 254,163 195,236 125,236 66,163 83,82" fill="url(#radarFill)" stroke="url(#radarFill)" strokeWidth="2"/>
                <circle cx="160" cy="35" r="4" fill="#00C9A7"/>
                <circle cx="237" cy="82" r="4" fill="#E8426A"/>
                <circle cx="254" cy="163" r="4" fill="#6B3FA0"/>
                <circle cx="195" cy="236" r="4" fill="#F5A623"/>
                <circle cx="125" cy="236" r="4" fill="#22C55E"/>
                <circle cx="66" cy="163" r="4" fill="#00C9A7"/>
                <circle cx="83" cy="82" r="4" fill="#6B3FA0"/>
                <text x="160" y="22" fontFamily="'DM Sans'" fontSize="9" fill="#07112E" textAnchor="middle" fontWeight="600">Banking</text>
                <text x="252" y="76" fontFamily="'DM Sans'" fontSize="9" fill="#E8426A" textAnchor="start" fontWeight="600">InsurTech</text>
                <text x="266" y="166" fontFamily="'DM Sans'" fontSize="9" fill="#6B3FA0" textAnchor="start" fontWeight="600">AI/ML</text>
                <text x="200" y="252" fontFamily="'DM Sans'" fontSize="9" fill="#C07A10" textAnchor="middle" fontWeight="600">Markets</text>
                <text x="120" y="252" fontFamily="'DM Sans'" fontSize="9" fill="#15803D" textAnchor="middle" fontWeight="600">ESG</text>
                <text x="42" y="166" fontFamily="'DM Sans'" fontSize="9" fill="#00C9A7" textAnchor="end" fontWeight="600">Core Banking</text>
                <text x="70" y="76" fontFamily="'DM Sans'" fontSize="9" fill="#6B3FA0" textAnchor="end" fontWeight="600">RegTech</text>
                <text x="160" y="158" fontFamily="'Plus Jakarta Sans'" fontSize="11" fill="#07112E" textAnchor="middle" fontWeight="800">BFSI</text>
                <text x="160" y="172" fontFamily="'DM Sans'" fontSize="9" fill="#7A8CAB" textAnchor="middle">Full Spectrum</text>
              </svg>
              <div style={{fontSize:"12px",color:"var(--tx3)",fontFamily:"var(--fm)",letterSpacing:".5px",marginTop:"8px"}}>BFSI COVERAGE RADAR</div>
            </div>
          </div>
        </section>

        {/* ── FRAMEWORK ZONES ── */}
        <section className="sec" id="framework">
          <div className="sc">
            <div className="sec-label">Complete Lab Framework</div>
            <h2 className="sec-title">10 Framework Zones. <span className="ht">Every Module.</span> <span className="hp">One Lab.</span></h2>
            <p className="sec-sub">India's most comprehensive FinTech &amp; AI Innovation Lab framework — every zone, live tool, and peer-working station faithfully delivered at your campus by Upskillize Solutions.</p>
          </div>
          <div className="fw-outer reveal">
            <div className="fw-title">FinTech &amp; AI Innovation Lab — <span>Upskillize</span> Delivery Framework</div>
            <div className="fw-subtitle">India's first FinTech &amp; AI Innovation Lab · Peer Working · Open Banking · Blockchain · WealthTech · Risk · ESG · Capital Markets</div>
            <div className="zg">
              <div className="zone zt">
                <div className="z-head"><div className="z-icon">🏦</div><div className="z-title">Fintech sandbox zone</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">UPI / NACH simulator</div><div className="mc-s">RBI sandbox replication</div></div>
                  <div className="mc"><div className="mc-n">Digital lending flow</div><div className="mc-s">CIBIL / bureau mock</div></div>
                  <div className="mc"><div className="mc-n">Open banking APIs</div><div className="mc-s">PSD2, AA, UPI 2.0, OCEN</div></div>
                  <div className="mc"><div className="mc-n">New Product Approval</div><div className="mc-s">NPA workflow, credit committee</div></div>
                  <div className="mc"><div className="mc-n">Fintech Revenue Models</div><div className="mc-s">SaaS, BaaS, API, BNPL</div></div>
                  <div className="mc"><div className="mc-n">Insurance tech flows</div><div className="mc-s">IRDAI use cases</div></div>
                  <div className="mc" style={{borderLeft:"3px solid var(--t)"}}><div className="mc-n" style={{color:"var(--td)"}}>Digital Lending Simulator</div><div className="mc-s">End-to-end digital loan origination, underwriting, bureau pull, disbursement &amp; collections lifecycle</div></div>
                  <div className="mc" style={{borderLeft:"3px solid var(--p)"}}><div className="mc-n" style={{color:"var(--pd)"}}>Corporate M&amp;A Simulator</div><div className="mc-s">Deal structuring, due diligence, valuation, synergy modelling &amp; post-merger integration scenarios</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>Industry coverage</span><span>92%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="92"></div></div></div>
                <div className="z-note">Upskillize: BFSI Domain Excellence modules</div>
              </div>
              <div className="zone zp">
                <div className="z-head"><div className="z-icon">🤖</div><div className="z-title">AI &amp; analytics studio</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Credit risk ML models</div><div className="mc-s">Python / Jupyter lab</div></div>
                  <div className="mc"><div className="mc-n">Power BI dashboards</div><div className="mc-s">BFSI KPI analytics</div></div>
                  <div className="mc"><div className="mc-n">GenAI in banking</div><div className="mc-s">LLM for compliance</div></div>
                  <div className="mc"><div className="mc-n">Fraud detection lab</div><div className="mc-s">Anomaly models</div></div>
                  <div className="mc"><div className="mc-n">OpenClaw AI</div><div className="mc-s">Legal &amp; compliance automation</div></div>
                  <div className="mc"><div className="mc-n">Emergent AI</div><div className="mc-s">Risk scenario simulation</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>Employer demand alignment</span><span>96%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="96"></div></div></div>
                <div className="z-note">Upskillize: Data to Decisions + GenAI courses</div>
              </div>
              <div className="zone za">
                <div className="z-head"><div className="z-icon">🎯</div><div className="z-title">Product &amp; design thinking lab</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Figma / UX tools</div><div className="mc-s">Banking app prototypes</div></div>
                  <div className="mc"><div className="mc-n">Lean canvas workshop</div><div className="mc-s">Fintech business model</div></div>
                  <div className="mc"><div className="mc-n">Agile sprints (SAFe)</div><div className="mc-s">PI planning simulation</div></div>
                  <div className="mc"><div className="mc-n">Pitch deck studio</div><div className="mc-s">VC / investor readiness</div></div>
                  <div className="mc" style={{gridColumn:"span 2",borderLeft:"3px solid var(--p)",background:"linear-gradient(135deg,var(--pl),#fff 80%)"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:"10px"}}>
                      <div style={{flexShrink:0,width:"32px",height:"32px",borderRadius:"8px",background:"var(--pl)",border:"1.5px solid var(--pb)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px"}}>🤖</div>
                      <div style={{flex:1}}>
                        <div className="mc-n" style={{color:"var(--pd)",marginBottom:"5px"}}>Upskillize AI Products Development</div>
                        <div className="mc-s" style={{marginBottom:"8px"}}>Students co-build and test Upskillize's production-grade AI tools — real products solving real BFSI problems</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                          <span style={{background:"rgba(107,63,160,.12)",border:"1px solid var(--pb)",color:"var(--pd)",fontSize:"9.5px",fontWeight:600,padding:"3px 9px",borderRadius:"14px"}}>📊 ALM / FTP Engine</span>
                          <span style={{background:"rgba(232,66,106,.1)",border:"1px solid rgba(232,66,106,.25)",color:"var(--r)",fontSize:"9.5px",fontWeight:600,padding:"3px 9px",borderRadius:"14px"}}>🧠 RiskGPT</span>
                          <span style={{background:"rgba(245,166,35,.12)",border:"1px solid var(--ab)",color:"var(--ad)",fontSize:"9.5px",fontWeight:600,padding:"3px 9px",borderRadius:"14px"}}>🔍 AuditIQ</span>
                          <span style={{background:"rgba(232,66,106,.1)",border:"1px solid rgba(232,66,106,.25)",color:"var(--r)",fontSize:"9.5px",fontWeight:600,padding:"3px 9px",borderRadius:"14px"}}>🔺 Fraud Risk &amp; Analytics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mc" style={{gridColumn:"span 2",borderLeft:"3px solid var(--t)",background:"linear-gradient(135deg,var(--tl),#fff 80%)"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:"10px"}}>
                      <div style={{flexShrink:0,width:"32px",height:"32px",borderRadius:"8px",background:"var(--tl)",border:"1.5px solid var(--tb)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px"}}>🚀</div>
                      <div style={{flex:1}}>
                        <div className="mc-n" style={{color:"var(--td)",marginBottom:"5px"}}>Startup Mentoring &amp; Readiness</div>
                        <div className="mc-s">End-to-end fintech startup journey — ideation to VC pitch. Mentor network, incubation guidance, business model stress-testing, regulatory sandbox navigation, and investor deck critique by industry practitioners</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>Startup &amp; product readiness</span><span>93%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="93"></div></div></div>
                <div className="z-note">Upskillize: AI PM + Mini CEO Program + AI Products Suite</div>
              </div>
              <div className="zone zr">
                <div className="z-head"><div className="z-icon">⚖️</div><div className="z-title">Risk &amp; compliance hub</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Basel III / IV cases</div><div className="mc-s">Capital adequacy models</div></div>
                  <div className="mc"><div className="mc-n">AML / KYC workflow</div><div className="mc-s">FATF / FIU scenarios</div></div>
                  <div className="mc"><div className="mc-n">DPDPA / cybersecurity</div><div className="mc-s">Data privacy lab</div></div>
                  <div className="mc"><div className="mc-n">Stress testing room</div><div className="mc-s">FRM / PRM case sets</div></div>
                  <div className="mc"><div className="mc-n">ESG Reporting Lab</div><div className="mc-s">Scope 1, 2 &amp; 3 mapping</div></div>
                  <div className="mc"><div className="mc-n">Green Finance Framework</div><div className="mc-s">RBI green taxonomy, BRSR</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>Regulatory depth</span><span>94%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="94"></div></div></div>
                <div className="z-note">Upskillize: BFSI + SCR + FRM cert tracks</div>
              </div>
            </div>
            <div className="zg">
              <div className="zone zr">
                <div className="z-head"><div className="z-icon">🛡️</div><div className="z-title">InsurTech &amp; wealth lab</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">InsurTech platforms</div><div className="mc-s">IRDAI sandbox, embedded ins.</div></div>
                  <div className="mc"><div className="mc-n">Claims &amp; underwriting AI</div><div className="mc-s">Automated loss assessment</div></div>
                  <div className="mc"><div className="mc-n">Wealth &amp; asset management</div><div className="mc-s">PMS, AIF, robo-advisory</div></div>
                  <div className="mc"><div className="mc-n">Bancassurance models</div><div className="mc-s">Cross-sell, distribution arch.</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>InsurTech coverage</span><span>91%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="91"></div></div></div>
                <div className="z-note">Upskillize: InsurTech + Wealth Management track</div>
              </div>
              <div className="zone zt">
                <div className="z-head"><div className="z-icon">🏛️</div><div className="z-title">Core banking &amp; ERP lab</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Oracle FLEXCUBE</div><div className="mc-s">Core banking simulation</div></div>
                  <div className="mc"><div className="mc-n">SAP Banking Core</div><div className="mc-s">Loans, deposits, treasury</div></div>
                  <div className="mc"><div className="mc-n">Org structure in banks</div><div className="mc-s">Hierarchy, governance lines</div></div>
                  <div className="mc"><div className="mc-n">Regulatory reporting</div><div className="mc-s">RBI returns, XBRL, audit</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>System access depth</span><span>89%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="89"></div></div></div>
                <div className="z-note">Upskillize: Core Banking &amp; ERP Systems track</div>
              </div>
              <div className="zone zp">
                <div className="z-head"><div className="z-icon">⚡</div><div className="z-title">Emerging AI tools studio</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">OpenClaw AI</div><div className="mc-s">Legal &amp; compliance automation</div></div>
                  <div className="mc"><div className="mc-n">Emergent AI</div><div className="mc-s">Risk scenario simulation</div></div>
                  <div className="mc"><div className="mc-n">AI in credit underwriting</div><div className="mc-s">Explainable AI, model risk</div></div>
                  <div className="mc"><div className="mc-n">RegTech automation</div><div className="mc-s">AML screening, surveillance AI</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>AI tool fluency</span><span>95%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="95"></div></div></div>
                <div className="z-note">Upskillize: Emerging AI in BFSI track</div>
              </div>
              <div className="zone za">
                <div className="z-head"><div className="z-icon">📈</div><div className="z-title">Capital markets &amp; treasury</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Fixed income &amp; derivatives</div><div className="mc-s">Bond pricing, IRS, swaps</div></div>
                  <div className="mc"><div className="mc-n">Treasury management</div><div className="mc-s">ALM, liquidity, FX risk</div></div>
                  <div className="mc"><div className="mc-n">FRTB / market risk</div><div className="mc-s">SA, IMA, P&amp;L attribution</div></div>
                  <div className="mc"><div className="mc-n">Equity &amp; mutual funds</div><div className="mc-s">SEBI regs, NAV computation</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>Markets depth</span><span>90%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="90"></div></div></div>
                <div className="z-note">Upskillize: Capital Markets + FRM track</div>
              </div>
            </div>
            <div className="zr2">
              <div className="zone zt">
                <div className="z-head"><div className="z-icon">🌐</div><div className="z-title">Industry connect lounge</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Live RegTech sessions</div><div className="mc-s">Compliance tech roundtables</div></div>
                  <div className="mc"><div className="mc-n">Hackathons &amp; ideathons</div><div className="mc-s">BFSI problem solving</div></div>
                </div>
                <div className="accent-box">Guest CXO lectures · Bank branch visits · Internship pipeline</div>
                <div className="z-bar" style={{marginTop:"10px"}}><div className="z-bar-lbl"><span>Industry network reach</span><span>88%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="88"></div></div></div>
                <div className="z-note">Upskillize: RegTech &amp; Compliance Network</div>
              </div>
              <div className="zone za">
                <div className="z-head"><div className="z-icon">🏅</div><div className="z-title">Certification &amp; LMS corner</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">CAIP / FRM / CDBL</div><div className="mc-s">Proctored cert exams</div></div>
                  <div className="mc"><div className="mc-n">lms.upskillize.com</div><div className="mc-s">Cohort progress view</div></div>
                </div>
                <div className="accent-box">Micro-credentials · Leaderboard · Placement readiness score</div>
                <div className="z-bar" style={{marginTop:"10px"}}><div className="z-bar-lbl"><span>Credential market recognition</span><span>84%</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="84"></div></div></div>
                <div className="z-note">Upskillize: LMS + certification infrastructure</div>
              </div>
            </div>
            <div className="capstone">
              <div className="cap-head"><div className="cap-icon">🚀</div><div className="cap-title">Capstone project bay — semester deliverables</div></div>
              <div className="cap-cards">
                <div className="cc"><div className="cc-emoji">🏗️</div><div className="cc-t" style={{color:"var(--td)"}}>Fintech startup plan</div><div className="cc-s">Full BMC + investor pitch</div></div>
                <div className="cc"><div className="cc-emoji">🧠</div><div className="cc-t" style={{color:"var(--pd)"}}>Credit model build</div><div className="cc-s">End-to-end ML project</div></div>
                <div className="cc"><div className="cc-emoji">📱</div><div className="cc-t" style={{color:"var(--ad)"}}>Digital bank redesign</div><div className="cc-s">UX + compliance fit</div></div>
                <div className="cc"><div className="cc-emoji">📊</div><div className="cc-t" style={{color:"var(--r)"}}>Risk framework paper</div><div className="cc-s">SEBI / RBI context</div></div>
              </div>
              <div className="cap-foot"><strong>Upskillize mentors review, co-certify, and provide industry validation on all capstone outputs</strong></div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="sec sec-alt" id="process">
          <div className="sc">
            <div className="sec-label">How It Works</div>
            <h2 className="sec-title">Your Lab Goes <span className="ht">Live in 5 Steps</span></h2>
            <p className="sec-sub">From partnership agreement to students walking into a fully operational lab — our process is designed to get you live in under 60 days with zero burden on your institution.</p>
          </div>
          <div className="process-steps reveal">
            {[
              {n:1,title:"🔍 Discovery Call",desc:"We understand your college's fintech programme, student profile, and infrastructure. Zero commitment needed."},
              {n:2,title:"🏗️ Lab Design",desc:"Upskillize delivers a custom floor plan, perimeter layout, software stack, and curriculum calendar for your campus."},
              {n:3,title:"⚙️ Setup & Install",desc:"Our team installs workstations, display walls, LMS connectivity, and simulator access. You watch it come alive."},
              {n:4,title:"🎓 Faculty Onboarding",desc:"Train-the-trainer program prepares your faculty to facilitate all zones. Upskillize experts co-deliver for the first semester."},
              {n:5,title:"🚀 Students Go Live",desc:"Day 1. First standup. First sprint board live. First simulation running. First peer pair working. The lab launches at full energy."},
            ].map(s=>(
              <div className="ps" key={s.n}>
                <div className="ps-num">{s.n}</div>
                <div className="ps-title">{s.title}</div>
                <div className="ps-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY UPSKILLIZE ── */}
        <section className="sec" id="why">
          <div className="sc">
            <div className="sec-label">Why Upskillize</div>
            <h2 className="sec-title">500+ Years of Collective FinTech Experience.<br/><span className="ht">Learning Is Our Passion. Excellence Is Our Standard.</span></h2>
            <p className="sec-sub">Our mentor and faculty network brings 500+ collective years of real fintech and banking experience — from CROs who've managed Basel crises, CDOs who've built data platforms, and CPOs who've launched products used by millions.</p>
          </div>
          <div className="why-grid">
            {[
              {icon:"🏆",title:"India's First. Period.",desc:"The only EdTech with a perimeter peer-model FinTech & AI Innovation Lab physically set up inside college campuses — covering Open Banking, Blockchain, WealthTech, InsurTech, Trading, ESG, and AI"},
              {icon:"🎓",title:"Mentored by CROs, CDOs & CPOs",desc:"Students are mentored by sitting Chief Risk Officers, Chief Data Officers, and Chief Product Officers from leading Indian banks and global fintechs — not retired professors. Live wisdom. Live network."},
              {icon:"❤️",title:"Learning Is a Passion",desc:"At Upskillize, learning isn't a product we sell — it's a fire we light. Every session, every tool, every case study is crafted with the obsession of a practitioner who never stopped being curious"},
              {icon:"🤖",title:"AI Domains You Actually Deploy",desc:"Robo-advisory, fraud detection, loss modelling, lending automation, trading apps, stablecoin design — students build production-grade AI on real BFSI data, not toy demos or case study PDFs"},
              {icon:"📦",title:"Lab-in-a-Box Delivery",desc:"Perimeter layout, all hardware, all 12 technology domain platforms, LMS config, faculty training — everything delivered. The college provides one room. Upskillize builds a world."},
              {icon:"🇮🇳",title:"India-First Always",desc:"HDFC, Zerodha, Paytm, RBI, SEBI, UPI, DPDPA — every simulation, every case study, every regulatory scenario is built for India. No borrowed curricula from foreign markets."},
              {icon:"📜",title:"Co-Certification That Matters",desc:"Upskillize + college jointly certify graduates. CRO-reviewed capstones. CDO-validated data projects. CAIP, CDBL, FRM tracks. Credentials that hiring managers in fintech immediately recognise."},
              {icon:"🔄",title:"Always-Current Curriculum",desc:"Blockchain forks, new SEBI regulations, emerging stablecoin guidelines, GenAI model updates — our curriculum refreshes every quarter. Students graduate knowing what's happening this week."},
            ].map((c,i)=>(
              <div className={`why-card reveal${i%4!==0?" d"+(i%4):""}`} key={c.title}>
                <div className="why-icon-wrap"><span style={{fontSize:"24px"}}>{c.icon}</span></div>
                <div className="why-title">{c.title}</div>
                <div className="why-desc">{c.desc}</div>
              </div>
            ))}
            <div className="why-card reveal" style={{gridColumn:"span 2"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
                <div className="why-icon-wrap" style={{flexShrink:0,background:"var(--gl)"}}><span style={{fontSize:"24px"}}>🌱</span></div>
                <div style={{flex:1}}>
                  <div className="why-title">ESG &amp; RegTech Ready — Full Sustainability Framework</div>
                  <div className="why-desc" style={{marginBottom:"12px"}}>Scope 1–3 emissions mapping, BRSR, RBI green taxonomy, and RegTech automation — the most comprehensive ESG module in Indian BFSI education.</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
                    <div style={{background:"var(--gl)",border:"1px solid var(--gb)",borderRadius:"8px",padding:"10px 12px"}}><div style={{fontSize:"11px",fontWeight:700,color:"#15803D",marginBottom:"4px"}}>📊 Scope 1 · 2 · 3 Reporting</div><div style={{fontSize:"10.5px",color:"var(--tx3)",lineHeight:1.5}}>Direct emissions, indirect energy, value chain — full GHG Protocol mapping with SEBI BRSR disclosure templates</div></div>
                    <div style={{background:"#E8F5E9",border:"1px solid rgba(34,197,94,.2)",borderRadius:"8px",padding:"10px 12px"}}><div style={{fontSize:"11px",fontWeight:700,color:"#15803D",marginBottom:"4px"}}>♻️ Cradle to Cradle (C2C)</div><div style={{fontSize:"10.5px",color:"var(--tx3)",lineHeight:1.5}}>Circular economy finance: closed-loop product design, regenerative business models, zero-waste banking portfolios &amp; green bonds</div></div>
                    <div style={{background:"#F1F8E9",border:"1px solid rgba(34,197,94,.2)",borderRadius:"8px",padding:"10px 12px"}}><div style={{fontSize:"11px",fontWeight:700,color:"#15803D",marginBottom:"4px"}}>🔄 Cradle to Grave (C2G)</div><div style={{fontSize:"10.5px",color:"var(--tx3)",lineHeight:1.5}}>Linear lifecycle assessment applied to BFSI asset portfolios &amp; stranded asset risk</div></div>
                    <div style={{background:"var(--tl)",border:"1px solid var(--tb)",borderRadius:"8px",padding:"10px 12px"}}><div style={{fontSize:"11px",fontWeight:700,color:"var(--td)",marginBottom:"4px"}}>🏛️ PPP Structures &amp; Green Finance</div><div style={{fontSize:"10.5px",color:"var(--tx3)",lineHeight:1.5}}>Public-Private Partnership financing models for sustainable infrastructure: viability gap funding, blended finance, green bonds &amp; RBI taxonomy</div></div>
                    <div style={{background:"var(--pl)",border:"1px solid var(--pb)",borderRadius:"8px",padding:"10px 12px"}}><div style={{fontSize:"11px",fontWeight:700,color:"var(--pd)",marginBottom:"4px"}}>📋 BRSR &amp; TCFD Reporting</div><div style={{fontSize:"10.5px",color:"var(--tx3)",lineHeight:1.5}}>Business Responsibility &amp; Sustainability Reporting — SEBI mandatory framework</div></div>
                    <div style={{background:"var(--al)",border:"1px solid var(--ab)",borderRadius:"8px",padding:"10px 12px"}}><div style={{fontSize:"11px",fontWeight:700,color:"var(--ad)",marginBottom:"4px"}}>⚡ RegTech Automation</div><div style={{fontSize:"10.5px",color:"var(--tx3)",lineHeight:1.5}}>AML surveillance AI, automated ESG scoring, compliance monitoring dashboards</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="div"></div>

        {/* ── UPSKILLIZE AI PRODUCTS ── */}
        <section className="sec" id="ai-products" style={{background:"linear-gradient(135deg,#07112E 0%,#0D1E4A 70%,#1A2D60 100%)"}}>
          <div className="sc">
            <div className="sec-label" style={{color:"var(--t)"}}>Upskillize AI Product Suite</div>
            <h2 className="sec-title" style={{color:"#fff"}}>Purpose-Built AI Products for <span className="ht">FinTech &amp; Banking</span></h2>
            <p className="sec-sub" style={{color:"rgba(255,255,255,.65)"}}>Beyond the lab — Upskillize builds and deploys AI-native products for banks, NBFCs, and fintech firms. Students learn with the same tools deployed in production.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px",maxWidth:"1100px",margin:"0 auto"}} className="reveal">
            {[
              {icon:"💰",name:"Cost Optimizer",tag:"AI · COST INTELLIGENCE",color:"var(--t)",tagColor:"rgba(0,201,167,.6)",border:"rgba(0,201,167,.25)",bg:"rgba(0,201,167,.15)",desc:"AI-driven cost allocation, variance analysis, and spend optimisation engine for banks and NBFCs. Identifies leakage, benchmarks against peers, and surfaces actionable savings across business units."},
              {icon:"📊",name:"ALM / FTP Engine",tag:"AI · TREASURY & LIQUIDITY",color:"#b39dff",tagColor:"rgba(107,63,160,.6)",border:"rgba(107,63,160,.25)",bg:"rgba(107,63,160,.15)",desc:"Asset Liability Management and Funds Transfer Pricing platform. Real-time NII modelling, interest rate risk simulation, liquidity gap analysis, and RBI ALM compliance reporting."},
              {icon:"🧠",name:"RiskGPT",tag:"GENAI · RISK INTELLIGENCE",color:"#ff9ab5",tagColor:"rgba(232,66,106,.6)",border:"rgba(232,66,106,.25)",bg:"rgba(232,66,106,.15)",desc:"GenAI-powered risk analytics assistant. Instant credit memo generation, policy interpretation, Basel/FRTB Q&A, stress test scenario narration, and board-ready risk commentary — in seconds."},
              {icon:"🔍",name:"AuditIQ",tag:"AI · INTERNAL AUDIT",color:"var(--a)",tagColor:"rgba(245,166,35,.6)",border:"rgba(245,166,35,.25)",bg:"rgba(245,166,35,.15)",desc:"AI-assisted internal audit management platform. Risk-based audit planning, control testing automation, audit finding classification, RBI/SEBI compliance checklist mapping, and real-time audit trail."},
              {icon:"🤝",name:"Vendorize",tag:"AI · VENDOR RISK MANAGEMENT",color:"var(--t)",tagColor:"rgba(0,201,167,.6)",border:"rgba(0,201,167,.25)",bg:"rgba(0,201,167,.15)",desc:"End-to-end vendor risk and due diligence platform for banks. Automated third-party risk scoring, contract clause extraction, RBI outsourcing guidelines compliance, and vendor performance dashboards."},
              {icon:"🛡️",name:"Data Complize",tag:"AI · DATA PRIVACY & DPDPA",color:"#b39dff",tagColor:"rgba(107,63,160,.6)",border:"rgba(107,63,160,.25)",bg:"rgba(107,63,160,.15)",desc:"DPDPA and data privacy compliance platform. Automated data inventory mapping, consent management, data breach response workflows, and RBI/SEBI data localisation compliance."},
            ].map(p=>(
              <div key={p.name} style={{background:"rgba(255,255,255,.06)",border:`1px solid ${p.border}`,borderRadius:"16px",padding:"24px 20px",transition:"transform .3s,border-color .3s",cursor:"default"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor=p.border.replace('.25','.55');}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=p.border;}}>
                <div style={{width:"44px",height:"44px",borderRadius:"12px",background:p.bg,border:`1px solid ${p.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",marginBottom:"14px"}}>{p.icon}</div>
                <div style={{fontFamily:"var(--fd)",fontSize:"14px",fontWeight:700,color:p.color,marginBottom:"6px"}}>{p.name}</div>
                <div style={{fontFamily:"var(--fm)",fontSize:"9px",color:p.tagColor,letterSpacing:"1px",marginBottom:"10px"}}>{p.tag}</div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,.6)",lineHeight:1.65}}>{p.desc}</div>
              </div>
            ))}
            <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(232,66,106,.25)",borderRadius:"16px",padding:"24px 20px",gridColumn:"span 2",cursor:"default"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,66,106,.55)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(232,66,106,.25)";}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:"16px"}}>
                <div style={{flexShrink:0}}>
                  <div style={{width:"44px",height:"44px",borderRadius:"12px",background:"rgba(232,66,106,.15)",border:"1px solid rgba(232,66,106,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",marginBottom:"10px"}}>🔺</div>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"var(--fd)",fontSize:"14px",fontWeight:700,color:"#ff9ab5",marginBottom:"4px"}}>Fraud Risk &amp; Analytics Solutions</div>
                  <div style={{fontFamily:"var(--fm)",fontSize:"9px",color:"rgba(232,66,106,.6)",letterSpacing:"1px",marginBottom:"10px"}}>AI · FRAUD INTELLIGENCE · REAL-TIME</div>
                  <div style={{fontSize:"12px",color:"rgba(255,255,255,.6)",lineHeight:1.65,marginBottom:"12px"}}>Real-time transaction fraud detection engine combining rule-based systems with ML anomaly detection. Covers digital payment fraud, account takeover, identity theft, synthetic identity, trade finance fraud, and regulatory SAR filing automation.</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                    {["UPI Fraud Detection","Account Takeover","Synthetic Identity","Trade Finance Fraud","SAR Auto-Filing","Explainable AI"].map(tag=>(
                      <span key={tag} style={{background:"rgba(232,66,106,.15)",border:"1px solid rgba(232,66,106,.3)",color:"#ff9ab5",fontSize:"10px",padding:"3px 10px",borderRadius:"20px",fontFamily:"var(--fm)"}}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{maxWidth:"1100px",margin:"32px auto 0",background:"rgba(0,201,167,.08)",border:"1px solid rgba(0,201,167,.2)",borderRadius:"12px",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
            <div style={{fontSize:"13px",color:"rgba(255,255,255,.75)"}}><strong style={{color:"var(--t)"}}>Students in the lab get hands-on exposure to all 7 AI products</strong> — the same tools deployed in production at partner banks and NBFCs</div>
            <Link to="/connect" style={{background:"linear-gradient(135deg,var(--t),var(--td))",color:"var(--navy)",fontWeight:"700",fontSize:"13px",padding:"10px 22px",borderRadius:"9px",whiteSpace:"nowrap"}}>Get Early Access →</Link>
          </div>
        </section>

        <div className="div"></div>

        {/* ── BENEFITS ── */}
        <section className="sec sec-alt" id="benefits">
          <div className="sc">
            <div className="sec-label">Who Benefits</div>
            <h2 className="sec-title">Built for <span className="ht">Students.</span> Designed for <span className="hp">Institutions.</span></h2>
          </div>
          <div className="ben-grid">
            <div className="bp stu reveal">
              <div className="bp-head">
                <div className="bp-icon">🎓</div>
                <div><div className="bp-lbl">FOR STUDENTS</div><div className="bp-title">Excel Beyond the Degree</div></div>
              </div>
              <ul className="bp-list">
                <li><strong>Employer-ready portfolio</strong> — graduate with live fintech projects, not just a transcript</li>
                <li><strong>Industry certifications</strong> — CAIP, CDBL, FRM track credentials alongside your MBA/PGDM</li>
                <li><strong>Hands-on with real tools</strong> — Python, Power BI, Figma, UPI simulators, Oracle FLEXCUBE</li>
                <li><strong>Peer-working model</strong> — 2 students per station, shoulder to shoulder, like real trading floor analysts</li>
                <li><strong>Agile standup daily</strong> — 15-minute sprint standup every morning, exactly like Zerodha, HDFC Digital, Razorpay</li>
                <li><strong>ESG &amp; green finance literacy</strong> — Scope 1–3 reporting, BRSR, RBI green taxonomy skills now mandatory in BFSI hiring</li>
                <li><strong>Startup mentoring</strong> — ideation to VC pitch, with mentor network, incubation guidance, and investor deck critique</li>
                <li><strong>Structured internship pathway</strong> — lab scores feed directly into partner bank and NBFC internship matching</li>
                <li><strong>AI-powered LMS</strong> — personalised paths, 24/7 mock exam support, instant case study feedback via Claude agents</li>
              </ul>
            </div>
            <div className="bp col reveal d1">
              <div className="bp-head">
                <div className="bp-icon">🏛️</div>
                <div><div className="bp-lbl">FOR COLLEGES</div><div className="bp-title">Differentiate. Accredit. Lead.</div></div>
              </div>
              <ul className="bp-list">
                <li><strong>"First mover" institutional brand</strong> — be among the first colleges in India with a dedicated, accredited FinTech &amp; AI Innovation Lab</li>
                <li><strong>NAAC / NBA accreditation evidence</strong> — tangible industry linkages, live projects, and outcome metrics</li>
                <li><strong>Zero infrastructure burden</strong> — Upskillize delivers Lab-in-a-Box: layout, software, trainers, LMS, curriculum calendar</li>
                <li><strong>Placement ranking advantage</strong> — dual-credential students command higher offers, boosting institutional placement stats</li>
                <li><strong>New revenue stream</strong> — co-branded certification fees create revenue with no capital expenditure</li>
                <li><strong>Full BFSI spectrum coverage</strong> — Banking, Insurance, Capital Markets, RegTech, ESG, AI, Core Banking all under one roof</li>
                <li><strong>Faculty upskilling included</strong> — all partner faculty go through Upskillize train-the-trainer modules</li>
                <li><strong>Always-current curriculum</strong> — quarterly updates keep your programme ahead of competitors using static textbooks</li>
                <li><strong>Digital-first brand story</strong> — co-branded LMS, certificates, and lab showcases create sustained marketing value</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── NAAC DOCUMENTATION SUPPORT ── */}
        <section className="naac-sec" id="naac">
          <div className="sc">
            <div className="naac-badge"><span>NAAC / NBA</span> Documentation &amp; Accreditation Support</div>
            <h2 className="sec-title">Every Session Generates <span className="ht">Accreditation Evidence.</span></h2>
            <p className="naac-intro">The FinTech &amp; AI Innovation Lab isn't just a learning asset — it's a living accreditation engine. Every sprint, every capstone, every industry interaction generates structured evidence that maps directly to NAAC criteria and NBA OBE requirements. Upskillize provides pre-formatted documentation templates, data dashboards, and SSR-ready reports.</p>
          </div>
          <div className="naac-grid reveal">
            {[
              {crit:"C 2.1",cls:"c2",title:"Teaching-Learning & Evaluation",sub:"Student-Centric Learning · ICT Integration · Outcome Assessment",evs:["Experiential learning logs from 10 perimeter workstations — timestamped, exportable","Peer-working model documented per session (2 students per station, structured pair reviews)","LMS analytics: engagement hours, assignment completion, quiz scores per student cohort","Agile standup attendance records with sprint velocity data — OBE competency maps","Blended learning evidence: physical lab + lms.upskillize.com digital sessions"]},
              {crit:"C 3.1",cls:"c3",title:"Research, Innovation & Extension",sub:"Student Projects · Industry Problem Solving · Innovation Culture",evs:["Student-built AI products (Robo Advisory models, Fraud Detection engines, Stablecoin simulations) — structured capstone reports","Live industry problem statements sourced from CROs, CDOs, CPOs — real BFSI challenges","Capstone Demo Day deliverables: pitch decks, prototypes, research papers per cohort","Industry Connect Lounge records: CXO session logs, MoU-linked project documentation","Publication support: structured pathways to SEBI, RBI, and IRDAI policy briefs"]},
              {crit:"C 5.1",cls:"c5",title:"Student Support & Progression",sub:"Placement Pipeline · Certifications · Career Mentoring",evs:["Co-certification records: CAIP, CDBL, FRM-track completions with pass rates and scores","Placement funnel reports: students placed in banks, NBFCs, fintechs — salary benchmarks","Mentoring logs: structured 1:1 interactions with CROs, CDOs, CPOs — documented outcomes","500+ years collective faculty expertise — CVs, credentials, and delivery records available","Alumni tracking: post-placement domain alignment data for NAAC outcome mapping"]},
              {crit:"C 6.2",cls:"c6",title:"Governance & Industry Linkages",sub:"MoUs · Industry Interface · Structured Partnerships",evs:["Signed MoU / Partnership Deed between Upskillize Solutions and college — NAAC-ready format","Structured bank and NBFC linkage documentation for internship pipeline","Industry expert visit logs: CXO sessions, guest lectures, panel records with attendance","Lab governance framework: session plans, attendance registers, assessment rubrics (AICTE/NAAC)","Quarterly review reports between Upskillize and college leadership — audit trail maintained"]},
              {crit:"C 7.1",cls:"c7",title:"Institutional Values & Best Practices",sub:"ESG · Sustainability · Green Campus · Ethics",evs:["ESG Observatory outputs: student-generated Scope 1–3 reports, BRSR templates — publishable","Green lab design: LED lighting, energy-star hardware, living green walls — carbon audit records","Sustainability finance curriculum: PPP structures, Cradle-to-Cradle models, RBI green taxonomy","Inclusive peer-working model documented: perimeter layout, diversity of domain exposure","Digital ethics modules: DPDPA, data privacy, responsible AI — assessment records"]},
              {crit:"NBA",cls:"cx",title:"NBA Outcomes-Based Education",sub:"POs · COs · PSOs · Attainment Mapping",evs:["Programme Outcomes (POs) mapped to lab activities: PO3 (Design/Analysis), PO4 (Research), PO6 (Ethics)","Course Outcomes (COs) mapped per zone: Fintech CO → Open Banking; AI CO → Robo Advisory","Programme Specific Outcomes (PSOs) documented: BFSI domain competency levels per student","Attainment calculation data: rubric-based assessment scores exportable for NBA filing","AICTE RUBRIC scoring automation via lms.upskillize.com — direct NBA report generation"]},
            ].map(card=>(
              <div className="naac-card" key={card.crit}>
                <div className="naac-card-head">
                  <div className={`naac-crit ${card.cls}`}>{card.crit}</div>
                  <div><div className="naac-card-title">{card.title}</div><div className="naac-card-sub">{card.sub}</div></div>
                </div>
                <div className="naac-evidence">
                  {card.evs.map((ev,i)=><div className="naac-ev" key={i}>{ev}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="naac-artefacts reveal">
            <div className="naac-art-title">📁 NAAC/NBA Documentation Package — Included with Every Partnership</div>
            <div className="naac-art-sub">All documents are pre-formatted, institution-branded, and ready to upload to NAAC's Self-Study Report (SSR) portal and NBA's ABET-aligned system.</div>
            <div className="naac-art-grid">
              {[
                {icon:"📋",name:"MoU & Partnership Deed",desc:"NAAC-compliant MoU template between college and Upskillize — industry linkage evidence for C6.2"},
                {icon:"📊",name:"Student Outcome Reports",desc:"Per-cohort analytics: certification pass rates, placement data, competency attainment — mapped to C5.1"},
                {icon:"🏆",name:"Capstone & Project Logs",desc:"Structured capstone documentation: problem statement, methodology, outcome — C3.1 research evidence"},
                {icon:"🗓️",name:"Session & Attendance Records",desc:"LMS-generated session logs, standup records, lab utilisation data — C2.1 teaching-learning evidence"},
                {icon:"🌿",name:"ESG & Green Lab Reports",desc:"Student ESG outputs, carbon footprint data, green design certification — C7.1 sustainability evidence"},
                {icon:"👥",name:"Industry Expert Logs",desc:"CXO visit records, guest lecture certificates, internship offer letters — C6.2 industry interface proof"},
                {icon:"📈",name:"NBA Attainment Dashboard",desc:"AICTE RUBRIC score exports, PO/CO/PSO attainment tables, direct NBA portal upload format"},
                {icon:"🎓",name:"Co-Certification Records",desc:"CAIP, CDBL, FRM-track certificates per student — industry credential documentation for accreditation"},
              ].map(a=>(
                <div className="naac-art-item" key={a.name}>
                  <div className="naac-art-icon">{a.icon}</div>
                  <div className="naac-art-name">{a.name}</div>
                  <div className="naac-art-desc">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="naac-metrics reveal">
            {[{n:"C2",cls:"ct",l:"Teaching-Learning\nEvidence Ready"},{n:"C3",cls:"cp",l:"Research & Innovation\nArtefacts Generated"},{n:"C5",cls:"ca",l:"Student Support\nData Exported"},{n:"C6",cls:"cr",l:"Governance &\nMoU Documentation"},{n:"C7",cls:"cg",l:"ESG & Institutional\nValues Reports"}].map(m=>(
              <div className="naac-metric" key={m.n}>
                <div className={`naac-met-n ${m.cls}`}>{m.n}</div>
                <div className="naac-met-l">{m.l.split("\n").map((line,i)=><span key={i}>{line}{i===0&&<br/>}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="div"></div>

        {/* ── PARTNERSHIP TIERS ── */}
        <PartnershipTiers />

        {/* ── SIGNUP CTA ── */}
        <div className="signup-sec" id="signup">
          <div style={{position:"relative",zIndex:1}}>
            <div className="sec-label">Get Started Today</div>
            <h2>Ready to Launch <span style={{color:"var(--t)"}}>India's Most Exciting</span><br/>FinTech &amp; AI Innovation Lab?</h2>
            <p>Join the revolution. Be the first college in your city with a real FinTech &amp; AI Innovation Lab — where students sprint, build, pitch, and get hired.</p>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
              <Link
                to="/contact"
                style={{
                  background:"linear-gradient(135deg,var(--t),var(--td))",
                  color:"#fff",fontWeight:"700",fontSize:"16px",
                  padding:"16px 40px",borderRadius:"12px",
                  boxShadow:"0 8px 32px rgba(0,201,167,.32)",
                  textDecoration:"none",display:"inline-flex",
                  alignItems:"center",gap:"10px",
                  transition:"transform .2s,box-shadow .2s",
                  fontFamily:"var(--fd)",letterSpacing:"-.1px"
                }}
              >
                Set Up Our Lab →
              </Link>
            </div>
            <div className="signup-trust">
              <div className="signup-trust-item">✓ <span>Live in 60 days</span></div>
              <div className="signup-trust-item">✓ <span>NAAC documentation included</span></div>
              <div className="signup-trust-item">✓ <span>Co-certified graduates</span></div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}