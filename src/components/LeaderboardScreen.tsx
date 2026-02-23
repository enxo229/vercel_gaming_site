import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';
import { Loader2, RefreshCw } from 'lucide-react';

interface LeaderboardEntry {
    username: string;
    score: number;
}

export const LeaderboardScreen: React.FC = () => {
    const { resetGame } = useGameStore();
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchScores = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('leaderboard')
                .select('username, score')
                .order('score', { ascending: false });

            if (error) throw error;
            setEntries(data || []);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScores();
    }, []);

    const getRankColor = (index: number) => {
        switch (index) {
            case 0: return 'text-[#ffd700]'; // Oro
            case 1: return 'text-[#c0c0c0]'; // Plata
            case 2: return 'text-[#cd7f32]'; // Bronce
            default: return 'text-[#2d1b00]';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full relative bg-[url('/sprites/hall_bg.png')] bg-cover bg-center font-['Press_Start_2P'] select-none p-4">
            {/* Overlay Oscuro si la imagen es muy brillante */}
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

            {/* Contenedor Principal (El Pergamino) */}
            <div className="bg-[#f8f0e3] border-[6px] border-[#2d1b00] max-w-2xl w-full p-6 md:p-8 shadow-[6px_6px_0px_rgba(45,27,0,1)] relative z-10 flex flex-col h-[75vh]">

                {/* Borde Interno Decorativo */}
                <div className="absolute inset-0 border-4 border-[#d4af37] pointer-events-none"></div>

                <h1 className="text-base md:text-xl text-[#d4af37] text-center drop-shadow-[2px_2px_0px_#2d1b00] mb-8 mt-2 uppercase">
                    SALÓN DE LA FAMA SRE
                </h1>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="w-8 h-8 md:w-12 md:h-12 text-[#2d1b00] animate-spin" />
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-[#2d1b00] text-xs md:text-sm text-center">EL SALÓN ESTÁ VACÍO.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {entries.map((entry, i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center border-b-[2px] border-dashed border-gray-400 py-4 ${getRankColor(i)}`}
                                >
                                    <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                                        <span className="text-[10px] md:text-xs">
                                            {i + 1}.
                                        </span>
                                        <span className="text-[10px] md:text-xs truncate max-w-[120px] md:max-w-[200px]">
                                            {entry.username}
                                        </span>
                                    </div>
                                    <div className="text-[10px] md:text-xs">
                                        {entry.score.toString().padStart(5, '0')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={resetGame}
                        className="bg-white border-4 border-[#2d1b00] py-3 px-4 md:py-4 md:px-6 text-[10px] md:text-xs text-[#2d1b00] uppercase shadow-[4px_4px_0px_#2d1b00] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#2d1b00] transition-all active:bg-gray-200"
                    >
                        VOLVER AL INICIO
                    </button>
                    <button
                        onClick={fetchScores}
                        className="bg-[#d4af37] border-4 border-[#2d1b00] py-3 px-4 md:py-4 md:px-6 text-[10px] md:text-xs text-[#2d1b00] uppercase shadow-[4px_4px_0px_#2d1b00] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#2d1b00] transition-all active:bg-[#c49b27] flex items-center justify-center"
                        title="Actualizar ranking"
                    >
                        <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

            </div>
        </div>
    );
};
