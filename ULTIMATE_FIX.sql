-- =====================================================
-- SOLUCIÓN A PRUEBA DE BALAS (TEXT VERSION)
-- =====================================================
-- Vamos a usar TEXT para evitar cualquier error de tipos en la llamada RPC
-- PostgREST maneja TEXT sin problemas siempre.
-- =====================================================

-- 1. Limpieza agresiva de funciones previas
DROP FUNCTION IF EXISTS public.update_journey_progress(TEXT, TEXT, JSONB);
DROP FUNCTION IF EXISTS public.update_journey_progress(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_journey_progress(TEXT, TEXT, JSON);

-- 2. Crear función que acepta TEXT (String)
CREATE OR REPLACE FUNCTION public.update_journey_progress(
  p_phase TEXT,
  p_status TEXT,
  p_additional_data TEXT DEFAULT '{}'
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
  v_extra_data JSONB;
BEGIN
  -- Obtener ID usuario
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'No auth'; END IF;

  -- Convertir el TEXT recibido a JSONB de forma segura
  BEGIN
    v_extra_data := p_additional_data::JSONB;
  EXCEPTION WHEN OTHERS THEN
    v_extra_data := '{}'::jsonb;
  END;

  -- Obtener journey actual
  SELECT journey_progress INTO v_journey FROM public.usuarios WHERE id = v_user_id;

  -- Inicializar si está vacío
  IF v_journey IS NULL OR v_journey = 'null'::jsonb THEN
    v_journey := jsonb_build_object(
      'current_phase', 'test',
      'phases', jsonb_build_object(
        'test', jsonb_build_object('status', 'in_progress', 'completed_at', null, 'current_world', 0),
        'carreras', jsonb_build_object('status', 'locked', 'completed_at', null, 'viewed_careers', '[]'::jsonb),
        'mini_reto', jsonb_build_object('status', 'locked', 'completed_at', null, 'reto_completed', false),
        'linkedin', jsonb_build_object('status', 'locked', 'completed_at', null, 'profile_created', false)
      )
    );
  END IF;

  -- Preparar datos de la fase
  v_phase_data := COALESCE(v_journey->'phases'->p_phase, '{}'::jsonb);
  
  -- Actualizar status
  v_phase_data := jsonb_set(v_phase_data, '{status}', to_jsonb(p_status), true);
  
  -- Timestamp si completado
  IF p_status = 'completed' THEN
    v_phase_data := jsonb_set(v_phase_data, '{completed_at}', to_jsonb(NOW()), true);
  END IF;

  -- Merge de datos adicionales
  v_phase_data := v_phase_data || v_extra_data;

  -- Guardar fase en journey
  v_journey := jsonb_set(v_journey, ARRAY['phases', p_phase], v_phase_data, true);

  -- Lógica de desbloqueo
  IF p_status = 'completed' THEN
    CASE p_phase
      WHEN 'test' THEN v_next_phase := 'carreras';
      WHEN 'carreras' THEN v_next_phase := 'mini_reto';
      WHEN 'mini_reto' THEN v_next_phase := 'linkedin';
      ELSE v_next_phase := NULL;
    END CASE;

    IF v_next_phase IS NOT NULL THEN
      v_journey := jsonb_set(v_journey, '{current_phase}', to_jsonb(v_next_phase), true);
      v_journey := jsonb_set(v_journey, ARRAY['phases', v_next_phase, 'status'], to_jsonb('in_progress'), true);
    END IF;
  END IF;

  -- Update final
  UPDATE public.usuarios SET journey_progress = v_journey WHERE id = v_user_id;

  RETURN v_journey;
END;
$$;

-- 3. Permisos
GRANT EXECUTE ON FUNCTION public.update_journey_progress(TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_journey_progress(TEXT, TEXT, TEXT) TO anon;

-- 4. Recargar caché
NOTIFY pgrst, 'reload schema';
