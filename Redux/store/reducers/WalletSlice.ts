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
            changeNetwork({
                chainId: action.payload,
                provider: state.provider,
            });
            state.chainId = action.payload;
            state.provider = new ethers.providers.Web3Provider(window.ethereum);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeNetwork.fulfilled, (state, action) => {
            console.log(action.payload);
            state.chainId = action.payload;
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
    chainChange, changeAccount, removeWallet, setChainId,
} = walletSlice.actions;
export default walletSlice.reducer;
