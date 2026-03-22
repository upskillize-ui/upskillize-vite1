import {
  Brain,
  ShieldCheck,
  BarChart3,
  Cpu,
  Layers,
  LineChart,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Course Data matching Navbar exactly ─── */

const THREE_YEAR = [
  {
    title: "Master's Diploma in Fintech and Digital Business",
    badge: "MDFDB",
    badgeColor: "bg-violet-100 text-violet-800",
    desc: "A master's-level diploma spanning 9 trimesters, designed to run parallel to your undergraduate degree — building deep expertise in FinTech, digital business, AI, and BFSI from year one.",
    icon: <GraduationCap size={32} />,
    color: "from-violet-600 to-purple-700",
    link: "/courses/threeyearscourses",
    duration: "3 Years · 9 Trimesters",
    parallel: "Parallel to Undergraduation",
    isNew: true,
  },
];

const TWO_YEAR = [
  {
    title: "Advanced Diploma in Fintech and Digital Business",
    badge: "ADFDB",
    badgeColor: "bg-teal-100 text-teal-800",
    desc: "A rigorous advanced diploma across 6 trimesters, designed to run alongside your MBA — combining BFSI strategy, AI, WealthTech, and digital transformation with live industry projects.",
    icon: <Award size={32} />,
    color: "from-teal-500 to-cyan-600",
    link: "/courses/pgdfdb-2t",
    duration: "2 Years · 6 Trimesters",
    parallel: "Parallel to MBA",
    isNew: true,
  },
  {
    title: "PG Diploma in Fintech and Digital Business",
    badge: "PGDFDB",
    badgeColor: "bg-blue-100 text-blue-800",
    desc: "A comprehensive post-graduate diploma across 4 semesters, designed to run alongside your MBA — bridging digital business strategy with modern financial technology, BFSI, WealthTech, and RegTech.",
    icon: <GraduationCap size={32} />,
    color: "from-blue-600 to-indigo-700",
    link: "/courses/pgcdb",
    duration: "2 Years · 4 Semesters",
    parallel: "Parallel to MBA",
  },
];

const ONE_YEAR = [
  {
    title: "PG Diploma in FinTech, Banking & AI",
    badge: "PGDFBA",
    badgeColor: "bg-emerald-100 text-emerald-800",
    desc: "A focused one-year program blending AI, data analytics, and digital strategy for finance professionals — delivered across 6 bimesters, online/hybrid.",
    icon: <Lightbulb size={32} />,
    color: "from-emerald-500 to-teal-600",
    link: "/courses/pgcdf",
    duration: "1 Year · 6 Bimesters",
    parallel: "Online / Hybrid",
  },
];

const QUARTER = [
  {
    title: "AI in FinTech",
    desc: "AI-driven solutions for banking, fraud detection, risk analysis, and digital payments.",
    icon: <Cpu size={30} />,
    color: "from-blue-500 to-cyan-500",
    link: "/courses/ai-fintech",
  },
  {
    title: "Product Leadership",
    desc: "Product strategy, roadmapping, execution, and leadership for high-impact products.",
    icon: <Briefcase size={30} />,
    color: "from-orange-500 to-amber-500",
    link: "/courses/product-leadership",
  },
  {
    title: "Data Analytics, GenAI & BI",
    desc: "Analyze, visualize, and interpret data; leverage Generative AI for smarter business decisions.",
    icon: <BarChart3 size={30} />,
    color: "from-purple-500 to-pink-500",
    link: "/courses/data-analytics-genai",
  },
  {
    title: "Technology & Digital Transformation",
    desc: "Cloud, AI adoption, automation, and enterprise digital transformation.",
    icon: <Layers size={30} />,
    color: "from-indigo-500 to-blue-500",
    link: "/courses/technology-digital-transformation",
  },
];

/* ─── Section Label ─── */
function SectionLabel({ label, pillClass }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full ${pillClass}`}>
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

/* ─── Featured Card (Two Year / One Year) ─── */
function FeaturedCard({ item }) {
  return (
    <Link
      to={item.link}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
    >
      <div className={`bg-gradient-to-br ${item.color} text-white p-8 flex flex-col justify-between sm:w-52 shrink-0`}>
        <div>{item.icon}</div>
        <span className={`mt-6 self-start text-xs font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
          {item.badge}
        </span>
      </div>
      <div className="p-7 flex flex-col justify-center">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>
          {item.isNew && (
            <span style={{ fontSize: "9px", fontWeight: 700, background: "#FAEEDA", color: "#633806", borderRadius: "3px", padding: "2px 7px" }}>
              NEW
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
        <div className="mt-5 flex items-center gap-5 flex-wrap">
          <span className="text-xs text-gray-400 font-medium">⏱ {item.duration}</span>
          {item.parallel && (
            <span className="text-xs text-indigo-400 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{item.parallel}</span>
          )}
          <span className="text-indigo-600 font-semibold text-sm group-hover:underline">
            View Programs →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Standard Card (Quarter) ─── */
function CourseCard({ item }) {
  return (
    <Link
      to={item.link}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block"
    >
      <div className={`p-5 bg-gradient-to-r ${item.color} text-white`}>
        {item.icon}
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
        <div className="mt-4 text-indigo-600 font-semibold text-sm group-hover:underline">
          View Programs →
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Component ─── */
export default function HomeCourses() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Higher Education Programs
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Two years of immersion. Twenty years of strategic and career advantage. We make you part of it.
          </p>
        </div>

        {/* Three Year */}
        <div className="mb-12">
          <SectionLabel label="Three Year" pillClass="bg-violet-100 text-violet-700" />
          <div className="grid gap-5">
            {THREE_YEAR.map((item, i) => <FeaturedCard key={i} item={item} />)}
          </div>
        </div>

        {/* Two Year */}
        <div className="mb-12">
          <SectionLabel label="Two Year" pillClass="bg-blue-100 text-blue-700" />
          <div className="grid gap-5">
            {TWO_YEAR.map((item, i) => <FeaturedCard key={i} item={item} />)}
          </div>
        </div>

        {/* One Year */}
        <div className="mb-12">
          <SectionLabel label="One Year" pillClass="bg-emerald-100 text-emerald-700" />
          <div className="grid gap-5">
            {ONE_YEAR.map((item, i) => <FeaturedCard key={i} item={item} />)}
          </div>
        </div>

        {/* Quarter */}
        <div className="mb-12">
          <SectionLabel label="Quarter" pillClass="bg-indigo-100 text-indigo-700" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUARTER.map((item, i) => <CourseCard key={i} item={item} />)}
          </div>
        </div>

        {/* BFSI Innovation Lab */}
        <div>
          <SectionLabel label="BFSI Innovation Lab" pillClass="bg-blue-100 text-blue-700" />
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white text-2xl">
              🏦
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-gray-800">BFSI Innovation Lab</h3>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">
                Innovation-driven, industry-integrated learning ecosystem designed for real-world BFSI transformation. 
                Collaborate with industry experts, work on live BFSI projects, and gain hands-on experience in cutting-edge 
                banking, financial services, and insurance technology.
              </p>
              <Link
                to="/courses/ai-fintech"
                className="inline-block mt-4 text-indigo-600 font-semibold text-sm hover:underline"
              >
                Explore BFSI Programs →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}