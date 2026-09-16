import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  ArrowRight,
  Info,
  Scale,
  RotateCw,
  Coins
} from 'lucide-react';

export const TransactionSimulation: React.FC = () => {
  const {
    products,
    selectedProductCode,
    setSelectedProductCode,
    availableCashVND,
    simulateAcquisition,
    navigateTo,
    systemControls
  } = useApp();

  const product = products.find(p => p.code === selectedProductCode) || products[0];

  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPriceInput, setLimitPriceInput] = useState<string>(product.referencePriceVND.toString());
  const [quantityInput, setQuantityInput] = useState<string>('5000');
  const [settlementAccount, setSettlementAccount] = useState<string>(
    'Lotus Segregated Institutional Escrow 001-INV'
  );
  const [acknowledgedNonVoting, setAcknowledgedNonVoting] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const quantity = parseInt(quantityInput, 10) || 0;
  const executionPrice =
    orderType === 'limit' ? parseInt(limitPriceInput, 10) || product.referencePriceVND : product.referencePriceVND;

  const grossAmountVND = quantity * executionPrice;
  const issuanceFeeVND = Math.round(grossAmountVND * 0.0015); // 0.15%
  const transactionFeeVND = Math.round(grossAmountVND * 0.0005); // 0.05%
  const administrationFeeVND = Math.round(grossAmountVND * 0.0005); // 0.05%
  const totalSettlementVND = grossAmountVND + issuanceFeeVND + transactionFeeVND + administrationFeeVND;

  const handleSetQuickQuantity = (qty: number) => {
    setQuantityInput(qty.toString());
    setErrorMessage(null);
  };

  const handleSetMaxQuantity = () => {
    // Determine max by available receipts and available cash
    const unitTotalFeeRate = 1 + 0.0015 + 0.0005 + 0.0005;
    const maxAffordable = Math.floor(availableCashVND / (executionPrice * unitTotalFeeRate));
    const maxQty = Math.min(product.availableReceipts, Math.max(0, maxAffordable));
    setQuantityInput(maxQty.toString());
    setErrorMessage(null);
  };

  const handleExecute = () => {
    setErrorMessage(null);

    if (quantity <= 0) {
      setErrorMessage('Please enter a valid quantity greater than 0.');
      return;
    }

    if (!acknowledgedNonVoting) {
      setErrorMessage('You must acknowledge the non-voting economic exposure terms before submitting.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = simulateAcquisition(
        product.code,
        quantity,
        orderType,
        orderType === 'limit' ? executionPrice : undefined,
        settlementAccount
      );

      setIsSubmitting(false);

      if (!res.success && res.error) {
        setErrorMessage(res.error);
      }
    }, 400);
  };

  const isPaused =
    systemControls.allTransfersPaused || systemControls.pausedProductCodes.includes(product.code);

  return (
    <div id="transaction-simulation-root" className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Primary Issuance Execution
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              SIMULATED ALLOCATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Acquire Economic Exposure Receipts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Execute primary allocation against ring-fenced Vietnamese shares held by Lotus Custody Bank.
          </p>
        </div>

        {/* Quick redirect to redemption if user holds position */}
        <button
          onClick={() => navigateTo('redeem', product.code)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Switch to Redemption Form</span>
        </button>
      </div>

      {/* Circuit breaker warning if active */}
      {isPaused && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <h4 className="font-bold">Trading Suspended by Circuit Breaker</h4>
            <p className="text-[11px] text-rose-300">
              Acquisitions for {product.code} are temporarily frozen by compliance order. Please consult System Controls.
            </p>
          </div>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Controls (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            {/* Product Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Select Exposure Product
              </label>
              <select
                value={product.code}
                onChange={e => {
                  setSelectedProductCode(e.target.value);
                  const p = products.find(x => x.code === e.target.value);
                  if (p) setLimitPriceInput(p.referencePriceVND.toString());
                  setErrorMessage(null);
                }}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 font-sans font-semibold focus:outline-none focus:border-emerald-500"
              >
                {products.map(p => (
                  <option key={p.code} value={p.code}>
                    {p.code} — {p.name} ({p.sector}) • Ref: {formatVND(p.referencePriceVND)}
                  </option>
                ))}
              </select>
            </div>

            {/* Order Type Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Execution Order Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('market')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    orderType === 'market'
                      ? 'bg-slate-800 border-emerald-500 text-emerald-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Market Reference Order
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('limit')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    orderType === 'limit'
                      ? 'bg-slate-800 border-emerald-500 text-emerald-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Limit Price Order
                </button>
              </div>
            </div>

            {/* Limit Price Input (if limit selected) */}
            {orderType === 'limit' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Limit Price (VND per receipt)
                </label>
                <input
                  type="number"
                  value={limitPriceInput}
                  onChange={e => setLimitPriceInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* Quantity Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Receipt Quantity
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Available in Custody: <strong className="text-slate-200">{product.availableReceipts.toLocaleString()}</strong>
                </span>
              </div>

              <input
                type="number"
                value={quantityInput}
                onChange={e => {
                  setQuantityInput(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Enter quantity..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-base text-slate-100 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />

              {/* Quick quantity chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {[1000, 5000, 10000, 50000].map(qty => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => handleSetQuickQuantity(qty)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-[11px] transition-colors"
                  >
                    +{qty.toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleSetMaxQuantity}
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-mono text-[11px] font-bold"
                >
                  Max Available
                </button>
              </div>
            </div>

            {/* Settlement Account Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Settlement Cash Account
              </label>
              <select
                value={settlementAccount}
                onChange={e => setSettlementAccount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Lotus Segregated Institutional Escrow 001-INV">
                  Lotus Segregated Institutional Escrow 001-INV (Balance: {formatVND(availableCashVND)})
                </option>
                <option value="Meridian Clearing Sub-Account 8892-VNA">
                  Meridian Clearing Sub-Account 8892-VNA (Secondary Escrow)
                </option>
              </select>
            </div>

            {/* Mandatory Non-Voting Acknowledgment Checkbox */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={acknowledgedNonVoting}
                  onChange={e => setAcknowledgedNonVoting(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-slate-300 leading-relaxed">
                  <strong>Non-Voting Acknowledgment:</strong> I confirm this order acquires non-voting Economic Exposure Receipts. Underlying shares remain with Lotus Custody Bank and convey no direct corporate voting or shareholder rights.
                </span>
              </label>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-acquisition"
              type="button"
              disabled={isSubmitting || isPaused}
              onClick={handleExecute}
              className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                isPaused
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/60'
              }`}
            >
              {isSubmitting ? (
                <span>Executing Simulated Settlement...</span>
              ) : (
                <>
                  <span>Confirm Simulated Acquisition ({formatVND(totalSettlementVND)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Fee Breakdown Card (1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold border-b border-slate-800 pb-3">
              Cost & Settlement Breakdown
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Receipts Allocated:</span>
                <span className="font-mono text-slate-200 font-semibold">{quantity.toLocaleString()} units</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Reference Price:</span>
                <span className="font-mono text-slate-200">{formatVND(executionPrice)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Gross Consideration:</span>
                <span className="font-mono text-slate-200">{formatVND(grossAmountVND)}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <span>Issuance Fee (0.15%):</span>
                  </span>
                  <span className="font-mono text-slate-300">{formatVND(issuanceFeeVND)}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Clearing & Exchange (0.05%):</span>
                  <span className="font-mono text-slate-300">{formatVND(transactionFeeVND)}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Depository Admin (0.05%):</span>
                  <span className="font-mono text-slate-300">{formatVND(administrationFeeVND)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-slate-100">Total Settlement:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {formatVND(totalSettlementVND)}
                </span>
              </div>
            </div>

            {/* Escrow Balance Check */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Current Cash Balance:</span>
                <span className="font-mono text-slate-200">{formatVND(availableCashVND)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining After Settlement:</span>
                <span
                  className={`font-mono font-bold ${
                    availableCashVND - totalSettlementVND >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {formatVND(availableCashVND - totalSettlementVND)}
                </span>
              </div>
            </div>

            {/* Custody Guarantee */}
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                Receipts minted only upon verified 100% share availability in Lotus Custody Bank depository vaults.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
