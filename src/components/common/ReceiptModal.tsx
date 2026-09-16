import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import { X, Printer, Download, CheckCircle2, Copy, Check, ShieldCheck, Building2, Hash } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { receiptModalData, setReceiptModalData } = useApp();
  const [copied, setCopied] = useState(false);

  if (!receiptModalData) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(receiptModalData.ledgerTxHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatedDownload = () => {
    const textContent = `
========================================================================
                      VIETACCESS PLATFORM
                SIMULATED INSTITUTIONAL RECEIPT
========================================================================
Receipt ID:              ${receiptModalData.transactionId}
Execution Timestamp:     ${receiptModalData.timestamp} UTC
Anonymised Participant:  ${receiptModalData.anonymisedInvestorId}
Settlement Account:      ${receiptModalData.settlementAccount}
Execution Status:        ${receiptModalData.status}

PRODUCT SPECIFICATION:
Receipt Code:            ${receiptModalData.productCode}
Product Description:     ${receiptModalData.productName}
Instrument Category:     Economic Exposure Receipt (Non-Voting)
Quantity Allocated:      ${receiptModalData.quantity.toLocaleString()} Receipts
Reference Price:         ${formatVND(receiptModalData.referencePriceVND)}

FINANCIAL BREAKDOWN:
Gross Value:             ${formatVND(receiptModalData.grossAmountVND)}
Issuance Fee (0.15%):    ${formatVND(receiptModalData.issuanceFeeVND)}
Transaction Fee (0.05%): ${formatVND(receiptModalData.transactionFeeVND)}
Administration (0.05%):  ${formatVND(receiptModalData.administrationFeeVND)}
TOTAL SETTLEMENT:        ${formatVND(receiptModalData.totalSettlementVND)}

LEDGER PROOF OF CUSTODY:
Segregated Custodian:    ${receiptModalData.verifyingCustodian}
Ledger Block Number:     #${receiptModalData.blockNumber}
Mock Consensus Hash:     ${receiptModalData.ledgerTxHash}

STATUTORY RIGHTS SEPARATION NOTICE:
This digital receipt represents contractual economic exposure to share value
and eligible cash distributions only. The holder does NOT receive legal title
to underlying shares, shareholder voting rights, or corporate governance rights.
All underlying equities are held in segregated custody at Lotus Custody Bank.

SIMULATION DISCLAIMER:
VietAccess is a non-functional demonstration platform. It does not provide
investment services, issue securities or process real transactions.
========================================================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VietAccess_Receipt_${receiptModalData.transactionId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="receipt-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="receipt-modal-container"
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-slate-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                Simulated Institutional Receipt
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700">
                  {receiptModalData.status}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Transaction ID: {receiptModalData.transactionId}
              </p>
            </div>
          </div>
          <button
            onClick={() => setReceiptModalData(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto font-sans text-xs">
          {/* Main Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Product</span>
              <p className="font-semibold text-slate-100 mt-0.5">{receiptModalData.productCode}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Quantity</span>
              <p className="font-semibold text-slate-100 mt-0.5 font-mono">
                {receiptModalData.quantity.toLocaleString()} units
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Ref. Price</span>
              <p className="font-semibold text-slate-100 mt-0.5 font-mono">
                {formatVND(receiptModalData.referencePriceVND)}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Net Settlement</span>
              <p className="font-bold text-emerald-400 mt-0.5 font-mono">
                {formatVND(receiptModalData.totalSettlementVND)}
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Settlement Breakdown
            </h4>
            <div className="bg-slate-950/40 rounded-xl border border-slate-800 divide-y divide-slate-800/60">
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Gross Receipt Consideration</span>
                <span className="font-mono text-slate-200">{formatVND(receiptModalData.grossAmountVND)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Primary Issuance Fee (0.15%)</span>
                <span className="font-mono text-slate-200">{formatVND(receiptModalData.issuanceFeeVND)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Broker Clearing & Exchange Gateway (0.05%)</span>
                <span className="font-mono text-slate-200">{formatVND(receiptModalData.transactionFeeVND)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Depository Administration Fee (0.05%)</span>
                <span className="font-mono text-slate-200">{formatVND(receiptModalData.administrationFeeVND)}</span>
              </div>
              <div className="p-3 flex justify-between bg-slate-900/60 font-semibold text-sm">
                <span className="text-slate-100">Total Settlement Charged to Escrow</span>
                <span className="font-mono text-emerald-400">{formatVND(receiptModalData.totalSettlementVND)}</span>
              </div>
            </div>
          </div>

          {/* Ledger Proof */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Permissioned Ledger Confirmation
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  Custodian Depository:
                </span>
                <span className="text-slate-200">{receiptModalData.verifyingCustodian}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Block Number:</span>
                <span className="text-slate-200">#{receiptModalData.blockNumber}</span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                <span className="text-slate-400 shrink-0">Simulated Hash:</span>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-emerald-400/90 truncate">{receiptModalData.ledgerTxHash}</span>
                  <button
                    onClick={handleCopyHash}
                    className="p-1 text-slate-400 hover:text-white shrink-0 rounded hover:bg-slate-800"
                    title="Copy hash"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Voting Disclaimer */}
          <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Receipts are not shares.</strong> Economic Exposure Receipts confer contractual participation in market price and eligible cash distributions without voting rights or legal share title. 100% of underlying shares remain segregated in Lotus Custody Bank.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Receipt</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulatedDownload}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Voucher (.txt)</span>
            </button>
            <button
              onClick={() => setReceiptModalData(null)}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
