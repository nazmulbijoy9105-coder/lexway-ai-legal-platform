"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  Search, 
  Star, 
  Clock, 
  Briefcase,
  GraduationCap,
  Calendar,
  MessageSquare,
  CheckCircle,
  Filter,
  Users,
  Award
} from "lucide-react";

export default function MentorsPage() {
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const mentors = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      title: "Senior Advocate, Supreme Court",
      image: "PS",
      expertise: ["Constitutional Law", "Writ Jurisdiction", "Human Rights", "Fundamental Rights"],
      rating: 4.9,
      reviews: 127,
      sessions: 520,
      hourlyRate: 2500,
      availability: ["Mon", "Wed", "Fri"],
      bio: "Over 18 years of experience in constitutional litigation. Former Additional Solicitor General. Specializes in writ petitions and human rights cases.",
      verified: true,
    },
    {
      id: 2,
      name: "Adv. Rahul Verma",
      title: "Advocate, Delhi High Court",
      image: "RV",
      expertise: ["Corporate Law", "Contracts", "Arbitration", "Mergers & Acquisitions"],
      rating: 4.8,
      reviews: 98,
      sessions: 380,
      hourlyRate: 2000,
      availability: ["Tue", "Thu", "Sat"],
      bio: "Corporate law expert with 12 years of experience. Has handled major M&A deals and commercial arbitrations worth crores.",
      verified: true,
    },
    {
      id: 3,
      name: "Adv. Anjali Patel",
      title: "Advocate, Bombay High Court",
      image: "AP",
      expertise: ["Criminal Law", "CPC", "Evidence", "White Collar Crimes"],
      rating: 4.9,
      reviews: 156,
      sessions: 450,
      hourlyRate: 2200,
      availability: ["Mon", "Tue", "Wed", "Thu"],
      bio: "Specialized criminal lawyer with expertise in bail applications, criminal trials, and white-collar crime. Former public prosecutor.",
      verified: true,
    },
    {
      id: 4,
      name: "Prof. Sanjay Mishra",
      title: "Professor of Law, NLU",
      image: "SM",
      expertise: ["Jurisprudence", "Constitutional Law", "Legal Methods", "Research"],
      rating: 4.7,
      reviews: 89,
      sessions: 290,
      hourlyRate: 1800,
      availability: ["Mon", "Tue", "Wed"],
      bio: "Renowned academician with 20 years of teaching experience. Published researcher in constitutional law and jurisprudence.",
      verified: true,
    },
    {
      id: 5,
      name: "Adv. Nikhil Reddy",
      title: "Senior Associate, AZB & Partners",
      image: "NR",
      expertise: ["Intellectual Property", "Tech Law", "Data Privacy", "Cyber Law"],
      rating: 4.8,
      reviews: 67,
      sessions: 210,
      hourlyRate: 2800,
      availability: ["Wed", "Thu", "Fri"],
      bio: "Tech law specialist focusing on IP protection, data privacy compliance, and cybersecurity. Works with major tech companies.",
      verified: true,
    },
    {
      id: 6,
      name: "Adv. Meera Krishnan",
      title: "Advocate, Madras High Court",
      image: "MK",
      expertise: ["Family Law", "Property Law", "Succession", "ADR"],
      rating: 4.9,
      reviews: 203,
      sessions: 680,
      hourlyRate: 1500,
      availability: ["Mon", "Wed", "Thu", "Fri", "Sat"],
      bio: "Compassionate family law practitioner. Mediator and arbitrator certified by the Madras High Court. Specialized in divorce, custody, and property disputes.",
      verified: true,
    },
  ];

  const expertiseAreas = [
    "Constitutional Law",
    "Criminal Law",
    "Corporate Law",
    "Family Law",
    "Intellectual Property",
    "Tech Law",
    "Property Law",
    "Arbitration",
    "Tax Law",
    "Labor Law",
  ];

  const filteredMentors = mentors.filter(m => {
    const matchesSearch = !searchQuery || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExpertise = !selectedExpertise || m.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

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
              <Link href="/law-game" className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">
                Law Game
              </Link>
              <Link href="/mentors" className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
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
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Expert Mentors</h1>
          <p className="text-slate-600">Connect with experienced advocates for personalized guidance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">50+</div>
            <div className="text-sm text-slate-500">Expert Mentors</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-legal-600">5000+</div>
            <div className="text-sm text-slate-500">Sessions Completed</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-bar-600">4.8</div>
            <div className="text-sm text-slate-500">Average Rating</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {expertiseAreas.slice(0, 6).map((area) => (
              <button
                key={area}
                onClick={() => setSelectedExpertise(selectedExpertise === area ? null : area)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedExpertise === area
                    ? "bg-primary-500 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-primary-300"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="card overflow-hidden card-hover">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-legal-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {mentor.image}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h3 className="font-bold text-slate-900">{mentor.name}</h3>
                      {mentor.verified && (
                        <CheckCircle className="w-4 h-4 text-primary-500 ml-1" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{mentor.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-bar-500 fill-current" />
                      <span className="text-sm font-medium ml-1">{mentor.rating}</span>
                      <span className="text-sm text-slate-400 ml-1">({mentor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{mentor.bio}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.slice(0, 3).map((exp, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                      {exp}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                      +{mentor.expertise.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {mentor.sessions} sessions
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {mentor.availability.join(", ")}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-lg font-bold text-slate-900">₹{mentor.hourlyRate}</span>
                    <span className="text-sm text-slate-500">/hour</span>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 card p-8 bg-gradient-to-r from-primary-600 to-legal-600 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Become a Mentor</h2>
              <p className="text-primary-100">Share your expertise and earn by coaching the next generation of lawyers</p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
