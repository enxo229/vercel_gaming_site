import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart } from 'lucide-react';

const TITLES = [
    "Gran Oráculo de las Métricas",
    "Maestro del Uptime",
    "Cazador de Bugs Nivel 99",
    "Héroe del Despliegue",
    "Arquitecto de la Resiliencia",
    "Salvador de Producción",
    "Leyenda de la Observabilidad"
];

export const VictoryScreen: React.FC = () => {
    const { score, lives, resetGame, goToLeaderboard, submitScore } = useGameStore();
    const submitted = useRef(false);
    const [honorific, setHonorific] = useState('');

    useEffect(() => {
        // Asignar apodo aleatorio
        setHonorific(TITLES[Math.floor(Math.random() * TITLES.length)]);

        if (!submitted.current) {
            submitted.current = true;
            submitScore();
        }
    }, [submitScore]);

    return (
        <div className="flex flex-col items-center justify-between h-screen w-screen p-4 bg-[url('/sprites/background.png')] bg-cover bg-center relative overflow-hidden font-['Press_Start_2P'] select-none">
            {/* Overlay nocturno atmosférico */}
            <div className="absolute inset-0 bg-blue-900/60 z-0 pointer-events-none mix-blend-multiply"></div>

            {/* Personaje Central */}
            <div className="flex-1 flex items-center justify-center relative z-10 w-full mt-8 md:mt-16">
                <img
                    src="/sprites/ant_player.png"
                    alt="Hero Ant"
                    className="w-48 h-48 md:w-64 md:h-64 pixel-art drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] animate-bounce"
                />
            </div>

            {/* Caja de Pergamino */}
            <div className="w-full max-w-2xl relative z-10 mb-4 flex flex-col gap-4">
                <div className="bg-[#f8f0e3] border-[6px] border-[#2d1b00] p-6 shadow-[8px_8px_0px_#2d1b00] relative text-center">
                    {/* Borde dorado interno doble */}
                    <div className="absolute inset-0 border-4 border-[#d4af37] pointer-events-none"></div>

                    <h1 className="text-lg md:text-xl text-[#d4af37] drop-shadow-[2px_2px_0px_#2d1b00] font-bold mb-4 leading-loose relative z-20">
                        ¡SISTEMA ESTABILIZADO!
                    </h1>

                    <h2 className="text-[10px] md:text-xl text-[#2d1b00] mb-6 uppercase leading-relaxed relative z-20">
                        "{honorific}"
                    </h2>

                    <div className="grid grid-cols-2 gap-4 border-t-4 border-b-4 border-[#2d1b00] py-4 mb-4 relative z-20">
                        <div className="flex flex-col items-center justify-center border-r-4 border-[#2d1b00]">
                            <span className="text-[8px] md:text-[10px] text-gray-500 mb-2">PUNTAJE FINAL</span>
                            <span className="text-lg md:text-xl text-[#2d1b00]">{score.toString().padStart(5, '0')}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-[8px] md:text-[10px] text-gray-500 mb-2">ESTADO DEL HÉROE</span>
                            <div className="flex gap-2 justify-center mt-2">
                                {[...Array(3)].map((_, i) => (
                                    <Heart
                                        key={i}
                                        className={`w-5 h-5 md:w-8 md:h-8 ${i < lives ? 'fill-red-500 text-red-500' : 'fill-gray-400 text-gray-400'} drop-shadow-sm`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-[6px] md:text-[8px] text-[#8b5a2b] mt-4 uppercase relative z-20">
                        Creado enteramente con IA por el CoE Prime Ops
                    </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col md:flex-row gap-4 justify-center px-4">
                    <button
                        onClick={goToLeaderboard}
                        className="flex-1 bg-white border-4 border-[#2d1b00] py-4 px-6 text-[10px] md:text-xs font-['Press_Start_2P'] text-[#2d1b00] uppercase shadow-[4px_4px_0px_#2d1b00] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#2d1b00] transition-all active:bg-gray-200"
                    >
                        VER RANKING
                    </button>
                    <button
                        onClick={resetGame}
                        className="flex-1 bg-[#2d1b00] border-4 border-[#2d1b00] py-4 px-6 text-[10px] md:text-xs font-['Press_Start_2P'] text-white uppercase shadow-[4px_4px_0px_#d4af37] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#d4af37] transition-all active:bg-black"
                    >
                        NUEVA MISIÓN
                    </button>
                </div>
            </div>
        </div>
    );
};
