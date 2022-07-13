// Deps
import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// Entity
import type { IUserInteractor } from 'core/User/UserInteractor';
import { UserInteractor } from 'core/User/UserInteractor';
import { ContractInteractor } from 'core/Contract/ContractInteractor';
import type { IContractInteractor } from './Contract/ContractInteractor';
import { UserEntity } from './User/UserEntity';
import { ContractEntity } from './Contract/ContractEntity';
import { CardEntity } from './Cards/CardEntity';
import { WalletEntity } from './Wallet/WalletEntity';
import { WalletInteractor } from './Wallet/WalletInteractor';
import type { IWalletInteractor } from './Wallet/WalletInteractor';
import { AppEntity } from './App/AppEntity';

export const store = configureStore({
    reducer: {
        UserEntity: UserEntity.reducer,
        WalletEntity: WalletEntity.reducer,
        CardsEntity: CardEntity.reducer,
        ContractEntity: ContractEntity.reducer,
        AppEntity: AppEntity.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type IStore = ReturnType<typeof store.getState>;

interface IActions {
    User: typeof UserEntity.actions;
    Card: typeof CardEntity.actions;
    Contract: typeof ContractEntity.actions;
    Wallet: typeof WalletEntity.actions;
    App: typeof AppEntity.actions;
  }

export const actions: IActions = {
    User: UserEntity.actions,
    Card: CardEntity.actions,
    Contract: ContractEntity.actions,
    Wallet: WalletEntity.actions,
    App: AppEntity.actions,
};

interface IAsyncActions {
    User: IUserInteractor;
    Contract: IContractInteractor,
    Wallet: IWalletInteractor,
  }

export const asyncActions: IAsyncActions = {
    User: UserInteractor,
    Contract: ContractInteractor,
    Wallet: WalletInteractor,
};

export const useStore = <T>(
    selector: (store: IStore) => T,
): { store: T; actions: IActions; asyncActions: IAsyncActions } => ({
        actions,
        asyncActions,
        store: useSelector(selector),
    });
