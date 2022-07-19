import type { IHttpClientResponse } from 'src/libs/HTTPClient';

interface IUserRepository {
    getProfileData(user: string): Promise<IHttpClientResponse<IProfileChartResponse>>
}

type TX = {
    id: string;
    block: string;
    from: string;
    to: string;
    amount: string;
}

type IChartData = {
    date: Date,
    price: number,
}

interface IProfileChartResponse {
    respones: any;
    data: {
        respones: {
            txs: TX[],
            chart: IChartData[]
        }
    }
}

export type {
    IProfileChartResponse,
    IUserRepository,
    TX,
    IChartData,
};
