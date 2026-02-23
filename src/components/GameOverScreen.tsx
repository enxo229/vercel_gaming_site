import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Skull } from 'lucide-react';

export const GameOverScreen: React.FC = () => {
    const { score, currentLevel, resetGame, goToLeaderboard, submitScore, username } = useGameStore();
    const submitted = useRef(false);

    useEffect(() => {
        if (!submitted.current) {
            submitted.current = true;
            submitScore();
        }
    }, [submitScore]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center w-full bg-[url('/sprites/background_7_8_9.png')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-red-900/60 z-0 pointer-events-none mix-blend-multiply"></div>

            <div className="bg-[#1a1a1a] border-[6px] border-[#dc2626] relative z-10 max-w-md w-full p-8 shadow-[8px_8px_0px_#450a0a]">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#dc2626] p-4 rounded-full border-4 border-[#1a1a1a] shadow-[4px_4px_0px_#450a0a]">
                        <Skull className="w-16 h-16 text-black animate-pulse" />
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-4 font-['Press_Start_2P'] text-[#ef4444] leading-loose drop-shadow-md">
                    GAME OVER
                </h1>

                <div className="border-t-4 border-b-4 border-[#dc2626] py-4 mb-6">
                    <p className="text-[10px] md:text-xs mb-2 leading-relaxed font-['Press_Start_2P'] text-gray-300">
                        SISTEMA COLAPSADO<br />
                        EN NIVEL {currentLevel}.
                    </p>
                    <p className="text-[8px] md:text-[10px] text-[#ef4444] font-bold mt-4 font-['Press_Start_2P'] animate-pulse">
                        ALERTA P0 GENERADA.
                    </p>
                </div>

                <div className="bg-black text-[#f8f0e3] border-4 border-[#dc2626] p-4 mb-8">
                    <p className="text-[8px] md:text-[10px] mb-4 font-['Press_Start_2P'] text-gray-400">PUNTAJE FINAL DE {username}</p>
                    <p className="text-xl md:text-2xl font-bold font-['Press_Start_2P']">{score.toString().padStart(5, '0')}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={goToLeaderboard}
                        className="bg-[#1a1a1a] border-4 border-gray-500 py-3 font-['Press_Start_2P'] text-[10px] text-gray-300 shadow-[4px_4px_0px_black] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
                    >
                        VER RANKING
                    </button>

                    <button
                        onClick={resetGame}
                        className="bg-[#ef4444] border-4 border-[#7f1d1d] py-3 font-['Press_Start_2P'] text-[10px] text-white shadow-[4px_4px_0px_#450a0a] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all active:bg-red-800"
                    >
                        REINTENTAR
                    </button>
                </div>
            </div>
        </div>
    );
};
