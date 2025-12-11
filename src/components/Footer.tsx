import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Space Innovation Platform</h3>
            <p className="footer-description">
              Pushing the boundaries of space exploration through innovation and collaboration.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:contact@spaceinnovation.com" className="footer-link">
                  📧 Email Us
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  🔗 GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  💼 LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  🐦 Twitter
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="#documentation" className="footer-link">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="footer-link">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#support" className="footer-link">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Space Innovation Platform. All rights reserved.
          </p>
          <div className="footer-credits">
            <span>Built with passion for space exploration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
