# 🐜 Contexto del Proyecto: The Debugger Ant

Este documento (`agents.md`) proporciona el contexto general del proyecto "The Debugger Ant", diseñado para ser leído rápidamente por agentes de inteligencia artificial y desarrolladores que se incorporen al proyecto.

## 🎯 Descripción General
**The Debugger Ant** es un videojuego web basado en trivia (preguntas y respuestas) enfocado en educar y evaluar conocimientos sobre **Observabilidad (O11y)**, implementando conceptos de OpenTelemetry, métricas, logs, trazas y herramientas relacionadas. El juego cuenta con una temática de 8-bits / pixel art donde los enemigos son diferentes "bichos" que representan anti-patrones o problemas comunes en los sistemas.

## 🛠 Stack Tecnológico
- **Frontend / Core:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS v4, con uso de tipografía pixelada `Press Start 2P`.
- **Estado Global:** Zustand (para el flujo del juego, puntuaciones, estado de sonido, etc.).
- **Backend / Base de Datos:** Supabase (almacenamiento de tabla `leaderboard`).
- **Despliegue:** Vercel (Front) y Supabase (DB).

## 🧩 Arquitectura y Flujo de Pantallas
El flujo principal es gestionado por un componente principal en `App.tsx` que renderiza diferentes "pantallas" según el estado global manejado en `gameStore.ts`:
1. **START_SCREEN:** Inicio del juego, registro del alias (que se valida en Supabase para asegurar que sea único).
2. **INSTRUCTIONS:** Muestra las reglas e historia breve del juego.
3. **PLAYING:** Trivia interactiva donde el jugador ("El Héroe") enfrenta a múltiples enemigos contestando preguntas.
4. **GAME_OVER:** Pantalla de derrota si se falla una pregunta o se queda sin vidas.
5. **VICTORY:** Pantalla de éxito tras superar al enemigo predeterminado/jefe.
6. **LEADERBOARD:** Ranking global con los puntajes de los jugadores (Lectura usando RLS de Supabase).

## 🪲 Enemigos y Temática
Cada pregunta (`questions.ts`) cuenta con un enemigo asociado temático a los problemas de TI, por ejemplo:
- *La Araña Embobadora*
- *El Grillo de los silos*
- *La Abeja de eBPF*
- *La Mariquita de la Fatiga* (Fatiga de alertas)
- *La Mantis de la Configuración*

## 💡 Funcionalidades Clave
- **Sincronización Offline:** El juego soporta que los jugadores terminen una partida sin conexión. El score se guarda en `localStorage` y la aplicación intenta enviarlo mediante `syncScore` cuando retoma la conexión.
- **Manejo de Audio:** Un contexto dedicado (`AudioContext`) para el control de música/SFX en un estado muteado/no muteado persistente a lo largo de las vistas.
- **Protección de Datos:** Las puntuaciones dependen de políticas de RLS en Supabase que permiten inserciones anónimas pero evitan que usuarios modifiquen el historial, garantizando además unicidad de alias de jugadores.

## 🚀 Despliegue
- Las instrucciones detalladas viven en `DEPLOYMENT.md`.
- El esquema necesario en Supabase está en `SUPABASE_SETUP.sql`.
- Despliegue en producción facilitado e integrado con GitHub y Vercel.

Este archivo servirá de referencia base para cualquier iteración futura sobre las vistas, la lógica de sincronización o manejo de nuevo contenido para la trivia.
