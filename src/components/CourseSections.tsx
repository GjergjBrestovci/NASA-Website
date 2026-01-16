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
          <h2 className="section__title">Spengergasse NASA Freifach</h2>
          <p className="section__subtitle">
            Explore astronomy, rockets, robotics, physics, and mission planning through NASA-style labs. Students build models, run simulations, code data pipelines, and collaborate like a real flight team.
          </p>
        </div>
        <div className="section__grid two">
          <SpotlightCard className="card glass" spotlightColor="rgba(125, 249, 255, 0.2)">
            <h3>What you will do</h3>
            <ul>
              <p>With great dedication and impressive creativity, our students are currently immersed in the demanding phases of our exciting NASA project. Working collaboratively across various complex sub-projects, they are developing detailed solutions that are not only technically innovative but could also offer tangible, practical applications for the future challenges of space travel. </p>
            </ul>
          </SpotlightCard>
          <SpotlightCard className="card glass" spotlightColor="rgba(125, 249, 255, 0.2)">
            <h3>Achievements</h3>
            <ul>
              <p>This year’s NASA Moonshot Course culminated in an impressive final day filled with inspiration, creativity, and team spirit. Together with other participants, we visited the Institute of Architectural Sciences at TU Wien, where several striking project presentations on the topic of 'Space Station Design' were showcased—all under the guidance of renowned space architect Dr. Sandra Häuplik-Meusburger.</p>
            </ul>
          </SpotlightCard>
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
              image: '',
              title: 'Teacher 1',
              subtitle: 'Something something something',
              handle: '',
              location: 'Vienna · Teacher 1',
              borderColor: '#7df9ff',
              gradient: 'linear-gradient(160deg,#0b1b38,#1a4fd0)',
            },
            {
              image: '',
              title: 'Teacher 2',
              subtitle: 'Something something something',
              handle: '',
              location: 'Vienna · Teacher 2',
              borderColor: '#12d8fa',
              gradient: 'linear-gradient(200deg,#04142a,#0fa3b1)',
            },
            {
              image: '',
              title: 'Teacher 3',
              subtitle: 'Something something something',
              handle: '',
              location: 'Vienna · Teacher 3',
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
              <p>Guided by mentors who coach like mission control leads, students work in studios that fuse hardware builds, data, and design. We ensure progress through clear rubrics, active feedback loops, and readiness checks. This fosters inclusive teams where every role matters, ensuring that every individual contribution is vital to the mission's success.</p>
            </ul>
          </div>
          <div className="card glass">
            <h3>Who We Are</h3>
            <ul>
              <p>At our core, we are passionate teachers with a genuine love for astronomy. As experienced programmers, we guide students through robotics and rapid prototyping. We support their software needs for telemetry and automation, while helping them design clear storytelling to ensure every mission concept is communicated effectively.</p>
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
          <div className="gallery__item">
            <img src="/nasa-robot.jpg" alt="NASA Spider Robot with ESP32 microcontroller" />
          </div>
          <div className="gallery__item">
            <img src="/nasa-meeting.jpg" alt="NASA team meeting" style={{ objectPosition: 'top' }} />
          </div>
          <div className="gallery__item">
            <img src="/nasa-team.jpg" alt="NASA team" />
          </div>
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
