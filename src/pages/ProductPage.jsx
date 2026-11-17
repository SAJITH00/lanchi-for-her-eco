import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProductPage() {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const navigate = useNavigate();

  const product = {
    id: 101,
    name: 'Elegant Premium Modest Dress',
    price: 1899,
    oldPrice: 2499,
    discount: '24% off',
    rating: 4.9,
    reviewsCount: 142,
    sku: 'LFH-2026-MD09',
    description: 'Handcrafted viscose crepe modest dress with gold zari resham embroidery along the cuffs and neckline. Fully opaque, tailored with modest drape and complimentary hemming.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLUyFWcf7Wyx2mvV28zmbXU3vuqchr0tVSa0y_lWqst3QhUsO5PrPXsxE--c-byqua23kYZLJOVLyaz__5a5UXuIX_nGMDfWRhN1ZOLmoGPdazrCt0Q-r2Bm5aiaLZmzxqdFhn_mqgOB-yjzKSPdxZhdofiqNlo2Zz4YvyUV3KjzPHjW_kQrcgTwbjzZTUDjAkTbuT75lvxRQp9uGXjr-3WDIdjfeOzqYJztGDQwGO',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvf84AZWgtkrCmq0R_iuKG1LU6F9T4ANg_h4brTuGtRHZe_Xv2z7vC0K7EXNDtBn0wFcPxSu92a_tVord4ZcP2v5LNA1H9NhO-x4J9Dp1P52gJtv12NIWTLX4MqgNQ8IMFGD2HO-LjJ-VgpZpcc8MvpzsrsklAWJ6fKYgnJfJh4jSjdypCUcuIqpV2etGZy7-SoVTnPcTL4N33AxJuCOip1C5dLCJASJ9wT_YAv2mv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2apyhpvj17Tg2N2Q7cyG2meyBUcJBlljttrw3CFpBbzOl9Krj-YKHnKj_eDuNxSr6VhU5I-rxWeYroIfCVAiNkcNwL2yHI8z1yylaRSauwBIWS6TARy6lwcoubZldEuAHJeUEUf6teQ6hMWgUpxm8q7sHE6iZZaScLLjin6vdsw7MHlJCvHLaUobgZwpYXXouwz6uu5dEd_oSUqZv2FiqLeugyrOXv2-R3uhoYvfz',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpNm8o_S4aJ6T5loZHdmyFVjQtQfrxH2CkYdRL0wpgM_gX6dnq88EN_R89ft-Tpi6qs9een3VbmdMrRkK8VPJIYeP1GJcM7EA4CSS7ntyPCpybnNljHPd1bWihtb-dw8240cVQDUl7FBzdp-LqMyoiuL2dVmGB_tKMHZtDb9p9qLYie0JHrxbBDgKQ2hmU5xTftu8lDmOE3zBvhfaFFqg4McMLkUy_YFZVp8--CQ6f'
    ],
    colors: [
      { name: 'Terracotta Rose', hex: '#8B5037' },
      { name: 'Champagne Beige', hex: '#EBBB83' },
      { name: 'Midnight Onyx', hex: '#222222' }
    ],
    sizes: ['S (Bust 36")', 'M (Bust 38")', 'L (Bust 40")', 'XL (Bust 42")', 'Custom Tailored']
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState('M (Bust 38")');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const inWish = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[activeImageIndex]
      },
      selectedSize,
      selectedColor,
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAdd();
    navigate('/cart');
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs text-umber">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-line">/</li>
          <li><Link to="/category" className="hover:text-primary transition-colors">Atelier Collection</Link></li>
          <li aria-hidden="true" className="text-line">/</li>
          <li className="font-medium text-primary" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
        {/* Left: Gallery (7 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          <div className="group relative overflow-hidden rounded-xl border border-line bg-white shadow-ambient">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-2">
              <span className="rounded bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-micro text-white shadow-sm">
                New arrival
              </span>
              <span className="w-fit rounded border border-line bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-micro text-[#A8763F] backdrop-blur-sm">
                Hand-embroidered
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle Wishlist"
              className={`absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-md transition active:scale-90 ${
                inWish ? 'text-primary' : 'text-ink hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined ${inWish ? 'filled' : ''}`}>favorite</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 shrink-0 overflow-hidden rounded-lg border-2 p-0.5 transition ${
                  activeImageIndex === idx
                    ? 'border-primary ring-2 ring-primary/20 bg-white'
                    : 'border-line opacity-70 hover:opacity-100 bg-white'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="aspect-[4/5] w-full object-cover object-top" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions (5 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-micro text-[#7C5728]">Limited Atelier Drop</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined filled text-[18px]">star</span>
                ))}
              </div>
              <span className="text-xs font-semibold text-ink">{product.rating}</span>
              <span className="text-xs text-muted">({product.reviewsCount} verified reviews)</span>
              <span className="text-line">|</span>
              <span className="text-xs text-muted">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-cream/50 p-4">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-base text-muted line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
              <span className="rounded-full bg-secondary-fixed px-2.5 py-0.5 text-xs font-semibold text-[#2A1700]">
                Save ₹{(product.oldPrice - product.price).toLocaleString('en-IN')} ({product.discount})
              </span>
            </div>
            <p className="mt-2 text-xs text-umber">Taxes included. Free express doorstep shipping across India.</p>
          </div>

          {/* Color Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-label text-ink">
              Colour: <span className="text-primary font-normal">{selectedColor}</span>
            </label>
            <div className="mt-2.5 flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex size-8 items-center justify-center rounded-full border-2 transition ${
                    selectedColor === c.name ? 'border-primary ring-2 ring-primary/20' : 'border-line'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-label text-ink">
                Size: <span className="text-primary font-normal">{selectedSize}</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Modest sizing chart: All silhouettes have 56" standard length. Free custom hemming at checkout!')}
                className="text-xs text-[#7C5728] underline underline-offset-4 hover:text-primary"
              >
                Size Guide
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
                    selectedSize === s
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-line bg-white text-ink hover:border-primary'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex size-11 items-center justify-center text-ink hover:bg-canvas transition"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex size-11 items-center justify-center text-ink hover:bg-canvas transition"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-xs font-semibold uppercase tracking-label text-white shadow-sm hover:bg-primary-hover active:scale-95 transition"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                Add to shopping bag
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full rounded-lg bg-[#6e321c] py-3.5 text-xs font-semibold uppercase tracking-label text-white shadow-md hover:bg-[#572714] active:scale-95 transition"
            >
              Buy it now
            </button>
          </div>

          {/* Assurance perks */}
          <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs text-umber">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              <span>Express doorstep delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span>100% opaque, guaranteed drape</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">swap_horiz</span>
              <span>7-day effortless exchange</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lock</span>
              <span>Secure 256-bit checkout</span>
            </div>
          </div>

          {/* Details Accordion */}
          <div className="border-t border-line pt-4">
            <div className="flex border-b border-line">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-semibold uppercase tracking-label transition ${
                  activeTab === 'details' ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-ink'
                }`}
              >
                Fabric &amp; Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`ml-6 pb-3 text-xs font-semibold uppercase tracking-label transition ${
                  activeTab === 'care' ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-ink'
                }`}
              >
                Care Guide
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shipping')}
                className={`ml-6 pb-3 text-xs font-semibold uppercase tracking-label transition ${
                  activeTab === 'shipping' ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-ink'
                }`}
              >
                Delivery &amp; Returns
              </button>
            </div>

            <div className="py-4 text-xs leading-relaxed text-umber">
              {activeTab === 'details' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Woven from premium Japanese viscose crepe with soft flowing drape</li>
                  <li>Hand-embroidered gold zari resham floral artwork on sleeves</li>
                  <li>Concealed front zip for easy slip-on styling</li>
                  <li>Full length (56 inches) with generous modest hem allowance</li>
                </ul>
              )}
              {activeTab === 'care' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Dry clean recommended for first two washes</li>
                  <li>Gentle cold hand wash with mild silk detergent</li>
                  <li>Do not wring; line dry inside-out in shade</li>
                  <li>Low-heat iron on reverse side over embroidery</li>
                </ul>
              )}
              {activeTab === 'shipping' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Dispatches within 24–48 hours from atelier</li>
                  <li>Estimated delivery: 3–5 business days across India</li>
                  <li>Hassle-free 7-day doorstep pickup exchanges</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
