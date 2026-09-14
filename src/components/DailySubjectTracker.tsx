import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sigma, 
  Brain, 
  BookOpen, 
  Globe, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  Layers,
  BarChart2
} from 'lucide-react';
import { DayPlan, DayProgress } from '../types';

interface DailySubjectTrackerProps {
  days: DayPlan[];
  progress: Record<number, DayProgress>;
  currentDayNum: number;
  onSelectDayNum: (day: number) => void;
  onUpdateSubjectProgress: (
    day: number,
    subjectKey: 'arithmeticDone' | 'advancedDone' | 'reasoningDone' | 'englishDone' | 'gkDone',
    isDone: boolean,
    qsCount?: number
  ) => void;
  onSaveDayNotes: (day: number, notes: string) => void;
}

export const DailySubjectTracker: React.FC<DailySubjectTrackerProps> = ({
  days,
  progress,
  currentDayNum,
  onSelectDayNum,
  onUpdateSubjectProgress,
  onSaveDayNotes,
}) => {
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<'all' | 'arithmetic' | 'advanced' | 'reasoning' | 'english' | 'gk'>('all');

  const currentPlan = useMemo(() => {
    return days.find((d) => d.day === currentDayNum) || days[0];
  }, [days, currentDayNum]);

  const currentProg: DayProgress = useMemo(() => {
    return progress[currentDayNum] || {
      completed: false,
      arithmeticDone: false,
      advancedDone: false,
      reasoningDone: false,
      englishDone: false,
      gkDone: false,
      arithmeticQs: 0,
      advancedQs: 0,
      reasoningQs: 0,
      englishQs: 0,
      gkGsQs: 0,
      notes: '',
    };
  }, [progress, currentDayNum]);

  // Compute subject-wise overall completion across all 45 days
  const subjectOverallStats = useMemo(() => {
    let arithmeticTotal = 0;
    let advancedTotal = 0;
    let reasoningTotal = 0;
    let englishTotal = 0;
    let gkTotal = 0;

    let arithmeticQsSum = 0;
    let advancedQsSum = 0;
    let reasoningQsSum = 0;
    let englishQsSum = 0;
    let gkGsQsSum = 0;

    Object.values(progress).forEach((p: DayProgress) => {
      if (p.arithmeticDone) arithmeticTotal++;
      if (p.advancedDone) advancedTotal++;
      if (p.reasoningDone) reasoningTotal++;
      if (p.englishDone) englishTotal++;
      if (p.gkDone) gkTotal++;

      arithmeticQsSum += p.arithmeticQs || 0;
      advancedQsSum += p.advancedQs || 0;
      reasoningQsSum += p.reasoningQs || 0;
      englishQsSum += p.englishQs || 0;
      gkGsQsSum += p.gkGsQs || 0;
    });

    return {
      arithmetic: { done: arithmeticTotal, qs: arithmeticQsSum, pct: Math.round((arithmeticTotal / 45) * 100) },
      advanced: { done: advancedTotal, qs: advancedQsSum, pct: Math.round((advancedTotal / 45) * 100) },
      reasoning: { done: reasoningTotal, qs: reasoningQsSum, pct: Math.round((reasoningTotal / 45) * 100) },
      english: { done: englishTotal, qs: englishQsSum, pct: Math.round((englishTotal / 45) * 100) },
      gk: { done: gkTotal, qs: gkGsQsSum, pct: Math.round((gkTotal / 45) * 100) },
    };
  }, [progress]);

  // List of the 5 main subject cards for today
  const subjectsData = [
    {
      id: 'arithmetic' as const,
      key: 'arithmeticDone' as const,
      qsKey: 'arithmeticQs' as const,
      title: 'Arithmetic Maths',
      hindiTitle: 'अंकगणित',
      topic: currentPlan.arithmetic,
      slotTime: '5:00 AM – 7:30 AM (2.5 hrs)',
      targetQs: '40–50 Qs',
      targetMin: 40,
      targetMax: 50,
      solvedQs: currentProg.arithmeticQs || 0,
      isDone: Boolean(currentProg.arithmeticDone),
      themeColor: 'amber',
      accentBg: 'bg-amber-500',
      borderDone: 'border-amber-400 bg-amber-50/70',
      borderDefault: 'border-slate-200 bg-white hover:border-amber-300',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Calculator,
      studyTip: 'Focus on speed tricks, percentages/ratios shortcut calculations, and formulas.',
    },
    {
      id: 'advanced' as const,
      key: 'advancedDone' as const,
      qsKey: 'advancedQs' as const,
      title: 'Advanced Maths',
      hindiTitle: 'एडवांस गणित',
      topic: currentPlan.advancedMaths,
      slotTime: '5:30 PM – 7:30 PM (2 hrs)',
      targetQs: '30–40 Qs',
      targetMin: 30,
      targetMax: 40,
      solvedQs: currentProg.advancedQs || 0,
      isDone: Boolean(currentProg.advancedDone),
      themeColor: 'rose',
      accentBg: 'bg-rose-500',
      borderDone: 'border-rose-400 bg-rose-50/70',
      borderDefault: 'border-slate-200 bg-white hover:border-rose-300',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: Sigma,
      studyTip: 'Draw geometric diagrams accurately and memorize algebraic identity shortcuts.',
    },
    {
      id: 'reasoning' as const,
      key: 'reasoningDone' as const,
      qsKey: 'reasoningQs' as const,
      title: 'Reasoning Ability',
      hindiTitle: 'तर्कशक्ति',
      topic: currentPlan.reasoning,
      slotTime: '8:00 AM – 10:00 AM (2 hrs)',
      targetQs: '40–50 Qs',
      targetMin: 40,
      targetMax: 50,
      solvedQs: currentProg.reasoningQs || 0,
      isDone: Boolean(currentProg.reasoningDone),
      themeColor: 'purple',
      accentBg: 'bg-purple-500',
      borderDone: 'border-purple-400 bg-purple-50/70',
      borderDefault: 'border-slate-200 bg-white hover:border-purple-300',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Brain,
      studyTip: 'Look for alphabetic rank differences, prime number gaps, and mirror rotations.',
    },
    {
      id: 'english' as const,
      key: 'englishDone' as const,
      qsKey: 'englishQs' as const,
      title: 'English Language',
      hindiTitle: 'अंग्रेजी भाषा',
      topic: currentPlan.english,
      slotTime: '10:30 AM – 12:30 PM (2 hrs) + Vocab',
      targetQs: '30–40 Qs + 30 Vocab',
      targetMin: 35,
      targetMax: 50,
      solvedQs: currentProg.englishQs || 0,
      isDone: Boolean(currentProg.englishDone),
      themeColor: 'blue',
      accentBg: 'bg-blue-500',
      borderDone: 'border-blue-400 bg-blue-50/70',
      borderDefault: 'border-slate-200 bg-white hover:border-blue-300',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: BookOpen,
      studyTip: 'Apply 120 Grammar rules, eliminate options via subject-verb agreement and prepositions.',
    },
    {
      id: 'gk' as const,
      key: 'gkDone' as const,
      qsKey: 'gkGsQs' as const,
      title: 'GK & General Studies',
      hindiTitle: 'सामान्य अध्ययन',
      topic: currentPlan.gkGs,
      slotTime: '1:30 PM – 3:00 PM (1.5 hrs) + CA',
      targetQs: '30–40 Qs + 20 CA',
      targetMin: 30,
      targetMax: 50,
      solvedQs: currentProg.gkGsQs || 0,
      isDone: Boolean(currentProg.gkDone),
      themeColor: 'emerald',
      accentBg: 'bg-emerald-500',
      borderDone: 'border-emerald-400 bg-emerald-50/70',
      borderDefault: 'border-slate-200 bg-white hover:border-emerald-300',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Globe,
      studyTip: 'Revise static GK articles, national parks, festivals, and previous year repeated questions.',
    },
  ];

  // Count subjects done today
  const todaySubjectsCompleted = subjectsData.filter((s) => s.isDone).length;
  const todayProgressPct = Math.round((todaySubjectsCompleted / 5) * 100);

  // Quick increment/decrement questions for a subject
  const handleDeltaQs = (
    subjectKey: 'arithmeticDone' | 'advancedDone' | 'reasoningDone' | 'englishDone' | 'gkDone',
    qsKey: 'arithmeticQs' | 'advancedQs' | 'reasoningQs' | 'englishQs' | 'gkGsQs',
    delta: number,
    currentIsDone: boolean
  ) => {
    const currentVal = currentProg[qsKey] || 0;
    const newVal = Math.max(0, currentVal + delta);
    // If questions logged > 0 and not marked done, optionally suggest done
    onUpdateSubjectProgress(currentDayNum, subjectKey, newVal > 0 ? true : currentIsDone, newVal);
  };

  const filteredSubjects = selectedSubjectTab === 'all' 
    ? subjectsData 
    : subjectsData.filter((s) => s.id === selectedSubjectTab);

  return (
    <section className="no-print bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden mb-8">
      {/* Top Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                DAILY SUBJECT-WISE PROGRESS TRACKER
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-full">
                5 Core Pillars (Maths • Reasoning • English • GK)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              Day {currentPlan.day} Subject-Wise Execution
              {currentPlan.isRevision ? (
                <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-md">
                  Revision Day
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-500/40 text-indigo-200 border border-indigo-400/30 rounded-md">
                  Phase {currentPlan.phase}
                </span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Track daily syllabus chapters, questions solved, and completion status for every subject individually with instant checkbox controls.
            </p>
          </div>

          {/* Quick Day Switcher & Day Navigation */}
          <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/80 self-start lg:self-center">
            <button
              onClick={() => onSelectDayNum(Math.max(1, currentDayNum - 1))}
              disabled={currentDayNum <= 1}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-2.5 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Jump to Day</span>
              <select
                value={currentDayNum}
                onChange={(e) => onSelectDayNum(Number(e.target.value))}
                className="bg-transparent text-white font-black text-sm cursor-pointer focus:outline-none"
              >
                {days.map((d) => (
                  <option key={d.day} value={d.day} className="bg-slate-900 text-white">
                    Day {d.day} : {d.arithmetic.substring(0, 24)}...
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onSelectDayNum(Math.min(45, currentDayNum + 1))}
              disabled={currentDayNum >= 45}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day Summary Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Day {currentPlan.day} Subject Score:</span>
              <span className="text-emerald-300 font-mono text-sm">{todaySubjectsCompleted} of 5 Completed</span>
            </div>
            <span className="text-slate-400">({todayProgressPct}%)</span>
          </div>

          <div className="w-full sm:w-64 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                todayProgressPct === 100 ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
              style={{ width: `${todayProgressPct}%` }}
            />
          </div>
        </div>

        {/* 5-Subject Overall 45-Day Micro Progress Badges */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-slate-800/80">
          <div className="bg-slate-800/70 p-2 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-amber-300">Arithmetic</span>
              <span className="font-mono text-white">{subjectOverallStats.arithmetic.done}/45</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-amber-400 h-1 rounded-full" style={{ width: `${subjectOverallStats.arithmetic.pct}%` }} />
            </div>
          </div>

          <div className="bg-slate-800/70 p-2 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-rose-300">Advanced</span>
              <span className="font-mono text-white">{subjectOverallStats.advanced.done}/45</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-rose-400 h-1 rounded-full" style={{ width: `${subjectOverallStats.advanced.pct}%` }} />
            </div>
          </div>

          <div className="bg-slate-800/70 p-2 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-purple-300">Reasoning</span>
              <span className="font-mono text-white">{subjectOverallStats.reasoning.done}/45</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-purple-400 h-1 rounded-full" style={{ width: `${subjectOverallStats.reasoning.pct}%` }} />
            </div>
          </div>

          <div className="bg-slate-800/70 p-2 rounded-lg border border-slate-700/60">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-blue-300">English</span>
              <span className="font-mono text-white">{subjectOverallStats.english.done}/45</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-400 h-1 rounded-full" style={{ width: `${subjectOverallStats.english.pct}%` }} />
            </div>
          </div>

          <div className="bg-slate-800/70 p-2 rounded-lg border border-slate-700/60 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-emerald-300">GK / GS</span>
              <span className="font-mono text-white">{subjectOverallStats.gk.done}/45</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${subjectOverallStats.gk.pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Filter Subject:</span>
          <button
            onClick={() => setSelectedSubjectTab('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSubjectTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All 5 Subjects
          </button>
          <button
            onClick={() => setSelectedSubjectTab('arithmetic')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSubjectTab === 'arithmetic'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
            }`}
          >
            Arithmetic
          </button>
          <button
            onClick={() => setSelectedSubjectTab('advanced')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSubjectTab === 'advanced'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50'
            }`}
          >
            Advanced
          </button>
          <button
            onClick={() => setSelectedSubjectTab('reasoning')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSubjectTab === 'reasoning'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-purple-50'
            }`}
          >
            Reasoning
          </button>
          <button
            onClick={() => setSelectedSubjectTab('english')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSubjectTab === 'english'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setSelectedSubjectTab('gk')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSubjectTab === 'gk'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            GK / GS
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-medium shrink-0 hidden md:block">
          💡 Click any checkbox to mark subject complete or adjust questions
        </span>
      </div>

      {/* 5 Subject Cards Grid */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((sub) => {
          const IconComp = sub.icon;
          return (
            <div
              key={sub.id}
              className={`rounded-2xl border transition-all shadow-xs flex flex-col justify-between overflow-hidden ${
                sub.isDone ? sub.borderDone : sub.borderDefault
              }`}
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl text-white ${sub.accentBg}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-black text-slate-900 text-base leading-tight">
                          {sub.title}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          ({sub.hindiTitle})
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                        {sub.slotTime}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Checkbox Button */}
                  <button
                    onClick={() => onUpdateSubjectProgress(currentDayNum, sub.key, !sub.isDone, sub.solvedQs)}
                    className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                      sub.isDone
                        ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200 border border-slate-300'
                    }`}
                    title={sub.isDone ? 'Mark subject as pending' : 'Mark subject as completed'}
                  >
                    {sub.isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Day Chapter/Topic Box */}
                <div className="mt-3 bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Day {currentPlan.day} Chapter Target
                  </span>
                  <div className={`text-sm font-bold leading-snug ${sub.isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {sub.topic}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100 italic">
                    {sub.studyTip}
                  </div>
                </div>
              </div>

              {/* Card Footer: Target & Interactive Questions Solved Counter */}
              <div className="bg-slate-100/80 border-t border-slate-200/80 px-4 py-3 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-500 block">Daily Target:</span>
                  <span className="text-xs font-bold text-slate-800">{sub.targetQs}</span>
                </div>

                {/* Question Increment/Decrement Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDeltaQs(sub.key, sub.qsKey, -5, sub.isDone)}
                    className="w-7 h-7 bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors"
                    title="-5 questions"
                  >
                    -
                  </button>

                  <div className="px-2 py-0.5 bg-white border border-slate-300 rounded-lg text-center min-w-[52px]">
                    <span className="text-xs font-black font-mono text-slate-900 block leading-tight">
                      {sub.solvedQs}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold block leading-tight">solved</span>
                  </div>

                  <button
                    onClick={() => handleDeltaQs(sub.key, sub.qsKey, 5, sub.isDone)}
                    className="w-7 h-7 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition-colors"
                    title="+5 questions"
                  >
                    +5
                  </button>

                  <button
                    onClick={() => handleDeltaQs(sub.key, sub.qsKey, 10, sub.isDone)}
                    className="px-2 h-7 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[10px] flex items-center justify-center cursor-pointer transition-colors"
                    title="+10 questions"
                  >
                    +10
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* 6th Card: Revision, Vocab & Current Affairs Bonus Trackers */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Daily Vocab & Current Affairs
                </h3>
                <span className="text-[11px] font-mono text-slate-500 block">
                  Night Revision & High-Yield Slots
                </span>
              </div>
            </div>

            <div className="space-y-2 mt-3">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Daily Vocab Practice</span>
                  <span className="text-[11px] text-slate-500">30–40 Words (OWS, Idioms, Syno)</span>
                </div>
                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  Slot 3:00–4:30 PM
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Current Affairs MCQs</span>
                  <span className="text-[11px] text-slate-500">20–30 Monthly MCQs</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  Slot 8:00–9:00 PM
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Night Mixed Maths Drills</span>
                  <span className="text-[11px] text-slate-500">40–50 Mixed Speed PYQs</span>
                </div>
                <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  Slot 9:30–11:00 PM
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-right">
            <span className="text-xs font-bold text-slate-600">
              Total Daily Benchmark: 270–350+ Questions
            </span>
          </div>
        </div>
      </div>

      {/* Day Notes & Weakness Register */}
      <div className="bg-slate-50/70 border-t border-slate-200 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span>Day {currentPlan.day} Subject Errors & Formulas Log</span>
          </label>
          <span className="text-[11px] text-slate-400">
            Notes are saved instantly to your browser's local memory
          </span>
        </div>
        <textarea
          value={currentProg.notes || ''}
          onChange={(e) => onSaveDayNotes(currentDayNum, e.target.value)}
          placeholder={`Log Day ${currentPlan.day} subject insights (e.g. Maths: Need more practice on Alternate Segment Theorem; Reasoning: Blood relations inverted coding; English: 'Lest' takes 'should')...`}
          rows={2}
          className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
        />
      </div>
    </section>
  );
};
