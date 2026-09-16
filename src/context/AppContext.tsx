import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserRole,
  EconomicExposureReceipt,
  LedgerTransaction,
  PortfolioPosition,
  CorporateAction,
  DistributionRecord,
  RedemptionRequest,
  CustodyReconciliationRecord,
  ComplianceAlert,
  InvestorReviewCase,
  IncidentReport,
  SystemControlsState,
  NotificationItem,
  OnboardingFormData
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_PORTFOLIO,
  INITIAL_LEDGER_EVENTS,
  INITIAL_COMPLIANCE_ALERTS,
  INITIAL_DISTRIBUTIONS,
  INITIAL_REDEMPTIONS,
  INITIAL_RECONCILIATION_EVENTS,
  INITIAL_CORPORATE_ACTIONS,
  INITIAL_INCIDENT_REPORTS,
  INITIAL_INVESTOR_CASES,
  INITIAL_SYSTEM_CONTROLS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export interface TransactionReceiptData {
  transactionId: string;
  timestamp: string;
  productCode: string;
  productName: string;
  quantity: number;
  referencePriceVND: number;
  grossAmountVND: number;
  issuanceFeeVND: number;
  transactionFeeVND: number;
  administrationFeeVND: number;
  totalSettlementVND: number;
  settlementAccount: string;
  status: string;
  anonymisedInvestorId: string;
  ledgerTxHash: string;
  blockNumber: number;
  verifyingCustodian: string;
}

interface AppContextType {
  // Navigation & Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProductCode: string;
  setSelectedProductCode: (code: string) => void;
  navigateTo: (page: string, productCode?: string) => void;

  // Data Collections
  products: EconomicExposureReceipt[];
  portfolio: PortfolioPosition[];
  ledgerEvents: LedgerTransaction[];
  complianceAlerts: ComplianceAlert[];
  distributions: DistributionRecord[];
  redemptions: RedemptionRequest[];
  reconciliations: CustodyReconciliationRecord[];
  corporateActions: CorporateAction[];
  incidentReports: IncidentReport[];
  investorCases: InvestorReviewCase[];
  systemControls: SystemControlsState;
  notifications: NotificationItem[];
  availableCashVND: number;
  watchlist: string[];
  onboardingData: OnboardingFormData;

  // Modals & Popups
  receiptModalData: TransactionReceiptData | null;
  setReceiptModalData: (data: TransactionReceiptData | null) => void;
  selectedLedgerTx: LedgerTransaction | null;
  setSelectedLedgerTx: (tx: LedgerTransaction | null) => void;
  isDataSourcesModalOpen: boolean;
  setIsDataSourcesModalOpen: (open: boolean) => void;
  notification: NotificationItem | null;
  clearNotification: () => void;

  // Interactive Workflows
  simulateAcquisition: (
    productCode: string,
    quantity: number,
    orderType: 'market' | 'limit',
    limitPriceVND?: number,
    settlementAccount?: string
  ) => { success: boolean; error?: string; receipt?: TransactionReceiptData };

  simulateRedemption: (
    productCode: string,
    quantity: number
  ) => { success: boolean; error?: string; redemption?: RedemptionRequest };

  custodianMintRequest: (
    productCode: string,
    requestedQuantity: number
  ) => { success: boolean; message: string; isOverIssuance?: boolean };

  runReconciliation: () => { matched: boolean; message: string; reportId: string };

  processDistribution: (distributionId: string) => void;

  updateInvestorReview: (
    investorId: string,
    status: InvestorReviewCase['status'],
    limits?: InvestorReviewCase['limits'],
    note?: string
  ) => void;

  updateComplianceAlert: (
    alertId: string,
    status: ComplianceAlert['status'],
    note?: string
  ) => void;

  initiateSystemPause: (
    actionType: 'PAUSE_ALL' | 'RESUME_ALL' | 'PAUSE_PRODUCT' | 'DISABLE_ISSUANCE',
    reason: string,
    targetProduct?: string
  ) => void;

  approveSystemPause: () => void;
  cancelPendingPause: () => void;
  resumeSystemOperations: () => void;

