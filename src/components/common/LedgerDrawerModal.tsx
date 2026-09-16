import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Clock,
  Layers,
  Building2,
  FileText,
  AlertCircle
} from 'lucide-react';

export const LedgerDrawerModal: React.FC = () => {
  const { selectedLedgerTx, setSelectedLedgerTx } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedLedgerTx) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(selectedLedgerTx.txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="ledger-drawer-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="ledger-drawer-panel"
        className="w-full max-w-xl h-full bg-slate-900 border-l border-slate-700/80 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60">
                  {selectedLedgerTx.eventType}
                </span>
                <span className="text-sm font-semibold text-slate-100">
                  {selectedLedgerTx.productCode}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Block #{selectedLedgerTx.blockNumber} • ID: {selectedLedgerTx.id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedLedgerTx(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs font-sans text-slate-300">
          {/* Simulated Notice */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-[11px] text-slate-300">
                Permissioned ledger record — <strong>simulated consensus proof</strong>
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
              MOCK-HASH
            </span>
          </div>

          {/* Hash & Participant */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase font-mono tracking-wider">
              Cryptographic Proof
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px]">TRANSACTION HASH:</span>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-emerald-400 break-all leading-tight font-mono">
                    {selectedLedgerTx.txHash}
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="p-1 text-slate-400 hover:text-white shrink-0 rounded hover:bg-slate-800"
                    title="Copy Hash"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-500">PARTICIPANT:</span>
                <span className="text-slate-200">
                  {selectedLedgerTx.participantId} ({selectedLedgerTx.participantRole})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">TIMESTAMP:</span>
                <span className="text-slate-200">{selectedLedgerTx.timestamp} UTC</span>
              </div>
            </div>
          </div>

          {/* Resulting Supply & Reserve Balance */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase font-mono tracking-wider">
              Backing & Reserve State
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">
                  Resulting Receipt Supply
                </span>
                <p className="text-base font-bold text-slate-100 font-mono mt-1">
                  {selectedLedgerTx.resultingReceiptSupply?.toLocaleString() ?? '—'}
                </p>
                <span className="text-[10px] text-slate-400">Circulating active receipts</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">
                  Resulting Reserve Balance
                </span>
                <p className="text-base font-bold text-emerald-400 font-mono mt-1">
                  {selectedLedgerTx.resultingReserveBalance?.toLocaleString() ?? '—'}
                </p>
                <span className="text-[10px] text-emerald-500/80">Shares in Lotus Custody</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% verified backing invariant maintained on-chain.</span>
            </div>
          </div>

          {/* Complete Event Timeline */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase font-mono tracking-wider">
              Complete Event Timeline
            </h4>
            <div className="relative pl-5 border-l-2 border-slate-800 space-y-4 py-1">
              <div className="relative">
                <div className="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-slate-900" />
                <p className="text-[11px] font-semibold text-slate-200">Order Initiated</p>
                <p className="text-[10px] text-slate-400">
                  {selectedLedgerTx.participantId} submitted request for {selectedLedgerTx.quantity.toLocaleString()} units
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-slate-900" />
                <p className="text-[11px] font-semibold text-slate-200">Compliance Pre-Clearance</p>
                <p className="text-[10px] text-slate-400">
                  Beneficial ownership & position limit check passed (ID: {selectedLedgerTx.complianceApprovalId || 'COMP-9821'})
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-slate-900" />
                <p className="text-[11px] font-semibold text-slate-200">Custody Verification</p>
                <p className="text-[10px] text-slate-400">
                  {selectedLedgerTx.verifier} confirmed physical share deposit ring-fencing
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-slate-900" />
                <p className="text-[11px] font-semibold text-emerald-300">Consensus Finalized</p>
                <p className="text-[10px] text-slate-400">
                  State root written to block #{selectedLedgerTx.blockNumber} with verified status
                </p>
              </div>
            </div>
          </div>

          {/* Operational Details */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase font-mono tracking-wider">
              Operational Details
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs leading-relaxed text-slate-300">
              {selectedLedgerTx.details}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setSelectedLedgerTx(null)}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close Explorer Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
