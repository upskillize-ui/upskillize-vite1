import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

import Home from "./pages/Home";
import Academic from "./pages/Academic";
import Corporate from "./pages/Corporate";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CourseDetails from "./pages/courses/CoursesDetails";
import SubCourses from "./pages/SubCourses";
import CoursesPage from "./pages/CoursesPage";
import WhatsAppChat from "./components/WhatsAppChat";

// About pages
import AboutUs from "./pages/about/AboutUs";
import EcoProLMS from "./pages/about/EcoProLMS";

// New pages
import Solutions from "./pages/Products";
import CorporateConsulting from "./pages/Corporate/CorporateConsulting";
import CorporateTraining from "./pages/Corporate/CorporateTraining";
import Compliize from "./pages/Compliize";
import Optimize from "./pages/Optimize";
import Vendorize from "./pages/Vendorize";

// Careers pages
import Internship from "./pages/careers/internship";
import Placement from "./pages/careers/placement";

// Courses pages
import BFSIDomainExcellence from "./pages/courses/BFSIDomainExcellence";
import InvestmentBankingWealthTech from "./pages/courses/InvestmentBankingWealthTech";
import RiskManagementRegTech from "./pages/courses/RiskManagementRegTech";
import AIProductManagementMastery from "./pages/courses/AIProductManagementMastery";
import ProductLeadershipProgram from "./pages/courses/ProductLeadershipProgram";
import DataToDecisionsPowerBI from "./pages/courses/DataToDecisionsPowerBI";
import CAIPLandingPage from "./pages/courses/CIPLandingPage";
import DigitalStrategyProgram from "./pages/courses/DigitalStrategyProgram";
import CorporateReadinessProgram from "./pages/courses/CorporateReadinessProgram";
import PgCDFLandingPage from "./pages/courses/PgCDFLandingPage";
import PgCDBLandingPage from "./pages/courses/PgCDBLandingPage";
import ThreeYearsCourse from "./pages/courses/ThreeYearsCourse";
import TwoYearsTrimester from "./pages/courses/TwoYearsTrimester";
import BFSIInnovationLab from "./pages/BFSIInnovationLab";

import "./App.css";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />

      <div className="min-h-screen w-full flex flex-col">
        {/* FIXED NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1">
          <Routes>
            {/* MAIN PAGES */}
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />

            {/* CORPORATES */}
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/corporate/consulting" element={<CorporateConsulting />} />
            <Route path="/corporate/training" element={<CorporateTraining />} />

            {/* CAREERS */}
            <Route path="/careers/internship" element={<Internship />} />
            <Route path="/careers/placement" element={<Placement />} />

            {/* ACADEMIC */}
            <Route path="/academic" element={<Academic />} />

            {/* ABOUT & CONTACT */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about/eco-pro-lms" element={<EcoProLMS />} />
            <Route path="/contact" element={<Contact />} />

            {/* PRODUCTS */}
            <Route path="/products/optimize" element={<Optimize />} />
            <Route path="/products/compliize" element={<Compliize />} />
            <Route path="/products/vendorize" element={<Vendorize />} />

            {/* LEGAL */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* COURSE REDIRECTS */}
            <Route path="/courses" element={<Navigate to="/academic" replace />} />
            <Route path="/course/:slug" element={<CourseDetails />} />
            <Route path="/courses/details/pgcdb" element={<Navigate to="/courses/pgcdb" replace />} />
            <Route path="/courses/details/pgcdf" element={<Navigate to="/courses/pgcdf" replace />} />
            <Route path="/courses/corporate-readiness-program" element={<Navigate to="/course/corporate-readiness-program" replace />} />
            <Route path="/courses/threeyearscourses" element={<Navigate to="/courses/threeyearscourse" replace />} />

            {/* ── SPECIFIC COURSE PAGES ── */}
            {/* IMPORTANT: All specific /courses/xxx routes MUST come before /courses/:category */}
            <Route path="/courses/bfsi-domain-excellence-program" element={<BFSIDomainExcellence />} />
            <Route path="/courses/investment-banking-wealth-tech" element={<InvestmentBankingWealthTech />} />
            <Route path="/courses/risk-management-regtech-program" element={<RiskManagementRegTech />} />
            <Route path="/courses/the-mini-ceo-program" element={<ProductLeadershipProgram />} />
            <Route path="/courses/ai-product-management-mastery" element={<AIProductManagementMastery />} />
            <Route path="/courses/data-decisions" element={<DataToDecisionsPowerBI />} />
            <Route path="/courses/ai-ml-business-leaders" element={<CAIPLandingPage />} />
            <Route path="/courses/digital-business-strategy-innovation" element={<DigitalStrategyProgram />} />
            <Route path="/course/corporate-readiness-program" element={<CorporateReadinessProgram />} />
            <Route path="/courses/pgcdf" element={<PgCDFLandingPage />} />
            <Route path="/courses/pgcdb" element={<PgCDBLandingPage />} />

            {/* THREE YEARS */}
            <Route path="/courses/threeyearscourse" element={<ThreeYearsCourse />} />

            {/* TWO YEARS TRIMESTER — both slugs point to same page */}
            <Route path="/courses/twoyearstrimester" element={<TwoYearsTrimester />} />
            <Route path="/courses/pgdfdb-2t" element={<TwoYearsTrimester />} />

            {/* BFSI INNOVATION LAB */}
            <Route path="/bfsiinnovationlab" element={<BFSIInnovationLab />} />

            {/* ── CATCH-ALL: /courses/:category must be LAST among course routes ── */}
            <Route path="/courses/:category" element={<CoursesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <WhatsAppChat phoneNumber="919820397297" />
    </Router>
  );
}

export default App;