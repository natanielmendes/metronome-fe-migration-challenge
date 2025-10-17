import React from 'react';
import styles from './TopBar.module.css';

interface TopBarProps {
  selectedMenu: string;
  lastUpdated: string | null;
  maintenanceMode: boolean;
  isLoading: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  selectedMenu,
  lastUpdated,
  maintenanceMode,
  isLoading,
}) => {
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
    <div className={styles.topBar}>
      <div className={styles.left}>
        <button className={styles.menuButton} aria-label="Toggle navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div className={styles.copy}>
          <div className={styles.title}>Workspace Console</div>
          {selectedMenu && (
            <div className={styles.subtitle}>Section: {selectedMenu.toUpperCase()}</div>
          )}
        </div>
      </div>

      <div className={styles.right}>
        {isLoading && (
          <div className={styles.indicator}>
            <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
            <span>Syncing state</span>
          </div>
        )}
        {maintenanceMode && !isLoading && (
          <div className={styles.indicator}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
            </svg>
            <span>Maintenance mode</span>
          </div>
        )}
        {lastUpdated && (
          <div className={styles.timestamp}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>Updated {formatDate(lastUpdated)}</span>
          </div>
        )}
      </div>
    </div>
  );
};



