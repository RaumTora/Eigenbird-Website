export interface Capability {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface WorkItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
}

export const capabilities: Capability[] = [
  {
    id: 'spatial-design',
    number: '01',
    title: 'Spatial Design',
    description: 'Creating immersive digital environments that blur the line between 2D and 3D space.'
  },
  {
    id: 'motion-systems',
    number: '02',
    title: 'Motion Systems',
    description: 'Developing fluid animation frameworks that respond to user interaction and scroll position.'
  },
  {
    id: 'interactive-exp',
    number: '03',
    title: 'Interactive Experiences',
    description: 'Building engaging web experiences that adapt and evolve based on user behavior.'
  },
  {
    id: 'creative-tech',
    number: '04',
    title: 'Creative Technology',
    description: 'Exploring the intersection of design and technology to create memorable digital moments.'
  }
];

export const featuredWork: WorkItem[] = [
  {
    id: 'kinetic-type',
    number: '01',
    title: 'Kinetic Typography',
    category: 'Interactive Experience',
    year: '2024',
    description: 'Exploring the intersection of typography and motion through real-time WebGL animations.',
    image: 'https://images.pexels.com/photos/3394310/pexels-photo-3394310.jpeg'
  },
  {
    id: 'generative-patterns',
    number: '02',
    title: 'Generative Patterns',
    category: 'Visual System',
    year: '2024',
    description: 'Creating dynamic visual systems through algorithmic art and procedural generation.',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
  },
  {
    id: 'spatial-interface',
    number: '03',
    title: 'Spatial Interface',
    category: '3D Navigation',
    year: '2024',
    description: 'Reimagining user interfaces through three-dimensional space and movement.',
    image: 'https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg'
  }
];

export const stats = [
  { value: '150+', label: 'Projects Delivered worldwide' },
  { value: '8', label: 'Years of innovation' },
  { value: '12', label: 'Awards & Recognition' }
];