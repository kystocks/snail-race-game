import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SNAIL_COLORS } from '../constants';

const RaceStats = ({ apiBaseUrl, refreshTrigger }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default on mobile

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/api/stats/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiBaseUrl, refreshTrigger]); // Re-fetch when refreshTrigger changes

  if (loading) {
    return (
      <div className="race-stats">
        <h2>📊 Race Statistics</h2>
        <p>Loading stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="race-stats">
        <h2>📊 Race Statistics</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // Calculate most winning color
  const colorWins = SNAIL_COLORS.reduce((acc, color) => {
    acc[color] = stats[color] || 0;
    return acc;
  }, {});

  const maxWins = Math.max(...Object.values(colorWins));
  const topColors = Object.entries(colorWins)
    .filter(([_, wins]) => wins === maxWins && maxWins > 0)
    .map(([color, _]) => color);

  const totalRaces = stats.total_races || 0;

  return (
    <div className="race-stats">
      <div className="stats-header">
        <h2>📊 Race Statistics</h2>
        <button
          className="stats-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="stats-content"
          aria-label={isExpanded ? "Collapse statistics" : "Expand statistics"}
        >
          {isExpanded ? '▲ Hide' : '▼ Show'}
        </button>
      </div>
      
      <div 
        id="stats-content"
        className={`stats-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        aria-hidden={!isExpanded}
      >
        <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-label">Total Races</div>
          <div className="stat-value">{totalRaces}</div>
        </div>

        {totalRaces > 0 && (
          <div className="stat-card">
            <div className="stat-label">Most Wins</div>
            <div className="stat-value">
              {topColors.length === 1 ? (
                <span className={`color-badge ${topColors[0]}`}>
                  {topColors[0].charAt(0).toUpperCase() + topColors[0].slice(1)}
                </span>
              ) : topColors.length > 1 ? (
                <span className="tied-colors">
                  {topColors.map(color => 
                    color.charAt(0).toUpperCase() + color.slice(1)
                  ).join(' & ')}
                </span>
              ) : (
                'None yet'
              )}
              <span className="win-count"> ({maxWins})</span>
            </div>
          </div>
        )}
      </div>

      {totalRaces > 0 && (
        <div className="color-breakdown">
          <h3>Wins by Color</h3>
          <div className="color-stats">
            {Object.entries(colorWins)
              .sort((a, b) => b[1] - a[1]) // Sort by wins descending
              .map(([color, wins]) => {
                const percentage = totalRaces > 0 
                  ? ((wins / totalRaces) * 100).toFixed(1) 
                  : 0;
                
                return (
                  <div key={color} className="color-stat-row">
                    <span className={`color-badge ${color}`}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </span>
                    <div className="stat-bar-container">
                      <div 
                        className={`stat-bar ${color}`}
                        style={{ width: `${percentage}%` }}
                        aria-label={`${color} win percentage`}
                      />
                    </div>
                    <span className="stat-numbers">
                      {wins} ({percentage}%)
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

RaceStats.propTypes = {
  apiBaseUrl: PropTypes.string.isRequired,
  refreshTrigger: PropTypes.number, // Increment this to trigger a refresh
};

export default RaceStats;
