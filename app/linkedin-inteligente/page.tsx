"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Compass, Linkedin, CheckCircle, Users, Briefcase, GraduationCap, TrendingUp, Sparkles, Copy, Download, Share2, MessageSquare, UserPlus, Building2, Mail, Phone, MapPin, Globe, Award, Target, Heart, Lightbulb, Rocket, Star, ArrowRight, FileText, Search, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { updateJourneyProgress, resetJourneyProgress, startTestRun } from '@/lib/senda-db';
import { supabase } from '@/integrations/supabase/client';

const profileTemplates = {
  'explorador-creativo': {
    titulo: 'Creativo Digital | Innovador Visual | Diseñador de Experiencias',
    descripcion: 'Profesional apasionado por transformar ideas en experiencias visuales impactantes. Especializado en diseño, marketing digital y narrativas creativas que conectan marcas con personas.',
    habilidades: ['Diseño Gráfico', 'Marketing Digital', 'Creatividad', 'Storytelling', 'Adobe Creative Suite', 'Branding', 'Contenido Visual'],
    intereses: ['Arte Digital', 'Diseño UX/UI', 'Publicidad Creativa', 'Fotografía', 'Innovación Visual']
  },
  'analista-estratégico': {
    titulo: 'Analista de Datos | Estratega Digital | Problem Solver',
    descripcion: 'Profesional orientado a resultados con fuerte capacidad analítica. Especializado en transformar datos en insights estratégicos que impulsan decisiones de negocio inteligentes.',
    habilidades: ['Análisis de Datos', 'Pensamiento Estratégico', 'Excel Avanzado', 'SQL', 'Business Intelligence', 'Resolución de Problemas', 'Modelado de Datos'],
    intereses: ['Data Science', 'Inteligencia de Negocios', 'Tecnología', 'Estrategia Empresarial', 'Automatización']
  },
  'guía-humanista': {
    titulo: 'Agente de Cambio Social | Educador | Defensor de Derechos Humanos',
    descripcion: 'Profesional comprometido con el desarrollo humano y el bienestar social. Enfocado en crear impacto positivo a través de la educación, el servicio comunitario y la defensa de valores fundamentales.',
    habilidades: ['Comunicación Empática', 'Trabajo en Equipo', 'Liderazgo Social', 'Educación', 'Gestión de Proyectos Sociales', 'Mediación', 'Desarrollo Comunitario'],
    intereses: ['Educación', 'Psicología', 'Trabajo Social', 'Derechos Humanos', 'Sostenibilidad']
  },
  'líder-emprendedor': {
    titulo: 'Emprendedor | Líder de Proyectos | Innovador de Negocios',
    descripcion: 'Profesional visionario con mentalidad emprendedora y habilidades de liderazgo. Especializado en identificar oportunidades, construir equipos y transformar ideas innovadoras en negocios exitosos.',
    habilidades: ['Liderazgo', 'Gestión de Proyectos', 'Emprendimiento', 'Negociación', 'Visión Estratégica', 'Networking', 'Toma de Decisiones'],
    intereses: ['Startups', 'Negocios Digitales', 'Innovación', 'Liderazgo Empresarial', 'Inversión']
  },
  'comunicador-influyente': {
    titulo: 'Comunicador Estratégico | Content Creator | Influencer Digital',
    descripcion: 'Profesional especializado en construir audiencias y generar impacto a través de la comunicación efectiva. Experto en crear contenido que inspira, educa y conecta con diversas comunidades.',
    habilidades: ['Comunicación Estratégica', 'Creación de Contenido', 'Redes Sociales', 'Copywriting', 'Oratoria', 'Marketing de Influencers', 'Community Management'],
    intereses: ['Marketing Digital', 'Periodismo', 'Redes Sociales', 'Comunicación Corporativa', 'Relaciones Públicas']
  },
  'constructor-técnico': {
    titulo: 'Ingeniero de Soluciones | Desarrollador | Constructor de Tecnología',
    descripcion: 'Profesional técnico enfocado en diseñar y construir soluciones prácticas que resuelven problemas reales. Especializado en ingeniería, desarrollo tecnológico y optimización de sistemas.',
    habilidades: ['Ingeniería', 'Pensamiento Lógico', 'Resolución de Problemas', 'Programación', 'Gestión de Proyectos Técnicos', 'AutoCAD', 'Metodologías Ágiles'],
    intereses: ['Ingeniería Civil', 'Desarrollo de Software', 'Robótica', 'Automatización', 'Construcción']
  }
};

