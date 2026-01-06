import RaceTrack from './RaceTrack';
import Dice from './Dice';
import Controls from './Controls';

function GameBoard({ colors, snailPositions, trackLength, diceResults, isRolling, onRoll, predictions, totalRolls, diceAnimationKeys, finishOrder }) {
  // Function to determine text color for accessibility
  const getTextColor = (bgColor) => {
    // Colors that need dark text for contrast
    const lightColors = ['yellow', 'orange'];
    return lightColors.includes(bgColor) ? '#000' : '#fff';
  };

  // Function to get better background color for accessibility
  const getBgColor = (color) => {
    // Use darker shades for better contrast with white text
    const colorMap = {
      'red': '#c00',      // Darker red
      'blue': '#0056b3',  // Darker blue
      'purple': '#6a0dad', // Darker purple
      'green': '#006400',  // Darker green
      'orange': '#ff8c00', // Keep orange (using dark text)
      'yellow': '#ffd700'  // Keep yellow (using dark text)
    };
    return colorMap[color] || color;
  };

  return (
    <div className="game-board">
      {/* Predictions Display */}
      <div className="predictions-display">
        <div className="prediction-item">
          <span>🏆 Winner Prediction:</span>
          <span className="prediction-color" style={{
            backgroundColor: getBgColor(predictions.winner),
            color: getTextColor(predictions.winner),
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
            backgroundColor: getBgColor(predictions.loser),
            color: getTextColor(predictions.loser),
            padding: '4px 12px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            {predictions.loser}
          </span>
        </div>
        <div className="prediction-item">
          <span>🎲 Total Rolls:</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', minWidth: '30px', display: 'inline-block', textAlign: 'center' }}>{totalRolls}</span>
        </div>
      </div>

      {/* Dice */}
      <Dice results={diceResults} isRolling={isRolling} animationKeys={diceAnimationKeys} />

      {/* Race Track */}
      <RaceTrack
        colors={colors}
        snailPositions={snailPositions}
        trackLength={trackLength}
        finishOrder={finishOrder || []}
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
