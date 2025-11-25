"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Compass, Target, ArrowRight, Star, BookOpen, Heart, Lightbulb, Search, BarChart3, Award, Users, Brain, Map, Trophy, Rocket, Zap, LogOut, Linkedin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CareerExplorer from "@/components/CareerExplorer";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const careerSectionRef = useRef<HTMLDivElement>(null);
  const [shouldFilterByProfile, setShouldFilterByProfile] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si viene del test con parámetro de scroll
    const scrollToCarreras = searchParams.get('scrollToCarreras');
    const filterByProfile = searchParams.get('filterByProfile');

    if (scrollToCarreras === 'true' && careerSectionRef.current) {
      // Scroll suave a la sección de carreras
      setTimeout(() => {
        careerSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }

    if (filterByProfile) {
      setShouldFilterByProfile(filterByProfile);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: '#134E4A' }}>
                <Compass className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-montserrat font-bold" style={{ color: '#134E4A' }}>
                  Senda
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-lato">
                  Tu brújula vocacional
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#inicio" className="text-gray-700 hover:text-senda-primary font-lato transition-colors">
                Inicio
              </a>
              <a href="#test" className="text-gray-700 hover:text-senda-primary font-lato transition-colors">
                Test Vocacional
              </a>
              <a href="#carreras" className="text-gray-700 hover:text-senda-primary font-lato transition-colors">
                Explorar Carreras
              </a>
              <Button 
                onClick={() => router.push('/org/login')}
                className="ml-4 bg-[#10B981] hover:bg-[#059669] text-white font-lato font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Ingresar como Colegio
              </Button>
              <Button 
                onClick={() => router.push('/login')}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 font-lato font-semibold px-4 py-2 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Nuevo storytelling visual */}
      <section id="inicio" className="py-12 sm:py-20 relative overflow-hidden">
        {/* Fondo suave con elementos decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-senda-primary to-senda-secondary"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-senda-secondary to-senda-light"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-senda-cream"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Nuevo encabezado inspirador */}
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-6 sm:mb-8">
              <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2 shadow-lg">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-montserrat font-bold text-senda-primary">Explora</span>
              </div>
              
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-senda-secondary animate-pulse" />
              
              <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg">
                  <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-montserrat font-bold text-senda-primary">Descubre</span>
              </div>
              
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-senda-secondary animate-pulse" />
              
              <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-2 shadow-lg">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-montserrat font-bold text-senda-primary">Decide</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold mb-4 sm:mb-6 px-2" style={{ color: '#134E4A' }}>
              Encuentra la carrera que conecta con tus pasiones
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 font-lato mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed">
              Descubre tus talentos, explora profesiones reales y toma decisiones informadas. 
              Tu viaje profesional comienza aquí con una experiencia personalizada y gamificada.
            </p>

            {/* Brújula vocacional con progreso */}
            <div className="max-w-md mx-auto mb-8 sm:mb-12 p-6 bg-white rounded-2xl shadow-lg border border-senda-light">
              <div className="flex items-center justify-center mb-4">
                <Compass className="w-8 h-8 text-senda-primary mr-3 animate-spin" style={{ animationDuration: '8s' }} />
                <h3 className="text-lg font-montserrat font-bold text-senda-primary">Tu Brújula Vocacional</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-blue-500" />
                    Test Vocacional
                  </span>
                  <span className="text-gray-600">0%</span>
                </div>
                <Progress value={0} className="h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                    Carreras Exploradas
                  </span>
                  <span className="text-gray-600">0/40+</span>
                </div>
                <Progress value={0} className="h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Propósito Definido
                  </span>
                  <span className="text-gray-600">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA principal grande */}
          <div className="mb-8 sm:mb-12">
            <Button
              onClick={() => router.push('/test-vocacional')}
              size="lg"
              className="bg-gradient-to-r from-senda-primary via-purple-600 to-senda-secondary hover:from-senda-secondary hover:via-purple-700 hover:to-senda-primary text-white px-12 sm:px-16 py-6 sm:py-8 text-xl sm:text-2xl font-montserrat font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto min-h-[72px] group"
            >
              <Compass className="w-6 h-6 sm:w-8 sm:h-8 mr-3 group-hover:animate-spin" />
              Hacer mi Test Vocacional
              <Rocket className="w-6 h-6 sm:w-8 sm:h-8 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-base sm:text-lg text-gray-600 mt-4 font-lato">
              ✨ Duración: 10-15 minutos • 🎯 6 dimensiones vocacionales • 🏆 Resultados personalizados
            </p>
          </div>
        </div>
      </section>

      {/* Reorganización de propuesta de valor con cards animadas */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-white to-senda-cream">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-senda-primary mb-4 sm:mb-6">
              🚀 Tu aventura vocacional te espera
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 font-lato max-w-3xl mx-auto">
              Descubre tu potencial a través de una experiencia gamificada y personalizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Card 1: Test interactivo */}
            <Card className="group bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 hover:border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 cursor-pointer">
              <CardContent className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:animate-bounce">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-senda-primary mb-4">
                  🧠 Test interactivo personalizado
                </h3>
                <p className="text-base sm:text-lg text-gray-700 font-lato mb-6 leading-relaxed">
                  Explora tus intereses, personalidad y valores. Basado en 6 dimensiones vocacionales 
                  con tecnología de matching avanzada.
                </p>
                <Button
                  onClick={() => router.push('/test-vocacional')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 group-hover:scale-110"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Hacer el Test
                </Button>
              </CardContent>
            </Card>

            {/* Card 2: Recomendaciones personalizadas */}
            <Card className="group bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 hover:border-green-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 cursor-pointer">
              <CardContent className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:animate-bounce">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-senda-primary mb-4">
                  🎯 Recibe recomendaciones personalizadas
                </h3>
                <p className="text-base sm:text-lg text-gray-700 font-lato mb-6 leading-relaxed">
                  Al terminar el test, obtén tus 3 carreras ideales y desbloquea insignias 
                  por mundos completados. Dashboard personalizado incluido.
                </p>
                <Button
                  onClick={() => router.push('/test-vocacional')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 group-hover:scale-110"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Descubre tus resultados
                </Button>
              </CardContent>
            </Card>

            {/* Card 3: LinkedIn Inteligente */}
            <Card className="group bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 cursor-pointer">
              <CardContent className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:animate-bounce">
                  <Linkedin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-senda-primary mb-4">
                  💼 Explora 40+ carreras con datos reales
                </h3>
                <p className="text-base sm:text-lg text-gray-700 font-lato mb-6 leading-relaxed">
                  Salario promedio, dónde estudiar, campo laboral, estilo de vida, propósito e impacto. Información actualizada y testimonios reales.
                </p>
                <Button
                  onClick={() => router.push('/test-vocacional')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 group-hover:scale-110"
                >
                  <Map className="w-5 h-5 mr-2" />
                  Ver Explorador
                </Button>
              </CardContent>
            </Card>

            {/* Card 4: Gamificación */}
            <Card className="group bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-200 hover:border-yellow-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer">
              <CardContent className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center group-hover:animate-bounce">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-senda-primary mb-4">
                  🎮 Gana retos y desbloquea tu progreso
                </h3>
                <p className="text-base sm:text-lg text-gray-700 font-lato mb-6 leading-relaxed">
                  Insignias, barra de avance y recompensas al explorar carreras, completar el test 
                  y descubrir tu propósito. ¡Convierte tu búsqueda en una aventura!
                </p>
                <Button
                  onClick={() => router.push('/test-vocacional')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 group-hover:scale-110"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Empieza tu aventura
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Test Vocacional Section */}
      <section id="test" className="py-12 sm:py-20 bg-gradient-to-br from-senda-cream to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🎯</div>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-senda-primary mb-4 sm:mb-6 px-2">
              Test Vocacional Personalizado
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 font-lato max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Nuestro test evalúa 6 dimensiones clave de tu personalidad vocacional para ofrecerte 
              recomendaciones precisas y personalizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 px-4">
            {[
              { emoji: "🧠", title: "Intereses", desc: "Descubre qué te motiva realmente" },
              { emoji: "🎭", title: "Personalidad", desc: "Conoce tu estilo único de ser" },
              { emoji: "💎", title: "Valores", desc: "Identifica tus principios fundamentales" },
              { emoji: "⚡", title: "Talentos", desc: "Reconoce tus habilidades naturales" },
              { emoji: "🎬", title: "Escenarios", desc: "Visualiza tu futuro profesional" },
              { emoji: "🎯", title: "Propósito", desc: "Define tu misión de vida" }
            ].map((item, index) => (
              <Card key={index} className="bg-white shadow-lg border-l-4 border-senda-secondary hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.emoji}</div>
                  <h3 className="text-lg sm:text-xl font-montserrat font-bold text-senda-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-lato">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center px-4">
            <Button
              onClick={() => router.push('/test-vocacional')}
              size="lg"
              className="bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-montserrat font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto min-h-[56px]"
            >
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Comenzar mi Test Vocacional
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
            </Button>
            <p className="text-base sm:text-lg text-gray-600 mt-4 font-lato">
              Duración aproximada: 10-15 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Preview Section - Lo que recibirás */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🎁</div>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-senda-primary mb-4 sm:mb-6 px-2">
              Lo que recibirás al terminar el test
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 font-lato max-w-3xl mx-auto px-4">
              Descubre todo lo que desbloquearás una vez que completes tu test vocacional personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            <Card className="bg-gradient-to-br from-senda-cream to-white shadow-lg border-l-4 border-senda-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 text-center">
                <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-senda-primary mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-senda-primary mb-3 sm:mb-4">
                  📊 Dashboard personalizado
                </h3>
                <p className="text-sm sm:text-base text-gray-700 font-lato leading-relaxed">
                  Visualiza tu perfil, logros, retos completados y próximos pasos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-senda-cream to-white shadow-lg border-l-4 border-senda-secondary hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 sm:p-8 text-center">
                <Award className="w-12 h-12 sm:w-16 sm:h-16 text-senda-secondary mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-senda-primary mb-3 sm:mb-4">
                  🎖 Insignias por mundos completados
                </h3>
                <p className="text-sm sm:text-base text-gray-700 font-lato leading-relaxed">
                  Gana reconocimientos por cada dimensión vocacional explorada.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-senda-cream to-white shadow-lg border-l-4 border-senda-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105 md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-senda-primary mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-senda-primary mb-3 sm:mb-4">
                  🤝 Conexión con profesionales reales
                </h3>
                <p className="text-sm sm:text-base text-gray-700 font-lato leading-relaxed">
                  Recibe consejos vocacionales y frases motivadoras según tu camino.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-senda-primary to-senda-secondary">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-4 sm:mb-6 px-2">
              ¿Listo para descubrir tu vocación?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90 px-4">
              Miles de estudiantes ya han encontrado su camino profesional con Senda. 
              ¡Es tu turno de brillar!
            </p>
            <Button
              onClick={() => router.push('/test-vocacional')}
              size="lg"
              className="bg-white text-senda-primary hover:bg-gray-100 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-montserrat font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto min-h-[56px]"
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-senda-primary flex items-center justify-center">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-montserrat font-bold">Senda</h3>
          </div>
          <p className="text-sm sm:text-base text-gray-400 font-lato mb-4 sm:mb-6 px-4">
            Tu brújula vocacional para encontrar el camino profesional perfecto
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
