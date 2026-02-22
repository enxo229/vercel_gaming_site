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
    }, [currentLevel]); // Re-run effect when level changes

    const stopTimer = () => {
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };

    const handleTimeOut = () => {
        stopTimer();
        setFeedback({ isCorrect: false, message: '¡Tiempo agotado! El Bug ha atacado. (-1 Vida)' });
        setTimeout(() => {
            answerQuestion(false, MAX_TIME_MS);
        }, 2500);
    };

    const handleOptionClick = (index: number) => {
        if (feedback !== null) return; // Prevent multiple clicks

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
        }, 2500);
    };

    // UI calculations
    const timePercentage = (timeLeft / MAX_TIME_MS) * 100;
    const isDangerTime = timeLeft < 5000;

    return (
        <div className="flex flex-col min-h-screen p-4 max-w-4xl mx-auto w-full">
            {/* HEADER SECTION */}
            <header className="flex justify-between items-center bg-gray-800 p-4 border-b-4 border-green-500 rounded-t-lg shadow-md mb-6">
                <div className="flex flex-col text-left">
                    <span className="text-green-400 text-sm uppercase">SRE: {username}</span>
                    <span className="text-xl font-bold text-white mt-1">NIVEL {currentLevel}/10</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-gray-400 mb-1">VIDAS</span>
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 mb-1">PUNTAJE</span>
                        <span className="text-xl font-bold text-yellow-400">
                            {score.toString().padStart(4, '0')}
                        </span>
                    </div>
                </div>
            </header>

            {/* ENEMY & TIMER SECTION */}
            <div className="flex flex-col items-center mb-8 relative">
                <div className="absolute inset-0 bg-red-900/10 blur-xl rounded-full"></div>
                <Bug className={`w-20 h-20 mb-2 transition-colors ${feedback?.isCorrect ? 'text-gray-600' : 'text-red-500 animate-pulse'}`} />
                <h2 className="text-2xl text-red-400 font-bold mb-6 text-center shadow-black drop-shadow-md z-10">
                    {currentQ.enemyName}
                </h2>

                <div className="w-full bg-gray-800 rounded-full h-4 border border-gray-600 overflow-hidden relative">
                    <div
                        className={`h-full transition-all duration-75 ${isDangerTime ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${timePercentage}%` }}
                    ></div>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-300 gap-2">
                    <Clock className="w-4 h-4" />
                    <span className={isDangerTime ? 'text-red-400 animate-pulse' : ''}>
                        {(timeLeft / 1000).toFixed(1)}s
                    </span>
                </div>
            </div>

            {/* QUESTION SECTION */}
            <div className="bg-gray-800 p-6 border-2 border-blue-500 rounded-lg shadow-lg mb-6 relative">
                <div className="absolute -top-4 -left-4 bg-blue-500 text-white p-2 rounded-full z-10">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-blue-100 text-left pt-2 font-mono ml-4">
                    {currentQ.question}
                </p>
            </div>

            {/* OPTIONS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option, index) => {
                    let btnClass = "bg-gray-800 border-2 border-gray-600 text-gray-200 hover:border-green-400 hover:text-green-400";

                    if (feedback) {
                        if (index === currentQ.correctOptionIndex) {
                            btnClass = "bg-green-900/50 border-2 border-green-500 text-green-300 animate-pulse";
                        } else if (index === selectedOption) {
                            btnClass = "bg-red-900/50 border-2 border-red-500 text-red-300 line-through";
                        } else {
                            btnClass = "bg-gray-900 border-2 border-gray-800 text-gray-600 opacity-50";
                        }
                    }

                    return (
                        <button
                            key={index}
                            disabled={feedback !== null}
                            onClick={() => handleOptionClick(index)}
                            className={`p-4 rounded text-left flex items-start text-sm md:text-base font-mono transition-all ${btnClass}`}
                        >
                            <span className="mr-3 font-bold opacity-50">[{index + 1}]</span>
                            <span>{option}</span>
                        </button>
                    );
                })}
            </div>

            {/* FEEDBACK OVERLAY (Optional but good for visual impact) */}
            {feedback && (
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                    <div className={`p-8 border-4 border-dashed bg-gray-900 shadow-2xl animate-bounce 
            ${feedback.isCorrect ? 'border-green-500 text-green-400' : 'border-red-500 text-red-500'}`}>
                        <span className="text-2xl font-bold uppercase leading-relaxed text-center block">
                            {feedback.isCorrect ? '¡CORRECTO!' : '¡ATAQUE RECIBIDO!'}
                        </span>
                        <span className="text-sm mt-4 block max-w-sm text-center font-mono text-gray-300">
                            {feedback.message}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
