import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  User, Phone, Mail, BookOpen, CreditCard,
  CheckCircle, ChevronDown, ArrowRight, Shield,
  Smartphone, Building2, Wallet,
} from "lucide-react";
import Navbar from "../components/Navbar";

/* ─── All courses from courses.js ─── */
const ALL_COURSES = [
  { group: "Two Year Programs",    label: "PG Diploma in Digital Business & FinTech",   badge: "PGD-FDB",  fee: "Contact for Pricing" },
  { group: "One Year Programs",    label: "Advanced Diploma in FinTech, Banking & AI",  badge: "ADFBA",    fee: "Contact for Pricing" },
  { group: "AI in FinTech",        label: "FinTech & AI Mastery",                        badge: "CFTA",     fee: "₹24,000" },
  { group: "AI in FinTech",        label: "BFSI Domain Excellence Program",              badge: "CBFSP",    fee: "₹18,000" },
  { group: "AI in FinTech",        label: "Investment Banking & Wealth Tech",            badge: "CWTP",     fee: "₹22,000" },
  { group: "AI in FinTech",        label: "Risk Management & RegTech Program",           badge: "CRPP",     fee: "₹20,000" },
  { group: "AI in FinTech",        label: "Insurance, InsurTech & DPDPA Course",         badge: "CITP",     fee: "₹16,000" },
  { group: "AI in FinTech",        label: "AI in Financial Services",                    badge: "CFAP",     fee: "₹21,000" },
  { group: "Product Leadership",   label: "The Mini CEO Program",                        badge: "CTPM",     fee: "₹25,000" },
  { group: "Product Leadership",   label: "AI Product Management Mastery",               badge: "CAIPM",    fee: "₹22,000" },
  { group: "Product Leadership",   label: "Product Management for Techies",              badge: "CPM",      fee: "₹18,000" },
  { group: "Product Leadership",   label: "Design Thinking & Building User-Driven Solutions", badge: "CDP", fee: "₹15,000" },
  { group: "Product Leadership",   label: "Business Analysis Foundation",                badge: "CBA",      fee: "₹17,000" },
  { group: "Data & GenAI",         label: "Data to Decisions: Power BI & AI",            badge: "CDAP",     fee: "₹20,000" },
  { group: "Data & GenAI",         label: "AI & ML for Business Leaders",                badge: "CAMA",     fee: "₹23,000" },
  { group: "Data & GenAI",         label: "Strategic Data Analytics",                    badge: "CPS",      fee: "₹19,000" },
  { group: "Technology & Dx",      label: "Digital Business Strategy & Innovation",      badge: "CDSL",     fee: "₹21,000" },
  { group: "Technology & Dx",      label: "AI & Digital Project Management",             badge: "CDPM",     fee: "₹18,000" },
  { group: "Technology & Dx",      label: "Emerging Technologies, IoT & Industry 4.0",  badge: "CI4P",     fee: "₹22,000" },
];

const PAYMENT_METHODS = [
  { id: "upi",     label: "UPI",           icon: <Smartphone size={18} />,  desc: "Pay via GPay, PhonePe, Paytm" },
  { id: "card",    label: "Card",          icon: <CreditCard size={18} />,  desc: "Credit / Debit card" },
  { id: "netbank", label: "Net Banking",   icon: <Building2 size={18} />,   desc: "All major banks supported" },
  { id: "wallet",  label: "Wallet",        icon: <Wallet size={18} />,      desc: "Paytm, Amazon Pay & more" },
];

