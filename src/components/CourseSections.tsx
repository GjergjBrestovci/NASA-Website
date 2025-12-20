import React, { useEffect, useState } from 'react';
import './CourseSections.css';
import ChromaGrid from './ChromaGrid';
import SpotlightCard from './SpotlightCard';

type ScheduleItem = {
  id?: string;
  title: string;
  slot: string;
  focus: string;
  status: string;
};

const fallbackSchedule: ScheduleItem[] = [
  {
    title: 'Launch Briefing',
    slot: 'Mondays · 16:00 – 17:00',
    focus: 'Mission overview, crew roles, and weekly objectives.',
    status: 'live',
  },
  {
    title: 'Build & Test Lab',
    slot: 'Wednesdays · 16:00 – 18:00',
    focus: 'Hands-on builds, sensor wiring, and code checkpoints.',
    status: 'upcoming',
  },
  {
    title: 'Flight Readiness Sim',
    slot: 'Fridays · 15:30 – 17:00',
    focus: 'Comms loops, anomalies, and go/no-go drills.',
    status: 'upcoming',
  },
  {
    title: 'Launch Day',
    slot: 'Monthly · Weather permitting',
    focus: 'Integration, final checks, and launch operations.',
    status: 'milestone',
  },
];

const CourseSections: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(fallbackSchedule);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  useEffect(() => {
    const loadSchedule = async () => {
      setLoadingSchedule(true);
      try {
        const res = await fetch('/api/schedule');
        if (!res.ok) {
          throw new Error('Failed to load schedule');
        }
        const payload = await res.json();
        if (Array.isArray(payload.items) && payload.items.length) {
          setSchedule(payload.items);
        }
      } catch (_err) {
        setSchedule(fallbackSchedule);
      } finally {
        setLoadingSchedule(false);
      }
    };

    loadSchedule();
  }, []);

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
          <SpotlightCard className="card glass" spotlightColor="rgba(125, 249, 255, 0.2)">
            <h3>What You Will Do</h3>
            <ul>
              <li>Hands-on experiments and microgravity demos</li>
              <li>Mission simulations with roles and flight rules</li>
              <li>Research sprints on astronomy and space systems</li>
              <li>Team builds: rockets, rovers, and payload mockups</li>
            </ul>
          </SpotlightCard>
          <SpotlightCard className="card glass" spotlightColor="rgba(125, 249, 255, 0.2)">
            <h3>Why It Matters</h3>
            <ul>
              <li>Learn NASA systems thinking and crew teamwork</li>
              <li>Blend physics, coding, and design for real outcomes</li>
              <li>Practice communication, go/no-go readiness, and briefings</li>
              <li>Connect STEM skills to real missions and careers</li>
            </ul>
          </SpotlightCard>
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
          ].map(item => (
            <SpotlightCard key={item.title} className="card glass" spotlightColor="rgba(123, 92, 255, 0.18)">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </SpotlightCard>
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
          {loadingSchedule && <p className="section__note">Loading latest schedule...</p>}
        </div>
        <div className="schedule">
          <div className="schedule__rail" aria-hidden="true" />
          {schedule.map((item, index) => (
            <div key={item.title} className={`schedule__card ${item.status}`}>
              <div className="schedule__marker">
                <span className="schedule__dot" />
                <span className="schedule__pulse" />
                <span className="schedule__index">{index + 1}</span>
              </div>
              <div className="schedule__content">
                <div className="schedule__meta">
                  <span className="tag">{item.slot}</span>
                </div>
                <h3 className="schedule__title">{item.title}</h3>
                <p className="schedule__focus">{item.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section block" id="about-team">
        <div className="section__heading">
          <p className="eyebrow">About the Team</p>
          <h2 className="section__title">How We Work With You</h2>
          <p className="section__subtitle">A small crew of educators, engineers, and designers focused on hands-on space learning.</p>
        </div>
        <div className="section__grid two">
          <div className="card glass">
            <h3>What to Expect</h3>
            <ul>
              <li>Mentors who coach like a mission control lead</li>
              <li>Studios that mix hardware builds, data, and design</li>
              <li>Clear rubrics, feedback loops, and readiness checks</li>
              <li>Inclusive teams where every role matters</li>
            </ul>
          </div>
          <div className="card glass">
            <h3>Who We Are</h3>
            <ul>
              <li>Astrophysics and aerospace background across the staff</li>
              <li>Robotics and fabrication mentors for rapid prototyping</li>
              <li>Software coaches for telemetry, data viz, and automation</li>
              <li>Designers who focus on storytelling and crew comms</li>
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
