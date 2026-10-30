import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, User, ArrowRight } from 'lucide-react';

export default function Navbar({ onSelectPlan, onOpenCheckout, onOpenLogin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'about', 'facilities', 'methodology', 'membership', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'FACILITIES', href: '#facilities', id: 'facilities' },
    { name: 'TRAINING', href: '#methodology', id: 'methodology' },
    { name: 'MEMBERSHIP', href: '#membership', id: 'membership' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenLogin) {
      onOpenLogin();
    } else if (onOpenCheckout) {
      onOpenCheckout('Quarterly Membership');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
        isScrolled
          ? 'py-3 bg-[#041626]/85 backdrop-blur-xl border-b border-[#25BDF2]/20 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between pointer-events-auto">
        {/* Left: Distinctive RAMGOLD GYM Cyber Glass Badge */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex flex-col items-center justify-center bg-[#081E30]/90 backdrop-blur-xl border border-[#25BDF2]/40 rounded-xl px-4 sm:px-6 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(37,189,242,0.15)] group transition-all duration-300 hover:border-[#25BDF2] hover:scale-105 select-none"
        >
          <span className="text-white font-extrabold tracking-widest text-sm sm:text-base font-inter leading-none">
            RAMGOLD
          </span>
          <span className="text-[#25BDF2] font-bold tracking-[0.24em] text-[10px] sm:text-[11px] font-inter leading-none mt-1">
            GYM
          </span>
        </a>

        {/* Center: Navigation Links Floating Glass Capsule */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 bg-[#081E30]/80 backdrop-blur-xl border border-[#25BDF2]/35 rounded-full px-3 xl:px-4 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[11px] xl:text-xs font-bold tracking-wider px-2.5 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#25BDF2] font-extrabold bg-[#25BDF2]/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#25BDF2] shadow-[0_0_8px_#25BDF2]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Login + Join CTA + Hamburger Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* LOGIN Button */}
          <button
            onClick={handleLoginClick}
            className="hidden md:block text-[11px] sm:text-xs font-bold tracking-wider px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            LOGIN
          </button>

          {/* JOIN NOW CTA Button */}
          <button
            onClick={() => onOpenCheckout && onOpenCheckout('Quarterly Membership')}
            className="hidden sm:inline-flex items-center space-x-1.5 bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(37,189,242,0.4)] hover:shadow-[0_0_25px_rgba(37,189,242,0.6)] active:scale-95 cursor-pointer"
          >
            <span>JOIN NOW</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-[#081E30]/85 hover:bg-[#25BDF2]/20 backdrop-blur-xl border border-[#25BDF2]/40 flex items-center justify-center text-white transition-all shadow-lg active:scale-95 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#25BDF2]" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Cyberpunk Glass Drawer Menu (for Mobile and Hamburger toggle) */}
      <div
        className={`pointer-events-auto transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-[500px] opacity-100 mt-3 border-b border-[#25BDF2]/30 bg-[#041626]/95 backdrop-blur-2xl px-6 py-6'
            : 'max-h-0 opacity-0 py-0 border-transparent'
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-2 text-sm sm:text-base font-bold border-b border-[#081E30] flex items-center justify-between transition-colors ${
                  isActive ? 'text-[#25BDF2]' : 'text-slate-200 hover:text-[#25BDF2]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#25BDF2] shadow-[0_0_8px_#25BDF2]" />}
              </a>
            );
          })}

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={handleLoginClick}
              className="w-full bg-[#081E30] hover:bg-[#102F4A] border border-[#25BDF2]/40 text-[#25BDF2] font-bold py-2.5 text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>MEMBER LOGIN</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCheckout) onOpenCheckout('Quarterly Membership');
              }}
              className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-black py-2.5 text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
