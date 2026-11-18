import React from 'react';
import { ActivityLog, Interview } from '../types';
import { Clock, Calendar, ArrowRight, ShieldCheck, FileDown, Sparkles } from 'lucide-react';

interface ActivitySidebarProps {
  activities: ActivityLog[];
  interviews: Interview[];
  onSelectTab: (tab: 'applications' | 'pipeline' | 'interviews' | 'analytics') => void;
  onExportJSON: () => void;
}

export const ActivitySidebar: React.FC<ActivitySidebarProps> = ({
  activities,
  interviews,
  onSelectTab,
  onExportJSON,
}) => {
  const upcomingInterview = interviews.find((i) => i.status === 'Upcoming');

  return (
    <aside className="bg-[#14151A] border border-[#222] rounded-2xl p-6 flex flex-col justify-between shadow-2xl h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
            Recent Pipeline Activity
          </h3>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
        </div>

        {/* Activity feed list */}
        <div className="flex flex-col gap-5">
          {activities.slice(0, 4).map((act) => (
            <div key={act.id} className="flex justify-between items-start border-b border-[#222] pb-4 group">
              <div className="pr-3">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {act.title}
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                  {act.description}
                </p>
              </div>
              <span className="text-[10px] font-mono text-gray-500 shrink-0 pt-0.5">
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>

        {/* Next Scheduled Interview Widget */}
        {upcomingInterview && (
          <div className="mt-6 bg-[#0D0E12] border border-blue-900/40 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Upcoming Milestone
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-900/50">
                Confirmed
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">{upcomingInterview.company}</p>
              <p className="text-xs text-gray-400">{upcomingInterview.round}</p>
            </div>

            <div className="text-[11px] font-mono text-gray-300 flex items-center gap-2 pt-1 border-t border-[#1A1C23]">
              <span>{upcomingInterview.date}</span>
              <span className="text-gray-600">•</span>
              <span className="text-blue-400">{upcomingInterview.time}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls matching design HTML */}
      <div className="mt-6 flex flex-col gap-2 pt-2">
        <button
          onClick={() => onSelectTab('applications')}
          className="w-full py-3 bg-[#1A1C23] border border-[#333] hover:bg-[#222] hover:border-[#444] text-xs font-bold uppercase tracking-widest text-white transition-colors rounded-lg cursor-pointer flex items-center justify-center gap-2"
        >
          View Full Applications <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onExportJSON}
          className="w-full py-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileDown className="w-3 h-3" /> Export Pipeline Backup
        </button>
      </div>
    </aside>
  );
};
