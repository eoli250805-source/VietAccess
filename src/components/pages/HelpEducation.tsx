import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  BookOpen,
  Scale,
  ShieldCheck,
  Building2,
  Coins,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

export const HelpEducation: React.FC = () => {
  const { navigateTo } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is VietAccess and what problem does it solve?',
      a: 'VietAccess is an academic and institutional prototype for a permissioned depository platform. In Vietnam, statutory Foreign Ownership Limits (FOL) cap foreign equity stakes in strategic listed companies (typically at 30% or 49%). Once foreign room is exhausted, international institutional investors face steep bilateral off-exchange premiums or complete market exclusion. VietAccess demonstrates how a licensed domestic custodian can hold physical shares in ring-fenced trust accounts and issue non-voting digital economic-exposure receipts to eligible foreign investors.'
    },
    {
      q: 'What is the "Rights Separation Principle"?',
      a: 'VietAccess strictly decouples economic benefits (cash dividends, capital appreciation) from corporate governance rights (voting shares, AGM representation, proxy rights). Receipt holders receive 100% of pass-through dividends and reference price exposure, while zero voting power passes to foreign investors. This preserves the sovereign intent of Vietnamese enterprise regulations while enabling foreign capital participation.'
    },
    {
      q: 'Does a VietAccess Digital Receipt convey legal title to Vietnamese shares?',
      a: 'No. Digital receipts represent a contractual claim on economic exposure only. Legal ownership of the underlying physical shares remains exclusively registered in the name of the licensed domestic depository (Lotus Custody Bank) at the Vietnam Securities Depository (VSD).'
    },
    {
      q: 'How does Lotus Custody Bank enforce 100% reserve backing?',
      a: 'Every digital receipt minted on the VietAccess permissioned ledger is cryptographically bound to a physical share deposited in vault account LOT-VSD-992. The consensus smart contracts prevent the total supply of receipts from ever exceeding verified shares in custody. Independent auditor nodes (Horizon Assurance) and supervisory nodes (SSC) run automated continuous invariant reconciliations.'
    },
    {
      q: 'How does Delivery-versus-Payment (DvP) work on this platform?',
      a: 'Acquisitions and redemptions settle through DvP escrow logic. In simulated mode, cash reserves and digital receipts are swapped atomically at verified reference prices, eliminating settlement risk and counterparty default.'
    },
    {
      q: 'How are cash distributions and dividends processed?',
      a: 'When an underlying Vietnamese listed company pays a dividend, Lotus Custody Bank receives the cash into a segregated client money trust account. VietAccess calculates the per-receipt entitlement, deducts the statutory 5% foreign non-resident withholding tax, and credits the net amount directly to the investor’s settlement escrow account.'
    },
    {
      q: 'How can an investor exit or redeem receipts?',
      a: 'Investors can submit a redemption request through the Redemption console. The digital receipts are burned on the permissioned ledger, and Lotus Custody Bank either disburses net cash proceeds (following an orderly on-exchange execution) or transfers proceeds within the T+1 settlement window.'
    }
  ];

  const glossary = [
    {
      term: 'FOL (Foreign Ownership Limit)',
      def: 'Statutory ceiling imposed by Vietnamese law restricting total aggregate foreign ownership percentage in specified industries.'
    },
    {
      term: 'QFII (Qualified Foreign Institutional Investor)',
      def: 'Institutional entities (pension funds, sovereign wealth funds, licensed asset managers) verified under KYC/AML and approved for participation.'
    },
    {
      term: 'VSD (Vietnam Securities Depository)',
      def: 'The national centralized securities depository and settlement entity of Vietnam.'
    },
    {
      term: 'DvP (Delivery versus Payment)',
      def: 'A securities settlement mechanism where delivery of securities occurs only if payment occurs simultaneously.'
    },
    {
      term: 'Ring-Fenced Depository Account',
      def: 'A segregated trust account held by the custodian designed for bankruptcy-remote asset segregation, subject to regulatory approval.'
    },
    {
      term: 'Permissioned Ledger',
      def: 'A private, multi-validator enterprise blockchain run exclusively by licensed institutions and regulatory observer nodes.'
    }
  ];

  return (
    <div id="help-education-root" className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Institutional Knowledge Base
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            ACADEMIC SPECIFICATION
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Platform Architecture & Regulatory FAQ
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Comprehensive guide to the rights separation model, custody ring-fencing, and statutory compliance framework.
        </p>
      </div>

      {/* 3 Pillar Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Rights Separation Principle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strict statutory boundary separating economic exposure from corporate governance. Receipt holders possess zero voting rights or proxy authority.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">100% Segregated Custody</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every token is strictly 1:1 backed by physical equities registered at the VSD in trust vaults designed for bankruptcy-remote asset segregation (subject to regulatory approval) managed by Lotus Custody Bank.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Supervised Consensus</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Permissioned Istanbul BFT network validated by regulatory observer nodes (SSC), custody oracles, and independent assurance partners.
          </p>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Institutional Glossary */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span>Institutional Glossary & Technical Terminology</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {glossary.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-mono font-bold text-emerald-400 block">{item.term}</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">{item.def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Exploration Footer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <h3 className="font-bold text-white text-sm">Explore Institutional Exposure Units</h3>
          <p className="text-slate-400 mt-0.5">
            Test simulated primary allocation and see the permissioned ledger update in real time.
          </p>
        </div>
        <button
          onClick={() => navigateTo('markets')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950 self-start sm:self-auto"
        >
          <span>Open Exposure Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
