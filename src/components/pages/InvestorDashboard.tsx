import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Clock,
  Layers,
  ChevronRight,
  Plus,
  RotateCw,
  Coins,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const InvestorDashboard: React.FC = () => {
  const {
    portfolio,
    products,
    availableCashVND,
    distributions,
    ledgerEvents,
    navigateTo,
    setSelectedLedgerTx,
    setReceiptModalData
  } = useApp();

  // Aggregate calculations
  const totalHoldingsValueVND = portfolio.reduce((acc, pos) => {
    const p = products.find(prod => prod.code === pos.productCode);
    return acc + pos.quantity * (p ? p.referencePriceVND : pos.currentReferencePriceVND);
  }, 0);

  const totalCostVND = portfolio.reduce((acc, pos) => acc + pos.totalCostVND, 0);
  const totalUnrealizedVND = totalHoldingsValueVND - totalCostVND;
  const totalUnrealizedPct = totalCostVND > 0 ? (totalUnrealizedVND / totalCostVND) * 100 : 0;
  const totalNetWorthVND = totalHoldingsValueVND + availableCashVND;

  const totalDistributionsClaimed = portfolio.reduce(
    (acc, pos) => acc + pos.realizedDistributionsVND,
    0
  );

  // Recent transactions (last 5)
  const recentTransactions = ledgerEvents
    .filter(e => e.participantId === 'INV-001' || e.eventType === 'MINT' || e.eventType === 'BURN')
    .slice(0, 5);

  // Upcoming distributions
  const upcomingDistributions = distributions.filter(d => d.status === 'Announced');

  return (
    <div id="investor-dashboard-root" className="space-y-8 py-4">
      {/* Welcome & Investor Identity Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">
              INV-001
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Global Pacific Asset Management (Singapore) Ltd
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified QFII
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Institutional Investor Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time portfolio valuation, segregated depository receipts, and cash distributions.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            id="btn-quick-acquire"
            onClick={() => navigateTo('transaction')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Acquire Receipts</span>
          </button>
          <button
            id="btn-quick-redeem"
            onClick={() => navigateTo('redeem')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Redeem</span>
          </button>
          <button
            id="btn-quick-ledger"
            onClick={() => navigateTo('transaction_ledger')}
            className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            title="Open Permissioned Ledger"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Holdings Value */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Receipt Holdings Value</span>
            <Building2 className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            {formatVND(totalHoldingsValueVND)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Net Portfolio Total:</span>
            <span className="font-mono font-medium text-slate-300">{formatVND(totalNetWorthVND)}</span>
          </div>
        </div>

        {/* Unrealized P&L */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Unrealised Gain / Loss</span>
            {totalUnrealizedVND >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div
            className={`text-xl sm:text-2xl font-bold font-mono ${
              totalUnrealizedVND >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalUnrealizedVND >= 0 ? '+' : ''}
            {formatVND(totalUnrealizedVND)}
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span
              className={totalUnrealizedPct >= 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}
            >
              {totalUnrealizedPct >= 0 ? '+' : ''}
              {totalUnrealizedPct.toFixed(2)}%
            </span>
            <span>relative to cost</span>
          </div>
        </div>

        {/* Available Cash Escrow */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Available Cash Balance</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            {formatVND(availableCashVND)}
          </div>
          <div className="text-[11px] text-slate-400">
            <span>Lotus Escrow: </span>
            <span className="font-mono text-emerald-400">T+1 DvP Ready</span>
          </div>
        </div>

        {/* Cash Distributions Received */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-mono uppercase text-[10px]">Distributions Collected</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">
            {formatVND(totalDistributionsClaimed)}
          </div>
          <div className="text-[11px] text-slate-400">
            <span>Net cash dividends credited</span>
          </div>
        </div>
      </div>

      {/* Active Holdings Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Active Digital Receipt Holdings</h2>
            <p className="text-xs text-slate-400">
              Contractual economic exposure units 100% backed by segregated custody shares.
            </p>
          </div>
          <button
            onClick={() => navigateTo('portfolio')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Detailed Portfolio View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Receipt Code</th>
                <th className="p-4">Underlying Company</th>
                <th className="p-4 text-right">Quantity</th>
                <th className="p-4 text-right">Average Cost</th>
                <th className="p-4 text-right">Current Price</th>
                <th className="p-4 text-right">Market Value</th>
                <th className="p-4 text-right">Unrealised P&L</th>
                <th className="p-4 text-center">Backing Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {portfolio.map(pos => {
                const prod = products.find(p => p.code === pos.productCode);
                const currentPrice = prod ? prod.referencePriceVND : pos.currentReferencePriceVND;
                const marketVal = pos.quantity * currentPrice;
                const pnl = marketVal - pos.totalCostVND;
                const pnlPct = (pnl / pos.totalCostVND) * 100;

                return (
                  <tr key={pos.productCode} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {pos.productCode}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-100">{prod?.name || pos.productCode}</div>
                      <span className="text-[10px] text-slate-500 font-mono">HOSE: {prod?.underlyingTicker}</span>
                    </td>
                    <td className="p-4 text-right font-mono font-semibold text-slate-200">
                      {pos.quantity.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-mono text-slate-400">
                      {formatVND(pos.averageCostVND)}
                    </td>
                    <td className="p-4 text-right font-mono font-semibold text-slate-100">
                      {formatVND(currentPrice)}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-slate-100">
                      {formatVND(marketVal)}
                    </td>
                    <td className="p-4 text-right font-mono">
                      <span
                        className={`font-semibold ${
                          pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {pnl >= 0 ? '+' : ''}
                        {formatVND(pnl)} ({pnlPct >= 0 ? '+' : ''}
                        {pnlPct.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        100% Segregated
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => navigateTo('transaction', pos.productCode)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 text-[11px] font-medium"
                      >
                        Acquire More
                      </button>
                      <button
                        onClick={() => navigateTo('redeem', pos.productCode)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium"
                      >
                        Redeem
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two Column Grid: Recent Transactions & Pending Corporate Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Recent Ledger Executions</span>
            </h3>
            <button
              onClick={() => navigateTo('transaction_ledger')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              View Explorer
            </button>
          </div>

          <div className="space-y-2">
            {recentTransactions.map(tx => (
              <div
                key={tx.id}
                onClick={() => setSelectedLedgerTx(tx)}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      tx.eventType === 'MINT'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : tx.eventType === 'BURN'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : 'bg-blue-950 text-blue-300 border-blue-800'
                    }`}
                  >
                    {tx.eventType}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-200">
                      {tx.productCode} • {tx.quantity.toLocaleString()} receipts
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{tx.timestamp}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold text-slate-200">
                    {formatVND(tx.totalValueVND)}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Cash Distributions */}
        <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Upcoming Cash Distributions</span>
            </h3>
            <button
              onClick={() => navigateTo('distributions')}
              className="text-xs font-medium text-amber-400 hover:text-amber-300"
            >
              All Corporate Actions
            </button>
          </div>

          <div className="space-y-2">
            {upcomingDistributions.map(dist => (
              <div
                key={dist.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{dist.productCode}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      {dist.actionType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Payable: <strong className="text-slate-200 font-mono">{formatVND(dist.amountPerReceiptVND)}</strong> / receipt
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Record Date:</span>
                  <span className="font-mono text-slate-300 font-semibold">{dist.recordDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
