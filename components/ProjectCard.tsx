import { Project } from '../data/projects';
import { motion } from 'framer-motion'; // Import motion

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex-shrink-0 w-[70vw] md:w-[60vw] lg:w-[50vw] h-[70vh] cursor-pointer overflow-visible"
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className="relative h-full w-full flex items-center">
        
        {/* SHARED ELEMENT 1: THE TITLE BLOCK */}
        <motion.div
          layoutId={`project-title-${project.id}`}
          className="flex-none w-[34%] h-full relative overflow-visible pl-6 md:pl-12 pointer-events-none"
        >
          <h2
            className="absolute -left-6 md:-left-8 top-1/4 font-extrabold leading-none uppercase tracking-tight"
            style={{
              fontSize: '12vw',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.22)',
              zIndex: 10,
              transform: 'translateY(-10%)',
            }}
          >
            {project.title}
          </h2>

          <h2
            className="relative text-white font-extrabold leading-none uppercase tracking-tight drop-shadow-lg"
            style={{ fontSize: '6.8vw', marginTop: '7.5rem', zIndex: 20 }}
          >
            {project.title}
          </h2>
        </motion.div>

        {/* Right: image panel (centered rectangle) */}
        <div className="flex-1 flex items-center justify-center">

          {/* SHARED ELEMENT 2: THE IMAGE BLOCK */}
          <motion.div
            layoutId={`project-image-${project.id}`}
            className="relative w-[62%] md:w-[58%] lg:w-[52%] aspect-[16/10] bg-black overflow-hidden rounded-sm shadow-lg"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Top-left small watermark/logo mimic */}
            <div className="absolute top-4 left-4 text-white/30 font-bold tracking-widest text-sm">
              EIGENBIRD
            </div>

            {/* Bottom-right meta */}
            <div className="absolute bottom-4 right-6 text-right text-white">
              <p className="text-xs opacity-80 tracking-widest">{project.year}</p>
              <p className="text-xs opacity-80 tracking-widest">{project.category}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* small clickable indicator in corner (kept visually subtle) */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
};