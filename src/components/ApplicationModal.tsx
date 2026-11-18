import React, { useState, useEffect } from 'react';
import { JobApplication, ApplicationStatus, WorkplaceType, PriorityLevel } from '../types';
import { X, Building2, MapPin, DollarSign, Calendar, Link, Tag, FileText, CheckCircle2 } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: Partial<JobApplication>) => void;
  initialData?: JobApplication | null;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [workplaceType, setWorkplaceType] = useState<WorkplaceType>('Remote');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [salary, setSalary] = useState('');
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().slice(0, 10));
  const [jobUrl, setJobUrl] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [nextAction, setNextAction] = useState('');
  const [nextActionDate, setNextActionDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company || '');
      setRole(initialData.role || '');
      setLocation(initialData.location || '');
      setWorkplaceType(initialData.workplaceType || 'Remote');
      setStatus(initialData.status || 'Applied');
      setSalary(initialData.salary || '');
      setAppliedDate(initialData.appliedDate || new Date().toISOString().slice(0, 10));
      setJobUrl(initialData.jobUrl || '');
      setContactPerson(initialData.contactPerson || '');
      setPriority(initialData.priority || 'Medium');
      setNextAction(initialData.nextAction || '');
      setNextActionDate(initialData.nextActionDate || '');
      setTags(initialData.tags || []);
      setNotes(initialData.notes || '');
    } else {
      setCompany('');
      setRole('');
      setLocation('San Francisco, CA');
      setWorkplaceType('Remote');
      setStatus('Applied');
      setSalary('$200,000 - $240,000');
      setAppliedDate(new Date().toISOString().slice(0, 10));
      setJobUrl('');
      setContactPerson('');
      setPriority('High');
      setNextAction('');
      setNextActionDate('');
      setTags(['TypeScript', 'React', 'Full Stack']);
      setNotes('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tToRemove: string) => {
    setTags(tags.filter((t) => t !== tToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    onSave({
      company,
      role,
      location,
      workplaceType,
      status,
      salary,
      appliedDate,
      jobUrl,
      contactPerson,
      priority,
      nextAction,
      nextActionDate,
      tags,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#14151A] border border-[#333] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              {initialData ? 'Edit Opportunity' : 'Log New Application'}
            </h3>
            <p className="text-xs text-gray-500">
              Record pipeline details, compensation target, and scheduled action items.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Row 1: Company & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. OpenAI, Stripe, Linear"
                required
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Position / Role *
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Staff Software Engineer"
                required
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Status, Workplace, Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Pipeline Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors cursor-pointer"
              >
                <option value="Wishlist">Wishlist</option>
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Archived / Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Workplace Model
              </label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as WorkplaceType)}
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors cursor-pointer"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors cursor-pointer"
              >
                <option value="High">P1 (High Interest)</option>
                <option value="Medium">P2 (Standard)</option>
                <option value="Low">P3 (Backlog)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Salary, Location, Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Expected / Offered Comp
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. $220k - $250k"
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco / Remote"
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Submission Date
              </label>
              <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors font-mono"
              />
            </div>
          </div>

          {/* Row 4: Next Action & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Next Milestone / Action
              </label>
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="e.g. Virtual Onsite Loop, Review Offer"
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Action Target Date
              </label>
              <input
                type="date"
                value={nextActionDate}
                onChange={(e) => setNextActionDate(e.target.value)}
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors font-mono"
              />
            </div>
          </div>

          {/* Row 5: Job Posting URL & Recruiter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Job Posting URL
              </label>
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Contact Person / Recruiter
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Sarah Chen (Senior Recruiter)"
                className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 6: Skills / Tech Tags */}
          <div>
            <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
              Tags / Key Tech (Press Enter to add)
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#0D0E12] border border-[#222] rounded-lg min-h-[42px]">
              {tags.map((t) => (
                <span
                  key={t}
                  className="bg-[#1A1C23] border border-[#333] text-gray-300 text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="text-gray-500 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={tags.length === 0 ? 'Type tag and press Enter...' : ''}
                className="bg-transparent text-white outline-none text-xs flex-1 min-w-[120px]"
              />
            </div>
          </div>

          {/* Row 7: Notes & Strategy */}
          <div>
            <label className="block text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
              Interview Notes & Negotiation Details
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Round feedback, referral contacts, compensation leverage notes..."
              className="w-full bg-[#0D0E12] border border-[#222] focus:border-blue-500 rounded-lg p-3 text-white outline-none transition-colors leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-[#222] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#0D0E12] border border-[#222] hover:bg-[#1A1C23] text-gray-400 hover:text-white rounded-lg uppercase tracking-wider font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg uppercase tracking-widest font-bold text-xs transition-all shadow-lg shadow-blue-950/40"
            >
              {initialData ? 'Save Changes' : 'Create Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
