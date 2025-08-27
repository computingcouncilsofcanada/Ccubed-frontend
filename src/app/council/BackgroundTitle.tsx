import React from 'react';

interface BackgroundTitleProps {
  title: string;
  className?: string;
}

const BackgroundTitle: React.FC<BackgroundTitleProps> = ({ title, className = "" }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0 ${className}`}>
      <h1 
        className="text-[150px] font-black text-white/20 select-none"
        style={{ 
          fontFamily: 'Roboto, sans-serif',
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.2) 100%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.2) 100%)"
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default BackgroundTitle;
