import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Users, TrendingUp, Award, Briefcase, BookOpen, Target, Brain, MessageSquare, Clock, Star, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CorporateReadinessProgram() {
  const [activeCourse, setActiveCourse] = useState(0);

  const stats = [
    { value: "8.25%", label: "Graduates in Aligned Roles", sublabel: "Economic Survey 2024-25" },
    { value: "42.6%", label: "Overall Employability", sublabel: "Down from 44.3% in 2023" },
    { value: "50%+", label: "In Elementary Jobs", sublabel: "Skills Mismatch Crisis" }
  ];

  const focusAreas = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Corporate Virtues",
      description: "Core ethical values, integrity, accountability, and professionalism for business decisions",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Social Interactions & Communication",
      description: "Master verbal, non-verbal, written communication, networking, and conflict resolution",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Personality Enhancement",
      description: "Cultivate self-awareness, confidence, adaptability, resilience, and continuous learning",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const courses = [
    {
      title: "Ethical Foundations & Corporate Readiness",
      sessions: [
        {
          name: "Your Professional Debut: Mastering First Impressions",
          growth: "Weak Professional First Impressions",
          points: ["First impressions importance", "Dress code & attire", "Body language & posture", "Verbal & behavioral impression"],
          outcome: "Students will make standout professional impressions, crucial for securing jobs and building rapport"
        },
        {
          name: "Silent Signals: Decoding & Projecting Professional Body Language",
          growth: "Unprofessional Body Language",
          points: ["Reading body language", "Maintaining eye contact", "Empathetic listening", "Paraphrasing techniques"],
          outcome: "Students will project confidence and credibility, leading to stronger impressions in interviews"
        },
        {
          name: "Teamwork & Collaboration",
          growth: "Ineffective Teamwork & Dynamics",
          points: ["Understanding team dynamics", "Leadership vs. followership", "Mutual respect", "Delegating tasks"],
          outcome: "Graduates will be valuable, collaborative team players contributing effectively"
        },
        {
          name: "Corporate Culture & Continuous Learning",
          growth: "Limited Corporate Culture Understanding",
          points: ["Adapting to corporate environments", "Growth mindset", "Networking skills", "Seeking mentorship"],
          outcome: "Understanding corporate culture enables quick integration and career progression"
        }
      ]
    },
    {
      title: "Empowerment Essentials",
      sessions: [
        {
          name: "Self-Awareness & Goal Setting",
          growth: "Self-awareness gaps",
          points: ["Identifying strengths & weaknesses", "Understanding interests", "Listening as foundation", "Career direction clarity"],
          outcome: "Gain profound self-understanding for informed career decisions and clear professional roadmap"
        },
        {
          name: "Time Management & Productivity",
          growth: "Poor time and task management",
          points: ["Prioritization techniques", "Avoiding procrastination", "Setting boundaries", "Communicating deadlines"],
          outcome: "Develop strong organizational skills and ability to prioritize effectively under pressure"
        },
        {
          name: "Stress Management & Resilience",
          growth: "Lack of proactive coping mechanisms",
          points: ["Identifying stressors", "Coping mechanisms", "Positive mindset development", "Professional communication of stress"],
          outcome: "Develop emotional intelligence and self-regulation skills to manage workplace pressure"
        },
        {
          name: "Adaptability & Problem Solving",
          growth: "Rigidity in ambiguous situations",
          points: ["Embracing change", "Creative thinking", "Analytical approaches", "Articulating problems & solutions"],
          outcome: "Equips students with courage and skills to address disagreements professionally"
        }
      ]
    },
    {
      title: "Beyond Words: Bridging Gaps with Communication",
      sessions: [
        {
          name: "Verbal Communication & Public Speaking",
          growth: "Public speaking anxiety",
          points: ["Building confidence", "Overcoming stage fright", "Effective public speaking", "Structuring presentations"],
          outcome: "Develop strong verbal communication skills for clear and persuasive presentations"
        },
        {
          name: "Written Communication & Email Etiquette",
          growth: "Inability to write professionally",
          points: ["Professional correspondence", "Clarity & conciseness", "Grammar & tone", "Structuring emails & reports"],
          outcome: "Produce professional, effective written communications enhancing credibility"
        },
        {
          name: "Interpersonal Communication & Conflict Resolution",
          growth: "Rigidity in changing situations",
          points: ["Building rapport & empathy", "Managing emotions", "Expressing disagreements", "Giving/receiving feedback"],
          outcome: "Address disagreements professionally and contribute to harmonious work environment"
        },
        {
          name: "Business Ethics & Integrity",
          growth: "Unaware of ethical dilemmas",
          points: ["Developing ethical compass", "Honesty & transparency", "Accountability & fairness", "Avoiding conflicts of interest"],
          outcome: "Navigate moral dilemmas with integrity and maintain positive professional reputation"
        }
      ]
    }
  ];

  const methodologies = [
    { name: "Challenge Based Learning (CBL)", icon: <Target className="w-6 h-6" /> },
    { name: "Video Analysis", icon: <BookOpen className="w-6 h-6" /> },
    { name: "Collaborative Group Discussions", icon: <Users className="w-6 h-6" /> },
    { name: "Immersive Role-Playing Scenarios", icon: <Award className="w-6 h-6" /> },
    { name: "Case Studies", icon: <Brain className="w-6 h-6" /> }
  ];

  const programStructure = {
    duration: "13 Weeks",
    frequency: "1 class per week",
    sessionDuration: "60-75 minutes",
    targetAudience: "8th Semester Students"
  };

  const stakeholders = [
    {
      type: "Students",
      benefits: [
        "Enhanced Employability & Job Readiness",
        "Stronger Foundations",
        "Increased Confidence & Poise",
        "Effective Networking Skills",
        "Ethical Decision-Making",
        "Adaptability & Resilience"
      ],
      color: "from-cyan-500 to-blue-500"
    },
    {
      type: "Universities / Colleges",
      benefits: [
        "Higher Placement Rates",
        "Competitive Advantage",
        "Smoother Career Transitions",
        "Increased Student Engagement",
        "Bridging the Industry Gap",
        "Reputation for Innovation",
        "Increased University Advocacy"
      ],
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/20 text-purple-400 text-sm font-semibold tracking-wider uppercase">
              🎓 Professional Transformation
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-cyan-100 mb-6">
            Mastering Corporate Readiness
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Bridge the gap from campus to corporate with essential virtues, refined skills, and unwavering ethical foundations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Enroll Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all">
              Download Curriculum
            </button>
          </div>

          {/* Program Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "13 Weeks", label: "Duration", icon: <Clock className="w-6 h-6" /> },
              { value: "3 Courses", label: "Core Modules", icon: <BookOpen className="w-6 h-6" /> },
              { value: "15+ Sessions", label: "Interactive", icon: <Users className="w-6 h-6" /> },
              { value: "100%", label: "Practical", icon: <Target className="w-6 h-6" /> }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-purple-400 mb-2 flex justify-center">{item.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-gray-300 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Landscape */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              The Problem Landscape
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the critical skills gap in India's graduate workforce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-8 border border-red-500/20 text-center">
                <div className="text-5xl font-bold text-red-400 mb-2">{stat.value}</div>
                <div className="text-white font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.sublabel}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Skills Mismatch",
                description: "Only 8.25% of graduates employed in roles aligning with their qualifications. Over 50% are underemployed in elementary or semi-skilled jobs.",
                icon: <TrendingUp className="w-8 h-8" />,
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Declining Employability",
                description: "Overall employability dropped from 44.3% (2023) to 42.6% (2024), primarily driven by non-technical skills deficit.",
                icon: <Award className="w-8 h-8" />,
                color: "from-orange-500 to-yellow-500"
              },
              {
                title: "Soft Skills Deficit",
                description: "Despite 50% proficiency in emotional intelligence and creativity, critical gaps exist in communication, critical thinking, and leadership.",
                icon: <MessageSquare className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Technical vs. Non-Technical",
                description: "While technical proficiency (46.1% in AI/ML roles) isn't the sole issue, significant deficits exist in non-technical roles and soft skills.",
                icon: <Brain className="w-8 h-8" />,
                color: "from-cyan-500 to-blue-500"
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Core Program Components
            </h2>
            <p className="text-xl text-gray-300">
              Three pillars of professional excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {focusAreas.map((area, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/30 transition-all hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${area.color} rounded-lg flex items-center justify-center mb-6 text-white`}>
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{area.description}</p>
                <div className={`h-1 w-24 bg-gradient-to-r ${area.color} rounded-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Detailed Curriculum
            </h2>
            <p className="text-xl text-gray-300">
              15+ interactive sessions across 3 comprehensive courses
            </p>
          </div>

          {/* Course Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {courses.map((course, i) => (
              <button
                key={i}
                onClick={() => setActiveCourse(i)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCourse === i
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Course {i + 1}
              </button>
            ))}
          </div>

          {/* Active Course Content */}
          <div className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-8">{courses[activeCourse].title}</h3>
            
            <div className="space-y-6">
              {courses[activeCourse].sessions.map((session, i) => (
                <div key={i} className="bg-[#0f1729]/50 rounded-lg p-6 border border-white/5 hover:border-purple-400/30 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{session.name}</h4>
                      <p className="text-orange-400 text-sm mb-3">
                        <span className="font-semibold">Growth Opportunity:</span> {session.growth}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-14">
                    <div>
                      <p className="text-cyan-400 font-semibold mb-2 text-sm">Discussion Points:</p>
                      <ul className="space-y-1">
                        {session.points.map((point, j) => (
                          <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-emerald-400 font-semibold mb-2 text-sm">End Outcome:</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{session.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodologies */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our Unique Approach
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experiential curriculum because every student should gain practical, hands-on experience before entering the corporate world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologies.map((method, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all hover:scale-105 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{method.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Program Structure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(programStructure).map(([key, value], i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{value}</div>
                <div className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Session Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { phase: "Welcome & Recap", time: "5-10 min", desc: "Review previous week's key takeaways" },
                { phase: "Introduction to New Topic", time: "15-20 min", desc: "Present theory and importance" },
                { phase: "Interactive Activity/Discussion", time: "30-45 min", desc: "Group activities, role-playing, case studies" },
                { phase: "Practical Application/Tips", time: "20-30 min", desc: "Actionable advice and real-world examples" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.phase}</h4>
                    <p className="text-cyan-400 text-sm mb-1">{item.time}</p>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders Benefits */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#152847]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Who Benefits?
            </h2>
            <p className="text-xl text-gray-300">
              Creating value for students and institutions alike
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stakeholders.map((stakeholder, i) => (
              <div key={i} className={`bg-gradient-to-br from-[#1e2d4a]/80 to-[#2a3f5f]/80 backdrop-blur-sm rounded-xl p-8 border border-white/10`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${stakeholder.color} rounded-lg flex items-center justify-center text-white`}>
                    {i === 0 ? <Users className="w-7 h-7" /> : <Building className="w-7 h-7" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stakeholder.type}</h3>
                </div>
                <div className="space-y-3">
                  {stakeholder.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#243452]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Bridge the Campus-Corporate Gap?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of students who've transformed into industry-ready professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                Enroll Your Students
                  <ArrowRight className="w-5 h-5" />
              </Link>
            </button>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all">
                Request Partnership Info
                <ArrowRight className="w-5 h-5" />
              </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}