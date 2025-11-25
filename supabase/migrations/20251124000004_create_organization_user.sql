-- Script para crear usuarios de COLEGIO (instituciones educativas)
-- Este script crea tanto el colegio como su usuario administrador

-- IMPORTANTE: Cambia estos valores:
DO $$
DECLARE
  new_user_id uuid;
  new_colegio_id uuid;
  org_email text := 'admin@colegio.edu';         -- 👈 CAMBIAR: Email del administrador
  org_password text := 'Test#123';            -- 👈 CAMBIAR: Contraseña
  colegio_nombre text := 'Colegio Ejemplo';       -- 👈 CAMBIAR: Nombre del colegio
  colegio_codigo text := 'COL001';                -- 👈 CAMBIAR: Código único (ej: SAN001)
  colegio_distrito text := 'Miraflores';          -- 👈 CAMBIAR: Distrito
BEGIN
  -- Verificar que el email no exista
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = org_email) THEN
    RAISE EXCEPTION 'El email % ya está en uso', org_email;
  END IF;

  -- Verificar que el código no exista
  IF EXISTS (SELECT 1 FROM public.colegios WHERE codigo = colegio_codigo) THEN
    RAISE EXCEPTION 'El código % ya está en uso', colegio_codigo;
  END IF;

  -- 1. Crear el colegio
  INSERT INTO public.colegios (nombre, codigo, distrito, provincia, departamento)
  VALUES (colegio_nombre, colegio_codigo, colegio_distrito, 'Lima', 'Lima')
  RETURNING id INTO new_colegio_id;

  -- 2. Crear el usuario en auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    org_email,
    crypt(org_password, gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('tipo_usuario', 'colegio', 'nombre', colegio_nombre),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- 3. Crear/actualizar en usuarios con referencia al colegio
  INSERT INTO public.usuarios (id, username, tipo_usuario, nombre, colegio_id, fecha_creacion)
  VALUES (new_user_id, org_email, 'colegio', colegio_nombre, new_colegio_id, NOW())
  ON CONFLICT (id) DO UPDATE 
  SET nombre = colegio_nombre,
      tipo_usuario = 'colegio',
      colegio_id = new_colegio_id;

  RAISE NOTICE '';
  RAISE NOTICE '✅ =============================================';
  RAISE NOTICE '✅ COLEGIO Y USUARIO CREADOS EXITOSAMENTE';
  RAISE NOTICE '✅ =============================================';
  RAISE NOTICE '';
  RAISE NOTICE '🏫 Colegio: %', colegio_nombre;
  RAISE NOTICE '🔢 Código: %', colegio_codigo;
  RAISE NOTICE '🆔 Colegio ID: %', new_colegio_id;
  RAISE NOTICE '';
  RAISE NOTICE '📧 Email admin: %', org_email;
  RAISE NOTICE '🔑 Contraseña: %', org_password;
  RAISE NOTICE '🆔 Usuario ID: %', new_user_id;
  RAISE NOTICE '';
  RAISE NOTICE '🌐 Acceder en: /org/login';
  RAISE NOTICE '';

END $$;
