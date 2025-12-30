import { useState } from 'react';

function PredictionScreen({ colors, onSubmit }) {
  const [winnerPrediction, setWinnerPrediction] = useState('');
  const [loserPrediction, setLoserPrediction] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!winnerPrediction || !loserPrediction) {
      setError('Please select both a winner and loser prediction!');
      return;
    }

    if (winnerPrediction === loserPrediction) {
      setError('Winner and loser cannot be the same snail!');
      return;
    }

    // Clear error and submit
    setError('');
    onSubmit(winnerPrediction, loserPrediction);
  };

  return (
    <div className="prediction-screen">
      <h2>Make Your Predictions!</h2>
      <p>Before the race begins, guess which snail will win and which will come in last.</p>

      <form onSubmit={handleSubmit}>
        <div className="prediction-group">
          <label htmlFor="winner-select">
            🏆 Who will WIN the race?
          </label>
          <select
            id="winner-select"
            value={winnerPrediction}
            onChange={(e) => setWinnerPrediction(e.target.value)}
          >
            <option value="">-- Select a snail --</option>
            {colors.map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)} Snail
              </option>
            ))}
          </select>
        </div>

        <div className="prediction-group">
          <label htmlFor="loser-select">
            🐌 Who will come in LAST?
          </label>
          <select
            id="loser-select"
            value={loserPrediction}
            onChange={(e) => setLoserPrediction(e.target.value)}
          >
            <option value="">-- Select a snail --</option>
            {colors.map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)} Snail
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="start-race-button">
          Start the Race! 🚀
        </button>
      </form>
    </div>
  );
}

export default PredictionScreen;