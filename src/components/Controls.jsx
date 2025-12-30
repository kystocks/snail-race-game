function Controls({ onRoll, isRolling }) {
  return (
    <div className="controls">
      <button
        className="roll-button"
        onClick={onRoll}
        disabled={isRolling}
      >
        {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
      </button>
    </div>
  );
}

export default Controls;