import React from 'react';
import FloatingLines from './components/FloatingLines';
import PillNav from './components/PillNav';
import logo from './assets/logo.svg';
import CentralHero from './components/CentralHero';
import AboutSection from './components/AboutSection';
import CourseSections from './components/CourseSections';
import TeachersPortal from './components/TeachersPortal';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import './App.css';

const App: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const floatingLinesConfig = prefersReducedMotion
    ? {
        lineCount: [3, 4, 5] as [number, number, number],
        lineDistance: [12, 10, 8] as [number, number, number],
        animationSpeed: 0.45,
        maxPixelRatio: 0.75,
      }
    : {
        lineCount: [5, 7, 9] as [number, number, number],
        lineDistance: [10, 8, 6] as [number, number, number],
        animationSpeed: 0.65,
        maxPixelRatio: 1.0,
      };

  return (
    <div className="app" id="top">
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '#top' },
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Schedule', href: '#schedule' },
          { label: 'Teachers', href: '#teachers' },
          { label: 'Join', href: '#join' },
        ]}
        activeHref="/"
        className="custom-nav"
        baseColor="#0e0a1d"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#0e0a1d"
      />
      <div className="floating-lines-overlay">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={floatingLinesConfig.lineCount}
          lineDistance={floatingLinesConfig.lineDistance}
          bendRadius={3.5}
          bendStrength={-0.35}
          interactive={false}
          parallax={false}
          animationSpeed={floatingLinesConfig.animationSpeed}
          parallaxStrength={0}
          linesGradient={['#f5a8e1', '#6569cc']}
          maxPixelRatio={floatingLinesConfig.maxPixelRatio}
          antialias={false}
        />
      </div>

      <div className="app-content">
        <CentralHero />
        <AboutSection disableAnimations={prefersReducedMotion} />
        <CourseSections />
        <TeachersPortal />
      </div>
    </div>
  );
};

export default App;
