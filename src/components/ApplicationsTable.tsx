import React, { useState } from 'react';
import { JobApplication, ApplicationStatus } from '../types';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Filter,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface ApplicationsTableProps {
  applications: JobApplication[];
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onDeleteApplication: (id: string) => void;
  onEditApplication: (app: JobApplication) => void;
  onOpenNewModal: () => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onUpdateStatus,
  onDeleteApplication,
  onEditApplication,
  onOpenNewModal,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApps = applications.filter((app) => {
    if (statusFilter === 'ALL') return true;
    return app.status === statusFilter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Offer':
        return 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50';
      case 'Interviewing':
        return 'bg-blue-950/80 text-blue-400 border border-blue-800/50';
      case 'Screening':
        return 'bg-purple-950/80 text-purple-400 border border-purple-800/50';
      case 'Applied':
        return 'bg-amber-950/80 text-amber-400 border border-amber-800/50';
      case 'Wishlist':
        return 'bg-gray-800/80 text-gray-300 border border-gray-700';
      case 'Rejected':
        return 'bg-rose-950/80 text-rose-400 border border-rose-800/50';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  const statusOptions: ApplicationStatus[] = [
    'Wishlist',
    'Applied',
    'Screening',
    'Interviewing',
    'Offer',
    'Rejected',
  ];

  return (
    <div className="bg-[#14151A] border border-[#222] rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222] pb-5">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            Active Job Opportunities
            <span className="text-xs font-mono font-normal text-gray-500 bg-[#0D0E12] border border-[#222] px-2 py-0.5 rounded">
              {filteredApps.length}
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor target companies, interview rounds, and offer negotiation status.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 bg-[#0D0E12] border border-[#222] rounded-lg px-3 py-1.5 text-xs text-gray-400">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter applications by status"
              className="bg-transparent outline-none text-xs text-[#E0E0E0] cursor-pointer"
            >
              <option value="ALL" className="bg-[#14151A] text-white">All Statuses</option>
              <option value="Offer" className="bg-[#14151A] text-emerald-400">Offers</option>
              <option value="Interviewing" className="bg-[#14151A] text-blue-400">Interviewing</option>
              <option value="Screening" className="bg-[#14151A] text-purple-400">Screening</option>
              <option value="Applied" className="bg-[#14151A] text-amber-400">Applied</option>
              <option value="Wishlist" className="bg-[#14151A] text-gray-300">Wishlist</option>
              <option value="Rejected" className="bg-[#14151A] text-rose-400">Archived</option>
            </select>
          </div>

          <button
            onClick={onOpenNewModal}
            className="px-3.5 py-1.5 bg-[#1A1C23] border border-[#333] hover:bg-[#222] hover:border-[#444] text-xs font-bold uppercase tracking-widest text-white rounded-lg transition-colors cursor-pointer"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#222] text-gray-500 uppercase tracking-widest text-[10px]">
              <th className="pb-3 font-semibold pl-2">Company & Role</th>
              <th className="pb-3 font-semibold">Compensation</th>
              <th className="pb-3 font-semibold">Location</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Next Milestone</th>
              <th className="pb-3 font-semibold pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1C23]">
            {filteredApps.map((app) => (
              <tr 
                key={app.id}
                className="hover:bg-[#1A1C23]/60 transition-colors group cursor-pointer"
                onClick={() => onEditApplication(app)}
              >
                {/* Company & Role */}
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0D0E12] border border-[#222] flex items-center justify-center font-bold text-white text-xs group-hover:border-blue-500/40 transition-colors shrink-0">
                      {app.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                          {app.company}
                        </span>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-600 hover:text-gray-300 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5">{app.role}</p>
                    </div>
                  </div>
                </td>

                {/* Salary */}
                <td className="py-4">
                  <div className="font-mono text-gray-300 font-medium">
                    {app.salary || '—'}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {app.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] text-gray-500 bg-[#0D0E12] px-1.5 py-0.5 rounded border border-[#222]">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Location & Mode */}
                <td className="py-4">
                  <div className="text-gray-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span>{app.location}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    {app.workplaceType}
                  </span>
                </td>

                {/* Status Dropdown */}
                <td className="py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                      aria-label={`Update application status for ${app.company}`}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md appearance-none pr-6 cursor-pointer outline-none ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st} className="bg-[#14151A] text-white">
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>
                </td>

                {/* Next Milestone */}
                <td className="py-4">
                  {app.nextAction ? (
                    <div>
                      <span className="text-xs text-gray-200 block font-medium">
                        {app.nextAction}
                      </span>
                      {app.nextActionDate && (
                        <span className="text-[10px] font-mono text-blue-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5" /> Due {app.nextActionDate}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-600 italic">No scheduled action</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-4 pr-2 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEditApplication(app)}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-[#222] rounded transition-colors"
                      title="Edit Application"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteApplication(app.id)}
                      className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors"
                      title="Delete Application"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredApps.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium text-gray-400">No applications match this filter</p>
                  <button
                    onClick={() => setStatusFilter('ALL')}
                    className="mt-2 text-xs text-blue-400 hover:underline"
                  >
                    Reset Status Filter
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
