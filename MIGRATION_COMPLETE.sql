-- =====================================================
-- SENDA - MIGRACIÓN COMPLETA DE JOURNEY PROGRESS
-- =====================================================
-- Este archivo contiene todas las sentencias SQL necesarias
-- para implementar el sistema de progreso del journey.
-- 
-- INSTRUCCIONES:
-- 1. Copia todo este contenido
-- 2. Ve a Supabase Dashboard → SQL Editor
-- 3. Pega y ejecuta este script
-- 4. Verifica que se ejecutó correctamente
-- =====================================================

-- 1. AGREGAR COLUMNA journey_progress A LA TABLA usuarios
-- =====================================================
ALTER TABLE public.usuarios 
ADD COLUMN IF NOT EXISTS journey_progress JSONB DEFAULT jsonb_build_object(
  'current_phase', 'test',
  'phases', jsonb_build_object(
    'test', jsonb_build_object(
      'status', 'in_progress',
      'completed_at', null,
      'current_world', 0,
      'test_run_id', null
    ),
    'carreras', jsonb_build_object(
      'status', 'locked',
      'completed_at', null,
      'viewed_careers', '[]'::jsonb
    ),
    'mini_reto', jsonb_build_object(
      'status', 'locked',
      'completed_at', null,
      'reto_completed', false
    ),
    'linkedin', jsonb_build_object(
      'status', 'locked',
      'completed_at', null,
      'profile_created', false
    )
  )
);

-- 2. CREAR ÍNDICE GIN PARA BÚSQUEDAS EFICIENTES EN JSONB
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_usuarios_journey_progress 
ON public.usuarios USING GIN (journey_progress);

