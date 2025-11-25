-- Agregar unique constraint para evitar duplicados en test_answers
-- Esto permite que saveAnswer use upsert correctamente

-- Primero eliminar duplicados existentes si los hay
DELETE FROM test_answers a USING (
  SELECT MIN(ctid) as ctid, run_id, section
  FROM test_answers 
  GROUP BY run_id, section
  HAVING COUNT(*) > 1
) b
WHERE a.run_id = b.run_id 
AND a.section = b.section 
AND a.ctid <> b.ctid;

-- Agregar constraint único
ALTER TABLE test_answers
ADD CONSTRAINT test_answers_run_section_unique 
UNIQUE (run_id, section);

-- Hacer nullable las columnas opcionales
ALTER TABLE test_answers
ALTER COLUMN question_code DROP NOT NULL;

ALTER TABLE test_answers
ALTER COLUMN question_type DROP NOT NULL;

ALTER TABLE test_answers
ALTER COLUMN answer_key DROP NOT NULL;

ALTER TABLE test_answers
ALTER COLUMN answer_label DROP NOT NULL;

ALTER TABLE test_answers
ALTER COLUMN phase_key DROP NOT NULL;

-- Crear índices para mejorar el performance
CREATE INDEX IF NOT EXISTS idx_test_runs_user_status 
ON test_runs(user_id, status);

CREATE INDEX IF NOT EXISTS idx_test_answers_run_section 
ON test_answers(run_id, section);

CREATE INDEX IF NOT EXISTS idx_test_results_user_run 
ON test_results(user_id, run_id);
