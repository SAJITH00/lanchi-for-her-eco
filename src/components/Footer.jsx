import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Footer.css';

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    showToast('Thank you for joining our private circle!', 'success');
    setEmail('');
  };

  return (
    <footer className="lhf-footer">
      <div className="lhf-wrap lhf-footer-inner">

        {/* TOP FOOTER */}
        <div className="lhf-top">

          {/* BRAND */}
          <div className="lhf-brand-section">
            <Link to="/" className="lhf-foot-brand">
              <img
                className="lhf-foot-logo"
                src="/lanchi%20logo.png"
                alt="LANCHI FOR HER Logo"
              />
              <span className="lhf-foot-title">LANCHI FOR HER</span>
            </Link>

            <p className="lhf-blurb">
              Fashion that celebrates every woman. Discover graceful,
              modest and timeless wardrobe essentials designed for
              modern women.
            </p>

            <div className="lhf-social">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
              >
                <i className="fa-brands fa-pinterest-p"></i>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="lhf-news">
            <span className="lhf-eyebrow">A LITTLE SOMETHING SPECIAL</span>

            <h2>Join Our Private Circle</h2>

            <p>
              Be the first to discover new collections, exclusive
              previews and inspiration for your everyday style.
            </p>

            {subscribed ? (
              <p className="lhf-success">
                ✓ You're on the VIP list. Welcome to our atelier.
              </p>
            ) : (
              <form className="lhf-form" onSubmit={handleSubscribe}>
                <label className="lhf-sr" htmlFor="newsletterEmail">
                  Email address
                </label>

                <input
                  className="lhf-input"
                  id="newsletterEmail"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="lhf-submit" type="submit">
                  Subscribe <span>→</span>
                </button>
              </form>
            )}

            <small>Thoughtful updates. No unnecessary emails.</small>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <nav className="lhf-cols" aria-label="Footer navigation">

          <div className="lhf-col">
            <h3>About</h3>
            <ul>
              <li><Link to="/#about">About us</Link></li>
              <li><Link to="/#about">Our artisans</Link></li>
              <li><Link to="/#about">Our story</Link></li>
            </ul>
          </div>

          <div className="lhf-col">
            <h3>Collection</h3>
            <ul>
              <li><Link to="/category?cat=abaya">Modest wear</Link></li>
              <li><Link to="/category?cat=silk">Abayas &amp; silks</Link></li>
              <li><Link to="/category?cat=tops">Everyday tops</Link></li>
            </ul>
          </div>

          <div className="lhf-col">
            <h3>Styling</h3>
            <ul>
              <li><Link to="/models">Hijab styling</Link></li>
              <li><Link to="/models">Lookbook</Link></li>
              <li><Link to="/models">Modesty guide</Link></li>
            </ul>
          </div>

          <div className="lhf-col">
            <h3>Orders</h3>
            <ul>
              <li><Link to="/cart">Shipping &amp; returns</Link></li>
              <li><Link to="/cart">Track order</Link></li>
              <li><Link to="/contact">Order FAQs</Link></li>
            </ul>
          </div>

          <div className="lhf-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms of service</Link></li>
              <li><Link to="/cookies">Cookie policy</Link></li>
            </ul>
          </div>

          <div className="lhf-col">
            <h3>Help</h3>
            <ul>
              <li><Link to="/contact">Contact support</Link></li>
              <li><Link to="/contact">WhatsApp concierge</Link></li>
              <li><Link to="/contact">Share feedback</Link></li>
            </ul>
          </div>

        </nav>

        {/* BOTTOM FOOTER */}
        <div className="lhf-bottom">
          <p>
            © {new Date().getFullYear()} LANCHI FOR HER.
            All rights reserved.
          </p>

          <p className="lhf-secure">
            <span>✧</span> Thoughtfully curated fashion
            <span>•</span>
            Made for every woman
          </p>
        </div>

      </div>
    </footer>
  );
}
