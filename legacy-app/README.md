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

Feel free to extend or modify the setup as needed for migration demonstrations.
