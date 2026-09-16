import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  Layers,
  Search,
  Filter,
  ShieldCheck,
  Hash,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Download,
  ExternalLink,
  Cpu,
  Server
} from 'lucide-react';

export const TransparencyLedger: React.FC = () => {
  const { ledgerEvents, products, setSelectedLedgerTx } = useApp();

  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterProduct, setFilterProduct] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const eventTypes = ['ALL', 'MINT', 'TRANSFER', 'BURN', 'RECONCILIATION', 'CORPORATE_ACTION'];

  const filteredEvents = ledgerEvents.filter(evt => {
    if (filterType !== 'ALL' && evt.eventType !== filterType) return false;
    if (filterProduct !== 'ALL' && evt.productCode !== filterProduct) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        evt.txHash.toLowerCase().includes(q) ||
        evt.participantId.toLowerCase().includes(q) ||
        evt.productCode.toLowerCase().includes(q) ||
        evt.blockNumber.toString().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleDownloadLedger = () => {
    const dataStr = JSON.stringify(ledgerEvents, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VietAccess_Permissioned_Ledger_${new Date().toISOString().substring(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="transparency-ledger-root" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Permissioned Architecture
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              BLOCK #{ledgerEvents[0]?.blockNumber.toLocaleString() || '88,421'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Permissioned Consensus Ledger Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Immutable audit trail of primary mints, secondary transfers, redemptions, and daily custody reconciliations.
          </p>
        </div>

        <button
          onClick={handleDownloadLedger}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Download Audit Trail (.JSON)</span>
        </button>
      </div>

      {/* Validator Consensus Nodes Bar */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Active Permissioned Institutional Validator Nodes</span>
          </div>
          <span className="text-emerald-400 font-mono text-[11px] font-bold">
            Consensus: Istanbul BFT (PBFT) • 100% Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-slate-400 font-bold">SSC-REG-01</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-white">State Securities Commission</p>
            <span className="text-[10px] text-slate-500 font-mono">Observer & Supervisory Node</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-slate-400 font-bold">LOTUS-VAL-01</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-white">Lotus Custody Bank</p>
            <span className="text-[10px] text-slate-500 font-mono">Depository Oracle & Mint Signer</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-slate-400 font-bold">VAC-CORE-01</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-white">VietAccess Platform Core</p>
            <span className="text-[10px] text-slate-500 font-mono">Order Matching & DvP Sequencing</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-slate-400 font-bold">AUDIT-VAL-01</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-white">Horizon Assurance LLP</p>
            <span className="text-[10px] text-slate-500 font-mono">Daily Invariant Attestor Node</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search hash, participant, or block..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {eventTypes.map(t => (
                <option key={t} value={t}>
                  {t === 'ALL' ? 'All Event Types' : t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterProduct}
              onChange={e => setFilterProduct(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Products</option>
              {products.map(p => (
                <option key={p.code} value={p.code}>
                  {p.code} - {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Block #</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Event Type</th>
              <th className="p-4">Product</th>
              <th className="p-4 text-right">Quantity</th>
              <th className="p-4 text-right">Total Value</th>
              <th className="p-4">Participant</th>
              <th className="p-4 font-mono">Tx Hash</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredEvents.map(evt => (
              <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-300">
                  #{evt.blockNumber.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-slate-400 text-[11px]">
                  {evt.timestamp}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      evt.eventType === 'MINT'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : evt.eventType === 'BURN'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : evt.eventType === 'RECONCILIATION'
                        ? 'bg-purple-950 text-purple-300 border-purple-800'
                        : evt.eventType === 'CORPORATE_ACTION'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-blue-950 text-blue-300 border-blue-800'
                    }`}
                  >
                    {evt.eventType}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-slate-200">
                  {evt.productCode}
                </td>
                <td className="p-4 text-right font-mono text-slate-200">
                  {evt.quantity.toLocaleString()}
                </td>
                <td className="p-4 text-right font-mono font-semibold text-slate-100">
                  {formatVND(evt.totalValueVND)}
                </td>
                <td className="p-4 font-mono text-[11px] text-slate-400">
                  {evt.participantId}
                </td>
                <td className="p-4 font-mono text-slate-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span>{evt.txHash.substring(0, 10)}...</span>
                    <button
                      onClick={() => handleCopy(evt.txHash)}
                      className="text-slate-500 hover:text-slate-300 p-0.5"
                      title="Copy Hash"
                    >
                      {copiedHash === evt.txHash ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedLedgerTx(evt)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
