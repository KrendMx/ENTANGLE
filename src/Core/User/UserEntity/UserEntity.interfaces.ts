interface IUserEntityState {
    totalBalance: number;
    avgPrices: {[key: string]: number};
    profits: {[key: string]: number};
    balances: {[key: string]: {[key: string]: number}};
}

interface IUserInfo {
    profit?: {key: string; change: number, value: number};
    avgPrice?: {key: string; value: number};
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
};
