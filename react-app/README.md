# Workspace Console - React Migration

Modern React + TypeScript application migrated from the legacy AngularJS workspace console.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features

- **Overview**: Executive summary with editable notes and statistics
- **Metrics**: Progress tracking with wins counter
- **Team**: Mood tracking and blocker management
- **Settings**: Operational toggles and data reload

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Main layout wrapper
│   ├── SideMenu/       # Navigation sidebar
│   └── TopBar/         # Application header
├── screens/            # Page-level components
│   ├── Overview/       # Executive summary screen
│   ├── Metrics/        # Metrics tracking screen
│   ├── Team/           # Team collaboration screen
│   └── Settings/       # Settings & operations screen
├── store/              # Redux state management
│   ├── index.ts        # Store configuration
│   ├── navigationSlice.ts
│   ├── workspaceSlice.ts
│   ├── statusSlice.ts
│   └── hooks.ts        # Typed hooks
├── services/           # Business logic & API
│   ├── apiClient.ts    # Mock API client
│   ├── mockData.json   # Sample data
│   └── stateBootstrap.ts
├── styles/             # Global styles
│   ├── global.css
│   └── components.css
├── App.tsx             # Root component
└── main.tsx            # Entry point
```



