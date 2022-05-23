import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type WalletConnectProvider from '@walletconnect/web3-provider';

import type { ProviderType, walletKeyType, setWalletType } from '../../types';
import { changeNetwork, setWallet } from './ActionCreators';
import type { availableChains } from '../../../utils/GlobalConst';

type initialStateType = {
    walletKey: walletKeyType,
    provider: ProviderType,
    account: string | null,
    chainId: availableChains,
    preLoader: boolean;
    connect: WalletConnectProvider;
}
const initialState: initialStateType = {
    walletKey: null,
    provider: null,
    account: null,
    chainId: '43114',
    preLoader: true,
    connect: null,
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
            state.connect = initialState.connect;
            localStorage.removeItem('wallet');
        },
        changeNetworkWC(state, action: PayloadAction<{chainId: availableChains, provider: ProviderType}>) {
            state.chainId = action.payload.chainId;
            state.provider = action.payload.provider;
        },
        setPreloader(state, action: PayloadAction<boolean>) {
            state.preLoader = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeNetwork.fulfilled, (state, action) => {
            state.chainId = action.payload.chainId;
            state.provider = action.payload.newProvider;
        });
        builder.addCase(setWallet.fulfilled, (state, action: PayloadAction<setWalletType>) => {
            const { payload } = action;

            if (payload) {
                state.connect = payload.connect;
                state.walletKey = payload.walletKey;
                state.chainId = payload.newChainId;
                state.provider = payload.provider;
                state.account = payload.account;
            }
            state.preLoader = false;
        });
    },
});

export const {
    chainChange, changeAccount, removeWallet, setPreloader, changeNetworkWC,
} = walletSlice.actions;
export default walletSlice.reducer;
