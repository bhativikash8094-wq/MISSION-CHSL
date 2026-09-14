import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailySubjectTracker } from './components/DailySubjectTracker';
import { TimetableSection } from './components/TimetableSection';
import { IndexTable } from './components/IndexTable';
import { StrategySection } from './components/StrategySection';
import { DayModal } from './components/DayModal';
import { PrintableView } from './components/PrintableView';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { AuthModal } from './components/AuthModal';
import { SYLLABUS_DAYS } from './data/syllabusData';
import { DayPlan, DayProgress, AppUser } from './types';
import { generateSyllabusPDF } from './utils/pdfGenerator';
import { 
  auth, 
  saveDayProgressToFirestore, 
  fetchUserProgressFromFirestore, 
  logOutUser 
} from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CheckCircle2, Download, Printer, BookOpen, AlertCircle, Smartphone, CloudCheck } from 'lucide-react';
import { sanitizeInput } from './utils/security';

const STORAGE_KEY = 'ssc_chsl_2026_progress_v1';
const USER_SESSION_KEY = 'ssc_chsl_user_session';

export default function App() {
  const [progress, setProgress] = useState<Record<number, DayProgress>>({});
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);
  const [activeTrackerDay, setActiveTrackerDay] = useState<number>(1);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication states with local session fallback
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_SESSION_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. Load progress from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load study progress', e);
    }
  }, []);

  // 2. Listen to Firebase Auth state change (Google & Mobile Phone)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const isPhone = Boolean(fbUser.phoneNumber && !fbUser.email);
        const appUser: AppUser = {
          uid: fbUser.uid,
          email: fbUser.email || undefined,
          phoneNumber: fbUser.phoneNumber || undefined,
          displayName: fbUser.displayName || (isPhone ? fbUser.phoneNumber : 'Aspirant'),
          photoURL: fbUser.photoURL || undefined,
          authProvider: isPhone ? 'phone' : 'google',
        };

        setCurrentUser(appUser);
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(appUser));
        setIsSyncing(true);

        try {
          // Fetch synced cloud progress for this user
          const cloudProgress = await fetchUserProgressFromFirestore(fbUser.uid);
          
          if (Object.keys(cloudProgress).length > 0) {
            setProgress((prev) => {
              // Merge local and cloud progress (cloud overrides default blanks)
              const merged = { ...prev, ...cloudProgress };
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              } catch {}
              return merged;
            });
          } else {
            // If new user on cloud, upload existing local progress to Firestore
            const localSaved = localStorage.getItem(STORAGE_KEY);
            if (localSaved) {
              const parsed: Record<number, DayProgress> = JSON.parse(localSaved);
              for (const [dayStr, dayProg] of Object.entries(parsed)) {
                saveDayProgressToFirestore(fbUser.uid, Number(dayStr), dayProg);
              }
            }
          }
        } catch (err) {
          console.error('Error syncing cloud progress:', err);
        } finally {
          setIsSyncing(false);
        }
      } else {
        // If Firebase Auth emits null, check if user is in an active phone session
        try {
          const session = localStorage.getItem(USER_SESSION_KEY);
          if (session) {
            const parsed = JSON.parse(session);
            if (parsed.authProvider === 'google') {
              setCurrentUser(null);
              localStorage.removeItem(USER_SESSION_KEY);
            }
          }
        } catch {
          // keep existing
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper to persist state to localStorage and cloud Firestore
  const saveProgressToStorage = (updated: Record<number, DayProgress>, updatedDayNum?: number) => {
    setProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (currentUser?.uid) {
        localStorage.setItem(`${STORAGE_KEY}_${currentUser.uid}`, JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Failed to save study progress', e);
    }

    // If user is logged in to Firebase Auth, sync to Firestore
    if (auth.currentUser && currentUser?.uid && updatedDayNum && updated[updatedDayNum]) {
      saveDayProgressToFirestore(currentUser.uid, updatedDayNum, updated[updatedDayNum]);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await logOutUser();
    } catch (e) {
      console.error('Logout error:', e);
    }
    localStorage.removeItem(USER_SESSION_KEY);
    setCurrentUser(null);
    showToast('Logged out successfully. Local progress remains safe.');
  };

  // Login success callback from modal
  const handleLoginSuccess = async (user: AppUser) => {
    setCurrentUser(user);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    showToast(`Logged in successfully as ${user.displayName || user.phoneNumber}!`);

    // If signed into Firebase Auth, attempt cloud sync
    if (auth.currentUser && user.uid) {
      try {
        const cloudProgress = await fetchUserProgressFromFirestore(user.uid);
        if (Object.keys(cloudProgress).length > 0) {
          setProgress((prev) => {
            const merged = { ...prev, ...cloudProgress };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      } catch (err) {
        console.warn('Sync on login error:', err);
      }
    }
  };

  // Toggle day completed
  const handleToggleDay = (day: number) => {
    const current = progress[day] || {
      completed: false,
      arithmeticDone: false,
      advancedDone: false,
      reasoningDone: false,
      englishDone: false,
      gkDone: false,
    };

    const newCompleted = !current.completed;
    const updatedDay: DayProgress = {
      ...current,
      completed: newCompleted,
      arithmeticDone: newCompleted,
      advancedDone: newCompleted,
      reasoningDone: newCompleted,
      englishDone: newCompleted,
      gkDone: newCompleted,
      dateCompleted: newCompleted ? new Date().toISOString().split('T')[0] : undefined,
    };

    const updated = {
      ...progress,
      [day]: updatedDay
    };

    saveProgressToStorage(updated, day);
    showToast(newCompleted ? `Day ${day} marked as completed!` : `Day ${day} marked as pending.`);
  };

  // Toggle specific subject for a day
  const handleToggleSubject = (
    day: number,
    subjectKey: 'arithmeticDone' | 'advancedDone' | 'reasoningDone' | 'englishDone' | 'gkDone',
    isDone?: boolean,
    qsCount?: number
  ) => {
    const current = progress[day] || {
      completed: false,
      arithmeticDone: false,
      advancedDone: false,
      reasoningDone: false,
      englishDone: false,
      gkDone: false,
    };

    const newSubjectDone = isDone !== undefined ? isDone : !current[subjectKey];

    const qsKeyMap = {
      arithmeticDone: 'arithmeticQs',
      advancedDone: 'advancedQs',
      reasoningDone: 'reasoningQs',
      englishDone: 'englishQs',
      gkDone: 'gkGsQs',
    } as const;
    const mappedQsKey = qsKeyMap[subjectKey];

    const updatedDay: DayProgress = {
      ...current,
      [subjectKey]: newSubjectDone,
      ...(qsCount !== undefined ? { [mappedQsKey]: qsCount } : {}),
    };

    // Auto-mark day completed if all 5 subjects are done
    const all5Done = Boolean(
      (subjectKey === 'arithmeticDone' ? newSubjectDone : updatedDay.arithmeticDone) &&
      (subjectKey === 'advancedDone' ? newSubjectDone : updatedDay.advancedDone) &&
      (subjectKey === 'reasoningDone' ? newSubjectDone : updatedDay.reasoningDone) &&
      (subjectKey === 'englishDone' ? newSubjectDone : updatedDay.englishDone) &&
      (subjectKey === 'gkDone' ? newSubjectDone : updatedDay.gkDone)
    );

    updatedDay.completed = all5Done;
    if (all5Done && !updatedDay.dateCompleted) {
      updatedDay.dateCompleted = new Date().toISOString().split('T')[0];
    }

    const updated = {
      ...progress,
      [day]: updatedDay,
    };

    saveProgressToStorage(updated, day);
  };

  // Save notes for a specific day
  const handleSaveDayNotes = (day: number, notes: string) => {
    const current = progress[day] || {
      completed: false,
      arithmeticDone: false,
      advancedDone: false,
      reasoningDone: false,
      englishDone: false,
      gkDone: false,
    };

    const sanitizedNotes = sanitizeInput(notes, 2000);
    const updatedDay: DayProgress = {
      ...current,
      notes: sanitizedNotes,
    };

    const updated = {
      ...progress,
      [day]: updatedDay,
    };

    saveProgressToStorage(updated, day);
  };

  // Save specific day progress from modal
  const handleSaveDayProgress = (day: number, dayProg: DayProgress) => {
    const cleanedProg: DayProgress = {
      ...dayProg,
      ...(dayProg.notes !== undefined ? { notes: sanitizeInput(dayProg.notes, 2000) } : {})
    };
    const updated = {
      ...progress,
      [day]: cleanedProg
    };
    saveProgressToStorage(updated, day);
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all completed checkboxes and notes?')) {
      saveProgressToStorage({});
      showToast('All progress has been reset.');
    }
  };

  // Direct PDF Download handler
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      showToast('Generating high-resolution index PDF...');
      
      setTimeout(() => {
        try {
          generateSyllabusPDF();
          setIsGeneratingPDF(false);
          showToast('PDF downloaded successfully! Check your downloads folder.');
        } catch (err) {
          console.error(err);
          setIsGeneratingPDF(false);
          showToast('Error generating PDF. Using browser print instead.');
          window.print();
        }
      }, 150);
    } catch (error) {
      console.error(error);
      setIsGeneratingPDF(false);
      window.print();
    }
  };

  // Browser Print handler
  const handlePrint = () => {
    showToast('Opening print dialog. Select "Save as PDF" and "Landscape" for best results.');
    window.print();
  };

  // Completed count
  const completedCount = Object.values(progress).filter((p: DayProgress) => p.completed).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header with Auth & Sync controls */}
      <Header
        completedDaysCount={completedCount}
        totalDays={SYLLABUS_DAYS.length}
        onDownloadPDF={handleDownloadPDF}
        onPrint={handlePrint}
        isGeneratingPDF={isGeneratingPDF}
        showPrintPreview={showPrintPreview}
        onTogglePrintPreview={() => setShowPrintPreview(!showPrintPreview)}
        onResetProgress={handleResetProgress}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        isSyncing={isSyncing}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Quick Guide / Banner */}
        <div className="no-print mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5 sm:mt-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  SSC CHSL 2026 Target: 160+ Marks in Tier-1
                </h2>
                {currentUser ? (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CloudCheck className="w-3 h-3 text-emerald-600" />
                    Cloud Synced
                  </span>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-[10px] font-bold bg-indigo-100 hover:bg-indigo-200 text-indigo-800 border border-indigo-300 px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
                  >
                    <Smartphone className="w-3 h-3 text-indigo-600" />
                    Login with Phone / Google to Sync
                  </button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                45-day structured plan divided into 3 distinct 15-day phases. Complete subject-wise progress tracking, question counts, and printable A4 PDF export.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save A4
            </button>
          </div>
        </div>

        {/* Section 1: Daily Subjects Wise Progress Tracker */}
        <DailySubjectTracker
          days={SYLLABUS_DAYS}
          progress={progress}
          currentDayNum={activeTrackerDay}
          onSelectDayNum={(d) => setActiveTrackerDay(d)}
          onUpdateSubjectProgress={handleToggleSubject}
          onSaveDayNotes={handleSaveDayNotes}
        />

        {/* Section 2: Timetable & Practice Targets (Collapsible) */}
        <TimetableSection />

        {/* Section 3: Master Index Table with Subject-Wise Checkpoints */}
        <IndexTable
          days={SYLLABUS_DAYS}
          progress={progress}
          onToggleDay={handleToggleDay}
          onToggleSubject={handleToggleSubject}
          onSelectActiveDay={(d) => {
            setActiveTrackerDay(d);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenDayDetails={(day) => setSelectedDay(day)}
        />

        {/* Section 4: Current Affairs, Vocab & Day 46+ Roadmap */}
        <StrategySection />
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-medium text-slate-700">
            SSC CHSL 2026 — 45 Days Master Syllabus & Daily Practice Index
          </p>
          <p className="mt-1">
            Built for serious aspirants • Daily 14.5 hours timetable • 300+ daily questions target • Export to printable A4 PDF
          </p>
        </div>
      </footer>

      {/* Hidden/Print View for Browser window.print() */}
      <PrintableView />

      {/* Day Details Modal */}
      {selectedDay && (
        <DayModal
          dayPlan={selectedDay}
          progress={progress[selectedDay.day] || {
            completed: false,
            arithmeticDone: false,
            advancedDone: false,
            reasoningDone: false,
            englishDone: false,
            gkDone: false,
          }}
          onClose={() => setSelectedDay(null)}
          onSaveProgress={handleSaveDayProgress}
        />
      )}

      {/* Print Preview Modal */}
      <PrintPreviewModal
        isOpen={showPrintPreview}
        onClose={() => setShowPrintPreview(false)}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* Login & Registration Modal (Mobile OTP & Google) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200 no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

