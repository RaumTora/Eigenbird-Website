import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Project, projects } from '../data/projects';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onNextProject: (nextId: string) => void;
}

export const ProjectDetail = ({ projectId, onBack, onNextProject }: ProjectDetailProps) => {
  const project = projects.find((p) => p.id === projectId);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (container.scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!project) {
    return null;
  }

  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-y-auto overflow-x-hidden z-50"
    >
      <div
        className="fixed top-0 left-0 h-1 bg-white transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 p-8 md:p-12 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm tracking-widest">BACK</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            EIGENBIRD
          </h1>
        </div>
      </header>

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="mb-16 animate-fadeIn">
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 tracking-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-400 text-sm md:text-base tracking-wider">
              <div>
                <span className="text-gray-500 block mb-1">CLIENT</span>
                <span className="text-white">{project.client}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">YEAR</span>
                <span className="text-white">{project.year}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">SERVICES</span>
                <span className="text-white">{project.services.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="mb-20 max-w-3xl space-y-6">
            {project.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-300 text-lg md:text-xl leading-relaxed animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {project.detailImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden group animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[16/10] relative">
                  <img
                    src={image}
                    alt={`${project.title} detail ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-20">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-500 text-sm tracking-widest block mb-4">
                  NEXT PROJECT
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  {nextProject.title}
                </h2>
              </div>
              <button
                onClick={() => onNextProject(nextProject.id)}
                className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white hover:bg-white transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
