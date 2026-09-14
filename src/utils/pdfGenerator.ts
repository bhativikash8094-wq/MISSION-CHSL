import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DAILY_TIMETABLE, DAILY_PRACTICE_TARGETS, SYLLABUS_DAYS, CURRENT_AFFAIRS_TOPICS, VOCABULARY_COMPONENTS, POST_PLAN_ROADMAP } from '../data/syllabusData';

export const generateSyllabusPDF = () => {
  // Create landscape A4 document for wide, readable index tables with proper spacing
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper for footer
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'SSC CHSL 2026 — 45 Days Master Syllabus & Daily Practice Index | Structured Routine & Target Tracker',
      14,
      pageHeight - 8
    );
    doc.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth - 25,
      pageHeight - 8
    );
  };

  // ================= PAGE 1: COVER, TIMETABLE & PRACTICE TARGETS =================
  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SSC CHSL 2026 — 45 DAYS SYLLABUS + DAILY PRACTICE INDEX', 14, 12);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Master Daily Timetable (14.5 Hours) • Daily Question Targets (300+ Qs/Day) • Subject Breakdown', 14, 20);

  // Decorative Accent line
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 26.5, pageWidth, 1.5, 'F');

  // Section 1: Daily Timetable Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('DAILY MASTER TIMETABLE (5:00 AM – 11:00 PM)', 14, 36);

  const timetableRows = DAILY_TIMETABLE.map(slot => [
    slot.time,
    slot.subject,
    slot.duration,
    slot.targetInfo
  ]);

  autoTable(doc, {
    startY: 39,
    head: [['Time Slot', 'Subject / Focus', 'Duration', 'Daily Action Plan & Practice Goal']],
    body: timetableRows,
    theme: 'grid',
    styles: {
      fontSize: 8.5,
      cellPadding: { top: 2.2, bottom: 2.2, left: 3, right: 3 },
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.15
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: 'bold' },
      1: { cellWidth: 45, fontStyle: 'bold' },
      2: { cellWidth: 24, halign: 'center' },
      3: { cellWidth: 'auto' }
    },
    margin: { left: 14, right: 14 }
  });

  // Section 2: Daily Practice Target Table
  const lastY1 = (doc as any).lastAutoTable.finalY || 105;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('DAILY PRACTICE TARGETS (270 – 350+ QUESTIONS / DAY)', 14, lastY1 + 8);

  const targetRows = [
    ['Arithmetic Maths', '40 – 50 Questions', 'Standard Speed Drills & Formulas'],
    ['Advanced Maths', '30 – 40 Questions', 'Theorems, Geometry, Mensuration & Trig'],
    ['Reasoning Ability', '40 – 50 Questions', 'Verbal + Non-Verbal Mixed Practice Sets'],
    ['English Grammar', '30 – 40 Questions', 'Error Detection & Sentence Improvement'],
    ['English Vocabulary', '30 – 40 New Words + Revision', 'Synonyms, Antonyms, OWS, Idioms & Spelling'],
    ['GK / General Studies', '30 – 40 Questions', 'History, Polity, Economics, Science & PYQs'],
    ['Current Affairs', '20 – 30 MCQs + Short Notes', 'National, Schemes, Sports, Defence & Awards'],
    ['Maths Practice + Revision', '40 – 50 Mixed Questions', 'Night Speed Drilling & Daily Weak Area Recall']
  ];

  autoTable(doc, {
    startY: lastY1 + 11,
    head: [['Subject / Component', 'Daily Target Range', 'Recommended Practice Scope']],
    body: targetRows,
    theme: 'grid',
    styles: {
      fontSize: 8.5,
      cellPadding: { top: 1.8, bottom: 1.8, left: 3, right: 3 },
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.15
    },
    headStyles: {
      fillColor: [16, 185, 129], // emerald
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 55, fontStyle: 'bold' },
      2: { cellWidth: 'auto' }
    },
    margin: { left: 14, right: 14 }
  });

  // Footer for page 1
  addFooter(1, 4);

  // ================= PAGE 2: PHASE 1 INDEX (DAY 1 – 15) =================
  doc.addPage('a4', 'landscape');

  // Header Bar
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setFillColor(59, 130, 246); // blue
  doc.rect(0, 19, pageWidth, 1, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('PHASE 1 STUDY INDEX: DAY 1 – 15 (Core Foundations & Concepts)', 14, 12);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Complete topic tracking with generous spacing for revisions and personal checklist', 14, 17);

  const phase1Days = SYLLABUS_DAYS.filter(d => d.phase === 1);
  const phase1Rows = phase1Days.map(d => [
    `Day ${d.day}${d.isRevision ? ' (Rev)' : ''}`,
    d.arithmetic,
    d.advancedMaths,
    d.reasoning,
    d.english,
    d.gkGs,
    '[  ]'
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Day', 'Arithmetic Maths', 'Advanced Maths', 'Reasoning', 'English Grammar', 'GK / General Studies', 'Check']],
    body: phase1Rows,
    theme: 'grid',
    styles: {
      fontSize: 8.5,
      cellPadding: { top: 3.2, bottom: 3.2, left: 3, right: 3 },
      textColor: [30, 41, 59],
      lineColor: [203, 213, 225],
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 24, fontStyle: 'bold', halign: 'center' },
      1: { cellWidth: 46 },
      2: { cellWidth: 46 },
      3: { cellWidth: 46 },
      4: { cellWidth: 46 },
      5: { cellWidth: 46 },
      6: { cellWidth: 15, halign: 'center', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  addFooter(2, 4);

  // ================= PAGE 3: PHASE 2 INDEX (DAY 16 – 30) =================
  doc.addPage('a4', 'landscape');

  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setFillColor(168, 85, 247); // purple
  doc.rect(0, 19, pageWidth, 1, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('PHASE 2 STUDY INDEX: DAY 16 – 30 (Speed, Application & Mixed Drills)', 14, 12);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Deepening calculation velocity, non-verbal reasoning, and polity/economics/physics foundations', 14, 17);

  const phase2Days = SYLLABUS_DAYS.filter(d => d.phase === 2);
  const phase2Rows = phase2Days.map(d => [
    `Day ${d.day}${d.isRevision ? ' (Rev)' : ''}`,
    d.arithmetic,
    d.advancedMaths,
    d.reasoning,
    d.english,
    d.gkGs,
    '[  ]'
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Day', 'Arithmetic Maths', 'Advanced Maths', 'Reasoning', 'English Grammar / Vocab', 'GK / General Studies', 'Check']],
    body: phase2Rows,
    theme: 'grid',
    styles: {
      fontSize: 8.5,
      cellPadding: { top: 3.2, bottom: 3.2, left: 3, right: 3 },
      textColor: [30, 41, 59],
      lineColor: [203, 213, 225],
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 24, fontStyle: 'bold', halign: 'center' },
      1: { cellWidth: 46 },
      2: { cellWidth: 46 },
      3: { cellWidth: 46 },
      4: { cellWidth: 46 },
      5: { cellWidth: 46 },
      6: { cellWidth: 15, halign: 'center', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  addFooter(3, 4);

  // ================= PAGE 4: PHASE 3 INDEX (DAY 31 – 45) + DAY 46+ ROADMAP =================
  doc.addPage('a4', 'landscape');

  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setFillColor(234, 88, 12); // orange
  doc.rect(0, 19, pageWidth, 1, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('PHASE 3 STUDY INDEX: DAY 31 – 45 (Mock Drills, Weak Areas & Full Revision)', 14, 12);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Data Interpretation, full syllabus marathons, error rectification & Day 46 onwards roadmap', 14, 17);

  const phase3Days = SYLLABUS_DAYS.filter(d => d.phase === 3);
  const phase3Rows = phase3Days.map(d => [
    `Day ${d.day}${d.isRevision ? ' (Rev)' : ''}`,
    d.arithmetic,
    d.advancedMaths,
    d.reasoning,
    d.english,
    d.gkGs,
    '[  ]'
  ]);

  autoTable(doc, {
    startY: 24,
    head: [['Day', 'Arithmetic Maths', 'Advanced Maths', 'Reasoning', 'English Grammar / Vocab', 'GK / General Studies', 'Check']],
    body: phase3Rows,
    theme: 'grid',
    styles: {
      fontSize: 8.2,
      cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
      textColor: [30, 41, 59],
      lineColor: [203, 213, 225],
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.8
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 24, fontStyle: 'bold', halign: 'center' },
      1: { cellWidth: 46 },
      2: { cellWidth: 46 },
      3: { cellWidth: 46 },
      4: { cellWidth: 46 },
      5: { cellWidth: 46 },
      6: { cellWidth: 15, halign: 'center', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  const lastY3 = (doc as any).lastAutoTable.finalY || 145;

  // Day 46 Onwards Banner & Strategy Box
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, lastY3 + 4, pageWidth - 28, 42, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, lastY3 + 4, pageWidth - 28, 42, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('DAY 46 ONWARDS — PYQs, FULL MOCK TESTS & FINAL SPRINT ROADMAP', 20, lastY3 + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('1. Previous Year Papers (PYQs): Solve 2020–2025 Tier-1 papers under strict 60-minute real exam conditions.', 20, lastY3 + 19);
  doc.text('2. Daily Mock Test + 2-Hour Analysis: 1 Full-length mock every morning. Categorize errors into silly mistake, conceptual, or time lapse.', 20, lastY3 + 25);
  doc.text('3. Daily Mistake Register Revision: Revise personal formula sheet, geometry proofs, and recurrent idioms/OWS.', 20, lastY3 + 31);
  doc.text('4. Targeted Weak Subject Sprints: Devote afternoons exclusively to low-scoring chapters to guarantee 160+ marks in SSC CHSL.', 20, lastY3 + 37);

  addFooter(4, 4);

  // Save the PDF
  doc.save('SSC_CHSL_2026_45_Days_Syllabus_Index_Planner.pdf');
};
