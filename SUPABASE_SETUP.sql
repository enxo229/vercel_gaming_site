-- Script de Configuración para Supabase 
-- Objetivo: Prevenir duplicidad de nombres de usuario en el Leaderboard.

-- 1. Añadir restricción UNIQUE a la columna username en la tabla leaderboard
-- Esto asegura que a nivel de base de datos ningún registro pueda tener el mismo username.
ALTER TABLE public.leaderboard
ADD CONSTRAINT leaderboard_username_unique UNIQUE (username);

-- NOTA: Si este comando falla porque ya existen duplicados en tu base de datos, 
-- tendrás que limpiar o renombrar los duplicados antes de poder aplicar la restricción.
-- Aquí hay una consulta útil para encontrar duplicados antes de aplicar el constraint:
-- SELECT username, COUNT(*) FROM public.leaderboard GROUP BY username HAVING COUNT(*) > 1;

-- 2. Asegurarse de que las políticas RLS permiten lectura (SELECT) a usuarios anónimos
-- para que la Pantalla de Inicio pueda validar si el alias existe antes de insertar.
-- (Probablemente ya lo tengas, pero por precaución:)
-- CREATE POLICY "Allow public SELECT" 
-- ON public.leaderboard
-- FOR SELECT
-- TO public
-- USING (true);
