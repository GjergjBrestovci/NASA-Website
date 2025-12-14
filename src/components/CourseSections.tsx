import React from 'react';
import './CourseSections.css';
import ChromaGrid from './ChromaGrid';

const CourseSections: React.FC = () => {
  return (
    <div className="course-shell">
      <section className="section block" id="about-course">
        <div className="section__heading">
          <p className="eyebrow">About the Course</p>
          <h2 className="section__title">NASA-inspired Freifach</h2>
          <p className="section__subtitle">
            Explore astronomy, rockets, robotics, physics, and mission planning through NASA-style labs. Students build models, run simulations, code data pipelines, and collaborate like a real flight team.
          </p>
        </div>
        <div className="section__grid two">
          <div className="card glass">
            <h3>What You Will Do</h3>
            <ul>
              <li>Hands-on experiments and microgravity demos</li>
              <li>Mission simulations with roles and flight rules</li>
              <li>Research sprints on astronomy and space systems</li>
              <li>Team builds: rockets, rovers, and payload mockups</li>
            </ul>
          </div>
          <div className="card glass">
            <h3>Why It Matters</h3>
            <ul>
              <li>Learn NASA systems thinking and crew teamwork</li>
              <li>Blend physics, coding, and design for real outcomes</li>
              <li>Practice communication, go/no-go readiness, and briefings</li>
              <li>Connect STEM skills to real missions and careers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section block" id="projects">
        <div className="section__heading">
          <p className="eyebrow">Projects & Missions</p>
          <h2 className="section__title">Studio & Lab Highlights</h2>
          <p className="section__subtitle">Model rockets, rover drills, telescope nights, coding tasks, and mission sims based on NASA challenges.</p>
        </div>
        <div className="section__grid three">
          {[
            { title: 'Model Rocket Campaign', desc: 'Design, simulate, and fly small launchers with data capture.' },
            { title: 'Rover Nav Lab', desc: 'Obstacle avoidance, sensor fusion, and surface ops drills.' },
            { title: 'Mission Control Sim', desc: 'Roles, comm loops, and anomaly response practice.' },
            { title: 'Astro Research', desc: 'Spectra, exoplanets, and orbital mechanics mini-projects.' },
            { title: 'Data & Coding', desc: 'Python notebooks for telemetry parsing and visualization.' },
            { title: 'Habitat Concepts', desc: 'Closed-loop life support sketches and rapid prototyping.' },
          ].map(item => (
            <div key={item.title} className="card glass">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section block" id="team">
        <div className="section__heading">
          <p className="eyebrow">Team</p>
          <h2 className="section__title">Guides & Mentors</h2>
          <p className="section__subtitle">Educators with a love for space, STEM, and student-led discovery.</p>
        </div>
        <ChromaGrid
          className="team-grid"
          radius={720}
          items={[
            {
              image: 'https://images.unsplash.com/photo-1506792006437-256b665541e3?auto=format&fit=crop&w=900&q=80',
              title: 'Amira Solano',
              subtitle: 'Astrophysics, mission design, and flight-readiness drills.',
              handle: '@amira.sol',
              location: 'Zurich · Lead Instructor',
              borderColor: '#7df9ff',
              gradient: 'linear-gradient(160deg,#0b1b38,#1a4fd0)',
            },
            {
              image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
              title: 'Lena Ortiz',
              subtitle: 'Robotics, fabrication labs, and launch safety protocols.',
              handle: '@lena.builds',
              location: 'Bern · Lab Mentor',
              borderColor: '#12d8fa',
              gradient: 'linear-gradient(200deg,#04142a,#0fa3b1)',
            },
            {
              image: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=900&q=80',
              title: 'Noah Richter',
              subtitle: 'Data pipelines, flight software, and telemetry visualization.',
              handle: '@noahr.codes',
              location: 'Geneva · Data Mentor',
              borderColor: '#d946ef',
              gradient: 'linear-gradient(145deg,#120b2e,#b832f0)',
            },
          ]}
        />
      </section>

      <section className="section block" id="schedule">
        <div className="section__heading">
          <p className="eyebrow">Schedule</p>
          <h2 className="section__title">Sessions & Events</h2>
          <p className="section__subtitle">Weekly meetups, build nights, and milestone launches.</p>
        </div>
        <div className="schedule">
          <div className="schedule__row">
            <span>Weekly Lab</span>
            <span>Wednesdays · 16:00 – 18:00</span>
          </div>
          <div className="schedule__row">
            <span>Build & Test</span>
            <span>Fridays · 15:30 – 17:00</span>
          </div>
          <div className="schedule__row">
            <span>Mission Sim</span>
            <span>Monthly · Announced in class</span>
          </div>
          <div className="schedule__row">
            <span>Launch Day</span>
            <span>Quarterly · Weather permitting</span>
          </div>
        </div>
      </section>

      <section className="section block" id="resources">
        <div className="section__heading">
          <p className="eyebrow">Resources</p>
          <h2 className="section__title">NASA Links & Tools</h2>
          <p className="section__subtitle">Curated reads, videos, and toolkits to deepen your build and research sprints.</p>
        </div>
        <div className="section__grid two">
          <div className="card glass">
            <h3>Learn</h3>
            <ul>
              <li><a href="https://www.nasa.gov" target="_blank" rel="noreferrer">NASA Missions Portal</a></li>
              <li><a href="https://www.jpl.nasa.gov/edu/" target="_blank" rel="noreferrer">JPL Education</a></li>
              <li><a href="https://eyes.nasa.gov/" target="_blank" rel="noreferrer">NASA Eyes Simulations</a></li>
            </ul>
          </div>
          <div className="card glass">
            <h3>Build</h3>
            <ul>
              <li><a href="https://openmct.nasa.gov/" target="_blank" rel="noreferrer">Open MCT</a></li>
              <li><a href="https://www.nasa.gov/stem" target="_blank" rel="noreferrer">STEM Resources</a></li>
              <li><a href="https://solarsystem.nasa.gov/basics/" target="_blank" rel="noreferrer">Solar System Basics</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section block" id="gallery">
        <div className="section__heading">
          <p className="eyebrow">Gallery</p>
          <h2 className="section__title">Builds & Moments</h2>
          <p className="section__subtitle">Snapshots from labs, launch pads, and mission control sims.</p>
        </div>
        <div className="gallery">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="gallery__item" aria-label={`Gallery placeholder ${i + 1}`}>Cosmic Capture</div>
          ))}
        </div>
      </section>

      <section className="section block join" id="join">
        <div className="section__heading">
          <p className="eyebrow">Join the Class</p>
          <h2 className="section__title">Ready for Launch?</h2>
          <p className="section__subtitle">Sign up to receive details, prerequisites, and the next mission briefing.</p>
        </div>
        <div className="join__cta">
          <a className="cta-button" href="mailto:space-class@example.com">Request Info</a>
          <a className="cta-button ghost" href="#schedule">View Schedule</a>
        </div>
      </section>
    </div>
  );
};

export default CourseSections;
