interface SectionProps {
  children: React.ReactNode;
  className?: string;
  anchor?: string;
  isMobile?: boolean;
}

export const Section = ({ children, className = '', anchor, isMobile = false }: SectionProps) => {
  return (
    <section
      data-section-anchor={anchor}
      className={`flex items-center ${isMobile ? 'w-full min-h-screen py-12' : 'flex-shrink-0 w-screen h-full'} ${className}`}
      style={isMobile ? undefined : { scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
};