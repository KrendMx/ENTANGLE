import type { IHttpClientResponse } from '../../../libs/HTTPClient';

interface ICardRepository {
    getAprs(): Promise<IHttpClientResponse<IAprResponse>>;
}

interface IAprResponse {
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
