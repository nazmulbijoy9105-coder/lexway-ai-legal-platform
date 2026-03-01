import Link from "next/link";
import { 
  Scale, 
  GraduationCap, 
  Gavel, 
  Brain, 
  Users, 
  Trophy, 
  Target, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  BookOpen,
  FileText,
  MessageSquare,
  BarChart3,
  Award,
  Shield,
  Clock,
  Star
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-legal-500 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-xl font-bold gradient-text">LexWay AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#curriculum" className="text-slate-600 hover:text-primary-600 transition-colors">Curriculum</a>
              <a href="#bar-council" className="text-slate-600 hover:text-primary-600 transition-colors">Bar Council</a>
              <a href="#law-game" className="text-slate-600 hover:text-primary-600 transition-colors">Law Game</a>
              <a href="#mentors" className="text-slate-600 hover:text-primary-600 transition-colors">Mentors</a>
              <a href="#pricing" className="text-slate-600 hover:text-primary-600 transition-colors">Pricing</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-legal-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bar-100 rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Legal Education
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master Law with{" "}
              <span className="gradient-text">AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              The comprehensive platform for LL.B students and legal professionals. 
              Prepare for Bar Council exams, practice with AI judges, and learn from expert mentors.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register?role=student" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="#demo" className="btn-secondary text-lg px-8 py-4">
                Watch Demo
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50K+", label: "Students", icon: Users },
                { value: "500+", label: "Topics", icon: BookOpen },
                { value: "95%", label: "Pass Rate", icon: Trophy },
                { value: "AI", label: "Powered", icon: Brain },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A complete learning ecosystem designed for law students and professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: GraduationCap,
                title: "LL.B Curriculum",
                description: "Complete 5-year and 3-year LL.B programs with semester-wise modules, notes, and assessments.",
                color: "primary",
              },
              {
                icon: Gavel,
                title: "Bar Council Prep",
                description: "Separate pipelines for Lower Court and High Court exams with pattern-based practice.",
                color: "legal",
              },
              {
                icon: Brain,
                title: "AI Evaluation",
                description: "Get instant IRAC-based feedback on your answers with detailed improvement suggestions.",
                color: "bar",
              },
              {
                icon: Target,
                title: "Law Imitation Game",
                description: "Practice litigation skills with AI judges and opponents in realistic court simulations.",
                color: "primary",
              },
              {
                icon: Users,
                title: "Expert Mentors",
                description: "Connect with experienced advocates for 1-on-1 coaching, mock vivas, and scenario reviews.",
                color: "legal",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description: "Track progress with heatmaps, identify weak areas, and get personalized recommendations.",
                color: "bar",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="card p-8 card-hover"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.color === 'primary' ? 'bg-primary-100' :
                  feature.color === 'legal' ? 'bg-legal-100' :
                  'bg-bar-100'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'primary' ? 'text-primary-600' :
                    feature.color === 'legal' ? 'text-legal-600' :
                    'text-bar-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                LL.B Program
              </div>
              <h2 className="font-heading text-4xl font-bold mb-6">
                Comprehensive Law Curriculum
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Master every aspect of law with our structured curriculum covering 8-12 semesters 
                of LL.B Hons. Each module includes video lectures, reading materials, practice questions, and AI-evaluated assignments.
              </p>
              
              <div className="space-y-4">
                {[
                  "Year 1: Legal Methods, Contracts, Constitutional Law",
                  "Year 2: Torts, Criminal Law, Property, PIL",
                  "Year 3: CPC, CrPC, Evidence, Company Law",
                  "Year 4: Professional Ethics, ADR, Research Thesis",
                ].map((year, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{year}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/curriculum" className="btn-primary mt-8 inline-flex items-center">
                Explore Curriculum <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { code: "LLB-101", name: "Legal System", color: "primary" },
                { code: "LLB-201", name: "Contract Law", color: "legal" },
                { code: "LLB-301", name: "Constitutional", color: "bar" },
                { code: "LLB-401", name: "Criminal Law", color: "primary" },
                { code: "LLB-501", name: "Property Law", color: "legal" },
                { code: "LLB-601", name: "Evidence", color: "bar" },
              ].map((mod, index) => (
                <div 
                  key={index}
                  className={`card p-6 text-center card-hover ${
                    mod.color === 'primary' ? 'border-l-4 border-l-primary-500' :
                    mod.color === 'legal' ? 'border-l-4 border-l-legal-500' :
                    'border-l-4 border-l-bar-500'
                  }`}
                >
                  <div className="text-sm font-medium text-slate-500 mb-1">{mod.code}</div>
                  <div className="font-semibold">{mod.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bar Council Section */}
      <section id="bar-council" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-bar-100 text-bar-700 rounded-full text-sm font-medium mb-4">
              Bar Council Prep
            </div>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Ace Your Bar Council Exams
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dedicated preparation tracks for Lower Court and High Court examinations with 
              written practice and viva simulation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lower Court */}
            <div className="card-elevated overflow-hidden">
              <div className="bg-gradient-to-r from-bar-500 to-bar-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Lower Court</h3>
                <p className="text-bar-100">Written + Viva Preparation</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  {[
                    "CPC (Civil Procedure Code)",
                    "CrPC (Criminal Procedure Code)",
                    "Indian Penal Code",
                    "Evidence Act",
                    "Limitation Act",
                    "Specific Relief Act",
                    "Constitution Basics",
                    "Professional Ethics",
                  ].map((subject, index) => (
                    <div key={index} className="flex items-center">
                      <FileText className="w-4 h-4 text-bar-500 mr-3" />
                      <span className="text-slate-700">{subject}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register?plan=basic" className="btn-primary w-full justify-center inline-flex">
                  Start Prep
                </Link>
              </div>
            </div>
            
            {/* High Court */}
            <div className="card-elevated overflow-hidden">
              <div className="bg-gradient-to-r from-legal-500 to-legal-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">High Court</h3>
                <p className="text-legal-100">Advanced + Interview Ready</p>
              </div>
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  {[
                    "Constitution Advanced",
                    "Writ Jurisdiction",
                    "Judicial Review",
                    "Company Law",
                    "Arbitration Law",
                    "Intellectual Property",
                    "Taxation Law",
                    "Professional Conduct",
                  ].map((subject, index) => (
                    <div key={index} className="flex items-center">
                      <FileText className="w-4 h-4 text-legal-500 mr-3" />
                      <span className="text-slate-700">{subject}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register?plan=premium" className="btn-secondary w-full justify-center inline-flex">
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Law Imitation Game */}
      <section id="law-game" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 bg-legal-500/20 text-legal-400 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Unique Feature
              </div>
              <h2 className="font-heading text-4xl font-bold mb-6">
                Law Imitation Game
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Experience real litigation without the risk. Practice court proceedings with AI judges, 
                argue cases against AI opponents, and get scored on your performance.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Gavel, title: "AI Judge", desc: "Realistic judgment" },
                  { icon: MessageSquare, title: "Cross-Examine", desc: "Practice Q&A" },
                  { icon: FileText, title: "Draft Pleadings", desc: "Legal writing" },
                  { icon: Award, title: "Score & Improve", desc: "Track progress" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-legal-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-legal-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{feature.title}</div>
                      <div className="text-sm text-slate-400">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/law-game" className="btn-primary inline-flex items-center">
                Try a Scenario <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-legal-500 to-primary-500 rounded-3xl blur-2xl opacity-30" />
                <div className="relative glass-dark rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                        <Gavel className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Case #247</div>
                        <div className="text-sm text-slate-400">Property Dispute</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-400">85</div>
                      <div className="text-xs text-slate-400">Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-xs text-legal-400 mb-1">ISSUE IDENTIFIED</div>
                      <div className="text-sm">Whether the tenant has acquired ownership rights through adverse possession?</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-xs text-primary-400 mb-1">RULE CITED</div>
                      <div className="text-sm">Section 27 of the Limitation Act, Article 65 - Suit for possession</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-xs text-bar-400 mb-1">APPLICATION</div>
                      <div className="text-sm">The plaintiff has been in continuous possession for 12 years...</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Difficulty: <span className="text-legal-400">Advanced</span></span>
                    <span className="text-slate-400">Time: <span className="text-primary-400">15:30</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="mentors" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Expert Mentors
            </div>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Learn from Experienced Advocates
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect with senior advocates for personalized coaching, mock viva sessions, 
              and scenario reviews
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Adv. Priya Sharma",
                title: "Senior Advocate, Supreme Court",
                expertise: ["Constitutional Law", "Writs", "Human Rights"],
                rating: 4.9,
                sessions: 520,
                image: "PS",
              },
              {
                name: "Adv. Rahul Verma",
                title: "Advocate, Delhi High Court",
                expertise: ["Corporate Law", "Contracts", "Arbitration"],
                rating: 4.8,
                sessions: 380,
                image: "RV",
              },
              {
                name: "Adv. Anjali Patel",
                title: " Advocate, Bombay High Court",
                expertise: ["Criminal Law", "CPC", "Evidence"],
                rating: 4.9,
                sessions: 450,
                image: "AP",
              },
            ].map((mentor, index) => (
              <div key={index} className="card p-6 card-hover">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-legal-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {mentor.image}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{mentor.name}</h3>
                    <p className="text-sm text-slate-500">{mentor.title}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((exp, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                      {exp}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-bar-500 fill-current mr-1" />
                    <span className="font-semibold">{mentor.rating}</span>
                    <span className="text-slate-400 text-sm ml-1">({mentor.sessions} sessions)</span>
                  </div>
                  <button className="text-primary-600 font-medium text-sm hover:underline">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/mentors" className="btn-secondary inline-flex items-center">
              Browse All Mentors <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-bar-100 text-bar-700 rounded-full text-sm font-medium mb-4">
              Simple Pricing
            </div>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start free, upgrade when you&apos;re ready. All plans include core curriculum access.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="card p-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">₹0<span className="text-lg font-normal text-slate-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                {[
                  "LL.B Year 1 Modules",
                  "Basic Bar Council Prep",
                  "AI Evaluation (5/month)",
                  "Progress Tracking",
                  "Community Access",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn-secondary w-full justify-center inline-flex">
                Get Started
              </Link>
            </div>
            
            {/* Basic */}
            <div className="card-elevated p-8 border-2 border-primary-500 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <div className="text-4xl font-bold mb-6">₹499<span className="text-lg font-normal text-slate-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                {[
                  "All LL.B Years (1-5)",
                  "Lower Court Prep",
                  "AI Evaluation (unlimited)",
                  "Law Imitation Game",
                  "Progress Analytics",
                  "Email Support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register?plan=basic" className="btn-primary w-full justify-center inline-flex">
                Subscribe Now
              </Link>
            </div>
            
            {/* Premium */}
            <div className="card p-8">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-6">₹999<span className="text-lg font-normal text-slate-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Basic",
                  "High Court Prep",
                  "Mentor Sessions (4/month)",
                  "Engineer Modules",
                  "International Law",
                  "Certificate Prep",
                  "Priority Support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-legal-500 mr-3" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register?plan=premium" className="btn-secondary w-full justify-center inline-flex">
                Go Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-legal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-heading text-4xl font-bold mb-6">
            Ready to Transform Your Legal Career?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of law students and professionals already mastering their craft with LexWay AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors inline-flex items-center">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="#demo" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors inline-flex items-center">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-legal-500 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="font-heading text-xl font-bold">LexWay AI</span>
              </div>
              <p className="text-slate-400">
                Empowering the next generation of legal professionals with AI-powered education.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Curriculum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bar Council Prep</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Law Game</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentors</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 LexWay AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
