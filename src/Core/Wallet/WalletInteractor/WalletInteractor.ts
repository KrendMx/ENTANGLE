// Interfaces
import type { Thunk } from 'core/utils/types';
import type { INotification } from 'src/libs/Notification';
import type { availableChains, walletKeyType } from 'src/utils/Global/Types';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';

// Deps
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availableChainsArray, networks } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { toChainId } from 'src/utils/toChainId';
import { WalletEntity } from '../WalletEntity';

export interface IWalletInteractor {
    changeNetwork: Thunk<{ chainId: availableChains, provider: Web3Provider}>;
    setWallet: Thunk<{walletKey: walletKeyType}>;
    importToken: Thunk<{synthAddress: string; provider: Web3Provider}>;
}

export const createWalletInteractor = (
    Entity: typeof WalletEntity,
    Notification: INotification,
): IWalletInteractor => ({
    changeNetwork: createAsyncThunk(
        'wallet/changeNetwork',
        async ({
            chainId,
            provider,
        }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                if (provider) {
                    try {
                        await provider.send('wallet_switchEthereumChain', [
                            { chainId: toChainId(chainId) },
                        ]);
                        console.log(chainId);
                        if (!availableChainsArray.includes(chainId)) {
                            dispatch(Entity.actions.setIsOpenWrongChainModal(true));
                        }
                    } catch (switchError: any) {
                        if (switchError.code === 4902) {
                            await provider.send('wallet_addEthereumChain', [
                                {
                                    chainId: toChainId(chainId),
                                    chainName: networks[chainId].title,
                                    nativeCurrency: {
                                        name: networks[chainId].mmCurrency,
                                        symbol: networks[chainId].mmCurrency,
                                        decimals: 18,
                                    },
                                    rpcUrls: [networks[chainId].rpc],
                                },
                            ]);
                        } else if (switchError.code === 4001) {
                            Notification.error('Switch Error', switchError.message);
                            return;
                        }
                        dispatch(Entity.actions.setError(switchError));
                    }
                }
                dispatch(Entity.actions.setNetwork({
                    chainId,
                    provider: new ethers.providers.Web3Provider(
                        window.ethereum,
                    ),
                }));
            } catch (e) {
                dispatch(Entity.actions.setError(e));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    setWallet: createAsyncThunk(
        'wallet/setWallet',
        async ({
            walletKey,
        }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
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
                            1: networks['1'].rpc,
                            56: networks['56'].rpc,
                            43114: networks['43114'].rpc,
                            250: networks['250'].rpc,
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
                    if (!availableChainsArray.includes(newChainId)) {
                        dispatch(Entity.actions.setIsOpenWrongChainModal(true));
                    }
                }
                dispatch(Entity.actions.setWallet({
                    walletKey, chainId: newChainId, provider, account, connect,
                }));
                localStorage.setItem('wallet', walletKey);
            } catch (e) {
                dispatch(Entity.actions.setError(e));
            } finally {
                dispatch(Entity.actions.setPreloader(false));
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    importToken: createAsyncThunk(
        'wallet/importToken',
        async ({ synthAddress, provider }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
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
                        dispatch(Entity.actions.setError(switchError));
                    }
                }
            } catch (e) {
                dispatch(Entity.actions.setError(e));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const WalletInteractor = createWalletInteractor(WalletEntity, Notification);
