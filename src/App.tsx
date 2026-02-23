import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { supabase } from './lib/supabase';
import { AudioProvider } from './contexts/AudioContext';
import { MuteButton } from './components/MuteButton';

function App() {
  const { screen } = useGameStore();
  const [showSyncToast, setShowSyncToast] = useState(false);

  useEffect(() => {
    const syncScore = async () => {
      const pendingScore = localStorage.getItem('offline_pending_score');
      if (pendingScore) {
        try {
          const { username, score } = JSON.parse(pendingScore);
          const { error } = await supabase.from('leaderboard').insert([{ username, score }]);

          if (!error) {
            localStorage.removeItem('offline_pending_score');
            setShowSyncToast(true);
            setTimeout(() => setShowSyncToast(false), 4000);
          }
        } catch (e) {
          console.error("Error sincronizando puntaje offline", e);
        }
      }
    };

    // Intentar sincronizar al cargar la app
    syncScore();

    // Escuchar el evento de conexión recuperada
    window.addEventListener('online', syncScore);
    return () => window.removeEventListener('online', syncScore);
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen text-pk-text font-sans w-full max-w-lg mx-auto md:max-w-4xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
        <MuteButton />
        {screen === 'START_SCREEN' && <StartScreen />}
        {screen === 'PLAYING' && <PlayingScreen />}
        {screen === 'GAME_OVER' && <GameOverScreen />}
        {screen === 'VICTORY' && <VictoryScreen />}
        {screen === 'LEADERBOARD' && <LeaderboardScreen />}

        {/* TOAST de Sincronización Exitosa */}
        {showSyncToast && (
          <div className="fixed top-4 bg-green-500 border-4 border-white text-white font-['Press_Start_2P'] uppercase text-[8px] md:text-[10px] p-3 shadow-[4px_4px_0px_#000] z-50 animate-bounce">
            ✓ Puntaje sincronizado con éxito.
          </div>
        )}
      </div>
    </AudioProvider>
  );
}

export default App;
