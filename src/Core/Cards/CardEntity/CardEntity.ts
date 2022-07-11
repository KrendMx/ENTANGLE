// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import { initialCardState } from './CardEntity.constants';
import type { CardData, CardDataState } from './CardEntity.interfaces';

const initialState: CardDataState & IWithHelperState = {
    ...withHelperState,
    ...initialCardState,
};

export const CardEntity = createSlice({
    name: 'CardEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setCardInfo(state, action: PayloadAction<{ key: string, data: CardData }>) {
            state.data[action.payload.key] = action.payload.data;
        },
        setDefaultCardData(state) {
            for (const key in state) {
                state.data[key] = { ...initialState[key] };
            }
        },
    },
});
