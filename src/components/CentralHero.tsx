import React from 'react';
import RotatingText from './RotatingText';
import './CentralHero.css';

const CentralHero: React.FC = () => {
  return (
    <main className="central-hero">
      <div className="central-hero__content">
        <p className="central-hero__eyebrow">Spengergasse</p>
        <h1 className="central-hero__title">NASA Moonshot-Training</h1>
        <p className="central-hero__lead">
          Hands-on space science, engineering, and mission simulations inspired by real NASA programs.
          Build rockets, code data, and train like a crew—together.
        </p>
        <div className="central-hero__rotator">
          <span className="central-hero__rotator-label">You will explore</span>
          <RotatingText
            texts={['Space Science', 'Mission Simulations', 'Rockets & Robotics', 'Data & Coding', 'Team Operations']}
            mainClassName="central-hero__rotating"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.04}
            splitLevelClassName="central-hero__split"
            elementLevelClassName="central-hero__element"
            transition={{ type: 'spring', damping: 34, stiffness: 260 }}
            rotationInterval={3600}
          />
        </div>
      </div>
    </main>
  );
};

export default CentralHero;
