import {
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
  NotificationItem
} from '../types';

// Utility currency formatter for Vietnamese Dong
export const formatVND = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// 6 Required Fictional Exposure Products
export const INITIAL_PRODUCTS: EconomicExposureReceipt[] = [
  {
    id: 'prod-1',
    code: 'VNA-CONS',
    name: 'VNA Consumer Exposure',
    underlyingSymbol: 'VNM-PROXY',
    underlyingTicker: 'VNM',
    underlyingCompanyName: 'Vietnam Consumer Goods Holdings (Simulated)',
    sector: 'Consumer',
    referencePriceVND: 84500,
    dailyChangePercent: +1.45,
    custodyCoverageRatio: 100.0,
    underlyingSharesHeld: 3200000,
    receiptsIssued: 2750000,
    maxAuthorizedUnits: 3200000,
    availableReceipts: 450000,
    foreignRoomDirectPercent: 0.0,
    foreignOwnershipLimit: 100,
    dividendYieldPercent: 3.85,
    custodian: 'Lotus Custody Bank',
    isin: 'VN000000VNM3',
    foreignRoomDirectLabel: '0.00% (Direct foreign limit 49% fully exhausted)',
    vietAccessPoolAvailability: '450,000 Receipts Available in Segregated Custody Pool',
    riskCategory: 'Medium',
    custodianName: 'Lotus Custody Bank',
    custodianStatus: 'Fully Audited & Segregated',
    complianceStatus: 'Approved for Qualified Foreign Investors',
    transferStatus: 'Active',
    contractIdentifier: '0x8f22C39B78B781a742841961A392688009Eb4A21',
    lastDistributionVND: 2500,
    lastDistributionDate: '2026-05-15',
    nextDistributionDate: '2026-11-20',
    annualizedYieldEstPercent: 3.85,
    volatilityRating: 'Moderate',
    description: 'Provides contractual economic exposure to top-tier Vietnamese FMCG, dairy, and beverage retail operations with full foreign ownership limit saturation.',
    performanceHistory: [
      { day: 1, date: 'Aug 18', priceVND: 81200, navVND: 81150, volume: 42000 },
      { day: 5, date: 'Aug 23', priceVND: 82000, navVND: 81950, volume: 55000 },
      { day: 10, date: 'Aug 28', priceVND: 82800, navVND: 82750, volume: 61000 },
      { day: 15, date: 'Sep 02', priceVND: 83400, navVND: 83350, volume: 48000 },
      { day: 20, date: 'Sep 07', priceVND: 83900, navVND: 83850, volume: 72000 },
      { day: 25, date: 'Sep 12', priceVND: 84100, navVND: 84050, volume: 64000 },
      { day: 30, date: 'Sep 16', priceVND: 84500, navVND: 84480, volume: 58000 }
    ]
  },
  {
    id: 'prod-2',
    code: 'VNA-BANK',
    name: 'VNA Banking Exposure',
    underlyingSymbol: 'VCB-PROXY',
    underlyingTicker: 'VCB',
    underlyingCompanyName: 'Vietnam Joint Commercial Banking Corp (Simulated)',
    sector: 'Banking',
    referencePriceVND: 36200,
    dailyChangePercent: -0.65,
    custodyCoverageRatio: 100.0,
    underlyingSharesHeld: 6500000,
    receiptsIssued: 5900000,
    maxAuthorizedUnits: 6500000,
    availableReceipts: 600000,
    foreignRoomDirectPercent: 0.0,
    foreignOwnershipLimit: 100,
    dividendYieldPercent: 4.40,
    custodian: 'Lotus Custody Bank',
    isin: 'VN000000VCB5',
    foreignRoomDirectLabel: '0.00% (Statutory 30% banking foreign limit fully locked)',
    vietAccessPoolAvailability: '600,000 Receipts Available in Segregated Custody Pool',
    riskCategory: 'High',
    custodianName: 'Lotus Custody Bank',
    custodianStatus: 'Fully Audited & Segregated',
    complianceStatus: 'Approved for Qualified Foreign Investors',
    transferStatus: 'Active',
    contractIdentifier: '0x4e61A99017294B1B3C08991D3d9051877a5D60E3',
    lastDistributionVND: 1200,
    lastDistributionDate: '2026-06-20',
    nextDistributionDate: '2026-12-15',
    annualizedYieldEstPercent: 4.40,
    volatilityRating: 'Elevated',
    description: 'Contractual economic participation linked to leading tier-1 Vietnamese commercial banking equity subject to strict 30% statutory foreign ownership caps.',
    performanceHistory: [
      { day: 1, date: 'Aug 18', priceVND: 37400, navVND: 37380, volume: 110000 },
      { day: 5, date: 'Aug 23', priceVND: 37000, navVND: 37020, volume: 95000 },
      { day: 10, date: 'Aug 28', priceVND: 36600, navVND: 36580, volume: 88000 },
      { day: 15, date: 'Sep 02', priceVND: 36900, navVND: 36890, volume: 125000 },
      { day: 20, date: 'Sep 07', priceVND: 36700, navVND: 36720, volume: 102000 },
      { day: 25, date: 'Sep 12', priceVND: 36450, navVND: 36440, volume: 91000 },
      { day: 30, date: 'Sep 16', priceVND: 36200, navVND: 36190, volume: 84000 }
    ]
  },
  {
    id: 'prod-3',
    code: 'VNA-TECH',
    name: 'VNA Technology Exposure',
    underlyingSymbol: 'FPT-PROXY',
    underlyingTicker: 'FPT',
    underlyingCompanyName: 'Vietnam Enterprise Digital & AI Solutions (Simulated)',
    sector: 'Technology',
    referencePriceVND: 112000,
    dailyChangePercent: +2.65,
    custodyCoverageRatio: 100.0,
    underlyingSharesHeld: 2200000,
    receiptsIssued: 1950000,
    maxAuthorizedUnits: 2200000,
    availableReceipts: 250000,
    foreignRoomDirectPercent: 0.15,
    foreignOwnershipLimit: 99.85,
    dividendYieldPercent: 3.10,
    custodian: 'Lotus Custody Bank',
    isin: 'VN000000FPT4',
    foreignRoomDirectLabel: '0.15% (Foreign ownership room essentially exhausted)',
    vietAccessPoolAvailability: '250,000 Receipts Available in Segregated Custody Pool',
    riskCategory: 'Medium',
    custodianName: 'Lotus Custody Bank',
    custodianStatus: 'Fully Audited & Segregated',
    complianceStatus: 'Approved for Qualified Foreign Investors',
    transferStatus: 'Active',
    contractIdentifier: '0x1C229F290bbC1B2dE9F24165518b0A13De517721',
    lastDistributionVND: 3200,
    lastDistributionDate: '2026-04-10',
    nextDistributionDate: '2026-10-25',
    annualizedYieldEstPercent: 3.10,
    volatilityRating: 'Moderate',
    description: 'Contractual economic participation replicating equity returns of Vietnam digital transformation, enterprise cloud, and software engineering services.',
    performanceHistory: [
      { day: 1, date: 'Aug 18', priceVND: 104000, navVND: 103900, volume: 64000 },
      { day: 5, date: 'Aug 23', priceVND: 106500, navVND: 106400, volume: 72000 },
      { day: 10, date: 'Aug 28', priceVND: 108000, navVND: 107950, volume: 68000 },
      { day: 15, date: 'Sep 02', priceVND: 109200, navVND: 109150, volume: 89000 },
      { day: 20, date: 'Sep 07', priceVND: 110500, navVND: 110400, volume: 95000 },
      { day: 25, date: 'Sep 12', priceVND: 111200, navVND: 111100, volume: 82000 },
      { day: 30, date: 'Sep 16', priceVND: 112000, navVND: 111950, volume: 105000 }
    ]
  },
  {
    id: 'prod-4',
    code: 'VNA-LOGI',
    name: 'VNA Logistics Exposure',
    underlyingSymbol: 'GMD-PROXY',
    underlyingTicker: 'GMD',
    underlyingCompanyName: 'Vietnam Deepwater Maritime & Port Terminal (Simulated)',
    sector: 'Logistics',
    referencePriceVND: 42800,
    dailyChangePercent: +0.70,
    custodyCoverageRatio: 100.0,
    underlyingSharesHeld: 3500000,
    receiptsIssued: 3100000,
    maxAuthorizedUnits: 3500000,
    availableReceipts: 400000,
    foreignRoomDirectPercent: 0.0,
    foreignOwnershipLimit: 100,
    dividendYieldPercent: 4.25,
    custodian: 'Lotus Custody Bank',
    isin: 'VN000000GMD8',
    foreignRoomDirectLabel: '0.00% (Critical infrastructure port limit locked at 49%)',
    vietAccessPoolAvailability: '400,000 Receipts Available in Segregated Custody Pool',
    riskCategory: 'Medium',
    custodianName: 'Lotus Custody Bank',
    custodianStatus: 'Fully Audited & Segregated',
    complianceStatus: 'Approved for Qualified Foreign Investors',
    transferStatus: 'Active',
    contractIdentifier: '0x99A3142277dCF237B1e02888d92A729E851720d2',
    lastDistributionVND: 1800,
    lastDistributionDate: '2026-07-05',
    nextDistributionDate: '2027-01-18',
    annualizedYieldEstPercent: 4.25,
    volatilityRating: 'Moderate',
    description: 'Contractual economic participation linked to Cai Mep and Haiphong container port operators and export logistics freight networks.',
    performanceHistory: [
      { day: 1, date: 'Aug 18', priceVND: 41500, navVND: 41480, volume: 38000 },
      { day: 5, date: 'Aug 23', priceVND: 41800, navVND: 41790, volume: 44000 },
      { day: 10, date: 'Aug 28', priceVND: 42100, navVND: 42080, volume: 51000 },
      { day: 15, date: 'Sep 02', priceVND: 42300, navVND: 42280, volume: 46000 },
      { day: 20, date: 'Sep 07', priceVND: 42600, navVND: 42580, volume: 53000 },
      { day: 25, date: 'Sep 12', priceVND: 42700, navVND: 42690, volume: 49000 },
      { day: 30, date: 'Sep 16', priceVND: 42800, navVND: 42780, volume: 45000 }
    ]
  },
  {
    id: 'prod-5',
    code: 'VNA-INDU',
    name: 'VNA Industrial Exposure',
    underlyingSymbol: 'HPG-PROXY',
    underlyingTicker: 'HPG',
    underlyingCompanyName: 'Vietnam Steel & Heavy Industrial Infrastructure (Simulated)',
    sector: 'Industrial',
    referencePriceVND: 28500,
    dailyChangePercent: -1.25,
    custodyCoverageRatio: 100.0,
    underlyingSharesHeld: 8000000,
    receiptsIssued: 7200000,
    maxAuthorizedUnits: 8000000,
    availableReceipts: 800000,
    foreignRoomDirectPercent: 1.2,
    foreignOwnershipLimit: 98.8,
    dividendYieldPercent: 3.90,
    custodian: 'Lotus Custody Bank',
    isin: 'VN000000HPG6',
    foreignRoomDirectLabel: '1.20% (Heavy manufacturing foreign room constrained)',
    vietAccessPoolAvailability: '800,000 Receipts Available in Segregated Custody Pool',
    riskCategory: 'Medium–High',
    custodianName: 'Lotus Custody Bank',
    custodianStatus: 'Fully Audited & Segregated',
    complianceStatus: 'Approved for Qualified Foreign Investors',
    transferStatus: 'Active',
    contractIdentifier: '0x33bF81c43D29128A4a0980d2165CeD2291A72101',
    lastDistributionVND: 1100,
    lastDistributionDate: '2026-05-30',
    nextDistributionDate: '2026-11-15',
    annualizedYieldEstPercent: 3.90,
    volatilityRating: 'Elevated',
    description: 'Economic exposure to national heavy industrial materials, blast-furnace steel manufacturing, and civil engineering infrastructure supply chains.',
    performanceHistory: [
      { day: 1, date: 'Aug 18', priceVND: 29800, navVND: 29780, volume: 180000 },
      { day: 5, date: 'Aug 23', priceVND: 29400, navVND: 29390, volume: 165000 },
      { day: 10, date: 'Aug 28', priceVND: 29100, navVND: 29080, volume: 142000 },
      { day: 15, date: 'Sep 02', priceVND: 28900, navVND: 28890, volume: 156000 },
      { day: 20, date: 'Sep 07', priceVND: 28800, navVND: 28790, volume: 138000 },
      { day: 25, date: 'Sep 12', priceVND: 28650, navVND: 28640, volume: 129000 },
      { day: 30, date: 'Sep 16', priceVND: 28500, navVND: 28490, volume: 115000 }
    ]
  },
  {
    id: 'prod-6',
    code: 'VNA-HEAL',
    name: 'VNA Healthcare Exposure',
    underlyingSymbol: 'DHG-PROXY',
    underlyingTicker: 'DHG',
    underlyingCompanyName: 'Vietnam Pharmaceutical & Medical Devices (Simulated)',
    sector: 'Healthcare',
    referencePriceVND: 62000,
    dailyChangePercent: +0.45,
    custodyCoverageRatio: 100.0,
    underlyingSharesHeld: 1500000,
    receiptsIssued: 1300000,
    maxAuthorizedUnits: 1500000,
    availableReceipts: 200000,
    foreignRoomDirectPercent: 0.0,
    foreignOwnershipLimit: 100,
    dividendYieldPercent: 4.60,
    custodian: 'Lotus Custody Bank',
    isin: 'VN000000DHG2',
    foreignRoomDirectLabel: '0.00% (National healthcare strategic limit fully capped)',
    vietAccessPoolAvailability: '200,000 Receipts Available in Segregated Custody Pool',
    riskCategory: 'Low–Medium',
    custodianName: 'Lotus Custody Bank',
    custodianStatus: 'Fully Audited & Segregated',
    complianceStatus: 'Approved for Qualified Foreign Investors',
    transferStatus: 'Active',
    contractIdentifier: '0x77dE9012C6287A1192b02888D18C44280E5199A0',
    lastDistributionVND: 2800,
    lastDistributionDate: '2026-06-12',
    nextDistributionDate: '2026-12-08',
    annualizedYieldEstPercent: 4.60,
    volatilityRating: 'Low',
    description: 'Contractual economic participation linked to GMP-certified generic pharmaceutical manufacturing and national clinical distribution channels.',
    performanceHistory: [
      { day: 1, date: 'Aug 18', priceVND: 60500, navVND: 60480, volume: 22000 },
      { day: 5, date: 'Aug 23', priceVND: 60900, navVND: 60880, volume: 24000 },
      { day: 10, date: 'Aug 28', priceVND: 61200, navVND: 61180, volume: 28000 },
      { day: 15, date: 'Sep 02', priceVND: 61500, navVND: 61490, volume: 26000 },
      { day: 20, date: 'Sep 07', priceVND: 61800, navVND: 61780, volume: 31000 },
      { day: 25, date: 'Sep 12', priceVND: 61900, navVND: 61890, volume: 29000 },
      { day: 30, date: 'Sep 16', priceVND: 62000, navVND: 61980, volume: 25000 }
    ]
  }
];

