# JScargot Version History

A full-stack web application based on the classic children's board game "Snail's Pace Race."

## Version 1.3.0 - Responsive Redesign
**Date:** January 6, 2026  
**Goal:** Major UX overhaul for mobile devices with vertical track layout and responsive improvements

### Mobile Vertical Track (≤820px)
- **Complete Layout Transformation:**
  - Track rotates 90°: snails now start at BOTTOM and race UPWARD to finish at TOP
  - Six vertical columns (one per snail) instead of horizontal rows
  - Snails rotated -90° to face upward with vertical wiggle animation
  - Track spaces stack vertically with proper spacing (30px height)
  - Color labels at bottom of each column with readable text
  - Finish line at top with position numbers properly displayed
  - Max height constraint (60vh) prevents track from overflowing

### Smart Stats Toggle Behavior
- **Desktop (>1024px):**
  - Toggle button hidden completely
  - Stats always visible and expanded
  - Side-by-side layout with game board

- **Tablet (821-1024px):**
  - Toggle button visible
  - Stats expanded by default
  - Side-by-side layout maintained
  - User can collapse if desired

- **Mobile (≤820px):**
  - Toggle button visible
  - Stats collapsed by default
  - Stacked vertical layout
  - User can expand to view stats

### Inline Dice & Button Layout
- **UI Consolidation:**
  - "Roll the Dice" button now appears inline with dice display
  - Removed separate Controls component
  - Dice component now accepts `onRoll` prop directly
  - More compact layout saves vertical space
  - Better visual hierarchy with dice and button grouped together

### Responsive Improvements
- **Max Width Constraint:**
  - App container limited to 1800px width
  - Prevents absurd stretching on ultra-wide monitors (>1800px)
  - Content remains readable and well-proportioned

- **Max Height for Game Board:**
  - Game board limited to 90vh height with scroll if needed
  - Prevents layout from breaking viewport on short screens
  - Ensures all controls remain accessible

### CSS Architecture Improvements
- **Removed All `!important` Usage:**
  - Refactored CSS cascade to use proper specificity
  - Media queries structured with clear precedence
  - Follows best practices for maintainable stylesheets

- **Clean Media Query Structure:**
  - Base styles defined first
  - Mobile/tablet collapsible states (≤1024px)
  - Desktop overrides (>1024px) use natural cascade
  - No conflicting rules or specificity wars

### Component Updates
- **RaceTrack.jsx:**
  - Added `track-columns-container` wrapper div
  - Enables proper grid layout for vertical columns on mobile
  - No changes to desktop/tablet rendering

- **Snail.jsx:**
  - Added `className="snail"` for CSS targeting
  - Enables rotation and animation styling

- **Dice.jsx:**
  - Integrated button inline with dice display
  - New `dice-and-button` and `dice-section` containers
  - Accepts `onRoll` prop for button functionality

- **GameBoard.jsx:**
  - Removed separate `Controls` import
  - Passes `onRoll` to `Dice` component
  - Simplified component structure

### Files Modified
- `src/App.css` - Major responsive redesign with vertical track support
- `src/components/RaceTrack.jsx` - Added container for vertical columns
- `src/components/Snail.jsx` - Added className for styling
- `src/components/Dice.jsx` - Integrated inline button
- `src/components/GameBoard.jsx` - Removed Controls component
- `src/components/RaceStats.jsx` - Smart default expansion logic

### What This Fixes
- ❌ Mobile horizontal scrolling and cramped layout
- ❌ Stats toggle not working correctly across breakpoints
- ❌ Excessive vertical space between dice and button
- ❌ Layout breaking on ultra-wide monitors
- ❌ Game board potentially requiring scrolling
- ❌ CSS `!important` anti-patterns
- ❌ Snail animation looking wrong when rotated

### Testing
- Verified vertical track on iPhone SE, iPhone 14 Pro, and various Android sizes
- Confirmed stats toggle behavior at all three breakpoints
- Tested inline button layout on desktop, tablet, and mobile
- Verified max-width prevents stretching on ultra-wide displays
- Confirmed snails rotate correctly and wiggle vertically on mobile
- All existing functionality continues to work

### Technical Notes
- Vertical track uses CSS `flex-direction: column-reverse` to stack spaces bottom-to-top
- Snail rotation uses `transform: rotate(-90deg)` for upward facing
- Vertical wiggle animation uses `translateY` instead of `translateX`
- Media queries at 820px, 1024px, and 1800px for responsive breakpoints
- Smart stats expansion uses `window.innerWidth` on component mount

---

## Version 1.2.4 - Code Quality & Reliability Improvements
**Date:** January 6, 2026  
**Goal:** Improve maintainability, add API protection, and enhance save reliability

### Frontend Improvements
- **Shared Constants:**
  - Created `src/constants.js` with `SNAIL_COLORS` and `TRACK_LENGTH` exports
  - Updated `App.jsx` to import and use shared constants
  - Updated `RaceStats.jsx` to derive color list from constants
  - Eliminates hardcoded color arrays across multiple files
  - Single source of truth for game configuration

- **Retry Logic for Saves:**
  - Created `src/utils/retry.js` with `retryWithBackoff` utility function
  - Implements exponential backoff retry strategy (1s, 2s, 4s delays)
  - Automatically retries failed saves up to 3 times before giving up
  - Logs retry attempts to console for debugging
  - Improves reliability when network is temporarily unavailable
  - Updated error message to include connection hint

### Backend Improvements
- **Shared Constants:**
  - Created `races/constants.py` with `SNAIL_COLORS` and `SNAIL_COLOR_VALUES` exports
  - Updated `models.py` to import and use shared constants
  - Updated `serializers.py` to use shared constants for validation
  - Single source of truth for valid snail colors
  - Easier to maintain if colors are ever added/removed

- **API Rate Limiting:**
  - Added DRF throttling configuration in `settings.py`
  - Limits anonymous users to 100 requests per hour
  - Prevents API abuse and excessive load
  - Uses Django REST Framework's built-in `AnonRateThrottle`
  - Returns HTTP 429 (Too Many Requests) when limit exceeded

### Technical Benefits
- **Maintainability:** Color changes only need to happen in one place per codebase
- **Reliability:** Save operations now resilient to temporary network issues
- **Security:** API protected from abuse and excessive requests
- **Code Quality:** Eliminates duplication and follows DRY principles

### Files Modified
- **Frontend:**
  - `src/constants.js` (new)
  - `src/utils/retry.js` (new)
  - `src/App.jsx`
  - `src/components/RaceStats.jsx`

- **Backend:**
  - `races/constants.py` (new)
  - `races/models.py`
  - `races/serializers.py`
  - `snailrace/settings.py`

### What This Fixes
- ❌ Hardcoded colors in multiple places (frontend and backend)
- ❌ No retry logic for failed saves (network blips = lost data)
- ❌ No rate limiting (API could be abused)
- ❌ Code duplication across components

### Testing
- Verified shared constants work in both frontend and backend
- Tested retry logic by temporarily disabling backend
- Confirmed rate limiting triggers at 100 requests/hour
- All existing functionality continues to work

---

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
