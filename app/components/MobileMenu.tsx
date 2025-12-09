import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: string[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

export const MobileMenu = ({ isOpen, onClose, sections, currentSection, onSectionClick }: MobileMenuProps) => {
  const handleSectionClick = (index: number) => {
    onSectionClick(index);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-slate-900/95 backdrop-blur-md z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-8 border-b border-white/10">
                <a
                  href="https://agile-app.eigenbird.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold tracking-tight text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  Open App
                </a>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 p-8">
                <ul className="space-y-6">
                  {sections.map((section, index) => (
                    <li key={section}>
                      <button
                        onClick={() => handleSectionClick(index)}
                        className={`text-left w-full text-2xl font-semibold tracking-tight transition-colors ${
                          currentSection === index
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {section}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-8 border-t border-white/10">
                <div className="space-y-4">
                  <p className="text-gray-400 mb-1 text-sm">Mail</p>
                  <a
                    href="mailto:hello@eigenbird.com"
                    className="text-white text-xs font-semibold"
                  >
                    comms@eigenbird.com
                  </a>
                  <div>
                          <p className="text-gray-400 mb-1 text-sm">Location</p>
                          <p className="text-white text-xs font-semibold">New Delhi, IND</p>
                        </div>
                  <div className="flex gap-4 pt-2">
                    <a target="_blank" rel="noopener noreferrer" href="https://x.com/eigenbird" className="text-xs text-gray-500 hover:text-white transition-colors">Twitter</a>
                    {/* <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Instagram</a> */}
                    <a target="_blank" rel="noopener noreferrer" href="#" className="text-xs text-gray-500 hover:text-white transition-colors">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