// Initial Portfolio for Simulated Active Investor INV-001 (Global Pacific Asset Management)
export const INITIAL_PORTFOLIO: PortfolioPosition[] = [
  {
    productCode: 'VNA-CONS',
    quantity: 45000,
    averageCostVND: 81500,
    currentReferencePriceVND: 84500,
    totalCostVND: 3667500000, // ~3.66B VND
    currentValueVND: 3802500000, // ~3.80B VND
    unrealizedReturnVND: 135000000,
    unrealizedReturnPercent: 3.68,
    realizedDistributionsVND: 112500000,
    feesPaidVND: 9168750,
    redemptionEligibleQuantity: 45000,
    backingStatus: '100% Segregated'
  },
  {
    productCode: 'VNA-TECH',
    quantity: 25000,
    averageCostVND: 106000,
    currentReferencePriceVND: 112000,
    totalCostVND: 2650000000, // ~2.65B VND
    currentValueVND: 2800000000, // ~2.80B VND
    unrealizedReturnVND: 150000000,
    unrealizedReturnPercent: 5.66,
    realizedDistributionsVND: 80000000,
    feesPaidVND: 6625000,
    redemptionEligibleQuantity: 25000,
    backingStatus: '100% Segregated'
  },
  {
    productCode: 'VNA-LOGI',
    quantity: 30000,
    averageCostVND: 41600,
    currentReferencePriceVND: 42800,
    totalCostVND: 1248000000, // ~1.24B VND
    currentValueVND: 1284000000, // ~1.28B VND
    unrealizedReturnVND: 36000000,
    unrealizedReturnPercent: 2.88,
    realizedDistributionsVND: 54000000,
    feesPaidVND: 3120000,
    redemptionEligibleQuantity: 30000,
    backingStatus: '100% Segregated'
  }
];

