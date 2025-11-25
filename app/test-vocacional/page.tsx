"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Compass, Award, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import BienvenidaTest from "@/components/test/BienvenidaTest";
import NombreInput from "@/components/test/NombreInput";
import MundoIntereses from "@/components/test/MundoIntereses";
import MundoPersonalidad from "@/components/test/MundoPersonalidad";
import MundoValores from "@/components/test/MundoValores";
import MundoTalentos from "@/components/test/MundoTalentos";
import MundoEscenarios from "@/components/test/MundoEscenarios";
import MundoPropósito from "@/components/test/MundoPropósito";
import WorldCompletionScreen from "@/components/test/WorldCompletionScreen";
import AnalysisLoading from "@/components/test/AnalysisLoading";
import ResultadoTest from "@/components/test/ResultadoTest";
import MiniHackathon from "@/components/test/MiniHackathon";
import Dashboard from "@/components/test/Dashboard";
import XPNotification from "@/components/test/XPNotification";
import WorldMap from "@/components/test/WorldMap";
import BadgeCollection from "@/components/test/BadgeCollection";
import FOMOBanner from "@/components/test/FOMOBanner";
import TestRunsHistory from "@/components/test-vocacional/TestRunsHistory";
import { calculateProfile } from "@/lib/calculate-profile";
import { 
  getActiveTestRun, 
  getTestAnswers, 
  startTestRun, 
  saveAnswer,
  completeTestRun,
  saveFinalResult,
  getUserName,
  updateUserName,
  updateStudentInfo,
  getJourneyProgress,
  updateJourneyProgress
} from "@/lib/senda-db";

export interface TestResponse {
  intereses: { [key: string]: string };
  personalidad: { [key: string]: number };
  valores: { [key: string]: any };
  talentos: { [key: string]: string };
  escenarios: { [key: string]: string };
  propósito: string[];
}

export interface PerfilVocacional {
  id: string;
  nombre: string;
  descripcion: string;
  fortalezas: string[];
  carreras: string[];
  consejo: string;
  icono: string;
  color: string;
  colorFondo: string;
}

export default function TestVocacional() {
  return (
    <ProtectedRoute requiredRole="student">
      <TestVocacionalContent />
    </ProtectedRoute>
  );
}

