import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppState, ErrorI, TransactionInfo } from '../interfaces/App.interfaces';

const initialState: AppState = {
    isLoaded: false,
    error: null,
    errorStack: [],
    sucInfo: null,
    isOpenSelectWalletModal: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appLoaded(state, action: PayloadAction<boolean>) {
            state.isLoaded = action.payload;
        },
        setError(state, action: PayloadAction<{e: ErrorI}>) {
            state.error = action.payload.e;
        },
        setErrorStack(state, action: PayloadAction<{e: ErrorI}>) {
            state.errorStack.push(action.payload.e);
        },
        setSucInfo(state, action: PayloadAction<TransactionInfo>) {
            state.sucInfo = action.payload;
        },
        setIsOpenSelectWalletModal(state, action: PayloadAction<boolean>) {
            state.isOpenSelectWalletModal = action.payload;
        },
    },
});

export const {
    appLoaded, setError, setErrorStack, setSucInfo, setIsOpenSelectWalletModal,
} = appSlice.actions;
export default appSlice.reducer;