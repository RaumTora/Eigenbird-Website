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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const scrollThrottleRef = useRef<number>();

  const sections = ['HOME', 'WORK', 'CAPABILITIES', 'CONTACT'];

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sectionWidth = container.clientWidth;
    container.scrollTo({
      left: sectionWidth * index,
      behavior: 'smooth',
    });
    setCurrentSection(index);
  };

  useEffect(() => {
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

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (deltaX < 0 && currentSection > 0) {
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
  }, [currentSection, sections.length]);

  useEffect(() => {
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
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;
      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined;
          return;
        }
        const container = scrollContainerRef.current;
        const sectionWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const derivedSection = Math.round(scrollLeft / sectionWidth);
        const boundedSection = Math.min(sections.length - 1, Math.max(0, derivedSection));
        if (boundedSection !== currentSection) {
          setCurrentSection(boundedSection);
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
  }, [currentSection, sections.length]);

  return (
    <>
      {/* Your background shader (Unchanged) */}
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
        {/* Your header (Unchanged) */}
        <header className="fixed top-0 left-0 right-0 z-40 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h1
                onClick={() => scrollToSection(0)}
                className="text-2xl md:text-3xl font-bold text-white tracking-tight flex-shrink-0 cursor-pointer"
              >
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

        {/* Your MobileMenu (Unchanged) */}
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
            className={'h-screen w-screen flex overflow-x-auto overflow-y-hidden scrollbar-hide select-none'}
            style={{
              scrollBehavior: 'smooth',
              scrollSnapType: 'x proximity',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            } as CSSProperties}
          >
            <div
              className={'flex py-12'}
              style={{ width: 'max-content' }}
            >
              {/* Your HOME Section (Unchanged) */}
              <Section anchor="HOME">
                <div className="grid grid-cols-2 items-center gap-12">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                  <h2 className="text-5xl md:text-6xl lg:text-9xl font-bold text-white mb-8 tracking-tighter ">
                    Custom
                      <br />
                      AI for Your Enterprise
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                     AI Intelligence Layer for Enterprise Data Unification
                    </p>
                  </motion.div>
                  {/* <div className="flex justify-end">
                    <DancingGirl targetWidth={420} targetHeight={420} />
                  </div> */}
                </div>
              </Section>

              {/* Your featuredWork map (Unchanged) */}
              {featuredWork.map((work, index) => (
                <Section
                  key={work.id}
                  anchor={index === 0 ? 'WORK' : undefined}
                  className="items-start md:items-center pt-0 md:pt-0"
                >
                  <div className="group">
                    <div className="mb-8">
                      <span className="text-2xl font-light text-white mb-4 block">
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

              {/* --- CONTACT SECTION (Updated) --- */}
              <Section anchor="CONTACT">
                <div className="w-full">

                  {/* MOBILE */}
                  <div className="block md:hidden w-full min-h-screen px-6 pt-20 pb-12" style={{ maxWidth: 480, margin: '0 auto' }}>
                    <div className="mb-8">
                      <p className="text-gray-300 text-sm tracking-wide">/ Get in touch</p>
                    </div>

                    <div className="mb-8">
                      <ContactForm variant="mobile" />
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-400 text-xs mb-1">Email</p>
                      <a href="mailto:comms@eigenbird.com" className="text-white text-base">comms@eigenbird.com</a>
                    </div>

                    <div className="flex gap-6 text-xs text-gray-400">
                      <a  target="_blank" rel="noopener noreferrer" href="https://x.com/eigenbird">Twitter</a>
                      <a href="#">LinkedIn</a>
                    </div>
                  </div>

                  {/* DESKTOP */}
                  <div className="hidden md:grid grid-cols-2 gap-24 p-12 items-start">
                    <div className="space-y-12">
                      <div>
                        <h2 className="text-6xl font-bold text-white mb-2 tracking-tighter">Let's talk</h2>
                        <p className="text-lg text-gray-400">/ Get in touch</p>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <p className="text-gray-400 mb-1 text-sm">Email</p>
                          <a href="mailto:comms@eigenbird.com" className="text-3xl font-semibold text-white">comms@eigenbird.com</a>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1 text-sm">Location</p>
                          <p className="text-white text-3xl font-semibold">New Delhi, IND</p>
                        </div>
                      </div>

                    <div className="flex gap-6 text-gray-400 text-sm pt-6">
                      <a target="_blank" rel="noopener noreferrer" href="https://x.com/eigenbird" className="hover:text-white">Twitter</a>
                      <a href="#" className="hover:text-white">LinkedIn</a>
                    </div>
                  </div>

                  <ContactForm />
                  </div>

                </div>
              </Section>
            </div>
          </div>

          {/* Your scroll explorer (Unchanged) */}
          {currentSection !== sections.length - 1 && (
  <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white">
    <div className="flex items-center gap-1">
      <span className="text-xs tracking-widest">SCROLL TO EXPLORE</span>
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
)}
        </div>
      </motion.div>
    </>
  );
};