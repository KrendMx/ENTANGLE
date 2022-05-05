import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import type { ChainIdType, ProviderType, walletKeyType } from '../../types';
import { changeNetwork, setWallet } from './ActionCreators';

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
        removeWallet(state) {
            state.walletKey = initialState.walletKey;
            state.provider = initialState.provider;
            state.account = initialState.account;
            state.chainId = initialState.chainId;
            localStorage.removeItem('wallet');
        },
        setChainId(state, action) {
            const { provider } = state;
            const newChainId = action.payload.chainId as ChainIdType;
            // changeNetwork({ newChainId, provider });
            const newProvider = new ethers.providers.Web3Provider(window.ethereum);
            state.chainId = newChainId;
            state.provider = newProvider;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeNetwork.fulfilled, (state, action) => {
            state.chainId = action.payload;
        });
        builder.addCase(setWallet.fulfilled, (state, action: any) => {
            state.walletKey = action.payload.walletKey;
            state.chainId = action.payload.newChainId;
            state.provider = action.payload.provider;
            state.account = action.payload.account;
        });
    },
});

export const {
    chainChange, changeAccount, removeWallet, setChainId,
} = walletSlice.actions;
export default walletSlice.reducer;
