
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="lhf-footer">
      <div className="lhf-wrap lhf-footer-inner ">

        {/* BRAND SECTION */}
        <div className="lhf-brand-section">
          <Link to="/" className="lhf-foot-brand">
            <img
              className="lhf-foot-logo"
              src="/lanchi%20logo.png"
              alt="LANCHI FOR HER"
            />
            <span className="lhf-foot-title">
              LANCHI FOR HER
            </span>
          </Link>

          <p className="lhf-blurb">
            Elegant modest fashion for every woman.
            Discover timeless styles made to inspire confidence.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="lhf-social">
            <a
              href="https://www.instagram.com/lanchi.forher?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://www.facebook.com/YOUR_PAGE/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a
              href="https://www.pinterest.com/YOUR_USERNAME/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <i className="fa-brands fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <nav className="lhf-cols" aria-label="Footer navigation">

          <div className="lhf-col">
            <h3>Explore</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/category">Shop All</Link></li>
              <li><Link to="/models">Our Models</Link></li>
              <li><Link to="/#about">About Us</Link></li>
            </ul>
          </div>

          <div className="lhf-col">
            <h3>Customer Care</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/contact">Shipping & Returns</Link></li>
              <li><Link to="/contact">Order Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

        </nav>

        {/* COPYRIGHT */}
        <div className="lhf-bottom">
          <p>
            © {new Date().getFullYear()} LANCHI FOR HER.
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
