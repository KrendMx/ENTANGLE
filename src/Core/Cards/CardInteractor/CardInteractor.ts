// Interfaces
import type { Thunk } from 'core/utils/types';
import type { INotification } from 'src/libs/Notification';

// Deps
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChainConfig } from 'src/Services/ChainService/config';
import { Notification } from 'src/libs/Notification';
import type { ICardRepository } from '../CardRepository';
import { CardRepository } from '../CardRepository';
import { CardEntity } from '../CardEntity';

export interface ICardInteractor {
    setAprs: Thunk<{}>;
    setAvailables: Thunk<{}>;
    setPrices: Thunk<{}>;
}

export const createCardsInteractor = (
    Entity: typeof CardEntity,
    Notification: INotification,
    Repository: ICardRepository,
): ICardInteractor => ({
    setAprs: createAsyncThunk(
        'CardInteractor/setAprs',
        async (_, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const { data } = await CardRepository.getAprs();
                dispatch(Entity.actions.setAprs(data));
            } catch (e) {
                dispatch(Entity.actions.setError(e));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    setAvailables: createAsyncThunk(
        'CardInteractor/setAvailables',
        async (_, { dispatch }) => {
            // TODO: Логику сделать
        },
    ),
    setPrices: createAsyncThunk(
        'CardInteractor/setPrices',
        async (_, { dispatch }) => {
            // TODO: Логику сделать
        },
    ),
});

export const CardInteractor = createCardsInteractor(CardEntity, Notification, CardRepository);
