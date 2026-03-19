import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import FloatingLines from '../components/FloatingLines';
import MissionPillars from '../components/MissionPillar';
import StatsBar from '../components/StatsBar';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogData';
import './HomePage.css';

const ScrollArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredPosts = blogPosts.slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollDown = () => {
    const next = heroRef.current?.nextElementSibling as HTMLElement;
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section className="home-hero" ref={heroRef}>
        <div className="home-hero__bg">
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[5, 7, 9]}
            lineDistance={[10, 8, 6]}
            animationSpeed={0.6}
            linesGradient={['#7c3aed', '#00d4ff']}
            bendRadius={3.5}
            bendStrength={-0.35}
            interactive={false}
            parallax={false}
            maxPixelRatio={1.0}
            antialias={false}
          />
        </div>
        <div className="home-hero__overlay" />

        <div className="home-hero__content">
          <motion.div
            className="home-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="home-hero__badge">
              <span className="home-hero__badge-dot" />
              NASA-Freifach · Spengergasse Vienna
            </span>
          </motion.div>

          <motion.h1
            className="home-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            Humanity's Next
            <br />
            <span className="gradient-text">Giant Leap.</span>
          </motion.h1>

          <motion.p
            className="home-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
          >
            Moonshot is a student-led mission to design, simulate, and prove the
            technologies needed to establish a sustainable human presence on the Moon —
            covering habitation, science, and deep-space observation.
          </motion.p>

          <motion.div
            className="home-hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link to="/about" className="btn-primary">
              Explore the Mission
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/blog" className="btn-secondary">
              Read Mission Logs
            </Link>
          </motion.div>
        </div>

        <motion.button
          className="home-hero__scroll-btn"
          onClick={handleScrollDown}
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ScrollArrow />
        </motion.button>

        {/* floating orbital rings decoration */}
        <div className="home-hero__rings" aria-hidden="true">
          <div className="home-hero__ring home-hero__ring--1" />
          <div className="home-hero__ring home-hero__ring--2" />
          <div className="home-hero__ring home-hero__ring--3" />
        </div>
      </section>

      {/* ── MISSION PILLARS ── */}
      <MissionPillars />

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── FEATURED BLOG ── */}
      <section className="home-blog">
        <div className="home-blog__inner">
          <motion.div
            className="home-blog__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">Mission Logs</p>
            <h2 className="home-blog__title">
              Latest from the <span className="gradient-text">Front Lines</span>
            </h2>
            <p className="home-blog__subtitle">
              Research findings, experiment results, and team updates from our ongoing lunar mission planning.
            </p>
          </motion.div>

          <div className="home-blog__grid">
            {featuredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          <motion.div
            className="home-blog__cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/blog" className="btn-secondary">
              View all Mission Logs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="home-cta">
        <div className="home-cta__inner">
          <motion.div
            className="home-cta__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="home-cta__glow home-cta__glow--left" />
            <div className="home-cta__glow home-cta__glow--right" />
            <div className="home-cta__content">
              <p className="eyebrow">Join Us</p>
              <h2 className="home-cta__title">
                Ready to Join the Mission?
              </h2>
              <p className="home-cta__text">
                We're looking for curious, driven students who want to tackle real space engineering challenges.
                No experience required — just passion.
              </p>
              <div className="home-cta__buttons">
                <Link to="/signup" className="btn-primary">
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/about" className="btn-secondary">Learn More</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
