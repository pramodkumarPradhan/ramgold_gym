// import React, { useState, useEffect } from 'react';
// import { Compass, Play, ChevronLeft, ChevronRight, Info, Sparkles, X, CheckCircle, ArrowRight } from 'lucide-react';
// import Login from './Login';

// export default function Hero({ onExploreClick, onDiscoverClick, onStartJourney }) {
//   const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [hasScrolled, setHasScrolled] = useState(false);

//   // Dynamic 3D Hero Billboard Headlines
//   const slides = [
//     {
//       title1: 'TRAIN HARDER.',
//       title2: 'BECOME MORE.',
//       zone: 'ZONE 01 • COMPETITION POWER RACKS',
//       desc: 'Competition-grade calibrated iron, Olympic platforms & heavy barbell progression.'
//     },
//     {
//       title1: 'FORGE POWER.',
//       title2: 'SHATTER LIMITS.',
//       zone: 'ZONE 02 • BIOMECHANICAL OPTIMIZATION',
//       desc: 'Precision plate-loaded machinery and personalized biomechanics coaching.'
//     },
//     {
//       title1: 'FAST RECOVERY.',
//       title2: 'RETURN STRONGER.',
//       zone: 'ZONE 03 • ATHLETIC RECOVERY SUITE',
//       desc: 'Contrast therapy, percussive mobility & targeted muscle regeneration cages.'
//     }
//   ];

