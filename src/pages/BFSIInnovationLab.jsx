import { useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   BFSI Innovation Lab — India's First | Upskillize Solutions
   Converted from HTML → JSX
   Changes:
     • "22+ Years BFSI Experience"  →  "500+ Group Experience"
     • % signs removed from hero stats, infog bar, zone bars,
       coverage bars (bars kept, just the label stripped)
     • All images / SVGs / colours unchanged
───────────────────────────────────────────────────────────── */

export default function BFSIInnovationLab() {

  /* ── Intersection Observer for .reveal + bar fills ── */
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

    /* Trigger bars after load */
    const t = setTimeout(() => {
      document.querySelectorAll("#bfsi-lab .z-bar-fill,#bfsi-lab .cov-bar-fill").forEach((b) => {
        const w = b.getAttribute("data-w");
        if (w) b.style.width = w + "%";
      });
    }, 900);

    /* Smooth scroll */
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    };
    const anchors = document.querySelectorAll("#bfsi-lab a[href^='#']");
    anchors.forEach((a) => a.addEventListener("click", handleClick));

    /* Counter animation */
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
      {/* ── Google Fonts ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
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
  --fd:'Syne',sans-serif;
  --fb:'DM Sans',sans-serif;
  --fm:'JetBrains Mono',monospace;
  font-family:var(--fb);font-size:15px;line-height:1.65;color:var(--tx1);
  background:var(--bg0);overflow-x:hidden;
}
#bfsi-lab *,#bfsi-lab *::before,#bfsi-lab *::after{box-sizing:border-box;margin:0;padding:0;}
#bfsi-lab a{text-decoration:none;}
#bfsi-lab img{display:block;max-width:100%;}

/* ─── ANNOUNCEMENT BAR ─── */
#bfsi-lab .ann-bar{background:linear-gradient(90deg,var(--navy),var(--nm));color:#fff;text-align:center;padding:10px 20px;font-family:var(--fm);font-size:11px;letter-spacing:1px;}
#bfsi-lab .ann-bar .ann-badge{background:var(--t);color:var(--navy);font-weight:700;padding:3px 10px;border-radius:20px;margin-right:10px;font-size:10px;}
#bfsi-lab .ann-bar span{opacity:.85;}

/* ─── HERO ─── */
#bfsi-lab .hero{background:linear-gradient(135deg,#07112E 0%,#0D1E4A 50%,#1A2D60 100%);padding:80px 60px 70px;position:relative;overflow:hidden;}
#bfsi-lab .hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,201,167,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,.05) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
#bfsi-lab .hero-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
#bfsi-lab .hero-orb.t{width:500px;height:500px;background:rgba(0,201,167,.12);top:-100px;right:-80px;}
#bfsi-lab .hero-orb.p{width:380px;height:380px;background:rgba(107,63,160,.12);bottom:-60px;left:-40px;}
#bfsi-lab .hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;position:relative;z-index:1;}
#bfsi-lab .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,201,167,.15);border:1px solid rgba(0,201,167,.35);padding:6px 16px;border-radius:30px;font-family:var(--fm);font-size:10px;color:var(--t);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;animation:fadeUp .7s ease both;}
#bfsi-lab .hero-badge::before{content:'🏆';font-size:12px;}
#bfsi-lab .hero-h1{font-family:var(--fd);font-size:clamp(36px,4.5vw,62px);font-weight:800;line-height:1.05;letter-spacing:-1.5px;color:#fff;margin-bottom:20px;animation:fadeUp .7s .1s ease both;}
#bfsi-lab .hero-h1 .ht{color:var(--t);}
#bfsi-lab .hero-h1 .ha{color:var(--a);}
#bfsi-lab .hero-sub{font-size:16px;color:rgba(255,255,255,.7);line-height:1.75;margin-bottom:28px;animation:fadeUp .7s .2s ease both;}
#bfsi-lab .hero-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;animation:fadeUp .7s .25s ease both;}
#bfsi-lab .hero-tag{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.85);font-size:11px;font-weight:500;padding:5px 12px;border-radius:20px;}
#bfsi-lab .hero-tag.ht-g{background:rgba(0,201,167,.15);border-color:rgba(0,201,167,.3);color:var(--t);}
#bfsi-lab .hero-btns{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .7s .3s ease both;}
#bfsi-lab .btn-primary{background:linear-gradient(135deg,var(--t),var(--td));color:#fff;font-weight:700;font-size:14px;padding:13px 28px;border-radius:10px;box-shadow:var(--st);transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:7px;}
#bfsi-lab .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,201,167,.38);}
#bfsi-lab .btn-outline{background:transparent;border:1.5px solid rgba(255,255,255,.25);color:#fff;font-size:14px;font-weight:500;padding:13px 28px;border-radius:10px;transition:border-color .2s,background .2s;display:inline-flex;align-items:center;gap:7px;}
#bfsi-lab .btn-outline:hover{border-color:var(--t);background:rgba(0,201,167,.1);}

/* Hero right */
#bfsi-lab .hero-right{display:flex;flex-direction:column;gap:16px;animation:fadeUp .7s .2s ease both;}
#bfsi-lab .hero-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
#bfsi-lab .hstat{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:var(--r12);padding:18px 16px;text-align:center;transition:background .2s;}
#bfsi-lab .hstat:hover{background:rgba(255,255,255,.12);}
#bfsi-lab .hstat-n{font-family:var(--fd);font-size:32px;font-weight:800;line-height:1;margin-bottom:4px;}
#bfsi-lab .hstat-n.ct{color:var(--t);}
#bfsi-lab .hstat-n.cp{color:#b39dff;}
#bfsi-lab .hstat-n.ca{color:var(--a);}
#bfsi-lab .hstat-n.cw{color:#fff;}
#bfsi-lab .hstat-l{font-size:11px;color:rgba(255,255,255,.55);letter-spacing:.4px;}
#bfsi-lab .hero-first-badge{background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(0,201,167,.15));border:1px solid rgba(255,255,255,.15);border-radius:var(--r12);padding:16px 20px;display:flex;align-items:center;gap:14px;}
#bfsi-lab .hero-first-icon{font-size:28px;flex-shrink:0;}
#bfsi-lab .hero-first-text{font-size:13px;color:rgba(255,255,255,.85);line-height:1.6;}
#bfsi-lab .hero-first-text strong{color:var(--t);display:block;font-size:14px;margin-bottom:2px;}

/* ─── STRIP ─── */
#bfsi-lab .strip{background:linear-gradient(90deg,var(--tl),#fff,var(--pl));border-top:3px solid var(--t);border-bottom:3px solid var(--bdr);padding:16px 60px;display:flex;align-items:center;gap:16px;overflow:hidden;}
#bfsi-lab .strip-icon{font-size:22px;flex-shrink:0;}
#bfsi-lab .strip-text{font-size:13.5px;color:var(--tx2);line-height:1.5;}
#bfsi-lab .strip-text strong{color:var(--navy);font-weight:700;}
#bfsi-lab .strip-dots{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;}
#bfsi-lab .strip-dot{background:var(--tl);border:1px solid var(--tb);color:var(--td);font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;}

/* ─── SHARED SECTION ─── */
#bfsi-lab .sec{padding:72px 60px;}
#bfsi-lab .sec-alt{background:var(--bg1);}
#bfsi-lab .sec-dark{background:linear-gradient(135deg,var(--navy),var(--nm));}
#bfsi-lab .sc{max-width:820px;margin:0 auto;text-align:center;margin-bottom:52px;}
#bfsi-lab .sec-label{font-family:var(--fm);font-size:10px;color:var(--t);letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;}
#bfsi-lab .sec-title{font-family:var(--fd);font-size:clamp(26px,3.5vw,44px);font-weight:800;line-height:1.12;letter-spacing:-1px;color:var(--navy);margin-bottom:14px;}
#bfsi-lab .sec-title .ht{color:var(--t);}
#bfsi-lab .sec-title .hp{color:var(--p);}
#bfsi-lab .sec-title .ha{color:var(--a);}
#bfsi-lab .sec-sub{color:var(--tx2);font-size:15.5px;line-height:1.72;}
#bfsi-lab .sec-dark .sec-title{color:#fff;}
#bfsi-lab .sec-dark .sec-label{color:var(--t);}
#bfsi-lab .sec-dark .sec-sub{color:rgba(255,255,255,.65);}

/* ─── 3D LAB VISUAL ─── */
#bfsi-lab .lab3d-wrap{max-width:1080px;margin:0 auto;border-radius:20px;overflow:hidden;border:1px solid var(--bdr);box-shadow:var(--sh3);background:linear-gradient(135deg,#07112E,#0D1E4A);}
#bfsi-lab .lab3d-caption{background:#fff;border-top:1px solid var(--bdr);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;}
#bfsi-lab .lab3d-caption-title{font-family:var(--fd);font-weight:700;font-size:15px;color:var(--navy);}
#bfsi-lab .lab3d-caption-sub{font-size:12px;color:var(--tx3);}
#bfsi-lab .lab3d-pills{display:flex;gap:8px;}
#bfsi-lab .lab3d-pill{font-size:10px;padding:4px 10px;border-radius:20px;font-weight:600;}
#bfsi-lab .lab3d-pill.t{background:var(--tl);color:var(--td);}
#bfsi-lab .lab3d-pill.p{background:var(--pl);color:var(--pd);}
#bfsi-lab .lab3d-pill.a{background:var(--al);color:var(--ad);}

/* ─── FRAMEWORK ─── */
#bfsi-lab .fw-outer{background:#fff;border:2px solid var(--bdr);border-radius:var(--r24);padding:40px 36px 44px;max-width:1100px;margin:0 auto;box-shadow:var(--sh2);position:relative;overflow:hidden;}
#bfsi-lab .fw-outer::before{content:'FRAMEWORK';position:absolute;right:-50px;top:50%;transform:translateY(-50%) rotate(90deg);font-family:var(--fd);font-size:120px;font-weight:800;color:rgba(7,17,46,.025);letter-spacing:14px;pointer-events:none;}
#bfsi-lab .fw-title{font-family:var(--fd);font-size:17px;font-weight:700;text-align:center;color:var(--navy);margin-bottom:4px;}
#bfsi-lab .fw-title span{color:var(--t);}
#bfsi-lab .fw-subtitle{font-family:var(--fm);font-size:10px;color:var(--tx3);text-align:center;letter-spacing:1px;margin-bottom:30px;}
#bfsi-lab .zg{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
#bfsi-lab .zr2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}

/* Zone card */
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

/* ─── CAPSTONE ─── */
#bfsi-lab .capstone{background:linear-gradient(135deg,var(--pl),var(--tl));border:2px solid var(--bdr);border-radius:var(--r16);padding:26px 24px;}
#bfsi-lab .cap-head{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
#bfsi-lab .cap-icon{width:40px;height:40px;border-radius:10px;background:var(--pl);border:1.5px solid var(--pb);display:flex;align-items:center;justify-content:center;font-size:19px;}
#bfsi-lab .cap-title{font-family:var(--fd);font-size:16px;font-weight:700;color:var(--pd);}
#bfsi-lab .cap-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;}
#bfsi-lab .cc{background:#fff;border:1px solid var(--bdr);border-radius:10px;padding:14px 12px;box-shadow:var(--sh1);transition:transform .2s;}
#bfsi-lab .cc:hover{transform:translateY(-2px);}
#bfsi-lab .cc-emoji{font-size:20px;margin-bottom:8px;}
#bfsi-lab .cc-t{font-size:12.5px;font-weight:700;margin-bottom:3px;}
#bfsi-lab .cc-s{font-size:11px;color:var(--tx3);line-height:1.4;}
#bfsi-lab .cap-foot{text-align:center;font-size:12.5px;color:var(--tx2);border-top:1px solid var(--bdr);padding-top:12px;}
#bfsi-lab .cap-foot strong{color:var(--pd);}

/* ─── INFOGRAPHIC BAR ─── */
#bfsi-lab .infog-bar{background:linear-gradient(135deg,var(--navy),var(--nm));padding:52px 60px;}
#bfsi-lab .infog-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(255,255,255,.1);border-radius:var(--r16);overflow:hidden;max-width:1060px;margin:0 auto;}
#bfsi-lab .infog-cell{background:rgba(255,255,255,.04);padding:28px 20px;text-align:center;transition:background .2s;}
#bfsi-lab .infog-cell:hover{background:rgba(255,255,255,.09);}
#bfsi-lab .infog-num{font-family:var(--fd);font-size:42px;font-weight:800;line-height:1;margin-bottom:6px;}
#bfsi-lab .infog-num.ct{color:var(--t);}
#bfsi-lab .infog-num.cp{color:#b39dff;}
#bfsi-lab .infog-num.ca{color:var(--a);}
#bfsi-lab .infog-num.cr{color:#ff9ab5;}
#bfsi-lab .infog-num.cw{color:#fff;}
#bfsi-lab .infog-lbl{font-size:12px;color:rgba(255,255,255,.55);line-height:1.5;}
#bfsi-lab .infog-icon{font-size:22px;margin-bottom:10px;}

/* ─── WHY UPSKILLIZE ─── */
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
#bfsi-lab .why-title{font-family:var(--fd);font-size:13.5px;font-weight:700;color:var(--navy);margin-bottom:7px;}
#bfsi-lab .why-desc{font-size:12px;color:var(--tx3);line-height:1.65;}

/* ─── BENEFITS SPLIT ─── */
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
#bfsi-lab .bp-title{font-family:var(--fd);font-size:22px;font-weight:800;color:var(--navy);}
#bfsi-lab .bp-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
#bfsi-lab .bp-list li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--tx2);line-height:1.55;}
#bfsi-lab .bp-list li::before{content:'✓';flex-shrink:0;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px;}
#bfsi-lab .bp.stu .bp-list li::before{background:var(--tl);color:var(--td);}
#bfsi-lab .bp.col .bp-list li::before{background:var(--pl);color:var(--pd);}
#bfsi-lab .bp-list li strong{color:var(--navy);font-weight:600;}

/* ─── PARTNERSHIP ─── */
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
#bfsi-lab .pt-name{font-family:var(--fd);font-size:22px;font-weight:800;color:var(--navy);margin-bottom:5px;}
#bfsi-lab .pt-sub{font-size:12.5px;color:var(--tx3);margin-bottom:20px;line-height:1.5;}
#bfsi-lab .pt-feats{list-style:none;display:flex;flex-direction:column;gap:9px;}
#bfsi-lab .pt-feats li{font-size:12.5px;color:var(--tx2);display:flex;align-items:flex-start;gap:8px;line-height:1.45;}
#bfsi-lab .pt-feats li::before{content:'✓';font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px;}
#bfsi-lab .pt.base .pt-feats li::before{color:var(--tx3);}
#bfsi-lab .pt.feat .pt-feats li::before{color:var(--t);}
#bfsi-lab .pt.ent .pt-feats li::before{color:var(--p);}

/* ─── SIGNUP CTA ─── */
#bfsi-lab .signup-sec{background:linear-gradient(135deg,var(--navy) 0%,var(--nm) 60%,#1A2D60 100%);padding:80px 60px;text-align:center;position:relative;overflow:hidden;}
#bfsi-lab .signup-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,201,167,.1),transparent);pointer-events:none;}
#bfsi-lab .signup-sec h2{font-family:var(--fd);font-size:clamp(28px,4vw,52px);font-weight:800;letter-spacing:-1px;color:#fff;margin-bottom:14px;}
#bfsi-lab .signup-sec p{color:rgba(255,255,255,.65);font-size:16px;max-width:520px;margin:0 auto 36px;}
#bfsi-lab .signup-form{display:flex;gap:10px;max-width:480px;margin:0 auto 28px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:6px 6px 6px 18px;}
#bfsi-lab .signup-form input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:14px;font-family:var(--fb);}
#bfsi-lab .signup-form input::placeholder{color:rgba(255,255,255,.45);}
#bfsi-lab .signup-form button{background:linear-gradient(135deg,var(--t),var(--td));color:#fff;border:none;font-weight:700;font-size:13px;padding:11px 22px;border-radius:9px;cursor:pointer;font-family:var(--fb);white-space:nowrap;transition:transform .2s;}
#bfsi-lab .signup-form button:hover{transform:scale(1.03);}
#bfsi-lab .signup-trust{display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;}
#bfsi-lab .signup-trust-item{display:flex;align-items:center;gap:7px;font-size:12.5px;color:rgba(255,255,255,.6);}
#bfsi-lab .signup-trust-item span{color:var(--t);font-weight:600;}
#bfsi-lab .cta-links{display:flex;align-items:center;justify-content:center;gap:22px;margin-top:24px;flex-wrap:wrap;}
#bfsi-lab .cta-link{display:flex;align-items:center;gap:7px;font-size:13px;color:rgba(255,255,255,.55);}
#bfsi-lab .cta-link a{color:var(--t);font-weight:500;}

/* ─── FOOTER ─── */
#bfsi-lab footer{background:var(--navy);border-top:1px solid rgba(255,255,255,.07);padding:24px 60px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.4);}
#bfsi-lab .f-logo{display:flex;align-items:center;gap:9px;font-family:var(--fd);font-weight:800;font-size:16px;color:#fff;}
#bfsi-lab .f-logo em{color:var(--t);font-style:normal;}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
#bfsi-lab .reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
#bfsi-lab .reveal.on{opacity:1;transform:translateY(0);}
#bfsi-lab .d1{transition-delay:.08s}
#bfsi-lab .d2{transition-delay:.16s}
#bfsi-lab .d3{transition-delay:.24s}
#bfsi-lab .d4{transition-delay:.32s}

/* ─── DIVIDER ─── */
#bfsi-lab .div{height:1px;background:linear-gradient(90deg,transparent,var(--bdr),transparent);margin:0 60px;}

/* ─── PROCESS STEPS ─── */
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

/* ─── COVERAGE ─── */
#bfsi-lab .coverage-sec{background:var(--bg1);}
#bfsi-lab .coverage-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1060px;margin:0 auto;}
#bfsi-lab .cov-list{display:flex;flex-direction:column;gap:14px;}
#bfsi-lab .cov-item{display:flex;align-items:center;gap:14px;}
#bfsi-lab .cov-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0;}
#bfsi-lab .cov-label{font-size:13.5px;color:var(--tx1);font-weight:500;flex:1;}
#bfsi-lab .cov-bar-wrap{flex:2;}
#bfsi-lab .cov-bar-track{height:6px;background:var(--bdr);border-radius:3px;overflow:hidden;}
#bfsi-lab .cov-bar-fill{height:100%;border-radius:3px;width:0;transition:width 1.8s ease;}
      `}</style>

      <section id="bfsi-lab">

        {/* ── ANNOUNCEMENT BAR ── */}
        <div className="ann-bar">
          <span className="ann-badge">🏆 INDIA'S FIRST</span>
          <span>Dedicated BFSI Innovation Lab for College Campuses — Banking · Insurance · RegTech · AI · ESG · Core Banking · Capital Markets</span>
        </div>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-orb t"></div>
          <div className="hero-orb p"></div>
          <div className="hero-inner">
            <div>
              <div className="hero-badge">India's First-of-Its-Kind BFSI Innovation Lab</div>
              <h1 className="hero-h1">
                Where <span className="ht">Future BFSI</span><br/>
                Leaders Are<br/>
                <span className="ha">Built.</span>
              </h1>
              <p className="hero-sub">A fully operational BFSI Innovation Lab — established inside your college campus by Upskillize Solutions. Practical. Experiential. Industry-wired. Covering every vertical of Banking, Insurance, RegTech, AI, ESG, and Core Banking.</p>
              <div className="hero-tags">
                <span className="hero-tag ht-g">🏦 Banking &amp; Fintech</span>
                <span className="hero-tag ht-g">🛡️ InsurTech</span>
                <span className="hero-tag ht-g">⚖️ RegTech &amp; ESG</span>
                <span className="hero-tag">📊 Capital Markets</span>
                <span className="hero-tag">🤖 AI &amp; GenAI</span>
                <span className="hero-tag">🏛️ Core Banking</span>
              </div>
              <div className="hero-btns">
                <a href="#signup" className="btn-primary">Set Up the Lab at Your College →</a>
                <a href="#framework" className="btn-outline">Explore All Zones</a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-stats-grid">
                {/* ── % REMOVED from labels ── */}
                <div className="hstat"><div className="hstat-n ct">9</div><div className="hstat-l">Lab Zones</div></div>
                <div className="hstat"><div className="hstat-n cp">36</div><div className="hstat-l">Active Modules</div></div>
                <div className="hstat"><div className="hstat-n ca">20</div><div className="hstat-l">Seats Per Lab</div></div>
                {/* ── "22+ Years" → "500+ Group" ── */}
                <div className="hstat"><div className="hstat-n cw">500+</div><div className="hstat-l">Group Experience</div></div>
              </div>
              <div className="hero-first-badge">
                <div className="hero-first-icon">🏆</div>
                <div className="hero-first-text">
                  <strong>First of Its Kind in India</strong>
                  The only EdTech offering a dedicated, physical BFSI Innovation Lab deployed inside a college campus — covering the complete BFSI spectrum end-to-end.
                </div>
              </div>
              <div className="hero-first-badge" style={{background:"linear-gradient(135deg,rgba(107,63,160,.12),rgba(0,201,167,.1))"}}>
                <div className="hero-first-icon">🎓</div>
                <div className="hero-first-text">
                  <strong>For Graduate and Post Graduate Banking Students</strong>
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
            <strong>India's First Dedicated BFSI Innovation Lab in a College Campus</strong>
            <div className="strip-dots">
              {["Banking","Insurance","Capital Markets","RegTech","ESG & Sustainability","AI & GenAI","Core Banking","Wealth Management"].map(d=>(
                <span className="strip-dot" key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── INFOGRAPHIC STATS BAR ── */}
        <div className="infog-bar" id="stats">
          <div className="infog-grid">
            <div className="infog-cell reveal">
              <div className="infog-icon">🏦</div>
              <div className="infog-num ct" data-target="9">9</div>
              <div className="infog-lbl">Dedicated<br/>Lab Zones</div>
            </div>
            <div className="infog-cell reveal d1">
              <div className="infog-icon">📚</div>
              <div className="infog-num cp" data-target="36">36</div>
              <div className="infog-lbl">Live Industry<br/>Modules</div>
            </div>
            <div className="infog-cell reveal d2">
              <div className="infog-icon">🎓</div>
              <div className="infog-num ca" data-target="5">5</div>
              <div className="infog-lbl">Certification<br/>Tracks</div>
            </div>
            <div className="infog-cell reveal d3">
              <div className="infog-icon">🏆</div>
              <div className="infog-num cr">#1</div>
              <div className="infog-lbl">First Lab of<br/>Its Kind in India</div>
            </div>
            {/* ── "22+" → "500+" ── */}
            <div className="infog-cell reveal d4">
              <div className="infog-icon">💼</div>
              <div className="infog-num cw">500+</div>
              <div className="infog-lbl">Group<br/>Experience</div>
            </div>
          </div>
        </div>

        {/* ── 3D LAB VISUAL ── */}
        <section className="sec">
          <div className="sc">
            <div className="sec-label">The Physical Lab</div>
            <h2 className="sec-title">Your Campus Gets a <span className="ht">World-Class</span> BFSI Lab</h2>
            <p className="sec-sub">A purpose-built 20-seat innovation lab — physically set up inside your college with live simulators, dual-monitor workstations, industry-grade displays, and a dedicated InsurTech pod. Everything students need. Zero setup burden on your institution.</p>
          </div>
          <div className="lab3d-wrap reveal">
            <svg width="100%" viewBox="0 0 1100 580" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="isoFloor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0A1A3E"/><stop offset="100%" stopColor="#07112E"/></linearGradient>
                <linearGradient id="isoWallL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0D1E4A"/><stop offset="100%" stopColor="#0A1830"/></linearGradient>
                <linearGradient id="isoWallR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#091626"/><stop offset="100%" stopColor="#07112E"/></linearGradient>
                <linearGradient id="isoCeil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#112050"/><stop offset="100%" stopColor="#0D1A42"/></linearGradient>
                <linearGradient id="deskT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1F3575"/><stop offset="100%" stopColor="#142558"/></linearGradient>
                <linearGradient id="screenGT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C9A7" stopOpacity=".5"/><stop offset="100%" stopColor="#00C9A7" stopOpacity=".05"/></linearGradient>
                <linearGradient id="screenGP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6B3FA0" stopOpacity=".45"/><stop offset="100%" stopColor="#6B3FA0" stopOpacity=".05"/></linearGradient>
                <linearGradient id="screenGA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5A623" stopOpacity=".45"/><stop offset="100%" stopColor="#F5A623" stopOpacity=".05"/></linearGradient>
                <linearGradient id="ledStrip" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#00C9A7" stopOpacity="0"/><stop offset="20%" stopColor="#00C9A7"/><stop offset="80%" stopColor="#00C9A7"/><stop offset="100%" stopColor="#00C9A7" stopOpacity="0"/></linearGradient>
                <filter id="glowT"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="glowS"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <pattern id="hexPat" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,1 27,7.5 27,18.5 15,25 3,18.5 3,7.5" fill="none" stroke="rgba(0,201,167,0.06)" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <polygon points="80,420 550,200 1020,420 550,560" fill="url(#isoFloor)"/>
              <polygon points="80,420 550,200 1020,420 550,560" fill="url(#hexPat)"/>
              <polygon points="80,420 80,130 550,200 550,90" fill="url(#isoWallL)"/>
              <polygon points="550,90 550,200 1020,420 1020,130" fill="url(#isoWallR)"/>
              <polygon points="80,130 550,90 1020,130 550,170" fill="url(#isoCeil)" opacity=".85"/>
              <line x1="150" y1="128" x2="950" y2="128" stroke="url(#ledStrip)" strokeWidth="3" opacity=".9" filter="url(#glowT)"/>
              <line x1="250" y1="132" x2="850" y2="132" stroke="#00C9A7" strokeWidth="1" opacity=".35"/>
              <polygon points="200,128 900,128 880,170 220,170" fill="#00C9A7" opacity=".04"/>
              <polygon points="245,110 245,240 510,140 510,90" fill="#0A1830" stroke="rgba(0,201,167,.2)" strokeWidth="1"/>
              <rect x="255" y="100" width="72" height="50" rx="4" fill="#071022" stroke="#00C9A7" strokeWidth="1.2" transform="skewX(-15)"/>
              <rect x="256" y="101" width="70" height="48" rx="3" fill="url(#screenGT)" transform="skewX(-15)"/>
              <text x="291" y="120" fontFamily="'JetBrains Mono'" fontSize="5.5" fill="#00C9A7" textAnchor="middle" transform="skewX(-15)">FINTECH</text>
              <text x="291" y="129" fontFamily="'JetBrains Mono'" fontSize="5.5" fill="#00C9A7" textAnchor="middle" transform="skewX(-15)">SANDBOX</text>
              <polyline points="263,142 268,137 273,140 278,133 283,136 288,130 293,133 298,127 303,130 308,124 313,127 318,121" stroke="#00C9A7" strokeWidth=".8" fill="none" transform="skewX(-15)" opacity=".7"/>
              <rect x="342" y="92" width="72" height="50" rx="4" fill="#071022" stroke="#6B3FA0" strokeWidth="1.2" transform="skewX(-15)"/>
              <rect x="343" y="93" width="70" height="48" rx="3" fill="url(#screenGP)" transform="skewX(-15)"/>
              <text x="378" y="112" fontFamily="'JetBrains Mono'" fontSize="5.5" fill="#b39dff" textAnchor="middle" transform="skewX(-15)">AI ANALYTICS</text>
              <text x="378" y="121" fontFamily="'JetBrains Mono'" fontSize="5.5" fill="#b39dff" textAnchor="middle" transform="skewX(-15)">STUDIO</text>
              <circle cx="370" cy="134" r="10" fill="none" stroke="#6B3FA0" strokeWidth="4" strokeDasharray="28 15" transform="skewX(-15)" opacity=".7"/>
              <circle cx="370" cy="134" r="10" fill="none" stroke="#00C9A7" strokeWidth="4" strokeDasharray="12 31" strokeDashoffset="-28" transform="skewX(-15)" opacity=".6"/>
              <rect x="428" y="94" width="72" height="50" rx="4" fill="#071022" stroke="#F5A623" strokeWidth="1.2" transform="skewX(-15)"/>
              <rect x="429" y="95" width="70" height="48" rx="3" fill="url(#screenGA)" transform="skewX(-15)"/>
              <text x="464" y="115" fontFamily="'JetBrains Mono'" fontSize="5.5" fill="#F5A623" textAnchor="middle" transform="skewX(-15)">RISK &amp;</text>
              <text x="464" y="124" fontFamily="'JetBrains Mono'" fontSize="5.5" fill="#F5A623" textAnchor="middle" transform="skewX(-15)">COMPLIANCE</text>
              <text x="380" y="88" fontFamily="'Syne'" fontSize="9" fill="rgba(255,255,255,.85)" textAnchor="middle" fontWeight="700">UPSKILLIZE SOLUTIONS</text>
              <text x="380" y="78" fontFamily="'JetBrains Mono'" fontSize="6" fill="rgba(0,201,167,.8)" textAnchor="middle" letterSpacing="1">INDIA'S FIRST BFSI INNOVATION LAB</text>
              <line x1="300" y1="81" x2="460" y2="81" stroke="rgba(0,201,167,.3)" strokeWidth=".7"/>
              <polygon points="820,130 820,420 1020,420 1020,130" fill="rgba(30,60,120,.3)" stroke="rgba(100,150,255,.3)" strokeWidth="1.5"/>
              <line x1="850" y1="130" x2="850" y2="420" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
              <line x1="900" y1="130" x2="900" y2="420" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
              <line x1="950" y1="130" x2="950" y2="420" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
              <text x="920" y="260" fontFamily="'DM Sans'" fontSize="11" fill="rgba(255,255,255,.6)" textAnchor="middle" fontWeight="600">Industry</text>
              <text x="920" y="275" fontFamily="'DM Sans'" fontSize="11" fill="rgba(255,255,255,.6)" textAnchor="middle" fontWeight="600">Connect</text>
              <text x="920" y="290" fontFamily="'DM Sans'" fontSize="11" fill="rgba(255,255,255,.6)" textAnchor="middle" fontWeight="600">Lounge</text>
              <rect x="840" y="350" width="80" height="30" rx="8" fill="rgba(107,63,160,.3)" stroke="rgba(107,63,160,.5)" strokeWidth="1"/>
              <rect x="845" y="345" width="70" height="10" rx="4" fill="rgba(107,63,160,.4)"/>
              <rect x="870" y="160" width="110" height="65" rx="4" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
              <text x="925" y="198" fontFamily="'JetBrains Mono'" fontSize="7" fill="rgba(255,255,255,.4)" textAnchor="middle">Whiteboard</text>
              {/* Workstation rows — kept exactly as original */}
              <polygon points="168,310 214,288 248,310 202,332" fill="url(#deskT)" stroke="rgba(0,201,167,.25)" strokeWidth=".8"/>
              <rect x="182" y="283" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="183" y="284" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="205" y="281" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="206" y="282" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="230,288 276,266 310,288 264,310" fill="url(#deskT)" stroke="rgba(0,201,167,.25)" strokeWidth=".8"/>
              <rect x="244" y="261" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="245" y="262" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="267" y="259" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="268" y="260" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <polygon points="292,266 338,244 372,266 326,288" fill="url(#deskT)" stroke="rgba(107,63,160,.25)" strokeWidth=".8"/>
              <rect x="306" y="239" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="307" y="240" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <rect x="329" y="237" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="330" y="238" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <polygon points="354,244 400,222 434,244 388,266" fill="url(#deskT)" stroke="rgba(245,166,35,.2)" strokeWidth=".8"/>
              <rect x="368" y="217" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="369" y="218" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <rect x="391" y="215" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="392" y="216" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <polygon points="416,222 462,200 496,222 450,244" fill="url(#deskT)" stroke="rgba(0,201,167,.2)" strokeWidth=".8"/>
              <rect x="430" y="195" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="431" y="196" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="453" y="193" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="454" y="194" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="190,352 236,330 270,352 224,374" fill="url(#deskT)" stroke="rgba(0,201,167,.25)" strokeWidth=".8"/>
              <rect x="204" y="325" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="205" y="326" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="227" y="323" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="228" y="324" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="252,330 298,308 332,330 286,352" fill="url(#deskT)" stroke="rgba(107,63,160,.25)" strokeWidth=".8"/>
              <rect x="266" y="303" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="267" y="304" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <rect x="289" y="301" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="290" y="302" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <polygon points="314,308 360,286 394,308 348,330" fill="url(#deskT)" stroke="rgba(245,166,35,.2)" strokeWidth=".8"/>
              <rect x="328" y="281" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="329" y="282" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <rect x="351" y="279" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="352" y="280" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <polygon points="376,286 422,264 456,286 410,308" fill="url(#deskT)" stroke="rgba(0,201,167,.2)" strokeWidth=".8"/>
              <rect x="390" y="259" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="391" y="260" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="413" y="257" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="414" y="258" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="438,264 484,242 518,264 472,286" fill="url(#deskT)" stroke="rgba(107,63,160,.2)" strokeWidth=".8"/>
              <rect x="452" y="237" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="453" y="238" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <rect x="475" y="235" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="476" y="236" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <polygon points="212,394 258,372 292,394 246,416" fill="url(#deskT)" stroke="rgba(232,66,106,.2)" strokeWidth=".8"/>
              <rect x="226" y="367" width="20" height="14" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/><rect x="227" y="368" width="18" height="12" rx="1" fill="rgba(232,66,106,.3)"/>
              <rect x="249" y="365" width="20" height="14" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/><rect x="250" y="366" width="18" height="12" rx="1" fill="rgba(232,66,106,.3)"/>
              <polygon points="274,372 320,350 354,372 308,394" fill="url(#deskT)" stroke="rgba(0,201,167,.25)" strokeWidth=".8"/>
              <rect x="288" y="345" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="289" y="346" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="311" y="343" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="312" y="344" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="336,350 382,328 416,350 370,372" fill="url(#deskT)" stroke="rgba(107,63,160,.25)" strokeWidth=".8"/>
              <rect x="350" y="323" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="351" y="324" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <rect x="373" y="321" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="374" y="322" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <polygon points="398,328 444,306 478,328 432,350" fill="url(#deskT)" stroke="rgba(245,166,35,.2)" strokeWidth=".8"/>
              <rect x="412" y="301" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="413" y="302" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <rect x="435" y="299" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="436" y="300" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <polygon points="460,306 506,284 540,306 494,328" fill="url(#deskT)" stroke="rgba(0,201,167,.2)" strokeWidth=".8"/>
              <rect x="474" y="279" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="475" y="280" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="497" y="277" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="498" y="278" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="234,436 280,414 314,436 268,458" fill="url(#deskT)" stroke="rgba(107,63,160,.2)" strokeWidth=".8"/>
              <rect x="248" y="409" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="249" y="410" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <rect x="271" y="407" width="20" height="14" rx="2" fill="#071022" stroke="#6B3FA0" strokeWidth=".7"/><rect x="272" y="408" width="18" height="12" rx="1" fill="url(#screenGP)"/>
              <polygon points="296,414 342,392 376,414 330,436" fill="url(#deskT)" stroke="rgba(0,201,167,.25)" strokeWidth=".8"/>
              <rect x="310" y="387" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="311" y="388" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="333" y="385" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="334" y="386" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <polygon points="358,392 404,370 438,392 392,414" fill="url(#deskT)" stroke="rgba(245,166,35,.2)" strokeWidth=".8"/>
              <rect x="372" y="365" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="373" y="366" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <rect x="395" y="363" width="20" height="14" rx="2" fill="#071022" stroke="#F5A623" strokeWidth=".7"/><rect x="396" y="364" width="18" height="12" rx="1" fill="url(#screenGA)"/>
              <polygon points="420,370 466,348 500,370 454,392" fill="url(#deskT)" stroke="rgba(232,66,106,.2)" strokeWidth=".8"/>
              <rect x="434" y="343" width="20" height="14" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/><rect x="435" y="344" width="18" height="12" rx="1" fill="rgba(232,66,106,.25)"/>
              <rect x="457" y="341" width="20" height="14" rx="2" fill="#071022" stroke="#E8426A" strokeWidth=".7"/><rect x="458" y="342" width="18" height="12" rx="1" fill="rgba(232,66,106,.25)"/>
              <polygon points="482,348 528,326 562,348 516,370" fill="url(#deskT)" stroke="rgba(0,201,167,.2)" strokeWidth=".8"/>
              <rect x="496" y="321" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="497" y="322" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <rect x="519" y="319" width="20" height="14" rx="2" fill="#071022" stroke="#00C9A7" strokeWidth=".7"/><rect x="520" y="320" width="18" height="12" rx="1" fill="url(#screenGT)"/>
              <text x="550" y="480" fontFamily="'JetBrains Mono'" fontSize="8" fill="rgba(255,255,255,.2)" textAnchor="middle">20-SEAT BFSI INNOVATION LAB · UPSKILLIZE SOLUTIONS</text>
              <ellipse cx="550" cy="490" rx="400" ry="12" fill="none" stroke="rgba(0,201,167,.08)" strokeWidth="1"/>
            </svg>
            <div className="lab3d-caption">
              <div>
                <div className="lab3d-caption-title">BFSI Innovation Lab — Isometric View</div>
                <div className="lab3d-caption-sub">20 dual-monitor workstations · 9 zone activations · Industry-grade display wall · InsurTech pod</div>
              </div>
              <div className="lab3d-pills">
                <span className="lab3d-pill t">Fintech Zone</span>
                <span className="lab3d-pill p">AI Studio</span>
                <span className="lab3d-pill a">Risk Hub</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── COVERAGE SPECTRUM ── */}
        <section className="sec sec-alt coverage-sec" id="coverage">
          <div className="sc">
            <div className="sec-label">Complete BFSI Spectrum</div>
            <h2 className="sec-title">Every Vertical. <span className="ht">One Lab.</span></h2>
            <p className="sec-sub">The only innovation lab in India covering the complete BFSI ecosystem — from retail banking to capital markets, InsurTech to RegTech, ESG reporting to Core Banking systems.</p>
          </div>
          <div className="coverage-inner reveal">
            <div className="cov-list">
              {/* ── % removed from cov-pct spans ── */}
              {[
                {dot:"#00C9A7",shadow:"rgba(0,201,167,.5)",label:"Banking & Fintech",w:95,grad:"#009E85,#00C9A7"},
                {dot:"#E8426A",shadow:"rgba(232,66,106,.5)",label:"InsurTech & Wealth",w:90,grad:"#c0405a,#E8426A"},
                {dot:"#6B3FA0",shadow:"rgba(107,63,160,.5)",label:"AI, GenAI & Emerging Tech",w:93,grad:"#4E2D7A,#6B3FA0"},
                {dot:"#F5A623",shadow:"rgba(245,166,35,.5)",label:"Capital Markets & Treasury",w:88,grad:"#C07A10,#F5A623"},
                {dot:"#22C55E",shadow:"rgba(34,197,94,.5)",label:"ESG & Sustainable Finance",w:85,grad:"#15803D,#22C55E"},
                {dot:"#00C9A7",shadow:"rgba(0,201,167,.4)",label:"Core Banking & ERP",w:92,grad:"#009E85,#00C9A7"},
                {dot:"#6B3FA0",shadow:"rgba(107,63,160,.4)",label:"RegTech & Compliance",w:91,grad:"#4E2D7A,#6B3FA0"},
                {dot:"#F5A623",shadow:"none",label:"Risk Management",w:94,grad:"#C07A10,#F5A623"},
              ].map((item,i)=>(
                <div className={`cov-item reveal${i>0?" d"+Math.min(i,3):""}`} key={item.label}>
                  <div className="cov-dot" style={{background:item.dot,boxShadow:item.shadow!=="none"?`0 0 8px ${item.shadow}`:"none"}}></div>
                  <div className="cov-label">{item.label}</div>
                  <div className="cov-bar-wrap">
                    <div className="cov-bar-track">
                      <div className="cov-bar-fill" data-w={item.w} style={{background:`linear-gradient(90deg,${item.grad})`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* SVG Radar — unchanged */}
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
                <text x="160" y="158" fontFamily="'Syne'" fontSize="11" fill="#07112E" textAnchor="middle" fontWeight="800">BFSI</text>
                <text x="160" y="172" fontFamily="'DM Sans'" fontSize="9" fill="#7A8CAB" textAnchor="middle">Full Spectrum</text>
              </svg>
              <div style={{fontSize:12,color:"var(--tx3)",fontFamily:"var(--fm)",letterSpacing:".5px",marginTop:8}}>BFSI COVERAGE RADAR</div>
            </div>
          </div>
        </section>

        {/* ── FRAMEWORK ZONES ── */}
        <section className="sec" id="framework">
          <div className="sc">
            <div className="sec-label">Complete Lab Framework</div>
            <h2 className="sec-title">9 Zones. <span className="ht">Every Module.</span> <span className="hp">One Lab.</span></h2>
            <p className="sec-sub">India's most comprehensive BFSI Innovation Lab framework — every zone, every module, faithfully delivered at your campus by Upskillize Solutions.</p>
          </div>
          <div className="fw-outer reveal">
            <div className="fw-title">BFSI Innovation Lab — <span>Upskillize</span> Delivery Framework</div>
            <div className="fw-subtitle">India's first dedicated BFSI Innovation Lab · Banking · Insurance · RegTech · AI · ESG · Core Banking · Capital Markets</div>

            {/* Row 1 */}
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
                </div>
                {/* ── % removed from z-bar-lbl right span ── */}
                <div className="z-bar"><div className="z-bar-lbl"><span>Industry coverage</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="92"></div></div></div>
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
                <div className="z-bar"><div className="z-bar-lbl"><span>Employer demand alignment</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="96"></div></div></div>
                <div className="z-note">Upskillize: Data to Decisions + GenAI courses</div>
              </div>

              <div className="zone za">
                <div className="z-head"><div className="z-icon">🎯</div><div className="z-title">Product &amp; design thinking lab</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Figma / UX tools</div><div className="mc-s">Banking app prototypes</div></div>
                  <div className="mc"><div className="mc-n">Lean canvas workshop</div><div className="mc-s">Fintech business model</div></div>
                  <div className="mc"><div className="mc-n">Agile sprints (SAFe)</div><div className="mc-s">PI planning simulation</div></div>
                  <div className="mc"><div className="mc-n">Pitch deck studio</div><div className="mc-s">VC / investor readiness</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>Startup readiness</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="88"></div></div></div>
                <div className="z-note">Upskillize: AI PM + Mini CEO Program</div>
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
                <div className="z-bar"><div className="z-bar-lbl"><span>Regulatory depth</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="94"></div></div></div>
                <div className="z-note">Upskillize: BFSI + SCR + FRM cert tracks</div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="zg">
              <div className="zone zr">
                <div className="z-head"><div className="z-icon">🛡️</div><div className="z-title">InsurTech &amp; wealth lab</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">InsurTech platforms</div><div className="mc-s">IRDAI sandbox, embedded ins.</div></div>
                  <div className="mc"><div className="mc-n">Claims &amp; underwriting AI</div><div className="mc-s">Automated loss assessment</div></div>
                  <div className="mc"><div className="mc-n">Wealth &amp; asset management</div><div className="mc-s">PMS, AIF, robo-advisory</div></div>
                  <div className="mc"><div className="mc-n">Bancassurance models</div><div className="mc-s">Cross-sell, distribution arch.</div></div>
                </div>
                <div className="z-bar"><div className="z-bar-lbl"><span>InsurTech coverage</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="91"></div></div></div>
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
                <div className="z-bar"><div className="z-bar-lbl"><span>System access depth</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="89"></div></div></div>
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
                <div className="z-bar"><div className="z-bar-lbl"><span>AI tool fluency</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="95"></div></div></div>
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
                <div className="z-bar"><div className="z-bar-lbl"><span>Markets depth</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="90"></div></div></div>
                <div className="z-note">Upskillize: Capital Markets + FRM track</div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="zr2">
              <div className="zone zt">
                <div className="z-head"><div className="z-icon">🌐</div><div className="z-title">Industry connect lounge</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">Live RegTech sessions</div><div className="mc-s">Compliance tech roundtables</div></div>
                  <div className="mc"><div className="mc-n">Hackathons &amp; ideathons</div><div className="mc-s">BFSI problem solving</div></div>
                </div>
                <div className="accent-box">Guest CXO lectures · Bank branch visits · Internship pipeline</div>
                <div className="z-bar" style={{marginTop:10}}><div className="z-bar-lbl"><span>Industry network reach</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="88"></div></div></div>
                <div className="z-note">Upskillize: RegTech &amp; Compliance Network</div>
              </div>

              <div className="zone za">
                <div className="z-head"><div className="z-icon">🏅</div><div className="z-title">Certification &amp; LMS corner</div></div>
                <div className="mcs">
                  <div className="mc"><div className="mc-n">CAIP / FRM / CDBL</div><div className="mc-s">Proctored cert exams</div></div>
                  <div className="mc"><div className="mc-n">lms.upskillize.com</div><div className="mc-s">Cohort progress view</div></div>
                </div>
                <div className="accent-box">Micro-credentials · Leaderboard · Placement readiness score</div>
                <div className="z-bar" style={{marginTop:10}}><div className="z-bar-lbl"><span>Credential market recognition</span></div><div className="z-bar-track"><div className="z-bar-fill" data-w="84"></div></div></div>
                <div className="z-note">Upskillize: LMS + certification infrastructure</div>
              </div>
            </div>

            {/* Capstone */}
            <div className="capstone">
              <div className="cap-head">
                <div className="cap-icon">🚀</div>
                <div className="cap-title">Capstone project bay — semester deliverables</div>
              </div>
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
              {n:1,title:"Discovery Call",desc:"We understand your college's BFSI programme, student profile, and infrastructure. Zero commitment needed."},
              {n:2,title:"Lab Design",desc:"Upskillize delivers a custom floor plan, zone layout, software stack, and curriculum calendar for your campus."},
              {n:3,title:"Setup & Install",desc:"Our team sets up workstations, display walls, LMS connectivity, and simulator access. You watch it come alive."},
              {n:4,title:"Faculty Onboarding",desc:"Train-the-trainer program prepares your faculty to facilitate all zones. Upskillize experts co-deliver for the first semester."},
              {n:5,title:"Students Go Live",desc:"Students log in to the LMS, enter the lab, and start building BFSI skills from Day 1 of the semester."},
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
            {/* ── "22+ Years" heading → "500+ Group Experience" ── */}
            <h2 className="sec-title">500+ years of Collective Experience.<br/><span className="ht">Delivered to Your Campus.</span></h2>
            <p className="sec-sub">No other EdTech in India can combine this depth of BFSI practitioner experience with a fully deployed innovation lab infrastructure.</p>
          </div>
          <div className="why-grid">
            {[
              {icon:"🏆",title:"First-of-Its-Kind in India",desc:"Pioneering the concept of a dedicated, physical BFSI Innovation Lab deployed inside college campuses — no other EdTech has done this"},
              {icon:"🎓",title:"Delivered by Industry Experts",desc:"Content built by FRM, PRM, SAFe-certified practitioners with live BFSI deployment across Credit Suisse, Emirates NBD, Oracle, FIS"},
              {icon:"🛡️",title:"Full BFSI Spectrum",desc:"Banking, InsurTech, Capital Markets, RegTech, ESG, AI, Core Banking — the only EdTech covering every BFSI vertical under one lab"},
              {icon:"🤖",title:"Claude-Powered LMS Agents",desc:"lms.upskillize.com runs AI agents for knowledge testing, mock exams, case study review, and AICTE RUBRIC scoring 24/7"},
              {icon:"📦",title:"Lab-in-a-Box Delivery",desc:"Layout blueprint, software stack, curriculum calendar, faculty training, LMS setup — everything delivered. Zero burden on college"},
              {icon:"🇮🇳",title:"India-First BFSI Content",desc:"HDFC, Yes Bank, IL&FS, Zerodha, UPI, DPDPA, RBI — real Indian BFSI case studies from Day 1. No borrowed foreign curricula"},
              {icon:"📜",title:"Co-Certification Model",desc:"Upskillize + college jointly certify graduates — creating market-recognised credentials that complement the MBA/PGDM degree"},
              {icon:"🏢",title:"Internship Pipeline",desc:"Structured placement funnel into partner banks, NBFCs, and fintech firms — lab performance feeds directly into internship matching"},
              {icon:"🌱",title:"ESG & RegTech Ready",desc:"Scope 1-3 reporting, BRSR, RBI green taxonomy, and RegTech automation — the skills BFSI employers will require in 2025-30"},
              {icon:"🔄",title:"Always-Current Curriculum",desc:"Quarterly reviews ensure RBI/SEBI/IRDAI changes, new AI tools, and exam updates are always reflected — never a stale curriculum"},
            ].map((c,i)=>(
              <div className={`why-card reveal${i%4!==0?" d"+(i%4):""}`} key={c.title}>
                <div className="why-icon-wrap"><span style={{fontSize:24}}>{c.icon}</span></div>
                <div className="why-title">{c.title}</div>
                <div className="why-desc">{c.desc}</div>
              </div>
            ))}
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
                <div>
                  <div className="bp-lbl">FOR STUDENTS</div>
                  <div className="bp-title">Excel Beyond the Degree</div>
                </div>
              </div>
              <ul className="bp-list">
                <li><strong>Employer-ready portfolio</strong> — graduate with live BFSI projects, not just a transcript</li>
                <li><strong>Industry certifications</strong> — CAIP, CDBL, FRM track credentials alongside your MBA/PGDM</li>
                <li><strong>Hands-on with real tools</strong> — Python, Power BI, Figma, UPI simulators, Oracle FLEXCUBE</li>
                <li><strong>Core banking system access</strong> — Oracle FLEXCUBE and SAP Banking exposure most graduates never see until 2 years into a job</li>
                <li><strong>ESG &amp; green finance literacy</strong> — Scope 1–3 reporting, BRSR, RBI green taxonomy skills now mandatory in BFSI hiring</li>
                <li><strong>InsurTech &amp; wealth exposure</strong> — embedded insurance, robo-advisory, and bancassurance across IRDAI and SEBI frameworks</li>
                <li><strong>RegTech tools fluency</strong> — AML automation, surveillance AI, and compliance screening that define the next decade of BFSI</li>
                <li><strong>Structured internship pathway</strong> — lab scores feed directly into partner bank and NBFC internship matching</li>
                <li><strong>AI-powered LMS</strong> — personalised paths, 24/7 mock exam support, instant case study feedback via Claude agents</li>
              </ul>
            </div>
            <div className="bp col reveal d1">
              <div className="bp-head">
                <div className="bp-icon">🏛️</div>
                <div>
                  <div className="bp-lbl">FOR COLLEGES</div>
                  <div className="bp-title">Differentiate. Accredit. Lead.</div>
                </div>
              </div>
              <ul className="bp-list">
                <li><strong>"First mover" institutional brand</strong> — be among the first colleges in India with a dedicated, accredited BFSI Innovation Lab</li>
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

        {/* ── PARTNERSHIP TIERS ── */}
        <section className="sec" id="partnership">
          <div className="sc">
            <div className="sec-label">Engagement Models</div>
            <h2 className="sec-title">Choose Your <span className="ht">Partnership Tier</span></h2>
            <p className="sec-sub">Flexible models for different institution sizes, budgets, and ambitions. All tiers include the core BFSI Innovation Lab framework and co-certification rights.</p>
          </div>
          <div className="pt-grid">
            <div className="pt base reveal">
              <span className="pt-badge">STANDARD</span>
              <div className="pt-name">Lab Essentials</div>
              <div className="pt-sub">Curriculum + LMS — ideal for year-one adoption</div>
              <ul className="pt-feats">
                <li>4 core zone activations</li>
                <li>lms.upskillize.com cohort access</li>
                <li>2 certification tracks (CAIP / CDBL)</li>
                <li>Quarterly content updates</li>
                <li>RegTech &amp; compliance webinars</li>
                <li>Faculty orientation (1 session)</li>
                <li>Basic placement dashboard</li>
              </ul>
            </div>
            <div className="pt feat reveal d1">
              <div className="popular">MOST POPULAR</div>
              <span className="pt-badge">PREMIUM</span>
              <div className="pt-name">Full Innovation Lab</div>
              <div className="pt-sub">Complete lab + all 9 zones — flagship partnership</div>
              <ul className="pt-feats">
                <li>All 9 zone activations</li>
                <li>Full LMS + Claude AI agent access</li>
                <li>CAIP + CDBL + FRM / PRM cert tracks</li>
                <li>Capstone review &amp; co-certification</li>
                <li>Monthly RegTech expert sessions</li>
                <li>Faculty train-the-trainer program</li>
                <li>Internship pipeline integration</li>
                <li>Oracle FLEXCUBE + SAP access</li>
                <li>Co-branded certification seals</li>
                <li>Placement performance analytics</li>
              </ul>
            </div>
            <div className="pt ent reveal d2">
              <span className="pt-badge">ENTERPRISE</span>
              <div className="pt-name">Centre of Excellence</div>
              <div className="pt-sub">Dedicated CoE — for nationally leading institutions</div>
              <ul className="pt-feats">
                <li>Everything in Full Lab tier</li>
                <li>Dedicated Upskillize faculty presence</li>
                <li>Physical lab design consultancy</li>
                <li>Custom Indian BFSI case study dev.</li>
                <li>Bank / NBFC MoU facilitation</li>
                <li>ESG reporting framework lab</li>
                <li>National hackathon hosting rights</li>
                <li>NAAC/NBA documentation support</li>
                <li>Research paper publication support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── SIGNUP CTA ── */}
        <div className="signup-sec" id="signup">
          <div style={{position:"relative",zIndex:1}}>
            <div className="sec-label">Get Started Today</div>
            <h2>Ready to Launch <span style={{color:"var(--t)"}}>India's Most Advanced</span><br/>BFSI Innovation Lab?</h2>
            <p>Join the movement. Be the first college in your city to give students a real BFSI Innovation Lab — and a real career head start.</p>
            <div className="signup-form">
              <input type="email" placeholder="Enter your institutional email..."/>
              <button type="button">Set Up Our Lab →</button>
            </div>
            <div className="signup-trust">
              <div className="signup-trust-item">✓ <span>Live in 60 days</span></div>
              <div className="signup-trust-item">✓ <span>NAAC documentation included</span></div>
              <div className="signup-trust-item">✓ <span>Co-certified graduates</span></div>
            </div>
            <div className="cta-links">
              <div className="cta-link">🌐 <a href="https://www.upskillize.com" target="_blank" rel="noreferrer">www.upskillize.com</a></div>
              <div className="cta-link">🖥️ <a href="https://lms.upskillize.com" target="_blank" rel="noreferrer">lms.upskillize.com</a></div>
              <div className="cta-link">📍 <span style={{color:"rgba(255,255,255,.55)"}}>Ramamurthy Nagar, Bangalore – 560016</span></div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}