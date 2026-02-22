# Guía de Despliegue - The Debugger Ant

Este documento contiene las instrucciones necesarias para levantar la infraestructura del juego "The Debugger Ant", tanto en entorno local como en producción (Vercel + Supabase).

---

## 1. Setup de Supabase (Base de Datos y Seguridad)

**IMPORTANTE:** Para que la tabla de puntuaciones (`leaderboard`) funcione correctamente y de forma segura, debes ejecutar el siguiente script SQL en el **SQL Editor** de tu proyecto en Supabase.

### Script SQL: Tabla y Políticas RLS

Copia y pega el siguiente código en el Editor SQL de Supabase y presiona "Run":

```sql
-- 1. Crear la tabla leaderboard
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username text NOT NULL,
    score integer NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar RLS (Row Level Security) para proteger los datos
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir MODO LECTURA anónimo a todos los usuarios
CREATE POLICY "Permitir lectura publica de leaderboard" 
ON public.leaderboard 
FOR SELECT 
TO anon 
USING (true);

-- 4. Crear política para permitir INSERCIÓN anónima a todos los usuarios
-- (Protección básica: solo pueden insertar, no pueden ni modificar ni borrar)
CREATE POLICY "Permitir insercion anonima de puntuaciones" 
ON public.leaderboard 
FOR INSERT 
TO anon 
WITH CHECK (true);
```

> [!NOTE]  
> Este script permite a la aplicación React conectarse a Supabase y guardar los puntajes de manera anónima sin autenticación de usuario, previniendo al mismo tiempo que usuarios maliciosos modifiquen o eliminen puntuaciones existentes.

---

## 2. Setup Local (Modo Desarrollo)

Para ejecutar el proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/enxo229/vercel_gaming_site.git
   cd vercel_gaming_site/the-debugger-ant
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las Variables de Entorno:**
   * Copia el archivo `.env.example` y renómbralo a `.env.local`
   * En Supabase, ve a **Project Settings > API**.
   * Copia la **URL** del proyecto y tu clave pública **anon/public**.
   * Pega esos valores en `.env.local`:
     ```env
     VITE_SUPABASE_URL=tu_url_aqui
     VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
     ```

4. **Levantar el servidor local:**
   ```bash
   npm run dev
   ```
   *El juego estará disponible típicamente en `http://localhost:5173`.*

---

## 3. Despliegue en Vercel (Producción)

Los siguientes pasos describen cómo desplegar el repositorio automatizando las builds en Vercel.

1. **Conectar Vercel con GitHub:**
   * Inicia sesión en [Vercel](https://vercel.com).
   * Haz clic en **"Add New..."** > **"Project"**.
   * Selecciona **"Import from Git Repository"**.
   * Elige tu repositorio `vercel_gaming_site` (`enxo229/vercel_gaming_site`).

2. **Configuración de Vercel (Build Settings):**
   * **Framework Preset:** Selecciona `Vite`.
   * **Root Directory:** Si el repositorio está clonado en la carpeta `the-debugger-ant`, presiona "Edit" y selecciona esa carpeta como el *Root Directory*.
   * **Build Command:** Vercel debería detectarlo, pero asegúrate de que sea `npm run build`.
   * **Output Directory:** Deja o escribe `dist`.
   * **Install Command:** Déjalo por defecto (`npm install`).

3. **Inyectar Variables de Entorno en Vercel:**
   * Antes de darle a "Deploy", despliega la sección **Environment Variables**.
   * Debes agregar exactamente las mismas variables del `.env.local`:
     * Clave: `VITE_SUPABASE_URL` | Valor: *(Tu URL de Supabase)*
     * Clave: `VITE_SUPABASE_ANON_KEY` | Valor: *(Tu anon key de Supabase)*

4. **Desplegar:**
   * Haz clic en **Deploy**.
   * Vercel construirá los archivos para producción y en menos de un minuto te asignará una URL en vivo (ej. `https://the-debugger-ant.vercel.app`).
