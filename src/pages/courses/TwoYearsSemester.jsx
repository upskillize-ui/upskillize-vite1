import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════════
   PGDFDB— Post Graduate Diplona in FinTech & Digital Business | Upskillize
   Full website converted from HTML → JSX. All styles, content, and interactions
   preserved 1-to-1.
═══════════════════════════════════════════════════════════════════════════════ */

const GLOBAL_CSS = `

/* ── Brand & Reset ─────────────────────────────────────────────────────── */
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
  --off:      #F7F5FF;
  --light:    #EDE9F7;
  --text:     #1A1530;
  --muted:    #6B6585;
  --border:   rgba(91,75,138,.13);
  --muted:    #5C5478;
  --off:      #F7F6FF;

  /* ── Font system (matches new page) ── */
  --font-display: 'Plus Jakarta Sans', 'Syne', sans-serif;
  --font-body:    'Inter', 'Manrope', sans-serif;
  --font-serif:   'DM Serif Display', 'Fraunces', serif;

  /* ── Radius tokens ── */
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  14px;
  --radius-xl:  18px;
  --radius-2xl: 24px;

  /* ── Shadow tokens ── */
  --shadow-card:  0 2px 16px rgba(13,27,62,.07), 0 1px 4px rgba(13,27,62,.04);
  --shadow-hover: 0 8px 32px rgba(91,75,138,.14), 0 2px 8px rgba(13,27,62,.06);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);background:var(--white);color:var(--text);overflow-x:hidden;font-size:15px;line-height:1.65;-webkit-font-smoothing:antialiased;}
::selection{background:var(--purple);color:var(--white)}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--off);}
::-webkit-scrollbar-thumb{background:var(--purple-l);border-radius:3px;}

/* ── NAV ───────────────────────────────────────────────────────────────── */
nav {
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:14px 48px;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(13,27,62,.96);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(201,168,76,.2);
  transition:padding .3s, box-shadow .3s;
}
nav.scrolled{
  padding:10px 48px;
  box-shadow:0 4px 32px rgba(0,0,0,.35);
}
.nav-logo{
  font-family:var(--font-display),sans-serif;
  font-size:22px;font-weight:800;color:var(--white);
  text-decoration:none;white-space:nowrap;
}
.nav-logo span{color:var(--gold);}
.nav-links{
  display:flex;gap:4px;align-items:center;
}
.nav-links a{
  color:rgba(255,255,255,.65);text-decoration:none;
  font-size:12px;font-family:var(--font-body);font-weight:500;
  letter-spacing:.05em;text-transform:uppercase;
  padding:6px 10px;border-radius:6px;
  transition:color .2s, background .2s;
  position:relative;white-space:nowrap;
}
.nav-links a:hover{color:var(--gold);background:rgba(201,168,76,.08);}
.nav-links a.nav-active{color:var(--gold);}
.nav-links a.nav-active::after{
  content:'';position:absolute;bottom:-2px;left:50%;
  transform:translateX(-50%);
  width:18px;height:2px;border-radius:2px;background:var(--gold);
}
.nav-cta{
  background:var(--gold) !important;color:var(--navy) !important;
  padding:9px 22px !important;border-radius:var(--radius-md) !important;
  font-family:var(--font-display);font-size:13px;font-weight:700 !important;
  text-decoration:none;letter-spacing:.02em;
  transition:all .2s;white-space:nowrap;
  margin-left:8px;
}
.nav-cta:hover{background:var(--gold-l) !important;transform:translateY(-1px);}
.nav-cta.nav-active::after{display:none;}

/* ── hamburger button ── */
.nav-hamburger{
  display:none;flex-direction:column;gap:5px;
  background:none;border:none;cursor:pointer;padding:6px;z-index:1001;
}
.nav-hamburger span{
  display:block;width:24px;height:2px;
  background:rgba(255,255,255,.85);border-radius:2px;
  transition:all .3s;
}
.nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
.nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

/* ── mobile full-screen drawer ── */
.nav-drawer{
  position:fixed;inset:0;z-index:999;
  background:rgba(10,20,50,.98);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:4px;
  transform:translateX(100%);
  transition:transform .38s cubic-bezier(.22,.61,.36,1);
  pointer-events:none;
}
.nav-drawer.open{transform:translateX(0);pointer-events:all;}
.nav-drawer a{
  color:rgba(255,255,255,.72);text-decoration:none;
  font-size:18px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  padding:13px 36px;border-radius:10px;width:280px;text-align:center;
  transition:color .2s, background .2s;
}
.nav-drawer a:hover,.nav-drawer a.nav-active{color:var(--gold);background:rgba(201,168,76,.1);}
.nav-drawer .drawer-cta{
  margin-top:20px;
  background:var(--gold);color:var(--navy);
  font-weight:800;font-size:16px;border-radius:12px;
}
.nav-drawer .drawer-cta:hover{background:var(--gold-l);color:var(--navy);}

@media(max-width:1100px){
  nav{padding:14px 28px;}
  nav.scrolled{padding:10px 28px;}
  .nav-links a{font-size:11px;padding:5px 7px;}
}
@media(max-width:900px){
  .nav-links{display:none;}
  .nav-hamburger{display:flex;}
}

/* ── HERO ──────────────────────────────────────────────────────────────── */
.hero {
  min-height:100vh;
  background: linear-gradient(135deg, #0D1B3E 0%, #1A1048 40%, #2D1B69 75%, #0D1B3E 100%);
  position:relative;overflow:hidden;
  display:flex;align-items:center;
  padding:clamp(5rem,12vw,7.5rem) clamp(1rem,4vw,3rem) clamp(3rem,7vw,5rem);
}
.hero::before {
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 60% 40%, rgba(91,75,138,.4) 0%, transparent 70%),
             radial-gradient(ellipse 50% 40% at 20% 80%, rgba(74,144,226,.2) 0%, transparent 60%);
}
.hero-grid {
  display:grid;grid-template-columns:1fr 1fr;gap:80px;
  max-width:1280px;margin:0 auto;width:100%;
  position:relative;z-index:1;
}
.hero-badge {
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.4);
  color:var(--gold-l);font-size:12px;font-weight:600;letter-spacing:.08em;
  text-transform:uppercase;padding:7px 16px;border-radius:100px;
  margin-bottom:24px;
}
.hero-badge::before{content:'◆';font-size:8px;}
.hero h1 {
  font-family:var(--font-display),sans-serif;
  font-size:clamp(42px,5vw,68px);font-weight:800;
  color:var(--white);line-height:1.05;
  margin-bottom:12px;
}
.hero h1 em {
  font-style:normal;
  background:linear-gradient(135deg, var(--gold) 0%, var(--gold-l) 50%, #F5D690 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hero-sub {
  font-family:var(--font-serif),serif;font-size:22px;font-weight:300;font-style:italic;
  color:rgba(255,255,255,.6);margin-bottom:32px;line-height:1.4;
}
.hero-desc {
  color:rgba(255,255,255,.72);font-size:16px;line-height:1.8;margin-bottom:36px;
}
.hero-pills {
  display:flex;flex-wrap:wrap;gap:10px;margin-bottom:40px;
}
.pill {
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);
  color:rgba(255,255,255,.8);font-size:12px;font-weight:600;
  padding:6px 14px;border-radius:100px;letter-spacing:.04em;
}
.hero-btns{display:flex;gap:16px;flex-wrap:wrap;}
.btn-primary {
  background:linear-gradient(135deg,var(--purple),var(--blue));
  color:var(--white);padding:14px 32px;border-radius:var(--radius-md);
  font-family:var(--font-display);font-size:15px;font-weight:700;text-decoration:none;letter-spacing:.02em;
  transition:all .25s;box-shadow:0 4px 20px rgba(91,75,138,.35);
  display:inline-flex;align-items:center;gap:8px;
}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(91,75,138,.6);}
.btn-secondary {
  background:transparent;border:1.5px solid rgba(255,255,255,.28);
  color:var(--white);padding:14px 32px;border-radius:var(--radius-md);
  font-family:var(--font-display);font-size:15px;font-weight:600;text-decoration:none;letter-spacing:.02em;
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
}
.btn-secondary:hover{border-color:var(--gold);color:var(--gold);}

/* Hero right: floating card stack */
.hero-right{position:relative;display:flex;align-items:center;justify-content:center;}
.hero-card-main {
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(20px);
  border-radius:20px;padding:40px;
  width:100%;max-width:420px;
}
.hc-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;}
.hc-title{font-family:var(--font-display),sans-serif;font-size:28px;font-weight:800;color:var(--white);margin-bottom:4px;}
.hc-sub{font-size:13px;color:rgba(255,255,255,.5);margin-bottom:32px;}
.stat-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;}
.stat-box{
  background:rgba(255,255,255,.06);border-radius:12px;padding:16px;
  border:1px solid rgba(255,255,255,.08);text-align:center;
}
.stat-num{font-family:var(--font-display),sans-serif;font-size:26px;font-weight:800;color:var(--gold);}
.stat-lbl{font-size:11px;color:rgba(255,255,255,.5);font-weight:500;margin-top:2px;}
.course-tags{display:flex;flex-direction:column;gap:8px;}
.ctag{
  display:flex;align-items:center;gap:10px;
  background:rgba(255,255,255,.04);border-radius:8px;padding:10px 14px;
  border:1px solid rgba(255,255,255,.07);
}
.ctag-icon{font-size:16px;}
.ctag-text{font-size:13px;color:rgba(255,255,255,.75);font-weight:500;}

/* floating orbs */
.orb{position:absolute;border-radius:50%;filter:blur(40px);pointer-events:none;}
.orb1{width:300px;height:300px;background:rgba(91,75,138,.3);top:-60px;right:-80px;}
.orb2{width:200px;height:200px;background:rgba(74,144,226,.2);bottom:-40px;left:-60px;}

/* Ticker strip */
.ticker{
  background:linear-gradient(90deg, var(--purple-d), var(--navy));
  border-top:1px solid rgba(201,168,76,.3);
  padding:14px 0;overflow:hidden;
}
.ticker-inner{display:flex;animation:ticker 30s linear infinite;white-space:nowrap;}
.ticker-item{
  color:rgba(255,255,255,.7);font-size:13px;font-weight:500;
  padding:0 40px;display:inline-flex;align-items:center;gap:10px;
}
.ticker-item span{color:var(--gold);font-weight:700;}
.ticker-sep{color:var(--purple-l);}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ── SECTIONS general ──────────────────────────────────────────────────── */
section{padding:clamp(2.5rem,7vw,6rem) clamp(1rem,4vw,3rem);}
.container{max-width:1280px;margin:0 auto;}
.section-label{
  font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--purple);margin-bottom:14px;
  display:flex;align-items:center;gap:10px;
}
.section-label::before{content:'';display:block;width:24px;height:2px;background:var(--gold);}
h2.section-title{
  font-family:var(--font-display),sans-serif;font-size:clamp(32px,4vw,52px);
  font-weight:800;color:var(--text);line-height:1.1;margin-bottom:20px;
}
h2.section-title em{font-style:normal;color:var(--purple);}
.section-lead{font-size:17px;color:var(--muted);line-height:1.78;max-width:680px;margin-bottom:56px;}}
.text-center{text-align:center;}.mx-auto{margin:0 auto;}

/* ── MARKET OPPORTUNITY (dark) ─────────────────────────────────────────── */
.market {
  background:linear-gradient(135deg,var(--navy) 0%,#1A1048 60%,var(--navy-m) 100%);
  position:relative;overflow:hidden;
}
.market::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 80% at 80% 50%, rgba(91,75,138,.25) 0%, transparent 65%);
}
.market .section-label{color:var(--gold);}
.market h2.section-title { color: var(--white); }
.market .section-lead{color:rgba(255,255,255,.6);}
.market-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08);border-radius:16px;overflow:hidden;margin:60px 0;}
.mstat{
  background:rgba(255,255,255,.04);
  padding:40px 32px;text-align:center;
  transition:background .3s;
}
.mstat:hover{background:rgba(91,75,138,.2);}
.mstat-num{
  font-family:var(--font-display),sans-serif;font-size:clamp(1.75rem,4.5vw,3.25rem);font-weight:800;
  background:linear-gradient(135deg,var(--gold),var(--gold-l));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:8px;
}
.mstat-label{font-size:14px;color:rgba(255,255,255,.6);font-weight:500;line-height:1.4;}
.mstat-sub{font-size:12px;color:rgba(255,255,255,.35);margin-top:4px;}
.market-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.mcard{
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:32px;position:relative;overflow:hidden;
  transition:all .3s;
}
.mcard:hover{border-color:rgba(201,168,76,.3);transform:translateY(-4px);}
.mcard::before{
  content:attr(data-icon);
  position:absolute;right:20px;top:20px;
  font-size:48px;opacity:.12;
}
.mcard-tag{
  font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  margin-bottom:12px;
}
.mcard h3{font-family:var(--font-display),sans-serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:10px;}
.mcard p{font-size:14px;color:rgba(255,255,255,.55);line-height:1.65;}
.mcard ul{list-style:none;margin-top:14px;}
.mcard ul li{font-size:13px;color:rgba(255,255,255,.5);padding:4px 0;padding-left:16px;position:relative;}
.mcard ul li::before{content:'→';position:absolute;left:0;color:var(--gold);font-size:11px;}

/* ── FINTECH REVOLUTION ────────────────────────────────────────────────── */
.fintech{background:var(--off);}
.fintech-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:60px;}
.fintech-visual{
  background:linear-gradient(135deg,var(--purple-d),var(--navy));
  border-radius:24px;padding:48px;position:relative;overflow:hidden;
}
.fintech-visual::before{
  content:'';position:absolute;top:-40px;right:-40px;
  width:200px;height:200px;
  background:radial-gradient(circle,rgba(201,168,76,.2),transparent);
}
.fv-title{font-family:var(--font-display),sans-serif;font-size:34px;font-weight:800;color:var(--white);margin-bottom:24px;line-height:1.1;}
.fv-title em{font-style:normal;color:var(--gold);}
.fv-list{list-style:none;}
.fv-list li{
  display:flex;align-items:flex-start;gap:14px;
  padding:16px 0;border-bottom:1px solid rgba(255,255,255,.07);
  color:rgba(255,255,255,.75);font-size:14px;line-height:1.5;
}
.fv-list li:last-child{border-bottom:none;}
.fv-list li .icon{font-size:20px;flex-shrink:0;margin-top:1px;}
.fv-list li strong{color:var(--gold);display:block;font-size:13px;margin-bottom:2px;font-weight:700;}
.fintech-points{display:grid;gap:24px;}
.fp{
  display:grid;grid-template-columns:56px 1fr;gap:20px;align-items:start;
  background:var(--white);border-radius:14px;padding:24px;
  border:1px solid var(--border);box-shadow:0 2px 20px rgba(91,75,138,.06);
  transition:all .3s;
}
.fp:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(91,75,138,.12);border-color:var(--purple);}
.fp-icon{
  width:56px;height:56px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;font-size:24px;
}
.fp h4{font-family:var(--font-display),sans-serif;font-size:16px;font-weight:700;color:var(--text);margin-bottom:6px;}
.fp p{font-size:13px;color:var(--muted);line-height:1.6;}

/* ── COURSE OVERVIEW ───────────────────────────────────────────────────── */
.overview{background:var(--white);}
.parts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px;margin-top:60px;}
.part-card{
  border-radius:20px;overflow:hidden;
  border:1px solid var(--border);
  transition:all .35s;position:relative;
}
.part-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(91,75,138,.15);}
.part-header{padding:32px 32px 24px;}
.part-num{
  font-family:var(--font-display),sans-serif;font-size:13px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;opacity:.8;
}
.part-title{font-family:var(--font-display),sans-serif;font-size:22px;font-weight:800;margin-bottom:6px;}
.part-timeline{font-size:12px;opacity:.7;font-weight:500;}
.part-body{padding:0 32px 32px;}
.module-list{list-style:none;}
.module-list li{
  display:flex;align-items:center;gap:10px;
  padding:8px 0;border-bottom:1px solid rgba(0,0,0,.05);
  font-size:13px;color:var(--text);font-weight:500;
}
.module-list li:last-child{border-bottom:none;}
.module-list li .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.cert-badge{
  font-size:12px;font-weight:700;letter-spacing:.06em;
  padding:6px 14px;border-radius:100px;
  display:inline-flex;align-items:center;gap:6px;
}
.cert-badge::before{content:'🏅';}

/* Semester 1 - blue */
.part-1 .part-header{background:linear-gradient(135deg,#EBF4FF,#F0F8FF);}
.part-1 .part-num{color:var(--blue);}
.part-1 .part-title{color:var(--navy);}
.part-1 .dot{background:var(--blue);}
.part-1 .cert-badge{background:rgba(74,144,226,.12);color:var(--blue);}
/* Semester 2 - purple */
.part-2 .part-header{background:linear-gradient(135deg,var(--light),#F5F0FF);}
.part-2 .part-num{color:var(--purple);}
.part-2 .part-title{color:var(--purple-d);}
.part-2 .dot{background:var(--purple);}
.part-2 .cert-badge{background:rgba(91,75,138,.1);color:var(--purple);}
/* Semester 3 - crimson */
.part-3 .part-header{background:linear-gradient(135deg,#FFF0F0,#FFF5F5);}
.part-3 .part-num{color:#C0392B;}
.part-3 .part-title{color:#8B0000;}
.part-3 .dot{background:#C0392B;}
.part-3 .cert-badge{background:rgba(192,57,43,.1);color:#C0392B;}
/* Semester 4 - gold */
.part-4 .part-header{background:linear-gradient(135deg,var(--goldLight,#FFF8E1),#FFFAEC);}
.part-4 .part-num{color:#B8860B;}
.part-4 .part-title{color:#8B6914;}
.part-4 .dot{background:var(--gold);}
.part-4 .cert-badge{background:rgba(201,168,76,.15);color:#8B6914;}

/* ── RUBRIC ────────────────────────────────────────────────────────────── */
.rubric-section{
  background:linear-gradient(160deg,var(--navy) 0%,#1A1048 50%,var(--navy-m) 100%);
  position:relative;overflow:hidden;
}
.rubric-section::after{
  content:'RUBRIC';
  position:absolute;right:-60px;bottom:-80px;
  font-family:var(--font-display),sans-serif;font-size:200px;font-weight:900;
  color:rgba(245, 236, 236, 0.06);letter-spacing:-.02em;pointer-events:none;
}
.rubric-section .section-label{color:var(--gold);}
.rubric-section h2{color:var(--white);}
.rubric-section .section-lead{color:rgba(255,255,255,.55);}
.rubric-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:rgba(255,255,255,.06);border-radius:20px;overflow:hidden;margin-top:60px;}
.rubric-card{
  padding:40px 32px;
  transition:background .3s;
  position:relative;
}
.rubric-card:hover{background:rgba(255,255,255,.05);}
.r-letter{
  font-family:var(--font-display),sans-serif;font-size:clamp(2rem,5.5vw,4rem);font-weight:900;
  line-height:1;margin-bottom:16px;
  background:linear-gradient(135deg,var(--gold),var(--gold-l));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.r-title{font-family:var(--font-display),sans-serif;font-size:18px;font-weight:700;color:var(--white);margin-bottom:10px;}
.r-body{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}
.r-example{
  margin-top:14px;font-size:12px;font-style:italic;
  color:rgba(201,168,76,.6);line-height:1.5;
}

/* ── INNOVATION LAB ────────────────────────────────────────────────────── */
.lab-section{background:var(--off);}
.lab-hero-banner{
  background:linear-gradient(135deg,var(--purple-d),#0D3B6E);
  border-radius:24px;padding:56px;margin-bottom:60px;
  position:relative;overflow:hidden;
  display:grid;grid-template-columns:1fr auto;align-items:center;gap:40px;
}
.lab-hero-banner::before{
  content:'⚗';
  position:absolute;right:120px;top:50%;transform:translateY(-50%);
  font-size:180px;opacity:.06;
}
.lab-title{font-family:var(--font-display),sans-serif;font-size:36px;font-weight:800;color:var(--white);margin-bottom:12px;}
.lab-lead{font-size:16px;color:rgba(255,255,255,.65);line-height:1.65;max-width:540px;}
.lab-stat-stack{display:flex;flex-direction:column;gap:16px;flex-shrink:0;}
.ls{
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);
  border-radius:12px;padding:16px 24px;text-align:center;min-width:140px;
}
.ls-num{font-family:var(--font-display),sans-serif;font-size:30px;font-weight:800;color:var(--gold);}
.ls-lbl{font-size:12px;color:rgba(255,255,255,.5);font-weight:500;}
.lab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.lab-card{
  background:var(--white);border-radius:16px;padding:28px;
  border:1px solid var(--border);
  transition:all .3s;
  display:flex;flex-direction:column;gap:12px;
}
.lab-card:hover{border-color:var(--purple);transform:translateY(-4px);box-shadow:0 12px 40px rgba(91,75,138,.1);}
.lab-card-icon{font-size:32px;}
.lab-card h4{font-family:var(--font-display),sans-serif;font-size:15px;font-weight:700;color:var(--text);}
.lab-card p{font-size:13px;color:var(--muted);line-height:1.6;}
.lab-tag{
  font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
  padding:4px 10px;border-radius:4px;display:inline-block;margin-top:4px;
  background:var(--light);color:var(--purple);
}

/* ── STARTUP & PRODUCT ─────────────────────────────────────────────────── */
.startup{background:var(--white);}
.startup-layout{display:grid;grid-template-columns:1.2fr 1fr;gap:72px;align-items:start;margin-top:60px;}
.startup-cards{display:grid;gap:16px;}
.sc{
  display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:start;
  border:1px solid var(--border);border-radius:14px;padding:24px;
  transition:all .3s;
}
.sc:hover{border-color:var(--purple);box-shadow:0 4px 24px rgba(91,75,138,.08);}
.sc-icon{
  width:48px;height:48px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;
}
.sc h4{font-family:var(--font-display),sans-serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;}
.sc p{font-size:13px;color:var(--muted);line-height:1.6;}
.startup-right{position:sticky;top:100px;}
.sr-card{
  background:linear-gradient(160deg,var(--navy),#1A1048);
  border-radius:20px;padding:40px;
}
.sr-card h3{font-family:var(--font-display),sans-serif;font-size:24px;font-weight:800;color:var(--white);margin-bottom:20px;line-height:1.2;}
.sr-card h3 em{font-style:normal;color:var(--gold);}
.role-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.role-chip{
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;padding:14px;
  transition:all .3s;
}
.role-chip:hover{background:rgba(91,75,138,.3);border-color:var(--purple-l);}
.role-chip h5{font-size:13px;font-weight:700;color:var(--white);margin-bottom:4px;}
.role-chip p{font-size:11px;color:rgba(255,255,255,.45);}
.role-chip .salary{
  font-family:var(--font-display),sans-serif;font-size:15px;font-weight:700;
  color:var(--gold);margin-top:8px;
}

/* ── CAREER JOURNEY ────────────────────────────────────────────────────── */
.career{
  background:linear-gradient(135deg,var(--light) 0%,#F0EBF9 50%,var(--light) 100%);
}
.journey-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:64px;position:relative;}
.journey-steps::before{
  content:'';position:absolute;top:40px;left:10%;right:10%;height:2px;
  background:linear-gradient(90deg,var(--purple),var(--blue));
  z-index:0;
}
.js-step{text-align:center;position:relative;z-index:1;padding:0 16px;}
.js-circle{
  width:80px;height:80px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:28px;margin:0 auto 20px;
  border:3px solid var(--white);
  box-shadow:0 4px 20px rgba(91,75,138,.2);
}
.js-step h4{font-family:var(--font-display),sans-serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;}
.js-step p{font-size:12px;color:var(--muted);line-height:1.5;}
.js-step .timeline{
  font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  margin-bottom:8px;
}

/* ── PLACEMENT ─────────────────────────────────────────────────────────── */
.placement-section{background:var(--white);}
.placement-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;margin-top:60px;}
.pf-list{display:grid;gap:16px;}
.pf{
  display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:start;
  padding:20px;background:var(--off);border-radius:12px;border-left:3px solid var(--purple);
}
.pf-icon{width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-size:22px;}
.pf h4{font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px;}
.pf p{font-size:13px;color:var(--muted);line-height:1.55;}
.p-cta-card{
  background:linear-gradient(160deg,var(--purple-d),var(--navy));
  border-radius:20px;padding:40px;position:sticky;top:100px;
}
.p-cta-card h3{font-family:var(--font-display),sans-serif;font-size:26px;font-weight:800;color:var(--white);margin-bottom:16px;line-height:1.2;}
.p-cta-card h3 em{font-style:normal;color:var(--gold);}
.p-cta-card p{font-size:14px;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:24px;}
.guarantee-row{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.07);border-radius:10px;padding:14px;margin-bottom:10px;}
.guarantee-row .num{font-family:var(--font-display),sans-serif;font-size:28px;font-weight:800;color:var(--gold);}
.guarantee-row .txt{font-size:13px;color:rgba(255,255,255,.7);}
.internship-band{
  background:linear-gradient(135deg,var(--teal),#0B6B75);
  border-radius:12px;padding:20px;margin-top:20px;
}
.internship-band h4{font-family:var(--font-display),sans-serif;font-size:15px;font-weight:700;color:var(--white);margin-bottom:6px;}
.internship-band p{font-size:13px;color:rgba(255,255,255,.7);}

/* ── CERTIFICATES ──────────────────────────────────────────────────────── */
.certs-section{
  background:linear-gradient(135deg,var(--navy),#1A1048);
  position:relative;overflow:hidden;
}
.certs-section::before{
  content:'';position:absolute;top:0;left:0;right:0;bottom:0;
  background:radial-gradient(ellipse 70% 50% at 30% 50%,rgba(91,75,138,.3),transparent);
}
.certs-section .section-label{color:var(--gold);}
.certs-section h2.section-title{color:var(--white) !important;}
.certs-section .section-lead{color:rgba(255,255,255,.55);}
.cert-path{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:rgba(255,255,255,.06);border-radius:20px;overflow:hidden;margin-top:60px;position:relative;z-index:1;}
.cert-step{padding:40px 28px;transition:background .3s;text-align:center;}
.cert-step:hover{background:rgba(255,255,255,.06);}
.cs-num{
  font-family:var(--font-display),sans-serif;font-size:13px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;
}
.cs-icon{font-size:36px;margin-bottom:16px;display:block;}
.cs-title{font-family:var(--font-display),sans-serif;font-size:16px;font-weight:800;color:var(--white);margin-bottom:8px;line-height:1.2;}
.cs-sub{font-size:12px;color:rgba(255,255,255,.45);margin-bottom:14px;}
.cs-badge{
  display:inline-block;font-size:11px;font-weight:700;letter-spacing:.06em;
  padding:5px 12px;border-radius:100px;
  background:rgba(201,168,76,.15);color:var(--gold-l);border:1px solid rgba(201,168,76,.3);
}
.final-cert{
  background:linear-gradient(135deg,rgba(201,168,76,.15),rgba(201,168,76,.08));
  border:1px solid rgba(201,168,76,.3);border-radius:20px;
  padding:clamp(1.5rem,4vw,3.5rem);margin-top:32px;text-align:center;position:relative;z-index:1;
  overflow:hidden;
}
.final-cert::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(201,168,76,.08),transparent);
}
.fc-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;}
.fc-title{font-family:var(--font-display),sans-serif;font-size:clamp(24px,3vw,40px);font-weight:800;color:var(--white);margin-bottom:8px;}
.fc-sub{font-family:var(--font-serif),serif;font-style:italic;font-size:20px;color:var(--gold-l);margin-bottom:20px;}
.fc-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;}
.fc-tag{
  font-size:12px;font-weight:600;
  padding:6px 14px;border-radius:100px;
  background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);
  border:1px solid rgba(255,255,255,.12);
}

/* ── QUOTE STRIP ───────────────────────────────────────────────────────── */
.quote-strip{
  background:var(--purple);padding:clamp(2rem,6vw,4.5rem) clamp(1rem,4vw,3rem);
  text-align:center;position:relative;overflow:hidden;
}
.quote-strip::before{
  content:'"';position:absolute;left:5%;top:-20px;
  font-family:var(--font-serif),serif;font-size:240px;color:rgba(255,255,255,.04);line-height:1;
}
.quote-strip blockquote{
  font-family:var(--font-serif),serif;font-size:clamp(24px,3.5vw,40px);font-weight:300;
  font-style:italic;color:var(--white);max-width:900px;margin:0 auto;
  line-height:1.4;position:relative;z-index:1;
}
.quote-strip cite{
  display:block;margin-top:24px;font-style:normal;
  font-size:14px;font-weight:600;letter-spacing:.06em;
  color:rgba(255,255,255,.6);font-family:var(--font-body),sans-serif;
}

/* ── COLLEGES CTA ──────────────────────────────────────────────────────── */
.colleges-cta{background:var(--off);}
.cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:60px;}
.cta-card{
  border-radius:20px;padding:48px;
  transition:all .35s;
}
.cta-card:hover{transform:translateY(-4px);}
.cta-card.for-colleges{background:linear-gradient(135deg,var(--navy),#1A1048);border:1px solid rgba(255,255,255,.08);}
.cta-card.for-students{background:linear-gradient(135deg,var(--purple-d),var(--purple));border:1px solid rgba(91,75,138,.3);}
.cta-card h3{font-family:var(--font-display),sans-serif;font-size:26px;font-weight:800;color:var(--white);margin-bottom:12px;}
.cta-card .eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px;color:var(--gold);}
.cta-card p{font-size:14px;color:rgba(255,255,255,.65);line-height:1.65;margin-bottom:28px;}
.cta-card .points{list-style:none;margin-bottom:32px;}
.cta-card .points li{font-size:13px;color:rgba(255,255,255,.6);padding:6px 0;padding-left:20px;position:relative;}
.cta-card .points li::before{content:'✓';position:absolute;left:0;color:var(--gold);font-size:12px;font-weight:700;}
.btn-gold{
  background:linear-gradient(135deg,var(--gold),var(--gold-l));
  color:var(--navy);padding:14px 32px;border-radius:var(--radius-md);
  font-family:var(--font-display);font-size:15px;font-weight:800;text-decoration:none;letter-spacing:.02em;
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,.4);}
.btn-white{
  background:rgba(255,255,255,.15);
  border:1.5px solid rgba(255,255,255,.28);
  color:var(--white);padding:14px 32px;border-radius:var(--radius-md);
  font-family:var(--font-display);font-size:15px;font-weight:700;text-decoration:none;letter-spacing:.02em;
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
}
.btn-white:hover{background:rgba(255,255,255,.25);transform:translateY(-2px);}
/* Brand column */
/* ── ANIMATIONS ────────────────────────────────────────────────────────── */
.fade-up{opacity:0;transform:translateY(24px);transition:all .65s cubic-bezier(.22,.61,.36,1);}
.fade-up.visible{opacity:1;transform:translateY(0);}
.fade-up-d1{transition-delay:.1s;}
.fade-up-d2{transition-delay:.2s;}
.fade-up-d3{transition-delay:.3s;}
.fade-up-d4{transition-delay:.4s;}

/* counter animation */
.count-num{transition:all 0.05s;}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPOGRAPHY SYSTEM — Upskillize Brand Match
   Fonts: Syne (headings) · Manrope (body/UI) · Fraunces (serif accent)
   Scale: 10 → 11 → 12 → 13 → 14 → 15 → 16 → 18 → 20 → 22 → 24 → 28 → 32+
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Base typography reset ───────────────────────────────────────────────── */
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
body {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text);
  letter-spacing: -0.01em;
}

/* ── Heading hierarchy — Syne ────────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--text);
}
h1 { font-size: clamp(40px, 5.5vw, 72px); font-weight: 900; line-height: 1.02; letter-spacing: -0.035em; }
h2 { font-size: clamp(28px, 3.8vw, 52px); font-weight: 800; line-height: 1.08; letter-spacing: -0.028em; }
h3 { font-size: clamp(22px, 2.5vw, 32px); font-weight: 800; line-height: 1.1;  letter-spacing: -0.02em; }
h4 { font-size: clamp(16px, 1.5vw, 20px); font-weight: 700; line-height: 1.2;  letter-spacing: -0.015em; }
h5 { font-size: 15px; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
h6 { font-size: 13px; font-weight: 700; line-height: 1.4; letter-spacing: 0; }

/* ── Body text variants ──────────────────────────────────────────────────── */
p   { font-size: 15px; line-height: 1.72; color: var(--text); margin: 0; }

.text-xl   { font-size: 20px; line-height: 1.55; }
.text-lg   { font-size: 18px; line-height: 1.65; }
.text-md   { font-size: 16px; line-height: 1.7;  }
.text-base { font-size: 15px; line-height: 1.72; }
.text-sm   { font-size: 13px; line-height: 1.65; }
.text-xs   { font-size: 12px; line-height: 1.6;  }
.text-xxs  { font-size: 11px; line-height: 1.55; }

/* ── Section structure ───────────────────────────────────────────────────── */
.section-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--purple);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-label::before {
  content: '';
  display: block;
  width: 28px;
  height: 2.5px;
  background: var(--gold);
  border-radius: 2px;
}
h2.section-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 900;
  color: var(--text);
  line-height: 1.06;
  margin-bottom: 20px;
  letter-spacing: -0.03em;
}
h2.section-title em { font-style: normal; color: var(--purple); }
.section-lead {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 400;
  color: var(--muted);
  line-height: 1.78;
  max-width: 700px;
  letter-spacing: -0.005em;
}

/* ── Navigation ──────────────────────────────────────────────────────────── */
.nav-logo {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 900;
  color: var(--white);
  letter-spacing: -0.04em;
}
.nav-logo span { color: var(--gold); }
.nav-links a {
  font-family: var(--font-body);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}
.nav-cta {
  font-family: var(--font-body);
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

/* ── Hero section ────────────────────────────────────────────────────────── */
.hero-badge {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(44px, 5.8vw, 72px);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: var(--white);
}
.hero h1 em {
  font-style: normal;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-l) 50%, #F5D690 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-family: var(--font-serif);
  font-size: 21px;
  font-weight: 400;
  font-style: italic;
  color: rgba(255,255,255,.65);
  letter-spacing: -0.01em;
  line-height: 1.45;
  margin-bottom: 28px;
}
.hero-desc {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
  color: rgba(255,255,255,.72);
  line-height: 1.8;
  letter-spacing: -0.005em;
}
.pill {
  font-family: var(--font-body);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

/* ── Hero card ───────────────────────────────────────────────────────────── */
.hc-label  { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.hc-title  { font-family:var(--font-display),sans-serif;    font-size:27px;   font-weight:900; letter-spacing:-0.03em; }
.hc-sub    { font-family:var(--font-body),sans-serif; font-size:13px;   font-weight:400; }
.stat-num  { font-family:var(--font-display),sans-serif;    font-size:28px;   font-weight:900; letter-spacing:-0.03em; }
.stat-lbl  { font-family:var(--font-body),sans-serif; font-size:11px;   font-weight:500; line-height:1.4; }
.ctag-text { font-family:var(--font-body),sans-serif; font-size:13px;   font-weight:600; }

/* ── Ticker ──────────────────────────────────────────────────────────────── */
.ticker-item {
  font-family: var(--font-body);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.ticker-item span { font-weight: 800; color: var(--gold); }

/* ── Market stats ────────────────────────────────────────────────────────── */
.mstat-num {
  font-family: var(--font-display);
  font-size: clamp(1.75rem,4.5vw,3.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
}
.mstat-label { font-family:var(--font-body),sans-serif; font-size:14px; font-weight:500; line-height:1.45; }
.mstat-sub   { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:400; }
.mcard h3    { font-family:var(--font-display),sans-serif;    font-size:20px; font-weight:800; letter-spacing:-0.02em; }
.mcard p     { font-family:var(--font-body),sans-serif; font-size:14px; font-weight:400; line-height:1.7; }
.mcard ul li { font-family:var(--font-body),sans-serif; font-size:13px; font-weight:500; }

/* ── Fintech section ─────────────────────────────────────────────────────── */
.fv-title { font-family:var(--font-display),sans-serif;    font-size:34px; font-weight:900; line-height:1.08; letter-spacing:-0.03em; }
.fp h4    { font-family:var(--font-display),sans-serif;    font-size:16px; font-weight:800; letter-spacing:-0.015em; }
.fp p     { font-family:var(--font-body),sans-serif; font-size:13.5px; font-weight:400; line-height:1.68; }

/* ── Semester cards / overview ───────────────────────────────────────────────── */
.part-num     { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.part-title   { font-family:var(--font-display),sans-serif;    font-size:22px; font-weight:900; line-height:1.1; letter-spacing:-0.025em; }
.part-timeline{ font-family:var(--font-body),sans-serif; font-size:12px; font-weight:500; }
.module-list li { font-family:var(--font-body),sans-serif; font-size:13.5px; font-weight:500; line-height:1.6; }
.cert-badge   { font-family:var(--font-body),sans-serif; font-size:11.5px; font-weight:700; letter-spacing:.05em; }

/* ── Syllabus ────────────────────────────────────────────────────────────── */
.syl-tab   { font-family:var(--font-display),sans-serif;    font-size:13px; font-weight:700; letter-spacing:.04em; }
.sph-left h3 { font-family:var(--font-display),sans-serif; font-size:24px; font-weight:900; letter-spacing:-0.025em; }
.sph-left p  { font-family:var(--font-body),sans-serif; font-size:14px; font-weight:400; }
.mh-title  { font-family:var(--font-display),sans-serif;    font-size:17px; font-weight:800; letter-spacing:-0.015em; }
.mh-num    { font-family:var(--font-display),sans-serif;    font-size:12.5px; font-weight:800; letter-spacing:.04em; }
.mh-meta   { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:500; }
.syl-table { font-size:13.5px; }
.syl-table thead th { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.09em; }
.syl-table td       { font-family:var(--font-body),sans-serif; line-height:1.6; }
.syl-table td:nth-child(2) { font-family:var(--font-body),sans-serif; font-weight:700; }
.tag-pill  { font-family:var(--font-body),sans-serif; font-size:10px;  font-weight:800; letter-spacing:.04em; }
.hrs-cell  { font-family:var(--font-body),sans-serif; font-size:11px;  font-weight:700; }
.capstone-box .cap-label { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.12em; }
.capstone-box h4 { font-family:var(--font-display),sans-serif; font-size:19px; font-weight:900; letter-spacing:-0.02em; }
.capstone-box p  { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.68; }

/* ── Careers detail ──────────────────────────────────────────────────────── */
.career-tab { font-family:var(--font-body),sans-serif; font-size:13px; font-weight:700; letter-spacing:.02em; }
.rc-domain  { font-family:var(--font-body),sans-serif; font-size:10px; font-weight:800; letter-spacing:.12em; }
.rc-role    { font-family:var(--font-display),sans-serif;    font-size:17px; font-weight:900; letter-spacing:-0.02em; }
.rc-company { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:500; }
.rc-salary  { font-family:var(--font-display),sans-serif;    font-size:24px; font-weight:900; letter-spacing:-0.03em; }
.rc-salary-lbl { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:500; }
.rc-skills li  { font-family:var(--font-body),sans-serif; font-size:12.5px; font-weight:500; }
.rc-growth     { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:700; }
.int-phase  { font-family:var(--font-body),sans-serif; font-size:10px; font-weight:800; letter-spacing:.12em; }
.int-role   { font-family:var(--font-display),sans-serif;    font-size:16px; font-weight:900; letter-spacing:-0.02em; }
.int-type   { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:500; }
.int-detail { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.65; }
.int-salary { font-family:var(--font-display),sans-serif;    font-size:18px; font-weight:900; letter-spacing:-0.02em; }
.int-tag    { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:700; }

/* ── Rubric ──────────────────────────────────────────────────────────────── */
.r-letter { font-family:var(--font-display),sans-serif;    font-size:clamp(2.25rem,5.5vw,4.25rem); font-weight:900; letter-spacing:-0.04em; line-height:1; }
.r-title  { font-family:var(--font-display),sans-serif;    font-size:18px; font-weight:800; letter-spacing:-0.015em; }
.r-body   { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.7; }
.r-example{ font-family:var(--font-body),sans-serif; font-size:12px; font-style:italic; line-height:1.55; }
.rubric-intro-table td { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.65; }
.rubric-intro-table td:nth-child(2) { font-family:var(--font-display),sans-serif; font-size:15px; font-weight:800; letter-spacing:-0.015em; }

/* ── Programme Outcomes ──────────────────────────────────────────────────── */
.po-table   { font-size:13.5px; }
.po-table thead th { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.09em; }
.po-badge   { font-family:var(--font-body),sans-serif; font-size:10px; font-weight:800; letter-spacing:.04em; }
.bloom-chip { font-family:var(--font-body),sans-serif; font-size:10px; font-weight:800; letter-spacing:.04em; }
.copo-table { font-size:12px; }
.copo-table thead th { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.07em; }

/* ── Assessment tabs ─────────────────────────────────────────────────────── */
.assess-tab { font-family:var(--font-display),sans-serif;    font-size:13px; font-weight:700; letter-spacing:.04em; }
.at-h2  { font-family:var(--font-display),sans-serif;    font-size:34px; font-weight:900; letter-spacing:-0.03em; line-height:1.06; }
.at-h3  { font-family:var(--font-display),sans-serif;    font-size:22px; font-weight:800; letter-spacing:-0.02em; }
.at-h4  { font-family:var(--font-display),sans-serif;    font-size:16px; font-weight:800; letter-spacing:-0.015em; }
.at-lead{ font-family:var(--font-body),sans-serif; font-size:16.5px; font-weight:400; line-height:1.78; letter-spacing:-0.005em; }
.at-p   { font-family:var(--font-body),sans-serif; font-size:14px;   font-weight:400; line-height:1.78; }
.at-callout h5 { font-family:var(--font-display),sans-serif;    font-size:14.5px; font-weight:800; letter-spacing:-0.01em; }
.at-callout p  { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.7; }
.at-table      { font-size:13.5px; }
.at-table thead th { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.09em; }
.bl-num  { font-family:var(--font-display),sans-serif;    font-size:30px; font-weight:900; letter-spacing:-0.04em; }
.bl-name { font-family:var(--font-body),sans-serif; font-size:11.5px; font-weight:800; letter-spacing:.06em; }
.bl-desc { font-family:var(--font-body),sans-serif; font-size:11.5px; line-height:1.55; }
.bl-verbs{ font-family:var(--font-body),sans-serif; font-size:10.5px; font-style:italic; }
.rf-letter    { font-family:var(--font-display),sans-serif;    font-size:clamp(1.75rem,4.5vw,3.25rem); font-weight:900; letter-spacing:-0.04em; }
.rf-head-text h4 { font-family:var(--font-display),sans-serif; font-size:15px; font-weight:800; letter-spacing:-0.01em; }
.rf-head-text p  { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:700; letter-spacing:.08em; }
.rf-body p  { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.7; }
.rf-body ul li { font-family:var(--font-body),sans-serif; font-size:12.5px; line-height:1.6; }
.sc-grade{ font-family:var(--font-display),sans-serif;    font-size:46px; font-weight:900; letter-spacing:-0.04em; }
.sc-range{ font-family:var(--font-display),sans-serif;    font-size:18px; font-weight:800; letter-spacing:-0.02em; }
.sc-name { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.1em; }
.sc-desc { font-family:var(--font-body),sans-serif; font-size:12.5px; line-height:1.55; }
.sc-gp   { font-family:var(--font-display),sans-serif;    font-size:21px; font-weight:900; letter-spacing:-0.02em; }
.formula      { font-family:var(--font-display),sans-serif;    font-size:16px; font-weight:700; letter-spacing:-0.01em; }
.formula-box h4 { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:800; letter-spacing:.12em; }
.formula-note { font-family:var(--font-body),sans-serif; font-size:12.5px; }
.attain-num   { font-family:var(--font-display),sans-serif; font-size:44px; font-weight:900; letter-spacing:-0.04em; }
.attain-label { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.1em; }
.attain-desc  { font-family:var(--font-body),sans-serif; font-size:12.5px; line-height:1.55; }
.rub-matrix td:first-child { font-family:var(--font-body),sans-serif; font-size:11.5px; font-weight:800; }
.co-table thead th { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.07em; }
.co-table td:first-child { font-family:var(--font-body),sans-serif; font-size:11.5px; font-weight:700; }

/* ── Lab section ─────────────────────────────────────────────────────────── */
.lab-title { font-family:var(--font-display),sans-serif;    font-size:37px; font-weight:900; line-height:1.06; letter-spacing:-0.03em; }
.lab-lead  { font-family:var(--font-body),sans-serif; font-size:16px; font-weight:400; line-height:1.72; }
.ls-num    { font-family:var(--font-display),sans-serif;    font-size:32px; font-weight:900; letter-spacing:-0.03em; }
.ls-lbl    { font-family:var(--font-body),sans-serif; font-size:11.5px; font-weight:600; }
.lab-card h4 { font-family:var(--font-display),sans-serif;    font-size:15.5px; font-weight:800; letter-spacing:-0.015em; }
.lab-card p  { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.65; }
.lab-tag     { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.08em; }

/* ── Startup / roles ─────────────────────────────────────────────────────── */
.sc h4        { font-family:var(--font-display),sans-serif;    font-size:15.5px; font-weight:800; letter-spacing:-0.015em; }
.sc p         { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.68; }
.sr-card h3   { font-family:var(--font-display),sans-serif;    font-size:25px;   font-weight:900; letter-spacing:-0.025em; line-height:1.15; }
.role-chip h5 { font-family:var(--font-body),sans-serif; font-size:13px;   font-weight:800; letter-spacing:-0.01em; }
.role-chip p  { font-family:var(--font-body),sans-serif; font-size:11px;   font-weight:500; }
.role-chip .salary { font-family:var(--font-display),sans-serif; font-size:15.5px; font-weight:900; letter-spacing:-0.02em; }

/* ── Career journey steps ────────────────────────────────────────────────── */
.js-step h4 { font-family:var(--font-display),sans-serif;    font-size:15.5px; font-weight:800; letter-spacing:-0.015em; }
.js-step p  { font-family:var(--font-body),sans-serif; font-size:12.5px; line-height:1.6; }

/* ── Placement ───────────────────────────────────────────────────────────── */
.pf h4           { font-family:var(--font-display),sans-serif;    font-size:15px; font-weight:800; letter-spacing:-0.01em; }
.pf p            { font-family:var(--font-body),sans-serif; font-size:13.5px; line-height:1.68; }
.p-cta-card h3   { font-family:var(--font-display),sans-serif;    font-size:27px; font-weight:900; letter-spacing:-0.03em; }
.guarantee-row .num { font-family:var(--font-display),sans-serif; font-size:30px; font-weight:900; letter-spacing:-0.03em; }
.guarantee-row .txt { font-family:var(--font-body),sans-serif; font-size:13.5px; font-weight:500; line-height:1.6; }
.internship-band h4 { font-family:var(--font-display),sans-serif; font-size:15.5px; font-weight:800; letter-spacing:-0.01em; }
.internship-band p  { font-family:var(--font-body),sans-serif; font-size:13px; }

/* ── Certificates ────────────────────────────────────────────────────────── */
.cs-num   { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.12em; }
.cs-title { font-family:var(--font-display),sans-serif;    font-size:16px; font-weight:900; line-height:1.2; letter-spacing:-0.015em; }
.cs-sub   { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:500; }
.cs-badge { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:700; letter-spacing:.06em; }
.fc-eyebrow{ font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.16em; }
.fc-title  { font-family:var(--font-display),sans-serif;    font-size:clamp(26px,3vw,42px); font-weight:900; letter-spacing:-0.03em; }
.fc-sub    { font-family:var(--font-serif),serif;     font-size:21px; font-weight:400; font-style:italic; letter-spacing:-0.01em; }
.fc-tag    { font-family:var(--font-body),sans-serif; font-size:12px; font-weight:700; }

/* ── Quote strip ─────────────────────────────────────────────────────────── */
.quote-strip blockquote {
  font-family: var(--font-serif);
  font-size: clamp(22px, 3.2vw, 40px);
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.015em;
  line-height: 1.42;
}
.quote-strip cite {
  font-family: var(--font-body);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: .06em;
}

/* ── CTA cards ───────────────────────────────────────────────────────────── */
.cta-card h3       { font-family:var(--font-display),sans-serif;    font-size:27px; font-weight:900; letter-spacing:-0.025em; }
.cta-card .eyebrow { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:800; letter-spacing:.14em; }
.cta-card p        { font-family:var(--font-body),sans-serif; font-size:14px; font-weight:400; line-height:1.72; }
.cta-card .points li { font-family:var(--font-body),sans-serif; font-size:13.5px; font-weight:500; line-height:1.7; }
.btn-gold, .btn-white, .btn-primary, .btn-secondary {
  font-family: var(--font-body);
  font-weight: 800;
  letter-spacing: 0.03em;
  font-size: 14px;
}

/* footer styles now in main footer block above */

/* ── Sph-badges, section badges ─────────────────────────────────────────── */
.sph-badge { font-family:var(--font-body),sans-serif; font-size:11px; font-weight:700; letter-spacing:.04em; }
.mcard-tag { font-family:var(--font-body),sans-serif; font-size:10.5px; font-weight:800; letter-spacing:.1em; }

/* ── RESPONSIVE ────────────────────────────────────────────────────────── */
@media(max-width:1024px){
  .hero-grid,.fintech-grid,.startup-layout,.placement-grid,.cta-grid{grid-template-columns:1fr;}
  .hero-right{display:none;}
  .market-grid{grid-template-columns:repeat(2,1fr);}
  .market-cards,.rubric-grid,.cert-path{grid-template-columns:1fr;}
  .parts-grid,.labor-grid{grid-template-columns:1fr;}
  .lab-grid{grid-template-columns:repeat(2,1fr);}
  .journey-steps{grid-template-columns:repeat(2,1fr);}
  .journey-steps::before{display:none;}
  section{padding:72px 24px;}
  nav{padding:14px 24px;}
  .lab-hero-banner{grid-template-columns:1fr;}
  .lab-stat-stack{flex-direction:row;}
}


/* ── SYLLABUS STYLES ─────────────────────────────────────── */
.syllabus-section{background:var(--white);padding:clamp(2.5rem,8vw,6.25rem) clamp(1rem,4vw,3rem);}
.syl-tabs{display:flex;gap:0;border-radius:12px;overflow:hidden;
  border:1px solid var(--border);margin:48px 0 0;flex-wrap:wrap;}
.syl-tab{
  flex:1;min-width:180px;padding:18px 24px;cursor:pointer;
  border:none;background:var(--off);font-family:var(--font-display),sans-serif;
  font-size:13px;font-weight:700;color:var(--muted);
  letter-spacing:.04em;transition:all .25s;text-align:center;
  border-right:1px solid var(--border);
}
.syl-tab:last-child{border-right:none;}
.syl-tab.active,.syl-tab:hover{background:var(--purple);color:var(--white);}
.syl-tab .tab-part{font-size:10px;opacity:.7;display:block;margin-bottom:2px;}

.syl-panel{display:none;animation:fadeIn .35s ease;}
.syl-panel.active{display:block;}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

.syl-part-header{
  background:linear-gradient(135deg,var(--navy),#1A1048);
  border-radius:16px;padding:36px 40px;margin:32px 0 28px;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;
}
.sph-left h3{font-family:var(--font-display),sans-serif;font-size:24px;font-weight:800;color:var(--white);margin-bottom:6px;}
.sph-left p{font-size:14px;color:rgba(255,255,255,.55);}
.sph-badges{display:flex;gap:10px;flex-wrap:wrap;}
.sph-badge{
  font-size:11px;font-weight:700;padding:6px 14px;border-radius:100px;
  background:rgba(255,255,255,.1);color:rgba(255,255,255,.8);
  border:1px solid rgba(255,255,255,.15);white-space:nowrap;
}

.module-block{margin-bottom:40px;}
.module-heading{
  display:flex;align-items:center;gap:16px;
  padding:18px 24px;border-radius:12px 12px 0 0;
  cursor:pointer;user-select:none;
}
.mh-num{
  font-family:var(--font-display),sans-serif;font-size:13px;font-weight:800;
  width:80px;padding:6px 10px;border-radius:6px;text-align:center;
  flex-shrink:0;
}
.mh-title{font-family:var(--font-display),sans-serif;font-size:17px;font-weight:700;flex:1;}
.mh-meta{font-size:12px;opacity:.7;white-space:nowrap;}
.mh-arrow{font-size:14px;transition:transform .25s;flex-shrink:0;}
.module-block.open .mh-arrow{transform:rotate(180deg);}

.module-table-wrap{display:none;border:1px solid var(--border);border-top:none;border-radius:0 0 12px 12px;overflow:hidden;}
.module-block.open .module-table-wrap{display:block;}

.syl-table{width:100%;border-collapse:collapse;font-size:13px;}
.syl-table thead th{
  padding:12px 16px;text-align:left;font-size:11px;font-weight:700;
  letter-spacing:.07em;text-transform:uppercase;border-bottom:2px solid rgba(255,255,255,.15);
  white-space:nowrap;
}
.syl-table tbody tr{border-bottom:1px solid var(--border);transition:background .15s;}
.syl-table tbody tr:last-child{border-bottom:none;}
.syl-table tbody tr:hover{background:rgba(91,75,138,.04);}
.syl-table td{padding:14px 16px;vertical-align:top;line-height:1.55;color:var(--text);}
.syl-table td:first-child{
  font-family:var(--font-display),sans-serif;font-weight:800;font-size:12px;
  white-space:nowrap;color:var(--purple);
}
.syl-table td:nth-child(2){font-weight:600;color:var(--navy);}
.syl-table td:last-child{font-size:12px;color:var(--muted);}

.tag-pill{
  display:inline-block;font-size:10px;font-weight:700;
  padding:3px 8px;border-radius:4px;margin:2px 2px 0 0;
  background:var(--light);color:var(--purple);white-space:nowrap;
}
.tag-pill.lab{background:#E8F5EE;color:var(--green);}
.tag-pill.flagship{background:#FFF8E1;color:#8B6914;}

.hrs-cell{
  display:inline-flex;align-items:center;gap:4px;
  font-size:11px;font-weight:600;color:var(--muted);
  background:var(--off);padding:3px 8px;border-radius:4px;white-space:nowrap;
}

.capstone-box{
  background:linear-gradient(135deg,#E8F5EE,#D4EEE0);
  border:1.5px solid #A8D5BC;border-radius:12px;padding:28px 32px;margin:24px 0;
}
.capstone-box .cap-label{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--green);margin-bottom:8px;}
.capstone-box h4{font-family:var(--font-display),sans-serif;font-size:18px;font-weight:800;color:var(--navy);margin-bottom:8px;}
.capstone-box p{font-size:13px;color:var(--muted);line-height:1.65;}
.capstone-box .cap-meta{margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;}
.capstone-box .cap-tag{font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;background:rgba(26,106,58,.1);color:var(--green);}

/* ── CAREERS DETAILED ────────────────────────────────────── */
.careers-detail{background:var(--off);padding:100px 48px;}
.careers-tabs{display:flex;gap:10px;margin:40px 0;flex-wrap:wrap;}
.career-tab{
  padding:10px 20px;border-radius:var(--radius-md);cursor:pointer;
  border:2px solid var(--border);background:var(--white);
  font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--text);transition:all .25s;
}
.career-tab.active,.career-tab:hover{background:var(--purple);color:var(--white);border-color:var(--purple);}
.career-panel{display:none;}
.career-panel.active{display:block;animation:fadeIn .3s ease;}

.role-cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px;}
.role-card{
  background:var(--white);border-radius:16px;
  border:1px solid var(--border);padding:28px;
  transition:all .3s;
}
.role-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(91,75,138,.1);border-color:var(--purple);}
.rc-domain{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
.rc-role{font-family:var(--font-display),sans-serif;font-size:16px;font-weight:800;color:var(--text);margin-bottom:4px;}
.rc-company{font-size:12px;color:var(--muted);margin-bottom:16px;}
.rc-salary{
  font-family:var(--font-display),sans-serif;font-size:22px;font-weight:800;
  background:linear-gradient(135deg,var(--purple),var(--blue));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.rc-salary-lbl{font-size:11px;color:var(--muted);margin-bottom:12px;}
.rc-skills{list-style:none;margin-top:12px;border-top:1px solid var(--border);padding-top:12px;}
.rc-skills li{font-size:12px;color:var(--muted);padding:3px 0;padding-left:14px;position:relative;}
.rc-skills li::before{content:'·';position:absolute;left:4px;color:var(--purple);font-weight:700;}
.rc-growth{
  margin-top:12px;padding:8px 12px;border-radius:8px;
  background:var(--light);font-size:12px;font-weight:600;color:var(--purple);
}

/* Internship section */
.internship-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
.int-card{
  background:var(--white);border-radius:16px;border:1px solid var(--border);
  overflow:hidden;transition:all .3s;
}
.int-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(91,75,138,.1);}
.int-header{padding:20px 24px 16px;}
.int-body{padding:0 24px 24px;}
.int-phase{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
.int-role{font-family:var(--font-display),sans-serif;font-size:16px;font-weight:800;color:var(--text);margin-bottom:4px;}
.int-type{font-size:12px;color:var(--muted);margin-bottom:12px;}
.int-detail{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:12px;}
.int-tags{display:flex;flex-wrap:wrap;gap:6px;}
.int-tag{font-size:11px;font-weight:600;padding:4px 10px;border-radius:100px;background:var(--light);color:var(--purple);}
.int-salary{
  font-family:var(--font-display),sans-serif;font-size:18px;font-weight:800;color:var(--green);
  padding:12px 24px;border-top:1px solid var(--border);background:#F0FBF5;
}

@media(max-width:1024px){
  .syllabus-section,.careers-detail{padding:72px 24px;}
  .syl-tabs{display:grid;grid-template-columns:1fr 1fr;}
  .role-cards-grid,.internship-grid{grid-template-columns:1fr;}
}
@media(max-width:640px){
  .role-cards-grid,.internship-grid{grid-template-columns:1fr;}
  .syl-tabs{grid-template-columns:1fr;}
}


/* ── UGC RUBRIC enhanced styles ────────────────────────────────────────── */
.rubric-intro-table{width:100%;border-collapse:collapse;margin:40px 0;border-radius:16px;overflow:hidden;}
.rubric-intro-table thead th{
  padding:14px 18px;text-align:left;font-size:12px;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.08);
  color:rgba(255,255,255,.6);border-bottom:1px solid rgba(255,255,255,.1);}
.rubric-intro-table tbody tr{border-bottom:1px solid rgba(255,255,255,.06);transition:background .2s;}
.rubric-intro-table tbody tr:last-child{border-bottom:none;}
.rubric-intro-table tbody tr:hover{background:rgba(255,255,255,.04);}
.rubric-intro-table td{padding:16px 18px;vertical-align:top;font-size:13px;color:rgba(255,255,255,.65);line-height:1.6;}
.rubric-intro-table td:first-child{font-family:var(--font-display),sans-serif;font-size:26px;font-weight:900;background:linear-gradient(135deg,var(--gold),var(--gold-l));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;width:44px;text-align:center;}
.rubric-intro-table td:nth-child(2){font-family:var(--font-display),sans-serif;font-size:15px;font-weight:800;color:var(--white);width:220px;}
.rubric-intro-table td:nth-child(3){color:rgba(255,255,255,.7);}
.rubric-intro-table td:last-child{font-size:12px;color:rgba(255,255,255,.4);font-style:italic;}

/* PO section */
.po-section{background:var(--white);padding:80px 48px;}
.po-table-wrap{overflow-x:auto;margin-top:40px;}
.po-table{width:100%;border-collapse:collapse;font-size:13px;}
.po-table thead th{
  padding:13px 14px;text-align:left;font-size:11px;font-weight:700;
  letter-spacing:.07em;text-transform:uppercase;
  border-bottom:2px solid var(--border);white-space:nowrap;}
.po-table tbody tr{border-bottom:1px solid var(--border);transition:background .15s;}
.po-table tbody tr:hover{background:rgba(91,75,138,.04);}
.po-table td{padding:13px 14px;vertical-align:top;line-height:1.55;color:var(--text);}
.po-table td:first-child{font-family:var(--font-display),sans-serif;font-weight:800;font-size:12px;color:var(--purple);white-space:nowrap;width:68px;}
.po-table td:nth-child(2){font-weight:600;color:var(--navy);}
.po-table td:nth-child(3){font-size:12px;color:var(--muted);}
.po-badge{display:inline-block;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;margin:2px;white-space:nowrap;}
.po-b1{background:#EBF4FF;color:var(--blue);}
.po-b2{background:var(--light);color:var(--purple);}
.po-b3{background:#FFF8E1;color:#8B6914;}
.po-b4{background:#E8F5EE;color:var(--green);}
.po-b5{background:#FDE8DC;color:var(--orange);}
.po-b6{background:#FAE0E0;color:#8B0000;}
.po-b7{background:#EDE9F7;color:var(--purple-d,#3D3060);}
.po-b8{background:#E0F2F1;color:var(--teal);}
.bloom-chip{display:inline-block;font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;background:var(--navy);color:var(--white);}

/* CO-PO mapping table */
.copo-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:32px;}
.copo-table th,.copo-table td{padding:10px 12px;border:1px solid var(--border);text-align:center;}
.copo-table thead th{background:var(--navy);color:var(--white);font-size:11px;font-weight:700;letter-spacing:.06em;}
.copo-table thead th:first-child{text-align:left;width:140px;}
.copo-table tbody td:first-child{text-align:left;font-weight:700;color:var(--navy);font-size:11px;}
.copo-h{background:rgba(201,168,76,.15);font-weight:700;color:var(--orange);}
.copo-m{background:rgba(91,75,138,.1);font-weight:600;color:var(--purple);}
.copo-l{background:var(--light);color:var(--muted);}
.copo-n{color:var(--midGray,#ccc);}
.copo-avg{background:var(--navy);color:var(--white);font-weight:700;}
@media(max-width:1024px){.po-section{padding:60px 24px;}}


/* ── Assessment Tab System ─────────────────────────────────────────────── */
.assess-page{background:var(--white);padding:100px 48px 80px;}
.assess-tabs-wrap{
  position:sticky;top:70px;z-index:50;
  background:var(--white);border-bottom:2px solid var(--border);
  margin-bottom:0;padding:0;
}
.assess-tabs{
  display:flex;gap:0;max-width:1280px;margin:0 auto;
  overflow-x:auto;-webkit-overflow-scrolling:touch;
}
.assess-tab{
  flex-shrink:0;padding:16px 26px;cursor:pointer;
  border:none;background:transparent;
  font-family:var(--font-display),sans-serif;font-size:13px;font-weight:700;
  color:var(--muted);letter-spacing:.04em;
  border-bottom:3px solid transparent;
  transition:all .2s;white-space:nowrap;
}
.assess-tab.active,.assess-tab:hover{color:var(--purple);border-bottom-color:var(--purple);}
.assess-tab.active{color:var(--purple);background:rgba(91,75,138,.04);}

.assess-panel{display:none;max-width:1280px;margin:0 auto;padding:56px 0;}
.assess-panel.active{display:block;animation:fadeIn .3s ease;}

/* ── shared inside-tab styles ─────────────────────────────────────────── */
.at-h2{font-family:var(--font-display),sans-serif;font-size:32px;font-weight:800;color:var(--navy);margin-bottom:12px;line-height:1.1;}
.at-h3{font-family:var(--font-display),sans-serif;font-size:22px;font-weight:700;color:var(--purple);margin:44px 0 14px;}
.at-h4{font-family:var(--font-display),sans-serif;font-size:16px;font-weight:700;color:var(--navy);margin:24px 0 8px;}
.at-lead{font-size:16px;color:var(--muted);line-height:1.75;max-width:780px;margin-bottom:40px;}
.at-p{font-size:14px;color:var(--dark);line-height:1.75;margin-bottom:14px;}

/* callout boxes */
.at-callout{
  border-radius:12px;padding:24px 28px;margin:24px 0;
  display:flex;gap:16px;align-items:flex-start;
}
.at-callout .icon{font-size:24px;flex-shrink:0;margin-top:2px;}
.at-callout h5{font-family:var(--font-display),sans-serif;font-size:14px;font-weight:700;margin-bottom:6px;}
.at-callout p{font-size:13px;line-height:1.65;margin:0;}

/* general at-table */
.at-table{width:100%;border-collapse:collapse;font-size:13px;margin:20px 0;}
.at-table thead th{
  padding:12px 16px;text-align:left;font-size:11px;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;
  border-bottom:2px solid var(--border);}
.at-table tbody tr{border-bottom:1px solid var(--border);}
.at-table tbody tr:last-child{border-bottom:none;}
.at-table tbody tr:hover{background:rgba(91,75,138,.03);}
.at-table td{padding:13px 16px;vertical-align:top;line-height:1.55;color:var(--text);}
.at-table td:first-child{font-weight:700;color:var(--navy);}

/* bloom levels */
.bloom-levels{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin:24px 0;}
.bl{border-radius:12px;padding:20px 14px;text-align:center;}
.bl-num{font-family:var(--font-display),sans-serif;font-size:28px;font-weight:900;margin-bottom:4px;}
.bl-name{font-size:12px;font-weight:700;letter-spacing:.05em;margin-bottom:8px;}
.bl-desc{font-size:11px;line-height:1.5;}
.bl-verbs{font-size:10px;font-style:italic;margin-top:8px;opacity:.75;}

/* RUBRIC full card */
.rubric-full-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin:32px 0;}
.rf-card{
  border-radius:16px;overflow:hidden;
  border:1px solid var(--border);transition:all .3s;
}
.rf-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(91,75,138,.1);}
.rf-header{padding:24px 24px 16px;display:flex;align-items:center;gap:16px;}
.rf-letter{
  font-family:var(--font-display),sans-serif;font-size:48px;font-weight:900;line-height:1;
  background:linear-gradient(135deg,var(--gold),var(--gold-l,#E2C070));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  flex-shrink:0;
}
.rf-head-text h4{font-family:var(--font-display),sans-serif;font-size:15px;font-weight:800;color:var(--navy);margin-bottom:4px;}
.rf-head-text p{font-size:11px;color:var(--muted);font-weight:600;letter-spacing:.06em;text-transform:uppercase;}
.rf-body{padding:0 24px 24px;}
.rf-body p{font-size:13px;color:var(--dark);line-height:1.65;margin-bottom:12px;}
.rf-body ul{list-style:none;padding:0;}
.rf-body ul li{font-size:12px;color:var(--muted);padding:5px 0;padding-left:16px;position:relative;border-bottom:1px solid var(--border);}
.rf-body ul li:last-child{border-bottom:none;}
.rf-body ul li::before{content:'→';position:absolute;left:0;color:var(--gold);font-size:10px;font-weight:700;}
.rf-ref{padding:12px 24px;font-size:11px;color:rgba(255,255,255,.7);font-style:italic;}

/* score cards */
.score-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:24px 0;}
.sc-card{
  border-radius:14px;padding:24px;text-align:center;
  border:1px solid var(--border);transition:all .3s;
}
.sc-card:hover{transform:translateY(-3px);}
.sc-grade{font-family:var(--font-display),sans-serif;font-size:44px;font-weight:900;line-height:1;}
.sc-range{font-size:18px;font-weight:700;margin:4px 0;}
.sc-name{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;}
.sc-desc{font-size:12px;color:var(--muted);line-height:1.5;}
.sc-gp{font-size:20px;font-weight:800;margin-top:8px;}

/* CO table */
.co-table{width:100%;border-collapse:collapse;font-size:12px;}
.co-table thead th{
  padding:10px 12px;background:var(--navy);color:var(--white);
  font-size:10px;font-weight:700;letter-spacing:.06em;text-align:center;}
.co-table thead th:first-child{text-align:left;width:200px;}
.co-table tbody tr{border-bottom:1px solid var(--border);}
.co-table td{padding:10px 12px;text-align:center;vertical-align:middle;}
.co-table td:first-child{text-align:left;font-weight:600;font-size:11px;color:var(--navy);}
.co-H{background:rgba(201,168,76,.2);font-weight:700;color:#8B6914;}
.co-M{background:rgba(91,75,138,.1);font-weight:600;color:var(--purple);}
.co-L{background:var(--light);color:var(--muted);}
.co-N{color:#ddd;}
.co-avg{background:var(--navy);color:var(--gold);font-weight:800;}
.co-pass{background:#E8F5EE;color:var(--green);font-weight:700;}
.co-warn{background:#FFF8E1;color:var(--orange);font-weight:700;}

/* attainment meter */
.attain-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin:32px 0;}
.attain-card{
  border-radius:14px;padding:28px 20px;text-align:center;
  border:1px solid var(--border);
}
.attain-num{font-family:var(--font-display),sans-serif;font-size:42px;font-weight:900;}
.attain-label{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin:6px 0;}
.attain-desc{font-size:12px;color:var(--muted);line-height:1.5;}
.progress-bar{height:8px;border-radius:100px;background:var(--border);margin:12px 0;overflow:hidden;}
.progress-fill{height:100%;border-radius:100px;}

/* rubric assessment matrix */
.rub-matrix{width:100%;border-collapse:collapse;font-size:12px;margin:24px 0;}
.rub-matrix th{
  padding:10px 12px;font-size:11px;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;border:1px solid var(--border);}
.rub-matrix td{padding:12px;font-size:12px;line-height:1.55;border:1px solid var(--border);vertical-align:top;}
.rub-matrix td:first-child{font-weight:700;color:var(--navy);font-size:11px;width:140px;}
.rub-ex{background:#E8F5EE;color:#1A5C3A;}
.rub-gd{background:#EBF4FF;color:#1A3A6B;}
.rub-sa{background:#FFF8E1;color:#7A5800;}
.rub-ni{background:#FAE0E0;color:#7A1A1A;}

/* formula box */
.formula-box{
  background:var(--navy);border-radius:14px;padding:28px 32px;margin:24px 0;
  font-family:var(--font-display),sans-serif;
}
.formula-box h4{font-size:14px;font-weight:700;color:var(--gold);margin-bottom:16px;letter-spacing:.06em;text-transform:uppercase;}
.formula{font-size:16px;color:var(--white);margin:10px 0;padding:12px 16px;background:rgba(255,255,255,.06);border-radius:8px;}
.formula span{color:var(--gold-l,#E2C070);}
.formula-note{font-size:12px;color:rgba(255,255,255,.5);margin-top:8px;font-family:var(--font-body),sans-serif;}

@media(max-width:1024px){
  .bloom-levels{grid-template-columns:repeat(3,1fr);}
  .rubric-full-grid{grid-template-columns:1fr;}
  .score-grid{grid-template-columns:repeat(2,1fr);}
  .attain-grid{grid-template-columns:repeat(2,1fr);}
  .assess-page{padding:80px 24px 60px;}
}
@media(max-width:640px){
  .bloom-levels{grid-template-columns:repeat(2,1fr);}
  .score-grid{grid-template-columns:1fr 1fr;}
}

`;

