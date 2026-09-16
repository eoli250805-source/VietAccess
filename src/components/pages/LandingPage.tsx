import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { formatVND } from '../../data/mockData';
import {
  ArrowRight,
  Shield,
  Layers,
  Building2,
  CheckCircle2,
  ChevronRight,
  Lock,
  Eye,
  Scale,
  Users,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  Wallet
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  licensing: string;
  assetFlow: string;
  riskSeparation: string;
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'investor',
    title: 'Eligible Foreign Investor',
    subtitle: 'Institutional Participant',
    role: 'Accredited foreign fund or asset manager holding contractual non-voting digital receipts.',
    licensing: 'Whitelisted via KYC / AML & Institutional Classification (FATF Compliant).',
    assetFlow: 'Funds deposited into segregated institutional escrow; receives digital receipts.',
    riskSeparation: 'Holds contractual economic claim only; zero direct voting title.'
  },
  {
    id: 'issuer',
    title: 'Licensed Issuer',
    subtitle: 'VietAccess SPV',
    role: 'Special Purpose Vehicle issuing 1:1 backed digital receipts against ring-fenced equity reserves.',
    licensing: 'Regulated special-purpose issuing entity under domestic sandbox jurisdiction.',
    assetFlow: 'Coordinates primary issuance, receipt minting, and dividend pass-through.',
    riskSeparation: 'Designed for bankruptcy-remote asset segregation under SPV framework, subject to regulatory approval.'
  },
  {
    id: 'custodian',
    title: 'Segregated Custodian',
    subtitle: 'Lotus Custody Bank',
    role: 'Licensed domestic depository bank holding underlying physical equities in ring-fenced vault accounts.',
    licensing: 'Licensed Depository Bank registered with State Securities Commission (SSC) & VSD.',
    assetFlow: 'Holds 100% physical shares; collects cash dividends and distributes to issuer escrow.',
    riskSeparation: 'Strict legal ring-fencing; client equities excluded from bank liquidation pool.'
  },
  {
    id: 'broker',
    title: 'Licensed Broker',
    subtitle: 'Meridian Securities',
    role: 'On-exchange member broker executing primary equity market orders on HOSE.',
    licensing: 'SSC Licensed Trading Member Broker on Ho Chi Minh City Stock Exchange (HOSE).',
    assetFlow: 'Executes market acquisitions on local market under standard T+1 clearing cycle.',
    riskSeparation: 'Execution agent only; never holds proprietary title to client-allocated shares.'
  },
  {
    id: 'equities',
    title: 'Underlying Equities',
    subtitle: 'HOSE Listed Companies',
    role: 'Blue-chip Vietnamese listed companies operating at or near Foreign Ownership Limits (FOL).',
    licensing: 'Publicly listed entities registered with Vietnam Securities Depository (VSD).',
    assetFlow: 'Generate real underlying cash dividends and enterprise equity value growth.',
    riskSeparation: 'Governance preserved; domestic voting control unchanged by receipt issuance.'
  }
];

