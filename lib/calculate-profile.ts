// lib/calculate-profile.ts
// Algoritmo para calcular el perfil vocacional basado en las respuestas del test

import { TestResponse, PerfilVocacional } from "@/app/test-vocacional/page";
import { getCarrerasByPerfil } from "@/data/carreras-data";

export function calculateProfile(responses: TestResponse): PerfilVocacional {
  // Análisis de intereses dominantes
  const intereses = responses.intereses || {};
  const interesesArray = Object.entries(intereses);
  
  // Análisis de personalidad
  const personalidad = responses.personalidad || {};
  const extroversion = (personalidad.extrovertido || 0) - (personalidad.introvertido || 0);
  const practicidad = (personalidad.práctico || 0) - (personalidad.teórico || 0);
  
  // Análisis de valores
  const valores = responses.valores || {};
  
  // Determinar perfil basado en patrones
  let perfilId = "explorador-creativo";
  let perfilNombre = "Explorador Creativo";
  let icono = "🌟";
  let color = "#10B981";
  let colorFondo = "#D1FAE5";
  let fortalezas: string[] = [];
  let carreras: string[] = [];
  let consejo = "";

  // Lógica de clasificación mejorada
  const interesesKeys = Object.keys(intereses);
  const dominantInterest = interesesKeys[0] || "general";
  
  // STEM / Tecnología
  if (dominantInterest.includes("tecnología") || dominantInterest.includes("ciencia") || dominantInterest.includes("matemáticas")) {
    perfilId = "analista-estratégico";
    perfilNombre = "Analista Estratégico";
    icono = "💻";
    color = "#3B82F6";
    colorFondo = "#DBEAFE";
    fortalezas = ["Pensamiento lógico", "Resolución de problemas", "Innovación tecnológica", "Análisis de datos"];
    carreras = getCarrerasByPerfil("analista-estratégico");
    consejo = "Tu mente analítica y pasión por la tecnología te abren las puertas a las carreras del futuro. Mantente actualizado con las últimas tendencias tech.";
  }
  
  // Creatividad / Arte / Diseño
  else if (dominantInterest.includes("arte") || dominantInterest.includes("diseño") || dominantInterest.includes("creatividad")) {
    perfilId = "explorador-creativo";
    perfilNombre = "Explorador Creativo";
    icono = "🎨";
    color = "#EC4899";
    colorFondo = "#FCE7F3";
    fortalezas = ["Creatividad", "Visión estética", "Comunicación visual", "Innovación artística"];
    carreras = getCarrerasByPerfil("explorador-creativo");
    consejo = "Tu creatividad es tu superpoder. Combina tu visión artística con habilidades técnicas para destacar en el mercado creativo.";
  }
  
  // Negocios / Liderazgo
  else if (dominantInterest.includes("negocios") || dominantInterest.includes("liderazgo") || dominantInterest.includes("emprendimiento")) {
    perfilId = "líder-emprendedor";
    perfilNombre = "Líder Emprendedor";
    icono = "📊";
    color = "#F59E0B";
    colorFondo = "#FEF3C7";
    fortalezas = ["Liderazgo", "Visión estratégica", "Toma de decisiones", "Gestión de equipos"];
    carreras = getCarrerasByPerfil("líder-emprendedor");
    consejo = "Tu capacidad de liderazgo y visión estratégica te posicionan como un futuro líder empresarial. Desarrolla tu red de contactos desde ahora.";
  }
  
  // Salud / Ciencias de la vida
  else if (dominantInterest.includes("salud") || dominantInterest.includes("medicina") || dominantInterest.includes("biología")) {
    perfilId = "guía-humanista";
    perfilNombre = "Guía Humanista";
    icono = "⚕️";
    color = "#10B981";
    colorFondo = "#D1FAE5";
    fortalezas = ["Empatía", "Atención al detalle", "Resistencia al estrés", "Compromiso social"];
    carreras = getCarrerasByPerfil("guía-humanista");
    consejo = "Tu vocación de servicio y empatía son fundamentales en las ciencias de la salud. La constancia y dedicación serán tus mejores aliados.";
  }
  
  // Comunicación / Humanidades
  else if (dominantInterest.includes("comunicación") || dominantInterest.includes("escritura") || dominantInterest.includes("idiomas")) {
    perfilId = "comunicador-influyente";
    perfilNombre = "Comunicador Influyente";
    icono = "📢";
    color = "#8B5CF6";
    colorFondo = "#EDE9FE";
    fortalezas = ["Comunicación efectiva", "Creatividad narrativa", "Persuasión", "Adaptabilidad cultural"];
    carreras = getCarrerasByPerfil("comunicador-influyente");
    consejo = "Tu habilidad para conectar con las personas y contar historias es invaluable en la era digital. Domina múltiples plataformas de comunicación.";
  }
  
  // Default / Explorador
  else {
    fortalezas = ["Versatilidad", "Curiosidad", "Adaptabilidad", "Aprendizaje continuo"];
    carreras = getCarrerasByPerfil("explorador-creativo");
    consejo = "Tu perfil versátil te permite explorar múltiples caminos. Aprovecha esta flexibilidad para descubrir tu verdadera pasión.";
  }

  // Ajustar según personalidad
  if (extroversion > 3) {
    fortalezas.push("Trabajo en equipo");
  }
  if (practicidad > 3) {
    fortalezas.push("Orientación a resultados");
  }

  return {
    id: perfilId,
    nombre: perfilNombre,
    descripcion: `Basado en tus respuestas, tienes un perfil ${perfilNombre.toLowerCase()} con gran potencial en estas áreas.`,
    fortalezas,
    carreras,
    consejo,
    icono,
    color,
    colorFondo,
  };
}
