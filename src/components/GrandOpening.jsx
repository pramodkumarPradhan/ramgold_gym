import React from 'react';
import { GYM_CONFIG } from '../config/gymConfig';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function GrandOpening({ onClaimFounding }) {
  const handleClick = () => {
    if (onClaimFounding) {
      onClaimFounding("Founding Member Rate");
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="grand-opening" className="py-20 md:py-28 relative z-10 overflow-hidden bg-transparent text-white border-t border-[#081E30]">
      {/* Background with moody texture */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 scale-105"
        style={{
          backgroundImage: `url('/images/hero-gym.jpg')`
        }}
        aria-hidden="true"
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041626] via-[#041626]/90 to-[#041626] z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626] z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center py-6 sm:py-10">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#25BDF2] bg-[#081E30] border border-[#25BDF2]/40 px-4 py-2 mb-6 font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-[#25BDF2]" />
          <span>ବାଲେଶ୍ୱରରେ ଖୁବ୍ ଶୀଘ୍ର ଶୁଭାରମ୍ଭ • COMING SOON TO BALASORE</span>
        </div>

        <h2 className="font-headline-xl text-4xl sm:text-6xl md:text-7xl text-white uppercase mb-4 tracking-tight leading-none">
          YOUR NEW TRAINING GROUND IS <span className="text-[#25BDF2]">ALMOST HERE.</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#25BDF2] font-semibold mb-6">
          ବାଲେଶ୍ୱରର ଯୁବପିଢ଼ିଙ୍କ ପାଇଁ ପ୍ରିମିୟମ ଫିଟନେସ ସେଣ୍ଟର । ପ୍ରଥମ ୧୫୦ ଜଣଙ୍କ ପାଇଁ ସ୍ୱତନ୍ତ୍ର ଫାଉଣ୍ଡିଂ ରିହାତି!
        </p>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Founding memberships strictly limited to the first {GYM_CONFIG.brand.foundingSlots} applicants in Balasore. Secure your priority access & lock in exclusive founding privileges.
        </p>

        <button
          onClick={handleClick}
          className="inline-flex items-center space-x-2 bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] px-10 py-5 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-[#25BDF2]/40 hover:scale-105 active:scale-95"
        >
          <span>CLAIM FOUNDING STATUS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