export const LandingPage: React.FC = () => {
  const { products, navigateTo, setCurrentRole } = useApp();
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[0]);

  return (
    <div id="landing-page-root" className="space-y-16 py-4">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulated Institutional Framework Prototype</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Institutional Digital Receipts for Vietnamese Equities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            VietAccess explores a non-voting economic exposure framework for foreign institutions targeting Vietnamese equities constrained by Foreign Ownership Limits (FOL). A licensed domestic custodian holds underlying shares in segregated custody, while eligible investors hold digital receipts linked to share performance and cash distributions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-explore-markets-btn"
              onClick={() => navigateTo('markets')}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50 hover:translate-y-[-1px]"
            >
              <span>Explore Exposure Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-how-it-works-btn"
              onClick={() => navigateTo('how_it_works')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>Operating Architecture</span>
            </button>
          </div>
        </div>

        {/* 4-Column Metric Bar */}
        <div className="mt-12 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-slate-800 text-slate-300">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
              Total Segregated Custody Value
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              12.4T VND
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">~$496M USD equivalent</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
              Active Digital Receipts
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              142,500,000
            </div>
            <span className="text-[11px] text-slate-400">Circulating across 6 products</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
              Available Non-Voting Exposure Capacity
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">
              Expanded
            </div>
            <span className="text-[11px] text-slate-400">Within segregated custodian holdings</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
              Required Backing Ratio
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono flex items-center gap-2">
              100% Min
              <CheckCircle2 className="w-5 h-5 text-emerald-400 inline" />
            </div>
            <span className="text-[11px] text-slate-400">Coverage: 112.16% (2.7M unallocated shares)</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Architecture Diagram */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Multi-Tier Custody Architecture</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Institutional Asset Separation Model
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Click each counterparty node below to inspect regulatory standing, licensing boundaries, and the strict statutory firewalls separating economic receipts from legal share ownership.
            </p>
          </div>
        </div>

        {/* 5-Node Interactive Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {ARCHITECTURE_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                id={`arch-node-${node.id}`}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      STEP 0{index + 1}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </div>
                  <h4 className="font-semibold text-sm text-slate-100 leading-snug">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{node.subtitle}</p>
                </div>
                <div className="mt-3 text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Detailed Inspector Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                Counterparty Inspection
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                {selectedNode.title}
                <span className="text-xs font-normal text-slate-400 font-mono">
                  ({selectedNode.subtitle})
                </span>
              </h3>
            </div>
            <div className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">
              Segregated Depository Layer
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Institutional Role</span>
              <p className="text-slate-200 leading-relaxed">{selectedNode.role}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Licensing & Regulatory Standing</span>
              <p className="text-slate-200 leading-relaxed">{selectedNode.licensing}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Asset & Capital Flow</span>
              <p className="text-slate-200 leading-relaxed">{selectedNode.assetFlow}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Risk Separation Boundary</span>
              <p className="text-emerald-300 leading-relaxed">{selectedNode.riskSeparation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Value Propositions (3 Cards) */}
      <section className="space-y-6">
        <div>
          <div className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
            Core Principles
          </div>
          <h2 className="text-2xl font-bold text-white">
            Engineered for Compliance & Institutional Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Legal Segregation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Underlying shares are legally held in segregated custody at licensed domestic banks (Lotus Custody Bank). Assets are ring-fenced under trust protocols and never commingled with platform operations or broker balance sheets.
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 font-mono">
              Designed for bankruptcy-remote asset segregation, subject to regulatory approval.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Real-Time Transparency</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every circulating receipt is mapped 1:1 to underlying shares on a permissioned, auditable ledger. Independent audit partners conduct daily proof-of-reserve reconciliations signed with verifiable digital certificates.
            </p>
            <div className="pt-2 text-[11px] text-blue-400 font-mono">
              ✓ Continuous Consensus Audit Trail
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Non-Voting Architecture</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides foreign institutional investors with contractual economic exposure to market price growth and eligible cash dividends without voting rights, preserving corporate governance compliance under Vietnamese law.
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-mono">
              ✓ Foreign Ownership Limits Respected
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Preview Table (6 Products) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
              Exposure Catalog
            </div>
            <h2 className="text-2xl font-bold text-white">
              Selected FOL-Constrained Vietnamese Equities
            </h2>
          </div>
          <button
            onClick={() => navigateTo('markets')}
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View all products</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Receipt Code</th>
                <th className="p-4">Underlying Company</th>
                <th className="p-4">Sector</th>
                <th className="p-4">FOL Status</th>
                <th className="p-4 text-right">Reference Price</th>
                <th className="p-4 text-right">Available Receipts</th>
                <th className="p-4 text-center">Required Backing</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map(product => (
                <tr key={product.code} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-emerald-400">
                    {product.code}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-100">{product.name}</div>
                    <span className="text-[10px] text-slate-500 font-mono">HOSE: {product.underlyingTicker}</span>
                  </td>
                  <td className="p-4 text-slate-400">{product.sector}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-950/60 text-amber-300 border border-amber-800/60">
                      {product.foreignOwnershipLimit}% FOL Reached
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-semibold text-slate-100">
                    {formatVND(product.referencePriceVND)}
                  </td>
                  <td className="p-4 text-right font-mono text-slate-300">
                    {product.availableReceipts.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      100% Min Backed
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      id={`btn-view-${product.code}`}
                      onClick={() => navigateTo('product_detail', product.code)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-colors"
                    >
                      View Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. How It Works (4-Step Preview) */}
      <section className="space-y-6">
        <div>
          <div className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
            Investor Journey
          </div>
          <h2 className="text-2xl font-bold text-white">
            Four Steps to Simulated Institutional Exposure
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold">01. ONBOARD</div>
            <h4 className="font-semibold text-slate-100 text-sm">Institutional Qualification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete investor classification, jurisdictional AML clearance, and execute non-voting legal acknowledgments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold">02. ACQUIRE</div>
            <h4 className="font-semibold text-slate-100 text-sm">Receipt Allocation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select exposure product, fund via institutional cash escrow, and receive 100% custody-backed digital receipts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold">03. HOLD & EARN</div>
            <h4 className="font-semibold text-slate-100 text-sm">Cash Distributions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Participate in share price movements and automatically collect eligible cash dividends net of tax into escrow.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold">04. REDEEM</div>
            <h4 className="font-semibold text-slate-100 text-sm">T+1 Fiat Settlement</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit redemption request, burn digital receipts permanently on-chain, and receive net VND proceeds.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Role Selector Callout */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Interactive Perspective Selector
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Explore VietAccess from Any Stakeholder Perspective
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Switching roles immediately updates the live dashboard, permissioned actions, and operational workflows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                Foreign Investor
              </span>
              <h4 className="font-bold text-slate-100 mt-2 text-sm">Asset Manager</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Browse products, simulate acquisitions, manage portfolio, and redeem.
              </p>
            </div>
            <button
              id="enter-as-investor-btn"
              onClick={() => setCurrentRole('foreign_investor')}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Enter as Investor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Custodian Bank
              </span>
              <h4 className="font-bold text-slate-100 mt-2 text-sm">Lotus Custody</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Verify underlying shares, approve minting, and run reconciliation.
              </p>
            </div>
            <button
              id="enter-as-custodian-btn"
              onClick={() => setCurrentRole('custodian')}
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Enter as Custodian</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Compliance Officer
              </span>
              <h4 className="font-bold text-slate-100 mt-2 text-sm">Head of Surveillance</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Review investor KYC, monitor alerts, and initiate circuit breakers.
              </p>
            </div>
            <button
              id="enter-as-compliance-btn"
              onClick={() => setCurrentRole('compliance_officer')}
              className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Enter as Compliance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Regulator
              </span>
              <h4 className="font-bold text-slate-100 mt-2 text-sm">Market Observer</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Audit system-wide backing parity, transaction ledgers, and incidents.
              </p>
            </div>
            <button
              id="enter-as-regulator-btn"
              onClick={() => setCurrentRole('regulatory_observer')}
              className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Enter as Observer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Prototype Notice */}
      <section className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Simulation Sandbox Notice:</strong> All market data, balances, and counterparties are simulated. No live transactions or real asset custody are supported.
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">ENV: DEMO_MODE</span>
      </section>
    </div>
  );
};
