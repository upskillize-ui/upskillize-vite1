import React, { useEffect } from 'react';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const ADVISORS = [
  {
    initials: 'RG', photo: '/images/advisorsIMG/RG.jpg',
    name: 'Ramesh Gupta', title: 'FinTech, Product & Dx Specialist',
    bio: '22+ years of global financial services experience with senior leadership roles at Credit Suisse Singapore, Emirates NBD Dubai, FIS Solutions, and Oracle Financial Services. Expert in risk management, regulatory compliance, and digital transformation (SAFe 6.0, FRM, PABF — IIM Bangalore).',
    linkedin: 'https://www.linkedin.com/in/krgupta/',
  },
  {
    initials: 'SS', photo: '/images/advisorsIMG/SS.jpg',
    name: 'Dr. Suresh A Shan', title: 'AICTE/BFSI/NAAC/NEP Expert | NBFC-CEO/CIO | AI & ESG Board Advisor',
    bio: 'Holds 3 PhDs in Computer Science and 2 DBAs in IT Governance. Researcher with deep expertise in cybersecurity, technology adoption in rural India, and IT governance frameworks. Passionate entrepreneur, innovator, and mentor.',
    linkedin: 'https://www.linkedin.com/in/assuresh/',
  },
  {
    initials: 'SAM', photo: '/images/advisorsIMG/SAM.jpg',
    name: 'Dr. Suresh A.M.', title: 'Founder & MD, Disciples India Educational Resources Pvt Ltd',
    bio: 'Founder & Managing Director of Disciples India Group, Bengaluru — three organisations serving entrepreneurship, management & engineering students and higher educational institutions since September 2014.',
    linkedin: 'https://www.linkedin.com/in/dr-suresh-a-m-59769829/',
  },
  {
    initials: 'RV', photo: '/images/advisorsIMG/RV.jpg',
    name: 'Rajendra Vemulapalli', title: 'Banking Technology & IT Strategy Expert',
    bio: 'Accomplished banking technology professional with extensive experience in core banking systems, digital transformation, and enterprise architecture. Proven expertise in leading large-scale technology implementations across financial services in global markets.',
    linkedin: 'https://www.linkedin.com/in/rajendra-vemulapalli-75031013/',
  },
  {
    initials: 'PB', photo: '/images/advisorsIMG/PR.jpg',
    name: 'Dr. PurnachandraRao B', title: 'DevOps, Cloud & Quantum Computing Expert',
    bio: 'PhD in Computer Science with 20+ years bridging academic research and industry practice. Expert in DevOps architectures, cloud platforms, and Java technologies. Pioneering work in quantum computing algorithms, quantum cryptography, and quantum-inspired NLP.',
    linkedin: 'https://www.linkedin.com/in/bobbepalli/',
  },
];

