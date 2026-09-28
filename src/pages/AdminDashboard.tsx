import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import {
  Users,
  Building2,
  CalendarCheck,
  Clock,
  DollarSign,
  ShieldCheck,
  Star,
  Sparkles,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    providers,
    quotes,
    bookings,
    approveProvider,
    toggleProviderFeatured,
    toggleProviderVerified,
    navigateToProvider,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'approvals' | 'providers' | 'categories' | 'bookings' | 'reviews'>('approvals');
  const [searchTerm, setSearchTerm] = useState('');

  // Pending provider registrations
  const pendingApprovals = providers.filter(p => !p.approved);

  // Financial calculations
  const totalGMV = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0) + 74800; // Realistic platform baseline
  const estimatedCommission = Math.round(totalGMV * 0.05);

  const filteredProviders = providers.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title */}
      <div className="bg-[#24131C] text-white p-6 sm:p-8 rounded-2xl border border-[#3B2230] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Marketplace Operations & Quality Control</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            EventEase Central Administration
          </h1>
          <p className="text-xs text-[#C8B8C2]">
            Monitor platform bookings, approve vendor applications, and govern quality standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Central TX System Normal
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#7C6866] mb-1">
            <span>Total Customers</span>
            <Users className="w-3.5 h-3.5 text-[#8F2556]" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#241C1D] tabular-nums font-mono block">
            2,480
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">+14% this month</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#7C6866] mb-1">
            <span>Total Providers</span>
            <Building2 className="w-3.5 h-3.5 text-[#8F2556]" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#241C1D] tabular-nums font-mono block">
            {providers.length}
          </span>
          <span className="text-[10px] text-[#7C6866] font-medium">{pendingApprovals.length} pending review</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#7C6866] mb-1">
            <span>Pending Approvals</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <span className={`font-serif text-xl sm:text-2xl font-bold tabular-nums font-mono block ${
            pendingApprovals.length > 0 ? 'text-amber-700 font-bold' : 'text-[#241C1D]'
          }`}>
            {pendingApprovals.length}
          </span>
          <span className="text-[10px] text-amber-700 font-semibold">Requires action</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#7C6866] mb-1">
            <span>Total Bookings</span>
            <CalendarCheck className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#241C1D] tabular-nums font-mono block">
            {bookings.length + 184}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">98.4% fulfillment</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#7C6866] mb-1">
            <span>Quote Requests</span>
            <FileText className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#241C1D] tabular-nums font-mono block">
            {quotes.length + 310}
          </span>
          <span className="text-[10px] text-[#7C6866] font-medium">Avg response &lt;2h</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7DCce] shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#7C6866] mb-1">
            <span>Gross Platform GMV</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#4A0E2E] tabular-nums font-mono block">
            ${totalGMV.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">Comm: ${estimatedCommission.toLocaleString()}</span>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DFCFC0] overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'approvals'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>
            Pending Provider Approvals ({pendingApprovals.length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('providers')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'providers'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Manage All Providers ({providers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'categories'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Service Categories ({CATEGORIES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-[#4A0E2E] text-[#4A0E2E]'
              : 'border-transparent text-[#7C6866] hover:text-[#241C1D]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Revenue & Bookings Ledger</span>
        </button>
      </div>

      {/* TAB CONTENT: Approvals Queue */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
              Vendor Quality & Approval Queue ({pendingApprovals.length})
            </h3>
            <span className="text-xs text-[#7C6866]">
              Review applicant portfolios and authenticate credentials before making them discoverable.
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#DFCFC0] text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-[#241C1D]">Queue Clear</h4>
              <p className="text-xs text-[#7C6866]">
                All registered provider listings are currently reviewed and approved.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map(applicant => (
                <div
                  key={applicant.id}
                  className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-[#F3ECE2]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          New Listing Request
                        </span>
                        <span className="text-xs font-mono text-[#8A7978]">{applicant.id}</span>
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-[#241C1D] mt-1">
                        {applicant.name}
                      </h4>
                      <p className="text-xs text-[#7C6866]">
                        Owner: {applicant.ownerName} · Category: <strong className="text-[#4A0E2E]">{applicant.categoryName}</strong> · Location: {applicant.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-[#8A7978] block">Proposed Starting Rate</span>
                      <span className="text-xl font-bold text-[#4A0E2E] tabular-nums font-mono">
                        ${applicant.startingPrice}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-[#4A3E3D] space-y-1">
                    <span className="text-[#8A7978] font-semibold block">Applicant Bio:</span>
                    <p className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DCce] leading-relaxed">
                      {applicant.about}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#5C4A48]">
                    <div>
                      <span className="text-[#8A7978] block">Phone:</span>
                      <span className="font-medium text-[#241C1D]">{applicant.phone}</span>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Email:</span>
                      <span className="font-medium text-[#241C1D]">{applicant.email}</span>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Experience:</span>
                      <span className="font-medium text-[#241C1D]">{applicant.yearsExperience} Years</span>
                    </div>
                    <div>
                      <span className="text-[#8A7978] block">Plan Selected:</span>
                      <span className="font-medium uppercase text-[#8F2556]">{applicant.plan}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3ECE2]">
                    <button
                      onClick={() => approveProvider(applicant.id, false)}
                      className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => approveProvider(applicant.id, true)}
                      className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish Listing</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Manage Providers */}
      {activeTab === 'providers' && (
        <div className="bg-white rounded-2xl border border-[#E7DCce] shadow-xs overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
              All Event Service Providers ({filteredProviders.length})
            </h3>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8A7978] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search provider, owner, category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#DFCFC0] rounded-xl focus:outline-hidden"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#8A7978] uppercase text-[10px] tracking-wider border-y border-[#E7DCce]">
                <tr>
                  <th className="py-3 px-4">Provider / Owner</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Rating / Reviews</th>
                  <th className="py-3 px-3">Starting Rate</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Featured</th>
                  <th className="py-3 px-3">Verified</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3ECE2] text-[#4A3E3D]">
                {filteredProviders.map(p => (
                  <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#241C1D]">{p.name}</div>
                      <div className="text-[11px] text-[#7C6866]">{p.ownerName} · {p.city}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-[#FAF5F0] border border-[#EBE1D4] px-2 py-0.5 rounded text-[11px]">
                        {p.categoryName}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold tabular-nums text-[#241C1D]">★ {p.rating}</span>
                      <span className="text-[#8A7978] ml-1">({p.reviewCount})</span>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold tabular-nums text-[#4A0E2E]">
                      ${p.startingPrice}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {p.approved ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleProviderFeatured(p.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                          p.isFeatured
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {p.isFeatured ? '★ Featured' : 'Normal'}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleProviderVerified(p.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                          p.isVerified
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {p.isVerified ? '✓ Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => navigateToProvider(p.id)}
                        className="text-[#8F2556] hover:underline font-semibold cursor-pointer"
                      >
                        View Listing
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Categories */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl border border-[#E7DCce] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
              Manage Marketplace Categories ({CATEGORIES.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map(cat => {
              const liveCount = providers.filter(p => p.category === cat.id && p.approved).length;
              return (
                <div
                  key={cat.id}
                  className="p-4 bg-[#FAF7F2] rounded-xl border border-[#DFCFC0] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-[#241C1D]">{cat.name}</h4>
                    <p className="text-xs text-[#7C6866]">{cat.tagline}</p>
                    <div className="text-[11px] text-[#5C4A48] pt-1">
                      Min Rate: <strong>${cat.startingPrice}</strong> · Specializations: {cat.popularStyles.join(', ')}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-[#4A0E2E] tabular-nums font-mono block">
                      {liveCount}
                    </span>
                    <span className="text-[10px] text-[#8A7978]">Live Pros</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Bookings Ledger */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-[#E7DCce] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3B0D21]">
                Financial Transactions & Commission Ledger
              </h3>
              <p className="text-xs text-[#7C6866]">
                Automatic fee calculation based on vendor subscription plan and booking confirmation.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              Platform Net: ${estimatedCommission.toLocaleString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#8A7978] uppercase text-[10px] tracking-wider border-y border-[#E7DCce]">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Provider</th>
                  <th className="py-3 px-3">Event Date</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-3">Platform Comm (5%)</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3ECE2] text-[#4A3E3D]">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-[#FAF7F2]/60">
                    <td className="py-3 px-4 font-mono font-bold text-[#241C1D]">{b.id}</td>
                    <td className="py-3 px-3">{b.customerName}</td>
                    <td className="py-3 px-3 font-semibold text-[#4A0E2E]">{b.providerName}</td>
                    <td className="py-3 px-3">{b.eventDate}</td>
                    <td className="py-3 px-3 font-mono font-bold tabular-nums">${b.totalAmount}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700 tabular-nums">
                      ${Math.round(b.totalAmount * 0.05)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
