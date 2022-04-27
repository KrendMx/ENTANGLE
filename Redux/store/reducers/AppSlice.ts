import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type AppState = {
    isLoaded: boolean
}

const initialState: AppState = {
    isLoaded: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appLoaded(state, action:PayloadAction<boolean>) {
            // eslint-disable-next-line no-param-reassign
            state.isLoaded = action.payload;
        },
    },
});

export default appSlice.reducer;
