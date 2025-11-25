-- Migration: Add journey progress tracking
-- Description: Tracks student progress through the 4-phase journey: Test → Carreras → Mini Reto → LinkedIn

-- Add journey_progress column to usuarios table
ALTER TABLE public.usuarios 
ADD COLUMN IF NOT EXISTS journey_progress JSONB DEFAULT '{
  "current_phase": "test",
  "phases": {
    "test": {
      "status": "not_started",
      "completed_at": null,
      "current_world": 0,
      "test_run_id": null
    },
    "carreras": {
      "status": "locked",
      "completed_at": null,
      "viewed_careers": []
    },
    "mini_reto": {
      "status": "locked",
      "completed_at": null,
      "reto_completed": false
    },
    "linkedin": {
      "status": "locked",
      "completed_at": null,
      "profile_created": false
    }
  },
  "last_updated": null
}'::jsonb;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_usuarios_journey_progress 
ON public.usuarios USING gin(journey_progress);

-- Create function to update journey progress
CREATE OR REPLACE FUNCTION public.update_journey_progress(
  p_user_id UUID,
  p_phase TEXT,
  p_status TEXT,
  p_data JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_progress JSONB;
  v_new_progress JSONB;
BEGIN
  -- Get current progress
  SELECT journey_progress INTO v_current_progress
  FROM public.usuarios
  WHERE id = p_user_id;

  -- If no progress exists, initialize it
  IF v_current_progress IS NULL THEN
    v_current_progress := '{
      "current_phase": "test",
      "phases": {
        "test": {"status": "not_started", "completed_at": null, "current_world": 0, "test_run_id": null},
        "carreras": {"status": "locked", "completed_at": null, "viewed_careers": []},
        "mini_reto": {"status": "locked", "completed_at": null, "reto_completed": false},
        "linkedin": {"status": "locked", "completed_at": null, "profile_created": false}
      },
      "last_updated": null
    }'::jsonb;
  END IF;

  -- Update the specific phase
  v_new_progress := jsonb_set(
    v_current_progress,
    ARRAY['phases', p_phase, 'status'],
    to_jsonb(p_status)
  );

  -- Update current_phase if status is in_progress
  IF p_status = 'in_progress' THEN
    v_new_progress := jsonb_set(v_new_progress, ARRAY['current_phase'], to_jsonb(p_phase));
  END IF;

  -- Update completed_at if status is completed
  IF p_status = 'completed' THEN
    v_new_progress := jsonb_set(
      v_new_progress,
      ARRAY['phases', p_phase, 'completed_at'],
      to_jsonb(NOW())
    );
    
    -- Unlock next phase
    CASE p_phase
      WHEN 'test' THEN
        v_new_progress := jsonb_set(v_new_progress, ARRAY['phases', 'carreras', 'status'], '"in_progress"');
        v_new_progress := jsonb_set(v_new_progress, ARRAY['current_phase'], '"carreras"');
      WHEN 'carreras' THEN
        v_new_progress := jsonb_set(v_new_progress, ARRAY['phases', 'mini_reto', 'status'], '"in_progress"');
        v_new_progress := jsonb_set(v_new_progress, ARRAY['current_phase'], '"mini_reto"');
      WHEN 'mini_reto' THEN
        v_new_progress := jsonb_set(v_new_progress, ARRAY['phases', 'linkedin', 'status'], '"in_progress"');
        v_new_progress := jsonb_set(v_new_progress, ARRAY['current_phase'], '"linkedin"');
      ELSE
        NULL;
    END CASE;
  END IF;

  -- Merge additional data
  IF p_data IS NOT NULL AND p_data != '{}'::jsonb THEN
    v_new_progress := jsonb_set(
      v_new_progress,
      ARRAY['phases', p_phase],
      (v_new_progress->'phases'->p_phase) || p_data
    );
  END IF;

  -- Update last_updated timestamp
  v_new_progress := jsonb_set(v_new_progress, ARRAY['last_updated'], to_jsonb(NOW()));

  -- Save to database
  UPDATE public.usuarios
  SET journey_progress = v_new_progress
  WHERE id = p_user_id;

  RETURN v_new_progress;
END;
$$;

-- Create function to get journey progress
CREATE OR REPLACE FUNCTION public.get_journey_progress(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_progress JSONB;
BEGIN
  SELECT journey_progress INTO v_progress
  FROM public.usuarios
  WHERE id = p_user_id;

  RETURN COALESCE(v_progress, '{
    "current_phase": "test",
    "phases": {
      "test": {"status": "not_started", "completed_at": null, "current_world": 0, "test_run_id": null},
      "carreras": {"status": "locked", "completed_at": null, "viewed_careers": []},
      "mini_reto": {"status": "locked", "completed_at": null, "reto_completed": false},
      "linkedin": {"status": "locked", "completed_at": null, "profile_created": false}
    },
    "last_updated": null
  }'::jsonb);
END;
$$;

-- Create function to reset journey (for retaking test)
CREATE OR REPLACE FUNCTION public.reset_journey_progress(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_progress JSONB;
BEGIN
  v_new_progress := '{
    "current_phase": "test",
    "phases": {
      "test": {"status": "in_progress", "completed_at": null, "current_world": 0, "test_run_id": null},
      "carreras": {"status": "locked", "completed_at": null, "viewed_careers": []},
      "mini_reto": {"status": "locked", "completed_at": null, "reto_completed": false},
      "linkedin": {"status": "locked", "completed_at": null, "profile_created": false}
    },
    "last_updated": null
  }'::jsonb;

  v_new_progress := jsonb_set(v_new_progress, ARRAY['last_updated'], to_jsonb(NOW()));

  UPDATE public.usuarios
  SET journey_progress = v_new_progress
  WHERE id = p_user_id;

  RETURN v_new_progress;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.update_journey_progress(UUID, TEXT, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_journey_progress(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_journey_progress(UUID) TO authenticated;

-- Comment on functions
COMMENT ON FUNCTION public.update_journey_progress IS 'Updates student journey progress through phases: test, carreras, mini_reto, linkedin';
COMMENT ON FUNCTION public.get_journey_progress IS 'Gets current journey progress for a student';
COMMENT ON FUNCTION public.reset_journey_progress IS 'Resets journey to beginning (for retaking test)';
