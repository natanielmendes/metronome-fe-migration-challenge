import { AppDispatch } from '../store';
import { loadDataSuccess, WorkspaceData } from '../store/workspaceSlice';
import mockData from '../../../legacy-app/src/app/services/mock-data.json';

export const initializeWorkspaceData = async (dispatch: AppDispatch) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 650));
    dispatch(loadDataSuccess(mockData as Partial<WorkspaceData>));
  } catch (error) {
    console.error('Failed to initialize workspace data:', error);
  }
};

