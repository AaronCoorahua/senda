"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Rocket, Users, CheckCircle, Sparkles, Target, Lightbulb, Award, TrendingUp, Heart, Compass, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { updateJourneyProgress } from '@/lib/senda-db';
import { supabase } from '@/integrations/supabase/client';

// Definir los mini retos por perfil
const miniRetosPorPerfil: { [key: string]: any } = {
  'explorador-creativo': {
    titulo: '🎨 Explorador Creativo',
    descripcion: 'Diseña una campaña creativa para un producto o servicio innovador',
    pasos: [
      {
        id: 1,
        titulo: '💡 Define tu concepto',
        descripcion: 'Elige un producto o servicio que quieras promocionar',
        tipo: 'input',
        placeholder: 'Ej: App de meditación para estudiantes',
        icono: '💡'
      },
      {
        id: 2,
        titulo: '🎯 Público objetivo',
        descripcion: 'Selecciona tu audiencia principal',
        tipo: 'multiple',
        opciones: ['Niños (5-12 años)', 'Adolescentes (13-17 años)', 'Jóvenes adultos (18-25 años)', 'Adultos (26-45 años)', 'Adultos mayores (46+)'],
        icono: '👥'
      },
      {
        id: 3,
        titulo: '🎨 Elementos creativos',
        descripcion: 'Selecciona hasta 4 elementos para tu campaña',
        tipo: 'checkbox',
        max: 4,
        opciones: [
          { emoji: '🎬', texto: 'Video viral' },
          { emoji: '📸', texto: 'Fotografía artística' },
          { emoji: '🎵', texto: 'Jingle o música' },
          { emoji: '🖼️', texto: 'Ilustraciones' },
          { emoji: '📱', texto: 'Filtros de redes sociales' },
          { emoji: '✍️', texto: 'Copywriting creativo' }
        ],
        icono: '🎨'
      },
      {
        id: 4,
        titulo: '💬 Mensaje clave',
        descripcion: 'Escribe el mensaje principal de tu campaña',
        tipo: 'textarea',
        placeholder: 'Ej: "Encuentra tu calma en medio del caos estudiantil"',
        icono: '💬'
      },
      {
        id: 5,
        titulo: '🌈 Nombre de campaña',
        descripcion: 'Dale un nombre creativo a tu proyecto',
        tipo: 'input',
        placeholder: 'Ej: #RespiraYAprende',
        icono: '🌈'
      }
    ]
  },
  'líder-emprendedor': {
    titulo: '🚀 Líder Emprendedor',
    descripcion: 'Desarrolla una idea de negocio escolar innovadora',
    pasos: [
      {
        id: 1,
        titulo: '💼 Tu idea de negocio',
        descripcion: 'Describe brevemente tu emprendimiento',
        tipo: 'textarea',
        placeholder: 'Ej: Plataforma que conecta estudiantes para compartir apuntes y formar grupos de estudio',
        icono: '💡'
      },
      {
        id: 2,
        titulo: '👥 Público objetivo',
        descripcion: '¿A quién está dirigido?',
        tipo: 'multiple',
        opciones: ['Primaria', 'Secundaria', 'Preuniversitarios', 'Universitarios', 'Profesionales'],
        icono: '🎯'
      },
      {
        id: 3,
        titulo: '🧩 Funcionalidades clave',
        descripcion: 'Selecciona hasta 4 características principales',
        tipo: 'checkbox',
        max: 4,
        opciones: [
          { emoji: '🎮', texto: 'Gamificación' },
          { emoji: '📹', texto: 'Video conferencias' },
          { emoji: '📝', texto: 'Evaluaciones' },
          { emoji: '⏰', texto: 'Recordatorios' },
          { emoji: '💬', texto: 'Chat en tiempo real' },
          { emoji: '📊', texto: 'Analytics y reportes' }
        ],
        icono: '⚙️'
      },
      {
        id: 4,
        titulo: '💰 Modelo de negocio',
        descripcion: '¿Cómo generarás ingresos?',
        tipo: 'multiple',
        opciones: ['Freemium', 'Suscripción mensual', 'Publicidad', 'Comisiones', 'Licencias'],
        icono: '💵'
      },
      {
        id: 5,
        titulo: '📱 Nombre del proyecto',
        descripcion: 'Dale un nombre a tu emprendimiento',
        tipo: 'input',
        placeholder: 'Ej: EduConnect, AprendeJuntos...',
        icono: '🏷️'
      }
    ]
  },
  'analista-estratégico': {
    titulo: '🧠 Analista Estratégico',
    descripcion: 'Resuelve un problema complejo con análisis y estrategia',
    pasos: [
      {
        id: 1,
        titulo: '🔍 Identifica el problema',
        descripcion: 'Describe un problema que quieras resolver',
        tipo: 'textarea',
        placeholder: 'Ej: Los estudiantes tienen dificultad para organizar su tiempo de estudio',
        icono: '❓'
      },
      {
        id: 2,
        titulo: '📊 Análisis de causas',
        descripcion: 'Selecciona las principales causas del problema',
        tipo: 'checkbox',
        max: 3,
        opciones: [
          { emoji: '📱', texto: 'Distracciones digitales' },
          { emoji: '😰', texto: 'Falta de motivación' },
          { emoji: '📚', texto: 'Sobrecarga académica' },
          { emoji: '⏰', texto: 'Mala gestión del tiempo' },
          { emoji: '🎯', texto: 'Falta de objetivos claros' },
          { emoji: '👥', texto: 'Presión social' }
        ],
        icono: '🔬'
      },
      {
        id: 3,
        titulo: '💡 Propuesta de solución',
        descripcion: 'Describe tu solución estratégica',
        tipo: 'textarea',
        placeholder: 'Ej: Sistema de bloques de tiempo con técnica Pomodoro personalizada...',
        icono: '💡'
      },
      {
        id: 4,
        titulo: '📈 Métricas de éxito',
        descripcion: '¿Cómo medirás el impacto?',
        tipo: 'checkbox',
        max: 3,
        opciones: [
          { emoji: '⭐', texto: 'Satisfacción del usuario' },
          { emoji: '📊', texto: 'Productividad medida' },
          { emoji: '🎯', texto: 'Objetivos cumplidos' },
          { emoji: '⏱️', texto: 'Tiempo ahorrado' },
          { emoji: '📈', texto: 'Mejora en calificaciones' },
          { emoji: '😊', texto: 'Reducción de estrés' }
        ],
        icono: '📊'
      },
      {
        id: 5,
        titulo: '🎯 Nombre del proyecto',
        descripcion: 'Dale un nombre a tu solución',
        tipo: 'input',
        placeholder: 'Ej: StudySmart, FocusFlow...',
        icono: '🏆'
      }
    ]
  },
  'guía-humanista': {
    titulo: '❤️ Guía Humanista',
    descripcion: 'Crea un programa de apoyo y bienestar para la comunidad',
    pasos: [
      {
        id: 1,
        titulo: '🎯 Necesidad a cubrir',
        descripcion: 'Identifica qué necesidad quieres atender',
        tipo: 'multiple',
        opciones: ['Salud mental', 'Inclusión social', 'Apoyo académico', 'Desarrollo emocional', 'Orientación vocacional'],
        icono: '💚'
      },
      {
        id: 2,
        titulo: '👥 Comunidad objetivo',
        descripcion: '¿A quiénes ayudarás?',
        tipo: 'checkbox',
        max: 3,
        opciones: [
          { emoji: '👶', texto: 'Niños' },
          { emoji: '🧒', texto: 'Adolescentes' },
          { emoji: '🎓', texto: 'Estudiantes' },
          { emoji: '👨‍👩‍👧', texto: 'Familias' },
          { emoji: '🧓', texto: 'Adultos mayores' },
          { emoji: '🌍', texto: 'Comunidad en general' }
        ],
        icono: '🤝'
      },
      {
        id: 3,
        titulo: '🌟 Actividades del programa',
        descripcion: 'Selecciona hasta 4 actividades principales',
        tipo: 'checkbox',
        max: 4,
        opciones: [
          { emoji: '🗣️', texto: 'Charlas y talleres' },
          { emoji: '👂', texto: 'Escucha activa' },
          { emoji: '🧘', texto: 'Mindfulness' },
          { emoji: '🎨', texto: 'Arte terapia' },
          { emoji: '📖', texto: 'Círculos de lectura' },
          { emoji: '💬', texto: 'Grupos de apoyo' }
        ],
        icono: '🎯'
      },
      {
        id: 4,
        titulo: '💡 Propuesta de valor',
        descripcion: 'Describe cómo ayudarás a las personas',
        tipo: 'textarea',
        placeholder: 'Ej: Crear un espacio seguro donde los jóvenes puedan expresar sus emociones...',
        icono: '✨'
      },
      {
        id: 5,
        titulo: '🏷️ Nombre del programa',
        descripcion: 'Dale un nombre inspirador',
        tipo: 'input',
        placeholder: 'Ej: Círculo de Bienestar, Juntos Crecemos...',
        icono: '🌈'
      }
    ]
  },
  'comunicador-influyente': {
    titulo: '📢 Comunicador Influyente',
    descripcion: 'Diseña una estrategia de comunicación impactante',
    pasos: [
      {
        id: 1,
        titulo: '🎯 Tu mensaje',
        descripcion: '¿Qué mensaje quieres transmitir al mundo?',
        tipo: 'textarea',
        placeholder: 'Ej: Concientizar sobre el cambio climático entre jóvenes',
        icono: '💬'
      },
      {
        id: 2,
        titulo: '📱 Canales de comunicación',
        descripcion: 'Selecciona hasta 4 plataformas',
        tipo: 'checkbox',
        max: 4,
        opciones: [
          { emoji: '📸', texto: 'Instagram' },
          { emoji: '🎵', texto: 'TikTok' },
          { emoji: '▶️', texto: 'YouTube' },
          { emoji: '💼', texto: 'LinkedIn' },
          { emoji: '🐦', texto: 'Twitter/X' },
          { emoji: '📻', texto: 'Podcast' }
        ],
        icono: '📲'
      },
      {
        id: 3,
        titulo: '🎨 Formatos de contenido',
        descripcion: 'Elige tus formatos favoritos',
        tipo: 'checkbox',
        max: 4,
        opciones: [
          { emoji: '🎬', texto: 'Videos cortos' },
          { emoji: '📝', texto: 'Artículos' },
          { emoji: '🖼️', texto: 'Infografías' },
          { emoji: '🎙️', texto: 'Entrevistas' },
          { emoji: '📊', texto: 'Datos y estadísticas' },
          { emoji: '✍️', texto: 'Historias personales' }
        ],
        icono: '🎭'
      },
      {
        id: 4,
        titulo: '🌟 Tono y estilo',
        descripcion: '¿Cómo comunicarás?',
        tipo: 'multiple',
        opciones: ['Inspiracional', 'Educativo', 'Humorístico', 'Profesional', 'Cercano y amigable'],
        icono: '🎨'
      },
      {
        id: 5,
        titulo: '🏷️ Nombre de tu marca',
        descripcion: 'Crea un nombre para tu plataforma',
        tipo: 'input',
        placeholder: 'Ej: VozVerde, CambioReal...',
        icono: '⭐'
      }
    ]
  },
  'constructor-técnico': {
    titulo: '🛠️ Constructor Técnico',
    descripcion: 'Diseña y construye una solución tecnológica',
    pasos: [
      {
        id: 1,
        titulo: '🔧 Tipo de proyecto',
        descripcion: '¿Qué vas a construir?',
        tipo: 'multiple',
        opciones: ['Aplicación móvil', 'Sitio web', 'Sistema automatizado', 'Dispositivo IoT', 'Robot o prototipo'],
        icono: '🛠️'
      },
      {
        id: 2,
        titulo: '💡 Funcionalidad principal',
        descripcion: 'Describe qué hará tu solución',
        tipo: 'textarea',
        placeholder: 'Ej: Un sistema que ayuda a reciclar identificando materiales con IA',
        icono: '⚡'
      },
      {
        id: 3,
        titulo: '🔌 Tecnologías a usar',
        descripcion: 'Selecciona hasta 4 tecnologías',
        tipo: 'checkbox',
        max: 4,
        opciones: [
          { emoji: '🤖', texto: 'Inteligencia Artificial' },
          { emoji: '📱', texto: 'Apps móviles' },
          { emoji: '☁️', texto: 'Cloud computing' },
          { emoji: '🔐', texto: 'Blockchain' },
          { emoji: '🌐', texto: 'IoT (Internet of Things)' },
          { emoji: '📊', texto: 'Big Data' }
        ],
        icono: '💻'
      },
      {
        id: 4,
        titulo: '🎯 Problema que resuelve',
        descripcion: '¿Qué problema solucionará?',
        tipo: 'textarea',
        placeholder: 'Ej: Facilitar el proceso de reciclaje en hogares y escuelas',
        icono: '🎯'
      },
      {
        id: 5,
        titulo: '🏷️ Nombre del proyecto',
        descripcion: 'Dale un nombre técnico o creativo',
        tipo: 'input',
        placeholder: 'Ej: RecycleBot, EcoScan...',
        icono: '🚀'
      }
    ]
  }
};

function MiniRetoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profileId = searchParams.get('profile') || '';
  
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [respuestas, setRespuestas] = useState<any>({});
  const [completed, setCompleted] = useState(false);

  const reto = miniRetosPorPerfil[profileId] || miniRetosPorPerfil['líder-emprendedor'];
  const currentPaso = reto.pasos[currentStep];
  const progress = ((currentStep + 1) / reto.pasos.length) * 100;

  const handleStart = () => {
    setStarted(true);
  };

  const handleNext = () => {
    if (currentStep < reto.pasos.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completado
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: any) => {
    setRespuestas({
      ...respuestas,
      [currentPaso.id]: value
    });
  };

  const canProceed = () => {
    const respuesta = respuestas[currentPaso.id];
    if (!respuesta) return false;
    
    if (currentPaso.tipo === 'checkbox' && Array.isArray(respuesta)) {
      return respuesta.length > 0;
    }
    
    return respuesta.toString().trim().length > 0;
  };

  if (!started) {
    return (
      <ProtectedRoute requiredRole="student">
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
                    <p className="text-xs text-gray-600">Mini Reto</p>
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
          
          <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <div className="max-w-4xl w-full">
            {/* Banner de progreso */}
            <div className="bg-gradient-to-br from-[#1a4d5e] via-[#2d7a8f] to-[#4a90a4] rounded-3xl p-8 mb-8 shadow-2xl">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-4 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>

              <div className="grid grid-cols-4 gap-3">
                <div className="flex items-center gap-3 bg-white/30 rounded-xl p-3 border-2 border-white">
                  <div className="w-8 h-8 rounded-full bg-white text-[#2d7a8f] flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Haz el test</div>
                    <div className="text-white/90 text-xs">Conoce tus fortalezas</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/30 rounded-xl p-3 border-2 border-white">
                  <div className="w-8 h-8 rounded-full bg-white text-[#2d7a8f] flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Explora carreras</div>
                    <div className="text-white/90 text-xs">Descubre opciones</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <div className="text-white/70 font-semibold text-sm">Mini Reto</div>
                    <div className="text-white/60 text-xs">Pon en práctica</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <div className="text-white/70 font-semibold text-sm">Conecta</div>
                    <div className="text-white/60 text-xs">Red profesional</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de inicio */}
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-all duration-300">
              <div className="mb-6 animate-bounce">
                <span className="text-8xl">{reto.titulo.split(' ')[0]}</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {reto.titulo}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {reto.descripcion}
              </p>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center gap-4 text-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{reto.pasos.length}</div>
                    <div className="text-sm">Pasos</div>
                  </div>
                  <div className="text-3xl">•</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">~10 min</div>
                    <div className="text-sm">Duración</div>
                  </div>
                  <div className="text-3xl">•</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">100</div>
                    <div className="text-sm">Puntos</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStart}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-110 transition-all"
              >
                <Rocket className="w-8 h-8 mr-3" />
                ¡Comenzar el Reto!
              </Button>
            </div>
          </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (completed) {
    return (
      <ProtectedRoute requiredRole="student">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                    <p className="text-xs text-gray-600">¡Reto Completado!</p>
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
          
          <div className="flex items-center justify-center p-4 relative overflow-hidden min-h-[calc(100vh-80px)]">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="max-w-5xl w-full relative z-10">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
              {/* Celebración */}
              <div className="text-center mb-8">
                <div className="mb-6 inline-block animate-bounce">
                  <div className="text-9xl mb-4">🎉</div>
                  <div className="flex justify-center gap-4 text-6xl">
                    <span className="animate-bounce">🎊</span>
                    <span className="animate-bounce animation-delay-1000">⭐</span>
                    <span className="animate-bounce animation-delay-2000">🏆</span>
                  </div>
                </div>
                
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                  ¡Increíble trabajo!
                </h1>
                
                <p className="text-2xl text-gray-700 mb-8 font-semibold">
                  Has completado el Mini Reto de <span className="text-purple-600">{reto.titulo}</span>
                </p>

                {/* Stats de logros */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6">
                    <Award className="w-16 h-16 text-yellow-600 mx-auto mb-2" />
                    <div className="text-5xl font-bold text-yellow-600 mb-2">+100</div>
                    <div className="text-sm font-semibold text-gray-700">Puntos XP</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6">
                    <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-2" />
                    <div className="text-5xl font-bold text-green-600 mb-2">Nivel 2</div>
                    <div className="text-sm font-semibold text-gray-700">¡Subiste!</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                    <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-2" />
                    <div className="text-5xl font-bold text-purple-600 mb-2">3/4</div>
                    <div className="text-sm font-semibold text-gray-700">Pasos completos</div>
                  </div>
                </div>

                {/* Llamada a acción LinkedIn */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-10 text-white mb-8 shadow-2xl">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-7xl animate-bounce">💼</div>
                    <h2 className="text-4xl font-bold">¡Es hora de potenciar tu perfil de LinkedIn!</h2>
                  </div>
                  
                  <p className="text-xl mb-6 text-blue-100">
                    Ahora que completaste el reto, es momento de conectar con la <span className="font-bold text-yellow-300">realidad profesional</span>
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                      <div className="text-3xl mb-2">✅</div>
                      <div className="text-sm font-semibold">Crear perfil desde cero</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                      <div className="text-3xl mb-2">📝</div>
                      <div className="text-sm font-semibold">About Me automático</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                      <div className="text-3xl mb-2">👥</div>
                      <div className="text-sm font-semibold">Conectar con exalumnos</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                      <div className="text-3xl mb-2">🎓</div>
                      <div className="text-sm font-semibold">10 profesionales peruanos</div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30 mb-6">
                    <p className="text-lg text-center font-semibold mb-2">
                      🔗 <span className="text-yellow-300">Test → Realidad profesional</span>
                    </p>
                    <p className="text-sm text-blue-100 text-center">
                      Conecta lo que descubriste sobre ti con personas reales que viven esas carreras
                    </p>
                  </div>

                  <Button
                    onClick={async () => {
                      try {
                        await updateJourneyProgress('mini_reto', 'completed', {
                          reto_completed: true
                        });
                        console.log('✅ Mini reto completado');
                      } catch (error) {
                        console.error('Error actualizando progreso:', error);
                      }
                      router.push('/linkedin-inteligente?profile=' + profileId);
                    }}
                    className="w-full bg-white text-blue-700 hover:bg-blue-50 px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl transition-all"
                  >
                    <span className="mr-3 text-3xl">💼</span>
                    Potenciar mi LinkedIn ahora
                    <span className="ml-3 text-2xl">→</span>
                  </Button>
                </div>

                {/* Botón secundario */}
                <Button
                  onClick={() => router.push('/carreras?profile=' + profileId)}
                  variant="outline"
                  className="w-full px-8 py-6 text-xl font-bold rounded-2xl border-2 border-purple-300 hover:bg-purple-50"
                >
                  🔙 Volver a explorar carreras
                </Button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
                  <p className="text-xs text-gray-600">Mini Reto en progreso</p>
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

        <div className="max-w-4xl mx-auto p-4 py-8">
          {/* Header con progreso */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2">
                Paso {currentStep + 1} de {reto.pasos.length}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2">
                Paso {currentStep + 1} de {reto.pasos.length}
              </Badge>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Contenido del paso actual */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:shadow-3xl transition-all">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-bounce">
                {currentPaso.icono}
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {currentPaso.titulo}
              </h2>
              <p className="text-xl text-gray-600">
                {currentPaso.descripcion}
              </p>
            </div>

            {/* Renderizar según el tipo */}
            <div className="mb-8">
              {currentPaso.tipo === 'input' && (
                <Input
                  value={respuestas[currentPaso.id] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentPaso.placeholder}
                  className="text-lg p-6 rounded-2xl border-2 border-purple-200 focus:border-purple-500 transition-all"
                />
              )}

              {currentPaso.tipo === 'textarea' && (
                <Textarea
                  value={respuestas[currentPaso.id] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentPaso.placeholder}
                  rows={6}
                  className="text-lg p-6 rounded-2xl border-2 border-purple-200 focus:border-purple-500 transition-all resize-none"
                />
              )}

              {currentPaso.tipo === 'multiple' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPaso.opciones.map((opcion: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleInputChange(opcion)}
                      className={`p-6 rounded-2xl border-2 font-semibold text-lg transition-all transform hover:scale-105 ${
                        respuestas[currentPaso.id] === opcion
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-xl scale-105'
                          : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              )}

              {currentPaso.tipo === 'checkbox' && (
                <div className="space-y-4">
                  <p className="text-center text-gray-600 mb-4">
                    Seleccionados: {(respuestas[currentPaso.id] || []).length} / {currentPaso.max}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPaso.opciones.map((opcion: any, index: number) => {
                      const isSelected = (respuestas[currentPaso.id] || []).includes(opcion.texto);
                      const isDisabled = !isSelected && (respuestas[currentPaso.id] || []).length >= currentPaso.max;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            const current = respuestas[currentPaso.id] || [];
                            let newValue;
                            if (isSelected) {
                              newValue = current.filter((item: string) => item !== opcion.texto);
                            } else if (!isDisabled) {
                              newValue = [...current, opcion.texto];
                            } else {
                              return;
                            }
                            handleInputChange(newValue);
                          }}
                          disabled={isDisabled}
                          className={`p-6 rounded-2xl border-2 font-semibold text-lg transition-all transform ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-xl scale-105'
                              : isDisabled
                              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-white border-gray-200 hover:border-purple-300 hover:scale-105'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{opcion.emoji}</span>
                              <span>{opcion.texto}</span>
                            </div>
                            {isSelected && <CheckCircle className="w-6 h-6" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 py-6 text-lg font-bold rounded-2xl"
                >
                  ← Anterior
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
              >
                {currentStep === reto.pasos.length - 1 ? '🎯 Enviar mi reto' : 'Siguiente →'}
              </Button>
            </div>
          </div>
        </div>
        </div>
      </ProtectedRoute>
    );
}

export default function MiniRetoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <MiniRetoContent />
    </Suspense>
  );
}

