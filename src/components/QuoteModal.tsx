import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventType } from '../types';
import { EVENT_TYPES } from '../data/mockData';
import { X, CheckCircle, Calendar, Users, MapPin, DollarSign, Sparkles } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { quoteModalTargetProvider, closeQuoteModal, addQuote, setCurrentPage } = useApp();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdQuoteId, setCreatedQuoteId] = useState<string>('');

  const [formData, setFormData] = useState({
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerPhone: '+1 (512) 555-8821',
    eventType: 'Wedding' as EventType,
    eventDate: '2026-11-28',
    location: quoteModalTargetProvider?.location || 'Austin Metro, TX',
    guestsCount: 120,
    requiredService: quoteModalTargetProvider?.services[0]?.name || 'Standard Package Consultation',
    budget: '$1,500 - $3,000',
    additionalRequirements: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!quoteModalTargetProvider) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) errs.customerName = 'Name is required';
    if (!formData.customerEmail.trim() || !formData.customerEmail.includes('@')) {
      errs.customerEmail = 'Valid email is required';
    }
    if (!formData.customerPhone.trim()) errs.customerPhone = 'Phone number is required';
    if (!formData.eventDate) errs.eventDate = 'Event date is required';
    if (!formData.location.trim()) errs.location = 'Event venue/location is required';
    if (formData.guestsCount < 1) errs.guestsCount = 'Minimum 1 guest';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = addQuote({
      providerId: quoteModalTargetProvider.id,
      providerName: quoteModalTargetProvider.name,
      providerCategory: quoteModalTargetProvider.categoryName,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      location: formData.location,
      guestsCount: Number(formData.guestsCount),
      requiredService: formData.requiredService,
      budget: formData.budget,
      additionalRequirements: formData.additionalRequirements
    });

    setCreatedQuoteId(id);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7DCce] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F3ECE2] border-b border-[#DFCFC0]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#4A0E2E]">
              {step === 'form' ? 'Request a Free Quote' : 'Quote Request Confirmed!'}
            </h3>
            <p className="text-xs text-[#6B5A58]">
              {quoteModalTargetProvider.name} · {quoteModalTargetProvider.categoryName}
            </p>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-2 text-[#7C6866] hover:text-[#4A0E2E] rounded-lg hover:bg-white/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Quick Banner */}
            <div className="flex items-center gap-2 p-3 bg-[#FDF2F4] border border-[#FBCFE8] rounded-xl text-xs text-[#8F2556]">
              <Sparkles className="w-4 h-4 shrink-0 text-[#E05282]" />
              <span>
                <strong>Zero obligation:</strong> {quoteModalTargetProvider.name} usually responds with customized availability and pricing in under 2 hours.
              </span>
            </div>

            {/* Customer Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Rachel Green"
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.customerName ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.customerName && <p className="text-[11px] text-rose-600 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="name@domain.com"
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.customerEmail ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.customerEmail && <p className="text-[11px] text-rose-600 mt-1">{errors.customerEmail}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556] ${
                    errors.customerPhone ? 'border-rose-400' : 'border-[#DFCFC0]'
                  }`}
                />
                {errors.customerPhone && <p className="text-[11px] text-rose-600 mt-1">{errors.customerPhone}</p>}
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Event Type *
                </label>
                <select
                  value={formData.eventType}
                  onChange={e => setFormData({ ...formData, eventType: e.target.value as EventType })}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
                >
                  {EVENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Event Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
                  />
                </div>
                {errors.eventDate && <p className="text-[11px] text-rose-600 mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Estimated Guests *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={formData.guestsCount}
                    onChange={e => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
                  />
                </div>
              </div>
            </div>

            {/* Location & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Venue / Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Austin Vineyard or Private Residence"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
                  />
                </div>
                {errors.location && <p className="text-[11px] text-rose-600 mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                  Required Service / Package
                </label>
                <select
                  value={formData.requiredService}
                  onChange={e => setFormData({ ...formData, requiredService: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
                >
                  {quoteModalTargetProvider.packages.map(pkg => (
                    <option key={pkg.id} value={`${pkg.name} ($${pkg.price})`}>
                      {pkg.name} (${pkg.price})
                    </option>
                  ))}
                  {quoteModalTargetProvider.services.map(s => (
                    <option key={s.name} value={`${s.name} ($${s.price})`}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                  <option value="Custom Bespoke Consultation">Custom Bespoke Consultation</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Estimated Service Budget
              </label>
              <select
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
              >
                <option value="Under $500">Under $500</option>
                <option value="$500 - $1,000">$500 - $1,000</option>
                <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                <option value="$5,000+">$5,000+ (Luxury / Full Scale)</option>
              </select>
            </div>

            {/* Additional requirements */}
            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Additional Notes or Special Requests (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.additionalRequirements}
                onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                placeholder="Share your aesthetic preferences, timeline cues, color scheme, or questions..."
                className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7DCce]">
              <button
                type="button"
                onClick={closeQuoteModal}
                className="px-4 py-2.5 text-xs font-semibold text-[#5C4A48] hover:bg-[#EFE3D6] rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Submit Quote Request
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-[#F0FDF4] text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-bold text-[#4A0E2E]">
                Inquiry Sent to {quoteModalTargetProvider.name}
              </h4>
              <p className="text-sm text-[#6B5A58] mt-2 max-w-md mx-auto">
                Your request has been logged under reference{' '}
                <span className="font-mono font-semibold text-[#4A0E2E]">{createdQuoteId}</span>.
                The provider will review your event details and respond directly via email or your Customer Dashboard.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#DFCFC0] rounded-xl max-w-md mx-auto text-left text-xs space-y-1.5 text-[#5C4A48]">
              <div className="flex justify-between">
                <span className="text-[#8A7978]">Event:</span>
                <span className="font-semibold text-[#241C1D]">{formData.eventType} · {formData.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7978]">Service:</span>
                <span className="font-semibold text-[#241C1D]">{formData.requiredService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7978]">Guests:</span>
                <span className="font-semibold text-[#241C1D]">{formData.guestsCount} guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7978]">Status:</span>
                <span className="text-amber-700 font-semibold">Pending Provider Review</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  closeQuoteModal();
                  setCurrentPage('customer-dashboard');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                View in My Bookings Hub
              </button>
              <button
                onClick={closeQuoteModal}
                className="px-5 py-2.5 text-xs font-semibold text-[#4A3E3D] bg-white border border-[#DFCFC0] hover:bg-[#F3ECE2] rounded-lg transition-colors cursor-pointer"
              >
                Keep Exploring
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
