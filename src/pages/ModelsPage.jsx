import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

// Register ScrollTrigger once. Safe if this module is imported more than once.
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    id: 1, productId: 101, collectionNo: 'THE COLLECTION / 2026 · LOOK 01',
    dressName: 'The Terra Pleated Maxi Gown', category: 'Atelier Runway', modelName: 'Nadia El-Amine',
    price: 1899, oldPrice: 2499, fabric: 'Viscose Crepe & Metallic Weave',
    description: 'A statuesque flowing silhouette in rich terracotta with micro-pleated tiers and delicate copper gold thread accents, crafted for effortless evening poise.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsBjbtH27yd7tD4JhCkl8M7omNrAfBYhRTyrZyZjsoU5rAzFeBhux-gI81PkdMHBIA9_jVWwuLQk_uM0UEpVfuMncvw8tEoB_hV8OH7sLrPOD63J2yzA83tvkpVL_gQSEm60H0sVG9gvULEQSwfbVOkfrK6JJzrWU1mO6QyPapaLT8VML5gKukPy60T4CR2J-5t-VhY3y3iFnMzjMx84-lRUK1l5Igq-dgW_o7CuK9',
    colors: [{ name: 'Terracotta Rust', hex: '#8B5037' }, { name: 'Warm Sand', hex: '#EBBB83' }, { name: 'Dark Umber', hex: '#53433E' }],
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'Custom Tailored']
  },
  {
    id: 2, productId: 1, collectionNo: 'THE COLLECTION / 2026 · LOOK 02',
    dressName: 'Sand Draped Atelier Abaya', category: 'Resort Monochrome', modelName: 'Soraya Bakir',
    price: 1849, oldPrice: 2499, fabric: 'Belgian Linen Blend',
    description: 'Sculptural bell sleeve abaya cut from fine Belgian linen blend, providing quiet dignity, generous modest drape, and gentle breathability.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmcpF32WY7su9949Pg9rz5cU2NB-7701Z2Q2ui0dYnk1rdXFE6szCjH5-xsJvMzhBUW182GqptupVsUqB1KLEHQhON4v78nB4pJmyKtZZ1-40KFYU6nPjRfCVPSicJhkXORbzQfyL2GPb7Z_vJLovslUmUZgWH8i56Rvp_aETZ1qE3QsnvxD-_dvQeQCnkIk6AHijy4wGawZxweStVwSYI0mCfk5Qb8AXUL-D1AxW',
    colors: [{ name: 'Almond Sand', hex: '#E2D5C4' }, { name: 'Raw Ochre', hex: '#C29A64' }, { name: 'Rich Terracotta', hex: '#8B5037' }],
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'Custom Tailored']
  },
  {
    id: 3, productId: 4, collectionNo: 'THE COLLECTION / 2026 · LOOK 03',
    dressName: 'The Celestial Satin Kaftan', category: 'Ceremonial Silks', modelName: 'Fatima Al-Sayed',
    price: 2799, oldPrice: 3899, fabric: '100% Mulberry Silk Satin',
    description: 'Ethereal cascading sleeves in heavy champagne mulberry silk satin with a fluid liquid sheen. Designed for celebration and timeless luxury.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGLHAF463pX1aRsLYd06lh-PSZ_fMa-BIPainu8Fpa4WhLmS0nzJpbKLXo4LH8voNvmfuvywcxyVjlB-SiaiLQnLtcbIF7jZGkoMOM6rusC-awGtURY5V5OxU1xte18v_hhm6wlcwxD-keN0ciiVdpzKRRuAh0ytXstLk42rJcJaf6LPZf4UtuEQDDOsiz0MlJELLWTV5o98k1GcLmsv65z9EZMxO3f-6P5P0Maw2z',
    colors: [{ name: 'Champagne Gold', hex: '#EBBB83' }, { name: 'Rose Taupe', hex: '#B89078' }, { name: 'Midnight Onyx', hex: '#222222' }],
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'Custom Tailored']
  },
  {
    id: 4, productId: 10, collectionNo: 'THE COLLECTION / 2026 · LOOK 04',
    dressName: 'Rose Gold Occasion Gown', category: 'Festive Edit', modelName: 'Amina Tariq',
    price: 2499, oldPrice: 3499, fabric: 'Textured Crepe & Gold Zari',
    description: 'Opulent modest dress with micro-pleated bishop sleeves, structured high neckline, and hand-stitched antique gold embroidery on cuffs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUo3_Cv0kZJves3UEt6QM8f9Redb4Sirc-T4vROE192jsWQ1hfBJmUKkwz4gpv5ItRe352f4ghfWO9Ba0WnD4b2PCx2NX-rKnqem-c_Kwzh7BqOhu341GMSm_N1HibLp-4uy0OkC0Yhfe7iPne7rj0pDFzJMehuaZzeUNFFJeF7yudhhKDhUNfMMCxfsLLGP3XQ40DjIXrFPZ-tAATsJR0QFU5rkyfdKnhzpKqkSXb',
    colors: [{ name: 'Rose Gold', hex: '#D8A48F' }, { name: 'Terracotta', hex: '#8B5037' }, { name: 'Deep Bronze', hex: '#583D32' }],
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'Custom Tailored']
  },
  {
    id: 5, productId: 9, collectionNo: 'THE COLLECTION / 2026 · LOOK 05',
    dressName: 'Korean Minimal Tiered Robe', category: 'Studio Minimalism', modelName: 'Hana Belkacem',
    price: 1299, oldPrice: 1899, fabric: 'Fluid Crepe & Cotton Voile',
    description: 'Clean architectural lines tailored in pale almond crepe. A lightweight, breathable staple engineered for serene daily grace.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuAq2x_TtFovhtyeipGWEUflS1EgDSJkR7t77gjpR0Lx_RjHxliv_B78gfBmzTDnPxwt7i5PQly6jEikO4yWSyX3LA7KsfQsRPbFml50L-a0Z2JcPhjNAXrA9ePGQ4wT7VjHxfE1cnqk9aOgh-ZlnBqmv6Hx7eOQVey_y60_T0i1BSupgVI9tkJN0xYTEAplVy6rXc9GEDDMifa_EgTPkxDntJgQjI6xfEtOb40Tzs',
    colors: [{ name: 'Pale Almond', hex: '#F0E7DE' }, { name: 'Warm Clay', hex: '#8B5037' }, { name: 'Muted Olive', hex: '#7D8065' }],
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'Custom Tailored']
  },
  {
    id: 6, productId: 101, collectionNo: 'THE COLLECTION / 2026 · LOOK 06',
    dressName: 'The Terra Flora Silk Abaya', category: 'Signature Atelier', modelName: 'Zara Qureshi',
    price: 1899, oldPrice: 2599, fabric: 'Handloom Silk Georgette',
    description: 'Layered terracotta and champagne silk abaya draped with quiet majesty, hand-finished in our master artisan atelier.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBmSkZQzPhKslodhBX1Kmp6iT5KZZ31b__GLRuuxh8Jst1_vvANBZRT1LgvhsSBr8MXpL7bsO63BiuuepL_JO7PmOvhZuU2VTyQtSmzGknf0lpeMxZIrdolcgefthI6UQM_O-NYtRlBqfBMuZiSxLPwCHtF1bT6PIVGZuOuYIduK4C6oaBN8flvIxbiqS3Flm5b3SbwK04Er1zQE_l6zo32v1U2G4zU5fJzReQN7Eq',
    colors: [{ name: 'Signature Terracotta', hex: '#8B5037' }, { name: 'Champagne Beige', hex: '#EBBB83' }, { name: 'Midnight Onyx', hex: '#1C1C1A' }],
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'Custom Tailored']
  }
];

