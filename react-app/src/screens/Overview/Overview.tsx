import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateSummary } from '../../store/workspaceSlice';

export const Overview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary, lastUpdated, wins, blockers } = useAppSelector(
    (state) => state.workspace
  );

  // Compute open incidents dynamically from blockers array
  const openIncidentCount = blockers.length;

  const [localSummary, setLocalSummary] = useState(summary);

  useEffect(() => {
    setLocalSummary(summary);
  }, [summary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateSummary(localSummary));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="card">
      <h1 className="card-title">Executive Summary</h1>
      <p className="card-subtitle">Share the latest migration notes with everyone.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="summary" className="form-label">
            Summary blurb
          </label>
          <textarea
            id="summary"
            className="form-textarea"
            value={localSummary}
            onChange={(e) => setLocalSummary(e.target.value)}
            maxLength={540}
            rows={4}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-secondary text-caption">
            {lastUpdated && (
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ verticalAlign: 'middle', marginRight: '4px' }}
                >
                  <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" />
                </svg>
                Last pushed {formatDate(lastUpdated)}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Update summary
          </button>
        </div>
      </form>

      <hr className="card-divider" />

      <div className="stat-group">
        <div className="stat-item">
          <div className="stat-value">{wins}</div>
          <div className="stat-label">Wins celebrated</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{openIncidentCount}</div>
          <div className="stat-label">Open incidents</div>
        </div>
      </div>
    </div>
  );
};



