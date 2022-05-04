/* eslint-disable no-return-await */
import moment from 'moment/moment';
import Service from '../Service';
import type {
    BalanceChartTick,
    GetTotalValueLockedResponse,
    iService,
    TransactionHistoryEntity,
} from '../../../context/ServiceContext/ServiceContext.interfaces';

export default class MockService extends Service implements iService {
    constructor() {
        super({
            apiBase: '',
        });
    }

    getTotalValueLocked = async (): Promise<GetTotalValueLockedResponse> => ({
        amount: Math.floor(Math.random() * 1e9),
        change:
            Math.floor(-10000 + Math.random() * (10000 + 1 + 10000)) / 10000,
    });

    getTransactionHistory = async (
        userWallet: string,
    ): Promise<TransactionHistoryEntity[]> =>
        Array.from({ length: 2000 }, (_, i) => ({
            type: Math.random() < 0.5 ? 'buy' : 'sell',
            crypto: Math.random() < 0.5 ? 43114 : 250,
            amount: String(Math.floor(Math.random() * 1e6)),
            time: 1650042779000 + i * 1e6,
        }));

    getBalanceChart = async (userWallet: string): Promise<BalanceChartTick[]> =>
        Array.from({ length: 2000 }, (_, i) => ({
            label: moment().subtract(i, 'hours').toDate(),
            value: Math.floor(Math.random() * 1e3),
        }));
}
