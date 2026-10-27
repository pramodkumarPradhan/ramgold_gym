import React, { useState, useEffect } from 'react';
import { X, Eye, Compass, ShieldCheck, Dumbbell, Zap, Flame, HeartPulse, Check, ArrowRight, RotateCw } from 'lucide-react';

export default function VirtualTourModal({ isOpen, onClose, onSelectPlan }) {
  const [activeZone, setActiveZone] = useState('zone-01');
  const [rotationY, setRotationY] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Subtle auto-rotation when tour opens
  useEffect(() => {
    if (!isOpen) return;
    let frame;
    let angle = 0;
    const rotate = () => {
      if (isRotating) {
        angle = (angle + 0.15) % 360;
        setRotationY(angle);
      }
      frame = requestAnimationFrame(rotate);
    };
    frame = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frame);
  }, [isOpen, isRotating]);

  if (!isOpen) return null;

  const zones = {
    'zone-01': {
      id: 'zone-01',
      title: 'STRENGTH ARENA',
      subtitle: 'COMPETITION POWER RACKS & CALIBRATED PLATFORMS',
      icon: Dumbbell,
      description: 'Engineered for maximal force production. Features 6 heavy-gauge Rogue & Eleiko power racks, calibrated steel micro-plates, competition knurled barbells, and shock-absorbing oak lifting platforms.',
      stats: [
        { label: 'RACK CAPACITY', val: '600 KG' },
        { label: 'PLATFORM TYPE', val: 'SHOCK OAK' },
        { label: 'BARBELLS', val: 'ELEIKO & ROGUE' },
      ],
      equipmentList: [
        'Competition Olympic Squat & Bench Racks',
        'Deadlift Deadening Drop Mats & Chalk Stations',
        'Calibrated Steel Weight Plates (0.25kg to 25kg)',
        'Specialty Bars: Safety Squat, Swiss Bar, Trap Bar'
      ],
      hotspotX: 25,
      hotspotY: 48,
    },
    'zone-02': {
      id: 'zone-02',
      title: 'FREE WEIGHTS ALLEY',
      subtitle: 'URETHANE DUMBBELLS UP TO 100 KG',
      icon: Flame,
      description: 'Precision-welded commercial urethane dumbbells with stainless steel knurled handles, paired with 8 multi-angle commercial benches for unrestricted upper body hypertrophy.',
      stats: [
        { label: 'WEIGHT RANGE', val: '2.5 – 100 KG' },
        { label: 'BENCH SLOTS', val: '8 ADJUSTABLE' },
        { label: 'MATERIAL', val: 'SOLID URETHANE' },
      ],
      equipmentList: [
        'Full Run Urethane Dumbbell Pairs (2.5kg to 100kg)',
        'Independent Heavy Incline/Decline Commercial Benches',
        'Preacher Curl & Seated Military Press Stations',
        'Adjustable Cable Crossover Functional Towers'
      ],
      hotspotX: 72,
      hotspotY: 60,
    },
    'zone-03': {
      id: 'zone-03',
      title: 'METABOLIC CARDIO LAB',
      subtitle: 'ANAEROBIC CONDITIONING & VO2 MAX RIGS',
      icon: Zap,
      description: 'Self-powered kinetic training apparatus engineered to elevate cardiac capacity and posterior chain recruitment without motor-driven assistance.',
      stats: [
        { label: 'TREADMILLS', val: 'CURVED MANUAL' },
        { label: 'AIR BIKES', val: 'ROGUE ECHO' },
        { label: 'METRICS', val: 'WATTS / VO2 MAX' },
      ],
      equipmentList: [
        'Woodway & Assault Curved Manual Treadmills',
        'Heavy-Duty Rogue Echo Air Resistance Bikes',
        'Concept2 PM5 Performance Rowers & Ski-Ergs',
        'Sled Turf Sprint Track with Calibrated Prowlers'
      ],
      hotspotX: 52,
      hotspotY: 42,
    },
    'zone-04': {
      id: 'zone-04',
      title: 'RECOVERY & REHAB ZONE',
      subtitle: 'SPORTS MASSAGE & SYSTEMIC RESTORATION',
      icon: HeartPulse,
      description: 'Dedicated post-workout regeneration ecosystem designed to reduce DOMS, optimize central nervous system recovery, and accelerate muscle protein synthesis.',
      stats: [
        { label: 'THERAPY', val: 'PERCUSSIVE & CRYO' },
        { label: 'STRETCHING', val: 'DEDICATED CAGES' },
        { label: 'REPAIR RATE', val: '2X FASTER' },
      ],
      equipmentList: [
        'Theragun Commercial Percussive Recovery Stations',
        'Dynamic Pneumatic Compression Boots',
        'Assisted Stretching Cage & Inversion Decompression',
        'High-Density Foam Rollers & Mobility Lacrosse Bands'
      ],
      hotspotX: 84,
      hotspotY: 44,
    }
  };

  const current = zones[activeZone];
  const CurrentIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn p-2 sm:p-6">
      {/* Container */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[850px] bg-[#041626] border border-[#25BDF2]/40 shadow-[0_0_80px_rgba(37,189,242,0.3)] flex flex-col overflow-hidden text-white">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#081E30]/90 border-b border-[#102F4A] z-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#25BDF2]/20 border border-[#25BDF2] flex items-center justify-center text-[#25BDF2]">
              <Compass className="w-4 h-4 animate-spin duration-[15000ms]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#25BDF2] font-black font-inter">
                RAMGOLD 3D VIRTUAL ARENA TOUR
              </div>
              <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
                📍 ବାଲେଶ୍ୱର • BALASORE HIGH-PERFORMANCE FACILITY
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                isRotating
                  ? 'bg-[#25BDF2] text-[#041626] border-[#25BDF2]'
                  : 'bg-[#041626] text-slate-300 border-[#102F4A] hover:border-[#25BDF2]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>360° ORBIT: {isRotating ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close 3D Virtual Tour"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main 3D Interactive Stage */}
        <div className="flex-1 relative overflow-hidden flex flex-col lg:flex-row">
          {/* Left / Center 3D Arena Visual Viewport */}
          <div className="flex-1 relative overflow-hidden bg-[#020b14] flex items-center justify-center">
            {/* 3D Scene Image with Interactive Transform */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{
                transform: `scale(1.05) perspective(1000px) rotateY(${rotationY * 0.1}deg)`,
                backgroundImage: `url('/images/concept-3d-environment.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Dynamic Volumetric Cyan Spotlights */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#041626]/80 via-transparent to-[#041626]/80" />

              {/* Interactive Hotspot Indicators on the Gym Floor */}
              {Object.values(zones).map((z) => {
                const isSelected = z.id === activeZone;
                return (
                  <button
                    key={z.id}
                    onClick={() => setActiveZone(z.id)}
                    className="absolute group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 focus:outline-none"
                    style={{ left: `${z.hotspotX}%`, top: `${z.hotspotY}%` }}
                    aria-label={`Inspect ${z.title}`}
                  >
                    <div
                      className={`relative flex items-center justify-center transition-transform duration-300 ${
                        isSelected ? 'scale-125' : 'scale-100 hover:scale-110'
                      }`}
                    >
                      {/* Pulse Wave */}
                      <span
                        className={`absolute w-10 h-10 rounded-full animate-ping ${
                          isSelected ? 'bg-[#25BDF2]/60' : 'bg-[#25BDF2]/20'
                        }`}
                      />
                      {/* Hotspot Ring */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                          isSelected
                            ? 'bg-[#25BDF2] border-white text-[#041626] shadow-[0_0_20px_#25BDF2]'
                            : 'bg-[#081E30]/90 border-[#25BDF2] text-[#25BDF2]'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                      {/* Label Tag */}
                      <span className="absolute top-8 whitespace-nowrap text-[10px] uppercase tracking-wider font-extrabold bg-[#041626]/90 text-[#25BDF2] px-2 py-0.5 border border-[#25BDF2]/40 rounded pointer-events-none shadow-lg">
                        {z.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom 3D Arena Status Telemetry */}
            <div className="absolute bottom-4 left-6 z-10 flex items-center space-x-2 text-xs font-mono text-slate-300 bg-[#081E30]/80 px-3 py-1.5 border border-[#25BDF2]/30 rounded">
              <span className="w-2 h-2 rounded-full bg-[#25BDF2] animate-ping" />
              <span>ACTIVE PERSPECTIVE: {current.title}</span>
            </div>
          </div>

          {/* Right Floating Inspection HUD Panel */}
          <div className="w-full lg:w-96 bg-[#081E30] border-t lg:border-t-0 lg:border-l border-[#102F4A] flex flex-col justify-between p-6 z-20 overflow-y-auto">
            <div>
              {/* Zone Navigation Pills */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {Object.values(zones).map((z) => {
                  const isSelected = z.id === activeZone;
                  return (
                    <button
                      key={z.id}
                      onClick={() => setActiveZone(z.id)}
                      className={`text-left p-2.5 border text-xs font-bold transition-all ${
                        isSelected
                          ? 'border-[#25BDF2] bg-[#25BDF2]/15 text-[#25BDF2]'
                          : 'border-[#102F4A] bg-[#041626]/60 text-slate-400 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400">{z.id.toUpperCase()}</div>
                      <div className="truncate">{z.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Zone Header */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#25BDF2]/10 border border-[#25BDF2] flex items-center justify-center text-[#25BDF2]">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-headline-md uppercase text-white font-black leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-[10px] text-[#25BDF2] font-semibold tracking-wider uppercase">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                {current.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {current.stats.map((s, idx) => (
                  <div key={idx} className="bg-[#041626] p-2.5 border border-[#102F4A] text-center">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      {s.label}
                    </div>
                    <div className="text-xs sm:text-sm text-[#25BDF2] font-black font-mono">
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Equipment Breakdown List */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  ARENA SPECIFICATIONS:
                </span>
                {current.equipmentList.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-[#25BDF2] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA to Join */}
            <div className="pt-4 border-t border-[#102F4A]">
              <button
                onClick={() => {
                  onClose();
                  if (onSelectPlan) onSelectPlan('Quarterly Membership');
                  const el = document.getElementById('membership');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] py-3 px-4 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:shadow-[#25BDF2]/30 transition-all cursor-pointer"
              >
                <span>JOIN THIS ARENA — CLAIM MEMBERSHIP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
