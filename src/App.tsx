import React, { useState, useEffect } from 'react';
import { 
  JobApplication, 
  Interview, 
  ActivityLog, 
  ViewTab, 
  ApplicationStatus 
} from './types';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_INTERVIEWS, 
  INITIAL_ACTIVITIES 
} from './mockData';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { ApplicationsTable } from './components/ApplicationsTable';
import { KanbanBoard } from './components/KanbanBoard';
import { InterviewsView } from './components/InterviewsView';
import { AnalyticsView } from './components/AnalyticsView';
import { ActivitySidebar } from './components/ActivitySidebar';
import { ApplicationModal } from './components/ApplicationModal';

const STORAGE_KEY_APPS = 'jobtrack_apps_v1';
const STORAGE_KEY_INTS = 'jobtrack_ints_v1';
const STORAGE_KEY_ACTS = 'jobtrack_acts_v1';

export default function App() {
  // State initialization with localStorage fallback
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPS);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INTS);
      return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
    } catch {
      return INITIAL_INTERVIEWS;
    }
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTS);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INTS, JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTS, JSON.stringify(activities));
  }, [activities]);

  // Log activity helper
  const addActivity = (
    type: ActivityLog['type'],
    title: string,
    description: string,
    company?: string
  ) => {
    const newAct: ActivityLog = {
      id: `act-${Date.now()}`,
      type,
      title,
      description,
      timestamp: 'Just now',
      company,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Status Updater
  const handleUpdateStatus = (id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const oldStatus = app.status;
          if (oldStatus !== status) {
            addActivity(
              status === 'Offer' ? 'OFFER_RECEIVED' : 'STATUS_CHANGE',
              `Stage Changed to ${status}`,
              `${app.company} status changed from ${oldStatus} to ${status}.`,
              app.company
            );
          }
          return { ...app, status };
        }
        return app;
      })
    );
  };

  // Delete Application
  const handleDeleteApplication = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (app) {
      addActivity(
        'STATUS_CHANGE',
        'Application Removed',
        `Removed ${app.company} (${app.role}) from tracking list.`,
        app.company
      );
    }
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Add or Edit Application
  const handleSaveApplication = (data: Partial<JobApplication>) => {
    if (editingApp) {
      // Edit existing
      setApplications((prev) =>
        prev.map((a) => (a.id === editingApp.id ? ({ ...a, ...data } as JobApplication) : a))
      );
      addActivity(
        'NOTE_ADDED',
        'Opportunity Updated',
        `Updated details and milestones for ${data.company || editingApp.company}.`,
        data.company || editingApp.company
      );
      setEditingApp(null);
    } else {
      // Create new
      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        company: data.company || 'Unknown',
        role: data.role || 'Software Engineer',
        location: data.location || 'Remote',
        workplaceType: data.workplaceType || 'Remote',
        status: data.status || 'Applied',
        salary: data.salary || '',
        appliedDate: data.appliedDate || new Date().toISOString().slice(0, 10),
        jobUrl: data.jobUrl,
        contactPerson: data.contactPerson,
        notes: data.notes,
        tags: data.tags || ['Engineering'],
        priority: data.priority || 'Medium',
        nextAction: data.nextAction,
        nextActionDate: data.nextActionDate,
      };

      setApplications((prev) => [newApp, ...prev]);
      addActivity(
        'NEW_APPLICATION',
        'New Opportunity Tracked',
        `Added ${newApp.company} (${newApp.role}) to active pipeline.`,
        newApp.company
      );
    }
  };

  // Add Interview
  const handleAddInterview = (intData: Omit<Interview, 'id'>) => {
    const newInt: Interview = {
      ...intData,
      id: `int-${Date.now()}`,
    };
    setInterviews((prev) => [newInt, ...prev]);
    addActivity(
      'INTERVIEW_SCHEDULED',
      'Interview Confirmed',
      `${newInt.round} with ${newInt.company} on ${newInt.date} at ${newInt.time}.`,
      newInt.company
    );
  };

  // Toggle Interview Status
  const handleToggleInterviewStatus = (id: string) => {
    setInterviews((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Completed' ? 'Upcoming' : 'Completed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const data = {
      applications,
      interviews,
      activities,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JobTrack_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Search filter
  const displayedApplications = applications.filter((app) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.company.toLowerCase().includes(q) ||
      app.role.toLowerCase().includes(q) ||
      app.location.toLowerCase().includes(q) ||
      app.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const activeLoopsCount = applications.filter(
    (a) => a.status === 'Interviewing' || a.status === 'Offer' || a.status === 'Screening'
  ).length;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E0E0E0] font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewModal={() => {
          setEditingApp(null);
          setIsModalOpen(true);
        }}
        activeCount={activeLoopsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0D0E12] p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Primary Panel (8 cols on large screens) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {activeTab === 'dashboard' && (
              <>
                <MetricsOverview
                  applications={displayedApplications}
                  interviews={interviews}
                  onSelectTab={(tab) => setActiveTab(tab)}
                />
                <ApplicationsTable
                  applications={displayedApplications}
                  onUpdateStatus={handleUpdateStatus}
                  onDeleteApplication={handleDeleteApplication}
                  onEditApplication={(app) => {
                    setEditingApp(app);
                    setIsModalOpen(true);
                  }}
                  onOpenNewModal={() => {
                    setEditingApp(null);
                    setIsModalOpen(true);
                  }}
                />
              </>
            )}

            {activeTab === 'pipeline' && (
              <KanbanBoard
                applications={displayedApplications}
                onUpdateStatus={handleUpdateStatus}
                onEditApplication={(app) => {
                  setEditingApp(app);
                  setIsModalOpen(true);
                }}
                onOpenNewModal={() => {
                  setEditingApp(null);
                  setIsModalOpen(true);
                }}
              />
            )}

            {activeTab === 'applications' && (
              <ApplicationsTable
                applications={displayedApplications}
                onUpdateStatus={handleUpdateStatus}
                onDeleteApplication={handleDeleteApplication}
                onEditApplication={(app) => {
                  setEditingApp(app);
                  setIsModalOpen(true);
                }}
                onOpenNewModal={() => {
                  setEditingApp(null);
                  setIsModalOpen(true);
                }}
              />
            )}

            {activeTab === 'interviews' && (
              <InterviewsView
                interviews={interviews}
                applications={applications}
                onAddInterview={handleAddInterview}
                onToggleInterviewStatus={handleToggleInterviewStatus}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView
                applications={applications}
                interviews={interviews}
              />
            )}
          </div>

          {/* Right Sidebar Activity Panel (4 cols) matching Elegant Dark design */}
          <div className="lg:col-span-4 sticky top-6">
            <ActivitySidebar
              activities={activities}
              interviews={interviews}
              onSelectTab={(tab) => setActiveTab(tab)}
              onExportJSON={handleExportJSON}
            />
          </div>
        </div>
      </main>

      {/* Footer matching Elegant Dark theme */}
      <footer className="h-12 bg-[#0A0A0C] border-t border-[#222] flex items-center justify-between px-6 lg:px-10 text-[10px] uppercase tracking-widest text-gray-500 shrink-0">
        <span className="flex items-center gap-2">
          Pipeline Status: <span className="text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active Candidate Hunt</span>
        </span>
        <span className="hidden sm:inline font-mono">
          Last Synchronized: {new Date().toLocaleDateString()}
        </span>
        <span className="font-mono text-gray-600">Ref: JT-9402-PRO</span>
      </footer>

      {/* Add/Edit Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApp(null);
        }}
        onSave={handleSaveApplication}
        initialData={editingApp}
      />
    </div>
  );
}
