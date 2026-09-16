import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Globe,
  FileCheck,
  UserCheck,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lock,
  Scale
} from 'lucide-react';

export const InvestorOnboarding: React.FC = () => {
  const { onboardingData, updateOnboarding, navigateTo } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    { num: 1, title: 'Classification', desc: 'Institutional Eligibility' },
    { num: 2, title: 'Identity & KYC', desc: 'Entity & Beneficial Ownership' },
    { num: 3, title: 'Risk & Experience', desc: 'Investment Mandate' },
    { num: 4, title: 'Legal Terms', desc: 'Non-Voting Acknowledgments' }
  ];

  const handlePreFillInstitutional = () => {
    updateOnboarding({
      investorType: 'Institutional Asset Manager',
      institutionName: 'Global Pacific Asset Management (Singapore) Ltd',
      jurisdiction: 'Singapore',
      accreditedStatus: 'Qualified Institutional Investor',
      identityType: 'MAS Licensed Fund Registration',
      registrationNumber: 'MAS-REG-2024-88910',
      authorisedRepresentative: 'Alexander Wong (Managing Director)',
      beneficialOwnerDeclared: true,
      eligibleJurisdictionConfirmed: true,
      kycChecksPassed: true,
      investmentExperience: '> 10 Years Institutional Asian Equities',
      investmentHorizon: 'Long Term (3-5 Years)',
      lossTolerance: 'Institutional Aggressive / Value-Seeking',
      liquidityNeeds: 'Periodic Quarterly Redemption',
      understandingNonVoting: 'Acknowledged: Non-voting contractual economic exposure only',
      ackNotShares: true,
      ackNoVoting: true,
      ackNoGuaranteedReturns: true,
      ackPriceVariance: true,
      ackRedemptionDelay: true,
      ackRestrictedTransfers: true,
      status: 'Approved'
    });
    setCurrentStep(4);
  };

  const handleFinish = () => {
    updateOnboarding({ status: 'Approved' });
    navigateTo('dashboard');
  };

  return (
    <div id="investor-onboarding-root" className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Simulation Warning:</strong> Do not enter real personal, corporate, or financial documents. All data is processed locally for academic demonstration.
          </span>
        </div>
        <button
          onClick={handlePreFillInstitutional}
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pre-fill Sample QFII</span>
        </button>
      </div>

      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
            Participant Whitelisting
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Investor Onboarding & Qualification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Institutional verification pipeline enforcing FATF AML standards, beneficial ownership checks, and statutory non-voting covenants.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono block">CLEARANCE STATUS</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                onboardingData.status === 'Approved'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {onboardingData.status}
            </span>
          </div>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map(step => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isActive
                  ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : isDone
                  ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-950 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-400">STAGE 0{step.num}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <p className="font-semibold text-xs text-slate-200 truncate">{step.title}</p>
              <p className="text-[10px] text-slate-500 truncate">{step.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Step Contents */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        {/* Step 1: Classification */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Stage 1: Institutional Classification</h3>
              <p className="text-xs text-slate-400">
                Determine eligible foreign participant status under host and target jurisdictions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Investor Entity Type</label>
                <select
                  value={onboardingData.investorType}
                  onChange={e => updateOnboarding({ investorType: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 font-sans"
                >
                  <option value="Institutional Asset Manager">Institutional Asset Manager</option>
                  <option value="Sovereign Wealth Fund">Sovereign Wealth Fund</option>
                  <option value="Pension Fund / Endowment">Pension Fund / Endowment</option>
                  <option value="Single Family Office">Single Family Office ($50M+ AUM)</option>
                  <option value="Accredited Qualified Purchaser">Accredited Qualified Purchaser</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Incorporation Jurisdiction</label>
                <select
                  value={onboardingData.jurisdiction}
                  onChange={e => updateOnboarding({ jurisdiction: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 font-sans"
                >
                  <option value="Singapore">Singapore (MAS Regulated)</option>
                  <option value="Hong Kong">Hong Kong (SFC Type 9)</option>
                  <option value="United Kingdom">United Kingdom (FCA Authorized)</option>
                  <option value="United States">United States (SEC Registered)</option>
                  <option value="Japan">Japan (FSA Registered)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Institution Legal Name</label>
                <input
                  type="text"
                  value={onboardingData.institutionName}
                  onChange={e => updateOnboarding({ institutionName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Accreditation Standing</label>
                <input
                  type="text"
                  value={onboardingData.accreditedStatus}
                  onChange={e => updateOnboarding({ accreditedStatus: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <span>Continue to Identity & KYC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Identity & KYC */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Stage 2: Institutional Identity & KYC</h3>
              <p className="text-xs text-slate-400">
                Verification of regulatory register, authorized signatories, and beneficial owners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Regulatory Identifier Type</label>
                <input
                  type="text"
                  value={onboardingData.identityType}
                  onChange={e => updateOnboarding({ identityType: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Registration / LEI Number</label>
                <input
                  type="text"
                  value={onboardingData.registrationNumber}
                  onChange={e => updateOnboarding({ registrationNumber: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 font-mono focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-slate-300 font-medium">Authorised Institutional Signatory</label>
                <input
                  type="text"
                  value={onboardingData.authorisedRepresentative}
                  onChange={e => updateOnboarding({ authorisedRepresentative: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.beneficialOwnerDeclared}
                  onChange={e => updateOnboarding({ beneficialOwnerDeclared: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                />
                <span className="text-slate-300">
                  Ultimate Beneficial Ownership (UBO) declaration completed: No single individual holds undisclosed &gt;25% voting interest.
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.eligibleJurisdictionConfirmed}
                  onChange={e => updateOnboarding({ eligibleJurisdictionConfirmed: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                />
                <span className="text-slate-300">
                  Sanctions & PEP Screening: Entity cleared against OFAC, EU, UN, and MAS consolidated lists.
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <span>Continue to Risk & Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Risk & Experience */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Stage 3: Investment Mandate & Risk Profile</h3>
              <p className="text-xs text-slate-400">
                Confirm institutional experience with emerging market equities and liquidity horizons.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Emerging Market Experience</label>
                <input
                  type="text"
                  value={onboardingData.investmentExperience}
                  onChange={e => updateOnboarding({ investmentExperience: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Investment Horizon</label>
                <input
                  type="text"
                  value={onboardingData.investmentHorizon}
                  onChange={e => updateOnboarding({ investmentHorizon: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Loss Tolerance Mandate</label>
                <input
                  type="text"
                  value={onboardingData.lossTolerance}
                  onChange={e => updateOnboarding({ lossTolerance: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Liquidity Expectation</label>
                <input
                  type="text"
                  value={onboardingData.liquidityNeeds}
                  onChange={e => updateOnboarding({ liquidityNeeds: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <span>Continue to Legal Terms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Legal Acknowledgments */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Stage 4: Statutory Legal Acknowledgments</h3>
              <p className="text-xs text-slate-400">
                All boxes below must be explicitly affirmed to activate primary issuance and trading permissions.
              </p>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 divide-y divide-slate-800/80">
              <label className="flex items-start gap-3 pt-2 first:pt-0 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.ackNotShares}
                  onChange={e => updateOnboarding({ ackNotShares: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Non-Share Instrument:</strong> I understand that Economic Exposure Receipts are contractual claims and do NOT convey legal ownership of underlying Vietnamese shares.
                </span>
              </label>

              <label className="flex items-start gap-3 pt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.ackNoVoting}
                  onChange={e => updateOnboarding({ ackNoVoting: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Zero Voting Rights:</strong> I acknowledge that receipt holders have no voting rights, board representation, or corporate governance powers in the underlying companies.
                </span>
              </label>

              <label className="flex items-start gap-3 pt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.ackNoGuaranteedReturns}
                  onChange={e => updateOnboarding({ ackNoGuaranteedReturns: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>No Guaranteed Returns:</strong> Economic performance fluctuates with HOSE reference share prices and company dividend declarations. Capital is at market risk.
                </span>
              </label>

              <label className="flex items-start gap-3 pt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.ackPriceVariance}
                  onChange={e => updateOnboarding({ ackPriceVariance: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Tracking Variance:</strong> Receipt valuations may diverge slightly from underlying on-exchange equity prices due to liquidity spreads and custody operational fees.
                </span>
              </label>

              <label className="flex items-start gap-3 pt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.ackRedemptionDelay}
                  onChange={e => updateOnboarding({ ackRedemptionDelay: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Redemption Mechanics:</strong> Redemptions settle under simulated T+1 net DvP cycles and may be suspended during market circuit breakers or depository holidays.
                </span>
              </label>

              <label className="flex items-start gap-3 pt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.ackRestrictedTransfers}
                  onChange={e => updateOnboarding({ ackRestrictedTransfers: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Restricted Secondary Transfers:</strong> Receipts can only be transferred between whitelisted, KYC-cleared institutional participants on the permissioned ledger.
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Back
              </button>
              <button
                id="btn-complete-onboarding"
                onClick={handleFinish}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Complete Onboarding</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
