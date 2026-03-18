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

const LONG_TERM = [
  {
    title: "PG Diploma in Digital Business & FinTech",
    badge: "PGDBF",
    badgeColor: "bg-blue-100 text-blue-800",
    desc: "A comprehensive post-graduate program bridging digital business strategy with modern financial technology, BFSI, WealthTech, and RegTech specialisations.",
    icon: <GraduationCap size={32} />,
    color: "from-blue-600 to-indigo-700",
    link: "/courses/pgcdb",
    duration: "12 Months",
  },
];

const MID_TERM = [
  {
    title: "PG Diploma in FinTech, Banking & AI",
    badge: "PGDFBA",
    badgeColor: "bg-emerald-100 text-emerald-800",
    desc: "A focused mid-term program blending AI, data analytics, and digital strategy for finance professionals.",
    icon: <Award size={32} />,
    color: "from-emerald-500 to-teal-600",
    link: "/courses/pgcdf",
    duration: "6 Months",
  },
];

const SHORT_TERM = [
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
  {
    title: "Integrated Courses",
    desc: "Cross-disciplinary programs combining technology, business, and leadership.",
    icon: <LineChart size={30} />,
    color: "from-sky-500 to-indigo-500",
    link: "/courses/integrated-courses",
  },
];

const PARTNER = [
  {
    title: "Cybersecurity",
    desc: "Network security, threat detection, compliance, and cyber defense.",
    icon: <ShieldCheck size={30} />,
    color: "from-red-500 to-rose-500",
    link: "/courses/cybersecurity",
  },
  {
    title: "Mental Health & Social Wellness",
    desc: "Emotional well-being, workplace wellness, and social resilience.",
    icon: <HeartHandshake size={30} />,
    color: "from-green-500 to-lime-500",
    link: "/courses/mental-health-social-wellness",
  },
  {
    title: "Innovation Leadership",
    desc: "Build innovation-driven leadership skills to navigate disruption and lead change.",
    icon: <Lightbulb size={30} />,
    color: "from-yellow-500 to-orange-500",
    link: "/courses/innovation-leadership",
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

/* ─── Featured Card (Long / Mid Term) ─── */
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
        <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
        <div className="mt-5 flex items-center gap-5">
          <span className="text-xs text-gray-400 font-medium">⏱ {item.duration}</span>
          <span className="text-indigo-600 font-semibold text-sm group-hover:underline">
            View Programs →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Standard Card (Short Term / Partner) ─── */
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
            Industry-Focused Programs
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Specialized programs aligned with real-world industry demands — from long-form diplomas to focused short courses.
          </p>
        </div>

        {/* Long Term */}
        <div className="mb-12">
          <SectionLabel label="Long Term" pillClass="bg-blue-100 text-blue-700" />
          <div className="grid gap-5">
            {LONG_TERM.map((item, i) => <FeaturedCard key={i} item={item} />)}
          </div>
        </div>

        {/* Mid Term */}
        <div className="mb-12">
          <SectionLabel label="Mid Term" pillClass="bg-emerald-100 text-emerald-700" />
          <div className="grid gap-5">
            {MID_TERM.map((item, i) => <FeaturedCard key={i} item={item} />)}
          </div>
        </div>

        {/* Short Term */}
        <div className="mb-12">
          <SectionLabel label="Short Term" pillClass="bg-indigo-100 text-indigo-700" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHORT_TERM.map((item, i) => <CourseCard key={i} item={item} />)}
          </div>
        </div>

        {/* Partner Courses */}
        <div>
          <SectionLabel label="Partner Courses" pillClass="bg-orange-100 text-orange-700" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNER.map((item, i) => <CourseCard key={i} item={item} />)}
          </div>
        </div>

      </div>
    </section>
  );
}