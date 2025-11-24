import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, BarChart3, PieChart, TrendingUp, Trophy, Target, TrendingDown } from 'lucide-react';

export default function OrgReports() {
  const purposeRanking = [
    { grade: '5ºA', purposeDefined: 80, total: 120 },
    { grade: '5ºB', purposeDefined: 75, total: 115 },
    { grade: '4ºA', purposeDefined: 68, total: 105 },
    { grade: '4ºB', purposeDefined: 65, total: 98 },
  ];

  const topExploredCareers = [
    { career: 'Ingeniería de Sistemas', students: 85, percentage: 35 },
    { career: 'Medicina', students: 70, percentage: 29 },
    { career: 'Administración', students: 45, percentage: 19 },
    { career: 'Arquitectura', students: 32, percentage: 13 },
    { career: 'Diseño Gráfico', students: 18, percentage: 7 },
  ];

  const gradeReports = [
    {
      grade: '5ºA',
      total: 120,
      completed: 95,
      areas: [
        { name: 'Ingeniería', percentage: 40 },
        { name: 'Salud', percentage: 35 },
        { name: 'Artes', percentage: 25 },
      ],
    },
    {
      grade: '4ºB',
      total: 98,
      completed: 82,
      areas: [
        { name: 'Ingeniería', percentage: 50 },
        { name: 'Salud', percentage: 30 },
        { name: 'Artes', percentage: 20 },
      ],
    },
    {
      grade: '5ºB',
      total: 115,
      completed: 88,
      areas: [
        { name: 'Salud', percentage: 45 },
        { name: 'Ciencias Sociales', percentage: 30 },
        { name: 'Ingeniería', percentage: 25 },
      ],
    },
    {
      grade: '4ºA',
      total: 105,
      completed: 78,
      areas: [
        { name: 'Artes', percentage: 42 },
        { name: 'Ciencias Sociales', percentage: 35 },
        { name: 'Ingeniería', percentage: 23 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Reportes y Analítica</h1>
          <p className="text-gray-600">Comparativos por grado y análisis de tendencias</p>
        </div>
        <Button className="bg-[#10B981] hover:bg-[#059669]">
          <Download className="h-4 w-4 mr-2" />
          Descargar Consolidado
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md border-l-4 border-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Estudiantes</p>
                <p className="text-3xl font-bold text-[#134E4A]">248</p>
              </div>
              <BarChart3 className="h-12 w-12 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasa Promedio</p>
                <p className="text-3xl font-bold text-[#134E4A]">75%</p>
              </div>
              <PieChart className="h-12 w-12 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tendencia</p>
                <p className="text-3xl font-bold text-[#134E4A]">+12%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grade Reports */}
      <div className="space-y-6">
        {gradeReports.map((report, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-[#134E4A]">{report.grade}</CardTitle>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">
                    Total: <span className="font-bold text-[#134E4A]">{report.total}</span>
                  </span>
                  <span className="text-gray-600">
                    Completados: <span className="font-bold text-green-600">{report.completed}</span>
                  </span>
                  <span className="text-gray-600">
                    Tasa: <span className="font-bold text-purple-600">
                      {Math.round((report.completed / report.total) * 100)}%
                    </span>
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Distribución por Áreas de Interés:</h4>
              <div className="space-y-4">
                {report.areas.map((area, areaIndex) => (
                  <div key={areaIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{area.name}</span>
                      <span className="text-sm font-bold text-[#134E4A]">{area.percentage}%</span>
                    </div>
                    <Progress value={area.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranking - Purpose Defined */}
      <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            Ranking: Grados con Mayor Propósito Definido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Porcentaje de estudiantes que han completado el test y tienen un propósito vocacional claro:
          </p>
          <div className="space-y-3">
            {purposeRanking.map((item, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border-2 border-yellow-300 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[#134E4A]">{item.grade}</p>
                    <p className="text-sm text-gray-600">{item.purposeDefined} de {item.total} estudiantes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#10B981]">{item.purposeDefined}%</p>
                  <p className="text-xs text-gray-600">propósito definido</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Explored Careers */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Carreras Más Exploradas en la Promoción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Ranking de carreras más consultadas y exploradas por los estudiantes:
          </p>
          <div className="space-y-4">
            {topExploredCareers.map((career, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={
                      index === 0 ? 'bg-blue-600' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-blue-400' :
                      'bg-blue-300'
                    }>
                      #{index + 1}
                    </Badge>
                    <span className="font-medium text-gray-900">{career.career}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#134E4A]">{career.students}</span>
                    <span className="text-sm text-gray-600 ml-1">estudiantes</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={career.percentage} className="flex-1 h-3" />
                  <span className="text-sm font-bold text-[#134E4A] w-12">{career.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
            <p className="text-sm text-gray-900">
              💡 <strong>Insight:</strong> Las carreras STEM (Ingeniería + Medicina) representan el 64% 
              de las exploraciones, sugiriendo fuerte inclinación técnica-científica en esta promoción.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-[#134E4A] mb-4">📊 Análisis General por Grado</h3>
          <div className="space-y-3 text-gray-700">
            <div className="p-3 bg-white rounded-lg">
              <p><strong className="text-blue-600">5ºA:</strong> Fuerte inclinación hacia Ingeniería (40%), seguido de Salud (35%) y Artes (25%)</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p><strong className="text-blue-600">4ºB:</strong> Marcada preferencia por Ingeniería (50%), con Salud (30%) y Artes (20%)</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p><strong className="text-purple-600">5ºB:</strong> Mayor interés en Salud (45%), con diversificación en Ciencias Sociales (30%)</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p><strong className="text-purple-600">4ºA:</strong> Equilibrio entre Artes (42%) y Ciencias Sociales (35%)</p>
            </div>
            <p className="mt-4 pt-4 border-t-2 border-green-300 font-medium">
              <strong>💡 Recomendación:</strong> Considerar talleres especializados en Ingeniería para 5ºA y 4ºB, 
              programas de orientación en Salud para 5ºB, y actividades artísticas para 4ºA. 
              Implementar sesiones de orientación vocacional personalizadas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
