// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import type { ICardEntityState, helperType } from './CardEntity.interfaces';

const initialState: ICardEntityState & IWithHelperState = {
    ...withHelperState,
    apr: {},
    available: {},
    prices: {},
};

export const CardEntity = createSlice({
    name: 'CardEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setAprs(state, action: PayloadAction<helperType>) {
            state.apr = action.payload;
        },
        setAvailables(state, action: PayloadAction<helperType>) {
            state.available = action.payload;
        },
        setPrices(state, action: PayloadAction<helperType>) {
            state.prices = action.payload;
        },
    },
});
