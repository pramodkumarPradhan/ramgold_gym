import React, { useState } from 'react';
import { Dumbbell, Zap, Target, ArrowRight, Check } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';

export default function Methodology() {
  const [activeModal, setActiveModal] = useState(null);

  const protocols = {
    strength: {
      title: "BUILD STRENGTH PROTOCOL",
      focus: "Hypertrophy & Absolute Power",
      details: [
        "Periodized compound lifting: Squat, Bench Press, Deadlift, Overhead Press",
        "Velocity-based barbell tracking and calibrated micro-plates",
        "Targeted hypertrophy accessory schemes for dense muscular development",
        "Progressive overload logging for measurable week-over-week gains"
      ]
    },
    endurance: {
      title: "PUSH ENDURANCE PROTOCOL",
      focus: "Metabolic & Anaerobic Conditioning",
      details: [
        "Curved manual treadmills for maximum posterior chain recruitment",
        "High-output Rogue Echo bikes & Concept2 ski-ergs",
        "Heart-rate zone conditioning to optimize VO2 Max",
        "Lactate threshold intervals for unmatched athletic work capacity"
      ]
    },
    purpose: {
      title: "TRAIN WITH PURPOSE PROTOCOL",
      focus: "Data-Driven Biometrics & Nutrition",
      details: [
        "Segmental bioelectrical impedance & body composition audits",
        "Tailored macronutrient protocols matched to training cycles",
        "Mobility screening & injury risk mitigation assessments",
        "One-on-one progress checkpoints every two weeks"
      ]
    }
  };

  const getIcon = (id) => {
    switch (id) {
      case 'strength':
        return <Dumbbell className="w-7 h-7 text-[#25BDF2]" />;
      case 'endurance':
        return <Zap className="w-7 h-7 text-[#25BDF2]" />;
      case 'purpose':
      default:
        return <Target className="w-7 h-7 text-[#25BDF2]" />;
    }
  };

  return (
    <section id="methodology" className="hidden md:block py-20 md:py-28 bg-transparent relative z-10 text-white border-y border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-2">
            METHODOLOGY
          </span>
          <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
            YOUR WORK. YOUR PROGRESS.
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg font-medium">
            Three fundamental pillars of physical conditioning engineered for unyielding results.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GYM_CONFIG.methodology.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-[#081E30] p-8 sm:p-9 border border-[#102F4A] shadow-xl flex flex-col justify-between group hover:border-[#25BDF2]/70 hover:shadow-2xl hover:shadow-[#25BDF2]/10 transition-all duration-300"
            >
              <div>
                <div className="w-16 h-16 bg-[#041626] border border-[#25BDF2]/30 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-[#25BDF2] transition-transform">
                  {getIcon(pillar.id)}
                </div>
                <h3 className="font-headline-md text-2xl sm:text-3xl text-white uppercase mb-4">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#102F4A]">
                <button
                  onClick={() => setActiveModal(pillar.id)}
                  className="w-full flex items-center justify-between text-xs sm:text-sm text-[#25BDF2] group-hover:text-white uppercase tracking-wider font-bold transition-colors"
                >
                  <span>{pillar.protocolLinkText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Details Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-[#081E30] text-white max-w-lg w-full p-6 sm:p-8 border border-[#25BDF2] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold">
                  {protocols[activeModal]?.focus}
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl uppercase text-white mt-1">
                  {protocols[activeModal]?.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white text-2xl font-bold p-1 leading-none"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-slate-300 mb-6 font-medium">
              Every member receives personal orientation and guidance adhering to this standard:
            </p>

            <ul className="space-y-3 mb-8">
              {protocols[activeModal]?.details.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-200 font-medium">
                  <Check className="w-5 h-5 text-[#25BDF2] mr-2.5 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] py-3 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              CLOSE PROTOCOL
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
