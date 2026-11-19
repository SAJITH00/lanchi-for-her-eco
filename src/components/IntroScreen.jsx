import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import introImage from '../assets/images/mkdlanchi.jpg';

const INTRO_STORAGE_KEY = 'lanchi_intro_seen_v1';

export default function IntroScreen() {
  // Check localStorage once on initial boot
  const [shouldShow, setShouldShow] = useState(() => {
    try {
      if (typeof window === 'undefined') return false;
      const seen = localStorage.getItem(INTRO_STORAGE_KEY);
      if (seen) return false;
      // If user prefers reduced motion, skip intro and mark seen immediately
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        localStorage.setItem(INTRO_STORAGE_KEY, 'true');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });

  const introRef = useRef(null);
  const timelineRef = useRef(null);

  // Complete and save flag in localStorage
  const finishIntro = () => {
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch (e) {
      // Storage unavailable or private browsing mode
    }
    setShouldShow(false);
  };

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (introRef.current) {
      gsap.to(introRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: finishIntro
      });
    } else {
      finishIntro();
    }
  };

  useEffect(() => {
    if (!shouldShow || !introRef.current) return;

    const ctx = gsap.context(() => {
      const container = introRef.current;

      // Initial visual states
      gsap.set(container, { opacity: 1, visibility: 'visible' });
      gsap.set('.intro-img', { scale: 1.08, opacity: 0 });
      gsap.set('.intro-overlay', { opacity: 0 });
      gsap.set('.intro-brand-box', { autoAlpha: 0, y: 24 });
      gsap.set('.intro-divider', { scaleX: 0 });
      gsap.set('.intro-skip-btn', { autoAlpha: 0 });

      // Orchestrate exactly ~2.0s luxury intro animation
      const tl = gsap.timeline({
        onComplete: finishIntro
      });

      timelineRef.current = tl;

      tl
        // 1. Smooth image fade-in and gentle zoom (0.0s -> 1.4s)
        .to('.intro-img', {
          opacity: 1,
          scale: 1,
          duration: 1.35,
          ease: 'power2.out'
        }, 0)
        // 2. Ambient dark luxury vignette reveal
        .to('.intro-overlay', {
          opacity: 1,
          duration: 0.8,
          ease: 'power1.out'
        }, 0)
        // 3. Skip button reveal
        .to('.intro-skip-btn', {
          autoAlpha: 1,
          duration: 0.4
        }, 0.15)
        // 4. Brand text reveal
        .to('.intro-brand-box', {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out'
        }, 0.25)
        // 5. Gold divider line expands
        .to('.intro-divider', {
          scaleX: 1,
          duration: 0.55,
          ease: 'power2.inOut'
        }, 0.45)
        // 6. Hold for aesthetic appreciation
        .to({}, { duration: 0.35 })
        // 7. Premium fade-out transition into website (~0.5s)
        .to(container, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        });

    }, introRef);

    return () => {
      ctx.revert();
    };
  }, [shouldShow]);

  // If already seen, render absolutely nothing
  if (!shouldShow) return null;

  return (
    <div
      ref={introRef}
      className="intro-screen fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden bg-[#180E09] selection:bg-[#EBBB83]/30"
      aria-label="Welcome to LANCHI FOR HER"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Brand Image - mkdlanchi.jpg */}
      <img
        src={introImage}
        alt="LANCHI FOR HER Atelier"
        className="intro-img absolute inset-0 size-full object-cover object-center will-change-transform"
      />

      {/* Editorial Luxury Overlay */}
      <div className="intro-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="intro-skip-btn absolute right-6 top-6 z-20 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md transition hover:border-[#EBBB83] hover:text-[#EBBB83] active:scale-95"
      >
        Skip
        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
      </button>

      {/* Center Brand Identity */}
      <div className="intro-brand-box relative z-10 mx-auto max-w-lg px-6 text-center text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#EBBB83] sm:text-xs">
          The Art of Modest Fashion
        </p>

        <h1 className="mt-3 font-serif text-4xl font-normal tracking-[0.14em] text-[#FAF6F0] sm:text-6xl md:text-7xl">
          LANCHI <span className="font-light italic text-[#EBBB83]">FOR HER</span>
        </h1>

        <div className="intro-divider mx-auto my-5 h-px w-28 bg-gradient-to-r from-transparent via-[#EBBB83] to-transparent origin-center" />

        <p className="font-serif text-sm italic tracking-widest text-[#E3D3C6] sm:text-base">
          Elegance Begins at Your Doorstep
        </p>

        <div className="mt-7 flex items-center justify-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-[#EBBB83]/70 animate-pulse" />
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#C4B2A5]">Atelier 2026</span>
          <span className="inline-block size-1.5 rounded-full bg-[#EBBB83]/70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
