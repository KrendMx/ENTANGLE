/* eslint-disable no-return-await */
import Service from '../Service';
import type {
    BalanceChartResponse,
    BalanceChartTick,
    GetTotalValueLockedResponse,
    iService,
    TransactionHistoryEntity,
} from '../../../context/ServiceContext/ServiceContext.interfaces';

export default class MainService extends Service implements iService {
    constructor() {
        super({
            apiBase: `http://${'localhost:7000'}/`,
        });
    }

    getTotalValueLocked = async (): Promise<GetTotalValueLockedResponse> =>
        await this.getJson<GetTotalValueLockedResponse>('metrics/tvl').then(
            (data) => {
                const { change, ...other } = data;
                return { change: change * 100, ...other };
            },
        );

    getTransactionHistory = async (
        userWallet: string,
    ): Promise<TransactionHistoryEntity[]> =>
        await this.postJson<TransactionHistoryEntity[]>('metrics/history', {
            user: userWallet,
        }).then((data) =>
            data.map((i) => {
                const { time, ...other } = i;
                return {
                    time: time * 1e3,
                    ...other,
                } as unknown as TransactionHistoryEntity;
            }));

    getBalanceChart = async (userWallet: string): Promise<BalanceChartTick[]> =>
        await this.postJson<BalanceChartResponse>('charts/profileChart', {
            user: userWallet,
        }).then((data) =>
            data.response.map((i) => {
                const { date, price } = i;
                return {
                    label: new Date(date),
                    value: price,
                } as unknown as BalanceChartTick;
            }));
}
