import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import type { TransactionInfo } from '../../components/Modal/SuccessModal/SuccessModal.interface';
import type { availableChains } from '../utils/GlobalConst';

export interface payDataType {
    '43114': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
    '250': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
    '56': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
}
export interface IAccountState {
    walletKey: string | null;
    provider: Web3Provider | null;
    account: string | null;
    deposit: Map<string, number>;
    positionSum: Map<string, number>;
    profits: Map<string, { value: number; change: number }>;
    chainId: availableChains;
    txLoading: boolean;
    preLoader: boolean;
    avgPrices: {
        '250': string | null;
        '43114': string | null;
    };
}

export interface IProviderContext extends IAccountState {
    setWallet: (key: string) => void;
    setIsOpenSelectWalletModal: (state: boolean) => any;
    removeWallet: () => void;
    setChainID: (key: IAccountState['chainId']) => void;
    setChainIDAsync: (key: IAccountState['chainId']) => Promise<any>;
    approve: (a: string, b: string) => Promise<any>;
    getAllowance: (a: string, b: string) => Promise<any>;
    changeLoadingTx: (value: boolean) => void;
    setSucInfo: (info: TransactionInfo) => void;
    setDeposit: (n: number, key: string) => void;
    getDeposit: (key: string) => number;
    setPositionSum: (n: number, key: string) => void;
    getPositionSum: (key?: string) => number;
    setProfit: (n: number, change: number, key: string) => void;
    getProfit: (key: string) => { value: number; change: number };
    getSameErrorsCountFromStack: (code: number) => number;
    setPrices: (avgPrices: { '250': string; '43114': string }) => void;
    importToken: () => void;
    payData: payDataType;
    setPreloader: any;
    setPayData: any;
}
