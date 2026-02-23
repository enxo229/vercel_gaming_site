import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useAudio } from '../contexts/AudioContext';

export const InstructionsScreen: React.FC = () => {
    const { startBattle } = useGameStore();
    const { playSFX, playBGM } = useAudio();

    const FullTextContent = () => (
        <>
            Hola! soy la general Abril y tengo una <span className="text-purple-600 drop-shadow-[1px_1px_0px_#fff]">misión</span> para ti,
            a continuación enfrentarás a los enemigos más peligrosos de la <span className="text-blue-600 drop-shadow-[1px_1px_0px_#fff]">resiliencia</span>,
            la <span className="text-green-600 drop-shadow-[1px_1px_0px_#fff]">continuidad</span> y la <span className="text-amber-600 drop-shadow-[1px_1px_0px_#fff]">disponibilidad</span>.
            Tienes solamente <span className="text-red-600 animate-pulse drop-shadow-[1px_1px_0px_#fff]">20 segundos</span> para responder correctamente las preguntas y vencer a cada uno.
            Recibirás puntos por responder bien y más puntos entre <span className="text-[#d4af37] drop-shadow-[1px_1px_0px_#000]">más rápido</span> respondas.
            Recuerda que responder <span className="text-red-700 underline drop-shadow-[1px_1px_0px_#fff]">mal no te da puntos</span>.
            Solo tienes <span className="text-pink-600 drop-shadow-[1px_1px_0px_#fff]">tres vidas</span> para proteger nuestros sistemas vitales,
            <span className="text-[#d4af37] block mt-2 text-center animate-bounce drop-shadow-[1px_1px_0px_#000]">¡Cuento contigo!</span>
        </>
    );
    const handleContinue = () => {
        playSFX('click');
        playBGM();
        startBattle();
    };

    return (
        <div className="flex flex-col items-center justify-between h-screen w-full bg-[url('/sprites/bgn_space.png')] bg-cover bg-center relative overflow-hidden select-none">
            {/* Overlay to ensure background doesn't drown the sprite */}
            <div className="absolute inset-0 bg-black/20 z-0"></div>

            {/* Character Sprite positioned at top/center (60% height) */}
            <div className="relative z-10 w-full h-[60vh] py-4 flex items-end justify-center">
                <img
                    src="/sprites/abril.png"
                    alt="General Abril"
                    className="h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform animate-[pulse_3s_ease-in-out_infinite]"
                />
            </div>

            {/* RPG Dialogue Box at the bottom (40% height) */}
            <div className="w-full h-[40vh] bg-[#f8f0e3] border-t-[6px] border-[#2d1b00] p-4 md:p-6 flex flex-col z-30 shadow-[0_-8px_0px_#2d1b00] relative font-['Press_Start_2P'] overflow-hidden">
                <div className="absolute inset-x-0 top-0 bottom-0 border-4 border-t-0 border-[#d4af37] pointer-events-none z-20"></div>

                <div className="flex flex-col h-full relative z-10">
                    <div className="mb-3 flex-shrink-0">
                        <span className="bg-[#2d1b00] text-white text-[10px] md:text-xs px-3 py-2 border-2 border-[#d4af37]">
                            GENERAL ABRIL
                        </span>
                    </div>

                    <div className="flex-1 mt-2 overflow-y-auto custom-scrollbar pr-2 mb-4">
                        <div className="text-[10px] md:text-xs leading-loose md:leading-loose text-[#2d1b00] break-words">
                            <FullTextContent />
                        </div>
                    </div>

                    <div className="flex justify-end mt-auto flex-shrink-0">
                        <button
                            onClick={handleContinue}
                            className="bg-[#2d1b00] text-white border-4 border-[#d4af37] px-4 py-3 text-[10px] md:text-xs hover:bg-black hover:scale-105 active:scale-95 transition-all outline-none shadow-[4px_4px_0px_#d4af37] active:shadow-[0px_0px_0px_#d4af37] active:translate-x-1 active:translate-y-1"
                        >
                            ¡ENTENDIDO! ►
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
