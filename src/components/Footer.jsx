import { useLayoutEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   Footer.jsx — Upskillize Global Footer
   Add <Footer /> to your App.jsx or Layout.jsx
   CSS is self-contained — injected on mount, removed on unmount.
═══════════════════════════════════════════════════════════════════════ */

const FOOTER_CSS = `
/* ── FOOTER BASE ─────────────────────────────────────────────────────── */
.site-footer {
  background: linear-gradient(160deg, #0D1B3E 0%, #120D30 55%, #152347 100%);
  border-top: 1px solid rgba(201,168,76,.18);
  padding: clamp(3rem,7vw,5.5rem) clamp(1rem,4vw,3rem) 0;
  position: relative;
  overflow: hidden;
}
.site-footer::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -120px;
  width: 500px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(91,75,138,.12) 0%, transparent 70%);
  pointer-events: none;
}

/* ── FOOTER GRID ─────────────────────────────────────────────────────── */
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.35fr 1.1fr 0.9fr 1.05fr;
  gap: 48px 40px;
  padding-bottom: 3rem;
}

/* ── BRAND COLUMN ─────────────────────────────────────────────────────── */
.footer-brand {}
.footer-logo {
  display: inline-block;
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 23px;
  font-weight: 900;
  color: #FFFFFF;
  text-decoration: none;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}
.footer-logo span { color: #C9A84C; }

.footer-address-block {
  margin-bottom: 18px;
}
.footer-addr-label {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(201,168,76,.75);
  margin-bottom: 5px;
}
.footer-addr-text {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 12.5px;
  color: rgba(255,255,255,.5);
  line-height: 1.72;
}
.footer-addr-text a {
  color: rgba(255,255,255,.5);
  text-decoration: none;
  transition: color .2s;
}
.footer-addr-text a:hover { color: #C9A84C; }

.footer-social-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  margin-bottom: 10px;
  margin-top: 20px;
}
.footer-social {
  display: flex;
  gap: 10px;
}
.footer-social a {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  border: 1px solid rgba(255,255,255,.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.5);
  text-decoration: none;
  transition: all .22s;
  background: rgba(255,255,255,.03);
}
.footer-social a:hover {
  border-color: rgba(201,168,76,.45);
  color: #C9A84C;
  background: rgba(201,168,76,.07);
}
.footer-social svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* ── FOOTER COLUMN ─────────────────────────────────────────────────────── */
.footer-col {}
.footer-col-title {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}

/* Program badges */
.footer-program-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,.05);
  transition: all .2s;
}
.footer-program-link:last-of-type { border-bottom: none; }
.footer-program-link:hover .footer-prog-name { color: #C9A84C; }
.footer-prog-badge {
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 9px;
  font-weight: 800;
  padding: 3px 7px;
  border-radius: 5px;
  letter-spacing: .04em;
  white-space: nowrap;
  flex-shrink: 0;
}
.badge-pgdfdb {
  background: rgba(74,144,226,.18);
  color: #6AAAF0;
  border: 1px solid rgba(74,144,226,.25);
}
.badge-adfba {
  background: rgba(91,75,138,.25);
  color: #AFA9EC;
  border: 1px solid rgba(91,75,138,.3);
}
.footer-prog-name {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,.72);
  transition: color .2s;
}
.footer-prog-sub {
  font-size: 11px;
  color: rgba(255,255,255,.35);
  font-weight: 400;
}

.footer-cert-label {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.25);
  margin: 16px 0 8px;
}
.footer-cert-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  text-decoration: none;
  color: rgba(255,255,255,.5);
  font-size: 12.5px;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-weight: 500;
  transition: color .2s;
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.footer-cert-link:last-child { border-bottom: none; }
.footer-cert-link:hover { color: rgba(201,168,76,.85); }
.footer-cert-icon {
  font-size: 13px;
  flex-shrink: 0;
  width: 18px;
  text-align: center;
}
.footer-cert-arrow {
  margin-left: auto;
  font-size: 10px;
  opacity: .35;
  transition: opacity .2s, transform .2s;
}
.footer-cert-link:hover .footer-cert-arrow {
  opacity: .7;
  transform: translateX(3px);
}

/* Quick Links */
.footer-quick-link {
  display: block;
  padding: 7px 0;
  text-decoration: none;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,.52);
  border-bottom: 1px solid rgba(255,255,255,.04);
  transition: color .2s;
}
.footer-quick-link:last-child { border-bottom: none; }
.footer-quick-link:hover { color: rgba(201,168,76,.85); }
.footer-enrol-badge {
  display: inline-block;
  margin-left: 8px;
  font-size: 9px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(13,138,143,.2);
  color: #5DCAA5;
  letter-spacing: .05em;
  vertical-align: middle;
  border: 1px solid rgba(13,138,143,.3);
}

/* Lab CTA inside quick links */
.footer-lab-cta {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,.07);
}
.footer-lab-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.3);
  margin-bottom: 10px;
}
.footer-lab-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, rgba(13,138,143,.22), rgba(13,138,143,.12));
  border: 1px solid rgba(13,138,143,.35);
  color: #5DCAA5;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 12.5px;
  font-weight: 700;
  padding: 9px 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: all .22s;
  letter-spacing: .02em;
}
.footer-lab-btn:hover {
  background: linear-gradient(135deg, rgba(13,138,143,.35), rgba(13,138,143,.2));
  border-color: rgba(13,138,143,.55);
  color: #9FE1CB;
  transform: translateY(-1px);
}

/* Contact column */
.footer-contact-name {
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 15px;
  font-weight: 800;
  color: rgba(255,255,255,.85);
  margin-bottom: 3px;
  letter-spacing: -0.01em;
}
.footer-contact-role {
  font-size: 11.5px;
  color: rgba(255,255,255,.38);
  font-weight: 500;
  margin-bottom: 14px;
}
.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
  text-decoration: none;
  transition: color .2s;
}
.footer-contact-item:last-of-type { border-bottom: none; }
.footer-contact-icon {
  font-size: 13px;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}
.footer-contact-text {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 12.5px;
  color: rgba(255,255,255,.52);
  font-weight: 500;
  transition: color .2s;
}
a.footer-contact-item:hover .footer-contact-text { color: #C9A84C; }

.footer-partnerships {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,.07);
}
.footer-partnerships-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.28);
  margin-bottom: 10px;
}
.footer-contact-link {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 0;
  text-decoration: none;
  transition: color .2s;
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.footer-contact-link:last-child { border-bottom: none; }
.footer-contact-link:hover .footer-contact-text { color: rgba(201,168,76,.85); }
.footer-link-icon {
  font-size: 12px;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
  opacity: .5;
}

/* ── FOOTER BOTTOM BAR ───────────────────────────────────────────────── */
.footer-bottom {
  max-width: 1280px;
  margin: 0 auto;
  border-top: 1px solid rgba(255,255,255,.07);
  padding: 18px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px 24px;
}
.footer-bottom-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.footer-copy {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 12px;
  color: rgba(255,255,255,.32);
  font-weight: 500;
}
.footer-reg {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.footer-reg-item {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 11px;
  color: rgba(255,255,255,.25);
  font-weight: 500;
  white-space: nowrap;
}
.footer-reg-item span {
  color: rgba(255,255,255,.38);
  font-weight: 600;
}
.footer-bottom-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.footer-legal-link {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 12px;
  color: rgba(255,255,255,.32);
  text-decoration: none;
  font-weight: 500;
  transition: color .2s;
}
.footer-legal-link:hover { color: rgba(201,168,76,.7); }
.footer-legal-sep {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255,255,255,.2);
}

/* ── RESPONSIVE ──────────────────────────────────────────────────────── */
@media(max-width:1100px){
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 36px 32px;
  }
}
@media(max-width:680px){
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .footer-bottom-left { flex-direction: column; align-items: flex-start; gap: 8px; }
  .footer-reg { gap: 8px; }
  .footer-bottom-right { gap: 12px; }
}
`;

export default function Footer() {

  useLayoutEffect(() => {
    const id = "upskillize-footer-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = FOOTER_CSS;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Column 1: Brand ── */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">Up<span>skillize</span></a>

          <div className="footer-address-block">
            <div className="footer-addr-label">Regd. Off</div>
            <div className="footer-addr-text">
              Upskillize Academy Pvt. Ltd.<br />
              Bangalore, Karnataka – 560040, IN
            </div>
          </div>

          <div className="footer-address-block">
            <div className="footer-addr-label">Training Center</div>
            <div className="footer-addr-text">
              3444, Karma Koushalya Bhavan,<br />
              Service Road, Opp. Attiguppe Metro<br />
              Station, 2nd Stage, Vijayanagar,<br />
              Bengaluru – 560040, IN
            </div>
          </div>

          <div className="footer-social-label">Social Media</div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/upskillize" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://twitter.com/upskillize" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Column 2: Programs ── */}
        <div className="footer-col">
          <div className="footer-col-title">Programs</div>

          <a href="/courses/pgdfdb" className="footer-program-link">
            <span className="footer-prog-badge badge-pgdfdb">PGDFDB</span>
            <span>
              <div className="footer-prog-name">PGDFDB (Two Years)</div>
              <div className="footer-prog-sub">Post Graduate Diploma</div>
            </span>
          </a>

          <a href="/courses/adfba" className="footer-program-link">
            <span className="footer-prog-badge badge-adfba">ADFBA</span>
            <span>
              <div className="footer-prog-name">ADFBA (One Year)</div>
              <div className="footer-prog-sub">Advanced Diploma</div>
            </span>
          </a>

          <div className="footer-cert-label">Professional Certifications</div>

          {[
            { icon: "🏦", label: "AI in FinTech",         href: "/courses/ai-fintech"   },
            { icon: "🚀", label: "Product Leadership",     href: "/courses/product-leadership" },
            { icon: "📊", label: "Data & GenAI",           href: "/courses/data-genai"   },
            { icon: "⚙️", label: "Technology & Dx",        href: "/courses/tech-dx"      },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} className="footer-cert-link">
              <span className="footer-cert-icon">{icon}</span>
              {label}
              <span className="footer-cert-arrow">▾</span>
            </a>
          ))}
        </div>

        {/* ── Column 3: Quick Links ── */}
        <div className="footer-col">
          <div className="footer-col-title">Quick Links</div>

          {[
            { label: "Academic",            href: "/academic"          },
            { label: "Business Consulting", href: "/consulting"        },
            { label: "Corporate Training",  href: "/corporate"         },
            { label: "Products",            href: "/products"          },
            { label: "About",               href: "/about"             },
            { label: "Contact Us",          href: "/contact"           },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="footer-quick-link">{label}</a>
          ))}

          <a href="/register" className="footer-quick-link">
            Register <span className="footer-enrol-badge">Enrol</span>
          </a>

          <div className="footer-lab-cta">
            <div className="footer-lab-label">FinTech &amp; AI Innovation Lab</div>
            <a href="/innovation-lab" className="footer-lab-btn">
              🚀 Set Up Our Lab →
            </a>
          </div>
        </div>

        {/* ── Column 4: Contact ── */}
        <div className="footer-col">
          <div className="footer-col-title">Contact Us</div>

          <div className="footer-contact-name">Amit Agrawal</div>
          <div className="footer-contact-role">Co-Founder &amp; CGO</div>

          <a href="tel:+919820397297" className="footer-contact-item">
            <span className="footer-contact-icon">📱</span>
            <span className="footer-contact-text">+91 98203 97297</span>
          </a>
          <a href="mailto:amit@upskillize.com" className="footer-contact-item">
            <span className="footer-contact-icon">✉️</span>
            <span className="footer-contact-text">amit@upskillize.com</span>
          </a>

          <div className="footer-partnerships">
            <div className="footer-partnerships-label">Partnerships</div>

            <a href="mailto:info@upskillize.com" className="footer-contact-link">
              <span className="footer-link-icon">✉</span>
              <span className="footer-contact-text">info@upskillize.com</span>
            </a>
            <a href="https://www.upskillize.com" className="footer-contact-link" target="_blank" rel="noopener noreferrer">
              <span className="footer-link-icon">🌐</span>
              <span className="footer-contact-text">www.upskillize.com</span>
            </a>
            <a href="https://lms.upskillize.com" className="footer-contact-link" target="_blank" rel="noopener noreferrer">
              <span className="footer-link-icon">🖥</span>
              <span className="footer-contact-text">lms.upskillize.com</span>
            </a>
          </div>
        </div>

      </div>{/* end footer-inner */}

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-copy">© 2026 Upskillize – Bridging industry &amp; academia</span>
          <div className="footer-reg">
            <span className="footer-reg-item">Karnataka S&amp;E Reg No: <span>36/26/S/0047/2026</span></span>
            <span className="footer-reg-item">Udyam Reg No: <span>UDYAM-KR-03-0674691</span></span>
            <span className="footer-reg-item">GST Reg No: <span>29AAJFU2626F1Z1</span></span>
          </div>
        </div>
        <div className="footer-bottom-right">
          <a href="/privacy"  className="footer-legal-link">Privacy</a>
          <div className="footer-legal-sep" />
          <a href="/terms"    className="footer-legal-link">Terms</a>
          <div className="footer-legal-sep" />
          <a href="/contact"  className="footer-legal-link">Contact</a>
        </div>
      </div>

    </footer>
  );
}