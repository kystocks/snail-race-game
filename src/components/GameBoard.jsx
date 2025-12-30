import RaceTrack from './RaceTrack';
import Dice from './Dice';
import Controls from './Controls';

function GameBoard({ colors, snailPositions, trackLength, diceResults, isRolling, onRoll, predictions, totalRolls, diceAnimationKeys }) {
  return (
    <div className="game-board">
      {/* Predictions Display */}
      <div className="predictions-display">
        <div className="prediction-item">
          <span>🏆 Winner Prediction:</span>
          <span className="prediction-color" style={{
            backgroundColor: predictions.winner,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            {predictions.winner}
          </span>
        </div>
        <div className="prediction-item">
          <span>🐌 Last Place Prediction:</span>
          <span className="prediction-color" style={{
            backgroundColor: predictions.loser,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            {predictions.loser}
          </span>
        </div>
        <div className="prediction-item">
          <span>🎲 Total Rolls:</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{totalRolls}</span>
        </div>
      </div>

      {/* Dice */}
      <Dice results={diceResults} isRolling={isRolling} animationKeys={diceAnimationKeys} />

      {/* Race Track */}
      <RaceTrack
        colors={colors}
        snailPositions={snailPositions}
        trackLength={trackLength}
      />

      {/* Controls */}
      <Controls
        onRoll={onRoll}
        isRolling={isRolling}
      />
    </div>
  );
}

export default GameBoard;