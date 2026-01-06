function Dice({ results, isRolling, animationKeys = [0, 0], onRoll }) {
  return (
    <div className="dice-container">
      <div className="dice-and-button">
        <div className="dice-section">
          <h2>Roll the Dice!</h2>
          <div className="dice-pair" role="img" aria-label={results[0] && results[1] ? `Dice showing ${results[0]} and ${results[1]}` : "Dice ready to roll"}>
            <div
              key={`die-1-${animationKeys[0]}`}
              className={`die rolling rolling-no-motion`}
              style={{ 
                backgroundColor: results[0] || '#999',
                color: results[0] ? 'inherit' : '#fff'
              }}
              aria-label={results[0] ? `First die: ${results[0]}` : "First die: not rolled"}
            >
              {results[0] ? '🎲' : '?'}
            </div>
            <div
              key={`die-2-${animationKeys[1]}`}
              className={`die rolling rolling-no-motion`}
              style={{ 
                backgroundColor: results[1] || '#999',
                color: results[1] ? 'inherit' : '#fff'
              }}
              aria-label={results[1] ? `Second die: ${results[1]}` : "Second die: not rolled"}
            >
              {results[1] ? '🎲' : '?'}
            </div>
          </div>
        </div>
        
        <button
          className="roll-button"
          onClick={onRoll}
          disabled={isRolling}
          aria-label={isRolling ? "Rolling dice, please wait" : "Roll dice to move snails"}
          aria-live="polite"
        >
          {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
        </button>
      </div>
      
      {results[0] && results[1] && (
        <p className="dice-result" role="status" aria-live="polite">
          {results[0] === results[1]
            ? `🎉 Double ${results[0]}! Move 2 spaces!`
            : `${results[0]} and ${results[1]} move 1 space each`}
        </p>
      )}
    </div>
  );
}

export default Dice;
