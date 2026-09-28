import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, ShieldCheck, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export const ProviderPricingPage: React.FC = () => {
  const { setCurrentPage, showToast, userRole, setUserRole } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      target: 'For newly launching local event artisans',
      priceMonthly: 0,
      priceAnnual: 0,
      commission: '5% commission on confirmed bookings',
      badge: 'Zero Upfront Cost',
      features: [
        'Standard profile listing & photo gallery',
        'Receive up to 10 customer quote inquiries / month',
        'Standard search catalog placement',
        'Direct in-app messaging with event hosts',
        'Standard email notifications',
        'Basic review collection & star rating'
      ],
      ctaText: 'Start for Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Partner',
      target: 'For established event vendors scaling inquiries',
      priceMonthly: 29,
      priceAnnual: 24,
      commission: 'Reduced 2.5% platform commission',
      badge: 'Most Popular',
      features: [
        'Everything in Starter, plus:',
        'Priority search ranking in your primary category',
        'Unlimited monthly quote inquiries & lead requests',
        'Verified Partner Badge on profile and search cards',
        'Direct phone number and contact display to clients',
        'Advanced booking analytics & conversion metrics',
        'SMS inquiry alerts for instant response'
      ],
      ctaText: 'Upgrade to Pro',
      popular: true
    },
    {
      id: 'premium',
      name: 'Elite Studio',
      target: 'For luxury agencies & high-volume event teams',
      priceMonthly: 69,
      priceAnnual: 55,
      commission: '0% commission (Keep 100% of your earnings)',
      badge: 'Maximum Visibility',
      features: [
        'Everything in Pro, plus:',
        'Guaranteed top placement in Featured Providers carousel',
        '0% platform commission on all booked events',
        'Gold Verified Seal & "Top Choice" spotlight',
        'Custom video showreel & unlimited portfolio upload',
        'Dedicated EventEase account manager',
        'Exclusive corporate and high-budget bridal lead routing'
      ],
      ctaText: 'Get Elite Visibility',
      popular: false
    }
  ];

  const handleSelectPlan = (planName: string) => {
    showToast(`Selected ${planName} Plan! Simulation tier activated.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2F5] text-[#8F2556] text-xs font-semibold border border-[#FBCFE8]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Transparent Provider Monetization</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B0D21] tracking-tight">
          Simple Plans for Local Event Professionals
        </h1>
        <p className="text-sm sm:text-base text-[#6B5A58] leading-relaxed">
          Choose how you want to grow. Start completely free with zero monthly charges, or supercharge your bookings with Pro search placement and zero commissions.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-[#3B0D21]' : 'text-[#7C6866]'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-[#E7DCce] rounded-full p-1 transition-colors relative cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#4A0E2E] shadow-sm transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold ${billingCycle === 'annual' ? 'text-[#3B0D21]' : 'text-[#7C6866]'}`}>
            Annual Billing
          </span>
          <span className="text-[11px] font-bold text-[#8F2556] bg-[#FAF2F5] border border-[#FBCFE8] px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(plan => {
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-8 border flex flex-col justify-between space-y-8 relative transition-all ${
                plan.popular
                  ? 'border-[#8F2556] shadow-xl ring-2 ring-[#8F2556]/20'
                  : 'border-[#E7DCce] shadow-xs'
              }`}
            >
              <div className="space-y-6">
                <div>
                  <span className={`inline-block px-2.5 py-1 text-[11px] font-bold rounded-md mb-3 ${
                    plan.popular ? 'bg-[#FAF2F5] text-[#8F2556]' : 'bg-[#FAF7F2] text-[#7C6866]'
                  }`}>
                    {plan.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#241C1D]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#7C6866] mt-1">
                    {plan.target}
                  </p>
                </div>

                <div className="pb-4 border-b border-[#F3ECE2]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-[#4A0E2E] tabular-nums font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-[#8A7978]">/ month</span>
                  </div>
                  <span className="text-[11px] text-[#8F2556] font-semibold mt-1 block">
                    {plan.commission}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-[#4A3E3D]">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                    plan.popular
                      ? 'bg-[#4A0E2E] hover:bg-[#380922] text-white shadow-md'
                      : 'bg-[#F5EDE4] hover:bg-[#EFE3D6] text-[#4A0E2E]'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Models Explanation */}
      <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#DFCFC0] space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8F2556]">
            Platform Economics
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0D21] mt-1">
            How EventEase Generates Sustainable Value
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5A58] mt-2 leading-relaxed">
            Our multi-tier marketplace aligns incentives: providers only pay small commissions on actual confirmed business, or subscribe to Pro features for top placement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-5 bg-white rounded-2xl border border-[#E7DCce] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF2F5] text-[#8F2556] flex items-center justify-center font-serif font-bold text-sm">
              01
            </div>
            <h4 className="text-sm font-bold text-[#241C1D]">Featured Placements</h4>
            <p className="text-xs text-[#5C4A48] leading-relaxed">
              Top event stylists and photographers can sponsor their card to appear in first row search positions and the hero carousel.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E7DCce] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF2F5] text-[#8F2556] flex items-center justify-center font-serif font-bold text-sm">
              02
            </div>
            <h4 className="text-sm font-bold text-[#241C1D]">Pay-Per-Booking Commission</h4>
            <p className="text-xs text-[#5C4A48] leading-relaxed">
              Zero upfront fees for starters. A modest 2.5% to 5% commission applies strictly when a customer deposits and confirms a booking.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E7DCce] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF2F5] text-[#8F2556] flex items-center justify-center font-serif font-bold text-sm">
              03
            </div>
            <h4 className="text-sm font-bold text-[#241C1D]">Pro Subscriptions</h4>
            <p className="text-xs text-[#5C4A48] leading-relaxed">
              Monthly Pro ($29/mo) and Elite ($69/mo) subscriptions unlocking direct customer contact numbers, verified badges, and 0% commission.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
