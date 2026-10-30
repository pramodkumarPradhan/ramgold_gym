import React from 'react';
import { GYM_CONFIG } from '../config/gymConfig';
import SafeImage from './SafeImage';
import { ArrowRight } from 'lucide-react';

export default function Facilities() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="facilities" className="py-20 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-5 h-[2px] bg-[#25BDF2]" />
              <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-black block">
                WORLD-CLASS INFRASTRUCTURE • 15,000 SQ FT
              </span>
            </div>
            <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              EXPERIENCE THE ARENA.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-md flex flex-col items-start md:items-end">
            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed md:text-right">
              Meticulously curated training zones engineered without compromise for pure athletic progression in Balasore.
            </p>
          </div>
        </div>

        {/* Facilities Bento Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GYM_CONFIG.facilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => scrollTo('membership')}
              className={`${facility.colSpan} relative group overflow-hidden bg-[#081E30] h-[360px] sm:h-[400px] border border-[#102F4A] hover:border-[#25BDF2] shadow-xl hover:shadow-[0_20px_50px_rgba(37,189,242,0.2)] rounded-none transition-all duration-500 hover:-translate-y-1.5 cursor-pointer`}
            >
              {/* Top Cyan Accent Laser Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#25BDF2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-[0_0_10px_#25BDF2]" />

              {/* Background Facility Image */}
              <div className="absolute inset-0 overflow-hidden">
                <SafeImage
                  src={facility.image}
                  fallbackSrc={facility.fallbackImage}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-85"
                />
              </div>

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-[#041626]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#041626]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top Right Zone Hotspot Indicator */}
              <div className="absolute top-5 right-5 z-20 opacity-75 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#25BDF2] bg-[#041626]/90 border border-[#25BDF2]/40 px-2.5 py-1">
                  RAMGOLD ARENA
                </span>
              </div>

              {/* Zone Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <span className="text-xs text-[#25BDF2] uppercase tracking-widest mb-1.5 font-black block font-mono">
                  {facility.badge}
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl text-white uppercase mb-2 group-hover:text-[#25BDF2] transition-colors">
                  {facility.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                  {facility.description}
                </p>

                {/* Hover Reveal Action */}
                <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:text-[#25BDF2] transition-colors pt-1">
                  <span>VIEW MEMBERSHIP PLANS</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
