'use client'

import { useRef, useEffect, useState, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Navigation } from './Navigation';
import { ContactForm } from './ContactForm';
import { MobileMenu } from './MobileMenu';
import { featuredWork } from '../data/content';
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import DancingGirl from './DancingGirl'

export const HomePage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const scrollThrottleRef = useRef<number>();

  const sections = ['HOME', 'WORK', 'CAPABILITIES', 'CONTACT'];

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetLabel = sections[index];

    if (isMobile) {
      const targetElement = container.querySelector<HTMLElement>(`[data-section-anchor="${targetLabel}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setCurrentSection(index);
      return;
    }

    const sectionWidth = container.clientWidth;
    container.scrollTo({
      left: sectionWidth * index,
      behavior: 'smooth',
    });
    setCurrentSection(index);
  };

  useEffect(() => {
    if (isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentSection, sections.length, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        if (!scrollContainerRef.current) return;

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: 'instant',
        });

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth);

        if (newSection !== currentSection) {
          setCurrentSection(newSection);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined;
          return;
        }

        const container = scrollContainerRef.current;

        if (isMobile) {
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : container.clientHeight;
          const scrollTop = container.scrollTop;
          const derivedSection = Math.round(scrollTop / viewportHeight);
          const boundedSection = Math.min(sections.length - 1, Math.max(0, derivedSection));

          if (boundedSection !== currentSection) {
            setCurrentSection(boundedSection);
          }
        } else {
          const sectionWidth = container.clientWidth;
          const scrollLeft = container.scrollLeft;
          const derivedSection = Math.round(scrollLeft / sectionWidth);
          const boundedSection = Math.min(sections.length - 1, Math.max(0, derivedSection));

          if (boundedSection !== currentSection) {
            setCurrentSection(boundedSection);
          }
        }

        scrollThrottleRef.current = undefined;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [currentSection, sections.length, isMobile]);

  return (
    <>
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Shader className="h-full w-full">
        <Swirl
          colorA="#020617"
          colorB="#0f4c81"
          speed={0.8}
          detail={0.8}
          blend={50}
          coarseX={40}
          coarseY={40}
          mediumX={40}
          mediumY={40}
          fineX={40}
          fineY={40}
        />
        <ChromaFlow
          baseColor="#0a66ff"
          upColor="#0a66ff"
          downColor="#020617"
          leftColor="#0f4c81"
          rightColor="#0f4c81"
          intensity={0.9}
          radius={1.8}
          momentum={25}
          maskType="alpha"
          opacity={0.97}
        />
      </Shader>
    </div>
    <motion.div
      className="min-h-screen"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <header className="fixed top-0 left-0 right-0 z-40 p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex-shrink-0">
              EIGENBIRD
            </h1>
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
              <Navigation
                sections={sections}
                currentSection={currentSection}
                onSectionClick={scrollToSection}
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white text-sm tracking-widest hover:opacity-70 transition-opacity flex-shrink-0 md:hidden"
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sections={sections}
        currentSection={currentSection}
        onSectionClick={scrollToSection}
      />

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={`${isMobile ? 'min-h-screen w-full flex flex-col overflow-y-auto overflow-x-hidden' : 'h-screen w-screen flex overflow-x-auto overflow-y-hidden'} scrollbar-hide select-none`}
          style={{
            scrollBehavior: 'smooth',
            ...(isMobile ? {} : { scrollSnapType: 'x proximity' }),
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as CSSProperties}
        >
          <div
            className={`${isMobile ? 'flex flex-col gap-10 w-full' : 'flex'} py-12`}
            style={isMobile ? undefined : { width: 'max-content' }}
          >
            <Section anchor="HOME" isMobile={isMobile}>
              {isMobile ? (
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
              ) : (
                <div className="grid grid-cols-2 items-center gap-12">
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

                  <div className="flex justify-end">
                    {/* removed rounded border and reduced size by 75% (420 -> 105) as requested */}
                    <DancingGirl targetWidth={420} targetHeight={420} />
                  </div>
                </div>
              )}
            </Section>

            {featuredWork.map((work, index) => (
              <Section key={work.id} anchor={index === 0 ? 'WORK' : undefined} isMobile={isMobile}>
                <div className="group">
                  <div className="mb-8">
                    <span className="text-2xl font-light text-gray-600 mb-4 block">
                      {work.number}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
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

            <Section anchor="CONTACT" isMobile={isMobile}>
              {isMobile ? (
                <div className="flex flex-col gap-10 items-stretch px-2 pb-16">
                  <div className="space-y-5">
                    <h2 className="text-lg text-gray-400 mb-1 tracking-widest">LET'S TALK</h2>
                    <p className="text-gray-600 tracking-wide mb-4 text-xs">/ Get in touch</p>
                    <a
                      href="mailto:hello@eigenbird.com"
                      className="break-all text-2xl font-bold text-white hover:text-gray-300 transition-colors tracking-tight w-full block mb-3"
                    >
                      hello@eigenbird.com
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 font-medium text-base">Location</p>
                    <p className="text-gray-500 text-base mb-6">San Francisco, CA</p>
                  </div>
                  <div className="w-full">
                    <ContactForm />
                  </div>
                  <div className="flex flex-col gap-3 w-full mt-6">
                    <a href="#" className="bg-white/10 text-white rounded-lg px-5 py-3 text-base font-semibold text-center hover:bg-white/20 transition-all block w-full">Twitter</a>
                    <a href="#" className="bg-white/10 text-white rounded-lg px-5 py-3 text-base font-semibold text-center hover:bg-white/20 transition-all block w-full">Instagram</a>
                    <a href="#" className="bg-white/10 text-white rounded-lg px-5 py-3 text-base font-semibold text-center hover:bg-white/20 transition-all block w-full">LinkedIn</a>
                    <a href="#" className="bg-white/10 text-white rounded-lg px-5 py-3 text-base font-semibold text-center hover:bg-white/20 transition-all block w-full">Dribbble</a>
                  </div>
                </div>
              ) : (
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
              )}
            </Section>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white">
          <div className="flex items-center gap-4">

            <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <motion.path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ x: 0 }}
                  animate={{
                    x: [0, 4, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};