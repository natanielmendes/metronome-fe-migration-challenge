# Legacy AngularJS Console

This project intentionally mimics a pre-migration AngularJS 1.x console. It is meant to be a playground for interview exercises focused on gradually introducing React without disrupting existing features.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the legacy dev server:
   ```bash
   npm start
   ```
3. Open the app in your browser at `http://localhost:4200`.

## What You Get

- AngularJS 1.8 app bootstrapped with Webpack and Babel for a modern build pipeline.
- Angular Material styling with shared global CSS to keep things “legacy polished”.
- Top toolbar plus left navigation with four feature areas (Overview, Metrics, Team, Settings).
- Redux-powered shared state (via `ng-redux`) so updates in one screen instantly flow across the others.
- Mock API service (`ApiClient`) that simulates asynchronous data loading for a realistic feel.

## Suggested Exercises

- Embed a React widget inside one of the screens and wire it to the shared Redux store.
- Replace one AngularJS screen with a React equivalent while keeping routing intact.
- Demonstrate patterns for isolating styles between AngularJS and React components.

## Suggested Exercises - Completed ✅

All three suggested exercises have been successfully implemented, demonstrating real-world patterns for migrating from AngularJS to React.

### Exercise 1: React Widget in AngularJS Screen

**What was built**: A React counter widget embedded inside the existing AngularJS Metrics screen, connected to the shared Redux store.

**Try it**: Navigate to **Metrics** (`/metrics`)
- Left: AngularJS button (Angular Material styling)
- Center: React widget with custom styling
- Both update the same Redux store in real-time

**Key files**:
- `src/app/components/react-widgets/WinsCounter.jsx` - React widget component
- `src/app/services/react-widget-bridge.service.js` - Service to mount/unmount React

### Exercise 2: Full React Screen

**What was built**: A complete React implementation of the Metrics screen as a new route.

**Try it**: Navigate to **Metrics (React)** (`/metrics-react`) from the side menu
- Entire screen built with React
- Connected to the same Redux store as AngularJS
- Modern design with isolated styling

**Key files**:
- `src/app/screens/react-screens/MetricsReact.jsx` - Full React screen
- `src/app/app.module.js` - Route configuration with dynamic import

### Exercise 3: Style Isolation

**What was demonstrated**: CSS namespacing and scoping techniques to prevent style conflicts between AngularJS (Angular Material) and React components.

**Techniques used**:
- CSS namespacing (`.react-*` prefixes for React components)
- Scoped imports (CSS imported alongside components)
- Visual distinction (different color schemes and styling)

**Verify**: Inspect React widget in DevTools - observe no `md-*` classes, only `.react-*` classes.

---

## Technical Architecture

### Shared Redux Store
Both AngularJS and React components connect to the same Redux store:
- **AngularJS**: Uses `ng-redux` with `$ngRedux.connect()`
- **React**: Uses `react-redux` with `connect()` or hooks
- **Result**: State updates are instantly visible across both frameworks

### React Bridge Service
The `ReactWidgetBridgeService` handles mounting and unmounting React components:
```javascript
// Mount React component
ReactWidgetBridgeService.mount('#selector', Component);

// Unmount on cleanup
ReactWidgetBridgeService.unmount('#selector');
```

### Component Lifecycle
- React widgets mount in AngularJS `$onInit()`
- React widgets unmount in AngularJS `$onDestroy()`
- Full React screens mount/unmount via UI-Router `onEnter`/`onExit`

---

## Quick Testing Guide

### State Synchronization Test
1. Navigate to **Metrics** (`/metrics`)
2. Click "Add win" in the React widget
3. Navigate to **Overview** - wins counter updated ✅
4. Navigate to **Metrics (React)** - wins counter updated ✅

### Maintenance Mode Test
1. Navigate to **Settings**
2. Toggle "Maintenance mode" ON
3. Go to **Metrics** - both AngularJS and React buttons are disabled ✅
4. Go to **Metrics (React)** - button is disabled ✅

### Style Isolation Test
1. Navigate to **Metrics**
2. Right-click the React widget
3. Inspect Element → Computed Styles
4. Verify `.react-*` classes with no Angular Material interference ✅

---

## Configuration Highlights

### Dependencies Added
- `react` & `react-dom` - React framework
- `react-redux` - Redux bindings for React
- `@babel/preset-react` - JSX transformation

### Webpack Updates
- Added JSX file support (`.jsx` extension)
- Configured Babel with React preset
- Supports dynamic imports for code splitting

---

## Key Learnings

✅ **Incremental Migration**: React can be introduced gradually without rewriting everything  
✅ **Shared State**: Redux works seamlessly across both frameworks  
✅ **Style Isolation**: CSS conflicts are manageable with proper namespacing  
✅ **Low Risk**: Widgets and screens can coexist during migration  
✅ **Modern Patterns**: React components use hooks and functional patterns
