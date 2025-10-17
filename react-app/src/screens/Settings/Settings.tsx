import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleMaintenance } from '../../store/workspaceSlice';
import { initializeWorkspaceData } from '../../services/stateBootstrap';

export const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { maintenanceMode } = useAppSelector((state) => state.workspace);
  const { isLoading } = useAppSelector((state) => state.status);

  const handleMaintenanceToggle = () => {
    dispatch(toggleMaintenance());
  };

  const handleReload = async () => {
    await initializeWorkspaceData(dispatch);
  };

  return (
    <div className="card">
      <h1 className="card-title">Operations & Experiments</h1>
      <p className="card-subtitle">Flip toggles to simulate migration scenarios.</p>

      <label className="switch">
        <input
          type="checkbox"
          className="switch-input"
          checked={maintenanceMode}
          onChange={handleMaintenanceToggle}
        />
        <span className="switch-slider"></span>
        <span>Maintenance mode {maintenanceMode ? 'enabled' : 'disabled'}</span>
      </label>

      <hr className="card-divider" />

      <button
        className="btn btn-secondary"
        onClick={handleReload}
        disabled={isLoading}
      >
        Reload from mock API
      </button>
      <p className="text-caption" style={{ marginTop: '8px' }}>
        Simulates fetching shared state from the legacy API surface.
      </p>
    </div>
  );
};



