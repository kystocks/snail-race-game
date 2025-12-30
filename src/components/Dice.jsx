function Dice({ results, isRolling, animationKeys = [0, 0] }) {
  return (
    <div className="dice-container">
      <h2>Roll the Dice!</h2>
      <div className="dice-pair">
        <div
          key={`die-1-${animationKeys[0]}`}
          className={`die rolling`}
          style={{ backgroundColor: results[0] || '#ccc' }}
        >
          {results[0] ? '🎲' : '?'}
        </div>
        <div
          key={`die-2-${animationKeys[1]}`}
          className={`die rolling`}
          style={{ backgroundColor: results[1] || '#ccc' }}
        >
          {results[1] ? '🎲' : '?'}
        </div>
      </div>
      {results[0] && results[1] && (
        <p className="dice-result">
          {results[0] === results[1]
            ? `🎉 Double ${results[0]}! Move 2 spaces!`
            : `${results[0]} and ${results[1]} move 1 space each`}
        </p>
      )}
    </div>
  );
}

export default Dice;
