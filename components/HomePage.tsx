import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Navigation } from './Navigation';
import { ContactForm } from './ContactForm';
import { featuredWork, capabilities } from '../data/content';

export const HomePage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ['HOME', 'WORK', 'CAPABILITIES', 'CONTACT'];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateCurrentSection = () => {
      if (!container) return;
      const sectionWidth = container.clientWidth;
      const currentPosition = container.scrollLeft;
      const newSection = Math.round(currentPosition / sectionWidth);
      setCurrentSection(newSection);
    };

    container.addEventListener('scroll', updateCurrentSection);
    return () => container.removeEventListener('scroll', updateCurrentSection);

    // let wheelThrottled = false;
    // const getCardWidth = () => {
    //   const inner = container.firstElementChild as HTMLElement | null;
    //   if (!inner) return container.clientWidth;

    //   const firstSection = inner.querySelector(':scope > *') as HTMLElement | null;
    //   if (!firstSection) return container.clientWidth;

    //   const style = window.getComputedStyle(inner);
    //   const gap = parseFloat(style.gap || style.columnGap || '0') || 0;

    //   return firstSection.offsetWidth + gap;
    // };

    // const handleWheel = (e: WheelEvent) => {
    //   if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

    //   const maxScrollLeft = container.scrollWidth - container.clientWidth;
    //   const atStart = container.scrollLeft <= 0;
    //   const atEnd = container.scrollLeft >= maxScrollLeft - 1;

    //   (handleWheel as any)._acc = ((handleWheel as any)._acc || 0) + e.deltaY;
    //   const acc = (handleWheel as any)._acc;

    //   const sectionWidth = getCardWidth();
    //   const threshold = Math.max(40, sectionWidth * 0.25);

    //   if (Math.abs(acc) < threshold) return;

    //   if (wheelThrottled) {
    //     (handleWheel as any)._acc = 0;
    //     return;
    //   }

    //   const direction = acc > 0 ? 1 : -1;

    //   if ((direction === 1 && !atEnd) || (direction === -1 && !atStart)) {
    //     e.preventDefault();
    //     container.scrollBy({ left: direction * sectionWidth, behavior: 'smooth' });
    //     wheelThrottled = true;
    //     (handleWheel as any)._acc = 0;
    //     setTimeout(() => (wheelThrottled = false), 420);
    //   } else {
    //     (handleWheel as any)._acc = 0;
    //   }
    // };

    // container.addEventListener('wheel', handleWheel, { passive: false });
    // return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-black"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <header className="fixed top-0 left-0 right-0 z-40 p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex-shrink-0">
              EIGENBIRD
            </h1>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Navigation sections={sections} currentSection={currentSection} />
            </div>
            <button className="text-white text-sm tracking-widest hover:opacity-70 transition-opacity flex-shrink-0">
              MENU
            </button>
          </div>
        </div>
      </header>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="h-screen flex overflow-x-auto overflow-y-hidden scrollbar-hide select-none"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x proximity',
          } as React.CSSProperties}
        >
          <div className="flex py-12">
            {/* Hero Section */}
            <Section>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tighter text-huge">
                  Creative
                  <br />
                  Exploration
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                  Digital design studio crafting immersive experiences
                </p>
              </motion.div>
            </Section>

            {/* Featured Work */}
            {featuredWork.map((work) => (
              <Section key={work.id}>
                <div className="group">
                  <div className="mb-8">
                    <span className="text-2xl font-light text-gray-600 mb-4 block">
                      {work.number}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-big group-hover:text-huge transition-all duration-300">
                      {work.title}
                    </h3>
                    <div className="flex gap-6 text-sm tracking-widest text-gray-400">
                      <span>{work.category}</span>
                      <span>{work.year}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl">
                      {work.description}
                    </p>
                  </div>
                </div>
              </Section>
            ))}

            {/* Capabilities */}
            {/* <Section>
              <div className="relative">
                <div className="mb-24">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-huge font-bold text-white mb-6 tracking-tighter group">
                      
                      <span className="inline-block hover:scale-110 transition-transform duration-500 cursor-none">
                        Capabilites
                      </span>
                    </h2>
                  </motion.div>
                  <p className="text-xl text-gray-400 tracking-wide max-w-xl">
                    / Crafting experiences through space and motion
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-16">
                  {capabilities.map((capability) => (
                    <motion.div
                      key={capability.id}
                      className="relative group"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: Number(capability.number) * 0.1 }}
                    >
                      <span className="text-sm font-light text-gray-500 mb-4 block tracking-widest">
                        {capability.number}
                      </span>
                      <h3 className="text-2xl font-medium text-white mb-4 tracking-tight group-hover:text-gray-300 transition-colors duration-300">
                        {capability.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {capability.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section> */}

            {/* Contact */}
            <Section>
              <div className="grid grid-cols-2 gap-24">
                <div className="space-y-12">
                  <div>
                    <h2 className="text-xl text-gray-400 mb-2 tracking-widest">LET'S TALK</h2>
                    <p className="text-gray-600 tracking-wide mb-8">/ Get in touch</p>
                    
                    <a 
                      href="mailto:hello@eigenbird.com"
                      className="text-4xl font-bold text-white hover:text-gray-300 transition-colors tracking-tight"
                    >
                      hello@eigenbird.com
                    </a>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-2 font-medium">Location</p>
                    <p className="text-gray-500">San Francisco, CA</p>
                  </div>

                  <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Dribbble</a>
                  </div>
                </div>

                <div>
                  <ContactForm />
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};