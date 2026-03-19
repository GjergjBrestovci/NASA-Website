import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SignUpForm from '../components/SignUpForm';
import './SignUpPage.css';

const perks = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: 'Access to all mission briefings and research data',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: 'Hands-on experiment participation',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: 'Mentorship from engineering and science faculty',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: 'Mission simulation experiences',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: 'Featured in Moonshot blog and publications',
  },
];

const SignUpPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PageTransition>
      <div className="signup-page">
        {/* Left panel */}
        <div className="signup-panel signup-panel--info">
          <div className="signup-panel__bg" />
          <motion.div
            className="signup-panel__content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {/* Moon visual */}
            <div className="signup-moon-wrap" aria-hidden="true">
              <div className="signup-moon" />
              <div className="signup-moon__orbit" />
              <div className="signup-moon__satellite" />
            </div>

            <p className="eyebrow">Applications Open</p>
            <h1 className="signup-info__title">
              Join the <span className="gradient-text">Mission</span>
            </h1>
            <p className="signup-info__subtitle">
              We're selecting driven students passionate about space, engineering, and science
              to join the Moonshot program at Spengergasse.
              No prior experience required — just curiosity and commitment.
            </p>

            <ul className="signup-perks">
              {perks.map((perk, i) => (
                <motion.li
                  key={i}
                  className="signup-perk"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <span className="signup-perk__icon">{perk.icon}</span>
                  <span>{perk.text}</span>
                </motion.li>
              ))}
            </ul>

            <p className="signup-info__note">
              Questions? Email us at{' '}
              <a href="mailto:moonshot@spengergasse.at">moonshot@spengergasse.at</a>
            </p>
          </motion.div>
        </div>

        {/* Right panel — form */}
        <div className="signup-panel signup-panel--form">
          <motion.div
            className="signup-panel__content"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div className="signup-form-wrap">
              <h2 className="signup-form-wrap__title">Mission Application</h2>
              <p className="signup-form-wrap__subtitle">
                Fill in your details and tell us what drives you to explore space.
                We read every submission.
              </p>
              <SignUpForm />
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignUpPage;
