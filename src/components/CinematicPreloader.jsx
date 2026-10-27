import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function CinematicPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING 3D ARENA ENGINE...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress counter simulation over ~2.4 seconds for that cinematic "late opening" punch
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800); // Wait for shutter exit animation
          }, 400);
          return 100;
        }

        // Variable increments to feel like authentic GPU shaders/assets loading
        const increment = prev < 30 ? 4 : prev < 70 ? 2.5 : prev < 90 ? 3.5 : 5;
        const next = Math.min(100, Math.round((prev + increment) * 10) / 10);

        if (next < 30) {
          setPhaseText('CALIBRATING VOLUMETRIC CYAN BEAMS...');
        } else if (next < 65) {
          setPhaseText('SYNCHRONIZING 3D COMPETITION POWER RACKS...');
        } else if (next < 90) {
          setPhaseText('OPTIMIZING ARENA DEPTH SHADERS // BALASORE...');
        } else {
          setPhaseText('RAMGOLD ARENA READY — LAUNCHING');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#020b14] text-white transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading Ramgold Gym 3D Arena"
    >
      {/* Background Volumetric Cyan Glow Pulse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-[130px] animate-pulse pointer-events-none"
          style={{ background: 'radial-gradient(circle, #25BDF2 0%, transparent 70%)' }}
        />
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #25BDF2 1px, transparent 1px), linear-gradient(to bottom, #25BDF2 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Center Preloader Console */}
      <div className="relative z-10 max-w-md w-full mx-auto px-6 flex flex-col items-center text-center">
        {/* Animated Brand Monogram */}
        <div className="relative mb-8 group">
          <div className="w-20 h-20 rounded-2xl bg-[#081E30] border-2 border-[#25BDF2] flex items-center justify-center shadow-[0_0_40px_rgba(37,189,242,0.6)] relative overflow-hidden">
            <span className="font-headline-xl text-3xl font-black text-white tracking-widest">
              RG
            </span>
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#25BDF2]/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
          {/* Subtle spinning laser ring */}
          <div className="absolute -inset-2.5 rounded-3xl border border-[#25BDF2]/40 border-dashed animate-spin duration-[10000ms] pointer-events-none" />
        </div>

        {/* Brand Title */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="w-4 h-[2px] bg-[#25BDF2]" />
          <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-white font-inter">
            RAMGOLD <span className="text-[#25BDF2]">GYM</span>
          </h2>
          <span className="w-4 h-[2px] bg-[#25BDF2]" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#25BDF2]/80 font-bold mb-8">
          ବାଲେଶ୍ୱର • BALASORE ARENA
        </p>

        {/* Technical Progress Gauge */}
        <div className="w-full mb-3">
          <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-300 mb-2">
            <span className="flex items-center space-x-1.5 text-[#25BDF2]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>{phaseText}</span>
            </span>
            <span className="text-base text-white font-black">{Math.floor(progress)}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2 bg-[#081E30] border border-[#102F4A] overflow-hidden p-0.5 rounded-full shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#1DA3D2] via-[#25BDF2] to-white rounded-full transition-all duration-75 ease-out shadow-[0_0_15px_#25BDF2]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Micro Telemetry Tags */}
        <div className="flex items-center justify-center space-x-4 text-[10px] text-slate-400 font-mono tracking-wider pt-2">
          <span className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-[#25BDF2]" />
            <span>3D WEBGL</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-[#25BDF2]" />
            <span>HIGH ACCURACY</span>
          </span>
          <span>•</span>
          <span>60 FPS</span>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="mt-8 text-[11px] text-slate-500 hover:text-[#25BDF2] uppercase tracking-widest transition-colors duration-200 cursor-pointer"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Cinematic Top and Bottom Hydraulic Shutter Shutters for Reveal */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#041626] border-b border-[#25BDF2]/30 transition-transform duration-700 ease-in-out pointer-events-none ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#041626] border-t border-[#25BDF2]/30 transition-transform duration-700 ease-in-out pointer-events-none ${
          isExiting ? 'translate-y-full' : 'translate-y-0'
        }`}
      />
    </div>
  );
}
