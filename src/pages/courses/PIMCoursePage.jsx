import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { num: "72", unit: "h", label: "Total Hours" },
  { num: "10", unit: "",  label: "Modules" },
  { num: "20", unit: "+", label: "AI Tools" },
  { num: "10", unit: "",  label: "Case Studies" },
  { num: "4",  unit: "",  label: "Credits" },
  { num: "3",  unit: "–4",label: "Months" },
];

const STORY_CARDS = [
  { num: "₹10L Cr",    label: "India Insurance Premium Market",   desc: "Growing at 12% CAGR. Penetration at 4.2% vs 7% global average — the gap is the opportunity." },
  { num: "1 Million+", label: "New Jobs in 5 Years (IRDAI)",       desc: "Underwriting, claims, compliance, InsurTech product, data analytics, DPDPA — all hiring urgently." },
  { num: "$35 Bn+",    label: "GCC Insurance Market Premium",      desc: "UAE, KSA, Qatar, Kuwait, Bahrain, Oman. Salaries 2.5x–4x India. 500K+ Indian professionals. Active hiring." },
  { num: "20+",        label: "AI Tools Reshaping Insurance",      desc: "Claude, ChatGPT, FRISS, Shift Technology, Power BI, RMS — every function is being transformed." },
];

const HOUR_CELLS = [
  { icon: "📅", num: "30", desc: <>Saturday<br />Live Sessions<br /><small>10 × 3 hrs</small></> },
  { icon: "🎤", num: "10", desc: <>Guest Lectures<br />Weekday Sessions<br /><small>1–1.5 hrs each</small></> },
  { icon: "💻", num: "10", desc: <>EcoPro LMS<br />Sunday Submissions<br /><small>Case study / week</small></> },
  { icon: "🏆", num: "20", desc: <>Capstone<br />Project<br /><small>Self-paced</small></> },
  { icon: "📝", num: "2",  desc: <>Final Exam<br />Proctored Online<br /><small>100 marks · 2 hrs</small></> },
  { icon: "🎓", num: "72", desc: <>Total Hours<br />4 Credits<br /><small>AICTE Aligned</small></>, total: true },
];

const PHASES = [
  { bg: "#eef4ff", label: "Phase 1 · Weeks 1–4",  title: "Foundations",           weeks: "Modules 1–4",  modules: "Fundamentals → Products → InsurTech → Claims" },
  { bg: "#fff8f0", label: "Phase 2 · Weeks 5–7",  title: "Operations",            weeks: "Modules 5–7",  modules: "Reinsurance → Loss Modelling → Accounting" },
  { bg: "#eefaf7", label: "Phase 3 · Weeks 8–10", title: "Technology & Strategy", weeks: "Modules 8–10", modules: "GenAI / InsurTech → Regulation → DPDPA" },
  { bg: "#0f1e33", label: "Phase 4 · Weeks 11–14",title: "Capstone & Exam",       weeks: "Final Phase",  modules: "Capstone Project → Demo Day → Final Exam", dark: true },
];

const SCORE_CARDS = [
  { pct: "20%", bg: "#eefaf7", color: "#0db8a0", name: "Case Study Submissions", detail: "10 weekly case studies submitted every Sunday via EcoPro LMS. Each graded on a 20-mark rubric: problem ID, root cause, data reasoning, regulatory lens, recommendations. AI Feedback – Instantaneously through AIRev." },
  { pct: "30%", bg: "#fff4ee", color: "#ff6b35", name: "Capstone Project",        detail: "20-hour applied project: choose Track A (Product Design), B (Company Audit), or C (GCC Market Entry). Evaluated by industry panel including hiring managers. Your capstone becomes your portfolio." },
  { pct: "50%", bg: "#eef2ff", color: "#4f6ef7", name: "Final Examination",       detail: "100 marks · 2 hours · Proctored online. Part A: 60 MCQs covering all 10 modules. Part B: 2 case-based short answers (20 marks each). Mirrors how FRM and PRM assess — high-quality, not high-frequency." },
];

