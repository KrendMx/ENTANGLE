import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MintDashboardItemCardType } from '@/components/Mint/Demand/MintPage/types';
import type { languages } from '../../../utils/GlobalConst';
import type {
    AppState,
    ErrorI,
    TransactionInfo,
    sortingCard,
} from '../interfaces/App.interfaces';

const initialState: AppState = {
    isLoaded: false,
    error: null,
    errorStack: [],
    sucInfo: null,
    isOpenSelectWalletModal: false,
    language: 'en',
    activeCard: null,
    sortingObject: {},
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appLoaded(state, action: PayloadAction<boolean>) {
            state.isLoaded = action.payload;
        },
        setError(state, action: PayloadAction<{ e: ErrorI }>) {
            if (action.payload?.e) {
                state.error = action.payload.e;
            } else {
                state.error = null;
            }
        },
        setErrorStack(state, action: PayloadAction<{ e: ErrorI }>) {
            state.errorStack.push(action.payload.e);
        },
        setLanguage(state, action: PayloadAction<{ lang: languages }>) {
            state.language = action.payload.lang;
        },
        setSucInfo(state, action: PayloadAction<TransactionInfo>) {
            state.sucInfo = action.payload;
        },
        setIsOpenSelectWalletModal(state, action: PayloadAction<boolean>) {
            state.isOpenSelectWalletModal = action.payload;
        },
        changeActiveCard(
            state,
            action: PayloadAction<MintDashboardItemCardType | null>,
        ) {
            state.activeCard = action.payload;
        },
        addSortingCard(state, action: PayloadAction<sortingCard>) {
            if (!state.sortingObject[action.payload.name])state.sortingObject[action.payload.name] = action.payload;
        },
    },
});

export const {
    appLoaded,
    setError,
    setErrorStack,
    setSucInfo,
    setIsOpenSelectWalletModal,
    setLanguage,
    addSortingCard,
    changeActiveCard,
} = appSlice.actions;
export default appSlice.reducer;
