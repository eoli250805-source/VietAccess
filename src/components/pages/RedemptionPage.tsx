import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  RotateCw,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Wallet,
  Building2
} from 'lucide-react';

export const RedemptionPage: React.FC = () => {
  const {
    portfolio,
    products,
    selectedProductCode,
    setSelectedProductCode,
    simulateRedemption,
    navigateTo,
    systemControls
  } = useApp();

  // Selected product
  const defaultCode = portfolio.length > 0 ? portfolio[0].productCode : products[0].code;
  const currentCode = selectedProductCode || defaultCode;
  const position = portfolio.find(p => p.productCode === currentCode);
  const product = products.find(p => p.code === currentCode) || products[0];

  const maxRedeemable = position ? position.quantity : 0;
  const [redeemQtyInput, setRedeemQtyInput] = useState<string>(
    maxRedeemable > 0 ? Math.min(2500, maxRedeemable).toString() : '0'
  );
  const [settlementDest, setSettlementDest] = useState<string>(
    'Lotus Segregated Institutional Escrow 001-INV'
  );
  const [acknowledgedBurn, setAcknowledgedBurn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const quantity = parseInt(redeemQtyInput, 10) || 0;
  const unitPrice = product.referencePriceVND;
  const grossProceedsVND = quantity * unitPrice;
  const redemptionFeeVND = Math.round(grossProceedsVND * 0.002); // 0.20% fee
  const netProceedsVND = grossProceedsVND - redemptionFeeVND;

  const handleSetMax = () => {
    setRedeemQtyInput(maxRedeemable.toString());
    setErrorMessage(null);
  };

  const handleExecuteRedeem = () => {
    setErrorMessage(null);

    if (quantity <= 0) {
      setErrorMessage('Please enter a valid quantity to redeem.');
      return;
    }

    if (quantity > maxRedeemable) {
      setErrorMessage(`Insufficient receipt holdings. You currently hold ${maxRedeemable.toLocaleString()} units.`);
      return;
    }

    if (!acknowledgedBurn) {
      setErrorMessage('You must acknowledge that redeemed receipts will be burned on the permissioned ledger.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = simulateRedemption(currentCode, quantity);
      setIsSubmitting(false);

      if (!res.success && res.error) {
        setErrorMessage(res.error);
      }
    }, 400);
  };

  const isPaused =
    systemControls.allTransfersPaused || systemControls.pausedProductCodes.includes(currentCode);

  return (
    <div id="redemption-page-root" className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Digital Receipt Liquidation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              T+1 DvP REDEMPTION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Simulate Receipt Redemption & Burn
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Surrender digital receipts to release underlying equities from custody and receive net cash proceeds into escrow.
          </p>
        </div>

        <button
          onClick={() => navigateTo('portfolio')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors self-start sm:self-auto"
        >
          View All Holdings
        </button>
      </div>

      {/* Circuit breaker warning */}
      {isPaused && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <h4 className="font-bold">Redemption Suspended</h4>
            <p className="text-[11px] text-rose-300">
              Redemptions for {currentCode} are currently frozen under circuit-breaker provisions.
            </p>
          </div>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            {/* Product Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Select Holding to Redeem
              </label>
              <select
                value={currentCode}
                onChange={e => {
                  setSelectedProductCode(e.target.value);
                  const p = portfolio.find(x => x.productCode === e.target.value);
                  const max = p ? p.quantity : 0;
                  setRedeemQtyInput(max > 0 ? Math.min(2500, max).toString() : '0');
                  setErrorMessage(null);
                }}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
              >
                {portfolio.map(pos => {
                  const p = products.find(prod => prod.code === pos.productCode);
                  return (
                    <option key={pos.productCode} value={pos.productCode}>
                      {pos.productCode} — {p?.name} (Holdings: {pos.quantity.toLocaleString()} units)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Quantity to Redeem */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Units to Surrender / Burn
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Available in Portfolio: <strong className="text-slate-200">{maxRedeemable.toLocaleString()}</strong>
                </span>
              </div>

              <input
                type="number"
                value={redeemQtyInput}
                onChange={e => {
                  setRedeemQtyInput(e.target.value);
                  setErrorMessage(null);
                }}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-base text-slate-100 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />

              {/* Quick chip buttons */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                {[1000, 2500, 5000].map(qty => (
                  <button
                    key={qty}
                    type="button"
                    disabled={qty > maxRedeemable}
                    onClick={() => {
                      setRedeemQtyInput(qty.toString());
                      setErrorMessage(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors ${
                      qty > maxRedeemable
                        ? 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    {qty.toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleSetMax}
                  className="px-2.5 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-800 text-amber-300 font-mono text-[11px] font-bold"
                >
                  Redeem All ({maxRedeemable.toLocaleString()})
                </button>
              </div>
            </div>

            {/* Settlement Destination Account */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Cash Credit Destination Account
              </label>
              <select
                value={settlementDest}
                onChange={e => setSettlementDest(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Lotus Segregated Institutional Escrow 001-INV">
                  Lotus Segregated Institutional Escrow 001-INV (VND settlement)
                </option>
                <option value="Global Pacific Domestic Custody Clearing Vault">
                  Global Pacific Domestic Custody Clearing Vault (VND wire)
                </option>
              </select>
            </div>

            {/* Mandatory Burn Acknowledgment */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={acknowledgedBurn}
                  onChange={e => setAcknowledgedBurn(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Permanent Token Burn Confirmation:</strong> I understand that submitting this request irrevocably burns {quantity.toLocaleString()} digital receipts on the VietAccess permissioned ledger. Lotus Custody Bank will release the corresponding underlying equities according to T+1 settlement windows.
                </span>
              </label>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-redemption"
              type="button"
              disabled={isSubmitting || isPaused || maxRedeemable === 0}
              onClick={handleExecuteRedeem}
              className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                isPaused || maxRedeemable === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/60'
              }`}
            >
              {isSubmitting ? (
                <span>Executing Settlement & Burn...</span>
              ) : (
                <>
                  <Flame className="w-4 h-4" />
                  <span>Execute Simulated Redemption ({formatVND(netProceedsVND)})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Settlement Summary */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold border-b border-slate-800 pb-3">
              Redemption Proceeds
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Receipts to Burn:</span>
                <span className="font-mono text-slate-200 font-semibold">{quantity.toLocaleString()} units</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Reference Price:</span>
                <span className="font-mono text-slate-200">{formatVND(unitPrice)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Gross Proceeds:</span>
                <span className="font-mono text-slate-200">{formatVND(grossProceedsVND)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Redemption & Custody Fee (0.20%):</span>
                <span className="font-mono text-slate-300">-{formatVND(redemptionFeeVND)}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-slate-100">Net Cash Credited:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {formatVND(netProceedsVND)}
                </span>
              </div>
            </div>

            {/* Timeline info */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Clearing Cycle: T+1 Delivery-vs-Payment</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[10px]">
                Upon block validation, cash escrow credits immediately in simulated mode; physical shares in vault LOT-VSD-992 are unencumbered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
