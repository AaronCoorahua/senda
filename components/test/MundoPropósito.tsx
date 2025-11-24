
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MundoPropósitoProps {
  onComplete: (data: string[]) => void;
  responses: any;
}

const MundoPropósito: React.FC<MundoPropósitoProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});

  const questions = [
    {
      id: 'sueños-30',
      title: '¿Qué te emociona lograr antes de los 30?',
      description: 'Selecciona hasta 3 sueños que más te inspiran',
      emoji: '✨',
      maxSelections: 3,
      options: [
        { emoji: '💼', text: 'Construir un negocio exitoso', value: 'negocio' },
        { emoji: '🌍', text: 'Viajar por el mundo', value: 'viajar' },
        { emoji: '🎓', text: 'Ser experto en mi campo', value: 'experto' },
        { emoji: '❤️', text: 'Inspirar y ayudar a otros', value: 'inspirar' },
        { emoji: '🎨', text: 'Crear algo innovador', value: 'crear' },
        { emoji: '🏆', text: 'Lograr reconocimiento', value: 'reconocimiento' }
      ]
    },
    {
      id: 'utilidad-plenitud',
      title: '¿Qué te hace sentir más útil y pleno?',
      description: 'Selecciona las 2 que más resuenen contigo',
      emoji: '🌟',
      maxSelections: 2,
      options: [
        { emoji: '🤝', text: 'Ayudar a resolver problemas de otros', value: 'resolver' },
        { emoji: '💡', text: 'Generar ideas nuevas e innovadoras', value: 'ideas' },
        { emoji: '🎯', text: 'Liderar proyectos y equipos', value: 'liderar' },
        { emoji: '🌱', text: 'Enseñar y compartir conocimiento', value: 'enseñar' },
        { emoji: '🏗️', text: 'Construir algo tangible y duradero', value: 'construir' },
        { emoji: '💫', text: 'Inspirar y motivar a las personas', value: 'inspirar' }
      ]
    },
    {
      id: 'cambiar-mundo',
      title: 'Si pudieras cambiar algo del mundo, ¿qué sería?',
      description: 'Elige la causa que más resuena contigo',
      emoji: '🌍',
      maxSelections: 2,
      options: [
        { emoji: '🌱', text: 'Proteger el medio ambiente', value: 'ambiente' },
        { emoji: '🎓', text: 'Mejorar la educación', value: 'educacion' },
        { emoji: '❤️', text: 'Reducir desigualdades sociales', value: 'igualdad' },
        { emoji: '💚', text: 'Mejorar la salud mental', value: 'salud-mental' },
        { emoji: '🚀', text: 'Impulsar la innovación tecnológica', value: 'tecnologia' },
        { emoji: '🎨', text: 'Promover el arte y la cultura', value: 'cultura' }
      ]
    }
  ];

  const handleMultipleSelect = (questionId: string, value: string, maxSelections: number) => {
    const currentSelections = answers[questionId] || [];
    
    let newSelections;
    if (currentSelections.includes(value)) {
      newSelections = currentSelections.filter(item => item !== value);
    } else {
      if (currentSelections.length < maxSelections) {
        newSelections = [...currentSelections, value];
      } else {
        return;
      }
    }
    
    setAnswers({ ...answers, [questionId]: newSelections });
  };

  const handleRanking = (questionId: string, items: string[]) => {
    setAnswers({ ...answers, [questionId]: items });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Convertir las respuestas a un formato compatible
      const finalAnswers = Object.values(answers).flat();
      onComplete(finalAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
  const canContinue = () => {
    const currentAnswer = answers[currentQuestionData.id] || [];
    return currentAnswer.length > 0;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          MUNDO 6: PROPÓSITO Y REFLEXIÓN
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Las preguntas más importantes. Tómate tu tiempo para reflexionar profundamente.
        </p>
        <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
          Reflexión {currentQuestion + 1} de {questions.length}
        </Badge>
      </div>

      <Card className="mb-8 shadow-lg" style={{ backgroundColor: '#FCFAF5' }}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4 animate-bounce">{currentQuestionData.emoji}</div>
            <h3 className="text-2xl font-montserrat font-bold text-senda-primary mb-4">
              P{currentQuestion + 33}. {currentQuestionData.title}
            </h3>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-yellow-200">
              <p className="text-gray-700 font-lato text-lg font-semibold">
                {currentQuestionData.description}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentQuestionData.options!.map((option) => {
              const isSelected = (answers[currentQuestionData.id] || []).includes(option.value);
              const currentSelections = (answers[currentQuestionData.id] || []).length;
              
              return (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all duration-300 border-2 relative ${
                    isSelected 
                      ? 'shadow-2xl border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 scale-105 -translate-y-1' 
                      : 'hover:shadow-lg border-gray-300 bg-white hover:border-senda-light hover:scale-105 hover:-translate-y-2'
                  }`}
                  onClick={() => handleMultipleSelect(currentQuestionData.id, option.value, currentQuestionData.maxSelections!)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl mb-3 transition-transform duration-300 ${isSelected ? 'scale-125' : ''}`}>
                      {option.emoji}
                    </div>
                    <p className="text-gray-700 font-lato font-semibold text-base">
                      {option.text}
                    </p>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                        <span className="text-white text-xl font-bold">✓</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-2 border-senda-secondary text-senda-secondary hover:bg-senda-secondary hover:text-white"
            >
              Anterior
            </Button>
            
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentQuestion ? 'bg-senda-primary scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canContinue()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isLastQuestion ? '🎯 ¡Ver mi perfil!' : '👉 Continuar mi aventura'}
            </Button>
          </div>

          {!canContinue() && (
            <p className="text-center text-sm text-senda-secondary font-semibold mt-4 animate-pulse">
              Selecciona al menos 1 opción para continuar
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MundoPropósito;
