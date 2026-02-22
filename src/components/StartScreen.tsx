import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { BugIcon } from 'lucide-react';

export const StartScreen: React.FC = () => {
    const { username, setUsername, startGame } = useGameStore();
    const [error, setError] = useState('');

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim().length < 3) {
            setError('Mínimo 3 letras!');
            return;
        }
        setError('');
        startGame();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full">
            <div className="gb-dialogue max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <BugIcon className="w-16 h-16 animate-bounce" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">THE DEBUGGER ANT</h1>

                <div className="border-t-4 border-b-4 border-gb-darkest py-4 mb-8 text-xs leading-relaxed">
                    Embárcate en un viaje<br />
                    microscópico. Combate<br />
                    los bugs SRE.
                </div>

                <form onSubmit={handleStart} className="flex flex-col gap-6">
                    <div className="text-left">
                        <label htmlFor="username" className="block text-xs mb-3 text-gb-dark">
                            &gt; INGRESA TU ALIAS:
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full bg-gb-lightest gb-border p-4 outline-none focus:bg-gb-light font-inherit uppercase"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toUpperCase())}
                            placeholder="Ej. SRE_DEV"
                            autoComplete="off"
                            maxLength={10}
                        />
                        {error && <p className="text-gb-darkest font-bold text-xs mt-3 bg-gb-light p-2 gb-border">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="gb-button py-4 px-6 text-sm font-bold uppercase mt-4"
                    >
                        START
                    </button>
                </form>
            </div>
        </div>
    );
};
