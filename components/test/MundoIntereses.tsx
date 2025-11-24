
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MundoInteresesProps {
  onComplete: (data: { [key: string]: string }) => void;
  responses: any;
}

const MundoIntereses: React.FC<MundoInteresesProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const questions = [
    {
      id: 'actividad-emocionante',
      title: '¿Qué actividad te emociona más hacer?',
      description: 'Piensa en lo que realmente disfrutas haciendo',
      options: [
        { emoji: '🎤', text: 'Diseñar algo', value: 'diseñar' },
        { emoji: '🧠', text: 'Resolver un reto', value: 'resolver' },
        { emoji: '🧍', text: 'Ayudar a alguien', value: 'ayudar' },
        { emoji: '🌍', text: 'Crear una campaña', value: 'campaña' }
      ]
    },
    {
      id: 'lugar-feliz',
      title: '¿Dónde te sentirías más feliz?',
      description: 'Imagínate trabajando en estos lugares',
      options: [
        { emoji: '🏥', text: 'Hospital', value: 'hospital' },
        { emoji: '🎥', text: 'Estudio creativo', value: 'estudio' },
        { emoji: '🔬', text: 'Laboratorio', value: 'laboratorio' },
        { emoji: '🚀', text: 'Startup', value: 'startup' },
        { emoji: '🌱', text: 'Campo abierto', value: 'campo' },
        { emoji: '🏢', text: 'Oficina', value: 'oficina' }
      ]
    },
    {
      id: 'feria-escolar',
      title: '¿Qué tipo de feria escolar te atrae más?',
      description: 'Elige la que más te llame la atención',
      options: [
        { emoji: '🔬', text: 'Ciencia', value: 'ciencia' },
        { emoji: '💡', text: 'Emprendimiento', value: 'emprendimiento' },
        { emoji: '🎨', text: 'Arte', value: 'arte' },
        { emoji: '🧑‍⚕️', text: 'Salud', value: 'salud' },
        { emoji: '🌳', text: 'Impacto social', value: 'social' },
        { emoji: '📊', text: 'Matemática', value: 'matematica' }
      ]
    },
    {
      id: 'curso-libre',
      title: '¿Qué curso libre elegirías?',
      description: 'Si pudieras elegir cualquier curso adicional',
      options: [
        { emoji: '🤖', text: 'Robótica', value: 'robotica' },
        { emoji: '🎭', text: 'Teatro', value: 'teatro' },
        { emoji: '🧠', text: 'Psicología', value: 'psicologia' },
        { emoji: '📈', text: 'Finanzas', value: 'finanzas' },
        { emoji: '🎨', text: 'Arte digital', value: 'arte-digital' },
        { emoji: '🤝', text: 'Voluntariado', value: 'voluntariado' }
      ]
    },
    {
      id: 'actividad-extracurricular',
      title: '¿A qué actividad extracurricular te unirías?',
      description: 'Piensa en lo que más te motivaría después de clases',
      options: [
        { emoji: '🗣', text: 'Debate', value: 'debate' },
        { emoji: '🎷', text: 'Banda musical', value: 'musica' },
        { emoji: '🧮', text: 'Olimpiada matemática', value: 'matematicas' },
        { emoji: '💼', text: 'Startup escolar', value: 'startup' },
        { emoji: '♻️', text: 'Club ambiental', value: 'ambiental' },
        { emoji: '🫂', text: 'Ayuda social', value: 'ayuda-social' }
      ]
    },
    {
      id: 'proyecto-soñado',
      title: '¿Cuál sería tu proyecto soñado?',
      description: 'Si pudieras hacer cualquier proyecto',
      options: [
        { emoji: '📽', text: 'Dirigir un documental', value: 'documental' },
        { emoji: '📱', text: 'Crear una app', value: 'app' },
        { emoji: '🌍', text: 'Fundar una ONG', value: 'ong' },
        { emoji: '👕', text: 'Diseñar una marca', value: 'marca' },
        { emoji: '🔍', text: 'Investigar algo inédito', value: 'investigar' },
        { emoji: '📢', text: 'Liderar una campaña', value: 'campaña' }
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
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          MUNDO 1: INTERESES
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Responde según lo que realmente te emociona y motiva
        </p>
        <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
          Pregunta {currentQuestion + 1} de {questions.length}
        </Badge>
      </div>

      <Card className="mb-8 shadow-lg bg-senda-cream">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-montserrat font-semibold text-senda-primary mb-4">
              P{currentQuestion + 1}. {currentQuestionData.title}
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
                      ? 'shadow-2xl border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 scale-105 -translate-y-1' 
                      : 'hover:shadow-lg border-gray-300 bg-white hover:border-senda-light hover:scale-105 hover:-translate-y-2'
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl mb-3 transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                      {option.emoji}
                    </div>
                    <p className="text-gray-700 font-lato font-semibold">
                      {option.text}
                    </p>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
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

export default MundoIntereses;
