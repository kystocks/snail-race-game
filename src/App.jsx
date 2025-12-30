import { useState } from 'react';
import './App.css';
import PredictionScreen from './components/PredictionScreen';
import GameBoard from './components/GameBoard';
import WinnerModal from './components/WinnerModal';

// Game constants
const COLORS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
const TRACK_LENGTH = 9; // start(0) + 7 spaces + finish(8)

function App() {
  // Game phases: 'prediction' -> 'racing' -> 'finished'
  const [gamePhase, setGamePhase] = useState('prediction');

  // Snail positions (0 = start, 8 = finish)
  const [snailPositions, setSnailPositions] = useState(
    COLORS.reduce((acc, color) => ({ ...acc, [color]: 0 }), {})
  );

  // Dice state
  const [diceResults, setDiceResults] = useState([null, null]);
  const [isRolling, setIsRolling] = useState(false);

  // Predictions
  const [predictions, setPredictions] = useState({
    winner: null,
    loser: null
  });

  // Race results
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [finishOrder, setFinishOrder] = useState([]);
  const [totalRolls, setTotalRolls] = useState(0);

  // Handle predictions submission
  const handlePredictionsSubmit = (winnerPrediction, loserPrediction) => {
    setPredictions({
      winner: winnerPrediction,
      loser: loserPrediction
    });
    setGamePhase('racing');
  };

  // Roll dice
  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setTotalRolls(prev => prev + 1);

    // Random colors for dice
    const dice1 = COLORS[Math.floor(Math.random() * 6)];
    const dice2 = COLORS[Math.floor(Math.random() * 6)];

    setDiceResults([dice1, dice2]);

    // Animate dice, then move snails
    setTimeout(() => {
      moveSnails(dice1, dice2);
      setIsRolling(false);
    }, 500);
  };

  // Move snails based on dice
  const moveSnails = (dice1, dice2) => {
    setSnailPositions(prev => {
      const newPositions = { ...prev };

      if (dice1 === dice2) {
        // Same color = move 2 spaces
        newPositions[dice1] = Math.min(prev[dice1] + 2, TRACK_LENGTH - 1);
      } else {
        // Different colors = each moves 1
        newPositions[dice1] = Math.min(prev[dice1] + 1, TRACK_LENGTH - 1);
        newPositions[dice2] = Math.min(prev[dice2] + 1, TRACK_LENGTH - 1);
      }

      // Check for winner/loser
      checkRaceStatus(newPositions);

      return newPositions;
    });
  };

  // Check if race is finished
  const checkRaceStatus = (positions) => {
    const finished = COLORS.filter(color => positions[color] === TRACK_LENGTH - 1);

    if (finished.length === 1 && !winner) {
      // First snail crossed finish line
      setWinner(finished[0]);
      setFinishOrder([finished[0]]);
    } else if (finished.length > 1) {
      // Track finish order
      const newFinishers = finished.filter(color => !finishOrder.includes(color));
      if (newFinishers.length > 0) {
        setFinishOrder(prev => [...prev, ...newFinishers]);
      }
    }

    // Check if all snails finished (last one crosses)
    if (finished.length === 6) {
      const lastSnail = COLORS.find(color => !finishOrder.includes(color));
      if (lastSnail) {
        setLoser(lastSnail);
        setFinishOrder(prev => [...prev, lastSnail]);
        setGamePhase('finished');
      }
    }
  };

  // Reset game
  const resetGame = () => {
    setSnailPositions(COLORS.reduce((acc, color) => ({ ...acc, [color]: 0 }), {}));
    setDiceResults([null, null]);
    setIsRolling(false);
    setPredictions({ winner: null, loser: null });
    setWinner(null);
    setLoser(null);
    setFinishOrder([]);
    setTotalRolls(0);
    setGamePhase('prediction');
  };

  return (
    <div className="app">
      <h1>🐌 Snails' Pace Race</h1>

      {gamePhase === 'prediction' && (
        <PredictionScreen
          colors={COLORS}
          onSubmit={handlePredictionsSubmit}
        />
      )}

      {gamePhase === 'racing' && (
        <GameBoard
          colors={COLORS}
          snailPositions={snailPositions}
          trackLength={TRACK_LENGTH}
          diceResults={diceResults}
          isRolling={isRolling}
          onRoll={rollDice}
          predictions={predictions}
          totalRolls={totalRolls}
        />
      )}

      {gamePhase === 'finished' && (
        <WinnerModal
          winner={winner}
          loser={loser}
          predictions={predictions}
          finishOrder={finishOrder}
          totalRolls={totalRolls}
          onReset={resetGame}
        />
      )}
    </div>
  );
}

export default App;