const MANAGEMENT = [
  {
    initials: 'AA', photo: '/images/advisorsIMG/AA.jpg',
    name: 'Amit Agrawal', role: 'Co-Founder & Chief Growth Officer',
    bio: 'A visionary leader with extensive experience in driving business growth and building strategic partnerships across the EdTech and professional services landscape. His passion for industry-academia collaboration has been instrumental in establishing Upskillize\'s innovative B2B2C approach and forging partnerships with premier MBA institutions.',
    linkedin: 'https://www.linkedin.com/in/amit-agrawal-5468021/',
  },
  {
    initials: 'AK', photo: '/images/advisorsIMG/AK.jpg',
    name: 'Alok Kumar', role: 'Business & Technology Executive',
    bio: 'Distinguished leader with deep expertise in digital transformation, consulting, and strategic execution across BFSI, thought leadership, and technology sectors. Proven track record of driving innovation and delivering complex enterprise solutions that bridge business objectives with cutting-edge technology.',
    linkedin: 'https://www.linkedin.com/in/alokkumar1978/',
  },
  {
    initials: 'HS', photo: '/images/advisorsIMG/HS.jpg',
    name: 'Hiren Shukla', role: 'Sales Director — India & Middle East',
    bio: 'Accomplished global executive with deep expertise in product innovation, digital ecosystems, and enterprise-scale transformation. Decades of leadership across financial services and technology-driven organisations. Known for strategic foresight and cross-border execution excellence.',
    linkedin: 'https://www.linkedin.com/in/shuklahiren/',
  },
  {
    initials: 'PL', photo: null,
    name: 'Mrs. Pushpa Latha', role: 'Head of Legal & Compliance',
    bio: 'Seasoned legal professional overseeing regulatory compliance, governance frameworks, and institutional partnerships. Her meticulous approach ensures Upskillize operates with the highest standards of legal integrity across all educational and corporate engagements.',
    linkedin: null,
  },
  {
    initials: 'PV', photo: null,
    name: 'Pavan', role: 'Chartered Accountant (CA)',
    bio: 'A qualified Chartered Accountant responsible for financial strategy, audit compliance, and fiscal governance at Upskillize. His expertise ensures sound financial stewardship as the organisation scales its reach across India and beyond.',
    linkedin: null,
  },
];

const TECHNICAL = [
  { initials: 'PP', photo: '/images/technicalIMG/PP.jpeg', name: 'Priyadarshini Pradhan', role: 'Technical Team', linkedin: 'https://www.linkedin.com/in/priyadarshini-pradhan-7a9a62287' },
  { initials: 'RK', photo: '/images/technicalIMG/RK.jpeg', name: 'Ranjana Kumari',        role: 'Technical Team', linkedin: 'https://www.linkedin.com/in/ranjana-kumari-109386216/' },
  { initials: 'HS', photo: '/images/technicalIMG/SP.jpeg', name: 'Haritha S P',           role: 'Technical Team', linkedin: 'https://www.linkedin.com/in/haritha-s-p-79bb1527a' },
];

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

const AdvisorCard = ({ initials, photo, name, title, bio, linkedin }, i) => {
  const [imgErr, setImgErr] = React.useState(false);
  const showImg = photo && !imgErr;
  return (
    <div className="adv-card" key={name} style={{ animationDelay: `${i * 0.1}s` }}>
      <div className="adv-avatar-wrap">
        {showImg
          ? <img src={photo} alt={name} className="adv-avatar-photo" onError={() => setImgErr(true)} />
          : <div className="adv-avatar-initials" style={{ display: 'flex' }}>{initials}</div>
        }
      </div>
      <div className="adv-body">
        <h3 className="adv-name">{name}</h3>
        <p className="adv-title">{title}</p>
        <p className="adv-bio">{bio}</p>
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="adv-link">
            <LinkedInIcon /> View Profile
          </a>
        )}
      </div>
    </div>
  );
};

const MgmtCard = ({ initials, photo, name, role, bio, linkedin }, i) => {
  const [imgErr, setImgErr] = React.useState(false);
  const showImg = photo && !imgErr;
  return (
    <div className="mgmt-card" key={name} style={{ animationDelay: `${i * 0.1}s` }}>
      <div className="mgmt-avatar-wrap">
        {showImg
          ? <img src={photo} alt={name} className="mgmt-photo" onError={() => setImgErr(true)} />
          : <div className="mgmt-initials" style={{ display: 'flex' }}>{initials}</div>
        }
      </div>
      <div className="mgmt-body">
        <h3 className="mgmt-name">{name}</h3>
        <p className="mgmt-role">{role}</p>
        <p className="mgmt-bio">{bio}</p>
        {linkedin ? (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mgmt-link">
            <LinkedInIcon /> LinkedIn
          </a>
        ) : null}
      </div>
    </div>
  );
};

