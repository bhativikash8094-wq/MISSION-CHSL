import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, FileText, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { DayPlan, DayProgress } from '../types';

interface IndexTableProps {
  days: DayPlan[];
  progress: Record<number, DayProgress>;
  onToggleDay: (day: number) => void;
  onOpenDayDetails: (day: DayPlan) => void;
  onSelectActiveDay?: (day: number) => void;
  onToggleSubject?: (
    day: number,
    subjectKey: 'arithmeticDone' | 'advancedDone' | 'reasoningDone' | 'englishDone' | 'gkDone'
  ) => void;
}

export const IndexTable: React.FC<IndexTableProps> = ({
  days,
  progress,
  onToggleDay,
  onOpenDayDetails,
  onSelectActiveDay,
  onToggleSubject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<'all' | 1 | 2 | 3 | 'revision' | 'completed' | 'pending'>('all');
  const [spacingDensity, setSpacingDensity] = useState<'comfortable' | 'spacious' | 'compact'>('comfortable');

  // Filtered days based on search and phase
  const filteredDays = useMemo(() => {
    return days.filter((d) => {
      // Phase / Status Filter
      if (phaseFilter === 1 && d.phase !== 1) return false;
      if (phaseFilter === 2 && d.phase !== 2) return false;
      if (phaseFilter === 3 && d.phase !== 3) return false;
      if (phaseFilter === 'revision' && !d.isRevision) return false;
      if (phaseFilter === 'completed' && !progress[d.day]?.completed) return false;
      if (phaseFilter === 'pending' && progress[d.day]?.completed) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDay = `day ${d.day}`.includes(query) || `${d.day}` === query;
        const matchesArithmetic = d.arithmetic.toLowerCase().includes(query);
        const matchesAdvanced = d.advancedMaths.toLowerCase().includes(query);
        const matchesReasoning = d.reasoning.toLowerCase().includes(query);
        const matchesEnglish = d.english.toLowerCase().includes(query);
        const matchesGK = d.gkGs.toLowerCase().includes(query);

        return matchesDay || matchesArithmetic || matchesAdvanced || matchesReasoning || matchesEnglish || matchesGK;
      }

      return true;
    });
  }, [days, phaseFilter, searchQuery, progress]);

  // Spacing helper classes
  const getCellPadding = () => {
    switch (spacingDensity) {
      case 'spacious':
        return 'py-4 px-4';
      case 'compact':
        return 'py-2 px-3';
      case 'comfortable':
      default:
        return 'py-3.5 px-3.5';
    }
  };

  const getPhaseBadge = (phase: 1 | 2 | 3) => {
    switch (phase) {
      case 1:
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Phase 1
          </span>
        );
      case 2:
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Phase 2
          </span>
        );
      case 3:
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Phase 3
          </span>
        );
    }
  };

  return (
    <div className="no-print bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden mb-10">
      {/* Table Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>SSC CHSL 2026 — Master Study Index (Day 1 – 45)</span>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono">
                {filteredDays.length} / 45 Days Shown
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured chapter index with subject-wise clarity, revision markers, and completion tracking.
            </p>
          </div>

          {/* Search bar & Spacing density toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic (e.g. Triangle, Algebra, Noun, Indus)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Spacing Selector */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg text-xs">
              <span className="text-slate-400 px-1 text-[11px] font-medium hidden sm:inline">Spacing:</span>
              <button
                onClick={() => setSpacingDensity('comfortable')}
                className={`px-2 py-1 rounded transition-colors ${
                  spacingDensity === 'comfortable'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Proper
              </button>
              <button
                onClick={() => setSpacingDensity('spacious')}
                className={`px-2 py-1 rounded transition-colors ${
                  spacingDensity === 'spacious'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Spacious
              </button>
              <button
                onClick={() => setSpacingDensity('compact')}
                className={`px-2 py-1 rounded transition-colors ${
                  spacingDensity === 'compact'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Compact
              </button>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setPhaseFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Days (1–45)
          </button>
          <button
            onClick={() => setPhaseFilter(1)}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 1
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50'
            }`}
          >
            Phase 1 (Day 1–15: Core)
          </button>
          <button
            onClick={() => setPhaseFilter(2)}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 2
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50'
            }`}
          >
            Phase 2 (Day 16–30: Speed & Mixed)
          </button>
          <button
            onClick={() => setPhaseFilter(3)}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 3
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
            }`}
          >
            Phase 3 (Day 31–45: Mock Drills)
          </button>
          <button
            onClick={() => setPhaseFilter('revision')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 'revision'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            Revision Days Only
          </button>
          <button
            onClick={() => setPhaseFilter('completed')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 'completed'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setPhaseFilter('pending')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              phaseFilter === 'pending'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Main Responsive Index Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-3 w-28 text-center">Day / Phase</th>
              <th className="py-3 px-3">Arithmetic Maths</th>
              <th className="py-3 px-3">Advanced Maths</th>
              <th className="py-3 px-3">Reasoning</th>
              <th className="py-3 px-3">English Grammar / Vocab</th>
              <th className="py-3 px-3">GK / General Studies</th>
              <th className="py-3 px-3 w-28 text-center">Status / Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 text-sm">
            {filteredDays.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <p className="text-sm">No topics match your search or filter.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setPhaseFilter('all');
                    }}
                    className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Clear Filters
                  </button>
                </td>
              </tr>
            ) : (
              filteredDays.map((dayPlan) => {
                const isCompleted = !!progress[dayPlan.day]?.completed;
                const hasNotes = !!progress[dayPlan.day]?.notes;

                return (
                  <tr
                    key={dayPlan.day}
                    className={`transition-colors hover:bg-slate-50/90 ${
                      isCompleted ? 'bg-emerald-50/30' : dayPlan.isRevision ? 'bg-amber-50/20' : 'even:bg-slate-50/40'
                    }`}
                  >
                    {/* Day Column */}
                    <td className={`${getCellPadding()} text-center align-middle border-r border-slate-100`}>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-extrabold font-mono text-slate-900 text-sm">
                          DAY {dayPlan.day}
                        </span>
                        <div className="flex items-center gap-1">
                          {getPhaseBadge(dayPlan.phase)}
                        </div>
                        {dayPlan.isRevision && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded border border-amber-200">
                            REVISION
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Arithmetic Column */}
                    <td className={`${getCellPadding()} align-top`}>
                      <div className="flex items-start justify-between gap-1.5">
                        <div className={`font-medium ${progress[dayPlan.day]?.arithmeticDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {dayPlan.arithmetic}
                        </div>
                        {onToggleSubject && (
                          <button
                            onClick={() => onToggleSubject(dayPlan.day, 'arithmeticDone')}
                            className={`p-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                              progress[dayPlan.day]?.arithmeticDone
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                            }`}
                            title={progress[dayPlan.day]?.arithmeticDone ? 'Mark Arithmetic Pending' : 'Mark Arithmetic Done'}
                          >
                            {progress[dayPlan.day]?.arithmeticDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400 block">
                          40–50 Qs target
                        </span>
                        {(progress[dayPlan.day]?.arithmeticQs || 0) > 0 && (
                          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                            {progress[dayPlan.day]?.arithmeticQs} solved
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Advanced Maths Column */}
                    <td className={`${getCellPadding()} align-top`}>
                      <div className="flex items-start justify-between gap-1.5">
                        <div className={`font-medium ${progress[dayPlan.day]?.advancedDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {dayPlan.advancedMaths}
                        </div>
                        {onToggleSubject && (
                          <button
                            onClick={() => onToggleSubject(dayPlan.day, 'advancedDone')}
                            className={`p-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                              progress[dayPlan.day]?.advancedDone
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                            }`}
                            title={progress[dayPlan.day]?.advancedDone ? 'Mark Advanced Maths Pending' : 'Mark Advanced Maths Done'}
                          >
                            {progress[dayPlan.day]?.advancedDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400 block">
                          30–40 Qs target
                        </span>
                        {(progress[dayPlan.day]?.advancedQs || 0) > 0 && (
                          <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-100 px-1.5 py-0.2 rounded">
                            {progress[dayPlan.day]?.advancedQs} solved
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Reasoning Column */}
                    <td className={`${getCellPadding()} align-top`}>
                      <div className="flex items-start justify-between gap-1.5">
                        <div className={`font-medium ${progress[dayPlan.day]?.reasoningDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {dayPlan.reasoning}
                        </div>
                        {onToggleSubject && (
                          <button
                            onClick={() => onToggleSubject(dayPlan.day, 'reasoningDone')}
                            className={`p-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                              progress[dayPlan.day]?.reasoningDone
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                            }`}
                            title={progress[dayPlan.day]?.reasoningDone ? 'Mark Reasoning Pending' : 'Mark Reasoning Done'}
                          >
                            {progress[dayPlan.day]?.reasoningDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400 block">
                          40–50 Qs target
                        </span>
                        {(progress[dayPlan.day]?.reasoningQs || 0) > 0 && (
                          <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-100 px-1.5 py-0.2 rounded">
                            {progress[dayPlan.day]?.reasoningQs} solved
                          </span>
                        )}
                      </div>
                    </td>

                    {/* English Column */}
                    <td className={`${getCellPadding()} align-top`}>
                      <div className="flex items-start justify-between gap-1.5">
                        <div className={`font-medium ${progress[dayPlan.day]?.englishDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {dayPlan.english}
                        </div>
                        {onToggleSubject && (
                          <button
                            onClick={() => onToggleSubject(dayPlan.day, 'englishDone')}
                            className={`p-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                              progress[dayPlan.day]?.englishDone
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                            }`}
                            title={progress[dayPlan.day]?.englishDone ? 'Mark English Pending' : 'Mark English Done'}
                          >
                            {progress[dayPlan.day]?.englishDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400 block">
                          Grammar + 30–40 Vocab
                        </span>
                        {(progress[dayPlan.day]?.englishQs || 0) > 0 && (
                          <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
                            {progress[dayPlan.day]?.englishQs} solved
                          </span>
                        )}
                      </div>
                    </td>

                    {/* GK/GS Column */}
                    <td className={`${getCellPadding()} align-top`}>
                      <div className="flex items-start justify-between gap-1.5">
                        <div className={`font-medium ${progress[dayPlan.day]?.gkDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {dayPlan.gkGs}
                        </div>
                        {onToggleSubject && (
                          <button
                            onClick={() => onToggleSubject(dayPlan.day, 'gkDone')}
                            className={`p-1 rounded-md shrink-0 transition-colors cursor-pointer ${
                              progress[dayPlan.day]?.gkDone
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                            }`}
                            title={progress[dayPlan.day]?.gkDone ? 'Mark GK Pending' : 'Mark GK Done'}
                          >
                            {progress[dayPlan.day]?.gkDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-400 block">
                          30–40 Qs + CA MCQs
                        </span>
                        {(progress[dayPlan.day]?.gkGsQs || 0) > 0 && (
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                            {progress[dayPlan.day]?.gkGsQs} solved
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status & Actions Column */}
                    <td className={`${getCellPadding()} align-middle text-center border-l border-slate-100`}>
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          onClick={() => onToggleDay(dayPlan.day)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                          }`}
                          title={isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Done</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-3.5 h-3.5" />
                              <span>Mark</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onOpenDayDetails(dayPlan)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5 px-1 py-0.5 rounded hover:bg-blue-50 transition-colors"
                          title="View day tasks, subject checklist & notes"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Details</span>
                          {hasNotes && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Summary */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          Showing <span className="font-bold text-slate-800">{filteredDays.length}</span> of 45 Days • Click <span className="font-semibold text-slate-700">Details</span> to log personal topic notes & question counts.
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Revision Days
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Regular Topic
          </span>
        </div>
      </div>
    </div>
  );
};
