import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WorkspaceData {
  summary: string;
  wins: number;
  openIncidentCount: number;
  teamMood: 'optimistic' | 'neutral' | 'concerned';
  blockers: string[];
  maintenanceMode: boolean;
  lastUpdated: string;
}

const initialState: WorkspaceData = {
  summary: 'Loading shared context…',
  wins: 0,
  openIncidentCount: 0,
  teamMood: 'neutral',
  blockers: [],
  maintenanceMode: false,
  lastUpdated: new Date(0).toISOString(),
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    loadDataSuccess: (state, action: PayloadAction<Partial<WorkspaceData>>) => {
      return { ...state, ...action.payload };
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    incrementWins: (state, action: PayloadAction<number>) => {
      state.wins += action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    addBlocker: (state, action: PayloadAction<string>) => {
      console.log('addBlocker', action.payload);
      const blocker = action.payload?.trim();
      if (blocker && !state.blockers.includes(blocker)) {
        state.blockers.push(blocker);
        state.lastUpdated = new Date().toISOString();
      }
    },
    toggleMaintenance: (state) => {
      state.maintenanceMode = !state.maintenanceMode;
      state.lastUpdated = new Date().toISOString();
    },
    updateTeamMood: (state, action: PayloadAction<'optimistic' | 'neutral' | 'concerned'>) => {
      state.teamMood = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { 
  loadDataSuccess, 
  updateSummary, 
  incrementWins, 
  addBlocker, 
  toggleMaintenance, 
  updateTeamMood 
} = workspaceSlice.actions;
export default workspaceSlice.reducer;


