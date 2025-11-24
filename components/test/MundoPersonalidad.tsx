
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface MundoPersonalidadProps {
  onComplete: (data: { [key: string]: number }) => void;
  responses: any;
}

const MundoPersonalidad: React.FC<MundoPersonalidadProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  const questions = [
    {
      id: 'liderazgo',
      title: 'Me resulta fácil tomar el liderazgo.',
      description: 'Piensa en situaciones grupales donde has estado presente'
    },
    {
      id: 'constancia',
      title: 'Soy muy constante con mis tareas.',
      description: 'Considera tu comportamiento con trabajos y responsabilidades'
    },
    {
      id: 'social',
      title: 'Disfruto hablar con personas nuevas.',
      description: 'Reflexiona sobre cómo te sientes en situaciones sociales'
    },
    {
      id: 'empatia',
      title: 'Me considero emocionalmente empático.',
      description: 'Piensa en cómo reaccionas ante las emociones de otros'
    },
    {
      id: 'desafios',
      title: 'Busco desafíos nuevos constantemente.',
      description: 'Considera tu actitud hacia lo desconocido y lo retador'
    },
    {
      id: 'organizacion',
      title: 'Prefiero ambientes organizados a improvisados.',
      description: 'Reflexiona sobre tu comodidad con la estructura vs. espontaneidad'
    }
  ];

  const handleSliderChange = (value: number[]) => {
    const currentQuestionData = questions[currentQuestion];
    const newAnswers = { ...answers, [currentQuestionData.id]: value[0] };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id] || 0;
  const canContinue = answers[currentQuestionData.id] !== undefined;

  const getScoreText = (score: number) => {
    if (score === 0) return 'Sin calificar';
    if (score === 1) return 'Nada me representa';
    if (score === 2) return 'Poco me representa';
    if (score === 3) return 'Neutral';
    if (score === 4) return 'Me representa bastante';
    if (score === 5) return 'Me representa totalmente';
    return 'Sin calificar';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎭</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          MUNDO 2: PERSONALIDAD
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Descubre tu esencia única. Responde con honestidad.
        </p>
        <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
          💡 Paso {currentQuestion + 1}: Descubre más de ti
        </Badge>
      </div>

      <Card className="mb-8 shadow-lg bg-white">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="text-2xl mb-4">P{currentQuestion + 7}</div>
            <h3 className="text-xl font-montserrat font-semibold mb-4" style={{ color: '#134E4A' }}>
              {currentQuestionData.title}
            </h3>
            <p className="text-gray-600 font-lato text-sm mb-6">
              {currentQuestionData.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Nada me representa</span>
              <span className="font-bold text-xl" style={{ color: '#134E4A' }}>
                {currentAnswer}
              </span>
              <span>Me representa totalmente</span>
            </div>
            
            <Slider
              value={[currentAnswer]}
              onValueChange={handleSliderChange}
              max={5}
              min={0}
              step={1}
              className="w-full"
            />

            <div className="text-center">
              <span className="text-lg font-semibold" style={{ color: '#134E4A' }}>
                {getScoreText(currentAnswer)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-2"
              style={{ borderColor: '#134E4A', color: '#134E4A' }}
            >
              Anterior
            </Button>
            
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: index <= currentQuestion ? '#134E4A' : '#D1D5DB'
                  }}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canContinue}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {currentQuestion === questions.length - 1 ? '🎯 Completar este mundo' : '👉 Continuar mi aventura'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MundoPersonalidad;
