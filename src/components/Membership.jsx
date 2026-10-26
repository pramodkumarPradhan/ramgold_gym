import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';

export default function Membership({ onSelectPlan, onOpenCheckout }) {
  const handleCheckout = (plan) => {
    if (onOpenCheckout) {
      onOpenCheckout(plan.title);
      return;
    }
    handleEnquire(plan);
  };

  const handleEnquire = (plan) => {
    if (onSelectPlan) {
      onSelectPlan(plan.title);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="membership" className="py-20 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-2">
            INVEST IN YOURSELF
          </span>
          <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
            CHOOSE YOUR COMMITMENT.
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg font-medium">
            Transparent tier structures tailored for elite standards. No hidden sign-up fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {GYM_CONFIG.membershipPlans.map((plan) => {
            const isBestValue = plan.isBestValue;
            const isPopular = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`bg-[#081E30] text-white p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${
                  isBestValue || isPopular
                    ? 'border-2 border-[#25BDF2] shadow-2xl scale-[1.02] md:scale-105 z-10 shadow-[#25BDF2]/15'
                    : 'border border-[#102F4A] shadow-xl hover:border-[#25BDF2]/50 hover:shadow-2xl'
                }`}
              >
                {/* Best Value or Most Popular Top Tag */}
                {(isBestValue || isPopular) && (
                  <div className="absolute -top-3.5 right-6 bg-[#25BDF2] text-[#041626] text-[11px] px-3.5 py-1 uppercase tracking-widest font-black shadow-lg flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{plan.bestValueBadge || (isPopular ? 'MOST POPULAR' : 'RECOMMENDED')}</span>
                  </div>
                )}

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-2">
                    {plan.badge}
                  </span>
                  <h3 className="font-headline-md text-3xl sm:text-4xl uppercase text-white mb-4">
                    {plan.title}
                  </h3>

                  <div className="mb-7 pb-6 border-b border-[#102F4A]">
                    <span className="font-headline-lg text-4xl sm:text-5xl text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 text-sm font-semibold"> {plan.period}</span>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-slate-300 text-sm font-medium">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-[#25BDF2] mr-3 flex-shrink-0 stroke-[2.5]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => handleCheckout(plan)}
                    className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] py-3.5 font-black text-xs uppercase tracking-wider text-center transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#25BDF2]/30 active:scale-[0.99] flex items-center justify-center space-x-1.5"
                  >
                    <span>JOIN & PAY ONLINE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEnquire(plan)}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-white mt-2 font-medium underline transition-colors"
                  >
                    Or enquire via WhatsApp / Concierge
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
