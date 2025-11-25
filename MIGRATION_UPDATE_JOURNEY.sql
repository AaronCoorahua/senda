-- =====================================================
-- ACTUALIZACIÓN: Corregir función update_journey_progress
-- =====================================================
-- Ejecuta este SQL en Supabase para corregir el problema
-- de tipo JSONB con p_additional_data
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

-- =====================================================
-- Comentario actualizado
-- =====================================================
COMMENT ON FUNCTION public.update_journey_progress(TEXT, TEXT, JSONB) IS 
'Actualiza el progreso de una fase del journey. Auto-desbloquea la siguiente fase cuando status=completed. Parámetros: p_phase (test|carreras|mini_reto|linkedin), p_status (not_started|in_progress|completed|locked), p_additional_data (JSONB opcional con datos específicos de la fase, puede ser NULL).';

-- =====================================================
-- FIN DE LA ACTUALIZACIÓN
-- =====================================================
-- Esta actualización corrige el problema de tipo JSONB
-- permitiendo que p_additional_data sea NULL en lugar
-- de un objeto vacío '{}'
-- =====================================================
