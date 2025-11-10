interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ children, className = '' }: SectionProps) => {
  return (
    <div 
      className={`flex-shrink-0 w-screen h-full flex items-center ${className}`}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12">
        {children}
      </div>
    </div>
  );
};