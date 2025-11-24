
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, CheckCircle, Sparkles, Target } from 'lucide-react';
import { PerfilVocacional } from '@/app/test-vocacional/page';
import InteractiveChallenge from './InteractiveChallenges';

interface MiniHackathonProps {
  perfil: PerfilVocacional;
  onComplete: () => void;
}

const MiniHackathon: React.FC<MiniHackathonProps> = ({ perfil, onComplete }) => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos en segundos
  const [response, setResponse] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const challenges = {
    'explorador-creativo': {
      title: '👩‍🎨 Explorador Creativo',
      challenge: 'Diseña una campaña visual para una causa que te interese',
      description: 'Crea una propuesta visual completa usando elementos interactivos.',
      time: 600,
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    'analista-estratégico': {
      title: '📈 Analista Estratégico', 
      challenge: 'Propón una hipótesis con datos escolares que puedas investigar',
      description: 'Analiza datos y crea una hipótesis comprobable.',
      time: 480,
      icon: '📊',
      color: 'from-blue-500 to-cyan-500'
    },
    'guía-humanista': {
      title: '🤝 Guía Humanista',
      challenge: 'Crea un mensaje motivador y empático',
      description: 'Diseña un mensaje que inspire y motive a otros.',
      time: 420,
      icon: '🤝',
      color: 'from-green-500 to-emerald-500'
    },
    'líder-emprendedor': {
      title: '🚀 Líder Emprendedor',
      challenge: 'Desarrolla una idea de negocio escolar innovadora',
      description: 'Crea una solución emprendedora para un problema común.',
      time: 600,
      icon: '🚀',
      color: 'from-orange-500 to-yellow-500'
    },
    'creador-tecnológico': {
      title: '💻 Creador Tecnológico',
      challenge: 'Diseña una app educativa interactiva',
      description: 'Desarrolla el concepto de una aplicación educativa.',
      time: 600,
      icon: '💻',
      color: 'from-indigo-500 to-purple-500'
    },
    'investigador-curioso': {
      title: '🔬 Investigador Curioso',
      challenge: 'Propón un experimento científico sencillo',
      description: 'Diseña un experimento para responder una pregunta fascinante.',
      time: 600,
      icon: '🔬',
      color: 'from-teal-500 to-green-500'
    },
    'protector-entorno': {
      title: '🌿 Protector del Entorno',
      challenge: 'Diseña una solución ecológica creativa',
      description: 'Crea una propuesta ambiental práctica e innovadora.',
      time: 600,
      icon: '🌿',
      color: 'from-green-500 to-teal-500'
    },
    'comunicador-visionario': {
      title: '📢 Comunicador Visionario',
      challenge: 'Crea un mensaje social que movilice',
      description: 'Desarrolla un mensaje poderoso que inspire acción.',
      time: 480,
      icon: '📢',
      color: 'from-purple-500 to-indigo-500'
    }
  };

  const currentChallenge = challenges[perfil.id as keyof typeof challenges] || challenges['explorador-creativo'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showChallenge && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showChallenge, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartChallenge = () => {
    setShowChallenge(true);
  };

  const handleResponseChange = (newResponse: any) => {
    setResponse(newResponse);
  };

  const isResponseComplete = () => {
    if (!response || Object.keys(response).length === 0) return false;
    
    // Check if essential fields are filled based on profile
    switch (perfil.id) {
      case 'explorador-creativo':
        return response.causa && response.colores?.length >= 1 && response.canal;
      case 'analista-estratégico':
        return response.datos?.length >= 1 && response.hipotesis_si && response.hipotesis_entonces;
      case 'creador-tecnológico':
        return response.publico && response.funcionalidades?.length >= 1;
      case 'comunicador-visionario':
        return response.formato && response.tono && response.tema;
      case 'investigador-curioso':
        return response.area && response.materiales?.length >= 1 && response.tipoResultado;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    
    const feedbacks = {
      'explorador-creativo': '¡Increíble creatividad! Tu visión artística y capacidad de comunicar visualmente son excepcionales.',
      'analista-estratégico': '¡Análisis brillante! Tu pensamiento crítico y habilidad para identificar patrones son impresionantes.',
      'guía-humanista': '¡Qué mensaje tan empático! Tu capacidad de conectar emocionalmente y motivar es extraordinaria.',
      'líder-emprendedor': '¡Idea innovadora! Tu visión emprendedora y capacidad de identificar oportunidades son prometedoras.',
      'creador-tecnológico': '¡Concepto genial! Tu pensamiento sistemático y creatividad tecnológica son excelentes.',
      'investigador-curioso': '¡Experimento fascinante! Tu curiosidad científica y metodología son admirables.',
      'protector-entorno': '¡Solución inspiradora! Tu conciencia ambiental y pensamiento sustentable son valiosos.',
      'comunicador-visionario': '¡Mensaje poderoso! Tu capacidad de inspirar y movilizar es excepcional.'
    };

    setFeedback(feedbacks[perfil.id as keyof typeof feedbacks] || feedbacks['explorador-creativo']);
  };

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-2 border-green-200 animate-scale-in">
          <CardContent className="p-10 text-center">
            <div className="animate-bounce mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </div>
            <h2 className="text-4xl font-montserrat font-bold text-green-600 mb-6">
              🎉 ¡Reto completado con éxito!
            </h2>
            
            <div className="bg-green-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-montserrat font-semibold text-green-700 mb-4">
                ✅ Feedback personalizado
              </h3>
              <p className="text-lg text-green-700 font-lato leading-relaxed">
                {feedback}
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8">
              <Badge className="bg-yellow-500 text-white text-xl px-6 py-3 mb-4 animate-pulse">
                🎖 Insignia {perfil.nombre} Desbloqueada
              </Badge>
              <p className="text-gray-700 font-lato">
                Has demostrado las habilidades clave de tu perfil vocacional de forma creativa e interactiva
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h4 className="text-lg font-montserrat font-semibold text-blue-700 mb-3">
                📌 Próximos pasos sugeridos
              </h4>
              <p className="text-blue-700 font-lato">
                Te recomendamos explorar carreras relacionadas con tu perfil y conectar con mentores del área
              </p>
            </div>

            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white px-10 py-4 text-xl font-montserrat font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
            >
              🟢 Ver mi Mural Senda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showChallenge) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-6xl mb-6 animate-bounce">🧠</div>
          <h2 className="text-4xl font-montserrat font-bold text-senda-primary mb-4">
            Mini Hackathon Vocacional
          </h2>
          <h3 className="text-2xl font-montserrat font-semibold text-senda-secondary mb-6">
            "Ponte a prueba"
          </h3>
          <p className="text-xl text-gray-700 font-lato mb-8">
            Recibe un reto práctico según tu perfil para ver tu vocación en acción.
          </p>
        </div>

        <Card className={`shadow-2xl border-4 bg-gradient-to-br ${currentChallenge.color} text-white animate-scale-in mb-8`}>
          <CardContent className="p-10">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">{currentChallenge.icon}</div>
              <h3 className="text-3xl font-montserrat font-bold mb-4">
                {currentChallenge.title}
              </h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h4 className="text-2xl font-montserrat font-semibold mb-4">
                  Tu Reto Interactivo:
                </h4>
                <p className="text-xl font-lato leading-relaxed mb-4">
                  {currentChallenge.challenge}
                </p>
                <p className="text-lg font-lato opacity-90">
                  {currentChallenge.description}
                </p>
              </div>
              
              <Button
                onClick={handleStartChallenge}
                className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 text-xl font-montserrat font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
              >
                🎯 Empezar reto interactivo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-senda-cream/50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
              <h4 className="text-lg font-montserrat font-semibold text-senda-primary">
                Al finalizar recibirás:
              </h4>
              <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-lato text-gray-700">Feedback personalizado</span>
              </div>
              <div className="flex items-center justify-center">
                <Badge className="w-5 h-5 bg-yellow-500 mr-2" />
                <span className="font-lato text-gray-700">Insignia de tu perfil</span>
              </div>
              <div className="flex items-center justify-center">
                <Target className="w-5 h-5 text-senda-primary mr-2" />
                <span className="font-lato text-gray-700">Recomendación personalizada</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">{currentChallenge.icon}</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          {currentChallenge.title}
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          {currentChallenge.challenge}
        </p>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
            {perfil.nombre}
          </Badge>
          <Badge 
            variant={timeLeft > 60 ? "secondary" : "destructive"}
            className="flex items-center"
          >
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      <InteractiveChallenge 
        profileId={perfil.id}
        onResponseChange={handleResponseChange}
      />

      <div className="text-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={!isResponseComplete() || timeLeft === 0}
          className="bg-senda-primary hover:bg-senda-secondary text-white px-8 py-3 text-lg font-montserrat font-semibold rounded-xl"
        >
          {timeLeft === 0 ? 'Tiempo agotado' : '🎯 Enviar mi reto'}
        </Button>
        {!isResponseComplete() && timeLeft > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Completa los elementos requeridos para enviar tu respuesta
          </p>
        )}
      </div>
    </div>
  );
};

export default MiniHackathon;
