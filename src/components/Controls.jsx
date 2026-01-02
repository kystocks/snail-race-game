function Controls({ onRoll, isRolling }) {
  return (
    <div className="controls">
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
  );
}

export default Controls;
