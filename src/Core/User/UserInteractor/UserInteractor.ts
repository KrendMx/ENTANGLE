// Deps
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChainConfig } from 'src/Services/ChainService/config';
import { calculatePosPrice } from 'src/UI/Pages/Profile/Profile.constant';
// Interfaces
import type { Thunk } from 'core/utils/types';

type IBalances = { [key: string]: { price: number, positions: number } };

export interface IUserInteractor {
    calculateBalances: Thunk<{balances: IBalances, totalBalance: number}>
}

// Entity: typeof UserEntity,
// Notification: INotification,
export const createUserInteractor = () => ({
    calculateBalances: createAsyncThunk(
        'user/calculate-balances',
        async ({ account }: {account: string}): Promise<{balances: IBalances, totalBalance: number}> => {
            const balances: IBalances = {};
            let totalBalance = 0;
            const keys = Object.keys(ChainConfig);
            for (const key of keys) {
                const Balance: { price: number, positions: number } = { price: 0, positions: 0 };
                for (
                    let i = 0;
                    i < ChainConfig[key].SYNTH.length;
                    i++
                ) {
                    const { positions, price } = await calculatePosPrice(account, key, i);
                    Balance.positions += Number(positions.toFixed(2));
                    Balance.price += price;
                }
                Balance.price /= Object.keys(ChainConfig).length;
                balances[key] = Balance;
                totalBalance += Balance.positions * Balance.price;
            }
            return {
                balances,
                totalBalance,
            };
        },
    ),
});
