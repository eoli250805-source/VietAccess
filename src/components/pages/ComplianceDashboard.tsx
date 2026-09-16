import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  Lock,
  Unlock,
  CheckCircle2,
  Users,
  Building2,
  Sliders,
  Scale,
  Download,
  AlertOctagon,
  Eye,
  Check,
  X
} from 'lucide-react';

export const ComplianceDashboard: React.FC = () => {
  const {
    investorCases,
    updateInvestorReview,
    complianceAlerts,
    updateComplianceAlert,
    systemControls,
    initiateSystemPause,
    approveSystemPause,
    resumeSystemOperations,
    products
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Approved' | 'Pending Review' | 'Rejected'>('ALL');
  const [maxOrderSize, setMaxOrderSize] = useState<number>(50000);
  const [limitsSaved, setLimitsSaved] = useState<boolean>(false);

  const filteredInvestors = investorCases.filter(inv => {
    if (filterStatus === 'ALL') return true;
    return inv.status === filterStatus;
  });

  const handleSaveLimits = () => {
    setLimitsSaved(true);
    setTimeout(() => setLimitsSaved(false), 2000);
  };

  const handleExportAudit = () => {
    const report = {
      timestamp: new Date().toISOString(),
      regulatorNode: 'SSC-REG-01',
      systemControls,
      activeAlerts: complianceAlerts,
      investorCases
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VietAccess_Compliance_Audit_${new Date().toISOString().substring(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleGlobal = () => {
    if (systemControls.allTransfersPaused) {
      resumeSystemOperations();
    } else {
      initiateSystemPause('PAUSE_ALL', 'Compliance circuit-breaker trigger initiated via console');
      // If regulatory or dual role, approve immediately for prototype demonstration
      approveSystemPause();
    }
  };

  const handleToggleProduct = (productCode: string) => {
    initiateSystemPause('PAUSE_PRODUCT', `Emergency freeze on ${productCode}`, productCode);
    approveSystemPause();
  };

  return (
    <div id="compliance-dashboard-root" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Regulatory Supervisory Console
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              SSC OBSERVER NODE #01
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Compliance & Regulatory Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time surveillance of foreign investor qualifications, foreign ownership limits, circuit breakers, and AML limits.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Export Supervisory Report</span>
        </button>
      </div>

      {/* Emergency Global Circuit-Breaker Control Panel */}
      <div
        className={`p-6 rounded-2xl border transition-all shadow-xl space-y-4 ${
          systemControls.allTransfersPaused
            ? 'bg-rose-950/40 border-rose-500/70'
            : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl border ${
                systemControls.allTransfersPaused
                  ? 'bg-rose-900 border-rose-600 text-rose-100'
                  : 'bg-slate-950 border-slate-800 text-emerald-400'
              }`}
            >
              {systemControls.allTransfersPaused ? (
                <Lock className="w-6 h-6" />
              ) : (
                <Unlock className="w-6 h-6" />
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Emergency Circuit-Breaker Mechanism</span>
                {systemControls.allTransfersPaused ? (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500 text-white">
                    SYSTEM FROZEN
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    OPERATIONAL
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Regulator and custodian dual-key power to halt all primary mints, secondary transfers, and redemptions across the platform.
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleGlobal}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg ${
              systemControls.allTransfersPaused
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/60'
            }`}
          >
            {systemControls.allTransfersPaused ? 'Lift Global Circuit Breaker' : 'Trigger Global Emergency Pause'}
          </button>
        </div>

        {/* Per-Product Circuit Breakers */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
            Individual Instrument Halts:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {products.map(p => {
              const isPaused = systemControls.pausedProductCodes.includes(p.code);
              return (
                <button
                  key={p.code}
                  onClick={() => handleToggleProduct(p.code)}
                  className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center justify-between gap-1 transition-all ${
                    isPaused
                      ? 'bg-rose-950 border-rose-500 text-rose-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">{p.code}</span>
                  <span className={`text-[10px] ${isPaused ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>
                    {isPaused ? 'HALTED' : 'Active'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Surveillance Alerts & System Limit Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Surveillance Alerts */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Real-Time Market Surveillance Alerts</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {complianceAlerts.length} Active Feeds
            </span>
          </div>

          <div className="space-y-2.5">
            {complianceAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  alert.severity === 'High' || alert.severity === 'Critical'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : alert.severity === 'Medium'
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-[11px] uppercase tracking-wider">
                    {alert.event}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">{alert.timestamp}</span>
                    {alert.status === 'Open' && (
                      <button
                        onClick={() => updateComplianceAlert(alert.id, 'Cleared', 'Reviewed and cleared by regulator node')}
                        className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-semibold hover:bg-emerald-900"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <p className="leading-relaxed">{alert.triggeredRule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Risk Limits Control */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <span>Mandatory Quantitative Limits</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Enforced at Consensus</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium block">
                Maximum Single Order Size (Receipt Units)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={maxOrderSize}
                  onChange={e => setMaxOrderSize(parseInt(e.target.value, 10) || 0)}
                  className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono font-bold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveLimits}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                >
                  {limitsSaved ? 'Saved!' : 'Update'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Prevents market manipulation and abrupt absorption of depository inventory.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium block">
                Daily Investor Volume Cap (Escrow Settlement)
              </label>
              <input
                type="text"
                disabled
                value={formatVND(150000000000)}
                className="w-full p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Statutory daily foreign inflow ceiling under Circular 12/2021/TT-NHNN.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Investor Qualification & Whitelist Review Queue */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Institutional Investor Whitelist & KYC Queue</h2>
            <p className="text-xs text-slate-400">
              Only qualified foreign institutional investors (QFII) with approved custodian escrow may hold receipts.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {(['ALL', 'Approved', 'Pending Review', 'Rejected'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterStatus === status
                    ? 'bg-slate-800 text-emerald-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Entity ID</th>
                <th className="p-4">Legal Institution Name</th>
                <th className="p-4">Jurisdiction</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4">Risk Rating</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Supervisory Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInvestors.map(inv => (
                <tr key={inv.investorId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-blue-400">{inv.investorId}</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-100">{inv.institutionName}</div>
                    <span className="text-[10px] text-slate-500 font-mono">{inv.beneficialOwnerStatus}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{inv.jurisdiction}</td>
                  <td className="p-4 text-slate-400">{inv.investorType}</td>
                  <td className="p-4 font-mono text-slate-400 text-[11px]">{inv.riskRating}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        inv.status === 'Approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : inv.status === 'Pending Review'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {inv.status === 'Pending Review' && (
                      <>
                        <button
                          onClick={() => updateInvestorReview(inv.investorId, 'Approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateInvestorReview(inv.investorId, 'Rejected')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {inv.status === 'Approved' && (
                      <button
                        onClick={() => updateInvestorReview(inv.investorId, 'Rejected')}
                        className="px-2.5 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 text-[11px] transition-colors"
                      >
                        Suspend
                      </button>
                    )}
                    {inv.status === 'Rejected' && (
                      <button
                        onClick={() => updateInvestorReview(inv.investorId, 'Approved')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-[11px] transition-colors"
                      >
                        Re-instate
                      </button>
                    )}
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
