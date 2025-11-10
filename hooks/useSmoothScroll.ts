import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    let scrollPosition = window.scrollY;
    let targetScroll = window.scrollY;
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const smoothScroll = () => {
      scrollPosition = lerp(scrollPosition, targetScroll, 0.1);

      if (Math.abs(targetScroll - scrollPosition) > 0.5) {
        window.scrollTo(0, scrollPosition);
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        window.scrollTo(0, targetScroll);
      }
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
};
