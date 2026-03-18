import { useState, useEffect, useCallback, useRef } from "react";

// ─── CSS Variables & Global Styles ────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

  /* ─── Brand Tokens ─── */
  :root {
    --navy:    #0D2D6B;
    --navy2:   #142E6E;
    --teal:    #0A7B6F;
    --teal2:   #0D9488;
    --purple:  #5B3FA0;
    --gold:    #D4A017;
    --gold2:   #F0B429;
    --coral:   #E05A2B;
    --slate:   #1E3A5F;
    --ink:     #0F1C2E;
    --mist:    #F0F4FA;
    --cloud:   #E8EEF8;
    --white:   #FFFFFF;
    --gray50:  #F8FAFC;
    --gray100: #EEF2F7;
    --gray300: #C4CDD8;
    --gray500: #6B7B8F;
    --gray700: #374151;
    --text:    #1A2332;

    /* ── Font Families ── */
    --font-display: 'Plus Jakarta Sans', 'Syne', sans-serif;
    --font-body:    'Inter', 'Manrope', sans-serif;
    --font-serif:   'DM Serif Display', 'Fraunces', serif;
    --font-mono:    'JetBrains Mono', monospace;

    /* ── Border Radius ── */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-xl: 32px;

    /* ── Shadows ── */
    --shadow-sm: 0 2px 8px rgba(13,45,107,.08);
    --shadow-md: 0 6px 24px rgba(13,45,107,.12);
    --shadow-lg: 0 16px 48px rgba(13,45,107,.16);

    /* ── Transition ── */
    --transition: all .25s cubic-bezier(.4,0,.2,1);
  }

  /* ─── Reset ─── */
  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }

  /* ─── Base Body Typography ─── */
  body {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.65;
    color: var(--text);
    background: var(--white);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  a { text-decoration:none; color:inherit; }

  /* ─── Layout Utilities ─── */
  .container   { max-width:1180px; margin:0 auto; padding:0 24px; }
  .section     { padding:88px 0; }
  .section-sm  { padding:56px 0; }
  .text-center { text-align:center; }

  /* ─── Heading Scale (Syne) ─── */
  /* h-display: Hero headlines, page titles */
  .h-display {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }
  /* h1: Section titles, major headings */
  .h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  /* h2: Sub-section headings */
  .h2 {
    font-family: var(--font-display);
    font-size: clamp(22px, 3vw, 36px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  /* h3: Card headings, panel titles */
  .h3 {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  /* ─── Body Text Scale (DM Sans) ─── */
  /* lead: Section sub-descriptions */
  .lead {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.7;
    color: var(--gray700);
  }
  /* label: Section eyebrows, category labels — ALWAYS monospace */
  .label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray500);
  }

  /* ─── Badges & Tags (JetBrains Mono) ─── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 99px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .badge-navy   { background:var(--navy);  color:var(--white); }
  .badge-teal   { background:var(--teal2); color:var(--white); }
  .badge-gold   { background:var(--gold2); color:var(--navy);  }
  .badge-outline{ border:1.5px solid rgba(255,255,255,.5); color:var(--white); }

  /* tag: Inline skill/category pills */
  .tag {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 99px;
    background: var(--cloud);
    color: var(--navy);
    margin: 3px;
  }
  .tag-teal   { background:#E0F5F2; color:var(--teal); }
  .tag-purple { background:#EDE9F8; color:var(--purple); }
  .tag-gold   { background:#FEF3CD; color:#92600A; }
  .tag-coral  { background:#FDE8DF; color:var(--coral); }

  /* ─── Buttons (Syne) ─── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    padding: 14px 28px;
    border-radius: var(--radius-md);
    cursor: pointer;
    border: none;
    transition: var(--transition);
  }
  .btn-primary { background:var(--gold2); color:var(--navy); }
  .btn-primary:hover { background:var(--gold); transform:translateY(-2px); box-shadow:var(--shadow-md); }
  .btn-outline { background:transparent; color:var(--white); border:2px solid rgba(255,255,255,.5); }
  .btn-outline:hover { background:rgba(255,255,255,.1); border-color:var(--white); }
  .btn-navy { background:var(--navy); color:var(--white); }
  .btn-navy:hover { background:var(--slate); transform:translateY(-2px); box-shadow:var(--shadow-md); }

  /* ─── Card ─── */
  .card { background:var(--white); border:1px solid var(--gray100); border-radius:var(--radius-lg); padding:28px; transition:var(--transition); box-shadow:var(--shadow-sm); }
  .card:hover { box-shadow:var(--shadow-md); transform:translateY(-3px); }

  /* ─── Scroll Animations ─── */
  .fade-up { opacity:0; transform:translateY(24px); transition:opacity .6s ease,transform .6s ease; }
  .fade-up.visible { opacity:1; transform:translateY(0); }

  /* ─── Section Header Block ─── */
  .sec-header { text-align:center; max-width:720px; margin:0 auto 52px; }
  .sec-header .label { display:block; margin-bottom:10px; }
  .sec-header .lead  { max-width:600px; margin:0 auto; }
  /* Gradient accent bar above section labels */
  .accent-line {
    display: inline-block;
    width: 48px;
    height: 4px;
    border-radius: 99px;
    background: linear-gradient(90deg,var(--teal2),var(--gold2));
    margin-bottom: 16px;
  }

  /* ─── Grid Helpers ─── */
  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  @media(max-width:900px){ .grid2,.grid3,.grid4{ grid-template-columns:1fr 1fr; } }
  @media(max-width:600px){ .grid2,.grid3,.grid4{ grid-template-columns:1fr; } }

  /* ─── Scrollbar ─── */
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:var(--mist); }
  ::-webkit-scrollbar-thumb { background:var(--teal2); border-radius:3px; }

  /* ─── Bimester Tabs ─── */
  .bi-tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:36px; }
  .bi-tab {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    padding: 10px 20px;
    border-radius: 99px;
    cursor: pointer;
    border: 2px solid var(--cloud);
    color: var(--gray500);
    background: var(--white);
    transition: var(--transition);
  }
  .bi-tab:hover { transform:translateY(-1px); box-shadow:var(--shadow-sm); }

  /* ─── Bimester Sidebar ─── */
  .bi-content { display:grid; grid-template-columns:320px 1fr; gap:28px; }
  @media(max-width:900px){ .bi-content{ grid-template-columns:1fr; } }

  .bi-sidebar { border-radius:var(--radius-lg); padding:28px; color:var(--white); }

  /* Sidebar heading: Syne 700 18px */
  .bi-theme {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  /* Sidebar period label: JetBrains Mono 11px */
  .bi-period {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,.5);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .bi-cert-box { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); border-radius:10px; padding:14px; margin-bottom:20px; }
  /* Cert label: JetBrains Mono 10px */
  .bi-cert-box .cert-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,.5);
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  /* Cert name: DM Sans 600 13px */
  .bi-cert-box .cert-name {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--gold2);
    line-height: 1.4;
  }

  .bi-meta { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
  .bi-meta-item { flex:1; min-width:72px; background:rgba(255,255,255,.07); border-radius:8px; padding:8px 10px; text-align:center; }
  /* Meta number: Syne 700 20px */
  .bi-meta-item .mn {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    color: var(--gold2);
    letter-spacing: -0.02em;
  }
  /* Meta label: DM Sans 400 10px */
  .bi-meta-item .ml {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 400;
    color: rgba(255,255,255,.5);
    margin-top: 2px;
  }

  /* Section label inside sidebar: JetBrains Mono */
  .bi-section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    color: rgba(255,255,255,.4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 14px 0 6px;
  }
  .bi-courses { display:flex; flex-direction:column; gap:4px; }
  /* Course list item: DM Sans 400 12px */
  .bi-course {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 400;
    color: rgba(255,255,255,.8);
    padding: 4px 0;
    border-bottom: 1px solid rgba(255,255,255,.07);
    display: flex;
    align-items: flex-start;
    gap: 6px;
    line-height: 1.5;
  }
  .bi-course::before { content:'›'; color:var(--teal2); font-weight:700; flex-shrink:0; }

  /* ─── Topic Cards ─── */
  .topic-card { background:var(--white); border:1px solid var(--cloud); border-radius:var(--radius-md); padding:20px 24px; box-shadow:var(--shadow-sm); margin-bottom:16px; }
  .tc-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  /* Topic number circle: Syne 700 12px */
  .tc-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 700;
    color: var(--white);
    flex-shrink: 0;
  }
  /* Topic title: Syne 700 15px */
  .tc-title {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.01em;
  }
  .tc-tags { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px; }
  .tc-list { display:grid; grid-template-columns:1fr 1fr; gap:4px; }
  @media(max-width:600px){ .tc-list{ grid-template-columns:1fr; } }
  /* Topic items: DM Sans 400 12px */
  .tc-item {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 400;
    color: var(--gray700);
    display: flex;
    align-items: flex-start;
    gap: 5px;
    line-height: 1.5;
  }
  .tc-item::before { content:'✓'; color:var(--teal2); font-weight:700; flex-shrink:0; font-size:11px; margin-top:2px; }

  /* ─── Case Cards ─── */
  .case-card { background:var(--white); border-radius:var(--radius-md); padding:20px; border:1px solid var(--cloud); box-shadow:var(--shadow-sm); transition:var(--transition); }
  .case-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  /* Company name: Syne 700 14px */
  .case-company { font-family:var(--font-display); font-size:14px; font-weight:700; color:var(--navy); letter-spacing:-0.01em; }
  /* Region tag: JetBrains Mono 500 10px */
  .case-region { font-family:var(--font-mono); font-size:10px; font-weight:500; padding:2px 8px; border-radius:99px; background:var(--cloud); color:var(--gray500); }
  /* Case title: DM Sans 400 13px */
  .case-title { font-family:var(--font-body); font-size:13px; font-weight:400; color:var(--gray700); margin:6px 0; line-height:1.4; }
  /* Skill tag: JetBrains Mono 600 11px */
  .case-skill { font-family:var(--font-mono); font-size:11px; font-weight:600; color:var(--teal); }

  /* ─── Lecture Cards ─── */
  .lecture-card { background:var(--white); border-radius:var(--radius-md); padding:24px; border:1px solid var(--cloud); box-shadow:var(--shadow-sm); transition:var(--transition); border-left:4px solid var(--teal2); }
  .lecture-card:hover { box-shadow:var(--shadow-md); }
  /* Session number: JetBrains Mono 500 10px */
  .lecture-number { font-family:var(--font-mono); font-size:10px; font-weight:500; color:var(--gray500); margin-bottom:8px; letter-spacing:0.06em; text-transform:uppercase; }
  /* Lecture title: Syne 700 15px */
  .lecture-title { font-family:var(--font-display); font-size:15px; font-weight:700; color:var(--navy); margin-bottom:6px; line-height:1.3; letter-spacing:-0.01em; }
  /* Speaker: DM Sans 400 12px */
  .lecture-speaker { font-family:var(--font-body); font-size:12px; font-weight:400; color:var(--gray500); margin-bottom:12px; }
  /* Question items: DM Sans 400 11px */
  .lecture-q { font-family:var(--font-body); font-size:11px; font-weight:400; color:var(--gray700); padding-left:12px; border-left:2px solid var(--gold2); margin-bottom:4px; line-height:1.5; }
  /* Task note: DM Sans 500 11px */
  .lecture-task { margin-top:12px; padding:8px 10px; background:#F0F9F8; border-radius:6px; font-family:var(--font-body); font-size:11px; font-weight:500; color:var(--teal); }

  /* ─── RUBRIC Assessment Table ─── */
  .rubric-row { display:grid; grid-template-columns:200px repeat(5,1fr); background:rgba(13,45,107,.04); border-radius:8px; overflow:hidden; margin-bottom:2px; }
  .rubric-row.header { background:rgba(13,45,107,.08); }
  .rubric-cell { padding:10px 12px; border-right:1px solid rgba(13,45,107,.08); }
  .rubric-cell:last-child { border-right:none; }
  /* Row label: DM Sans 600 12px */
  .rubric-cell.label-col { font-family:var(--font-body); font-size:12px; font-weight:600; color:var(--navy); }
  /* Table body: DM Sans 400 12px */
  .rubric-cell { font-family:var(--font-body); font-size:12px; font-weight:400; color:var(--gray700); }
  /* Header cells: Syne 700 13px */
  .rubric-cell.header-cell { font-family:var(--font-display); font-size:13px; font-weight:700; color:var(--navy); }

  /* ─── Credits Table ─── */
  .credits-table { width:100%; border-collapse:collapse; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-md); }
  /* Table header: Syne 600 13px */
  .credits-table th { background:var(--navy); color:var(--white); font-family:var(--font-display); font-size:13px; font-weight:600; letter-spacing:-0.01em; padding:14px 14px; text-align:left; }
  /* Table body: DM Sans 400 13px */
  .credits-table td { padding:12px 14px; font-family:var(--font-body); font-size:13px; font-weight:400; border-bottom:1px solid var(--cloud); color:var(--text); line-height:1.5; }
  .credits-table tr:nth-child(even) td { background:var(--mist); }
  .credits-table tr.total td { background:var(--navy); color:var(--white); font-family:var(--font-display); font-weight:700; }

  /* ─── Skills Items ─── */
  .skill-item { background:var(--white); border:1px solid var(--cloud); border-radius:var(--radius-md); padding:16px; display:flex; flex-direction:column; gap:6px; box-shadow:var(--shadow-sm); transition:var(--transition); }
  .skill-item:hover { box-shadow:var(--shadow-md); }
  .si-icon { font-size:24px; }
  /* Skill name: Syne 700 14px */
  .si-name { font-family:var(--font-display); font-size:14px; font-weight:700; color:var(--navy); letter-spacing:-0.01em; }
  /* Skill description: DM Sans 400 11px */
  .si-desc { font-family:var(--font-body); font-size:11px; font-weight:400; color:var(--gray500); line-height:1.45; }
  .skill-level { display:inline-flex; gap:3px; }
  .skill-level span { width:8px; height:8px; border-radius:50%; background:var(--gray100); }
  .skill-level span.filled { background:var(--teal2); }

  /* ─── LMS Agents ─── */
  .agent-item { display:flex; align-items:flex-start; gap:12px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,.07); }
  .agent-item:last-child { border-bottom:none; }
  .agent-dot { width:10px; height:10px; border-radius:50%; margin-top:4px; flex-shrink:0; background:conic-gradient(var(--teal2) 0%,var(--gold2) 100%); box-shadow:0 0 8px rgba(10,122,111,.5); }
  /* Agent name: Syne 600 13px */
  .agent-name { font-family:var(--font-display); font-size:13px; font-weight:600; color:var(--gold2); margin-bottom:2px; letter-spacing:-0.01em; }
  /* Agent description: DM Sans 400 11px */
  .agent-desc { font-family:var(--font-body); font-size:11px; font-weight:400; color:rgba(255,255,255,.6); line-height:1.45; }

  /* ─── Schedule Timeline ─── */
  .schedule-timeline { display:grid; grid-template-columns:140px 1fr; border:1px solid var(--cloud); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); }
  /* Day label: Syne 700 14px */
  .schedule-day { background:var(--navy); color:var(--white); padding:20px 16px; font-family:var(--font-display); font-size:14px; font-weight:700; letter-spacing:-0.01em; display:flex; align-items:center; justify-content:center; text-align:center; border-bottom:1px solid rgba(255,255,255,.08); }
  .schedule-day:last-child { border-bottom:none; }
  .schedule-content { background:var(--white); padding:20px 24px; border-bottom:1px solid var(--cloud); }
  .schedule-content:last-child { border-bottom:none; }
  /* Time label: JetBrains Mono 500 11px */
  .schedule-time { font-family:var(--font-mono); font-size:11px; font-weight:500; color:var(--gray500); margin-bottom:4px; letter-spacing:0.04em; }
  /* Session title: Syne 700 14px */
  .schedule-title { font-family:var(--font-display); font-size:14px; font-weight:700; color:var(--navy); margin-bottom:4px; letter-spacing:-0.01em; }
  /* Detail: DM Sans 400 12px */
  .schedule-detail { font-family:var(--font-body); font-size:12px; font-weight:400; color:var(--gray500); line-height:1.5; }

  /* ─── Delivery Cards ─── */
  .delivery-card { background:var(--white); border:1px solid var(--cloud); border-radius:var(--radius-lg); padding:28px; box-shadow:var(--shadow-sm); text-align:center; transition:var(--transition); }
  .delivery-card:hover { box-shadow:var(--shadow-md); }
  .delivery-icon  { font-size:36px; margin-bottom:14px; }
  /* Delivery title: Syne 700 16px */
  .delivery-title { font-family:var(--font-display); font-size:16px; font-weight:700; color:var(--navy); margin-bottom:8px; letter-spacing:-0.01em; }
  /* Delivery desc: DM Sans 400 13px */
  .delivery-desc  { font-family:var(--font-body); font-size:13px; font-weight:400; color:var(--gray500); line-height:1.6; }

  /* ─── Career Cards ─── */
  .career-card { background:var(--white); border-radius:var(--radius-md); padding:20px; border:1px solid var(--cloud); box-shadow:var(--shadow-sm); transition:var(--transition); }
  .career-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  /* Role: Syne 700 15px */
  .career-role      { font-family:var(--font-display); font-size:15px; font-weight:700; color:var(--navy); margin-bottom:4px; letter-spacing:-0.01em; }
  /* CTC: JetBrains Mono 600 12px */
  .career-ctc       { font-family:var(--font-mono); font-size:12px; font-weight:600; margin-bottom:6px; }
  /* Companies: DM Sans 400 11px */
  .career-companies { font-family:var(--font-body); font-size:11px; font-weight:400; color:var(--gray500); margin-bottom:12px; line-height:1.4; }
  /* Demand badges: DM Sans 600 10px */
  .demand-high      { display:inline-flex; align-items:center; gap:4px; font-family:var(--font-body); font-size:10px; font-weight:600; padding:3px 8px; border-radius:99px; background:#DCFCE7; color:#166534; margin-bottom:8px; }
  .demand-exploding { display:inline-flex; align-items:center; gap:4px; font-family:var(--font-body); font-size:10px; font-weight:600; padding:3px 8px; border-radius:99px; background:#FEF3C7; color:#92400E; margin-bottom:8px; }
  .demand-medium    { display:inline-flex; align-items:center; gap:4px; font-family:var(--font-body); font-size:10px; font-weight:600; padding:3px 8px; border-radius:99px; background:#DBEAFE; color:#1E40AF; margin-bottom:8px; }
  .demand-growing   { display:inline-flex; align-items:center; gap:4px; font-family:var(--font-body); font-size:10px; font-weight:600; padding:3px 8px; border-radius:99px; background:#FCE7F3; color:#9D174D; margin-bottom:8px; }

  /* ─── Outcome Cards ─── */
  .outcome-card { background:var(--white); border-radius:var(--radius-md); padding:24px; box-shadow:var(--shadow-sm); border:1px solid var(--cloud); transition:var(--transition); }
  .outcome-card:hover { box-shadow:var(--shadow-md); }
  .outcome-icon  { font-size:28px; margin-bottom:12px; }
  /* Outcome title: Syne 700 15px */
  .outcome-title { font-family:var(--font-display); font-size:15px; font-weight:700; color:var(--navy); margin-bottom:8px; letter-spacing:-0.01em; }
  /* Outcome text: DM Sans 400 13px */
  .outcome-text  { font-family:var(--font-body); font-size:13px; font-weight:400; color:var(--gray500); line-height:1.6; }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CASES = [
  {company:"Paytm",title:"From Wallet to Super-App to Regulatory Crisis",region:"India",cat:["india","fintech","risk"],skill:"FinTech Strategy · Regulatory Risk"},
  {company:"Zerodha",title:"Zero-Brokerage Disruption of India's Broking Industry",region:"India",cat:["india","fintech"],skill:"WealthTech · Platform Economics"},
  {company:"CRED",title:"The Rewards Flywheel: Business Model or Brand Illusion?",region:"India",cat:["india","fintech"],skill:"Unit Economics · B2C FinTech"},
  {company:"Yes Bank",title:"Credit Risk Failure: A Case Study in Governance Collapse",region:"India",cat:["india","risk"],skill:"Credit Risk · Governance"},
  {company:"IL&FS",title:"Systemic Risk in India's NBFC Sector",region:"India",cat:["india","risk"],skill:"Systemic Risk · Governance"},
  {company:"PhonePe vs Google Pay",title:"Product Differentiation on a Commodity Rail",region:"India",cat:["india","fintech"],skill:"Product Strategy · Payments"},
  {company:"Razorpay",title:"India's B2B FinTech Playbook — Growth Without Consumer Brand",region:"India",cat:["india","fintech"],skill:"B2B FinTech · Payment Gateway"},
  {company:"BharatPe",title:"Governance Failure in a High-Growth Startup",region:"India",cat:["india","risk"],skill:"Governance · Startup Risk"},
  {company:"Kotak 811",title:"Building a Digital Bank Inside a Traditional Bank",region:"India",cat:["india","fintech"],skill:"Digital Transformation"},
  {company:"HDFC Bank EVA",title:"Conversational AI in Banking at Scale",region:"India",cat:["india","ai"],skill:"AI in Banking · Chatbots"},
  {company:"Groww",title:"WealthTech User Acquisition Playbook",region:"India",cat:["india","fintech"],skill:"Growth Marketing · WealthTech"},
  {company:"Lendingkart",title:"MSME Credit Through Alternative Data",region:"India",cat:["india","fintech"],skill:"LendingTech · Alternative Data"},
  {company:"PMC Bank",title:"Cooperative Banking and Concentrated Risk",region:"India",cat:["india","risk"],skill:"Concentration Risk · OpRisk"},
  {company:"M2P Fintech",title:"BaaS Infrastructure Play — India's Invisible FinTech",region:"India",cat:["india","fintech"],skill:"BaaS · API Economy"},
  {company:"SVB Collapse",title:"Interest Rate Risk and the 48-Hour Bank Run",region:"Global",cat:["global","risk"],skill:"Market Risk · Liquidity Risk"},
  {company:"TSB Bank",title:"Core Banking Migration Disaster — IT Risk at Scale",region:"Global",cat:["global","risk","ai"],skill:"Technology Risk · Change Mgmt"},
  {company:"Nubank",title:"Building a 80M-Customer Bank With No Branches",region:"Global",cat:["global","fintech"],skill:"Neobanking · Digital Strategy"},
  {company:"Revolut",title:"The Super-App Regulators Worry About Most",region:"Global",cat:["global","fintech","risk"],skill:"Regulatory Risk · FinTech Expansion"},
  {company:"JPMorgan COiN",title:"AI Contract Review: 12,000 Agreements, 360,000 Hours Saved",region:"Global",cat:["global","ai"],skill:"GenAI · Document Intelligence"},
  {company:"Commonwealth Bank",title:"AI Failure: When ML Models Breach Regulatory Obligations",region:"Global",cat:["global","ai","risk"],skill:"AI Governance · Responsible AI"},
  {company:"DBS Bank",title:"From Traditional to World's Best Digital Bank",region:"Global",cat:["global","fintech"],skill:"Digital Transformation · Strategy"},
  {company:"Stripe",title:"Developer-First Payments and the API Economy",region:"Global",cat:["global","fintech"],skill:"Platform Economics · API Strategy"},
];

const LECTURES = [
  {num:"01",title:"The Future of Indian Banking — Disruption, Regulation, Opportunity",speaker:"Chief Economist, leading private sector bank",qs:["3 biggest structural shifts in Indian banking by 2030?","How will AI change the role of relationship managers?","Where are white spaces for new BFSI entrants?"],task:"300-word reflection: 'The most surprising thing about the future of banking'"},
  {num:"02",title:"Building a FinTech from Zero: Founder Lessons Nobody Tells You",speaker:"Co-founder & CEO, Series B Indian FinTech",qs:["Hardest regulatory hurdle in first 18 months?","Build vs buy vs partner — how did you decide?","What would you do differently starting today?"],task:"LMS quiz + 'What is your FinTech idea and who is the user?'"},
  {num:"03",title:"CBDC and the e-Rupee: Will It Change Everything?",speaker:"Senior Leader, RBI FinTech research division",qs:["How is e-Rupee technically different from UPI?","What threat does CBDC pose to commercial banks?","What product opportunities does CBDC open?"],task:"400-word position paper: 'CBDC is / is not a threat to UPI'"},
  {num:"04",title:"Data Strategy in Banking: Gold You Cannot Mine",speaker:"Chief Data Officer, leading private sector bank",qs:["#1 data quality problem in Indian banks today?","How do CDOs build the business case for data investment?","Best-practice BFSI data governance framework?"],task:"Map your target company's likely data challenges — 300-word LMS submission"},
  {num:"05",title:"GenAI in Core Banking: Real Deployments, Honest Lessons",speaker:"Head of AI/ML, leading private bank",qs:["Which GenAI use cases have delivered proven ROI?","What GenAI use cases have failed — and why?","Managing hallucination risk in regulated environments?"],task:"GenAI use case ranking: rank 10 BFSI applications by feasibility and impact"},
  {num:"06",title:"DPDPA 2023: What BFSI Companies Are Getting Wrong",speaker:"Data Protection Officer, leading private bank",qs:["Top 5 DPDPA obligations most companies miss?","How does DPDPA interact with AML data retention?","What does a DPDPA-compliant digital lending product look like?"],task:"DPDPA audit mini-exercise: assess 5 practices against obligations"},
  {num:"07",title:"WealthTech 2.0: From Democratisation to Sophistication",speaker:"Chief Product Officer, leading WealthTech platform",qs:["What made 100M Indians invest for the first time?","Where is the next wave of WealthTech growth coming from?","How do you build a wealth product for Tier 2–3 cities?"],task:"WealthTech product teardown: 5 UX observations on one app's onboarding flow"},
  {num:"08",title:"What Hiring Managers Actually Want — Brutally Honest",speaker:"Head of Campus Hiring, leading BFSI company (500+ hires/year)",qs:["What shortlists a BFSI resume in 6 seconds?","What interview answer signals unreadiness instantly?","Most common mistake BFSI applicants make in final rounds?"],task:"Submit PGDFBA-optimised resume; confirm Mock Interview 1 slot"},
  {num:"09",title:"Careers in Wealth Management: From RM to Private Banker",speaker:"Managing Director, leading private wealth management firm",qs:["How is the Wealth Manager role evolving with AI?","What does a HNI client actually expect from an advisor?","Career path from junior RM to Private Banker timeline?"],task:"Build your personal wealth management career roadmap — 5-year plan"},
];

const SKILLS_DATA = {
  "Analytics & Data": [
    {icon:"🗄️",name:"SQL (PostgreSQL)",desc:"BFSI query patterns: NPA aging, customer 360, fraud alerts, cohort analysis",level:5},
    {icon:"📊",name:"Power BI (Advanced)",desc:"DAX measures, BFSI KPI dashboards, row-level security, Power BI Service",level:5},
    {icon:"🐍",name:"Python (pandas)",desc:"Data wrangling, EDA, basic ML — Google Colab, no prior coding required",level:4},
    {icon:"📑",name:"Excel (Financial)",desc:"Loan amortisation, DSCR, NPV, IRR, IFRS 9 ECL models, pivot tables",level:5},
    {icon:"🔍",name:"RBI DBIE Portal",desc:"Primary Indian banking data source — NPA reports, sectoral credit data",level:4},
    {icon:"📈",name:"Screener.in",desc:"Financial ratio extraction, peer comparison, sector analysis",level:3},
  ],
  "AI & GenAI": [
    {icon:"🤖",name:"Claude API",desc:"Prompt engineering, RAG prototypes, BFSI document analysis, agent workflows",level:5},
    {icon:"⚡",name:"LangChain",desc:"RAG pipelines for banking document Q&A, multi-step BFSI workflows",level:4},
    {icon:"🔄",name:"n8n Automation",desc:"No-code compliance automation, loan workflows, KYC alert routing",level:4},
    {icon:"📄",name:"OpenClaw",desc:"AI contract intelligence for banking agreements and regulatory documents",level:4},
    {icon:"🌐",name:"Streamlit",desc:"Deploy Python + LLM demos as shareable web apps — portfolio essential",level:4},
    {icon:"🔗",name:"Postman",desc:"API testing for Open Banking APIs, payment gateway integrations",level:3},
  ],
  "Product & Design": [
    {icon:"🎨",name:"Figma",desc:"Banking product wireframes, user flows, clickable prototypes for PM interviews",level:4},
    {icon:"🚀",name:"Lovable",desc:"Build functional FinTech product prototypes without coding",level:4},
    {icon:"💡",name:"Emergent",desc:"AI-powered product design platform — ideation to prototype",level:3},
    {icon:"📋",name:"Jira",desc:"Sprint planning, backlog management, release tracking in BFSI teams",level:4},
    {icon:"🗺️",name:"Miro",desc:"Journey mapping, product discovery, PI Planning workshops",level:3},
    {icon:"🎯",name:"CrewAI (Agentic)",desc:"Multi-agent orchestration: credit scorer + explainer + alert agent",level:3},
  ],
  "Banking Platforms": [
    {icon:"🏦",name:"Oracle FLEXCUBE",desc:"Loan origination, account management, transaction processing — hands-on lab",level:4},
    {icon:"💼",name:"SAP BFSI",desc:"GL entries, reconciliation, regulatory reporting — demo environment",level:3},
    {icon:"🏛️",name:"Infosys Finacle",desc:"Digital banking capabilities, mobile banking back-end overview",level:3},
    {icon:"👥",name:"Salesforce CRM",desc:"Client portfolio, AUM tracking, activity logging — RM and Wealth Manager",level:4},
    {icon:"💳",name:"Razorpay / Stripe",desc:"Payment gateway setup, webhook handling, API integration labs",level:4},
    {icon:"📱",name:"NPCI UPI Sandbox",desc:"UPI API flows, collect requests, merchant integration mechanics",level:4},
  ],
  "Compliance Tools": [
    {icon:"🔍",name:"ComplyAdvantage",desc:"AML/KYC screening — sanctions lists, PEP screening, adverse media",level:4},
    {icon:"✅",name:"Veriph.io / Signzy",desc:"Digital KYC, V-CIP workflow, Aadhaar eKYC, liveness detection",level:4},
    {icon:"📊",name:"Finbox API",desc:"Digital lending API — credit pull, borrower scoring, loan offer generation",level:3},
    {icon:"🎨",name:"Canva",desc:"Investment proposals, BFSI infographics, LinkedIn carousels, client decks",level:4},
    {icon:"📝",name:"Notion AI",desc:"Content management, editorial workflow, BFSI knowledge base building",level:3},
    {icon:"🔎",name:"Moody's RiskCalc",desc:"Corporate credit risk assessment — PD scoring, financial input, output interpretation",level:3},
  ],
};

const CAREERS_DATA = {
  "FinTech & Digital": {color:"#3B82F6", roles:[
    {role:"Associate Product Manager",ctc:"₹8–14 LPA",demand:"Very High",cos:"Razorpay · PhonePe · CRED · Paytm · Slice · Fi Money",skills:["Product thinking","SQL","Figma","GenAI prototyping","BFSI domain"]},
    {role:"Business Analyst — Digital Banking",ctc:"₹6–10 LPA",demand:"High",cos:"HDFC Digital · Axis Neo · TCS BaNCS · Infosys Finacle · Mphasis",skills:["BRD/FRD writing","SQL","FLEXCUBE","Stakeholder mgmt","UAT"]},
    {role:"FinTech Growth Analyst",ctc:"₹5–9 LPA",demand:"High",cos:"Groww · Zerodha · INDmoney · Jupiter · Navi · Lendingkart",skills:["SQL cohort analysis","Unit economics","GA4/Mixpanel","Excel","FinTech models"]},
    {role:"Relationship Manager — Banking",ctc:"₹4–9 LPA",demand:"High",cos:"HDFC Bank · Axis · Kotak · IndusInd · AU SFB · Bajaj Finance",skills:["Banking products","Salesforce CRM","FLEXCUBE","InsurTech","Client advisory"]},
  ]},
  "AI & Data": {color:"#10B981", roles:[
    {role:"Data Analyst — BFSI",ctc:"₹5–9 LPA",demand:"Very High",cos:"HDFC Analytics · Axis · Perfios · CRISIL · S&P Global India · CIBIL",skills:["SQL","Power BI DAX","Python","BFSI KPIs","Credit analytics"]},
    {role:"GenAI Solutions Analyst",ctc:"₹8–14 LPA",demand:"Exploding",cos:"Accenture BFSI · Deloitte · EY · HDFC AI Labs · FIS · Mphasis",skills:["Claude API","LangChain","RAG","n8n","Streamlit"]},
    {role:"AI / ML Analyst — FinTech",ctc:"₹7–12 LPA",demand:"Very High",cos:"Feedzai · Bureau.id · Signzy · Cashfree · Razorpay · CIBIL",skills:["Python (Scikit-learn)","SHAP/XAI","Credit scoring","Fraud detection","Feature engineering"]},
    {role:"Credit / Risk Analyst",ctc:"₹5–9 LPA",demand:"High",cos:"HDFC · ICICI · Axis · Lendingkart · KreditBee · CRISIL · Moody's",skills:["IFRS 9 ECL","CIBIL bureau","Python risk models","Excel financial models","FLEXCUBE"]},
  ]},
  "Wealth & Advisory": {color:"#F59E0B", roles:[
    {role:"Wealth Manager / Investment Advisor",ctc:"₹5–12 LPA + incentives",demand:"High",cos:"HDFC Securities · ICICI Direct · Zerodha · Groww · Nuvama · 360 ONE",skills:["Investment products","IPS writing","Zerodha Kite","Salesforce CRM","ESG","Portfolio construction"]},
    {role:"Relationship Manager — Wealth",ctc:"₹6–10 LPA",demand:"High",cos:"Kotak Wealth · Axis Securities · ICICI Direct · JM Financial",skills:["Financial planning","Client communication","Canva presentations","InsurTech cross-sell","SEBI RIA"]},
  ]},
  "RegTech & Compliance": {color:"#8B5CF6", roles:[
    {role:"Compliance Analyst — KYC/AML",ctc:"₹5–8 LPA",demand:"High",cos:"HDFC · Axis · HSBC · Standard Chartered · ComplyAdvantage · Signzy",skills:["DPDPA 2023","AML typologies","ComplyAdvantage","Signzy","Excel + SQL"]},
    {role:"RegTech Implementation Analyst",ctc:"₹6–10 LPA",demand:"High",cos:"Signzy · Bureau.id · Veriph.io · Perfios · KPMG · PwC · EY",skills:["Signzy platform","ComplyAdvantage","Postman (API)","n8n","DPDPA compliance"]},
    {role:"Internal Audit Analyst — BFSI",ctc:"₹5–8 LPA",demand:"Steady",cos:"Deloitte · EY · KPMG · PwC · RBI-supervised banks · NBFCs",skills:["Risk-based audit","IS audit standards","DPDPA audit","Six Sigma","ITIL change mgmt"]},
    {role:"BFSI Consulting Analyst",ctc:"₹7–13 LPA",demand:"High",cos:"McKinsey · BCG · Deloitte · EY · Accenture · Capgemini · Mphasis",skills:["Problem structuring","Excel financial modelling","FLEXCUBE/SAP awareness","BFSI domain","PowerPoint"]},
  ]},
  "Content & Strategy": {color:"#EC4899", roles:[
    {role:"BFSI Content Writer / Strategist",ctc:"₹4–9 LPA (in-house) · ₹8–18 LPA (Lead)",demand:"Growing",cos:"BankBazaar · Moneycontrol · Groww Blog · Zerodha Varsity · PolicyBazaar",skills:["BFSI domain depth","Claude / Notion AI","Canva","LinkedIn content","SEO for finance","Regulatory writing"]},
    {role:"FinTech Marketing & Strategy",ctc:"₹5–9 LPA",demand:"Growing",cos:"PhonePe · Paytm · CRED · Navi · Slice · FinTech PR agencies",skills:["FinTech competitive intelligence","Unit economics","Growth analytics","Content strategy","LinkedIn thought leadership"]},
  ]},
};

const CERTS_DATA = [
  {bi:"B1",name:"Certified BFSI & FinTech Professional",abbr:"CBFP",color:"#3B82F6",what:"Banking ecosystem, FinTech models, UPI/India Stack, regulatory basics, professional communication.",roles:"All entry-level BFSI roles"},
  {bi:"B2",name:"Certified Data & Wealth Intelligence Analyst",abbr:"CDWIA",color:"#10B981",what:"SQL, Power BI, Python basics, WealthTech platforms, LendingTech models, ESG, financial planning.",roles:"Data Analyst, Wealth Manager, Credit Analyst"},
  {bi:"B3",name:"Certified AI & RegTech Compliance Analyst",abbr:"CARCA",color:"#8B5CF6",what:"Claude API, RAG, DPDPA 2023, AML/KYC, ComplyAdvantage, n8n, digital content strategy.",roles:"GenAI Analyst, Compliance, RegTech, Content Writer"},
  {bi:"B4",name:"Certified AI Product Manager — BFSI",abbr:"CAPM-BFSI",color:"#F59E0B",what:"PRD writing, Figma, Agile/SAFe, Six Sigma DMAIC, ITIL Foundation, InsurTech, Placement Bootcamp.",roles:"Associate PM, BA, AI/ML Analyst, Consulting"},
  {bi:"B5",name:"Certified Digital Banking & FinTech Strategist",abbr:"CDBFS",color:"#0EA5E9",what:"FLEXCUBE, SAP BFSI, Finacle, Salesforce CRM, wealth advisory practice, FinTech strategy frameworks.",roles:"RM, Wealth Manager, Digital BA, Consulting"},
  {bi:"B6",name:"Post Graduate Diploma in FinTech, Banking & AI",abbr:"PGDFBA",color:"#D4A017",what:"Master credential: all 40 credits, 12 capstones, 2 mock interviews, major capstone jury cleared.",roles:"All 16 target roles — the definitive career-entry credential"},
];

const BI_COLORS = ["#3B82F6","#10B981","#8B5CF6","#E05A2B","#1565A0","#374151"];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useFadeUp() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold:0.08, rootMargin:'0px 0px -32px 0px' });

    const observeAll = () => {
      document.querySelectorAll('.fade-up:not(.visible)').forEach(el => io.observe(el));
    };
    observeAll();

    // Re-scan whenever React adds new DOM nodes (tab/filter switches)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{background:'var(--navy)',position:'relative',overflow:'hidden',padding:'80px 0 100px'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 800px 600px at 80% 50%,rgba(10,122,111,.25) 0%,transparent 70%),radial-gradient(ellipse 600px 400px at 10% 80%,rgba(91,63,160,.2) 0%,transparent 60%)'}} />
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:60,alignItems:'center',position:'relative',zIndex:1}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20,flexWrap:'wrap'}}>
              <span className="badge badge-teal">India's First Bimester Model</span>
              <span className="badge badge-gold">UGC Aligned · 40 Credits</span>
              <span className="badge badge-outline" style={{borderColor:'rgba(255,255,255,.5)',color:'var(--white)'}}>Placement-First</span>
            </div>
            <h1 className="h-display" style={{color:'var(--white)',marginBottom:20}}>
              Post Graduate Diploma in<br />
              <span style={{color:'var(--gold2)'}}>FinTech, Banking & AI</span>
            </h1>
            <p style={{fontFamily:'var(--font-body)',fontSize:16,fontWeight:400,color:'rgba(255,255,255,.72)',marginBottom:36,maxWidth:560,lineHeight:1.7}}>
              12 months. 6 bimesters. 16 career pathways. One programme built entirely around getting you a job in India's most exciting industry — with 6 stackable industry certificates along the way.
            </p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:48}}>
              <a href="#enrol" className="btn btn-primary">Download Brochure ↓</a>
              <a href="#curriculum" className="btn btn-outline">View Curriculum →</a>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'rgba(255,255,255,.12)',borderRadius:'var(--radius-md)',overflow:'hidden'}}>
              {[['6','Bimesters'],['40','Credits (UGC)'],['1,200','Hours'],['12','Capstones'],['52','Guest Lectures'],['16','Career Roles']].map(([num,lbl]) => (
                <div key={lbl} style={{background:'rgba(255,255,255,.04)',padding:'20px 16px',textAlign:'center'}}>
                  <div style={{fontFamily:'var(--font-display)',fontSize:28,fontWeight:800,color:'var(--gold2)',lineHeight:1,letterSpacing:'-0.03em'}}>{num}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:400,color:'rgba(255,255,255,.55)',marginTop:4}}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'var(--radius-xl)',padding:32,backdropFilter:'blur(8px)'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,color:'rgba(255,255,255,.5)',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:6}}>6 Stackable Certificates</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'#fff',marginBottom:4,letterSpacing:'-0.01em'}}>Build credentials every 2 months</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:400,color:'rgba(255,255,255,.55)',marginBottom:4}}>Never wait 12 months for your first credential</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:20}}>
                {CERTS_DATA.map((c,i) => (
                  <div key={c.bi} style={{display:'flex',alignItems:'center',gap:12,background:i===5?'rgba(212,160,23,.08)':'rgba(255,255,255,.06)',borderRadius:10,padding:'10px 14px',border:`1px solid ${i===5?'rgba(212,160,23,.4)':'rgba(255,255,255,.1)'}`}}>
                    <div style={{width:8,height:8,borderRadius:'50%',flexShrink:0,background:c.color}} />
                    <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:500,color:i===5?'var(--gold2)':'rgba(255,255,255,.9)',flex:1}}>{c.name}</div>
                    <div style={{fontFamily:'var(--font-mono)',fontSize:10,fontWeight:500,color:'rgba(255,255,255,.45)'}}>{c.bi}</div>
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

// ─── OVERVIEW STRIP ───────────────────────────────────────────────────────────
function OverviewStrip() {
  const pills = [
    ['📅','12 Months · 6 Bimesters'],['🎓','40 Credits (1 credit = 30 hrs)'],
    ['💻','100% Online · Live + Async'],['🏆','6 Industry Certificates'],
    ['🤖','EcoPro AI-Powered LMS'],['📊','52 Case Studies'],
    ['🎤','52 Saturday Guest Lectures'],['🚀','Placement Guarantee Support'],
  ];
  return (
    <div style={{background:'var(--mist)',borderTop:'1px solid var(--cloud)',borderBottom:'1px solid var(--cloud)'}}>
      <div className="container">
        <div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center',alignItems:'center',padding:'20px 0'}}>
          {pills.map(([icon,text]) => (
            <div key={text} style={{display:'flex',alignItems:'center',gap:8,background:'var(--white)',border:'1px solid var(--cloud)',borderRadius:99,padding:'8px 16px',fontFamily:'var(--font-body)',fontSize:13,fontWeight:500,color:'var(--navy)',boxShadow:'var(--shadow-sm)'}}>
              <span style={{fontSize:16}}>{icon}</span>{text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CURRICULUM (BIMESTER TABS) ───────────────────────────────────────────────
function CurriculumSection() {
  const [activeBi, setActiveBi] = useState(0);

  const biData = [
    {
      period:'Months 1–2 · Foundation',
      theme:'BFSI Foundations, FinTech Revolution & Professional Communication',
      cert:{label:'🎓 Certificate Awarded',name:'Certified BFSI & FinTech Professional (CBFP)'},
      meta:[['6–7','Credits'],['2','Capstones'],['9','Guest Lectures'],['9','Case Studies']],
      courses:['BFSI Foundation Excellence','FinTech Revolution','Future of Banking','Communication & Professional Writing','Management Principles & Leadership'],
      tools:['Banking Simulator · Excel · Power BI (basics)','SQL (intro) · RBI/SEBI portals · LinkedIn','Conversational AI · MS Office Suite'],
      milestone:'CBFP Certificate · Resume baseline · LinkedIn profile live · Cohort onboarding',
      sidebarBg:'var(--navy)',
      topics:[
        {num:1,color:'#3B82F6',title:'Modern Banking & Financial Ecosystem',tags:[{t:'Core',c:'default'},{t:'All roles',c:'teal'}],items:["India's financial regulatory architecture: RBI, SEBI, IRDAI, PFRDA","PSBs, private banks, SFBs, payment banks, NBFCs — classification","How banks make money: NIM, fee income, float","BFSI KPIs: GNPA, CASA, CAR, NIM, Cost-to-Income","Reading annual reports: HDFC Bank, Axis, Zerodha","Credit rating ecosystem: CRISIL, ICRA, CARE, ACUITÉ","India Stack: Aadhaar, UPI, DigiLocker, CKYC, AA","Priority sector lending and financial inclusion"]},
        {num:2,color:'#3B82F6',title:'FinTech Revolution & Digital Payments',tags:[{t:'Core',c:'default'},{t:'PM · Growth · RM · Content',c:'gold'}],items:["FinTech verticals: PayTech, LendingTech, WealthTech, InsurTech, RegTech","UPI 2.0, UPI Lite, Credit on UPI, UPI One World","CBDC (e-Rupee): design, RBI pilot, use cases","Account Aggregator framework: FIP, FIU, consent","ONDC credit layer, BNPL, embedded finance","Business models: Razorpay, CRED, PhonePe, Slice, Zerodha","Global benchmarks: Stripe, Nubank, Revolut, Monzo","Platform economics: network effects, data moats, API monetisation"]},
        {num:3,color:'#3B82F6',title:'Regulatory Foundations & Professional Communication',tags:[{t:'Core',c:'default'},{t:'RM · Content · Compliance',c:'purple'}],items:["KYC/AML basics: V-CIP, digital KYC, CKYC, PEP screening","DPDPA 2023: overview, obligations, BFSI impact","Payment aggregator licensing, RBI sandbox","Professional writing: emails, reports, client notes","LinkedIn thought leadership for BFSI professionals","Presentation skills: pitch structure, storytelling","Banking product fluency: CASA, loans, FD, insurance","Client communication etiquette for RM and Wealth roles"]},
      ],
      capstones:[
        {title:'CP1 (Build)','desc':'FinTech Landscape Intelligence Dashboard — Power BI mapping India\'s top 50 FinTechs by sector, funding, and regulatory status'},
        {title:'CP2 (Simulation)','desc':'UPI Outage War Room — 3-hour crisis simulation; students play Operations, Comms, Product, and Regulatory roles'},
      ],
    },
    {
      period:'Months 3–4 · Data & Wealth',
      theme:'Data, Wealth & Lending Intelligence',
      cert:{label:'🎓 Certificate Awarded',name:'Certified Data & Wealth Intelligence Analyst (CDWIA)'},
      meta:[['6–7','Credits'],['2','Capstones'],['9','Lectures'],['9','Cases']],
      courses:['Data to Decisions (Power BI)','Data Management & Governance','WealthTech & Investment Products','LendingTech & Digital Credit','ESG Concepts in Finance','Client Advisory & Financial Planning','ITIL Foundation & SDLC'],
      tools:['SQL: complex queries, window functions, CTEs','Power BI: DAX, star schema, row-level security','Python: pandas, numpy (Google Colab)'],
      milestone:'CDWIA Certificate · First portfolio dashboard live · Internship eligibility activated',
      sidebarBg:'var(--teal)',
      topics:[
        {num:4,color:'#10B981',title:'SQL & Excel for BFSI Analytics',tags:[{t:'Core',c:'default'},{t:'Data · Credit · PM · BA',c:'teal'}],items:["SQL: SELECT, WHERE, GROUP BY, window functions, CTEs","BFSI SQL patterns: NPA aging, customer 360, fraud alerts","Excel: loan amortisation, DSCR, NPV, IRR, XIRR","Pivot tables, VLOOKUP, INDEX-MATCH for BFSI data","Python basics: pandas, numpy, matplotlib (Google Colab)","Customer analytics: RFM segmentation, cohort analysis"]},
        {num:5,color:'#10B981',title:'Power BI: BFSI Dashboards & Data Visualisation',tags:[{t:'Core',c:'default'},{t:'Data · Risk · RM · Wealth',c:'teal'}],items:["Data modelling, relationships, star schema for banking","DAX measures: NIM, CAR, collection efficiency","Row-level security for branch/region data","Scheduled refresh, Power BI Service, sharing","BFSI KPI dashboard: NPA, CASA, loan book health","Wealth Manager: client portfolio performance dashboard"]},
        {num:6,color:'#10B981',title:'WealthTech, LendingTech & Client Advisory',tags:[{t:'Core',c:'default'},{t:'Wealth Manager · RM · Content',c:'gold'}],items:["Investment products: MF, PMS, AIF, bonds, ETFs, NPS, ULIPs","Goal-based financial planning: retirement, education, home","SEBI RIA framework: advisory vs distribution","WealthTech platforms: Zerodha Kite/Coin, INDmoney, Groww","LendingTech: co-lending, ONDC credit, MSME gap, BNPL","ESG investing: green bonds, sustainability-linked lending","Credit bureau: interpreting CIBIL reports for customers","Investment content writing: SIP explainers, fund analysis"]},
      ],
      capstones:[
        {title:'CP3 (Build)','desc':'Lending Intelligence Dashboard — SQL + Python + Power BI for a fictional digital NBFC\'s loan book health, NPA aging, and collections'},
        {title:'CP4 (Simulation)','desc':'WealthTech Client Crisis — Equity market crash simulation; manage HNI client communication, SEBI disclosure, and portfolio rebalancing'},
      ],
    },
    {
      period:'Months 5–6 · AI & RegTech',
      theme:'AI in Banking, RegTech, Compliance & Digital Content Strategy',
      cert:{label:'🎓 Certificate Awarded',name:'Certified AI & RegTech Compliance Analyst (CARCA)'},
      meta:[['6–7','Credits'],['2','Capstones'],['9','Lectures'],['9','Cases']],
      courses:['AI in Banking','RegTech & Compliance Automation','DPDPA 2023 for BFSI','Auditing (IS Audit & Risk-Based)','Agile · SDLC · PMP & QA Concepts','Digital Content Strategy for BFSI'],
      tools:['Claude API · OpenAI API · LangChain','OpenClaw · n8n · Streamlit · Postman','ComplyAdvantage · Veriph.io · Canva'],
      milestone:'CARCA Certificate · GenAI prototype in portfolio · First published BFSI content pieces',
      sidebarBg:'var(--purple)',
      topics:[
        {num:7,color:'#8B5CF6',title:'GenAI & AI Applications in Banking',tags:[{t:'Core',c:'default'},{t:'GenAI · AI/ML · PM · Content',c:'purple'}],items:["LLMs: transformers, tokens, context windows (intuition)","Prompt engineering: zero-shot, few-shot, chain-of-thought","RAG: chunking, vector search, LangChain pipeline","Claude API + OpenAI: BFSI document analysis prototypes","n8n: no-code compliance automation workflows","OpenClaw: AI contract intelligence for banking agreements","Fraud detection: rule-based → ML → LLM-augmented","Responsible AI: XAI, bias, RBI AI guidelines"]},
        {num:8,color:'#8B5CF6',title:'RegTech, DPDPA & Compliance Frameworks',tags:[{t:'Core',c:'default'},{t:'Compliance · RegTech · Content',c:'purple'}],items:["DPDPA 2023: obligations, consent, breach notification","AML typologies: layering, structuring, TBML","ComplyAdvantage: AML screening, PEP, sanctions","Signzy / Veriph.io: digital KYC, V-CIP workflow","IS audit: ISAE 3402, three lines of defence","Regulatory writing: RBI circulars → plain-language articles","SEO for BFSI content: E-E-A-T, keyword strategy","AI-assisted writing: Claude for BFSI drafts and research"]},
      ],
      capstones:[
        {title:'CP5 (Build)','desc':'GenAI Regulatory Assistant — Claude API + LangChain RAG + Streamlit; answers RBI Master Direction queries with source citations'},
        {title:'CP6 (Simulation)','desc':'DPDPA Compliance Audit — audit a fictional NBFC against 10 DPDPA obligations; produce board-ready remediation plan'},
      ],
    },
    {
      period:'Months 7–8 · AI Product & Placement',
      theme:'AI Product Management, Process Excellence, InsurTech & Placement Readiness',
      cert:{label:'🎓 Certificate Awarded',name:'Certified AI Product Manager — BFSI (CAPM-BFSI)'},
      meta:[['7','Credits'],['2','Capstones'],['9','Lectures'],['9','Cases']],
      courses:['AI Product Management','Six Sigma (Yellow Belt · DMAIC)','ITIL Foundation (IT Service Mgmt)','InsurTech & Embedded Insurance','Placement Readiness Bootcamp'],
      tools:['Resume + LinkedIn overhaul (ATS)','100-Q BFSI interview bank by track','Case interview mastery + STAR method','Mock Interview 1 (industry practitioner)','Salary negotiation playbook'],
      milestone:'CAPM-BFSI Certificate · Mock Interview 1 done · ATS resume live · Interview pipeline opens',
      sidebarBg:'var(--coral)',
      topics:[
        {num:9,color:'#E05A2B',title:'AI Product Management for BFSI',tags:[{t:'Core',c:'default'},{t:'PM · BA · GenAI · Consulting',c:'coral'}],items:["Product discovery in regulated markets: JTBD, user interviews","PRD writing for AI products: model cards, XAI requirements","Figma wireframing: banking product screens, user flows","Agile/SAFe in BFSI: PI Planning, compliance gates","Lovable + Emergent: no-code BFSI product prototyping","Agentic AI (CrewAI): multi-agent banking workflows","Product metrics: activation, D30/D90 retention, NPS","InsurTech: POSP, embedded insurance cross-sell for RM/WM"]},
        {num:10,color:'#E05A2B',title:'Process Excellence: Six Sigma & ITIL',tags:[{t:'Core',c:'default'},{t:'Consulting · RM · Operations',c:'coral'}],items:["Six Sigma DMAIC: process mapping, SIPOC, control charts","Banking process improvement: TAT reduction, complaint mgmt","ITIL 4: incident, problem, change management in banking IT","Change management: TSB disaster lessons, DBS success story","Canva: investment proposals, BFSI content portfolio build","Content portfolio: 8+ published pieces including 1 white paper"]},
      ],
      capstones:[
        {title:'CP7 (Build)','desc':'AI Credit Underwriting Assistant — PRD + LangChain + Claude API working prototype with Lovable frontend'},
        {title:'CP8 (Simulation)','desc':'RBI Regulatory Inspection Response — simulate inspection with real-time query responses, compliance dossier, board briefing'},
      ],
    },
    {
      period:'Months 9–10 · Digital Banking',
      theme:'Digital Banking, Enterprise Software, Wealth Advisory & FinTech Strategy',
      cert:{label:'🎓 Certificate Awarded',name:'Certified Digital Banking & FinTech Strategist (CDBFS)'},
      meta:[['6–7','Credits'],['2','Capstones'],['9','Lectures'],['9','Cases']],
      courses:['Digital Banking & Core Banking Systems','Relationship Banking Excellence','Wealth Advisory Practice','FinTech Strategy & Competitive Analysis','Enterprise Software Labs'],
      tools:['Oracle FLEXCUBE (loans, CASA, accounts)','SAP BFSI (GL, reconciliation, reporting)','Infosys Finacle overview','Salesforce / Zoho CRM (RM + Wealth)','NPCI UPI Sandbox · Razorpay · Stripe API'],
      milestone:'CDBFS Certificate · Enterprise software literacy · Active placement drive begins',
      sidebarBg:'#1565A0',
      topics:[
        {num:11,color:'#1565A0',title:'Digital Banking, BaaS & Enterprise Technology',tags:[{t:'Core',c:'default'},{t:'BA · RM · Consulting · PM',c:'teal'}],items:["Core banking modernisation: legacy → cloud-native","Oracle FLEXCUBE: loan origination, account management","SAP BFSI: GL entries, regulatory reporting, reconciliation","BaaS, embedded finance, API economy in banking","Cross-border payments: UPI global, SWIFT, stablecoins","Digital lending: LOS, LMS, collections tech, Finbox API","Salesforce CRM: client portfolio, pipeline, AUM tracking","FinTech M&A: valuation, strategic rationale, integration"]},
        {num:12,color:'#1565A0',title:'Wealth Advisory Practice & Relationship Banking',tags:[{t:'Core',c:'default'},{t:'Wealth Manager · RM · Content',c:'gold'}],items:["IPS (Investment Policy Statement) writing for HNI clients","Portfolio review decks: performance attribution, rebalancing","Client communication: HNI tone, frequency, format","Branch performance analytics: NPS, wallet share, cross-sell","RM pipeline management: Salesforce activity tracking","CXO ghostwriting: LinkedIn posts, op-eds for BFSI leaders","FinTech strategy: Porter's Five Forces, Blue Ocean applied","ESG and climate finance: green products, TCFD framework"]},
      ],
      capstones:[
        {title:'CP9 (Build)','desc':'Digital Banking Product Prototype — full-clickable neobank for India\'s salaried professional using Lovable + Figma'},
        {title:'CP10 (Simulation)','desc':'FinTech Series A Data Room — pitch deck, 3-year financial model, 15-document data room, investor Q&A simulation'},
      ],
    },
    {
      period:'Months 11–12 · Capstone & Launch',
      theme:'Industry Immersion, Major Capstone, Content Portfolio & Career Launch',
      cert:{label:'🎓 Master Certificate',name:'Post Graduate Diploma in FinTech, Banking & AI — PGDFBA',isMaster:true},
      meta:[['6–7','Credits'],['2','Capstones'],['9','Lectures'],['9','Cases']],
      courses:['Track A: AI PM — Integrated AI Banking Workflow','Track B: Risk — Full-Firm NBFC Risk Simulation','Track C: FinTech — Business Strategy & Launch','Track D: Wealth — 5-Client Advisory Portfolio','Track E: Content — BFSI Content Strategy Launch'],
      tools:['Mock Interview 2 (industry practitioner)','15+ piece content portfolio published','Placement drive + hiring network activation'],
      milestone:'PGDFBA Master Certificate · 2 Mock Interviews done · Full portfolio launched · Job offers',
      sidebarBg:'var(--ink)',
      topics:[
        {num:13,color:'#374151',title:'Major Industry Capstone (9 weeks)',tags:[{t:'Portfolio',c:'default'},{t:'All roles · Industry jury',c:'teal'}],items:["Weeks 1–2: Problem scoping + mentor green-light","Weeks 3–5: Research, analysis, data work","Weeks 6–9: Solution build, peer review, refinement","Week 10: 15-min jury presentation + 10-min Q&A","Best projects: LinkedIn case study + Upskillize showcase","CP11: n8n + Claude API + Lovable integrated workflow","CP12: Full-firm NBFC risk simulation — board-ready report","Jury: 1 Upskillize mentor + 1 industry practitioner"]},
        {num:14,color:'#374151',title:'Career Launch, Alumni Network & Post-Programme Roadmap',tags:[{t:'Career',c:'default'},{t:'All 16 roles',c:'gold'}],items:["BFSI career map: 40+ roles, skills, and salary mapped","Content portfolio: 15+ published pieces, author brand","Certification stacking post-PGDFBA: FRM, CFA, PRMIA, CAIP","LinkedIn content strategy: build domain authority in BFSI","Alumni network: cohort LinkedIn group, peer referrals","PRMIA Bangalore Chapter: events, networking, student membership","90-day career activation plan with measurable milestones","Personal board of directors: building lifelong career network"]},
      ],
      capstones:[
        {title:'CP11 (Build)','desc':'Integrated AI Banking Workflow — n8n + Claude API + Lovable: full loan origination-to-disbursement with AI underwriting and compliance layer'},
        {title:'CP12 (Simulation)','desc':'Full-Firm NBFC Risk Simulation — board-ready risk report: credit risk, liquidity risk, operational risk, and regulatory compliance dashboard'},
      ],
    },
  ];

  const curr = biData[activeBi];
  const tabLabels = ['B1 · Foundations','B2 · Data & Wealth','B3 · AI & RegTech','B4 · AI Product & Placement','B5 · Digital Banking','B6 · Capstone & Launch'];

  return (
    <section className="section" id="curriculum">
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">Programme Architecture</div>
          <h2 className="h1">6-Bimester Curriculum</h2>
          <p className="lead">Every 2 months builds new industry skills, ends with a capstone project, and awards a recognised certificate. The bimester rhythm keeps you industry-connected, not academically isolated.</p>
        </div>

        <div className="bi-tabs">
          {tabLabels.map((lbl, i) => (
            <button key={i} className="bi-tab" onClick={() => setActiveBi(i)}
              style={activeBi===i ? {background:BI_COLORS[i],color:'#fff',borderColor:BI_COLORS[i]} : {}}>
              {lbl}
            </button>
          ))}
        </div>

        <div className="bi-content">
          <div className="bi-sidebar" style={{background:curr.sidebarBg}}>
            <div className="bi-period">{curr.period}</div>
            <div className="bi-theme">{curr.theme}</div>
            <div className="bi-cert-box" style={curr.cert.isMaster ? {borderColor:'rgba(212,160,23,.4)',background:'rgba(212,160,23,.08)'} : {}}>
              <div className="cert-label">{curr.cert.label}</div>
              <div className="cert-name" style={curr.cert.isMaster ? {color:'var(--gold2)'} : {}}>{curr.cert.name}</div>
            </div>
            <div className="bi-meta">
              {curr.meta.map(([v,l]) => <div key={l} className="bi-meta-item"><div className="mn">{v}</div><div className="ml">{l}</div></div>)}
            </div>
            <div className="bi-section-label">Upskillize Courses</div>
            <div className="bi-courses">{curr.courses.map(c => <div key={c} className="bi-course">{c}</div>)}</div>
            <div className="bi-section-label">{activeBi===3 ? 'Placement Bootcamp (Month 8)' : activeBi===5 ? 'Major Capstone Tracks' : activeBi===4 ? 'Enterprise Software Labs' : 'Key Tools'}</div>
            <div className="bi-courses">{curr.tools.map(t => <div key={t} className="bi-course">{t}</div>)}</div>
            <div className="bi-section-label">Career Milestone</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:500,color:'var(--gold2)',lineHeight:1.5}}>{curr.milestone}</div>
          </div>

          <div>
            {curr.topics.map(topic => (
              <div key={topic.num} className="topic-card">
                <div className="tc-head">
                  <div className="tc-num" style={{background:topic.color}}>{topic.num}</div>
                  <div className="tc-title">{topic.title}</div>
                </div>
                <div className="tc-tags">
                  {topic.tags.map(tg => (
                    <span key={tg.t} className={`tag${tg.c==='default'?'':` tag-${tg.c}`}`}>{tg.t}</span>
                  ))}
                </div>
                <div className="tc-list">
                  {topic.items.map(item => <div key={item} className="tc-item">{item}</div>)}
                </div>
              </div>
            ))}
            <div style={{background:'var(--mist)',borderRadius:'var(--radius-md)',padding:'16px 20px',border:'1px solid var(--cloud)'}}>
              <div className="label" style={{marginBottom:8,color:'var(--navy)'}}>B{activeBi+1} Capstone Projects</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {curr.capstones.map(cp => (
                  <div key={cp.title} style={{fontFamily:'var(--font-body)',fontSize:13,fontWeight:400,color:'var(--text)',lineHeight:1.6}}>
                    <strong style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:13,color:'var(--navy)'}}>{cp.title}:</strong> {cp.desc}
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

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────
function CaseStudiesSection() {
  const [filter, setFilter] = useState('all');
  const filters = [
    {id:'all',label:'All 52 Cases'},{id:'india',label:'🇮🇳 India (31)'},{id:'global',label:'🌐 Global (21)'},
    {id:'fintech',label:'FinTech'},{id:'risk',label:'Risk & Failure'},{id:'ai',label:'AI & Data'},
  ];
  const visible = filter==='all' ? CASES : CASES.filter(c => c.cat.includes(filter));
  return (
    <section className="section" id="cases" style={{background:'var(--mist)'}}>
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">52 Real-World Cases</div>
          <h2 className="h1">Case Study Catalogue</h2>
          <p className="lead">60% Indian BFSI context · 40% Global benchmarks. Every case ends with a student-written 500-word case memo submitted to EcoPro LMS.</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginBottom:32}}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,
              padding:'7px 16px',borderRadius:99,
              border:`1.5px solid ${filter===f.id?'var(--navy)':'var(--gray300)'}`,
              background:filter===f.id?'var(--navy)':'var(--white)',
              color:filter===f.id?'var(--white)':'var(--gray500)',
              cursor:'pointer',transition:'var(--transition)',
            }}>{f.label}</button>
          ))}
        </div>
        <div key={filter} style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {visible.map(c => (
            <div key={c.company} className="case-card fade-up">
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:8}}>
                <div className="case-company">{c.company}</div>
                <div className="case-region">{c.region==='India'?'🇮🇳 India':'🌐 Global'}</div>
              </div>
              <div className="case-title">{c.title}</div>
              <div className="case-skill">{c.skill}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GUEST LECTURES ───────────────────────────────────────────────────────────
function GuestLecturesSection() {
  return (
    <section className="section" id="lectures">
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">52 Saturdays · 104 Hours</div>
          <h2 className="h1">Guest Lecture Programme</h2>
          <p className="lead">Every Saturday, a practising BFSI leader joins live. 60-min keynote + 30-min Q&A + 30-min LMS reflection task. Real conversations, not recorded seminars.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:20}}>
          {LECTURES.map(l => (
            <div key={l.num} className="lecture-card fade-up">
              <div className="lecture-number">Session {l.num}</div>
              <div className="lecture-title">{l.title}</div>
              <div className="lecture-speaker">👤 {l.speaker}</div>
              <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:12}}>
                {l.qs.map(q => <div key={q} className="lecture-q">{q}</div>)}
              </div>
              <div className="lecture-task">📋 {l.task}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:28}}>
          <a href="#enrol" className="btn btn-navy">See All 52 Guest Lectures →</a>
        </div>
      </div>
    </section>
  );
}

// ─── RUBRIC ASSESSMENT ────────────────────────────────────────────────────────
function RubricSection() {
  const dimensions = [
    {letter:'R',bg:'rgba(59,130,246,.2)',color:'#60A5FA',title:'Rigour',pts:'20 points',desc:'Depth of analysis, accuracy of data work, correctness of frameworks applied'},
    {letter:'U',bg:'rgba(16,185,129,.2)',color:'#34D399',title:'Usefulness',pts:'20 points',desc:'Industry relevance of solution — would a real BFSI team use this?'},
    {letter:'B',bg:'rgba(139,92,246,.2)',color:'#A78BFA',title:'Build Quality',pts:'20 points',desc:'Technical execution, tool proficiency, code quality, dashboard polish'},
    {letter:'R',bg:'rgba(245,158,11,.2)',color:'#FCD34D',title:'Reasoning',pts:'20 points',desc:'Q&A handling, critical thinking, ability to defend choices under pressure'},
    {letter:'I',bg:'rgba(239,68,68,.2)',color:'#F87171',title:'Impact',pts:'20 points',desc:'Communication quality, presentation clarity, executive presence'},
  ];
  const rows = [
    {label:'Weekly Self-Assessment Test (WSAT)',freq:'52 (every Sunday)',format:'20 MCQ + 2 short answer',weight:'10%',pass:'50%',dist:'80%'},
    {label:'Module-End Test (MET)',freq:'12 (2 per Bimester)',format:'40 MCQ + 1 case analysis',weight:'25%',pass:'60%',dist:'80%'},
    {label:'Capstone Project (RUBRIC-scored)',freq:'12 (2 per Bimester)',format:'Live jury: 15-min + Q&A',weight:'40%',pass:'60/100',dist:'80/100'},
    {label:'Guest Lecture Engagement',freq:'52 (weekly LMS task)',format:'Reflection / quiz',weight:'10%',pass:'Submit',dist:'Quality score ≥8/10'},
    {label:'Participation & LMS Activity',freq:'Continuous',format:'Attendance, forum, peer review',weight:'15%',pass:'≥75% attendance',dist:'≥90% attendance'},
  ];
  return (
    <section className="section" id="rubric" style={{background:'var(--navy)',color:'var(--white)'}}>
      <div className="container">
        <div className="sec-header fade-up" style={{maxWidth:680,margin:'0 auto 48px'}}>
          <span className="accent-line" style={{background:'linear-gradient(90deg,var(--gold2),var(--teal2))'}} />
          <div className="label" style={{color:'rgba(255,255,255,.5)'}}>Assessment Framework</div>
          <h2 className="h1" style={{color:'var(--white)'}}>RUBRIC Assessment Model</h2>
          <p style={{fontFamily:'var(--font-body)',fontWeight:400,color:'rgba(255,255,255,.65)',fontSize:16,lineHeight:1.7}}>Every capstone project is evaluated on a transparent 100-point rubric across 5 dimensions. Industry practitioners co-evaluate with Upskillize mentors — ensuring real-world standards, not academic ones.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginTop:40}}>
          {dimensions.map(d => (
            <div key={d.title} style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'var(--radius-md)',padding:20,textAlign:'center',transition:'var(--transition)'}}>
              <div style={{width:52,height:52,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:24,fontWeight:800,letterSpacing:'-0.02em',margin:'0 auto 12px',background:d.bg,color:d.color}}>{d.letter}</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,letterSpacing:'-0.01em',marginBottom:6,color:'var(--white)'}}>{d.title}</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,color:'rgba(255,255,255,.5)',marginBottom:8,letterSpacing:'0.04em'}}>{d.pts}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:400,color:'rgba(255,255,255,.65)',lineHeight:1.5}}>{d.desc}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:40}}>
          <div className="rubric-row header" style={{background:'rgba(255,255,255,.08)'}}>
            {['Assessment Component','Frequency','Format','Weight','Pass','Distinction'].map(h => (
              <div key={h} className="rubric-cell header-cell" style={{color:'var(--gold2)',borderColor:'rgba(255,255,255,.06)'}}>{h}</div>
            ))}
          </div>
          {rows.map(r => (
            <div key={r.label} className="rubric-row" style={{background:'rgba(255,255,255,.04)'}}>
              <div className="rubric-cell label-col" style={{color:'rgba(255,255,255,.9)',borderColor:'rgba(255,255,255,.06)'}}>{r.label}</div>
              <div className="rubric-cell" style={{color:'rgba(255,255,255,.65)',borderColor:'rgba(255,255,255,.06)',textAlign:'center'}}>{r.freq}</div>
              <div className="rubric-cell" style={{color:'rgba(255,255,255,.65)',borderColor:'rgba(255,255,255,.06)',textAlign:'center'}}>{r.format}</div>
              <div className="rubric-cell" style={{color:'rgba(255,255,255,.65)',borderColor:'rgba(255,255,255,.06)',textAlign:'center'}}>{r.weight}</div>
              <div className="rubric-cell" style={{color:'rgba(255,255,255,.65)',borderColor:'rgba(255,255,255,.06)',textAlign:'center'}}>{r.pass}</div>
              <div className="rubric-cell" style={{color:'rgba(255,255,255,.65)',borderColor:'rgba(255,255,255,.06)',textAlign:'center'}}>{r.dist}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CREDITS ──────────────────────────────────────────────────────────────────
function CreditsSection() {
  const creditRows = [
    {bi:'B1',theme:'BFSI Foundations',cert:'CBFP',certColor:'var(--teal)',domain:'3.0',applied:'1.5',immersion:'1.2',career:'0',total:'6.6',hrs:'198'},
    {bi:'B2',theme:'Data & Wealth',cert:'CDWIA',certColor:'var(--teal)',domain:'3.0',applied:'1.5',immersion:'1.2',career:'0',total:'6.6',hrs:'198'},
    {bi:'B3',theme:'AI & RegTech',cert:'CARCA',certColor:'var(--teal)',domain:'3.0',applied:'1.5',immersion:'1.2',career:'0',total:'6.6',hrs:'198'},
    {bi:'B4',theme:'AI Product & Placement',cert:'CAPM-BFSI',certColor:'var(--teal)',domain:'2.5',applied:'1.5',immersion:'1.0',career:'2.0',total:'7.0',hrs:'210'},
    {bi:'B5',theme:'Digital Banking',cert:'CDBFS',certColor:'var(--teal)',domain:'2.5',applied:'2.0',immersion:'1.2',career:'0',total:'6.6',hrs:'198'},
    {bi:'B6',theme:'Capstone & Launch',cert:'PGDFBA',certColor:'var(--gold)',domain:'1.0',applied:'3.0',immersion:'1.0',career:'1.6',total:'6.6',hrs:'198'},
  ];
  return (
    <section className="section-sm" id="credits">
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">UGC-Aligned Credit System</div>
          <h2 className="h1">40 Course Credits · 1,200 Hours</h2>
          <p className="lead">1 Credit = 30 Instructional Hours as per UGC standard. Credits are earned progressively across all 6 bimesters — students receive partial credentials even if they exit early.</p>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className="credits-table">
            <thead>
              <tr>
                {['Bimester','Theme','Certificate','Domain Credits','Applied Credits','Immersion Credits','Career Credits','Total Credits','Hours'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {creditRows.map(r => (
                <tr key={r.bi}>
                  <td>{r.bi}</td>
                  <td>{r.theme}</td>
                  <td><span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:600,color:r.certColor,letterSpacing:'0.04em'}}>{r.cert}</span></td>
                  <td>{r.domain}</td><td>{r.applied}</td><td>{r.immersion}</td><td>{r.career}</td>
                  <td><strong>{r.total}</strong></td><td>{r.hrs}</td>
                </tr>
              ))}
              <tr className="total">
                <td colSpan={3}>TOTAL</td>
                <td>15.0</td><td>11.0</td><td>6.8</td><td>3.6</td><td>40 Credits</td><td>1,200 hrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS & TOOLS ───────────────────────────────────────────────────────────
function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState(Object.keys(SKILLS_DATA)[0]);
  const cats = Object.keys(SKILLS_DATA);
  return (
    <section className="section" id="tools">
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">Tools Ecosystem · 25+ Platforms</div>
          <h2 className="h1">Skills & Tools You Will Master</h2>
          <p className="lead">Every tool is taught in context — not as a standalone tutorial, but woven into real BFSI use cases and capstone projects.</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:28}}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveSkill(cat)} style={{
              fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,
              padding:'8px 16px',borderRadius:99,
              border:`1.5px solid ${activeSkill===cat?'var(--teal2)':'var(--cloud)'}`,
              background:activeSkill===cat?'var(--teal2)':'var(--white)',
              color:activeSkill===cat?'var(--white)':'var(--gray500)',
              cursor:'pointer',transition:'var(--transition)',
            }}>{cat}</button>
          ))}
        </div>
        <div key={activeSkill} style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:14}}>
          {SKILLS_DATA[activeSkill].map(s => (
            <div key={s.name} className="skill-item fade-up">
              <div className="si-icon">{s.icon}</div>
              <div className="si-name">{s.name}</div>
              <div className="si-desc">{s.desc}</div>
              <div className="skill-level">
                {Array.from({length:5},(_,i) => <span key={i} className={i<s.level?'filled':''} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ECOPRO LMS ───────────────────────────────────────────────────────────────
function LMSSection() {
  const features = [
    {icon:'📹',bg:'rgba(16,185,129,.2)',title:'Live Session Recording & AI Transcription',desc:'Every weekday session auto-transcribed, timestamped, and searchable. Ask the LMS "what did we cover on credit scoring in Week 6?" and get exact timestamps.'},
    {icon:'🤖',bg:'rgba(139,92,246,.2)',title:'AI Interview Simulation Engine',desc:'Unlimited AI-powered mock interviews from B4 onwards. Domain round, case study round, and HR round — with role-specific question banks and detailed feedback reports.'},
    {icon:'📊',bg:'rgba(245,158,11,.2)',title:'RUBRIC Auto-Scoring & Capstone Portal',desc:'Submit capstone artifacts, Loom walkthroughs, and GitHub links. RUBRIC pre-scoring by AI, final jury scoring by industry practitioners — all tracked on your dashboard.'},
    {icon:'📋',bg:'rgba(59,130,246,.2)',title:'Weekly WSAT Auto-Grading',desc:'Tests open Saturday midnight, close Sunday midnight. Auto-graded with full answer explanations visible Monday morning. Lowest 3 WSATs auto-dropped from grade.'},
    {icon:'💼',bg:'rgba(239,68,68,.2)',title:'Career Hub & Job Board',desc:'Curated BFSI job postings matched to your track, location, and credit progress. Direct referral pipeline to 50+ Upskillize hiring partners.'},
    {icon:'🎓',bg:'rgba(10,122,111,.2)',title:'Digital Certificate Wallet',desc:'Blockchain-verified certificate issued within 7 days of each bimester completion. LinkedIn-shareable badge. Employer verification portal for hiring companies.'},
  ];
  const agents = [
    {name:'KnowledgeBot — Content Q&A Agent',desc:'Answers student questions from all session transcripts, uploaded PDFs, and RBI/SEBI regulatory documents. Uses RAG on Upskillize\'s entire BFSI knowledge base.'},
    {name:'TestForge — Assessment Generator',desc:'Generates personalised WSAT questions aligned to each student\'s weak areas. Creates new question variants for revision — no two students see identical tests.'},
    {name:'MockMentor — AI Interview Simulator',desc:'Simulates BFSI interviews: domain round, case study round, HR round. Evaluates answer quality, STAR structure, and BFSI accuracy. Generates improvement plans.'},
    {name:'CaseCoach — Case Study Review Agent',desc:'Reviews student-submitted case memos. Scores on analysis depth, recommendation quality, and BFSI accuracy. Returns structured feedback within 2 hours.'},
    {name:'RubricJudge — Capstone Pre-Scoring Agent',desc:'Pre-scores capstone submissions on all 5 RUBRIC dimensions before the human jury review. Flags gaps students can address before the live presentation.'},
    {name:'CareerNavigator — Placement Intelligence Agent',desc:'Matches student profiles to BFSI job opportunities. Suggests resume improvements, flags skill gaps vs target JDs, and tracks application pipeline with nudges.'},
  ];
  return (
    <section className="section" id="lms" style={{background:'linear-gradient(135deg,var(--navy) 0%,var(--slate) 60%,#0F3460 100%)',color:'var(--white)'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'center'}}>
          <div>
            <div className="label" style={{color:'rgba(255,255,255,.5)',marginBottom:12}}>Powered by AI</div>
            <h2 className="h1" style={{color:'var(--white)',marginBottom:12}}>EcoPro LMS — India's First<br /><span style={{color:'var(--gold2)'}}>Agentic AI Learning Platform</span></h2>
            <p style={{fontFamily:'var(--font-body)',fontWeight:400,color:'rgba(255,255,255,.65)',fontSize:15,lineHeight:1.7,marginBottom:8}}>EcoPro is not a video library. It is a living, adaptive, AI-powered learning environment — built specifically for industry-immersive BFSI education at Upskillize.</p>
            <div style={{display:'flex',flexDirection:'column',gap:14,marginTop:28}}>
              {features.map(f => (
                <div key={f.title} style={{display:'flex',alignItems:'flex-start',gap:14,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'var(--radius-md)',padding:16,transition:'var(--transition)'}}>
                  <div style={{width:42,height:42,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0,background:f.bg}}>{f.icon}</div>
                  <div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,letterSpacing:'-0.01em',marginBottom:2,color:'var(--white)'}}>{f.title}</div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:400,color:'rgba(255,255,255,.65)',lineHeight:1.5}}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'var(--radius-xl)',padding:28}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700,letterSpacing:'-0.02em',marginBottom:6,color:'var(--white)'}}>6 Agentic AIs in EcoPro LMS</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:13,fontWeight:400,color:'rgba(255,255,255,.6)',marginBottom:24,lineHeight:1.6}}>Multi-agent AI architecture — each agent specialises in one learning function, collaborating to create an adaptive, personalised experience for every student.</div>
            {agents.map(a => (
              <div key={a.name} className="agent-item">
                <div className="agent-dot" />
                <div>
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CAREERS ──────────────────────────────────────────────────────────────────
function CareersSection() {
  const [activeCluster, setActiveCluster] = useState(Object.keys(CAREERS_DATA)[0]);
  const clusters = Object.keys(CAREERS_DATA);
  const demandClass = (d) => d==='Very High'||d==='Exploding' ? 'demand-high' : d==='Growing' ? 'demand-growing' : 'demand-medium';
  return (
    <section className="section" id="careers" style={{background:'var(--gray50)'}}>
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">16 Career Pathways</div>
          <h2 className="h1">Where PGDFBA Takes You</h2>
          <p className="lead">Every module, tool, and assessment maps to real roles at banks, NBFCs, FinTechs, and consulting firms. Discover your career cluster below.</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:28}}>
          {clusters.map(c => (
            <button key={c} onClick={() => setActiveCluster(c)} style={{
              fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,
              padding:'8px 16px',borderRadius:99,
              border:`1.5px solid ${activeCluster===c?CAREERS_DATA[c].color:'var(--cloud)'}`,
              background:activeCluster===c?CAREERS_DATA[c].color:'var(--white)',
              color:activeCluster===c?'var(--white)':'var(--gray500)',
              cursor:'pointer',transition:'var(--transition)',
            }}>{c}</button>
          ))}
        </div>
        <div key={activeCluster} style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
          {CAREERS_DATA[activeCluster].roles.map(r => (
            <div key={r.role} className="career-card fade-up">
              <div className="career-role">{r.role}</div>
              <div className="career-ctc" style={{color:CAREERS_DATA[activeCluster].color}}>{r.ctc}</div>
              <div className={demandClass(r.demand)}>{r.demand} demand</div>
              <div className="career-companies">{r.cos}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {r.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DELIVERY ─────────────────────────────────────────────────────────────────
function DeliverySection() {
  const cards = [
    {icon:'🎙️',title:'Live Weekday Sessions',desc:'4 hours daily, Mon–Fri. Split: 2 hrs instruction + 1 hr case/lab + 1 hr Q&A. Recorded and uploaded to EcoPro LMS within 24 hours for revision.'},
    {icon:'🎤',title:'Saturday Guest Lectures',desc:'Every Saturday: 2-hour live industry session. 60-min keynote + 30-min student Q&A + 30-min LMS reflection task. 52 Saturdays = 104 hours of live industry access.'},
    {icon:'📝',title:'Sunday Assessments',desc:'WSAT window: Saturday midnight to Sunday midnight. Auto-graded. Results and detailed answer explanations visible Monday morning. Builds a weekly learning habit.'},
    {icon:'💻',title:'EcoPro LMS — Async',desc:'Watch recorded sessions, access case study materials, submit assignments, track credits, practice AI interview simulation — available 24/7 on any device.'},
    {icon:'👤',title:'1:1 Mentor Support',desc:'Every student gets an assigned industry mentor from Day 1. 45-min onboarding + 30-min check-in per bimester + open async chat on EcoPro LMS.'},
    {icon:'🚀',title:'Internship & Placement',desc:'Internship support from B3 onwards. Virtual internship available if external not secured. Placement drive active from B5. 2 live mock interviews. 50+ hiring partners.'},
  ];
  return (
    <section className="section" id="delivery">
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">100% Online · Industry-Connected</div>
          <h2 className="h1">How the Programme Is Delivered</h2>
          <p className="lead">Designed for final-year students with college schedules. Live sessions, recorded backups, Saturday guest lectures, and Sunday assessments — a structured weekly rhythm that builds discipline alongside domain knowledge.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:40}}>
          {cards.map(c => (
            <div key={c.title} className="delivery-card fade-up">
              <div className="delivery-icon">{c.icon}</div>
              <div className="delivery-title">{c.title}</div>
              <div className="delivery-desc">{c.desc}</div>
            </div>
          ))}
        </div>
        <h3 className="h3" style={{marginBottom:20,textAlign:'center'}}>Weekly Learning Schedule</h3>
        <div className="schedule-timeline">
          {[
            ['Mon – Fri','4 Hours Daily · Live Online','Core Learning Sessions','2 hrs instruction → 1 hr case study / lab / tool workshop → 1 hr Q&A, peer discussion, assessment prep'],
            ['Saturday','2 Hours · Live Guest Lecture','Industry Practitioner Session','60-min keynote/fireside chat → 30-min student Q&A → 30-min LMS reflection task (due Thursday)'],
            ['Sunday','Self-Paced · WSAT Window','Weekly Assessment & Self-Study','WSAT test (45 min) + LMS async content + assignment work + capstone project work'],
          ].map(([day,time,title,detail]) => (
            <div key={day} style={{display:'contents'}}>
              <div className="schedule-day">{day}</div>
              <div className="schedule-content">
                <div className="schedule-time">{time}</div>
                <div className="schedule-title">{title}</div>
                <div className="schedule-detail">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LEARNING OUTCOMES ────────────────────────────────────────────────────────
function OutcomesSection() {
  const outcomes = [
    {icon:'🏦',title:'BFSI Domain Fluency',text:"Read any bank's annual report, explain India's payment infrastructure, and analyse any FinTech business model — with the confidence of a 2-year industry veteran."},
    {icon:'📊',title:'Data & Analytics Mastery',text:'Write SQL queries on BFSI datasets, build Power BI dashboards that business teams use, and conduct Python-based customer analytics independently.'},
    {icon:'🤖',title:'GenAI Prototyping Ability',text:'Build and deploy a working GenAI prototype for a banking use case using Claude API, LangChain RAG, and Streamlit — demonstrable in any interview.'},
    {icon:'📝',title:'Product & Strategy Thinking',text:'Write a production-quality PRD for an AI banking product, build a Figma prototype, and crack a product case interview at any FinTech or bank.'},
    {icon:'⚖️',title:'Regulatory Intelligence',text:'Identify DPDPA 2023 obligations for any BFSI company, conduct a basic AML compliance assessment, and explain IFRS 9 ECL to a non-technical team.'},
    {icon:'🏛️',title:'Enterprise Software Literacy',text:'Navigate Oracle FLEXCUBE, SAP BFSI, Salesforce CRM, and Finacle — skills that take 18 months on the job to acquire, delivered in 3 months.'},
    {icon:'👥',title:'Client Advisory Skills',text:'Write an Investment Policy Statement, build a portfolio review deck, conduct a consultative client needs assessment — for RM and Wealth Manager roles.'},
    {icon:'✍️',title:'BFSI Content Portfolio',text:'15+ published pieces on LinkedIn, Medium, and blogs — including a white paper and CXO ghostwritten posts. A content writer\'s portfolio that speaks for itself.'},
    {icon:'🎯',title:'Interview & Offer Readiness',text:'ATS-optimised resume, completed LinkedIn profile, 100-question BFSI interview bank mastered, 2 live mock interviews completed — ready to apply from B4.'},
  ];
  return (
    <section className="section" id="outcomes" style={{background:'linear-gradient(135deg,#F0F9F8 0%,#EDE9F8 100%)'}}>
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">What You Walk Away With</div>
          <h2 className="h1">Learning Outcomes</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:20}}>
          {outcomes.map(o => (
            <div key={o.title} className="outcome-card fade-up">
              <div className="outcome-icon">{o.icon}</div>
              <div className="outcome-title">{o.title}</div>
              <div className="outcome-text">{o.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
function CertificatesSection() {
  return (
    <section className="section-sm" id="certificates" style={{background:'var(--mist)'}}>
      <div className="container">
        <div className="sec-header fade-up">
          <span className="accent-line" />
          <div className="label">6 Stackable Credentials</div>
          <h2 className="h1">One Certificate Per Bimester</h2>
          <p className="lead">Never wait 12 months for your first credential. Every 2 months, a new certificate is added to your professional portfolio — each independently valuable, each employer-recognised.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:20}}>
          {CERTS_DATA.map((c,i) => (
            <div key={c.bi} className="fade-up" style={{background:'var(--white)',borderRadius:16,padding:24,border:'1px solid var(--gray100)',boxShadow:'var(--shadow-sm)',transition:'var(--transition)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:48,height:48,borderRadius:'50%',background:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>🎓</div>
                <div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:10,fontWeight:500,letterSpacing:'0.08em',color:c.color,textTransform:'uppercase',marginBottom:2}}>{c.bi} Certificate</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,letterSpacing:'-0.01em',color:'var(--navy)',lineHeight:1.25,marginBottom:2}}>{c.name}</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:600,color:c.color}}>{c.abbr}</div>
                </div>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:400,color:'var(--gray700)',lineHeight:1.5,marginBottom:10}}>{c.what}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:c.color}}>{c.roles}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="enrol" style={{background:'var(--navy)',textAlign:'center',padding:'80px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 700px 400px at 50% 50%,rgba(10,122,111,.25) 0%,transparent 70%)'}} />
      <div className="container" style={{position:'relative',zIndex:1}}>
        <span className="badge badge-gold" style={{marginBottom:20,display:'inline-flex'}}>🚀 Applications Open for 2025–26 Cohort</span>
        <h2 className="h1" style={{color:'var(--white)',marginBottom:16}}>Ready to Start Your BFSI Career?</h2>
        <p className="lead" style={{color:'rgba(255,255,255,.7)',marginBottom:36}}>Join India's most rigorous, placement-first BFSI programme. One year. Six certificates. Sixteen career pathways. A wonderful career.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:admissions@upskillize.com" className="btn btn-primary">Apply Now — 2026 Cohort</a>
          <a href="mailto:info@upskillize.com" className="btn btn-outline">Talk to an Advisor</a>
          <a href="https://www.upskillize.com" className="btn btn-outline">Visit Upskillize.com ↗</a>
        </div>
        <div style={{marginTop:40,fontFamily:'var(--font-body)',fontSize:13,fontWeight:400,color:'rgba(255,255,255,.4)'}}>
          Upskillize Solutions · Bangalore · www.upskillize.com · Excel Beyond
        </div>
      </div>
    </section>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function PGDFBACoursePage() {
  useFadeUp();
  return (
    <>
      <style>{globalStyles}</style>
      <Hero />
      <OverviewStrip />
      <CurriculumSection />
      <CaseStudiesSection />
      <GuestLecturesSection />
      <RubricSection />
      <CreditsSection />
      <SkillsSection />
      <LMSSection />
      <CareersSection />
      <DeliverySection />
      <OutcomesSection />
      <CertificatesSection />
      <CTASection />
      <Footer />
    </>
  );
}