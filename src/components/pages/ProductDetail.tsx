import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Scale,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Coins,
  Lock,
  FileCheck2,
  Info,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductCode,
    setSelectedProductCode,
    navigateTo,
    distributions,
    ledgerEvents,
    setSelectedLedgerTx
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'chart' | 'corporate_actions' | 'legal_matrix'>('overview');
  const [chartTimeframe, setChartTimeframe] = useState<'7D' | '1M' | '3M' | '1Y'>('1M');

  const product = products.find(p => p.code === selectedProductCode) || products[0];

  // Past distributions for this product
  const productDistributions = distributions.filter(d => d.productCode === product.code);

  // Relevant ledger events
  const productLedgerEvents = ledgerEvents.filter(e => e.productCode === product.code).slice(0, 4);

  // Simulated chart data points
  const getChartData = () => {
    const base = product.referencePriceVND;
    switch (chartTimeframe) {
      case '7D':
        return [
          { label: 'Day 1', price: Math.round(base * 0.985) },
          { label: 'Day 2', price: Math.round(base * 0.99) },
          { label: 'Day 3', price: Math.round(base * 0.982) },
          { label: 'Day 4', price: Math.round(base * 1.005) },
          { label: 'Day 5', price: Math.round(base * 1.012) },
          { label: 'Day 6', price: Math.round(base * 1.008) },
          { label: 'Today', price: base }
        ];
      case '1M':
        return [
          { label: 'Wk 1', price: Math.round(base * 0.95) },
          { label: 'Wk 2', price: Math.round(base * 0.97) },
          { label: 'Wk 3', price: Math.round(base * 0.965) },
          { label: 'Wk 4', price: Math.round(base * 0.99) },
          { label: 'Wk 5', price: base }
        ];
      case '3M':
        return [
          { label: 'Month -3', price: Math.round(base * 0.88) },
          { label: 'Month -2', price: Math.round(base * 0.92) },
          { label: 'Month -1', price: Math.round(base * 0.96) },
          { label: 'Current', price: base }
        ];
      case '1Y':
        return [
          { label: 'Q1', price: Math.round(base * 0.82) },
          { label: 'Q2', price: Math.round(base * 0.89) },
          { label: 'Q3', price: Math.round(base * 0.94) },
          { label: 'Q4', price: base }
        ];
    }
  };

  const chartPoints = getChartData();
  const minPrice = Math.min(...chartPoints.map(p => p.price));
  const maxPrice = Math.max(...chartPoints.map(p => p.price));
  const priceRange = maxPrice - minPrice || 1;

  return (
    <div id="product-detail-root" className="space-y-8 py-4">
      {/* Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <button
              onClick={() => navigateTo('markets')}
              className="hover:text-emerald-400 transition-colors"
            >
              Markets
            </button>
            <span>/</span>
            <span className="text-emerald-400 font-bold">{product.code}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 flex items-center gap-3">
            <span>{product.name}</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              HOSE: {product.underlyingTicker}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {product.sector} • ISIN: {product.isin} • Lotus Custody Segregated Vault #LOT-VSD-992
          </p>
        </div>

        {/* Product selector dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-mono">Switch:</span>
          <select
            value={product.code}
            onChange={e => setSelectedProductCode(e.target.value)}
            className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono font-semibold"
          >
            {products.map(p => (
              <option key={p.code} value={p.code}>
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Highlight Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Reference Price</span>
          <p className="text-base font-bold text-white font-mono">{formatVND(product.referencePriceVND)}</p>
          <span className="text-[10px] text-emerald-400 font-mono font-medium">+1.4% (24h)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">FOL Utilization</span>
          <p className="text-base font-bold text-amber-400 font-mono">{product.foreignOwnershipLimit}% Cap</p>
          <span className="text-[10px] text-slate-400">Foreign Room 0%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Shares in Custody</span>
          <p className="text-base font-bold text-slate-100 font-mono">
            {product.underlyingSharesHeld.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">Lotus Custody Bank</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Receipts in Circulation</span>
          <p className="text-base font-bold text-slate-100 font-mono">
            {product.receiptsIssued.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">1:1 Backed Ratio</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Available Receipts</span>
          <p className="text-base font-bold text-emerald-400 font-mono">
            {product.availableReceipts.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">Mintable Capacity</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono block">Historical Yield</span>
          <p className="text-base font-bold text-amber-400 font-mono">{product.dividendYieldPercent}%</p>
          <span className="text-[10px] text-slate-400">Annualized Cash Div</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">
            Primary Issuance & Custody Active
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            — Allocation after custody confirmation and settlement
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('transaction', product.code)}
            className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950 transition-colors"
          >
            <span>Simulate Acquisition</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigateTo('redeem', product.code)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Simulate Redemption
          </button>
          <button
            onClick={() => navigateTo('transaction_ledger')}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="Inspect on Permissioned Ledger"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-emerald-400 text-emerald-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview & Custody Backing
        </button>
        <button
          onClick={() => setActiveTab('chart')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'chart'
              ? 'border-emerald-400 text-emerald-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Historical Reference Prices
        </button>
        <button
          onClick={() => setActiveTab('corporate_actions')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'corporate_actions'
              ? 'border-emerald-400 text-emerald-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Corporate Actions & Dividends ({productDistributions.length})
        </button>
        <button
          onClick={() => setActiveTab('legal_matrix')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'legal_matrix'
              ? 'border-emerald-400 text-emerald-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Legal Rights Matrix (Receipt vs Share)
        </button>
      </div>

      {/* Tab 1: Overview & Custody Backing */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Underlying Company & FOL Background</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Why Foreign Ownership Limits (FOL) Apply</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Under Vietnamese enterprise and investment regulations, strategic sectors such as dairy consumer retail, telecommunications, and financial services impose foreign ownership ceilings (typically 49% or 30%). Once this ceiling is reached on the Ho Chi Minh City Stock Exchange (HOSE), foreign institutions cannot buy on-exchange shares without paying off-market bilateral premiums.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Custody Ring-Fencing & Bankruptcy Remoteness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Depository Institution</span>
                  <p className="font-semibold text-slate-200">{product.custodian}</p>
                  <p className="text-[11px] text-slate-400">Regulated domestic bank depository licensed by SSC.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Segregated Account #</span>
                  <p className="font-semibold text-emerald-400 font-mono">LOT-VSD-992-SEG-01</p>
                  <p className="text-[11px] text-slate-400">Ring-fenced from issuer balance sheet under trust deed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custody Proof Card */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Auditor-Verified Invariant
              </h4>
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Required Backing Ratio:</span>
                  <span className="text-emerald-400 font-bold font-mono">100% MINIMUM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Collateral Coverage:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {product.receiptsIssued > 0
                      ? ((product.underlyingSharesHeld / product.receiptsIssued) * 100).toFixed(2)
                      : '100.00'}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Physical Equities in Vault:</span>
                  <span className="text-slate-200 font-mono font-semibold">
                    {product.underlyingSharesHeld.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Circulating Receipts:</span>
                  <span className="text-slate-200 font-mono font-semibold">
                    {product.receiptsIssued.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-500">Unallocated Shares:</span>
                  <span className="text-slate-300 font-mono font-medium">
                    {(product.underlyingSharesHeld - product.receiptsIssued).toLocaleString()} shares
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Horizon Assurance Daily Attestation</span>
                </div>
                <p className="text-slate-500 text-[10px]">
                  Last certified today at 07:00:00 UTC (Ref: ATTEST-2026-09-16).
                </p>
              </div>
            </div>

            {/* Recent Product Transactions */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Recent Product Ledger Events
              </h4>
              <div className="space-y-2">
                {productLedgerEvents.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedLedgerTx(evt)}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {evt.eventType}
                      </span>
                      <span className="ml-2 font-mono text-slate-200 font-medium">
                        {evt.quantity.toLocaleString()} units
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{evt.timestamp.substring(11)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Historical Reference Prices */}
      {activeTab === 'chart' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Simulated Reference Price Trajectory</h3>
              <p className="text-xs text-slate-400">
                Hourly reference price reflecting HOSE closing auctions and off-market block settlements.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['7D', '1M', '3M', '1Y'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setChartTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg font-mono font-semibold transition-colors ${
                    chartTimeframe === tf
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Price Chart */}
          <div className="w-full h-64 bg-slate-950/80 rounded-xl border border-slate-800 p-4 relative flex flex-col justify-between">
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>High: {formatVND(maxPrice)}</span>
              <span>Low: {formatVND(minPrice)}</span>
            </div>

            {/* SVG curve */}
            <svg className="w-full h-40 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area */}
              <polygon
                fill="url(#chartGradient)"
                points={`0,120 ${chartPoints
                  .map((p, idx) => {
                    const x = (idx / (chartPoints.length - 1)) * 500;
                    const y = 120 - ((p.price - minPrice) / priceRange) * 100 - 10;
                    return `${x},${y}`;
                  })
                  .join(' ')} 500,120`}
              />

              {/* Line */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={chartPoints
                  .map((p, idx) => {
                    const x = (idx / (chartPoints.length - 1)) * 500;
                    const y = 120 - ((p.price - minPrice) / priceRange) * 100 - 10;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* Data points */}
              {chartPoints.map((p, idx) => {
                const x = (idx / (chartPoints.length - 1)) * 500;
                const y = 120 - ((p.price - minPrice) / priceRange) * 100 - 10;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-emerald-400 stroke-slate-900 stroke-2"
                  />
                );
              })}
            </svg>

            {/* Time labels */}
            <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              {chartPoints.map((p, idx) => (
                <span key={idx}>{p.label}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Corporate Actions & Dividends */}
      {activeTab === 'corporate_actions' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Cash Distributions Paid to Receipt Holders</h3>
              <p className="text-xs text-slate-400">
                Contractual pass-through of cash dividends received from underlying listed company shares.
              </p>
            </div>
            <div className="text-xs font-mono text-amber-400 font-semibold">
              Withholding Tax: 5.0% Standard Foreign Non-Resident Rate
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Record Date</th>
                  <th className="p-3.5">Payment Date</th>
                  <th className="p-3.5">Distribution Type</th>
                  <th className="p-3.5 text-right">Gross per Receipt</th>
                  <th className="p-3.5 text-right">Withholding Tax (5%)</th>
                  <th className="p-3.5 text-right">Net Cash Paid</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {productDistributions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-xs text-slate-500">
                      No corporate actions scheduled for this product.
                    </td>
                  </tr>
                ) : (
                  productDistributions.map(dist => {
                    const gross = dist.amountPerReceiptVND;
                    const tax = Math.round(gross * 0.05);
                    const net = gross - tax;
                    return (
                      <tr key={dist.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 font-mono">{dist.recordDate}</td>
                        <td className="p-3.5 font-mono">{dist.paymentDate}</td>
                        <td className="p-3.5 font-semibold text-slate-200">{dist.actionType}</td>
                        <td className="p-3.5 text-right font-mono text-slate-200">{formatVND(gross)}</td>
                        <td className="p-3.5 text-right font-mono text-slate-400">-{formatVND(tax)}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                          {formatVND(net)}
                        </td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                              dist.status === 'Completed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {dist.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Legal Rights Matrix (Receipt vs Share) */}
      {activeTab === 'legal_matrix' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Comparative Legal Rights Matrix</h3>
            <p className="text-xs text-slate-400 mt-1">
              Rigorous statutory comparison between holding physical Vietnamese listed shares vs holding VietAccess Economic Exposure Receipts.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Statutory & Commercial Feature</th>
                  <th className="p-4 text-slate-300">Direct Vietnamese Shareholder</th>
                  <th className="p-4 text-emerald-400">VietAccess Receipt Holder</th>
                  <th className="p-4">Legal & Regulatory Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-4 font-semibold text-slate-200">Legal Ownership of Shares</td>
                  <td className="p-4 text-emerald-400 font-mono">YES (VSD Registrant)</td>
                  <td className="p-4 text-rose-400 font-mono font-bold">NO (Contractual Claim Only)</td>
                  <td className="p-4 text-[11px] text-slate-400">
                    Shares are held in Lotus Custody Bank segregated accounts.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-4 font-semibold text-slate-200">Shareholder Voting Rights</td>
                  <td className="p-4 text-emerald-400 font-mono">YES (1 Share = 1 Vote)</td>
                  <td className="p-4 text-rose-400 font-mono font-bold">NO (Strictly Non-Voting)</td>
                  <td className="p-4 text-[11px] text-slate-400">
                    Zero voting interference ensures full compliance with FOL statutes.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-4 font-semibold text-slate-200">Cash Dividend Participation</td>
                  <td className="p-4 text-emerald-400 font-mono">YES (Direct Company Dividend)</td>
                  <td className="p-4 text-emerald-400 font-mono font-bold">YES (100% Pass-Through Net Tax)</td>
                  <td className="p-4 text-[11px] text-slate-400">
                    Collected by custodian and credited directly to investor escrow.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-4 font-semibold text-slate-200">AGM Attendance & Resolutions</td>
                  <td className="p-4 text-emerald-400 font-mono">YES</td>
                  <td className="p-4 text-rose-400 font-mono font-bold">NO</td>
                  <td className="p-4 text-[11px] text-slate-400">
                    No corporate governance representation or proxy voting rights.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-4 font-semibold text-slate-200">Foreign Ownership Limits (FOL)</td>
                  <td className="p-4 text-rose-400 font-mono">BLOCKED ONCE CAP FULL</td>
                  <td className="p-4 text-emerald-400 font-mono font-bold">ELIGIBLE VIA CUSTODY POOL</td>
                  <td className="p-4 text-[11px] text-slate-400">
                    Unlocks exposure without increasing foreign direct voting share.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-4 font-semibold text-slate-200">Redemption Mechanism</td>
                  <td className="p-4 font-mono text-slate-300">On-Exchange Stock Sale</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">T+1 Receipt Burn & Net Proceeds</td>
                  <td className="p-4 text-[11px] text-slate-400">
                    Processed through Lotus Custody depository clearing window.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
