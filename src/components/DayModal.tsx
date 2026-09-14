import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Circle, Calculator, Sigma, Brain, BookOpen, Globe, Save } from 'lucide-react';
import { DayPlan, DayProgress } from '../types';

interface DayModalProps {
  dayPlan: DayPlan | null;
  progress: DayProgress;
  onClose: () => void;
  onSaveProgress: (day: number, updated: DayProgress) => void;
}

export const DayModal: React.FC<DayModalProps> = ({
  dayPlan,
  progress,
  onClose,
  onSaveProgress,
}) => {
  if (!dayPlan) return null;

  const [localProgress, setLocalProgress] = useState<DayProgress>(progress || {
    completed: false,
    arithmeticDone: false,
    advancedDone: false,
    reasoningDone: false,
    englishDone: false,
    gkDone: false,
    notes: '',
  });

  useEffect(() => {
    if (progress) {
      setLocalProgress(progress);
    }
  }, [progress]);

  const toggleSubject = (key: 'arithmeticDone' | 'advancedDone' | 'reasoningDone' | 'englishDone' | 'gkDone') => {
    const updated = {
      ...localProgress,
      [key]: !localProgress[key]
    };

    // Auto-mark completed if all 5 subjects are done
    const allDone = (
      (key === 'arithmeticDone' ? !localProgress.arithmeticDone : localProgress.arithmeticDone) &&
      (key === 'advancedDone' ? !localProgress.advancedDone : localProgress.advancedDone) &&
      (key === 'reasoningDone' ? !localProgress.reasoningDone : localProgress.reasoningDone) &&
      (key === 'englishDone' ? !localProgress.englishDone : localProgress.englishDone) &&
      (key === 'gkDone' ? !localProgress.gkDone : localProgress.gkDone)
    );

    updated.completed = allDone;
    setLocalProgress(updated);
    onSaveProgress(dayPlan.day, updated);
  };

  const handleNotesChange = (text: string) => {
    const updated = { ...localProgress, notes: text };
    setLocalProgress(updated);
    onSaveProgress(dayPlan.day, updated);
  };

  const handleToggleDayComplete = () => {
    const newStatus = !localProgress.completed;
    const updated: DayProgress = {
      ...localProgress,
      completed: newStatus,
      arithmeticDone: newStatus,
      advancedDone: newStatus,
      reasoningDone: newStatus,
      englishDone: newStatus,
      gkDone: newStatus,
      dateCompleted: newStatus ? new Date().toISOString().split('T')[0] : undefined
    };
    setLocalProgress(updated);
    onSaveProgress(dayPlan.day, updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div 
        className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PHASE {dayPlan.phase}
              </span>
              {dayPlan.isRevision && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  REVISION DAY
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              Day {dayPlan.day} Study Plan & Tracker
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Quick complete banner */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Overall Day Status
              </span>
              <span className="text-sm font-bold text-slate-800">
                {localProgress.completed ? 'Day Completed!' : 'In Progress'}
              </span>
            </div>
            <button
              onClick={handleToggleDayComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                localProgress.completed
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {localProgress.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Marked Complete
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" /> Mark Whole Day Complete
                </>
              )}
            </button>
          </div>

          {/* Subject Task Checklists */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Subject Checkpoints (Click to check off)
            </h3>
            <div className="space-y-2">
              {/* Arithmetic */}
              <div 
                onClick={() => toggleSubject('arithmeticDone')}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  localProgress.arithmeticDone
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200/60">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Arithmetic Maths (40–50 Qs)</span>
                    <span className={`text-sm font-semibold ${localProgress.arithmeticDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {dayPlan.arithmetic}
                    </span>
                  </div>
                </div>
                {localProgress.arithmeticDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
              </div>

              {/* Advanced Maths */}
              <div 
                onClick={() => toggleSubject('advancedDone')}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  localProgress.advancedDone
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200/60">
                    <Sigma className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Advanced Maths (30–40 Qs)</span>
                    <span className={`text-sm font-semibold ${localProgress.advancedDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {dayPlan.advancedMaths}
                    </span>
                  </div>
                </div>
                {localProgress.advancedDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
              </div>

              {/* Reasoning */}
              <div 
                onClick={() => toggleSubject('reasoningDone')}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  localProgress.reasoningDone
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-purple-50 text-purple-600 border border-purple-200/60">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Reasoning (40–50 Qs)</span>
                    <span className={`text-sm font-semibold ${localProgress.reasoningDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {dayPlan.reasoning}
                    </span>
                  </div>
                </div>
                {localProgress.reasoningDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
              </div>

              {/* English */}
              <div 
                onClick={() => toggleSubject('englishDone')}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  localProgress.englishDone
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200/60">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">English Grammar (30–40 Qs + 30–40 Vocab)</span>
                    <span className={`text-sm font-semibold ${localProgress.englishDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {dayPlan.english}
                    </span>
                  </div>
                </div>
                {localProgress.englishDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
              </div>

              {/* GK/GS */}
              <div 
                onClick={() => toggleSubject('gkDone')}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  localProgress.gkDone
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">GK / General Studies (30–40 Qs + CA)</span>
                    <span className={`text-sm font-semibold ${localProgress.gkDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {dayPlan.gkGs}
                    </span>
                  </div>
                </div>
                {localProgress.gkDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
              </div>
            </div>
          </div>

          {/* Personal Day Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Personal Study Notes & Questions Solved
            </label>
            <textarea
              value={localProgress.notes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="e.g. Solved 45 Qs from Pinnacle, struggled with line 4 theorem, revised 35 idioms..."
              rows={3}
              className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
