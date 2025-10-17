import { connect } from 'react-redux';
import { incrementWins } from '../../store';
import './WinsCounter.css';

const WinsCounter = ({ wins, maintenanceMode, dispatch }) => (
  <div className="react-stat-item">
    <div className="stat-value">{wins}</div>
    <div className="stat-label">Wins logged (React)</div>
    <button 
      onClick={() => dispatch(incrementWins(1))}
      disabled={maintenanceMode}
      className="btn btn-primary mt-16"
      title={maintenanceMode ? "Disabled during maintenance mode" : "Add a win to track progress"}
    >
      Add win
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  wins: state.workspace.wins,
  maintenanceMode: state.workspace.maintenanceMode
});

export default connect(mapStateToProps)(WinsCounter);

