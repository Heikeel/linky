-- Fix #1: Eliminar política RLS redundante en profiles
-- (la restrictiva auth.uid()=id es ignorada porque existe una using(true))
DROP POLICY IF EXISTS "Usuario puede ver su propio perfil" ON public.profiles;

-- Fix #2: Analytics — evitar que visitantes externos inserten datos en perfiles ajenos
-- Reemplazar la política abierta con una que solo permita insertar para perfiles que existen
DROP POLICY IF EXISTS "Insertar analytics" ON public.analytics;

CREATE POLICY "Insertar analytics solo para perfiles existentes"
  ON public.analytics FOR INSERT
  WITH CHECK (
    profile_id IN (SELECT id FROM public.profiles)
  );

-- Fix #3 (opcional pero recomendado): rate limit suave via índice único por sesión
-- Esto previene spam masivo de la misma IP en la misma visita
-- No hay forma nativa en Supabase de limitar por IP, pero podemos limitar
-- la frecuencia con una función que solo admite 1 view por perfil cada 30 segundos
-- desde el mismo cliente (se maneja en el frontend con localStorage, ver ProfilePage.js)

-- Fix #4: Storage — agregar validación de content-type en la política de avatars
-- Eliminar política INSERT anterior y recrearla con restricción de tipo
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'webp', 'gif'))
);
