import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatVND } from '../../data/mockData';
import {
  Search,
  Filter,
  CheckCircle2,
  Building2,
  LayoutGrid,
  List,
  Star,
  ArrowRight,
  TrendingUp,
  Percent,
  ShieldCheck,
  Coins
} from 'lucide-react';

export const MarketDashboard: React.FC = () => {
  const { products, navigateTo, watchlist, toggleWatchlist } = useApp();

  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedFOL, setSelectedFOL] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'price_desc' | 'fol_desc' | 'yield_desc'>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const sectors = ['ALL', 'Consumer Goods', 'Technology', 'Industrial Manufacturing', 'Banking & Finance', 'Retail & Distribution'];

  const filteredProducts = products
    .filter(prod => {
      if (selectedSector !== 'ALL' && prod.sector !== selectedSector) return false;
      if (selectedFOL === 'FULL' && prod.foreignOwnershipLimit < 100) return false;
      if (selectedFOL === 'APPROACHING' && prod.foreignOwnershipLimit >= 100) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          prod.name.toLowerCase().includes(term) ||
          prod.code.toLowerCase().includes(term) ||
          prod.underlyingTicker.toLowerCase().includes(term) ||
          prod.sector.toLowerCase().includes(term)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_desc') return b.referencePriceVND - a.referencePriceVND;
      if (sortBy === 'fol_desc') return b.foreignOwnershipLimit - a.foreignOwnershipLimit;
      if (sortBy === 'yield_desc') return b.dividendYieldPercent - a.dividendYieldPercent;
      return a.name.localeCompare(b.name);
    });

  return (
    <div id="marketplace-root" className="space-y-6 py-4">
      {/* Header & Subhead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Exposure Catalog
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              6 LISTED INSTRUMENTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Vietnamese Equity Exposure Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse non-voting digital receipts linked to Vietnamese companies affected by statutory Foreign Ownership Limits (FOL).
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'table' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by receipt code, company name, or HOSE ticker..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
            />
          </div>

          {/* Sector Filter */}
          <div>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {sectors.map(sec => (
                <option key={sec} value={sec}>
                  {sec === 'ALL' ? 'All Sectors' : sec}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="name">Sort by Company Name</option>
              <option value="price_desc">Highest Reference Price</option>
              <option value="fol_desc">Highest FOL Utilization</option>
              <option value="yield_desc">Highest Dividend Yield</option>
            </select>
          </div>
        </div>

        {/* Quick FOL status pill buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 text-[11px] font-mono mr-1">FOL Status:</span>
          <button
            onClick={() => setSelectedFOL('ALL')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              selectedFOL === 'ALL'
                ? 'bg-slate-800 text-emerald-300 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Instruments
          </button>
          <button
            onClick={() => setSelectedFOL('FULL')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              selectedFOL === 'FULL'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            100% FOL Reached (Room Exhausted)
          </button>
          <button
            onClick={() => setSelectedFOL('APPROACHING')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              selectedFOL === 'APPROACHING'
                ? 'bg-blue-950/80 text-blue-300 border border-blue-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Near FOL Cap (90–99%)
          </button>
        </div>
      </div>

      {/* Products Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map(product => {
            const isWatchlisted = watchlist.includes(product.code);
            return (
              <div
                key={product.code}
                id={`card-product-${product.code}`}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div>
                  {/* Top Bar with Code, Sector & Watchlist */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-emerald-400">
                          {product.code}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          HOSE: {product.underlyingTicker}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1 group-hover:text-emerald-300 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">{product.sector}</p>
                    </div>

                    <button
                      onClick={() => toggleWatchlist(product.code)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isWatchlisted
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                      title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Price & FOL Gauge */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Reference Price</span>
                      <span className="text-lg font-bold text-white font-mono">
                        {formatVND(product.referencePriceVND)}
                      </span>
                    </div>

                    {/* FOL Meter */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Foreign Ownership Room</span>
                        <span className="font-mono font-semibold text-amber-400">
                          {product.foreignOwnershipLimit}% Utilized
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${product.foreignOwnershipLimit}%` }}
                        />
                      </div>
                    </div>

                    {/* Custody Backing & Availability */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono">
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <span className="text-slate-500 block text-[10px]">CUSTODY BACKING</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          100.0%
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <span className="text-slate-500 block text-[10px]">AVAILABLE RECEIPTS</span>
                        <span className="text-slate-200 font-bold mt-0.5">
                          {product.availableReceipts.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Dividend Yield */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        Historical Div. Yield:
                      </span>
                      <span className="font-mono font-semibold text-slate-200">
                        {product.dividendYieldPercent}% p.a.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => navigateTo('product_detail', product.code)}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors text-center"
                  >
                    Details & Audit
                  </button>
                  <button
                    onClick={() => navigateTo('transaction', product.code)}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Acquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Receipt</th>
                <th className="p-4">Company Name</th>
                <th className="p-4">Sector</th>
                <th className="p-4">FOL Utilized</th>
                <th className="p-4 text-right">Reference Price</th>
                <th className="p-4 text-right">Available Receipts</th>
                <th className="p-4 text-right">Div. Yield</th>
                <th className="p-4 text-center">Backing</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map(prod => (
                <tr key={prod.code} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-emerald-400">{prod.code}</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-100">{prod.name}</div>
                    <span className="text-[10px] text-slate-500 font-mono">HOSE: {prod.underlyingTicker}</span>
                  </td>
                  <td className="p-4 text-slate-400">{prod.sector}</td>
                  <td className="p-4">
                    <span className="font-mono text-amber-300 font-semibold">
                      {prod.foreignOwnershipLimit}%
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-slate-100">
                    {formatVND(prod.referencePriceVND)}
                  </td>
                  <td className="p-4 text-right font-mono text-slate-300">
                    {prod.availableReceipts.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-mono text-slate-300">
                    {prod.dividendYieldPercent}%
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      100%
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => navigateTo('product_detail', prod.code)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigateTo('transaction', prod.code)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold"
                    >
                      Acquire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
