"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, School, Award, TrendingUp, CheckCircle, 
  Briefcase, Compass, Calendar, ArrowRight 
} from 'lucide-react';
import { getUserProfileSummary } from '@/lib/senda-db';
import ProtectedRoute from '@/components/ProtectedRoute';

function ResumenPerfilContent() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const data = await getUserProfileSummary();
      setProfileData(data);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-senda-cream via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-senda-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-senda-cream via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4">No se pudo cargar tu perfil</p>
            <Button onClick={() => router.push('/test-vocacional')}>
              Volver al Test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const journey = profileData.journey_progress;
  const completedPhases = Object.values(journey?.phases || {}).filter(
    (phase: any) => phase.status === 'completed'
  ).length;
  const totalPhases = 4;
  const progressPercentage = (completedPhases / totalPhases) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-senda-cream via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#134E4A' }}>
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-montserrat font-bold" style={{ color: '#134E4A' }}>
                  Senda
                </h1>
                <p className="text-xs text-gray-600">Resumen de tu Perfil</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="text-gray-700 hover:text-senda-primary"
              >
                🏠 Inicio
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
              {profileData.nombre?.charAt(0) || '👤'}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{profileData.nombre || 'Estudiante'}</h1>
              {profileData.colegio && (
                <p className="text-white/90 flex items-center gap-2">
                  <School className="w-4 h-4" />
                  {profileData.colegio} - {profileData.grado}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/80 text-sm mb-1">Perfil Vocacional</p>
              <p className="text-2xl font-bold">{profileData.profile_type || 'Por determinar'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/80 text-sm mb-1">Test completado</p>
              <p className="text-2xl font-bold">
                {profileData.test_completed_at 
                  ? new Date(profileData.test_completed_at).toLocaleDateString('es-ES')
                  : 'Pendiente'}
              </p>
            </div>
          </div>
        </div>

        {/* Progreso del Journey */}
        <Card className="mb-8 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Tu Progreso en Senda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {completedPhases} de {totalPhases} fases completadas
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { key: 'test', label: 'Test Vocacional', icon: '🎯' },
                { key: 'carreras', label: 'Explorar Carreras', icon: '🚀' },
                { key: 'mini_reto', label: 'Mini Reto', icon: '⚡' },
                { key: 'linkedin', label: 'LinkedIn Inteligente', icon: '💼' }
              ].map((phase) => {
                const phaseData = journey?.phases?.[phase.key];
                const isCompleted = phaseData?.status === 'completed';
                const isInProgress = phaseData?.status === 'in_progress';
                const isLocked = phaseData?.status === 'locked';

                return (
                  <div
                    key={phase.key}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-300'
                        : isInProgress
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-3xl mb-2">{phase.icon}</div>
                    <h4 className="font-semibold text-sm mb-1">{phase.label}</h4>
                    <Badge
                      className={
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isInProgress
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-400 text-white'
                      }
                    >
                      {isCompleted ? '✓ Completado' : isInProgress ? 'En progreso' : 'Bloqueado'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Fortalezas */}
        {profileData.strengths && profileData.strengths.length > 0 && (
          <Card className="mb-8 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-600" />
                Tus Fortalezas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {profileData.strengths.map((strength: string, index: number) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base"
                  >
                    ✨ {strength}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Carreras Recomendadas */}
        {profileData.recommended_careers && profileData.recommended_careers.length > 0 && (
          <Card className="mb-8 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-orange-600" />
                Carreras Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.recommended_careers.map((career: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">{career}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Acciones */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Continuar tu Journey</h3>
              <p className="text-gray-600 mb-4">
                Sigue avanzando en tu camino vocacional
              </p>
              <Button
                onClick={() => {
                  const currentPhase = journey?.current_phase || 'test';
                  const routes: Record<string, string> = {
                    test: '/test-vocacional',
                    carreras: `/carreras?profile=${profileData.score_json?.profileData?.id}`,
                    mini_reto: `/mini-reto?profile=${profileData.score_json?.profileData?.id}`,
                    linkedin: `/linkedin-inteligente?profile=${profileData.score_json?.profileData?.id}`
                  };
                  router.push(routes[currentPhase] || '/test-vocacional');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Explorar Carreras</h3>
              <p className="text-gray-600 mb-4">
                Descubre más sobre las carreras recomendadas
              </p>
              <Button
                onClick={() => router.push(`/carreras?profile=${profileData.score_json?.profileData?.id}`)}
                variant="outline"
                className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Ver Carreras
                <Briefcase className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ResumenPerfilPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <ResumenPerfilContent />
    </ProtectedRoute>
  );
}
