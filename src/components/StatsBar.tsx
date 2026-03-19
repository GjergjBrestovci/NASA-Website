import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsBar.css';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  { value: 12, suffix: '', label: 'Team Members', color: '#00d4ff' },
  { value: 3, suffix: '', label: 'Focus Areas', color: '#7c3aed' },
  { value: 50, suffix: '+', label: 'Experiments', color: '#10b981' },
  { value: 1, suffix: '', label: 'Moon', color: '#fbbf24' },
];

const CountUp: React.FC<{ value: number; suffix: string; active: boolean }> = ({ value, suffix, active }) => {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const duration = 1600;

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, value]);

  return <>{display}{suffix}</>;
};

const StatsBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      className="stats-bar"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="stats-bar__inner">
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="stats-bar__item">
              <span
                className="stats-bar__value"
                style={{ color: stat.color }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} active={inView} />
              </span>
              <span className="stats-bar__label">{stat.label}</span>
            </div>
            {i < stats.length - 1 && <div className="stats-bar__divider" />}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
};

export default StatsBar;
