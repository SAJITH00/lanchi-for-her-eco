
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Shop', path: '/category', icon: 'storefront' },
    { label: 'Models', path: '/models', icon: 'person' },
    { label: 'Contact', path: '/contact', icon: 'call' },
    { label: 'Account', path: '/login', icon: 'person_outline' }
  ];

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/category?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Trending searches
  const handleTrendingSearch = (term) => {
    setSearchQuery(term);
    navigate(`/category?q=${encodeURIComponent(term)}`);
    setSearchOpen(false);
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-[#8B5037] shadow-sm">

        <div className="mx-auto max-w-[1440px] px-4 lg:px-10">

          <div className="relative flex h-[68px] items-center justify-between">

            {/* LEFT: LOGO AND BRAND */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXN2Lmppat1moCJQLsulEN5n_fFQUUCckP7OIJjtjJsh6v2NA3nfhAyIw6YyqQhrN1DSdPeN_8He7FIDg2bPzd6ABJATRCLfOb5aeTsLtn4DTBdapTi7RjHQ9QMnIKkqT6QaaRMxM3Rpzk3T-nQGlKlUj0wxXzorTE7i8neZZBYCPu7yCe0IzAn-h8YNXbsUdtb_eu3B1FSFa997DvtYuWsDW1MA9RIXtgNirRO1u9eOzjrI0GMjExog"
                alt="LANCHI FOR HER Logo"
                className="h-9 w-auto object-contain"
              />

              <span className="whitespace-nowrap text-xs font-semibold tracking-[0.12em] text-white sm:text-sm">
                LANCHI FOR HER
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </Link>

            {/* CENTER: DESKTOP NAVIGATION */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-10"
              aria-label="Desktop navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-white hover:text-[#ebbb83]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}

                      {isActive && (
                        <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-white" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT: ACTION ICONS */}
            <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">

              {/* SEARCH */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search collection"
                className="flex items-center justify-center text-white transition-colors duration-300 hover:text-[#ebbb83]"
              >
                <span className="material-symbols-outlined text-[23px]">
                  search
                </span>
              </button>

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="relative flex items-center justify-center text-white transition-colors duration-300 hover:text-[#ebbb83]"
              >
                <span className="material-symbols-outlined text-[23px]">
                  favorite
                </span>

                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-[#8B5037]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* SHOPPING CART */}
              <Link
                to="/cart"
                aria-label={`Shopping bag, ${cartCount} items`}
                className="relative flex items-center justify-center text-white transition-colors duration-300 hover:text-[#ebbb83]"
              >
                <span className="material-symbols-outlined text-[23px]">
                  shopping_bag
                </span>

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-[#8B5037]">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>
          </div>
        </div>

        {/* MOBILE ICON NAVIGATION */}
        <nav
          className="border-t border-white/10 bg-[#8B5037] lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-lg items-center justify-around px-1 py-2">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-1 transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-white hover:text-[#ebbb83]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="material-symbols-outlined text-[21px]"
                    >
                      {item.icon}
                    </span>

                    <span
                      className={`text-[10px] ${
                        isActive ? 'font-semibold' : 'font-medium'
                      }`}
                    >
                      {item.label}
                    </span>

                    {isActive && (
                      <span className="h-[2px] w-5 rounded-full bg-white" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </div>
        </nav>
      </header>

      {/* GLOBAL SEARCH MODAL */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-[#EDE5DD] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* SEARCH HEADER */}
            <div className="flex items-center justify-between border-b border-[#EDE5DD] pb-4">

              <h3 className="text-xl font-semibold text-[#68432F]">
                Discover Our Collection
              </h3>

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex size-9 items-center justify-center rounded-full text-[#777] transition hover:bg-[#F5F0EA] hover:text-[#8B5037]"
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>
            </div>

            {/* SEARCH INPUT */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-5 flex gap-2"
            >
              <div className="relative min-w-0 flex-1">

                <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#999]">
                  search
                </span>

                <input
                  type="text"
                  autoFocus
                  placeholder="Search abayas, hijabs, co-ords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-[#E5DDD5] bg-[#FAF8F5] py-3 pl-11 pr-4 text-sm text-[#39332E] outline-none transition focus:border-[#8B5037] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-[#8B5037] px-5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#68432F] active:scale-95"
              >
                Find
              </button>
            </form>

            {/* TRENDING SEARCHES */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">

              <span className="font-semibold text-[#68432F]">
                Trending:
              </span>

              {['Abaya', 'Co-ord', 'Hijab'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleTrendingSearch(term)}
                  className="rounded-full bg-[#F5EDE5] px-4 py-2 text-[#68432F] transition hover:bg-[#EBDCCB]"
                >
                  {term}
                </button>
              ))}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
