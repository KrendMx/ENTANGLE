import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import type {ChainIdType} from '../../types';
import {importToken} from './ActionCreators';

type initStateType = {
    positionSumObj: Map<string, number>,
    txLoading: boolean,
    positionSum: string | number,
}

type positionSumType = {
    n: number,
    key: ChainIdType,
}

const initialState: initStateType = {
    positionSumObj: new Map(),
    txLoading: false,
    positionSum: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLoadingTx(state, action: PayloadAction<boolean>) {
            state.txLoading = action.payload
        },
        setPositionSum(state, action: PayloadAction<positionSumType>) {
            state.positionSumObj = new Map(state.positionSumObj.set(action.payload.key, action.payload.n));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(importToken.fulfilled, (state, action) => {
            state.positionSumObj = action.payload;
        });
    },
});

export const {changeLoadingTx, setPositionSum} = userSlice.actions;
export default userSlice.reducer;