const profesionalesPeruanos = [
  {
    nombre: 'María González',
    puesto: 'Senior Product Designer',
    empresa: 'Rappi',
    ubicacion: 'Lima, Perú',
    descripcion: 'Liderando diseño de productos digitales que impactan a millones de usuarios en Latinoamérica.',
    conexiones: '500+',
    imagen: '👩‍💼',
    genero: 'mujer'
  },
  {
    nombre: 'Carlos Mendoza',
    puesto: 'Data Science Lead',
    empresa: 'BCP',
    ubicacion: 'Lima, Perú',
    descripcion: 'Transformando datos en insights estratégicos para el sector financiero peruano.',
    conexiones: '500+',
    imagen: '👨‍💼',
    genero: 'hombre'
  },
  {
    nombre: 'Ana Torres',
    puesto: 'Directora de RRHH',
    empresa: 'Alicorp',
    ubicacion: 'Lima, Perú',
    descripcion: 'Desarrollando talento humano y liderando transformación cultural en empresas peruanas.',
    conexiones: '500+',
    imagen: '👩‍💼',
    genero: 'mujer'
  },
  {
    nombre: 'Diego Paredes',
    puesto: 'Founder & CEO',
    empresa: 'TechStartup Peru',
    ubicacion: 'Lima, Perú',
    descripcion: 'Construyendo el futuro del e-commerce en el Perú con tecnología de punta.',
    conexiones: '500+',
    imagen: '👨‍💼',
    genero: 'hombre'
  },
  {
    nombre: 'Lucía Ramírez',
    puesto: 'Community Manager Senior',
    empresa: 'Interbank',
    ubicacion: 'Lima, Perú',
    descripcion: 'Creando estrategias digitales que conectan marcas con audiencias peruanas.',
    conexiones: '500+',
    imagen: '👩‍💼',
    genero: 'mujer'
  },
  {
    nombre: 'Roberto Chávez',
    puesto: 'Ingeniero de Software',
    empresa: 'Rimac Seguros',
    ubicacion: 'Lima, Perú',
    descripcion: 'Desarrollando soluciones tecnológicas que modernizan el sector asegurador peruano.',
    conexiones: '500+',
    imagen: '👨‍💼',
    genero: 'hombre'
  },
  {
    nombre: 'Patricia Silva',
    puesto: 'Marketing Director',
    empresa: 'Coca-Cola Perú',
    ubicacion: 'Lima, Perú',
    descripcion: 'Liderando estrategias de marca y campañas que inspiran a consumidores peruanos.',
    conexiones: '500+',
    imagen: '👩‍💼',
    genero: 'mujer'
  },
  {
    nombre: 'Fernando Vega',
    puesto: 'Gerente de Proyectos',
    empresa: 'Graña y Montero',
    ubicacion: 'Lima, Perú',
    descripcion: 'Ejecutando proyectos de infraestructura que transforman el Perú.',
    conexiones: '500+',
    imagen: '👨‍💼',
    genero: 'hombre'
  },
  {
    nombre: 'Sofía Castillo',
    puesto: 'UX Research Lead',
    empresa: 'Mercado Libre',
    ubicacion: 'Lima, Perú',
    descripcion: 'Investigando comportamiento de usuarios para mejorar experiencias digitales en Latinoamérica.',
    conexiones: '500+',
    imagen: '👩‍💼',
    genero: 'mujer'
  },
  {
    nombre: 'Jorge Morales',
    puesto: 'Business Analyst',
    empresa: 'Scotiabank Perú',
    ubicacion: 'Lima, Perú',
    descripcion: 'Optimizando procesos y estrategias de negocio en la banca peruana.',
    conexiones: '500+',
    imagen: '👨‍💼',
    genero: 'hombre'
  }
];