// Initial 30+ Permissioned Ledger Events
export const INITIAL_LEDGER_EVENTS: LedgerTransaction[] = [
  {
    id: 'tx-001',
    timestamp: '2026-09-16 08:45:12',
    eventType: 'MINT',
    productCode: 'VNA-CONS',
    quantity: 50000,
    referencePriceVND: 84500,
    totalValueVND: 4225000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x8f19a022b72183e89a4401c900e2817d65b1029c8821901aef91823901bce410',
    blockNumber: 489201,
    details: 'Primary mint allocation following physical share deposit ring-fencing verification at Vietnam Securities Depository.',
    resultingReceiptSupply: 2750000,
    resultingReserveBalance: 3200000,
    complianceApprovalId: 'COMP-APP-9821'
  },
  {
    id: 'tx-002',
    timestamp: '2026-09-16 08:12:05',
    eventType: 'TRANSFER',
    productCode: 'VNA-TECH',
    quantity: 12000,
    referencePriceVND: 111800,
    totalValueVND: 1341600000,
    participantId: 'INV-001',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x7e2210a4891bca782190ee012a99182377b09182cde10928a3819028cb99182a',
    blockNumber: 489198,
    details: 'Secondary DvP bilateral transfer executed against whitelisted institutional custodian sub-account.',
    resultingReceiptSupply: 1950000,
    resultingReserveBalance: 2200000
  },
  {
    id: 'tx-003',
    timestamp: '2026-09-15 16:30:00',
    eventType: 'RECONCILIATION',
    productCode: 'VNA-BANK',
    quantity: 5900000,
    referencePriceVND: 36200,
    totalValueVND: 213580000000,
    participantId: 'CUST-LOTUS',
    participantRole: 'Depository Custodian',
    status: 'COMPLETED',
    verifier: 'National Market Observer Node',
    txHash: '0x99182371aef09182ca9182377a0192837bc90182cda01928371029381928019a',
    blockNumber: 489150,
    details: 'Daily automated reserve audit: 6,500,000 underlying shares confirmed vs 5,900,000 receipts in circulation. 100% backed.',
    resultingReceiptSupply: 5900000,
    resultingReserveBalance: 6500000
  },
  {
    id: 'tx-004',
    timestamp: '2026-09-15 14:15:22',
    eventType: 'DISTRIBUTION',
    productCode: 'VNA-LOGI',
    quantity: 3100000,
    referencePriceVND: 42800,
    totalValueVND: 5580000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x12a98172bc9018237190ee01928374a8192039182bcda0192837410293819280',
    blockNumber: 489122,
    details: 'Simulated corporate cash dividend distribution pass-through: 1,800 VND gross per unit deposited to investor cash escrow.',
    resultingReceiptSupply: 3100000,
    resultingReserveBalance: 3500000
  },
  {
    id: 'tx-005',
    timestamp: '2026-09-15 11:05:40',
    eventType: 'REDEMPTION',
    productCode: 'VNA-INDU',
    quantity: 20000,
    referencePriceVND: 28500,
    totalValueVND: 570000000,
    participantId: 'INV-002',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Meridian Broker Node',
    txHash: '0x43b8172901823746a0192837190ee8172bc90182371928301928301928301928',
    blockNumber: 489094,
    details: 'Institutional redemption settlement request: receipts locked pending domestic broker equity liquidation.',
    resultingReceiptSupply: 7200000,
    resultingReserveBalance: 8000000
  },
  {
    id: 'tx-006',
    timestamp: '2026-09-15 11:10:00',
    eventType: 'BURN',
    productCode: 'VNA-INDU',
    quantity: 20000,
    referencePriceVND: 28500,
    totalValueVND: 570000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x55c9182736451092837190ee1029384756102938475610293847561029384756',
    blockNumber: 489098,
    details: 'Permanent receipt burn following net fiat cash settlement credit to INV-002.',
    resultingReceiptSupply: 7180000,
    resultingReserveBalance: 7980000
  },
  {
    id: 'tx-007',
    timestamp: '2026-09-14 15:40:11',
    eventType: 'TRANSFER',
    productCode: 'VNA-CONS',
    quantity: 15000,
    referencePriceVND: 84100,
    totalValueVND: 1261500000,
    participantId: 'INV-003',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x88d9102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488950,
    details: 'Inter-custody whitelisted allocation transfer with zero beneficial ownership breach.',
    resultingReceiptSupply: 2750000,
    resultingReserveBalance: 3200000
  },
  {
    id: 'tx-008',
    timestamp: '2026-09-14 13:20:00',
    eventType: 'MINT',
    productCode: 'VNA-TECH',
    quantity: 40000,
    referencePriceVND: 111200,
    totalValueVND: 4448000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x33a102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488910,
    details: 'Verified pool expansion: underlying shares acquired via authorized broker and lodged in Lotus Custody ring-fence.',
    resultingReceiptSupply: 1950000,
    resultingReserveBalance: 2200000
  },
  {
    id: 'tx-009',
    timestamp: '2026-09-14 09:15:33',
    eventType: 'TRANSFER',
    productCode: 'VNA-BANK',
    quantity: 25000,
    referencePriceVND: 36450,
    totalValueVND: 911250000,
    participantId: 'INV-001',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'National Market Observer Node',
    txHash: '0x22f102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488870,
    details: 'Secondary market settlement via Meridian Securities clearing gateway.',
    resultingReceiptSupply: 5900000,
    resultingReserveBalance: 6500000
  },
  {
    id: 'tx-010',
    timestamp: '2026-09-13 16:50:00',
    eventType: 'RECONCILIATION',
    productCode: 'VNA-CONS',
    quantity: 2750000,
    referencePriceVND: 84100,
    totalValueVND: 231275000000,
    participantId: 'CUST-LOTUS',
    participantRole: 'Depository Custodian',
    status: 'COMPLETED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x11e102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488790,
    details: 'End-of-day custody audit: 3,200,000 underlying shares held vs 2,750,000 receipts active. 450,000 buffer headroom confirmed.',
    resultingReceiptSupply: 2750000,
    resultingReserveBalance: 3200000
  },
  {
    id: 'tx-011',
    timestamp: '2026-09-13 14:05:12',
    eventType: 'MINT',
    productCode: 'VNA-HEAL',
    quantity: 30000,
    referencePriceVND: 61900,
    totalValueVND: 1857000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x77c102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488740,
    details: 'Mint event authorized under accredited institutional investor allocation ticket.',
    resultingReceiptSupply: 1300000,
    resultingReserveBalance: 1500000
  },
  {
    id: 'tx-012',
    timestamp: '2026-09-13 11:20:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-LOGI',
    quantity: 18000,
    referencePriceVND: 42700,
    totalValueVND: 768600000,
    participantId: 'INV-002',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x66b102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488710,
    details: 'Pre-cleared transfer between Nordic Pension and verified offshore custodian vault.',
    resultingReceiptSupply: 3100000,
    resultingReserveBalance: 3500000
  },
  {
    id: 'tx-013',
    timestamp: '2026-09-12 15:10:00',
    eventType: 'DISTRIBUTION',
    productCode: 'VNA-HEAL',
    quantity: 1300000,
    referencePriceVND: 61900,
    totalValueVND: 3640000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'COMPLETED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x55a102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488620,
    details: 'Interim cash dividend pass-through: 2,800 VND per unit credited to registered receipt holders.',
    resultingReceiptSupply: 1300000,
    resultingReserveBalance: 1500000
  },
  {
    id: 'tx-014',
    timestamp: '2026-09-12 10:30:15',
    eventType: 'TRANSFER',
    productCode: 'VNA-TECH',
    quantity: 8000,
    referencePriceVND: 111200,
    totalValueVND: 889600000,
    participantId: 'INV-003',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Meridian Broker Node',
    txHash: '0x44f102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488580,
    details: 'Bilateral transfer executed with real-time compliance check against investor allocation caps.',
    resultingReceiptSupply: 1950000,
    resultingReserveBalance: 2200000
  },
  {
    id: 'tx-015',
    timestamp: '2026-09-11 16:30:00',
    eventType: 'RECONCILIATION',
    productCode: 'VNA-TECH',
    quantity: 1950000,
    referencePriceVND: 111200,
    totalValueVND: 216840000000,
    participantId: 'CUST-LOTUS',
    participantRole: 'Depository Custodian',
    status: 'COMPLETED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x33e102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488490,
    details: 'Lotus Custody confirmed 2,200,000 shares in segregated vault vs 1,950,000 active receipts.',
    resultingReceiptSupply: 1950000,
    resultingReserveBalance: 2200000
  },
  {
    id: 'tx-016',
    timestamp: '2026-09-11 13:45:00',
    eventType: 'MINT',
    productCode: 'VNA-INDU',
    quantity: 100000,
    referencePriceVND: 28650,
    totalValueVND: 2865000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x22d102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488430,
    details: 'Underlying equity block secured on HSX and deposited into designated omnibus custodian account.',
    resultingReceiptSupply: 7200000,
    resultingReserveBalance: 8000000
  },
  {
    id: 'tx-017',
    timestamp: '2026-09-11 10:15:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-CONS',
    quantity: 22000,
    referencePriceVND: 84100,
    totalValueVND: 1850200000,
    participantId: 'INV-001',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'National Market Observer Node',
    txHash: '0x11c102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488390,
    details: 'Off-exchange block transfer verified by dual-signature depository settlement.',
    resultingReceiptSupply: 2750000,
    resultingReserveBalance: 3200000
  },
  {
    id: 'tx-018',
    timestamp: '2026-09-10 15:20:00',
    eventType: 'REDEMPTION',
    productCode: 'VNA-BANK',
    quantity: 35000,
    referencePriceVND: 36700,
    totalValueVND: 1284500000,
    participantId: 'INV-003',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Meridian Broker Node',
    txHash: '0x00b102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488280,
    details: 'Standard institutional liquidity redemption request processed through authorized broker.',
    resultingReceiptSupply: 5900000,
    resultingReserveBalance: 6500000
  },
  {
    id: 'tx-019',
    timestamp: '2026-09-10 15:25:00',
    eventType: 'BURN',
    productCode: 'VNA-BANK',
    quantity: 35000,
    referencePriceVND: 36700,
    totalValueVND: 1284500000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x99a102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488285,
    details: 'Destruction of 35,000 VNA-BANK digital receipts upon completion of net fiat settlement.',
    resultingReceiptSupply: 5865000,
    resultingReserveBalance: 6465000
  },
  {
    id: 'tx-020',
    timestamp: '2026-09-10 11:40:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-HEAL',
    quantity: 14000,
    referencePriceVND: 61800,
    totalValueVND: 865200000,
    participantId: 'INV-002',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x88f102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488210,
    details: 'Whitelisted investor transfer checked for sanctions and beneficial ownership limits.',
    resultingReceiptSupply: 1300000,
    resultingReserveBalance: 1500000
  },
  {
    id: 'tx-021',
    timestamp: '2026-09-09 16:30:00',
    eventType: 'RECONCILIATION',
    productCode: 'VNA-LOGI',
    quantity: 3100000,
    referencePriceVND: 42600,
    totalValueVND: 132060000000,
    participantId: 'CUST-LOTUS',
    participantRole: 'Depository Custodian',
    status: 'COMPLETED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x77e102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488100,
    details: '100% matched: 3,500,000 physical shares in VSD vs 3,100,000 circulating receipts.',
    resultingReceiptSupply: 3100000,
    resultingReserveBalance: 3500000
  },
  {
    id: 'tx-022',
    timestamp: '2026-09-09 14:10:00',
    eventType: 'MINT',
    productCode: 'VNA-CONS',
    quantity: 75000,
    referencePriceVND: 83900,
    totalValueVND: 6292500000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x66d102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 488040,
    details: 'Issuance order approved following confirmation of underlying share deposit at Lotus Custody.',
    resultingReceiptSupply: 2750000,
    resultingReserveBalance: 3200000
  },
  {
    id: 'tx-023',
    timestamp: '2026-09-09 10:05:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-INDU',
    quantity: 45000,
    referencePriceVND: 28800,
    totalValueVND: 1296000000,
    participantId: 'INV-001',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'National Market Observer Node',
    txHash: '0x55c102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487990,
    details: 'Settlement confirmed by Meridian Securities with zero foreign ownership breach.',
    resultingReceiptSupply: 7200000,
    resultingReserveBalance: 8000000
  },
  {
    id: 'tx-024',
    timestamp: '2026-09-08 15:45:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-TECH',
    quantity: 15000,
    referencePriceVND: 110500,
    totalValueVND: 1657500000,
    participantId: 'INV-002',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x44b102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487890,
    details: 'Offshore investor portfolio rebalancing execution.',
    resultingReceiptSupply: 1950000,
    resultingReserveBalance: 2200000
  },
  {
    id: 'tx-025',
    timestamp: '2026-09-08 11:20:00',
    eventType: 'MINT',
    productCode: 'VNA-BANK',
    quantity: 80000,
    referencePriceVND: 36700,
    totalValueVND: 2936000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x33a102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487820,
    details: 'New issuance of 80,000 VNA-BANK receipts against verified VSD segregated shares.',
    resultingReceiptSupply: 5900000,
    resultingReserveBalance: 6500000
  },
  {
    id: 'tx-026',
    timestamp: '2026-09-07 16:30:00',
    eventType: 'RECONCILIATION',
    productCode: 'VNA-HEAL',
    quantity: 1300000,
    referencePriceVND: 61800,
    totalValueVND: 80340000000,
    participantId: 'CUST-LOTUS',
    participantRole: 'Depository Custodian',
    status: 'COMPLETED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x22f102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487710,
    details: '1,500,000 underlying shares verified in custody against 1,300,000 receipts in circulation.',
    resultingReceiptSupply: 1300000,
    resultingReserveBalance: 1500000
  },
  {
    id: 'tx-027',
    timestamp: '2026-09-07 14:00:00',
    eventType: 'DISTRIBUTION',
    productCode: 'VNA-CONS',
    quantity: 2750000,
    referencePriceVND: 83900,
    totalValueVND: 6875000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'COMPLETED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x11e102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487660,
    details: 'Annual dividend disbursement: 2,500 VND per receipt credited directly to participant balances.',
    resultingReceiptSupply: 2750000,
    resultingReserveBalance: 3200000
  },
  {
    id: 'tx-028',
    timestamp: '2026-09-06 13:10:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-LOGI',
    quantity: 20000,
    referencePriceVND: 42600,
    totalValueVND: 852000000,
    participantId: 'INV-003',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Meridian Broker Node',
    txHash: '0x00d102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487530,
    details: 'Institutional secondary block transfer completed between approved QFII participants.',
    resultingReceiptSupply: 3100000,
    resultingReserveBalance: 3500000
  },
  {
    id: 'tx-029',
    timestamp: '2026-09-05 10:15:00',
    eventType: 'PAUSE',
    productCode: 'VNA-BANK',
    quantity: 0,
    referencePriceVND: 36700,
    totalValueVND: 0,
    participantId: 'COMP-LEAD-THU',
    participantRole: 'Chief Compliance Officer',
    status: 'COMPLETED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x99c102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487400,
    details: 'Emergency circuit breaker simulated test: transfer pause initiated and successfully verified with dual-key.',
    resultingReceiptSupply: 5900000,
    resultingReserveBalance: 6500000
  },
  {
    id: 'tx-030',
    timestamp: '2026-09-05 10:45:00',
    eventType: 'PAUSE',
    productCode: 'VNA-BANK',
    quantity: 0,
    referencePriceVND: 36700,
    totalValueVND: 0,
    participantId: 'CUST-LOTUS',
    participantRole: 'Depository Custodian',
    status: 'COMPLETED',
    verifier: 'National Market Observer Node',
    txHash: '0x88b102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487415,
    details: 'Circuit breaker release: dual-key approval confirmed and VNA-BANK transfers resumed.',
    resultingReceiptSupply: 5900000,
    resultingReserveBalance: 6500000
  },
  {
    id: 'tx-031',
    timestamp: '2026-09-04 15:30:00',
    eventType: 'MINT',
    productCode: 'VNA-LOGI',
    quantity: 60000,
    referencePriceVND: 42300,
    totalValueVND: 2538000000,
    participantId: 'ISSUER-VNA',
    participantRole: 'Licensed Issuer',
    status: 'VERIFIED',
    verifier: 'Lotus Custody Validator Node',
    txHash: '0x77a102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487310,
    details: 'Primary mint allocation following confirmed custody settlement at Lotus Custody Bank.',
    resultingReceiptSupply: 3100000,
    resultingReserveBalance: 3500000
  },
  {
    id: 'tx-032',
    timestamp: '2026-09-03 11:20:00',
    eventType: 'TRANSFER',
    productCode: 'VNA-TECH',
    quantity: 20000,
    referencePriceVND: 109200,
    totalValueVND: 2184000000,
    participantId: 'INV-001',
    participantRole: 'Qualified Foreign Investor',
    status: 'VERIFIED',
    verifier: 'Horizon Assurance Node',
    txHash: '0x66f102938475610293847561029384756102938475610293847561029384756',
    blockNumber: 487150,
    details: 'Portfolio allocation addition by Global Pacific Asset Management.',
    resultingReceiptSupply: 1950000,
    resultingReserveBalance: 2200000
  }
];

