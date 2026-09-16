import React from 'react';
import { useApp } from '../../context/AppContext';
import { HARVARD_REFERENCES } from '../../data/mockData';
import { X, BookOpen, AlertCircle, BookmarkCheck, ExternalLink } from 'lucide-react';

export const DataSourcesModal: React.FC = () => {
  const { isDataSourcesModalOpen, setIsDataSourcesModalOpen } = useApp();

  if (!isDataSourcesModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-serif">Academic Data Sources & References</h3>
              <p className="text-xs text-slate-400">Harvard Referencing System (Academic Bibliography)</p>
            </div>
          </div>
          <button
            id="close-data-sources-modal-btn"
            onClick={() => setIsDataSourcesModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Simulation Notice Card */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-amber-200">Mandatory Simulation Disclaimer</p>
              <p className="text-amber-100/80 leading-relaxed">
                All market figures, equity quotes, transaction hashes, investor identifiers, and product parameters
                displayed throughout this prototype are simulated illustrative constructs unless explicitly attributed to a
                formal cited publication below.
              </p>
            </div>
          </div>

          {/* Harvard Citations List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 font-mono">
              Formal Academic & Institutional Citations
            </h4>
            <div className="space-y-3.5">
              {HARVARD_REFERENCES.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <BookmarkCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-xs text-emerald-300 font-semibold">{ref.citation}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ref.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Calculation Note */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <h5 className="font-semibold text-slate-200">Methodological Note on MSCI Accessibility Calculation</h5>
            <p className="text-slate-400 leading-relaxed">
              The statistic cited in the economic analysis (“Vietnam received negative ratings in 6 of 11 assessed
              market-accessibility criteria”) reflects an academic comparative matrix derived from MSCI’s June 2026
              Global Market Accessibility Review. The 10 peer frontier and emerging markets evaluated include Vietnam,
              Romania, Kenya, Kazakhstan, Morocco, Sri Lanka, Jordan, Bahrain, Bangladesh, and Tunisia.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>VietAccess Working Paper Series • 2026</span>
          <button
            id="modal-done-btn"
            onClick={() => setIsDataSourcesModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close Bibliography
          </button>
        </div>
      </div>
    </div>
  );
};
