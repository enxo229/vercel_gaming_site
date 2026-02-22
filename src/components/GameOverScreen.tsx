import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Skull } from 'lucide-react';

export const GameOverScreen: React.FC = () => {
    const { score, currentLevel, resetGame, goToLeaderboard, submitScore } = useGameStore();
    const submitted = useRef(false);

    useEffect(() => {
        if (!submitted.current) {
            submitted.current = true;
            submitScore(); // Enviar puntos automáticamente al morir
        }
    }, [submitScore]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="bg-gray-800 p-8 border-4 border-red-600 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.5)] max-w-md w-full">
                <Skull className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" />
                <h1 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h1>
                <p className="text-gray-300 mb-6 font-mono">
                    Los Bugs han colapsado el sistema en el Nivel {currentLevel}.
                </p>

                <div className="bg-gray-900 border-2 border-gray-700 p-4 mb-8">
                    <p className="text-sm text-gray-400">PUNTAJE FINAL</p>
                    <p className="text-3xl font-bold text-yellow-400">{score}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={goToLeaderboard}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded uppercase transition-colors"
                    >
                        Ver Leaderboard
                    </button>

                    <button
                        onClick={resetGame}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded uppercase transition-colors"
                    >
                        Volver a Intentar
                    </button>
                </div>
            </div>
        </div>
    );
};
