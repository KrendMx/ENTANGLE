import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contract, ethers } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { opToken } from '../../../src/ChainService/abi';

import { toChainId } from '../../../src/utils';
import type { availableChains } from '../../../src/utils/GlobalConst';
import { networks } from '../../../src/utils/GlobalConst';
import ethereumNetworksConfig from '../../ethereumNetworksConfig';
import type { ProviderType, walletKeyType } from '../../types';

export const changeNetwork = createAsyncThunk(
    'wallet/changeNetwork',
    async ({
        chainId,
        provider,
    }: {
        chainId: availableChains;
        provider: Web3Provider;
    }): Promise<{ chainId: availableChains; newProvider: ProviderType }> => {
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
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        return { chainId, newProvider };
    },
);

export const setWallet = createAsyncThunk(
    'wallet/setWallet',
    async ({ walletKey }: { walletKey: walletKeyType }) => {
        const errorHandler = (e: any, returnValue: any) => returnValue;

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (walletKey === 'MetaMask' && !window.ethereum.isMetaMask) return;
        if (walletKey === 'Coin98' && !window.ethereum.isCoin98) return;
        if (walletKey === 'CoinBase' && !window.ethereum.isCoinbaseWallet) {
            return;
        }

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

        changeNetwork({ chainId: '43114', provider });
        const newChainId = parseInt(
            networkData.chainId.toString(),
            10,
        ).toString() as availableChains;
        localStorage.setItem('wallet', '1');
        return {
            walletKey,
            newChainId,
            provider,
            account,
        };
    },
);

export const importToken = createAsyncThunk(
    'user/import-token',
    async ({
        chainId,
        provider,
    }: {
        chainId: availableChains;
        provider: ProviderType;
    }): Promise<any> => {
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

export const getAllowance = createAsyncThunk(
    'user/get-allowance',
    async ({
        contractAddress,
        dexAddress,
        provider,
        account,
    }: {
        contractAddress: string;
        dexAddress: string;
        provider: ProviderType;
        account: string | null;
    }) => {
        const contract = new Contract(
            contractAddress,
            opToken,
            provider?.getSigner(),
        );

        const data = await contract.allowance(account, dexAddress);

        return data;
    },
);

export const approve = createAsyncThunk(
    'user/approve',
    async ({
        tokenAddress,
        dexAddress,
        provider,
    }: {
        tokenAddress: string;
        dexAddress: string;
        provider: ProviderType;
    }) => {
        const contract = new Contract(
            tokenAddress,
            opToken,
            provider.getSigner(),
        );

        const data = await contract.approve(
            dexAddress,
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        );
        return data;
    },
);
