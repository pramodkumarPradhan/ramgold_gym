import React from 'react';
import { GYM_CONFIG } from '../config/gymConfig';
import SafeImage from './SafeImage';

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
              WORLD-CLASS INFRASTRUCTURE
            </span>
            <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
              BUILT FOR EVERY REP.
            </h2>
          </div>
          <p className="text-slate-300 max-w-md mt-4 md:mt-0 text-sm sm:text-base font-medium">
            Meticulously curated training zones engineered without compromise for pure athletic progression.
          </p>
        </div>

        {/* Facilities Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GYM_CONFIG.facilities.map((facility) => (
            <div
              key={facility.id}
              className={`${facility.colSpan} relative group overflow-hidden bg-[#081E30] h-[360px] sm:h-[390px] border border-[#102F4A] shadow-xl rounded-none transition-all duration-300 hover:border-primary/60`}
            >
              {/* Background Facility Image */}
              <div className="absolute inset-0 overflow-hidden">
                <SafeImage
                  src={facility.image}
                  fallbackSrc={facility.fallbackImage}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-75 group-hover:opacity-90"
                />
              </div>

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-[#041626]/60 to-transparent" />

              {/* Zone Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <span className="text-xs text-primary uppercase tracking-widest mb-1.5 font-bold block">
                  {facility.badge}
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl text-white uppercase mb-2">
                  {facility.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base line-clamp-2">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
