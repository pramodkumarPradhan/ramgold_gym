import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';
import SafeImage from './SafeImage';

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % GYM_CONFIG.gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? GYM_CONFIG.gallery.length - 1 : prev - 1
    );
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-2">
            VISUAL ATMOSPHERE
          </span>
          <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
            INSIDE RAMGOLD GYM.
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg font-medium">
            A glimpse into our state-of-the-art facility and intense training sessions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {GYM_CONFIG.gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className={`${item.colSpan} h-[280px] sm:h-[320px] overflow-hidden border border-[#102F4A] shadow-xl group relative cursor-pointer bg-[#081E30] hover:border-[#25BDF2]/70 transition-all duration-300`}
            >
              <SafeImage
                src={item.image}
                fallbackSrc={item.fallbackImage}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-[#041626]/70 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  <div className="w-10 h-10 rounded-full bg-[#25BDF2]/20 border border-[#25BDF2] backdrop-blur-md mx-auto mb-2 flex items-center justify-center text-[#25BDF2]">
                    <Maximize2 className="w-5 h-5 text-[#25BDF2]" />
                  </div>
                  <span className="text-white text-xs uppercase tracking-widest font-bold block">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#041626]/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-xl animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="flex justify-between items-center text-white w-full max-w-6xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs text-[#25BDF2] uppercase tracking-widest font-bold">
                RAMGOLD GYM GALLERY ({activeImageIndex + 1} / {GYM_CONFIG.gallery.length})
              </span>
              <h4 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
                {GYM_CONFIG.gallery[activeImageIndex].title}
              </h4>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-[#25BDF2] hover:text-[#041626] transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={GYM_CONFIG.gallery[activeImageIndex].image}
              fallbackSrc={GYM_CONFIG.gallery[activeImageIndex].fallbackImage}
              alt={GYM_CONFIG.gallery[activeImageIndex].alt}
              className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl border border-[#102F4A]"
            />

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 hover:bg-[#25BDF2] hover:text-[#041626] rounded-full transition-all backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 hover:bg-[#25BDF2] hover:text-[#041626] rounded-full transition-all backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Caption */}
          <div
            className="text-center text-slate-400 text-xs sm:text-sm font-medium z-10 max-w-xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{GYM_CONFIG.gallery[activeImageIndex].alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
