import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ChainIdType, ProviderType, walletKeyType } from '../../types';
import { changeNetwork, setChainId, setWallet } from './ActionCreators';

type initialStateType = {
    walletKey: walletKeyType,
    provider: ProviderType,
    account: string | null,
    chainId: ChainIdType,
    error: boolean;
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
        chainChange(state, action: PayloadAction<ChainIdType>) {
            state.chainId = parseInt(action.payload, 16).toString() as ChainIdType;
        },
        changeAccount(state, action: PayloadAction<{ accounts: string[] }>) {
            const [account] = action.payload.accounts;
            state.account = account;
        },
        removeWallet(state, action) {
            state.account = action.payload;
            localStorage.removeItem('wallet');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeNetwork.fulfilled, (state, action) => {
            state.chainId = action.payload;
        });
        builder.addCase(setChainId.fulfilled, (state, action) => {
            state.provider = action.payload;
        });
        builder.addCase(setWallet.fulfilled, (state, action) => {
            state.walletKey = action.payload;
        });
        builder.addCase(setWallet.rejected, (state, action) => {
            console.log(state.provider);
        });
    },
});

export const { chainChange, changeAccount, removeWallet } = walletSlice.actions;
export default walletSlice.reducer;
