import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    discountAmount,
    cartTotal,
    coupon,
    setCoupon,
    discountPercent,
    setDiscountPercent,
    showToast
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [addressForm, setAddressForm] = useState({
    name: 'Amina Khan',
    phone: '+91 98765 43210',
    address: 'Boutique Residence, 42 Heritage Lane',
    city: 'Mumbai',
    pincode: '400050',
    state: 'Maharashtra',
    note: 'Leave package with building concierge'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim().toUpperCase() === 'LANCHI10' || inputCoupon.trim().toUpperCase() === 'MODEST20') {
      const pct = inputCoupon.trim().toUpperCase() === 'MODEST20' ? 20 : 10;
      setCoupon(inputCoupon.trim().toUpperCase());
      setDiscountPercent(pct);
      showToast(`Promo code "${inputCoupon.trim().toUpperCase()}" applied successfully! (${pct}% OFF)`, 'success');
      setInputCoupon('');
    } else {
      showToast('Invalid coupon code. Try LANCHI10 or MODEST20', 'error');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty!', 'error');
      return;
    }
    setOrderPlaced(true);
    showToast('Order confirmed! We are preparing your atelier garments.', 'success');
  };

  if (orderPlaced) {
    return (
      <div className="container py-20 text-center max-w-xl mx-auto">
        <div className="size-20 rounded-full bg-secondary-fixed text-primary flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink">Thank you for your order</h1>
        <p className="mt-3 text-sm text-umber leading-relaxed">
          Your order has been received by our atelier. A confirmation email and tracking link have been dispatched to your email.
        </p>
        <div className="mt-6 rounded-xl border border-line bg-cream p-5 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">Order ID:</span>
            <span className="font-bold text-ink">#LFH-2026-9812</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Delivery Address:</span>
            <span className="font-medium text-ink">{addressForm.address}, {addressForm.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Total Paid:</span>
            <span className="font-bold text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-label text-white hover:bg-primary-hover"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-canvas/40 min-h-screen py-10">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-xs text-muted mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-primary font-medium">Shopping Bag ({cart.length} items)</span>
        </div>

        {/* Free Shipping Banner */}
        <div className="mb-8 rounded-xl border border-line bg-[#f8f4ef] p-4 flex items-center gap-4">
          <div className="size-10 rounded-full bg-cream border border-line flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-umber">Complimentary Doorstep Delivery Unlocked!</span>
              <span className="rounded-full bg-secondary-fixed px-2.5 py-0.5 text-[10px] text-[#2A1700]">100% Free</span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-line rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-line bg-white my-8">
            <span className="material-symbols-outlined text-5xl text-muted">shopping_bag</span>
            <h2 className="mt-3 font-display text-2xl font-semibold">Your shopping bag is empty</h2>
            <p className="mt-2 text-xs text-muted">Explore our curated collections and add graceful modest pieces.</p>
            <Link
              to="/category"
              className="mt-6 inline-flex rounded-lg bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-label text-white hover:bg-primary-hover"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left: Cart Items & Delivery Form (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold border-b border-line pb-4 mb-4">
                  Bag Items ({cart.length})
                </h2>

                <div className="divide-y divide-line">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="py-5 flex gap-4 first:pt-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-24 rounded-lg object-cover object-top border border-line shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-sm text-ink leading-snug">{item.name}</h3>
                            <p className="text-xs text-muted mt-0.5">Size: {item.size} • Color: {item.color || 'Standard'}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-sans font-bold text-primary text-sm tabular-nums">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            {item.oldPrice && (
                              <span className="block text-xs text-muted line-through font-sans tabular-nums">
                                ₹{(item.oldPrice * item.quantity).toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center rounded border border-line bg-canvas">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.size, -1)}
                              className="size-7 flex items-center justify-center text-xs hover:bg-white transition"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.size, 1)}
                              className="size-7 flex items-center justify-center text-xs hover:bg-white transition"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-xs text-muted hover:text-red-700 underline underline-offset-2 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Form */}
              <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                  <h2 className="font-display text-xl font-semibold">Delivery Address</h2>
                  <span className="rounded-full bg-secondary-fixed px-2.5 py-0.5 text-[10px] font-semibold text-[#2A1700]">
                    Express Doorstep
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-muted mb-1">Full Name</label>
                    <input
                      type="text"
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      className="w-full rounded-lg border border-line p-2.5 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full rounded-lg border border-line p-2.5 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-muted mb-1">Street Address</label>
                    <input
                      type="text"
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                      className="w-full rounded-lg border border-line p-2.5 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted mb-1">City</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full rounded-lg border border-line p-2.5 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted mb-1">Pincode</label>
                    <input
                      type="text"
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      className="w-full rounded-lg border border-line p-2.5 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-muted mb-1">Delivery Notes (Optional)</label>
                    <input
                      type="text"
                      value={addressForm.note}
                      onChange={(e) => setAddressForm({ ...addressForm, note: e.target.value })}
                      className="w-full rounded-lg border border-line p-2.5 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold border-b border-line pb-4 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs border-b border-line pb-4 text-umber">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-sans font-bold text-ink tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#7C5728]">
                    <span>Seasonal Promo ({discountPercent}% off)</span>
                    <span className="font-sans font-bold tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doorstep Express Delivery</span>
                    <span className="font-semibold text-green-700">FREE</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>GST (Taxes included)</span>
                    <span className="font-sans tabular-nums">₹0 (Included)</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="my-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (try LANCHI10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 rounded-lg border border-line px-3 py-2 text-xs uppercase focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover transition"
                  >
                    Apply
                  </button>
                </form>

                {coupon && (
                  <div className="mb-4 rounded-lg bg-secondary-fixed/40 p-2 text-xs text-[#7C5728] flex items-center justify-between">
                    <span>Active Coupon: <strong>{coupon}</strong> ({discountPercent}% saved)</span>
                    <span className="material-symbols-outlined text-sm">verified</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-4 border-t border-line">
                  <div>
                    <span className="text-sm font-semibold text-ink">Total Amount</span>
                    <p className="text-[10px] text-muted">All duties &amp; shipping included</p>
                  </div>
                  <span className="font-sans text-2xl font-bold text-primary tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full rounded-lg bg-primary py-3.5 text-xs font-semibold uppercase tracking-label text-white shadow-lift hover:bg-primary-hover active:scale-95 transition"
                >
                  Proceed to Secure Checkout
                </button>

                <p className="mt-4 text-center text-[10px] text-muted flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-xs text-primary">lock</span>
                  Encrypted 256-bit bank checkout • COD available
                </p>
              </div>

              {/* Atelier Concierge Box */}
              <div className="rounded-xl border border-line bg-cream p-5 text-xs text-umber">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                  <span className="font-semibold text-ink">Need custom sizing or help?</span>
                </div>
                <p className="text-muted leading-relaxed">
                  Our atelier styling concierge can assist with custom hemming, fabric questions, and urgent gift deliveries.
                </p>
                <Link
                  to="/contact"
                  className="mt-3 inline-block font-semibold text-primary underline underline-offset-4"
                >
                  Chat with WhatsApp Concierge →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