// 10 Required Realistic Compliance Alerts
export const INITIAL_COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    id: 'ALT-101',
    timestamp: '2026-09-16 08:35:12',
    severity: 'High',
    event: 'Transaction Exceeds Single-Investor Concentration Limit',
    investorId: 'INV-003',
    productCode: 'VNA-CONS',
    triggeredRule: 'Rule SEC-4.1: Single-investor holding must not exceed 25% of active receipt issuance.',
    status: 'Open',
    assignedReviewer: 'Tran Minh Thu',
    notes: [
      'Simulated order attempt for 180,000 units would raise INV-003 total holding to 26.2% of VNA-CONS supply.',
      'Auto-throttle triggered; manual sign-off required.'
    ]
  },
  {
    id: 'ALT-102',
    timestamp: '2026-09-15 15:10:04',
    severity: 'Medium',
    event: 'Repeated Transfer Velocity in 60-Minute Window',
    investorId: 'INV-002',
    productCode: 'VNA-INDU',
    triggeredRule: 'Rule AML-7.2: High-frequency bilateral transfers trigger algorithmic surveillance review.',
    status: 'Investigating',
    assignedReviewer: 'David Ross',
    notes: [
      'Detected 4 rapid bilateral transactions across 35 minutes totaling 145,000 receipts.',
      'Requested confirmation of broker-dealer hedging activity.'
    ]
  },
  {
    id: 'ALT-103',
    timestamp: '2026-09-15 11:22:40',
    severity: 'Critical',
    event: 'Transfer Attempt to Non-Whitelisted Institutional Address',
    investorId: 'INV-UNKNOWN-88',
    productCode: 'VNA-TECH',
    triggeredRule: 'Rule KYC-1.0: All recipient custody sub-accounts must complete institutional whitelisting.',
    status: 'Blocked',
    assignedReviewer: 'Tran Minh Thu',
    notes: [
      'Transaction rejected at gateway node. Destination 0x9a88...71c has not completed Tier-1 KYC verification.',
      'Alert logged for National Market Observer surveillance review.'
    ]
  },
  {
    id: 'ALT-104',
    timestamp: '2026-09-14 16:05:18',
    severity: 'Low',
    event: 'Jurisdiction Periodic Re-certification Due',
    investorId: 'INV-001',
    productCode: 'GLOBAL',
    triggeredRule: 'Rule REG-2.4: Annual jurisdiction sanction review renewal.',
    status: 'Open',
    assignedReviewer: 'David Ross',
    notes: [
      'Singapore MAS registered fund manager certificate requires annual automated API re-check.',
      'No adverse media or sanction flags detected.'
    ]
  },
  {
    id: 'ALT-105',
    timestamp: '2026-09-14 10:45:00',
    severity: 'High',
    event: 'Unusual Large-Scale Redemption Activity',
    investorId: 'INV-002',
    productCode: 'VNA-BANK',
    triggeredRule: 'Rule LIQ-3.3: Single-day redemption requests exceeding 50,000,000,000 VND require liquidity sign-off.',
    status: 'Investigating',
    assignedReviewer: 'Tran Minh Thu',
    notes: [
      'Redemption ticket submitted during market close. Scheduled for T+1 orderly broker market liquidation.'
    ]
  },
  {
    id: 'ALT-106',
    timestamp: '2026-09-13 14:30:12',
    severity: 'Critical',
    event: 'Over-Issuance Rejection: Mint Exceeds Verified Custody Shares',
    investorId: 'ISSUER-VNA',
    productCode: 'VNA-HEAL',
    triggeredRule: 'Rule CUST-INV-1: Receipts Issued must never exceed Underlying Shares Held in Segregated Custody.',
    status: 'Cleared',
    assignedReviewer: 'Tran Minh Thu',
    notes: [
      'Simulated mint request of 250,000 receipts rejected because available custody reserve was 200,000.',
      'Rejection successfully prevented any unbacked receipt creation. System operating as intended.'
    ]
  },
  {
    id: 'ALT-107',
    timestamp: '2026-09-12 11:15:30',
    severity: 'Medium',
    event: 'Beneficial Ownership Aggregation Near 5% Substantial Threshold',
    investorId: 'INV-001',
    productCode: 'VNA-TECH',
    triggeredRule: 'Rule SEC-5.0: Combined economic interest approaching 5% statutory threshold requires notice.',
    status: 'Investigating',
    assignedReviewer: 'David Ross',
    notes: [
      'INV-001 combined holding across linked fund entities stands at 4.65% of underlying share equivalent.',
      'Notification dispatched to investor compliance team.'
    ]
  },
  {
    id: 'ALT-108',
    timestamp: '2026-09-11 09:20:00',
    severity: 'Low',
    event: 'Missing Corporate Action Cash Confirmation Notice',
    investorId: 'CUST-LOTUS',
    productCode: 'VNA-INDU',
    triggeredRule: 'Rule CA-1.2: Custodian dividend remittance reconciliation within 24 hours of ex-date.',
    status: 'Cleared',
    assignedReviewer: 'David Ross',
    notes: [
      'Remittance voucher uploaded by Lotus Custody Operations and matched against ledger record.'
    ]
  },
  {
    id: 'ALT-109',
    timestamp: '2026-09-10 13:40:22',
    severity: 'Medium',
    event: 'Offshore Transfer Flagged for Sanction Screening Verification',
    investorId: 'INV-003',
    productCode: 'VNA-LOGI',
    triggeredRule: 'Rule AML-1.5: Name screening against updated international PEP list.',
    status: 'Cleared',
    assignedReviewer: 'Tran Minh Thu',
    notes: [
      'False positive match on common entity naming string. Verified clean against official OFAC and EU lists.'
    ]
  },
  {
    id: 'ALT-110',
    timestamp: '2026-09-09 17:00:00',
    severity: 'High',
    event: 'Circuit Breaker Event: Manual Pause Test Triggered',
    investorId: 'SYSTEM',
    productCode: 'VNA-BANK',
    triggeredRule: 'Rule SYS-CTRL-9: High-security system pause requires dual compliance/custodian key.',
    status: 'Cleared',
    assignedReviewer: 'Tran Minh Thu',
    notes: [
      'Quarterly emergency procedure drill completed successfully. Dual sign-off logged on ledger.'
    ]
  }
];

