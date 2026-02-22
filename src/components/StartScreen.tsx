import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { BugIcon } from 'lucide-react';

export const StartScreen: React.FC = () => {
    const { username, setUsername, startGame } = useGameStore();
    const [error, setError] = useState('');

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim().length < 3) {
            setError('El nombre debe tener al menos 3 caracteres.');
            return;
        }
        setError('');
        startGame();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-gray-800 p-8 rounded-lg border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <BugIcon className="w-16 h-16 text-green-400 animate-bounce" />
                </div>
                <h1 className="text-3xl font-bold text-green-400 mb-2 leading-tight">THE DEBUGGER ANT</h1>
                <p className="text-xs text-green-200 mb-8 leading-relaxed">
                    Embárcate en un viaje microscópico.<br />
                    Combate los bugs de observabilidad<br />
                    con tu conocimiento SRE.
                </p>

                <form onSubmit={handleStart} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="block text-xs mb-2 text-left text-green-300">
                            INGRESA TU NOMBRE:
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full bg-gray-900 border-2 border-green-500 text-green-400 p-3 outline-none focus:border-white focus:ring-2 focus:ring-green-400 font-inherit"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ej. SrDev"
                            autoComplete="off"
                        />
                        {error && <p className="text-red-400 text-xs mt-2 text-left">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-400 text-gray-900 border-b-4 border-green-700 hover:border-green-600 active:border-b-0 active:translate-y-1 py-3 px-6 font-bold uppercase transition-all"
                    >
                        COMENZAR DEPURACIÓN
                    </button>
                </form>
            </div>
        </div>
    );
};
