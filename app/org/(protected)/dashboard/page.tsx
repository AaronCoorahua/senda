"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle2, TrendingUp, AlertCircle, AlertTriangle, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type AtRiskStudent = {
  userId: string;
  name: string;
  grade: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
};

type GradeKey = '1ro' | '2do' | '3ro' | '4to' | '5to';

type GradeCounts = Record<GradeKey, number>;

const SECONDARY_GRADES: Array<{ key: GradeKey; label: string }> = [
  { key: '1ro', label: '1er Secundaria' },
  { key: '2do', label: '2do Secundaria' },
  { key: '3ro', label: '3er Secundaria' },
  { key: '4to', label: '4to Secundaria' },
  { key: '5to', label: '5to Secundaria' },
];

const DEFAULT_AT_RISK_STUDENTS: AtRiskStudent[] = [
  { name: 'María Torres', grade: '4ºB', issue: 'Sin propósito definido', severity: 'high', userId: 'mock-1' },
  { name: 'Carlos Mendoza', grade: '5ºA', issue: 'Baja coherencia intereses-habilidades', severity: 'medium', userId: 'mock-2' },
  { name: 'Ana Ruiz', grade: '4ºA', issue: 'Sin propósito definido', severity: 'high', userId: 'mock-3' },
  { name: 'Pedro Sánchez', grade: '5ºB', issue: 'Test incompleto hace 3 semanas', severity: 'medium', userId: 'mock-4' },
];

const DEFAULT_GRADE_ALERTS = [
  { grade: '5ºA', pending: 12 },
  { grade: '4ºB', pending: 7 },
  { grade: '5ºB', pending: 9 },
  { grade: '4ºA', pending: 5 },
];

const EMPTY_GRADE_COUNTS = (): GradeCounts => ({
  '1ro': 0,
  '2do': 0,
  '3ro': 0,
  '4to': 0,
  '5to': 0,
});

const normalizeGradeLabel = (grade?: string | null): GradeKey | null => {
  if (!grade) return null;
  const normalized = grade
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]/g, '');

  if (normalized.startsWith('1') || normalized.includes('1ro') || normalized.includes('primer')) return '1ro';
  if (normalized.startsWith('2') || normalized.includes('2do')) return '2do';
  if (normalized.startsWith('3') || normalized.includes('3ro')) return '3ro';
  if (normalized.startsWith('4') || normalized.includes('4to')) return '4to';
  if (normalized.startsWith('5') || normalized.includes('5to')) return '5to';

  return null;
};

const DEFAULT_GRADE_COUNTS: GradeCounts = (() => {
  const counts = EMPTY_GRADE_COUNTS();
  DEFAULT_GRADE_ALERTS.forEach((alert) => {
    const gradeKey = normalizeGradeLabel(alert.grade);
    if (gradeKey) {
      counts[gradeKey] += alert.pending;
    }
  });
  return counts;
})();

