import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contract, ethers } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { opToken } from '../../../ChainService/abi';

import toChainId from '../../../utils/toChainId';
import type { availableChains } from '../../../utils/GlobalConst';
import ethereumNetworksConfig from '../../ethereumNetworksConfig';
import type { ProviderType, walletKeyType, IBalances } from '../../types';
import type { ErrorI } from '../interfaces/App.interfaces';
import { ChainConfig } from '@/src/ChainService/config';
import { calculatePosPrice } from '@/components/Profile/Profile.constant';

/*
    Asynchronously changes the network
    (if the network is not in the injected wallet, then it adds it)
*/
export const changeNetwork = createAsyncThunk(
    'wallet/changeNetwork',
    async ({
        chainId,
        provider,
    }: {
        chainId: availableChains;
        provider: Web3Provider;
    }): Promise<{
        chainId: availableChains;
        newProvider: ProviderType;
        error: ErrorI | null;
    }> => {
        try {
            if (provider) {
                try {
                    await provider.send('wallet_switchEthereumChain', [
                        { chainId: toChainId(chainId) },
                    ]);
                } catch (switchError: any) {
                    if (switchError.code === 4902) {
                        await provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[chainId],
                        ]);
                    }
                }
            }
            const newProvider = new ethers.providers.Web3Provider(
                window.ethereum,
            );
            return { chainId, newProvider, error: null };
        } catch (e) {
            return {
                chainId: null,
                newProvider: null,
                error: e,
            };
        }
    },
);
/*
    Sets all wallet parameters (takes them from the injected wallet):
    wallet key, provider, account, chain id
*/
export const setWallet = createAsyncThunk(
    'wallet/setWallet',
    async ({ walletKey }: { walletKey: walletKeyType }) => {
        try {
            if (walletKey === 'MetaMask' && !window.ethereum.isMetaMask) return;
            if (walletKey === 'Coin98' && !window.ethereum.isCoin98) return;
            if (walletKey === 'CoinBase' && !window.ethereum.isCoinbaseWallet) {
                return;
            }
            let [account, newChainId, provider, connect] = [
                null,
                null,
                null,
                null,
            ];
            if (walletKey === 'WalletConnect') {
                connect = new WalletConnectProvider({
                    rpc: {
                        1: 'https://rpc.ankr.com/eth',
                        56: 'https://bsc-dataseed2.binance.org',
                        43114: 'https://api.avax.network/ext/bc/C/rpc',
                        250: 'https://rpc.ftm.tools',
                    },
                });
                await connect.enable();
                account = connect.accounts[0];
                newChainId = connect.chainId.toString();
                provider = new ethers.providers.Web3Provider(connect);
            } else {
                provider = new ethers.providers.Web3Provider(window.ethereum);

                account = (await provider.send('eth_requestAccounts', []))[0] || null;
                if (!account) return;

                const networkData = await provider.getNetwork();
                if (!networkData) return;

                newChainId = parseInt(
                    networkData.chainId.toString(),
                    10,
                ).toString() as availableChains;
            }
            localStorage.setItem('wallet', walletKey);
            return {
                connect,
                walletKey,
                newChainId,
                provider,
                account,
                error: null,
            };
        } catch (e) {
            return {
                connect: null,
                walletKey: null,
                newChainId: null,
                provider: null,
                account: null,
                error: e,
            };
        }
    },
);

// Adds a synthetic to the user's wallet (sends a request to the injected wallet)
export const importToken = createAsyncThunk(
    'user/import-token',
    async ({
        chainId,
        synthAddress,
        provider,
    }: {
        chainId: availableChains;
        synthAddress: string;
        provider: ProviderType;
    }): Promise<any> => {
        try {
            if (provider) {
                const options = {
                    type: 'ERC20',
                    options: {
                        address: synthAddress,
                        symbol: 'SYNTH',
                        decimals: 18,
                    },
                };
                try {
                    // @ts-ignore
                    await provider.send('wallet_watchAsset', options);
                } catch (switchError: any) {
                    if (switchError.code === 4902) {
                        await provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[chainId],
                        ]);
                    }
                }
            }
        } catch (e) {
            return {
                error: e,
            };
        }
    },
);

export const calculateBalances = createAsyncThunk(
    'user/calculate-balances',
    async ({ account }: {account: string}): Promise<{balances: IBalances, totalBalance: number}> => {
        const balances: IBalances = {};
        let totalBalance = 0;
        const keys = Object.keys(ChainConfig);
        for (const key of keys) {
            const Balance: { price: number, positions: number } = { price: 0, positions: 0 };
            for (
                let i = 0;
                i < ChainConfig[key].SYNTH.length;
                i++
            ) {
                const { positions, price } = await calculatePosPrice(account, key, i);
                Balance.positions += Number(positions.toFixed(2));
                Balance.price += price;
            }
            Balance.price /= Object.keys(ChainConfig).length;
            balances[key] = Balance;
            totalBalance += Balance.positions * Balance.price;
        }
        return {
            balances,
            totalBalance,
        };
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
