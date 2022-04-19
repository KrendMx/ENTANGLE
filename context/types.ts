import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import type { TransactionInfo } from '../components/Modal/SuccessModal/SuccessModal.interface';

export interface IAccountState {
    walletKey: string | null;
    provider: Web3Provider | null;
    account: string | null;
    positionSum: Map<string, number>;
    chainId: '43114' | '250';
    txLoading: boolean
}

export interface IProviderContext extends IAccountState {
    setWallet: (key: string) => void;
    removeWallet: () => void;
    setChainID: (key: IAccountState['chainId']) => void;
    setChainIDAsync: (key: IAccountState['chainId']) => Promise<any>;
    approve: (a: string, b: string) => Promise<any>,
    getAllowance: (a: string, b: string) => Promise<any>,
    changeLoadingTx: (value: boolean) => void;
    setSucInfo: (info: TransactionInfo) => void;
    setPositionSum: (n: number, key: string) => void;
    getPositionSum: (key?: string) => number;
    importToken: () => void;
}
