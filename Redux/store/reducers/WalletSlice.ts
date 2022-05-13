import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ProviderType, walletKeyType } from '../../types';
import { changeNetwork, setWallet } from './ActionCreators';
import type { availableChains } from '../../../src/utils/GlobalConst';

type initialStateType = {
    walletKey: walletKeyType,
    provider: ProviderType,
    account: string | null,
    error: boolean;
    chainId: availableChains,
}
const initialState: initialStateType = {
    walletKey: null,
    provider: null,
    account: null,
    chainId: '250',
    error: false,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        chainChange(state, action: PayloadAction<availableChains>) {
            state.chainId = parseInt(action.payload, 16).toString() as availableChains;
        },
        changeAccount(state, action: PayloadAction<{ accounts: string[] }>) {
            const [account] = action.payload.accounts;
            state.account = account;
        },
        removeWallet(state) {
            state.walletKey = initialState.walletKey;
            state.provider = initialState.provider;
            state.account = initialState.account;
            state.chainId = initialState.chainId;
            localStorage.removeItem('wallet');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeNetwork.fulfilled, (state, action) => {
            state.chainId = action.payload.chainId;
            state.provider = action.payload.newProvider;
        });
        builder.addCase(setWallet.fulfilled, (state, action: any) => {
            const { payload } = action;

            if (payload) {
                state.walletKey = payload.walletKey;
                state.chainId = payload.newChainId;
                state.provider = payload.provider;
                state.account = payload.account;
            }
        });
    },
});

export const {
    chainChange, changeAccount, removeWallet,
} = walletSlice.actions;
export default walletSlice.reducer;
