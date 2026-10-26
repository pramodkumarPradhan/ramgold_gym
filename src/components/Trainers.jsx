import React from 'react';
import { GYM_CONFIG } from '../config/gymConfig';
import SafeImage from './SafeImage';

export default function Trainers() {
  return (
    <section id="trainers" className="py-20 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-2">
            EXPERT MENTORSHIP
          </span>
          <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
            GUIDANCE THAT MOVES YOU FORWARD.
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg font-medium">
            Train under elite professionals with proven championship pedigree and science-driven methodology.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GYM_CONFIG.trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="bg-[#081E30] border border-[#102F4A] shadow-xl group overflow-hidden hover:border-[#25BDF2]/70 transition-all duration-300"
            >
              {/* Trainer Portrait */}
              <div className="h-[380px] sm:h-[420px] overflow-hidden bg-[#041626] relative">
                <SafeImage
                  src={trainer.image}
                  fallbackSrc={trainer.fallbackImage}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081E30] via-transparent to-transparent opacity-80" />
              </div>

              {/* Trainer Details */}
              <div className="p-6 sm:p-7">
                <span className="text-xs text-[#25BDF2] uppercase tracking-widest mb-1.5 block font-bold">
                  {trainer.title}
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl text-white uppercase mb-2">
                  {trainer.name}
                </h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  {trainer.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