const TechCard = ({ initials, photo, name, role, linkedin }) => {
  const [imgErr, setImgErr] = React.useState(false);
  const showImg = photo && !imgErr;
  return (
    <div className="tech-card" key={name}>
      <div className="tech-avatar">
        {showImg
          ? <img src={photo} alt={name} className="tech-photo" onError={() => setImgErr(true)} />
          : <span className="tech-initials">{initials}</span>
        }
      </div>
      <h4 className="tech-name">{name}</h4>
      <p className="tech-role">{role}</p>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="tech-link">
          <LinkedInIcon /> LinkedIn
        </a>
      )}
    </div>
  );
};

const SectionDivider = ({ label }) => (
  <div className="divider-wrap">
    <span className="divider-line" />
    <span className="divider-label">{label}</span>
    <span className="divider-line" />
  </div>
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const About = () => {
  useEffect(() => {
    const id = 'about-us-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = styles;
      document.head.appendChild(el);
    }
    return () => { const s = document.getElementById(id); if (s) s.remove(); };
  }, []);

  return (
    <div className="aup">

      {/* ── HERO ── */}
      <section className="aup-hero">
        <div className="aup-hero-glow" />
        <div className="aup-hero-dots" />
        <div className="aup-hero-content">
          <span className="aup-chip">About Upskillize</span>
          <h1 className="aup-hero-h1">Meet the Minds<br />Behind Your Success</h1>
          <p className="aup-hero-sub">
            Industry veterans, legal & financial experts, and passionate educators —
            united by a single purpose: bridging academia and real-world excellence.
          </p>
          <div className="aup-hero-stats">
            <div className="stat-item"><span className="stat-num">50+</span><span className="stat-label">Industry Experts</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">5</span><span className="stat-label">Advisory Board Members</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">4+</span><span className="stat-label">Domains Covered</span></div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="aup-mission">
        <div className="aup-mission-inner">
          <div className="quote-mark">"</div>
          <p className="aup-mission-text">
            At Upskillize, we empower professionals and students with practical,
            industry-relevant skills in BFSI, AI Product Management, BI Tools, and GenAI.
            Our approach combines deep domain expertise with innovative educational methodologies
            to create transformative learning experiences that drive real career outcomes.
          </p>
        </div>
      </section>

      {/* ── ADVISORY BOARD ── */}
      <section className="aup-section">
        <div className="aup-container">
          <SectionDivider label="Guiding Vision" />
          <div className="aup-section-head">
            <h2 className="aup-section-title">Advisory Board</h2>
            <p className="aup-section-desc">
              Distinguished thought leaders providing strategic direction and deep domain mentorship
            </p>
          </div>
          <div className="adv-grid">
            {ADVISORS.map((a, i) => AdvisorCard(a, i))}
          </div>
        </div>
      </section>

      {/* ── MANAGEMENT TEAM ── */}
      <section className="aup-section aup-section--alt">
        <div className="aup-container">
          <SectionDivider label="Core Leadership" />
          <div className="aup-section-head">
            <h2 className="aup-section-title">Management Team</h2>
            <p className="aup-section-desc">
              The driving force behind Upskillize — combining growth, technology, legal, and financial expertise
            </p>
          </div>
          <div className="mgmt-grid">
            {MANAGEMENT.map((m, i) => MgmtCard(m, i))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY EXPERTS ── */}
      <section className="aup-section aup-section--experts">
        <div className="aup-container">
          <SectionDivider label="Real-World Practitioners" />
          <div className="aup-section-head">
            <h2 className="aup-section-title">Our Industry Experts</h2>
            <p className="aup-section-desc">
              Practitioners from BFSI, FinTech, AI/ML, and enterprise domains who bring live industry context to every programme
            </p>
          </div>
          <div className="experts-coming">
            <div className="experts-icon">⚡</div>
            <p className="experts-text">
              Our curated panel of domain experts is continuously growing. Stay tuned as we bring aboard
              more seasoned professionals to enrich your learning journey.
            </p>
            <a href="/courses" className="aup-btn-outline">Explore Our Programmes →</a>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL TEAM ── */}
      <section className="aup-section aup-section--tech">
        <div className="aup-container">
          <SectionDivider label="Behind the Platform" />
          <div className="aup-section-head">
            <h2 className="aup-section-title">Technical Team</h2>
            <p className="aup-section-desc">
              The talented professionals keeping Upskillize's platform seamless and learner-first
            </p>
          </div>
          <div className="tech-row">
            {TECHNICAL.map(t => TechCard(t))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="aup-cta">
        <div className="aup-cta-glow" />
        <div className="aup-cta-content">
          <span className="aup-chip aup-chip--gold">Start Today</span>
          <h2 className="aup-cta-title">Ready to Transform Your Career?</h2>
          <p className="aup-cta-sub">Join thousands of NextGen professionals advancing with Upskillize</p>
          <a href="/courses" className="aup-cta-btn">Explore Our Programmes</a>
        </div>
      </section>

    </div>
  );
};

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

