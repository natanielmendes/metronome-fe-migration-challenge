import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import workspaceReducer from './workspaceSlice';
import statusReducer from './statusSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    workspace: workspaceReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


