import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="h-screen flex items-center relative px-8 md:px-12">
      <div className="max-w-[90vw] mx-auto">
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tighter"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          Creative experiences
          <br />
          in fluid motion
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-400 max-w-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        >
          Transforming digital spaces with dynamic effects and real-time visual
          experiences that captivate and inspire.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
};