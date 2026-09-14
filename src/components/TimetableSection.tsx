import React, { useState } from 'react';
import { Clock, Target, ChevronDown, ChevronUp, BookOpen, Calculator, Brain, Globe, Languages, Sigma, Flame, CheckCircle2 } from 'lucide-react';
import { DAILY_TIMETABLE, DAILY_PRACTICE_TARGETS } from '../data/syllabusData';

export const TimetableSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const getSlotIcon = (category: string) => {
    switch (category) {
      case 'arithmetic':
        return <Calculator className="w-4 h-4 text-amber-500" />;
      case 'reasoning':
        return <Brain className="w-4 h-4 text-purple-500" />;
      case 'english':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'gk':
        return <Globe className="w-4 h-4 text-emerald-500" />;
      case 'vocab':
        return <Languages className="w-4 h-4 text-indigo-500" />;
      case 'advanced':
        return <Sigma className="w-4 h-4 text-rose-500" />;
      case 'ca':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'practice':
        return <CheckCircle2 className="w-4 h-4 text-teal-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <section className="no-print bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden mb-8 transition-all">
      {/* Collapsible Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-6 py-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between border-b border-slate-200 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-200/70 rounded-lg text-slate-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Daily Master Timetable & Practice Targets
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                14.5 Hours Routine
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              5:00 AM – 11:00 PM disciplined slot allocation & 270–350+ daily questions breakdown
            </p>
          </div>
        </div>

        <button 
          className="text-slate-500 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/60"
          aria-label={isExpanded ? 'Collapse Timetable' : 'Expand Timetable'}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 8 Time Slots */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              Daily Study Routine (8 Dedicated Slots)
            </h3>
            <div className="space-y-2">
              {DAILY_TIMETABLE.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-slate-100 rounded-md shrink-0">
                      {getSlotIcon(slot.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 truncate">
                          {slot.subject}
                        </span>
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {slot.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {slot.targetInfo}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100/90 border border-slate-200/80 px-2.5 py-1 rounded-md">
                      {slot.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Daily Practice Targets */}
          <div className="lg:col-span-5 bg-slate-50/60 rounded-xl p-4.5 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Daily Practice Targets
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Target: 300+ Qs
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {DAILY_PRACTICE_TARGETS.map((target) => (
                  <div
                    key={target.id}
                    className="p-2.5 bg-white rounded-lg border border-slate-200/70 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        {target.subject}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {target.recommended}
                      </span>
                    </div>
                    <span className="font-bold font-mono text-slate-900 bg-slate-100 text-xs px-2.5 py-1 rounded-md shrink-0 ml-2">
                      {target.targetRange}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>Execution Rule: Strictly adhere to clock timing</span>
              <span className="font-semibold text-slate-700">Total: 14.5 Hours / Day</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
