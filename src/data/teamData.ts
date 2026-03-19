export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  borderColor: string;
  initials: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Stefan Brandl',
    role: 'Mission Director',
    bio: 'Aerospace engineering professor with 15 years of experience in mission planning and systems design. Leads the overall Moonshot program at Spengergasse.',
    focus: ['Mission Architecture', 'Systems Engineering'],
    borderColor: '#00d4ff',
    initials: 'SB',
  },
  {
    id: '2',
    name: 'Ing. Maria Kovacs',
    role: 'Science Coordinator',
    bio: 'Research scientist specializing in astrobiology and closed ecological life support systems. Guides our agriculture and biology experiments.',
    focus: ['Astrobiology', 'Life Support'],
    borderColor: '#7c3aed',
    initials: 'MK',
  },
  {
    id: '3',
    name: 'DI Thomas Richter',
    role: 'Engineering Lead',
    bio: 'Structural engineer and robotics specialist. Oversees habitat design, rover development, and all technical construction projects.',
    focus: ['Robotics', 'Structural Design'],
    borderColor: '#f472b6',
    initials: 'TR',
  },
];

export const studentTeam = [
  { name: 'Lena Hofmann', role: 'Habitat Engineer', focus: 'Habitation' },
  { name: 'Marco Schneider', role: 'Agriculture Researcher', focus: 'Science' },
  { name: 'Fatima Al-Rashid', role: 'Energy Systems Lead', focus: 'Science' },
  { name: 'Jonas Weber', role: 'Robotics Engineer', focus: 'Engineering' },
  { name: 'Clara Müller', role: 'Astrophysics Researcher', focus: 'Observation' },
  { name: 'Lukas Fischer', role: 'Software Developer', focus: 'Engineering' },
  { name: 'Sara Novak', role: 'Materials Scientist', focus: 'Science' },
  { name: 'Elias Gruber', role: 'Communications Lead', focus: 'Operations' },
  { name: 'Mia Hartmann', role: 'Mission Planner', focus: 'Operations' },
  { name: 'Ben Kastner', role: 'Data Analyst', focus: 'Science' },
  { name: 'Leila Farsi', role: 'Biology Researcher', focus: 'Science' },
  { name: 'Felix Wagner', role: 'Mechanical Engineer', focus: 'Engineering' },
];
