import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { GAME_QUESTIONS } from '../data/questions';
import { Heart } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
const MAX_TIME_MS = 20000;
export const PlayingScreen: React.FC = () => {
    const { lives, score, currentLevel, username, answerQuestion } = useGameStore();
    const { playSFX } = useAudio();
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
        playSFX('hit');
        setFeedback({ isCorrect: false, message: '¡El tiempo se ha agotado!' });
        setTimeout(() => {
            answerQuestion(false, MAX_TIME_MS);
        }, 5500);
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

        playSFX(isCorrect ? 'correct' : 'hit');

        setTimeout(() => {
            answerQuestion(isCorrect, timeTakenMs);
        }, 5500);
    };

    const timePercentage = Math.max(0, (timeLeft / MAX_TIME_MS) * 100);
    const hpColor = timePercentage > 50 ? 'bg-[#48d0b0]' : timePercentage > 20 ? 'bg-[#f8d030]' : 'bg-[#f86048]';

    const getBackgroundImage = () => {
        if (currentLevel >= 10) return '/sprites/final_background.png';
        if (currentLevel >= 8) return '/sprites/background_7_8_9.png';
        return '/sprites/background.png';
    };

    return (
        <div className="w-full h-screen max-w-lg md:max-w-4xl mx-auto flex flex-col font-sans select-none overflow-hidden">

            {/* BATTLE ARENA (50vh mobile, 55vh md) */}
            <div
                className="relative w-full h-[50vh] md:h-[55vh] overflow-hidden bg-cover bg-bottom flex-shrink-0"
                style={{ backgroundImage: `url("${getBackgroundImage()}")` }}
            >
                {/* Arena Background circles/ellipses (Optional decorative to ground sprites) */}
                <div className="absolute top-20 right-8 w-48 h-12 bg-black/20 rounded-[100%] blur-sm"></div>
                <div className="absolute bottom-12 left-8 w-64 h-16 bg-black/20 rounded-[100%] blur-sm"></div>

                {/* --- ENEMY STATUS BOX (Top Left) --- */}
                <div className="absolute top-4 left-4 pk-status-box w-80 md:w-96 z-10">
                    <div className="flex justify-between items-end mb-1">
                        <h2 className="text-xs md:text-sm font-bold uppercase tracking-tighter truncate pr-2">
                            {currentQ.enemyName}
                        </h2>
                        <span className="text-[8px] md:text-[10px] font-['Press_Start_2P'] text-gray-500">Lv{currentLevel}</span>
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
                <div className="absolute top-20 right-0 md:top-4 md:right-12 z-0">
                    <img
                        src={`/sprites/bug_${currentLevel}.png`}
                        alt="Enemy Bug"
                        className={`w-64 h-64 md:w-80 md:h-80 pixel-art drop-shadow-2xl transition-transform ${feedback?.isCorrect ? 'opacity-20 translate-y-4' : 'animate-bounce'}`}
                    />
                </div>

                {/* --- PLAYER SPRITE (Bottom Left) --- */}
                <div className="absolute bottom-20 left-0 md:bottom-0 md:left-8 z-10">
                    <img
                        src="/sprites/ant_player.png"
                        alt="Player Ant"
                        className="w-56 h-56 md:w-80 md:h-80 pixel-art drop-shadow-xl"
                    />
                </div>

                {/* --- PLAYER STATUS BOX (Bottom Right, just above panel) --- */}
                <div className="absolute bottom-4 right-4 pk-status-box w-80 md:w-96 z-20 shadow-xl">
                    <div className="flex justify-between items-end mb-1">
                        <h2 className="text-xs md:text-sm font-bold uppercase tracking-tighter truncate pr-2">
                            {username}
                        </h2>
                        <span className="text-[8px] md:text-[10px] font-['Press_Start_2P'] text-gray-500">Lv99</span>
                    </div>
                    <div className="flex justify-between items-center gap-1 mb-1 mt-1">
                        <div className="flex-1 bg-[#484048] p-1 rounded-full border-2 border-[#506860] flex items-center gap-1 px-2 justify-end">
                            {[...Array(3)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`w-3 h-3 md:w-4 md:h-4 ${i < lives ? 'fill-[#f86048] text-[#f86048]' : 'fill-gray-600 text-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] md:text-[10px] text-gray-600 font-bold mt-2 px-1">
                        <span className={`font-['Press_Start_2P'] text-xs md:text-sm drop-shadow-sm transition-colors ${timePercentage < 25 ? 'text-red-500 animate-pulse scale-110 origin-left drop-shadow-[1px_1px_0px_#000]' : 'text-[#2d1b00]'}`}>
                            ⏳ {(timeLeft / 1000).toFixed(1)}s
                        </span>
                        <span>PTS: {score.toString().padStart(4, '0')}</span>
                    </div>
                </div>
            </div>

            {/* ACTION PANEL (50vh mobile, 45vh md) */}
            <div className="w-full flex-1 min-h-[50vh] md:min-h-[45vh] bg-[#f8f0e3] border-t-[6px] border-[#2d1b00] p-4 md:p-6 flex flex-col z-30 shadow-[0_-8px_0px_#2d1b00] relative font-['Press_Start_2P'] overflow-hidden">

                {/* Doble Borde dorado interno simulado */}
                <div className="absolute inset-x-0 top-0 bottom-0 border-4 border-t-0 border-[#d4af37] pointer-events-none z-20"></div>

                <div className="flex flex-col h-full gap-4 relative z-10 overflow-y-auto custom-scrollbar pr-2 pb-4">
                    {/* QUESTION TEXT */}
                    <div className="border-b-4 border-[#2d1b00] pb-4 flex-shrink-0">
                        <p className="text-[10px] md:text-xs leading-loose md:leading-loose uppercase text-[#2d1b00] break-words">
                            {currentQ.question}
                        </p>
                    </div>

                    {/* GRID BUTTONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                        {currentQ.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={feedback !== null}
                                className="bg-white border-4 border-[#2d1b00] text-[#2d1b00] hover:bg-gray-200 text-[8px] md:text-[10px] text-left p-3 uppercase flex items-center shadow-[4px_4px_0px_#2d1b00] disabled:opacity-50 disabled:shadow-[4px_4px_0px_#2d1b00] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_#2d1b00]"
                            >
                                <span className="text-[#d4af37] font-bold mr-2 text-[10px] drop-shadow-[1px_1px_0px_#2d1b00] flex-shrink-0">{">"}</span>
                                <span className="break-words leading-loose md:leading-loose w-full">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FEEDBACK MODAL (GBA RPG POP-UP) */}
            {feedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div
                        className={`bg-[#f8f0e3] border-[6px] p-6 max-w-lg w-full shadow-[8px_8px_0px_rgba(0,0,0,0.5)] animate-bounce relative
                        ${feedback.isCorrect ? 'border-[#4ade80]' : 'border-[#ef4444]'}`}
                    >
                        {/* Inner Double Border */}
                        <div className={`absolute inset-0 border-4 pointer-events-none ${feedback.isCorrect ? 'border-[#22c55e]' : 'border-[#dc2626]'}`}></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <h2 className={`font-['Press_Start_2P'] text-lg md:text-xl mb-4 leading-loose
                                ${feedback.isCorrect ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}
                            >
                                {feedback.isCorrect ? '¡HIT EFECTIVO! ✔' : '¡ATAQUE RECIBIDO! ✖'}
                            </h2>
                            <p className="font-['Press_Start_2P'] text-[10px] md:text-xs text-[#2d1b00] leading-loose uppercase">
                                {feedback.message}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
