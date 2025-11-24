import React from 'react';
import { Lock, Check } from 'lucide-react';

interface World {
  name: string;
  icon: string;
}

interface WorldMapProps {
  worlds: World[];
  currentWorld: number;
  completedWorlds: number[];
}

const WorldMap: React.FC<WorldMapProps> = ({ worlds, currentWorld, completedWorlds }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border-2 border-green-200">
      <h3 className="text-2xl font-montserrat font-bold text-senda-primary mb-6 text-center">
        🗺️ Tu Mapa de Mundos
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {worlds.map((world, index) => {
          const isCompleted = completedWorlds.includes(index);
          const isCurrent = index === currentWorld;
          const isLocked = index > currentWorld && !isCompleted;

          return (
            <div
              key={index}
              className={`relative flex flex-col items-center transition-all duration-500 ${
                isCurrent ? 'scale-125' : 'scale-100'
              }`}
            >
              {/* Círculo del mundo */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-500 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/50'
                    : isCurrent
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-2xl shadow-orange-500/50 animate-pulse'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-8 h-8" />
                ) : isLocked ? (
                  <Lock className="w-6 h-6" />
                ) : (
                  world.icon
                )}
              </div>
              
              {/* Nombre del mundo */}
              <div
                className={`mt-2 text-xs font-montserrat font-semibold text-center max-w-[80px] ${
                  isCompleted || isCurrent ? 'text-senda-primary' : 'text-gray-400'
                }`}
              >
                {world.name}
              </div>

              {/* Badge de completado */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs">✨</span>
                </div>
              )}

              {/* Mensaje de mundo bloqueado */}
              {isLocked && index === currentWorld + 1 && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg text-center animate-pulse">
                  🔒 Solo completando el mundo actual podrás desbloquear el siguiente
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldMap;
