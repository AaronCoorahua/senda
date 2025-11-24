"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Compass, Award } from "lucide-react";
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FCFAF5" }}>
      {currentPhase >= 0 && currentPhase < phases.length && (
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/")}
                  className="hover:bg-gray-100"
                  style={{ color: "#134E4A" }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
                <div className="flex items-center space-x-2">
                  <Compass className="w-6 h-6" style={{ color: "#134E4A" }} />
                  <h1 className="text-xl font-montserrat font-bold" style={{ color: "#134E4A" }}>
                    Test Vocacional Senda
                  </h1>
                  {userName && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 px-4 py-1">
                      ✨ {userName}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Contador de XP */}
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-base shadow-lg">
                  <Award className="w-4 h-4 mr-2" />
                  {totalXP} Puntos
                </Badge>
                {currentPhase < phases.length && (
                  <Badge variant="secondary" className="bg-gray-100" style={{ color: "#134E4A" }}>
                    {currentPhase + 1} / {phases.length}
                  </Badge>
                )}
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
              <Progress value={progress} className="flex-1 h-3" />
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

      <main className="container mx-auto px-6 py-8">
        {currentPhase === -1 && (
          <BienvenidaTest onStart={() => setCurrentPhase(-0.5)} />
        )}

        {currentPhase === -0.5 && (
          <NombreInput 
            onComplete={(name: string) => {
              setUserName(name);
              setCurrentPhase(0);
            }}
          />
        )}

        {currentPhase === 0 && (
          <MundoIntereses
            responses={responses}
            onComplete={(data) => {
              setResponses({ ...responses, intereses: data });
              setCompletedWorlds([...completedWorlds, 0]);
              setUnlockedBadges([...unlockedBadges, phases[0].badge.id]);
              setCurrentPhase(0.75);
            }}
          />
        )}

        {currentPhase === 1 && (
          <MundoPersonalidad
            responses={responses}
            onComplete={(data) => {
              setResponses({ ...responses, personalidad: data });
              setCompletedWorlds([...completedWorlds, 1]);
              setUnlockedBadges([...unlockedBadges, phases[1].badge.id]);
              setCurrentPhase(1.75);
            }}
          />
        )}

        {currentPhase === 2 && (
          <MundoValores
            responses={responses}
            onComplete={(data) => {
              setResponses({ ...responses, valores: data });
              setCompletedWorlds([...completedWorlds, 2]);
              setUnlockedBadges([...unlockedBadges, phases[2].badge.id]);
              setCurrentPhase(2.75);
            }}
          />
        )}

        {currentPhase === 3 && (
          <MundoTalentos
            responses={responses}
            onComplete={(data) => {
              setResponses({ ...responses, talentos: data });
              setCompletedWorlds([...completedWorlds, 3]);
              setUnlockedBadges([...unlockedBadges, phases[3].badge.id]);
              setCurrentPhase(3.75);
            }}
          />
        )}

        {currentPhase === 4 && (
          <MundoEscenarios
            responses={responses}
            onComplete={(data) => {
              setResponses({ ...responses, escenarios: data });
              setCompletedWorlds([...completedWorlds, 4]);
              setUnlockedBadges([...unlockedBadges, phases[4].badge.id]);
              setCurrentPhase(4.75);
            }}
          />
        )}

        {currentPhase === 5 && (
          <MundoPropósito
            responses={responses}
            onComplete={(data) => {
              setResponses({ ...responses, propósito: data });
              setCompletedWorlds([...completedWorlds, 5]);
              setUnlockedBadges([...unlockedBadges, phases[5].badge.id]);
              setCurrentPhase(5.75);
            }}
          />
        )}

        {[0.75, 1.75, 2.75, 3.75, 4.75, 5.75].includes(currentPhase) && (
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

        {currentPhase === 5.5 && (
          <AnalysisLoading
            onComplete={() => {
              // Aquí deberías calcular el perfil basado en las respuestas
              // Por ahora usamos un perfil de ejemplo
              const exampleProfile: PerfilVocacional = {
                id: 'ejemplo',
                nombre: 'Perfil Ejemplo',
                descripcion: 'Este es un perfil de ejemplo',
                fortalezas: ['Creatividad', 'Liderazgo'],
                carreras: ['Ingeniería', 'Diseño'],
                consejo: 'Sigue explorando tus intereses',
                icono: '🚀',
                color: '#10B981',
                colorFondo: '#D1FAE5'
              };
              setPerfil(exampleProfile);
              setCurrentPhase(6);
            }}
          />
        )}

        {currentPhase === 6 && perfil && (
          <ResultadoTest
            perfil={perfil}
            respuestas={responses}
            onContinue={() => setCurrentPhase(7)}
          />
        )}

        {currentPhase === 7 && perfil && (
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

        {currentPhase === 8 && perfil && (
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

        {/* Mapa de mundos (solo en fases 0-5) */}
        {currentPhase >= 0 && currentPhase < 6 && Number.isInteger(currentPhase) && (
          <WorldMap
            worlds={phases.map(p => ({ name: p.name, icon: p.icon }))}
            currentWorld={Math.floor(currentPhase)}
            completedWorlds={completedWorlds}
          />
        )}

        {/* Colección de insignias */}
        {currentPhase >= 0 && (
          <BadgeCollection badges={allBadges} />
        )}
      </main>
    </div>
  );
}
