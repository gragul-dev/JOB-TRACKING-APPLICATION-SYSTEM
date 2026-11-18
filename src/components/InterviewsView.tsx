import React, { useState } from 'react';
import { Interview, JobApplication } from '../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ExternalLink,
  BookOpen,
  CheckSquare
} from 'lucide-react';

interface InterviewsViewProps {
  interviews: Interview[];
  applications: JobApplication[];
  onAddInterview: (interview: Omit<Interview, 'id'>) => void;
  onToggleInterviewStatus: (id: string) => void;
}

export const InterviewsView: React.FC<InterviewsViewProps> = ({
  interviews,
  applications,
  onAddInterview,
  onToggleInterviewStatus,
}) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || '');
  const [roundName, setRoundName] = useState('Technical Architecture & Coding');
  const [date, setDate] = useState('2026-09-08');
  const [time, setTime] = useState('11:00 AM PST');
  const [interviewer, setInterviewer] = useState('');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/xyz-prep');
  const [notes, setNotes] = useState('');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const app = applications.find((a) => a.id === selectedAppId);
    if (!app) return;

    onAddInterview({
      applicationId: app.id,
      company: app.company,
      role: app.role,
      round: roundName,
      date,
      time,
      interviewer: interviewer || 'Hiring Committee',
      meetingLink,
      status: 'Upcoming',
      notes,
    });

    setShowScheduleForm(false);
    setNotes('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight">
            Interview Rounds & Prep Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Coordinate virtual onsite loops, technical assessments, and executive conversations.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer shadow-lg shadow-blue-950/40"
        >
          <Plus className="w-3.5 h-3.5" />
          {showScheduleForm ? 'Close Form' : 'Schedule Round'}
        </button>
      </div>

      {/* Schedule Form Drawer / Card */}
      {showScheduleForm && (
        <form
          onSubmit={handleSchedule}
          className="bg-[#14151A] border border-blue-500/30 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-2xl animate-in fade-in duration-200"
        >
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
              Select Company Application
            </label>
            <select
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              className="w-full bg-[#0D0E12] border border-[#222] text-xs text-white rounded-lg p-2.5 outline-none focus:border-blue-500"
              required
            >
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.company} — {app.role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
              Interview Round Type
            </label>
            <input
              type="text"
              value={roundName}
              onChange={(e) => setRoundName(e.target.value)}
              placeholder="e.g. System Design, Behavioral, VP Loop"
              className="w-full bg-[#0D0E12] border border-[#222] text-xs text-white rounded-lg p-2.5 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
              Date & Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#0D0E12] border border-[#222] text-xs text-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM PST"
                className="bg-[#0D0E12] border border-[#222] text-xs text-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
              Interviewer Name / Title
            </label>
            <input
              type="text"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              placeholder="e.g. Elena Rostova (Staff Eng)"
              className="w-full bg-[#0D0E12] border border-[#222] text-xs text-white rounded-lg p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
              Video Meeting URL
            </label>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://zoom.us/..."
              className="w-full bg-[#0D0E12] border border-[#222] text-xs text-white rounded-lg p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
            >
              Confirm Round
            </button>
          </div>
        </form>
      )}

      {/* Interview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((item) => {
          const isCompleted = item.status === 'Completed';

          return (
            <div
              key={item.id}
              className={`bg-[#14151A] border rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all ${
                isCompleted ? 'border-[#222] opacity-75' : 'border-[#222] hover:border-blue-500/50'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222]">
                  <span className="text-xs font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/40">
                    {item.round}
                  </span>
                  <button
                    onClick={() => onToggleInterviewStatus(item.id)}
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-[#1A1C23] text-gray-400 border border-[#333] hover:text-white'
                    }`}
                  >
                    {isCompleted ? '✓ Completed' : 'Mark Done'}
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-white tracking-tight">{item.company}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{item.role}</p>

                {/* Details */}
                <div className="mt-4 flex flex-col gap-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-mono">{item.date}</span>
                    <span className="text-gray-600">•</span>
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-mono">{item.time}</span>
                  </div>

                  {item.interviewer && (
                    <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span>{item.interviewer}</span>
                    </div>
                  )}

                  {item.notes && (
                    <div className="mt-2 bg-[#0D0E12] border border-[#222] rounded-lg p-2.5 text-[11px] text-gray-400">
                      <span className="text-gray-500 font-semibold uppercase text-[9px] block mb-1">
                        Prep Notes
                      </span>
                      {item.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-[#222] flex items-center justify-between">
                {item.meetingLink ? (
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" /> Join Room
                  </a>
                ) : (
                  <span className="text-xs text-gray-600">No link specified</span>
                )}

                <span className="text-[10px] font-mono text-gray-500">
                  ID: {item.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prep Strategy Card */}
      <div className="bg-[#14151A] border border-[#222] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0 text-blue-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">System Architecture</h4>
            <p className="text-[11px] text-gray-500 mt-1">
              Focus on multi-region consensus, partition tolerance, and cache consistency.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center shrink-0 text-purple-400">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Executive STAR Stories</h4>
            <p className="text-[11px] text-gray-500 mt-1">
              Structure answers with Situation, Task, High-Leverage Action, and Quantitative Impact.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0 text-emerald-400">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Counter-Offer Leverage</h4>
            <p className="text-[11px] text-gray-500 mt-1">
              Align compensation discussions around equity appreciation upside and signing incentives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
