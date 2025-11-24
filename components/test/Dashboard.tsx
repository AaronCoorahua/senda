
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Users, MessageCircle, ArrowRight, Medal, Compass, RefreshCw, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PerfilVocacional } from '@/app/test-vocacional/page';

interface DashboardProps {
  perfil: PerfilVocacional;
  hackathonCompleted: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ perfil, hackathonCompleted }) => {
  const router = useRouter();

  const achievements = [
    {
      id: 'explorador',
      name: 'Explorador de sí mismo',
      description: 'Por completar el test vocacional',
      icon: '🧭',
      unlocked: true,
      mundo: 'Test Vocacional'
    },
    {
      id: 'personalidad',
      name: 'Mundo de Personalidad',
      description: 'Descubriste tu estilo personal',
      icon: '🎭',
      unlocked: true,
      mundo: 'Personalidad'
    },
    {
      id: 'valores',
      name: 'Mundo de Valores',
      description: 'Definiste tus principios',
      icon: '💎',
      unlocked: true,
      mundo: 'Valores'
    },
    {
      id: 'proposito',
      name: 'Mundo de Propósito',
      description: 'Encontraste tu motivación',
      icon: '🎯',
      unlocked: true,
      mundo: 'Propósito'
    },
    {
      id: 'hackathon',
      name: 'Desafío Completado',
      description: 'Por completar el Mini Hackathon',
      icon: '🧠',
      unlocked: hackathonCompleted,
      mundo: 'Mini Hackathon'
    },
    {
      id: 'conectando',
      name: 'Conectando con otros',
      description: 'Por participar en foros',
      icon: '💬',
      unlocked: false,
      mundo: 'Comunidad'
    }
  ];

  const completedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const progressPercentage = Math.round((completedAchievements / totalAchievements) * 100);

  // Simulamos un ranking semanal (en una app real vendría de una API)
  const weeklyRanking = [
    { name: 'Ana M.', profile: 'Líder Emprendedor', points: 95 },
    { name: 'Carlos R.', profile: 'Investigador Curioso', points: 92 },
    { name: 'Tú', profile: perfil.nombre, points: hackathonCompleted ? 88 : 75, isUser: true },
    { name: 'María L.', profile: 'Guía Humanista', points: 85 },
    { name: 'Diego S.', profile: 'Creador Tecnológico', points: 82 }
  ];

  const userPosition = weeklyRanking.findIndex(user => user.isUser) + 1;
  const totalParticipants = 112;

  const mentorMessages = {
    'explorador-creativo': 'Tu creatividad es tu superpoder. Sigue explorando formas únicas de expresarte y crear belleza en el mundo.',
    'analista-estratégico': 'Tu mente analítica puede resolver grandes desafíos. Confía en tu capacidad de encontrar patrones y soluciones.',
    'guía-humanista': 'Tu empatía transforma vidas. Sigue usando tu don para conectar y guiar a otros hacia su mejor versión.',
    'líder-emprendedor': 'Tu visión puede cambiar el mundo. Atrévete a liderar proyectos que generen un impacto positivo.',
    'creador-tecnológico': 'Tu innovación tecnológica puede mejorar la vida de muchos. Sigue creando soluciones que importen.',
    'investigador-curioso': 'Tu curiosidad mueve la ciencia. Sigue haciendo preguntas que abran nuevos caminos de conocimiento.',
    'protector-entorno': 'Tu conciencia ambiental es crucial para nuestro futuro. Sigue siendo guardián de nuestro planeta.',
    'comunicador-visionario': 'Tu voz puede inspirar cambios. Usa tu talento para comunicar mensajes que transformen la sociedad.'
  };

  const currentMentorMessage = mentorMessages[perfil.id as keyof typeof mentorMessages] || mentorMessages['explorador-creativo'];

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi Perfil Vocacional Senda',
        text: `¡Descubrí que soy ${perfil.nombre}! Haz el test vocacional y encuentra tu camino.`,
        url: window.location.origin
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`¡Descubrí que soy ${perfil.nombre}! Haz el test vocacional en ${window.location.origin}`);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header del Mural */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h2 className="text-4xl font-montserrat font-bold text-senda-primary mb-4">
          📊 Mural Senda
        </h2>
        <h3 className="text-2xl font-montserrat font-semibold text-senda-secondary mb-6">
          Dashboard de Exploradores
        </h3>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Tu camino vocacional ha comenzado. ¡Mira todo lo que has logrado!
        </p>
        <Badge className="bg-gradient-to-r from-senda-primary to-senda-secondary text-white px-6 py-3 text-lg">
          {progressPercentage}% Completado
        </Badge>
      </div>

      {/* Perfil del Usuario y Camino Vocacional */}
      <Card className="mb-8 shadow-2xl border-2 border-senda-primary/20">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{perfil.icono}</div>
            <h3 className="text-2xl font-montserrat font-bold text-senda-primary mb-2">
              🚀 Tu Camino Vocacional
            </h3>
            <Badge className="bg-senda-primary text-white px-4 py-2 text-lg mb-4">
              {perfil.nombre}
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-senda-cream/50 rounded-2xl p-6">
              <h4 className="font-montserrat font-semibold text-senda-primary mb-3 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Perfil Asignado
              </h4>
              <p className="text-gray-700 font-lato mb-2">{perfil.nombre}</p>
              <p className="text-sm text-gray-600 font-lato italic">{perfil.descripcion}</p>
            </div>
            
            <div className="bg-senda-cream/50 rounded-2xl p-6">
              <h4 className="font-montserrat font-semibold text-senda-primary mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Reto Completado
              </h4>
              <p className="text-gray-700 font-lato mb-2">
                {hackathonCompleted ? 'Mini Hackathon Vocacional ✅' : 'Pendiente por completar'}
              </p>
              <p className="text-sm text-gray-600 font-lato italic">
                {hackathonCompleted ? 'Demostraste las habilidades de tu perfil' : 'Completa tu reto personalizado'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insignias y Progreso */}
      <Card className="mb-8 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <Medal className="w-8 h-8 text-yellow-500 mr-3" />
            <h3 className="text-2xl font-montserrat font-semibold text-senda-primary">
              🎖 Insignias y Progreso
            </h3>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-lato text-gray-700">Progreso General</span>
              <span className="font-montserrat font-semibold text-senda-primary">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-senda-primary to-senda-secondary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 transform hover:scale-105'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-montserrat font-semibold text-senda-primary text-sm mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-gray-600 font-lato mb-2">
                    {achievement.mundo}
                  </p>
                  {achievement.unlocked && (
                    <Badge className="bg-yellow-500 text-white text-xs">
                      ✓ Desbloqueado
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking Semanal */}
      <Card className="mb-8 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-senda-primary mr-3" />
            <h3 className="text-2xl font-montserrat font-semibold text-senda-primary">
              🥇 Ranking Semanal
            </h3>
          </div>
          
          <div className="bg-senda-cream/30 rounded-2xl p-6 mb-6 text-center">
            <h4 className="text-xl font-montserrat font-bold text-senda-primary mb-2">
              Tu Posición Actual
            </h4>
            <div className="text-3xl font-montserrat font-bold text-senda-secondary mb-2">
              #{userPosition}
            </div>
            <p className="text-gray-600 font-lato">
              de {totalParticipants} participantes
            </p>
          </div>

          <div className="space-y-3">
            {weeklyRanking.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                  user.isUser
                    ? 'border-senda-primary bg-gradient-to-r from-senda-cream to-white shadow-md'
                    : 'border-gray-200 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 font-lato">
                      {user.profile}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-senda-primary border-senda-primary">
                  {user.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consejo del Mentor */}
      <Card className="mb-8 shadow-2xl border-2 border-senda-secondary/20">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-6">🌟</div>
          <h3 className="text-2xl font-montserrat font-semibold text-senda-primary mb-6">
            💬 Consejo de tu Mentor Digital
          </h3>
          <div className="bg-gradient-to-r from-senda-cream to-white rounded-2xl p-8 mb-6">
            <p className="text-xl text-gray-700 font-lato italic leading-relaxed">
              "{currentMentorMessage}"
            </p>
          </div>
          <p className="text-senda-secondary font-lato font-semibold text-lg">
            ¡Sigue explorando y construyendo tu futuro!
          </p>
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <RefreshCw className="w-8 h-8 text-senda-primary mx-auto mb-4" />
            <h4 className="font-montserrat font-semibold text-senda-primary mb-3">
              Repetir Test
            </h4>
            <Button
              onClick={() => router.push('/test-vocacional')}
              variant="outline"
              className="border-senda-primary text-senda-primary hover:bg-senda-primary hover:text-white w-full"
            >
              🔁 Volver a empezar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <Share2 className="w-8 h-8 text-senda-secondary mx-auto mb-4" />
            <h4 className="font-montserrat font-semibold text-senda-primary mb-3">
              Compartir Resultado
            </h4>
            <Button
              onClick={handleShareResult}
              variant="outline"
              className="border-senda-secondary text-senda-secondary hover:bg-senda-secondary hover:text-white w-full"
            >
              📩 Compartir perfil
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <Compass className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h4 className="font-montserrat font-semibold text-senda-primary mb-3">
              Explorar Carreras
            </h4>
            <Button
              onClick={() => router.push('/')}
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              🧭 Ver carreras sugeridas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Próximos Pasos */}
      <Card className="shadow-lg bg-gradient-to-br from-senda-cream to-white">
        <CardContent className="p-8 text-center">
          <Target className="w-12 h-12 text-senda-primary mx-auto mb-4" />
          <h3 className="text-2xl font-montserrat font-semibold text-senda-primary mb-4">
            🎯 Siguiente Paso Sugerido
          </h3>
          <p className="text-lg text-gray-700 font-lato mb-6">
            Explora carreras relacionadas con tu perfil {perfil.nombre} y conecta con profesionales del área
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => router.push('/')}
              className="bg-senda-primary hover:bg-senda-secondary text-white px-6 py-3"
            >
              Explorar Carreras
            </Button>
            <Button
              variant="outline"
              className="border-senda-secondary text-senda-secondary hover:bg-senda-secondary hover:text-white px-6 py-3"
              disabled
            >
              Conectar con Mentores
              <span className="text-xs ml-2">(Próximamente)</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
