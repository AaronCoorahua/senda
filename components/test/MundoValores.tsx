import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MundoValoresProps {
  onComplete: (data: { [key: string]: any }) => void;
  responses: any;
}

const MundoValores: React.FC<MundoValoresProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [showMaxSelectionsAlert, setShowMaxSelectionsAlert] = useState(false);

  const questions = [
    {
      id: 'valores_futuro',
      type: 'multiple',
      title: '¿Qué valoras más para tu futuro? (elige 2)',
      maxSelections: 2,
      options: [
        { id: 'impacto', text: '🌎 Impacto', value: 'impacto' },
        { id: 'seguridad', text: '💰 Seguridad', value: 'seguridad' },
        { id: 'viajar', text: '🌍 Viajar', value: 'viajar' },
        { id: 'libertad', text: '🎨 Libertad creativa', value: 'libertad' },
        { id: 'prestigio', text: '🏅 Prestigio', value: 'prestigio' },
        { id: 'equipo', text: '🤝 Trabajo en equipo', value: 'equipo' }
      ]
    },
    {
      id: 'estabilidad_libertad',
      type: 'scale',
      title: '¿Prefieres estabilidad o libertad creativa?',
      description: 'Escala 1 a 5',
      leftLabel: 'Estabilidad',
      rightLabel: 'Libertad creativa'
    },
    {
      id: 'estilo_trabajo',
      type: 'single',
      title: '¿Qué estilo prefieres?',
      options: [
        { id: 'estructurado', text: '📋 Estructurado', value: 'estructurado' },
        { id: 'dinamico', text: '🎢 Dinámico e innovador', value: 'dinamico' }
      ]
    },
    {
      id: 'motivacion',
      type: 'single',
      title: '¿Qué te motiva más?',
      options: [
        { id: 'reconocimiento', text: '🏆 Reconocimiento público', value: 'reconocimiento' },
        { id: 'proposito', text: '🧭 Hacer algo con propósito', value: 'proposito' }
      ]
    },
    {
      id: 'rutinas_improvisacion',
      type: 'single',
      title: '¿Con qué frase conectas más?',
      options: [
        { id: 'rutinas', text: '🕰 Me gustan las rutinas', value: 'rutinas' },
        { id: 'improvisar', text: '✨ Me encanta improvisar', value: 'improvisar' }
      ]
    },
    {
      id: 'tipo_exito',
      type: 'single',
      title: '¿Qué tipo de éxito te interesa más?',
      options: [
        { id: 'economico', text: '💸 Económico', value: 'economico' },
        { id: 'social', text: '💬 Social', value: 'social' },
        { id: 'emocional', text: '❤️ Emocional', value: 'emocional' },
        { id: 'creativo', text: '🎨 Creativo', value: 'creativo' }
      ]
    }
  ];

  const handleMultipleSelect = (value: string) => {
    const currentQuestionData = questions[currentQuestion];
    const currentSelections = answers[currentQuestionData.id] || [];
    
    let newSelections;
    if (currentSelections.includes(value)) {
      newSelections = currentSelections.filter((item: string) => item !== value);
      setShowMaxSelectionsAlert(false);
    } else {
      if (currentSelections.length < currentQuestionData.maxSelections!) {
        newSelections = [...currentSelections, value];
        setShowMaxSelectionsAlert(false);
      } else {
        setShowMaxSelectionsAlert(true);
        setTimeout(() => {
          setShowMaxSelectionsAlert(false);
        }, 3000);
        return;
      }
    }
    
    setAnswers({ ...answers, [currentQuestionData.id]: newSelections });
  };

  const handleSingleSelect = (value: string) => {
    const currentQuestionData = questions[currentQuestion];
    setAnswers({ ...answers, [currentQuestionData.id]: value });
  };

  const handleScaleChange = (value: number[]) => {
    const currentQuestionData = questions[currentQuestion];
    setAnswers({ ...answers, [currentQuestionData.id]: value[0] });
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
  const currentAnswer = answers[currentQuestionData.id];
  
  const canContinue = () => {
    if (currentQuestionData.type === 'multiple') {
      return currentAnswer && currentAnswer.length === currentQuestionData.maxSelections;
    } else if (currentQuestionData.type === 'scale') {
      return currentAnswer !== undefined;
    } else {
      return currentAnswer !== undefined;
    }
  };

  const renderQuestion = () => {
    if (currentQuestionData.type === 'multiple') {
      return (
        <div className="space-y-4">
          {showMaxSelectionsAlert && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                Solo puedes seleccionar hasta 2 opciones.
              </AlertDescription>
            </Alert>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {currentQuestionData.options!.map((option) => {
              const isSelected = currentAnswer && currentAnswer.includes(option.value);
              return (
              <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 border-2 relative ${
                    isSelected 
                      ? 'shadow-2xl border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 scale-105 -translate-y-1' 
                      : 'hover:shadow-lg border-gray-300 bg-white hover:border-senda-light hover:scale-105 hover:-translate-y-2'
                  }`}
                  onClick={() => handleMultipleSelect(option.value)}
                >
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-700 font-lato text-lg font-semibold">
                      {option.text}
                    </p>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                        <span className="text-white text-xl font-bold">✓</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    } else if (currentQuestionData.type === 'scale') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{currentQuestionData.leftLabel}</span>
            <span className="font-bold text-xl" style={{ color: '#134E4A' }}>
              {currentAnswer || 3}
            </span>
            <span>{currentQuestionData.rightLabel}</span>
          </div>
          
          <Slider
            value={[currentAnswer || 3]}
            onValueChange={handleScaleChange}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      );
    } else {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {currentQuestionData.options!.map((option) => {
            const isSelected = currentAnswer === option.value;
            return (
            <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 border-2 relative ${
                  isSelected 
                    ? 'shadow-2xl border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 scale-105 -translate-y-1' 
                    : 'hover:shadow-lg border-gray-300 bg-white hover:border-senda-light hover:scale-105 hover:-translate-y-2'
                }`}
                onClick={() => handleSingleSelect(option.value)}
              >
                <CardContent className="p-6 text-center">
                  <p className="text-gray-700 font-lato text-lg font-semibold">
                    {option.text}
                  </p>
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">💎</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          MUNDO 3: VALORES Y ESTILO DE VIDA
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Lo que realmente importa en tu vida. Elige con el corazón.
        </p>
        <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
          💡 Paso {currentQuestion + 1}: Descubre más de ti
        </Badge>
      </div>

      <Card className="mb-8 shadow-lg bg-white">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="text-2xl mb-4">P{currentQuestion + 13}</div>
            <h3 className="text-xl font-montserrat font-semibold mb-6" style={{ color: '#134E4A' }}>
              {currentQuestionData.title}
            </h3>
            {currentQuestionData.description && (
              <p className="text-gray-600 font-lato text-sm mb-4">
                {currentQuestionData.description}
              </p>
            )}
          </div>

          {renderQuestion()}

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
              disabled={!canContinue()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {currentQuestion === questions.length - 1 ? '🎯 Completar este mundo' : '👉 Continuar mi aventura'}
            </Button>
          </div>

          {!canContinue() && currentQuestionData.type === 'multiple' && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Selecciona exactamente {currentQuestionData.maxSelections} opciones
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MundoValores;
