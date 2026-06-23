-- Hardening: forzar formato de username a nivel de base de datos.
-- El frontend ya limpia a [a-z0-9_], pero vía API directa alguien podría
-- insertar su propio perfil con caracteres raros (homoglyphs para suplantar).
-- Este CHECK lo rechaza en el origen.

ALTER TABLE public.profiles
  ADD CONSTRAINT username_format
  CHECK (username ~ '^[a-z0-9_]{3,30}$');
