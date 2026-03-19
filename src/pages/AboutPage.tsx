import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { teamMembers, studentTeam } from '../data/teamData';
import './AboutPage.css';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}

const timeline: TimelineEvent[] = [
  { date: 'Sept 2024', title: 'Mission Kickoff', description: 'Moonshot officially launched. Team assembled, focus areas assigned, initial research briefings conducted.', side: 'left' },
  { date: 'Oct 2024', title: 'Habitat Design Sprint', description: 'Three weeks of intensive habitat design work, culminating in a modular inflatable-regolith composite design.', side: 'right' },
  { date: 'Nov 2024', title: 'First Lab Experiments', description: 'Agriculture and energy experiments begin. 30-day hydroponics trial initiated, solar modeling underway.', side: 'left' },
  { date: 'Jan 2025', title: 'Rover Prototype Testing', description: 'Scale-model autonomous rover completed and tested across 50 navigation trials in our terrain sandbox.', side: 'right' },
  { date: 'Mar 2025', title: '72-Hour Mission Sim', description: 'Full crew simulation in confined habitat mock-up. Critical lessons in communication, scheduling, and emergency response.', side: 'left' },
  { date: 'Jun 2025', title: 'Telescope Concept Finalized', description: 'Far-side radio telescope array concept presented. 48-dish interferometer design targeting Cosmic Dawn frequencies.', side: 'right' },
];

const focusAreas = [
  {
    title: 'Lunar Habitation',
    description: 'Designing modular, radiation-shielded living spaces that can support a 12-person crew through the 14-day lunar night. Our inflatable-regolith composite approach dramatically reduces launch mass while ensuring long-term structural integrity.',
    color: '#00d4ff',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    title: 'Science & Resources',
    description: 'Proving closed-loop sustainability through hydroponics experiments, solar energy storage, and regolith processing. Every experiment is designed to answer the fundamental question: can humans live off the land on the Moon?',
    color: '#10b981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    title: 'Space Observation',
    description: 'The Moon\'s far side offers the quietest radio environment in the inner Solar System. Our proposed 500-meter baseline interferometer array would observe frequencies completely blocked by Earth\'s ionosphere, potentially detecting the first stars of the universe.',
    color: '#f472b6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
];

const AboutPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="about-hero__content">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            NASA-Freifach · Spengergasse Vienna
          </motion.p>
          <motion.h1 className="about-hero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            About <span className="gradient-text">Moonshot</span>
          </motion.h1>
          <motion.p className="about-hero__subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}>
            We are a student team from Spengergasse, Vienna, designing the technologies,
            systems, and operational frameworks needed for humanity to live permanently on the Moon.
            This is a school project — and a serious engineering mission.
          </motion.p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="about-mission">
        <div className="about-mission__inner">
          <motion.blockquote
            className="about-mission__quote"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            "The Moon is not the destination — it's the proving ground for everything that comes next."
            <cite className="about-mission__cite">— Moonshot Team Motto</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Focus areas */}
      <section className="about-focus">
        <div className="about-focus__inner">
          <motion.div className="about-focus__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">What We're Working On</p>
            <h2 className="about-focus__title">Three Problems, <span className="gradient-text">One Mission</span></h2>
          </motion.div>
          <div className="about-focus__grid">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                className="about-focus-card"
                style={{ '--focus-color': area.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="about-focus-card__icon">{area.icon}</div>
                <h3 className="about-focus-card__title">{area.title}</h3>
                <p className="about-focus-card__desc">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="about-team">
        <div className="about-team__inner">
          <motion.div className="about-team__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Our Guides</p>
            <h2 className="about-team__title">Mission <span className="gradient-text">Directors</span></h2>
          </motion.div>
          <div className="about-mentors__grid">
            {teamMembers.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                className="about-mentor-card"
                style={{ '--mentor-color': mentor.borderColor } as React.CSSProperties}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="about-mentor-card__avatar">{mentor.initials}</div>
                <h3 className="about-mentor-card__name">{mentor.name}</h3>
                <p className="about-mentor-card__role">{mentor.role}</p>
                <p className="about-mentor-card__bio">{mentor.bio}</p>
                <div className="about-mentor-card__focus">
                  {mentor.focus.map(f => (
                    <span key={f} className="about-mentor-card__tag">{f}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Student team grid */}
          <motion.div className="about-students" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="about-students__title">Student Team</h3>
            <div className="about-students__grid">
              {studentTeam.map((s, i) => (
                <motion.div
                  key={s.name}
                  className="about-student-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <div className="about-student-card__avatar">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="about-student-card__name">{s.name}</p>
                    <p className="about-student-card__role">{s.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="about-timeline__inner">
          <motion.div className="about-timeline__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Mission Progress</p>
            <h2 className="about-timeline__title">Project <span className="gradient-text">Timeline</span></h2>
          </motion.div>

          <div className="timeline">
            <div className="timeline__line" />
            {timeline.map((event, i) => (
              <motion.div
                key={i}
                className={`timeline__event timeline__event--${event.side}`}
                initial={{ opacity: 0, x: event.side === 'left' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="timeline__dot" />
                <div className="timeline__card glass-card">
                  <p className="timeline__date">{event.date}</p>
                  <h3 className="timeline__title">{event.title}</h3>
                  <p className="timeline__desc">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School section */}
      <section className="about-school">
        <div className="about-school__inner">
          <motion.div className="about-school__card glass-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
            <div className="about-school__content">
              <p className="eyebrow">Our Home</p>
              <h2 className="about-school__title">Spengergasse, Vienna</h2>
              <p className="about-school__text">
                HTL Spengergasse is one of Austria's premier technical higher schools. The NASA-Freifach
                (extracurricular elective) program brings together students from different departments
                to tackle an interdisciplinary challenge inspired by real NASA mission planning methodologies.
              </p>
              <p className="about-school__text">
                Every project, experiment, and simulation we run is grounded in real engineering constraints.
                We don't just dream about the Moon — we test, fail, learn, and improve.
              </p>
              <div className="about-school__actions">
                <Link to="/signup" className="btn-primary">
                  Join Moonshot
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/blog" className="btn-secondary">Read our Logs</Link>
              </div>
            </div>
            <div className="about-school__visual">
              <div className="about-school__moon" />
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
