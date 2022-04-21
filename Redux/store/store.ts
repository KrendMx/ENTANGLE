import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer from './reducers/AppSlice';

const rootReducer = combineReducers({
    appReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
