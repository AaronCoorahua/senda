
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, ArrowRight, Sparkles, Search, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface PerfilVocacional {
  id: string;
  nombre: string;
  descripcion: string;
  fortalezas: string[];
  carreras: string[];
  consejo: string;
  icono: string;
  color: string;
  colorFondo: string;
}

interface ResultadoTestProps {
  perfil: PerfilVocacional;
  onContinue: () => void;
  respuestas: any;
}

const ResultadoTest: React.FC<ResultadoTestProps> = ({ perfil, onContinue }) => {
  const router = useRouter();

  // Mapeo de perfiles a categorías de carreras para el filtrado
  const profileToCareerMapping = {
    'explorador-creativo': ['Arte y Diseño', 'Comunicación'],
    'analista-estratégico': ['Tecnología', 'Negocios', 'Ingeniería'],
    'guía-humanista': ['Salud', 'Educación', 'Ciencias Sociales'],
    'líder-emprendedor': ['Negocios', 'Administración'],
    'constructor-técnico': ['Tecnología', 'Ingeniería'],
    'comunicador-influyente': ['Comunicación', 'Arte y Diseño'],
    'investigador-curioso': ['Salud', 'Ciencias', 'Tecnología'],
    'visionario-social': ['Ciencias Sociales', 'Educación']
  };

  const handleExploreCarreras = () => {
    // Navegar a la página principal con scroll a la sección de carreras
    router.push('/?scrollToCarreras=true&filterByProfile=' + perfil.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Animación de celebración */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-montserrat font-bold text-senda-primary mb-4">
          ¡Has desbloqueado tu perfil!
        </h2>
        <p className="text-xl text-gray-700 font-lato mb-6">
          Basado en tus respuestas, hemos identificado tu camino único
        </p>
        <div className="flex justify-center items-center space-x-2 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <Badge className="bg-gradient-to-r from-senda-primary to-senda-secondary text-white px-4 py-2">
            Tu Perfil Vocacional
          </Badge>
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </div>
      </div>

      {/* Perfil Principal */}
      <Card className={`mb-8 shadow-2xl border-4 ${perfil.colorFondo} animate-scale-in`}>
        <CardContent className="p-12">
          <div className="text-center mb-10">
            <div className="text-8xl mb-6">{perfil.icono}</div>
            <h3 className="text-4xl font-montserrat font-bold text-senda-primary mb-6">
              {perfil.nombre}
            </h3>
            <div className="bg-white/80 rounded-2xl p-8 mb-8">
              <p className="text-2xl text-gray-800 font-lato leading-relaxed italic">
                "{perfil.descripcion}"
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-10">
            {/* Fortalezas */}
            <div className="bg-white/90 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Star className="w-8 h-8 text-yellow-500 mr-3" />
                <h4 className="text-2xl font-montserrat font-bold text-senda-primary">
                  Tus Fortalezas
                </h4>
              </div>
              <div className="space-y-3">
                {perfil.fortalezas.map((fortaleza, index) => (
                  <Badge 
                    key={index} 
                    className="mr-3 mb-3 px-4 py-2 text-lg bg-senda-cream text-senda-primary border-2 border-senda-light"
                  >
                    ✨ {fortaleza}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Carreras */}
            <div className="bg-white/90 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-green-500 mr-3" />
                <h4 className="text-2xl font-montserrat font-bold text-senda-primary">
                  Carreras Ideales
                </h4>
              </div>
              <div className="space-y-4">
                {perfil.carreras.map((carrera, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-senda-secondary rounded-full mr-4"></div>
                    <span className="text-gray-700 font-lato text-lg">{carrera}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Consejo del Mentor */}
          <div className="bg-gradient-to-r from-senda-cream to-white rounded-2xl p-8 mb-8">
            <div className="flex items-start">
              <Trophy className="w-8 h-8 text-senda-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-2xl font-montserrat font-bold text-senda-primary mb-4">
                  Mensaje de tu Mentor Digital
                </h4>
                <p className="text-xl text-gray-700 font-lato italic leading-relaxed">
                  "{perfil.consejo}"
                </p>
              </div>
            </div>
          </div>

          {/* Nueva Sección: Carreras Recomendadas */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <div className="text-center mb-6">
              <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
                🔎 Carreras que combinan con tu perfil
              </h4>
              <p className="text-lg text-gray-700 font-lato mb-6">
                Basado en tu perfil vocacional, te recomendamos explorar estas carreras afines que conectan con tus intereses, habilidades y propósito.
              </p>
            </div>
            
            {/* Vista previa de carreras recomendadas */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {perfil.carreras.slice(0, 4).map((carrera, index) => (
                <div key={index} className="bg-white/80 rounded-lg p-4 flex items-center">
                  <Compass className="w-6 h-6 text-senda-secondary mr-3" />
                  <span className="font-lato text-gray-800">{carrera}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleExploreCarreras}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-xl font-montserrat font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Search className="w-6 h-6 mr-3" />
                ➡ Ver mis carreras recomendadas
              </Button>
              <p className="text-sm text-gray-600 mt-3 font-lato">
                Descubre fichas detalladas con información, requisitos y perspectivas profesionales
              </p>
            </div>
          </div>

          {/* Botón de continuación al hackathon */}
          <div className="text-center">
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white px-12 py-6 text-xl font-montserrat font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continuar mi Aventura
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-lg text-gray-600 mt-4 font-lato">
              ¡Ahora viene lo mejor! Pon a prueba tu perfil con desafíos reales.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultadoTest;