//   // Mouse Parallax for Authentic 3D Depth
//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     const { innerWidth, innerHeight } = window;
//     const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
//     const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
//     setMouseOffset({ x, y });
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 40) {
//         setHasScrolled(true);
//       } else {
//         setHasScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-advance slides every 6s (restarts whenever the slide changes)
//   useEffect(() => {
//     if (showLogin || showInfoModal) return;
//     const t = setTimeout(() => setActiveSlide((p) => (p + 1) % slides.length), 6000);
//     return () => clearTimeout(t);
//   }, [activeSlide, showLogin, showInfoModal]);

//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const scrollTo = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: 'smooth' });
//   };

//   const current = slides[activeSlide];

//   return (
//     <section
//       id="home"
//       onMouseMove={handleMouseMove}
//       className="relative w-full h-screen min-h-[680px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-[#041626] text-white select-none"
//     >
//       {/* 1. Cinematic 3D Arena Background with Interactive Depth Parallax */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <div
//           className="w-full h-full transition-transform duration-500 ease-out will-change-transform"
//           style={{
//             transform: `perspective(1200px) scale(1.07) rotateX(${mouseOffset.y * -3}deg) rotateY(${mouseOffset.x * 3.5}deg)`,
//             backgroundImage: `url('/images/arena-clean-3d.jpg')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center 45%'
//           }}
//         />

//         {/* Ambient Dark Navy Atmospheric Vignette Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626]/70" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#041626]/40 via-transparent to-[#041626]/40" />

//         {/* Volumetric Cyan Spotlight Beam that reacts dynamically to mouse movement */}
//         <div
//           className="absolute top-[-10%] right-[20%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-25 pointer-events-none transition-transform duration-700"
//           style={{
//             background: 'radial-gradient(circle, #25BDF2 0%, transparent 70%)',
//             transform: `translate(${mouseOffset.x * 50}px, ${mouseOffset.y * 35}px)`
//           }}
//         />

//         {/* Subtle Cyber Grid Matrix */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `radial-gradient(#25BDF2 1px, transparent 1px)`,
//             backgroundSize: '40px 40px'
//           }}
//           aria-hidden="true"
//         />
//       </div>

//       {/* 2. Center Scene: Clean 3D Arena View with Right-side Floating Glass HUD Card */}
//       <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-28 sm:pt-32 flex-1 flex flex-col justify-center items-end">
//         <div
//           className="w-full max-w-md sm:max-w-lg transition-transform duration-500 ease-out"
//           style={{
//             transform: `perspective(1000px) rotateY(${mouseOffset.x * -4}deg) rotateX(${mouseOffset.y * 4}deg) translateZ(20px)`
//           }}
//         >
//           {/* Floating Cyan Glassmorphic Billboard */}
//           <div className="relative rounded-2xl bg-[#081E30]/65 backdrop-blur-xl border border-[#25BDF2]/50 p-6 sm:p-8 md:p-10 flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(37,189,242,0.2)] overflow-hidden group">
//             {/* Ambient Cyan Radial Glow inside card */}
//             <div className="absolute top-0 right-0 w-36 h-36 bg-[#25BDF2]/20 rounded-full blur-3xl pointer-events-none" />

//             {/* Glowing Corner Accents */}
//             <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#25BDF2]" />
//             <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#25BDF2]" />
//             <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#25BDF2]" />
//             <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#25BDF2]" />

//             {/* Zone Tag Badge */}
//             <div className="flex items-center space-x-2 mb-3">
//               <span className="w-2 h-2 rounded-full bg-[#25BDF2] animate-pulse" />
//               <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#25BDF2] font-mono">
//                 {current.zone}
//               </span>
//             </div>

//             {/* Headline Text - Crisp, readable, balanced typography */}
//             <div key={`txt-${activeSlide}`} className="heroTextIn">
//               <div className="flex flex-col select-none h-[4.25rem] sm:h-[5rem] md:h-[5.75rem] overflow-hidden">
//                 <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] whitespace-nowrap font-bold font-inter tracking-tight leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]">
//                   {current.title1}
//                 </h2>
//                 <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] whitespace-nowrap font-bold font-inter tracking-tight leading-tight text-[#25BDF2] drop-shadow-[0_2px_10px_rgba(37,189,242,0.35)] mt-1">
//                   {current.title2}
//                 </h2>
//               </div>

//               {/* Description Subtitle */}
//               <p className="mt-3 h-[2.75rem] sm:h-[3rem] overflow-hidden text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
//                 {current.desc}
//               </p>
//             </div>

//             {/* Quick Stats */}
//             <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#25BDF2]/20 pt-4">
//               {[
//                 { value: '15K', label: 'Sq Ft Arena' },
//                 { value: '18H', label: 'Open Daily' },
//                 { value: '1:1', label: 'Coaching' }
//               ].map((s) => (
//                 <div key={s.label}>
//                   <div className="text-xl sm:text-2xl font-extrabold text-[#25BDF2] leading-none">{s.value}</div>
//                   <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">{s.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="mt-5 flex flex-wrap items-center gap-3">
//               <button
//                 onClick={() => scrollTo('contact')}
//                 className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#25BDF2] text-[#041626] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(37,189,242,0.55)] hover:bg-[#1DA3D2] transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
//               >
//                 <span>BOOK FREE TRIAL</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Auto-play progress bar */}
//             <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5">
//               <div
//                 key={activeSlide}
//                 className="h-full bg-[#25BDF2] shadow-[0_0_10px_#25BDF2] origin-left"
//                 style={{ animation: 'heroProgress 6s linear forwards' }}
//               />
//             </div>
//             <style>{`
//               @keyframes heroProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
//               @keyframes heroTextIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//               .heroTextIn { animation: heroTextIn 0.5s ease-out; }
//             `}</style>
//           </div>

//           {/* Floating Slide Navigation Controls Pill (< 01 / 03 >) */}
//           <div className="mt-4 flex justify-end">
//             <div className="inline-flex items-center space-x-3 bg-[#081E30]/75 backdrop-blur-md border border-[#25BDF2]/40 rounded-full px-4 py-2 shadow-xl">
//               <button
//                 onClick={prevSlide}
//                 className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#25BDF2]/20 transition-all active:scale-90"
//                 aria-label="Previous Highlight"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>

//               <span className="text-[11px] font-mono font-bold tracking-widest text-[#25BDF2] px-1 select-none">
//                 0{activeSlide + 1} / 0{slides.length}
//               </span>

//               <button
//                 onClick={nextSlide}
//                 className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#25BDF2]/20 transition-all active:scale-90"
//                 aria-label="Next Highlight"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3. Bottom Controls Bar matching the uploaded design */}
//       <div className="relative z-30 pb-6 sm:pb-8 px-6 sm:px-12 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//         {/* Bottom Left: Live Gym Status Badge */}
//         <div className="hidden sm:flex items-center">
//           <div className="flex items-center space-x-2.5 bg-[#081E30]/75 backdrop-blur-md border border-[#25BDF2]/35 rounded-full px-4 sm:px-5 py-2 shadow-lg">
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
//             <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
//               OPEN DAILY • 5 AM – 11 PM
//             </span>
//           </div>
//         </div>

//         {/* Bottom Center: Main Floating Glass Capsule Bar */}
//         <div className="flex items-center bg-[#081E30]/85 backdrop-blur-xl border border-[#25BDF2]/40 rounded-full p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(37,189,242,0.15)]">
//           {/* JOIN NOW */}
//           <button
//             onClick={onStartJourney}
//             className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
//           >
//             JOIN NOW
//           </button>

//           {/* EXPLORE FACILITIES (Cyan Glowing Active Button) */}
//           <button
//             onClick={() => scrollTo('facilities')}
//             className="px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#25BDF2] text-[#041626] shadow-[0_0_25px_#25BDF2] hover:bg-[#1DA3D2] hover:shadow-[0_0_35px_#25BDF2] transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer"
//           >
//             EXPLORE FACILITIES
//           </button>

//           {/* MEMBERSHIP */}
//           <button
//             onClick={() => scrollTo('membership')}
//             className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
//           >
//             MEMBERSHIP
//           </button>

//           {/* LOGIN */}
//           <button
//             onClick={() => setShowLogin(true)}
//             className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
//           >
//             LOGIN
//           </button>
//         </div>

//         {/* Bottom Right: Info & Navigation Capsule Buttons */}
//         <div className="flex items-center space-x-2.5">
//           {/* Info Button */}
//           <button
//             onClick={() => setShowInfoModal(true)}
//             className="w-10 h-10 rounded-full bg-[#081E30]/80 hover:bg-[#25BDF2]/20 backdrop-blur-md border border-[#25BDF2]/40 flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 shadow-lg cursor-pointer"
//             aria-label="Arena Specifications"
//           >
//             <Info className="w-4 h-4" />
//           </button>

//           {/* Left Arrow (Scroll to Prev Section) */}
//           <button
//             onClick={() => scrollTo('home')}
//             className="w-10 h-10 rounded-full bg-[#081E30]/80 hover:bg-[#25BDF2]/20 backdrop-blur-md border border-[#25BDF2]/40 flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 shadow-lg cursor-pointer"
//             aria-label="Top of Page"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>

//           {/* Right Arrow (Scroll to Next Section) */}
//           <button
//             onClick={() => scrollTo('about')}
//             className="w-10 h-10 rounded-full bg-[#081E30]/80 hover:bg-[#25BDF2]/20 backdrop-blur-md border border-[#25BDF2]/40 flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 shadow-lg cursor-pointer"
//             aria-label="Scroll Down to 3D Content"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* 5. Subtle Floating 3D Scroll Cue */}
//       <div 
//         onClick={() => scrollTo('about')}
//         className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 cursor-pointer flex flex-col items-center opacity-70 hover:opacity-100 ${
//           hasScrolled ? 'opacity-0 pointer-events-none' : 'animate-bounce'
//         }`}
//       >
//         <span className="text-[9px] tracking-[0.25em] font-semibold uppercase text-[#25BDF2]">
//           SCROLL FOR 3D ARENA EXPERIENCE ↓
//         </span>
//       </div>

//       {/* 6. Quick Arena HUD Specs Modal (triggered by Info icon) */}
//       {showInfoModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
//           <div className="relative w-full max-w-lg bg-[#081E30] border-2 border-[#25BDF2] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(37,189,242,0.4)] text-white">
//             <button
//               onClick={() => setShowInfoModal(false)}
//               className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="flex items-center space-x-2 mb-3">
//               <span className="w-4 h-[2px] bg-[#25BDF2]" />
//               <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#25BDF2]">
//                 RAMGOLD ARENA • 3D SPECIFICATIONS
//               </span>
//             </div>

//             <h3 className="text-2xl font-black font-headline-md uppercase mb-4 text-white">
//               BALASORE HIGH-PERFORMANCE TRAINING GROUND
//             </h3>

//             <div className="space-y-3.5 mb-6 text-sm text-slate-300">
//               <div className="flex items-start space-x-3">
//                 <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
//                 <span><strong className="text-white">Facility Footprint:</strong> 15,000 Sq Ft multi-zone strength & conditioning arena.</span>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
//                 <span><strong className="text-white">Operating Hours:</strong> 5:00 AM – 11:00 PM Daily (Morning & Evening sessions).</span>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
//                 <span><strong className="text-white">Location:</strong> Above Gayatri Vaishnavi Healthcare, Balasore, Odisha.</span>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
//                 <span><strong className="text-white">Specialized Equipment:</strong> Competition power cages, calibrated steel plates, biomechanical strength lines.</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-end space-x-3">
//               <button
//                 onClick={() => {
//                   setShowInfoModal(false);
//                   scrollTo('membership');
//                 }}
//                 className="bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all flex items-center space-x-1.5"
//               >
//                 <span>EXPLORE PLANS</span>
//                 <ArrowRight className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 7. Login Modal (triggered by LOGIN buttons) */}
//       {showLogin && (
//         <Login
//           onClose={() => setShowLogin(false)}
//           onLoginSuccess={(user) => console.log('Logged in:', user.email)}
//           onSwitchToSignup={() => {
//             setShowLogin(false);
//             if (onStartJourney) onStartJourney();
//           }}
//         />
//       )}
//     </section>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Info, X, CheckCircle, ArrowRight } from 'lucide-react';
import Login from './Login';

// Animated count-up used for the hero stats
function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const TICKER = ['POWER', 'STRENGTH', 'CONDITIONING', 'RECOVERY', 'DISCIPLINE', 'COMMUNITY', 'RESULTS'];

export default function Hero({ onExploreClick, onDiscoverClick, onStartJourney }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const sqft = useCountUp(15);
  const hours = useCountUp(18);

  const slides = [
    {
      title1: 'TRAIN HARDER.',
      title2: 'BECOME MORE.',
      zone: 'ZONE 01 • COMPETITION POWER RACKS',
      desc: 'Competition-grade calibrated iron, Olympic platforms & heavy barbell progression.'
    },
    {
      title1: 'FORGE POWER.',
      title2: 'SHATTER LIMITS.',
      zone: 'ZONE 02 • BIOMECHANICAL OPTIMIZATION',
      desc: 'Precision plate-loaded machinery and personalized biomechanics coaching.'
    },
    {
      title1: 'FAST RECOVERY.',
      title2: 'RETURN STRONGER.',
      zone: 'ZONE 03 • ATHLETIC RECOVERY SUITE',
      desc: 'Contrast therapy, percussive mobility & targeted muscle regeneration cages.'
    }
  ];

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMouseOffset({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2
    });
  };

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance every 6s (restarts when slide changes, paused while modals are open)
  useEffect(() => {
    if (showLogin || showInfoModal) return;
    const t = setTimeout(() => setActiveSlide((p) => (p + 1) % slides.length), 6000);
    return () => clearTimeout(t);
  }, [activeSlide, showLogin, showInfoModal]);

  const nextSlide = () => setActiveSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setActiveSlide((p) => (p - 1 + slides.length) % slides.length);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const current = slides[activeSlide];
  const headlineSize = { fontSize: 'clamp(1.9rem, 6.2vw, 5.5rem)' };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-[#041626] text-white select-none"
    >
      {/* Scoped animations */}
      <style>{`
        @keyframes heroProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes heroProgressY { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes heroLineUp { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroShimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes heroSpin { to { transform: rotate(360deg); } }
        @keyframes heroMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes heroScan { 0% { transform: translateY(-10%); opacity: 0; } 15% { opacity: .5; } 85% { opacity: .5; } 100% { transform: translateY(110vh); opacity: 0; } }
        @keyframes heroRise { 0% { transform: translateY(0) scale(1); opacity: 0; } 20% { opacity: .9; } 100% { transform: translateY(-60vh) scale(.4); opacity: 0; } }
        .hero-line { display: block; overflow: hidden; padding-bottom: .06em; }
        .hero-line > span { display: block; animation: heroLineUp .75s cubic-bezier(.2,.8,.2,1) both; }
        .hero-line.d2 > span { animation-delay: .12s; }
        .hero-fade { animation: heroFadeUp .7s ease-out .3s both; }
        .hero-shimmer {
          background: linear-gradient(90deg, #25BDF2, #9be8ff, #25BDF2, #1488b8, #25BDF2);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: heroShimmer 4s linear infinite;
          filter: drop-shadow(0 0 18px rgba(37,189,242,.35));
        }
        .hero-outline { -webkit-text-stroke: 2px rgba(37,189,242,.35); color: transparent; }
      `}</style>

      {/* 1. Cinematic background with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `perspective(1200px) scale(1.07) rotateX(${mouseOffset.y * -3}deg) rotateY(${mouseOffset.x * 3.5}deg)`,
            backgroundImage: `url('/images/arena-clean-3d.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%'
          }}
        />

        {/* Readability gradient: darker on the left where the headline sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041626] via-[#041626]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626]/70" />

        {/* Mouse-reactive spotlight */}
        <div
          className="absolute top-[-10%] right-[20%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-25 transition-transform duration-700"
          style={{
            background: 'radial-gradient(circle, #25BDF2 0%, transparent 70%)',
            transform: `translate(${mouseOffset.x * 50}px, ${mouseOffset.y * 35}px)`
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(#25BDF2 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
          aria-hidden="true"
        />

        {/* Scanning light line */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25BDF2] to-transparent shadow-[0_0_20px_#25BDF2]"
          style={{ animation: 'heroScan 7s linear infinite' }}
        />

        {/* Rising energy particles */}
        {[8, 22, 37, 51, 66, 80, 92].map((left, i) => (
          <span
            key={left}
            className="absolute bottom-0 w-1 h-1 rounded-full bg-[#25BDF2] shadow-[0_0_10px_#25BDF2]"
            style={{
              left: `${left}%`,
              animation: `heroRise ${6 + (i % 4) * 1.5}s ease-in ${i * 0.9}s infinite`
            }}
          />
        ))}
      </div>

      {/* 2. Main content: open typography, no box */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-28 sm:pt-32 flex-1 flex flex-col justify-center">
        <div key={`copy-${activeSlide}`}>
          {/* Zone tag with line */}
          <div className="flex items-center space-x-3 mb-4 hero-fade" style={{ animationDelay: '0s' }}>
            <span className="w-10 sm:w-16 h-[2px] bg-[#25BDF2] shadow-[0_0_10px_#25BDF2]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#25BDF2] font-mono">
              {current.zone}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black font-inter uppercase tracking-tight leading-[0.95] whitespace-nowrap" style={headlineSize}>
            <span className="hero-line">
              <span className="text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)]">{current.title1}</span>
            </span>
            <span className="hero-line d2">
              <span className="hero-shimmer">{current.title2}</span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero-fade mt-5 h-[3rem] sm:h-[3.25rem] max-w-md sm:max-w-lg text-sm sm:text-base text-slate-300 leading-relaxed overflow-hidden">
            {current.desc}
          </p>
        </div>

        {/* CTA row */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-[#25BDF2] text-[#041626] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(37,189,242,0.6)] hover:bg-[#1DA3D2] transition-all hover:scale-[1.04] active:scale-95 cursor-pointer"
          >
            <span>BOOK FREE TRIAL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollTo('facilities')}
            className="group flex items-center space-x-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white cursor-pointer"
          >
            <span className="w-11 h-11 rounded-full border border-[#25BDF2]/60 flex items-center justify-center text-[#25BDF2] group-hover:bg-[#25BDF2] group-hover:text-[#041626] transition-all shadow-[0_0_20px_rgba(37,189,242,0.25)]">
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            </span>
            <span className="group-hover:text-[#25BDF2] transition-colors">TAKE A TOUR</span>
          </button>

          {/* Slide arrows + counter */}
          <div className="flex items-center space-x-2 sm:ml-4">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-[#25BDF2] flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 cursor-pointer"
              aria-label="Previous Highlight"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#25BDF2] w-14 text-center">
              0{activeSlide + 1} / 0{slides.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-[#25BDF2] flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 cursor-pointer"
              aria-label="Next Highlight"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats: open row, no card */}
        <div className="mt-8 flex items-center gap-6 sm:gap-10">
          {[
            { value: `${sqft}K`, label: 'Sq Ft Arena' },
            { value: `${hours}H`, label: 'Open Daily' },
            { value: '1:1', label: 'Coaching' }
          ].map((s, i) => (
            <div key={s.label} className={`${i > 0 ? 'pl-6 sm:pl-10 border-l border-[#25BDF2]/30' : ''}`}>
              <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                {s.value}
              </div>
              <div className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#25BDF2]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rotating circular badge */}
      <div
        className="hidden lg:block absolute z-20 right-20 top-[26%] w-36 h-36"
        style={{ animation: 'heroFloat 6s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'heroSpin 22s linear infinite' }}>
          <defs>
            <path id="heroCircle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text fill="#25BDF2" fontSize="15" fontWeight="700" letterSpacing="4" fontFamily="monospace">
            <textPath href="#heroCircle">RAMGOLD GYM • BALASORE • TRAIN HARDER •</textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-[#25BDF2] text-[#041626] flex items-center justify-center font-black text-lg shadow-[0_0_30px_#25BDF2]">
            RG
          </span>
        </div>
      </div>

      {/* Vertical slide indicator */}
      <div className="hidden md:flex absolute z-30 right-6 top-1/2 -translate-y-1/2 flex-col items-center space-y-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group flex flex-col items-center cursor-pointer"
          >
            <span className={`text-[10px] font-mono font-bold tracking-widest transition-colors ${i === activeSlide ? 'text-[#25BDF2]' : 'text-slate-500 group-hover:text-slate-300'}`}>
              0{i + 1}
            </span>
            <span className="relative mt-1 w-[2px] h-10 bg-white/10 overflow-hidden">
              {i === activeSlide && (
                <span
                  key={`bar-${activeSlide}`}
                  className="absolute top-0 left-0 w-full bg-[#25BDF2] shadow-[0_0_8px_#25BDF2] h-full origin-top"
                  style={{ animation: 'heroProgressY 6s linear forwards' }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Bottom controls bar */}
      <div className="relative z-30 pb-12 sm:pb-14 px-6 sm:px-12 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Live status */}
        <div className="hidden sm:flex items-center">
          <div className="flex items-center space-x-2.5 bg-[#081E30]/75 backdrop-blur-md border border-[#25BDF2]/35 rounded-full px-4 sm:px-5 py-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              OPEN DAILY • 5 AM – 11 PM
            </span>
          </div>
        </div>

        {/* Center capsule */}
        <div className="flex items-center bg-[#081E30]/85 backdrop-blur-xl border border-[#25BDF2]/40 rounded-full p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(37,189,242,0.15)]">
          <button
            onClick={onStartJourney}
            className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            JOIN NOW
          </button>
          <button
            onClick={() => scrollTo('facilities')}
            className="px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#25BDF2] text-[#041626] shadow-[0_0_25px_#25BDF2] hover:bg-[#1DA3D2] hover:shadow-[0_0_35px_#25BDF2] transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            EXPLORE FACILITIES
          </button>
          <button
            onClick={() => scrollTo('membership')}
            className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            MEMBERSHIP
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            LOGIN
          </button>
        </div>

        {/* Info + section arrows */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-10 h-10 rounded-full bg-[#081E30]/80 hover:bg-[#25BDF2]/20 backdrop-blur-md border border-[#25BDF2]/40 flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 shadow-lg cursor-pointer"
            aria-label="Arena Specifications"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('home')}
            className="w-10 h-10 rounded-full bg-[#081E30]/80 hover:bg-[#25BDF2]/20 backdrop-blur-md border border-[#25BDF2]/40 flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 shadow-lg cursor-pointer"
            aria-label="Top of Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="w-10 h-10 rounded-full bg-[#081E30]/80 hover:bg-[#25BDF2]/20 backdrop-blur-md border border-[#25BDF2]/40 flex items-center justify-center text-slate-300 hover:text-[#25BDF2] transition-all active:scale-90 shadow-lg cursor-pointer"
            aria-label="Scroll Down to 3D Content"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Scrolling ticker strip along the bottom edge */}
      <div
        onClick={() => scrollTo('about')}
        className={`absolute bottom-0 left-0 right-0 z-30 h-8 border-t border-[#25BDF2]/25 bg-[#041626]/80 backdrop-blur-md overflow-hidden flex items-center cursor-pointer transition-opacity duration-500 ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap" style={{ animation: 'heroMarquee 28s linear infinite', width: 'max-content' }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {[...TICKER, ...TICKER].map((w, i) => (
                <span key={`${dup}-${i}`} className="flex items-center text-[10px] font-mono font-bold tracking-[0.35em] text-[#25BDF2]/80">
                  <span className="px-6">{w}</span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#25BDF2]/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Info modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#081E30] border-2 border-[#25BDF2] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(37,189,242,0.4)] text-white">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-3">
              <span className="w-4 h-[2px] bg-[#25BDF2]" />
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#25BDF2]">
                RAMGOLD ARENA • 3D SPECIFICATIONS
              </span>
            </div>

            <h3 className="text-2xl font-black font-headline-md uppercase mb-4 text-white">
              BALASORE HIGH-PERFORMANCE TRAINING GROUND
            </h3>

            <div className="space-y-3.5 mb-6 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Facility Footprint:</strong> 15,000 Sq Ft multi-zone strength & conditioning arena.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Operating Hours:</strong> 5:00 AM – 11:00 PM Daily (Morning & Evening sessions).</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Location:</strong> Above Gayatri Vaishnavi Healthcare, Balasore, Odisha.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-[#25BDF2] mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Specialized Equipment:</strong> Competition power cages, calibrated steel plates, biomechanical strength lines.</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowInfoModal(false);
                  scrollTo('membership');
                }}
                className="bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all flex items-center space-x-1.5"
              >
                <span>EXPLORE PLANS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Login modal */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => console.log('Logged in:', user.email)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            if (onStartJourney) onStartJourney();
          }}
        />
      )}
    </section>
  );
}