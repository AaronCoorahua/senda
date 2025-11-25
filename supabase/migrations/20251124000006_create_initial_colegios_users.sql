-- Script para crear los 3 colegios iniciales y sus usuarios administradores

DO $$
DECLARE
  colegio1_id uuid;
  colegio2_id uuid;
  colegio3_id uuid;
  user1_id uuid;
  user2_id uuid;
  user3_id uuid;
BEGIN
  -- ==========================================
  -- 1. CREAR LOS COLEGIOS
  -- ==========================================
  
  -- Colegio 1: Colegio Test
  INSERT INTO public.colegios (nombre, codigo, logo, distrito, provincia, departamento, activo)
  VALUES ('Colegio Test', 'TEST001', null, 'Lima', 'Lima', 'Lima', true)
  ON CONFLICT (codigo) DO UPDATE SET nombre = EXCLUDED.nombre
  RETURNING id INTO colegio1_id;

  -- Colegio 2: San Agustín
  INSERT INTO public.colegios (nombre, codigo, logo, distrito, provincia, departamento, activo)
  VALUES ('San Agustín', 'SAN001', 'logo_sanagustin.png', 'Lima', 'Lima', 'Lima', true)
  ON CONFLICT (codigo) DO UPDATE SET nombre = EXCLUDED.nombre, logo = EXCLUDED.logo
  RETURNING id INTO colegio2_id;

  -- Colegio 3: Saco Oliveros
  INSERT INTO public.colegios (nombre, codigo, logo, distrito, provincia, departamento, activo)
  VALUES ('Saco Oliveros', 'SACO001', 'logo_sacooliveros.png', 'Lima', 'Lima', 'Lima', true)
  ON CONFLICT (codigo) DO UPDATE SET nombre = EXCLUDED.nombre, logo = EXCLUDED.logo
  RETURNING id INTO colegio3_id;

  RAISE NOTICE '✅ Colegios creados:';
  RAISE NOTICE '- Colegio Test: %', colegio1_id;
  RAISE NOTICE '- San Agustín: %', colegio2_id;
  RAISE NOTICE '- Saco Oliveros: %', colegio3_id;

  -- ==========================================
  -- 2. CREAR USUARIOS EN AUTH.USERS
  -- ==========================================

  -- Verificar y crear Usuario 1: admin@test.com -> Colegio Test
  SELECT id INTO user1_id FROM auth.users WHERE email = 'admin@test.com';
  
  IF user1_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated', 'authenticated',
      'admin@test.com',
      crypt('Test#123', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('tipo_usuario', 'colegio', 'nombre', 'Colegio Test'),
      NOW(), NOW(), '', '', '', ''
    )
    RETURNING id INTO user1_id;
  ELSE
    -- Actualizar contraseña si ya existe
    UPDATE auth.users 
    SET encrypted_password = crypt('Test#123', gen_salt('bf'))
    WHERE id = user1_id;
  END IF;

  -- Verificar y crear Usuario 2: admin@sanagustin.edu -> San Agustín
  SELECT id INTO user2_id FROM auth.users WHERE email = 'admin@sanagustin.edu';
  
  IF user2_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated', 'authenticated',
      'admin@sanagustin.edu',
      crypt('Test#123', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('tipo_usuario', 'colegio', 'nombre', 'San Agustín'),
      NOW(), NOW(), '', '', '', ''
    )
    RETURNING id INTO user2_id;
  ELSE
    UPDATE auth.users 
    SET encrypted_password = crypt('Test#123', gen_salt('bf'))
    WHERE id = user2_id;
  END IF;

  -- Verificar y crear Usuario 3: admin@sacoolivieros.edu -> Saco Oliveros
  SELECT id INTO user3_id FROM auth.users WHERE email = 'admin@sacoolivieros.edu';
  
  IF user3_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated', 'authenticated',
      'admin@sacoolivieros.edu',
      crypt('Test#123', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('tipo_usuario', 'colegio', 'nombre', 'Saco Oliveros'),
      NOW(), NOW(), '', '', '', ''
    )
    RETURNING id INTO user3_id;
  ELSE
    UPDATE auth.users 
    SET encrypted_password = crypt('Test#123', gen_salt('bf'))
    WHERE id = user3_id;
  END IF;

  RAISE NOTICE '';
  RAISE NOTICE '✅ Usuarios auth creados:';
  RAISE NOTICE '- admin@test.com: %', user1_id;
  RAISE NOTICE '- admin@sanagustin.edu: %', user2_id;
  RAISE NOTICE '- admin@sacoolivieros.edu: %', user3_id;

  -- ==========================================
  -- 3. CREAR/ACTUALIZAR EN TABLA USUARIOS
  -- ==========================================

  -- Usuario 1
  INSERT INTO public.usuarios (id, username, tipo_usuario, nombre, colegio_id, fecha_creacion)
  VALUES (user1_id, 'admin@test.com', 'colegio', 'Colegio Test', colegio1_id, NOW())
  ON CONFLICT (id) DO UPDATE 
  SET nombre = EXCLUDED.nombre,
      tipo_usuario = EXCLUDED.tipo_usuario,
      colegio_id = EXCLUDED.colegio_id;

  -- Usuario 2
  INSERT INTO public.usuarios (id, username, tipo_usuario, nombre, colegio_id, fecha_creacion)
  VALUES (user2_id, 'admin@sanagustin.edu', 'colegio', 'San Agustín', colegio2_id, NOW())
  ON CONFLICT (id) DO UPDATE 
  SET nombre = EXCLUDED.nombre,
      tipo_usuario = EXCLUDED.tipo_usuario,
      colegio_id = EXCLUDED.colegio_id;

  -- Usuario 3
  INSERT INTO public.usuarios (id, username, tipo_usuario, nombre, colegio_id, fecha_creacion)
  VALUES (user3_id, 'admin@sacoolivieros.edu', 'colegio', 'Saco Oliveros', colegio3_id, NOW())
  ON CONFLICT (id) DO UPDATE 
  SET nombre = EXCLUDED.nombre,
      tipo_usuario = EXCLUDED.tipo_usuario,
      colegio_id = EXCLUDED.colegio_id;

  RAISE NOTICE '';
  RAISE NOTICE '✅ =============================================';
  RAISE NOTICE '✅ SETUP COMPLETO - 3 COLEGIOS Y USUARIOS';
  RAISE NOTICE '✅ =============================================';
  RAISE NOTICE '';
  RAISE NOTICE '🏫 CREDENCIALES DE ACCESO:';
  RAISE NOTICE '';
  RAISE NOTICE '1️⃣ Colegio Test:';
  RAISE NOTICE '   Email: admin@test.com';
  RAISE NOTICE '   Password: Test#123';
  RAISE NOTICE '   URL: /org/login';
  RAISE NOTICE '';
  RAISE NOTICE '2️⃣ San Agustín:';
  RAISE NOTICE '   Email: admin@sanagustin.edu';
  RAISE NOTICE '   Password: Test#123';
  RAISE NOTICE '   URL: /org/login';
  RAISE NOTICE '';
  RAISE NOTICE '3️⃣ Saco Oliveros:';
  RAISE NOTICE '   Email: admin@sacoolivieros.edu';
  RAISE NOTICE '   Password: Test#123';
  RAISE NOTICE '   URL: /org/login';
  RAISE NOTICE '';

END $$;