// 8 Required Distribution Records
export const INITIAL_DISTRIBUTIONS: DistributionRecord[] = [
  {
    id: 'DIST-2026-01',
    productCode: 'VNA-CONS',
    productName: 'VNA Consumer Exposure',
    recordDate: '2026-11-10',
    paymentDate: '2026-11-20',
    amountPerReceiptVND: 2500,
    receiptQuantity: 2750000,
    grossAmountVND: 6875000000,
    withholdingFeeVND: 343750000,
    netDistributionVND: 6531250000,
    status: 'Upcoming',
    custodianConfirmed: true,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-02',
    productCode: 'VNA-TECH',
    productName: 'VNA Technology Exposure',
    recordDate: '2026-10-15',
    paymentDate: '2026-10-25',
    amountPerReceiptVND: 3200,
    receiptQuantity: 1950000,
    grossAmountVND: 6240000000,
    withholdingFeeVND: 312000000,
    netDistributionVND: 5928000000,
    status: 'Upcoming',
    custodianConfirmed: true,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-03',
    productCode: 'VNA-BANK',
    productName: 'VNA Banking Exposure',
    recordDate: '2026-12-05',
    paymentDate: '2026-12-15',
    amountPerReceiptVND: 1200,
    receiptQuantity: 5900000,
    grossAmountVND: 7080000000,
    withholdingFeeVND: 354000000,
    netDistributionVND: 6726000000,
    status: 'Pending Custodian Confirmation',
    custodianConfirmed: false,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-04',
    productCode: 'VNA-LOGI',
    productName: 'VNA Logistics Exposure',
    recordDate: '2026-07-01',
    paymentDate: '2026-07-05',
    amountPerReceiptVND: 1800,
    receiptQuantity: 3100000,
    grossAmountVND: 5580000000,
    withholdingFeeVND: 279000000,
    netDistributionVND: 5301000000,
    status: 'Completed',
    custodianConfirmed: true,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-05',
    productCode: 'VNA-HEAL',
    productName: 'VNA Healthcare Exposure',
    recordDate: '2026-06-05',
    paymentDate: '2026-06-12',
    amountPerReceiptVND: 2800,
    receiptQuantity: 1300000,
    grossAmountVND: 3640000000,
    withholdingFeeVND: 182000000,
    netDistributionVND: 3458000000,
    status: 'Completed',
    custodianConfirmed: true,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-06',
    productCode: 'VNA-INDU',
    productName: 'VNA Industrial Exposure',
    recordDate: '2026-05-20',
    paymentDate: '2026-05-30',
    amountPerReceiptVND: 1100,
    receiptQuantity: 7200000,
    grossAmountVND: 7920000000,
    withholdingFeeVND: 396000000,
    netDistributionVND: 7524000000,
    status: 'Completed',
    custodianConfirmed: true,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-07',
    productCode: 'VNA-CONS',
    productName: 'VNA Consumer Exposure',
    recordDate: '2026-05-08',
    paymentDate: '2026-05-15',
    amountPerReceiptVND: 2500,
    receiptQuantity: 2750000,
    grossAmountVND: 6875000000,
    withholdingFeeVND: 343750000,
    netDistributionVND: 6531250000,
    status: 'Completed',
    custodianConfirmed: true,
    complianceApproved: true
  },
  {
    id: 'DIST-2026-08',
    productCode: 'VNA-HEAL',
    productName: 'VNA Healthcare Exposure',
    recordDate: '2026-11-28',
    paymentDate: '2026-12-08',
    amountPerReceiptVND: 2800,
    receiptQuantity: 1300000,
    grossAmountVND: 3640000000,
    withholdingFeeVND: 182000000,
    netDistributionVND: 3458000000,
    status: 'Upcoming',
    custodianConfirmed: true,
    complianceApproved: false
  }
];

