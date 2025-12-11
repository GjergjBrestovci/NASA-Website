import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.classList.add('animate-in');
    }
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Space Innovation Platform</h1>
        <p className="hero-tagline">
          Transforming space exploration through cutting-edge technology and collaborative innovation
        </p>
        <button className="hero-cta">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;
