import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import type WalletConnectProvider from '@walletconnect/web3-provider';
import type { availableChains } from '../src/utils/GlobalConst';

export type ProviderType = Web3Provider | null;
export type walletKeyType =
    | 'MetaMask'
    | 'Coin98'
    | 'CoinBase'
    | 'WalletConnect'
    | null;

export type setWalletType = {
    connect: WalletConnectProvider | null;
    walletKey: walletKeyType;
    newChainId: availableChains;
    provider: Web3Provider;
    account: string;
};
