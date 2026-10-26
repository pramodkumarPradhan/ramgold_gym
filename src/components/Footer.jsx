import React from 'react';
import { GYM_CONFIG } from '../config/gymConfig';

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#041626] text-slate-400 border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, 'home')}
            className="text-2xl sm:text-3xl font-headline-md font-extrabold text-white tracking-wider hover:text-[#25BDF2] transition-colors"
          >
            RAMGOLD <span className="text-[#25BDF2]">GYM</span>
          </a>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="hover:text-[#25BDF2] transition-colors">Home</a>
            <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-[#25BDF2] transition-colors">About</a>
            <a href="#facilities" onClick={(e) => scrollTo(e, 'facilities')} className="hover:text-[#25BDF2] transition-colors">Facilities</a>
            <a href="#membership" onClick={(e) => scrollTo(e, 'membership')} className="hover:text-[#25BDF2] transition-colors">Membership</a>
            <a href="#trainers" onClick={(e) => scrollTo(e, 'trainers')} className="hover:text-[#25BDF2] transition-colors">Trainers</a>
            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-[#25BDF2] transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} {GYM_CONFIG.brand.name}. All rights reserved.</p>
          </div>
        </div>

        {/* Sub-footer Note */}
        <div className="pt-8 border-t border-[#081E30] text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            {GYM_CONFIG.contact.location}, {GYM_CONFIG.contact.city} (ବାଲେଶ୍ୱର) • {GYM_CONFIG.brand.sqft} Elite Training Facility
          </p>
          <div className="flex space-x-6 text-slate-500">
            <span className="hover:text-[#25BDF2] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#25BDF2] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#25BDF2] cursor-pointer transition-colors">Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
