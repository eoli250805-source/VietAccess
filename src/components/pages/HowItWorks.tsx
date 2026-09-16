import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GitBranch,
  Building,
  UserCheck,
  Coins,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Flame,
  Scale,
  Landmark,
  Eye,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { navigateTo } = useApp();
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const steps = [
    {
      step: 1,
      title: 'Investor Onboarding & Whitelisting',
      subtitle: 'Simulated institutional KYC/AML & eligibility check',
      icon: UserCheck,
      details:
        'Foreign institutional investors submit entity classifications (QFII/Accredited), undergo automated FATF jurisdiction checks, sanction list screening, and sign explicit legal waivers acknowledging the rights separation principle. Only whitelisted public keys may hold or transact units.'
    },
    {
      step: 2,
      title: 'Custodian Deposits & Ring-Fences Shares',
      subtitle: 'Physical legal ownership established at VSD',
      icon: Building,
      details:
        'A licensed domestic custodian purchases underlying listed Vietnamese equities on the Ho Chi Minh Stock Exchange (HOSE) within prevailing room or through block purchases. The shares are segregated in a dedicated trust custody account at the Vietnam Securities Depository (VSD).'
    },
    {
      step: 3,
      title: 'Tokenised Exposure Issued (Minting)',
      subtitle: 'Strict 1:1 mathematical backing verified on-chain',
      icon: Coins,
      details:
        'The custodian node verifies physical settlement and triggers the smart contract minting function. Exactly 1 Economic Exposure Unit is issued per underlying share deposited. The contract algorithmically prevents minting beyond physical reserves.'
    },
    {
      step: 4,
      title: 'Secondary Trading & Holding',
      subtitle: 'Atomic DvP settlement among whitelisted QFII participants',
      icon: RefreshCw,
      details:
        'Foreign investors hold or trade exposure units on the permissioned secondary ledger. Transactions settle atomically against institutional stable settlement assets or fiat escrow, eliminating bilateral counterparty risk and multi-day clearing delays.'
    },
    {
      step: 5,
      title: 'Corporate Actions & Dividend Pass-Through',
      subtitle: 'Automated entitlement calculations without voting proxies',
      icon: Landmark,
      details:
        'Cash dividends paid by Vietnamese issuers to the custodian are automatically calculated on the ledger record date and credited to registered unit holders. The custodian retains voting discretion or casts neutral votes in compliance with regulatory guidance.'
    },
    {
      step: 6,
      title: 'Redemption & Token Cancellation (Burn)',
      subtitle: 'Orderly unwind with cash proceeds return',
      icon: Flame,
      details:
        'Upon investor redemption, the platform burns the corresponding exposure units on-chain. The custodian sells or reallocates the underlying shares and remits net USD/VND proceeds to the investor via regulated banking rails (T+1).'
    }
  ];

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            Architectural Methodology
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Permissioned Tripartite Model
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">
          How VietAccess Operates
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          A step-by-step walkthrough of the proposed contractual exposure lifecycle and the regulatory relationships
          uniting domestic custody, foreign capital, and supervisory oversight.
        </p>
      </div>

      {/* Part 1: Visual Ecosystem Map */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-serif">
            Ecosystem Interaction Architecture
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Institutional relationships separating economic value from legal governance.
          </p>
        </div>

        {/* Ecosystem Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Node 1: Foreign Investors */}
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs uppercase">
              <UserCheck className="w-4 h-4" />
              <span>Foreign Investors (QFII)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Provides foreign capital; receives contractual economic exposure and dividend pass-throughs. Strictly waves
              voting rights and agrees to secondary transfer limitations.
            </p>
          </div>

          {/* Node 2: Domestic Custodian */}
          <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/40 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-xs uppercase">
              <Building className="w-4 h-4" />
              <span>Domestic Custodian</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Licensed domestic financial institution. Legally owns and registers underlying shares at VSD in a segregated
              trust; triggers ledger minting upon verified deposits.
            </p>
          </div>

          {/* Node 3: Vietnamese Listed Companies */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <Landmark className="w-4 h-4" />
              <span>Listed Issuers (HOSE)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Leading domestic companies facing 49% or 30% foreign ownership ceilings. Gains expanded indirect capital
              liquidity without dilution of national shareholder governance.
            </p>
          </div>

          {/* Node 4: Platform Operator */}
          <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/40 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold font-mono text-xs uppercase">
              <GitBranch className="w-4 h-4" />
              <span>Platform Operator</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Maintains the permissioned distributed ledger software, oracle integrations, smart contract business logic,
              and institutional UI interfaces.
            </p>
          </div>

          {/* Node 5: SSC / Regulatory Observer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-red-900/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs uppercase">
              <Eye className="w-4 h-4" />
              <span>SSC / Regulators</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              State Securities Commission observer node with real-time audit visibility, beneficial ownership aggregation
              telemetry, and multi-sig emergency circuit-breaker capability.
            </p>
          </div>

          {/* Node 6: Cash Settlement Bank */}
          <div className="p-4 rounded-xl bg-slate-950 border border-teal-900/40 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold font-mono text-xs uppercase">
              <Scale className="w-4 h-4" />
              <span>Settlement Bank</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Regulated commercial bank managing the fiat on/off ramps (USD & VND), foreign exchange conversions, and
              distributing cash dividends to foreign investors.
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Step-by-Step Interactive Process Flow */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-serif">
          Six-Stage Operational Lifecycle
        </h3>

        <div className="space-y-3">
          {steps.map(s => {
            const Icon = s.icon;
            const isExpanded = expandedStep === s.step;
            return (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 transition-all cursor-pointer hover:border-slate-700 shadow-md"
                onClick={() => setExpandedStep(isExpanded ? null : s.step)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif">{s.title}</h4>
                      <p className="text-xs text-slate-400">{s.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed font-sans pl-12 animate-in fade-in duration-150">
                    {s.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
        <h4 className="text-sm font-semibold text-white font-serif">Ready to explore the economic mechanics?</h4>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('business_model')}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
          >
            Examine Business Model
          </button>
          <button
            onClick={() => navigateTo('risks')}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
          >
            Review Risks & Ethics
          </button>
        </div>
      </div>
    </div>
  );
};
