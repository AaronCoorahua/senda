-- Corregir el email del usuario de Saco Oliveros

UPDATE auth.users 
SET email = 'admin@sacooliveros.edu'
WHERE email = 'admin@sacoolivieros.edu';

UPDATE public.usuarios
SET username = 'admin@sacooliveros.edu'
WHERE username = 'admin@sacoolivieros.edu';