const MODULES = [
  {
    num: "01", phase: "phase1", week: "Week 1 · Phase 1 — Foundations",
    title: "Insurance Principles, Products & India Market Architecture",
    tags: [{ label: "Underwriter", cls: "tag-blue" }, { label: "Claims Associate", cls: "tag-teal" }, { label: "Insurance Analyst", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "Foundations of Insurance", points: ["Risk: pure vs speculative; insurable vs uninsurable", "6 Principles: Utmost GF, Insurable Interest, Indemnity, Subrogation, Contribution, Proximate Cause", "Adverse Selection, Moral Hazard, Underwriting — why they exist", "Policy anatomy: proposal, schedule, wording, endorsement, claims"] },
      { num: "Topic 2 · Hour 2", title: "India Insurance Market — Products & Landscape", points: ["Life: Term, ULIP, Endowment, Annuity; Health: IHB, Group, PMJAY; General", "Key players: LIC, SBI Life, HDFC Ergo, Star Health, Bajaj Allianz", "IRDAI market statistics: 57 insurers, ₹2.3T premium, penetration 4.2%", "Comparison: India vs UAE vs Saudi — premium, penetration, players"] },
      { num: "Topic 3 · Hour 3", title: "AI Lab — Claude + ChatGPT Policy Analysis", points: ["Hands-on: Upload a 30-page motor policy to Claude; extract key clauses", "ChatGPT: draft a 5-point rejection letter for a water damage claim", "Comparative: Claude vs ChatGPT analysis quality for insurance docs", "Build prompt library: 10 ready-to-use insurance prompts"] },
    ],
    caseStudy: "LIC IPO 2022 — India's Largest Public Offering",
    tools: ["Claude", "ChatGPT", "Perplexity AI"],
  },
  {
    num: "02", phase: "phase1", week: "Week 2 · Phase 1 — Foundations",
    title: "Underwriting Deep Dive — Life, Health, Motor, Commercial & Marine",
    tags: [{ label: "Underwriter", cls: "tag-blue" }, { label: "Risk Engineer", cls: "tag-orange" }, { label: "Product Manager", cls: "tag-teal" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "Life & Health Underwriting", points: ["Life UW: mortality, morbidity, financial U/W; BMI table; medical extras", "Health UW: waiting periods, PEDs, network hospitals, claims ratio monitoring", "Group health: employee benefits, floater vs individual, top-up", "Govt schemes: PMJAY ₹5L, Ayushman Bharat, state health schemes"] },
      { num: "Topic 2 · Hour 2", title: "Motor, Home & Commercial Underwriting", points: ["Motor: OD, TP, comprehensive; IDV calculation; NCB; fleet UW", "Commercial: STFI, Machinery Breakdown, Boiler, Marine Hull", "Engineering: CAR, EAR, Project Insurance — massive GCC opportunity", "Aviation, Crop, Satellite — niche lines that pay well"] },
      { num: "Topic 3 · Hour 3", title: "AI-Powered Underwriting Lab", points: ["Gamma.app: build a 10-slide UW decision framework in 8 minutes", "Claude: analyse a commercial property risk and flag 5 key exclusions", "Case Study: Digit Insurance — Design Thinking & Motor Disruption", "Live demo: Copilot drafts an underwriting memo from a risk submission"] },
    ],
    caseStudy: "Digit Insurance — Design Thinking & Motor Disruption",
    tools: ["Claude", "Gamma.app", "Grammarly AI"],
  },
  {
    num: "03", phase: "phase1", week: "Week 3 · Phase 1 — Foundations",
    title: "Distribution, InsurTech Architecture & Product Owner/BA Roles",
    tags: [{ label: "InsurTech Analyst", cls: "tag-blue" }, { label: "Product Owner", cls: "tag-teal" }, { label: "Business Analyst", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "Digital Distribution, InsurTech Models & IaaS", points: ["Agency, POSP, bancassurance, aggregators (PB), D2C (Acko), B2B2C (Plum)", "IaaS: Riskcovry, Cover Genius — API stack, revenue model", "Open Insurance: Bima Sugam, IRDAI data sharing, DPDPA intersection", "Global InsurTech: Lemonade, ZhongAn, Wefox, Alan, Oscar"] },
      { num: "Topic 2 · Hour 2", title: "Insurance Technology Architecture — 6 Layers", points: ["Core PAS: Guidewire, Majesco, Duck Creek, Sapiens", "Data: Snowflake, Power BI, Tableau; Actuarial: R, Python, MATLAB", "Claims AI: Shift Technology, FRISS; CRM: Salesforce FSC", "Emerging: GenAI, IoT telematics, ACORD standards, blockchain"] },
      { num: "Topic 3 · Hour 3", title: "Product Owner & Business Analyst in Insurance", points: ["PO: backlog ownership, user stories, sprint planning, Agile/SAFe", "BA: BRD, FSD, UAT, process maps, JIRA, Confluence, gap analysis", "Real deliverables: claims STP BRD, IRDAI gap report, DPDPA data flow", "Case Study: Policybazaar — aggregator to full-stack insurer journey"] },
    ],
    caseStudy: "Policybazaar — 15-Year Disruption Journey to ₹20,000 Cr IPO",
    tools: ["Power BI", "SQL Sandbox", "Salesforce"],
  },
  {
    num: "04", phase: "phase1", week: "Week 4 · Phase 1 — Foundations",
    title: "Claims Management, Fraud Detection & Insurance Accounting",
    tags: [{ label: "Claims Associate", cls: "tag-blue" }, { label: "Fraud Analyst", cls: "tag-orange" }, { label: "Insurance Accountant", cls: "tag-teal" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "Claims Lifecycle, STP & Fraud Detection with AI", points: ["FNOL → Investigation → Reserves → Assessment → Settlement → Subrogation", "STP decision logic; OCR document verification; auto-adjudication", "Fraud: hard vs soft; motor/health/life typologies; FRISS, Shift Technology", "GenAI: Claude for claim narrative analysis; Azure Textract for bills"] },
      { num: "Topic 2 · Hour 2", title: "Insurance Accounting & Financial Statement Reading", points: ["Revenue Account: Earned Premium − Claims − Expenses = UW Profit", "The 6 Ratios: Loss Ratio, Expense Ratio, Combined Ratio, ROE, Solvency", "How to read ICICI Lombard / Star Health annual report in 5 steps", "Claims reserves: OCR, IBNR, IBNER — balance sheet treatment"] },
      { num: "Topic 3 · Hour 3", title: "Subrogation, Salvage & Net Claims Economics", points: ["Net Claims = Gross − Salvage − Subrogation − RI Recovery", "Subrogation: legal process, timelines, recovery rates by LoB", "Excel Lab: combined ratio calculator with Copilot auto-commentary", "Case Study: HDFC ERGO STP — 30 days to 3 minutes"] },
    ],
    caseStudy: "HDFC ERGO — STP Claims: 30 Days to 3 Minutes with AI",
    tools: ["FRISS", "Shift Technology", "AWS Textract", "Excel+Copilot"],
  },
  {
    num: "05", phase: "phase2", week: "Week 5 · Phase 2 — Operations",
    title: "Reinsurance, Risk Transfer & Global RI Markets",
    tags: [{ label: "RI Operations", cls: "tag-teal" }, { label: "RI Manager", cls: "tag-blue" }, { label: "Risk Analyst · GCC", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "Reinsurance Fundamentals & Treaty Structures", points: ["Quota Share, Surplus Treaty, XL (Risk, Cat, Stop Loss) — mechanics", "RI commissions, profit commission, sliding scale; reinstatements", "RI Accounting: bordereaux, IFRS 17 Reinsurance Contract Held (RCH)", "Excel Lab: Build a Quota Share bordereau with Copilot"] },
      { num: "Topic 2 · Hour 2", title: "Global RI Market — Munich Re, Lloyd's, GCC & GIC Re", points: ["Munich Re, Swiss Re, Hannover Re, Gen Re, SCOR, Lloyd's syndicates", "GIC Re (India, 11th globally); Lloyd's India (IRDAI 2024 approval)", "GCC RI: Arab Re, Trust Re, DIFC as RI hub; GCC facultative placement", "Market cycles: hard vs soft; combined ratio and CAT loss impact"] },
      { num: "Topic 3 · Hour 3", title: "Alternative Risk Transfer, Parametric & Space Insurance", points: ["Cat Bonds, ILS, sidecars — $100Bn+ Bermuda ILS market", "Parametric triggers: PMFBY India, AGRI-Saudi, Dubai flood 2024", "Captives: self-insurance for corporates; GCC free zone captives", "Space Insurance: launch, in-orbit, debris liability; ISRO/SpaceX coverage"] },
    ],
    caseStudy: "GIC Re & COVID-19 — When the Black Swan Arrived",
    tools: ["Excel", "NotebookLM", "Perplexity AI"],
  },
  {
    num: "06", phase: "phase2", week: "Week 6 · Phase 2 — Operations",
    title: "Loss Modelling: Actuarial Analytics, CAT Models & Python Lab",
    tags: [{ label: "Actuarial Trainee", cls: "tag-blue" }, { label: "Data Analyst", cls: "tag-teal" }, { label: "Loss Control", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "Actuarial Reserving & Premium Pricing Theory", points: ["IBNR, IBNER, UPR, ALAE — Chain-Ladder method worked example", "Bornhuetter-Ferguson; rate adequacy test; experience vs judgment rating", "Life tables: q(x), e(x); IALM tables; net premium for term plan", "GitHub Copilot: generate chain-ladder Python code in 10 lines"] },
      { num: "Topic 2 · Hour 2", title: "CAT Modelling & Predictive Analytics", points: ["RMS/Moody's, AIR Worldwide — hazard/vulnerability/financial modules", "OEP curve, PML, EML, AAL — read and interpret output in class", "GLMs for pricing; telematics UBI (Acko, AXA Gulf); XGBoost fraud", "India hazard zones; GCC: Dubai flood, KSA hailstorm, Qatar heat"] },
      { num: "Topic 3 · Hour 3", title: "Excel & Python Loss Modelling Lab (Full Practical)", points: ["Excel: loss triangle, combined ratio, frequency-severity; Copilot commentary", "Python/Colab: pandas claims cleaning, loss ratio calc, outlier flagging", "Power BI: 5-visual insurance KPI dashboard from claims CSV", "Case Study: Chennai Floods 2015 — ₹14,000 Cr insurance gap"] },
    ],
    caseStudy: "Chennai Floods 2015 — ₹14,000 Cr Insurance Gap",
    tools: ["Python/Colab", "RMS/AIR", "Power BI", "GitHub Copilot"],
  },
  {
    num: "07", phase: "phase2", week: "Week 7 · Phase 2 — Operations",
    title: "Insurance Accounting, IFRS 17 & ESG",
    tags: [{ label: "Insurance Accountant", cls: "tag-teal" }, { label: "CFO Support", cls: "tag-blue" }, { label: "Compliance Analyst", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "IFRS 17 — Full Accounting Deep Dive", points: ["FCF, CSM, Risk Adjustment — the three components explained", "GMM vs PAA vs VFA — which model applies when (table)", "P&L under IFRS 17 vs IFRS 4 — insurance revenue, service expense", "Excel: calculate CSM for a 5-year term plan; Claude summarises standard"] },
      { num: "Topic 2 · Hour 2", title: "Solvency, AML/CFT & Financial Crime in Insurance", points: ["Solvency Margin Ratio; RBC; Solvency II 3 pillars; GCC RBC frameworks", "PMLA requirements: KYC, CDD, EDD, STR filing for insurers", "GCC AML: CBUAE, SAMA, MENAFATF compliance", "Tools: SumSub, Jumio, IDfy — live KYC/AML demo"] },
      { num: "Topic 3 · Hour 3", title: "ESG in Insurance & Investment Management", points: ["Climate risk underwriting; coal exclusions (Allianz, Swiss Re policy)", "TCFD disclosures; IRDAI ESG guidelines; green insurance products", "IRDAI investment regulations: 50%+ in govt securities; ALM; float", "Case Study: LIC & IFRS 17 transition complexity"] },
    ],
    caseStudy: "LIC & IFRS 17 — Accounting for the Unaccountable",
    tools: ["Excel+Copilot", "Claude", "NotebookLM", "Tableau"],
  },
  {
    num: "08", phase: "phase3", week: "Week 8 · Phase 3 — Technology & Strategy",
    title: "GenAI in Insurance, IoT, Embedded Insurance & Future Frontiers",
    tags: [{ label: "InsurTech PM", cls: "tag-purple" }, { label: "Product Owner", cls: "tag-blue" }, { label: "Innovation Analyst", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "GenAI in Insurance — Applications, Tools & Live Demos", points: ["Underwriting copilot: AI reads application → draft decision memo (30 sec)", "Claims: narrative summarisation; fraud narrative detection; IVR FNOL", "Claude vs ChatGPT: analyse same policy document — compare outputs live", "GenAI regulation: EU AI Act, IRDAI AI framework, fairness issues"] },
      { num: "Topic 2 · Hour 2", title: "IoT, Embedded Insurance & Blockchain", points: ["Wearables (health), telematics (motor), smart home, drones (CAT surveys)", "Embedded: Cover Genius API; future = invisible insurance at checkout", "Blockchain: parametric smart contracts; ACORD on-chain; Lloyd's pilot", "Canva AI: design a 'Gig Worker' insurance brochure in 5 minutes"] },
      { num: "Topic 3 · Hour 3", title: "Metaverse, Space Insurance & Digital Strategy", points: ["Metaverse: digital avatars, NFT property, virtual BI — AXA/Zurich studies", "Space: $500M market; launch/in-orbit/debris; ISRO/SpaceX; Lloyd's Space", "Continuous underwriting, instant parametric claims, AI pricing regulation", "Case Study: Acko + ZhongAn — AI-first insurers rewriting the rulebook"] },
    ],
    caseStudy: "Acko & ZhongAn — AI-First Insurers Rewriting the Rulebook",
    tools: ["Claude", "ChatGPT", "Canva AI", "Azure AI Doc"],
  },
  {
    num: "09", phase: "phase3", week: "Week 9 · Phase 3 — Technology & Strategy",
    title: "IRDAI 2.0, Global Regulation, GCC Compliance & Certification Pathways",
    tags: [{ label: "CCO", cls: "tag-purple" }, { label: "Compliance Analyst", cls: "tag-blue" }, { label: "GCC Executive", cls: "tag-teal" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "IRDAI 2.0 — India's Insurance Regulatory Modernisation", points: ["Insurance Amendment Act 2023: composite licensing, 100% FDI, sandbox", "Bima Trinity: Bima Vistaar (₹1 product), Bima Vahak, Bima Sugam", "State Insurance Plan: 6383 districts — Insurance for All by 2047", "AI Tool: Claude analyses IRDAI Amendment Act — top 10 changes live"] },
      { num: "Topic 2 · Hour 2", title: "Post-PIM Certification Pathways & Career Roadmap", points: ["III: IC-33/IC-38 → AIII → FIII (India insurance gold standard)", "CII London: ACII — GCC gold standard; 'PIM + ACII = Premium GCC Package'", "ASI: CM/CS series → FASI (actuarial); IIBA CBAP; SAFe PO; IAPP CIPP/A", "Career trajectory: 0–2 yrs → 2–5 yrs → 5–10 yrs → C-suite with salary bands"] },
      { num: "Topic 3 · Hour 3", title: "GCC Regulatory Deep Dive & Cross-Border Compliance", points: ["UAE: CBUAE/IA, DIFC/DFSA, ADGM/FSRA — three regulatory environments", "KSA: SAMA structure, Vision 2030, Tawuniya, Bupa Arabia, Al Rajhi Takaful", "IRDAI vs CBUAE vs SAMA: licensing, capital, product approval, solvency", "Case Study: IRDAI 2.0 — Bima Trinity & India's Insurance Moonshot"] },
    ],
    caseStudy: "IRDAI 2.0 — Bima Trinity & India's Insurance Moonshot",
    tools: ["Claude", "OneTrust", "Perplexity AI", "Excel"],
  },
  {
    num: "10", phase: "phase3", week: "Week 10 · Phase 3 — Technology & Strategy",
    title: "DPDPA 2023, Data Privacy & Placement Readiness",
    tags: [{ label: "DPO", cls: "tag-purple" }, { label: "Privacy Manager", cls: "tag-blue" }, { label: "Career Launch", cls: "tag-orange" }],
    hours: "3", day: "Saturday",
    topics: [
      { num: "Topic 1 · Hour 1", title: "DPDPA 2023 — Full Framework & Insurance Application", points: ["Data Fiduciary, Data Principal, consent framework, 8 rights, penalties", "Health data (sensitive), telematics data, cross-border RI data sharing", "DPO role, ROPA, DPIA, Privacy by Design for InsurTech products", "GCC: UAE PDPL, Saudi PDPL, DIFC DP Law comparison"] },
      { num: "Topic 2 · Hour 2", title: "Placement Readiness — Resume, LinkedIn & Interviews", points: ["Resume: skills-first format, PIM power words, ATS optimisation", "LinkedIn: PIM headline formula, About section, Skills endorsements", "Top 20 interview Q&A for insurance fresher roles with model answers", "Mock interview: 2 volunteers interviewed live; class feedback"] },
      { num: "Topic 3 · Hour 3", title: "Internship Strategy, Placement Network & Career Launch", points: ["3 target verticals: Insurance / InsurTech / Software companies", "EcoPro Placement Portal: resume, capstone upload, warm company intros", "90-day job search plan: 30 India + 10 GCC companies", "Case Study: Star Health 2024 — 31M Records & DPDPA Crisis"] },
    ],
    caseStudy: "Star Health 2024 — 31 Million Records & the DPDPA Test",
    tools: ["OneTrust", "Securiti.ai", "Claude", "Grammarly AI", "Canva AI"],
  },
];

