-- =====================================================
-- VERIFICACIÓN: ¿Qué función está activa en Supabase?
-- =====================================================
-- Copia y ejecuta esto en Supabase SQL Editor
-- =====================================================

-- Ver TODAS las versiones de update_journey_progress
SELECT 
  proname as function_name,
  pg_get_function_arguments(oid) as arguments,
  pg_get_functiondef(oid) as definition
FROM pg_proc
WHERE proname = 'update_journey_progress';

-- =====================================================
-- Si ves JSONB en los argumentos, la función NO se actualizó
-- Debería mostrar: p_phase text, p_status text, p_additional_data text DEFAULT NULL::text
-- =====================================================
