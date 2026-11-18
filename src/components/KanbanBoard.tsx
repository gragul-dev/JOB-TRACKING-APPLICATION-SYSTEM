import React from 'react';
import { JobApplication, ApplicationStatus } from '../types';
import { Plus, ArrowRight, ArrowLeft, ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface KanbanBoardProps {
  applications: JobApplication[];
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onEditApplication: (app: JobApplication) => void;
  onOpenNewModal: () => void;
}

const STAGES: { key: ApplicationStatus; label: string; color: string; border: string }[] = [
  { key: 'Wishlist', label: 'Wishlist', color: 'text-gray-400', border: 'border-gray-800' },
  { key: 'Applied', label: 'Applied', color: 'text-amber-400', border: 'border-amber-900/40' },
  { key: 'Screening', label: 'Screening', color: 'text-purple-400', border: 'border-purple-900/40' },
  { key: 'Interviewing', label: 'Interviewing', color: 'text-blue-400', border: 'border-blue-900/40' },
  { key: 'Offer', label: 'Offers', color: 'text-emerald-400', border: 'border-emerald-900/40' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  applications,
  onUpdateStatus,
  onEditApplication,
  onOpenNewModal,
}) => {
  const getNextStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    const order: ApplicationStatus[] = ['Wishlist', 'Applied', 'Screening', 'Interviewing', 'Offer'];
    const idx = order.indexOf(current);
    if (idx !== -1 && idx < order.length - 1) return order[idx + 1];
    return null;
  };

  const getPrevStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    const order: ApplicationStatus[] = ['Wishlist', 'Applied', 'Screening', 'Interviewing', 'Offer'];
    const idx = order.indexOf(current);
    if (idx > 0) return order[idx - 1];
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight">
            Pipeline Stage Kanban
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Advance candidates across interview hurdles toward offer acceptance.
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1C23] border border-[#333] hover:bg-[#222] text-xs font-bold uppercase tracking-widest text-white rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add to Pipeline
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STAGES.map((stage) => {
          const stageApps = applications.filter((a) => a.status === stage.key);

          return (
            <div
              key={stage.key}
              className="bg-[#14151A] border border-[#222] rounded-2xl p-4 flex flex-col min-h-[520px] shadow-xl"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-widest ${stage.color}`}>
                    {stage.label}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-gray-400 bg-[#0D0E12] border border-[#222] px-2 py-0.5 rounded">
                  {stageApps.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                {stageApps.map((app) => {
                  const nextSt = getNextStatus(app.status);
                  const prevSt = getPrevStatus(app.status);

                  return (
                    <div
                      key={app.id}
                      onClick={() => onEditApplication(app)}
                      className="bg-[#0D0E12] border border-[#222] hover:border-[#3b82f6]/50 rounded-xl p-4 flex flex-col gap-2.5 transition-all shadow-md group cursor-pointer"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {app.company}
                            </h4>
                            {app.jobUrl && (
                              <a
                                href={app.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-600 hover:text-gray-300"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{app.role}</p>
                        </div>

                        {app.priority === 'High' && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-900/40 px-1.5 py-0.5 rounded">
                            P1
                          </span>
                        )}
                      </div>

                      {/* Salary & Location */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1">
                        <span>{app.salary || '$—'}</span>
                        <span className="text-gray-500 text-[10px]">{app.workplaceType}</span>
                      </div>

                      {/* Next milestone if any */}
                      {app.nextAction && (
                        <div className="bg-[#14151A] border border-[#222] rounded p-2 text-[10px] text-gray-300">
                          <span className="text-gray-500 block text-[9px] uppercase font-semibold">
                            Next Target:
                          </span>
                          <span className="line-clamp-1 font-medium">{app.nextAction}</span>
                        </div>
                      )}

                      {/* Move Stage Controls */}
                      <div
                        className="flex items-center justify-between pt-2 border-t border-[#1A1C23] mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {prevSt ? (
                          <button
                            onClick={() => onUpdateStatus(app.id, prevSt)}
                            title={`Move back to ${prevSt}`}
                            className="p-1 text-gray-500 hover:text-white hover:bg-[#1A1C23] rounded transition-colors text-[10px] flex items-center gap-0.5"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        ) : (
                          <span />
                        )}

                        <span className="text-[10px] text-gray-600 font-mono">
                          {app.appliedDate.slice(5)}
                        </span>

                        {nextSt ? (
                          <button
                            onClick={() => onUpdateStatus(app.id, nextSt)}
                            title={`Advance to ${nextSt}`}
                            className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-950/50 rounded transition-colors text-[10px] flex items-center gap-0.5 font-bold"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Won
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {stageApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#222] rounded-xl text-gray-600 text-xs">
                    No active cards
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
