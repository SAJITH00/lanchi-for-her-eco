import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import "./CategoryPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryPage() {
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('q') || '';
  const initialCategory = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('recommended');

  const pageRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'new', label: 'Fresh Drops' },
    { id: 'abaya', label: 'Modest Abayas' },
    { id: 'coord', label: 'Co-ord Sets' },
    { id: 'hijab', label: 'Silk Hijabs' },
    { id: 'kurti', label: 'Everyday Tops' },
    { id: 'occasion', label: 'Occasion Wear' }
  ];

  // Keep the selected category in sync with browser navigation and URL changes.
  useEffect(() => {
    setSelectedCategory(searchParams.get('cat') || 'all');
  }, [searchParams]);

  const extendedProducts = useMemo(() => {
    return [
      ...products,
      {
        id: 9,
        name: 'Korean Tiered Maxi Tunics',
        price: 1299,
        oldPrice: 1899,
        discount: '31% off',
        category: 'Summer tunics',
        tag: 'Korean Silhouette',
        rating: 4.8,
        reviewsCount: 52,
        fabric: 'Fluid Crepe',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=85',
        colors: ['#D6A98F', '#8B5037']
      },
      {
        id: 10,
        name: 'Embroidered Occasion Dress',
        price: 2499,
        oldPrice: 3499,
        discount: '28% off',
        category: 'Festive edit',
        tag: 'Exclusive Piece',
        rating: 5.0,
        reviewsCount: 78,
        fabric: 'Zari Work Silk',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85',
        colors: ['#803B24', '#E5C58E', '#3C2922']
      },
      {
        id: 11,
        name: 'Luxury Satin Abaya',
        price: 2199,
        oldPrice: 3199,
        discount: '31% off',
        category: 'Silk abayas',
        tag: 'Pure Satin',
        rating: 4.9,
        reviewsCount: 88,
        fabric: 'Fluid Sheen Satin',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85',
        colors: ['#D9B996', '#98705B', '#D7B2A8']
      },
      {
        id: 12,
        name: 'Modest Party Wear Dress',
        price: 2799,
        oldPrice: 3999,
        discount: '30% off',
        category: 'Festive edit',
        tag: 'Party Capsule',
        rating: 4.9,
        reviewsCount: 61,
        fabric: 'Cape Silhouette',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85',
        colors: ['#873F2B', '#D6B13D']
      }
    ];
  }, [products]);

  const filteredList = useMemo(() => {
    let list = [...extendedProducts];

    if (querySearch) {
      const query = querySearch.toLowerCase();
      list = list.filter((item) =>
        (item.name || '').toLowerCase().includes(query) ||
        (item.fabric || '').toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'abaya') {
        list = list.filter((item) =>
          (item.name || '').toLowerCase().includes('abaya') ||
          item.category === 'Silk abayas'
        );
      } else if (selectedCategory === 'coord') {
        list = list.filter((item) =>
          (item.name || '').toLowerCase().includes('co-ord') ||
          item.category === 'Co-ord sets'
        );
      } else if (selectedCategory === 'hijab') {
        list = list.filter((item) =>
          (item.name || '').toLowerCase().includes('hijab')
        );
      } else if (selectedCategory === 'kurti') {
        list = list.filter((item) => {
          const name = (item.name || '').toLowerCase();
          return name.includes('top') || name.includes('shirt') || name.includes('tunic');
        });
      } else if (selectedCategory === 'occasion') {
        list = list.filter((item) =>
          item.category === 'Festive edit' ||
          (item.name || '').toLowerCase().includes('occasion') ||
          (item.name || '').toLowerCase().includes('ceremony')
        );
      } else if (selectedCategory === 'new') {
        list = list.slice(0, 6);
      }
    }

    if (sortBy === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [extendedProducts, querySearch, selectedCategory, sortBy]);

  // GSAP: Reversible scroll animations
  useEffect(() => {
    const page = pageRef.current;
    const grid = gridRef.current;

    if (
      !page ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {

      // 1. Heading entrance animation
      gsap.fromTo(
        '.category-intro-animate',
        {
          y: 35,
          autoAlpha: 0
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

      // 2. Product card scroll animations
      const cards = gsap.utils.toArray(
        '.category-product-card'
      );

      cards.forEach((card, index) => {

        const image = card.querySelector(
          '.category-product-image img'
        );

        const direction = index % 2 === 0 ? 35 : -35;

        // Initial card position
        gsap.set(card, {
          y: 65,
          autoAlpha: 0,
          scale: 0.94,
          rotateX: 4,
          transformPerspective: 1000,
          transformOrigin: 'center bottom'
        });

        // Initial image position
        if (image) {
          gsap.set(image, {
            scale: 1.15,
            y: 15
          });
        }

        // Reversible card animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
            // Animation reverses when scrolling upward
            invalidateOnRefresh: true
          }
        });

        tl.to(card, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.85,
          ease: 'power3.out',
          delay: (index % 4) * 0.07
        });

        if (image) {
          tl.to(
            image,
            {
              scale: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            },
            '<'
          );
        }

        // Alternating subtle entrance movement
        gsap.set(card, {
          x: direction * 0.15
        });

      });

      // 3. Empty state animation
      const emptyState = page.querySelector(
        '.category-empty-state'
      );

      if (emptyState) {
        gsap.fromTo(
          emptyState,
          {
            y: 35,
            autoAlpha: 0,
            scale: 0.97
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: emptyState,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

    }, page);

    return () => {
      ctx.revert();
    };

  }, [filteredList]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    const nextParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      nextParams.delete('cat');
    } else {
      nextParams.set('cat', categoryId);
    }

    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div
      ref={pageRef}
      className="category-page min-h-screen bg-[#FAF8F5] pb-20"
    >
      {/* Sticky category filter bar */}
      <div className="sticky top-[60px] z-30 border-b border-[#E9E0D6] bg-white/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 overflow-x-auto py-3 no-scrollbar">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'border-[#70452F] bg-[#70452F] text-white shadow-[0_5px_16px_rgba(112,69,47,0.18)]'
                    : 'border-[#E8DED3] bg-white text-[#604A3B] hover:-translate-y-0.5 hover:border-[#A87955] hover:bg-[#F8F1EA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 pl-2">
            <label htmlFor="sortSelect" className="whitespace-nowrap text-xs text-[#8A786A]">
              Sort:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-[#E8DED3] bg-white px-3 py-2 text-xs text-[#3E3028] outline-none transition focus:border-[#A87955] focus:ring-2 focus:ring-[#A87955]/15"
            >
              <option value="recommended">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <main className="container">
        {/* Collection introduction */}
        <section className="mb-9 flex flex-col justify-between gap-5 border-b border-[#E8DED3] py-10 sm:flex-row sm:items-end sm:pb-7">
          <div className="max-w-2xl">
            <p className="category-intro-animate text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9A704F]">
              Handcrafted Modest Fashion
            </p>

            <h1 className="category-intro-animate mt-3 font-display text-3xl font-semibold leading-tight text-[#38271F] sm:text-4xl lg:text-5xl">
              {querySearch ? `Search Results for "${querySearch}"` : 'Atelier Collection'}
            </h1>

            <p className="category-intro-animate mt-3 max-w-xl text-sm leading-7 text-[#88786D]">
              Curated silhouettes cut in breathable cottons, fluid linens, and mulberry silks designed for graceful modest living.
            </p>
          </div>

          <p className="category-intro-animate shrink-0 text-xs font-medium text-[#765A47]">
            Showing <span className="font-bold text-[#70452F]">{filteredList.length}</span> handcrafted designs
          </p>
        </section>

        {/* Product collection grid */}
        {filteredList.length === 0 ? (
          <div className="category-empty-state my-16 rounded-2xl border border-[#E8DED3] bg-white px-6 py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-[#A99A8D]">
              search_off
            </span>

            <h3 className="mt-3 font-display text-xl font-medium text-[#38271F]">
              No designs match your criteria
            </h3>

            <p className="mt-2 text-sm text-[#88786D]">
              Try clearing your filters or search terms.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#70452F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#543322] hover:shadow-lg active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        ) : (
       <div
  ref={gridRef}
  className="category-product-grid grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 xl:grid-cols-4"
>
            {filteredList.map((product) => {
              const inWish = isInWishlist(product.id);

              return (
                <article
                  key={product.id}
                  className="category-product-card group flex flex-col overflow-hidden rounded-2xl border border-[#EAE1D8] bg-white shadow-[0_5px_22px_rgba(61,42,29,0.045)] hover:border-[#C6A487]"
                >
                  {/* Product image */}
                  <div className="category-product-image relative aspect-[3/4] overflow-hidden bg-[#F0EAE4]">
                    <Link to="/product" className="block size-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.075]"
                      />
                    </Link>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2B1B13]/25 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-80" />

                    <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-[#F7F0E8]/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#5C3828] shadow-sm backdrop-blur-sm">
                      {product.tag || product.discount || 'New Arrival'}
                    </span>

                    {/* Wishlist button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label={inWish ? 'Remove from wishlist' : 'Save to wishlist'}
                      className={`absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white active:scale-90 ${
                        inWish
                          ? 'text-[#9A4E45]'
                          : 'text-[#604A3B] hover:text-[#9A4E45]'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[19px] ${inWish ? 'filled' : ''}`}>
                        favorite
                      </span>
                    </button>

                    {/* Quick view link */}
                    <Link
                      to="/product"
                      className="category-quick-view absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 translate-y-3 items-center gap-2 whitespace-nowrap rounded-full bg-white/95 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#523526] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-500 hover:bg-[#70452F] hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      View Details
                      <span className="material-symbols-outlined text-sm">
                        arrow_outward
                      </span>
                    </Link>
                  </div>

                  {/* Product information */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="truncate text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A704F]">
                          {product.fabric || product.category || 'LANCHI Collection'}
                        </span>

                        <div className="flex shrink-0 items-center gap-1 text-xs text-[#6C503B]">
                          <span className="material-symbols-outlined filled text-[14px] text-[#C39A52]">
                            star
                          </span>
                          <span className="font-semibold">
                            {product.rating || 'New'}
                          </span>
                        </div>
                      </div>

                      <Link to="/product">
                        <h3 className="line-clamp-2 min-h-[2.8rem] text-sm font-medium leading-6 text-[#38271F] transition-colors duration-300 group-hover:text-[#9A6241]">
                          {product.name}
                        </h3>
                      </Link>

                      {product.colors?.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <span
                              key={`${product.id}-color-${index}`}
                              className="size-3 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: color }}
                              aria-label={`Available color ${index + 1}`}
                            />
                          ))}

                          {product.colors.length > 4 && (
                            <span className="ml-1 text-[10px] text-[#968477]">
                              +{product.colors.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price and add to cart */}
                    <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#EEE7E0] pt-4">
                      <div className="min-w-0">
                        <span className="font-sans text-sm font-bold text-[#70452F] tabular-nums">
                          ₹{Number(product.price || 0).toLocaleString('en-IN')}
                        </span>

                        {product.oldPrice && (
                          <span className="ml-2 text-[11px] text-[#A99A8D] line-through font-sans tabular-nums">
                            ₹{Number(product.oldPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#70452F] px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#543322] hover:shadow-[0_8px_18px_rgba(112,69,47,0.24)] active:translate-y-0 active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          shopping_bag
                        </span>
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Small page-specific styles */}
      <style>{`
        .category-page {
          overflow: clip;
        }

        /* Product card animation performance */
        .category-product-card {
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        /* Product image smooth reveal */
        .category-product-image {
          overflow: hidden;
          perspective: 1000px;
        }

        .category-product-image img {
          will-change: transform;
          backface-visibility: hidden;
          transform-origin: center center;
        }

        /* Premium card hover */
        .category-product-card {
          transition:
            box-shadow 0.5s ease,
            border-color 0.5s ease,
            transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .category-product-card:hover {
          box-shadow: 0 25px 55px rgba(61, 42, 29, 0.14);
        }

        /* Image hover */
        .category-product-card:hover .category-product-image img {
          transform: scale(1.07);
        }

        /* Quick view reveal */
        .category-quick-view {
          transition:
            opacity 0.45s ease,
            transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
            background 0.3s ease;
        }

        /* Mobile support */
        @media (hover: none) {
          .category-quick-view {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .category-product-card,
          .category-product-image img {
            transition: none !important;
          }

          .category-page *,
          .category-page *::before,
          .category-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
