import { motion } from 'framer-motion';

interface NavigationProps {
  sections: string[];
  currentSection: number;
}

export const Navigation = ({ sections, currentSection }: NavigationProps) => {
  return (
    <motion.div 
      className="relative z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-6">
        {sections.map((section, index) => (
          <div key={section} className="flex items-center gap-2">
            <div 
              className={`text-sm tracking-widest transition-colors duration-300 hover:text-white ${
                currentSection === index ? 'text-white' : 'text-gray-500'
              }`}
            >
              {section}
            </div>
            {index < sections.length - 1 && (
              <span className="text-gray-500 opacity-50">/</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};