import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FOMOBannerProps {
  currentProgress: number;
}

const FOMOBanner: React.FC<FOMOBannerProps> = ({ currentProgress }) => {
  const messages = [
    { threshold: 0, message: "¡Empecemos! El 70% de estudiantes ya completó su test 🔥", color: "from-blue-500 to-cyan-500" },
    { threshold: 33, message: "¡Vas bien! Estás en el 33%, sigue así para desbloquear tu brújula 🚀", color: "from-yellow-500 to-orange-500" },
    { threshold: 66, message: "¡Casi allá! El 66% completado. Tu perfil vocacional te espera ✨", color: "from-green-500 to-emerald-500" },
  ];

  const currentMessage = messages.reduce((prev, curr) => 
    currentProgress >= curr.threshold ? curr : prev
  );

  return (
    <div className={`bg-gradient-to-r ${currentMessage.color} text-white rounded-xl p-4 shadow-lg mb-6 animate-pulse`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="font-montserrat font-bold text-lg">
            {currentMessage.message}
          </p>
        </div>
      </div>
      <div className="mt-3 bg-white/30 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-white h-full transition-all duration-500"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    </div>
  );
};

export default FOMOBanner;
