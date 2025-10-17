import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMenu } from '../../store/navigationSlice';
import { TopBar } from '../TopBar/TopBar';
import { SideMenu } from '../SideMenu/SideMenu';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { menuItems, selectedMenu } = useAppSelector((state) => state.navigation);
  const { lastUpdated, maintenanceMode } = useAppSelector((state) => state.workspace);
  const { isLoading } = useAppSelector((state) => state.status);

  useEffect(() => {
    // Update selected menu based on route
    const path = location.pathname.substring(1) || 'overview';
    dispatch(selectMenu(path));
  }, [location.pathname, dispatch]);

  return (
    <div className={styles.layout}>
      <TopBar
        selectedMenu={selectedMenu}
        lastUpdated={lastUpdated}
        maintenanceMode={maintenanceMode}
        isLoading={isLoading}
      />
      {isLoading && (
        <div className={styles.progressBar}>
          <div className={styles.progressBarFill}></div>
        </div>
      )}
      <div className={styles.body}>
        <SideMenu items={menuItems} selected={selectedMenu} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};



