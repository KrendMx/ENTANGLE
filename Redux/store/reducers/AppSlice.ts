import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MetamaskErrorUserMessages } from '../../../components/Modal/ErrorModal/ErrorModal.constants';

type AppState = {
    isLoaded: boolean;
    error: null | ErrorI;
    errorStack: ErrorI[];
    sucInfo: null | TransactionInfo;
    isOpenSelectWalletModal: boolean;
}

type TransactionInfo = { value: number, symbol: string, isReceived: boolean }

interface ErrorI extends Error {
    code: keyof typeof MetamaskErrorUserMessages
}

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
        errorHandler(state, action: PayloadAction<{e: ErrorI, returnValue: any}>) {
            state.errorStack = [...state.errorStack, action.payload.e];
            if ((action.payload.e.code as number) === -32002) {
                localStorage.removeItem('wallet');
            }
            state.error = action.payload.e;
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
    appLoaded, setError, errorHandler, setSucInfo, setIsOpenSelectWalletModal,
} = appSlice.actions;
export default appSlice.reducer;
