# Crear Usuario de Organización (Colegio)

## 📋 Pasos para crear un nuevo colegio

### Opción 1: Desde el SQL Editor de Supabase (Recomendado)

1. **Abre tu proyecto en Supabase Dashboard**
   - Ve a https://supabase.com/dashboard
   - Selecciona tu proyecto

2. **Abre el SQL Editor**
   - En el menú lateral, haz clic en "SQL Editor"
   - Haz clic en "New query"

3. **Copia y pega este código:**

```sql
-- CAMBIAR ESTOS 3 VALORES ANTES DE EJECUTAR:
DO $$
DECLARE
  new_user_id uuid;
  org_email text := 'colegio@ejemplo.com';     -- 👈 Email del colegio
  org_password text := 'Password123!';          -- 👈 Contraseña (mín. 6 caracteres)
  org_name text := 'Colegio San Ejemplo';       -- 👈 Nombre del colegio
BEGIN
  -- Crear el usuario en auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
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
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('tipo_usuario', 'organization'),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Crear el registro en la tabla usuarios
  INSERT INTO public.usuarios (
    id,
    email,
    tipo_usuario,
    nombre,
    created_at
  ) VALUES (
    new_user_id,
    org_email,
    'organization',
    org_name,
    NOW()
  );

  RAISE NOTICE 'Usuario creado exitosamente:';
  RAISE NOTICE 'Email: %', org_email;
  RAISE NOTICE 'Tipo: organization';
  RAISE NOTICE 'ID: %', new_user_id;
END $$;
```

4. **Modifica los valores:**
   - `org_email`: El correo del colegio (ej: `'sanjuan@colegios.pe'`)
   - `org_password`: La contraseña (ej: `'Sanjuan2024!'`)
   - `org_name`: El nombre del colegio (ej: `'Colegio San Juan'`)

5. **Ejecuta el script:**
   - Haz clic en "Run" o presiona `Ctrl+Enter`
   - Verás un mensaje de confirmación en la consola

6. **Envía las credenciales al colegio:**
   - Email: `[el que pusiste]`
   - Contraseña: `[la que pusiste]`
   - URL: `https://tuapp.com/org/login`

---

### Opción 2: Desde la terminal con Supabase CLI

Si tienes instalado Supabase CLI:

```bash
# Conectar a tu proyecto
supabase link

# Ejecutar el script
supabase db execute -f supabase/migrations/20251124000004_create_organization_user.sql
```

---

## 🔍 Verificar que se creó correctamente

Ejecuta esta consulta en SQL Editor:

```sql
SELECT 
  u.id,
  u.email,
  u.tipo_usuario,
  u.nombre,
  u.created_at,
  au.email_confirmed_at
FROM usuarios u
JOIN auth.users au ON u.id = au.id
WHERE u.tipo_usuario = 'organization'
ORDER BY u.created_at DESC;
```

Deberías ver tu nuevo colegio listado.

---

## 🔐 Cambiar contraseña de un colegio

Si un colegio olvida su contraseña, ejecuta:

```sql
UPDATE auth.users
SET 
  encrypted_password = crypt('NuevaPassword123!', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'colegio@ejemplo.com';  -- 👈 Email del colegio
```

---

## 🗑️ Eliminar un colegio

⚠️ **CUIDADO**: Esto eliminará toda la data del colegio.

```sql
-- Primero obtén el ID
SELECT id FROM usuarios WHERE email = 'colegio@ejemplo.com';

-- Luego elimina (cambia el ID)
DELETE FROM auth.users WHERE id = 'uuid-del-colegio';
```

El registro en `usuarios` se eliminará automáticamente por el CASCADE.

---

## 📝 Notas importantes

1. **Tipo de usuario**: Siempre debe ser `'organization'` (minúsculas)
2. **Contraseña**: Mínimo 6 caracteres, se recomienda incluir mayúsculas, números y símbolos
3. **Email único**: No puedes crear dos usuarios con el mismo email
4. **Sin verificación**: El email se marca como confirmado automáticamente
5. **Acceso inmediato**: El colegio puede iniciar sesión inmediatamente después de crearlo

---

## 🎯 Ejemplo completo

Para crear el "Colegio San Martín":

```sql
DO $$
DECLARE
  new_user_id uuid;
  org_email text := 'sanmartin@colegios.pe';
  org_password text := 'SanMartin2024!';
  org_name text := 'Colegio San Martín';
BEGIN
  -- ... (resto del código)
END $$;
```

Credenciales a enviar:
- Email: `sanmartin@colegios.pe`
- Contraseña: `SanMartin2024!`
- URL: `https://senda.com/org/login`
