import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import Background from './components/Background';
import { HomePage } from './components/HomePage';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="cursor-none">
      <Background />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <HomePage key="homepage" />
      </AnimatePresence>
    </div>
  );
}

export default App;