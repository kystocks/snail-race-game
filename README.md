# JScargot - Snail's Pace Race

A full-stack web application based on the classic children's board game "Snail's Pace Race." Players predict race outcomes and watch colorful snails race to the finish line.

## 🎮 Live Demo

**Production:** https://kystocks.github.io/snail-race-game/

## 📋 Current Version

**v1.2.3** - Security & Stability Improvements (January 6, 2026)

## ✨ Features

- **Accessible Game:** WCAG 2.1 AA compliant with screen reader support
- **Race Predictions:** Predict winner and last place before race starts
- **Animated Gameplay:** Smooth dice rolling and snail movement animations
- **Live Statistics:** Real-time race statistics with visual breakdowns
- **Persistent Data:** Race results saved to backend database
- **Error Handling:** Clear user feedback for all operations
- **Responsive Design:** Works on desktop, tablet, and mobile

## 🛠 Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Pure CSS (no frameworks)
- **Deployment:** GitHub Pages
- **Backend:** Django REST API (separate repository)
- **Database:** MySQL (production) / SQLite (development)

## 🚀 Local Development

### Prerequisites

- Node.js 18+ and npm
- Django backend running (see backend repository)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kystocks/snail-race-game.git
   cd snail-race-game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:5173
   ```

### Environment Variables

The project uses `.env.development` (local) and `.env.production` (GitHub Pages):

```bash
# .env.development
VITE_API_BASE_URL=http://127.0.0.1:8000

# .env.production
VITE_API_BASE_URL=https://kstocks.pythonanywhere.com
```

## 📦 Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

This automatically:
- Builds with production environment variables
- Deploys to `gh-pages` branch
- Updates live site at https://kystocks.github.io/snail-race-game/

## 🏗 Project Structure

```
src/
├── components/
│   ├── Controls.jsx          # Dice roll button
│   ├── Dice.jsx              # Dice display with animations
│   ├── GameBoard.jsx         # Main game container
│   ├── PredictionScreen.jsx  # Pre-race prediction interface
│   ├── RaceStats.jsx         # Statistics sidebar
│   ├── RaceTrack.jsx         # Race track with snails
│   ├── Snail.jsx             # Individual snail component
│   └── WinnerModal.jsx       # Post-race results modal
├── App.jsx                   # Root component with game logic
├── App.css                   # All styles
└── main.jsx                  # Entry point
```

## 🔧 Key Technologies

- **React Hooks:** useState, useEffect for state management
- **CSS Animations:** Native CSS for dice rolls and snail movement
- **Fetch API:** REST API communication
- **Vite:** Fast development server and build tool
- **GitHub Actions:** Automated deployment pipeline

## 📊 Game Logic

1. **Prediction Phase:** Players select predicted winner and loser
2. **Racing Phase:** Roll dice to move snails forward
   - Same color on both dice = move 2 spaces
   - Different colors = each moves 1 space
   - Finished snails are automatically rerolled
3. **Results Phase:** Display finish order and prediction accuracy

## 🎯 Accessibility Features

- Semantic HTML structure
- ARIA labels and live regions
- Keyboard navigation support
- Screen reader announcements
- High contrast color combinations (WCAG AA)
- Reduced motion support

## 🔗 Related Repositories

- **Backend API:** https://github.com/kystocks/snail-race-backend
- **Original Game:** Based on "Snail's Pace Race" by Ravensburger

## 📝 Documentation

- [VERSION_HISTORY.md](VERSION_HISTORY.md) - Detailed changelog
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment procedures
- [Backend DEPLOYMENT.md](https://github.com/kystocks/snail-race-backend/blob/main/DEPLOYMENT.md) - Backend deployment

## 🐛 Known Issues

See VERSION_HISTORY.md for current known issues and planned improvements.

## 📄 License

Personal project - not licensed for public use.

## 👤 Author

Kyle Stocksdale - University of Michigan student  
Portfolio project demonstrating full-stack web development skills

## 🙏 Acknowledgments

- Original board game by Ravensburger
- Built as a family project to play with my toddler
- Inspired by SI 664 (Django) and SI 579 (JavaScript/React) coursework
