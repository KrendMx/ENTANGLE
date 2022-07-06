import type { IHttpClientResponse } from '../../../libs/HTTPClient';

interface ICardRepository {
    getAprs(): Promise<IHttpClientResponse<IAprResponse>>;
}

interface IAprResponse {
    [key: string]: number
}

export type {
    ICardRepository,
    IAprResponse,
};
