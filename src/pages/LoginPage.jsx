import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useApp } from '../context/AppContext';
import lanchiBuildingImg from '../assets/images/lanchibuilding.jpg';

export default function LoginPage() {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: true
  });

  // Animation references
  const containerRef = useRef(null);
  const imagePanelRef = useRef(null);
  const buildingImgRef = useRef(null);
  const formPanelRef = useRef(null);
  const overlayTextRef = useRef(null);

  // GSAP Cinematic Entrance Sequence
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const ctx = gsap.context(() => {
      if (isDesktop && imagePanelRef.current && buildingImgRef.current && formPanelRef.current) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

        // STEP 1 – Initial Building Reveal (image occupies prominently with subtle scale)
        tl.fromTo(
          buildingImgRef.current,
          { scale: 1.18, filter: 'brightness(0.92)' },
          { scale: 1.06, filter: 'brightness(1)', duration: 1.2, ease: 'power2.out' }
        );

        // STEP 2 – Building image smoothly shrinks to its left-side 50% container
        tl.to(
          imagePanelRef.current,
          {
            width: '50%',
            duration: 1.15,
            ease: 'power3.inOut'
          },
          '-=0.3'
        );

        tl.to(
          buildingImgRef.current,
          {
            scale: 1,
            duration: 1.15,
            ease: 'power3.inOut'
          },
          '<'
        );

        // STEP 3 – Login form panel smoothly emerges from behind to the right
        tl.fromTo(
          formPanelRef.current,
          {
            opacity: 0,
            x: 45,
            scale: 0.97
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out'
          },
          '-=0.75'
        );

        // Text overlay on building reveals elegantly
        if (overlayTextRef.current) {
          tl.fromTo(
            overlayTextRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
            '-=0.7'
          );
        }

        // STEP 4 – Form elements reveal with refined stagger
        tl.fromTo(
          '.form-stagger',
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out'
          },
          '-=0.4'
        );
      } else if (buildingImgRef.current && formPanelRef.current) {
        // Mobile entrance sequence (graceful vertical transition)
        const tl = gsap.timeline();
        tl.fromTo(
          buildingImgRef.current,
          { scale: 1.12, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }
        );
        tl.fromTo(
          formPanelRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );
        tl.fromTo(
          '.form-stagger',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Form Validation & Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'signup' && !formData.name.trim()) {
      showToast('Please enter your full name.', 'info');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      showToast('Password must be at least 6 characters.', 'info');
      return;
    }

    if (mode === 'signin') {
      showToast(`Welcome back, ${formData.email}!`, 'success');
    } else {
      showToast(`Welcome to LANCHI FOR HER, ${formData.name || 'valued member'}!`, 'success');
    }

    navigate('/');
  };

  // Google Sign-In interaction
  const handleGoogleSignIn = () => {
    showToast('Google OAuth is not configured. Connect your Google Client ID to enable live Google authentication.', 'info');
  };

  // Forgot password interaction
  const handleForgotPassword = () => {
    if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      showToast(`Password reset link dispatched to ${formData.email}.`, 'success');
    } else {
      showToast('Please enter your email above, then tap "Forgot password?".', 'info');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-68px)] w-full overflow-hidden bg-[#F8F4EE] text-[#3E3027] font-body"
    >
      <div className="flex min-h-[calc(100vh-68px)] flex-col lg:flex-row">
        {/* ========================================================
            LEFT SIDE: LANCHI BRAND IMAGE (Building Showcase)
        ======================================================== */}
        <div
          ref={imagePanelRef}
          className="relative w-full lg:w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[calc(100vh-68px)] overflow-hidden bg-[#F1E6D9]"
          style={{ width: '100%' }}
        >
          {/* Main Building Photograph */}
          <img
            ref={buildingImgRef}
            src={lanchiBuildingImg}
            alt="LANCHI FOR HER Atelier Flagship Building"
            className="size-full object-cover object-center"
          />

          {/* Subtle Warm Beige & Rich Brown Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2017]/85 via-[#795638]/30 to-transparent pointer-events-none" />

          {/* Top Brand Emblem Badge */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 backdrop-blur-md transition hover:bg-white/25"
            >
              <span className="size-1.5 rounded-full bg-[#EBBB83]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                LANCHI FOR HER · FLAGSHIP ATELIER
              </span>
            </Link>
          </div>

          {/* Bottom Editorial Brand Content */}
          <div
            ref={overlayTextRef}
            className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-10 text-white max-w-lg"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FFDDB8] mb-2">
              EST. 2026 · ATELIER BOUTIQUE
            </p>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
              Elegance Begins at Your Doorstep.
            </h1>
            <div className="h-0.5 w-12 bg-[#C49A62] my-3 sm:my-4" />
            <p className="text-xs sm:text-sm text-[#F1E6D9] leading-relaxed font-light">
              Discover timeless modest fashion, thoughtfully designed for every woman.
            </p>
          </div>
        </div>

        {/* ========================================================
            RIGHT SIDE: LOGIN PANEL
        ======================================================== */}
        <div
          ref={formPanelRef}
          className="relative w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-[#F8F4EE] border-t lg:border-t-0 lg:border-l border-[#E8DCCF]"
        >
          <div className="w-full max-w-[420px]">
            {/* Brand Header */}
            <div className="mb-6 text-center md:text-left form-stagger">
              <Link to="/" className="inline-block mb-1.5 group">
                <span className="font-display text-2xl font-bold tracking-[0.14em] text-[#795638] uppercase group-hover:text-[#63452B] transition-colors">
                  LANCHI FOR HER
                </span>
              </Link>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#3E3027] mt-2">
                {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="mt-1 text-xs text-[#7A6A5E] leading-relaxed">
                {mode === 'signin'
                  ? 'Sign in to access curated capsules, order tracking, and custom tailoring.'
                  : 'Join our private circle for early capsule access, atelier perks, and bespoke hemming.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-[#E8DCCF] mb-6 form-stagger">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  mode === 'signin'
                    ? 'border-b-2 border-[#795638] text-[#795638]'
                    : 'text-[#A39282] hover:text-[#3E3027]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  mode === 'signup'
                    ? 'border-b-2 border-[#795638] text-[#795638]'
                    : 'text-[#A39282] hover:text-[#3E3027]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
              {/* Full Name (Sign Up only) */}
              {mode === 'signup' && (
                <div className="form-stagger">
                  <label className="block text-[#3E3027] font-semibold mb-1">
                    Full Name <span className="text-[#C49A62]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Al-Mansoor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DCCF] bg-white p-3 text-xs text-[#3E3027] placeholder:text-[#A39282] focus:border-[#795638] focus:outline-none focus:ring-1 focus:ring-[#795638] transition"
                  />
                </div>
              )}

              {/* Email Address */}
              <div className="form-stagger">
                <label className="block text-[#3E3027] font-semibold mb-1">
                  Email Address <span className="text-[#C49A62]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DCCF] bg-white p-3 text-xs text-[#3E3027] placeholder:text-[#A39282] focus:border-[#795638] focus:outline-none focus:ring-1 focus:ring-[#795638] transition"
                />
              </div>

              {/* Password */}
              <div className="form-stagger">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#3E3027] font-semibold">
                    Password <span className="text-[#C49A62]">*</span>
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[11px] text-[#795638] hover:text-[#C49A62] transition hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DCCF] bg-white p-3 pr-10 text-xs text-[#3E3027] placeholder:text-[#A39282] focus:border-[#795638] focus:outline-none focus:ring-1 focus:ring-[#795638] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-3 text-[#A39282] hover:text-[#3E3027] transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1 form-stagger">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="accent-[#795638] rounded size-3.5 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs text-[#7A6A5E] cursor-pointer select-none">
                  Remember this device for seamless atelier visits
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 form-stagger">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#795638] py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm hover:bg-[#63452B] active:scale-95 transition duration-200"
                >
                  {mode === 'signin' ? 'Sign In to Atelier' : 'Create Member Account'}
                </button>
              </div>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-5 form-stagger">
              <div className="flex-1 h-px bg-[#E8DCCF]" />
              <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A39282]">
                OR
              </span>
              <div className="flex-1 h-px bg-[#E8DCCF]" />
            </div>

            {/* Google Sign-In Button */}
            <div className="form-stagger">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-[#E8DCCF] bg-white py-3 px-4 text-xs font-medium text-[#3E3027] shadow-sm hover:bg-[#FAF7F2] hover:border-[#C49A62] hover:shadow transition duration-200"
              >
                {/* Official Crisp Google SVG Icon */}
                <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Terms & Privacy */}
            <p className="mt-5 text-center text-[11px] text-[#A39282] leading-relaxed form-stagger">
              By proceeding, you agree to LANCHI FOR HER’s{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#795638] underline underline-offset-2 hover:text-[#C49A62]">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#795638] underline underline-offset-2 hover:text-[#C49A62]">
                Privacy Policy
              </a>.
            </p>

            {/* Member Privileges Accordion / Badge */}
            <div className="mt-8 rounded-xl border border-[#E8DCCF] bg-[#F1E6D9]/50 p-4 text-xs form-stagger">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[16px] text-[#C49A62]">star</span>
                <span className="font-semibold text-[#795638] uppercase tracking-wider text-[11px]">
                  Private Circle Privileges
                </span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#53433E]">
                <li className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[#795638]" />
                  Early capsule previews and seasonal trunk shows
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[#795638]" />
                  Complimentary bespoke sleeve &amp; hem adjustments
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[#795638]" />
                  Priority concierge courier dispatch with doorstep exchange
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
