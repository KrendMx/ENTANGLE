import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import type { ProviderType } from '../../types';
import type { availableChains } from '../../../src/utils/GlobalConst';
import { toChainId } from '../../../src/utils';
import ethereumNetworksConfig from '../../../src/context/ethereumNetworksConfig';

type walletKeyType = 'MetaMask' | 'Coin98' | 'CoinBase' | null;

type initialStateType = {
    walletKey: walletKeyType,
    provider: ProviderType,
    account: string | null,
    chainId: availableChains,
}

const initialState: initialStateType = {
    walletKey: null,
    provider: null,
    account: null,
    chainId: '250',
};

const changeNetwork = createAsyncThunk(
    'wallet/changeNetwork',
    async ({ chainId, provider }: { chainId: availableChains, provider: ProviderType }): Promise<availableChains> => {
        if (provider) {
            try {
                await provider.send('wallet_switchEthereumChain', [
                    { chainId: toChainId(chainId) },
                ]);
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                        await provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[chainId],
                        ]);
                    } catch (addError) {
                        console.log(switchError);
                    }
                }
            }
        }
        return chainId;
    },
);

const setWallet = createAsyncThunk(
    'wallet/setWallet',
    async ({ walletKey, chainId }: { walletKey: walletKeyType, chainId: availableChains }) => {
        const errorHandler = (e: any, returnValue: any) => returnValue;

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (walletKey === 'MetaMask' && !window.ethereum.isMetaMask) return;
        if (walletKey === 'Coin98' && !window.ethereum.isCoin98) return;
        // eslint-disable-next-line no-useless-return
        if (walletKey === 'CoinBase' && !window.ethereum.isCoinbaseWallet) return;

        const account = (
            await provider
                .send('eth_requestAccounts', [])
                .catch((e: any) => errorHandler(e, []))
        )[0] || null;
        if (!account) return;

        const networkData = await provider
            .getNetwork()
            .catch((e: any) => errorHandler(e, null));
        if (!networkData) return;
        // @ts-ignore ругается на finally
        const response = await changeNetwork({ chainId, provider }).finally(() => {
            const newChainId = parseInt(
                networkData.chainId.toString(),
                16,
            ).toString() as initialStateType['chainId'];
            return newChainId;
        });
        localStorage.setItem('wallet', '1');
        // eslint-disable-next-line consistent-return
        return response;
    },
);

const setChainId = createAsyncThunk(
    'wallet/setChainId',
    async ({ chainId, provider }: { chainId: availableChains, provider: ProviderType }) => {
        await changeNetwork({ chainId, provider });
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        return newProvider;
    },
);

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
    },
});

export default walletSlice.reducer;