  updateOnboarding: (data: Partial<OnboardingFormData>) => void;
  toggleWatchlist: (productCode: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vietaccess_demo_state_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & Role State
  const [currentRole, setCurrentRoleState] = useState<UserRole>('foreign_investor');
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [selectedProductCode, setSelectedProductCode] = useState<string>('VNA-CONS');

  // Core Data
  const [products, setProducts] = useState<EconomicExposureReceipt[]>(INITIAL_PRODUCTS);
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>(INITIAL_PORTFOLIO);
  const [ledgerEvents, setLedgerEvents] = useState<LedgerTransaction[]>(INITIAL_LEDGER_EVENTS);
  const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>(INITIAL_COMPLIANCE_ALERTS);
  const [distributions, setDistributions] = useState<DistributionRecord[]>(INITIAL_DISTRIBUTIONS);
  const [redemptions, setRedemptions] = useState<RedemptionRequest[]>(INITIAL_REDEMPTIONS);
  const [reconciliations, setReconciliations] = useState<CustodyReconciliationRecord[]>(INITIAL_RECONCILIATION_EVENTS);
  const [corporateActions, setCorporateActions] = useState<CorporateAction[]>(INITIAL_CORPORATE_ACTIONS);
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>(INITIAL_INCIDENT_REPORTS);
  const [investorCases, setInvestorCases] = useState<InvestorReviewCase[]>(INITIAL_INVESTOR_CASES);
  const [systemControls, setSystemControls] = useState<SystemControlsState>(INITIAL_SYSTEM_CONTROLS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [availableCashVND, setAvailableCashVND] = useState<number>(18500000000); // 18.5 Billion VND
  const [watchlist, setWatchlist] = useState<string[]>(['VNA-CONS', 'VNA-TECH']);

  // Onboarding Form Data
  const [onboardingData, setOnboardingData] = useState<OnboardingFormData>({
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

  // Modal states
  const [receiptModalData, setReceiptModalData] = useState<TransactionReceiptData | null>(null);
  const [selectedLedgerTx, setSelectedLedgerTx] = useState<LedgerTransaction | null>(null);
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<NotificationItem | null>(null);
  const clearNotification = () => setActiveNotification(null);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
          // Merge with INITIAL_PRODUCTS to guarantee all fields exist even if cached state was from earlier build
          const mergedProducts = INITIAL_PRODUCTS.map(initialProd => {
            const savedProd = parsed.products.find((p: EconomicExposureReceipt) => p.code === initialProd.code);
            return savedProd ? { ...initialProd, ...savedProd } : initialProd;
          });
          setProducts(mergedProducts);
        }
        if (parsed.portfolio && Array.isArray(parsed.portfolio)) setPortfolio(parsed.portfolio);
        if (parsed.ledgerEvents && Array.isArray(parsed.ledgerEvents)) setLedgerEvents(parsed.ledgerEvents);
        if (parsed.complianceAlerts && Array.isArray(parsed.complianceAlerts)) setComplianceAlerts(parsed.complianceAlerts);
        if (parsed.distributions && Array.isArray(parsed.distributions)) setDistributions(parsed.distributions);
        if (parsed.redemptions && Array.isArray(parsed.redemptions)) setRedemptions(parsed.redemptions);
        if (parsed.corporateActions && Array.isArray(parsed.corporateActions)) setCorporateActions(parsed.corporateActions);
        if (parsed.investorCases && Array.isArray(parsed.investorCases)) setInvestorCases(parsed.investorCases);
        if (parsed.systemControls) setSystemControls(parsed.systemControls);
        if (parsed.notifications && Array.isArray(parsed.notifications)) setNotifications(parsed.notifications);
        if (typeof parsed.availableCashVND === 'number') setAvailableCashVND(parsed.availableCashVND);
        if (parsed.watchlist && Array.isArray(parsed.watchlist)) setWatchlist(parsed.watchlist);
        if (parsed.currentRole) setCurrentRoleState(parsed.currentRole);
        if (parsed.onboardingData) setOnboardingData(parsed.onboardingData);
      }
    } catch (e) {
      console.warn('Failed to load local storage state:', e);
    }
  }, []);

  // Save to local storage on state change
  useEffect(() => {
    try {
      const stateToSave = {
        products,
        portfolio,
        ledgerEvents,
        complianceAlerts,
        distributions,
        redemptions,
        corporateActions,
        investorCases,
        systemControls,
        notifications,
        availableCashVND,
        watchlist,
        currentRole,
        onboardingData
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save to local storage:', e);
    }
  }, [
    products,
    portfolio,
    ledgerEvents,
    complianceAlerts,
    distributions,
    redemptions,
    corporateActions,
    investorCases,
    systemControls,
    notifications,
    availableCashVND,
    watchlist,
    currentRole,
    onboardingData
  ]);

  // Role switching handler: dynamically adapts page default
  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    // Switch to role's primary landing view
    if (role === 'foreign_investor') {
      setCurrentPage('dashboard');
    } else if (role === 'custodian') {
      setCurrentPage('custody_overview');
    } else if (role === 'compliance_officer') {
      setCurrentPage('compliance_overview');
    } else if (role === 'regulatory_observer') {
      setCurrentPage('market_overview');
    }
  };

  const navigateTo = (page: string, productCode?: string) => {
    if (productCode) {
      setSelectedProductCode(productCode);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => {
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 1. Simulate Acquisition Workflow
  const simulateAcquisition = (
    productCode: string,
    quantity: number,
    orderType: 'market' | 'limit',
    limitPriceVND?: number,
    settlementAccount = 'Lotus Segregated Institutional Escrow 001-INV'
  ) => {
    const product = products.find(p => p.code === productCode);
    if (!product) return { success: false, error: 'Product not found.' };

    if (systemControls.allTransfersPaused || systemControls.pausedProductCodes.includes(productCode)) {
      return { success: false, error: 'Acquisitions for this product are currently paused by compliance circuit breaker.' };
    }

    if (systemControls.newIssuanceDisabled) {
      return { success: false, error: 'New issuance is currently disabled by system controls.' };
    }

    if (quantity <= 0) {
      return { success: false, error: 'Please enter a valid quantity greater than 0.' };
    }

    if (quantity > product.availableReceipts) {
      return {
        success: false,
        error: `Insufficient receipt availability. Maximum available in segregated custody pool: ${product.availableReceipts.toLocaleString()} receipts.`
      };
    }

    const price = orderType === 'limit' && limitPriceVND ? limitPriceVND : product.referencePriceVND;
    const grossAmount = quantity * price;

    // Fee breakdown: issuance fee 0.15%, transaction fee 0.05%, administration fee 0.05%
    const issuanceFee = Math.round(grossAmount * 0.0015);
    const transactionFee = Math.round(grossAmount * 0.0005);
    const adminFee = Math.round(grossAmount * 0.0005);
    const totalCost = grossAmount + issuanceFee + transactionFee + adminFee;

    if (totalCost > availableCashVND) {
      return {
        success: false,
        error: `Insufficient cash balance. Required: ${totalCost.toLocaleString()} VND, Available: ${availableCashVND.toLocaleString()} VND.`
      };
    }

    // Deduct cash
    setAvailableCashVND(prev => prev - totalCost);

    // Update Product supply
    setProducts(prev =>
      prev.map(p => {
        if (p.code === productCode) {
          const newIssued = p.receiptsIssued + quantity;
          const newAvailable = Math.max(0, p.underlyingSharesHeld - newIssued);
          return {
            ...p,
            receiptsIssued: newIssued,
            availableReceipts: newAvailable
          };
        }
        return p;
      })
    );

    // Update Portfolio
    setPortfolio(prev => {
      const existing = prev.find(pos => pos.productCode === productCode);
      if (existing) {
        const newQty = existing.quantity + quantity;
        const newTotalCost = existing.totalCostVND + totalCost;
        const newAvg = Math.round(newTotalCost / newQty);
        const currentValue = newQty * product.referencePriceVND;
        const unrealized = currentValue - newTotalCost;
        const unrealizedPct = (unrealized / newTotalCost) * 100;
        return prev.map(pos =>
          pos.productCode === productCode
            ? {
                ...pos,
                quantity: newQty,
                totalCostVND: newTotalCost,
                averageCostVND: newAvg,
                currentValueVND: currentValue,
                unrealizedReturnVND: unrealized,
                unrealizedReturnPercent: Number(unrealizedPct.toFixed(2)),
                redemptionEligibleQuantity: newQty,
                feesPaidVND: pos.feesPaidVND + issuanceFee + transactionFee + adminFee
              }
            : pos
        );
      } else {
        const currentValue = quantity * product.referencePriceVND;
        const unrealized = currentValue - totalCost;
        const unrealizedPct = (unrealized / totalCost) * 100;
        const newPos: PortfolioPosition = {
          productCode,
          quantity,
          averageCostVND: Math.round(totalCost / quantity),
          currentReferencePriceVND: product.referencePriceVND,
          totalCostVND: totalCost,
          currentValueVND: currentValue,
          unrealizedReturnVND: unrealized,
          unrealizedReturnPercent: Number(unrealizedPct.toFixed(2)),
          realizedDistributionsVND: 0,
          feesPaidVND: issuanceFee + transactionFee + adminFee,
          redemptionEligibleQuantity: quantity,
          backingStatus: '100% Segregated'
        };
        return [...prev, newPos];
      }
    });

    // Create Ledger Transaction
    const txId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newTx: LedgerTransaction = {
      id: txId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType: 'MINT',
      productCode,
      quantity,
      referencePriceVND: price,
      totalValueVND: grossAmount,
      participantId: 'INV-001',
      participantRole: 'Qualified Foreign Investor',
      status: 'VERIFIED',
      verifier: 'Lotus Custody Validator Node',
      txHash,
      blockNumber: 489202 + ledgerEvents.length,
      details: `Simulated primary issuance acquisition of ${quantity.toLocaleString()} ${productCode} receipts backed by Lotus Custody.`,
      resultingReceiptSupply: product.receiptsIssued + quantity,
      resultingReserveBalance: product.underlyingSharesHeld,
      complianceApprovalId: 'COMP-AUTO-VALIDATED'
    };

    setLedgerEvents(prev => [newTx, ...prev]);

    // Create receipt modal data
    const receiptData: TransactionReceiptData = {
      transactionId: txId,
      timestamp: newTx.timestamp,
      productCode,
      productName: product.name,
      quantity,
      referencePriceVND: price,
      grossAmountVND: grossAmount,
      issuanceFeeVND: issuanceFee,
      transactionFeeVND: transactionFee,
      administrationFeeVND: adminFee,
      totalSettlementVND: totalCost,
      settlementAccount,
      status: 'COMPLETED & VERIFIED',
      anonymisedInvestorId: 'INV-001',
      ledgerTxHash: txHash,
      blockNumber: newTx.blockNumber,
      verifyingCustodian: 'Lotus Custody Bank (Segregated Depository)'
    };

    setReceiptModalData(receiptData);

    addNotification(
      'Acquisition completed',
      `Acquired ${quantity.toLocaleString()} ${productCode} receipts for ${totalCost.toLocaleString()} VND.`,
      'success'
    );

    return { success: true, receipt: receiptData };
  };

  // 2. Simulate Redemption Workflow
  const simulateRedemption = (productCode: string, quantity: number) => {
    const product = products.find(p => p.code === productCode);
    const position = portfolio.find(p => p.productCode === productCode);

    if (!product || !position) {
      return { success: false, error: 'Product not held in active portfolio.' };
    }

    if (systemControls.redemptionsDisabled) {
      return { success: false, error: 'Redemptions are temporarily suspended by system-wide risk control.' };
    }

    if (quantity <= 0) {
      return { success: false, error: 'Redemption quantity must be greater than 0.' };
    }

    if (quantity > position.redemptionEligibleQuantity) {
      return {
        success: false,
        error: `Requested quantity (${quantity.toLocaleString()}) exceeds eligible balance (${position.redemptionEligibleQuantity.toLocaleString()}).`
      };
    }

    const refNAV = product.referencePriceVND;
    const grossProceeds = quantity * refNAV;
    const redemptionFee = Math.round(grossProceeds * 0.002); // 0.20% fee
    const netProceeds = grossProceeds - redemptionFee;

    const redId = 'RED-' + Math.floor(1000 + Math.random() * 9000);
    const burnHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newRedemption: RedemptionRequest = {
      id: redId,
      investorId: 'INV-001',
      productCode,
      receiptQuantity: quantity,
      referenceNAV_VND: refNAV,
      grossProceedsVND: grossProceeds,
      redemptionFeeVND: redemptionFee,
      netProceedsVND: netProceeds,
      requestDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
      settlementDate: 'T+1 Scheduled Settlement',
      status: 'Completed',
      burnedTxHash: burnHash
    };

    setRedemptions(prev => [newRedemption, ...prev]);

    // Credit cash
    setAvailableCashVND(prev => prev + netProceeds);

    // Update portfolio
    setPortfolio(prev =>
      prev
        .map(pos => {
          if (pos.productCode === productCode) {
            const remaining = pos.quantity - quantity;
            if (remaining <= 0) return null;
            const newTotalCost = pos.averageCostVND * remaining;
            const curVal = remaining * product.referencePriceVND;
            const unrep = curVal - newTotalCost;
            return {
              ...pos,
              quantity: remaining,
              redemptionEligibleQuantity: remaining,
              totalCostVND: newTotalCost,
              currentValueVND: curVal,
              unrealizedReturnVND: unrep,
              unrealizedReturnPercent: Number(((unrep / newTotalCost) * 100).toFixed(2))
            };
          }
          return pos;
        })
        .filter(Boolean) as PortfolioPosition[]
    );

    // Update product supply & burn
    setProducts(prev =>
      prev.map(p => {
        if (p.code === productCode) {
          const newIssued = Math.max(0, p.receiptsIssued - quantity);
          return {
            ...p,
            receiptsIssued: newIssued,
            availableReceipts: p.underlyingSharesHeld - newIssued
          };
        }
        return p;
      })
    );

    // Log BURN transaction on ledger
    const burnTx: LedgerTransaction = {
      id: 'TX-BURN-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType: 'BURN',
      productCode,
      quantity,
      referencePriceVND: refNAV,
      totalValueVND: grossProceeds,
      participantId: 'ISSUER-VNA',
      participantRole: 'Licensed Issuer',
      status: 'VERIFIED',
      verifier: 'Lotus Custody Validator Node',
      txHash: burnHash,
      blockNumber: 489205 + ledgerEvents.length,
      details: `Permanent redemption cancellation & burn of ${quantity.toLocaleString()} ${productCode} receipts following net fiat settlement.`,
      resultingReceiptSupply: product.receiptsIssued - quantity,
      resultingReserveBalance: product.underlyingSharesHeld
    };

    setLedgerEvents(prev => [burnTx, ...prev]);

    addNotification(
      'Redemption processed',
      `Redeemed ${quantity.toLocaleString()} ${productCode} receipts for net proceeds of ${netProceeds.toLocaleString()} VND.`,
      'info'
    );

    return { success: true, redemption: newRedemption };
  };

  // 3. Custodian Mint Request (with strict over-issuance rejection invariant)
  const custodianMintRequest = (productCode: string, requestedQuantity: number) => {
    const product = products.find(p => p.code === productCode);
    if (!product) return { success: false, message: 'Product not found' };

    const proposedReceipts = product.receiptsIssued + requestedQuantity;
    if (proposedReceipts > product.underlyingSharesHeld) {
      const overage = proposedReceipts - product.underlyingSharesHeld;
      // Log high-priority compliance alert
      const alert: ComplianceAlert = {
        id: 'ALT-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        severity: 'Critical',
        event: 'Over-Issuance Rejection: Mint Exceeds Verified Custody Shares',
        investorId: 'ISSUER-VNA',
        productCode,
        triggeredRule: `Rule CUST-INV-1: Requested issuance (${proposedReceipts.toLocaleString()}) exceeds underlying shares in custody (${product.underlyingSharesHeld.toLocaleString()}) by ${overage.toLocaleString()} units.`,
        status: 'Open',
        assignedReviewer: 'Tran Minh Thu',
        notes: [
          `Attempted mint of ${requestedQuantity.toLocaleString()} units blocked by Lotus Custody reserve enforcement engine.`
        ]
      };
      setComplianceAlerts(prev => [alert, ...prev]);

      addNotification(
        'Mint rejected: Over-issuance blocked',
        `Issuance rejected — requested receipts exceed verified custody balance by ${overage.toLocaleString()} units.`,
        'alert'
      );

      return {
        success: false,
        isOverIssuance: true,
        message: 'Issuance rejected — requested receipts exceed verified custody balance'
      };
    }

    // Capacity confirmed
    setProducts(prev =>
      prev.map(p => {
        if (p.code === productCode) {
          return {
            ...p,
            receiptsIssued: proposedReceipts,
            availableReceipts: p.underlyingSharesHeld - proposedReceipts
          };
        }
        return p;
      })
    );

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const tx: LedgerTransaction = {
      id: 'TX-CUST-MINT-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType: 'MINT',
      productCode,
      quantity: requestedQuantity,
      referencePriceVND: product.referencePriceVND,
      totalValueVND: requestedQuantity * product.referencePriceVND,
      participantId: 'CUST-LOTUS',
      participantRole: 'Depository Custodian',
      status: 'VERIFIED',
      verifier: 'Lotus Custody Validator Node',
      txHash,
      blockNumber: 489210 + ledgerEvents.length,
      details: `Custodian approved mint capacity for ${requestedQuantity.toLocaleString()} ${productCode} receipts against ring-fenced shares.`,
      resultingReceiptSupply: proposedReceipts,
      resultingReserveBalance: product.underlyingSharesHeld
    };

    setLedgerEvents(prev => [tx, ...prev]);

    addNotification(
      'Mint capacity confirmed',
      `Successfully minted ${requestedQuantity.toLocaleString()} ${productCode} receipts under verified custody.`,
      'success'
    );

    return {
      success: true,
      message: 'Mint capacity confirmed'
    };
  };

  // 4. Run Reconciliation
  const runReconciliation = () => {
    // Audit all products
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const updatedReconciliations: CustodyReconciliationRecord[] = products.map((p, idx) => ({
      id: `REC-RUN-${Date.now()}-${idx}`,
      productCode: p.code,
      timestamp,
      sharesInCustody: p.underlyingSharesHeld,
      receiptsIssued: p.receiptsIssued,
      pendingMintEvents: 0,
      pendingBurnEvents: 0,
      cashDistributionBalanceVND: p.lastDistributionVND * p.receiptsIssued,
      redemptionLiabilitiesVND: 0,
      discrepancyUnits: 0,
      status: 'Matched',
      notes: 'All custody and ledger balances matched. 100% segregated reserve confirmed by Lotus Custody & Horizon Assurance.',
      auditorSignoff: 'Horizon Assurance Lead Audit Partner'
    }));

    setReconciliations(prev => [...updatedReconciliations, ...prev]);

    // Log RECONCILIATION on ledger
    const tx: LedgerTransaction = {
      id: 'TX-REC-' + Math.floor(1000 + Math.random() * 9000),
      timestamp,
      eventType: 'RECONCILIATION',
      productCode: 'ALL-6-PRODUCTS',
      quantity: products.reduce((acc, p) => acc + p.receiptsIssued, 0),
      referencePriceVND: 0,
      totalValueVND: products.reduce((acc, p) => acc + p.receiptsIssued * p.referencePriceVND, 0),
      participantId: 'CUST-LOTUS',
      participantRole: 'Depository Custodian',
      status: 'COMPLETED',
      verifier: 'National Market Observer Node',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      blockNumber: 489220 + ledgerEvents.length,
      details: 'All custody and ledger balances matched. Physical depository shares vs circulating receipts in exact 100% parity.'
    };

    setLedgerEvents(prev => [tx, ...prev]);

    addNotification(
      'Custody reconciliation complete',
      'All custody and ledger balances matched with zero discrepancy.',
      'success'
    );

    return {
      matched: true,
      message: 'All custody and ledger balances matched',
      reportId: 'REP-REC-' + Date.now()
    };
  };

  // 5. Process Corporate Distribution
  const processDistribution = (distributionId: string) => {
    const dist = distributions.find(d => d.id === distributionId);
    if (!dist) return;

    setDistributions(prev =>
      prev.map(d => (d.id === distributionId ? { ...d, status: 'Completed', custodianConfirmed: true, complianceApproved: true } : d))
    );

    // If investor holds position, credit cash
    const pos = portfolio.find(p => p.productCode === dist.productCode);
    if (pos) {
      const grossIncome = pos.quantity * dist.amountPerReceiptVND;
      const netIncome = Math.round(grossIncome * 0.95); // 5% withholding
      setAvailableCashVND(prev => prev + netIncome);
      setPortfolio(prev =>
        prev.map(p =>
          p.productCode === dist.productCode
            ? { ...p, realizedDistributionsVND: p.realizedDistributionsVND + netIncome }
            : p
        )
      );
      addNotification(
        'Distribution completed',
        `Received ${netIncome.toLocaleString()} VND cash distribution for ${dist.productCode}.`,
        'success'
      );
    }
  };

  // 6. Investor Review Decisions
  const updateInvestorReview = (
    investorId: string,
    status: InvestorReviewCase['status'],
    limits?: InvestorReviewCase['limits'],
    note?: string
  ) => {
    setInvestorCases(prev =>
      prev.map(c => {
        if (c.investorId === investorId) {
          const notes = note ? [...c.reviewerNotes, note] : c.reviewerNotes;
          return {
            ...c,
            status,
            limits: limits || c.limits,
            reviewerNotes: notes,
            approvalHistory: [
              ...c.approvalHistory,
              {
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                action: `Status changed to ${status}`,
                reviewer: 'Tran Minh Thu (Chief Compliance Officer)'
              }
            ]
          };
        }
        return c;
      })
    );
    addNotification('Investor review updated', `Case file for ${investorId} updated to ${status}.`, 'info');
  };

  // 7. Compliance Alert Actions
  const updateComplianceAlert = (alertId: string, status: ComplianceAlert['status'], note?: string) => {
    setComplianceAlerts(prev =>
      prev.map(a => {
        if (a.id === alertId) {
          const notes = note ? [...a.notes, note] : a.notes;
          return { ...a, status, notes };
        }
        return a;
      })
    );
    addNotification('Alert updated', `Alert ${alertId} status marked as ${status}.`, 'info');
  };

  // 8. Dual Authorisation System Controls
  const initiateSystemPause = (
    actionType: 'PAUSE_ALL' | 'RESUME_ALL' | 'PAUSE_PRODUCT' | 'DISABLE_ISSUANCE',
    reason: string,
    targetProduct?: string
  ) => {
    setSystemControls(prev => ({
      ...prev,
      dualAuthPending: {
        actionType,
        targetProduct,
        initiatedBy: 'Tran Minh Thu (Chief Compliance Officer)',
        reason,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
      }
    }));
    addNotification(
      'Dual-authorisation requested',
      `Compliance Officer initiated ${actionType}. Requires Custodian Representative counter-approval.`,
      'warning'
    );
  };

  const approveSystemPause = () => {
    if (!systemControls.dualAuthPending) return;
    const { actionType, targetProduct, initiatedBy, reason } = systemControls.dualAuthPending;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    let newTransfersPaused = systemControls.allTransfersPaused;
    let newPausedProducts = [...systemControls.pausedProductCodes];
    let newIssuanceDisabled = systemControls.newIssuanceDisabled;

    if (actionType === 'PAUSE_ALL') {
      newTransfersPaused = true;
    } else if (actionType === 'RESUME_ALL') {
      newTransfersPaused = false;
      newPausedProducts = [];
      newIssuanceDisabled = false;
    } else if (actionType === 'PAUSE_PRODUCT' && targetProduct) {
      if (!newPausedProducts.includes(targetProduct)) {
        newPausedProducts.push(targetProduct);
      }
    } else if (actionType === 'DISABLE_ISSUANCE') {
      newIssuanceDisabled = true;
    }

    const auditEntry = {
      id: 'AUD-' + Date.now(),
      timestamp,
      action: `${actionType} ${targetProduct || ''}`.trim(),
      requestedBy: initiatedBy,
      approvedBy: 'Le Hoang Nam (Lotus Custody Rep)',
      reason,
      status: 'ACTIVE' as const
    };

    setSystemControls({
      allTransfersPaused: newTransfersPaused,
      pausedProductCodes: newPausedProducts,
      newIssuanceDisabled,
      redemptionsDisabled: systemControls.redemptionsDisabled,
      enhancedMonitoringRequired: systemControls.enhancedMonitoringRequired,
      dualAuthPending: undefined,
      auditHistory: [auditEntry, ...systemControls.auditHistory]
    });

    // Record PAUSE event on ledger
    const tx: LedgerTransaction = {
      id: 'TX-SYS-' + Math.floor(1000 + Math.random() * 9000),
      timestamp,
      eventType: 'PAUSE',
      productCode: targetProduct || 'SYSTEM-WIDE',
      quantity: 0,
      referencePriceVND: 0,
      totalValueVND: 0,
      participantId: 'DUAL-AUTH-COMP-CUST',
      participantRole: 'Compliance & Custodian Joint Multi-Sig',
      status: 'COMPLETED',
      verifier: 'National Market Observer Node',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      blockNumber: 489230 + ledgerEvents.length,
      details: `Dual-authorization executed: ${actionType} ratified by Chief Compliance Officer & Lotus Custody.`
    };
    setLedgerEvents(prev => [tx, ...prev]);

    addNotification(
      'System controls executed',
      `Dual-authorisation confirmed for ${actionType}. Operations adjusted.`,
      'alert'
    );
  };

  const cancelPendingPause = () => {
    setSystemControls(prev => ({ ...prev, dualAuthPending: undefined }));
    addNotification('Dual-authorisation cancelled', 'Pending action was declined or withdrawn.', 'info');
  };

  const resumeSystemOperations = () => {
    initiateSystemPause('RESUME_ALL', 'Compliance & Custody review completed; normal trading resumed.');
  };

  // 9. Onboarding update
  const updateOnboarding = (data: Partial<OnboardingFormData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  // 10. Watchlist toggle
  const toggleWatchlist = (productCode: string) => {
    setWatchlist(prev =>
      prev.includes(productCode) ? prev.filter(c => c !== productCode) : [...prev, productCode]
    );
  };

  // 11. Notification Management
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // 12. Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProducts(INITIAL_PRODUCTS);
    setPortfolio(INITIAL_PORTFOLIO);
    setLedgerEvents(INITIAL_LEDGER_EVENTS);
    setComplianceAlerts(INITIAL_COMPLIANCE_ALERTS);
    setDistributions(INITIAL_DISTRIBUTIONS);
    setRedemptions(INITIAL_REDEMPTIONS);
    setReconciliations(INITIAL_RECONCILIATION_EVENTS);
    setCorporateActions(INITIAL_CORPORATE_ACTIONS);
    setIncidentReports(INITIAL_INCIDENT_REPORTS);
    setInvestorCases(INITIAL_INVESTOR_CASES);
    setSystemControls(INITIAL_SYSTEM_CONTROLS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAvailableCashVND(18500000000);
    setWatchlist(['VNA-CONS', 'VNA-TECH']);
    setCurrentRoleState('foreign_investor');
    setCurrentPage('dashboard');
    addNotification('Demo data reset', 'All balances, records, and controls reset to factory demo state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentPage,
        setCurrentPage,
        selectedProductCode,
        setSelectedProductCode,
        navigateTo,

        products,
        portfolio,
        ledgerEvents,
        complianceAlerts,
        distributions,
        redemptions,
        reconciliations,
        corporateActions,
        incidentReports,
        investorCases,
        systemControls,
        notifications,
        availableCashVND,
        watchlist,
        onboardingData,

        receiptModalData,
        setReceiptModalData,
        selectedLedgerTx,
        setSelectedLedgerTx,
        isDataSourcesModalOpen,
        setIsDataSourcesModalOpen,
        notification: activeNotification,
        clearNotification,

        simulateAcquisition,
        simulateRedemption,
        custodianMintRequest,
        runReconciliation,
        processDistribution,
        updateInvestorReview,
        updateComplianceAlert,
        initiateSystemPause,
        approveSystemPause,
        cancelPendingPause,
        resumeSystemOperations,

        updateOnboarding,
        toggleWatchlist,
        markNotificationRead,
        clearAllNotifications,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
