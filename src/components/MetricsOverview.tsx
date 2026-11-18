import React from 'react';
import { JobApplication, Interview } from '../types';
import { TrendingUp, Award, Clock, ArrowUpRight, Zap, Target } from 'lucide-react';

interface MetricsOverviewProps {
  applications: JobApplication[];
  interviews: Interview[];
  onSelectTab: (tab: 'applications' | 'pipeline' | 'interviews' | 'analytics') => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  applications,
  interviews,
  onSelectTab,
}) => {
  const totalApps = applications.length;
  const activeOffers = applications.filter((a) => a.status === 'Offer').length;
  const activeInterviews = applications.filter((a) => a.status === 'Interviewing').length;
  const screenings = applications.filter((a) => a.status === 'Screening').length;
  const appliedOnly = applications.filter((a) => a.status === 'Applied').length;
  const wishlists = applications.filter((a) => a.status === 'Wishlist').length;
  const rejected = applications.filter((a) => a.status === 'Rejected').length;

  const respondedCount = totalApps - appliedOnly - wishlists;
  const responseRate = totalApps > 0 ? Math.round((respondedCount / (totalApps - wishlists || 1)) * 100) : 0;
  const interviewRate = totalApps > 0 ? Math.round(((activeInterviews + activeOffers) / (totalApps || 1)) * 100) : 0;

  // Highest offer calculation
  const topOfferAmount = "$240,000";

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner / Hero Asset Card */}
      <section className="bg-[#14151A] border border-[#222] rounded-2xl p-8 flex flex-col justify-between h-64 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2">
              Top Offer Valuation & Pipeline Target
            </p>
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/40">
              <Zap className="w-3 h-3" /> Live Negotiation
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-light text-white tracking-tight mt-1">
            {topOfferAmount}
            <span className="text-xl lg:text-2xl text-gray-500 font-normal"> / yr</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded flex items-center gap-1 border border-emerald-800/30">
              <TrendingUp className="w-3 h-3" /> +18.4%
            </span>
            <span className="text-xs text-gray-500">above prior baseline compensation</span>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <span className="text-xs text-gray-400 font-mono">1 Formal Offer • 2 Final Loops</span>
          </div>
        </div>

        {/* Action button in hero */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#222]/80">
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <div>
              <span className="text-gray-600 block text-[10px] uppercase tracking-wider">Median Target</span>
              <span className="font-semibold text-white font-mono">$225,000</span>
            </div>
            <div>
              <span className="text-gray-600 block text-[10px] uppercase tracking-wider">Avg Response Time</span>
              <span className="font-semibold text-white font-mono">4.2 Days</span>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('pipeline')}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            View Pipeline Board <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient SVG curve in background matching Elegant Dark theme */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-25 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,100 C15,75 35,85 55,35 S80,15 100,45 L100,100 Z"
              fill="url(#gradientHero)"
            />
            <defs>
              <linearGradient id="gradientHero" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#0D0E12', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Grid of Secondary Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Stage Allocation Bar Chart */}
        <div className="bg-[#14151A] border border-[#222] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
                Pipeline Allocation
              </h3>
              <span className="text-[10px] font-mono text-gray-500">{totalApps} Total Submissions</span>
            </div>

            {/* Custom styled allocation bars matching theme */}
            <div className="flex items-end gap-3 h-28 pt-2 pb-1 border-b border-[#222]">
              <div 
                className="flex-1 bg-emerald-500 rounded-t-sm transition-all duration-500 hover:brightness-125 relative group"
                style={{ height: `${Math.max(15, (activeOffers / (totalApps || 1)) * 100)}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0A0A0C] border border-[#333] px-1.5 py-0.5 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  Offers: {activeOffers}
                </div>
              </div>
              <div 
                className="flex-1 bg-blue-600 rounded-t-sm transition-all duration-500 hover:brightness-125 relative group"
                style={{ height: `${Math.max(25, (activeInterviews / (totalApps || 1)) * 100)}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0A0A0C] border border-[#333] px-1.5 py-0.5 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  Interview: {activeInterviews}
                </div>
              </div>
              <div 
                className="flex-1 bg-purple-700 rounded-t-sm transition-all duration-500 hover:brightness-125 relative group"
                style={{ height: `${Math.max(20, (screenings / (totalApps || 1)) * 100)}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0A0A0C] border border-[#333] px-1.5 py-0.5 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  Screening: {screenings}
                </div>
              </div>
              <div 
                className="flex-1 bg-blue-950 border-t border-blue-600 rounded-t-sm transition-all duration-500 hover:brightness-125 relative group"
                style={{ height: `${Math.max(30, (appliedOnly / (totalApps || 1)) * 100)}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0A0A0C] border border-[#333] px-1.5 py-0.5 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  Applied: {appliedOnly}
                </div>
              </div>
              <div 
                className="flex-1 bg-gray-800 rounded-t-sm transition-all duration-500 hover:brightness-125 relative group"
                style={{ height: `${Math.max(15, (wishlists / (totalApps || 1)) * 100)}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0A0A0C] border border-[#333] px-1.5 py-0.5 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  Wishlist: {wishlists}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-left">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-tight">Active Loops</p>
              <p className="text-base font-semibold text-white font-mono">{activeInterviews + activeOffers}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-tight">Response Rate</p>
              <p className="text-base font-semibold text-emerald-400 font-mono">{responseRate}%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-tight">Interviews</p>
              <p className="text-base font-semibold text-blue-400 font-mono">{interviews.length}</p>
            </div>
          </div>
        </div>

        {/* Conversion & Funnel Score */}
        <div className="bg-[#14151A] border border-[#222] rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Interview Velocity
            </h3>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900/50">
              High Momentum
            </span>
          </div>

          {/* Half-gauge visualization matching design HTML */}
          <div className="flex items-center justify-center h-24 my-1">
            <div className="relative w-36 h-18 overflow-hidden">
              <div className="absolute w-36 h-36 border-[10px] border-gray-800 rounded-full top-0 left-0"></div>
              <div className="absolute w-36 h-36 border-[10px] border-blue-500 rounded-full border-b-transparent border-l-transparent -rotate-45 top-0 left-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-1">
                <span className="text-xl font-bold font-mono text-white">86%</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-1">
            <p className="text-xs font-semibold text-white">Screening-to-Onsite Conversion</p>
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">
              Score: 86/100 • 3 Upcoming Rounds Scheduled
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