const money = (value) => `₹${value.toLocaleString('en-IN')}`;

export default function ModelsPage() {
  const { addToCart, showToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(models[0].colors[0].name);
  const [selectedSize, setSelectedSize] = useState('M (38")');
  const [isAnimating, setIsAnimating] = useState(false);

  const headingRef = useRef(null);
  const carouselRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const detailsRef = useRef(null);
  const campaignRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);

  const total = models.length;
  const currentModel = models[currentIndex];
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const prevModel = models[prevIndex];
  const nextModel = models[nextIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children || [], {
        y: 24, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out'
      });
      gsap.utils.toArray('.model-reveal').forEach((element) => {
        gsap.from(element, {
          y: 45, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true }
        });
      });
      gsap.from('.campaign-copy > *', {
        y: 28, opacity: 0, duration: 0.8, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: campaignRef.current, start: 'top 75%', once: true }
      });
    });
    return () => ctx.revert();
  }, []);

  // Animate the newly-rendered three cards after the index changes.
  useEffect(() => {
    if (!carouselRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(leftCardRef.current,
        { x: -18, scale: 0.91, opacity: 0.62, filter: 'blur(1.2px)' },
        { x: 0, scale: 0.91, opacity: 0.78, filter: 'blur(0.6px)', duration: 0.55, ease: 'power3.out' }
      );
      gsap.fromTo(centerCardRef.current,
        { y: 16, scale: 0.96, opacity: 0.55, filter: 'blur(1px)' },
        { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }
      );
      gsap.fromTo(rightCardRef.current,
        { x: 18, scale: 0.91, opacity: 0.62, filter: 'blur(1.2px)' },
        { x: 0, scale: 0.91, opacity: 0.78, filter: 'blur(0.6px)', duration: 0.55, ease: 'power3.out' }
      );
      gsap.fromTo(detailsRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
      );
    }, carouselRef);
    return () => ctx.revert();
  }, [currentIndex]);

  useEffect(() => {
    setSelectedColor(currentModel.colors[0].name);
    setSelectedSize('M (38")');
  }, [currentIndex]);

  const goToIndex = useCallback((newIndex, direction = 'next') => {
    if (animatingRef.current || newIndex === currentIndexRef.current) return;
    animatingRef.current = true;
    setIsAnimating(true);

    const outgoingX = direction === 'next' ? -24 : 24;
    const timeline = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = newIndex;
        setCurrentIndex(newIndex);
        animatingRef.current = false;
        setIsAnimating(false);
      }
    });

    // Animate each card independently. No CSS translateX and GSAP transform conflict.
    timeline.to(centerCardRef.current, {
      x: outgoingX, y: -8, scale: 0.96, opacity: 0, filter: 'blur(3px)',
      duration: 0.28, ease: 'power2.in'
    }, 0);
    timeline.to([leftCardRef.current, rightCardRef.current], {
      opacity: 0.25, duration: 0.22, ease: 'power1.out'
    }, 0);
    timeline.to(detailsRef.current, { y: 8, opacity: 0, duration: 0.2 }, 0);
  }, []);

  const handleNext = useCallback(() => {
    const next = (currentIndexRef.current + 1) % total;
    goToIndex(next, 'next');
  }, [goToIndex, total]);

  const handlePrev = useCallback(() => {
    const prev = (currentIndexRef.current - 1 + total) % total;
    goToIndex(prev, 'prev');
  }, [goToIndex, total]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  const handleTouchStart = (event) => { touchStartX.current = event.touches[0].clientX; };
  const handleTouchMove = (event) => { touchEndX.current = event.touches[0].clientX; };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) handleNext();
    if (distance < -45) handlePrev();
  };

  const handleShopThisLook = () => {
    addToCart({
      id: currentModel.productId,
      name: currentModel.dressName,
      price: currentModel.price,
      oldPrice: currentModel.oldPrice,
      image: currentModel.image
    }, selectedSize, selectedColor, 1);
    showToast(`Added "${currentModel.dressName}" to your shopping bag!`, 'success');
  };

  const discount = Math.round((1 - currentModel.price / currentModel.oldPrice) * 100);

  return (
    <main className="models-page min-h-screen overflow-hidden bg-[#FAF7F2] text-[#29221E] selection:bg-[#FFDDB8] selection:text-[#8B5037]">
      <style>{`
        .models-page { --model-brown:#8B5037; --model-gold:#C29A64; --model-line:#E8E0D7; }
        .models-page button:focus-visible, .models-page a:focus-visible { outline:2px solid #8B5037; outline-offset:4px; }
        .model-carousel-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(320px,500px) minmax(0,1fr); align-items:center; gap:clamp(12px,3vw,38px); }
        .model-card { position:relative; width:100%; aspect-ratio:3/4; overflow:hidden; border-radius:18px; background:#eee5dc; }
        .model-card img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .model-side-card { max-width:300px; justify-self:center; cursor:pointer; box-shadow:0 18px 45px rgba(65,43,30,.10); }
        .model-main-card { box-shadow:0 28px 70px rgba(65,43,30,.18); border:5px solid rgba(255,255,255,.78); }
        /* Product details image: compact, centered and fully visible on desktop. */
        .model-detail-layout { grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr); align-items:center; }
        .model-detail-image {
          width:100%; max-width:440px; height:min(100%,500px); aspect-ratio:4/5;
          min-height:0; max-height:500px; align-self:center; justify-self:center;
          display:flex; align-items:center; justify-content:center;
          background:#F0E9E1;
        }
        .model-detail-image img {
          width:100%; height:100%; min-height:0; max-height:none;
          object-fit:contain; object-position:center; display:block;
        }
        .model-color-dot { width:31px; height:31px; border-radius:999px; border:2px solid white; box-shadow:0 0 0 1px #d9cec3; transition:transform .2s, box-shadow .2s; }
        .model-color-dot[aria-pressed="true"] { box-shadow:0 0 0 2px #8B5037; transform:scale(1.12); }
        .model-size-btn { min-width:48px; border:1px solid #e4d9cf; border-radius:7px; padding:10px 12px; font-size:12px; transition:all .2s; }
        .model-size-btn[aria-pressed="true"] { background:#8B5037; color:#fff; border-color:#8B5037; }
        .model-size-btn:hover:not([aria-pressed="true"]) { border-color:#8B5037; }
        .model-progress { height:2px; background:#8B5037; transform-origin:left center; }
        @media(max-width:767px) {
          .model-carousel-grid { grid-template-columns:minmax(0,1fr); gap:0; }
          .model-side-card { display:none; }
          .model-main-card { width:min(86vw,420px); margin-inline:auto; }
          /* Match the details image to the main model image size on phones. */
          .model-detail-layout { grid-template-columns:minmax(0,1fr); }
          .model-detail-image {
            width:min(86vw,420px); max-width:420px; height:auto; min-height:0;
            max-height:none; aspect-ratio:3/4; margin-inline:auto;
          }
          .model-detail-image img {
            width:100%; height:100%; min-height:0; max-height:none;
            aspect-ratio:3/4; object-fit:contain; object-position:center;
          }
        }
        @media(prefers-reduced-motion:reduce) {
          .models-page *, .models-page *::before, .models-page *::after { scroll-behavior:auto !important; transition-duration:.01ms !important; }
        }
      `}</style>

      {/* Intro */}
      <section ref={headingRef} className="mx-auto max-w-5xl px-5 pb-5 pt-14 text-center sm:pt-20">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.3em] text-[#9A7047]">LANCHI FOR HER · THE COLLECTION 2026</p>
        <h1 className="font-display text-4xl font-medium leading-tight tracking-tight text-[#30251F] sm:text-5xl lg:text-6xl">Elegance in Every Thread</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#78685D] sm:text-base">Discover timeless modest fashion, thoughtfully designed for confidence, comfort and everyday elegance.</p>
        <div className="mx-auto mt-7 h-px w-16 bg-[#C29A64]" />
      </section>

      {/* Carousel */}
      <section
        ref={carouselRef}
        className="mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pt-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mx-auto mb-7 flex max-w-4xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#8B5037]">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-[#D8C8B9]" />
            <span className="text-[#9C9086]">{String(total).padStart(2, '0')}</span>
          </div>
          <span className="rounded-full border border-[#E8E0D7] bg-white/80 px-4 py-2 text-[9px] font-semibold uppercase tracking-[.18em] text-[#8B6847]">{currentModel.category}</span>
          <div className="flex gap-2">
            <button type="button" onClick={handlePrev} disabled={isAnimating} aria-label="Previous look" className="grid size-10 place-items-center rounded-full border border-[#DCCFC3] bg-white text-[#8B5037] transition hover:bg-[#8B5037] hover:text-white disabled:opacity-40">←</button>
            <button type="button" onClick={handleNext} disabled={isAnimating} aria-label="Next look" className="grid size-10 place-items-center rounded-full border border-[#DCCFC3] bg-white text-[#8B5037] transition hover:bg-[#8B5037] hover:text-white disabled:opacity-40">→</button>
          </div>
        </div>

        <div className="model-carousel-grid mx-auto max-w-6xl">
          {/* Side cards live in their own grid columns: they cannot overlap the main image. */}
          <button ref={leftCardRef} type="button" onClick={handlePrev} disabled={isAnimating} className="model-card model-side-card group hidden md:block" aria-label={`Previous look: ${prevModel.dressName}`}>
            <img src={prevModel.image} alt={prevModel.dressName} loading="lazy" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-left text-white">
              <span className="block text-[9px] uppercase tracking-[.2em] text-[#F4D7B7]">Previous look</span>
              <span className="mt-1 block truncate font-display text-sm">{prevModel.dressName}</span>
            </span>
          </button>

          <div ref={centerCardRef} className="model-card model-main-card relative mx-auto w-full max-w-[500px]">
            <img src={currentModel.image} alt={currentModel.dressName} fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-[#76543A] shadow-sm">{currentModel.modelName}</span>
            <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-2 font-sans text-sm font-bold text-[#8B5037] shadow tabular-nums">{money(currentModel.price)}</span>
          </div>

          <button ref={rightCardRef} type="button" onClick={handleNext} disabled={isAnimating} className="model-card model-side-card group hidden md:block" aria-label={`Next look: ${nextModel.dressName}`}>
            <img src={nextModel.image} alt={nextModel.dressName} loading="lazy" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-left text-white">
              <span className="block text-[9px] uppercase tracking-[.2em] text-[#F4D7B7]">Next look</span>
              <span className="mt-1 block truncate font-display text-sm">{nextModel.dressName}</span>
            </span>
          </button>
        </div>

        <div className="mx-auto mt-7 flex max-w-sm items-center justify-center gap-2" aria-label="Choose a look">
          {models.map((model, index) => (
            <button key={model.id} type="button" onClick={() => goToIndex(index, index > currentIndex ? 'next' : 'prev')} disabled={isAnimating} aria-label={`Go to look ${index + 1}`} aria-current={currentIndex === index ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-9 bg-[#8B5037]' : 'w-2 bg-[#DCCFC3] hover:bg-[#B89078]'}`} />
          ))}
        </div>
        <p className="mt-3 text-center text-[9px] uppercase tracking-[.2em] text-[#A09287]">Use arrows or swipe to explore</p>
      </section>

      {/* Dedicated product showcase */}
      <section ref={detailsRef} className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-24">
        <div className="mb-7 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#9A7047]">A closer look</p>
          <h2 className="mt-2 font-display text-3xl text-[#30251F] sm:text-4xl">The details matter.</h2>
        </div>

        <div className="model-detail-layout grid overflow-hidden rounded-2xl border border-[#E8E0D7] bg-white shadow-[0_22px_65px_rgba(67,45,30,.07)]">
          <div className="model-detail-image relative overflow-hidden bg-[#F0E9E1]">
            <img src={currentModel.image} alt={`${currentModel.dressName} full view`} loading="lazy" />
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[9px] font-semibold uppercase tracking-[.18em] text-[#79583D]">LANCHI EDITION 2026</span>
            <span className="absolute bottom-5 left-5 rounded-full bg-[#8B5037] px-4 py-2 text-[9px] font-semibold uppercase tracking-[.16em] text-white">{currentModel.category}</span>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#A17A53]">{currentModel.collectionNo}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-[#30251F] sm:text-4xl">{currentModel.dressName}</h3>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.15em] text-[#8B5037]">{currentModel.fabric}</p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#796B61]">{currentModel.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-sans text-3xl font-bold text-[#8B5037] tabular-nums">{money(currentModel.price)}</span>
              <span className="font-sans text-sm text-[#A79A90] line-through tabular-nums">{money(currentModel.oldPrice)}</span>
              <span className="font-sans rounded-full bg-[#F4E7D8] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#80552F] tabular-nums">{discount}% off</span>
            </div>

            <div className="my-7 h-px bg-[#EEE7E0]" />

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[.16em] text-[#514239]">Choose colour</label>
                <span className="text-xs text-[#8B5037]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {currentModel.colors.map((color) => (
                  <button key={color.name} type="button" className="model-color-dot" style={{ backgroundColor: color.hex }} onClick={() => setSelectedColor(color.name)} aria-label={color.name} aria-pressed={selectedColor === color.name} title={color.name} />
                ))}
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="text-[10px] font-bold uppercase tracking-[.16em] text-[#514239]">Select your size</label>
                <span className="text-xs text-[#8B5037]">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentModel.sizes.map((size) => (
                  <button key={size} type="button" className="model-size-btn" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size}>{size}</button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={handleShopThisLook} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#8B5037] px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-white transition hover:bg-[#70402D] active:scale-[.98]">
                <span aria-hidden="true">＋</span> Add to bag
              </button>
              <Link to="/product" className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#8B5037] px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#8B5037] transition hover:bg-[#8B5037] hover:text-white">
                View product <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="mt-4 text-center text-[9px] tracking-wide text-[#9A8D82]">Thoughtfully selected · Made for your every moment</p>
          </div>
        </div>
      </section>

      {/* Brand campaign */}
      <section ref={campaignRef} className="model-reveal relative my-8 overflow-hidden border-y border-[#E8E0D7] bg-[#EEE7DF] sm:my-16">
        <div className="relative min-h-[430px] sm:min-h-[500px]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Pc8L6PCpVcA363u_gEclx5mDO6mA2XaayU1duEAOuEds97alaPmcnUlNCO8kC_GsJ6St8i6VItHqD5zQJZrMCNztANpyitlre-Vi_eQ2nTs8fUjJYVxPtd4tPbzW368TqbHGeswzYoYCoK-LFKwaPnPYWV7saFI_Zgsd5guyy2u89S6Aw7_uEqnswC8RXgJ68Sk6jJ6i1NVNW5MB39K4DlPBUcNtibtxUQNl4kUj"
            alt="LANCHI FOR HER editorial campaign" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/75 to-[#FAF7F2]/10" />
          <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-6 py-16 sm:min-h-[500px] sm:px-12">
            <div className="campaign-copy max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#8B6847]">LANCHI ATELIER CAMPAIGN</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-[#30251F] sm:text-5xl">Made for your every moment.</h2>
              <div className="my-6 h-0.5 w-14 bg-[#8B5037]" />
              <p className="mb-8 max-w-md text-sm leading-7 text-[#6F6056]">Quiet luxury woven with artisanal care for modern silhouettes. Designed to embrace modesty without sacrificing majesty.</p>
              <Link to="/category" className="inline-flex items-center gap-3 rounded-full bg-[#8B5037] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[.15em] text-white transition hover:bg-[#70402D]">Explore collection <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
