import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addBlocker, updateTeamMood } from '../../store/workspaceSlice';

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teamMood, blockers } = useAppSelector((state) => state.workspace);
  const [newBlocker, setNewBlocker] = useState('');

  const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTeamMood(e.target.value as 'optimistic' | 'neutral' | 'concerned'));
  };

  const handleAddBlocker = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlocker.trim()) {
      dispatch(addBlocker(newBlocker.trim()));
      setNewBlocker('');
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Team Collaboration</h1>
      <p className="card-subtitle">Capture blockers and pulse check mood.</p>

      <div className="form-group">
        <label htmlFor="mood" className="form-label">
          Mood
        </label>
        <select
          id="mood"
          className="form-select"
          value={teamMood}
          onChange={handleMoodChange}
        >
          <option value="optimistic">Optimistic</option>
          <option value="neutral">Neutral</option>
          <option value="concerned">Concerned</option>
        </select>
      </div>

      <form onSubmit={handleAddBlocker} className="flex gap-16 items-center">
        <div className="form-group mb-0" style={{ flex: 1 }}>
          <label htmlFor="newBlocker" className="form-label">
            New blocker
          </label>
          <input
            id="newBlocker"
            type="text"
            className="form-input"
            value={newBlocker}
            onChange={(e) => setNewBlocker(e.target.value)}
            placeholder="E.g. React build overlapping with AngularJS router"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '28px' }}>
          Add
        </button>
      </form>

      {blockers.length > 0 ? (
        <>
          <h3 className="list-subheader">Captured blockers</h3>
          <ul className="list">
            {blockers.map((blocker, index) => (
              <li key={index} className="list-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--app-primary)">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>{blocker}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-caption" style={{ marginTop: '16px' }}>
          No blockers reported yet.
        </p>
      )}
    </div>
  );
};



