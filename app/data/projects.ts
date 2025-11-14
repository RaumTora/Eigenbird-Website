export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  client: string;
  services: string[];
  description: string[];
  image: string;
  detailImages: string[];
}

export const projects: Project[] = [
  {
    id: 'fight-club',
    title: 'Fight Club',
    year: '2024',
    category: 'Film Poster Design',
    client: 'Studio Productions',
    services: ['Brand Identity', 'Art Direction', 'Print Design'],
    description: [
      'A bold reimagining of the iconic film poster, capturing the raw intensity and underground aesthetic of the narrative. The design emphasizes minimalist brutalism with stark typography and dramatic imagery.',
      'The visual language draws from industrial textures and gritty urban environments, creating an immersive experience that reflects the film\'s themes of consumerism and rebellion.',
    ],
    image: 'https://images.pexels.com/photos/3394310/pexels-photo-3394310.jpeg',
    detailImages: [
      'https://images.pexels.com/photos/3394310/pexels-photo-3394310.jpeg',
      'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg',
      'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg',
      'https://images.pexels.com/photos/2876787/pexels-photo-2876787.jpeg',
    ],
  },
  {
    id: 'blade-runner',
    title: 'Blade Runner',
    year: '2024',
    category: 'Sci-Fi Branding',
    client: 'Future Vision Studios',
    services: ['Visual Identity', 'Motion Graphics', 'UI Design'],
    description: [
      'A cyberpunk-inspired brand identity that merges neon aesthetics with dystopian themes. The design explores the intersection of humanity and technology through bold color contrasts and geometric patterns.',
      'Drawing inspiration from Japanese street culture and retrofuturism, this project creates a cohesive visual system that spans digital and physical touchpoints.',
    ],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    detailImages: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
      'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg',
      'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg',
      'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg',
    ],
  },
  {
    id: 'inception',
    title: 'Inception',
    year: '2023',
    category: 'Abstract Design',
    client: 'Dream Architects',
    services: ['Concept Design', 'Photography', 'Editorial'],
    description: [
      'A mind-bending visual exploration of layered realities and impossible architecture. The design system plays with perspective, gravity, and spatial relationships to create disorienting yet captivating compositions.',
      'Each element is meticulously crafted to guide the viewer through multiple levels of perception, challenging conventional design principles while maintaining visual clarity.',
    ],
    image: 'https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg',
    detailImages: [
      'https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    ],
  },
  {
    id: 'pulp-fiction',
    title: 'Pulp Fiction',
    year: '2023',
    category: 'Retro Aesthetics',
    client: 'Vintage Media',
    services: ['Graphic Design', 'Typography', 'Illustration'],
    description: [
      'A nostalgic journey through 1960s pop culture, reimagined with contemporary design sensibilities. Bold typography, vibrant colors, and playful compositions pay homage to the golden age of pulp magazines.',
      'The project balances vintage authenticity with modern refinement, creating a timeless aesthetic that resonates across generations.',
    ],
    image: 'https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg',
    detailImages: [
      'https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg',
      'https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg',
    ],
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: '2023',
    category: 'Space Design',
    client: 'Cosmos Media',
    services: ['3D Visualization', 'Brand Strategy', 'Web Design'],
    description: [
      'An exploration of the vast unknown through minimal design and dramatic lighting. The visual system captures the awe and isolation of space travel, using negative space and subtle animations to convey infinite possibility.',
      'Inspired by scientific imagery and astronomical phenomena, every design decision reflects the precise, calculated nature of space exploration while maintaining emotional resonance.',
    ],
    image: 'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg',
    detailImages: [
      'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg',
      'https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg',
      'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg',
      'https://images.pexels.com/photos/2162/sky-space-dark-galaxy.jpg',
    ],
  },
  {
    id: 'parasite',
    title: 'Parasite',
    year: '2022',
    category: 'Social Commentary',
    client: 'Independent Films',
    services: ['Editorial Design', 'Art Direction', 'Photography'],
    description: [
      'A visually striking exploration of class divide through stark contrasts and symbolic imagery. The design language shifts between luxury and poverty, using architecture and spatial relationships to tell a powerful story.',
      'Minimalist yet impactful, the visual system employs dramatic lighting and careful composition to highlight social tensions and create an unforgettable viewing experience.',
    ],
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    detailImages: [
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg',
      'https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg',
      'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg',
    ],
  },
];
