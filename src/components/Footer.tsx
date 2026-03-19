import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer__top-border" />
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="url(#fg1)" strokeWidth="2" />
              <circle cx="20" cy="20" r="8" fill="url(#fg2)" opacity="0.9" />
              <circle cx="28" cy="12" r="3" fill="#00d4ff" opacity="0.7" />
              <defs>
                <linearGradient id="fg1" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#7c3aed" />
                  <stop offset="1" stopColor="#00d4ff" />
                </linearGradient>
                <linearGradient id="fg2" x1="0" y1="0" x2="20" y2="20">
                  <stop stopColor="#7c3aed" />
                  <stop offset="1" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>
            <span className="footer__logo-text">MOONSHOT</span>
          </div>
          <p className="footer__tagline">
            Establishing humanity's sustainable presence on the Moon.
            A NASA-Freifach project at Spengergasse, Vienna.
          </p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__nav-title">Navigate</h4>
          <ul className="footer__nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Mission Logs</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signup">Join Us</Link></li>
          </ul>
        </div>

        <div className="footer__nav">
          <h4 className="footer__nav-title">Focus Areas</h4>
          <ul className="footer__nav-list">
            <li><a href="#habitation">Lunar Habitation</a></li>
            <li><a href="#science">Science & Resources</a></li>
            <li><a href="#observation">Space Observation</a></li>
          </ul>
        </div>

        <div className="footer__nav">
          <h4 className="footer__nav-title">Contact</h4>
          <ul className="footer__nav-list footer__nav-list--contact">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Spengergasse 20, 1050 Wien
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              moonshot@spengergasse.at
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {currentYear} Moonshot — NASA-Freifach, Spengergasse. All rights reserved.
        </p>
        <p className="footer__credit">
          Built with passion for the cosmos.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
