import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, RotateCcw, Building2, HelpCircle, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, resetDemoData, currentRole } = useApp();

  return (
    <footer id="app-footer" className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Col 1: Brand & Mandatory Disclaimer */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-slate-200">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                VA
              </div>
              <span className="font-semibold tracking-wide text-sm text-white">VietAccess Platform</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Prototype v2.4
              </span>
            </div>

            {/* Mandatory User-Specified Disclaimer */}
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-slate-300 font-sans text-xs leading-relaxed">
              <p className="font-medium text-slate-200">
                “VietAccess is a non-functional demonstration platform. It does not provide investment services, issue securities or process real transactions.”
              </p>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Receipt holders do not receive legal title, voting rights, or corporate governance rights. 100% of underlying assets are simulated as held by Lotus Custody Bank in segregated depository accounts.
            </p>
          </div>

          {/* Col 2: Institutional Roles & Operations */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-3 font-mono">
              Operating Model
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-nav-how-it-works"
                  onClick={() => navigateTo('how_it_works')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>11-Stage Operational Process</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-help"
                  onClick={() => navigateTo('help')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Help Centre & FAQ</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-markets"
                  onClick={() => navigateTo('markets')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Marketplace (6 Products)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Fictional Architecture & Reset */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-3 font-mono">
              Simulation Controls
            </h4>
            <div className="space-y-3">
              <p className="text-[11px] text-slate-400">
                Current active view: <strong className="text-emerald-400 uppercase font-mono">{currentRole.replace('_', ' ')}</strong>
              </p>
              <button
                id="btn-reset-demo-data-footer"
                onClick={resetDemoData}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset Demo Data</span>
              </button>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>All state stored locally in browser</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 VietAccess Simulation Systems. Fictional institutions: VietAccess Issuance Company • Lotus Custody Bank • Meridian Securities • Horizon Assurance.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400/80 font-mono">Simulated Settlement: T+1 DvP</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400/80 font-mono">Non-Voting Receipts Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
