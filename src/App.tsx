import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

function App() {
  const { screen } = useGameStore();

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black font-sans">
      {screen === 'START_SCREEN' && <StartScreen />}
      {screen === 'PLAYING' && <PlayingScreen />}
      {screen === 'GAME_OVER' && <GameOverScreen />}
      {screen === 'VICTORY' && <VictoryScreen />}
      {screen === 'LEADERBOARD' && <LeaderboardScreen />}
    </div>
  );
}

export default App;
