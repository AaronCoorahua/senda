
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MundoTalentosProps {
  onComplete: (data: { [key: string]: string }) => void;
  responses: any;
}

const MundoTalentos: React.FC<MundoTalentosProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const questions = [
    {
      id: 'organizar-feria',
      title: 'Si organizaras una feria, ¿qué harías primero?',
      description: 'Piensa en tu instinto natural al enfrentar un proyecto grande',
      options: [
        { emoji: '🧮', text: 'Presupuesto', value: 'presupuesto' },
        { emoji: '🎨', text: 'Diseño', value: 'diseño' },
        { emoji: '🗣', text: 'Voluntarios', value: 'voluntarios' },
        { emoji: '📆', text: 'Cronograma', value: 'cronograma' }
      ]
    },
    {
      id: 'problema-ajeno',
      title: 'Cuando alguien tiene un problema, yo suelo...',
      description: 'Reflexiona sobre tu reacción natural',
      options: [
        { emoji: '👂', text: 'Escuchar', value: 'escuchar' },
        { emoji: '💡', text: 'Proponer', value: 'proponer' },
        { emoji: '🎭', text: 'Distraer', value: 'distraer' },
        { emoji: '🔎', text: 'Investigar', value: 'investigar' }
      ]
    },
    {
      id: 'habilidad-natural',
      title: '¿Qué te resulta más natural?',
      description: 'Piensa en lo que haces sin esfuerzo',
      options: [
        { emoji: '👑', text: 'Liderar', value: 'liderar' },
        { emoji: '🫂', text: 'Mediar', value: 'mediar' },
        { emoji: '💡', text: 'Crear', value: 'crear' },
        { emoji: '🗣', text: 'Comunicar', value: 'comunicar' }
      ]
    },
    {
      id: 'enfrentar-errores',
      title: '¿Cómo enfrentas errores?',
      description: 'Piensa en tu reacción típica ante los errores',
      options: [
        { emoji: '😤', text: 'Me frustro pero aprendo', value: 'frustro-aprendo' },
        { emoji: '🧍', text: 'Pido ayuda', value: 'pido-ayuda' },
        { emoji: '😶', text: 'Me desconecto', value: 'desconecto' },
        { emoji: '🔍', text: 'Analizo causa', value: 'analizo' }
      ]
    },
    {
      id: 'habilidad-representativa',
      title: '¿Qué habilidad te representa mejor?',
      description: 'Elige la que más se acerque a tu fortaleza',
      options: [
        { emoji: '📊', text: 'Pensamiento crítico', value: 'critico' },
        { emoji: '🤝', text: 'Empatía', value: 'empatia' },
        { emoji: '🎨', text: 'Creatividad', value: 'creatividad' },
        { emoji: '🗂', text: 'Organización', value: 'organizacion' }
      ]
    },
    {
      id: 'trabajo-grupo',
      title: '¿Cómo trabajas en grupo?',
      description: 'Reflexiona sobre tu rol típico en equipos',
      options: [
        { emoji: '👑', text: 'Lidero', value: 'lidero' },
        { emoji: '🫶', text: 'Apoyo', value: 'apoyo' },
        { emoji: '📋', text: 'Ordeno', value: 'ordeno' },
        { emoji: '🧍', text: 'Prefiero solo', value: 'solo' }
      ]
    },
    {
      id: 'facilidad',
      title: '¿Qué se te da fácil?',
      description: 'Piensa en lo que otros te reconocen',
      options: [
        { emoji: '🧠', text: 'Resolver problemas', value: 'resolver' },
        { emoji: '🎤', text: 'Comunicar', value: 'comunicar' },
        { emoji: '💬', text: 'Conectar', value: 'conectar' },
        { emoji: '📆', text: 'Planear', value: 'planear' }
      ]
    },
    {
      id: 'talento-fuerte',
      title: '¿Cuál es tu talento más fuerte?',
      description: 'Tu habilidad más destacada',
      options: [
        { emoji: '🎯', text: 'Improvisar', value: 'improvisar' },
        { emoji: '👂', text: 'Escuchar', value: 'escuchar' },
        { emoji: '🗣', text: 'Persuadir', value: 'persuadir' },
        { emoji: '🧑‍🎨', text: 'Diseñar', value: 'diseñar' }
      ]
    }
  ];

  const handleOptionSelect = (value: string) => {
    const currentQuestionData = questions[currentQuestion];
    const newAnswers = { ...answers, [currentQuestionData.id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          MUNDO 4: TALENTOS Y HABILIDADES
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Descubre tus fortalezas naturales y habilidades destacadas
        </p>
        <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
          Pregunta {currentQuestion + 1} de {questions.length}
        </Badge>
      </div>

      <Card className="mb-8 shadow-lg" style={{ backgroundColor: '#FCFAF5' }}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-montserrat font-semibold text-senda-primary mb-4">
              P{currentQuestion + 19}. {currentQuestionData.title}
            </h3>
            <p className="text-gray-600 font-lato">
              {currentQuestionData.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentQuestionData.options.map((option) => {
              const isSelected = answers[currentQuestionData.id] === option.value;
              
              return (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all duration-300 border-2 relative ${
                    isSelected 
                      ? 'shadow-2xl border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 scale-105 -translate-y-1' 
                      : 'hover:shadow-lg border-gray-300 bg-white hover:border-senda-light hover:scale-105 hover:-translate-y-2'
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl mb-3 transition-transform duration-300 ${isSelected ? 'scale-125' : ''}`}>
                      {option.emoji}
                    </div>
                    <p className="text-gray-700 font-lato font-semibold">
                      {option.text}
                    </p>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                        <span className="text-white text-xl font-bold">✓</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentQuestion ? 'bg-senda-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MundoTalentos;
