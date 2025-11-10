import { useEffect, useRef } from 'react';

export const Background = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const update = () => {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);

      const px = (currentX / window.innerWidth) * 100;
      const py = (currentY / window.innerHeight) * 100;

      el.style.setProperty('--bg-x', `${px}%`);
      el.style.setProperty('--bg-y', `${py}%`);

      raf = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch as any);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="interactive-bg pointer-events-none fixed inset-0 z-0 opacity-95"
      style={{
        // CSS variables used in index.css for gradient positions
        ['--bg-x' as any]: '50%',
        ['--bg-y' as any]: '50%'
      }}
    />
  );
};

export default Background;
