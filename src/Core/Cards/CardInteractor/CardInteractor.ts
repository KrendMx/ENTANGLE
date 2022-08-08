import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Thunk } from 'core/utils/types';
import type { IHttpClientResponse } from 'src/libs/HTTPClient';
import type { INotification } from 'src/libs/Notification';
import { Notification } from 'src/libs/Notification';
import { namesConfig } from 'src/utils/Global/Vars';
import { CardEntity } from '../CardEntity';
import type { IAprResponse } from '../CardRepository';
import { CardRepository } from '../CardRepository';

export interface ICardInteractor {
    getCardApr: Thunk<void>;
}

export const createCardInteractor = (
    Entity: typeof CardEntity,
    Notification: INotification,
    Repository: typeof CardRepository,
): ICardInteractor => ({
    getCardApr: createAsyncThunk('CardInteractor/getCardApr', async (_, { dispatch }) => {
        try {
            const res: IHttpClientResponse<IAprResponse> = await Repository.getAprs();
            for (const key in res?.data?.apr) {
                dispatch(Entity.actions.setCardInfo({ key: namesConfig[key], data: { 'apr': res?.data?.apr[key] } }));
            }
        } catch (e) {
            dispatch(Entity.actions.setError(e.message));
        }
    }),
});

export const CardInteractor = createCardInteractor(
    CardEntity,
    Notification,
    CardRepository,
);