/* ── TOKENS ── */
:root {
  --navy-900: #060d1f;
  --navy-800: #0d1a35;
  --navy-700: #132240;
  --navy-600: #1a2d52;
  --navy-500: #1e3a6b;
  --blue-400: #4e9af1;
  --blue-300: #82bcff;
  --gold:     #f0b429;
  --gold-dim: rgba(240,180,41,0.15);
  --white:    #ffffff;
  --white-80: rgba(255,255,255,0.80);
  --white-50: rgba(255,255,255,0.50);
  --white-20: rgba(255,255,255,0.12);
  --white-08: rgba(255,255,255,0.06);
  --font-serif: 'Spectral', Georgia, serif;
  --font-sans:  'DM Sans', system-ui, sans-serif;
  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-sm: 10px;
  --shadow-card: 0 12px 48px rgba(0,0,0,0.35);
  --shadow-hover: 0 24px 64px rgba(0,0,0,0.45);
  --transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
}

*,.aup *{margin:0;padding:0;box-sizing:border-box;}

/* ── PAGE ── */
.aup {
  width: 100%;
  background: var(--navy-900);
  font-family: var(--font-sans);
  color: var(--white);
  line-height: 1.6;
  overflow-x: hidden;
}

/* ── CHIP ── */
.aup-chip {
  display: inline-block;
  background: var(--white-08);
  border: 1px solid var(--white-20);
  color: var(--blue-300);
  padding: 0.45rem 1.25rem;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
.aup-chip--gold { color: var(--gold); border-color: rgba(240,180,41,0.4); background: var(--gold-dim); }

/* ────────────────────────
   HERO
──────────────────────── */
.aup-hero {
  position: relative;
  background: linear-gradient(150deg, var(--navy-900) 0%, var(--navy-700) 60%, #1a3060 100%);
  padding: 7rem 2rem 5.5rem;
  overflow: hidden;
}
.aup-hero-glow {
  position: absolute; top: -30%; right: -15%;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(78,154,241,0.12) 0%, transparent 65%);
  border-radius: 50%; pointer-events: none;
}
.aup-hero-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
}
.aup-hero-content {
  position: relative; z-index: 2;
  max-width: 820px; margin: 0 auto;
  animation: fadeUp 0.9s ease-out;
}
.aup-hero-h1 {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  font-weight: 700;
  line-height: 1.18;
  color: var(--white);
  margin-bottom: 1.4rem;
}
.aup-hero-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--white-80);
  max-width: 640px;
  line-height: 1.8;
  margin-bottom: 3rem;
}
.aup-hero-stats {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
.stat-num {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.stat-label { font-size: 0.82rem; color: var(--white-50); font-weight: 500; letter-spacing: 0.3px; }
.stat-divider { width: 1px; height: 3rem; background: var(--white-20); }

/* ────────────────────────
   MISSION
──────────────────────── */
.aup-mission {
  background: linear-gradient(135deg, var(--navy-800), var(--navy-700));
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
}
.aup-mission::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 160px);
}
.aup-mission-inner {
  max-width: 860px; margin: 0 auto;
  position: relative; z-index: 2;
  border-left: 3px solid var(--gold);
  padding-left: 3rem;
}
.quote-mark {
  font-family: var(--font-serif);
  font-size: 6rem;
  color: var(--gold);
  opacity: 0.4;
  line-height: 1;
  margin-bottom: -1rem;
}
.aup-mission-text {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 2.2vw, 1.55rem);
  font-weight: 400;
  line-height: 1.85;
  color: var(--white-80);
  text-align: left;
}

