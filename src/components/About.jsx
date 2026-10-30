import React from 'react';
import { CheckCircle2, ArrowRight, Zap, Trophy, ShieldCheck } from 'lucide-react';
import SafeImage from './SafeImage';

export default function About() {
  const scrollToFacilities = (e) => {
    e.preventDefault();
    const el = document.getElementById('facilities');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Athletic Visual */}
        <div className="lg:col-span-6 relative z-20">
          <div className="relative z-10 w-full h-[260px] sm:h-[380px] lg:h-[480px] overflow-hidden border border-[#102F4A] shadow-2xl bg-[#081E30] rounded-lg sm:rounded-none">
            <SafeImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyQ24jlN0ILjS8iOjQe36GEFKjB6EDemHTGWAhNU-AK4HZZSHCtWQkINj0pid5snfFtYKj2zrSpmgesIVKYnv5V4CfpMbu-d4tPnKfjuoRhmhPyJ36a0ZWscpzuDzxIT_gwOcO8IsLGpNNuUnvH2EetMrlVIfDGshw8MRZ7SY9u4LjDn99fXCV8MbD3c-Ro6bixAu412bfS232_gMqpMR5VDg6fzq-KqvQQPguUshMm2UFux0lZcjk"
              fallbackSrc="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              alt="An athlete chalking up hands in Ramgold Gym"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Quick mobile floating tag */}
            <div className="sm:hidden absolute bottom-3 left-3 bg-[#041626]/90 backdrop-blur-md border border-[#25BDF2]/40 px-2.5 py-1 rounded text-[11px] font-bold text-[#25BDF2] flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25BDF2] animate-pulse" />
              <span>BALASORE'S PREMIER ARENA</span>
            </div>
          </div>
          {/* Subtle cyan accent backdrop */}
          <div className="absolute -bottom-4 -right-4 w-44 h-44 bg-[#25BDF2]/15 border-2 border-[#25BDF2]/40 z-0 hidden sm:block shadow-[0_0_25px_rgba(37,189,242,0.2)]" />
        </div>

        {/* Right Column: Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center relative z-20">
          <div className="inline-block mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#25BDF2] bg-[#081E30] border border-[#25BDF2]/30 px-3 py-1 sm:px-3.5 sm:py-1.5 font-bold rounded sm:rounded-none">
              THE RAMGOLD EXPERIENCE
            </span>
          </div>

          <h2 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl text-white uppercase mb-2 sm:mb-3 leading-tight tracking-tight">
            MORE THAN A WORKOUT.
          </h2>

          <p className="text-[11px] sm:text-sm text-[#25BDF2] font-semibold mb-3 sm:mb-5">
            ବାଲେଶ୍ୱରରେ ଏକ ନୂତନ ଫିଟନେସ ବିପ୍ଳବ — ପ୍ରମାଣିତ ଫଳାଫଳ।
          </p>

          {/* Desktop full paragraph */}
          <p className="hidden sm:block text-base sm:text-lg text-slate-300 font-medium mb-6 leading-relaxed">
            Forged through rigorous consistency and industrial-grade aesthetics, RAMGOLD GYM delivers an elite training ecosystem engineered to shatter plateaus in Balasore.
          </p>

          {/* Mobile punchy 1-liner (replaces boring long wall of text) */}
          <p className="sm:hidden text-xs text-slate-300 font-medium mb-4 leading-relaxed">
            Balasore's elite 15,000 sq ft conditioning ground engineered for serious physical transformations.
          </p>

          {/* Feature highlights: Crisp & compact on mobile, full detail on desktop */}
          <div className="space-y-2 sm:space-y-4 mb-5 sm:mb-8">
            <div className="flex items-start space-x-2.5 sm:space-x-3.5">
              <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#25BDF2] mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 font-medium text-xs sm:text-base">
                <span className="sm:hidden font-semibold text-white">Pure Performance: </span>
                <span className="hidden sm:inline">Zero commercial distractions — </span>pure, raw performance training.
              </p>
            </div>
            <div className="flex items-start space-x-2.5 sm:space-x-3.5">
              <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#25BDF2] mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 font-medium text-xs sm:text-base">
                <span className="sm:hidden font-semibold text-white">Imported Gear: </span>
                Competition-grade <span className="hidden sm:inline">imported apparatus & specialized strongman </span>platforms.
              </p>
            </div>
            <div className="flex items-start space-x-2.5 sm:space-x-3.5">
              <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#25BDF2] mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 font-medium text-xs sm:text-base">
                <span className="sm:hidden font-semibold text-white">Targeted Results: </span>
                Biomechanical optimization for real transformations.
              </p>
            </div>
          </div>

          {/* Key metric highlights */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-8">
            <div className="border-l-3 sm:border-l-4 border-[#25BDF2] pl-3 sm:pl-4 bg-[#081E30]/90 p-3 sm:p-4 border border-[#102F4A] shadow-md rounded sm:rounded-none">
              <span className="font-headline-sm text-white text-base sm:text-xl block font-bold">15,000 SQ FT</span>
              <span className="text-[11px] sm:text-sm text-slate-400 font-medium sm:font-semibold">Unrestricted Space</span>
            </div>
            <div className="border-l-3 sm:border-l-4 border-[#25BDF2] pl-3 sm:pl-4 bg-[#081E30]/90 p-3 sm:p-4 border border-[#102F4A] shadow-md rounded sm:rounded-none">
              <span className="font-headline-sm text-white text-base sm:text-xl block font-bold">5 AM – 11 PM</span>
              <span className="text-[11px] sm:text-sm text-slate-400 font-medium sm:font-semibold">Morning To Night</span>
            </div>
          </div>

          <div>
            <a
              href="#facilities"
              onClick={scrollToFacilities}
              className="inline-flex items-center text-[#25BDF2] hover:text-white text-xs sm:text-sm uppercase tracking-wider font-bold group transition-colors py-1"
            >
              <span>EXPLORE FACILITIES</span>
              <ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2 transform group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
