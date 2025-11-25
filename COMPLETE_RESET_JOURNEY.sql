-- =====================================================
-- RESETEO COMPLETO Y REINSTALACIÓN
-- =====================================================
-- Ejecuta TODO esto en Supabase SQL Editor
-- =====================================================

-- PASO 1: Eliminar TODAS las versiones posibles de la función
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT oid::regprocedure::text AS func_signature
        FROM pg_proc 
        WHERE proname = 'update_journey_progress'
        AND pronamespace = 'public'::regnamespace
    LOOP
        EXECUTE 'DROP FUNCTION ' || r.func_signature || ' CASCADE';
        RAISE NOTICE 'Eliminada: %', r.func_signature;
    END LOOP;
END $$;

-- PASO 2: Verificar que no quede ninguna
SELECT 
    proname as function_name,
    pg_get_function_arguments(oid) as arguments
FROM pg_proc
WHERE proname = 'update_journey_progress';
-- Si esto devuelve filas, algo salió mal

-- PASO 3: Crear la función NUEVA con JSONB nativo
CREATE OR REPLACE FUNCTION public.update_journey_progress(
  p_phase TEXT,
  p_status TEXT,
  p_additional_data JSONB DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_journey JSONB;
  v_phase_data JSONB;
  v_next_phase TEXT;
BEGIN
  -- Obtener el ID del usuario autenticado
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No hay usuario autenticado';
  END IF;

  RAISE NOTICE 'Usuario: %, Fase: %, Status: %, Data: %', v_user_id, p_phase, p_status, p_additional_data;

  -- Obtener el journey_progress actual
  SELECT journey_progress INTO v_journey
  FROM public.usuarios
  WHERE id = v_user_id;

  RAISE NOTICE 'Journey actual: %', v_journey;

  -- Si no existe, crear estructura por defecto
  IF v_journey IS NULL OR v_journey = 'null'::jsonb THEN
    v_journey := jsonb_build_object(
      'current_phase', 'test',
      'phases', jsonb_build_object(
        'test', jsonb_build_object('status', 'in_progress', 'completed_at', null, 'current_world', 0, 'test_run_id', null),
        'carreras', jsonb_build_object('status', 'locked', 'completed_at', null, 'viewed_careers', '[]'::jsonb),
        'mini_reto', jsonb_build_object('status', 'locked', 'completed_at', null, 'reto_completed', false),
        'linkedin', jsonb_build_object('status', 'locked', 'completed_at', null, 'profile_created', false)
      )
    );
    RAISE NOTICE 'Journey creado desde cero';
  END IF;

  -- Obtener los datos actuales de la fase
  v_phase_data := COALESCE(v_journey->'phases'->p_phase, '{}'::jsonb);

  -- Actualizar el status
  v_phase_data := jsonb_set(v_phase_data, '{status}', to_jsonb(p_status), true);

  -- Si se completó, agregar timestamp
  IF p_status = 'completed' THEN
    v_phase_data := jsonb_set(v_phase_data, '{completed_at}', to_jsonb(NOW()), true);
  END IF;

  -- Fusionar datos adicionales si no es NULL
  IF p_additional_data IS NOT NULL THEN
    v_phase_data := v_phase_data || p_additional_data;
    RAISE NOTICE 'Datos adicionales fusionados: %', p_additional_data;
  END IF;

  -- Actualizar la fase en el journey
  v_journey := jsonb_set(v_journey, ARRAY['phases', p_phase], v_phase_data, true);

  -- Si se completó esta fase, actualizar current_phase y desbloquear la siguiente
  IF p_status = 'completed' THEN
    CASE p_phase
      WHEN 'test' THEN v_next_phase := 'carreras';
      WHEN 'carreras' THEN v_next_phase := 'mini_reto';
      WHEN 'mini_reto' THEN v_next_phase := 'linkedin';
      ELSE v_next_phase := NULL;
    END CASE;

    IF v_next_phase IS NOT NULL THEN
      v_journey := jsonb_set(v_journey, '{current_phase}', to_jsonb(v_next_phase), true);
      v_journey := jsonb_set(
        v_journey, 
        ARRAY['phases', v_next_phase, 'status'], 
        to_jsonb('in_progress'),
        true
      );
      RAISE NOTICE 'Siguiente fase desbloqueada: %', v_next_phase;
    END IF;
  END IF;

  -- Guardar en la base de datos
  UPDATE public.usuarios
  SET journey_progress = v_journey
  WHERE id = v_user_id;

  RAISE NOTICE 'Journey guardado: %', v_journey;

  RETURN v_journey;
END;
$$;

-- PASO 4: Otorgar permisos
GRANT EXECUTE ON FUNCTION public.update_journey_progress(TEXT, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_journey_progress(TEXT, TEXT, JSONB) TO anon;

-- PASO 5: Comentario
COMMENT ON FUNCTION public.update_journey_progress(TEXT, TEXT, JSONB) IS 
'Actualiza el progreso del journey. Acepta JSONB nativo, no strings.';

-- PASO 6: Reiniciar el cache de PostgREST
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================
SELECT 
  proname as nombre,
  pg_get_function_arguments(oid) as parametros,
  prosecdef as tiene_security_definer
FROM pg_proc
WHERE proname = 'update_journey_progress';

-- Debe mostrar:
-- nombre: update_journey_progress
-- parametros: p_phase text, p_status text, p_additional_data jsonb DEFAULT NULL::jsonb
-- tiene_security_definer: true

-- =====================================================
-- ✅ EJECUTA TODO ESTO Y MÁNDAME EL RESULTADO
-- =====================================================
