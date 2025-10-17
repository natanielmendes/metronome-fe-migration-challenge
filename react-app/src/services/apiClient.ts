import mockData from './mockData.json';
import { WorkspaceData } from '../store/workspaceSlice';

class ApiClient {
  async fetchWorkspaceSnapshot(): Promise<Partial<WorkspaceData>> {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const clone = JSON.parse(JSON.stringify(mockData));
        resolve(clone);
      }, 650);
    });
  }
}

export const apiClient = new ApiClient();


