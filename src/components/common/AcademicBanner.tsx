import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';

export const SlimPrototypeBanner: React.FC = () => {
  return (
    <div
      id="slim-prototype-banner"
      className="bg-slate-900/90 border-b border-amber-500/30 text-amber-300 px-4 py-1.5 text-xs font-medium sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 text-amber-400">
            <AlertCircle className="w-3 h-3" />
          </span>
          <span className="font-semibold text-amber-200 tracking-wider uppercase text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40">
            SIMULATION
          </span>
          <span className="text-slate-200 font-medium">
            Interactive prototype — simulated data only
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Fictional institutions & transactions • Zero capital risk</span>
        </div>
      </div>
    </div>
  );
};

export const AcademicBanner = SlimPrototypeBanner;

