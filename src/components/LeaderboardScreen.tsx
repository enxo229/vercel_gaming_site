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
                setError('NETWORK ERROR');
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2 md:p-4 max-w-2xl mx-auto w-full">
            <div className="gb-dialogue w-full p-4 md:p-8">
                <div className="flex justify-center mb-4">
                    <ListOrdered className="w-12 h-12 md:w-16 md:h-16 text-gb-darkest" />
                </div>
                <h1 className="text-xl md:text-3xl font-bold mb-8 text-center uppercase tracking-widest border-b-4 border-gb-darkest pb-4">TOP SREs</h1>

                {loading ? (
                    <div className="flex justify-center my-12">
                        <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin text-gb-darkest" />
                    </div>
                ) : error ? (
                    <div className="bg-gb-dark text-gb-lightest p-4 gb-border text-center my-8 text-xs">
                        {error}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 mb-8 text-[10px] md:text-xs">
                        {entries.length === 0 ? (
                            <p className="text-center">Aún no hay registros.</p>
                        ) : (
                            entries.map((entry, idx) => (
                                <div
                                    key={idx}
                                    className={`flex justify-between items-center p-3 border-b-2 border-gb-darkest 
                  ${entry.username === username ? 'bg-gb-darkest text-gb-lightest' : 'bg-transparent text-gb-darkest'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold w-4 md:w-6 text-right">
                                            {idx + 1}.
                                        </span>
                                        <span className="truncate max-w-[100px] md:max-w-none">
                                            {entry.username.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="font-bold">{entry.score.toString().padStart(5, '0')}</span>
                                </div>
                            ))
                        )}
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <button
                        onClick={resetGame}
                        className="gb-button flex items-center justify-center gap-2 py-4 px-6 w-full text-xs font-bold"
                    >
                        <Home className="w-4 h-4" />
                        INICIO
                    </button>
                </div>
            </div>
        </div>
    );
};
