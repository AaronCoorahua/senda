
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MundoEscenariosProps {
  onComplete: (data: { [key: string]: string }) => void;
  responses: any;
}

const MundoEscenarios: React.FC<MundoEscenariosProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const scenarios = [
    {
      id: 'campaña-solidaria',
      title: 'Campaña Solidaria',
      story: 'Tu colegio lanza una campaña para apoyar a niños de bajos recursos. Es un proyecto grande que requiere coordinación, creatividad y mucha organización.',
      question: '¿Qué haces tú?',
      options: [
        { emoji: '📜', text: 'Redacto el plan', value: 'planificar' },
        { emoji: '🤝', text: 'Coordino voluntarios', value: 'coordinar' },
        { emoji: '🎨', text: 'Diseño la campaña', value: 'diseñar' },
        { emoji: '📈', text: 'Mido el impacto', value: 'medir' }
      ]
    },
    {
      id: 'startup-escolar',
      title: 'Startup Escolar',
      story: 'Tú y tus amigos tienen una idea genial para crear un negocio escolar. Necesitan definir roles, crear un plan y ejecutarlo.',
      question: '¿Cuál es tu rol natural?',
      options: [
        { emoji: '💡', text: 'Genero las ideas', value: 'idear' },
        { emoji: '📊', text: 'Analizo la viabilidad', value: 'analizar' },
        { emoji: '🎯', text: 'Lidero la ejecución', value: 'ejecutar' },
        { emoji: '🤝', text: 'Manejo las relaciones', value: 'relacionar' }
      ]
    },
    {
      id: 'conflicto-grupo',
      title: 'Conflicto en el Grupo',
      story: 'En tu grupo de trabajo hay tensión. Dos compañeros no se ponen de acuerdo y el proyecto se está atrasando. El ambiente está tenso.',
      question: '¿Cómo intervienes?',
      options: [
        { emoji: '🕊', text: 'Mediar entre ambos', value: 'mediar' },
        { emoji: '📋', text: 'Reorganizar las tareas', value: 'reorganizar' },
        { emoji: '💬', text: 'Hablar con cada uno por separado', value: 'conversar' },
        { emoji: '🎯', text: 'Enfocarlos en el objetivo', value: 'enfocar' }
      ]
    },
    {
      id: 'proyecto-innovador',
      title: 'Proyecto Innovador',
      story: 'Te proponen liderar un proyecto completamente nuevo en el colegio. Nadie sabe exactamente cómo hacerlo, pero tiene mucho potencial.',
      question: '¿Cómo procedes?',
      options: [
        { emoji: '🔍', text: 'Investigo proyectos similares', value: 'investigar' },
        { emoji: '🧠', text: 'Hago lluvia de ideas con el equipo', value: 'brainstorming' },
        { emoji: '📝', text: 'Creo un plan paso a paso', value: 'planear' },
        { emoji: '🚀', text: 'Empiezo con un prototipo', value: 'prototipar' }
      ]
    },
    {
      id: 'presentacion-importante',
      title: 'Presentación Importante',
      story: 'Tu equipo debe presentar ante toda la escuela. Es la oportunidad de mostrar meses de trabajo y todos están nerviosos.',
      question: '¿Cuál es tu contribución clave?',
      options: [
        { emoji: '🎤', text: 'Soy el presentador principal', value: 'presentar' },
        { emoji: '🎨', text: 'Diseño la presentación visual', value: 'diseñar' },
        { emoji: '🫂', text: 'Tranquilizo al equipo', value: 'tranquilizar' },
        { emoji: '📊', text: 'Preparo los datos y argumentos', value: 'argumentar' }
      ]
    },
    {
      id: 'crisis-tiempo',
      title: 'Crisis de Tiempo',
      story: 'Falta una semana para entregar un proyecto grupal importante y se dan cuenta de que van muy atrasados. Hay pánico en el equipo.',
      question: '¿Cómo reaccionas?',
      options: [
        { emoji: '⚡', text: 'Reorganizo todo el plan', value: 'reorganizar-plan' },
        { emoji: '🤝', text: 'Divido tareas entre todos', value: 'dividir-tareas' },
        { emoji: '🔥', text: 'Me enfoco en lo esencial', value: 'priorizar' },
        { emoji: '💪', text: 'Motivo al equipo a trabajar', value: 'motivar' }
      ]
    }
  ];

  const handleOptionSelect = (value: string) => {
    const currentScenarioData = scenarios[currentQuestion];
    const newAnswers = { ...answers, [currentScenarioData.id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < scenarios.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentScenarioData = scenarios[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎬</div>
        <h2 className="text-3xl font-montserrat font-bold text-senda-primary mb-4">
          MUNDO 5: ESCENARIOS
        </h2>
        <p className="text-lg text-gray-700 font-lato mb-6">
          Imagínate en estas situaciones y responde según tu instinto natural
        </p>
        <Badge variant="outline" className="text-senda-secondary border-senda-secondary">
          Escenario {currentQuestion + 1} de {scenarios.length}
        </Badge>
      </div>

      <Card className="mb-8 shadow-lg" style={{ backgroundColor: '#FCFAF5' }}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-montserrat font-bold text-senda-primary mb-4">
              {currentScenarioData.title}
            </h3>
            <div className="bg-senda-cream/70 rounded-lg p-6 mb-6">
              <p className="text-gray-700 font-lato text-lg leading-relaxed italic">
                "{currentScenarioData.story}"
              </p>
            </div>
            <h4 className="text-xl font-montserrat font-semibold text-senda-secondary mb-4">
              P{currentQuestion + 27}. {currentScenarioData.question}
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentScenarioData.options.map((option) => {
              const isSelected = answers[currentScenarioData.id] === option.value;
              
              return (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all duration-300 border-2 relative ${
                    isSelected 
                      ? 'shadow-2xl border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 scale-105 -translate-y-1' 
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
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
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
          {scenarios.map((_, index) => (
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

export default MundoEscenarios;
