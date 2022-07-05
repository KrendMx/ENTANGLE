import type { PayloadAction } from '@reduxjs/toolkit';

export interface IWithHelperState {
  isLoading: boolean;
  isSubmitLoading: boolean;
  error: string;
}

export const withHelperState: IWithHelperState = {
    isLoading: false,
    isSubmitLoading: false,
    error: '',
};

export const withHelperReducers = {
    setLoading(state: IWithHelperState, action: PayloadAction<boolean>): void {
        state.isLoading = action.payload;
    },
    setSubmitLoading(state: IWithHelperState, action: PayloadAction<boolean>): void {
        state.isSubmitLoading = action.payload;
    },
    setError(state: IWithHelperState, action: PayloadAction<string>): void {
        state.error = action.payload;
    },
};
