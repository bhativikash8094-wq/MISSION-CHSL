import React from 'react';
import { X, Printer, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PrintableView } from './PrintableView';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  onPrint,
  onDownloadPDF,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs no-print">
      <div className="bg-slate-100 rounded-2xl shadow-2xl border border-slate-300 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Toolbar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-base text-white">
              Print & PDF Preview (A4 Landscape Layout)
            </h3>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
              4 Pages Formatted
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadPDF}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF File
            </button>
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save A4
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 cursor-pointer transition-colors ml-2"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Notice Banner */}
        <div className="bg-blue-50 border-b border-blue-200 px-5 py-2 text-xs text-blue-800 flex items-center justify-between shrink-0">
          <span>
            📄 <strong>Pro Tip:</strong> Click "Download PDF File" for direct vector export or "Print / Save A4" to use your browser's Print Dialog (choose 'Save as PDF', Landscape, A4 paper).
          </span>
          <span className="text-[11px] text-blue-600 font-medium">Proper Spacing Enabled</span>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/80 flex justify-center">
          <div className="bg-white shadow-lg p-6 sm:p-10 rounded-sm w-full max-w-[1100px] border border-slate-300 text-slate-900 space-y-12">
            <PrintableView />
          </div>
        </div>
      </div>
    </div>
  );
};