export default function TwoYearsSemester() {

  /* ── State ──────────────────────────────────────────────────────────────── */
  const [activeSylPart,   setActiveSylPart]   = useState(0);
  const [openModules,     setOpenModules]      = useState({ m1: true });
  const [activeCareer,    setActiveCareer]     = useState("banking");
  const [activeAssessTab, setActiveAssessTab]  = useState("rubric-tab");

  /* ── Nav state ──────────────────────────────────────────────────────────── */
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [navScrolled,   setNavScrolled]   = useState(false);

  /* ── Inject Google Fonts + Global CSS ───────────────────────────────────── */
  useLayoutEffect(() => {
  if (!document.getElementById("pgdfdb-fonts")) {
    const pc1 = document.createElement("link");
    pc1.rel = "preconnect"; pc1.href = "https://fonts.googleapis.com";
    document.head.appendChild(pc1);
    const pc2 = document.createElement("link");
    pc2.rel = "preconnect"; pc2.href = "https://fonts.gstatic.com"; pc2.crossOrigin = "anonymous";
    document.head.appendChild(pc2);
    const link  = document.createElement("link");
    link.id     = "pgdfdb-fonts";
    link.rel    = "stylesheet";
    link.href   = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&display=swap";
    document.head.appendChild(link);
  }
  const styleEl       = document.createElement("style");
  styleEl.id          = "pgdfdb-styles";
  styleEl.textContent = GLOBAL_CSS;
  document.head.appendChild(styleEl);
  return () => { styleEl.remove(); };
}, []);

  /* ── Fade-up IntersectionObserver ───────────────────────────────────────── */
  useEffect(() => {
    const fadeObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); fadeObs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const attach = () => document.querySelectorAll(".fade-up:not(.visible)").forEach(el => fadeObs.observe(el));
    attach();
    const t = setTimeout(attach, 120);
    return () => { clearTimeout(t); fadeObs.disconnect(); };
  }, [activeSylPart, activeCareer, activeAssessTab]);

  /* ── Animated counters ──────────────────────────────────────────────────── */
  useEffect(() => {
    const cntObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && e.target.dataset.count) {
          const el  = e.target;
          const tgt = parseFloat(el.dataset.count);
          const sfx = el.dataset.suffix || "";
          const dur = 2000, t0 = performance.now();
          const step = now => {
            const p = Math.min((now - t0) / dur, 1);
            const v = tgt * (1 - Math.pow(1 - p, 3));
            el.textContent = (Number.isInteger(tgt) ? Math.floor(v) : v.toFixed(1)) + sfx;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cntObs.unobserve(el);
        }
      }),
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-count]").forEach(el => cntObs.observe(el));
    return () => cntObs.disconnect();
  }, []);

  /* ── Nav: scroll + active-section tracking ──────────────────────────────── */
  useEffect(() => {
    const NAV_SECTIONS = [
      "overview","syllabus","rubric","lab","careers","placements","colleges","contact"
    ];
    const onScroll = () => {
      setNavScrolled(window.scrollY > 60);
      const mid = window.innerHeight * 0.38;
      let active = NAV_SECTIONS[0];
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close drawer on desktop resize ─────────────────────────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Lock body scroll when drawer open ──────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Interaction handlers ────────────────────────────────────────────────── */
  const showPart     = useCallback(idx => setActiveSylPart(idx), []);
  const toggleModule = useCallback(id  => setOpenModules(p => ({ ...p, [id]: !p[id] })), []);
  const showCareer   = useCallback(id  => setActiveCareer(id),   []);
  const showAssess   = useCallback(id  => {
    setActiveAssessTab(id);
    setTimeout(() => {
      const wrap = document.querySelector(".assess-tabs-wrap");
      if (wrap) wrap.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  }, []);

  /* ── className helpers ───────────────────────────────────────────────────── */
  const sylTabClass      = i   => `syl-tab${activeSylPart   === i   ? " active" : ""}`;
  const sylPanelClass    = i   => `syl-panel${activeSylPart  === i   ? " active" : ""}`;
  const moduleClass      = id  => `module-block${openModules[id]     ? " open"   : ""}`;
  const careerTabClass   = id  => `career-tab${activeCareer  === id  ? " active" : ""}`;
  const careerPanelClass = id  => `career-panel${activeCareer === id  ? " active" : ""}`;
  const assessTabClass   = id  => `assess-tab${activeAssessTab === id ? " active" : ""}`;
  const assessPanelClass = id  => `assess-panel${activeAssessTab === id ? " active" : ""}`;

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <>


{/* ── MOBILE DRAWER ── */}
<div
  className={`nav-drawer${menuOpen ? " open" : ""}`}
  aria-hidden={!menuOpen}
  style={{
    transform: menuOpen ? "translateX(0)" : "translateX(100%)",
    pointerEvents: menuOpen ? "all" : "none",
  }}
>
  {[
    ["#overview",   "Program"],
    ["#syllabus",   "Syllabus"],
    ["#rubric",     "Framework"],
    ["#lab",        "Innovation Lab"],
    ["#careers",    "Careers"],
    ["#placements", "Placements"],
    ["#colleges",   "For Colleges"],
  ].map(([href, label]) => (
    <a
      key={href}
      href={href}
      onClick={() => setMenuOpen(false)}
      className={activeSection === href.slice(1) ? "nav-active" : ""}
    >
      {label}
    </a>
  ))}
  <a href="#contact" className="drawer-cta" onClick={() => setMenuOpen(false)}>
    Enroll Now →
  </a>
</div>

{/* NAV */}
<nav className={navScrolled ? "scrolled" : ""}>
  <a href="#" className="nav-logo">Up<span>skillize</span></a>
  <div className="nav-links">
    {[
      ["#overview",   "Program"],
      ["#syllabus",   "Syllabus"],
      ["#rubric",     "Framework"],
      ["#lab",        "Innovation Lab"],
      ["#careers",    "Careers"],
      ["#placements", "Placements"],
      ["#colleges",   "For Colleges"],
    ].map(([href, label]) => (
      <a
        key={href}
        href={href}
        className={activeSection === href.slice(1) ? "nav-active" : ""}
      >
        {label}
      </a>
    ))}
    <a href="#contact" className="nav-cta">Enroll Now →</a>
  </div>
  {/* Hamburger — mobile only */}
  <button
    className={`nav-hamburger${menuOpen ? " open" : ""}`}
    onClick={() => setMenuOpen(o => !o)}
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    aria-expanded={menuOpen}
  >
    <span /><span /><span />
  </button>
</nav>

{/* HERO */}
<section className="hero" style={{paddingTop: "120px"}}>
  <div className="hero-grid container">
    <div className="hero-left">
      <div className="hero-badge">Flagship Program 2026</div>
      <h1>The Future of<br/><em>BFSI is Digital.</em><br/>Are You Ready?</h1>
      <p className="hero-sub">Post Graduate Diploma in Fintech & Digital Business — BFSI</p>
      <p className="hero-desc">India's only MBA-parallel program that transforms you into a Full-Stack Digital Business Leader in Banking, FinTech, WealthTech, InsurTech, and RegTech — while you are still completing your MBA.</p>
      <div className="hero-pills">
        <span className="pill">NSQF Level 7</span>
        <span className="pill">BFSI SSC Aligned</span>
        <span className="pill">2 Years</span>
        <span className="pill">6 Flagship Courses</span>
        <span className="pill">Top 1% Industry Trainers</span>
        <span className="pill">Employment-Linked</span>
      </div>
      <div className="hero-btns">
        <a href="#overview" className="btn-primary">Explore the Program →</a>
        <a href="#colleges" className="btn-secondary">For Colleges ↗</a>
      </div>
    </div>
    <div className="hero-right">
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="hero-card-main">
        <div className="hc-label">PGDFDB</div>
        <div className="hc-title">1200 Hours of Mastery</div>
        <div className="hc-sub">Across 16 modules, 4 capstones, and a dedicated Innovation Lab</div>
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-num">4</div>
            <div className="stat-lbl">Flagship Courses<br/>in One Program</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">50+</div>
            <div className="stat-lbl">Casestudy</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">3</div>
            <div className="stat-lbl">Interview<br/>Opportunity</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">24</div>
            <div className="stat-lbl">Month<br/>Mentor Access</div>
          </div>
        </div>
        <div className="course-tags">
          <div className="ctag"><span className="ctag-icon">🏦</span><span className="ctag-text">BFSI Domain Excellence</span></div>
          <div className="ctag"><span className="ctag-icon">📈</span><span className="ctag-text">InvestmentTech & WealthTech</span></div>
          <div className="ctag"><span className="ctag-icon">🔒</span><span className="ctag-text">RegTech & Compliance</span></div>
          <div className="ctag"><span className="ctag-icon">👑</span><span className="ctag-text">MiniCEO Program</span></div>
          <div className="ctag"><span className="ctag-icon">📊</span><span className="ctag-text">Data to Decisions</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* TICKER */}
<div className="ticker">
  <div className="ticker-inner">
    <span className="ticker-item">🏦 <span>Banking Technology</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">💳 <span>PaymentsTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">📈 <span>WealthTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🛡 <span>InsuranceTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🔒 <span>RegTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🤖 <span>AI in Finance</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">📊 <span>Data to Decisions</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">⚡ <span>FinTech Disruption</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🌐 <span>Open Banking</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">👑 <span>MiniCEO Program</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🚀 <span>Startup Ecosystem</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🏦 <span>Banking Technology</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">💳 <span>PaymentsTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">📈 <span>WealthTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🛡 <span>InsuranceTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🔒 <span>RegTech</span></span>
    <span className="ticker-sep">◆</span>
    <span className="ticker-item">🤖 <span>AI in Finance</span></span>
  </div>
</div>

{/* MARKET OPPORTUNITY */}
<section className="market" id="market">
  <div className="container">
    <p className="section-label fade-up">The Opportunity is Massive</p>
    <h2 className="section-title fade-up fade-up-d1 text-white">The <em style={{ color: "var(--gold)" }}>FinTech Revolution</em><br />is rewriting every career in BFSI.</h2>
    <p className="section-lead fade-up fade-up-d2">India is at the epicentre of the world's most dramatic financial services transformation. The numbers are staggering — and so is the demand for people who understand both finance and technology.</p>
    <div className="market-grid">
      <div className="mstat fade-up">
        <div className="mstat-num" data-count="7.2" data-suffix="M+">7.2M+</div>
        <div className="mstat-label">BFSI Professionals<br/>in India</div>
        <div className="mstat-sub">Largest white-collar employer</div>
      </div>
      <div className="mstat fade-up fade-up-d1">
        <div className="mstat-num" data-count="450" data-suffix="B+">$450B+</div>
        <div className="mstat-label">India FinTech Market<br/>by 2025</div>
        <div className="mstat-sub">3rd largest globally</div>
      </div>
      <div className="mstat fade-up fade-up-d2">
        <div className="mstat-num" data-count="30" data-suffix="%">30%</div>
        <div className="mstat-label">Annual Growth in<br/>Digital BFSI Roles</div>
        <div className="mstat-sub">Demand far outpaces supply</div>
      </div>
      <div className="mstat fade-up fade-up-d3">
        <div className="mstat-num" data-count="10" data-suffix="B+">10B+</div>
        <div className="mstat-label">UPI Transactions<br/>Per Month</div>
        <div className="mstat-sub">The world's largest RTP network</div>
      </div>
    </div>
    <div className="market-cards">
      <div className="mcard fade-up" data-icon="🚀">
        <div className="mcard-tag" style={{color: "var(--blue)"}}>FINTECH DISRUPTION</div>
        <h3>India's FinTech Ecosystem is Exploding</h3>
        <p>From Razorpay to PhonePe, from Zerodha to CRED — India now hosts 9,000+ FinTech companies and has produced 22 FinTech unicorns. Every one of them needs people who speak the language of both finance and technology.</p>
        <ul>
          <li>3 new FinTech startups launch every day in India</li>
          <li>$6B+ VC investment in Indian FinTech in 2024</li>
          <li>UPI processes more transactions than Visa globally</li>
        </ul>
      </div>
      <div className="mcard fade-up fade-up-d1" data-icon="🏦">
        <div className="mcard-tag" style={{color: "var(--gold)"}}>DIGITAL BANKING</div>
        <h3>Traditional Banks are Going Digital — Fast</h3>
        <p>HDFC, SBI, ICICI, and Axis are spending billions on digital transformation. The demand for professionals who understand core banking modernisation, open banking, and AI-powered services is at an all-time high.</p>
        <ul>
          <li>₹1.5 trillion BFSI IT spend in FY25</li>
          <li>80% of banking transactions now digital</li>
          <li>Every bank hiring for AI, data, and product roles</li>
        </ul>
      </div>
      <div className="mcard fade-up fade-up-d2" data-icon="📱">
        <div className="mcard-tag" style={{color: "var(--teal)"}}>PRODUCT MANAGEMENT</div>
        <h3>Product Thinking is the New Power Skill</h3>
        <p>The most sought-after professionals in BFSI today are those who understand both the user's need and the financial product's regulatory environment. Product Managers in BFSI earn 40–60% more than peers in other sectors.</p>
        <ul>
          <li>BFSI Product Managers earn ₹25–60 LPA at senior levels</li>
          <li>Cross-functional skill: works for all MBA specialisations</li>
          <li>In-demand at banks, FinTechs, and consulting firms</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* FINTECH REVOLUTION DETAIL */}
<section className="fintech" id="fintech">
  <div className="container">
    <p className="section-label fade-up">Why BFSI + Digital = The Winning Combination</p>
    <h2 className="section-title fade-up fade-up-d1">Digital Business is not a<br/><em>specialisation — it's survival.</em></h2>
    <div className="fintech-grid">
      <div className="fintech-visual fade-up">
        <div className="fv-title">The World's Most Exciting Industries are All <em>Part of BFSI Now</em></div>
        <ul className="fv-list">
          <li>
            <span className="icon">⚡</span>
            <div><strong>Payments Revolution</strong>India's UPI is the world's largest real-time payment system — and the technology layer that powers it is built and managed by professionals like you.</div>
          </li>
          <li>
            <span className="icon">🤖</span>
            <div><strong>AI & GenAI in Finance</strong>ChatGPT, Claude, and Gemini are being deployed inside banks for credit analysis, compliance, customer service, and risk monitoring. Someone has to build, deploy, and govern these systems.</div>
          </li>
          <li>
            <span className="icon">🌐</span>
            <div><strong>Decentralised Finance</strong>DeFi, blockchain, CBDCs, and tokenised assets are reshaping capital markets. India's e-Rupee is live. The regulatory framework is being written today.</div>
          </li>
          <li>
            <span className="icon">🛡</span>
            <div><strong>RegTech & Compliance Intelligence</strong>With DPDPA 2023, RBI's AI governance circular, and Basel IV, the demand for compliance technologists has never been higher.</div>
          </li>
          <li>
            <span className="icon">📊</span>
            <div><strong>Data-Driven Finance</strong>From real-time NPA dashboards to ESG scoring models, finance is increasingly powered by data. Power BI, Python, and SQL are now professional prerequisites — not optional extras.</div>
          </li>
        </ul>
      </div>
      <div className="fintech-points fade-up fade-up-d2">
        <div className="fp">
          <div className="fp-icon" style={{background: "#EBF4FF"}}>🏗</div>
          <div><h4>Startup Ecosystem Readiness</h4><p>PGDFDB prepares you to build in a startup, join a FinTech as a founding team member, or launch your own venture — with domain depth, product skills, and investor pitch capability.</p></div>
        </div>
        <div className="fp">
          <div className="fp-icon" style={{background: "var(--light)"}}>📦</div>
          <div><h4>Product Management for BFSI</h4><p>Learn the PPP model (People, Process, Product), write real PRDs, run Agile sprints, and understand the regulatory constraints that make BFSI product management uniquely complex — and uniquely valuable.</p></div>
        </div>
        <div className="fp">
          <div className="fp-icon" style={{background: "#E8F5EE"}}>🌍</div>
          <div><h4>Global Career Access</h4><p>BFSI is the most globally portable career. PGDFDB graduates are equipped for roles in DIFC Dubai, Canary Wharf London, Marina Bay Singapore, and Bay Street Toronto.</p></div>
        </div>
        <div className="fp">
          <div className="fp-icon" style={{background: "#FFF0F0"}}>⚖</div>
          <div><h4>The Regulatory Advantage</h4><p>Understanding RBI, SEBI, IRDAI, and PFRDA regulations is a rare skill. PGDFDB graduates are the professionals who bridge technology, business, and regulation — the most sought-after profile in modern BFSI hiring.</p></div>
        </div>
        <div className="fp">
          <div className="fp-icon" style={{background: "#FFF8E1"}}>💡</div>
          <div><h4>Innovation Lab — Build Real FinTech Products</h4><p>Unlike any other program, you don't just learn about FinTech — you build one. The BFSI Innovation Lab gives you the tools, mentorship, and space to prototype real digital products and pitch them to investors.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CAREER JOURNEY */}
<section className="career" id="careers">
  <div className="container">
    <p className="section-label text-center mx-auto fade-up">From Student to Industry Representative</p>
    <h2 className="section-title text-center mx-auto fade-up fade-up-d1">Your 24-Month<br/><em>Transformation Path</em></h2>
    <div className="journey-steps fade-up fade-up-d2">
      <div className="js-step">
        <div className="js-circle" style={{background: "linear-gradient(135deg,#EBF4FF,#D6E8F5)"}}>🎓</div>
        <div className="js-num" style={{fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "700", color: "var(--blue)", marginBottom: "8px"}}>MONTHS 1–5</div>
        <h4>BFSI Domain Scholar</h4>
        <p>Master the full BFSI ecosystem. Earn your first certificate. Build your first credit model and FinTech pitch.</p>
      </div>
      <div className="js-step">
        <div className="js-circle" style={{background: "linear-gradient(135deg,var(--light),#EDE9F7)"}}>⚙</div>
        <div className="js-num" style={{fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "700", color: "var(--purple)", marginBottom: "8px"}}>MONTHS 6–10</div>
        <h4>BFSI Technology Builder</h4>
        <p>Payments, WealthTech, Data & Agile mastery. Build live Power BI dashboards and robo-advisory apps. Eligible for BFSI internships.</p>
      </div>
      <div className="js-step">
        <div className="js-circle" style={{background: "linear-gradient(135deg,#FFF0F0,#FAE0E0)"}}>🎯</div>
        <div className="js-num" style={{fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "700", color: "#C0392B", marginBottom: "8px"}}>MONTHS 11–15</div>
        <h4>Interview-Ready Professional</h4>
        <p>RegTech, ESG, AI Product Mgmt. Full Placement Sprint. 2 mock interviews. Portfolio live. Campus interviews at Month 14.</p>
      </div>
      <div className="js-step">
        <div className="js-circle" style={{background: "linear-gradient(135deg,#FFF8E1,#FFF0C0)"}}>👑</div>
        <div className="js-num" style={{fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "700", color: "#8B6914", marginBottom: "8px"}}>MONTHS 16–19</div>
        <h4>Digital Business Leader</h4>
        <p>MiniCEO Program. Finance transformation. Global career mapping. MiniCEO Summit. PGDFDB — MBA++. BFSI Fellow.</p>
      </div>
    </div>
  </div>
</section>

{/* PROGRAM OVERVIEW */}
<section className="overview" id="overview">
  <div className="container">
    <p className="section-label fade-up">2 Years. 4 Parts. 4 Certificates.</p>
    <h2 className="section-title fade-up fade-up-d1">A Complete <em>Digital BFSI</em><br/>Learning Journey</h2>
    <p className="section-lead fade-up fade-up-d2">PGDFDB is structured in four progressive parts — each 4 months long, each ending with a capstone project presented to an industry panel, and each earning you a formal certificate milestone you can add to your resume immediately.</p>
    <div className="parts-grid">
      <div className="part-card part-1 fade-up">
        <div className="part-header">
          <div className="part-num">Semester 1 · Months 1–4</div>
          <div className="part-title">BFSI Foundations & FinTech World</div>
          <div className="part-timeline">3 months teaching + 1 month capstone</div>
        </div>
        <div className="part-body">
          <ul className="module-list">
            <li><span className="dot"></span>Module 1 · BFSI Domain Foundations — Banking, Insurance, Capital Markets, MF</li>
            <li><span className="dot"></span>Module 2 · Current Industry & Digital Transformation — AI, GenAI, Open Banking</li>
            <li><span className="dot"></span>Module 3 · FinTech World & InsurTech — Neo-banks, BNPL, IRDAI sandbox</li>
            <li><span className="dot"></span>Module 4 · Loan Origination & Credit Technology — LOS, digital underwriting, RBI guidelines</li>
          </ul>
        </div>
         <div className="part-footer">
          <span className="cert-badge">Certificate in FinTech Excellence</span>
          <span style={{fontSize: "12px", color: "var(--muted)"}}>📈 FinTech</span>
        </div>
      </div>
      <div className="part-card part-2 fade-up fade-up-d1">
        <div className="part-header">
          <div className="part-num">Semester 2 · Months 6–9</div>
          <div className="part-title">Intermediate Digital BFSI Technologies</div>
          <div className="part-timeline">3 months teaching + 1 month capstone · 1-month buffer after Semester 1</div>
        </div>
        <div className="part-body">
          <ul className="module-list">
            <li><span className="dot"></span>Module 5 · Payments Technology — UPI, Cards, CBDC, Cross-border, PG Tech</li>
            <li><span className="dot"></span>Module 6 · WealthTech & Investment Technology — Robo-advisory, Trading Tech, ESG</li>
            <li><span className="dot"></span>Module 7 · Supply Chain & Trade Finance — TReDS, OCEN, LC/BG, Agri-Finance</li>
            <li><span className="dot"></span>Module 8 · Data to Decisions + Agile + ITIL — Power BI, SQL, Six Sigma</li>
          </ul>
        </div>
        <div className="part-footer">
          <span className="cert-badge">Certificate in Digital BFSI Technologies</span>
          <span style={{fontSize: "12px", color: "var(--muted)"}}>📈 InvestmentTech + 📊 D2D</span>
        </div>
      </div>
      <div className="part-card part-3 fade-up">
        <div className="part-header">
          <div className="part-num">Semester 3 · Months 11–14 · ⭐ Campus Interview Month</div>
          <div className="part-title">Advanced BFSI & Placement Readiness</div>
          <div className="part-timeline">3 months teaching + 1 month Placement Sprint + Capstone</div>
        </div>
        <div className="part-body">
          <ul className="module-list">
            <li><span className="dot"></span>Module 9 · RegTech & Compliance — AML/KYC, Basel III, DPDPA, SupTech</li>
            <li><span className="dot"></span>Module 10 · DeFi, Blockchain & Crypto — Smart contracts, CBDC, NFTs in BFSI</li>
            <li><span className="dot"></span>Module 11 · ESG, Sustainability & Finance Transformation — BRSR, Ind AS, FP&A</li>
            <li><span className="dot"></span>Module 12 · AI Product Mgmt + Innovation Lab — PPP model, SDLC, MVP Build</li>
            <li><span className="dot"></span><strong>Placement Sprint</strong> · Personality Dev · 2 Mock Interviews · Portfolio · Campus Drives</li>
          </ul>
        </div>
        <div className="part-footer">
          <span className="cert-badge" style={{background: "rgba(192,57,43,.1)", color: "#C0392B"}}>Certificate in Advanced BFSI & Digital Innovation</span>
          <span style={{fontSize: "12px", color: "var(--muted)"}}>🔒 RegTech Flagship</span>
        </div>
      </div>
      <div className="part-card part-4 fade-up fade-up-d1">
        <div className="part-header">
          <div className="part-num">Semester 4 · Months 16–19</div>
          <div className="part-title">Digital Leadership — The MiniCEO Program</div>
          <div className="part-timeline">3 months teaching + MiniCEO Summit Capstone · 1-month buffer after Semester 3</div>
        </div>
        <div className="part-body">
          <ul className="module-list">
            <li><span className="dot"></span>Module 13 · The MiniCEO Program — CEO mindset, P&L, board communication, M&A, crisis management</li>
            <li><span className="dot"></span>Module 14 · Accounting & Finance Transformation — CFO 4.0, Ind AS, RPA, IFRS</li>
            <li><span className="dot"></span>Module 15 · RM, Cards & InsurTech — Relationship banking, claims tech, distribution</li>
            <li><span className="dot"></span>Module 16 · Global Pathways — UAE, UK, Singapore, Australia, Canada career mapping</li>
          </ul>
        </div>
        <div className="part-footer">
          <span className="cert-badge" style={{background: "rgba(201,168,76,.15)", color: "#8B6914"}}>MBA++ / PGDFDB  — NSQF Level 7</span>
          <span style={{fontSize: "12px", color: "var(--muted)"}}>👑 MiniCEO Flagship</span>
        </div>
      </div>
    </div>
  </div>
</section>


{/* DETAILED SYLLABUS */}

<section className="syllabus-section" id="syllabus">
<div className="container">
  <p className="section-label fade-up">What You'll Learn</p>
  <h2 className="section-title fade-up fade-up-d1">Lesson-by-Lesson.<br/><em>Outcome-by-Outcome.</em></h2>
  <p className="section-lead fade-up fade-up-d2">Every lesson carries a course number, a flagship course tag, an Innovation Lab activity, and an hours breakdown — so you know exactly what you are building, learning, and earning at every step of the 2-years journey.</p>

  <div className="syl-tabs fade-up fade-up-d1">
    <button className={sylTabClass(0)} onClick={() => showPart(0)}><span className="tab-part">Months 1–4</span>Semester 1 · BFSI Foundations</button>
    <button className={sylTabClass(1)} onClick={() => showPart(1)}><span className="tab-part">Months 6–9</span>Semester 2 · Intermediate</button>
    <button className={sylTabClass(2)} onClick={() => showPart(2)}><span className="tab-part">Months 11–14</span>Semester 3 · Advanced</button>
    <button className={sylTabClass(3)} onClick={() => showPart(3)}><span className="tab-part">Months 16–19</span>Semester 4 · MiniCEO</button>
  </div>

  
  <div className={sylPanelClass(0)} id="part-0">
    <div className="capstone-box">
      <div className="cap-label">Capstone 1 — Month 4</div>
      <h4>BFSI Domain Discovery Report</h4>
      <p>20-page professional document + 15-minute presentation to an industry panel. Students choose one BFSI sub-sector, analyse 3 digital disruptions, and map a personal 2-years career development plan. Innovation Lab: publish on LinkedIn + upload full portfolio to EcoPro LMS.</p>
      <div className="cap-meta">
        <span className="cap-tag">🏅 Earns: Certificate in BFSI Domain Excellence</span>
        <span className="cap-tag">~56 student hours</span>
        <span className="cap-tag">External jury panel</span>
      </div>
    </div>
  </div>

  
  <div className={sylPanelClass(1)} id="part-1">
    <div className="capstone-box">
      <div className="cap-label">Capstone 2 — Month 9</div>
      <h4>Digital BFSI Solution Blueprint</h4>
      <p>Choose a real BFSI problem and produce: as-is process map, proposed digital solution with tech stack, Power BI dashboard mockup, Agile delivery roadmap (epics → stories → sprints), and ROI calculation. Innovation Lab teams build a working prototype. Best 3 projects win the Upskillize Innovation Lab Award.</p>
      <div className="cap-meta">
        <span className="cap-tag">🏅 Earns: Certificate in Digital BFSI Technologies</span>
        <span className="cap-tag">~64 student hours</span>
        <span className="cap-tag">Prototype + presentation</span>
        <span className="cap-tag">Innovation Lab Award</span>
      </div>
    </div>
  </div>

  
  <div className={sylPanelClass(2)} id="part-2">
    <div className="capstone-box" style={{background: "linear-gradient(135deg,#FFF0F0,#FAE0E0)", borderColor: "#C0392B"}}>
      <div className="cap-label" style={{color: "#C0392B"}}>Capstone 3 + Placement Sprint — Month 14</div>
      <h4>Digital BFSI Startup Proposal + Campus Interviews</h4>
      <p>Month 14 is the most intensive month. Week 1: Personality Development (2 full-day workshops) + Resume rewrite. Week 2: Mock Interview Round 1 (30 min per student, feedback report). Week 3: Mock Interview Round 2 (new evaluator). Week 4: Capstone 3 presentations to industry jury + Campus placement drives activated.</p>
      <div className="cap-meta">
        <span className="cap-tag" style={{background: "rgba(192,57,43,.1)", color: "#C0392B"}}>🏅 Earns: Certificate in Advanced BFSI & Digital Innovation</span>
        <span className="cap-tag" style={{background: "rgba(192,57,43,.1)", color: "#C0392B"}}>~85 student hours</span>
        <span className="cap-tag" style={{background: "rgba(192,57,43,.1)", color: "#C0392B"}}>2 mock interviews per student</span>
        <span className="cap-tag" style={{background: "rgba(192,57,43,.1)", color: "#C0392B"}}>🎓 Campus interviews end of Month 14</span>
      </div>
    </div>
  </div>

  
  <div className={sylPanelClass(3)} id="part-3">
    <div className="capstone-box" style={{background: "linear-gradient(135deg,#FFF8E1,#FFF0C0)", borderColor: "var(--gold)"}}>
      <div className="cap-label" style={{color: "#8B6914"}}>Final Capstone — Month 19 · The MiniCEO Summit</div>
      <h4>Digital BFSI Leadership Thesis — Solo Graduation Showcase</h4>
      <p>Each student delivers a solo 20-minute "Digital BFSI Leadership Thesis" to an external panel of BFSI investors and CXOs: personal expertise domain, 3-year DX roadmap for a real company, AI + data strategy, ESG + regulatory positioning, P&L impact analysis, and complete 4-capstone portfolio review. Top 10% receive Upskillize BFSI Fellows recognition.</p>
      <div className="cap-meta">
        <span className="cap-tag" style={{background: "rgba(201,168,76,.15)", color: "#8B6914"}}>🎓 Earns: MBA++ / PGDFDB — NSQF Level 7</span>
        <span className="cap-tag" style={{background: "rgba(201,168,76,.15)", color: "#8B6914"}}>~48 student hours</span>
        <span className="cap-tag" style={{background: "rgba(201,168,76,.15)", color: "#8B6914"}}>Investor + CXO jury</span>
        <span className="cap-tag" style={{background: "rgba(201,168,76,.15)", color: "#8B6914"}}>BFSI Fellows Award</span>
      </div>
    </div>
  </div>
</div>
</section>


<section className="careers-detail" id="careers-detail">
<div className="container">
  <p className="section-label fade-up">Your Professional Future</p>
  <h2 className="section-title fade-up fade-up-d1">Roles, Salary Ranges<br/><em>& Internship Pathways</em></h2>
  <p className="section-lead fade-up fade-up-d2">PGDFDB prepares you for a broad spectrum of high-growth careers across Banking, FinTech, WealthTech, InsurTech, and RegTech — both in India and globally. Here is exactly what the market looks like.</p>

  <div className="careers-tabs fade-up">
    <button className={careerTabClass("banking")} onClick={() => showCareer('banking')}>🏦 Banking & NBFC</button>
    <button className={careerTabClass("fintech")} onClick={() => showCareer('fintech')}>⚡ FinTech</button>
    <button className={careerTabClass("wealth")} onClick={() => showCareer('wealth')}>📈 WealthTech</button>
    <button className={careerTabClass("regtech")} onClick={() => showCareer('regtech')}>🔒 RegTech</button>
    <button className={careerTabClass("insurtech")} onClick={() => showCareer('insurtech')}>🛡 InsurTech</button>
    <button className={careerTabClass("data")} onClick={() => showCareer('data')}>📊 Data & Analytics</button>
    <button className={careerTabClass("global")} onClick={() => showCareer('global')}>🌍 Global Roles</button>
  </div>

  {/* Banking */}
  <div className={careerPanelClass("banking")} id="career-banking">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--blue)"}}>BANKING · ENTRY LEVEL</div>
        <div className="rc-role">Digital Banking Associate</div>
        <div className="rc-company">HDFC Bank · ICICI Bank · Axis Bank · Kotak</div>
        <div className="rc-salary">₹4.5 – 7 LPA</div>
        <div className="rc-salary-lbl">Entry CTC · 0–1 year experience</div>
        <ul className="rc-skills"><li>BFSI domain knowledge (all sub-sectors)</li><li>Power BI / Excel dashboards</li><li>Basic SQL and data interpretation</li><li>UPI / payments ecosystem knowledge</li></ul>
        <div className="rc-growth">📈 Growth → Assistant Manager Digital in 2–3 yrs · ₹10–16 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--blue)"}}>BANKING · ANALYST TRACK</div>
        <div className="rc-role">Credit Analyst / Risk Analyst</div>
        <div className="rc-company">Yes Bank · IndusInd · RBL · Bandhan Bank · NBFCs</div>
        <div className="rc-salary">₹5 – 9 LPA</div>
        <div className="rc-salary-lbl">Entry–Mid · 0–2 years experience</div>
        <ul className="rc-skills"><li>Credit assessment models (5Cs + alt data)</li><li>LOS platform knowledge</li><li>Ind AS 109 / ECL basics</li><li>Python / Excel credit modelling</li></ul>
        <div className="rc-growth">📈 Growth → Senior Credit Analyst in 3 yrs · ₹12–20 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--blue)"}}>BANKING · PRODUCT</div>
        <div className="rc-role">Product Analyst — Digital Banking</div>
        <div className="rc-company">SBI · PNB · Bank of Baroda · Union Bank</div>
        <div className="rc-salary">₹5.5 – 10 LPA</div>
        <div className="rc-salary-lbl">Mid · 1–3 years experience</div>
        <ul className="rc-skills"><li>PRD writing and user story design</li><li>Agile / Scrum for banking products</li><li>Open Banking / API knowledge</li><li>CX and journey mapping</li></ul>
        <div className="rc-growth">📈 Growth → Product Manager in 3–4 yrs · ₹18–35 LPA</div>
      </div>
    </div>
  </div>

  {/* FinTech */}
  <div className={careerPanelClass("fintech")} id="career-fintech">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--purple)"}}>FINTECH · PRODUCT</div>
        <div className="rc-role">Product Manager — FinTech</div>
        <div className="rc-company">Razorpay · PhonePe · CRED · BharatPe · Slice</div>
        <div className="rc-salary">₹15 – 40 LPA</div>
        <div className="rc-salary-lbl">Mid–Senior · 2–6 years experience</div>
        <ul className="rc-skills"><li>PPP model and product thinking</li><li>BFSI regulatory knowledge</li><li>SDLC and Agile delivery</li><li>Data-driven decision making</li><li>Stakeholder and API management</li></ul>
        <div className="rc-growth">📈 Growth → Director of Product · ₹45–80 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--purple)"}}>FINTECH · GROWTH</div>
        <div className="rc-role">Growth Manager / Business Analyst</div>
        <div className="rc-company">Groww · Zerodha · Angel One · Paytm Money</div>
        <div className="rc-salary">₹8 – 20 LPA</div>
        <div className="rc-salary-lbl">Entry–Mid · 0–3 years experience</div>
        <ul className="rc-skills"><li>AARRR funnel analytics</li><li>SQL and product analytics tools</li><li>Unit economics (LTV, CAC, payback)</li><li>A/B testing framework knowledge</li></ul>
        <div className="rc-growth">📈 Growth → Growth Lead in 3 yrs · ₹25–45 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--purple)"}}>FINTECH · STARTUP</div>
        <div className="rc-role">Founding Team Member / Business Development</div>
        <div className="rc-company">Early-stage FinTechs · BFSI Startups · Your Own Venture</div>
        <div className="rc-salary">₹6 – 18 LPA + ESOPs</div>
        <div className="rc-salary-lbl">Entry · 0–2 years + equity upside</div>
        <ul className="rc-skills"><li>End-to-end BFSI domain knowledge</li><li>Investor pitch and fundraising basics</li><li>No-code product building (MVP)</li><li>BFSI regulatory landscape</li></ul>
        <div className="rc-growth">📈 Equity → FinTech founder / Co-founder potential</div>
      </div>
    </div>
  </div>

  {/* WealthTech */}
  <div className={careerPanelClass("wealth")} id="career-wealth">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--teal)"}}>WEALTHTECH · ADVISORY</div>
        <div className="rc-role">Investment Analyst / Wealth RM</div>
        <div className="rc-company">Zerodha · Groww · Smallcase · ET Money · Angel One</div>
        <div className="rc-salary">₹4.5 – 9 LPA</div>
        <div className="rc-salary-lbl">Entry · 0–2 years experience</div>
        <ul className="rc-skills"><li>MF / equity / PMS product knowledge</li><li>Client portfolio analysis (XIRR, Sharpe)</li><li>WealthTech platform literacy</li><li>SEBI investment advisor norms</li></ul>
        <div className="rc-growth">📈 Growth → Senior RM / PMS Manager · ₹15–30 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--teal)"}}>WEALTHTECH · PRODUCT</div>
        <div className="rc-role">Product Manager — WealthTech / Robo-Advisory</div>
        <div className="rc-company">Fisdom · Kuvera · INDmoney · Scripbox</div>
        <div className="rc-salary">₹12 – 30 LPA</div>
        <div className="rc-salary-lbl">Mid · 2–5 years experience</div>
        <ul className="rc-skills"><li>Algorithm-based portfolio construction</li><li>WealthTech UX design (Figma)</li><li>SEBI digital advisory compliance</li><li>ESG investing integration</li></ul>
        <div className="rc-growth">📈 Growth → Head of Product · ₹35–60 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--teal)"}}>WEALTHTECH · PRIVATE BANKING</div>
        <div className="rc-role">Private Banker / Family Office Analyst</div>
        <div className="rc-company">Kotak Wealth · HDFC Private · IIFL Wealth · 360 ONE</div>
        <div className="rc-salary">₹8 – 20 LPA</div>
        <div className="rc-salary-lbl">Mid · 1–4 years experience</div>
        <ul className="rc-skills"><li>HNI client profiling and advisory</li><li>Estate planning and succession</li><li>PMS / AIF structuring knowledge</li><li>CRM platform (Salesforce) proficiency</li></ul>
        <div className="rc-growth">📈 Growth → Relationship Head · ₹25–50 LPA + performance</div>
      </div>
    </div>
  </div>

  {/* RegTech */}
  <div className={careerPanelClass("regtech")} id="career-regtech">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--navy)"}}>REGTECH · AML/KYC</div>
        <div className="rc-role">AML Analyst / KYC Officer</div>
        <div className="rc-company">HSBC · Deutsche Bank · JP Morgan · Citibank · Standard Chartered</div>
        <div className="rc-salary">₹5.5 – 12 LPA</div>
        <div className="rc-salary-lbl">Entry–Mid · 0–3 years experience</div>
        <ul className="rc-skills"><li>AML/CFT regulation and typologies</li><li>Transaction monitoring tool experience</li><li>KYC CDD/EDD procedures</li><li>PMLA / FEMA knowledge</li></ul>
        <div className="rc-growth">📈 Growth → AML Manager / AVP Compliance · ₹18–32 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--navy)"}}>REGTECH · REPORTING</div>
        <div className="rc-role">Regulatory Reporting Analyst</div>
        <div className="rc-company">ICICI Bank · Axis Bank · RBI-regulated NBFCs · Consulting firms</div>
        <div className="rc-salary">₹5 – 10 LPA</div>
        <div className="rc-salary-lbl">Entry–Mid · 0–2 years</div>
        <ul className="rc-skills"><li>RBI BSR / CRILC / XBRL reporting</li><li>SEBI LODR / BRSR compliance</li><li>Basel III capital computation</li><li>Excel / Power BI for regulatory data</li></ul>
        <div className="rc-growth">📈 Growth → Senior Analyst / DGM Regulatory · ₹15–28 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--navy)"}}>REGTECH · TECHNOLOGY</div>
        <div className="rc-role">RegTech Product Manager / Compliance Technologist</div>
        <div className="rc-company">ComplyAdvantage · NICE Actimize · Perfios · Signzy</div>
        <div className="rc-salary">₹10 – 28 LPA</div>
        <div className="rc-salary-lbl">Mid · 2–5 years experience</div>
        <ul className="rc-skills"><li>RegTech vendor landscape knowledge</li><li>AI/ML for compliance applications</li><li>DPDPA 2023 implementation</li><li>Regulatory API design experience</li></ul>
        <div className="rc-growth">📈 Growth → Head of Compliance Technology · ₹35–55 LPA</div>
      </div>
    </div>
  </div>

  {/* InsurTech */}
  <div className={careerPanelClass("insurtech")} id="career-insurtech">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--green)"}}>INSURTECH · CLAIMS</div>
        <div className="rc-role">Claims Technology Analyst</div>
        <div className="rc-company">Acko · Digit · PolicyBazaar · Tata AIG · HDFC ERGO</div>
        <div className="rc-salary">₹5 – 11 LPA</div>
        <div className="rc-salary-lbl">Entry · 0–2 years experience</div>
        <ul className="rc-skills"><li>Digital FNOL process design</li><li>AI-based damage assessment tools</li><li>Insurance fraud detection basics</li><li>Claims workflow automation</li></ul>
        <div className="rc-growth">📈 Growth → Claims Tech Lead / Product Manager · ₹15–28 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--green)"}}>INSURTECH · PRODUCT</div>
        <div className="rc-role">InsurTech Product Manager</div>
        <div className="rc-company">Acko · Digit Insurance · Navi · Riskcovry · Onsurity</div>
        <div className="rc-salary">₹12 – 35 LPA</div>
        <div className="rc-salary-lbl">Mid · 2–5 years experience</div>
        <ul className="rc-skills"><li>InsurTech product lifecycle</li><li>IRDAI sandbox and regulatory knowledge</li><li>Bima Sugam platform architecture</li><li>Embedded insurance design</li></ul>
        <div className="rc-growth">📈 Growth → Director of Product / CPO · ₹45–70 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--green)"}}>INSURTECH · DISTRIBUTION</div>
        <div className="rc-role">Digital Distribution Analyst / PoSP Manager</div>
        <div className="rc-company">PolicyBazaar · Coverfox · Turtlemint · InsuranceDekho</div>
        <div className="rc-salary">₹4.5 – 9 LPA</div>
        <div className="rc-salary-lbl">Entry · 0–2 years experience</div>
        <ul className="rc-skills"><li>IRDAI PoSP norms and compliance</li><li>Web aggregator platform operations</li><li>Insurance CRM and renewals</li><li>Bancassurance technology models</li></ul>
        <div className="rc-growth">📈 Growth → Distribution Head / Partnerships Manager · ₹14–25 LPA</div>
      </div>
    </div>
  </div>

  {/* Data */}
  <div className={careerPanelClass("data")} id="career-data">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--orange)"}}>DATA · ANALYTICS</div>
        <div className="rc-role">Data Analyst — BFSI</div>
        <div className="rc-company">Bajaj Finserv · SBI Cards · Kotak · Deloitte · EY · KPMG</div>
        <div className="rc-salary">₹5.5 – 12 LPA</div>
        <div className="rc-salary-lbl">Entry–Mid · 0–3 years experience</div>
        <ul className="rc-skills"><li>Power BI dashboards and DAX</li><li>SQL queries on BFSI databases</li><li>Excel financial modelling</li><li>Data storytelling for executives</li></ul>
        <div className="rc-growth">📈 Growth → Senior Analyst / BI Lead · ₹16–28 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--orange)"}}>DATA · RISK</div>
        <div className="rc-role">Credit Risk Analytics Specialist</div>
        <div className="rc-company">HDFC Bank · ICICI Bank · Bajaj Finance · Home Credit</div>
        <div className="rc-salary">₹6 – 14 LPA</div>
        <div className="rc-salary-lbl">Mid · 1–3 years experience</div>
        <ul className="rc-skills"><li>PD/LGD/EAD modelling</li><li>Python/R for credit analytics</li><li>Ind AS 109 ECL computation</li><li>Credit scorecard development</li></ul>
        <div className="rc-growth">📈 Growth → Risk Model Lead / AVP Risk Analytics · ₹22–40 LPA</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--orange)"}}>DATA · FP&A</div>
        <div className="rc-role">FP&A Analyst / Finance Business Partner</div>
        <div className="rc-company">Bajaj Finserv · Aditya Birla Capital · Muthoot Finance</div>
        <div className="rc-salary">₹6 – 13 LPA</div>
        <div className="rc-salary-lbl">Mid · 1–3 years experience</div>
        <ul className="rc-skills"><li>Driver-based P&L modelling</li><li>Rolling forecast design</li><li>Power BI for CFO dashboards</li><li>Scenario analysis and stress testing</li></ul>
        <div className="rc-growth">📈 Growth → FP&A Manager / Finance Controller · ₹20–38 LPA</div>
      </div>
    </div>
  </div>

  {/* Global */}
  <div className={careerPanelClass("global")} id="career-global">
    <div className="role-cards-grid">
      <div className="role-card fade-up">
        <div className="rc-domain" style={{color: "var(--gold)"}}>GLOBAL · UAE / GULF</div>
        <div className="rc-role">BFSI Analyst — UAE / DIFC</div>
        <div className="rc-company">Emirates NBD · FAB · Mashreq · ADCB · ENBD Securities</div>
        <div className="rc-salary">AED 8,000 – 18,000/mo</div>
        <div className="rc-salary-lbl">≈ ₹18–42 LPA · Tax-free income</div>
        <ul className="rc-skills"><li>BFSI domain expertise (PGDFDB certified)</li><li>English proficiency + Arabic advantage</li><li>CBUAE / DFSA regulatory knowledge</li><li>Power BI and data analytics</li></ul>
        <div className="rc-growth">📈 Growth → Senior Manager · AED 25–50K/mo (Golden Visa eligible)</div>
      </div>
      <div className="role-card fade-up fade-up-d1">
        <div className="rc-domain" style={{color: "var(--gold)"}}>GLOBAL · UK / SINGAPORE</div>
        <div className="rc-role">Financial Analyst / FinTech Associate</div>
        <div className="rc-company">HSBC · Barclays · Standard Chartered · DBS · OCBC</div>
        <div className="rc-salary">GBP 35–55K / SGD 55–85K pa</div>
        <div className="rc-salary-lbl">Entry–Mid · Visa sponsorship common</div>
        <ul className="rc-skills"><li>FCA (UK) / MAS (SG) regulatory knowledge</li><li>BFSI technology skills</li><li>ACCA / CFA partial exemptions possible</li><li>Product and analytics background</li></ul>
        <div className="rc-growth">📈 Growth → AVP · GBP 65–90K / SGD 100–140K</div>
      </div>
      <div className="role-card fade-up fade-up-d2">
        <div className="rc-domain" style={{color: "var(--gold)"}}>GLOBAL · AUSTRALIA / CANADA</div>
        <div className="rc-role">BFSI Risk / Compliance Analyst</div>
        <div className="rc-company">ANZ · NAB · Commonwealth Bank · TD Bank · RBC · Scotiabank</div>
        <div className="rc-salary">AUD 70–100K / CAD 65–95K pa</div>
        <div className="rc-salary-lbl">Mid · PR pathways available</div>
        <ul className="rc-skills"><li>APRA (AU) / OSFI (CA) regulatory knowledge</li><li>Risk and compliance fundamentals</li><li>Data analytics (Power BI / SQL)</li><li>BFSI domain certification</li></ul>
        <div className="rc-growth">📈 Growth → Senior Analyst / PR → Citizenship pathway</div>
      </div>
    </div>
  </div>

  {/* INTERNSHIPS */}
  <h3 style={{fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", color: "var(--text)", marginTop: "60px", marginBottom: "8px"}}>Internship Opportunities <em style={{fontStyle: "normal", color: "var(--purple)"}}>— Earn While You Learn</em></h3>
  <p style={{fontSize: "15px", color: "var(--muted)", marginBottom: "0"}}>Students completing Semester 2 (from Month 9 onwards) are eligible for structured 4–8 week BFSI internships through the Upskillize partner network. These are real work experiences — not letter-only internships — with several leading to pre-placement offers.</p>
  <div className="internship-grid">
    <div className="int-card fade-up">
      <div className="int-header" style={{background: "linear-gradient(135deg,#EBF4FF,#F0F8FF)"}}>
        <div className="int-phase" style={{color: "var(--blue)"}}>Available from Month 9 (after Semester 2)</div>
        <div className="int-role">BFSI Business Analyst Internship</div>
        <div className="int-type">Banks · NBFCs · Consulting · 4–8 weeks</div>
      </div>
      <div className="int-body">
        <div className="int-detail">Work with a BFSI business team on real process analysis, requirements gathering, dashboard creation, or product documentation. Build a genuine deliverable and get a manager's letter of recommendation.</div>
        <div className="int-tags">
          <span className="int-tag">Power BI</span><span className="int-tag">SQL</span><span className="int-tag">Process Mapping</span><span className="int-tag">PRD Writing</span>
        </div>
      </div>
      <div className="int-salary">₹10,000 – 25,000/month stipend · PPO possible</div>
    </div>
    <div className="int-card fade-up fade-up-d1">
      <div className="int-header" style={{background: "linear-gradient(135deg,var(--light),#EDE9F7)"}}>
        <div className="int-phase" style={{color: "var(--purple)"}}>Available from Month 9 (after Module 8)</div>
        <div className="int-role">Data Analytics Internship — BFSI</div>
        <div className="int-type">FinTechs · Banks · Analytics Firms · 4–6 weeks</div>
      </div>
      <div className="int-body">
        <div className="int-detail">Build a live analytical dashboard or credit model for a real BFSI company. Work with their data teams, get exposure to production-grade datasets, and contribute a deliverable that ships.</div>
        <div className="int-tags">
          <span className="int-tag">Power BI</span><span className="int-tag">Python</span><span className="int-tag">SQL</span><span className="int-tag">Credit Analytics</span>
        </div>
      </div>
      <div className="int-salary">₹12,000 – 30,000/month stipend · PPO possible</div>
    </div>
    <div className="int-card fade-up fade-up-d2">
      <div className="int-header" style={{background: "linear-gradient(135deg,#FFF8E1,#FFF0C0)"}}>
        <div className="int-phase" style={{color: "#8B6914"}}>Available from Month 12 (after Module 12)</div>
        <div className="int-role">Product Management Internship</div>
        <div className="int-type">FinTechs · Digital Banks · WealthTechs · 6–8 weeks</div>
      </div>
      <div className="int-body">
        <div className="int-detail">Join a FinTech or digital bank's product team. Write user stories, contribute to sprint planning, assist in feature delivery, and understand the full Agile product lifecycle in a live BFSI environment.</div>
        <div className="int-tags">
          <span className="int-tag">Agile</span><span className="int-tag">PRD Writing</span><span className="int-tag">User Stories</span><span className="int-tag">BFSI Regulation</span>
        </div>
      </div>
      <div className="int-salary">₹15,000 – 40,000/month stipend · High PPO conversion</div>
    </div>
    <div className="int-card fade-up">
      <div className="int-header" style={{background: "linear-gradient(135deg,#E8F5EE,#D4EEE0)"}}>
        <div className="int-phase" style={{color: "var(--green)"}}>Available from Month 11 (after Module 9)</div>
        <div className="int-role">RegTech / Compliance Internship</div>
        <div className="int-type">Banks · RegTech Vendors · Compliance Consulting · 4–6 weeks</div>
      </div>
      <div className="int-body">
        <div className="int-detail">Support an AML/KYC or regulatory reporting team at a bank or RegTech vendor. Assist in transaction monitoring calibration, KYC process review, or regulatory submission preparation.</div>
        <div className="int-tags">
          <span className="int-tag">AML/KYC</span><span className="int-tag">PMLA</span><span className="int-tag">RBI Reporting</span><span className="int-tag">DPDPA</span>
        </div>
      </div>
      <div className="int-salary">₹12,000 – 28,000/month stipend · Strong hiring pipeline</div>
    </div>
    <div className="int-card fade-up fade-up-d1">
      <div className="int-header" style={{background: "linear-gradient(135deg,#FDE8DC,#FDD5C0)"}}>
        <div className="int-phase" style={{color: "var(--orange)"}}>Available from Month 9 (after Module 6)</div>
        <div className="int-role">WealthTech / InsurTech Internship</div>
        <div className="int-type">WealthTech Apps · InsurTechs · Distributors · 4–6 weeks</div>
      </div>
      <div className="int-body">
        <div className="int-detail">Work with a WealthTech or InsurTech firm's product, operations, or distribution team. Gain niche domain expertise in investment technology or digital insurance — rare skills that set you apart.</div>
        <div className="int-tags">
          <span className="int-tag">MF Technology</span><span className="int-tag">ESG</span><span className="int-tag">InsurTech Platforms</span><span className="int-tag">IRDAI</span>
        </div>
      </div>
      <div className="int-salary">₹10,000 – 25,000/month stipend · PPO possible</div>
    </div>
    <div className="int-card fade-up fade-up-d2">
      <div className="int-header" style={{background: "linear-gradient(135deg,#EBF4FF,#D6E8F5)"}}>
        <div className="int-phase" style={{color: "var(--teal)"}}>Available year-round via Alumni Network</div>
        <div className="int-role">Innovation Lab Project Internship</div>
        <div className="int-type">Upskillize Partner Companies · 3–4 weeks · Remote-first</div>
      </div>
      <div className="int-body">
        <div className="int-detail">Work on a real BFSI company's analytics or product challenge using your Innovation Lab skills — Power BI, Python, or no-code tools. Deliverable-based, remote-first, and portfolio-building.</div>
        <div className="int-tags">
          <span className="int-tag">Innovation Lab Portfolio</span><span className="int-tag">Remote</span><span className="int-tag">BFSI Analytics</span>
        </div>
      </div>
      <div className="int-salary">₹8,000 – 20,000/month stipend · Certificate of completion</div>
    </div>
  </div>
</div>
</section>


{/* RUBRIC FRAMEWORK – UGC OBE ALIGNED */}
<section className="rubric-section" id="rubric">
  <div className="container">
    <p className="section-label fade-up">UGC Outcome-Based Education Framework</p>
    <h2 className="section-title fade-up fade-up-d1" style={{color:"#ffffff"}}>The <em style={{color:"var(--gold)"}}>RUBRIC</em> Framework:<br/>UGC OBE — Aligned &amp; Accredited.</h2>
    <p className="section-lead fade-up fade-up-d2">PGDFDB is designed fully in accordance with the UGC Curriculum and Credit Framework for Postgraduate Programmes (2023) and AICTE's Outcome-Based Education (OBE) mandate. The RUBRIC framework below defines how every learning element of this programme is structured, delivered, assessed, and improved — ensuring NSQF Level 7 standards are met and CO-PO attainment is measurable at every stage.</p>

    <div className="rubric-grid fade-up fade-up-d1" style={{marginTop: "16px"}}>
      <div className="rubric-card">
        <div className="r-letter">R</div>
        <div className="r-title">Rigorous Outcome-Based Education</div>
        <div className="r-body">128 lessons × explicit Course Outcomes × Bloom's Level mapping × CO-PO matrix = a programme where every hour is outcome-mapped, not content-dumped. Students know what they can do after every lesson — not just what they were taught.</div>
        <div className="r-example">→ 8 Programme Outcomes · 5 COs per module · Bloom's L1–L6 ladder · Direct + indirect attainment measurement</div>
      </div>
      <div className="rubric-card">
        <div className="r-letter">U</div>
        <div className="r-title">Universal Graduate Attributes (NHEQF Level 7)</div>
        <div className="r-body">All eight UGC NHEQF Level 7 Graduate Attributes are developed across the 2-years journey: domain expertise, digital proficiency, regulatory intelligence, product thinking, data leadership, professional readiness, strategic leadership, and global awareness.</div>
        <div className="r-example">→ PO1 to PO8 · Every lesson maps to ≥3 POs · Finance + Marketing + HR + Systems all covered</div>
      </div>
      <div className="rubric-card">
        <div className="r-letter">B</div>
        <div className="r-title">Bloom's Taxonomy Aligned Assessments</div>
        <div className="r-body">Semester 1 establishes L1–L3 (Know, Understand, Apply). Parts 2–3 develop L4–L5 (Analyse, Evaluate). Semester 4 and all capstones operate at L5–L6 (Evaluate, Create). PG standards require ≥60% of assessment at L4+. PGDFDB achieves 68%.</div>
        <div className="r-example">→ L1 Recall → L2 Comprehension → L3 Application → L4 Analysis → L5 Evaluation → L6 Creation</div>
      </div>
      <div className="rubric-card">
        <div className="r-letter">R</div>
        <div className="r-title">Research, Reflection &amp; Real-World Application</div>
        <div className="r-body">Four capstone projects requiring original research on live BFSI problems. 48 Saturday Innovation Lab sessions applying weekly learning to real data and real tools. Structured mentor-led reflection built into every Semester milestone. Research aptitude developed progressively across all 4 Parts.</div>
        <div className="r-example">→ 4 capstones · 48 Innovation Lab sessions · Mentor milestone reviews · Real BFSI datasets (RBI, SEBI, AMFI)</div>
      </div>
      <div className="rubric-card">
        <div className="r-letter">I</div>
        <div className="r-title">Industry Integration &amp; Interdisciplinary Learning</div>
        <div className="r-body">Top 1% BFSI practitioners as trainers. All case studies from real Indian BFSI events. Cross-specialisation tagging on every lesson. Six flagship courses woven across 16 modules. No silo between Finance, Marketing, HR, and Systems — this is how BFSI actually works.</div>
        <div className="r-example">→ Top 1% trainers · Real cases: HDFC, Yes Bank, UPI, CRED · All MBA specialisations served</div>
      </div>
      <div className="rubric-card">
        <div className="r-letter">C</div>
        <div className="r-title">Continuous CO-PO Attainment &amp; Improvement</div>
        <div className="r-body">CO-PO attainment measured 4 times per programme. Target: 75%+ students achieving COs. Direct indicators: quiz + capstone scores. Indirect indicators: student surveys + employer feedback + placement outcomes. Below-threshold triggers Academic Review Committee intervention.</div>
        <div className="r-example">→ Target: 75% CO attainment · 85% placement rate · Annual curriculum review · NAAC-ready documentation</div>
      </div>
    </div>
  </div>
</section>

{/* PROGRAMME OUTCOMES (PO) — UGC NHEQF LEVEL 7 */}
<section className="po-section" id="programme-outcomes">
  <div className="container">
    <p className="section-label fade-up">UGC NHEQF Level 7 — Outcome-Based Education</p>
    <h2 className="section-title fade-up fade-up-d1">Outcomes Driven Learning  &amp;<br/><em>Lesson-Level CO Mapping</em></h2>
    <p className="section-lead fade-up fade-up-d2">As mandated by UGC's Curriculum and Credit Framework for Postgraduate Programmes (2023) and AICTE's OBE Guidelines, every lesson in PGDFDB is mapped to Programme Outcomes (POs), assessed at a defined Bloom's Taxonomy level, and tracked for CO-PO attainment across the batch.</p>

    {/* PO Definitions */}
    <h3 style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "var(--text)", margin: "48px 0 20px"}}>The 8 Programme Outcomes (POs) — PGDFDB </h3>
    <div className="po-table-wrap fade-up">
      <table className="po-table">
        <thead style={{background: "var(--navy)"}}>
          <tr>
            <th style={{color: "#fff", width: "60px"}}>PO #</th>
            <th style={{color: "#fff", width: "220px"}}>Programme Outcome</th>
            <th style={{color: "#fff"}}>Statement — What the Graduate Will Demonstrate</th>
            <th style={{color: "#fff", width: "120px"}}>NHEQF L7 Attribute</th>
            <th style={{color: "#fff", width: "100px"}}>Bloom's Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="po-badge po-b1">PO1</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>BFSI Domain Competency</td>
            <td>Demonstrate comprehensive, integrated knowledge of the Indian BFSI ecosystem — banking, insurance, capital markets, payments, FinTech, and regulation — and apply domain knowledge to analyse sector-specific business problems and opportunities.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Disciplinary Knowledge</td>
            <td><span className="bloom-chip">L4 — Analyse</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b2">PO2</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Digital Technology Proficiency</td>
            <td>Apply industry-standard digital tools — Power BI, SQL, Python, no-code platforms, and AI tools — to build functional BFSI solutions, dashboards, and analytical models that solve real business problems.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Skill Development</td>
            <td><span className="bloom-chip">L3 — Apply</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b3">PO3</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Regulatory &amp; Compliance Intelligence</td>
            <td>Evaluate regulatory frameworks governing BFSI in India — RBI, SEBI, IRDAI, PFRDA, DPDPA — and design compliance-aligned processes, products, and technology solutions that meet current regulatory requirements.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Critical Thinking</td>
            <td><span className="bloom-chip">L5 — Evaluate</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b4">PO4</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Product &amp; Innovation Thinking</td>
            <td>Design digital BFSI products and services using structured product management methodologies — PRD writing, Agile delivery, user story design, SDLC — and build functional prototypes using Innovation Lab tools.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Problem Solving</td>
            <td><span className="bloom-chip">L6 — Create</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b5">PO5</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Data-Driven Decision Making</td>
            <td>Analyse BFSI data using business intelligence tools, SQL, and Python to produce actionable insights, executive-ready dashboards, and data-backed recommendations that influence BFSI business strategy and operations.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Analytical Reasoning</td>
            <td><span className="bloom-chip">L4 — Analyse</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b6">PO6</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Professional Readiness &amp; Employability</td>
            <td>Demonstrate industry-level professional competencies — resume construction, interview performance, portfolio presentation, LinkedIn personal branding, GD/PI skills — and successfully transition into a quality BFSI career placement.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Communication &amp; Career</td>
            <td><span className="bloom-chip">L3 — Apply</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b7">PO7</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Leadership &amp; Strategic Thinking</td>
            <td>Evaluate complex BFSI business situations from a leadership perspective — P&amp;L management, board communication, digital transformation strategy, crisis management, and M&amp;A decisions — using frameworks from the MiniCEO Program.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Leadership &amp; Management</td>
            <td><span className="bloom-chip">L5 — Evaluate</span></td>
          </tr>
          <tr>
            <td><span className="po-badge po-b8">PO8</span></td>
            <td style={{fontWeight: "700", color: "var(--navy)"}}>Global &amp; Ethical Awareness</td>
            <td>Assess global BFSI career opportunities and regulatory environments across UAE, UK, Singapore, Australia, and Canada; demonstrate ethical decision-making in financial services, ESG responsibility, and DPDPA/data privacy compliance.</td>
            <td style={{fontSize: "12px", color: "var(--muted)"}}>Global Citizenship</td>
            <td><span className="bloom-chip">L5 — Evaluate</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Attainment Targets */}
    <h3 style={{fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "var(--text)", margin: "48px 0 16px"}}>Attainment Targets &amp; Assessment Strategy</h3>
    <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px"}} className="fade-up">
      <div style={{background: "linear-gradient(135deg,#EBF4FF,#F0F8FF)", borderRadius: "14px", padding: "24px", border: "1px solid var(--border)"}}>
        <div style={{fontSize: "11px", fontWeight: "800", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "8px"}}>Direct Assessment Indicators</div>
        <ul style={{listStyle: "none", fontSize: "13px", color: "var(--dark)", lineHeight: "2"}}>
          <li>📋 Weekly MCQ self-tests (EcoPro LMS, auto-graded)</li>
          <li>📝 Saturday case study submissions (peer + trainer)</li>
          <li>🔬 Innovation Lab deliverables (mentor graded)</li>
          <li>📊 Module assignments (16 total)</li>
          <li>🎓 Capstone presentations (external jury, rubric scored)</li>
          <li>🎤 Mock interviews (2 per student, structured rubric)</li>
        </ul>
      </div>
      <div style={{background: "linear-gradient(135deg,var(--light),#EDE9F7)", borderRadius: "14px", padding: "24px", border: "1px solid var(--border)"}}>
        <div style={{fontSize: "11px", fontWeight: "800", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--purple)", marginBottom: "8px"}}>Indirect Assessment Indicators</div>
        <ul style={{listStyle: "none", fontSize: "13px", color: "var(--dark)", lineHeight: "2"}}>
          <li>📣 Student satisfaction survey (end of each Semester)</li>
          <li>👔 Employer feedback on placed graduates</li>
          <li>💼 Placement rate &amp; average CTC tracking</li>
          <li>🤝 Alumni career progression survey (Year 2 post)</li>
          <li>🌍 Industry mentor assessment of capstone quality</li>
          <li>🏆 Innovation Lab award jury feedback</li>
        </ul>
      </div>
      <div style={{background: "linear-gradient(135deg,#E8F5EE,#D4EEE0)", borderRadius: "14px", padding: "24px", border: "1px solid var(--border)"}}>
        <div style={{fontSize: "11px", fontWeight: "800", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--green)", marginBottom: "8px"}}>CO-PO Attainment Targets</div>
        <ul style={{listStyle: "none", fontSize: "13px", color: "var(--dark)", lineHeight: "2"}}>
          <li>🎯 CO attainment: ≥75% students score ≥60%</li>
          <li>📈 PO average: ≥2.0 / 3.0 across programme</li>
          <li>💼 Placement rate: ≥85% within 6 months</li>
          <li>⭐ Distinction rate: ≥30% (score ≥80%)</li>
          <li>🔄 Below-threshold trigger: Academic Review</li>
          <li>📅 Review cycle: End of each Semester (4× per year)</li>
        </ul>
      </div>
    </div>

    {/* Grading Scale */}
    <div style={{background: "var(--navy)", borderRadius: "14px", padding: "28px 32px", marginTop: "28px", display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center"}} className="fade-up">
      <div style={{fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800", color: "var(--white)"}}>UGC Grading Scale (10-Point)</div>
      <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "var(--gold)"}}>O</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Outstanding<br/>90–100%</div></div>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "var(--gold)"}}>A+</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Excellent<br/>80–89%</div></div>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "var(--gold)"}}>A</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Very Good<br/>70–79%</div></div>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "#aaa"}}>B+</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Good<br/>60–69%</div></div>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "#aaa"}}>B</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Above Avg<br/>55–59%</div></div>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "#aaa"}}>C</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Average<br/>50–54%</div></div>
        <div style={{textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "#e74c3c"}}>F</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.6)"}}>Fail<br/>Below 50%</div></div>
      </div>
      <div style={{fontSize: "12px", color: "rgba(255,255,255,.45)", flex: "1", minWidth: "180px"}}>SGPA &amp; CGPA computed as per UGC CCFPGP 2023 §9. Grade cards issued per Semester. Consolidated transcript at programme completion. Credits stored in ABC DigiLocker.</div>
    </div>
  </div>
