export interface DayPlan {
  day: number;
  phase: 1 | 2 | 3;
  arithmetic: string;
  advancedMaths: string;
  reasoning: string;
  english: string;
  gkGs: string;
  isRevision?: boolean;
}

export interface TimetableSlot {
  id: string;
  time: string;
  subject: string;
  duration: string;
  category: 'arithmetic' | 'reasoning' | 'english' | 'gk' | 'vocab' | 'advanced' | 'ca' | 'practice';
  icon: string;
  targetInfo: string;
}

export interface DailyPracticeTarget {
  id: string;
  subject: string;
  targetRange: string;
  recommended: string;
  category: string;
}

export interface AppUser {
  uid: string;
  email?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  authProvider: 'google' | 'phone' | 'other';
}

export interface DayProgress {
  completed: boolean;
  arithmeticDone: boolean;
  advancedDone: boolean;
  reasoningDone: boolean;
  englishDone: boolean;
  gkDone: boolean;
  vocabDone?: boolean;
  currentAffairsDone?: boolean;
  nightPracticeDone?: boolean;
  // Questions solved counter per subject
  arithmeticQs?: number;
  advancedQs?: number;
  reasoningQs?: number;
  englishQs?: number;
  vocabWords?: number;
  gkGsQs?: number;
  caMcqs?: number;
  nightPracticeQs?: number;
  // Timetable slot checkboxes
  slotsCompleted?: Record<string, boolean>;
  // Daily metrics
  hoursStudied?: number;
  productivityRating?: number; // 1 to 5
  notes?: string;
  dateCompleted?: string;
}
