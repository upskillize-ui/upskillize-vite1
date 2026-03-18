import React, { useState, useEffect } from "react";

/**
 * WhatsAppChat - Floating WhatsApp support widget
 *
 * ✅ Opens ONLY when the user clicks the button
 * ✅ Never auto-opens on page load
 * ✅ Never opens on scroll
 *
 * Props:
 *   phoneNumber – WhatsApp number with country code, no spaces/dashes (e.g. "919876543210")
 *   message     – Pre-filled message the user sees when they open WhatsApp
 *   agentName   – Name shown in the chat bubble header
 *   agentRole   – Role/title shown under the agent name
 */
export default function WhatsAppChat({
  phoneNumber = "919620368991",
  message = "Hi! I'd like to know more about your courses at Upskillize.",
  agentName = "Upskillize Support",
  agentRole = "Typically replies within minutes",
}) {
  const [open, setOpen] = useState(false); // ← starts FALSE, never auto-set to true
  const [pulse, setPulse] = useState(true);

  // Stop pulse rings after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const waURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>{`
        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes wa-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes wa-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes wa-dot {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40%           { transform: scale(1); opacity: 1; }
        }
        .wa-float-btn {
          animation: wa-bounce 2.8s ease-in-out infinite;
        }
        .wa-float-btn:hover {
          animation: none;
          transform: scale(1.08);
        }
        .wa-ring {
          animation: wa-ring 1.6s ease-out infinite;
        }
        .wa-bubble {
          animation: wa-slide-up 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .wa-dot {
          animation: wa-dot 1.4s infinite ease-in-out;
        }
        .wa-dot:nth-child(2) { animation-delay: 0.2s; }
        .wa-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* ── Chat Bubble — only shows after user clicks the button ── */}
        {open && (
          <div className="wa-bubble w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

            {/* Header */}
            <div className="bg-[#075E54] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-lg shadow">
                    U
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{agentName}</p>
                  <p className="text-green-300 text-xs">{agentRole}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Chat area */}
            <div className="bg-[#ece5dd] p-4">
              {/* Incoming message */}
              <div className="flex gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#25D366] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1">
                  U
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
                  <p className="text-gray-800 text-sm leading-snug">
                    👋 Hi there! Welcome to <strong>Upskillize</strong>. How can we help you today?
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">just now</span>
                </div>
              </div>

              {/* Typing dots */}
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-[#25D366] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  U
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="wa-dot w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
                  <span className="wa-dot w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
                  <span className="wa-dot w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-4 py-3 bg-white">
              <a
                href={waURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 rounded-xl transition-all text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                  <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.73.7 5.33 1.97 7.6L.5 31.5l8.17-2.1C10.78 30.6 13.35 31.5 16 31.5 24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.86c-2.5 0-4.9-.68-6.97-1.93l-.5-.3-5.12 1.32 1.34-4.97-.33-.52A12.83 12.83 0 013.14 16C3.14 9.15 8.65 3.64 15.5 3.14 22.85 3.64 28.86 9.15 28.86 16c0 7.35-5.96 13.36-12.86 13.36zm7.1-9.86c-.39-.2-2.3-1.14-2.66-1.26-.35-.13-.61-.2-.87.2s-1 1.25-1.22 1.51c-.22.26-.44.3-.83.1-.39-.2-1.64-.6-3.12-1.92-1.15-1.02-1.93-2.28-2.16-2.67-.22-.39-.02-.6.17-.79.17-.17.39-.44.58-.66.2-.22.26-.38.39-.63.13-.25.06-.47-.03-.66-.1-.2-.87-2.1-1.19-2.87-.31-.75-.63-.65-.87-.66-.22-.01-.47-.01-.72-.01-.25 0-.66.09-1.01.47-.35.38-1.33 1.3-1.33 3.17 0 1.87 1.36 3.68 1.55 3.93.2.25 2.67 4.07 6.47 5.71.9.39 1.61.62 2.16.8.91.28 1.73.24 2.38.14.73-.11 2.24-.92 2.56-1.8.31-.88.31-1.64.22-1.8-.1-.16-.35-.25-.74-.44z"/>
                </svg>
                Start Chat on WhatsApp
              </a>
              <p className="text-center text-[10px] text-gray-400 mt-2">
                Opens in WhatsApp • Free to use
              </p>
            </div>
          </div>
        )}

        {/* ── FAB Button — always visible, user must click to open ── */}
        <div className="relative">
          {/* Pulse rings — shows briefly on first load to draw attention */}
          {pulse && !open && (
            <>
              <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]" />
              <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]" style={{ animationDelay: "0.5s" }} />
            </>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Chat with us on WhatsApp"
            className="wa-float-btn relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg hover:shadow-xl flex items-center justify-center transition-colors"
          >
            {open ? (
              /* Close icon when bubble is open */
              <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            ) : (
              /* WhatsApp icon when bubble is closed */
              <svg viewBox="0 0 32 32" width="26" height="26" fill="white">
                <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.73.7 5.33 1.97 7.6L.5 31.5l8.17-2.1C10.78 30.6 13.35 31.5 16 31.5 24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.86c-2.5 0-4.9-.68-6.97-1.93l-.5-.3-5.12 1.32 1.34-4.97-.33-.52A12.83 12.83 0 013.14 16C3.14 9.15 8.65 3.64 15.5 3.14 22.85 3.64 28.86 9.15 28.86 16c0 7.35-5.96 13.36-12.86 13.36zm7.1-9.86c-.39-.2-2.3-1.14-2.66-1.26-.35-.13-.61-.2-.87.2s-1 1.25-1.22 1.51c-.22.26-.44.3-.83.1-.39-.2-1.64-.6-3.12-1.92-1.15-1.02-1.93-2.28-2.16-2.67-.22-.39-.02-.6.17-.79.17-.17.39-.44.58-.66.2-.22.26-.38.39-.63.13-.25.06-.47-.03-.66-.1-.2-.87-2.1-1.19-2.87-.31-.75-.63-.65-.87-.66-.22-.01-.47-.01-.72-.01-.25 0-.66.09-1.01.47-.35.38-1.33 1.3-1.33 3.17 0 1.87 1.36 3.68 1.55 3.93.2.25 2.67 4.07 6.47 5.71.9.39 1.61.62 2.16.8.91.28 1.73.24 2.38.14.73-.11 2.24-.92 2.56-1.8.31-.88.31-1.64.22-1.8-.1-.16-.35-.25-.74-.44z"/>
              </svg>
            )}
          </button>

          {/* Notification dot — only when bubble is closed */}
          {!open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">1</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
}