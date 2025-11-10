import { useEffect, useState } from 'react';

type CursorSize = 'small' | 'medium' | 'large';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState<CursorSize>('small');
  
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as HTMLElement;
      
      // Determine cursor size based on the element being hovered
      if (target.classList.contains('text-huge')) {
        setCursorSize('large');
      } else if (target.classList.contains('text-big') || target.tagName === 'A' || target.tagName === 'BUTTON') {
        setCursorSize('medium');
      } else {
        setCursorSize('small');
      }
    };

    const animate = () => {
      const ease = 0.15;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      setPosition({ x: currentX, y: currentY });
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getCursorSize = () => {
    switch (cursorSize) {
      case 'large':
        return 'w-16 h-16';
      case 'medium':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`bg-white rounded-full transition-all duration-200 ${getCursorSize()}`}
          style={{ boxShadow: '0 0 0 2px rgba(255,255,255,0.3)' }}
        />
      </div>
    </>
  );
};
