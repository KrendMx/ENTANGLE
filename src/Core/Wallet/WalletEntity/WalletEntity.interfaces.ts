import type { availableChains } from 'utils/Global/Types';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import type WalletConnectProvider from '@walletconnect/web3-provider';

type walletKeyType =
    | 'MetaMask'
    | 'Coin98'
    | 'CoinBase'
    | 'WalletConnect'
    | null;

interface IWalletEntityState {
    walletKey?: walletKeyType,
    provider?: Web3Provider | null,
    account?: string | null,
    chainId?: availableChains,
    connect?: WalletConnectProvider;
}

interface IWalletInfo {
    profit?: {key: string; change: number, value: number};
    avgPrice?: {key: string; value: number};
    totalBalance?: number;
}

export type {
    IWalletEntityState,
    IWalletInfo,
    walletKeyType,
};
