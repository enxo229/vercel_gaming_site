import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export const StartScreen: React.FC = () => {
    const { username, setUsername, startGame, goToLeaderboard } = useGameStore();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedUser = username.trim();
        if (trimmedUser.length < 3) {
            setError('¡Mínimo 3 letras!');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Check if username already exists in Supabase
            const { data, error: sbError } = await supabase
                .from('leaderboard')
                .select('username')
                .eq('username', trimmedUser)
                .maybeSingle();

            if (sbError) throw sbError;

            if (data) {
                // User exists, block entry
                setError('⚠️ ALIAS EN USO. INGRESA OTRO.');
                setIsLoading(false);
                return;
            }

            // User is unique, proceed to game
            setIsLoading(false);
            startGame();
        } catch (err) {
            console.error('Error verifying user:', err);
            setError('Error de conexión. Reintenta.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full h-full bg-[url('/sprites/background.png')] bg-cover bg-bottom">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/10 z-0"></div>

            <div className="bg-[#f8f0e3] border-[6px] border-[#2d1b00] relative z-10 max-w-sm w-full text-center p-6 shadow-[8px_8px_0px_#2d1b00]">
                {/* Doble Borde dorado interno simulado */}
                <div className="absolute inset-0 border-4 border-[#d4af37] pointer-events-none"></div>

                <div className="flex justify-center mb-4 relative z-20">
                    <img src="/sprites/ant_player.png" alt="Ant" className="w-20 h-20 pixel-art animate-bounce" />
                </div>

                <h1 className="text-xl md:text-2xl font-bold mb-6 font-['Press_Start_2P'] text-[#2d1b00] leading-loose relative z-20">
                    THE DEBUGGER<br />ANT
                </h1>

                <form onSubmit={handleStart} className="flex flex-col gap-6 relative z-20">
                    <div className="text-left">
                        <label htmlFor="username" className="block text-[10px] md:text-xs mb-2 font-bold uppercase font-['Press_Start_2P'] text-[#2d1b00]">
                            &gt; NOMBRE DEL HÉROE:
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full bg-white border-4 border-[#2d1b00] p-3 outline-none focus:border-[#d4af37] font-['Press_Start_2P'] text-xs text-[#2d1b00] uppercase shadow-inner text-ellipsis overflow-hidden whitespace-nowrap"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toUpperCase())}
                            placeholder="Ej. SRE_MASTER_99"
                            autoComplete="off"
                            maxLength={35}
                        />
                        {error && <p className="text-red-600 font-bold text-[10px] mt-2 text-center uppercase font-['Press_Start_2P']">{error}</p>}
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-white border-4 border-[#2d1b00] py-3 px-6 flex justify-center items-center gap-2 text-xs md:text-sm font-['Press_Start_2P'] text-[#2d1b00] uppercase shadow-[4px_4px_0px_#2d1b00] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#2d1b00] transition-all active:bg-gray-200 disabled:opacity-75 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_#2d1b00]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-[#2d1b00]" />
                                    <span>VALIDANDO...</span>
                                </>
                            ) : (
                                "START"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={goToLeaderboard}
                            className="bg-[#2d1b00] border-4 border-[#2d1b00] py-3 px-6 text-xs md:text-sm font-['Press_Start_2P'] text-white uppercase shadow-[4px_4px_0px_#d4af37] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#d4af37] transition-all active:bg-black"
                        >
                            VER RANKING
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
