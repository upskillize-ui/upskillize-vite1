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
import PgCDFLandingPage from "./pages/courses/OneYearCourse";
import PgCDBLandingPage from "./pages/courses/TwoYearsSemester";
import ThreeYearsCourse from "./pages/courses/ThreeYearsCourse";
import BFSIInnovationLab from "./pages/BFSIInnovationLab";
import TwoYearsSemester from "./pages/courses/TwoYearsSemester";
import RegisterPage from "./pages/RegisterPage";

import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* FULL PAGE FLEX */}
      <div className="flex flex-col min-h-screen">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* COURSE PAGES */}
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
            <Route path="/courses/threeyearscourse" element={<ThreeYearsCourse />} />
            <Route path="/courses/pgdfdb" element={<TwoYearsSemester />} />
            <Route path="/bfsiinnovationlab" element={<BFSIInnovationLab />} />

            {/* DYNAMIC */}
            <Route path="/courses/:category" element={<CoursesPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* FOOTER INSIDE FLEX */}
        <Footer />
      </div>

      {/* FLOATING BUTTON */}
      <WhatsAppChat phoneNumber="919820397297" />
    </Router>
  );
}

export default App;