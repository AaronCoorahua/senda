-- Permitir a usuarios de tipo colegio leer test_results de sus estudiantes
-- Migration: 20251125000003_add_test_results_rls_for_colegios.sql

-- Crear política para que colegios puedan leer test_results de sus estudiantes
CREATE POLICY "Colegios pueden ver test_results de sus estudiantes"
ON public.test_results
FOR SELECT
TO authenticated
USING (
  -- Permitir si el usuario actual es de tipo colegio y el test_result pertenece a un estudiante de su colegio
  EXISTS (
    SELECT 1
    FROM public.usuarios AS requesting_user
    WHERE requesting_user.id = auth.uid()
      AND requesting_user.tipo_usuario = 'colegio'
      AND EXISTS (
        SELECT 1
        FROM public.usuarios AS student
        WHERE student.id = test_results.user_id
          AND student.colegio_id = requesting_user.id
      )
  )
  OR
  -- Permitir si el usuario actual es el dueño del test_result
  test_results.user_id = auth.uid()
);

-- Comentario explicativo
COMMENT ON POLICY "Colegios pueden ver test_results de sus estudiantes" ON public.test_results IS 
'Permite a usuarios de tipo colegio ver los resultados de tests de estudiantes que pertenecen a su institución, y a los estudiantes ver sus propios resultados';
