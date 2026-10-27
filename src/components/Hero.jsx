import React, { useState, useEffect } from 'react';
import { GYM_CONFIG } from '../config/gymConfig';
import { ArrowRight, Clock, Dumbbell, Users, UserCheck, Leaf, Compass, Sparkles, Play } from 'lucide-react';
import SafeImage from './SafeImage';

export default function Hero({ onExploreClick, onDiscoverClick, onStartJourney, onOpenTour }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Handle smooth mouse parallax for 3D depth perception
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featureCards = [
    {
      id: "strength-training",
      badge: "ZONE 01",
      title: "Strength Training",
      description: "Competition power racks & calibrated plates for heavy progression.",
      image: "/images/card-strength.jpg",
      icon: Dumbbell,
      targetSection: "facilities"
    },
    {
      id: "personal-coaching",
      badge: "ZONE 02",
      title: "Personal Coaching",
      description: "Dedicated biomechanics & performance coaches to guide your journey.",
      image: "/images/card-coaching.jpg",
      icon: UserCheck,
      targetSection: "trainers"
    },
    {
      id: "recovery-zone",
      badge: "ZONE 03",
      title: "Recovery Zone",
      description: "Cryo, percussive therapy & mobility cages. Return stronger.",
      image: "/images/card-recovery.jpg",
      icon: Leaf,
      targetSection: "facilities"
    }
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-transparent text-white"
    >
      {/* 1. Cinematic 3D Arena Background with Gyro Mouse Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `scale(1.06) perspective(1000px) rotateX(${mouseOffset.y * -2.5}deg) rotateY(${mouseOffset.x * 3.5}deg)`,
            backgroundImage: `url('/images/concept-3d-environment.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%'
          }}
        />

        {/* Cinematic Atmospheric Dark Navy Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041626] via-[#041626]/85 to-[#041626]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-[#041626]/30 to-[#041626]/80" />

        {/* Volumetric Cyan Spotlight Beam */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-transform duration-500"
          style={{
            background: 'radial-gradient(circle, #25BDF2 0%, transparent 70%)',
            transform: `translate(${mouseOffset.x * 40}px, ${mouseOffset.y * 30}px)`
          }}
        />

        {/* Subtle Cyber Dust Particle Matrix */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#25BDF2 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
          aria-hidden="true"
        />
      </div>

      {/* 2. Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex-1 flex flex-col justify-center my-auto pt-4 sm:pt-6">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          {/* Floating Glassmorphic HUD Badge Card */}
          <div className="bg-[#081E30]/80 backdrop-blur-md border border-[#25BDF2]/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 sm:p-8 rounded-none relative overflow-hidden transition-all duration-300">
            {/* Top Cyan Accent Laser Line */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#25BDF2] to-transparent shadow-[0_0_15px_#25BDF2]" />

            {/* Pre-heading Tracked Subtitle with Cyan Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-[2px] bg-[#25BDF2]" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#25BDF2] font-extrabold select-none">
                  STRENGTH &nbsp;/&nbsp; DISCIPLINE &nbsp;/&nbsp; RESULTS
                </span>
              </div>
              <span className="hidden sm:inline-block text-slate-500">•</span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-semibold tracking-wide bg-[#041626]/90 px-2.5 py-0.5 border border-[#25BDF2]/30">
                📍 ବାଲେଶ୍ୱର • BALASORE
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-headline-xl text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-white tracking-tight uppercase leading-[0.93] mb-4 select-none drop-shadow-lg">
              TRAIN HARDER.
              <br />
              <span className="inline-block bg-[#25BDF2] text-[#041626] px-3.5 py-0.5 sm:py-1 mt-2 font-black shadow-2xl">
                BECOME MORE.
              </span>
            </h1>

            {/* Supporting Paragraph Description */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-3 max-w-xl">
              Forge your physique in Balasore's premier high-performance training arena. Competition-grade equipment, biomechanical optimization, and coaches that push you past your limits.
            </p>

            {/* Odia Welcome Line */}
            <p className="text-xs sm:text-sm text-[#25BDF2] font-semibold tracking-wide mb-6 max-w-xl">
              “ବାଲେଶ୍ୱରର ସର୍ବୋତ୍ତମ ଓ ଆଧୁନିକ ଫିଟନେସ ସେଣ୍ଟର — ଆଜି ହିଁ ଯୋଡ଼ି ହୁଅନ୍ତୁ।”
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6 w-full sm:w-auto">
              {/* Primary Start Journey */}
              <button
                onClick={() => (onStartJourney ? onStartJourney() : scrollTo('membership'))}
                className="bg-[#25BDF2] hover:bg-[#1DA3D2] active:scale-[0.98] text-[#041626] px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-[#25BDF2]/40 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* 3D Virtual Tour Button */}
              <button
                onClick={() => (onOpenTour ? onOpenTour() : scrollTo('facilities'))}
                className="border border-[#25BDF2]/70 bg-[#041626]/80 hover:bg-[#25BDF2]/15 hover:border-[#25BDF2] active:scale-[0.98] text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <Compass className="w-4 h-4 text-[#25BDF2] animate-spin duration-[12000ms]" />
                <span>3D VIRTUAL TOUR MODE</span>
              </button>
            </div>

            {/* Gym Highlights Bar (5 AM – 11 PM ACCESS, ELITE EQUIPMENT, ALL LEVELS WELCOME) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 pt-4 border-t border-[#102F4A]">
              {/* 5 AM - 11 PM Access */}
              <div className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-full border border-[#25BDF2]/40 bg-[#041626] flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/10 transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-black text-xs sm:text-sm tracking-wide leading-none mb-0.5">
                    5 AM – 11 PM
                  </div>
                  <div className="text-slate-400 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase">
                    DAILY ACCESS
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-[#102F4A]" />

              {/* Elite Equipment */}
              <div className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-full border border-[#25BDF2]/40 bg-[#041626] flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/10 transition-colors">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-black text-xs sm:text-sm tracking-wide leading-none mb-0.5">
                    ELITE APPARATUS
                  </div>
                  <div className="text-slate-400 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase">
                    COMPETITION GRADE
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-[#102F4A]" />

              {/* All Levels Welcome */}
              <div className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-full border border-[#25BDF2]/40 bg-[#041626] flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/10 transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-black text-xs sm:text-sm tracking-wide leading-none mb-0.5">
                    ALL LEVELS
                  </div>
                  <div className="text-slate-400 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase">
                    WELCOME
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Feature Cards Section (Interactive 3D Glass Bento Cards) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full mt-6 lg:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => scrollTo(card.targetSection)}
                className="group relative bg-[#081E30]/85 hover:bg-[#081E30] backdrop-blur-md border border-[#102F4A] hover:border-[#25BDF2]/80 transition-all duration-300 p-5 sm:p-6 overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_10px_30px_rgba(37,189,242,0.15)] hover:-translate-y-1 flex flex-col justify-between min-h-[145px]"
              >
                {/* Embedded Right Gym Image with Smooth Dark Fade */}
                <div className="absolute right-0 top-0 bottom-0 w-[48%] overflow-hidden pointer-events-none">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  {/* Smooth horizontal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#081E30] via-[#081E30]/70 to-transparent" />
                  <div className="absolute inset-0 bg-[#041626]/20" />
                </div>

                {/* Card Content (Left) */}
                <div className="relative z-10 max-w-[62%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#041626]/90 border border-[#25BDF2]/40 flex items-center justify-center text-[#25BDF2] group-hover:border-[#25BDF2] group-hover:bg-[#25BDF2]/15 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-[#25BDF2] font-mono font-bold tracking-widest uppercase">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-white font-inter font-bold text-base sm:text-lg mb-1 group-hover:text-[#25BDF2] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 font-inter text-xs leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Right Arrow Indicator */}
                <div className="absolute bottom-4 right-4 z-10 text-white/60 group-hover:text-[#25BDF2] group-hover:translate-x-1.5 transition-all duration-200">
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