-- 3. FUNCIÓN: update_journey_progress
-- =====================================================
-- Actualiza el progreso de una fase específica del journey.
-- Auto-desbloquea la siguiente fase cuando se completa una.
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_journey_progress(
  p_phase TEXT,
  p_status TEXT,
  p_additional_data JSONB DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
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

  -- Obtener el journey_progress actual
  SELECT journey_progress INTO v_journey
  FROM public.usuarios
  WHERE id = v_user_id;

  -- Si no existe, crear estructura por defecto
  IF v_journey IS NULL THEN
    v_journey := jsonb_build_object(
      'current_phase', 'test',
      'phases', jsonb_build_object(
        'test', jsonb_build_object('status', 'in_progress', 'completed_at', null, 'current_world', 0, 'test_run_id', null),
        'carreras', jsonb_build_object('status', 'locked', 'completed_at', null, 'viewed_careers', '[]'::jsonb),
        'mini_reto', jsonb_build_object('status', 'locked', 'completed_at', null, 'reto_completed', false),
        'linkedin', jsonb_build_object('status', 'locked', 'completed_at', null, 'profile_created', false)
      )
    );
  END IF;

  -- Obtener los datos actuales de la fase
  v_phase_data := v_journey->'phases'->p_phase;

  -- Actualizar el status
  v_phase_data := jsonb_set(v_phase_data, '{status}', to_jsonb(p_status));

  -- Si se completó, agregar timestamp
  IF p_status = 'completed' THEN
    v_phase_data := jsonb_set(v_phase_data, '{completed_at}', to_jsonb(NOW()));
  END IF;

  -- Fusionar datos adicionales solo si no es NULL (current_world, test_run_id, etc.)
  IF p_additional_data IS NOT NULL THEN
    v_phase_data := v_phase_data || p_additional_data;
  END IF;

  -- Actualizar la fase en el journey
  v_journey := jsonb_set(v_journey, ARRAY['phases', p_phase], v_phase_data);

  -- Si se completó esta fase, actualizar current_phase y desbloquear la siguiente
  IF p_status = 'completed' THEN
    -- Determinar la siguiente fase
    CASE p_phase
      WHEN 'test' THEN
        v_next_phase := 'carreras';
      WHEN 'carreras' THEN
        v_next_phase := 'mini_reto';
      WHEN 'mini_reto' THEN
        v_next_phase := 'linkedin';
      ELSE
        v_next_phase := NULL;
    END CASE;

    -- Si hay siguiente fase, desbloquearla
    IF v_next_phase IS NOT NULL THEN
      v_journey := jsonb_set(v_journey, '{current_phase}', to_jsonb(v_next_phase));
      v_journey := jsonb_set(
        v_journey, 
        ARRAY['phases', v_next_phase, 'status'], 
        to_jsonb('in_progress')
      );
    END IF;
  END IF;

  -- Guardar en la base de datos
  UPDATE public.usuarios
  SET journey_progress = v_journey
  WHERE id = v_user_id;

  RETURN v_journey;
END;
$$;

-- 4. FUNCIÓN: get_journey_progress
-- =====================================================
-- Obtiene el progreso actual del journey para el usuario autenticado.
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_journey_progress()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_journey JSONB;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No hay usuario autenticado';
  END IF;

  SELECT journey_progress INTO v_journey
  FROM public.usuarios
  WHERE id = v_user_id;

  -- Si no existe, retornar estructura por defecto
  IF v_journey IS NULL THEN
    v_journey := jsonb_build_object(
      'current_phase', 'test',
      'phases', jsonb_build_object(
        'test', jsonb_build_object('status', 'in_progress', 'completed_at', null, 'current_world', 0, 'test_run_id', null),
        'carreras', jsonb_build_object('status', 'locked', 'completed_at', null, 'viewed_careers', '[]'::jsonb),
        'mini_reto', jsonb_build_object('status', 'locked', 'completed_at', null, 'reto_completed', false),
        'linkedin', jsonb_build_object('status', 'locked', 'completed_at', null, 'profile_created', false)
      )
    );
    
    -- Guardar la estructura por defecto
    UPDATE public.usuarios
    SET journey_progress = v_journey
    WHERE id = v_user_id;
  END IF;

  RETURN v_journey;
END;
$$;

-- 5. FUNCIÓN: reset_journey_progress
-- =====================================================
-- Reinicia el journey al estado inicial (test en progreso).
-- Útil para cuando el usuario quiere volver a tomar el test.
-- =====================================================
CREATE OR REPLACE FUNCTION public.reset_journey_progress()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_journey JSONB;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No hay usuario autenticado';
  END IF;

  -- Crear estructura inicial
  v_journey := jsonb_build_object(
    'current_phase', 'test',
    'phases', jsonb_build_object(
      'test', jsonb_build_object(
        'status', 'in_progress',
        'completed_at', null,
        'current_world', 0,
        'test_run_id', null
      ),
      'carreras', jsonb_build_object(
        'status', 'locked',
        'completed_at', null,
        'viewed_careers', '[]'::jsonb
      ),
      'mini_reto', jsonb_build_object(
        'status', 'locked',
        'completed_at', null,
        'reto_completed', false
      ),
      'linkedin', jsonb_build_object(
        'status', 'locked',
        'completed_at', null,
        'profile_created', false
      )
    )
  );

  -- Actualizar en la base de datos
  UPDATE public.usuarios
  SET journey_progress = v_journey
  WHERE id = v_user_id;

  RETURN v_journey;
END;
$$;

-- 6. OTORGAR PERMISOS A LOS USUARIOS AUTENTICADOS
-- =====================================================
GRANT EXECUTE ON FUNCTION public.update_journey_progress(TEXT, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_journey_progress() TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_journey_progress() TO authenticated;

-- 7. COMENTARIOS PARA DOCUMENTACIÓN
-- =====================================================
COMMENT ON COLUMN public.usuarios.journey_progress IS 
'Almacena el progreso del usuario a través del journey vocacional (test → carreras → mini_reto → linkedin). Estructura JSONB con current_phase y datos específicos de cada fase.';

COMMENT ON FUNCTION public.update_journey_progress(TEXT, TEXT, JSONB) IS 
'Actualiza el progreso de una fase del journey. Auto-desbloquea la siguiente fase cuando status=completed. Parámetros: p_phase (test|carreras|mini_reto|linkedin), p_status (not_started|in_progress|completed|locked), p_additional_data (JSONB opcional con datos específicos de la fase).';

COMMENT ON FUNCTION public.get_journey_progress() IS 
'Obtiene el journey_progress actual del usuario autenticado. Si no existe, crea y retorna la estructura por defecto.';

COMMENT ON FUNCTION public.reset_journey_progress() IS 
'Reinicia el journey al estado inicial (test in_progress, demás fases locked). Útil para "Volver a tomar test".';

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
-- Si este script se ejecutó correctamente, verás:
-- - Columna journey_progress en la tabla usuarios
-- - Índice idx_usuarios_journey_progress
-- - 3 funciones: update_journey_progress, get_journey_progress, reset_journey_progress
-- - Permisos otorgados a authenticated
-- =====================================================
