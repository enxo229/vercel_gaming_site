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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full h-full pk-screen">
            <div className="pk-dialogue-box max-w-sm w-full text-center p-6 shadow-2xl">
                <div className="flex justify-center mb-6">
                    <BugIcon className="w-16 h-16 animate-bounce text-[#404040]" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold mb-4 leading-relaxed text-[#d05068]">THE DEBUGGER ANT</h1>

                <div className="border-t-2 border-b-2 border-gray-300 py-4 mb-6 text-[10px] md:text-xs leading-relaxed uppercase">
                    Una aventura SRE <br />
                    al estilo 16-bits.
                </div>

                <form onSubmit={handleStart} className="flex flex-col gap-6">
                    <div className="text-left">
                        <label htmlFor="username" className="block text-[10px] md:text-xs mb-2 font-bold uppercase">
                            &gt; Nombre del Héroe:
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full bg-[#f8f8d8] border-2 border-[#506860] p-3 outline-none focus:border-[#d05068] font-inherit uppercase shadow-inner"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toUpperCase())}
                            placeholder="Ej. RED"
                            autoComplete="off"
                            maxLength={10}
                        />
                        {error && <p className="text-[#f86048] font-bold text-[10px] mt-2 text-center uppercase">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="pk-button py-3 px-6 text-xs md:text-sm font-bold uppercase mt-2 rounded bg-white shadow"
                    >
                        START
                    </button>
                </form>
            </div>
        </div>
    );
};
