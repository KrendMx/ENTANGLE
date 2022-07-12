// Interfaces
import type { Thunk } from 'core/utils/types';
import type { INotification } from 'src/libs/Notification';

// Deps
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChainConfig } from 'src/Services/ChainService/config';
import { calculatePosPrice } from 'src/UI/Pages/Profile/Profile.constant';
import { Notification } from 'src/libs/Notification';
import QueryRequests from 'services/GraphService/queryRequests';
import type { init } from 'utils/Global/Vars';
import { UserEntity } from '../UserEntity';

type IBalances = { [key: string]: {[key: string]: {price: number; positions: number }}};

export interface IUserInteractor {
    calculateBalances: Thunk<{ account: string }>;
    getAverageBuyPrice: Thunk<{ account: string }>;
}

export const createUserInteractor = (
    Entity: typeof UserEntity,
    Notification: INotification,
): IUserInteractor => ({
    calculateBalances: createAsyncThunk(
        'UserInteractor/calculate-balances',
        async ({ account }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const balances: IBalances = {
                    'FTM': {
                        '56': { price: 0, positions: 0 },
                        '43114': { price: 0, positions: 0 },
                        '250': { price: 0, positions: 0 },
                    },
                    'AVAX': {
                        '56': { price: 0, positions: 0 },
                        '43114': { price: 0, positions: 0 },
                        '250': { price: 0, positions: 0 },
                    },
                    'BSC': {
                        '56': { price: 0, positions: 0 },
                        '43114': { price: 0, positions: 0 },
                        '250': { price: 0, positions: 0 },
                    },
                    'ETH': {
                        '56': { price: 0, positions: 0 },
                        '43114': { price: 0, positions: 0 },
                        '250': { price: 0, positions: 0 },
                    },
                };
                let totalBalance = 0;
                const keys = Object.keys(ChainConfig);
                for (const key of keys) {
                    for (let i = 0; i < ChainConfig[key].SYNTH.length; i++) {
                        const { positions, price } = await calculatePosPrice(
                            account,
                            key,
                            i,
                        );
                        balances[key][ChainConfig[key].SYNTH[
                            i
                        ].CONTRACTS.SYNTH.chainId] = { positions: Number(positions.toFixed(2)), price };
                        totalBalance += Number(positions.toFixed(2)) * price;
                    }
                }
                dispatch(
                    Entity.actions.setAssetBalance(balances),
                );
                dispatch(Entity.actions.setTotalBalance({ totalBalance }));
            } catch (e) {
                Notification.error('Error', e.message);
                dispatch(Entity.actions.setError(e.message));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    getAverageBuyPrice: createAsyncThunk(
        'UserInteractor/getAverageBuyPrice',
        async ({ account }, { dispatch }): Promise<any> => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const res: any = await QueryRequests.calculateAVG(account);
                dispatch(Entity.actions.setAvgPrice(res));
            } catch (e) {
                Notification.error('Error', e.message);
                dispatch(Entity.actions.setError(e.message));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const UserInteractor = createUserInteractor(UserEntity, Notification);
