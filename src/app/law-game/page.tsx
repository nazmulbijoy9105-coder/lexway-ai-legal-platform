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
  FileText,
  MessageSquare,
  Star,
  Zap,
  ArrowLeft,
  CheckCircle,
  Send,
  RefreshCw
} from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  type: string;
  difficulty: string;
  timeLimit: number;
  players: number;
  description: string;
  facts: string;
  issues: string[];
  completed: boolean;
  bestScore?: number;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Property Dispute - Adverse Possession",
    type: "civil",
    difficulty: "intermediate",
    timeLimit: 15,
    players: 2,
    description: "A tenant claims ownership through 12 years of continuous possession",
    facts: "Mr. Sharma has been living in a property owned by Mr. Gupta for the past 15 years. He paid rent regularly for the first 10 years but stopped paying rent for the last 5 years. Mr. Sharma claims he has acquired ownership through adverse possession. Mr. Gupta wants to evict him and recover the property.",
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
    facts: "The applicant, a chartered accountant, has been accused of embezzling funds from his client company. The police have registered an FIR and are likely to arrest the applicant. The applicant claims he is innocent and will cooperate with the investigation. He fears arrest and seeks anticipatory bail.",
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
    facts: "A state government enacted a law requiring all social media platforms to register with the state and comply with content removal orders within 24 hours. A journalist challenges this law as violating the fundamental right to freedom of speech under Article 19(1)(a) of the Constitution.",
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
    facts: "A software developer was hired to create a custom application for a startup. After completion, the startup claims ownership of the code and refuses to pay the remaining balance. The developer claims the code was created using his own libraries and tools, and he only licensed the application, not transferred ownership.",
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
    facts: "A group of minority shareholders of a private limited company have filed a petition under Section 241-242 of the Companies Act, alleging that the majority directors have been oppressing them and mismanaging the company. They claim decisions are being made without proper board meetings and funds are being diverted.",
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
    facts: "A popular e-commerce platform suffered a massive data breach exposing personal and financial information of millions of users. The affected users have filed a class action lawsuit seeking compensation. The company claims they had adequate security measures and the breach was caused by sophisticated hackers.",
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

