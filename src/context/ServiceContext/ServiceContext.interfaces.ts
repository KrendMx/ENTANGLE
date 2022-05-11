type TotalValueLockedData = {
    amount: number;
    change: number;
}

type GetTotalValueLockedResponse = TotalValueLockedData;

type TransactionHistoryEntity = {
    type: 'buy' | 'sell',
    crypto: number,
    amount: string,
    time: number
}

type BalanceChartResponseTick = {
    price: number,
    date: string,
}

type BalanceChartTick = {
    label: Date,
    value: number,
}

type BalanceChartResponse = {
    response: BalanceChartResponseTick[]
}

interface iService {
    getTotalValueLocked: () => Promise<GetTotalValueLockedResponse>,
    getTransactionHistory: (userWallet: string) => Promise<TransactionHistoryEntity[]>,
    getBalanceChart: (userWallet: string) => Promise<BalanceChartTick[]>,
    getChangeData: () => Promise<IResponsePrice[]>,
    getProfit: (userWallet: string, pid: number) => Promise<IResponseProfit>,
    getAVGPrice: (userWallet: string) => Promise<IResponseAVG>,
}

interface IResponsePrice {
    price: {
        avaxSynth: number,
        fantomSynth: number,
    },
}

interface IResponseAVG {
    fantomSynth: number,
    avaxSynth: number
}

interface IResponseProfit {
    stable: number;
    percentage: number;
}

type ServiceConfigOptions = {
    apiBase?: string
}

export type {
    iService,
    ServiceConfigOptions,
    TransactionHistoryEntity,
    BalanceChartTick,
    BalanceChartResponse,
    TotalValueLockedData,
    GetTotalValueLockedResponse,
    IResponseProfit,
    IResponsePrice,
    IResponseAVG,
};
