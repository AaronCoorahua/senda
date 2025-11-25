-- Eliminar políticas RLS existentes de la tabla usuarios
DROP POLICY IF EXISTS "Users can view their own data" ON usuarios;
DROP POLICY IF EXISTS "Users can update their own data" ON usuarios;
DROP POLICY IF EXISTS "Users can insert their own data" ON usuarios;
DROP POLICY IF EXISTS "Colegios pueden ver sus estudiantes" ON usuarios;
DROP POLICY IF EXISTS "Authenticated users can view all usuarios" ON usuarios;

-- Crear política simple: todos pueden ver todos los usuarios autenticados
-- (temporalmente para debugging, luego refinamos)
CREATE POLICY "Authenticated users can view all usuarios"
  ON usuarios
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para que usuarios puedan actualizar su propio perfil
CREATE POLICY "Users can update their own data"
  ON usuarios
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Política para INSERT (cuando se crea un usuario)
CREATE POLICY "Users can insert their own data"
  ON usuarios
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- Políticas para test_runs
-- ============================================

-- Permitir a usuarios autenticados ver todas las test_runs
CREATE POLICY "Authenticated users can view all test_runs"
  ON test_runs
  FOR SELECT
  TO authenticated
  USING (true);

-- Permitir a usuarios ver y modificar sus propias runs
CREATE POLICY "Users can manage their own test_runs"
  ON test_runs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
