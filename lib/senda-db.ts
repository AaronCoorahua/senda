// lib/senda-db.ts
import { supabase } from "@/integrations/supabase/client";

/** Devuelve el UID del usuario logueado */
async function getUid() {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

/** Obtiene el nombre del usuario desde la tabla usuarios */
export async function getUserName() {
  const user_id = await getUid();
  if (!user_id) return null;

  const { data, error } = await supabase
    .from("usuarios")
    .select("nombre")
    .eq("id", user_id)
    .single();

  if (error) return null;
  return data?.nombre || null;
}

/** Actualiza el nombre del usuario */
export async function updateUserName(nombre: string) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  const { error } = await supabase
    .from("usuarios")
    .update({ nombre })
    .eq("id", user_id);

  if (error) throw error;
}

/** Actualiza información escolar del estudiante */
export async function updateStudentInfo(data: {
  nombre: string;
  colegioId: string;
  grado: string;
  aula: string;
}) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  const { error } = await supabase
    .from("usuarios")
    .update({
      nombre: data.nombre,
      colegio_id: data.colegioId,
      grado: data.grado,
      aula: data.aula,
    })
    .eq("id", user_id);

  if (error) throw error;
}

/** Elimina una run específica (y todas sus respuestas asociadas por CASCADE) */
export async function deleteTestRun(runId: string) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  // Verificar que la run pertenece al usuario
  const { error } = await supabase
    .from("test_runs")
    .delete()
    .eq("id", runId)
    .eq("user_id", user_id);

  if (error) throw error;
}

