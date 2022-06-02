import type { TransactionHistoryEntity } from '../context/ServiceContext/ServiceContext.interfaces';

interface IGraphService {
    getBuyTransactions: () => Promise<IConfiguredBuyTransactionsData[]>;
    getAllTransactions: () => Promise<TransactionHistoryEntity[]>;
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
        exchanges: IBlockData[]
    }
}

export type {
    IGraphService,
    IQueryResponse,
    IConfiguredBuyTransactionsData,
};
