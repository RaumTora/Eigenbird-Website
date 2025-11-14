'use client'

import { useState } from 'react';

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './components/HomePage';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="cursor-none">
      {/* <GrainOverlay /> */}
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        <HomePage key="homepage" />
      </AnimatePresence>
    </div>
  );
}

