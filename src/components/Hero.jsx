import React from 'react';
import { GYM_CONFIG } from '../config/gymConfig';
import { ArrowRight, Clock, Dumbbell, Users, UserCheck, Leaf } from 'lucide-react';
import SafeImage from './SafeImage';

export default function Hero({ onExploreClick, onDiscoverClick, onStartJourney }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featureCards = [
    {
      id: "strength-training",
      title: "Strength Training",
      description: "Premium equipment for serious progress.",
      image: "/images/card-strength.jpg",
      icon: Dumbbell,
      targetSection: "facilities"
    },
    {
      id: "personal-coaching",
      title: "Personal Coaching",
      description: "Expert trainers to guide your journey.",
      image: "/images/card-coaching.jpg",
      icon: UserCheck,
      targetSection: "trainers"
    },
    {
      id: "recovery-zone",
      title: "Recovery Zone",
      description: "Rest. Recover. Come back stronger.",
      image: "/images/card-recovery.jpg",
      icon: Leaf,
      targetSection: "facilities"
    }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-transparent text-white"
    >
      {/* Subtle Technical Dot Matrix Texture */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#25BDF2 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
        aria-hidden="true"
      />

      {/* Desktop Split Layout: Right-side Realistic Gym Interior with Slanted Diagonal Edge */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[56%] z-0 overflow-hidden pointer-events-none">
        {/* Slanted Gym Photo Container */}
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 1% 100%)'
          }}
        >
          <img
            src="/images/hero-gym.jpg"
            alt="RAMGOLD GYM high-performance training floor"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Gradients to blend photo seamlessly with dark navy canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041626]/90 via-[#041626]/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626]/50" />
        </div>
      </div>

      {/* Mobile/Tablet Atmospheric Background (Full Screen Underlay) */}
      <div className="lg:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-gym.jpg"
          alt="RAMGOLD GYM Interior"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-[#041626]/90 to-[#041626]/75" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          {/* Pre-heading Tracked Subtitle with Cyan Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-3 animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-[2.5px] bg-[#25BDF2]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#25BDF2] font-extrabold select-none">
                STRENGTH &nbsp;/&nbsp; DISCIPLINE &nbsp;/&nbsp; RESULTS
              </span>
            </div>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-semibold tracking-wide bg-[#081E30] px-2.5 py-0.5 border border-[#25BDF2]/30">
              📍 ବାଲେଶ୍ୱର • BALASORE
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-headline-xl text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] text-white tracking-tight uppercase leading-[0.95] mb-5 select-none drop-shadow-md">
            TRAIN HARDER.
            <br />
            <span className="inline-block bg-[#25BDF2] text-[#041626] px-3 sm:px-4 py-0.5 sm:py-1 mt-2 font-black shadow-2xl">
              BECOME MORE.
            </span>
          </h1>

          {/* Supporting Paragraph Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-3 max-w-xl">
            High-performance training for a stronger, healthier and more disciplined you. World-class equipment, expert guidance and a community that pushes you forward.
          </p>

          {/* Odia Welcome Line */}
          <p className="text-xs sm:text-sm text-[#25BDF2] font-semibold tracking-wide mb-7 max-w-xl">
            “ବାଲେଶ୍ୱରର ସର୍ବୋତ୍ତମ ଓ ଆଧୁନିକ ଫିଟନେସ ସେଣ୍ଟର — ଆଜି ହିଁ ଯୋଡ଼ି ହୁଅନ୍ତୁ।”
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-7 lg:mb-8 w-full sm:w-auto">
            <button
              onClick={() => (onStartJourney ? onStartJourney() : scrollTo('membership'))}
              className="bg-[#25BDF2] hover:bg-[#1DA3D2] active:scale-[0.98] text-[#041626] px-7 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-[#25BDF2]/40 flex items-center justify-center space-x-2 group"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo('about')}
              className="border border-white/70 hover:border-[#25BDF2] hover:bg-white/5 active:scale-[0.98] text-white px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center"
            >
              <span>EXPLORE THE GYM</span>
            </button>
          </div>

          {/* Gym Highlights Bar (5 AM – 11 PM ACCESS, ELITE EQUIPMENT, ALL LEVELS WELCOME) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 pt-3 pb-2 border-t border-[#081E30]/90">
            {/* 5 AM - 11 PM Access */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border border-[#25BDF2]/40 bg-[#081E30]/60 flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/10 transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-inter">
                <div className="text-white font-black text-sm sm:text-base tracking-wide leading-none mb-1">
                  5 AM – 11 PM
                </div>
                <div className="text-slate-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                  DAILY ACCESS
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#081E30]" />

            {/* Elite Equipment */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border border-[#25BDF2]/40 bg-[#081E30]/60 flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/10 transition-colors">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="font-inter">
                <div className="text-white font-black text-sm sm:text-base tracking-wide leading-none mb-1">
                  ELITE
                </div>
                <div className="text-slate-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                  EQUIPMENT
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#081E30]" />

            {/* All Levels Welcome */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border border-[#25BDF2]/40 bg-[#081E30]/60 flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/10 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-inter">
                <div className="text-white font-black text-sm sm:text-base tracking-wide leading-none mb-1">
                  ALL LEVELS
                </div>
                <div className="text-slate-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                  WELCOME
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section (Below Hero, matching reference design) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full mt-6 lg:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => scrollTo(card.targetSection)}
                className="group relative bg-[#081E30]/90 hover:bg-[#081E30] border border-[#102F4A] hover:border-[#25BDF2]/70 transition-all duration-300 p-5 sm:p-6 overflow-hidden cursor-pointer shadow-xl hover:shadow-[#25BDF2]/10 flex flex-col justify-between min-h-[140px]"
              >
                {/* Embedded Right Gym Image with Smooth Dark Fade */}
                <div className="absolute right-0 top-0 bottom-0 w-[48%] overflow-hidden pointer-events-none">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Smooth horizontal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#081E30] via-[#081E30]/60 to-transparent" />
                  <div className="absolute inset-0 bg-[#041626]/20" />
                </div>

                {/* Card Content (Left) */}
                <div className="relative z-10 max-w-[62%]">
                  <div className="w-10 h-10 rounded-full bg-[#041626]/80 border border-[#25BDF2]/40 flex items-center justify-center text-[#25BDF2] mb-3 group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/15 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-inter font-bold text-base sm:text-lg mb-1 group-hover:text-[#25BDF2] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 font-inter text-xs sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Right Arrow Indicator */}
                <div className="absolute bottom-4 right-4 z-10 text-white/70 group-hover:text-[#25BDF2] group-hover:translate-x-1.5 transition-all duration-200">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
