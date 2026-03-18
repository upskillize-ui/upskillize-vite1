import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { courses } from "../data/coursesData";
import { AVAILABLE_COURSE_SLUGS } from "../data/availableCourses";
import NotificationModal from "../components/NotificationModal";

export default function CoursesPage() {
  const { category } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  // Find the category data
  const categoryData = courses.find((c) => c.slug === category);

  // Category-specific hero backgrounds
  const categoryHeroImages = {
    "ai-fintech": {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop",
      overlay: "from-blue-900/90 via-indigo-900/75 to-transparent",
    },
    "product-leadership": {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=600&fit=crop",
      overlay: "from-purple-900/90 via-pink-900/75 to-transparent",
    },
    "data-analytics-genai-bi": {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=600&fit=crop",
      overlay: "from-cyan-900/90 via-blue-900/75 to-transparent",
    },
    "technology-digital-transformation": {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop",
      overlay: "from-indigo-900/90 via-purple-900/75 to-transparent",
    },
    "integrated-courses": {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=600&fit=crop",
      overlay: "from-slate-900/90 via-gray-900/75 to-transparent",
    },
    cybersecurity: {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=600&fit=crop",
      overlay: "from-red-900/90 via-orange-900/75 to-transparent",
    },
    "mental-health-social-wellness": {
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&h=600&fit=crop",
      overlay: "from-green-900/90 via-emerald-900/75 to-transparent",
    },
  };

  // Get hero background for current category, fallback to default
  const heroBackground = categoryHeroImages[category] || {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=600&fit=crop",
    overlay: "from-slate-900/90 via-gray-900/75 to-transparent",
  };

  // ─── Category Not Found ───────────────────────────────────────────────────
  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4 sm:px-6 overflow-x-hidden">
        <div className="max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">❌</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Category Not Found
          </h1>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // ─── Coming Soon (empty subCourses) ──────────────────────────────────────
  if (!categoryData.subCourses || categoryData.subCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452] overflow-x-hidden">
        {/* Back Navigation */}
        <div className="bg-[#1a2847] py-3 sm:py-4 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="py-12 sm:py-16 px-4 sm:px-6 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${categoryData.color} text-white p-8 sm:p-12 text-center`}>
              <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🚀</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                {categoryData.mainCategory}
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-90">{categoryData.shortDesc}</p>
            </div>

            <div className="p-6 sm:p-8 md:p-12 text-center">
              <div className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold mb-6 sm:mb-8 animate-pulse">
                Coming Soon!
              </div>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                We're working hard to bring you comprehensive courses in {categoryData.mainCategory}. Stay tuned for exciting programs launching soon!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
                >
                  Browse Other Programs
                </Link>
                <button
                  onClick={() => {
                    setSelectedCourse(categoryData.mainCategory);
                    setIsModalOpen(true);
                  }}
                  className="inline-block bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
                >
                  📧 Get Notified
                </button>
              </div>
            </div>
          </div>
        </div>

        <NotificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseTitle={selectedCourse}
        />
      </div>
    );
  }

  // ─── Check if a course has a detail page ─────────────────────────────────
  // FIX: AVAILABLE_COURSE_SLUGS is a Set → use .has() not .includes()
  const isCourseAvailable = (course) => {
    return course.hasDetailPage === true || AVAILABLE_COURSE_SLUGS.has(course.slug);
  };

  // Sort: available courses first, coming soon last
  const sortedCourses = [...categoryData.subCourses].sort((a, b) => {
    const aReady = isCourseAvailable(a);
    const bReady = isCourseAvailable(b);
    if (aReady && !bReady) return -1;
    if (!aReady && bReady) return 1;
    return 0;
  });

  // ─── Main Course Listing ──────────────────────────────────────────────────
  return (
    <div className="w-full overflow-x-hidden">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(96, 165, 250, 0.4) 0%,
            rgba(147, 197, 253, 0.8) 25%,
            rgba(96, 165, 250, 1) 50%,
            rgba(147, 197, 253, 0.8) 75%,
            rgba(96, 165, 250, 0.4) 100%
          );
          background-size: 2000px 100%;
          animation: shimmer 3s infinite linear;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .floating-dots {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .glow-border {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(96, 165, 250, 0.3); }
          50% { box-shadow: 0 0 40px rgba(96, 165, 250, 0.6); }
        }
      `}</style>

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#1e3a5f] text-white overflow-hidden min-h-screen">

        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBackground.image})`, minHeight: "100vh" }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${heroBackground.overlay}`}></div>
        </div>

        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-dots absolute top-20 left-10 w-3 h-3 bg-cyan-400/30 rounded-full blur-sm"></div>
          <div className="floating-dots absolute top-40 right-20 w-2 h-2 bg-blue-400/40 rounded-full blur-sm" style={{ animationDelay: "1s" }}></div>
          <div className="floating-dots absolute bottom-32 left-1/4 w-4 h-4 bg-purple-400/20 rounded-full blur-sm" style={{ animationDelay: "2s" }}></div>
          <div className="floating-dots absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400/50 rounded-full blur-sm" style={{ animationDelay: "0.5s" }}></div>
        </div>

        {/* Back Navigation */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/"
            className="inline-flex items-center text-sm sm:text-base text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2 rounded-lg font-semibold transition border border-white/30"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10 flex items-center min-h-screen">
          <div className="text-center w-full">
            {/* Decorative top line */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent w-16 sm:w-24"></div>
              <div className="mx-3 sm:mx-4 flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent w-16 sm:w-24"></div>
            </div>

            {/* Main Title */}
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl"></div>
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight px-4 py-2">
                <span className="shimmer-text font-extrabold tracking-tight">
                  {categoryData.mainCategory}
                </span>
              </h1>
              <div className="mt-6 mx-auto">
                <div className="h-1.5 w-32 sm:w-40 mx-auto bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full glow-border"></div>
                <div className="h-0.5 w-20 sm:w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mt-2"></div>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto px-4">
              <div className="relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400/40 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/40 rounded-br-lg"></div>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 font-medium leading-relaxed py-8 px-6 sm:px-8 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                  {categoryData.shortDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES GRID SECTION ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid gap-6 ${
              sortedCourses.length === 1
                ? "grid-cols-1 justify-items-center"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {sortedCourses.map((course, index) => {
              const isComingSoon = !isCourseAvailable(course);
              const prevCourse = sortedCourses[index - 1];
              const showDivider = isComingSoon && prevCourse && isCourseAvailable(prevCourse);

              return (
                <React.Fragment key={course.id}>
                  {showDivider && (
                    <div className="col-span-full flex items-center gap-4 my-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-400 px-4 py-1.5 rounded-full border border-gray-600/50 bg-[#1a2540]/80 whitespace-nowrap">
                        🚀 Coming Soon
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />
                    </div>
                  )}
                <div
                  className={`group relative p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-500 flex flex-col border ${
                    isComingSoon
                      ? "bg-gradient-to-br from-[#161f30] via-[#1a2540] to-[#161f30] border-gray-600/20 opacity-70 hover:opacity-90"
                      : "bg-gradient-to-br from-[#1e2d4a] via-[#2a3f5f] to-[#1e2d4a] border-cyan-400/20 hover:border-cyan-400/60 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02]"
                  } ${sortedCourses.length === 1 ? "max-w-md w-full" : ""}`}
                  style={{
                    boxShadow: isComingSoon
                      ? "0 4px 16px rgba(0,0,0,0.2)"
                      : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(96,165,250,0.1)",
                    minHeight: "480px",
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-purple-500/0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Title + Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <h4
                        className={`text-lg sm:text-xl font-bold flex-1 pr-2 line-clamp-2 transition-colors duration-300 ${isComingSoon ? "text-gray-400" : "text-white group-hover:text-cyan-400"}`}
                        style={{ minHeight: "3.5rem" }}
                      >
                        {course.title}
                      </h4>
                      {isComingSoon && (
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold ml-2 whitespace-nowrap flex-shrink-0 shadow-lg animate-pulse">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <strong className="font-semibold text-white">Duration:</strong> {course.duration}
                      </div>
                      {course.certification && (
                        <>
                          <div className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5"></div>
                            <div className="line-clamp-2">
                              <strong className="font-semibold text-white">Certification:</strong>{" "}
                              {course.certification}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap mt-2">
                            {course.shortCode && (
                              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-full font-semibold border border-cyan-400/40">
                                {course.shortCode}
                              </span>
                            )}
                            {course.certType && (
                              <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1.5 rounded-full font-semibold border border-green-400/40">
                                {course.certType}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Key Skills */}
                    <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-indigo-500/10 rounded-xl p-4 mb-4 border border-cyan-400/20 flex-grow">
                      <h5 className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></span>
                        Key Skills
                      </h5>
                      <ul className="space-y-2">
                        {course.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-200">
                            <span className="text-cyan-400 mr-2 flex-shrink-0 mt-0.5">◆</span>
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-cyan-400/20 mt-auto">
                      {isComingSoon ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedCourse(course.title);
                              setIsModalOpen(true);
                            }}
                            className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-all duration-300 text-white text-sm font-bold shadow-lg"
                          >
                            📧 Notify Me
                          </button>
                          <Link
                            to="/contact"
                            className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 text-white text-sm font-bold shadow-lg"
                          >
                            Enquire
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to={`/courses/${course.slug}`}
                            className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 transition-all duration-300 text-white text-sm font-bold shadow-lg"
                          >
                            Learn More
                          </Link>
                          <Link
                            to="/contact"
                            className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 text-white text-sm font-bold shadow-lg"
                          >
                            Enroll Now
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseTitle={selectedCourse}
      />
    </div>
  );
}