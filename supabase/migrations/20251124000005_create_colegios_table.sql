-- Crear tabla de colegios
CREATE TABLE IF NOT EXISTS public.colegios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  codigo text UNIQUE NOT NULL, -- Código único del colegio (ej: "SAN001")
  logo text, -- Ruta al logo del colegio (ej: "logo_sanagustin.png")
  direccion text,
  distrito text,
  provincia text,
  departamento text,
  telefono text,
  email text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

-- Índices para búsquedas
CREATE INDEX IF NOT EXISTS idx_colegios_codigo ON public.colegios(codigo);
CREATE INDEX IF NOT EXISTS idx_colegios_nombre ON public.colegios(nombre);
CREATE INDEX IF NOT EXISTS idx_colegios_activo ON public.colegios(activo);

-- Agregar columnas a la tabla usuarios
ALTER TABLE public.usuarios
ADD COLUMN IF NOT EXISTS colegio_id uuid REFERENCES public.colegios(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS grado text; -- "1ro", "2do", "3ro", "4to", "5to" secundaria

-- Índice para colegio_id
CREATE INDEX IF NOT EXISTS idx_usuarios_colegio ON public.usuarios(colegio_id);

-- RLS Policies para colegios
ALTER TABLE public.colegios ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios autenticados pueden ver todos los colegios
CREATE POLICY "Todos pueden ver colegios"
  ON public.colegios
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Solo usuarios tipo 'colegio' pueden ver su propio colegio completo
CREATE POLICY "Colegios pueden ver su data"
  ON public.colegios
  FOR ALL
  TO authenticated
  USING (
    id IN (
      SELECT colegio_id FROM public.usuarios WHERE id = auth.uid()
    )
  );

-- Comentarios para documentación
COMMENT ON TABLE public.colegios IS 'Tabla de colegios registrados en el sistema';
COMMENT ON COLUMN public.colegios.codigo IS 'Código único del colegio para identificación';
COMMENT ON COLUMN public.usuarios.colegio_id IS 'Referencia al colegio al que pertenece el usuario';
COMMENT ON COLUMN public.usuarios.grado IS 'Grado escolar del estudiante (1ro-5to secundaria)';

-- Insertar algunos colegios de ejemplo
INSERT INTO public.colegios (nombre, codigo, distrito, provincia, departamento) VALUES
  ('Colegio San Agustín', 'SAN001', 'Miraflores', 'Lima', 'Lima'),
  ('Colegio Santa María', 'STA001', 'San Isidro', 'Lima', 'Lima'),
  ('Colegio Nacional', 'NAC001', 'Surco', 'Lima', 'Lima')
ON CONFLICT (codigo) DO NOTHING;
