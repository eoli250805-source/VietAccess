import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Scale,
  Users,
  ShieldCheck,
  Building,
  CheckCircle2,
  PieChart,
  Calculator
} from 'lucide-react';

export const BusinessModel: React.FC = () => {

  // Interactive revenue calculator state (in Millions USD)
  const [annualIssuanceMillion, setAnnualIssuanceMillion] = useState<number>(50); // $50M issuance
  const [annualSecondaryTurnoverMillion, setAnnualSecondaryTurnoverMillion] = useState<number>(120); // $120M secondary trading
  const [aumMillion, setAumMillion] = useState<number>(80); // $80M average assets under custody

  // Revenue computations
  const issuanceFeeRevenue = (annualIssuanceMillion * 1000000) * 0.0015; // 0.15%
  const secondaryFeeRevenue = (annualSecondaryTurnoverMillion * 1000000) * 0.0010; // 0.10%
  const custodyFeeRevenue = (aumMillion * 1000000) * 0.0025; // 0.25% annual management/custody
  const totalAnnualRevenue = issuanceFeeRevenue + secondaryFeeRevenue + custodyFeeRevenue;

  // Cost estimates
  const estOperatingCosts = 280000; // $280k technology & nodes
  const estCustodyVSDCosts = (aumMillion * 1000000) * 0.0008; // 0.08% VSD depository
  const estComplianceLegal = 150000; // $150k continuous legal & audit
  const totalOperatingCosts = estOperatingCosts + estCustodyVSDCosts + estComplianceLegal;
  const netPlatformSurplus = totalAnnualRevenue - totalOperatingCosts;

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            Institutional Economics
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Academic Feasibility Model
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">
          Business & Operating Model
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Economic feasibility study examining stakeholder value creation, institutional fee mechanics, cost drivers, and
          statutory regulatory dependencies.
        </p>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
        {/* Customer Segments */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs uppercase">
            <Users className="w-4 h-4" />
            <span>Target Customer Segments</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Foreign Institutional Investors (QFII):</strong> Emerging market funds and sovereign entities seeking direct Vietnam exposure without over-the-counter (OTC) foreign premiums.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Family Offices & Wealth Managers:</strong> Global allocators wanting transparent custody and automated dividend pass-through.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Domestic Custody Banks:</strong> Vietnamese financial institutions generating high-margin fee revenue from ring-fenced depository pools.</span>
            </li>
          </ul>
        </div>

        {/* Value Proposition */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-xs uppercase">
            <Briefcase className="w-4 h-4" />
            <span>Value Proposition</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Frictionless Economic Access:</strong> Gain direct dividend and capital return of 100% FOL-locked blue chips without voting friction or foreign ownership breaches.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Auditable Custody Backing:</strong> Cryptographically verifiable 1:1 underlying share proof at Vietnam Securities Depository (VSD).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Atomic Settlement (DvP):</strong> Near-instant secondary trade clearing avoiding 3-day bilateral counterparty delay.</span>
            </li>
          </ul>
        </div>

        {/* Revenue Architecture */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold font-mono text-xs uppercase">
            <DollarSign className="w-4 h-4" />
            <span>Fee & Revenue Architecture</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Issuance Fee (0.15%):</strong> One-time fee charged upon minting new units against physical custody share deposits.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Secondary Transaction Fee (0.10%):</strong> Charged on secondary peer-to-peer ledger transfers between whitelisted QFII holders.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Annual Custody Administration (0.25% p.a.):</strong> Shared between domestic custodian bank and technology operator for ongoing depository servicing.</span>
            </li>
          </ul>
        </div>

        {/* Cost Structure */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
            <PieChart className="w-4 h-4" />
            <span>Operating Cost Structure</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Depository Fees:</strong> VSD custodial registration and statutory settlement charges for holding equity pools in segregated escrow.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Continuous KYC/AML Oracles:</strong> Automated sanctions list monitoring and LEI verification feeds.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Regulatory Audit & Node Maintenance:</strong> Enterprise consensus node infrastructure, security pentesting, and quarterly compliance certification.</span>
            </li>
          </ul>
        </div>

        {/* Regulatory Dependencies */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs uppercase">
            <Scale className="w-4 h-4" />
            <span>Core Regulatory Dependencies</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">1. State Securities Commission (SSC)</span>
              <p className="text-slate-400">Formal regulatory sandbox recognition approving non-voting contractual certificates.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">2. State Bank of Vietnam (SBV)</span>
              <p className="text-slate-400">Cross-border foreign exchange compliance and offshore capital remittance approval.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">3. Ministry of Finance (MoF)</span>
              <p className="text-slate-400">Clarity on withholding tax pass-through on dividends under bilateral double tax avoidance treaties.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Fee Revenue Projection Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-serif">
              Interactive Fee Revenue Projection Simulator
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            Economic Pro-Forma
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Annual Issuance Volume:</span>
              <span className="font-mono text-emerald-400 font-bold">${annualIssuanceMillion}M USD</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={annualIssuanceMillion}
              onChange={e => setAnnualIssuanceMillion(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-[10px] text-slate-500 block">Fee rate: 0.15% on new unit creation</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Secondary Trading Volume:</span>
              <span className="font-mono text-emerald-400 font-bold">${annualSecondaryTurnoverMillion}M USD</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={annualSecondaryTurnoverMillion}
              onChange={e => setAnnualSecondaryTurnoverMillion(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-[10px] text-slate-500 block">Fee rate: 0.10% per transaction</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Average Assets in Custody (AUM):</span>
              <span className="font-mono text-emerald-400 font-bold">${aumMillion}M USD</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={aumMillion}
              onChange={e => setAumMillion(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-[10px] text-slate-500 block">Fee rate: 0.25% p.a. custody servicing</span>
          </div>
        </div>

        {/* Simulation Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Issuance Fee Income</span>
            <span className="text-lg font-bold text-white block mt-0.5">
              ${issuanceFeeRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Secondary Trading Fees</span>
            <span className="text-lg font-bold text-white block mt-0.5">
              ${secondaryFeeRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Annual Custody Fees</span>
            <span className="text-lg font-bold text-white block mt-0.5">
              ${custodyFeeRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
            <span className="text-emerald-400 block text-[10px] uppercase font-bold">Total Projected Revenue</span>
            <span className="text-xl font-bold text-emerald-300 block mt-0.5">
              ${totalAnnualRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400">Estimated Total Operating Costs: </span>
            <span className="text-slate-200 font-mono font-semibold">
              ${totalOperatingCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </span>
          </div>
          <div>
            <span className="text-slate-400">Projected Net Operating Surplus: </span>
            <span className="text-emerald-400 font-mono font-bold text-sm">
              ${netPlatformSurplus.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
