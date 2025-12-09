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
    id: 'Seamless Integration',
    number: '01',
    title: 'Seamless Integration',
    description: 'Securely connects to all your project management tools.'
  },
  {
    id: 'Natural Language Chat',
    number: '02',
    title: 'Natural Language Chat',
    description: 'Ask complex questions in plain English, not in code.'
  },
  {
    id: 'Real-Time Analysis',
    number: '03',
    title: 'Real-Time Analysis',
    description: 'Get instant status updates, risk assessments, and resource allocation reports.'
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
    id: 'Real-Time Analysis',
    number: '01',
    title: 'Real-Time Analysis',
    category: 'Interactive Experience',
    year: '2025',
    description: 'Get instant status updates, risk assessments, and resource allocation reports. Single source of truth, with answers grounded in your "actual" data, not guesses.',
    image: 'https://images.pexels.com/photos/3394310/pexels-photo-3394310.jpeg'
  },
  // {
  //   id: 'generative-patterns',
  //   number: '02',
  //   title: 'Generative Patterns',
  //   category: 'Visual System',
  //   year: '2024',
  //   description: 'Creating dynamic visual systems through algorithmic art and procedural generation.',
  //   image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
  // },
  {
    id: 'Seamless Integration',
    number: '02',
    title: 'Seamless Integration',
    category: 'RAG Integration',
    year: '2025',
    description: 'Securely connects to all your project management tools. Identify project risks, resource gaps, and bottlenecks before they become critical problems. ',
    image: 'https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg'
  }
];

export const stats = [
  { value: '150+', label: 'Projects Delivered worldwide' },
  { value: '8', label: 'Years of innovation' },
  { value: '12', label: 'Awards & Recognition' }
];