/* ────────────────────────
   SHARED SECTION
──────────────────────── */
.aup-section { padding: 6rem 0; }
.aup-section--alt { background: linear-gradient(180deg, var(--navy-800) 0%, var(--navy-900) 100%); }
.aup-section--experts { background: var(--navy-900); }
.aup-section--tech { background: linear-gradient(180deg, var(--navy-800) 0%, var(--navy-900) 100%); }
.aup-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

/* DIVIDER */
.divider-wrap {
  display: flex; align-items: center; gap: 1.2rem;
  margin-bottom: 2.5rem;
}
.divider-line { flex: 1; height: 1px; background: var(--white-20); }
.divider-label {
  font-size: 0.75rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--blue-300);
  white-space: nowrap;
}

/* SECTION HEADER */
.aup-section-head { text-align: center; margin-bottom: 4rem; }
.aup-section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--white);
  margin-bottom: 1rem;
}
.aup-section-desc {
  font-size: 1.1rem; color: var(--white-50); max-width: 620px;
  margin: 0 auto; line-height: 1.8;
}

/* ────────────────────────
   ADVISOR CARDS — compact circular avatar (same as mgmt)
──────────────────────── */
.adv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.adv-card:last-child:nth-child(4n+1) {
  grid-column: 1 / -1;
  max-width: calc(25% - 1.2rem);
  margin: 0 auto;
}
.adv-card {
  background: var(--navy-700);
  border: 1px solid var(--white-20);
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.5rem 1.5rem;
  box-shadow: var(--shadow-card);
  transition: var(--transition);
  animation: fadeUp 0.7s ease-out backwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.adv-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(78,154,241,0.45);
}
/* Circular avatar */
.adv-avatar-wrap {
  width: 120px; height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2.5px solid rgba(78,154,241,0.45);
  background: linear-gradient(135deg, var(--navy-900), var(--navy-600));
  flex-shrink: 0;
  margin-bottom: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.adv-avatar-photo {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 15%; display: block;
}
.adv-avatar-initials {
  font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700;
  color: var(--blue-300);
  align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
.adv-body { display: flex; flex-direction: column; align-items: center; gap: 0; width: 100%; flex: 1; }
.adv-name { font-family: var(--font-serif); font-size: 1.1rem; font-weight: 700; color: var(--white); margin-bottom: 0.3rem; line-height: 1.3; }
.adv-title { font-size: 0.72rem; color: var(--gold); font-weight: 700; line-height: 1.4; margin-bottom: 0.85rem; text-transform: uppercase; letter-spacing: 0.3px; }
.adv-bio { font-size: 0.82rem; color: var(--white-80); line-height: 1.75; flex: 1; margin-bottom: 1.1rem; text-align: center; }
.adv-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: var(--blue-300); text-decoration: none;
  font-weight: 600; font-size: 0.78rem;
  padding: 0.45rem 1rem;
  border: 1.5px solid rgba(78,154,241,0.4);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}
.adv-link:hover { background: var(--blue-400); color: var(--white); border-color: var(--blue-400); }

/* ────────────────────────
   MANAGEMENT TEAM — compact vertical cards
──────────────────────── */
.mgmt-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.mgmt-card {
  background: linear-gradient(160deg, rgba(30,58,107,0.65) 0%, rgba(13,26,53,0.85) 100%);
  border: 1px solid rgba(240,180,41,0.2);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1rem 1.25rem;
  box-shadow: var(--shadow-card);
  transition: var(--transition);
  animation: fadeUp 0.7s ease-out backwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.mgmt-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(240,180,41,0.5);
}

/* Circular avatar */
.mgmt-avatar-wrap {
  width: 120px; height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2.5px solid rgba(240,180,41,0.45);
  background: linear-gradient(135deg, var(--navy-900), var(--navy-600));
  flex-shrink: 0;
  margin-bottom: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.mgmt-photo {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 15%; display: block;
}
.mgmt-initials {
  font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700;
  color: var(--gold);
  align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
.mgmt-body {
  display: flex; flex-direction: column; align-items: center; gap: 0; width: 100%; flex: 1;
}
.mgmt-name {
  font-family: var(--font-serif); font-size: 1.1rem; font-weight: 700;
  color: var(--white); margin-bottom: 0.25rem; line-height: 1.3;
}
.mgmt-role {
  font-size: 0.72rem; color: var(--gold); font-weight: 700;
  letter-spacing: 0.5px; margin-bottom: 0.85rem;
  text-transform: uppercase; line-height: 1.4;
}
.mgmt-bio {
  font-size: 0.78rem; color: var(--white-80); line-height: 1.65;
  margin-bottom: 0.85rem; text-align: center; flex: 1;
}
.mgmt-link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  color: var(--blue-300); text-decoration: none;
  font-weight: 600; font-size: 0.78rem;
  padding: 0.45rem 1rem;
  border: 1.5px solid rgba(78,154,241,0.35);
  border-radius: var(--radius-sm);
  transition: var(--transition);
  white-space: nowrap;
  margin-top: auto;
}
.mgmt-link:hover { background: var(--blue-400); color: var(--white); border-color: var(--blue-400); }

.mgmt-card:last-child:nth-child(4n+1) {
  grid-column: 1 / -1;
  max-width: calc(25% - 1rem);
  margin: 0 auto;
}

/* ────────────────────────
   INDUSTRY EXPERTS
──────────────────────── */
.experts-coming {
  text-align: center;
  background: var(--white-08);
  border: 1px solid var(--white-20);
  border-radius: var(--radius-lg);
  padding: 4rem 3rem;
  max-width: 700px; margin: 0 auto;
}
.experts-icon { font-size: 3rem; margin-bottom: 1.25rem; }
.experts-text { font-size: 1.05rem; color: var(--white-80); line-height: 1.8; margin-bottom: 2rem; }
.aup-btn-outline {
  display: inline-block;
  color: var(--gold); text-decoration: none; font-weight: 700; font-size: 0.95rem;
  padding: 0.85rem 2.2rem;
  border: 2px solid var(--gold);
  border-radius: var(--radius-md);
  transition: var(--transition);
  white-space: nowrap;
}
.aup-btn-outline:hover { background: var(--gold); color: var(--navy-900); transform: translateY(-3px); }

/* ────────────────────────
   TECHNICAL TEAM
──────────────────────── */
.tech-row {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}
.tech-card {
  text-align: center;
  transition: var(--transition);
}
.tech-card:hover { transform: translateY(-6px); }
.tech-avatar {
  width: 150px; height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--navy-500), var(--navy-700));
  border: 2px solid rgba(78,154,241,0.35);
  margin: 0 auto 1.1rem;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  transition: var(--transition);
}
.tech-card:hover .tech-avatar { border-color: var(--gold); box-shadow: 0 12px 40px rgba(240,180,41,0.2); }
.tech-photo { width: 100%; height: 100%; object-fit: cover; object-position: center 15%; }
.tech-initials { font-family: var(--font-serif); font-size: 2rem; font-weight: 700; color: var(--blue-300); }
.tech-name { font-family: var(--font-serif); font-size: 1.2rem; font-weight: 700; color: var(--white); margin-bottom: 0.3rem; }
.tech-role { font-size: 0.8rem; color: var(--white-50); letter-spacing: 0.5px; text-transform: uppercase; font-weight: 600; margin-bottom: 0.75rem; }
.tech-link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  color: var(--blue-300); text-decoration: none;
  font-weight: 600; font-size: 0.78rem;
  padding: 0.4rem 0.9rem;
  border: 1.5px solid rgba(78,154,241,0.35);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}
