import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import "./WishlistPage.css";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, moveWishlistToBag, moveAllWishlistToBag, showToast } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterButtons = [
    { id: 'all', label: `All Saved (${wishlist.length})` },
    { id: 'abaya', label: 'Dresses & Abayas' },
    { id: 'coord', label: 'Co-ords & Sets' },
    { id: 'hijab', label: 'Silk Hijabs' }
  ];

  const filteredItems = wishlist.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'abaya') return item.name.toLowerCase().includes('abaya') || item.category === 'Silk abayas';
    if (selectedFilter === 'coord') return item.name.toLowerCase().includes('co-ord') || item.category === 'Co-ord sets';
    if (selectedFilter === 'hijab') return item.name.toLowerCase().includes('hijab');
    return true;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Wishlist link copied to clipboard!', 'success');
  };

  return (
    <div className="bg-canvas/50 min-h-screen py-10">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-xs text-muted mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-primary font-medium">Atelier Wishlist</span>
        </div>

        {/* Hero Banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-8 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-micro text-[#7C5728]">Curated Personal Wardrobe</p>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl text-ink mt-1">Your Curated Wishlist</h1>
            <p className="mt-2 text-xs text-umber max-w-xl">
              Treasured silhouettes and bespoke modest designs reserved for your atelier collection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="rounded-lg border border-line bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-label text-ink hover:border-primary transition"
            >
              Share Wishlist
            </button>
            <button
              type="button"
              onClick={moveAllWishlistToBag}
              disabled={wishlist.length === 0}
              className="rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-label text-white hover:bg-primary-hover disabled:opacity-50 transition"
            >
              Move All to Bag
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 py-6 border-b border-line overflow-x-auto no-scrollbar">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSelectedFilter(btn.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedFilter === btn.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-line bg-white text-umber hover:border-primary'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Wishlist Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="my-16 text-center py-16 rounded-xl border border-line bg-white">
            <span className="material-symbols-outlined text-5xl text-muted">favorite_border</span>
            <h3 className="mt-3 font-display text-2xl font-semibold">Your wishlist is empty</h3>
            <p className="mt-2 text-xs text-muted">Browse our collection and tap the heart icon on designs you love.</p>
            <Link
              to="/category"
              className="mt-6 inline-flex rounded-lg bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-label text-white hover:bg-primary-hover"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
<div className="wishlist-grid grid grid-cols-2 gap-3 pt-6 sm:grid-cols-2 sm:gap-5 sm:pt-8 lg:grid-cols-4 lg:gap-6">            {filteredItems.map((item) => (
              <div
                key={item.id}
className="wishlist-card group flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-ambient transition duration-300 hover:shadow-lift"              >
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-secondary-fixed px-2.5 py-1 text-[11px] font-semibold text-[#2A1700]">
                    Limited Edition
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    aria-label="Remove from Wishlist"
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm active:scale-90 transition"
                  >
                    <span className="material-symbols-outlined filled text-[18px]">favorite</span>
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-micro text-[#7C5728] text-center">
                    OPAQUE • FULLY LINED
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-muted tracking-micro">{item.fabric}</span>
                    <h3 className="font-display text-base font-medium mt-1 leading-snug">{item.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-sans font-bold text-primary text-sm tabular-nums">₹{item.price.toLocaleString('en-IN')}</span>
                      {item.oldPrice && (
                        <span className="font-sans text-xs text-muted line-through tabular-nums">₹{item.oldPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => moveWishlistToBag(item)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold uppercase tracking-label text-white hover:bg-primary-hover active:scale-95 transition"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
