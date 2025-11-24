import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface AnalysisLoadingProps {
  onComplete: () => void;
}

const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center animate-fade-in"
      style={{ backgroundColor: '#FAFAF5' }}
    >
      <div className="flex flex-col items-center justify-center space-y-8 px-4">
        {/* Animated Clock Spinner */}
        <div className="relative">
          {/* Outer rotating ring - Senda green */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
            style={{ 
              borderTopColor: '#104E47',
              borderRightColor: '#104E47',
              width: '120px',
              height: '120px',
              animationDuration: '2s'
            }}
          />
          
          {/* Middle rotating ring - Turquoise */}
          <div 
            className="absolute inset-0 m-2 rounded-full border-4 border-transparent animate-spin"
            style={{ 
              borderTopColor: '#4EC1A6',
              borderLeftColor: '#4EC1A6',
              width: '104px',
              height: '104px',
              animationDuration: '1.5s',
              animationDirection: 'reverse'
            }}
          />
          
          {/* Inner rotating ring - Violet */}
          <div 
            className="absolute inset-0 m-4 rounded-full border-4 border-transparent animate-spin"
            style={{ 
              borderTopColor: '#7E57C2',
              borderRightColor: '#7E57C2',
              width: '88px',
              height: '88px',
              animationDuration: '1s'
            }}
          />
          
          {/* Clock Icon in center */}
          <div 
            className="flex items-center justify-center"
            style={{ width: '120px', height: '120px' }}
          >
            <Clock 
              className="w-12 h-12 animate-pulse" 
              style={{ color: '#104E47' }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3 max-w-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 
            className="text-2xl md:text-3xl font-montserrat font-bold"
            style={{ color: '#104E47' }}
          >
            Estamos analizando tus respuestas…
          </h2>
          <p className="text-base md:text-lg font-lato text-gray-600">
            Tu perfil vocacional está casi listo ✨
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: '#104E47',
              animationDelay: '0s',
              animationDuration: '1.5s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: '#4EC1A6',
              animationDelay: '0.3s',
              animationDuration: '1.5s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: '#7E57C2',
              animationDelay: '0.6s',
              animationDuration: '1.5s'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoading;
