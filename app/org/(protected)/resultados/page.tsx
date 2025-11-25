"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Share2, Brain, Heart, Target, Lightbulb, Users, Award, FileText, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OrgResults() {
  const { toast } = useToast();
  
  const handleGenerateParentReport = () => {
    toast({
      title: "Generando Informe para Padres",
      description: "El PDF se descargará en unos segundos con los resultados completos del estudiante.",
    });
  };

  // Datos de ejemplo de un estudiante
  const studentResult = {
    name: 'Juan Pérez',
    grade: '5ºA',
    classroom: 'Aula 101',
    profileType: 'Perfil Técnico-Analítico',
    completionDate: '15 de Enero, 2025',
    careerDistribution: [
      { name: 'Ingeniería', percentage: 80, color: 'bg-blue-500' },
      { name: 'Arte', percentage: 10, color: 'bg-purple-500' },
      { name: 'Salud', percentage: 10, color: 'bg-green-500' },
    ],
    scores: [
      { dimension: 'Intereses', score: 88, icon: Brain, color: 'bg-blue-500' },
      { dimension: 'Personalidad', score: 85, icon: Heart, color: 'bg-purple-500' },
      { dimension: 'Valores', score: 78, icon: Target, color: 'bg-green-500' },
      { dimension: 'Talentos', score: 92, icon: Lightbulb, color: 'bg-yellow-500' },
      { dimension: 'Escenarios', score: 84, icon: Users, color: 'bg-pink-500' },
      { dimension: 'Propósito', score: 90, icon: Award, color: 'bg-indigo-500' },
    ],
    strengths: [
      'Pensamiento lógico y analítico',
      'Resolución de problemas complejos',
      'Habilidades matemáticas',
      'Atención al detalle',
    ],
    recommendedCareers: [
      { name: 'Ingeniería de Sistemas', match: 95, description: 'Desarrollo de software y tecnología' },
      { name: 'Ingeniería Civil', match: 88, description: 'Diseño y construcción de infraestructura' },
      { name: 'Ingeniería Industrial', match: 85, description: 'Optimización de procesos productivos' },
    ],
    upcomingEvents: [
      { 
        title: 'Feria de Ingenierías', 
        university: 'Universidad Católica', 
        date: 'Octubre 15, 2025',
        type: 'Feria'
      },
      { 
        title: 'Open House - Ingeniería de Sistemas', 
        university: 'UTEC', 
        date: 'Octubre 22, 2025',
        type: 'Open House'
      },
      { 
        title: 'Charla: Tendencias en Ingeniería', 
        university: 'UNI', 
        date: 'Noviembre 5, 2025',
        type: 'Charla'
      },
    ],
    parentRecommendations: [
      'Fomentar proyectos de programación y robótica en casa',
      'Inscribirlo en cursos de matemáticas avanzadas',
      'Visitar universidades con programas de ingeniería',
      'Conectar con profesionales del área para mentorías',
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Resultados del Test</h1>
          <p className="text-gray-600">Análisis detallado del perfil vocacional</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleGenerateParentReport}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generar Informe para Padres
          </Button>
          <Button variant="outline" className="border-[#10B981] text-[#10B981] hover:bg-green-50">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir con Padres
          </Button>
          <Button className="bg-[#10B981] hover:bg-[#059669]">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF Completo
          </Button>
        </div>
      </div>

      {/* Student Info Card */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center text-white text-2xl font-bold">
                {studentResult.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#134E4A]">{studentResult.name}</h2>
                <p className="text-gray-600">{studentResult.grade} • {studentResult.classroom}</p>
                <p className="text-sm text-gray-500 mt-1">Completado el {studentResult.completionDate}</p>
              </div>
            </div>
            <Badge className="bg-purple-500 text-white px-4 py-2 text-lg">
              {studentResult.profileType}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Career Distribution Chart */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A]">Distribución Vocacional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {studentResult.careerDistribution.map((area, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${area.color} flex items-center justify-center text-white text-2xl font-bold`}>
                    {area.percentage}%
                  </div>
                  <p className="font-medium text-gray-900">{area.name}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              {studentResult.careerDistribution.map((area, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{area.name}</span>
                    <span className="text-sm font-bold text-[#134E4A]">{area.percentage}%</span>
                  </div>
                  <Progress value={area.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scores by Dimension */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A]">Puntuaciones por Dimensión</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentResult.scores.map((dimension, index) => {
            const Icon = dimension.icon;
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{dimension.dimension}</span>
                  </div>
                  <span className="text-lg font-bold text-[#134E4A]">{dimension.score}%</span>
                </div>
                <Progress value={dimension.score} className="h-3" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-[#134E4A]">Fortalezas Identificadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentResult.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                    ✓
                  </div>
                  <span className="text-gray-900 font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Careers */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-[#134E4A]">Carreras Sugeridas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              Basado en tu perfil vocacional, estas son las carreras más compatibles con tus intereses, 
              habilidades y valores. Cada una representa una excelente oportunidad para tu desarrollo profesional.
            </p>
            <div className="space-y-5">
              {studentResult.recommendedCareers.map((career, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-[#134E4A] mb-1">{career.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    </div>
                    <Badge className="bg-[#10B981] ml-3">{career.match}% Match</Badge>
                  </div>
                  <Progress value={career.match} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parent Recommendations */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-purple-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Recomendaciones para Apoderados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Sugerencias para que los padres apoyen el desarrollo vocacional en casa:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {studentResult.parentRecommendations.map((recommendation, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-purple-200 flex items-start space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-900">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Próximos Eventos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Eventos, ferias y charlas universitarias relacionadas con el perfil vocacional del estudiante:
          </p>
          <div className="space-y-4">
            {studentResult.upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-600">{event.type}</Badge>
                      <h4 className="font-bold text-gray-900">{event.title}</h4>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                        {event.university}
                      </p>
                      <p className="text-sm text-gray-700 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Más Info
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-900">
              💡 <strong>Sugerencia:</strong> Compartir estos eventos con los padres para que puedan 
              acompañar al estudiante en su exploración vocacional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
