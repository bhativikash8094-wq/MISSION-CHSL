import { DayPlan, TimetableSlot, DailyPracticeTarget } from '../types';

export const DAILY_TIMETABLE: TimetableSlot[] = [
  {
    id: 'slot-1',
    time: '5:00 AM – 7:30 AM',
    subject: 'Arithmetic Maths',
    duration: '2h 30m',
    category: 'arithmetic',
    icon: 'Calculator',
    targetInfo: 'Concept building & 40–50 targeted topic questions'
  },
  {
    id: 'slot-2',
    time: '8:00 AM – 10:00 AM',
    subject: 'Reasoning Ability',
    duration: '2h 00m',
    category: 'reasoning',
    icon: 'Brain',
    targetInfo: 'Logic building, tricks & 40–50 practice questions'
  },
  {
    id: 'slot-3',
    time: '10:30 AM – 12:30 PM',
    subject: 'English Grammar',
    duration: '2h 00m',
    category: 'english',
    icon: 'BookOpen',
    targetInfo: 'Rules, error identification & 30–40 exercise questions'
  },
  {
    id: 'slot-4',
    time: '1:30 PM – 3:00 PM',
    subject: 'GK / General Studies',
    duration: '1h 30m',
    category: 'gk',
    icon: 'Globe',
    targetInfo: 'NCERT / Lucent / PYQs concept & 30–40 questions'
  },
  {
    id: 'slot-5',
    time: '3:30 PM – 5:00 PM',
    subject: 'English Vocabulary',
    duration: '1h 30m',
    category: 'vocab',
    icon: 'Languages',
    targetInfo: '30–40 new words (Syno, Anto, OWS, Idioms) + daily recall'
  },
  {
    id: 'slot-6',
    time: '5:30 PM – 7:30 PM',
    subject: 'Advanced Maths',
    duration: '2h 00m',
    category: 'advanced',
    icon: 'Sigma',
    targetInfo: 'Theorems, formulas & 30–40 targeted questions'
  },
  {
    id: 'slot-7',
    time: '8:00 PM – 9:00 PM',
    subject: 'Current Affairs',
    duration: '1h 00m',
    category: 'ca',
    icon: 'Flame',
    targetInfo: 'Daily news compilation, 20–30 MCQs & quick short notes'
  },
  {
    id: 'slot-8',
    time: '9:00 PM – 11:00 PM',
    subject: 'Maths Practice + Revision',
    duration: '2h 00m',
    category: 'practice',
    icon: 'CheckCircle2',
    targetInfo: '40–50 mixed speed drill questions & full daily recall'
  }
];

export const DAILY_PRACTICE_TARGETS: DailyPracticeTarget[] = [
  {
    id: 'target-1',
    subject: 'Arithmetic Maths',
    targetRange: '40 – 50 Questions',
    recommended: 'Standard Speed Drills & Formula Application',
    category: 'Maths'
  },
  {
    id: 'target-2',
    subject: 'Advanced Maths',
    targetRange: '30 – 40 Questions',
    recommended: 'Algebra, Geometry, Mensuration & Trig',
    category: 'Maths'
  },
  {
    id: 'target-3',
    subject: 'General Intelligence & Reasoning',
    targetRange: '40 – 50 Questions',
    recommended: 'Both Verbal & Non-Verbal Practice Sets',
    category: 'Reasoning'
  },
  {
    id: 'target-4',
    subject: 'English Grammar',
    targetRange: '30 – 40 Questions',
    recommended: 'Spotting Errors & Sentence Improvement',
    category: 'English'
  },
  {
    id: 'target-5',
    subject: 'Vocabulary Building',
    targetRange: '30 – 40 New Words + Revision',
    recommended: 'Synonyms, Antonyms, OWS, Idioms & Spelling',
    category: 'English'
  },
  {
    id: 'target-6',
    subject: 'General Awareness (GK/GS)',
    targetRange: '30 – 40 Questions',
    recommended: 'History, Polity, Geography, Science & Static',
    category: 'GK/GS'
  },
  {
    id: 'target-7',
    subject: 'Current Affairs',
    targetRange: '20 – 30 MCQs + Notes',
    recommended: 'Daily National, International, Schemes & Sports',
    category: 'Current Affairs'
  },
  {
    id: 'target-8',
    subject: 'Maths Mixed Speed Practice',
    targetRange: '40 – 50 Mixed Questions',
    recommended: 'Timed sectional tests & mock-pattern questions',
    category: 'Revision'
  }
];

