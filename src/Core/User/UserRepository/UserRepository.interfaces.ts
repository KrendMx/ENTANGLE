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
    label: Date,
    value: number,
}

interface IProfileChartResponse {
    [x: string]: any;
    data: {
        response: {
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
