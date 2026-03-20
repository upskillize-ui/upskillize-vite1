import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full mt-16 text-white">
      
      {/* ===== MAIN FOOTER ===== */}
      <div className="bg-gradient-to-r bg-gradient-to-br via-cyan-500 to-green-400">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold">Upskillize</h3>
            <div className="mt-4 text-sm leading-relaxed text-white/80 space-y-3">
              <div>
                <p className="font-semibold text-white">Regd. Off :</p>
                <p>Ushodaya, Raghavendra Circle, Ramamurthy Nagar, Bangalore – 560016</p>
              </div>
              <div>
                <p className="font-semibold text-white">Training Center :</p>
                <p>3444, Chord Rd, opp. Attiguppe, Govindaraja Nagar Ward, 2nd Stage, Vijayanagar, Bengaluru, Karnataka 560040</p>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-base font-semibold mb-3">Social Media</h4>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/company/upskillize-excel-beyond"    
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/upskillize36330" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold">Programs</h3>
            <ul className="space-y-2 text-sm mt-4">
              <li>
                <Link to="/courses/pgcdb" className="text-white/80 transition-colors">
                  PGDFDB (Two Year)
                </Link>
              </li>
              <li>
                <Link to="/courses/pgcdf" className="text-white/80 transition-colors">
                  PGDFBA (One Year)
                </Link>
              </li>
              <li>
                <Link to="/courses/ai-fintech" className="text-white/80 transition-colors">
                  AI in Fintech
                </Link>
              </li>
              <li>
                <Link to="/courses/product-leadership" className="text-white/80 transition-colors">
                  Product Leadership
                </Link>
              </li>
              <li>
                <Link to="/courses/data-analytics-genai" className="text-white/80 transition-colors">
                  Data Analytics, GenAI & BI
                </Link>
              </li>
              <li>
                <Link to="/courses/technology-digital-transformation" className="text-white/80 transition-colors">
                  Technology & DT
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm mt-4">
              <li>
                <Link to="/academic" className="text-white/80">
                  Academic
                </Link>
              </li>
              <li>
                <Link to="/corporate/consulting" className="text-white/80">
                  Business Consulting
                </Link>
              </li>
              <li>
                <Link to="/corporate/training" className="text-white/80">
                  Corporate Training
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-white/80">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80">
                  Contact Us
                </Link>
              </li>
            </ul>
            {/* ── Set Up Our Lab CTA ── */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-sm font-semibold text-white mb-3">FinTech &amp; AI Innovation Lab</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{background:"linear-gradient(135deg,#00C9A7,#009E85)",boxShadow:"0 4px 14px rgba(0,201,167,.3)"}}
              >
                🚀 Set Up Our Lab →
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="mt-4"><strong className="font-bold text-white/80">Amit Agrawal</strong></p>
            <p className="text-sm">Co-Founder &amp; CGO</p>
            <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
              📱 +91 98203 97297
            </p>
            <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              amit@upskillize.com
            </p>

            {/* Partners & Co-branded */}
            <div className="mt-5 pt-4 border-t border-white/20">
              <p className="text-sm font-semibold text-white">Partners &amp; Co-Branded</p>
              <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                partnerships@upskillize.com
              </p>

              {/* Website links */}
              <div className="mt-4 space-y-2">
                <a href="https://www.upskillize.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">www.upskillize.com</span>
                </a>

                <a href="https://lms.upskillize.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">lms.upskillize.com</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="bg-[#0B1D2A] border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Left — copyright + reg numbers in one line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span style={{fontSize:"0.72rem"}} className="text-white/70 font-medium whitespace-nowrap">
              © {new Date().getFullYear()} Upskillize – Bridging industry &amp; academia
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span style={{fontSize:"0.65rem"}} className="text-white/50 whitespace-nowrap">
              Karnataka S&amp;E Reg. No: 36/26/S/0047/2026
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span style={{fontSize:"0.65rem"}} className="text-white/50 whitespace-nowrap">
              Udyam Reg. No: UDYAM-KR-03-0674691
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span style={{fontSize:"0.65rem"}} className="text-white/50 whitespace-nowrap">
              GST Reg. No: 29AAJFU2626F1Z1
            </span>
          </div>

          {/* Right — links */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/privacy" style={{fontSize:"0.72rem"}} className="text-white/70 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" style={{fontSize:"0.72rem"}} className="text-white/70 hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" style={{fontSize:"0.72rem"}} className="text-white/70 hover:text-white transition-colors">Contact</Link>
          </div>

        </div>
      </div>

    </footer>
  );
}