// 6 Required Redemption Requests
export const INITIAL_REDEMPTIONS: RedemptionRequest[] = [
  {
    id: 'RED-501',
    investorId: 'INV-001',
    productCode: 'VNA-CONS',
    receiptQuantity: 10000,
    referenceNAV_VND: 84480,
    grossProceedsVND: 844800000,
    redemptionFeeVND: 1689600, // 0.20%
    netProceedsVND: 843110400,
    requestDate: '2026-09-16 08:30:00',
    settlementDate: '2026-09-17 (T+1)',
    status: 'Pending Liquidity',
    reason: 'Underlying equity block scheduled for orderly broker auction at HSX morning session.'
  },
  {
    id: 'RED-502',
    investorId: 'INV-002',
    productCode: 'VNA-INDU',
    receiptQuantity: 20000,
    referenceNAV_VND: 28490,
    grossProceedsVND: 569800000,
    redemptionFeeVND: 1139600,
    netProceedsVND: 568660400,
    requestDate: '2026-09-15 11:05:40',
    settlementDate: '2026-09-15 14:00:00',
    status: 'Completed',
    burnedTxHash: '0x55c9182736451092837190ee1029384756102938475610293847561029384756'
  },
  {
    id: 'RED-503',
    investorId: 'INV-003',
    productCode: 'VNA-BANK',
    receiptQuantity: 35000,
    referenceNAV_VND: 36190,
    grossProceedsVND: 1266650000,
    redemptionFeeVND: 2533300,
    netProceedsVND: 1264116700,
    requestDate: '2026-09-10 15:20:00',
    settlementDate: '2026-09-11 10:00:00',
    status: 'Completed',
    burnedTxHash: '0x99a102938475610293847561029384756102938475610293847561029384756'
  },
  {
    id: 'RED-504',
    investorId: 'INV-002',
    productCode: 'VNA-TECH',
    receiptQuantity: 15000,
    referenceNAV_VND: 111950,
    grossProceedsVND: 1679250000,
    redemptionFeeVND: 3358500,
    netProceedsVND: 1675891500,
    requestDate: '2026-09-16 09:10:00',
    settlementDate: '2026-09-17 (T+1)',
    status: 'Pending Compliance',
    reason: 'Beneficial ownership and AML source-of-wealth certification in progress.'
  },
  {
    id: 'RED-505',
    investorId: 'INV-003',
    productCode: 'VNA-LOGI',
    receiptQuantity: 25000,
    referenceNAV_VND: 42780,
    grossProceedsVND: 1069500000,
    redemptionFeeVND: 2139000,
    netProceedsVND: 1067361000,
    requestDate: '2026-09-14 14:00:00',
    settlementDate: '—',
    status: 'Temporarily Suspended',
    reason: 'Dual-key emergency pause protocol currently activated for scheduled custody infrastructure upgrade.'
  },
  {
    id: 'RED-506',
    investorId: 'INV-UNKNOWN-88',
    productCode: 'VNA-CONS',
    receiptQuantity: 5000,
    referenceNAV_VND: 84480,
    grossProceedsVND: 422400000,
    redemptionFeeVND: 844800,
    netProceedsVND: 421555200,
    requestDate: '2026-09-13 16:15:00',
    settlementDate: '—',
    status: 'Rejected',
    reason: 'Rejection: Account has not completed institutional accredited qualification verification.'
  }
];

