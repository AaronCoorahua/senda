import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

interface BadgeCollectionProps {
  badges: Badge[];
}

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ badges }) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-2xl font-montserrat font-bold text-senda-primary mb-4 text-center">
          🏆 Tus Insignias Coleccionables
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                badge.unlocked
                  ? 'bg-white border-yellow-400 shadow-lg hover:scale-105 hover:shadow-xl'
                  : 'bg-gray-100 border-gray-300 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className={`text-4xl mb-2 ${badge.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <div className="font-montserrat font-semibold text-sm text-senda-primary">
                  {badge.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {badge.description}
                </div>
              </div>
              {badge.unlocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeCollection;
