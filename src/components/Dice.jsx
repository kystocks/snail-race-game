function Dice({ results, isRolling }) {
  return (
    <div className="dice-container">
      <h2>Roll the Dice!</h2>
      <div className="dice-pair">
        <div
          className={`die ${isRolling ? 'rolling' : ''}`}
          style={{ backgroundColor: results[0] || '#ccc' }}
        >
          {results[0] ? '🎲' : '?'}
        </div>
        <div
          className={`die ${isRolling ? 'rolling' : ''}`}
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