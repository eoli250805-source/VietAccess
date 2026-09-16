import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { formatVND } from '../../data/mockData';
import {
  Bell,
  ChevronDown,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Menu,
  X,
  Wallet,
  Building2,
  Lock
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentPage,
    navigateTo,
    availableCashVND,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    resetDemoData,
    systemControls
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleConfigs: Record<
    UserRole,
    { label: string; badge: string; color: string; persona: string }
  > = {
    foreign_investor: {
      label: 'Foreign Investor',
      badge: 'INV-001',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      persona: 'Global Pacific Asset Mgmt (Singapore)'
    },
    custodian: {
      label: 'Custodian',
      badge: 'CUST-LOTUS',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      persona: 'Lotus Custody Bank (Depository Vault)'
    },
    compliance_officer: {
      label: 'Compliance Officer',
      badge: 'COMP-CHIEF',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      persona: 'Tran Minh Thu (Head of Surveillance)'
    },
    regulatory_observer: {
      label: 'Regulatory Observer',
      badge: 'REG-SURVEIL',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      persona: 'National Market Observer (Read-Only)'
    }
  };

  // Nav links for each role
  const getNavLinks = () => {
    switch (currentRole) {
      case 'foreign_investor':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'markets', label: 'Markets' },
          { id: 'portfolio', label: 'Portfolio' },
          { id: 'transaction', label: 'Transactions' },
          { id: 'distributions', label: 'Distributions' },
          { id: 'redeem', label: 'Redeem' },
          { id: 'help', label: 'Help' }
        ];
      case 'custodian':
        return [
          { id: 'custody_overview', label: 'Custody Overview' },
          { id: 'asset_pool', label: 'Asset Pool' },
          { id: 'mint_requests', label: 'Mint Requests' },
          { id: 'corporate_actions', label: 'Corporate Actions' },
          { id: 'custodian_redemptions', label: 'Redemptions' },
          { id: 'reconciliation', label: 'Reconciliation' }
        ];
      case 'compliance_officer':
        return [
          { id: 'compliance_overview', label: 'Compliance Overview' },
          { id: 'investor_reviews', label: 'Investor Reviews' },
          { id: 'transaction_monitoring', label: 'Transaction Monitoring' },
          { id: 'alerts', label: 'Alerts' },
          { id: 'audit_log', label: 'Audit Log' },
          { id: 'system_controls', label: 'System Controls' }
        ];
      case 'regulatory_observer':
        return [
          { id: 'market_overview', label: 'Market Overview' },
          { id: 'backing_monitor', label: 'Backing Monitor' },
          { id: 'transaction_ledger', label: 'Transaction Ledger' },
          { id: 'compliance_activity', label: 'Compliance Activity' },
          { id: 'incident_reports', label: 'Incident Reports' }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header id="global-header" className="bg-slate-900 border-b border-slate-800 sticky top-[31px] z-40 shadow-xl">
      {/* Circuit breaker alert banner if active */}
      {systemControls.allTransfersPaused && (
        <div className="bg-rose-950/90 border-b border-rose-500/50 px-4 py-1.5 text-xs text-rose-200 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span className="font-semibold uppercase tracking-wider">System-Wide Pause Active:</span>
          <span>All secondary receipt transfers temporarily frozen by dual-authorisation circuit breaker.</span>
          <button
            onClick={() => navigateTo('system_controls')}
            className="underline font-semibold ml-2 hover:text-white"
          >
            Review Controls
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-6">
            <button
              id="brand-logo-btn"
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center shadow-inner group-hover:border-emerald-400 transition-colors">
                <span className="font-serif font-extrabold text-lg text-emerald-400">VA</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-100 text-base tracking-tight font-sans">
                    VietAccess
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    Inst.
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                  Equity Receipts
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => navigateTo(link.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-800 text-emerald-300 font-semibold border border-slate-700'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: Balance, Notifications & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Investor Cash Balance Badge (Investor role only) */}
            {currentRole === 'foreign_investor' && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">Cash:</span>
                <span className="font-mono font-semibold text-slate-100">
                  {formatVND(availableCashVND)}
                </span>
              </div>
            )}

            {/* How It Works Button */}
            <button
              id="btn-nav-how-it-works"
              onClick={() => navigateTo('how_it_works')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              title="View 11-Stage Operational Process"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>How It Works</span>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                id="btn-notification-bell"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-slate-900" />
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {isNotificationsOpen && (
                <div
                  id="notifications-dropdown"
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200">
                        Institutional Notifications
                      </span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-slate-400 hover:text-slate-200"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications in queue
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 text-xs transition-colors hover:bg-slate-800/50 cursor-pointer ${
                            notif.read ? 'opacity-70' : 'bg-slate-800/30'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {notif.type === 'success' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : notif.type === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            ) : notif.type === 'alert' ? (
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            ) : (
                              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="font-medium text-slate-200 truncate">
                                  {notif.title}
                                </span>
                                <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                                  {notif.timestamp}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-snug">
                                {notif.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher in Top Navigation */}
            <div className="relative">
              <button
                id="role-switcher-dropdown-btn"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-all shadow-sm"
              >
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                      Role:
                    </span>
                    <span className="font-semibold text-slate-100">
                      {roleConfigs[currentRole].label}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    {roleConfigs[currentRole].persona}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {/* Role Switcher Menu */}
              {isRoleDropdownOpen && (
                <div
                  id="role-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden py-1.5"
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-300">
                      Switch Demonstration Role
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Instantly modifies navigation, workflows and permissions.
                    </p>
                  </div>

                  {(['foreign_investor', 'custodian', 'compliance_officer', 'regulatory_observer'] as UserRole[]).map(
                    roleKey => {
                      const conf = roleConfigs[roleKey];
                      const isSelected = currentRole === roleKey;
                      return (
                        <button
                          key={roleKey}
                          id={`role-option-${roleKey}`}
                          onClick={() => {
                            setCurrentRole(roleKey);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 text-left text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                            isSelected ? 'bg-slate-800/60 font-medium' : ''
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-100 font-semibold">{conf.label}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${conf.color}`}
                              >
                                {conf.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">{conf.persona}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-800 grid grid-cols-2 gap-1.5">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-slate-800 text-emerald-300 font-semibold border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
