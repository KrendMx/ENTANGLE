// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import type { availableChains } from 'src/utils/Global/Types';
import type { IWalletEntityState, IWalletInfo } from './WalletEntity.interfaces';

const initialState: IWalletEntityState & IWithHelperState = {
    ...withHelperState,
    walletKey: null,
    provider: null,
    account: null,
    chainId: '43114',
    connect: null,
    preLoader: true,
    isOpenWrongChainModal: false,
};

export const WalletEntity = createSlice({
    name: 'WalletEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setChain(state, action: PayloadAction<availableChains>) {
            state.chainId = parseInt(action.payload, 16).toString() as availableChains;
        },
        setAccount(state, action: PayloadAction<{ accounts: string[] }>) {
            const [account] = action.payload.accounts;
            state.account = account;
        },
        setWallet(state, action: PayloadAction<IWalletEntityState>) {
            const {
                provider, account, chainId, walletKey, connect,
            } = action.payload;
            state.walletKey = walletKey;
            state.provider = provider;
            state.account = account;
            state.chainId = chainId;
            if (connect) state.connect = connect;
        },
        removeWallet(state) {
            state.walletKey = null;
            state.provider = null;
            state.account = null;
            state.chainId = '43114';
            state.connect = null;
            localStorage.removeItem('wallet');
        },
        setNetwork(state, action: PayloadAction<{chainId: availableChains, provider: Web3Provider}>) {
            state.chainId = action.payload.chainId;
            state.provider = action.payload.provider;
        },
        changeNetworkWC(state, action: PayloadAction<{chainId: availableChains, provider: Web3Provider}>) {
            state.chainId = action.payload.chainId;
            state.provider = action.payload.provider;
        },
        setPreloader(state, action: PayloadAction<boolean>) {
            state.preLoader = action.payload;
        },
        setIsOpenWrongChainModal(state, action: PayloadAction<boolean>) {
            state.isOpenWrongChainModal = action.payload;
        },
    },
});
