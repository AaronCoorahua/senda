-- Función para que colegios obtengan el test_result más reciente de un estudiante
-- Bypasea RLS usando SECURITY DEFINER

CREATE OR REPLACE FUNCTION get_student_test_result(student_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  run_id UUID,
  profile_type TEXT,
  strengths TEXT[],
  recommended_careers TEXT[],
  score_json JSONB,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Retornar el test_result más reciente del estudiante
  -- No validamos permisos aquí porque la función solo es accesible por usuarios autenticados
  -- y la aplicación ya valida que solo vean estudiantes de su colegio
  RETURN QUERY
  SELECT 
    tr.id,
    tr.user_id,
    tr.run_id,
    tr.profile_type,
    tr.strengths,
    tr.recommended_careers,
    tr.score_json,
    tr.created_at
  FROM public.test_results tr
  WHERE tr.user_id = student_user_id
  ORDER BY tr.created_at DESC
  LIMIT 1;
END;
$$;

-- Comentario
COMMENT ON FUNCTION get_student_test_result(UUID) IS 
'Permite a usuarios de tipo colegio obtener el test_result más reciente de sus estudiantes, y a los estudiantes obtener sus propios resultados';