function TestVocacionalContent() {
  const router = useRouter();

  // Estado para controlar si mostrar historial o el test
  const [viewMode, setViewMode] = useState<"history" | "test">("history");

  // -1: bienvenida, -0.5: nombre, 0..5: mundos, X.75: world completion, 5.5: loading, 6: resultado, 7: hackathon, 8: dashboard
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [userName, setUserName] = useState("");
  const [responses, setResponses] = useState<TestResponse>({
    intereses: {},
    personalidad: {},
    valores: {},
    talentos: {},
    escenarios: {},
    propósito: [],
  });
  const [perfil, setPerfil] = useState<PerfilVocacional | null>(null);
  const [hackathonCompleted, setHackathonCompleted] = useState(false);

  // Sistema de gamificación
  const [totalXP, setTotalXP] = useState(0);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [completedWorlds, setCompletedWorlds] = useState<number[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  // ID de la corrida en Supabase
  const [runId, setRunId] = useState<string | null>(null);

  // Para evitar guardar el resultado más de una vez
  const savedResultRef = useRef(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Función para continuar con una run existente
  const continueWithRun = async (runIdToLoad: string) => {
    try {
      setIsLoadingProgress(true);
      setViewMode("test");
      setRunId(runIdToLoad);
      
      // Obtener todas las respuestas guardadas
      const answers = await getTestAnswers(runIdToLoad);
      
      // Reconstruir el estado desde las respuestas
      const loadedResponses: TestResponse = {
        intereses: {},
        personalidad: {},
        valores: {},
        talentos: {},
        escenarios: {},
        propósito: [],
      };
      
      const completedSections: number[] = [];
      const badges: string[] = [];
      
      answers.forEach((answer) => {
        const sectionIndex = phases.findIndex(p => 
          p.name.toLowerCase() === answer.section.toLowerCase()
        );
        
        if (sectionIndex !== -1) {
          // Cargar respuesta en el estado
          if (answer.answer) {
            const sectionKey = answer.section as keyof TestResponse;
            loadedResponses[sectionKey] = answer.answer as any;
          }
          
          // Marcar mundo como completado
          if (!completedSections.includes(sectionIndex)) {
            completedSections.push(sectionIndex);
            badges.push(phases[sectionIndex].badge.id);
          }
        }
      });
      
      setResponses(loadedResponses);
      setCompletedWorlds(completedSections);
      setUnlockedBadges(badges);
      setTotalXP(completedSections.length * 100);
      
      // Determinar en qué fase debería estar el usuario
      const lastCompletedWorld = Math.max(...completedSections, -1);
      const nextPhase = lastCompletedWorld + 1;
      
      if (nextPhase >= phases.length) {
        // Ya completó todos los mundos, ir al análisis
        setCurrentPhase(5.5);
      } else {
        // Continuar desde el siguiente mundo
        setCurrentPhase(nextPhase);
      }
    } catch (error) {
      console.error("Error cargando run:", error);
      setCurrentPhase(-1);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Cargar progreso guardado al montar el componente
  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        setIsLoadingProgress(true);
        
        // 1. Verificar el journey progress primero
        const journeyProgress = await getJourneyProgress();
        
        console.log("🔍 Journey progress cargado:", journeyProgress);
        
        // 2. Redirigir según la fase actual del journey
        if (journeyProgress) {
          const currentPhase = journeyProgress.current_phase;
          const testStatus = journeyProgress.phases.test.status;
          const linkedinPhaseStatus = journeyProgress.phases.linkedin.status;
          
          console.log("📍 Current phase:", currentPhase, "| Test status:", testStatus);
          
          // Si el test está completado, obtener el profileId para las redirecciones
          if (testStatus === 'completed') {
            const { data: latestResult } = await supabase
              .from("test_results")
              .select("score_json")
              .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .maybeSingle();
            
            const profileId = latestResult?.score_json?.profileData?.id;
            console.log("👤 ProfileId obtenido:", profileId);
            
            // Redirigir según current_phase
            if (currentPhase === 'carreras' && profileId) {
              console.log("➡️ Redirigiendo a /carreras");
              router.push(`/carreras?profile=${profileId}`);
              return;
            } else if (currentPhase === 'mini_reto' && profileId) {
              console.log("➡️ Redirigiendo a /mini-reto");
              router.push(`/mini-reto?profile=${profileId}`);
              return;
            } else if (currentPhase === 'linkedin' && profileId) {
              // Si linkedin está completed, ir a profesionales, sino a la página inicial
              const isLinkedInCompleted = linkedinPhaseStatus === 'completed';
              if (isLinkedInCompleted) {
                console.log("➡️ Redirigiendo a /linkedin-inteligente paso profesionales");
                router.push(`/linkedin-inteligente?profile=${profileId}&step=profesionales`);
              } else {
                console.log("➡️ Redirigiendo a /linkedin-inteligente");
                router.push(`/linkedin-inteligente?profile=${profileId}`);
              }
              return;
            }
          }
        }
        
        // 3. Cargar nombre del usuario desde la BD
        const savedName = await getUserName();
        if (savedName) {
          setUserName(savedName);
        }
        
        // 4. Verificar si hay una run activa en progreso
        const activeRun = await getActiveTestRun();
        
        if (activeRun && savedName) {
          // Si hay run activa y ya tiene nombre, continuar directamente
          await continueWithRun(activeRun.id);
        } else {
          // Si no hay run activa o es primera vez, mostrar historial
          setViewMode("history");
        }
      } catch (error) {
        console.error("Error verificando progreso:", error);
        setViewMode("history");
      } finally {
        setIsLoadingProgress(false);
      }
    };

    loadSavedProgress();
  }, []);

  const phases = [
    { name: "Intereses", icon: "🧠", badge: { id: 'intereses', name: 'Explorador de Intereses', icon: '🧠', description: 'Has descubierto tus pasiones' } },
    { name: "Personalidad", icon: "🎭", badge: { id: 'personalidad', name: 'Conocedor del Ser', icon: '🎭', description: 'Conoces tu esencia' } },
    { name: "Valores", icon: "💎", badge: { id: 'valores', name: 'Guardián de Valores', icon: '💎', description: 'Tienes claro qué importa' } },
    { name: "Talentos", icon: "⚡", badge: { id: 'talentos', name: 'Maestro de Talentos', icon: '⚡', description: 'Reconoces tus fortalezas' } },
    { name: "Escenarios", icon: "🎬", badge: { id: 'escenarios', name: 'Estratega Situacional', icon: '🎬', description: 'Sabes cómo actuar' } },
    { name: "Propósito", icon: "🎯", badge: { id: 'proposito', name: 'Visionario del Futuro', icon: '🎯', description: 'Tienes un propósito claro' } },
  ];

  const allBadges = phases.map((phase, index) => ({
    ...phase.badge,
    unlocked: unlockedBadges.includes(phase.badge.id)
  }));

  const progress = currentPhase >= 0 && currentPhase < phases.length ? (currentPhase / phases.length) * 100 : 0;

  // Mostrar historial si está en modo historia
  if (viewMode === "history") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FCFAF5" }}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="hover:bg-gray-100"
              style={{ color: "#134E4A" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
              className="hover:bg-red-50 border-red-300 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          {isLoadingProgress ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134E4A] mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando...</p>
              </div>
            </div>
          ) : userName ? (
            <TestRunsHistory
              userName={userName}
              onUserNameChange={setUserName}
              onContinue={continueWithRun}
              onStartNew={async () => {
                try {
                  const newRunId = await startTestRun();
                  setRunId(newRunId);
                  setViewMode("test");
                  setCurrentPhase(0); // Ir directo al primer mundo
                } catch (error) {
                  console.error("Error iniciando test:", error);
                  alert("Hubo un error al iniciar el test. Por favor intenta de nuevo.");
                }
              }}
              onViewResult={(runIdParam, result) => {
                // Reconstruir el perfil desde el resultado guardado
                const scoreJson = result.score_json as any;
                const profileData = scoreJson?.profileData;
                
                if (profileData) {
                  // Usar los datos guardados del perfil
                  setPerfil(profileData);
                  setResponses(scoreJson?.responses || {});
                  setRunId(runIdParam);
                  setViewMode("test");
                  setCurrentPhase(6); // Ir a ResultadoTest
                } else {
                  // Fallback: reconstruir desde score_json
                  const reconstructedProfile: PerfilVocacional = {
                    id: result.profile_type,
                    nombre: result.profile_type,
                    descripcion: `Perfil ${result.profile_type}`,
                    fortalezas: scoreJson?.strengths || [],
                    carreras: scoreJson?.recommended_careers || [],
                    consejo: 'Revisa tu resultado completo',
                    icono: '🎯',
                    color: '#10B981',
                    colorFondo: '#D1FAE5'
                  };
                  setPerfil(reconstructedProfile);
                  setResponses(scoreJson?.responses || {});
                  setRunId(runIdParam);
                  setViewMode("test");
                  setCurrentPhase(6);
                }
              }}
            />
          ) : (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-[#134E4A] mb-4">
                  ¡Bienvenido! 👋
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                  Antes de empezar, cuéntanos cómo te llamas
                </p>
              </div>
              <NombreInput 
                onComplete={async (data) => {
                  try {
                    await updateStudentInfo(data);
                    setUserName(data.nombre);
                  } catch (error) {
                    console.error("Error guardando información:", error);
                    // Aunque falle guardar, permitir continuar
                    setUserName(data.nombre);
                  }
                }}
              />
            </div>
          )}
        </main>
      </div>
    );
  }

  // Resto del test (cuando viewMode === "test")
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FCFAF5" }}>
      {currentPhase >= 0 && currentPhase < phases.length && (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#134E4A' }}>
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-montserrat font-bold" style={{ color: '#134E4A' }}>
                    Senda
                  </h1>
                  <p className="text-xs text-gray-600">Test en progreso</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {userName && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 px-3 py-1">
                    ✨ {userName}
                  </Badge>
                )}
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-sm shadow-lg">
                  <Award className="w-4 h-4 mr-1" />
                  {totalXP} XP
                </Badge>
                {currentPhase < phases.length && (
                  <Badge variant="secondary" className="bg-gray-100" style={{ color: "#134E4A" }}>
                    {currentPhase + 1} / {phases.length}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/")}
                  className="text-gray-700 hover:text-senda-primary"
                >
                  🏠 Inicio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewMode("history");
                    setCurrentPhase(-1);
                  }}
                  className="border-gray-300"
                >
                  📊 Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/");
                  }}
                  className="hover:bg-red-50 border-red-300 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Salir
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Header para resultado del test */}
      {(currentPhase === 6 || currentPhase === 7 || currentPhase === 8) && (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#134E4A' }}>
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-montserrat font-bold" style={{ color: '#134E4A' }}>
                    Senda
                  </h1>
                  <p className="text-xs text-gray-600">Resultados</p>
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
                  onClick={() => {
                    setViewMode("history");
                    setCurrentPhase(-1);
                  }}
                  className="border-gray-300"
                >
                  📊 Dashboard
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      {currentPhase >= 0 && currentPhase < phases.length && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4 mb-3">
              <span className="text-sm font-montserrat font-bold" style={{ color: "#134E4A" }}>
                💡 Paso {currentPhase + 1}: Descubre más de ti
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-montserrat font-semibold" style={{ color: "#134E4A" }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{phases[currentPhase]?.icon}</span>
                <span className="text-base font-montserrat font-bold" style={{ color: "#134E4A" }}>
                  {phases[currentPhase]?.name}
                </span>
              </div>
              <div className="flex gap-2">
                {phases.map((phase, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      idx < currentPhase
                        ? 'bg-green-500 text-white shadow-md'
                        : idx === currentPhase
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-110 animate-pulse'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {idx < currentPhase ? '✓' : phase.icon}
                  </div>
                ))}
              </div>
            </div>
            {/* Mensaje motivacional */}
            <div className="mt-3 text-center">
              <p className="text-sm font-lato italic text-gray-600">
                {currentPhase === 0 && "💡 Tus intereses te guiarán hacia lo que amas hacer"}
                {currentPhase === 1 && "🎭 Conocerte a ti mismo es el primer paso al éxito"}
                {currentPhase === 2 && "💎 Tus valores definen quién eres realmente"}
                {currentPhase === 3 && "⚡ Cada talento tuyo es una herramienta para tu futuro"}
                {currentPhase === 4 && "🎬 Las decisiones revelan tu verdadero carácter"}
                {currentPhase === 5 && "🎯 Tu propósito es la estrella que guía tu camino"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Banner FOMO, Mapa de mundos e Insignias - Debajo del header, fuera del main */}
      {currentPhase >= 0 && currentPhase < 6 && (
        <div className="bg-[#FCFAF5]">
          <div className="container mx-auto px-6 pt-6 pb-4">
            {/* Banner FOMO */}
            <FOMOBanner currentProgress={Math.round((Math.floor(currentPhase) / phases.length) * 100)} />
            
            {/* Mapa de mundos */}
            <div className="mt-4">
              <WorldMap
                worlds={phases.map(p => ({ name: p.name, icon: p.icon }))}
                currentWorld={Math.floor(currentPhase)}
                completedWorlds={completedWorlds}
              />
            </div>
            
            {/* Colección de insignias - solo si ya completaste al menos un mundo */}
            {completedWorlds.length > 0 && (
              <div className="mt-4">
                <BadgeCollection badges={allBadges} />
              </div>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-6 py-8">
        {isLoadingProgress && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134E4A] mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando tu progreso...</p>
            </div>
          </div>
        )}

        {!isLoadingProgress && currentPhase === 0 && (
          <MundoIntereses
            responses={responses}
            onComplete={async (data) => {
              const updatedResponses = { ...responses, intereses: data };
              setResponses(updatedResponses);
              setCompletedWorlds([...completedWorlds, 0]);
              setUnlockedBadges([...unlockedBadges, phases[0].badge.id]);
              
              // Guardar en BD
              if (runId) {
                try {
                  await saveAnswer(runId, "intereses", data);
                  console.log("✅ Respuesta de Intereses guardada correctamente");
                } catch (error: any) {
                  console.error("❌ Error guardando respuesta de Intereses:", error);
                  console.error("Detalles del error:", {
                    message: error?.message,
                    details: error?.details,
                    hint: error?.hint,
                    code: error?.code
                  });
                  alert("Hubo un problema al guardar tu progreso. Por favor intenta de nuevo.");
                }
              } else {
                console.warn("⚠️ No hay runId, no se puede guardar");
              }
              
              setCurrentPhase(0.75);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 1 && (
          <MundoPersonalidad
            responses={responses}
            onComplete={async (data) => {
              const updatedResponses = { ...responses, personalidad: data };
              setResponses(updatedResponses);
              setCompletedWorlds([...completedWorlds, 1]);
              setUnlockedBadges([...unlockedBadges, phases[1].badge.id]);
              
              // Guardar en BD
              if (runId) {
                try {
                  await saveAnswer(runId, "personalidad", data);
                  console.log("✅ Respuesta de Personalidad guardada correctamente");
                } catch (error: any) {
                  console.error("❌ Error guardando respuesta de Personalidad:", error);
                  console.error("Detalles del error:", {
                    message: error?.message,
                    details: error?.details,
                    hint: error?.hint,
                    code: error?.code
                  });
                }
              }
              
              setCurrentPhase(1.75);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 2 && (
          <MundoValores
            responses={responses}
            onComplete={async (data) => {
              const updatedResponses = { ...responses, valores: data };
              setResponses(updatedResponses);
              setCompletedWorlds([...completedWorlds, 2]);
              setUnlockedBadges([...unlockedBadges, phases[2].badge.id]);
              
              // Guardar en BD
              if (runId) {
                try {
                  await saveAnswer(runId, "valores", data);
                } catch (error) {
                  console.error("Error guardando respuesta:", error);
                }
              }
              
              setCurrentPhase(2.75);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 3 && (
          <MundoTalentos
            responses={responses}
            onComplete={async (data) => {
              const updatedResponses = { ...responses, talentos: data };
              setResponses(updatedResponses);
              setCompletedWorlds([...completedWorlds, 3]);
              setUnlockedBadges([...unlockedBadges, phases[3].badge.id]);
              
              // Guardar en BD
              if (runId) {
                try {
                  await saveAnswer(runId, "talentos", data);
                } catch (error) {
                  console.error("Error guardando respuesta:", error);
                }
              }
              
              setCurrentPhase(3.75);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 4 && (
          <MundoEscenarios
            responses={responses}
            onComplete={async (data) => {
              const updatedResponses = { ...responses, escenarios: data };
              setResponses(updatedResponses);
              setCompletedWorlds([...completedWorlds, 4]);
              setUnlockedBadges([...unlockedBadges, phases[4].badge.id]);
              
              // Guardar en BD
              if (runId) {
                try {
                  await saveAnswer(runId, "escenarios", data);
                } catch (error) {
                  console.error("Error guardando respuesta:", error);
                }
              }
              
              setCurrentPhase(4.75);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 5 && (
          <MundoPropósito
            responses={responses}
            onComplete={async (data) => {
              const updatedResponses = { ...responses, propósito: data };
              setResponses(updatedResponses);
              setCompletedWorlds([...completedWorlds, 5]);
              setUnlockedBadges([...unlockedBadges, phases[5].badge.id]);
              
              // Guardar en BD
              if (runId) {
                try {
                  await saveAnswer(runId, "proposito", data);
                  // Marcar la corrida como completada
                  await completeTestRun(runId);
                } catch (error) {
                  console.error("Error guardando respuesta:", error);
                }
              }
              
              setCurrentPhase(5.75);
            }}
          />
        )}

        {!isLoadingProgress && [0.75, 1.75, 2.75, 3.75, 4.75, 5.75].includes(currentPhase) && (
          <WorldCompletionScreen
            worldName={phases[Math.floor(currentPhase)].name}
            worldIcon={phases[Math.floor(currentPhase)].icon}
            badgeName={phases[Math.floor(currentPhase)].badge.name}
            badgeIcon={phases[Math.floor(currentPhase)].badge.icon}
            onContinue={() => {
              const newXP = totalXP + 100;
              setTotalXP(newXP);
              setShowXPNotification(true);
              setNotificationMessage(`+100 puntos por completar ${phases[Math.floor(currentPhase)].name}`);
              setTimeout(() => setShowXPNotification(false), 3000);
              
              if (currentPhase === 5.75) {
                setCurrentPhase(5.5);
              } else {
                setCurrentPhase(Math.ceil(currentPhase));
              }
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 5.5 && (
          <AnalysisLoading
            onComplete={async () => {
              // Calcular el perfil REAL basado en las respuestas
              const calculatedProfile = calculateProfile(responses);
              
              // Guardar el resultado final
              if (runId && !savedResultRef.current) {
                try {
                  await saveFinalResult(
                    runId,
                    calculatedProfile.nombre,
                    calculatedProfile.fortalezas,
                    calculatedProfile.carreras,
                    { 
                      responses,
                      profileData: calculatedProfile
                    }
                  );
                  
                  // Marcar run como completada
                  await completeTestRun(runId);
                  
                  // Actualizar journey progress - marcar fase test como completada
                  await updateJourneyProgress('test', 'completed', {
                    test_run_id: runId,
                    current_world: 6
                  });
                  
                  savedResultRef.current = true;
                  console.log("✅ Resultado guardado correctamente");
                  console.log("✅ Journey progress actualizado - Test completado");
                } catch (error) {
                  console.error("❌ Error guardando resultado:", error);
                  console.error("Detalles:", {
                    message: (error as any)?.message,
                    details: (error as any)?.details,
                    hint: (error as any)?.hint,
                    code: (error as any)?.code,
                  });
                }
              }
              
              setPerfil(calculatedProfile);
              setCurrentPhase(6);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 6 && perfil && (
          <ResultadoTest
            perfil={perfil}
            respuestas={responses}
            onContinue={() => setCurrentPhase(7)}
            onBackToDashboard={() => {
              setViewMode("history");
              setCurrentPhase(-1);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 7 && perfil && (
          <MiniHackathon
            perfil={perfil}
            onComplete={() => {
              setHackathonCompleted(true);
              const newXP = totalXP + 200;
              setTotalXP(newXP);
              setShowXPNotification(true);
              setNotificationMessage('+200 puntos por completar el Hackathon');
              setTimeout(() => setShowXPNotification(false), 3000);
              setCurrentPhase(8);
            }}
          />
        )}

        {!isLoadingProgress && currentPhase === 8 && perfil && (
          <Dashboard
            perfil={perfil}
            hackathonCompleted={hackathonCompleted}
          />
        )}

        {/* Notificación de XP */}
        <XPNotification 
          message={notificationMessage} 
          show={showXPNotification}
        />
      </main>
    </div>
  );
}
