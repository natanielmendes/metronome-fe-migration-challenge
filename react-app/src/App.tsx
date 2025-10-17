import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { Layout } from './components/Layout/Layout';
import { Overview } from './screens/Overview/Overview';
import { Metrics } from './screens/Metrics/Metrics';
import { Team } from './screens/Team/Team';
import { Settings } from './screens/Settings/Settings';
import { initializeWorkspaceData } from './services/stateBootstrap';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize workspace data on mount
    initializeWorkspaceData(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="metrics" element={<Metrics />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;



