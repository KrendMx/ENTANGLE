import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { toChainId } from '../../../src/utils';
import { networks } from '../../../src/utils/GlobalConst';
import ethereumNetworksConfig from '../../ethereumNetworksConfig';
import type { ChainIdType, ProviderType, walletKeyType } from '../../types';

export const changeNetwork = createAsyncThunk(
    'wallet/changeNetwork',
    async ({ chainId, provider }: { chainId: ChainIdType, provider: ProviderType }): Promise<ChainIdType> => {
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

export const setWallet = createAsyncThunk(
    'wallet/setWallet',
    async ({ walletKey, chainId }: { walletKey: walletKeyType, chainId: ChainIdType }) => {
        const errorHandler = (e: any, returnValue: any) => returnValue;

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (walletKey === 'MetaMask' && !window.ethereum.isMetaMask) return;
        if (walletKey === 'Coin98' && !window.ethereum.isCoin98) return;
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

        changeNetwork({ chainId, provider });
        const newChainId = parseInt(
            networkData.chainId.toString(),
            10,
        ).toString() as ChainIdType;
        localStorage.setItem('wallet', '1');
        // eslint-disable-next-line consistent-return
        return {
            walletKey,
            newChainId,
            provider,
            account,
        };
    },
);
/*
export const setChainId = createAsyncThunk(
    'wallet/setChainId',
    async ({ chainId, provider }: { chainId: ChainIdType, provider: ProviderType }) => {
        changeNetwork({ chainId, provider });
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        return { chainId, newProvider };
    },
); */

export const importToken = createAsyncThunk(
    'user/import-token',
    async ({ chainId, provider }: { chainId: ChainIdType, provider: ProviderType }): Promise<any> => {
        if (provider) {
            const options = {
                type: 'ERC20',
                options: {
                    address: networks[chainId].synth,
                    symbol: 'SYNTH',
                    decimals: 18,
                },
            };
            try {
                // @ts-ignore
                await provider.send('wallet_watchAsset', options);
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
    },
);