const formatRelativeTime = (dateString?: string | null) => {
  if (!dateString) return 'recientemente';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return 'hoy';
  if (diffDays === 1) return 'ayer';
  if (diffDays < 7) return `hace ${diffDays} días`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `hace ${diffWeeks} semana${diffWeeks > 1 ? 's' : ''}`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  return `hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
};

const getSeverityFromDate = (dateString?: string | null): AtRiskStudent['severity'] => {
  if (!dateString) return 'medium';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 21) return 'high';
  if (diffDays >= 7) return 'medium';
  return 'low';
};

const buildIssueDescription = (dateString?: string | null) => {
  return `Test en progreso ${formatRelativeTime(dateString)}`;
};

export default function OrgDashboard() {
  const { toast } = useToast();
  const [colegioNombre, setColegioNombre] = useState<string>('Colegio Test');
  const [colegioId, setColegioId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [realStats, setRealStats] = useState({
    totalStudents: 0,
    completedTests: 0,
    pendingStudents: 0,
  });
  const [atRiskStudents, setAtRiskStudents] = useState<AtRiskStudent[]>([]);
  const [gradeAlerts, setGradeAlerts] = useState<GradeCounts>(() => EMPTY_GRADE_COUNTS());
  const [recentActivity, setRecentActivity] = useState<Array<{
    nombre: string;
    action: string;
    time: string;
    status: string;
  }>>([]);

  useEffect(() => {
    loadColegioData();
  }, []);

  const loadColegioData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Obtener datos del usuario (colegio admin tiene colegio_id y nombre del colegio)
      const { data: usuarioData } = await supabase
        .from('usuarios')
        .select('nombre, colegio_id, tipo_usuario')
        .eq('id', user.id)
        .single();

      console.log('Usuario data:', usuarioData); // Debug

      if (usuarioData) {
        // Si es usuario de colegio, el nombre viene de la tabla colegios
        if (usuarioData.tipo_usuario === 'colegio' && usuarioData.colegio_id) {
          console.log('Es usuario de colegio con colegio_id:', usuarioData.colegio_id);
          
          const { data: colegioData } = await supabase
            .from('colegios')
            .select('nombre')
            .eq('id', usuarioData.colegio_id)
            .single();
          
          console.log('Datos del colegio:', colegioData);
          
          if (colegioData?.nombre) {
            setColegioNombre(colegioData.nombre);
          }
        } else if (usuarioData.nombre) {
          setColegioNombre(usuarioData.nombre);
        }
        
        setColegioId(usuarioData.colegio_id);
        console.log('colegio_id guardado en state:', usuarioData.colegio_id);
        
        // Cargar estadísticas reales si tiene colegio_id
        if (usuarioData.colegio_id) {
          await loadRealStats(usuarioData.colegio_id);
        }
      }
    } catch (error) {
      console.error('Error cargando datos del colegio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRealStats = async (colegioId: string) => {
    try {
      console.log('=== INICIANDO loadRealStats ===');
      console.log('Buscando estudiantes para colegio_id:', colegioId);

      const { data: estudiantesData, error: estudiantesError } = await supabase
        .from('usuarios')
        .select('id, nombre, colegio_id, tipo_usuario, grado')
        .eq('colegio_id', colegioId)
        .neq('tipo_usuario', 'colegio');

      if (estudiantesError) {
        console.error('Error obteniendo estudiantes:', estudiantesError);
        return;
      }

      const estudiantes = estudiantesData || [];
      const estudiantesIds = estudiantes.map(e => e.id);
      const totalStudents = estudiantes.length;

      if (estudiantesIds.length === 0) {
        setRealStats({ totalStudents: 0, completedTests: 0, pendingStudents: 0 });
        setAtRiskStudents([]);
        setGradeAlerts(EMPTY_GRADE_COUNTS());
        setRecentActivity([]);
        return;
      }

      const { data: runsData, error: runsError } = await supabase
        .from('test_runs')
        .select('id, user_id, status, started_at, completed_at')
        .in('user_id', estudiantesIds);

      if (runsError) {
        console.error('Error obteniendo test_runs:', runsError);
        return;
      }

      const runs = runsData || [];

      const completedTests = runs.filter(run => run.status === 'completed').length;
      const pendingTests = runs.filter(run => run.status === 'in_progress').length;

      type StatusSnapshot = {
        hasActive: boolean;
        hasCompleted: boolean;
        latestActiveStart: string | null;
      };

      const statusByStudent = new Map<string, StatusSnapshot>();

      runs.forEach((run) => {
        if (!run.user_id) {
          return;
        }
        const snapshot = statusByStudent.get(run.user_id) || {
          hasActive: false,
          hasCompleted: false,
          latestActiveStart: null,
        };

        if (run.status === 'in_progress') {
          snapshot.hasActive = true;
          const candidateDate = run.started_at || run.completed_at || null;
          if (candidateDate) {
            if (!snapshot.latestActiveStart || new Date(candidateDate) > new Date(snapshot.latestActiveStart)) {
              snapshot.latestActiveStart = candidateDate;
            }
          }
        }

        if (run.status === 'completed') {
          snapshot.hasCompleted = true;
        }

        statusByStudent.set(run.user_id, snapshot);
      });

      const dynamicAtRisk = estudiantes
        .filter(student => statusByStudent.get(student.id)?.hasActive)
        .map(student => {
          const status = statusByStudent.get(student.id);
          return {
            userId: student.id,
            name: student.nombre || 'Estudiante sin nombre',
            grade: student.grado || 'Sin grado',
            issue: buildIssueDescription(status?.latestActiveStart),
            severity: getSeverityFromDate(status?.latestActiveStart),
          } as AtRiskStudent;
        });

      const activeGradeCounts = EMPTY_GRADE_COUNTS();

      estudiantes.forEach(student => {
        const status = statusByStudent.get(student.id);
        const hasActive = status?.hasActive ?? false;
        if (hasActive) {
          const gradeKey = normalizeGradeLabel(student.grado);
          if (gradeKey) {
            activeGradeCounts[gradeKey] = (activeGradeCounts[gradeKey] || 0) + 1;
          }
        }
      });

      setAtRiskStudents(dynamicAtRisk);
      setGradeAlerts(activeGradeCounts);

      await loadRecentActivity(runs, estudiantes);

      setRealStats({
        totalStudents,
        completedTests,
        pendingStudents: pendingTests,
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const loadRecentActivity = async (
    runsData: Array<{ id: string; status: string; started_at: string | null; completed_at: string | null; user_id: string }>,
    estudiantesData: Array<{ id: string; nombre: string | null }>
  ) => {
    try {
      if (!runsData || runsData.length === 0) {
        setRecentActivity([]);
        return;
      }

      const usersMap = new Map(estudiantesData.map(est => [est.id, est.nombre || 'Estudiante']));

      const sortedRuns = [...runsData].sort((a, b) => {
        const dateA = new Date(a.started_at || a.completed_at || 0).getTime();
        const dateB = new Date(b.started_at || b.completed_at || 0).getTime();
        return dateB - dateA;
      });

      const latestRuns = sortedRuns.slice(0, 5);

      const activity = latestRuns.map((run) => {
        const action = run.status === 'completed' 
          ? 'completó el test' 
          : 'tiene un test en progreso';

        const time = formatRelativeTime(run.completed_at || run.started_at);

        return {
          nombre: usersMap.get(run.user_id) || 'Estudiante',
          action,
          time,
          status: run.status,
        };
      });

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error cargando actividad reciente:', error);
    }
  };

  const handleAssignTutoria = (studentName: string) => {
    toast({
      title: 'Tutoría asignada',
      description: `Se asignó un profesor a ${studentName} y se envió la notificación a padres y docentes.`,
    });
  };

  // Determinar el logo basado en el nombre
  const getLogo = () => {
    if (colegioNombre.toLowerCase().includes('san agustín') || 
        colegioNombre.toLowerCase().includes('san agustin')) {
      return '/logo_sanagustin.png';
    }
    if (colegioNombre.toLowerCase().includes('saco oliveros')) {
      return '/logo_sacooliveros.png';
    }
    return null;
  };

  const logo = getLogo();

  // Combinar datos mock con datos reales de la base de datos
  const totalStudentsCount = 482 + realStats.totalStudents;
  const completedTestsCount = 324 + realStats.completedTests;
  const pendingTestsCount = 158 + realStats.pendingStudents; // Mock pendientes + reales
  
  // Calcular tasa de completado real basada en tests (no en estudiantes)
  const totalTests = completedTestsCount + pendingTestsCount;
  const completionRateReal = totalTests > 0 
    ? Math.round((completedTestsCount / totalTests) * 100) 
    : 0;

  const atRiskDisplay: AtRiskStudent[] = (() => {
    const combined = [...atRiskStudents];
    DEFAULT_AT_RISK_STUDENTS.forEach(student => {
      if (!combined.some(existing => existing.name === student.name)) {
        combined.push(student);
      }
    });
    return combined.slice(0, 4);
  })();

  const gradeCards = SECONDARY_GRADES.map(({ key, label }) => ({
    key,
    label,
    pending: DEFAULT_GRADE_COUNTS[key] + (gradeAlerts[key] || 0),
  }));

  const stats = {
    totalStudents: totalStudentsCount,
    completedTests: completedTestsCount,
    completionRate: completionRateReal, // Calculado en base a tests completados vs pendientes
    pendingStudents: pendingTestsCount,
    topCareers: [
      { name: 'Ingeniería', percentage: 40, color: 'bg-blue-500' },
      { name: 'Salud', percentage: 35, color: 'bg-green-500' },
      { name: 'Artes', percentage: 25, color: 'bg-purple-500' },
    ],
    // Combinar actividad mock con actividad real
    recentActivity: [
      ...recentActivity,
      ...(recentActivity.length < 3 ? [
        { nombre: 'María García', action: 'completó el test', time: 'Hace 2 horas', status: 'completed' },
        { nombre: 'Juan Pérez', action: 'completó el test', time: 'Hace 5 horas', status: 'completed' },
        { nombre: 'Ana López', action: 'completó el test', time: 'Ayer', status: 'completed' },
      ] : [])
    ].slice(0, 5), // Máximo 5 items
    atRiskStudents: atRiskDisplay,
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
      {/* Header con logo y nombre del colegio */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {logo && (
            <div className="w-16 h-16 relative">
              <Image
                src={logo}
                alt={colegioNombre}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-[#134E4A]">
              {isLoading ? 'Cargando...' : colegioNombre}
            </h1>
            <p className="text-gray-600">Vista general del progreso vocacional de tus estudiantes</p>
          </div>
        </div>
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
                    {activity.nombre.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.nombre} <span className="text-gray-600">{activity.action}</span>
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
                  onClick={() => handleAssignTutoria(student.name)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gradeCards.map(({ key, label, pending }) => (
              <div key={key} className="bg-white p-4 rounded-lg border-2 border-orange-300 hover:shadow-md transition-shadow">
                <p className="font-bold text-lg text-[#134E4A] mb-1">{label}</p>
                <p className="text-2xl font-bold text-orange-600">{pending}</p>
                <p className="text-sm text-gray-600">pendientes</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
