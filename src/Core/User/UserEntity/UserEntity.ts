// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import type { IAssetBalance, IUserEntityState, IUserInfo } from './UserEntity.interfaces';

const initialState: IUserEntityState & IWithHelperState = {
    ...withHelperState,
    profits: {},
    avgPrices: {},
    totalBalance: 0,
    balances: {},
};

export const UserEntity = createSlice({
    name: 'UserEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setProfit(state, action: PayloadAction<IUserInfo>) {
            state.profits[action.payload.profit.key] = action.payload.profit.value;
        },
        setAvgPrice(state, action: PayloadAction<IUserInfo>) {
            state.profits[action.payload.avgPrice.key] = action.payload.avgPrice.value;
        },
        setTotalBalance(state, action: PayloadAction<IUserInfo>) {
            state.totalBalance = action.payload.totalBalance;
        },
        setAssetBalance(state, action: PayloadAction<IAssetBalance>) {
            const { assetChainId, chainName, positions } = action.payload;
            state.balances[chainName][assetChainId] = positions;
        },
    },
});
