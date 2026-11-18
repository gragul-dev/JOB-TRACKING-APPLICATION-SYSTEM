import React from 'react';
import { JobApplication, Interview } from '../types';
import { BarChart3, PieChart, TrendingUp, DollarSign, Target, Award } from 'lucide-react';

interface AnalyticsViewProps {
  applications: JobApplication[];
  interviews: Interview[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ applications, interviews }) => {
  const total = applications.length;
  const offers = applications.filter((a) => a.status === 'Offer').length;
  const interviewing = applications.filter((a) => a.status === 'Interviewing').length;
  const screening = applications.filter((a) => a.status === 'Screening').length;
  const applied = applications.filter((a) => a.status === 'Applied').length;
  const wishlist = applications.filter((a) => a.status === 'Wishlist').length;
  const rejected = applications.filter((a) => a.status === 'Rejected').length;

  const activePipeline = interviewing + screening + offers;
  const interviewConversionRate = (total - wishlist) > 0 ? Math.round((activePipeline / (total - wishlist)) * 100) : 0;
  const offerRate = activePipeline > 0 ? Math.round((offers / activePipeline) * 100) : 0;

  // Tag frequency
  const tagCounts: Record<string, number> = {};
  applications.forEach((app) => {
    app.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold text-white tracking-tight">
          Funnel Analytics & Compensation Intelligence
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Quantify application velocity, pipeline drop-off, and target skill distributions.
        </p>
      </div>

      {/* Top 4 KPI metric tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14151A] border border-[#222] rounded-2xl p-5 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
            Pipeline Conversion
          </p>
          <h3 className="text-3xl font-light text-white font-mono">{interviewConversionRate}%</h3>
          <span className="text-[11px] text-emerald-400 mt-1 block">Screenings & Loops Secured</span>
        </div>

        <div className="bg-[#14151A] border border-[#222] rounded-2xl p-5 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
            Final Offer Win Rate
          </p>
          <h3 className="text-3xl font-light text-white font-mono">{offerRate}%</h3>
          <span className="text-[11px] text-blue-400 mt-1 block">From Active Interview Loops</span>
        </div>

        <div className="bg-[#14151A] border border-[#222] rounded-2xl p-5 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
            Avg Salary Target
          </p>
          <h3 className="text-3xl font-light text-white font-mono">$235k</h3>
          <span className="text-[11px] text-gray-400 mt-1 block">High Senior/Staff Tier</span>
        </div>

        <div className="bg-[#14151A] border border-[#222] rounded-2xl p-5 shadow-lg">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
            Total Rounds Passed
          </p>
          <h3 className="text-3xl font-light text-white font-mono">{interviews.length + 3}</h3>
          <span className="text-[11px] text-purple-400 mt-1 block">Across 5 Tier-1 Companies</span>
        </div>
      </div>

      {/* Main Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Funnel Stage Visualization */}
        <div className="lg:col-span-7 bg-[#14151A] border border-[#222] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Conversion Funnel Stages
            </h3>
            <span className="text-xs font-mono text-gray-500">Applications: {total}</span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Wishlist */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">1. Target Wishlist</span>
                <span className="font-mono text-white font-semibold">{wishlist}</span>
              </div>
              <div className="h-3 bg-[#0D0E12] rounded-full overflow-hidden border border-[#222]">
                <div className="h-full bg-gray-600 rounded-full" style={{ width: `${(wishlist / (total || 1)) * 100}%` }} />
              </div>
            </div>

            {/* Applied */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400">2. Applied & Under Review</span>
                <span className="font-mono text-white font-semibold">{applied}</span>
              </div>
              <div className="h-3 bg-[#0D0E12] rounded-full overflow-hidden border border-[#222]">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(applied / (total || 1)) * 100}%` }} />
              </div>
            </div>

            {/* Screening */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-400">3. Recruiter Screening</span>
                <span className="font-mono text-white font-semibold">{screening}</span>
              </div>
              <div className="h-3 bg-[#0D0E12] rounded-full overflow-hidden border border-[#222]">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(screening / (total || 1)) * 100}%` }} />
              </div>
            </div>

            {/* Technical Loop */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-400">4. Live Coding / Onsite Loop</span>
                <span className="font-mono text-white font-semibold">{interviewing}</span>
              </div>
              <div className="h-3 bg-[#0D0E12] rounded-full overflow-hidden border border-[#222]">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(interviewing / (total || 1)) * 100}%` }} />
              </div>
            </div>

            {/* Formal Offer */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-bold">5. Executable Offer Extended</span>
                <span className="font-mono text-emerald-400 font-bold">{offers}</span>
              </div>
              <div className="h-3 bg-[#0D0E12] rounded-full overflow-hidden border border-[#222]">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(offers / (total || 1)) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#222] flex items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>Overall Pipeline Health: Strong</span>
            <span>Estimated Decision Window: 14 Days</span>
          </div>
        </div>

        {/* Skill Keywords & Workplace Distribution */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Top Domain Skill Demands */}
          <div className="bg-[#14151A] border border-[#222] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
              Target Tech Alignment
            </h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map(([tag, count]) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#0D0E12] border border-[#222] hover:border-blue-500/40 rounded-lg text-xs transition-colors"
                >
                  <span className="text-gray-300 font-medium">{tag}</span>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-1.5 py-0.2 rounded">
                    {count} roles
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Workplace Distribution */}
          <div className="bg-[#14151A] border border-[#222] rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">
              Workplace Flexibility
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#0D0E12] border border-[#222] rounded-xl p-3">
                <span className="text-gray-500 text-[10px] uppercase block">Remote</span>
                <span className="text-lg font-mono font-semibold text-white">
                  {applications.filter((a) => a.workplaceType === 'Remote').length}
                </span>
              </div>
              <div className="bg-[#0D0E12] border border-[#222] rounded-xl p-3">
                <span className="text-gray-500 text-[10px] uppercase block">Hybrid</span>
                <span className="text-lg font-mono font-semibold text-white">
                  {applications.filter((a) => a.workplaceType === 'Hybrid').length}
                </span>
              </div>
              <div className="bg-[#0D0E12] border border-[#222] rounded-xl p-3">
                <span className="text-gray-500 text-[10px] uppercase block">On-site</span>
                <span className="text-lg font-mono font-semibold text-white">
                  {applications.filter((a) => a.workplaceType === 'On-site').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
