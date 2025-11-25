import { supabase } from "@/integrations/supabase/client";

// Obtener todos los colegios activos
export async function getAllColegios() {
  const { data, error } = await supabase
    .from("colegios")
    .select("*")
    .eq("activo", true)
    .order("nombre");

  if (error) {
    console.error("Error al obtener colegios:", error);
    throw error;
  }

  return data || [];
}

// Obtener un colegio por código
export async function getColegioByCode(codigo: string) {
  const { data, error } = await supabase
    .from("colegios")
    .select("*")
    .eq("codigo", codigo)
    .single();

  if (error) {
    console.error("Error al obtener colegio:", error);
    return null;
  }

  return data;
}

// Actualizar colegio y grado del estudiante
export async function updateStudentSchoolInfo(
  userId: string,
  colegioId: string,
  grado: string
) {
  const { error } = await supabase
    .from("usuarios")
    .update({
      colegio_id: colegioId,
      grado: grado,
    })
    .eq("id", userId);

  if (error) {
    console.error("Error al actualizar info escolar:", error);
    throw error;
  }
}

// Obtener info escolar del estudiante
export async function getStudentSchoolInfo(userId: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select(`
      colegio_id,
      grado,
      colegios (
        id,
        nombre,
        codigo
      )
    `)
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error al obtener info escolar:", error);
    return null;
  }

  return data;
}

// Lista de grados disponibles
export const GRADOS = [
  { value: "1ro", label: "1ro de Secundaria" },
  { value: "2do", label: "2do de Secundaria" },
  { value: "3ro", label: "3ro de Secundaria" },
  { value: "4to", label: "4to de Secundaria" },
  { value: "5to", label: "5to de Secundaria" },
];
