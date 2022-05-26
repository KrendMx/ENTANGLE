import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { initialStateType } from '../interfaces/Wallet.interfaces';
import type { ProviderType, setWalletType } from '../../types';
import { changeNetwork, setWallet, importToken } from './ActionCreators';
import type { availableChains } from '../../../utils/GlobalConst';
import type { ErrorI } from '../interfaces/App.interfaces';

const initialState: initialStateType = {
    walletKey: null,
    provider: null,
    account: null,
    chainId: '43114',
    preLoader: true,
    connect: null,
    userError: null,
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
        setUserError(state, action: PayloadAction<{error: ErrorI | null}>) {
            state.userError = action.payload.error;
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
            if (action.payload.error) {
                state.userError = action.payload.error;
            } else {
                state.chainId = action.payload.chainId;
                state.provider = action.payload.newProvider;
            }
        });
        builder.addCase(setWallet.fulfilled, (state, action: PayloadAction<setWalletType>) => {
            const { payload } = action;

            if (payload.error) {
                state.userError = payload.error;
            }

            if (payload.account) {
                state.connect = payload.connect;
                state.walletKey = payload.walletKey;
                state.chainId = payload.newChainId;
                state.provider = payload.provider;
                state.account = payload.account;
            }
            state.preLoader = false;
        });
        builder.addCase(importToken.fulfilled, (state, action: PayloadAction<{error: ErrorI | null}>) => {
            const { payload } = action;

            if (payload.error) {
                state.userError = payload.error;
            }
        });
    },
});

export const {
    chainChange, changeAccount, removeWallet, setPreloader, changeNetworkWC, setUserError,
} = walletSlice.actions;
export default walletSlice.reducer;
