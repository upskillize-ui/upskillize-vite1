import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Award, TrendingUp } from "lucide-react";
import { courses } from "../../data/coursesData";
import { AVAILABLE_COURSE_SLUGS } from "../../data/availableCourses";
import DigitalStrategyProgram from "./DigitalStrategyProgram";
import BFSIDomainExcellence from "./BFSIDomainExcellence";
import InvestmentBankingWealthTech from "./InvestmentBankingWealthTech";
import RiskManagementRegTech from "./RiskManagementRegTech";
import AIProductManagementMastery from "./AIProductManagementMastery";
import ProductLeadershipProgram from "./ProductLeadershipProgram";
import DataToDecisionsPowerBI from "./DataToDecisionsPowerBI";
import CIPLandingPage from "./CIPLandingPage";
import CorporateReadinessProgram from "./CorporateReadinessProgram";
import PgCDFLandingPage from "./PgCDFLandingPage";

export default function CourseDetails() {
  const { slug } = useParams();

  // Find the course by slug
  const course = courses
    .flatMap(cat => cat.subCourses)
    .find(c => c.slug === slug);

  // Find the parent category
  const category = courses.find(cat =>
    cat.subCourses.some(c => c.slug === slug)
  );

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4 sm:px-6 overflow-x-hidden">
        <div className="max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">❌</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Course Not Found
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Sorry, we couldn't find the course you're looking for.
          </p>
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

  // Map course slugs to their dedicated full-page components
  const detailPageComponents = {
    'bfsi-domain-excellence-program': BFSIDomainExcellence,
    'investment-banking-wealth-tech': InvestmentBankingWealthTech,
    'risk-management-regtech-program': RiskManagementRegTech,
    'ai-product-management-mastery': AIProductManagementMastery,
    'the-mini-ceo-program': ProductLeadershipProgram,
    'data-decisions': DataToDecisionsPowerBI,
    'ai-ml-business-leaders': CIPLandingPage,
    'digital-business-strategy-innovation': DigitalStrategyProgram,
    'corporate-readiness-program': CorporateReadinessProgram,
    'pgcdf': PgCDFLandingPage,
  };

  const DetailComponent = detailPageComponents[slug];

  const backLink = category ? `/courses/${category.slug}` : '/';
  const backLabel = category ? `Back to ${category.mainCategory}` : 'Back to Courses';

  // ── Courses with a dedicated rich landing page ──────────────────────────────
  if (DetailComponent) {
    return (
      <div className="overflow-x-hidden">
        <div className="bg-gradient-to-br from-[#1a2847] via-[#2d3e5f] to-[#3d5278] py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link
              to={backLink}
              className="inline-flex items-center text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5 mr-2" />
              {backLabel}
            </Link>
          </div>
        </div>
        <DetailComponent />
      </div>
    );
  }

  // ── All other courses — full course detail view ──────────────────────────────
  const categoryColor = category?.color || "from-indigo-600 to-purple-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2847] via-[#2d3e5f] to-[#3d5278] overflow-x-hidden">
      {/* Back Navigation */}
      <div className="py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            to={backLink}
            className="inline-flex items-center text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5 mr-2" />
            {backLabel}
          </Link>
        </div>
      </div>

      <div className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

            {/* Course Header */}
            <div className={`bg-gradient-to-r ${categoryColor} text-white p-8 sm:p-12`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                {course.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {course.shortCode && (
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
                    📋 {course.shortCode}
                  </div>
                )}
                {course.certType && (
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
                    🎓 {course.certType}
                  </div>
                )}
                {course.duration && (
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
                    ⏱️ {course.duration}
                  </div>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6 sm:p-8 md:p-12">

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
                <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl">
                  <Clock size={28} className="mx-auto text-indigo-600 mb-2" />
                  <p className="text-xs sm:text-sm text-gray-600">Duration</p>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">{course.duration}</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl">
                  <Award size={28} className="mx-auto text-purple-600 mb-2" />
                  <p className="text-xs sm:text-sm text-gray-600">Level</p>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">{course.level}</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl">
                  <Users size={28} className="mx-auto text-blue-600 mb-2" />
                  <p className="text-xs sm:text-sm text-gray-600">Students</p>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">{course.students}</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl">
                  <TrendingUp size={28} className="mx-auto text-green-600 mb-2" />
                  <p className="text-xs sm:text-sm text-gray-600">Salary</p>
                  <p className="font-bold text-green-600 text-sm sm:text-base">{course.salary}</p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  What You'll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {course.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start p-3 sm:p-4 bg-indigo-50 rounded-lg">
                      <span className="text-indigo-600 mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certification */}
              {course.certification && (
                <div className="mb-10 sm:mb-12 p-6 sm:p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    🎓 Certification
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 mb-4">
                    <strong>{course.certification}</strong>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {course.shortCode && (
                      <span className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold text-sm sm:text-base">
                        {course.shortCode}
                      </span>
                    )}
                    {course.certType && (
                      <span className="px-4 py-2 bg-purple-600 text-white rounded-full font-semibold text-sm sm:text-base">
                        {course.certType}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="flex-1 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-green-700 hover:to-emerald-700 transition"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 text-center bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
                >
                  Request Info
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}