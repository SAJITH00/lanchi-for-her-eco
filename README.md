# LANCHI FOR HER — Luxury Modest Fashion (React App)

A modern, responsive e-commerce web application built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Architecture & Features

### 1. Unified Shared Navbar & Footer Across ALL Pages
- **Navbar (`src/components/Navbar.jsx`)**:
  - Exact brand header from `index.html` featuring the official emblem and typography.
  - Active page indicator links: **Home**, **Category**, **Models**, **Contact**, **Login**.
  - Interactive search bar modal with trending suggestions.
  - Live **Wishlist** counter badge.
  - Live **Shopping Bag** counter badge.
  - Responsive mobile drawer menu with hamburger toggle.
- **Footer (`src/components/Footer.jsx`)**:
  - Interactive mouse spotlight glow effect.
  - VIP newsletter subscription form.
  - Comprehensive atelier directories (About, Collection, Styling, Orders, Legal, Help).
  - Social media links (Instagram, Pinterest, Facebook).
  - 256-bit secure checkout guarantee and copyright notices.
- **Master Layout (`src/components/Layout.jsx`)**:
  - Wraps every single page with the shared `Navbar` and `Footer`.
  - Automatic scroll-to-top on route change.
  - Global floating toast notifications.

---

### 2. Pages & Components

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero with 2026 Season badge, festive promo cards, circular category arches, new arrivals filterable tabs, testimonials, and brand story. |
| **Product** | `/product` | Product gallery with multi-angle thumbnails, color swatches, modest size selector, quantity counter, Add to Bag, Buy Now, and care accordion. |
| **Category** | `/category` | Full catalogue with live category pills, sort dropdown, search filtering, color swatches, prices in INR (₹), and quick add. |
| **Models** | `/models` | Editorial gallery lookbook with runway, atelier, and studio filters, photographer notes, and garment credits. |
| **Shopping Bag** | `/cart` | Dynamic cart items, quantity increment/decrement, free shipping progress bar, promo code engine (`LANCHI10`, `MODEST20`), delivery address form, and checkout order placement. |
| **Wishlist** | `/wishlist` | Curated saved items, category filtering, move individual or all items to bag, and share wishlist link. |
| **Contact** | `/contact` | Atelier inquiry form, WhatsApp concierge banner, boutique hours (Mumbai & New Delhi), and support contact. |
| **Login** | `/login` | Member sign-in & registration tabs, password visibility toggle, remember me, and VIP privileges summary. |

---

### 3. Shared State (`src/context/AppContext.jsx`)
- **Cart Context**: Live syncing between Product, Category, Wishlist, Navbar badge, and Cart page.
- **Wishlist Context**: Instant toggle with heart icons across all product cards and live Navbar counter.
- **Promo Coupon System**: Apply coupons with discount calculations.
- **Global Toast**: Instant feedback on user actions.

---

## 🚀 Running the Project

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```
Generates an optimized bundle in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
