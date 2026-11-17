import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useApp } from '../context/AppContext';

// ========================================================
// CONFIGURABLE CONSTANTS (Modify as your atelier scales)
// ========================================================
// Set your official WhatsApp number with country code (e.g., '91XXXXXXXXXX')
// When left empty, the UI displays a clean inactive coming-soon placeholder
const WHATSAPP_NUMBER = '';

// Set your official contact email address here
const CONTACT_EMAIL = '';

// Verified Location Coordinates
const LATITUDE = 10.989639;
const LONGITUDE = 76.445361;
const GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${LATITUDE},${LONGITUDE}`;
const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${LATITUDE},${LONGITUDE}&hl=en&z=15&output=embed`;
const INSTAGRAM_URL = 'https://www.instagram.com/lanchi.forher/';

export default function ContactPage() {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Order & Sizing Inquiry',
    message: ''
  });

  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // GSAP animation container ref
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const connectRef = useRef(null);
  const locationRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);

  // GSAP Animations with respect to prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
        );
      }

      // Connect cards entrance
      if (connectRef.current) {
        gsap.fromTo(
          connectRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
        );
      }

      // Location map entrance
      if (locationRef.current) {
        gsap.fromTo(
          locationRef.current,
          { opacity: 0, scale: 0.98, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, delay: 0.25, ease: 'power3.out' }
        );
      }

      // Contact Form entrance
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
        );
      }

      // Social section entrance
      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, delay: 0.5, ease: 'power3.out' }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Form Validation & Preview Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Please enter your full name.', 'info');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showToast('Please provide a valid email address.', 'info');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      showToast('Please write a message with at least 10 characters.', 'info');
      return;
    }

    // Local validation passed. Note: backend API will be connected later
    setDemoSubmitted(true);
    showToast('Inquiry validated! Backend API will be connected to dispatch your message.', 'success');
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Order & Sizing Inquiry',
      message: ''
    });
    setDemoSubmitted(false);
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#F8F4EE] text-[#3E3027] font-body selection:bg-[#F1E6D9] selection:text-[#795638] overflow-x-hidden"
    >
      {/* ========================================================
          A. BREADCRUMB
      ======================================================== */}
      <div className="container max-w-6xl mx-auto px-5 pt-8 pb-3">
        <nav aria-label="Breadcrumb" className="text-xs text-[#7A6A5E]">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-[#795638] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#E8DCCF]">/</li>
            <li className="text-[#795638] font-medium" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>
      </div>

      {/* ========================================================
          B. HERO SECTION
      ======================================================== */}
      <section className="container max-w-4xl mx-auto px-5 pt-4 pb-12 text-center" ref={heroRef}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C49A62] mb-3">
          GET IN TOUCH
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#3E3027] leading-tight">
          We'd Love to Hear From You
        </h1>
        <div className="h-0.5 w-16 bg-[#C49A62] mx-auto my-5 rounded-full" />
        <p className="text-sm sm:text-base text-[#53433E] max-w-2xl mx-auto leading-relaxed font-light">
          Whether you have a question about an order, need styling assistance, or simply want to connect with us, the LANCHI FOR HER team is here for you.
        </p>
      </section>

      {/* ========================================================
          C. MAIN CONTACT SECTION (Two Columns on Desktop)
      ======================================================== */}
      <section className="container max-w-6xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ====================================================
              LEFT SIDE: CONNECT WITH US
          ==================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-6" ref={connectRef}>
            <div className="border-b border-[#E8DCCF] pb-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A62]">
                DIRECT CORRESPONDENCE
              </span>
              <h2 className="font-display text-2xl font-semibold text-[#3E3027] mt-1">
                Connect With Us
              </h2>
            </div>

            {/* 1. INSTAGRAM */}
            <div className="rounded-2xl border border-[#E8DCCF] bg-white p-6 shadow-sm hover:border-[#C49A62] transition duration-200">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F8F4EE] border border-[#E8DCCF] text-[#795638]">
                  <svg className="size-6 text-[#795638]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C49A62]">
                    Follow Our Journey
                  </span>
                  <p className="font-display text-lg font-semibold text-[#3E3027] mt-0.5">
                    @lanchi.forher
                  </p>
                  <p className="text-xs text-[#7A6A5E] mt-1 leading-relaxed">
                    View new capsule drops, styling lookbooks, and daily modest fashion inspiration.
                  </p>
                  <div className="mt-4">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#795638] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#63452B] active:scale-95 transition"
                    >
                      <span>Visit Instagram</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. WHATSAPP */}
            <div className="rounded-2xl border border-[#E8DCCF] bg-white p-6 shadow-sm hover:border-[#C49A62] transition duration-200">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F8F4EE] border border-[#E8DCCF] text-[#795638]">
                  <svg className="size-6 text-[#795638]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 5l-1.41 5.17 5.29-1.39c1.47.8 3.12 1.22 4.75 1.22 5.5 0 9.97-4.47 9.97-9.97s-4.47-10-9.97-10zm5.83 14.07c-.24.68-1.2 1.25-1.92 1.33-.5.06-1.15.09-3.32-.81-2.77-1.15-4.54-3.97-4.68-4.16-.14-.18-1.12-1.49-1.12-2.85 0-1.35.71-2.02.96-2.29.25-.28.55-.35.74-.35.18 0 .37 0 .53.01.17.01.4.06.61.57.22.53.75 1.83.82 1.97.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.3.35-.43.47-.14.14-.29.3-.12.59.17.29.75 1.23 1.6 1.99 1.1.98 2.03 1.28 2.32 1.42.29.14.46.12.63-.07.17-.19.74-.86.94-1.15.2-.29.4-.24.67-.14.27.1 1.73.82 2.03.96.3.15.5.22.57.35.07.12.07.72-.17 1.4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C49A62]">
                    Chat With Us
                  </span>
                  <p className="font-display text-lg font-semibold text-[#3E3027] mt-0.5">
                    WhatsApp Concierge
                  </p>
                  <p className="text-xs text-[#7A6A5E] mt-1 leading-relaxed">
                    Connect with LANCHI FOR HER for product inquiries, sizing assistance and order support.
                  </p>
                  <div className="mt-4">
                    {WHATSAPP_NUMBER ? (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#795638] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#63452B] active:scale-95 transition"
                      >
                        <span>Start WhatsApp Chat</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-lg bg-[#F1E6D9] px-4 py-2 text-xs font-medium text-[#795638] border border-[#E8DCCF] cursor-not-allowed">
                        <span className="size-1.5 rounded-full bg-[#C49A62]" />
                        <span>Direct WhatsApp contact coming soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. EMAIL */}
            <div className="rounded-2xl border border-[#E8DCCF] bg-white p-6 shadow-sm hover:border-[#C49A62] transition duration-200">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F8F4EE] border border-[#E8DCCF] text-[#795638]">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C49A62]">
                    Email Us
                  </span>
                  <p className="font-display text-lg font-semibold text-[#3E3027] mt-0.5">
                    Atelier Inquiries
                  </p>
                  <p className="text-xs text-[#7A6A5E] mt-1 leading-relaxed">
                    {CONTACT_EMAIL
                      ? `Write to us at ${CONTACT_EMAIL} for bespoke tailoring and order questions.`
                      : 'Send us your styling questions, custom hem requests, or boutique queries via our contact form below.'}
                  </p>
                  <div className="mt-4">
                    {CONTACT_EMAIL ? (
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#795638] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#63452B] active:scale-95 transition"
                      >
                        <span>Send Email</span>
                        <span className="material-symbols-outlined text-[15px]">east</span>
                      </a>
                    ) : (
                      <a
                        href="#contact-form"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#795638] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#795638] hover:bg-[#795638] hover:text-white transition"
                      >
                        <span>Use Contact Form</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT SIDE: OUR LOCATION
          ==================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-6" ref={locationRef}>
            <div className="border-b border-[#E8DCCF] pb-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A62]">
                ATELIER COORDINATES
              </span>
              <h2 className="font-display text-2xl font-semibold text-[#3E3027] mt-1">
                Find LANCHI FOR HER
              </h2>
            </div>

            <div className="rounded-2xl border border-[#E8DCCF] bg-white p-6 shadow-sm flex flex-col gap-4">
              {/* Responsive Embedded Google Map */}
              <div className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] rounded-xl overflow-hidden border border-[#E8DCCF] bg-[#F1E6D9]">
                <iframe
                  title="LANCHI FOR HER Atelier Location"
                  src={GOOGLE_MAPS_EMBED_URL}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Coordinates & Location Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E8DCCF]">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1E6D9] text-[#795638]">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#3E3027]">LANCHI FOR HER</p>
                    <p className="text-[11px] text-[#7A6A5E]">
                      Coordinates: 10°59'22.7"N 76°26'43.3"E
                    </p>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#795638] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#63452B] active:scale-95 transition"
                >
                  <span>Get Directions</span>
                  <span className="material-symbols-outlined text-[15px]">directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================================================
          4. SOCIAL MEDIA PROMOTIONAL SECTION
      ======================================================== */}
      <section className="border-t border-[#E8DCCF] bg-[#F1E6D9]/40 py-16" ref={socialRef}>
        <div className="container max-w-3xl mx-auto px-5 text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-white border border-[#E8DCCF] text-[#795638] mb-4 shadow-sm">
            <svg className="size-6 text-[#795638]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#3E3027]">
            Follow the LANCHI Story
          </h2>
          <p className="text-xs sm:text-sm text-[#53433E] max-w-lg mx-auto mt-2 leading-relaxed font-light">
            Discover our latest collections, modest fashion inspiration and everyday elegance.
          </p>
          <div className="mt-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#795638] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[#63452B] active:scale-95 transition"
            >
              <span>FOLLOW @LANCHI.FORHER</span>
              <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