/* ─── group courses for <optgroup> ─── */
const GROUPS = [...new Set(ALL_COURSES.map(c => c.group))];

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("course") || "";

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    course: preselected,
    payment: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [paying, setPaying] = useState(false);

  /* keep course in sync if URL param changes (e.g. back/forward nav) */
  useEffect(() => {
    if (preselected) setForm(f => ({ ...f, course: preselected }));
  }, [preselected]);

  const selectedCourse = ALL_COURSES.find(c => c.label === form.course);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name   = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))         e.email = "Enter a valid email";
    if (!form.course)        e.course  = "Please select a course";
    if (!form.payment)       e.payment = "Please choose a payment method";
    return e;
  };

  const handleRegister = () => {
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

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f2a1f 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        <Navbar />
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "6rem 2rem 2rem",
        }}>
        <div style={{
          background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "1.5rem", padding: "3rem 2.5rem", textAlign: "center", maxWidth: 480,
          backdropFilter: "blur(12px)", boxShadow: "0 24px 80px rgba(0,0,0,.5)",
          margin: "0 auto",
        }}>
          <div style={{
            width: 72, height: 72, background: "linear-gradient(135deg,#00C9A7,#009E85)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem", boxShadow: "0 8px 32px rgba(0,201,167,.4)",
          }}>
            <CheckCircle size={36} color="#fff" />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: ".5rem" }}>
            You're Registered! 🎉
          </h2>
          <p style={{ color: "#94a3b8", fontSize: ".9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Welcome to <strong style={{ color: "#fff" }}>Upskillize</strong>! Your application for{" "}
            <strong style={{ color: "#00C9A7" }}>{form.course}</strong> has been received.
            We'll reach out to <strong style={{ color: "#fff" }}>{form.email}</strong> within 24 hours.
          </p>
          {selectedCourse && selectedCourse.fee !== "Contact for Pricing" && (
            <div style={{
              background: "rgba(0,201,167,.08)", border: "1px solid rgba(0,201,167,.2)",
              borderRadius: ".75rem", padding: ".875rem 1.25rem", marginBottom: "1.5rem",
            }}>
              <div style={{ fontSize: ".7rem", color: "#00C9A7", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".25rem" }}>Course Fee</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>{selectedCourse.fee}</div>
            </div>
          )}
          <Link to="/" style={{
            display: "inline-flex", alignItems: "center", gap: ".4rem",
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "#fff", fontWeight: 700, fontSize: ".875rem",
            padding: ".75rem 1.5rem", borderRadius: ".625rem", textDecoration: "none",
            boxShadow: "0 4px 16px rgba(79,70,229,.4)",
          }}>
            Back to Home <ArrowRight size={16} />
          </Link>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#0f2a1f 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "0 0 4rem",
    }}>
      <style>{`
        .reg-input { transition: border-color .18s, box-shadow .18s; }
        .reg-input:focus { outline: none; border-color: #4f46e5 !important; box-shadow: 0 0 0 3px rgba(79,70,229,.2) !important; }
        .reg-input.err:focus { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,.15) !important; }
        .pay-card { cursor: pointer; transition: all .18s; }
        .pay-card:hover { border-color: #4f46e5 !important; background: rgba(79,70,229,.08) !important; }
        .reg-btn { transition: all .18s; }
        .reg-btn:hover { transform: translateY(-1px); }
        .reg-btn:active { transform: translateY(0); }
        select option { background: #1e1b4b; color: #fff; }
        select optgroup { background: #0f172a; color: #94a3b8; font-size: .7rem; font-weight: 700; text-transform: uppercase; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      {/* ── Real Navbar ── */}
      <Navbar />

      {/* ── Main — sits below fixed 64px navbar ── */}
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "3rem 1.25rem 0" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{
            fontSize: ".62rem", fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "#00C9A7",
            background: "rgba(0,201,167,.1)", padding: "4px 14px", borderRadius: 999,
            display: "inline-block", marginBottom: "1rem",
          }}>
            Enroll Now
          </span>
          <h1 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: "clamp(1.75rem, 5vw, 2.4rem)",
            fontWeight: 800, color: "#fff", margin: "0 0 .75rem", lineHeight: 1.1,
          }}>
            Start Your Journey
          </h1>
          <p style={{ color: "#94a3b8", fontSize: ".9rem", lineHeight: 1.7, margin: 0 }}>
            Join 20,000+ professionals accelerating their careers with Upskillize
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "1.5rem",
          padding: "2.25rem",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 80px rgba(0,0,0,.4)",
        }}>

          {/* ── Personal Details ── */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{
              fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", color: "#0891b2", marginBottom: "1rem",
            }}>Personal Details</div>

            {/* Name */}
            <Field
              icon={<User size={16} />}
              label="Full Name"
              type="text"
              value={form.name}
              error={errors.name}
              onChange={v => set("name", v)}
              placeholder="e.g. Priya Sharma"
            />

            {/* Phone */}
            <Field
              icon={<Phone size={16} />}
              label="Contact Number"
              type="tel"
              value={form.phone}
              error={errors.phone}
              onChange={v => set("phone", v)}
              placeholder="+91 98765 43210"
            />

            {/* Email */}
            <Field
              icon={<Mail size={16} />}
              label="Email Address"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={v => set("email", v)}
              placeholder="you@example.com"
            />
          </div>

          <Divider />

          {/* ── Course Selection ── */}
          <div style={{ margin: "1.75rem 0" }}>
            <div style={{
              fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", color: "#7c3aed", marginBottom: "1rem",
            }}>Course Selection</div>

            <div style={{ position: "relative", marginBottom: errors.course ? ".25rem" : "1rem" }}>
              <div style={{
                position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
                color: "#4f46e5", display: "flex", pointerEvents: "none", zIndex: 1,
              }}>
                <BookOpen size={16} />
              </div>
              <select
                className={`reg-input${errors.course ? " err" : ""}`}
                value={form.course}
                onChange={e => set("course", e.target.value)}
                style={{
                  width: "100%", padding: ".825rem .875rem .825rem 2.5rem",
                  background: "rgba(255,255,255,.06)", border: `1px solid ${errors.course ? "#ef4444" : "rgba(255,255,255,.12)"}`,
                  borderRadius: ".625rem", color: form.course ? "#fff" : "#64748b",
                  fontSize: ".875rem", fontFamily: "inherit", appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>Select a course…</option>
                {GROUPS.map(group => (
                  <optgroup key={group} label={group}>
                    {ALL_COURSES.filter(c => c.group === group).map(c => (
                      <option key={c.label} value={c.label}>{c.badge} — {c.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div style={{
                position: "absolute", right: ".875rem", top: "50%", transform: "translateY(-50%)",
                pointerEvents: "none", color: "#64748b",
              }}>
                <ChevronDown size={16} />
              </div>
            </div>
            {errors.course && <p style={{ color: "#ef4444", fontSize: ".72rem", margin: "0 0 .875rem .25rem" }}>{errors.course}</p>}

            {/* Course preview pill */}
            {selectedCourse && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "rgba(79,70,229,.1)", border: "1px solid rgba(79,70,229,.25)",
                borderRadius: ".625rem", padding: ".625rem 1rem",
                animation: "fadeIn .2s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <span style={{
                    fontSize: ".62rem", fontWeight: 700, background: "rgba(79,70,229,.3)",
                    color: "#a5b4fc", padding: "2px 8px", borderRadius: 999,
                  }}>{selectedCourse.badge}</span>
                  <span style={{ fontSize: ".8rem", color: "#c7d2fe", fontWeight: 500 }}>{selectedCourse.group}</span>
                </div>
                <span style={{ fontSize: ".85rem", fontWeight: 700, color: "#00C9A7" }}>{selectedCourse.fee}</span>
              </div>
            )}
          </div>

          <Divider />

          {/* ── Payment Method ── */}
          <div style={{ margin: "1.75rem 0" }}>
            <div style={{
              fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", color: "#059669", marginBottom: "1rem",
            }}>Payment Method</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".625rem", marginBottom: errors.payment ? ".25rem" : 0 }}>
              {PAYMENT_METHODS.map(pm => (
                <div
                  key={pm.id}
                  className="pay-card"
                  onClick={() => set("payment", pm.id)}
                  style={{
                    border: `1px solid ${form.payment === pm.id ? "#4f46e5" : "rgba(255,255,255,.1)"}`,
                    background: form.payment === pm.id ? "rgba(79,70,229,.12)" : "rgba(255,255,255,.03)",
                    borderRadius: ".75rem", padding: ".875rem 1rem",
                    display: "flex", alignItems: "flex-start", gap: ".6rem",
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: ".5rem", flexShrink: 0,
                    background: form.payment === pm.id ? "rgba(79,70,229,.25)" : "rgba(255,255,255,.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: form.payment === pm.id ? "#a5b4fc" : "#64748b",
                  }}>
                    {pm.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: ".82rem", fontWeight: 700, color: form.payment === pm.id ? "#fff" : "#cbd5e1", lineHeight: 1 }}>
                      {pm.label}
                    </div>
                    <div style={{ fontSize: ".68rem", color: "#64748b", marginTop: ".2rem", lineHeight: 1.3 }}>
                      {pm.desc}
                    </div>
                  </div>
                  {form.payment === pm.id && (
                    <div style={{ marginLeft: "auto", color: "#4f46e5", flexShrink: 0 }}>
                      <CheckCircle size={16} fill="rgba(79,70,229,.2)" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {errors.payment && <p style={{ color: "#ef4444", fontSize: ".72rem", margin: ".25rem 0 0 .25rem" }}>{errors.payment}</p>}
          </div>

          {/* ── Action buttons ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".875rem", marginTop: "2rem" }}>

            {/* Register only */}
            <button
              className="reg-btn"
              onClick={handleRegister}
              style={{
                padding: ".875rem", borderRadius: ".75rem",
                background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.15)",
                color: "#e2e8f0", fontWeight: 700, fontSize: ".875rem",
                fontFamily: "inherit", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem",
              }}
            >
              <CheckCircle size={16} />
              Register
            </button>

            {/* Pay & Register */}
            <button
              className="reg-btn"
              onClick={handlePay}
              disabled={paying}
              style={{
                padding: ".875rem", borderRadius: ".75rem",
                background: paying
                  ? "rgba(0,201,167,.5)"
                  : "linear-gradient(135deg,#00C9A7,#009E85)",
                border: "none", color: "#fff", fontWeight: 700, fontSize: ".875rem",
                fontFamily: "inherit", cursor: paying ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem",
                boxShadow: "0 4px 20px rgba(0,201,167,.35)",
              }}
            >
              {paying ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
                  Processing…
                </>
              ) : (
                <><CreditCard size={16} /> Pay &amp; Register</>
              )}
            </button>
          </div>

          {/* Security note */}
          <div style={{
            marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center",
            gap: ".4rem", color: "#475569", fontSize: ".72rem",
          }}>
            <Shield size={12} color="#00C9A7" />
            Your data is encrypted and never shared with third parties.
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Reusable Field ─── */
function Field({ icon, label, type, value, error, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: error ? ".25rem" : "1rem" }}>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: ".875rem", top: "50%", transform: "translateY(-50%)",
          color: "#4f46e5", display: "flex", pointerEvents: "none", zIndex: 1,
        }}>
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`reg-input${error ? " err" : ""}`}
          style={{
            width: "100%", padding: ".825rem .875rem .825rem 2.5rem",
            background: "rgba(255,255,255,.06)", border: `1px solid ${error ? "#ef4444" : "rgba(255,255,255,.12)"}`,
            borderRadius: ".625rem", color: "#fff",
            fontSize: ".875rem", fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
      </div>
      {error && <p style={{ color: "#ef4444", fontSize: ".72rem", margin: ".2rem 0 .75rem .25rem" }}>{error}</p>}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "0 -.25rem" }} />;
}