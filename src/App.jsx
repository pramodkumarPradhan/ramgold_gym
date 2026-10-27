import React, { useState } from 'react';
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
import FullPage3DLine from './components/FullPage3DLine';
import CinematicPreloader from './components/CinematicPreloader';
import VirtualTourModal from './components/VirtualTourModal';
import { MessageCircle } from 'lucide-react';
import { GYM_CONFIG } from './config/gymConfig';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState('Quarterly Membership');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

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

  const whatsappDirectUrl = `https://wa.me/${GYM_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(GYM_CONFIG.contact.whatsappDefaultMessage)}`;

  return (
    <div className="min-h-screen bg-[#041626] text-slate-100 flex flex-col font-inter selection:bg-[#25BDF2] selection:text-[#041626]">
      {/* Cinematic 3D Arena Startup Preloader */}
      {showPreloader && (
        <CinematicPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 1. Header Navigation with Online Join */}
      <Navbar 
        onSelectPlan={handlePlanSelect} 
        onOpenCheckout={handleOpenCheckout}
      />

      <main className="flex-1 relative overflow-hidden bg-[#041626]">
        {/* Full-Page Continuous 3D Kinetic Energy Line */}
        <FullPage3DLine />

        {/* 2. Hero Section with Concept 3 3D Arena */}
        <Hero
          onStartJourney={() => handleOpenCheckout('Quarterly Membership')}
          onExploreClick={() => setSelectedPlan('Quarterly Membership')}
          onDiscoverClick={() => setIsTourOpen(true)}
          onOpenTour={() => setIsTourOpen(true)}
        />

        {/* 3. About Section */}
        <About />

        {/* 4. Facilities Bento Grid ("EXPERIENCE THE ARENA") */}
        <Facilities onOpenTour={() => setIsTourOpen(true)} />

        {/* 5. Training Experience & Methodology */}
        <Methodology />

        {/* 6. Membership Plans ("MEMBERSHIP TIERS") */}
        <Membership 
          onSelectPlan={handlePlanSelect} 
          onOpenCheckout={handleOpenCheckout}
        />

        {/* 7. Trainers */}
        <Trainers />

        {/* 8. Gallery with Lightbox */}
        <Gallery />

        {/* 9. Grand Opening Announcement with Priority Claim */}
        <GrandOpening 
          onClaimFounding={() => handleOpenCheckout('Founding Member Rate')} 
        />

        {/* 10. Contact & Location & Interactive Enquiry */}
        <Contact selectedPlan={selectedPlan} />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Interactive Online Subscription & Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        initialPlan={checkoutPlan}
      />

      {/* 3D Virtual Arena Tour Modal */}
      <VirtualTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onSelectPlan={handlePlanSelect}
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
