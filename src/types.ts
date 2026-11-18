export type ApplicationStatus = 'Wishlist' | 'Applied' | 'Screening' | 'Interviewing' | 'Offer' | 'Rejected';

export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  workplaceType: WorkplaceType;
  status: ApplicationStatus;
  salary: string;
  appliedDate: string;
  jobUrl?: string;
  contactPerson?: string;
  notes?: string;
  tags: string[];
  priority: PriorityLevel;
  nextAction?: string;
  nextActionDate?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  company: string;
  role: string;
  round: string;
  date: string;
  time: string;
  interviewer?: string;
  meetingLink?: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface ActivityLog {
  id: string;
  type: 'STATUS_CHANGE' | 'NEW_APPLICATION' | 'INTERVIEW_SCHEDULED' | 'NOTE_ADDED' | 'OFFER_RECEIVED';
  title: string;
  description: string;
  timestamp: string;
  company?: string;
}

export type ViewTab = 'dashboard' | 'applications' | 'pipeline' | 'interviews' | 'analytics';
