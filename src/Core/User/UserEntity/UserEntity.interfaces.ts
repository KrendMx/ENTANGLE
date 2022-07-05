interface IUserEntityState {
    totalBalance: number;
    avgPrices: {[key: string]: number};
    profits: {[key: string]: number};
}

interface IUserInfo {
    profit?: {key: string; change: number, value: number};
    avgPrice: {key: string; value: number};
    totalBalance?: number;
}

export type {
    IUserEntityState,
    IUserInfo,
};
