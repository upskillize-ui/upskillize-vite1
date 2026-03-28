import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  User, Phone, Mail, BookOpen, CreditCard,
  CheckCircle, ChevronDown, ArrowRight, Shield,
  Smartphone, Building2, Wallet, Clock, Tag, PlusCircle, X,
} from "lucide-react";
import Navbar from "../components/Navbar";

/* ─── Courses — full name, short badge, duration, fee ─── */
const ALL_COURSES = [
  { group: "Two Years Programs",  label: "Post Graduate Diploma in Digital Business & FinTech",        badge: "PGD-FDB",  duration: "2 Years",   fee: "₹2,50,000", feeNum: 250000, feeNote: "per year" },
  { group: "One Year Program",  label: "Advanced Diploma in FinTech, Banking & AI",                   badge: "ADFBA",    duration: "1 Year",    fee: "₹1,45,000", feeNum: 145000, feeNote: "total" },
  { group: "AI in FinTech",      label: "Certified FinTech & AI Mastery Program",                      badge: "CFTA",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "AI in FinTech",      label: "Certified BFSI Domain Excellence Program",                    badge: "CBFSP",    duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "AI in FinTech",      label: "Certified Investment Banking & Wealth Tech Program",          badge: "CWTP",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "AI in FinTech",      label: "Certified Risk Management & RegTech Program",                 badge: "CRPP",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "AI in FinTech",      label: "Certified Insurance, InsurTech & DPDPA Course",               badge: "CITP",     duration: "3 Months",  fee: "₹35,000",   feeNum: 35000,  feeNote: "per course" },
  { group: "AI in FinTech",      label: "Certified AI in Financial Services Program",                  badge: "CFAP",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Product Leadership", label: "Certified The Mini CEO Program",                              badge: "CTPM",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Product Leadership", label: "Certified AI Product Management Mastery",                     badge: "CAIPM",    duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Product Leadership", label: "Certified Product Management for Techies",                    badge: "CPM",      duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Product Leadership", label: "Certified Design Thinking & Building User-Driven Solutions",  badge: "CDP",      duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Product Leadership", label: "Certified Business Analysis Foundation",                      badge: "CBA",      duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Data & GenAI",       label: "Certified Data to Decisions: Power BI & AI",                  badge: "CDAP",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Data & GenAI",       label: "Certified AI & ML for Business Leaders",                      badge: "CAMA",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Data & GenAI",       label: "Certified Strategic Data Analytics Program",                  badge: "CPS",      duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Technology & Dx",    label: "Certified Digital Business Strategy & Innovation",            badge: "CDSL",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Technology & Dx",    label: "Certified AI & Digital Project Management",                   badge: "CDPM",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
  { group: "Technology & Dx",    label: "Certified Emerging Technologies, IoT & Industry 4.0",        badge: "CI4P",     duration: "3 Months",  fee: "₹25,000",   feeNum: 25000,  feeNote: "per course" },
];

/* ─── Map short navbar names → full names ─── */
const NAVBAR_TO_FULL = {
  "FinTech Domain Excellence":              "Certified BFSI Domain Excellence Program",
  "BFSI Domain Excellence":                "Certified BFSI Domain Excellence Program",
  "Investment Banking & Wealth Tech":       "Certified Investment Banking & Wealth Tech Program",
  "Risk Management & RegTech":              "Certified Risk Management & RegTech Program",
  "FinTech & AI Mastery":                   "Certified FinTech & AI Mastery Program",
  "Insurance, InsurTech & DPDPA":           "Certified Insurance, InsurTech & DPDPA Course",
  "AI in Financial Services":               "Certified AI in Financial Services Program",
  "The Mini CEO Program":                   "Certified The Mini CEO Program",
  "AI Product Management Mastery":          "Certified AI Product Management Mastery",
  "Product Management for Techies":         "Certified Product Management for Techies",
  "Design Thinking & User Solutions":       "Certified Design Thinking & Building User-Driven Solutions",
  "Business Analysis Foundation":           "Certified Business Analysis Foundation",
  "Data to Decisions: Power BI & AI":       "Certified Data to Decisions: Power BI & AI",
  "AI & ML for Business Leaders":           "Certified AI & ML for Business Leaders",
  "Strategic Data Analytics":               "Certified Strategic Data Analytics Program",
  "Digital Business Strategy & Innovation": "Certified Digital Business Strategy & Innovation",
  "AI & Digital Project Management":        "Certified AI & Digital Project Management",
  "Emerging Technologies & Industry 4.0":  "Certified Emerging Technologies, IoT & Industry 4.0",
  "PG Diploma in FinTech & Digital Business":   "Post Graduate Diploma in Digital Business & FinTech",
  "PG Diploma in Digital Business & FinTech":   "Post Graduate Diploma in Digital Business & FinTech",
  "Advanced Diploma in FinTech, Banking & AI":  "Advanced Diploma in FinTech, Banking & AI",
};

const PAYMENT_METHODS = [
  { id: "upi",     label: "UPI",         icon: <Smartphone size={18} />, desc: "GPay, PhonePe, Paytm" },
  { id: "card",    label: "Card",        icon: <CreditCard size={18} />, desc: "Credit / Debit card" },
  { id: "netbank", label: "Net Banking", icon: <Building2 size={18} />,  desc: "All major banks" },
  { id: "wallet",  label: "Wallet",      icon: <Wallet size={18} />,     desc: "Paytm, Amazon Pay" },
];

const GROUPS = [...new Set(ALL_COURSES.map(c => c.group))];

// Only cert courses can be bundled (not degree programs)
const CERT_COURSES = ALL_COURSES.filter(c => !["Two Year Programs","One Year Programs"].includes(c.group));

function formatINR(num) {
  return "₹" + num.toLocaleString("en-IN");
}

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const rawParam = searchParams.get("course") || "";
  const resolvedCourse = NAVBAR_TO_FULL[rawParam] || rawParam;

  const [form, setForm]           = useState({ name:"", phone:"", email:"", course: resolvedCourse, payment:"" });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [paying, setPaying]       = useState(false);
  const [course2, setCourse2]     = useState(""); // second bundled cert course
  const [showBundle, setShowBundle] = useState(false);

  useEffect(() => {
    if (resolvedCourse) setForm(f => ({ ...f, course: resolvedCourse }));
  }, [resolvedCourse]);

  const selectedCourse  = ALL_COURSES.find(c => c.label === form.course);
  const selectedCourse2 = CERT_COURSES.find(c => c.label === course2);

  // Determine if bundle discount applies
  const isCert = (c) => c && !["Two Year Programs","One Year Programs"].includes(c.group);
  const bundleActive = isCert(selectedCourse) && selectedCourse2 && course2 !== form.course;

  // Fee calculation
  let totalFee = selectedCourse ? selectedCourse.feeNum : 0;
  if (bundleActive) totalFee += selectedCourse2.feeNum;
  const discount = bundleActive ? Math.round(totalFee * 0.05) : 0;
  const payable  = totalFee - discount;

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name   = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.course)  e.course  = "Please select a program";
    if (!form.payment) e.payment = "Please choose a payment method";
    return e;
  };

  const handleAddToCart = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setPaying(true);
    setTimeout(() => { setPaying(false); setSubmitted(true); }, 1800);
  };

  /* ─── Success screen ─── */
  if (submitted) {
    return (
      <div style={{ minHeight:"100vh", background:"#F8FAFC", fontFamily:"'DM Sans',sans-serif" }}>
        <Navbar />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"6rem 1.5rem 3rem" }}>
          <div style={{ background:"#fff", border:"1.5px solid #E2E8F4", borderRadius:"1.5rem", padding:"3rem 2.5rem", textAlign:"center", maxWidth:480, boxShadow:"0 8px 40px rgba(7,17,46,.09)", margin:"0 auto" }}>
            <div style={{ width:76, height:76, background:"linear-gradient(135deg,#00C9A7,#009E85)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", boxShadow:"0 8px 32px rgba(0,201,167,.3)" }}>
              <CheckCircle size={38} color="#fff" />
            </div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"1.75rem", fontWeight:800, color:"#07112E", marginBottom:".5rem" }}>
              You're Enrolled! 🎉
            </h2>
            <p style={{ color:"#3D4966", fontSize:".9rem", lineHeight:1.75, marginBottom:"1.5rem" }}>
              Welcome to <strong style={{ color:"#07112E" }}>Upskillize</strong>! Your application for{" "}
              <strong style={{ color:"#00C9A7" }}>{form.course}</strong>{bundleActive ? ` + ${course2}` : ""} has been received.
              We'll reach out to <strong style={{ color:"#07112E" }}>{form.email}</strong> within 24 hours.
            </p>
            {selectedCourse && (
              <div style={{ background:"#E6FAF7", border:"1.5px solid rgba(0,201,167,.3)", borderRadius:"1rem", padding:"1rem 1.25rem", marginBottom:"1.5rem", textAlign:"left" }}>
                <div style={{ fontSize:".62rem", color:"#009E85", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:".3rem" }}>
                  {bundleActive ? "Bundle Fee (5% off)" : "Program Fee"}
                </div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"1.6rem", fontWeight:800, color:"#07112E" }}>
                  {formatINR(payable)}
                </div>
                {bundleActive && (
                  <div style={{ fontSize:".72rem", color:"#ef4444", marginTop:".15rem" }}>You saved {formatINR(discount)} 🎉</div>
                )}
                <div style={{ fontSize:".78rem", color:"#3D4966", marginTop:".3rem" }}>📅 Duration: <strong style={{ color:"#009E85" }}>{selectedCourse.duration}</strong></div>
              </div>
            )}
            <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:".4rem", background:"linear-gradient(135deg,#00C9A7,#009E85)", color:"#fff", fontWeight:700, fontSize:".875rem", padding:".875rem 2rem", borderRadius:".875rem", textDecoration:"none", boxShadow:"0 4px 20px rgba(0,201,167,.35)" }}>
              Back to Home <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main form ─── */
  return (
    <div style={{ minHeight:"100vh", background:"#F8FAFC", fontFamily:"'DM Sans',sans-serif", padding:"0 0 5rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .reg-page-bg {
          background-color: #F8FAFC;
          background-image:
            linear-gradient(rgba(7,17,46,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(7,17,46,.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .reg-hero-strip {
          background: linear-gradient(135deg, #07112E 0%, #0D1E4A 55%, #1A2D60 100%);
          padding: 56px 24px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .reg-hero-strip::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,201,167,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,201,167,.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .reg-card {
          background: #fff;
          border: 1.5px solid #E2E8F4;
          border-radius: 1.5rem;
          padding: 0;
          box-shadow: 0 8px 40px rgba(7,17,46,.09);
          position: relative;
          z-index: 2;
          margin-top: -40px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }
        .reg-col-left {
          padding: 2.5rem;
          border-right: 1.5px solid #EEF2FA;
        }
        .reg-col-right {
          padding: 2.5rem;
          background: #F8FAFC;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
  .reg-card { grid-template-columns: 1fr; }
  .reg-col-left {
    border-right: none;
    border-bottom: 1.5px solid #EEF2FA;
    padding: 1.25rem !important;    /* ← ADD: was 2.5rem */
  }
  .reg-col-right {
    padding: 1.25rem !important;    /* ← ADD: was 2.5rem */
  }
  .reg-hero-strip {
    padding-left: 1rem !important;  /* ← ADD: was 24px, fine, but make consistent */
    padding-right: 1rem !important;
  }
}
        .reg-input {
          transition: border-color .18s, box-shadow .18s;
          background: #F8FAFC !important;
          color: #07112E !important;
        }
        .reg-input::placeholder { color: #7A8CAB; }
        .reg-input:focus {
          outline: none;
          border-color: #00C9A7 !important;
          box-shadow: 0 0 0 3px rgba(0,201,167,.15) !important;
          background: #fff !important;
        }
        .reg-input.err { border-color: #ef4444 !important; }
        .reg-input.err:focus { box-shadow: 0 0 0 3px rgba(239,68,68,.12) !important; }
        select.reg-input option { background: #fff; color: #07112E; }
        select.reg-input optgroup { background: #F8FAFC; color: #7A8CAB; font-size: .7rem; font-weight: 700; text-transform: uppercase; }
        .pay-card {
          cursor: pointer;
          transition: all .18s;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F4 !important;
          border-radius: .875rem;
        }
        .pay-card:hover { border-color: #00C9A7 !important; background: #E6FAF7 !important; }
        .pay-card.selected { border-color: #00C9A7 !important; background: #E6FAF7 !important; }
        .step-lbl {
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          margin-bottom: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: .5rem;
          border-bottom: 2px solid #EEF2FA;
        }
        .reg-btn { transition: all .18s; }
        .reg-btn:hover { transform: translateY(-1px); }
        .reg-btn:active { transform: translateY(0); }
        .reg-divider { height: 1px; background: #EEF2FA; margin: 1.75rem 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(-5px); } to { opacity:1; transform:translateY(0); } }
        .bundle-bar { animation: fadeSlide .22s ease; }
      `}</style>

      <Navbar />

      <div className="reg-hero-strip">
        <div style={{ position:"relative", zIndex:1 }}>
          <span style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#00C9A7", background:"rgba(0,201,167,.15)", border:"1px solid rgba(0,201,167,.35)", padding:"5px 16px", borderRadius:999, display:"inline-block", marginBottom:"1.1rem" }}>
            🎓 Enroll Now
          </span>
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(1.6rem,4.5vw,2.4rem)", fontWeight:800, color:"#fff", margin:"0 0 .625rem", lineHeight:1.08 }}>
            Start Your <span style={{ color:"#00C9A7" }}>Journey</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,.65)", fontSize:".9rem", lineHeight:1.7, margin:0 }}>
            Join 20,000+ professionals accelerating their careers with Upskillize
          </p>
        </div>
      </div>

      <div className="reg-page-bg" style={{ padding:"0 1.25rem 2rem" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div className="reg-card">

            {/* ══ LEFT COLUMN ══ */}
            <div className="reg-col-left">

              {/* STEP 1 — PROGRAM SELECTION */}
              <div style={{ marginBottom:"1.5rem" }}>
                <div className="step-lbl" style={{ color:"#00C9A7" }}>
                  <BookOpen size={14} color="#00C9A7" />
                  Step 1 — Choose Your Program
                </div>
                <div style={{ position:"relative", marginBottom: errors.course ? ".2rem" : "1rem" }}>
                  <div style={{ position:"absolute", left:".875rem", top:"50%", transform:"translateY(-50%)", color:"#00C9A7", display:"flex", pointerEvents:"none", zIndex:1 }}>
                    <BookOpen size={16} />
                  </div>
                  <select
                    className={`reg-input${errors.course ? " err" : ""}`}
                    value={form.course}
                    onChange={e => { set("course", e.target.value); setCourse2(""); setShowBundle(false); }}
                    style={{ width:"100%", padding:".85rem .875rem .85rem 2.5rem", border:`1.5px solid ${errors.course ? "#ef4444" : "#E2E8F4"}`, borderRadius:".75rem", fontSize:".875rem", fontFamily:"inherit", appearance:"none", cursor:"pointer" }}
                  >
                    <option value="" disabled>Select a program…</option>
                    {GROUPS.map(group => (
                      <optgroup key={group} label={group}>
                        {ALL_COURSES.filter(c => c.group === group).map(c => (
                          <option key={c.label} value={c.label}>{c.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div style={{ position:"absolute", right:".875rem", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#7A8CAB" }}>
                    <ChevronDown size={16} />
                  </div>
                </div>
                {errors.course && <p style={{ color:"#ef4444", fontSize:".72rem", margin:"0 0 .875rem .25rem" }}>{errors.course}</p>}

                {selectedCourse && (
                  <div style={{ background:"#E6FAF7", border:"1.5px solid rgba(0,201,167,.3)", borderRadius:"1rem", padding:"1.1rem 1.25rem", animation:"fadeSlide .25s ease" }}>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:".92rem", fontWeight:700, color:"#07112E", lineHeight:1.35, marginBottom:".5rem" }}>
                      {selectedCourse.label}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:".5rem", marginBottom:".625rem" }}>
                      <span style={{ fontSize:".6rem", fontWeight:700, background:"rgba(0,201,167,.2)", color:"#009E85", border:"1px solid rgba(0,201,167,.3)", padding:"3px 10px", borderRadius:999, letterSpacing:".07em" }}>
                        {selectedCourse.badge}
                      </span>
                      <span style={{ fontSize:".75rem", color:"#3D4966" }}>{selectedCourse.group}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", flexWrap:"wrap" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:".3rem", fontSize:".8rem", color:"#3D4966" }}>
                        <Clock size={13} color="#009E85" />
                        Duration: <strong style={{ color:"#009E85", marginLeft:".15rem" }}>{selectedCourse.duration}</strong>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:".3rem", fontSize:".8rem", color:"#3D4966" }}>
                        <Tag size={13} color="#C07A10" />
                        Fee: <strong style={{ color:"#C07A10", fontSize:"1rem", marginLeft:".15rem" }}>{selectedCourse.fee}</strong>
                        <span style={{ fontSize:".65rem", color:"#7A8CAB" }}>({selectedCourse.feeNote})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add 2nd course button — only for cert courses */}
                {isCert(selectedCourse) && !showBundle && (
                  <button
                    onClick={() => setShowBundle(true)}
                    style={{ marginTop:".75rem", display:"flex", alignItems:"center", gap:".4rem", fontSize:".78rem", fontWeight:700, color:"#4f46e5", background:"#f5f3ff", border:"1.5px dashed #c4b5fd", borderRadius:".75rem", padding:".55rem 1rem", cursor:"pointer", width:"100%", justifyContent:"center", transition:"all .15s" }}
                  >
                    <PlusCircle size={15} /> Add a 2nd course &amp; get 5% off bundle
                  </button>
                )}

                {/* Bundle 2nd course selector */}
                {showBundle && isCert(selectedCourse) && (
                  <div className="bundle-bar" style={{ marginTop:".75rem", background:"#f5f3ff", border:"1.5px solid #c4b5fd", borderRadius:"1rem", padding:".875rem 1rem" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".6rem" }}>
                      <span style={{ fontSize:".7rem", fontWeight:700, color:"#4f46e5", letterSpacing:".05em", textTransform:"uppercase" }}>
                        🎁 Bundle — 5% off both courses
                      </span>
                      <button onClick={() => { setShowBundle(false); setCourse2(""); }} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex" }}>
                        <X size={15} />
                      </button>
                    </div>
                    <div style={{ position:"relative" }}>
                      <div style={{ position:"absolute", left:".75rem", top:"50%", transform:"translateY(-50%)", color:"#7c3aed", display:"flex", pointerEvents:"none", zIndex:1 }}>
                        <BookOpen size={15} />
                      </div>
                      <select
                        className="reg-input"
                        value={course2}
                        onChange={e => setCourse2(e.target.value)}
                        style={{ width:"100%", padding:".75rem .75rem .75rem 2.25rem", border:"1.5px solid #c4b5fd", borderRadius:".625rem", fontSize:".8rem", fontFamily:"inherit", appearance:"none", cursor:"pointer", background:"#fff" }}
                      >
                        <option value="" disabled>Select 2nd course…</option>
                        {GROUPS.filter(g => !["Two Year Programs","One Year Programs"].includes(g)).map(group => (
                          <optgroup key={group} label={group}>
                            {ALL_COURSES.filter(c => c.group === group && c.label !== form.course).map(c => (
                              <option key={c.label} value={c.label}>{c.label}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div style={{ position:"absolute", right:".75rem", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#7A8CAB" }}>
                        <ChevronDown size={15} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="reg-divider" />

              {/* STEP 2 — STUDENT DETAILS */}
              <div style={{ marginBottom:"1.5rem" }}>
                <div className="step-lbl" style={{ color:"#6B3FA0" }}>
                  <User size={14} color="#6B3FA0" />
                  Step 2 — Student Details
                </div>
                <LightField icon={<User size={16} color="#6B3FA0" />}  type="text"  value={form.name}  error={errors.name}  onChange={v => set("name", v)}  placeholder="Full Name (e.g. Priya Sharma)" />
                <LightField icon={<Phone size={16} color="#6B3FA0" />} type="tel"   value={form.phone} error={errors.phone} onChange={v => set("phone", v)} placeholder="Phone (+91 98765 43210)" />
                <LightField icon={<Mail size={16} color="#6B3FA0" />}  type="email" value={form.email} error={errors.email} onChange={v => set("email", v)} placeholder="Email (you@example.com)" />
              </div>

            </div>{/* end reg-col-left */}

            {/* ══ RIGHT COLUMN — Step 3 + Fee + Buttons ══ */}
            <div className="reg-col-right">

              {/* STEP 3 — PAYMENT METHOD */}
              <div style={{ marginBottom:"1.5rem" }}>
                <div className="step-lbl" style={{ color:"#C07A10" }}>
                  <CreditCard size={14} color="#C07A10" />
                  Step 3 — Payment Method
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".625rem", marginBottom: errors.payment ? ".2rem" : 0 }}>
                  {PAYMENT_METHODS.map(pm => (
                    <div
                      key={pm.id}
                      className={`pay-card${form.payment === pm.id ? " selected" : ""}`}
                      onClick={() => set("payment", pm.id)}
                      style={{ padding:".875rem 1rem", display:"flex", alignItems:"flex-start", gap:".6rem" }}
                    >
                      <div style={{ width:36, height:36, borderRadius:".625rem", flexShrink:0, background: form.payment === pm.id ? "rgba(0,201,167,.2)" : "#EEF2FA", display:"flex", alignItems:"center", justifyContent:"center", color: form.payment === pm.id ? "#009E85" : "#7A8CAB" }}>
                        {pm.icon}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:".82rem", fontWeight:700, color: form.payment === pm.id ? "#07112E" : "#3D4966", lineHeight:1 }}>{pm.label}</div>
                        <div style={{ fontSize:".68rem", color:"#7A8CAB", marginTop:".25rem", lineHeight:1.3 }}>{pm.desc}</div>
                      </div>
                      {form.payment === pm.id && (
                        <div style={{ color:"#00C9A7", flexShrink:0, marginLeft:"auto" }}>
                          <CheckCircle size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {errors.payment && <p style={{ color:"#ef4444", fontSize:".72rem", margin:".25rem 0 0 .25rem" }}>{errors.payment}</p>}
              </div>

              {/* Fee Summary */}
              <div style={{ background:"linear-gradient(135deg,#FEF6E7,#FFF9F0)", border:"1.5px solid rgba(245,166,35,.35)", borderRadius:"1rem", padding:"1rem 1.25rem", marginBottom:"1.25rem" }}>
                {bundleActive ? (
                  /* Bundle fee breakdown */
                  <div>
                    <div style={{ fontSize:".6rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#C07A10", marginBottom:".5rem" }}>
                      🎁 Bundle Pricing (5% off)
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:".78rem", color:"#3D4966", marginBottom:".2rem" }}>
                      <span>{selectedCourse.badge}</span><span>{selectedCourse.fee}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:".78rem", color:"#3D4966", marginBottom:".4rem" }}>
                      <span>{selectedCourse2.badge}</span><span>{selectedCourse2.fee}</span>
                    </div>
                    <div style={{ height:1, background:"rgba(245,166,35,.3)", margin:".4rem 0" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:".75rem", color:"#ef4444", fontWeight:600, marginBottom:".2rem" }}>
                      <span>5% Bundle Discount</span><span>− {formatINR(discount)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                      <span style={{ fontSize:".68rem", fontWeight:700, color:"#009E85", textTransform:"uppercase", letterSpacing:".06em" }}>Total Payable</span>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#07112E" }}>{formatINR(payable)}</span>
                    </div>
                  </div>
                ) : (
                  /* Single fee */
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:".75rem" }}>
                    <div>
                      <div style={{ fontSize:".6rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#C07A10", marginBottom:".2rem" }}>
                        💰 Course Fee
                      </div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"#07112E", lineHeight:1 }}>
                        {selectedCourse ? selectedCourse.fee : "—"}
                      </div>
                      <div style={{ fontSize:".72rem", color:"#7A8CAB", marginTop:".2rem" }}>
                        {selectedCourse ? `${selectedCourse.feeNote} · ${selectedCourse.duration}` : "per course · all programs"}
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:".7rem", color:"#3D4966", lineHeight:1.5 }}>
                        <div>✓ Industry certificate included</div>
                        <div>✓ LMS access included</div>
                        <div>✓ Mentor sessions included</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons — Pay & Register first, Add to Cart second */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".875rem" }}>
                <button
                  className="reg-btn"
                  onClick={handlePay}
                  disabled={paying}
                  style={{ padding:".9rem", borderRadius:".875rem", background: paying ? "rgba(0,201,167,.6)" : "linear-gradient(135deg,#00C9A7,#009E85)", border:"none", color:"#fff", fontWeight:700, fontSize:".875rem", fontFamily:"inherit", cursor: paying ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem", boxShadow:"0 4px 20px rgba(0,201,167,.35)" }}
                >
                  {paying ? (
                    <><span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} /> Processing…</>
                  ) : (
                    <><CreditCard size={16} /> Pay &amp; Register</>
                  )}
                </button>
                <button
                  className="reg-btn"
                  onClick={handleAddToCart}
                  style={{ padding:".9rem", borderRadius:".875rem", background:"#F8FAFC", border:"1.5px solid #C8D3E8", color:"#3D4966", fontWeight:700, fontSize:".875rem", fontFamily:"inherit", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem" }}
                >
                  <CheckCircle size={16} color="#3D4966" /> Add to Cart
                </button>
              </div>

              <div style={{ marginTop:"1.25rem", display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem", color:"#7A8CAB", fontSize:".72rem" }}>
                <Shield size={12} color="#00C9A7" />
                Your data is encrypted and never shared with third parties.
              </div>

            </div>{/* end reg-col-right */}

          </div>{/* end reg-card */}

          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"2rem", flexWrap:"wrap", padding:"clamp(2rem, 8vw, 6rem) 1rem clamp(1.5rem, 4vw, 3rem)" , color:"#7A8CAB", fontSize:".78rem" }}>
            {["✓ 20,000+ enrolled students", "✓ Industry-recognised certificates", "✓ CRO & CDO mentors"].map(t => (
              <span key={t} style={{ display:"flex", alignItems:"center", gap:".3rem" }}>
                <span style={{ color:"#00C9A7", fontWeight:700 }}>{t.slice(0,1)}</span>
                {t.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LightField({ icon, type, value, error, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: error ? ".2rem" : "1rem" }}>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", left:".875rem", top:"50%", transform:"translateY(-50%)", display:"flex", pointerEvents:"none", zIndex:1 }}>
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`reg-input${error ? " err" : ""}`}
          style={{ width:"100%", padding:".85rem .875rem .85rem 2.5rem", border:`1.5px solid ${error ? "#ef4444" : "#E2E8F4"}`, borderRadius:".75rem", fontSize:".875rem", fontFamily:"inherit", boxSizing:"border-box" }}
        />
      </div>
      {error && <p style={{ color:"#ef4444", fontSize:".72rem", margin:".2rem 0 .75rem .25rem" }}>{error}</p>}
    </div>
  );
}