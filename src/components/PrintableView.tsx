import React from 'react';
import { DAILY_TIMETABLE, DAILY_PRACTICE_TARGETS, SYLLABUS_DAYS } from '../data/syllabusData';

export const PrintableView: React.FC = () => {
  const phase1Days = SYLLABUS_DAYS.filter((d) => d.phase === 1);
  const phase2Days = SYLLABUS_DAYS.filter((d) => d.phase === 2);
  const phase3Days = SYLLABUS_DAYS.filter((d) => d.phase === 3);

  return (
    <div className="print-only text-slate-900 bg-white">
      {/* ================= PAGE 1 ================= */}
      <div className="p-4 print-avoid-break">
        {/* Header Title */}
        <div className="border-b-2 border-slate-900 pb-3 mb-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10pt] font-bold text-emerald-700 tracking-wider uppercase block">
                Official Study Index & Preparation Blueprint
              </span>
              <h1 className="text-[18pt] font-black tracking-tight text-slate-900">
                SSC CHSL 2026 — 45 DAYS SYLLABUS + DAILY PRACTICE
              </h1>
            </div>
            <div className="text-right text-[9pt] font-mono text-slate-600">
              Target: Tier-1 Clear (160+ Marks)
            </div>
          </div>
          <p className="text-[9pt] text-slate-600 mt-1">
            Standard 14.5 Hours Daily Routine • 270–350+ Questions / Day • Structured 3-Phase Chapter Index
          </p>
        </div>

        {/* Daily Timetable Section */}
        <div className="mb-4">
          <h2 className="text-[11pt] font-bold uppercase tracking-wide text-slate-900 mb-1.5 border-b border-slate-300 pb-0.5">
            1. Daily Master Timetable (5:00 AM – 11:00 PM)
          </h2>
          <table className="w-full text-[8.5pt] border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold">
                <th className="border border-slate-400 p-1.5 w-44 text-left">Time Slot</th>
                <th className="border border-slate-400 p-1.5 w-48 text-left">Subject / Component</th>
                <th className="border border-slate-400 p-1.5 w-24 text-center">Duration</th>
                <th className="border border-slate-400 p-1.5 text-left">Target Action & Practice Goal</th>
              </tr>
            </thead>
            <tbody>
              {DAILY_TIMETABLE.map((slot) => (
                <tr key={slot.id} className="even:bg-slate-50">
                  <td className="border border-slate-400 p-1.5 font-bold font-mono text-[8pt]">{slot.time}</td>
                  <td className="border border-slate-400 p-1.5 font-semibold">{slot.subject}</td>
                  <td className="border border-slate-400 p-1.5 text-center font-mono">{slot.duration}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-700">{slot.targetInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Daily Practice Target Section */}
        <div>
          <h2 className="text-[11pt] font-bold uppercase tracking-wide text-slate-900 mb-1.5 border-b border-slate-300 pb-0.5">
            2. Daily Practice Targets (270 – 350+ Questions / Day)
          </h2>
          <table className="w-full text-[8.5pt] border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold">
                <th className="border border-slate-400 p-1.5 text-left w-56">Subject / Area</th>
                <th className="border border-slate-400 p-1.5 text-left w-48">Daily Target Range</th>
                <th className="border border-slate-400 p-1.5 text-left">Scope & Method</th>
              </tr>
            </thead>
            <tbody>
              {DAILY_PRACTICE_TARGETS.map((target) => (
                <tr key={target.id} className="even:bg-slate-50">
                  <td className="border border-slate-400 p-1.5 font-semibold">{target.subject}</td>
                  <td className="border border-slate-400 p-1.5 font-bold font-mono text-[8pt]">{target.targetRange}</td>
                  <td className="border border-slate-400 p-1.5 text-slate-700">{target.recommended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info for page 1 */}
        <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[8pt] text-slate-500">
          <span>SSC CHSL 2026 Master Planner</span>
          <span>Page 1 of 4 (Overview & Timetable)</span>
        </div>
      </div>

      {/* ================= PAGE 2: PHASE 1 INDEX ================= */}
      <div className="p-4 print-break-before">
        <div className="border-b-2 border-blue-600 pb-2 mb-3 flex justify-between items-center">
          <div>
            <h2 className="text-[14pt] font-black text-slate-900 uppercase">
              Phase 1 Index: Day 1 – 15 (Core Foundations & Concepts)
            </h2>
            <span className="text-[8.5pt] text-slate-600">
              Primary objective: Build rigorous foundational command across Arithmetic, Algebra, Geometry, Grammar & Ancient/Medieval History.
            </span>
          </div>
          <span className="text-[9pt] font-bold text-blue-700 bg-blue-50 border border-blue-300 px-2 py-0.5 rounded">
            Days 1–15
          </span>
        </div>

        <table className="w-full text-[8.5pt] border-collapse border border-slate-400">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold">
              <th className="border border-slate-400 p-2 w-16 text-center">Day</th>
              <th className="border border-slate-400 p-2 text-left">Arithmetic Maths</th>
              <th className="border border-slate-400 p-2 text-left">Advanced Maths</th>
              <th className="border border-slate-400 p-2 text-left">Reasoning</th>
              <th className="border border-slate-400 p-2 text-left">English Grammar</th>
              <th className="border border-slate-400 p-2 text-left">GK / General Studies</th>
              <th className="border border-slate-400 p-2 w-12 text-center">Check</th>
            </tr>
          </thead>
          <tbody>
            {phase1Days.map((d) => (
              <tr key={d.day} className={`even:bg-slate-50 ${d.isRevision ? 'bg-amber-50/70 font-semibold' : ''}`}>
                <td className="border border-slate-400 p-2 text-center font-mono font-bold">
                  Day {d.day}
                  {d.isRevision && <span className="block text-[7pt] text-amber-700 font-bold">(REV)</span>}
                </td>
                <td className="border border-slate-400 p-2">{d.arithmetic}</td>
                <td className="border border-slate-400 p-2">{d.advancedMaths}</td>
                <td className="border border-slate-400 p-2">{d.reasoning}</td>
                <td className="border border-slate-400 p-2">{d.english}</td>
                <td className="border border-slate-400 p-2">{d.gkGs}</td>
                <td className="border border-slate-400 p-2 text-center text-slate-400 font-mono text-[9pt]">
                  [ &nbsp; ]
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[8pt] text-slate-500">
          <span>SSC CHSL 2026 Master Planner</span>
          <span>Page 2 of 4 (Phase 1 Index)</span>
        </div>
      </div>

      {/* ================= PAGE 3: PHASE 2 INDEX ================= */}
      <div className="p-4 print-break-before">
        <div className="border-b-2 border-purple-600 pb-2 mb-3 flex justify-between items-center">
          <div>
            <h2 className="text-[14pt] font-black text-slate-900 uppercase">
              Phase 2 Index: Day 16 – 30 (Speed, Application & Mixed Practice)
            </h2>
            <span className="text-[8.5pt] text-slate-600">
              Primary objective: Mensuration, Trigonometry, Non-Verbal reasoning, Active/Passive, Indian Polity & Physics mastery.
            </span>
          </div>
          <span className="text-[9pt] font-bold text-purple-700 bg-purple-50 border border-purple-300 px-2 py-0.5 rounded">
            Days 16–30
          </span>
        </div>

        <table className="w-full text-[8.5pt] border-collapse border border-slate-400">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold">
              <th className="border border-slate-400 p-2 w-16 text-center">Day</th>
              <th className="border border-slate-400 p-2 text-left">Arithmetic Maths</th>
              <th className="border border-slate-400 p-2 text-left">Advanced Maths</th>
              <th className="border border-slate-400 p-2 text-left">Reasoning</th>
              <th className="border border-slate-400 p-2 text-left">English Grammar / Vocab</th>
              <th className="border border-slate-400 p-2 text-left">GK / General Studies</th>
              <th className="border border-slate-400 p-2 w-12 text-center">Check</th>
            </tr>
          </thead>
          <tbody>
            {phase2Days.map((d) => (
              <tr key={d.day} className={`even:bg-slate-50 ${d.isRevision ? 'bg-amber-50/70 font-semibold' : ''}`}>
                <td className="border border-slate-400 p-2 text-center font-mono font-bold">
                  Day {d.day}
                  {d.isRevision && <span className="block text-[7pt] text-amber-700 font-bold">(REV)</span>}
                </td>
                <td className="border border-slate-400 p-2">{d.arithmetic}</td>
                <td className="border border-slate-400 p-2">{d.advancedMaths}</td>
                <td className="border border-slate-400 p-2">{d.reasoning}</td>
                <td className="border border-slate-400 p-2">{d.english}</td>
                <td className="border border-slate-400 p-2">{d.gkGs}</td>
                <td className="border border-slate-400 p-2 text-center text-slate-400 font-mono text-[9pt]">
                  [ &nbsp; ]
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[8pt] text-slate-500">
          <span>SSC CHSL 2026 Master Planner</span>
          <span>Page 3 of 4 (Phase 2 Index)</span>
        </div>
      </div>

      {/* ================= PAGE 4: PHASE 3 INDEX + DAY 46+ ROADMAP ================= */}
      <div className="p-4 print-break-before">
        <div className="border-b-2 border-amber-600 pb-2 mb-3 flex justify-between items-center">
          <div>
            <h2 className="text-[14pt] font-black text-slate-900 uppercase">
              Phase 3 Index: Day 31 – 45 (Mock Drills, Weak Areas & Full Revision)
            </h2>
            <span className="text-[8.5pt] text-slate-600">
              Primary objective: Data Interpretation, Chemistry, Biology, reading comprehension & all-India pattern marathons.
            </span>
          </div>
          <span className="text-[9pt] font-bold text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded">
            Days 31–45
          </span>
        </div>

        <table className="w-full text-[8.2pt] border-collapse border border-slate-400 mb-3">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold">
              <th className="border border-slate-400 p-1.5 w-16 text-center">Day</th>
              <th className="border border-slate-400 p-1.5 text-left">Arithmetic Maths</th>
              <th className="border border-slate-400 p-1.5 text-left">Advanced Maths</th>
              <th className="border border-slate-400 p-1.5 text-left">Reasoning</th>
              <th className="border border-slate-400 p-1.5 text-left">English Grammar / Vocab</th>
              <th className="border border-slate-400 p-1.5 text-left">GK / General Studies</th>
              <th className="border border-slate-400 p-1.5 w-12 text-center">Check</th>
            </tr>
          </thead>
          <tbody>
            {phase3Days.map((d) => (
              <tr key={d.day} className={`even:bg-slate-50 ${d.isRevision ? 'bg-amber-50/70 font-semibold' : ''}`}>
                <td className="border border-slate-400 p-1.5 text-center font-mono font-bold">
                  Day {d.day}
                  {d.isRevision && <span className="block text-[6.5pt] text-amber-700 font-bold">(REV)</span>}
                </td>
                <td className="border border-slate-400 p-1.5">{d.arithmetic}</td>
                <td className="border border-slate-400 p-1.5">{d.advancedMaths}</td>
                <td className="border border-slate-400 p-1.5">{d.reasoning}</td>
                <td className="border border-slate-400 p-1.5">{d.english}</td>
                <td className="border border-slate-400 p-1.5">{d.gkGs}</td>
                <td className="border border-slate-400 p-1.5 text-center text-slate-400 font-mono text-[9pt]">
                  [ &nbsp; ]
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Day 46 Onwards Strategy Box */}
        <div className="border border-slate-400 bg-slate-50 p-2.5 rounded">
          <h3 className="text-[9.5pt] font-bold uppercase tracking-wider text-slate-900 mb-1">
            Day 46 Onwards Strategy: PYQs + Mock Tests + Weak Topics
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[8pt] text-slate-700">
            <div>
              <strong>1. Previous Year Questions (PYQs):</strong> Solve 2020–2025 Tier-1 papers in 60-min timed conditions.
            </div>
            <div>
              <strong>2. Daily Mock Tests:</strong> 1 Full test every morning (9–10 AM) + 2 hours in-depth answer diagnosis.
            </div>
            <div>
              <strong>3. Formula & Error Register:</strong> Revise personal mistakes book, tricky idioms, and geometry formulas.
            </div>
            <div>
              <strong>4. Weak Topic Surgical Drills:</strong> Target lowest-scoring chapters to guarantee 160+ marks.
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between text-[8pt] text-slate-500">
          <span>SSC CHSL 2026 Master Planner</span>
          <span>Page 4 of 4 (Phase 3 Index & Day 46+ Strategy)</span>
        </div>
      </div>
    </div>
  );
};
