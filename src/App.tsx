import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

function App() {
  const { screen } = useGameStore();

  return (
    <div className="gb-screen min-h-screen text-gb-darkest font-sans w-full max-w-lg mx-auto md:max-w-4xl shadow-2xl relative overflow-hidden">
      {screen === 'START_SCREEN' && <StartScreen />}
      {screen === 'PLAYING' && <PlayingScreen />}
      {screen === 'GAME_OVER' && <GameOverScreen />}
      {screen === 'VICTORY' && <VictoryScreen />}
      {screen === 'LEADERBOARD' && <LeaderboardScreen />}
    </div>
  );
}

export default App;
