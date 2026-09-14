import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Target, 
  RotateCcw,
  User as UserIcon,
  LogOut,
  Smartphone,
  Cloud,
  CloudCheck,
  ChevronDown
} from 'lucide-react';
import { AppUser } from '../types';
import { maskPhoneNumber, maskEmail, secureWipeAllLocalData } from '../utils/security';

interface HeaderProps {
  completedDaysCount: number;
  totalDays: number;
  onDownloadPDF: () => void;
  onPrint: () => void;
  isGeneratingPDF: boolean;
  showPrintPreview: boolean;
  onTogglePrintPreview: () => void;
  onResetProgress: () => void;
  currentUser: AppUser | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  completedDaysCount,
  totalDays,
  onDownloadPDF,
  onPrint,
  isGeneratingPDF,
  showPrintPreview,
  onTogglePrintPreview,
  onResetProgress,
  currentUser,
  onOpenAuthModal,
  onSignOut,
  isSyncing = false
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const percentage = Math.round((completedDaysCount / totalDays) * 100);

  return (
    <header className="no-print bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                SSC CHSL 2026 TIER-1 READY
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                45 Days Master Plan
              </span>
              {currentUser && (
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Cloud className="w-3 h-3 text-indigo-400" />
                  Cloud Connected
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              SSC CHSL 2026 — 45 Days Syllabus & Daily Practice Index
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
              Properly spaced structured study index, daily 14.5-hour timetable, 300+ questions target, and printable A4 PDF export.
            </p>
          </div>

          {/* Action Buttons & Auth */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-700 shadow-xs cursor-pointer transition-colors"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Avatar" 
                      className="w-5 h-5 rounded-full object-cover border border-emerald-400" 
                      referrerPolicy="no-referrer"
                    />
                  ) : currentUser.authProvider === 'phone' ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                      <Smartphone className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-indigo-700 text-white flex items-center justify-center text-[10px] font-bold">
                      {(currentUser.displayName || 'U')[0].toUpperCase()}
                    </div>
                  )}

                  <div className="text-left">
                    <span className="block font-bold text-xs text-white max-w-[110px] truncate">
                      {currentUser.displayName || (currentUser.phoneNumber ? currentUser.phoneNumber : 'Aspirant')}
                    </span>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showUserDropdown && (
                  <div 
                    className="absolute right-0 mt-1.5 w-60 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentUser.displayName || 'SSC Aspirant'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate font-mono mt-0.5">
                        {currentUser.phoneNumber 
                          ? maskPhoneNumber(currentUser.phoneNumber) 
                          : (currentUser.email ? maskEmail(currentUser.email) : 'Cloud Account')}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                          {currentUser.authProvider === 'phone' ? '📱 Verified Mobile' : '🌐 Verified Google'}
                        </span>
                        <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                          🔒 Encrypted
                        </span>
                      </div>
                    </div>

                    <div className="px-2 py-1 space-y-1">
                      <div className="px-2 py-1 text-[11px] text-slate-600 flex items-center justify-between">
                        <span>Database Protection</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          ● Zero-Trust
                        </span>
                      </div>
                      <div className="px-2 py-1 text-[11px] text-slate-600 flex items-center justify-between">
                        <span>Access Isolation</span>
                        <span className="text-indigo-600 font-bold">
                          User Only
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-1 px-1 space-y-0.5">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          onSignOut();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-slate-500" />
                        <span>Log Out</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('Wipe all local study progress and session cache on this device? (Your cloud progress remains safely backed up)')) {
                            setShowUserDropdown(false);
                            secureWipeAllLocalData();
                            onSignOut();
                          }
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                        title="Recommended if using a cyber cafe, library, or shared device"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                        <span>Wipe Local Device Cache</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="login-btn"
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                title="Log in with Mobile Number or Google"
              >
                <div className="flex items-center -space-x-1">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Log In / Sign Up</span>
              </button>
            )}

            <button
              id="download-pdf-btn"
              onClick={onDownloadPDF}
              disabled={isGeneratingPDF}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all duration-150 cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              title="Download clean multi-page PDF"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
            </button>

            <button
              id="print-btn"
              onClick={onPrint}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm px-4 py-2.5 rounded-lg border border-slate-700 shadow-sm transition-all duration-150 cursor-pointer focus:ring-2 focus:ring-slate-400 focus:outline-none"
              title="Print directly or Save as PDF with browser print"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              Print / Save PDF (A4)
            </button>

            <button
              id="preview-toggle-btn"
              onClick={onTogglePrintPreview}
              className={`inline-flex items-center gap-2 font-medium text-sm px-3.5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer focus:outline-none ${
                showPrintPreview
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle printable index sheet view"
            >
              <Eye className="w-4 h-4" />
              {showPrintPreview ? 'Exit Print View' : 'Print Preview'}
            </button>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 bg-slate-800/60 px-3.5 py-2 rounded-md border border-slate-700/50">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] leading-tight">Timeline</span>
              <span className="font-semibold text-slate-100">45 Days Plan</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 px-3.5 py-2 rounded-md border border-slate-700/50">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] leading-tight">Daily Hours</span>
              <span className="font-semibold text-slate-100">14.5 Hours / Day</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-800/60 px-3.5 py-2 rounded-md border border-slate-700/50">
            <Target className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] leading-tight">Daily Questions</span>
              <span className="font-semibold text-slate-100">270–350+ Questions</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-800/60 px-3.5 py-2 rounded-md border border-slate-700/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px] leading-tight">Progress</span>
                <span className="font-semibold text-slate-100">{completedDaysCount} / {totalDays} Days ({percentage}%)</span>
              </div>
            </div>
            {completedDaysCount > 0 && (
              <button
                onClick={onResetProgress}
                className="text-slate-400 hover:text-red-300 text-xs p-1"
                title="Reset progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </header>
  );
};

