"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, TrendingUp, Building, GraduationCap, X, CheckCircle, Heart, Briefcase, BookOpen, Users, Award, AlertCircle, LineChart, Lightbulb, Compass, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { carrerasData } from '@/data/carreras-data';
import { updateJourneyProgress } from '@/lib/senda-db';
import { supabase } from '@/integrations/supabase/client';

function CarrerasPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAllCareers, setShowAllCareers] = useState(false);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedCareerDetail, setSelectedCareerDetail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('vista-general');
  
  const profileId = searchParams.get('profile');
  
  // Migrar IDs de perfil antiguos a nuevos
  const migratedProfileId = profileId ? (
    profileId === 'explorador' ? 'explorador-creativo' :
    profileId === 'innovador-tecnologico' ? 'analista-estratégico' :
    profileId === 'creador-visual' ? 'explorador-creativo' :
    profileId === 'estratega-empresarial' ? 'líder-emprendedor' :
    profileId === 'cuidador-profesional' ? 'guía-humanista' :
    profileId === 'comunicador-estrategico' ? 'comunicador-influyente' :
    profileId
  ) : null;

  // Filtrar carreras por perfil
  const recommendedCareers = migratedProfileId 
    ? carrerasData.filter(c => c.perfiles.includes(migratedProfileId))
    : carrerasData;

  // Filtrar por búsqueda y categoría
  const filteredCareers = recommendedCareers.filter(carrera => {
    const matchesSearch = carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || carrera.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedCareers = showAllCareers ? filteredCareers : filteredCareers.slice(0, 6);
  
  const categories = ['Todos', 'Salud', 'Tecnología', 'Ingeniería', 'Ciencias Sociales', 'Negocios y Economía', 'Arquitectura y Diseño'];

  const categoryIcons: { [key: string]: string } = {
    'Todos': '✨',
    'Salud': '⚕️',
    'Tecnología': '💻',
    'Ingeniería': '⚙️',
    'Ciencias Sociales': '📚',
    'Negocios y Economía': '💼',
    'Arquitectura y Diseño': '🖌️'
  };

  const categoryColors: { [key: string]: { bg: string, text: string, border: string } } = {
    'Todos': { bg: 'bg-gradient-to-r from-yellow-500 to-orange-500', text: 'text-white', border: 'border-orange-500' },
    'Salud': { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white', border: 'border-cyan-500' },
    'Tecnología': { bg: 'bg-gradient-to-r from-purple-500 to-indigo-500', text: 'text-white', border: 'border-indigo-500' },
    'Ingeniería': { bg: 'bg-gradient-to-r from-gray-600 to-gray-700', text: 'text-white', border: 'border-gray-700' },
    'Ciencias Sociales': { bg: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-white', border: 'border-emerald-500' },
    'Negocios y Economía': { bg: 'bg-gradient-to-r from-red-500 to-pink-500', text: 'text-white', border: 'border-pink-500' },
    'Arquitectura y Diseño': { bg: 'bg-gradient-to-r from-pink-500 to-rose-500', text: 'text-white', border: 'border-rose-500' }
  };

  const toggleCareerSelection = (careerId: string) => {
    setSelectedCareers(prev => 
      prev.includes(careerId) 
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId]
    );
  };

  const handleCompare = () => {
    if (selectedCareers.length >= 2) {
      setShowComparison(true);
    }
  };

  const selectedCareersData = carrerasData.filter(c => selectedCareers.includes(c.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-senda-cream via-white to-blue-50">
      {/* Header Sticky */}
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
                <p className="text-xs text-gray-600">Explora Carreras</p>
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
              <Button
                variant="outline"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}
                className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          
          {/* Hero Section con gradiente igual al segundo ejemplo */}
          <div className="bg-gradient-to-br from-[#1a4d5e] via-[#2d7a8f] via-[#4a90a4] to-[#6FA8DC] rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🚀</span>
                  <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white">
                    Explora tu futuro
                  </h1>
                </div>
                <p className="text-xl text-white/90 mb-6">
                  {migratedProfileId 
                    ? `Descubre las ${filteredCareers.length} carreras más demandadas en Perú`
                    : 'Primero completa el test vocacional para recibir recomendaciones personalizadas'}
                </p>
              </div>
            </div>

            {/* Stats con el mismo diseño del segundo ejemplo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-lg text-white/80 mb-1">📈</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{migratedProfileId ? filteredCareers.length : carrerasData.length}</div>
                <div className="text-sm text-white/90">{migratedProfileId ? 'Carreras' : 'Carreras'}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-lg text-white/80 mb-1">👥</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-white/90">Universidades</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-lg text-white/80 mb-1">💼</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-white/90">Empleabilidad</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-lg text-white/80 mb-1">⏱️</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">5</div>
                <div className="text-sm text-white/90">Años</div>
              </div>
            </div>

            {/* Progreso de exploración - actualizado */}
            {migratedProfileId && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/90 text-sm font-medium">Tu progreso de exploración</p>
                  <p className="text-white text-sm">2 de 4 pasos completados</p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-6">
                  <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                </div>
                
                {/* Steps - Primeros dos pasos completados */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex items-center gap-3 bg-white/30 rounded-xl p-3 border-2 border-white">
                    <div className="w-8 h-8 rounded-full bg-white text-[#2d7a8f] flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Haz el test</div>
                      <div className="text-white/90 text-xs">Conoce tus fortalezas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white/30 rounded-xl p-3 border-2 border-white">
                    <div className="w-8 h-8 rounded-full bg-white text-[#2d7a8f] flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Explora carreras</div>
                      <div className="text-white/90 text-xs">Descubre opciones</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-white/70 font-semibold text-sm">Completa el mini reto</div>
                      <div className="text-white/60 text-xs">Desafío práctico</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <div className="text-white/70 font-semibold text-sm">Conecta</div>
                      <div className="text-white/60 text-xs">Habla con profesionales</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA si no hay perfil */}
            {!migratedProfileId && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => router.push('/test-vocacional')}
                  className="bg-white text-[#2D5F8D] hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                >
                  🚀 Haz el test primero
                </Button>
                <p className="text-white/80 text-sm mt-3">Descubre tu perfil en solo 10 minutos</p>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters - solo si tiene perfil */}
        {migratedProfileId && (
          <>
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="🔍 Busca una carrera..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-senda-primary"
                />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-semibold text-gray-700 mr-2">📂 Filtra por categoría:</span>
                  {categories.map((cat) => {
                    const colors = categoryColors[cat];
                    const isSelected = selectedCategory === cat;
                    return (
                      <Button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full border-2 transition-all ${
                          isSelected 
                            ? `${colors.bg} ${colors.text} shadow-lg scale-105` 
                            : `bg-white text-gray-700 ${colors.border} hover:${colors.bg} hover:${colors.text}`
                        }`}
                      >
                        {categoryIcons[cat]} {cat}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Explorador de carreras - indicador de resultados */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 flex-1">
                    🎯 <span className="font-bold text-senda-primary text-lg">{filteredCareers.length} carreras recomendadas</span> para tu perfil vocacional
                  </p>
                  <Button
                    onClick={async () => {
                      try {
                        await updateJourneyProgress('carreras', 'completed', {
                          viewed_careers: selectedCareers
                        });
                        console.log('✅ Fase de carreras completada');
                      } catch (error) {
                        console.error('Error actualizando progreso:', error);
                      }
                      router.push('/mini-reto?profile=' + migratedProfileId);
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all animate-pulse"
                  >
                    🎯 Ir a Mini Reto
                  </Button>
                </div>
              </div>
            </div>

            {/* Careers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedCareers.map((carrera) => {
                const isSelected = selectedCareers.includes(carrera.id);
                return (
                  <Card 
                    key={carrera.id} 
                    className={`relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${
                      isSelected ? 'ring-4 ring-senda-primary shadow-2xl' : 'border-2 border-transparent hover:border-senda-primary'
                    }`}
                  >
                    {/* Checkbox de selección - posicionado correctamente */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCareerSelection(carrera.id)}
                        className="w-5 h-5 rounded cursor-pointer accent-senda-primary"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <CardHeader className="pb-4 pt-12">
                      <div className="flex items-start justify-between mb-3">
                        <div className="bg-gradient-to-br from-senda-primary to-senda-secondary p-3 rounded-2xl">
                          <span className="text-4xl">{carrera.icono}</span>
                        </div>
                        {carrera.perfiles.includes(migratedProfileId) && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md">
                            ✨ Recomendada
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold text-senda-primary mb-2">{carrera.nombre}</CardTitle>
                      <Badge 
                        className={`w-fit border-0 text-white ${categoryColors[carrera.categoria]?.bg || 'bg-gray-500'}`}
                      >
                        {carrera.categoria}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-senda-primary">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          "{carrera.descripcion}"
                        </p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                          <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-bold text-gray-800 text-xs mb-1">💰 Salario Promedio</div>
                            <div className="text-green-700 font-semibold">{carrera.salarioPromedio}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                          <Building className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-bold text-gray-800 text-xs mb-1">🏢 Campo Laboral</div>
                            <div className="text-blue-700 text-xs leading-relaxed">{carrera.campoLaboral.substring(0, 80)}...</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                          <GraduationCap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-bold text-gray-800 text-xs mb-2">🎓 Universidades Top</div>
                            <div className="flex flex-wrap gap-1">
                              {carrera.universidades.slice(0, 2).map((uni, i) => (
                                <Badge key={i} className="bg-purple-100 text-purple-700 text-xs border-0 hover:bg-purple-200">
                                  {uni}
                                </Badge>
                              ))}
                              {carrera.universidades.length > 2 && (
                                <Badge className="bg-purple-200 text-purple-800 text-xs border-0">
                                  +{carrera.universidades.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={() => setSelectedCareerDetail(carrera.id)}
                        className="w-full bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white font-bold py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                      >
                        🔎 Explorar carrera
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Botón de comparación flotante */}
            {selectedCareers.length >= 2 && (
              <div className="fixed bottom-8 right-8 z-50">
                <Button
                  onClick={handleCompare}
                  className="bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white font-bold px-8 py-6 rounded-full shadow-2xl text-lg animate-pulse"
                >
                  ⚖️ Comparar {selectedCareers.length} carreras
                </Button>
              </div>
            )}

            {/* Show More Button */}
            {filteredCareers.length > 6 && !showAllCareers && (
              <div className="text-center">
                <Button
                  onClick={() => setShowAllCareers(true)}
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-2xl border-2 border-senda-primary text-senda-primary hover:bg-senda-primary hover:text-white font-bold shadow-lg"
                >
                  🔽 Ver todas las {filteredCareers.length} carreras recomendadas
                </Button>
              </div>
            )}
          </>
        )}

        {/* Modal de Comparación */}
        {showComparison && selectedCareersData.length >= 2 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              {/* Header del modal */}
              <div className="sticky top-0 bg-gradient-to-r from-senda-primary to-senda-secondary p-6 text-white flex items-center justify-between rounded-t-3xl">
                <div>
                  <h2 className="text-3xl font-bold mb-2">⚖️ Comparación de Carreras</h2>
                  <p className="text-white/90">Compara las características de estas carreras lado a lado</p>
                </div>
                <Button
                  onClick={() => setShowComparison(false)}
                  variant="ghost"
                  className="text-white hover:bg-white/20 rounded-full p-2"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Contenido de comparación */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {selectedCareersData.slice(0, 2).map((carrera, index) => (
                    <div key={carrera.id} className="space-y-4">
                      {/* Header de la carrera */}
                      <div className={`bg-gradient-to-br from-senda-primary to-senda-secondary rounded-2xl p-6 text-white`}>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="bg-white/20 p-3 rounded-xl">
                            <span className="text-4xl">{carrera.icono}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{carrera.nombre}</h3>
                            <Badge className="bg-white/20 text-white mt-2">{carrera.categoria}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Descripción */}
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          🎯 ¿Qué harás en esta carrera?
                        </h4>
                        <p className="text-gray-700 text-sm">{carrera.descripcion}</p>
                      </div>

                      {/* Salario */}
                      <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          Salario Promedio
                        </h4>
                        <p className="text-green-700 font-semibold text-lg">{carrera.salarioPromedio}</p>
                      </div>

                      {/* Campo Laboral */}
                      <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Building className="w-5 h-5 text-blue-600" />
                          Campo Laboral
                        </h4>
                        <p className="text-blue-700 text-sm">{carrera.campoLaboral}</p>
                      </div>

                      {/* Universidades */}
                      <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-purple-600" />
                          Universidades Disponibles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {carrera.universidades.map((uni, i) => (
                            <Badge key={i} className="bg-purple-100 text-purple-700 border-0">
                              {uni}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4 mt-6 justify-center">
                  <Button
                    onClick={() => setShowComparison(false)}
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-2xl"
                  >
                    Cerrar comparación
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedCareers([]);
                      setShowComparison(false);
                    }}
                    className="bg-gradient-to-r from-senda-primary to-senda-secondary text-white px-8 py-6 text-lg rounded-2xl"
                  >
                    Limpiar selección
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalle de Carrera */}
        {selectedCareerDetail && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
              {(() => {
                const carrera = carrerasData.find(c => c.id === selectedCareerDetail);
                if (!carrera) return null;
                
                return (
                  <>
                    {/* Header del modal con gradiente - FIJO */}
                    <div className="bg-gradient-to-br from-senda-primary to-senda-secondary p-8 text-white flex-shrink-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <span className="text-5xl">{carrera.icono}</span>
                          </div>
                          <div>
                            <h2 className="text-4xl font-bold mb-2">{carrera.nombre}</h2>
                            <div className="flex gap-2 items-center">
                              <Badge className="bg-white/30 text-white text-sm px-3 py-1">
                                {carrera.categoria}
                              </Badge>
                              <Badge className="bg-green-500 text-white text-sm px-3 py-1">
                                ✨ Alta demanda
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedCareerDetail(null);
                            setActiveTab('vista-general');
                          }}
                          variant="ghost"
                          className="text-white hover:bg-white/20 rounded-full p-2"
                        >
                          <X className="w-6 h-6" />
                        </Button>
                      </div>
                      
                      {/* Stats Cards */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-sm text-white/80">Salario Promedio</span>
                          </div>
                          <div className="text-2xl font-bold">{carrera.salarioPromedio}</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                          <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className="w-5 h-5" />
                            <span className="text-sm text-white/80">Universidades</span>
                          </div>
                          <div className="text-2xl font-bold">{carrera.universidades.length} disponibles</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm text-white/80">Progreso de lectura</span>
                          </div>
                          <div className="text-2xl font-bold">100%</div>
                        </div>
                      </div>
                    </div>

                    {/* Tabs Navigation - FIJO, NO STICKY */}
                    <div className="bg-white border-b-2 border-gray-300 px-8 overflow-x-auto shadow-md flex-shrink-0">
                      <div className="flex gap-1 min-w-max">
                        {[
                          { id: 'vista-general', label: 'Vista General', icon: '🏠' },
                          { id: 'estilo-vida', label: 'Estilo de Vida', icon: '🌟' },
                          { id: 'formacion', label: 'Formación', icon: '🎓' },
                          { id: 'proyeccion', label: 'Proyección', icon: '📊' }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-4 font-semibold transition-all ${
                              activeTab === tab.id
                                ? 'text-senda-primary border-b-4 border-senda-primary bg-white'
                                : 'text-gray-600 hover:text-senda-primary hover:bg-gray-50'
                            }`}
                          >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contenido scrolleable SOLO AQUÍ */}
                    <div className="flex-1 overflow-y-auto bg-white">
                      {/* Tab: Vista General */}
                      {activeTab === 'vista-general' && (
                        <div className="space-y-6 p-8 pt-6">
                          {/* ¿Qué harás? */}
                          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                              <Briefcase className="w-6 h-6 text-blue-600" />
                              🎯 ¿Qué harás en esta carrera?
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{carrera.descripcion}</p>
                          </div>

                          {/* Tu impacto */}
                          <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                              <Heart className="w-6 h-6 text-green-600" />
                              💚 Campo Laboral
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {carrera.campoLaboral}
                            </p>
                          </div>

                          {/* Información Adicional */}
                          <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <TrendingUp className="w-6 h-6 text-purple-600" />
                              💰 Rango Salarial
                            </h3>
                            <div className="bg-white p-4 rounded-xl">
                              <p className="text-3xl font-bold text-purple-600 mb-2">{carrera.salarioPromedio}</p>
                              <p className="text-sm text-gray-600">Salario promedio mensual en Perú</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab: Estilo de Vida */}
                      {activeTab === 'estilo-vida' && (
                        <div className="space-y-6 p-8 pt-6">
                          {/* Estilo de vida profesional */}
                          <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Lightbulb className="w-6 h-6 text-indigo-600" />
                              ✨ Características de la carrera
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {carrera.descripcion}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="bg-white p-4 rounded-xl">
                                <div className="text-3xl mb-2">⏰</div>
                                <div className="font-semibold text-gray-800">Intensidad del trabajo</div>
                                <div className="text-sm text-gray-600 mt-1">75% - Alta demanda</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                              </div>
                              
                              <div className="bg-white p-4 rounded-xl">
                                <div className="text-3xl mb-2">🏠</div>
                                <div className="font-semibold text-gray-800">Balance vida-trabajo</div>
                                <div className="text-sm text-gray-600 mt-1">70% - Moderado</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                              </div>
                              
                              <div className="bg-white p-4 rounded-xl">
                                <div className="text-3xl mb-2">🤝</div>
                                <div className="font-semibold text-gray-800">Trabajo remoto</div>
                                <div className="text-sm text-gray-600 mt-1">60% - Limitado</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                              </div>
                              
                              <div className="bg-white p-4 rounded-xl">
                                <div className="text-3xl mb-2">👥</div>
                                <div className="font-semibold text-gray-800">Interacción social</div>
                                <div className="text-sm text-gray-600 mt-1">85% - Muy alta</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Roles y trabajos reales */}
                          <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Briefcase className="w-6 h-6 text-orange-600" />
                              💼 Campo Laboral
                            </h3>
                            <p className="text-gray-700 mb-4">
                              {carrera.campoLaboral}
                            </p>
                          </div>

                          {/* Retos comunes */}
                          <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <AlertCircle className="w-6 h-6 text-red-600" />
                              ⚠️ Puntos importantes
                            </h3>
                            <p className="text-gray-700">
                              Esta carrera requiere dedicación, actualización constante y habilidades específicas del campo de {carrera.categoria.toLowerCase()}.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Tab: Formación */}
                      {activeTab === 'formacion' && (
                        <div className="space-y-6 p-8 pt-6">
                          {/* Tu ruta de estudio */}
                          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <BookOpen className="w-6 h-6 text-blue-600" />
                              📚 Tu ruta de estudio
                            </h3>
                            <p className="text-gray-700 mb-4">
                              La carrera de {carrera.nombre} típicamente requiere entre 4 y 5 años de estudio universitario, dependiendo de la universidad y el plan curricular.
                            </p>

                            {/* Trayectoria académica */}
                            <div className="bg-white p-4 rounded-xl mb-4">
                              <h4 className="font-bold text-gray-800 mb-3">📖 Aspectos de tu formación:</h4>
                              <div className="space-y-3">
                                <div className="flex gap-3">
                                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                                    1
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-800">Formación Teórica</div>
                                    <div className="text-sm text-gray-600">📚 Fundamentos y conceptos clave de {carrera.nombre}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                                    2
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-800">Formación Práctica</div>
                                    <div className="text-sm text-gray-600">🔬 Proyectos, prácticas y laboratorios</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                                    3
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-800">Especialización</div>
                                    <div className="text-sm text-gray-600">🎯 Áreas específicas de {carrera.categoria}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Dónde estudiar */}
                          <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <GraduationCap className="w-6 h-6 text-purple-600" />
                              🎓 Dónde estudiar ({carrera.universidades.length} opciones)
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                              {carrera.universidades.map((uni, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all flex items-center gap-3">
                                  <div className="bg-purple-100 p-2 rounded-lg">
                                    <GraduationCap className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{uni}</p>
                                    <p className="text-sm text-gray-600">Universidad</p>
                                  </div>
                                  <Badge className="bg-green-100 text-green-700">Disponible</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab: Proyección */}
                      {activeTab === 'proyeccion' && (
                        <div className="space-y-6 p-8 pt-6">
                          {/* Campo laboral y salarios */}
                          <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <TrendingUp className="w-6 h-6 text-green-600" />
                              📈 Campo laboral y salarios
                            </h3>
                            <p className="text-gray-700 mb-4">
                              El rango salarial promedio para {carrera.nombre} en Perú es de <strong>{carrera.salarioPromedio}</strong> mensuales, dependiendo de la experiencia, especialización y sector.
                            </p>
                            
                            <div className="bg-white p-4 rounded-xl">
                              <h4 className="font-bold text-gray-800 mb-3">🏢 Campo Laboral:</h4>
                              <p className="text-gray-700">{carrera.campoLaboral}</p>
                            </div>
                          </div>

                          {/* Empleabilidad */}
                          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <LineChart className="w-6 h-6 text-blue-600" />
                              📊 Empleabilidad y futuro
                            </h3>
                            <p className="text-gray-700 mb-4">
                              La carrera de {carrera.nombre} ofrece oportunidades en {carrera.campoLaboral.toLowerCase()}, con una demanda que se mantiene en crecimiento en diversos sectores.
                            </p>
                            
                            <div className="bg-white p-4 rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-800">📈 Perspectiva laboral</span>
                                <Badge className="bg-green-500 text-white">Positiva</Badge>
                              </div>
                            </div>
                          </div>

                          {/* Carreras similares */}
                          <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-500">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Award className="w-6 h-6 text-yellow-600" />
                              🔄 Carreras relacionadas
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                              {carrerasData
                                .filter(c => c.categoria === carrera.categoria && c.id !== carrera.id)
                                .slice(0, 4)
                                .map((c, i) => (
                                  <div key={i} className="bg-white p-3 rounded-xl border-2 border-yellow-200">
                                    <div className="flex items-center gap-2">
                                      <span className="text-2xl">{c.icono}</span>
                                      <span className="font-semibold text-gray-800 text-sm">{c.nombre}</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                            {carrerasData.filter(c => c.categoria === carrera.categoria && c.id !== carrera.id).length === 0 && (
                              <p className="text-gray-700">Explora otras carreras de {carrera.categoria} para encontrar opciones similares.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer con botones */}
                    <div className="bg-gray-50 p-6 border-t border-gray-200 flex gap-4 justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-600">Progreso: 100%</span>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            setSelectedCareerDetail(null);
                            setActiveTab('vista-general');
                          }}
                          variant="outline"
                          className="px-6 py-3 rounded-xl"
                        >
                          Cerrar
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-senda-primary to-senda-secondary text-white px-6 py-3 rounded-xl"
                        >
                          📥 Más Información
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CarrerasPageWrapper() {
  return (
    <ProtectedRoute requiredRole="student">
      <CarrerasPage />
    </ProtectedRoute>
  );
}