/** Obtiene todas las corridas del usuario (completadas e in_progress) */
export async function getAllTestRuns() {
  const user_id = await getUid();
  if (!user_id) return [];

  const { data, error } = await supabase
    .from("test_runs")
    .select("*")
    .eq("user_id", user_id)
    .order("started_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/** Obtiene la última corrida en progreso del usuario, o null si no hay */
export async function getActiveTestRun() {
  const user_id = await getUid();
  if (!user_id) return null;

  const { data, error } = await supabase
    .from("test_runs")
    .select("*")
    .eq("user_id", user_id)
    .eq("status", "in_progress")
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** Obtiene todas las respuestas guardadas de una corrida específica */
export async function getTestAnswers(runId: string) {
  const user_id = await getUid();
  if (!user_id) return [];

  const { data, error } = await supabase
    .from("test_answers")
    .select("*")
    .eq("run_id", runId)
    .eq("user_id", user_id);

  if (error) throw error;
  return data || [];
}

/** Obtiene el resultado final de una corrida completada */
export async function getTestResult(runId: string) {
  const user_id = await getUid();
  if (!user_id) return null;

  const { data, error } = await supabase
    .from("test_results")
    .select("*")
    .eq("run_id", runId)
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** Crea una corrida del test y devuelve su id */
export async function startTestRun() {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  const { data, error } = await supabase
    .from("test_runs")
    .insert({
      user_id,
      status: "in_progress",
      started_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

/** Guarda/actualiza la respuesta de una sección (upsert por run_id+section) */
export async function saveAnswer(
  runId: string,
  section: "intereses" | "personalidad" | "valores" | "talentos" | "escenarios" | "proposito",
  answer: any,
) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  // Calcular metadata útil para dashboards
  const questionCount = answer ? Object.keys(answer).length : 0;
  const completionTime = new Date().toISOString();

  // Usar upsert nativo de Supabase (más eficiente y sin race conditions)
  const { error } = await supabase
    .from("test_answers")
    .upsert({
      user_id,
      run_id: runId,
      section,
      answer,
      created_at: completionTime,
      question_code: `${section}_complete`,
      question_type: "section_complete",
      answer_key: section,
      answer_label: `Sección ${section} completada`,
      answer_value: questionCount,
      phase_key: section,
    }, {
      onConflict: 'run_id,section', // Especificar las columnas del constraint único
      ignoreDuplicates: false, // Actualizar si existe
    });

  if (error) {
    console.error("Error insertando respuesta:", error);
    console.error("Detalles del error:", error);
    throw error;
  }
}

/** Marca una corrida como completada en test_runs */
export async function completeTestRun(runId: string) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  const { error } = await supabase
    .from("test_runs")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", runId)
    .eq("user_id", user_id);

  if (error) {
    console.error("Error marcando test_run como completado:", error);
    throw error;
  }
}

/** Guarda el resultado final del test junto con metadatos útiles */
export async function saveFinalResult(
  runId: string,
  profileType: string,
  strengths: string[],
  recommendedCareers: string[],
  scoreJson: Record<string, any>
) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  const { error } = await supabase.from("test_results").insert({
    user_id,
    run_id: runId,
    profile_type: profileType,
    strengths: strengths, // Guardar como array directamente
    recommended_careers: recommendedCareers, // Guardar como array directamente
    score_json: scoreJson,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error guardando resultado final:", error);
    throw error;
  }
}

export interface JourneyProgress {
  current_phase: 'test' | 'carreras' | 'mini_reto' | 'linkedin';
  phases: {
    test: {
      status: 'not_started' | 'in_progress' | 'completed';
      completed_at: string | null;
      current_world: number;
      test_run_id: string | null;
    };
    carreras: {
      status: 'locked' | 'in_progress' | 'completed';
      completed_at: string | null;
      viewed_careers: string[];
    };
    mini_reto: {
      status: 'locked' | 'in_progress' | 'completed';
      completed_at: string | null;
      reto_completed: boolean;
    };
    linkedin: {
      status: 'locked' | 'in_progress' | 'completed';
      completed_at: string | null;
      profile_created: boolean;
    };
  };
  last_updated: string | null;
}

const PHASE_SEQUENCE: JourneyProgress['current_phase'][] = ['test', 'carreras', 'mini_reto', 'linkedin'];

export function buildDefaultJourneyProgress(): JourneyProgress {
  const timestamp = new Date().toISOString();
  return {
    current_phase: 'test',
    phases: {
      test: {
        status: 'in_progress',
        completed_at: null,
        current_world: 0,
        test_run_id: null
      },
      carreras: {
        status: 'locked',
        completed_at: null,
        viewed_careers: []
      },
      mini_reto: {
        status: 'locked',
        completed_at: null,
        reto_completed: false
      },
      linkedin: {
        status: 'locked',
        completed_at: null,
        profile_created: false
      }
    },
    last_updated: timestamp
  };
}

/** Obtiene el progreso del journey del usuario */
export async function getJourneyProgress(): Promise<JourneyProgress | null> {
  const user_id = await getUid();
  if (!user_id) {
    console.error("getJourneyProgress: No hay usuario autenticado");
    return null;
  }

  const { data, error } = await supabase.rpc('get_journey_progress');

  if (error) {
    console.error("Error obteniendo progreso:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return null;
  }

  console.log("Journey progress obtenido:", data);
  return data as JourneyProgress;
}

/** Actualiza el progreso del journey */
export async function updateJourneyProgress(
  phase: 'test' | 'carreras' | 'mini_reto' | 'linkedin',
  status: 'not_started' | 'in_progress' | 'completed' | 'locked',
  additionalData: Record<string, any> = {}
): Promise<JourneyProgress | null> {
  const user_id = await getUid();
  if (!user_id) {
    console.error("updateJourneyProgress: No hay usuario autenticado");
    return null;
  }

  const { data: userJourney, error: journeyError } = await supabase
    .from("usuarios")
    .select("journey_progress")
    .eq("id", user_id)
    .single();

  if (journeyError) {
    console.error("❌ No se pudo leer journey_progress:", journeyError);
    return null;
  }


  let journey = (userJourney?.journey_progress as JourneyProgress) ?? null;
  if (!journey || typeof journey !== 'object' || !journey.phases) {
    journey = buildDefaultJourneyProgress();
  }

  type MutableJourney = JourneyProgress & Record<string, any>;

  const updatedJourney: MutableJourney = {
    ...journey,
    phases: {
      ...journey.phases
    },
    last_updated: journey.last_updated ?? null
  };

  const phaseKey = phase as keyof JourneyProgress['phases'];
  const currentPhaseData = (journey.phases as any)[phaseKey] ?? {};
  const mergedPhaseData = {
    ...currentPhaseData,
    ...additionalData,
    status,
  } as Record<string, any>;

  if (status === 'completed') {
    mergedPhaseData.completed_at = new Date().toISOString();
  }

  (updatedJourney.phases as any)[phaseKey] = mergedPhaseData;

  if (status === 'completed') {
    const currentIndex = PHASE_SEQUENCE.indexOf(phase);
    const nextPhase = currentIndex >= 0 ? PHASE_SEQUENCE[currentIndex + 1] : null;

    if (nextPhase) {
      updatedJourney.current_phase = nextPhase;
      const nextPhaseKey = nextPhase as keyof JourneyProgress['phases'];
      const nextPhaseData = {
        ...(updatedJourney.phases as any)[nextPhaseKey],
        status: 'in_progress' as const
      };
      (updatedJourney.phases as any)[nextPhaseKey] = nextPhaseData;
    } else {
      updatedJourney.current_phase = 'linkedin';
    }
  } else {
    updatedJourney.current_phase = phase;
  }

  updatedJourney.last_updated = new Date().toISOString();

  const { data, error } = await supabase
    .from("usuarios")
    .update({ journey_progress: updatedJourney })
    .eq("id", user_id)
    .select("journey_progress")
    .single();

  if (error) {
    console.error("❌ Error guardando journey_progress:", error);
    return null;
  }

  console.log("✅ Journey progress actualizado (client-side):", data?.journey_progress);
  return data?.journey_progress as JourneyProgress;
}

/** Reinicia el journey (para volver a tomar el test) */
export async function resetJourneyProgress(): Promise<JourneyProgress | null> {
  const user_id = await getUid();
  if (!user_id) {
    console.error("resetJourneyProgress: No hay usuario autenticado");
    return null;
  }

  const freshJourney = buildDefaultJourneyProgress();

  const { data, error } = await supabase
    .from("usuarios")
    .update({ journey_progress: freshJourney })
    .eq("id", user_id)
    .select("journey_progress")
    .single();

  if (error) {
    console.error("Error reiniciando progreso:", error);
    return null;
  }

  return data?.journey_progress as JourneyProgress;
}

/** Obtiene los datos completos del perfil del usuario para "Ver Resumen" */
export async function getUserProfileSummary() {
  const user_id = await getUid();
  if (!user_id) return null;

  // Obtener datos del usuario
  const { data: userData, error: userError } = await supabase
    .from("usuarios")
    .select("nombre, colegio_id, grado, journey_progress")
    .eq("id", user_id)
    .single();

  if (userError) {
    console.error("Error obteniendo usuario:", userError);
    return null;
  }

  // Obtener el último resultado del test
  const { data: resultData, error: resultError } = await supabase
    .from("test_results")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (resultError) {
    console.error("Error obteniendo resultado:", resultError);
  }

  // Obtener información del colegio
  let colegioNombre = null;
  if (userData.colegio_id) {
    const { data: colegioData } = await supabase
      .from("colegios")
      .select("nombre")
      .eq("id", userData.colegio_id)
      .single();
    
    colegioNombre = colegioData?.nombre || null;
  }

  return {
    nombre: userData.nombre,
    colegio: colegioNombre,
    grado: userData.grado,
    journey_progress: userData.journey_progress as JourneyProgress,
    profile_type: resultData?.profile_type || null,
    recommended_careers: resultData?.score_json?.recommended_careers || [],
    strengths: resultData?.score_json?.profileData?.fortalezas || [],
    score_json: resultData?.score_json || null,
    test_completed_at: resultData?.created_at || null
  };
}