.tech-link:hover { background: var(--blue-400); color: var(--white); border-color: var(--blue-400); }

/* ────────────────────────
   CTA
──────────────────────── */
.aup-cta {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, var(--navy-700), var(--navy-800));
  padding: 7rem 2rem;
  text-align: center;
  border-top: 1px solid var(--white-20);
}
.aup-cta-glow {
  position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(240,180,41,0.1) 0%, transparent 65%);
  border-radius: 50%; pointer-events: none;
}
.aup-cta-content { position: relative; z-index: 2; }
.aup-cta-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700; color: var(--white); margin-bottom: 1.25rem;
}
.aup-cta-sub { font-size: 1.15rem; color: var(--white-80); margin-bottom: 2.5rem; }
.aup-cta-btn {
  display: inline-block;
  background: var(--gold); color: var(--navy-900);
  font-family: var(--font-sans); font-weight: 700; font-size: 1.05rem;
  padding: 1.1rem 3rem; border-radius: var(--radius-md);
  text-decoration: none; letter-spacing: 0.3px;
  box-shadow: 0 8px 30px rgba(240,180,41,0.35);
  transition: var(--transition);
}
.aup-cta-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 40px rgba(240,180,41,0.45);
  background: #ffc940;
}

/* ────────────────────────
   ANIMATIONS
──────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
.adv-card:nth-child(1){animation-delay:0.05s;}
.adv-card:nth-child(2){animation-delay:0.12s;}
.adv-card:nth-child(3){animation-delay:0.19s;}
.adv-card:nth-child(4){animation-delay:0.26s;}
.adv-card:nth-child(5){animation-delay:0.33s;}
.mgmt-card:nth-child(1){animation-delay:0.06s;}
.mgmt-card:nth-child(2){animation-delay:0.14s;}
.mgmt-card:nth-child(3){animation-delay:0.22s;}
.mgmt-card:nth-child(4){animation-delay:0.30s;}
.mgmt-card:nth-child(5){animation-delay:0.38s;}

/* ────────────────────────
   RESPONSIVE
──────────────────────── */
@media (max-width: 1100px) {
  .adv-grid { grid-template-columns: repeat(3, 1fr); }
  .adv-card:last-child:nth-child(4n+1) { grid-column: unset; }
  .mgmt-grid { grid-template-columns: repeat(3, 1fr); }
  .mgmt-card:last-child:nth-child(4n+1) { grid-column: unset; max-width: unset; margin: 0; }
}
@media (max-width: 900px) {
  .adv-grid { grid-template-columns: repeat(2, 1fr); }
  .adv-card:last-child:nth-child(4n+1) { grid-column: unset; }
  .mgmt-grid { grid-template-columns: repeat(2, 1fr); }
  .mgmt-card:last-child:nth-child(4n+1) { grid-column: unset; max-width: unset; margin: 0; }
  .exp-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .aup-hero { padding: 5rem 1.5rem 4rem; }
  .aup-hero-stats { gap: 1.5rem; }
  .stat-num { font-size: 1.8rem; }
  .aup-mission-inner { padding-left: 1.5rem; }
  .aup-section { padding: 4rem 0; }
  .adv-grid, .mgmt-grid { grid-template-columns: repeat(2, 1fr); }
  .adv-card:last-child:nth-child(4n+1) { grid-column: unset; }
  .tech-row { gap: 2rem; }
  .experts-coming { padding: 2.5rem 1.5rem; }
}
`;

export default About;