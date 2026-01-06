# JScargot Version History

A full-stack web application based on the classic children's board game "Snail's Pace Race."

## Version 1.2.3 - Security & Stability Improvements
**Date:** January 6, 2026  
**Goal:** Add comprehensive error handling, backend validation, and security improvements

### Frontend Improvements
- **Error Handling & User Feedback:**
  - Added try/catch error handling to `saveRaceResult()` function
  - Added loading state (`isSaving`) during save operations
  - Added error state (`saveError`) for failed saves
  - Added success state (`saveSuccess`) for successful saves
  - Created save status banner with visual feedback:
    - Blue "💾 Saving..." during save operation
    - Green "✅ Race results saved!" on success (auto-dismisses after 3s)
    - Red "❌ Error message" on failure (auto-dismisses after 5s)
  - Banner positioned above winner modal with proper z-index layering
  - Accessible with `role="status"` and `aria-live="polite"`
  - Auto-clear functionality prevents stale status messages

### Backend Improvements
- **Data Validation:**
  - Added field-level validation for all color fields (`winner_color`, `second_place`, `last_place`)
  - Added validation for `total_rolls` (must be >= 1)
  - Added cross-field validation to prevent duplicate colors
  - Clear error messages returned for validation failures
  - Prevents invalid data from reaching the database

- **Security (CORS):**
  - Removed permissive `CORS_ALLOW_ALL_ORIGINS = True` setting
  - Restricted CORS to specific allowed origins:
    - `https://kystocks.github.io` (production frontend)
    - `http://localhost:5173` (local development)
    - `http://127.0.0.1:5173` (local development alternative)
  - Follows security best practices for API protection

### Technical Changes
- **Files Modified (Frontend):**
  - `src/App.jsx` - Added error handling states and save status banner
  - `src/App.css` - Added save status banner styles with animations
  
- **Files Modified (Backend):**
  - `races/serializers.py` - Added comprehensive validation methods
  - `snailrace/settings.py` - Tightened CORS configuration

### What This Fixes
- ❌ Silent save failures (users now see clear feedback)
- ❌ Invalid data reaching database (backend now validates all inputs)
- ❌ Open CORS policy security risk (now restricted to approved origins)
- ❌ No user feedback during saves (loading/success/error states now visible)
- ❌ Race results saved with impossible conditions (cross-field validation prevents this)

### Testing
- Verified save status banner appears above winner modal
- Tested error display when backend is offline
- Confirmed backend validation rejects invalid colors
- Confirmed backend validation rejects duplicate colors
- Verified CORS allows only specified origins
- All functionality tested locally with positive results

### Documentation Added
- `test_validation.md` - Backend validation testing guide
- `CORS_UPDATE.md` - CORS security update checklist

---

## Version 1.2.2 - Race Statistics Visualization
**Date:** January 5, 2026  
**Goal:** Add responsive race statistics display with live data visualization

### Features Added
- RaceStats component displaying aggregate race data from backend API
- Auto-refresh stats after each race completion
- Visual breakdown of wins by color with horizontal bar charts
- Summary cards showing total races and most winning colors
- Collapsible stats panel with always-visible toggle button
- Responsive side-by-side layout on desktop (stats 30%, game 70%)
- Stacked vertical layout on mobile/tablet (≤820px breakpoint)

### Technical Changes
- Created `RaceStats.jsx` component with collapse/expand state management
- Restructured `App.jsx` with `.app-layout` container for side-by-side layout
- Added `statsRefreshTrigger` state to force stats refresh after race saves
- Implemented responsive CSS with viewport-based sizing (`calc(100vw - 40px)`)
- Removed fixed 1200px max-width constraint for full responsive behavior
- Added comprehensive CSS for stats display including:
  - Gradient stat cards
  - Color-coded bar charts with smooth animations
  - Responsive grid layouts
  - Mobile collapse/expand transitions
- Maintains WCAG 2.1 AA accessibility with proper ARIA attributes

### UI/UX Improvements
- Stats sidebar uses 30% of available viewport width (min 320px)
- Game area uses remaining 70% of viewport width
- Toggle button available on all screen sizes for user control
- Stats collapsed by default on mobile, always expanded on desktop >820px
- Smooth 0.3s transitions for collapse/expand animations
- Color badges match game color scheme for consistency

### Files Modified
- `src/components/RaceStats.jsx` (new)
- `src/App.jsx`
- `src/App.css`

---

## Version 1.2.1 - Accessibility & UI Fixes
**Date:** January 5, 2026  
**Goal:** Fix dropdown visibility and improve color contrast for WCAG 2.1 AA compliance

### Fixes
- Fixed dropdown text visibility in prediction screen
  - Added explicit `color: #333` to select elements
  - Added `appearance: auto` for proper browser rendering
  - Styled option elements for consistent display
- Improved color contrast for prediction badges
  - Darkened blue: `#0056b3` (was pure blue)
  - Darkened purple: `#6a0dad` (was pure purple)
  - Darkened green: `#006400` (was pure green)
  - Darkened red: `#c00` (was pure red)
  - Orange and yellow use black text for readability
- All color combinations now meet WCAG 2.1 AA contrast ratios (4.5:1 minimum)

### Technical Changes
- Updated `App.css` with explicit select styling
- Enhanced `GameBoard.jsx` color mapping for accessibility
- Maintains full accessibility compliance

---

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
