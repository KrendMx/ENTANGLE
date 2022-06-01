import type { availableChains } from '../utils/GlobalConst';

interface IGraphService {
    getBuyTransactions: () => Promise<IConfiguredBuyTransactionsData[]>;
    getAllTransactions: () => Promise<IConfiguredHistoryData[]>;
}

interface IConfiguredHistoryData {
    amount: number
    blockNumber: number;
    crypto: availableChains;
    time: number;
    type: 'buy' | 'sell';
}

interface IConfiguredBuyTransactionsData {
    date: Date;
    price: number;
}

interface IBlockData {
    id: string,
    block: string,
    from: string,
    to: string,
    amount: string
}

interface IQueryResponse {
    data: {
        exchange: IBlockData[]
    }
}

export type {
    IGraphService,
    IQueryResponse,
    IConfiguredHistoryData,
    IConfiguredBuyTransactionsData,
};
