import React, { useEffect, useRef, useState } from 'react';
import './TeamStory.css';

const TeamStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`team-story ${isVisible ? 'visible' : ''}`}
    >
      <div className="team-story-container">
        <h2 className="section-title">Our Story</h2>
        <div className="story-content">
          <div className="story-card">
            <div className="story-icon">🚀</div>
            <p className="story-text">
              [INSERT TEAM STORY HERE]
            </p>
            <p className="story-placeholder">
              This is where your team's inspiring journey will be told. Share how you came together,
              what drives your passion for space exploration, and the unique vision that sets your
              project apart. Your story will connect with readers and showcase the human element
              behind the innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamStory;
