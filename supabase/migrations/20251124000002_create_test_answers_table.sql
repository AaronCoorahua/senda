-- Crear tabla test_answers desde cero
-- Esta tabla almacena las respuestas del test vocacional

CREATE TABLE IF NOT EXISTS public.test_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
  run_id UUID NOT NULL REFERENCES public.test_runs(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  question_code TEXT NOT NULL,
  question_type TEXT NOT NULL,
  answer_key TEXT NOT NULL,
  answer_label TEXT NOT NULL,
  answer_value NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  phase_key TEXT NOT NULL,
  answer JSONB,
  
  -- Constraint único para evitar duplicados en la misma run y sección
  CONSTRAINT test_answers_run_section_unique UNIQUE (run_id, section)
);

-- Crear índices para mejorar el performance
CREATE INDEX IF NOT EXISTS idx_test_answers_user_id 
ON public.test_answers(user_id);

CREATE INDEX IF NOT EXISTS idx_test_answers_run_id 
ON public.test_answers(run_id);

CREATE INDEX IF NOT EXISTS idx_test_answers_run_section 
ON public.test_answers(run_id, section);

CREATE INDEX IF NOT EXISTS idx_test_answers_section 
ON public.test_answers(section);

CREATE INDEX IF NOT EXISTS idx_test_answers_created_at 
ON public.test_answers(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.test_answers ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios solo pueden ver sus propias respuestas
CREATE POLICY "Users can view own test answers"
ON public.test_answers
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Los usuarios pueden insertar sus propias respuestas
CREATE POLICY "Users can insert own test answers"
ON public.test_answers
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Los usuarios pueden actualizar sus propias respuestas
CREATE POLICY "Users can update own test answers"
ON public.test_answers
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Los usuarios pueden eliminar sus propias respuestas
CREATE POLICY "Users can delete own test answers"
ON public.test_answers
FOR DELETE
USING (auth.uid() = user_id);

-- Comentarios para documentación
COMMENT ON TABLE public.test_answers IS 'Almacena las respuestas de cada sección del test vocacional';
COMMENT ON COLUMN public.test_answers.section IS 'Nombre de la sección: intereses, personalidad, valores, talentos, escenarios, proposito';
COMMENT ON COLUMN public.test_answers.question_code IS 'Código identificador de la pregunta o sección completada';
COMMENT ON COLUMN public.test_answers.answer IS 'Respuestas completas en formato JSON';
COMMENT ON COLUMN public.test_answers.answer_value IS 'Valor numérico para analytics (ej: cantidad de respuestas)';
