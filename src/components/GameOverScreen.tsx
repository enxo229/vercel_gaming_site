import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Skull } from 'lucide-react';

export const GameOverScreen: React.FC = () => {
    const { score, currentLevel, resetGame, goToLeaderboard, submitScore, username } = useGameStore();
    const submitted = useRef(false);
    const [showOfflineAlert, setShowOfflineAlert] = useState(false);

    useEffect(() => {
        if (!submitted.current) {
            submitted.current = true;
            submitScore().then(status => {
                if (status === 'offline') setShowOfflineAlert(true);
            });
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

                <div className="border-4 border-[#dc2626] bg-[#450a0a] p-4 mb-6 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                    {/* Barras diagonales de peligro de fondo animadas (opcional, estilizado) */}
                    <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ef4444_10px,#ef4444_20px)] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <p className="text-[10px] md:text-xs leading-relaxed font-['Press_Start_2P'] text-[#fca5a5]">
                            SISTEMA COLAPSADO EN NIVEL {currentLevel}
                        </p>

                        <div className="w-full h-1 bg-[#dc2626] my-2 shadow-[0_0_5px_#ef4444] animate-pulse"></div>

                        <p className="text-[8px] md:text-[9px] text-white font-bold font-['Press_Start_2P'] animate-pulse leading-loose drop-shadow-[0_2px_2px_#000]">
                            ⚠️ INCIDENTE CRÍTICO EN PROCESO, INICIAR WAR ROOM DE INMEDIATO ⚠️
                        </p>
                    </div>
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

            {/* ALERTA DE MODO OFFLINE */}
            {showOfflineAlert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#f8f0e3] border-[6px] border-[#dc2626] p-6 max-w-sm w-full text-center shadow-[8px_8px_0px_#000] relative">
                        <div className="absolute inset-0 border-4 border-[#ef4444] pointer-events-none"></div>
                        <h2 className="font-['Press_Start_2P'] text-[#dc2626] text-sm md:text-base mb-4 leading-loose relative z-10">
                            ⚠️ CONEXIÓN PERDIDA
                        </h2>
                        <p className="font-['Press_Start_2P'] text-[8px] md:text-[10px] text-[#2d1b00] leading-loose relative z-10">
                            Puntaje guardado en el dispositivo. No cierres la pestaña, se enviará cuando vuelvas a estar en línea.
                        </p>
                        <button
                            onClick={() => setShowOfflineAlert(false)}
                            className="mt-6 bg-white border-4 border-[#2d1b00] py-2 px-4 text-[10px] font-['Press_Start_2P'] text-[#2d1b00] uppercase shadow-[4px_4px_0px_#2d1b00] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:bg-gray-200 relative z-10"
                        >
                            ENTENDIDO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