const AI_TOOLS = [
  { icon: "🤖", name: "Claude (Anthropic)", cat: "GenAI · Policy Intelligence", useCase: "Policy analysis, underwriting memos, regulatory summaries", color: "#ff6b35", pill: "Core Tool" },
  { icon: "💬", name: "ChatGPT (OpenAI)", cat: "GenAI · Content & Drafting", useCase: "Claim rejection letters, BRDs, customer communication", color: "#10a37f", pill: "Core Tool" },
  { icon: "📊", name: "Microsoft Copilot", cat: "Productivity AI · Excel & Word", useCase: "Loss triangle automation, premium calculators, reports", color: "#0078d4", pill: "Core Tool" },
  { icon: "📈", name: "Power BI", cat: "Analytics · Insurance KPIs", useCase: "Claims dashboard, loss ratio visualisation, portfolio view", color: "#f2c811", pill: "Lab Session" },
  { icon: "🐍", name: "Python / Google Colab", cat: "Data Science · Actuarial", useCase: "Fraud detection, claims cleaning, loss modelling, GLMs", color: "#4584b6", pill: "Lab Session" },
  { icon: "🔍", name: "FRISS / Shift Technology", cat: "InsurTech · Fraud AI", useCase: "Fraud scoring, claims triage, STP decision support", color: "#e53e3e", pill: "Demo" },
  { icon: "🔒", name: "OneTrust / Securiti.ai", cat: "Privacy · DPDPA Compliance", useCase: "DPIA, ROPA, consent mapping for insurers under DPDPA", color: "#7c3aed", pill: "Lab Session" },
  { icon: "🎨", name: "Canva AI / Gamma.app", cat: "Design · Presentations", useCase: "Insurance product brochures, investor decks, UW frameworks", color: "#00c4cc", pill: "Lab Session" },
  { icon: "🗒️", name: "NotebookLM / Perplexity AI", cat: "Research AI · Competitive Intel", useCase: "Annual report analysis, regulatory research, market intel", color: "#34a853", pill: "Demo" },
  { icon: "⚙️", name: "GitHub Copilot", cat: "Dev AI · Actuarial Code", useCase: "Chain-ladder Python, claims automation scripts, data pipelines", color: "#24292e", pill: "Lab Session" },
];

const CASE_STUDIES = [
  { week: "Module 1", company: "LIC IPO 2022", title: "India's Largest Public Offering & the IRDAI Governance Story", what: "LIC's ₹21,000 Cr IPO — why it was delayed, how IRDAI prepared the market, and what embedded value means for a life insurer.", learn: ["Understand life insurance valuation: EV, VNB, NBM", "Read IRDAI Annual Report key metrics", "Map regulatory approvals to market impact"], skills: ["Valuation", "IRDAI", "Life Insurance"] },
  { week: "Module 2", company: "Digit Insurance", title: "Design Thinking, Motor Disruption & the Power of Simplicity", what: "How Digit built a ₹5,000 Cr motor insurer with a single-page policy and mobile-first claims in a regulated market.", learn: ["Apply design thinking to insurance product development", "Analyse combined ratio for a digital insurer", "Draft a 1-page insurance policy using Claude"], skills: ["Product Design", "Motor UW", "AI Drafting"] },
  { week: "Module 3", company: "Policybazaar", title: "15-Year Disruption Journey to ₹20,000 Cr IPO", what: "India's largest insurance aggregator — from startup to listed insurer, and how its POSP network changed distribution forever.", learn: ["Map an insurance distribution value chain", "Calculate policy renewal economics", "Build a Salesforce-style CRM flow for insurance leads"], skills: ["Distribution", "InsurTech", "CRM"] },
  { week: "Module 4", company: "HDFC ERGO", title: "STP Claims: 30 Days to 3 Minutes with AI", what: "How HDFC ERGO used AI to automate motor claims from FNOL to settlement — and what the combined ratio impact was.", learn: ["Design an STP claims workflow diagram", "Calculate NPS improvement from speed gains", "Use FRISS-style scoring logic in a fraud spreadsheet"], skills: ["Claims AI", "STP", "Fraud Detection"] },
  { week: "Module 5", company: "GIC Re & COVID-19", title: "When the Black Swan Arrived", what: "India's state-owned reinsurer absorbed pandemic shock across 57 cedants. What treaty structures protected the market — and what didn't.", learn: ["Read a RI bordereau and compute cedant loss", "Model XL layer exhaustion with real CAT data", "Calculate RI commission impact on cedant P&L"], skills: ["Reinsurance", "CAT Risk", "RI Treaty"] },
  { week: "Module 6", company: "Chennai Floods 2015", title: "₹14,000 Cr Insurance Gap — The CAT Model Failure", what: "One of India's costliest natural disasters exposed a massive protection gap. What went wrong with CAT model assumptions and NATCAT limits.", learn: ["Read a PML/EML output from RMS/AIR model", "Build a loss triangle in Excel from claims data", "Python: visualise flood zone risk distribution"], skills: ["CAT Modelling", "Python", "Actuarial"] },
  { week: "Module 7", company: "LIC & IFRS 17", title: "Accounting for the Unaccountable", what: "LIC's transition from IFRS 4 to IFRS 17 is the most complex accounting shift in Indian insurance history. Walk through the CSM calculation.", learn: ["Calculate FCF, CSM, Risk Adjustment for a term plan", "Map GMM vs PAA vs VFA applicability", "Use Excel+Copilot to summarise IFRS 17 disclosure"], skills: ["IFRS 17", "Accounting", "Excel AI"] },
  { week: "Module 8", company: "Acko & ZhongAn", title: "AI-First Insurers Rewriting the Rulebook", what: "Acko (India) and ZhongAn (China) built insurance-native AI systems. Compare their architecture and underwriting speed against incumbents.", learn: ["Map an AI-first insurer's technology stack", "Benchmark combined ratios: digital vs traditional", "Design a 'GenAI in Claims' pilot roadmap in Claude"], skills: ["GenAI", "InsurTech", "Product Strategy"] },
  { week: "Module 9", company: "IRDAI 2.0", title: "Bima Trinity & India's Insurance Moonshot", what: "Insurance Amendment Act 2023 + Bima Vistaar + Bima Sugam = the most ambitious insurance reform since LIC nationalisation in 1956.", learn: ["Map regulatory changes to business opportunities", "Analyse the Bima Sugam API architecture", "Use Claude to extract top 10 changes from the Amendment Act"], skills: ["Regulation", "IRDAI", "Policy Analysis"] },
  { week: "Module 10", company: "Star Health 2024", title: "31 Million Records & the DPDPA Test", what: "India's largest health insurer faced a data breach exposing 31M records. Walk through the DPDPA obligations, breach response, and DPO duties.", learn: ["Draft a DPDPA-compliant data breach notification", "Map consent and data flows using OneTrust logic", "Build a DPIA checklist for a health InsurTech"], skills: ["DPDPA", "Data Privacy", "Compliance"] },
];

const GUEST_LECTURES = [
  { num: "GL 01", icon: "🎯", title: "The Underwriter of Tomorrow", profile: "Senior Underwriter / VP Underwriting · Major Indian or GCC Insurer (HDFC ERGO / AXA / Zurich)", topic: "How AI changed my underwriting workflow in 12 months", points: ["Real AI tools used in daily underwriting", "How to get your first underwriting role post-PIM", "What referees look for in junior underwriter applications"], badge: "Live Q&A" },
  { num: "GL 02", icon: "📱", title: "Building InsurTech from Zero to Series B", profile: "Founder or CTO · Indian InsurTech (Acko / Digit / Turtlemint / Plum ecosystem)", topic: "From idea to product-market fit in insurance: what nobody tells you", points: ["Insurance API architecture and IRDAI sandbox experience", "Hiring: what skills InsurTechs pay premium for", "How to get a BA/PM role in an InsurTech without coding"], badge: "Startup Insights" },
  { num: "GL 03", icon: "🌍", title: "GCC Insurance Careers — What Indian Talent Needs to Know", profile: "Insurance Executive · UAE or KSA (Takaful / Life / General) · 10+ years GCC", topic: "CBUAE, SAMA, Takaful — navigating GCC insurance from India", points: ["ACII + PIM: the winning combination for GCC placement", "Salary benchmarks: India vs UAE vs KSA (real numbers)", "Cultural nuances in GCC underwriting and client management"], badge: "GCC Focus" },
  { num: "GL 04", icon: "⚖️", title: "DPDPA in Practice — A DPO's First Year", profile: "Data Protection Officer · Insurance / FinTech Company", topic: "Building a DPDPA compliance programme from scratch", points: ["ROPA, DPIA, consent framework — what actually gets audited", "DPDPA vs GDPR: 5 key differences for insurers", "Career path: from compliance analyst to DPO in 5 years"], badge: "Privacy Expert" },
  { num: "GL 05", icon: "💼", title: "Insurance Career Masterclass — Get Hired", profile: "HR Director / Talent Acquisition Lead · Top Indian Insurer or InsurTech", topic: "Live Mock Interviews + Resume Clinic", points: ["Top 20 insurance interview questions + model answers live", "What your PIM certification tells recruiters", "How to negotiate your first salary offer in insurance"], badge: "Career Launch" },
];

