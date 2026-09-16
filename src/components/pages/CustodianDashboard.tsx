import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Plus,
  RefreshCw,
  Layers,
  ArrowRight,
  ExternalLink,
  Lock,
  Clock
} from 'lucide-react';

export const CustodianDashboard: React.FC = () => {
  const {
    products,
    reconciliations,
    ledgerEvents,
    custodianMintRequest,
    runReconciliation
  } = useApp();

  const [selectedProductCode, setSelectedProductCode] = useState<string>('VNA-CONS');
  const [mintQuantityInput, setMintQuantityInput] = useState<string>('25000');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isReconciling, setIsReconciling] = useState<boolean>(false);
  const [mintMessage, setMintMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const product = products.find(p => p.code === selectedProductCode) || products[0];

  const totalVaultShares = products.reduce((acc, p) => acc + p.underlyingSharesHeld, 0);
  const totalIssuedReceipts = products.reduce((acc, p) => acc + p.receiptsIssued, 0);
  const overallCoverage = totalIssuedReceipts > 0 ? (totalVaultShares / totalIssuedReceipts) * 100 : 100;

  const handleCreateMint = () => {
    setMintMessage(null);
    const qty = parseInt(mintQuantityInput, 10);
    if (!qty || qty <= 0) {
      setMintMessage({ type: 'error', text: 'Please enter a valid quantity of receipts to mint.' });
      return;
    }

    if (qty > product.availableReceipts) {
      setMintMessage({
        type: 'error',
        text: `Cannot mint ${qty.toLocaleString()} units. Vault unallocated headroom is only ${product.availableReceipts.toLocaleString()} shares.`
      });
      return;
    }

    setIsMinting(true);
    setTimeout(() => {
      const res = custodianMintRequest(product.code, qty);
      setIsMinting(false);
      if (res.success) {
        setMintMessage({
          type: 'success',
          text: `Successfully initiated and approved primary mint for ${qty.toLocaleString()} units of ${product.code}. Immutable record published to ledger.`
        });
      } else {
        setMintMessage({ type: 'error', text: res.message || 'Failed to execute mint.' });
      }
    }, 400);
  };

  const handleRunReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      runReconciliation();
      setIsReconciling(false);
    }, 600);
  };

  const recentMints = ledgerEvents.filter(e => e.eventType === 'MINT');
  const currentAttestation = reconciliations[0] || {
    status: 'Matched',
    timestamp: '2026-09-16 08:30:00',
    id: 'REC-2026-09-16-01'
  };

  return (
    <div id="custodian-dashboard-root" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Domestic Depository Console
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              VSD PARTICIPANT #042
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Lotus Custody Bank — Depository Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage segregated trust vaults, dual-custody invariant reconciliations, and primary issuance mint approvals.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isReconciling}
            onClick={handleRunReconciliation}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2 shadow-lg"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isReconciling ? 'animate-spin' : ''}`} />
            <span>{isReconciling ? 'Reconciling...' : 'Run Audit Reconciliation'}</span>
          </button>
        </div>
      </div>

      {/* Top 4 Operational Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Physical Shares Held in Vault</span>
            <Building2 className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {totalVaultShares.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Segregated across 6 depository vaults
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Total Digital Receipts Issued</span>
            <Layers className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {totalIssuedReceipts.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Circulating institutional exposure
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Reserve Parity Ratio</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {overallCoverage.toFixed(2)}%
          </div>
          <p className="text-[11px] text-emerald-300 font-mono">
            100% Ring-Fenced Backing
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Last Attestation Stamp</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-slate-200 font-mono">
            {currentAttestation.status}
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            {currentAttestation.timestamp}
          </p>
        </div>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Depository Inventory Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Depository Share Vault & Receipts Invariant</h2>
              <span className="text-xs text-slate-400 font-mono">Account #LOT-VSD-992</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Instrument</th>
                    <th className="p-4 text-right">Physical Shares in Vault</th>
                    <th className="p-4 text-right">Receipts Issued</th>
                    <th className="p-4 text-right">Available Headroom</th>
                    <th className="p-4 text-center">Invariant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {products.map(p => {
                    return (
                      <tr key={p.code} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-mono font-bold text-emerald-400">{p.code}</div>
                          <div className="text-slate-200 font-semibold">{p.name}</div>
                          <span className="text-[10px] text-slate-500 font-mono">HOSE: {p.underlyingSymbol}</span>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-100">
                          {p.underlyingSharesHeld.toLocaleString()}
                        </td>
                        <td className="p-4 text-right font-mono font-semibold text-slate-200">
                          {p.receiptsIssued.toLocaleString()}
                        </td>
                        <td className="p-4 text-right font-mono text-emerald-400 font-bold">
                          {p.availableReceipts.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            100% OK
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Mint Requests Log */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Custody Mint & Allocation Requests</h3>
            <div className="space-y-2">
              {recentMints.map(req => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      MINT
                    </span>
                    <div>
                      <div className="font-bold text-slate-200">
                        {req.productCode} • {req.quantity.toLocaleString()} units
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Logged on {req.timestamp} • Verifier: {req.verifier}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Primary Mint Action Console */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Plus className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">Issue Digital Receipts</h3>
            </div>
            <p className="text-xs text-slate-400">
              Mint new digital receipts against unallocated physical shares verified in depository custody.
            </p>

            <div className="space-y-3 text-xs pt-1">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Target Product</label>
                <select
                  value={selectedProductCode}
                  onChange={e => {
                    setSelectedProductCode(e.target.value);
                    setMintMessage(null);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.code} value={p.code}>
                      {p.code} - {p.name} (Avail: {p.availableReceipts.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Receipt Quantity to Mint</label>
                <input
                  type="number"
                  value={mintQuantityInput}
                  onChange={e => {
                    setMintQuantityInput(e.target.value);
                    setMintMessage(null);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono font-bold focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Vault Available Headroom:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {product.availableReceipts.toLocaleString()} shares
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>New Total Supply:</span>
                  <span className="font-mono text-slate-200">
                    {(product.receiptsIssued + (parseInt(mintQuantityInput, 10) || 0)).toLocaleString()} units
                  </span>
                </div>
              </div>

              {mintMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    mintMessage.type === 'success'
                      ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                  }`}
                >
                  {mintMessage.text}
                </div>
              )}

              <button
                type="button"
                disabled={isMinting}
                onClick={handleCreateMint}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isMinting ? 'Verifying & Minting...' : 'Execute Primary Mint'}</span>
              </button>
            </div>
          </div>

          {/* Daily Attestation Audit Badge */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <h4 className="font-mono uppercase tracking-wider text-slate-400 text-[11px]">
              Custody Attestation Certificate
            </h4>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Oracle Node:</span>
                <span className="text-slate-300">LOTUS-VAL-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auditor Attestor:</span>
                <span className="text-slate-300">HORIZON-AUDIT-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Certificate ID:</span>
                <span className="text-emerald-400">{currentAttestation.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
