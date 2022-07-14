import type { TransactionHistoryEntity, availableChains } from 'utils/Global/Types';
import type { IChartData, TX } from '../UserRepository';

interface IUserEntityState {
    totalBalance: number;
    chartData: IChartData[] | null;
    txChartData: TX[];
    isChartLoaded: boolean;
    avgPrices: { [key: string]: number };
    positionSumObj: { [key: string]: number };
    profits: { [key: string]: { [key: string]: { percentage: number; stable: number } } };
    balances: { [key: string]: { [key: string]: { positions: number, price: number } } };
    txLoading: boolean;
    txHistory: TransactionHistoryEntity[];
    txLoaded: boolean;
    cardLoaded: boolean;
    isOpenModal: boolean;
    payData: {
        [key: string]: {
            available: null | string,
            totalAvailable: null | string,
            price: null | string,
        }
    }
}

type payDataActionType = {
    key: availableChains;
    data: { available: string; totalAvailable: string; price: string };
};

interface IUserInfo {
    profit?: { key: string; change: number, value: number };
    avgPrice?: { key: string; value: number };
    totalBalance?: number;
}

interface IAssetBalance {
    chainName: string;
    assetChainId: string;
    positions: number
}

export type {
    IUserEntityState,
    IUserInfo,
    IAssetBalance,
    TransactionHistoryEntity,
    payDataActionType,
};
