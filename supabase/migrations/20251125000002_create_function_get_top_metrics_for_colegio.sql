-- Función: get_top_metrics_for_colegio
-- Objetivo: devolver las principales métricas (carreras o perfiles) para un colegio específico

CREATE OR REPLACE FUNCTION public.get_top_metrics_for_colegio(
  p_colegio_id uuid
)
RETURNS TABLE (
  label text,
  metric_count integer,
  metric_type text,
  total_metric_count integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_total_results integer;
  v_rows integer;
BEGIN
  IF p_colegio_id IS NULL THEN
    RETURN;
  END IF;

  SELECT COUNT(*)
  INTO v_total_results
  FROM public.test_results tr
  JOIN public.usuarios u ON u.id = tr.user_id
  WHERE u.colegio_id = p_colegio_id;

  IF v_total_results = 0 THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH base_results AS (
    SELECT tr.*
    FROM public.test_results tr
    JOIN public.usuarios u ON u.id = tr.user_id
    WHERE u.colegio_id = p_colegio_id
  ),
  career_labels AS (
    SELECT 
      COALESCE(NULLIF(btrim(value), ''), 'Sin dato') AS clean_label,
      br.user_id
    FROM base_results br
    CROSS JOIN LATERAL (
      SELECT jsonb_array_elements_text(br.score_json->'recommended_careers') AS value
    ) rec
    WHERE br.score_json ? 'recommended_careers'

    UNION ALL

    SELECT 
      COALESCE(NULLIF(btrim(value), ''), 'Sin dato'),
      br.user_id
    FROM base_results br
    CROSS JOIN LATERAL (
      SELECT jsonb_array_elements_text(br.score_json->'profileData'->'carreras') AS value
    ) rec
    WHERE br.score_json ? 'profileData'
      AND (br.score_json->'profileData') ? 'carreras'

    UNION ALL

    SELECT 
      COALESCE(NULLIF(btrim(value), ''), 'Sin dato'),
      br.user_id
    FROM base_results br
    CROSS JOIN LATERAL (
      SELECT unnest(br.recommended_careers) AS value
    ) rec
    WHERE br.recommended_careers IS NOT NULL
  )
  SELECT
    clean_label AS label,
    COUNT(DISTINCT user_id)::integer AS metric_count,
    'career'::text AS metric_type,
    v_total_results AS total_metric_count
  FROM career_labels
  GROUP BY clean_label
  ORDER BY metric_count DESC, clean_label
  LIMIT 3;

  GET DIAGNOSTICS v_rows = ROW_COUNT;

  IF v_rows = 0 THEN
    RETURN QUERY
    WITH profile_totals AS (
      SELECT
        COALESCE(NULLIF(btrim(tr.profile_type), ''), 'Sin perfil') AS clean_profile,
        COUNT(*)::integer AS metric_count
      FROM public.test_results tr
      JOIN public.usuarios u ON u.id = tr.user_id
      WHERE u.colegio_id = p_colegio_id
      GROUP BY COALESCE(NULLIF(btrim(tr.profile_type), ''), 'Sin perfil')
    )
    SELECT
      clean_profile AS label,
      metric_count,
      'profile'::text AS metric_type,
      v_total_results AS total_metric_count
    FROM profile_totals
    ORDER BY metric_count DESC, clean_profile
    LIMIT 3;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_top_metrics_for_colegio(uuid) TO authenticated;

COMMENT ON FUNCTION public.get_top_metrics_for_colegio(uuid)
IS 'Devuelve las principales métricas (carreras o perfiles) para un colegio.';
