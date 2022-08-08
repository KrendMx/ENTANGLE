import type { availableChains, walletKeyType } from 'utils/Global/Types';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import type WalletConnectProvider from '@walletconnect/web3-provider';

interface IWalletEntityState {
    walletKey?: walletKeyType,
    provider?: Web3Provider | null,
    account?: string | null,
    chainId?: availableChains,
    connect?: WalletConnectProvider;
    preLoader?: boolean;
    isOpenWrongChainModal?: boolean;
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
