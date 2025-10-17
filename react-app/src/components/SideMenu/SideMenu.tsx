import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { MenuItem } from '../../store/navigationSlice';

interface SideMenuProps {
  items: MenuItem[];
  selected: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ items, selected }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (menuKey: string) => {
    navigate(`/${menuKey}`);
  };

  return (
    <div className={styles.sideMenu}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Navigation</h2>
      </div>
      <ul className={styles.menuList}>
        {items.map((item) => (
          <li key={item.key} className={styles.menuItem}>
            <button
              className={`${styles.menuButton} ${
                selected === item.key ? styles.active : ''
              }`}
              onClick={() => handleSelect(item.key)}
            >
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};



