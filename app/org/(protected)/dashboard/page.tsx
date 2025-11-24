import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle2, TrendingUp, AlertCircle, AlertTriangle, Target, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function OrgDashboard() {
  // Datos de ejemplo
  const stats = {
    totalStudents: 482,
    completedTests: 324,
    completionRate: 67,
    pendingStudents: 158,
    topCareers: [
      { name: 'Ingeniería', percentage: 40, color: 'bg-blue-500' },
      { name: 'Salud', percentage: 35, color: 'bg-green-500' },
      { name: 'Artes', percentage: 25, color: 'bg-purple-500' },
    ],
    recentActivity: [
      { name: 'María García', action: 'completó el test', time: 'Hace 2 horas' },
      { name: 'Juan Pérez', action: 'completó el test', time: 'Hace 5 horas' },
      { name: 'Ana López', action: 'completó el test', time: 'Ayer' },
    ],
    alerts: [
      { grade: '5ºA', pending: 12 },
      { grade: '4ºB', pending: 7 },
      { grade: '5ºB', pending: 9 },
      { grade: '4ºA', pending: 5 },
    ],
    atRiskStudents: [
      { name: 'María Torres', grade: '4ºB', issue: 'Sin propósito definido', severity: 'high' },
      { name: 'Carlos Mendoza', grade: '5ºA', issue: 'Baja coherencia intereses-habilidades', severity: 'medium' },
      { name: 'Ana Ruiz', grade: '4ºA', issue: 'Sin propósito definido', severity: 'high' },
      { name: 'Pedro Sánchez', grade: '5ºB', issue: 'Test incompleto hace 3 semanas', severity: 'medium' },
    ],
    cohortComparison: {
      year2024: { stem: 55, arts: 25, health: 20 },
      year2025: { stem: 60, arts: 20, health: 20 },
    },
    yearTrends: [
      { area: 'STEM', percentage: 60, change: '+5%', trend: 'up' },
      { area: 'Artes', percentage: 20, change: '-5%', trend: 'down' },
      { area: 'Salud', percentage: 20, change: '0%', trend: 'stable' },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Dashboard General</h1>
        <p className="text-gray-600">Vista general del progreso vocacional de tus estudiantes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-md border-l-4 border-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estudiantes Inscritos</p>
                <p className="text-3xl font-bold text-[#134E4A]">{stats.totalStudents}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tests Completados</p>
                <p className="text-3xl font-bold text-[#134E4A]">{stats.completedTests}</p>
              </div>
              <CheckCircle2 className="h-12 w-12 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasa de Completado</p>
                <p className="text-3xl font-bold text-[#134E4A]">{stats.completionRate}%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-[#134E4A]">
                  {stats.pendingStudents}
                </p>
              </div>
              <AlertCircle className="h-12 w-12 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Careers */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-[#134E4A]">Top 3 Áreas/Carreras</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.topCareers.map((career, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{career.name}</span>
                  <span className="text-sm font-bold text-[#134E4A]">{career.percentage}%</span>
                </div>
                <Progress value={career.percentage} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-[#134E4A]">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold">
                    {activity.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.name} <span className="text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cohort Comparison */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A]">Comparativo de Promociones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Promoción 2024</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">STEM</span>
                    <span className="font-bold text-blue-600">{stats.cohortComparison.year2024.stem}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Artes</span>
                    <span className="font-bold text-purple-600">{stats.cohortComparison.year2024.arts}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Salud</span>
                    <span className="font-bold text-green-600">{stats.cohortComparison.year2024.health}%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Promoción 2025</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">STEM</span>
                    <span className="font-bold text-blue-600">{stats.cohortComparison.year2025.stem}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Artes</span>
                    <span className="font-bold text-purple-600">{stats.cohortComparison.year2025.arts}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Salud</span>
                    <span className="font-bold text-green-600">{stats.cohortComparison.year2025.health}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
              <p className="font-semibold text-[#134E4A] mb-2">📊 Tendencias 2025</p>
              <div className="space-y-2">
                {stats.yearTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{trend.area}</span>
                      <Badge className={
                        trend.trend === 'up' ? 'bg-green-500' : 
                        trend.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                      }>
                        {trend.change}
                      </Badge>
                    </div>
                    <span className="font-bold text-[#134E4A]">{trend.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* At-Risk Students Alert */}
      <Card className="bg-red-50 border-red-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-red-800 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Estudiantes en Riesgo - Requieren Atención
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Estudiantes que necesitan seguimiento prioritario por parte del equipo de orientación:
          </p>
          <div className="space-y-3">
            {stats.atRiskStudents.map((student, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 flex items-center justify-between ${
                  student.severity === 'high' 
                    ? 'bg-white border-red-300' 
                    : 'bg-white border-yellow-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    student.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.grade} • {student.issue}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-[#10B981] hover:bg-[#059669]"
                >
                  <Target className="h-4 w-4 mr-1" />
                  Asignar Tutoría
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border border-red-200">
            <p className="text-sm font-medium text-gray-900">
              💡 <strong>Recomendación:</strong> Programar sesiones individuales con estos estudiantes 
              para explorar intereses y definir objetivos vocacionales claros.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alerts by Grade */}
      <Card className="bg-orange-50 border-orange-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-orange-800 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Alertas por Grado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Grados con estudiantes que aún no han completado el test vocacional:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.alerts.map((alert, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border-2 border-orange-300 hover:shadow-md transition-shadow">
                <p className="font-bold text-lg text-[#134E4A] mb-1">{alert.grade}</p>
                <p className="text-2xl font-bold text-orange-600">{alert.pending}</p>
                <p className="text-sm text-gray-600">pendientes</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