const FAQS = [
  { q: "Do I need prior insurance knowledge to enroll?", a: "No. Module 1 is designed for absolute beginners. The course builds from zero — history of insurance, principles, types of products — before moving to advanced topics. Thousands of BBA and B.Com students with zero insurance background have successfully completed similar programs. If you can Google something, you can do this course." },
  { q: "What exactly happens on Saturday? How is the 3-hour session structured?", a: "Each Saturday is 3 topics × 1 hour each. Hour 1: concept delivery + framework. Hour 2: industry context + live discussion. Hour 3: practical lab with an AI tool + introduction of the week's case study. Sessions are live (online or hybrid) and recorded on EcoPro LMS for replay anytime." },
  { q: "Can I do this while studying full-time at college?", a: "Yes — this is specifically designed for students and working professionals. Saturday (3 hours) + Sunday (1 hour LMS submission) = 4 hours/weekend. Guest lectures are on a weekday evening (1–1.5 hrs). That's it. No daily commitment. The capstone and final exam are self-paced during the post-Week 10 period. Many students do this alongside their full college semester, and working professionals manage it alongside their jobs." },
  { q: "What is the PIM designation — is it recognised by IRDAI or any government body?", a: "PIM is an industry-aligned professional designation issued by Upskillize Solutions. It is not an IRDAI-regulated licensing exam (like IC-33 or IC-38) — it's a domain knowledge and skills credential, similar to how FRM is issued by GARP and PMP by PMI. It carries 4 credits under AICTE NEP 2020 equivalency for college partner recognition." },
  { q: "Is PIM valid for GCC jobs in UAE and Saudi Arabia?", a: "PIM from Upskillize is an industry-recognised credential that GCC employers understand. For maximum GCC impact, we recommend pairing PIM with the ACII from CII London (the gold standard in GCC). PIM serves as the foundation — it gives you the insurance domain knowledge and AI tools experience that makes your ACII studies significantly easier." },
  { q: "I missed a session — what happens?", a: "Every Saturday session is recorded in full on EcoPro LMS. You can watch the recording, complete the AI tool exercise from the session, and submit your case study as normal. Minimum 80% attendance (live or recorded) is required for certification. Guest lectures are also recorded. You won't miss anything permanently." },
  { q: "What exactly is the capstone project? How big is it?", a: "The capstone is a 20-hour self-paced project you complete after Week 7. You choose one of 3 tracks: Track A (design a new insurance product), Track B (audit a listed insurer's financials and compliance), or Track C (recommend a GCC market entry for an Indian InsurTech). The final output is a 10-slide deck + either a report or video pitch, presented on Demo Day to an industry panel." },
  { q: "Which AI tools will I actually use hands-on vs just learn about?", a: "Every module includes a 15–20 minute live hands-on tool session. You use Claude to analyse a real insurance policy, ChatGPT to draft an underwriting memo, Copilot to build an Excel loss triangle, Power BI to create a KPI dashboard from a real claims dataset, Python/Colab to flag fraud outliers, FRISS for fraud scoring, and OneTrust/Securiti for DPDPA compliance mapping." },
  { q: "What is the placement success rate?", a: "Upskillize provides placement readiness support including resume review, LinkedIn coaching, mock interviews (Guest Lecture 5), warm introductions to 3 matched companies from our network, and access to the EcoPro Placement Portal. We do not guarantee job offers — placement depends on your performance, location, market conditions, and interview outcomes." },
  { q: "What is the refund policy?", a: "Full refund if requested within 7 days of enrollment. 50% refund if requested before the start of Week 4. No cash refund after Week 4 — however, full access to EcoPro LMS content is retained for 6 months. For exceptional circumstances (medical emergencies, etc.), we offer full credit transfer to the next cohort. No questions asked for the 7-day window." },
];

const PRICING_FEATURES = [
  "72-hour program (10 weeks + capstone)",
  "EcoPro LMS access — 16 months total",
  "20+ AI tools — hands-on every module",
  "10 real case studies (graded)",
  "5–7 industry guest lectures",
  "Doubt Clarification / Personal Mentoring sessions on need basis",
  "Capstone project with industry panel",
  "PIM designation + Credly digital badge",
  "4 academic credits (AICTE NEP 2020)",
  "90-day placement support post-graduation",
  "Alumni network — WhatsApp + LinkedIn",
  "All recordings on EcoPro for 6 months",
];

