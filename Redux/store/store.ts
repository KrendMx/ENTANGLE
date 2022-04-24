import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer from './reducers/AppSlice';
import { api } from './api';

const rootReducer = combineReducers({
    appReducer,
    [api.reducerPath]: api.reducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    ,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
