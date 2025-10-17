import { connect } from 'react-redux';
import { incrementWins } from '../../store';
import './MetricsReact.css';

const MetricsReact = ({ wins, blockers, maintenanceMode, dispatch }) => {
  // Compute open incidents dynamically from blockers array
  const openIncidentCount = blockers.length;

  const handleIncrement = () => {
    dispatch(incrementWins(1));
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="card-title mb-0">Key Progress Metrics</h1>
          <p className="card-subtitle mb-0">Track how far the migration milestone advanced.</p>
        </div>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--app-primary)">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
        </svg>
      </div>

      <div className="stat-group">
        <div className="stat-item">
          <div className="stat-value">{wins}</div>
          <div className="stat-label">Wins logged</div>
          <button 
            className="btn btn-primary mt-16" 
            onClick={handleIncrement}
            disabled={maintenanceMode}
            title={maintenanceMode ? "Disabled during maintenance mode" : "Add a win to track progress"}
          >
            Add win
          </button>
        </div>
        <div className="stat-item">
          <div className="stat-value">{openIncidentCount}</div>
          <div className="stat-label">Open incidents</div>
          {maintenanceMode && (
            <div className="note">
              <strong>Heads up:</strong> Metrics are read-only while maintenance mode is enabled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wins: state.workspace.wins,
  blockers: state.workspace.blockers,
  maintenanceMode: state.workspace.maintenanceMode
});

export default connect(mapStateToProps)(MetricsReact);

