import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
  isLoading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  isLoading: false,
  error: null,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    loadDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadDataSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    loadDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loadDataRequest, loadDataSuccess, loadDataFailure } = statusSlice.actions;
export default statusSlice.reducer;


