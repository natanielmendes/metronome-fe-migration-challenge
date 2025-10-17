import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  key: string;
  label: string;
  description: string;
}

export const menuItems: MenuItem[] = [
  { key: 'overview', label: 'Overview', description: 'Executive summary and shared notes.' },
  { key: 'metrics', label: 'Metrics', description: 'Leading metrics and progress indicators.' },
  { key: 'team', label: 'Team', description: 'Collaboration status and open blockers.' },
  { key: 'settings', label: 'Settings', description: 'Operational toggles and migration helpers.' }
];

interface NavigationState {
  selectedMenu: string;
  menuItems: MenuItem[];
}

const initialState: NavigationState = {
  selectedMenu: 'overview',
  menuItems,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    selectMenu: (state, action: PayloadAction<string>) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { selectMenu } = navigationSlice.actions;
export default navigationSlice.reducer;


