// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import type { languages } from 'utils/Global/Types';
import type { IContractEntityState } from './ContractEntity.interfaces';

const initialState: IContractEntityState & IWithHelperState = {
    ...withHelperState,
    allowance: {},
    txLoading: false,
};

export const ContractEntity = createSlice({
    name: 'ContractEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setAllowance(state, action: PayloadAction<{ cardId: string; value: number }>) {
            const { cardId, value } = action.payload;
            state.allowance[cardId] = value;
        },
        clearAllowance(state) {
            state.allowance = {};
        },
        changeLoadingTx(state, action: PayloadAction<boolean>) {
            state.txLoading = action.payload;
        },
    },
});
