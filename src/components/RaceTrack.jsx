import Snail from './Snail';

function RaceTrack({ colors, snailPositions, trackLength, finishOrder = [] }) {
  return (
    <div className="race-track" role="region" aria-label="Race track with 6 snail lanes">
      <div className="track-columns-container">
        {colors.map(color => (
          <div key={color} className="track-row">
            {/* Snail label */}
            <div
              className={`snail-label ${color}`}
              style={{ backgroundColor: color }}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </div>

            {/* Track spaces */}
            {[...Array(trackLength)].map((_, spaceIndex) => {
              const isSnailHere = snailPositions[color] === spaceIndex;
              const isFinishLine = spaceIndex === trackLength - 1;
              // Only show position if snail is on finish line AND is in the finishOrder array
              const positionIndex = finishOrder.indexOf(color);
              const finishPosition = isFinishLine && isSnailHere && positionIndex >= 0 ? positionIndex + 1 : null;
              
              return (
                <div
                  key={spaceIndex}
                  className={`track-space ${
                    spaceIndex === 0 ? 'start' : 
                    spaceIndex === trackLength - 1 ? 'finish' : 
                    ''
                  }`}
                  style={isSnailHere ? {
                    backgroundColor: color,
                    opacity: 0.7,
                    border: `3px solid ${color}`,
                    boxShadow: `0 0 10px ${color}`
                  } : {}}
                >
                  {/* Show snail if it's in this position */}
                  {isSnailHere && (
                    <Snail color={color} />
                  )}
                  {/* Show finish position if snail is on finish line and has a valid position */}
                  {finishPosition && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: '#4a5ab3',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                      padding: '2px 4px',
                      borderRadius: '3px',
                      lineHeight: 1
                    }}>
                      #{finishPosition}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RaceTrack;