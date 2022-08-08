// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import type { languages } from 'utils/Global/Types';
import type { IAppEntityState, siteThemes, TransactionInfo } from './AppEntity.interfaces';

const initialState: IAppEntityState & IWithHelperState = {
    ...withHelperState,
    language: 'en',
    theme: 'default',
    isAppLoaded: false,
    isOpenSelectWalletModal: false,
    sucInfo: null,
};

export const AppEntity = createSlice({
    name: 'AppEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setTheme(state, action: PayloadAction<{ theme: siteThemes }>) {
            state.theme = action.payload.theme;
        },
        setLanguage(state, action: PayloadAction<{ language: languages }>) {
            state.language = action.payload.language;
        },
        setIsAppLoaded(state, action: PayloadAction<boolean>) {
            state.isAppLoaded = action.payload;
        },
        setIsOpenSelectWalletModal(state, action: PayloadAction<boolean>) {
            state.isOpenSelectWalletModal = action.payload;
        },
        setSucInfo(state, action: PayloadAction<TransactionInfo>) {
            state.sucInfo = action.payload;
        },
    },
});
