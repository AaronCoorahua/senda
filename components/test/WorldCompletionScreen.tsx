import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WorldCompletionScreenProps {
  worldName: string;
  worldIcon: string;
  badgeName: string;
  badgeIcon: string;
  onContinue: () => void;
}

const WorldCompletionScreen: React.FC<WorldCompletionScreenProps> = ({
  worldName,
  worldIcon,
  badgeName,
  badgeIcon,
  onContinue
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="flex items-center justify-center p-6 relative">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {['🎉', '✨', '⭐', '🎊', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <Card className="max-w-2xl w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-4 border-green-300 shadow-2xl animate-scale-in">
        <CardContent className="p-8 text-center">{/* Reducido de p-12 a p-8 */}
          <div className="text-6xl mb-4 animate-bounce">{/* Reducido de text-8xl */}
            {worldIcon}
          </div>
          
          <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-3">{/* Reducido de text-4xl */}
            ¡Mundo Superado!
          </h2>
          
          <p className="text-xl text-gray-700 font-lato mb-6">{/* Reducido de text-2xl y mb-8 */}
            Has completado el mundo de <span className="font-bold text-senda-secondary">{worldName}</span>
          </p>

          {/* Badge visual */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border-4 border-yellow-400 inline-block animate-pulse">{/* Reducido de p-8 y mb-8 */}
            <div className="text-5xl mb-3">{badgeIcon}</div>{/* Reducido de text-6xl y mb-4 */}
            <div className="text-lg font-montserrat font-bold text-senda-primary mb-2">{/* Reducido de text-xl */}
              🏆 Medalla Desbloqueada
            </div>
            <div className="text-base text-gray-700 font-semibold">{/* Reducido de text-lg */}
              {badgeName}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-6 border-2 border-yellow-300">{/* Reducido de p-6 y mb-8 */}
            <p className="text-base text-gray-800 font-lato font-semibold">{/* Reducido de text-lg */}
              {worldName === "Intereses" && "¡Ya sabes qué te inspira! Siguiente mundo: Personalidad"}
              {worldName === "Personalidad" && "¡Conoces tu esencia! Siguiente mundo: Valores"}
              {worldName === "Valores" && "¡Tienes claro qué importa! Siguiente mundo: Talentos"}
              {worldName === "Talentos" && "¡Reconoces tus fortalezas! Siguiente mundo: Escenarios"}
              {worldName === "Escenarios" && "¡Sabes cómo actuar! Siguiente mundo: Propósito"}
              {worldName === "Propósito" && "¡Has completado todos los mundos! Veamos tu perfil vocacional..."}
            </p>
          </div>

          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-base px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 font-montserrat font-bold"
          >
            👉 Continuar mi aventura
          </Button>
        </CardContent>
      </Card>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WorldCompletionScreen;
