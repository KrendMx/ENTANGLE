// Interfaces
import type { Thunk } from 'core/utils/types';
import type { INotification } from 'src/libs/Notification';

// Deps
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChainConfig } from 'src/Services/ChainService/config';
import { calculatePosPrice } from 'src/UI/Pages/Profile/Profile.constant';
import { Notification } from 'src/libs/Notification';
import { UserEntity } from '../UserEntity';

type IBalances = { [key: string]: { price: number; positions: number } };

export interface IUserInteractor {
    calculateBalances: Thunk<{ account: string }>;
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
                const balances: IBalances = {};
                let totalBalance = 0;
                const keys = Object.keys(ChainConfig);
                for (const key of keys) {
                    const Balance: { price: number; positions: number } = {
                        price: 0,
                        positions: 0,
                    };
                    for (let i = 0; i < ChainConfig[key].SYNTH.length; i++) {
                        const { positions, price } = await calculatePosPrice(
                            account,
                            key,
                            i,
                        );
                        Balance.positions += Number(positions.toFixed(2));
                        Balance.price += price;
                        dispatch(
                            Entity.actions.setAssetBalance({
                                assetChainId:
                                    ChainConfig[key].SYNTH[i].CONTRACTS.SYNTH,
                                chainName: key,
                                positions,
                            }),
                        );
                    }
                    Balance.price /= Object.keys(ChainConfig).length;
                    balances[key] = Balance;
                    totalBalance += Balance.positions * Balance.price;
                }
                dispatch(Entity.actions.setTotalBalance({ totalBalance }));
            } catch (err) {
                dispatch(Entity.actions.setError(err.message));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const UserInteractor = createUserInteractor(UserEntity, Notification);
