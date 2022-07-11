import type { AxiosResponse } from 'axios';
import type { TransactionHistoryEntity } from 'utils/Global/Types';

interface IGraphService {
    getBuyTransactions: () => Promise<IConfiguredBuyTransactionsData[]>;
    getAllTransactions: () => Promise<TransactionHistoryEntity[]>;
}

interface IConfiguredBuyTransactionsData {
    date: Date;
    price: number;
}

type shefEvent = 'deposites' | 'compounds' | 'withdraws'

interface IQueryRequests {
    getGraphDataBuyData: (
        account: string,
        url: string,
    ) => Promise<AxiosResponse<IQueryResponse, any>>;
    getGraphDataTxData: (
        account: string,
        url: string,
    ) => Promise<AxiosResponse<IQueryResponse, any>>;
    calculateAVG: (account: string) => void;
    calculateProfit: (
        transactions: TransactionHistoryEntity[],
        balance: number,
        chainId: string,
    ) => Promise<{ [key: string]: number }>;
}

interface IBlockData {
    id: string;
    block: string;
    from: string;
    to: string;
    amount: string;
}

interface IQueryResponse {
    data: {
        exchanges: IBlockData[];
    };
}

export type {
    shefEvent,
    IGraphService,
    IQueryResponse,
    IConfiguredBuyTransactionsData,
    IQueryRequests,
};