// ─── FULL RESPONSIVE CSS ─────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap');

  :root {
    --navy:#1e3a5f; --navy-dark:#0f1e33; --navy-light:#2d5a8e;
    --orange:#ff6b35; --orange-light:#ff8c5a; --teal:#0db8a0;
    --gold:#f0b429; --white:#fff; --off-white:#f8f9fc;
    --gray:#64748b; --gray-light:#e8edf5; --text:#1a2332;
    --font-head:'Inter',sans-serif; --font-body:'Inter',sans-serif;
    --font-mono:'Inter',sans-serif;
    --radius:12px; --radius-lg:20px;
    --shadow:0 4px 24px rgba(30,58,95,.10);
    --shadow-lg:0 12px 48px rgba(30,58,95,.16);
  }

  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:var(--font-body);color:var(--text);background:var(--white);overflow-x:hidden;-webkit-font-smoothing:antialiased}
  h1,h2,h3,h4{font-family:var(--font-head);line-height:1.2;letter-spacing:-.03em}
  a{text-decoration:none;color:inherit}
  img{max-width:100%}

  /* ── BANNER ── */
  .pim-banner{background:linear-gradient(90deg,var(--orange),#e85d20);color:var(--white);text-align:center;padding:10px 16px;font-size:12px;font-weight:500;line-height:1.5}

  /* ── HERO ── */
  .pim-hero{background:var(--navy-dark);min-height:88vh;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;padding:60px 20px 48px}
  .pim-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 70% 40%,rgba(13,184,160,.12) 0%,transparent 60%),radial-gradient(ellipse 60% 80% at 20% 80%,rgba(255,107,53,.08) 0%,transparent 50%);pointer-events:none}
  .pim-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:60px 60px;pointer-events:none}
  .pim-hero-inner{max-width:1200px;margin:0 auto;width:100%;position:relative;z-index:1}
  .pim-hero-badge-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
  .pim-hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:5px 10px;font-size:10px;font-weight:600;color:rgba(255,255,255,.75);letter-spacing:.04em;text-transform:uppercase}
  .pim-hero-badge .dot{width:5px;height:5px;border-radius:50%;background:var(--teal);flex-shrink:0}
  .pim-desig{font-family:var(--font-mono);font-size:10px;font-weight:600;color:var(--orange);letter-spacing:.16em;text-transform:uppercase;margin-bottom:12px}
  .pim-hero-title{font-size:clamp(32px,5.5vw,72px);font-weight:900;color:var(--white);line-height:1.08;letter-spacing:-.04em;margin-bottom:12px}
  .pim-hero-title .accent{color:var(--orange)}
  .pim-hero-sub{font-size:clamp(14px,1.8vw,18px);color:rgba(255,255,255,.55);font-weight:400;max-width:600px;line-height:1.65;margin-bottom:28px}
  .pim-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.08);border-radius:var(--radius);overflow:hidden;max-width:860px;margin-bottom:32px}
  .pim-stat-cell{background:rgba(255,255,255,.03);padding:14px 12px;text-align:center}
  .pim-stat-num{font-family:var(--font-head);font-size:24px;font-weight:800;color:var(--white)}
  .pim-stat-num .unit{font-size:13px;color:var(--orange)}
  .pim-stat-label{font-size:10px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.05em;margin-top:2px}
  .pim-cta-row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
  .btn-primary{background:var(--orange);color:var(--white);font-family:var(--font-head);font-size:14px;font-weight:700;padding:13px 28px;border-radius:10px;border:none;cursor:pointer;transition:all .2s;display:inline-block;white-space:nowrap}
  .btn-primary:hover{background:var(--orange-light);transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,107,53,.35)}
  .btn-secondary{color:rgba(255,255,255,.7);font-size:13px;font-weight:500;padding:13px 20px;border-radius:10px;border:1px solid rgba(255,255,255,.18);transition:all .2s;display:inline-block;cursor:pointer;white-space:nowrap}
  .btn-secondary:hover{color:var(--white);border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.05)}
  .pim-hero-tag{font-family:var(--font-mono);font-size:10px;color:rgba(255,255,255,.3);margin-top:18px;letter-spacing:.06em;line-height:1.6}

  /* ── SECTIONS ── */
  .pim-section{padding:64px 20px}
  .pim-inner{max-width:1200px;margin:0 auto}
  .pim-label{font-family:var(--font-mono);font-size:10px;font-weight:700;color:var(--orange);letter-spacing:.16em;text-transform:uppercase;margin-bottom:10px}
  .pim-title{font-size:clamp(24px,4vw,44px);font-weight:800;color:var(--navy-dark);line-height:1.12;letter-spacing:-.03em;margin-bottom:14px}
  .pim-title .hi{color:var(--orange)}
  .pim-sub{font-size:15px;color:var(--gray);line-height:1.7;max-width:600px;margin-bottom:40px}

  /* ── STORY ── */
  .pim-story{background:var(--navy-dark);color:var(--white);padding:64px 20px}
  .pim-story-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;max-width:1200px;margin:0 auto}
  .pim-story-quote{font-size:clamp(18px,2.5vw,26px);font-weight:900;font-family:var(--font-head);color:var(--orange);line-height:1.3;margin:24px 0 16px;letter-spacing:-.03em}
  .pim-story-right{display:flex;flex-direction:column;gap:16px}
  .pim-story-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius);padding:18px 20px}
  .pim-story-card-num{font-family:var(--font-head);font-size:32px;font-weight:800;color:var(--orange);line-height:1}
  .pim-story-card-label{font-size:12px;color:rgba(255,255,255,.55);margin-top:3px}
  .pim-story-card-desc{font-size:13px;color:rgba(255,255,255,.75);margin-top:6px;line-height:1.6}

  /* ── STRUCTURE ── */
  .pim-offwhite{background:var(--off-white)}
  .pim-hour-breakdown{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--gray-light);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:40px;border:1px solid var(--gray-light)}
  .pim-hour-cell{background:var(--white);padding:20px 14px;text-align:center}
  .pim-hour-cell.total{background:var(--navy-dark);color:var(--white)}
  .pim-hour-icon{font-size:22px;margin-bottom:6px}
  .pim-hour-num{font-family:var(--font-head);font-size:28px;font-weight:800;color:var(--navy-dark);line-height:1}
  .pim-hour-cell.total .pim-hour-num{color:var(--orange)}
  .pim-hour-desc{font-size:11px;color:var(--gray);margin-top:3px;line-height:1.5}
  .pim-hour-cell.total .pim-hour-desc{color:rgba(255,255,255,.6)}
  .pim-phase-track{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-bottom:40px;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--gray-light)}
  .pim-phase-block{padding:20px 16px}
  .pim-phase-label{font-family:var(--font-mono);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gray);margin-bottom:5px}
  .pim-phase-title{font-family:var(--font-head);font-size:15px;font-weight:700;color:var(--navy-dark);margin-bottom:3px}
  .pim-phase-weeks{font-size:11px;color:var(--gray)}
  .pim-phase-modules{font-size:12px;font-weight:600;color:var(--navy-dark);margin-top:6px}

  /* ── SCORING ── */
  .pim-score-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}
  .pim-score-card{border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--gray-light)}
  .pim-score-top{padding:24px 20px 16px}
  .pim-score-pct{font-family:var(--font-head);font-size:48px;font-weight:800;line-height:1;margin-bottom:3px}
  .pim-score-name{font-size:15px;font-weight:700;color:var(--navy-dark)}
  .pim-score-body{padding:16px 20px;background:var(--white)}
  .pim-score-detail{font-size:13px;color:var(--gray);line-height:1.7}

  /* ── MODULES ── */
  .pim-module-grid{display:grid;gap:12px}
  .pim-module-card{border:1px solid var(--gray-light);border-radius:var(--radius-lg);overflow:hidden;transition:all .25s;cursor:pointer}
  .pim-module-card:hover{border-color:var(--navy-light);box-shadow:var(--shadow)}
  .pim-module-header{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:start;padding:18px 20px;background:var(--white)}
  .pim-module-num{width:44px;height:44px;border-radius:10px;color:var(--white);font-family:var(--font-head);font-size:16px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .phase1{background:var(--navy-dark)}
  .phase2{background:#0d5c45}
  .phase3{background:#5a1a7a}
  .pim-module-meta{flex:1;min-width:0}
  .pim-module-week{font-family:var(--font-mono);font-size:9px;color:var(--orange);font-weight:600;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
  .pim-module-title{font-family:var(--font-head);font-size:15px;font-weight:700;color:var(--navy-dark);line-height:1.3;letter-spacing:-.02em;margin-bottom:8px}
  .pim-module-tags{display:flex;gap:5px;flex-wrap:wrap}
  .pim-module-tag{font-size:9px;font-weight:600;padding:2px 7px;border-radius:4px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
  .tag-blue{background:#eef2ff;color:#3a4fd4}
  .tag-teal{background:#eefaf7;color:#0a7a68}
  .tag-orange{background:#fff4ee;color:#c44a1a}
  .tag-purple{background:#f5eeff;color:#6b35b8}
  .pim-module-right{text-align:right;flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:3px}
  .pim-module-hours{font-family:var(--font-head);font-size:20px;font-weight:800;color:var(--navy-dark)}
  .pim-module-hours-label{font-size:10px;color:var(--gray)}
  .pim-module-toggle{width:26px;height:26px;border-radius:50%;border:1.5px solid var(--gray-light);display:flex;align-items:center;justify-content:center;transition:all .2s;font-size:14px;color:var(--gray);flex-shrink:0}
  .pim-module-toggle.open{background:var(--navy-dark);border-color:var(--navy-dark);color:var(--white)}
  .pim-module-body{border-top:1px solid var(--gray-light);padding:20px;background:var(--off-white)}
  .pim-topics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
  .pim-topic-card{background:var(--white);border:1px solid var(--gray-light);border-radius:var(--radius);padding:14px}
  .pim-topic-num{font-family:var(--font-mono);font-size:9px;color:var(--orange);font-weight:600;letter-spacing:.1em;margin-bottom:5px;text-transform:uppercase}
  .pim-topic-title{font-size:13px;font-weight:700;color:var(--navy-dark);margin-bottom:7px;line-height:1.3}
  .pim-topic-points{list-style:none;font-size:11px;color:var(--gray);line-height:1.7}
  .pim-topic-points li::before{content:"→ ";color:var(--orange)}
  .pim-module-footer{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;align-items:center}
  .pim-module-case{background:var(--navy-dark);color:var(--white);font-size:11px;font-weight:600;padding:7px 12px;border-radius:7px}
  .pim-module-case span{color:var(--orange)}
  .pim-module-tools{display:flex;gap:5px;flex-wrap:wrap}
  .pim-tool-pill{background:var(--white);border:1px solid var(--gray-light);font-size:10px;color:var(--gray);padding:3px 9px;border-radius:20px;font-weight:500}

  /* ── AI TOOLS ── */
  .pim-tools-section{background:var(--navy-dark);color:var(--white);padding:64px 20px}
  .pim-tools-inner{max-width:1200px;margin:0 auto}
  .pim-tools-headline{font-family:var(--font-head);font-size:clamp(24px,4vw,44px);font-weight:800;color:var(--white);line-height:1.12;letter-spacing:-.03em;margin-bottom:8px}
  .pim-tools-sub{font-size:14px;color:rgba(255,255,255,.55);margin-bottom:36px;max-width:600px;line-height:1.65}
  .pim-market-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06);border-radius:var(--radius);overflow:hidden;margin-bottom:36px}
  .pim-market-stat{background:rgba(255,255,255,.03);padding:16px 12px;text-align:center}
  .pim-market-val{font-family:var(--font-head);font-size:26px;font-weight:800;line-height:1}
  .pim-market-label{font-size:10px;color:rgba(255,255,255,.4);margin-top:3px;line-height:1.4}
  .pim-tool-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:32px}
  .pim-tool-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:var(--radius-lg);padding:20px;transition:all .2s;position:relative;overflow:hidden}
  .pim-tool-card:hover{background:rgba(255,255,255,.08);transform:translateY(-3px)}
  .pim-tool-accent{position:absolute;top:0;left:0;width:4px;height:100%}
  .pim-tool-icon{width:40px;height:40px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
  .pim-tool-name{font-family:var(--font-head);font-size:15px;font-weight:700;color:var(--white)}
  .pim-tool-cat{font-size:10px;color:rgba(255,255,255,.4);margin-top:2px}
  .pim-tool-use{font-size:12px;color:rgba(255,255,255,.6);line-height:1.5;margin-top:10px}
  .pim-tool-badge{font-size:9px;font-weight:700;padding:3px 7px;border-radius:20px;background:rgba(255,107,53,.15);color:var(--orange);letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
  .pim-tool-callout{background:rgba(255,107,53,.1);border:1px solid rgba(255,107,53,.2);border-radius:var(--radius);padding:18px 20px}
  .pim-tool-callout p{font-size:14px;font-weight:600;color:rgba(255,255,255,.9);line-height:1.6}

  /* ── CASES ── */
  .pim-cases-section{background:var(--off-white)}
  .pim-cases-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
  .pim-case-card{background:var(--white);border:1px solid var(--gray-light);border-radius:var(--radius-lg);overflow:hidden;transition:all .2s}
  .pim-case-card:hover{border-color:var(--navy-light);box-shadow:var(--shadow);transform:translateY(-3px)}
  .pim-case-header{background:var(--navy-dark);padding:18px 20px}
  .pim-case-week{font-family:var(--font-mono);font-size:9px;font-weight:500;letter-spacing:.1em;color:rgba(255,255,255,.4);text-transform:uppercase;margin-bottom:5px}
  .pim-case-company{font-family:var(--font-head);font-size:18px;font-weight:800;color:var(--orange);margin-bottom:3px}
  .pim-case-title{font-size:12px;font-weight:500;color:rgba(255,255,255,.7);line-height:1.4}
  .pim-case-body{padding:16px 20px}
  .pim-case-what{font-size:12px;color:var(--gray);line-height:1.6;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--gray-light)}
  .pim-case-learn-label{font-family:var(--font-mono);font-size:9px;font-weight:500;letter-spacing:.08em;color:var(--orange);text-transform:uppercase;margin-bottom:7px}
  .pim-case-learn-list{list-style:none;font-size:11px;color:var(--text);line-height:1.7}
  .pim-case-learn-list li::before{content:"→ ";color:var(--orange)}
  .pim-case-skills{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px;padding-top:12px;border-top:1px solid var(--gray-light)}
  .pim-skill-tag{font-size:9px;font-weight:600;padding:2px 7px;border-radius:4px;background:var(--off-white);color:var(--gray);text-transform:uppercase;letter-spacing:.04em}

  /* ── GUEST LECTURES ── */
  .pim-guests-section{background:var(--white)}
  .pim-guests-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
  .pim-guest-card{border:1px solid var(--gray-light);border-radius:var(--radius-lg);padding:24px;transition:all .2s}
  .pim-guest-card:hover{border-color:var(--navy-light);box-shadow:var(--shadow)}
  .pim-guest-num{font-family:var(--font-mono);font-size:10px;font-weight:500;color:var(--orange);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
  .pim-guest-icon{width:48px;height:48px;border-radius:12px;background:var(--navy-dark);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:14px}
  .pim-guest-title{font-family:var(--font-head);font-size:15px;font-weight:700;color:var(--navy-dark);margin-bottom:3px;line-height:1.3}
  .pim-guest-profile{font-size:12px;color:var(--gray);margin-bottom:14px;line-height:1.5}
  .pim-guest-topic{font-size:13px;font-weight:600;color:var(--text);margin-bottom:10px;padding:10px 14px;background:var(--off-white);border-radius:7px;border-left:3px solid var(--orange)}
  .pim-guest-points{list-style:none;font-size:11px;color:var(--gray);line-height:1.8}
  .pim-guest-points li::before{content:"✓ ";color:var(--teal);font-weight:700}
  .pim-guest-badge{display:inline-flex;align-items:center;gap:5px;background:#eefaf7;color:#0a7a68;font-size:10px;font-weight:600;padding:3px 9px;border-radius:20px;margin-top:12px}

  /* ── CAPSTONE ── */
  .pim-capstone-section{background:var(--navy-dark);color:var(--white);padding:64px 20px}
  .pim-capstone-inner{max-width:1200px;margin:0 auto}
  .pim-capstone-headline{font-family:var(--font-head);font-size:clamp(24px,4vw,44px);font-weight:800;color:var(--white);letter-spacing:-.03em;margin-bottom:8px}
  .pim-capstone-sub{font-size:14px;color:rgba(255,255,255,.55);margin-bottom:36px;max-width:600px;line-height:1.65}
  .pim-capstone-tracks{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:36px}
  .pim-track-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:var(--radius-lg);padding:24px;transition:all .2s}
  .pim-track-card:hover{background:rgba(255,255,255,.07);transform:translateY(-3px)}
  .pim-track-letter{font-family:var(--font-head);font-size:44px;font-weight:800;line-height:1;margin-bottom:7px}
  .pim-track-title{font-size:15px;font-weight:700;color:var(--white);margin-bottom:3px}
  .pim-track-target{font-size:11px;color:rgba(255,255,255,.4);margin-bottom:14px;font-style:italic}
  .pim-track-deliverables{list-style:none;font-size:11px;color:rgba(255,255,255,.65);line-height:1.9}
  .pim-track-deliverables li::before{content:"→ ";color:rgba(255,255,255,.25)}
  .pim-capstone-timeline{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-radius:var(--radius);overflow:hidden}
  .pim-tl-step{padding:18px 14px;text-align:center}
  .pim-tl-week{font-family:var(--font-mono);font-size:9px;color:rgba(255,255,255,.4);letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px}
  .pim-tl-title{font-size:13px;font-weight:700;color:var(--white)}
  .pim-tl-desc{font-size:11px;color:rgba(255,255,255,.5);margin-top:3px;line-height:1.5}

  /* ── PLACEMENT ── */
  .pim-placement-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:36px}
  .pim-placement-col{background:var(--white);border:1px solid var(--gray-light);border-radius:var(--radius-lg);padding:20px}
  .pim-placement-col-icon{font-size:26px;margin-bottom:10px}
  .pim-placement-col-title{font-family:var(--font-head);font-size:15px;font-weight:700;color:var(--navy-dark);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--gray-light)}
  .pim-placement-col-list{font-size:12px;color:var(--gray);line-height:2.1}
  .pim-placement-col-list em{font-size:11px;color:#94a3b8;display:block;margin-top:8px;font-style:normal;line-height:1.5}
  .pim-salary-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:var(--radius-lg);border:1px solid var(--gray-light);margin-bottom:28px}
  .pim-salary-table{width:100%;min-width:540px;border-collapse:collapse;background:var(--white)}
  .pim-salary-table th{background:var(--navy-dark);color:rgba(255,255,255,.75);font-size:10px;font-weight:600;padding:11px 14px;text-align:left;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
  .pim-salary-table td{font-size:12px;padding:10px 14px;border-bottom:1px solid var(--gray-light);color:var(--text)}
  .pim-salary-table tr:last-child td{border-bottom:none}
  .pim-salary-table tr:nth-child(even) td{background:#fafbfd}
  .sal-india{color:#0d5c45;font-weight:600}
  .sal-gcc{color:#7a3800;font-weight:600}
  .sal-mod{color:var(--navy-light);font-weight:500}

  /* ── MENTORING BOX ── */
  .pim-mentoring-box{background:var(--navy-dark);border-radius:var(--radius-lg);padding:28px 32px;color:var(--white);margin-top:0;display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center}
  .pim-mentoring-left h3{font-family:var(--font-head);font-size:19px;font-weight:800;margin-bottom:8px;letter-spacing:-.02em;color:var(--white)}
  .pim-mentoring-left p{font-size:13px;color:rgba(255,255,255,.6);line-height:1.7}
  .pim-mentoring-steps{display:flex;flex-direction:column;gap:11px}
  .pim-mentoring-step{display:flex;gap:12px;align-items:flex-start}
  .pim-m-step-num{width:24px;height:24px;border-radius:50%;background:var(--orange);color:var(--white);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
  .pim-m-step-text{font-size:12px;color:rgba(255,255,255,.75);line-height:1.5}

  /* ── PIM DESIGNATION ── */
  .pim-cert-box{background:var(--navy-dark);border:2px solid rgba(240,180,41,.3);border-radius:var(--radius-lg);padding:36px 32px;max-width:680px;margin:0 auto 40px;text-align:center}
  .pim-cert-footer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1)}
  .pim-tiers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .pim-tier-card{border:1px solid var(--gray-light);border-radius:var(--radius-lg);padding:20px}

  /* ── FAQ ── */
  .pim-faq-section{background:var(--white)}
  .pim-faq-list{max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:8px}
  .pim-faq-item{border:1px solid var(--gray-light);border-radius:var(--radius);overflow:hidden}
  .pim-faq-item.open{border-color:var(--navy-light)}
  .pim-faq-q{padding:16px 20px;font-size:14px;font-weight:600;color:var(--navy-dark);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:14px;line-height:1.4}
  .pim-faq-q:hover{background:var(--off-white)}
  .pim-faq-icon{font-size:18px;color:var(--gray);flex-shrink:0;font-weight:400;transition:transform .2s}
  .pim-faq-item.open .pim-faq-icon{transform:rotate(45deg);color:var(--orange)}
  .pim-faq-a{padding:0 20px 16px;font-size:13px;color:var(--gray);line-height:1.7}

  /* ── PRICING ── */
  .pim-pricing-section{background:var(--navy-dark);color:var(--white);padding:64px 20px}
  .pim-pricing-box{max-width:640px;margin:0 auto;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:var(--radius-lg);padding:36px 28px}
  .pim-pricing-label{font-family:var(--font-mono);font-size:10px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px}
  .pim-pricing-amount{font-family:var(--font-head);font-size:clamp(44px,6vw,64px);font-weight:800;color:var(--white);line-height:1;margin-bottom:7px}
  .pim-pricing-note{font-size:13px;color:rgba(255,255,255,.5);margin-bottom:18px}
  .pim-pricing-early{background:rgba(255,107,53,.1);border:1px solid rgba(255,107,53,.2);border-radius:10px;padding:12px 16px;margin-bottom:24px;font-size:13px;color:rgba(255,255,255,.8);line-height:1.6}
  .pim-pricing-features{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:28px}
  .pim-pricing-feat{font-size:12px;color:rgba(255,255,255,.7);padding-left:15px;position:relative;line-height:1.5}
  .pim-pricing-feat::before{content:"✓";position:absolute;left:0;color:var(--teal);font-weight:700}
  .pim-pricing-ctas{display:flex;flex-direction:column;gap:10px}

  /* ════════════════════════════════════════
     RESPONSIVE BREAKPOINTS
  ════════════════════════════════════════ */

  /* ── Tablet (≤900px) ── */
  @media(max-width:900px){
    .pim-hero{padding:48px 16px 40px;min-height:auto}
    .pim-stats-grid{grid-template-columns:repeat(3,1fr)}
    .pim-story-grid{grid-template-columns:1fr;gap:32px}
    .pim-hour-breakdown{grid-template-columns:repeat(3,1fr)}
    .pim-phase-track{grid-template-columns:repeat(2,1fr)}
    .pim-score-grid{grid-template-columns:1fr}
    .pim-topics-grid{grid-template-columns:1fr 1fr}
    .pim-market-stats{grid-template-columns:repeat(2,1fr)}
    .pim-tool-cards{grid-template-columns:1fr}
    .pim-capstone-tracks{grid-template-columns:1fr}
    .pim-capstone-timeline{grid-template-columns:repeat(2,1fr)}
    .pim-placement-cols{grid-template-columns:1fr}
    .pim-mentoring-box{grid-template-columns:1fr;gap:24px;padding:22px 20px}
    .pim-tiers-grid{grid-template-columns:1fr}
    .pim-pricing-features{grid-template-columns:1fr}
    .pim-cert-footer-grid{grid-template-columns:1fr}
    .pim-cert-box{padding:28px 20px}
  }

  /* ── Mobile (≤640px) ── */
  @media(max-width:640px){
    .pim-section{padding:48px 16px}
    .pim-story{padding:48px 16px}
    .pim-tools-section{padding:48px 16px}
    .pim-capstone-section{padding:48px 16px}
    .pim-pricing-section{padding:48px 16px}

    .pim-hero{padding:36px 16px 32px}
    .pim-hero-badge-row{gap:6px}
    .pim-hero-badge{font-size:9px;padding:4px 8px}
    .pim-hero-title{font-size:clamp(28px,8vw,42px)}
    .pim-hero-sub{font-size:14px;margin-bottom:22px}
    .pim-stats-grid{grid-template-columns:repeat(2,1fr)}
    .pim-cta-row{flex-direction:column;align-items:stretch}
    .btn-primary,.btn-secondary{text-align:center;width:100%}
    .pim-hero-tag{font-size:9px}

    .pim-story-quote{font-size:18px}

    .pim-hour-breakdown{grid-template-columns:repeat(2,1fr)}
    .pim-phase-track{grid-template-columns:1fr}
    .pim-topics-grid{grid-template-columns:1fr}

    .pim-module-header{padding:14px 14px;gap:10px}
    .pim-module-num{width:36px;height:36px;font-size:14px;border-radius:8px}
    .pim-module-title{font-size:13px}
    .pim-module-tags{display:none}
    .pim-module-body{padding:14px}

    .pim-market-stats{grid-template-columns:repeat(2,1fr)}
    .pim-tool-cards{grid-template-columns:1fr}

    .pim-capstone-timeline{grid-template-columns:1fr 1fr}
    .pim-cert-box{padding:20px 14px}
    .pim-cert-footer-grid{grid-template-columns:repeat(3,1fr);gap:8px}

    .pim-pricing-box{padding:24px 16px}
    .pim-pricing-features{grid-template-columns:1fr}

    .pim-cases-grid{grid-template-columns:1fr}
    .pim-guests-grid{grid-template-columns:1fr}

    .pim-sub{font-size:14px;margin-bottom:28px}
  }

  /* ── Small Mobile (≤400px) ── */
  @media(max-width:400px){
    .pim-stats-grid{grid-template-columns:repeat(2,1fr)}
    .pim-hour-breakdown{grid-template-columns:1fr 1fr}
    .pim-market-stats{grid-template-columns:1fr 1fr}
    .pim-cert-footer-grid{grid-template-columns:1fr}
    .pim-capstone-timeline{grid-template-columns:1fr}
    .pim-faq-q{font-size:13px;padding:14px 16px}
  }
`;

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function ModuleCard({ mod }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pim-module-card" onClick={() => setOpen(!open)}>
      <div className="pim-module-header">
        <div className={`pim-module-num ${mod.phase}`}>{mod.num}</div>
        <div className="pim-module-meta">
          <div className="pim-module-week">{mod.week}</div>
          <div className="pim-module-title">{mod.title}</div>
          <div className="pim-module-tags">
            {mod.tags.map((t, i) => (
              <span key={i} className={`pim-module-tag ${t.cls}`}>{t.label}</span>
            ))}
          </div>
        </div>
        <div className="pim-module-right">
          <div className="pim-module-hours">{mod.hours}<span style={{ fontSize: 12, color: "var(--gray)" }}>h</span></div>
          <div className="pim-module-hours-label">{mod.day}</div>
          <div className={`pim-module-toggle ${open ? "open" : ""}`}>{open ? "−" : "+"}</div>
        </div>
      </div>
      {open && (
        <div className="pim-module-body" onClick={e => e.stopPropagation()}>
          <div className="pim-topics-grid">
            {mod.topics.map((tp, i) => (
              <div key={i} className="pim-topic-card">
                <div className="pim-topic-num">{tp.num}</div>
                <div className="pim-topic-title">{tp.title}</div>
                <ul className="pim-topic-points">
                  {tp.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pim-module-footer">
            <div className="pim-module-case">📋 Case Study: <span>{mod.caseStudy}</span></div>
            <div className="pim-module-tools">
              {mod.tools.map((t, i) => <span key={i} className="pim-tool-pill">{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pim-faq-item ${open ? "open" : ""}`}>
      <div className="pim-faq-q" onClick={() => setOpen(!open)}>
        {faq.q}
        <span className="pim-faq-icon">+</span>
      </div>
      {open && <div className="pim-faq-a">{faq.a}</div>}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function PIMCoursePage() {
  return (
    <>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="pim-hero" id="home">
        <div className="pim-hero-grid" />
        <div className="pim-hero-inner">
          <div className="pim-hero-badge-row">
            <span className="pim-hero-badge"><span className="dot" />India’s First AI-Powered Insurance and InsurTech Certification</span>
            <span className="pim-hero-badge"><span className="dot" style={{ background: "var(--orange)" }} />AICTE NEP 2020 Aligned</span>
            <span className="pim-hero-badge"><span className="dot" style={{ background: "var(--gold)" }} />3.	Global Opportunities including GCC & Domestic</span>
          </div>
          <div className="pim-desig">Professional Insurance Manager · PIM </div>
          <h1 className="pim-hero-title">
            Insurance,<br />InsurTech &amp;<br /><span className="accent">DPDPA</span> Certification
          </h1>
          <p className="pim-hero-sub">
            Earn your PIM designation in 10 weeks. 20+ AI tools. 10 real case studies. Industry mentors.Placement Opportunities with InsurTech &amp; software companies across India and GCC.
          </p>
          <div className="pim-stats-grid">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="pim-stat-cell">
                <div className="pim-stat-num">{s.num}<span className="unit">{s.unit}</span></div>
                <div className="pim-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="pim-cta-row">
            <a href="#pricing" className="btn-primary">Earn Your PIM →</a>
            <a href="#modules" className="btn-secondary">Explore Curriculum</a>
            <a href="#ai-tools" className="btn-secondary">See 20+ AI Tools</a>
          </div>
          <div className="pim-hero-tag">PIM · PROFESSIONAL INSURANCE MANAGER · Certification in Insurance, InsurTech and DPDPA / GDPR</div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="pim-story" id="about">
        <div className="pim-story-grid">
          <div className="pim-story-left">
            <p className="pim-label" style={{ color: "var(--orange)" }}>The Insurance Opportunity</p>
            <h2 className="pim-title" style={{ color: "var(--white)" }}>
              ₹10 Lakh Crore Market.<br />1 Million New Jobs.<br />You Are Early.
            </h2>
            <p className="pim-sub" style={{ color: "rgba(255,255,255,.6)" }}>
              India's insurance penetration is 4.2% against a global average of 7%. IRDAI's vision of "Insurance for All by 2047" will create over 1 million new jobs. The GCC insurance market adds $35Bn+ more. And 20+ AI tools are reshaping every function — from underwriting to claims to compliance.
            </p>
            <div className="pim-story-quote">"94% of insurance companies say graduates are NOT industry-ready. PIM changes that."</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
              Yet most students graduate without ever reading a policy wording, calculating a loss ratio, or touching an AI tool in an insurance context. The PIM certification — built around 20+ real AI tools and 10 industry case studies — bridges that gap completely.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#pricing" className="btn-primary">Start Your PIM Journey</a>
              <a href="#pim" className="btn-secondary" style={{ color: "rgba(255,255,255,.6)", borderColor: "rgba(255,255,255,.15)" }}>About the Designation</a>
            </div>
          </div>
          <div className="pim-story-right">
            {STORY_CARDS.map((c, i) => (
              <div key={i} className="pim-story-card">
                <div className="pim-story-card-num">{c.num}</div>
                <div className="pim-story-card-label">{c.label}</div>
                <div className="pim-story-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRUCTURE ── */}
<section className="pim-section pim-offwhite" id="program">
  <div className="pim-inner">
    <p className="pim-label">Program Architecture</p>
    <h2 className="pim-title">72 Hours. 10 Weeks.<br /><span className="hi">4 Credits.</span> 1 Designation.</h2>
    <p className="pim-sub">Saturday 3-hour sessions. Sunday LMS. Weekday guest lectures. Weekend-friendly. No daily commitment required.</p>

    <div className="pim-hour-breakdown">
      {HOUR_CELLS.map((c, i) => (
        <div key={i} className={`pim-hour-cell ${c.total ? "total" : ""}`}>
          <div className="pim-hour-icon">{c.icon}</div>
          <div className="pim-hour-num">{c.num}</div>
          <div className="pim-hour-desc">{c.desc}</div>
        </div>
      ))}
    </div>

    <div className="pim-phase-track">
      {PHASES.map((p, i) => (
        <div key={i} className="pim-phase-block" style={{ background: p.bg }}>
          <div className="pim-phase-label" style={p.dark ? { color: "rgba(255,255,255,.5)" } : {}}>{p.label}</div>
          <div className="pim-phase-title" style={p.dark ? { color: "var(--orange)" } : {}}>{p.title}</div>
          <div className="pim-phase-weeks" style={p.dark ? { color: "rgba(255,255,255,.5)" } : {}}>{p.weeks}</div>
          <div className="pim-phase-modules" style={p.dark ? { color: "rgba(255,255,255,.75)" } : {}}>{p.modules}</div>
        </div>
      ))}
    </div>

    <p className="pim-label" style={{ marginTop: 48 }}>Assessment Model</p>
    <h3 className="pim-title" style={{ fontSize: "clamp(20px,3vw,28px)", marginBottom: 20 }}>
      3 Meaningful Assessments. No Weekly MCQ Grind.
    </h3>
    <div className="pim-score-grid">
      {SCORE_CARDS.map((c, i) => (
        <div key={i} className="pim-score-card">
          <div className="pim-score-top" style={{ background: c.bg }}>
            <div className="pim-score-pct" style={{ color: c.color }}>{c.pct}</div>
            <div className="pim-score-name">{c.name}</div>
          </div>
          <div className="pim-score-body">
            <div className="pim-score-detail">{c.detail}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── MODULES ── */}
      <section className="pim-section" id="modules" style={{ background: "var(--white)" }}>
        <div className="pim-inner">
          <p className="pim-label">10-Week Curriculum</p>
          <h2 className="pim-title">10 Modules · 3 Topics Each<br /><span className="hi">1 Hour Per Topic.</span></h2>
          <p className="pim-sub">Every Saturday is a 3-hour deep dive. 3 topics × 1 hour each. Hands-on AI tool session built into every module. One featured case study introduced every week.</p>
          <div className="pim-module-grid">
            {MODULES.map((mod, i) => <ModuleCard key={i} mod={mod} />)}
          </div>
        </div>
      </section>

      {/* ── AI TOOLS ── */}
      <section className="pim-tools-section" id="ai-tools">
        <div className="pim-tools-inner">
          <p className="pim-label" style={{ color: "var(--teal)" }}>Hands-On Technology</p>
          <h2 className="pim-tools-headline">10 InsurTech AI Tools.<br />Not as Slides. <span style={{ color: "var(--orange)" }}>As Labs.</span></h2>
          <p className="pim-tools-sub">Every tool has a dedicated hands-on session built into the Saturday modules. By graduation, your resume carries 10 real AI tools with insurance-specific projects as proof.</p>

          <div className="pim-market-stats">
            {[
              { val: "$14B", label: "AI-in-Insurance market 2026", color: "var(--orange)" },
              { val: "67%", label: "Insurers testing GenAI (only 7% scaled)", color: "var(--teal)" },
              { val: "6.1×", label: "Higher returns for AI-leader insurers", color: "var(--gold)" },
              { val: "3000+", label: "Actuaries use Akur8 daily globally", color: "#a78bfa" },
            ].map((s, i) => (
              <div key={i} className="pim-market-stat">
                <div className="pim-market-val" style={{ color: s.color }}>{s.val}</div>
                <div className="pim-market-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="pim-tool-cards">
            {AI_TOOLS.map((tool, i) => (
              <div key={i} className="pim-tool-card">
                <div className="pim-tool-accent" style={{ background: tool.color }} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="pim-tool-icon" style={{ background: tool.color + "26" }}>{tool.icon}</div>
                    <div>
                      <div className="pim-tool-name">{tool.name}</div>
                      <div className="pim-tool-cat">{tool.cat}</div>
                    </div>
                  </div>
                  <span className="pim-tool-badge">{tool.pill}</span>
                </div>
                <div className="pim-tool-use">{tool.useCase}</div>
              </div>
            ))}
          </div>

          <div className="pim-tool-callout">
            <p><strong style={{ color: "var(--orange)" }}>By graduation:</strong> your LinkedIn lists 10 AI tools with insurance-specific use cases. Not "familiar with AI" — but "used Claude to analyse a ₹500 Cr motor portfolio, Power BI to build a claims KPI dashboard, and Python to detect fraud outliers in 10,000 records."</p>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="pim-section pim-cases-section" id="cases">
        <div className="pim-inner">
          <p className="pim-label">Real-World Learning</p>
          <h2 className="pim-title">10 Case Studies. <span className="hi">10 Industries.</span></h2>
          <p className="pim-sub">Not fictional scenarios. Real companies, real data, real decisions. Every case study is graded and becomes part of your professional portfolio.</p>
          <div className="pim-cases-grid">
            {CASE_STUDIES.map((c, i) => (
              <div key={i} className="pim-case-card">
                <div className="pim-case-header">
                  <div className="pim-case-week">{c.week}</div>
                  <div className="pim-case-company">{c.company}</div>
                  <div className="pim-case-title">{c.title}</div>
                </div>
                <div className="pim-case-body">
                  <div className="pim-case-what">{c.what}</div>
                  <div className="pim-case-learn-label">You Will Learn To</div>
                  <ul className="pim-case-learn-list">
                    {c.learn.map((l, j) => <li key={j}>{l}</li>)}
                  </ul>
                  <div className="pim-case-skills">
                    {c.skills.map((s, j) => <span key={j} className="pim-skill-tag">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUEST LECTURES ── */}
      <section className="pim-section pim-guests-section" id="guests">
        <div className="pim-inner">
          <p className="pim-label">Industry Mentors</p>
          <h2 className="pim-title">5–7 Guest Lectures. <span className="hi">All Practitioners.</span></h2>
          <p className="pim-sub">No retired professors. Every guest is a working professional — willing to answer your career questions live.</p>
          <div className="pim-guests-grid">
            {GUEST_LECTURES.map((g, i) => (
              <div key={i} className="pim-guest-card">
                <div className="pim-guest-num">{g.num}</div>
                <div className="pim-guest-icon">{g.icon}</div>
                <div className="pim-guest-title">{g.title}</div>
                <div className="pim-guest-profile">{g.profile}</div>
                <div className="pim-guest-topic">"{g.topic}"</div>
                <ul className="pim-guest-points">
                  {g.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <span className="pim-guest-badge">🎤 {g.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPSTONE ── */}
      <section className="pim-capstone-section" id="capstone">
        <div className="pim-capstone-inner">
          <p className="pim-label" style={{ color: "var(--teal)" }}>Capstone Project</p>
          <h2 className="pim-capstone-headline">20 Hours. 3 Tracks.<br /><span style={{ color: "var(--orange)" }}>1 Portfolio Centrepiece.</span></h2>
          <p className="pim-capstone-sub">Your capstone is not a test — it's a professional deliverable. Choose your track, build your output, and present to an industry panel on Demo Day.</p>

          <div className="pim-capstone-tracks">
            {[
              { letter: "A", color: "var(--teal)", title: "Product Design Track", target: "For aspiring product managers and InsurTech founders", items: ["Design a new insurance product (India or GCC)", "10-slide pitch deck + pricing model", "IRDAI/CBUAE regulatory checklist", "Presented to a product panel"] },
              { letter: "B", color: "var(--orange)", title: "Finance & Compliance Track", target: "For aspiring actuaries, accountants and compliance analysts", items: ["Audit a listed insurer's annual report", "IFRS 17 CSM calculation", "DPDPA compliance gap assessment", "Written report + Excel model"] },
              { letter: "C", color: "var(--gold)", title: "Strategy & Market Entry Track", target: "For aspiring consultants and GCC-focused careers", items: ["GCC market entry recommendation for Indian InsurTech", "Regulatory mapping: CBUAE / SAMA", "Competitive analysis + GTM plan", "10-slide deck + video pitch"] },
            ].map((t, i) => (
              <div key={i} className="pim-track-card">
                <div className="pim-track-letter" style={{ color: t.color }}>{t.letter}</div>
                <div className="pim-track-title">{t.title}</div>
                <div className="pim-track-target">{t.target}</div>
                <ul className="pim-track-deliverables">
                  {t.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="pim-capstone-timeline">
            {[
              { bg: "rgba(13,184,160,.1)", week: "After Week 7", title: "Track Selection", desc: "Choose A, B, or C · Set mentor meeting" },
              { bg: "rgba(255,107,53,.1)", week: "Weeks 8–10", title: "Build Phase", desc: "20 hours self-paced · 1 mentor check-in" },
              { bg: "rgba(255,255,255,.04)", week: "Post Week 10", title: "Final Submission", desc: "Submit on EcoPro LMS · Panel review" },
              { bg: "rgba(240,180,41,.15)", week: "Demo Day", title: "Presentation", desc: "Live panel · Industry guests · Q&A" },
            ].map((s, i) => (
              <div key={i} className="pim-tl-step" style={{ background: s.bg }}>
                <div className="pim-tl-week">{s.week}</div>
                <div className="pim-tl-title">{s.title}</div>
                <div className="pim-tl-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT ── */}
      <section className="pim-section pim-offwhite" id="placement">
        <div className="pim-inner">
          <p className="pim-label">Placement &amp; Internship</p>
          <h2 className="pim-title">PIM Opens Doors —<br /><span className="hi">Not Just to Jobs. To Careers.</span></h2>
          <p className="pim-sub">Placement readiness support and warm introductions to Upskillize's insurance industry network. 3 target verticals. 90-day active support post-graduation.</p>

          <div className="pim-placement-cols">
            <div className="pim-placement-col">
              <div className="pim-placement-col-icon">🏦</div>
              <div className="pim-placement-col-title">Insurance Companies</div>
              <div className="pim-placement-col-list">
                <strong>LIC · HDFC Life · ICICI Lombard</strong><br />
                Bajaj Allianz GI · Tata AIG<br />
                <strong>HDFC Ergo · Star Health · Niva Bupa</strong><br />
                Go Digit · GIC Re · New India<br />
                <strong>ADNIC · Daman · AXA Gulf</strong><br />
                Tawuniya · Bupa Arabia (GCC)
                <em>Roles: UW Analyst, Claims Associate, Sales, Compliance, DPO</em>
              </div>
            </div>
            <div className="pim-placement-col">
              <div className="pim-placement-col-icon">💡</div>
              <div className="pim-placement-col-title">InsurTech Startups</div>
              <div className="pim-placement-col-list">
                <strong>Policybazaar · Acko · Go Digit</strong><br />
                Plum · Onsurity · Turtlemint<br />
                <strong>Riskcovry · RenewBuy · Coverfox</strong><br />
                Lemonade · ZhongAn (global)<br />
                <strong>Wefox · Oscar Health (GCC/global)</strong>
                <em>Roles: Product Owner, BA, Data Analyst, InsurTech PM</em>
              </div>
            </div>
            <div className="pim-placement-col">
              <div className="pim-placement-col-icon">💻</div>
              <div className="pim-placement-col-title">Software Companies</div>
              <div className="pim-placement-col-list">
                <strong>Guidewire (India office)</strong><br />
                Majesco · Sapiens Technologies<br />
                <strong>Infosys BFS · TCS Insurance</strong><br />
                Wipro Insurance · Cognizant FS<br />
                <strong>Mphasis Insurance BPO</strong><br />
                Capgemini Insurance
                <em>Roles: Business Analyst, Guidewire Dev, UAT, Data Analyst</em>
              </div>
            </div>
          </div>

          <div className="pim-salary-wrap">
            <table className="pim-salary-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>India (LPA)</th>
                  <th>GCC (AED/month)</th>
                  <th>Primary Modules</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Insurance Sales Consultant",  "₹3–5 LPA",   "AED 5,000–8,000",  "M1, M2, M3"],
                  ["Claims Processing Associate", "₹3.5–6 LPA", "AED 6,000–9,000",  "M4"],
                  ["Underwriting Analyst",         "₹4–8 LPA",   "AED 7,000–12,000", "M2, M6"],
                  ["InsurTech / Product Support",  "₹5–10 LPA",  "AED 8,000–14,000", "M3, M8"],
                  ["Fraud Detection Analyst",      "₹4.5–9 LPA", "AED 8,000–13,000", "M4, M6"],
                  ["Actuarial Trainee",             "₹5–12 LPA",  "AED 9,000–15,000", "M6"],
                  ["Compliance / DPO Analyst",     "₹4–8 LPA",   "AED 7,000–12,000", "M7, M9, M10"],
                  ["Data Analyst (Insurance)",      "₹5–10 LPA",  "AED 8,000–14,000", "M6, M7"],
                  ["Business Analyst (Insurance)", "₹5–10 LPA",  "AED 8,000–14,000", "M3, M8"],
                  ["Reinsurance Operations",        "₹4–9 LPA",   "AED 8,000–14,000", "M5"],
                ].map(([role, india, gcc, mod], i) => (
                  <tr key={i}>
                    <td>{role}</td>
                    <td className="sal-india">{india}</td>
                    <td className="sal-gcc">{gcc}</td>
                    <td className="sal-mod">{mod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MENTORING BOX */}
          <div className="pim-mentoring-box">
            <div className="pim-mentoring-left">
              <h3>Mentoring &amp; 90-Day Placement Support</h3>
              <p>Every PIM student gets an assigned mentor from Week 1 — an insurance industry professional who guides your capstone, reviews your resume, and connects you to their network.</p>
            </div>
            <div className="pim-mentoring-steps">
              {[
                "Mentor assigned on Day 1 via EcoPro LMS",
                "Doubt Clarification / Personal Guidance Sessions on need basis",
                "EcoPro Mentor Chat: 48-hr response SLA",
                "Capstone milestone reviews with written feedback",
                "Placement Assistance   : warm intros to 3 matched companies",
              ].map((text, i) => (
                <div key={i} className="pim-mentoring-step">
                  <div className="pim-m-step-num">{i + 1}</div>
                  <div className="pim-m-step-text">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* ── PIM DESIGNATION ── */}
<section className="pim-section" id="pim" style={{ background: "var(--white)" }}>
  <div className="pim-inner">
    <p className="pim-label" style={{ textAlign: "center" }}>Your Professional Credential</p>
    <h2 className="pim-title" style={{ textAlign: "center", marginBottom: 36 }}>The PIM <span className="hi">Designation.</span></h2>

    <div className="pim-cert-box">

      {/* ── Top Row: Logo left · Medal right ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "inline-block", background: "var(--white)", borderRadius: 6, padding: "4px 10px" }}>
          <img
            src="/images/logo.png"
            alt="Upskillize"
            style={{ height: 22, objectFit: "contain", display: "block" }}
          />
        </div>
        <div style={{ fontSize: 36, lineHeight: 1 }}>🏅</div>
      </div>

      {/* Upskillize Solutions label */}
      <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800, color: "var(--white)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 18, textAlign: "center" }}>
        Upskillize Solutions
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 18 }}>PROFESSIONAL CERTIFICATION — AICTE NEP 2020 ALIGNED</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>This is to certify that</div>
      <div style={{ fontFamily: "var(--font-head)", fontSize: "clamp(22px,5vw,32px)", fontWeight: 800, color: "var(--white)", marginBottom: 6 }}>Your Name Here</div>
      <div style={{ fontFamily: "var(--font-head)", fontSize: "clamp(16px,3vw,22px)", fontWeight: 700, color: "var(--gold)", marginBottom: 6 }}>Professional Insurance Manager (PIM)</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginBottom: 14 }}>Insurance, InsurTech &amp; DPDPA Professional Certification</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", lineHeight: 1.7 }}>Successfully completed 72 instructional hours · 4 academic credits<br />10 Modules · 10 Case Studies · 20+ AI Tools · Capstone Project</div>

      <div className="pim-cert-footer-grid">
        {[["4 Credits", "AICTE NEP 2020"], ["Digital Badge", "LinkedIn"], ["ID: PIM-2026-C054", "QR Verified"]].map(([a, b], i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--white)" }}>{a}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{b}</div>
          </div>
        ))}
      </div>
    </div>

    <p className="pim-label">Three Tiers of Recognition</p>
    <div className="pim-tiers-grid">
      {[
        { name: "PIM Pass",            criteria: "80% session attendance / uploaded videos completion · 8 out of 10 cases submitted · Final Exam ≥50%", extras: "Digital certificate · EcoPro LMS alumni access (6 months) · Credly badge", color: "var(--teal)"   },
        { name: "PIM with Merit",      criteria: "PIM Pass criteria + Overall score ≥70% + Capstone merit grade",                                        extras: "Silver digital badge · LinkedIn verification · Faculty endorsement",           color: "var(--orange)" },
        { name: "PIM with Distinction",criteria: "Merit criteria + Overall score ≥85% + Capstone distinction grade",                                    extras: "Gold badge · LinkedIn recommendation from faculty",                          color: "var(--gold)"   },
      ].map((t, i) => (
        <div key={i} className="pim-tier-card" style={{ borderTop: `3px solid ${t.color}` }}>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, color: "var(--navy-dark)", marginBottom: 10 }}>{t.name}</div>
          <div style={{ fontSize: 12, color: "var(--gray)", lineHeight: 1.7, marginBottom: 10 }}>{t.criteria}</div>
          <div style={{ fontSize: 11, color: t.color, fontWeight: 600, lineHeight: 1.7 }}>{t.extras}</div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* ── FAQ ── */}
      <section className="pim-section pim-faq-section" id="faq">
        <div className="pim-inner">
          <p className="pim-label">Frequently Asked Questions</p>
          <h2 className="pim-title" style={{ textAlign: "center", marginBottom: 32 }}>Everything You Need<br /><span className="hi">to Say Yes.</span></h2>
          <div className="pim-faq-list">
            {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pim-section pim-pricing-section" id="pricing">
        <div className="pim-inner">
          <p className="pim-label" style={{ textAlign: "center" }}>Enroll Now</p>
          <h2 className="pim-title" style={{ color: "var(--white)", textAlign: "center", marginBottom: 32 }}>Investment in Your<br /><span className="hi">Insurance Career.</span></h2>
          <div className="pim-pricing-box">
            <div className="pim-pricing-label">PIM Professional Certification · Full Program</div>
            <div className="pim-pricing-amount">₹35,000</div>
            <div className="pim-pricing-features">
              {PRICING_FEATURES.map((f, i) => (
                <div key={i} className="pim-pricing-feat">{f}</div>
              ))}
            </div>
            <div className="pim-pricing-ctas">
              <a href="/register" className="btn-primary" style={{ textAlign: "center", fontSize: 15, padding: "15px 32px" }}>Earn Your PIM — Enroll Now →</a>
              <a href="/contact" className="btn-secondary" style={{ color: "rgba(255,255,255,.65)", borderColor: "rgba(255,255,255,.2)", textAlign: "center" }}>Contact Us</a>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 18, textAlign: "center" }}>New batch · Max 40 students · Saturday + Sunday format</p>
          </div>
        </div>
      </section>
    </>
  );
}