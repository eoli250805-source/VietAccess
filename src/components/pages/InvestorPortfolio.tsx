import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  PieChart as PieIcon,
  TrendingUp,
  TrendingDown,
  Coins,
  ShieldCheck,
  Building2,
  ArrowRight,
  Download,
  CheckCircle2,
  FileSpreadsheet,
  RotateCw,
  Plus
} from 'lucide-react';

export const InvestorPortfolio: React.FC = () => {
  const { portfolio, products, navigateTo, availableCashVND } = useApp();

  const [sortField, setSortField] = useState<'value' | 'pnl' | 'name'>('value');

  // Enriched positions
  const enriched = portfolio.map(pos => {
    const prod = products.find(p => p.code === pos.productCode);
    const currentPrice = prod ? prod.referencePriceVND : pos.currentReferencePriceVND;
    const marketValue = pos.quantity * currentPrice;
    const unrealized = marketValue - pos.totalCostVND;
    const unrealizedPct = pos.totalCostVND > 0 ? (unrealized / pos.totalCostVND) * 100 : 0;
    return {
      ...pos,
      product: prod,
      currentPrice,
      marketValue,
      unrealized,
      unrealizedPct
    };
  });

  const totalValueVND = enriched.reduce((acc, p) => acc + p.marketValue, 0);
  const totalCostVND = enriched.reduce((acc, p) => acc + p.totalCostVND, 0);
  const totalUnrealizedVND = totalValueVND - totalCostVND;
  const totalUnrealizedPct = totalCostVND > 0 ? (totalUnrealizedVND / totalCostVND) * 100 : 0;
  const totalDistributionsVND = enriched.reduce((acc, p) => acc + p.realizedDistributionsVND, 0);
  const totalFeesPaidVND = enriched.reduce((acc, p) => acc + p.feesPaidVND, 0);

  // Sector allocation
  const sectorMap: Record<string, number> = {};
  enriched.forEach(p => {
    const sec = p.product?.sector || 'Other';
    sectorMap[sec] = (sectorMap[sec] || 0) + p.marketValue;
  });

  const handleExportCSV = () => {
    let csv = 'Product Code,Company Name,Quantity,Average Cost (VND),Current Price (VND),Total Cost (VND),Market Value (VND),Unrealized P&L (VND),Distributions Collected (VND),Backing Status\n';
    enriched.forEach(p => {
      csv += `"${p.productCode}","${p.product?.name || p.productCode}",${p.quantity},${p.averageCostVND},${p.currentPrice},${p.totalCostVND},${p.marketValue},${p.unrealized},${p.realizedDistributionsVND},"${p.backingStatus}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VietAccess_Portfolio_Report_${new Date().toISOString().substring(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="investor-portfolio-root" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Asset Custody & Holdings
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              INV-001 WHITELISTED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Institutional Portfolio Positions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audited register of non-voting digital receipt holdings backed by Lotus Custody Bank depository vaults.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Statement (CSV)</span>
          </button>
          <button
            onClick={() => navigateTo('transaction')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-950"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Acquire Receipts</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Portfolio Valuation</span>
          <p className="text-lg font-bold text-white font-mono">{formatVND(totalValueVND)}</p>
          <span className="text-[10px] text-slate-400">Total active holdings</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Acquisition Cost Basis</span>
          <p className="text-lg font-bold text-slate-200 font-mono">{formatVND(totalCostVND)}</p>
          <span className="text-[10px] text-slate-400">Net capital invested</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Unrealised Gain/Loss</span>
          <p
            className={`text-lg font-bold font-mono ${
              totalUnrealizedVND >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalUnrealizedVND >= 0 ? '+' : ''}
            {formatVND(totalUnrealizedVND)}
          </p>
          <span className="text-[10px] font-mono text-emerald-400">
            {totalUnrealizedPct >= 0 ? '+' : ''}
            {totalUnrealizedPct.toFixed(2)}%
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Distributions Collected</span>
          <p className="text-lg font-bold text-amber-400 font-mono">{formatVND(totalDistributionsVND)}</p>
          <span className="text-[10px] text-slate-400">Cash dividends in escrow</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Platform & Custody Fees</span>
          <p className="text-lg font-bold text-slate-300 font-mono">{formatVND(totalFeesPaidVND)}</p>
          <span className="text-[10px] text-slate-500">Cumulative issuance & admin</span>
        </div>
      </div>

      {/* Sector Breakdown Progress Bar */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">Sector Exposure Allocation</span>
          <span className="text-slate-400 font-mono">{Object.keys(sectorMap).length} Active Sectors</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex gap-0.5">
          {Object.entries(sectorMap).map(([sec, val], idx) => {
            const pct = totalValueVND > 0 ? (val / totalValueVND) * 100 : 0;
            const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500'];
            return (
              <div
                key={sec}
                style={{ width: `${pct}%` }}
                className={`h-full ${colors[idx % colors.length]}`}
                title={`${sec}: ${pct.toFixed(1)}%`}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
          {Object.entries(sectorMap).map(([sec, val], idx) => {
            const pct = totalValueVND > 0 ? (val / totalValueVND) * 100 : 0;
            const textColors = ['text-emerald-400', 'text-blue-400', 'text-purple-400', 'text-amber-400'];
            return (
              <div key={sec} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${textColors[idx % textColors.length]}`} />
                <span className="text-slate-300">{sec}:</span>
                <span className="font-semibold text-slate-100">{pct.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Holdings Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Segregated Position Details</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Instrument</th>
                <th className="p-4 text-right">Quantity</th>
                <th className="p-4 text-right">Avg. Cost</th>
                <th className="p-4 text-right">Reference Price</th>
                <th className="p-4 text-right">Total Cost</th>
                <th className="p-4 text-right">Current Market Value</th>
                <th className="p-4 text-right">Unrealised P&L</th>
                <th className="p-4 text-center">Backing</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {enriched.map(pos => (
                <tr key={pos.productCode} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-emerald-400">{pos.productCode}</div>
                    <div className="text-slate-200 font-semibold">{pos.product?.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{pos.product?.sector}</div>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-slate-100">
                    {pos.quantity.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-mono text-slate-400">
                    {formatVND(pos.averageCostVND)}
                  </td>
                  <td className="p-4 text-right font-mono font-semibold text-slate-200">
                    {formatVND(pos.currentPrice)}
                  </td>
                  <td className="p-4 text-right font-mono text-slate-300">
                    {formatVND(pos.totalCostVND)}
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-slate-100">
                    {formatVND(pos.marketValue)}
                  </td>
                  <td className="p-4 text-right font-mono">
                    <span
                      className={`font-semibold ${
                        pos.unrealized >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {pos.unrealized >= 0 ? '+' : ''}
                      {formatVND(pos.unrealized)} ({pos.unrealizedPct >= 0 ? '+' : ''}
                      {pos.unrealizedPct.toFixed(1)}%)
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      100% Segregated
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => navigateTo('transaction', pos.productCode)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 text-[11px] font-medium"
                    >
                      Acquire
                    </button>
                    <button
                      onClick={() => navigateTo('redeem', pos.productCode)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium"
                    >
                      Redeem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
