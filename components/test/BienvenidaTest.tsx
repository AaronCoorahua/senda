
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Star } from 'lucide-react';

interface BienvenidaTestProps {
  onStart: () => void;
}

const BienvenidaTest: React.FC<BienvenidaTestProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FCFAF5' }}>
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Icono principal */}
        <div className="mb-8">
          <Compass className="w-24 h-24 mx-auto" style={{ color: '#134E4A' }} />
        </div>

        {/* Título principal */}
        <h1 className="text-5xl font-montserrat font-bold mb-4 animate-fade-in" style={{ color: '#134E4A' }}>
          🚀 Explora los 6 mundos que revelarán tu futuro
        </h1>

        {/* Subtítulo invitador */}
        <p className="text-xl font-lato text-gray-600 mb-4 animate-fade-in max-w-2xl mx-auto">
          Cada mundo desbloquea una parte de tu perfil vocacional. Completa la aventura y descubre tu camino.
        </p>

        {/* Duración */}
        <p className="text-lg text-gray-600 font-lato mb-8">
          Duración: 10–12 minutos
        </p>

        {/* Mensaje del mentor */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="text-4xl mb-4">🎙️</div>
              <p className="text-xl font-lato text-gray-700 leading-relaxed mb-4">
                "¡Bienvenido a Senda! Estás a punto de descubrir algo grande: tu propósito. 
                Responde con sinceridad. No hay respuestas buenas o malas… solo señales de tu camino."
              </p>
              <p className="text-sm font-montserrat font-semibold text-gray-500">
                — Tu mentor digital
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Los 6 mundos */}
        <div className="mb-12">
          <h3 className="text-3xl font-montserrat font-bold mb-4" style={{ color: '#134E4A' }}>
            ✨ Los 6 Mundos de tu Aventura
          </h3>
          <p className="text-base text-gray-600 font-lato mb-8 max-w-lg mx-auto">
            Cada mundo revela una dimensión única de tu perfil vocacional
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl h-48 flex items-center justify-center cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🧠</div>
                <h4 className="text-xl font-montserrat font-bold mb-1" style={{ color: '#134E4A' }}>
                  Intereses
                </h4>
                <p className="text-sm text-gray-600">Lo que te apasiona</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl h-48 flex items-center justify-center cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🎭</div>
                <h4 className="text-xl font-montserrat font-bold mb-1" style={{ color: '#134E4A' }}>
                  Personalidad
                </h4>
                <p className="text-sm text-gray-600">Cómo eres tú</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl h-48 flex items-center justify-center cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">💎</div>
                <h4 className="text-xl font-montserrat font-bold mb-1" style={{ color: '#134E4A' }}>
                  Valores
                </h4>
                <p className="text-sm text-gray-600">Lo que te mueve</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl h-48 flex items-center justify-center cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h4 className="text-xl font-montserrat font-bold mb-1" style={{ color: '#134E4A' }}>
                  Talentos
                </h4>
                <p className="text-sm text-gray-600">En qué destacas</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl h-48 flex items-center justify-center cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🎬</div>
                <h4 className="text-xl font-montserrat font-bold mb-1" style={{ color: '#134E4A' }}>
                  Escenarios
                </h4>
                <p className="text-sm text-gray-600">Cómo decides</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl h-48 flex items-center justify-center cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🎯</div>
                <h4 className="text-xl font-montserrat font-bold mb-1" style={{ color: '#134E4A' }}>
                  Propósito
                </h4>
                <p className="text-sm text-gray-600">Tu misión de vida</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botón central con gradiente */}
        <div className="mb-8">
          <Button
            onClick={onStart}
            className="text-2xl font-montserrat font-bold px-16 py-8 rounded-3xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 animate-pulse hover:animate-none border-2 border-green-700"
          >
            <span className="flex items-center gap-3">
              🚀 Iniciar mi viaje
            </span>
          </Button>
          <p className="text-sm text-gray-500 mt-4 font-lato italic">
            💡 Tus respuestas son privadas y seguras
          </p>
        </div>

        {/* Decoración adicional */}
        <div className="mt-12 flex justify-center space-x-8 opacity-30">
          <div className="text-3xl">🌱</div>
          <div className="text-3xl">🎯</div>
          <div className="text-3xl">✨</div>
          <div className="text-3xl">🚀</div>
          <div className="text-3xl">🌟</div>
        </div>
      </div>
    </div>
  );
};

export default BienvenidaTest;
