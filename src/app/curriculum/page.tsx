"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  BookOpen, 
  ChevronRight, 
  Play, 
  CheckCircle,
  Clock,
  BarChart3,
  Lock,
  Search,
  Filter
} from "lucide-react";

export default function CurriculumPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const curriculumData = [
    // Year 1
    {
      year: 1,
      semester: 1,
      modules: [
        { code: "LLB-101", name: "Legal System & Methods", progress: 100, type: "llb", topics: 12 },
        { code: "LLB-102", name: "Contract Law I", progress: 100, type: "llb", topics: 15 },
        { code: "LLB-103", name: "Constitutional Law I", progress: 85, type: "llb", topics: 14 },
        { code: "LLB-104", name: "Jurisprudence I", progress: 70, type: "llb", topics: 10 },
      ]
    },
    {
      year: 1,
      semester: 2,
      modules: [
        { code: "LLB-105", name: "Legal English & Research", progress: 45, type: "llb", topics: 8 },
        { code: "LLB-106", name: "Contract Law II", progress: 30, type: "llb", topics: 12 },
        { code: "LLB-107", name: "Tort Law", progress: 15, type: "llb", topics: 10 },
        { code: "LLB-108", name: "Constitutional Law II", progress: 0, type: "llb", topics: 11 },
      ]
    },
    // Year 2
    {
      year: 2,
      semester: 3,
      modules: [
        { code: "LLB-201", name: "Criminal Law I", progress: 0, type: "llb", topics: 15 },
        { code: "LLB-202", name: "Property Law I", progress: 0, type: "llb", topics: 12 },
        { code: "LLB-203", name: "Public International Law", progress: 0, type: "llb", topics: 10 },
      ]
    },
    {
      year: 2,
      semester: 4,
      modules: [
        { code: "LLB-204", name: "Criminal Law II", progress: 0, type: "llb", topics: 14 },
        { code: "LLB-205", name: "Property Law II", progress: 0, type: "llb", topics: 11 },
        { code: "LLB-206", name: "Administrative Law", progress: 0, type: "llb", topics: 9 },
      ]
    },
  ];

  const barCouncilData = [
    {
      title: "Lower Court Preparation",
      description: "Complete preparation for Lower Court exams",
      modules: [
        { code: "BC-LC-01", name: "CPC - Complete", progress: 80, topics: 20 },
        { code: "BC-LC-02", name: "CrPC - Complete", progress: 65, topics: 18 },
        { code: "BC-LC-03", name: "Indian Penal Code", progress: 50, topics: 22 },
        { code: "BC-LC-04", name: "Evidence Act", progress: 40, topics: 16 },
        { code: "BC-LC-05", name: "Limitation Act", progress: 25, topics: 8 },
        { code: "BC-LC-06", name: "Specific Relief Act", progress: 10, topics: 10 },
        { code: "BC-LC-07", name: "Constitution Basics", progress: 90, topics: 15 },
        { code: "BC-LC-08", name: "Professional Ethics", progress: 60, topics: 6 },
      ]
    },
    {
      title: "High Court Preparation",
      description: "Advanced preparation for High Court exams (Premium)",
      premium: true,
      modules: [
        { code: "BC-HC-01", name: "Constitution - Advanced", progress: 0, topics: 18, locked: true },
        { code: "BC-HC-02", name: "Writ Jurisdiction", progress: 0, topics: 12, locked: true },
        { code: "BC-HC-03", name: "Judicial Review", progress: 0, topics: 10, locked: true },
        { code: "BC-HC-04", name: "Company Law", progress: 0, topics: 15, locked: true },
        { code: "BC-HC-05", name: "Arbitration Law", progress: 0, topics: 8, locked: true },
      ]
    },
  ];

  const allModules = [...curriculumData.flatMap(y => y.modules), ...barCouncilData.flatMap(b => b.modules)];

  const filteredModules = allModules.filter(m => 
    !searchQuery || 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTopics = filteredModules.reduce((sum, m) => sum + m.topics, 0);
  const completedTopics = filteredModules.filter(m => m.progress > 0).reduce((sum, m) => 
    sum + Math.round(m.topics * (m.progress / 100)), 0
  );

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
              <Link href="/curriculum" className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
                Curriculum
              </Link>
              <Link href="/law-game" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Curriculum</h1>
          <p className="text-slate-600">Master law through structured learning modules</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <div className="text-2xl font-bold text-primary-600">{completedTopics}</div>
            <div className="text-sm text-slate-500">Topics Completed</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-legal-600">{totalTopics - completedTopics}</div>
            <div className="text-sm text-slate-500">Topics Remaining</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-bar-600">8</div>
            <div className="text-sm text-slate-500">Modules in Progress</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-bold text-primary-600">12</div>
            <div className="text-sm text-slate-500">Total Modules</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex gap-2">
            {[
              { id: "llb", label: "LL.B" },
              { id: "bar", label: "Bar Council" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                  selectedType === type.id
                    ? "bg-primary-500 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-primary-300"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* LL.B Curriculum */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">LL.B Hons Program</h2>
          
          {curriculumData.map((semester, semIndex) => (
            <div key={semIndex} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Year {semester.year} - Semester {semester.semester}
                </h3>
                <span className="text-sm text-slate-500">
                  {semester.modules.filter(m => m.progress === 100).length}/{semester.modules.length} Completed
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {semester.modules.map((module, modIndex) => (
                  <Link
                    key={modIndex}
                    href={`/curriculum/${module.code}`}
                    className="card p-5 card-hover"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {module.code}
                      </span>
                      {module.progress === 100 && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-slate-900 mb-3 line-clamp-2">
                      {module.name}
                    </h4>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{module.topics} topics</span>
                      <span className="text-primary-600 font-medium">{module.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          module.progress === 100 ? 'bg-green-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Bar Council */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Bar Council Preparation</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {barCouncilData.map((bc, index) => (
              <div key={index} className={`card overflow-hidden ${bc.premium ? 'border-2 border-bar-300' : ''}`}>
                <div className={`p-6 ${bc.premium ? 'bg-gradient-to-r from-bar-500 to-bar-600 text-white' : 'bg-primary-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{bc.title}</h3>
                      <p className={`text-sm ${bc.premium ? 'text-bar-100' : 'text-slate-600'}`}>
                        {bc.description}
                      </p>
                    </div>
                    {bc.premium && (
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {bc.modules.map((module, modIndex) => (
                      <div
                        key={modIndex}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          (module as any).locked ? 'bg-slate-50 opacity-60' : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center">
                          {(module as any).locked ? (
                            <Lock className="w-5 h-5 text-slate-400 mr-3" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-primary-500 mr-3" />
                          )}
                          <div>
                            <div className="font-medium text-sm">{module.name}</div>
                            <div className="text-xs text-slate-500">{module.topics} topics</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            (module as any).locked ? 'text-slate-400' : 'text-primary-600'
                          }`}>
                            {module.progress}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
