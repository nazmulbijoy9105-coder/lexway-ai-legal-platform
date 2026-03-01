"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Scale, 
  BookOpen, 
  Target, 
  Brain, 
  MessageSquare,
  BarChart3,
  Award,
  Clock,
  ChevronRight,
  Flame,
  TrendingUp,
  Zap,
  BookMarked,
  FileText,
  Play,
  Bell,
  Search,
  LogOut,
  User,
  Settings
} from "lucide-react";

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch user data
    fetch("/api/auth/status")
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          // Demo mode - show sample data
          setUser({
            firstName: "Alex",
            lastName: "Student",
            role: "student",
            subscriptionTier: "basic"
          });
        }
      })
      .catch(() => {
        // Demo mode - show sample data
        setUser({
          firstName: "Alex",
          lastName: "Student",
          role: "student",
          subscriptionTier: "basic"
        });
      });
  }, []);

  const progressData = {
    totalProgress: 67,
    weeklyGoal: 80,
    streakDays: 12,
    totalStudyTime: 245, // minutes
    averageScore: 78,
    completedModules: 8,
    totalModules: 12,
  };

  const recentActivity = [
    { type: "submission", title: "Contract Law Essay", score: 85, time: "2 hours ago" },
    { type: "module", title: "Constitutional Law - Part III", progress: 100, time: "5 hours ago" },
    { type: "game", title: "Property Dispute Scenario", score: 72, time: "1 day ago" },
    { type: "module", title: "Criminal Law - Exceptions", progress: 60, time: "2 days ago" },
  ];

  const weakAreas = [
    { topic: "Evidence - Burden of Proof", accuracy: 45 },
    { topic: "CPC - Order XXXIX", accuracy: 52 },
    { topic: "Constitution - Fundamental Rights", accuracy: 58 },
  ];

  const upcomingSessions = [
    { mentor: "Adv. Priya Sharma", topic: "Mock Viva - Criminal Law", date: "Tomorrow, 3:00 PM" },
    { mentor: "Adv. Rahul Verma", topic: "Contract Drafting Review", date: "Fri, 5:00 PM" },
  ];

  const quickActions = [
    { icon: Brain, label: "Law Game", href: "/law-game", color: "legal" },
    { icon: FileText, label: "Practice Answer", href: "/practice", color: "primary" },
    { icon: BookMarked, label: "Review Topics", href: "/curriculum", color: "bar" },
    { icon: MessageSquare, label: "Find Mentor", href: "/mentors", color: "primary" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-legal-500 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="font-heading text-xl font-bold gradient-text">LexWay AI</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-1 ml-8">
                {[
                  { id: "overview", label: "Dashboard" },
                  { id: "curriculum", label: "Curriculum" },
                  { id: "practice", label: "Practice" },
                  { id: "law-game", label: "Law Game" },
                  { id: "mentors", label: "Mentors" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search topics, modules..."
                  className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
                />
              </div>
              
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-legal-500 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.firstName ? `${user.firstName[0]}${user.lastName?.[0] || 'S'}` : "AS"}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user?.firstName || "Alex"} {user?.lastName || "Student"}</div>
                  <div className="text-xs text-slate-500 capitalize">{user?.subscriptionTier || "Basic"} Plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.firstName || "Alex"}! 👋
          </h1>
          <p className="text-slate-600">Continue your legal learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Flame, label: "Streak Days", value: progressData.streakDays, color: "bar" },
            { icon: Clock, label: "Study Time", value: `${progressData.totalStudyTime}m`, color: "primary" },
            { icon: Target, label: "Avg Score", value: `${progressData.averageScore}%`, color: "legal" },
            { icon: Award, label: "Badges", value: "5", color: "primary" },
          ].map((stat, index) => (
            <div key={index} className="card p-4 flex items-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                stat.color === 'primary' ? 'bg-primary-100' :
                stat.color === 'legal' ? 'bg-legal-100' :
                'bg-bar-100'
              }`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'primary' ? 'text-primary-600' :
                  stat.color === 'legal' ? 'text-legal-600' :
                  'text-bar-600'
                }`} />
              </div>
              <div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Your Progress</h2>
                <Link href="/curriculum" className="text-primary-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Overall Completion</span>
                <span className="text-sm font-semibold">{progressData.totalProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-legal-500 h-3 rounded-full transition-all"
                  style={{ width: `${progressData.totalProgress}%` }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Modules", value: progressData.completedModules, total: progressData.totalModules },
                  { label: "Weekly Goal", value: progressData.weeklyGoal, total: 100, suffix: "%" },
                  { label: "This Week", value: "5.2h", total: null },
                ].map((item, index) => (
                  <div key={index} className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-lg font-bold">
                      {item.value}{item.suffix || ""}
                      {item.total && <span className="text-slate-400 text-sm">/{item.total}{item.suffix || ""}</span>}
                    </div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`p-4 rounded-xl text-center card-hover ${
                      action.color === 'primary' ? 'bg-primary-50' :
                      action.color === 'legal' ? 'bg-legal-50' :
                      'bg-bar-50'
                    }`}
                  >
                    <action.icon className={`w-6 h-6 mx-auto mb-2 ${
                      action.color === 'primary' ? 'text-primary-600' :
                      action.color === 'legal' ? 'text-legal-600' :
                      'text-bar-600'
                    }`} />
                    <span className="text-sm font-medium text-slate-700">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Activity</h2>
                <button className="text-primary-600 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        activity.type === 'submission' ? 'bg-primary-100' :
                        activity.type === 'module' ? 'bg-legal-100' :
                        'bg-bar-100'
                      }`}>
                        {activity.type === 'submission' ? <FileText className="w-5 h-5 text-primary-600" /> :
                         activity.type === 'module' ? <BookOpen className="w-5 h-5 text-legal-600" /> :
                         <Target className="w-5 h-5 text-bar-600" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{activity.title}</div>
                        <div className="text-xs text-slate-500">{activity.time}</div>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary-600">{activity.score}</div>
                        <div className="text-xs text-slate-500">Score</div>
                      </div>
                    )}
                    {activity.progress !== undefined && (
                      <div className="text-right">
                        <div className="text-sm font-bold text-legal-600">{activity.progress}%</div>
                        <div className="text-xs text-slate-500">Complete</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weak Areas */}
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 text-bar-500 mr-2" />
                Areas to Improve
              </h2>
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{area.topic}</span>
                      <span className="text-slate-500">{area.accuracy}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          area.accuracy < 50 ? 'bg-red-500' :
                          area.accuracy < 60 ? 'bg-bar-500' :
                          'bg-primary-500'
                        }`}
                        style={{ width: `${area.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary-600 font-medium hover:underline">
                Practice More →
              </button>
            </div>

            {/* Upcoming Sessions */}
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4">Upcoming Sessions</h2>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-xl">
                      <div className="font-medium text-sm">{session.topic}</div>
                      <div className="text-xs text-slate-500 mt-1">{session.mentor}</div>
                      <div className="text-xs text-primary-600 mt-1">{session.date}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No upcoming sessions</p>
              )}
              <Link href="/mentors" className="block w-full mt-4 text-center text-sm text-primary-600 font-medium hover:underline">
                Book a Session
              </Link>
            </div>

            {/* Leaderboard Preview */}
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-legal-500 mr-2" />
                Weekly Leaderboard
              </h2>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Priya S.", score: 2450, streak: 28 },
                  { rank: 2, name: "Rahul V.", score: 2320, streak: 21 },
                  { rank: 3, name: "You", score: 2180, streak: 12, isYou: true },
                  { rank: 4, name: "Ankit J.", score: 1950, streak: 8 },
                ].map((user, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                    user.isYou ? 'bg-primary-50 border border-primary-200' : ''
                  }`}>
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1 ? 'bg-bar-500 text-white' :
                        user.rank === 2 ? 'bg-slate-300 text-slate-700' :
                        user.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {user.rank}
                      </span>
                      <span className={`ml-2 text-sm ${user.isYou ? 'font-bold text-primary-700' : ''}`}>
                        {user.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{user.score}</div>
                      <div className="text-xs text-slate-500">{user.streak}🔥</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Card */}
            <div className="card p-6 bg-gradient-to-br from-primary-500 to-legal-500 text-white">
              <h2 className="text-lg font-bold mb-2">Upgrade to Premium</h2>
              <p className="text-sm text-primary-100 mb-4">
                Unlock High Court prep, unlimited AI evaluations, and mentor sessions.
              </p>
              <Link 
                href="/pricing" 
                className="block w-full bg-white text-primary-600 text-center py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
