import React from 'react';
import {
  AlertTriangle,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Building,
  Globe2,
  DollarSign,
  Cpu,
  Layers,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export const RisksAndResponsibility: React.FC = () => {
  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
            Institutional Risk Assessment
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Prudential Governance Framework
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">
          Risks, Ethics & Academic Responsibility
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          A critical review of structural vulnerabilities, ethical boundaries, statutory compliance principles, and
          sustainable infrastructure contributions under UN Sustainable Development Goal 9.
        </p>
      </div>

      {/* Part 1: Six Key Risk Dimensions */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Six Critical Risk Dimensions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Risk 1 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <Scale className="w-4 h-4" />
              <span>1. Regulatory Risk</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Vietnamese regulatory authorities (SSC, SBV, MoF) could deem tokenised synthetic exposure as an unauthorized
              derivative instrument or indirect foreign investment vehicle, issuing retroactive cease-and-desist orders or
              mandating liquidation.
            </p>
          </div>

          {/* Risk 2 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>2. Legal Characterisation Risk</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              In the event of contractual dispute or insolvency, courts may recharacterize exposure units as unsecured
              debt claims rather than true beneficial economic pass-throughs, subordinating foreign investors to general
              creditors.
            </p>
          </div>

          {/* Risk 3 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <Cpu className="w-4 h-4" />
              <span>3. Smart-Contract & Operational Risk</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Bugs in access-control logic, permissioned validator node consensus partitions, or oracle data corruption
              could disrupt transfer verifications, freeze unit redemptions, or cause desynchronization with physical
              depository balances.
            </p>
          </div>

          {/* Risk 4 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <Building className="w-4 h-4" />
              <span>4. Custody & Depository Insolvency</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Although Vietnamese trust law requires segregation of depository accounts at VSD, the bankruptcy or license
              revocation of the domestic custodian could freeze underlying assets during extensive judicial proceedings.
            </p>
          </div>

          {/* Risk 5 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <Layers className="w-4 h-4" />
              <span>5. Market Liquidity Dislocation</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Secondary trading in exposure units may experience illiquidity during market stress or wide price discounts
              relative to underlying HOSE quotes if foreign institutional arbitrageurs face repatriation limits.
            </p>
          </div>

          {/* Risk 6 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase">
              <DollarSign className="w-4 h-4" />
              <span>6. FX & Cross-Border Settlement Risk</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Underlying dividends and sales proceeds are denominated in Vietnamese Dong (VND), exposing foreign investors
              to exchange-rate volatility, FX liquidity bottlenecks, and State Bank of Vietnam capital account conversion
              delays.
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Explicit Ethics and Governance Commitments */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-400" />
            <span>Ethical Mandates & Supervisory Boundaries</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Guiding principles ensuring that technology reinforces rather than circumvents sovereign economic intent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>No Foreign Ownership Circumvention</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              VietAccess is strictly designed not to grant corporate voting rights or proxy influence. It honors the
              legislative intent of FOL statutes by ensuring domestic corporate governance remains uncompromised.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Anti-Regulatory Arbitrage</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              The platform rejects regulatory arbitrage or offshore jurisdictional evasion. All custodian activities occur
              under licensed Vietnamese entities subject to State Securities Commission supervision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>No Guaranteed Returns</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              The project completely disclaims any promise of capital preservation, risk-free yield, or secondary market
              peg stability. Unit prices strictly track underlying equity volatility.
            </p>
          </div>
        </div>
      </div>

      {/* Part 3: UN Sustainable Development Goal 9 (Industry, Innovation & Infrastructure) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-serif text-sm">
            <Globe2 className="w-5 h-5" />
            <span>UN Sustainable Development Goal 9: Resilient Financial Infrastructure</span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
            SDG 9 TARGET 9.3 & 9.B
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Emerging capital markets frequently face liquidity bottlenecks and high foreign entry premiums due to
            antiquated bilateral settlement rails and statutory foreign ownership barriers. VietAccess illustrates how{' '}
            <strong>resilient, auditable digital financial market infrastructure (FMIs)</strong> can bridge international
            capital allocators with high-growth domestic enterprises in developing economies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-white block text-xs">Target 9.3 (Financial Integration):</span>
              <p className="text-slate-400 text-[11px]">
                Expands access of Vietnamese enterprises to long-term international institutional capital while respecting
                national prudential limits and safeguarding domestic banking sovereignty.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-white block text-xs">Target 9.B (Domestic Technology Innovation):</span>
              <p className="text-slate-400 text-[11px]">
                Promotes high-value domestic financial engineering, replacing informal OTC premium structures with
                transparent, cryptographically verifiable, regulator-supervised systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
