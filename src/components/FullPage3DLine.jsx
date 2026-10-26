import React, { useEffect, useState, useMemo } from 'react';

/**
 * FullPage3DLine
 * 
 * An elite, full-page 3D kinetic energy laser beam that originates at the top of Hero,
 * borders the slanted gym photo with sub-pixel precision, flows seamlessly behind the
 * feature cards, and continues uninterrupted down through About and the entire website.
 * 
 * Key Features:
 * - 100% Seamless C1 Continuity: Eliminates any mismatch or offset between Home and About.
 * - Home Page Aesthetic: Matches the bold, solid, glowing cyan (#25BDF2) laser beam of the home page.
 * - Solid Architecture: NO dotted or dashed lines anywhere.
 * - Dynamic Kinetic Scroll Highlight: A traveling white-hot energy pulse tracks user scroll position.
 * - Secondary Solid Accent Guide: Subtle parallel cyan blueprint accent line (solid, non-dotted).
 * - Real-Time DOM Calibration: Dynamically aligns with exact section element heights and resize events.
 */
export default function FullPage3DLine() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    totalHeight: 7500,
    heroBottom: 900,
    aboutBottom: 1650,
    facilitiesBottom: 2700,
    methodologyBottom: 3500,
    membershipBottom: 4450,
    trainersBottom: 5350,
    galleryBottom: 6250,
    contactBottom: 7500
  }));

  // Track scroll position for dynamic kinetic traveling beam
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure section bounds dynamically to guarantee sub-pixel alignment across all viewports
  useEffect(() => {
    const measureSections = () => {
      const main = document.querySelector('main');
      if (!main) return;

      const width = window.innerWidth;
      const totalHeight = main.scrollHeight;

      const getSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return {
          top: el.offsetTop,
          height: el.offsetHeight,
          bottom: el.offsetTop + el.offsetHeight
        };
      };

      const hero = getSection('home');
      const about = getSection('about');
      const facilities = getSection('facilities');
      const methodology = getSection('methodology');
      const membership = getSection('membership');
      const trainers = getSection('trainers');
      const gallery = getSection('gallery');
      const contact = getSection('contact');

      const heroBottom = hero ? hero.bottom : (typeof window !== 'undefined' ? window.innerHeight : 900);
      const aboutBottom = about ? about.bottom : heroBottom + 750;
      const facilitiesBottom = facilities ? facilities.bottom : aboutBottom + 1050;
      const methodologyBottom = methodology ? methodology.bottom : facilitiesBottom + 800;
      const membershipBottom = membership ? membership.bottom : methodologyBottom + 950;
      const trainersBottom = trainers ? trainers.bottom : membershipBottom + 900;
      const galleryBottom = gallery ? gallery.bottom : trainersBottom + 900;
      const contactBottom = contact ? contact.bottom : totalHeight;

      setDimensions({
        width,
        totalHeight,
        heroBottom,
        aboutBottom,
        facilitiesBottom,
        methodologyBottom,
        membershipBottom,
        trainersBottom,
        galleryBottom,
        contactBottom
      });
    };

    measureSections();

    window.addEventListener('resize', measureSections);
    const timer1 = setTimeout(measureSections, 400);
    const timer2 = setTimeout(measureSections, 1200);

    let observer = null;
    const mainEl = document.querySelector('main');
    if (mainEl && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => measureSections());
      observer.observe(mainEl);
    }

    return () => {
      window.removeEventListener('resize', measureSections);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (observer) observer.disconnect();
    };
  }, []);

  // Build the unified continuous paths
  const { primaryPath, secondaryPath } = useMemo(() => {
    const W = dimensions.width;
    const offset = Math.round(Math.max(12, Math.min(18, W * 0.009)));

    // Waypoints aligned with page sections:
    // P0: Top of Hero (matches polygon 16% of w-[56%] -> 44% + 8.96% = 52.96vw)
    const p0 = { x: W * 0.5296, y: 0 };
    
    // P1: Exact Bottom of Hero (matches polygon 1% of w-[56%] -> 44% + 0.56% = 44.56vw)
    const p1 = { x: W * 0.4456, y: dimensions.heroBottom };

    // In Hero, the gym photo cut is a straight line, so P0 -> P1 is a straight line.
    // To ensure C1 continuous smoothness entering About, calculate the exit tangent:
    const heroH = dimensions.heroBottom > 0 ? dimensions.heroBottom : 900;
    const tangentX = (p1.x - p0.x) / heroH;

    // P2: Middle of About (flows through center negative space between athlete photo & copy)
    const aboutH = dimensions.aboutBottom - dimensions.heroBottom;
    const dY_about = aboutH * 0.35;
    const cp1_about = { x: p1.x + tangentX * dY_about, y: p1.y + dY_about };
    const p2 = { x: W * 0.468, y: dimensions.heroBottom + aboutH * 0.52 };
    const cp2_about = { x: p2.x - W * 0.008, y: p2.y - dY_about * 0.5 };

    // P3: Bottom of About / Top of Facilities
    const p3 = { x: W * 0.430, y: dimensions.aboutBottom };
    const cp3_about = { x: p2.x + W * 0.008, y: p2.y + dY_about * 0.5 };
    const cp4_about = { x: p3.x + W * 0.010, y: p3.y - dY_about * 0.5 };

    // P4: Facilities Mid (sweeps across bento negative space)
    const facH = dimensions.facilitiesBottom - dimensions.aboutBottom;
    const p4 = { x: W * 0.525, y: dimensions.aboutBottom + facH * 0.5 };

    // P5: Facilities Bottom / Methodology Top
    const p5 = { x: W * 0.440, y: dimensions.facilitiesBottom };

    // P6: Methodology Bottom / Membership Top
    const methH = dimensions.methodologyBottom - dimensions.facilitiesBottom;
    const p6 = { x: W * 0.395, y: dimensions.methodologyBottom };

    // P7: Membership Mid (sweeps toward the popular Quarterly card)
    const memH = dimensions.membershipBottom - dimensions.methodologyBottom;
    const p7 = { x: W * 0.520, y: dimensions.methodologyBottom + memH * 0.5 };

    // P8: Membership Bottom / Trainers Top
    const p8 = { x: W * 0.445, y: dimensions.membershipBottom };

    // P9: Trainers Bottom / Gallery Top
    const trainH = dimensions.trainersBottom - dimensions.membershipBottom;
    const p9 = { x: W * 0.410, y: dimensions.trainersBottom };

    // P10: Gallery Mid
    const gallH = dimensions.galleryBottom - dimensions.trainersBottom;
    const p10 = { x: W * 0.510, y: dimensions.trainersBottom + gallH * 0.5 };

    // P11: Gallery Bottom / Contact Top
    const p11 = { x: W * 0.460, y: dimensions.galleryBottom };

    // P12: Contact Bottom / Page End
    const p12 = { x: W * 0.490, y: dimensions.totalHeight };

    // Build smooth primary path
    const path = `
      M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}
      L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}
      C ${cp1_about.x.toFixed(1)} ${cp1_about.y.toFixed(1)}, ${cp2_about.x.toFixed(1)} ${cp2_about.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}
      C ${cp3_about.x.toFixed(1)} ${cp3_about.y.toFixed(1)}, ${cp4_about.x.toFixed(1)} ${cp4_about.y.toFixed(1)}, ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}
      S ${W * 0.45} ${dimensions.aboutBottom + facH * 0.25}, ${p4.x.toFixed(1)} ${p4.y.toFixed(1)}
      S ${W * 0.50} ${dimensions.aboutBottom + facH * 0.75}, ${p5.x.toFixed(1)} ${p5.y.toFixed(1)}
      S ${W * 0.40} ${dimensions.facilitiesBottom + methH * 0.5}, ${p6.x.toFixed(1)} ${p6.y.toFixed(1)}
      S ${W * 0.46} ${dimensions.methodologyBottom + memH * 0.25}, ${p7.x.toFixed(1)} ${p7.y.toFixed(1)}
      S ${W * 0.48} ${dimensions.methodologyBottom + memH * 0.75}, ${p8.x.toFixed(1)} ${p8.y.toFixed(1)}
      S ${W * 0.41} ${dimensions.membershipBottom + trainH * 0.5}, ${p9.x.toFixed(1)} ${p9.y.toFixed(1)}
      S ${W * 0.47} ${dimensions.trainersBottom + gallH * 0.25}, ${p10.x.toFixed(1)} ${p10.y.toFixed(1)}
      S ${W * 0.48} ${dimensions.trainersBottom + gallH * 0.75}, ${p11.x.toFixed(1)} ${p11.y.toFixed(1)}
      L ${p12.x.toFixed(1)} ${p12.y.toFixed(1)}
    `;

    // Secondary parallel path offset by fixed horizontal delta (SOLID, NOT DOTTED)
    const secPath = `
      M ${(p0.x + offset).toFixed(1)} ${p0.y.toFixed(1)}
      L ${(p1.x + offset).toFixed(1)} ${p1.y.toFixed(1)}
      C ${(cp1_about.x + offset).toFixed(1)} ${cp1_about.y.toFixed(1)}, ${(cp2_about.x + offset).toFixed(1)} ${cp2_about.y.toFixed(1)}, ${(p2.x + offset).toFixed(1)} ${p2.y.toFixed(1)}
      C ${(cp3_about.x + offset).toFixed(1)} ${cp3_about.y.toFixed(1)}, ${(cp4_about.x + offset).toFixed(1)} ${cp4_about.y.toFixed(1)}, ${(p3.x + offset).toFixed(1)} ${p3.y.toFixed(1)}
      S ${(W * 0.45 + offset).toFixed(1)} ${dimensions.aboutBottom + facH * 0.25}, ${(p4.x + offset).toFixed(1)} ${p4.y.toFixed(1)}
      S ${(W * 0.50 + offset).toFixed(1)} ${dimensions.aboutBottom + facH * 0.75}, ${(p5.x + offset).toFixed(1)} ${p5.y.toFixed(1)}
      S ${(W * 0.40 + offset).toFixed(1)} ${dimensions.facilitiesBottom + methH * 0.5}, ${(p6.x + offset).toFixed(1)} ${p6.y.toFixed(1)}
      S ${(W * 0.46 + offset).toFixed(1)} ${dimensions.methodologyBottom + memH * 0.25}, ${(p7.x + offset).toFixed(1)} ${p7.y.toFixed(1)}
      S ${(W * 0.48 + offset).toFixed(1)} ${dimensions.methodologyBottom + memH * 0.75}, ${(p8.x + offset).toFixed(1)} ${p8.y.toFixed(1)}
      S ${(W * 0.41 + offset).toFixed(1)} ${dimensions.membershipBottom + trainH * 0.5}, ${(p9.x + offset).toFixed(1)} ${p9.y.toFixed(1)}
      S ${(W * 0.47 + offset).toFixed(1)} ${dimensions.trainersBottom + gallH * 0.25}, ${(p10.x + offset).toFixed(1)} ${p10.y.toFixed(1)}
      S ${(W * 0.48 + offset).toFixed(1)} ${dimensions.trainersBottom + gallH * 0.75}, ${(p11.x + offset).toFixed(1)} ${p11.y.toFixed(1)}
      L ${(p12.x + offset).toFixed(1)} ${p12.y.toFixed(1)}
    `;

    return { primaryPath: path, secondaryPath: secPath };
  }, [dimensions]);

  // Traveling beam stops based on user active scroll
  const glowCenter = Math.round(scrollProgress * 100);
  const glowStart = Math.max(0, glowCenter - 7);
  const glowEnd = Math.min(100, glowCenter + 7);

  return (
    <div
      className="hidden lg:block absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.totalHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Kinetic Traveling Gradient along path */}
          <linearGradient id="travelingBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#25BDF2" stopOpacity="0.35" />
            <stop offset={`${Math.max(0, glowStart - 5)}%`} stopColor="#25BDF2" stopOpacity="0.45" />
            <stop offset={`${glowStart}%`} stopColor="#25BDF2" stopOpacity="0.75" />
            <stop offset={`${glowCenter}%`} stopColor="#7ee7fc" stopOpacity="0.9" />
            <stop offset={`${glowEnd}%`} stopColor="#25BDF2" stopOpacity="0.75" />
            <stop offset={`${Math.min(100, glowEnd + 5)}%`} stopColor="#25BDF2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#25BDF2" stopOpacity="0.3" />
          </linearGradient>

          {/* Secondary Solid Accent Line Gradient */}
          <linearGradient id="secondaryBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#25BDF2" stopOpacity="0.12" />
            <stop offset={`${glowCenter}%`} stopColor="#25BDF2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#25BDF2" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Ambient Soft Glow Layer (Tight, non-glaring depth) */}
        <path
          d={primaryPath}
          fill="none"
          stroke="#25BDF2"
          strokeWidth="10"
          strokeOpacity="0.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Secondary Parallel Solid Accent Line (Substantial athletic guide) */}
        <path
          d={secondaryPath}
          fill="none"
          stroke="url(#secondaryBeam)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Primary Precision Cyan Beam (Bold, heavy weight with subtle tight glow) */}
        <path
          d={primaryPath}
          fill="none"
          stroke="url(#travelingBeam)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(37, 189, 242, 0.45))'
          }}
        />
      </svg>
    </div>
  );
}
