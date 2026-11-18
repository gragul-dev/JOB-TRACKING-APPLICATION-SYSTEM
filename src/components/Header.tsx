import React from 'react';
import { ViewTab } from '../types';
import { Plus, Search, Briefcase, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewModal: () => void;
  activeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenNewModal,
  activeCount,
}) => {
  return (
    <header className="h-20 bg-[#0A0A0C] border-b border-[#222] flex items-center justify-between px-6 lg:px-10 shrink-0 z-20">
      {/* Brand & Navigation */}
      <div className="flex items-center gap-8 lg:gap-12">
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400 transition-colors">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-light tracking-tighter text-white uppercase">
            JOB<span className="font-bold text-blue-500">TRACK</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-6 text-xs font-medium text-gray-500 uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`transition-colors py-2 relative ${
              activeTab === 'dashboard' ? 'text-white font-bold' : 'hover:text-gray-300'
            }`}
          >
            Overview
            {activeTab === 'dashboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`transition-colors py-2 relative ${
              activeTab === 'pipeline' ? 'text-white font-bold' : 'hover:text-gray-300'
            }`}
          >
            Pipeline
            {activeTab === 'pipeline' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`transition-colors py-2 relative ${
              activeTab === 'applications' ? 'text-white font-bold' : 'hover:text-gray-300'
            }`}
          >
            Applications
            {activeTab === 'applications' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('interviews')}
            className={`transition-colors py-2 relative ${
              activeTab === 'interviews' ? 'text-white font-bold' : 'hover:text-gray-300'
            }`}
          >
            Interviews
            {activeTab === 'interviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`transition-colors py-2 relative ${
              activeTab === 'analytics' ? 'text-white font-bold' : 'hover:text-gray-300'
            }`}
          >
            Analytics
            {activeTab === 'analytics' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
            )}
          </button>
        </nav>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14151A] border border-[#222] focus:border-blue-500 text-xs text-[#E0E0E0] placeholder-gray-600 rounded-lg pl-9 pr-3 py-2 outline-none transition-colors"
          />
        </div>

        <button
          onClick={onOpenNewModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest transition-all rounded-lg shadow-lg shadow-blue-900/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Application</span>
        </button>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#222]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-700 to-gray-900 border border-[#444] flex items-center justify-center text-xs font-bold text-white shadow-inner">
            JK
          </div>
          <div className="hidden lg:block text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter font-mono">
                {activeCount} Active Loops
              </p>
            </div>
            <p className="text-xs font-semibold text-white">J. Kensington</p>
          </div>
        </div>
      </div>
    </header>
  );
};