export const CURRENT_AFFAIRS_TOPICS = [
  'National & International Affairs',
  'Government Schemes & Portals',
  'Important Appointments & Resignations',
  'Awards, Honors & Nobel Prizes',
  'Sports Events & Winners (Cricket, Olympics, Grand Slams)',
  'Defence, Military Exercises & Missiles',
  'Science, Tech & Space Missions (ISRO, NASA)',
  'Indian Economy, Indices & Reports',
  'Important Days, Weeks & Themes',
  '20–30 Daily MCQs + One-Liner Short Notes'
];

export const VOCABULARY_COMPONENTS = [
  { name: '30–40 New Words', desc: 'Daily word power foundation' },
  { name: 'Synonyms', desc: 'Contextual similarity and nuances' },
  { name: 'Antonyms', desc: 'Contrasting terms and opposites' },
  { name: 'One Word Substitution', desc: 'High frequency SSC recurring phrases' },
  { name: 'Idioms & Phrases', desc: 'Figurative expressions and usage' },
  { name: 'Spelling Rules', desc: 'Commonly misspelled examination words' },
  { name: 'Previous Words Revision', desc: 'Active spaced recall of Day 1 to current' }
];

export const SYLLABUS_DAYS: DayPlan[] = [
  // DAY 1 - 15 (Phase 1)
  {
    day: 1,
    phase: 1,
    arithmetic: 'Number System',
    advancedMaths: 'Algebra Basics',
    reasoning: 'Analogy',
    english: 'Parts of Speech',
    gkGs: 'Ancient India'
  },
  {
    day: 2,
    phase: 1,
    arithmetic: 'Simplification',
    advancedMaths: 'Algebraic Identities',
    reasoning: 'Classification',
    english: 'Noun',
    gkGs: 'Indus Valley'
  },
  {
    day: 3,
    phase: 1,
    arithmetic: 'LCM & HCF',
    advancedMaths: 'Linear Equations',
    reasoning: 'Number Series',
    english: 'Pronoun',
    gkGs: 'Vedic Age'
  },
  {
    day: 4,
    phase: 1,
    arithmetic: 'Percentage-I',
    advancedMaths: 'Quadratic Equations',
    reasoning: 'Alphabet Series',
    english: 'Verb',
    gkGs: 'Buddhism & Jainism'
  },
  {
    day: 5,
    phase: 1,
    arithmetic: 'Percentage-II',
    advancedMaths: 'Surds & Indices',
    reasoning: 'Coding-Decoding',
    english: 'Tense-I',
    gkGs: 'Maurya Empire'
  },
  {
    day: 6,
    phase: 1,
    arithmetic: 'Ratio',
    advancedMaths: 'Geometry Basics',
    reasoning: 'Blood Relation',
    english: 'Tense-II',
    gkGs: 'Gupta Empire'
  },
  {
    day: 7,
    phase: 1,
    arithmetic: 'Revision',
    advancedMaths: 'Revision',
    reasoning: 'Revision',
    english: 'Revision',
    gkGs: 'History Revision',
    isRevision: true
  },
  {
    day: 8,
    phase: 1,
    arithmetic: 'Average',
    advancedMaths: 'Lines & Angles',
    reasoning: 'Direction',
    english: 'Subject-Verb Agreement',
    gkGs: 'Medieval India'
  },
  {
    day: 9,
    phase: 1,
    arithmetic: 'Profit & Loss',
    advancedMaths: 'Triangle',
    reasoning: 'Ranking & Order',
    english: 'Articles',
    gkGs: 'Delhi Sultanate'
  },
  {
    day: 10,
    phase: 1,
    arithmetic: 'Discount',
    advancedMaths: 'Triangle Advanced',
    reasoning: 'Mathematical Operations',
    english: 'Preposition',
    gkGs: 'Mughal Empire'
  },
  {
    day: 11,
    phase: 1,
    arithmetic: 'Simple Interest',
    advancedMaths: 'Quadrilateral',
    reasoning: 'Syllogism',
    english: 'Conjunction',
    gkGs: 'Bhakti & Sufi Movement'
  },
  {
    day: 12,
    phase: 1,
    arithmetic: 'Compound Interest',
    advancedMaths: 'Circle',
    reasoning: 'Venn Diagram',
    english: 'Adjective',
    gkGs: 'Modern History'
  },
  {
    day: 13,
    phase: 1,
    arithmetic: 'Partnership',
    advancedMaths: 'Circle Advanced',
    reasoning: 'Statement & Conclusion',
    english: 'Adverb',
    gkGs: 'Revolt of 1857'
  },
  {
    day: 14,
    phase: 1,
    arithmetic: 'Arithmetic Revision',
    advancedMaths: 'Geometry Revision',
    reasoning: 'Revision',
    english: 'Grammar Revision',
    gkGs: 'Freedom Movement',
    isRevision: true
  },
  {
    day: 15,
    phase: 1,
    arithmetic: 'Mixture & Alligation',
    advancedMaths: 'Trigonometry Basics',
    reasoning: 'Missing Number',
    english: 'Error Detection',
    gkGs: 'Modern India Revision',
    isRevision: true
  },

  // DAY 16 - 30 (Phase 2)
  {
    day: 16,
    phase: 2,
    arithmetic: 'Time & Work',
    advancedMaths: 'Trigonometric Ratios',
    reasoning: 'Mirror Image',
    english: 'Error Detection',
    gkGs: 'Constitution'
  },
  {
    day: 17,
    phase: 2,
    arithmetic: 'Work & Wages',
    advancedMaths: 'Height & Distance',
    reasoning: 'Water Image',
    english: 'Sentence Improvement',
    gkGs: 'Fundamental Rights'
  },
  {
    day: 18,
    phase: 2,
    arithmetic: 'Pipes & Cisterns',
    advancedMaths: 'Mensuration 2D',
    reasoning: 'Paper Folding',
    english: 'Active/Passive',
    gkGs: 'Parliament'
  },
  {
    day: 19,
    phase: 2,
    arithmetic: 'Time-Speed-Distance',
    advancedMaths: 'Mensuration 3D',
    reasoning: 'Paper Cutting',
    english: 'Active/Passive',
    gkGs: 'President / PM'
  },
  {
    day: 20,
    phase: 2,
    arithmetic: 'Train',
    advancedMaths: 'Coordinate Geometry',
    reasoning: 'Figure Counting',
    english: 'Narration',
    gkGs: 'Judiciary'
  },
  {
    day: 21,
    phase: 2,
    arithmetic: 'Boat & Stream',
    advancedMaths: 'Advanced Geometry',
    reasoning: 'Embedded Figure',
    english: 'Direct / Indirect',
    gkGs: 'Constitutional Bodies'
  },
  {
    day: 22,
    phase: 2,
    arithmetic: 'Full Revision',
    advancedMaths: 'Revision',
    reasoning: 'Revision',
    english: 'Revision',
    gkGs: 'Polity Revision',
    isRevision: true
  },
  {
    day: 23,
    phase: 2,
    arithmetic: 'Percentage + Ratio Mixed',
    advancedMaths: 'Algebra Mixed',
    reasoning: 'Dice',
    english: 'Fill in the Blanks',
    gkGs: 'Economics Basics'
  },
  {
    day: 24,
    phase: 2,
    arithmetic: 'Profit-Loss Mixed',
    advancedMaths: 'Trigonometry Mixed',
    reasoning: 'Cube',
    english: 'Cloze Test',
    gkGs: 'GDP / Inflation'
  },
  {
    day: 25,
    phase: 2,
    arithmetic: 'SI / CI Mixed',
    advancedMaths: 'Mensuration Mixed',
    reasoning: 'Counting Figures',
    english: 'Synonyms Practice',
    gkGs: 'Banking System'
  },
  {
    day: 26,
    phase: 2,
    arithmetic: 'Average / Mixture',
    advancedMaths: 'Geometry Mixed',
    reasoning: 'Pattern',
    english: 'Antonyms Practice',
    gkGs: 'Money & Monetary Policy'
  },
  {
    day: 27,
    phase: 2,
    arithmetic: 'Time & Work Mixed',
    advancedMaths: 'Algebra + Geometry',
    reasoning: 'Non-Verbal Mixed',
    english: 'One Word Substitution',
    gkGs: 'Physics: Units & Measurement'
  },
  {
    day: 28,
    phase: 2,
    arithmetic: 'TSD Mixed',
    advancedMaths: 'Trigonometry + Mensuration',
    reasoning: 'Verbal Mixed',
    english: 'Spelling Rules',
    gkGs: 'Physics: Motion & Force'
  },
  {
    day: 29,
    phase: 2,
    arithmetic: 'Partnership',
    advancedMaths: 'Advanced Mixed',
    reasoning: 'Reasoning Mixed',
    english: 'Vocabulary Revision',
    gkGs: 'Physics: Work, Energy & Power'
  },
  {
    day: 30,
    phase: 2,
    arithmetic: 'Arithmetic Revision',
    advancedMaths: 'Advanced Revision',
    reasoning: 'Full Revision',
    english: 'Grammar + Vocab Revision',
    gkGs: 'Physics Full Revision',
    isRevision: true
  },

  // DAY 31 - 45 (Phase 3)
  {
    day: 31,
    phase: 3,
    arithmetic: 'Data Interpretation',
    advancedMaths: 'Algebra',
    reasoning: 'Series Mixed',
    english: 'Reading Comprehension',
    gkGs: 'Chemistry — Matter'
  },
  {
    day: 32,
    phase: 3,
    arithmetic: 'DI + Percentage',
    advancedMaths: 'Geometry',
    reasoning: 'Coding Mixed',
    english: 'Para Jumble',
    gkGs: 'Chemistry — Atom / Molecule'
  },
  {
    day: 33,
    phase: 3,
    arithmetic: 'DI + Ratio',
    advancedMaths: 'Trigonometry',
    reasoning: 'Syllogism + Venn',
    english: 'Cloze Test',
    gkGs: 'Chemistry — Chemical Reactions'
  },
  {
    day: 34,
    phase: 3,
    arithmetic: 'Arithmetic Mixed',
    advancedMaths: 'Mensuration',
    reasoning: 'Non-Verbal Mixed',
    english: 'Error Detection',
    gkGs: 'Biology — Cell'
  },
  {
    day: 35,
    phase: 3,
    arithmetic: 'Weak Topics Analysis',
    advancedMaths: 'Weak Topics Analysis',
    reasoning: 'Weak Topics Analysis',
    english: 'Grammar Weak Topics',
    gkGs: 'Biology — Human Body',
    isRevision: true
  },
  {
    day: 36,
    phase: 3,
    arithmetic: 'Percentage + Profit/Loss',
    advancedMaths: 'Algebra + Trigonometry',
    reasoning: 'Mixed Practice Set',
    english: 'Tense + Voice Drills',
    gkGs: 'Biology — Plant Biology'
  },
  {
    day: 37,
    phase: 3,
    arithmetic: 'SI/CI + Average',
    advancedMaths: 'Geometry + Mensuration',
    reasoning: 'Mixed Practice Set',
    english: 'Narration + Grammar',
    gkGs: 'Biology — Diseases & Nutrition'
  },
  {
    day: 38,
    phase: 3,
    arithmetic: 'Work + Pipes',
    advancedMaths: 'Advanced Mixed',
    reasoning: 'Mixed Practice Set',
    english: 'Vocabulary Rapid Fire',
    gkGs: 'Environment'
  },
  {
    day: 39,
    phase: 3,
    arithmetic: 'TSD + Boats',
    advancedMaths: 'Advanced Mixed',
    reasoning: 'Mixed Practice Set',
    english: 'RC + Cloze Test',
    gkGs: 'Ecology'
  },
  {
    day: 40,
    phase: 3,
    arithmetic: 'Full Arithmetic Revision',
    advancedMaths: 'Full Advanced Revision',
    reasoning: 'Full Reasoning Revision',
    english: 'Full Grammar Revision',
    gkGs: 'Biology + Environment Revision',
    isRevision: true
  },
  {
    day: 41,
    phase: 3,
    arithmetic: 'Data Interpretation',
    advancedMaths: 'Geometry',
    reasoning: 'Weak Areas Drill',
    english: 'Vocab Comprehensive Revision',
    gkGs: 'Static GK Focus'
  },
  {
    day: 42,
    phase: 3,
    arithmetic: 'Arithmetic Mixed',
    advancedMaths: 'Trigonometry',
    reasoning: 'Weak Areas Drill',
    english: 'English Mixed Test',
    gkGs: 'Sports & Awards'
  },
  {
    day: 43,
    phase: 3,
    arithmetic: 'Arithmetic Weak Areas',
    advancedMaths: 'Algebra / Mensuration',
    reasoning: 'Full Mixed Test',
    english: 'English Weak Areas Drill',
    gkGs: 'Books, Authors & Important Days'
  },
  {
    day: 44,
    phase: 3,
    arithmetic: 'Complete Arithmetic Marathon',
    advancedMaths: 'Complete Advanced Marathon',
    reasoning: 'Complete Reasoning Marathon',
    english: 'Complete English Marathon',
    gkGs: 'Complete GK/GS Marathon',
    isRevision: true
  },
  {
    day: 45,
    phase: 3,
    arithmetic: 'Final Maths Grand Revision',
    advancedMaths: 'Final Advanced Grand Revision',
    reasoning: 'Final Reasoning Grand Revision',
    english: 'Final English Grand Revision',
    gkGs: 'Final GK/GS Grand Revision',
    isRevision: true
  }
];

export const POST_PLAN_ROADMAP = {
  title: 'DAY 46 ONWARDS — MISSION SSC CHSL 2026',
  subtitle: 'Transition from Chapter Mastery to Full-Length Test Acumen',
  pillars: [
    {
      title: 'Previous Years Questions (PYQs)',
      desc: 'Solve 2020–2025 SSC CHSL & CGL Tier-1 Shift-wise papers under strict 60-minute time limits.',
      icon: 'History'
    },
    {
      title: 'Full-Length Mock Tests',
      desc: '1 Mock every morning (9 AM - 10 AM) + 2 hours in-depth test analysis marking unattempted & negative marks.',
      icon: 'Target'
    },
    {
      title: 'Formula & Error Notebook',
      desc: 'Daily 1-hour active recall of personal mistake book, advanced geometry theorems, and hard vocabulary.',
      icon: 'FileSpreadsheet'
    },
    {
      title: 'Weak Topic Surgical Drills',
      desc: 'Dedicate afternoons strictly to clearing high-error frequency chapters identified during mock tests.',
      icon: 'Crosshair'
    }
  ]
};
