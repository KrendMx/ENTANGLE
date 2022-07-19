import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Thunk } from 'core/utils/types';
import type { INotification } from 'src/libs/Notification';
import { Notification } from 'src/libs/Notification';
import { CardEntity } from '../CardEntity';
import { CardRepository } from '../CardRepository';

export interface ICardInteractor {
    getCardApr: Thunk<{}>;
}

export const createCardInteractor = (
    Entity: typeof CardEntity,
    Notification: INotification,
    Repository: typeof CardRepository,
): ICardInteractor => ({
    getCardApr: createAsyncThunk('CardInteractor/getCardApr', async (_, { dispatch }) => {
        try {
            const res = await Repository.getAprs();
            console.log(res);
        } catch (e) {
            Notification.error('Error', e.message);
            console.log(e);
            dispatch(Entity.actions.setError(e.message));
        }
    }),
});

export const CardInteractor = createCardInteractor(
    CardEntity,
    Notification,
    CardRepository,
);
