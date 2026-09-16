import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  Coins,
  Calendar,
  CheckCircle2,
  Clock,
  Building2,
  Calculator,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';

export const DistributionsPage: React.FC = () => {
  const { distributions, portfolio, products, processDistribution } = useApp();

  // Selected product for calculator
  const [calcProductCode, setCalcProductCode] = useState<string>('VNA-CONS');
  const [calcQuantityInput, setCalcQuantityInput] = useState<string>('10000');

  const selectedDist = distributions.find(d => d.productCode === calcProductCode) || distributions[0];
  const calcQty = parseInt(calcQuantityInput, 10) || 0;
  const grossEstimate = calcQty * (selectedDist ? selectedDist.amountPerReceiptVND : 0);
  const taxEstimate = Math.round(grossEstimate * 0.05); // 5% withholding
  const netEstimate = grossEstimate - taxEstimate;

  return (
    <div id="distributions-page-root" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Corporate Actions & Yield
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              CASH PASS-THROUGH
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Cash Distributions & Corporate Actions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Contractual entitlement to cash dividends declared by underlying companies, collected by Lotus Custody Bank.
          </p>
        </div>
      </div>

      {/* Interactive Distribution Estimator */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Calculator className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">Dividend Distribution Estimator</h3>
        </div>
        <p className="text-xs text-slate-400">
          Calculate projected net cash receipts based on upcoming announced dividends and foreign non-resident withholding tax.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-2">
          <div>
            <label className="text-slate-300 font-medium block mb-1">Exposure Product</label>
            <select
              value={calcProductCode}
              onChange={e => setCalcProductCode(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono focus:outline-none"
            >
              {products.map(p => (
                <option key={p.code} value={p.code}>
                  {p.code} - {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Receipt Quantity Held</label>
            <input
              type="number"
              value={calcQuantityInput}
              onChange={e => setCalcQuantityInput(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Gross Income (0% Tax)</span>
            <span className="text-base font-bold text-slate-200 font-mono mt-0.5 block">
              {formatVND(grossEstimate)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              @ {formatVND(selectedDist?.amountPerReceiptVND || 0)} / receipt
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
            <span className="text-[10px] text-emerald-400 uppercase font-mono block">Net Credited into Escrow</span>
            <span className="text-base font-bold text-emerald-300 font-mono mt-0.5 block">
              {formatVND(netEstimate)}
            </span>
            <span className="text-[10px] text-emerald-500/80 font-mono">Net of 5% withholding ({formatVND(taxEstimate)})</span>
          </div>
        </div>
      </div>

      {/* Distributions Schedule Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Platform Corporate Actions Schedule</h2>
            <p className="text-xs text-slate-400">
              Verified dividend announcements, record dates, and payment processing logs.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Announcement Date</th>
                <th className="p-4">Record Date</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4 text-right">Dividend / Receipt</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {distributions.map(dist => {
                const isHeld = portfolio.some(p => p.productCode === dist.productCode);
                return (
                  <tr key={dist.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {dist.productCode}
                    </td>
                    <td className="p-4 font-semibold text-slate-200">{dist.actionType}</td>
                    <td className="p-4 font-mono text-slate-400">{dist.announcementDate}</td>
                    <td className="p-4 font-mono text-slate-300">{dist.recordDate}</td>
                    <td className="p-4 font-mono text-slate-300">{dist.paymentDate}</td>
                    <td className="p-4 text-right font-mono font-bold text-amber-400">
                      {formatVND(dist.amountPerReceiptVND)}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          dist.status === 'Completed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {dist.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                        {dist.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {dist.status !== 'Completed' ? (
                        <button
                          onClick={() => processDistribution(dist.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                        >
                          Execute Payment
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">Credited</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legal Rights Notice */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong>Statutory Separation:</strong> Under the trust deed executed with Lotus Custody Bank, 100% of cash dividends paid by underlying issuers are ring-fenced for receipt holders and cannot be retained by the issuer or custodian. All corporate voting actions remain non-transferable.
        </p>
      </div>
    </div>
  );
};
