function WinnerModal({ winner, loser, predictions, finishOrder, totalRolls, onReset }) {
  const winnerCorrect = predictions.winner === winner;
  const loserCorrect = predictions.loser === loser;
  const bothCorrect = winnerCorrect && loserCorrect;

  return (
    <div className="modal-overlay">
      <div className="winner-modal">
        <h2>🏁 Race Complete! 🏁</h2>

        {/* Race Results */}
        <div className="race-results">
          <div className="result-item winner-result">
            <span className="result-label">🏆 Winner:</span>
            <span
              className="result-value"
              style={{
                backgroundColor: winner,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'capitalize'
              }}
            >
              {winner}
            </span>
          </div>

          <div className="result-item loser-result">
            <span className="result-label">🐌 Last Place:</span>
            <span
              className="result-value"
              style={{
                backgroundColor: loser,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'capitalize'
              }}
            >
              {loser}
            </span>
          </div>

          <div className="result-item">
            <span className="result-label">🎲 Total Rolls:</span>
            <span className="result-value" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {totalRolls}
            </span>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="prediction-results">
          <h3>Your Predictions:</h3>

          <div className="prediction-check">
            <span className={winnerCorrect ? 'correct' : 'incorrect'}>
              {winnerCorrect ? '✅' : '❌'} Winner: <span style={{ textTransform: 'capitalize' }}>{predictions.winner}</span>
            </span>
          </div>

          <div className="prediction-check">
            <span className={loserCorrect ? 'correct' : 'incorrect'}>
              {loserCorrect ? '✅' : '❌'} Last Place: <span style={{ textTransform: 'capitalize' }}>{predictions.loser}</span>
            </span>
          </div>

          {bothCorrect && (
            <div className="perfect-prediction">
              🎉 PERFECT PREDICTION! 🎉
            </div>
          )}

          {!bothCorrect && (winnerCorrect || loserCorrect) && (
            <div className="partial-prediction">
              🙂 You got one right!
            </div>
          )}

          {!winnerCorrect && !loserCorrect && (
            <div className="no-prediction">
              😅 Better luck next time!
            </div>
          )}
        </div>

        {/* Finish Order */}
        <div className="finish-order">
          <h3>Final Standings:</h3>
          <ol>
            {finishOrder.slice(0, 6).map((color, index) => (
              <li key={color}>
                <span className="position-number">
                  {index + 1}.
                </span>
                <span
                  className="color-indicator"
                  style={{ backgroundColor: color }}
                ></span>
                <span className="snail-name">
                  {color.charAt(0).toUpperCase() + color.slice(1)} Snail
                </span>
                {index === 0 && <span className="medal">🥇</span>}
                {index === 1 && <span className="medal">🥈</span>}
                {index === 2 && <span className="medal">🥉</span>}
              </li>
            ))}
          </ol>
        </div>

        {/* Reset Button */}
        <button className="play-again-button" onClick={onReset}>
          🎮 Play Again!
        </button>
      </div>
    </div>
  );
}

export default WinnerModal;