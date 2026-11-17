
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import splashImage from '../assets/images/mkdlanchi.jpg';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();

  const homeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All new');

  const filterPills = [
    'All new',
    'Silk abayas',
    'Co-ord sets',
    'Summer tunics',
    'Festive edit'
  ];

  const filteredProducts =
    selectedFilter === 'All new'
      ? products
      : products.filter(p => p.category === selectedFilter);

  // =========================================
  // GSAP ANIMATIONS
  // =========================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.home-content', { autoAlpha: 0 });

      // Splash screen animation
      const loader = gsap.timeline({
        onComplete: () => setIsLoading(false)
      });

      loader
        .fromTo(
          '.splash-image',
          { scale: 1.15 },
          { scale: 1, duration: 1.5, ease: 'power2.out' }
        )
        .fromTo(
          '.splash-logo',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.splash-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
          '-=0.5'
        )
        .to('.splash-content', {
          y: -30,
          autoAlpha: 0,
          duration: 0.45
        })
        .to('.splash-screen', {
          yPercent: -100,
          duration: 1.1,
          ease: 'power4.inOut'
        })
        .to('.home-content', {
          autoAlpha: 1,
          duration: 0.5
        }, '-=0.65');

      // Hero animation
      const hero = gsap.timeline({
        delay: 0.2,
        defaults: { ease: 'power3.out' }
      });

      hero
        .fromTo(
          '.hero-tag',
          { y: 25, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 }
        )
        .fromTo(
          '.hero-title',
          { y: 70, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1 }
        )
        .fromTo(
          '.hero-description',
          { y: 35, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-buttons',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-stats > div',
          { y: 25, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.15
          },
          '-=0.4'
        )
        .fromTo(
          '.hero-image',
          { scale: 1.15, autoAlpha: 0, x: 50 },
          {
            scale: 1,
            autoAlpha: 1,
            x: 0,
            duration: 1.3,
            ease: 'power2.out'
          },
          '-=1.3'
        )
        .fromTo(
          '.hero-product-label',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          '-=0.5'
        );

      // Hero image floating movement
      gsap.to('.hero-image', {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // General scroll reveal animations
      gsap.utils.toArray('.reveal-up').forEach(element => {
        gsap.fromTo(
          element,
          {
            y: 65,
            autoAlpha: 0
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Promo cards
      gsap.fromTo(
        '.promo-card',
        {
          y: 90,
          autoAlpha: 0,
          scale: 0.95
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.promo-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Category cards stagger animation
      gsap.fromTo(
        '.category-card',
        {
          y: 80,
          autoAlpha: 0,
          scale: 0.92
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.7,
            from: 'start'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.category-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // New arrival heading
      gsap.fromTo(
        '.arrival-heading',
        { x: -70, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.arrival-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Product card entrance
      gsap.fromTo(
        '.product-card',
        {
          y: 100,
          autoAlpha: 0,
          scale: 0.94
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Testimonials animation
      gsap.fromTo(
        '.testimonial-card',
        { y: 65, autoAlpha: 0, rotateX: 8 },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Brand story
      gsap.fromTo(
        '.story-content > *',
        {
          y: 55,
          autoAlpha: 0
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Background decorative movement
      gsap.to('.story-decoration', {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: '.brand-story',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Refresh measurements after images load
      ScrollTrigger.refresh();

    }, homeRef);

    return () => ctx.revert();
  }, []);

  // =========================================
  // CATEGORY DATA
  // =========================================

  const categories = [
    {
      title: 'Modest abayas',
      count: '28 designs',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKQUP0mS3fgYLgNb9MnhJYaqEmyt2ACGqF_xC5HUEwWU4r3xU0-tRdsb-IkSO2dw-OltJ6jyUMxKFnj3JcmDpWihCD6bED6pl8y3dUcF0WENL4ny-1eytJAq9vw0Msmxdjm5MmmdTX-bKZkUNZWtR5tPPUx2o_xZF1cZL5rn_Lr_obZPT50wDv-KnE9CDxdEcYpQJokAj7pfCunnhlQIsBjzTqfjXKoBu5nZeLZ_9A',
      cat: 'abaya'
    },
    {
      title: 'Hijabs & stoles',
      count: '42 essentials',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMOjHzYjeGd0KhQGzRTFsL2QBeCB1mnxq5b8nKfj8p-cBn5DEfb0hgg3jeG5G1IXh3FJdEFifRY6lgleRvZLJnmjtVX7aqRN0b9fYM1zpseFI__jcJivrJzRXTrN5edd_fO7vGfwuAvN-6RaaRWGknve6vZIKg6Zc5W0i7eh-pLl_GFRqxXYtfvp1TwSoEFiGAyMIuopg55BDG79Z0CQaZetY1FC7sn6hr5ahja1Lp',
      cat: 'hijab'
    },
    {
      title: 'Co-ord sets',
      count: '19 sets',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeMp58vz5fYhtL_wI8Lk5agCzXw1pkr1gZ_FYPWqsfYLiLpllZf-H-YQnx0sC9jIGbsiBFaeBhkpG25feV95PQ1d8YaAyFgoJlsAGaFhIXV6Bp94oPtaKZo0asjw1ZGNjPZuY_mAYbb011OPTM5vzO7leSF5mucFvlD3j3OUZXC32XMI7Oafp5FkOzDac0mGPkH08lxe41YYlRLO7iQQjcf-MDE-DiYNo7xE9Trhbn',
      cat: 'coord'
    },
    {
      title: 'Occasion wear',
      count: '15 pieces',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdYNKz2D9cBM6G6VBPddeJrtukGbBrrXHP1o0uv24EaGSCJ-6F3sCykpwjHp688fL4tnDdNQp3zepZllVvvr0jNcSPzNzxHvC9MUlyZwAO01o2EeAfDzRD4O8LQiW1fXDraW2Rk3hdQc2GDxbPyxoFEqwdXQvN1FOKu0wK2OGKa-SG6Y_dg4bYj51DhDu_BGt7molckAvtsxXxurs-el_vIpl-Md-FmuONzcpOY6OP',
      cat: 'occasion'
    },
    {
      title: 'Everyday tops',
      count: '34 styles',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMToA2-IKDPJToP5mjW2Amy5du9WH8G80kM-3xBEruIsyTvwrs4z2ZOHuKloOoittkW4iNfX0E20ysQUvFrf-PsJq4U_MSJ5rT4KRRl5EsNW5dh6pPlvWL_M6xTZgYxoNAgXiD3898VYZ_NqGa7yepRnCnspq_gT0Eh7VxlEysDdh7BJToDQyY-K_XT3cWA_QjrubLGDitdmje2QZPomx8jzKJnszNG7RlDdgj56Y',
      cat: 'kurti'
    }
  ];

  const testimonials = [
    {
      name: 'Layla K.',
      initials: 'LK',
      review: 'The Terra Flora silk abaya exceeded my expectations. The fabric drapes beautifully and feels incredibly comfortable.',
      product: 'The Terra Flora Silk Abaya'
    },
    {
      name: 'Zoya M.',
      initials: 'ZM',
      review: 'Co-ord sets with proper modest length are so rare. The terracotta set is timeless and very comfortable.',
      product: 'Terra Fluid Co-ord Set'
    },
    {
      name: 'Ayesha R.',
      initials: 'AR',
      review: 'The Korean tops are now a wardrobe staple. Prompt shipping and lovely packaging. Highly recommended!',
      product: 'Elegant Korean Top'
    }
  ];

  return (
    <div ref={homeRef} className="lanchi-home">

      {/* =====================================
          SPLASH / LOADING SCREEN
      ====================================== */}

      {isLoading && (
        <div className="splash-screen">
          <img
            src={splashImage}
            alt="LANCHI FOR HER"
            className="splash-image"
          />

          <div className="splash-overlay" />

          <div className="splash-content">
            <p className="splash-small">THE ART OF MODEST FASHION</p>

            <h1 className="splash-logo">
              LANCHI <span>FOR HER</span>
            </h1>

            <div className="splash-line" />

            <p className="splash-caption">Elegance in every detail</p>
          </div>

          <span className="splash-copyright">
            LANCHI FOR HER · 2026
          </span>
        </div>
      )}

      <main className="home-content">

        {/* =====================================
            HERO SECTION
        ====================================== */}

        <section id="home" className="hero-section border-b border-line bg-cream">
          <div className="container grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">

            <div className="lg:col-span-5">
              <p className="hero-tag mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-micro text-[#7C5728]">
                <span className="size-1.5 rounded-full bg-secondary" />
                New season collection 2026
              </p>

              <h1 className="hero-title font-display text-5xl font-semibold leading-tight text-ink lg:text-[56px] lg:leading-[64px]">
                Elegance <em className="font-normal text-primary">redefined</em> for every woman
              </h1>

              <p className="hero-description mt-6 max-w-lg text-base leading-relaxed text-umber">
                Serene luxury woven into modern silhouettes. Modest wardrobe staples designed with tactile silks, flowing linens and timeless grace.
              </p>

              <div className="hero-buttons mt-8 flex flex-wrap gap-4">
                <Link to="/product" className="luxury-button rounded-lg bg-primary px-7 py-3.5 text-[13px] font-semibold uppercase tracking-label text-white shadow-sm">
                  Shop collection
                </Link>

                <Link to="/models" className="luxury-button rounded-lg border border-primary px-7 py-3.5 text-[13px] font-semibold uppercase tracking-label text-primary">
                  Explore lookbook
                </Link>
              </div>

              <dl className="hero-stats mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
                <div>
                  <dd className="font-display text-xl font-semibold text-primary">Silk & linen</dd>
                  <dd className="text-xs text-muted">Breathable fabrics</dd>
                </div>
                <div>
                  <dd className="font-display text-xl font-semibold text-primary">Tailored</dd>
                  <dd className="text-xs text-muted">Modest drape</dd>
                </div>
                <div>
                  <dd className="font-display text-xl font-semibold text-primary">Artisan</dd>
                  <dd className="text-xs text-muted">Hand-finished</dd>
                </div>
              </dl>
            </div>

            <div className="relative lg:col-span-7">
              <div className="hero-image-wrapper relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-white shadow-ambient sm:aspect-[16/13] lg:aspect-[5/4]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBmSkZQzPhKslodhBX1Kmp6iT5KZZ31b__GLRuuxh8Jst1_vvANBZRT1LgvhsSBr8MXpL7bsO63BiuuepL_JO7PmOvhZuU2VTyQtSmzGknf0lpeMxZIrdolcgefthI6UQM_O-NYtRlBqfBMuZiSxLPwCHtF1bT6PIVGZuOuYIduK4C6oaBN8flvIxbiqS3Flm5b3SbwK04Er1zQE_l6zo32v1U2G4zU5fJzReQN7Eq"
                  alt="Model wearing a terracotta and champagne silk abaya"
                  className="size-full object-cover object-top"
                />

                <div className="hero-product-label absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-line bg-white/90 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-micro text-[#7C5728]">
                      Capsule exclusive
                    </p>
                    <p className="text-sm font-semibold">
                      The Terra Flora Silk Abaya
                    </p>
                  </div>
                  <p className="font-semibold text-primary">₹1,899</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            PROMO CARDS
        ====================================== */}

        <section className="container py-16">
          <div className="promo-grid grid grid-cols-1 gap-8 md:grid-cols-2">

            <div className="promo-card relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-xl bg-primary p-8 text-white shadow-ambient md:p-12">
              <div className="relative z-10 max-w-sm">
                <p className="mb-4 inline-flex rounded-full bg-secondary-fixed px-3 py-1 text-[11px] font-semibold uppercase text-[#2A1700]">
                  Festive edit
                </p>
                <h2 className="font-display text-3xl font-medium leading-snug md:text-4xl">
                  Luxury abayas & silks, up to 40% off
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#FFD0BE]">
                  Hand-embellished sleeves, breathable silk and beautiful designs for special occasions.
                </p>
              </div>

              <div className="relative z-10 mt-8">
                <Link to="/category?cat=abaya" className="luxury-button inline-flex rounded-full bg-white px-6 py-3 text-[13px] font-semibold uppercase text-primary">
                  Shop festive edit
                </Link>
              </div>
            </div>

            <div className="promo-card relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-cream p-8 text-ink shadow-ambient md:p-12">
              <div className="relative z-10 max-w-sm">
                <p className="mb-4 inline-flex rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase text-[#7C5728]">
                  Capsule 2026
                </p>
                <h2 className="font-display text-3xl font-medium leading-snug md:text-4xl">
                  Tactile neutrals & draped silhouettes
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-umber">
                  Organic linens and airy cotton co-ords designed for serene everyday comfort.
                </p>
              </div>

              <div className="relative z-10 mt-8">
                <Link to="/category?cat=coord" className="luxury-button inline-flex rounded-full bg-primary px-6 py-3 text-[13px] font-semibold uppercase text-white">
                  Discover capsule
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================
            CATEGORIES
        ====================================== */}

        <section className="container border-b border-line pb-16">
          <div className="mb-10 text-center reveal-up">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-micro text-[#7C5728]">
              Curated departments
            </p>
            <h2 className="font-display text-3xl font-medium md:text-4xl">
              Explore by collection
            </h2>
          </div>

          <ul className="category-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((catItem, idx) => (
              <li key={catItem.cat} className="category-card">
                <Link
                  to={`/category?cat=${catItem.cat}`}
                  className="category-link group flex flex-col items-center text-center"
                >
                  <span className="category-image relative block aspect-[4/5] w-full overflow-hidden border border-line bg-white shadow-sm">
                    <img
                      src={catItem.img}
                      alt={catItem.title}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                    <span className="category-overlay">
                      <span>Explore</span>
                    </span>
                  </span>

                  <span className="mt-4 font-semibold transition-colors group-hover:text-primary">
                    {catItem.title}
                  </span>
                  <span className="text-xs text-muted">{catItem.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* =====================================
            NEW ARRIVALS
        ====================================== */}

        <section id="new-arrivals" className="container border-b border-line py-20">

          <div className="arrival-heading mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3.5 py-1.5 text-[11px] font-semibold uppercase text-[#7C5728]">
                <span className="size-1.5 rounded-full bg-secondary" />
                Fresh drops · 2026
              </p>
              <h2 className="font-display text-4xl font-medium">
                New arrivals & latest drops
              </h2>
              <div className="mt-3 h-0.5 w-16 bg-primary" />
            </div>

            <p className="max-w-md text-sm leading-relaxed text-umber">
              Modest silhouettes in breathable silks, fluid linens and hand-dyed textures.
            </p>
          </div>

          {/* FILTERS */}

          <div role="group" aria-label="Filter new arrivals" className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
            {filterPills.map(pill => (
              <button
                key={pill}
                type="button"
                onClick={() => setSelectedFilter(pill)}
                className={`filter-pill shrink-0 rounded-full px-5 py-2 text-[11px] font-semibold uppercase transition ${selectedFilter === pill
                    ? 'bg-primary text-white shadow-sm'
                    : 'border border-line bg-white text-umber hover:border-primary hover:text-primary'
                  }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}

<ul className="product-grid grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">      
        {filteredProducts.map(product => {
              const inWish = isInWishlist(product.id);

              return (
                <li key={product.id} className="product-card group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-ambient">

                  <div className="product-image relative aspect-[3/4] overflow-hidden bg-cream">
                    <Link to="/product">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </Link>

                    <span className="absolute left-3 top-3 rounded-full bg-secondary-fixed px-2.5 py-1 text-[11px] font-semibold text-[#2A1700]">
                      {product.discount}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label={`Wishlist ${product.name}`}
                      className={`wishlist-button absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm ${inWish ? 'text-primary' : 'text-ink'
                        }`}
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        {inWish ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

                    <div className="product-quick-action">
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        <span className="material-symbols-outlined text-base">shopping_bag</span>
                        Quick add
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="flex items-center gap-1 text-xs">
                          <span className="material-symbols-outlined filled text-[16px] text-secondary">star</span>
                          <span className="font-semibold">{product.rating}</span>
                          <span className="text-muted">({product.reviewsCount})</span>
                        </p>

                        <div className="flex gap-1" aria-label="Available colours">
                          {product.colors.map((color, idx) => (
                            <span
                              key={idx}
                              className="size-3 rounded-full border border-line"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <Link to="/product">
                        <h3 className="font-semibold leading-snug transition-colors group-hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-1 text-xs text-muted">{product.fabric}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      <p>
                        <span className="font-semibold text-primary">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {' '}
                        <span className="ml-1 text-xs text-muted line-through">
                          ₹{product.oldPrice.toLocaleString('en-IN')}
                        </span>
                      </p>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="add-cart-button inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white"
                      >
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        Add
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {filteredProducts.length === 0 && (
            <p className="py-12 text-center text-sm text-muted">
              No products found in this collection.
            </p>
          )}

          <div className="mt-12 text-center reveal-up">
            <Link
              to="/category"
              className="luxury-button inline-flex items-center gap-2 rounded-lg border border-primary px-8 py-3.5 text-xs font-semibold uppercase text-primary"
            >
              Explore all collection pieces
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* =====================================
            TESTIMONIALS
        ====================================== */}

        <section className="bg-cream border-b border-line py-20">
          <div className="container">
            <div className="mb-10 text-center reveal-up">
              <p className="text-[11px] font-semibold uppercase tracking-micro text-[#7C5728]">
                Client testimonials
              </p>
              <h2 className="mt-1 font-display text-3xl font-medium">
                Loved by women across the globe
              </h2>
            </div>

            <div className="testimonial-grid grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-card flex flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-ambient">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-secondary-fixed text-xs font-semibold text-[#2A1700]">
                          {t.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-muted">Verified buyer</p>
                        </div>
                      </div>

                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined filled text-[16px]">
                            star
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm italic leading-relaxed text-umber">
                      "{t.review}"
                    </p>
                  </div>

                  <p className="mt-5 flex items-center gap-1.5 border-t border-line pt-3 text-xs font-medium text-primary">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Purchased: {t.product}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================
            BRAND STORY
        ====================================== */}

        <section id="about" className="brand-story relative overflow-hidden bg-cream py-28 md:py-36">

          <div className="story-decoration pointer-events-none absolute -right-20 top-10 size-80 rounded-full border border-[#C9A27D]/30" />
          <div className="story-decoration pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full border border-[#C9A27D]/30" />

          <div className="story-content container relative z-10 max-w-4xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7C5728]">
              Our story
            </p>

            <h2 className="font-display text-4xl font-semibold leading-tight md:text-[56px] md:leading-[64px]">
              Fashion that celebrates every woman
            </h2>

            <div className="mx-auto mb-8 mt-6 h-0.5 w-20 bg-secondary" />

            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-umber">
              At <span className="font-semibold text-primary">LANCHI FOR HER</span>,
              we believe fashion is more than what you wear. It is about confidence,
              comfort and expressing your own identity. Discover thoughtfully selected
              styles that bring elegance to every moment.
            </p>

            <Link
              to="/models"
              className="luxury-button inline-flex rounded-full bg-primary px-8 py-4 text-[13px] font-semibold uppercase text-white"
            >
              Discover our editorial lookbook
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
