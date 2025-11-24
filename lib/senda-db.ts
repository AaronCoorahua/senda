// src/lib/senda-db.ts
import { supabase } from "@/integrations/supabase/client";

/** Devuelve el UID del usuario logueado */
async function getUid() {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
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

  const { error } = await supabase.from("test_answers").upsert(
    {
      user_id,
      run_id: runId,
      section, // texto sin tilde
      answer, // JSONB
      created_at: new Date().toISOString(),
    },
    { onConflict: "run_id,section" },
  );

  if (error) throw error;
}

/** Marca la corrida como completada */
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

  if (error) throw error;
}

/** Guarda el resultado final (perfil) de la corrida */
export async function saveFinalResult(runId: string, profileType: string) {
  const user_id = await getUid();
  if (!user_id) throw new Error("No hay usuario logueado");

  const { error } = await supabase.from("test_results").insert({
    user_id,
    run_id: runId,
    profile_type: profileType,
    created_at: new Date().toISOString(),
  });

  if (error) throw error;
}
