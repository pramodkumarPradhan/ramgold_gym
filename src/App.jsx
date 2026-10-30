import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import Methodology from './components/Methodology';
import Membership from './components/Membership';
import Trainers from './components/Trainers';
import Gallery from './components/Gallery';
import GrandOpening from './components/GrandOpening';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import LoginModal from './components/LoginModal';
import FullPage3DLine from './components/FullPage3DLine';
import CinematicPreloader from './components/CinematicPreloader';
import Scroll3DSection from './components/Scroll3DSection';
import { MessageCircle } from 'lucide-react';
import { GYM_CONFIG } from './config/gymConfig';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState('Quarterly Membership');
  const [showPreloader, setShowPreloader] = useState(true);

  // Auto-open login if #login is in URL
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#login') {
        setIsLoginOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleOpenCheckout = (plan = 'Quarterly Membership') => {
    const planTitle = typeof plan === 'string' ? plan : (plan?.title || 'Quarterly Membership');
    setCheckoutPlan(planTitle);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    if (window.location.hash === '#login') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${GYM_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(GYM_CONFIG.contact.whatsappDefaultMessage)}`;

  return (
    <div className="min-h-screen bg-[#041626] text-slate-100 flex flex-col font-inter selection:bg-[#25BDF2] selection:text-[#041626] overflow-x-hidden">
      {/* Cinematic 3D Arena Startup Preloader */}
      {showPreloader && (
        <CinematicPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 1. Header Navigation with Exact Uploaded UI Design (Capsules + Center Badge) */}
      <Navbar 
        onSelectPlan={handlePlanSelect} 
        onOpenCheckout={handleOpenCheckout}
        onOpenLogin={handleOpenLogin}
      />

      <main className="flex-1 relative overflow-hidden bg-[#041626]">
        {/* Full-Page Continuous 3D Kinetic Energy Line */}
        <FullPage3DLine />

        {/* 2. Hero Section: Clean 3D Arena matching reference image with zero text clutter */}
        <Hero
          onStartJourney={() => handleOpenCheckout('Quarterly Membership')}
          onExploreClick={() => setSelectedPlan('Quarterly Membership')}
          onDiscoverClick={() => handleOpenCheckout('Quarterly Membership')}
        />

        {/* 3. Sections reveal in 3D Perspective Manner upon scrolling down */}
        <Scroll3DSection id="about" depth={1}>
          <About />
        </Scroll3DSection>

        <Scroll3DSection id="facilities" depth={1.2}>
          <Facilities />
        </Scroll3DSection>

        <Scroll3DSection id="methodology" depth={1}>
          <Methodology />
        </Scroll3DSection>

        <Scroll3DSection id="membership" depth={1.2}>
          <Membership 
            onSelectPlan={handlePlanSelect} 
            onOpenCheckout={handleOpenCheckout}
          />
        </Scroll3DSection>

        <Scroll3DSection id="trainers" depth={1}>
          <Trainers />
        </Scroll3DSection>

        <Scroll3DSection id="gallery" depth={1}>
          <Gallery />
        </Scroll3DSection>

        <Scroll3DSection id="grand-opening" depth={1}>
          <GrandOpening 
            onClaimFounding={() => handleOpenCheckout('Founding Member Rate')} 
          />
        </Scroll3DSection>

        <Scroll3DSection id="contact" depth={1}>
          <Contact selectedPlan={selectedPlan} />
        </Scroll3DSection>
      </main>

      {/* 4. Footer */}
      <Footer onOpenLogin={handleOpenLogin} />

      {/* Interactive Online Subscription & Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        initialPlan={checkoutPlan}
      />

      {/* Simple Member Portal & Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ramgold Gym concierge on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
          Chat With Us
        </span>
      </a>
    </div>
  );
}
