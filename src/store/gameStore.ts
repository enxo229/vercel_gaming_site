import { create } from 'zustand';

export type GameScreen = 'START_SCREEN' | 'PLAYING' | 'GAME_OVER' | 'VICTORY' | 'LEADERBOARD';

interface GameState {
    screen: GameScreen;
    username: string;
    score: number;
    lives: number;
    currentLevel: number;

    setUsername: (name: string) => void;
    startGame: () => void;
    answerQuestion: (isCorrect: boolean, timeTakenMs: number) => void;
    setScreen: (screen: GameScreen) => void;
    resetGame: () => void;
    goToLeaderboard: () => void;
    submitScore: (alias?: string) => Promise<'success' | 'offline' | 'error'>;
}

const MAX_LEVELS = 10;
const MAX_TIME_MS = 20000;
const BASE_SCORE = 100;

export const useGameStore = create<GameState>((set, get) => ({
    screen: 'START_SCREEN',
    username: '',
    score: 0,
    lives: 3,
    currentLevel: 1,

    setUsername: (name: string) => set({ username: name }),

    startGame: () => set({
        screen: 'PLAYING',
        score: 0,
        lives: 3,
        currentLevel: 1
    }),

    setScreen: (screen: GameScreen) => set({ screen }),

    answerQuestion: (isCorrect: boolean, timeTakenMs: number) => {
        const state = get();

        // Calcula la puntuación si es correcto
        let levelScore = 0;
        if (isCorrect && timeTakenMs < MAX_TIME_MS) {
            const timeBonus = Math.floor(((MAX_TIME_MS - timeTakenMs) / MAX_TIME_MS) * 200);
            levelScore = BASE_SCORE + timeBonus;
        }

        const newLives = isCorrect ? state.lives : state.lives - 1;
        const newScore = state.score + levelScore;

        // Lógica para avanzar al siguiente nivel o terminar
        // Si llegamos a <= 0 vidas => Game Over inmediato.
        if (newLives <= 0) {
            set({ lives: 0, score: newScore, screen: 'GAME_OVER' });
            return;
        }

        // Si pasamos el último nivel y no hemos muerto => Victoria
        if (state.currentLevel >= MAX_LEVELS) {
            set({ lives: newLives, score: newScore, screen: 'VICTORY' });
        } else {
            // Avanzar al siguiente nivel
            set({
                lives: newLives,
                score: newScore,
                currentLevel: state.currentLevel + 1
            });
        }
    },

    resetGame: () => set({
        screen: 'START_SCREEN',
        score: 0,
        lives: 3,
        currentLevel: 1,
        username: ''
    }),

    goToLeaderboard: () => set({ screen: 'LEADERBOARD' }),

    submitScore: async (alias?: string) => {
        const { username, score } = get();
        if (score === 0 || !username) return 'error';

        const finalName = alias ? `${username} - ${alias}` : username;

        try {
            const { supabase } = await import('../lib/supabase');
            const { error } = await supabase.from('leaderboard').insert([{ username: finalName, score }]);

            if (error) {
                console.error('Error enviando puntuación:', error);
                // Si falla la inserción por un error (p.ej. de red), guardar offline
                localStorage.setItem('offline_pending_score', JSON.stringify({ username: finalName, score }));
                return 'offline';
            }
            return 'success';
        } catch (err) {
            console.error('Error de red enviando score:', err);
            // Capturar la caída de red o timeout
            localStorage.setItem('offline_pending_score', JSON.stringify({ username: finalName, score }));
            return 'offline';
        }
    }
}));
