export type UserRole = 'foreign_investor' | 'custodian' | 'compliance_officer' | 'regulatory_observer';

export type SectorType = 'Consumer' | 'Banking' | 'Technology' | 'Logistics' | 'Industrial' | 'Healthcare';

export type RiskLevel = 'Low–Medium' | 'Medium' | 'Medium–High' | 'High';

export type LedgerEventType = 'MINT' | 'TRANSFER' | 'DISTRIBUTION' | 'REDEMPTION' | 'BURN' | 'PAUSE' | 'RECONCILIATION' | 'CORPORATE_ACTION';

export interface PerformancePoint {
  day: number;
  date: string;
  priceVND: number;
  navVND: number;
  volume: number;
  price?: number;
  underlyingPrice?: number;
}

export interface EconomicExposureReceipt {
  id: string;
  code: string; // VNA-CONS, VNA-BANK, VNA-TECH, VNA-LOGI, VNA-INDU, VNA-HEAL
  name: string;
  underlyingSymbol: string;
  underlyingCompanyName: string;
  sector: SectorType;
  referencePriceVND: number;
  dailyChangePercent: number;
  custodyCoverageRatio: number; // e.g. 100%
  underlyingSharesHeld: number;
  receiptsIssued: number;
  maxAuthorizedUnits: number;
  availableReceipts: number;
  foreignRoomDirectPercent: number; // e.g. 0.0% (FOL capped)
  foreignRoomDirectLabel: string;
  vietAccessPoolAvailability: string;
  riskCategory: RiskLevel;
  custodianName: string;
  custodianStatus: 'Fully Audited & Segregated' | 'Verified Ring-fenced';
  complianceStatus: 'Approved for Qualified Foreign Investors' | 'Restricted - Enhanced Review';
  transferStatus: 'Active' | 'Paused' | 'Restricted';
  contractIdentifier: string; // Simulated ledger address
  lastDistributionVND: number;
  lastDistributionDate: string;
  nextDistributionDate: string;
  annualizedYieldEstPercent: number;
  performanceHistory: PerformancePoint[];
  description: string;
  volatilityRating: 'Low' | 'Moderate' | 'Elevated';
  underlyingTicker?: string;
  foreignOwnershipLimit?: number;
  dividendYieldPercent?: number;
  custodian?: string;
  isin?: string;
}

export interface LedgerTransaction {
  id: string;
  timestamp: string;
  eventType: LedgerEventType;
  productCode: string;
  quantity: number;
  referencePriceVND: number;
  totalValueVND: number;
  participantId: string; // Anonymised, e.g. INV-001, ISSUER-VNA, CUST-LOTUS
  participantRole: string;
  status: 'VERIFIED' | 'PENDING_VALIDATION' | 'FLAGGED' | 'COMPLETED';
  verifier: string; // e.g. Lotus Custody Validator Node, Horizon Assurance Node
  txHash: string;
  blockNumber: number;
  details: string;
  resultingReceiptSupply?: number;
  resultingReserveBalance?: number;
  linkedPreviousHash?: string;
  complianceApprovalId?: string;
  custodyConfirmationId?: string;
}

export interface PortfolioPosition {
  productCode: string;
  quantity: number;
  averageCostVND: number;
  currentReferencePriceVND: number;
  totalCostVND: number;
  currentValueVND: number;
  unrealizedReturnVND: number;
  unrealizedReturnPercent: number;
  realizedDistributionsVND: number;
  feesPaidVND: number;
  redemptionEligibleQuantity: number;
  backingStatus: '100% Segregated';
}

export interface CorporateAction {
  id: string;
  productCode: string;
  type: 'cash_distribution' | 'stock_split' | 'rights_issue' | 'merger' | 'suspension' | 'delisting';
  title: string;
  recordDate: string;
  effectiveDate: string;
  underlyingImpact: string;
  receiptAdjustment: string;
  amountPerReceiptVND?: number;
  investorNotificationStatus: 'Dispatched' | 'Pending Dispatch' | 'Acknowledged';
  processingStatus: 'Announced' | 'Custodian Confirmed' | 'Allocated' | 'Completed' | 'Under Review';
}

export interface DistributionRecord {
  id: string;
  productCode: string;
  productName: string;
  recordDate: string;
  paymentDate: string;
  amountPerReceiptVND: number;
  receiptQuantity: number;
  grossAmountVND: number;
  withholdingFeeVND: number;
  netDistributionVND: number;
  status: 'Upcoming' | 'Pending Custodian Confirmation' | 'Completed' | 'Announced';
  custodianConfirmed: boolean;
  complianceApproved: boolean;
  actionType?: string;
  announcementDate?: string;
}

export interface RedemptionRequest {
  id: string;
  investorId: string;
  productCode: string;
  receiptQuantity: number;
  referenceNAV_VND: number;
  grossProceedsVND: number;
  redemptionFeeVND: number;
  netProceedsVND: number;
  requestDate: string;
  settlementDate: string;
  status: 'Completed' | 'Pending Liquidity' | 'Pending Compliance' | 'Temporarily Suspended' | 'Rejected';
  reason?: string;
  burnedTxHash?: string;
}

