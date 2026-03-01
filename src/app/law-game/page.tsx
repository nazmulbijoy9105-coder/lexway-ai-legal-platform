"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  Gavel, 
  Target, 
  Users,
  Play,
  Clock,
  Award,
  ChevronRight,
  FileText,
  MessageSquare,
  Star,
  Zap,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

export default function LawGamePage() {
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [gamePhase, setGamePhase] = useState<"lobby" | "scenario" | "draft" | "cross_question" | "result">("lobby");

  const scenarios = [
    {
      id: 1,
      title: "Property Dispute - Adverse Possession",
      type: "civil",
      difficulty: "intermediate",
      timeLimit: 15,
      players: 2,
      description: "A tenant claims ownership through 12 years of continuous possession",
      issues: ["Adverse Possession", "Hostile Intent", "Continuous Possession"],
      completed: true,
      bestScore: 85,
    },
    {
      id: 2,
      title: "Criminal Bail Application",
      type: "criminal",
      difficulty: "advanced",
      timeLimit: 20,
      players: 2,
      description: "Application for anticipatory bail under Section 438 CrPC",
      issues: ["Anticipatory Bail", "Arrest Fear", "Section 438 CrPC"],
      completed: true,
      bestScore: 78,
    },
    {
      id: 3,
      title: "Constitutional Challenge - Fundamental Rights",
      type: "constitutional",
      difficulty: "expert",
      timeLimit: 25,
      players: 2,
      description: "Challenge to state law violating freedom of speech",
      issues: ["Article 19", "Reasonable Restriction", "Judicial Review"],
      completed: false,
    },
    {
      id: 4,
      title: "Tech Contract - IP Dispute",
      type: "tech_contract",
      difficulty: "intermediate",
      timeLimit: 18,
      players: 2,
      description: "Dispute over software licensing and IP ownership",
      issues: ["Copyright", "License Agreement", "Assignment"],
      completed: false,
    },
    {
      id: 5,
      title: "Corporate Fraud - Oppression & Mismanagement",
      type: "corporate",
      difficulty: "advanced",
      timeLimit: 22,
      players: 2,
      description: "Minority shareholders petition against oppression",
      issues: ["Section 241-242 Companies Act", "Oppression", "Mismanagement"],
      completed: false,
    },
    {
      id: 6,
      title: "Cyber Crime - Data Breach Liability",
      type: "cyber",
      difficulty: "expert",
      timeLimit: 20,
      players: 2,
      description: "Company faces liability for massive data breach",
      issues: ["IT Act Section 43A", "Privacy", "Compensation"],
      completed: false,
    },
  ];

  const typeColors: Record<string, string> = {
    civil: "bg-blue-100 text-blue-700",
    criminal: "bg-red-100 text-red-700",
    constitutional: "bg-purple-100 text-purple-700",
    tech_contract: "bg-cyan-100 text-cyan-700",
    corporate: "bg-amber-100 text-amber-700",
    cyber: "bg-green-100 text-green-700",
  };

  const difficultyColors: Record<string, string> = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-orange-500",
    expert: "bg-red-500",
  };

  const handleStartScenario = (scenario: any) => {
    setSelectedScenario(scenario);
    setGamePhase("scenario");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-legal-500 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-xl font-bold gradient-text">LexWay AI</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/curriculum" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
                Curriculum
              </Link>
              <Link href="/law-game" className="px-4 py-2 bg-legal-50 text-legal-700 rounded-lg text-sm font-medium">
                Law Game
              </Link>
              <Link href="/mentors" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
                Mentors
              </Link>
            </nav>
            
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-legal-500 rounded-full flex items-center justify-center text-white font-medium">
              AS
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
                <Gavel className="w-8 h-8 mr-3 text-legal-600" />
                Law Imitation Game
              </h1>
              <p className="text-slate-600">Practice litigation skills with AI judges and opponents</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-legal-600">12</div>
              <div className="text-sm text-slate-500">Scenarios Played</div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 flex items-center">
            <div className="w-12 h-12 bg-legal-100 rounded-xl flex items-center justify-center mr-4">
              <Target className="w-6 h-6 text-legal-600" />
            </div>
            <div>
              <div className="text-xl font-bold">78%</div>
              <div className="text-sm text-slate-500">Avg Score</div>
            </div>
          </div>
          <div className="card p-4 flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-xl font-bold">2.5h</div>
              <div className="text-sm text-slate-500">Total Time</div>
            </div>
          </div>
          <div className="card p-4 flex items-center">
            <div className="w-12 h-12 bg-bar-100 rounded-xl flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-bar-600" />
            </div>
            <div>
              <div className="text-xl font-bold">3</div>
              <div className="text-sm text-slate-500">Badges Earned</div>
            </div>
          </div>
          <div className="card p-4 flex items-center">
            <div className="w-12 h-12 bg-legal-100 rounded-xl flex items-center justify-center mr-4">
              <Zap className="w-6 h-6 text-legal-600" />
            </div>
            <div>
              <div className="text-xl font-bold">5</div>
              <div className="text-sm text-slate-500">In Progress</div>
            </div>
          </div>
        </div>

        {/* Scenario Types */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Scenario</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { type: "civil", label: "Civil Disputes", icon: "⚖️" },
              { type: "criminal", label: "Criminal Cases", icon: "👮" },
              { type: "constitutional", label: "Constitutional", icon: "🏛️" },
              { type: "tech_contract", label: "Tech & IP", icon: "💻" },
              { type: "corporate", label: "Corporate", icon: "🏢" },
              { type: "cyber", label: "Cyber Law", icon: "🔒" },
            ].map((cat) => (
              <button
                key={cat.type}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:border-legal-300 hover:bg-legal-50 transition-colors"
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="card overflow-hidden card-hover">
              <div className="h-2 bg-gradient-to-r from-legal-500 to-primary-500" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[scenario.type]}`}>
                    {scenario.type.replace("_", " ").toUpperCase()}
                  </span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${difficultyColors[scenario.difficulty]} mr-2`} />
                    <span className="text-xs text-slate-500 capitalize">{scenario.difficulty}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-900 mb-2">{scenario.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{scenario.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {scenario.issues.map((issue: string, i: number) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {issue}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {scenario.timeLimit} min
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {scenario.players} players
                  </div>
                  {scenario.completed && (
                    <div className="flex items-center text-green-600">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {scenario.bestScore}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleStartScenario(scenario)}
                  className="w-full py-2.5 bg-gradient-to-r from-legal-500 to-primary-500 text-white rounded-xl font-medium flex items-center justify-center hover:shadow-lg hover:shadow-legal-500/25 transition-all"
                >
                  {scenario.completed ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Replay Scenario
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Scenario
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Choose Scenario", desc: "Select from civil, criminal, or corporate cases", icon: Target },
              { step: 2, title: "Analyze Facts", desc: "Review the case facts and identify legal issues", icon: FileText },
              { step: 3, title: "Present Argument", desc: "Draft your arguments using IRAC method", icon: MessageSquare },
              { step: 4, title: "Get AI Feedback", desc: "Receive scores and improvement suggestions", icon: Award },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-legal-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-legal-600 mb-1">STEP {item.step}</div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
