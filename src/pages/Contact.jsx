import React, { useState } from "react";

const INQUIRY_TYPES = [
  { value: "", label: "Select an inquiry type" },
  { value: "Course Information", label: "Course Information" },
  { value: "Corporate Training", label: "Corporate Training" },
  { value: "Partnership", label: "Partnership" },
  { value: "General Support", label: "General Support" },
];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  inquiryType: "",
  message: "",
};

// ── Backend URL ─────────────────────────────────────────────
// Dev:        http://localhost:5000
// Production: replace with your Render service URL
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "https://upskillize-vite1-3.onrender.com");

export default function Contact() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // ── Validation ──────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.inquiryType) errs.inquiryType = "Please select an inquiry type.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  // ── Handlers ────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      // server.js expects: { name, email, phone, company, inquiry, message }
      const res = await fetch(`${API_URL}/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          company: "",                    // optional — add a field later if needed
          inquiry: form.inquiryType,      // maps to "inquiry" in server.js
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Server error");
      }

      setStatus("success");
      setForm(initialFormState);
      setErrors({});
    } catch (err) {
      console.error("[Contact] Submit failed:", err.message);
      setStatus("error");
    }
  };

  // ── Success Screen ──────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452] overflow-x-hidden flex flex-col">
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
              Get in Touch
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-4">
              Have questions about courses, corporate training, or partnerships?
              We're here to help.
            </p>
          </div>
        </section>

        <section className="pb-12 sm:pb-16 lg:pb-20 flex-1 flex items-center justify-center">
          <div className="max-w-3xl w-full mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
              <p className="text-gray-500 mb-6">
                Thanks for reaching out. Our team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="inline-block px-6 py-2.5 rounded-lg bg-[#1a2847] text-white font-medium hover:bg-[#0f1729] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452] overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
            Get in Touch
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-4">
            Have questions about courses, corporate training, or partnerships?
            We're here to help.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
              Contact Us
            </h2>

            {/* Server error banner */}
            {status === "error" && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#1a2847] focus:border-transparent ${
                      errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                    }`}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#1a2847] focus:border-transparent ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                    }`}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Phone + Inquiry Type row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-[#1a2847] focus:border-transparent focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 outline-none transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-[#1a2847] focus:border-transparent ${
                      errors.inquiryType ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                    }`}
                  >
                    {INQUIRY_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryType && <p className="mt-1.5 text-xs text-red-500">{errors.inquiryType}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors resize-none focus:ring-2 focus:ring-[#1a2847] focus:border-transparent ${
                    errors.message ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                  }`}
                />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 rounded-lg bg-[#1a2847] text-white font-semibold text-sm tracking-wide hover:bg-[#0f1729] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