type LinkedInStep = 'intro' | 'crear-perfil' | 'about-me' | 'conectar' | 'profesionales';
const LINKEDIN_STEPS: LinkedInStep[] = ['intro', 'crear-perfil', 'about-me', 'conectar', 'profesionales'];

function LinkedInInteligenteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profileId = searchParams.get('profile') || 'explorador-creativo';
  
  const stepParam = searchParams.get('step');
  const resolvedInitialStep: LinkedInStep = stepParam && LINKEDIN_STEPS.includes(stepParam as LinkedInStep)
    ? (stepParam as LinkedInStep)
    : 'intro';

  const [step, setStep] = useState<LinkedInStep>(resolvedInitialStep);

  useEffect(() => {
    const param = searchParams.get('step');
    if (param && LINKEDIN_STEPS.includes(param as LinkedInStep) && param !== step) {
      setStep(param as LinkedInStep);
    }
  }, [searchParams, step]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ubicacion, setUbicacion] = useState('Lima, Perú');
  const [universidad, setUniversidad] = useState('');
  const [carrera, setCarrera] = useState('');
  const [aboutMeGenerado, setAboutMeGenerado] = useState('');
  const [aboutMeEditado, setAboutMeEditado] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [profesionalesConFotos, setProfesionalesConFotos] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [commentPosted, setCommentPosted] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [connectedProfessionals, setConnectedProfessionals] = useState<number[]>([]);
  const [completionMarked, setCompletionMarked] = useState(resolvedInitialStep === 'profesionales');
  const [isCompletingPhase, setIsCompletingPhase] = useState(false);
  const [retakingTest, setRetakingTest] = useState(false);

  const completeLinkedInPhase = useCallback(async () => {
    if (completionMarked || isCompletingPhase) return;
    try {
      setIsCompletingPhase(true);
      await updateJourneyProgress('linkedin', 'completed', {
        professionals_viewed: true,
        completed_from: 'linkedin_inteligente'
      });
      setCompletionMarked(true);
    } catch (error) {
      console.error('Error marcando LinkedIn como completado:', error);
      setCompletionMarked(false);
    } finally {
      setIsCompletingPhase(false);
    }
  }, [completionMarked, isCompletingPhase]);

  useEffect(() => {
    if (step === 'profesionales') {
      completeLinkedInPhase();
    }
  }, [step, completeLinkedInPhase]);
  
  const mensajeRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);

  const template = profileTemplates[profileId as keyof typeof profileTemplates] || profileTemplates['explorador-creativo'];

  // Cargar fotos de profesionales al montar
  useEffect(() => {
    const cargarFotos = async () => {
      try {
        // Usar This Person Does Not Exist para fotos profesionales realistas
        // URLs de fotos profesionales de LinkedIn Demo (fotos de stock profesionales)
        const fotosProfesionalesHombres = [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces'
        ];
        
        const fotosProfesionalesMujeres = [
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=faces',
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces'
        ];

        let contadorHombres = 0;
        let contadorMujeres = 0;
        
        const profesionalesActualizados = profesionalesPeruanos.map((prof) => {
          let foto;
          if (prof.genero === 'hombre') {
            foto = fotosProfesionalesHombres[contadorHombres % fotosProfesionalesHombres.length];
            contadorHombres++;
          } else {
            foto = fotosProfesionalesMujeres[contadorMujeres % fotosProfesionalesMujeres.length];
            contadorMujeres++;
          }
          return { ...prof, foto };
        });
        
        setProfesionalesConFotos(profesionalesActualizados);
      } catch (error) {
        setProfesionalesConFotos(profesionalesPeruanos);
      }
    };
    cargarFotos();
  }, []);

  const generarAboutMe = async () => {
    setIsGenerating(true);
    setStep('about-me');
    const aboutMe = template.descripcion;
    setAboutMeGenerado(aboutMe);
    
    // Efecto de escritura
    setDisplayedText('');
    for (let i = 0; i <= aboutMe.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setDisplayedText(aboutMe.slice(0, i));
    }
    setAboutMeEditado(aboutMe);
    setIsGenerating(false);
    
    // Marcar fase de LinkedIn como en progreso
    try {
      await updateJourneyProgress('linkedin', 'in_progress', {
        profile_created: true,
        about_me_generated: true
      });
      console.log('Progreso de LinkedIn en progreso guardado');
    } catch (error) {
      console.error('Error guardando progreso:', error);
    }
  };

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(aboutMeEditado);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleConectar = async (index: number) => {
    setSelectedPerson(index);
    await new Promise(resolve => setTimeout(resolve, 800));
    // Scroll suave a la sección de mensaje
    setTimeout(() => {
      mensajeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handleEnviarMensaje = async () => {
    setSendingMessage(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessageSent(true);
    setSendingMessage(false);
    // Scroll suave a la sección de post
    setTimeout(() => {
      postRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handleComentar = async () => {
    setPostingComment(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCommentPosted(true);
    setPostingComment(false);
  };

  const handleConectarProfesional = async (index: number) => {
    if (connectedProfessionals.includes(index)) return;
    
    // Simular proceso de conexión
    await new Promise(resolve => setTimeout(resolve, 800));
    setConnectedProfessionals(prev => [...prev, index]);
  };

  const handleViewProfessionals = async () => {
    if (step !== 'profesionales') {
      setStep('profesionales');
      if (profileId) {
        router.replace(`/linkedin-inteligente?profile=${profileId}&step=profesionales`);
      }
    }
    await completeLinkedInPhase();
  };

  const handleRetakeTest = async () => {
    if (retakingTest) return;
    try {
      setRetakingTest(true);
      await resetJourneyProgress();
      await startTestRun();
      router.push('/test-vocacional');
    } catch (error) {
      console.error('Error al reiniciar el test:', error);
    } finally {
      setRetakingTest(false);
    }
  };

  return (
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
                <p className="text-xs text-gray-600">LinkedIn Inteligente</p>
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Intro */}
        {step === 'intro' && (
          <div className="text-center mb-12">
            <div className="inline-block p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mb-6">
              <Linkedin className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-montserrat font-bold text-gray-900 mb-4">
              LinkedIn Inteligente 🚀
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Construye tu presencia profesional en LinkedIn con IA. Te ayudaremos a crear un perfil optimizado basado en tu perfil vocacional de Senda.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-green-600 animate-pulse" />
                <h3 className="text-lg font-bold text-green-800">La forma más sencilla de conectar con profesionales</h3>
              </div>
              <p className="text-green-700 text-base leading-relaxed">
                LinkedIn es la red social profesional más grande del mundo, con más de 900 millones de usuarios. 
                Es la plataforma ideal para construir tu marca personal, conectar con profesionales de tu área, 
                y descubrir oportunidades laborales. Con nuestro asistente IA, crear tu perfil optimizado es más fácil que nunca.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center group-hover:animate-bounce">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Crear Perfil</h3>
                  <p className="text-sm text-gray-600">Desde cero con tus datos</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">About Me con IA</h3>
                  <p className="text-sm text-gray-600">Generado automáticamente</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Conectar</h3>
                  <p className="text-sm text-gray-600">Con exalumnos de tu carrera</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">10 Profesionales</h3>
                  <p className="text-sm text-gray-600">Peruanos en tu área</p>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={() => setStep('crear-perfil')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 animate-bounce-in"
            >
              Comenzar Ahora
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        )}

        {/* Crear Perfil */}
        {step === 'crear-perfil' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
                Paso 1: Información Básica
              </h2>
              <p className="text-gray-600">Completa tus datos para crear tu perfil de LinkedIn</p>
            </div>

            <Card className="bg-white shadow-2xl animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-blue-600 animate-bounce" />
                  Datos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre
                    </label>
                    <Input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellido
                    </label>
                    <Input
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Tu apellido"
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+51 999 999 999"
                      className="border-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <Input
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    placeholder="Lima, Perú"
                    className="border-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Universidad (Futura o Actual)
                    </label>
                    <Input
                      value={universidad}
                      onChange={(e) => setUniversidad(e.target.value)}
                      placeholder="Ej: PUCP, UPC, ULIMA"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Carrera de Interés
                    </label>
                    <Input
                      value={carrera}
                      onChange={(e) => setCarrera(e.target.value)}
                      placeholder="Ej: Ingeniería, Diseño, Psicología"
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep('intro')}
                    className="flex-1"
                  >
                    ← Atrás
                  </Button>
                  <Button
                    onClick={generarAboutMe}
                    disabled={!nombre || !apellido}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Generar con IA
                    <Rocket className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* About Me Generado */}
        {step === 'about-me' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
                Paso 2: Tu "About Me" Personalizado
              </h2>
              <p className="text-gray-600">Generado automáticamente basado en tu perfil Senda. Puedes editarlo libremente.</p>
            </div>

            <Card className="bg-white shadow-2xl mb-6 animate-slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
                  Tu Perfil Sugerido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título Profesional Sugerido
                  </label>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                    <p className="font-semibold text-gray-900">{template.titulo}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      About Me
                    </label>
                    {isGenerating && (
                      <Badge className="bg-purple-100 text-purple-700 animate-pulse">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generando con IA...
                      </Badge>
                    )}
                  </div>
                  <Textarea
                    value={isGenerating ? displayedText : aboutMeEditado}
                    onChange={(e) => !isGenerating && setAboutMeEditado(e.target.value)}
                    rows={6}
                    className="border-2 font-lato transition-all"
                    disabled={isGenerating}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Habilidades Sugeridas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {template.habilidades.map((habilidad, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 px-3 py-1">
                        {habilidad}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Intereses
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {template.intereses.map((interes, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800 px-3 py-1">
                        {interes}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <div className="flex gap-3">
                    <Button
                      onClick={copiarAlPortapapeles}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {showCopySuccess ? '¡Copiado!' : 'Copiar About Me'}
                    </Button>
                    <Button
                      onClick={() => setStep('conectar')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                    >
                      Siguiente: Conectar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setStep('crear-perfil')}
                    className="w-full"
                  >
                    ← Editar Información
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview del perfil */}
            <Card className="bg-gradient-to-br from-blue-900 to-blue-950 text-white shadow-2xl animate-bounce-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Linkedin className="w-6 h-6 animate-pulse" />
                  Vista Previa de LinkedIn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl">
                      {nombre.charAt(0)}{apellido.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{nombre} {apellido}</h3>
                      <p className="text-blue-200 text-lg mb-2">{template.titulo}</p>
                      <div className="flex items-center gap-4 text-sm text-blue-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {ubicacion}
                        </span>
                        {universidad && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            {universidad}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-blue-700 pt-4">
                    <h4 className="font-semibold mb-2">Acerca de</h4>
                    <p className="text-blue-100 text-sm leading-relaxed">{aboutMeEditado}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conectar con Alumni - Vista interactiva */}
        {step === 'conectar' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
                Conecta con Exalumnos en LinkedIn
              </h2>
              <p className="text-gray-600">Simulación interactiva de cómo conectar con profesionales</p>
            </div>

            {/* Vista 1: Búsqueda de Alumni */}
            <div className="mb-8 animate-slide-in-left">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-blue-200">
                {/* Header estilo LinkedIn */}
                <div className="bg-[#0A66C2] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Linkedin className="w-8 h-8 text-white" />
                    <Input 
                      placeholder={`Buscar "${universidad || 'tu universidad'}" + "${carrera || 'tu carrera'}"`}
                      className="bg-white w-96 border-0"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-700 text-white">Filtros activos: 2</Badge>
                  </div>
                </div>

                {/* Resultados de búsqueda */}
                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">5 resultados encontrados</h3>
                  
                  <div className="space-y-4">
                    {[
                      { nombre: 'Andrea Rojas', puesto: 'Senior Analyst', empresa: 'Deloitte', conexiones: '500+' },
                      { nombre: 'Carlos Fernández', puesto: 'Product Manager', empresa: 'Banco de Crédito', conexiones: '340' },
                      { nombre: 'María Santos', puesto: 'Consultant', empresa: 'McKinsey & Company', conexiones: '500+' }
                    ].map((persona, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                            {persona.nombre.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{persona.nombre}</h4>
                            <p className="text-sm text-gray-700">{persona.puesto} en {persona.empresa}</p>
                            <p className="text-xs text-gray-500 mt-1">{universidad || 'Universidad'} • {persona.conexiones} conexiones</p>
                            <div className="mt-3">
                              <Button 
                                size="sm" 
                                onClick={() => handleConectar(idx)}
                                disabled={selectedPerson !== null}
                                className={`transition-all ${
                                  selectedPerson === idx 
                                    ? 'bg-green-600 text-white border-green-600' 
                                    : 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                                }`}
                              >
                                {selectedPerson === idx ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2 animate-bounce" />
                                    Invitación enviada
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Conectar
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vista 2: Enviar mensaje de conexión */}
            <div ref={mensajeRef} className="mb-8 animate-slide-in-right">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-green-200">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Enviar mensaje de conexión
                  </h3>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      AR
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Andrea Rojas</h4>
                      <p className="text-sm text-gray-600">Senior Analyst en Deloitte</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 italic mb-2">💡 Mensaje sugerido por Senda:</p>
                    <div className="bg-white rounded p-3 border">
                      <p className="text-sm">
                        Hola Andrea, soy {nombre || '[Tu nombre]'}, estudiante interesado en {carrera || 'tu carrera'}. 
                        Vi que estudiaste en {universidad || 'la misma universidad'} y actualmente trabajas en Deloitte. 
                        Me gustaría conocer tu experiencia y aprender de tu trayectoria. ¿Podríamos conectar?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" disabled={messageSent || sendingMessage}>Personalizar mensaje</Button>
                    <Button 
                      onClick={handleEnviarMensaje}
                      disabled={messageSent || sendingMessage}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden"
                    >
                      {sendingMessage ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Enviando...
                        </>
                      ) : messageSent ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 animate-bounce" />
                          Mensaje enviado ✓
                        </>
                      ) : (
                        <>
                          Enviar invitación
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>

                  {messageSent && (
                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg animate-fade-in">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <p className="font-semibold">¡Invitación enviada exitosamente!</p>
                      </div>
                      <p className="text-sm text-green-600 mt-1">Andrea recibirá tu mensaje y podrá aceptar tu solicitud.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vista 3: Post de LinkedIn con preguntas */}
            <div ref={postRef} className="mb-8 animate-fade-in">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-purple-200">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Haz las preguntas correctas
                  </h3>
                </div>

                <div className="p-6">
                  {/* Post simulado */}
                  <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                        CF
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Carlos Fernández</h4>
                        <p className="text-xs text-gray-500">Product Manager • 2h</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Feliz de compartir que he completado mi primer año como Product Manager en BCP. 
                      Ha sido un viaje increíble de aprendizaje y crecimiento profesional. 🚀
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 border-t pt-2">
                      <span>👍 45</span>
                      <span>💬 12 comentarios</span>
                    </div>
                  </div>

                  {/* Sección de comentarios con preguntas sugeridas */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">💬 Preguntas sugeridas para hacer:</h4>
                    
                    {[
                      `¿Cómo fue tu experiencia estudiando ${carrera || 'tu carrera'}?`,
                      '¿Qué habilidades fueron más importantes en tu primer año?',
                      '¿Cómo conseguiste tu primer trabajo como Product Manager?',
                      '¿Qué consejo darías a alguien que está empezando en este campo?'
                    ].map((pregunta, idx) => (
                      <div key={idx} className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 hover:bg-purple-100 transition-all cursor-pointer">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">{pregunta}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={handleComentar}
                    disabled={commentPosted || postingComment}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 relative overflow-hidden"
                  >
                    {postingComment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Publicando comentario...
                      </>
                    ) : commentPosted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 animate-bounce" />
                        Comentario publicado ✓
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Comentar en el post
                      </>
                    )}
                  </Button>

                  {commentPosted && (
                    <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg animate-fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                          {nombre?.charAt(0) || 'T'}{apellido?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 text-sm">{nombre} {apellido}</h5>
                          <p className="text-xs text-gray-500 mb-2">Ahora</p>
                          <p className="text-sm text-gray-700">
                            ¡Felicidades Carlos! Me encanta ver este tipo de logros. Como estudiante interesado en {carrera || 'este campo'}, me gustaría saber: ¿Qué habilidades fueron más importantes en tu primer año?
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vista 4: Buenas prácticas */}
            <div className="mb-8 animate-bounce-in">
              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Award className="w-6 h-6" />
                    Buenas Prácticas para Construir Relaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: '💚', titulo: 'Sé genuino y agradecido', desc: 'Muestra interés real y agradece el tiempo que te dedican' },
                      { icon: '💡', titulo: 'Comparte tus insights', desc: 'No solo preguntes, también aporta valor con tus perspectivas' },
                      { icon: '📅', titulo: 'Mantén contacto', desc: 'Sigue la conversación ocasionalmente, no desaparezcas' },
                      { icon: '🤝', titulo: 'Ofrece ayuda', desc: 'Busca maneras de ser útil cuando tengas la oportunidad' }
                    ].map((practica, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border-2 border-orange-100 hover:shadow-lg transition-all">
                        <div className="text-3xl mb-2">{practica.icon}</div>
                        <h4 className="font-bold text-gray-900 mb-1">{practica.titulo}</h4>
                        <p className="text-sm text-gray-600">{practica.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('about-me')}
                className="flex-1"
              >
                ← Atrás
              </Button>
              <Button
                onClick={handleViewProfessionals}
                disabled={isCompletingPhase}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70"
              >
                {isCompletingPhase ? 'Abriendo profesionales...' : 'Ver 10 Profesionales Peruanos'}
                <Users className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* 10 Profesionales Peruanos */}
        {step === 'profesionales' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
                10 Profesionales Peruanos en tu Área
              </h2>
              <p className="text-gray-600">Inspiración y networking: conecta con líderes del sector en Perú</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {(profesionalesConFotos.length > 0 ? profesionalesConFotos : profesionalesPeruanos).map((profesional, index) => (
                <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {profesional.foto && typeof profesional.foto === 'string' && profesional.foto.startsWith('http') ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-blue-100">
                          <Image
                            src={profesional.foto}
                            alt={profesional.nombre}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="text-5xl">{profesional.imagen}</div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{profesional.nombre}</h3>
                        <p className="text-blue-600 font-semibold mb-1">{profesional.puesto}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Building2 className="w-4 h-4" />
                          <span>{profesional.empresa}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{profesional.ubicacion}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{profesional.descripcion}</p>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-blue-100 text-blue-800">
                            {profesional.conexiones} conexiones
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => handleConectarProfesional(index)}
                            disabled={connectedProfessionals.includes(index)}
                            className={`transition-all ${
                              connectedProfessionals.includes(index)
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {connectedProfessionals.includes(index) ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1 animate-bounce" />
                                Conectado
                              </>
                            ) : (
                              <>
                                <Linkedin className="w-4 h-4 mr-1" />
                                Conectar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Final */}
            <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">¡Felicidades! 🎉</h3>
                  <p className="text-xl text-white/90 mb-6">
                    Completaste el módulo de LinkedIn Inteligente. Ahora tienes todas las herramientas para destacar profesionalmente.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Perfil Creado</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">About Me Optimizado</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Red de Contactos</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-center flex-wrap">
                  <Button
                    onClick={handleRetakeTest}
                    disabled={retakingTest}
                    className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 disabled:opacity-70"
                  >
                    {retakingTest ? 'Preparando nuevo test...' : '🔄 Volver a tomar Test Vocacional'}
                  </Button>
                  <Button
                    onClick={() => router.push('/resumen-perfil')}
                    className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3"
                  >
                    📊 Ver Resumen de Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LinkedInInteligentePage() {
  return (
    <ProtectedRoute requiredRole="student">
      <LinkedInInteligenteContent />
    </ProtectedRoute>
  );
}