export default function LawGamePage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [gamePhase, setGamePhase] = useState<"lobby" | "scenario" | "draft" | "result">("lobby");
  const [userArgument, setUserArgument] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState<{total: number; irac: number; clarity: number; precedent: number} | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStartScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setGamePhase("scenario");
    setTimeLeft(scenario.timeLimit * 60);
    setUserArgument("");
    setScore(null);
    setShowFeedback(false);
  };

  const handleBackToLobby = () => {
    setSelectedScenario(null);
    setGamePhase("lobby");
    setUserArgument("");
    setScore(null);
  };

  const handleStartDraft = () => {
    setGamePhase("draft");
  };

  const handleSubmitArgument = async () => {
    if (!userArgument.trim() || !selectedScenario) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate AI evaluation (in production, this would call /api/ai-eval)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate a mock score based on argument length and content
      const wordCount = userArgument.split(/\s+/).length;
      const hasIRAC = /issue|rule|application|conclusion/i.test(userArgument);
      const hasPrecedent = /section|article|act|precedent|case/i.test(userArgument);
      
      const iracScore = hasIRAC ? Math.min(40, wordCount / 5) : 15;
      const clarityScore = Math.min(30, wordCount / 8);
      const precedentScore = hasPrecedent ? 25 : 10;
      const totalScore = Math.round(iracScore + clarityScore + precedentScore);
      
      setScore({
        total: totalScore,
        irac: Math.round(iracScore),
        clarity: Math.round(clarityScore),
        precedent: Math.round(precedentScore)
      });
      setGamePhase("result");
    } catch (error) {
      console.error("Error submitting argument:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    if (selectedScenario) {
      handleStartScenario(selectedScenario);
    }
  };

  // Lobby Phase - Scenario Selection
  if (gamePhase === "lobby") {
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
            <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center shadow-sm">
              <div className="w-12 h-12 bg-legal-100 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-legal-600" />
              </div>
              <div>
                <div className="text-xl font-bold">78%</div>
                <div className="text-sm text-slate-500">Avg Score</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-xl font-bold">2.5h</div>
                <div className="text-sm text-slate-500">Total Time</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center shadow-sm">
              <div className="w-12 h-12 bg-bar-100 rounded-xl flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-bar-600" />
              </div>
              <div>
                <div className="text-xl font-bold">3</div>
                <div className="text-sm text-slate-500">Badges Earned</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center shadow-sm">
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
              <div key={scenario.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
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

  // Scenario Details Phase
  if (gamePhase === "scenario" && selectedScenario) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={handleBackToLobby} className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Lobby</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-slate-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">{selectedScenario.timeLimit} minutes</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Scenario Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="h-2 bg-gradient-to-r from-legal-500 to-primary-500" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[selectedScenario.type]}`}>
                  {selectedScenario.type.replace("_", " ").toUpperCase()}
                </span>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${difficultyColors[selectedScenario.difficulty]} mr-2`} />
                  <span className="text-sm text-slate-500 capitalize">{selectedScenario.difficulty}</span>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900 mb-4">{selectedScenario.title}</h1>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-legal-600" />
                  Case Facts
                </h2>
                <div className="bg-slate-50 rounded-xl p-4 text-slate-700 leading-relaxed">
                  {selectedScenario.facts}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-legal-600" />
                  Key Issues to Address
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedScenario.issues.map((issue, i) => (
                    <span key={i} className="px-3 py-1.5 bg-legal-50 text-legal-700 rounded-lg text-sm font-medium">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Tip: Use the IRAC Method</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800">
                  <div><strong>I</strong>ssue - Identify the legal issue</div>
                  <div><strong>R</strong>ule - State the applicable law</div>
                  <div><strong>A</strong>pply - Apply the law to facts</div>
                  <div><strong>C</strong>onclusion - Reach your conclusion</div>
                </div>
              </div>
              
              <button
                onClick={handleStartDraft}
                className="w-full py-4 bg-gradient-to-r from-legal-500 to-primary-500 text-white rounded-xl font-semibold flex items-center justify-center hover:shadow-lg hover:shadow-legal-500/25 transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Writing Argument
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Draft Phase
  if (gamePhase === "draft" && selectedScenario) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={handleBackToLobby} className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Exit</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-legal-50 text-legal-700 rounded-lg font-medium">
                  Draft Your Argument
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-legal-500 to-primary-500" />
            <div className="p-6">
              <h1 className="text-xl font-bold text-slate-900 mb-2">{selectedScenario.title}</h1>
              <p className="text-slate-600 mb-6">Present your legal argument using the IRAC method</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Argument
                </label>
                <textarea
                  value={userArgument}
                  onChange={(e) => setUserArgument(e.target.value)}
                  placeholder="State your argument using IRAC format:

ISSUE: What is the legal question?

RULE: What law applies? (cite sections, articles, precedents)

APPLICATION: How does the law apply to these facts?

CONCLUSION: What is the outcome?"
                  className="w-full h-96 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-legal-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                <span>Word count: {userArgument.split(/\s+/).filter(Boolean).length}</span>
                <span>Minimum 50 words recommended</span>
              </div>
              
              <button
                onClick={handleSubmitArgument}
                disabled={isSubmitting || userArgument.split(/\s+/).filter(Boolean).length < 20}
                className="w-full py-4 bg-gradient-to-r from-legal-500 to-primary-500 text-white rounded-xl font-semibold flex items-center justify-center hover:shadow-lg hover:shadow-legal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Evaluating Your Argument...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit for AI Evaluation
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Result Phase
  if (gamePhase === "result" && selectedScenario && score) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={handleBackToLobby} className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Lobby</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Score Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="h-2 bg-gradient-to-r from-legal-500 to-primary-500" />
            <div className="p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-legal-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Evaluation Complete!</h1>
              <p className="text-slate-600 mb-6">{selectedScenario.title}</p>
              
              <div className="text-6xl font-bold gradient-text mb-8">{score.total}%</div>
              
              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-legal-600 mb-1">{score.irac}/40</div>
                  <div className="text-sm text-slate-500">IRAC Structure</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{score.clarity}/30</div>
                  <div className="text-sm text-slate-500">Clarity</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-bar-600 mb-1">{score.precedent}/30</div>
                  <div className="text-sm text-slate-500">Precedent</div>
                </div>
              </div>
              
              {/* Feedback */}
              <div className="bg-slate-50 rounded-xl p-6 text-left mb-8">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  AI Feedback
                </h3>
                <div className="space-y-3 text-slate-700">
                  {score.irac >= 30 ? (
                    <p className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />Excellent use of IRAC methodology. Your legal issue identification was precise.</p>
                  ) : (
                    <p className="flex items-start"><Zap className="w-5 h-5 text-bar-500 mr-2 mt-0.5" />Try to clearly structure your argument using IRAC: Issue, Rule, Application, Conclusion.</p>
                  )}
                  
                  {score.clarity >= 20 ? (
                    <p className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />Your argument is clear and well-articulated.</p>
                  ) : (
                    <p className="flex items-start"><Zap className="w-5 h-5 text-bar-500 mr-2 mt-0.5" />Try to be more concise and direct in your arguments.</p>
                  )}
                  
                  {score.precedent >= 20 ? (
                    <p className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />Good引用 of legal provisions and precedents.</p>
                  ) : (
                    <p className="flex items-start"><Zap className="w-5 h-5 text-bar-500 mr-2 mt-0.5" />引用 relevant sections, articles, or case laws to strengthen your argument.</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handlePlayAgain}
                  className="flex-1 py-4 bg-gradient-to-r from-legal-500 to-primary-500 text-white rounded-xl font-semibold flex items-center justify-center hover:shadow-lg hover:shadow-legal-500/25 transition-all"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={handleBackToLobby}
                  className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold flex items-center justify-center hover:border-legal-300 transition-all"
                >
                  Choose Another Scenario
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
