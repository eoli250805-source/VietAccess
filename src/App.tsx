import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AcademicBanner } from './components/common/AcademicBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ReceiptModal } from './components/common/ReceiptModal';
import { DataSourcesModal } from './components/common/DataSourcesModal';
import { LedgerDrawerModal } from './components/common/LedgerDrawerModal';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { InvestorDashboard } from './components/pages/InvestorDashboard';
import { MarketDashboard } from './components/pages/MarketDashboard';
import { ProductDetail } from './components/pages/ProductDetail';
import { InvestorOnboarding } from './components/pages/InvestorOnboarding';
import { TransactionSimulation } from './components/pages/TransactionSimulation';
import { InvestorPortfolio } from './components/pages/InvestorPortfolio';
import { DistributionsPage } from './components/pages/DistributionsPage';
import { RedemptionPage } from './components/pages/RedemptionPage';
import { TransparencyLedger } from './components/pages/TransparencyLedger';
import { CustodianDashboard } from './components/pages/CustodianDashboard';
import { ComplianceDashboard } from './components/pages/ComplianceDashboard';
import { HowItWorks } from './components/pages/HowItWorks';
import { BusinessModel } from './components/pages/BusinessModel';
import { RisksAndResponsibility } from './components/pages/RisksAndResponsibility';
import { HelpEducation } from './components/pages/HelpEducation';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Khôi phục Ứng dụng / App Recovery</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ứng dụng phát hiện dữ liệu bộ nhớ đệm cũ hoặc lỗi kết xuất. Nhấn nút bên dưới để khôi phục trạng thái mặc định.
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                {this.state.error?.message || 'Unexpected application render condition'}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-lg shadow-emerald-950"
              >
                Khôi phục Dữ liệu Mặc định (Reset & Reload)
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const { currentPage, notification, clearNotification } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <InvestorDashboard />;
      case 'market':
      case 'markets':
      case 'market_overview':
        return <MarketDashboard />;
      case 'product_detail':
        return <ProductDetail />;
      case 'onboarding':
        return <InvestorOnboarding />;
      case 'transaction':
      case 'trading':
      case 'buy':
      case 'sell':
        return <TransactionSimulation />;
      case 'portfolio':
        return <InvestorPortfolio />;
      case 'distributions':
        return <DistributionsPage />;
      case 'redeem':
        return <RedemptionPage />;
      case 'ledger':
      case 'transaction_ledger':
        return <TransparencyLedger />;
      case 'custodian':
      case 'custody_overview':
      case 'asset_pool':
      case 'mint_requests':
      case 'corporate_actions':
      case 'custodian_redemptions':
      case 'reconciliation':
        return <CustodianDashboard />;
      case 'compliance':
      case 'compliance_overview':
      case 'investor_reviews':
      case 'transaction_monitoring':
      case 'alerts':
      case 'audit_log':
      case 'system_controls':
      case 'regulatory_alerts':
      case 'ownership_limits':
      case 'system_health':
      case 'audit_reports':
        return <ComplianceDashboard />;
      case 'how_it_works':
        return <HowItWorks />;
      case 'business_model':
        return <BusinessModel />;
      case 'risks':
        return <RisksAndResponsibility />;
      case 'help':
        return <HelpEducation />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Permanent Academic Disclaimer Banner */}
      <AcademicBanner />

      {/* Header with Navigation & Role Switcher */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Floating Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
            <div
              className={`p-4 rounded-xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
                notification.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                  : notification.type === 'warning'
                  ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                  : notification.type === 'alert'
                  ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                  : 'bg-slate-900/90 border-slate-700 text-slate-200'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : notification.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-xs font-medium leading-relaxed">{notification.message}</div>
              <button
                onClick={clearNotification}
                className="text-slate-400 hover:text-white shrink-0 p-0.5 rounded hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {renderCurrentPage()}
      </main>

      {/* Comprehensive Academic Footer */}
      <Footer />

      {/* Global Transaction Receipt Modal */}
      <ReceiptModal />

      {/* Global Ledger Transaction Inspector Drawer Modal */}
      <LedgerDrawerModal />

      {/* Academic Sources & Statutory Citations Modal */}
      <DataSourcesModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
