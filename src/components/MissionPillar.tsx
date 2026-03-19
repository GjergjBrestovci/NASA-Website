import React from 'react';
import { motion } from 'framer-motion';
import './MissionPillar.css';

interface Pillar {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
}

const HabitationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const ScienceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
  </svg>
);

const ObservationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const pillars: Pillar[] = [
  {
    icon: <HabitationIcon />,
    label: 'Focus Area 01',
    title: 'Lunar Habitation',
    description:
      'Designing modular, radiation-shielded habitats using inflatable structures and compacted regolith — built to sustain a 12-person crew through 14-day lunar nights.',
    stat: '6',
    statLabel: 'Habitat Modules',
    color: '#00d4ff',
  },
  {
    icon: <ScienceIcon />,
    label: 'Focus Area 02',
    title: 'Science & Resources',
    description:
      'Closed-loop hydroponics, solar energy storage, and regolith processing experiments that prove sustainable self-sufficiency is achievable on the lunar surface.',
    stat: '50+',
    statLabel: 'Experiments Run',
    color: '#10b981',
  },
  {
    icon: <ObservationIcon />,
    label: 'Focus Area 03',
    title: 'Space Observation',
    description:
      'Designing a far-side radio telescope array to access frequency ranges blocked by Earth\'s ionosphere — unlocking the Cosmic Dawn and exoplanet magnetospheres.',
    stat: '48',
    statLabel: 'Antenna Dishes',
    color: '#f472b6',
  },
];

const MissionPillars: React.FC = () => {
  return (
    <section className="mission-pillars">
      <div className="mission-pillars__inner">
        <motion.div
          className="mission-pillars__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Our Focus Areas</p>
          <h2 className="mission-pillars__title">
            Three Pillars of the{' '}
            <span className="gradient-text">Moonshot Mission</span>
          </h2>
          <p className="mission-pillars__subtitle">
            Every challenge of permanent lunar habitation falls into one of three interconnected domains.
            Our teams tackle each simultaneously.
          </p>
        </motion.div>

        <div className="mission-pillars__grid">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="mission-pillar"
              style={{ '--pillar-color': pillar.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className="mission-pillar__glow" />
              <div className="mission-pillar__icon-wrap">
                {pillar.icon}
              </div>
              <p className="mission-pillar__label">{pillar.label}</p>
              <h3 className="mission-pillar__title">{pillar.title}</h3>
              <p className="mission-pillar__desc">{pillar.description}</p>
              <div className="mission-pillar__stat">
                <span className="mission-pillar__stat-number">{pillar.stat}</span>
                <span className="mission-pillar__stat-label">{pillar.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionPillars;
