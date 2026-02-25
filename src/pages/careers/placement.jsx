import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Briefcase,
  BarChart3,
  Layers,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const COURSES = [
  {
    title: "AI in FinTech",
    desc: "Python • TensorFlow • Fraud Detection • Risk Modeling",
    icon: <Brain size={36} />,
    color: "from-blue-500 to-cyan-500",
    company: "Paytm",
  },
  {
    title: "Product Leadership Program",
    desc: "Product Strategy • Roadmapping • Execution • Go-to-Market",
    icon: <Briefcase size={36} />,
    color: "from-emerald-500 to-teal-500",
    company: "Razorpay",
  },
  {
    title: "Data Analytics, GenAI & BI",
    desc: "Python • Pandas • PowerBI • GenAI • SQL",
    icon: <BarChart3 size={36} />,
    color: "from-purple-500 to-pink-500",
    company: "Groww",
  },
  {
    title: "Technology & Digital Transformation",
    desc: "AWS • Kubernetes • Microservices • DevOps",
    icon: <Layers size={36} />,
    color: "from-orange-500 to-amber-500",
    company: "Cred",
  },
  {
    title: "Integrated Programs",
    desc: "Full Stack • AI/ML • Cloud • Business • Leadership",
    icon: <TrendingUp size={36} />,
    color: "from-sky-500 to-indigo-500",
    company: "PhonePe",
  },
  {
    title: "Cybersecurity Mastery",
    desc: "Ethical Hacking • Threat Detection • Compliance",
    icon: <ShieldCheck size={36} />,
    color: "from-indigo-500 to-blue-500",
    company: "PayU",
  },
  {
    title: "Corporate Readiness Program",
    desc: "Communication • Leadership • Interview Prep",
    icon: <GraduationCap size={36} />,
    color: "from-green-500 to-emerald-500",
    company: "Zepto",
  },
];

export default function Placement() {
  return (
    <div className="min-h-screen">
      {/* Hero - NEW LAUNCH */}
      <section className="bg-gradient-to-r from-gray-600  to-blue-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-green-400/20 border-2 border-green-400/50 px-6 py-3 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
            <span className="font-bold text-green-300">COMING SOON</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-6">
            Placement Assistance
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
            <strong>NEW BATCH STARTS SOON</strong>
            <br />
            Register now → Complete courses → Get exclusive interview
            opportunities with top companies in the industry
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl max-w-2xl mx-auto mb-12 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Our Launch Process:
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-white text-sm">1</span>
                  </div>
                  <span>
                    <strong>REGISTER</strong> - Enroll in courses (Now)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-white text-sm">2</span>
                  </div>
                  <span>
                    <strong>COMPLETE</strong> - Finish all modules (3 months)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-white text-sm">3</span>
                  </div>
                  <span>
                    <strong>APPLY</strong> - Placement assistance opens soon
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-white text-sm">4</span>
                  </div>
                  <span>
                    <strong>INTERVIEWS</strong> - Partner company calls
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="w-full bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
              Partner Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              First batch students get{" "}
              <strong>exclusive interview opportunities</strong> with our
              partners
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`p-6 bg-gradient-to-r ${item.color} text-white`}
                >
                  {item.icon}
                </div>
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-lg">
                      {item.company}
                    </span>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:from-indigo-600 hover:to-blue-700 transition-all"
                    >
                      Start Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-green-400/20 border-2 border-green-400/50 px-8 py-4 rounded-2xl mb-8">
            <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-ping"></span>
            <span className="text-2xl font-bold text-green-300">
              LAUNCHING SOON
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be in Our New Batch
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Register FREE → Complete courses → Get exclusive interview
            opportunities with top companies
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-16 py-5 rounded-2xl text-2xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl inline-block mb-6"
          >
            Register FREE Now
          </Link>
          <p className="text-lg opacity-75">
            <strong>Only Few seats for first batch</strong> - Register before
            they fill!
          </p>
        </div>
      </section>
    </div>
  );
}