// 5 Required Custody Reconciliation Events
export const INITIAL_RECONCILIATION_EVENTS: CustodyReconciliationRecord[] = [
  {
    id: 'REC-2026-01',
    productCode: 'VNA-CONS',
    timestamp: '2026-09-16 08:00:00',
    sharesInCustody: 3200000,
    receiptsIssued: 2750000,
    pendingMintEvents: 0,
    pendingBurnEvents: 0,
    cashDistributionBalanceVND: 6875000000,
    redemptionLiabilitiesVND: 844800000,
    discrepancyUnits: 0,
    status: 'Matched',
    notes: 'Full verification completed. Lotus Custody ledger and VSD depository balance in exact parity.',
    auditorSignoff: 'Horizon Assurance Lead Audit Partner'
  },
  {
    id: 'REC-2026-02',
    productCode: 'VNA-BANK',
    timestamp: '2026-09-15 16:30:00',
    sharesInCustody: 6500000,
    receiptsIssued: 5900000,
    pendingMintEvents: 0,
    pendingBurnEvents: 0,
    cashDistributionBalanceVND: 7080000000,
    redemptionLiabilitiesVND: 0,
    discrepancyUnits: 0,
    status: 'Matched',
    notes: 'Underlying equity custody accounts audited. Statutory 30% foreign room locked correctly at depository.',
    auditorSignoff: 'Lotus Custody Chief Auditor'
  },
  {
    id: 'REC-2026-03',
    productCode: 'VNA-TECH',
    timestamp: '2026-09-14 17:00:00',
    sharesInCustody: 2200000,
    receiptsIssued: 1950000,
    pendingMintEvents: 40000,
    pendingBurnEvents: 0,
    cashDistributionBalanceVND: 6240000000,
    redemptionLiabilitiesVND: 0,
    discrepancyUnits: 0,
    status: 'Matched',
    notes: 'Settlement matching confirmed for primary mint allocation. 250,000 available issuance buffer validated.',
    auditorSignoff: 'National Market Observer Designated Inspector'
  },
  {
    id: 'REC-2026-04',
    productCode: 'VNA-INDU',
    timestamp: '2026-09-13 18:00:00',
    sharesInCustody: 8000000,
    receiptsIssued: 7200000,
    pendingMintEvents: 0,
    pendingBurnEvents: 20000,
    cashDistributionBalanceVND: 7920000000,
    redemptionLiabilitiesVND: 570000000,
    discrepancyUnits: 0,
    status: 'Matched',
    notes: 'Redemption burn confirmed; 20,000 units destroyed on ledger in sync with equity liquidation proceeds.',
    auditorSignoff: 'Horizon Assurance Lead Audit Partner'
  },
  {
    id: 'REC-2026-05',
    productCode: 'VNA-LOGI',
    timestamp: '2026-09-12 17:30:00',
    sharesInCustody: 3500000,
    receiptsIssued: 3100000,
    pendingMintEvents: 0,
    pendingBurnEvents: 0,
    cashDistributionBalanceVND: 5580000000,
    redemptionLiabilitiesVND: 0,
    discrepancyUnits: 0,
    status: 'Matched',
    notes: 'Port operations equity held in segregated omnibus account 001-CUST-LOTUS. Zero reconciliation variance.',
    auditorSignoff: 'Lotus Custody Chief Auditor'
  }
];

// 4 Required Corporate Actions (Custodian Management)
export const INITIAL_CORPORATE_ACTIONS: CorporateAction[] = [
  {
    id: 'CA-001',
    productCode: 'VNA-CONS',
    type: 'cash_distribution',
    title: 'Interim Cash Dividend (2,500 VND / Share)',
    recordDate: '2026-11-10',
    effectiveDate: '2026-11-20',
    underlyingImpact: 'Underlying issuer remits 2,500 VND per share to Lotus Custody segregated escrow.',
    receiptAdjustment: 'Automatic 1:1 contractual pass-through credit of 2,500 VND to receipt holder cash escrow.',
    amountPerReceiptVND: 2500,
    investorNotificationStatus: 'Dispatched',
    processingStatus: 'Custodian Confirmed'
  },
  {
    id: 'CA-002',
    productCode: 'VNA-TECH',
    type: 'stock_split',
    title: 'Proposed 2-for-1 Common Stock Split',
    recordDate: '2026-12-01',
    effectiveDate: '2026-12-10',
    underlyingImpact: 'Underlying company doubles authorized shares; share price adjusts by factor of 0.5.',
    receiptAdjustment: 'VNA-TECH receipts adjust 1:2 simultaneously on ledger; reference price divides by 2.',
    investorNotificationStatus: 'Pending Dispatch',
    processingStatus: 'Announced'
  },
  {
    id: 'CA-003',
    productCode: 'VNA-BANK',
    type: 'suspension',
    title: 'Annual General Meeting Shareholder Register Lock',
    recordDate: '2026-10-05',
    effectiveDate: '2026-10-08',
    underlyingImpact: 'Vietnam Securities Depository locks underlying shareholder voting registry.',
    receiptAdjustment: 'VietAccess secondary receipt trading remains active; no voting rights passed to receipt holders.',
    investorNotificationStatus: 'Dispatched',
    processingStatus: 'Allocated'
  },
  {
    id: 'CA-004',
    productCode: 'VNA-LOGI',
    type: 'rights_issue',
    title: 'Deepwater Berth Expansion Rights Offering (10:1 at 25,000 VND)',
    recordDate: '2026-11-15',
    effectiveDate: '2026-11-25',
    underlyingImpact: 'Listed port company issues non-transferable subscription rights to registered domestic holders.',
    receiptAdjustment: 'Custodian monetizes rights in local market; net cash proceeds distributed pro-rata to receipt holders.',
    investorNotificationStatus: 'Dispatched',
    processingStatus: 'Under Review'
  }
];

// 3 Required Incident Reports
export const INITIAL_INCIDENT_REPORTS: IncidentReport[] = [
  {
    id: 'INC-2026-001',
    title: 'Automated Over-Issuance Prevention Circuit Triggered',
    type: 'custody_mismatch',
    severity: 'High',
    affectedProducts: ['VNA-HEAL'],
    detectedTime: '2026-09-13 14:30:12',
    financialImpactVND: 0,
    affectedInvestorsCount: 0,
    immediateControl: 'System rejected issuance request automatically; no unbacked units created on ledger.',
    investigationStatus: 'Resolved',
    resolutionStatus: 'Root Cause Identified & Remediated',
    timeline: [
      { time: '14:30:12', event: 'Issuance order ticket for 250,000 receipts received by gateway.' },
      { time: '14:30:13', event: 'Lotus Custody ledger check reported 200,000 buffer headroom.' },
      { time: '14:30:14', event: 'Rule CUST-INV-1 automatically blocked order execution.' },
      { time: '14:35:00', event: 'Compliance lead reviewed alert; confirmed zero financial exposure.' }
    ]
  },
  {
    id: 'INC-2026-002',
    title: 'Delayed Redemption Liquidity Window Settlement',
    type: 'delayed_redemption',
    severity: 'Medium',
    affectedProducts: ['VNA-CONS'],
    detectedTime: '2026-09-10 16:45:00',
    financialImpactVND: 0,
    affectedInvestorsCount: 1,
    immediateControl: 'Order queued for priority execution in next morning domestic trading session.',
    investigationStatus: 'Resolved',
    resolutionStatus: 'Root Cause Identified & Remediated',
    timeline: [
      { time: '16:45:00', event: 'Redemption request received 15 minutes after HSX closing auction.' },
      { time: '16:50:00', event: 'Authorized broker queued underlying share liquidation for T+1 09:15 open.' },
      { time: '09:30:00 (Next Day)', event: 'Block sold at reference NAV; net proceeds wired to investor cash escrow.' }
    ]
  },
  {
    id: 'INC-2026-003',
    title: 'Unauthorised API Gateway Access Attempt Mitigated',
    type: 'unauthorised_access',
    severity: 'Critical',
    affectedProducts: ['ALL'],
    detectedTime: '2026-09-08 03:12:44',
    financialImpactVND: 0,
    affectedInvestorsCount: 0,
    immediateControl: 'IP block and mutual TLS client certificate revocation activated within 300ms.',
    investigationStatus: 'Resolved',
    resolutionStatus: 'Root Cause Identified & Remediated',
    timeline: [
      { time: '03:12:44', event: 'Unregistered endpoint queried private ledger consensus RPC.' },
      { time: '03:12:45', event: 'WAF and mutual TLS gateway dropped connection.' },
      { time: '03:20:00', event: 'Security Operations Center verified zero ledger tampering or key leakage.' }
    ]
  }
];

