import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

function App() {
  const { screen } = useGameStore();

  return (
    <div className="min-h-screen text-pk-text font-sans w-full max-w-lg mx-auto md:max-w-4xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
      {screen === 'START_SCREEN' && <StartScreen />}
      {screen === 'PLAYING' && <PlayingScreen />}
      {screen === 'GAME_OVER' && <GameOverScreen />}
      {screen === 'VICTORY' && <VictoryScreen />}
      {screen === 'LEADERBOARD' && <LeaderboardScreen />}
    </div>
  );
}

export default App;
