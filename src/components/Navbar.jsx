import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';

export default function Navbar({ onSelectPlan, onOpenCheckout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'facilities', 'membership', 'trainers', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
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
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Facilities', href: '#facilities', id: 'facilities' },
    { name: 'Membership', href: '#membership', id: 'membership' },
    { name: 'Trainers', href: '#trainers', id: 'trainers' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenCheckout) {
      onOpenCheckout('Quarterly Membership');
      return;
    }
    if (onSelectPlan) {
      onSelectPlan('Quarterly Membership');
    }
    const target = document.querySelector('#membership');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#041626]/95 backdrop-blur-md border-b border-[#081E30] shadow-2xl py-3.5'
          : 'bg-[#041626]/85 backdrop-blur-sm border-b border-[#081E30]/60 py-4 sm:py-5'
      }`}
      id="navbar"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex flex-col group select-none"
        >
          <span className="text-2xl sm:text-3xl font-headline-md tracking-wider font-extrabold text-white transition-colors leading-none">
            RAMGOLD <span className="text-[#25BDF2]">GYM</span>
          </span>
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center space-x-1.5 mt-0.5">
            <span className="text-[#25BDF2]">ବାଲେଶ୍ୱର</span>
            <span className="text-slate-600">•</span>
            <span>BALASORE</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-all duration-200 relative py-1.5 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#25BDF2] rounded-none shadow-[0_0_8px_#25BDF2]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#membership"
            onClick={handleJoinClick}
            className="bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-200 shadow-lg hover:shadow-[#25BDF2]/30 flex items-center space-x-1.5 group"
          >
            <span>JOIN NOW</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#25BDF2]"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7 text-[#25BDF2]" />
          ) : (
            <Menu className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-[480px] opacity-100 border-b border-[#081E30] bg-[#041626]/98 backdrop-blur-xl px-6 py-5'
            : 'max-h-0 opacity-0 py-0 border-transparent'
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-2 text-base font-semibold border-b border-[#081E30] flex items-center justify-between transition-colors ${
                  isActive ? 'text-[#25BDF2] font-bold' : 'text-slate-200 hover:text-[#25BDF2]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-1.5 h-1.5 bg-[#25BDF2]" />}
              </a>
            );
          })}
          
          <div className="pt-3">
            <a
              href="#membership"
              onClick={handleJoinClick}
              className="w-full text-center bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold py-3 text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
