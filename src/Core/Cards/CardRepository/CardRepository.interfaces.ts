import type { IHttpClientResponse } from '../../../libs/HTTPClient';

interface ICardRepository {
    getAprs(): Promise<IHttpClientResponse<IAprResponse>>;
}

interface IAprResponse {
    [x: string]: any;
    data?: {
        apr? : {
            [key: string]: number
        }
    }
}

export type {
    ICardRepository,
    IAprResponse,
};
