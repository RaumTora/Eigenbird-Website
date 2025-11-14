'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 600);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-purple-600/20 rounded-full filter blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Main text collision animation */}
          <div className="relative flex items-center justify-center">
            {/* "eigen" coming from left */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="relative"
            >
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white"
                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(168, 85, 247, 0.3)",
                    "0 0 20px rgba(168, 85, 247, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                eigen
              </motion.h1>
            </motion.div>

            {/* "bird" coming from right */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="relative"
            >
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white"
                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(59, 130, 246, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                bird
              </motion.h1>
            </motion.div>

            {/* Collision impact effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 2]
              }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: "easeOut"
              }}
            >
              <div className="w-4 h-4 bg-white rounded-full" />
            </motion.div>
          </div>

          {/* Animated dots underneath */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/40 rounded-full"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}