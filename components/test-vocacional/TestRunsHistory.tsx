"use client";

import { useEffect, useState } from "react";
import { getAllTestRuns, getTestResult, deleteTestRun, getUserName, updateUserName } from "@/lib/senda-db";
import { Database } from "@/integrations/supabase/types";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

type TestRun = Database["public"]["Tables"]["test_runs"]["Row"];
type TestResult = Database["public"]["Tables"]["test_results"]["Row"];

interface RunWithResult extends TestRun {
  result?: TestResult | null;
}

interface TestRunsHistoryProps {
  userName: string | null;
  onUserNameChange: (name: string) => void;
  onContinue: (runId: string) => void;
  onStartNew: () => void;
  onViewResult: (runId: string, result: TestResult) => void;
}

export default function TestRunsHistory({ 
  userName, 
  onUserNameChange, 
  onContinue, 
  onStartNew, 
  onViewResult 
}: TestRunsHistoryProps) {
  const [runs, setRuns] = useState<RunWithResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [runToDelete, setRunToDelete] = useState<string | null>(null);
  const [deleteModalTitle, setDeleteModalTitle] = useState("");
  const [deleteModalMessage, setDeleteModalMessage] = useState("");

  useEffect(() => {
    loadRuns();
  }, []);

  useEffect(() => {
    setTempName(userName || "");
  }, [userName]);

  const loadRuns = async () => {
    try {
      const allRuns = await getAllTestRuns();
      
      // Cargar resultados para runs completadas
      const runsWithResults = await Promise.all(
        allRuns.map(async (run) => {
          if (run.status === "completed") {
            const result = await getTestResult(run.id);
            return { ...run, result };
          }
          return run;
        })
      );

      setRuns(runsWithResults);
    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteRun = async (runId: string) => {
    try {
      await deleteTestRun(runId);
      // Recargar la lista
      await loadRuns();
    } catch (error) {
      console.error("Error eliminando run:", error);
      alert("Hubo un error al eliminar el test. Por favor intenta de nuevo.");
    }
  };

  const openDeleteModal = (runId: string, isInProgress: boolean) => {
    setRunToDelete(runId);
    if (isInProgress) {
      setDeleteModalTitle("¿Eliminar test en progreso?");
      setDeleteModalMessage("Perderás todo el progreso de este test. ¿Estás seguro de que quieres continuar?");
    } else {
      setDeleteModalTitle("¿Eliminar test completado?");
      setDeleteModalMessage("Este test ya está completado. ¿Estás seguro de que quieres eliminarlo de tu historial?");
    }
    setShowDeleteModal(true);
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) {
      alert("Por favor ingresa un nombre");
      return;
    }

    try {
      await updateUserName(tempName.trim());
      onUserNameChange(tempName.trim());
      setIsEditingName(false);
    } catch (error) {
      console.error("Error actualizando nombre:", error);
      alert("Hubo un error al actualizar tu nombre. Por favor intenta de nuevo.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134E4A] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu historial...</p>
        </div>
      </div>
    );
  }

  const inProgressRun = runs.find((run) => run.status === "in_progress");
  const completedRuns = runs.filter((run) => run.status === "completed");

  return (
    <div className="max-w-4xl mx-auto">
      {/* Saludo personalizado con nombre editable */}
      {userName && (
        <div className="mb-8 text-center">
          {isEditingName ? (
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                className="text-3xl font-bold text-[#134E4A] border-b-2 border-[#134E4A] bg-transparent text-center outline-none px-4"
                placeholder="Tu nombre"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="bg-[#134E4A] text-white px-4 py-2 rounded-lg hover:bg-[#0F766E] transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setIsEditingName(false);
                  setTempName(userName);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl font-bold text-[#134E4A]">
                ¡Hola, {userName}! 👋
              </h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Editar nombre"
              >
                <Pencil className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#134E4A] mb-4">
          Test Vocacional SENDA
        </h1>
        <p className="text-gray-600 text-lg">
          Descubre tu camino profesional
        </p>
      </div>

      {/* Test en progreso */}
      {inProgressRun && (
        <div className="mb-8 bg-gradient-to-r from-[#134E4A] to-[#0F766E] rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Tienes un test en progreso</h2>
              <p className="text-white/90 mb-1">
                Iniciado: {formatDate(inProgressRun.started_at)}
              </p>
              <p className="text-white/80 text-sm">
                Continúa donde lo dejaste
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openDeleteModal(inProgressRun.id, true)}
                className="bg-red-500/20 text-white p-3 rounded-lg hover:bg-red-500/30 transition-colors"
                title="Eliminar test"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onContinue(inProgressRun.id)}
                className="bg-white text-[#134E4A] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Continuar Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón para empezar nuevo test */}
      <div className="mb-8">
        <button
          onClick={onStartNew}
          className="w-full bg-[#134E4A] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#0F766E] transition-colors shadow-md"
        >
          {runs.length > 0 ? "Empezar Nuevo Test" : "Empezar Test"}
        </button>
      </div>

      {/* Historial de tests completados */}
      {completedRuns.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[#134E4A] mb-4">
            Tests Completados ({completedRuns.length})
          </h2>
          <div className="space-y-4">
            {completedRuns.map((run) => (
              <div
                key={run.id}
                className="border border-gray-200 rounded-lg p-5 hover:border-[#134E4A] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600 text-xl">✓</span>
                      <h3 className="font-semibold text-gray-900">
                        Test completado
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Completado: {run.completed_at ? formatDate(run.completed_at) : "N/A"}
                    </p>
                    {run.result && (
                      <p className="text-sm text-[#134E4A] font-medium">
                        Perfil: {run.result.profile_type}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openDeleteModal(run.id, false)}
                      className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                      title="Eliminar test"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (run.result) {
                          onViewResult(run.id, run.result);
                        } else {
                          console.warn("No hay resultado disponible para este test");
                        }
                      }}
                      className="bg-[#134E4A] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0F766E] transition-colors"
                    >
                      Ver Resultado
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje si no hay historial */}
      {runs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-lg mb-2">
            Aún no has tomado ningún test
          </p>
          <p className="text-gray-500 text-sm">
            Haz clic en "Empezar Test" para descubrir tu perfil vocacional
          </p>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setRunToDelete(null);
        }}
        onConfirm={() => {
          if (runToDelete) {
            handleDeleteRun(runToDelete);
          }
        }}
        title={deleteModalTitle}
        message={deleteModalMessage}
      />
    </div>
  );
}
