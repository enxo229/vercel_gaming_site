import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';
import { ListOrdered, Loader2, Home } from 'lucide-react';

interface LeaderboardEntry {
    username: string;
    score: number;
}

export const LeaderboardScreen: React.FC = () => {
    const { resetGame, username } = useGameStore();
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const { data, error: sbError } = await supabase
                    .from('leaderboard')
                    .select('username, score')
                    .order('score', { ascending: false })
                    .limit(10);

                if (sbError) {
                    throw sbError;
                }

                setEntries(data || []);
            } catch (err: any) {
                console.error('Error fetching leaderboard:', err);
                setError('No se pudo cargar el Leaderboard. ¿Conectaste Supabase?');
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-2xl mx-auto w-full">
            <div className="bg-gray-800 p-8 border-4 border-blue-500 rounded-lg shadow-lg w-full">
                <div className="flex justify-center mb-6">
                    <ListOrdered className="w-16 h-16 text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">TOP DEPURADORES</h1>

                {loading ? (
                    <div className="flex justify-center my-12">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="bg-red-900/50 p-4 border border-red-500 text-red-200 text-center font-mono my-8">
                        {error}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 mb-8 font-mono">
                        {entries.length === 0 ? (
                            <p className="text-center text-gray-400">Puntajes no encontrados.</p>
                        ) : (
                            entries.map((entry, idx) => (
                                <div
                                    key={idx}
                                    className={`flex justify-between items-center p-3 rounded border-b border-gray-700 
                  ${entry.username === username ? 'bg-blue-900/40 border-l-4 border-l-blue-400' : 'bg-gray-900'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`font-bold w-6 text-right ${idx < 3 ? 'text-yellow-400' : 'text-gray-500'}`}>
                                            {idx + 1}.
                                        </span>
                                        <span className={entry.username === username ? 'text-white' : 'text-gray-300'}>
                                            {entry.username}
                                            {entry.username === username && ' (Tú)'}
                                        </span>
                                    </div>
                                    <span className="text-green-400 font-bold">{entry.score} pts</span>
                                </div>
                            ))
                        )}
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        onClick={resetGame}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        MENÚ PRINCIPAL
                    </button>
                </div>
            </div>
        </div>
    );
};