export interface CustodyReconciliationRecord {
  id: string;
  productCode: string;
  timestamp: string;
  sharesInCustody: number;
  receiptsIssued: number;
  pendingMintEvents: number;
  pendingBurnEvents: number;
  cashDistributionBalanceVND: number;
  redemptionLiabilitiesVND: number;
  discrepancyUnits: number;
  status: 'Matched' | 'Pending Confirmation' | 'Quantity Mismatch' | 'Cash Mismatch' | 'Investigation Required';
  notes: string;
  auditorSignoff: string;
}

export interface ComplianceAlert {
  id: string;
  timestamp: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  event: string;
  investorId: string;
  productCode: string;
  triggeredRule: string;
  status: 'Open' | 'Investigating' | 'Cleared' | 'Blocked' | 'Escalated';
  assignedReviewer: string;
  notes: string[];
}

export interface InvestorReviewCase {
  investorId: string; // INV-001, INV-002, INV-003
  institutionName: string;
  investorType: 'Institutional Asset Manager' | 'Sovereign Wealth Fund' | 'Pension Fund' | 'Qualified Family Office';
  jurisdiction: string;
  beneficialOwnerStatus: 'Declared & Verified (Non-Sanctioned)' | 'Pending Periodic Review' | 'Enhanced Due Diligence';
  riskRating: 'Low' | 'Medium' | 'High';
  sanctionsResult: 'Passed (OFAC/UN/EU Clean)';
  sourceOfFundsStatus: 'Verified Tier-1 Global Depository';
  suitabilityResult: 'Approved for Non-Voting Structured Receipts';
  submittedAcknowledgements: boolean;
  previousAlertsCount: number;
  status: 'Approved' | 'Approved with Limits' | 'Pending Review' | 'Information Requested' | 'Rejected';
  limits?: {
    maxPortfolioVND: number;
    permittedProducts: string[];
    maxDailyTxCount: number;
    enhancedMonitoring: boolean;
  };
  reviewerNotes: string[];
  approvalHistory: { timestamp: string; action: string; reviewer: string }[];
}

export interface IncidentReport {
  id: string;
  title: string;
  type: 'custody_mismatch' | 'smart_contract_failure' | 'cyber_incident' | 'unauthorised_access' | 'delayed_redemption' | 'incorrect_distribution' | 'compliance_breach' | 'data_privacy_event';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedProducts: string[];
  detectedTime: string;
  financialImpactVND: number;
  affectedInvestorsCount: number;
  immediateControl: string;
  investigationStatus: 'Open' | 'Mitigated' | 'Resolved' | 'Archived';
  resolutionStatus: 'Root Cause Identified & Remediated' | 'Pending Independent Audit' | 'Under Investigation';
  timeline: { time: string; event: string }[];
}

export interface SystemControlsState {
  allTransfersPaused: boolean;
  pausedProductCodes: string[];
  newIssuanceDisabled: boolean;
  redemptionsDisabled: boolean;
  enhancedMonitoringRequired: boolean;
  maxSingleOrderSize?: number;
  dailyVolumeCapVND?: number;
  dualAuthPending?: {
    actionType: 'PAUSE_ALL' | 'RESUME_ALL' | 'PAUSE_PRODUCT' | 'DISABLE_ISSUANCE';
    targetProduct?: string;
    initiatedBy: string; // e.g. Compliance Officer Tran Minh Thu
    reason: string;
    timestamp: string;
  };
  auditHistory: {
    id: string;
    timestamp: string;
    action: string;
    requestedBy: string;
    approvedBy: string;
    reason: string;
    status: 'ACTIVE' | 'RESOLVED' | 'SUPERSEDED';
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface OnboardingFormData {
  // Step 1: Investor Profile
  investorType: string;
  institutionName: string;
  jurisdiction: string;
  accreditedStatus: string;
  // Step 2: Identity & Entity Check
  identityType: string;
  registrationNumber: string;
  authorisedRepresentative: string;
  beneficialOwnerDeclared: boolean;
  // Step 3: Jurisdiction
  eligibleJurisdictionConfirmed: boolean;
  // Step 4: KYC/AML
  kycChecksPassed: boolean;
  // Step 5: Suitability
  investmentExperience: string;
  investmentHorizon: string;
  lossTolerance: string;
  liquidityNeeds: string;
  understandingNonVoting: string;
  // Step 6: Risk Acknowledgement
  ackNotShares: boolean;
  ackNoVoting: boolean;
  ackNoGuaranteedReturns: boolean;
  ackPriceVariance: boolean;
  ackRedemptionDelay: boolean;
  ackRestrictedTransfers: boolean;
  // Status
  status: 'Not Started' | 'In Progress' | 'Approved' | 'Pending Review' | 'Information Required' | 'Rejected';
}
