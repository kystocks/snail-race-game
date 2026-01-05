# JScargot Version History

A full-stack web application based on the classic children's board game "Snail's Pace Race."

## Version 1.2.0 - Production Deployment
**Date:** January 5, 2026  
**Goal:** Deploy Django backend to production and integrate with GitHub Pages frontend

### Features Added
- Production deployment to PythonAnywhere (`https://kstocks.pythonanywhere.com`)
- MySQL database replacing SQLite for production
- Environment-based API URL configuration in React frontend
- API root endpoint showing available endpoints and project information
- Separate production settings file (`settings_production.py`)

### Technical Changes
- **Backend:**
  - Deployed to PythonAnywhere at `kstocks.pythonanywhere.com`
  - MySQL database configuration (production only)
  - WSGI configuration for production server
  - Production settings separate from development
  - CORS configured for GitHub Pages domain
  
- **Frontend:**
  - Environment variables for API URLs (`.env.development` and `.env.production`)
  - Automatic switching between local and production APIs
  - Successfully deployed to GitHub Pages with production API integration

### Deployment Architecture
- **Local Development:**
  - React dev server: `http://localhost:5173`
  - Django dev server: `http://127.0.0.1:8000`
  - SQLite database
  
- **Production:**
  - Frontend: `https://kystocks.github.io/snail-race-game/`
  - Backend API: `https://kstocks.pythonanywhere.com/api/`
  - MySQL database on PythonAnywhere

### API Endpoints (Production)
- Root: `https://kstocks.pythonanywhere.com/` (API information)
- List races: `https://kstocks.pythonanywhere.com/api/races/`
- Create race: `https://kstocks.pythonanywhere.com/api/races/create/`
- Statistics: `https://kstocks.pythonanywhere.com/api/stats/`

### Next Steps (v1.3.0)
- Add player tag input (3-character When2meet style)
- Track predictions with player attribution
- Calculate prediction accuracy per player
- Simple leaderboard display

---

## Version 1.1.0 - Backend API Integration
**Date:** January 5, 2026  
**Goal:** Establish backend API and integrate with React frontend

### Features Added
- Django REST API backend with three endpoints:
  - `GET /api/races/` - List all race records
  - `POST /api/races/create/` - Save new race results
  - `GET /api/stats/` - Get aggregate win statistics by color
- Race model tracking:
  - Winner color
  - Second place finisher
  - Last place finisher
  - Total dice rolls
  - Race timestamp
- CORS configuration for local development
- Automatic race result saving when game completes
- Django admin panel for viewing race data

### Technical Stack
- **Frontend:** React + Vite
- **Backend:** Django 6.0 + Django REST Framework
- **Database:** SQLite (local development)
- **Version Control:** Separate GitHub repositories

### Repositories
- Frontend: https://github.com/kystocks/snail-race-game
- Backend: https://github.com/kystocks/snail-race-backend

### Development Environment
- Two local servers running simultaneously
- React dev server (Vite) on port 5173
- Django dev server on port 8000

---

## Version 1.0.1 - Additional Usability Improvements
**Date:** January 2, 2026

### Changes
- Bug fixes and visual improvements
- Enhanced accessibility features
- Deployed update to GitHub Pages

---

## Version 1.0.0 - Initial Release
**Date:** January 2, 2026

### Features
- Working Snails' Pace Race game built with React
- Prediction screen for winner/loser predictions
- Dice rolling mechanics with animations
- Six-snail race track with visual indicators
- Winner modal displaying race results
- Full WCAG 2.1 AA accessibility compliance
- Deployed to GitHub Pages

### Technical Details
- Built with React + Vite
- Semantic HTML structure
- CSS animations for dice rolls
- Screen reader announcements
- Keyboard navigation support

---

## Roadmap

### v1.3.0 - Player Tags & Prediction Tracking (Next)
- Add 3-character player tag input (When2meet style)
- Track predicted_winner and predicted_loser
- Calculate prediction accuracy per player
- Simple leaderboard display

### v2.0.0 - Enhanced Features
- Display global stats on game page
- Race history viewer
- Per-player statistics dashboard
- Improved data visualization

### v3.0.0 - Multiplayer (Future)
- WebSocket integration for real-time gameplay
- Multiple players in the same race
- Lobby system
- Live race updates
