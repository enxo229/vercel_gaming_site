import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy } from 'lucide-react';

export const VictoryScreen: React.FC = () => {
    const { score, lives, resetGame, goToLeaderboard, submitScore, username } = useGameStore();
    const submitted = useRef(false);

    useEffect(() => {
        if (!submitted.current) {
            submitted.current = true;
            submitScore();
        }
    }, [submitScore]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center w-full">
            <div className="gb-dialogue max-w-md w-full border-8">
                <Trophy className="w-20 h-20 text-gb-darkest mx-auto mb-6 animate-bounce" />
                <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-relaxed">SISTEMA<br />ESTABLE</h1>

                <div className="border-y-4 border-gb-darkest py-4 mb-6">
                    <p className="text-xs leading-relaxed">
                        EXCELENTE, {username}.<br />
                        SRE MISSION CLEAR.<br />
                        HP RESTANTE: {lives}
                    </p>
                </div>

                <div className="bg-gb-darkest text-gb-lightest gb-border p-4 mb-8">
                    <p className="text-[10px] mb-2">PUNTAJE FINAL</p>
                    <p className="text-3xl font-bold">{score.toString().padStart(5, '0')}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={goToLeaderboard}
                        className="gb-button py-4 font-bold text-xs bg-gb-lightest"
                    >
                        VER RANKING
                    </button>

                    <button
                        onClick={resetGame}
                        className="gb-button py-4 font-bold text-xs bg-gb-dark text-gb-lightest hover:bg-gb-light"
                    >
                        NUEVA MISIÓN
                    </button>
                </div>
            </div>
        </div>
    );
};
