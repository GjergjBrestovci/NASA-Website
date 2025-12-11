import React from 'react';
import MagicBento from './MagicBento';
import './AboutSection.css';

interface AboutSectionProps {
  disableAnimations?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ disableAnimations = false }) => {
  return (
    <section className="about-section" id="about">
      <div className="about-section__inner">
        <div className="about-section__intro">
          <p className="about-section__eyebrow">NASA Freifach</p>
          <h2 className="about-section__title">Projects & Missions</h2>
          <p className="about-section__subtitle">
            Hands-on simulations, model rockets, robotics, astro labs, and coding sprints inspired by NASA programs.
          </p>
        </div>
        <MagicBento
          textAutoHide={true}
          enableStars={!disableAnimations}
          enableSpotlight={!disableAnimations}
          enableBorderGlow={!disableAnimations}
          enableTilt={!disableAnimations}
          enableMagnetism={!disableAnimations}
          clickEffect={!disableAnimations}
          disableAnimations={disableAnimations}
          spotlightRadius={disableAnimations ? 220 : 300}
          particleCount={disableAnimations ? 6 : 10}
          glowColor="132, 0, 255"
        />
      </div>
    </section>
  );
};

export default AboutSection;