// 3 Required Realistic Investor Review Case Files
export const INITIAL_INVESTOR_CASES: InvestorReviewCase[] = [
  {
    investorId: 'INV-001',
    institutionName: 'Global Pacific Asset Management (Singapore) Ltd',
    investorType: 'Institutional Asset Manager',
    jurisdiction: 'Singapore (MAS Licensed Fund Manager)',
    beneficialOwnerStatus: 'Declared & Verified (Non-Sanctioned)',
    riskRating: 'Low',
    sanctionsResult: 'Passed (OFAC/UN/EU Clean)',
    sourceOfFundsStatus: 'Verified Tier-1 Global Depository',
    suitabilityResult: 'Approved for Non-Voting Structured Receipts',
    submittedAcknowledgements: true,
    previousAlertsCount: 1,
    status: 'Approved',
    limits: {
      maxPortfolioVND: 50000000000, // 50B VND (~$2M USD)
      permittedProducts: ['VNA-CONS', 'VNA-TECH', 'VNA-LOGI', 'VNA-BANK', 'VNA-INDU', 'VNA-HEAL'],
      maxDailyTxCount: 10,
      enhancedMonitoring: false
    },
    reviewerNotes: [
      'Top-tier Singapore licensed institutional manager managing sovereign and pension mandates.',
      'All beneficial ownership disclosures verified against ACRA registry.'
    ],
    approvalHistory: [
      { timestamp: '2026-08-15 10:00:00', action: 'Onboarding Dossier Submitted', reviewer: 'System' },
      { timestamp: '2026-08-16 14:30:00', action: 'KYC/AML Passed All Checks', reviewer: 'David Ross' },
      { timestamp: '2026-08-17 09:15:00', action: 'Approved for Full Institutional Access', reviewer: 'Tran Minh Thu' }
    ]
  },
  {
    investorId: 'INV-002',
    institutionName: 'Nordic Pension & Endowment Trust',
    investorType: 'Pension Fund',
    jurisdiction: 'Sweden (Finansinspektionen Regulated)',
    beneficialOwnerStatus: 'Declared & Verified (Non-Sanctioned)',
    riskRating: 'Low',
    sanctionsResult: 'Passed (OFAC/UN/EU Clean)',
    sourceOfFundsStatus: 'Verified Tier-1 Global Depository',
    suitabilityResult: 'Approved for Non-Voting Structured Receipts',
    submittedAcknowledgements: true,
    previousAlertsCount: 2,
    status: 'Approved with Limits',
    limits: {
      maxPortfolioVND: 25000000000, // 25B VND
      permittedProducts: ['VNA-CONS', 'VNA-LOGI', 'VNA-HEAL', 'VNA-INDU'],
      maxDailyTxCount: 5,
      enhancedMonitoring: true
    },
    reviewerNotes: [
      'Approved with limits: restricted from high-volatility banking sector pending internal asset allocation review.',
      'Mandatory enhanced transaction velocity monitoring active.'
    ],
    approvalHistory: [
      { timestamp: '2026-08-20 11:00:00', action: 'Dossier Submitted', reviewer: 'System' },
      { timestamp: '2026-08-22 16:00:00', action: 'Approved with Sector Limits', reviewer: 'Tran Minh Thu' }
    ]
  },
  {
    investorId: 'INV-003',
    institutionName: 'Nippon Capital Partners GP',
    investorType: 'Qualified Family Office',
    jurisdiction: 'Japan (FSA Registered)',
    beneficialOwnerStatus: 'Pending Periodic Review',
    riskRating: 'Medium',
    sanctionsResult: 'Passed (OFAC/UN/EU Clean)',
    sourceOfFundsStatus: 'Verified Tier-1 Global Depository',
    suitabilityResult: 'Approved for Non-Voting Structured Receipts',
    submittedAcknowledgements: true,
    previousAlertsCount: 3,
    status: 'Pending Review',
    reviewerNotes: [
      'Annual beneficial ownership declaration renewal submitted. Awaiting updated cross-border tax residency certificate.'
    ],
    approvalHistory: [
      { timestamp: '2026-09-10 09:00:00', action: 'Annual Review Initiated', reviewer: 'David Ross' }
    ]
  }
];

// Initial System Controls State (Dual Authorisation Setup)
export const INITIAL_SYSTEM_CONTROLS: SystemControlsState = {
  allTransfersPaused: false,
  pausedProductCodes: [],
  newIssuanceDisabled: false,
  redemptionsDisabled: false,
  enhancedMonitoringRequired: false,
  auditHistory: [
    {
      id: 'AUD-001',
      timestamp: '2026-09-05 10:15:00',
      action: 'Emergency Circuit Breaker Drill: Pause VNA-BANK',
      requestedBy: 'Tran Minh Thu (Chief Compliance Officer)',
      approvedBy: 'Le Hoang Nam (Lotus Custody Rep)',
      reason: 'Quarterly compliance emergency drill',
      status: 'RESOLVED'
    },
    {
      id: 'AUD-002',
      timestamp: '2026-09-05 10:45:00',
      action: 'Resume VNA-BANK Transfers',
      requestedBy: 'Tran Minh Thu (Chief Compliance Officer)',
      approvedBy: 'Le Hoang Nam (Lotus Custody Rep)',
      reason: 'Emergency drill completed successfully',
      status: 'RESOLVED'
    }
  ]
};

// Initial Notification Center Items
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Distribution completed',
    message: 'Interim cash dividend for VNA-LOGI (1,800 VND/receipt) credited to your custody escrow account.',
    timestamp: '10 mins ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: 'KYC review approved',
    message: 'Institutional investor dossier INV-001 re-certification approved by Chief Compliance Officer.',
    timestamp: '45 mins ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    title: 'Redemption request received',
    message: 'Simulated redemption ticket RED-501 for 10,000 VNA-CONS receipts logged for T+1 settlement.',
    timestamp: '2 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-4',
    title: 'Custody reconciliation complete',
    message: 'All 6 underlying equity portfolios 100% matched with zero discrepancy at Lotus Custody Bank.',
    timestamp: '4 hours ago',
    read: true,
    type: 'success'
  },
  {
    id: 'notif-5',
    title: 'Transfer temporarily paused',
    message: 'Surveillance alert logged for test circuit breaker drill on VNA-BANK; released after dual-signoff.',
    timestamp: '1 day ago',
    read: true,
    type: 'warning'
  }
];

export interface HarvardReference {
  citation: string;
  description: string;
}

export const HARVARD_REFERENCES: HarvardReference[] = [
  {
    citation: 'MSCI (2026) Global Market Accessibility Review: Vietnam Frontier Market Assessment. Geneva: MSCI Inc.',
    description: 'Empirical benchmark evaluating Vietnamese equity foreign ownership limits, foreign room exhaustion, and settlement mechanisms across 11 accessibility criteria.'
  },
  {
    citation: 'State Securities Commission of Vietnam (SSC) (2020) Law on Securities No. 54/2019/QH14. Hanoi: National Assembly of Vietnam.',
    description: 'Primary statutory framework governing foreign institutional investment, registered depositories, and secondary securities trading.'
  },
  {
    citation: 'Vietnam Securities Depository and Clearing Corporation (VSDC) (2024) Operational Guidelines on Depository Receipts & Custody Segregation. Hanoi: VSDC.',
    description: 'Technical regulations on omnibus and segregated custodian accounts, ring-fencing client assets from bankruptcy estates.'
  },
  {
    citation: 'Bank for International Settlements & IOSCO (2012) Principles for Financial Market Infrastructures (PFMI). Basel: BIS.',
    description: 'Global standards for Delivery-versus-Payment (DvP), legal certainty, counterparty risk containment, and operational resilience.'
  },
  {
    citation: 'Ministry of Finance of Vietnam (2021) Circular No. 120/2020/TT-BTC Guiding Secondary Stock Market Transactions. Hanoi: MoF.',
    description: 'Regulatory provisions detailing trading mechanisms, settlement cycles, and off-market transfers for strategic listed equities.'
  },
  {
    citation: 'World Bank Group (2025) Capital Markets Review: Unlocking Foreign Institutional Inflows in Vietnam. Washington, D.C.: World Bank.',
    description: 'Policy study assessing economic solutions to foreign ownership caps, non-voting depository receipts (NVDRs), and pre-funding elimination.'
  },
  {
    citation: 'International Monetary Fund (2024) Vietnam: Financial System Stability Assessment. IMF Country Report No. 24/112. Washington, D.C.: IMF.',
    description: 'Macroprudential evaluation of systemic liquidity, securities settlement infrastructure, and institutional investor safeguards.'
  },
  {
    citation: 'Financial Action Task Force (FATF) (2023) Anti-Money Laundering and Counter-Terrorist Financing Measures: Vietnam Mutual Evaluation. Paris: FATF.',
    description: 'International standards for institutional customer due diligence, beneficial ownership identification, and cross-border risk screening.'
  }
];

