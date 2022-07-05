// Store depend
import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// Entity
import type { IUserInteractor } from 'Core/User/UserInteractor';
import { UserInteractor } from 'Core/User/UserInteractor';
import { UserEntity } from './User/UserEntity';

export const store = configureStore({
    reducer: {
        UserEntity: UserEntity.reducer,
    },

});

export type IStore = ReturnType<typeof store.getState>;

interface IActions {
    User: typeof UserEntity.actions;
  }

export const actions: IActions = {
    User: UserEntity.actions,
};

interface IAsyncActions {
    User: IUserInteractor;
  }

export const asyncActions: IAsyncActions = {
    User: UserInteractor,
};

export const useStore = <T>(
    selector: (store: IStore) => T,
): { store: T; actions: IActions; asyncActions: IAsyncActions } => ({
        actions,
        asyncActions,
        store: useSelector(selector),
    });
