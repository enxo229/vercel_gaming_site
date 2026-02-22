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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center w-full">
            <div className="gb-dialogue max-w-md w-full">
                <Skull className="w-20 h-20 mx-auto mb-6 animate-pulse text-gb-darkest" />
                <h1 className="text-3xl font-bold mb-4 tracking-widest">GAME OVER</h1>

                <div className="border-y-4 border-gb-darkest py-4 mb-6">
                    <p className="text-xs mb-2 leading-relaxed">
                        SISTEMA COLAPSADO<br />
                        EN NIVEL {currentLevel}.
                    </p>
                    <p className="text-[10px] text-gb-dark font-bold mt-2">ALERTA P0 GENERADA.</p>
                </div>

                <div className="bg-gb-darkest text-gb-lightest gb-border p-4 mb-8">
                    <p className="text-[10px] mb-2">PUNTAJE FINAL DE {username}</p>
                    <p className="text-2xl font-bold">{score.toString().padStart(5, '0')}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={goToLeaderboard}
                        className="gb-button py-4 font-bold text-xs"
                    >
                        VER RANKING
                    </button>

                    <button
                        onClick={resetGame}
                        className="gb-button py-4 font-bold text-xs bg-gb-dark text-gb-lightest"
                    >
                        REINTENTAR
                    </button>
                </div>
            </div>
        </div>
    );
};
