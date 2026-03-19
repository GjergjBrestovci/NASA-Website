export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  date: string;
  tags: string[];
  image: string;
  readTime: number;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'lunar-habitat-design-2025',
    title: 'Designing the Perfect Lunar Habitat: Our Team\'s Approach',
    excerpt:
      'After months of research and simulation, our habitat design team presents a modular approach to sustainable lunar living — one that balances radiation shielding, psychological comfort, and resource efficiency.',
    content: `
      <p>Establishing a permanent human presence on the Moon demands housing that can endure extreme temperatures ranging from -173°C at night to 127°C during the lunar day, constant micrometeorite bombardment, and radiation levels far beyond what Earth's atmosphere shields us from.</p>
      <p>Our team has settled on an inflatable-regolith composite design. A lightweight inflatable shell is launched from Earth and deployed on the lunar surface, then progressively covered with compacted regolith for radiation and thermal shielding. This approach dramatically reduces launch mass while providing long-term protection.</p>
      <h3>Key Design Principles</h3>
      <ul>
        <li>Modular expansion: begin with a single 6m diameter unit, expandable to a six-module cluster</li>
        <li>Interior zoning: separate sleeping, working, and social areas to support crew psychology</li>
        <li>Redundant life support with emergency isolation between modules</li>
        <li>Natural light simulation via LED arrays tuned to circadian rhythms</li>
      </ul>
      <p>Our current prototype scale model is being stress-tested with simulated regolith at Spengergasse. Results so far are promising: the composite shell maintains integrity under simulated micrometeorite impact at velocities up to 2 km/s.</p>
    `,
    author: {
      name: 'Lena Hofmann',
      role: 'Habitat Engineer',
      initials: 'LH',
    },
    date: '2025-11-12',
    tags: ['Habitation', 'Design', 'Engineering'],
    image: '/nasa-meeting.jpg',
    readTime: 6,
    featured: true,
  },
  {
    id: '2',
    slug: 'hydroponic-lunar-farming',
    title: 'Growing Food on the Moon: Our Hydroponic Experiment Results',
    excerpt:
      'Can lettuce survive in simulated lunar gravity with recycled water and LED grow lights? We ran a 30-day hydroponic trial with surprising results that could shape the future of off-world agriculture.',
    content: `
      <p>Food security is one of the most critical challenges for any long-duration lunar mission. Resupply from Earth is prohibitively expensive — each kilogram costs roughly $10,000 to send to the Moon. Growing food on-site isn't just convenient; it's essential.</p>
      <p>Our agriculture team set up a closed-loop hydroponic system using nutrient solution derived from simulated lunar regolith extract, recycled greywater, and 18-hour LED grow cycles tuned to plant absorption peaks (450nm blue, 660nm red).</p>
      <h3>30-Day Trial Results</h3>
      <p>We grew three crop varieties under simulated 1/6g conditions using our centrifuge rig:</p>
      <ul>
        <li><strong>Butter lettuce:</strong> 94% germination rate, harvest yield 87% of Earth baseline</li>
        <li><strong>Cherry tomatoes:</strong> slower growth (-18%), but fruit quality comparable</li>
        <li><strong>Dwarf wheat:</strong> significant stunting under low gravity — further study needed</li>
      </ul>
      <p>The water recycling system achieved 91% efficiency, meaning only 9% of water needed to be replenished per cycle. This is within viable parameters for a lunar base scenario where ice mining from the poles could supply the remainder.</p>
    `,
    author: {
      name: 'Marco Schneider',
      role: 'Agriculture Researcher',
      initials: 'MS',
    },
    date: '2025-10-28',
    tags: ['Science', 'Agriculture', 'Experiments'],
    image: '/nasa-robot.jpg',
    readTime: 5,
    featured: false,
  },
  {
    id: '3',
    slug: 'solar-energy-lunar-night',
    title: 'Powering Through the Lunar Night: Our Energy Storage Solution',
    excerpt:
      'The Moon\'s 14-day night cycle is one of the biggest engineering hurdles for a permanent base. We modeled a hybrid solar + fuel cell system that could keep the lights on through the long dark.',
    content: `
      <p>The lunar night lasts approximately 354 hours — nearly 15 Earth days. During this period, solar panels generate zero power, yet a lunar base must maintain life support, heating, communications, and scientific instruments without interruption.</p>
      <p>Our energy team modeled a three-tier hybrid system:</p>
      <h3>System Architecture</h3>
      <ol>
        <li><strong>Primary: Solar array + lithium-sulfur batteries</strong> — 200 kW peak generation, 72 kWh storage for short-term buffering</li>
        <li><strong>Secondary: Hydrogen fuel cells</strong> — electrolysis during day splits water into H₂/O₂, stored cryogenically. Fuel cells regenerate power at night.</li>
        <li><strong>Tertiary: Small modular reactor (SMR)</strong> — 10 kW continuous baseline power, independent of solar cycle</li>
      </ol>
      <p>Our simulations show this architecture can sustain a 12-person base through the full lunar night with 20% power reserve margin. The SMR alone covers life-critical systems, while the fuel cells handle scientific equipment and comfort systems.</p>
    `,
    author: {
      name: 'Fatima Al-Rashid',
      role: 'Energy Systems Lead',
      initials: 'FA',
    },
    date: '2025-10-05',
    tags: ['Science', 'Energy', 'Engineering'],
    image: '/space-bg.jpg',
    readTime: 7,
    featured: true,
  },
  {
    id: '4',
    slug: 'lunar-rover-navigation',
    title: 'Autonomous Rover Navigation in Simulated Lunar Terrain',
    excerpt:
      'Our robotics team built a 1:10 scale autonomous rover and tested it in our custom lunar terrain sandbox. Here\'s what we learned about navigating crater fields and loose regolith.',
    content: `
      <p>Lunar surface operations require robots that can navigate without real-time human control — communication delays between Earth and the Moon average 1.3 seconds each way, making direct teleoperation impractical for fine motor tasks.</p>
      <p>Our rover uses a combination of stereo vision, LiDAR point clouds, and a trained neural network to classify terrain hazards and plan safe routes in real time.</p>
      <h3>Testing Results</h3>
      <p>We ran 50 navigation trials across three terrain configurations in our 4m × 3m sandbox:</p>
      <ul>
        <li><strong>Open flat terrain:</strong> 100% success rate, average speed 0.3 m/s</li>
        <li><strong>Crater field (5 craters):</strong> 88% success, 2 collisions in 16 trials</li>
        <li><strong>Steep incline (15°):</strong> 76% success — slip detection algorithm needs refinement</li>
      </ul>
      <p>The neural network was trained on 10,000 synthetic terrain images generated in Blender, then fine-tuned with 2,000 real photos from our sandbox. Transfer learning dramatically reduced the data requirement compared to training from scratch.</p>
    `,
    author: {
      name: 'Jonas Weber',
      role: 'Robotics Engineer',
      initials: 'JW',
    },
    date: '2025-09-18',
    tags: ['Robotics', 'Science', 'Experiments'],
    image: '/nasa-robot.jpg',
    readTime: 8,
    featured: false,
  },
  {
    id: '5',
    slug: 'lunar-telescope-placement',
    title: 'Why the Moon is the Best Observatory in the Solar System',
    excerpt:
      'No atmosphere. No radio interference. One side permanently facing deep space. Our observation team explains why a lunar telescope array would revolutionize astronomy.',
    content: `
      <p>Earth-based telescopes battle atmospheric turbulence, light pollution, and radio frequency interference. Even the James Webb Space Telescope, orbiting at L2 1.5 million km from Earth, must contend with solar wind and limited servicability.</p>
      <p>The Moon offers something unique: a stable, airless platform where telescopes can operate 24/7 (from the perspective of the sky they observe), serviced by on-site crew, and shielded from Earth's radio noise on the far side.</p>
      <h3>Our Proposed Observatory Concept</h3>
      <p>We've designed a concept for a modular radio telescope array on the lunar far side:</p>
      <ul>
        <li>48 individual 5m dish antennas arranged in a 500m baseline interferometer</li>
        <li>Operating frequency: 1-300 MHz (impossible from Earth due to ionospheric blockage)</li>
        <li>Primary science target: the Cosmic Dawn — the epoch when the first stars lit up, 380 million years after the Big Bang</li>
        <li>Secondary target: exoplanet radio emissions, potentially revealing planetary magnetic fields</li>
      </ul>
      <p>This frequency range is completely inaccessible from Earth but could be the most scientifically rich window in astronomy. A lunar far-side array would be the most powerful radio telescope ever built.</p>
    `,
    author: {
      name: 'Clara Müller',
      role: 'Astrophysics Researcher',
      initials: 'CM',
    },
    date: '2025-09-02',
    tags: ['Observation', 'Science', 'Astronomy'],
    image: '/space-bg.jpg',
    readTime: 6,
    featured: false,
  },
  {
    id: '6',
    slug: 'team-mission-sim-debrief',
    title: 'Mission Simulation Debrief: What We Learned from 72 Hours in Isolation',
    excerpt:
      'Our team ran a full 72-hour lunar mission simulation — confined quarters, limited resources, scripted emergencies. The psychological and operational lessons were more profound than expected.',
    content: `
      <p>Understanding how humans perform under mission stress is as important as any engineering challenge. We spent 72 hours in our converted classroom "habitat" — a 20m² space simulating a lunar module interior, with rationed food, strict communication windows, and scripted technical failures.</p>
      <h3>Key Findings</h3>
      <p><strong>Communication protocols:</strong> Without a structured communication schedule, information overload became a serious problem by hour 18. We adopted the NASA "morning brief / evening debrief" format and saw immediate improvement.</p>
      <p><strong>Task rotation:</strong> Assigning fixed roles led to burnout in two team members by hour 36. Rotating responsibilities every 8 hours maintained performance and morale significantly better.</p>
      <p><strong>Emergency response:</strong> During the scripted "CO₂ scrubber failure" at hour 58, our team successfully diagnosed and resolved the simulated issue in 11 minutes — 4 minutes ahead of our target. Training protocols worked.</p>
      <p><strong>Sleep deprivation:</strong> The biggest surprise — cognitive performance on technical tasks dropped by an estimated 30% after 24 hours without sleep. Strict sleep scheduling will be non-negotiable in real missions.</p>
      <p>The simulation was uncomfortable, challenging, and occasionally frustrating. It was also the most valuable exercise our team has done. We came out of it more cohesive, better prepared, and deeply respectful of what real astronauts endure.</p>
    `,
    author: {
      name: 'Moonshot Team',
      role: 'NASA-Freifach',
      initials: 'MT',
    },
    date: '2025-08-15',
    tags: ['Team', 'Simulation', 'Operations'],
    image: '/nasa-meeting.jpg',
    readTime: 9,
    featured: false,
  },
];

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
};

export const getFeaturedPosts = (): BlogPost[] =>
  blogPosts.filter(p => p.featured);

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find(p => p.slug === slug);
