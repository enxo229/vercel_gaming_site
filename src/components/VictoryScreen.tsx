import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy } from 'lucide-react';

export const VictoryScreen: React.FC = () => {
    const { score, lives, resetGame, goToLeaderboard, submitScore, username } = useGameStore();
    const submitted = useRef(false);

    useEffect(() => {
        if (!submitted.current) {
            submitted.current = true;
            submitScore(); // Enviar puntos automáticamente al ganar
        }
    }, [submitScore]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="bg-gray-800 p-8 border-4 border-yellow-500 rounded-lg shadow-[0_0_40px_rgba(234,179,8,0.5)] max-w-md w-full">
                <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">¡SISTEMA ESTABLE!</h1>
                <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed">
                    Excelente trabajo, <span className="text-green-400 font-bold">{username}</span>. Has erradicado todos los bugs de observabilidad y logrado {lives} vidas restantes.
                </p>

                <div className="bg-gray-900 border-2 border-yellow-600/50 p-4 mb-8">
                    <p className="text-sm text-gray-400">PUNTAJE FINAL</p>
                    <p className="text-4xl font-bold text-yellow-400">{score}</p>
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
                        className="bg-gray-700 hover:bg-gray-600 text-green-400 font-bold py-3 px-6 rounded uppercase transition-colors"
                    >
                        INICIAR NUEVA ASIGNACIÓN
                    </button>
                </div>
            </div>
        </div>
    );
};
