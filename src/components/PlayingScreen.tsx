import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { GAME_QUESTIONS } from '../data/questions';
import { Heart, Clock, Bug, ShieldAlert } from 'lucide-react';

const MAX_TIME_MS = 15000;

export const PlayingScreen: React.FC = () => {
    const { lives, score, currentLevel, username, answerQuestion } = useGameStore();
    const currentQ = GAME_QUESTIONS[currentLevel - 1];

    const [timeLeft, setTimeLeft] = useState(MAX_TIME_MS);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

    const startTimeRef = useRef<number>(Date.now());
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        // Start or restart the level timer
        startTimeRef.current = Date.now();
        setTimeLeft(MAX_TIME_MS);
        setSelectedOption(null);
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
        setFeedback({ isCorrect: false, message: 'TIME OVER! BUG ATACO (-1 HP)' });
        setTimeout(() => {
            answerQuestion(false, MAX_TIME_MS);
        }, 3000);
    };

    const handleOptionClick = (index: number) => {
        if (feedback !== null) return;

        stopTimer();
        setSelectedOption(index);

        const timeTakenMs = Date.now() - startTimeRef.current;
        const isCorrect = index === currentQ.correctOptionIndex;

        setFeedback({
            isCorrect,
            message: isCorrect ? currentQ.feedback.success : currentQ.feedback.failure
        });

        setTimeout(() => {
            answerQuestion(isCorrect, timeTakenMs);
        }, 3000);
    };

    const timePercentage = (timeLeft / MAX_TIME_MS) * 100;
    const isDangerTime = timeLeft < 5000;

    return (
        <div className="flex flex-col min-h-screen p-2 md:p-4 max-w-4xl mx-auto w-full font-sans">

            {/* HUD (Top Bar) */}
            <header className="flex justify-between items-center bg-gb-darkest text-gb-lightest p-3 md:p-4 rounded-t shadow-md mb-4 border-4 border-gb-darkest">
                <div className="flex flex-col text-left">
                    <span className="text-[10px] md:text-sm uppercase tracking-widest">{username}</span>
                    <span className="text-sm md:text-xl font-bold mt-1 tracking-widest">LVL {currentLevel}</span>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] md:text-[10px] mb-1">HP</span>
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`w-4 h-4 md:w-6 md:h-6 ${i < lives ? 'fill-gb-lightest' : 'fill-gb-dark opacity-50'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] md:text-[10px] mb-1">SCORE</span>
                        <span className="text-sm md:text-xl font-bold">
                            {score.toString().padStart(5, '0')}
                        </span>
                    </div>
                </div>
            </header>

            {/* COMBAT ARENA */}
            <div className="gb-dialogue flex flex-col items-center mb-6 py-8">
                <Bug className={`w-16 h-16 md:w-24 md:h-24 mb-4 transition-transform ${feedback?.isCorrect ? 'opacity-20 translate-y-4' : 'animate-pulse'}`} />
                <h2 className="text-lg md:text-2xl font-bold mb-6 text-center tracking-widest">
                    {currentQ.enemyName}
                </h2>

                {/* TIMER BAR */}
                <div className="w-full max-w-md gb-border h-6 bg-gb-lightest relative overflow-hidden flex items-center p-1">
                    <div
                        className={`h-full transition-all duration-75 ${isDangerTime ? 'bg-gb-darkest animate-pulse' : 'bg-gb-dark'}`}
                        style={{ width: `${timePercentage}%` }}
                    ></div>
                </div>
                <div className="flex items-center mt-2 text-xs md:text-sm gap-2 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>{(timeLeft / 1000).toFixed(1)}s</span>
                </div>
            </div>

            {/* RPG DIALOGUE BOX (QUESTION) */}
            <div className="gb-dialogue mb-4 relative min-h-[120px] flex items-start">
                <div className="absolute -top-3 -left-3 bg-gb-darkest text-gb-lightest p-2 rounded-full border-2 border-gb-lightest">
                    <ShieldAlert className="w-5 h-5" />
                </div>
                <p className="text-xs md:text-base leading-relaxed text-left pt-2 ml-4">
                    <span className="font-bold mr-2">{">"}</span>{currentQ.question}
                </p>
            </div>

            {/* COMMAND MENU (OPTIONS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-auto">
                {currentQ.options.map((option, index) => {
                    let extraClass = "";

                    if (feedback) {
                        if (index === currentQ.correctOptionIndex) {
                            extraClass = "bg-gb-dark text-gb-lightest border-gb-darkest animate-pulse";
                        } else if (index === selectedOption) {
                            extraClass = "bg-gb-darkest text-gb-lightest line-through opacity-80";
                        } else {
                            extraClass = "opacity-30";
                        }
                    }

                    return (
                        <button
                            key={index}
                            disabled={feedback !== null}
                            onClick={() => handleOptionClick(index)}
                            className={`gb-button p-4 text-xs md:text-sm text-left flex items-start ${extraClass}`}
                        >
                            <span className="mr-3 font-bold opacity-70">[{index + 1}]</span>
                            <span className="leading-relaxed">{option}</span>
                        </button>
                    );
                })}
            </div>

            {/* RPG BATTLE TEXT OVERLAY */}
            {feedback && (
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 bg-gb-darkest/80">
                    <div className={`gb-dialogue animate-bounce max-w-lg mx-4`}>
                        <span className="text-xl md:text-2xl font-bold uppercase leading-relaxed text-center block mb-4 border-b-4 border-gb-darkest pb-4">
                            {feedback.isCorrect ? '¡HIT EFECTIVO!' : '¡ATAQUE RECIBIDO!'}
                        </span>
                        <span className="text-xs md:text-sm block text-center leading-relaxed">
                            {feedback.message}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
