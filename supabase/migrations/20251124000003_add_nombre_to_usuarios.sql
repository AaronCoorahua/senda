-- Agregar columna nombre a la tabla usuarios
-- Esta columna almacena el nombre personalizado del usuario

ALTER TABLE public.usuarios
ADD COLUMN IF NOT EXISTS nombre TEXT;

-- Crear índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_usuarios_nombre 
ON public.usuarios(nombre);

-- Comentario para documentación
COMMENT ON COLUMN public.usuarios.nombre IS 'Nombre personalizado del usuario para el test vocacional';
