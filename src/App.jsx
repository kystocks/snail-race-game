import { useState, useEffect } from 'react';
import './App.css';
import PredictionScreen from './components/PredictionScreen';
import GameBoard from './components/GameBoard';
import WinnerModal from './components/WinnerModal';
import RaceStats from './components/RaceStats';
import { SNAIL_COLORS, TRACK_LENGTH } from './constants';
import { retryWithBackoff } from './utils/retry';

// Use SNAIL_COLORS as COLORS for compatibility with existing code
const COLORS = SNAIL_COLORS;

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function App() {
  // Game phases: 'prediction' -> 'racing' -> 'finished'
  const [gamePhase, setGamePhase] = useState('prediction');
  
  // Stats refresh trigger - increment to force stats refresh
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);

  // Snail positions (0 = start, 8 = finish)
  const [snailPositions, setSnailPositions] = useState(
    COLORS.reduce((acc, color) => ({ ...acc, [color]: 0 }), {})
  );

  // Dice state
  const [diceResults, setDiceResults] = useState([null, null]);
  const [isRolling, setIsRolling] = useState(false);
  const [diceAnimationKeys, setDiceAnimationKeys] = useState([0, 0]); // Track animation triggers

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

  // Save status
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

    // Get snails that haven't finished yet
    const finishedSnails = COLORS.filter(color => snailPositions[color] === TRACK_LENGTH - 1);
    const activeSnails = COLORS.filter(color => !finishedSnails.includes(color));

    // If all snails are finished, don't roll (shouldn't happen, but safety check)
    if (activeSnails.length === 0) {
      setIsRolling(false);
      return;
    }

    // Initial roll (might include finished snails) - trigger animation for both dice
    const initialDice1 = COLORS[Math.floor(Math.random() * 6)];
    const initialDice2 = COLORS[Math.floor(Math.random() * 6)];

    setDiceResults([initialDice1, initialDice2]);
    setDiceAnimationKeys(prev => [prev[0] + 1, prev[1] + 1]); // Trigger both animations

    // Check which dice need rerolling
    const dice1NeedsReroll = finishedSnails.includes(initialDice1);
    const dice2NeedsReroll = finishedSnails.includes(initialDice2);
    const needsReroll = dice1NeedsReroll || dice2NeedsReroll;

    if (needsReroll) {
      // Show initial roll for 1200ms, then reroll only the dice that need it
      setTimeout(() => {
        // Keep valid dice, reroll invalid ones
        const dice1 = dice1NeedsReroll 
          ? activeSnails[Math.floor(Math.random() * activeSnails.length)] 
          : initialDice1;
        const dice2 = dice2NeedsReroll 
          ? activeSnails[Math.floor(Math.random() * activeSnails.length)] 
          : initialDice2;
        
        setDiceResults([dice1, dice2]);
        // Only increment animation keys for dice that changed
        setDiceAnimationKeys(prev => [
          dice1NeedsReroll ? prev[0] + 1 : prev[0],
          dice2NeedsReroll ? prev[1] + 1 : prev[1]
        ]);
        
        // Then move snails after showing the reroll
        setTimeout(() => {
          moveSnails(dice1, dice2);
          setIsRolling(false);
        }, 500);
      }, 1200);
    } else {
      // No reroll needed, proceed normally
      setTimeout(() => {
        moveSnails(initialDice1, initialDice2);
        setIsRolling(false);
      }, 500);
    }
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

    // Update finish order whenever snails cross the line
    setFinishOrder(prevOrder => {
      // Find snails that finished but aren't in the order yet
      const newFinishers = finished.filter(color => !prevOrder.includes(color));
      
      if (newFinishers.length > 0) {
        const updatedOrder = [...prevOrder, ...newFinishers];
        
        // Set winner if this is the first finisher
        if (updatedOrder.length === 1) {
          setWinner(updatedOrder[0]);
        }
        
        // End game if all 6 snails have finished
        if (updatedOrder.length === 6) {
          setLoser(updatedOrder[5]); // Last snail in order
          setTimeout(() => setGamePhase('finished'), 200);
        }
        
        return updatedOrder;
      }
      return prevOrder;
    });
  };

  // Save race result to Django API with retry logic
  const saveRaceResult = async (winnerColor, secondPlace, lastPlace, totalRollCount) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Wrap the fetch in a retry function
      await retryWithBackoff(async () => {
        const response = await fetch(`${API_BASE_URL}/api/races/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            winner_color: winnerColor,
            second_place: secondPlace,
            last_place: lastPlace,
            total_rolls: totalRollCount,
          })
        });
        
        if (!response.ok) {
          throw new Error(`Failed to save race: HTTP ${response.status}`);
        }

        return await response.json();
      }, 3, 1000); // Max 3 retries, starting with 1 second delay

      console.log('Race result saved successfully!');
      
      // Trigger stats refresh
      setStatsRefreshTrigger(prev => prev + 1);
      setSaveSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error saving race result after retries:', error);
      setSaveError(error.message || 'Failed to save race results. Please check your connection.');
      
      // Keep error visible longer (5 seconds)
      setTimeout(() => {
        setSaveError(null);
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Save race when it finishes
  useEffect(() => {
    if (gamePhase === 'finished' && winner && loser && finishOrder.length === 6 && totalRolls > 0) {
      saveRaceResult(winner, finishOrder[1], loser, totalRolls);
    }
  }, [gamePhase, winner, loser, finishOrder, totalRolls]);

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
    
    // Clear save status
    setSaveError(null);
    setSaveSuccess(false);
    setIsSaving(false);
  };

  return (
    <main className="app">
      <h1>🐌 Snails' Pace Race</h1>
      
      {/* Save Status Banner */}
      {(isSaving || saveError || saveSuccess) && (
        <div 
          className={`save-status ${isSaving ? 'saving' : ''} ${saveError ? 'error' : ''} ${saveSuccess ? 'success' : ''}`}
          role="status"
          aria-live="polite"
        >
          {isSaving && '💾 Saving race results...'}
          {saveError && `❌ ${saveError}`}
          {saveSuccess && '✅ Race results saved!'}
        </div>
      )}
      
      <div className="app-layout">
        {/* Stats Sidebar */}
        <aside className="stats-sidebar">
          <RaceStats 
            apiBaseUrl={API_BASE_URL} 
            refreshTrigger={statsRefreshTrigger}
          />
        </aside>

        {/* Main Game Area */}
        <div className="game-container">
          {/* Screen reader announcements */}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {gamePhase === 'prediction' && 'Make your predictions for the race'}
            {gamePhase === 'racing' && `Race in progress. ${totalRolls} rolls so far.`}
            {gamePhase === 'finished' && `Race complete! ${winner} won and ${loser} came in last.`}
          </div>

          {gamePhase === 'prediction' && (
            <section aria-label="Make predictions">
              <PredictionScreen
                colors={COLORS}
                onSubmit={handlePredictionsSubmit}
              />
            </section>
          )}

          {gamePhase === 'racing' && (
            <section aria-label="Race in progress">
              <GameBoard
                colors={COLORS}
                snailPositions={snailPositions}
                trackLength={TRACK_LENGTH}
                diceResults={diceResults}
                isRolling={isRolling}
                onRoll={rollDice}
                predictions={predictions}
                totalRolls={totalRolls}
                diceAnimationKeys={diceAnimationKeys}
                finishOrder={finishOrder}
              />
            </section>
          )}
        </div>
      </div>

      {/* Winner Modal (overlays everything) */}
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
    </main>
  );
}

export default App;