</section>


<section className="assess-page" id="assessment" style={{paddingTop: "0", paddingBottom: "0"}}>

  {/* Sticky Tab Bar */}
  <div className="assess-tabs-wrap">
    <div className="assess-tabs">
      <button className={assessTabClass("rubric-tab")} onClick={() => showAssess('rubric-tab')}>🎯 RUBRIC Framework</button>
      <button className={assessTabClass("bloom-tab")} onClick={() => showAssess('bloom-tab')}>🧠 Bloom's Taxonomy</button>
      <button className={assessTabClass("po-tab")} onClick={() => showAssess('po-tab')}>📋 Programme Outcomes</button>
      <button className={assessTabClass("co-tab")} onClick={() => showAssess('co-tab')}>🔗 CO-PO Mapping</button>
      <button className={assessTabClass("assess-tab")} onClick={() => showAssess('assess-tab')}>📊 Assessment Framework</button>
      <button className={assessTabClass("scoring-tab")} onClick={() => showAssess('scoring-tab')}>🏅 Student Scoring</button>
      <button className={assessTabClass("attain-tab")} onClick={() => showAssess('attain-tab')}>📈 Attainment & Improvement</button>
    </div>
  </div>

  
  <div className={assessPanelClass("rubric-tab")} id="rubric-tab">
    <div className="at-callout" style={{background: "linear-gradient(135deg,var(--navy),#1A1048)", color: "var(--white)"}}>
      <div className="icon">🎓</div>
      <div>
        <h5 style={{color: "var(--gold)"}}>UGC Outcome-Based Education (OBE) — RUBRIC Framework</h5>
        <p style={{color: "rgba(255,255,255,.7)"}}>PGDFDB is fully designed in accordance with UGC's Curriculum and Credit Framework for Postgraduate Programmes 2023 (CCFPGP), AICTE's OBE Guidelines, and NEP 2020 mandates. The RUBRIC framework is not a proprietary acronym — it is Upskillize's structured operationalisation of UGC's OBE mandate, with each letter mapped to a specific UGC/AICTE/NCrF regulatory reference.</p>
      </div>
    </div>

    <h2 className="at-h2" style={{marginTop: "40px"}}>RUBRIC — The UGC OBE Operationalisation Framework</h2>
    <p className="at-lead">Each letter of RUBRIC represents one pillar of the UGC Outcome-Based Education system. Together, they ensure that PGDFDB is not just content-rich but outcome-measurable, attainment-tracked, and continuously improved — as required by NAAC, NIRF, and BFSI SSC quality standards.</p>

    <div className="rubric-full-grid">

      {/* R1 */}
      <div className="rf-card">
        <div className="rf-header" style={{background: "linear-gradient(135deg,#EBF4FF,#F0F8FF)"}}>
          <div className="rf-letter">R</div>
          <div className="rf-head-text">
            <h4>Rigorous Outcome-Based Education</h4>
            <p>Programme Design Principle</p>
          </div>
        </div>
        <div className="rf-body">
          <p>Every one of the 128 lessons is defined by explicit Programme Outcomes (POs) and Course Outcomes (COs) before any content is created. This is the OBE backward design principle mandated by UGC: define what graduates must achieve, then design instruction and assessment to ensure it happens.</p>
          <p>In PGDFDB, no lesson is planned around "what to teach" — it is always planned around "what must the student be able to do after this lesson." This shift from content-centric to outcome-centric delivery is the foundation of UGC's CCFPGP 2023.</p>
          <ul>
            <li>128 lessons each carry defined Course Outcomes (COs)</li>
            <li>Every CO is mapped to at least one Programme Outcome (PO)</li>
            <li>Instruction, assessment, and feedback are all anchored to stated outcomes</li>
            <li>CO attainment is measured at end of every Semester (4× per programme)</li>
            <li>Backwards design: Outcomes → Assessment → Instruction</li>
          </ul>
        </div>
        <div className="rf-ref" style={{background: "var(--navy)", fontSize: "11px", color: "rgba(255,255,255,.6)", padding: "10px 24px"}}>📖 UGC CCFPGP 2023 §5 — Programme Outcomes &nbsp;·&nbsp; AICTE OBE Guidelines §3</div>
      </div>

      {/* U */}
      <div className="rf-card">
        <div className="rf-header" style={{background: "linear-gradient(135deg,var(--light),#EDE9F7)"}}>
          <div className="rf-letter">U</div>
          <div className="rf-head-text">
            <h4>Universal Graduate Attributes (NHEQF Level 7)</h4>
            <p>Graduate Profile Definition</p>
          </div>
        </div>
        <div className="rf-body">
          <p>UGC's NHEQF Level 7 specifies that postgraduate graduates must demonstrate eight Universal Graduate Attributes — domain expertise, digital proficiency, critical thinking, communication, research aptitude, ethics, leadership, and global awareness. PGDFDB maps all eight across 16 modules.</p>
          <p>The eight Programme Outcomes of PGDFDB are directly derived from these NHEQF Level 7 Graduate Attributes, ensuring that the programme produces graduates who meet the national postgraduate benchmark for knowledge, skills, and professional behaviour.</p>
          <ul>
            <li>8 POs derived directly from UGC NHEQF Level 7 descriptors</li>
            <li>Every lesson maps to a minimum of 3 POs</li>
            <li>Finance, Marketing, HR, and Systems students all served</li>
            <li>Cross-disciplinary tagging on every lesson in LMS</li>
            <li>Graduate attributes verified through capstone jury assessment</li>
          </ul>
        </div>
        <div className="rf-ref" style={{background: "var(--purple)", fontSize: "11px", color: "rgba(255,255,255,.6)", padding: "10px 24px"}}>📖 UGC NHEQF Level 7 Graduate Attributes &nbsp;·&nbsp; NCrF §3 — Learning Outcomes</div>
      </div>

      {/* B */}
      <div className="rf-card">
        <div className="rf-header" style={{background: "linear-gradient(135deg,#FFF8E1,#FFF0C0)"}}>
          <div className="rf-letter">B</div>
          <div className="rf-head-text">
            <h4>Bloom's Taxonomy Aligned Assessments</h4>
            <p>Assessment Level Classification</p>
          </div>
        </div>
        <div className="rf-body">
          <p>AICTE mandates that PG programmes demonstrate dominance of higher-order thinking — at least 60% of all assessments must operate at Bloom's Level 4 (Analyse) or above. PGDFDB  achieves 68% at L4+, deliberately distributing lower-order levels to foundational lessons and progressively raising cognitive demand across the 2 years.</p>
          <p>Semester 1 establishes L1–L3. Parts 2–3 develop L3–L5. Semester 4 and capstones operate entirely at L5–L6. This progressive Bloom's ladder is the backbone of the curriculum design.</p>
          <ul>
            <li>Semester 1 (Foundations): L1 Remember → L3 Apply</li>
            <li>Semester 2 (Intermediate): L3 Apply → L4 Analyse</li>
            <li>Semester 3 (Advanced): L4 Analyse → L5 Evaluate</li>
            <li>Semester 4 / Capstones: L5 Evaluate → L6 Create</li>
            <li>68% of all PGDFDB assessments at L4 or above</li>
          </ul>
        </div>
        <div className="rf-ref" style={{background: "#8B6914", fontSize: "11px", color: "rgba(255,255,255,.6)", padding: "10px 24px"}}>📖 AICTE OBE Guidelines §4 — Bloom's Taxonomy &nbsp;·&nbsp; UGC CCFPGP 2023 §7</div>
      </div>

      {/* R2 */}
      <div className="rf-card">
        <div className="rf-header" style={{background: "linear-gradient(135deg,#E8F5EE,#D4EEE0)"}}>
          <div className="rf-letter" style={{background: "linear-gradient(135deg,var(--green),#2ECC71)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>R</div>
          <div className="rf-head-text">
            <h4>Research, Reflection & Real-World Application</h4>
            <p>Research Component (UGC Mandated)</p>
          </div>
        </div>
        <div className="rf-body">
          <p>UGC's CCFPGP 2023 mandates that all PG programmes develop "research aptitude and analytical ability." PGDFDB operationalises this through four progressively complex capstone projects, 48 Saturday Innovation Lab sessions, and structured mentor-led reflection at every Semester milestone.</p>
          <p>Students are not passive recipients of BFSI knowledge — they research, build, present, and receive industry-panel feedback at every stage. By graduation, each student has a portfolio of 4 research-backed deliverables that demonstrate original analysis of real BFSI problems.</p>
          <ul>
            <li>4 Capstone Projects requiring original research on live BFSI problems</li>
            <li>48 Innovation Lab sessions — applied learning on real BFSI data</li>
            <li>Structured mentor-led reflection built into every Semester milestone</li>
            <li>RBI DBIE, SEBI, AMFI, NSE/BSE data used across all analytics modules</li>
            <li>External industry jury validates research quality at each capstone</li>
          </ul>
        </div>
        <div className="rf-ref" style={{background: "var(--green)", fontSize: "11px", color: "rgba(255,255,255,.6)", padding: "10px 24px"}}>📖 UGC CCFPGP 2023 §8 — Research Component &nbsp;·&nbsp; NCrF §2.3 — Experiential Learning</div>
      </div>

      {/* I */}
      <div className="rf-card">
        <div className="rf-header" style={{background: "linear-gradient(135deg,#FDE8DC,#FDD5C0)"}}>
          <div className="rf-letter" style={{background: "linear-gradient(135deg,var(--orange),#E8901A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>I</div>
          <div className="rf-head-text">
            <h4>Industry Integration & Interdisciplinary Learning</h4>
            <p>NEP 2020 Multidisciplinary Mandate</p>
          </div>
        </div>
        <div className="rf-body">
          <p>NEP 2020 explicitly mandates that higher education institutions break silos between vocational and academic learning. UGC's CCFPGP 2023 requires PG programmes to include "vocational courses relevant to the chosen discipline." PGDFDB goes further — the entire programme IS the vocational component of the MBA, delivered by active industry practitioners.</p>
          <p>Every trainer is a top-1% BFSI professional. Every case study is drawn from Indian BFSI events. Every lesson is cross-tagged for relevance across MBA specialisations. Six distinct flagship courses are woven through 16 modules — ensuring breadth and depth simultaneously.</p>
          <ul>
            <li>Top 1% BFSI industry practitioners as trainers — zero academic-only faculty</li>
            <li>All case studies from real Indian BFSI events and companies</li>
            <li>Cross-specialisation tagging on every lesson (Finance, Marketing, HR, Systems)</li>
            <li>6 flagship courses embedded across 16 modules — breadth + depth</li>
            <li>Internship pathways from Month 9 — real industry exposure during programme</li>
          </ul>
        </div>
        <div className="rf-ref" style={{background: "var(--orange)", fontSize: "11px", color: "rgba(255,255,255,.6)", padding: "10px 24px"}}>📖 NEP 2020 §10 — Multidisciplinary Ed &nbsp;·&nbsp; UGC CCFPGP 2023 §6 — Vocational Integration</div>
      </div>

      {/* C */}
      <div className="rf-card">
        <div className="rf-header" style={{background: "linear-gradient(135deg,#FAE0E0,#FDD5D5)"}}>
          <div className="rf-letter" style={{background: "linear-gradient(135deg,#C0392B,#E74C3C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>C</div>
          <div className="rf-head-text">
            <h4>Continuous CO-PO Attainment & Improvement</h4>
            <p>Closed-Loop Quality System</p>
          </div>
        </div>
        <div className="rf-body">
          <p>AICTE's OBE Guidelines §8 mandate a closed-loop improvement cycle: measure CO-PO attainment, compare against targets, identify gaps, and implement curriculum improvements before the next delivery cycle. This is also a NAAC accreditation criterion. PGDFDB runs this cycle 4 times per programme — once at the end of every Semester.</p>
          <p>Both direct indicators (quiz scores, capstone rubric scores) and indirect indicators (student surveys, employer feedback, placement outcomes) feed into the attainment calculation. Below-target COs trigger an Academic Review Committee intervention within 15 days.</p>
          <ul>
            <li>CO-PO attainment measured 4× per programme (end of each Semester)</li>
            <li>Target: ≥75% of students achieve ≥60% in every CO</li>
            <li>Direct + indirect indicators used for a holistic attainment picture</li>
            <li>Academic Review Committee triggered if any PO falls below 2.0/3.0</li>
            <li>Annual curriculum review incorporating employer and alumni feedback</li>
          </ul>
        </div>
        <div className="rf-ref" style={{background: "#8B0000", fontSize: "11px", color: "rgba(255,255,255,.6)", padding: "10px 24px"}}>📖 AICTE OBE Guidelines §8 — Attainment &amp; Improvement &nbsp;·&nbsp; NAAC Criterion III</div>
      </div>

    </div>{/* end rubric-full-grid */}
  </div>{/* end rubric-tab */}

  
  <div className={assessPanelClass("bloom-tab")} id="bloom-tab">
    <h2 className="at-h2">Bloom's Taxonomy — PGDFDB Progression</h2>
    <p className="at-lead">AICTE mandates that PG programmes operate primarily at Bloom's higher-order levels (L4–L6). The table below shows how PGDFDB uses Bloom's Taxonomy across all 4 Parts — beginning with foundational recall and building toward professional-level creation by the MiniCEO Summit.</p>

    <div className="bloom-levels">
      <div className="bl" style={{background: "#EBF4FF", border: "1px solid #C3D9F5"}}>
        <div className="bl-num" style={{color: "var(--blue)"}}>L1</div>
        <div className="bl-name" style={{color: "var(--blue)"}}>REMEMBER</div>
        <div className="bl-desc" style={{color: "#2C5282"}}>Recall facts, definitions, and foundational concepts from BFSI domain</div>
        <div className="bl-verbs" style={{color: "#4A7CBF"}}>Define · List · Name · Recall · Identify</div>
      </div>
      <div className="bl" style={{background: "var(--light)", border: "1px solid #D0C8EC"}}>
        <div className="bl-num" style={{color: "var(--purple)"}}>L2</div>
        <div className="bl-name" style={{color: "var(--purple)"}}>UNDERSTAND</div>
        <div className="bl-desc" style={{color: "var(--purple-d,#3D3060)"}}>Explain concepts, classify BFSI instruments, describe regulatory frameworks</div>
        <div className="bl-verbs" style={{color: "var(--purple-l,#7A6BA8)"}}>Explain · Describe · Classify · Summarise</div>
      </div>
      <div className="bl" style={{background: "#FFF8E1", border: "1px solid #E8D095"}}>
        <div className="bl-num" style={{color: "#8B6914"}}>L3</div>
        <div className="bl-name" style={{color: "#8B6914"}}>APPLY</div>
        <div className="bl-desc" style={{color: "#5C3D00"}}>Use tools (Power BI, SQL, Excel) and frameworks on real BFSI scenarios and datasets</div>
        <div className="bl-verbs" style={{color: "#9A7020"}}>Apply · Build · Calculate · Demonstrate</div>
      </div>
      <div className="bl" style={{background: "#E8F5EE", border: "1px solid #A8D5BC"}}>
        <div className="bl-num" style={{color: "var(--green)"}}>L4</div>
        <div className="bl-name" style={{color: "var(--green)"}}>ANALYSE</div>
        <div className="bl-desc" style={{color: "#1A4A2A"}}>Break down BFSI problems, compare approaches, identify patterns in data and regulation</div>
        <div className="bl-verbs" style={{color: "#2A7A4A"}}>Analyse · Compare · Differentiate · Examine</div>
      </div>
      <div className="bl" style={{background: "#FDE8DC", border: "1px solid #F0B090"}}>
        <div className="bl-num" style={{color: "var(--orange)"}}>L5</div>
        <div className="bl-name" style={{color: "var(--orange)"}}>EVALUATE</div>
        <div className="bl-desc" style={{color: "#8B3A00"}}>Judge quality of BFSI solutions, assess regulatory compliance, critique business models</div>
        <div className="bl-verbs" style={{color: "#C05020)"}}>Evaluate · Justify · Critique · Assess</div>
      </div>
      <div className="bl" style={{background: "#FAE0E0", border: "1px solid #F0A8A8"}}>
        <div className="bl-num" style={{color: "#C0392B"}}>L6</div>
        <div className="bl-name" style={{color: "#C0392B"}}>CREATE</div>
        <div className="bl-desc" style={{color: "#8B0000"}}>Design digital BFSI products, build prototypes, formulate transformation strategies</div>
        <div className="bl-verbs" style={{color: "#C0392B"}}>Design · Build · Propose · Construct · Formulate</div>
      </div>
    </div>

    <h3 className="at-h3">Bloom's Distribution Across PGDFDB</h3>
    <table className="at-table">
      <thead style={{background: "var(--navy)"}}>
        <tr>
          <th style={{color: "#fff", width: "160px"}}>Programme Semester</th>
          <th style={{color: "#fff"}}>Primary Bloom's Levels</th>
          <th style={{color: "#fff"}}>Dominant Assessment Type</th>
          <th style={{color: "#fff"}}>Example Activities</th>
          <th style={{color: "#fff", width: "80px"}}>L4+ %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Semester 1 — Foundations<br/><small style={{color: "var(--muted)"}}>Modules 1–4</small></td>
          <td><strong>L1 → L3</strong> with L4 in Modules 3–4</td>
          <td>MCQ quizzes, structured case study discussions, Excel model builds</td>
          <td>Build a credit scorecard (L3) · Compare bank vs FinTech business models (L4) · Map regulatory structure (L2)</td>
          <td style={{fontWeight: "700", color: "var(--orange)"}}>35%</td>
        </tr>
        <tr>
          <td>Semester 2 — Intermediate<br/><small style={{color: "var(--muted)"}}>Modules 5–8</small></td>
          <td><strong>L3 → L5</strong> with growing L4–L5</td>
          <td>Power BI dashboards, API testing, Agile sprint simulations, SQL challenges</td>
          <td>Build NPA dashboard (L3) · Evaluate MDR impact on merchant economics (L5) · Analyse WealthTech platform (L4)</td>
          <td style={{fontWeight: "700", color: "var(--purple)"}}>58%</td>
        </tr>
        <tr>
          <td>Semester 3 — Advanced<br/><small style={{color: "var(--muted)"}}>Modules 9–12</small></td>
          <td><strong>L4 → L6</strong> — all assessments at L4+</td>
          <td>RegTech compliance audits, DeFi research briefs, VC pitch decks, MVP prototypes</td>
          <td>Evaluate BRSR disclosures of 5 banks (L5) · Build AML detector in Python (L3/L6) · Design CBDC wallet UX (L6)</td>
          <td style={{fontWeight: "700", color: "var(--green)"}}>82%</td>
        </tr>
        <tr>
          <td>Semester 4 — MiniCEO<br/><small style={{color: "var(--muted)"}}>Modules 13–16</small></td>
          <td><strong>L5 → L6</strong> — exclusively higher-order</td>
          <td>Board presentations, M&A models, crisis simulations, MiniCEO Summit thesis</td>
          <td>Formulate 3-yr DX roadmap for a real company (L6) · Evaluate M&A accretion/dilution (L5) · Create leadership thesis (L6)</td>
          <td style={{fontWeight: "700", color: "var(--green)"}}>94%</td>
        </tr>
        <tr style={{background: "var(--light)"}}>
          <td><strong>Programme Total</strong></td>
          <td><strong>Balanced L1–L6 progression</strong></td>
          <td>Mix of formative + summative + capstone</td>
          <td>Progressive complexity engineered across 2 years</td>
          <td style={{fontWeight: "800", color: "var(--purple)", fontSize: "16px"}}>68%</td>
        </tr>
      </tbody>
    </table>

    <div className="at-callout" style={{background: "#E8F5EE", border: "1px solid #A8D5BC", marginTop: "24px"}}>
      <div className="icon">✅</div>
      <div>
        <h5 style={{color: "var(--green)"}}>AICTE Compliance Note</h5>
        <p style={{color: "#1A4A2A"}}>AICTE OBE Guidelines §4 require that PG programmes maintain ≥60% of all assessment activities at Bloom's Level 4 (Analyse) or above. PGDFDB achieves <strong>68%</strong> — exceeding the threshold by 8 percentage points. This is evidenced through the lesson-level CO classifications stored in EcoPro LMS and reported in the annual CO-PO attainment report.</p>
      </div>
    </div>
  </div>

  
  <div className={assessPanelClass("po-tab")} id="po-tab">
    <h2 className="at-h2">Programme Outcomes (POs)</h2>
    <p className="at-lead">The 8 Programme Outcomes of PGDFDB  are derived directly from UGC NHEQF Level 7 Graduate Attributes. They define what every student will be able to demonstrate upon successful completion of the programme — not what they will have been taught.</p>

    <table className="at-table">
      <thead style={{background: "var(--navy)"}}>
        <tr>
          <th style={{color: "#fff", width: "60px"}}>PO</th>
          <th style={{color: "#fff", width: "220px"}}>Programme Outcome Title</th>
          <th style={{color: "#fff"}}>Full Statement — Demonstrated Capability</th>
          <th style={{color: "#fff", width: "140px"}}>NHEQF L7 Attribute</th>
          <th style={{color: "#fff", width: "100px"}}>Bloom's Target</th>
          <th style={{color: "#fff", width: "90px"}}>Assessed In</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style={{background: "#EBF4FF", color: "var(--blue)", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO1</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>BFSI Domain Competency</td>
          <td>Demonstrate comprehensive, integrated knowledge of the Indian BFSI ecosystem — banking, NBFC, insurance, capital markets, payments, FinTech, and regulation — and apply domain knowledge to analyse and resolve sector-specific business problems.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Disciplinary Knowledge &amp; Expertise</td>
          <td><span className="bloom-chip" style={{background: "var(--green)"}}>L4 Analyse</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M1–M4, M13, Capstones 1 &amp; 4</td>
        </tr>
        <tr>
          <td><span style={{background: "var(--light)", color: "var(--purple)", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO2</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Digital Technology Proficiency</td>
          <td>Apply industry-standard digital tools — Power BI, SQL, Python, no-code platforms (Bubble.io, Glide), Figma, and AI tools — to build functional BFSI solutions, dashboards, financial models, and API-integrated prototypes that solve real business problems.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Skill Development &amp; Application</td>
          <td><span className="bloom-chip" style={{background: "var(--blue)"}}>L3 Apply</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M2, M5–M8, Innovation Lab, all Capstones</td>
        </tr>
        <tr>
          <td><span style={{background: "#FFF8E1", color: "#8B6914", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO3</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Regulatory &amp; Compliance Intelligence</td>
          <td>Evaluate BFSI regulatory frameworks — RBI, SEBI, IRDAI, PFRDA, DPDPA, Basel III/IV, NSQF — and design compliance-aligned processes, reporting systems, and technology solutions that meet current and emerging regulatory requirements in India.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Critical Thinking &amp; Analysis</td>
          <td><span className="bloom-chip" style={{background: "var(--orange)"}}>L5 Evaluate</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M1.8, M2.7, M9 (all), M10.3, M11.2</td>
        </tr>
        <tr>
          <td><span style={{background: "#E8F5EE", color: "var(--green)", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO4</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Product &amp; Innovation Thinking</td>
          <td>Design digital BFSI products and services using structured product management methodologies — PPP model, PRD writing, Agile/Scrum delivery, SDLC and reverse SDLC — and build functional prototypes using Innovation Lab tools (no-code, Python, Figma).</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Problem Solving &amp; Innovation</td>
          <td><span className="bloom-chip" style={{background: "#C0392B"}}>L6 Create</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M3, M8, M11.8, M12, Capstones 2–4</td>
        </tr>
        <tr>
          <td><span style={{background: "#FDE8DC", color: "var(--orange)", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO5</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Data-Driven Decision Making</td>
          <td>Analyse BFSI datasets using Power BI, SQL, and Python to produce actionable insights, executive-ready MIS dashboards, credit risk models, ESG scorecards, and FP&amp;A projections that directly influence BFSI business strategy and operational decisions.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Analytical Reasoning &amp; Quantitative Skills</td>
          <td><span className="bloom-chip" style={{background: "var(--green)"}}>L4 Analyse</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M4.7, M8 (all), M11.5–11.7, M14.7</td>
        </tr>
        <tr>
          <td><span style={{background: "#FAE0E0", color: "#C0392B", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO6</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Professional Readiness &amp; Employability</td>
          <td>Demonstrate industry-level professional competencies — BFSI-optimised resume, mock interview performance (2 full rounds), GD/PI skills, LinkedIn personal branding, digital portfolio presentation — and successfully transition into a quality BFSI career placement within 6 months of programme completion.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Communication &amp; Career Development</td>
          <td><span className="bloom-chip" style={{background: "var(--blue)"}}>L3 Apply</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M12.8, Placement Sprint (M3, Month 14), M16</td>
        </tr>
        <tr>
          <td><span style={{background: "#EDE9F7", color: "var(--purple)", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO7</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Leadership &amp; Strategic Thinking</td>
          <td>Evaluate complex BFSI business situations from a senior leadership perspective — P&amp;L management, board communication, digital transformation roadmapping, M&amp;A decisions in financial services, and crisis management — applying the MiniCEO Program framework to produce executive-grade strategic deliverables.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Leadership, Management &amp; Governance</td>
          <td><span className="bloom-chip" style={{background: "var(--orange)"}}>L5 Evaluate</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M13 (all), M14.1, M12.4–12.6, Capstone 4</td>
        </tr>
        <tr>
          <td><span style={{background: "#E0F2F1", color: "var(--teal)", fontWeight: "800", padding: "4px 10px", borderRadius: "6px", fontSize: "12px"}}>PO8</span></td>
          <td style={{fontWeight: "700", color: "var(--navy)"}}>Global &amp; Ethical Awareness</td>
          <td>Assess BFSI career opportunities and regulatory environments across UAE (DIFC/CBUAE), UK (FCA), Singapore (MAS), Australia (APRA), and Canada (OSFI); demonstrate ethical decision-making in financial services, ESG sustainability responsibility, and DPDPA/data privacy compliance in all professional contexts.</td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>Global Citizenship &amp; Ethics</td>
          <td><span className="bloom-chip" style={{background: "var(--orange)"}}>L5 Evaluate</span></td>
          <td style={{fontSize: "12px", color: "var(--muted)"}}>M11.1–11.2, M15.8, M16.1–16.3, M10.3</td>
        </tr>
      </tbody>
    </table>

    <div className="at-callout" style={{background: "linear-gradient(135deg,var(--navy),#1A1048)", color: "var(--white)", marginTop: "32px"}}>
      <div className="icon">📌</div>
      <div>
        <h5 style={{color: "var(--gold)"}}>PO Verification &amp; Reporting</h5>
        <p style={{color: "rgba(255,255,255,.7)"}}>PO attainment is verified at the end of every Semester (4 times per programme) through a combined direct-indirect measurement process. Results are reported in the Upskillize Academic Quality Report, shared with partner colleges, and used to trigger curriculum adjustments where needed. All PO data is stored in EcoPro LMS and made available for NAAC/NBA/BFSI SSC audit purposes.</p>
      </div>
    </div>
  </div>

  
  <div className={assessPanelClass("co-tab")} id="co-tab">
    <h2 className="at-h2">CO-PO Mapping Matrix</h2>
    <p className="at-lead">Each lesson's Course Outcomes (COs) are mapped against all 8 Programme Outcomes on a 1–3 scale. This matrix is the primary evidence document for UGC OBE compliance, NAAC accreditation, and BFSI SSC validation. Below is the full CO-PO mapping for Module 1 and the programme-level average summary.</p>

    <div className="at-callout" style={{background: "var(--light)", border: "1px solid var(--border)"}}>
      <div className="icon">📐</div>
      <div>
        <h5>Mapping Scale</h5>
        <p><strong style={{color: "var(--orange)"}}>3 — High:</strong> Direct, strong contribution to PO &nbsp;&nbsp; <strong style={{color: "var(--purple)"}}>2 — Medium:</strong> Moderate contribution &nbsp;&nbsp; <strong style={{color: "var(--muted)"}}>1 — Low:</strong> Minor contribution &nbsp;&nbsp; <strong style={{color: "#ddd"}}>— None</strong></p>
      </div>
    </div>

    <h3 className="at-h3">Module 1 — BFSI Domain Foundations (Full CO-PO Matrix)</h3>
    <div style={{overflowX: "auto"}}>
    <table className="co-table">
      <thead>
        <tr>
          <th style={{textAlign: "left"}}>Lesson / Course Outcome</th>
          <th>PO1<br/>Domain</th><th>PO2<br/>Digital</th><th>PO3<br/>Regulatory</th>
          <th>PO4<br/>Product</th><th>PO5<br/>Data</th><th>PO6<br/>Employ.</th>
          <th>PO7<br/>Leader</th><th>PO8<br/>Global</th>
          <th style={{background: "#8B6914"}}>Bloom's</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1.1 — Structure of BFSI: Map all sub-sectors and regulatory bodies</td><td className="co-H">3</td><td className="co-L">1</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-N">—</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-M">2</td><td>L2</td></tr>
        <tr><td>1.2 — Banking Ops: Explain bank P&amp;L, NIM, and treasury functions</td><td className="co-H">3</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-L">1</td><td>L3</td></tr>
        <tr><td>1.3 — Credit: Define credit, identify products, map 8-stage life cycle</td><td className="co-H">3</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-L">1</td><td>L3</td></tr>
        <tr><td>1.4 — Insurance: Classify products, explain IRDAI, map distribution channels</td><td className="co-H">3</td><td className="co-L">1</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-N">—</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-M">2</td><td>L2</td></tr>
        <tr><td>1.5 — Capital Markets: Compare equity, debt, MF, PMS — apply SEBI framework</td><td className="co-H">3</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td>L3</td></tr>
        <tr><td>1.6 — BFSI Business Models: Analyse revenue, cost, NIM vs yield vs premium</td><td className="co-H">3</td><td className="co-L">1</td><td className="co-L">1</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-H">3</td><td className="co-M">2</td><td>L4</td></tr>
        <tr><td>1.7 — Digital Financial Stack: Apply UPI, AA, OCEN knowledge via API demo</td><td className="co-M">2</td><td className="co-H">3</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-M">2</td><td>L3</td></tr>
        <tr><td>1.8 — Regulatory Landscape: Analyse RBI/SEBI/IRDAI powers and recent circulars</td><td className="co-M">2</td><td className="co-L">1</td><td className="co-H">3</td><td className="co-L">1</td><td className="co-L">1</td><td className="co-M">2</td><td className="co-M">2</td><td className="co-M">2</td><td>L4</td></tr>
        <tr><td className="co-avg" colSpan="1">Module 1 Average</td>
          <td className="co-avg">2.63</td><td className="co-avg">1.63</td><td className="co-avg">2.00</td>
          <td className="co-avg">1.38</td><td className="co-avg">1.38</td><td className="co-avg">2.00</td>
          <td className="co-avg">1.63</td><td className="co-avg">1.75</td><td className="co-avg">L2–L4</td>
        </tr>
        <tr>
          <td style={{fontWeight: "700", color: "var(--green)"}}>Target (≥ 2.0)</td>
          <td className="co-pass">✓</td><td className="co-warn">1.63*</td><td className="co-pass">✓</td>
          <td className="co-warn">1.38*</td><td className="co-warn">1.38*</td><td className="co-pass">✓</td>
          <td className="co-warn">1.63*</td><td className="co-pass">✓</td>
          <td style={{fontSize: "11px", color: "var(--muted)"}}>*PO2,4,5,7 grow in Parts 2–4</td>
        </tr>
      </tbody>
    </table>
    </div>

    <div className="at-callout" style={{background: "#FFF8E1", border: "1px solid #E8D095", margin: "24px 0"}}>
      <div className="icon">💡</div>
      <div>
        <h5 style={{color: "#8B6914"}}>Why PO2, PO4, PO5, PO7 are Low in Module 1 — By Design</h5>
        <p style={{color: "#5C3D00"}}>Module 1 is a foundational domain module — it is intentionally weighted toward PO1 (Domain Competency) and PO3 (Regulatory Intelligence). Digital tech (PO2), product thinking (PO4), data skills (PO5), and leadership (PO7) are developed progressively in Parts 2–4 where the curriculum shifts to applied and evaluative activities. This is consistent with the progressive Bloom's ladder design and the UGC CCFPGP principle of building complexity over the programme duration.</p>
      </div>
    </div>

    <h3 className="at-h3">Programme-Level PO Attainment Summary — All 16 Modules</h3>
    <div style={{overflowX: "auto"}}>
    <table className="co-table">
      <thead>
        <tr>
          <th style={{textAlign: "left", width: "190px"}}>Module</th>
          <th>PO1</th><th>PO2</th><th>PO3</th><th>PO4</th><th>PO5</th><th>PO6</th><th>PO7</th><th>PO8</th><th style={{background: "#8B6914"}}>Primary L</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>M1 BFSI Foundations</td><td className="co-H">2.63</td><td className="co-L">1.63</td><td className="co-M">2.00</td><td className="co-L">1.38</td><td className="co-L">1.38</td><td className="co-M">2.00</td><td className="co-L">1.63</td><td className="co-L">1.75</td><td>L2–L4</td></tr>
        <tr><td>M2 Digital Transformation</td><td className="co-M">2.20</td><td className="co-H">2.75</td><td className="co-M">2.13</td><td className="co-M">2.00</td><td className="co-M">2.00</td><td className="co-M">2.13</td><td className="co-L">1.50</td><td className="co-L">1.75</td><td>L3–L4</td></tr>
        <tr><td>M3 FinTech &amp; InsurTech</td><td className="co-H">2.75</td><td className="co-M">2.25</td><td className="co-L">1.75</td><td className="co-H">2.63</td><td className="co-L">1.38</td><td className="co-M">2.25</td><td className="co-M">2.00</td><td className="co-M">2.25</td><td>L3–L5</td></tr>
        <tr><td>M4 Credit &amp; Loan Origination</td><td className="co-H">2.75</td><td className="co-M">2.25</td><td className="co-M">2.25</td><td className="co-M">2.13</td><td className="co-H">2.63</td><td className="co-M">2.25</td><td className="co-L">1.38</td><td className="co-L">1.25</td><td>L3–L4</td></tr>
        <tr><td>M5 Payments Technology</td><td className="co-M">2.38</td><td className="co-H">2.75</td><td className="co-M">2.00</td><td className="co-M">2.25</td><td className="co-L">1.75</td><td className="co-M">2.00</td><td className="co-L">1.25</td><td className="co-L">1.88</td><td>L3–L5</td></tr>
        <tr><td>M6 WealthTech &amp; Investment</td><td className="co-H">2.63</td><td className="co-M">2.38</td><td className="co-M">2.25</td><td className="co-M">2.38</td><td className="co-M">2.25</td><td className="co-M">2.13</td><td className="co-L">1.75</td><td className="co-M">2.25</td><td>L4–L5</td></tr>
        <tr><td>M7 Supply Chain Finance</td><td className="co-H">2.50</td><td className="co-M">2.00</td><td className="co-L">1.75</td><td className="co-M">2.25</td><td className="co-M">2.00</td><td className="co-L">1.88</td><td className="co-L">1.63</td><td className="co-L">1.63</td><td>L3–L4</td></tr>
        <tr><td>M8 Data to Decisions + Agile</td><td className="co-L">1.75</td><td className="co-H">2.88</td><td className="co-L">1.63</td><td className="co-M">2.25</td><td className="co-H">3.00</td><td className="co-M">2.25</td><td className="co-L">1.50</td><td className="co-L">1.25</td><td>L3–L5</td></tr>
        <tr><td>M9 RegTech &amp; Compliance</td><td className="co-M">2.13</td><td className="co-M">2.38</td><td className="co-H">3.00</td><td className="co-M">2.00</td><td className="co-M">2.25</td><td className="co-M">2.13</td><td className="co-L">1.75</td><td className="co-L">1.88</td><td>L4–L5</td></tr>
        <tr><td>M10 DeFi &amp; Blockchain</td><td className="co-M">2.00</td><td className="co-M">2.25</td><td className="co-M">2.38</td><td className="co-M">2.13</td><td className="co-L">1.63</td><td className="co-L">1.63</td><td className="co-L">1.63</td><td className="co-H">2.63</td><td>L4–L5</td></tr>
        <tr><td>M11 ESG &amp; Finance Trans.</td><td className="co-M">2.25</td><td className="co-M">2.25</td><td className="co-H">2.50</td><td className="co-M">2.00</td><td className="co-H">2.75</td><td className="co-L">1.75</td><td className="co-M">2.25</td><td className="co-M">2.38</td><td>L4–L5</td></tr>
        <tr><td>M12 Innovation Lab &amp; Pitch</td><td className="co-L">1.63</td><td className="co-H">2.75</td><td className="co-L">1.50</td><td className="co-H">3.00</td><td className="co-M">2.13</td><td className="co-M">2.38</td><td className="co-M">2.25</td><td className="co-L">1.88</td><td>L5–L6</td></tr>
        <tr><td>M13 MiniCEO Program</td><td className="co-M">2.00</td><td className="co-L">1.63</td><td className="co-L">1.75</td><td className="co-M">2.38</td><td className="co-M">2.00</td><td className="co-H">2.50</td><td className="co-H">3.00</td><td className="co-M">2.25</td><td>L5–L6</td></tr>
        <tr><td>M14 Finance Transformation</td><td className="co-M">2.25</td><td className="co-M">2.25</td><td className="co-M">2.13</td><td className="co-L">1.63</td><td className="co-H">2.75</td><td className="co-M">2.00</td><td className="co-M">2.38</td><td className="co-L">1.63</td><td>L4–L6</td></tr>
        <tr><td>M15 RM, Cards &amp; InsurTech</td><td className="co-H">2.75</td><td className="co-M">2.25</td><td className="co-M">2.00</td><td className="co-M">2.25</td><td className="co-L">1.75</td><td className="co-M">2.38</td><td className="co-M">2.00</td><td className="co-M">2.13</td><td>L4–L5</td></tr>
        <tr><td>M16 Global Pathways</td><td className="co-L">1.88</td><td className="co-L">1.50</td><td className="co-L">1.63</td><td className="co-L">1.38</td><td className="co-L">1.25</td><td className="co-H">3.00</td><td className="co-H">2.50</td><td className="co-H">3.00</td><td>L3–L5</td></tr>
        <tr style={{background: "var(--navy)"}}>
          <td style={{color: "var(--white)", fontWeight: "700"}}>Programme Average</td>
          <td style={{color: "var(--gold)", fontWeight: "800"}}>2.33</td><td style={{color: "var(--gold)", fontWeight: "800"}}>2.24</td>
          <td style={{color: "var(--gold)", fontWeight: "800"}}>2.04</td><td style={{color: "var(--gold)", fontWeight: "800"}}>2.13</td>
          <td style={{color: "var(--gold)", fontWeight: "800"}}>2.06</td><td style={{color: "var(--gold)", fontWeight: "800"}}>2.17</td>
          <td style={{color: "var(--gold)", fontWeight: "800"}}>1.90</td><td style={{color: "var(--gold)", fontWeight: "800"}}>2.03</td>
          <td style={{color: "var(--white)", fontWeight: "700"}}>L3–L6</td>
        </tr>
        <tr style={{background: "var(--light)"}}>
          <td style={{fontWeight: "700"}}>Target ≥ 2.0</td>
          <td className="co-pass">✓</td><td className="co-pass">✓</td><td className="co-pass">✓</td>
          <td className="co-pass">✓</td><td className="co-pass">✓</td><td className="co-pass">✓</td>
          <td className="co-warn">1.90*</td><td className="co-pass">✓</td>
          <td style={{fontSize: "11px", color: "var(--muted)"}}>*PO7 &lt;2.0 until M13</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>

  
  <div className={assessPanelClass("assess-tab")} id="assess-tab">
    <h2 className="at-h2">Assessment Framework</h2>
    <p className="at-lead">PGDFDB uses a multi-modal assessment system consistent with UGC CCFPGP 2023 §7 and AICTE OBE Guidelines §5. Assessments span the full Bloom's taxonomy, use both direct and indirect measurement, and accumulate toward a final CGPA reported on the programme transcript.</p>

    <h3 className="at-h3">Assessment Components — Weightage & Description</h3>
    <table className="at-table">
      <thead style={{background: "var(--purple)"}}>
        <tr>
          <th style={{color: "#fff", width: "200px"}}>Assessment Type</th>
          <th style={{color: "#fff"}}>Description</th>
          <th style={{color: "#fff", width: "80px"}}>Frequency</th>
          <th style={{color: "#fff", width: "100px"}}>Weightage</th>
          <th style={{color: "#fff", width: "100px"}}>Platform</th>
          <th style={{color: "#fff", width: "80px"}}>Bloom's L</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Weekly Self-Tests (Formative)</td>
          <td>10-question MCQ tests auto-generated from the week's learning outcomes. Immediate feedback with explanation. Students can reattempt once. Tracks CO attainment at topic level.</td>
          <td>Weekly (48×)</td>
          <td style={{fontWeight: "700", color: "var(--blue)"}}>5%</td>
          <td>EcoPro LMS (auto-graded)</td>
          <td>L1–L3</td>
        </tr>
        <tr>
          <td>Saturday Case Study Submission</td>
          <td>Structured case analysis submitted post-Saturday classroom. Template: background, problem statement, analysis, recommendations, 3 discussion questions. Peer-reviewed by 2 classmates + trainer feedback.</td>
          <td>Weekly (48×)</td>
          <td style={{fontWeight: "700", color: "var(--blue)"}}>10%</td>
          <td>EcoPro LMS (peer + trainer)</td>
          <td>L3–L5</td>
        </tr>
        <tr>
          <td>Innovation Lab Deliverables</td>
          <td>Structured lab outputs (dashboards, models, app prototypes, API tests, code notebooks, pitch decks) built during Saturday Innovation Lab sessions. Evaluated by mentor against a rubric for functionality, BFSI accuracy, and presentation quality.</td>
          <td>Each module (16×)</td>
          <td style={{fontWeight: "700", color: "var(--purple)"}}>15%</td>
          <td>EcoPro LMS (mentor graded)</td>
          <td>L3–L6</td>
        </tr>
        <tr>
          <td>Module Assignments</td>
          <td>End-of-module assignment (one per module, 16 total). Problem-solving oriented — never recall-only. Includes regulatory case analysis, financial modelling tasks, or product design exercises. Submitted within 1 week of module completion.</td>
          <td>Per module (16×)</td>
          <td style={{fontWeight: "700", color: "var(--purple)"}}>15%</td>
          <td>EcoPro LMS (mentor graded)</td>
          <td>L4–L5</td>
        </tr>
        <tr>
          <td>Mid-Semester Mock Tests (Proctored)</td>
          <td>60-minute proctored online test at the midpoint of each Semester. 40 questions: 50% MCQ (L1–L3) + 50% scenario-based (L4–L5). AI-proctored via EcoPro LMS. One re-attempt allowed within 7 days.</td>
          <td>Per Semester (4×)</td>
          <td style={{fontWeight: "700", color: "var(--teal)"}}>10%</td>
          <td>EcoPro LMS (AI proctored)</td>
          <td>L2–L5</td>
        </tr>
        <tr>
          <td>Capstone Projects (Major)</td>
          <td>One capstone per Semester (4 total). Individual or team deliverable presented to an external industry jury. Evaluated on domain accuracy, digital solution design, prototype quality, financial impact analysis, and communication clarity. Full rubric — see Scoring tab.</td>
          <td>Per Semester (4×)</td>
          <td style={{fontWeight: "700", color: "var(--orange)"}}>35%</td>
          <td>Live presentation + LMS submission</td>
          <td>L4–L6</td>
        </tr>
        <tr>
          <td>Mock Interviews (Placement)</td>
          <td>2 structured mock interviews per student (Semester 3, Month 14). Round 1: mentor + peer panel (role-specific BFSI questions). Round 2: different evaluator testing improvement. 10-criteria rubric. Feedback report within 48 hrs. Semester of professional readiness evidence (PO6).</td>
          <td>2 per student</td>
          <td style={{fontWeight: "700", color: "var(--green)"}}>5%</td>
          <td>Mentor panel + EcoPro LMS report</td>
          <td>L3–L5</td>
        </tr>
        <tr>
          <td>Final Portfolio &amp; LinkedIn Audit</td>
          <td>Student publishes complete project portfolio to EcoPro LMS and LinkedIn. Mentor audits: capstone documents, lab builds, innovation lab prototypes, GitHub repo, LinkedIn profile completeness. Semester of final CGPA indirect indicator.</td>
          <td>Once (end of Semester 3)</td>
          <td style={{fontWeight: "700", color: "var(--green)"}}>5%</td>
          <td>LinkedIn + GitHub + LMS</td>
          <td>L3</td>
        </tr>
        <tr style={{background: "var(--navy)"}}>
          <td colSpan="3" style={{color: "var(--white)", fontWeight: "700"}}>Total Weightage</td>
          <td style={{color: "var(--gold)", fontWeight: "800", fontSize: "18px"}}>100%</td>
          <td colSpan="2" style={{color: "rgba(255,255,255,.5)", fontSize: "12px"}}>All stored in EcoPro LMS. Transcript generated per Semester.</td>
        </tr>
      </tbody>
    </table>

    <h3 className="at-h3">Capstone Assessment Rubric — Detailed Criteria</h3>
    <p className="at-p">All four Capstone Projects are evaluated using a standardised 5-criterion rubric scored on a 4-point scale (1=Needs Improvement, 2=Satisfactory, 3=Good, 4=Excellent). The rubric is provided to students at the start of each Semester and is applied consistently by all external jury members.</p>

    <div style={{overflowX: "auto"}}>
    <table className="rub-matrix">
      <thead>
        <tr>
          <th style={{background: "var(--navy)", color: "#fff", textAlign: "left"}}>Criterion (20% each)</th>
          <th style={{background: "#1A5C3A", color: "#fff"}}>4 — Excellent</th>
          <th style={{background: "#1A3A6B", color: "#fff"}}>3 — Good</th>
          <th style={{background: "#7A5800", color: "#fff"}}>2 — Satisfactory</th>
          <th style={{background: "#7A1A1A", color: "#fff"}}>1 — Needs Improvement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BFSI Domain Accuracy</td>
          <td className="rub-ex">Expert-level BFSI knowledge demonstrated throughout; all facts, regulations, and data references are accurate; no errors in domain content</td>
          <td className="rub-gd">Accurate with 1–2 minor gaps or errors; domain competency is clearly evident and appropriate for PG level</td>
          <td className="rub-sa">Mostly accurate but lacks depth in 2–3 areas; some over-simplification; basic domain knowledge demonstrated</td>
          <td className="rub-ni">Significant factual errors or domain gaps; evidence of limited BFSI understanding; requires substantial rework</td>
        </tr>
        <tr>
          <td>Problem Framing &amp; Market Context</td>
          <td className="rub-ex">Problem precisely defined with quantified market size, regulatory context, and stakeholder impact; data-backed throughout; compelling case established</td>
          <td className="rub-gd">Well-defined problem with supporting data; regulatory context covered; minor gaps in market sizing or stakeholder analysis</td>
          <td className="rub-sa">Problem stated but not quantified; limited regulatory context; market relevance established but not supported by data</td>
          <td className="rub-ni">Problem statement is vague or generic; no quantitative support; relevance to BFSI not clearly established</td>
        </tr>
        <tr>
          <td>Digital Solution Design</td>
          <td className="rub-ex">Innovative, technically feasible, regulatory-compliant digital solution with clear technology stack, implementation timeline, and governance model</td>
          <td className="rub-gd">Feasible and regulation-aware solution; technology stack identified; implementation plan present with minor gaps</td>
          <td className="rub-sa">Solution is feasible but lacks regulatory consideration or implementation specificity; technology choices not fully justified</td>
          <td className="rub-ni">Solution is not technically feasible, regulatory non-compliant, or insufficiently defined; not convincing as a real product</td>
        </tr>
        <tr>
          <td>Innovation Lab Prototype / Deliverable</td>
          <td className="rub-ex">Fully functional prototype demonstrated live — Power BI dashboard, no-code app, financial model, or API integration — linked to portfolio, runs without errors</td>
          <td className="rub-gd">Working prototype with minor issues; all core functionality demonstrated; portfolio link present; minor UX or data gaps</td>
          <td className="rub-sa">Basic prototype or wireframe only; limited functionality; demonstrates concept but not a working product</td>
          <td className="rub-ni">No prototype built; only conceptual description provided; Innovation Lab component is absent from submission</td>
        </tr>
        <tr>
          <td>Communication &amp; Presentation</td>
          <td className="rub-ex">Executive-level delivery; confident Q&amp;A with investor/industry jury; boardroom-ready slides; compelling narrative arc; within time limit; handles pressure questions with poise</td>
          <td className="rub-gd">Clear, structured presentation; competent Q&amp;A handling; professional slides; minor delivery issues; within time with brief overrun</td>
          <td className="rub-sa">Adequate delivery; some nervousness affecting clarity; slides functional but not polished; Q&amp;A partially handled</td>
          <td className="rub-ni">Unclear delivery; significant nervousness; slides poorly designed; unable to handle basic jury questions; significantly over/under time</td>
        </tr>
      </tbody>
    </table>
    </div>

    <div className="formula-box" style={{marginTop: "28px"}}>
      <h4>Capstone Score Calculation</h4>
      <div className="formula">Capstone Score (%) = <span>[(C1 + C2 + C3 + C4 + C5) / 20] × 100</span></div>
      <div className="formula">Where C1–C5 = Criterion scores (1–4 each). Maximum = 20. Weighted at <span>35% of total CGPA.</span></div>
      <div className="formula-note">Each criterion is scored independently by each jury member. Final score = average across all jury members. Variance &gt;1 point between jury members triggers a moderation discussion.</div>
    </div>
  </div>

  
  <div className={assessPanelClass("scoring-tab")} id="scoring-tab">
    <h2 className="at-h2">Student Scoring, Grading & Transcript</h2>
    <p className="at-lead">PGDFDB adopts the UGC 10-point grading scale as mandated by UGC CCFPGP 2023 §9 and UGC (Examination Reforms) Regulations 2022. SGPA is computed at the end of each Semester; CGPA is computed at programme completion. All records are stored in EcoPro LMS and linked to the student's ABC DigiLocker account.</p>

    <h3 className="at-h3">UGC 10-Point Grading Scale</h3>
    <div className="score-grid">
      <div className="sc-card" style={{background: "linear-gradient(135deg,#FFF8E1,#FFF0C0)", borderColor: "#E8D095"}}>
        <div className="sc-grade" style={{color: "#8B6914"}}>O</div>
        <div className="sc-name" style={{color: "#8B6914"}}>Outstanding</div>
        <div className="sc-range" style={{color: "#5C3D00"}}>90% – 100%</div>
        <div className="sc-gp" style={{color: "#8B6914"}}>10 GP</div>
        <div className="sc-desc">Demonstrated mastery of all Course Outcomes. Exceptional capstone quality. BFSI Fellows nominee.</div>
      </div>
      <div className="sc-card" style={{background: "linear-gradient(135deg,#EBF4FF,#D6E8F5)", borderColor: "#B0CCE8"}}>
        <div className="sc-grade" style={{color: "var(--blue)"}}>A+</div>
        <div className="sc-name" style={{color: "var(--blue)"}}>Excellent</div>
        <div className="sc-range" style={{color: "var(--navy)"}}>80% – 89%</div>
        <div className="sc-gp" style={{color: "var(--blue)"}}>9 GP</div>
        <div className="sc-desc">Strong CO attainment across all Parts. Distinction-level capstone performance. High employability signal.</div>
      </div>
      <div className="sc-card" style={{background: "linear-gradient(135deg,var(--light),#EDE9F7)", borderColor: "#C8C0E0"}}>
        <div className="sc-grade" style={{color: "var(--purple)"}}>A</div>
        <div className="sc-name" style={{color: "var(--purple)"}}>Very Good</div>
        <div className="sc-range" style={{color: "var(--purple-d,#3D3060)"}}>70% – 79%</div>
        <div className="sc-gp" style={{color: "var(--purple)"}}>8 GP</div>
        <div className="sc-desc">Above-average CO attainment. Good capstone quality. Strong placement readiness demonstrated.</div>
      </div>
      <div className="sc-card" style={{background: "linear-gradient(135deg,#E8F5EE,#D4EEE0)", borderColor: "#A8D5BC"}}>
        <div className="sc-grade" style={{color: "var(--green)"}}>B+</div>
        <div className="sc-name" style={{color: "var(--green)"}}>Good</div>
        <div className="sc-range" style={{color: "#1A4A2A"}}>60% – 69%</div>
        <div className="sc-gp" style={{color: "var(--green)"}}>7 GP</div>
        <div className="sc-desc">Satisfactory CO attainment. Competent capstone performance. Meets minimum PO attainment target.</div>
      </div>
      <div className="sc-card" style={{background: "var(--light)", borderColor: "var(--border)"}}>
        <div className="sc-grade" style={{color: "var(--muted)"}}>B</div>
        <div className="sc-name" style={{color: "var(--muted)"}}>Above Average</div>
        <div className="sc-range" style={{color: "var(--dark)"}}>55% – 59%</div>
        <div className="sc-gp" style={{color: "var(--muted)"}}>6 GP</div>
        <div className="sc-desc">Adequate CO attainment. Improvement recommended in 2–3 COs. Placement support activated.</div>
      </div>
      <div className="sc-card" style={{background: "var(--light)", borderColor: "var(--border)"}}>
        <div className="sc-grade" style={{color: "var(--muted)"}}>C</div>
        <div className="sc-name" style={{color: "var(--muted)"}}>Average</div>
        <div className="sc-range" style={{color: "var(--dark)"}}>50% – 54%</div>
        <div className="sc-gp" style={{color: "var(--muted)"}}>5 GP</div>
        <div className="sc-desc">Minimum pass. Significant CO gaps. Mandatory re-learning plan with mentor. PPO prospects limited.</div>
      </div>
      <div className="sc-card" style={{background: "#FDE8DC", borderColor: "#F0B090"}}>
        <div className="sc-grade" style={{color: "var(--orange)"}}>D</div>
        <div className="sc-name" style={{color: "var(--orange)"}}>Pass</div>
        <div className="sc-range" style={{color: "#8B3A00"}}>40% – 49%</div>
        <div className="sc-gp" style={{color: "var(--orange)"}}>4 GP</div>
        <div className="sc-desc">Below programme standard. Eligible for re-assessment. Intensive mentor support activated.</div>
      </div>
      <div className="sc-card" style={{background: "#FAE0E0", borderColor: "#F0A8A8"}}>
        <div className="sc-grade" style={{color: "#C0392B"}}>F</div>
        <div className="sc-name" style={{color: "#C0392B"}}>Fail</div>
        <div className="sc-range" style={{color: "#8B0000"}}>Below 40%</div>
        <div className="sc-gp" style={{color: "#C0392B"}}>0 GP</div>
        <div className="sc-desc">Re-assessment required. Max 1 re-attempt per Semester. Credits NOT banked until passing grade achieved.</div>
      </div>
    </div>

    <h3 className="at-h3">SGPA & CGPA Calculation</h3>
    <div className="formula-box">
      <h4>SGPA Formula (Per Semester)</h4>
      <div className="formula">SGPA = <span>Σ (Credit × Grade Point) / Σ Credits</span> &nbsp;&nbsp; [for all courses in that Semester]</div>
      <div className="formula-note">Each module = 11–12 credits. Capstone = 8 credits. Buffer/mentoring = 2–3 credits. Total per Semester ≈ 12 credits.</div>
      <h4 style={{marginTop: "20px"}}>CGPA Formula (Programme Total)</h4>
      <div className="formula">CGPA = <span>Σ (SGPA × Credits in Semester) / Σ Total Credits</span> &nbsp;&nbsp; [across all 4 Parts]</div>
      <div className="formula-note">Total credits = 50. CGPA rounded to 2 decimal places. Grade card issued per Semester. Consolidated transcript at programme end.</div>
      <h4 style={{marginTop: "20px"}}>Credit Points (For Honours Classification)</h4>
      <div className="formula">Credit Points = <span>Credits × Grade Point × NCrF Level (Level 7)</span></div>
      <div className="formula-note">PGDFDB = Level 7. Credit Points earned = Credits × GP × 7. Stored in ABC DigiLocker. Used for RPL and lateral entry to Master's programmes.</div>
    </div>

    <h3 className="at-h3">Honours Classification & Special Recognition</h3>
    <table className="at-table">
      <thead style={{background: "var(--navy)"}}>
        <tr>
          <th style={{color: "#fff"}}>Classification</th>
          <th style={{color: "#fff"}}>CGPA Threshold</th>
          <th style={{color: "#fff"}}>Additional Criteria</th>
          <th style={{color: "#fff"}}>Recognition & Benefits</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{color: "#8B6914"}}>🏆 Distinction — BFSI Fellows</td>
          <td>CGPA ≥ 9.0 (O grade)</td>
          <td>Top 10% of batch + capstone score ≥ 85% + placement within 3 months</td>
          <td>Upskillize BFSI Fellows recognition; featured on website; nominated for national FinTech awards; priority alumni referrals</td>
        </tr>
        <tr>
          <td style={{color: "var(--blue)"}}>🥇 First Class with Distinction</td>
          <td>CGPA ≥ 8.0 (A+ grade)</td>
          <td>No Semester SGPA below 7.5 + portfolio published</td>
          <td>Innovation Award nomination; industry mentor referral letter; priority placement partner access</td>
        </tr>
        <tr>
          <td style={{color: "var(--purple)"}}>🥈 First Class</td>
          <td>CGPA ≥ 7.0 (A grade)</td>
          <td>Passed all 4 Parts in first attempt + all COs attained</td>
          <td>Standard PGDFDB certificate; LinkedIn badge; Alumni network access</td>
        </tr>
        <tr>
          <td style={{color: "var(--green)"}}>🥉 Second Class</td>
          <td>CGPA ≥ 5.5 (C grade)</td>
          <td>Passed all 4 Parts; may include 1 re-assessment</td>
          <td>PGDFDB certificate; Alumni network access; extended placement support</td>
        </tr>
        <tr>
          <td style={{color: "var(--orange)"}}>Pass</td>
          <td>CGPA ≥ 4.0 (D grade)</td>
          <td>All Parts passed (may include re-assessments)</td>
          <td>PGDFDB certificate awarded; 12-month extended placement support; no Honours classification</td>
        </tr>
      </tbody>
    </table>

    <h3 className="at-h3">Transcript Structure (UGC Format)</h3>
    <div className="at-callout" style={{background: "var(--light)", border: "1px solid var(--border)"}}>
      <div className="icon">📄</div>
      <div>
        <h5>Per-Semester Grade Card includes:</h5>
        <p>Student name &amp; ID · Part number &amp; duration · All modules with credit, marks, grade, grade point · Semester SGPA · Cumulative CGPA to date · CO attainment summary · Innovation Lab portfolio link · NCrF Level 7 declaration · Upskillize Authorised Signatory + Partner College Countersignature · ABC DigiLocker credit entry reference number. <br/><br/>
        <strong>Final Consolidated Transcript</strong> additionally includes: All 4 Semester SGPAs · Final CGPA · Honours classification · Capstone titles and jury scores · Placement outcome (role, organisation, CTC) · Certificate serial number · BFSI SSC QP code (post-validation) · QR code for instant digital verification.</p>
      </div>
    </div>
  </div>

  
  <div className={assessPanelClass("attain-tab")} id="attain-tab">
    <h2 className="at-h2">Attainment Measurement & Continuous Improvement</h2>
    <p className="at-lead">The closed-loop quality improvement cycle is mandated by AICTE OBE Guidelines §8 and is a key criterion for NAAC accreditation. PGDFDB runs this cycle 4 times per programme — once at the end of every Semester — ensuring the curriculum is continuously refined based on evidence.</p>

    <h3 className="at-h3">Attainment Targets — Programme Level</h3>
    <div className="attain-grid">
      <div className="attain-card" style={{background: "linear-gradient(135deg,#EBF4FF,#F0F8FF)", borderColor: "#C3D9F5"}}>
        <div className="attain-num" style={{color: "var(--blue)"}}>75%</div>
        <div className="attain-label" style={{color: "var(--blue)"}}>CO Attainment Target</div>
        <div className="progress-bar"><div className="progress-fill" style={{width: "75%", background: "var(--blue)"}}></div></div>
        <div className="attain-desc">Minimum 75% of students must achieve ≥60% in each Course Outcome. Measured at end of every Semester through direct assessment data.</div>
      </div>
      <div className="attain-card" style={{background: "linear-gradient(135deg,var(--light),#EDE9F7)", borderColor: "#C8C0E0"}}>
        <div className="attain-num" style={{color: "var(--purple)"}}>2.0</div>
        <div className="attain-label" style={{color: "var(--purple)"}}>PO Average Target (÷3)</div>
        <div className="progress-bar"><div className="progress-fill" style={{width: "67%", background: "var(--purple)"}}></div></div>
        <div className="attain-desc">Programme average CO-PO score must be ≥2.0 out of 3.0 for all 8 Programme Outcomes. Current programme average: 2.13.</div>
      </div>
      <div className="attain-card" style={{background: "linear-gradient(135deg,#E8F5EE,#D4EEE0)", borderColor: "#A8D5BC"}}>
        <div className="attain-num" style={{color: "var(--green)"}}>85%</div>
        <div className="attain-label" style={{color: "var(--green)"}}>Placement Rate Target</div>
        <div className="progress-bar"><div className="progress-fill" style={{width: "85%", background: "var(--green)"}}></div></div>
        <div className="attain-desc">85% of eligible students placed in BFSI roles within 6 months of programme completion. Tracked through placement coordinator records.</div>
      </div>
      <div className="attain-card" style={{background: "linear-gradient(135deg,#FFF8E1,#FFF0C0)", borderColor: "#E8D095"}}>
        <div className="attain-num" style={{color: "#8B6914"}}>30%</div>
        <div className="attain-label" style={{color: "#8B6914"}}>Distinction Rate Target</div>
        <div className="progress-bar"><div className="progress-fill" style={{width: "30%", background: "var(--gold)"}}></div></div>
        <div className="attain-desc">Target: 30% of students achieving CGPA ≥8.0 (First Class with Distinction). Drives quality culture without grade inflation.</div>
      </div>
    </div>

    <h3 className="at-h3">Direct vs Indirect Assessment Indicators</h3>
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px"}}>
      <div style={{background: "var(--light)", borderRadius: "14px", padding: "28px", border: "1px solid var(--border)"}}>
        <div style={{fontSize: "12px", fontWeight: "800", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--purple)", marginBottom: "16px"}}>📊 Direct Indicators (70% weight)</div>
        <p style={{fontSize: "13px", color: "var(--muted)", marginBottom: "12px"}}>Evidence that students have achieved Course Outcomes — gathered directly from assessments designed to test those outcomes.</p>
        <table style={{width: "100%", fontSize: "12px"}}>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Weekly self-tests</td><td style={{textAlign: "right", color: "var(--purple)"}}>Average ≥60%</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Case study submissions</td><td style={{textAlign: "right", color: "var(--purple)"}}>≥75% submission rate</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Innovation Lab deliverables</td><td style={{textAlign: "right", color: "var(--purple)"}}>Rubric avg ≥60%</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Module assignments</td><td style={{textAlign: "right", color: "var(--purple)"}}>Average ≥60%</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Mid-Semester mock tests</td><td style={{textAlign: "right", color: "var(--purple)"}}>Average ≥60%</td></tr>
          <tr><td style={{padding: "8px 0", fontWeight: "600"}}>Capstone jury scores</td><td style={{textAlign: "right", color: "var(--purple)"}}>Rubric avg ≥3.0/4</td></tr>
        </table>
      </div>
      <div style={{background: "var(--light)", borderRadius: "14px", padding: "28px", border: "1px solid var(--border)"}}>
        <div style={{fontSize: "12px", fontWeight: "800", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "16px"}}>🔍 Indirect Indicators (30% weight)</div>
        <p style={{fontSize: "13px", color: "var(--muted)", marginBottom: "12px"}}>Evidence gathered through perceptions, feedback, and outcomes — supplementing direct measurement with real-world validation.</p>
        <table style={{width: "100%", fontSize: "12px"}}>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Student satisfaction survey</td><td style={{textAlign: "right", color: "var(--teal)"}}>End of each Semester</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Employer feedback form</td><td style={{textAlign: "right", color: "var(--teal)"}}>3 months post-placement</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Placement rate tracking</td><td style={{textAlign: "right", color: "var(--teal)"}}>Monthly</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Alumni career survey</td><td style={{textAlign: "right", color: "var(--teal)"}}>1 yr &amp; 2 yr post</td></tr>
          <tr style={{borderBottom: "1px solid var(--border)"}}><td style={{padding: "8px 0", fontWeight: "600"}}>Industry mentor assessment</td><td style={{textAlign: "right", color: "var(--teal)"}}>Per capstone jury</td></tr>
          <tr><td style={{padding: "8px 0", fontWeight: "600"}}>Innovation Award jury feedback</td><td style={{textAlign: "right", color: "var(--teal)"}}>Semester Ideathon</td></tr>
        </table>
      </div>
    </div>

    <h3 className="at-h3">Continuous Improvement Cycle (AICTE OBE Mandated)</h3>
    <table className="at-table">
      <thead style={{background: "var(--navy)"}}>
        <tr>
          <th style={{color: "#fff", width: "160px"}}>Phase</th>
          <th style={{color: "#fff", width: "120px"}}>Timeline</th>
          <th style={{color: "#fff"}}>Activity</th>
          <th style={{color: "#fff"}}>Trigger / Threshold</th>
          <th style={{color: "#fff", width: "160px"}}>Responsible Body</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Measure</td>
          <td>End of each Semester (Month 4/9/14/19)</td>
          <td>Compute CO-PO attainment scores using direct + indirect data. Generate Semester-level Attainment Report in EcoPro LMS.</td>
          <td>Automatic — runs at end of every Semester</td>
          <td>EcoPro LMS + Programme Director</td>
        </tr>
        <tr>
          <td>Review</td>
          <td>Within 15 days of Semester completion</td>
          <td>Academic Review Committee meeting: analyse attainment data, identify underperforming COs/POs, review trainer feedback and student survey results.</td>
          <td>Any CO with &lt;75% attainment or any PO &lt;2.0</td>
          <td>Academic Review Committee (Upskillize + College rep)</td>
        </tr>
        <tr>
          <td>Improve</td>
          <td>Before next Semester begins</td>
          <td>Implement curriculum adjustments — update lesson content, revise lab activities, add supplementary resources, retrain trainer if needed.</td>
          <td>Any CO attainment &lt;65% triggers mandatory intervention</td>
          <td>Programme Director + Trainer</td>
        </tr>
        <tr>
          <td>Verify</td>
          <td>Next Semester (ongoing)</td>
          <td>Monitor whether improvements have raised CO attainment in the targeted areas. Compare Part N attainment vs Part N-1 for same CO/PO.</td>
          <td>Improvement must be demonstrated within 1 Semester cycle</td>
          <td>Programme Director + EcoPro LMS Analytics</td>
        </tr>
        <tr>
          <td>Annual Audit</td>
          <td>End of each programme year</td>
          <td>Full programme quality audit: CO-PO attainment across all cohorts, placement outcomes, alumni survey, employer feedback, trainer performance review, curriculum currency check.</td>
          <td>Annual — irrespective of individual Semester performance</td>
          <td>Upskillize Quality Council + BFSI SSC (post-validation)</td>
        </tr>
      </tbody>
    </table>

    <div className="at-callout" style={{background: "linear-gradient(135deg,var(--navy),#1A1048)", marginTop: "24px"}}>
      <div className="icon" style={{color: "var(--gold)"}}>🏛</div>
      <div>
        <h5 style={{color: "var(--gold)"}}>NAAC, BFSI SSC & ABC Reporting Compliance</h5>
        <p style={{color: "rgba(255,255,255,.7)"}}>All CO-PO attainment data, capstone rubric scores, placement records, and improvement action plans are stored in EcoPro LMS in a format compatible with NAAC Criterion II (Teaching-Learning and Evaluation) and Criterion III (Research, Innovations and Extension). Student credits are registered in the UGC Academic Bank of Credits (ABC) via DigiLocker at the end of each Semester. BFSI SSC validation audit can access the full data repository through the Upskillize Academic Quality Report portal.</p>
      </div>
    </div>
  </div>

</section>{/* end assess-page */}


{/* INNOVATION LAB */}
<section className="lab-section" id="lab">
  <div className="container">
    <p className="section-label fade-up">Where Theory Becomes a Product(Add On)</p>
    <h2 className="section-title fade-up fade-up-d1">The BFSI <em>Innovation Lab</em>:<br/>India's First of Its Kind.</h2>
    <p className="section-lead fade-up fade-up-d2">The Upskillize BFSI Innovation Lab is a dedicated physical and digital workspace established inside every partner college. It is the engine that transforms learning into building — and building into careers.</p>
    <div className="lab-hero-banner fade-up">
      <div>
        <div className="lab-title">You Don't Just Learn BFSI. You Build BFSI.</div>
        <p className="lab-lead">Every Saturday classroom session includes a 60-minute Innovation Lab build activity. By the end of the program, you will have built 16+ functional BFSI digital products, tools, and models — each one portfolio-ready and demonstrable to any recruiter in the industry.</p>
      </div>
      <div className="lab-stat-stack">
        <div className="ls"><div className="ls-num">16+</div><div className="ls-lbl">Lab Builds</div></div>
        <div className="ls"><div className="ls-num">12</div><div className="ls-lbl">Tool Types</div></div>
        <div className="ls"><div className="ls-num">Live</div><div className="ls-lbl">BFSI APIs</div></div>
      </div>
    </div>
    <div className="lab-grid">
      <div className="lab-card fade-up">
        <div className="lab-card-icon">📊</div>
        <h4>Power BI & Analytics Builds</h4>
        <p>Build BFSI-specific dashboards using live public data from RBI, AMFI, NSE/BSE — NPA monitoring, MF performance, ESG scoring, collections tracking. Dashboards you can share with any hiring manager.</p>
        <span className="lab-tag">LAB-A</span>
      </div>
      <div className="lab-card fade-up fade-up-d1">
        <div className="lab-card-icon">📱</div>
        <h4>No-Code App Prototypes</h4>
        <p>Using Bubble.io and Glide, build functional BFSI apps — digital loan application portals, investment risk profilers, insurance comparison tools, and wallet apps — without writing a single line of code.</p>
        <span className="lab-tag">LAB-B</span>
      </div>
      <div className="lab-card fade-up fade-up-d2">
        <div className="lab-card-icon">🧮</div>
        <h4>Financial Modelling</h4>
        <p>Build production-ready financial models: credit scorecards, NBFC valuations, bank P&L projections, ECL models (Ind AS 109), ALM duration gap analysis — using Upskillize's curated Excel toolkit.</p>
        <span className="lab-tag">LAB-C</span>
      </div>
      <div className="lab-card fade-up">
        <div className="lab-card-icon">🔌</div>
        <h4>Live BFSI API Testing</h4>
        <p>Use Postman with real sandbox APIs from Razorpay, Cashfree, and Setu Account Aggregator. Trace UPI payment flows, test payment gateway integrations, and explore Open Banking in action.</p>
        <span className="lab-tag">LAB-D</span>
      </div>
      <div className="lab-card fade-up fade-up-d1">
        <div className="lab-card-icon">🤖</div>
        <h4>AI Prompt Engineering</h4>
        <p>Build GenAI-powered BFSI tools: RBI circular summarisers, credit assessment bots, compliance checkers, and customer support flows — using ChatGPT and Claude. Practical AI, not theoretical.</p>
        <span className="lab-tag">LAB-E</span>
      </div>
      <div className="lab-card fade-up fade-up-d2">
        <div className="lab-card-icon">🐍</div>
        <h4>Python Data Analysis</h4>
        <p>Using Google Colab, analyse real BFSI datasets: build AML transaction detectors, compute equity returns and Sharpe ratios, extract credit signals from bank statements, and explore ML basics in a BFSI context.</p>
        <span className="lab-tag">LAB-H</span>
      </div>
      <div className="lab-card fade-up">
        <div className="lab-card-icon">🎨</div>
        <h4>Figma Product Design</h4>
        <p>Design professional UX wireframes for BFSI digital products — KYC onboarding flows, robo-advisory apps, CBDC wallet interfaces, CRM dashboards. Portfolio-ready Figma files every recruiter will notice.</p>
        <span className="lab-tag">LAB-G</span>
      </div>
      <div className="lab-card fade-up fade-up-d1">
        <div className="lab-card-icon">🚀</div>
        <h4>FinTech Ideathon</h4>
        <p>Semester-end 24-hour hackathon: build and pitch a FinTech idea to a jury of real BFSI investors. Best teams win the Upskillize Innovation Award and get a genuine introduction to early-stage investors.</p>
        <span className="lab-tag">Ideathon</span>
      </div>
      <div className="lab-card fade-up fade-up-d2">
        <div className="lab-card-icon">💼</div>
        <h4>Placement Portfolio Builder</h4>
        <p>Dedicated sessions in Semester 3 to publish every project — Power BI reports, Figma designs, app prototypes, and pitch decks — onto GitHub and LinkedIn as a professional digital portfolio that recruiters can actually explore.</p>
        <span className="lab-tag">Portfolio</span>
      </div>
    </div>
  </div>
</section>

{/* STARTUP & PRODUCT MANAGEMENT */}
<section className="startup" id="startup">
  <div className="container">
    <p className="section-label fade-up">Product Management · Startup Ecosystem · Digital Business</p>
    <h2 className="section-title fade-up fade-up-d1">Not just a job-seeker.<br/>An <em>industry builder.</em></h2>
    <p className="section-lead fade-up fade-up-d2">PGDFDB equips you for three futures simultaneously: a high-growth corporate career in BFSI, a startup founding team role, or launching your own FinTech venture. The same skills serve all three paths.</p>
    <div className="startup-layout">
      <div className="startup-cards">
        <div className="sc fade-up">
          <div className="sc-icon" style={{background: "#EBF4FF"}}>🧩</div>
          <div>
            <h4>Product Thinking — The PPP Model</h4>
            <p>Learn Upskillize's proprietary PPP framework (People, Process, Product) — the same methodology used by top BFSI product managers to solve real business problems. Write PRDs, define user stories, and run Agile sprints in a BFSI context that no generic PM course teaches.</p>
          </div>
        </div>
        <div className="sc fade-up fade-up-d1">
          <div className="sc-icon" style={{background: "var(--light)"}}>📐</div>
          <div>
            <h4>SDLC & Reverse SDLC</h4>
            <p>Master the full software development lifecycle as a business stakeholder — Agile, DevSecOps, and release governance. Then learn Reverse SDLC: how to analyse failed digital transformations and extract lessons that make you the most valuable person in any post-mortem.</p>
          </div>
        </div>
        <div className="sc fade-up fade-up-d2">
          <div className="sc-icon" style={{background: "#E8F5EE"}}>🌱</div>
          <div>
            <h4>Startup Ecosystem & FinTech Fundraising</h4>
            <p>Understand VC funding stages, FinTech valuation multiples, and term sheet basics. Build a FinTech pitch deck that could actually get funded. The FinTech Ideathon gives you a real investor audience — and the Innovation Lab gives you a working prototype to show them.</p>
          </div>
        </div>
        <div className="sc fade-up">
          <div className="sc-icon" style={{background: "#FFF8E1"}}>📈</div>
          <div>
            <h4>Growth Hacking for BFSI Products</h4>
            <p>Learn the AARRR funnel, referral loops, and product-led growth strategies specific to BFSI — where regulatory constraints meet the need for rapid user acquisition. How did Groww reach 50M users? How did Zerodha dominate without advertising? You will know the answer.</p>
          </div>
        </div>
        <div className="sc fade-up fade-up-d1">
          <div className="sc-icon" style={{background: "#FDE8DC"}}>🌍</div>
          <div>
            <h4>Global BFSI Opportunities</h4>
            <p>BFSI is the most globally portable career. A dedicated module covers UAE (DIFC), UK (FCA-regulated roles), Singapore (MAS), Australia (APRA), and Canada (OSFI) — with visa pathways, salary benchmarks, in-demand skills, and top employer mapping. Your PGDFDB is your passport.</p>
          </div>
        </div>
        <div className="sc fade-up fade-up-d2">
          <div className="sc-icon" style={{background: "#FAE0E0"}}>🏆</div>
          <div>
            <h4>The MiniCEO Program</h4>
            <p>The crown jewel of PGDFDB. Learn CEO-level thinking: P&L management, board communication, digital transformation roadmapping, M&A in financial services, and crisis management. Graduate as a professional who thinks like a business owner, not a job applicant.</p>
          </div>
        </div>
      </div>
      <div className="startup-right fade-up fade-up-d3">
        <div className="sr-card">
          <h3>Your Career Menu is <em>Enormous.</em></h3>
          <div className="role-grid">
            <div className="role-chip">
              <h5>Product Manager</h5><p>FinTech / Bank</p><div className="salary">₹18–45 LPA</div>
            </div>
            <div className="role-chip">
              <h5>Data Analyst</h5><p>BFSI / Analytics</p><div className="salary">₹6–15 LPA</div>
            </div>
            <div className="role-chip">
              <h5>Risk Analyst</h5><p>Bank / NBFC</p><div className="salary">₹5–12 LPA</div>
            </div>
            <div className="role-chip">
              <h5>Growth Lead</h5><p>FinTech Startup</p><div className="salary">₹8–20 LPA</div>
            </div>
            <div className="role-chip">
              <h5>AML Analyst</h5><p>RegTech / Bank</p><div className="salary">₹6–14 LPA</div>
            </div>
            <div className="role-chip">
              <h5>WealthTech RM</h5><p>PMS / WealthTech</p><div className="salary">₹5–18 LPA</div>
            </div>
            <div className="role-chip">
              <h5>Business Analyst</h5><p>Consulting / BFSI</p><div className="salary">₹6–14 LPA</div>
            </div>
            <div className="role-chip">
              <h5>InsurTech PM</h5><p>Insurance Tech</p><div className="salary">₹8–22 LPA</div>
            </div>
            <div className="role-chip">
              <h5>ESG Analyst</h5><p>Bank / PE Fund</p><div className="salary">₹6–16 LPA</div>
            </div>
            <div className="role-chip">
              <h5>FinTech Founder</h5><p>Your Startup</p><div className="salary">Your Equity 🚀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* PLACEMENTS & INTERNSHIPS */}
<section className="placement-section" id="placements">
  <div className="container">
    <p className="section-label fade-up">Built Into the Program — Not an Afterthought</p>
    <h2 className="section-title fade-up fade-up-d1">Placements &<br/><em>Internships</em></h2>
    <p className="section-lead fade-up fade-up-d2">Placement is the ultimate metric. We design every element of PGDFDB — from the first module to the last capstone — with one question in mind: "Will this help our student get hired and thrive?"</p>
    <div className="placement-grid">
      <div className="pf-list">
        <div className="pf fade-up">
          <div className="pf-icon">🎓</div>
          <div><h4>Campus Placement at End of Semester 3</h4><p>Your campus placement interviews are scheduled at the end of Month 14 — after the full Placement Readiness Sprint, 2 mock interviews, personality development, and portfolio build. You arrive at your interview the most prepared student on campus.</p></div>
        </div>
        <div className="pf fade-up fade-up-d1">
          <div className="pf-icon">🎭</div>
          <div><h4>Personality Development Training</h4><p>Two full-day professional presence workshops covering communication excellence, business etiquette, Group Discussion practice (3 rounds with evaluator feedback), and interview mindset coaching. Delivered by communication experts — not HR textbooks.</p></div>
        </div>
        <div className="pf fade-up fade-up-d2">
          <div className="pf-icon">🎤</div>
          <div><h4>2 Full Mock Interviews Per Student</h4><p>Round 1: 30-minute panel interview (mentor + peer evaluator) with detailed 10-criteria feedback report. Round 2: New evaluator panel testing improvement. Role-specific question banks for your target BFSI career path. Comparative improvement report delivered.</p></div>
        </div>
        <div className="pf fade-up">
          <div className="pf-icon">📂</div>
          <div><h4>Resume & Digital Portfolio</h4><p>1-to-1 mentor resume review. ATS-optimised BFSI resume template. Full digital portfolio published on LMS and LinkedIn — featuring all 4 capstone projects, lab builds, dashboards, and prototypes. A portfolio that shows employers exactly what you can do.</p></div>
        </div>
        <div className="pf fade-up fade-up-d1">
          <div className="pf-icon">🌍</div>
          <div><h4>Internships from Month 9 Onwards</h4><p>Students completing Semester 2 are eligible for structured 4–8 week BFSI internships through the Upskillize partner network. Real work experience. Letter of recommendation. In many cases, a pre-placement offer before your final semester.</p></div>
        </div>
        <div className="pf fade-up fade-up-d2">
          <div className="pf-icon">🤝</div>
          <div><h4>Upskillize Alumni Network</h4><p>Join a lifetime network of 500+ BFSI professionals. Annual summit. Alumni job board. Pay-it-forward mentoring culture. BFSI Fellows recognition for top performers. A community that has your back — not just for 2 years, but for 20.</p></div>
        </div>
      </div>
      <div className="p-cta-card fade-up fade-up-d3">
        <h3>We Don't Just Prepare You.<br/>We <em>Place</em> You.</h3>
        <p>Our placement commitment is not a brochure promise — it is a structured, measurable system built into the curriculum from Month 1.</p>
        <div className="guarantee-row">
          <div className="num">5+</div>
          <div className="txt">Guaranteed interview opportunities per student, activated through our 20+ BFSI hiring partner network</div>
        </div>
        <div className="guarantee-row">
          <div className="num">2</div>
          <div className="txt">Full mock interviews per student with detailed feedback reports — before your first real interview</div>
        </div>
        <div className="guarantee-row">
          <div className="num">1</div>
          <div className="txt">Dedicated placement coordinator per cohort managing the full process — company outreach to offer support</div>
        </div>
        <div className="internship-band">
          <h4>🚀 Internship Pathways Available</h4>
          <p>Eligible after Semester 2 (Month 9+). BFSI Analyst, Data Analytics, Product Management, RegTech/Compliance, InsurTech, and WealthTech internships through our partner network — some leading to pre-placement offers.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CERTIFICATE PROGRESSION */}
<section className="certs-section" id="certificates">
  <div className="container" style={{position: "relative", zIndex: "1"}}>
    <p className="section-label fade-up">4 Certificates. One Extraordinary Destination.</p>
    <h2 className="section-title fade-up fade-up-d1">Every Semester. A new<br/><em style={{color: "var(--gold)"}}>credential on your resume.</em></h2>
    <p className="section-lead fade-up fade-up-d2">You don't wait 2 years for recognition. With PGDFDB, you earn a formal Upskillize certificate at the end of every Semester — a progressive credential that builds your professional profile in real-time, even before you graduate.</p>
    <div className="cert-path fade-up fade-up-d1">
      <div className="cert-step">
        <span className="cs-num" style={{color: "var(--blue)"}}>Semester 1 · Month 4</span>
        <span className="cs-icon">🏦</span>
        <div className="cs-title">Certificate in BFSI Domain Excellence</div>
        <div className="cs-sub">Foundational BFSI Professional</div>
        <span className="cs-badge">BFSI-DE Flagship</span>
      </div>
      <div className="cert-step">
        <span className="cs-num" style={{color: "var(--purple)"}}>Semester 2 · Month 9</span>
        <span className="cs-icon">📈</span>
        <div className="cs-title">Certificate in Digital BFSI Technologies</div>
        <div className="cs-sub">Intermediate Technology Professional</div>
        <span className="cs-badge">InvestmentTech + D2D</span>
      </div>
      <div className="cert-step">
        <span className="cs-num" style={{color: "#C0392B"}}>Semester 3 · Month 14</span>
        <span className="cs-icon">🔒</span>
        <div className="cs-title">Certificate in Advanced BFSI & Digital Innovation</div>
        <div className="cs-sub">Advanced Digital Professional</div>
        <span className="cs-badge">RegTech Flagship</span>
      </div>
      <div className="cert-step">
        <span className="cs-num" style={{color: "var(--gold)"}}>Semester 4 · Month 19</span>
        <span className="cs-icon">👑</span>
        <div className="cs-title">PGDFDB — MBA++</div>
        <div className="cs-sub">Digital Business Leader</div>
        <span className="cs-badge">MiniCEO + NSQF 7</span>
      </div>
    </div>
    <div className="final-cert fade-up fade-up-d2">
      <div className="fc-eyebrow">The Final Destination</div>
      <div className="fc-title">Post Graduate Diploma in FinTech & Digital Business — BFSI</div>
      <div className="fc-sub">MBA++ · PGDFDB · Unique opportunity to be a Fintech & Digital Business Leader"</div>
      <div className="fc-tags">
        <span className="fc-tag">NSQF Level 7</span>
        <span className="fc-tag">BFSI SSC Aligned</span>
        <span className="fc-tag">1,494 Student Hours</span>
        <span className="fc-tag">16 Modules</span>
        <span className="fc-tag">4 Capstone Projects</span>
        <span className="fc-tag">Co-branded with Partner College</span>
        <span className="fc-tag">Upskillize BFSI Fellow</span>
        <span className="fc-tag">Lifelong Alumni Access</span>
      </div>
    </div>
  </div>
</section>

{/* QUOTE STRIP */}
<div className="quote-strip">
  <blockquote>"These 2 years can transform 20 years of your career. We make you part of it."</blockquote>
</div>

{/* COLLEGES CTA */}
<section className="colleges-cta" id="colleges">
  <div className="container">
    <p className="section-label text-center mx-auto fade-up">Join the Movement</p>
    <h2 className="section-title text-center mx-auto fade-up fade-up-d1">Ready to Offer India's Best<br/><em>BFSI Digital Program?</em></h2>
    <div className="cta-grid">
      <div className="cta-card for-colleges fade-up">
        <div className="eyebrow">For Academic Leaders & Placement Heads</div>
        <h3>Partner with Upskillize</h3>
        <p>Bring PGDFDB to your MBA students and transform your placement outcomes, institutional reputation, and industry partnerships — without adding any burden to your faculty or timetable.</p>
        <ul className="points">
          <li>Upskillize provides all content, trainers, LMS, and assessments — zero faculty load</li>
          <li>BFSI Innovation Lab established on your campus at no cost</li>
          <li>Co-branded certificates add to your institution's brand value</li>
          <li>Structured 3-year MOU with defined enrollment, placement, and revenue metrics</li>
          <li>Joint marketing: your college featured as an Upskillize Certified Partner</li>
          <li>Runs on weekday evenings + Saturday mornings — zero timetable conflict</li>
        </ul>
        <a href="mailto:info@upskillize.com" className="btn-gold">Schedule a Partnership Discussion →</a>
      </div>
      <div className="cta-card for-students fade-up fade-up-d2">
        <div className="eyebrow">For MBA & PGDM Students</div>
        <h3>Start Your BFSI Journey</h3>
        <p>PGDFDB runs alongside your MBA — on weekday evenings and Saturday mornings. No career gap, no extra year. Just 2 years of building, learning, and becoming an industry representative.</p>
        <ul className="points">
          <li>Earn 4 certificates on the way — each one resume-ready immediately</li>
          <li>Build a real project portfolio in the Innovation Lab</li>
          <li>Get a personal mentor for 2 years — bookable whenever you need</li>
          <li>Graduate with 5+ interview opportunities already activated</li>
          <li>Access global BFSI career pathways in UAE, UK, Singapore, and more</li>
          <li>Join the Upskillize Alumni network for life</li>
        </ul>
        <a href="mailto:info@upskillize.com" className="btn-white">Register Your Interest →</a>
      </div>
    </div>
  </div>
</section>
    </>
  );
}