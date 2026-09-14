import React from 'react';
import { Flame, Languages, Award, BookCheck, History, Target, FileSpreadsheet, Crosshair } from 'lucide-react';
import { CURRENT_AFFAIRS_TOPICS, VOCABULARY_COMPONENTS, POST_PLAN_ROADMAP } from '../data/syllabusData';

export const StrategySection: React.FC = () => {
  return (
    <div className="no-print space-y-8 mb-12">
      {/* 2-Column Grid: Current Affairs & Vocabulary Daily Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Affairs Daily Card */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-200">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Current Affairs — Daily Protocol (8:00–9:00 PM)
                </h3>
                <span className="text-xs text-orange-600 font-semibold">
                  20–30 MCQs + One-Liner Short Notes
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3.5">
              Daily coverage must prioritize recurring SSC question trends across these core domains:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {CURRENT_AFFAIRS_TOPICS.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <span className="font-medium">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
            Tip: Revise previous 6 months of national news monthly compilations alongside daily MCQs.
          </div>
        </div>

        {/* Vocabulary Daily Card */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Vocabulary — Daily Protocol (3:30–5:00 PM)
                </h3>
                <span className="text-xs text-indigo-600 font-semibold">
                  30–40 New Words + Active Spaced Recall
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3.5">
              Build high-accuracy English comprehension through daily balanced distribution:
            </p>

            <div className="space-y-2 text-xs">
              {VOCABULARY_COMPONENTS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800">{item.name}</span>
                  <span className="text-slate-500 text-[11px]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
            Tip: Use BlackBook or Word Power Made Easy + write down mnemonic associations.
          </div>
        </div>
      </div>

      {/* Day 46 Onwards Master Roadmap Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700">
        <div className="max-w-3xl mb-6">
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            Final Exam Sprint
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {POST_PLAN_ROADMAP.title}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            {POST_PLAN_ROADMAP.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 rounded-xl p-4.5 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="p-2 bg-blue-500/20 text-blue-300 w-fit rounded-lg mb-3">
                <History className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                PYQs Practice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solve 2020–2025 Tier-1 papers strictly within 60 minutes to master exam tempo and pacing.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4.5 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="p-2 bg-emerald-500/20 text-emerald-300 w-fit rounded-lg mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Full-Length Mocks
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 Mock daily (9 AM – 10 AM) + 2 hours rigorous post-mock error classification and diagnosis.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4.5 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="p-2 bg-amber-500/20 text-amber-300 w-fit rounded-lg mb-3">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Mistake Notebook
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Revise personal error register daily; eliminate repeated calculation slips and theorem confusion.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4.5 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="p-2 bg-rose-500/20 text-rose-300 w-fit rounded-lg mb-3">
                <Crosshair className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Weak Topic Drills
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Afternoon focus blocks strictly targeting lowest-accuracy chapters to achieve 160+ marks cutoff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
