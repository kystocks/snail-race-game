import Snail from './Snail';

function RaceTrack({ colors, snailPositions, trackLength }) {
  return (
    <div className="race-track">
      {colors.map(color => (
        <div key={color} className="track-row">
          {/* Snail label */}
          <div
            className="snail-label"
            style={{ backgroundColor: color }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </div>

          {/* Track spaces */}
          {[...Array(trackLength)].map((_, spaceIndex) => (
            <div
              key={spaceIndex}
              className={`track-space ${
                spaceIndex === 0 ? 'start' : 
                spaceIndex === trackLength - 1 ? 'finish' : 
                ''
              }`}
            >
              {/* Show snail if it's in this position */}
              {snailPositions[color] === spaceIndex && (
                <Snail color={color} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RaceTrack;