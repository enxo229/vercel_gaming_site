import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { GAME_QUESTIONS } from '../data/questions';
import { Heart } from 'lucide-react';

const MAX_TIME_MS = 15000;

export const PlayingScreen: React.FC = () => {
    const { lives, score, currentLevel, username, answerQuestion } = useGameStore();
    const currentQ = GAME_QUESTIONS[currentLevel - 1];

    const [timeLeft, setTimeLeft] = useState(MAX_TIME_MS);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

    const startTimeRef = useRef<number>(Date.now());
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        startTimeRef.current = Date.now();
        setTimeLeft(MAX_TIME_MS);
        setFeedback(null);

        const updateTimer = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = Math.max(0, MAX_TIME_MS - elapsed);
            setTimeLeft(remaining);

            if (remaining <= 0) {
                handleTimeOut();
            } else {
                timerRef.current = requestAnimationFrame(updateTimer);
            }
        };

        timerRef.current = requestAnimationFrame(updateTimer);

        return () => {
            if (timerRef.current) cancelAnimationFrame(timerRef.current);
        };
    }, [currentLevel]);

    const stopTimer = () => {
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };

    const handleTimeOut = () => {
        stopTimer();
        setFeedback({ isCorrect: false, message: '¡El tiempo se ha agotado!' });
        setTimeout(() => {
            answerQuestion(false, MAX_TIME_MS);
        }, 2500);
    };

    const handleOptionClick = (index: number) => {
        if (feedback !== null) return;

        stopTimer();

        const timeTakenMs = Date.now() - startTimeRef.current;
        const isCorrect = index === currentQ.correctOptionIndex;

        setFeedback({
            isCorrect,
            message: isCorrect ? currentQ.feedback.success : currentQ.feedback.failure
        });

        setTimeout(() => {
            answerQuestion(isCorrect, timeTakenMs);
        }, 2500);
    };

    const timePercentage = Math.max(0, (timeLeft / MAX_TIME_MS) * 100);
    const hpColor = timePercentage > 50 ? 'bg-[#48d0b0]' : timePercentage > 20 ? 'bg-[#f8d030]' : 'bg-[#f86048]';

    return (
        <div className="w-full h-screen max-w-lg md:max-w-4xl mx-auto flex flex-col font-sans select-none">

            {/* 65% BATTLE ARENA */}
            <div className="relative w-full h-[65vh] bg-[#d0f8d0] overflow-hidden">
                {/* Arena Background circles/ellipses (Optional decorative to ground sprites) */}
                <div className="absolute top-20 right-8 w-48 h-12 bg-green-300 rounded-[100%] opacity-50"></div>
                <div className="absolute bottom-12 left-8 w-64 h-16 bg-green-300 rounded-[100%] opacity-50"></div>

                {/* --- ENEMY STATUS BOX (Top Left) --- */}
                <div className="absolute top-4 left-4 pk-status-box w-56 md:w-64 z-10">
                    <div className="flex justify-between items-end mb-1">
                        <h2 className="text-xs md:text-sm font-bold uppercase tracking-tighter truncate pr-2">
                            {currentQ.enemyName}
                        </h2>
                        <span className="text-[10px] md:text-xs">Lv{currentLevel}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#484048] p-1 rounded-full border-2 border-[#506860]">
                        <span className="text-[8px] text-yellow-500 font-bold ml-1">HP</span>
                        <div className="flex-1 h-2 md:h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-75 ${hpColor}`}
                                style={{ width: `${timePercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* --- ENEMY SPRITE (Top Right) --- */}
                <div className="absolute top-12 right-8 md:top-8 md:right-16 z-0">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentLevel * 10}.png`}
                        alt="Enemy Bug"
                        className={`w-32 h-32 md:w-48 md:h-48 pixel-art drop-shadow-lg transition-transform ${feedback?.isCorrect ? 'opacity-20 translate-y-4' : 'animate-bounce'}`}
                    />
                </div>

                {/* --- PLAYER SPRITE (Bottom Left) --- */}
                <div className="absolute bottom-8 left-4 md:bottom-4 md:left-12 z-10">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/214.png"
                        alt="Player Ant"
                        className="w-40 h-40 md:w-64 md:h-64 pixel-art drop-shadow-xl opacity-90"
                    />
                </div>

                {/* --- PLAYER STATUS BOX (Bottom Right, just above panel) --- */}
                <div className="absolute bottom-4 right-4 pk-status-box w-56 md:w-64 z-20 shadow-xl">
                    <div className="flex justify-between items-end mb-1">
                        <h2 className="text-xs md:text-sm font-bold uppercase tracking-tighter truncate pr-2">
                            {username}
                        </h2>
                        <span className="text-[10px] md:text-xs">Lv99</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1 bg-[#484048] p-1 rounded-full border-2 border-[#506860] px-2 justify-end">
                        {[...Array(3)].map((_, i) => (
                            <Heart
                                key={i}
                                className={`w-4 h-4 md:w-5 md:h-5 ${i < lives ? 'fill-[#f86048] text-[#f86048]' : 'fill-gray-600 text-gray-600'}`}
                            />
                        ))}
                    </div>
                    <div className="text-right text-[10px] md:text-xs text-gray-600 font-bold">
                        PTS: {score.toString().padStart(4, '0')}
                    </div>
                </div>
            </div>

            {/* 35% ACTION PANEL (Dialogue & Buttons) */}
            <div className="w-full h-[35vh] pk-dialogue-box p-4 md:p-6 flex flex-col z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">

                {feedback ? (
                    // BATTLE TEXT FEEDBACK
                    <div className="flex-1 flex items-center justify-center p-4">
                        <p className="text-sm md:text-lg leading-loose uppercase animate-pulse text-center">
                            {feedback.message}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col h-full gap-4">
                        {/* QUESTION TEXT */}
                        <div className="flex-1 border-b-2 border-gray-300 pb-2">
                            <p className="text-[10px] md:text-sm leading-relaxed uppercase">
                                {currentQ.question}
                            </p>
                        </div>

                        {/* GRID 2x2 BUTTONS */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 h-1/2">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    className="pk-button rounded border-2 border-transparent hover:border-[#d05068] text-[9px] md:text-xs text-left px-2 uppercase shadow-sm flex items-center"
                                >
                                    <span className="text-[#d05068] font-bold mr-2 text-[12px]">{">"}</span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
