import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Info, X, CheckCircle, ArrowRight } from 'lucide-react';
import Login from './Login';

// Animated count-up for hero stats
function useCountUp(target, duration = 1400) {
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

  // Touch swipe support for mobile
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const sqft = useCountUp(15);
  const hours = useCountUp(18);

  const slides = [
    {
      zone: 'ZONE 01 • COMPETITION POWER RACKS',
      title1: 'TRAIN HARDER.',
      title2: 'BECOME MORE.',
      desc: 'Competition-grade calibrated iron, Olympic platforms & heavy barbell progression in Balasore.',
      image: '/images/hero-slide-1.jpg',
      fallbackImage: '/images/arena-clean-3d.jpg'
    },
    {
      zone: 'ZONE 02 • BIOMECHANICAL OPTIMIZATION',
      title1: 'FORGE POWER.',
      title2: 'SHATTER LIMITS.',
      desc: 'Precision plate-loaded machinery and personalized biomechanics coaching designed for raw power.',
      image: '/images/hero-slide-2.jpg',
      fallbackImage: '/images/arena-clean-3d.jpg'
    },
    {
      zone: 'ZONE 03 • ATHLETIC RECOVERY SUITE',
      title1: 'FAST RECOVERY.',
      title2: 'RETURN STRONGER.',
      desc: 'Contrast therapy, percussive mobility & targeted muscle regeneration cages for rapid rebuild.',
      image: '/images/hero-slide-3.jpg',
      fallbackImage: '/images/arena-clean-3d.jpg'
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

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) nextSlide();
    else if (diff < -45) prevSlide();
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance every 6s
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

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-[#041626] text-white select-none"
    >
      {/* Scoped animations */}
      <style>{`
        @keyframes heroProgressY { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes heroLineUp { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroShimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes heroSpin { to { transform: rotate(360deg); } }
        @keyframes heroMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .hero-line { display: block; overflow: hidden; padding-bottom: .06em; }
        .hero-line > span { display: block; animation: heroLineUp .7s cubic-bezier(.2,.8,.2,1) both; }
        .hero-line.d2 > span { animation-delay: .1s; }
        .hero-fade { animation: heroFadeUp .6s ease-out .25s both; }
        .hero-shimmer {
          background: linear-gradient(90deg, #25BDF2, #B9F1FF, #25BDF2, #1488B8, #25BDF2);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: heroShimmer 3.5s linear infinite;
          filter: drop-shadow(0 0 18px rgba(37,189,242,.4));
        }
      `}</style>

      {/* 1. Cinematic Background with Crossfade and Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((s, idx) => (
          <div
            key={s.zone}
            className={`absolute inset-0 transition-all duration-1000 ease-out will-change-transform ${
              idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              transform: `perspective(1200px) rotateX(${mouseOffset.y * -2}deg) rotateY(${mouseOffset.x * 2.5}deg)`,
              backgroundImage: `url('${s.image}'), url('${s.fallbackImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%'
            }}
          />
        ))}

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041626]/90 via-[#041626]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626]/70" />

        {/* Ambient Cyan Spotlight */}
        <div
          className="absolute top-[-10%] right-[15%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[140px] opacity-25 transition-transform duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #25BDF2 0%, transparent 70%)',
            transform: `translate(${mouseOffset.x * 40}px, ${mouseOffset.y * 30}px)`
          }}
        />
      </div>

      {/* 2. Main Content: Clean, Spacious, Impactful */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-12 pt-24 sm:pt-32 flex-1 flex flex-col justify-center">
        {/* Simple Zone Badge */}
        <div className="flex items-center space-x-2.5 mb-3 sm:mb-4">
          <span className="w-2 h-2 rounded-full bg-[#25BDF2] shadow-[0_0_8px_#25BDF2] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#25BDF2] font-mono">
            {current.zone}
          </span>
        </div>

        {/* Big, Clean Headline */}
        <div key={`txt-${activeSlide}`}>
          <h1 className="font-black font-inter uppercase tracking-tight leading-[0.98] sm:leading-[0.95] text-[2.2rem] xs:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="hero-line">
              <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">{current.title1}</span>
            </span>
            <span className="hero-line d2 mt-0.5 sm:mt-1">
              <span className="hero-shimmer">{current.title2}</span>
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p className="hero-fade mt-3 sm:mt-4 max-w-sm sm:max-w-xl text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
            {current.desc}
          </p>
        </div>

        {/* 2 Clean CTA Buttons */}
        <div className="mt-5 sm:mt-7 flex flex-row items-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#25BDF2] text-[#041626] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(37,189,242,0.5)] hover:bg-[#1DA3D2] transition-all hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>BOOK FREE TRIAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('facilities')}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#081E30]/80 hover:bg-[#081E30] border border-[#25BDF2]/40 text-white text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 text-[#25BDF2] fill-current" />
            <span>TAKE A TOUR</span>
          </button>

          {/* Desktop Slide Arrows */}
          <div className="hidden sm:flex items-center space-x-2 ml-2">
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

        {/* 3 Clean Stats: Spacious, uncluttered */}
        <div className="mt-6 sm:mt-10 flex items-center gap-6 sm:gap-10">
          {[
            { value: `${sqft}K`, label: 'Sq Ft Arena' },
            { value: `${hours}H`, label: 'Open Daily' },
            { value: '1:1', label: 'Coaching' }
          ].map((s, i) => (
            <div key={s.label} className={i > 0 ? 'pl-6 sm:pl-10 border-l border-[#25BDF2]/25' : ''}>
              <div className="text-xl sm:text-3xl font-extrabold text-white leading-none font-inter">
                {s.value}
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.25em] text-[#25BDF2] font-mono font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Slide Dots on Mobile */}
        <div className="flex sm:hidden items-center space-x-2 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="py-1 cursor-pointer"
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-6 bg-[#25BDF2] shadow-[0_0_8px_#25BDF2]' : 'w-2 bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Rotating Circular Badge */}
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

      {/* Desktop Vertical Slide Indicator */}
      <div className="hidden md:flex absolute z-30 right-6 top-1/2 -translate-y-1/2 flex-col items-center space-y-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group flex flex-col items-center cursor-pointer"
          >
            <span
              className={`text-[10px] font-mono font-bold tracking-widest transition-colors ${
                i === activeSlide ? 'text-[#25BDF2]' : 'text-slate-500 group-hover:text-slate-300'
              }`}
            >
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

      {/* 3. Desktop Bottom Bar (Hidden on Mobile) */}
      <div className="hidden sm:flex relative z-30 pb-12 sm:pb-14 px-6 sm:px-12 w-full max-w-7xl mx-auto flex-row items-center justify-between gap-4">
        {/* Live Status Badge */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2.5 bg-[#081E30]/75 backdrop-blur-md border border-[#25BDF2]/35 rounded-full px-5 py-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              OPEN DAILY • 5 AM – 11 PM
            </span>
          </div>
        </div>

        {/* Center Main Floating Capsule Bar */}
        <div className="flex items-center bg-[#081E30]/85 backdrop-blur-xl border border-[#25BDF2]/40 rounded-full p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(37,189,242,0.15)]">
          <button
            onClick={onStartJourney}
            className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            JOIN NOW
          </button>
          <button
            onClick={() => scrollTo('facilities')}
            className="px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#25BDF2] text-[#041626] shadow-[0_0_25px_#25BDF2] hover:bg-[#1DA3D2] transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer"
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

        {/* Right Info & Navigation Buttons */}
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

      {/* Simple Mobile Scroll Prompt (Zero Clutter) */}
      <div
        onClick={() => scrollTo('about')}
        className={`sm:hidden relative z-30 pb-9 flex items-center justify-center cursor-pointer text-slate-400 hover:text-[#25BDF2] transition-all ${
          hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-80'
        }`}
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase flex items-center space-x-1">
          <span>SCROLL TO EXPLORE</span>
          <ChevronRight className="w-3.5 h-3.5 rotate-90 text-[#25BDF2]" />
        </span>
      </div>

      {/* 4. Scrolling Ticker along Bottom Edge */}
      <div
        onClick={() => scrollTo('about')}
        className={`absolute bottom-0 left-0 right-0 z-30 h-7 border-t border-[#25BDF2]/25 bg-[#041626]/85 backdrop-blur-md overflow-hidden flex items-center cursor-pointer transition-opacity duration-500 ${
          hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap" style={{ animation: 'heroMarquee 28s linear infinite', width: 'max-content' }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {[...TICKER, ...TICKER].map((w, i) => (
                <span key={`${dup}-${i}`} className="flex items-center text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.3em] text-[#25BDF2]/80">
                  <span className="px-5">{w}</span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#25BDF2]/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#081E30] border-2 border-[#25BDF2] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(37,189,242,0.4)] text-white">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close specifications"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-3">
              <span className="w-4 h-[2px] bg-[#25BDF2]" />
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#25BDF2]">
                RAMGOLD ARENA • SPECIFICATIONS
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-inter uppercase mb-4 text-white leading-tight">
              BALASORE HIGH-PERFORMANCE TRAINING GROUND
            </h3>

            <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-slate-300">
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
                className="bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all flex items-center space-x-1.5 shadow-[0_0_20px_rgba(37,189,242,0.4)] cursor-pointer"
              >
                <span>EXPLORE PLANS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member Login Modal */}
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
